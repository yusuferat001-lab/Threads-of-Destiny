import type { SosyallesmeYeri } from '../types';

interface SosyallesmePaneliProps {
  yerler: SosyallesmeYeri[];
  yukleniyor: boolean;
  onGit: (yerId: string) => void;
  onGeriDon: () => void;
}

const AYYAS_ESIGI = 3;

function ziyaretUyarisi(yer: SosyallesmeYeri): string | null {
  if (!yer.alkolluMu || yer.ziyaretSayisi === undefined) return null;
  if (yer.ziyaretSayisi >= AYYAS_ESIGI) return 'Zaten ayyaş olarak tanınıyorsun.';
  const kalan = AYYAS_ESIGI - yer.ziyaretSayisi;
  return `Şimdiye kadar ${yer.ziyaretSayisi} kez gittin — ${kalan} ziyaret daha ayyaşlık damgası vurur.`;
}

export function SosyallesmePaneli({ yerler, yukleniyor, onGit, onGeriDon }: SosyallesmePaneliProps) {
  return (
    <div className="ekran ekran-tam-sayfa ekran-sosyallesme">
      <h2>Sosyalleş</h2>
      <p className="giris-aciklama">
        Bir mekâna gidip vakit geçirmek bir tur harcamaz; ama orada yaşayacağın olayı çözmek zamanı ilerletir.
        Alkollü mekânları sık sık ziyaret etmek kalıcı bir ayyaşlık damgasına yol açabilir.
      </p>

      {yerler.length === 0 && (
        <p className="yatirim-islem-mesaji">Şu an gidebileceğin bir mekân yok.</p>
      )}

      <div className="tam-kaydirilan">
        <div className="yatirim-kartlari sosyallesme-kartlari">
          {yerler.map((yer) => {
            const uyari = ziyaretUyarisi(yer);
            return (
              <button
                key={yer.id}
                className={`yatirim-kart sosyallesme-kart${yer.alkolluMu ? ' sosyallesme-kart-alkollu' : ''}`}
                disabled={yukleniyor}
                onClick={() => onGit(yer.id)}
              >
                <span className="meslek-simge">{yer.simge}</span>
                <strong>{yer.ad}</strong>
                <span className="meslek-aciklama">{yer.aciklama}</span>
                {uyari && <span className="sosyallesme-uyari">🍷 {uyari}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        Geri Dön
      </button>
    </div>
  );
}
