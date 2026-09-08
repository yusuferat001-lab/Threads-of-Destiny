import type { MulkKartBilgisi, MulkTuru, KotuIsKarti } from '../types';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';
import type { Dil } from '../ayarlar';

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
  kotuIsler: KotuIsKarti[];
  dedikodular: string[];
  mulkler: MulkKartBilgisi[];
  sucSeviyesi: number;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKotuIs: (id: string) => void;
  onMulkSatinAl: (tur: MulkTuru) => void;
  onGeriDon: () => void;
}

const MESLEK_SIMGESI: Record<string, string> = {
  Asker: '⚔️',
  Tüccar: '📈',
  'Din Adamı': '🕊️',
};

/** Karanlık iş adları/açıklamaları — i18n.ts yerine bileşene gömülü (NasilOynanir deseni). */
const KARANLIK_ISLER: Record<string, { tr: { ad: string; aciklama: string }; en: { ad: string; aciklama: string } }> = {
  rakibi_korkut: {
    tr: { ad: '🗡️ Rakibini Korkut', aciklama: 'Rakibinin gücünü kır, biraz da haraç al. Düşük risk.' },
    en: { ad: '🗡️ Intimidate Your Rival', aciklama: "Cut your rival down a notch and squeeze a little coin. Low risk." },
  },
  adam_dov: {
    tr: { ad: '👊 Zevkine Adam Döv', aciklama: 'Sırf içini rahatlatmak için birini benzet. Getirisi yok, ahlakın çöker.' },
    en: { ad: '👊 Beat Someone for Sport', aciklama: 'Rough someone up just to blow off steam. No payoff, morality tanks.' },
  },
  rakibi_dov: {
    tr: { ad: '🩸 Rakibini Dövdür', aciklama: 'Rakibini ciddi biçimde hırpala — pazar payın ve terfi şansın artar.' },
    en: { ad: '🩸 Have Your Rival Beaten', aciklama: 'Hurt your rival badly — your market share and promotion odds rise.' },
  },
  birini_soy: {
    tr: { ad: '💰 Birini Soy', aciklama: 'Doğrudan para. Yakalanırsan kodesi boylarsın.' },
    en: { ad: '💰 Rob Someone', aciklama: 'Straight cash. Get caught and you land in a cell.' },
  },
  isyeri_yak: {
    tr: { ad: '🔥 Rakibin İş Yerini Yak', aciklama: 'En büyük darbe, en büyük risk: ölüm ve hapis ihtimali var.' },
    en: { ad: "🔥 Burn Down Your Rival's Business", aciklama: 'The biggest blow, the biggest risk: death and prison are on the table.' },
  },
};

function karanlikIsMetni(dil: Dil, id: string): { ad: string; aciklama: string } {
  const kayit = KARANLIK_ISLER[id];
  if (!kayit) return { ad: id, aciklama: '' };
  return dil === 'en' ? kayit.en : kayit.tr;
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
  kotuIsler,
  dedikodular,
  mulkler,
  sucSeviyesi,
  yukleniyor,
  islemMesaji,
  onKotuIs,
  onMulkSatinAl,
  onGeriDon,
}: IsYatirimEkraniProps) {
  const { m, kt, dil } = useDil();
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));

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
            <StatKarosu ikon="🪙" etiket={m.iyKendiParan} deger={`${formatPara(para)} ${paraBirimi}`} vurgu />

            <StatKarosu ikon="💰" etiket={m.iyYillikKazanc} deger={`~${formatPara(maasYillik)} ${paraBirimi}`} />

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
                title={`${kt(mulk.aciklama)}\n${bic(
                  m.iyGetiriBrut,
                  mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : '',
                  formatPara(mulk.tahminiYillikGetiriMiktari),
                  paraBirimi,
                  (mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : '') + mulk.tahminiYillikGetiriYuzdesi
                )}\n${bic(m.iyBakimVergi, formatPara(mulk.yillikBakimTahmini), paraBirimi)}`}
              >
                <span className="meslek-simge">{mulk.simge}</span>
                <strong>
                  {kt(mulk.ad)} {mulk.sahipMi && m.iySahipsin}
                </strong>
                <span className="meslek-aciklama">
                  ▲ {kt(mulk.avantajliDurum)} · ▼ {kt(mulk.dezavantajliDurum)}
                </span>
                <span className={`mulk-getiri ${mulk.tahminiYillikNet < 0 ? 'mulk-getiri-negatif' : 'mulk-getiri-pozitif'}`}>
                  {bic(
                    m.iyNetKisa,
                    mulk.tahminiYillikNet >= 0 ? '+' : '',
                    formatPara(mulk.tahminiYillikNet),
                    paraBirimi,
                    (mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : '') + mulk.tahminiYillikGetiriYuzdesi
                  )}
                </span>
                {!mulk.sahipMi && (
                  <span className="meslek-aciklama">
                    {bic(m.iyFiyatKisa, formatPara(mulk.maliyet), paraBirimi)}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="giris-aciklama">{m.iyBakimAcikla}</p>
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">{m.iyKaranlikIsler}</h3>
          <p className="giris-aciklama">{m.iyKaranlikIsAcikla}</p>

          <div className="yatirim-kartlari">
            {kotuIsler.map((is) => {
              const metin = karanlikIsMetni(dil, is.id);
              return (
                <button
                  key={is.id}
                  className="yatirim-kart isyatirim-kendi-is-kart"
                  disabled={yukleniyor}
                  onClick={() => onKotuIs(is.id)}
                  title={metin.aciklama}
                >
                  <span className="meslek-simge">{is.simge}</span>
                  <strong>{metin.ad}</strong>
                  <span className="meslek-aciklama">
                    {bic(m.iyKaranlikSans, is.basariSansi)}
                    {is.tahminiKazanc > 0 && ` · ${bic(m.iyKaranlikKazanc, formatPara(is.tahminiKazanc), paraBirimi)}`}
                  </span>
                  <span className="meslek-aciklama">{m.iyKaranlikBedel}</span>
                </button>
              );
            })}
          </div>

          <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 45 ? 'suc-seviyesi-riskli' : ''}`}>
            {bic(m.iySucSeviyen, Math.round(sucSeviyesi), sucSeviyesiEtiketi(m, sucSeviyesi))}
          </p>
        </div>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
