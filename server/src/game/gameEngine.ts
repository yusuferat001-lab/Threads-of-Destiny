import { randomUUID } from "crypto";
import { CharacterState, Cag, SenaryoResponse, SonucEtkisi, TepkiSonucu, MulkTuru, EvlilikAdayi } from "../types";
import { T, K, Khukumdar } from "../i18n";
import { olayCevirisiUygula } from "../i18n/olaylar";
import { skorKaydet as skoruDbyeYaz } from "../db/scoreRepository";
import {
  createCharacter,
  mesleğiSec,
  clampStats,
  checkDeath,
  ilerletYas,
  etiketEkle,
  etiketSil,
  ulkeGuncelle,
  durumEkle,
  durumlariUygula,
  pasifEkonomiUygula,
  zamanAnlatimiUret,
  sonucAnlatimiUret,
  maasCarpaniUygula,
  maasCarpaniGetir,
  MAAS_CARPANI_TAVAN,
  rutbeGuncelle,
  sansOlayiDene,
  aniOlumDene,
  ecelDenemesi,
  gecmisKaydet,
  yaslanmaUygula,
  hayatOlayiEkle,
  capraletkiUygula,
  haberleriUret,
  hukumdarDegisimHaberiUret,
  MESLEKLER,
  hesaplaMaasYillik,
  maasKirilimHesapla,
  MaasKirilim,
  gayrimenkulYillikGelirHesapla,
  giderKalemleriHesapla,
  GiderKalemleri,
  enflasyonYuzdesiHesapla,
  giderEnflasyonYuzdesiHesapla,
  meslekMetrikCarpani,
  orduKaybiUygula,
  orduBuyumesiDene,
  konutDegistir as konutDegistirState,
  yasamSecimiDegistir as yasamSecimiDegistirState,
  hayatAmaciKontrolEt,
  krizEtkisiUygula,
  sehirYonetimGuncelle,
  enflasyonCarpani,
  mulkGelirleriUygula,
  mulkGetiriOraniHesapla,
  rastgeleMulkBakimAraligi,
  mulkYillikBakimTahmini,
  gayrimenkulDegeriHesapla,
  dunyaFinansEtkileri,
  DunyaFinansEtkisi,
  sucSeviyesiUygula,
  piyasaDedikodulariUret,
  magazaFiyatiHesapla,
  envanterBozulmasiUygula,
  temelMagazaKilitliMi,
  TEMEL_MAGAZA_KILIT_SURESI_YIL,
  rastgeleLuksBakimAraligi,
  paraYuvarla,
  zorunluBagisKontrolEt,
  zenginlikSizintiKontrolEt,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaYillikKontrol,
  vebaBitisKontrolEt,
  kucukKrizKontrolEt,
  MESLEK_KATEGORI,
  eskiKayitGocu,
} from "./stateManager";
import { rutbeTanimiGetir, KARIYER_PUANI_YILLIK, KARIYER_PUANI_KATEGORI_BASARI, KARIYER_PUANI_YATIRIM } from "../data/rutbeler";
import { rollSuccess } from "./diceRoll";
import { olaySec, doldur, temelUygunMu, sosyallesmeIcinOlaySec } from "./olaySecici";
import { OlayTanimi, OnTepki, OLAY_BANKASI } from "../data/olaylar";
import { OLAY_SOSYALLESME } from "../data/olaylar/sosyallesme";
import {
  SOSYALLESME_YERLERI,
  SosyallesmeYeri,
  sosyallesmeYeriGetir,
  sosyallesmeYeriUygunMu,
} from "../data/sosyallesmeYerleri";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import {
  rastgeleHayvanTuruSec,
  rastgeleHayvanIsmiSec,
  EVCIL_HAYVAN_TAKIP_OLAY_IDLERI,
  EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI,
} from "../data/evcilHayvanlar";
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../data/gizemliEsyalar";
import { yerlesimGetir } from "../data/yerlesimler";
import { oturumKaydet, oturumYukle, aktifOturumlariYukle } from "../db/sessionRepository";
import { MULK_TANIMLARI, mulkTanimiGetir } from "../data/mulkler";
import {
  MAGAZA_ESYALARI,
  magazaEsyasiTanimiGetir,
  sifaBasariSans,
  sifaFaydaAralik,
  SIFA_HICBIRSEY_SANS,
} from "../data/magazaEsyalari";
import { SahipOlunanEsya, MagazaEsyaKategori } from "../types";

/** Saray-içi ("sarayda" etiketiyle açılan) takip olayları; "ölmeden önce en az iki kez" garantisi bu listeye göre sayılır. */
const SARAY_OLAY_IDLERI = [
  "saray_ic_entrika",
  "saray_balosu",
  "saray_dedikodu",
  "saray_av_daveti",
  "saray_suikast_duyumu",
  "saray_mutfak_kazasi",
];

/** Yeni bir ekip üyesi işe alınırken rastgele atanan, tamamen kozmetik kişilik etiketi. */
const EKIP_KISILIK_HAVUZU = ["Sadık", "Hırslı", "Korkak", "Kurnaz", "Tembel", "Cesur", "Güvenilmez", "Çalışkan"];

/** Alkollü bir sosyalleşme mekânında (meyhane/pub/ordugâh çadırı) kaçıncı olayda "ayyaş" damgası kalıcı olarak vurulur. */
const AYYAS_ESIGI = 3;

/**
 * Sosyalleşme (büyük denge turu — kullanıcı: "sosyalleşme daha masraflı olsun ama moral
 * yükseltsin"). Bir mekâna gitmek artık peşin bir giriş ücreti ister (enflasyonla ölçekli),
 * o mekânda yaşanan olay çözülünce de motor kuralı olarak küçük bir ek masraf düşülür ve
 * moral (jittersiz, sabit) yükselir — 73 sosyalleşme olayını tek tek elden geçirmeden.
 */
const SOSYALLESME_GIRIS_UCRETI = 3;
const SOSYALLESME_EK_MASRAF = 2;
const SOSYALLESME_MORAL_BONUSU = 4;

/**
 * "Suç işleyerek para kazanma" motor kuralı. Uygulanan sonuç etkisi hem para
 * kazandırıyor (para>0) hem de ağır bir ahlaki taviz içeriyorsa (ahlak <= eşik),
 * bu bir "kazanç için suç" seçimi sayılır ve olay bankasındaki ~180 böyle seçenek
 * tek tek elle etiketlenmeden motor seviyesinde şu şekilde büyütülür:
 *  - para kazancı SUC_KAZANC_PARA_CARPANI ile çarpılır ("daha hızlı zengin ol"),
 *  - tek suç/aranma ekseni suc_seviyesi hızla yükselir (üst şeritteki yıldız
 *    göstergesi + aranma kademeleri + hapis eşiği). Ağır suçlar daha büyük sıçratır.
 * Böylece suç, hem en hızlı zenginlik yolu hem de en hızlı tutuklama/kaçak yolu olur.
 * Sabitler dengelemek için buradan ayarlanır.
 */
const SUC_KAZANC_AHLAK_ESIGI = -5;
const SUC_KAZANC_PARA_CARPANI = 1.6;
// Büyük denge turunda tekrar büyütüldü (10→16 taban, 28→45 / 40→65 tavan, formül
// katsayıları 0.5/0.15 → 0.8/0.25): pasif azalma yok (bkz. stateManager.sucSeviyesiUygula),
// suç birikimi kalıcı ve kullanıcı "aranma seviyesi çok daha hızlı artsın" istedi —
// tek bir "kazanç için ahlaki taviz" seçimi artık bir-iki aranma kademesi sıçratabilir.
const SUC_KAZANC_SUC_ARTIS_TABAN = 16;
const SUC_KAZANC_SUC_ARTIS_TAVAN = 45;
const SUC_KAZANC_CIDDI_AHLAK = -15;
const SUC_KAZANC_CIDDI_PARA = 40;
/** Ağır suçlarda suc_artis tavanı bu değere yükselir (bir aranma kademesini tek suçta atlatabilir). */
const SUC_KAZANC_CIDDI_TAVAN = 65;

/** Mülk sahibi bir karaktere, her senaryoUret çağrısında mulkOlaylari.ts'ten zorlanan bir olay gelme ihtimali. */
const MULK_OLAYI_IHTIMALI = 0.12;

/**
 * Yolculuk (Haçlı Seferi / Hac / Keşif / Sömürge Seferi vb.) olaylarında kazanılan
 * paraya uygulanan sabit zam. Eskiden yolculuğu bitirmek kalıcı bir maaş primi
 * (maas_carpani ×1.2) veriyordu; artık o kaldırıldı — bunun yerine yalnızca
 * yolculuk sürerken (yolculukOlayi:true olay) elde edilen para %20 daha değerli.
 */
const YOLCULUK_KAZANC_CARPANI = 1.2;

/**
 * Her olay seçiminden gelen pozitif paraya uygulanan sabit çarpan. Büyük denge
 * turunda 1.055'ten 0.85'e çekildi: kullanıcı "olaylardan gelen para ödüllerini
 * %20 düşür" dedi — eski +%5.5 primi de yutularak net ≈ −%20. YALNIZ pozitif
 * para'ya biner (kayıplara değil). Meslek/yolculuk/suç çarpanlarının hepsinin
 * altında, ilk sırada uygulanır.
 */
const OLAY_PARA_PRIMI = 0.85;

type SucKazanciSonucu = "yok" | "suc" | "ciddi";

/**
 * Verilen (jitter uygulanmış, mesleğe göre çarpılmış) sonuç etkisini yerinde
 * mutasyona uğratır. etki nesnesi çağrı zincirinde `uygulananEtki` olarak geri
 * döndüğü ve state'e bu nesneden uygulandığı için burada büyütmek yeterli —
 * downstream (state mutasyonu, EtkiCipleri gösterimi, hayat hikayesi büyük-kazanç
 * kaydı) otomatik olarak büyütülmüş değerleri görür.
 */
export function sucKazanciUygula(etki: SonucEtkisi): SucKazanciSonucu {
  const para = etki.para ?? 0;
  const ahlak = etki.ahlak ?? 0;
  if (para <= 0 || ahlak > SUC_KAZANC_AHLAK_ESIGI) return "yok";

  etki.para = Math.round(para * SUC_KAZANC_PARA_CARPANI);

  const ciddi = ahlak <= SUC_KAZANC_CIDDI_AHLAK || para >= SUC_KAZANC_CIDDI_PARA;
  const tavan = ciddi ? SUC_KAZANC_CIDDI_TAVAN : SUC_KAZANC_SUC_ARTIS_TAVAN;
  const artis = Math.round(
    Math.min(tavan, SUC_KAZANC_SUC_ARTIS_TABAN + Math.abs(ahlak) * 0.8 + para * 0.25)
  );
  etki.suc_artis = (etki.suc_artis ?? 0) + artis;

  return ciddi ? "ciddi" : "suc";
}

/** Din_kultur değerinden ilgili Hac yolculuğu teklif olayına eşleme. */
const DIN_HAC_TEKLIF_IDLERI: Record<string, string> = {
  "Sünni İslam": "hac_sunni_karar",
  "Katolik": "hac_katolik_karar",
  "Ortodoks": "hac_ortodoks_karar",
  "Anglikan": "hac_anglikan_karar",
};

/**
 * Karakterin meslek/çağ/bölge/din kombinasyonuna göre uygun olan "büyük yolculuk"
 * teklif olaylarının id listesini döndürür (birden fazlaysa rastgele biri seçilir,
 * böylece aynı meslek/çağdaki karakterler farklı yolculuklar yaşayabilir).
 */
function uygunYolculukTeklifleri(state: CharacterState): string[] {
  const teklifler: string[] = [];
  if (state.meslek === "Asker" && state.cag === "Orta Çağ") {
    // Asker zaten orduda olduğu için "katılmak ister misin?" diye sorulmaz;
    // bölgesine uygun sefere doğrudan seferber edilir (bkz. oc_hacli_sefer_asker_cagrisi).
    if (["Fransa", "Kutsal Roma", "Bizans"].includes(state.bolge)) teklifler.push("oc_hacli_sefer_asker_cagrisi");
    if (["Selçuklu", "Eyyubiler"].includes(state.bolge)) teklifler.push("yolculuk_savunma_teklif");
  }
  if ((state.meslek === "Asker" || state.meslek === "Tüccar") && state.cag === "Sanayi Devrimi") {
    teklifler.push("sd_somurge_gitme_karari");
  }
  if (state.meslek === "Tüccar") {
    teklifler.push("yolculuk_kesif_teklif");
    if (state.cag === "Sanayi Devrimi") teklifler.push("yolculuk_mucit_teklif");
  }
  if (state.meslek === "Din Adamı") {
    const teklifId = DIN_HAC_TEKLIF_IDLERI[state.din_kultur];
    if (teklifId) teklifler.push(teklifId);
  }
  return teklifler;
}

interface BekleyenTepki {
  onTepki: OnTepki;
  mevcutOlay: OlayTanimi;
  eskiRutbeSeviye: number;
}

