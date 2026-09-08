import type { SosyallesmeYeri, ZarSonucu, UcKagitciSonucu, BilekGuresiSonucu } from '../types';
import { useDil } from '../DilContext';
import { HazardWidget, UcKagitciWidget, BilekGuresiWidget } from './MiniOyunlar';

interface SosyallesmePaneliProps {
  yerler: SosyallesmeYeri[];
  yukleniyor: boolean;
  para: number;
  paraBirimi: string;
  zarKademeleri: number[];
  onGit: (yerId: string) => void;
  onZarAt: (tutar: number) => Promise<ZarSonucu | null>;
  onUcKagitci: (tutar: number, secim: number) => Promise<UcKagitciSonucu | null>;
  onBilekGuresi: (basarili: boolean) => Promise<BilekGuresiSonucu | null>;
  onGeriDon: () => void;
}

export function SosyallesmePaneli({
  yerler,
  yukleniyor,
  para,
  paraBirimi,
  zarKademeleri,
  onGit,
  onZarAt,
  onUcKagitci,
  onBilekGuresi,
  onGeriDon,
}: SosyallesmePaneliProps) {
  const { m, kt } = useDil();

  return (
    <div className="ekran ekran-tam-sayfa ekran-sosyallesme">
      <h2>{m.spSosyallesBaslik}</h2>
      <p className="giris-aciklama">{m.spIntro}</p>

      {yerler.length === 0 && <p className="yatirim-islem-mesaji">{m.spMekanYok}</p>}

      <div className="tam-kaydirilan">
        <section className="sosyallesme-kumar">
          <h3 className="tam-baslik">{m.spKumarBaslik}</h3>
          <p className="giris-aciklama">{m.spKumarNot}</p>
          <div className="sosyallesme-kumar-oyunlar">
            <HazardWidget
              para={para}
              paraBirimi={paraBirimi}
              kademeler={zarKademeleri}
              yukleniyor={yukleniyor}
              onZarAt={onZarAt}
            />
            <UcKagitciWidget
              para={para}
              paraBirimi={paraBirimi}
              kademeler={zarKademeleri}
              yukleniyor={yukleniyor}
              onUcKagitci={onUcKagitci}
            />
            <BilekGuresiWidget yukleniyor={yukleniyor} onBilekGuresi={onBilekGuresi} />
          </div>
        </section>

        <h3 className="tam-baslik">{m.spMekanlarBaslik}</h3>
        <div className="yatirim-kartlari sosyallesme-kartlari">
          {yerler.map((yer) => (
            <button
              key={yer.id}
              className={`yatirim-kart sosyallesme-kart${yer.alkolluMu ? ' sosyallesme-kart-alkollu' : ''}`}
              disabled={yukleniyor}
              onClick={() => onGit(yer.id)}
            >
              <span className="meslek-simge">{yer.simge}</span>
              <strong>{kt(yer.ad)}</strong>
              <span className="meslek-aciklama">{kt(yer.aciklama)}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
