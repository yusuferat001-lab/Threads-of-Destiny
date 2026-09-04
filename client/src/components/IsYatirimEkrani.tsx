import type { YatirimConfig, MulkKartBilgisi, MulkTuru } from '../types';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';

interface IsYatirimEkraniProps {
  meslek: string;
  rutbe: string;
  rutbeSeviye: number;
  amirAdi: string | null;
  amirRutbe: string | null;
  maasYillik: number;
  paraBirimi: string;
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  sehirYonetimSeviyesi: number;
  sehirYonetimUnvan: string | null;
  para: number;
  config: YatirimConfig;
  dedikodular: string[];
  mulkler: MulkKartBilgisi[];
  zarKademeleri: number[];
  sucSeviyesi: number;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onYatirimYap: () => void;
  onMulkSatinAl: (tur: MulkTuru) => void;
  onZarAt: (tutar: number) => void;
  onGeriDon: () => void;
}

const MESLEK_SIMGESI: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '📈',
  'Din Adamı': '🕊️',
};

function kendiIsiAsamaEtiketi(m: Metinler, yatirimSayisi: number): string {
  if (yatirimSayisi === 0) return m.iyKendiIsiAsama0;
  if (yatirimSayisi <= 2) return bic(m.iyKendiIsiAsama1, yatirimSayisi);
  if (yatirimSayisi <= 5) return bic(m.iyKendiIsiAsama2, yatirimSayisi);
  return bic(m.iyKendiIsiAsama3, yatirimSayisi);
}