interface Oturum {
  state: CharacterState;
  mevcutSenaryo: SenaryoResponse | null;
  mevcutOlay: OlayTanimi | null;
  zorlananOlayId: string | null;
  /** En son erişim zamanı (ms); bitmiş oturumları bellekten temizlemek için kullanılır. */
  sonErisim: number;
  /** En son gösterilen olayın tonu; art arda ağır olay gelmesini azaltmak için kullanılır. */
  sonTon: "agir" | "hafif" | null;
  /** onTepki'li bir seçenek seçildiğinde, gerçek sonuç uygulanana kadar burada bekler. */
  bekleyenTepki: BekleyenTepki | null;
}

const oturumlar = new Map<string, Oturum>();

/**
 * Server açılışında DB'deki aktif oturumları in-memory önbelleğe yükler; bir
 * önceki çalışmadan yarım kalmış oyunlar restart sonrası da devam edebilir.
 */
export async function oturumlariYukle(): Promise<number> {
  const stateler = await aktifOturumlariYukle();
  for (const state of stateler) {
    eskiKayitGocu(state);
    oturumlar.set(state.id, {
      state,
      mevcutSenaryo: null,
      mevcutOlay: null,
      zorlananOlayId: null,
      sonErisim: Date.now(),
      sonTon: null,
      bekleyenTepki: null,
    });
  }
  return stateler.length;
}

async function oturumGetir(id: string): Promise<Oturum> {
  const varOlan = oturumlar.get(id);
  if (varOlan) {
    varOlan.sonErisim = Date.now();
    return varOlan;
  }
  const state = await oturumYukle(id);
  if (!state) throw new Error("Oyun oturumu bulunamadı.");
  eskiKayitGocu(state);
  const oturum: Oturum = {
    state,
    mevcutSenaryo: null,
    mevcutOlay: null,
    zorlananOlayId: null,
    sonErisim: Date.now(),
    sonTon: null,
    bekleyenTepki: null,
  };
  oturumlar.set(id, oturum);
  return oturum;
}

/**
 * Bitmiş (aktif:false) ve bir süredir erişilmemiş oturumları in-memory
 * önbellekten siler; DB'deki kaydı etkilemez, tekrar gerekirse oradan
 * yüklenir. Sürekli çalışan bir sunucuda sınırsız RAM büyümesini önler.
 */
export function oturumlariBellektenTemizle(graceMs: number): number {
  const esik = Date.now() - graceMs;
  let silinen = 0;
  for (const [id, oturum] of oturumlar) {
    if (!oturum.state.aktif && oturum.sonErisim < esik) {
      oturumlar.delete(id);
      silinen++;
    }
  }
  return silinen;
}

export function aktifOturumSayisi(): number {
  return oturumlar.size;
}

export async function yeniOyun(
  cag: Cag,
  bolge: string,
  yerlesimId: string,
  oyuncuIsmi?: string,
  dil?: string
): Promise<CharacterState> {
  const state = createCharacter(cag, bolge, yerlesimId, oyuncuIsmi, dil);
  oturumlar.set(state.id, {
    state,
    mevcutSenaryo: null,
    mevcutOlay: null,
    zorlananOlayId: null,
    sonErisim: Date.now(),
    sonTon: null,
    bekleyenTepki: null,
  });
  await oturumKaydet(state);
  return state;
}

/** İsim seçim ekranı için: bölge/çağa uygun kültürel bir isim önerir. */
export function isimOnerisiGetir(cag: Cag, bolge: string): string {
  return rastgeleBirIsimSec(cag, bolge);
}

export async function mesleğiAta(id: string, meslek: string): Promise<CharacterState> {
  const oturum = await oturumGetir(id);
  if (oturum.state.meslek) throw new Error("Meslek zaten seçildi.");
  mesleğiSec(oturum.state, meslek);
  await oturumKaydet(oturum.state);
  return oturum.state;
}

export async function stateGetir(id: string): Promise<CharacterState> {
  return (await oturumGetir(id)).state;
}

/**
 * Oyun sürerken oyuncu Ayarlar'dan dili değiştirdiğinde çağrılır. state.dil
 * sadece POST /new anında yazıldığı için, Türkçe başlayıp sonradan İngilizceye
 * geçen (ya da eski/göç etmiş) kayıtlarda olay/anlatı metinleri Türkçe kalıyordu
 * — arayüz istemci tarafında çevrilse bile. Bu, sonraki senaryodan itibaren
 * olayları da çevirmek için state.dil'i günceller.
 */
export async function oturumDiliAyarla(id: string, dil: "tr" | "en"): Promise<CharacterState> {
  const oturum = await oturumGetir(id);
  oturum.state.dil = dil === "en" ? "en" : "tr";
  await oturumKaydet(oturum.state);
  return oturum.state;
}

export async function senaryoUret(id: string): Promise<SenaryoResponse> {
  const oturum = await oturumGetir(id);
  if (!oturum.state.aktif) throw new Error("Oyun zaten bitmiş.");

  let zorlananId = oturum.zorlananOlayId ?? undefined;
  let etiketDegisti = false;
  if (!zorlananId && !oturum.state.ulke.savasta && oturum.state.yas <= 55) {
    const rakip = tarihiSavasKontrol(oturum.state.bolge, oturum.state.yil, oturum.state.cag);
    if (rakip) {
      const izlemeEtiketi = `tarihi_savas_gordu:${rakip}`;
      if (!oturum.state.etiketler.includes(izlemeEtiketi)) {
        // Bir asker zaten orduda olduğu için "katılmak ister misin?" diye sorulmaz;
        // sivil meslekler için olduğu gibi gönüllü/kaçak seçeneği yerine, doğrudan
        // seferberliğe alınan bir asker varyantı zorla tetiklenir.
        zorlananId = oturum.state.meslek === "Asker" ? "dunya_savas_ilani_asker" : "dunya_savas_ilani";
        etiketEkle(oturum.state, [izlemeEtiketi]);
        etiketDegisti = true;
      }
    }
  }
  // Orta Çağ'da Asker/Din Adamı, 18 yaşından itibaren henüz bir kariyer yoluna
  // girmemişse (yol:asker:*/yol:din:* etiketi yok), o mesleğin dallanan kariyer
  // sisteminin giriş olayı zorla tetiklenir — böylece her karakter mutlaka bir
  // yola (itaatkâr/isyancı/kahraman/... ya da dürüst/yozlaşmış/tarikat/...)
  // kilitlenir; şansa bırakılmış hizip sisteminin aksine bu garanti bir kaskad.
  if (
    !zorlananId &&
    oturum.state.cag === "Orta Çağ" &&
    oturum.state.yas >= 18 &&
    (oturum.state.meslek === "Asker" || oturum.state.meslek === "Din Adamı")
  ) {
    const yolOnEki = oturum.state.meslek === "Asker" ? "yol:asker:" : "yol:din:";
    const zatenYolda = oturum.state.etiketler.some((e) => e.startsWith(yolOnEki));
    if (!zatenYolda) {
      const girisId = oturum.state.meslek === "Asker" ? "oc_asker_yol_ilk_emir" : "oc_din_yol_ilk_sinav";
      if (!oturum.state.gecmis_olaylar.includes(girisId)) {
        zorlananId = girisId;
      }
    }
  }
  // 29 yaşına kadar hiç evlenmemiş ve evlilik teklifiyle hiç karşılaşmamışsa
  // (ne ilk teklif ne de ikinci teklif zinciri), garanti bir kez zorla tetiklenir.
  if (
    !zorlananId &&
    oturum.state.yas >= 29 &&
    !oturum.state.etiketler.includes("medeni:evli") &&
    !oturum.state.gecmis_olaylar.includes("iliski_evlilik_teklifi") &&
    !oturum.state.gecmis_olaylar.includes("iliski_ikinci_teklif")
  ) {
    zorlananId = "iliski_evlilik_teklifi";
  }
  // Rütbe 4'e (5 kademeli merdivende "başarılı kariyer" eşiği) ulaşan bir
  // karaktere, şansa bırakmadan bir kez şehir yönetimi arenasına giriş teklifi
  // zorla sunulur — yoksa 360+ olayın arasında yıllarca gizli kalabilir.
  if (!zorlananId && oturum.state.rutbe_seviye >= 4 && !oturum.state.etiketler.includes("sehir_yonetimi_basladi")) {
    const baslangicId =
      oturum.state.meslek === "Tüccar"
        ? "sehir_yonetim_tuccar_baslangic"
        : oturum.state.meslek === "Din Adamı"
          ? "sehir_yonetim_dinadami_baslangic"
          : oturum.state.meslek === "Asker"
            ? "sehir_yonetim_asker_baslangic"
            : undefined;
    if (baslangicId && !oturum.state.gecmis_olaylar.includes(baslangicId)) {
      zorlananId = baslangicId;
    }
  }
  // 20-25 yaş arası, henüz evcil hayvanı olmayan bir karaktere hayatında bir kez
  // (rastgele bir olayı beklemeden) doğrudan sahiplenme teklifi sunulur.
  if (
    !zorlananId &&
    !oturum.state.evcil_hayvan &&
    oturum.state.yas >= 20 &&
    oturum.state.yas < 25
  ) {
    const teklifId =
      oturum.state.cag === "Sanayi Devrimi"
        ? "evcilhayvan_sahiplenme_teklifi_sanayi"
        : "evcilhayvan_sahiplenme_teklifi_ortacag";
    if (!oturum.state.gecmis_olaylar.includes(teklifId)) {
      zorlananId = teklifId;
    }
  }
  // Evcil hayvanı olan bir karakter 45-50 yaş aralığında henüz en az iki
  // hayvanla-ilgili olay yaşamadıysa, genel (türden bağımsız, her zaman uygun)
  // takip olaylarından biri zorla tetiklenir; havuz tükendikçe tekrar edebilir.
  if (
    !zorlananId &&
    oturum.state.evcil_hayvan &&
    oturum.state.yas >= 45 &&
    oturum.state.yas < 50
  ) {
    const gorulenSayisi = oturum.state.gecmis_olaylar.filter((id) =>
      EVCIL_HAYVAN_TAKIP_OLAY_IDLERI.includes(id)
    ).length;
    if (gorulenSayisi < 2) {
      const gorulmemis = EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI.filter(
        (id) => !oturum.state.gecmis_olaylar.includes(id)
      );
      const havuz = gorulmemis.length > 0 ? gorulmemis : EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI;
      zorlananId = havuz[Math.floor(Math.random() * havuz.length)];
    }
  }
  // Gizemli bir eşyaya (envanter:/esya: etiketli) sahip olup henüz onun kendi
  // takip olaylarından hiçbirini yaşamamış bir karaktere, 38-46 yaş aralığında
  // (ölmeden önce bir marj bırakılır) o eşyanın havuzundan biri zorla tetiklenir.
  if (!zorlananId && oturum.state.yas >= 38 && oturum.state.yas < 46) {
    const sahipOlunanEsyalar = oturum.state.etiketler
      .filter((e) => e.startsWith("esya:") || e.startsWith("envanter:"))
      .map((e) => e.slice(e.indexOf(":") + 1));
    for (const esyaId of sahipOlunanEsyalar) {
      const havuz = GIZEMLI_ESYA_TAKIP_HAVUZU[esyaId];
      if (!havuz || havuz.length === 0) continue;
      const gorulenSayisi = havuz.filter((id) => oturum.state.gecmis_olaylar.includes(id)).length;
      if (gorulenSayisi === 0) {
        const gorulmemis = havuz.filter((id) => !oturum.state.gecmis_olaylar.includes(id));
        const secimHavuzu = gorulmemis.length > 0 ? gorulmemis : havuz;
        zorlananId = secimHavuzu[Math.floor(Math.random() * secimHavuzu.length)];
        break;
      }
    }
  }
  // Bir hizbe katılmış karakter 45-50 yaş aralığında henüz en az üç hizip-özel
  // olay yaşamadıysa (o hizbe özel olaylar + kendi mesleğine uygun çatışma
  // olayı + genel hizip olayları), havuzdan biri zorla tetiklenir.
  if (!zorlananId && oturum.state.hizip !== null && oturum.state.yas >= 45 && oturum.state.yas < 50) {
    const hizipEtiketi = `hizip:${oturum.state.hizip}`;
    const hizipOlaylari = OLAY_BANKASI.filter(
      (o) =>
        (o.gerekliHizip && (!o.meslekler || o.meslekler.includes(oturum.state.meslek))) ||
        o.gerekliEtiketler?.includes(hizipEtiketi)
    );
    const gorulenSayisi = hizipOlaylari.filter((o) => oturum.state.gecmis_olaylar.includes(o.id)).length;
    if (gorulenSayisi < 3) {
      const gorulmemis = hizipOlaylari.filter((o) => !oturum.state.gecmis_olaylar.includes(o.id));
      const havuz = gorulmemis.length > 0 ? gorulmemis : hizipOlaylari;
      if (havuz.length > 0) {
        zorlananId = havuz[Math.floor(Math.random() * havuz.length)].id;
      }
    }
  }
  // Ün ve ahlak belli bir eşiğin üstündeyse kral karakteri saraya çağırır;
  // bu, rüşvet/saygınlık denemesinin (saray_girme_denemesi) yanında saraya
  // girmenin garantili, şansa bağlı olmayan ikinci bir yolu.
  if (
    !zorlananId &&
    !oturum.state.etiketler.includes("sarayda") &&
    oturum.state.un >= 70 &&
    oturum.state.ahlak >= 70 &&
    !oturum.state.gecmis_olaylar.includes("saray_kral_daveti")
  ) {
    zorlananId = "saray_kral_daveti";
  }
  // Saraya girmiş bir karakter 50-58 yaş aralığında henüz en az iki saray
  // olayı yaşamadıysa (ortalama ölüm yaşı ~60 hedeflendiği için ölmeden
  // önce bir marj bırakılır), havuzdan biri zorla tetiklenir.
  if (
    !zorlananId &&
    oturum.state.etiketler.includes("sarayda") &&
    oturum.state.yas >= 50 &&
    oturum.state.yas < 58
  ) {
    const gorulenSayisi = oturum.state.gecmis_olaylar.filter((id) => SARAY_OLAY_IDLERI.includes(id)).length;
    if (gorulenSayisi < 2) {
      const gorulmemis = SARAY_OLAY_IDLERI.filter((id) => !oturum.state.gecmis_olaylar.includes(id));
      const havuz = gorulmemis.length > 0 ? gorulmemis : SARAY_OLAY_IDLERI;
      zorlananId = havuz[Math.floor(Math.random() * havuz.length)];
    }
  }
  // Her karakter hayatında en az bir kez, mesleğine/çağına/bölgesine/dinine uygun
  // bir "büyük yolculuk"a (Haçlı Seferi, Hac, Coğrafi Keşif, Mucit Turnesi, Sömürge
  // Seferi, Kutsal Toprakları Savunma Seferi) zorlanır. Reddedilirse teklif olayının
  // kendisi bir "durum" ekleyip birkaç yıl sonra (bitince_etiket: yolculuk_teklifi_zamani)
  // tekrar sorulmasını sağlar; bir yolculuk tamamlanınca (yolculuk_tamamlandi etiketi)
  // garanti kalıcı olarak kapanır — ikinci bir yolculuk asla zorlanmaz.
  if (
    !zorlananId &&
    oturum.state.yas >= 22 &&
    !oturum.state.etiketler.includes("yolculukta") &&
    !oturum.state.etiketler.includes("hapiste") &&
    !oturum.state.etiketler.includes("yolculuk_tamamlandi") &&
    (!oturum.state.etiketler.includes("yolculuk_teklifi_edildi") ||
      oturum.state.etiketler.includes("yolculuk_teklifi_zamani"))
  ) {
    const uygunlar = uygunYolculukTeklifleri(oturum.state);
    if (uygunlar.length > 0) {
      zorlananId = uygunlar[Math.floor(Math.random() * uygunlar.length)];
    }
  }
  // Her karakter hayatında en az bir "gizemli" (esrarengiz eşya/olay) anıyla
  // karşılaşsın diye: 25-45 yaş aralığında, hiç gizemli:true olay görmemişse
  // ve o an uygun (çağ/bölge/meslek/etiket filtrelerinden geçen) en az bir
  // gizemli olay varsa, zorla tetiklenir. Havuz küçükse (çoğu takip olayı belirli
  // bir eşyaya sahip olmayı gerektirir) bu kural sıklıkla giriş olaylarından
  // birini (gizem_ejderha_tilsimi, derinlik_hazine_haritasi vb.) seçer.
  if (!zorlananId && oturum.state.yas >= 25 && oturum.state.yas < 45) {
    const gizemliGorulduMu = oturum.state.gecmis_olaylar.some(
      (id) => OLAY_BANKASI.find((o) => o.id === id)?.gizemli
    );
    if (!gizemliGorulduMu) {
      const uygunGizemliler = OLAY_BANKASI.filter((o) => o.gizemli && temelUygunMu(o, oturum.state));
      if (uygunGizemliler.length > 0) {
        zorlananId = uygunGizemliler[Math.floor(Math.random() * uygunGizemliler.length)].id;
      }
    }
  }
  // Sahip olunan her piyasa mülkü türünün kendine özel bir flavor/karar olay
  // havuzu var (mulkOlaylari.ts) — normal rastgele havuzdan tamamen dışlanır,
  // sadece burada düşük bir periyodik şansla (sansOlayiDene ile aynı ruhta)
  // zorlanan olay olarak gelir. Görülmemiş olaylar önceliklidir.
  if (!zorlananId && oturum.state.mulkler.length > 0 && Math.random() < MULK_OLAYI_IHTIMALI) {
    const sahipTurler = new Set(oturum.state.mulkler);
    const uygunMulkOlaylari = OLAY_BANKASI.filter((o) => o.mulkOlayi && sahipTurler.has(o.mulkOlayi));
    if (uygunMulkOlaylari.length > 0) {
      const gorulmemis = uygunMulkOlaylari.filter((o) => !oturum.state.gecmis_olaylar.includes(o.id));
      const havuz = gorulmemis.length > 0 ? gorulmemis : uygunMulkOlaylari;
      zorlananId = havuz[Math.floor(Math.random() * havuz.length)].id;
    }
  }

  const { olay, senaryo } = olaySec(oturum.state, zorlananId, oturum.sonTon);
  oturum.mevcutSenaryo = senaryo;
  oturum.mevcutOlay = olay;
  oturum.zorlananOlayId = null;
  oturum.sonTon = olay.ton ?? null;
  // Yeni bir senaryo üretmek, bekleyen bir onTepki (geri çekil/ısrar et) varsa onu
  // geçersiz kılar — yoksa oyuncu bu YENİ senaryodaki bir seçeneği tıkladığında
  // secimUygula önce eski bekleyenTepki'yi görüp yanlış (ve eşleşmeyen) sonucu
  // uygulardı. Bu, sekme yenilenip devam alma gibi durumlarda gerçek bir risk.
  oturum.bekleyenTepki = null;
  // İstihbarat tek seferlik: bu senaryo net şansla gösterildiyse etiket burada tüketilir.
  if (oturum.state.etiketler.includes("istihbarat_var")) {
    etiketSil(oturum.state, ["istihbarat_var"]);
    etiketDegisti = true;
  }
  if (etiketDegisti) await oturumKaydet(oturum.state);
  return senaryo;
}

