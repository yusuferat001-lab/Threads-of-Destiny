import type { YatkinlikKaynagi, KisilikEksenleri } from '../types';
import { KATEGORI_ADI } from '../bolgeTema';

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
        aria-label={`${solEtiket} ile ${sagEtiket} arası eksen`}
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
  const grup = grupla(kaynaklar);

  return (
    <div className="kisilik-paneli">
      <h3>Kişilik &amp; Miras</h3>
      <EksenGostergesi solEtiket="Planlayıcı" sagEtiket="Fevri" deger={eksenler.fevrilik} />
      <EksenGostergesi solEtiket="Zalim" sagEtiket="Barışçıl" deger={eksenler.merhamet} />
      {[...kisilik, aileMeslegi].map((kaynakAdi) => {
        const etkiler = grup.get(kaynakAdi) ?? [];
        const aileMi = kaynakAdi === aileMeslegi;
        return (
          <div key={kaynakAdi} className="kisilik-rozet">
            <span className="kisilik-rozet-ad">
              {aileMi ? '🏠 ' : '🎭 '}
              {kaynakAdi}
              {aileMi ? ' Ailesi' : ''}
            </span>
            {etkiler.length > 0 && (
              <span className="kisilik-rozet-etki">
                {etkiler
                  .map((e) => `${KATEGORI_ADI[e.kategori] ?? e.kategori} ${e.deger > 0 ? '+' : ''}${e.deger}`)
                  .join(' · ')}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
