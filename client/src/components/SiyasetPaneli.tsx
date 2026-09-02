interface SiyasetPaneliProps {
  cag: string;
  hizip: string | null;
}

export function SiyasetPaneli({ cag, hizip }: SiyasetPaneliProps) {
  return (
    <div className="siyaset-paneli">
      {hizip && (
        <div className="siyaset-kutu">
          <span className="siyaset-kutu-etiket">Hizbin</span>
          <strong>🏴 {hizip}</strong>
        </div>
      )}
      <div className="siyaset-donem">
        <span aria-hidden="true">⏳</span> Dönem: {cag}
      </div>
    </div>
  );
}
