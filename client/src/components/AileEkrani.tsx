import type { Cocuk } from '../types';

interface AileEkraniProps {
  anneAdi: string;
  babaAdi: string;
  esAdi: string | null;
  esMeslek: string | null;
  esRutbe: string | null;
  esPuani: number;
  cocuklar: Cocuk[];
  guncelYil: number;
  onGeriDon: () => void;
}

const ES_ETIKETLERI: [number, string][] = [
  [20, 'Çatırdıyor'],
  [40, 'Gergin'],
  [60, 'İstikrarlı'],
  [80, 'Sıcak'],
  [100, 'Çok Bağlı'],
];

function etiketBul(deger: number, tablo: [number, string][]): string {
  for (const [esik, etiket] of tablo) {
    if (deger <= esik) return etiket;
  }
  return tablo[tablo.length - 1][1];
}

export function AileEkrani({
  anneAdi,
  babaAdi,
  esAdi,
  esMeslek,
  esRutbe,
  esPuani,
  cocuklar,
  guncelYil,
  onGeriDon,
}: AileEkraniProps) {
  return (
    <div className="ekran ekran-aile">
      <h2>Ailen</h2>

      <div className="aile-koken-karti">
        <h3>Ailenin Kökeni</h3>
        <div className="aile-koken-listesi">
          <span className="iliski-rozet iliski-anne">👩 {anneAdi}</span>
          <span className="iliski-rozet iliski-baba">👨 {babaAdi}</span>
        </div>
      </div>

      {esAdi ? (
        <div className="aile-es-karti">
          <h3>Eşin</h3>
          <div className="iliski-rozet iliski-es">
            <span className="iliski-ad">💍 {esAdi}</span>
            <span className="iliski-etiket">{etiketBul(esPuani, ES_ETIKETLERI)}</span>
          </div>
          {esRutbe && esMeslek && (
            <p className="aile-es-meslek">
              {esRutbe} ({esMeslek})
            </p>
          )}
        </div>
      ) : (
        <p className="aile-bos-metin">Henüz bir eşin yok.</p>
      )}

      <div className="aile-cocuklar-karti">
        <h3>Çocukların</h3>
        {cocuklar.length === 0 ? (
          <p className="aile-bos-metin">Henüz bir çocuğun yok.</p>
        ) : (
          <ul className="aile-cocuk-listesi">
            {cocuklar.map((cocuk) => (
              <li key={cocuk.isim + cocuk.dogum_yili} className="aile-cocuk-satiri">
                <span className="aile-cocuk-ad">{cocuk.yasiyor ? '👶' : '🕊️'} {cocuk.isim}</span>
                <span className="aile-cocuk-detay">
                  {cocuk.dogum_yili} doğumlu ·{' '}
                  {cocuk.yasiyor ? `${guncelYil - cocuk.dogum_yili} yaşında` : 'kaybedildi'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={onGeriDon}>Devam Et</button>
    </div>
  );
}