interface SecimSonucu {
  state: CharacterState;
  basarili: boolean;
  uygulananEtki: SonucEtkisi;
  yasArtisi: number;
  sonucAnlatimi: string;
  zamanAnlatimi: string | null;
  /** Bu turda rütbe atlandıysa true; istemci bunu ayrı bir kutlama (ses+animasyon) için kullanır. */
  terfiOldu: boolean;
  /**
   * Bu turda gerçekleşen para hareketinin kaynak/kalem kırılımı. Σ(tüm alanlar) ==
   * bu turda state.para'daki net değişim (mutabakatlı). Şimdilik yalnız analiz/
   * simülasyon araçları okur; istemci kullanmıyor (opsiyonel — eski kayıtlarda yok).
   */
  nakitAkisi?: TurNakitAkisi;
}

/** Bir turdaki tüm nakit giriş/çıkışının kalem bazlı dökümü; toplamları o turun net para değişimine eşittir. */
export interface TurNakitAkisi {
  /** Olay seçiminin pozitif para etkisi (meslek/yolculuk/suç çarpanları uygulanmış hâli). */
  olayGeliri: number;
  /** Olay seçiminin negatif para etkisi (mutlak değer). */
  olayGideri: number;
  /** Turdaki tüm yıllar için toplam brüt maaş geliri (yıllık dalgalanma dahil). */
  maasBrut: number;
  giderYasam: number;
  giderKonut: number;
  giderEkip: number;
  giderEvcil: number;
  savasVergisi: number;
  /** Borç faizi (borç yokken 0). */
  faiz: number;
  /** Sahip olunan mülklerin net getirisi; zararda negatif. Bakım/vergi bu tutardan zaten düşülmüştür. */
  mulkNet: number;
  /** Lüks mağaza eşyalarının periyodik bakım/vergi masrafı (mutlak değer). */
  envanterBakim: number;
  /** Kralın zorunlu bağış tahsilatı (mutlak değer). */
  zorunluBagis: number;
  /** Zenginlik sızıntısı (hırsız/haraç/dolandırıcı — net servet ≥ 350 & nakit ≥ 50; mutlak değer). */
  zenginlikSizinti: number;
  /** Yukarıdaki kalemlerin dışında kalan her şey (kriz para etkisi, şans olayı, servet_kaybet/para_sifirla vb.) — net. */
  digerNet: number;
  /** Bilgi amaçlı: mülk bakım tutarı (mulkNet içinde zaten düşülü — mutabakata AYRICA girmez). */
  bilgiMulkBakim: number;
}

const YARIM_YILDIZ_PUAN = 10;

export function jitterUygula(etki: SonucEtkisi): SonucEtkisi {
  const carpan = () => 0.85 + Math.random() * 0.3; // 0.85 - 1.15
  const uygula = (deger?: number) => (deger ? Math.round(deger * carpan()) : deger);
  const un = uygula(etki.un);
  return {
    ...etki,
    // Para ondalık (2 basamağa kadar) kalır — sağlık/mutluluk/ün/ahlak gibi tam sayıya
    // yuvarlanmaz, böylece düşük enflasyon oranlarının (ör. Orta Çağ %1/yıl) etkisi de
    // kesirlerde görünür kalır.
    para: etki.para ? paraYuvarla(etki.para * carpan()) : etki.para,
    // Her olay Ün'ü en az yarım yıldız (10 puan) etkiler ki yıldız barında gözle görülür olsun.
    un: un ? Math.sign(un) * Math.max(Math.abs(un), YARIM_YILDIZ_PUAN) : un,
    ahlak: uygula(etki.ahlak),
    saglik: uygula(etki.saglik),
    mutluluk: uygula(etki.mutluluk),
  };
}

// Sağlık düştükçe ölümcül sonuçlanma ihtimali artar: yalnızca 30 sağlığın
// ALTINDA devreye girer (2026-09 ekonomi dengesi: eşik 45→30'a çekildi — 30-45
// bandı "riskli ama ölümcül değil" olsun), 0 sağlıkta temel şansın ~1.75 katına çıkar.
export function efektifOlumSansi(baseSans: number, saglik: number): number {
  const carpan = 1 + Math.max(0, 30 - saglik) / 40;
  return Math.min(95, baseSans * carpan);
}

/**
 * onTepki çözümlemesinde gerçek bir zar yok; sonuç ekranının kutlama mı yoksa
 * düşüş efekti mi göstereceğine, etkinin görünür istatistiklerdeki net
 * toplamının işaretine bakarak karar verilir. olum varsa kesin olumsuzdur.
 */
function netEtkiOlumluMu(etki: SonucEtkisi): boolean {
  if (etki.olum) return false;
  const toplam =
    (etki.para ?? 0) +
    (etki.un ?? 0) +
    (etki.ahlak ?? 0) +
    (etki.saglik ?? 0) +
    (etki.mutluluk ?? 0) +
    (etki.es_puani ?? 0) +
    (etki.dost_puani ?? 0);
  return toplam >= 0;
}

export async function secimUygula(id: string, secenekIndex: number): Promise<SecimSonucu | TepkiSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");

  // Bir önceki çağrıda onTepki'li bir seçenek seçilmişse, bu çağrı zar atmadan
  // doğrudan geri çekil (0) / ısrar et (1) sonucunu uygular; zaman burada ilerler.
  if (oturum.bekleyenTepki) {
    if (secenekIndex !== 0 && secenekIndex !== 1) throw new Error("Geçersiz seçenek index'i.");
    const { onTepki, mevcutOlay, eskiRutbeSeviye } = oturum.bekleyenTepki;
    oturum.bekleyenTepki = null;
    const etki = jitterUygula(secenekIndex === 0 ? onTepki.geriCekilSonucu : onTepki.devamSonucu);
    etki.mesaj = doldur(etki.mesaj, state);
    if (etki.detay) etki.detay = doldur(etki.detay, state);
    // Burada zar yok; "basarili" bayrağı sonuç ekranındaki görsel/ses efektinin doğru
    // (kutlama ya da düşüş) yönde çalması için etkinin net iyi/kötü olduğuna bakılarak belirlenir.
    return sonucuUygulaVeIlerlet(oturum, mevcutOlay, etki, netEtkiOlumluMu(etki), eskiRutbeSeviye);
  }

  const { mevcutSenaryo, mevcutOlay } = oturum;
  if (!mevcutSenaryo || !mevcutOlay) throw new Error("Önce bir senaryo üretilmeli.");

  const secenek = mevcutSenaryo.secenekler[secenekIndex];
  const hamSecenek = mevcutOlay.secenekler[secenekIndex];
  if (!secenek || !hamSecenek) throw new Error("Geçersiz seçenek index'i.");
  if (secenek.kilitli) throw new Error(secenek.kilit_nedeni ?? "Bu seçenek şu an seçilemez.");

  if (hamSecenek.onTepki) {
    oturum.bekleyenTepki = { onTepki: hamSecenek.onTepki, mevcutOlay, eskiRutbeSeviye: state.rutbe_seviye };
    const tepki: TepkiSonucu = {
      ara_tepki: true,
      olay_basligi: "Bir An Duraksadın",
      olay_metni: doldur(hamSecenek.onTepki.metin, state),
      secenekler: [{ metin: hamSecenek.onTepki.geriCekilMetni }, { metin: hamSecenek.onTepki.devamMetni }],
    };
    return tepki;
  }

  const eskiRutbeSeviye = state.rutbe_seviye;
  const basarili = rollSuccess(secenek.basari_sansi);
  const etki = jitterUygula(basarili ? secenek.basarili_sonuc : secenek.basarisiz_sonuc);
  // {dost}/{rakip}/{es}/{cocuk}/{ekip} yer tutucuları sonuç mesajlarında da kullanılabilsin diye
  // (olay/seçenek metninde olduğu gibi) burada da dolduruluyor.
  etki.mesaj = doldur(etki.mesaj, state);
  if (etki.detay) etki.detay = doldur(etki.detay, state);
  return sonucuUygulaVeIlerlet(oturum, mevcutOlay, etki, basarili, eskiRutbeSeviye);
}

