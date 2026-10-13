/**
 * Kariyer sayfasındaki iki ilişki hattının (yönetici + patron) görünen kişileri (§35).
 * Hem motor (gameEngine) hem yıllık pasif işlem (stateManager — talep süresi dolunca
 * yazılan mesaj) aynı ismi kullansın diye ayrı bir modülde.
 */
import type { CharacterState } from "../types";
import { K, Khukumdar } from "../i18n";
import { otoriteUnvaniGetir } from "../data/meslekProfilleri";

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

export function yoneticiBilgisi(state: CharacterState): { unvan: string; ad: string } {
  if (state.hukumdar) return { unvan: K(state.dil, "Hükümdar"), ad: Khukumdar(state.dil, state.hukumdar) };
  const unvan = state.cag === "Sanayi Devrimi" ? "Vali" : "Bölge Beyi";
  return { unvan: K(state.dil, unvan), ad: yonetimDeterministikIsim(state.id, 7) };
}

/** Tek otorite (§45): adı meslek × çağ × ülke/dine göre değişir; kral yalnız hükümdar adı olarak kalır. */
export function patronBilgisi(state: CharacterState): { unvan: string; ad: string } {
  const sanayi = state.cag === "Sanayi Devrimi";
  let unvan = otoriteUnvaniGetir(state.meslek, state.cag, state.bolge);
  // Din Adamı'nda din kültürü ülkeden baskındır (ör. Sünni → Kadı/Müftü, Ortodoks → Metropolit).
  if (state.meslek === "Din Adamı") {
    if (state.din_kultur === "Sünni İslam") unvan = sanayi ? "Müftü" : "Kadı";
    else if (state.din_kultur === "Ortodoks") unvan = "Metropolit";
    else unvan = "Piskopos";
  }
  if (!unvan) unvan = sanayi ? "Patron" : "Usta";
  return { unvan: K(state.dil, unvan), ad: yonetimDeterministikIsim(state.id, 19) };
}
