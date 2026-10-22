import type { CharacterState, CemaatDurumu, IsletmeDokum, IsletmeHat, IsletmeUyari } from "../types";
import { isletmeProfiliGetir, rolAdiGetir } from "../data/meslekProfilleri";
import {
  AHLAK_BANTLARI,
  ASEVI_KADEME_ETKISI,
  ASIRI_COOLDOWN_YIL,
  ASIRI_ESIK,
  ASIRI_INANAN,
  ASIRI_OTORITE,
  ASIRI_SOHRET,
  AYIN_MASRAF_ORANI,
  BAGIS_ORANI_TAVAN,
  BAGIS_POLITIKASI,
  BAGIS_BIRIMI,
  BAGIS_TABAN_ORANI,
  BINA_BAKIM,
  BINA_KAPASITE,
  CEMAAT_DONEM_ETKILERI,
  DINI_FIZIKSEL,
  DINI_SALDIRI_AGIRLIKLARI,
  DINI_SALDIRI_HASARLARI,
  ENGIZISYON_AHLAK_ESIGI,
  FAALIYETLER,
  FAALIYET_SLOTLARI,
  FANATIK_BAGIS_KATSAYI,
  FANATIK_DOGAL_SONUM,
  FANATIK_KACIS_KATSAYI,
  FANATIK_OTORITE_KATSAYI,
  GELME_ARALIKLARI,
  KITLE_POLITIKASI,
  MEZUN_ADAY_SANSI,
  MEZUN_PAZAR_ARALIK,
  OKUL_MEZUN_SANSI,
  OKUL_YETENEK_KADEME,
  TESKILAT_AIDATI_ORANI,
  TON_FANATIKLIK,
  YARDIM_POLITIKASI,
  ahlakInananEtkisi,
  faaliyetGetir,
  type CemaatDonemEtkisi,
  type DiniSaldiri,
  type GelmeKaynagi,
} from "../data/cemaat";
import { ogretiGetir, ogretiSecenekleri, ogretiToplami, type FaaliyetId, type OgretiToplami } from "../data/ogretiler";
import {
  RAKIP_BUYUK_SALDIRI_ORANI,
  RAKIP_IKINCI_HASAR_CARPANI,
  SIZMA_HASAR_CARPANI,
  SIZMA_SADAKAT_KAYBI,
  aktifRakip,
  aktifRakipler,
  musteriSayisi,
  pazarPayiHesapla,
  rakipSaldiriKademesi,
  rastgeleSaldiriYili,
  sabitMusteriArtisi,
  sohretPayBuyumesi,
} from "../data/pazar";
import { musteriAktar, musteriKaydir, pazarOlcekle, piyasaCarpani, rakipGrubu } from "./piyasa";
import {
  OTORITE_KORUMA_ESIGI,
  SADAKAT_RISK_ESIGI,
  VEBA_ARTIS_CARPANI,
  adaylariGerekirseYenile,
  adaylariYenile,
  calisanLimiti,
  calisanMaaslariniGuncelle,
  calisanSadakatKontrolleri,
  calisanlariGelistir,
  ekipBonuslari,
  imtiyazAktifMi,
  korumaHesapla,
  pazarBuyumeOrani,
  sureleriKontrolEt,
  tanitimBuyumesi,
  vergiOrani,
  yatirimKademesi,
  type IsletmeBaglami,
  type IsletmeYilSonucu,
} from "./isletme";
import { aranmaAhlakKaybi, aranmaMusteriKaybi } from "../data/aranmaSabitleri";
import { yatkinlikMusteriBuyumesi } from "../data/meslekYatkinlik";

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
const r2 = (x: number) => Math.round(x * 100) / 100;
const rnd = (min: number, max: number) => min + Math.random() * (max - min);
/** Yoğun pozitif büyüme pay bu eşiğe yaklaştıkça sıfıra iner (isletme.ts ile aynı). */
const PAY_DOYMA_ESIGI = 0.68;
const KISILIK_DONEM_SIRASI: (keyof CemaatDonemEtkisi)[] = ["bagis", "tovbe", "ritual", "sifa", "egitim", "emanet", "yardim"];