async function sonucuUygulaVeIlerlet(
  oturum: Oturum,
  mevcutOlay: OlayTanimi,
  etki: SonucEtkisi,
  basarili: boolean,
  eskiRutbeSeviye: number
): Promise<SecimSonucu> {
  const { state } = oturum;
  // Nakit akışı defteri: turun sonunda Σ(alanlar) == state.para'daki net değişim olacak
  // şekilde kalem kalem doldurulur; digerNet artık kalan farkı kapatır.
  const paraGiris = state.para;
  const nakitAkisi: TurNakitAkisi = {
    olayGeliri: 0, olayGideri: 0, maasBrut: 0, giderYasam: 0, giderKonut: 0,
    giderEkip: 0, giderEvcil: 0, savasVergisi: 0, faiz: 0, mulkNet: 0,
    envanterBakim: 0, zorunluBagis: 0, zenginlikSizinti: 0, digerNet: 0, bilgiMulkBakim: 0,
  };
  // Olay geliri primi: maaş dışı gelir kanalını hafifçe güçlendirir (her olay için ~%5.5).
  if (etki.para && etki.para > 0) {
    etki.para = paraYuvarla(etki.para * OLAY_PARA_PRIMI);
  }
  // Saldırı gücü / ticaret sermayesi / nüfuz, kendi kategorisindeki kazançları büyütür.
  if (etki.para && etki.para > 0) {
    etki.para = Math.round(etki.para * meslekMetrikCarpani(state, mevcutOlay.kategori));
  }
  // Yolculuk olaylarında kazanılan para %20 daha değerli (eski kalıcı "yolculuğu
  // bitirdin" maaş priminin yerini alır — meslek çarpanının üstüne biner).
  if (etki.para && etki.para > 0 && mevcutOlay.yolculukOlayi) {
    etki.para = Math.round(etki.para * YOLCULUK_KAZANC_CARPANI);
  }
  // Suç işleyerek para kazanma: para kazancını büyütür + suç/aranma seviyesini
  // hızla yükseltir (meslek çarpanının üstüne biner — suç + kendi mesleğin en hızlı
  // zenginlik yolu, ama en hızlı hapis/kaçak yolu da). Bkz. sucKazanciUygula.
  const sucKazanci = sucKazanciUygula(etki);
  if (mevcutOlay.kategori === "savas") {
    orduKaybiUygula(state, basarili);
  }

  // Alkollü bir sosyalleşme mekânında (meyhane/pub/ordugâh çadırı) yaşanan her olay
  // ziyaret sayacını artırır; eşiğe İLK kez ulaşıldığında (bagimlilik:ayyas henüz
  // yoksa) kalıcı bir "ayyaşlık" damgası vurulur (rising-edge). Burada tersine
  // dönüş yok (kalıcı), tek çıkışı sosyal_meyhane_ayilma olayıdır.
  let ayyasOlduBuTur = false;
  if (mevcutOlay.sosyallesmeYeri) {
    // Büyük denge turu: sosyalleşme "masraflı ama moral verir". Mekân olayı çözülünce
    // enflasyonla ölçekli sabit bir ek masraf düşülür ve moral (jittersiz, sabit) yükselir —
    // 73 sosyalleşme olayını tek tek elden geçirmeye gerek kalmadan.
    etki.para = paraYuvarla((etki.para ?? 0) - SOSYALLESME_EK_MASRAF * enflasyonCarpani(state));
    etki.mutluluk = (etki.mutluluk ?? 0) + SOSYALLESME_MORAL_BONUSU;
    const ziyaretEdilenYer = sosyallesmeYeriGetir(mevcutOlay.sosyallesmeYeri);
    if (ziyaretEdilenYer?.alkolluMu) {
      state.alkol_ziyaret_sayisi += 1;
      if (state.alkol_ziyaret_sayisi >= AYYAS_ESIGI && !state.etiketler.includes("bagimlilik:ayyas")) {
        etiketEkle(state, ["bagimlilik:ayyas", "bagimlilik:var"]);
        state.ahlak -= 10;
        state.un -= 15;
        durumEkle(state, {
          id: "ayyaslik",
          ad: "Ayyaşlık",
          tur: "kalici",
          tur_basi_saglik: -1,
          tur_basi_mutluluk: -1,
        });
        maasCarpaniUygula(state, 0.95);
        hayatOlayiEkle(state, "🍷", "Artık bir ayyaş olarak tanınıyor");
        ayyasOlduBuTur = true;
      }
    }
  }

  const olayPara = etki.para ?? 0;
  nakitAkisi.olayGeliri = Math.max(0, olayPara);
  nakitAkisi.olayGideri = Math.max(0, -olayPara);
  state.para += etki.para ?? 0;
  state.un += etki.un ?? 0;
  state.ahlak += etki.ahlak ?? 0;
  state.saglik += etki.saglik ?? 0;
  state.mutluluk += etki.mutluluk ?? 0;
  state.dost_puani += etki.dost_puani ?? 0;
  state.rakip_puani += etki.rakip_puani ?? 0;
  if (etki.para_sifirla) state.para = 0;
  if (etki.un_sifirla) state.un = 0;
  if (etki.para_yuzde_kaybet && state.para > 0) {
    state.para -= Math.round(state.para * (etki.para_yuzde_kaybet / 100));
  }
  if (etki.yerlesim_zorla) {
    const zorlananYerlesim = yerlesimGetir(etki.yerlesim_zorla);
    if (zorlananYerlesim) state.yerlesim = zorlananYerlesim.ad;
  }
  if (etki.ordu_techizat_artis) {
    state.ordu_techizat_seviyesi = Math.min(100, state.ordu_techizat_seviyesi + etki.ordu_techizat_artis);
  }
  if (etki.ticaret_sermaye_artis) state.ticaret_sermaye += etki.ticaret_sermaye_artis;
  if (etki.nufuz_artis) state.nufuz += etki.nufuz_artis;
  // Kariyer puanı: mesleğine uygun kategoride (savas/ticaret/din) başarılı olmak
  // seni rütbede ilerletir; kilit taşı olaylar ayrıca doğrudan puan verebilir.
  if (basarili && MESLEK_KATEGORI[state.meslek] === mevcutOlay.kategori) {
    state.kariyer_puani += KARIYER_PUANI_KATEGORI_BASARI;
  }
  if (etki.kariyer_puani_artis) state.kariyer_puani += etki.kariyer_puani_artis;
  if (etki.suc_artis) state.suc_seviyesi += etki.suc_artis;
  if (etki.suc_seviyesi_ayarla !== undefined) state.suc_seviyesi = etki.suc_seviyesi_ayarla;
  if (etki.yeni_meslek) state.meslek = etki.yeni_meslek;
  if (etki.maas_carpani) maasCarpaniUygula(state, etki.maas_carpani);
  if (etki.sehir_yonetim_artis) {
    state.sehir_yonetim_seviyesi += etki.sehir_yonetim_artis;
    sehirYonetimGuncelle(state);
    hayatOlayiEkle(state, "🏛️", T(state.dil, "{0} unvanına ulaştı", [K(state.dil, state.sehir_yonetim_unvan)]));
  }

  if (etki.para && Math.abs(etki.para) >= 50) {
    hayatOlayiEkle(
      state,
      etki.para > 0 ? "💰" : "📉",
      T(state.dil, etki.para > 0 ? "Büyük kazanç: {0} {birim}" : "Büyük kayıp: {0} {birim}", [
        (etki.para > 0 ? "+" : "") + etki.para,
      ]).replace(/\{birim\}/g, state.para_birimi)
    );
  }

  const savasBasliyorMu = etki.ulke_etkisi?.savasta === true && !state.ulke.savasta;
  if (savasBasliyorMu) {
    hayatOlayiEkle(state, "⚔️", T(state.dil, "{0} savaşa sürüklendi", [K(state.dil, state.bolge)]));
  }

  // Veba başlangıcı (veba_baslangici olayı) çözüldüğünde parametreleri (süre/kira-maaş
  // çarpanları) burada rastgele belirlenir; başlatan seçeneğin `veba_koruma`
  // alanı (0/1/2) yıllık ölüm/kayıp risk kademesini belirler (bkz. vebaYillikKontrol).
  const vebaBasliyorMu = etki.ulke_etkisi?.vebada === true && !state.ulke.vebada;
  if (vebaBasliyorMu) {
    vebaBaslat(state, etki.veba_koruma ?? 0);
    hayatOlayiEkle(state, "☠️", T(state.dil, "{0} vebaya yakalandı", [K(state.dil, state.bolge)]));
  }

  if (etki.es_ata) {
    state.es_adi = rastgeleBirIsimSec(state.cag, state.bolge, [state.dost_adi, state.rakip_adi]);
    state.es_puani = 60;
    state.es_meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
    const esRutbeTanimi = rutbeTanimiGetir(state.es_meslek, state.cag, state.din_kultur);
    state.es_rutbe = esRutbeTanimi
      ? esRutbeTanimi.unvanlar[Math.floor(Math.random() * esRutbeTanimi.unvanlar.length)]
      : state.es_meslek;
    hayatOlayiEkle(state, "💍", T(state.dil, "{0} ile evlendi", [state.es_adi]));
  }
  if (etki.es_kaybet) {
    const kaybedilenEs = state.es_adi;
    state.es_adi = null;
    state.es_puani = 0;
    state.es_meslek = null;
    state.es_rutbe = null;
    etiketSil(state, ["medeni:evli"]);
    if (kaybedilenEs) hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile yolları ayrıldı", [kaybedilenEs]));
  }
  if (state.es_adi) state.es_puani += etki.es_puani ?? 0;

  if (etki.cocuk_ekle) {
    for (let i = 0; i < etki.cocuk_ekle; i++) {
      const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
        state.dost_adi,
        state.rakip_adi,
        state.es_adi ?? "",
        ...state.cocuklar.map((c) => c.isim),
      ]);
      state.cocuklar.push({ isim, dogum_yili: state.yil, yasiyor: true });
      hayatOlayiEkle(state, "👶", T(state.dil, "{0} doğdu", [isim]));
    }
    state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
    etiketEkle(state, ["cocuk_var"]);
  }
  if (etki.cocuk_kaybet) {
    const yasayanlar = state.cocuklar.filter((c) => c.yasiyor);
    if (yasayanlar.length > 0) {
      const secilen = yasayanlar[Math.floor(Math.random() * yasayanlar.length)];
      secilen.yasiyor = false;
      state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
      hayatOlayiEkle(state, "💔", T(state.dil, "{0} kaybedildi", [secilen.isim]));
      if (state.cocuk_sayisi === 0) etiketSil(state, ["cocuk_var"]);
    }
  }

  if (etki.ekip_ekle) {
    const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi,
      state.rakip_adi,
      state.es_adi ?? "",
      ...state.ekip.map((e) => e.isim),
    ]);
    // Üç zar ortalaması: uçlar (çok kötü/çok iyi) nadir, ortalama tutulmak daha olası — "bazen hasta, bazen aşırı başarılı" hissi.
    const gercekKalite = Math.round((Math.random() * 100 + Math.random() * 100 + Math.random() * 100) / 3);
    const genislik = etki.ekip_ekle.tahminGenisligi;
    const tahminiMin = Math.max(0, Math.round(gercekKalite - genislik / 2));
    const tahminiMax = Math.min(100, Math.round(gercekKalite + genislik / 2));
    const maas = 2 + Math.round(gercekKalite / 14);
    const sadakat = Math.round(30 + Math.random() * 60);
    const kisilik = EKIP_KISILIK_HAVUZU[Math.floor(Math.random() * EKIP_KISILIK_HAVUZU.length)];
    state.ekip.push({
      id: randomUUID(),
      isim,
      rol: etki.ekip_ekle.rol,
      gercekKalite,
      tahminiMin,
      tahminiMax,
      maas,
      sadakat,
      kisilik,
    });
    maasCarpaniUygula(state, 1 + (gercekKalite - 50) / 500);
    hayatOlayiEkle(state, "🤝", T(state.dil, "{0} ({1}) ekibine katıldı", [isim, K(state.dil, etki.ekip_ekle.rol)]));
  }
  if (etki.ekip_kaybi && state.ekip.length > 0) {
    const idx = Math.floor(Math.random() * state.ekip.length);
    const kaybedilen = state.ekip.splice(idx, 1)[0];
    hayatOlayiEkle(state, "👋", T(state.dil, "{0} ekipten ayrıldı", [kaybedilen.isim]));
  }
  if (etki.ekip_sil) {
    const idx = state.ekip.findIndex((uye) => uye.rol === etki.ekip_sil);
    if (idx !== -1) {
      const kaybedilen = state.ekip.splice(idx, 1)[0];
      hayatOlayiEkle(state, "👋", T(state.dil, "{0} ekipten ayrıldı", [kaybedilen.isim]));
    }
  }
  if (etki.hizip_ata) {
    state.hizip = etki.hizip_ata;
    etiketEkle(state, [`hizip:${etki.hizip_ata}`, "hizip_secildi"]);
  }
  if (etki.evcil_hayvan_edin && !state.evcil_hayvan) {
    const tur = etki.evcil_hayvan_edin.tur ?? rastgeleHayvanTuruSec(state.cag);
    const isim = rastgeleHayvanIsmiSec();
    state.evcil_hayvan = { tur, isim };
    etiketEkle(state, ["evcil_hayvan_var", `evcil_hayvan_tur:${tur}`]);
    hayatOlayiEkle(state, "🐾", T(state.dil, "{0} adlı bir {1} edindi", [
      isim,
      K(state.dil, tur).toLocaleLowerCase(state.dil === "en" ? "en" : "tr"),
    ]));
  }
  if (etki.evcil_hayvan_kaybet && state.evcil_hayvan) {
    const kaybedilen = state.evcil_hayvan;
    state.evcil_hayvan = null;
    etiketSil(state, ["evcil_hayvan_var", `evcil_hayvan_tur:${kaybedilen.tur}`]);
    hayatOlayiEkle(state, "💔", T(state.dil, "{0} adlı {1}sini kaybetti", [
      kaybedilen.isim,
      K(state.dil, kaybedilen.tur).toLocaleLowerCase(state.dil === "en" ? "en" : "tr"),
    ]));
  }
  if (etki.mulk_kaybet && state.mulkler.includes(etki.mulk_kaybet)) {
    const kaybedilenMulk = mulkTanimiGetir(etki.mulk_kaybet);
    state.mulkler = state.mulkler.filter((m) => m !== etki.mulk_kaybet);
    if (state.mulk_bakim_kalan) delete state.mulk_bakim_kalan[etki.mulk_kaybet];
    hayatOlayiEkle(state, "🚨", T(state.dil, "{0} el konuldu", [K(state.dil, kaybedilenMulk.ad)]));
  }
  if (etki.unvan_kazan && !state.unvanlar.includes(etki.unvan_kazan)) {
    state.unvanlar.push(etki.unvan_kazan);
    hayatOlayiEkle(state, "🏵️", T(state.dil, '"{0}" ünvanını kazandı', [K(state.dil, etki.unvan_kazan)]));
  }
  if (etki.hayat_amaci_ata && !state.hayat_amaci) {
    state.hayat_amaci = { ...etki.hayat_amaci_ata, tamamlandi: false };
    hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını belirledi: {0}", [K(state.dil, etki.hayat_amaci_ata.ad)]));
  }
  if (etki.kriz_baslat) {
    state.ulke.kriz = { tur: etki.kriz_baslat.tur, bitisYili: state.yil + etki.kriz_baslat.sureYil };
  }
  etiketEkle(state, etki.etiket_ekle);
  etiketSil(state, etki.etiket_sil);
  ulkeGuncelle(state, etki.ulke_etkisi);
  durumEkle(state, etki.durum_ekle);
  if (etki.durum_sil) {
    state.durumlar = state.durumlar.filter((d) => !etki.durum_sil!.includes(d.id));
  }
  clampStats(state);

  if (etki.zorunlu_sonraki) oturum.zorlananOlayId = etki.zorunlu_sonraki;

  let sonucAnlatimi = sonucAnlatimiUret(state, etki, basarili);
  if (sucKazanci === "ciddi") {
    sonucAnlatimi = `${sonucAnlatimi} ${T(state.dil, "Bu iş kirliydi; {0} kolluğu artık adını bir listede tutuyor.", [
      K(state.dil, state.bolge),
    ])}`;
  } else if (sucKazanci === "suc") {
    sonucAnlatimi = `${sonucAnlatimi} ${T(state.dil, "Kolay para hep bir iz bırakır.")}`;
  }

  let olumTetiklendi = etki.olum === true;
  if (!olumTetiklendi && etki.olum_sansi !== undefined) {
    const sans = efektifOlumSansi(etki.olum_sansi, state.saglik);
    if (Math.random() * 100 < sans) olumTetiklendi = true;
  }
  checkDeath(state, olumTetiklendi, etki.mesaj);
  // efsanevi_olum rozeti YALNIZCA ölüm gerçekten gerçekleştiyse atanır: Kutsal
  // Emanet relik'i ölümü iptal ederse (checkDeath) hayatta kalan karakter,
  // yaşamadığı bir "efsanevi ölüm" damgasını taşımasın.
  if (etki.efsanevi_olum && !state.aktif) {
    state.efsanevi_olum = etki.efsanevi_olum;
  }

  let yasArtisi = 0;
  let zamanAnlatimi: string | null = null;
  let capraz = { saglikKaybi: 0, mutlulukKaybi: 0 };
  let hukumdarDegisimHaberi: string | null = null;
  if (state.aktif) {
    // Olay bazlı süre alanları (sureYilMin/Max) kasıtlı olarak yok sayılıyor: 367 olayın
    // çoğunda sabit "1 yıl" tanımlı olduğundan ortalama turu hedeften epey altına çekiyordu.
    // Bunun yerine her turda 1 ya da 2 yıl ilerlenir; %40 ihtimalle 1, %60 ihtimalle 2 yıl
    // seçilerek ortalama ~1.6 yıl/tur (yani bir olay ortalama 1-2 yılda bir çıkar) hedeflenir.
    // Tek istisna: yolculuk zinciri adımları (yolculukOlayi:true), 4-5 yıllık bir yolculukta
    // 5-10 adımın sığması için sabit 1 yıl ilerler.
    const eskiHukumdar = state.hukumdar;
    const turSuresi = Math.random() < 0.4 ? 1 : 2;
    yasArtisi = mevcutOlay.yolculukOlayi ? ilerletYas(state, 1, 1) : ilerletYas(state, turSuresi, turSuresi);
    // Pasif kıdem: hayatta geçen her yıl kariyer puanını biraz büyütür (yatırım yapmayan
    // bir karakter de zamanla rütbe atlar; yatırım sadece bunu hızlandırır).
    state.kariyer_puani += KARIYER_PUANI_YILLIK * yasArtisi;
    if (eskiHukumdar && state.hukumdar && state.hukumdar !== eskiHukumdar) {
      const haber = hukumdarDegisimHaberiUret(
        Khukumdar(state.dil, eskiHukumdar),
        Khukumdar(state.dil, state.hukumdar),
        state.dil
      );
      hukumdarDegisimHaberi = haber;
      hayatOlayiEkle(state, "👑", T(state.dil, "Hükümdar değişti: {0}", [Khukumdar(state.dil, state.hukumdar)]));
    }
    const durumOlumMesaji = durumlariUygula(state);
    if (durumOlumMesaji) {
      checkDeath(state, true, durumOlumMesaji);
    }
    if (state.aktif) {
      const ekonomi = pasifEkonomiUygula(state, yasArtisi);
      nakitAkisi.maasBrut = ekonomi.yillikGelirler.reduce((a, b) => a + b, 0);
      nakitAkisi.giderYasam = ekonomi.giderKalemleri.yasam * yasArtisi;
      nakitAkisi.giderKonut = ekonomi.giderKalemleri.konut * yasArtisi;
      nakitAkisi.giderEkip = ekonomi.giderKalemleri.ekip * yasArtisi;
      nakitAkisi.giderEvcil = ekonomi.giderKalemleri.evcilHayvan * yasArtisi;
      nakitAkisi.savasVergisi = ekonomi.giderKalemleri.savasVergisi * yasArtisi;
      nakitAkisi.faiz = ekonomi.faiz;
      checkDeath(state, false); // borç stresiyle sağlık 0'a inmiş olabilir
      if (state.aktif) {
        const yaslanmaKaybi = yaslanmaUygula(state, yasArtisi);
        if (state.saglik <= 0) {
          checkDeath(state, true, "İleri yaşın getirdiği yorgunlukla huzur içinde vefat etti.");
        }
        if (state.aktif) {
          capraz = capraletkiUygula(state, yasArtisi);
          if (state.saglik <= 0) {
            checkDeath(state, true, "Uzun süredir çöken ruh hali bedenini de tüketti.");
          }
        }
        if (state.aktif) {
          // İleri yaş "ecel" riski: 70+ her yıl artan doğal ölüm ihtimali,
          // can/servet ne olursa olsun (pahalı ev + iyi yemek "ölümsüzlüğünü" sınırlar).
          const ecelMesaji = ecelDenemesi(state, yasArtisi);
          if (ecelMesaji) checkDeath(state, true, ecelMesaji);
        }
        if (state.aktif) {
          zamanAnlatimi = zamanAnlatimiUret(state, yasArtisi, ekonomi);
          if (ayyasOlduBuTur) {
            const ayyasMesaji =
              "🍷 Artık mahallede 'ayyaş' diye biliniyorsun; bu sağlığını, itibarını ve işini kalıcı olarak yıpratacak.";
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${ayyasMesaji}` : ayyasMesaji;
          }
          if (ekonomi.borcYardimi > 0) {
            const yardimMesaji = T(
              state.dil,
              "🙏 Zor günlerinde kilise ve birkaç eş dost devreye girdi; borcunun {0} {1}'ini kapattılar. Bu bir daha olmayacak.",
              [ekonomi.borcYardimi, state.para_birimi]
            );
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${yardimMesaji}` : yardimMesaji;
            hayatOlayiEkle(state, "🙏", T(state.dil, "Borç yardımı aldı: +{0} {1}", [ekonomi.borcYardimi, state.para_birimi]));
          }
          // Küçük kriz (5-7 yılda bir kıtlık/haydut baskını + o yıla mahsus ×2 gıda
          // şoku) krizEtkisiUygula'dan HEMEN önce çağrılır ki bu turda tetiklenirse
          // -2 sağlık/yıl etkisini de bu turda görsün.
          const kucukKrizMesaji = kucukKrizKontrolEt(state, yasArtisi);
          if (kucukKrizMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${kucukKrizMesaji}` : kucukKrizMesaji;
            hayatOlayiEkle(state, "🌾", "Küçük bir kriz patlak verdi");
          }
          orduBuyumesiDene(state, yasArtisi);
          const krizBitisMesaji = krizEtkisiUygula(state, yasArtisi);
          if (state.saglik <= 0) {
            checkDeath(state, true, T(state.dil, "Kıtlığın getirdiği yoksunlukla tükendi."));
          }
          const mulkSonucu = mulkGelirleriUygula(state, yasArtisi);
          if (mulkSonucu.kervanBatti) {
            const kervanMesaji = T(state.dil, "🌊 Ticaret kervanın savaşın kaosunda kayboldu; yatırımından geriye bir şey kalmadı.");
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${kervanMesaji}` : kervanMesaji;
          }
          for (const bakim of mulkSonucu.bakimOdemeleri) {
            const bakimMesaji = T(state.dil, "🔧 {0} için {1} {birim} bakım/vergi gideri ödedin.", [
              K(state.dil, bakim.ad),
              bakim.miktar,
            ]).replace(/\{birim\}/g, state.para_birimi);
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${bakimMesaji}` : bakimMesaji;
          }
          nakitAkisi.mulkNet = mulkSonucu.toplamNet;
          nakitAkisi.bilgiMulkBakim = mulkSonucu.bakimOdemeleri.reduce((a, b) => a + b.miktar, 0);
          sucSeviyesiUygula(state, yasArtisi);
          const envanterSonucu = envanterBozulmasiUygula(state, yasArtisi);
          if (envanterSonucu.cozulenler.length > 0) {
            const cozulmeMesaji =
              envanterSonucu.cozulenler.length === 1
                ? T(state.dil, "🗑️ {0} çürüdü, atmak zorunda kaldın.", [K(state.dil, envanterSonucu.cozulenler[0])])
                : T(state.dil, "🗑️ Envanterinden {0} eşya ({1}) çürüdü.", [
                    envanterSonucu.cozulenler.length,
                    envanterSonucu.cozulenler.map((c) => K(state.dil, c)).join(", "),
                  ]);
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${cozulmeMesaji}` : cozulmeMesaji;
          }
          for (const bakim of envanterSonucu.bakimOdemeleri) {
            const bakimMesaji = T(state.dil, "🔧 {0} için {1} {birim} bakım gideri ödedin.", [
              K(state.dil, bakim.ad),
              bakim.miktar,
            ]).replace(/\{birim\}/g, state.para_birimi);
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${bakimMesaji}` : bakimMesaji;
          }
          nakitAkisi.envanterBakim = envanterSonucu.bakimOdemeleri.reduce((a, b) => a + b.miktar, 0);
          const sansMesaji = sansOlayiDene(state);

          // Zorunlu bağış / büyük savaş / veba — arka planda tetiklenen dünya olayları;
          // sonuçları (varsa) ayyaşlık bildirimiyle aynı desende koşulsuz olarak
          // zamanAnlatimi'ye eklenir (aşağıdaki tek-slotlu ekCumle önceliğinden bağımsız,
          // çünkü hepsi nadir ve önemli birer haber).
          const bagisSonucu = zorunluBagisKontrolEt(state, yasArtisi);
          if (bagisSonucu) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${bagisSonucu.mesaj}` : bagisSonucu.mesaj;
            hayatOlayiEkle(state, "👑", T(state.dil, "Zorunlu bağış: -{0} {birim}", [bagisSonucu.miktar]).replace(/\{birim\}/g, state.para_birimi));
            nakitAkisi.zorunluBagis = bagisSonucu.miktar;
          }

          // Zenginlik sızıntısı (hırsız/haraç/dolandırıcı — net servet ≥ 350 & nakit ≥ 50).
          const sizintiSonucu = zenginlikSizintiKontrolEt(state, yasArtisi);
          if (sizintiSonucu) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${sizintiSonucu.mesaj}` : sizintiSonucu.mesaj;
            hayatOlayiEkle(state, "🗡️", T(state.dil, "Zenginlik sızıntısı: -{0} {birim}", [sizintiSonucu.miktar]).replace(/\{birim\}/g, state.para_birimi));
            nakitAkisi.zenginlikSizinti = sizintiSonucu.miktar;
          }

          const savasBaslamaMesaji = buyukSavasKontrolEt(state, yasArtisi);
          if (savasBaslamaMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${savasBaslamaMesaji}` : savasBaslamaMesaji;
            hayatOlayiEkle(state, "⚔️", "Büyük bir savaş başladı");
          }
          const savasBitisMesaji = buyukSavasBitisKontrolEt(state);
          if (savasBitisMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${savasBitisMesaji}` : savasBitisMesaji;
            hayatOlayiEkle(state, "🕊️", "Büyük savaş sona erdi");
          }

          if (!oturum.zorlananOlayId && vebaBaslamaliMi(state, yasArtisi)) {
            oturum.zorlananOlayId = "kuresel_veba_baslangici";
          }
          const vebaSonucu = vebaYillikKontrol(state, yasArtisi);
          for (const vebaMesaji of vebaSonucu.mesajlar) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${vebaMesaji}` : vebaMesaji;
          }
          if (vebaSonucu.karakterOldu) {
            checkDeath(state, true, "Veba seni de bulmuştu.");
          }
          if (state.aktif) {
            const vebaBitisMesaji = vebaBitisKontrolEt(state);
            if (vebaBitisMesaji) {
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${vebaBitisMesaji}` : vebaBitisMesaji;
              hayatOlayiEkle(state, "🕊️", T(state.dil, "Veba sona erdi"));
            }
          }

          // En fazla TEK ek bağlam cümlesi eklenir — art arda yığılıp metni
          // uzatmasın diye önem/nadirlik sırasına göre sadece biri seçilir.
          // Yaşlanma kaybı en rutin/sık olanı olduğu için hem en düşük
          // öncelikli hem de her seferinde değil, ara sıra belirtilir.
          const ekCumle =
            krizBitisMesaji ??
            sansMesaji ??
            (capraz.saglikKaybi > 0 ? T(state.dil, "İçindeki karanlık bedenini de yormaya başladı.") : null) ??
            (capraz.mutlulukKaybi > 0 ? T(state.dil, "Sağlığındaki bu düşüş moralini de eziyor.") : null) ??
            (yaslanmaKaybi > 0 && Math.random() < 0.3
              ? T(state.dil, "Yaşın ilerledikçe bedenin eskisi kadar dayanmıyor.")
              : null);
          if (ekCumle) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${ekCumle}` : ekCumle;
          }

          if (state.aktif) {
            const aniOlum = aniOlumDene(state);
            if (aniOlum) {
              checkDeath(state, true, aniOlum.mesaj);
              // Relik ölümü iptal edebilir; rozet yalnız gerçekten öldüyse.
              if (!state.aktif) state.efsanevi_olum = aniOlum.efsane;
            }
          }
        }
      } else {
        state.olum_nedeni = T(state.dil, "Borç ve yoksulluk içinde tükendi.");
      }
    }
  }

  let terfiOldu = false;
  if (state.aktif) {
    gecmisKaydet(state);
    rutbeGuncelle(state);
    if (state.rutbe_seviye > eskiRutbeSeviye) {
      terfiOldu = true;
      const yeniMaas = hesaplaMaasYillik(state);
      const terfiMesaji = T(state.dil, "🎖️ Artık {0}'sin! Yıllık kazancın: {1} {birim}.", [
        K(state.dil, state.rutbe),
        yeniMaas,
      ]).replace(/\{birim\}/g, state.para_birimi);
      zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${terfiMesaji}` : terfiMesaji;
      hayatOlayiEkle(state, "🎖️", T(state.dil, "{0} rütbesine terfi etti", [K(state.dil, state.rutbe)]));
    }
    hayatAmaciKontrolEt(state);
    state.haberler = haberleriUret(state);
    if (hukumdarDegisimHaberi) {
      state.haberler = [hukumdarDegisimHaberi, ...state.haberler];
    }
  }

  // Yaşlanma/kriz/şans gibi turun sonundaki pasif adımlardan bazıları (ör. krizEtkisiUygula)
  // kendi içinde clampStats çağırmıyor; kalıcı kayıttan önce burada son bir kez sınırlıyoruz.
  clampStats(state);

  state.gecmis_olaylar.push(mevcutOlay.id);
  oturum.mevcutSenaryo = null;
  oturum.mevcutOlay = null;

  // digerNet, kalem bazlı defterle gerçek para değişimi arasındaki farkı kapatır
  // (kriz para etkisi, şans olayı, para_sifirla/para_yuzde_kaybet, ani ölüm öncesi vb.).
  const mutabakatliToplam =
    nakitAkisi.olayGeliri -
    nakitAkisi.olayGideri +
    nakitAkisi.maasBrut -
    nakitAkisi.giderYasam -
    nakitAkisi.giderKonut -
    nakitAkisi.giderEkip -
    nakitAkisi.giderEvcil -
    nakitAkisi.savasVergisi -
    nakitAkisi.faiz +
    nakitAkisi.mulkNet -
    nakitAkisi.envanterBakim -
    nakitAkisi.zorunluBagis -
    nakitAkisi.zenginlikSizinti;
  nakitAkisi.digerNet = paraYuvarla(state.para - paraGiris - mutabakatliToplam);

  await oturumKaydet(state);
  return { state, basarili, uygulananEtki: etki, yasArtisi, sonucAnlatimi, zamanAnlatimi, terfiOldu, nakitAkisi };
}

export interface FinansOzeti {
  maasYillik: number;
  giderKalemleri: GiderKalemleri;
  netYillik: number;
  /** Gelir (maaş) enflasyonu yüzdesi — oyuncuya gösterilmez, iç kullanım/uyum için. */
  enflasyonYuzdesi: number;
  /** Yaşam + konut GİDER enflasyonu yüzdesi (gelirden ayrı, biraz yüksek). Gelir&Gider ekranındaki seçim kartları bunu kullanır ki tutar gerçek gider dökümüyle birebir eşleşsin. */
  giderEnflasyonYuzdesi: number;
  /** Sahip olunan tüm gayrimenkullerin güncel toplam değeri (zorunlu bağış eşiği bu + nakit toplamına bakar). */
  gayrimenkulDegeri: number;
  /** Yıllık maaşın hangi bileşenlerden oluştuğu + her birinin kalıcı mı dönemsel mi olduğu. */
  maasKirilim: MaasKirilim;
  /** Mülklerden gelen yıllık tahmini net gelir — maaşın DIŞINDA, ayrı bir gelir akışı. */
  gayrimenkulYillikGelir: number;
  /** Şu an bütçeyi/sağlığı etkileyen dünya durumlarının insan-okunur listesi (ekonomi, savaş, salgın, kıtlık, enflasyon, zorunlu bağış eşiği). */
  dunyaEtkileri: DunyaFinansEtkisi[];
}

/** Bir sonraki turu beklemeden, güncel gelir/gider dökümünü salt-okunur olarak hesaplar; para değiştirmez. */
export async function finansGetir(id: string): Promise<FinansOzeti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const maasYillik = hesaplaMaasYillik(state);
  const giderKalemleri = giderKalemleriHesapla(state);
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.savasVergisi;
  return {
    maasYillik,
    giderKalemleri,
    netYillik: paraYuvarla(maasYillik - toplamGider),
    enflasyonYuzdesi: enflasyonYuzdesiHesapla(state),
    giderEnflasyonYuzdesi: giderEnflasyonYuzdesiHesapla(state),
    gayrimenkulDegeri: gayrimenkulDegeriHesapla(state),
    maasKirilim: maasKirilimHesapla(state),
    gayrimenkulYillikGelir: gayrimenkulYillikGelirHesapla(state),
    dunyaEtkileri: dunyaFinansEtkileri(state),
  };
}

interface KonutSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Olay beklemeden, oyuncunun istediği an tetikleyebileceği konut değişimi. */
export async function konutDegistir(id: string, konutId: string): Promise<KonutSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const mesaj = konutDegistirState(state, konutId);
  await oturumKaydet(state);
  return { state, mesaj };
}

interface YasamSecimiSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Olay beklemeden, oyuncunun istediği an tetikleyebileceği yaşam tarzı değişimi. */
export async function yasamSecimiDegistir(id: string, secimId: string): Promise<YasamSecimiSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const mesaj = yasamSecimiDegistirState(state, secimId);
  await oturumKaydet(state);
  return { state, mesaj };
}

/** Bir karakterin şu an evlenmeye uygun olup olmadığını kontrol eder; değilse sebebi fırlatır. */
function evlilikUygunlukKontrolEt(state: CharacterState): void {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.yas < 18) throw new Error("Evlenmek için henüz çok gençsin.");
  if (state.etiketler.includes("medeni:evli")) throw new Error("Zaten evlisin.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken evlenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken evlenemezsin.");
}

/** Bir evlilik adayının oyuncunun kişiliğiyle kaba bir uyum yüzdesi — paylaşılan özellik bonus verir, çelişen özellik kırar. */
function evlilikUyumHesapla(state: CharacterState, adayKisilik: [string, string]): number {
  let uyum = 45 + Math.floor(Math.random() * 30); // taban 45-74
  for (const ozellik of adayKisilik) {
    if (state.kisilik.includes(ozellik)) uyum += 12;
    const tanim = kisilikGetir(ozellik);
    if (tanim && state.kisilik.some((sahip) => tanim.celisenler.includes(sahip))) uyum -= 15;
  }
  return Math.max(15, Math.min(95, uyum));
}

function rastgeleEvlilikAdayiUret(state: CharacterState): EvlilikAdayi {
  const meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
  const rutbeTanimi = rutbeTanimiGetir(meslek, state.cag, state.din_kultur);
  const rutbe = rutbeTanimi
    ? rutbeTanimi.unvanlar[Math.floor(Math.random() * rutbeTanimi.unvanlar.length)]
    : meslek;
  const kisilik = rastgeleKisilikCifti();
  const disariBirak = [state.dost_adi, state.rakip_adi, state.es_adi].filter((a): a is string => Boolean(a));
  const isim = rastgeleBirIsimSec(state.cag, state.bolge, disariBirak);
  return { isim, meslek, rutbe, kisilik, uyumYuzdesi: evlilikUyumHesapla(state, kisilik) };
}

/** Olay beklemeden, oyuncunun istediği an açabileceği evlilik adayları listesi (2 aday, her çağrıda yeniden üretilir). Turu tüketmez. */
export async function evlilikAdaylariGetir(id: string): Promise<EvlilikAdayi[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  evlilikUygunlukKontrolEt(state);
  return [rastgeleEvlilikAdayiUret(state), rastgeleEvlilikAdayiUret(state)];
}

interface EvlilikTeklifSonucu {
  state: CharacterState;
  basarili: boolean;
  mesaj: string;
}

/**
 * Bir aday listeden seçilip teklif edilir: başarı şansı adayın uyumYuzdesi'ne +
 * oyuncunun mutluluk/ün durumuna göre küçük bir düzeltmeye bağlıdır (zar atılır).
 * Reddedilirse hiçbir state değişikliği olmaz, tekrar denenebilir. Turu tüketmez.
 */
export async function evlilikTeklifEt(id: string, aday: EvlilikAdayi): Promise<EvlilikTeklifSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  evlilikUygunlukKontrolEt(state);
  if (
    !aday ||
    typeof aday.isim !== "string" ||
    typeof aday.meslek !== "string" ||
    typeof aday.rutbe !== "string" ||
    !Array.isArray(aday.kisilik) ||
    aday.kisilik.length !== 2
  ) {
    throw new Error("Geçersiz evlilik adayı.");
  }
  const uyum = Math.max(5, Math.min(95, Math.round(aday.uyumYuzdesi ?? 50)));
  const sans = Math.max(
    10,
    Math.min(90, uyum + Math.round((state.mutluluk - 50) / 5) + Math.round((state.un - 20) / 10))
  );
  const basarili = Math.random() * 100 < sans;
  if (basarili) {
    state.es_adi = aday.isim;
    state.es_meslek = aday.meslek;
    state.es_rutbe = aday.rutbe;
    state.es_puani = 55 + Math.round(uyum / 5);
    etiketEkle(state, ["medeni:evli"]);
    hayatOlayiEkle(
      state,
      "💍",
      T(state.dil, "{0} ile evlendi ({1}, {2})", [
        aday.isim,
        K(state.dil, aday.kisilik[0]),
        K(state.dil, aday.kisilik[1]),
      ])
    );
    clampStats(state);
  }
  const mesaj = basarili
    ? T(state.dil, "{0} teklifini kabul etti! Artık evlisin.", [aday.isim])
    : T(state.dil, "{0} teklifini nazikçe geri çevirdi. Belki başka zaman...", [aday.isim]);
  await oturumKaydet(state);
  return { state, basarili, mesaj };
}

interface EkipCikarSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Olay beklemeden, oyuncunun istediği an bir ekip üyesini kovabilmesi; bir tur harcamaz, tazminat yok. */
export async function ekipCikar(id: string, ekipId: string): Promise<EkipCikarSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const index = state.ekip.findIndex((uye) => uye.id === ekipId);
  if (index === -1) throw new Error("Böyle bir ekip üyesi yok.");
  const [cikarilan] = state.ekip.splice(index, 1);
  hayatOlayiEkle(state, "👋", `${cikarilan.isim} (${cikarilan.rol}) ekibinden kovuldu`);
  await oturumKaydet(state);
  return { state, mesaj: T(state.dil, "{0}'i ekibinden çıkardın; artık yıllık maaşını ödemiyorsun.", [cikarilan.isim]) };
}

/**
 * Karakter öldükten sonra liderlik tablosuna skor kaydeder. skoru_kaydedildi
 * bayrağıyla aynı state.id için ikinci bir kayıt denemesini engeller — yoksa
 * tek bir bitmiş oyun, farklı isimler denenerek tabloyu onlarca sahte kayıtla
 * doldurabilir (route katmanı sadece bu fonksiyonu çağırır, kuralı burada tutar).
 */
export async function liderlikTablosunaKaydet(id: string, isim: string) {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (state.aktif) throw new Error("Oyun henüz bitmedi.");
  if (state.skoru_kaydedildi) throw new Error("Bu oyun için skor zaten kaydedildi.");
  const kayit = await skoruDbyeYaz(state, isim);
  state.skoru_kaydedildi = true;
  await oturumKaydet(state);
  return kayit;
}

interface YatirimSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * İş yatırımının maliyeti: sabit bir sayı değil, hem enflasyonla hem de bu
 * karakterin şimdiye kadar yaptığı yatırım sayısıyla büyür — her yeni yatırım
 * bir öncekinden %17 daha pahalıya patlar (gerçek bir işletmeyi büyütmenin her
 * seferinde biraz daha zorlaşması gibi). Taban değer bilinçli olarak "düz" bir
 * sayı değil; sonucun da 0/5 ile bitmemesi için son bir yuvarlama garantisi var.
 */
const KENDI_ISI_TEMEL_MALIYET = 45; // 63 → 45: ilk yatırımın giriş bariyeri 20'li yaşlara indirildi
const KENDI_ISI_ESKALASYON = 0.3; // her yatırım bir öncekinden %30 daha pahalı (zirve yine maaş çarpanı tavanına takılır)
/** Kendi işine her yatırımın verdiği kalıcı yıllık maaş primi (ham uygulanır; toplam MAAS_CARPANI_TAVAN'a tabidir). */
const KENDI_ISI_MAAS_PRIMI = 1.05;

function kendiIsiMaliyetiHesapla(state: CharacterState): number {
  let maliyet = Math.round(
    KENDI_ISI_TEMEL_MALIYET *
      Math.pow(1 + KENDI_ISI_ESKALASYON, state.kendi_isi_yatirim_sayisi) *
      enflasyonCarpani(state)
  );
  if (maliyet % 5 === 0) maliyet += 1;
  return maliyet;
}

function kendiIsiAsamaCumlesi(yatirimSayisi: number, dil: import("../types").Dil): string {
  if (yatirimSayisi === 0) return T(dil, "İlk kez cebindeki parayı kendi işine yatırdın.");
  if (yatirimSayisi <= 2) return T(dil, "İşin yavaş yavaş büyüyor; bu artık bir tesadüf değil, bir yön çiziyor.");
  if (yatirimSayisi <= 5) return T(dil, "Artık bölgede kendi alanında tanınan, köklü bir isim oldun.");
  return T(dil, "Küçük bir işletme değil, adeta küçük bir imparatorluk kuruyorsun artık.");
}

export interface YatirimConfig {
  kendiIsiMaliyeti: number;
  kendiIsiYatirimSayisi: number;
}

/** Yatırım ekranının canlı fiyat bilgisini döner; istemci sabitleri hardcode etmek yerine bunu kullanır. */
export async function yatirimConfigGetir(id: string): Promise<YatirimConfig> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  return {
    kendiIsiMaliyeti: kendiIsiMaliyetiHesapla(state),
    kendiIsiYatirimSayisi: state.kendi_isi_yatirim_sayisi,
  };
}

/** Olay beklemeden, oyuncunun istediği an tetikleyebileceği finansal aksiyon: kendi işine yatırım. */
export async function yatirimYap(id: string): Promise<YatirimSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!MESLEKLER.includes(state.meslek)) {
    throw new Error("Önce bir meslek seçmelisin.");
  }

  // Kendi işine yatırım artık meslek metriğini (teçhizat/sermaye/nüfuz) BÜYÜTMEZ;
  // her yatırım yalnızca kalıcı +%5 yıllık maaş primi verir. Bu prim, olay/aile
  // bonuslarıyla ortak MAAS_CARPANI_TAVAN'a (×1.40) tabidir — tavana ulaşıldığında
  // yeni yatırımın maaşa katkısı kalmaz.
  if (maasCarpaniGetir(state) >= MAAS_CARPANI_TAVAN) {
    throw new Error(T(state.dil, "İşin zaten zirvede; yeni bir yatırımın yıllık maaşına ek katkı sağlamaz."));
  }
  const maliyet = kendiIsiMaliyetiHesapla(state);
  if (state.para < maliyet) {
    throw new Error(T(state.dil, "Yeterli paran yok ({0} {birim} gerekli).", [maliyet]).replace(/\{birim\}/g, state.para_birimi));
  }
  state.para -= maliyet;
  const asama = kendiIsiAsamaCumlesi(state.kendi_isi_yatirim_sayisi, state.dil);
  state.kendi_isi_yatirim_sayisi += 1;
  // Yatırım rütbe ilerlemesini de bir miktar hızlandırır.
  state.kariyer_puani += KARIYER_PUANI_YATIRIM;
  const oncekiMaas = state.maas_yillik;
  maasCarpaniUygula(state, KENDI_ISI_MAAS_PRIMI, true);
  state.maas_yillik = hesaplaMaasYillik(state);

  const renk =
    state.meslek === "Asker"
      ? T(state.dil, "Birliğinin ikmaline ve düzenine sermaye ayırdın")
      : state.meslek === "Tüccar"
        ? T(state.dil, "Ticaretine bir tezgah daha kattın")
        : T(state.dil, "Cemaatin arasındaki işlerine daha çok emek verdin");
  let mesaj = T(state.dil, "{0} {1}. Bu, yıllık maaşını kalıcı olarak yaklaşık %5 artırdı ({2} → {3} {birim}). Yatırım kariyerini de biraz ilerletti.", [
    asama,
    renk,
    oncekiMaas,
    state.maas_yillik,
  ]).replace(/\{birim\}/g, state.para_birimi);
  if (maasCarpaniGetir(state) >= MAAS_CARPANI_TAVAN) {
    mesaj += " " + T(state.dil, "Artık işin zirvede — bundan sonraki yatırımların maaşına daha fazla katkı sağlamaz.");
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

// ---------------------------------------------------------------------------
// Piyasa mülkleri + dedikodular + yeraltı zar masası
// ---------------------------------------------------------------------------

export interface MulkKartBilgisi {
  tur: MulkTuru;
  ad: string;
  simge: string;
  aciklama: string;
  avantajliDurum: string;
  dezavantajliDurum: string;
  maliyet: number;
  sahipMi: boolean;
  /** Şu anki dünya durumuna göre tahmini yıllık getiri (%); negatifse mülk o an zarar ettiriyor demektir. */
  tahminiYillikGetiriYuzdesi: number;
  /** BRÜT: aynı oranın, güncel para biriminde karşılığı (mulkGelirleriUygula'nın gerçekte ekleyeceği getiriyle birebir aynı formül; bakım DAHİL DEĞİL). */
  tahminiYillikGetiriMiktari: number;
  /** 7-11 yılda bir çıkan periyodik bakım/vergi masrafının yıllığa indirgenmiş yaklaşık tutarı (getiriden ayrı, her zaman gider). */
  yillikBakimTahmini: number;
  /** NET: brüt getiri − yıllık bakım tahmini = oyuncunun eline gerçekten kalan yıllık akış. Negatifse mülk o an zarar ettiriyor. */
  tahminiYillikNet: number;
}

/** Yatırım ekranının "Yatırımlık Gayrimenkuller" bölümü için 5 mülkün güncel fiyat/getiri önizlemesini döner. */
export async function mulkConfigGetir(id: string): Promise<MulkKartBilgisi[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  return MULK_TANIMLARI.map((tanim) => {
    const oran = mulkGetiriOraniHesapla(tanim.tur, state.ulke);
    const tabanDegeri = tanim.taban_maliyet * enflasyon;
    return {
      tur: tanim.tur,
      ad: tanim.ad,
      simge: tanim.simge,
      aciklama: tanim.aciklama,
      avantajliDurum: tanim.avantajli_durum,
      dezavantajliDurum: tanim.dezavantajli_durum,
      maliyet: Math.max(1, paraYuvarla(tabanDegeri)),
      sahipMi: state.mulkler.includes(tanim.tur),
      tahminiYillikGetiriYuzdesi: Math.round(oran * 100),
      tahminiYillikGetiriMiktari: paraYuvarla(tabanDegeri * oran),
      yillikBakimTahmini: mulkYillikBakimTahmini(tanim.tur, state),
      tahminiYillikNet: paraYuvarla(tabanDegeri * oran - mulkYillikBakimTahmini(tanim.tur, state)),
    };
  });
}

interface MulkSatinAlSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Olay beklemeden, oyuncunun istediği an bir piyasa mülkü satın alabilmesi (her türden en fazla bir tane). */
export async function mulkSatinAl(id: string, tur: MulkTuru): Promise<MulkSatinAlSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.mulkler.includes(tur)) throw new Error("Bu mülke zaten sahipsin.");
  const tanim = mulkTanimiGetir(tur);
  const maliyet = Math.max(1, paraYuvarla(tanim.taban_maliyet * enflasyonCarpani(state)));
  if (state.para < maliyet) {
    throw new Error(`Yeterli paran yok (${maliyet} ${state.para_birimi} gerekli).`);
  }
  state.para -= maliyet;
  state.mulkler.push(tur);
  if (!state.mulk_bakim_kalan) state.mulk_bakim_kalan = {};
  state.mulk_bakim_kalan[tur] = rastgeleMulkBakimAraligi();
  clampStats(state);
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} satın aldın ({1} {birim}). {2}", [
      K(state.dil, tanim.ad),
      maliyet,
      K(state.dil, tanim.aciklama),
    ]).replace(/\{birim\}/g, state.para_birimi),
  };
}

/** Yatırım ekranının üstündeki "Piyasa Dedikoduları" şeridi için güncel dedikodu satırlarını döner. */
export async function dedikoduGetir(id: string): Promise<string[]> {
  const oturum = await oturumGetir(id);
  return piyasaDedikodulariUret(oturum.state);
}

const ZAR_KADEMELERI = [10, 50, 100] as const;
const ZAR_KAZANMA_SANSI = 0.4;
// Büyük denge turunda 4→7: aranma seviyesi genelde daha hızlı artsın (kullanıcı isteği).
const ZAR_SUC_ARTISI = 7;

/** Zar masası ekranının canlı bahis kademelerini döner (enflasyona göre ölçeklenir). */
export async function zarKademeleriGetir(id: string): Promise<number[]> {
  const oturum = await oturumGetir(id);
  const enflasyon = enflasyonCarpani(oturum.state);
  return ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyon)));
}

interface ZarSonucu {
  state: CharacterState;
  kazandi: boolean;
  mesaj: string;
}

/**
 * Yeraltı zar masası: kazanma şansı sabit %40, kazanınca bahis ×2, kaybedince tamamı gider.
 * Her el, oynadığın için suç/aranma seviyeni artırır (kalıcı bir yatırımdan farklı olarak
 * tekrar tekrar oynanabilir — asıl fren, yükselen suç seviyesinin getirdiği hapis riski).
 */
export async function zarAt(id: string, tutar: number): Promise<ZarSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const kademeler = ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyonCarpani(state))));
  if (!kademeler.includes(tutar)) throw new Error("Geçersiz bahis tutarı.");
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${tutar} ${state.para_birimi} gerekli).`);

  state.para -= tutar;
  state.suc_seviyesi += ZAR_SUC_ARTISI;
  const kazandi = Math.random() < ZAR_KAZANMA_SANSI;
  const birim = state.para_birimi;
  let mesaj: string;
  if (kazandi) {
    const kazanc = tutar * 2;
    state.para += kazanc;
    hayatOlayiEkle(state, "🎲", T(state.dil, "Zar masasında büyük kazandı: +{0} {birim}", [kazanc - tutar]).replace(/\{birim\}/g, birim));
    mesaj = T(state.dil, "Zar senden yana döndü! {0} {birim} yatırdın, {1} {birim} olarak geri aldın.", [tutar, kazanc]).replace(/\{birim\}/g, birim);
  } else {
    mesaj = T(state.dil, "Zar seni yüzüstü bıraktı; {0} {birim} masada kaldı.", [tutar]).replace(/\{birim\}/g, birim);
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, kazandi, mesaj };
}

