/**
 * Olay illüstrasyonu yardımcıları (`public/assets/olay/<anahtar>-<orta-cag|sanayi>.webp`).
 * Hem masaüstü olay kartı (`OlayKartiGovdesi`) hem mobil olay kutusu (`MobilOlayKutusu`) kullanır;
 * bileşen dosyalarından ayrı durur (react-refresh yalnız-bileşen kuralı).
 *
 * Aday sırası: sunucunun gönderdiği özel havuz anahtarı (`senaryo.resim`, ör. "hapis",
 * "yolculuk-hac") → olay kategorisi → (hiçbiri yoksa) emoji.
 */
import { useState } from 'react';

export type OlayResmiDurumu = 'bekliyor' | 'hazir' | 'yok';

/** Aynı resim için her olayda tekrar emoji→resim titremesi olmasın diye bilinen sonuçlar. */
export const OLAY_RESMI_BILINEN = new Map<string, OlayResmiDurumu>();

export function olayCagSlugCikar(cag: string): 'orta-cag' | 'sanayi' {
  return cag === 'Sanayi Devrimi' ? 'sanayi' : 'orta-cag';
}

/** Olay illüstrasyonunun yolu: anahtar (kategori ya da özel havuz) × çağ başına tek dosya. */
export function olayResmiSrc(anahtar: string, cag: string): string {
  return `/assets/olay/${anahtar}-${olayCagSlugCikar(cag)}.webp`;
}

/** Denenecek yollar, öncelik sırasıyla (özel havuz resmi, sonra kategori resmi). */
export function olayResmiAdaylari(kategori: string, cag: string, resim?: string): string[] {
  const anahtarlar = resim && resim !== kategori ? [resim, kategori] : [kategori];
  return anahtarlar.map((a) => olayResmiSrc(a, cag));
}

/** `bas` indeksinden itibaren, daha önce 404 aldığı bilinmeyen ilk adayın indeksi (yoksa -1). */
function sonrakiAday(adaylar: string[], bas: number): number {
  for (let i = bas; i < adaylar.length; i++) {
    if (OLAY_RESMI_BILINEN.get(adaylar[i]) !== 'yok') return i;
  }
  return -1;
}

/**
 * Aday zincirinde gezinir: ilk uygun adayı yükler; 404/hata gelince bir sonrakine geçer, hepsi
 * tükenirse `durum: 'yok'` (çağıran emojiye düşer). Çağıran bileşen aday zinciri değişince
 * remount edilmeli (`key={adaylar.join('|')}`) — durum yalnız ilk render'da kurulur.
 */
export function useOlayResmi(adaylar: string[]): {
  src: string | null;
  durum: OlayResmiDurumu;
  onLoad: () => void;
  onError: () => void;
} {
  const [indeks, setIndeks] = useState(() => sonrakiAday(adaylar, 0));
  const src = indeks >= 0 ? adaylar[indeks] : null;
  const [yuklendi, setYuklendi] = useState(() => src !== null && OLAY_RESMI_BILINEN.get(src) === 'hazir');

  const durum: OlayResmiDurumu = src === null ? 'yok' : yuklendi ? 'hazir' : 'bekliyor';
  return {
    src,
    durum,
    onLoad: () => {
      if (src === null) return;
      OLAY_RESMI_BILINEN.set(src, 'hazir');
      setYuklendi(true);
    },
    onError: () => {
      if (src === null) return;
      OLAY_RESMI_BILINEN.set(src, 'yok');
      setYuklendi(false);
      setIndeks(sonrakiAday(adaylar, indeks + 1));
    },
  };
}
