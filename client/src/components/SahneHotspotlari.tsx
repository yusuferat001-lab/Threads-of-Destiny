import type { CSSProperties } from 'react';
import type { KonutTanimi } from '../types';
import { konutGoruntusuGetir, meslekBinasiGetir } from '../bolgeTema';

interface SahneHotspotlariProps {
  cag: string;
  meslek: string;
  dinKultur: string;
  konutId: string;
  konutlar: KonutTanimi[];
  devreDisi: boolean;
  onEv: () => void;
  onIsyeri: () => void;
  onMagaza: () => void;
  onSosyallesme: () => void;
}

/**
 * Oyun sahnesinin (BolgeSahnesi) arka plan görselinin ÜSTÜNE binen, tıklanabilir dört nokta.
 * Soldan sağa sabit sıra: 🛒 Mağaza · işyeri binası · ev · 🍷 Sosyalleş — her biri arka plan
 * resmindeki bir bölgeye denk gelir (sol bina / meydan / boş arsa / sağ bina).
 *
 * Kapsayıcı, arka plan görseliyle AYNI en-boy oranına kilitlenir (`--sahne-orani`) ve
 * `object-fit: contain` gibi ortalanır — böylece noktalar görselin kendisine "yapışır" ve
 * ekran küçülüp büyüdükçe resimle birlikte ölçeklenir, kaymaz. Konumlar tamamen yüzde
 * cinsindendir (vw/px yok), bu yüzden viewport genişliğinden bağımsızdır.
 */

// Arka plan görsellerinin gerçek piksel oranları (bkz. public/assets/sahne/<cag>/arka-plan.*)
const SAHNE_ORANI: Record<string, number> = {
  'Sanayi Devrimi': 1376 / 768,
};
const VARSAYILAN_ORAN = 1920 / 815; // Orta Çağ

export function SahneHotspotlari({
  cag,
  meslek,
  dinKultur,
  konutId,
  konutlar,
  devreDisi,
  onEv,
  onIsyeri,
  onMagaza,
  onSosyallesme,
}: SahneHotspotlariProps) {
  const konutTanimi = konutlar.find((k) => k.id === konutId);
  const konutGorunum = konutTanimi
    ? konutGoruntusuGetir(konutTanimi.id, konutTanimi.ad, konutTanimi.simge, cag)
    : { ad: 'Ev', simge: '🏠' };
  const tierIndex = Math.max(0, konutlar.findIndex((k) => k.id === konutId));
  const evBuyuklugu = 1.6 + tierIndex * 0.28;

  const bina = meslekBinasiGetir(meslek, cag, dinKultur);
  const oran = SAHNE_ORANI[cag] ?? VARSAYILAN_ORAN;

  return (
    <div className="sahne-hotspotlar" style={{ '--sahne-orani': oran } as CSSProperties}>
      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-magaza"
        disabled={devreDisi}
        onClick={onMagaza}
        title="Mağaza"
      >
        <span className="sahne-hotspot-ikon" aria-hidden="true">
          🛒
        </span>
        <span className="sahne-hotspot-etiket">Mağaza</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-isyeri"
        disabled={devreDisi}
        onClick={onIsyeri}
        title={`${bina.ad} — İşin`}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: '2.1rem' }} aria-hidden="true">
          {bina.simge}
        </span>
        <span className="sahne-hotspot-etiket">İşin</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-ev"
        disabled={devreDisi}
        onClick={onEv}
        title={`${konutGorunum.ad} — Gelir & Gider`}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: `${evBuyuklugu}rem` }} aria-hidden="true">
          {konutGorunum.simge}
        </span>
        <span className="sahne-hotspot-etiket">Evin</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-sosyallesme"
        disabled={devreDisi}
        onClick={onSosyallesme}
        title="Sosyalleş"
      >
        <span className="sahne-hotspot-ikon" aria-hidden="true">
          🍷
        </span>
        <span className="sahne-hotspot-etiket">Sosyalleş</span>
      </button>
    </div>
  );
}
