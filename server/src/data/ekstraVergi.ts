/**
 * Ekstra vergi (şehir yöneticisi): işletmeli mesleklerde (Tüccar, Zanaatkâr, Din Adamı) kâr
 * eşiği aşılınca ilk kez 32 yaşında, sonra 9-13 yılda bir yönetici, son yılın brüt kârının 1 katını ister. Oyuncu öder
 * ya da rüşvet verir; yanıtlamadan oyun ilerlemez (zorunlu pencere), süre sınırı yoktur.
 * Tüm sayılar tek yerde (oyuncuya GÖSTERİLMEZ, yalnız talep tutarı görünür).
 */

/** İlk talep bu yaşta gelir (daha büyükse ilk talep de aşağıdaki aralıkla planlanır). */
export const EKSTRA_VERGI_ILK_YAS = 32;

/** Takvim: sonraki talebin en erken yılı = bugün + [min, max] (eşit olasılık). */
export const EKSTRA_VERGI_ARALIK_YIL: [number, number] = [9, 13];

/** Talep, son yılın brüt kârı bu eşiğin (× enflasyon çarpanı) üstündeyse üretilir. */
export const EKSTRA_VERGI_KAR_ESIGI = 40;

/** Tutar = brüt kâr × çarpan. Çarpan 1x (alt=üst; ilişki ayrımı yapılırsa aralık açılabilir). */
export const EKSTRA_VERGI_CARPAN_ARALIK: [number, number] = [1, 1];
export const EKSTRA_VERGI_IYI_ILISKI = 70;
export const EKSTRA_VERGI_KOTU_ILISKI = 25;

/** Talebin süresi yoktur: oyuncu yanıtlayana dek oyun ilerlemez (`sonYil` yalnız tip uyumu için bu değeri taşır). */
export const EKSTRA_VERGI_SONSUZ_YIL = 99999;

/** Bekleyen ekstra vergi talebi var mı? (zorunlu pencere; zaman ilerleten yollar bu iken reddedilir.) */
export function vergiBekliyorMu(state: { yonetim_talep?: { tur: string } | null }): boolean {
  return state.yonetim_talep?.tur === "vergi";
}

/** Ödeme: ilişki kazancı. */
export const EKSTRA_VERGI_ODEME_ILISKI = 4;

/** Rüşvet: peşin bedel (tutarın oranı), başarı şansı, başarısızlıkta ilişki kaybı, ahlak bedeli. */
export const EKSTRA_VERGI_RUSVET_BEDEL_ORANI = 0.35;
export const EKSTRA_VERGI_RUSVET_SANS = 0.65;
export const EKSTRA_VERGI_RUSVET_BASARISIZ_ILISKI = 10;
export const EKSTRA_VERGI_RUSVET_AHLAK = 5;

/** İlk talep yılı: 32 yaşına gelinen yıl; karakter zaten 32'yi geçtiyse bugün + aralık. */
export function ekstraVergiIlkYil(yil: number, yas: number, rnd: () => number = Math.random): number {
  return yas < EKSTRA_VERGI_ILK_YAS ? yil + (EKSTRA_VERGI_ILK_YAS - yas) : ekstraVergiSonrakiYil(yil, rnd);
}

export function ekstraVergiSonrakiYil(yil: number, rnd: () => number = Math.random): number {
  const [a, b] = EKSTRA_VERGI_ARALIK_YIL;
  return yil + a + Math.floor(rnd() * (b - a + 1));
}

/** Talep çarpanı: iyi ilişki alt uç, kötü ilişki üst uç, arası rastgele (şu an alt=üst=1). */
export function ekstraVergiCarpani(yonetimIliski: number, rnd: () => number = Math.random): number {
  const [a, b] = EKSTRA_VERGI_CARPAN_ARALIK;
  if (yonetimIliski >= EKSTRA_VERGI_IYI_ILISKI) return a;
  if (yonetimIliski < EKSTRA_VERGI_KOTU_ILISKI) return b;
  return a + rnd() * (b - a);
}
