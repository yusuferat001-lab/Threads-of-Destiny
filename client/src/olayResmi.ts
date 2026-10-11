/**
 * Olay illüstrasyonu yardımcıları (`public/assets/olay/<kategori>-<orta-cag|sanayi>.webp`).
 * Hem masaüstü olay kartı (`OlayKartiGovdesi`) hem mobil olay kutusu (`MobilOlayKutusu`) kullanır;
 * bileşen dosyalarından ayrı durur (react-refresh yalnız-bileşen kuralı).
 */

export type OlayResmiDurumu = 'bekliyor' | 'hazir' | 'yok';

/** Aynı resim için her olayda tekrar emoji→resim titremesi olmasın diye bilinen sonuçlar. */
export const OLAY_RESMI_BILINEN = new Map<string, OlayResmiDurumu>();

export function olayCagSlugCikar(cag: string): 'orta-cag' | 'sanayi' {
  return cag === 'Sanayi Devrimi' ? 'sanayi' : 'orta-cag';
}

/** Olay illüstrasyonunun yolu: kategori × çağ başına tek dosya. */
export function olayResmiSrc(kategori: string, cag: string): string {
  return `/assets/olay/${kategori}-${olayCagSlugCikar(cag)}.webp`;
}
