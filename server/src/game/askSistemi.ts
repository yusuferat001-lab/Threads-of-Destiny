// Aşk evliliği yolu: tanışma diyaloğu → sevgili → (evlilik teklifi → düğün, aileSistemi.dugunYap).
// Tüm sayılar data/aileSabitleri.ts, tüm metinler data/tanismaDiyalog.ts'te.

import { AileHuy, AktifTanisma, CharacterState, Sevgili, TanismaAdayi, TanismaYaklasim } from "../types";
import { T } from "../i18n";
import {
  clampStats,
  enflasyonCarpani,
  etiketEkle,
  hayatOlayiEkle,
  MESLEKLER,
  paraYuvarla,
} from "./stateManager";
import { rutbeTanimiGetir } from "../data/rutbeler";
import { rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { SOSYALLESME_YERLERI, sosyallesmeYeriUygunMu } from "../data/sosyallesmeYerleri";
import * as S from "../data/aileSabitleri";
import * as D from "../data/tanismaDiyalog";
import { esBarDusur, yasDonemindeMi } from "./aileSistemi";

function aralik(a: number, b: number): number {
  return a + Math.floor(Math.random() * (b - a + 1));
}
function sinirla(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function ondalik1(x: number): number {
  return Math.round(x * 10) / 10;
}
function cevir(dil: string, metin: D.IkiDil, ad: string): string {
  return (dil === "en" ? metin.en : metin.tr).replace(/\{0\}/g, ad);
}

// ---------- uygunluk ----------
/** Bekar mı: eş, sevgili, süren tanışma ya da bekleyen düğün yok. */
export function bekarMi(state: CharacterState): boolean {
  return !state.es_adi && !state.sevgili && !state.aktif_tanisma && !state.bekleyen_dugun;
}

/** Bir tanışma şu an başlatılabilir mi (hata fırlatmaz). Evli karakter de tanışabilir (sonuç: aldatma riski). */
export function tanismaBaslatilabilirMi(state: CharacterState): boolean {
  return (
    state.aktif &&
    state.yas >= 18 &&
    !state.sevgili &&
    !state.aktif_tanisma &&
    !state.bekleyen_dugun &&
    !yasDonemindeMi(state) &&
    !["hapiste", "yolculukta", "kacak", "veba_hastasi"].some((e) => state.etiketler.includes(e))
  );
}

const TANISMA_YASANDI_ONEK = "tanisma_yasandi:";

/**
 * Zorunlu tanışma fırsatı (25 ve 40 yaş dönümleri): her karakter ömründe TAM 2 fırsat görür.
 * Dönüm gelince fırsat her zaman zorlanır; hapis/yolculuk/kaçak/veba/yas gibi bir kilit varsa
 * (etiket işaretlenmez) kilit bitince ilk boş turda ertelenir. Zaten sevgilisi, süren tanışması
 * ya da bekleyen düğünü olan karakterde dönüm kullanılmış sayılır (etiket işaretlenir, zorlanmaz).
 */
export function tanismaDonumEtiketi(state: CharacterState): { etiket: string; zorla: boolean } | null {
  for (const yas of S.TANISMA_DONUMLERI) {
    const etiket = `tanisma_donum_${yas}`;
    if (state.yas >= yas && !state.etiketler.includes(etiket)) {
      if (state.sevgili || state.aktif_tanisma || state.bekleyen_dugun) return { etiket, zorla: false };
      if (!tanismaBaslatilabilirMi(state)) return null;
      return { etiket, zorla: true };
    }
  }
  return null;
}

/** Evli karakter tanışmadan vazgeçerse sadakat ödülü (ahlak + eş barı). */
export function sadakatOdulu(state: CharacterState): void {
  state.ahlak += S.SADAKAT_AHLAK;
  if (state.es_adi) state.es_puani = Math.min(100, state.es_puani + S.SADAKAT_BAR);
}

// ---------- aday ve tanışma ----------
function adayYasi(state: CharacterState): number {
  const fark = state.yas <= 30 ? aralik(-4, 4) : aralik(-8, 4);
  return Math.max(18, state.yas + fark);
}

export function tanismaAdayiUret(state: CharacterState): TanismaAdayi {
  const meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
  const rutbeTanimi = rutbeTanimiGetir(meslek, state.cag, state.din_kultur);
  const rutbe = rutbeTanimi ? rutbeTanimi.unvanlar[Math.floor(Math.random() * rutbeTanimi.unvanlar.length)] : meslek;
  const disari = [state.dost_adi, state.rakip_adi, state.es_adi ?? "", state.isim ?? ""].filter(Boolean);
  const isim = rastgeleCinsiyetliIsimSec(state.cag, state.bolge, "kadin", disari);
  const havuz: AileHuy[] = [...S.HUYLAR];
  const ilk = havuz.splice(Math.floor(Math.random() * havuz.length), 1)[0];
  const ikinci = havuz[Math.floor(Math.random() * havuz.length)];
  return {
    isim,
    meslek,
    rutbe,
    yas: adayYasi(state),
    huylar: [ilk, ikinci],
    gorunum: Math.floor(Math.random() * D.GORUNUM.length),
  };
}

/** Oyuncuya uygun, mümkünse pazar olmayan rastgele bir mekân (olay mekânı yoksa pazar). */
export function tanismaMekanSec(state: CharacterState): string {
  const uygun = SOSYALLESME_YERLERI.filter((y) => sosyallesmeYeriUygunMu(y, state.cag, state.bolge, state.meslek));
  if (uygun.length === 0) return "pazar_meydani";
  return uygun[Math.floor(Math.random() * uygun.length)].id;
}

function adimYaklasimlari(): TanismaYaklasim[] {
  const havuz = [...D.YAKLASIMLAR];
  const secilen: TanismaYaklasim[] = [];
  while (secilen.length < 3) secilen.push(havuz.splice(Math.floor(Math.random() * havuz.length), 1)[0]);
  return secilen;
}

/** Yeni bir tanışma kurar (0. adım: göz göze). */
export function tanismaBaslat(state: CharacterState, mekanId: string): AktifTanisma {
  if (!tanismaBaslatilabilirMi(state)) throw new Error("Şu an biriyle tanışacak durumda değilsin.");
  const tanisma: AktifTanisma = {
    mekan: mekanId,
    aday: tanismaAdayiUret(state),
    adim: 0,
    toplam: aralik(...S.TANISMA_ADIM_ARALIK),
    basari: 0,
    yaklasimlar: [],
    son_tepki: null,
  };
  state.aktif_tanisma = tanisma;
  etiketEkle(state, [`${TANISMA_YASANDI_ONEK}${state.yas}`]);
  return tanisma;
}

/** Göz göze gelme anında "yanına git": diyaloğun 1. adımı açılır. */
export function tanismaYaklas(state: CharacterState): void {
  const t = state.aktif_tanisma;
  if (!t) throw new Error("Süren bir tanışma yok.");
  if (t.adim !== 0) throw new Error("Zaten yanına gittin.");
  t.adim = 1;
  t.yaklasimlar = adimYaklasimlari();
}

/** Vazgeç: aday silinir (evliyse sadakat ödülü). */
export function tanismaVazgec(state: CharacterState): string {
  const t = state.aktif_tanisma;
  if (!t) throw new Error("Süren bir tanışma yok.");
  state.aktif_tanisma = null;
  if (state.es_adi) {
    sadakatOdulu(state);
    return cevir(state.dil, D.SONUC_SADAKAT, t.aday.isim);
  }
  return cevir(state.dil, D.SONUC_VAZGECILDI, t.aday.isim);
}

/** Bir adımın başarı şansı (%): temel + huy eşleşmesi/uyumsuzluğu + oyuncunun şöhret/morali. */
export function tanismaAdimSansi(state: CharacterState, aday: TanismaAdayi, yaklasim: TanismaYaklasim): number {
  let sans = S.TANISMA_BAZ_SANS;
  for (const huy of aday.huylar) {
    if (D.HUY_SEVER[huy] === yaklasim) sans += S.TANISMA_ESLESME_BONUSU;
    if (D.HUY_SEVMEZ[huy] === yaklasim) sans -= S.TANISMA_UYUMSUZLUK_CEZASI;
  }
  sans += sinirla(Math.round((state.un - 20) / 10), -5, 5) + sinirla(Math.round((state.mutluluk - 50) / 10), -4, 4);
  return sinirla(sans, ...S.TANISMA_SANS_ARALIK);
}

type Eslesme = "sever" | "sevmez" | "yok";
function eslesme(aday: TanismaAdayi, yaklasim: TanismaYaklasim): Eslesme {
  if (aday.huylar.some((h) => D.HUY_SEVER[h] === yaklasim)) return "sever";
  if (aday.huylar.some((h) => D.HUY_SEVMEZ[h] === yaklasim)) return "sevmez";
  return "yok";
}

/** Tepki tonu: başarı + eşleşmeye göre, bilerek biraz gürültülü (oyuncu metinden çıkarım yapar). */
export function tepkiTonu(basarili: boolean, e: Eslesme): "olumlu" | "notr" | "soguk" {
  const r = Math.random();
  if (basarili) {
    if (e === "sever") return r < 0.8 ? "olumlu" : "notr";
    if (e === "sevmez") return "notr";
    return r < 0.6 ? "notr" : "olumlu";
  }
  if (e === "sevmez") return "soguk";
  if (e === "sever") return r < 0.8 ? "notr" : "soguk";
  return r < 0.7 ? "soguk" : "notr";
}

export interface TanismaAdimSonucu {
  bitti: boolean;
  basarili: boolean | null;
  /** Bu adımın tepki metni (oyuncunun diline çevrilmiş). */
  tepki: string;
  /** Biten tanışmada sonuç cümlesi. */
  mesaj: string | null;
  aday: TanismaAdayi;
}

export function tepkiMetniUret(dil: string, aday: TanismaAdayi, son: NonNullable<AktifTanisma["son_tepki"]>): string {
  const liste = D.TEPKI[son.yaklasim][son.ton];
  return cevir(dil, liste[son.varyant % liste.length], aday.isim);
}

/** Aktif adımdaki `secenekIndex`'inci yaklaşımı uygular; son adımdaysa tanışmayı sonuçlandırır. */
export function tanismaSec(state: CharacterState, secenekIndex: number): TanismaAdimSonucu {
  const t = state.aktif_tanisma;
  if (!t) throw new Error("Süren bir tanışma yok.");
  if (t.adim < 1) throw new Error("Önce yanına gitmelisin.");
  const yaklasim = t.yaklasimlar[secenekIndex];
  if (!yaklasim) throw new Error("Geçersiz seçenek.");

  const sans = tanismaAdimSansi(state, t.aday, yaklasim);
  const basarili = Math.random() * 100 < sans;
  if (basarili) t.basari += 1;
  const son = { yaklasim, ton: tepkiTonu(basarili, eslesme(t.aday, yaklasim)), varyant: aralik(0, 1) };
  t.son_tepki = son;
  const tepki = tepkiMetniUret(state.dil, t.aday, son);
  const aday = t.aday;

  if (t.adim < t.toplam) {
    t.adim += 1;
    t.yaklasimlar = adimYaklasimlari();
    return { bitti: false, basarili: null, tepki, mesaj: null, aday };
  }

  // Son adım: sonuç.
  const kabul = t.basari >= t.toplam - S.TANISMA_TOLERANS;
  state.aktif_tanisma = null;
  if (kabul && state.es_adi) {
    // Evliyken kabul = aldatma: sevgili oluşmaz, eş barı/ahlak düşer, %40 ifşa olur.
    esBarDusur(state, S.ALDATMA_BAR_CEZASI);
    state.ahlak += S.ALDATMA_AHLAK;
    state.mutluluk += S.ALDATMA_MUTLULUK;
    hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile gizli bir yakınlaşma yaşadı", [aday.isim]));
    let mesaj = cevir(state.dil, D.SONUC_ALDATMA, aday.isim);
    if (Math.random() < S.ALDATMA_IFSA_SANSI) {
      esBarDusur(state, S.ALDATMA_IFSA_BAR);
      state.un += S.ALDATMA_IFSA_SOHRET;
      mesaj += " " + cevir(state.dil, D.SONUC_ALDATMA_IFSA, state.es_adi ?? "");
    }
    return { bitti: true, basarili: false, tepki, mesaj, aday };
  }
  if (kabul) {
    const sevgili: Sevgili = {
      isim: aday.isim,
      meslek: aday.meslek,
      rutbe: aday.rutbe,
      dogum_yili: state.yil - aday.yas,
      huylar: [...aday.huylar] as [AileHuy, AileHuy],
      iliski: aralik(...S.SEVGILI_BASLANGIC_BAR),
      baslangic_yili: state.yil,
      son_yil: state.yil + S.SEVGILI_SURE_YIL,
      darildi: false,
      darilma_yili: null,
      gonul_kilit_yili: 0,
      meslek_bonusu: ondalik1(S.MESLEK_BONUSU_GENC * S.ASK_BONUS_ORANI),
    };
    state.sevgili = sevgili;
    hayatOlayiEkle(state, "💞", T(state.dil, "{0} ile sevgili oldu", [aday.isim]));
  }
  return {
    bitti: true,
    basarili: kabul,
    tepki,
    mesaj: cevir(state.dil, kabul ? D.SONUC_BASARILI : D.SONUC_BASARISIZ, aday.isim),
    aday,
  };
}

// ---------- sevgili ----------
export function sevgiliKontrolEt(state: CharacterState): Sevgili {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (!state.sevgili) throw new Error("Bir sevgilin yok.");
  return state.sevgili;
}

export function gonulAlMaliyeti(state: CharacterState): number {
  return Math.max(1, paraYuvarla(S.GONUL_AL_MALIYET * enflasyonCarpani(state)));
}

/** Gönül al: bedel öder, dargınlığı giderir, barı toparlar ve evlilik teklifi süresini uzatır. */
export function gonulAl(state: CharacterState): { maliyet: number } {
  const s = sevgiliKontrolEt(state);
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken ailenle ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken ailenle ilgilenemezsin.");
  if (state.yil < s.gonul_kilit_yili) throw new Error("Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.");
  const maliyet = gonulAlMaliyeti(state);
  if (state.para < maliyet) throw new Error("Bunu karşılayacak paran yok.");
  state.para = paraYuvarla(state.para - maliyet);
  s.darildi = false;
  s.darilma_yili = null;
  s.iliski = sinirla(s.iliski + S.GONUL_AL_BAR_ARTISI, 0, 100);
  s.son_yil = Math.max(s.son_yil, state.yil) + S.GONUL_AL_UZATMA_YIL;
  s.gonul_kilit_yili = state.yil + S.GONUL_AL_BEKLEME_YIL;
  state.mutluluk += 2;
  clampStats(state);
  return { maliyet };
}

/** Evlilik teklifi şansı (%): bar − 10, 20-95 arası. */
export function sevgiliTeklifSansi(s: Sevgili): number {
  return sinirla(s.iliski - S.ASK_TEKLIF_BAR_DUSUSU, ...S.ASK_TEKLIF_SANS_ARALIK);
}

/** Sevgiliye evlilik teklifi. Kabulde düğün (bütçe seçimi) beklenir; red → bar kaybı. */
export function sevgiliTeklifEt(state: CharacterState): { kabul: boolean; isim: string } {
  const s = sevgiliKontrolEt(state);
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken evlenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken evlenemezsin.");
  if (state.bekleyen_dugun) throw new Error("Bekleyen bir düğün var; önce onu tamamla.");
  const kabul = Math.random() * 100 < sevgiliTeklifSansi(s);
  const isim = s.isim;
  if (kabul) {
    const yas = Math.max(18, state.yil - s.dogum_yili);
    state.bekleyen_dugun = {
      isim: s.isim,
      meslek: s.meslek,
      rutbe: s.rutbe,
      yas,
      grup: yas >= S.ADAY_OLGUN_YAS[0] ? "olgun" : "genc",
      huylar: [...s.huylar] as [AileHuy, AileHuy],
      ceyiz: 0,
      meslek_bonusu: s.meslek_bonusu,
      tur: "ask",
    };
    state.sevgili = null;
  } else {
    s.iliski = Math.max(0, s.iliski - S.ASK_TEKLIF_RED_BAR_KAYBI);
  }
  return { kabul, isim };
}

/** Sevgiliden ayrıl. */
export function sevgiliAyril(state: CharacterState): string {
  const s = sevgiliKontrolEt(state);
  state.sevgili = null;
  state.mutluluk -= 3;
  hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile yolları ayrıldı", [s.isim]));
  clampStats(state);
  return s.isim;
}

/** Sevgili yıllık mantığı: gizli −1, bar çok düşerse ayrılma, 4 yıl dolunca darılma, darginlik sürerse ayrılma. */
export function sevgiliYillikUygula(state: CharacterState, yasArtisi: number): string[] {
  const mesajlar: string[] = [];
  const ilkYil = state.yil - yasArtisi + 1;
  for (let i = 0; i < yasArtisi; i++) {
    const s = state.sevgili;
    if (!s) break;
    const y = ilkYil + i;
    s.iliski = Math.max(0, s.iliski - S.GIZLI_YILLIK_DUSUS);
    if (!s.darildi && y >= s.son_yil) {
      s.darildi = true;
      s.darilma_yili = y;
      s.iliski = Math.max(0, s.iliski - S.SEVGILI_DARILMA_BAR_KAYBI);
      mesajlar.push(T(state.dil, "💢 {0} evlilik teklifi beklemekten yoruldu ve sana darıldı. Gönlünü almazsan bu ilişki bitebilir.", [s.isim]));
      continue;
    }
    const ayril =
      s.iliski < S.SEVGILI_AYRILMA_ESIGI ||
      (s.darildi && s.darilma_yili != null && y >= s.darilma_yili + S.SEVGILI_DARGIN_SURE_YIL);
    if (ayril) {
      state.sevgili = null;
      state.mutluluk -= 3;
      hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile yolları ayrıldı", [s.isim]));
      mesajlar.push(T(state.dil, "💔 {0} seni terk etti. Bu ilişkiyi ayakta tutamadın.", [s.isim]));
    }
  }
  return mesajlar;
}

/** Etiket işaretleme yardımcısı (zorunlu tanışma fırsatı verilince). */
export function tanismaDonumunuIsaretle(state: CharacterState, etiket: string): void {
  etiketEkle(state, [etiket]);
}
