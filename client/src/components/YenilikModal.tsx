import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';

interface Props {
  dil: Dil;
  onKapat: () => void;
}

/** İlk açılışta beliren, sonra bir daha görünmeyen "Yenilikler" bildirimi (bkz. yenilikler.ts). */
export function YenilikModal({ dil, onKapat }: Props) {
  const M = metinler(dil);

  const maddeler = [M.ynMadde1, M.ynMadde2, M.ynMadde3, M.ynMadde4];

  return (
    <div className="ayarlar-katman" onClick={onKapat}>
      <div
        className="ayarlar-modal yenilik-modal"
        role="dialog"
        aria-modal="true"
        aria-label={M.ynBaslik}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ayarlar-modal-ust">
          <h2>✨ {M.ynBaslik}</h2>
          <button className="ikincil ayarlar-kapat" onClick={onKapat}>
            ✕ {M.kapat}
          </button>
        </div>

        <div className="ayarlar-govde yenilik-govde">
          <p className="yenilik-alt-baslik">{M.ynAltBaslik}</p>
          <ul className="yenilik-liste">
            {maddeler.map((madde, i) => (
              <li key={i}>{madde}</li>
            ))}
          </ul>
          <button className="yenilik-tamam-buton" onClick={onKapat}>
            {M.ynTamam}
          </button>
        </div>
      </div>
    </div>
  );
}
