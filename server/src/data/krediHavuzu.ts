/**
 * Tefeci kredi havuzu (v8.3): tefeci aynı anda yalnız KREDI_TEKLIF_SAYISI (2) teklif sunar; teklifler
 * bu havuzdan rastgele seçilir ve KREDI_TEKLIF_YENILEME_YIL yılda bir (ya da kredi alınınca) yenilenir.
 * Her teklifin tutarı, faizi ve vadesi (yıl) farklıdır; kısa vade = daha yüksek faiz. Tutarlar enflasyonsuz
 * taban değerdir, `enflasyonCarpani` ile büyür. Geri ödeme eşit yıllık taksittir (annüite).
 */
export interface KrediHavuzTanimi {
  id: string;
  /** Enflasyonsuz taban tutar. */
  tutar: number;
  /** Yıllık faiz (kesir). Borçlu / suçlu / düşük ahlaklı oyuncuya tefeci ek faiz bindirir. */
  faiz: number;
  /** Vade (yıl). */
  vade: number;
  ad: { tr: string; en: string };
}

export const KREDI_HAVUZU: KrediHavuzTanimi[] = [
  { id: "kisa_kucuk", tutar: 39, faiz: 0.13, vade: 3, ad: { tr: "Kısa vadeli küçük kese", en: "Short-term small purse" } },
  { id: "uzun_kucuk", tutar: 45, faiz: 0.09, vade: 6, ad: { tr: "Uzun vadeli küçük kese", en: "Long-term small purse" } },
  { id: "kisa_orta", tutar: 78, faiz: 0.16, vade: 4, ad: { tr: "Kısa vadeli orta kese", en: "Short-term medium purse" } },
  { id: "uzun_orta", tutar: 90, faiz: 0.10, vade: 7, ad: { tr: "Uzun vadeli orta kese", en: "Long-term medium purse" } },
  { id: "kisa_buyuk", tutar: 134, faiz: 0.18, vade: 5, ad: { tr: "Kısa vadeli büyük kese", en: "Short-term large purse" } },
  { id: "uzun_buyuk", tutar: 151, faiz: 0.12, vade: 7, ad: { tr: "Uzun vadeli büyük kese", en: "Long-term large purse" } },
];

export const KREDI_TEKLIF_SAYISI = 2;
export const KREDI_TEKLIF_YENILEME_YIL = 3;

export function krediHavuzTanimi(id: string): KrediHavuzTanimi | undefined {
  return KREDI_HAVUZU.find((k) => k.id === id);
}

/** Eşit yıllık taksit (annüite): P·r / (1 − (1+r)^−n). */
export function annuiteTaksit(anapara: number, faiz: number, vade: number): number {
  const n = Math.max(1, Math.round(vade));
  if (faiz <= 0) return anapara / n;
  return (anapara * faiz) / (1 - Math.pow(1 + faiz, -n));
}
