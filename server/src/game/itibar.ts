import type { CharacterState } from "../types";
import type { UrunBonusu } from "../data/meslekProfilleri";
import { yatirimKademesi } from "./isletme";

/**
 * Tüccar "Güven" / Zanaatkâr "Ustalık" ekseni (0-100, tarafsız 50). Asker moral/talim ve Din cemaat eksenlerinin karşılığı.
 * Tarafsız noktada hiçbir etkisi yoktur (mevcut denge bozulmaz); iyi iş yaptıkça yükselir, üst sınırı Hesap/Usta Odası yatırımı belirler.
 */
export const ITIBAR_BASLANGIC = 50;
const ITIBAR_NOTR = 50;
/** Yatırım kademesine (0-4) göre üst sınır ve yatırımın yıllık katkısı. */
export const ITIBAR_UST = [60, 70, 80, 90, 100];
export const ITIBAR_YATIRIM_YILLIK = [0, 0.5, 1, 1.5, 2];
/** Her yıl tarafsız noktaya doğru çekim (itibar bakım ister). */
const DOGAL_CEKIM = 0.08;
/** Karşılanamayan talep oranı: bu eşiğin altı iyi hizmet, üstü kötü hizmet. */
const KARSILAMA_IYI_ESIK = 0.05;
const KARSILAMA_KOTU_ESIK = 0.15;
const KARSILAMA_IYI = 1.5;
const KARSILAMA_KOTU = -2;
/** Karanlık iş çevirmenin bedeli. */
export const ITIBAR_KOTU_IS = 3;
/** Tarafsızdan en uzak noktada (0 ya da 100) etki: Tüccar talebi, Zanaatkâr fiyatı. */
const TUCCAR_TALEP_ETKISI = 0.05;
const ZANAATKAR_FIYAT_ETKISI = 0.04;

export const ITIBAR_ADI = {
  Tüccar: { tr: "Güven", en: "Trust" },
  Zanaatkâr: { tr: "Ustalık", en: "Mastery" },
} as const;

export function itibarVarMi(state: CharacterState): boolean {
  return !!state.isletme && (state.meslek === "Tüccar" || state.meslek === "Zanaatkâr");
}

export function itibarDegeri(state: CharacterState): number {
  return state.isletme?.itibar ?? ITIBAR_BASLANGIC;
}

export function itibarUstLimit(state: CharacterState): number {
  return ITIBAR_UST[Math.min(yatirimKademesi(state, "itibar"), ITIBAR_UST.length - 1)];
}

/** Tek seferlik değişim (karanlık iş, sipariş, icat…); 0-100 arasında kalır, üst sınırı da aşmaz. */
export function itibarEkle(state: CharacterState, delta: number): void {
  if (!itibarVarMi(state)) return;
  const is = state.isletme!;
  const simdi = itibarDegeri(state);
  const yeni = Math.max(0, Math.min(100, simdi + delta));
  is.itibar = delta > 0 ? Math.min(yeni, Math.max(itibarUstLimit(state), simdi)) : yeni;
}

/** Yıllık değişim (tarafsıza çekim + hizmet kalitesi + yatırım); yıl işleme ve "gelecek yıl" önizlemesi aynı fonksiyonu kullanır. */
export function itibarYillikDegisim(state: CharacterState, karsilanamayanOrani: number): number {
  const simdi = itibarDegeri(state);
  const hizmet = karsilanamayanOrani <= KARSILAMA_IYI_ESIK ? KARSILAMA_IYI : karsilanamayanOrani > KARSILAMA_KOTU_ESIK ? KARSILAMA_KOTU : 0;
  const yatirim = ITIBAR_YATIRIM_YILLIK[Math.min(yatirimKademesi(state, "itibar"), ITIBAR_YATIRIM_YILLIK.length - 1)];
  const toplam = (ITIBAR_NOTR - simdi) * DOGAL_CEKIM + hizmet + yatirim;
  const yeni = Math.max(0, Math.min(100, simdi + toplam));
  const sinirli = toplam > 0 ? Math.min(yeni, Math.max(itibarUstLimit(state), simdi)) : yeni;
  return sinirli - simdi;
}

export function itibarYilSonu(state: CharacterState, karsilanamayanOrani: number): void {
  if (!itibarVarMi(state)) return;
  state.isletme!.itibar = itibarDegeri(state) + itibarYillikDegisim(state, karsilanamayanOrani);
}

/** Tüccar: talep; Zanaatkâr: satış fiyatı. Tarafsız noktada etki yok (null). */
export function itibarBonusu(state: CharacterState): UrunBonusu | null {
  if (!itibarVarMi(state)) return null;
  const k = (itibarDegeri(state) - ITIBAR_NOTR) / ITIBAR_NOTR;
  if (k === 0) return null;
  return state.meslek === "Tüccar" ? { talepCarpani: 1 + TUCCAR_TALEP_ETKISI * k } : { satisCarpani: 1 + ZANAATKAR_FIYAT_ETKISI * k };
}
