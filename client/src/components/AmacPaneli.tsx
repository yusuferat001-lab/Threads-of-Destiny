import { useDil } from '../DilContext';
import type { AmaclarDurumu, AmacKarti } from '../types';

interface AmacPaneliProps {
  durum: AmaclarDurumu | null;
  /** 'panel' = sağ panel / Görevin ekranı; 'olum' = ölüm ekranı özeti. */
  varyant?: 'panel' | 'olum';
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
      <h3 className="amac-paneli-baslik">
        {varyant === 'olum' ? t.ozetBaslik : t.baslik}
        <span className="amac-carpan-rozet" title={t.carpan}>
          ×{durum.carpan % 1 === 0 ? durum.carpan : durum.carpan.toFixed(1)}
        </span>
      </h3>
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