// ---------------------------------------------------------------------------
// Sosyalleşme mekânları (meyhane, hamam, kahvehane, ordugâh çadırı, vb.)
// ---------------------------------------------------------------------------

export interface SosyallesmeYeriKarti extends SosyallesmeYeri {
  /** Sadece alkollü mekânlar için: karakterin şu ana kadarki ziyaret sayısı (AYYAS_ESIGI'ye ne kadar yakın olduğunu göstermek için). */
  ziyaretSayisi?: number;
}

/**
 * Karakterin çağ/bölge/meslek/etiket durumuna uygun, GERÇEKTEN gösterilecek en
 * az bir olayı olan sosyalleşme mekânlarını döner (Sosyalleş ekranı bunu listeler).
 * Hapisteyken ya da yolculuktayken boş liste döner — o etiketler zaten normal
 * olay havuzunu tamamen kapatır, sosyalleşmeye gitmek de mantıksız olur.
 */
export async function sosyallesmeYerleriGetir(id: string): Promise<SosyallesmeYeriKarti[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return [];
  return SOSYALLESME_YERLERI.filter(
    (yer) =>
      sosyallesmeYeriUygunMu(yer, state.cag, state.bolge, state.meslek) &&
      OLAY_SOSYALLESME.some((o) => o.sosyallesmeYeri === yer.id && temelUygunMu(o, state))
  ).map((yer) => ({
    ...yer,
    ziyaretSayisi: yer.alkolluMu ? state.alkol_ziyaret_sayisi : undefined,
  }));
}

