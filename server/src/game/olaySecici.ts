import { CharacterState, Kategori, Secenek, SenaryoResponse } from "../types";
import { OLAY_BANKASI, OlayTanimi, OlaySecenegi } from "../data/olaylar";
import { OLAY_SOSYALLESME } from "../data/olaylar/sosyallesme";
import { komsuGucSec } from "../data/liderler";
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";
import { K, T } from "../i18n";
import { olayCevirisiUygula } from "../i18n/olaylar";
import { HAVUZ_KILIT_ETIKETLERI as HAVUZ_KILIT_LISTESI, hapisErkenCikisMumkunMu } from "./stateManager";

/**
 * Normal olay havuzunu tamamen kapatıp kendi özel havuzuna geçiren etiketler
 * (§8/§17/§27). Tanım stateManager'da (etiketEkle invariant'ı orada zorlanıyor);
 * burada Set olarak kullanılır. olaySec, kilitler beklenmedik biçimde çakışırsa
 * son çare fallback'iyle throw'u engeller.
 */
const HAVUZ_KILIT_ETIKETLERI = new Set<string>(HAVUZ_KILIT_LISTESI);

const KATEGORI_GORSEL: Record<Kategori, string> = {
  savas: "⚔️",
  ticaret: "💰",
  din: "🙏",
  siyaset: "🏛️",
  saglik: "❤️‍🩹",
  sosyal: "🎉",
  zanaat: "🔨",
};

/**
 * Bir olayın çağ/bölge/meslek/stat/etiket koşullarına göre uygunluğu — sosyalleşme
 * mekânı dışlaması HARİÇ tüm alanlar burada kontrol edilir. Normal rastgele havuz
 * `uygunMu` (aşağıda) üzerinden bunu kullanır; sosyalleşme seçimi (sosyallesmeIcinOlaySec)
 * ise sosyallesmeYeri eşleşmesini kendi başına ekleyip doğrudan bunu kullanır.
 */
