import { useDil } from '../DilContext';

export function HaberlerPaneli({ haberler }: { haberler: string[] }) {
  const { m } = useDil();
  if (haberler.length === 0) return null;

  return (
    <div className="haberler-paneli">
      <h3>{m.hbBaslikTam}</h3>
      <ul className="haberler-listesi">
        {haberler.map((haber, i) => (
          <li key={i}>{haber}</li>
        ))}
      </ul>
    </div>
  );
}