// ── Durum kurulumu ──────────────────────────────────────────────────────────
export function cemaatVarsayilan(): CemaatDurumu {
  return {
    bagis: "normal",
    kitle: "genel",
    yardim: "orta",
    ton: "dengeli",
    fanatiklik: 0,
    ogretiler: [],
    bekleyen_ogreti: 1,
    mezun_son_yil: null,
    asiri_son_yil: null,
  };
}

function faaliyetHatlari(): IsletmeHat[] {
  return FAALIYETLER.map((f) => ({
    id: f.id, acik: f.minRutbe <= 1, stok: 0, otomatik: true, siparis: 0, fiyat: "normal" as const, son_talep: 0, son_satis: 0,
  }));
}

/** Din Adamı işletmesi ilk kez kurulurken çağrılır. */
export function cemaatBaslat(state: CharacterState): void {
  const hatlar = faaliyetHatlari();
  // Başlangıçta yalnız ilk faaliyet açık (tövbe); ritüel de S1'de açılabilir ama oyuncu seçer.
  hatlar.forEach((h) => (h.acik = h.id === "tovbe"));
  state.isletme = {
    hatlar,
    yatirimlar: {},
    tedarikci_borcu: 0,
    son_dokum: null,
    adaylar: [],
    aday_yili: state.yil,
    stok_hedefi: "normal",
    hirsizlik_son_yil: null,
    imtiyazlar: {},
    tekel_hat: null,
    cemaat: cemaatVarsayilan(),
  };
  adaylariYenile(state);
  ogretiBekleyenSeviye(state);
}

/** Eski kayıt / yeni cemaat: ticaret hatlarını siler, faaliyetleri ve cemaat durumunu kurar. */
export function cemaatHazirla(state: CharacterState): void {
  const is = state.isletme;
  if (!is) {
    cemaatBaslat(state);
    return;
  }
  const eskiHatMi = is.hatlar.some((h) => !FAALIYETLER.some((f) => f.id === h.id));
  if (eskiHatMi || is.hatlar.length === 0) {
    const acikTovbe = is.hatlar.length === 0 || eskiHatMi;
    is.hatlar = faaliyetHatlari();
    is.hatlar.forEach((h) => (h.acik = acikTovbe ? h.id === "tovbe" : h.acik));
    is.tedarikci_borcu = 0;
    is.tekel_hat = null;
    is.stok_hedefi = "normal";
  }
  for (const f of FAALIYETLER) {
    if (!is.hatlar.some((h) => h.id === f.id)) is.hatlar.push({ id: f.id, acik: false, stok: 0, otomatik: true, siparis: 0, fiyat: "normal", son_talep: 0, son_satis: 0 });
  }
  // Eski yatırım id'leri (depo/dukkan/kervan) yeni profile karşılık gelmez; kademeler silinir.
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (profil) {
    for (const k of Object.keys(is.yatirimlar)) if (!profil.yatirimlar.some((y) => y.id === k)) delete is.yatirimlar[k];
  }
  if (!is.cemaat) is.cemaat = cemaatVarsayilan();
  const c = is.cemaat;
  if (!Array.isArray(c.ogretiler)) c.ogretiler = [];
  if (c.mezun_son_yil === undefined) c.mezun_son_yil = null;
  if (c.asiri_son_yil === undefined) c.asiri_son_yil = null;
  if (typeof c.fanatiklik !== "number") c.fanatiklik = 0;
  ogretiBekleyenSeviye(state);
  if (is.adaylar.length === 0) adaylariYenile(state);
}

// ── Öğreti ──────────────────────────────────────────────────────────────────
/** Seçilmeyi bekleyen öğreti seviyesi (yoksa null). Alanı da günceller. */
export function ogretiBekleyenSeviye(state: CharacterState): number | null {
  const c = state.isletme?.cemaat;
  if (!c) return null;
  const seviye = c.ogretiler.length < (state.rutbe_seviye ?? 1) ? c.ogretiler.length + 1 : null;
  c.bekleyen_ogreti = seviye;
  return seviye;
}

export function ogretiBekliyorMu(state: CharacterState): boolean {
  return state.meslek === "Din Adamı" && ogretiBekleyenSeviye(state) !== null;
}

