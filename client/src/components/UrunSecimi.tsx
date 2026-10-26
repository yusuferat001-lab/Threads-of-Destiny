import { useEffect, useState } from 'react';
import type { IsletmeGorunumu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';

const M = {
  baslik: { tr: 'Ana Ürününü Seç', en: 'Choose Your Main Product' },
  alt: {
    tr: 'İşe hangi malla başlayacaksın? Her ürünün kendine özgü bir avantajı var. Diğer ürünler rütbeyle açılır. Seçmeden oyun devam etmez.',
    en: 'Which goods will you start with? Each product has its own edge. The others unlock with rank. The game waits until you choose.',
  },
  sec: { tr: 'Bu ürünle başla', en: 'Start with this' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
  temel: { tr: 'Temel ürün', en: 'Staple' },
  savas: { tr: 'Savaş ürünü', en: 'War goods' },
  luks: { tr: 'Lüks ürün', en: 'Luxury' },
};

/** Kapatılamaz tam ekran başlangıç ürünü seçimi (Tüccar / Zanaatkâr, oyun başı). */
export function UrunSecimi({ stateId, yukleniyor, onSec }: { stateId: string; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const [durum, setDurum] = useState<IsletmeGorunumu | null>(null);
  useEffect(() => {
    let iptal = false;
    isletmeGetir(stateId)
      .then((g) => {
        if (!iptal) setDurum(g);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [stateId]);
  return (
    <div className="ogreti-katman" role="dialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>🏪 {M.baslik[dil]}</h2>
        <p>{M.alt[dil]}</p>
        {durum === null ? (
          <p>{M.yukleniyor[dil]}</p>
        ) : (
          <div className="ogreti-kartlar">
            {durum.urunSecimi.secenekler.map((o) => (
              <div key={o.id} className="ogreti-kart">
                <div className="ogreti-simge">{o.simge}</div>
                <strong>{o.ad[dil]}</strong>
                <small>{M[o.kesim][dil]}</small>
                <p>{o.ozet[dil]}</p>
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
