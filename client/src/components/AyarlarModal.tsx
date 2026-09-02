import { useEffect, useRef, useState } from 'react';
import type { Dil } from '../ayarlar';
import { metinler } from '../i18n';
import type { GeriBildirimGirdi, GeriBildirimKategori } from '../types';

interface Props {
  dil: Dil;
  sesKapali: boolean;
  onDilDegistir: (dil: Dil) => void;
  onSesToggle: () => void;
  onGeriBildirimGonder: (girdi: GeriBildirimGirdi) => Promise<void>;
  onKapat: () => void;
}

type Sekme = 'genel' | 'geri_bildirim';

const KATEGORILER: GeriBildirimKategori[] = ['hata', 'oneri', 'diger'];
const MAKS_MESAJ = 2000;

export function AyarlarModal({
  dil,
  sesKapali,
  onDilDegistir,
  onSesToggle,
  onGeriBildirimGonder,
  onKapat,
}: Props) {
  const M = metinler(dil);
  const [sekme, setSekme] = useState<Sekme>('genel');

  const [kategori, setKategori] = useState<GeriBildirimKategori>('oneri');
  const [mesaj, setMesaj] = useState('');
  const [iletisim, setIletisim] = useState('');
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderimDurumu, setGonderimDurumu] = useState<'yok' | 'basarili' | 'hata' | 'kisa'>('yok');

  const kapatRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    kapatRef.current?.focus();
    function esc(e: KeyboardEvent) {
      if (e.key === 'Escape') onKapat();
    }
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onKapat]);

  async function gonder() {
    if (mesaj.trim().length < 3) {
      setGonderimDurumu('kisa');
      return;
    }
    setGonderiliyor(true);
    setGonderimDurumu('yok');
    try {
      await onGeriBildirimGonder({
        kategori,
        mesaj: mesaj.trim(),
        iletisim: iletisim.trim() || undefined,
      });
      setGonderimDurumu('basarili');
      setMesaj('');
      setIletisim('');
    } catch {
      setGonderimDurumu('hata');
    } finally {
      setGonderiliyor(false);
    }
  }

  const kategoriEtiket: Record<GeriBildirimKategori, string> = {
    hata: M.gbKategoriHata,
    oneri: M.gbKategoriOneri,
    diger: M.gbKategoriDiger,
  };

  return (
    <div className="ayarlar-katman" onClick={onKapat}>
      <div
        className="ayarlar-modal"
        role="dialog"
        aria-modal="true"
        aria-label={M.ayarlarBaslik}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ayarlar-modal-ust">
          <h2>⚙️ {M.ayarlarBaslik}</h2>
          <button ref={kapatRef} className="ikincil ayarlar-kapat" onClick={onKapat}>
            ✕ {M.kapat}
          </button>
        </div>

        <div className="ayarlar-sekmeler">
          <button
            className={sekme === 'genel' ? 'aktif-sekme' : ''}
            onClick={() => setSekme('genel')}
          >
            {M.sekmeGenel}
          </button>
          <button
            className={sekme === 'geri_bildirim' ? 'aktif-sekme' : ''}
            onClick={() => setSekme('geri_bildirim')}
          >
            {M.sekmeGeriBildirim}
          </button>
        </div>

        <div className="ayarlar-govde">
          {sekme === 'genel' ? (
            <>
              <section className="ayar-bolum">
                <h3>🌐 {M.dilBaslik}</h3>
                <p className="ayar-bolum-aciklama">{M.dilAciklama}</p>
                <div className="ayar-secenek-grup">
                  <button
                    className={`ayar-secenek${dil === 'tr' ? ' secili' : ''}`}
                    onClick={() => onDilDegistir('tr')}
                  >
                    {M.dilTurkce}
                  </button>
                  <button
                    className={`ayar-secenek${dil === 'en' ? ' secili' : ''}`}
                    onClick={() => onDilDegistir('en')}
                  >
                    {M.dilIngilizce}
                  </button>
                </div>
                {dil === 'en' && <p className="ayar-beta-not">{M.dilBetaNot}</p>}
              </section>

              <section className="ayar-bolum">
                <h3>🔊 {M.sesBaslik}</h3>
                <p className="ayar-bolum-aciklama">{M.sesAciklama}</p>
                <div className="ayar-secenek-grup">
                  <button
                    className={`ayar-secenek${!sesKapali ? ' secili' : ''}`}
                    onClick={() => {
                      if (sesKapali) onSesToggle();
                    }}
                  >
                    {M.sesAcik}
                  </button>
                  <button
                    className={`ayar-secenek${sesKapali ? ' secili' : ''}`}
                    onClick={() => {
                      if (!sesKapali) onSesToggle();
                    }}
                  >
                    {M.sesKapali}
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section className="ayar-bolum">
              <h3>✉️ {M.gbBaslik}</h3>
              <p className="ayar-bolum-aciklama">{M.gbAciklama}</p>

              {gonderimDurumu === 'basarili' ? (
                <div className="ayarlar-basari">
                  <span className="ayarlar-basari-ikon" aria-hidden="true">✓</span>
                  <p>{M.gbBasarili}</p>
                  <button
                    className="ikincil"
                    onClick={() => setGonderimDurumu('yok')}
                  >
                    {M.gbYeniMesaj}
                  </button>
                </div>
              ) : (
                <>
                  <div className="ayar-secenek-grup gb-kategori-grup">
                    {KATEGORILER.map((k) => (
                      <button
                        key={k}
                        className={`ayar-secenek${kategori === k ? ' secili' : ''}`}
                        onClick={() => setKategori(k)}
                      >
                        {kategoriEtiket[k]}
                      </button>
                    ))}
                  </div>

                  <textarea
                    className="gb-mesaj"
                    value={mesaj}
                    onChange={(e) => setMesaj(e.target.value.slice(0, MAKS_MESAJ))}
                    placeholder={M.gbMesajYer}
                    rows={5}
                  />
                  <div className="gb-sayac">
                    {mesaj.length}/{MAKS_MESAJ}
                  </div>

                  <input
                    className="gb-iletisim"
                    value={iletisim}
                    onChange={(e) => setIletisim(e.target.value.slice(0, 120))}
                    placeholder={M.gbIletisimYer}
                  />

                  {gonderimDurumu === 'kisa' && (
                    <p className="gb-uyari">{M.gbCokKisa}</p>
                  )}
                  {gonderimDurumu === 'hata' && (
                    <p className="gb-uyari">{M.gbHata}</p>
                  )}

                  <button
                    className="gb-gonder"
                    disabled={gonderiliyor}
                    onClick={gonder}
                  >
                    {gonderiliyor ? M.gbGonderiliyor : M.gbGonder}
                  </button>
                </>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
