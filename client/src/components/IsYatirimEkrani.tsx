import type { YatirimConfig, MulkKartBilgisi, MulkTuru } from '../types';
import { formatPara } from '../format';

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

const KENDI_ISI_ACIKLAMA: Record<string, string> = {
  Asker: 'karşılığında yıllık maaşın kalıcı olarak yaklaşık %5 artar (bir tavana kadar).',
  Tüccar: 'karşılığında yıllık maaşın kalıcı olarak yaklaşık %5 artar (bir tavana kadar).',
  'Din Adamı': 'karşılığında yıllık maaşın kalıcı olarak yaklaşık %5 artar (bir tavana kadar).',
};

function kendiIsiAsamaEtiketi(yatirimSayisi: number): string {
  if (yatirimSayisi === 0) return 'Henüz hiç yatırım yapmadın.';
  if (yatirimSayisi <= 2) return `Şimdiye kadar ${yatirimSayisi} kez yatırım yaptın; işin büyümeye başladı.`;
  if (yatirimSayisi <= 5) return `${yatirimSayisi} yatırımla artık köklü, tanınan bir isimsin.`;
  return `${yatirimSayisi} yatırımla küçük bir imparatorluk kurdun.`;
}

function sucSeviyesiEtiketi(seviye: number): string {
  if (seviye < 20) return 'Sicilin temiz sayılır.';
  if (seviye < 45) return 'Muhafızların dikkatini biraz çekiyorsun.';
  if (seviye < 70) return 'Aranan biri haline geliyorsun; dikkatli ol.';
  return 'Peşindeler — her an baskın yiyebilirsin.';
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
  const saldiriGucu = Math.round(orduMevcudu * (1 + orduTechizatSeviyesi / 100));
  const paraYetersiz = para < config.kendiIsiMaliyeti;
  const kendiIsiAciklama = KENDI_ISI_ACIKLAMA[meslek] ?? 'karşılığında kazancın kalıcı olarak artar.';

  return (
    <div className="ekran ekran-tam-sayfa">
      <h2>İşin &amp; Yatırımların</h2>
      {islemMesaji && <p className="yatirim-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-govde-3col">
        <div className="tam-sutun">
          <h3 className="tam-baslik">Görevin</h3>

          <div className="is-profil-karti">
            <span className="is-profil-simge" aria-hidden="true">
              {MESLEK_SIMGESI[meslek] ?? '🎯'}
            </span>
            <div className="is-profil-metin">
              <strong>{rutbe}</strong>
              <span>{meslek}</span>
            </div>
            <span className="kademe-gostergesi" aria-label={`Kademe ${rutbeSeviye} / 5`}>
              {[1, 2, 3, 4, 5].map((seviye) => (
                <span key={seviye} className={`kademe-nokta${seviye <= rutbeSeviye ? ' kademe-nokta-dolu' : ''}`} />
              ))}
            </span>
          </div>

          <div className="is-karo-izgara">
            <StatKarosu ikon="💰" etiket="Yıllık Kazanç" deger={`~${formatPara(maasYillik)} ${paraBirimi}`} vurgu />

            {amirAdi && <StatKarosu ikon="🎖️" etiket="Amirin" deger={amirAdi} alt={amirRutbe ?? undefined} />}

            {sehirYonetimSeviyesi > 0 && (
              <StatKarosu
                ikon="🏛️"
                etiket="Şehir Yönetimi"
                deger={sehirYonetimUnvan ?? ''}
                alt={`Seviye ${sehirYonetimSeviyesi}`}
              />
            )}

            {meslek === 'Asker' && (
              <>
                <StatKarosu ikon="⚔️" etiket="Ordu Mevcudu" deger={`${orduMevcudu} asker`} />
                <StatKarosu ikon="🛡️" etiket="Teçhizat" deger={`%${orduTechizatSeviyesi}`} />
                <StatKarosu ikon="💥" etiket="Saldırı Gücü" deger={`${saldiriGucu}`} />
              </>
            )}

            {meslek === 'Tüccar' && (
              <StatKarosu ikon="📈" etiket="Ticaret Sermayesi" deger={`${formatPara(ticaretSermaye)} ${paraBirimi}`} />
            )}

            {meslek === 'Din Adamı' && <StatKarosu ikon="🕊️" etiket="Nüfuz" deger={`${nufuz}`} />}
          </div>

          <h3 className="tam-baslik tam-baslik-dedikodu">Piyasa Dedikoduları</h3>

          {dedikodular.length > 0 ? (
            <div className="dedikodu-panosu dedikodu-panosu-vurgu">
              <ul>
                {dedikodular.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="giris-aciklama">Şu an konuşulan bir şey yok.</p>
          )}
        </div>

        <div className="tam-sutun">
          <h3 className="tam-baslik">Yatırımlık Gayrimenkuller</h3>

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
                  {mulk.ad} {mulk.sahipMi && '· Sahipsin'}
                </strong>
                <span className="meslek-aciklama">{mulk.aciklama}</span>
                <span className="meslek-aciklama">
                  Avantajlı: {mulk.avantajliDurum} · Dezavantajlı: {mulk.dezavantajliDurum}
                </span>
                <span className={`mulk-getiri ${mulk.tahminiYillikGetiriYuzdesi < 0 ? 'mulk-getiri-negatif' : 'mulk-getiri-pozitif'}`}>
                  Şu an tahmini getiri: {mulk.tahminiYillikGetiriMiktari >= 0 ? '+' : ''}
                  {formatPara(mulk.tahminiYillikGetiriMiktari)} {paraBirimi}/yıl ({mulk.tahminiYillikGetiriYuzdesi > 0 ? '+' : ''}
                  {mulk.tahminiYillikGetiriYuzdesi}%)
                </span>
                <span className="meslek-aciklama" title="7-10 yılda bir çıkan bakım/vergi masrafının yıllığa bölünmüş yaklaşık tutarı; getiriden ayrı, her koşulda gider.">
                  🔧 Bakım/vergi: ~-{formatPara(mulk.yillikBakimTahmini)} {paraBirimi}/yıl
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
          <h3 className="tam-baslik">Kendi İşin</h3>

          <button className="yatirim-kart isyatirim-kendi-is-kart" disabled={yukleniyor || paraYetersiz} onClick={onYatirimYap}>
            <span className="meslek-simge">💼</span>
            <strong>Kendi İşine Yatırım Yap</strong>
            <span className="meslek-aciklama">
              {formatPara(config.kendiIsiMaliyeti)} {paraBirimi} {kendiIsiAciklama}
            </span>
            <span className="meslek-aciklama">
              {kendiIsiAsamaEtiketi(config.kendiIsiYatirimSayisi)} Her yeni yatırım bir öncekinden daha pahalıya gelir.
            </span>
          </button>

          <p className="rutbe-ipucu">
            <strong>Rütbe nasıl yükselir?</strong> İşine yatırım yaptıkça ve{' '}
            {meslek === 'Din Adamı' ? 'ahlakını' : 'şöhretini'} yüksek tuttukça kariyerin ilerler; zamanla kıdem de
            kazanırsın. Her terfiden sonra bir sonrakine kadar birkaç yıl geçmesi gerekir. Rütben asla düşmez.
          </p>

          <h3 className="tam-baslik">Riskli İşler</h3>

          <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 45 ? 'suc-seviyesi-riskli' : ''}`}>
            Suç/Aranma seviyen: {Math.round(sucSeviyesi)}/100 — {sucSeviyesiEtiketi(sucSeviyesi)}
          </p>

          <div className="isyatirim-zar-izgara">
            {zarKademeleri.map((tutar) => (
              <button key={tutar} className="zar-karo" disabled={yukleniyor || para < tutar} onClick={() => onZarAt(tutar)}>
                <span className="meslek-simge">🎲</span>
                <strong>
                  {formatPara(tutar)} {paraBirimi}
                </strong>
                <span className="meslek-aciklama">
                  Kazanırsan {formatPara(tutar * 2)} {paraBirimi}, kaybedersen hepsi gider.
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        Geri Dön
      </button>
    </div>
  );
}
