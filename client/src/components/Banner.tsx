import { bolgeTemasiGetir } from '../bolgeTema';
import { useDil } from '../DilContext';

interface BannerProps {
  cag: string;
  bolge: string;
  yil: number;
  ulke?: { savasta: boolean; vebada: boolean; ekonomi: string };
  hukumdar?: string | null;
}

export function Banner({ cag, bolge, yil, ulke, hukumdar }: BannerProps) {
  const { m, kt, ktHukumdar } = useDil();
  const tema = bolgeTemasiGetir(bolge);
  return (
    <div
      className="banner"
      style={{ background: `linear-gradient(135deg, ${tema.renk1}, ${tema.renk2})` }}
    >
      <span className="banner-sembol" aria-hidden="true">
        {tema.sembol}
      </span>
      <div className="banner-metin">
        <strong>{kt(bolge)}</strong>
        <span>
          {yil} · {kt(cag)}
        </span>
        {hukumdar && <span className="banner-hukumdar">👑 {ktHukumdar(hukumdar)}</span>}
      </div>
      {ulke && (ulke.savasta || ulke.vebada || ulke.ekonomi !== 'normal') && (
        <div className="banner-rozetler">
          {ulke.savasta && <span className="banner-rozet banner-rozet-tehlike">{m.bnSavasta}</span>}
          {ulke.vebada && <span className="banner-rozet banner-rozet-tehlike">{m.bnSalgin}</span>}
          {ulke.ekonomi === 'kotu' && <span className="banner-rozet banner-rozet-tehlike">{m.bnKriz}</span>}
          {ulke.ekonomi === 'iyi' && <span className="banner-rozet banner-rozet-iyi">{m.bnRefah}</span>}
        </div>
      )}
    </div>
  );
}
