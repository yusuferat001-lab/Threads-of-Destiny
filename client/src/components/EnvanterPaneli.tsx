import { envanterListesiCikar } from '../envanter';
import type { SahipOlunanEsya } from '../types';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface EnvanterPaneliProps {
  etiketler: string[];
  magazaEnvanteri: SahipOlunanEsya[];
  yukleniyor?: boolean;
  onKullan?: (esyaId: string) => void;
}

export function EnvanterPaneli({ etiketler, magazaEnvanteri, yukleniyor, onKullan }: EnvanterPaneliProps) {
  const { m, kt, dil } = useDil();
  const gizemliEsyalar = envanterListesiCikar(etiketler, dil);
  if (gizemliEsyalar.length === 0 && magazaEnvanteri.length === 0) return null;

  return (
    <div className="envanter-paneli">
      <h3>{m.enBaslikTam}</h3>

      {gizemliEsyalar.map((esya) => (
        <div key={esya.id} className="envanter-esya" title={esya.aciklama}>
          <span className="envanter-esya-simge" aria-hidden="true">
            {esya.simge}
          </span>
          <div className="envanter-esya-metin">
            <span className="envanter-esya-ad">{esya.ad}</span>
            <span className="envanter-esya-aciklama">{esya.aciklama}</span>
          </div>
        </div>
      ))}

      {magazaEnvanteri.map((esya) => (
        <div key={esya.id} className="envanter-esya envanter-esya-magaza">
          <span className="envanter-esya-simge" aria-hidden="true">
            {esya.simge}
          </span>
          <div className="envanter-esya-metin">
            <span className="envanter-esya-ad">{kt(esya.ad)}</span>
            <span className="envanter-esya-aciklama">
              {esya.kategori === 'luks'
                ? m.enLuksAciklama
                : esya.kalanYil !== null
                  ? bic(m.enCurumeUyariTam, esya.kalanYil)
                  : m.enKullanimBekliyor}
            </span>
          </div>
          {esya.kategori === 'sifa' && onKullan && (
            <button
              className="envanter-kullan-buton"
              disabled={yukleniyor}
              onClick={() => onKullan(esya.id)}
              title={m.enKullanSansHint}
            >
              {m.enKullanTam}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
