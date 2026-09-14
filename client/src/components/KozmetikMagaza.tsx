import { useEffect, useRef, useState } from 'react';
import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';
import { KOZMETIK_KATALOG, type KozmetikKategori } from '../kozmetikKatalog';
import {
  kozmetikSahipListesiGetir,
  kozmetikGiyilenlerGetir,
  kozmetikSatinAl,
  kozmetikGiy,
  kozmetikCikar,
  type GiyilenKozmetikler,
} from '../kozmetikDolabi';
import { goldBakiyeGetir } from '../gold';
import { KarakterAvatari } from './KarakterAvatari';

interface Props {
  dil: Dil;
  onKapat: () => void;
  /** Satın alma/giyme sonrası ana ekranın Gold bakiyesini/avatar giysisini tazelemesi için. */
  onDegisti: () => void;
}

const KATEGORI_SIRA: KozmetikKategori[] = ['bas', 'sirt', 'cerceve'];

export function KozmetikMagaza({ dil, onKapat, onDegisti }: Props) {
  const M = metinler(dil);
  const kapatRef = useRef<HTMLButtonElement>(null);

  const [bakiye, setBakiye] = useState(() => goldBakiyeGetir());
  const [sahipListe, setSahipListe] = useState(() => new Set(kozmetikSahipListesiGetir()));
  const [giyilen, setGiyilen] = useState<GiyilenKozmetikler>(() => kozmetikGiyilenlerGetir());
  const [mesaj, setMesaj] = useState<string | null>(null);

  useEffect(() => {
    kapatRef.current?.focus();
    function esc(e: KeyboardEvent) {
      if (e.key === 'Escape') onKapat();
    }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onKapat]);

  function tazele() {
    setBakiye(goldBakiyeGetir());
    setSahipListe(new Set(kozmetikSahipListesiGetir()));
    setGiyilen(kozmetikGiyilenlerGetir());
    onDegisti();
  }

  function satinAlVeGiy(id: string) {
    if (kozmetikSatinAl(id)) {
      kozmetikGiy(id);
      setMesaj(null);
      tazele();
    } else {
      setMesaj(M.kzYetersizGold);
    }
  }

  function giy(id: string) {
    kozmetikGiy(id);
    tazele();
  }

  function cikar(kategori: KozmetikKategori) {
    kozmetikCikar(kategori);
    tazele();
  }

  const kategoriBaslik: Record<KozmetikKategori, string> = {
    bas: M.kzKategoriBas,
    sirt: M.kzKategoriSirt,
    cerceve: M.kzKategoriCerceve,
  };
  const nadirEtiket = { yaygin: M.bgNadirYaygin, nadir: M.bgNadirNadir, efsanevi: M.bgNadirEfsanevi };

  return (
    <div className="ayarlar-katman" onClick={onKapat}>
      <div
        className="ayarlar-modal kozmetik-magaza-modal"
        role="dialog"
        aria-modal="true"
        aria-label={M.kzBaslik}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ayarlar-modal-ust">
          <h2>
            🎨 {M.kzBaslik} · <span className="kozmetik-bakiye">🪙 {bakiye}</span>
          </h2>
          <button ref={kapatRef} className="ikincil ayarlar-kapat" onClick={onKapat}>
            ✕ {M.kapat}
          </button>
        </div>

        <div className="ayarlar-govde kozmetik-govde">
          <div className="kozmetik-onizleme">
            <KarakterAvatari kisilik={['Sosyal', 'Cesur']} giyilenKozmetikler={giyilen} />
            <p className="kozmetik-onizleme-not">{M.kzOnizlemeNot}</p>
            {mesaj && <p className="kozmetik-mesaj">{mesaj}</p>}
          </div>

          {KATEGORI_SIRA.map((kategori) => {
            const esyalar = KOZMETIK_KATALOG.filter((e) => e.kategori === kategori);
            return (
              <section key={kategori} className="kozmetik-grup">
                <div className="kozmetik-grup-baslik">
                  <h3>{kategoriBaslik[kategori]}</h3>
                  {giyilen[kategori] && (
                    <button className="ikincil kozmetik-cikar-buton" onClick={() => cikar(kategori)}>
                      {M.kzCikar}
                    </button>
                  )}
                </div>
                <div className="kozmetik-izgara">
                  {esyalar.map((e) => {
                    const sahip = sahipListe.has(e.id);
                    const giyili = giyilen[kategori] === e.id;
                    return (
                      <div
                        key={e.id}
                        className={`kozmetik-kart kozmetik-nadir-${e.nadirlik}${giyili ? ' kozmetik-kart-giyili' : ''}`}
                      >
                        <span className="kozmetik-kart-ikon" aria-hidden="true">
                          {e.emoji ?? '⭕'}
                          {e.renk && (
                            <span className="kozmetik-renk-ornek" style={{ background: e.renk }} aria-hidden />
                          )}
                        </span>
                        <strong>{e.ad[dil]}</strong>
                        <span className={`kozmetik-kart-nadir kozmetik-nadir-etiket-${e.nadirlik}`}>
                          {nadirEtiket[e.nadirlik]}
                        </span>
                        {giyili ? (
                          <span className="kozmetik-giyili-etiket">✓ {M.kzGiyili}</span>
                        ) : sahip ? (
                          <button className="ikincil" onClick={() => giy(e.id)}>
                            {M.kzGiy}
                          </button>
                        ) : (
                          <button onClick={() => satinAlVeGiy(e.id)} disabled={bakiye < e.fiyat}>
                            🪙 {e.fiyat}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
