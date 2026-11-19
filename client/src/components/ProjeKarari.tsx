import { useEffect, useState } from 'react';
import type { ProjeKarariGorunumu, ProjeSonucu } from '../types';
import { isletmeGetir } from '../api';
import { useDil } from '../DilContext';
import { KararKatman, KararOnay, KararSatiri } from './KararKabuk';

const M = {
  sans: { tr: 'Başarı ihtimali', en: 'Chance of success' },
  iyi: { tr: 'iyi', en: 'good' },
  belirsiz: { tr: 'belirsiz', en: 'uncertain' },
  zor: { tr: 'zor', en: 'poor' },
  sec: { tr: 'Bir karar seç.', en: 'Pick a decision.' },
  onayla: { tr: 'Onayla', en: 'Confirm' },
  yukleniyor: { tr: 'Yükleniyor…', en: 'Loading…' },
  devam: { tr: 'Devam', en: 'Continue' },
  atolye: {
    basari: { tr: 'Proje başarıyla tamamlandı; etkisi artık kalıcı.', en: 'The project succeeded; its effect is now permanent.' },
    basarisiz: { tr: 'Proje tutmadı; masraf boşa gitti.', en: 'The project failed; the money was wasted.' },
    uzatildi: { tr: 'Projeyi bir yıl daha uzattın.', en: 'You extended the project by a year.' },
    vazgecti: { tr: 'Projeden vazgeçtin.', en: 'You gave up on the project.' },
  },
  sefer: {
    basari: { tr: 'Sefer başarıyla döndü; ürünün bir süre daha iyi fiyata gidecek ve güvenin arttı.', en: 'The expedition returned safely; your product will sell better for a while and your trust grew.' },
    basarisiz: { tr: 'Sefer zarar etti; yükün bir kısmı ya da fidye gitti ve güvenin zedelendi.', en: 'The expedition lost out; part of the cargo or a ransom was lost and your trust suffered.' },
    uzatildi: { tr: '', en: '' },
    vazgecti: { tr: 'Geri döndün; sefer boşa gitti.', en: 'You turned back; the trip was wasted.' },
  },
};

/** Kapatılamaz proje karar penceresi: süre dolunca (atölye) ya da yolda olay çıkınca (sefer) seçenekler sunucudan gelir; sonra sonuç özeti. */
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
  onVer: (secim: string) => void;
  onKapat: () => void;
}) {
  const { dil } = useDil();
  const [k, setK] = useState<ProjeKarariGorunumu | null>(null);
  const [secim, setSecim] = useState<string | null>(null);
  useEffect(() => {
    if (sonuc) return;
    let iptal = false;
    setSecim(null);
    isletmeGetir(stateId)
      .then((g) => {
        if (!iptal) setK(g.proje?.karar ?? null);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, [stateId, sonuc]);

  if (sonuc) {
    const simge = sonuc.sonuc === 'basari' ? '🏆' : sonuc.sonuc === 'basarisiz' ? '📉' : sonuc.sonuc === 'uzatildi' ? '⏳' : '🕊️';
    return (
      <KararKatman simge={simge} baslik={k?.baslik[dil] ?? ''} alt={M[sonuc.aile][sonuc.sonuc][dil]}>
        <KararOnay not="" etiket={M.devam[dil]} disabled={yukleniyor} onClick={onKapat} />
      </KararKatman>
    );
  }

  return (
    <KararKatman simge={k?.simge ?? '🔬'} baslik={k?.baslik[dil] ?? ''} alt={k?.metin[dil] ?? ''}>
      {k === null ? (
        <p className="kk-alt">{M.yukleniyor[dil]}</p>
      ) : (
        <>
          <div className="kk-liste kk-secimler">
            {k.secenekler.map((o) => (
              <KararSatiri
                key={o.id}
                kol={o.id === 'vazgec' || o.id === 'geri' ? 'sert' : o.id === 'uzat' ? 'sadik' : 'evrensel'}
                simge={o.simge}
                ad={o.ad[dil]}
                cipler={
                  o.sans ? (
                    <span className={`kk-cip ${o.sans === 'zor' ? 's-eksi' : 's-arti'}`}>
                      {M.sans[dil]}: {M[o.sans][dil]}
                    </span>
                  ) : undefined
                }
                detay={o.aciklama[dil]}
                secili={secim === o.id}
                disabled={yukleniyor}
                onClick={() => setSecim(o.id)}
              />
            ))}
          </div>
          <KararOnay not={secim ? '' : M.sec[dil]} etiket={M.onayla[dil]} disabled={yukleniyor || !secim} onClick={() => secim && onVer(secim)} />
        </>
      )}
    </KararKatman>
  );
}
