import { useState } from 'react';
import type { FinansOzeti, KonutTanimi, YasamSecenegiTanimi } from '../types';
import { konutGoruntusuGetir, yasamGoruntusuGetir } from '../bolgeTema';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';
import { RenkliEtki } from './Renkli';
import { KararOnay, KararSatiri } from './KararKabuk';

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
  const [secimYasam, setSecimYasam] = useState<string | null>(null);
  const [secimKonut, setSecimKonut] = useState<string | null>(null);
  const { giderEnflasyonYuzdesi } = finans;
  // Yaşam tarzı + konut listesindeki liste fiyatları enflasyonsuz; gider dökümündeki
  // gerçek yaşam/kira tutarıyla BİREBİR hizalamak için GİDER enflasyonu çarpanını
  // kullanırız (gelir enflasyonu değil — eskiden o kullanılıyordu ve kart tutarı
  // gerçek giderden farklı çıkıyordu).
  const enfCarpan = 1 + giderEnflasyonYuzdesi / 100;
  const enflasyonluTutar = (taban: number) => Math.round(taban * enfCarpan * 100) / 100;

  return (
    <div className="ekran ekran-tam-sayfa ekran-yan">
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
          <div className="kk-liste kk-secimler">
            {yasamSecenekleri.map((secenek) => {
              const guncel = secenek.id === guncelYasamSecimiId;
              const etkiSatiri = etkiSatiriGetir(m, secenek);
              const gorunum = yasamGoruntusuGetir(secenek.id, secenek.ad, secenek.simge, cag, bolge, dil);
              return (
                <KararSatiri
                  key={secenek.id}
                  kol={guncel ? 'sadik' : 'evrensel'}
                  simge={gorunum.simge}
                  dal={guncel ? (dil === 'en' ? 'Current' : 'Şu an') : undefined}
                  ad={gorunum.ad}
                  cipler={
                    <>
                      <span className="kk-cip s-gider">
                        {formatPara(enflasyonluTutar(secenek.maliyetYillik))} {paraBirimi}/{m.yil}
                      </span>
                      {etkiSatiri && (
                        <span className="kk-cip">
                          <RenkliEtki metin={etkiSatiri} />
                        </span>
                      )}
                    </>
                  }
                  detay={kt(secenek.aciklama)}
                  secili={secimYasam === secenek.id}
                  disabled={yukleniyor || guncel}
                  onClick={() => setSecimYasam(secenek.id)}
                />
              );
            })}
          </div>
          <KararOnay
            not={secimYasam ? '' : dil === 'en' ? 'Pick a lifestyle.' : 'Bir yaşam tarzı seç.'}
            etiket={dil === 'en' ? 'Switch' : 'Değiştir'}
            disabled={yukleniyor || !secimYasam}
            onClick={() => {
              if (!secimYasam) return;
              onYasamSecimiDegistir(secimYasam);
              setSecimYasam(null);
            }}
          />
        </div>

        <div className="tam-sutun" hidden={mobil && aktifSekme !== 1}>
          <h3 className="tam-baslik">{m.feEvin}</h3>
          <p className="giris-aciklama tam-yardimci-metin">{bic(m.feTasinNotKisa, tasinmaMaliyeti, paraBirimi)}</p>
          <div className="kk-liste kk-secimler">
            {konutlar.map((konut) => {
              const guncel = konut.id === guncelKonutId;
              const guncelKira = konutlar.find((k) => k.id === guncelKonutId)?.kiraYillik ?? 0;
              const geriCekilme = guncelKira > konut.kiraYillik;
              const tasinamaz = !guncel && !geriCekilme && para < tasinmaMaliyeti;
              const gorunum = konutGoruntusuGetir(konut.id, konut.ad, konut.simge, cag, bolge, dil);
              const etkiSatiri = etkiSatiriGetir(m, konut);
              return (
                <KararSatiri
                  key={konut.id}
                  kol={guncel ? 'sadik' : 'evrensel'}
                  simge={gorunum.simge}
                  dal={guncel ? (dil === 'en' ? 'Current' : 'Şu an') : undefined}
                  ad={gorunum.ad}
                  cipler={
                    <>
                      <span className="kk-cip s-gider">
                        {formatPara(enflasyonluTutar(konut.kiraYillik))} {paraBirimi}/{m.yil}
                      </span>
                      {!guncel && !geriCekilme && <span className="kk-cip s-gider">{bic(m.feTasinmaKisa, tasinmaMaliyeti, paraBirimi).replace(/^\s*·\s*/, '')}</span>}
                      {etkiSatiri && (
                        <span className="kk-cip">
                          <RenkliEtki metin={etkiSatiri} />
                        </span>
                      )}
                    </>
                  }
                  detay={kt(konut.aciklama)}
                  secili={secimKonut === konut.id}
                  disabled={yukleniyor || guncel || tasinamaz}
                  onClick={() => setSecimKonut(konut.id)}
                />
              );
            })}
          </div>
          <KararOnay
            not={secimKonut ? '' : dil === 'en' ? 'Pick a home.' : 'Bir ev seç.'}
            etiket={dil === 'en' ? 'Move' : 'Taşın'}
            disabled={yukleniyor || !secimKonut}
            onClick={() => {
              if (!secimKonut) return;
              onKonutDegistir(secimKonut);
              setSecimKonut(null);
            }}
          />
        </div>
      </div>

      <button className="tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
