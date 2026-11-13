import { useEffect, useState } from 'react';
import type { SavasKarariDurumu } from '../types';
import { useDil } from '../DilContext';

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
  const aralik = (a: [number, number]) => `${a[0]}–${a[1]}`;
  return (
    <div className="ogreti-katman zemin-koyu" role="dialog" aria-modal="true">
      <div className="ogreti-kutu savas-kutu">
        <h2>⚔️ {M.baslik[karar.grup][dil]}</h2>
        <small>{M.alt[karar.grup][dil]}</small>
        {karar.bilgi.dusmanTur && karar.grup === 'gun' && (
          <p>
            <small>
              {M.dusman[dil]}: {(DUSMAN_TUR[karar.bilgi.dusmanTur] ?? { tr: karar.bilgi.dusmanTur, en: karar.bilgi.dusmanTur })[dil]}
            </small>
          </p>
        )}
        {k && karar.grup === 'gun' && (
          <div className="savas-kiyas">
            <table className="savas-kiyas-tablo">
              <thead>
                <tr>
                  <th />
                  <th>{M.sen[dil]}</th>
                  <th>{M.dusmanKisa[dil]}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>⚔️ {M.saldiriK[dil]}</th>
                  <td><strong>{k.oyuncu.saldiri}</strong></td>
                  <td>{aralik(k.dusman.saldiri)}</td>
                </tr>
                <tr>
                  <th>🛡️ {M.savunmaK[dil]}</th>
                  <td><strong>{k.oyuncu.savunma}</strong></td>
                  <td>{aralik(k.dusman.savunma)}</td>
                </tr>
              </tbody>
            </table>
            <small>{M.kiyasNot[dil]}</small>
          </div>
        )}
        {karar.adimlar.map((bolum) => (
          <section key={bolum.adim} className="savas-bolum">
            <h3>{bolum.baslik[dil]}</h3>
            <p className="ogreti-seviye">{bolum.aciklama[dil]}</p>
            <div className="ogreti-kartlar">
              {bolum.secenekler.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`ogreti-kart savas-secenek${secim[bolum.adim] === o.id ? ' secili' : ''}`}
                  aria-pressed={secim[bolum.adim] === o.id}
                  disabled={yukleniyor}
                  onClick={() => setSecim((s) => ({ ...s, [bolum.adim]: o.id }))}
                >
                  {o.simge && <div className="ogreti-simge">{o.simge}</div>}
                  <strong>
                    {secim[bolum.adim] === o.id ? '✓ ' : ''}
                    {o.ad[dil]}
                  </strong>
                  <p>{o.aciklama[dil]}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
        <button type="button" className="savas-onay" disabled={yukleniyor || !tamam} onClick={() => onSec(karar.adimlar.map((a) => secim[a.adim]))}>
          {M.onayla[dil]}
        </button>
        {!tamam && <small>{M.eksik[dil]}</small>}
      </div>
    </div>
  );
}
