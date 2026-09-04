import { useDil } from '../DilContext';

interface SiyasetPaneliProps {
  cag: string;
  hizip: string | null;
}

export function SiyasetPaneli({ cag, hizip }: SiyasetPaneliProps) {
  const { m, kt } = useDil();
  return (
    <div className="siyaset-paneli">
      {hizip && (
        <div className="siyaset-kutu">
          <span className="siyaset-kutu-etiket">{m.syHizbin}</span>
          <strong>🏴 {kt(hizip)}</strong>
        </div>
      )}
      <div className="siyaset-donem">
        <span aria-hidden="true">⏳</span> {m.syDonemEki}: {kt(cag)}
      </div>
    </div>
  );
}
