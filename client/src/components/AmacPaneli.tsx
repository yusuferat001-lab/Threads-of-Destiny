import { useDil } from '../DilContext';
import type { AmaclarDurumu, AmacKarti } from '../types';

interface AmacPaneliProps {
  durum: AmaclarDurumu | null;
  /** 'panel' = sağ panel / Görevin ekranı; 'olum' = ölüm ekranı özeti;
   *  'serit' = oyun ekranının üstündeki ince yatay şerit (3 amaç yan yana, çok küçük). */
  varyant?: 'panel' | 'olum' | 'serit';
}

const TR = {
  baslik: '🎯 Amaçların',
  carpan: 'Skor çarpanı',
  bonus: (b: number) => `+${b}x`,
  normal: 'normal',
  zor: 'zor',
  tamam: 'tamamlandı',
  olumde: 'ölümde bakılır',
  yok: 'Meslek seçince belirlenecek.',
  ozetBaslik: 'Hayat Amaçların',
};
const EN: typeof TR = {
  baslik: '🎯 Your Goals',
  carpan: 'Score multiplier',
  bonus: (b: number) => `+${b}x`,
  normal: 'normal',
  zor: 'hard',
  tamam: 'complete',
  olumde: 'checked at death',
  yok: 'Set when you choose a profession.',
  ozetBaslik: 'Your Life Goals',
};

function yuzde(a: AmacKarti): number {
  if (a.tamamlandi) return 100;
  if (a.mevcut == null || a.hedef == null || a.hedef <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((a.mevcut / a.hedef) * 100)));
}

export function AmacPaneli({ durum, varyant = 'panel' }: AmacPaneliProps) {
  const { dil } = useDil();
  const t = dil === 'en' ? EN : TR;

  // ---- İnce yatay şerit — arka plan görselinin ÜSTÜNDE (oyun sahnesi overlay'i) ----
  if (varyant === 'serit') {
    if (!durum || durum.amaclar.length === 0) return null;
    return (
      <div className="amac-serit" role="list">
        {durum.amaclar.map((a) => {
          const p = yuzde(a);
          return (
            <span
              key={a.id}
              role="listitem"
              className={`amac-serit-oge${a.tamamlandi ? ' amac-serit-tamam' : ''} amac-${a.zorluk}`}
              title={`${a.baslik} — ${a.aciklama}${
                a.mevcut != null && a.hedef != null ? ` (${a.mevcut}/${a.hedef})` : ''
              }`}
            >
              <span className="amac-serit-ust">
                <span className="amac-serit-ikon" aria-hidden="true">
                  {a.tamamlandi ? '✓' : a.zorluk === 'zor' ? '★' : '◆'}
                </span>
                <span className="amac-serit-baslik">{a.baslik}</span>
                {a.mevcut != null && a.hedef != null && (
                  <span className="amac-serit-oran">
                    {a.mevcut}/{a.hedef}
                  </span>
                )}
              </span>
              {/* Görevi çok kısa anlat */}
              <span className="amac-serit-aciklama">{a.aciklama}</span>
              <span className="amac-serit-bar" aria-hidden="true">
                <span className="amac-serit-bar-dolu" style={{ width: `${p}%` }} />
              </span>
            </span>
          );
        })}
      </div>
    );
  }

  if (!durum || durum.amaclar.length === 0) {
    if (varyant === 'olum') return null;
    return (
      <div className="amac-paneli">
        <h3 className="amac-paneli-baslik">{t.baslik}</h3>
        <p className="amac-paneli-bos">{t.yok}</p>
      </div>
    );
  }

  return (
    <div className={`amac-paneli amac-paneli-${varyant}`}>
      <h3 className="amac-paneli-baslik">{varyant === 'olum' ? t.ozetBaslik : t.baslik}</h3>
      <ul className="amac-liste">
        {durum.amaclar.map((a) => {
          const p = yuzde(a);
          return (
            <li
              key={a.id}
              className={`amac-satir${a.tamamlandi ? ' amac-tamam' : ''} amac-${a.zorluk}`}
              title={a.aciklama}
            >
              <div className="amac-ust">
                <span className="amac-ikon">{a.tamamlandi ? '✓' : a.zorluk === 'zor' ? '★' : '◆'}</span>
                <span className="amac-baslik">{a.baslik}</span>
                <span className={`amac-bonus amac-bonus-${a.zorluk}`}>{t.bonus(a.bonus)}</span>
              </div>
              <div className="amac-aciklama">{a.aciklama}</div>
              <div className="amac-bar" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
                <div className="amac-bar-dolu" style={{ width: `${p}%` }} />
              </div>
              <div className="amac-alt">
                {a.tamamlandi ? (
                  <span className="amac-durum-metni">
                    {t.tamam}
                    {a.tamamlanmaYili ? ` · ${a.tamamlanmaYili}` : ''}
                  </span>
                ) : a.mevcut != null && a.hedef != null ? (
                  <span className="amac-durum-metni">
                    {a.mevcut} / {a.hedef}
                  </span>
                ) : (
                  <span className="amac-durum-metni">{a.kontrolAni === 'olumde' ? t.olumde : '—'}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
