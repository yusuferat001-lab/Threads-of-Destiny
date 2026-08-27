import { bolgeTemasiGetir, aranmaYildiz, ahlakEtiketi } from '../bolgeTema';
import { formatPara } from '../format';

interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: string;
}

interface UstSeritProps {
  bolge: string;
  yil: number;
  yas: number;
  saglik: number;
  mutluluk: number;
  ahlak: number;
  para: number;
  paraBirimi: string;
  sucSeviyesi: number;
  ulke?: UlkeDurumu;
  hukumdar?: string | null;
}

function StatModulu({
  ikon,
  etiket,
  deger,
  tehlike,
}: {
  ikon: string;
  etiket: string;
  deger: string | number;
  tehlike?: boolean;
}) {
  return (
    <div className="ust-serit-modul">
      <span className="ust-serit-modul-ikon" aria-hidden="true">
        {ikon}
      </span>
      <div className="ust-serit-modul-metin">
        <span className="ust-serit-modul-etiket">{etiket}</span>
        <span
          className={`ust-serit-modul-deger${tehlike ? ' ust-serit-modul-deger-tehlike' : ''}`}
          title={typeof deger === 'string' ? deger : undefined}
        >
          {deger}
        </span>
      </div>
    </div>
  );
}

/** Aranma seviyesini (suç puanı) 5 yıldızlık bir ölçekte gösterir — hapis olaylarının
 *  tetiklendiği eşiğe (suc_seviyesi>=45, bkz. CLAUDE.md §17) ulaşınca yıldızlar kırmızıya döner. */
function AranmaModulu({ sucSeviyesi }: { sucSeviyesi: number }) {
  const yildiz = aranmaYildiz(sucSeviyesi);
  const slotlar = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(1, yildiz - i)));
  const tehlike = sucSeviyesi >= 45;
  return (
    <div className="ust-serit-modul">
      <span className="ust-serit-modul-ikon" aria-hidden="true">
        🚨
      </span>
      <div className="ust-serit-modul-metin">
        <span className="ust-serit-modul-etiket">Aranma</span>
        <span
          className={`ust-serit-aranma-yildizlari${tehlike ? ' ust-serit-aranma-yildizlari-tehlike' : ''}`}
          role="img"
          aria-label={`${yildiz.toFixed(1)} yıldız aranma seviyesi`}
        >
          {slotlar.map((d, i) => (
            <span key={i} className="yildiz-slotu" aria-hidden="true">
              <span className="yildiz-arka">★</span>
              <span className="yildiz-on" style={{ width: `${d * 100}%` }}>
                ★
              </span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function UstSerit({
  bolge,
  yil,
  yas,
  saglik,
  mutluluk,
  ahlak,
  para,
  paraBirimi,
  sucSeviyesi,
  ulke,
  hukumdar,
}: UstSeritProps) {
  const tema = bolgeTemasiGetir(bolge);
  return (
    <header className="ust-serit">
      <div className="ust-serit-moduller">
        <StatModulu ikon="📅" etiket="Yıl" deger={yil} />
        <StatModulu ikon="🎂" etiket="Yaş" deger={yas} />
        <StatModulu ikon="❤️" etiket="Can" deger={saglik} tehlike={saglik <= 30} />
        <StatModulu ikon="💰" etiket="Para" deger={`${formatPara(para)} ${paraBirimi}`} tehlike={para < 0} />
        <StatModulu ikon="⚖️" etiket="Ahlak" deger={ahlakEtiketi(ahlak)} />
        <StatModulu ikon="🙂" etiket="Mutluluk" deger={mutluluk} />
        <AranmaModulu sucSeviyesi={sucSeviyesi} />
      </div>
      <div className="ust-serit-bolge">
        {ulke?.savasta && <span className="ust-serit-rozet ust-serit-rozet-tehlike">⚔️ Savaşta</span>}
        {ulke?.vebada && <span className="ust-serit-rozet ust-serit-rozet-tehlike">☠️ Salgın</span>}
        {ulke?.ekonomi === 'kotu' && <span className="ust-serit-rozet ust-serit-rozet-tehlike">📉 Kriz</span>}
        {ulke?.ekonomi === 'iyi' && <span className="ust-serit-rozet ust-serit-rozet-iyi">📈 Refah</span>}
        <span className="ust-serit-sembol" aria-hidden="true">
          {tema.sembol}
        </span>
        <div className="ust-serit-bolge-metin">
          <strong>{bolge}</strong>
          {hukumdar && <span>👑 {hukumdar}</span>}
        </div>
      </div>
    </header>
  );
}
