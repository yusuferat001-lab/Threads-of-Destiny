import type { Cocuk, EvcilHayvan } from '../types';
import { HAYVAN_SIMGESI } from '../bolgeTema';
import { useDil } from '../DilContext';
import { hayvanBonusBilgisi } from '../hayvanBonus';

interface AileOzetPaneliProps {
  esAdi: string | null;
  esMeslek: string | null;
  esRutbe: string | null;
  cocuklar: Cocuk[];
  evcilHayvanlar: EvcilHayvan[];
}

export function AileOzetPaneli({ esAdi, esMeslek, esRutbe, cocuklar, evcilHayvanlar }: AileOzetPaneliProps) {
  const { m, kt, dil } = useDil();
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
      {evcilHayvanlar.map((hayvan) => {
        const bonus = hayvanBonusBilgisi(hayvan.bonus_id, dil);
        return (
          <div className="aile-ozet-satir" key={`${hayvan.tur}-${hayvan.isim}`} title={bonus?.aciklama}>
            <span className="aile-ozet-simge" aria-hidden="true">
              {HAYVAN_SIMGESI[hayvan.tur] ?? '🐾'}
            </span>
            <div className="aile-ozet-metin">
              <span className="aile-ozet-ad">{hayvan.isim}</span>
              <span className="aile-ozet-rol">
                {kt(hayvan.tur)}
                {bonus ? ` · ${m.aoHayvanPasif}: +${bonus.kisa}` : ''}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
