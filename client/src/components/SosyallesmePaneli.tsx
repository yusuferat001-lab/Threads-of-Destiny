import { useState, type ReactNode } from 'react';
import type {
  SosyallesmeYeri,
  ZarSonucu,
  UcKagitciSonucu,
  BilekGuresiSonucu,
  SosyalAksiyonConfig,
  SosyalAksiyonSonucu,
} from '../types';
import { useDil } from '../DilContext';
import { bic } from '../i18n';
import { formatPara } from '../format';
import { HazardWidget, UcKagitciWidget, BilekGuresiWidget } from './MiniOyunlar';
import { useMobilEkran } from '../hooks';

interface SosyallesmePaneliProps {
  yerler: SosyallesmeYeri[];
  yukleniyor: boolean;
  para: number;
  paraBirimi: string;
  zarKademeleri: number[];
  aksiyonConfig: SosyalAksiyonConfig | null;
  /** Bir mekân olayı çözülüyor mu — çözülürken içki/mekân/kumar bölümleri gizlenir, yerine olay kartı gelir. */
  olayAcik: boolean;
  olayIcerik: ReactNode;
  onGit: (yerId: string) => void;
  onAksiyon: (aksiyonId: string, varyant?: string) => Promise<SosyalAksiyonSonucu | null>;
  onZarAt: (tutar: number) => Promise<ZarSonucu | null>;
  onUcKagitci: (tutar: number, secim: number) => Promise<UcKagitciSonucu | null>;
  onBilekGuresi: (basarili: boolean) => Promise<BilekGuresiSonucu | null>;
  onGeriDon: () => void;
}

