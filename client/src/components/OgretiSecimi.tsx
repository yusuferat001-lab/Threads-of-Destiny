import { useEffect, useState } from 'react';
import type { CemaatOgretiGorunumu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { KararKatman, KararOnay, KararSatiri, RutbeYolu } from './KararKabuk';

const M = {
  baslik: { tr: 'Öğretini Seç', en: 'Choose Your Doctrine' },
  alt: {
    tr: 'Rütben yükseldi; cemaatine yol gösterecek yeni bir öğreti seçmelisin. Seçim kalıcıdır ve seçmeden oyun devam etmez.',
    en: 'Your rank has risen; choose a new doctrine to guide your congregation. The choice is permanent and the game waits for it.',
  },
  seviye: { tr: 'Seviye', en: 'Level' },
  onayla: { tr: 'Bu öğretiyi onayla', en: 'Confirm this doctrine' },
  sec: { tr: 'Bir öğreti seç.', en: 'Pick a doctrine.' },
  islenir: { tr: 'Seçimin bu basamağa işlenir.', en: 'Your choice is set on this step.' },
  fanatik: { tr: 'Fanatik kol: fanatikliği artırır.', en: 'Zealot path: raises zealotry.' },
  dal: { tr: 'Öğreti', en: 'Doctrine' },
  dalFanatik: { tr: '⚡ Fanatik', en: '⚡ Zealot' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
};

/** Kapatılamaz tam ekran öğreti seçimi (Din Adamı terfisi): rütbe yolu + satır seçimi + onay (karar-kabuk şablonu). */
export function OgretiSecimi({ stateId, ogretiSayisi, yukleniyor, onSec }: { stateId: string; ogretiSayisi: number; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const [secenekler, setSecenekler] = useState<CemaatOgretiGorunumu[] | null>(null);
  const [gecmis, setGecmis] = useState<CemaatOgretiGorunumu[]>([]);
  const [seviye, setSeviye] = useState(1);
  const [secim, setSecim] = useState<string | null>(null);
  useEffect(() => {
    let iptal = false;
    setSecenekler(null);
    setSecim(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (iptal) return;
        setSecenekler(g.cemaat?.ogretiler.bekleyen?.secenekler ?? []);
        setGecmis(g.cemaat?.ogretiler.secilen ?? []);
        setSeviye(g.cemaat?.ogretiler.bekleyen?.seviye ?? 1);
      })
      .catch(() => {
        if (!iptal) setSecenekler([]);
      });
    return () => {
      iptal = true;
    };
  }, [stateId, ogretiSayisi]);
  const seciliOgreti = secenekler?.find((o) => o.id === secim);
  return (
    <KararKatman simge="📜" baslik={M.baslik[dil]} alt={M.alt[dil]} rozet={`${M.seviye[dil]} ${seviye} / 5`}>
      <RutbeYolu simdi={seviye} adimlar={gecmis.map((o) => ({ seviye: o.seviye, simge: o.simge, ad: o.ad[dil], kol: o.fanatik ? 'sert' : 'evrensel' }))} />
      {secenekler === null ? (
        <p className="kk-alt">{M.yukleniyor[dil]}</p>
      ) : (
        <>
          <div className="kk-liste kk-secimler">
            {secenekler.map((o) => (
              <KararSatiri
                key={o.id}
                kol={o.fanatik ? 'sert' : 'evrensel'}
                simge={o.simge}
                dal={o.fanatik ? M.dalFanatik[dil] : M.dal[dil]}
                ad={o.ad[dil]}
                detay={o.aciklama[dil]}
                secili={secim === o.id}
                disabled={yukleniyor}
                onClick={() => setSecim(o.id)}
              />
            ))}
          </div>
          <KararOnay
            not={!seciliOgreti ? M.sec[dil] : seciliOgreti.fanatik ? M.fanatik[dil] : M.islenir[dil]}
            acimasiz={!!seciliOgreti?.fanatik}
            etiket={M.onayla[dil]}
            disabled={yukleniyor || !seciliOgreti}
            onClick={() => seciliOgreti && onSec(seciliOgreti.id)}
          />
        </>
      )}
    </KararKatman>
  );
}
