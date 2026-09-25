import { randomUUID } from "crypto";
import { CharacterState, Cag, SenaryoResponse, SonucEtkisi, TepkiSonucu, MulkTuru, EvlilikAdayi } from "../types";
import { T, K, Khukumdar } from "../i18n";
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
  hesaplaSkor,
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
  rakipSoygunKontrolEt,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaYillikKontrol,
  vebaHastaligiKontrol,
  vebaHastaligiBaslatEt,
  vebaBitisKontrolEt,
  kucukKrizKontrolEt,
  MESLEK_KATEGORI,
  eskiKayitGocu,
  aileYillikUygula,
  yonetimYillikUygula,
  havuzKilidiVar,
  rakipGucKir,
  rakipMisillemesiDene,
  rakiplerGuncelle,
  RAKIP_KOTU_IS_HEDEFLERI,
  krediAl,
  krediPazarlik,
  krediYillikUygula,
  krediMaksTutar,
  krediFaizTeklifi,
  krediKademeleri,
} from "./stateManager";
import { rutbeTanimiGetir, KARIYER_PUANI_YILLIK, KARIYER_PUANI_KATEGORI_BASARI } from "../data/rutbeler";
import { KOTU_ISLER, kotuIsTanimiGetir, KotuIsEtki } from "../data/kotuIsler";
import { rollSuccess } from "./diceRoll";
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
import {
  rastgeleHayvanTuruSec,
  rastgeleHayvanIsmiSec,
  EVCIL_HAYVAN_TAKIP_OLAY_IDLERI,
  EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI,
} from "../data/evcilHayvanlar";
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../data/gizemliEsyalar";
import { yerlesimGetir } from "../data/yerlesimler";
import { oturumKaydet, oturumYukle, aktifOturumlariYukle, bitmisOturumlariYukle, oturumYasiSaniye } from "../db/sessionRepository";
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
  "Orta Çağ|Asker": [
    { yas: 18, hedef: 1 },
    { yas: 27, hedef: 2 },
    { yas: 35, hedef: 3 },
    { yas: 43, hedef: 4 },
    { yas: 51, hedef: 5 },
    { yas: 60, hedef: 6 },
  ],
  "Orta Çağ|Din Adamı": [
    { yas: 20, hedef: 1 },
    { yas: 29, hedef: 2 },
    { yas: 38, hedef: 3 },
    { yas: 47, hedef: 4 },
    { yas: 56, hedef: 5 },
    { yas: 65, hedef: 6 },
  ],
  "Orta Çağ|Tüccar": [
    { yas: 19, hedef: 1 },
    { yas: 31, hedef: 2 },
    { yas: 43, hedef: 3 },
    { yas: 55, hedef: 4 },
  ],
  "Sanayi Devrimi|Asker": [
    { yas: 18, hedef: 1 },
    { yas: 30, hedef: 2 },
    { yas: 42, hedef: 3 },
    { yas: 54, hedef: 4 },
  ],
  "Sanayi Devrimi|Tüccar": [
    { yas: 22, hedef: 1 },
    { yas: 36, hedef: 2 },
    { yas: 50, hedef: 3 },
    { yas: 64, hedef: 4 },
  ],
  "Sanayi Devrimi|Din Adamı": [
    { yas: 23, hedef: 1 },
    { yas: 37, hedef: 2 },
    { yas: 51, hedef: 3 },
    { yas: 65, hedef: 4 },
  ],
  // Zanaatkâr: dal başına ~11 olay → hedef 4 (%36), diğer 4 sistemle aynı
  // yoğunlaştırılmış desen (kariyer yolu densifikasyonu, yukarıdaki not).
  "Orta Çağ|Zanaatkâr": [
    { yas: 21, hedef: 1 },
    { yas: 34, hedef: 2 },
    { yas: 46, hedef: 3 },
    { yas: 58, hedef: 4 },
  ],
  "Sanayi Devrimi|Zanaatkâr": [
    { yas: 25, hedef: 1 },
    { yas: 39, hedef: 2 },
    { yas: 53, hedef: 3 },
    { yas: 67, hedef: 4 },
  ],
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
  const aday = gorulmemis.length > 0 ? gorulmemis : secimHavuzu;
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
const GENEL_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 22, hedef: 1 },
  { yas: 32, hedef: 1 },
  { yas: 42, hedef: 2 },
  { yas: 52, hedef: 2 },
  { yas: 62, hedef: 3 },
  { yas: 72, hedef: 4 },
  { yas: 82, hedef: 5 },
  { yas: 92, hedef: 6 },
];

/**
 * 6 meslek-standalone havuzun (ortaCagAsker/Tuccar/DinAdami, sanayiAsker/
 * Tuccar/DinAdami, ~18-27 olay/dosya) hepsi aynı kontrol noktalarını
 * paylaşır — her biri zaten yalnız eşleşen çağ×meslek'te devreye girer
 * (`temelUygunMu` içindeki cag/meslekler filtresi). genel.ts ile aynı 4.
 * kalibrasyon turunda küçültüldü (bkz. yukarısı); yaşlar 5. turda kaydırıldı.
 */
const MESLEK_STANDALONE_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 24, hedef: 1 },
  { yas: 43, hedef: 2 },
  { yas: 60, hedef: 3 },
  { yas: 81, hedef: 4 },
];

const MESLEK_STANDALONE_HAVUZLARI: Record<string, OlayTanimi[]> = {
  "Orta Çağ|Asker": OLAY_ORTACAG_ASKER,
  "Orta Çağ|Tüccar": OLAY_ORTACAG_TUCCAR,
  "Orta Çağ|Din Adamı": OLAY_ORTACAG_DINADAMI,
  "Sanayi Devrimi|Asker": OLAY_SANAYI_ASKER,
  "Sanayi Devrimi|Tüccar": OLAY_SANAYI_TUCCAR,
  "Sanayi Devrimi|Din Adamı": OLAY_SANAYI_DINADAMI,
};

const ILISKILER_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 31, hedef: 1 },
  { yas: 46, hedef: 2 },
  { yas: 61, hedef: 3 },
  { yas: 76, hedef: 4 },
];

const AILE_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 33, hedef: 1 },
  { yas: 48, hedef: 2 },
  { yas: 63, hedef: 3 },
  { yas: 78, hedef: 4 },
];

const EVLILIK_AILE_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 29, hedef: 1 },
  { yas: 44, hedef: 2 },
  { yas: 59, hedef: 3 },
  { yas: 74, hedef: 5 },
];

const KOMIK_GARIP_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 26, hedef: 1 },
  { yas: 41, hedef: 2 },
  { yas: 56, hedef: 3 },
  { yas: 71, hedef: 4 },
];

/** komikOlumler.ts (14 olay, risk-tercihli "aptalca olanı yap mı?" ekranları — seçim yine oyuncunun, garanti sadece EKRANI göstermeyi zorlar, ölümü değil) — düşük hedef, düşük öncelik. */
const KOMIK_OLUM_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 36, hedef: 1 },
  { yas: 64, hedef: 2 },
];

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
const BOLGESEL_HAVUZ_KONTROL_NOKTALARI: { yas: number; hedef: number }[] = [
  { yas: 28, hedef: 1 },
  { yas: 47, hedef: 2 },
  { yas: 68, hedef: 3 },
];

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
  { havuz: OLAY_ILISKILER, kontrolNoktalari: ILISKILER_HAVUZ_KONTROL_NOKTALARI },
  { havuz: OLAY_AILE, kontrolNoktalari: AILE_HAVUZ_KONTROL_NOKTALARI },
  { havuz: OLAY_EVLILIK_AILE, kontrolNoktalari: EVLILIK_AILE_HAVUZ_KONTROL_NOKTALARI },
  { havuz: OLAY_KOMIK_GARIP, kontrolNoktalari: KOMIK_GARIP_HAVUZ_KONTROL_NOKTALARI },
  { havuz: OLAY_KOMIK_OLUM, kontrolNoktalari: KOMIK_OLUM_HAVUZ_KONTROL_NOKTALARI },
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
 * Evcil hayvan takip garantisinin kümülatif hedefleri (havuz: 6 genel +
 * türe özel ~2 = ~8 aday). 20-25 yaşında sahiplenildiği için ilk kontrol
 * noktası biraz sonraya bırakılır.
 */
