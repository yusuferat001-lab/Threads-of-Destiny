import { randomUUID } from "crypto";
import { gostergeDetayiUret, etkenGunluguNotEt, gostergeStatiMi, GostergeDetayi } from "./gostergeDetay";
import { dunyaGecmisiUret, DunyaGecmisi } from "./dunyaGecmisi";
import { yatirimEtkiMetni } from "./yatirimMetinleri";
import { IsletmeDokum, IsletmeFiyat, IsletmeStokHedefi, IsletmeRolTuru, CharacterState, Cag, SenaryoResponse, SonucEtkisi, SucSinifi, TepkiSonucu, MulkTuru, OturumAkisiKaydi, IkiDilMetin, PiyasaHaberi, EkipUyesi, YonetimTalep, AileHuy, DugunButcesi, EvlilikTuru, TeklifHediyesi } from "../types";
import { T, K, Khukumdar, ikiDilT, ikiDil } from "../i18n";
import { musteriDagilimi, musteriAktar, musteriKaydir, rakipGrubu } from "./piyasa";
import { olayCevirisiUygula } from "../i18n/olaylar";
import { skorKaydet as skoruDbyeYaz } from "../db/scoreRepository";
import {
  amaclariHerhangiKontrol,
  amacTanimiGetir,
  amacSkorCarpani,
  AMAC_ILERLEME,
  RISKLI_OLUM_SANSI_ESIK,
} from "../data/hayatAmaclari";
import {
  createCharacter,
  mesleğiSec,
  clampStats,
  checkDeath,
  ilerletYas,
  etiketEkle,
  etiketSil,
  esiSifirla,
  ulkeGuncelle,
  durumEkle,
  durumlariUygula,
  pasifEkonomiUygula,
  sonucAnlatimiUret,
  maasCarpaniUygula,
  maasCarpaniGetir,
  MAAS_CARPANI_TAVAN,
  rutbeGuncelle,
  gecmisKaydet,
  yaslanmaUygula,
  hayatOlayiEkle,
  ulkeGecmisiEkle,
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
  giderEnflasyonCarpani,
  mulkGelirleriUygula,
  mulkGetiriOraniHesapla,
  mulkGetiriOraniKisisel,
  rastgeleMulkBakimAraligi,
  mulkYillikBakimTahmini,
  gayrimenkulDegeriHesapla,
  netServetHesapla,
  hesaplaSkor,
  dunyaFinansEtkileri,
  DunyaFinansEtkisi,
  sucSeviyesiUygula,
  sucArtisiKaydet,
  piyasaDedikodulariUret,
  magazaFiyatiHesapla,
  envanterBozulmasiUygula,
  temelMagazaKilitliMi,
  TEMEL_MAGAZA_KILIT_SURESI_YIL,
  rastgeleLuksBakimAraligi,
  paraYuvarla,
  zorunluBagisKontrolEt,
  zenginlikSizintiKontrolEt,
  rakipSoygunKontrolEt,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaYillikKontrol,
  vebaHastaligiKontrol,
  vebaHastaligiBaslatEt,
  vebaBitisKontrolEt,
  donemIlerlet,
  MESLEK_KATEGORI,
  eskiKayitGocu,
  aileYillikUygula,
  evcilHayvanEkle,
  evcilHayvanKaldir,
  evcilHayvanYillikUygula,
  ekipSadakatYillikUygula,
  yonetimYillikUygula,
  havuzKilidiVar,
  rakipMusteriKir,
  rakipMisillemesiDene,
  rakiplerGuncelle,
  musteriEkle,
  pazarYillikUygula,
  krediAl,
  krediPazarlik,
  krediYillikUygula,
  krediMaksTutar,
  krediTeklifleri,
  type KrediTeklifi,
  isletmeBaglami,
} from "./stateManager";
import {
  isletmeAktif,
  isletmeGelirTahmini,
  uretimTavani,
  isletmeHazirla,
  depoKapasitesi,
  toplamStok,
  hatSlotSayisi,
  hatHesapla,
  hatKilitNedeni,
  adaylariGerekirseYenile,
  beklenenBrutKar,
  isletmeButcesi,
  anaUrunSec,
  anaUrunBonusu,
  urunSecimiBekliyorMu,
  type IsletmeButcesi,
  calisanLimiti,
  calisanBonusu,
  ekipBonuslari,
  korumaHesapla,
  curumeOrani,
  depoBakimMasrafi,
  depoKademesi,
  hirsizlikOlasiliklari,
  sicakUrunHatId,
  vergiOrani,
  imtiyazAktifMi,
  maasTabani,
  FIYAT_POLITIKASI,
  FIYATLAR,
  DEPO_KAPASITE,
  DEPO_DOLDUR_YUZDELERI,
  depoDolulukYuzdesi,
  depoDoldurPlani,
  depoyuDoldur,
  DepoDoldurPlani,
  ADAY_YENILEME_YIL,
  SADAKAT_RISK_ESIGI,
  SADIK_ESIGI,
  pazarBuyumeOrani,
  type IsletmeBaglami,
} from "./isletme";
import {
  acikFaaliyetler,
  aseviKademesi,
  binaKademesi,
  binaKapasitesi,
  cemaatDonemBilesik,
  cemaatEtkenleri,
  cemaatHesapla,
  faaliyetKilitliMi,
  faaliyetSlotSayisi,
  gelmeAraligi,
  gelmeKaynagiBul,
  okulKademesi,
  ogretiBekleyenSeviye,
  ogretiBekliyorMu,
  ogretiSec,
  faaliyetTahmini,
} from "./cemaat";
import {
  AHLAK_BANTLARI,
  ASEVI_KADEME_ETKISI,
  ASIRI_ESIK,
  BAGIS_POLITIKASI,
  BAGIS_SIRASI,
  FAALIYETLER,
  FANATIK_BAGIS_KATSAYI,
  FANATIK_KACIS_KATSAYI,
  FANATIK_OTORITE_KATSAYI,
  KITLE_POLITIKASI,
  KITLE_SIRASI,
  OKUL_MEZUN_SANSI,
  TON_ADLARI,
  TON_SIRASI,
  YARDIM_POLITIKASI,
  YARDIM_SIRASI,
  ahlakBandiIndeksi,
} from "../data/cemaat";
import { ogretiGetir, ogretiSecenekleri, ogretiToplami } from "../data/ogretiler";
import { YAP_ACIKLAMA, YAP_DIGER_OTORITE, YAPMA_ACIKLAMA, YAPMA_DIGER_OTORITE } from "../data/cemaat";
import type { CemaatBagis, CemaatKitle, CemaatTon, CemaatYardim } from "../types";
import {
  isletmeProfiliGetir,
  hatTanimiGetir,
  yatirimTanimiGetir,
  sehirYoneticisiUnvani,
  rolAdiGetir,
  isletmeMeslegiMi,
  ADAY_TIP_ADLARI,
  KESIM_ARTI_EKSI,
  SAVAS_TALEP_ARTISI,
  FIYAT_ARTI_EKSI,
  ROL_ACIKLAMALARI,
} from "../data/meslekProfilleri";
import { rutbeTanimiGetir, KARIYER_PUANI_YILLIK, KARIYER_PUANI_KATEGORI_BASARI, rutbePazarPayiEsigi } from "../data/rutbeler";
import {
  MUSTERI_KATEGORI_BASARI,
  PAZAR_KARIYER_PUANI_YILLIK,
  pazarAdlariGetir,
  pazarPayiHesapla,
  pazarMaasCarpani,
  rakipPayiHesapla,
  musteriSayisi,
  aktifRakip,
} from "../data/pazar";
import { yoneticiBilgisi, patronBilgisi } from "./yonetimKisileri";
import { kotuIsTanimiGetir, uygunKotuIsler, KOTU_IS_ADLARI, KotuIsEtki, KotuIsTanimi } from "../data/kotuIsler";
import { yatkinlikZarBonusOrani } from "../data/meslekYatkinlik";
import {
  AJAN_ROLLERI,
  ajanRolTanimiGetir,
  ajanBasariSansi,
  AJAN_YAKALANMA_IHTIMALI,
  AJAN_IHBAR_CARPANI,
  AJAN_SIZINTI_BOLEN,
  AJAN_BASARI_SADAKAT,
} from "../data/ajanlar";
import {
  SUC_SINIFI_ARALIKLARI,
  sucSinifiUst,
  sucSinifiDegeri,
  aralikTamSayi,
  hapisCezaSuresiAraligi,
  HAPIS_TAHLIYE_ARANMA,
  sucBasariBonusu,
  sucRiskCarpani,
  KEFARET_RED_ARANMA_MIN,
  KEFARET_RED_ARANMA_MAX,
} from "../data/aranmaSabitleri";
import {
  aranmaYillikIsle,
  gizliSucKaydet,
  gonulluKefaretOde,
  gonulluTeslimOl,
  polisUyarisiniYanitla,
  aranmaBildirimiKapat,
  aranmaDurumuUret,
} from "./aranmaSistemi";
import type { AranmaDurumu } from "../types";
import { rollSuccess } from "./diceRoll";
import * as AS from "./aileSistemi";
import * as AK from "./askSistemi";
import {
  MEKAN_GIRIS as TANISMA_MEKAN_GIRIS,
  GORUNUM as TANISMA_GORUNUM,
  ADIM_METNI as TANISMA_ADIM_METNI,
  SECENEK_METNI as TANISMA_SECENEK_METNI,
} from "../data/tanismaDiyalog";
import { COCUK_EKIP_ROLU, COCUK_KOV_ILISKI, MANTIK_MIN_YAS, DUGUN, KOTU_IS_ES_ZARARI, SUC_ES_ESIGI, SUC_ES_ZARARI, SIR_ES_ZARARI, IHMAL_UYARI_YIL } from "../data/aileSabitleri";
import { olaySec, doldur, temelUygunMu, sosyallesmeIcinOlaySec } from "./olaySecici";
import { OlayTanimi, OnTepki, OLAY_BANKASI } from "../data/olaylar";
import { OLAY_SOSYALLESME } from "../data/olaylar/sosyallesme";
import { OLAY_GENEL } from "../data/olaylar/genel";
import { OLAY_ORTACAG_ASKER } from "../data/olaylar/ortaCagAsker";
import { OLAY_ORTACAG_TUCCAR } from "../data/olaylar/ortaCagTuccar";
import { OLAY_ORTACAG_DINADAMI } from "../data/olaylar/ortaCagDinAdami";
import { OLAY_SANAYI_ASKER } from "../data/olaylar/sanayiAsker";
import { OLAY_SANAYI_TUCCAR } from "../data/olaylar/sanayiTuccar";
import { OLAY_SANAYI_DINADAMI } from "../data/olaylar/sanayiDinAdami";
import { OLAY_ILISKILER } from "../data/olaylar/iliskiler";
import { OLAY_AILE } from "../data/olaylar/aile";
import { OLAY_ORTACAG_ZANAATKAR } from "../data/olaylar/ortaCagZanaatkar";
import { OLAY_SANAYI_ZANAATKAR } from "../data/olaylar/sanayiZanaatkar";
import { OLAY_MESLEK_YATKINLIK } from "../data/olaylar/meslekYatkinlikOlaylari";
import { OLAY_OTORITE } from "../data/olaylar/otoriteOlaylari";
import { OLAY_VERGI } from "../data/olaylar/vergiOlaylari";
import { OLAY_EVLILIK_AILE } from "../data/olaylar/evlilikVeAile";
import { OLAY_KOMIK_GARIP } from "../data/olaylar/komikGaripOlaylar";
import { OLAY_KOMIK_OLUM } from "../data/olaylar/komikOlumler";
import { OLAY_GECIKMIS_TAKIP } from "../data/olaylar/gecikmisTakip";
import { OLAY_BOLGESEL_ORTACAG } from "../data/olaylar/bolgeselOrtaCag";
import { OLAY_BOLGESEL_SANAYI } from "../data/olaylar/bolgeselSanayi";
import {
  SOSYALLESME_YERLERI,
  SosyallesmeYeri,
  sosyallesmeYeriGetir,
  sosyallesmeYeriUygunMu,
} from "../data/sosyallesmeYerleri";
import {
  bolgeIcecekleri,
  icecekTanimiGetir,
  sosyalAksiyonTanimiGetir,
  SOSYAL_AKSIYONLAR,
  AKSIYON_COOLDOWN,
  AKSIYON_ROTASYON_HAVUZU,
  AKSIYON_ROTASYON_GOSTERIM,
  AKSIYON_ROTASYON_PERIYODU_YIL,
} from "../data/sosyallesmeAksiyonlari";
import { rastgeleBirIsimSec, rastgeleOyuncuIsmiSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import { HAYVAN_KARSILASMA_TAVANI, HAYVAN_AYNI_ANDA_TAVANI, hayvanBonusVar } from "../data/evcilHayvanlar";
import { hayvanOlayEtkisiUygula, hayvanKariyerCarpani, hayvanKotuIsPuani, hayvanAileBeklemeIndirimi } from "./hayvanEtkileri";
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../data/gizemliEsyalar";
import { yerlesimGetir } from "../data/yerlesimler";
import { oturumKaydet as oturumuDbyeYaz, oturumYukle, aktifOturumlariYukle, bitmisOturumlariYukle, oturumYasiSaniye } from "../db/sessionRepository";
import { uygunsuzMu } from "../moderasyon/kufurFiltresi";
import { metrikYaz } from "../db/metrikRepository";
import { istemciGecmisiOku, istemciGecmisiGuncelle } from "../db/istemciGecmisRepository";
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
/**
 * Her çağ×meslek kombinasyonunun dallanan kariyer yolu sistemi: `yolOnEki`
 * kilitlenmiş olup olmadığını kontrol etmek için, `girisId` de zorla
 * tetiklenecek giriş olayının kimliği için kullanılır. Bkz. senaryoUret
 * milestone kaskadı (§11 kural 2).
 */
const YOL_SISTEMLERI: Record<string, { yolOnEki: string; girisId: string }> = {
  "Orta Çağ|Asker": { yolOnEki: "yol:asker:", girisId: "oc_asker_yol_ilk_emir" },
  "Orta Çağ|Din Adamı": { yolOnEki: "yol:din:", girisId: "oc_din_yol_ilk_sinav" },
  "Orta Çağ|Tüccar": { yolOnEki: "yol:tuccar:", girisId: "oc_tuccar_yol_ilk_anlasma" },
  "Sanayi Devrimi|Asker": { yolOnEki: "yol:asker:", girisId: "sd_asker_yol_ilk_gorev" },
  "Sanayi Devrimi|Tüccar": { yolOnEki: "yol:tuccar:", girisId: "sd_tuccar_yol_ilk_karar" },
  "Sanayi Devrimi|Din Adamı": { yolOnEki: "yol:din:", girisId: "sd_din_yol_ilk_vaaz" },
  "Orta Çağ|Zanaatkâr": { yolOnEki: "yol:zanaatkar:", girisId: "oc_zanaatkar_yol_ilk_siparis" },
  "Sanayi Devrimi|Zanaatkâr": { yolOnEki: "yol:zanaatkar:", girisId: "sd_zanaatkar_yol_ilk_makine" },
};

/**
 * Hizip zorunlu seçim (2026-09 sonu, kullanıcı isteği: "hizip zorunlu çıkacak,
 * birini seçicen"). Eskiden hizbe katılmak tamamen şansa bağlıydı — genel.ts'teki
 * "saflaşma" olayı normal havuzdan rastgele çıkabiliyordu, hiç çıkmayabilirdi de,
 * ve bir "Tarafsız kal" seçeneği vardı (o seçenek ayrı bir PR'da kaldırıldı).
 * Artık meslek başına giriş olayı §11 kural 2 (kariyer yolu) ile AYNI kaskad
 * mantığında garantilenir: Asker/Tüccar/Din Adamı için 18 yaşından itibaren,
 * Zanaatkâr için (yeni hizip çifti, kariyer yolundan bağımsız bir eksen) yaş
 * yerine kıdemle — rütbe seviye 2'ye (kalfalık) ulaşınca. Tetiklenince oyuncu
 * iki taraftan birini seçmek ZORUNDA kalır (nötr seçenek yok).
 */
const HIZIP_GIRIS_OLAYLARI: Record<string, string> = {
  Asker: "hizip_asker_saflasma",
  Tüccar: "hizip_tuccar_saflasma",
  "Din Adamı": "hizip_din_saflasma",
  Zanaatkâr: "hizip_zanaatkar_saflasma",
};

/**
 * Yol dalı takip garantisinin (§11 kural 2b) kümülatif hedefleri: her yaş
 * eşiğine ulaşınca, o ana kadar o dala özel havuzdan görülmüş olay sayısı
 * en az `hedef` olmalı (yoksa biri zorla tetiklenir). Eski/büyük havuzlar
 * (Orta Çağ Asker ~21 olay/dal, Din Adamı ~21 olay/dal) daha yüksek bir
 * hedefe kademeli tırmanır; yeni/küçük havuzlar (dal başına 11 olay) daha
 * düşük bir hedefe — havuz tükenip normal çeşitliliği boğmasın diye. Yaş
 * aralıkları da meslek/çağa göre kasıtlı farklı (asker gençken, tüccar/din
 * adamı kariyerin ortasında/sonunda daha çok dönüm noktası yaşar).
 */
// 2026-09 (kullanıcı isteği "hizip ve kariyer yollarını daha detaylı yaşlara
// tetikle"): kontrol noktası sayısı artırıldı (daha sık/ince yaş aralıkları),
// ilk kontrol yaşı biraz düşürüldü, nihai hedef de kontrol sıklığıyla orantılı
// olarak bir birim yükseltildi (OÇ Asker/Din Adamı dal başına ~20-21 olay →
// hedef 5→6 = %29; diğer 4 sistem dal başına ~11 olay → hedef 3→4 = %36).
const YOL_TAKIP_KONTROL_NOKTALARI: Record<string, { yas: number; hedef: number }[]> = {
  "Orta Çağ|Asker": [{ yas: 18, hedef: 1 },{ yas: 32, hedef: 2 },{ yas: 46, hedef: 3 },{ yas: 60, hedef: 4 }],
  "Orta Çağ|Din Adamı": [{ yas: 20, hedef: 1 },{ yas: 34, hedef: 2 },{ yas: 48, hedef: 3 },{ yas: 62, hedef: 4 }],
  "Orta Çağ|Tüccar": [{ yas: 20, hedef: 1 },{ yas: 40, hedef: 2 }],
  "Sanayi Devrimi|Asker": [{ yas: 18, hedef: 1 },{ yas: 40, hedef: 2 }],
  "Sanayi Devrimi|Tüccar": [{ yas: 22, hedef: 1 },{ yas: 44, hedef: 2 }],
  "Sanayi Devrimi|Din Adamı": [{ yas: 23, hedef: 1 },{ yas: 45, hedef: 2 }],
  "Orta Çağ|Zanaatkâr": [{ yas: 21, hedef: 1 },{ yas: 42, hedef: 2 }],
  "Sanayi Devrimi|Zanaatkâr": [{ yas: 25, hedef: 1 },{ yas: 46, hedef: 2 }],
};

/**
 * Ortak "kümülatif takip garantisi" yardımcısı: yaşa göre kaç olay
 * görülmüş OLMALI (`noktalar`) hesaplanır; `tumHavuz`'daki (görülmüş
 * sayımı için) gerçek görülen sayısı bu hedefin altındaysa, `secimHavuzu`
 * (adaylar — bazı sistemlerde `tumHavuz` ile aynı, yol sisteminde olduğu
 * gibi yaşa göre daraltılmış bir alt küme de olabilir) içinden henüz
 * görülmemiş biri (hepsi görüldüyse tekrar edilebilir) döner. §11 kural
 * 2b/6/7/8/10'un hepsi bu tek fonksiyonu kullanır.
 */
function kumulatifTakipSec(
  noktalar: { yas: number; hedef: number }[],
  yas: number,
  tumHavuz: string[],
  secimHavuzu: string[],
  gecmisOlaylar: string[]
): string | null {
  const suAnkiHedef = noktalar.reduce((maks, nokta) => (yas >= nokta.yas ? Math.max(maks, nokta.hedef) : maks), 0);
  if (suAnkiHedef === 0) return null;
  const gorulenSayisi = tumHavuz.filter((id) => gecmisOlaylar.includes(id)).length;
  if (gorulenSayisi >= suAnkiHedef) return null;
  const gorulmemis = secimHavuzu.filter((id) => !gecmisOlaylar.includes(id));
  // Tüm adaylar görüldüyse AYNI olayı tekrar zorlama (havuz hedeften küçükse sonsuz tekrara yol açıyordu).
  if (gorulmemis.length === 0) return null;
  const aday = gorulmemis;
  return aday.length > 0 ? aday[Math.floor(Math.random() * aday.length)] : null;
}

/**
 * "Standalone havuz garantisi" (§11 yeni kural, 2026-09 — kullanıcı isteği:
 * "belli yaşlarda yaşanmamışsa tetikleyelim ki bir hayatta belli sayıda
 * kesinlikle görsünler"). `kumulatifTakipSec`'ten farkı: aday havuzu ham bir
 * id listesi değil, HER ÇAĞRIDA `temelUygunMu` ile o anki state'e göre
 * filtrelenen `OlayTanimi[]` — bu sayede etiket/stat/çağ/meslek koşulu
 * tutmayan bir olay (ör. evli değilken bir evlilik-sonrası olay, "iliski_X_zamani"
 * cooldown'u dolmadan bir takip olayı) ASLA zorlanmaz; koşul o an sağlanmıyorsa
 * fonksiyon sessizce null döner ve bir sonraki turda tekrar denenir.
 *
 * Sadece hiçbir kilide/garantiye bağlı olmayan "standalone" havuzlar için
 * kullanılır (genel.ts + 6 meslek-standalone dosya + iliskiler/aile/
 * evlilikVeAile/komikGaripOlaylar/komikOlumler). hapis/veba/yolculuk/
 * sosyalleşme/aranma/kariyer-yolu/evcil-hayvan/gizemli-eşya/büyülü-mistik
 * havuzları kasıtlı olarak DIŞARIDA bırakıldı — hepsinin zaten kendi §11/§17/
 * §27/§34 garantisi var, ikinci bir üst üste binen garanti çakışma/çifte
 * zorlama yaratırdı.
 */
interface StandaloneHavuzTanimi {
  havuz: OlayTanimi[];
  kontrolNoktalari: { yas: number; hedef: number }[];
}

/**
 * Bir havuzun o anki "geride kalma oranı"nı (0-1, büyük = hedefinden yüzdece
 * daha geride) ve zorlanacak adayı hesaplar. Hiç zorlama gerekmiyorsa
 * (hedef 0, hedef zaten karşılanmış, ya da o an `temelUygunMu`'dan geçen aday
 * yoksa) null döner.
 *
 * ÖNEMLİ (2026-09, gerçek oyun simülasyonuyla test edildikten sonra düzeltme):
 * İlk sürümde havuzlar SABİT bir öncelik sırasıyla (genel.ts hep önce)
 * taranıyordu — büyük hedefli genel.ts, küçük hedefli iliskiler/aile/
 * evlilikVeAile/komikGarip/komikOlum'u sistematik olarak açlıktan
 * öldürüyordu (bir ömürde "serbest" tur sayısı zaten kısıtlı — yolculuk/
 * kariyer-yolu/evcil-hayvan gibi diğer garantiler büyük payı yiyor). Artık
 * her çağrıda TÜM adaylar arasından **oransal olarak en geride kalan**
 * havuzdan zorlanıyor — küçük havuzlar hedeflerine ulaşınca hızla devreden
 * çıkıyor, kalan serbest turlar diğerlerine (özellikle genel.ts'e) daha adil
 * dağılıyor.
 */
function standaloneHavuzDurumu(
  tanim: StandaloneHavuzTanimi,
  state: CharacterState
): { adaylar: string[]; gerideKalmaOrani: number } | null {
  const suAnkiHedef = tanim.kontrolNoktalari.reduce(
    (maks, nokta) => (state.yas >= nokta.yas ? Math.max(maks, nokta.hedef) : maks),
    0
  );
  if (suAnkiHedef === 0) return null;
  const gorulenSayisi = tanim.havuz.filter((o) => state.gecmis_olaylar.includes(o.id)).length;
  if (gorulenSayisi >= suAnkiHedef) return null;
  const uygunlar = tanim.havuz.filter((o) => temelUygunMu(o, state));
  if (uygunlar.length === 0) return null;
  const gorulmemis = uygunlar.filter((o) => !state.gecmis_olaylar.includes(o.id));
  const adaylar = gorulmemis.length > 0 ? gorulmemis : uygunlar;
  // Rastgele seçim BİLEREK burada YAPILMAZ (2026-09 denetim düzeltmesi) — bu
  // fonksiyon, "en geride kalan" kazananı bulmak için çağıran döngüde TÜM
  // adaylar için sırayla çağrılıyordu ve öncesinde her aday havuzu (kazanıp
  // kazanmayacağından bağımsız) bir `Math.random()` tüketiyordu. Bu, testler
  // gibi paylaşılan/seed'siz RNG akışına duyarlı çağıranlarda, yeni bir aday
  // havuzu eklenince (ör. §38 bölgesel havuz) sonraki, ilgisiz testlerin
  // rastgele sonuçlarını kaydırıp gereksiz kırılganlığa yol açıyordu. Artık
  // yalnız aday id listesi + geride kalma oranı döner; asıl rastgele seçim
  // çağıran döngüde SADECE kazanan havuz için bir kez yapılır.
  return { adaylar: adaylar.map((o) => o.id), gerideKalmaOrani: (suAnkiHedef - gorulenSayisi) / suAnkiHedef };
}

/**
 * genel.ts (~213 olay, meslekten/çağdan bağımsız evrensel havuz) için kümülatif
 * hedefler. DÖRT turda kalibre edildi (`SIM_N` bot-simülasyonuyla test edilerek):
 * 1-2. tur: ilk tahminler ("bir ömürde ~50 tur var" varsayımı) gerçekte
 *    tutmadı, hedefler ~%65 küçültüldü.
 * 3. tur (kullanıcı düzeltmesi — "ortalama ölüm 70-75 civarı"): 1-2. turda
 *    kullanılan bot başarı şansına göre AĞIRLIKLI RASTGELE seçim yapıyordu ve
 *    `komikOlumler.ts`'teki riskli seçenekleri zaman zaman seçip erken
 *    ölümleri şişiriyordu (~47-55 ortalama). Her zaman en yüksek başarı
 *    şansını seçen "temkinli" bir botla ölçülünce ortalama 54.4/medyan 62/
 *    %75 persentil 68 çıktı — hedefler bu beklentiyle ~2-3 katına büyütüldü.
 * 4. tur (aynı temkinli bot, ama bu kez YENİ hedeflerle kapsam testi):
 *    3. turdaki büyütme fazlaydı — kapsam oranı genel.ts'te %9'a, meslek
 *    havuzunda %8'e düştü (60-75 yaş bandında gerçek görülen sayı hedefin
 *    yaklaşık YARISI civarında kalıyordu, ör. hedef 11 iken gerçek 5-6,
 *    hedef 4 iken gerçek 2 — yaş uzasa bile bir ömürdeki "serbest" tur PAYI
 *    aynı hızla büyümüyor, çünkü yolculuk/kariyer-yolu/hapis/veba gibi diğer
 *    sistemler de daha uzun ömürde orantılı pay alıyor). Hedefler bu dördüncü
 *    veriye göre ~%45-55 küçültüldü — 2. turun hedeflerine yakın ama yaş
 *    eşikleri "70-75 ortalama" beklentisine göre biraz uzatılmış hâliyle.
 * 5. tur (kullanıcı isteği — "yaşlar birebir aynı olmasın azıcık değiştir ve
 *    ilk olay yaşlarını düşür birazcık"): bu 7 tablonun (aşağıdaki 6 + meslek-
 *    standalone) ilk kontrol yaşları birkaç yıl indirildi VE tüm tablolar
 *    arasında hiçbir yaş sayısı birebir tekrar etmeyecek şekilde birbirinden
 *    kaydırıldı (aynı yaşta iki havuzun aynı anda "hedef karşılanmadı" hâline
 *    gelip `standaloneHavuzDurumu`'nun oransal seçiminde rastgele kararsız
 *    kalmasını azaltmak için) — hedef sayıları (kapsam oranı) DEĞİŞMEDİ,
 *    yalnızca hangi yaşta kontrol edildiği değişti.
 * 6. tur (kullanıcı isteği — "genel olayların zorunlu tetiklenme sayısını
 *    düşür"): genel.ts diğer 6 standalone tablodan (hedef tavanı 4-6) çok
 *    daha büyük bir kümülatif hedef (12) taşıyordu — havuzun oransal payını
 *    ("en geride kalan" seçiminde) sistematik olarak şişirip diğer küçük
 *    havuzları (iliskiler/aile/evlilikVeAile/komikGarip/komikOlum) geride
 *    bırakıyordu. Hedefler kabaca YARIYA indirildi (yaşlar aynı kaldı) —
 *    genel.ts artık meslek-standalone'a daha yakın bir tavana (92→6) sahip.
 */
const GENEL_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [{ yas: 30, hedef: 1 },{ yas: 60, hedef: 2 }];

/**
 * 6 meslek-standalone havuzun (ortaCagAsker/Tuccar/DinAdami, sanayiAsker/
 * Tuccar/DinAdami, ~18-27 olay/dosya) hepsi aynı kontrol noktalarını
 * paylaşır — her biri zaten yalnız eşleşen çağ×meslek'te devreye girer
 * (`temelUygunMu` içindeki cag/meslekler filtresi). genel.ts ile aynı 4.
 * kalibrasyon turunda küçültüldü (bkz. yukarısı); yaşlar 5. turda kaydırıldı.
 */
const MESLEK_STANDALONE_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [{ yas: 28, hedef: 1 },{ yas: 46, hedef: 2 },{ yas: 64, hedef: 3 }];

const MESLEK_STANDALONE_HAVUZLARI: Record<string, OlayTanimi[]> = {
  "Orta Çağ|Asker": OLAY_ORTACAG_ASKER,
  "Orta Çağ|Tüccar": OLAY_ORTACAG_TUCCAR,
  "Orta Çağ|Din Adamı": OLAY_ORTACAG_DINADAMI,
  "Sanayi Devrimi|Asker": OLAY_SANAYI_ASKER,
  "Sanayi Devrimi|Tüccar": OLAY_SANAYI_TUCCAR,
  "Sanayi Devrimi|Din Adamı": OLAY_SANAYI_DINADAMI,
  "Orta Çağ|Zanaatkâr": OLAY_ORTACAG_ZANAATKAR,
  "Sanayi Devrimi|Zanaatkâr": OLAY_SANAYI_ZANAATKAR,
};

const ILISKILER_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [{ yas: 28, hedef: 1 },{ yas: 40, hedef: 2 },{ yas: 52, hedef: 3 }];





const KOMIK_GARIP_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [{ yas: 30, hedef: 1 },{ yas: 50, hedef: 2 }];

/** komikOlumler.ts (14 olay, risk-tercihli "aptalca olanı yap mı?" ekranları — seçim yine oyuncunun, garanti sadece EKRANI göstermeyi zorlar, ölümü değil) — düşük hedef, düşük öncelik. */


/** komikOlumler.ts olay id'leri — Faz 5 skor bonusu: bu havuzdaki "aptalca olanı yap" riskli
 * şıkkını seçip hayatta kalmak/ölmek tek seferlik bir skor bonusu tetikler (bkz. hesaplaSkorKirilimi). */
const KOMIK_OLUM_ID_SETI = new Set(OLAY_KOMIK_OLUM.map((o) => o.id));

/**
 * Gecikmiş takip TETİKLEYİCİ garantisi (2026-09 sonu, kullanıcı isteği): 24
 * yaşına kadar en az 1, 37 yaşına kadar en az 2 "gecikmiş takip" tetikleyici
 * olayı (gecikmisTakip.ts) görülmüş olmalı — aksi halde bu havuz hiç düşük
 * ağırlıklı normal havuzdan çıkmadan bir ömür geçebilirdi. Yalnız
 * `gecikmisTakipOlayi:true` (tetikleyici) olaylar dahil edilir — sonuç
 * olayları (`gecikmisSonucOlayi:true`) BURADAN zorlanmaz, onlar yalnız
 * gecikmiş-takip kaskadıyla (state.gecikmis_takipler) gelir.
 */
const GECIKMIS_TAKIP_TETIKLEYICI_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 24, hedef: 1 },
  { yas: 37, hedef: 2 },
];

/**
 * Bölgesel olay garantisi (2026-09 denetim turu — kullanıcı isteği: "80
 * bölgesel olay için yaşa bağlı tetikleyici ekle"). Havuz her iki çağın
 * TÜMÜ (80 olay, 40+40) olarak verilir ama `standaloneHavuzDurumu`'nun
 * `temelUygunMu` filtresi karakterin `cag`'ına uymayan 40'ı VE `bolgeler`
 * filtresi kendi bölgesi dışındaki 30'u otomatik eler — pratikte her
 * karakter yalnızca kendi 10 olaylık bölge alt-havuzuyla karşılaşır, ayrı
 * bir çağ/bölge dallanması yazmaya gerek yok. Hedefler diğer küçük (~10
 * olaylık) havuzlarla (SARAY/EVCIL_HAYVAN) aynı ölçekte tutuldu; yaşlar
 * diğer standalone tablolarla çakışmasın diye 5. turdaki "hiçbir yaş iki
 * tabloda tekrar etmesin" kuralına uyularak seçildi (28/47/68 boştaydı).
 */
const BOLGESEL_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [{ yas: 38, hedef: 1 }];

/**
 * Meslekten bağımsız standalone havuz garantileri — sabit liste, çağrı başına
 * yeniden oluşturulmaz. Gecikmiş takip tetikleyici havuzu bilerek EN SONA
 * eklendi: aynı yaşta eşit derecede geride kalan (gerideKalmaOrani eşit)
 * başka bir havuzla karşılaşırsa `standaloneHavuzDurumu`'nun sıralı taraması
 * (strict `>`) ilk bulduğunu korur — mevcut testlerin varsaydığı genel.ts/
 * meslek-standalone önceliği bozulmasın diye.
 */
const STANDALONE_HAVUZ_GARANTILERI: StandaloneHavuzTanimi[] = [
  { havuz: OLAY_GENEL, kontrolNoktalari: GENEL_HAVUZ_KONTROL_NOKTALARI },
  // İlişkiler + aile + evlilik tek havuz: temelUygunMu (medeni:evli, cocuk_var, aile:* …) o an uygun olanı seçer.
  { havuz: [...OLAY_ILISKILER, ...OLAY_AILE, ...OLAY_EVLILIK_AILE], kontrolNoktalari: ILISKILER_HAVUZ_KONTROL_NOKTALARI },
  // Meslek yatkınlık kademesine özel olaylar (yalnız kademe uyuyorsa uygun sayılır): 29 yaşta bir tane.
  {
    havuz: OLAY_MESLEK_YATKINLIK.filter((o) => o.minMeslekYatkinlikSeviye !== undefined || o.maxMeslekYatkinlikSeviye !== undefined),
    kontrolNoktalari: [{ yas: 29, hedef: 1 }],
  },
  // Şehir yöneticisi (otorite) + vergi olayları: Tüccar/Zanaatkâr (meslek filtresi olayda).
  { havuz: [...OLAY_OTORITE, ...OLAY_VERGI], kontrolNoktalari: [{ yas: 28, hedef: 1 },{ yas: 40, hedef: 2 },{ yas: 55, hedef: 3 }] },
  { havuz: OLAY_KOMIK_GARIP, kontrolNoktalari: KOMIK_GARIP_HAVUZ_KONTROL_NOKTALARI },
  {
    havuz: OLAY_GECIKMIS_TAKIP.filter((o) => o.gecikmisTakipOlayi),
    kontrolNoktalari: GECIKMIS_TAKIP_TETIKLEYICI_KONTROL_NOKTALARI,
  },
  {
    havuz: [...OLAY_BOLGESEL_ORTACAG, ...OLAY_BOLGESEL_SANAYI],
    kontrolNoktalari: BOLGESEL_HAVUZ_KONTROL_NOKTALARI,
  },
];

/**
 * Evcil hayvan KARŞILAŞMA garantisi (2026-10 yeniden tasarım): rastgele karşılaşmalar
 * hiç denk gelmezse sistem bu yaşlarda zorlar — 29'a kadar 1., 38'e kadar 2. karşılaşma.
 * Bir hayatta en fazla `HAYVAN_KARSILASMA_TAVANI` (2) karşılaşma olur.
 */
const HAYVAN_KARSILASMA_KONTROL_NOKTALARI = [
  { yas: 29, hedef: 1 },
  { yas: 38, hedef: 2 },
];

/**
 * Hayvan başına DEVAM (takip) garantisi: hayvanın sahipliğinin 5/9/13/17. yılında o
 * türe özel havuzdan (`OlayTanimi.hayvanTuru`) kümülatif olarak 1/2/3/4 olay görülmüş
 * olmalı. Havuz ayrıca normal ağırlıklı seçimle de rastgele çıkar.
 */
const HAYVAN_DEVAM_KONTROL_NOKTALARI = [{ yas: 7, hedef: 1 }];

/** Aday havuzunu o anki state'e göre filtreler (temelUygunMu), görülmemiş olanlardan rastgele döner. */
function hayvanKarsilasmaGarantisiSec(state: CharacterState): string | null {
  const hedef = HAYVAN_KARSILASMA_KONTROL_NOKTALARI.reduce(
    (maks, nokta) => (state.yas >= nokta.yas ? Math.max(maks, nokta.hedef) : maks),
    0
  );
  if (hedef === 0 || state.hayvan_karsilasma_sayisi >= Math.min(hedef, HAYVAN_KARSILASMA_TAVANI)) return null;
  const adaylar = OLAY_BANKASI.filter(
    (o) => o.hayvanKarsilasmaTuru && !state.gecmis_olaylar.includes(o.id) && temelUygunMu(o, state)
  );
  return adaylar.length > 0 ? adaylar[Math.floor(Math.random() * adaylar.length)].id : null;
}

/** Yaşayan her hayvan için sahiplik süresine göre kümülatif hedefin gerisindeyse o türün havuzundan zorlanacak olay. */
function hayvanDevamGarantisiSec(state: CharacterState): string | null {
  for (const hayvan of state.evcil_hayvanlar) {
    const sahiplikYili = state.yas - hayvan.edinim_yasi;
    const havuz = OLAY_BANKASI.filter((o) => o.hayvanTuru === hayvan.tur);
    const secilen = kumulatifTakipSec(
      HAYVAN_DEVAM_KONTROL_NOKTALARI.map((n) => ({ yas: n.yas, hedef: n.hedef })),
      sahiplikYili,
      havuz.map((o) => o.id),
      havuz.filter((o) => temelUygunMu(o, state)).map((o) => o.id),
      state.gecmis_olaylar
    );
    if (secilen) return secilen;
  }
  return null;
}

// Gizemli eşya takip garantisi: her eşyanın kendi havuzu sadece 2 olay.
// Havuz sadece 2 olay; ikisini de garanti etmek gizemi tamamen ortadan
// kaldırırdı (§26 "gizemli eşya" adını hak etsin diye) — hedef 1'de kalır,
// ikincisini görüp görmemek normal ağırlıklı seçime/şansa bırakılır.
const GIZEMLI_ESYA_TAKIP_KONTROL_NOKTALARI = [{ yas: 45, hedef: 1 }];

// Hizip takip garantisi: her hizbin kendi havuzu ~10 olay (9 hizbe özel + 1
// meslek-çatışma genel). 2026-09 (kullanıcı isteği): daha sık/ince kontrol
// noktaları + ilk yaş biraz düşürüldü + nihai hedef bir birim yükseltildi.
const HIZIP_TAKIP_KONTROL_NOKTALARI = [{ yas: 26, hedef: 1 },{ yas: 44, hedef: 2 },{ yas: 60, hedef: 3 }];

/** Saray takip garantisi: sabit 6 olaylık küçük havuz — hepsini tüketmeden çeşitlilik payı bırakılır. */
const SARAY_TAKIP_KONTROL_NOKTALARI = [{ yas: 50, hedef: 1 },{ yas: 60, hedef: 2 },{ yas: 75, hedef: 3 }];

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

interface EkipEklemeSecenekleri {
  /** Verilmezse rastgele bir isim seçilir. */
  isim?: string;
  /** Verilmezse üç zar ortalaması (uçlar nadir, ortalama olası). */
  gercekKalite?: number;
  /** 0-1: eşdeğer bir çalışanın maaşından bu oranda indirim. */
  maasIndirimi?: number;
  sadakat?: number;
  kisilik?: string;
  /** Üye oyuncunun çocuğuysa çocuğun adı. */
  cocukIsim?: string;
  /** Verilmezse işe alma anındaki kalıcı maaş çarpanı 1 + (kalite − 50) / 500. */
  buffCarpani?: number;
}

/**
 * Yeni bir ekip üyesi işe alır (olay `ekip_ekle` etkisi ve çocuğun yanında çalışması ortak yolu):
 * gizli kalite, maaş, sadakat, kalıcı pasif maaş çarpanı ve hayat hikayesi kaydı.
 */
function ekipUyesiEkle(
  state: CharacterState,
  rol: string,
  tahminGenisligi: number,
  secenekler: EkipEklemeSecenekleri = {}
): EkipUyesi {
  const isim =
    secenekler.isim ??
    rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi,
      state.rakip_adi,
      state.es_adi ?? "",
      state.isim ?? "",
      ...state.ekip.map((e) => e.isim),
    ]);
  // Üç zar ortalaması: uçlar (çok kötü/çok iyi) nadir, ortalama tutulmak daha olası — "bazen hasta, bazen aşırı başarılı" hissi.
  const gercekKalite =
    secenekler.gercekKalite ?? Math.round((Math.random() * 100 + Math.random() * 100 + Math.random() * 100) / 3);
  const tahminiMin = Math.max(0, Math.round(gercekKalite - tahminGenisligi / 2));
  const tahminiMax = Math.min(100, Math.round(gercekKalite + tahminGenisligi / 2));
  const tamMaas = 2 + Math.round(gercekKalite / 14);
  const maas = secenekler.maasIndirimi ? Math.round(tamMaas * (1 - secenekler.maasIndirimi) * 10) / 10 : tamMaas;
  const sadakat = secenekler.sadakat ?? Math.round(30 + Math.random() * 60);
  const kisilik = secenekler.kisilik ?? EKIP_KISILIK_HAVUZU[Math.floor(Math.random() * EKIP_KISILIK_HAVUZU.length)];
  const uye: EkipUyesi = {
    id: randomUUID(),
    isim,
    rol,
    gercekKalite,
    tahminiMin,
    tahminiMax,
    maas,
    sadakat,
    kisilik,
    ...(secenekler.cocukIsim ? { cocuk_isim: secenekler.cocukIsim } : {}),
  };
  state.ekip.push(uye);
  maasCarpaniUygula(state, secenekler.buffCarpani ?? 1 + (gercekKalite - 50) / 500);
  hayatOlayiEkle(state, "🤝", T(state.dil, "{0} ({1}) ekibine katıldı", [isim, K(state.dil, rol)]));
  return uye;
}

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
/** Bir mekân olayı çözüldükten sonra o mekânın kaç oyun yılı kilitli kalacağı (kullanıcı: mekân olayı tur harcamaz ama farm da olmasın). */
const SOSYALLESME_MEKAN_COOLDOWN = 2;

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
const SUC_KAZANC_PARA_CARPANI = 1.6;

// Suç sınıfı aralıkları ve hapis/kefaret/yıldız sabitleri data/aranmaSabitleri.ts'te
// (tek yer). Eski import yolları için buradan yeniden dışa aktarılır.
export { SUC_SINIFI_ARALIKLARI, sucSinifiUst, sucSinifiDegeri };

/**
 * Mülk olayı (mulkOlaylari.ts, tür başına 2 olay): her mülk için satın alımdan
 * 5-8 yıl sonra, TEK SEFERLİK. Eski %12 fırsatçı yedek ve 15 yıllık pencere kaldırıldı.
 */
const MULK_OLAYI_PENCERE_BASLANGIC_YIL = 5;
const MULK_OLAYI_PENCERE_BITIS_YIL = 8;

/**
 * "Gecikmiş takip" havuzu (gecikmisTakip.ts, 2026-09 sonu): bir seçimin geri
 * dönüşü, seçimden bu kadar yıl sonra (rastgele bu aralıkta) zorlanan olay
 * olarak sunulur — bkz. SonucEtkisi.gecikmis_takip + state.gecikmis_takipler.
 */
const GECIKMIS_TAKIP_YIL_MIN = 15;
const GECIKMIS_TAKIP_YIL_MAX = 20;

/**
 * Tutuklanma anındaki suc_seviyesi bandına göre hapis cezası süresini (yıl)
 * belirler — aranmaSeviyesi.ts'teki 4 bantla birebir hizalı (data/aranmaSabitleri.ts
 * HAPIS_CEZA_ARALIKLARI): 0-25 → 3-4y · 25-50 → 7-9y · 50-75 → 9-11y · 75+ → 12-14y.
 * Hangi olay/yol tutukladığından (aranmaSeviyesi.ts, kotuIsler.ts, baskın,
 * gönüllü teslim) bağımsız tek fonksiyon.
 */
export function hapisCezaSuresiHesapla(sucSeviyesi: number): number {
  const [min, max] = hapisCezaSuresiAraligi(sucSeviyesi);
  return aralikTamSayi(min, max);
}

/**
 * Yolculuk (Haçlı Seferi / Hac / Keşif / Sömürge Seferi vb.) olaylarında kazanılan
 * paraya uygulanan sabit zam. Eskiden yolculuğu bitirmek kalıcı bir maaş primi
 * (maas_carpani ×1.2) veriyordu; artık o kaldırıldı — bunun yerine yalnızca
 * yolculuk sürerken (yolculukOlayi:true olay) elde edilen para %20 daha değerli.
 */
const YOLCULUK_KAZANC_CARPANI = 1.2;

/**
 * Her olay seçiminden gelen pozitif paraya uygulanan sabit çarpan. Büyük denge
 * turunda 1.055'ten 0.85'e çekilmişti (kullanıcı "olaylardan gelen para
 * ödüllerini %20 düşür" demişti). 2026-09 sonu: kullanıcı isteğiyle bu değer
 * tekrar +%5 artırıldı (0.85 × 1.05). YALNIZ pozitif para'ya biner (kayıplara
 * değil). Meslek/yolculuk/suç çarpanlarının hepsinin altında, ilk sırada
 * uygulanır.
 */
const OLAY_PARA_PRIMI = 0.8925;

/**
 * Çifte kazanç önlemi (2026-10): işletmesi olan oyuncunun KENDİ meslek kategorisindeki
 * olaylardan gelen pozitif para yarıya iner; kalan yarısı müşteri kitlesine
 * çevrilir (10 kırpılan para ≈ 1 müşteri, en çok +3). Olay metinlerine dokunulmaz.
 */
/** Olaylardan gelen müşteri tam sayıya yuvarlanır (0'a yuvarlanan sessizce atlanır). */
function musteriEkleTam(state: CharacterState, delta: number): void {
  const tam = Math.round(delta);
  if (tam) musteriEkle(state, tam);
}

export function ciftKazancKirp(state: CharacterState, etki: SonucEtkisi, kategori: string): void {
  if (!etki.para || etki.para <= 0) return;
  if (!isletmeAktif(state) || MESLEK_KATEGORI[state.meslek] !== kategori) return;
  const yarisi = etki.para / 2;
  etki.para = paraYuvarla(yarisi);
  musteriEkleTam(state, Math.min(3, yarisi / (10 * enflasyonCarpani(state))));
}


type SucKazanciSonucu = "yok" | "suc" | "ciddi" | "gizli";

/**
 * Verilen (jitter uygulanmış, mesleğe göre çarpılmış) sonuç etkisini yerinde
 * mutasyona uğratır. etki nesnesi çağrı zincirinde `uygulananEtki` olarak geri
 * döndüğü ve state'e bu nesneden uygulandığı için burada büyütmek yeterli —
 * downstream (state mutasyonu, EtkiCipleri gösterimi, hayat hikayesi büyük-kazanç
 * kaydı) otomatik olarak büyütülmüş değerleri görür.
 */
export function sucKazanciUygula(etki: SonucEtkisi, gizliKal = false): SucKazanciSonucu {
  // Suç yalnız olay verisinde açıkça `suc_sinifi` yazılı dallarda sayılır (ahlak/para
  // sezgisi kaldırıldı: hizip, ihanet, flavor gibi suç olmayan şıklar aranma almaz).
  const sinif = etki.suc_sinifi;
  if (!sinif) return "yok";

  // Para çarpanı yalnız bu seçimin tek seferlik kazancına biner (yıllık maaşa değil).
  if ((etki.para ?? 0) > 0) etki.para = Math.round((etki.para as number) * SUC_KAZANC_PARA_CARPANI);

  // Aranma II: suçüstü olmayan (başarılı) dal GİZLİ kalır — aranma hemen artmaz, suç
  // ifşa kuyruğuna girer (aranmaSistemi.gizliSucKaydet, 4-10 yıl sonra açığa çıkabilir).
  // Suçüstü (başarısız) dal anında artar.
  if (gizliKal) return "gizli";
  etki.suc_artis = (etki.suc_artis ?? 0) + sucSinifiDegeri(sinif);

  return sinif === "buyuk" || sinif === "agir" ? "ciddi" : "suc";
}

/**
 * Bir seçimin aranma (suc_seviyesi) üzerindeki GERÇEK net değişimi: önce/sonra
 * değerleri 0-100'e kelepçelenip farkı alınır, böylece suc_artis, suç-kazancı
 * motor kuralı ve mutlak `suc_seviyesi_ayarla` tek sayıda birleşir. Sonuç
 * ekranı çipinin (EtkiCipleri) kaynağıdır.
 */
export function sucDegisimiHesapla(once: number, sonra: number): number {
  const kelepce = (v: number) => Math.max(0, Math.min(100, v));
  return Math.round((kelepce(sonra) - kelepce(once)) * 10) / 10;
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

/**
 * `SonucEtkisi.zorunlu_sonraki_havuzu`'ndan bir sonraki olayı seçer — mümkünse
 * bu karakterin `gecmis_olaylar`'ında hiç görülmemiş bir aday tercih edilir
 * (aynı yolculuk zincirinin farklı hayatlarda farklı dallar izlemesi için, §17
 * "az olay var" turu Yol A). Havuzdaki hepsi zaten görülmüşse (nadir — çok
 * uzun bir ömürde aynı zincir noktasına ikinci kez gelinmesi) rastgele biri
 * seçilir; tek eleman kalmışsa doğrudan o döner.
 */
function zorunluSonrakiHavuzdanSec(havuz: string[], gecmisOlaylar: string[]): string {
  const gorulmemis = havuz.filter((id) => !gecmisOlaylar.includes(id));
  const adaylar = gorulmemis.length > 0 ? gorulmemis : havuz;
  return adaylar[Math.floor(Math.random() * adaylar.length)];
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
  /**
   * Oyuncu ana oyun ekranındaki cevaplanmamış bir olayı (mevcutOlay/mevcutSenaryo)
   * bırakıp Sosyalleş'e gidip bir mekâna girdiğinde, o mekânın olayı ZORLA
   * (zorlananOlayId) üretilmeden önce ana olay burada saklanır — aksi halde
   * senaryoUret'in "sayfa yenileme" önbelleği (mevcutOlay doluyken aynen
   * döndürür) zorlananOlayId'yi tamamen yok sayar ve mekân olayı hiç görünmez.
   * Mekân olayı çözülünce (sosyallesmeOlayCoz) ya da terk edilip başka bir
   * mekân/ana olay tekrar üretilince buradan geri yüklenir/temizlenir.
   */
  sakliOlay: { olay: OlayTanimi; senaryo: SenaryoResponse } | null;
}

const oturumlar = new Map<string, Oturum>();

/** Bellekteki akışın (mevcut olay, zorunlu zincir, onTepki, saklı olay) kalıcı kopyasını üretir. */
function akisKaydiOlustur(oturum: Oturum): OturumAkisiKaydi | null {
  const tepkiHamIndex =
    oturum.bekleyenTepki && oturum.mevcutOlay
      ? oturum.mevcutOlay.secenekler.findIndex((s) => s.onTepki === oturum.bekleyenTepki?.onTepki)
      : -1;
  const kayit: OturumAkisiKaydi = {
    olayId: oturum.mevcutOlay && oturum.mevcutSenaryo ? oturum.mevcutOlay.id : null,
    senaryo: oturum.mevcutOlay && oturum.mevcutSenaryo ? oturum.mevcutSenaryo : null,
    zorlananOlayId: oturum.zorlananOlayId,
    sonTon: oturum.sonTon,
    tepki:
      oturum.bekleyenTepki && tepkiHamIndex >= 0
        ? { hamIndex: tepkiHamIndex, eskiRutbeSeviye: oturum.bekleyenTepki.eskiRutbeSeviye }
        : null,
    sakli: oturum.sakliOlay ? { olayId: oturum.sakliOlay.olay.id, senaryo: oturum.sakliOlay.senaryo } : null,
  };
  const bos = !kayit.olayId && !kayit.zorlananOlayId && !kayit.sakli && !kayit.sonTon;
  return bos ? null : kayit;
}

/** OLAY_BANKASI'ndan id ile bulunan olayı oyuncunun diline çevrilmiş haliyle döner. */
function kayitliOlayBul(id: string | null | undefined, state: CharacterState): OlayTanimi | null {
  if (!id) return null;
  const olay = OLAY_BANKASI.find((o) => o.id === id);
  return olay ? olayCevirisiUygula(olay, state.dil) : null;
}

/** DB'den gelen bir state için bellek oturumunu, kalıcı akış kaydından geri kurar. */
function oturumOlustur(state: CharacterState): Oturum {
  // Eski (klasik zaman modelli) kayıtlar telefon ana ekranının "ilerle" modeline geçer:
  // ilk açılışta hemen bir olay çıksın diye sayaç 2'den başlar.
  if (state.zaman_modeli === undefined) {
    state.zaman_modeli = "ilerle";
    state.yil_sayaci = 2;
  }
  const kayit = state.oturum_akisi ?? null;
  const mevcutOlay = kayitliOlayBul(kayit?.olayId, state);
  const mevcutSenaryo = mevcutOlay && kayit?.senaryo ? kayit.senaryo : null;
  const tepkiSecenegi = mevcutOlay && kayit?.tepki ? mevcutOlay.secenekler[kayit.tepki.hamIndex] : undefined;
  const sakliOlay = kayit?.sakli ? kayitliOlayBul(kayit.sakli.olayId, state) : null;
  return {
    state,
    mevcutSenaryo,
    mevcutOlay: mevcutSenaryo ? mevcutOlay : null,
    zorlananOlayId:
      kayit?.zorlananOlayId && OLAY_BANKASI.some((o) => o.id === kayit.zorlananOlayId) ? kayit.zorlananOlayId : null,
    sonErisim: Date.now(),
    sonTon: kayit?.sonTon ?? null,
    bekleyenTepki:
      mevcutOlay && mevcutSenaryo && tepkiSecenegi?.onTepki && kayit?.tepki
        ? { onTepki: tepkiSecenegi.onTepki, mevcutOlay, eskiRutbeSeviye: kayit.tepki.eskiRutbeSeviye }
        : null,
    sakliOlay: sakliOlay && kayit?.sakli ? { olay: sakliOlay, senaryo: kayit.sakli.senaryo } : null,
  };
}

/**
 * State'i DB'ye yazar — yazmadan önce bu state'in bellek oturumundaki akışı
 * (`oturum_akisi`) state'e işler; böylece sunucu yeniden başlasa bile oyuncu
 * ekrandaki olaydan kaldığı yerden devam eder. Motorun her yerindeki eski
 * `oturumKaydet(state)` çağrıları bu sarmalayıcıdan geçer.
 */
async function oturumKaydet(state: CharacterState): Promise<void> {
  const oturum = oturumlar.get(state.id);
  if (oturum && oturum.state === state) {
    state.oturum_akisi = akisKaydiOlustur(oturum);
    state.olay_bekliyor = olayBekliyorMu(oturum);
  }
  await oturumuDbyeYaz(state);
}

/** "ilerle" modunda iki olay arasında geçen yıl: sayaç bu değere ulaşınca yeni olay çıkar. */
const OLAY_ARALIGI_YIL = 2;

/**
 * Şu an çözülmesi gereken bir olay var mı? Klasik modda her zaman (eski akış: her turda olay).
 * "ilerle" modunda: ekranda/kuyrukta bekleyen olay, zorlanan zincir (zorunlu_sonraki, veba…),
 * yolculuk adımları (her adım hemen çıkar) ya da son olaydan beri 2 yıl dolmuşsa.
 * Sosyalleş mekân olayları (oyuncunun kendi seçtiği, ana akıştan bağımsız) sayılmaz.
 */
function olayBekliyorMu(oturum: Oturum): boolean {
  const s = oturum.state;
  if (!s.aktif || !s.meslek) return false;
  if (s.zaman_modeli !== "ilerle") return true;
  if (oturum.bekleyenTepki) return true;
  if (oturum.mevcutSenaryo && oturum.mevcutOlay && !oturum.mevcutOlay.sosyallesmeYeri) return true;
  if (oturum.zorlananOlayId) {
    const zorlanan = OLAY_BANKASI.find((o) => o.id === oturum.zorlananOlayId);
    if (!zorlanan?.sosyallesmeYeri) return true;
  }
  if (s.etiketler.includes("yolculukta")) return true;
  return (s.yil_sayaci ?? 0) >= OLAY_ARALIGI_YIL;
}

/**
 * Server açılışında DB'deki aktif oturumları in-memory önbelleğe yükler; bir
 * önceki çalışmadan yarım kalmış oyunlar restart sonrası da devam edebilir.
 */
export async function oturumlariYukle(): Promise<number> {
  const stateler = await aktifOturumlariYukle();
  let yuklenen = 0;
  for (const state of stateler) {
    // Tek bozuk kayıt tüm sunucunun açılışını (ve Render'da çökme döngüsünü) bozmasın.
    try {
      eskiKayitGocu(state);
      oturumlar.set(state.id, oturumOlustur(state));
      yuklenen++;
    } catch (err) {
      console.error(`Oturum yüklenemedi, atlandı (${state?.id}):`, err);
    }
  }
  return yuklenen;
}

/**
 * Server açılışında, DB'de hâlâ duran bitmiş (ölmüş) oturumlardan skoru henüz
 * kaydedilmemiş olanları liderlik tablosuna otomatik geçirir — istemci "kaydet"
 * demeden ölen ya da eski istemciyle oynanan geçmiş oyunlar da tabloya girsin.
 * İsim `state.isim`'den alınır (boş/uygunsuzsa "İsimsiz"). `skoru_kaydedildi`
 * bayrağıyla tekilleştirilir: sonraki restart'larda aynı oyun tekrar eklenmez.
 * 7 günlük oturum temizliği yüzünden yalnız son ~1 haftanın oyunları kurtarılır.
 */
export async function gecmisSkorlariKaydet(): Promise<number> {
  let kaydedilen = 0;
  let stateler: CharacterState[];
  try {
    stateler = await bitmisOturumlariYukle();
  } catch (err) {
    console.error("Geçmiş skorlar okunamadı:", err);
    return 0;
  }
  for (const state of stateler) {
    if (state.aktif || state.skoru_kaydedildi) continue;
    eskiKayitGocu(state);
    let isim = (state.isim ?? "").trim().slice(0, 40);
    if (!isim || uygunsuzMu(isim)) isim = "İsimsiz";
    try {
      await skoruDbyeYaz(state, isim);
      state.skoru_kaydedildi = true;
      await oturumKaydet(state);
      const bellek = oturumlar.get(state.id);
      if (bellek) bellek.state.skoru_kaydedildi = true;
      void metrikYaz({
        tur: "skor_kaydi",
        oturum_id: state.id,
        cag: state.cag,
        bolge: state.bolge,
        meslek: state.meslek,
        yas: state.yas,
        skor: hesaplaSkor(state),
      });
      kaydedilen++;
    } catch (err) {
      console.error(`Geçmiş skor kaydedilemedi (${state.id}):`, err);
    }
  }
  return kaydedilen;
}

async function oturumGetir(id: string): Promise<Oturum> {
  const varOlan = oturumlar.get(id);
  if (varOlan) {
    varOlan.sonErisim = Date.now();
    return varOlan;
  }
  // Aynı id için eşzamanlı iki soğuk yükleme iki ayrı Oturum nesnesi yaratıp birinin
  // değişikliğini kaybettirirdi: yüklemeyi id başına tek bir Promise'e indir.
  let bekleyen = oturumYuklemeleri.get(id);
  if (!bekleyen) {
    bekleyen = (async () => {
      const state = await oturumYukle(id);
      if (!state) throw new Error("Oyun oturumu bulunamadı.");
      eskiKayitGocu(state);
      const oturum = oturumOlustur(state);
      oturumlar.set(id, oturum);
      return oturum;
    })().finally(() => oturumYuklemeleri.delete(id));
    oturumYuklemeleri.set(id, bekleyen);
  }
  return bekleyen;
}

const oturumYuklemeleri = new Map<string, Promise<Oturum>>();

/**
 * Bitmiş (aktif:false) ve bir süredir erişilmemiş oturumları in-memory
 * önbellekten siler; DB'deki kaydı etkilemez, tekrar gerekirse oradan
 * yüklenir. Sürekli çalışan bir sunucuda sınırsız RAM büyümesini önler.
 */
export function oturumlariBellektenTemizle(graceMs: number, aktifGraceMs?: number): number {
  const esik = Date.now() - graceMs;
  const aktifEsik = aktifGraceMs !== undefined ? Date.now() - aktifGraceMs : undefined;
  let silinen = 0;
  for (const [id, oturum] of oturumlar) {
    // Aktif oturumlar da her mutasyonda DB'ye yazıldığı için uzun süre boşta kalanlar
    // güvenle bellekten atılır; oturumGetir gerektiğinde DB'den geri yükler (terk edilmiş
    // oyunlar RAM'i şişirmesin).
    const bitmisVeBosta = !oturum.state.aktif && oturum.sonErisim < esik;
    const aktifVeUzunBosta = oturum.state.aktif && aktifEsik !== undefined && oturum.sonErisim < aktifEsik;
    if (bitmisVeBosta || aktifVeUzunBosta) {
      oturumlar.delete(id);
      silinen++;
    }
  }
  return silinen;
}

/** Hata mesajlarını çevirmek için oturumun dili (bellekte yoksa Türkçe). */
export function oturumDiliGetir(id: string): "tr" | "en" {
  return oturumlar.get(id)?.state.dil === "en" ? "en" : "tr";
}

export function aktifOturumSayisi(): number {
  return oturumlar.size;
}

export async function yeniOyun(
  cag: Cag,
  bolge: string,
  yerlesimId: string,
  oyuncuIsmi?: string,
  dil?: string,
  istemciId?: string,
  zamanModeli?: "ilerle"
): Promise<CharacterState> {
  // Bu cihazın önceki hayatlarında görülen olayları çek — yeni hayatın olay
  // seçimindeki tekrar-önleme penceresini (§12, olaySecici.ts) genişletmek için
  // (aynı cihazdan art arda oynanan hayatlarda hep aynı olayların çıkmasını azaltır).
  const caprazGecmis = istemciId ? await istemciGecmisiOku(istemciId) : [];
  const state = createCharacter(cag, bolge, yerlesimId, oyuncuIsmi, dil, istemciId, caprazGecmis);
  if (zamanModeli === "ilerle") {
    state.zaman_modeli = "ilerle";
    state.yil_sayaci = OLAY_ARALIGI_YIL; // meslek seçilince ilk olay hemen gelsin
  }
  oturumlar.set(state.id, {
    state,
    mevcutSenaryo: null,
    mevcutOlay: null,
    zorlananOlayId: null,
    sonErisim: Date.now(),
    sonTon: null,
    bekleyenTepki: null,
    sakliOlay: null,
  });
  await oturumKaydet(state);
  void metrikYaz({
    tur: "yeni_oyun",
    oturum_id: state.id,
    istemci_id: istemciId,
    cag: state.cag,
    bolge: state.bolge,
    yerlesim: state.yerlesim,
  });
  return state;
}

/** İsim seçim ekranı için: bölge/çağa uygun kültürel bir ERKEK isim önerir (oyun şu an yalnız erkek karakter). */
export function isimOnerisiGetir(cag: Cag, bolge: string): string {
  return rastgeleOyuncuIsmiSec(cag, bolge);
}

export async function mesleğiAta(id: string, meslek: string): Promise<CharacterState> {
  const oturum = await oturumGetir(id);
  if (!oturum.state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (oturum.state.meslek) throw new Error("Meslek zaten seçildi.");
  mesleğiSec(oturum.state, meslek);
  // v11: Tüccar/Zanaatkâr oyun başında 3 ürün arasından birini seçer (yalnız API'den açılan "ilerle" oyunları).
  if (oturum.state.zaman_modeli === "ilerle" && isletmeProfiliGetir(oturum.state.meslek, oturum.state.cag)?.baslangicUrunleri?.length) {
    oturum.state.urun_secim_bekliyor = true;
  }
  await oturumKaydet(oturum.state);
  void metrikYaz({
    tur: "meslek_secim",
    oturum_id: id,
    meslek: oturum.state.meslek,
    cag: oturum.state.cag,
    bolge: oturum.state.bolge,
  });
  return oturum.state;
}

export async function stateGetir(id: string): Promise<CharacterState> {
  const oturum = await oturumGetir(id);
  oturum.state.olay_bekliyor = olayBekliyorMu(oturum);
  return oturum.state;
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
  if (!oturum.state.meslek) throw new Error("Önce bir meslek seçmelisin.");
  // "ilerle" modu: iki olay arası yıllar İLERLE ile geçer; olay henüz çıkmadıysa senaryo üretilmez
  // (zorlanan olay — Sosyalleş mekânı, zincir — her zaman üretilebilir).
  if (oturum.state.zaman_modeli === "ilerle" && !oturum.zorlananOlayId && !olayBekliyorMu(oturum)) {
    throw new Error("Şu an çözülecek bir olay yok; yıl ilerletmelisin.");
  }
  if (ogretiBekliyorMu(oturum.state)) throw new Error("Önce öğretini seçmelisin.");
  if (urunSecimiBekliyorMu(oturum.state)) throw new Error("Önce başlangıç ürününü seçmelisin.");

  // Zaten cevaplanmamış bir olay varsa (sayfa yenilendi, sekme yeniden açıldı,
  // istemci /scenario'yu tekrar çağırdı) YENİDEN ZAR ATILMAZ — aynı olay aynen
  // döndürülür. Bunun garantisi olmadan her çağrı olaySec'i tekrar çalıştırıp
  // oyuncunun az önce gördüğü olayı sessizce başka bir rastgele olayla
  // değiştiriyordu ("ekran yenilenince olay değişiyor" hatası).
  if (oturum.mevcutOlay && oturum.mevcutSenaryo) {
    // Oyuncu bir mekân olayını (Sosyalleş) çözmeden ana oyuna döndü ve istemci
    // senaryoyu yeniden istedi (sayfa yenileme / "Ana Menü → Oyuna Devam Et"):
    // ana ekranda mekân olayı DEĞİL, kenara ayrılmış asıl olay gösterilmeli —
    // aksi halde istemci mekân olayını gösterir, secimUygula ise seçimi saklı
    // ana olaya uygulardı (ekrandaki şık ile uygulanan şık uyuşmazdı). Mekân
    // olayı terk edilir (giriş ücreti iade edilmez, mekân kilitlenmez).
    if (oturum.mevcutOlay.sosyallesmeYeri && oturum.sakliOlay) {
      oturum.mevcutOlay = oturum.sakliOlay.olay;
      oturum.mevcutSenaryo = oturum.sakliOlay.senaryo;
      oturum.sakliOlay = null;
      oturum.bekleyenTepki = null;
      await oturumKaydet(oturum.state);
      return oturum.mevcutSenaryo;
    }
    if (oturum.bekleyenTepki) {
      oturum.bekleyenTepki = null;
      await oturumKaydet(oturum.state);
    }
    return oturum.mevcutSenaryo;
  }

  let zorlananId = oturum.zorlananOlayId ?? undefined;
  let etiketDegisti = false;
  // §24 düzeltmesi: karakter bir havuz kilidi altındaysa (hapiste / yolculukta /
  // kacak / veba_hastasi) hiçbir "hayat dönüm noktası" olayı zorlanmaz — bu
  // olaylar kilitli havuzda gösterilemez ve "hapiste evlilik teklifi" gibi
  // tuhaflıklara yol açardı. Zaten kuyruğa alınmış bir olay (veba başlangıcı,
  // zorunlu_sonraki zinciri, sosyalleşme) varsa milestone kaskadı zaten atlanır.
  const milestoneKilitli = !zorlananId && havuzKilidiVar(oturum.state);
  if (!zorlananId && !milestoneKilitli && !oturum.state.ulke.savasta && !oturum.state.ulke.vebada && oturum.state.yas <= 55) {
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
  // Sağlık kritik eşikleri (2026-09 sonu, kullanıcı isteği): bir hayatta İLK
  // KEZ sağlık 10'un altına düşünce "ölüme ramak kaldı" tonunda bir olay,
  // İLK KEZ (henüz 10'a düşmediyse) 25'in altına düşünce ayrı bir "sağlık
  // krizi" olayı — her biri kendi 15 olayluk havuzundan (saglikKritik.ts)
  // rastgele seçilip yalnızca bir kez (hayat boyu) zorlanır. 10-eşiği daha
  // acil olduğu için önce kontrol edilir (health 25 altına inmeden 10'un
  // altına düşen nadir bir ani kayıpta 25-eşiği atlanabilir — kabul edilmiş
  // bir kenar durum). Havuz kilidi altındayken (hapiste/yolculukta/kacak/
  // veba_hastasi) diğer milestone'lar gibi ertelenir.
  if (
    !zorlananId &&
    !milestoneKilitli &&
    oturum.state.saglik < 10 &&
    !oturum.state.etiketler.includes("saglik_esik_10_gorundu")
  ) {
    const havuz = OLAY_BANKASI.filter((o) => o.saglikEsikOlayi === "esik10");
    if (havuz.length > 0) {
      zorlananId = havuz[Math.floor(Math.random() * havuz.length)].id;
      etiketEkle(oturum.state, ["saglik_esik_10_gorundu"]);
      etiketDegisti = true;
    }
  }
  if (
    !zorlananId &&
    !milestoneKilitli &&
    oturum.state.saglik < 25 &&
    !oturum.state.etiketler.includes("saglik_esik_25_gorundu")
  ) {
    const havuz = OLAY_BANKASI.filter((o) => o.saglikEsikOlayi === "esik25");
    if (havuz.length > 0) {
      zorlananId = havuz[Math.floor(Math.random() * havuz.length)].id;
      etiketEkle(oturum.state, ["saglik_esik_25_gorundu"]);
      etiketDegisti = true;
    }
  }
  // Gecikmiş takip (§36-benzeri, 2026-09 sonu): geçmişte yapılan bir seçimin
  // 15-20 yıl sonraki geri dönüşü zamanı geldiyse (tetiklenmeYili <= yil),
  // en eskisi zorlanan olay olarak sunulur ve kuyruktan çıkarılır. Havuz
  // kilidi altındaysa (hapiste/yolculukta/kacak/veba_hastasi) beklemeye devam
  // eder — bir sonraki uygun senaryoUret çağrısında tekrar denenir.
  if (!zorlananId && !milestoneKilitli && oturum.state.gecikmis_takipler?.length > 0) {
    const suAnkiYil = oturum.state.yil;
    const hazirOlanlar = oturum.state.gecikmis_takipler
      .filter((g) => g.tetiklenmeYili <= suAnkiYil)
      .sort((a, b) => a.tetiklenmeYili - b.tetiklenmeYili);
    if (hazirOlanlar.length > 0) {
      const hazirOlan = hazirOlanlar[0];
      zorlananId = hazirOlan.olayId;
      oturum.state.gecikmis_takipler = oturum.state.gecikmis_takipler.filter((g) => g.id !== hazirOlan.id);
    }
  }
  // Her çağ×meslek kombinasyonunun kendi dallanan kariyer yolu var: 18
  // yaşından itibaren henüz bir kariyer yoluna girmemişse (yol:asker:*/
  // yol:din:*/yol:tuccar:* etiketi yok), o kombinasyonun giriş olayı zorla
  // tetiklenir — böylece her karakter mutlaka bir yola (itaatkâr/isyancı/
  // kahraman/... ya da dürüst/yozlaşmış/tarikat/... ya da durust/acgozlu/
  // kacakci/hayirsever/...) kilitlenir; şansa bırakılmış hizip sisteminin
  // aksine bu garanti bir kaskad. Aynı meslek farklı çağlarda aynı
  // "yol:X:" önekini paylaşabilir (ör. Orta Çağ ve Sanayi Devrimi Asker'i
  // ikisi de "yol:asker:") — çakışma yoktur çünkü her olay `cag` filtresi
  // taşır ve bir karakter yalnız bir çağda yaşar.
  if (!zorlananId && !milestoneKilitli && oturum.state.yas >= 18) {
    const sistem = YOL_SISTEMLERI[`${oturum.state.cag}|${oturum.state.meslek}`];
    if (sistem) {
      const zatenYolda = oturum.state.etiketler.some((e) => e.startsWith(sistem.yolOnEki));
      if (!zatenYolda && !oturum.state.gecmis_olaylar.includes(sistem.girisId)) {
        zorlananId = sistem.girisId;
      }
    }
  }
  // Hizip zorunlu seçim (bkz. HIZIP_GIRIS_OLAYLARI tanımı yukarıda) — henüz
  // hizip seçmemiş bir karakter, mesleğinden bağımsız olarak 23 yaşına
  // ulaşınca giriş olayını garanti görür (kullanıcı isteği: "her meslekte
  // 23 yaşında tetiklensin" — eskiden 3 meslek yaş 18'de, Zanaatkâr ise
  // rütbe seviyesi 2'de tetikleniyordu; artık hepsi aynı, tek eşiği paylaşıyor).
  if (!zorlananId && !milestoneKilitli && !oturum.state.etiketler.includes("hizip_secildi")) {
    const hizipGirisId = HIZIP_GIRIS_OLAYLARI[oturum.state.meslek];
    if (hizipGirisId && !oturum.state.gecmis_olaylar.includes(hizipGirisId) && oturum.state.yas >= 23) {
      zorlananId = hizipGirisId;
    }
  }
  // Eşiyle uzun süre (7+ yıl) hiç vakit geçirmeyen evli karaktere bir kez özel uyarı olayı
  // zorlanır (yıllık gizli düşüş/ihmal cezası zaten işliyor; bu, oyuncuya haber verir).
  if (
    !zorlananId &&
    !milestoneKilitli &&
    oturum.state.es_adi &&
    !oturum.state.es_ihmal_uyari_goruldu &&
    AS.ihmalYili(oturum.state) >= IHMAL_UYARI_YIL
  ) {
    oturum.state.es_ihmal_uyari_goruldu = true;
    zorlananId = "iliski_es_ihmal_uyarisi";
  }
  // Aşk evliliği yolu: 25 ve 40 yaşında "göz göze" olayı (bekar ya da evli) — rastgele fırsat yok;
  // kilit varsa ertelenir, her karakter tam 2 fırsat görür.
  if (!zorlananId && !milestoneKilitli) {
    const donum = AK.tanismaDonumEtiketi(oturum.state);
    if (donum) etiketEkle(oturum.state, [donum.etiket]);
    if (donum?.zorla) zorlananId = "iliski_tanisma_firsati";
  }
  // Rütbe 4'e (5 kademeli merdivende "başarılı kariyer" eşiği) ulaşan bir
  // karaktere, şansa bırakmadan bir kez şehir yönetimi arenasına giriş teklifi
  // zorla sunulur — yoksa 360+ olayın arasında yıllarca gizli kalabilir.
  if (!zorlananId && !milestoneKilitli && oturum.state.rutbe_seviye >= 4 && !oturum.state.etiketler.includes("sehir_yonetimi_basladi")) {
    const baslangicId =
      oturum.state.meslek === "Tüccar"
        ? "sehir_yonetim_tuccar_baslangic"
        : oturum.state.meslek === "Din Adamı"
          ? "sehir_yonetim_dinadami_baslangic"
          : oturum.state.meslek === "Asker"
            ? "sehir_yonetim_asker_baslangic"
            : oturum.state.meslek === "Zanaatkâr"
              ? "sehir_yonetim_zanaatkar_baslangic"
              : undefined;
    if (baslangicId && !oturum.state.gecmis_olaylar.includes(baslangicId)) {
      zorlananId = baslangicId;
    }
  }
  // Evcil hayvan karşılaşma garantisi: rastgele denk gelmediyse 29 ve 38 yaşında zorlanır.
  if (!zorlananId && !milestoneKilitli) {
    const karsilasma = hayvanKarsilasmaGarantisiSec(oturum.state);
    if (karsilasma) zorlananId = karsilasma;
  }
  // Ün ve ahlak belli bir eşiğin üstündeyse kral karakteri saraya çağırır;
  // bu, rüşvet/saygınlık denemesinin (saray_girme_denemesi) yanında saraya
  // girmenin garantili, şansa bağlı olmayan ikinci bir yolu.
  if (
    !zorlananId &&
    !milestoneKilitli &&
    !oturum.state.etiketler.includes("sarayda") &&
    oturum.state.un >= 70 &&
    oturum.state.ahlak >= 70 &&
    !oturum.state.gecmis_olaylar.includes("saray_kral_daveti")
  ) {
    zorlananId = "saray_kral_daveti";
  }
  // Her karakter hayatında en az bir kez, mesleğine/çağına/bölgesine/dinine uygun
  // bir "büyük yolculuk"a (Haçlı Seferi, Hac, Coğrafi Keşif, Mucit Turnesi, Sömürge
  // Seferi, Kutsal Toprakları Savunma Seferi) zorlanır. Reddedilirse teklif olayının
  // kendisi bir "durum" ekleyip birkaç yıl sonra (bitince_etiket: yolculuk_teklifi_zamani)
  // tekrar sorulmasını sağlar; bir yolculuk tamamlanınca (yolculuk_tamamlandi etiketi)
  // garanti kalıcı olarak kapanır — ikinci bir yolculuk asla zorlanmaz.
  if (
    !zorlananId &&
    !milestoneKilitli &&
    oturum.state.yas >= 30 &&
    // 30-34 penceresi; hapis/veba/kaçak kilidi yüzünden HİÇ teklif edilemediyse pencere 40'a uzar.
    oturum.state.yas <= (oturum.state.etiketler.includes("yolculuk_teklifi_edildi") ? 34 : 40) &&
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
  // Evcil hayvan / gizemli eşya / hizip / saray takip garantileri (kümülatif,
  // 2026-09'da genişletildi) — büyük yolculuk garantisinin (yukarıdaki kural)
  // HEMEN ardına taşındı: dördü de artık geniş, ömür-boyu yaş pencereleri
  // kullandığı için yolculuktan ÖNCE durmaları, yol:<dal> takip garantisinde
  // olduğu gibi yolculuk teklifinin hiç sıraya girememesine yol açabilirdi
  // (bkz. yolculuk.test.ts). "Saray daveti" (un/ahlak eşiği, tek seferlik
  // narrow koşul) buna dahil değil — yolculuktan önceki yerinde kaldı.
  //
  // Evcil hayvan devam garantisi (hayvan başına, kümülatif): o türe özel havuzdan.
  if (!zorlananId && !milestoneKilitli && oturum.state.evcil_hayvanlar.length > 0) {
    const devam = hayvanDevamGarantisiSec(oturum.state);
    if (devam) zorlananId = devam;
  }
  // Gizemli eşya takip garantisi (kümülatif): her eşyanın kendi havuzu
  // sadece 2 olay taşır — hedef 1 (en az birini garanti et, ikincisi şansa
  // kalsın ki gerçekten "gizemli" kalabilsin).
  if (!zorlananId && !milestoneKilitli) {
    const sahipOlunanEsyalar = oturum.state.etiketler
      .filter((e) => e.startsWith("esya:") || e.startsWith("envanter:"))
      .map((e) => e.slice(e.indexOf(":") + 1));
    for (const esyaId of sahipOlunanEsyalar) {
      const havuz = GIZEMLI_ESYA_TAKIP_HAVUZU[esyaId];
      if (!havuz || havuz.length === 0) continue;
      const secilen = kumulatifTakipSec(GIZEMLI_ESYA_TAKIP_KONTROL_NOKTALARI, oturum.state.yas, havuz, havuz, oturum.state.gecmis_olaylar);
      if (secilen) {
        zorlananId = secilen;
        break;
      }
    }
  }
  // Hizip takip garantisi (kümülatif): her hizbin kendi havuzu ~10 olay
  // (9 hizbe özel + 1 meslek-çatışma genel).
  if (!zorlananId && !milestoneKilitli && oturum.state.hizip !== null) {
    const hizipEtiketi = `hizip:${oturum.state.hizip}`;
    const hizipOlaylari = OLAY_BANKASI.filter(
      (o) =>
        (o.gerekliHizip && (!o.meslekler || o.meslekler.includes(oturum.state.meslek))) ||
        o.gerekliEtiketler?.includes(hizipEtiketi)
    ).map((o) => o.id);
    const secilen = kumulatifTakipSec(HIZIP_TAKIP_KONTROL_NOKTALARI, oturum.state.yas, hizipOlaylari, hizipOlaylari, oturum.state.gecmis_olaylar);
    if (secilen) zorlananId = secilen;
  }
  // Saray takip garantisi (kümülatif): sabit 6 olaylık küçük havuz — hepsini
  // tüketmeden çeşitlilik payı bırakmak için hedef en fazla 3'e çıkar.
  if (!zorlananId && !milestoneKilitli && oturum.state.etiketler.includes("sarayda")) {
    const secilen = kumulatifTakipSec(
      SARAY_TAKIP_KONTROL_NOKTALARI,
      oturum.state.yas,
      SARAY_OLAY_IDLERI,
      SARAY_OLAY_IDLERI,
      oturum.state.gecmis_olaylar
    );
    if (secilen) zorlananId = secilen;
  }
  // Yol dalı takip garantisi (2026-09, kümülatif kontrol noktaları): bir
  // "yol:<meslek>:<dal>" etiketine kilitlenmiş karakter, hayatı boyunca o
  // dala özel havuzdan belirli yaşlara kadar en az N olay görmüş olmalı —
  // N ve yaş eşikleri sisteme göre değişir (`YOL_TAKIP_KONTROL_NOKTALARI`):
  // büyük/eski havuzlar (Orta Çağ Asker/Din Adamı, dal başına ~20 olay) daha
  // yüksek bir hedefe kademeli kilitlenir, küçük/yeni havuzlar (dal başına
  // 11 olay) daha düşük bir hedefe — havuz tükenmesin, ama karakter kendi
  // seçtiği yolun hikayesini gerçekten hissetsin. Orta Çağ Asker/Din
  // Adamı'nın giriş olayı ayrıca `zorunlu_sonraki` ile bağımsız bir dal-özel
  // olayı daha garantiliyor (bu kuralın dışında, ekstra).
  // Yolculuk teklifinin (yukarıdaki kural) HEMEN ardına taşındı — ikisi de
  // "ömürde bir kez / geniş yaş penceresi" garantisi ama yolculuk teklifi
  // önceliklidir; aksi halde bir yol:<dal> etiketi taşıyan karakterde
  // yolculuk teklifi hiç sıraya giremiyordu (bkz. yolculuk.test.ts).
  if (!zorlananId && !milestoneKilitli) {
    const sistemAnahtari = `${oturum.state.cag}|${oturum.state.meslek}`;
    const kontrolNoktalari = YOL_TAKIP_KONTROL_NOKTALARI[sistemAnahtari];
    const yolTag = oturum.state.etiketler.find((e) => e.startsWith("yol:"));
    if (kontrolNoktalari && yolTag) {
      const suAnkiHedef = kontrolNoktalari.reduce(
        (maks, nokta) => (oturum.state.yas >= nokta.yas ? Math.max(maks, nokta.hedef) : maks),
        0
      );
      if (suAnkiHedef > 0) {
        // NOT: bazı dal isimleri (durust/fanatik/yozlasmis Din Adamı'nda,
        // sadik/firari Asker'de, hayirsever Tüccar'da) Orta Çağ ve Sanayi
        // Devrimi sistemleri arasında paylaşılır — `cag` filtresi olmadan
        // yanlış çağdan bir olay zorlanabilirdi.
        const tumDalOlaylari = OLAY_BANKASI.filter((o) => o.gerekliEtiketler?.includes(yolTag) && o.cag === oturum.state.cag);
        const tumDalHavuzu = tumDalOlaylari.map((o) => o.id);
        const yasaUygunHavuz = tumDalOlaylari
          .filter((o) => (o.minYas === undefined || oturum.state.yas >= o.minYas) && (o.maxYas === undefined || oturum.state.yas <= o.maxYas))
          .map((o) => o.id);
        const secilen = kumulatifTakipSec([{ yas: 0, hedef: suAnkiHedef }], oturum.state.yas, tumDalHavuzu, yasaUygunHavuz, oturum.state.gecmis_olaylar);
        if (secilen) zorlananId = secilen;
      }
    }
  }
  // Her karakter hayatında en az bir "gizemli" (esrarengiz eşya/olay) anıyla
  // karşılaşsın diye: 25-45 yaş aralığında, hiç gizemli:true olay görmemişse
  // ve o an uygun (çağ/bölge/meslek/etiket filtrelerinden geçen) en az bir
  // gizemli olay varsa, zorla tetiklenir. Havuz küçükse (çoğu takip olayı belirli
  // bir eşyaya sahip olmayı gerektirir) bu kural sıklıkla giriş olaylarından
  // birini (gizem_ejderha_tilsimi, derinlik_hazine_haritasi vb.) seçer.
  if (!zorlananId && !milestoneKilitli && oturum.state.yas >= 29 && oturum.state.yas <= 35) {
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
  // havuzu var (mulkOlaylari.ts) — normal rastgele havuzdan tamamen dışlanır.
  // Satın alımdan 5-8 yıl sonra (mulk_alis_yili) o türden TEK bir olay zorlanır;
  // o türden bir olay bir kez görüldüyse bir daha çıkmaz. Satın alma yılı
  // bilinmeyen (eski kayıt) mülklerde olay çıkmaz.
  if (!zorlananId && !milestoneKilitli && oturum.state.mulkler.length > 0) {
    for (const tur of oturum.state.mulkler) {
      const alisYili = oturum.state.mulk_alis_yili?.[tur];
      if (typeof alisYili !== "number") continue;
      const gecenYil = oturum.state.yil - alisYili;
      if (gecenYil < MULK_OLAYI_PENCERE_BASLANGIC_YIL || gecenYil > MULK_OLAYI_PENCERE_BITIS_YIL) continue;
      const turOlaylari = OLAY_BANKASI.filter((o) => o.mulkOlayi === tur);
      if (turOlaylari.some((o) => oturum.state.gecmis_olaylar.includes(o.id))) continue;
      if (turOlaylari.length > 0) {
        zorlananId = turOlaylari[Math.floor(Math.random() * turOlaylari.length)].id;
        break;
      }
    }
  }
  // Standalone havuz garantisi (§11 yeni kural, 2026-09): hiçbir kilide/garantiye
  // bağlı olmayan genel havuzların (genel.ts + meslek-standalone 6 dosya +
  // iliskiler/aile/evlilikVeAile/komikGaripOlaylar/komikOlumler) her biri, yaşa
  // göre kümülatif olarak en az N farklı olay görülmüş olmasını garanti eder —
  // aksi halde biri (o an gerçekten uygunsa) zorla tetiklenir. Kaskadın en
  // sonuna bilinçli olarak konuldu: ömürde-bir-kez/dar-koşullu tüm garantiler
  // (savaş ilanı, kariyer yolu, evlilik, şehir yönetimi, evcil hayvan, saray,
  // yolculuk, takip garantileri, gizemli, mülk) her zaman önceliklidir; bu
  // yalnızca onların hiçbiri eşleşmediği "sakin" turları doldurur. Aday
  // havuzların TAMAMI taranır ve oransal olarak EN GERİDE kalan (hedefine göre
  // en fazla eksiği olan) havuzdan zorlanır — sabit sıralı tarama (genel.ts
  // hep önce) küçük hedefli havuzları (iliskiler/aile/komikGarip vb.) açlıktan
  // öldürüyordu, bkz. `standaloneHavuzDurumu` yorumu.
  if (!zorlananId && !milestoneKilitli) {
    const meslekHavuzu = MESLEK_STANDALONE_HAVUZLARI[`${oturum.state.cag}|${oturum.state.meslek}`];
    const adaylar = meslekHavuzu
      ? [{ havuz: meslekHavuzu, kontrolNoktalari: MESLEK_STANDALONE_KONTROL_NOKTALARI }, ...STANDALONE_HAVUZ_GARANTILERI]
      : STANDALONE_HAVUZ_GARANTILERI;
    let enGeride: { adaylar: string[]; gerideKalmaOrani: number } | null = null;
    for (const tanim of adaylar) {
      const durum = standaloneHavuzDurumu(tanim, oturum.state);
      if (durum && (!enGeride || durum.gerideKalmaOrani > enGeride.gerideKalmaOrani)) {
        enGeride = durum;
      }
    }
    if (enGeride) zorlananId = enGeride.adaylar[Math.floor(Math.random() * enGeride.adaylar.length)];
  }

  const { olay, senaryo } = olaySec(oturum.state, zorlananId, oturum.sonTon);
  oturum.mevcutSenaryo = senaryo;
  oturum.mevcutOlay = olay;
  oturum.zorlananOlayId = null;
  oturum.sonTon = olay.ton ?? null;
  // "ilerle" modu: ana akış olayı üretildi → iki olay arası yıl sayacı baştan başlar
  // (Sosyalleş mekân olayı oyuncunun kendi seçimidir, sayacı sıfırlamaz).
  if (oturum.state.zaman_modeli === "ilerle" && !olay.sosyallesmeYeri) oturum.state.yil_sayaci = 0;
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
  // Yeni senaryo her zaman kaydedilir (yalnız etiket değişince değil): sunucu
  // yeniden başlarsa oyuncunun ekranındaki olay `oturum_akisi`ndan geri kurulur.
  void etiketDegisti;
  await oturumKaydet(oturum.state);
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
  /** Rakibin "parayı alıp kaçtığı" soygun (nakit ≥ 150 iken düşük ihtimalli; mutlak değer). */
  rakipSoygun: number;
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

type SonucDali = "basarili" | "basarisiz" | "geriCekil" | "devam";

/**
 * Bir olay sonucunun mesajını iki dilde üretir — ölüm nedeni liderlik tablosunda
 * her iki dilde gösterilebilsin diye. Oyuncunun kendi dilindeki hâl, ona zaten
 * gösterilen metnin aynısıdır (`gosterilen`); öbür dil ham olaydan yeniden doldurulur.
 */
function olaySonucMesajiIkiDil(
  state: CharacterState,
  olayId: string,
  hamIndex: number,
  dal: SonucDali,
  gosterilen: string
): IkiDilMetin {
  const ham = OLAY_BANKASI.find((o) => o.id === olayId);
  const mesajBul = (o: OlayTanimi | undefined): string | undefined => {
    const sec = o?.secenekler[hamIndex];
    if (!sec) return undefined;
    const e =
      dal === "basarili"
        ? sec.basariliSonuc
        : dal === "basarisiz"
          ? sec.basarisizSonuc
          : dal === "geriCekil"
            ? sec.onTepki?.geriCekilSonucu
            : sec.onTepki?.devamSonucu;
    return e?.mesaj;
  };
  const trHam = mesajBul(ham);
  const enHam = ham ? mesajBul(olayCevirisiUygula(ham, "en")) : undefined;
  return {
    tr: state.dil === "en" ? (trHam ? doldur(trHam, { ...state, dil: "tr" }, ham?.hayvanTuru) : gosterilen) : gosterilen,
    en: state.dil === "en" ? gosterilen : enHam ? doldur(enHam, { ...state, dil: "en" }, ham?.hayvanTuru) : gosterilen,
  };
}

/** Seçimi uygular. */
export async function secimUygula(id: string, secenekIndex: number): Promise<SecimSonucu | TepkiSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!state.meslek) throw new Error("Önce bir meslek seçmelisin.");
  if (ogretiBekliyorMu(state)) throw new Error("Önce öğretini seçmelisin.");
  if (urunSecimiBekliyorMu(state)) throw new Error("Önce başlangıç ürününü seçmelisin.");

  // Bir önceki çağrıda onTepki'li bir seçenek seçilmişse, bu çağrı zar atmadan
  // doğrudan geri çekil (0) / ısrar et (1) sonucunu uygular; zaman burada ilerler.
  if (oturum.bekleyenTepki) {
    if (secenekIndex !== 0 && secenekIndex !== 1) throw new Error("Geçersiz seçenek index'i.");
    const { onTepki, mevcutOlay, eskiRutbeSeviye } = oturum.bekleyenTepki;
    oturum.bekleyenTepki = null;
    const etki = jitterUygula(secenekIndex === 0 ? onTepki.geriCekilSonucu : onTepki.devamSonucu);
    etki.mesaj = doldur(etki.mesaj, state, mevcutOlay.hayvanTuru);
    if (etki.detay) etki.detay = doldur(etki.detay, state, mevcutOlay.hayvanTuru);
    const tepkiHamIndex = mevcutOlay.secenekler.findIndex((s) => s.onTepki === onTepki);
    const tepkiCeviri = olaySonucMesajiIkiDil(state, mevcutOlay.id, tepkiHamIndex, secenekIndex === 0 ? "geriCekil" : "devam", etki.mesaj);
    // Burada zar yok; "basarili" bayrağı sonuç ekranındaki görsel/ses efektinin doğru
    // (kutlama ya da düşüş) yönde çalması için etkinin net iyi/kötü olduğuna bakılarak belirlenir.
    return sonucuUygulaVeIlerlet(oturum, mevcutOlay, etki, netEtkiOlumluMu(etki), eskiRutbeSeviye, false, tepkiCeviri);
  }

  // Oyuncu bir mekân olayını (Sosyalleş) yanıtlamadan "Geri Dön" ile ana ekrana
  // dönmüş olabilir — bu durumda oturum.mevcutOlay hâlâ o (terk edilmiş) mekân
  // olayıdır, ama istemci ekranında hâlâ kenara ayrılmış (sakliOlay) asıl ana
  // oyun olayı görünür. Normal /choice bu terk edilmiş mekân olayına
  // uygulanmamalı — sakliOlay varsa önce o geri yüklenir.
  if (oturum.mevcutOlay?.sosyallesmeYeri && oturum.sakliOlay) {
    oturum.mevcutOlay = oturum.sakliOlay.olay;
    oturum.mevcutSenaryo = oturum.sakliOlay.senaryo;
    oturum.sakliOlay = null;
  }

  const { mevcutSenaryo, mevcutOlay } = oturum;
  if (!mevcutSenaryo || !mevcutOlay) throw new Error("Önce bir senaryo üretilmeli.");

  const secenek = mevcutSenaryo.secenekler[secenekIndex];
  const hamSecenek = secenek ? mevcutOlay.secenekler[secenek.ham_index ?? secenekIndex] : undefined;
  if (!secenek || !hamSecenek) throw new Error("Geçersiz seçenek index'i.");
  if (secenek.kilitli) throw new Error(secenek.kilit_nedeni ?? "Bu seçenek şu an seçilemez.");

  if (hamSecenek.onTepki) {
    oturum.bekleyenTepki = { onTepki: hamSecenek.onTepki, mevcutOlay, eskiRutbeSeviye: state.rutbe_seviye };
    const tepki: TepkiSonucu = {
      ara_tepki: true,
      olay_basligi: T(state.dil, "Bir An Duraksadın"),
      olay_metni: doldur(hamSecenek.onTepki.metin, state),
      secenekler: [
        { metin: doldur(hamSecenek.onTepki.geriCekilMetni, state) },
        { metin: doldur(hamSecenek.onTepki.devamMetni, state) },
      ],
    };
    // Ara-ekran da kalıcı olsun: sunucu yeniden başlarsa ikinci tıklama kaybolmasın.
    await oturumKaydet(state);
    return tepki;
  }

  const eskiRutbeSeviye = state.rutbe_seviye;
  const basarili = rollSuccess(secenek.basari_sansi);
  // "Korkusuz" / "Ölümle Dans" amaçları: başarısız dalı ölüm ya da olum_sansi ≥ 25 olan
  // (yani gerçekten ölümcül) bir seçimi başarıyla atlattıysan ömürlük sayaç +1.
  const basarisizDal = hamSecenek.basarisizSonuc ?? {};
  if (
    basarili &&
    (basarisizDal.olum === true || (basarisizDal.olum_sansi ?? 0) >= RISKLI_OLUM_SANSI_ESIK)
  ) {
    state.omur_riskli_basari = (state.omur_riskli_basari ?? 0) + 1;
  }
  const etki = jitterUygula(basarili ? secenek.basarili_sonuc : secenek.basarisiz_sonuc);
  // {dost}/{rakip}/{es}/{cocuk}/{ekip} yer tutucuları sonuç mesajlarında da kullanılabilsin diye
  // (olay/seçenek metninde olduğu gibi) burada da dolduruluyor.
  etki.mesaj = doldur(etki.mesaj, state, oturum.mevcutOlay?.hayvanTuru);
  if (etki.detay) etki.detay = doldur(etki.detay, state, oturum.mevcutOlay?.hayvanTuru);
  // Faz 5 skor bonusu: komikOlumler.ts'in riskli ("aptalca olanı yap") şıkkı seçildi mi?
  // (havuz + başarısız dalın ölümcül olma potansiyeli ile tanınır, hangi dal çıktığından bağımsız).
  const komikOlumRiskliSecenekMi =
    KOMIK_OLUM_ID_SETI.has(mevcutOlay.id) &&
    (basarisizDal.olum === true || (basarisizDal.olum_sansi ?? 0) > 0);
  const mesajCeviri = olaySonucMesajiIkiDil(
    state,
    mevcutOlay.id,
    secenek.ham_index ?? secenekIndex,
    basarili ? "basarili" : "basarisiz",
    etki.mesaj
  );
  // Polis (aranma olayları) kefaret istedi ve ödemeyi seçmedin → aranma +6…9 (Aranma II).
  if (kefaretTalebiMi(mevcutOlay) && !(hamSecenek.maliyet && hamSecenek.maliyet > 0)) {
    etki.suc_artis = (etki.suc_artis ?? 0) + aralikTamSayi(KEFARET_RED_ARANMA_MIN, KEFARET_RED_ARANMA_MAX);
  }
  return sonucuUygulaVeIlerlet(oturum, mevcutOlay, etki, basarili, eskiRutbeSeviye, komikOlumRiskliSecenekMi, mesajCeviri);
}

/** İLERLE'nin sentetik "olayı": hiçbir seçenek/etki yok; yalnız yıl hattını bir yıl çalıştırır. */
const YIL_GEC_OLAYI: OlayTanimi = {
  id: "__yil_gec__",
  kategori: "sosyal",
  baslik: "",
  metin: "",
  secenekler: [],
};

/**
 * Telefon ana ekranının İLERLE düğmesi ("ilerle" zaman modeli): olay çıkarmadan tam 1 yıl geçirir.
 * Olay bekliyorsa (2 yıl dolmuş, zincir, yolculuk…) reddedilir — önce olay çözülür.
 * Yıl hattı (maaş/işletme kârı, yaşlanma, dünya dönemi, rakipler…) olay cevabıyla aynı koddan geçer.
 */
export async function yilGec(id: string): Promise<SecimSonucu & { olayBekliyor: boolean }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!state.meslek) throw new Error("Önce bir meslek seçmelisin.");
  if (state.zaman_modeli !== "ilerle") throw new Error("Bu oyun yıl geçirme modunda değil.");
  if (ogretiBekliyorMu(state)) throw new Error("Önce öğretini seçmelisin.");
  if (urunSecimiBekliyorMu(state)) throw new Error("Önce başlangıç ürününü seçmelisin.");
  if (olayBekliyorMu(oturum)) throw new Error("Önce bekleyen olayı çözmelisin.");

  state.yil_sayaci = (state.yil_sayaci ?? 0) + 1;
  const eskiRutbeSeviye = state.rutbe_seviye;
  const sonuc = await sonucuUygulaVeIlerlet(
    oturum,
    YIL_GEC_OLAYI,
    { mesaj: "" },
    true,
    eskiRutbeSeviye,
    false,
    undefined,
    1
  );
  return { ...sonuc, olayBekliyor: olayBekliyorMu(oturum) };
}

/** aranmaSeviyesi.ts olaylarından, kefaret ödeme şıkkı (maliyet + aranma düşüren) taşıyanlar = "polis kefaret istiyor". */
function kefaretTalebiMi(olay: OlayTanimi): boolean {
  return (
    olay.id.startsWith("aranma_") &&
    olay.secenekler.some((s) => (s.maliyet ?? 0) > 0 && (s.basariliSonuc.suc_artis ?? 0) < 0)
  );
}

/** Bir hayat bitince metrik + çapraz-hayat olay geçmişi yazılır (§32, §36). Ateşle-unut. */
async function olumMetrikleriniYaz(state: CharacterState): Promise<void> {
    const oturumSn = await oturumYasiSaniye(state.id);
    void metrikYaz({
      tur: "olum",
      oturum_id: state.id,
      cag: state.cag,
      bolge: state.bolge,
      yerlesim: state.yerlesim,
      meslek: state.meslek,
      yas: state.yas,
      tur_sayisi: state.tur_sayisi,
      servet: paraYuvarla(netServetHesapla(state)),
      skor: hesaplaSkor(state),
      olum_nedeni: state.olum_nedeni ?? "",
      oturum_sn: oturumSn,
    });
    // Bu hayatta görülen olayları istemcinin çapraz-hayat geçmişine yaz — bir
    // sonraki hayat aynı cihazdan başlatılınca bu olayları bir süre daha az
    // görsün (§12'deki tekrar-önleme penceresinin hayatlar arası uzantısı).
    void istemciGecmisiGuncelle(state.istemci_id, state.gecmis_olaylar);
}

/** Bir yıl-ilerletme adımının girdisi: olay turu (mevcutOlay dolu) ya da İLERLE (YIL_GEC_OLAYI). */
interface YilIlerletGirdi {
  oturum: Oturum;
  mevcutOlay: OlayTanimi | null;
  nakitAkisi: TurNakitAkisi;
  hapisteYeniGirildiBuTur: boolean;
  ayyasOlduBuTur: boolean;
  eskiRutbeSeviye: number;
  /** Bu adımda geçen yıl (0, 1 ...). */
  yilSayisi: number;
}

/**
 * Zamanı ilerletir ve yıllık bloğun tamamını (ekonomi, yaşlanma, dünya dönemi, savaş/veba, aile, eş,
 * hayvan, kredi, rütbe ...) çalıştırır. `sonucuUygulaVeIlerlet` çağırır.
 */
function yilIlerlet(g: YilIlerletGirdi): { yasArtisi: number; zamanAnlatimi: string | null; terfiOldu: boolean } {
  const { oturum, mevcutOlay, nakitAkisi, hapisteYeniGirildiBuTur, ayyasOlduBuTur, eskiRutbeSeviye, yilSayisi } = g;
  const { state } = oturum;
  let yasArtisi = 0;
  let zamanAnlatimi: string | null = null;
  let hukumdarDegisimHaberi: string | null = null;
  if (state.aktif && yilSayisi > 0) {
    // Süre çağıran tarafından belirlenir (0 = bu çözümleme zaman geçirmez).
    const eskiHukumdar = state.hukumdar;
    yasArtisi = ilerletYas(state, yilSayisi, yilSayisi);
    // Pasif kıdem: hayatta geçen her yıl kariyer puanını biraz büyütür (yatırım yapmayan
    // bir karakter de zamanla rütbe atlar; yatırım sadece bunu hızlandırır). Mesleğe
    // yatkınlık kademesinin "tecrübe hızı" bonusu/malusu buna da biner.
    // (100 yaş tavanı ilerletYas içinde ölüme yol açmış olabilir: ölüden sonra hiçbir yıl
    // etkisi uygulanmaz — para/sağlık/kariyer ölüm anından sonra oynamasın.)
    if (state.aktif) {
      state.kariyer_puani += KARIYER_PUANI_YILLIK * yasArtisi * (1 + (state.meslek_tecrube_hizi ?? 0));
    }
    if (eskiHukumdar && state.hukumdar && state.hukumdar !== eskiHukumdar) {
      const haber = hukumdarDegisimHaberiUret(
        Khukumdar(state.dil, eskiHukumdar),
        Khukumdar(state.dil, state.hukumdar),
        state.dil
      );
      hukumdarDegisimHaberi = haber;
      hayatOlayiEkle(state, "👑", T(state.dil, "Hükümdar değişti: {0}", [Khukumdar(state.dil, state.hukumdar)]));
    }
    const durumOlumMesaji = state.aktif ? durumlariUygula(state, yasArtisi) : null;
    if (durumOlumMesaji) {
      checkDeath(state, true, durumOlumMesaji);
    }
    if (state.aktif) {
      const ekonomi = pasifEkonomiUygula(state, yasArtisi);
      nakitAkisi.maasBrut = paraYuvarla(ekonomi.yillikGelirler.reduce((a, b) => a + b, 0));
      nakitAkisi.giderYasam = ekonomi.giderKalemleri.yasam * yasArtisi;
      nakitAkisi.giderKonut = ekonomi.giderKalemleri.konut * yasArtisi;
      nakitAkisi.giderEkip = ekonomi.giderKalemleri.ekip * yasArtisi;
      nakitAkisi.giderEvcil = ekonomi.giderKalemleri.evcilHayvan * yasArtisi;
      nakitAkisi.savasVergisi = ekonomi.giderKalemleri.savasVergisi * yasArtisi;
      nakitAkisi.faiz = ekonomi.faiz;
      checkDeath(state, false); // borç stresiyle sağlık 0'a inmiş olabilir
      yilSonuBlogu: if (state.aktif) {
        yaslanmaUygula(state, yasArtisi);
        if (state.saglik <= 0) {
          checkDeath(state, true, ikiDilT("İleri yaşın getirdiği yorgunlukla huzur içinde vefat etti."));
        }
        if (state.aktif) {
          capraletkiUygula(state, yasArtisi);
          if (state.saglik <= 0) {
            checkDeath(state, true, ikiDilT("Uzun süredir çöken ruh hali bedenini de tüketti."));
          }
        }
        if (state.aktif) {
          // Tekrar eden durum cümleleri ("savaş sürüyordu", "salgın sürüyordu"...) artık yazılmaz:
          // sol panelde ve göstergelerde zaten görünüyor. Yalnız önemli haberler zamanAnlatimi'ne eklenir.
          // Hapis cezası: her turda geçen yıl kadar erir; dolduğunda karakter
          // kendiliğinden serbest kalır (bir kaçış/af olayı beklemek zorunda değil).
          // Tutuklanmanın olduğu turda erimeyi atla (hapisteYeniGirildiBuTur) —
          // aksi halde kısa bir ceza, tutuklandığı turun yasArtisi'yle aynı anda
          // sıfırlanıp hiç hissedilmeden bitebilir.
          if (state.etiketler.includes("hapiste") && !hapisteYeniGirildiBuTur) {
            // "Az olay var" turu Faz 8: yalnız gerçek bir hapisOlayi:true olayı
            // çözüldüğünde sayaç artar — tutuklanma anının kendisi (hapisOlayi
            // değil, normal havuzdan gelir) bunu tüketmez.
            if (mevcutOlay?.hapisOlayi) state.hapis_tur_sayaci += 1;
            state.hapis_ceza_kalan -= yasArtisi;
            if (state.hapis_ceza_kalan <= 0) {
              state.hapis_ceza_kalan = 0;
              state.hapis_ceza_toplam = 0;
              etiketSil(state, ["hapiste"]);
              // Ceza çekildi: sicil büyük ölçüde silinir (aranma tahliyede en fazla HAPIS_TAHLIYE_ARANMA).
              state.suc_seviyesi = Math.min(state.suc_seviyesi, HAPIS_TAHLIYE_ARANMA);
              hayatOlayiEkle(state, "⛓️", T(state.dil, "Cezasını tamamlayıp serbest kaldı"));
              const cikisMesaji = T(state.dil, "⛓️ Cezan doldu; kapılar açıldı ve özgür bir insan olarak dışarı çıktın.");
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${cikisMesaji}` : cikisMesaji;
            }
          }
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
          // Dünya dönemi (bolluk/durgunluk/kıtlık): geçen yılları işler, süresi dolan
          // dönemi değiştirir, kıtlık yıllarında sağlık düşer (ölüm kontrolü aşağıda).
          donemIlerlet(state, yasArtisi); // mesajları yazılmaz: dönem sol paneldeki dünya etkilerinde görünür
          orduBuyumesiDene(state, yasArtisi);
          krizEtkisiUygula(state, yasArtisi);
          if (state.saglik <= 0) {
            checkDeath(state, true, ikiDilT("Kıtlığın getirdiği yoksunlukla tükendi."));
          }
          // Kıtlık bu turun içinde öldürdüyse kalan yıl-sonu adımları (mülk geliri, kredi el
          // koyma, bağış, doğum, savaş/veba...) ÖLÜ karakter üzerinde çalışmasın: servet/skor
          // ölüm anından sonra oynanmasın.
          if (!state.aktif) break yilSonuBlogu;
          const mulkSonucu = mulkGelirleriUygula(state, yasArtisi);
          if (mulkSonucu.kervanBatti) {
            const kervanMesaji = T(state.dil, "🌊 Ticaret kervanın savaşın kaosunda kayboldu; yatırımından geriye bir şey kalmadı.");
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${kervanMesaji}` : kervanMesaji;
          }
          nakitAkisi.mulkNet = mulkSonucu.toplamNet;
          nakitAkisi.bilgiMulkBakim = mulkSonucu.bakimOdemeleri.reduce((a, b) => a + b.miktar, 0);
          sucSeviyesiUygula(state, yasArtisi);
          aranmaYillikIsle(state, hapisCezaSuresiHesapla);
          ekipSadakatYillikUygula(state, yasArtisi);
          // Aile ekranı: eş/çocuk ilişkisi soğuması + düşük ilişki moral cezası +
          // bekleyen para talebinin süresi dolması / yeni talep üretimi (§33).
          const aileMesaji = aileYillikUygula(state, yasArtisi);
          if (aileMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${aileMesaji}` : aileMesaji;
          }
          // Evcil hayvan: pasif şöhret bonusu + ömrünü dolduran hayvanın doğal ölümü.
          const hayvanMesaji = evcilHayvanYillikUygula(state, yasArtisi);
          if (hayvanMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${hayvanMesaji}` : hayvanMesaji;
          }
          // Eşin yıllık mantığı (gizli düşüş, ihmal, terk, yaşlılık ölümü, yas) + yeni doğum kuralları.
          for (const esMesaji of AS.esYillikUygula(state, yasArtisi)) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${esMesaji}` : esMesaji;
          }
          for (const sevgiliMesaji of AK.sevgiliYillikUygula(state, yasArtisi)) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${sevgiliMesaji}` : sevgiliMesaji;
          }
          const dogumMesaji = AS.dogumDenemesi(state, yasArtisi);
          if (dogumMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${dogumMesaji}` : dogumMesaji;
          }
          // 15 yaşına gelen çocuğa yanında çalışma daveti hakkı; ölen çocuk ekipten düşer.
          for (const cocukMesaji of AS.cocukIsYillikUygula(state)) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${cocukMesaji}` : cocukMesaji;
          }
          // Kariyer sayfası: yönetimle bağların soğuması + dayatılan talep (§35).
          const yonetimMesaji = yonetimYillikUygula(state, yasArtisi);
          if (yonetimMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${yonetimMesaji}` : yonetimMesaji;
          }
          const envanterSonucu = envanterBozulmasiUygula(state, yasArtisi);
          nakitAkisi.envanterBakim = envanterSonucu.bakimOdemeleri.reduce((a, b) => a + b.miktar, 0);

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

          // Rakip soygunu: üzerinde çok nakitle dolaşırken düşük ihtimalle isimli
          // rakip parayı alıp kaçar (zenginlik sızıntısından ayrı ve daha nadir/sert).
          const rakipSoygunSonucu = rakipSoygunKontrolEt(state, yasArtisi);
          if (rakipSoygunSonucu) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${rakipSoygunSonucu.mesaj}` : rakipSoygunSonucu.mesaj;
            hayatOlayiEkle(state, "🗡️", T(state.dil, "Rakip parayı alıp kaçtı: -{0} {birim}", [rakipSoygunSonucu.miktar]).replace(/\{birim\}/g, state.para_birimi));
            nakitAkisi.rakipSoygun = rakipSoygunSonucu.miktar;
          }

          // Derin rakip ilişkileri: rakiplerin gücü yavaşça büyür; husumeti
          // yüksek bir rakip düşük ihtimalle misilleme yapar (§13).
          rakiplerGuncelle(state, yasArtisi);
          // Meslek pazarı: pasif güç, pazar payına bağlı kariyer puanı, yeni rakip girişi.
          const pazarMesaji = pazarYillikUygula(state, yasArtisi);
          if (pazarMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${pazarMesaji}` : pazarMesaji;
          }
          // Ajanlara verilmiş karanlık işler bu yıl dönerken çözülür (§43 Faz 2).
          for (const ajanMesaji of ajanGorevleriniCoz(state)) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${ajanMesaji}` : ajanMesaji;
          }
          const rakipMisillemeSonucu = rakipMisillemesiDene(state, yasArtisi);
          if (rakipMisillemeSonucu) {
            zamanAnlatimi = zamanAnlatimi
              ? `${zamanAnlatimi} ${rakipMisillemeSonucu.mesaj}`
              : rakipMisillemeSonucu.mesaj;
          }

          // Tefeci kredisi: yıllık taksit nakitten otomatik erir; üst üste
          // ödenemezse tefeci önce uyarır, sonra servete/mülke el koyar.
          const krediSonucu = krediYillikUygula(state, yasArtisi);
          if (krediSonucu) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${krediSonucu}` : krediSonucu;
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
          // Vebayı bizzat kapmış karakter için her tur BİR ölüm/iyileşme zarı.
          // Bu turda YENİ bulaştıysa atlanır — önce bir vebaHastasiOlayi seçip
          // hayatta kalma şansını yükseltme fırsatı olsun.
          if (state.aktif && !vebaSonucu.hastalandi) {
            const hastalikSonucu = vebaHastaligiKontrol(state);
            for (const hm of hastalikSonucu.mesajlar) {
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${hm}` : hm;
            }
            if (hastalikSonucu.karakterOldu) {
              checkDeath(state, true, ikiDilT("Vebadan öldün; hastalık seni yendi."));
            } else if (hastalikSonucu.iyilesti && !state.veba_hayatta_kaldi) {
              // Faz 5 skor bonusu: bizzat vebayı kapıp atlatmak bir kereliğine ödüllendirilir.
              state.veba_hayatta_kaldi = true;
            }
          }
          if (state.aktif) {
            const vebaBitisMesaji = vebaBitisKontrolEt(state);
            if (vebaBitisMesaji) {
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${vebaBitisMesaji}` : vebaBitisMesaji;
              hayatOlayiEkle(state, "🕊️", T(state.dil, "Veba sona erdi"));
            }
          }

        }
      } else {
        state.olum_nedeni_ceviri = ikiDilT("Borç ve yoksulluk içinde tükendi.");
        state.olum_nedeni = state.dil === "en" ? state.olum_nedeni_ceviri.en : state.olum_nedeni_ceviri.tr;
      }
    }
  }

  let terfiOldu = false;
  if (state.aktif) {
    if (yasArtisi > 0) gecmisKaydet(state); // yıl geçmeyen olay cevabı grafiğe yinelenen nokta eklemesin
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
    hayatAmaciKontrolEt(state); // eski tekil amaç (yalnız test/eski kayıt)
    for (const a of amaclariHerhangiKontrol(state, netServetHesapla(state))) {
      const tanim = amacTanimiGetir(a.id);
      const ad = tanim ? tanim.baslik[state.dil === "en" ? "en" : "tr"] : a.id;
      hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını tamamladı: {0}", [ad]));
    }
    state.haberler = haberleriUret(state);
    if (hukumdarDegisimHaberi) {
      state.haberler = [hukumdarDegisimHaberi, ...state.haberler];
    }
  }

  return { yasArtisi, zamanAnlatimi, terfiOldu };
}

async function sonucuUygulaVeIlerlet(
  oturum: Oturum,
  mevcutOlay: OlayTanimi,
  etki: SonucEtkisi,
  basarili: boolean,
  eskiRutbeSeviye: number,
  komikOlumRiskliSecenekMi: boolean = false,
  /** Seçim mesajının iki dilli hâli — seçim öldürürse ölüm nedeni olarak saklanır. */
  mesajCeviri?: IkiDilMetin,
  /**
   * Bu çözümleme kaç yıl ilerletir? Verilmezse: klasik modda eski %60/%40 (yolculukta 1) kuralı;
   * "ilerle" modunda olay cevabı 0 yıl (yolculuk adımı 1), İLERLE ise 1 yıl verir.
   */
  yilSayisi?: number
): Promise<SecimSonucu> {
  const { state } = oturum;
  const yilHedefi: number | null =
    yilSayisi ?? (state.zaman_modeli === "ilerle" ? (mevcutOlay.yolculukOlayi ? 1 : 0) : null);
  // Nakit akışı defteri: turun sonunda Σ(alanlar) == state.para'daki net değişim olacak
  // şekilde kalem kalem doldurulur; digerNet artık kalan farkı kapatır.
  const paraGiris = state.para;
  const nakitAkisi: TurNakitAkisi = {
    olayGeliri: 0, olayGideri: 0, maasBrut: 0, giderYasam: 0, giderKonut: 0,
    giderEkip: 0, giderEvcil: 0, savasVergisi: 0, faiz: 0, mulkNet: 0,
    envanterBakim: 0, zorunluBagis: 0, zenginlikSizinti: 0, rakipSoygun: 0, digerNet: 0, bilgiMulkBakim: 0,
  };
  // Olay geliri primi: maaş dışı gelir kanalını hafifçe güçlendirir (her olay için ~%5.5).
  if (etki.para && etki.para > 0) {
    etki.para = paraYuvarla(etki.para * OLAY_PARA_PRIMI);
  }
  // Saldırı gücü / ticaret sermayesi / nüfuz, kendi kategorisindeki kazançları büyütür.
  if (etki.para && etki.para > 0) {
    etki.para = Math.round(etki.para * meslekMetrikCarpani(state, mevcutOlay.kategori));
    ciftKazancKirp(state, etki, mevcutOlay.kategori);
  }
  // Evcil hayvan pasif bonusları (mutluluk/sağlık kaybı hafifletme, ticaret primi).
  hayvanOlayEtkisiUygula(state, etki, mevcutOlay.kategori);
  // Yolculuk olaylarında kazanılan para %20 daha değerli (eski kalıcı "yolculuğu
  // bitirdin" maaş priminin yerini alır — meslek çarpanının üstüne biner).
  if (etki.para && etki.para > 0 && mevcutOlay.yolculukOlayi) {
    etki.para = Math.round(etki.para * YOLCULUK_KAZANC_CARPANI);
  }
  // Suç işleyerek para kazanma: para kazancını büyütür + suç/aranma seviyesini
  // hızla yükseltir (meslek çarpanının üstüne biner — suç + kendi mesleğin en hızlı
  // zenginlik yolu, ama en hızlı hapis/kaçak yolu da). Bkz. sucKazanciUygula.
  const sucKazanci = sucKazanciUygula(etki, basarili);
  if (sucKazanci === "gizli" && etki.suc_sinifi) gizliSucKaydet(state, etki.suc_sinifi, mevcutOlay.baslik);
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
      ayyasOlduBuTur = ayyasZiyaretiIsle(state);
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
  // v10: ticaret_sermaye_artis / nufuz_artis artık etkisiz (Tüccar/Din işletmesi bu sayaçları kullanmaz).
  if (etki.uretim_kapasitesi_artis) {
    state.uretim_kapasitesi = Math.min(100, Math.max(0, state.uretim_kapasitesi + etki.uretim_kapasitesi_artis));
  }
  metrikGucKatkisiUygula(state, etki);
  // Kariyer puanı: mesleğine uygun kategoride (savas/ticaret/din) başarılı olmak
  // seni rütbede ilerletir; kilit taşı olaylar ayrıca doğrudan puan verebilir.
  // Mesleğe yatkınlık kademesinin "tecrübe hızı" bonusu/malusu (±%7..±%15) bu
  // kazanca da biner (bkz. data/meslekYatkinlik.ts).
  if (basarili && MESLEK_KATEGORI[state.meslek] === mevcutOlay.kategori) {
    state.kariyer_puani += KARIYER_PUANI_KATEGORI_BASARI * (1 + (state.meslek_tecrube_hizi ?? 0)) * hayvanKariyerCarpani(state);
    // Meslek pazarı: mesleğinde başarılı her iş pazardaki gücünü artırır.
    musteriEkleTam(state, MUSTERI_KATEGORI_BASARI * (1 + (state.meslek_tecrube_hizi ?? 0)));
  }
  if (etki.kariyer_puani_artis) state.kariyer_puani += etki.kariyer_puani_artis;
  const sucOnce = state.suc_seviyesi;
  if (etki.suc_artis) state.suc_seviyesi += etki.suc_artis;
  if ((etki.suc_artis ?? 0) > 0) sucArtisiKaydet(state);
  // Tutuklanma anındaki GERÇEK suç seviyesi — hapis cezası bandı bundan hesaplanır
  // (aşağıda). `suc_seviyesi_ayarla` (ör. büyük baskının "teslim ol" dalının suçu
  // temize çekmesi) bu değeri EZMEDEN önce yakalanıyor; aksi halde aynı SonucEtkisi
  // içinde hem "hapiste" etiketi hem suc_seviyesi_ayarla:10 varsa (aranma_baskin_*
  // olaylarındaki gibi) ceza yanlışlıkla temiz banttan (2-4y) hesaplanıp azılı-suçlu
  // bir tutuklamayı bile kısa cezaya indirirdi.
  const sucSeviyesiTutuklanmaAni = state.suc_seviyesi;
  if (etki.suc_seviyesi_ayarla !== undefined) state.suc_seviyesi = etki.suc_seviyesi_ayarla;
  etki.suc_degisim = sucDegisimiHesapla(sucOnce, state.suc_seviyesi);
  if (etki.suc_degisim >= SUC_ES_ESIGI) AS.esBarDusur(state, SUC_ES_ZARARI); // ağır suç eşin güvenini sarsar
  etkenGunluguNotEt(state, mevcutOlay.baslik, etki);
  // Veba hastalığı ölüm riski: yalnız hastayken (veba_hastasi) anlamlı; olay
  // seçimi bu turdaki ölüm zarından ÖNCE uygulanır (vebaHastaligiKontrol).
  if (etki.veba_olum_riski_artis && state.etiketler.includes("veba_hastasi")) {
    state.veba_olum_riski = Math.max(0, Math.min(100, state.veba_olum_riski + etki.veba_olum_riski_artis));
  }
  if (etki.yeni_meslek) {
    state.meslek = etki.yeni_meslek;
    isletmeHazirla(state, isletmeBaglami(state));
  }
  if (etki.maas_carpani) {
    if (isletmeMeslegiMi(state.meslek)) {
      // İşletmede kalıcı maaş çarpanı talebe değil müşteriye yazılır: bir kerelik (çarpan−1)×%30 müşteri.
      musteriEkleTam(state, (etki.maas_carpani - 1) * 0.3 * (state.meslek_musteri ?? 0));
    } else {
      maasCarpaniUygula(state, etki.maas_carpani);
    }
  }
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
    // Olay kaynaklı evlilik (eski akış / ara olaylar): yeni eş modeline oturtulur —
    // oyuncu karakteri erkek, eş her zaman kadın isim havuzundan seçilir.
    const olayEsiAdi = rastgeleCinsiyetliIsimSec(state.cag, state.bolge, "kadin", [state.dost_adi, state.rakip_adi, state.isim ?? ""]);
    AS.esiOlaydanAta(state, olayEsiAdi);
    hayatOlayiEkle(state, "💍", T(state.dil, "{0} ile evlendi", [olayEsiAdi]));
  }
  if (etki.es_kaybet) {
    const kaybedilenEs = esiSifirla(state, "bosanma");
    if (kaybedilenEs) hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile yolları ayrıldı", [kaybedilenEs]));
  }
  if (state.es_adi) state.es_puani += etki.es_puani ?? 0;
  if (etki.es_ilgi_gosterildi && state.es_adi) state.es_son_zaman_yili = state.yil;
  if (etki.tanisma_baslat && AK.tanismaBaslatilabilirMi(state)) AK.tanismaBaslat(state, AK.tanismaMekanSec(state));
  if (etki.tanisma_vazgec && state.es_adi) AK.sadakatOdulu(state);

  if (etki.cocuk_ekle) {
    // Evlat edinme (yetim) dışındaki olay doğumları eşin 5 doğum / bekleme kurallarına tabidir;
    // ömür boyu toplam çocuk tavanı (8) her durumda geçerlidir.
    const evlatEdinme = mevcutOlay.id === "aile2_yetim_evlat_alma";
    for (let i = 0; i < etki.cocuk_ekle; i++) {
      if (!AS.eventCocukuIzinli(state, evlatEdinme)) break;
      const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
        state.dost_adi,
        state.rakip_adi,
        state.es_adi ?? "",
        state.isim ?? "",
        ...state.cocuklar.map((c) => c.isim),
      ]);
      state.cocuklar.push({ isim, dogum_yili: state.yil, yasiyor: true, iliski: 65, yatkinlik: AS.cocukYatkinligi() });
      AS.eventCocuguKaydet(state, state.yil, evlatEdinme);
      hayatOlayiEkle(state, "👶", T(state.dil, "{0} doğdu", [isim]));
    }
    state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
    if (state.cocuk_sayisi > 0) etiketEkle(state, ["cocuk_var"]);
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
  if (typeof etki.cocuk_iliski === "number" && etki.cocuk_iliski !== 0) {
    for (const c of state.cocuklar) {
      if (c.yasiyor && typeof c.iliski === "number") {
        c.iliski = Math.max(0, Math.min(100, c.iliski + etki.cocuk_iliski));
      }
    }
  }

  // İşletme/otorite etkileri (§45): vergi indirimi/zammı, şehir yöneticisi ilişkisi, doğrudan pazar payı (puan).
  if (etki.vergi_degisim) {
    state.vergi_carpan = etki.vergi_degisim.carpan;
    state.vergi_carpan_bitis_yili = state.yil + Math.max(1, etki.vergi_degisim.sureYil) - 1;
  }
  if (typeof etki.otorite_iliski === "number" && etki.otorite_iliski !== 0) {
    state.yonetim_iliski = Math.max(0, Math.min(100, state.yonetim_iliski + etki.otorite_iliski));
  }
  if (typeof etki.pazar_payi_artis === "number" && etki.pazar_payi_artis !== 0 && PAZAR_ADLARI_VAR(state)) {
    musteriEkleTam(state, (etki.pazar_payi_artis / 100) * (state.pazar_musteri ?? 0));
  }

  if (etki.ekip_ekle) ekipUyesiEkle(state, etki.ekip_ekle.rol, etki.ekip_ekle.tahminGenisligi);
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
  if (etki.evcil_hayvan_edin?.tur) {
    const tur = etki.evcil_hayvan_edin.tur;
    // Aynı anda en fazla 2 hayvan; aynı tür birden fazla yaşayamaz.
    if (state.evcil_hayvanlar.length < HAYVAN_AYNI_ANDA_TAVANI && !state.evcil_hayvanlar.some((h) => h.tur === tur)) {
      const hayvan = evcilHayvanEkle(state, tur);
      hayatOlayiEkle(state, "🐾", T(state.dil, "{0} adlı bir {1} edindi", [
        hayvan.isim,
        K(state.dil, tur).toLocaleLowerCase(state.dil === "en" ? "en" : "tr"),
      ]));
    }
  }
  if (etki.evcil_hayvan_kaybet && state.evcil_hayvanlar.length > 0) {
    // Olayın `hayvanTuru`'ndaki hayvan; belirtilmemişse en son edinilen.
    const kaybedilen =
      (mevcutOlay.hayvanTuru ? state.evcil_hayvanlar.find((h) => h.tur === mevcutOlay.hayvanTuru) : undefined) ??
      state.evcil_hayvanlar[state.evcil_hayvanlar.length - 1];
    evcilHayvanKaldir(state, kaybedilen);
    hayatOlayiEkle(state, "💔", T(state.dil, "{0} adlı evcil hayvanını kaybetti", [kaybedilen.isim]));
  }
  // Karşılaşma olayı çözüldü (kabul ya da ret): sayaç artar, bu tür bir daha çıkmaz.
  if (mevcutOlay.hayvanKarsilasmaTuru && !state.hayvan_karsilasma_turleri.includes(mevcutOlay.hayvanKarsilasmaTuru)) {
    state.hayvan_karsilasma_sayisi += 1;
    state.hayvan_karsilasma_turleri.push(mevcutOlay.hayvanKarsilasmaTuru);
  }
  if (etki.mulk_kaybet && state.mulkler.includes(etki.mulk_kaybet)) {
    const kaybedilenMulk = mulkTanimiGetir(etki.mulk_kaybet);
    state.mulkler = state.mulkler.filter((m) => m !== etki.mulk_kaybet);
    if (state.mulk_bakim_kalan) delete state.mulk_bakim_kalan[etki.mulk_kaybet];
    if (state.mulk_alis_yili) delete state.mulk_alis_yili[etki.mulk_kaybet];
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
    ulkeGecmisiEkle(state, "kriz_basladi", state.yil, etki.kriz_baslat.tur);
  }
  const hapistenCiktiBuEtki =
    !!etki.etiket_sil?.includes("hapiste") && state.etiketler.includes("hapiste");
  // Karanlık bir sır (sir:*) edinmek eşin ilişkisine zarar verir.
  if (etki.etiket_ekle?.some((e) => e.startsWith("sir:") && !state.etiketler.includes(e))) {
    AS.esBarDusur(state, SIR_ES_ZARARI);
  }
  etiketEkle(state, etki.etiket_ekle);
  etiketSil(state, etki.etiket_sil);
  // Hapse yeni girildiyse ceza süresi tutuklanma anındaki suc_seviyesi bandına
  // göre belirlenir (hapisCezaSuresiHesapla, aranmaSeviyesi.ts bant eşikleriyle
  // hizalı: 0-25→3-6y · 25-50→5-8y · 50-75→7-9y · 75-100→9-12y). Zaten bir
  // cezan varsa (üst üste tutuklanma) dokunma. `hapis_ceza_toplam` başlangıç
  // cezasını sabit tutar — "yıl yatılan" (toplam-kalan) hesaplaması ve bandı
  // ağır tutuklamalarda erken parayla/af ile çıkışı engelleyen kural bunu kullanır.
  // Bu turda TAZE tutuklanma oldu mu? Aşağıdaki yıl-ilerleme bloğu, aynı turda
  // hem "hapiste"yi ekleyip hem de o turun yasArtisi'ni cezadan düşerse (kısa
  // cezalarda — bkz. HAPIS_CEZA_TEMIZ_MIN_YIL — ceza yasArtisi'ne eşit/az olabilir)
  // karakter tutuklandığı turda görünmeden serbest kalabilir. Bu bayrak o turun
  // doğal erimesini atlayıp cezanın en az bir tam tur hissedilmesini garantiler.
  let hapisteYeniGirildiBuTur = false;
  if (etki.etiket_ekle?.includes("hapiste") && state.hapis_ceza_kalan <= 0) {
    const ceza = hapisCezaSuresiHesapla(sucSeviyesiTutuklanmaAni);
    state.hapis_ceza_kalan = ceza;
    state.hapis_ceza_toplam = ceza;
    state.hapis_tur_sayaci = 0;
    hapisteYeniGirildiBuTur = true;
  }
  // Riskli kaçış girişimi başarısız oldu → ceza uzadı (toplam ceza da birlikte uzar).
  if (etki.hapis_ceza_artis && state.etiketler.includes("hapiste")) {
    state.hapis_ceza_kalan += etki.hapis_ceza_artis;
    state.hapis_ceza_toplam += etki.hapis_ceza_artis;
  }
  // Bir seçimle "hapiste" silindiyse (rüşvet/af/başarılı kaçış) toplam sayaç sıfırlanır.
  if (hapistenCiktiBuEtki) state.hapis_ceza_toplam = 0;
  // Bir olay seçimiyle serbest kalındıysa (rüşvet/af/başarılı kaçış) sayaç sıfırlanır.
  if (hapistenCiktiBuEtki) state.hapis_ceza_kalan = 0;
  // Faz 5 skor bonusu: FİZİKSEL bir kaçışla (rüşvet/af DEĞİL) hapisten çıkmak
  // bir ömürde bir kereliğine ödüllendirilir (bkz. hesaplaSkorKirilimi).
  if (etki.hapis_basarili_kacis && !state.hapis_basarili_kacis) {
    state.hapis_basarili_kacis = true;
  }
  // Bir olay (veba dönemi bulaşma olayı) vebayı bulaştırdıysa kişisel hastalığı
  // başlat: ~%70 ölüm riski + vebaHastasiOlayi havuzuna geç.
  if (etki.etiket_ekle?.includes("veba_hastasi")) vebaHastaligiBaslatEt(state);
  ulkeGuncelle(state, etki.ulke_etkisi);
  durumEkle(state, etki.durum_ekle);
  if (etki.durum_sil) {
    state.durumlar = state.durumlar.filter((d) => !etki.durum_sil!.includes(d.id));
  }
  clampStats(state);

  if (etki.zorunlu_sonraki_havuzu && etki.zorunlu_sonraki_havuzu.length > 0) {
    oturum.zorlananOlayId = zorunluSonrakiHavuzdanSec(etki.zorunlu_sonraki_havuzu, state.gecmis_olaylar);
  } else if (etki.zorunlu_sonraki) {
    oturum.zorlananOlayId = etki.zorunlu_sonraki;
  }
  // Gecikmiş takip (§36-benzeri, 2026-09 sonu): bu seçim 15-20 yıl sonrasına bir
  // geri dönüş olayı zamanlıyorsa kuyruğa alınır — senaryoUret kaskadı zamanı
  // gelince (tetiklenmeYili <= state.yil) bunu zorlanan olay olarak sunar.
  if (etki.gecikmis_takip) {
    if (!Array.isArray(state.gecikmis_takipler)) state.gecikmis_takipler = [];
    const gecikmeYil = GECIKMIS_TAKIP_YIL_MIN + Math.floor(Math.random() * (GECIKMIS_TAKIP_YIL_MAX - GECIKMIS_TAKIP_YIL_MIN + 1));
    state.gecikmis_takipler.push({
      id: randomUUID(),
      olayId: etki.gecikmis_takip,
      tetiklenmeYili: state.yil + gecikmeYil,
    });
  }

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
  checkDeath(state, olumTetiklendi, mesajCeviri ?? etki.mesaj);
  // efsanevi_olum rozeti YALNIZCA ölüm gerçekten gerçekleştiyse atanır: Kutsal
  // Emanet relik'i ölümü iptal ederse (checkDeath) hayatta kalan karakter,
  // yaşamadığı bir "efsanevi ölüm" damgasını taşımasın.
  if (etki.efsanevi_olum && !state.aktif) {
    state.efsanevi_olum = etki.efsanevi_olum;
  }
  // Faz 5 skor bonusu: komikOlumler.ts'in riskli şıkkını seçip hayatta kalmak/ölmek
  // bir kereliğine ödüllendirilir (bkz. hesaplaSkorKirilimi). Relik ölümü iptal
  // ederse (state.aktif hâlâ true) bu "hayatta kaldı" sayılır.
  if (komikOlumRiskliSecenekMi) {
    if (state.aktif) {
      if (!state.komik_olum_basarili_risk) state.komik_olum_basarili_risk = true;
    } else if (!state.komik_olum_ile_oldu) {
      state.komik_olum_ile_oldu = true;
    }
  }

  // Olay bazlı süre alanları (sureYilMin/Max) kasıtlı olarak yok sayılıyor. "ilerle" modunda olay
  // cevabı 0 yıl (yolculuk adımı 1), yıllar İLERLE ile geçer; klasik modda %60 ihtimalle 1,
  // %40 ihtimalle 2 yıl (yolculuk adımı her zaman 1).
  const olayYili = yilHedefi ?? (mevcutOlay.yolculukOlayi ? 1 : Math.random() < 0.6 ? 1 : 2);
  const yilSonucu = yilIlerlet({
    oturum,
    mevcutOlay,
    nakitAkisi,
    hapisteYeniGirildiBuTur,
    ayyasOlduBuTur,
    eskiRutbeSeviye,
    yilSayisi: olayYili,
  });
  const { yasArtisi, terfiOldu } = yilSonucu;
  const zamanAnlatimi = yilSonucu.zamanAnlatimi;

  // Yaşlanma/kriz/şans gibi turun sonundaki pasif adımlardan bazıları (ör. krizEtkisiUygula)
  // kendi içinde clampStats çağırmıyor; kalıcı kayıttan önce burada son bir kez sınırlıyoruz.
  clampStats(state);

  if (mevcutOlay.id !== YIL_GEC_OLAYI.id) state.gecmis_olaylar.push(mevcutOlay.id);
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
    nakitAkisi.zenginlikSizinti -
    nakitAkisi.rakipSoygun;
  nakitAkisi.digerNet = paraYuvarla(state.para - paraGiris - mutabakatliToplam);

  await oturumKaydet(state);

  if (!state.aktif) await olumMetrikleriniYaz(state);

  return { state, basarili, uygulananEtki: etki, yasArtisi, sonucAnlatimi, zamanAnlatimi, terfiOldu, nakitAkisi };
}

export interface FinansOzeti {
  /** İşletmeli mesleklerde geçen yılın DÜKKAN NETİ (vergi ve borç ödemesi sonrası; maaş ve yaşam giderleri ayrı). */
  maasYillik: number;
  giderKalemleri: GiderKalemleri;
  /** v11: yıllık kredi taksidi tahmini (hiç kredi yoksa 0) ve gelirin işletme neti olup olmadığı. */
  krediTaksit: number;
  isletmeli: boolean;
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
/** Üst şerit göstergesi detay penceresi: bu değer neyden etkileniyor, nasıl değişir? (salt-okunur, tur tüketmez) */
export async function gostergeGetir(id: string, stat: string): Promise<GostergeDetayi> {
  const oturum = await oturumGetir(id);
  if (!gostergeStatiMi(stat)) throw new Error("Geçersiz gösterge.");
  return gostergeDetayiUret(oturum.state, stat);
}

// ─── Aranma ekranı (Aranma II) ───────────────────────────────────────────────
/** Ekranda gösterilen tahmini teslim cezası için bandın ortası (deterministik). */
function hapisCezaTahmini(puan: number): number {
  const [min, max] = hapisCezaSuresiAraligi(puan);
  return Math.round((min + max) / 2);
}

export async function aranmaGetir(id: string): Promise<AranmaDurumu> {
  const oturum = await oturumGetir(id);
  return aranmaDurumuUret(oturum.state, hapisCezaTahmini);
}

export async function aranmaKefaretOde(id: string, yarim: boolean): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const { odenen } = gonulluKefaretOde(state, yarim);
  const mesaj = T(state.dil, "Kefareti ödedin ({0} {birim}); sicilin {1}.", [
    odenen,
    yarim ? T(state.dil, "yarı yarıya temizlendi") : T(state.dil, "tamamen temizlendi"),
  ]).replace(/\{birim\}/g, state.para_birimi);
  await oturumKaydet(state);
  return { state, mesaj };
}

export async function aranmaTeslimOl(id: string): Promise<{ state: CharacterState; mesaj: string; ceza: number }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const ceza = gonulluTeslimOl(state, hapisCezaSuresiHesapla);
  const mesaj = T(state.dil, "Kendi isteğinle teslim oldun; ceza indirimli: {0} yıl.", [ceza]);
  await oturumKaydet(state);
  return { state, mesaj, ceza };
}

/** Aranma bildirimini kapatır (ifşa/baskın) ya da polis uyarısını yanıtlar (karar: tam|yarim|hayir). */
export async function aranmaBildirimiYanitla(
  id: string,
  bildirimId: string,
  karar?: "tam" | "yarim" | "hayir"
): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const b = state.aranma_bildirimleri.find((x) => x.id === bildirimId);
  if (!b) throw new Error("Bildirim bulunamadı.");
  let mesaj = "";
  if (b.tur === "polis_uyari") {
    if (karar !== "tam" && karar !== "yarim" && karar !== "hayir") throw new Error("Geçersiz karar.");
    const sonuc = polisUyarisiniYanitla(state, bildirimId, karar);
    mesaj =
      karar === "hayir"
        ? T(state.dil, "Kefareti reddettin; polis seni not aldı (aranma +{0}).", [sonuc.aranmaArtis])
        : T(state.dil, "Kefareti ödedin ({0} {birim}).", [sonuc.odenen]).replace(/\{birim\}/g, state.para_birimi);
  } else {
    aranmaBildirimiKapat(state, bildirimId);
  }
  await oturumKaydet(state);
  return { state, mesaj };
}

/** "Yıl" penceresi: son yıllarda ülkende ve dünyada olan önemli olaylar (salt-okunur, tur tüketmez). */
export async function dunyaGecmisiGetir(id: string): Promise<DunyaGecmisi> {
  const oturum = await oturumGetir(id);
  return dunyaGecmisiUret(oturum.state);
}

export async function finansGetir(id: string): Promise<FinansOzeti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  // İşletmeli mesleklerde gelir = geçen yılın dükkan neti (zarar yılında eksi görünür).
  const maasYillik = isletmeAktif(state) ? paraYuvarla(isletmeGelirTahmini(state, isletmeBaglami(state))) : hesaplaMaasYillik(state);
  const giderKalemleri = giderKalemleriHesapla(state);
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.savasVergisi;
  // v11: kredi taksidi de "cebine kalan"a girer (eskiden hiçbir panelde yoktu).
  const krediTaksit = state.kredi ? paraYuvarla(Math.min(state.kredi.kalanBorc, state.kredi.yillikTaksit)) : 0;
  return {
    maasYillik,
    giderKalemleri,
    krediTaksit,
    isletmeli: isletmeAktif(state),
    netYillik: paraYuvarla(maasYillik - toplamGider - krediTaksit),
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
  hapisYolculukEngeli(state, "taşınamazsın");
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

// ---------------------------------------------------------------------------
// Aile ekranı: eş/çocuk etkileşimleri + bekleyen para talebi (§33)
// Sosyalleşme/mağaza deseni: hepsi tur harcamaz, oturumKaydet sonrası döner.
// ---------------------------------------------------------------------------

type AileEtkilesimHedef = "es" | "cocuk" | "hepsi";

interface AileEtkilesimTanimi {
  id: string;
  ikon: string;
  hedef: AileEtkilesimHedef;
  /** Enflasyondan ÖNCEki taban maliyet (0 = ücretsiz). */
  tabanMaliyet: number;
  cooldownYil: number;
  esPuani?: number;
  cocukIliski?: number;
  mutluluk?: number;
  saglik?: number;
  un?: number;
}

const AILE_ETKILESIMLERI: AileEtkilesimTanimi[] = [
  { id: "cocuk_oyna", ikon: "🎠", hedef: "cocuk", tabanMaliyet: 0, cooldownYil: 3, cocukIliski: 8, mutluluk: 4 },
  { id: "cocuk_hediye", ikon: "🧸", hedef: "cocuk", tabanMaliyet: 8, cooldownYil: 3, cocukIliski: 12, mutluluk: 3 },
  { id: "cocuk_egitim", ikon: "🎓", hedef: "cocuk", tabanMaliyet: 18, cooldownYil: 6, cocukIliski: 9, un: 2 },
  { id: "aile_gezi", ikon: "🧺", hedef: "hepsi", tabanMaliyet: 16, cooldownYil: 5, esPuani: 6, cocukIliski: 6, mutluluk: 6, saglik: 2 },
];

function aileEtkilesimKilitAnahtari(tanim: AileEtkilesimTanimi, cocukIndex: number | null): string {
  return tanim.hedef === "cocuk" ? `${tanim.id}:${cocukIndex}` : tanim.id;
}

function aileEtkilesimMaliyeti(state: CharacterState, tanim: AileEtkilesimTanimi): number {
  if (tanim.tabanMaliyet <= 0) return 0;
  return Math.max(1, paraYuvarla(tanim.tabanMaliyet * enflasyonCarpani(state)));
}

export interface MantikAdayGorunum {
  isim: string;
  meslek: string;
  rutbe: string;
  yas: number;
  grup: "genc" | "olgun";
  /** Yalnız ilk huy görünür; ikincisi evlilikten sonra açılır. */
  huy: AileHuy;
  ceyiz: number;
  meslekBonusu: number;
}

export interface MantikDurumu {
  acik: boolean;
  /** acik=false ise sebep kodu (istemci çevirir): evli | yas_dusuk | yas_donemi | kilit | hapis | bekleyen_dugun. */
  sebep: string | null;
  minYas: number;
  kilitKalanYil: number;
  yasKalanYil: number;
  yenilemeKalanYil: number;
  adaylar: MantikAdayGorunum[];
  teklifSecenekleri: { hediye: TeklifHediyesi; maliyet: number; sans: number }[];
}

export interface AileDurumu {
  es: {
    adi: string;
    meslek: string | null;
    rutbe: string | null;
    puan: number;
    yas: number | null;
    tur: EvlilikTuru | null;
    grup: "genc" | "olgun" | null;
    huylar: AileHuy[];
    meslekBonusu: number;
    /** Son "zaman geçir"den bu yana geçen yıl (uyarı için; gizli yıllık düşüş DEĞİL). */
    ihmalYili: number;
    dogumSayisi: number;
  } | null;
  cocuklar: {
    isim: string;
    dogumYili: number;
    yas: number;
    yasiyor: boolean;
    iliski: number;
    /** Yanında çalışma daveti durumu (yatkınlık bilerek gönderilmez — davete verilen tepkide anlaşılır). */
    isDurumu: "bekliyor" | "red_tepkisi" | "ise_alindi" | "reddetti" | null;
  }[];
  etkilesimler: { id: string; ikon: string; hedef: AileEtkilesimHedef; maliyet: number }[];
  /** Etkileşim kilit anahtarı → tekrar açılacağı oyun yılı (istemci kalanYil'i guncelYil ile hesaplar). */
  kilitler: Record<string, number>;
  talep: CharacterState["aile_talep"];
  guncelYil: number;
  para: number;
  paraBirimi: string;
  /** Eş bar eylemlerinin güncel maliyetleri. */
  esEylem: { hediyeUcuz: number; hediyePahali: number };
  mantik: MantikDurumu;
  /** Teklifi kabul edilmiş, bütçe seçimi bekleyen düğün. */
  bekleyenDugun: { isim: string; meslek: string; rutbe: string; ceyiz: number; tur: EvlilikTuru } | null;
  /** Aşk evliliği yolu: sevgili kartı (yalnız ilk huy görünür); yoksa null. */
  sevgili: {
    isim: string;
    meslek: string;
    rutbe: string;
    yas: number;
    huy: AileHuy;
    bar: number;
    /** Evlilik teklifi için kalan yıl (negatif/0 = süre doldu). */
    kalanYil: number;
    darildi: boolean;
    meslekBonusu: number;
    gonulMaliyet: number;
    gonulKilitKalanYil: number;
    teklifSansi: number;
  } | null;
  /** Süren tanışma var mı (istemci penceresi açar). */
  tanismaAktif: boolean;
  dugunSecenekleri: { butce: DugunButcesi; maliyet: number; iliski: number; un: number }[];
}

function mantikSebebi(state: CharacterState): string | null {
  if (state.etiketler.includes("medeni:evli") || state.es_adi) return "evli";
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return "hapis";
  if (state.bekleyen_dugun) return "bekleyen_dugun";
  if (state.sevgili || state.aktif_tanisma) return "sevgili";
  if (state.yas < MANTIK_MIN_YAS) return "yas_dusuk";
  if (AS.yasDonemindeMi(state)) return "yas_donemi";
  if (state.yil < state.mantik_kilit_yili) return "kilit";
  return null;
}

/** Aile ekranının ihtiyaç duyduğu her şey: eş/çocuk özeti, mantık adayları, etkileşim kataloğu + kilitler, bekleyen talep/düğün. Turu tüketmez. */
export async function aileDurumGetir(id: string): Promise<AileDurumu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");

  const sebep = mantikSebebi(state);
  let degisti = false;
  if (sebep === null) {
    const onceki = state.mantik_adaylar;
    AS.mantikListesiniHazirla(state);
    degisti = onceki !== state.mantik_adaylar;
  }
  const adaylar: MantikAdayGorunum[] = sebep === null
    ? state.mantik_adaylar.map((a) => ({
        isim: a.isim,
        meslek: a.meslek,
        rutbe: a.rutbe,
        yas: a.yas,
        grup: a.grup,
        huy: a.huylar[0],
        ceyiz: a.ceyiz,
        meslekBonusu: a.meslek_bonusu,
      }))
    : [];

  const durum: AileDurumu = {
    es: state.es_adi
      ? {
          adi: state.es_adi,
          meslek: state.es_meslek,
          rutbe: state.es_rutbe,
          puan: Math.round(state.es_puani),
          yas: AS.esYasi(state),
          tur: state.es_evlilik_turu,
          grup: state.es_grup,
          huylar: [...state.es_huylar],
          meslekBonusu: state.es_meslek_bonusu,
          ihmalYili: AS.ihmalYili(state),
          dogumSayisi: state.es_dogum_sayisi,
        }
      : null,
    cocuklar: state.cocuklar.map((c) => ({
      isim: c.isim,
      dogumYili: c.dogum_yili,
      yas: Math.max(0, state.yil - c.dogum_yili),
      yasiyor: c.yasiyor,
      iliski: Math.round(typeof c.iliski === "number" ? c.iliski : 60),
      isDurumu: c.is_durumu ?? null,
    })),
    etkilesimler: AILE_ETKILESIMLERI.map((t) => ({
      id: t.id,
      ikon: t.ikon,
      hedef: t.hedef,
      maliyet: aileEtkilesimMaliyeti(state, t),
    })),
    kilitler: { ...state.aile_etkilesim_kilit },
    talep: state.aile_talep,
    guncelYil: state.yil,
    para: state.para,
    paraBirimi: state.para_birimi,
    esEylem: {
      hediyeUcuz: AS.hediyeVerMaliyeti(state, "ucuz"),
      hediyePahali: AS.hediyeVerMaliyeti(state, "pahali"),
    },
    mantik: {
      acik: sebep === null,
      sebep,
      minYas: MANTIK_MIN_YAS,
      kilitKalanYil: Math.max(0, state.mantik_kilit_yili - state.yil),
      yasKalanYil: Math.max(0, state.yas_bitis_yili - state.yil),
      yenilemeKalanYil: Math.max(0, state.mantik_yenileme_yili - state.yil),
      adaylar,
      teklifSecenekleri: (["sade", "ucuz", "pahali"] as TeklifHediyesi[]).map((h) => ({
        hediye: h,
        maliyet: AS.teklifHediyeMaliyeti(state, h),
        sans: AS.mantikTeklifSansi(state, h),
      })),
    },
    bekleyenDugun: state.bekleyen_dugun
      ? {
          isim: state.bekleyen_dugun.isim,
          meslek: state.bekleyen_dugun.meslek,
          rutbe: state.bekleyen_dugun.rutbe,
          ceyiz: state.bekleyen_dugun.ceyiz,
          tur: state.bekleyen_dugun.tur,
        }
      : null,
    sevgili: state.sevgili
      ? {
          isim: state.sevgili.isim,
          meslek: state.sevgili.meslek,
          rutbe: state.sevgili.rutbe,
          yas: Math.max(0, state.yil - state.sevgili.dogum_yili),
          huy: state.sevgili.huylar[0],
          bar: Math.round(state.sevgili.iliski),
          kalanYil: state.sevgili.son_yil - state.yil,
          darildi: state.sevgili.darildi,
          meslekBonusu: state.sevgili.meslek_bonusu,
          gonulMaliyet: AK.gonulAlMaliyeti(state),
          gonulKilitKalanYil: Math.max(0, state.sevgili.gonul_kilit_yili - state.yil),
          teklifSansi: AK.sevgiliTeklifSansi(state.sevgili),
        }
      : null,
    tanismaAktif: state.aktif_tanisma != null,
    dugunSecenekleri: (["ucuz", "orta", "pahali"] as DugunButcesi[]).map((b) => ({
      butce: b,
      maliyet: AS.dugunMaliyeti(state, b),
      iliski: DUGUN[b].iliski,
      un: DUGUN[b].un,
    })),
  };
  if (degisti) await oturumKaydet(state);
  return durum;
}

export interface MantikTeklifSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** Mantık evliliği: listeden bir adaya (isteğe bağlı hediyeyle) teklif. Kabulde düğün bütçesi seçimi beklenir. Turu tüketmez. */
export async function mantikTeklifEt(id: string, adayIndex: number, hediye: TeklifHediyesi): Promise<MantikTeklifSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const sonuc = AS.mantikTeklifEt(state, adayIndex, hediye);
  const mesaj = sonuc.kabul
    ? T(state.dil, "{0} teklifini kabul etti! Şimdi düğün bütçeni seç.", [sonuc.aday.isim])
    : T(state.dil, "{0} teklifini nazikçe geri çevirdi. Belki başka zaman...", [sonuc.aday.isim]) +
      " " +
      T(state.dil, "Bir süre yeni teklif yapamazsın.");
  await oturumKaydet(state);
  return { state, kabul: sonuc.kabul, mesaj };
}

export interface DugunSonucuDTO {
  state: CharacterState;
  mesaj: string;
}

/** Bekleyen düğünü seçilen bütçeyle gerçekleştirir; eş modeli kurulur. Turu tüketmez. */
export async function dugunYap(id: string, butce: DugunButcesi): Promise<DugunSonucuDTO> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const sonuc = AS.dugunYap(state, butce);
  let mesaj = T(state.dil, "💍 {0} ile evlendin!", [sonuc.isim]);
  if (sonuc.ceyiz > 0) {
    mesaj += " " + T(state.dil, "Çeyiz olarak {0} {1} getirdi.", [sonuc.ceyiz, state.para_birimi]);
  }
  await oturumKaydet(state);
  return { state, mesaj };
}

export interface EsEylemSonucuDTO {
  state: CharacterState;
  mesaj: string;
}

// ---------------------------------------------------------------------------
// Aşk evliliği: tanışma diyaloğu + sevgili (game/askSistemi.ts). Hiçbiri turu tüketmez.
// ---------------------------------------------------------------------------

export interface TanismaDurumu {
  aktif: boolean;
  /** 0 = göz göze (yanına git / vazgeç), 1..toplam = diyalog adımı. */
  adim: number;
  toplam: number;
  mekan: string;
  /** İlk karşılaşma cümlesi (mekân + aday adı). */
  giris: string;
  aday: { isim: string; meslek: string; rutbe: string; yas: number; gorunum: string } | null;
  /** Şu anki adımın başlığı (adim >= 1). */
  istek: string | null;
  secenekler: { metin: string }[];
  /** Önceki adımın tepkisi (düz anlatı). */
  sonTepki: string | null;
}

function tanismaDurumuUret(state: CharacterState): TanismaDurumu {
  const t = state.aktif_tanisma;
  if (!t) {
    return { aktif: false, adim: 0, toplam: 0, mekan: "", giris: "", aday: null, istek: null, secenekler: [], sonTepki: null };
  }
  const dil = state.dil;
  const cevir = (m: { tr: string; en: string }) => (dil === "en" ? m.en : m.tr).replace(/\{0\}/g, t.aday.isim);
  const girisSablon = TANISMA_MEKAN_GIRIS[t.mekan] ?? TANISMA_MEKAN_GIRIS.pazar_meydani;
  const gorunum = TANISMA_GORUNUM[t.aday.gorunum % TANISMA_GORUNUM.length];
  const giris = cevir(girisSablon) + " " + (dil === "en" ? gorunum.en : gorunum.tr) + ".";
  const adimIndex = Math.min(Math.max(t.adim, 1), TANISMA_ADIM_METNI.length) - 1;
  return {
    aktif: true,
    adim: t.adim,
    toplam: t.toplam,
    mekan: t.mekan,
    giris,
    aday: {
      isim: t.aday.isim,
      meslek: t.aday.meslek,
      rutbe: t.aday.rutbe,
      yas: t.aday.yas,
      gorunum: dil === "en" ? gorunum.en : gorunum.tr,
    },
    istek: t.adim >= 1 ? cevir(TANISMA_ADIM_METNI[adimIndex]) : null,
    secenekler:
      t.adim >= 1
        ? t.yaklasimlar.map((y) => ({ metin: cevir(TANISMA_SECENEK_METNI[y][adimIndex]) }))
        : [],
    sonTepki: t.son_tepki ? AK.tepkiMetniUret(dil, t.aday, t.son_tepki) : null,
  };
}

export async function tanismaGetir(id: string): Promise<TanismaDurumu> {
  const oturum = await oturumGetir(id);
  if (!oturum.state.aktif) throw new Error("Oyun zaten bitmiş.");
  return tanismaDurumuUret(oturum.state);
}

export interface TanismaYaniti {
  state: CharacterState;
  durum: TanismaDurumu;
  /** Diyalog bitti mi (sonuç `mesaj`'da). */
  bitti: boolean;
  basarili: boolean | null;
  /** Bu adımın tepkisi; vazgeçilince boş. */
  tepki: string | null;
  mesaj: string | null;
}

export async function tanismaYaklas(id: string): Promise<TanismaYaniti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  AK.tanismaYaklas(state);
  await oturumKaydet(state);
  return { state, durum: tanismaDurumuUret(state), bitti: false, basarili: null, tepki: null, mesaj: null };
}

export async function tanismaVazgec(id: string): Promise<TanismaYaniti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const mesaj = AK.tanismaVazgec(state);
  await oturumKaydet(state);
  return { state, durum: tanismaDurumuUret(state), bitti: true, basarili: false, tepki: null, mesaj };
}

export async function tanismaSec(id: string, secenekIndex: number): Promise<TanismaYaniti> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const sonuc = AK.tanismaSec(state, secenekIndex);
  await oturumKaydet(state);
  return {
    state,
    durum: tanismaDurumuUret(state),
    bitti: sonuc.bitti,
    basarili: sonuc.basarili,
    tepki: sonuc.tepki,
    mesaj: sonuc.mesaj,
  };
}

export interface SevgiliSonucu {
  state: CharacterState;
  mesaj: string;
  kabul?: boolean;
}

export async function sevgiliTeklifEt(id: string): Promise<SevgiliSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const sonuc = AK.sevgiliTeklifEt(state);
  const mesaj = sonuc.kabul
    ? T(state.dil, "{0} teklifini kabul etti! Şimdi düğün bütçeni seç.", [sonuc.isim])
    : T(state.dil, "{0} teklifini nazikçe geri çevirdi. Belki başka zaman...", [sonuc.isim]);
  await oturumKaydet(state);
  return { state, mesaj, kabul: sonuc.kabul };
}

export async function sevgiliGonulAl(id: string): Promise<SevgiliSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const adi = state.sevgili?.isim ?? "";
  AK.gonulAl(state);
  await oturumKaydet(state);
  return { state, mesaj: T(state.dil, "{0}'in gönlünü aldın; yüzü yeniden güldü.", [adi]) };
}

export async function sevgiliAyril(id: string): Promise<SevgiliSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const adi = AK.sevgiliAyril(state);
  await oturumKaydet(state);
  return { state, mesaj: T(state.dil, "{0} ile yollarınızı ayırdınız.", [adi]) };
}

export interface CocukIseAlSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** 15 yaşındaki çocuğu yanında çalışmaya davet eder: yatkına göre kabul/red; kabulde ekibe girer. Turu tüketmez. */
export async function cocukIseAl(id: string, cocukIndex: number): Promise<CocukIseAlSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const cocuk = AS.cocukDavetiKontrolEt(state, cocukIndex, "bekliyor");
  if (!cocuk.yatkinlik) cocuk.yatkinlik = AS.cocukYatkinligi();
  const kabul = AS.cocukKabulEder(cocuk);
  let mesaj: string;
  if (kabul) {
    const { gercekKalite, maasIndirimi, buffCarpani } = AS.cocukEkipDegerleri();
    const uye = ekipUyesiEkle(state, COCUK_EKIP_ROLU, 8, {
      isim: cocuk.isim,
      gercekKalite,
      maasIndirimi,
      sadakat: 100,
      kisilik: "Sadık",
      cocukIsim: cocuk.isim,
      buffCarpani,
    });
    cocuk.is_durumu = "ise_alindi";
    cocuk.ekip_id = uye.id;
    cocuk.iliski = (typeof cocuk.iliski === "number" ? cocuk.iliski : 60) + 5;
    state.mutluluk += 3;
    mesaj = T(state.dil, "{0} teklifini sevinçle kabul etti; artık yanında çalışıyor.", [cocuk.isim]);
  } else {
    cocuk.is_durumu = "red_tepkisi";
    mesaj = T(state.dil, "{0} teklifini reddetti: 'Bu iş bana göre değil.' Ona nasıl karşılık vereceksin?", [cocuk.isim]);
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, kabul, mesaj };
}

/** Reddedilen davete öfkelen / sakin karşıla. Turu tüketmez. */
export async function cocukRedTepkisi(id: string, cocukIndex: number, tepki: "ofke" | "sakin"): Promise<CocukIseAlSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const adi = AS.cocukRedTepkisiUygula(state, cocukIndex, tepki);
  await oturumKaydet(state);
  const mesaj =
    tepki === "ofke"
      ? T(state.dil, "{0}'e öfkelendin; aranıza soğukluk girdi.", [adi])
      : T(state.dil, "{0}'in kararına sakince saygı gösterdin; aranız yumuşadı.", [adi]);
  return { state, kabul: false, mesaj };
}

/** Eşle ilişki barı eylemi (zaman geçir / hediye ver). Turu tüketmez. */
export async function esEylemYap(id: string, eylem: AS.EsEylemi, hediye?: "ucuz" | "pahali"): Promise<EsEylemSonucuDTO> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const sonuc = AS.esEylemYap(state, eylem, hediye);
  await oturumKaydet(state);
  return { state, mesaj: sonuc.mesaj };
}

interface AileEtkilesimSonucu {
  state: CharacterState;
  tam: boolean;
  mesaj: string;
}

const AILE_ETKILESIM_MESAJLARI: Record<string, string> = {
  es_hediye: "{0} için bir hediye aldın; yüzü güldü.",
  es_zaman: "{0} ile baş başa vakit geçirdin; ikiniz de dinlendiniz.",
  es_sevgi: "{0}'e sarılıp sevgini gösterdin; aranız yumuşadı.",
  es_gezi: "{0} ile bir geziye çıktınız; uzun zamandır bu kadar iyi anlaşmamıştınız.",
  cocuk_oyna: "{0} ile oyun oynadın; kahkahası eve doldu.",
  cocuk_hediye: "{0} için bir hediye aldın; sevincinden zıpladı.",
  cocuk_egitim: "{0}'in eğitimi için para ayırdın; sana minnettar.",
  aile_gezi: "Tüm aileyle birlikte bir gün geçirdiniz; herkesin yüzü gülüyor.",
};

/** Aile ekranından bir etkileşim (hediye/zaman/sevgi/gezi/eğitim...) — turu TÜKETMEZ. Maliyeti düşer, ilişki/mutluluk uygular, cooldown yazar. */
export async function aileEtkilesimYap(
  id: string,
  etkilesimId: string,
  cocukIndex: number | null = null
): Promise<AileEtkilesimSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken ailenle ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken ailenle ilgilenemezsin.");

  const tanim = AILE_ETKILESIMLERI.find((t) => t.id === etkilesimId);
  if (!tanim) throw new Error("Böyle bir etkileşim yok.");

  const esGerekli = tanim.hedef === "es" || tanim.hedef === "hepsi";
  if (esGerekli && !state.es_adi && tanim.hedef === "es") throw new Error("Bunun için bir eşin olmalı.");

  let hedefCocuk: CharacterState["cocuklar"][number] | null = null;
  if (tanim.hedef === "cocuk") {
    if (cocukIndex == null || !state.cocuklar[cocukIndex] || !state.cocuklar[cocukIndex].yasiyor) {
      throw new Error("Geçerli bir çocuk seçmelisin.");
    }
    hedefCocuk = state.cocuklar[cocukIndex];
  }
  if (tanim.hedef === "hepsi" && !state.es_adi && !state.cocuklar.some((c) => c.yasiyor)) {
    throw new Error("Ailen yok.");
  }

  const anahtar = aileEtkilesimKilitAnahtari(tanim, cocukIndex);
  const kilitYili = state.aile_etkilesim_kilit[anahtar];
  if (typeof kilitYili === "number" && state.yil < kilitYili) {
    throw new Error("Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.");
  }

  const maliyet = aileEtkilesimMaliyeti(state, tanim);
  if (maliyet > 0 && state.para < maliyet) throw new Error("Bunu karşılayacak paran yok.");
  if (maliyet > 0) state.para = paraYuvarla(state.para - maliyet);

  // Hafif zar: %80 tam etki, %20 yarım ("bugün pek keyfi yoktu").
  const tam = Math.random() < 0.8;
  const carpan = tam ? 1 : 0.5;
  const olcek = (x: number | undefined) => (x ? Math.max(1, Math.round(x * carpan)) : 0);

  if ((tanim.hedef === "es" || tanim.hedef === "hepsi") && state.es_adi && tanim.esPuani) {
    state.es_puani += olcek(tanim.esPuani);
  }
  if (tanim.cocukIliski) {
    if (tanim.hedef === "cocuk" && hedefCocuk) {
      hedefCocuk.iliski = (typeof hedefCocuk.iliski === "number" ? hedefCocuk.iliski : 60) + olcek(tanim.cocukIliski);
    } else if (tanim.hedef === "hepsi") {
      for (const c of state.cocuklar) {
        if (c.yasiyor) c.iliski = (typeof c.iliski === "number" ? c.iliski : 60) + olcek(tanim.cocukIliski);
      }
    }
  }
  if (tanim.mutluluk) state.mutluluk += olcek(tanim.mutluluk);
  if (tanim.saglik) state.saglik += olcek(tanim.saglik);
  if (tanim.un) state.un += tanim.un;
  clampStats(state);

  state.aile_etkilesim_kilit[anahtar] = state.yil + Math.max(1, tanim.cooldownYil - hayvanAileBeklemeIndirimi(state));
  if (etkilesimId === "es_hediye" || etkilesimId === "cocuk_hediye") {
    state.omur_hediye_sayisi = (state.omur_hediye_sayisi ?? 0) + 1; // "Hediye Ağı" amacı
  }

  const kimAdi =
    tanim.hedef === "cocuk" && hedefCocuk ? hedefCocuk.isim : state.es_adi ?? "";
  const sablon = AILE_ETKILESIM_MESAJLARI[etkilesimId] ?? "{0} ile vakit geçirdin.";
  let mesaj = T(state.dil, sablon, [kimAdi]);
  if (!tam) mesaj += " " + T(state.dil, "Ama bugün pek keyifli değildi; etkisi az oldu.");

  await oturumKaydet(state);
  return { state, tam, mesaj };
}

interface AileTalepSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** Bekleyen aile talebini yanıtlar: kabul → para düşer + ilişki artar; ret → ilişki + mutluluk düşer. Turu tüketmez. */
export async function aileTalebiKararlastir(id: string, karar: "kabul" | "ret"): Promise<AileTalepSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const talep = state.aile_talep;
  if (!talep) throw new Error("Bekleyen bir talep yok.");
  if (karar !== "kabul" && karar !== "ret") throw new Error("Geçersiz karar.");

  const hedefCocuk =
    talep.kimden === "cocuk" && talep.cocukIndex != null ? state.cocuklar[talep.cocukIndex] : null;

  if (karar === "kabul") {
    if (state.para < talep.tutar) throw new Error("Bunu karşılayacak paran yok.");
    state.para = paraYuvarla(state.para - talep.tutar);
    if (talep.kimden === "es" && state.es_adi) state.es_puani += 14;
    else if (hedefCocuk && hedefCocuk.yasiyor) {
      hedefCocuk.iliski = (typeof hedefCocuk.iliski === "number" ? hedefCocuk.iliski : 60) + 16;
    }
    state.mutluluk += 4;
  } else {
    if (talep.kimden === "es" && state.es_adi) state.es_puani -= 10;
    else if (hedefCocuk && hedefCocuk.yasiyor) {
      hedefCocuk.iliski = (typeof hedefCocuk.iliski === "number" ? hedefCocuk.iliski : 60) - 12;
    }
    state.mutluluk -= 3;
  }
  clampStats(state);
  state.aile_talep = null;

  const mesaj =
    karar === "kabul"
      ? T(state.dil, "{0} istediğini aldı; çok mutlu oldu.", [talep.kimAdi])
      : T(state.dil, "{0}'e hayır dedin; aranıza bir kırgınlık girdi.", [talep.kimAdi]);
  await oturumKaydet(state);
  return { state, kabul: karar === "kabul", mesaj };
}

// ---------------------------------------------------------------------------
// Kariyer sayfası: Yönetimle Bağlar (§35)
// Aile ekranıyla aynı desen — hiçbiri turu TÜKETMEZ, oturumKaydet ile biter.
// İki ilişki hattı: "yonetici" (state.yonetim_iliski) + "patron" (state.patron_iliski).
// ---------------------------------------------------------------------------

type YonetimHat = "yonetici" | "patron";

function yonetimIliskiOku(state: CharacterState, hat: YonetimHat): number {
  return hat === "yonetici" ? state.yonetim_iliski : state.patron_iliski;
}
function yonetimIliskiYaz(state: CharacterState, hat: YonetimHat, deger: number): void {
  const v = Math.max(0, Math.min(100, deger));
  if (hat === "yonetici") state.yonetim_iliski = v;
  else state.patron_iliski = v;
}

interface YonetimEtkilesimTabani {
  id: "bagis" | "yalan" | "hizmet";
  ikon: string;
  cooldownYil: number;
  /** Yalnız "bagis": oyuncunun seçtiği para tutarları (enflasyonsuz taban) + para→ilişki böleni (tutar/bolen = ilişki kazancı). */
  bagisKademeleri?: number[];
  bagisBolen?: number;
  /** Verilirse bağış ilişki kazancı kademe sırasına göre bu listeden gelir (bagisBolen yerine). */
  bagisKazanclari?: number[];
  /** yalan/hizmet: sabit ilişki kazancı. */
  iliski?: number;
  ahlak?: number;
  mutluluk?: number;
  kariyerPuani?: number;
  /** "Yalan söyle" dalı: yakalanma ihtimali (0-1). */
  ifsaSansi?: number;
  /** İfşa olunca ilişki cezası (varsayılan 16; şehir yöneticisi tablosunda 5). */
  ifsaIliski?: number;
  /** v11: oyuncunun seçtiği alt seçenekler (yalnız şehir yöneticisi tablosu; yoksa `taban` kendisi uygulanır). */
  varyantlar?: YonetimVaryanti[];
}

/** Övgü / hizmet alt seçeneği: taban etkilerin üstüne yazar. Para taban (enflasyonla çarpılır, negatif = maliyet). */
interface YonetimVaryanti {
  id: string;
  iliski: number;
  ahlak?: number;
  mutluluk?: number;
  kariyerPuani?: number;
  sohret?: number;
  para?: number;
  ifsaSansi?: number;
  /** Başarı mesajı (TR kalıp; {0} = otorite adı). */
  mesaj: string;
}

/**
 * Etkileşimler artık HAT'a göre ayrı ayarlanır (kullanıcı: "kralı etkilemek aşırı
 * pahalı ve zor olsun, işle ilgili kişi aynı seviyede kalsın"). Bağış + hediye
 * TEK "bagis" etkileşiminde birleşti; oyuncu tutarı kendisi seçer.
 * Cooldown anahtarı `${hat}:${id}`.
 */
const YONETIM_ETKILESIMLERI: Record<YonetimHat, YonetimEtkilesimTabani[]> = {
  patron: [
    { id: "bagis", ikon: "💰", cooldownYil: 2, bagisKademeleri: [8, 18, 40], bagisBolen: 2.6 },
    { id: "yalan", ikon: "🗣️", cooldownYil: 3, iliski: 11, ahlak: -6, mutluluk: -4, ifsaSansi: 0.25 },
    { id: "hizmet", ikon: "🤝", cooldownYil: 2, iliski: 6, kariyerPuani: 3, mutluluk: -1 },
  ],
  // Kral/hükümdar: ~5-6 kat daha pahalı (aynı ilişki puanı için) + yağcılık çok
  // daha kolay ifşa olur + hizmetini pek takmaz.
  yonetici: [
    { id: "bagis", ikon: "💰", cooldownYil: 4, bagisKademeleri: [45, 100, 220], bagisBolen: 15 },
    { id: "yalan", ikon: "🗣️", cooldownYil: 4, iliski: 8, ahlak: -6, mutluluk: -4, ifsaSansi: 0.4 },
    { id: "hizmet", ikon: "🤝", cooldownYil: 3, iliski: 4, kariyerPuani: 2, mutluluk: -2 },
  ],
};

/** İşletmeli mesleklerin tek otoritesi: şehir yöneticisi (§45) — hediye +5/+10/+18, hizmet +7, yağcılık +8 (ifşa: ilişki −5, şöhret −4). */
const SEHIR_YONETICISI_ETKILESIMLERI: YonetimEtkilesimTabani[] = [
  { id: "bagis", ikon: "💰", cooldownYil: 4, bagisKademeleri: [45, 100, 220], bagisKazanclari: [5, 10, 18] },
  {
    id: "yalan",
    ikon: "💬",
    cooldownYil: 4,
    iliski: 7,
    ahlak: -3,
    mutluluk: -3,
    ifsaSansi: 0.3,
    ifsaIliski: 5,
    varyantlar: [
      { id: "ovgu_adalet", iliski: 7, ahlak: -3, mutluluk: -3, ifsaSansi: 0.25, mesaj: "{0}'in adaletini göklere çıkardın; kulağına hoş geldi." },
      { id: "ovgu_comertlik", iliski: 7, ahlak: -4, mutluluk: -4, sohret: 1, ifsaSansi: 0.35, mesaj: "{0}'in cömertliğini herkese anlattın; adın da onunla anıldı." },
      { id: "ovgu_katki", iliski: 6, ahlak: -2, mutluluk: -2, kariyerPuani: 1, ifsaSansi: 0.15, mesaj: "{0}'in şehre katkısını içtenlikle överek anlattın; sözlerin ağırlık taşıdı." },
    ],
  },
  {
    id: "hizmet",
    ikon: "🤝",
    cooldownYil: 3,
    iliski: 6,
    kariyerPuani: 2,
    mutluluk: -3,
    varyantlar: [
      { id: "hizmet_nakliye", iliski: 6, kariyerPuani: 3, mutluluk: -3, mesaj: "{0} için ulaklık ve nakliye işi gördün; seni not etti." },
      { id: "hizmet_danismanlik", iliski: 6, kariyerPuani: 1, ahlak: 1, mutluluk: -3, mesaj: "{0}'e işi hakkında danışmanlık yaptın; fikirlerin dinlendi." },
      { id: "hizmet_ziyafet", iliski: 6, sohret: 1, para: -8, mutluluk: -3, mesaj: "{0} adına bir ziyafet verdin; sofra konuşuldu." },
    ],
  },
];

function yonetimEtkilesimTablosu(state: CharacterState, hat: YonetimHat): YonetimEtkilesimTabani[] {
  return hat === "yonetici" && isletmeMeslegiMi(state.meslek) ? SEHIR_YONETICISI_ETKILESIMLERI : YONETIM_ETKILESIMLERI[hat];
}

function yonetimEtkilesimBul(state: CharacterState, hat: YonetimHat, id: string): YonetimEtkilesimTabani | undefined {
  return yonetimEtkilesimTablosu(state, hat).find((t) => t.id === id);
}

/** Otoriteden alınan süreli imtiyaz (varsayılan 5 yıl, bugün dahil). */
function imtiyazVer(state: CharacterState, id: string, yil = 5): void {
  if (!state.isletme) return;
  state.isletme.imtiyazlar = { ...(state.isletme.imtiyazlar ?? {}), [id]: state.yil + yil - 1 };
}

interface YonetimIstekTanimi {
  id: string;
  hat: YonetimHat;
  minIliski: number;
  iliskiBedeli: number;
  cooldownYil: number;
  tabanSans: number;
  /** Yalnız bu mesleklerde listelenir (yoksa herkes). */
  meslekler?: string[];
  /** Başarısız istekten sonra (kısa) cooldown; yoksa `cooldownYil`. */
  basarisizCooldownYil?: number;
  /** İşletmeli mesleklerin şehir yöneticisi istekleri: şans SABİT (`tabanSans`, 56–66), ilişkiden/başka hiçbir şeyden etkilenmez; yalnız rüşvet `rusvetBonus` kadar artırır. */
  sehirSansi?: boolean;
  /** Rüşvet verilirse eklenen sabit şans (puan, 17–21). Bedeli yalnız ahlak −5. */
  rusvetBonus?: number;
  kullanilabilir?: (state: CharacterState) => boolean;
  uygula: (state: CharacterState, enflasyon: number) => void;
}

const ISLETMELI_MESLEKLER = ["Tüccar", "Zanaatkâr", "Din Adamı"];
const ESKI_MESLEKLER = ["Asker"];

/** Bir isteğin kullanıcının mesleği için geçerli olup olmadığı. */
function istekMeslegeUygunMu(tanim: YonetimIstekTanimi, meslek: string): boolean {
  return !tanim.meslekler || tanim.meslekler.includes(meslek);
}

function PAZAR_ADLARI_VAR(state: CharacterState): boolean {
  return !!pazarAdlariGetir(state.meslek);
}

function enCokSatanHat(state: CharacterState): string | null {
  const acik = (state.isletme?.hatlar ?? []).filter((h) => h.acik);
  const liste = acik.length > 0 ? acik : state.isletme?.hatlar ?? [];
  if (liste.length === 0) return null;
  return [...liste].sort((a, b) => b.son_satis - a.son_satis)[0].id;
}

function enGucluRakibeDarbe(state: CharacterState, enflasyon: number): void {
  const hedef = [...state.rakipler].filter((r) => !r.yenildi).sort((a, b) => b.musteri - a.musteri)[0];
  if (hedef) rakipMusteriKir(state, hedef.ad, 0.24, enflasyon);
}

const SEHIR_ISTEKLERI: YonetimIstekTanimi[] = [
  {
    id: "vergi_indirimi", hat: "yonetici", minIliski: 70, iliskiBedeli: 24, cooldownYil: 10, basarisizCooldownYil: 4,
    tabanSans: 60, meslekler: ISLETMELI_MESLEKLER, sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => {
      state.vergi_carpan = 0.5;
      state.vergi_carpan_bitis_yili = state.yil + 9;
    },
  },
  {
    id: "rakibe_darbe", hat: "yonetici", minIliski: 80, iliskiBedeli: 28, cooldownYil: 8, tabanSans: 56,
    meslekler: ISLETMELI_MESLEKLER, sehirSansi: true, rusvetBonus: 20,
    kullanilabilir: (state) => state.rakipler.some((r) => !r.yenildi),
    uygula: (state, enflasyon) => enGucluRakibeDarbe(state, enflasyon),
  },
  {
    id: "sicil_temizligi", hat: "yonetici", minIliski: 80, iliskiBedeli: 30, cooldownYil: 12, tabanSans: 58,
    meslekler: ISLETMELI_MESLEKLER, sehirSansi: true, rusvetBonus: 19,
    kullanilabilir: (state) => state.suc_seviyesi >= 20,
    uygula: (state) => {
      state.suc_seviyesi = Math.max(10, state.suc_seviyesi - 40);
    },
  },
  {
    id: "kredi_kefaleti", hat: "yonetici", minIliski: 72, iliskiBedeli: 20, cooldownYil: 8, tabanSans: 66,
    meslekler: ISLETMELI_MESLEKLER, sehirSansi: true, rusvetBonus: 17,
    kullanilabilir: (state) => state.kredi != null,
    uygula: (state) => {
      if (state.kredi) {
        state.kredi.odenmeyenTaksit = 0;
        state.kredi.faizOrani = Math.round(state.kredi.faizOrani * 0.8 * 1000) / 1000;
      }
    },
  },
  {
    id: "is_baglantisi", hat: "yonetici", minIliski: 70, iliskiBedeli: 20, cooldownYil: 6, tabanSans: 64,
    meslekler: ISLETMELI_MESLEKLER, sehirSansi: true, rusvetBonus: 17,
    uygula: (state, enflasyon) => {
      state.para = paraYuvarla(state.para + (20 + Math.floor(Math.random() * 21)) * enflasyon);
      state.kariyer_puani += 6;
    },
  },
  // Tüccar'a özel
  {
    id: "pazar_imtiyazi", hat: "yonetici", minIliski: 74, iliskiBedeli: 26, cooldownYil: 10, tabanSans: 61,
    meslekler: ["Tüccar"], sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => imtiyazVer(state, "pazar_imtiyazi"),
  },
  {
    id: "gumruk_muafiyeti", hat: "yonetici", minIliski: 76, iliskiBedeli: 25, cooldownYil: 10, tabanSans: 62,
    meslekler: ["Tüccar"], sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => imtiyazVer(state, "gumruk_muafiyeti"),
  },
  {
    id: "tekel_ruhsati", hat: "yonetici", minIliski: 80, iliskiBedeli: 30, cooldownYil: 12, tabanSans: 57,
    meslekler: ["Tüccar"], sehirSansi: true, rusvetBonus: 21,
    uygula: (state) => {
      imtiyazVer(state, "tekel_ruhsati");
      if (state.isletme) state.isletme.tekel_hat = enCokSatanHat(state);
    },
  },
  // Din Adamı'na özel
  {
    id: "vakif_muafiyeti", hat: "yonetici", minIliski: 74, iliskiBedeli: 25, cooldownYil: 10, tabanSans: 62,
    meslekler: ["Din Adamı"], sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => imtiyazVer(state, "vakif_muafiyeti"),
  },
  {
    id: "kutsal_gun_imtiyazi", hat: "yonetici", minIliski: 74, iliskiBedeli: 26, cooldownYil: 10, tabanSans: 61,
    meslekler: ["Din Adamı"], sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => imtiyazVer(state, "kutsal_gun_imtiyazi"),
  },
  {
    id: "bagis_izni", hat: "yonetici", minIliski: 78, iliskiBedeli: 22, cooldownYil: 8, tabanSans: 65,
    meslekler: ["Din Adamı"], sehirSansi: true, rusvetBonus: 17,
    uygula: (state, enflasyon) => {
      state.para = paraYuvarla(state.para + (15 + Math.floor(Math.random() * 11)) * enflasyon);
      musteriEkleTam(state, 0.01 * (state.pazar_musteri ?? 0));
    },
  },
  // Zanaatkâr'a özel
  {
    id: "hammadde_tahsisi", hat: "yonetici", minIliski: 74, iliskiBedeli: 25, cooldownYil: 10, tabanSans: 62,
    meslekler: ["Zanaatkâr"], sehirSansi: true, rusvetBonus: 18,
    uygula: (state) => imtiyazVer(state, "hammadde_tahsisi"),
  },
  {
    id: "atolye_ruhsati", hat: "yonetici", minIliski: 76, iliskiBedeli: 26, cooldownYil: 10, tabanSans: 60,
    meslekler: ["Zanaatkâr"], sehirSansi: true, rusvetBonus: 19,
    uygula: (state) => imtiyazVer(state, "atolye_ruhsati"),
  },
  {
    id: "resmi_siparis", hat: "yonetici", minIliski: 78, iliskiBedeli: 22, cooldownYil: 8, tabanSans: 65,
    meslekler: ["Zanaatkâr"], sehirSansi: true, rusvetBonus: 17,
    uygula: (state, enflasyon) => {
      state.para = paraYuvarla(state.para + (15 + Math.floor(Math.random() * 11)) * enflasyon);
      musteriEkleTam(state, 0.01 * (state.pazar_musteri ?? 0));
    },
  },
];

const ESKI_YONETIM_ISTEKLERI: YonetimIstekTanimi[] = [
  // Yönetici (kral) istekleri: yüksek eşik + ağır ilişki bedeli + düşük şans +
  // uzun cooldown. "Kralı ikna etmek zordur."
  {
    id: "vergi_kayirma",
    hat: "yonetici",
    meslekler: ESKI_MESLEKLER,
    minIliski: 75,
    iliskiBedeli: 26,
    cooldownYil: 14,
    tabanSans: 40,
    uygula: (state) => maasCarpaniUygula(state, 1.07),
  },
  {
    id: "sicil_temizligi",
    hat: "yonetici",
    meslekler: ESKI_MESLEKLER,
    minIliski: 80,
    iliskiBedeli: 32,
    cooldownYil: 16,
    tabanSans: 36,
    kullanilabilir: (state) => state.suc_seviyesi >= 20,
    uygula: (state) => {
      state.suc_seviyesi = Math.max(10, state.suc_seviyesi - 40);
    },
  },
  {
    id: "terfi_destegi",
    hat: "yonetici",
    meslekler: ESKI_MESLEKLER,
    minIliski: 72,
    iliskiBedeli: 24,
    cooldownYil: 14,
    tabanSans: 42,
    uygula: (state) => {
      state.kariyer_puani += 18 + Math.floor(Math.random() * 9);
    },
  },
  {
    id: "rakibe_darbe",
    hat: "yonetici",
    meslekler: ESKI_MESLEKLER,
    minIliski: 82,
    iliskiBedeli: 30,
    cooldownYil: 12,
    tabanSans: 38,
    kullanilabilir: (state) => state.rakipler.some((r) => !r.yenildi),
    uygula: (state, enflasyon) => {
      const hedef = [...state.rakipler]
        .filter((r) => !r.yenildi)
        .sort((a, b) => b.musteri - a.musteri)[0];
      if (hedef) rakipMusteriKir(state, hedef.ad, 0.24, enflasyon);
    },
  },
  {
    id: "sermaye_destegi",
    hat: "patron",
    meslekler: ESKI_MESLEKLER,
    minIliski: 60,
    iliskiBedeli: 18,
    cooldownYil: 10,
    tabanSans: 65,
    uygula: (state, enflasyon) => {
      if (state.meslek === "Asker") {
        state.ordu_techizat_seviyesi = Math.min(100, state.ordu_techizat_seviyesi + 10);
      } else if (state.meslek === "Tüccar") {
        state.ticaret_sermaye += Math.round(15 * enflasyon);
      } else if (state.meslek === "Din Adamı") {
        state.nufuz += 8;
      } else if (state.meslek === "Zanaatkâr") {
        // Diğer 3 meslek için var olan bu istek Zanaatkâr'da hiçbir dalı
        // eşleşmediği için sessizce etkisizdi — oyuncu ilişki bedelini ödeyip
        // hiçbir şey almıyordu. uretim_kapasitesi zaten olay kaynaklı çok kıt
        // (bkz. hayatAmaclari.ts "usta_eli" notu); buraya da bağlandı.
        state.uretim_kapasitesi = Math.min(100, (state.uretim_kapasitesi ?? 0) + 10);
      }
    },
  },
  {
    id: "zam",
    hat: "patron",
    meslekler: ESKI_MESLEKLER,
    minIliski: 55,
    iliskiBedeli: 15,
    cooldownYil: 10,
    tabanSans: 70,
    uygula: (state) => maasCarpaniUygula(state, 1.06),
  },
  {
    id: "kredi_kefaleti",
    hat: "patron",
    meslekler: ESKI_MESLEKLER,
    minIliski: 60,
    iliskiBedeli: 20,
    cooldownYil: 12,
    tabanSans: 65,
    kullanilabilir: (state) => state.kredi != null,
    uygula: (state) => {
      if (state.kredi) {
        state.kredi.odenmeyenTaksit = 0;
        state.kredi.faizOrani = Math.round(state.kredi.faizOrani * 0.8 * 1000) / 1000;
      }
    },
  },
  {
    id: "is_baglantisi",
    hat: "patron",
    meslekler: ESKI_MESLEKLER,
    minIliski: 55,
    iliskiBedeli: 14,
    cooldownYil: 8,
    tabanSans: 70,
    uygula: (state, enflasyon) => {
      state.para = paraYuvarla(state.para + (20 + Math.floor(Math.random() * 21)) * enflasyon);
      state.kariyer_puani += 6;
    },
  },
];

const YONETIM_ISTEKLERI: YonetimIstekTanimi[] = [...SEHIR_ISTEKLERI, ...ESKI_YONETIM_ISTEKLERI];

function yonetimIstekBul(state: CharacterState, id: string): YonetimIstekTanimi | undefined {
  return YONETIM_ISTEKLERI.find((t) => t.id === id && istekMeslegeUygunMu(t, state.meslek));
}

/** "bagis" kademelerini enflasyonla ölçekleyip oyuncuya gösterilecek tutarlara çevirir. */
function yonetimBagisKademeleri(state: CharacterState, hat: YonetimHat): number[] {
  const taban = yonetimEtkilesimBul(state, hat, "bagis");
  const enf = enflasyonCarpani(state);
  return (taban?.bagisKademeleri ?? []).map((k) => Math.max(1, paraYuvarla(k * enf)));
}

function yonetimIstekSansi(tanim: YonetimIstekTanimi, iliski: number, rusvet = false): number {
  if (tanim.sehirSansi) {
    return tanim.tabanSans + (rusvet ? tanim.rusvetBonus ?? 0 : 0);
  }
  // Yönetici (kral) hattında ilişki avantajı çok daha yavaş şansa dönüşür ve tavan düşük.
  const egim = tanim.hat === "yonetici" ? 0.4 : 1;
  const tavan = tanim.hat === "yonetici" ? 72 : 90;
  const bonus = (iliski - tanim.minIliski) * egim;
  return Math.round(Math.min(tavan, Math.max(15, tanim.tabanSans + bonus)));
}

function yonetimIstekAcikMi(state: CharacterState, tanim: YonetimIstekTanimi): boolean {
  if (yonetimIliskiOku(state, tanim.hat) < tanim.minIliski) return false;
  if (tanim.kullanilabilir && !tanim.kullanilabilir(state)) return false;
  const kilit = state.yonetim_etkilesim_kilit[`${tanim.hat}:istek:${tanim.id}`];
  if (typeof kilit === "number" && state.yil < kilit) return false;
  return true;
}

export interface YonetimDurumu {
  yonetici: { unvan: string; ad: string; iliski: number; bagisKademeleri: number[] };
  patron: { unvan: string; ad: string; iliski: number; bagisKademeleri: number[] };
  /** İşletmeli mesleklerde yalnız şehir yöneticisi (yonetici hattı) vardır; patron/lonca hattı gizlenir. */
  tekOtorite: boolean;
  etkilesimler: { id: string; hat: YonetimHat; ikon: string; varyantlar: string[] }[];
  istekler: {
    id: string;
    hat: YonetimHat;
    minIliski: number;
    acik: boolean;
    iliskiBedeli: number;
    tahminiSans: number;
    /** Rüşvetle eklenen sabit şans (puan); rüşvet yoksa null. */
    rusvetBonus: number | null;
  }[];
  /** Etkileşim/istek kilit anahtarı → tekrar açılacağı oyun yılı. */
  kilitler: Record<string, number>;
  /** "Çok sık üstüne gitme" sayacı; ≥3 iken etkileşimler ters tepebilir. */
  bikkinlik: number;
  talep: CharacterState["yonetim_talep"];
  guncelYil: number;
  para: number;
  paraBirimi: string;
}

/** Kariyer sayfası "Yönetim" bölümünün ihtiyaç duyduğu her şey. Turu tüketmez. */
export async function yonetimDurumGetir(id: string): Promise<YonetimDurumu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const yon = yoneticiBilgisi(state);
  const pat = patronBilgisi(state);
  return {
    yonetici: {
      unvan: yon.unvan,
      ad: yon.ad,
      iliski: Math.round(state.yonetim_iliski),
      bagisKademeleri: yonetimBagisKademeleri(state, "yonetici"),
    },
    patron: {
      unvan: pat.unvan,
      ad: pat.ad,
      iliski: Math.round(state.patron_iliski),
      bagisKademeleri: yonetimBagisKademeleri(state, "patron"),
    },
    tekOtorite: isletmeMeslegiMi(state.meslek),
    etkilesimler: (isletmeMeslegiMi(state.meslek) ? (["yonetici"] as YonetimHat[]) : (["yonetici", "patron"] as YonetimHat[])).flatMap((hat) =>
      yonetimEtkilesimTablosu(state, hat).map((t) => ({ id: `${hat}:${t.id}`, hat, ikon: t.ikon, varyantlar: (t.varyantlar ?? []).map((v) => v.id) }))
    ),
    istekler: YONETIM_ISTEKLERI.filter((t) => istekMeslegeUygunMu(t, state.meslek)).map((tanim) => ({
      id: tanim.id,
      hat: tanim.hat,
      minIliski: tanim.minIliski,
      acik: yonetimIstekAcikMi(state, tanim),
      iliskiBedeli: tanim.iliskiBedeli,
      tahminiSans: yonetimIstekSansi(tanim, yonetimIliskiOku(state, tanim.hat)),
      rusvetBonus: tanim.sehirSansi && isletmeMeslegiMi(state.meslek) ? tanim.rusvetBonus ?? null : null,
    })),
    kilitler: { ...state.yonetim_etkilesim_kilit },
    bikkinlik: state.yonetim_yakin_etkilesim ?? 0,
    talep: state.yonetim_talep
      ? {
          ...state.yonetim_talep,
          kimAdi: state.yonetim_talep.kimden === "yonetici" ? yon.ad : pat.ad,
          kalem: T(state.dil, state.yonetim_talep.kalem),
        }
      : null,
    guncelYil: state.yil,
    para: state.para,
    paraBirimi: state.para_birimi,
  };
}

interface YonetimEtkilesimSonucu {
  state: CharacterState;
  tam: boolean;
  mesaj: string;
}

/**
 * Bir yönetim etkileşimi (bağış / yağcılık / hizmet) — turu TÜKETMEZ.
 * Bağış birleşik: `kademe` oyuncunun seçtiği (enflasyonlu) para tutarı.
 * "Çok sık üstüne gitme" → `yonetim_yakin_etkilesim` ≥3 iken ters tepme olasılığı.
 */
export async function yonetimEtkilesimYap(
  id: string,
  etkilesimId: string,
  kademe?: number,
  varyantId?: string
): Promise<YonetimEtkilesimSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken bununla ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bununla ilgilenemezsin.");

  const parcalar = etkilesimId.split(":");
  if (parcalar.length !== 2) throw new Error("Böyle bir etkileşim yok.");
  const [hatRaw, tabanId] = parcalar;
  const hat = hatRaw as YonetimHat;
  if (hat !== "yonetici" && hat !== "patron") throw new Error("Geçersiz hat.");
  const taban = yonetimEtkilesimBul(state, hat, tabanId);
  if (!taban) throw new Error("Böyle bir etkileşim yok.");

  const kilitYili = state.yonetim_etkilesim_kilit[etkilesimId];
  if (typeof kilitYili === "number" && state.yil < kilitYili) {
    throw new Error("Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.");
  }

  // v11: varyantı olan etkileşimde oyuncu bir alt seçenek seçer (yoksa ilki); etkileri tabanın üstüne yazar.
  let varyant: YonetimVaryanti | undefined;
  if (taban.varyantlar?.length) {
    varyant = varyantId ? taban.varyantlar.find((v) => v.id === varyantId) : taban.varyantlar[0];
    if (!varyant) throw new Error("Geçersiz seçenek.");
  }
  const etki = varyant ? { ...taban, iliski: varyant.iliski, ahlak: varyant.ahlak ?? 0, mutluluk: varyant.mutluluk ?? 0, kariyerPuani: varyant.kariyerPuani ?? 0, ifsaSansi: varyant.ifsaSansi } : taban;

  const kimAdi = hat === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad;

  // Bağış: seçilen tutar geçerli kademelerden biri olmalı; parayı hemen düş.
  let bagisTutar = 0;
  if (tabanId === "bagis") {
    const kademeler = yonetimBagisKademeleri(state, hat);
    bagisTutar = kademeler.find((k) => k === kademe) ?? 0;
    if (bagisTutar <= 0) throw new Error("Geçerli bir bağış tutarı seç.");
    if (state.para < bagisTutar) throw new Error("Bu bağışı karşılayacak paran yok.");
    state.para = paraYuvarla(state.para - bagisTutar);
  }

  state.yonetim_etkilesim_kilit[etkilesimId] = state.yil + taban.cooldownYil;
  state.yonetim_yakin_etkilesim = (state.yonetim_yakin_etkilesim ?? 0) + 1;

  // Ters tepme: son turlarda çok fazla üstüne gidildiyse.
  const bikkinlik = Math.max(0, (state.yonetim_yakin_etkilesim ?? 0) - 3);
  const tersSansi = Math.min(0.6, bikkinlik * 0.18);
  if (bikkinlik > 0 && Math.random() < tersSansi) {
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 8);
    state.mutluluk -= 3;
    clampStats(state);
    await oturumKaydet(state);
    return {
      state,
      tam: false,
      mesaj: T(state.dil, "{0} sürekli kapısını çalmandan bıktı; bu kez ters tepti.", [kimAdi]),
    };
  }

  const tam = Math.random() < 0.8;
  const carpan = tam ? 1 : 0.5;

  // Negatif bedeller (ahlak/mutluluk) tam işler; pozitif kazanç yarım-zarla ölçeklenir.
  if (etki.ahlak) state.ahlak += etki.ahlak;
  if (etki.mutluluk) state.mutluluk += etki.mutluluk;

  let ifsaOldu = false;
  if (etki.ifsaSansi && Math.random() < etki.ifsaSansi) {
    ifsaOldu = true;
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - (etki.ifsaIliski ?? 16));
    state.un -= 4;
  } else if (tabanId === "bagis") {
    const idx = yonetimBagisKademeleri(state, hat).indexOf(bagisTutar);
    const taban_kazanc = taban.bagisKazanclari ? taban.bagisKazanclari[Math.max(0, idx)] : bagisTutar / (taban.bagisBolen ?? 3);
    const kazanc = Math.max(1, Math.round(taban_kazanc * carpan));
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + kazanc);
  } else {
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + Math.max(1, Math.round((etki.iliski ?? 0) * carpan)));
    if (etki.kariyerPuani) state.kariyer_puani += Math.max(1, Math.round(etki.kariyerPuani * carpan));
  }
  if (varyant && !ifsaOldu) {
    if (varyant.sohret) state.un += varyant.sohret;
    if (varyant.para) state.para = paraYuvarla(state.para + varyant.para * enflasyonCarpani(state));
  }
  clampStats(state);

  let mesaj: string;
  if (ifsaOldu) {
    mesaj = T(state.dil, "{0} yağcılığını fark etti; güveni sarsıldı.", [kimAdi]);
  } else if (tabanId === "bagis") {
    mesaj = T(state.dil, "{0} bağışını memnuniyetle aldı.", [kimAdi]);
  } else if (varyant) {
    mesaj = T(state.dil, varyant.mesaj, [kimAdi]);
  } else if (tabanId === "yalan") {
    mesaj = T(state.dil, "{0}'e yağ çektin; hoşuna gitti ama içine sinmedi.", [kimAdi]);
  } else {
    mesaj = T(state.dil, "{0} için bir iş gördün; seni not etti.", [kimAdi]);
  }
  if (!tam && !ifsaOldu) mesaj += " " + T(state.dil, "Ama beklediğin kadar etkili olmadı.");

  await oturumKaydet(state);
  return { state, tam, mesaj };
}

interface YonetimIstekSonucu {
  state: CharacterState;
  basarili: boolean;
  mesaj: string;
}

/**
 * İlişki yüksekken açılan bir "istek" (iyilik) — ilişki harcar, zarlıdır. Turu
 * TÜKETMEZ. 2026-09 sonu sadeleştirmesi: eski "yalanla destekle" seçeneği
 * (şansı artırıp ahlak/mutluluk düşüren + ifşa riskli dal) kaldırıldı — tek
 * ve sade bir akış: iste, zar at, sonucu gör.
 */
export async function yonetimIstekYap(id: string, istekId: string, rusvet = false): Promise<YonetimIstekSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken istekte bulunamazsın.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken istekte bulunamazsın.");

  const tanim = yonetimIstekBul(state, istekId);
  if (!tanim) throw new Error("Böyle bir istek yok.");
  if (yonetimIliskiOku(state, tanim.hat) < tanim.minIliski) {
    throw new Error("Bunu istemek için ilişkin yeterince güçlü değil.");
  }
  if (tanim.kullanilabilir && !tanim.kullanilabilir(state)) {
    throw new Error("Şu an bu isteğin bir anlamı yok.");
  }
  const kilitAnahtari = `${tanim.hat}:istek:${tanim.id}`;
  const kilit = state.yonetim_etkilesim_kilit[kilitAnahtari];
  if (typeof kilit === "number" && state.yil < kilit) {
    throw new Error("Aynı iyiliği bu kadar sık isteyemezsin.");
  }

  const enflasyon = enflasyonCarpani(state);
  const iliskiOncesi = yonetimIliskiOku(state, tanim.hat);
  if (rusvet && !(tanim.sehirSansi && tanim.rusvetBonus)) throw new Error("Bu istekte rüşvet işe yaramaz.");
  const sans = yonetimIstekSansi(tanim, iliskiOncesi, rusvet);
  // Rüşvetin tek bedeli ahlak −5 (yakalanma/ifşa riski yok).
  if (rusvet) state.ahlak -= 5;
  const basarili = rollSuccess(sans);

  // İlişki bedeli: başarıda tam, başarısızda yarım.
  const bedel = basarili ? tanim.iliskiBedeli : Math.round(tanim.iliskiBedeli / 2);
  yonetimIliskiYaz(state, tanim.hat, yonetimIliskiOku(state, tanim.hat) - bedel);

  if (basarili) tanim.uygula(state, enflasyon);
  clampStats(state);

  state.yonetim_etkilesim_kilit[kilitAnahtari] = state.yil + (basarili ? tanim.cooldownYil : tanim.basarisizCooldownYil ?? tanim.cooldownYil);
  state.yonetim_yakin_etkilesim = (state.yonetim_yakin_etkilesim ?? 0) + 1;

  const kimAdi = tanim.hat === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad;
  const mesaj = basarili
    ? T(state.dil, "{0} isteğini yerine getirdi.", [kimAdi])
    : T(state.dil, "{0} bu sefer isteğini geri çevirdi.", [kimAdi]);

  await oturumKaydet(state);
  return { state, basarili, mesaj };
}

interface YonetimTalepSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** Bekleyen dayatılan bağış / sadakat talebini yanıtlar: kabul / ret / yalan. Turu TÜKETMEZ. */
/** Din Adamı: şehir yöneticisinin talebine Yap / Yapma. */
async function dinTalebiKararlastir(state: CharacterState, talep: YonetimTalep, yap: boolean): Promise<YonetimTalepSonucu> {
  const kimAdi = yoneticiBilgisi(state).ad;
  const aralik = ([a, b]: readonly [number, number] | readonly number[]) => a + Math.floor(Math.random() * (b - a + 1));
  const rakip = aktifRakip(state);
  let mesaj: string;
  if (yap) {
    if (talep.tur === "bagis") {
      if (state.para < talep.tutar) throw new Error("Bu bağışı karşılayacak paran yok.");
      state.para = paraYuvarla(state.para - talep.tutar);
    }
    if (talep.tur === "aciklama") {
      yonetimIliskiYaz(state, "yonetici", yonetimIliskiOku(state, "yonetici") + aralik(YAP_ACIKLAMA.otorite as unknown as number[]));
      state.ahlak += aralik(YAP_ACIKLAMA.ahlak as unknown as number[]);
      if (rakip) musteriAktar(state, "oyuncu", rakipGrubu(rakip.ad), state.meslek_musteri * -YAP_ACIKLAMA.inanan);
      else musteriKaydir(state, "oyuncu", state.meslek_musteri * YAP_ACIKLAMA.inanan);
      mesaj = T(state.dil, "{0} için açıklamayı yaptın; aranız pekişti ama halk seni yöneticinin adamı gördü.", [kimAdi]);
    } else {
      yonetimIliskiYaz(state, "yonetici", yonetimIliskiOku(state, "yonetici") + aralik(YAP_DIGER_OTORITE));
      mesaj = T(state.dil, "{0}'in talebini yerine getirdin; aranız pekişti.", [kimAdi]);
    }
    state.mutluluk -= 2;
  } else {
    if (talep.tur === "aciklama") {
      yonetimIliskiYaz(state, "yonetici", yonetimIliskiOku(state, "yonetici") + aralik(YAPMA_ACIKLAMA.otorite as unknown as number[]));
      state.un += YAPMA_ACIKLAMA.sohret;
      state.ahlak += YAPMA_ACIKLAMA.ahlak;
      musteriKaydir(state, "oyuncu", state.meslek_musteri * YAPMA_ACIKLAMA.inanan);
      mesaj = T(state.dil, "Açıklamayı yapmayı reddettin; {0} öfkelendi ama halk cesaretine saygı duydu.", [kimAdi]);
    } else {
      yonetimIliskiYaz(state, "yonetici", yonetimIliskiOku(state, "yonetici") + aralik(YAPMA_DIGER_OTORITE));
      state.un -= 3;
      mesaj = T(state.dil, "{0}'in talebini geri çevirdin; aranız soğudu.", [kimAdi]);
    }
    state.mutluluk -= 4;
  }
  clampStats(state);
  state.yonetim_talep = null;
  await oturumKaydet(state);
  return { state, kabul: yap, mesaj };
}

export async function yonetimTalebiKararlastir(
  id: string,
  karar: "kabul" | "ret" | "yalan"
): Promise<YonetimTalepSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const talep = state.yonetim_talep;
  if (!talep) throw new Error("Bekleyen bir talep yok.");
  if (karar !== "kabul" && karar !== "ret" && karar !== "yalan") throw new Error("Geçersiz karar.");
  const sehirYoneticisi = isletmeMeslegiMi(state.meslek);
  if (talep.kimden === "yonetici" && karar === "yalan" && !sehirYoneticisi) {
    throw new Error("Hükümdara yalan söyleyemezsin — sadece öde ya da kaç.");
  }

  if (state.meslek === "Din Adamı" && talep.kimden === "yonetici") {
    if (karar === "yalan") throw new Error("Yalan söyleyemezsin — ya yap ya yapma.");
    return dinTalebiKararlastir(state, talep, karar === "kabul");
  }

  const hat = talep.kimden;
  // Mesajlarda talebin üretildiği andaki ad değil, ŞU ANKİ kişi kullanılır (hükümdar
  // o arada değişmiş olabilir; eski kayıtlarda kimAdi "patronun" gibi jenerik bir söz).
  const kimAdi = hat === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad;
  let mesaj: string;

  if (karar === "kabul") {
    if (talep.tur === "bagis") {
      if (state.para < talep.tutar) throw new Error("Bu bağışı karşılayacak paran yok.");
      state.para = paraYuvarla(state.para - talep.tutar);
    }
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + 12);
    state.mutluluk -= 2;
    mesaj = T(state.dil, "{0}'in talebini yerine getirdin; aranız pekişti.", [kimAdi]);
  } else if (karar === "ret") {
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 16);
    state.mutluluk -= 4;
    state.un -= 3;
    if (hat === "yonetici" && !sehirYoneticisi) {
      // Kral için "reddetmek" yalnızca soğuk bir ilişki değil, kaçmaktır —
      // aranmayı "büyük suç" aralığında (20-26) artırır (2026-10 sınıf sistemi).
      state.suc_seviyesi = Math.min(100, state.suc_seviyesi + sucSinifiDegeri("buyuk"));
      sucArtisiKaydet(state);
      mesaj = T(state.dil, "Hükümdarın talebini reddedip kaçtın; muhafızlar peşine düştü, artık aranıyorsun.", []);
    } else {
      mesaj = T(state.dil, "{0}'in talebini geri çevirdin; aranız soğudu.", [kimAdi]);
    }
  } else {
    state.ahlak -= 5;
    state.mutluluk -= 4;
    if (Math.random() < 0.3) {
      yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 22);
      state.un -= 6;
      if (talep.tur === "bagis") state.para = paraYuvarla(state.para - talep.tutar);
      mesaj = T(state.dil, "{0} yalanını yakaladı; hem parayı verdin hem itibarını.", [kimAdi]);
    } else {
      yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 4);
      mesaj = T(state.dil, "\"Elim darda\" dedin; {0} homurdanarak kabul etti.", [kimAdi]);
    }
  }

  clampStats(state);
  state.yonetim_talep = null;
  await oturumKaydet(state);
  return { state, kabul: karar === "kabul", mesaj };
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
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken ekibinle ilgilenemezsin.");
  const index = state.ekip.findIndex((uye) => uye.id === ekipId);
  if (index === -1) throw new Error("Böyle bir ekip üyesi yok.");
  const [cikarilan] = state.ekip.splice(index, 1);
  state.ajan_gorevleri = (state.ajan_gorevleri ?? []).filter((g) => g.ajanId !== cikarilan.id);
  hayatOlayiEkle(state, "👋", `${cikarilan.isim} (${cikarilan.rol}) ekibinden kovuldu`);
  let mesaj = T(state.dil, "{0}'i ekibinden çıkardın; artık yıllık maaşını ödemiyorsun.", [cikarilan.isim]);
  // Çocuğunu ekipten kovmak aileye ağır gelir: ilişki düşer, davet bir daha açılmaz.
  const cocuk = cikarilan.cocuk_isim ? state.cocuklar.find((c) => c.isim === cikarilan.cocuk_isim) : undefined;
  if (cocuk) {
    cocuk.iliski = Math.max(0, (typeof cocuk.iliski === "number" ? cocuk.iliski : 60) + COCUK_KOV_ILISKI);
    cocuk.is_durumu = "reddetti";
    delete cocuk.ekip_id;
    state.mutluluk -= 3;
    clampStats(state);
    mesaj += " " + T(state.dil, "Çocuğunu kovmak aranızı ağır yaraladı.");
  }
  await oturumKaydet(state);
  return { state, mesaj };
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
  // Bayrağı `await`'ten ÖNCE kur: aynı oyun için paralel iki istek (farklı isimlerle) ikisi de
  // kontrolü geçip tabloya çift kayıt yazabiliyordu. Yazım başarısız olursa geri al.
  state.skoru_kaydedildi = true;
  let kayit;
  try {
    kayit = await skoruDbyeYaz(state, isim);
  } catch (err) {
    state.skoru_kaydedildi = false;
    throw err;
  }
  // Skor yazıldı; oturum kaydı patlarsa isteği başarısız saymayalım (istemci tekrar denemesin).
  try {
    await oturumKaydet(state);
  } catch (err) {
    console.error(`Skor sonrası oturum kaydı yazılamadı (${id}):`, err);
  }
  void metrikYaz({
    tur: "skor_kaydi",
    oturum_id: id,
    cag: state.cag,
    bolge: state.bolge,
    meslek: state.meslek,
    yas: state.yas,
    skor: hesaplaSkor(state),
  });
  return kayit;
}

interface YatirimSonucu {
  state: CharacterState;
  mesaj: string;
}

// ---------------------------------------------------------------------------
// Karanlık / illegal işler (eski "Kendi İşine Yatırım Yap" kartının yerini aldı)
// ---------------------------------------------------------------------------

export interface KotuIsKarti {
  id: string;
  simge: string;
  /** Yatkınlık kademesi uygulandıktan sonra oyuncuya gösterilen başarı şansı (5-95). */
  basariSansi: number;
  /** Bu aksiyonun başarılı dalının verebileceği yaklaşık para (enflasyonlu, taban); 0 ise para getirisi yok. */
  tahminiKazanc: number;
  /** Peşin maliyet (enflasyonlu); 0 ise yok. */
  maliyet: number;
  /** Rakip hedefliyor mu (etiket/anlatı için). */
  rakibeYonelik: boolean;
  /** İsimli bir rakibin gücünü ne kadar kırar (rakipYenilt ise 100). 0 ise kıramaz. */
  /** Başarıda rakibin müşterisinden alınan yüzde (0-100). */
  rakipKirmaYuzde: number;
  /** Başarıda kazanılan müşteri sayısı (0 ise yok). */
  musteriKazanci: number;
  /** Mesleğe özel iş mi (genel değil). */
  meslegeOzel: boolean;
  /** Bekleme süresi: tekrar çevrilebilmesine kalan oyun yılı (0 = hazır). */
  kalanYil: number;
  /** Bu işi yapabilecek ajan rolü (yoksa null — yalnız kendin). */
  ajanRolu: string | null;
  /** Yalnız ajana yaptırılabilir. */
  sadeceAjan: boolean;
  /** İşletmedeki herhangi bir çalışanın yapabildiği iş (§45). */
  calisanIsi: boolean;
}

/**
 * Karanlık işin başarı şansı: §40'taki kademe formülü (taban × (1 + yatkınlık
 * kademesinin zar oranı)). Kategori verilmemişse oyuncunun meslek kategorisi.
 */
/** Ajan işlerinde suç izi bir sınıf daha silik: buyuk/agir→orta, orta→kucuk, kucuk→kucuk. */
const SINIF_YARI: Record<SucSinifi, SucSinifi> = { kucuk: "kucuk", orta: "kucuk", buyuk: "orta", agir: "buyuk" };

function kotuIsBasariSansi(state: CharacterState, tanim: KotuIsTanimi): number {
  const kategori = tanim.yatkinlik ?? MESLEK_KATEGORI[state.meslek] ?? "sosyal";
  const oran = yatkinlikZarBonusOrani(state, kategori);
  return Math.round(Math.min(95, Math.max(5, tanim.basariSansi * (1 + oran) + hayvanKotuIsPuani(state, kategori) + sucBasariBonusu(state.suc_seviyesi))));
}

function kotuIsKalanYil(state: CharacterState, id: string): number {
  const acilis = (state.kotu_is_kilit ?? {})[id];
  return acilis !== undefined ? Math.max(0, acilis - state.yil) : 0;
}

/** Kariyer ekranındaki "Karanlık İşler" listesi için canlı şans/kazanç/bekleme önizlemesi. */
export async function kotuIsConfigGetir(id: string): Promise<KotuIsKarti[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  return uygunKotuIsler(state.meslek, state.cag).map((tanim) => ({
    id: tanim.id,
    simge: tanim.simge,
    basariSansi: kotuIsBasariSansi(state, tanim),
    tahminiKazanc: tanim.basarili.para ? Math.max(1, paraYuvarla(tanim.basarili.para * enflasyon)) : 0,
    maliyet: tanim.maliyet ? Math.max(1, paraYuvarla(tanim.maliyet * enflasyon)) : 0,
    rakibeYonelik: !!(tanim.rakipKirmaYuzde || tanim.rakipYenilt),
    rakipKirmaYuzde: tanim.rakipYenilt ? 100 : Math.round((tanim.rakipKirmaYuzde ?? 0) * 100),
    musteriKazanci: Math.round(((tanim.basarili.musteri ?? 0) * (state.pazar_musteri ?? 416)) / PAZAR_REF_MUSTERI),
    meslegeOzel: !!tanim.meslekler,
    kalanYil: kotuIsKalanYil(state, tanim.id),
    ajanRolu: tanim.ajanRolu ?? null,
    sadeceAjan: !!tanim.sadeceAjan,
    calisanIsi: !!tanim.calisanIsi && isletmeAktif(state),
  }));
}

export interface RakipKarti {
  ad: string;
  meslek: string;
  /** Rakibin pazar payı (0-100 tam sayı yüzde) ve müşterisi — "güç" oyuncuya gösterilmez. */
  pay: number;
  musteri: number;
  husumet: number;
  yenildi: boolean;
}

/** GorevEkrani "Rakiplerin" paneli + karanlık iş hedef seçimi için. */
export async function rakiplerGetir(id: string): Promise<RakipKarti[]> {
  const oturum = await oturumGetir(id);
  const state = oturum.state;
  return state.rakipler.map((r) => {
    const pay = r.yenildi ? 0 : rakipPayiHesapla(state, r.musteri);
    return {
      ad: r.ad,
      meslek: r.meslek,
      pay: Math.round(pay * 100),
      musteri: Math.round(pay * Math.max(0, state.pazar_musteri ?? 0) * 10) / 10,
      husumet: Math.round(r.husumet),
      yenildi: r.yenildi,
    };
  });
}

export interface PazarRakipSatiri {
  ad: string;
  /** 0-100 tam sayı yüzde. */
  pay: number;
  musteri: number;
  husumet: number;
}

/** Kariyer ekranı "Pazar" bölümü: paylar, müşteri sayıları, maaş etkisi, sıradaki rütbenin pazar şartı. "Güç" gösterilmez. */
export interface PazarDurumu {
  /** Meslek seçilmemişse false (diğer alanlar boş/0). */
  aktif: boolean;
  pazarAdi: string;
  simge: string;
  /** Oyuncunun pazar payı, 0-100 tam sayı yüzde. */
  pazarPayi: number;
  /** Oyuncunun müşteri sayısı ve toplam pazar büyüklüğü (işletmeli mesleklerde; diğerlerinde 0). */
  musteri: number;
  pazarMusteri: number;
  rakipler: PazarRakipSatiri[];
  /** İsimsiz küçük oyuncuların payı (0-100). */
  digerPay: number;
  /** Pazar payının maaşa etkisi (±yüzde). */
  maasEtkisi: number;
  /** Pazar payına bağlı yıllık kariyer puanı katkısı. */
  yillikKariyerPuani: number;
  /** Sıradaki rütbe bir pazar payı istiyorsa: hedef kademe + gereken yüzde; yoksa null. */
  rutbeSarti: { seviye: number; gerekliPay: number; karsilaniyor: boolean } | null;
  /** Yenilen rakibin yerine yenisinin geleceği yıla kalan süre (yoksa null). */
  yeniRakipKalanYil: number | null;
  /** Müşteri dağılımı (yuvarlanmış) ve son yıldaki değişimleri; Asker/Din Adamı istemcisi yalnız payı gösterir. */
  dagilim: { oyuncu: number; rakip: number; kucuk: number; oyuncuDegisim: number; rakipDegisim: number; kucukDegisim: number };
  /** Piyasa haberleri (en yeni önce, en çok 6): rakip hamleleri, küçük esnaf olayları. */
  haberler: PiyasaHaberi[];
}

export async function pazarDurumGetir(id: string): Promise<PazarDurumu> {
  const { state } = await oturumGetir(id);
  return pazarDurumuHesapla(state);
}

function dagilimOzeti(state: CharacterState): PazarDurumu["dagilim"] {
  const d = musteriDagilimi(state);
  const f = state.son_musteri_degisim;
  return {
    oyuncu: Math.round(d.oyuncu * 10) / 10,
    rakip: Math.round(d.rakip * 10) / 10,
    kucuk: Math.round(d.kucuk * 10) / 10,
    oyuncuDegisim: Math.round((f?.oyuncu ?? 0) * 10) / 10,
    rakipDegisim: Math.round((f?.rakip ?? 0) * 10) / 10,
    kucukDegisim: Math.round((f?.kucuk ?? 0) * 10) / 10,
  };
}

export function pazarDurumuHesapla(state: CharacterState): PazarDurumu {
  const adlar = pazarAdlariGetir(state.meslek);
  const dil = state.dil;
  if (!adlar) {
    return {
      aktif: false, pazarAdi: "", simge: "", pazarPayi: 0, musteri: 0, pazarMusteri: 0, rakipler: [],
      digerPay: 0, maasEtkisi: 0, yillikKariyerPuani: 0, rutbeSarti: null, yeniRakipKalanYil: null,
      dagilim: { oyuncu: 0, rakip: 0, kucuk: 0, oyuncuDegisim: 0, rakipDegisim: 0, kucukDegisim: 0 }, haberler: [],
    };
  }
  const pay = pazarPayiHesapla(state);
  const pazarM = Math.max(0, state.pazar_musteri ?? 0);
  const rakipler = state.rakipler
    .filter((r) => !r.yenildi)
    .map((r) => {
      const rp = rakipPayiHesapla(state, r.musteri);
      return { ad: r.ad, pay: Math.round(rp * 100), musteri: Math.round(rp * pazarM * 10) / 10, husumet: Math.round(r.husumet) };
    });
  const sonraki = state.rutbe_seviye + 1;
  const gerekli = rutbePazarPayiEsigi(state.meslek, sonraki);
  return {
    aktif: true,
    pazarAdi: K(dil, adlar.pazar),
    simge: adlar.simge,
    pazarPayi: Math.round(pay * 100),
    musteri: isletmeMeslegiMi(state.meslek) ? Math.round(musteriSayisi(state) * 10) / 10 : 0,
    pazarMusteri: isletmeMeslegiMi(state.meslek) ? pazarM : 0,
    rakipler,
    digerPay: Math.max(0, 100 - Math.round(pay * 100) - rakipler.reduce((t, r) => t + r.pay, 0)),
    maasEtkisi: Math.round((pazarMaasCarpani(pay) - 1) * 100),
    yillikKariyerPuani: Math.round(pay * PAZAR_KARIYER_PUANI_YILLIK * 10) / 10,
    rutbeSarti:
      gerekli !== undefined && sonraki <= 5
        ? { seviye: sonraki, gerekliPay: Math.round(gerekli * 100), karsilaniyor: pay >= gerekli }
        : null,
    yeniRakipKalanYil: state.rakip_yeni_yil != null ? Math.max(0, state.rakip_yeni_yil - state.yil) : null,
    dagilim: dagilimOzeti(state),
    haberler: state.piyasa_gunlugu ?? [],
  };
}

export interface AmacKarti {
  id: string;
  baslik: string;
  aciklama: string;
  zorluk: "normal" | "zor";
  bonus: number;
  kontrolAni: "herhangi" | "olumde";
  tamamlandi: boolean;
  tamamlanmaYili: number | null;
  /** Canlı ilerleme çubuğu (sayısal amaçlarda); boolean amaçlarda null → 0/100 göster. */
  mevcut: number | null;
  hedef: number | null;
}

export interface AmaclarDurumu {
  amaclar: AmacKarti[];
  /** Şu anki skor çarpanı = max(1, Σ tamamlanan bonuslar). */
  carpan: number;
}

/** Sağ panel "🎯 Amaçların" kartı + Görevin ekranı + ölüm ekranı için. Turu tüketmez. */
export async function amaclarGetir(id: string): Promise<AmaclarDurumu> {
  const { state } = await oturumGetir(id);
  const dil = state.dil === "en" ? "en" : "tr";
  const servet = netServetHesapla(state);
  const amaclar: AmacKarti[] = (state.hayat_amaclari ?? []).map((a) => {
    const tanim = amacTanimiGetir(a.id);
    const ilerleme = AMAC_ILERLEME[a.id];
    return {
      id: a.id,
      baslik: tanim ? tanim.baslik[dil] : a.id,
      aciklama: tanim ? tanim.aciklama[dil] : "",
      zorluk: a.zorluk,
      bonus: a.bonus,
      kontrolAni: a.kontrolAni,
      tamamlandi: a.tamamlandi,
      tamamlanmaYili: a.tamamlanmaYili ?? null,
      mevcut: ilerleme ? Math.round(ilerleme.metrik(state, servet)) : null,
      hedef: ilerleme ? ilerleme.hedef : null,
    };
  });
  return { amaclar, carpan: amacSkorCarpani(state) };
}

interface KotuIsSonucu {
  state: CharacterState;
  kazandi: boolean;
  mesaj: string;
  /** İş bir ajana verildi; sonucu bir sonraki yıl ilerlemesinde çözülecek. */
  beklemede?: boolean;
}

/**
 * Meslek pazarı: mesleğin kendi derinlik metriğini büyüten olay etkileri (Asker
 * teçhizat, Tüccar sermaye, Din Adamı nüfuz, Zanaatkâr üretim) pazardaki gücü de
 * artırır — artışın %25'i kadar. Yalnız pozitif artış, yalnız kendi meslek metriği.
 */
const MESLEK_METRIK_ALANI: Record<string, keyof SonucEtkisi> = {
  Asker: "ordu_techizat_artis",
  Zanaatkâr: "uretim_kapasitesi_artis",
};
/** KotuIsEtki.musteri değerleri bu pazar büyüklüğü referansıyla yazılmıştır; gerçek pazarda ölçeklenir. */
const PAZAR_REF_MUSTERI = 416;

function metrikGucKatkisiUygula(state: CharacterState, etki: SonucEtkisi): void {
  const alan = MESLEK_METRIK_ALANI[state.meslek];
  const artis = alan ? (etki[alan] as number | undefined) : undefined;
  if (artis && artis > 0) musteriEkleTam(state, artis * 0.75);
}

/** Bir KotuIsEtki dalını doğrudan state'e uygular (jitter yok, olay hattından geçmez). Bir anlatı eki döndürebilir. */
function kotuIsEtkiUygula(state: CharacterState, etki: KotuIsEtki, enflasyon: number, sucCarpani = 1): string | null {
  if (etki.para) state.para = paraYuvarla(state.para + etki.para * enflasyon);
  if (etki.un) state.un += etki.un;
  if (etki.ahlak) state.ahlak += etki.ahlak;
  if (etki.saglik) state.saglik += etki.saglik;
  if (etki.mutluluk) state.mutluluk += etki.mutluluk;
  if (etki.rakip_puani) state.rakip_puani += etki.rakip_puani;
  if (etki.suc_sinifi) {
    // Sınıf aralığından değer; vekille yaptırınca iz daha silik (sucCarpani).
    const artis = Math.round(sucSinifiDegeri(etki.suc_sinifi) * sucCarpani);
    state.suc_seviyesi = Math.min(100, Math.max(0, state.suc_seviyesi + artis));
    if (artis > 0) sucArtisiKaydet(state);
  }
  if (etki.kariyer_puani) state.kariyer_puani += etki.kariyer_puani;
  if (etki.musteri) musteriEkleTam(state, (etki.musteri * (state.pazar_musteri ?? PAZAR_REF_MUSTERI)) / PAZAR_REF_MUSTERI);
  if (etki.uretim_kapasitesi && state.meslek === "Zanaatkâr") {
    state.uretim_kapasitesi = Math.min(100, Math.max(0, state.uretim_kapasitesi + etki.uretim_kapasitesi));
  }
  if (etki.ordu_techizat && state.meslek === "Asker") {
    state.ordu_techizat_seviyesi = Math.min(100, Math.max(0, state.ordu_techizat_seviyesi + etki.ordu_techizat));
  }
  if (etki.yonetim_iliski) state.yonetim_iliski += etki.yonetim_iliski;
  if (etki.patron_iliski) state.patron_iliski += etki.patron_iliski;
  if (etki.gumruk_indirim_yil && state.isletme) state.isletme.gumruk_indirim_bitis = state.yil + etki.gumruk_indirim_yil;
  if (etki.kriz && !state.ulke.kriz) {
    state.ulke.kriz = { tur: etki.kriz.tur, bitisYili: state.yil + etki.kriz.sureYil };
    return etki.kriz.tur === "kitlik"
      ? T(state.dil, "Ambarları sen boşalttın; şehirde kıtlık başladı.")
      : T(state.dil, "Sokaklar karıştı; şehirde isyan çıktı.");
  }
  return null;
}

/**
 * Olay beklemeden tetiklenen karanlık iş aksiyonu (turu TÜKETMEZ). Zar atılır,
 * başarı/başarısız dalın etkileri doğrudan uygulanır. Başarısız dalda hapis
 * ("ortaya çıktın") ve nadiren ölüm riski vardır. Her işin kendi bekleme süresi
 * vardır (state.kotu_is_kilit).
 */
interface KotuIsSecenek {
  /** Rakip hedefleyen işlerde hedef rakibin adı. */
  hedefRakipAd?: string;
  /** İşi bir ajana ver (§43 Faz 2): ekipteki uygun roldeki ajanın id'si. Zar hemen atılmaz. */
  ajanId?: string;
}

export async function kotuIsYap(id: string, tur: string, secenek: KotuIsSecenek = {}): Promise<KotuIsSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!MESLEKLER.includes(state.meslek)) throw new Error("Önce bir meslek seçmelisin.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken bu işi çeviremezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bu işi çeviremezsin.");
  const tanim = kotuIsTanimiGetir(tur);
  if (!tanim || !uygunKotuIsler(state.meslek, state.cag).includes(tanim)) throw new Error("Geçersiz iş.");
  const kalan = kotuIsKalanYil(state, tanim.id);
  if (kalan > 0) throw new Error("Bu iş için ortalık henüz sakinleşmedi; biraz sonra yeniden deneyebilirsin.");

  const enflasyon = enflasyonCarpani(state);
  const dil = state.dil;
  const birim = state.para_birimi;

  const maliyet = tanim.maliyet ? Math.max(1, paraYuvarla(tanim.maliyet * enflasyon)) : 0;
  if (state.para < maliyet) throw new Error(`Yeterli paran yok (${maliyet} ${birim} gerekli).`);

  // Rakip hedefleme: yalnız rakip kıran işlerde ve geçerli/yenilmemiş bir rakip için.
  const rakipHedefli = !!(tanim.rakipKirmaYuzde || tanim.rakipYenilt);
  const hedefRakip = rakipHedefli
    ? state.rakipler.find((r) => r.ad === secenek.hedefRakipAd && !r.yenildi) ?? state.rakipler.find((r) => !r.yenildi)
    : undefined;

  // Ajana ver: zar şimdi atılmaz, görev bir sonraki yıl ilerlemesinde çözülür.
  if (secenek.ajanId || tanim.sadeceAjan) {
    const calisanIsi = !!tanim.calisanIsi && isletmeAktif(state);
    if (!tanim.ajanRolu && !calisanIsi) throw new Error("Bu işi kimseye yaptıramazsın; kendin çevirmelisin.");
    if (!secenek.ajanId) throw new Error(`Bu işi ancak tuttuğun bir ${tanim.ajanRolu} yapabilir.`);
    const ajan = state.ekip.find((e) => e.id === secenek.ajanId);
    if (!ajan) throw new Error("Böyle bir ekip üyesi yok.");
    if (!calisanIsi && ajan.rol !== tanim.ajanRolu) throw new Error(`Bu işe uygun bir ${tanim.ajanRolu} seçmelisin.`);
    if ((state.ajan_gorevleri ?? []).some((g) => g.ajanId === ajan.id)) throw new Error(`${ajan.isim} zaten bir işte.`);
    state.para = paraYuvarla(state.para - maliyet);
    state.kotu_is_kilit = { ...(state.kotu_is_kilit ?? {}), [tanim.id]: state.yil + tanim.cooldownYil };
    state.ajan_gorevleri = [
      ...(state.ajan_gorevleri ?? []),
      { ajanId: ajan.id, isId: tanim.id, hedefRakipAd: hedefRakip?.ad ?? null, verilisYili: state.yil },
    ];
    await oturumKaydet(state);
    return {
      state,
      kazandi: false,
      beklemede: true,
      mesaj: T(dil, "🕵️ {0} işi üstlendi: {1}. Sonucunu yıl dönerken öğreneceksin.", [ajan.isim, K(dil, KOTU_IS_ADLARI[tur] ?? tur)]),
    };
  }

  state.para = paraYuvarla(state.para - maliyet);
  state.kotu_is_kilit = { ...(state.kotu_is_kilit ?? {}), [tanim.id]: state.yil + tanim.cooldownYil };

  const sans = kotuIsBasariSansi(state, tanim);
  const kazandi = rollSuccess(sans);
  const dal: KotuIsEtki = kazandi ? tanim.basarili : tanim.basarisiz;
  // Yüksek yıldız yakalanma riskini de düşürür (%10/%20/%30 daha az).
  const riskCarpani = sucRiskCarpani(state.suc_seviyesi);
  const krizMesaji = kotuIsEtkiUygula(state, dal, enflasyon);

  // Eşin haberi olur: karanlık işler ilişkiyi anında zedeler.
  AS.esBarDusur(state, KOTU_IS_ES_ZARARI[tanim.id] ?? 0);

  const adi = K(dil, KOTU_IS_ADLARI[tur] ?? tur);
  let mesaj = kazandi ? T(dil, "{0}: işini gördün.", [adi]) : T(dil, "{0}: işler ters gitti.", [adi]);
  if (krizMesaji) mesaj += " " + krizMesaji;

  // Rakip gücü kır / rakibi saf dışı bırak: başarılı dalda hedef rakip.
  if (kazandi && hedefRakip) {
    const kirma = tanim.rakipYenilt ? 1 : tanim.rakipKirmaYuzde ?? 0;
    const kirSonucu = rakipMusteriKir(state, hedefRakip.ad, kirma, enflasyon);
    if (kirSonucu) mesaj += " " + kirSonucu.mesaj;
  } else if (hedefRakip) {
    // Başarısız da olsa rakip senin peşinde olduğunu anlar.
    hedefRakip.husumet = Math.min(100, hedefRakip.husumet + 12);
  }

  // Başarısız dalda "ortaya çıkma": hapis + (bazı işlerde) ölüm riski.
  if (!kazandi && dal.hapis_sansi && Math.random() < dal.hapis_sansi * riskCarpani) {
    etiketEkle(state, ["hapiste"]);
    if (state.hapis_ceza_kalan <= 0) {
      const ceza = hapisCezaSuresiHesapla(state.suc_seviyesi);
      state.hapis_ceza_kalan = ceza;
      state.hapis_ceza_toplam = ceza;
      state.hapis_tur_sayaci = 0;
    }
    hayatOlayiEkle(state, "⛓️", T(dil, "Karanlık bir iş sırasında enselendi"));
    mesaj += " " + T(dil, "Enselendin — kodesi boyladın.");
  }
  if (!kazandi && dal.olum_sansi && Math.random() * 100 < efektifOlumSansi(dal.olum_sansi, state.saglik)) {
    clampStats(state);
    checkDeath(state, true, ikiDilT("Çevirdiği karanlık bir iş sırasında öldü."));
  }

  if (kazandi && dal.para && dal.para > 0) {
    mesaj += " " + T(dil, "Kazanç: +{0} {birim}", [Math.max(1, paraYuvarla(dal.para * enflasyon))]).replace(/\{birim\}/g, birim);
  }
  if (kazandi && dal.musteri && dal.musteri > 0) {
    const adlar = pazarAdlariGetir(state.meslek);
    if (adlar) mesaj += " " + T(dil, "Pazar payın büyüdü.");
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, kazandi, mesaj };
}

// ---------------------------------------------------------------------------
// Ajanlar (§43 Faz 2, data/ajanlar.ts): ekipteki Hırsız/Kabadayı/Casus/Suikastçı
// karanlık işleri senin yerine çevirir; görev yıl ilerlerken çözülür.
// ---------------------------------------------------------------------------

/**
 * Ajanlara verilmiş görevleri çözer (sonucuUygulaVeIlerlet yıl bloğu, turda bir
 * kez). Başarıda işin etkisi uygulanır ama kişisel ahlak yükü yarıya, suç izi
 * yarıya iner (fiziksel işi o yaptı); sağlık/ölüm bedelini ajan öder. Başarısızlıkta
 * ajan yakalanabilir (ekipten düşer) ve sadakati düşükse seni ele verir.
 */
export function ajanGorevleriniCoz(state: CharacterState): string[] {
  const gorevler = state.ajan_gorevleri ?? [];
  if (gorevler.length === 0) return [];
  state.ajan_gorevleri = [];
  const enflasyon = enflasyonCarpani(state);
  const dil = state.dil;
  const mesajlar: string[] = [];

  for (const gorev of gorevler) {
    const ajan = state.ekip.find((e) => e.id === gorev.ajanId);
    const tanim = kotuIsTanimiGetir(gorev.isId);
    if (!ajan || !tanim) continue;
    const adi = K(dil, KOTU_IS_ADLARI[tanim.id] ?? tanim.id);
    const hedefRakip = gorev.hedefRakipAd
      ? state.rakipler.find((r) => r.ad === gorev.hedefRakipAd && !r.yenildi)
      : undefined;
    const kazandi = rollSuccess(ajanBasariSansi(tanim.basariSansi, ajan.gercekKalite));

    if (kazandi) {
      const b = tanim.basarili;
      const dal: KotuIsEtki = {
        ...b,
        saglik: undefined,
        olum_sansi: undefined,
        hapis_sansi: undefined,
        ahlak: b.ahlak ? Math.round(b.ahlak / 2) : undefined,
        suc_sinifi: b.suc_sinifi ? SINIF_YARI[b.suc_sinifi] : undefined,
      };
      let mesaj = T(dil, "🕵️ {0} işini gördü: {1}.", [ajan.isim, adi]);
      const kriz = kotuIsEtkiUygula(state, dal, enflasyon);
      if (kriz) mesaj += " " + kriz;
      if (hedefRakip && (tanim.rakipKirmaYuzde || tanim.rakipYenilt)) {
        const kirma = tanim.rakipYenilt ? 1 : tanim.rakipKirmaYuzde ?? 0;
        const kir = rakipMusteriKir(state, hedefRakip.ad, kirma, enflasyon);
        if (kir) mesaj += " " + kir.mesaj;
      }
      ajan.sadakat = Math.min(100, ajan.sadakat + AJAN_BASARI_SADAKAT);
      if (Math.random() < (100 - ajan.sadakat) / AJAN_SIZINTI_BOLEN) {
        state.suc_seviyesi = Math.min(100, state.suc_seviyesi + Math.round(sucSinifiDegeri(b.suc_sinifi ?? "kucuk") / 2));
        state.un = Math.max(0, state.un - 3);
        mesaj += " " + T(dil, "Ama meyhanede ağzından kaçırmış; adın fısıltılara karıştı.");
      }
      mesajlar.push(mesaj);
      continue;
    }

    // Başarısız: ajanın canı/özgürlüğü tehlikede; sana dönen yalnız itibar ve iz.
    const f = tanim.basarisiz;
    kotuIsEtkiUygula(
      state,
      {
        un: f.un,
        musteri: f.musteri,
        yonetim_iliski: f.yonetim_iliski,
        patron_iliski: f.patron_iliski,
        suc_sinifi: f.suc_sinifi ? SINIF_YARI[f.suc_sinifi] : undefined,
      },
      enflasyon
    );
    if (hedefRakip) hedefRakip.husumet = Math.min(100, hedefRakip.husumet + 12);
    let mesaj = T(dil, "🕵️ {0} işi beceremedi: {1}.", [ajan.isim, adi]);
    const oldu = !!f.olum_sansi && Math.random() * 100 < f.olum_sansi * 2;
    if (oldu || Math.random() < AJAN_YAKALANMA_IHTIMALI) {
      state.ekip = state.ekip.filter((e) => e.id !== ajan.id);
      if (oldu) {
        mesaj += " " + T(dil, "Geri dönmedi; cesedini sabah buldular.");
        hayatOlayiEkle(state, "⚰️", T(dil, "{0} bir işte öldü", [ajan.isim]));
      } else {
        mesaj += " " + T(dil, "Muhafızlar onu yakaladı.");
        hayatOlayiEkle(state, "⛓️", T(dil, "{0} yakalandı", [ajan.isim]));
        if (Math.random() < ((100 - ajan.sadakat) / 100) * AJAN_IHBAR_CARPANI) {
          state.suc_seviyesi = Math.min(100, state.suc_seviyesi + sucSinifiDegeri(f.suc_sinifi ?? "orta"));
          state.un = Math.max(0, state.un - 5);
          if (hedefRakip) hedefRakip.husumet = Math.min(100, hedefRakip.husumet + 20);
          mesaj += " " + T(dil, "Sorguda seni ele verdi.");
          if (f.hapis_sansi && Math.random() < f.hapis_sansi && !state.etiketler.includes("hapiste")) {
            etiketEkle(state, ["hapiste"]);
            const ceza = hapisCezaSuresiHesapla(state.suc_seviyesi);
            state.hapis_ceza_kalan = ceza;
            state.hapis_ceza_toplam = ceza;
            state.hapis_tur_sayaci = 0;
            hayatOlayiEkle(state, "⛓️", T(dil, "Adamının ihbarıyla tutuklandı"));
            mesaj += " " + T(dil, "Kapına dayandılar — kodesi boyladın.");
          }
        } else {
          mesaj += " " + T(dil, "Ağzını açmadı; adın karışmadı.");
        }
      }
    } else {
      ajan.sadakat = Math.max(0, ajan.sadakat - 5);
      mesaj += " " + T(dil, "Kılpayı kaçıp geri döndü.");
    }
    mesajlar.push(mesaj);
  }
  return mesajlar;
}

export interface AjanRolKarti {
  rol: string;
  simge: string;
  /** Peşin tutma ücreti (enflasyonlu). */
  ucret: number;
  /** Tahmini yıllık maaş aralığı alt/üst (kalite gizli olduğu için aralık). */
  maasMin: number;
  maasMax: number;
  /** Bu rolde zaten bir ajanın var mı. */
  sahip: boolean;
  /** Bu rolle yapılabilecek işler (bu karaktere görünenler). */
  isler: string[];
}

export interface AjanDurumu {
  roller: AjanRolKarti[];
  /** Görevdeki ajanlar: ajan id'si → iş id'si. */
  gorevler: Record<string, string>;
}

function ajanDurumuHesapla(state: CharacterState): AjanDurumu {
  const enflasyon = enflasyonCarpani(state);
  const isler = uygunKotuIsler(state.meslek, state.cag);
  return {
    roller: AJAN_ROLLERI.map((r) => ({
      rol: r.rol,
      simge: r.simge,
      ucret: Math.max(1, paraYuvarla(r.ucret * enflasyon)),
      maasMin: r.maasTaban,
      maasMax: r.maasTaban + 5,
      sahip: state.ekip.some((e) => e.rol === r.rol),
      isler: isler.filter((k) => k.ajanRolu === r.rol).map((k) => k.id),
    })),
    gorevler: Object.fromEntries((state.ajan_gorevleri ?? []).map((g) => [g.ajanId, g.isId])),
  };
}

export async function ajanDurumGetir(id: string): Promise<AjanDurumu> {
  const { state } = await oturumGetir(id);
  return ajanDurumuHesapla(state);
}

/** Bir ajan tutar: peşin ücret, gizli kalite (bulanık aralıkla gösterilir), her rolden en fazla bir. Turu tüketmez. */
export async function ajanTut(id: string, rol: string): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken adam tutamazsın.");
  if (!MESLEKLER.includes(state.meslek)) throw new Error("Önce bir meslek seçmelisin.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken adam tutamazsın.");
  const tanim = ajanRolTanimiGetir(rol);
  if (!tanim) throw new Error("Geçersiz rol.");
  if (state.ekip.some((e) => e.rol === tanim.rol)) throw new Error(`Zaten bir ${tanim.rol} tutuyorsun.`);
  const ucret = Math.max(1, paraYuvarla(tanim.ucret * enflasyonCarpani(state)));
  if (state.para < ucret) throw new Error(`Yeterli paran yok (${ucret} ${state.para_birimi} gerekli).`);

  const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
    state.dost_adi,
    state.rakip_adi,
    state.es_adi ?? "",
    state.isim ?? "",
    ...state.ekip.map((e) => e.isim),
  ]);
  const gercekKalite = Math.round((Math.random() * 100 + Math.random() * 100 + Math.random() * 100) / 3);
  const genislik = 30;
  state.para = paraYuvarla(state.para - ucret);
  state.ekip.push({
    id: randomUUID(),
    isim,
    rol: tanim.rol,
    gercekKalite,
    tahminiMin: Math.max(0, Math.round(gercekKalite - genislik / 2)),
    tahminiMax: Math.min(100, Math.round(gercekKalite + genislik / 2)),
    maas: tanim.maasTaban + Math.round(gercekKalite / 20),
    sadakat: Math.round(30 + Math.random() * 50),
    kisilik: EKIP_KISILIK_HAVUZU[Math.floor(Math.random() * EKIP_KISILIK_HAVUZU.length)],
  });
  hayatOlayiEkle(state, tanim.simge, T(state.dil, "{0} ({1}) tutuldu", [isim, K(state.dil, tanim.rol)]));
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} artık senin için çalışıyor ({1}). Peşin {2} {birim} ödedin; maaşı her yıl giderinden düşecek.", [
      isim,
      K(state.dil, tanim.rol),
      ucret,
    ]).replace(/\{birim\}/g, state.para_birimi),
  };
}


// ---------------------------------------------------------------------------
// Meslek işletmesi (Tüccar dikey dilimi, 2026-10) — hiçbiri turu tüketmez
// ---------------------------------------------------------------------------

export interface IsletmeHatGorunumu {
  id: string;
  simge: string;
  ad: IkiDilMetin;
  kesim: "temel" | "savas" | "luks";
  acik: boolean;
  kilitli: boolean;
  minRutbe: number;
  stok: number;
  fiyat: IsletmeFiyat;
  /** Bu yıl için beklenen talep (gürültüsüz) ve birim fiyat/maliyet. */
  birimFiyat: number;
  birimMaliyet: number;
  beklenenKar: number;
  sonTalep: number;
  sonSatis: number;
  /** Dünya durumunun bu kesime etkisi (yüzde, 0 = etkisiz). */
  dunyaTalepYuzde: number;
  dunyaFiyatYuzde: number;
  /** v11: geçen yıl ödenen birim alış fiyatı (dökümden; ilk yıl null), bu yıl dönemin alışa etkisi (%) ve toplam indirim (%). */
  oncekiBirimMaliyet: number | null;
  /** v20: bu yılın piyasa sapması (alış ±%3, satış ±%2; yıl boyu sabit), yüzde olarak. */
  alisSapmaYuzde: number;
  satisSapmaYuzde: number;
  maliyetDonemYuzde: number;
  maliyetIndirimYuzde: number;
  /** v11: seçilen ana ürün mü ve bonus açıklaması. */
  anaUrun: boolean;
  anaUrunBonus: IkiDilMetin | null;
  /** Dönemin sıcak ürünü (🔥): +%60 talep, +%15 fiyat, biterse kayıp ×2. */
  sicak: boolean;
  /** Hattın kısa artı / eksi satırları (savaşta talebi artıyorsa artıya eklenir). */
  arti: IkiDilMetin;
  eksi: IkiDilMetin;
}

export interface IsletmeYatirimGorunumu {
  id: string;
  simge: string;
  ad: IkiDilMetin;
  aciklama: IkiDilMetin;
  kademe: number;
  maxKademe: number;
  sonrakiFiyat: number | null;
  /** v12: şu anki kademenin toplam etkisi ve (varsa) bir sonraki kademenin toplam etkisi. */
  etkiSimdi: IkiDilMetin;
  etkiSonraki: IkiDilMetin | null;
}

export interface IsletmeCalisanGorunumu {
  id: string;
  isim: string;
  rol: IkiDilMetin;
  rolTuru: string | null;
  rolAciklama: IkiDilMetin;
  /** Güncel Yetenek / Sadakat (kesin sayı). */
  yetenek: number;
  sadakat: number;
  maas: number;
  sadik: boolean;
  /** Sadakat <45: sızdırma / iç hırsızlık / ayrılma riski. */
  riskli: boolean;
}

export interface IsletmeAdayGorunumu {
  id: string;
  isim: string;
  rol: IkiDilMetin;
  rolTuru: string;
  rolAciklama: IkiDilMetin;
  tip: string;
  tipAdi: IkiDilMetin;
  gecmis: IkiDilMetin;
  yetenek: number;
  sadakat: number;
  maas: number;
}

export interface CemaatPolitikaSecenegi {
  id: string;
  ad: IkiDilMetin;
  aciklama: IkiDilMetin;
}
export interface CemaatPolitikaGorunumu {
  secili: string;
  secenekler: CemaatPolitikaSecenegi[];
}
export interface CemaatFaaliyetGorunumu {
  id: string;
  simge: string;
  ad: IkiDilMetin;
  aciklama: IkiDilMetin;
  acik: boolean;
  kilitli: boolean;
  minRutbe: number;
  /** Bu yıl için beklenen gelir ve masraf (açık olmasa da "açarsan" tahmini). */
  gelir: number;
  masraf: number;
  /** Dünya durumunun bu faaliyete etkisi (yüzde, 0 = etkisiz). */
  dunyaYuzde: number;
  ahlak: number;
  inanan: number;
}
export interface CemaatOgretiGorunumu {
  id: string;
  seviye: number;
  simge: string;
  fanatik: boolean;
  ad: IkiDilMetin;
  aciklama: IkiDilMetin;
}
export interface CemaatGorunumu {
  inanan: number;
  kapasite: number;
  binaKademesi: number;
  /** Ayine gelme oranı aralığı (%), kaynağı ve bu yıl tahmini gelen sayısı. */
  gelmeMin: number;
  gelmeMax: number;
  gelmeKaynagi: string;
  gelenTahmin: number;
  tasmaVar: boolean;
  /** Beklenen yıllık kırılım. */
  bagis: number;
  faaliyetGelir: number;
  toplamGelir: number;
  giderler: { faaliyet: number; ayin: number; bina: number; yardim: number; aidat: number; vergi: number };
  beklenenBrut: number;
  beklenenNet: number;
  bagisOrani: number;
  bagisYapan: number;
  politikalar: { bagis: CemaatPolitikaGorunumu; kitle: CemaatPolitikaGorunumu; yardim: CemaatPolitikaGorunumu; ton: CemaatPolitikaGorunumu };
  fanatiklik: number;
  fanatiklikDegisim: number;
  /** Fanatikliğin şu anki etkileri (bilgi). */
  fanatikEtkisi: { bagisCarpani: number; yillikKacis: number; yillikOtorite: number; asiriRisk: number };
  faaliyetler: CemaatFaaliyetGorunumu[];
  faaliyetSlot: { kullanilan: number; toplam: number };
  ogretiler: { secilen: CemaatOgretiGorunumu[]; bekleyen: { seviye: number; secenekler: CemaatOgretiGorunumu[] } | null };
  ahlak: { deger: number; bant: number; bantlar: { min: number; max: number; inanan: number }[] };
  /** Yıllık inanan değişiminin kaynakları (kesir; kod: sohret, ahlak, bagis, kitle, yardim, faaliyet, ogreti, tanitim, davetci, yatkinlik, fanatik). */
  inananKalemleri: { kod: string; deger: number }[];
  inananToplam: number;
  okul: { kademe: number; mezunSansi: number };
  asevi: { kademe: number; carpan: number };
  /** Dönem şeridi: aktif dönem + savaş + veba etkileri (yüzde). */
  donem: {
    kaynak: string;
    yuzdeler: { bagis: number; tovbe: number; ritual: number; sifa: number; egitim: number; emanet: number; yardim: number };
    pazarBuyumeYuzde: number;
  };
}

export interface IsletmeGorunumu {
  aktif: boolean;
  /** Din Adamı'nda cemaat görünümü; diğer mesleklerde null. */
  cemaat: CemaatGorunumu | null;
  meslek: string;
  /** Oyuncunun pazar payı (0-100 yüzde, bir ondalık), müşteri sayısı ve toplam pazar büyüklüğü. "Güç" oyuncuya gösterilmez. */
  pazarPayi: number;
  musteri: number;
  pazarMusteri: number;
  slot: { kullanilan: number; toplam: number };
  /** v12: `dolulukYuzde` = kullanılan/kapasite; `doldurYuzdeleri` elle doldurma seçenekleri (alım yıl sonunda otomatik değil). */
  depo: { kullanilan: number; kapasite: number; kademe: number; curumeYuzde: number; bakim: number; dolulukYuzde: number; doldurYuzdeleri: number[]; oto: { acik: boolean; yuzde: number } };
  /** Üretim modundaki mesleklerde yıllık üretim tavanı; ticaret modunda null. */
  uretim: { tavan: number } | null;
  /** v11: başlangıç ürünü seçimi (yalnız Tüccar/Zanaatkâr); `bekliyor` iken oyun devam etmez. */
  urunSecimi: { bekliyor: boolean; secilen: string | null; secenekler: { id: string; simge: string; ad: IkiDilMetin; kesim: "temel" | "savas" | "luks"; ozet: IkiDilMetin }[] };
  hatlar: IsletmeHatGorunumu[];
  yatirimlar: IsletmeYatirimGorunumu[];
  calisanlar: IsletmeCalisanGorunumu[];
  calisanTavani: number;
  adaylar: IsletmeAdayGorunumu[];
  adayYenilenmeKalanYil: number;
  tedarikciBorcu: number;
  sonDokum: IsletmeDokum | null;
  beklenenBrutKar: number;
  /** v11: bu yılın dürüst tahmini bütçesi + cebine kalan (yaşam, kira, hayvan, kredi taksidi düşülmüş). */
  butce: IsletmeButcesi & { yasamKira: number; krediTaksit: number; cebineKalan: number };
  /** Vergi: bu yıl uygulanan oran (0-1) ve indirimin kalan yılı (yoksa 0). */
  vergi: { oran: number; indirimKalanYil: number };
  /** Koruma (0-1) ve ortalama dış hırsızlık aralığı (yıl). */
  koruma: { toplam: number; calisan: number; yatirim: number; otorite: number; hirsizlikAralik: number };
  /** Şehir yöneticisi unvanı (kanonik TR; istemci kt() ile çevirir) ve ilişkisi. */
  otorite: string | null;
  otoriteIliski: number;
  /** Aktif imtiyazlar (kalan yıl). */
  imtiyazlar: { id: string; kalanYil: number }[];
  dunya: { donem: string | null; savas: boolean; veba: boolean };
  para: number;
  paraBirimi: string;
}

function rolAciklamasi(_state: CharacterState, profilMod: string | undefined, tur: IsletmeRolTuru): IkiDilMetin {
  const m = ROL_ACIKLAMALARI[profilMod === "uretim" ? "uretim" : profilMod === "cemaat" ? "cemaat" : "ticaret"][tur];
  return { tr: m.tr, en: m.en };
}

function cemaatGorunumuHesapla(state: CharacterState, b: IsletmeBaglami): CemaatGorunumu {
  const is = state.isletme!;
  const cm = is.cemaat!;
  const o = ogretiToplami(cm.ogretiler);
  const [gmn, gmx] = gelmeAraligi(state);
  const h = cemaatHesapla(state, b, (gmn + gmx) / 2);
  const d = cemaatDonemBilesik(state);
  const etken = cemaatEtkenleri(state);
  const bekleyenSeviye = ogretiBekleyenSeviye(state);
  const yuzde = (x: number) => Math.round((x - 1) * 100);
  const secenek = <K extends string>(kayit: Record<K, { ad: IkiDilMetin; aciklama: IkiDilMetin }>, sira: K[]): CemaatPolitikaSecenegi[] =>
    sira.map((id) => ({ id, ad: { tr: kayit[id].ad.tr, en: kayit[id].ad.en }, aciklama: { tr: kayit[id].aciklama.tr, en: kayit[id].aciklama.en } }));
  const ogretiOzeti = (t: NonNullable<ReturnType<typeof ogretiGetir>>): CemaatOgretiGorunumu => ({
    id: t.id, seviye: t.seviye, simge: t.simge, fanatik: !!t.fanatik,
    ad: { tr: t.ad.tr, en: t.ad.en }, aciklama: { tr: t.aciklama.tr, en: t.aciklama.en },
  });
  const slotKullanilan = acikFaaliyetler(state).length;
  const donemKaynak = state.veba?.aktif ? "veba" : state.ulke.savasta ? "savas" : state.ulke.donem?.tur ?? "durgunluk";
  const faaliyetler: CemaatFaaliyetGorunumu[] = FAALIYETLER.map((f) => {
    const tah = faaliyetTahmini(state, b, f.id);
    return {
      id: f.id, simge: f.simge,
      ad: { tr: f.ad.tr, en: f.ad.en }, aciklama: { tr: f.aciklama.tr, en: f.aciklama.en },
      acik: !!is.hatlar.find((x) => x.id === f.id)?.acik && !faaliyetKilitliMi(state, f.id),
      kilitli: faaliyetKilitliMi(state, f.id),
      minRutbe: f.minRutbe,
      gelir: paraYuvarla(tah.gelir), masraf: paraYuvarla(tah.masraf),
      dunyaYuzde: yuzde(d[f.id]),
      ahlak: f.ahlak, inanan: f.inanan,
    };
  });
  const vergiTutar = h.brutKar > 0 ? h.brutKar * h.vergiOrani : 0;
  return {
    inanan: Math.round(h.inanan * 10) / 10,
    kapasite: h.kapasite,
    binaKademesi: binaKademesi(state),
    gelmeMin: Math.round((gmn + o.gelmeOrani) * 100),
    gelmeMax: Math.round((gmx + o.gelmeOrani) * 100),
    gelmeKaynagi: gelmeKaynagiBul(state),
    gelenTahmin: Math.round(h.gelen * 10) / 10,
    tasmaVar: h.tasan > 0.05,
    bagis: paraYuvarla(h.bagis),
    faaliyetGelir: paraYuvarla(h.faaliyetGelir),
    toplamGelir: paraYuvarla(h.toplamGelir),
    giderler: {
      faaliyet: paraYuvarla(h.faaliyetMasraf), ayin: paraYuvarla(h.ayinMasrafi), bina: paraYuvarla(h.binaBakim),
      yardim: paraYuvarla(h.yardim), aidat: paraYuvarla(h.aidat), vergi: paraYuvarla(vergiTutar),
    },
    beklenenBrut: paraYuvarla(h.brutKar),
    beklenenNet: paraYuvarla(h.brutKar - vergiTutar),
    bagisOrani: Math.round(h.bagisOrani * 1000) / 10,
    bagisYapan: Math.round(h.bagisYapan * 10) / 10,
    politikalar: {
      bagis: { secili: cm.bagis, secenekler: secenek(BAGIS_POLITIKASI, BAGIS_SIRASI) },
      kitle: { secili: cm.kitle, secenekler: secenek(KITLE_POLITIKASI, KITLE_SIRASI) },
      yardim: { secili: cm.yardim, secenekler: secenek(YARDIM_POLITIKASI, YARDIM_SIRASI) },
      ton: { secili: cm.ton, secenekler: secenek(TON_ADLARI, TON_SIRASI) },
    },
    fanatiklik: Math.round(cm.fanatiklik * 10) / 10,
    fanatiklikDegisim: Math.round(etken.fanatiklikDegisim * 10) / 10,
    fanatikEtkisi: {
      bagisCarpani: Math.round(FANATIK_BAGIS_KATSAYI * cm.fanatiklik * 1000) / 10,
      yillikKacis: Math.round(FANATIK_KACIS_KATSAYI * cm.fanatiklik * o.fanatikKacis * 1000) / 10,
      yillikOtorite: Math.round(FANATIK_OTORITE_KATSAYI * cm.fanatiklik * 100) / 100,
      asiriRisk: cm.fanatiklik > ASIRI_ESIK ? Math.round(((cm.fanatiklik - ASIRI_ESIK) / 3) * o.asiriRisk) : 0,
    },
    faaliyetler,
    faaliyetSlot: { kullanilan: slotKullanilan, toplam: faaliyetSlotSayisi(state) },
    ogretiler: {
      secilen: cm.ogretiler.map((id) => ogretiGetir(id)).filter((t): t is NonNullable<typeof t> => !!t).map(ogretiOzeti),
      bekleyen: bekleyenSeviye ? { seviye: bekleyenSeviye, secenekler: ogretiSecenekleri(bekleyenSeviye).map(ogretiOzeti) } : null,
    },
    ahlak: { deger: Math.round(state.ahlak), bant: ahlakBandiIndeksi(state.ahlak), bantlar: AHLAK_BANTLARI.map((x) => ({ ...x })) },
    inananKalemleri: etken.kalemler.map((k) => ({ kod: k.kod, deger: Math.round(k.deger * 10000) / 100 })),
    inananToplam: Math.round(etken.toplam * 10000) / 100,
    okul: { kademe: okulKademesi(state), mezunSansi: Math.round((OKUL_MEZUN_SANSI[okulKademesi(state)] + (okulKademesi(state) > 0 ? o.okulMezun : 0)) * 100) },
    asevi: { kademe: aseviKademesi(state), carpan: Math.round(o.yardimEtkisi * (1 + ASEVI_KADEME_ETKISI * aseviKademesi(state)) * 100) / 100 },
    donem: {
      kaynak: donemKaynak,
      yuzdeler: { bagis: yuzde(d.bagis), tovbe: yuzde(d.tovbe), ritual: yuzde(d.ritual), sifa: yuzde(d.sifa), egitim: yuzde(d.egitim), emanet: yuzde(d.emanet), yardim: yuzde(d.yardim) },
      pazarBuyumeYuzde: Math.round(pazarBuyumeOrani(state) * 1000) / 10,
    },
  };
}

function isletmeGorunumuHesapla(state: CharacterState): IsletmeGorunumu {
  const dil = state.dil;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  const is = state.isletme;
  if (!profil || !is) {
    return {
      aktif: false, cemaat: null, meslek: state.meslek, pazarPayi: 0, musteri: 0, pazarMusteri: state.pazar_musteri ?? 0,
      slot: { kullanilan: 0, toplam: 0 }, depo: { kullanilan: 0, kapasite: 0, kademe: 0, curumeYuzde: 0, bakim: 0, dolulukYuzde: 0, doldurYuzdeleri: [], oto: { acik: false, yuzde: 50 } }, uretim: null,
      urunSecimi: { bekliyor: false, secilen: null, secenekler: [] }, hatlar: [], yatirimlar: [], calisanlar: [], calisanTavani: calisanLimiti(state),
      adaylar: [], adayYenilenmeKalanYil: 0, tedarikciBorcu: 0, sonDokum: null, beklenenBrutKar: 0,
      butce: { satis: 0, alim: 0, curume: 0, depo: 0, aidat: 0, brut: 0, vergi: 0, borcOdeme: 0, net: 0, maas: 0, yasamKira: 0, krediTaksit: 0, cebineKalan: 0 },
      vergi: { oran: 0, indirimKalanYil: 0 }, koruma: { toplam: 0, calisan: 0, yatirim: 0, otorite: 0, hirsizlikAralik: 0 },
      otorite: null, otoriteIliski: state.yonetim_iliski ?? 0, imtiyazlar: [],
      dunya: { donem: null, savas: false, veba: false }, para: state.para, paraBirimi: state.para_birimi,
    };
  }
  const b = isletmeBaglami(state);
  const genf = giderEnflasyonCarpani(state);
  const slot = hatSlotSayisi(state);
  const hatlar: IsletmeHatGorunumu[] = [];
  for (const hat of is.hatlar) {
    const tanim = hatTanimiGetir(profil, hat.id);
    if (!tanim) continue;
    const h = hatHesapla(state, hat, tanim, b);
    const ae = KESIM_ARTI_EKSI[tanim.kesim];
    const arti: IkiDilMetin = tanim.savasTalep
      ? { tr: `${ae.arti.tr} · ${SAVAS_TALEP_ARTISI.tr}`, en: `${ae.arti.en} · ${SAVAS_TALEP_ARTISI.en}` }
      : { tr: ae.arti.tr, en: ae.arti.en };
    hatlar.push({
      id: hat.id,
      simge: tanim.simge,
      ad: { tr: tanim.ad.tr, en: tanim.ad.en },
      kesim: tanim.kesim,
      acik: hat.acik,
      kilitli: hatKilitNedeni(state, tanim) !== null,
      minRutbe: tanim.minRutbe,
      stok: hat.stok,
      fiyat: hat.fiyat,
      birimFiyat: paraYuvarla(h.birimFiyat),
      birimMaliyet: paraYuvarla(h.birimMaliyet),
      beklenenKar: paraYuvarla(h.talep * (h.birimFiyat - h.birimMaliyet)),
      sonTalep: hat.son_talep,
      sonSatis: hat.son_satis,
      dunyaTalepYuzde: Math.round((h.kesim.talep - 1) * 100),
      dunyaFiyatYuzde: Math.round((h.kesim.fiyat - 1) * 100),
      oncekiBirimMaliyet: is.son_dokum?.hatlar.find((x) => x.id === hat.id)?.birimMaliyet ?? null,
      alisSapmaYuzde: Math.round(((is.piyasa_sapma?.[hat.id]?.alis ?? 1) - 1) * 1000) / 10,
      satisSapmaYuzde: Math.round(((is.piyasa_sapma?.[hat.id]?.satis ?? 1) - 1) * 1000) / 10,
      maliyetDonemYuzde: Math.round((h.kesim.fiyat - 1) * 100),
      maliyetIndirimYuzde: Math.round(h.maliyetIndirim * 100),
      anaUrun: is.ana_urun === hat.id,
      anaUrunBonus: is.ana_urun === hat.id ? (profil.baslangicUrunleri?.find((u) => u.hat === hat.id)?.ozet ?? null) : null,
      sicak: h.sicak,
      arti,
      eksi: { tr: ae.eksi.tr, en: ae.eksi.en },
    });
  }
  const yatirimlar: IsletmeYatirimGorunumu[] = profil.yatirimlar.map((y) => {
    const kademe = is.yatirimlar[y.id] ?? 0;
    return {
      id: y.id,
      simge: y.simge,
      ad: { tr: y.ad.tr, en: y.ad.en },
      aciklama: { tr: y.aciklama.tr, en: y.aciklama.en },
      kademe,
      maxKademe: y.fiyatlar.length,
      sonrakiFiyat: kademe < y.fiyatlar.length ? paraYuvarla(y.fiyatlar[kademe] * genf) : null,
      etkiSimdi: yatirimEtkiMetni(y.etki, kademe, genf),
      etkiSonraki: kademe < y.fiyatlar.length ? yatirimEtkiMetni(y.etki, kademe + 1, genf) : null,
    };
  });
  const calisanlar: IsletmeCalisanGorunumu[] = state.ekip.map((e) => {
    const rt = e.rol_turu ?? null;
    const rolAdi = rt ? rolAdiGetir(profil, rt) : null;
    return {
      id: e.id,
      isim: e.isim,
      rol: rolAdi ? { tr: rolAdi.tr, en: rolAdi.en } : { tr: e.rol, en: K("en", e.rol) },
      rolTuru: rt,
      rolAciklama: rt ? rolAciklamasi(state, profil.mod, rt) : { tr: "", en: "" },
      yetenek: Math.round(e.gercekKalite),
      sadakat: Math.round(e.sadakat),
      maas: paraYuvarla(e.maas),
      sadik: e.sadakat >= SADIK_ESIGI,
      riskli: e.sadakat < SADAKAT_RISK_ESIGI,
    };
  });
  const adaylar: IsletmeAdayGorunumu[] = is.adaylar.map((a) => {
    const rolAdi = rolAdiGetir(profil, a.rolTuru);
    const tipAdi = ADAY_TIP_ADLARI[a.tip];
    return {
      id: a.id,
      isim: a.isim,
      rol: { tr: rolAdi.tr, en: rolAdi.en },
      rolTuru: a.rolTuru,
      rolAciklama: rolAciklamasi(state, profil.mod, a.rolTuru),
      tip: a.tip,
      tipAdi: tipAdi ? { tr: tipAdi.tr, en: tipAdi.en } : { tr: a.tip, en: a.tip },
      gecmis: { tr: a.gecmis.tr, en: a.gecmis.en },
      yetenek: a.yetenek,
      sadakat: a.sadakat,
      maas: paraYuvarla(a.maas_taban * genf),
    };
  });
  const unvan = sehirYoneticisiUnvani(state.cag, state.bolge);
  const kor = korumaHesapla(state);
  const kapasite = depoKapasitesi(is);
  const imtiyazlar = Object.entries(is.imtiyazlar ?? {})
    .filter(([, bitis]) => typeof bitis === "number" && state.yil <= bitis)
    .map(([iid, bitis]) => ({ id: iid, kalanYil: bitis - state.yil + 1 }));
  const vergiAktif = state.vergi_carpan_bitis_yili != null && state.yil <= state.vergi_carpan_bitis_yili && (state.vergi_carpan ?? 1) < 1;
  return {
    aktif: true,
    cemaat: profil.mod === "cemaat" && is.cemaat ? cemaatGorunumuHesapla(state, b) : null,
    meslek: state.meslek,
    pazarPayi: Math.round(pazarPayiHesapla(state) * 1000) / 10,
    musteri: Math.round(musteriSayisi(state) * 10) / 10,
    pazarMusteri: Math.round(state.pazar_musteri ?? 0),
    slot: { kullanilan: is.hatlar.filter((h) => h.acik).length, toplam: slot },
    depo: {
      kullanilan: toplamStok(is),
      kapasite,
      kademe: depoKademesi(is),
      curumeYuzde: Math.round(curumeOrani(is) * 1000) / 10,
      bakim: paraYuvarla(depoBakimMasrafi(is, genf)),
      dolulukYuzde: depoDolulukYuzdesi(is),
      doldurYuzdeleri: [...DEPO_DOLDUR_YUZDELERI],
      oto: { acik: !!is.depo_oto?.acik, yuzde: is.depo_oto?.yuzde ?? 50 },
    },
    uretim: uretimTavani(state) !== null ? { tavan: uretimTavani(state)! } : null,
    urunSecimi: {
      bekliyor: urunSecimiBekliyorMu(state),
      secilen: is.ana_urun ?? null,
      secenekler: (profil.baslangicUrunleri ?? []).flatMap((u) => {
        const t = hatTanimiGetir(profil, u.hat);
        return t ? [{ id: u.hat, simge: t.simge, ad: { tr: t.ad.tr, en: t.ad.en }, kesim: t.kesim, ozet: { tr: u.ozet.tr, en: u.ozet.en } }] : [];
      }),
    },
    hatlar,
    yatirimlar,
    calisanlar,
    calisanTavani: calisanLimiti(state),
    adaylar,
    adayYenilenmeKalanYil: Math.max(0, ADAY_YENILEME_YIL - (state.yil - is.aday_yili)),
    tedarikciBorcu: is.tedarikci_borcu,
    sonDokum: is.son_dokum,
    beklenenBrutKar: paraYuvarla(beklenenBrutKar(state, b)),
    butce: butceVeCebineKalan(state, b),
    vergi: { oran: Math.round(vergiOrani(state) * 1000) / 1000, indirimKalanYil: vergiAktif ? state.vergi_carpan_bitis_yili! - state.yil + 1 : 0 },
    koruma: {
      toplam: Math.round(kor.toplam * 100) / 100,
      calisan: Math.round(kor.calisan * 100) / 100,
      yatirim: Math.round(kor.yatirim * 100) / 100,
      otorite: Math.round(kor.otorite * 100) / 100,
      hirsizlikAralik: 10,
    },
    otorite: unvan,
    otoriteIliski: Math.round(state.yonetim_iliski ?? 0),
    imtiyazlar,
    dunya: {
      donem: state.ulke.donem?.tur ?? null,
      savas: !!state.ulke.savasta,
      veba: !!state.veba?.aktif,
    },
    para: state.para,
    paraBirimi: state.para_birimi,
  };
}

/** Bu yılın tahmini işletme bütçesi + oyuncunun cebine kalan (yaşam, kira, hayvan, kredi taksidi, çalışan maaşı düşülmüş). */
function butceVeCebineKalan(state: CharacterState, b: IsletmeBaglami) {
  const butce = isletmeButcesi(state, b);
  const g = giderKalemleriHesapla(state);
  const yasamKira = paraYuvarla(g.yasam + g.konut + g.evcilHayvan);
  const krediTaksit = state.kredi ? paraYuvarla(Math.min(state.kredi.kalanBorc, state.kredi.yillikTaksit)) : 0;
  return { ...butce, yasamKira, krediTaksit, cebineKalan: paraYuvarla(butce.net - butce.maas - yasamKira - krediTaksit) };
}

export async function isletmeDurumGetir(id: string): Promise<IsletmeGorunumu> {
  const { state } = await oturumGetir(id);
  return isletmeGorunumuHesapla(state);
}

export interface IsletmeKararGirdisi {
  id: string;
  acik?: boolean;
  fiyat?: IsletmeFiyat;
}

/** Hat kararlarını (aç/kapa, fiyat) ve işletme geneli stok hedefini toplu uygular. Turu tüketmez. */
export interface CemaatKararGirdisi {
  bagis?: string;
  kitle?: string;
  yardim?: string;
  ton?: string;
}

export async function isletmeKararVer(
  id: string,
  hatlar: IsletmeKararGirdisi[],
  cemaatKarari?: CemaatKararGirdisi
): Promise<{ state: CharacterState; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken işletmenle ilgilenemezsin.");
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !state.isletme) throw new Error("Bu mesleğin henüz bir işletmesi yok.");
  const is = state.isletme;
  if (!Array.isArray(hatlar)) throw new Error("Geçersiz karar.");
  if (profil.mod === "cemaat") return cemaatKararVer(state, hatlar, cemaatKarari);
  // Önce doğrula, sonra uygula: yarım uygulanmış karar kalmasın.
  const secenekler = new Map<string, IsletmeKararGirdisi>();
  for (const g of hatlar) {
    if (!g || typeof g.id !== "string") throw new Error("Geçersiz karar.");
    const hat = is.hatlar.find((h) => h.id === g.id);
    const tanim = hatTanimiGetir(profil, g.id);
    if (!hat || !tanim) throw new Error("Böyle bir ürün hattı yok.");
    if (g.acik === true && !hat.acik && hatKilitNedeni(state, tanim)) throw new Error("Bu hattı açmak için rütben yetersiz.");
    if (g.fiyat !== undefined && !FIYATLAR.includes(g.fiyat)) throw new Error("Geçersiz fiyat politikası.");
    secenekler.set(g.id, g);
  }
  const yeniAcik = new Set(is.hatlar.filter((h) => (secenekler.get(h.id)?.acik ?? h.acik)).map((h) => h.id));
  if (yeniAcik.size > hatSlotSayisi(state)) throw new Error("Bu kadar hattı aynı anda işletemezsin; daha fazla çalışan gerek.");
  for (const hat of is.hatlar) {
    const g = secenekler.get(hat.id);
    if (!g) continue;
    if (g.acik !== undefined) hat.acik = g.acik;
    if (g.fiyat !== undefined) hat.fiyat = g.fiyat;
  }
  await oturumKaydet(state);
  return { state, durum: isletmeGorunumuHesapla(state) };
}

/** Din Adamı: faaliyet aç/kapa + dört politika. Önce doğrular, sonra uygular. */
async function cemaatKararVer(
  state: CharacterState,
  hatlar: IsletmeKararGirdisi[],
  k?: CemaatKararGirdisi
): Promise<{ state: CharacterState; durum: IsletmeGorunumu }> {
  const is = state.isletme!;
  const cm = is.cemaat;
  if (!cm) throw new Error("Bu mesleğin henüz bir işletmesi yok.");
  const secenekler = new Map<string, IsletmeKararGirdisi>();
  for (const g of hatlar) {
    if (!g || typeof g.id !== "string") throw new Error("Geçersiz karar.");
    const f = FAALIYETLER.find((x) => x.id === g.id);
    if (!f || !is.hatlar.some((h) => h.id === g.id)) throw new Error("Böyle bir faaliyet yok.");
    if (g.acik === true && faaliyetKilitliMi(state, g.id)) throw new Error("Bu faaliyeti açmak için rütben yetersiz.");
    secenekler.set(g.id, g);
  }
  const yeniAcik = new Set(is.hatlar.filter((h) => !faaliyetKilitliMi(state, h.id) && (secenekler.get(h.id)?.acik ?? h.acik)).map((h) => h.id));
  if (yeniAcik.size > faaliyetSlotSayisi(state)) throw new Error("Bu kadar faaliyeti aynı anda yürütemezsin; rütben yükselince yeni yer açılır.");
  if (k?.bagis !== undefined && !BAGIS_SIRASI.includes(k.bagis as CemaatBagis)) throw new Error("Geçersiz bağış politikası.");
  if (k?.kitle !== undefined && !KITLE_SIRASI.includes(k.kitle as CemaatKitle)) throw new Error("Geçersiz vaaz kitlesi.");
  if (k?.yardim !== undefined && !YARDIM_SIRASI.includes(k.yardim as CemaatYardim)) throw new Error("Geçersiz yardım politikası.");
  if (k?.ton !== undefined && !TON_SIRASI.includes(k.ton as CemaatTon)) throw new Error("Geçersiz vaaz tonu.");
  for (const h of is.hatlar) {
    const g = secenekler.get(h.id);
    if (g?.acik !== undefined) h.acik = g.acik;
  }
  if (k?.bagis !== undefined) cm.bagis = k.bagis as CemaatBagis;
  if (k?.kitle !== undefined) cm.kitle = k.kitle as CemaatKitle;
  if (k?.yardim !== undefined) cm.yardim = k.yardim as CemaatYardim;
  if (k?.ton !== undefined) cm.ton = k.ton as CemaatTon;
  await oturumKaydet(state);
  return { state, durum: isletmeGorunumuHesapla(state) };
}

/** Rütbeyle açılan öğreti seçimi (seçilmeden oyun devam etmez). Turu tüketmez. */
export async function isletmeOgretiSec(
  id: string,
  ogretiId: string
): Promise<{ state: CharacterState; mesaj: string; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  ogretiSec(state, ogretiId);
  const t = ogretiGetir(ogretiId)!;
  hayatOlayiEkle(state, t.simge, T(state.dil, "Yeni öğreti: {0}", [ikiDil(state.dil, t.ad.tr, t.ad.en)]));
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} öğretisini benimsedin.", [ikiDil(state.dil, t.ad.tr, t.ad.en)]),
    durum: isletmeGorunumuHesapla(state),
  };
}

/** v11: oyun başında Tüccar/Zanaatkâr'ın 3 ürün arasından birini seçmesi. Turu tüketmez. */
export async function isletmeUrunSec(
  id: string,
  urunId: string
): Promise<{ state: CharacterState; mesaj: string; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  anaUrunSec(state, urunId, isletmeBaglami(state));
  const profil = isletmeProfiliGetir(state.meslek, state.cag)!;
  const tanim = hatTanimiGetir(profil, urunId)!;
  hayatOlayiEkle(state, tanim.simge, T(state.dil, "Ana ürünün: {0}", [ikiDil(state.dil, tanim.ad.tr, tanim.ad.en)]));
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} ürünüyle işe başladın.", [ikiDil(state.dil, tanim.ad.tr, tanim.ad.en)]),
    durum: isletmeGorunumuHesapla(state),
  };
}

/**
 * v12: depoyu kapasitenin %0/25/50/75'ine kadar doldurur. `onayla=false` yalnız planı (adet, ödenecek tutar) döner,
 * parayı çekmez; `onayla=true` parayı hemen çeker ve stoğu ekler. Turu tüketmez.
 */
export async function isletmeDepoDoldur(
  id: string,
  hedefYuzde: number,
  onayla: boolean
): Promise<{ state: CharacterState; plan: DepoDoldurPlani; mesaj: string; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!state.isletme) throw new Error("Bu mesleğin henüz bir işletmesi yok.");
  if (urunSecimiBekliyorMu(state)) throw new Error("Önce başlangıç ürününü seçmelisin.");
  const b = isletmeBaglami(state);
  if (!onayla) {
    const plan = depoDoldurPlani(state, hedefYuzde, b);
    return { state, plan, mesaj: "", durum: isletmeGorunumuHesapla(state) };
  }
  const plan = depoyuDoldur(state, hedefYuzde, b);
  await oturumKaydet(state);
  return {
    state,
    plan,
    mesaj:
      plan.adet > 0
        ? plan.yetersiz
          ? T(state.dil, "Paran yettiği kadar {0} birim mal aldın ({1} {2} ödedin); depo %{3} dolu.", [plan.adet, plan.maliyet, state.para_birimi, plan.ulasilacakYuzde])
          : T(state.dil, "{0} birim mal aldın ({1} {2} ödedin).", [plan.adet, plan.maliyet, state.para_birimi])
        : plan.yetersiz
          ? T(state.dil, "Mal almaya paran yetmiyor; gerekirse tefeciden borç alabilirsin.")
          : T(state.dil, "Deponda zaten yeterli mal var."),
    durum: isletmeGorunumuHesapla(state),
  };
}

/** v20: otomatik depo doldurmayı açar/kapatır ve yüzdesini ayarlar. Turu tüketmez. */
export async function isletmeDepoOtomatik(
  id: string,
  acik: boolean,
  yuzde: number
): Promise<{ state: CharacterState; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !state.isletme || profil.mod === "cemaat") throw new Error("Bu mesleğin deposu yok.");
  if (!(DEPO_DOLDUR_YUZDELERI as readonly number[]).includes(yuzde)) throw new Error("Geçersiz doldurma oranı.");
  state.isletme.depo_oto = { acik: !!acik, yuzde };
  await oturumKaydet(state);
  return { state, durum: isletmeGorunumuHesapla(state) };
}

/** Kalıcı işletme yatırımının bir sonraki kademesini satın alır. Turu tüketmez. */
export async function isletmeYatirimYap(
  id: string,
  yatirimId: string
): Promise<{ state: CharacterState; mesaj: string; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken işletmene yatırım yapamazsın.");
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !state.isletme) throw new Error("Bu mesleğin henüz bir işletmesi yok.");
  const tanim = yatirimTanimiGetir(profil, yatirimId);
  if (!tanim) throw new Error("Böyle bir yatırım yok.");
  const kademe = state.isletme.yatirimlar[tanim.id] ?? 0;
  if (kademe >= tanim.fiyatlar.length) throw new Error("Bu yatırım zaten en üst kademede.");
  const fiyat = paraYuvarla(tanim.fiyatlar[kademe] * giderEnflasyonCarpani(state));
  if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${state.para_birimi} gerekli).`);
  state.para = paraYuvarla(state.para - fiyat);
  state.isletme.yatirimlar[tanim.id] = kademe + 1;
  const ad = ikiDil(state.dil, tanim.ad.tr, tanim.ad.en);
  hayatOlayiEkle(state, tanim.simge, T(state.dil, "{0} yatırımını {1}. kademeye çıkardı", [ad, kademe + 1]));
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} {1}. kademeye çıktı ({2} {3} ödedin).", [ad, kademe + 1, fiyat, state.para_birimi]),
    durum: isletmeGorunumuHesapla(state),
  };
}

/** Aday havuzundan bir çalışan işe alır (peşin ücret yok); yıllık maaşı ekip giderinden düşer. Turu tüketmez. */
export async function isletmeCalisanAl(
  id: string,
  adayId: string
): Promise<{ state: CharacterState; mesaj: string; durum: IsletmeGorunumu }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken çalışan alamazsın.");
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !state.isletme) throw new Error("Bu mesleğin henüz bir işletmesi yok.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken adam tutamazsın.");
  const is = state.isletme;
  const aday = is.adaylar.find((a) => a.id === adayId);
  if (!aday) throw new Error("Böyle bir aday yok.");
  if (state.ekip.length >= calisanLimiti(state)) throw new Error("Daha fazla çalışan tutamazsın; rütben yükselince limit artar.");
  is.adaylar = is.adaylar.filter((a) => a.id !== aday.id);
  const rolAdi = rolAdiGetir(profil, aday.rolTuru);
  state.ekip.push({
    id: randomUUID(),
    isim: aday.isim,
    // Kanonik (TR) rol adı saklanır; ekranda rol_turu üzerinden dile göre çevrilir.
    rol: rolAdi.tr,
    gercekKalite: aday.yetenek,
    tahminiMin: aday.yetenek,
    tahminiMax: aday.yetenek,
    maas: paraYuvarla(aday.maas_taban * giderEnflasyonCarpani(state)),
    sadakat: aday.sadakat,
    kisilik: EKIP_KISILIK_HAVUZU[Math.floor(Math.random() * EKIP_KISILIK_HAVUZU.length)],
    rol_turu: aday.rolTuru,
    y_giris: aday.yetenek,
    s_giris: aday.sadakat,
    maas_taban: aday.maas_taban,
  });
  hayatOlayiEkle(state, "🤝", T(state.dil, "{0} ({1}) işe alındı", [aday.isim, ikiDil(state.dil, rolAdi.tr, rolAdi.en)]));
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "{0} artık senin için çalışıyor; maaşı her yıl giderinden düşecek.", [aday.isim]),
    durum: isletmeGorunumuHesapla(state),
  };
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
  /** "Şimdi al / bekle" zamanlama sinyali: getirinin normal duruma göre nerede olduğu. */
  piyasaSinyali: "firsat" | "zirve" | "durgun";
  /** İnsan-okunur zamanlama ipucu. */
  piyasaIpucu: string;
}

const NOTR_ULKE = { savasta: false, vebada: false, ekonomi: "normal" as const, kriz: null, nufusDurumu: "normal" as const };

function mulkPiyasaSinyali(
  tur: MulkTuru,
  state: CharacterState
): { sinyal: "firsat" | "zirve" | "durgun"; ipucu: string } {
  const simdi = mulkGetiriOraniHesapla(tur, state.ulke);
  const normal = mulkGetiriOraniHesapla(tur, NOTR_ULKE);
  const delta = simdi - normal;
  if (delta > 0.02) {
    return {
      sinyal: "zirve",
      ipucu: T(state.dil, "Getiri şu an zirvede — bu koşullar geçince düşer. Elindekini tut, yeni almak için acele etme."),
    };
  }
  if (delta < -0.02) {
    return {
      sinyal: "firsat",
      ipucu: T(state.dil, "Getiri şu an dipte; koşullar düzelince toparlanır. Ucuza girmek için iyi bir zaman olabilir."),
    };
  }
  return { sinyal: "durgun", ipucu: T(state.dil, "Piyasa durgun — acele bir karar gerektirmiyor.") };
}

/** Yatırım ekranının "Yatırımlık Gayrimenkuller" bölümü için 5 mülkün güncel fiyat/getiri önizlemesini döner. */
export async function mulkConfigGetir(id: string): Promise<MulkKartBilgisi[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  return MULK_TANIMLARI.map((tanim) => {
    const oran = mulkGetiriOraniKisisel(state, tanim.tur);
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
      ...(() => {
        const s = mulkPiyasaSinyali(tanim.tur, state);
        return { piyasaSinyali: s.sinyal, piyasaIpucu: s.ipucu };
      })(),
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
  hapisYolculukEngeli(state, "mülk alamazsın");
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
  if (!state.mulk_alis_yili) state.mulk_alis_yili = {};
  state.mulk_alis_yili[tur] = state.yil;
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
// Kumar el başına +1 aranma (2026-10, kullanıcı isteği: "zar ve diğer kumarlar +1").
// Tur harcamadan defalarca oynanabildiği için küçük tutulur; suç sınıflarının dışındadır.
const ZAR_SUC_ARTISI = 1;
/** Bir oyun yılında oynanabilecek en fazla zar eli (tur harcamayan kumar, sınırsız kasılmasın). */
const ZAR_YILLIK_EL_LIMITI = 5;
// Hazard: her kaç elde bir "rakip bıçak çekti" tetiklenmeyi denesin ve ihtimali.
const HAZARD_BICAK_HER_KAC_EL = 4;
const HAZARD_BICAK_IHTIMAL = 0.45;
// Kazanç bahis×3: 0.34 şansla beklenen getiri +%2'ydi (oyuncu lehine, sınırsız kâr kapısı).
// 0.32 ile beklenen getiri −%4 — hâlâ cazip ama kumarın kasası kazanır.
const UC_KAGITCI_KAZANMA_SANSI = 0.32;
const UC_KAGITCI_SUC_ARTISI = 1;
const BILEK_GURESI_ODUL_TABAN = 4;

function zarAtBir(): number {
  return 1 + Math.floor(Math.random() * 6);
}

/** Zar masası ekranının canlı bahis kademelerini döner (enflasyona göre ölçeklenir). */
export async function zarKademeleriGetir(id: string): Promise<number[]> {
  const oturum = await oturumGetir(id);
  const enflasyon = enflasyonCarpani(oturum.state);
  return ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyon)));
}

interface HazardSonucu {
  state: CharacterState;
  kazandi: boolean;
  senZar: [number, number];
  rakipZar: [number, number];
  cift: boolean;
  bicakCekildi: boolean;
  mesaj: string;
}

/**
 * Hazard (Orta Çağ'ın en ünlü zar oyunu, modern barbutun atası): oyuncu 2 zar,
 * rakip 2 zar atar. Çift atan YA DA toplamı büyük olan kazanır; kazanınca bahis
 * ×2, kaybedince tamamı gider. Her el suç/aranma +7 (kalıcı bir yatırım değil,
 * tekrar tekrar oynanır — asıl fren yükselen hapis riski). Her
 * HAZARD_BICAK_HER_KAC_EL elde bir, %45 ihtimalle "rakip bıçak çekti": ayrı bir
 * seçim ekranı değil, oyunun içinde çözülen sert bir sonuç (sağlık/aranma cezası,
 * küçük ölüm riski).
 */
/** Hapisteyken ya da yolculuktayken "dışarıda" yapılan işlemleri (kumar, borç, mülk, taşınma) engeller. */
function hapisYolculukEngeli(state: CharacterState, ne: string): void {
  if (state.etiketler.includes("hapiste")) throw new Error(`Hapistesin; şu an ${ne}.`);
  if (state.etiketler.includes("yolculukta")) throw new Error(`Yoldasın; şu an ${ne}.`);
}

export async function zarAt(id: string, tutar: number): Promise<HazardSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  hapisYolculukEngeli(state, "zar oynayamazsın");
  const kademeler = ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyonCarpani(state))));
  if (!kademeler.includes(tutar)) throw new Error("Geçersiz bahis tutarı.");
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${tutar} ${state.para_birimi} gerekli).`);

  // Yıllık el limiti: sayaç `sosyallesme_aksiyon_kilit` içinde ("zar_yil" = sayacın ait olduğu
  // oyun yılı, "zar_el" = o yıl oynanan el); yıl değişince sıfırlanır.
  if (state.sosyallesme_aksiyon_kilit["zar_yil"] !== state.yil) {
    state.sosyallesme_aksiyon_kilit["zar_yil"] = state.yil;
    state.sosyallesme_aksiyon_kilit["zar_el"] = 0;
  }
  if ((state.sosyallesme_aksiyon_kilit["zar_el"] ?? 0) >= ZAR_YILLIK_EL_LIMITI) {
    throw new Error("Bu yıl zar masasında yeterince oynadın; yıl dönünce yine gelirsin.");
  }
  state.sosyallesme_aksiyon_kilit["zar_el"] = (state.sosyallesme_aksiyon_kilit["zar_el"] ?? 0) + 1;

  const birim = state.para_birimi;
  state.para = paraYuvarla(state.para - tutar);
  state.suc_seviyesi = Math.min(100, state.suc_seviyesi + ZAR_SUC_ARTISI);
  sucArtisiKaydet(state);
  state.hazard_el_sayisi = (state.hazard_el_sayisi ?? 0) + 1;

  const senZar: [number, number] = [zarAtBir(), zarAtBir()];
  const rakipZar: [number, number] = [zarAtBir(), zarAtBir()];
  const cift = senZar[0] === senZar[1];
  const senT = senZar[0] + senZar[1];
  const rakipT = rakipZar[0] + rakipZar[1];
  const kazandi = cift || senT > rakipT;

  // Kumar amaçları (Şanslı El / Kumar Efsanesi): ömürlük net kâr/zarar.
  state.omur_kumar_net = (state.omur_kumar_net ?? 0) + (kazandi ? tutar : -tutar);

  let mesaj: string;
  if (kazandi) {
    const kazanc = tutar * 2;
    state.para = paraYuvarla(state.para + kazanc);
    hayatOlayiEkle(state, "🎲", T(state.dil, "Zar masasında kazandı: +{0} {birim}", [kazanc - tutar]).replace(/\{birim\}/g, birim));
    mesaj = cift
      ? T(state.dil, "Çift attın! ({0}-{1}) Masayı süpürdün: {2} {birim}.", [senZar[0], senZar[1], kazanc]).replace(/\{birim\}/g, birim)
      : T(state.dil, "{0}'e {1} — zar senden yana. {2} {birim} aldın.", [rakipT, senT, kazanc]).replace(/\{birim\}/g, birim);
  } else {
    mesaj = T(state.dil, "{0}'e {1} — zar rakipten yana. {2} {birim} masada kaldı.", [senT, rakipT, tutar]).replace(/\{birim\}/g, birim);
  }

  let bicakCekildi = false;
  if (state.hazard_el_sayisi % HAZARD_BICAK_HER_KAC_EL === 0 && Math.random() < HAZARD_BICAK_IHTIMAL) {
    bicakCekildi = true;
    state.saglik -= 8 + Math.floor(Math.random() * 11); // 8-18
    state.suc_seviyesi = Math.min(100, state.suc_seviyesi + 10);
    sucArtisiKaydet(state);
    state.mutluluk -= 5;
    hayatOlayiEkle(state, "🔪", T(state.dil, "Zar masasında bıçaklı bir kavgaya karıştı"));
    mesaj += " " + T(state.dil, "Sonra masa karıştı — biri bıçak çekti; sıyrık ve morlukla zar zor kaçtın.");
    clampStats(state);
    if (state.saglik <= 0 || Math.random() * 100 < efektifOlumSansi(6, state.saglik)) {
      checkDeath(state, true, ikiDilT("Zar masasındaki bıçaklı bir kavgada öldü."));
    }
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, kazandi, senZar, rakipZar, cift, bicakCekildi, mesaj };
}

interface UcKagitciSonucu {
  state: CharacterState;
  kazandi: boolean;
  dogruBardak: number;
  mesaj: string;
}

/**
 * Üç Kağıtçı (bul karayı al parayı): 3 bardak, birinin altında para. Kazanma
 * şansı SABİT ~%32 — bardak seçimi kozmetiktir: sunucu önce kazanıp kazanmadığını
 * belirler, sonra "doğru bardağı" (kazandıysa seçilen, kaybettiyse başka bir)
 * bardağa koyar; istemci animasyonu bu sonuca göre biter. Kaybedince bahis gider,
 * kazanınca ×3 (net +2 kat bahis). Sokak dolandırıcılığı → küçük suç/aranma artışı. Turu tüketmez.
 */
export async function ucKagitciOyna(id: string, tutar: number, secim: number): Promise<UcKagitciSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  hapisYolculukEngeli(state, "üç kâğıt oynayamazsın");
  const kademeler = ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyonCarpani(state))));
  if (!kademeler.includes(tutar)) throw new Error("Geçersiz bahis tutarı.");
  if (secim !== 0 && secim !== 1 && secim !== 2) throw new Error("Geçersiz bardak.");
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${tutar} ${state.para_birimi} gerekli).`);

  const birim = state.para_birimi;
  state.para = paraYuvarla(state.para - tutar);
  state.suc_seviyesi = Math.min(100, state.suc_seviyesi + UC_KAGITCI_SUC_ARTISI);
  sucArtisiKaydet(state);
  state.uc_kagitci_oyun_sayisi = (state.uc_kagitci_oyun_sayisi ?? 0) + 1;

  const kazandi = Math.random() < UC_KAGITCI_KAZANMA_SANSI;
  const dogruBardak = kazandi ? secim : (secim + 1 + Math.floor(Math.random() * 2)) % 3;
  // Kumar amaçları: net kâr (kazançta 2×bahis net, kayıpta -bahis).
  state.omur_kumar_net = (state.omur_kumar_net ?? 0) + (kazandi ? tutar * 2 : -tutar);

  let mesaj: string;
  if (kazandi) {
    const kazanc = tutar * 3;
    state.para = paraYuvarla(state.para + kazanc);
    hayatOlayiEkle(state, "🥃", T(state.dil, "Üç kağıtçıyı bir kez olsun yendi: +{0} {birim}", [kazanc - tutar]).replace(/\{birim\}/g, birim));
    mesaj = T(state.dil, "Doğru bardağı buldun! {0} {birim} kazandın.", [kazanc]).replace(/\{birim\}/g, birim);
  } else {
    mesaj = T(state.dil, "Para o bardağın altında değildi; {0} {birim} gitti. (Zaten hiç olmadı.)", [tutar]).replace(/\{birim\}/g, birim);
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, kazandi, dogruBardak, mesaj };
}

interface BilekGuresiSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * Bilek güreşi: istemci 5 saniyede 30 dokunuş hedefli bir beceri oyunu oynatır,
 * yalnızca başarılı/başarısız sonucunu gönderir (tek oyunculu, düşük stake —
 * sunucu istemciye güvenir). Kazanç: ün +, mutluluk +, küçük para. Kayıp: sağlık
 * -, ün -. Turu tüketmez.
 */
export async function bilekGuresiSonuc(id: string, basarili: boolean): Promise<BilekGuresiSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) {
    throw new Error("Şu an bilek güreşi yapamazsın.");
  }
  const bekleyen = aksiyonKalanYil(state, "bilek");
  if (bekleyen > 0) {
    throw new Error(T(state.dil, "Kolun hâlâ ağrıyor; biraz sonra yeniden bilek güreşebilirsin."));
  }
  state.sosyallesme_aksiyon_kilit["bilek"] = state.yil;
  const birim = state.para_birimi;
  let mesaj: string;
  if (basarili) {
    const odul = Math.max(1, paraYuvarla(BILEK_GURESI_ODUL_TABAN * enflasyonCarpani(state)));
    state.para = paraYuvarla(state.para + odul);
    state.omur_kumar_net = (state.omur_kumar_net ?? 0) + odul; // kumar amaçları
    state.un += 6;
    state.mutluluk += 5;
    hayatOlayiEkle(state, "💪", T(state.dil, "Bir bilek güreşini kazandı"));
    mesaj = T(state.dil, "Rakibin bileğini masaya yapıştırdın! Meydanın gözü sende — ün ve {0} {birim}.", [odul]).replace(/\{birim\}/g, birim);
  } else {
    state.saglik -= 6;
    state.un -= 4;
    state.mutluluk -= 3;
    mesaj = T(state.dil, "Bileğin bükülene kadar direndin ama masaya sen yapıştın. Herkes güldü.");
  }
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

// ---------------------------------------------------------------------------
// Sosyalleşme mekânları (meyhane, hamam, kahvehane, ordugâh çadırı, vb.)
// ---------------------------------------------------------------------------

export interface SosyallesmeYeriKarti extends SosyallesmeYeri {
  /** Sadece alkollü mekânlar için: karakterin şu ana kadarki ziyaret sayısı (AYYAS_ESIGI'ye ne kadar yakın olduğunu göstermek için). */
  ziyaretSayisi?: number;
  /** Bu mekâna bu yıl zaten girildi mi (SOSYALLESME_MEKAN_COOLDOWN yıl kilitli). */
  kilitli?: boolean;
  /** Kilidin açılmasına kalan oyun yılı (0 = hazır). */
  kalanYil?: number;
  /** Mekâna girerken peşin düşülecek ücret (enflasyonla ölçekli) — kartta gösterilir. */
  girisUcreti?: number;
}

/** Bir sosyalleşme mekânının cooldown'unun bitmesine kalan oyun yılı. */
function mekanKalanYil(state: CharacterState, yerId: string): number {
  const son = state.sosyallesme_aksiyon_kilit[`mekan:${yerId}`];
  if (son === undefined) return 0;
  return Math.max(0, SOSYALLESME_MEKAN_COOLDOWN - (state.yil - son));
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
  ).map((yer) => {
    const kalanYil = mekanKalanYil(state, yer.id);
    return {
      ...yer,
      ziyaretSayisi: yer.alkolluMu ? state.alkol_ziyaret_sayisi : undefined,
      kilitli: kalanYil > 0,
      kalanYil,
      girisUcreti: paraYuvarla(SOSYALLESME_GIRIS_UCRETI * enflasyonCarpani(state)),
    };
  });
}

interface SosyallesmeSonucu {
  state: CharacterState;
  /** Bu mekâna gitmek için düşülen peşin giriş ücreti (enflasyonla ölçekli). */
  girisUcreti: number;
  /** true ise mekân olayı yerine bir tanışma (göz göze gelme) başladı — istemci /scenario çekmez, tanışma penceresini açar. */
  tanismaBasladi?: boolean;
}

/**
 * Oyuncunun istediği an tetikleyebileceği aksiyon: seçilen mekâna gitmeyi kabul
 * eder, peşin giriş ücretini düşer ve o mekâna ait bir olayı zorlanan-olay olarak
 * kuyruğa alır (oturum.zorlananOlayId). İstemci ardından POST /:id/scenario +
 * POST /:id/sosyallesme-olay ile olayı **tur harcamadan** çözer (§25). Her mekân
 * çözüldükten sonra SOSYALLESME_MEKAN_COOLDOWN yıl kilitlenir.
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
  if (mekanKalanYil(state, yerId) > 0) {
    throw new Error("Bu mekâna bu yıl zaten gittin; biraz zaman geçmeli.");
  }
  // Sırada bekleyen zorunlu bir olay (zincir adımı, veba başlangıcı...) varsa mekâna girmek
  // onu EZİP silerdi (zorlananOlayId tek slot). Mekân olayları hariç — terk edilmiş bir
  // mekân olayının üzerine başka bir mekâna gitmek serbest kalır.
  if (oturum.zorlananOlayId) {
    const bekleyen = OLAY_BANKASI.find((o) => o.id === oturum.zorlananOlayId);
    if (!bekleyen?.sosyallesmeYeri) {
      throw new Error("Önce önündeki olayı çöz; sonra mekâna gidebilirsin.");
    }
  }
  const girisUcreti = paraYuvarla(SOSYALLESME_GIRIS_UCRETI * enflasyonCarpani(state));
  if (state.para < girisUcreti) {
    throw new Error(`Cebinde bu mekâna gidecek kadar para yok (~${girisUcreti} ${state.para_birimi} giriş ücreti).`);
  }
  // Önce olayı seç (uygun olay yoksa fırlatır), parayı SONRA düş: hata durumunda ücret kaybolmasın.
  const olay = sosyallesmeIcinOlaySec(state, yerId);
  state.para = paraYuvarla(state.para - girisUcreti);
  oturum.zorlananOlayId = olay.id;
  // Ana oyun ekranında henüz cevaplanmamış bir senaryo (mevcutOlay/mevcutSenaryo)
  // duruyor olabilir (oyuncu olayı yanıtlamadan sahne hotspot'undan Sosyalleş'e
  // geçebilir) — senaryoUret bir mevcutOlay varken zorlananOlayId'yi TAMAMEN yok
  // sayıp o eski olayı aynen döndürür (§9 "sayfa yenileme" korumasıyla aynı kod
  // yolu). Bu yüzden burada temizlenmezse, oyuncu mekân olayını hiç görmeden
  // eski (mekâna ait olmayan) olayla karşılaşır ve POST /sosyallesme-olay
  // "Ortada çözülecek bir mekân olayı yok." hatasıyla reddeder — seçenekler
  // tıklanamaz gibi görünür. O olayı kaybetmemek için (oyuncu geri döndüğünde
  // istemci hâlâ onu hafızasında tutuyor, §19) burada sakliOlay'a taşınır;
  // sosyallesmeOlayCoz mekân olayı bitince (ya da terk edilip başka bir mekâna
  // gidilince) geri yüklenir. Bekleyen bir onTepki de aynı sebeple geçersiz.
  if (oturum.mevcutOlay && oturum.mevcutSenaryo && !oturum.sakliOlay) {
    oturum.sakliOlay = { olay: oturum.mevcutOlay, senaryo: oturum.mevcutSenaryo };
  }
  oturum.mevcutOlay = null;
  oturum.mevcutSenaryo = null;
  oturum.bekleyenTepki = null;
  await oturumKaydet(state);
  return { state, girisUcreti };
}

export interface SosyalOlaySonucu {
  state: CharacterState;
  basarili: boolean;
  uygulananEtki: SonucEtkisi;
  mesaj: string;
}

/**
 * Bir sosyalleşme mekân olayının seçimini **TUR HARCAMADAN** çözer (kullanıcı:
 * "mekânlara turda birer kez girelim, max 3 olay"). Normal /choice pipeline'ının
 * aksine ilerletYas / pasifEkonomi / yaşlanma / rütbe / haber ADIMLARI ÇALIŞMAZ;
 * yalnız seçimin SonucEtkisi deltaları + para primi/meslek çarpanı + suç kazancı
 * + sosyalleşme moral/masraf/ayyaş kuralı + (olay öldürücüyse) ölüm zarı uygulanır.
 * Çözülen mekân SOSYALLESME_MEKAN_COOLDOWN yıl kilitlenir. Sosyalleşme olayları
 * onTepki / zorunlu_sonraki / yeni_meslek / kriz / es_ata içermez (banka denetlendi).
 */
export async function sosyallesmeOlayCoz(id: string, secenekIndex: number): Promise<SosyalOlaySonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const { mevcutSenaryo, mevcutOlay } = oturum;
  if (!mevcutSenaryo || !mevcutOlay || !mevcutOlay.sosyallesmeYeri) {
    throw new Error("Ortada çözülecek bir mekân olayı yok.");
  }
  const secenek = mevcutSenaryo.secenekler[secenekIndex];
  const hamSecenek = secenek ? mevcutOlay.secenekler[secenek.ham_index ?? secenekIndex] : undefined;
  if (!secenek || !hamSecenek) throw new Error("Geçersiz seçenek index'i.");
  if (secenek.kilitli) throw new Error(secenek.kilit_nedeni ?? "Bu seçenek şu an seçilemez.");
  if (hamSecenek.onTepki) throw new Error("Bu seçim burada çözülemez.");

  const basarili = rollSuccess(secenek.basari_sansi);
  const etki = jitterUygula(basarili ? secenek.basarili_sonuc : secenek.basarisiz_sonuc);
  etki.mesaj = doldur(etki.mesaj, state);
  if (etki.detay) etki.detay = doldur(etki.detay, state);

  // Para primi + meslek metrik çarpanı (sonucuUygulaVeIlerlet ile aynı sıra/oran).
  if (etki.para && etki.para > 0) etki.para = paraYuvarla(etki.para * OLAY_PARA_PRIMI);
  if (etki.para && etki.para > 0) etki.para = Math.round(etki.para * meslekMetrikCarpani(state, mevcutOlay.kategori));
  ciftKazancKirp(state, etki, mevcutOlay.kategori);
  if (sucKazanciUygula(etki, basarili) === "gizli" && etki.suc_sinifi) {
    gizliSucKaydet(state, etki.suc_sinifi, mevcutOlay.baslik);
  }
  if (mevcutOlay.kategori === "savas") orduKaybiUygula(state, basarili);

  // Sosyalleşme moral/masraf/ayyaş kuralı (yer.alkolluMu ise ziyaret sayacı + damga).
  etki.para = paraYuvarla((etki.para ?? 0) - SOSYALLESME_EK_MASRAF * enflasyonCarpani(state));
  etki.mutluluk = (etki.mutluluk ?? 0) + SOSYALLESME_MORAL_BONUSU;
  const ziyaretEdilenYer = sosyallesmeYeriGetir(mevcutOlay.sosyallesmeYeri);
  if (ziyaretEdilenYer?.alkolluMu) ayyasZiyaretiIsle(state);
  // Evcil hayvan pasif bonusları (Şahin: mekânda gösteriş +1 şöhret; Kedi/Köpek: kayıp hafifletme).
  hayvanOlayEtkisiUygula(state, etki, mevcutOlay.kategori);
  if (hayvanBonusVar(state, "sahin_sohret")) etki.un = (etki.un ?? 0) + 1;

  // Temel stat deltaları.
  state.para = paraYuvarla(state.para + (etki.para ?? 0));
  state.un += etki.un ?? 0;
  state.ahlak += etki.ahlak ?? 0;
  state.saglik += etki.saglik ?? 0;
  state.mutluluk += etki.mutluluk ?? 0;
  state.dost_puani += etki.dost_puani ?? 0;
  state.rakip_puani += etki.rakip_puani ?? 0;

  // Meslek metrikleri + kariyer puanı + suç/aranma.
  if (etki.ordu_techizat_artis) {
    state.ordu_techizat_seviyesi = Math.min(100, state.ordu_techizat_seviyesi + etki.ordu_techizat_artis);
  }
  // v10: ticaret_sermaye_artis / nufuz_artis artık etkisiz (Tüccar/Din işletmesi bu sayaçları kullanmaz).
  if (etki.uretim_kapasitesi_artis) {
    state.uretim_kapasitesi = Math.min(100, Math.max(0, state.uretim_kapasitesi + etki.uretim_kapasitesi_artis));
  }
  metrikGucKatkisiUygula(state, etki);
  if (basarili && MESLEK_KATEGORI[state.meslek] === mevcutOlay.kategori) {
    state.kariyer_puani += KARIYER_PUANI_KATEGORI_BASARI * (1 + (state.meslek_tecrube_hizi ?? 0)) * hayvanKariyerCarpani(state);
    // Meslek pazarı: mesleğinde başarılı her iş pazardaki gücünü artırır.
    musteriEkleTam(state, MUSTERI_KATEGORI_BASARI * (1 + (state.meslek_tecrube_hizi ?? 0)));
  }
  if (etki.kariyer_puani_artis) state.kariyer_puani += etki.kariyer_puani_artis;
  const sucOnce = state.suc_seviyesi;
  if (etki.suc_artis) state.suc_seviyesi += etki.suc_artis;
  if ((etki.suc_artis ?? 0) > 0) sucArtisiKaydet(state);
  if (etki.suc_seviyesi_ayarla !== undefined) state.suc_seviyesi = etki.suc_seviyesi_ayarla;
  etki.suc_degisim = sucDegisimiHesapla(sucOnce, state.suc_seviyesi);
  if (etki.suc_degisim >= SUC_ES_ESIGI) AS.esBarDusur(state, SUC_ES_ZARARI); // ağır suç eşin güvenini sarsar
  etkenGunluguNotEt(state, mevcutOlay.baslik, etki);

  // Sosyalleşme olaylarının kullandığı seyrek alanlar (banka denetimi: ekip_ekle 1×, unvan_kazan 2×).
  if (etki.ekip_ekle) ekipUyesiEkle(state, etki.ekip_ekle.rol, etki.ekip_ekle.tahminGenisligi);
  if (etki.ekip_kaybi && state.ekip.length > 0) {
    const kaybedilen = state.ekip.splice(Math.floor(Math.random() * state.ekip.length), 1)[0];
    hayatOlayiEkle(state, "👋", T(state.dil, "{0} ekipten ayrıldı", [kaybedilen.isim]));
  }
  if (etki.unvan_kazan && !state.unvanlar.includes(etki.unvan_kazan)) {
    state.unvanlar.push(etki.unvan_kazan);
    hayatOlayiEkle(state, "🏵️", T(state.dil, '"{0}" ünvanını kazandı', [K(state.dil, etki.unvan_kazan)]));
  }

  etiketEkle(state, etki.etiket_ekle);
  etiketSil(state, etki.etiket_sil);
  durumEkle(state, etki.durum_ekle);
  if (etki.durum_sil) state.durumlar = state.durumlar.filter((d) => !etki.durum_sil!.includes(d.id));

  clampStats(state);

  // Zaman ilerlemese de olay öldürebilir (meyhane bıçağı vb.).
  const mekanMesajCeviri = olaySonucMesajiIkiDil(
    state,
    mevcutOlay.id,
    secenek.ham_index ?? secenekIndex,
    basarili ? "basarili" : "basarisiz",
    etki.mesaj
  );
  if (etki.olum === true) {
    checkDeath(state, true, mekanMesajCeviri);
  } else if (etki.olum_sansi && Math.random() * 100 < efektifOlumSansi(etki.olum_sansi, state.saglik)) {
    checkDeath(state, true, mekanMesajCeviri);
  }
  if (!state.aktif && etki.efsanevi_olum && !state.efsanevi_olum) {
    state.efsanevi_olum = etki.efsanevi_olum;
  }

  state.sosyallesme_aksiyon_kilit[`mekan:${mevcutOlay.sosyallesmeYeri}`] = state.yil;
  // Çözülen mekân olayını geçmişe yaz: sosyallesmeIcinOlaySec "hiç görülmemiş > en eski" önceliğini
  // gecmis_olaylar'a göre yapar; yazılmazsa aynı olay tekrar tekrar çıkabiliyordu.
  state.gecmis_olaylar.push(mevcutOlay.id);
  oturum.zorlananOlayId = null;

  // Mekân olayı bitti — sosyallesmeYerineGit'te kenara ayrılmış ana oyun olayı
  // varsa (§ yukarıdaki not) burada geri yüklenir, oyuncu "Geri Dön"düğünde
  // kaldığı yerden (aynı olayla) devam eder; yoksa mevcutOlay/mevcutSenaryo
  // normal şekilde boşaltılır (bir sonraki /scenario yeni bir olay üretir).
  if (state.aktif && oturum.sakliOlay) {
    oturum.mevcutOlay = oturum.sakliOlay.olay;
    oturum.mevcutSenaryo = oturum.sakliOlay.senaryo;
    oturum.sakliOlay = null;
  } else {
    oturum.mevcutOlay = null;
    oturum.mevcutSenaryo = null;
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, basarili, uygulananEtki: etki, mesaj: etki.mesaj };
}

/**
 * Alkollü bir sosyalleşme etkileşimi sonrası ziyaret sayacını artırır; eşiğe İLK
 * kez ulaşıldığında (bagimlilik:ayyas henüz yoksa) kalıcı "ayyaşlık" damgasını
 * vurar (rising-edge, tersine dönüşü yok — tek çıkışı sosyal_meyhane_ayilma).
 * Damga bu çağrıda vurulduysa true döner.
 */
function ayyasZiyaretiIsle(state: CharacterState): boolean {
  state.alkol_ziyaret_sayisi += 1;
  if (state.alkol_ziyaret_sayisi >= AYYAS_ESIGI && !state.etiketler.includes("bagimlilik:ayyas")) {
    etiketEkle(state, ["bagimlilik:ayyas", "bagimlilik:var"]);
    state.ahlak -= 10;
    state.un -= 15;
    durumEkle(state, {
      id: "ayyaslik",
      ad: "Ayyaşlık",
      tur: "kalici",
      yil_basi_saglik: -0.7,
      yil_basi_mutluluk: -0.7,
    });
    maasCarpaniUygula(state, 0.95);
    hayatOlayiEkle(state, "🍷", "Artık bir ayyaş olarak tanınıyor");
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Sosyalleşme ekranı — tur harcamayan aksiyonlar (içki / deli / sadaka / kulak / ısmarla / fal)
// ---------------------------------------------------------------------------

export interface SosyalAksiyonKarti {
  /** "icki:<icecekId>" ya da "deli"|"sadaka"|"kulak"|"ismarla"|"fal". */
  id: string;
  tur: "icki" | "aksiyon";
  simge: string;
  ad: string;
  aciklama: string;
  fiyat: number;
  alkollu?: boolean;
  gizli?: boolean;
  kilitli: boolean;
  /** Cooldown'un dolmasına kalan oyun yılı (0 = hazır). */
  kalanYil: number;
  neden?: string;
}

export interface SosyalAksiyonConfig {
  icecekler: SosyalAksiyonKarti[];
  aksiyonlar: SosyalAksiyonKarti[];
  alkolluMekanVar: boolean;
  /** Bilek güreşi mini oyununun tekrar oynanabilmesine kalan oyun yılı (0 = hazır). */
  bilekGuresiKalanYil: number;
}

function aksiyonKalanYil(state: CharacterState, anahtar: string): number {
  const cd = AKSIYON_COOLDOWN[anahtar] ?? 0;
  const son = state.sosyallesme_aksiyon_kilit[anahtar];
  if (son === undefined) return 0;
  return Math.max(0, cd - (state.yil - son));
}

/** Basit, hızlı ve deterministik bir string hash (djb2 varyantı) — rastgele rotasyon tohumu için. */
function basitHash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h >>> 0;
}

/** Tohumlu, hızlı bir PRNG (mulberry32) — Math.random() yerine deterministik rotasyon için. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sosyalleş ekranının tur-harcamayan aksiyon havuzu (9 aksiyon) her zaman
 * TAMAMEN gösterilmez — "her tur değişsin, hep aynı şeyler olmasın" isteğiyle
 * her karakter için `AKSIYON_ROTASYON_PERIYODU_YIL` yıl boyunca sabit kalan,
 * o karaktere özgü (state.id ile tohumlanmış) rastgele bir 3'lü seçilir.
 * Aynı karakter aynı yıl aralığında tutarlı bir liste görür (sayfayı her
 * yenilediğinde değişmez), ama birkaç yıl geçince ya da başka bir karakterde
 * farklı bir 3'lü çıkar.
 */
export function aktifAksiyonRotasyonu(state: CharacterState): Set<string> {
  const donem = Math.floor(state.yil / AKSIYON_ROTASYON_PERIYODU_YIL);
  const rnd = mulberry32(basitHash(state.id) ^ donem);
  const havuz = [...AKSIYON_ROTASYON_HAVUZU];
  for (let i = havuz.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [havuz[i], havuz[j]] = [havuz[j], havuz[i]];
  }
  return new Set<string>(havuz.slice(0, AKSIYON_ROTASYON_GOSTERIM));
}

/** Sosyalleş ekranının tur-harcamayan aksiyon panelinin canlı hâlini döner. */
export async function sosyallesmeAksiyonConfigGetir(id: string): Promise<SosyalAksiyonConfig> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const bos: SosyalAksiyonConfig = { icecekler: [], aksiyonlar: [], alkolluMekanVar: false, bilekGuresiKalanYil: 0 };
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return bos;

  const en = state.dil === "en";
  const enfl = enflasyonCarpani(state);
  const alkolluMekanVar = SOSYALLESME_YERLERI.some(
    (y) => y.alkolluMu && sosyallesmeYeriUygunMu(y, state.cag, state.bolge, state.meslek)
  );

  const icecekBekleyen = aksiyonKalanYil(state, "icki");
  const icecekler: SosyalAksiyonKarti[] = bolgeIcecekleri(state.cag, state.bolge).map((ic) => {
    const fiyat = Math.max(1, paraYuvarla((ic.alkollu ? 5 : 3) * enfl));
    const paraYok = state.para < fiyat;
    return {
      id: `icki:${ic.id}`,
      tur: "icki" as const,
      simge: ic.alkollu ? "🍺" : "🥤",
      ad: en ? ic.adEn : ic.ad,
      aciklama: ic.gizli
        ? T(state.dil, "Yasak ama... bir kadeh. Ahlakın ve itibarın çentik yer.")
        : ic.alkollu
          ? T(state.dil, "Keyiflenirsin ama ertesi gün ağır olur.")
          : T(state.dil, "Hafif bir keyif, zararsız."),
      fiyat,
      alkollu: ic.alkollu,
      gizli: ic.gizli,
      kilitli: icecekBekleyen > 0 || paraYok,
      kalanYil: icecekBekleyen,
      neden:
        icecekBekleyen > 0
          ? T(state.dil, "Bu yıl bir şey içtin.")
          : paraYok
            ? T(state.dil, "Yeterli paran yok.")
            : undefined,
    };
  });

  const rotasyon = aktifAksiyonRotasyonu(state);
  const aksiyonlar: SosyalAksiyonKarti[] = SOSYAL_AKSIYONLAR.filter((a) => rotasyon.has(a.id)).map((a) => {
    const bekleyen = aksiyonKalanYil(state, a.id);
    const fiyat = a.tabanFiyat === 0 ? 0 : Math.max(1, paraYuvarla(a.tabanFiyat * enfl));
    const mekanEngeli = a.alkolluMekanGerekir === true && !alkolluMekanVar;
    const paraYok = state.para < fiyat;
    return {
      id: a.id,
      tur: "aksiyon" as const,
      simge: a.simge,
      ad: en ? a.adEn : a.ad,
      aciklama: en ? a.aciklamaEn : a.aciklama,
      fiyat,
      kilitli: bekleyen > 0 || mekanEngeli || paraYok,
      kalanYil: bekleyen,
      neden:
        bekleyen > 0
          ? T(state.dil, "Yakında tekrar yapabilirsin.")
          : mekanEngeli
            ? T(state.dil, "Bunun için alkollü bir mekân gerek.")
            : paraYok
              ? T(state.dil, "Yeterli paran yok.")
              : undefined,
    };
  });

  return { icecekler, aksiyonlar, alkolluMekanVar, bilekGuresiKalanYil: aksiyonKalanYil(state, "bilek") };
}

export interface SosyalAksiyonSonucu {
  state: CharacterState;
  mesaj: string;
}

/**
 * Tur harcamayan bir sosyalleşme aksiyonunu uygular. `aksiyonId` ya
 * "icki:<icecekId>" ya da "deli"|"sadaka"|"kulak"|"ismarla"|"fal". Etkiler
 * jitter'sız ve doğrudan; her aksiyonun kendi cooldown'ı (oyun yılı) vardır.
 */
export async function sosyallesmeAksiyonYap(
  id: string,
  aksiyonId: string,
  varyant?: string
): Promise<SosyalAksiyonSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken sosyalleşemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bunu yapamazsın.");

  const birim = state.para_birimi;
  const enfl = enflasyonCarpani(state);
  let mesaj = "";

  if (aksiyonId.startsWith("icki:")) {
    if (aksiyonKalanYil(state, "icki") > 0) throw new Error("Bu yıl zaten bir şey içtin.");
    const ic = icecekTanimiGetir(state.cag, state.bolge, aksiyonId.slice(5));
    if (!ic) throw new Error("Böyle bir içki yok.");
    const fiyat = Math.max(1, paraYuvarla((ic.alkollu ? 5 : 3) * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);

    if (ic.alkollu) {
      state.mutluluk += 6;
      state.saglik -= 2;
      mesaj = T(state.dil, "{0} devirdin. Keyiflendin ama yarın seni bekliyor.", [state.dil === "en" ? ic.adEn : ic.ad]);
      const damga = ayyasZiyaretiIsle(state);
      if (damga) mesaj += " " + T(state.dil, "Meydan artık seni 'ayyaş' diye anıyor.");
    } else {
      state.mutluluk += 3;
      state.saglik += 1;
      mesaj = T(state.dil, "{0} içtin. Hafif, tatlı bir mola.", [state.dil === "en" ? ic.adEn : ic.ad]);
    }
    if (ic.gizli) {
      state.ahlak -= 4;
      state.un -= 2;
      mesaj += " " + T(state.dil, "Gören olmadı sandın ama fısıltı çabuk yayılır.");
    }
    state.sosyallesme_aksiyon_kilit["icki"] = state.yil;
    clampStats(state);
    await oturumKaydet(state);
    // İçki adları küçük harfle başlıyor ("bir sürahi şarap..."); cümle başı büyük olsun.
    mesaj = mesaj.charAt(0).toLocaleUpperCase(state.dil === "en" ? "en" : "tr") + mesaj.slice(1);
    return { state, mesaj };
  }

  const tanim = sosyalAksiyonTanimiGetir(aksiyonId);
  if (!tanim) throw new Error("Böyle bir aksiyon yok.");
  if (!aktifAksiyonRotasyonu(state).has(aksiyonId)) throw new Error("Bu aksiyon şu an mevcut değil.");
  if (aksiyonKalanYil(state, aksiyonId) > 0) throw new Error("Bunu yakında tekrar yapamazsın.");

  if (aksiyonId === "deli") {
    const fiyat = Math.max(1, paraYuvarla(2 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    const d = 1 + Math.floor(Math.random() * 6);
    if (d === 1) {
      etiketEkle(state, ["istihbarat_var"]);
      state.mutluluk += 2;
      mesaj = T(state.dil, "Deli anlamsız sözler arasında sıradaki işini tarif eder gibi bir şeyler saydı. Tüylerin ürperdi ama kulağın açıldı.");
    } else if (d === 2) {
      state.mutluluk += 7;
      mesaj = T(state.dil, "Delinin taklitleri meydanı kırıp geçirdi; karnın ağrıyana kadar güldün.");
    } else if (d === 3) {
      state.mutluluk -= 4;
      mesaj = T(state.dil, "Deli gözlerini kısıp kulağına bir isim ve bir yıl fısıldadı. Gece boyu uyuyamadın.");
    } else if (d === 4) {
      const ekstra = Math.max(1, paraYuvarla(2 * enfl));
      state.para = paraYuvarla(state.para - ekstra);
      state.un += 4;
      mesaj = T(state.dil, "Deliye avuç dolusu bozukluk verdin; 'ne cömert adam' diye fısıldandı meydan.");
    } else if (d === 5) {
      state.ahlak += 4;
      state.mutluluk += 3;
      mesaj = T(state.dil, "Deli bir an durulup gayet aklı başında bir öğüt verdi. İçin tuhaf bir şekilde ısındı.");
    } else {
      state.mutluluk += 2;
      mesaj = T(state.dil, "Deli bir süre peşinden yürüdü, uydurma bir marş söyledi, sonra kayboldu.");
    }
  } else if (aksiyonId === "sadaka") {
    const fiyat = Math.max(1, paraYuvarla(4 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    state.ahlak += 4;
    state.mutluluk += 3;
    state.un += 2;
    state.omur_sadaka_sayisi = (state.omur_sadaka_sayisi ?? 0) + 1; // "Sadaka Taşı" amacı
    mesaj = T(state.dil, "Kesenden {0} {birim} çıkarıp dağıttın; içindeki düğüm biraz çözüldü.", [fiyat]).replace(
      /\{birim\}/g,
      birim
    );
  } else if (aksiyonId === "kulak") {
    const r = Math.random();
    if (r < 0.25) {
      etiketEkle(state, ["istihbarat_var"]);
      mesaj = T(state.dil, "Yan masada bir görevli sıradaki seferden dem vurdu — kulağın açık, bir sonraki işi daha net göreceksin.");
    } else if (r < 0.35) {
      state.mutluluk -= 2;
      mesaj = T(state.dil, "Kulak misafiri olduğun dedikodu senin hakkındaydı ve hiç hoş değildi.");
    } else {
      const haberler = haberleriUret(state);
      mesaj =
        haberler[Math.floor(Math.random() * haberler.length)] ??
        T(state.dil, "Çarşı her zamanki gibi kaynıyor: kim kiminle küs, hangi tüccar batmış, kimin oğlu askere yazılmış...");
    }
  } else if (aksiyonId === "ismarla") {
    const alkolluMekanVar = SOSYALLESME_YERLERI.some(
      (y) => y.alkolluMu && sosyallesmeYeriUygunMu(y, state.cag, state.bolge, state.meslek)
    );
    if (!alkolluMekanVar) throw new Error("Bunun için alkollü bir mekân gerek.");
    const fiyat = Math.max(1, paraYuvarla(7 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    state.mutluluk += 7;
    state.un += 4;
    state.dost_puani += 3;
    mesaj = T(state.dil, "Bütün masaya bir tur ısmarladın; kadehler senin şerefine kalktı, birkaç yeni yüz sana dost oldu.");
  } else if (aksiyonId === "fal") {
    const fiyat = Math.max(1, paraYuvarla(5 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    const r = Math.random();
    if (r < 0.55) {
      state.mutluluk += 3;
      mesaj =
        Math.random() < 0.5
          ? T(state.dil, "Falcı avucundaki çizgileri izledi: 'Uzun bir yol, ortasında beklenmedik bir kısmet' dedi.")
          : T(state.dil, "Fincanın dibinde bir kuş görmüş: 'Haber gelecek' dedi, o kadar.");
    } else if (r < 0.75) {
      state.mutluluk += 10;
      mesaj = T(state.dil, "'Yakında yüzün gülecek' dedi falcı ve nedense buna bütün kalbinle inandın.");
    } else if (r < 0.9) {
      state.mutluluk -= 8;
      mesaj = T(state.dil, "Falcının yüzü asıldı, fincanı hızla ters kapattı. 'Bu ay temkinli ol' demekle yetindi.");
    } else {
      etiketEkle(state, ["istihbarat_var"]);
      mesaj = T(state.dil, "Falcı ürkütücü bir kesinlikle sıradaki işini tarif etti. Ensende bir ürperti.");
    }
  } else if (aksiyonId === "hikaye_anlat") {
    const fiyat = Math.max(1, paraYuvarla(6 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    const r = Math.random();
    if (r < 0.5) {
      state.un += 5;
      state.mutluluk += 3;
      mesaj = T(state.dil, "Anlattığın hikaye ağızdan ağıza dolaştı; birkaç gün senden bahsedildi.");
    } else if (r < 0.8) {
      state.un += 2;
      state.mutluluk += 1;
      mesaj = T(state.dil, "Hikayeni sabırla dinlediler, kibarca gülümsediler. Fena değildi.");
    } else {
      state.un -= 1;
      state.mutluluk -= 3;
      mesaj = T(state.dil, "Hikayeni beğenmediler, arkandan kıkırdadılar.");
    }
  } else if (aksiyonId === "muzik_dinle") {
    const fiyat = Math.max(1, paraYuvarla(3 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    state.mutluluk += 5;
    state.saglik += 1;
    mesaj = T(state.dil, "Gezgin ozanın türküsü içini ısıttı; bir an her şeyi unuttun.");
  } else if (aksiyonId === "yerliye_sor") {
    const fiyat = Math.max(1, paraYuvarla(6 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    const r = Math.random();
    if (r < 0.45) {
      etiketEkle(state, ["istihbarat_var"]);
      state.mutluluk += 1;
      mesaj = T(state.dil, "Yerli biri sana açık konuştu, kafanda bölgenin tam bir haritasını çizdi.");
    } else if (r < 0.8) {
      const haberler = haberleriUret(state);
      mesaj =
        haberler[Math.floor(Math.random() * haberler.length)] ??
        T(state.dil, "Bölge hakkında sıradan, malum şeyler anlattı.");
      state.mutluluk += 1;
    } else {
      state.mutluluk -= 2;
      mesaj = T(state.dil, "Seni yanlış yönlendirdi — bir süre boşuna dolaştın, sinirin bozuldu.");
    }
  } else if (aksiyonId === "bahis_izle") {
    const fiyat = Math.max(1, paraYuvarla(5 * enfl));
    if (state.para < fiyat) throw new Error(`Yeterli paran yok (${fiyat} ${birim} gerekli).`);
    state.para = paraYuvarla(state.para - fiyat);
    state.suc_seviyesi = Math.min(100, state.suc_seviyesi + 1);
    sucArtisiKaydet(state);
    if (Math.random() < 0.45) {
      state.para = paraYuvarla(state.para + fiyat * 2);
      state.mutluluk += 4;
      state.omur_kumar_net = (state.omur_kumar_net ?? 0) + fiyat;
      mesaj = T(state.dil, "Bahsi kazandın! Kalabalık seninle birlikte bağırdı, kesen ağırlaştı.");
    } else {
      state.mutluluk -= 3;
      state.omur_kumar_net = (state.omur_kumar_net ?? 0) - fiyat;
      mesaj = T(state.dil, "Bahsi kaybettin; parana yazık oldu ama en azından dövüş/koşu heyecanlıydı.");
    }
  } else {
    throw new Error("Böyle bir aksiyon yok.");
  }

  state.sosyallesme_aksiyon_kilit[aksiyonId] = state.yil;
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
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
        ? T(state.dil, "Yakın zamanda temel ürün aldın; bir süre sonra tekrar alışveriş yapabilirsin.")
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
    throw new Error(T(state.dil, "Yakın zamanda temel ürün aldın; bir süre sonra tekrar alışveriş yapabilirsin."));
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
    mesaj += " " + T(state.dil, "Envanterine eklendi — uzun süre kullanmazsan bozulur. Bir süre temel ürün alışverişi yapamazsın.");
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

// ---------------------------------------------------------------------------
// Hediye et: magaza_envanteri'nden bir eşyayı eş/çocuk/ekip/dosta ver → ilişki
// puanı artar (§26 "hediye" altyapısı). Eşya tüketilir. Turu tüketmez.
// ---------------------------------------------------------------------------

interface HediyeSonucu {
  state: CharacterState;
  mesaj: string;
}

export async function hediyeEt(
  id: string,
  esyaId: string,
  hedefTur: "es" | "cocuk" | "ekip" | "dost",
  opts: { cocukIndex?: number; ekipId?: string } = {}
): Promise<HediyeSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const index = state.magaza_envanteri.findIndex((e) => e.id === esyaId);
  if (index === -1) throw new Error("Envanterinde böyle bir eşya yok.");
  const esya = state.magaza_envanteri[index];
  const tanim = magazaEsyasiTanimiGetir(esya.katalogId);
  // Lüks eşya koleksiyon parçasıdır (şöhret verir, türünden bir tane tutulur): hediye edilirse
  // aynısı yeniden alınıp ilişki/şöhret kasılabilirdi — yalnız tüketim ("sifa") eşyası hediye edilir.
  if (esya.kategori === "luks") throw new Error("Lüks eşyalar koleksiyon parçasıdır; hediye edilemez.");
  const artis = Math.max(3, Math.min(14, Math.round((tanim?.tabanFiyat ?? 20) / 12)));
  const dil = state.dil;
  let mesaj: string;

  if (hedefTur === "es") {
    if (!state.es_adi) throw new Error("Evli değilsin.");
    state.es_puani = Math.min(100, state.es_puani + artis);
    state.mutluluk += 2;
    mesaj = T(dil, "{0}'e {1} hediye ettin; çok mutlu oldu (+{2} ilişki).", [state.es_adi, K(dil, esya.ad), artis]);
  } else if (hedefTur === "cocuk") {
    const yasayanlar = state.cocuklar.map((c, i) => ({ c, i })).filter((x) => x.c.yasiyor);
    if (yasayanlar.length === 0) throw new Error("Yaşayan çocuğun yok.");
    const secili =
      opts.cocukIndex !== undefined && state.cocuklar[opts.cocukIndex]?.yasiyor
        ? { c: state.cocuklar[opts.cocukIndex], i: opts.cocukIndex }
        : yasayanlar[0];
    secili.c.iliski = Math.min(100, (secili.c.iliski ?? 60) + artis + 2);
    state.mutluluk += 2;
    mesaj = T(dil, "{0}'e {1} hediye ettin (+{2} ilişki).", [secili.c.isim, K(dil, esya.ad), artis + 2]);
  } else if (hedefTur === "ekip") {
    if (state.ekip.length === 0) throw new Error("Ekibinde kimse yok.");
    const uye = opts.ekipId ? state.ekip.find((e) => e.id === opts.ekipId) : state.ekip[0];
    if (!uye) throw new Error("Ekip üyesi bulunamadı.");
    uye.sadakat = Math.min(100, uye.sadakat + artis);
    mesaj = T(dil, "{0}'e {1} hediye ettin; sadakati arttı (+{2}).", [uye.isim, K(dil, esya.ad), artis]);
  } else {
    state.dost_puani = Math.min(100, state.dost_puani + artis);
    state.mutluluk += 1;
    mesaj = T(dil, "{0}'e {1} hediye ettin (+{2} dostluk).", [state.dost_adi, K(dil, esya.ad), artis]);
  }

  state.omur_hediye_sayisi = (state.omur_hediye_sayisi ?? 0) + 1; // "Hediye Ağı" amacı
  state.magaza_envanteri.splice(index, 1);
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

// ---------------------------------------------------------------------------
// Kalıcı salgından korunma yatırımı (§27): veba GELMEDEN önce para harcayıp bir
// sonraki dalganın taban korunma kademesini yükselt. Turu tüketmez.
// ---------------------------------------------------------------------------

export interface SalginKorunmaKarti {
  kademe: number;
  ad: string;
  aciklama: string;
  maliyet: number;
  sahipMi: boolean;
  alinabilir: boolean;
}

const SALGIN_KORUNMA_TABAN_MALIYET = [0, 22, 55];

export async function salginKorunmaConfigGetir(
  id: string
): Promise<{ kartlar: SalginKorunmaKarti[]; aktifKademe: number; vebaVar: boolean }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  const aktifKademe = state.salgin_korunma_yatirimi?.kademe ?? 0;
  const vebaVar = !!state.veba?.aktif;
  const meta = [
    { kademe: 1, ad: "Hekim anlaşması + temiz su", aciklama: "Bir sonraki salgında kısmi korunma (bulaşma riskini düşürür)." },
    { kademe: 2, ad: "Karantina evi", aciklama: "Bir sonraki salgında tam korunma (en düşük bulaşma riski)." },
  ];
  const kartlar: SalginKorunmaKarti[] = meta.map((m) => ({
    kademe: m.kademe,
    ad: m.ad,
    aciklama: m.aciklama,
    maliyet: Math.max(1, paraYuvarla(SALGIN_KORUNMA_TABAN_MALIYET[m.kademe] * enflasyon)),
    sahipMi: aktifKademe >= m.kademe,
    alinabilir: !vebaVar && aktifKademe < m.kademe,
  }));
  return { kartlar, aktifKademe, vebaVar };
}

export async function salginKorunmaYatirimiYap(
  id: string,
  kademe: number
): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (kademe !== 1 && kademe !== 2) throw new Error("Geçersiz korunma kademesi.");
  if (state.veba?.aktif) throw new Error("Salgın çoktan başladı; artık hazırlık yapamazsın.");
  const mevcut = state.salgin_korunma_yatirimi?.kademe ?? 0;
  if (mevcut >= kademe) throw new Error("Bu korunma kademesine zaten sahipsin.");
  const enflasyon = enflasyonCarpani(state);
  const maliyet = Math.max(1, paraYuvarla(SALGIN_KORUNMA_TABAN_MALIYET[kademe] * enflasyon));
  if (state.para < maliyet) throw new Error(`Yeterli paran yok (${maliyet} ${state.para_birimi} gerekli).`);
  state.para = paraYuvarla(state.para - maliyet);
  state.salgin_korunma_yatirimi = { kademe, yil: state.yil };
  clampStats(state);
  await oturumKaydet(state);
  return {
    state,
    mesaj: T(state.dil, "Salgına karşı hazırlık yaptın (kademe {0}). Bir sonraki dalgada işine yarayacak.", [kademe]),
  };
}

// ---------------------------------------------------------------------------
// Kredi / tefeci endpoint sarmalayıcıları
// ---------------------------------------------------------------------------

export async function krediConfigGetir(id: string): Promise<{
  aktifKredi: CharacterState["kredi"];
  maksTutar: number;
  minTutar: number;
  teklifler: KrediTeklifi[];
}> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  const teklifler = krediTeklifleri(state);
  await oturumKaydet(state); // teklifler ilk kez/yenilenerek seçilmiş olabilir
  return {
    aktifKredi: state.kredi,
    maksTutar: krediMaksTutar(state),
    minTutar: Math.max(1, Math.round(20 * enflasyon)),
    teklifler,
  };
}

export async function krediAlEndpoint(id: string, teklifId: string): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  hapisYolculukEngeli(state, "tefeciyle iş göremezsin");
  const mesaj = krediAl(state, teklifId);
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

export async function krediPazarlikEndpoint(id: string): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  hapisYolculukEngeli(state, "tefeciyle pazarlık edemezsin");
  const mesaj = krediPazarlik(state);
  await oturumKaydet(state);
  return { state, mesaj };
}
