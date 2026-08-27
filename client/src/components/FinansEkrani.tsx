import type { EkipUyesi, FinansOzeti, GecmisNoktasi, KonutTanimi, MulkKartBilgisi, YasamSecenegiTanimi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { konutGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';

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
    parcalar.push(`⭐ Ün ${etkiler.unEtkisiYillik > 0 ? '+' : ''}${etkiler.unEtkisiYillik}/yıl`);
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
  ekip: EkipUyesi[];
  mulkler: MulkKartBilgisi[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKonutDegistir: (konutId: string) => void;
  onYasamSecimiDegistir: (secimId: string) => void;
  onEkipCikar: (ekipId: string) => void;
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
  ekip,
  mulkler,
  yukleniyor,
  islemMesaji,
  onKonutDegistir,
  onYasamSecimiDegistir,
  onEkipCikar,
  onGeriDon,
}: FinansEkraniProps) {
  const { maasYillik, giderKalemleri, netYillik, enflasyonYuzdesi, gayrimenkulDegeri } = finans;
  const toplamGider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.vergi +
    giderKalemleri.savasVergisi;
  const sahipOlunanMulkler = mulkler.filter((m) => m.sahipMi);

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>Gelir &amp; Gider</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-govde-3col">
        <div className="tam-sutun">
          <h3 className="tam-baslik">Bütçen</h3>

          <div className="finans-karti">
            <div className="finans-satiri finans-gelir">
              <span>💰 Yıllık gelir</span>
              <span>
                +{formatPara(maasYillik)} {paraBirimi}
              </span>
            </div>
            {enflasyonYuzdesi > 0 && (
              <div className="finans-satiri finans-enflasyon">
                <span>📈 Enflasyon</span>
                <span>+%{enflasyonYuzdesi}</span>
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
            {giderKalemleri.vergi > 0 && (
              <>
                <div
                  className="finans-satiri"
                  title="Nakit + sahip olduğun mülklerin toplam değeri belli bir eşiği aştıkça devletin/kralın gözüne çarpar; aşan kısım için her yıl artan bir bakım/vergi payı öder."
                >
                  <span>👑 Zenginlik vergisi</span>
                  <span>
                    -{formatPara(giderKalemleri.vergi)} {paraBirimi}
                  </span>
                </div>
                <div className="finans-satiri finans-servet-detay">
                  <span>↳ Servetin: nakit + mülk</span>
                  <span>
                    {formatPara(para)} + {formatPara(gayrimenkulDegeri)} = {formatPara(para + gayrimenkulDegeri)} {paraBirimi}
                  </span>
                </div>
              </>
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

            <div className={`finans-satiri finans-net ${netYillik < 0 ? 'finans-net-negatif' : ''}`}>
              <span>Net yıllık</span>
              <span>
                {netYillik >= 0 ? '+' : ''}
                {formatPara(netYillik)} {paraBirimi}
              </span>
            </div>
          </div>

          <GecmisGrafik gecmis={gecmis} paraBirimi={paraBirimi} />
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">Yaşam Tarzın</h3>
          <p className="giris-aciklama">İstediğin an değiştirebilirsin, tur harcamaz.</p>
          <div className="yatirim-kartlari">
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
                    Yıllık gider: {secenek.maliyetYillik} {paraBirimi}. {secenek.aciklama}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>

          <h3 className="tam-baslik">Evin</h3>
          <p className="giris-aciklama">
            İstediğin an taşınabilirsin — bir kerelik {tasinmaMaliyeti} {paraBirimi} nakliye ücreti düşer, tur harcamaz.
            Daha ucuz bir eve geri çekilmek nakliye ücretinden muaftır.
          </p>
          <div className="yatirim-kartlari">
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
                    Yıllık kira: {konut.kiraYillik} {paraBirimi}. {konut.aciklama}
                  </span>
                  {etkiSatiri && <span className="meslek-aciklama yatirim-etki-satiri">{etkiSatiri}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">Varlıkların</h3>

          {sahipOlunanMulkler.length > 0 ? (
            <>
              <p className="giris-aciklama">
                Getirileri dünyanın o anki durumuna göre dalgalanır; kötü zamanlarda zarara da dönebilir.
              </p>
              <div className="yatirim-kartlari yatirim-mulk-kartlari">
                {sahipOlunanMulkler.map((mulk) => (
                  <div
                    key={mulk.tur}
                    className={`yatirim-kart mulk-kart mulk-kart-sahip${mulk.tahminiYillikGetiriMiktari < 0 ? ' mulk-kart-zararda' : ''}`}
                  >
                    <span className="meslek-simge">{mulk.simge}</span>
                    <strong>{mulk.ad}</strong>
                    <span className="meslek-aciklama">{mulk.aciklama}</span>
                    <span
                      className={`mulk-getiri ${mulk.tahminiYillikGetiriMiktari < 0 ? 'mulk-getiri-negatif' : 'mulk-getiri-pozitif'}`}
                    >
                      Şu an: {mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : ''}
                      {formatPara(mulk.tahminiYillikGetiriMiktari)} {paraBirimi}/yıl ({mulk.tahminiYillikGetiriYuzdesi >= 0 ? '+' : ''}
                      {mulk.tahminiYillikGetiriYuzdesi}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="giris-aciklama">Henüz sahip olduğun bir mülk yok — İşin &amp; Yatırımların ekranından edinebilirsin.</p>
          )}

          <h3 className="tam-baslik">Ekibin</h3>

          {ekip.length > 0 ? (
            <div className="yatirim-kartlari">
              {ekip.map((uye) => (
                <div key={uye.id} className="yatirim-kart ekip-kart">
                  <strong>
                    {uye.isim} <span className="komuta-ekip-rol">({uye.rol})</span>
                  </strong>
                  <span className="meslek-aciklama">
                    Yıllık maaş: {formatPara(uye.maas)} {paraBirimi} · Tahmini kalite: %{uye.tahminiMin}-{uye.tahminiMax}
                  </span>
                  <span className="meslek-aciklama">
                    🎭 {uye.kisilik} · 🤝 Sadakat %{uye.sadakat}
                  </span>
                  <button className="ikincil ekip-kov-buton" disabled={yukleniyor} onClick={() => onEkipCikar(uye.id)}>
                    Kov
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="giris-aciklama">Henüz kimseyi işe almadın.</p>
          )}
        </div>
      </div>

      <button className="tam-geri-buton" onClick={onGeriDon}>
        Geri Dön
      </button>
    </div>
  );
}