const EVCIL_HAYVAN_TAKIP_KONTROL_NOKTALARI = [
  { yas: 30, hedef: 1 },
  { yas: 42, hedef: 2 },
  { yas: 55, hedef: 3 },
];

// Gizemli eşya takip garantisi: her eşyanın kendi havuzu sadece 2 olay.
// Havuz sadece 2 olay; ikisini de garanti etmek gizemi tamamen ortadan
// kaldırırdı (§26 "gizemli eşya" adını hak etsin diye) — hedef 1'de kalır,
// ikincisini görüp görmemek normal ağırlıklı seçime/şansa bırakılır.
const GIZEMLI_ESYA_TAKIP_KONTROL_NOKTALARI = [{ yas: 40, hedef: 1 }];

// Hizip takip garantisi: her hizbin kendi havuzu ~10 olay (9 hizbe özel + 1
// meslek-çatışma genel). 2026-09 (kullanıcı isteği): daha sık/ince kontrol
// noktaları + ilk yaş biraz düşürüldü + nihai hedef bir birim yükseltildi.
const HIZIP_TAKIP_KONTROL_NOKTALARI = [
  { yas: 26, hedef: 1 },
  { yas: 35, hedef: 2 },
  { yas: 44, hedef: 3 },
  { yas: 53, hedef: 4 },
  { yas: 62, hedef: 5 },
];

/** Saray takip garantisi: sabit 6 olaylık küçük havuz — hepsini tüketmeden çeşitlilik payı bırakılır. */
const SARAY_TAKIP_KONTROL_NOKTALARI = [
  { yas: 50, hedef: 1 },
  { yas: 58, hedef: 2 },
  { yas: 68, hedef: 3 },
];

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

/**
 * Mülk sahibi bir karaktere, her senaryoUret çağrısında mulkOlaylari.ts'ten zorlanan
 * bir olay gelme ihtimali — YALNIZ satın alma yılı bilinmeyen (eski kayıt) ya da
 * garanti penceresini (bkz. MULK_OLAYI_PENCERE_*) aşmış mülkler için fırsatçı yedek.
 */
const MULK_OLAYI_IHTIMALI = 0.12;
/** Mülk olayı garantisi (kullanıcı isteği, 2026-09): satın alımdan bu kadar yıl sonra pencere açılır. */
const MULK_OLAYI_PENCERE_BASLANGIC_YIL = 5;
/** ...ve bu kadar yıl içinde (satın alımdan itibaren) en az bir olay kesin tetiklenir. */
const MULK_OLAYI_PENCERE_BITIS_YIL = 15;

/**
 * "Gecikmiş takip" havuzu (gecikmisTakip.ts, 2026-09 sonu): bir seçimin geri
 * dönüşü, seçimden bu kadar yıl sonra (rastgele bu aralıkta) zorlanan olay
 * olarak sunulur — bkz. SonucEtkisi.gecikmis_takip + state.gecikmis_takipler.
 */
const GECIKMIS_TAKIP_YIL_MIN = 15;
const GECIKMIS_TAKIP_YIL_MAX = 20;

// Aranma yeniden dengeleme turu (4 bant: 0-25/25-50/50-75/75-100, bkz.
// aranmaSeviyesi.ts): hapse yeni girişte, tutuklama anındaki suc_seviyesi
// bandına göre ceza süresi doğrudan bir aralıktan rastgele seçilir — hangi
// olay/yol tutukladığından (aranmaSeviyesi.ts olayları ya da kotuIsler.ts
// karanlık iş yakalanması) bağımsız, tek bir fonksiyonda (hapisCezaSuresiHesapla).
const HAPIS_CEZA_TEMIZ_MIN_YIL = 2;
const HAPIS_CEZA_TEMIZ_MAX_YIL = 4;
const HAPIS_CEZA_YAKALANMA_MIN_YIL = 4;
const HAPIS_CEZA_YAKALANMA_MAX_YIL = 7;
const HAPIS_CEZA_BASKIN_MIN_YIL = 7;
const HAPIS_CEZA_BASKIN_MAX_YIL = 9;
const HAPIS_CEZA_AZILI_MIN_YIL = 9;
const HAPIS_CEZA_AZILI_MAX_YIL = 12;

