import { Kategori } from "../types";

export interface KisilikTanimi {
  ad: string;
  /** Bu özellikle aynı karakterde asla bulunmaması gereken özellikler. */
  celisenler: string[];
  /** Bu özelliğin kategorilere verdiği somut yatkınlık etkisi (oyuncuya gösterilir). */
  etkiler: Partial<Record<Kategori, number>>;
}

export const KISILIKLER: KisilikTanimi[] = [
  { ad: "Sinirli", celisenler: ["Sakin"], etkiler: { savas: 8, sosyal: -10, saglik: -5 } },
  { ad: "Sakin", celisenler: ["Sinirli"], etkiler: { saglik: 8, siyaset: 5, savas: -5 } },
  { ad: "Kibirli", celisenler: ["Vicdanlı"], etkiler: { siyaset: 10, sosyal: -8, din: -8 } },
  { ad: "Alaycı", celisenler: ["Yumuşak Başlı"], etkiler: { siyaset: 5, sosyal: -5, din: -10 } },
  { ad: "Umutlu", celisenler: ["Umutsuz", "Depresif", "Hüzünlü"], etkiler: { saglik: 8, sosyal: 8 } },
  { ad: "Umutsuz", celisenler: ["Umutlu", "Hırslı"], etkiler: { saglik: -10, sosyal: -5 } },
  { ad: "Depresif", celisenler: ["Umutlu", "Hırslı"], etkiler: { saglik: -15, sosyal: -10 } },
  { ad: "Cesur", celisenler: [], etkiler: { savas: 15, siyaset: 5 } },
  { ad: "Hüzünlü", celisenler: ["Umutlu"], etkiler: { din: 8, sosyal: -8 } },
  { ad: "Sosyal", celisenler: ["İçedönük"], etkiler: { sosyal: 15, ticaret: 8 } },
  { ad: "İçedönük", celisenler: ["Sosyal"], etkiler: { sosyal: -15, din: 8 } },
  { ad: "Sivri Dilli", celisenler: ["Yumuşak Başlı"], etkiler: { sosyal: -10, siyaset: 8 } },
  { ad: "Yumuşak Başlı", celisenler: ["Sivri Dilli", "Alaycı"], etkiler: { din: 8, savas: -10, sosyal: 5 } },
  { ad: "Rekabetçi", celisenler: [], etkiler: { ticaret: 10, savas: 8, siyaset: 5 } },
  { ad: "Hırslı", celisenler: ["Umutsuz", "Depresif"], etkiler: { ticaret: 12, siyaset: 10, sosyal: -5 } },
  { ad: "Vicdanlı", celisenler: ["Kibirli"], etkiler: { din: 12, saglik: 5, ticaret: -8 } },
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Birbiriyle çelişmeyen, rastgele ve uyumlu iki kişilik özelliği döndürür. */
export function rastgeleKisilikCifti(): [string, string] {
  const ilk = pickRandom(KISILIKLER);
  const uygunlar = KISILIKLER.filter(
    (k) => k.ad !== ilk.ad && !ilk.celisenler.includes(k.ad) && !k.celisenler.includes(ilk.ad)
  );
  const ikinci = pickRandom(uygunlar);
  return [ilk.ad, ikinci.ad];
}

export function kisilikGetir(ad: string): KisilikTanimi | undefined {
  return KISILIKLER.find((k) => k.ad === ad);
}
