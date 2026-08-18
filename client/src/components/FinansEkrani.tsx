import type { EkipUyesi, FinansOzeti, GecmisNoktasi, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { GecmisGrafik } from './GecmisGrafik';
import { konutGoruntusuGetir } from '../bolgeTema';

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
  yukleniyor,
  islemMesaji,
  onKonutDegistir,
  onYasamSecimiDegistir,
  onEkipCikar,
  onGeriDon,
}: FinansEkraniProps) {
  const { maasYillik, giderKalemleri, netYillik, enflasyonYuzdesi } = finans;
  const toplamGider =
    giderKalemleri.yasam + giderKalemleri.konut + giderKalemleri.ekip + giderKalemleri.evcilHayvan + giderKalemleri.vergi;

  return (
    <div className="ekran ekran-finans">
      <h2>Gelir &amp; Gider</h2>

      <div className="finans-karti">
        <div className="finans-satiri finans-gelir">
          <span>💰 Yıllık gelir</span>
          <span>
            +{maasYillik} {paraBirimi}
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
            -{giderKalemleri.yasam} {paraBirimi}
          </span>
        </div>
        <div className="finans-satiri">
          <span>🏠 Ev kirası</span>
          <span>
            -{giderKalemleri.konut} {paraBirimi}
          </span>
        </div>
        <div className="finans-satiri">
          <span>🧑 Ekip maaşları</span>
          <span>
            -{giderKalemleri.ekip} {paraBirimi}
          </span>
        </div>
        {giderKalemleri.evcilHayvan > 0 && (
          <div className="finans-satiri">
            <span>🐾 Evcil hayvan bakımı</span>
            <span>
              -{giderKalemleri.evcilHayvan} {paraBirimi}
            </span>
          </div>
        )}
        {giderKalemleri.vergi > 0 && (
          <div className="finans-satiri" title="Servetin belli bir eşiği aştıkça devletin/kralın gözüne çarpar; her yıl artan bir bakım/vergi payı öder.">
            <span>👑 Zenginlik vergisi</span>
            <span>
              -{giderKalemleri.vergi} {paraBirimi}
            </span>
          </div>
        )}
        <div className="finans-satiri finans-toplam-gider">
          <span>Toplam gider</span>
          <span>
            -{toplamGider} {paraBirimi}
          </span>
        </div>

        <div className={`finans-satiri finans-net ${netYillik < 0 ? 'finans-net-negatif' : ''}`}>
          <span>Net yıllık</span>
          <span>
            {netYillik >= 0 ? '+' : ''}
            {netYillik} {paraBirimi}
          </span>
        </div>
      </div>

      {ekip.length > 0 && (
        <>
          <h3 className="finans-konut-baslik">Ekibin</h3>
          <div className="yatirim-kartlari">
            {ekip.map((uye) => (
              <div key={uye.id} className="yatirim-kart ekip-kart">
                <strong>
                  {uye.isim} <span className="komuta-ekip-rol">({uye.rol})</span>
                </strong>
                <span className="meslek-aciklama">
                  Yıllık maaş: {uye.maas} {paraBirimi} · Tahmini kalite: %{uye.tahminiMin}-{uye.tahminiMax}
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
        </>
      )}

      <GecmisGrafik gecmis={gecmis} paraBirimi={paraBirimi} />

      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <h3 className="finans-konut-baslik">Yaşam Tarzın</h3>
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

      <h3 className="finans-konut-baslik">Evin</h3>
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

      <button onClick={onGeriDon}>Devam Et</button>
    </div>
  );
}
