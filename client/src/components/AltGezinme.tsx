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
}

/**
 * Mobil sabit alt gezinme çubuğu: Evin · Sosyalleş · Mağaza · İlişkiler.
 * Kariyer/Yatırım ana ekrandaki meslek tuşlarından açılır; Kişilik (avatar/isim), Canlı Skor
 * (üst şerit rozeti) ve Ayarlar (⚙️) başka yerlerde olduğundan "Diğer" menüsü yok.
 * Oyun/Sonuç ekranına dönüş burada YOK — her alt ekranın kendi "Geri Dön" butonu
 * (App.tsx `onGeriDon`) bu işi görür. Olay beklerken `devreDisi`.
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
}: AltGezinmeProps) {
  const { m } = useDil();
  const aileBildirimi = aileTalepVar || aileEvlilikRozeti;

  const dugme = (id: string, ikon: string, etiket: string, fn: () => void, bildirim = false) => (
    <button
      type="button"
      className={`alt-gezinme-buton${ekran === id ? ' alt-gezinme-buton-aktif' : ''}`}
      disabled={devreDisi}
      onClick={fn}
    >
      <span className="alt-gezinme-ikon" aria-hidden="true">
        {ikon}
      </span>
      <span className="alt-gezinme-etiket">{etiket}</span>
      {bildirim && <span className="alt-gezinme-nokta" aria-hidden="true" />}
    </button>
  );

  return (
    <nav className="alt-gezinme" aria-label={m.agBaslik}>
      {dugme('finans', '🏠', m.shEvinKisa, onEv)}
      {dugme('sosyallesme', '🍷', m.shSosyallesme, onSosyallesme)}
      {dugme('magaza', '🛒', m.shMagaza, onMagaza)}
      {dugme('aile', '💞', m.agAile, onAile, aileBildirimi)}
    </nav>
  );
}
