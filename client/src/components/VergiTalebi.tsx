import { useDil } from '../DilContext';
import { formatPara } from '../format';
import type { YonetimTalep } from '../types';

const M = {
  baslik: { tr: 'Ekstra Vergi', en: 'Extra Tax' },
  govde: {
    tr: '{0} işletmenin kazancını fark etti ve senden ekstra vergi istiyor: {1} {2}. Yanıt vermeden hayatına devam edemezsin.',
    en: '{0} has noticed your business earnings and demands an extra tax: {1} {2}. You cannot carry on until you answer.',
  },
  ode: { tr: 'Öde', en: 'Pay' },
  rusvet: { tr: 'Rüşvet ver', en: 'Offer a bribe' },
};

/** Kapatılamaz tam ekran ekstra vergi penceresi: Öde / Rüşvet ver seçilmeden oyun ilerlemez. */
export function VergiTalebi({
  talep,
  paraBirimi,
  yukleniyor,
  onKarar,
}: {
  talep: YonetimTalep;
  paraBirimi: string;
  yukleniyor: boolean;
  onKarar: (karar: 'kabul' | 'rusvet') => void;
}) {
  const { dil } = useDil();
  const metin = M.govde[dil]
    .replace('{0}', talep.kimAdi)
    .replace('{1}', formatPara(talep.tutar))
    .replace('{2}', paraBirimi);
  return (
    <div className="ogreti-katman" role="alertdialog" aria-modal="true">
      <div className="ogreti-kutu">
        <h2>🏛️ {M.baslik[dil]}</h2>
        <p>{metin}</p>
        <div className="ogreti-kartlar">
          <div className="ogreti-kart">
            <button disabled={yukleniyor} onClick={() => onKarar('kabul')}>
              {M.ode[dil]}
            </button>
          </div>
          <div className="ogreti-kart">
            <button disabled={yukleniyor} onClick={() => onKarar('rusvet')}>
              {M.rusvet[dil]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
