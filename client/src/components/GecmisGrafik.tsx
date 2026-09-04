import type { GecmisNoktasi } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface GecmisGrafikProps {
  gecmis: GecmisNoktasi[];
  paraBirimi: string;
}

const GENISLIK = 260;
const YUKSEKLIK = 70;

function noktalariHesapla(degerler: number[]): string {
  const min = Math.min(...degerler);
  const max = Math.max(...degerler);
  const aralik = max - min || 1;
  return degerler
    .map((deger, i) => {
      const x = degerler.length > 1 ? (i / (degerler.length - 1)) * GENISLIK : 0;
      const y = YUKSEKLIK - ((deger - min) / aralik) * (YUKSEKLIK - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function GecmisGrafik({ gecmis, paraBirimi }: GecmisGrafikProps) {
  const { m } = useDil();
  if (gecmis.length < 2) {
    return (
      <div className="gecmis-grafik">
        <h3>{m.ggGecmisYillar}</h3>
        <p className="gecmis-grafik-bos">{m.ggYetersiz}</p>
      </div>
    );
  }

  const paralar = gecmis.map((g) => g.para);
  const puanlar = noktalariHesapla(paralar);
  const sonNokta = gecmis[gecmis.length - 1];
  const ilkYil = gecmis[0].yil;

  return (
    <div className="gecmis-grafik">
      <h3>{m.ggGecmisYillar}</h3>
      <svg
        viewBox={`0 0 ${GENISLIK} ${YUKSEKLIK}`}
        className="gecmis-grafik-svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline points={puanlar} fill="none" stroke="#e0c789" strokeWidth="2" />
      </svg>
      <div className="gecmis-grafik-etiketler" aria-label={bic(m.ggParaGecmisiAria, ilkYil, sonNokta.yil, formatPara(sonNokta.para), paraBirimi)}>
        <span>{ilkYil}</span>
        <span>
          💰 {formatPara(sonNokta.para)} {paraBirimi}
        </span>
        <span>{sonNokta.yil}</span>
      </div>
    </div>
  );
}
