import type { SonucEtkisi } from '../types';
import { ahlakEtiketi, unUnvani } from '../bolgeTema';
import { formatPara } from '../format';

interface EtkiCipleriProps {
  etki: SonucEtkisi;
  paraBirimi: string;
  oncekiAhlak: number;
  sonrakiAhlak: number;
  oncekiUn: number;
  sonrakiUn: number;
}

interface Cip {
  simge: string;
  metin: string;
  pozitif: boolean;
}

export function EtkiCipleri({ etki, paraBirimi, oncekiAhlak, sonrakiAhlak, oncekiUn, sonrakiUn }: EtkiCipleriProps) {
  const cipler: Cip[] = [];

  if (etki.para) {
    cipler.push({
      simge: '💰',
      metin: `${etki.para > 0 ? '+' : ''}${formatPara(etki.para)} ${paraBirimi}`,
      pozitif: etki.para > 0,
    });
  }
  if (etki.saglik) {
    cipler.push({
      simge: '❤️',
      metin: `Sağlık ${etki.saglik > 0 ? '+' : ''}${etki.saglik}`,
      pozitif: etki.saglik > 0,
    });
  }
  if (etki.mutluluk) {
    cipler.push({
      simge: '🙂',
      metin: `Mutluluk ${etki.mutluluk > 0 ? '+' : ''}${etki.mutluluk}`,
      pozitif: etki.mutluluk > 0,
    });
  }
  if (etki.es_puani) {
    cipler.push({
      simge: '💍',
      metin: `Eş ilişkisi ${etki.es_puani > 0 ? '+' : ''}${etki.es_puani}`,
      pozitif: etki.es_puani > 0,
    });
  }
  if (etki.es_kaybet) {
    cipler.push({ simge: '💔', metin: 'Eşini kaybettin', pozitif: false });
  }
  if (etki.cocuk_ekle) {
    cipler.push({ simge: '👶', metin: `+${etki.cocuk_ekle} çocuk`, pozitif: true });
  }
  if (etki.un) {
    const eskiUnvan = unUnvani(oncekiUn);
    const yeniUnvan = unUnvani(sonrakiUn);
    const metin =
      eskiUnvan === yeniUnvan
        ? etki.un > 0
          ? 'Ünün biraz arttı'
          : 'Ünün biraz azaldı'
        : `${eskiUnvan} → ${yeniUnvan}`;
    cipler.push({ simge: '🏅', metin, pozitif: etki.un > 0 });
  }
  if (etki.ahlak) {
    const eskiEtiket = ahlakEtiketi(oncekiAhlak);
    const yeniEtiket = ahlakEtiketi(sonrakiAhlak);
    const metin =
      eskiEtiket === yeniEtiket
        ? etki.ahlak > 0
          ? 'Ahlakın biraz yükseldi'
          : 'Ahlakın biraz düştü'
        : `${eskiEtiket} → ${yeniEtiket}`;
    cipler.push({ simge: '⚖️', metin, pozitif: etki.ahlak > 0 });
  }
  if (etki.yeni_meslek) {
    cipler.push({ simge: '🧭', metin: `Yeni meslek: ${etki.yeni_meslek}`, pozitif: true });
  }

  if (cipler.length === 0) return null;

  return (
    <div className="etki-cipleri">
      {cipler.map((cip, i) => (
        <span
          key={i}
          className={`etki-cip ${cip.pozitif ? 'etki-pozitif' : 'etki-negatif'}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {cip.simge} {cip.metin}
        </span>
      ))}
    </div>
  );
}
