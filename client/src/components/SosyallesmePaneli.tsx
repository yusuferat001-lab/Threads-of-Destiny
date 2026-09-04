import type { SosyallesmeYeri } from '../types';
import { useDil } from '../DilContext';

interface SosyallesmePaneliProps {
  yerler: SosyallesmeYeri[];
  yukleniyor: boolean;
  onGit: (yerId: string) => void;
  onGeriDon: () => void;
}

export function SosyallesmePaneli({ yerler, yukleniyor, onGit, onGeriDon }: SosyallesmePaneliProps) {
  const { m, kt } = useDil();

  return (
    <div className="ekran ekran-tam-sayfa ekran-sosyallesme">
      <h2>{m.spSosyallesBaslik}</h2>
      <p className="giris-aciklama">{m.spIntro}</p>

      {yerler.length === 0 && <p className="yatirim-islem-mesaji">{m.spMekanYok}</p>}

      <div className="tam-kaydirilan">
        <div className="yatirim-kartlari sosyallesme-kartlari">
          {yerler.map((yer) => (
            <button
              key={yer.id}
              className={`yatirim-kart sosyallesme-kart${yer.alkolluMu ? ' sosyallesme-kart-alkollu' : ''}`}
              disabled={yukleniyor}
              onClick={() => onGit(yer.id)}
            >
              <span className="meslek-simge">{yer.simge}</span>
              <strong>{kt(yer.ad)}</strong>
              <span className="meslek-aciklama">{kt(yer.aciklama)}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