interface SosyallesmeSonucu {
  state: CharacterState;
  /** Bu mekâna gitmek için düşülen peşin giriş ücreti (enflasyonla ölçekli). */
  girisUcreti: number;
}

/**
 * Oyuncunun istediği an tetikleyebileceği, bir tur harcamayan aksiyon: seçilen
 * mekâna gitmeyi kabul eder ve o mekâna ait bir olayı zorlanan-olay olarak
 * kuyruğa alır (oturum.zorlananOlayId). Olayın kendisi normal akışla (bir
 * sonraki POST /:id/scenario + /:id/choice) çözülür — zaman ORADA ilerler.
 */
export async function sosyallesmeYerineGit(id: string, yerId: string): Promise<SosyallesmeSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken sosyalleşemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bu mekâna gidemezsin.");
  const yer = sosyallesmeYeriGetir(yerId);
  if (!yer || !sosyallesmeYeriUygunMu(yer, state.cag, state.bolge, state.meslek)) {
    throw new Error("Bu mekân şu an sana uygun değil.");
  }
  const girisUcreti = paraYuvarla(SOSYALLESME_GIRIS_UCRETI * enflasyonCarpani(state));
  if (state.para < girisUcreti) {
    throw new Error(`Cebinde bu mekâna gidecek kadar para yok (~${girisUcreti} ${state.para_birimi} giriş ücreti).`);
  }
  state.para = paraYuvarla(state.para - girisUcreti);
  const olay = sosyallesmeIcinOlaySec(state, yerId);
  oturum.zorlananOlayId = olay.id;
  await oturumKaydet(state);
  return { state, girisUcreti };
}