function sucSeviyesiEtiketi(m: Metinler, seviye: number): string {
  if (seviye < 20) return m.iySicilTemiz;
  if (seviye < 45) return m.iySicilDikkat;
  if (seviye < 70) return m.iySicilCiddi;
  return m.iySicilPesinde;
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

export function IsYatirimEkrani({
  meslek,
  rutbe,
  rutbeSeviye,
  amirAdi,
  amirRutbe,
  maasYillik,
  paraBirimi,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  sehirYonetimSeviyesi,
  sehirYonetimUnvan,
  para,
  config,
  dedikodular,
  mulkler,
  zarKademeleri,
  sucSeviyesi,
  yukleniyor,
  islemMesaji,
  onYatirimYap,
  onMulkSatinAl,
  onZarAt,
  onGeriDon,
}: IsYatirimEkraniProps) {
  const { m, kt } = useDil();
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));
  const paraYetersiz = para < config.kendiIsiMaliyeti;
  const kendiIsiAciklama = m.iyKendiIsiKarsilik;

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>{m.iyBaslik}</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-govde-3col">
        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.iyGorevin}</h3>

          <div className="is-profil-karti">
            <span className="is-profil-simge" aria-hidden="true">
              {MESLEK_SIMGESI[meslek] ?? '🎯'}
            </span>
            <div className="is-profil-metin">
              <strong>{kt(rutbe)}</strong>
              <span>{kt(meslek)}</span>
            </div>
            <span className="kademe-gostergesi" aria-label={bic(m.iyKademeAria, rutbeSeviye)}>
              {[1, 2, 3, 4, 5].map((seviye) => (
                <span key={seviye} className={`kademe-nokta${seviye <= rutbeSeviye ? ' kademe-nokta-dolu' : ''}`} />
              ))}
            </span>
          </div>

          <div className="is-karo-izgara">
            <StatKarosu ikon="💰" etiket={m.iyYillikKazanc} deger={`~${formatPara(maasYillik)} ${paraBirimi}`} vurgu />

            {amirAdi && <StatKarosu ikon="🎖️" etiket={m.iyAmirin} deger={amirAdi} alt={amirRutbe ? kt(amirRutbe) : undefined} />}

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
                <StatKarosu ikon="🛡️" etiket={m.iyTechizat} deger={`%${orduTechizatSeviyesi}`} />
                <StatKarosu ikon="💥" etiket={m.iySaldiriGucu} deger={`${saldiriGucu}`} />
              </>
            )}

            {meslek === 'Tüccar' && (
              <StatKarosu ikon="📈" etiket={m.iyTicaretSermayesi} deger={`${formatPara(ticaretSermaye)} ${paraBirimi}`} />
            )}

            {meslek === 'Din Adamı' && <StatKarosu ikon="🕊️" etiket={m.iyNufuz} deger={`${nufuz}`} />}
          </div>

          <h3 className="tam-baslik tam-baslik-dedikodu">{m.iyPiyasaDedikodulari}</h3>

          {dedikodular.length > 0 ? (
            <div className="dedikodu-panosu dedikodu-panosu-vurgu">
              <ul>
                {dedikodular.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="giris-aciklama">{m.iyDedikoduYok}</p>
          )}
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.iyYatirimlikGayrimenkuller}</h3>

          <div className="yatirim-kartlari yatirim-mulk-kartlari">
            {mulkler.map((mulk) => (
              <button
                key={mulk.tur}
                className={`yatirim-kart mulk-kart${mulk.sahipMi ? ' mulk-kart-sahip' : ''}${mulk.tahminiYillikGetiriYuzdesi < 0 ? ' mulk-kart-zararda' : ''}`}
                disabled={yukleniyor || mulk.sahipMi || para < mulk.maliyet}
                onClick={() => onMulkSatinAl(mulk.tur)}
              >
                <span className="meslek-simge">{mulk.simge}</span>
                <strong>
                  {kt(mulk.ad)} {mulk.sahipMi && m.iySahipsin}
                </strong>
                <span className="meslek-aciklama">{kt(mulk.aciklama)}</span>
                <span className="meslek-aciklama">
                  {m.iyAvantajli}: {kt(mulk.avantajliDurum)} · {m.iyDezavantajli}: {kt(mulk.dezavantajliDurum)}
                </span>
                <span className={`mulk-getiri ${mulk.tahminiYillikGetiriYuzdesi < 0 ? 'mulk-getiri-negatif' : 'mulk-getiri-pozitif'}`}>
                  {m.iySuAnTahminiGetiri}: {mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : ''}
                  {formatPara(mulk.tahminiYillikGetiriMiktari)} {paraBirimi}{m.iyGetiriYilBasi} ({mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : ''}
                  {mulk.tahminiYillikGetiriYuzdesi}%)
                </span>
                <span className="meslek-aciklama" title={m.iyBakimTitle}>
                  {bic(m.iyBakimVergi, formatPara(mulk.yillikBakimTahmini), paraBirimi)}
                </span>
                {!mulk.sahipMi && (
                  <span className="meslek-aciklama">
                    {formatPara(mulk.maliyet)} {paraBirimi}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.iyKendiIsin}</h3>

          <button className="yatirim-kart isyatirim-kendi-is-kart" disabled={yukleniyor || paraYetersiz} onClick={onYatirimYap}>
            <span className="meslek-simge">💼</span>
            <strong>{m.iyKendiIsineYatirim}</strong>
            <span className="meslek-aciklama">
              {formatPara(config.kendiIsiMaliyeti)} {paraBirimi} {kendiIsiAciklama}
            </span>
            <span className="meslek-aciklama">
              {kendiIsiAsamaEtiketi(m, config.kendiIsiYatirimSayisi)} {m.iyKendiIsiEskalasyon}
            </span>
          </button>

          <p className="rutbe-ipucu">
            <strong>{m.iyRutbeNasil}</strong>{' '}
            {bic(m.iyRutbeNasilMetin, meslek === 'Din Adamı' ? m.iyRutbeAhlakini : m.iyRutbeSohretini)}
          </p>

          <h3 className="tam-baslik">{m.iyRiskliIsler}</h3>

          <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 45 ? 'suc-seviyesi-riskli' : ''}`}>
            {bic(m.iySucSeviyen, Math.round(sucSeviyesi), sucSeviyesiEtiketi(m, sucSeviyesi))}
          </p>

          <div className="isyatirim-zar-izgara">
            {zarKademeleri.map((tutar) => (
              <button key={tutar} className="zar-karo" disabled={yukleniyor || para < tutar} onClick={() => onZarAt(tutar)}>
                <span className="meslek-simge">🎲</span>
                <strong>
                  {formatPara(tutar)} {paraBirimi}
                </strong>
                <span className="meslek-aciklama">
                  {bic(m.iyZarKazanirsan, formatPara(tutar * 2), paraBirimi)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