export function ogretiSec(state: CharacterState, ogretiId: string): void {
  const c = state.isletme?.cemaat;
  if (!c) throw new Error("Bu mesleğin bir cemaati yok.");
  const seviye = ogretiBekleyenSeviye(state);
  if (seviye === null) throw new Error("Şu an seçilecek bir öğreti yok.");
  const tanim = ogretiGetir(ogretiId);
  if (!tanim || tanim.seviye !== seviye) throw new Error("Bu öğreti şu an seçilemez.");
  if (!ogretiSecenekleri(seviye).some((o) => o.id === tanim.id)) throw new Error("Bu öğreti şu an seçilemez.");
  c.ogretiler.push(tanim.id);
  c.fanatiklik = clamp(c.fanatiklik + (tanim.etki.fanatiklik ?? 0), 0, 100);
  ogretiBekleyenSeviye(state);
}

// ── Dönem ───────────────────────────────────────────────────────────────────
/** Dönem × savaş × veba cemaat çarpanları (her alan çarpılır). */
export function cemaatDonemBilesik(state: CharacterState): CemaatDonemEtkisi {
  const kaynaklar: CemaatDonemEtkisi[] = [];
  if (state.ulke.donem) kaynaklar.push(CEMAAT_DONEM_ETKILERI[state.ulke.donem.tur]);
  if (state.ulke.savasta) kaynaklar.push(CEMAAT_DONEM_ETKILERI.savas);
  if (state.veba?.aktif) kaynaklar.push(CEMAAT_DONEM_ETKILERI.veba);
  const sonuc = { bagis: 1, tovbe: 1, ritual: 1, sifa: 1, egitim: 1, emanet: 1, yardim: 1 } as CemaatDonemEtkisi;
  for (const k of kaynaklar) for (const alan of KISILIK_DONEM_SIRASI) sonuc[alan] *= k[alan];
  return sonuc;
}

export function gelmeKaynagiBul(state: CharacterState): GelmeKaynagi {
  if (state.veba?.aktif) return "veba";
  if (state.ulke.savasta) return "savas";
  if (state.ulke.donem?.tur === "kitlik") return "kitlik";
  return "normal";
}

export function gelmeAraligi(state: CharacterState): [number, number] {
  return GELME_ARALIKLARI[gelmeKaynagiBul(state)];
}

// ── Küçük yardımcılar ───────────────────────────────────────────────────────
export function binaKademesi(state: CharacterState): number {
  return clamp(yatirimKademesi(state, "bina"), 0, BINA_KAPASITE.length - 1);
}
export function okulKademesi(state: CharacterState): number {
  return clamp(yatirimKademesi(state, "okul"), 0, OKUL_MEZUN_SANSI.length - 1);
}
export function aseviKademesi(state: CharacterState): number {
  return clamp(yatirimKademesi(state, "yardim"), 0, 3);
}
export function binaKapasitesi(state: CharacterState, o: OgretiToplami): number {
  return Math.round(BINA_KAPASITE[binaKademesi(state)] * o.kapasite);
}
export function binaBakimMasrafi(state: CharacterState, enflasyon: number): number {
  return r2(BINA_BAKIM[binaKademesi(state)] * enflasyon);
}
/** Rütbeye göre aynı anda açık tutulabilecek faaliyet sayısı. */
export function faaliyetSlotSayisi(state: CharacterState): number {
  return FAALIYET_SLOTLARI[clamp((state.rutbe_seviye ?? 1) - 1, 0, FAALIYET_SLOTLARI.length - 1)];
}
export function faaliyetKilitliMi(state: CharacterState, id: string): boolean {
  const f = faaliyetGetir(id);
  return !f || f.minRutbe > (state.rutbe_seviye ?? 1);
}
/** Slota sığan, rütbesi yeten, açık faaliyetler. */
export function acikFaaliyetler(state: CharacterState): FaaliyetTanimi[] {
  const is = state.isletme;
  if (!is) return [];
  return FAALIYETLER.filter((f) => !faaliyetKilitliMi(state, f.id) && is.hatlar.find((h) => h.id === f.id)?.acik).slice(0, faaliyetSlotSayisi(state));
}
type FaaliyetTanimi = (typeof FAALIYETLER)[number];

function yardimEtkisiCarpani(state: CharacterState, o: OgretiToplami): number {
  return o.yardimEtkisi * (1 + ASEVI_KADEME_ETKISI * aseviKademesi(state));
}

