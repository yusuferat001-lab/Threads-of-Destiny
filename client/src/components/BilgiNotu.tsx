import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/**
 * Küçük "!" bilgi düğmesi (uzun notların yerine).
 * Masaüstü: üzerine gelince ya da tıklayınca açılır. Dokunmatik ekran (hover yok): dokununca SATIR İÇİ açılır
 * (başlığın altında genişleyen kutu; yüzen balon olmadığı için ekran dışına taşmaz). Dışarı dokununca / Esc ile kapanır.
 */
export function BilgiNotu({
  metin,
  etiket = 'Bilgi',
  acik: disAcik,
  onDegis,
}: {
  metin?: ReactNode;
  etiket?: string;
  /** Denetimli mod: açık/kapalı durumu dışarıdan gelir ve kutuyu dışarıdaki ebeveyn çizer (dar kartlarda kutu tam genişlikte altta açılsın diye). */
  acik?: boolean;
  onDegis?: (acik: boolean) => void;
}) {
  const denetimli = disAcik !== undefined;
  const [icSabit, setIcSabit] = useState(false);
  const [gecici, setGecici] = useState(false);
  const sabit = denetimli ? disAcik : icSabit;
  const setSabit = (v: boolean | ((s: boolean) => boolean)) => {
    const yeni = typeof v === 'function' ? v(sabit) : v;
    if (denetimli) onDegis?.(yeni);
    else setIcSabit(yeni);
  };
  const kapsayici = useRef<HTMLSpanElement>(null);
  const kutuId = useId();
  const acik = sabit || (!denetimli && gecici);
  const hoverVar = () => typeof window !== 'undefined' && !!window.matchMedia?.('(hover: hover)').matches;

  useEffect(() => {
    if (!sabit) return;
    const disaTikla = (e: PointerEvent) => {
      if (kapsayici.current && !kapsayici.current.contains(e.target as Node)) setSabit(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSabit(false);
    };
    document.addEventListener('pointerdown', disaTikla);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', disaTikla);
      document.removeEventListener('keydown', esc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sabit]);

  return (
    <span
      className="bilgi-notu"
      ref={kapsayici}
      onMouseEnter={() => hoverVar() && setGecici(true)}
      onMouseLeave={() => setGecici(false)}
    >
      <button
        type="button"
        className="bilgi-notu-dugme"
        aria-label={etiket}
        aria-expanded={acik}
        aria-controls={kutuId}
        onClick={() => setSabit((s) => !s)}
      >
        !
      </button>
      {acik && !denetimli && (
        <span id={kutuId} role="note" className="bilgi-notu-metin">
          {metin}
        </span>
      )}
    </span>
  );
}
