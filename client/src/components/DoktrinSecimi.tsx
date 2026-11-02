import { useEffect, useState } from 'react';
import type { BirlikGorunumu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { doktrinEtkiMetni } from './BirlikPaneli';

const M = {
  baslik: { tr: 'Doktrinini Seç', en: 'Choose Your Doctrine' },
  alt: {
    tr: 'Rütben yükseldi; ordunun savaş anlayışını belirleyecek yeni bir doktrin seçmelisin. Seçim kalıcıdır ve seçmeden oyun devam etmez.',
    en: 'Your rank has risen; choose a new doctrine to shape how your army fights. The choice is permanent and the game waits for it.',
  },
  seviye: { tr: 'Seviye', en: 'Level' },
  sec: { tr: 'Bu doktrini seç', en: 'Choose this doctrine' },
  acimasiz: { tr: '⚡ Acımasız: sertliği ve firarı artırır', en: '⚡ Ruthless: raises harshness and desertion' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
};

type Secenek = NonNullable<BirlikGorunumu['doktrin']['bekleyen']>['secenekler'][number];

/** Kapatılamaz tam ekran doktrin seçimi (Asker terfisi). OgretiSecimi ile aynı desen. */
export function DoktrinSecimi({ stateId, doktrinSayisi, yukleniyor, onSec }: { stateId: string; doktrinSayisi: number; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const [secenekler, setSecenekler] = useState<Secenek[] | null>(null);
  const [seviye, setSeviye] = useState(1);
  useEffect(() => {
    let iptal = false;
    setSecenekler(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (iptal) return;
        setSecenekler(g.birlik?.doktrin.bekleyen?.secenekler ?? []);
        setSeviye(g.birlik?.doktrin.bekleyen?.seviye ?? 1);
      })
      .catch(() => {
        if (!iptal) setSecenekler([]);
      });
    return () => {
      iptal = true;
    };
  }, [stateId, doktrinSayisi]);
  return (
    <div className="ogreti-katman" role="dialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>🎖️ {M.baslik[dil]}</h2>
        <p>{M.alt[dil]}</p>
        <p className="ogreti-seviye">
          {M.seviye[dil]} {seviye}
        </p>
        {secenekler === null ? (
          <p>{M.yukleniyor[dil]}</p>
        ) : (
          <div className="ogreti-kartlar">
            {secenekler.map((o) => (
              <div key={o.id} className={`ogreti-kart${o.acimasiz ? ' ogreti-kart-fanatik' : ''}`}>
                <div className="ogreti-simge">{o.simge}</div>
                <strong>{o.ad[dil]}</strong>
                <p>{doktrinEtkiMetni(o.etki, dil).join(' · ')}</p>
                {o.acimasiz && <small>{M.acimasiz[dil]}</small>}
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
