import { useEffect, useState } from 'react';
import { useDil } from '../DilContext';

interface AltGezinmeProps {
  /** Hangi ekranın aktif olduğu — ilgili ikonu vurgulamak için (bkz. App.tsx `Ekran`). */
  ekran: string;
  devreDisi: boolean;
  /** Çözülmesi gereken bir olay var: düğmeler kapalıyken nedeni söylenir. */
  olayBekliyor?: boolean;
  aileTalepVar: boolean;
  aileEvlilikRozeti: boolean;
  onEv: () => void;
  onSosyallesme: () => void;
  onMagaza: () => void;
  onAile: () => void;
}

/**
 * Mobil sabit alt gezinme çubuğu: Evin · Sosyalleş · İlişkiler · Mağaza.
 * Kariyer/Yatırım ana ekrandaki meslek tuşlarından açılır; Kişilik (avatar/isim), Canlı Skor
 * (üst şerit rozeti) ve Ayarlar (⚙️) başka yerlerde olduğundan "Diğer" menüsü yok.
 * Oyun/Sonuç ekranına dönüş burada YOK — her alt ekranın kendi "Geri Dön" butonu
 * (App.tsx `onGeriDon`) bu işi görür. Olay beklerken `devreDisi`.
 */
export function AltGezinme({
  ekran,
  devreDisi,
  olayBekliyor = false,
  aileTalepVar,
  aileEvlilikRozeti,
  onEv,
  onSosyallesme,
  onMagaza,
  onAile,
}: AltGezinmeProps) {
  const { m } = useDil();
  const aileBildirimi = aileTalepVar || aileEvlilikRozeti;
  // Kapalı düğmeler dokunuşu yutmaz (CSS pointer-events:none) → nav yakalar, kısa süreli ipucu çıkar.
  const [ipucu, setIpucu] = useState(false);
  useEffect(() => {
    if (!ipucu) return;
    const z = setTimeout(() => setIpucu(false), 2400);
    return () => clearTimeout(z);
  }, [ipucu]);

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
    <>
      {ipucu && olayBekliyor && (
        <p className="alt-gezinme-ipucu" role="status">
          {m.agOnceKarar}
        </p>
      )}
    <nav
      className="alt-gezinme"
      aria-label={m.agBaslik}
      aria-describedby={olayBekliyor ? 'alt-gezinme-neden' : undefined}
      onClick={devreDisi && olayBekliyor ? () => setIpucu(true) : undefined}
    >
      {olayBekliyor && (
        <span id="alt-gezinme-neden" className="sr-only">
          {m.agOnceKarar}
        </span>
      )}
      {dugme('finans', '🏠', m.shEvinKisa, onEv)}
      {dugme('sosyallesme', '🍷', m.shSosyallesme, onSosyallesme)}
      {dugme('aile', '💞', m.agAile, onAile, aileBildirimi)}
      {dugme('magaza', '🛒', m.shMagaza, onMagaza)}
    </nav>
    </>
  );
}
