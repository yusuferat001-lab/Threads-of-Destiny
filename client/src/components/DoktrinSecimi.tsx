import { useEffect, useState } from 'react';
import type { BirlikGorunumu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { DoktrinEtkiSatiri } from './BirlikPaneli';
import { KararKatman, KararOnay, KararSatiri, RutbeYolu } from './KararKabuk';
import { kolOlarak, useKolEtiketi } from './kararKol';

const M = {
  baslik: { tr: 'Doktrinini Seç', en: 'Choose Your Doctrine' },
  alt: {
    tr: 'Rütben yükseldi; ordunun savaş anlayışını belirleyecek yeni bir doktrin seçmelisin. Seçim kalıcıdır ve seçmeden oyun devam etmez.',
    en: 'Your rank has risen; choose a new doctrine to shape how your army fights. The choice is permanent and the game waits for it.',
  },
  seviye: { tr: 'Seviye', en: 'Level' },
  onayla: { tr: 'Bu doktrini onayla', en: 'Confirm this doctrine' },
  sec: { tr: 'Bir doktrin seç.', en: 'Pick a doctrine.' },
  islenir: { tr: 'Seçimin bu basamağa işlenir.', en: 'Your choice is set on this step.' },
  acimasiz: { tr: 'Acımasız kol: sertliği ve firarı artırır.', en: 'Ruthless path: raises harshness and desertion.' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
};

type Birlik = NonNullable<BirlikGorunumu>;
type Bekleyen = NonNullable<Birlik['doktrin']['bekleyen']>;

/** Kapatılamaz tam ekran doktrin seçimi (Asker terfisi): rütbe yolu + kol renkli seçenek satırları + onay. */
export function DoktrinSecimi({ stateId, doktrinSayisi, yukleniyor, onSec }: { stateId: string; doktrinSayisi: number; yukleniyor: boolean; onSec: (id: string) => void }) {
  const { dil } = useDil();
  const kolEtiketi = useKolEtiketi();
  const [bekleyen, setBekleyen] = useState<Bekleyen | null | undefined>(undefined);
  const [secilen, setSecilen] = useState<Birlik['doktrin']['secilen']>([]);
  const [odemeAdi, setOdemeAdi] = useState<string | undefined>(undefined);
  const [secim, setSecim] = useState<string | null>(null);
  useEffect(() => {
    let iptal = false;
    setBekleyen(undefined);
    setSecim(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (iptal) return;
        setBekleyen(g.birlik?.doktrin.bekleyen ?? null);
        setSecilen(g.birlik?.doktrin.secilen ?? []);
        setOdemeAdi(g.birlik?.hesap.soldAdi[dil]);
      })
      .catch(() => {
        if (!iptal) setBekleyen(null);
      });
    return () => {
      iptal = true;
    };
  }, [stateId, doktrinSayisi, dil]);
  const seviye = bekleyen?.seviye ?? 1;
  const secenekler = bekleyen?.secenekler ?? [];
  const seciliSecenek = secenekler.find((o) => o.id === secim);
  return (
    <KararKatman simge="🎖️" baslik={M.baslik[dil]} alt={M.alt[dil]} rozet={`${M.seviye[dil]} ${seviye} / 5`}>
      <RutbeYolu
        simdi={seviye}
        adimlar={secilen.map((o) => ({ seviye: o.seviye, simge: o.simge, ad: o.ad[dil], kol: kolOlarak(o.kaynak) }))}
      />
      {bekleyen === undefined ? (
        <p className="kk-alt">{M.yukleniyor[dil]}</p>
      ) : (
        <>
          <div className="kk-liste kk-secimler">
            {secenekler.map((o) => {
              const kol = kolOlarak(o.kaynak);
              return (
                <KararSatiri
                  key={o.id}
                  kol={kol}
                  simge={o.simge}
                  dal={kolEtiketi(kol)}
                  ad={o.ad[dil]}
                  cipler={<DoktrinEtkiSatiri etki={o.etki} dil={dil} odemeAdi={odemeAdi} cip />}
                  secili={secim === o.id}
                  disabled={yukleniyor}
                  onClick={() => setSecim(o.id)}
                />
              );
            })}
          </div>
          <KararOnay
            not={!seciliSecenek ? M.sec[dil] : seciliSecenek.acimasiz ? M.acimasiz[dil] : M.islenir[dil]}
            acimasiz={!!seciliSecenek?.acimasiz}
            etiket={M.onayla[dil]}
            disabled={yukleniyor || !seciliSecenek}
            onClick={() => seciliSecenek && onSec(seciliSecenek.id)}
          />
        </>
      )}
    </KararKatman>
  );
}
