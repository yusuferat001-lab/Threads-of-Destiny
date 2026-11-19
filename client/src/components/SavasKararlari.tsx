import { useEffect, useState } from 'react';
import type { SavasKarariDurumu } from '../types';
import { useDil } from '../DilContext';
import { GucKarsilastirma, KararKatman, KararSatiri } from './KararKabuk';

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
  geri: { tr: '← Geri', en: '← Back' },
  adim: { tr: 'Adım', en: 'Step' },
  ipucu: { tr: 'Seçince bir sonraki soruya geçilir; geri dönüp değiştirebilirsin.', en: 'Picking moves you to the next question; you can go back and change it.' },
  sonIpucu: { tr: 'Son soru: seçtiğin anda tüm kararlar uygulanır.', en: 'Last question: your pick applies all decisions at once.' },
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
 * v70: sorular SIRAYLA sorulur (çerçeve sabit, yalnız içindeki soru değişir); bir seçeneğe tıklayınca seçim
 * onaylanıp sonraki soruya geçilir, "← Geri" (ve ESC) bir önceki soruya döner; son sorudaki tıklama tüm
 * seçimleri sunucuya sırayla gönderir.
 */
export function SavasKararlari({ karar, yukleniyor, onSec }: { karar: SavasKarariDurumu; yukleniyor: boolean; onSec: (secimler: string[]) => void }) {
  const { dil } = useDil();
  const [secim, setSecim] = useState<Record<string, string>>({});
  const [adimNo, setAdimNo] = useState(0);
  // Pencere yeni bir grup için açılırsa seçimler ve adım sıfırlanır.
  useEffect(() => {
    setSecim({});
    setAdimNo(0);
  }, [karar.grup, karar.adimlar.length]);
  // ESC: bir önceki soruya dön (ilk soruda zorunlu pencere kapanmaz).
  useEffect(() => {
    const tus = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && adimNo > 0 && !yukleniyor) {
        e.preventDefault();
        setAdimNo((n) => Math.max(0, n - 1));
      }
    };
    window.addEventListener('keydown', tus);
    return () => window.removeEventListener('keydown', tus);
  }, [adimNo, yukleniyor]);
  const toplam = karar.adimlar.length;
  const bolum = karar.adimlar[Math.min(adimNo, toplam - 1)];
  const sonAdim = adimNo >= toplam - 1;
  const k = karar.kiyas;
  function sec(optId: string) {
    if (yukleniyor || !bolum) return;
    const yeni = { ...secim, [bolum.adim]: optId };
    setSecim(yeni);
    if (sonAdim) onSec(karar.adimlar.map((a) => yeni[a.adim]).filter(Boolean));
    else setAdimNo(adimNo + 1);
  }
  return (
    <KararKatman simge="⚔️" baslik={M.baslik[karar.grup][dil]} alt={M.alt[karar.grup][dil]} rozet={toplam > 1 ? `${M.adim[dil]} ${adimNo + 1} / ${toplam}` : undefined} genis sabit>
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
      {toplam > 1 && (
        <ol className="kk-adimlar" aria-label={M.adim[dil]}>
          {karar.adimlar.map((a, i) => {
            const secilen = a.secenekler.find((o) => o.id === secim[a.adim]);
            return (
              <li key={a.adim} className={`kk-adim${i === adimNo ? ' simdi' : i < adimNo ? ' bitti' : ''}`}>
                <span className="kk-adim-no">{i < adimNo ? '✓' : i + 1}</span>
                <span className="kk-adim-ad">{secilen && i < adimNo ? secilen.ad[dil] : a.baslik[dil]}</span>
              </li>
            );
          })}
        </ol>
      )}
      {bolum && (
        <section className="kk-bolum kk-soru">
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
                onClick={() => sec(o.id)}
              />
            ))}
          </div>
        </section>
      )}
      <div className="kk-onay">
        <button type="button" className="kk-geri-btn" disabled={yukleniyor || adimNo === 0} onClick={() => setAdimNo((n) => Math.max(0, n - 1))}>
          {M.geri[dil]}
        </button>
        <small className="kk-onay-not">{toplam > 1 ? (sonAdim ? M.sonIpucu[dil] : M.ipucu[dil]) : ''}</small>
      </div>
    </KararKatman>
  );
}
