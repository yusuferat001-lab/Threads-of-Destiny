import { useEffect, useState } from 'react';
import type { MulkKartBilgisi, MulkTuru } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';

interface IsYatirimEkraniProps {
  paraBirimi: string;
  para: number;
  mulkler: MulkKartBilgisi[];
  yukleniyor: boolean;
  islemMesaji: string | null;
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
  mulkler,
  yukleniyor,
  islemMesaji,
  onMulkSatinAl,
  onGeriDon,
}: IsYatirimEkraniProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';

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

      <div className="tam-sutun-tekli-sarici">
        <div className="tam-sutun">
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
                    <span className="meslek-aciklama s-gider">
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
