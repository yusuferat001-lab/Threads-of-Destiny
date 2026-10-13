import type { FinansOzeti, GecmisNoktasi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { formatPara } from '../format';
import { useDil } from '../DilContext';

/** Çarpan yüzdesini biçimlendirir: +40 → "+%40" / "+40%", -15 → "−%15" / "−15%", 0 → "%0" / "0%". */
function yuzdeMetni(yuzde: number, dil: 'tr' | 'en'): string {
  const isaret = yuzde > 0 ? '+' : yuzde < 0 ? '−' : '';
  const mut = Math.abs(yuzde);
  return dil === 'en' ? `${isaret}${mut}%` : `${isaret}%${mut}`;
}

interface ButcePaneliProps {
  finans: FinansOzeti;
  paraBirimi: string;
  gecmis: GecmisNoktasi[];
  /** İşletmesi olan meslekte "maaş" yerine son yılın kârı gösterilir, maaş kırılımı gizlenir. */
  isletmeAktif?: boolean;
}

/** Gelir & gider dökümü ("Bütçen") — Evin ekranından Kariyer ekranına taşındı (2026-10). */
export function ButcePaneli({ finans, paraBirimi, gecmis, isletmeAktif = false }: ButcePaneliProps) {
  const { m, kt, dil } = useDil();
  const { maasYillik, giderKalemleri, netYillik, maasKirilim, gayrimenkulYillikGelir } = finans;
  const kirilimKalem = (kalemler: { ad: string; yuzde: number }[]) =>
    kalemler.length > 0 ? ` (${kalemler.map((k) => `${kt(k.ad)} ${yuzdeMetni(k.yuzde, dil)}`).join(' · ')})` : '';
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.savasVergisi;
  const gercekNet = netYillik + gayrimenkulYillikGelir;

  return (
    <section className="butce-paneli">
      <h3 className="tam-baslik">{m.feButcen}</h3>

          <div className="finans-karti">
            <div className="finans-satiri finans-gelir">
              <span>{isletmeAktif ? (dil === 'en' ? "💰 Last year's profit" : '💰 Geçen yılın kârı') : m.feYillikMaas}</span>
              <span>
                +{formatPara(maasYillik)} {paraBirimi}
              </span>
            </div>

            {!isletmeAktif && (
            <details className="finans-maas-kirilim">
              <summary className="finans-kirilim-ozet">
                <span>🎖️ {yuzdeMetni(maasKirilim.rutbeYuzde, dil)}</span>
                <span>📈 {yuzdeMetni(maasKirilim.kariyerYuzde, dil)}</span>
                <span className={maasKirilim.itibarYuzde <= -8 ? 'finans-net-negatif' : undefined}>
                  🤝 {yuzdeMetni(maasKirilim.itibarYuzde, dil)}
                </span>
                {maasKirilim.pazarAdi && (
                  <span className={maasKirilim.pazarYuzde < 0 ? 'finans-net-negatif' : undefined}>
                    🏪 {yuzdeMetni(maasKirilim.pazarYuzde, dil)}
                  </span>
                )}
                <span>🌍 {yuzdeMetni(maasKirilim.donemselYuzde, dil)}</span>
              </summary>
              <div className="finans-kirilim-detay">
                🎖️ {m.feRutbedenGelen} — {kt(maasKirilim.rutbeAd)}
                {maasKirilim.rutbeSeviye ? ` · Sv.${maasKirilim.rutbeSeviye}` : ''}: {yuzdeMetni(maasKirilim.rutbeYuzde, dil)} ·{' '}
                {m.feKalici}
              </div>
              <div className="finans-kirilim-detay">
                📈 {m.feKariyerBirikimi}: {yuzdeMetni(maasKirilim.kariyerYuzde, dil)} · {m.feKalici}
                {kirilimKalem(maasKirilim.kariyerKalemler)}
              </div>
              <div className={`finans-kirilim-detay${maasKirilim.itibarYuzde <= -8 ? ' finans-net-negatif' : ''}`}>
                🤝 {m.feItibarin}: {yuzdeMetni(maasKirilim.itibarYuzde, dil)} · {m.feDegisebilir}
                {kirilimKalem(maasKirilim.itibarKalemler)}
                {maasKirilim.itibarYuzde <= -8 ? ` — ${m.feItibarUyari}` : ''}
              </div>
              {maasKirilim.pazarAdi && (
                <div className={`finans-kirilim-detay${maasKirilim.pazarYuzde < 0 ? ' finans-net-negatif' : ''}`}>
                  🏪 {maasKirilim.pazarAdi} %{maasKirilim.pazarPayiYuzde}: {yuzdeMetni(maasKirilim.pazarYuzde, dil)} ·{' '}
                  {m.feDegisebilir} — {m.fePazarNot}
                </div>
              )}
              <div className="finans-kirilim-detay">
                🌍 {m.feDonemselEtkiler}: {yuzdeMetni(maasKirilim.donemselYuzde, dil)} · {m.feDegisebilir}
                {kirilimKalem(maasKirilim.donemselKalemler.filter((k) => k.ad !== 'Enflasyon'))}
              </div>
              <div className="finans-kirilim-detay finans-kirilim-lejant">{m.feKirilimLejant}</div>
            </details>
            )}

            {gayrimenkulYillikGelir !== 0 && (
              <div
                className={`finans-satiri finans-gelir ${gayrimenkulYillikGelir < 0 ? 'finans-net-negatif' : ''}`}
                title={m.feGayrimenkulTitle}
              >
                <span>{m.feGayrimenkulGeliri}</span>
                <span>
                  {gayrimenkulYillikGelir >= 0 ? '+' : '−'}
                  {formatPara(Math.abs(gayrimenkulYillikGelir))} {paraBirimi}
                </span>
              </div>
            )}

            <h3>{m.feYillikGiderler}</h3>
            <div className="finans-satiri">
              <span>{m.feYasam}</span>
              <span>
                -{formatPara(giderKalemleri.yasam)} {paraBirimi}
              </span>
            </div>
            <div className="finans-satiri">
              <span>{m.feEvKirasi}</span>
              <span>
                -{formatPara(giderKalemleri.konut)} {paraBirimi}
              </span>
            </div>
            {giderKalemleri.ekip > 0 && (
              <div className="finans-satiri">
                <span>{m.feEkipMaaslari}</span>
                <span>
                  -{formatPara(giderKalemleri.ekip)} {paraBirimi}
                </span>
              </div>
            )}
            {giderKalemleri.evcilHayvan > 0 && (
              <div className="finans-satiri">
                <span>{m.feEvcilHayvanBakimi}</span>
                <span>
                  -{formatPara(giderKalemleri.evcilHayvan)} {paraBirimi}
                </span>
              </div>
            )}
            {giderKalemleri.savasVergisi > 0 && (
              <div className="finans-satiri" title={m.feSavasVergisiTitle}>
                <span>{m.feSavasVergisi}</span>
                <span>
                  -{formatPara(giderKalemleri.savasVergisi)} {paraBirimi}
                </span>
              </div>
            )}
            <div className="finans-satiri finans-toplam-gider">
              <span>{m.feToplamGider}</span>
              <span>
                -{formatPara(toplamGider)} {paraBirimi}
              </span>
            </div>

            <div className={`finans-satiri finans-net ${gercekNet < 0 ? 'finans-net-negatif' : ''}`}>
              <span>{gayrimenkulYillikGelir !== 0 ? m.feNetYillikDahil : m.feNetYillik}</span>
              <span>
                {gercekNet >= 0 ? '+' : ''}
                {formatPara(gercekNet)} {paraBirimi}
              </span>
            </div>
          </div>

          <GecmisGrafik gecmis={gecmis} paraBirimi={paraBirimi} />
    </section>
  );
}
