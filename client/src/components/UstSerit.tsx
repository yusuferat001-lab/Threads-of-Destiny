import { useEffect, useRef, useState } from 'react';
import { bolgeTemasiGetir, aranmaYildiz, ahlakEtiketi } from '../bolgeTema';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

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
  /** Verilirse ülke adı kutusu tıklanabilir olur ve bu geri çağrı çalışır (ülke bilgisi modalını açar). */
  onBolgeTikla?: () => void;
}

/**
 * Bir sayısal değer her değiştiğinde, değişimin miktarını (delta) ve her seferinde
 * artan bir "nonce" döndürür. Nonce, animasyonu tekrar oynatmak için React key
 * olarak kullanılır. İlk render'da tetiklenmez.
 */
function useGecisDeltasi(deger: number): { delta: number; nonce: number } {
  const oncekiRef = useRef(deger);
  const [durum, setDurum] = useState({ delta: 0, nonce: 0 });
  useEffect(() => {
    const fark = deger - oncekiRef.current;
    oncekiRef.current = deger;
    if (Math.abs(fark) >= 0.01) {
      setDurum((d) => ({ delta: fark, nonce: d.nonce + 1 }));
    }
  }, [deger]);
  return durum;
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
}: {
  ikon: string;
  etiket: string;
  deger: string | number;
  tehlike?: boolean;
  /** Verilirse: bu sayı değiştikçe değer kutusu yanıp söner + bir delta rozeti uçar. */
  takip?: number;
  takipBirim?: string;
}) {
  const { delta, nonce } = useGecisDeltasi(takip ?? 0);
  const yon = takip === undefined || nonce === 0 ? '' : delta > 0 ? ' ust-serit-modul-deger-artis' : ' ust-serit-modul-deger-azalis';
  return (
    <div className="ust-serit-modul">
      {takip !== undefined && <DeltaRozeti key={nonce} deger={delta} nonce={nonce} birim={takipBirim} />}
      <span className="ust-serit-modul-ikon" aria-hidden="true">
        {ikon}
      </span>
      <div className="ust-serit-modul-metin">
        <span className="ust-serit-modul-etiket">{etiket}</span>
        <span
          key={`${etiket}-${nonce}`}
          className={`ust-serit-modul-deger${tehlike ? ' ust-serit-modul-deger-tehlike' : ''}${yon}`}
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
  const { m } = useDil();
  const yildiz = aranmaYildiz(sucSeviyesi);
  const slotlar = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(1, yildiz - i)));
  const tehlike = sucSeviyesi >= 45;
  const { delta, nonce } = useGecisDeltasi(sucSeviyesi);
  return (
    <div className="ust-serit-modul">
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
  onBolgeTikla,
}: UstSeritProps) {
  const { m, kt, ktHukumdar, dil } = useDil();
  const tema = bolgeTemasiGetir(bolge);
  return (
    <header className="ust-serit">
      <div className="ust-serit-moduller">
        <StatModulu ikon="📅" etiket={m.usYil} deger={yil} />
        <StatModulu ikon="🎂" etiket={m.usYas} deger={yas} />
        <StatModulu ikon="❤️" etiket={m.usCan} deger={Math.round(saglik)} tehlike={saglik <= 30} takip={Math.round(saglik)} />
        <StatModulu
          ikon="💰"
          etiket={m.usPara}
          deger={`${formatPara(para)} ${paraBirimi}`}
          tehlike={para < 0}
          takip={para}
          takipBirim={paraBirimi}
        />
        <StatModulu ikon="⚖️" etiket={m.usAhlak} deger={ahlakEtiketi(ahlak, dil)} takip={Math.round(ahlak)} />
        <StatModulu ikon="🙂" etiket={m.usMutluluk} deger={Math.round(mutluluk)} takip={Math.round(mutluluk)} />
        <AranmaModulu sucSeviyesi={sucSeviyesi} />
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
