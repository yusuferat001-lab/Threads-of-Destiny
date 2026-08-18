interface DikeyBarProps {
  label: string;
  value: number;
  renk: string;
  simge: string;
  /** Verilirse renk sabit `renk` yerine değere göre bu eşik tablosundan seçilir: [üst sınır, renk][]. */
  renkEsikleri?: [number, string][];
}

function renkSec(value: number, renk: string, renkEsikleri?: [number, string][]): string {
  if (!renkEsikleri) return renk;
  for (const [esik, esikRenk] of renkEsikleri) {
    if (value <= esik) return esikRenk;
  }
  return renkEsikleri[renkEsikleri.length - 1][1];
}

export function DikeyBar({ label, value, renk, simge, renkEsikleri }: DikeyBarProps) {
  const yuzde = Math.max(0, Math.min(100, value));
  const dolumRengi = renkSec(yuzde, renk, renkEsikleri);
  return (
    <div className="dikey-bar">
      <span className="dikey-bar-simge" aria-hidden="true">
        {simge}
      </span>
      <div
        className="dikey-bar-govde"
        role="progressbar"
        aria-label={label}
        aria-valuenow={yuzde}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="dikey-bar-dolum" style={{ height: `${yuzde}%`, background: dolumRengi }} />
      </div>
      <span className="dikey-bar-etiket">{label}</span>
    </div>
  );
}
