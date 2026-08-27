interface IliskilerPaneliProps {
  dostAdi: string;
  rakipAdi: string;
  dostPuani: number;
  rakipPuani: number;
}

const DOST_ETIKETLERI: [number, string][] = [
  [20, 'Küskün'],
  [40, 'Mesafeli'],
  [60, 'Tanıdık'],
  [80, 'Dost'],
  [100, 'Yakın Dost'],
];

const RAKIP_ETIKETLERI: [number, string][] = [
  [20, 'Amansız Düşman'],
  [40, 'Düşman'],
  [60, 'Gergin'],
  [80, 'Nötr Rakip'],
  [100, 'Yumuşamış Rakip'],
];

function etiketBul(deger: number, tablo: [number, string][]): string {
  for (const [esik, etiket] of tablo) {
    if (deger <= esik) return etiket;
  }
  return tablo[tablo.length - 1][1];
}

export function IliskilerPaneli({ dostAdi, rakipAdi, dostPuani, rakipPuani }: IliskilerPaneliProps) {
  return (
    <div className="iliskiler-paneli">
      <h3>İlişkilerin</h3>
      <div className="iliski-rozet iliski-dost">
        <span className="iliski-ad">🤝 {dostAdi}</span>
        <span className="iliski-etiket">{etiketBul(dostPuani, DOST_ETIKETLERI)}</span>
      </div>
      <div className="iliski-rozet iliski-rakip">
        <span className="iliski-ad">⚔️ {rakipAdi}</span>
        <span className="iliski-etiket">{etiketBul(rakipPuani, RAKIP_ETIKETLERI)}</span>
      </div>
    </div>
  );
}