export function temelUygunMu(olay: OlayTanimi, state: CharacterState): boolean {
  if (olay.cag !== undefined && olay.cag !== state.cag) return false;
  if (olay.bolgeler && !olay.bolgeler.includes(state.bolge)) return false;
  if (olay.meslekler && !olay.meslekler.includes(state.meslek)) return false;
  if (olay.minYas !== undefined && state.yas < olay.minYas) return false;
  if (olay.maxYas !== undefined && state.yas > olay.maxYas) return false;
  if (olay.minAhlak !== undefined && state.ahlak < olay.minAhlak) return false;
  if (olay.maxAhlak !== undefined && state.ahlak > olay.maxAhlak) return false;
  if (olay.minUn !== undefined && state.un < olay.minUn) return false;
  if (olay.maxUn !== undefined && state.un > olay.maxUn) return false;
  if (olay.minMutluluk !== undefined && state.mutluluk < olay.minMutluluk) return false;
  if (olay.maxMutluluk !== undefined && state.mutluluk > olay.maxMutluluk) return false;
  if (olay.maxSaglik !== undefined && state.saglik > olay.maxSaglik) return false;
  if (olay.minSaglik !== undefined && state.saglik < olay.minSaglik) return false;
  if (olay.minRakipPuani !== undefined && state.rakip_puani < olay.minRakipPuani) return false;
  if (olay.maxRakipPuani !== undefined && state.rakip_puani > olay.maxRakipPuani) return false;
  if (olay.minEsPuani !== undefined && state.es_puani < olay.minEsPuani) return false;
  if (olay.maxEsPuani !== undefined && state.es_puani > olay.maxEsPuani) return false;
  if (olay.gerekliEtiketler && !olay.gerekliEtiketler.every((e) => state.etiketler.includes(e))) return false;
  if (olay.yasakliEtiketler && olay.yasakliEtiketler.some((e) => state.etiketler.includes(e))) return false;
  if (olay.gerekliKisilik && !state.kisilik.includes(olay.gerekliKisilik)) return false;
  if (olay.gerekliDin && olay.gerekliDin !== state.din_kultur) return false;
  if (olay.minRutbeSeviye !== undefined && state.rutbe_seviye < olay.minRutbeSeviye) return false;
  if (olay.minSucSeviyesi !== undefined && state.suc_seviyesi < olay.minSucSeviyesi) return false;
  if (olay.maxSucSeviyesi !== undefined && state.suc_seviyesi > olay.maxSucSeviyesi) return false;
  if (olay.gerekliEkip && state.ekip.length === 0) return false;
  if (olay.gerekliEkipRolu && !state.ekip.some((uye) => uye.rol === olay.gerekliEkipRolu)) return false;
  if (olay.gerekliHizip && state.hizip === null) return false;
  // Veba hastalığı: bizzat vebayı kapmış bir karakter, iyileşene/ölene kadar
  // yalnız vebaHastasiOlayi havuzunu görür (hapisOlayi/yolculukOlayi ile aynı
  // "havuz kilitleme" mantığı; sağlık acil durumu diğer kilitlerin önündedir).
  const vebaHastasi = state.etiketler.includes("veba_hastasi");
  if (vebaHastasi && !olay.vebaHastasiOlayi) return false;
  if (!vebaHastasi && olay.vebaHastasiOlayi) return false;
  const hapiste = state.etiketler.includes("hapiste");
  if (hapiste && !olay.hapisOlayi) return false;
  if (!hapiste && olay.hapisOlayi) return false;
  // Ağır bir tutuklamada (§17 "baskın"/"azılı suçlu" bantları) minimum yatma
  // süresi dolmadan para/af ile KESİN serbest bırakma sunan olaylar gizlenir —
  // fiziksel kaçış girişimleri (hapisParaylaCikisOlayi:false/undefined) bundan
  // etkilenmez, her zaman denenebilir kalır.
  if (hapiste && olay.hapisParaylaCikisOlayi && !hapisErkenCikisMumkunMu(state)) return false;
  // "Az olay var" turu Faz 8: kaçış/erken-tahliye stratejisini BAŞLATAN olaylar
  // (a) ilk 2 hapisOlayi çözülene kadar (önce hapishane hayatını yaşa) ve
  // (b) toplam ceza 5 yıldan kısaysa (kısa cezada kaçış zincirine zaman/gerekçe
  // yok) havuzdan çıkarılır. Zincirin devam adımları zorunlu_sonraki ile
  // zorlandığı için bu filtreden hiç geçmiyor, etkilenmiyor.
  if (olay.hapisKacisBaslangici && (state.hapis_tur_sayaci < 2 || state.hapis_ceza_toplam < 5)) {
    return false;
  }
  const yolculukta = state.etiketler.includes("yolculukta");
  if (yolculukta && !olay.yolculukOlayi) return false;
  if (!yolculukta && olay.yolculukOlayi) return false;
  const kacak = state.etiketler.includes("kacak");
  if (kacak && !olay.kacakOlayi) return false;
  if (!kacak && olay.kacakOlayi) return false;
  if (olay.gerekliUlke) {
    for (const [anahtar, deger] of Object.entries(olay.gerekliUlke)) {
      if (state.ulke[anahtar as keyof typeof state.ulke] !== deger) return false;
    }
  }
  return true;
}

/** Normal rastgele havuz için: sosyalleşme mekânı, mülk-bağlantılı ve gecikmiş-takip SONUÇ olayları burada her zaman dışlanır — sırasıyla sosyallesmeIcinOlaySec, gameEngine.ts'teki mülk-olayı kaskadı ve gecikmiş-takip kaskadı tarafından zorlanan olay olarak getirilirler. */
function uygunMu(olay: OlayTanimi, state: CharacterState): boolean {
  return (
    temelUygunMu(olay, state) &&
    olay.sosyallesmeYeri === undefined &&
    olay.mulkOlayi === undefined &&
    !olay.gecikmisSonucOlayi
  );
}

function rastgeleYasayanCocukAdi(state: CharacterState): string {
  const yasayanlar = state.cocuklar.filter((c) => c.yasiyor);
  if (yasayanlar.length === 0) return T(state.dil, "çocuğun");
  return yasayanlar[Math.floor(Math.random() * yasayanlar.length)].isim;
}

function rastgeleEkipAdi(state: CharacterState): string {
  if (state.ekip.length === 0) return T(state.dil, "ekibinden biri");
  return state.ekip[Math.floor(Math.random() * state.ekip.length)].isim;
}

