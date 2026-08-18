import { bolgeTemasiGetir } from '../bolgeTema';

interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: string;
}

interface BolgeSahnesiProps {
  bolge: string;
  yerlesim?: string;
  ulke?: UlkeDurumu;
  un?: number;
}

type YerlesimTipi = 'sehir' | 'sinir' | 'dag' | 'genel';

function yerlesimTipiCikar(yerlesim?: string): YerlesimTipi {
  if (!yerlesim) return 'genel';
  if (yerlesim.includes('Şehir')) return 'sehir';
  if (yerlesim.includes('Sınır')) return 'sinir';
  if (yerlesim.includes('Dağ')) return 'dag';
  return 'genel';
}

const BINALAR = [
  { x: 10, w: 30, h: 45 },
  { x: 45, w: 22, h: 65 },
  { x: 72, w: 28, h: 38 },
  { x: 105, w: 20, h: 55 },
  { x: 130, w: 34, h: 42 },
  { x: 170, w: 24, h: 58 },
  { x: 200, w: 30, h: 40 },
  { x: 235, w: 22, h: 50 },
  { x: 262, w: 28, h: 36 },
  { x: 295, w: 24, h: 60 },
  { x: 325, w: 30, h: 44 },
  { x: 360, w: 26, h: 38 },
];

/** Ün arttıkça şehirde daha çok pencere ışığı, kamp ateşi ya da hareket görünür. */
function isikSayisiHesapla(un: number): number {
  return Math.max(1, Math.min(BINALAR.length, Math.round((un / 100) * BINALAR.length) + 2));
}

function SehirSiluet({ isikSayisi }: { isikSayisi: number }) {
  return (
    <g>
      <g fill="#1a1410" opacity={0.75}>
        {BINALAR.map((b, i) => (
          <rect key={i} x={b.x} y={140 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      <g fill="#e8c065">
        {BINALAR.slice(0, isikSayisi).map((b, i) => (
          <rect key={i} x={b.x + b.w / 2 - 2} y={140 - b.h + 10 + ((i * 13) % (b.h - 16))} width={4} height={4}>
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${2 + (i % 3)}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </g>
  );
}

function SinirSiluet({ isikSayisi }: { isikSayisi: number }) {
  const kuleAltinda = [80, 130, 190, 250, 310, 360];
  return (
    <g opacity={0.75}>
      <polygon points="20,140 20,60 35,45 50,60 50,140" fill="#241c15" />
      <rect x="30" y="70" width="10" height="14" fill="#000" opacity={0.4} />
      {kuleAltinda.map((x, i) => (
        <polygon key={i} points={`${x},140 ${x + 8},${100 - (i % 3) * 10} ${x + 16},140`} fill="#1f2a1a" />
      ))}
      {kuleAltinda.slice(0, isikSayisi).map((x, i) => (
        <circle key={i} cx={x + 8} cy={128} r={3} fill="#e8823a">
          <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.6 + (i % 2)}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </g>
  );
}

function DagSiluet({ isikSayisi }: { isikSayisi: number }) {
  return (
    <g opacity={0.8}>
      <polygon points="0,140 60,35 120,140" fill="#2e2a28" />
      <polygon points="30,70 60,35 90,70 60,58" fill="#e9e9e9" opacity={0.85} />
      <polygon points="110,140 190,20 270,140" fill="#252220" />
      <polygon points="150,65 190,20 230,65 190,50" fill="#e9e9e9" opacity={0.85} />
      <polygon points="250,140 320,50 400,140" fill="#2e2a28" />
      {isikSayisi > 0 && (
        <circle cx={95} cy={130} r={3} fill="#e8823a">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

function SavasDumani() {
  return (
    <g opacity={0.5}>
      {[60, 160, 300].map((x, i) => (
        <ellipse key={i} cx={x} cy={40 - i * 5} rx={22} ry={14} fill="#3a3a3a">
          <animate attributeName="cy" values={`${50 - i * 5};${20 - i * 5};${50 - i * 5}`} dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.55;0.2" dur="6s" repeatCount="indefinite" />
        </ellipse>
      ))}
    </g>
  );
}

export function BolgeSahnesi({ bolge, yerlesim, ulke, un = 0 }: BolgeSahnesiProps) {
  const tema = bolgeTemasiGetir(bolge);
  const tip = yerlesimTipiCikar(yerlesim);
  const isikSayisi = isikSayisiHesapla(un) - (ulke?.vebada ? 2 : 0);
  const efektifIsik = Math.max(0, isikSayisi);

  return (
    <div className="bolge-sahnesi">
      <svg
        viewBox="0 0 400 140"
        className="bolge-sahnesi-svg"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sahneGokyuzu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tema.renk1} />
            <stop offset="100%" stopColor={tema.renk2} />
          </linearGradient>
        </defs>
        <rect width="400" height="140" fill="url(#sahneGokyuzu)" />
        {ulke?.ekonomi === 'iyi' && <rect width="400" height="140" fill="#e8c065" opacity={0.08} />}
        {ulke?.ekonomi === 'kotu' && <rect width="400" height="140" fill="#000000" opacity={0.18} />}
        <rect y="132" width="400" height="8" fill="#0d0a08" opacity={0.6} />
        {tip === 'sehir' && <SehirSiluet isikSayisi={efektifIsik} />}
        {tip === 'sinir' && <SinirSiluet isikSayisi={efektifIsik} />}
        {tip === 'dag' && <DagSiluet isikSayisi={efektifIsik} />}
        {ulke?.savasta && <SavasDumani />}
        {ulke?.vebada && <rect width="400" height="140" fill="#6a7a6a" opacity={0.22} />}
        <text x="200" y="58" fontSize="40" textAnchor="middle" dominantBaseline="middle">
          {tema.sembol}
        </text>
      </svg>
      <div className="bolge-sahnesi-etiketler">
        {yerlesim && <span className="bolge-sahnesi-etiket">{yerlesim}</span>}
        {ulke?.savasta && <span className="bolge-sahnesi-etiket bolge-sahnesi-tehlike">⚔️ Savaşta</span>}
        {ulke?.vebada && <span className="bolge-sahnesi-etiket bolge-sahnesi-tehlike">☠️ Salgın</span>}
      </div>
    </div>
  );
}
