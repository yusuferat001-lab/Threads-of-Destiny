import { useEffect, useState } from 'react';
import type { ProjeGorunumu, ProjeSonucu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { KararKatman, KararOnay, KararSatiri } from './KararKabuk';

const M = {
  baslik: { tr: 'Proje Tamamlandı mı?', en: 'Is the Project Done?' },
  alt: { tr: 'Süre doldu. Sonuca bağlayabilir, bir yıl daha çalışabilir ya da vazgeçebilirsin. Karar vermeden hayat devam etmez.', en: 'Time is up. You can put it to the test, work one more year, or give up. Life waits for your decision.' },
  sur: { tr: 'Sonuca bağla', en: 'Put it to the test' },
  surDetay: { tr: 'Şimdi denersin; başarırsan etkisi kalıcıdır, başarısız olursan masraf boşa gider ve itibarın zedelenir.', en: 'You try it now; success is permanent, failure wastes the cost and dents your standing.' },
  uzat: { tr: 'Bir yıl daha geliştir', en: 'Work one more year' },
  uzatDetay: { tr: 'Bir yıl daha masraf ve atölye zamanı harcarsın; ikinci denemede başarı ihtimali artar. Yalnız bir kez uzatılır.', en: 'You spend another year of cost and workshop time; the second try is likelier to succeed. Only once.' },
  vazgec: { tr: 'Vazgeç', en: 'Give up' },
  vazgecDetay: { tr: 'Projeyi bırakırsın; harcanan masraf geri gelmez ve itibarın biraz düşer.', en: 'You drop the project; the money spent is gone and your standing dips a little.' },
  sans: { tr: 'Başarı ihtimali', en: 'Chance of success' },
  iyi: { tr: 'iyi', en: 'good' },
  belirsiz: { tr: 'belirsiz', en: 'uncertain' },
  zor: { tr: 'zor', en: 'poor' },
  sec: { tr: 'Bir karar seç.', en: 'Pick a decision.' },
  onayla: { tr: 'Onayla', en: 'Confirm' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
  basari: { tr: 'Proje başarıyla tamamlandı; etkisi artık kalıcı.', en: 'The project succeeded; its effect is now permanent.' },
  basarisiz: { tr: 'Proje tutmadı; masraf boşa gitti.', en: 'The project failed; the money was wasted.' },
  uzatildi: { tr: 'Projeyi bir yıl daha uzattın.', en: 'You extended the project by a year.' },
  vazgecti: { tr: 'Projeden vazgeçtin.', en: 'You gave up on the project.' },
  devam: { tr: 'Devam', en: 'Continue' },
};

/** Kapatılamaz proje karar penceresi (süre dolunca): sonuca bağla / uzat / vazgeç; sonra sonuç özeti. */
export function ProjeKarari({
  stateId,
  sonuc,
  yukleniyor,
  onVer,
  onKapat,
}: {
  stateId: string;
  sonuc: ProjeSonucu | null;
  yukleniyor: boolean;
  onVer: (secim: 'sur' | 'uzat' | 'vazgec') => void;
  onKapat: () => void;
}) {
  const { dil } = useDil();
  const [p, setP] = useState<ProjeGorunumu | null>(null);
  const [secim, setSecim] = useState<'sur' | 'uzat' | 'vazgec' | null>(null);
  useEffect(() => {
    if (sonuc) return;
    let iptal = false;
    setSecim(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (!iptal) setP(g.proje ?? null);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [stateId, sonuc]);

  if (sonuc) {
    const simge = sonuc.sonuc === 'basari' ? '🏆' : sonuc.sonuc === 'basarisiz' ? '📉' : sonuc.sonuc === 'uzatildi' ? '⏳' : '🕊️';
    return (
      <KararKatman simge={simge} baslik={M.baslik[dil]} alt={M[sonuc.sonuc][dil]}>
        <KararOnay not="" etiket={M.devam[dil]} disabled={yukleniyor} onClick={onKapat} />
      </KararKatman>
    );
  }

  const tanim = p?.aktif ? p.secenekler.find((s) => s.id === p.aktif!.id) : null;
  return (
    <KararKatman simge={tanim?.simge ?? '🔬'} baslik={tanim ? `${tanim.ad[dil]}` : M.baslik[dil]} alt={M.alt[dil]}>
      {p === null || !p.karar ? (
        <p className="kk-alt">{M.yukleniyor[dil]}</p>
      ) : (
        <>
          <div className="kk-liste kk-secimler">
            <KararSatiri
              kol="evrensel"
              simge="🎯"
              ad={M.sur[dil]}
              cipler={
                <span className={`kk-cip ${p.karar.sans === 'zor' ? 's-eksi' : 's-arti'}`}>
                  {M.sans[dil]}: {M[p.karar.sans][dil]}
                </span>
              }
              detay={M.surDetay[dil]}
              secili={secim === 'sur'}
              disabled={yukleniyor}
              onClick={() => setSecim('sur')}
            />
            {p.karar.uzatabilir && (
              <KararSatiri kol="sadik" simge="⏳" ad={M.uzat[dil]} detay={M.uzatDetay[dil]} secili={secim === 'uzat'} disabled={yukleniyor} onClick={() => setSecim('uzat')} />
            )}
            <KararSatiri kol="sert" simge="🕊️" ad={M.vazgec[dil]} detay={M.vazgecDetay[dil]} secili={secim === 'vazgec'} disabled={yukleniyor} onClick={() => setSecim('vazgec')} />
          </div>
          <KararOnay not={secim ? '' : M.sec[dil]} etiket={M.onayla[dil]} disabled={yukleniyor || !secim} onClick={() => secim && onVer(secim)} />
        </>
      )}
    </KararKatman>
  );
}
