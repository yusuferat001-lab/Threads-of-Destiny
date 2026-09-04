import type { YatkinlikKaynagi, KisilikEksenleri } from '../types';
import { kategoriAdi } from '../bolgeTema';
import { useDil } from '../DilContext';

function grupla(kaynaklar: YatkinlikKaynagi[]): Map<string, YatkinlikKaynagi[]> {
  const grup = new Map<string, YatkinlikKaynagi[]>();
  for (const kaynak of kaynaklar) {
    const liste = grup.get(kaynak.kaynak) ?? [];
    liste.push(kaynak);
    grup.set(kaynak.kaynak, liste);
  }
  return grup;
}

function EksenGostergesi({
  solEtiket,
  sagEtiket,
  deger,
}: {
  solEtiket: string;
  sagEtiket: string;
  deger: number;
}) {
  return (
    <div className="eksen-gostergesi">
      <div className="eksen-gostergesi-uclar">
        <span>{solEtiket}</span>
        <span>{sagEtiket}</span>
      </div>
      <div
        className="eksen-gostergesi-govde"
        role="progressbar"
        aria-label={solEtiket + ' – ' + sagEtiket}
        aria-valuenow={deger}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="eksen-gostergesi-isaretci" style={{ left: `${deger}%` }} />
      </div>
    </div>
  );
}

export function KisilikPaneli({
  kisilik,
  aileMeslegi,
  kaynaklar,
  eksenler,
}: {
  kisilik: [string, string];
  aileMeslegi: string;
  kaynaklar: YatkinlikKaynagi[];
  eksenler: KisilikEksenleri;
}) {
  const { m, kt, dil } = useDil();
  const grup = grupla(kaynaklar);

  return (
    <div className="kisilik-paneli">
      <h3>{m.kpBaslikTam}</h3>
      <EksenGostergesi solEtiket={m.kpPlanlayici} sagEtiket={m.kpFevri} deger={eksenler.fevrilik} />
      <EksenGostergesi solEtiket={m.kpZalim} sagEtiket={m.kpBarisci} deger={eksenler.merhamet} />
      {[...kisilik, aileMeslegi].map((kaynakAdi) => {
        const etkiler = grup.get(kaynakAdi) ?? [];
        const aileMi = kaynakAdi === aileMeslegi;
        return (
          <div key={kaynakAdi} className="kisilik-rozet">
            <span className="kisilik-rozet-ad">
              {aileMi ? '🏠 ' : '🎭 '}
              {kt(kaynakAdi)}
              {aileMi ? m.kpAilesi : ''}
            </span>
            {etkiler.length > 0 && (
              <span className="kisilik-rozet-etki">
                {etkiler
                  .map((e) => `${kategoriAdi(e.kategori, dil)} ${e.deger > 0 ? '+' : ''}${e.deger}`)
                  .join(' · ')}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
