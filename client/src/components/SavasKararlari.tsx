import { useEffect, useState } from 'react';
import type { SavasKarariDurumu } from '../types';
import { useDil } from '../DilContext';
import { GucKarsilastirma, KararKatman, KararOnay, KararSatiri } from './KararKabuk';

const M = {
  baslik: {
    plan: { tr: 'Savaş Planı', en: 'War Plan' },
    gun: { tr: 'Savaş Günü', en: 'Day of Battle' },
    esir: { tr: 'Esirlerin Kaderi', en: 'Fate of Prisoners' },
  },
  alt: {
    plan: {
      tr: 'Savaş başladı. Bu seçimler savaş boyunca geçerli olur; ikmali sonradan yalnız Ordu ekranından değiştirebilirsin.',
      en: 'The war has begun. These choices hold for the whole war; only supply can be changed later, from the Army screen.',
    },
    gun: {
      tr: 'Karar savaşı bu yıl. Seçimlerin sonucu belirler; zaman, hepsini vermeden ilerlemez.',
      en: 'The decisive battle is this year. Your choices shape the outcome; time does not move until you make them all.',
    },
    esir: {
      tr: 'İlk esirler alındı. Kararın savaş boyunca geçerli olur.',
      en: 'The first prisoners were taken. Your decision holds for the whole war.',
    },
  },
  dusman: { tr: 'Düşmanın baskın birliği', en: "Enemy's main force" },
  kiyasNot: {
    tr: 'Saldırırsan senin saldırın düşmanın savunmasıyla, savunursan senin savunman düşmanın saldırısıyla yarışır.',
    en: 'If you attack, your attack meets their defence; if you defend, your defence meets their attack.',
  },
  hazirlikli: { tr: 'Düşman seni tanıyor; bu sefer hazırlıklı.', en: 'The enemy knows you now; this time they are prepared.' },
  sen: { tr: 'Sen', en: 'You' },
  dusmanKisa: { tr: 'Düşman', en: 'Enemy' },
  saldiriK: { tr: 'Saldırı', en: 'Attack' },
  savunmaK: { tr: 'Savunma', en: 'Defence' },
  onayla: { tr: 'Onayla', en: 'Confirm' },
  eksik: { tr: 'Her bölümden bir seçim yap.', en: 'Pick one from every section.' },
};
const DUSMAN_TUR: Record<string, { tr: string; en: string }> = {
  okcu: { tr: 'okçu', en: 'archers' },
  suvari: { tr: 'süvari', en: 'cavalry' },
  mizrakli: { tr: 'mızraklı', en: 'spearmen' },
  zirhli: { tr: 'zırhlı', en: 'armoured knights' },
  karma: { tr: 'karma', en: 'mixed' },
};

/** Senin değerin rakibin karşı aralığının üstündeyse yeşil, altındaysa kırmızı, içindeyse nötr. */
const renk = (sen: number, a: [number, number]) => (sen > a[1] ? 's-arti' : sen < a[0] ? 's-eksi' : 's-durum');

/**
 * Kapatılamaz savaş kararı penceresi: bir savaşta en çok iki-üç pencere çıkar.
 * Savaş Planı (ilk yıl: seferberlik + emir + ikmal), Savaş Günü (3. yıl: arazi + rol + inisiyatif), Esir (ilk esirde).
 * Kalan tüm adımlar bir arada gösterilir; "Onayla"da sırayla sunucuya gönderilir.
 */
export function SavasKararlari({ karar, yukleniyor, onSec }: { karar: SavasKarariDurumu; yukleniyor: boolean; onSec: (secimler: string[]) => void }) {
  const { dil } = useDil();
  const [secim, setSecim] = useState<Record<string, string>>({});
  // Pencere yeni bir grup için açılırsa seçimler sıfırlanır.
  useEffect(() => {
    setSecim({});
  }, [karar.grup, karar.adimlar.length]);
  const tamam = karar.adimlar.every((a) => !!secim[a.adim]);
  const k = karar.kiyas;
  return (
    <KararKatman simge="⚔️" baslik={M.baslik[karar.grup][dil]} alt={M.alt[karar.grup][dil]} genis>
      {karar.bilgi.dusmanTur && karar.grup === 'gun' && (
        <p className="kk-alt">
          {M.dusman[dil]}: <strong>{(DUSMAN_TUR[karar.bilgi.dusmanTur] ?? { tr: karar.bilgi.dusmanTur, en: karar.bilgi.dusmanTur })[dil]}</strong>
        </p>
      )}
      {k && karar.grup === 'gun' && (
        <div className="kk-kiyas">
          <GucKarsilastirma ben={k.oyuncu} dusman={k.dusman} dusmanTur={karar.bilgi.dusmanTur} renk={renk} />
          <small>{M.kiyasNot[dil]}</small>
          {k.hazirlikli && <small className="s-eksi">{M.hazirlikli[dil]}</small>}
        </div>
      )}
      {karar.adimlar.map((bolum) => (
        <section key={bolum.adim} className="kk-bolum">
          <h3>{bolum.baslik[dil]}</h3>
          <p className="kk-bolum-alt">{bolum.aciklama[dil]}</p>
          <div className="kk-liste">
            {bolum.secenekler.map((o) => (
              <KararSatiri
                key={o.id}
                simge={o.simge}
                ad={o.ad[dil]}
                detay={o.aciklama[dil]}
                secili={secim[bolum.adim] === o.id}
                disabled={yukleniyor}
                onClick={() => setSecim((s) => ({ ...s, [bolum.adim]: o.id }))}
              />
            ))}
          </div>
        </section>
      ))}
      <KararOnay not={tamam ? '' : M.eksik[dil]} etiket={M.onayla[dil]} disabled={yukleniyor || !tamam} onClick={() => onSec(karar.adimlar.map((a) => secim[a.adim]))} />
    </KararKatman>
  );
}