/** Bir min-max aralığından (dahil) rastgele tam sayı yıl döndürür. */
function rastgeleYilAraligi(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Tutuklanma anındaki suc_seviyesi bandına göre hapis cezası süresini (yıl)
 * belirler — aranmaSeviyesi.ts'teki 4 bantla birebir hizalı:
 * 0-25 temiz/rutin (3-6y) · 25-50 yakalanma (5-8y) · 50-75 baskın (7-9y) ·
 * 75-100 azılı suçlu (9-12y).
 */
export function hapisCezaSuresiHesapla(sucSeviyesi: number): number {
  if (sucSeviyesi >= 75) return rastgeleYilAraligi(HAPIS_CEZA_AZILI_MIN_YIL, HAPIS_CEZA_AZILI_MAX_YIL);
  if (sucSeviyesi >= 50) return rastgeleYilAraligi(HAPIS_CEZA_BASKIN_MIN_YIL, HAPIS_CEZA_BASKIN_MAX_YIL);
  if (sucSeviyesi >= 25) return rastgeleYilAraligi(HAPIS_CEZA_YAKALANMA_MIN_YIL, HAPIS_CEZA_YAKALANMA_MAX_YIL);
  return rastgeleYilAraligi(HAPIS_CEZA_TEMIZ_MIN_YIL, HAPIS_CEZA_TEMIZ_MAX_YIL);
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
      sakliOlay: null,
    });
  }
  return stateler.length;
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
    sakliOlay: null,
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
  dil?: string,
  istemciId?: string
): Promise<CharacterState> {
  // Bu cihazın önceki hayatlarında görülen olayları çek — yeni hayatın olay
  // seçimindeki tekrar-önleme penceresini (§12, olaySecici.ts) genişletmek için
  // (aynı cihazdan art arda oynanan hayatlarda hep aynı olayların çıkmasını azaltır).
  const caprazGecmis = istemciId ? await istemciGecmisiOku(istemciId) : [];
  const state = createCharacter(cag, bolge, yerlesimId, oyuncuIsmi, dil, istemciId, caprazGecmis);
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
  if (oturum.state.meslek) throw new Error("Meslek zaten seçildi.");
  mesleğiSec(oturum.state, meslek);
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

  // Zaten cevaplanmamış bir olay varsa (sayfa yenilendi, sekme yeniden açıldı,
  // istemci /scenario'yu tekrar çağırdı) YENİDEN ZAR ATILMAZ — aynı olay aynen
  // döndürülür. Bunun garantisi olmadan her çağrı olaySec'i tekrar çalıştırıp
  // oyuncunun az önce gördüğü olayı sessizce başka bir rastgele olayla
  // değiştiriyordu ("ekran yenilenince olay değişiyor" hatası).
  if (oturum.mevcutOlay && oturum.mevcutSenaryo) {
    oturum.bekleyenTepki = null;
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
  if (!zorlananId && !milestoneKilitli && !oturum.state.ulke.savasta && oturum.state.yas <= 55) {
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
  // hizip seçmemiş bir karakter, mesleğine uygun eşiğe (yaş ya da rütbe
  // seviyesi) ulaşınca giriş olayını garanti görür.
  if (!zorlananId && !milestoneKilitli && !oturum.state.etiketler.includes("hizip_secildi")) {
    const hizipGirisId = HIZIP_GIRIS_OLAYLARI[oturum.state.meslek];
    if (hizipGirisId && !oturum.state.gecmis_olaylar.includes(hizipGirisId)) {
      const esikTutuyor =
        oturum.state.meslek === "Zanaatkâr" ? oturum.state.rutbe_seviye >= 2 : oturum.state.yas >= 18;
      if (esikTutuyor) zorlananId = hizipGirisId;
    }
  }
  // 29 yaşına kadar hiç evlenmemiş ve evlilik teklifiyle hiç karşılaşmamışsa
  // (ne ilk teklif ne de ikinci teklif zinciri), garanti bir kez zorla tetiklenir.
  if (
    !zorlananId &&
    !milestoneKilitli &&
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
  // 20-25 yaş arası, henüz evcil hayvanı olmayan bir karaktere hayatında bir kez
  // (rastgele bir olayı beklemeden) doğrudan sahiplenme teklifi sunulur.
  if (
    !zorlananId &&
    !milestoneKilitli &&
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
  // Evcil hayvan / gizemli eşya / hizip / saray takip garantileri (kümülatif,
  // 2026-09'da genişletildi) — büyük yolculuk garantisinin (yukarıdaki kural)
  // HEMEN ardına taşındı: dördü de artık geniş, ömür-boyu yaş pencereleri
  // kullandığı için yolculuktan ÖNCE durmaları, yol:<dal> takip garantisinde
  // olduğu gibi yolculuk teklifinin hiç sıraya girememesine yol açabilirdi
  // (bkz. yolculuk.test.ts). "Saray daveti" (un/ahlak eşiği, tek seferlik
  // narrow koşul) buna dahil değil — yolculuktan önceki yerinde kaldı.
  //
  // Evcil hayvan takip garantisi (kümülatif): havuz 6 genel + türe özel ~2
  // olaydan oluşur (~8 aday); yalnız genel havuzdan seçilir (türe özel
  // olaylar normal ağırlıklı seçimle çıkar), ama sayım her ikisini kapsar.
  if (!zorlananId && !milestoneKilitli && oturum.state.evcil_hayvan) {
    const secilen = kumulatifTakipSec(
      EVCIL_HAYVAN_TAKIP_KONTROL_NOKTALARI,
      oturum.state.yas,
      EVCIL_HAYVAN_TAKIP_OLAY_IDLERI,
      EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI,
      oturum.state.gecmis_olaylar
    );
    if (secilen) zorlananId = secilen;
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
  if (!zorlananId && !milestoneKilitli && oturum.state.yas >= 25 && oturum.state.yas < 45) {
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
  // 2026-09 (kullanıcı isteği "mülk olayını tetikli hale getir, satın aldıktan
  // 5 yıl sonra 15 yıl içinde gibi"): artık fırsatçı %12 şans DEĞİL, satın alma
  // yılına göre deterministik bir garanti penceresi öncelikli — mülk sahibi
  // olunduktan 5-15 yıl arasında (mulk_alis_yili), o türe ait hiç görülmemiş bir
  // olay varsa kesin tetiklenir (pencere açıldığı ilk çağrıda). Satın alma yılı
  // bilinmeyen (eski kayıt) ya da 15 yıllık pencereyi geçmiş mülkler için eski
  // fırsatçı %12 şans mekaniği yedek olarak sürüyor.
  if (!zorlananId && !milestoneKilitli && oturum.state.mulkler.length > 0) {
    const pencereDisiTurler: MulkTuru[] = [];
    let pencereIciId: string | null = null;
    for (const tur of oturum.state.mulkler) {
      const alisYili = oturum.state.mulk_alis_yili?.[tur];
      if (typeof alisYili !== "number") {
        pencereDisiTurler.push(tur);
        continue;
      }
      const gecenYil = oturum.state.yil - alisYili;
      if (gecenYil < MULK_OLAYI_PENCERE_BASLANGIC_YIL) continue; // pencere henüz açılmadı
      if (gecenYil > MULK_OLAYI_PENCERE_BITIS_YIL) {
        pencereDisiTurler.push(tur);
        continue;
      }
      if (!pencereIciId) {
        const gorulmemisPencereOlaylari = OLAY_BANKASI.filter(
          (o) => o.mulkOlayi === tur && !oturum.state.gecmis_olaylar.includes(o.id)
        );
        if (gorulmemisPencereOlaylari.length > 0) {
          pencereIciId = gorulmemisPencereOlaylari[Math.floor(Math.random() * gorulmemisPencereOlaylari.length)].id;
        }
      }
    }
    if (pencereIciId) {
      zorlananId = pencereIciId;
    } else if (pencereDisiTurler.length > 0 && Math.random() < MULK_OLAYI_IHTIMALI) {
      const sahipTurSet = new Set(pencereDisiTurler);
      const uygunMulkOlaylari = OLAY_BANKASI.filter((o) => o.mulkOlayi && sahipTurSet.has(o.mulkOlayi));
      if (uygunMulkOlaylari.length > 0) {
        const gorulmemis = uygunMulkOlaylari.filter((o) => !oturum.state.gecmis_olaylar.includes(o.id));
        const havuz = gorulmemis.length > 0 ? gorulmemis : uygunMulkOlaylari;
        zorlananId = havuz[Math.floor(Math.random() * havuz.length)].id;
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
  etki.mesaj = doldur(etki.mesaj, state);
  if (etki.detay) etki.detay = doldur(etki.detay, state);
  return sonucuUygulaVeIlerlet(oturum, mevcutOlay, etki, basarili, eskiRutbeSeviye);
}

/** Doğum denemesi cooldown'u (yıl) — bu kadar yıl geçmeden yeni çocuk olmaz
 * (çocuklar arası asgari düzenli aralık). */
const DOGUM_COOLDOWN_YIL = 4;
/** Yaşayan+ölü toplam çocuk tavanı — bunun üstünde doğum denenmez. */
const DOGUM_COCUK_TAVANI = 8;
/** Cooldown eşiğini aştıktan sonra her ek bekleme yılı şansa eklenen "sabır" payı —
 * evlilik makul durumdaysa (es_puani ≥ 30) doğumun rastgele değil DÜZENLİ/öngörülebilir
 * bir aralıkta gerçekleşmesini sağlar: kötü bir zar birkaç yıl doğumu geciktirebilir ama
 * ilişki iyiyse birikerek neredeyse kesin hale gelir. */
const DOGUM_SABIR_PAYI_YILLIK = 0.14;
const DOGUM_YILLIK_SANS_TAVANI = 0.92;

/**
 * Evli bir karakterde, eşle ilişkiye (es_puani) bağlı, cooldown'lu bir yıllık doğum
 * zarı atar. es_puani ≤ 30 iken hiç doğum olmaz; üstündeyse taban şans es_puani'yle
 * büyür VE cooldown sonrası her geçen yıl "sabır payı" ekleyerek şansı yükseltir —
 * böylece çocuklar tamamen şansa bağlı, seyrek/düzensiz bir olay olmak yerine, iyi
 * giden bir evlilikte birkaç yıl içinde güvenilir biçimde gerçekleşir.
 * Başarılıysa bir çocuk ekler ve `hayat_hikayesi`'ne yazar; anlatı cümlesi döner.
 */
function dogumDenemesiUygula(state: CharacterState, yasArtisi: number): string | null {
  if (!state.es_adi) return null;
  if (state.yas >= 55) return null;
  if (
    state.etiketler.includes("hapiste") ||
    state.etiketler.includes("yolculukta") ||
    state.etiketler.includes("veba_hastasi")
  ) {
    return null;
  }
  if (state.cocuklar.length >= DOGUM_COCUK_TAVANI) return null;
  const sonDogum = typeof state.son_dogum_yili === "number" ? state.son_dogum_yili : -9999;
  const gecenYil = state.yil - sonDogum;
  if (gecenYil < DOGUM_COOLDOWN_YIL) return null;

  // es_puani 30 → 0, 100 → 1 arası lineer taban çarpanı.
  const iliskiCarpani = Math.max(0, Math.min(1, (state.es_puani - 30) / 70));
  if (iliskiCarpani <= 0) return null;
  const bekleyisYil = gecenYil - DOGUM_COOLDOWN_YIL;
  const yillikSans = Math.min(
    DOGUM_YILLIK_SANS_TAVANI,
    iliskiCarpani * 0.16 + bekleyisYil * DOGUM_SABIR_PAYI_YILLIK
  );
  let oldu = false;
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() < yillikSans) {
      oldu = true;
      break;
    }
  }
  if (!oldu) return null;

  const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
    state.dost_adi,
    state.rakip_adi,
    state.es_adi ?? "",
    ...state.cocuklar.map((c) => c.isim),
  ]);
  state.cocuklar.push({ isim, dogum_yili: state.yil, yasiyor: true, iliski: 65 });
  state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
  state.son_dogum_yili = state.yil;
  etiketEkle(state, ["cocuk_var"]);
  hayatOlayiEkle(state, "👶", T(state.dil, "{0} doğdu", [isim]));
  return T(state.dil, "👶 Eşin {0} ile aranız iyiydi; bir bebeğiniz oldu: {1}.", [state.es_adi, isim]);
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
    envanterBakim: 0, zorunluBagis: 0, zenginlikSizinti: 0, rakipSoygun: 0, digerNet: 0, bilgiMulkBakim: 0,
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
  if (etki.ticaret_sermaye_artis) state.ticaret_sermaye += etki.ticaret_sermaye_artis;
  if (etki.nufuz_artis) state.nufuz += etki.nufuz_artis;
  if (etki.uretim_kapasitesi_artis) {
    state.uretim_kapasitesi = Math.min(100, Math.max(0, state.uretim_kapasitesi + etki.uretim_kapasitesi_artis));
  }
  // Kariyer puanı: mesleğine uygun kategoride (savas/ticaret/din) başarılı olmak
  // seni rütbede ilerletir; kilit taşı olaylar ayrıca doğrudan puan verebilir.
  if (basarili && MESLEK_KATEGORI[state.meslek] === mevcutOlay.kategori) {
    state.kariyer_puani += KARIYER_PUANI_KATEGORI_BASARI;
    // Din Adamı, din kategorisinde başarılı olduğu her olayda biraz nüfuz kazanır
    // (pasif un +0.4/yıl sürüklenmesinin eşi) — nüfuz → maaş metrik çarpanı.
    if (state.meslek === "Din Adamı") state.nufuz += 1.5;
  }
  if (etki.kariyer_puani_artis) state.kariyer_puani += etki.kariyer_puani_artis;
  if (etki.suc_artis) state.suc_seviyesi += etki.suc_artis;
  // Tutuklanma anındaki GERÇEK suç seviyesi — hapis cezası bandı bundan hesaplanır
  // (aşağıda). `suc_seviyesi_ayarla` (ör. büyük baskının "teslim ol" dalının suçu
  // temize çekmesi) bu değeri EZMEDEN önce yakalanıyor; aksi halde aynı SonucEtkisi
  // içinde hem "hapiste" etiketi hem suc_seviyesi_ayarla:10 varsa (aranma_baskin_*
  // olaylarındaki gibi) ceza yanlışlıkla temiz banttan (2-4y) hesaplanıp azılı-suçlu
  // bir tutuklamayı bile kısa cezaya indirirdi.
  const sucSeviyesiTutuklanmaAni = state.suc_seviyesi;
  if (etki.suc_seviyesi_ayarla !== undefined) state.suc_seviyesi = etki.suc_seviyesi_ayarla;
  // Veba hastalığı ölüm riski: yalnız hastayken (veba_hastasi) anlamlı; olay
  // seçimi bu turdaki ölüm zarından ÖNCE uygulanır (vebaHastaligiKontrol).
  if (etki.veba_olum_riski_artis && state.etiketler.includes("veba_hastasi")) {
    state.veba_olum_riski = Math.max(0, Math.min(100, state.veba_olum_riski + etki.veba_olum_riski_artis));
  }
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
    // Oyuncu karakteri erkek — eş her zaman kadın isim havuzundan seçilir.
    state.es_adi = rastgeleCinsiyetliIsimSec(state.cag, state.bolge, "kadin", [state.dost_adi, state.rakip_adi]);
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
      state.cocuklar.push({ isim, dogum_yili: state.yil, yasiyor: true, iliski: 65 });
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
  if (typeof etki.cocuk_iliski === "number" && etki.cocuk_iliski !== 0) {
    for (const c of state.cocuklar) {
      if (c.yasiyor && typeof c.iliski === "number") {
        c.iliski = Math.max(0, Math.min(100, c.iliski + etki.cocuk_iliski));
      }
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
  }
  const hapistenCiktiBuEtki =
    !!etki.etiket_sil?.includes("hapiste") && state.etiketler.includes("hapiste");
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
          zamanAnlatimi = zamanAnlatimiUret(state, yasArtisi, ekonomi);
          // Hapis cezası: her turda geçen yıl kadar erir; dolduğunda karakter
          // kendiliğinden serbest kalır (bir kaçış/af olayı beklemek zorunda değil).
          // Tutuklanmanın olduğu turda erimeyi atla (hapisteYeniGirildiBuTur) —
          // aksi halde kısa bir ceza, tutuklandığı turun yasArtisi'yle aynı anda
          // sıfırlanıp hiç hissedilmeden bitebilir.
          if (state.etiketler.includes("hapiste") && !hapisteYeniGirildiBuTur) {
            // "Az olay var" turu Faz 8: yalnız gerçek bir hapisOlayi:true olayı
            // çözüldüğünde sayaç artar — tutuklanma anının kendisi (hapisOlayi
            // değil, normal havuzdan gelir) bunu tüketmez.
            if (mevcutOlay.hapisOlayi) state.hapis_tur_sayaci += 1;
            state.hapis_ceza_kalan -= yasArtisi;
            if (state.hapis_ceza_kalan <= 0) {
              state.hapis_ceza_kalan = 0;
              state.hapis_ceza_toplam = 0;
              etiketSil(state, ["hapiste"]);
              hayatOlayiEkle(state, "⛓️", T(state.dil, "Cezasını tamamlayıp serbest kaldı"));
              const cikisMesaji = T(state.dil, "⛓️ Cezan doldu; kapılar açıldı ve özgür bir insan olarak dışarı çıktın.");
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${cikisMesaji}` : cikisMesaji;
            } else {
              const kalanMesaji = T(state.dil, "⛓️ Hücrede bir yıl daha geçti; tahliyene yaklaşık {0} yıl kaldı.", [
                state.hapis_ceza_kalan,
              ]);
              zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${kalanMesaji}` : kalanMesaji;
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
          // Aile ekranı: eş/çocuk ilişkisi soğuması + düşük ilişki moral cezası +
          // bekleyen para talebinin süresi dolması / yeni talep üretimi (§33).
          const aileMesaji = aileYillikUygula(state, yasArtisi);
          if (aileMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${aileMesaji}` : aileMesaji;
          }
          // Eşle ilişkiye bağlı doğum denemesi (§33) — es_puani çok belirleyici,
          // cooldown sonsuz çocuğu engeller. İçerik gameEngine'de çünkü çocuk
          // ismi üretimi burada.
          const dogumMesaji = dogumDenemesiUygula(state, yasArtisi);
          if (dogumMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${dogumMesaji}` : dogumMesaji;
          }
          // Kariyer sayfası: yönetimle bağların soğuması + dayatılan talep (§35).
          const yonetimMesaji = yonetimYillikUygula(state, yasArtisi);
          if (yonetimMesaji) {
            zamanAnlatimi = zamanAnlatimi ? `${zamanAnlatimi} ${yonetimMesaji}` : yonetimMesaji;
          }
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
              checkDeath(state, true, "Veba direncini kırdı; hastalıktan kurtulamadın.");
            }
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
    hayatAmaciKontrolEt(state); // eski tekil amaç (yalnız test/eski kayıt)
    for (const a of amaclariHerhangiKontrol(state, state.para + gayrimenkulDegeriHesapla(state))) {
      const tanim = amacTanimiGetir(a.id);
      const ad = tanim ? tanim.baslik[state.dil === "en" ? "en" : "tr"] : a.id;
      hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını tamamladı: {0}", [ad]));
    }
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
    nakitAkisi.zenginlikSizinti -
    nakitAkisi.rakipSoygun;
  nakitAkisi.digerNet = paraYuvarla(state.para - paraGiris - mutabakatliToplam);

  await oturumKaydet(state);

  // Bu turda öldüyse (fonksiyona hep aktif oyunla girilir) bir "olum" metriği yaz
  // — oynanan süre / servet / skor / ölüm nedeni dağılımları için (§32). Ateşle-unut.
  if (!state.aktif) {
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
      servet: paraYuvarla(state.para + gayrimenkulDegeriHesapla(state)),
      skor: hesaplaSkor(state),
      olum_nedeni: state.olum_nedeni ?? "",
      oturum_sn: oturumSn,
    });
    // Bu hayatta görülen olayları istemcinin çapraz-hayat geçmişine yaz — bir
    // sonraki hayat aynı cihazdan başlatılınca bu olayları bir süre daha az
    // görsün (§12'deki tekrar-önleme penceresinin hayatlar arası uzantısı).
    void istemciGecmisiGuncelle(state.istemci_id, state.gecmis_olaylar);
  }

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
  // Oyuncu karakteri erkek — evlilik adayları her zaman kadın isim havuzundan.
  const isim = rastgeleCinsiyetliIsimSec(state.cag, state.bolge, "kadin", disariBirak);
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
  { id: "es_hediye", ikon: "🎁", hedef: "es", tabanMaliyet: 10, cooldownYil: 3, esPuani: 12, mutluluk: 3 },
  { id: "es_zaman", ikon: "⏳", hedef: "es", tabanMaliyet: 0, cooldownYil: 3, esPuani: 7, mutluluk: 4, saglik: 2 },
  { id: "es_sevgi", ikon: "💋", hedef: "es", tabanMaliyet: 0, cooldownYil: 2, esPuani: 5, mutluluk: 3 },
  { id: "es_gezi", ikon: "🌇", hedef: "es", tabanMaliyet: 14, cooldownYil: 4, esPuani: 9, mutluluk: 6 },
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

export interface AileDurumu {
  es: { adi: string; meslek: string | null; rutbe: string | null; puan: number } | null;
  cocuklar: { isim: string; dogumYili: number; yas: number; yasiyor: boolean; iliski: number }[];
  etkilesimler: { id: string; ikon: string; hedef: AileEtkilesimHedef; maliyet: number }[];
  /** Etkileşim kilit anahtarı → tekrar açılacağı oyun yılı (istemci kalanYil'i guncelYil ile hesaplar). */
  kilitler: Record<string, number>;
  talep: CharacterState["aile_talep"];
  guncelYil: number;
  para: number;
  paraBirimi: string;
}

/** Aile ekranının ihtiyaç duyduğu her şey: eş/çocuk özeti, etkileşim kataloğu + kilitler, bekleyen talep. Turu tüketmez. */
export async function aileDurumGetir(id: string): Promise<AileDurumu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  return {
    es: state.es_adi
      ? { adi: state.es_adi, meslek: state.es_meslek, rutbe: state.es_rutbe, puan: Math.round(state.es_puani) }
      : null,
    cocuklar: state.cocuklar.map((c) => ({
      isim: c.isim,
      dogumYili: c.dogum_yili,
      yas: Math.max(0, state.yil - c.dogum_yili),
      yasiyor: c.yasiyor,
      iliski: Math.round(typeof c.iliski === "number" ? c.iliski : 60),
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
  };
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

  state.aile_etkilesim_kilit[anahtar] = state.yil + tanim.cooldownYil;
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

const YONETIM_ISIM_HAVUZU = [
  "Cezmi",
  "Bertrand",
  "Konrad",
  "Halil",
  "Théodore",
  "Marcus",
  "Yakup",
  "Anselm",
  "Rüstem",
  "Gregor",
];
function yonetimDeterministikIsim(seed: string, tuz: number): string {
  let h = tuz >>> 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return YONETIM_ISIM_HAVUZU[h % YONETIM_ISIM_HAVUZU.length];
}

function yoneticiBilgisi(state: CharacterState): { unvan: string; ad: string } {
  if (state.hukumdar) return { unvan: K(state.dil, "Hükümdar"), ad: state.hukumdar };
  const unvan = state.cag === "Sanayi Devrimi" ? "Vali" : "Bölge Beyi";
  return { unvan: K(state.dil, unvan), ad: yonetimDeterministikIsim(state.id, 7) };
}

function patronBilgisi(state: CharacterState): { unvan: string; ad: string } {
  const sanayi = state.cag === "Sanayi Devrimi";
  let unvan: string;
  if (state.meslek === "Asker") unvan = sanayi ? "Karargâh Komutanı" : "Ordu Kumandanı";
  else if (state.meslek === "Tüccar") unvan = sanayi ? "Fabrika Patronu" : "Lonca Reisi";
  else if (state.meslek === "Din Adamı") {
    unvan = state.din_kultur === "Sünni İslam" ? "Kadı" : sanayi ? "Başpiskopos" : "Başrahip";
  } else if (state.meslek === "Zanaatkâr") unvan = sanayi ? "Atölye Sahibi" : "Loncabaşı";
  else unvan = sanayi ? "Patron" : "Usta";
  return { unvan: K(state.dil, unvan), ad: yonetimDeterministikIsim(state.id, 19) };
}

interface YonetimEtkilesimTabani {
  id: "bagis" | "yalan" | "hizmet";
  ikon: string;
  cooldownYil: number;
  /** Yalnız "bagis": oyuncunun seçtiği para tutarları (enflasyonsuz taban) + para→ilişki böleni (tutar/bolen = ilişki kazancı). */
  bagisKademeleri?: number[];
  bagisBolen?: number;
  /** yalan/hizmet: sabit ilişki kazancı. */
  iliski?: number;
  ahlak?: number;
  mutluluk?: number;
  kariyerPuani?: number;
  /** "Yalan söyle" dalı: yakalanma ihtimali (0-1). */
  ifsaSansi?: number;
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

function yonetimEtkilesimBul(hat: YonetimHat, id: string): YonetimEtkilesimTabani | undefined {
  return YONETIM_ETKILESIMLERI[hat].find((t) => t.id === id);
}

interface YonetimIstekTanimi {
  id: string;
  hat: YonetimHat;
  minIliski: number;
  iliskiBedeli: number;
  cooldownYil: number;
  tabanSans: number;
  kullanilabilir?: (state: CharacterState) => boolean;
  uygula: (state: CharacterState, enflasyon: number) => void;
}

const YONETIM_ISTEKLERI: YonetimIstekTanimi[] = [
  // Yönetici (kral) istekleri: yüksek eşik + ağır ilişki bedeli + düşük şans +
  // uzun cooldown. "Kralı ikna etmek zordur."
  {
    id: "vergi_kayirma",
    hat: "yonetici",
    minIliski: 75,
    iliskiBedeli: 26,
    cooldownYil: 14,
    tabanSans: 40,
    uygula: (state) => maasCarpaniUygula(state, 1.07),
  },
  {
    id: "sicil_temizligi",
    hat: "yonetici",
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
    minIliski: 82,
    iliskiBedeli: 30,
    cooldownYil: 12,
    tabanSans: 38,
    kullanilabilir: (state) => state.rakipler.some((r) => !r.yenildi),
    uygula: (state, enflasyon) => {
      const hedef = [...state.rakipler]
        .filter((r) => !r.yenildi)
        .sort((a, b) => b.guc - a.guc)[0];
      if (hedef) rakipGucKir(state, hedef.ad, 12, enflasyon);
    },
  },
  {
    id: "sermaye_destegi",
    hat: "patron",
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
      }
    },
  },
  {
    id: "zam",
    hat: "patron",
    minIliski: 55,
    iliskiBedeli: 15,
    cooldownYil: 10,
    tabanSans: 70,
    uygula: (state) => maasCarpaniUygula(state, 1.06),
  },
  {
    id: "kredi_kefaleti",
    hat: "patron",
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

/** "bagis" kademelerini enflasyonla ölçekleyip oyuncuya gösterilecek tutarlara çevirir. */
function yonetimBagisKademeleri(state: CharacterState, hat: YonetimHat): number[] {
  const taban = yonetimEtkilesimBul(hat, "bagis");
  const enf = enflasyonCarpani(state);
  return (taban?.bagisKademeleri ?? []).map((k) => Math.max(1, paraYuvarla(k * enf)));
}

function yonetimIstekSansi(tanim: YonetimIstekTanimi, iliski: number, yalan: boolean): number {
  // Yönetici (kral) hattında ilişki avantajı çok daha yavaş şansa dönüşür ve tavan düşük.
  const egim = tanim.hat === "yonetici" ? 0.4 : 1;
  const tavan = tanim.hat === "yonetici" ? 72 : 90;
  const bonus = (iliski - tanim.minIliski) * egim + (yalan ? 18 : 0);
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
  etkilesimler: { id: string; hat: YonetimHat; ikon: string }[];
  istekler: {
    id: string;
    hat: YonetimHat;
    minIliski: number;
    acik: boolean;
    iliskiBedeli: number;
    tahminiSans: number;
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
    etkilesimler: (["yonetici", "patron"] as YonetimHat[]).flatMap((hat) =>
      YONETIM_ETKILESIMLERI[hat].map((t) => ({ id: `${hat}:${t.id}`, hat, ikon: t.ikon }))
    ),
    istekler: YONETIM_ISTEKLERI.map((tanim) => ({
      id: tanim.id,
      hat: tanim.hat,
      minIliski: tanim.minIliski,
      acik: yonetimIstekAcikMi(state, tanim),
      iliskiBedeli: tanim.iliskiBedeli,
      tahminiSans: yonetimIstekSansi(tanim, yonetimIliskiOku(state, tanim.hat), false),
    })),
    kilitler: { ...state.yonetim_etkilesim_kilit },
    bikkinlik: state.yonetim_yakin_etkilesim ?? 0,
    talep: state.yonetim_talep
      ? { ...state.yonetim_talep, kimAdi: state.yonetim_talep.kimden === "yonetici" ? yon.ad : pat.ad }
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
  kademe?: number
): Promise<YonetimEtkilesimSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken bununla ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bununla ilgilenemezsin.");

  const [hatRaw, tabanId] = etkilesimId.split(":");
  const hat = hatRaw as YonetimHat;
  if (hat !== "yonetici" && hat !== "patron") throw new Error("Geçersiz hat.");
  const taban = yonetimEtkilesimBul(hat, tabanId);
  if (!taban) throw new Error("Böyle bir etkileşim yok.");

  const kilitYili = state.yonetim_etkilesim_kilit[etkilesimId];
  if (typeof kilitYili === "number" && state.yil < kilitYili) {
    throw new Error("Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.");
  }

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
  if (taban.ahlak) state.ahlak += taban.ahlak;
  if (taban.mutluluk) state.mutluluk += taban.mutluluk;

  let ifsaOldu = false;
  if (taban.ifsaSansi && Math.random() < taban.ifsaSansi) {
    ifsaOldu = true;
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 16);
    state.un -= 4;
  } else if (tabanId === "bagis") {
    const kazanc = Math.max(1, Math.round((bagisTutar / (taban.bagisBolen ?? 3)) * carpan));
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + kazanc);
  } else {
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + Math.max(1, Math.round((taban.iliski ?? 0) * carpan)));
    if (taban.kariyerPuani) state.kariyer_puani += Math.max(1, Math.round(taban.kariyerPuani * carpan));
  }
  clampStats(state);

  let mesaj: string;
  if (ifsaOldu) {
    mesaj = T(state.dil, "{0} yağcılığını fark etti; güveni sarsıldı.", [kimAdi]);
  } else if (tabanId === "bagis") {
    mesaj = T(state.dil, "{0} bağışını memnuniyetle aldı.", [kimAdi]);
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

/** İlişki yüksekken açılan bir "istek" (iyilik) — ilişki harcar, zarlıdır. Turu TÜKETMEZ. */
export async function yonetimIstekYap(
  id: string,
  istekId: string,
  opts: { yalan?: boolean } = {}
): Promise<YonetimIstekSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken istekte bulunamazsın.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken istekte bulunamazsın.");

  const tanim = YONETIM_ISTEKLERI.find((t) => t.id === istekId);
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
  const yalan = opts.yalan === true;
  const iliskiOncesi = yonetimIliskiOku(state, tanim.hat);
  const sans = yonetimIstekSansi(tanim, iliskiOncesi, yalan);

  if (yalan) {
    state.ahlak -= 5;
    state.mutluluk -= 3;
  }

  let basarili = rollSuccess(sans);
  let ifsaOldu = false;
  if (yalan && Math.random() < 0.22) {
    ifsaOldu = true;
    basarili = false;
    yonetimIliskiYaz(state, tanim.hat, yonetimIliskiOku(state, tanim.hat) - 20);
    state.un -= 5;
  }

  // İlişki bedeli: başarıda tam, başarısızda yarım.
  const bedel = basarili ? tanim.iliskiBedeli : Math.round(tanim.iliskiBedeli / 2);
  yonetimIliskiYaz(state, tanim.hat, yonetimIliskiOku(state, tanim.hat) - bedel);

  if (basarili) tanim.uygula(state, enflasyon);
  clampStats(state);

  state.yonetim_etkilesim_kilit[kilitAnahtari] = state.yil + tanim.cooldownYil;
  state.yonetim_yakin_etkilesim = (state.yonetim_yakin_etkilesim ?? 0) + 1;

  const kimAdi = tanim.hat === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad;
  let mesaj: string;
  if (ifsaOldu) {
    mesaj = T(state.dil, "Yalanın ortaya çıktı; {0} sana sırtını döndü ve isteğin geri çevrildi.", [
      kimAdi,
    ]);
  } else if (basarili) {
    mesaj = T(state.dil, "{0} isteğini yerine getirdi.", [kimAdi]);
  } else {
    mesaj = T(state.dil, "{0} bu sefer isteğini geri çevirdi.", [kimAdi]);
  }

  await oturumKaydet(state);
  return { state, basarili, mesaj };
}

interface YonetimTalepSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** Bekleyen dayatılan bağış / sadakat talebini yanıtlar: kabul / ret / yalan. Turu TÜKETMEZ. */
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

  const hat = talep.kimden;
  let mesaj: string;

  if (karar === "kabul") {
    if (talep.tur === "bagis") {
      if (state.para < talep.tutar) throw new Error("Bu bağışı karşılayacak paran yok.");
      state.para = paraYuvarla(state.para - talep.tutar);
    }
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) + 12);
    state.mutluluk -= 2;
    mesaj = T(state.dil, "{0} talebini yerine getirdin; aranız pekişti.", [talep.kimAdi]);
  } else if (karar === "ret") {
    yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 16);
    state.mutluluk -= 4;
    state.un -= 3;
    mesaj = T(state.dil, "{0} talebini geri çevirdin; arası soğudu.", [talep.kimAdi]);
  } else {
    state.ahlak -= 5;
    state.mutluluk -= 4;
    if (Math.random() < 0.3) {
      yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 22);
      state.un -= 6;
      if (talep.tur === "bagis") state.para = paraYuvarla(state.para - talep.tutar);
      mesaj = T(state.dil, "{0} yalanını yakaladı; hem parayı verdin hem itibarını.", [talep.kimAdi]);
    } else {
      yonetimIliskiYaz(state, hat, yonetimIliskiOku(state, hat) - 4);
      mesaj = T(state.dil, "\"Elim darda\" dedin; {0} homurdanarak kabul etti.", [talep.kimAdi]);
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
  /** Yatkınlık eklendikten sonra oyuncuya gösterilen başarı şansı (5-95). */
  basariSansi: number;
  /** Bu aksiyonun başarılı dalının verebileceği yaklaşık para (enflasyonlu, taban); 0 ise para getirisi yok. */
  tahminiKazanc: number;
  /** Rakip hedefliyor mu (etiket/anlatı için). */
  rakibeYonelik: boolean;
  /** İsimli bir rakibin gücünü kırabilir mi (RAKIP_KOTU_IS_HEDEFLERI). 0 ise kıramaz. */
  rakipKirmaGucu: number;
}

function kotuIsBasariSansi(state: CharacterState, tanim: (typeof KOTU_ISLER)[number]): number {
  const yatkinlik = state.yatkinliklar[tanim.yatkinlik] ?? 0;
  return Math.round(Math.min(95, Math.max(5, tanim.basariSansi + yatkinlik)));
}

/** İşin & Yatırımların ekranındaki "Karanlık İşler" listesi için canlı şans/kazanç önizlemesi. */
export async function kotuIsConfigGetir(id: string): Promise<KotuIsKarti[]> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  return KOTU_ISLER.map((tanim) => ({
    id: tanim.id,
    simge: tanim.simge,
    basariSansi: kotuIsBasariSansi(state, tanim),
    tahminiKazanc: tanim.basarili.para ? Math.max(1, paraYuvarla(tanim.basarili.para * enflasyon)) : 0,
    rakibeYonelik: (tanim.basarili.rakip_puani ?? 0) < 0,
    rakipKirmaGucu: RAKIP_KOTU_IS_HEDEFLERI[tanim.id] ?? 0,
  }));
}

export interface RakipKarti {
  ad: string;
  meslek: string;
  guc: number;
  husumet: number;
  yenildi: boolean;
}

/** GorevEkrani "Rakiplerin" paneli + karanlık iş hedef seçimi için. */
export async function rakiplerGetir(id: string): Promise<RakipKarti[]> {
  const oturum = await oturumGetir(id);
  return oturum.state.rakipler.map((r) => ({
    ad: r.ad,
    meslek: r.meslek,
    guc: Math.round(r.guc),
    husumet: Math.round(r.husumet),
    yenildi: r.yenildi,
  }));
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
  const servet = state.para + gayrimenkulDegeriHesapla(state);
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
}

/** Bir KotuIsEtki dalını doğrudan state'e uygular (jitter yok, olay hattından geçmez). */
function kotuIsEtkiUygula(state: CharacterState, etki: KotuIsEtki, enflasyon: number): void {
  if (etki.para) state.para = paraYuvarla(state.para + etki.para * enflasyon);
  if (etki.un) state.un += etki.un;
  if (etki.ahlak) state.ahlak += etki.ahlak;
  if (etki.saglik) state.saglik += etki.saglik;
  if (etki.mutluluk) state.mutluluk += etki.mutluluk;
  if (etki.rakip_puani) state.rakip_puani += etki.rakip_puani;
  if (etki.suc_artis) state.suc_seviyesi = Math.min(100, Math.max(0, state.suc_seviyesi + etki.suc_artis));
  if (etki.kariyer_puani) state.kariyer_puani += etki.kariyer_puani;
}

/**
 * Olay beklemeden tetiklenen karanlık iş aksiyonu (turu TÜKETMEZ). Zar atılır,
 * başarı/başarısız dalın etkileri doğrudan uygulanır. Başarısız dalda hapis
 * ("ortaya çıktın") ve nadiren ölüm riski vardır.
 */
interface KotuIsSecenek {
  /** Rakip hedefleyen işlerde (rakibi_korkut/rakibi_dov/isyeri_yak) hedef rakibin adı. */
  hedefRakipAd?: string;
  /** "Adamına yaptır": ücret öde, kişisel ahlak/hapis riskini azalt — ama "ortaya çıkma" riski. */
  vekil?: boolean;
}

export async function kotuIsYap(id: string, tur: string, secenek: KotuIsSecenek = {}): Promise<KotuIsSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!MESLEKLER.includes(state.meslek)) throw new Error("Önce bir meslek seçmelisin.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken bu işi çeviremezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken bu işi çeviremezsin.");
  const tanim = kotuIsTanimiGetir(tur);
  if (!tanim) throw new Error("Geçersiz iş.");

  const enflasyon = enflasyonCarpani(state);
  const dil = state.dil;
  const birim = state.para_birimi;

  // Rakip hedefleme: yalnız rakip kıran işlerde ve geçerli/yenilmemiş bir rakip için.
  const hedefRakip =
    secenek.hedefRakipAd && tur in RAKIP_KOTU_IS_HEDEFLERI
      ? state.rakipler.find((r) => r.ad === secenek.hedefRakipAd && !r.yenildi)
      : undefined;

  // "Adamına yaptır": peşin ücret; kişisel risk (ahlak/hapis) yarıya iner.
  const vekil = secenek.vekil === true;
  let vekilUcret = 0;
  if (vekil) {
    vekilUcret = Math.max(3, paraYuvarla(10 * enflasyon));
    if (state.para < vekilUcret) throw new Error("Adam tutacak paran yok.");
    state.para = paraYuvarla(state.para - vekilUcret);
  }

  const sans = kotuIsBasariSansi(state, tanim);
  const kazandi = rollSuccess(sans);
  const hamDal = kazandi ? tanim.basarili : tanim.basarisiz;
  // Vekil kullanınca kişisel ahlak yükü ve hapis riski yarıya iner (fiziksel işi
  // başkası yaptı); suç izi tamamen kaybolmaz.
  const dal: KotuIsEtki = vekil
    ? {
        ...hamDal,
        ahlak: hamDal.ahlak ? Math.round(hamDal.ahlak / 2) : hamDal.ahlak,
        hapis_sansi: hamDal.hapis_sansi ? hamDal.hapis_sansi / 2 : hamDal.hapis_sansi,
        suc_artis: hamDal.suc_artis ? Math.round(hamDal.suc_artis * 0.6) : hamDal.suc_artis,
      }
    : hamDal;
  kotuIsEtkiUygula(state, dal, enflasyon);

  const adi = K(dil, KOTU_IS_ADLARI[tur] ?? tur);
  let mesaj = kazandi
    ? T(dil, "{0}: işini gördün.", [adi])
    : T(dil, "{0}: işler ters gitti.", [adi]);

  // Rakip gücü kır: başarılı dalda hedef rakibin gücünü düşür, pazar payını al.
  if (kazandi && hedefRakip) {
    const kirSonucu = rakipGucKir(state, hedefRakip.ad, RAKIP_KOTU_IS_HEDEFLERI[tur], enflasyon);
    if (kirSonucu) mesaj += " " + kirSonucu.mesaj;
  } else if (hedefRakip) {
    // Başarısız da olsa rakip senin peşinde olduğunu anlar.
    hedefRakip.husumet = Math.min(100, hedefRakip.husumet + 12);
  }

  // "Ortaya çıkma": vekille yaptırınca bile iz kalabilir (%25). Ortaya çıkarsa
  // suç izi tam biner + itibar düşer + (varsa) hedef rakip iyice azılı olur.
  if (vekil && Math.random() < 0.25) {
    state.suc_seviyesi = Math.min(100, state.suc_seviyesi + (hamDal.suc_artis ?? 8));
    state.un = Math.max(0, state.un - 3);
    if (hedefRakip) hedefRakip.husumet = Math.min(100, hedefRakip.husumet + 25);
    mesaj += " " + T(dil, "Ama tuttuğun adam konuştu; iş sana kadar izlendi.");
  }

  // Başarısız dalda "ortaya çıkma": hapis + (bazı işlerde) ölüm riski.
  if (!kazandi && dal.hapis_sansi && Math.random() < dal.hapis_sansi) {
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
    checkDeath(state, true, T(dil, "Çevirdiği karanlık bir iş sırasında öldü."));
  }

  if (kazandi && dal.para) {
    mesaj += " " + T(dil, "Kazanç: +{0} {birim}", [Math.max(1, paraYuvarla(dal.para * enflasyon))]).replace(/\{birim\}/g, birim);
  }

  clampStats(state);
  await oturumKaydet(state);
  return { state, kazandi, mesaj };
}

const KOTU_IS_ADLARI: Record<string, string> = {
  rakibi_korkut: "Rakibini Korkut",
  adam_dov: "Zevkine Adam Döv",
  rakibi_dov: "Rakibini Dövdür",
  birini_soy: "Birini Soy",
  isyeri_yak: "Rakibin İş Yerini Yak",
};

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
// Aranma yeniden dengeleme turu: tur harcamadan defalarca oynanabildiği için
// (kullanıcı: "kumar adam dövmekle aynı şey değil") 7→3'e düşürüldü — kumar
// hâlâ suç sayılır ama karanlık işler (şiddet/soygun) listesiyle tekrar
// yarışmasın.
const ZAR_SUC_ARTISI = 3;
// Hazard: her kaç elde bir "rakip bıçak çekti" tetiklenmeyi denesin ve ihtimali.
const HAZARD_BICAK_HER_KAC_EL = 4;
const HAZARD_BICAK_IHTIMAL = 0.45;
const UC_KAGITCI_KAZANMA_SANSI = 0.34;
// Aranma yeniden dengeleme turu: 4→2 (aynı gerekçe, §ZAR_SUC_ARTISI).
const UC_KAGITCI_SUC_ARTISI = 2;
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
export async function zarAt(id: string, tutar: number): Promise<HazardSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const kademeler = ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyonCarpani(state))));
  if (!kademeler.includes(tutar)) throw new Error("Geçersiz bahis tutarı.");
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${tutar} ${state.para_birimi} gerekli).`);

  const birim = state.para_birimi;
  state.para = paraYuvarla(state.para - tutar);
  state.suc_seviyesi = Math.min(100, state.suc_seviyesi + ZAR_SUC_ARTISI);
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
    state.mutluluk -= 5;
    hayatOlayiEkle(state, "🔪", T(state.dil, "Zar masasında bıçaklı bir kavgaya karıştı"));
    mesaj += " " + T(state.dil, "Sonra masa karıştı — biri bıçak çekti; sıyrık ve morlukla zar zor kaçtın.");
    clampStats(state);
    if (state.saglik <= 0 || Math.random() * 100 < efektifOlumSansi(6, state.saglik)) {
      checkDeath(state, true, T(state.dil, "Zar masasındaki bıçaklı bir kavgada öldü."));
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
 * şansı SABİT ~%34 — bardak seçimi kozmetiktir: sunucu önce kazanıp kazanmadığını
 * belirler, sonra "doğru bardağı" (kazandıysa seçilen, kaybettiyse başka bir)
 * bardağa koyar; istemci animasyonu bu sonuca göre biter. Kaybedince bahis gider,
 * kazanınca ×3 (net +2 kat bahis). Sokak dolandırıcılığı → küçük suç/aranma artışı. Turu tüketmez.
 */
export async function ucKagitciOyna(id: string, tutar: number, secim: number): Promise<UcKagitciSonucu> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const kademeler = ZAR_KADEMELERI.map((k) => Math.max(1, paraYuvarla(k * enflasyonCarpani(state))));
  if (!kademeler.includes(tutar)) throw new Error("Geçersiz bahis tutarı.");
  if (secim !== 0 && secim !== 1 && secim !== 2) throw new Error("Geçersiz bardak.");
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${tutar} ${state.para_birimi} gerekli).`);

  const birim = state.para_birimi;
  state.para = paraYuvarla(state.para - tutar);
  state.suc_seviyesi = Math.min(100, state.suc_seviyesi + UC_KAGITCI_SUC_ARTISI);
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
    };
  });
}

