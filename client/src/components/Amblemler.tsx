/*
 * Çağ ve ülke görselleri — saf SVG (raster varlık yok), el yazması / arma estetiği.
 * Çağlar: dairesel madalyon + dönem silüeti. Ülkeler: hanedan kalkanı + nişan.
 * Ülke anahtarları Türkçe kanonik değerlerdir (bkz. CLAUDE.md §16).
 */
import type { ReactNode } from 'react';

const ALTIN = '#d8b24e';
const ALTIN_ACIK = '#f0d98c';

/* ---------------- Çağ madalyonları ---------------- */

function CagIcerik({ cag }: { cag: string }) {
  if (cag === 'Sanayi Devrimi') {
    return (
      <g fill={ALTIN}>
        {/* fabrika gövdesi + testere çatı */}
        <path d="M16 80 V54 H52 V80 Z" />
        <path d="M16 54 l6 -8 l0 8 M28 54 l6 -8 l0 8 M40 54 l6 -8 l0 8" stroke={ALTIN} strokeWidth="2.5" fill="none" />
        {/* bacalar + duman */}
        <path d="M24 54 V34 H30 V54 Z M38 54 V40 H44 V54 Z" />
        <circle cx="27" cy="28" r="4" opacity="0.5" />
        <circle cx="33" cy="21" r="5" opacity="0.35" />
        {/* dişli */}
        <g transform="translate(66 60)">
          <circle r="11" fill="none" stroke={ALTIN} strokeWidth="4" />
          <circle r="3.5" />
          <path
            d="M0 -17 v6 M0 17 v-6 M-17 0 h6 M17 0 h-6 M-12 -12 l4 4 M12 12 l-4 -4 M12 -12 l-4 4 M-12 12 l4 -4"
            stroke={ALTIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </g>
    );
  }
  // Orta Çağ — kale
  return (
    <g fill={ALTIN}>
      <path d="M14 66 A36 30 0 0 1 86 66" fill="none" stroke={ALTIN} strokeWidth="2" opacity="0.4" />
      <path d="M20 82 V50 h6 v-6 h6 v6 h8 V40 h4 v-8 h4 v8 h4 V44 h6 v6 h6 v6 h6 v-6 h6 v6 h6 v32 Z" />
      <path d="M46 82 V64 h8 v18 Z" fill="#241a11" />
      <path d="M48 32 v-10 l10 4 l-10 4" />
    </g>
  );
}

export function CagAmblemi({ cag }: { cag: string }) {
  return (
    <span className="cag-amblem" aria-hidden="true">
      <svg viewBox="0 0 100 100" role="presentation">
        <circle cx="50" cy="50" r="47" fill="#211710" stroke={ALTIN} strokeWidth="2.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke={ALTIN_ACIK} strokeWidth="1" opacity="0.5" />
        <CagIcerik cag={cag} />
      </svg>
    </span>
  );
}

/* ---------------- Ülke kalkanları ---------------- */

const KALKAN_D = 'M8 6 H92 V52 C92 88 60 106 50 112 C40 106 8 88 8 52 Z';

interface UlkeTanimi {
  zemin: string | [string, string, string]; // tek renk ya da 3 dikey bant
  nisan: ReactNode;
}

/** anahtar: bazı ülkeler çağa göre değişir (ör. Fransa). */
function ulkeTanimi(bolge: string, cag?: string): UlkeTanimi {
  const sanayiFransa = cag === 'Sanayi Devrimi';

  switch (bolge) {
    case 'Fransa':
      return sanayiFransa
        ? { zemin: ['#26356f', '#e9e3d0', '#b0322a'], nisan: null }
        : {
            zemin: '#20356e',
            nisan: (
              <path
                fill={ALTIN}
                d="M50 18 Q46 28 50 38 Q54 28 50 18 Z M50 38 Q34 40 36 56 Q42 48 50 52 Q58 48 64 56 Q66 40 50 38 Z M46 52 L46 76 Q46 82 40 84 H60 Q54 82 54 76 L54 52 Q52 55 50 55 Q48 55 46 52 Z M41 80 H59 L57 88 H43 Z"
              />
            ),
          };
    case 'Kutsal Roma':
      return {
        zemin: '#d7b24a',
        nisan: (
          <g fill="#1a140c">
            <path d="M50 44 L58 56 L54 74 L50 80 L46 74 L42 56 Z" />
            <path d="M50 50 L28 45 L33 59 L46 61 Z M50 50 L72 45 L67 59 L54 61 Z" />
            <path d="M47 46 L39 35 L44 33 L50 42 Z M53 46 L61 35 L56 33 L50 42 Z" />
            <circle cx="40" cy="33" r="3.2" />
            <circle cx="60" cy="33" r="3.2" />
          </g>
        ),
      };
    case 'Bizans':
      return {
        zemin: '#4a2160',
        nisan: (
          <g fill={ALTIN}>
            <path d="M44 26 H56 V44 H74 V56 H56 V86 H44 V56 H26 V44 H44 Z" />
            <circle cx="36" cy="37" r="3.4" />
            <circle cx="64" cy="37" r="3.4" />
            <circle cx="36" cy="70" r="3.4" />
            <circle cx="64" cy="70" r="3.4" />
          </g>
        ),
      };
    case 'Selçuklu':
      return {
        zemin: '#1f7a6e',
        nisan: (
          <path
            fill={ALTIN}
            d="M50 24 L55 46 L70 38 L60 53 L78 56 L60 59 L70 74 L55 66 L50 88 L45 66 L30 74 L40 59 L22 56 L40 53 L30 38 L45 46 Z"
          />
        ),
      };
    case 'Eyyubiler':
      // Selahaddin Kartalı — sarı/altın zemin (Eyyubi sancağı düz sarıydı).
      return {
        zemin: '#c98a1e',
        nisan: (
          <g fill="#2a1d0b">
            <circle cx="50" cy="34" r="4.5" />
            <path d="M50 30 l-6 -3 l4 6 Z" />
            <path d="M46 40 h8 l2 28 h-12 Z" />
            <path d="M54 42 C66 40 76 32 80 20 C78 32 72 40 62 45 C72 42 79 35 82 27 C81 39 73 48 60 51 L54 49 Z" />
            <path d="M46 42 C34 40 24 32 20 20 C22 32 28 40 38 45 C28 42 21 35 18 27 C19 39 27 48 40 51 L46 49 Z" />
            <path d="M43 66 L38 90 L50 82 L62 90 L57 66 Z" />
            <path d="M45 68 l-4 10 M55 68 l4 10" stroke="#2a1d0b" strokeWidth="3" strokeLinecap="round" />
          </g>
        ),
      };
    case 'İngiltere':
      return {
        zemin: '#e9e3d0',
        nisan: <path fill="#c8102e" d="M43 24 H57 V43 H82 V57 H57 V92 H43 V57 H18 V43 H43 Z" />,
      };
    case 'Osmanlı':
      // Kırmızı zemin + beyaz hilal (dış daireden kaydırılmış iç daire çıkarılır,
      // evenodd) + yıldız hilalin ağzında.
      return {
        zemin: '#9d2b2f',
        nisan: (
          <g fill="#f0e6cf">
            <path
              fillRule="evenodd"
              d="M50 60 m-23 0 a23 23 0 1 0 46 0 a23 23 0 1 0 -46 0 M59 57 m-19 0 a19 19 0 1 0 38 0 a19 19 0 1 0 -38 0"
            />
            <path d="M72 50 l3.2 8 l8.8 0 l-7 5.2 l3 8.8 l-8 -5.4 l-8 5.4 l3 -8.8 l-7 -5.2 l8.8 0 Z" />
          </g>
        ),
      };
    case 'Rusya':
      // Beyaz-mavi-kırmızı yatay bayrak.
      return {
        zemin: '#eceae3',
        nisan: (
          <>
            <rect x="0" y="0" width="100" height="40" fill="#eceae3" />
            <rect x="0" y="40" width="100" height="39" fill="#28489c" />
            <rect x="0" y="79" width="100" height="45" fill="#b32a24" />
          </>
        ),
      };
    default:
      return { zemin: '#3a2b1c', nisan: <circle cx="50" cy="56" r="16" fill={ALTIN} /> };
  }
}

export function BolgeAmblemi({ bolge, cag }: { bolge: string; cag?: string }) {
  const t = ulkeTanimi(bolge, cag);
  const klipId = `klp-${bolge}-${cag ?? 'x'}`.replace(/[^a-z0-9-]/gi, '');
  return (
    <span className="bolge-amblem" aria-hidden="true">
      <svg viewBox="0 0 100 118" role="presentation">
        <defs>
          <clipPath id={klipId}>
            <path d={KALKAN_D} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${klipId})`}>
          {Array.isArray(t.zemin) ? (
            t.zemin.map((renk, i) => (
              <rect key={i} x={8 + i * 28} y="0" width="28" height="118" fill={renk} />
            ))
          ) : (
            <rect x="0" y="0" width="100" height="118" fill={t.zemin} />
          )}
          {t.nisan}
        </g>
        <path d={KALKAN_D} fill="none" stroke={ALTIN} strokeWidth="3.5" />
        <path d={KALKAN_D} fill="none" stroke={ALTIN_ACIK} strokeWidth="1" opacity="0.5" />
      </svg>
    </span>
  );
}