export function doldur(metin: string, state: CharacterState): string {
  const dil = state.dil;
  return metin
    .replace(/\{bolge\}/g, K(dil, state.bolge))
    .replace(/\{meslek\}/g, K(dil, state.meslek))
    .replace(/\{aile\}/g, K(dil, state.aile_meslegi))
    .replace(/\{yil\}/g, String(state.yil))
    .replace(/\{birim\}/g, state.para_birimi)
    .replace(/\{dost\}/g, state.dost_adi)
    .replace(/\{rakip\}/g, state.rakip_adi)
    .replace(/\{es\}/g, state.es_adi ?? T(dil, "eşin"))
    .replace(/\{anne\}/g, state.anne_adi)
    .replace(/\{baba\}/g, state.baba_adi)
    .replace(/\{amir\}/g, state.amir_adi ? `${K(dil, state.amir_rutbe)} ${state.amir_adi}` : T(dil, "amirin"))
    .replace(/\{hayvan\}/g, state.evcil_hayvan?.isim ?? T(dil, "hayvanın"))
    .replace(/\{cocuk\}/g, rastgeleYasayanCocukAdi(state))
    .replace(/\{ekip\}/g, rastgeleEkipAdi(state))
    .replace(
      /\{komsu\}/g,
      K(dil, tarihiSavasKontrol(state.bolge, state.yil, state.cag) ?? komsuGucSec(state.bolge))
    );
}

function clampSans(sans: number): number {
  return Math.max(5, Math.min(95, Math.round(sans)));
}

/**
 * Oyuncuya gösterilecek belirsizlik genişliği: gençken ve tecrübesizken geniş
 * (kendi şansını net kestiremez), yaş ilerledikçe, keskin gözlü bir yardımcı
 * tutulunca ve eşin verdiği bakış açısıyla daralır. Hiçbir zaman tam kesinliğe
 * inmez — her zaman biraz sis kalır.
 */
function belirsizlikGenisligi(state: CharacterState): number {
  let genislik: number;
  if (state.yas < 22) genislik = 30;
  else if (state.yas < 30) genislik = 24;
  else if (state.yas < 40) genislik = 18;
  else if (state.yas < 55) genislik = 14;
  else genislik = 10;

  if (state.etiketler.includes("gozlemci_var")) genislik -= 6;
  if (state.es_adi) genislik -= Math.round(state.es_puani / 20); // ilişki güçlüyse eş de sezgine katkı sağlar

  return Math.max(6, genislik);
}

function aralikYuvarla(deger: number, yon: "asagi" | "yukari"): number {
  const adim = 5;
  return yon === "asagi" ? Math.floor(deger / adim) * adim : Math.ceil(deger / adim) * adim;
}

function belirsizAralikHesapla(state: CharacterState, basariSansi: number): { min: number; max: number } {
  const yarim = belirsizlikGenisligi(state) / 2;
  const min = Math.max(0, aralikYuvarla(basariSansi - yarim, "asagi"));
  const max = Math.min(100, aralikYuvarla(basariSansi + yarim, "yukari"));
  return { min, max };
}

// Bir önceki olay "ağır" (trajik) ise, art arda gelmesin diye bu turda başka
// bir ağır olayın seçilme ihtimali büyük ölçüde azaltılır (tamamen engellenmez).
const AGIR_ARKA_ARKAYA_CARPANI = 0.15;

/** Bekar karakter yaşlandıkça evlilik teklifinin çıkma ağırlığı artar: 18 yaşta ×1, her yaş +0.15 (29'da ~×2.65). */
const EVLILIK_TEKLIFI_ID = "iliski_evlilik_teklifi";
const EVLILIK_YAS_TABANI = 18;
const EVLILIK_YAS_CARPANI = 0.15;

function evlilikAgirlikCarpani(olay: OlayTanimi, state: CharacterState): number {
  if (olay.id !== EVLILIK_TEKLIFI_ID || state.etiketler.includes("medeni:evli")) return 1;
  return 1 + Math.max(0, state.yas - EVLILIK_YAS_TABANI) * EVLILIK_YAS_CARPANI;
}

function olayAgirligiHesapla(olay: OlayTanimi, state: CharacterState, sonTon?: "agir" | "hafif" | null): number {
  const temel = (olay.agirlik ?? 1) * evlilikAgirlikCarpani(olay, state);
  if (sonTon === "agir" && olay.ton === "agir") return temel * AGIR_ARKA_ARKAYA_CARPANI;
  return temel;
}

function agirlikliSec(olaylar: OlayTanimi[], state: CharacterState, sonTon?: "agir" | "hafif" | null): OlayTanimi {
  const toplamAgirlik = olaylar.reduce((toplam, olay) => toplam + olayAgirligiHesapla(olay, state, sonTon), 0);
  let esik = Math.random() * toplamAgirlik;
  for (const olay of olaylar) {
    esik -= olayAgirligiHesapla(olay, state, sonTon);
    if (esik <= 0) return olay;
  }
  return olaylar[olaylar.length - 1];
}