// ── Gelir / gider hesabı ────────────────────────────────────────────────────
export interface CemaatHesabi {
  inanan: number;
  gelmeOrani: number;
  gelmeKaynagi: GelmeKaynagi;
  kapasite: number;
  gelen: number;
  /** Kapasiteye sığmayıp rakibe geçecek inanan sayısı. */
  tasan: number;
  bagisOrani: number;
  bagisYapan: number;
  bagisBirimi: number;
  bagis: number;
  faaliyetler: { id: FaaliyetId; gelir: number; masraf: number }[];
  faaliyetGelir: number;
  faaliyetMasraf: number;
  ayinMasrafi: number;
  binaBakim: number;
  yardim: number;
  aidat: number;
  toplamGelir: number;
  brutKar: number;
  vergiOrani: number;
  vergi: number;
}

/** Verilen ayine gelme oranıyla yıllık gelir/giderin tamamını (rastgelelik olmadan) hesaplar. */
export function cemaatHesapla(state: CharacterState, b: IsletmeBaglami, gelmeTaban: number): CemaatHesabi {
  const is = state.isletme!;
  const cm = is.cemaat!;
  const o = ogretiToplami(cm.ogretiler);
  const bon = ekipBonuslari(state);
  const d = cemaatDonemBilesik(state);
  const bp = BAGIS_POLITIKASI[cm.bagis];
  const kitle = KITLE_POLITIKASI[cm.kitle];
  const yp = YARDIM_POLITIKASI[cm.yardim];
  const inanan = musteriSayisi(state);
  const gelmeOrani = clamp(gelmeTaban + o.gelmeOrani, 0.05, 0.98);
  const kapasite = binaKapasitesi(state, o);
  const gelen = Math.min(inanan * gelmeOrani, kapasite);
  const tasan = Math.max(0, inanan * gelmeOrani - kapasite);
  const bagisOrani = Math.min(BAGIS_ORANI_TAVAN, BAGIS_TABAN_ORANI * bp.oran * (1 + FANATIK_BAGIS_KATSAYI * cm.fanatiklik) + o.bagisOrani);
  const bagisBirimi =
    BAGIS_BIRIMI *
    (1 + o.bagisBirimi) *
    b.enflasyon *
    bp.miktar *
    kitle.bagis *
    d.bagis *
    (1 + bon.ana) *
    (imtiyazAktifMi(state, "kutsal_gun_imtiyazi") ? 1.1 : 1) *
    piyasaCarpani(state, "talep") *
    b.satisCarpani;
  const bagisYapan = gelen * bagisOrani;
  const bagis = bagisYapan * bagisBirimi;
  const masrafCarpani = (1 - clamp(o.masrafIndirimi, 0, 0.6)) * bon.maliyetCarpani * (imtiyazAktifMi(state, "vakif_muafiyeti") ? 0.92 : 1);
  const faaliyetler = acikFaaliyetler(state).map((f) => {
    const gelir = inanan * f.gelirBirimi * BAGIS_BIRIMI * b.enflasyon * d[f.id] * o.faaliyet[f.id];
    return { id: f.id, gelir, masraf: gelir * f.masraf * masrafCarpani };
  });
  const faaliyetGelir = faaliyetler.reduce((t, x) => t + x.gelir, 0);
  const faaliyetMasraf = faaliyetler.reduce((t, x) => t + x.masraf, 0);
  const toplamGelir = bagis + faaliyetGelir;
  const ayinMasrafi = bagis * AYIN_MASRAF_ORANI;
  const binaBakim = binaBakimMasrafi(state, b.enflasyon);
  const yardim = toplamGelir * yp.oran * d.yardim * (1 - clamp(o.yardimMaliyet, 0, 0.8));
  const aidat = toplamGelir * TESKILAT_AIDATI_ORANI;
  const brutKar = toplamGelir - faaliyetMasraf - ayinMasrafi - binaBakim - yardim - aidat;
  const vOran = Math.max(0.05, vergiOrani(state) - o.vergiPuan);
  const vergi = brutKar > 0 ? brutKar * vOran : 0;
  return {
    inanan, gelmeOrani, gelmeKaynagi: gelmeKaynagiBul(state), kapasite, gelen, tasan, bagisOrani, bagisYapan, bagisBirimi, bagis,
    faaliyetler, faaliyetGelir, faaliyetMasraf, ayinMasrafi, binaBakim, yardim, aidat, toplamGelir, brutKar, vergiOrani: vOran, vergi,
  };
}

