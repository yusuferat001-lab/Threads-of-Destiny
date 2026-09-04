import type { BolgeIstatistigi } from '../types';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface BolgeBilgisiPaneliProps {
  bolge: string;
  bilgi: BolgeIstatistigi | null;
}

export function BolgeBilgisiPaneli({ bolge, bilgi }: BolgeBilgisiPaneliProps) {
  const { m, kt } = useDil();
  if (!bilgi) return null;

  return (
    <div className="bolge-bilgisi-paneli">
      <h3>{bic(m.bbHakkinda, kt(bolge))}</h3>
      <p className="bolge-bilgisi-nufus">{m.bbNufusTam}: {kt(bilgi.nufusTahmini)}</p>
      <ul className="bolge-bilgisi-notlar">
        {bilgi.notlar.map((not) => (
          <li key={not}>{kt(not)}</li>
        ))}
      </ul>
    </div>
  );
}
