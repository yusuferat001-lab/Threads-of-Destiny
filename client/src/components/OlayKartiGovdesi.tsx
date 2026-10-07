import { useState, type ReactNode } from 'react';

interface OlayKartiGovdesiProps {
  cag: string;
  kategori: string;
  /** Resim yoksa (ya da yüklenene kadar) gösterilen emoji. */
  gorsel: string;
  yukleniyor: boolean;
  /** Olay başlığı + metni. */
  children: ReactNode;
}

type Durum = 'bekliyor' | 'hazir' | 'yok';

/** Aynı resim için her olayda tekrar emoji→resim titremesi olmasın diye bilinen sonuçlar. */
const BILINEN = new Map<string, Durum>();

function cagSlugCikar(cag: string): 'orta-cag' | 'sanayi' {
  return cag === 'Sanayi Devrimi' ? 'sanayi' : 'orta-cag';
}

/**
 * Olay kartının gövdesi: solda emoji yerine `public/assets/olay/<kategori>-<cag>.webp`
 * illüstrasyonu, ortada olay metni. Dosya yoksa eski düzen (metnin iki yanında emoji) aynen kalır.
 */
export function OlayKartiGovdesi({ cag, kategori, gorsel, yukleniyor, children }: OlayKartiGovdesiProps) {
  const src = `/assets/olay/${kategori}-${cagSlugCikar(cag)}.webp`;
  return (
    <Govde key={src} src={src} gorsel={gorsel} yukleniyor={yukleniyor}>
      {children}
    </Govde>
  );
}

function Govde({ src, gorsel, yukleniyor, children }: { src: string; gorsel: string; yukleniyor: boolean; children: ReactNode }) {
  const [durum, setDurumState] = useState<Durum>(BILINEN.get(src) ?? 'bekliyor');
  const setDurum = (d: Durum) => {
    BILINEN.set(src, d);
    setDurumState(d);
  };
  const nabiz = yukleniyor ? ' olay-gorseli-yukleniyor' : '';
  const resimVar = durum === 'hazir';
  return (
    <div className="olay-karti-govde">
      {resimVar ? null : (
        <span className={`olay-gorseli olay-gorseli-sol${nabiz}`} aria-hidden="true">
          {gorsel}
        </span>
      )}
      {durum !== 'yok' && (
        <img
          className={`olay-resmi${resimVar ? ' olay-resmi-hazir' : ''}${nabiz}`}
          src={src}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable={false}
          onLoad={() => setDurum('hazir')}
          onError={() => setDurum('yok')}
        />
      )}
      {children}
      {resimVar ? null : (
        <span className={`olay-gorseli olay-gorseli-sag${nabiz}`} aria-hidden="true">
          {gorsel}
        </span>
      )}
    </div>
  );
}