/**
 * Havuz büyüklüğüne göre uyarlanan tekrar-önleme penceresi (§12, Yol C).
 * Taban 6 korunur (çok küçük havuzlarda bile en az bir miktar koruma),
 * havuzun %70'i kadar büyür, 30'da tavanlanır (büyük havuzda maliyeti/etkiyi
 * sınırlamak için — zaten geniş bir havuzda daha büyük pencerenin faydası az).
 */
export function sonKTekrarOnlemeHesapla(havuzBuyuklugu: number): number {
  return Math.min(30, Math.max(6, Math.floor(havuzBuyuklugu * 0.7)));
}

/** Bir seçeneğin neden seçilemediğini döndürür; seçilebiliyorsa null. */
function kilitNedeni(secenek: OlaySecenegi, state: CharacterState): string | null {
  if (secenek.maliyet !== undefined && state.para < secenek.maliyet) {
    return `Yeterli paran yok (${secenek.maliyet} ${state.para_birimi} gerekli)`;
  }
  if (secenek.minUn !== undefined && state.un < secenek.minUn) {
    const gerekenYildiz = (secenek.minUn / 20).toFixed(1);
    return `Şöhretin yetersiz (${gerekenYildiz} yıldız gerekli)`;
  }
  if (secenek.minAhlak !== undefined && state.ahlak < secenek.minAhlak) {
    return "Böyle bir teklif için kimse sana güvenmiyor";
  }
  if (secenek.maxAhlak !== undefined && state.ahlak > secenek.maxAhlak) {
    return "Vicdanın buna izin vermiyor";
  }
  if (secenek.gerekliEtiketler && !secenek.gerekliEtiketler.every((e) => state.etiketler.includes(e))) {
    return secenek.kilitAciklamasi ?? "Bunun için gerekli bağlantılara sahip değilsin";
  }
  if (secenek.yasakliEtiketler && secenek.yasakliEtiketler.some((e) => state.etiketler.includes(e))) {
    return secenek.kilitAciklamasi ?? "Artık bunu yapamıyorsun";
  }
  // Borçluyken cepten para gerektiren seçenekler kapanır.
  const paraCikisi = Math.min(secenek.basariliSonuc.para ?? 0, secenek.basarisizSonuc.para ?? 0);
  if (state.para < 0 && paraCikisi < 0) {
    return "Borçlusun, cebinden para çıkacak bir işe giremezsin";
  }
  return null;
}

export interface SecilenOlay {
  olay: OlayTanimi;
  senaryo: SenaryoResponse;
}

