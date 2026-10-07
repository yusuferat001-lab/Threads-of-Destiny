import type { EvlilikAdayi } from '../types';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface EvlilikPaneliProps {
  adaylar: EvlilikAdayi[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  /** Teklif kabul edildiyse (artık evli) aday listesi ve "farklı adaylar" gizlenir. */
  evli?: boolean;
  onTeklifEt: (aday: EvlilikAdayi) => void;
  onYeniAdaylar: () => void;
  onGeriDon: () => void;
}

export function EvlilikPaneli({ adaylar, yukleniyor, islemMesaji, evli = false, onTeklifEt, onYeniAdaylar, onGeriDon }: EvlilikPaneliProps) {
  const { m, kt } = useDil();

  return (
    <div className="ekran ekran-tam-sayfa ekran-evlilik">
      <h2>{m.evBaslik}</h2>
      {!evli && <p className="giris-aciklama">{m.evIntro}</p>}

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      {yukleniyor && adaylar.length === 0 && <p className="yatirim-islem-mesaji">{m.evYukleniyorMesaji}</p>}

      <div className="tam-kaydirilan">
        <div className="yatirim-kartlari evlilik-kartlari">
          {adaylar.map((aday, i) => (
            <div key={`${aday.isim}-${i}`} className="yatirim-kart evlilik-kart">
              <strong>{aday.isim}</strong>
              <span className="meslek-aciklama">
                {kt(aday.rutbe)} · {kt(aday.meslek)}
              </span>
              <span className="meslek-aciklama">
                {kt(aday.kisilik[0])}, {kt(aday.kisilik[1])}
              </span>
              <span className="meslek-aciklama">{bic(m.evUyum, aday.uyumYuzdesi)}</span>
              <button className="birincil" disabled={yukleniyor} onClick={() => onTeklifEt(aday)}>
                {m.evTeklifEt}
              </button>
            </div>
          ))}
        </div>
      </div>

      {!evli && (
        <button className="ikincil" disabled={yukleniyor} onClick={onYeniAdaylar}>
          {m.evYeniAdaylar}
        </button>
      )}
      <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
