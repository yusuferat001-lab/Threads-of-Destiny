import { useEffect, useRef } from 'react';
import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';
import { kt as ktRaw } from '../katalog';
import {
  BASARIMLAR,
  GRUP_SIRA,
  acilanBasarimIdleri,
  oyunIstatistigiGetir,
  koleksiyonSayilari,
  type BasarimGrubu,
  type IlerlemeBaglami,
} from '../basarimSistemi';

interface Props {
  dil: Dil;
  /** Ham unvan/efsanevi-ölüm koleksiyonu (basarimlar.ts) — koleksiyon grubunda listelenir. */
  basarimlar: { unvanlar: string[]; olumler: string[] };
  onKapat: () => void;
}

export function BasarimGaleri({ dil, basarimlar, onKapat }: Props) {
  const M = metinler(dil);
  const kt = (tr: string) => ktRaw(dil, tr);
  const acilan = acilanBasarimIdleri();
  const baglam: IlerlemeBaglami = {
    istatistik: oyunIstatistigiGetir(),
    koleksiyon: koleksiyonSayilari(),
  };
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

  const grupBaslik: Record<BasarimGrubu, string> = {
    kilometre: M.bgGrupKilometre,
    tarz: M.bgGrupTarz,
    kesif: M.bgGrupKesif,
    dunya: M.bgGrupDunya,
    koleksiyon: M.bgGrupKoleksiyon,
  };
  const nadirEtiket = { yaygin: M.bgNadirYaygin, nadir: M.bgNadirNadir, efsanevi: M.bgNadirEfsanevi };

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
          {GRUP_SIRA.map((grup) => {
            const grupBasarimlari = BASARIMLAR.filter((b) => b.grup === grup);
            if (grupBasarimlari.length === 0) return null;
            const grupAcik = grupBasarimlari.filter((b) => acilan.has(b.id)).length;
            return (
              <section key={grup} className="basarim-galeri-grup">
                <h3 className="basarim-galeri-grup-baslik">
                  {grupBaslik[grup]} <span>({grupAcik}/{grupBasarimlari.length})</span>
                </h3>
                <div className="basarim-galeri-izgara">
                  {grupBasarimlari.map((b) => {
                    const acik = acilan.has(b.id);
                    const gizliKilitli = b.gizli && !acik;
                    const ilerleme = !acik && !b.gizli && b.ilerleme ? b.ilerleme(baglam) : null;
                    const yuzde = ilerleme && ilerleme[1] > 0 ? Math.round((ilerleme[0] / ilerleme[1]) * 100) : 0;
                    return (
                      <div
                        key={b.id}
                        className={`basarim-karti${acik ? ' basarim-karti-acik' : ' basarim-karti-kilitli'} basarim-nadir-${b.nadirlik}`}
                      >
                        <span className="basarim-karti-ikon" aria-hidden="true">
                          {acik ? b.ikon : '🔒'}
                        </span>
                        <strong>{gizliKilitli ? '???' : b.ad[dil]}</strong>
                        <span className="basarim-karti-aciklama">
                          {gizliKilitli ? M.bgGizli : b.aciklama[dil]}
                        </span>
                        {!gizliKilitli && (
                          <span className={`basarim-karti-nadir basarim-nadir-etiket-${b.nadirlik}`}>
                            {nadirEtiket[b.nadirlik]}
                          </span>
                        )}
                        {ilerleme && (
                          <div className="basarim-karti-ilerleme" aria-hidden="true">
                            <div className="basarim-karti-ilerleme-dolu" style={{ width: `${yuzde}%` }} />
                            <span className="basarim-karti-ilerleme-metin">
                              {M.bgIlerleme.replace('{0}', String(ilerleme[0])).replace('{1}', String(ilerleme[1]))}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {grup === 'koleksiyon' && (basarimlar.unvanlar.length > 0 || basarimlar.olumler.length > 0) && (
                  <div className="basarim-galeri-ham-liste">
                    <h4 className="basarim-galeri-ham-baslik">
                      {M.panelBasarimlar} ({basarimlar.unvanlar.length + basarimlar.olumler.length})
                    </h4>
                    <div className="basarimlar-listesi">
                      {basarimlar.unvanlar.map((u) => (
                        <span key={u} className="liderlik-rozet liderlik-rozet-unvan">
                          🏵️ {kt(u)}
                        </span>
                      ))}
                      {basarimlar.olumler.map((o) => (
                        <span key={o} className="liderlik-rozet liderlik-rozet-olum">
                          💀 {kt(o)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