export function olaySec(
  state: CharacterState,
  zorlananOlayId?: string,
  sonTon?: "agir" | "hafif" | null
): SecilenOlay {
  const zorlananOlay = zorlananOlayId ? OLAY_BANKASI.find((o) => o.id === zorlananOlayId) : undefined;

  let olay: OlayTanimi;
  if (zorlananOlay) {
    olay = zorlananOlay;
  } else {
    let uygunlar = OLAY_BANKASI.filter((o) => uygunMu(o, state));
    if (uygunlar.length === 0) {
      // SON ÇARE — burası ASLA throw etmemeli: bir tur olay üretemezse o
      // karakterin oyunu tamamen kilitlenir (her /scenario 500 döner). Havuz
      // kilitleyen etiketler (hapiste / kacak / yolculukta / veba_hastasi)
      // beklenmedik biçimde çakıştıysa (ör. arka plan veba bulaşması bir kilit
      // altındayken tetiklendiyse) yumuşak bir kaçış: bu dört kilidi ve
      // gecmis/tag koşullarını yok sayıp en gevşek uygun havuza düş. Böyle bir
      // olay kısmen bağlam dışı düşse bile, kilitli oyundan iyidir.
      const gevsekUygun = (o: (typeof OLAY_BANKASI)[number]) =>
        temelUygunMu(o, { ...state, etiketler: state.etiketler.filter((e) => !HAVUZ_KILIT_ETIKETLERI.has(e)) }) &&
        o.sosyallesmeYeri === undefined &&
        o.mulkOlayi === undefined &&
        !o.hapisOlayi &&
        !o.yolculukOlayi &&
        !o.kacakOlayi &&
        !o.vebaHastasiOlayi;
      uygunlar = OLAY_BANKASI.filter(gevsekUygun);
      if (uygunlar.length === 0) {
        // Teorik olarak imkânsız (127 tamamen kısıtsız olay var) ama yine de
        // throw yerine ilk kısıtsız olayı ver.
        uygunlar = OLAY_BANKASI.filter(
          (o) =>
            o.sosyallesmeYeri === undefined &&
            o.mulkOlayi === undefined &&
            !o.hapisOlayi &&
            !o.yolculukOlayi &&
            !o.kacakOlayi &&
            !o.vebaHastasiOlayi
        );
      }
    }
    // (İngilizce çeviri seçimden SONRA, aşağıda uygulanır — filtre/ağırlık mantığı hep Türkçe tanımı kullanır.)
    // Öncelik: hiç görülmemiş olaylar > en uzun süredir görülmemiş olaylar.
    // gecmis_olaylar kronolojik sırayla tutuluyor (push ile ekleniyor); bir
    // olayın son görülme index'i ne kadar küçükse (ya da hiç yoksa, -1) o
    // kadar önceliklidir. Havuz tükenip aynı olaylara dönülmesi gerektiğinde
    // bile en yakın zamanda görülen (en yüksek index'li) tekrar edilmez.
    const sonGorulmeSirasi = (id: string) => state.gecmis_olaylar.lastIndexOf(id);
    // Ek olarak: uygun havuz "son K görülende hiç yok" alt kümesi boş değilse
    // önce ondan seçilir — küçük havuzlu (tag-gated) zincirlerde bile aynı
    // olayın art arda/sık sık tekrar çıkması önlenir. Havuz bu filtreyle
    // boşalırsa (gerçekten tek/iki seçenek kaldıysa) eski tied-minimum
    // davranışına geri dönülür (güvenlik ağı — hiçbir zaman olaysız kalınmaz).
    // K, havuz büyüklüğüne UYARLANIR (2026-09, "az olay var" turu — Yol C):
    // sabit 6, hapis (39)/kaçak (10)/veba (8)/yolculuk (tek dal ~4) gibi KÜÇÜK
    // havuzlarda neredeyse hiç koruma sağlamıyordu (havuzun %15-75'i gibi
    // devasa bir pay 6 turda tekrar edilebiliyordu). Küçük havuzda K havuzun
    // kendisine yakın büyür (aynı olay neredeyse hepsi görülene kadar
    // dönmez); büyük (normal ~150'lik) havuzda 30'da tavanlanır — zaten geniş
    // olduğu için daha fazla pencereye gerek yok, maliyeti sınırlı tutar.
    // Çapraz-hayat tekrar önleme: aynı cihazdan (istemci_id) önceki hayatlarda
    // görülen olaylar da bu turun hard-exclusion penceresine katılır — "hep aynı
    // olaylar çıkıyor" şikayetini yalnız TEK bir hayat içinde değil, aynı cihazdan
    // art arda başlatılan FARKLI hayatlar arasında da azaltır. Milestone/kaskad
    // kontrolleri (§11, senaryoUret) buna dokunmaz — onlar hâlâ yalnız
    // state.gecmis_olaylar'a (bu hayatın kendi geçmişi) bakar, "ömürde bir kez"
    // garantileri bu yüzden etkilenmez.
    const SON_K_TEKRAR_ONLEME = sonKTekrarOnlemeHesapla(uygunlar.length);
    const sonGorulenler = new Set([
      ...state.gecmis_olaylar.slice(-SON_K_TEKRAR_ONLEME),
      ...(state.istemci_gecmis_olaylar ?? []),
    ]);
    const yakinTekrarEtmeyenler = uygunlar.filter((o) => !sonGorulenler.has(o.id));
    const adaylar = yakinTekrarEtmeyenler.length > 0 ? yakinTekrarEtmeyenler : uygunlar;
    const enOncelikliSira = Math.min(...adaylar.map((o) => sonGorulmeSirasi(o.id)));
    const havuz = adaylar.filter((o) => sonGorulmeSirasi(o.id) === enOncelikliSira);
    olay = agirlikliSec(havuz, state, sonTon);
  }

  // Olay artık seçildi; oyuncunun dili İngilizceyse gösterim metinlerini (başlık/
  // metin/seçenek/mesaj/detay) çevrilmiş bir kopyayla değiştir. Tüm mantık
  // alanları (id, filtreler, etkiler, baseBasariSansi) aynen korunur.
  olay = olayCevirisiUygula(olay, state.dil);

  const secenekEksenUygunMu = (secenek: OlaySecenegi): boolean => {
    if (!secenek.gerekliEksen) return true;
    const deger = state.kisilik_eksenleri[secenek.gerekliEksen.eksen];
    if (secenek.gerekliEksen.min !== undefined && deger < secenek.gerekliEksen.min) return false;
    if (secenek.gerekliEksen.max !== undefined && deger > secenek.gerekliEksen.max) return false;
    return true;
  };

  const kisilikUygunSecenekler = olay.secenekler.filter(
    (secenek) => !secenek.gerekliKisilik || state.kisilik.includes(secenek.gerekliKisilik)
  );
  const eksenUygunSecenekler = kisilikUygunSecenekler.filter(secenekEksenUygunMu);
  // Güvenlik: eksen filtresi oyuncuyu seçeneksiz bırakırsa (iki uçlu koşullar örtüşmezse), filtre yok sayılır.
  const kullanilacakSecenekler =
    eksenUygunSecenekler.length > 0 ? eksenUygunSecenekler : kisilikUygunSecenekler;

  // İstihbarat satın alınmışsa, bulanık aralık yerine net yüzde gösterilir (tek seferlik, tag senaryoUret'te tüketilir).
  const netSansGoster = state.etiketler.includes("istihbarat_var");

  const secenekler: Secenek[] = kullanilacakSecenekler.map((secenek) => {
      const neden = kilitNedeni(secenek, state);
      const yatkinlikBonus = state.yatkinliklar[olay.kategori] ?? 0;
      // Ekip üyesinin gizli kalitesi başarı şansını belirliyorsa, karakterin kendi
      // yatkınlığı devre dışı kalır; şans doğrudan üyenin gercekKalite'sine eşitlenir.
      const zarBelirleyenUye = secenek.ekipKalitesiZarBelirler
        ? state.ekip.find((uye) => uye.rol === secenek.ekipKalitesiZarBelirler)
        : undefined;
      const basariSansi = zarBelirleyenUye
        ? zarBelirleyenUye.gercekKalite
        : clampSans(secenek.baseBasariSansi + yatkinlikBonus);
      return {
        metin: doldur(secenek.metin, state),
        basari_sansi: basariSansi,
        belirsiz_aralik: netSansGoster ? { min: basariSansi, max: basariSansi } : belirsizAralikHesapla(state, basariSansi),
        basarili_sonuc: secenek.basariliSonuc,
        basarisiz_sonuc: secenek.basarisizSonuc,
        kilitli: neden !== null,
        kilit_nedeni: neden ?? undefined,
      };
    });

  // Oyuncu çıkışsız kalmasın: her şık kilitliyse en ucuz olanı serbest bırak.
  if (secenekler.every((s) => s.kilitli)) {
    secenekler.forEach((s) => {
      s.kilitli = false;
      s.kilit_nedeni = undefined;
    });
  }

  return {
    olay,
    senaryo: {
      olay_basligi: olay.baslik,
      olay_metni: doldur(olay.metin, state),
      kategori: olay.kategori,
      gorsel: olay.gorsel ?? KATEGORI_GORSEL[olay.kategori] ?? "📜",
      secenekler,
    },
  };
}

