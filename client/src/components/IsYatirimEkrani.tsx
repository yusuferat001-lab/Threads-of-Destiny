import { useEffect, useState } from 'react';
import type { MulkKartBilgisi, MulkTuru, KrediConfig } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { useMobilEkran } from '../hooks';

interface IsYatirimEkraniProps {
  paraBirimi: string;
  para: number;
  krediConfig: KrediConfig | null;
  mulkler: MulkKartBilgisi[];
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKrediAl: (teklifId: string) => void;
  onKrediPazarlik: () => void;
  onMulkSatinAl: (tur: MulkTuru) => void;
  onGeriDon: () => void;
}

const PIYASA_SINYAL_ETIKET: Record<string, { tr: string; en: string; sinif: string }> = {
  firsat: { tr: '🟢 Fırsat: şimdi al', en: '🟢 Opportunity: buy now', sinif: 'piyasa-firsat' },
  zirve: { tr: '🔴 Zirvede: beklemek daha iyi', en: '🔴 Peaking: better to wait', sinif: 'piyasa-zirve' },
  durgun: { tr: '⚪ Durgun', en: '⚪ Flat', sinif: 'piyasa-durgun' },
};

export function IsYatirimEkrani({
  paraBirimi,
  para,
  krediConfig,
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
          {[en ? 'Moneylender' : 'Tefeci', m.iyYatirimlikGayrimenkuller].map((baslik, i) => (
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
          <h3 className="tam-baslik">{en ? 'Moneylender' : 'Tefeci'}</h3>

          {/* Tefeci / kredi — havuzdan seçilmiş 2 teklif (tutar enflasyonlu, farklı faiz ve vade). */}
          {krediConfig?.aktifKredi ? (
            <div className="dedikodu-panosu">
              <p>
                {en ? 'Outstanding debt' : 'Kalan borç'}: <strong>{formatPara(krediConfig.aktifKredi.kalanBorc)} {paraBirimi}</strong>
                {' · '}
                {en ? 'yearly instalment' : 'yıllık taksit'} ~{formatPara(krediConfig.aktifKredi.yillikTaksit)}
                {' · '}
                {en ? 'interest' : 'faiz'} %{Math.round(krediConfig.aktifKredi.faizOrani * 100)}
                {' · '}
                {en ? 'term' : 'vade'} {krediConfig.aktifKredi.vadeYil} {en ? 'yrs' : 'yıl'}
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
          ) : krediConfig && krediConfig.teklifler.length > 0 ? (
            <div className="dedikodu-panosu">
              <p className="giris-aciklama">
                {en
                  ? 'Pick one of the two offers. You repay in equal yearly instalments; miss three in a row and the moneylender seizes a property.'
                  : 'İki tekliften birini seç. Eşit yıllık taksitlerle ödersin; üst üste üç taksit kaçırırsan tefeci bir mülküne el koyar.'}
              </p>
              <div className="kariyer-bagis-kademeler">
                {krediConfig.teklifler.map((t) => (
                  <button
                    key={t.id}
                    className="kariyer-bagis-cip"
                    disabled={yukleniyor}
                    title={en ? t.ad.en : t.ad.tr}
                    onClick={() => onKrediAl(t.id)}
                  >
                    <strong>{formatPara(t.tutar)} {paraBirimi}</strong>
                    <br />
                    {en ? 'interest' : 'faiz'} %{Math.round(t.faiz * 100)} · {en ? 'term' : 'vade'} {t.vade} {en ? 'yrs' : 'yıl'}
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
