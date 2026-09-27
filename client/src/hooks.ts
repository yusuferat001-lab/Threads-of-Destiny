import { useEffect, useRef, useState } from 'react';

/** Telefon genişliği mi? (≤767px — bkz. App.css tek kırılım noktası). */
export function useMobilEkran(): boolean {
  const [mobil, setMobil] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const dinle = () => setMobil(mq.matches);
    mq.addEventListener('change', dinle);
    return () => mq.removeEventListener('change', dinle);
  }, []);
  return mobil;
}

/**
 * Bir sayısal değer her değiştiğinde, değişimin miktarını (delta) ve her seferinde
 * artan bir "nonce" döndürür. Nonce, animasyonu tekrar oynatmak için React key
 * olarak kullanılır. İlk render'da tetiklenmez. (UstSerit.tsx'ten taşındı — canlı
 * skor rozeti de aynı "değişince kısa bir parlama" deseni için kullanıyor.)
 */
export function useGecisDeltasi(deger: number): { delta: number; nonce: number } {
  const oncekiRef = useRef(deger);
  const [durum, setDurum] = useState({ delta: 0, nonce: 0 });
  useEffect(() => {
    const fark = deger - oncekiRef.current;
    oncekiRef.current = deger;
    if (Math.abs(fark) >= 0.01) {
      setDurum((d) => ({ delta: fark, nonce: d.nonce + 1 }));
    }
  }, [deger]);
  return durum;
}
