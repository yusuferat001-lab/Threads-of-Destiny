import type { PazarDurumu } from '../types';
import { useDil } from '../DilContext';
import { formatMusteri } from '../format';

/**
 * "📰 Piyasada Neler Oluyor": rakibin hamleleri, küçük esnaf olayları ve müşteri dağılımının
 * son yıldaki değişimi (§45 v8.1). Sayılar yalnız `sayilarGoster` iken (işletmeli meslekler) görünür.
 */
export function PiyasaHaberleri({ pazar, sayilarGoster, adet = 4 }: { pazar: PazarDurumu; sayilarGoster: boolean; adet?: number }) {
  const { dil } = useDil();
  const en = dil === 'en';
  const isaret = (v: number) => formatMusteri(dil, v, true);
  const dg = pazar.dagilim;
  const satir = (ad: string, n: number, degisim: number) => (
    <span>
      {ad} <strong>{formatMusteri(dil, n)}</strong> <small className={degisim > 0 ? 'piyasa-art' : degisim < 0 ? 'piyasa-eksi' : ''}>({isaret(degisim)})</small>
    </span>
  );
  if (pazar.haberler.length === 0 && !sayilarGoster) return null;
  return (
    <div className="piyasa-haberleri">
      <h4>📰 {en ? 'What is happening in the market' : 'Piyasada neler oluyor'}</h4>
      {sayilarGoster && (
        <div className="piyasa-dagilim">
          {satir(en ? 'Your customers' : 'Müşterilerin', dg.oyuncu, dg.oyuncuDegisim)}
          {pazar.rakipler.length > 0 && satir(pazar.rakipler.length > 1 ? (en ? 'Rivals' : 'Rakipler') : (en ? 'Rival' : 'Rakip'), dg.rakip, dg.rakipDegisim)}
          {satir(en ? 'Small traders' : 'Küçük esnaflar', dg.kucuk, dg.kucukDegisim)}
        </div>
      )}
      {pazar.haberler.length === 0 ? (
        <p className="piyasa-bos">{en ? 'Quiet so far.' : 'Şimdilik sakin.'}</p>
      ) : (
        <ul className="piyasa-liste">
          {pazar.haberler.slice(0, adet).map((h, i) => (
            <li key={`${h.yil}-${h.kod}-${i}`} className={`piyasa-haber piyasa-${h.yon}`}>
              <span className="piyasa-yon">{h.yon === 'olumlu' ? '🔺' : h.yon === 'olumsuz' ? '🔻' : '•'}</span>
              <span className="piyasa-metin">
                {h.simge} {en ? h.metin.en : h.metin.tr}
                {sayilarGoster && h.musteri !== 0 && (
                  <small className={h.musteri > 0 ? 'piyasa-art' : 'piyasa-eksi'}>
                    {' '}
                    ({isaret(h.musteri)} {en ? 'customers' : 'müşteri'})
                  </small>
                )}
              </span>
              <small className="piyasa-yil">{h.yil}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
