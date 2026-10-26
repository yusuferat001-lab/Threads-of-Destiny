/**
 * Ekstra vergi (şehir yöneticisi): işletmeli mesleklerde (Tüccar, Zanaatkâr, Din Adamı) kâr
 * eşiği aşılınca 8-9 yılda bir yönetici, son yılın brüt kârının 2-3 katını ister. Oyuncu öder
 * ya da rüşvet verir; karar vermezse süre dolunca tutar otomatik tahsil edilir.
 * Tüm sayılar tek yerde (oyuncuya GÖSTERİLMEZ, yalnız talep tutarı görünür).
 */

/** Takvim: bir sonraki talebin en erken yılı = bugün + [min, max] (eşit olasılık). */
export const EKSTRA_VERGI_ARALIK_YIL: [number, number] = [8, 9];

/** Talep, son yılın brüt kârı bu eşiğin (× enflasyon çarpanı) üstündeyse üretilir. */
export const EKSTRA_VERGI_KAR_ESIGI = 50;

/** Tutar = brüt kâr × çarpan. Çarpan 2-3 arası rastgele; ilişki iyiyse alt uca, kötüyse üst uca iner. */
export const EKSTRA_VERGI_CARPAN_ARALIK: [number, number] = [2, 3];
export const EKSTRA_VERGI_IYI_ILISKI = 70;
export const EKSTRA_VERGI_KOTU_ILISKI = 25;

/** Talep süresi (yıl). Dolunca tutar otomatik tahsil edilir. */
export const EKSTRA_VERGI_SURE_YIL = 2;

/** Ödeme: ilişki kazancı. */
export const EKSTRA_VERGI_ODEME_ILISKI = 4;

/** Rüşvet: peşin bedel (tutarın oranı), başarı şansı, başarısızlıkta ilişki kaybı, ahlak bedeli. */
export const EKSTRA_VERGI_RUSVET_BEDEL_ORANI = 0.35;
export const EKSTRA_VERGI_RUSVET_SANS = 0.65;
export const EKSTRA_VERGI_RUSVET_BASARISIZ_ILISKI = 10;
export const EKSTRA_VERGI_RUSVET_AHLAK = 5;

export function ekstraVergiSonrakiYil(yil: number, rnd: () => number = Math.random): number {
  const [a, b] = EKSTRA_VERGI_ARALIK_YIL;
  return yil + a + Math.floor(rnd() * (b - a + 1));
}

/** Talep çarpanı: iyi ilişki alt uç (2), kötü ilişki üst uç (3), arası rastgele. */
export function ekstraVergiCarpani(yonetimIliski: number, rnd: () => number = Math.random): number {
  const [a, b] = EKSTRA_VERGI_CARPAN_ARALIK;
  if (yonetimIliski >= EKSTRA_VERGI_IYI_ILISKI) return a;
  if (yonetimIliski < EKSTRA_VERGI_KOTU_ILISKI) return b;
  return a + rnd() * (b - a);
}
