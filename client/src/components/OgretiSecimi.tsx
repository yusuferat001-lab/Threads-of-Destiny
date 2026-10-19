import { useEffect, useState } from 'react';
import type { CemaatOgretiGorunumu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';

const M = {
  baslik: { tr: 'Öğretini Seç', en: 'Choose Your Doctrine' },
  alt: {
    tr: 'Rütben yükseldi; cemaatine yol gösterecek yeni bir öğreti seçmelisin. Seçim kalıcıdır ve seçmeden oyun devam etmez.',
    en: 'Your rank has risen; choose a new doctrine to guide your congregation. The choice is permanent and the game waits for it.',
  },
  seviye: { tr: 'Seviye', en: 'Level' },
  sec: { tr: 'Bu öğretiyi seç', en: 'Choose this doctrine' },
  fanatik: { tr: '⚡ Fanatikliği artırır', en: '⚡ Raises zealotry' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
};

/** Kapatılamaz tam ekran öğreti seçimi (Din Adamı terfisi). */
export function OgretiSecimi({ stateId, ogretiSayisi, yukleniyor, onSec }: { stateId: string; ogretiSayisi: number; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const [secenekler, setSecenekler] = useState<CemaatOgretiGorunumu[] | null>(null);
  const [seviye, setSeviye] = useState(1);
  useEffect(() => {
    let iptal = false;
    setSecenekler(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (iptal) return;
        setSecenekler(g.cemaat?.ogretiler.bekleyen?.secenekler ?? []);
        setSeviye(g.cemaat?.ogretiler.bekleyen?.seviye ?? 1);
      })
      .catch(() => {
        if (!iptal) setSecenekler([]);
      });
    return () => {
      iptal = true;
    };
  }, [stateId, ogretiSayisi]);
  return (
    <div className="ogreti-katman" role="dialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>📜 {M.baslik[dil]}</h2>
        <p>{M.alt[dil]}</p>
        <p className="ogreti-seviye">
          {M.seviye[dil]} {seviye}
        </p>
        {secenekler === null ? (
          <p>{M.yukleniyor[dil]}</p>
        ) : (
          <div className="ogreti-kartlar">
            {secenekler.map((o) => (
              <div key={o.id} className={`ogreti-kart${o.fanatik ? ' ogreti-kart-fanatik' : ''}`}>
                <div className="ogreti-simge">{o.simge}</div>
                <strong>{o.ad[dil]}</strong>
                <p>{o.aciklama[dil]}</p>
                {o.fanatik && <small>{M.fanatik[dil]}</small>}
                <button disabled={yukleniyor} onClick={() => onSec(o.id)}>
                  {M.sec[dil]}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
