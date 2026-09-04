import type { FinansOzeti, GecmisNoktasi, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { konutGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';

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
  const { maasYillik, giderKalemleri, netYillik, enflasyonYuzdesi, maasKirilim, gayrimenkulYillikGelir, dunyaEtkileri } =
    finans;
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.savasVergisi;
  // Gerçek net: maaş − gider + mülk geliri (server'ın netYillik'i sadece maaş − gider).
  const gercekNet = netYillik + gayrimenkulYillikGelir;
  // Yaşam tarzı + konut listesindeki liste fiyatları enflasyonsuz; gider dökümündeki
  // gerçek yaşam/kira tutarına (enflasyonla ölçekli) hizalamak için burada da uygularız.
  const enfCarpan = 1 + enflasyonYuzdesi / 100;
  const enflasyonluTutar = (taban: number) => Math.round(taban * enfCarpan * 100) / 100;

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>{m.shEv}</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-govde-3col tam-govde-3col-finans">
        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.feButcen}</h3>

          <div className="finans-karti">
            <div className="finans-satiri finans-gelir">
              <span>{m.feYillikMaas}</span>
              <span>
                +{formatPara(maasYillik)} {paraBirimi}
              </span>
            </div>

            <div className="finans-maas-kirilim">
              <div className="finans-satiri finans-kirilim-satiri">
                <span>
                  {m.feRutbedenGelen}{' '}
                  <em className="finans-kirilim-alt">
                    {kt(maasKirilim.rutbeAd)}
                    {maasKirilim.rutbeSeviye ? ` · Sv.${maasKirilim.rutbeSeviye}` : ''}
                  </em>
                </span>
                <span className="finans-kirilim-kalici">{yuzdeMetni(maasKirilim.rutbeYuzde, dil)} · {m.feKalici}</span>
              </div>

              {(maasKirilim.kariyerYuzde !== 0 || maasKirilim.kariyerKalemler.length > 0) && (
                <>
                  <div className="finans-satiri finans-kirilim-satiri">
                    <span>{m.feKariyerBirikimi}</span>
                    <span className="finans-kirilim-kalici">{yuzdeMetni(maasKirilim.kariyerYuzde, dil)} · {m.feKalici}</span>
                  </div>
                  {maasKirilim.kariyerKalemler.length > 0 && (
                    <div className="finans-kirilim-detay">
                      {maasKirilim.kariyerKalemler.map((k) => `${kt(k.ad)} ${yuzdeMetni(k.yuzde, dil)}`).join(' · ')}
                    </div>
                  )}
                </>
              )}

              <div className="finans-satiri finans-kirilim-satiri">
                <span>{m.feItibarin}</span>
                <span
                  className={
                    maasKirilim.itibarYuzde <= -8
                      ? 'finans-kirilim-degisken finans-net-negatif'
                      : 'finans-kirilim-degisken'
                  }
                >
                  {yuzdeMetni(maasKirilim.itibarYuzde, dil)} · {m.feDegisebilir}
                </span>
              </div>
              <div className="finans-kirilim-detay">
                {maasKirilim.itibarKalemler.map((k) => `${kt(k.ad)} ${yuzdeMetni(k.yuzde, dil)}`).join(' · ')}
              </div>
              {maasKirilim.itibarYuzde <= -8 && (
                <div className="finans-kirilim-detay finans-net-negatif">{m.feItibarUyari}</div>
              )}

              <div className="finans-satiri finans-kirilim-satiri">
                <span>{m.feDonemselEtkiler}</span>
                <span className="finans-kirilim-degisken">{yuzdeMetni(maasKirilim.donemselYuzde, dil)} · {m.feDegisebilir}</span>
              </div>
              {maasKirilim.donemselKalemler.filter((k) => k.ad !== 'Enflasyon').length > 0 && (
                <div className="finans-kirilim-detay">
                  {maasKirilim.donemselKalemler
                    .filter((k) => k.ad !== 'Enflasyon')
                    .map((k) => `${kt(k.ad)} ${yuzdeMetni(k.yuzde, dil)}`)
                    .join(' · ')}
                </div>
              )}

              <p className="finans-kirilim-not">{m.feMaasNot}</p>
            </div>

            <div className="finans-dunya-etkileri">
              <div className="finans-dunya-baslik">{m.feDunyaBaslik}</div>
              {dunyaEtkileri.length === 0 ? (
                <p className="finans-kirilim-detay">{m.feDunyaYok}</p>
              ) : (
                <ul className="finans-dunya-liste">
                  {dunyaEtkileri.map((e, i) => (
                    <li key={i}>
                      <span aria-hidden="true">{e.ikon}</span> {e.metin}
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
            <div className="finans-satiri">
              <span>{m.feEkipMaaslari}</span>
              <span>
                -{formatPara(giderKalemleri.ekip)} {paraBirimi}
              </span>
            </div>
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

            {gayrimenkulYillikGelir !== 0 ? (
              <>
                <div className="finans-satiri finans-servet-detay">
                  <span>{m.feMaasEksiGider}</span>
                  <span>
                    {netYillik >= 0 ? '+' : ''}
                    {formatPara(netYillik)} {paraBirimi}
                  </span>
                </div>
                <div className={`finans-satiri finans-net ${gercekNet < 0 ? 'finans-net-negatif' : ''}`}>
                  <span>{m.feNetYillikDahil}</span>
                  <span>
                    {gercekNet >= 0 ? '+' : ''}
                    {formatPara(gercekNet)} {paraBirimi}
                  </span>
                </div>
              </>
            ) : (
              <div className={`finans-satiri finans-net ${netYillik < 0 ? 'finans-net-negatif' : ''}`}>
                <span>{m.feNetYillik}</span>
                <span>
                  {netYillik >= 0 ? '+' : ''}
                  {formatPara(netYillik)} {paraBirimi}
                </span>
              </div>
            )}
          </div>

          <GecmisGrafik gecmis={gecmis} paraBirimi={paraBirimi} />
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.feYasamTarzin}</h3>
          <p className="giris-aciklama">{m.feDegistirNot}</p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {yasamSecenekleri.map((secenek) => {
              const guncel = secenek.id === guncelYasamSecimiId;
              const etkiSatiri = etkiSatiriGetir(m, secenek);
              return (
                <button
                  key={secenek.id}
                  className={`yatirim-kart${guncel ? ' yatirim-kart-secili' : ''}`}
                  disabled={yukleniyor || guncel}
                  onClick={() => onYasamSecimiDegistir(secenek.id)}
                >
                  <span className="meslek-simge">{secenek.simge}</span>
                  <strong>
                    {kt(secenek.ad)}
                    {guncel ? m.feSuAnBu : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    {m.feYillikGider}: {formatPara(enflasyonluTutar(secenek.maliyetYillik))} {paraBirimi}. {kt(secenek.aciklama)}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>

        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.feEvin}</h3>
          <p className="giris-aciklama">{bic(m.feTasinNot, tasinmaMaliyeti, paraBirimi)}</p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {konutlar.map((konut) => {
              const guncel = konut.id === guncelKonutId;
              const guncelKira = konutlar.find((k) => k.id === guncelKonutId)?.kiraYillik ?? 0;
              const geriCekilme = guncelKira > konut.kiraYillik;
              const tasinamaz = !guncel && !geriCekilme && para < tasinmaMaliyeti;
              const gorunum = konutGoruntusuGetir(konut.id, konut.ad, konut.simge, cag, dil);
              const etkiSatiri = etkiSatiriGetir(m, konut);
              return (
                <button
                  key={konut.id}
                  className={`yatirim-kart${guncel ? ' yatirim-kart-secili' : ''}`}
                  disabled={yukleniyor || guncel || tasinamaz}
                  onClick={() => onKonutDegistir(konut.id)}
                >
                  <span className="meslek-simge">{gorunum.simge}</span>
                  <strong>
                    {gorunum.ad}
                    {guncel ? m.feSuAnBurada : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    {m.feYillikKira}: {formatPara(enflasyonluTutar(konut.kiraYillik))} {paraBirimi}. {kt(konut.aciklama)}
                  </span>
                  {!guncel && (
                    <span className="meslek-aciklama yatirim-etki-satiri">
                      {geriCekilme ? m.feUcuzaGecis : bic(m.feNakliyeUcreti, tasinmaMaliyeti, paraBirimi)}
                    </span>
                  )}
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
