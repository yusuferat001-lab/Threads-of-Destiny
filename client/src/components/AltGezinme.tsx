import { useState } from 'react';
import { useDil } from '../DilContext';

interface AltGezinmeProps {
  /** Hangi ekranın aktif olduğu — ilgili ikonu vurgulamak için (bkz. App.tsx `Ekran`). */
  ekran: string;
  devreDisi: boolean;
  kariyerTalepVar: boolean;
  aileTalepVar: boolean;
  aileEvlilikRozeti: boolean;
  onKariyer: () => void;
  onYatirim: () => void;
  onEv: () => void;
  onSosyallesme: () => void;
  onMagaza: () => void;
  onAile: () => void;
}

/**
 * Mobil tek-ekran tasarımının sabit alt gezinme çubuğu (§ "Mobil Tek-Ekran (100vh) UI
 * Dönüşümü"). 5 ikon: Kariyer/Yatırım/Evin/Sosyalleş + "Diğer" (Mağaza+Aile'yi içeren
 * küçük bir sheet). Oyun/Sonuç ekranına dönüş burada YOK — her alt ekranın kendi
 * "Geri Dön" butonu (App.tsx'te zaten var, `onGeriDon`) bu işi görüyor; bu çubuk salt
 * ekranlar arası hızlı atlama sağlıyor, mevcut geri-dönüş akışının yerini almıyor.
 */
export function AltGezinme({
  ekran,
  devreDisi,
  kariyerTalepVar,
  aileTalepVar,
  aileEvlilikRozeti,
  onKariyer,
  onYatirim,
  onEv,
  onSosyallesme,
  onMagaza,
  onAile,
}: AltGezinmeProps) {
  const { m } = useDil();
  const [digerAcik, setDigerAcik] = useState(false);
  const digerAktif = ekran === 'magaza' || ekran === 'aile';
  const digerBildirimVar = aileTalepVar || aileEvlilikRozeti;

  function git(fn: () => void) {
    setDigerAcik(false);
    fn();
  }

  return (
    <>
      <nav className="alt-gezinme" aria-label={m.agBaslik}>
        <button
          type="button"
          className={`alt-gezinme-buton${ekran === 'kariyer' ? ' alt-gezinme-buton-aktif' : ''}`}
          disabled={devreDisi}
          onClick={() => git(onKariyer)}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            🎖️
          </span>
          <span className="alt-gezinme-etiket">
            {m.shKariyer}
            {kariyerTalepVar ? ' 🔔' : ''}
          </span>
        </button>
        <button
          type="button"
          className={`alt-gezinme-buton${ekran === 'yatirim' ? ' alt-gezinme-buton-aktif' : ''}`}
          disabled={devreDisi}
          onClick={() => git(onYatirim)}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            💰
          </span>
          <span className="alt-gezinme-etiket">{m.shIsinKisa}</span>
        </button>
        <button
          type="button"
          className={`alt-gezinme-buton${ekran === 'finans' ? ' alt-gezinme-buton-aktif' : ''}`}
          disabled={devreDisi}
          onClick={() => git(onEv)}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            🏠
          </span>
          <span className="alt-gezinme-etiket">{m.shEvinKisa}</span>
        </button>
        <button
          type="button"
          className={`alt-gezinme-buton${ekran === 'sosyallesme' ? ' alt-gezinme-buton-aktif' : ''}`}
          disabled={devreDisi}
          onClick={() => git(onSosyallesme)}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            🍷
          </span>
          <span className="alt-gezinme-etiket">{m.shSosyallesme}</span>
        </button>
        <button
          type="button"
          className={`alt-gezinme-buton${digerAktif ? ' alt-gezinme-buton-aktif' : ''}`}
          disabled={devreDisi}
          onClick={() => setDigerAcik((a) => !a)}
          aria-haspopup="dialog"
          aria-expanded={digerAcik}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            ⋯
          </span>
          <span className="alt-gezinme-etiket">{m.agDiger}</span>
          {digerBildirimVar && <span className="alt-gezinme-nokta" aria-hidden="true" />}
        </button>
      </nav>

      {digerAcik && (
        <div className="alt-gezinme-diger-katman" onClick={() => setDigerAcik(false)}>
          <div
            className="alt-gezinme-diger-sheet"
            role="dialog"
            aria-modal="true"
            aria-label={m.agDiger}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="alt-gezinme-diger-satir" disabled={devreDisi} onClick={() => git(onMagaza)}>
              <span aria-hidden="true">🛒</span> {m.shMagaza}
            </button>
            <button type="button" className="alt-gezinme-diger-satir" disabled={devreDisi} onClick={() => git(onAile)}>
              <span aria-hidden="true">👪</span> {m.agAile}
              {aileTalepVar ? ' 🔔' : ''}
              {aileEvlilikRozeti ? ' 💍' : ''}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
