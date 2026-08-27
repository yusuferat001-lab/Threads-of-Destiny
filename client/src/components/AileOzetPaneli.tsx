import type { Cocuk, EvcilHayvan } from '../types';
import { HAYVAN_SIMGESI } from '../bolgeTema';

interface AileOzetPaneliProps {
  esAdi: string | null;
  esMeslek: string | null;
  esRutbe: string | null;
  cocuklar: Cocuk[];
  evcilHayvan: EvcilHayvan | null;
}

export function AileOzetPaneli({ esAdi, esMeslek, esRutbe, cocuklar, evcilHayvan }: AileOzetPaneliProps) {
  const yasayanCocuklar = cocuklar.filter((c) => c.yasiyor);
  const hicKimseYok = !esAdi && yasayanCocuklar.length === 0 && !evcilHayvan;

  return (
    <div className="aile-ozet-paneli">
      <h3>Aile</h3>
      {hicKimseYok && <p className="aile-ozet-bos">Henüz yalnızsın.</p>}
      {esAdi && (
        <div className="aile-ozet-satir">
          <span className="aile-ozet-simge" aria-hidden="true">
            💍
          </span>
          <div className="aile-ozet-metin">
            <span className="aile-ozet-ad">{esAdi}</span>
            <span className="aile-ozet-rol">
              Eş{esRutbe && esMeslek ? ` · ${esRutbe} (${esMeslek})` : ''}
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
            <span className="aile-ozet-rol">{yasayanCocuklar.length > 1 ? 'Çocuklar' : 'Çocuk'}</span>
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
            <span className="aile-ozet-rol">Evcil Hayvan</span>
          </div>
        </div>
      )}
    </div>
  );
}
