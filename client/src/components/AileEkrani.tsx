import type { Cocuk } from '../types';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';

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

function esEtiketleri(m: Metinler): [number, string][] {
  return [
    [20, m.aeEsCatirdiyor],
    [40, m.aeEsGergin],
    [60, m.aeEsIstikrarli],
    [80, m.aeEsSicak],
    [100, m.aeEsCokBagli],
  ];
}

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
  const { m, kt } = useDil();
  return (
    <div className="ekran ekran-aile">
      <h2>{m.aeBaslikTam}</h2>

      <div className="aile-koken-karti">
        <h3>{m.aeKoken}</h3>
        <div className="aile-koken-listesi">
          <span className="iliski-rozet iliski-anne">👩 {anneAdi}</span>
          <span className="iliski-rozet iliski-baba">👨 {babaAdi}</span>
        </div>
      </div>

      {esAdi ? (
        <div className="aile-es-karti">
          <h3>{m.aeEsin}</h3>
          <div className="iliski-rozet iliski-es">
            <span className="iliski-ad">💍 {esAdi}</span>
            <span className="iliski-etiket">{etiketBul(esPuani, esEtiketleri(m))}</span>
          </div>
          {esRutbe && esMeslek && (
            <p className="aile-es-meslek">
              {kt(esRutbe)} ({kt(esMeslek)})
            </p>
          )}
        </div>
      ) : (
        <p className="aile-bos-metin">{m.aeEsYokMetin}</p>
      )}

      <div className="aile-cocuklar-karti">
        <h3>{m.aeCocuklarin}</h3>
        {cocuklar.length === 0 ? (
          <p className="aile-bos-metin">{m.aeCocukYokMetin}</p>
        ) : (
          <ul className="aile-cocuk-listesi">
            {cocuklar.map((cocuk) => (
              <li key={cocuk.isim + cocuk.dogum_yili} className="aile-cocuk-satiri">
                <span className="aile-cocuk-ad">{cocuk.yasiyor ? '👶' : '🕊️'} {cocuk.isim}</span>
                <span className="aile-cocuk-detay">
                  {bic(m.aeDogumlu, cocuk.dogum_yili)} ·{' '}
                  {cocuk.yasiyor ? bic(m.aeYasindaTam, guncelYil - cocuk.dogum_yili) : m.aeKaybedildi}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={onGeriDon}>{m.devamEt}</button>
    </div>
  );
}
