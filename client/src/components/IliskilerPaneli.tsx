import { useDil } from '../DilContext';
import type { Metinler } from '../i18n';

interface IliskilerPaneliProps {
  dostAdi: string;
  rakipAdi: string;
  dostPuani: number;
  rakipPuani: number;
}

function dostEtiketleri(m: Metinler): [number, string][] {
  return [
    [20, m.ilDostKusgun],
    [40, m.ilDostMesafeli],
    [60, m.ilDostTanidik],
    [80, m.ilDostDost],
    [100, m.ilDostYakin],
  ];
}

function rakipEtiketleri(m: Metinler): [number, string][] {
  return [
    [20, m.ilRakipAmansiz],
    [40, m.ilRakipDusman],
    [60, m.ilRakipGergin],
    [80, m.ilRakipNotr],
    [100, m.ilRakipYumusak],
  ];
}

function etiketBul(deger: number, tablo: [number, string][]): string {
  for (const [esik, etiket] of tablo) {
    if (deger <= esik) return etiket;
  }
  return tablo[tablo.length - 1][1];
}

export function IliskilerPaneli({ dostAdi, rakipAdi, dostPuani, rakipPuani }: IliskilerPaneliProps) {
  const { m } = useDil();
  return (
    <div className="iliskiler-paneli">
      <h3>{m.ilBaslik}</h3>
      <div className="iliski-rozet iliski-dost">
        <span className="iliski-ad">🤝 {dostAdi}</span>
        <span className="iliski-etiket">{etiketBul(dostPuani, dostEtiketleri(m))}</span>
      </div>
      <div className="iliski-rozet iliski-rakip">
        <span className="iliski-ad">⚔️ {rakipAdi}</span>
        <span className="iliski-etiket">{etiketBul(rakipPuani, rakipEtiketleri(m))}</span>
      </div>
    </div>
  );
}
