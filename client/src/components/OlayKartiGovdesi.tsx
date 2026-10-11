import type { ReactNode } from 'react';
import { olayResmiAdaylari, useOlayResmi } from '../olayResmi';

interface OlayKartiGovdesiProps {
  cag: string;
  kategori: string;
  /** Sunucunun özel havuz resmi anahtarı (`senaryo.resim`); yoksa kategori resmi. */
  resim?: string;
  /** Resim yoksa (ya da yüklenene kadar) gösterilen emoji. */
  gorsel: string;
  yukleniyor: boolean;
  /** Olay başlığı + metni. */
  children: ReactNode;
}

/**
 * Olay kartının gövdesi: solda emoji yerine `public/assets/olay/<kategori>-<cag>.webp`
 * illüstrasyonu, ortada olay metni. Dosya yoksa eski düzen (metnin iki yanında emoji) aynen kalır.
 */
export function OlayKartiGovdesi({ cag, kategori, resim, gorsel, yukleniyor, children }: OlayKartiGovdesiProps) {
  const adaylar = olayResmiAdaylari(kategori, cag, resim);
  return (
    <Govde key={adaylar.join('|')} adaylar={adaylar} gorsel={gorsel} yukleniyor={yukleniyor}>
      {children}
    </Govde>
  );
}

function Govde({ adaylar, gorsel, yukleniyor, children }: { adaylar: string[]; gorsel: string; yukleniyor: boolean; children: ReactNode }) {
  const { src, durum, onLoad, onError } = useOlayResmi(adaylar);
  const nabiz = yukleniyor ? ' olay-gorseli-yukleniyor' : '';
  const resimVar = durum === 'hazir';
  return (
    <div className="olay-karti-govde">
      {resimVar ? null : (
        <span className={`olay-gorseli olay-gorseli-sol${nabiz}`} aria-hidden="true">
          {gorsel}
        </span>
      )}
      {src !== null && (
        <img
          className={`olay-resmi${resimVar ? ' olay-resmi-hazir' : ''}${nabiz}`}
          src={src}
          alt=""
          aria-hidden="true"
          decoding="async"
          draggable={false}
          onLoad={onLoad}
          onError={onError}
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
