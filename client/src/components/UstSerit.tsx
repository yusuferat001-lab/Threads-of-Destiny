import { bolgeTemasiGetir, aranmaYildiz, ahlakEtiketi, gostergeGorunumu, type GostergeGorunumu } from '../bolgeTema';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { useGecisDeltasi } from '../hooks';
import type { GostergeStat } from '../types';

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
  /** Şöhret (kod alanı `un`). Hem masaüstünde hem mobilde üst şeritte gösterilir. */
  un?: number;
  /** Mobil düzen: Yıl modülü şeritten kalkar (Yıl ayrı satırda), yerine tam ortaya Şöhret gelir. */
  mobil?: boolean;
  /** Verilirse ülke adı kutusu tıklanabilir olur ve bu geri çağrı çalışır (ülke bilgisi modalını açar). */
  onBolgeTikla?: () => void;
  /** Verilirse Can/Para/Mutluluk/Ahlak/Aranma modülleri tıklanabilir olur ve ilgili gösterge detay penceresini açar. */
  onGostergeTikla?: (stat: GostergeStat) => void;
}

function DeltaRozeti({ deger, nonce, birim }: { deger: number; nonce: number; birim?: string }) {
  if (nonce === 0 || Math.abs(deger) < 0.01) return null;
  const pozitif = deger > 0;
  const gosterim = `${pozitif ? '+' : '−'}${formatPara(Math.abs(deger))}`;
  return (
    <span
      key={nonce}
      className={`ust-serit-delta ${pozitif ? 'ust-serit-delta-artis' : 'ust-serit-delta-azalis'}`}
      aria-hidden="true"
    >
      {gosterim}
      {/* Para birimi (ör. "Livre") dar mobil ekranda gizlenir — 7 dar sütunlu üst
         şeritte uçan rozet birimle birlikte komşu modüle taşıyordu (§ust-serit-delta-birim). */}
      {birim && <span className="ust-serit-delta-birim"> {birim}</span>}
    </span>
  );
}

function StatModulu({
  ikon,
  etiket,
  deger,
  tehlike,
  takip,
  takipBirim,
  sinifEk,
  degerBirim,
  onTikla,
  gorunum,
}: {
  ikon: string;
  etiket: string;
  deger: string | number;
  /** Değerin yanındaki birim (ör. para birimi) — dar mobil şeritte gizlenir, sayı kesilmesin. */
  degerBirim?: string;
  tehlike?: boolean;
  /** Verilirse: bu sayı değiştikçe değer kutusu yanıp söner + bir delta rozeti uçar. */
  takip?: number;
  takipBirim?: string;
  /** Modüle özel ek sınıf (ör. mobilde yalnız Yıl modülünün ikonunu gizlemek için). */
  sinifEk?: string;
  /** Verilirse modül bir düğme olur (gösterge detay penceresi). */
  onTikla?: () => void;
  /** Verilirse ikon değere göre kademeli değişir. */
  gorunum?: GostergeGorunumu;
}) {
  const { delta, nonce } = useGecisDeltasi(takip ?? 0);
  const { m } = useDil();
  const yon = takip === undefined || nonce === 0 ? '' : delta > 0 ? ' ust-serit-modul-deger-artis' : ' ust-serit-modul-deger-azalis';
  const sinif = `ust-serit-modul${sinifEk ? ` ${sinifEk}` : ''}${onTikla ? ' ust-serit-modul-tikla' : ''}${gorunum ? ` ust-serit-modul-ton-${gorunum.ton}` : ''}`;
  const Kok = onTikla ? 'button' : 'div';
  return (
    <Kok
      className={sinif}
      {...(onTikla ? { type: 'button' as const, onClick: onTikla, 'aria-haspopup': 'dialog' as const, title: `${etiket} — ${m.gmDokun}` } : {})}
    >
      {takip !== undefined && <DeltaRozeti key={nonce} deger={delta} nonce={nonce} birim={takipBirim} />}
      <span className="ust-serit-modul-ikon" aria-hidden="true">
        {gorunum ? gorunum.ikon : ikon}
      </span>
      <div className="ust-serit-modul-metin">
        <span className="ust-serit-modul-etiket">{etiket}</span>
        <span
          key={`${etiket}-${nonce}`}
          className={`ust-serit-modul-deger${tehlike ? ' ust-serit-modul-deger-tehlike' : ''}${yon}`}
          title={degerBirim ? `${deger} ${degerBirim}` : typeof deger === 'string' ? deger : undefined}
        >
          {deger}
          {degerBirim && <span className="ust-serit-modul-birim"> {degerBirim}</span>}
        </span>
      </div>
    </Kok>
  );
}

/** Aranma seviyesini (suç puanı) 4 yıldızlık bir ölçekte gösterir (25 puanlık bantlar,
 *  bkz. CLAUDE.md §17) — "baskın" bandına (suc_seviyesi>=50) ulaşınca yıldızlar kırmızıya döner. */
