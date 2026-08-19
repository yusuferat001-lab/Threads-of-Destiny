import { randomUUID } from "crypto";
import { CharacterState, Cag, SenaryoResponse, SonucEtkisi, TepkiSonucu } from "../types";
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
  rutbeGuncelle,
  sansOlayiDene,
  aniOlumDene,
  gecmisKaydet,
  yaslanmaUygula,
  hayatOlayiEkle,
  capraletkiUygula,
  haberleriUret,
  hukumdarDegisimHaberiUret,
  MESLEKLER,
  hesaplaMaasYillik,
  giderKalemleriHesapla,
  GiderKalemleri,
  enflasyonYuzdesiHesapla,
  meslekMetrikCarpani,
  orduKaybiUygula,
  orduBuyumesiDene,
  konutDegistir as konutDegistirState,
  yasamSecimiDegistir as yasamSecimiDegistirState,
  hayatAmaciKontrolEt,
  krizEtkisiUygula,
  sehirYonetimGuncelle,
  enflasyonCarpani,
  ORDU_MEVCUDU_TAVANI,
} from "./stateManager";
import { rutbeTanimiGetir } from "../data/rutbeler";
import { rollSuccess } from "./diceRoll";
import { olaySec, doldur } from "./olaySecici";
import { OlayTanimi, OnTepki, OLAY_BANKASI } from "../data/olaylar";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";
import {
  rastgeleHayvanTuruSec,
  rastgeleHayvanIsmiSec,
  EVCIL_HAYVAN_TAKIP_OLAY_IDLERI,
  EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI,
} from "../data/evcilHayvanlar";
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../data/gizemliEsyalar";
import { AILELER } from "../data/aileler";
import { yerlesimIdByAd } from "../data/yerlesimler";
import { oturumKaydet, oturumYukle, aktifOturumlariYukle } from "../db/sessionRepository";

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
    if (["Fransa", "Kutsal Roma", "Bizans"].includes(state.bolge)) teklifler.push("oc_hacli_sefer_karari");
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
  yerlesimId: string
): Promise<CharacterState> {
  const state = createCharacter(cag, bolge, yerlesimId);
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

/**
 * Ölen karakterin en büyük yaşayan çocuğuyla soyu sürdürür: aynı çağ/bölge/
 * yerleşimde, ebeveynin mesleğini (varsa) ya da aile mirasını devralan yeni
 * bir karakter oluşturur ve ebeveynin servetinden/ününden pay bırakır.
 */
export async function soyuSurdur(id: string): Promise<CharacterState> {
  const oturum = await oturumGetir(id);
  const olenState = oturum.state;
  if (olenState.aktif) throw new Error("Karakter hâlâ hayatta, soy henüz sürdürülemez.");

  const yasayanCocuklar = olenState.cocuklar.filter((c) => c.yasiyor);
  if (yasayanCocuklar.length === 0) throw new Error("Soyu sürdürecek yaşayan bir çocuk yok.");
  const enBuyukCocuk = yasayanCocuklar.reduce((en, c) => (c.dogum_yili < en.dogum_yili ? c : en));

  const zorlananAileAdi = AILELER.some((a) => a.ad === olenState.meslek && (!a.cag || a.cag === olenState.cag))
    ? olenState.meslek
    : olenState.aile_meslegi;
  const yerlesimId = yerlesimIdByAd(olenState.yerlesim);

  const yeniState = createCharacter(olenState.cag, olenState.bolge, yerlesimId, {
    zorlananAileAdi,
    isim: enBuyukCocuk.isim,
  });

  const paraMirasi = Math.max(0, Math.min(60, Math.round(olenState.para / 4)));
  const unMirasi = Math.max(0, Math.min(15, Math.round(olenState.un / 8)));
  yeniState.para += paraMirasi;
  yeniState.un += unMirasi;
  yeniState.etiketler.push("miras:soy_surdu");

  const ebeveynTanimlama = olenState.isim ?? `${olenState.aile_meslegi} ailesinin bir önceki reisi`;
  yeniState.acilis_anlatimi = `${ebeveynTanimlama} göçüp gittiğinde, soyunu ${yeniState.isim} olarak sürdürmeye karar verdin. ${yeniState.acilis_anlatimi}`;
  clampStats(yeniState);

  oturumlar.set(yeniState.id, {
    state: yeniState,
    mevcutSenaryo: null,
    mevcutOlay: null,
    zorlananOlayId: null,
    sonErisim: Date.now(),
    sonTon: null,
    bekleyenTepki: null,
  });
  await oturumKaydet(yeniState);
  return yeniState;
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
        zorlananId = "dunya_savas_ilani";
        etiketEkle(oturum.state, [izlemeEtiketi]);
        etiketDegisti = true;
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
  // En üst rütbeye (3) ulaşan bir karaktere, şansa bırakmadan bir kez şehir
  // yönetimi arenasına giriş teklifi zorla sunulur — yoksa 360+ olayın
  // arasında yıllarca gizli kalabilir.
  if (!zorlananId && oturum.state.rutbe_seviye >= 3 && !oturum.state.etiketler.includes("sehir_yonetimi_basladi")) {
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
}

const YARIM_YILDIZ_PUAN = 10;

export function jitterUygula(etki: SonucEtkisi): SonucEtkisi {
  const carpan = () => 0.85 + Math.random() * 0.3; // 0.85 - 1.15
  const uygula = (deger?: number) => (deger ? Math.round(deger * carpan()) : deger);
  const un = uygula(etki.un);
  return {
    ...etki,
    para: uygula(etki.para),
    // Her olay Ün'ü en az yarım yıldız (10 puan) etkiler ki yıldız barında gözle görülür olsun.
    un: un ? Math.sign(un) * Math.max(Math.abs(un), YARIM_YILDIZ_PUAN) : un,
    ahlak: uygula(etki.ahlak),
    saglik: uygula(etki.saglik),
    mutluluk: uygula(etki.mutluluk),
  };
}

// Sağlık düştükçe ölümcül sonuçlanma ihtimali artar: 60 sağlıktan itibaren
// devreye girer, 0 sağlıkta temel şansın 2.5 katına kadar çıkar.
export function efektifOlumSansi(baseSans: number, saglik: number): number {
  const carpan = 1 + Math.max(0, 60 - saglik) / 40;
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
  // Saldırı gücü / ticaret sermayesi / nüfuz, kendi kategorisindeki kazançları büyütür.
  if (etki.para && etki.para > 0) {
    etki.para = Math.round(etki.para * meslekMetrikCarpani(state, mevcutOlay.kategori));
  }
  if (mevcutOlay.kategori === "savas") {
    orduKaybiUygula(state, basarili);
  }

  state.para += etki.para ?? 0;
  state.un += etki.un ?? 0;
  state.ahlak += etki.ahlak ?? 0;
  state.kultur += etki.kultur ?? 0;
  state.saglik += etki.saglik ?? 0;
  state.mutluluk += etki.mutluluk ?? 0;
  state.dost_puani += etki.dost_puani ?? 0;
  state.rakip_puani += etki.rakip_puani ?? 0;
  if (etki.ordu_techizat_artis) {
    state.ordu_techizat_seviyesi = Math.min(100, state.ordu_techizat_seviyesi + etki.ordu_techizat_artis);
  }
  if (etki.ticaret_sermaye_artis) state.ticaret_sermaye += etki.ticaret_sermaye_artis;
  if (etki.nufuz_artis) state.nufuz += etki.nufuz_artis;
  if (etki.yeni_meslek) state.meslek = etki.yeni_meslek;
  if (etki.maas_carpani) maasCarpaniUygula(state, etki.maas_carpani);
  if (etki.sehir_yonetim_artis) {
    state.sehir_yonetim_seviyesi += etki.sehir_yonetim_artis;
    sehirYonetimGuncelle(state);
    hayatOlayiEkle(state, "🏛️", `${state.sehir_yonetim_unvan} unvanına ulaştı`);
  }

  if (etki.para && Math.abs(etki.para) >= 50) {
    hayatOlayiEkle(
      state,
      etki.para > 0 ? "💰" : "📉",
      `${etki.para > 0 ? "Büyük kazanç" : "Büyük kayıp"}: ${etki.para > 0 ? "+" : ""}${etki.para} ${state.para_birimi}`
    );
  }

  const savasBasliyorMu = etki.ulke_etkisi?.savasta === true && !state.ulke.savasta;
  if (savasBasliyorMu) {
    hayatOlayiEkle(state, "⚔️", `${state.bolge} savaşa sürüklendi`);
  }

  if (etki.es_ata) {
    state.es_adi = rastgeleBirIsimSec(state.cag, state.bolge, [state.dost_adi, state.rakip_adi]);
    state.es_puani = 60;
    state.es_meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
    const esRutbeTanimi = rutbeTanimiGetir(state.es_meslek, state.cag, state.din_kultur);
    state.es_rutbe = esRutbeTanimi
      ? esRutbeTanimi.unvanlar[Math.floor(Math.random() * esRutbeTanimi.unvanlar.length)]
      : state.es_meslek;
    hayatOlayiEkle(state, "💍", `${state.es_adi} ile evlendi`);
  }
  if (etki.es_kaybet) {
    const kaybedilenEs = state.es_adi;
    state.es_adi = null;
    state.es_puani = 0;
    state.es_meslek = null;
    state.es_rutbe = null;
    etiketSil(state, ["medeni:evli"]);
    if (kaybedilenEs) hayatOlayiEkle(state, "💔", `${kaybedilenEs} ile yolları ayrıldı`);
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
      hayatOlayiEkle(state, "👶", `${isim} doğdu`);
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
      hayatOlayiEkle(state, "💔", `${secilen.isim} kaybedildi`);
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
    maasCarpaniUygula(state, 1 + (gercekKalite - 50) / 250);
    hayatOlayiEkle(state, "🤝", `${isim} (${etki.ekip_ekle.rol}) ekibine katıldı`);
  }
  if (etki.ekip_kaybi && state.ekip.length > 0) {
    const idx = Math.floor(Math.random() * state.ekip.length);
    const kaybedilen = state.ekip.splice(idx, 1)[0];
    hayatOlayiEkle(state, "👋", `${kaybedilen.isim} ekipten ayrıldı`);
  }
  if (etki.ekip_sil) {
    const idx = state.ekip.findIndex((uye) => uye.rol === etki.ekip_sil);
    if (idx !== -1) {
      const kaybedilen = state.ekip.splice(idx, 1)[0];
      hayatOlayiEkle(state, "👋", `${kaybedilen.isim} ekipten ayrıldı`);
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
    hayatOlayiEkle(state, "🐾", `${isim} adlı bir ${tur.toLocaleLowerCase("tr")} edindi`);
  }
  if (etki.evcil_hayvan_kaybet && state.evcil_hayvan) {
    const kaybedilen = state.evcil_hayvan;
    state.evcil_hayvan = null;
    etiketSil(state, ["evcil_hayvan_var", `evcil_hayvan_tur:${kaybedilen.tur}`]);
    hayatOlayiEkle(state, "💔", `${kaybedilen.isim} adlı ${kaybedilen.tur.toLocaleLowerCase("tr")}sini kaybetti`);
  }
  if (etki.unvan_kazan && !state.unvanlar.includes(etki.unvan_kazan)) {
    state.unvanlar.push(etki.unvan_kazan);
    hayatOlayiEkle(state, "🏵️", `"${etki.unvan_kazan}" ünvanını kazandı`);
  }
  if (etki.hayat_amaci_ata && !state.hayat_amaci) {
    state.hayat_amaci = { ...etki.hayat_amaci_ata, tamamlandi: false };
    hayatOlayiEkle(state, "🎯", `Hayat amacını belirledi: ${etki.hayat_amaci_ata.ad}`);
  }
  if (etki.kriz_baslat) {
    state.ulke.kriz = { tur: etki.kriz_baslat.tur, bitisYili: state.yil + etki.kriz_baslat.sureYil };
  }
  if (etki.efsanevi_olum) {
    state.efsanevi_olum = etki.efsanevi_olum;
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

  const sonucAnlatimi = sonucAnlatimiUret(state, etki, basarili);

  let olumTetiklendi = etki.olum === true;
  if (!olumTetiklendi && etki.olum_sansi !== undefined) {
    const sans = efektifOlumSansi(etki.olum_sansi, state.saglik);
    if (Math.random() * 100 < sans) olumTetiklendi = true;
  }
  checkDeath(state, olumTetiklendi, etki.mesaj);

  let yasArtisi = 0;
  let zamanAnlatimi: string | null = null;
  let capraz = { saglikKaybi: 0, mutlulukKaybi: 0 };
  let hukumdarDegisimHaberi: string | null = null;
  if (state.aktif) {
    // Olay bazlı süre alanları (sureYilMin/Max) kasıtlı olarak yok sayılıyor: 367 olayın
    // çoğunda sabit "1 yıl" tanımlı olduğundan ortalama turu 2'nin epey altına çekiyordu.
    // Sabit 1-3 aralığı (ortalama 2 yıl) her olayda tutarlı bir tempo sağlar. Tek istisna:
    // yolculuk zinciri adımları (yolculukOlayi:true), 4-5 yıllık bir yolculukta 5-10 adımın
    // sığması için sabit 1 yıl ilerler.
    const eskiHukumdar = state.hukumdar;
    yasArtisi = mevcutOlay.yolculukOlayi ? ilerletYas(state, 1, 1) : ilerletYas(state, 1, 3);
    if (eskiHukumdar && state.hukumdar && state.hukumdar !== eskiHukumdar) {
      const haber = hukumdarDegisimHaberiUret(eskiHukumdar, state.hukumdar);
      hukumdarDegisimHaberi = haber;
      hayatOlayiEkle(state, "👑", `Hükümdar değişti: ${state.hukumdar}`);
    }
    const durumOlumMesaji = durumlariUygula(state);
    if (durumOlumMesaji) {
      checkDeath(state, true, durumOlumMesaji);
    }
    if (state.aktif) {
      const ekonomi = pasifEkonomiUygula(state, yasArtisi);
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
          zamanAnlatimi = zamanAnlatimiUret(state, yasArtisi, ekonomi);
          orduBuyumesiDene(state, yasArtisi);
          const krizBitisMesaji = krizEtkisiUygula(state, yasArtisi);
          if (state.saglik <= 0) {
            checkDeath(state, true, "Kıtlığın getirdiği yoksunlukla tükendi.");
          }
          const sansMesaji = sansOlayiDene(state);

          // En fazla TEK ek bağlam cümlesi eklenir — art arda yığılıp metni
          // uzatmasın diye önem/nadirlik sırasına göre sadece biri seçilir.
          // Yaşlanma kaybı en rutin/sık olanı olduğu için hem en düşük
          // öncelikli hem de her seferinde değil, ara sıra belirtilir.
          const ekCumle =
            krizBitisMesaji ??
            sansMesaji ??
            (capraz.saglikKaybi > 0 ? "İçindeki karanlık bedenini de yormaya başladı." : null) ??
            (capraz.mutlulukKaybi > 0 ? "Sağlığındaki bu düşüş moralini de eziyor." : null) ??
            (yaslanmaKaybi > 0 && Math.random() < 0.3
              ? "Yaşın ilerledikçe bedenin eskisi kadar dayanmıyor."
              : null);
          if (ekCumle) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${ekCumle}` : ekCumle;
          }

          if (state.aktif) {
            const aniOlum = aniOlumDene(state);
            if (aniOlum) {
              state.efsanevi_olum = aniOlum.efsane;
              checkDeath(state, true, aniOlum.mesaj);
            }
          }
        }
      } else {
        state.olum_nedeni = "Borç ve yoksulluk içinde tükendi.";
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
      const terfiMesaji = `🎖️ Artık bir ${state.rutbe}'sin! Yeni yıllık kazancın: ${yeniMaas} ${state.para_birimi}.`;
      zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${terfiMesaji}` : terfiMesaji;
      hayatOlayiEkle(state, "🎖️", `${state.rutbe} rütbesine terfi etti`);
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

  await oturumKaydet(state);
  return { state, basarili, uygulananEtki: etki, yasArtisi, sonucAnlatimi, zamanAnlatimi, terfiOldu };
}

export interface FinansOzeti {
  maasYillik: number;
  giderKalemleri: GiderKalemleri;
  netYillik: number;
  enflasyonYuzdesi: number;
}

/** Bir sonraki turu beklemeden, güncel gelir/gider dökümünü salt-okunur olarak hesaplar; para değiştirmez. */
export async function finansGetir(id: string): Promise<FinansOzeti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const maasYillik = hesaplaMaasYillik(state);
  const giderKalemleri = giderKalemleriHesapla(state);
  const toplamGider =
    giderKalemleri.yasam + giderKalemleri.konut + giderKalemleri.ekip + giderKalemleri.evcilHayvan + giderKalemleri.vergi;
  return {
    maasYillik,
    giderKalemleri,
    netYillik: maasYillik - toplamGider,
    enflasyonYuzdesi: enflasyonYuzdesiHesapla(state.tur_sayisi),
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
  return { state, mesaj: `${cikarilan.isim}'i ekibinden çıkardın; artık yıllık maaşını ödemiyorsun.` };
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

export type YatirimTuru = "kendi_isi" | "guvenli" | "riskli";

interface YatirimSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * İş yatırımının maliyeti: sabit bir sayı değil, hem enflasyonla hem de bu
 * karakterin şimdiye kadar yaptığı yatırım sayısıyla büyür — her yeni yatırım
 * bir öncekinden %22 daha pahalıya patlar (gerçek bir işletmeyi büyütmenin her
 * seferinde biraz daha zorlaşması gibi). Taban değer bilinçli olarak "düz" bir
 * sayı değil; sonucun da 0/5 ile bitmemesi için son bir yuvarlama garantisi var.
 */
const KENDI_ISI_TEMEL_MALIYET = 37;
const KENDI_ISI_ESKALASYON = 0.22;

function kendiIsiMaliyetiHesapla(state: CharacterState): number {
  let maliyet = Math.round(
    KENDI_ISI_TEMEL_MALIYET *
      Math.pow(1 + KENDI_ISI_ESKALASYON, state.kendi_isi_yatirim_sayisi) *
      enflasyonCarpani(state.tur_sayisi)
  );
  if (maliyet % 5 === 0) maliyet += 1;
  return maliyet;
}

function kendiIsiAsamaCumlesi(yatirimSayisi: number): string {
  if (yatirimSayisi === 0) return "İlk kez cebindeki parayı kendi işine yatırdın.";
  if (yatirimSayisi <= 2) return "İşin yavaş yavaş büyüyor; bu artık bir tesadüf değil, bir yön çiziyor.";
  if (yatirimSayisi <= 5) return "Artık bölgede kendi alanında tanınan, köklü bir isim oldun.";
  return "Küçük bir işletme değil, adeta küçük bir imparatorluk kuruyorsun artık.";
}

/** Güvenli yatırımda seçilebilecek taban kademeler; enflasyona göre ölçeklenerek uygulanır. */
export const GUVENLI_YATIRIM_KADEMELERI = [10, 25, 50, 100] as const;
/**
 * Getiri "tur_basi_para" olarak, yani her OYUNCU TURUNDA bir işler (yılda değil
 * — bir tur ortalama ~2 yıl sürer). Bu yüzden gerçek amortisman süresi ~7 tur
 * değil, ~7*ORTALAMA_YIL_PER_TUR yıldır; oyuncuya gösterilen metin bunu dürüstçe yansıtır.
 */
const GUVENLI_YATIRIM_GERI_ODEME_TUR = 7;
const ORTALAMA_YIL_PER_TUR = 2;
const GUVENLI_YATIRIM_DURUM_ID = "yatirim_guvenli_pasif";

function guvenliKademeleriHesapla(state: CharacterState): number[] {
  const enflasyon = enflasyonCarpani(state.tur_sayisi);
  return GUVENLI_YATIRIM_KADEMELERI.map((taban) => Math.max(1, Math.round(taban * enflasyon)));
}

function guvenliYatirimGetiriHesapla(tutar: number): number {
  return Math.max(1, Math.round(tutar / GUVENLI_YATIRIM_GERI_ODEME_TUR));
}

/** Riskli yatırım: enflasyona bağlı bedel, yüksek kazanç ihtimali de var, paranın tamamının uçması ihtimali de. */
const RISKLI_YATIRIM_MALIYETI = 60;
const RISKLI_YATIRIM_KAZANMA_SANSI = 0.35;
const RISKLI_YATIRIM_KAZANC_CARPANI = 2.5;

/** Çağa uygun risk teması: Orta Çağ'da demiryolu değil, kervan/deniz ticareti anlatımı kullanılır. */
const RISKLI_YATIRIM_TEMALARI: Record<Cag, { simge: string; ad: string }[]> = {
  "Orta Çağ": [
    { simge: "🐫", ad: "baharat kervanı" },
    { simge: "⛵", ad: "deniz aşırı ticaret seferi" },
    { simge: "🗺️", ad: "uzak diyar keşif seferi" },
  ],
  "Sanayi Devrimi": [
    { simge: "🚂", ad: "demiryolu hissesi" },
    { simge: "🏭", ad: "fabrika hissesi" },
    { simge: "⛏️", ad: "maden hissesi" },
  ],
};

function riskliMaliyetiHesapla(state: CharacterState): number {
  return Math.max(1, Math.round(RISKLI_YATIRIM_MALIYETI * enflasyonCarpani(state.tur_sayisi)));
}

export interface YatirimConfig {
  kendiIsiMaliyeti: number;
  kendiIsiYatirimSayisi: number;
  guvenliKademeleri: number[];
  guvenliGeriOdemeTur: number;
  riskliMaliyeti: number;
  riskliKazancCarpani: number;
}

/** Yatırım ekranının canlı fiyat/kademe bilgisini döner; istemci sabitleri hardcode etmek yerine bunu kullanır. */
export async function yatirimConfigGetir(id: string): Promise<YatirimConfig> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  return {
    kendiIsiMaliyeti: kendiIsiMaliyetiHesapla(state),
    kendiIsiYatirimSayisi: state.kendi_isi_yatirim_sayisi,
    guvenliKademeleri: guvenliKademeleriHesapla(state),
    guvenliGeriOdemeTur: GUVENLI_YATIRIM_GERI_ODEME_TUR,
    riskliMaliyeti: riskliMaliyetiHesapla(state),
    riskliKazancCarpani: RISKLI_YATIRIM_KAZANC_CARPANI,
  };
}

/** Olay beklemeden, oyuncunun istediği an tetikleyebileceği finansal aksiyonlar. */
export async function yatirimYap(id: string, tur: YatirimTuru, tutar?: number): Promise<YatirimSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");

  let mesaj: string;
  if (tur === "guvenli") {
    const kademeler = guvenliKademeleriHesapla(state);
    const secilenTutar = tutar ?? kademeler[0];
    if (!kademeler.includes(secilenTutar)) {
      throw new Error("Geçersiz yatırım tutarı.");
    }
    if (state.para < secilenTutar) {
      throw new Error(`Yeterli paran yok (${secilenTutar} ${state.para_birimi} gerekli).`);
    }
    state.para -= secilenTutar;
    const eskiDurum = state.durumlar.find((d) => d.id === GUVENLI_YATIRIM_DURUM_ID);
    const eskiGetiri = eskiDurum?.tur_basi_para ?? 0;
    const yeniGetiri = eskiGetiri + guvenliYatirimGetiriHesapla(secilenTutar);
    durumEkle(state, {
      id: GUVENLI_YATIRIM_DURUM_ID,
      ad: "Güvenli Yatırım",
      tur: "kalici",
      tur_basi_para: yeniGetiri,
    });
    etiketEkle(state, ["yatirim:guvenlide"]);
    const yaklasikYil = GUVENLI_YATIRIM_GERI_ODEME_TUR * ORTALAMA_YIL_PER_TUR;
    mesaj = `${secilenTutar} ${state.para_birimi} güvenli yatırıma ayırdın; pasif gelirin artık +${yeniGetiri} ${state.para_birimi}/tur (bu yatırımdan +${yeniGetiri - eskiGetiri} ${state.para_birimi}/tur — ortalama ~${GUVENLI_YATIRIM_GERI_ODEME_TUR} tur, yani ~${yaklasikYil} yıl içinde kendini amorti eder).`;
  } else if (tur === "riskli") {
    const maliyet = riskliMaliyetiHesapla(state);
    if (state.para < maliyet) {
      throw new Error(`Yeterli paran yok (${maliyet} ${state.para_birimi} gerekli).`);
    }
    state.para -= maliyet;
    const temalar = RISKLI_YATIRIM_TEMALARI[state.cag] ?? RISKLI_YATIRIM_TEMALARI["Sanayi Devrimi"];
    const tema = temalar[Math.floor(Math.random() * temalar.length)];
    if (Math.random() < RISKLI_YATIRIM_KAZANMA_SANSI) {
      const kazanc = Math.round(maliyet * RISKLI_YATIRIM_KAZANC_CARPANI);
      state.para += kazanc;
      hayatOlayiEkle(state, tema.simge, `Riskli bir yatırımda büyük kazandı: +${kazanc - maliyet} ${state.para_birimi}`);
      mesaj = `Şans bu sefer senden yana! Riskli yatırımın (${tema.ad}) muazzam kâr getirdi: ${maliyet} ${state.para_birimi} yatırdın, ${kazanc} ${state.para_birimi} olarak geri döndü.`;
    } else {
      hayatOlayiEkle(state, "📉", `Riskli bir yatırımda her şeyini kaybetti: -${maliyet} ${state.para_birimi}`);
      mesaj = `Şans bu kez yaver gitmedi: ${tema.ad} boşa çıktı. Yatırdığın ${maliyet} ${state.para_birimi}, tamamıyla buhar oldu.`;
    }
  } else if (tur === "kendi_isi") {
    if (!MESLEKLER.includes(state.meslek)) {
      throw new Error("Önce bir meslek seçmelisin.");
    }
    const techizatDolu = state.meslek === "Asker" && state.ordu_techizat_seviyesi >= 100;
    const orduDolu = state.meslek === "Asker" && state.ordu_mevcudu >= ORDU_MEVCUDU_TAVANI;
    if (techizatDolu && orduDolu) {
      throw new Error("Ordun zaten doruk noktada; teçhizatın ve mevcudun tam kapasitede, yeni bir yatırımın karşılığı olmaz.");
    }
    const maliyet = kendiIsiMaliyetiHesapla(state);
    if (state.para < maliyet) {
      throw new Error(`Yeterli paran yok (${maliyet} ${state.para_birimi} gerekli).`);
    }
    state.para -= maliyet;
    const asama = kendiIsiAsamaCumlesi(state.kendi_isi_yatirim_sayisi);
    state.kendi_isi_yatirim_sayisi += 1;

    if (state.meslek === "Asker") {
      if (!techizatDolu) {
        const eski = state.ordu_techizat_seviyesi;
        state.ordu_techizat_seviyesi = Math.min(100, state.ordu_techizat_seviyesi + 10);
        mesaj = `${asama} Birliğinin teçhizatına yatırım yaptın: teçhizat seviyen %${eski} → %${state.ordu_techizat_seviyesi} oldu. Saldırı gücün kalıcı olarak arttı.`;
      } else {
        const eski = state.ordu_mevcudu;
        state.ordu_mevcudu = Math.min(ORDU_MEVCUDU_TAVANI, state.ordu_mevcudu + 15);
        mesaj = `${asama} Teçhizatın zaten dorukta; bu sermayeyle saflarına yeni askerler kattın: ordu mevcudun ${eski} → ${state.ordu_mevcudu} oldu.`;
      }
    } else if (state.meslek === "Tüccar") {
      const eski = state.ticaret_sermaye;
      state.ticaret_sermaye += 20;
      mesaj = `${asama} Ticaretine sermaye kattın: ticaret sermayen ${eski} → ${state.ticaret_sermaye} ${state.para_birimi} oldu. Artık bir tezgah daha işletiyorsun; ticaret kazançların kalıcı olarak büyüdü.`;
    } else {
      const eski = state.nufuz;
      state.nufuz += 20;
      mesaj = `${asama} Cemaatin arasında nüfuzun büyüdü: nüfuzun ${eski} → ${state.nufuz} oldu. Vaazların artık daha çok insana ulaşıyor; dini kazançların kalıcı olarak arttı.`;
    }
  } else {
    throw new Error("Geçersiz yatırım türü.");
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}
