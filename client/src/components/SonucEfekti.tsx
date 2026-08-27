import { useEffect, useRef } from 'react';
import { sesCal, type SesTipi } from '../ses';

const KATEGORI_SES: Record<string, SesTipi> = {
  ticaret: 'basari_ticaret',
  savas: 'basari_savas',
  din: 'basari_din',
};

const KATEGORI_PARCACIK: Record<string, string> = {
  ticaret: '💰',
  savas: '⚔️',
  din: '✨',
  siyaset: '🏛️',
  saglik: '❤️',
  sosyal: '🎉',
};

interface SonucEfektiProps {
  kategori: string;
  basarili: boolean;
  sessiz: boolean;
  terfiOldu?: boolean;
}

export function SonucEfekti({ kategori, basarili, sessiz, terfiOldu = false }: SonucEfektiProps) {
  const oynatildiRef = useRef(false);

  useEffect(() => {
    if (oynatildiRef.current) return;
    oynatildiRef.current = true;
    if (terfiOldu) {
      sesCal('terfi', sessiz);
    } else {
      sesCal(basarili ? KATEGORI_SES[kategori] ?? 'basari_genel' : 'basarisiz', sessiz);
    }
    // Sadece ilk render'da (bu sonuç için) bir kez çalınsın.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emoji = terfiOldu ? '🎖️' : KATEGORI_PARCACIK[kategori] ?? '✨';
  const parcaSayisi = terfiOldu ? 16 : basarili ? 10 : 5;

  return (
    <div
      className={`sonuc-efekti ${basarili ? 'sonuc-efekti-basarili' : 'sonuc-efekti-basarisiz'}`}
      aria-hidden="true"
    >
      {Array.from({ length: parcaSayisi }).map((_, i) => (
        <span
          key={i}
          className="sonuc-efekti-parcacik"
          style={{
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${(Math.random() * 0.3).toFixed(2)}s`,
            fontSize: `${(0.9 + Math.random() * 0.8).toFixed(2)}rem`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
