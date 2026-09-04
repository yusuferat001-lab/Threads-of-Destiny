import type { HayatOlayi } from '../types';
import { useDil } from '../DilContext';

export function HayatHikayesi({ hikaye }: { hikaye: HayatOlayi[] }) {
  const { m } = useDil();
  if (hikaye.length === 0) return null;

  return (
    <div className="hayat-hikayesi">
      <h3>{m.hhBaslik}</h3>
      <ol className="hayat-hikayesi-liste">
        {hikaye.map((olay, i) => (
          <li key={i}>
            <span className="hayat-hikayesi-ikon">{olay.ikon}</span>
            <span className="hayat-hikayesi-yil">{olay.yil}</span>
            <span className="hayat-hikayesi-baslik">{olay.baslik}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
