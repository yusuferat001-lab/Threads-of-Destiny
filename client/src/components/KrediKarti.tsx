import type { KrediConfig } from '../types';
import { formatPara } from '../format';
import { useDil } from '../DilContext';

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
  return (
    <section className="kredi-karti">
      <h4>🏦 {en ? 'Moneylender' : 'Tefeci'}</h4>
      {krediConfig?.aktifKredi ? (
        <div className="dedikodu-panosu">
          <p>
            {en ? 'Outstanding debt' : 'Kalan borç'}: <strong>{formatPara(krediConfig.aktifKredi.kalanBorc)} {paraBirimi}</strong>
            {' · '}
            {en ? 'yearly instalment' : 'yıllık taksit'} ~{formatPara(krediConfig.aktifKredi.yillikTaksit)}
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
          <div className="kariyer-bagis-kademeler">
            {krediConfig.teklifler.map((t) => (
              <button key={t.id} className="kariyer-bagis-cip" disabled={yukleniyor} title={en ? t.ad.en : t.ad.tr} onClick={() => onKrediAl(t.id)}>
                <strong>{formatPara(t.tutar)} {paraBirimi}</strong>
                <br />
                {en ? 'interest' : 'faiz'} %{Math.round(t.faiz * 100)} · {en ? 'term' : 'vade'} {t.vade} {en ? 'yrs' : 'yıl'}
                <br />
                {en ? 'yearly instalment' : 'yıllık taksit'} {formatPara(t.taksit)} {paraBirimi}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="giris-aciklama">{en ? 'The moneylender turns you away for now.' : 'Tefeci şimdilik sana borç vermiyor.'}</p>
      )}
    </section>
  );
}