/**
 * Oyuncu bir sosyalleşme mekânına gitmeyi seçtiğinde (gameEngine.ts
 * sosyallesmeYerineGit), o mekâna ait (sosyallesmeYeri eşleşen) ve karakterin
 * çağ/bölge/meslek/yaş/etiket koşullarına uygun olaylar arasından, saray/hizip/
 * evcil hayvan takip havuzlarıyla aynı "hiç görülmemiş > en uzun süredir
 * görülmemiş" önceliğiyle bir tanesini seçer. Ağırlık (agirlik) alanı burada da
 * hesaba katılır ama ton-arka-arkaya cezası uygulanmaz (mekân ziyaretleri
 * oyuncunun kendi seçtiği, ambient akıştan bağımsız anlardır).
 */
export function sosyallesmeIcinOlaySec(state: CharacterState, yerId: string): OlayTanimi {
  const adaylar = OLAY_SOSYALLESME.filter(
    (o) => o.sosyallesmeYeri === yerId && temelUygunMu(o, state)
  );
  if (adaylar.length === 0) {
    throw new Error("Bu mekân için şu an uygun bir olay yok.");
  }
  const sonGorulmeSirasi = (id: string) => state.gecmis_olaylar.lastIndexOf(id);
  const enOncelikliSira = Math.min(...adaylar.map((o) => sonGorulmeSirasi(o.id)));
  const havuz = adaylar.filter((o) => sonGorulmeSirasi(o.id) === enOncelikliSira);
  return agirlikliSec(havuz, state, null);
}
