import type { ButceKalemleri } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { BilgiNotu } from './BilgiNotu';
import './butce-iki-sutun.css';

/**
 * İki sütunlu bütçe (v67 Madde 8): SOL sütun gelir (yeşil), SAĞ sütun gider (kırmızı), her iki sütunun altında toplam;
 * altta tam genişlikte "Kazanç" (= ele kalan, vergi sonrası). Mobilde de PC'de de yan yana. Dört meslek aynı bileşeni kullanır;
 * satırlar sunucudan gelir (`butce.kalemler`), burada satır dizilmez.
 */
export function ButceIkiSutun({ kalemler, kazanc, paraBirimi }: { kalemler: ButceKalemleri; kazanc: number; paraBirimi: string }) {
  const { dil } = useDil();
  const tr = dil !== 'en';
  const topla = (l: { tutar: number }[]) => l.reduce((t, x) => t + x.tutar, 0);
  const gelirToplam = topla(kalemler.gelir);
  const giderToplam = topla(kalemler.gider);
  return (
    <div className="butce2">
      <div className="butce2-sutun">
        <div className="butce2-baslik s-gelir">{tr ? 'Gelir' : 'Income'}</div>
        {kalemler.gelir.map((k) => (
          <div key={k.kod} className="butce2-satir">
            <span>
              {k.ad[dil]}
              {k.not && <BilgiNotu etiket={tr ? 'Bilgi' : 'Info'} metin={k.not[dil]} />}
            </span>
            <strong className="s-gelir">+{formatPara(k.tutar)}</strong>
          </div>
        ))}
        <div className="butce2-satir butce2-toplam">
          <span>{tr ? 'Toplam gelir' : 'Total income'}</span>
          <strong className="s-gelir">+{formatPara(gelirToplam)}</strong>
        </div>
      </div>
      <div className="butce2-sutun">
        <div className="butce2-baslik s-gider">{tr ? 'Gider' : 'Costs'}</div>
        {kalemler.gider.map((k) => (
          <div key={k.kod} className="butce2-satir">
            <span>
              {k.ad[dil]}
              {k.not && <BilgiNotu etiket={tr ? 'Bilgi' : 'Info'} metin={k.not[dil]} />}
            </span>
            <strong className="s-gider">−{formatPara(k.tutar)}</strong>
          </div>
        ))}
        <div className="butce2-satir butce2-toplam">
          <span>{tr ? 'Toplam gider' : 'Total costs'}</span>
          <strong className="s-gider">−{formatPara(giderToplam)}</strong>
        </div>
      </div>
      <div className="butce2-kazanc">
        <span>{tr ? 'Kazanç' : 'Earnings'}</span>
        <strong className={kazanc >= 0 ? 's-gelir' : 's-gider'}>
          {kazanc >= 0 ? '+' : '−'}
          {formatPara(Math.abs(kazanc))} {paraBirimi}
        </strong>
      </div>
    </div>
  );
}
