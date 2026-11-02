import type { FinansOzeti, IsletmeGorunumu } from '../types';
import { kazancOzetiHesapla } from '../kazanc';
import { formatPara } from '../format';
import { useDil } from '../DilContext';

interface FinansOzetPaneliProps {
  finans: FinansOzeti | null;
  isletme: IsletmeGorunumu | null;
  maasYillikYedek: number;
  paraBirimi: string;
}

/** Sol paneldeki kompakt gelir/gider/kazanç özeti + şu an etkin dünya olayları —
 *  oyuncunun her an göz ucuyla bakabileceği özet. Sayılar ana ekran Kazanç paneliyle
 *  birebir aynı tanımdan gelir (kazanc.ts). Maaşın tam kırılımı Kariyer ekranındaki Bütçen'de. */
export function FinansOzetPaneli({ finans, isletme, maasYillikYedek, paraBirimi }: FinansOzetPaneliProps) {
  const { m } = useDil();
  const dunyaEtkileri = finans?.dunyaEtkileri ?? [];
  const ozet = isletme || finans ? kazancOzetiHesapla({ maas_yillik: maasYillikYedek }, isletme, finans) : null;

  return (
    <div className="finans-ozet-mini">
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">{m.foYillikGelir}</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-pozitif">
          {ozet === null ? '…' : `+${formatPara(Math.round(ozet.gelir))} ${paraBirimi}`}
        </span>
      </div>
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">{m.foYillikGider}</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-negatif">
          {ozet === null ? '…' : `-${formatPara(Math.round(ozet.gider))} ${paraBirimi}`}
        </span>
      </div>
      <div
        className={`finans-ozet-mini-satir finans-ozet-mini-net${ozet !== null && ozet.kazanc < 0 ? ' finans-ozet-mini-net-negatif' : ''}`}
      >
        <span className="finans-ozet-mini-etiket">{m.foElineKalan}</span>
        <span className="finans-ozet-mini-deger">
          {ozet === null ? '…' : `${ozet.kazanc >= 0 ? '+' : '−'}${formatPara(Math.abs(Math.round(ozet.kazanc * 10) / 10))} ${paraBirimi}`}
        </span>
      </div>

      {dunyaEtkileri.length > 0 && (
        <ul className="finans-ozet-mini-dunya">
          {dunyaEtkileri.map((e, i) => (
            <li key={i}>
              <span aria-hidden="true">{e.ikon}</span> {e.metin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
