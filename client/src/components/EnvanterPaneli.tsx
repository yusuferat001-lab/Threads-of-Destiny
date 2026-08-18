import { envanterListesiCikar } from '../envanter';

export function EnvanterPaneli({ etiketler }: { etiketler: string[] }) {
  const esyalar = envanterListesiCikar(etiketler);
  if (esyalar.length === 0) return null;

  return (
    <div className="envanter-paneli">
      <h3>Envanter</h3>
      {esyalar.map((esya) => (
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
    </div>
  );
}
