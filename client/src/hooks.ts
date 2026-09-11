import { useEffect, useState } from 'react';

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
