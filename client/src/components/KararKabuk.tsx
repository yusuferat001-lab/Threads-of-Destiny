import type { ReactNode } from 'react';
import { useDil } from '../DilContext';
import type { Kol } from './kararKol';

/**
 * Karar pencereleri ortak şablonu (Doktrin, Öğreti, Savaş kararı; Ordu/Cemaat sayfalarındaki listeler).
 * Stil: karar-kabuk.css (bordo kadife sahne, espresso panel, kahveli latte satırlar, kol renkli madalyonlar).
 */
export function KararKatman({
  simge,
  baslik,
  alt,
  rozet,
  genis,
  children,
}: {
  simge: string;
  baslik: string;
  alt?: string;
  rozet?: string;
  genis?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="kk-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className={`kk-panel${genis ? ' kk-genis' : ''}`}>
        <div className="kk-ust">
          <div>
            <h2 className="kk-baslik">
              {simge} {baslik}
            </h2>
            {alt && <p className="kk-alt">{alt}</p>}
          </div>
          {rozet && <span className="kk-rozet">{rozet}</span>}
        </div>
        {children}
      </div>
    </div>
  );
}

/** Rütbe yolu: bitmiş basamaklar kol renkli madalyon, şimdiki basamak bordo halkalı, kalanlar sönük. */
export function RutbeYolu({ adimlar, simdi, toplam = 5 }: { adimlar: { seviye: number; simge: string; ad: string; kol: Kol }[]; simdi: number; toplam?: number }) {
  const { dil } = useDil();
  const dugumler = [];
  for (let sv = 1; sv <= toplam; sv++) {
    const a = adimlar.find((x) => x.seviye === sv);
    const durum = sv === simdi ? 'simdi' : sv < simdi && a ? 'bitti' : '';
    dugumler.push(
      <div key={sv} className={`kk-dugum ${durum}`} style={a ? { ['--kol' as string]: `var(--c-kol-${a.kol === 'kahraman' ? 'sadik' : a.kol})` } : undefined}>
        <span className="kk-dugum-top" aria-hidden="true">
          {durum === 'simdi' ? sv : durum === 'bitti' && a ? a.simge : '·'}
        </span>
        <span className="kk-dugum-ad">
          S{sv}
          {durum === 'bitti' && a ? ` · ${a.ad}` : durum === 'simdi' ? ` · ${dil === 'en' ? 'Now' : 'Şimdi'}` : ''}
        </span>
      </div>
    );
  }
  return <div className="kk-yol">{dugumler}</div>;
}

/** Tek seçenek satırı: `onClick` verilirse seçilebilir düğme, verilmezse salt liste satırı. */
export function KararSatiri({
  kol = 'evrensel',
  simge,
  dal,
  ad,
  cipler,
  detay,
  secili,
  onClick,
  disabled,
}: {
  kol?: Kol;
  simge?: string;
  dal?: string;
  ad: string;
  cipler?: ReactNode;
  detay?: ReactNode;
  secili?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const ic = (
    <>
      <span className="kk-madalyon" aria-hidden="true">
        {simge ?? '•'}
      </span>
      <span className="kk-metin">
        {dal && <span className="kk-dal">{dal}</span>}
        <span className="kk-ad">{ad}</span>
      </span>
      {cipler ? <span className="kk-cipler">{cipler}</span> : detay ? <span className="kk-detay kk-tam">{detay}</span> : <span />}
      {onClick && (
        <span className="kk-tik" aria-hidden="true">
          ✓
        </span>
      )}
    </>
  );
  const sinif = `kk-satir kol-${kol}${secili ? ' secili' : ''}`;
  return onClick ? (
    <button type="button" className={sinif} aria-pressed={!!secili} disabled={disabled} onClick={onClick}>
      {ic}
    </button>
  ) : (
    <div className={sinif}>{ic}</div>
  );
}

export function KararOnay({ not, acimasiz, etiket, disabled, onClick }: { not: string; acimasiz?: boolean; etiket: string; disabled: boolean; onClick: () => void }) {
  return (
    <div className="kk-onay">
      <small className={`kk-onay-not${acimasiz ? ' acimasiz' : ''}`}>{not}</small>
      <button type="button" className="kk-onay-btn" disabled={disabled} onClick={onClick}>
        {etiket}
      </button>
    </div>
  );
}