// ---------------------------------------------------------------------------
// Mağaza & Envanter (temel tüketim/şifa + lüks eşyalar)
// ---------------------------------------------------------------------------

export interface MagazaEsyaKarti {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  kategori: MagazaEsyaKategori;
  saglikEtkisi?: number;
  mutlulukEtkisi?: number;
  unEtkisi?: number;
  omurYil?: number;
  /** Sadece "sifa": kullanınca tam olumlu etkiyi verme ihtimalinin BULANIK bandı (%). Geri kalanı %10 "hiçbir şey" + "ters teper" (-5 can). */
  sifaFaydaAralik?: { min: number; max: number };
  /** Şu anki dünya durumuna (savaş/kriz/ekonomi) ve enflasyona göre GÜNCEL fiyat; sabit değildir. */
  fiyat: number;
  /** Sadece "luks": bu eşyaya zaten sahip mi (her türden en fazla 1 sahiplenilir, bir daha satın alınamaz). */
  sahipMi: boolean;
  /** Sadece "sifa": az önce bir sifa alımı yapıldığı için TÜM kategori geçici olarak kilitli mi. */
  kilitli: boolean;
  kilitAciklamasi?: string;
}

/** Mağaza ekranının canlı kataloğunu döner: karakterin çağına uygun eşyalar + o anki dinamik fiyat/kilit/sahiplik durumu. */
export async function magazaConfigGetir(id: string): Promise<MagazaEsyaKarti[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const kilitliMi = temelMagazaKilitliMi(state);
  const kalanKilitYili = state.magaza_temel_kilit_bitis_yili !== null ? state.magaza_temel_kilit_bitis_yili - state.yil : 0;
  return MAGAZA_ESYALARI.filter((tanim) => !tanim.cag || tanim.cag === state.cag).map((tanim) => ({
    id: tanim.id,
    ad: tanim.ad,
    simge: tanim.simge,
    aciklama: tanim.aciklama,
    kategori: tanim.kategori,
    saglikEtkisi: tanim.saglikEtkisi,
    mutlulukEtkisi: tanim.mutlulukEtkisi,
    unEtkisi: tanim.unEtkisi,
    omurYil: tanim.omurYil,
    sifaFaydaAralik: tanim.kategori === "sifa" ? sifaFaydaAralik(tanim.tabanFiyat) : undefined,
    fiyat: magazaFiyatiHesapla(tanim, state),
    sahipMi: tanim.kategori === "luks" && state.magaza_envanteri.some((e) => e.katalogId === tanim.id),
    kilitli: tanim.kategori === "sifa" && kilitliMi,
    kilitAciklamasi:
      tanim.kategori === "sifa" && kilitliMi
        ? T(state.dil, "Yakın zamanda temel ürün aldın — {0} yıl sonra tekrar alışveriş yapabilirsin.", [kalanKilitYili])
        : undefined,
  }));
}

