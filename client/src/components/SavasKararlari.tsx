import type { SavasKarariDurumu } from '../types';
import { useDil } from '../DilContext';

const M = {
  baslik: { tr: 'Savaş Kararları', en: 'War Decisions' },
  adim: { tr: 'Adım', en: 'Step' },
  alt: {
    tr: 'Savaş sürüyor. Bu yılın kararlarını vermeden zaman ilerlemez.',
    en: 'The war rages. Time does not move until you make this year\'s decisions.',
  },
  arazi: { tr: 'Arazi', en: 'Terrain' },
  dusman: { tr: 'Düşmanın baskın birliği', en: 'Enemy\'s main force' },
  sec: { tr: 'Bunu seç', en: 'Choose' },
};
const DUSMAN_TUR: Record<string, { tr: string; en: string }> = {
  okcu: { tr: 'okçu', en: 'archers' },
  suvari: { tr: 'süvari', en: 'cavalry' },
  mizrakli: { tr: 'mızraklı', en: 'spearmen' },
  karma: { tr: 'karma', en: 'mixed' },
};

/** Kapatılamaz Savaş Kararları penceresi (Asker, savaş yılı): adım adım zorunlu zincir. */
export function SavasKararlari({ karar, yukleniyor, onSec }: { karar: SavasKarariDurumu; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  return (
    <div className="ogreti-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>⚔️ {M.baslik[dil]}</h2>
        <p className="ogreti-seviye">
          {M.adim[dil]} {karar.sira}/{karar.toplam} — {karar.baslik[dil]}
        </p>
        <p>{karar.aciklama[dil]}</p>
        {karar.bilgi.dusmanTur && (
          <p>
            <small>
              {M.dusman[dil]}: {(DUSMAN_TUR[karar.bilgi.dusmanTur] ?? { tr: karar.bilgi.dusmanTur, en: karar.bilgi.dusmanTur })[dil]}
            </small>
          </p>
        )}
        <div className="ogreti-kartlar">
          {karar.secenekler.map((o) => (
            <div key={o.id} className="ogreti-kart">
              {o.simge && <div className="ogreti-simge">{o.simge}</div>}
              <strong>{o.ad[dil]}</strong>
              <p>{o.aciklama[dil]}</p>
              <button disabled={yukleniyor} onClick={() => onSec(o.id)}>
                {M.sec[dil]}
              </button>
            </div>
          ))}
        </div>
        <small>{M.alt[dil]}</small>
      </div>
    </div>
  );
}
