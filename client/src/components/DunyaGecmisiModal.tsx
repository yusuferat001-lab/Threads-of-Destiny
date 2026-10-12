import { useEffect, useState } from 'react';
import { dunyaGecmisiGetir } from '../api';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import type { CharacterState, DunyaGecmisi, DunyaMaddesi } from '../types';

interface DunyaGecmisiModalProps {
  karakter: CharacterState;
  onKapat: () => void;
}

function yilMetni(madde: DunyaMaddesi): string {
  if (madde.suruyor) return `${madde.yil}–`;
  if (madde.yilSon !== undefined && madde.yilSon !== madde.yil) return `${madde.yil}–${madde.yilSon}`;
  return String(madde.yil);
}

function Bolum({ baslik, maddeler, bos }: { baslik: string; maddeler: DunyaMaddesi[]; bos: string }) {
  return (
    <section className="dunya-gecmisi-bolum">
      <h3 className="gosterge-baslik">{baslik}</h3>
      {maddeler.length === 0 ? (
        <p className="gosterge-bilgi">{bos}</p>
      ) : (
        <ul className="gosterge-liste dunya-gecmisi-liste">
          {maddeler.map((madde, i) => (
            <li key={`${madde.yil}-${i}`} className="gosterge-etken dunya-gecmisi-madde">
              <span className="gosterge-etken-ikon" aria-hidden="true">
                {madde.ikon}
              </span>
              <span className="dunya-gecmisi-metin">
                <span className="dunya-gecmisi-yil">{yilMetni(madde)}</span> {madde.metin}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Mobil "Yıl" satırına dokunulunca açılan pencere: son ~15 yılda ülkende (savaş, veba, kıtlık,
 * hükümdar değişimi, bölgesel olaylar) ve dünyada olan önemli olaylar. İçerik sunucudan gelir
 * (GET /:id/dunya-gecmisi); salt-okunur, tur tüketmez.
 */
export function DunyaGecmisiModal({ karakter, onKapat }: DunyaGecmisiModalProps) {
  const { m, dil } = useDil();
  const [veri, setVeri] = useState<DunyaGecmisi | null>(null);
  const [hata, setHata] = useState(false);

  // Oyun ilerledikçe (yıl) ve dil değişince yeniden çekilir.
  useEffect(() => {
    let iptal = false;
    setVeri(null);
    setHata(false);
    dunyaGecmisiGetir(karakter.id)
      .then((r) => {
        if (!iptal) setVeri(r.dunyaGecmisi);
      })
      .catch(() => {
        if (!iptal) setHata(true);
      });
    return () => {
      iptal = true;
    };
  }, [karakter.id, karakter.yil, dil]);

  useEffect(() => {
    const kapat = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onKapat();
    };
    window.addEventListener('keydown', kapat);
    return () => window.removeEventListener('keydown', kapat);
  }, [onKapat]);

  return (
    <div className="skor-detay-katman gosterge-katman" onClick={onKapat}>
      <div
        className="skor-detay-modal gosterge-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${m.usYil} ${karakter.yil}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="skor-detay-modal-ust">
          <h2>📅 {karakter.yil}</h2>
          <button type="button" className="ikincil skor-detay-kapat" onClick={onKapat} autoFocus>
            {m.kapatX}
          </button>
        </div>
        <div className="skor-detay-govde gosterge-govde">
          {veri && <p className="gosterge-bilgi dunya-gecmisi-aralik">{bic(m.dgAralik, veri.baslangicYili, veri.yil)}</p>}
          {hata && <p className="gosterge-bilgi">{m.gmHata}</p>}
          {!veri && !hata && <p className="gosterge-bilgi">{m.gmYukleniyor}</p>}
          {veri && (
            <>
              <Bolum baslik={`🏰 ${m.dgUlke}`} maddeler={veri.ulke} bos={m.dgBos} />
              <Bolum baslik={`🌍 ${m.dgDunya}`} maddeler={veri.dunya} bos={m.dgBos} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
