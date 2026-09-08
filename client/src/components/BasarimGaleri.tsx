import { useEffect, useRef } from 'react';
import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';
import { BASARIMLAR, acilanBasarimIdleri } from '../basarimSistemi';

interface Props {
  dil: Dil;
  onKapat: () => void;
}

export function BasarimGaleri({ dil, onKapat }: Props) {
  const M = metinler(dil);
  const acilan = acilanBasarimIdleri();
  const kapatRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    kapatRef.current?.focus();
    function esc(e: KeyboardEvent) {
      if (e.key === 'Escape') onKapat();
    }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onKapat]);

  const toplam = BASARIMLAR.length;
  const acikSayi = BASARIMLAR.filter((b) => acilan.has(b.id)).length;

  return (
    <div className="ayarlar-katman" onClick={onKapat}>
      <div
        className="ayarlar-modal basarim-galeri-modal"
        role="dialog"
        aria-modal="true"
        aria-label={M.bgBaslik}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ayarlar-modal-ust">
          <h2>
            🏆 {M.bgBaslik} ({acikSayi}/{toplam})
          </h2>
          <button ref={kapatRef} className="ikincil ayarlar-kapat" onClick={onKapat}>
            ✕ {M.kapat}
          </button>
        </div>

        <div className="ayarlar-govde">
          <div className="basarim-galeri-izgara">
            {BASARIMLAR.map((b) => {
              const acik = acilan.has(b.id);
              const gizliKilitli = b.gizli && !acik;
              return (
                <div key={b.id} className={`basarim-karti${acik ? ' basarim-karti-acik' : ' basarim-karti-kilitli'}`}>
                  <span className="basarim-karti-ikon" aria-hidden="true">
                    {acik ? b.ikon : '🔒'}
                  </span>
                  <strong>{gizliKilitli ? '???' : b.ad[dil]}</strong>
                  <span className="basarim-karti-aciklama">
                    {gizliKilitli ? M.bgGizli : b.aciklama[dil]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
