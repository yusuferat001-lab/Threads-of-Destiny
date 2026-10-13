import { useState } from 'react';
import type { FinansOzeti, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { konutGoruntusuGetir, yasamGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';

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
  const { giderEnflasyonYuzdesi } = finans;
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
          {[m.feYasamTarzin, m.feEvin].map((baslik, i) => (
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

      <div className={mobil ? 'tam-sutun-tekli-sarici' : 'tam-govde-2col'}>
        <div className="tam-sutun" hidden={mobil && aktifSekme !== 0}>
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

        <div className="tam-sutun" hidden={mobil && aktifSekme !== 1}>
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
