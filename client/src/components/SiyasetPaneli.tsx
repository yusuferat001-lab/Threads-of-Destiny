interface SiyasetPaneliProps {
  cag: string;
  hizip: string | null;
  devletTakibinde: boolean;
}

export function SiyasetPaneli({ cag, hizip, devletTakibinde }: SiyasetPaneliProps) {
  return (
    <div className="siyaset-paneli">
      {hizip && (
        <div className="siyaset-kutu">
          <span className="siyaset-kutu-etiket">Hizbin</span>
          <strong>🏴 {hizip}</strong>
        </div>
      )}
      {devletTakibinde && <span className="siyaset-vergi-rozet">👑 Devletin vergi takibinde</span>}
      <div className="siyaset-donem">
        <span aria-hidden="true">⏳</span> Dönem: {cag}
      </div>
    </div>
  );
}
