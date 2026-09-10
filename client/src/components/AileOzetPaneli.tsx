import type { Cocuk, EvcilHayvan } from '../types';
import { HAYVAN_SIMGESI } from '../bolgeTema';
import { useDil } from '../DilContext';

interface AileOzetPaneliProps {
  esAdi: string | null;
  esMeslek: string | null;
  esRutbe: string | null;
  cocuklar: Cocuk[];
  evcilHayvan: EvcilHayvan | null;
}

export function AileOzetPaneli({ esAdi, esMeslek, esRutbe, cocuklar, evcilHayvan }: AileOzetPaneliProps) {
  const { m, kt } = useDil();
  const yasayanCocuklar = cocuklar.filter((c) => c.yasiyor);

  return (
    <div className="aile-ozet-paneli">
      {esAdi && (
        <div className="aile-ozet-satir">
          <span className="aile-ozet-simge" aria-hidden="true">
            💍
          </span>
          <div className="aile-ozet-metin">
            <span className="aile-ozet-ad">{esAdi}</span>
            <span className="aile-ozet-rol">
              {m.aoEsTek}{esRutbe && esMeslek ? ` · ${kt(esRutbe)} (${kt(esMeslek)})` : ''}
            </span>
          </div>
        </div>
      )}
      {yasayanCocuklar.length > 0 && (
        <div className="aile-ozet-satir">
          <span className="aile-ozet-simge" aria-hidden="true">
            🧒
          </span>
          <div className="aile-ozet-metin">
            <span className="aile-ozet-ad">{yasayanCocuklar.map((c) => c.isim).join(' & ')}</span>
            <span className="aile-ozet-rol">{yasayanCocuklar.length > 1 ? m.aoCocukCogul : m.aoCocukTek}</span>
          </div>
        </div>
      )}
      {evcilHayvan && (
        <div className="aile-ozet-satir">
          <span className="aile-ozet-simge" aria-hidden="true">
            {HAYVAN_SIMGESI[evcilHayvan.tur] ?? '🐾'}
          </span>
          <div className="aile-ozet-metin">
            <span className="aile-ozet-ad">{evcilHayvan.isim}</span>
            <span className="aile-ozet-rol">{m.aoEvcilHayvanTek}</span>
          </div>
        </div>
      )}
    </div>
  );
}
