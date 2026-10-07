import { useState } from 'react';

interface OlayArkaplaniProps {
  cag: string;
  kategori: string;
}

function cagSlugCikar(cag: string): 'orta-cag' | 'sanayi' {
  return cag === 'Sanayi Devrimi' ? 'sanayi' : 'orta-cag';
}

/**
 * Olayın kategorisine (savas, ticaret, ...) ve çağa göre bir illüstrasyon gösterir:
 * `public/assets/olay/<kategori>-<cag>.webp`. Dosya yoksa (404) hiçbir şey çizmez —
 * altındaki BolgeSahnesi aynen görünür, yani resimler tek tek eklenebilir.
 */
export function OlayArkaplani({ cag, kategori }: OlayArkaplaniProps) {
  const src = `/assets/olay/${kategori}-${cagSlugCikar(cag)}.webp`;
  return <OlayResmi key={src} src={src} />;
}

function OlayResmi({ src }: { src: string }) {
  const [durum, setDurum] = useState<'bekliyor' | 'hazir' | 'yok'>('bekliyor');
  if (durum === 'yok') return null;
  return (
    <img
      className={`olay-arkaplani${durum === 'hazir' ? ' olay-arkaplani-hazir' : ''}`}
      src={src}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
      onLoad={() => setDurum('hazir')}
      onError={() => setDurum('yok')}
    />
  );
}
