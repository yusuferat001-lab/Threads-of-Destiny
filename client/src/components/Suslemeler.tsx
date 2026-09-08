/*
 * Faz 1 — "Altın yaldızlı el yazması" görsel yönü için paylaşılan SVG süsleme bileşenleri.
 * Hepsi saf vektörel (yeni raster varlık yok), tema token'larıyla ("currentColor" +
 * CSS değişkenleri) boyanır, `prefers-reduced-motion` saygılıdır (animasyon giris.css'te).
 */
import { memo } from 'react';

/* ---- "Kader yolları" — merkezden bir soy ağacı gibi DALLANARAK yayılan yollar;
   noktalar YALNIZ dallanma yerlerinde. Karışık ve düzensiz ama deterministik
   (render'da Math.random yok; LCG bir kez modül yüklenirken çalışır). ---- */

const KY_MERKEZ = 500;

/* Yolların yakınsadığı nokta — ekranın tam ortası değil, biraz yukarıda:
   orada dönen çark logosu duracak (isim + slogan onun üstünde). */
const KY_MX = KY_MERKEZ;
const KY_MY = 452;

function yollarKur(): { yollar: string[]; dugumler: { x: number; y: number; r: number }[] } {
  const yollar: string[] = [];
  const dugumler: { x: number; y: number; r: number }[] = [];
  const M = KY_MX;
  const MY = KY_MY;

  let s = 0x9e3779b9;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;

  // Her dal bir segment çizer; ucunda (rastgele) 2-3 alt dala ayrılır ve yalnız
  // o dallanma noktasına bir düğüm konur. Açı/uzunluk/eğrilik dağınık. Dallar
  // yavaş sönerek ekran dışına doğru uzamaya devam eder (kesme sınırı gevşek).
  function dal(x: number, y: number, aci: number, uz: number, d: number) {
    if (d <= 0 || uz < 12) return;
    const ex = x + Math.cos(aci) * uz;
    const ey = y + Math.sin(aci) * uz;
    const nx = Math.cos(aci + Math.PI / 2);
    const ny = Math.sin(aci + Math.PI / 2);
    const bukum = (rnd() * 2 - 1) * uz * 0.26;
    const mx = (x + ex) / 2 + nx * bukum;
    const my = (y + ey) / 2 + ny * bukum;
    yollar.push(
      `M ${x.toFixed(1)} ${y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
    );

    // Kaç alt dal? Karışık: derinken 2-3, uçlarda 1-3 (nadiren dur).
    let cocuk: number;
    if (d >= 3) cocuk = rnd() < 0.45 ? 3 : 2;
    else cocuk = rnd() < 0.12 ? 0 : rnd() < 0.5 ? 2 : rnd() < 0.82 ? 3 : 1;
    if (cocuk === 0) return;

    // Dallanma düğümü
    dugumler.push({ x: ex, y: ey, r: Math.max(1.3, 2.2 + d * 0.5) });

    const tabanYay = 0.32 + rnd() * 0.52;
    for (let c = 0; c < cocuk; c++) {
      const yon = c - (cocuk - 1) / 2;
      const sapma = yon * tabanYay + (rnd() * 2 - 1) * 0.3;
      dal(ex, ey, aci + sapma, uz * (0.68 + rnd() * 0.26), d - 1);
    }
  }

  const N = 24;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + (rnd() * 2 - 1) * 0.16;
    dal(M, MY, a, 160 + rnd() * 120, 4);
  }
  dugumler.push({ x: M, y: MY, r: 3.4 });

  return { yollar, dugumler };
}

const { yollar: KY_YOLLAR, dugumler: KY_NOKTALAR } = yollarKur();

/** Merkezdeki yıldızdan dallanarak her yöne uzanan ince yol ağı + üzerlerinde ve
 *  çevrede bir nokta bulutu; arkada birkaç soluk mesafe halkası. Yavaşça döner.
 *  Yüzlerce SVG düğümü içerdiği için memo'lanır (App yeniden render olsa da kalır). */
export const KaderYollari = memo(function KaderYollari() {
  return (
    <svg
      className="kader-yollari-svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <g className="ky-donen">
        <g className="ky-halka">
          <circle cx={KY_MX} cy={KY_MY} r="140" />
          <circle cx={KY_MX} cy={KY_MY} r="290" />
          <circle cx={KY_MX} cy={KY_MY} r="450" />
        </g>
        <g className="ky-yol">
          {KY_YOLLAR.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="ky-nokta">
          {KY_NOKTALAR.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} />
          ))}
        </g>
      </g>
    </svg>
  );
});

/** Tam sahne "kader ağları" dokusu — bir dokuma tezgâhı gibi hafif bükümlü
 *  çözgü/atkı iplikleri + merkezden geçen iki uzun "kader ipliği". Çok soluk. */
export function KaderAglari() {
  const cozgu = Array.from({ length: 15 }, (_, i) => i);
  const atki = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg
      className="kader-aglari-svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <g className="kader-aglari-cozgu">
        {cozgu.map((i) => {
          const x = (i / (cozgu.length - 1)) * 1000;
          const b = (i % 2 ? 1 : -1) * (18 + ((i * 7) % 26));
          return <path key={i} d={`M ${x} -20 C ${x + b} 330, ${x - b} 670, ${x} 1020`} />;
        })}
      </g>
      <g className="kader-aglari-atki">
        {atki.map((i) => {
          const y = (i / (atki.length - 1)) * 1000;
          const b = (i % 2 ? -1 : 1) * (16 + ((i * 9) % 22));
          return <path key={i} d={`M -20 ${y} C 330 ${y + b}, 670 ${y - b}, 1020 ${y}`} />;
        })}
      </g>
      <g className="kader-aglari-kader">
        <path d="M -40 120 C 300 400, 700 600, 1040 880" />
        <path d="M 1040 90 C 700 380, 300 620, -40 900" />
        <path d="M 500 -40 C 560 300, 440 700, 500 1040" />
      </g>
    </svg>
  );
}

/* ---- "Soy ağacı / karınca yuvası" arka plan dokusu (deterministik, bir kez kurulur) ---- */

interface Dal {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  s: number;
}
interface Dugum {
  x: number;
  y: number;
  s: number;
}

function agacKur(): { dallar: Dal[]; dugumler: Dugum[]; baglar: Dal[] } {
  const dallar: Dal[] = [];
  const dugumler: Dugum[] = [];
  function dal(x: number, y: number, aci: number, uz: number, d: number) {
    if (d <= 0) return;
    const x2 = x + Math.cos(aci) * uz;
    const y2 = y + Math.sin(aci) * uz;
    dallar.push({ x1: x, y1: y, x2, y2, s: d });
    if (d <= 4) dugumler.push({ x: x2, y: y2, s: d });
    const nu = uz * 0.7;
    const acilim = 0.34 + (6 - d) * 0.035;
    dal(x2, y2, aci - acilim, nu, d - 1);
    dal(x2, y2, aci + acilim, nu, d - 1);
    if (d === 5 || d === 3) dal(x2, y2, aci + (d === 5 ? 0.9 : -0.85), nu * 0.8, d - 1);
  }
  // Gövde (yukarı) + kökler (aşağı) — ekranın altından yükselen tarihi bir soy ağacı
  dal(500, 1015, -Math.PI / 2, 205, 6);
  dal(500, 1015, Math.PI / 2, 115, 4);

  // Karınca yuvası / akrabalık hissi: yakın düğümleri ince bağlarla ör
  const baglar: Dal[] = [];
  for (let i = 0; i < dugumler.length; i++) {
    for (let j = i + 1; j < dugumler.length; j++) {
      const a = dugumler[i];
      const b = dugumler[j];
      const uzak = Math.hypot(a.x - b.x, a.y - b.y);
      if (uzak > 16 && uzak < 92) baglar.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, s: 1 });
    }
  }
  return { dallar, dugumler, baglar };
}

const { dallar: AGAC_DALLAR, dugumler: AGAC_DUGUMLER, baglar: AGAC_BAGLAR } = agacKur();

/** Çok soluk, tarihi bir gravür hissi: ekranın altından dallanarak yükselen bir
 *  soy ağacı + düğümleri birbirine bağlayan karınca-yuvası benzeri ince ağ. */
export function SoyAgaci() {
  return (
    <svg
      className="soy-agaci-svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <g className="soy-agaci-bag">
        {AGAC_BAGLAR.map((b, i) => (
          <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
        ))}
      </g>
      <g className="soy-agaci-dal">
        {AGAC_DALLAR.map((d, i) => (
          <line
            key={i}
            x1={d.x1}
            y1={d.y1}
            x2={d.x2}
            y2={d.y2}
            strokeWidth={Math.max(0.6, d.s * 0.55)}
          />
        ))}
      </g>
      <g className="soy-agaci-dugum">
        {AGAC_DUGUMLER.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={Math.max(1.1, n.s * 0.75)} />
        ))}
      </g>
    </svg>
  );
}

/** Dönen kader çarkı — giriş ekranındaki ⚙️ emojisinin yerini alır. */
export function CarkLogo({ boyut = 96 }: { boyut?: number }) {
  const dislar = Array.from({ length: 24 }, (_, i) => i);
  const kollar = Array.from({ length: 8 }, (_, i) => i);
  return (
    <span className="cark-logo" aria-hidden="true" style={{ width: boyut, height: boyut }}>
      <svg viewBox="0 0 100 100" className="cark-logo-svg" role="presentation">
        <defs>
          <radialGradient id="carkHub" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#f2dc9e" />
            <stop offset="60%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#7a5b12" />
          </radialGradient>
        </defs>
        <g className="cark-logo-donen">
          {dislar.map((i) => {
            const a = (i / dislar.length) * Math.PI * 2;
            const x1 = 50 + Math.cos(a) * 44;
            const y1 = 50 + Math.sin(a) * 44;
            const x2 = 50 + Math.cos(a) * 49;
            const y2 = 50 + Math.sin(a) * 49;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a227" strokeWidth={2.4} strokeLinecap="round" />;
          })}
          <circle cx="50" cy="50" r="44" fill="none" stroke="#c9a227" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="37" fill="none" stroke="rgba(224,199,137,0.5)" strokeWidth="1.2" />
          {kollar.map((i) => {
            const a = (i / kollar.length) * Math.PI * 2;
            const x = 50 + Math.cos(a) * 37;
            const y = 50 + Math.sin(a) * 37;
            return <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="rgba(224,199,137,0.55)" strokeWidth="1.6" />;
          })}
        </g>
        {/* Sabit gösterge oku */}
        <path d="M50 3 L45 15 L55 15 Z" fill="#b0402f" stroke="#f2dc9e" strokeWidth="0.8" />
        {/* Merkezde sabit mühür madalyonu + altın yıldız (eski MuhurAyrac yıldızı buraya taşındı) */}
        <circle cx="50" cy="50" r="11" fill="#7c2b22" stroke="#b0402f" strokeWidth="1.6" />
        <path
          d="M50 42 L51.8 47.5 L57.6 47.5 L52.9 51 L54.7 56.5 L50 53.1 L45.3 56.5 L47.1 51 L42.4 47.5 L48.2 47.5 Z"
          fill="#e0c789"
        />
      </svg>
    </span>
  );
}

/** Dört köşeye yerleşen tezhip (illumination) kıvrımı — kapsayıcıya `position:relative` ister. */
export function KoseTezhibi() {
  const cizim = (
    <svg viewBox="0 0 60 60" role="presentation">
      <path
        d="M2 2 C 2 26, 10 34, 34 34 M2 2 C 26 2, 34 10, 34 34 M2 2 L 20 20"
        fill="none"
        stroke="var(--tezhip-altin)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="34" cy="34" r="2.6" fill="var(--renk-altin)" />
      <circle cx="6" cy="20" r="1.6" fill="var(--tezhip-altin)" />
      <circle cx="20" cy="6" r="1.6" fill="var(--tezhip-altin)" />
    </svg>
  );
  return (
    <div className="kose-tezhip-kat" aria-hidden="true">
      <span className="kose-tezhip kt-sol-ust">{cizim}</span>
      <span className="kose-tezhip kt-sag-ust">{cizim}</span>
      <span className="kose-tezhip kt-sol-alt">{cizim}</span>
      <span className="kose-tezhip kt-sag-alt">{cizim}</span>
    </div>
  );
}

/** Başlık altına konan, ortasında mühür madalyonu olan süslü ayraç. */
export function MuhurAyrac() {
  return (
    <div className="muhur-ayrac" aria-hidden="true">
      <span className="muhur-ayrac-cizgi" />
      <svg viewBox="0 0 32 32" className="muhur-ayrac-muhur" role="presentation">
        <circle cx="16" cy="16" r="14" fill="var(--muhur-kirmizi)" stroke="var(--muhur-kirmizi-parlak)" strokeWidth="1.5" />
        <path
          d="M16 6 L18 13 L25 13 L19.5 17.5 L21.5 24.5 L16 20.5 L10.5 24.5 L12.5 17.5 L7 13 L14 13 Z"
          fill="var(--renk-altin-parlak)"
          opacity="0.9"
        />
      </svg>
      <span className="muhur-ayrac-cizgi" />
    </div>
  );
}

/** Kurulum akışı adım göstergesi — dolu/geçilmiş/bekleyen noktalar + metin. */
export function AdimGostergesi({ adim, toplam, etiket }: { adim: number; toplam: number; etiket: string }) {
  return (
    <div className="adim-gostergesi" aria-label={etiket}>
      <div className="adim-noktalar" aria-hidden="true">
        {Array.from({ length: toplam }, (_, i) => {
          const n = i + 1;
          const durum = n < adim ? 'gecti' : n === adim ? 'aktif' : 'bekliyor';
          return <span key={n} className={`adim-nokta adim-nokta-${durum}`} />;
        })}
      </div>
      <span className="adim-gostergesi-metin">{etiket}</span>
    </div>
  );
}
