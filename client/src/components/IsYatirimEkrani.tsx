import { useEffect, useState } from 'react';
import type { MulkKartBilgisi, MulkTuru } from '../types';
import { formatPara } from '../format';
import { bic } from '../i18n';
import { useDil } from '../DilContext';
import { KapatX, KararOnay, KararSatiri } from './KararKabuk';

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
  const [secim, setSecim] = useState<MulkTuru | null>(null);
  const secimliMulk = mulkler.find((x) => x.tur === secim) ?? null;

  // İşlem sonucu / hata → ekrana açılır pencere (kullanıcı isteği: suç/işlem sonucu
  // sayfa başında sabit metin değil, kapatılabilir bir pencerede gelsin).
  const [modalMesaj, setModalMesaj] = useState<string | null>(null);
  useEffect(() => {
    if (islemMesaji) setModalMesaj(islemMesaji);
  }, [islemMesaji]);

  return (
    <div className="ekran ekran-tam-sayfa ekran-yan">
      <h2>{m.iyBaslik}</h2>

      {modalMesaj && (
        <div className="kariyer-sonuc-katman" onClick={() => setModalMesaj(null)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <KapatX onClick={() => setModalMesaj(null)} />
            <p>{modalMesaj}</p>
            <button onClick={() => setModalMesaj(null)}>{en ? 'OK' : 'Tamam'}</button>
          </div>
        </div>
      )}

      <div className="tam-sutun-tekli-sarici">
        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.iyYatirimlikGayrimenkuller}</h3>

          <div className="kk-liste kk-secimler kk-ikili">
            {mulkler.map((mulk) => {
              const sinyal = PIYASA_SINYAL_ETIKET[mulk.piyasaSinyali];
              const zararda = mulk.tahminiYillikGetiriYuzdesi < 0;
              return (
                <KararSatiri
                  key={mulk.tur}
                  kol={zararda ? 'sert' : mulk.sahipMi ? 'sadik' : 'evrensel'}
                  simge={mulk.simge}
                  dal={mulk.sahipMi ? (en ? 'Owned' : 'Sahipsin') : sinyal ? (en ? sinyal.en : sinyal.tr).replace(/^\S+\s/, '') : undefined}
                  ad={kt(mulk.ad)}
                  cipler={
                    <>
                      <span className={`kk-cip ${zararda ? 's-eksi' : 's-arti'}`}>
                        {bic(
                          m.iyNetKisa,
                          mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : '',
                          formatPara(mulk.tahminiYillikGetiriMiktari),
                          paraBirimi,
                          (mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : '') + mulk.tahminiYillikGetiriYuzdesi
                        )}
                      </span>
                      {!mulk.sahipMi && <span className="kk-cip s-gider">{bic(m.iyFiyatKisa, formatPara(mulk.maliyet), paraBirimi)}</span>}
                    </>
                  }
                  detay={`▲ ${kt(mulk.avantajliDurum)} · ▼ ${kt(mulk.dezavantajliDurum)}`}
                  secili={secim === mulk.tur}
                  disabled={yukleniyor || mulk.sahipMi || para < mulk.maliyet}
                  onClick={() => setSecim(mulk.tur)}
                />
              );
            })}
          </div>
          <KararOnay
            not={secimliMulk ? `${kt(secimliMulk.aciklama)}` : en ? 'Pick a property.' : 'Bir mülk seç.'}
            etiket={en ? 'Buy' : 'Satın al'}
            disabled={yukleniyor || !secimliMulk}
            onClick={() => {
              if (!secimliMulk) return;
              onMulkSatinAl(secimliMulk.tur);
              setSecim(null);
            }}
          />
        </div>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
