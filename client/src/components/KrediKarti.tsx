import type { KrediConfig } from '../types';
import { formatPara } from '../format';
import { useDil } from '../DilContext';
import { useState } from 'react';
import { KararOnay, KararSatiri } from './KararKabuk';

interface KrediKartiProps {
  paraBirimi: string;
  krediConfig: KrediConfig | null;
  yukleniyor: boolean;
  onKrediAl: (teklifId: string) => void;
  onKrediPazarlik: () => void;
}

/** Tefeci / kredi kartı — işletme Yatırım sayfasında, tüm mesleklerde. İki teklif (farklı faiz/vade) ya da aktif borç. */
export function KrediKarti({ paraBirimi, krediConfig, yukleniyor, onKrediAl, onKrediPazarlik }: KrediKartiProps) {
  const { dil } = useDil();
  const en = dil === 'en';
  const [secim, setSecim] = useState<string | null>(null);
  return (
    <section className="kredi-karti">
      <h4>🏦 {en ? 'Moneylender' : 'Tefeci'}</h4>
      {krediConfig?.aktifKredi ? (
        <div className="dedikodu-panosu">
          <p>
            {en ? 'Outstanding debt' : 'Kalan borç'}: <strong className="s-gider">{formatPara(krediConfig.aktifKredi.kalanBorc)} {paraBirimi}</strong>
            {' · '}
            {en ? 'yearly instalment' : 'yıllık taksit'} <span className="s-gider">~{formatPara(krediConfig.aktifKredi.yillikTaksit)}</span>
            {' · '}
            {en ? 'interest' : 'faiz'} %{Math.round(krediConfig.aktifKredi.faizOrani * 100)}
            {' · '}
            {en ? 'term' : 'vade'} {krediConfig.aktifKredi.vadeYil} {en ? 'yrs' : 'yıl'}
          </p>
          {!krediConfig.aktifKredi.pazarlikYapildi && (
            <button className="ikincil" disabled={yukleniyor} onClick={onKrediPazarlik}>
              {en ? 'Haggle the interest' : 'Faizi pazarlık et'}
            </button>
          )}
        </div>
      ) : krediConfig && krediConfig.teklifler.length > 0 ? (
        <div className="dedikodu-panosu">
          <p className="giris-aciklama">
            {en
              ? 'Pick one of the two offers. You repay in equal yearly instalments, and he lends even when you are in the red.'
              : 'İki tekliften birini seç. Eşit yıllık taksitlerle ödersin; nakdin eksideyken bile tefeci borç verir.'}
          </p>
          <div className="kk-liste kk-secimler">
            {krediConfig.teklifler.map((t) => (
              <KararSatiri
                key={t.id}
                kol="sadik"
                simge="💰"
                dal={en ? `${t.vade}-year term` : `${t.vade} yıl vade`}
                ad={`${formatPara(t.tutar)} ${paraBirimi}`}
                cipler={
                  <>
                    <span className="kk-cip">{en ? 'interest' : 'faiz'} %{Math.round(t.faiz * 100)}</span>
                    <span className="kk-cip s-gider">{en ? 'instalment' : 'taksit'} {formatPara(t.taksit)} {paraBirimi}</span>
                  </>
                }
                secili={secim === t.id}
                disabled={yukleniyor}
                onClick={() => setSecim(t.id)}
              />
            ))}
          </div>
          <KararOnay
            not={secim ? (en ? 'The loan is repaid in equal yearly instalments.' : 'Kredi eşit yıllık taksitlerle ödenir.') : en ? 'Pick an offer.' : 'Bir teklif seç.'}
            etiket={en ? 'Take the loan' : 'Krediyi al'}
            disabled={yukleniyor || !secim}
            onClick={() => secim && onKrediAl(secim)}
          />
        </div>
      ) : (
        <p className="giris-aciklama">{en ? 'The moneylender turns you away for now.' : 'Tefeci şimdilik sana borç vermiyor.'}</p>
      )}
    </section>
  );
}
