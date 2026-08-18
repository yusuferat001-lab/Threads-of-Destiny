import { bolgeTemasiGetir } from '../bolgeTema';

interface BannerProps {
  cag: string;
  bolge: string;
  yil: number;
  ulke?: { savasta: boolean; vebada: boolean; ekonomi: string };
  hukumdar?: string | null;
}

export function Banner({ cag, bolge, yil, ulke, hukumdar }: BannerProps) {
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
        <strong>{bolge}</strong>
        <span>
          {yil} · {cag}
        </span>
        {hukumdar && <span className="banner-hukumdar">👑 {hukumdar}</span>}
      </div>
      {ulke && (ulke.savasta || ulke.vebada || ulke.ekonomi !== 'normal') && (
        <div className="banner-rozetler">
          {ulke.savasta && <span className="banner-rozet banner-rozet-tehlike">⚔️ Savaşta</span>}
          {ulke.vebada && <span className="banner-rozet banner-rozet-tehlike">☠️ Salgın</span>}
          {ulke.ekonomi === 'kotu' && <span className="banner-rozet banner-rozet-tehlike">📉 Kriz</span>}
          {ulke.ekonomi === 'iyi' && <span className="banner-rozet banner-rozet-iyi">📈 Refah</span>}
        </div>
      )}
    </div>
  );
}
