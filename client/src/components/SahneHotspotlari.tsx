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
 * Oyun sahnesinin (BolgeSahnesi) üstüne binen, tıklanabilir dört nokta:
 * solda meslek+çağa göre işyeri binası, sağda konut kademesine göre büyüyen ev,
 * altta iki küçük "prop" (mağaza/sosyalleşme). Hiçbiri ayrı bir görsel dosyası
 * gerektirmez — konut simgeleri gibi tek bir emoji, boyut/tema ile ayrışır.
 */
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
  const evBuyuklugu = 1.7 + tierIndex * 0.32;

  const bina = meslekBinasiGetir(meslek, cag, dinKultur);

  return (
    <div className="sahne-hotspotlar">
      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-isyeri"
        disabled={devreDisi}
        onClick={onIsyeri}
        title={`${bina.ad} — İşin`}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: '2.3rem' }} aria-hidden="true">
          {bina.simge}
        </span>
        <span className="sahne-hotspot-etiket">İşin</span>
      </button>

      <button
        type="button"
        className="sahne-hotspot sahne-hotspot-ev"
        disabled={devreDisi}
        onClick={onEv}
        title={`${konutGorunum.ad} — Gelir &amp; Gider`}
      >
        <span className="sahne-hotspot-ikon" style={{ fontSize: `${evBuyuklugu}rem` }} aria-hidden="true">
          {konutGorunum.simge}
        </span>
        <span className="sahne-hotspot-etiket">Evin</span>
      </button>

      <div className="sahne-hotspot-propgrup">
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
    </div>
  );
}
