import type { FinansOzeti } from '../types';
import { formatPara } from '../format';
import { useDil } from '../DilContext';

interface FinansOzetPaneliProps {
  finans: FinansOzeti | null;
  maasYillikYedek: number;
  paraBirimi: string;
}

/** Sol paneldeki kompakt gelir/gider/net özeti + şu an etkin dünya olayları —
 *  oyuncunun her an göz ucuyla bakabileceği özet. Maaşın tam kırılımı
 *  "Gelir & Gider" ekranındaki açılır dökümde. */
export function FinansOzetPaneli({ finans, maasYillikYedek, paraBirimi }: FinansOzetPaneliProps) {
  const { m } = useDil();
  const dunyaEtkileri = finans?.dunyaEtkileri ?? [];
  // "Yıllık gelir" = maaş + (varsa) mülklerden gelen tahmini yıllık net gelir; ikisi ayrı akış
  // ama oyuncunun göz ucuyla baktığı özet için toplamı daha anlamlı.
  const gelir = (finans?.maasYillik ?? maasYillikYedek) + (finans?.gayrimenkulYillikGelir ?? 0);
  const toplamGider = finans
    ? finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.savasVergisi
    : null;
  const net = finans ? finans.netYillik + finans.gayrimenkulYillikGelir : null;

  return (
    <div className="finans-ozet-mini">
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">{m.foYillikGelir}</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-pozitif">
          +{formatPara(gelir)} {paraBirimi}
        </span>
      </div>
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">{m.foYillikGider}</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-negatif">
          {toplamGider === null ? '…' : `-${formatPara(toplamGider)} ${paraBirimi}`}
        </span>
      </div>
      <div
        className={`finans-ozet-mini-satir finans-ozet-mini-net${net !== null && net < 0 ? ' finans-ozet-mini-net-negatif' : ''}`}
      >
        <span className="finans-ozet-mini-etiket">{m.foElineKalan}</span>
        <span className="finans-ozet-mini-deger">
          {net === null ? '…' : `${net >= 0 ? '+' : ''}${formatPara(net)} ${paraBirimi}`}
        </span>
      </div>

      {dunyaEtkileri.length > 0 && (
        <div className="finans-ozet-mini-dunya" title={dunyaEtkileri.map((e) => `${e.ikon} ${e.metin}`).join('\n')}>
          {dunyaEtkileri.map((e, i) => (
            <span key={i} className="finans-ozet-mini-dunya-cip">
              {e.ikon} {e.metin.split(':')[0]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