interface SosyallesmeSonucu {
  state: CharacterState;
  /** Bu mekâna gitmek için düşülen peşin giriş ücreti (enflasyonla ölçekli). */
  girisUcreti: number;
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
  const girisUcreti = paraYuvarla(SOSYALLESME_GIRIS_UCRETI * enflasyonCarpani(state));
  if (state.para < girisUcreti) {
    throw new Error(`Cebinde bu mekâna gidecek kadar para yok (~${girisUcreti} ${state.para_birimi} giriş ücreti).`);
  }
  state.para = paraYuvarla(state.para - girisUcreti);
  const olay = sosyallesmeIcinOlaySec(state, yerId);
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
  const hamSecenek = mevcutOlay.secenekler[secenekIndex];
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
  sucKazanciUygula(etki);
  if (mevcutOlay.kategori === "savas") orduKaybiUygula(state, basarili);

  // Sosyalleşme moral/masraf/ayyaş kuralı (yer.alkolluMu ise ziyaret sayacı + damga).
  etki.para = paraYuvarla((etki.para ?? 0) - SOSYALLESME_EK_MASRAF * enflasyonCarpani(state));
  etki.mutluluk = (etki.mutluluk ?? 0) + SOSYALLESME_MORAL_BONUSU;
  const ziyaretEdilenYer = sosyallesmeYeriGetir(mevcutOlay.sosyallesmeYeri);
  if (ziyaretEdilenYer?.alkolluMu) ayyasZiyaretiIsle(state);

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
  if (etki.ticaret_sermaye_artis) state.ticaret_sermaye += etki.ticaret_sermaye_artis;
  if (etki.nufuz_artis) state.nufuz += etki.nufuz_artis;
  if (etki.uretim_kapasitesi_artis) {
    state.uretim_kapasitesi = Math.min(100, Math.max(0, state.uretim_kapasitesi + etki.uretim_kapasitesi_artis));
  }
  if (basarili && MESLEK_KATEGORI[state.meslek] === mevcutOlay.kategori) {
    state.kariyer_puani += KARIYER_PUANI_KATEGORI_BASARI;
    if (state.meslek === "Din Adamı") state.nufuz += 1.5;
  }
  if (etki.kariyer_puani_artis) state.kariyer_puani += etki.kariyer_puani_artis;
  if (etki.suc_artis) state.suc_seviyesi += etki.suc_artis;
  if (etki.suc_seviyesi_ayarla !== undefined) state.suc_seviyesi = etki.suc_seviyesi_ayarla;

