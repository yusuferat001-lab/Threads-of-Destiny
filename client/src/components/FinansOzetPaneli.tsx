import type { FinansOzeti } from '../types';
import { formatPara } from '../format';

interface FinansOzetPaneliProps {
  finans: FinansOzeti | null;
  maasYillikYedek: number;
  paraBirimi: string;
}

/** Sol paneldeki kompakt gelir/gider/net özeti — "İşin" ekranındaki tam dökümün
 *  aksine, oyuncunun her an göz ucuyla bakabileceği üç satırlık bir özet. */
export function FinansOzetPaneli({ finans, maasYillikYedek, paraBirimi }: FinansOzetPaneliProps) {
  const gelir = finans?.maasYillik ?? maasYillikYedek;
  const toplamGider = finans
    ? finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.vergi +
      finans.giderKalemleri.savasVergisi
    : null;
  const net = finans?.netYillik ?? null;

  return (
    <div className="finans-ozet-mini">
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">💰 Yıllık gelir</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-pozitif">
          +{formatPara(gelir)} {paraBirimi}
        </span>
      </div>
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">📉 Yıllık gider</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-negatif">
          {toplamGider === null ? '…' : `-${formatPara(toplamGider)} ${paraBirimi}`}
        </span>
      </div>
      <div
        className={`finans-ozet-mini-satir finans-ozet-mini-net${net !== null && net < 0 ? ' finans-ozet-mini-net-negatif' : ''}`}
      >
        <span className="finans-ozet-mini-etiket">Eline kalan</span>
        <span className="finans-ozet-mini-deger">
          {net === null ? '…' : `${net >= 0 ? '+' : ''}${formatPara(net)} ${paraBirimi}`}
        </span>
      </div>
    </div>
  );
}
