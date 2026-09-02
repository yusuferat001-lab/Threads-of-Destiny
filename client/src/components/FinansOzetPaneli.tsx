import type { FinansOzeti } from '../types';
import { formatPara } from '../format';

interface FinansOzetPaneliProps {
  finans: FinansOzeti | null;
  maasYillikYedek: number;
  paraBirimi: string;
}

/** +40 → "+%40", -15 → "−%15", 0 → "%0" */
function yuzdeKisa(y: number): string {
  if (y > 0) return `+%${y}`;
  if (y < 0) return `−%${Math.abs(y)}`;
  return '%0';
}

/** Sol paneldeki kompakt gelir/gider/net özeti + maaşın rütbe/ün/dönemsel kırılımı
 *  ve şu an etkin dünya olayları — oyuncunun her an göz ucuyla bakabileceği özet.
 *  Tam döküm "Gelir & Gider" ekranında. */
export function FinansOzetPaneli({ finans, maasYillikYedek, paraBirimi }: FinansOzetPaneliProps) {
  const kirilim = finans?.maasKirilim ?? null;
  const dunyaEtkileri = finans?.dunyaEtkileri ?? [];
  // "Yıllık gelir" = maaş + (varsa) mülklerden gelen tahmini yıllık net gelir; ikisi ayrı akış
  // ama oyuncunun göz ucuyla baktığı özet için toplamı daha anlamlı.
  const gelir = (finans?.maasYillik ?? maasYillikYedek) + (finans?.gayrimenkulYillikGelir ?? 0);
  const toplamGider = finans
    ? finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.savasVergisi
    : null;
  const net = finans ? finans.netYillik + finans.gayrimenkulYillikGelir : null;

  return (
    <div className="finans-ozet-mini">
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">💰 Yıllık gelir</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-pozitif">
          +{formatPara(gelir)} {paraBirimi}
        </span>
      </div>
      <div className="finans-ozet-mini-satir">
        <span className="finans-ozet-mini-etiket">📉 Yıllık gider</span>
        <span className="finans-ozet-mini-deger finans-ozet-mini-negatif">
          {toplamGider === null ? '…' : `-${formatPara(toplamGider)} ${paraBirimi}`}
        </span>
      </div>
      <div
        className={`finans-ozet-mini-satir finans-ozet-mini-net${net !== null && net < 0 ? ' finans-ozet-mini-net-negatif' : ''}`}
      >
        <span className="finans-ozet-mini-etiket">Eline kalan</span>
        <span className="finans-ozet-mini-deger">
          {net === null ? '…' : `${net >= 0 ? '+' : ''}${formatPara(net)} ${paraBirimi}`}
        </span>
      </div>

      {kirilim && (
        <div
          className="finans-ozet-mini-kirilim"
          title={`Maaşın nasıl oluşuyor:\n🎖️ Rütbe (${kirilim.rutbeAd}): ${yuzdeKisa(kirilim.rutbeYuzde)} · kalıcı\n📈 Kariyer birikimi (kıdem, şehir yönetimi): ${yuzdeKisa(kirilim.kariyerYuzde)} · kalıcı\n🤝 İtibarın (mutluluk, şöhret, ahlak): ${yuzdeKisa(kirilim.itibarYuzde)} · değişken\n🌍 Dönemsel (ekonomi, savaş, salgın): ${yuzdeKisa(kirilim.donemselYuzde)} · değişken\nTam döküm: Gelir & Gider ekranı`}
        >
          <span>🎖️ {yuzdeKisa(kirilim.rutbeYuzde)}</span>
          <span>📈 {yuzdeKisa(kirilim.kariyerYuzde)}</span>
          <span className={kirilim.itibarYuzde <= -12 ? 'finans-net-negatif' : undefined}>
            🤝 {yuzdeKisa(kirilim.itibarYuzde)}
          </span>
          <span>🌍 {yuzdeKisa(kirilim.donemselYuzde)}</span>
        </div>
      )}

      {dunyaEtkileri.length > 0 && (
        <div className="finans-ozet-mini-dunya" title={dunyaEtkileri.map((e) => `${e.ikon} ${e.metin}`).join('\n')}>
          {dunyaEtkileri.map((e, i) => (
            <span key={i} className="finans-ozet-mini-dunya-cip">
              {e.ikon} {e.metin.split(':')[0]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