interface MagazaSatinAlSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * Olay beklemeden, oyuncunun istediği an bir mağaza eşyası satın alabilmesi;
 * bir tur harcamaz. "luks" eşyalar ün etkisini hemen (satın alma anında)
 * uygular, envanterde kalıcı bir koleksiyon parçası olarak durur (her
 * türden en fazla 1 — bir daha satın alınamaz) ve her 8-10 yılda bir
 * değerinin ~%20'si kadar bakım masrafı çıkarır (§13 envanterBozulmasiUygula).
 * "sifa" eşyalar hiçbir anlık etki yapmadan envantere girer — etkisini ancak
 * envanterEsyasiKullan ile "kullanınca" alır, kullanılmazsa ömrü dolunca
 * çürür. Oyuncu ilaç/erzak biriktirip sürekli sürekli alışveriş yapamasın
 * diye, HERHANGİ bir "sifa" satın alımı TÜM "sifa" kategorisini
 * TEMEL_MAGAZA_KILIT_SURESI_YIL kadar kilitler.
 */
export async function magazadanSatinAl(id: string, katalogId: string): Promise<MagazaSatinAlSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const tanim = magazaEsyasiTanimiGetir(katalogId);
  if (tanim.cag && tanim.cag !== state.cag) throw new Error("Bu eşya senin çağında satılmıyor.");

  if (tanim.kategori === "sifa" && temelMagazaKilitliMi(state)) {
    const kalanYil = state.magaza_temel_kilit_bitis_yili! - state.yil;
    throw new Error(T(state.dil, "Yakın zamanda temel ürün aldın; {0} yıl sonra tekrar alışveriş yapabilirsin.", [kalanYil]));
  }
  if (tanim.kategori === "luks" && state.magaza_envanteri.some((e) => e.katalogId === tanim.id)) {
    throw new Error(T(state.dil, "Bu eşyaya zaten sahipsin."));
  }

  const fiyat = magazaFiyatiHesapla(tanim, state);
  if (state.para < fiyat)
    throw new Error(T(state.dil, "Yeterli paran yok ({0} {birim} gerekli).", [fiyat]).replace(/\{birim\}/g, state.para_birimi));

  state.para -= fiyat;
  const esya: SahipOlunanEsya = {
    id: randomUUID(),
    katalogId: tanim.id,
    ad: tanim.ad,
    simge: tanim.simge,
    kategori: tanim.kategori,
    alisYili: state.yil,
    kalanYil: tanim.kategori === "sifa" ? (tanim.omurYil ?? 1) : rastgeleLuksBakimAraligi(),
  };
  state.magaza_envanteri.push(esya);

  let mesaj = T(state.dil, "{0} satın aldın ({1} {birim}).", [K(state.dil, tanim.ad), fiyat]).replace(/\{birim\}/g, state.para_birimi);
  if (tanim.kategori === "luks" && tanim.unEtkisi) {
    state.un += tanim.unEtkisi;
    mesaj += " " + T(state.dil, "Şehirdeki itibarın hemen arttı (+{0} şöhret). Artık bu eşyaya sahipsin.", [tanim.unEtkisi]);
  } else {
    state.magaza_temel_kilit_bitis_yili = state.yil + TEMEL_MAGAZA_KILIT_SURESI_YIL;
    mesaj += " " + T(state.dil, "Envanterine eklendi — {0} yıl içinde kullanmazsan bozulur. Temel ürün alışverişin {1} yıl kilitlenecek.", [
      tanim.omurYil ?? 0,
      TEMEL_MAGAZA_KILIT_SURESI_YIL,
    ]);
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

interface EnvanterKullanSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * Envanterdeki bir "sifa" eşyasını kullanır: sağlık/mutluluk etkisini
 * (jitterlı) uygulayıp eşyayı envanterden düşürür. "luks" eşyalar sergilenmek
 * içindir, kullanılamaz — etkileri zaten satın alma anında uygulanmıştır.
 */
export async function envanterEsyasiKullan(id: string, esyaId: string): Promise<EnvanterKullanSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const index = state.magaza_envanteri.findIndex((e) => e.id === esyaId);
  if (index === -1) throw new Error("Envanterinde böyle bir eşya yok.");
  const [esya] = state.magaza_envanteri.splice(index, 1);
  const tanim = magazaEsyasiTanimiGetir(esya.katalogId);
  if (tanim.kategori !== "sifa") {
    state.magaza_envanteri.push(esya); // geri koy; bu eşya kullanılamaz, sadece sergilenir
    throw new Error("Bu eşya kullanılamaz, sadece envanterinde sergilenir.");
  }

  // 2026-09: "sifa" kullanımı artık zarlı. Fiyata göre ~%60-80 tam olumlu etki,
  // %10 sabit hiçbir şey, geri kalan ters teper (-5 can). Oyuncuya bulanık gösterilir.
  const pPozitif = sifaBasariSans(tanim.tabanFiyat);
  const r = Math.random();
  let mesaj: string;
  if (r < pPozitif) {
    const etki = jitterUygula({ saglik: tanim.saglikEtkisi, mutluluk: tanim.mutlulukEtkisi, mesaj: "" });
    if (etki.saglik) state.saglik += etki.saglik;
    if (etki.mutluluk) state.mutluluk += etki.mutluluk;
    const parcalar = [
      etki.saglik ? `+${etki.saglik} ${T(state.dil, "sağlık")}` : null,
      etki.mutluluk ? `+${etki.mutluluk} ${T(state.dil, "mutluluk")}` : null,
    ].filter((p): p is string => p !== null);
    mesaj = T(state.dil, "{0} kullandın{1}.", [
      K(state.dil, esya.ad),
      parcalar.length ? ` (${parcalar.join(", ")})` : "",
    ]);
  } else if (r < pPozitif + SIFA_HICBIRSEY_SANS) {
    mesaj = T(state.dil, "{0} kullandın ama hiç işe yaramadı, boşa gitti.", [K(state.dil, esya.ad)]);
  } else {
    const etki = jitterUygula({ saglik: -5, mesaj: "" });
    if (etki.saglik) state.saglik += etki.saglik;
    mesaj = T(state.dil, "{0} ters tepti; biraz fenalaştın ({1} sağlık).", [K(state.dil, esya.ad), etki.saglik ?? -5]);
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}
