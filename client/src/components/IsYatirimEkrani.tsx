import { useEffect, useState, type ReactNode } from 'react';
import type {
  MulkKartBilgisi,
  MulkTuru,
  KotuIsKarti,
  RakipKarti,
  SalginKorunmaKarti,
  KrediConfig,
} from '../types';
import { formatPara } from '../format';
import { bic, type Metinler } from '../i18n';
import { useDil } from '../DilContext';
import type { Dil } from '../ayarlar';

interface SalginKorunmaConfig {
  kartlar: SalginKorunmaKarti[];
  aktifKademe: number;
  vebaVar: boolean;
}

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
  rakipler: RakipKarti[];
  salginKorunma: SalginKorunmaConfig | null;
  krediConfig: KrediConfig | null;
  dedikodular: string[];
  mulkler: MulkKartBilgisi[];
  sucSeviyesi: number;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onKotuIs: (id: string, opts?: { hedefRakipAd?: string; vekil?: boolean }) => void;
  onSalginKorunma: (kademe: 1 | 2) => void;
  onKrediAl: (tutar: number) => void;
  onKrediPazarlik: () => void;
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

/** Tek bir karanlık iş kartı — rakip hedefleyen işlerde hedef seçimi + "adamına yaptır" seçeneği taşır. */
function KaranlikIsKart({
  is,
  dil,
  m,
  paraBirimi,
  yukleniyor,
  rakipler,
  onKotuIs,
}: {
  is: KotuIsKarti;
  dil: Dil;
  m: Metinler;
  paraBirimi: string;
  yukleniyor: boolean;
  rakipler: RakipKarti[];
  onKotuIs: IsYatirimEkraniProps['onKotuIs'];
}) {
  const en = dil === 'en';
  const metin = karanlikIsMetni(dil, is.id);
  const aktifRakipler = rakipler.filter((r) => !r.yenildi);
  const rakipHedefli = is.rakipKirmaGucu > 0 && aktifRakipler.length > 0;
  const [hedef, setHedef] = useState<string>(aktifRakipler[0]?.ad ?? '');
  const [vekil, setVekil] = useState(false);

  return (
    <div className="yatirim-kart isyatirim-kendi-is-kart" title={metin.aciklama}>
      <span className="meslek-simge">{is.simge}</span>
      <strong>{metin.ad}</strong>
      <span className="meslek-aciklama">
        {bic(m.iyKaranlikSans, is.basariSansi)}
        {is.tahminiKazanc > 0 && ` · ${bic(m.iyKaranlikKazanc, formatPara(is.tahminiKazanc), paraBirimi)}`}
      </span>
      <span className="meslek-aciklama">{m.iyKaranlikBedel}</span>

      {rakipHedefli && (
        <div className="karanlik-hedef-satir">
          <select
            className="karanlik-hedef-secim"
            value={hedef}
            disabled={yukleniyor}
            onChange={(e) => setHedef(e.target.value)}
          >
            {aktifRakipler.map((r) => (
              <option key={r.ad} value={r.ad}>
                {en ? 'Target: ' : 'Hedef: '}
                {r.ad}
              </option>
            ))}
          </select>
          <label className="karanlik-vekil-etiket">
            <input type="checkbox" checked={vekil} disabled={yukleniyor} onChange={(e) => setVekil(e.target.checked)} />
            {en ? 'Send a hired hand (ücret; kişisel risk düşer, ifşa riski var)' : 'Adamına yaptır (ücret; risk düşer, ifşa riski)'}
          </label>
        </div>
      )}

      <button
        className="ikincil karanlik-cevir-buton"
        disabled={yukleniyor}
        onClick={() =>
          onKotuIs(is.id, {
            hedefRakipAd: rakipHedefli ? hedef : undefined,
            vekil: rakipHedefli ? vekil : undefined,
          })
        }
      >
        {en ? 'Do it' : 'Çevir'}
      </button>
    </div>
  );
}

/** Telefon genişliği mi? (mobilde sütunlar tıklayınca açılan akordeona döner) */
function useMobilEkran() {
  const [mobil, setMobil] = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const dinle = () => setMobil(mq.matches);
    mq.addEventListener('change', dinle);
    return () => mq.removeEventListener('change', dinle);
  }, []);
  return mobil;
}

/**
 * Bir sütun: masaüstünde her zaman açık kutu; mobilde başlığa dokununca açılan
 * akordeon (aynı anda tek sütun açık — sayfa tek ekrana yaklaşsın diye).
 */
