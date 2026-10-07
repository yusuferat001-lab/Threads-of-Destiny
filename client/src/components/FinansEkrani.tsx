import { useState } from 'react';
import type { FinansOzeti, GecmisNoktasi, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { konutGoruntusuGetir, yasamGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';

/** Çarpan yüzdesini biçimlendirir: +40 → "+%40" / "+40%", -15 → "−%15" / "−15%", 0 → "%0" / "0%". */
function yuzdeMetni(yuzde: number, dil: 'tr' | 'en'): string {
  const isaret = yuzde > 0 ? '+' : yuzde < 0 ? '−' : '';
  const mut = Math.abs(yuzde);
  return dil === 'en' ? `${isaret}${mut}%` : `${isaret}%${mut}`;
}

function etkiSatiriGetir(
  m: Metinler,
  etkiler: {
    saglikEtkisiYillik?: number;
    mutlulukEtkisiYillik?: number;
    unEtkisiYillik?: number;
  }
): string | null {
  const parcalar: string[] = [];
  if (etkiler.saglikEtkisiYillik) {
    parcalar.push(bic(m.feSaglikYil, (etkiler.saglikEtkisiYillik > 0 ? '+' : '') + etkiler.saglikEtkisiYillik));
  }
  if (etkiler.mutlulukEtkisiYillik) {
    parcalar.push(bic(m.feMutlulukYil, (etkiler.mutlulukEtkisiYillik > 0 ? '+' : '') + etkiler.mutlulukEtkisiYillik));
  }
  if (etkiler.unEtkisiYillik) {
    parcalar.push(bic(m.feSohretYil, (etkiler.unEtkisiYillik > 0 ? '+' : '') + etkiler.unEtkisiYillik));
  }
  return parcalar.length > 0 ? parcalar.join(' · ') : null;
}

interface FinansEkraniProps {
  finans: FinansOzeti;
  paraBirimi: string;
  para: number;
  cag: string;
  bolge: string;
  gecmis: GecmisNoktasi[];
  konutlar: KonutTanimi[];
  guncelKonutId: string;
  tasinmaMaliyeti: number;
  yasamSecenekleri: YasamSecenegiTanimi[];
  guncelYasamSecimiId: string;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKonutDegistir: (konutId: string) => void;
  onYasamSecimiDegistir: (secimId: string) => void;
  onGeriDon: () => void;
}

export function FinansEkrani({
  finans,
  paraBirimi,
  para,
  cag,
  bolge,
  gecmis,
  konutlar,
  guncelKonutId,
  tasinmaMaliyeti,
  yasamSecenekleri,
  guncelYasamSecimiId,
  yukleniyor,
  islemMesaji,
  onKonutDegistir,
  onYasamSecimiDegistir,
  onGeriDon,
}: FinansEkraniProps) {
  const { m, kt, dil } = useDil();
  const mobil = useMobilEkran();
  const [aktifSekme, setAktifSekme] = useState(0);
  const { maasYillik, giderKalemleri, netYillik, giderEnflasyonYuzdesi, maasKirilim, gayrimenkulYillikGelir } = finans;
  const kirilimKalem = (kalemler: { ad: string; yuzde: number }[]) =>
    kalemler.length > 0 ? ` (${kalemler.map((k) => `${kt(k.ad)} ${yuzdeMetni(k.yuzde, dil)}`).join(' · ')})` : '';
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.savasVergisi;
  // Gerçek net: maaş − gider + mülk geliri (server'ın netYillik'i sadece maaş − gider).
  const gercekNet = netYillik + gayrimenkulYillikGelir;
  // Yaşam tarzı + konut listesindeki liste fiyatları enflasyonsuz; gider dökümündeki
  // gerçek yaşam/kira tutarıyla BİREBİR hizalamak için GİDER enflasyonu çarpanını
  // kullanırız (gelir enflasyonu değil — eskiden o kullanılıyordu ve kart tutarı
  // gerçek giderden farklı çıkıyordu).
  const enfCarpan = 1 + giderEnflasyonYuzdesi / 100;
  const enflasyonluTutar = (taban: number) => Math.round(taban * enfCarpan * 100) / 100;

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>{m.shEv}</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      {mobil && (
        <div className="ekran-sekmeleri">
          {[m.feButcen, m.feYasamTarzin, m.feEvin].map((baslik, i) => (
            <button
              key={i}
              type="button"
              className={`ekran-sekme${aktifSekme === i ? ' ekran-sekme-aktif' : ''}`}
              onClick={() => setAktifSekme(i)}
            >
              {baslik}
            </button>
          ))}
        </div>
      )}

      <div className={mobil ? 'tam-sutun-tekli-sarici' : 'tam-govde-3col tam-govde-3col-finans'}>
        <div className="tam-sutun" hidden={mobil && aktifSekme !== 0}>
          <h3 className="tam-baslik">{m.feButcen}</h3>

          <div className="finans-karti">
            <div className="finans-satiri finans-gelir">
              <span>{m.feYillikMaas}</span>
              <span>
                +{formatPara(maasYillik)} {paraBirimi}
              </span>
            </div>

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
        </div>

        <div className="tam-sutun" hidden={mobil && aktifSekme !== 1}>
          <h3 className="tam-baslik">{m.feYasamTarzin}</h3>
          <p className="giris-aciklama tam-yardimci-metin">{m.feDegistirNot}</p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {yasamSecenekleri.map((secenek) => {
              const guncel = secenek.id === guncelYasamSecimiId;
              const etkiSatiri = etkiSatiriGetir(m, secenek);
              const gorunum = yasamGoruntusuGetir(secenek.id, secenek.ad, secenek.simge, cag, bolge, dil);
              return (
                <button
                  key={secenek.id}
                  className={`yatirim-kart${guncel ? ' yatirim-kart-secili' : ''}`}
                  disabled={yukleniyor || guncel}
                  onClick={() => onYasamSecimiDegistir(secenek.id)}
                  title={kt(secenek.aciklama)}
                >
                  <span className="meslek-simge">{gorunum.simge}</span>
                  <strong>
                    {gorunum.ad}
                    {guncel ? ' ✓' : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    {formatPara(enflasyonluTutar(secenek.maliyetYillik))} {paraBirimi}/{m.yil}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>

        </div>

        <div className="tam-sutun" hidden={mobil && aktifSekme !== 2}>
          <h3 className="tam-baslik">{m.feEvin}</h3>
          <p className="giris-aciklama tam-yardimci-metin">{bic(m.feTasinNotKisa, tasinmaMaliyeti, paraBirimi)}</p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {konutlar.map((konut) => {
              const guncel = konut.id === guncelKonutId;
              const guncelKira = konutlar.find((k) => k.id === guncelKonutId)?.kiraYillik ?? 0;
              const geriCekilme = guncelKira > konut.kiraYillik;
              const tasinamaz = !guncel && !geriCekilme && para < tasinmaMaliyeti;
              const gorunum = konutGoruntusuGetir(konut.id, konut.ad, konut.simge, cag, bolge, dil);
              const etkiSatiri = etkiSatiriGetir(m, konut);
              return (
                <button
                  key={konut.id}
                  className={`yatirim-kart${guncel ? ' yatirim-kart-secili' : ''}`}
                  disabled={yukleniyor || guncel || tasinamaz}
                  onClick={() => onKonutDegistir(konut.id)}
                  title={kt(konut.aciklama)}
                >
                  <span className="meslek-simge">{gorunum.simge}</span>
                  <strong>
                    {gorunum.ad}
                    {guncel ? ' ✓' : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    {formatPara(enflasyonluTutar(konut.kiraYillik))} {paraBirimi}/{m.yil}
                    {!guncel && !geriCekilme ? bic(m.feTasinmaKisa, tasinmaMaliyeti, paraBirimi) : ''}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button className="tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
