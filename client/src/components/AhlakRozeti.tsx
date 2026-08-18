import { ahlakEtiketi } from '../bolgeTema';

export function AhlakRozeti({ ahlak }: { ahlak: number }) {
  return (
    <div className="ahlak-rozet-kutu">
      <span className="ahlak-rozet">{ahlakEtiketi(ahlak)}</span>
      <span className="dikey-bar-etiket">Ahlak</span>
    </div>
  );
}
