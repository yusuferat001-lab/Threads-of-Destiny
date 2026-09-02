import type { FinansOzeti, GecmisNoktasi, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { konutGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';

/** Çarpan yüzdesini Türkçe biçimde: +40 → "+%40", -15 → "−%15", 0 → "%0". */
function yuzdeMetni(yuzde: number): string {
  if (yuzde > 0) return `+%${yuzde}`;
  if (yuzde < 0) return `−%${Math.abs(yuzde)}`;
  return '%0';
}

function etkiSatiriGetir(etkiler: {
  saglikEtkisiYillik?: number;
  mutlulukEtkisiYillik?: number;
  unEtkisiYillik?: number;
}): string | null {
  const parcalar: string[] = [];
  if (etkiler.saglikEtkisiYillik) {
    parcalar.push(`🩺 Sağlık ${etkiler.saglikEtkisiYillik > 0 ? '+' : ''}${etkiler.saglikEtkisiYillik}/yıl`);
  }
  if (etkiler.mutlulukEtkisiYillik) {
    parcalar.push(`😊 Mutluluk ${etkiler.mutlulukEtkisiYillik > 0 ? '+' : ''}${etkiler.mutlulukEtkisiYillik}/yıl`);
  }
  if (etkiler.unEtkisiYillik) {
    parcalar.push(`⭐ Şöhret ${etkiler.unEtkisiYillik > 0 ? '+' : ''}${etkiler.unEtkisiYillik}/yıl`);
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
      <h2>Gelir &amp; Gider</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-govde-3col tam-govde-3col-finans">
        <div className="tam-sutun">
          <h3 className="tam-baslik">Bütçen</h3>

          <div className="finans-karti">
            <div className="finans-satiri finans-gelir">
              <span>💰 Yıllık maaş</span>
              <span>
                +{formatPara(maasYillik)} {paraBirimi}
              </span>
            </div>

            <div className="finans-maas-kirilim">
              <div className="finans-satiri finans-kirilim-satiri">
                <span>
                  🎖️ Rütbeden gelen{' '}
                  <em className="finans-kirilim-alt">
                    {maasKirilim.rutbeAd}
                    {maasKirilim.rutbeSeviye ? ` · Sv.${maasKirilim.rutbeSeviye}` : ''}
                  </em>
                </span>
                <span className="finans-kirilim-kalici">{yuzdeMetni(maasKirilim.rutbeYuzde)} · kalıcı</span>
              </div>

              {(maasKirilim.kariyerYuzde !== 0 || maasKirilim.kariyerKalemler.length > 0) && (
                <>
                  <div className="finans-satiri finans-kirilim-satiri">
                    <span>📈 Kariyer birikimi</span>
                    <span className="finans-kirilim-kalici">{yuzdeMetni(maasKirilim.kariyerYuzde)} · kalıcı</span>
                  </div>
                  {maasKirilim.kariyerKalemler.length > 0 && (
                    <div className="finans-kirilim-detay">
                      {maasKirilim.kariyerKalemler.map((k) => `${k.ad} ${yuzdeMetni(k.yuzde)}`).join(' · ')}
                    </div>
                  )}
                </>
              )}

              <div className="finans-satiri finans-kirilim-satiri">
                <span>🤝 İtibarın</span>
                <span
                  className={
                    maasKirilim.itibarYuzde <= -8
                      ? 'finans-kirilim-degisken finans-net-negatif'
                      : 'finans-kirilim-degisken'
                  }
                >
                  {yuzdeMetni(maasKirilim.itibarYuzde)} · değişebilir
                </span>
              </div>
              <div className="finans-kirilim-detay">
                {maasKirilim.itibarKalemler.map((k) => `${k.ad} ${yuzdeMetni(k.yuzde)}`).join(' · ')}
              </div>
              {maasKirilim.itibarYuzde <= -8 && (
                <div className="finans-kirilim-detay finans-net-negatif">İtibarın gelirini ciddi düşürüyor.</div>
              )}

              <div className="finans-satiri finans-kirilim-satiri">
                <span>🌍 Dönemsel yüzdelik etkiler</span>
                <span className="finans-kirilim-degisken">{yuzdeMetni(maasKirilim.donemselYuzde)} · değişebilir</span>
              </div>
              {maasKirilim.donemselKalemler.filter((k) => k.ad !== 'Enflasyon').length > 0 && (
                <div className="finans-kirilim-detay">
                  {maasKirilim.donemselKalemler
                    .filter((k) => k.ad !== 'Enflasyon')
                    .map((k) => `${k.ad} ${yuzdeMetni(k.yuzde)}`)
                    .join(' · ')}
                </div>
              )}

              <p className="finans-kirilim-not">
                🎖️ Rütbe ve kariyer primleri kalıcıdır — rütbe asla düşmez. Dönemsel etkiler ekonomi, savaş ve salgınla birlikte
                değişir. 🤝 Mutlu, saygın ve dürüst biri işini daha iyi yapar ve kapıları daha kolay açılır; bu üçünden biri
                düştükçe gelirin belirgin azalır, üçü de yüksekken maaşına bonus biner. Düşüşün cezası yükselişin iki katıdır.
              </p>
            </div>

            <div className="finans-dunya-etkileri">
              <div className="finans-dunya-baslik">🌍 Şu an bütçeni etkileyen dünya durumları</div>
              {dunyaEtkileri.length === 0 ? (
                <p className="finans-kirilim-detay">Şu an bütçeni sarsan olağan dışı bir durum yok.</p>
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
                title="Sahip olduğun mülklerin şu anki dünya durumuna göre yıllık tahmini net getirisi; maaşından ayrı bir gelir akışıdır ve kötü zamanlarda zarara dönebilir."
              >
                <span>🏠 Gayrimenkul geliri</span>
                <span>
                  {gayrimenkulYillikGelir >= 0 ? '+' : '−'}
                  {formatPara(Math.abs(gayrimenkulYillikGelir))} {paraBirimi}
                </span>
              </div>
            )}

            <h3>Yıllık giderler</h3>
            <div className="finans-satiri">
              <span>🍞 Yaşam</span>
              <span>
                -{formatPara(giderKalemleri.yasam)} {paraBirimi}
              </span>
            </div>
            <div className="finans-satiri">
              <span>🏠 Ev kirası</span>
              <span>
                -{formatPara(giderKalemleri.konut)} {paraBirimi}
              </span>
            </div>
            <div className="finans-satiri">
              <span>🧑 Ekip maaşları</span>
              <span>
                -{formatPara(giderKalemleri.ekip)} {paraBirimi}
              </span>
            </div>
            {giderKalemleri.evcilHayvan > 0 && (
              <div className="finans-satiri">
                <span>🐾 Evcil hayvan bakımı</span>
                <span>
                  -{formatPara(giderKalemleri.evcilHayvan)} {paraBirimi}
                </span>
              </div>
            )}
            {giderKalemleri.savasVergisi > 0 && (
              <div className="finans-satiri" title="Aktif bir büyük savaş sürerken hükümdar pasif gelirinden ek bir savaş vergisi kesiyor.">
                <span>⚔️ Savaş vergisi</span>
                <span>
                  -{formatPara(giderKalemleri.savasVergisi)} {paraBirimi}
                </span>
              </div>
            )}
            <div className="finans-satiri finans-toplam-gider">
              <span>Toplam gider</span>
              <span>
                -{formatPara(toplamGider)} {paraBirimi}
              </span>
            </div>

            {gayrimenkulYillikGelir !== 0 ? (
              <>
                <div className="finans-satiri finans-servet-detay">
                  <span>↳ Maaş − gider</span>
                  <span>
                    {netYillik >= 0 ? '+' : ''}
                    {formatPara(netYillik)} {paraBirimi}
                  </span>
                </div>
                <div className={`finans-satiri finans-net ${gercekNet < 0 ? 'finans-net-negatif' : ''}`}>
                  <span>Net yıllık (gayrimenkul dahil)</span>
                  <span>
                    {gercekNet >= 0 ? '+' : ''}
                    {formatPara(gercekNet)} {paraBirimi}
                  </span>
                </div>
              </>
            ) : (
              <div className={`finans-satiri finans-net ${netYillik < 0 ? 'finans-net-negatif' : ''}`}>
                <span>Net yıllık</span>
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
          <h3 className="tam-baslik">Yaşam Tarzın</h3>
          <p className="giris-aciklama">İstediğin an değiştirebilirsin, tur harcamaz.</p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {yasamSecenekleri.map((secenek) => {
              const guncel = secenek.id === guncelYasamSecimiId;
              const etkiSatiri = etkiSatiriGetir(secenek);
              return (
                <button
                  key={secenek.id}
                  className={`yatirim-kart${guncel ? ' yatirim-kart-secili' : ''}`}
                  disabled={yukleniyor || guncel}
                  onClick={() => onYasamSecimiDegistir(secenek.id)}
                >
                  <span className="meslek-simge">{secenek.simge}</span>
                  <strong>
                    {secenek.ad}
                    {guncel ? ' (şu an bu)' : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    Yıllık gider: {formatPara(enflasyonluTutar(secenek.maliyetYillik))} {paraBirimi}. {secenek.aciklama}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>

        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">Evin</h3>
          <p className="giris-aciklama">
            İstediğin an taşın, tur harcamaz. Daha pahalı eve geçişte bir kerelik {tasinmaMaliyeti} {paraBirimi} nakliye
            ücreti; ucuza geri çekilmek bedava.
          </p>
          <div className="yatirim-kartlari finans-secim-izgara">
            {konutlar.map((konut) => {
              const guncel = konut.id === guncelKonutId;
              const guncelKira = konutlar.find((k) => k.id === guncelKonutId)?.kiraYillik ?? 0;
              const geriCekilme = guncelKira > konut.kiraYillik;
              const tasinamaz = !guncel && !geriCekilme && para < tasinmaMaliyeti;
              const gorunum = konutGoruntusuGetir(konut.id, konut.ad, konut.simge, cag);
              const etkiSatiri = etkiSatiriGetir(konut);
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
                    {guncel ? ' (şu an burada)' : ''}
                  </strong>
                  <span className="meslek-aciklama">
                    Yıllık kira: {formatPara(enflasyonluTutar(konut.kiraYillik))} {paraBirimi}. {konut.aciklama}
                  </span>
                  {!guncel && (
                    <span className="meslek-aciklama yatirim-etki-satiri">
                      {geriCekilme
                        ? '↩️ Ucuza geçiş: nakliye ücretsiz'
                        : `🚚 Bir kerelik ${tasinmaMaliyeti} ${paraBirimi} nakliye ücreti`}
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
        Geri Dön
      </button>
    </div>
  );
}
