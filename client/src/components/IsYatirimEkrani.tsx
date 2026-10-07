import { useEffect, useState } from 'react';
import type { MulkKartBilgisi, MulkTuru, KrediConfig } from '../types';
import { formatPara, formatYuzde } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';

interface IsYatirimEkraniProps {
  meslek: string;
  rutbe: string;
  paraBirimi: string;
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  sehirYonetimSeviyesi: number;
  sehirYonetimUnvan: string | null;
  para: number;
  krediConfig: KrediConfig | null;
  dedikodular: string[];
  mulkler: MulkKartBilgisi[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKrediAl: (tutar: number) => void;
  onKrediPazarlik: () => void;
  onMulkSatinAl: (tur: MulkTuru) => void;
  onGeriDon: () => void;
}

function StatKarosu({
  ikon,
  etiket,
  deger,
  alt,
  vurgu,
}: {
  ikon: string;
  etiket: string;
  deger: string;
  alt?: string;
  vurgu?: boolean;
}) {
  return (
    <div className={`is-karo${vurgu ? ' is-karo-vurgu' : ''}`}>
      <span className="is-karo-ikon" aria-hidden="true">
        {ikon}
      </span>
      <span className="is-karo-etiket">{etiket}</span>
      <strong className="is-karo-deger">{deger}</strong>
      {alt && <span className="is-karo-alt">{alt}</span>}
    </div>
  );
}

const PIYASA_SINYAL_ETIKET: Record<string, { tr: string; en: string; sinif: string }> = {
  firsat: { tr: '🟢 Fırsat: şimdi al', en: '🟢 Opportunity: buy now', sinif: 'piyasa-firsat' },
  zirve: { tr: '🔴 Zirvede: beklemek daha iyi', en: '🔴 Peaking: better to wait', sinif: 'piyasa-zirve' },
  durgun: { tr: '⚪ Durgun', en: '⚪ Flat', sinif: 'piyasa-durgun' },
};

export function IsYatirimEkrani({
  meslek,
  rutbe,
  paraBirimi,
  orduMevcudu,
  orduTechizatSeviyesi,
  sehirYonetimSeviyesi,
  sehirYonetimUnvan,
  para,
  krediConfig,
  dedikodular,
  mulkler,
  yukleniyor,
  islemMesaji,
  onKrediAl,
  onKrediPazarlik,
  onMulkSatinAl,
  onGeriDon,
}: IsYatirimEkraniProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));
  const mobil = useMobilEkran();
  const [aktifSekme, setAktifSekme] = useState(0);

  // İşlem sonucu / hata → ekrana açılır pencere (kullanıcı isteği: suç/işlem sonucu
  // sayfa başında sabit metin değil, kapatılabilir bir pencerede gelsin).
  const [modalMesaj, setModalMesaj] = useState<string | null>(null);
  useEffect(() => {
    if (islemMesaji) setModalMesaj(islemMesaji);
  }, [islemMesaji]);

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>{m.iyBaslik}</h2>

      {modalMesaj && (
        <div className="kariyer-sonuc-katman" onClick={() => setModalMesaj(null)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <p>{modalMesaj}</p>
            <button onClick={() => setModalMesaj(null)}>{en ? 'OK' : 'Tamam'}</button>
          </div>
        </div>
      )}

      {mobil && (
        <div className="ekran-sekmeleri">
          {[m.iyGorevin, m.iyYatirimlikGayrimenkuller].map((baslik, i) => (
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
          <h3 className="tam-baslik">{m.iyGorevin}</h3>

          <div className="is-profil-karti">
            <div className="is-profil-metin">
              <strong>{kt(rutbe)}</strong>
            </div>
          </div>

          <div className="is-karo-izgara">
            {sehirYonetimSeviyesi > 0 && (
              <StatKarosu
                ikon="🏛️"
                etiket={m.iySehirYonetimi}
                deger={kt(sehirYonetimUnvan ?? '')}
                alt={bic(m.iySeviyeEk, sehirYonetimSeviyesi)}
              />
            )}

            {meslek === 'Asker' && (
              <>
                <StatKarosu ikon="⚔️" etiket={m.iyOrduMevcudu} deger={`${orduMevcudu} ${m.ksAsker}`} />
                <StatKarosu ikon="🛡️" etiket={m.iyTechizat} deger={formatYuzde(dil, orduTechizatSeviyesi)} />
                <StatKarosu ikon="💥" etiket={m.iySaldiriGucu} deger={`${saldiriGucu}`} />
              </>
            )}
          </div>

          <h3 className="tam-baslik tam-baslik-dedikodu">{m.iyPiyasaDedikodulari}</h3>

          {dedikodular.length > 0 && (
            <div className="dedikodu-panosu dedikodu-panosu-vurgu">
              <ul>
                {dedikodular.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tefeci / kredi — iki sabit tutar (küçük/büyük), enflasyonla ölçekli. */}
          <h3 className="tam-baslik">{en ? 'Moneylender' : 'Tefeci'}</h3>
          {krediConfig?.aktifKredi ? (
            <div className="dedikodu-panosu">
              <p>
                {en ? 'Outstanding debt' : 'Kalan borç'}: <strong>{formatPara(krediConfig.aktifKredi.kalanBorc)} {paraBirimi}</strong>
                {' · '}
                {en ? 'yearly instalment' : 'yıllık taksit'} ~{formatPara(krediConfig.aktifKredi.yillikTaksit)}
                {' · '}
                {en ? 'interest' : 'faiz'} %{Math.round(krediConfig.aktifKredi.faizOrani * 100)}
                {krediConfig.aktifKredi.odenmeyenTaksit > 0 && (
                  <> · ⚠️ {en ? 'missed' : 'ödenmeyen'}: {krediConfig.aktifKredi.odenmeyenTaksit}</>
                )}
              </p>
              {!krediConfig.aktifKredi.pazarlikYapildi && (
                <button className="ikincil" disabled={yukleniyor} onClick={onKrediPazarlik}>
                  {en ? 'Haggle the interest' : 'Faizi pazarlık et'}
                </button>
              )}
            </div>
          ) : krediConfig && krediConfig.kademeler.length > 0 ? (
            <div className="dedikodu-panosu">
              <p className="giris-aciklama">
                {en
                  ? `Interest ~${Math.round(krediConfig.faizTeklifi * 100)}%. Miss three instalments and the moneylender seizes a property.`
                  : `~%${Math.round(krediConfig.faizTeklifi * 100)} faizle. Üst üste üç taksit kaçırırsan tefeci bir mülküne el koyar.`}
              </p>
              <div className="kariyer-bagis-kademeler">
                {krediConfig.kademeler.map((tutar) => (
                  <button
                    key={tutar}
                    className="kariyer-bagis-cip"
                    disabled={yukleniyor}
                    onClick={() => onKrediAl(tutar)}
                  >
                    {formatPara(tutar)} {paraBirimi}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="giris-aciklama">{en ? 'The moneylender turns you away for now.' : 'Tefeci şimdilik sana borç vermiyor.'}</p>
          )}
        </div>

        <div className="tam-sutun" hidden={mobil && aktifSekme !== 1}>
          <h3 className="tam-baslik">{m.iyYatirimlikGayrimenkuller}</h3>

          <div className="yatirim-kartlari yatirim-mulk-kartlari">
            {mulkler.map((mulk) => {
              const sinyal = PIYASA_SINYAL_ETIKET[mulk.piyasaSinyali];
              return (
                <button
                  key={mulk.tur}
                  className={`yatirim-kart mulk-kart${mulk.sahipMi ? ' mulk-kart-sahip' : ''}${mulk.tahminiYillikGetiriYuzdesi < 0 ? ' mulk-kart-zararda' : ''}`}
                  disabled={yukleniyor || mulk.sahipMi || para < mulk.maliyet}
                  onClick={() => onMulkSatinAl(mulk.tur)}
                  title={`${kt(mulk.aciklama)}\n${mulk.piyasaIpucu}`}
                >
                  <span className="meslek-simge">{mulk.simge}</span>
                  <strong>
                    {kt(mulk.ad)} {mulk.sahipMi && m.iySahipsin}
                  </strong>
                  <span className="meslek-aciklama">
                    ▲ {kt(mulk.avantajliDurum)} · ▼ {kt(mulk.dezavantajliDurum)}
                  </span>
                  <span className={`mulk-getiri ${mulk.tahminiYillikGetiriYuzdesi < 0 ? 'mulk-getiri-negatif' : 'mulk-getiri-pozitif'}`}>
                    {bic(
                      m.iyNetKisa,
                      mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : '',
                      formatPara(mulk.tahminiYillikGetiriMiktari),
                      paraBirimi,
                      (mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : '') + mulk.tahminiYillikGetiriYuzdesi
                    )}
                  </span>
                  {!mulk.sahipMi && sinyal && (
                    <span className={`mulk-piyasa-sinyal ${sinyal.sinif}`}>{en ? sinyal.en : sinyal.tr}</span>
                  )}
                  {!mulk.sahipMi && (
                    <span className="meslek-aciklama">
                      {bic(m.iyFiyatKisa, formatPara(mulk.maliyet), paraBirimi)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
