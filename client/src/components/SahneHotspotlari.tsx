import type { CSSProperties } from 'react';
import type { KonutTanimi } from '../types';
import { konutGoruntusuGetir, meslekBinasiGetir } from '../bolgeTema';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface SahneHotspotlariProps {
  cag: string;
  bolge: string;
  meslek: string;
  dinKultur: string;
  konutId: string;
  konutlar: KonutTanimi[];
  devreDisi: boolean;
  /** Bekleyen yönetim talebi varsa Kariyer noktasında 🔔 gösterilir. */
  talepVar?: boolean;
  onEv: () => void;
  onIsyeri: () => void;
  onKariyer: () => void;
  onSosyallesme: () => void;
}

/**
 * Oyun sahnesinin (BolgeSahnesi) arka plan görselinin ÜSTÜNE binen, tıklanabilir dört nokta.
 * Soldan sağa sabit sıra: 🎖️ Kariyer · işyeri binası (Yatırım) · ev (Gelir & Gider) · 🍷 Sosyalleş —
 * her biri arka plan resmindeki bir bölgeye denk gelir (sol bina / meydan / boş arsa / sağ bina).
 * Mağaza artık burada değil — sol paneldeki "🛒 Mağaza" butonundan açılır.
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
  bolge,
  meslek,
  dinKultur,
  konutId,
  konutlar,
  devreDisi,
  talepVar,
  onEv,
  onIsyeri,
  onKariyer,
  onSosyallesme,
}: SahneHotspotlariProps) {
  const { m, dil } = useDil();
  const konutTanimi = konutlar.find((k) => k.id === konutId);
  const konutGorunum = konutTanimi
    ? konutGoruntusuGetir(konutTanimi.id, konutTanimi.ad, konutTanimi.simge, cag, bolge, dil)
    : { ad: m.shEvFallback, simge: '🏠' };
  const tierIndex = Math.max(0, konutlar.findIndex((k) => k.id === konutId));
  const evBuyuklugu = 1.6 + tierIndex * 0.28;

  const bina = meslekBinasiGetir(meslek, cag, dinKultur, dil);
  const oran = SAHNE_ORANI[cag] ?? VARSAYILAN_ORAN;

  return (
    <div className="sahne-hotspotlar" style={{ '--sahne-orani': oran } as CSSProperties}>
      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-kariyer"
        disabled={devreDisi}
        onClick={onKariyer}
        title={m.shKariyer}
      >
        <span className="sahne-hotspot-ikon" aria-hidden="true">
          🎖️
        </span>
        <span className="sahne-hotspot-etiket">
          {m.shKariyer}
          {talepVar ? ' 🔔' : ''}
        </span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-isyeri"
        disabled={devreDisi}
        onClick={onIsyeri}
        title={bic(m.shIsyeriTitle, bina.ad)}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: '2.1rem' }} aria-hidden="true">
          {bina.simge}
        </span>
        <span className="sahne-hotspot-etiket">{m.shIsinKisa}</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-ev"
        disabled={devreDisi}
        onClick={onEv}
        title={bic(m.shEvTitle, konutGorunum.ad)}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: `${evBuyuklugu}rem` }} aria-hidden="true">
          {konutGorunum.simge}
        </span>
        <span className="sahne-hotspot-etiket">{m.shEvinKisa}</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-sosyallesme"
        disabled={devreDisi}
        onClick={onSosyallesme}
        title={m.shSosyallesme}
      >
        <span className="sahne-hotspot-ikon" aria-hidden="true">
          🍷
        </span>
        <span className="sahne-hotspot-etiket">{m.shSosyallesme}</span>
      </button>
    </div>
  );
}
