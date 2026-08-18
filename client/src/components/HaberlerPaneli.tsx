export function HaberlerPaneli({ haberler }: { haberler: string[] }) {
  if (haberler.length === 0) return null;

  return (
    <div className="haberler-paneli">
      <h3>📰 Bölgeden Haberler</h3>
      <ul className="haberler-listesi">
        {haberler.map((haber, i) => (
          <li key={i}>{haber}</li>
        ))}
      </ul>
    </div>
  );
}
