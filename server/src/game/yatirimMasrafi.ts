import type { CharacterState } from "../types";
import { isletmeProfiliGetir } from "../data/meslekProfilleri";

/**
 * Yatırım yıllık masrafı (v14): alınan her kademenin fiyatının %2'si yılda bir "dükkân giderine" biner.
 * Depo ve ibadethane kendi bakımını zaten öder (DEPO_BAKIM / BINA_BAKIM), bu yüzden burada sayılmaz.
 * Bu modül isletme.ts ve cemaat.ts tarafından ortak okunur (aralarındaki döngüsel içe aktarmayı önlemek için ayrı dosya).
 */
export const YATIRIM_MASRAF_ORANI = 0.02;
const BAKIMI_AYRI_OLANLAR = new Set(["depo", "bina"]);

/** Bir yatırımın verilen kademeye kadar alınmış kademelerinin toplam fiyatı (enflasyonsuz). */
export function yatirimToplamFiyati(fiyatlar: number[], kademe: number): number {
  let t = 0;
  for (let i = 0; i < Math.min(Math.max(0, Math.floor(kademe)), fiyatlar.length); i++) t += fiyatlar[i];
  return t;
}

/** Bir kademe daha alınırsa yıllık masrafın artacağı tutar (kart ipucu için). */
export function yatirimKademeMasrafi(fiyatlar: number[], kademe: number, enflasyon: number): number {
  const f = fiyatlar[Math.max(0, Math.floor(kademe))];
  return f === undefined ? 0 : Math.round(f * YATIRIM_MASRAF_ORANI * enflasyon * 100) / 100;
}

/** Sahip olunan tüm yatırım kademelerinin yıllık masrafı (depo/bina hariç), gider enflasyonuyla çarpılmış. */
export function yatirimYillikMasrafi(state: CharacterState, giderEnflasyon: number): number {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  const is = state.isletme;
  if (!profil || !is) return 0;
  let toplam = 0;
  for (const y of profil.yatirimlar) {
    if (BAKIMI_AYRI_OLANLAR.has(y.id)) continue;
    toplam += yatirimToplamFiyati(y.fiyatlar, is.yatirimlar[y.id] ?? 0);
  }
  return Math.round(toplam * YATIRIM_MASRAF_ORANI * giderEnflasyon * 100) / 100;
}