/** Bir faaliyetin (açık olmasa da) bu yılki beklenen geliri ve masrafı; görünümde "açarsan" tahmini için. */
export function faaliyetTahmini(state: CharacterState, b: IsletmeBaglami, id: FaaliyetId): { gelir: number; masraf: number } {
  const f = faaliyetGetir(id);
  const cm = state.isletme?.cemaat;
  if (!f || !cm) return { gelir: 0, masraf: 0 };
  const o = ogretiToplami(cm.ogretiler);
  const bon = ekipBonuslari(state);
  const d = cemaatDonemBilesik(state);
  const masrafCarpani = (1 - clamp(o.masrafIndirimi, 0, 0.6)) * bon.maliyetCarpani * (imtiyazAktifMi(state, "vakif_muafiyeti") ? 0.92 : 1);
  const gelir = musteriSayisi(state) * f.gelirBirimi * BAGIS_BIRIMI * b.enflasyon * d[f.id] * o.faaliyet[f.id];
  return { gelir, masraf: gelir * f.masraf * masrafCarpani };
}

/** Başlangıç / "yıllık kazanç" göstergesi için beklenen yıllık brüt kâr (aralık ortası gelme oranıyla). */
export function cemaatBeklenenKar(state: CharacterState, b: IsletmeBaglami): number {
  if (!state.isletme?.cemaat) return 0;
  const [mn, mx] = gelmeAraligi(state);
  return cemaatHesapla(state, b, (mn + mx) / 2).brutKar;
}

// ── Yıllık inanan / ahlak / otorite akışı ───────────────────────────────────
export interface CemaatEtkenleri {
  /** Yıllık inanan değişimi (kesir) — kaynakları tek tek. */
  kalemler: { kod: string; deger: number }[];
  toplam: number;
  ahlak: number;
  otorite: number;
  fanatiklikDegisim: number;
}

/** Bu yılın inanan büyümesi (kesir), ahlak ve otorite etkisi; `cemaatYilIsle` ve görünüm kullanır. */
export function cemaatEtkenleri(state: CharacterState): CemaatEtkenleri {
  const is = state.isletme!;
  const cm = is.cemaat!;
  const o = ogretiToplami(cm.ogretiler);
  const bon = ekipBonuslari(state);
  const bp = BAGIS_POLITIKASI[cm.bagis];
  const kitle = KITLE_POLITIKASI[cm.kitle];
  const yp = YARDIM_POLITIKASI[cm.yardim];
  const yE = yardimEtkisiCarpani(state, o);
  const altC = cm.kitle === "alt" ? o.altKitle : 1;
  const acik = acikFaaliyetler(state);
  const kalemler: { kod: string; deger: number }[] = [
    { kod: "sohret", deger: sohretPayBuyumesi(state.un) },
    { kod: "ahlak", deger: ahlakInananEtkisi(state.ahlak) },
    { kod: "bagis", deger: bp.inanan },
    { kod: "kitle", deger: kitle.inanan * (kitle.inanan > 0 ? altC : 1) },
    { kod: "yardim", deger: yp.inanan * (yp.inanan > 0 ? yE : 1) },
    { kod: "faaliyet", deger: acik.reduce((t, f) => t + f.inanan, 0) },
    { kod: "ogreti", deger: o.inanan },
    { kod: "tanitim", deger: tanitimBuyumesi(state) },
    { kod: "davetci", deger: bon.musteri },
    { kod: "yatkinlik", deger: yatkinlikMusteriBuyumesi(state) },
    { kod: "fanatik", deger: -FANATIK_KACIS_KATSAYI * cm.fanatiklik * o.fanatikKacis },
  ];
  const toplam = kalemler.reduce((t, k) => t + k.deger, 0);
  const ahlak =
    bp.ahlak +
    kitle.ahlak * (kitle.ahlak > 0 ? altC : 1) +
    yp.ahlak * (yp.ahlak > 0 ? yE : 1) +
    acik.reduce((t, f) => t + f.ahlak, 0) +
    o.ahlak -
    aranmaAhlakKaybi(state.suc_seviyesi);
  const otorite = kitle.otorite + o.otorite - FANATIK_OTORITE_KATSAYI * cm.fanatiklik;
  const fanatiklikDegisim = TON_FANATIKLIK[cm.ton] - FANATIK_DOGAL_SONUM;
  return { kalemler, toplam, ahlak, otorite, fanatiklikDegisim };
}

