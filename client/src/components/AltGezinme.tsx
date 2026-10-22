import { useState } from 'react';
import { useDil } from '../DilContext';

interface AltGezinmeProps {
  /** Hangi ekranın aktif olduğu — ilgili ikonu vurgulamak için (bkz. App.tsx `Ekran`). */
  ekran: string;
  devreDisi: boolean;
  aileTalepVar: boolean;
  aileEvlilikRozeti: boolean;
  onEv: () => void;
  onSosyallesme: () => void;
  onMagaza: () => void;
  onAile: () => void;
  onKisilik: () => void;
  onSkor: () => void;
  onAyarlar: () => void;
}

/**
 * Mobil sabit alt gezinme çubuğu: Evin · Sosyalleş · Mağaza · İlişkiler + "Diğer"
 * (Kişilik & Miras, Canlı Skor, Ayarlar). Kariyer/Yatırım artık ana ekrandaki meslek
 * tuşlarından açılır. Oyun/Sonuç ekranına dönüş burada YOK — her alt ekranın kendi
 * "Geri Dön" butonu (App.tsx `onGeriDon`) bu işi görür. Olay beklerken `devreDisi`.
 */
export function AltGezinme({
  ekran,
  devreDisi,
  aileTalepVar,
  aileEvlilikRozeti,
  onEv,
  onSosyallesme,
  onMagaza,
  onAile,
  onKisilik,
  onSkor,
  onAyarlar,
}: AltGezinmeProps) {
  const { m, dil } = useDil();
  const [digerAcik, setDigerAcik] = useState(false);
  const aileBildirimi = aileTalepVar || aileEvlilikRozeti;

  function git(fn: () => void) {
    setDigerAcik(false);
    fn();
  }

  const dugme = (id: string, ikon: string, etiket: string, fn: () => void, bildirim = false) => (
    <button
      type="button"
      className={`alt-gezinme-buton${ekran === id ? ' alt-gezinme-buton-aktif' : ''}`}
      disabled={devreDisi}
      onClick={() => git(fn)}
    >
      <span className="alt-gezinme-ikon" aria-hidden="true">
        {ikon}
      </span>
      <span className="alt-gezinme-etiket">{etiket}</span>
      {bildirim && <span className="alt-gezinme-nokta" aria-hidden="true" />}
    </button>
  );

  return (
    <>
      <nav className="alt-gezinme" aria-label={m.agBaslik}>
        {dugme('finans', '🏠', m.shEvinKisa, onEv)}
        {dugme('sosyallesme', '🍷', m.shSosyallesme, onSosyallesme)}
        {dugme('magaza', '🛒', m.shMagaza, onMagaza)}
        {dugme('aile', '💞', m.agAile, onAile, aileBildirimi)}
        <button
          type="button"
          className="alt-gezinme-buton"
          disabled={devreDisi}
          onClick={() => setDigerAcik((a) => !a)}
          aria-haspopup="dialog"
          aria-expanded={digerAcik}
        >
          <span className="alt-gezinme-ikon" aria-hidden="true">
            ⋯
          </span>
          <span className="alt-gezinme-etiket">{m.agDiger}</span>
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
            <button type="button" className="alt-gezinme-diger-satir" onClick={() => git(onKisilik)}>
              <span aria-hidden="true">🎭</span> {dil === 'en' ? 'Personality & Heritage' : 'Kişilik & Miras'}
            </button>
            <button type="button" className="alt-gezinme-diger-satir" onClick={() => git(onSkor)}>
              <span aria-hidden="true">🏆</span> {m.skorDetayBaslik}
            </button>
            <button type="button" className="alt-gezinme-diger-satir" onClick={() => git(onAyarlar)}>
              <span aria-hidden="true">⚙️</span> {dil === 'en' ? 'Settings' : 'Ayarlar'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
