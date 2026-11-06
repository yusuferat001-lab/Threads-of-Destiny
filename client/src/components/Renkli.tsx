import type { ReactNode } from 'react';

/** Metindeki işaretli sayıları (+5, −3, -2/yıl, +%12) palete göre boyar: artı yeşil, eksi kırmızı (renk-paleti.css). */
export function RenkliEtki({ metin }: { metin: string }): ReactNode {
  const parcalar = metin.split(/((?<![\w.])[+\-−]\s?\d[\d.,]*%?)/);
  return (
    <>
      {parcalar.map((p, i) =>
        /^[+\-−]\s?\d/.test(p) ? (
          <span key={i} className={p.startsWith('+') ? 's-arti' : 's-eksi'}>
            {p}
          </span>
        ) : (
          p
        )
      )}
    </>
  );
}