function AranmaModulu({ sucSeviyesi, onTikla }: { sucSeviyesi: number; onTikla?: () => void }) {
  const { m } = useDil();
  const yildiz = aranmaYildiz(sucSeviyesi);
  const slotlar = Array.from({ length: 4 }, (_, i) => Math.max(0, Math.min(1, yildiz - i)));
  const tehlike = sucSeviyesi >= 50;
  const { delta, nonce } = useGecisDeltasi(sucSeviyesi);
  const Kok = onTikla ? 'button' : 'div';
  return (
    <Kok
      className={`ust-serit-modul${onTikla ? ' ust-serit-modul-tikla' : ''}`}
      {...(onTikla ? { type: 'button' as const, onClick: onTikla, 'aria-haspopup': 'dialog' as const, title: `${m.usAranma} — ${m.gmDokun}` } : {})}
    >
      {nonce > 0 && Math.abs(delta) >= 0.5 && (
        <span
          key={nonce}
          className={`ust-serit-delta ${delta > 0 ? 'ust-serit-delta-azalis' : 'ust-serit-delta-artis'}`}
          aria-hidden="true"
        >
          {delta > 0 ? m.usAraniyorsun : m.usIzSogudu}
        </span>
      )}
      <span className="ust-serit-modul-ikon" aria-hidden="true">
        🚨
      </span>
      <div className="ust-serit-modul-metin">
        <span className="ust-serit-modul-etiket">{m.usAranma}</span>
        <span
          className={`ust-serit-aranma-yildizlari${tehlike ? ' ust-serit-aranma-yildizlari-tehlike' : ''}`}
          role="img"
          aria-label={bic(m.usAranmaYildizAria, yildiz.toFixed(1))}
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
    </Kok>
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
  un,
  mobil,
  onBolgeTikla,
  onGostergeTikla,
}: UstSeritProps) {
  const { m, kt, ktHukumdar, dil } = useDil();
  const tema = bolgeTemasiGetir(bolge);
  return (
    <header className="ust-serit">
      <div className="ust-serit-moduller">
        {!mobil && <StatModulu ikon="📅" etiket={m.usYil} deger={yil} sinifEk="ust-serit-modul-yil" />}
        <StatModulu ikon="🎂" etiket={m.usYas} deger={yas} />
        <StatModulu
          ikon="❤️"
          etiket={m.usCan}
          deger={Math.round(saglik)}
          tehlike={saglik <= 30}
          takip={Math.round(saglik)}
          gorunum={gostergeGorunumu('saglik', saglik)}
          onTikla={onGostergeTikla && (() => onGostergeTikla('saglik'))}
        />
        <StatModulu
          ikon="💰"
          etiket={m.usPara}
          deger={Math.abs(para) >= 1000 ? String(Math.round(para)) : formatPara(para)}
          degerBirim={paraBirimi}
          tehlike={para < 0}
          takip={para}
          takipBirim={paraBirimi}
          gorunum={gostergeGorunumu('para', para)}
          onTikla={onGostergeTikla && (() => onGostergeTikla('para'))}
        />
        {un !== undefined && (
          <StatModulu
            ikon="🏅"
            etiket={m.sohret}
            deger={Math.round(un)}
            takip={Math.round(un)}
            gorunum={gostergeGorunumu('sohret', un)}
            onTikla={onGostergeTikla && (() => onGostergeTikla('sohret'))}
          />
        )}
        <StatModulu
          ikon="⚖️"
          etiket={m.usAhlak}
          deger={ahlakEtiketi(ahlak, dil)}
          takip={Math.round(ahlak)}
          sinifEk="ust-serit-modul-ahlak"
          gorunum={gostergeGorunumu('ahlak', ahlak)}
          onTikla={onGostergeTikla && (() => onGostergeTikla('ahlak'))}
        />
        <StatModulu
          ikon="🙂"
          etiket={m.usMutluluk}
          deger={Math.round(mutluluk)}
          takip={Math.round(mutluluk)}
          gorunum={gostergeGorunumu('mutluluk', mutluluk)}
          onTikla={onGostergeTikla && (() => onGostergeTikla('mutluluk'))}
        />
        <AranmaModulu sucSeviyesi={sucSeviyesi} onTikla={onGostergeTikla && (() => onGostergeTikla('aranma'))} />
      </div>
      <div className="ust-serit-bolge">
        {ulke?.savasta && <span className="ust-serit-rozet ust-serit-rozet-tehlike">{m.usSavasta}</span>}
        {ulke?.vebada && <span className="ust-serit-rozet ust-serit-rozet-tehlike">{m.usSalgin}</span>}
        {ulke?.ekonomi === 'kotu' && <span className="ust-serit-rozet ust-serit-rozet-tehlike">{m.usKriz}</span>}
        {ulke?.ekonomi === 'iyi' && <span className="ust-serit-rozet ust-serit-rozet-iyi">{m.usRefah}</span>}
        <button
          type="button"
          className="ust-serit-bolge-buton"
          onClick={onBolgeTikla}
          disabled={!onBolgeTikla}
          title={m.usUlkeBilgi}
        >
          <span className="ust-serit-sembol" aria-hidden="true">
            {tema.sembol}
          </span>
          <div className="ust-serit-bolge-metin">
            <strong>{kt(bolge)}</strong>
            {hukumdar && <span>👑 {ktHukumdar(hukumdar)}</span>}
          </div>
          {onBolgeTikla && (
            <span className="ust-serit-bolge-ipucu" aria-hidden="true">
              ℹ️
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
