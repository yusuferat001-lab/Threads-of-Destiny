import type { KonutTanimi } from '../types';
import { konutGoruntusuGetir, meslekBinasiGetir } from '../bolgeTema';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

export type KisayolId = 'kariyer' | 'yatirim' | 'magaza' | 'ev' | 'sosyallesme' | 'aile';

interface KisayolKartlariProps {
  /** Hangi kartlar, hangi sırayla çizilsin (sol sütun / sağ sütun ayrı çağrılır). */
  ogeler: KisayolId[];
  cag: string;
  bolge: string;
  meslek: string;
  dinKultur: string;
  konutId: string;
  konutlar: KonutTanimi[];
  devreDisi: boolean;
  /** Bekleyen yönetim talebi varsa Kariyer kartında 🔔 gösterilir. */
  kariyerTalepVar: boolean;
  /** Bekleyen aile talebi varsa Aile kartında 🔔 gösterilir. */
  aileTalepVar: boolean;
  /** Bekâr ve 18+ ise Aile kartında 💍 gösterilir (olay dışı evlenme). */
  aileEvlilikRozeti: boolean;
  onKariyer: () => void;
  onYatirim: () => void;
  onMagaza: () => void;
  onEv: () => void;
  onSosyallesme: () => void;
  onAile: () => void;
}

/**
 * PC oyun ekranının yan sütunlarındaki ahşap tahta kısayol kartları. Eskiden sahne resminin
 * üstünde yüzen dört tıklama noktasıydı (Kariyer · Yatırım · Evin · Sosyalleş); sahne artık
 * kadife olay kutusunun üstünde sade bir resim olduğundan sütunlara taşındı. Mağaza ve Aile
 * butonları da (zaten sütunlardaydı) aynı stile geçti. İkonlar dinamik: Yatırım karakterin
 * mesleğine/dinine göre işyeri binasını, Evin konut kademesine göre evi gösterir.
 * Yalnız PC DOM'unda render edilir — mobilde yan paneller yok, aynı hedefler `AltGezinme`'de.
 */
export function KisayolKartlari({
  ogeler,
  cag,
  bolge,
  meslek,
  dinKultur,
  konutId,
  konutlar,
  devreDisi,
  kariyerTalepVar,
  aileTalepVar,
  aileEvlilikRozeti,
  onKariyer,
  onYatirim,
  onMagaza,
  onEv,
  onSosyallesme,
  onAile,
}: KisayolKartlariProps) {
  const { m, dil } = useDil();
  const konutTanimi = konutlar.find((k) => k.id === konutId);
  const konutGorunum = konutTanimi
    ? konutGoruntusuGetir(konutTanimi.id, konutTanimi.ad, konutTanimi.simge, cag, bolge, dil)
    : { ad: m.shEvFallback, simge: '🏠' };
  const bina = meslekBinasiGetir(meslek, cag, dinKultur, dil);

  const kartlar: Record<KisayolId, { ikon: string; etiket: string; title: string; onClick: () => void }> = {
    kariyer: {
      ikon: '🎖️',
      etiket: `${m.shKariyer}${kariyerTalepVar ? ' 🔔' : ''}`,
      title: m.shKariyer,
      onClick: onKariyer,
    },
    yatirim: { ikon: bina.simge, etiket: m.shIsinKisa, title: bic(m.shIsyeriTitle, bina.ad), onClick: onYatirim },
    magaza: { ikon: '🛒', etiket: m.shMagaza, title: m.shMagaza, onClick: onMagaza },
    ev: { ikon: konutGorunum.simge, etiket: m.shEvinKisa, title: bic(m.shEvTitle, konutGorunum.ad), onClick: onEv },
    sosyallesme: { ikon: '🍷', etiket: m.shSosyallesme, title: m.shSosyallesme, onClick: onSosyallesme },
    aile: {
      ikon: '👪',
      etiket: `${m.agAile}${aileTalepVar ? ' 🔔' : ''}${aileEvlilikRozeti ? ' 💍' : ''}`,
      title: m.btnAileniGor,
      onClick: onAile,
    },
  };

  return (
    <nav className="kisayol-kartlari" aria-label={m.agBaslik}>
      {ogeler.map((id) => {
        const k = kartlar[id];
        return (
          <button
            key={id}
            type="button"
            className={`kisayol-karti kisayol-karti-${id}`}
            disabled={devreDisi}
            onClick={k.onClick}
            title={k.title}
          >
            <span className="kisayol-karti-ikon" aria-hidden="true">
              {k.ikon}
            </span>
            <span className="kisayol-karti-etiket">{k.etiket}</span>
          </button>
        );
      })}
    </nav>
  );
}