export function SosyallesmePaneli({
  yerler,
  yukleniyor,
  para,
  paraBirimi,
  zarKademeleri,
  aksiyonConfig,
  olayAcik,
  olayIcerik,
  onGit,
  onAksiyon,
  onZarAt,
  onUcKagitci,
  onBilekGuresi,
  onGeriDon,
}: SosyallesmePaneliProps) {
  const { m, kt, dil } = useDil();
  const [sonMesaj, setSonMesaj] = useState<string | null>(null);
  const [aksiyonBekliyor, setAksiyonBekliyor] = useState(false);
  const mobil = useMobilEkran();
  const [aktifSekme, setAktifSekme] = useState(0);

  async function aksiyonTikla(aksiyonId: string, varyant?: string) {
    if (aksiyonBekliyor || yukleniyor) return;
    setAksiyonBekliyor(true);
    setSonMesaj(null);
    try {
      const sonuc = await onAksiyon(aksiyonId, varyant);
      if (sonuc) setSonMesaj(sonuc.mesaj);
    } finally {
      setAksiyonBekliyor(false);
    }
  }

  const kilitli = yukleniyor || aksiyonBekliyor;
  const fiyatEtiketi = (f: number) => (f === 0 ? m.spAksiyonBedava : `${formatPara(f)} ${paraBirimi}`);

  return (
    <div className="ekran ekran-tam-sayfa ekran-sosyallesme">
      <h2>{m.spSosyallesBaslik}</h2>
      <p className="giris-aciklama tam-yardimci-metin">{m.spIntro}</p>

      {/* İçki/deli/fal gibi tur-harcamayan aksiyon sonuçları — açılır pencerede (kullanıcı isteği). */}
      {sonMesaj && (
        <div className="kariyer-sonuc-katman" onClick={() => setSonMesaj(null)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <p>{sonMesaj}</p>
            <button onClick={() => setSonMesaj(null)}>{dil === 'en' ? 'OK' : 'Tamam'}</button>
          </div>
        </div>
      )}

      {!olayAcik && yerler.length === 0 && <p className="yatirim-islem-mesaji">{m.spMekanYok}</p>}

      {!olayAcik && mobil && (
        <div className="ekran-sekmeleri">
          {[m.spEtkinlikBaslik, m.spKumarBaslik, m.spMekanlarBaslik].map((baslik, i) => (
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

      <div className="tam-kaydirilan">
        {olayAcik && <div className="sosyal-olay-katman">{olayIcerik}</div>}
        {!olayAcik && (mobil ? aktifSekme === 0 : true) && aksiyonConfig && (aksiyonConfig.icecekler.length > 0 || aksiyonConfig.aksiyonlar.length > 0) && (
          <section className="sosyallesme-etkinlik">
            <h3 className="tam-baslik" title={m.spEtkinlikNot}>
              {m.spEtkinlikBaslik}
            </h3>

            {aksiyonConfig.icecekler.length > 0 && (
              <div className="sosyal-icki-cipler">
                {aksiyonConfig.icecekler.map((ic) => (
                  <button
                    key={ic.id}
                    className={`sosyal-icki-cip${ic.alkollu ? ' sosyal-icki-alkollu' : ''}${ic.gizli ? ' sosyal-icki-gizli' : ''}`}
                    disabled={kilitli || ic.kilitli}
                    title={ic.neden ?? ic.aciklama}
                    onClick={() => aksiyonTikla(ic.id)}
                  >
                    <span className="sosyal-icki-simge">{ic.simge}</span>
                    <span className="sosyal-icki-ad">{ic.ad}</span>
                    <span className="sosyal-cip-fiyat">{fiyatEtiketi(ic.fiyat)}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="sosyal-aksiyon-kartlari">
              {aksiyonConfig.aksiyonlar.map((a) => (
                <div
                  key={a.id}
                  className={`sosyal-aksiyon-kart${a.kilitli ? ' sosyal-aksiyon-kilitli' : ''}`}
                >
                  <div className="sosyal-aksiyon-ust">
                    <span className="meslek-simge">{a.simge}</span>
                    <strong>{a.ad}</strong>
                  </div>
                  <p className="sosyal-aksiyon-aciklama">{a.aciklama}</p>
                  <button
                    className="sosyal-aksiyon-buton"
                    disabled={kilitli || a.kilitli}
                    onClick={() => aksiyonTikla(a.id)}
                  >
                    {fiyatEtiketi(a.fiyat)}
                  </button>
                  {a.kilitli && a.neden && <span className="sosyal-aksiyon-neden">{a.neden}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {!olayAcik && (mobil ? aktifSekme === 1 : true) && (
        <section className="sosyallesme-kumar">
          <h3 className="tam-baslik" title={m.spKumarNot}>
            {m.spKumarBaslik}
          </h3>
          <div className="sosyallesme-kumar-oyunlar">
            <HazardWidget
              para={para}
              paraBirimi={paraBirimi}
              kademeler={zarKademeleri}
              yukleniyor={yukleniyor}
              onZarAt={onZarAt}
            />
            <UcKagitciWidget
              para={para}
              paraBirimi={paraBirimi}
              kademeler={zarKademeleri}
              yukleniyor={yukleniyor}
              onUcKagitci={onUcKagitci}
            />
            <BilekGuresiWidget
              yukleniyor={yukleniyor}
              kalanYil={aksiyonConfig?.bilekGuresiKalanYil ?? 0}
              onBilekGuresi={onBilekGuresi}
            />
          </div>
        </section>
        )}

        {!olayAcik && (mobil ? aktifSekme === 2 : true) && (
          <>
            <h3 className="tam-baslik" title={m.spMekanNot}>
              {m.spMekanlarBaslik}
            </h3>
            <div className="yatirim-kartlari sosyallesme-kartlari">
              {yerler.map((yer) => (
                <button
                  key={yer.id}
                  className={`yatirim-kart sosyallesme-kart${yer.alkolluMu ? ' sosyallesme-kart-alkollu' : ''}${
                    yer.kilitli ? ' sosyallesme-kart-kilitli' : ''
                  }`}
                  disabled={yukleniyor || yer.kilitli}
                  onClick={() => onGit(yer.id)}
                  title={yer.kilitli ? bic(m.spMekanKilitli, yer.kalanYil ?? 0) : kt(yer.aciklama)}
                >
                  <span className="meslek-simge">{yer.simge}</span>
                  <strong>{kt(yer.ad)}</strong>
                  {yer.kilitli ? (
                    <span className="sosyal-aksiyon-neden">{bic(m.spMekanKilitli, yer.kalanYil ?? 0)}</span>
                  ) : (
                    typeof yer.girisUcreti === 'number' && (
                      <span className="sosyal-aksiyon-fiyat">
                        🚪 {formatPara(yer.girisUcreti)} {paraBirimi}
                      </span>
                    )
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {!olayAcik && (
        <button className="ikincil tam-geri-buton" disabled={yukleniyor} onClick={onGeriDon}>
          {m.geriDon}
        </button>
      )}
    </div>
  );
}