function Sutun({
  baslik,
  idx,
  mobil,
  acik,
  setAcik,
  children,
}: {
  baslik: string;
  idx: number;
  mobil: boolean;
  acik: number | null;
  setAcik: (i: number | null) => void;
  children: ReactNode;
}) {
  if (!mobil) return <div className="tam-sutun">{children}</div>;
  const buAcik = acik === idx;
  return (
    <div className={`tam-sutun tam-sutun-katla${buAcik ? ' tam-sutun-acik' : ''}`}>
      <button
        type="button"
        className="tam-sutun-katla-baslik"
        aria-expanded={buAcik}
        onClick={() => setAcik(buAcik ? null : idx)}
      >
        {baslik}
        <span aria-hidden="true">{buAcik ? '▲' : '▼'}</span>
      </button>
      {buAcik && <div className="tam-sutun-katla-govde">{children}</div>}
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
  rakipler,
  salginKorunma,
  krediConfig,
  dedikodular,
  mulkler,
  sucSeviyesi,
  yukleniyor,
  islemMesaji,
  onKotuIs,
  onSalginKorunma,
  onKrediAl,
  onKrediPazarlik,
  onMulkSatinAl,
  onGeriDon,
}: IsYatirimEkraniProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));
  const [krediTutar, setKrediTutar] = useState<number>(0);
  const mobil = useMobilEkran();
  const [acikSutun, setAcikSutun] = useState<number | null>(0);

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

      <div className={`tam-govde-3col${mobil ? ' tam-govde-3col-katli' : ''}`}>
        <Sutun baslik={m.iyGorevin} idx={0} mobil={mobil} acik={acikSutun} setAcik={setAcikSutun}>
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

          {/* Tefeci / kredi */}
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
          ) : krediConfig && krediConfig.maksTutar >= krediConfig.minTutar ? (
            <div className="dedikodu-panosu">
              <p className="giris-aciklama">
                {en
                  ? `Borrow up to ${formatPara(krediConfig.maksTutar)} ${paraBirimi} at ~%${Math.round(krediConfig.faizTeklifi * 100)} interest. Miss three instalments and the moneylender seizes a property.`
                  : `En fazla ${formatPara(krediConfig.maksTutar)} ${paraBirimi}, ~%${Math.round(krediConfig.faizTeklifi * 100)} faizle. Üst üste üç taksit kaçırırsan tefeci bir mülküne el koyar.`}
              </p>
              <div className="karanlik-hedef-satir">
                <input
                  type="number"
                  className="kredi-tutar-girdi"
                  min={krediConfig.minTutar}
                  max={krediConfig.maksTutar}
                  value={krediTutar || ''}
                  disabled={yukleniyor}
                  onChange={(e) => setKrediTutar(Number(e.target.value))}
                  placeholder={`${krediConfig.minTutar}–${formatPara(krediConfig.maksTutar)}`}
                />
                <button
                  className="ikincil"
                  disabled={yukleniyor || krediTutar < krediConfig.minTutar || krediTutar > krediConfig.maksTutar}
                  onClick={() => onKrediAl(krediTutar)}
                >
                  {en ? 'Borrow' : 'Borç Al'}
                </button>
              </div>
            </div>
          ) : (
            <p className="giris-aciklama">{en ? 'The moneylender turns you away for now.' : 'Tefeci şimdilik sana borç vermiyor.'}</p>
          )}
        </Sutun>

        <Sutun baslik={m.iyYatirimlikGayrimenkuller} idx={1} mobil={mobil} acik={acikSutun} setAcik={setAcikSutun}>
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
                  title={`${kt(mulk.aciklama)}\n${bic(
                    m.iyGetiriBrut,
                    mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : '',
                    formatPara(mulk.tahminiYillikGetiriMiktari),
                    paraBirimi,
                    (mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : '') + mulk.tahminiYillikGetiriYuzdesi
                  )}\n${bic(m.iyBakimVergi, formatPara(mulk.yillikBakimTahmini), paraBirimi)}\n${mulk.piyasaIpucu}`}
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
          <p className="giris-aciklama">{m.iyBakimAcikla}</p>

          {/* Salgına hazırlık */}
          {salginKorunma && (
            <>
              <h3 className="tam-baslik">{en ? 'Plague Preparedness' : 'Salgına Hazırlık'}</h3>
              {salginKorunma.vebaVar ? (
                <p className="giris-aciklama">
                  {en ? 'A plague is already raging — too late to prepare.' : 'Salgın çoktan başladı — hazırlık için geç kaldın.'}
                </p>
              ) : (
                <div className="yatirim-kartlari">
                  {salginKorunma.kartlar.map((k) => (
                    <button
                      key={k.kademe}
                      className={`yatirim-kart isyatirim-kendi-is-kart${k.sahipMi ? ' mulk-kart-sahip' : ''}`}
                      disabled={yukleniyor || !k.alinabilir || para < k.maliyet}
                      onClick={() => onSalginKorunma(k.kademe as 1 | 2)}
                      title={k.aciklama}
                    >
                      <span className="meslek-simge">{k.kademe === 2 ? '🏚️' : '⚕️'}</span>
                      <strong>{k.ad}</strong>
                      <span className="meslek-aciklama">{k.aciklama}</span>
                      <span className="meslek-aciklama">
                        {k.sahipMi
                          ? en
                            ? '✓ ready for the next wave'
                            : '✓ bir sonraki dalgaya hazır'
                          : bic(m.iyFiyatKisa, formatPara(k.maliyet), paraBirimi)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </Sutun>

        <Sutun baslik={m.iyKaranlikIsler} idx={2} mobil={mobil} acik={acikSutun} setAcik={setAcikSutun}>
          <h3 className="tam-baslik">{m.iyKaranlikIsler}</h3>
          <p className="giris-aciklama">{m.iyKaranlikIsAcikla}</p>

          <div className="yatirim-kartlari">
            {kotuIsler.map((is) => (
              <KaranlikIsKart
                key={is.id}
                is={is}
                dil={dil}
                m={m}
                paraBirimi={paraBirimi}
                yukleniyor={yukleniyor}
                rakipler={rakipler}
                onKotuIs={onKotuIs}
              />
            ))}
          </div>

          <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 45 ? 'suc-seviyesi-riskli' : ''}`}>
            {bic(m.iySucSeviyen, Math.round(sucSeviyesi), sucSeviyesiEtiketi(m, sucSeviyesi))}
          </p>
        </Sutun>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