  // Sosyalleşme olaylarının kullandığı seyrek alanlar (banka denetimi: ekip_ekle 1×, unvan_kazan 2×).
  if (etki.ekip_ekle) {
    const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi, state.rakip_adi, state.es_adi ?? "", ...state.ekip.map((e) => e.isim),
    ]);
    const gercekKalite = Math.round((Math.random() * 100 + Math.random() * 100 + Math.random() * 100) / 3);
    const genislik = etki.ekip_ekle.tahminGenisligi;
    state.ekip.push({
      id: randomUUID(),
      isim,
      rol: etki.ekip_ekle.rol,
      gercekKalite,
      tahminiMin: Math.max(0, Math.round(gercekKalite - genislik / 2)),
      tahminiMax: Math.min(100, Math.round(gercekKalite + genislik / 2)),
      maas: 2 + Math.round(gercekKalite / 14),
      sadakat: Math.round(30 + Math.random() * 60),
      kisilik: EKIP_KISILIK_HAVUZU[Math.floor(Math.random() * EKIP_KISILIK_HAVUZU.length)],
    });
    maasCarpaniUygula(state, 1 + (gercekKalite - 50) / 500);
    hayatOlayiEkle(state, "🤝", T(state.dil, "{0} ({1}) ekibine katıldı", [isim, K(state.dil, etki.ekip_ekle.rol)]));
  }
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
  if (etki.olum === true) {
    checkDeath(state, true, etki.mesaj);
  } else if (etki.olum_sansi && Math.random() * 100 < efektifOlumSansi(etki.olum_sansi, state.saglik)) {
    checkDeath(state, true, etki.mesaj);
  }
  if (!state.aktif && etki.efsanevi_olum && !state.efsanevi_olum) {
    state.efsanevi_olum = etki.efsanevi_olum;
  }

  state.sosyallesme_aksiyon_kilit[`mekan:${mevcutOlay.sosyallesmeYeri}`] = state.yil;
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
      tur_basi_saglik: -1,
      tur_basi_mutluluk: -1,
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
  const bos: SosyalAksiyonConfig = { icecekler: [], aksiyonlar: [], alkolluMekanVar: false };
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
          ? T(state.dil, "Yakında tekrar yapabilirsin ({0} yıl).", [bekleyen])
          : mekanEngeli
            ? T(state.dil, "Bunun için alkollü bir mekân gerek.")
            : paraYok
              ? T(state.dil, "Yeterli paran yok.")
              : undefined,
    };
  });

  return { icecekler, aksiyonlar, alkolluMekanVar };
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
    state.suc_seviyesi = Math.min(100, state.suc_seviyesi + 2);
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
  faizTeklifi: number;
  minTutar: number;
  kademeler: number[];
}> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  const enflasyon = enflasyonCarpani(state);
  return {
    aktifKredi: state.kredi,
    maksTutar: krediMaksTutar(state),
    faizTeklifi: krediFaizTeklifi(state),
    minTutar: Math.max(1, Math.round(20 * enflasyon)),
    kademeler: krediKademeleri(state),
  };
}

export async function krediAlEndpoint(id: string, tutar: number): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const mesaj = krediAl(state, tutar);
  clampStats(state);
  await oturumKaydet(state);
  return { state, mesaj };
}

export async function krediPazarlikEndpoint(id: string): Promise<{ state: CharacterState; mesaj: string }> {
  const oturum = await oturumGetir(id);
  const { state } = oturum;
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const mesaj = krediPazarlik(state);
  await oturumKaydet(state);
  return { state, mesaj };
}
