import type { BolgeIstatistigi } from '../types';

interface BolgeBilgisiPaneliProps {
  bolge: string;
  bilgi: BolgeIstatistigi | null;
}

export function BolgeBilgisiPaneli({ bolge, bilgi }: BolgeBilgisiPaneliProps) {
  if (!bilgi) return null;

  return (
    <div className="bolge-bilgisi-paneli">
      <h3>{bolge} Hakkında</h3>
      <p className="bolge-bilgisi-nufus">👥 Tahmini nüfus: {bilgi.nufusTahmini}</p>
      <ul className="bolge-bilgisi-notlar">
        {bilgi.notlar.map((not) => (
          <li key={not}>{not}</li>
        ))}
      </ul>
    </div>
  );
}
