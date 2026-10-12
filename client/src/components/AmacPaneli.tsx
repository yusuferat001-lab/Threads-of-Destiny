import { useState } from 'react';
import { createPortal } from 'react-dom';
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
  neYapmali: 'Ne yapmalısın?',
  ilerleme: 'İlerleme',
  bonusEtiketi: 'Skor bonusu',
  olumdeIpucu: 'Yalnızca öldüğün andaki duruma bakılır: hayatının sonunda bu koşulu sağlıyor olmalısın.',
  tamamIpucu: 'Bu amacı tamamladın.',
  kapat: 'Kapat',
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
  neYapmali: 'What to do',
  ilerleme: 'Progress',
  bonusEtiketi: 'Score bonus',
  olumdeIpucu: 'Only your state at the moment of death counts: you must meet this condition at the end of your life.',
  tamamIpucu: 'You completed this goal.',
  kapat: 'Close',
};

function yuzde(a: AmacKarti): number {
  if (a.tamamlandi) return 100;
  if (a.mevcut == null || a.hedef == null || a.hedef <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((a.mevcut / a.hedef) * 100)));
}

export function AmacPaneli({ durum, varyant = 'panel' }: AmacPaneliProps) {
  const { dil } = useDil();
  const t = dil === 'en' ? EN : TR;
  const [secili, setSecili] = useState<string | null>(null);
  const seciliAmac = durum?.amaclar.find((a) => a.id === secili) ?? null;

  const detayPenceresi =
    seciliAmac &&
    createPortal(
      <div className="kariyer-sonuc-katman" onClick={() => setSecili(null)}>
        <div
          className={`kariyer-sonuc-modal amac-detay-modal amac-${seciliAmac.zorluk}`}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="kariyer-karanlik-modal-baslik">
            <h3>
              {seciliAmac.tamamlandi ? '✓' : seciliAmac.zorluk === 'zor' ? '★' : '◆'} {seciliAmac.baslik}
            </h3>
            <button type="button" className="kariyer-karanlik-kapat" aria-label={t.kapat} onClick={() => setSecili(null)}>
              ✕
            </button>
          </div>
          <p className="amac-detay-etiket">
            {seciliAmac.zorluk === 'zor' ? t.zor : t.normal} · {t.bonusEtiketi} {t.bonus(seciliAmac.bonus)}
          </p>
          <h4 className="amac-detay-alt-baslik">{t.neYapmali}</h4>
          <p>{seciliAmac.aciklama}</p>
          {seciliAmac.mevcut != null && seciliAmac.hedef != null && (
            <div className="amac-detay-ilerleme">
              <span>
                {t.ilerleme}: {seciliAmac.mevcut} / {seciliAmac.hedef}
              </span>
              <div className="amac-bar" role="progressbar" aria-valuenow={yuzde(seciliAmac)} aria-valuemin={0} aria-valuemax={100}>
                <div className="amac-bar-dolu" style={{ width: `${yuzde(seciliAmac)}%` }} />
              </div>
            </div>
          )}
          {(seciliAmac.tamamlandi || seciliAmac.kontrolAni === 'olumde') && (
            <p className="amac-detay-ipucu">
              {seciliAmac.tamamlandi
                ? `${t.tamamIpucu}${seciliAmac.tamamlanmaYili ? ` (${seciliAmac.tamamlanmaYili})` : ''}`
                : t.olumdeIpucu}
            </p>
          )}
          <button type="button" onClick={() => setSecili(null)}>
            {t.kapat}
          </button>
        </div>
      </div>,
      document.body,
    );

  // ---- İnce yatay şerit — arka plan görselinin ÜSTÜNDE (oyun sahnesi overlay'i) ----
  if (varyant === 'serit') {
    if (!durum || durum.amaclar.length === 0) return null;
    return (
      <div className="amac-serit" role="list">
        {durum.amaclar.map((a) => {
          const p = yuzde(a);
          return (
            <button
              key={a.id}
              type="button"
              role="listitem"
              onClick={() => setSecili(a.id)}
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
            </button>
          );
        })}
        {detayPenceresi}
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
              className={`amac-satir amac-tiklanir${a.tamamlandi ? ' amac-tamam' : ''} amac-${a.zorluk}`}
              title={a.aciklama}
              role="button"
              tabIndex={0}
              onClick={() => setSecili(a.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSecili(a.id);
                }
              }}
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
      {detayPenceresi}
    </div>
  );
}