// ── Dini saldırılar ─────────────────────────────────────────────────────────
function diniSaldiriSec(kademe: 1 | 2 | 3, state: CharacterState, fanatiklik: number): DiniSaldiri {
  const agirlik = { ...DINI_SALDIRI_AGIRLIKLARI[kademe] } as Partial<Record<DiniSaldiri, number>>;
  if ((state.ahlak ?? 0) > ENGIZISYON_AHLAK_ESIGI) delete agirlik.engizisyon;
  const carpan = 1 + fanatiklik / 100;
  if (agirlik.bidat) agirlik.bidat *= carpan;
  if (agirlik.aforoz) agirlik.aforoz *= carpan;
  const turler = Object.keys(agirlik) as DiniSaldiri[];
  const toplam = turler.reduce((t, k) => t + (agirlik[k] ?? 0), 0);
  let z = Math.random() * toplam;
  for (const t of turler) {
    z -= agirlik[t] ?? 0;
    if (z < 0) return t;
  }
  return turler[0];
}

// ── Yıllık işleme ───────────────────────────────────────────────────────────
export function cemaatYilIsle(state: CharacterState, b: IsletmeBaglami): IsletmeYilSonucu {
  const is = state.isletme!;
  if (!is.cemaat) is.cemaat = cemaatVarsayilan();
  const cm = is.cemaat;
  const o = ogretiToplami(cm.ogretiler);
  const uyarilar: IsletmeUyari[] = [];
  const eskiMusteri = musteriSayisi(state);
  const oncekiBrut = is.son_dokum ? is.son_dokum.brutKar : cemaatBeklenenKar(state, b);
  const brutTaban = Math.max(0, oncekiBrut);
  let nakitHasar = 0;
  let ekstraGider = 0;

  sureleriKontrolEt(state, uyarilar);
  calisanlariGelistir(state, o.yetenek + OKUL_YETENEK_KADEME * okulKademesi(state));
  calisanMaaslariniGuncelle(state, b.enflasyon);

  // 1. Çalışan sadakati (sızdırma / iç hırsızlık / ayrılma).
  const sadakat = calisanSadakatKontrolleri(state, brutTaban, uyarilar);
  nakitHasar += sadakat.nakitHasar;
  ekstraGider += sadakat.ekstraGider;

  // 2. Gelir ve gider: ayine gelme oranı her yıl yeniden zarlanır.
  const [gmn, gmx] = gelmeAraligi(state);
  const h = cemaatHesapla(state, b, rnd(gmn, gmx));

  // 3. Kapasite taşması: sığmayanlar o an en büyük rakibe geçer (eşiksiz).
  const rakip = aktifRakip(state);
  if (h.tasan > 0.05 && rakip && h.gelmeOrani > 0) {
    const gidenler = h.tasan / h.gelmeOrani;
    const gecen = musteriAktar(state, "oyuncu", rakipGrubu(rakip.ad), gidenler);
    if (gecen > 0.05) uyarilar.push({ kod: "bina_tasti", musteriKaybi: Math.round(gecen * 10) / 10 });
  }

  // 4. Rakip saldırısı (takvim; dini türler).
  const kademe = rakipSaldiriKademesi(pazarPayiHesapla(state));
  const aktifler = aktifRakipler(state);
  if (kademe >= 2 && rakip) rakip.husumet = clamp(rakip.husumet + 3, 0, 100);
  const otoriteKoruma = (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI;
  if (state.rakip_sonraki_saldiri_yili == null) state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
  if (state.yil >= state.rakip_sonraki_saldiri_yili) {
    state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
    if (aktifler.length > 0 && rakip) {
      const kucukler = aktifler.filter((r) => r !== rakip);
      const saldiran = kucukler.length > 0 && Math.random() >= RAKIP_BUYUK_SALDIRI_ORANI ? kucukler[Math.floor(Math.random() * kucukler.length)] : rakip;
      state.rakip_saldiri_son_yil = state.yil;
      const tur = diniSaldiriSec(kademe, state, cm.fanatiklik);
      const sizan = state.ekip.filter((u) => u.rol_turu && u.sadakat < SADAKAT_RISK_ESIGI).sort((x, y) => x.sadakat - y.sadakat)[0];
      const carpan = (saldiran === rakip ? 1 : RAKIP_IKINCI_HASAR_CARPANI) * (sizan ? SIZMA_HASAR_CARPANI : 1) * o.saldiriHasari;
      const uyari: IsletmeUyari = { kod: "rakip_saldiri", sonuc: tur, rakip: saldiran.ad, ...(sizan ? { sizma: true, isim: sizan.isim } : {}) };
      const engel = clamp(korumaHesapla(state).toplam + o.koruma, 0, 0.9);
      if (DINI_FIZIKSEL.includes(tur) && !sizan && Math.random() < engel) {
        uyari.engellendi = true;
      } else {
        const i = kademe - 1;
        if (sizan) sizan.sadakat = Math.max(0, sizan.sadakat - SIZMA_SADAKAT_KAYBI);
        const hasar = DINI_SALDIRI_HASARLARI[tur] as Partial<Record<"nakit" | "inanan" | "sohret" | "ahlak" | "otorite", readonly number[]>>;
        const grup = rakipGrubu(saldiran.ad);
        if (hasar.nakit && hasar.nakit[i] > 0) {
          const yuzde = hasar.nakit[i] * carpan;
          const tutar = r2(brutTaban * (yuzde / 100));
          nakitHasar += tutar;
          uyari.nakitYuzde = Math.round(yuzde);
          uyari.tutar = tutar;
        }
        let inananYuzde = hasar.inanan ? hasar.inanan[i] * carpan : 0;
        if (tur === "aforoz" && (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI) inananYuzde *= 0.5;
        if (inananYuzde > 0) {
          const kayip = musteriAktar(state, "oyuncu", grup, state.meslek_musteri * (inananYuzde / 100));
          uyari.musteriKaybi = Math.round(kayip * 10) / 10;
        }
        if (hasar.sohret && hasar.sohret[i] > 0) {
          const k = hasar.sohret[i] * carpan;
          state.un = Math.max(0, state.un - k);
          uyari.sohretKaybi = Math.round(k * 10) / 10;
        }
        if (hasar.ahlak && hasar.ahlak[i] > 0) {
          const k = hasar.ahlak[i] * carpan;
          state.ahlak = Math.max(0, state.ahlak - k);
          uyari.ahlakKaybi = Math.round(k * 10) / 10;
        }
        if (hasar.otorite && hasar.otorite[i] > 0) {
          let k = hasar.otorite[i] * carpan;
          if (tur === "aforoz" && (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI) k *= 0.5;
          state.yonetim_iliski = Math.max(0, (state.yonetim_iliski ?? 0) - k);
          uyari.otoriteKaybi = Math.round(k * 10) / 10;
        }
      }
      uyarilar.push(uyari);
    }
  }

  // 5. İnanan akışı: sabit destek + yüzdelik büyüme (şöhret, ahlak, politika, faaliyet, öğreti, tanıtım…).
  const etken = cemaatEtkenleri(state);
  const mevcutPay = pazarPayiHesapla(state);
  const vebaKisma = state.veba?.aktif ? VEBA_ARTIS_CARPANI : 1;
  const yuzde = etken.toplam > 0 ? etken.toplam * Math.max(0, 1 - mevcutPay / PAY_DOYMA_ESIGI) * vebaKisma : etken.toplam;
  musteriKaydir(state, "oyuncu", sabitMusteriArtisi(state.yas) * vebaKisma + state.meslek_musteri * yuzde);
  const aranmaKaybi = aranmaMusteriKaybi(state.suc_seviyesi);
  if (aranmaKaybi > 0) musteriKaydir(state, "oyuncu", -state.meslek_musteri * aranmaKaybi);

  // 6. Okul: mezun misyoner.
  const mezunSans = OKUL_MEZUN_SANSI[okulKademesi(state)] + (okulKademesi(state) > 0 ? o.okulMezun : 0);
  if (mezunSans > 0 && Math.random() < mezunSans) {
    const kazanc = state.pazar_musteri * rnd(MEZUN_PAZAR_ARALIK[0], MEZUN_PAZAR_ARALIK[1]);
    musteriKaydir(state, "oyuncu", kazanc);
    cm.mezun_son_yil = state.yil;
    uyarilar.push({ kod: "mezun", musteriKaybi: Math.round(kazanc * 10) / 10 });
    if (Math.random() < MEZUN_ADAY_SANSI && is.adaylar.length < 8) {
      adaylariYenile(state);
    }
  }

  // 7. Ahlak, otorite, fanatiklik.
  state.ahlak = clamp(state.ahlak + etken.ahlak, 0, 100);
  state.yonetim_iliski = clamp((state.yonetim_iliski ?? 0) + etken.otorite, 0, 100);
  cm.fanatiklik = clamp(cm.fanatiklik + etken.fanatiklikDegisim, 0, 100);
  if (cm.fanatiklik > ASIRI_ESIK && (cm.asiri_son_yil == null || state.yil - cm.asiri_son_yil >= ASIRI_COOLDOWN_YIL)) {
    const risk = ((cm.fanatiklik - ASIRI_ESIK) / 300) * o.asiriRisk;
    if (Math.random() < risk) {
      cm.asiri_son_yil = state.yil;
      state.un = Math.max(0, state.un - ASIRI_SOHRET);
      state.yonetim_iliski = Math.max(0, (state.yonetim_iliski ?? 0) - ASIRI_OTORITE);
      if (rakip) musteriAktar(state, "oyuncu", rakipGrubu(rakip.ad), state.meslek_musteri * ASIRI_INANAN);
      else musteriKaydir(state, "oyuncu", -state.meslek_musteri * ASIRI_INANAN);
      uyarilar.push({ kod: "asiri_olay" });
    }
  }

  // 8. Vergi, net.
  const vergi = h.brutKar > 0 ? r2(h.brutKar * h.vergiOrani) : 0;
  const net = r2(h.brutKar - vergi - nakitHasar - ekstraGider);

  // 9. Toplam pazar büyüklüğü (dönem/savaş/veba).
  pazarOlcekle(state, 1 + pazarBuyumeOrani(state));
  const yeniMusteri = musteriSayisi(state);
  ogretiBekleyenSeviye(state);

  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(h.toplamGelir),
    alim: r2(h.faaliyetMasraf + h.ayinMasrafi),
    depoMasrafi: r2(h.binaBakim),
    loncaAidati: r2(h.aidat),
    brutKar: r2(h.brutKar),
    borcOdeme: 0,
    net,
    vergi,
    vergiOrani: h.vergiOrani,
    pazarPayi: Math.round(pazarPayiHesapla(state) * 100),
    musteri: Math.round(yeniMusteri * 10) / 10,
    musteriDegisim: Math.round((yeniMusteri - eskiMusteri) * 10) / 10,
    pazarMusteri: state.pazar_musteri,
    hatlar: [],
    cemaat: {
      gelmeOrani: Math.round(h.gelmeOrani * 100) / 100,
      gelen: Math.round(h.gelen * 10) / 10,
      kapasite: h.kapasite,
      bagis: r2(h.bagis),
      faaliyetler: h.faaliyetler.map((f) => ({ id: f.id, gelir: r2(f.gelir), masraf: r2(f.masraf) })),
      ayinMasrafi: r2(h.ayinMasrafi),
      yardim: r2(h.yardim),
      fanatiklik: Math.round(cm.fanatiklik * 10) / 10,
    },
    uyarilar,
  };
  is.son_dokum = dokum;
  adaylariGerekirseYenile(state);
  return { net, dokum };
}

/** Görünümde Vaiz vb. rol adı için kısa yardımcı (profil yoksa boş). */
export function cemaatRolAdi(state: CharacterState, tur: Parameters<typeof rolAdiGetir>[1]) {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  return profil ? rolAdiGetir(profil, tur) : { tr: tur, en: tur };
}

export { AHLAK_BANTLARI, calisanLimiti };
