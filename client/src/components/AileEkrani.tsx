import type { AileDurumu, EvcilHayvan } from '../types';
import { bic, type Metinler } from '../i18n';
import { HAYVAN_SIMGESI } from '../bolgeTema';
import { useDil } from '../DilContext';

interface AileEkraniProps {
  cag: string;
  anneAdi: string;
  babaAdi: string;
  dostAdi: string;
  rakipAdi: string;
  dostPuani: number;
  rakipPuani: number;
  durum: AileDurumu | null;
  /** Evli mi + yaşı — evlilik butonunu göstermek için (18+ ve bekar). */
  evli: boolean;
  yas: number;
  evcilHayvan: EvcilHayvan | null;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onEtkilesim: (etkilesimId: string, cocukIndex?: number) => void;
  onTalep: (karar: 'kabul' | 'ret') => void;
  onEvlilik: () => void;
  onGeriDon: () => void;
}

/** Etkileşim id → [ad anahtarı, açıklama anahtarı] */
const ETK_METIN: Record<string, [keyof Metinler, keyof Metinler]> = {
  es_hediye: ['aeEtk_es_hediye', 'aeEtk_es_hediye_d'],
  es_zaman: ['aeEtk_es_zaman', 'aeEtk_es_zaman_d'],
  es_sevgi: ['aeEtk_es_sevgi', 'aeEtk_es_sevgi_d'],
  es_gezi: ['aeEtk_es_gezi', 'aeEtk_es_gezi_d'],
  cocuk_oyna: ['aeEtk_cocuk_oyna', 'aeEtk_cocuk_oyna_d'],
  cocuk_hediye: ['aeEtk_cocuk_hediye', 'aeEtk_cocuk_hediye_d'],
  cocuk_egitim: ['aeEtk_cocuk_egitim', 'aeEtk_cocuk_egitim_d'],
  aile_gezi: ['aeEtk_aile_gezi', 'aeEtk_aile_gezi_d'],
};

function esEtiket(m: Metinler, deger: number): string {
  if (deger <= 20) return m.aeEsCatirdiyor;
  if (deger <= 40) return m.aeEsGergin;
  if (deger <= 60) return m.aeEsIstikrarli;
  if (deger <= 80) return m.aeEsSicak;
  return m.aeEsCokBagli;
}

function cocukEtiket(m: Metinler, deger: number): string {
  if (deger < 25) return m.aeCocukKopuk;
  if (deger < 45) return m.aeCocukMesafeli;
  if (deger < 65) return m.aeCocukIyi;
  if (deger < 85) return m.aeCocukYakin;
  return m.aeCocukCokYakin;
}

function dostEtiketleri(m: Metinler): [number, string][] {
  return [
    [20, m.ilDostKusgun],
    [40, m.ilDostMesafeli],
    [60, m.ilDostTanidik],
    [80, m.ilDostDost],
    [100, m.ilDostYakin],
  ];
}

function rakipEtiketleri(m: Metinler): [number, string][] {
  return [
    [20, m.ilRakipAmansiz],
    [40, m.ilRakipDusman],
    [60, m.ilRakipGergin],
    [80, m.ilRakipNotr],
    [100, m.ilRakipYumusak],
  ];
}

function iliskiEtiketBul(deger: number, tablo: [number, string][]): string {
  for (const [esik, etiket] of tablo) {
    if (deger <= esik) return etiket;
  }
  return tablo[tablo.length - 1][1];
}

/** Dost/rakip ilişki kartı — eskiden ayrı bir sağ panel bileşeniydi (IliskilerPaneli), 2026-09 sonunda Aile ekranına taşındı. */
function DostRakipKarti({
  m,
  dostAdi,
  rakipAdi,
  dostPuani,
  rakipPuani,
}: {
  m: Metinler;
  dostAdi: string;
  rakipAdi: string;
  dostPuani: number;
  rakipPuani: number;
}) {
  return (
    <div className="aile-kart aile-iliskiler-karti">
      <h3>{m.ilBaslik}</h3>
      <div className="aile-koken-listesi">
        <span className="iliski-rozet iliski-dost">
          🤝 {dostAdi} · {iliskiEtiketBul(dostPuani, dostEtiketleri(m))}
        </span>
        <span className="iliski-rozet iliski-rakip">
          ⚔️ {rakipAdi} · {iliskiEtiketBul(rakipPuani, rakipEtiketleri(m))}
        </span>
      </div>
    </div>
  );
}

function IliskiBar({ deger, etiket }: { deger: number; etiket: string }) {
  const yuzde = Math.max(0, Math.min(100, deger));
  return (
    <div className="aile-iliski">
      <div className="aile-iliski-bar" role="progressbar" aria-valuenow={yuzde} aria-valuemin={0} aria-valuemax={100}>
        <div className="aile-iliski-dolgu" style={{ width: `${yuzde}%` }} />
      </div>
      <span className="aile-iliski-etiket">{etiket}</span>
    </div>
  );
}

/**
 * Evin içi arka planı — döneme göre iki ayrı sahne (Orta Çağ: kerpiç/ahşap köy
 * evi; Sanayi Devrimi: duvar kağıtlı, gazlı lambalı Viktorya dönemi salonu).
 * Salt dekor inline SVG; renkler doğrudan gömülü (SVG sunum niteliklerinde
 * `var()` güvenilir değil).
 */
function AileArkaplan({ cag }: { cag: string }) {
  if (cag === 'Sanayi Devrimi') return <AileArkaplanSanayi />;
  return <AileArkaplanOrtaCag />;
}

function AileArkaplanOrtaCag() {
  return (
    <svg className="aile-arkaplan" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="aileDuvarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b98a5c" />
          <stop offset="1" stopColor="#8a6038" />
        </linearGradient>
        <linearGradient id="ailePencereGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe6f7" />
          <stop offset="0.6" stopColor="#a9cdea" />
          <stop offset="1" stopColor="#e9d3a8" />
        </linearGradient>
        <radialGradient id="aileAtesGrad" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="0.6" stopColor="#f0912f" />
          <stop offset="1" stopColor="#c9531f" />
        </radialGradient>
      </defs>
      {/* duvar */}
      <rect x="0" y="0" width="800" height="500" fill="url(#aileDuvarGrad)" />
      {/* kerpiç/kiriş dokusu */}
      <g stroke="rgba(0,0,0,0.15)" strokeWidth="6">
        <line x1="0" y1="0" x2="0" y2="386" />
        <line x1="340" y1="0" x2="300" y2="386" />
        <line x1="800" y1="0" x2="800" y2="386" />
        <line x1="0" y1="20" x2="800" y2="20" />
      </g>
      {/* zemin + tahta çizgileri */}
      <rect x="0" y="386" width="800" height="114" fill="#6b4a2c" />
      <rect x="0" y="386" width="800" height="5" fill="rgba(0,0,0,0.22)" />
      <g stroke="rgba(0,0,0,0.14)" strokeWidth="2">
        <line x1="0" y1="418" x2="800" y2="418" />
        <line x1="0" y1="452" x2="800" y2="452" />
        <line x1="150" y1="386" x2="120" y2="500" />
        <line x1="400" y1="386" x2="400" y2="500" />
        <line x1="650" y1="386" x2="680" y2="500" />
      </g>
      {/* pencere — gündüz ışığı */}
      <g>
        <rect x="78" y="58" width="210" height="172" rx="6" fill="#5a3d22" />
        <rect x="92" y="72" width="182" height="144" fill="url(#ailePencereGrad)" />
        <line x1="183" y1="72" x2="183" y2="216" stroke="#5a3d22" strokeWidth="7" />
        <line x1="92" y1="144" x2="274" y2="144" stroke="#5a3d22" strokeWidth="7" />
      </g>
      {/* ışık huzmesi */}
      <path d="M92 216 L274 216 L470 386 L150 386 Z" fill="#ffe8b0" opacity="0.16" />
      {/* asılı goblen/tablo */}
      <rect x="372" y="86" width="104" height="82" rx="4" fill="#4a3016" />
      <rect x="383" y="97" width="82" height="60" fill="#8f7a55" />
      {/* taş ocak — büyük, sıvasız */}
      <g>
        <rect x="512" y="220" width="228" height="168" rx="2" fill="#5c5148" />
        <rect x="512" y="220" width="228" height="168" rx="2" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="3" />
        <rect x="536" y="300" width="180" height="88" fill="#1c0f05" />
        <path d="M584 388c10-30 5-46 22-62 5 18 16 20 18 38 12-9 12-22 9-38 18 16 27 40 21 62z" fill="url(#aileAtesGrad)" />
        {/* asılı kazan */}
        <path d="M660 300v-18a10 10 0 0 1 20 0v18" fill="none" stroke="#2a2620" strokeWidth="4" />
        <ellipse cx="670" cy="308" rx="16" ry="10" fill="#2a2620" />
      </g>
      {/* saman/hasır halı */}
      <ellipse cx="400" cy="452" rx="270" ry="40" fill="#8a6a30" opacity="0.85" />
      <ellipse cx="400" cy="452" rx="240" ry="32" fill="none" stroke="#c9a35a" strokeWidth="4" opacity="0.5" />
    </svg>
  );
}

function AileArkaplanSanayi() {
  return (
    <svg className="aile-arkaplan" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="aileSanayiDuvarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5c4a5e" />
          <stop offset="1" stopColor="#3c2f42" />
        </linearGradient>
        <linearGradient id="aileSanayiPencereGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2f3a" />
          <stop offset="0.55" stopColor="#4a5568" />
          <stop offset="1" stopColor="#8a7a5a" />
        </linearGradient>
        <radialGradient id="aileSanayiAtesGrad" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="0.6" stopColor="#e07a2f" />
          <stop offset="1" stopColor="#a8391a" />
        </radialGradient>
        <radialGradient id="aileGazLambaGrad" cx="0.5" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* duvar kağıdı zemini */}
      <rect x="0" y="0" width="800" height="500" fill="url(#aileSanayiDuvarGrad)" />
      {/* şerit desenli duvar kağıdı */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="10">
        <line x1="40" y1="0" x2="40" y2="386" />
        <line x1="120" y1="0" x2="120" y2="386" />
        <line x1="200" y1="0" x2="200" y2="386" />
        <line x1="280" y1="0" x2="280" y2="386" />
        <line x1="360" y1="0" x2="360" y2="386" />
        <line x1="440" y1="0" x2="440" y2="386" />
        <line x1="520" y1="0" x2="520" y2="386" />
        <line x1="600" y1="0" x2="600" y2="386" />
        <line x1="680" y1="0" x2="680" y2="386" />
        <line x1="760" y1="0" x2="760" y2="386" />
      </g>
      {/* korniş çizgisi */}
      <rect x="0" y="0" width="800" height="14" fill="#2a2030" />
      {/* ahşap zemin (parke) — daha koyu, cilalı */}
      <rect x="0" y="386" width="800" height="114" fill="#3a2a20" />
      <rect x="0" y="386" width="800" height="5" fill="rgba(0,0,0,0.3)" />
      <g stroke="rgba(0,0,0,0.18)" strokeWidth="2">
        <line x1="0" y1="416" x2="800" y2="416" />
        <line x1="0" y1="448" x2="800" y2="448" />
        <line x1="130" y1="386" x2="105" y2="500" />
        <line x1="400" y1="386" x2="400" y2="500" />
        <line x1="660" y1="386" x2="690" y2="500" />
      </g>
      {/* büyük çerçeveli pencere — akşam/loş sokak ışığı */}
      <g>
        <rect x="80" y="46" width="220" height="196" rx="4" fill="#241a28" />
        <rect x="94" y="60" width="192" height="168" fill="url(#aileSanayiPencereGrad)" />
        <line x1="190" y1="60" x2="190" y2="228" stroke="#241a28" strokeWidth="7" />
        <line x1="94" y1="144" x2="286" y2="144" stroke="#241a28" strokeWidth="7" />
        <rect x="80" y="238" width="220" height="10" fill="#1c1420" />
      </g>
      {/* ağır perde */}
      <path d="M74 40 Q60 140 78 244 L96 244 Q82 140 96 40 Z" fill="#6b2f3a" opacity="0.85" />
      <path d="M306 40 Q320 140 302 244 L284 244 Q298 140 284 40 Z" fill="#6b2f3a" opacity="0.85" />
      {/* çerçeveli portre tablosu */}
      <rect x="368" y="70" width="112" height="90" rx="3" fill="#241a28" />
      <rect x="378" y="80" width="92" height="70" fill="#7a6a52" />
      {/* gazlı duvar lambası */}
      <g>
        <circle cx="424" cy="196" r="38" fill="url(#aileGazLambaGrad)" />
        <rect x="418" y="178" width="12" height="30" rx="3" fill="#2a2028" />
        <circle cx="424" cy="176" r="9" fill="#fff3c4" opacity="0.9" />
      </g>
      {/* dökme demir şömine + saat */}
      <g>
        <rect x="520" y="212" width="216" height="176" rx="4" fill="#241a1a" />
        <rect x="508" y="196" width="240" height="20" rx="3" fill="#2e2222" />
        <rect x="548" y="282" width="156" height="106" fill="#0f0908" />
        <path d="M598 388c10-30 5-46 22-62 5 18 16 20 18 38 12-9 12-22 9-38 18 16 27 40 21 62z" fill="url(#aileSanayiAtesGrad)" />
        {/* şömine üstü rafta masa saati */}
        <rect x="600" y="176" width="56" height="26" rx="4" fill="#8a6a2a" />
        <circle cx="628" cy="189" r="9" fill="#e8d9a0" />
      </g>
      {/* Viktorya deseni halı */}
      <ellipse cx="400" cy="452" rx="270" ry="40" fill="#3a2a4a" opacity="0.9" />
      <ellipse cx="400" cy="452" rx="240" ry="32" fill="none" stroke="#8a6a9a" strokeWidth="4" opacity="0.45" />
      <ellipse cx="400" cy="452" rx="196" ry="24" fill="none" stroke="#c9a35a" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

interface EtkilesimButonuProps {
  etkilesimId: string;
  ikon: string;
  maliyet: number;
  paraBirimi: string;
  para: number;
  kalanYil: number;
  yukleniyor: boolean;
  m: Metinler;
  onTikla: () => void;
}

function EtkilesimButonu({
  etkilesimId,
  ikon,
  maliyet,
  paraBirimi,
  para,
  kalanYil,
  yukleniyor,
  m,
  onTikla,
}: EtkilesimButonuProps) {
  const metinAnahtarlari = ETK_METIN[etkilesimId];
  const ad = metinAnahtarlari ? m[metinAnahtarlari[0]] : etkilesimId;
  const aciklama = metinAnahtarlari ? m[metinAnahtarlari[1]] : '';
  const kilitli = kalanYil > 0;
  const parasiYok = maliyet > 0 && para < maliyet;
  const devreDisi = yukleniyor || kilitli || parasiYok;
  return (
    <button
      className="aile-etkilesim-buton"
      disabled={devreDisi}
      onClick={onTikla}
      title={aciklama}
    >
      <span className="aile-etkilesim-ad">
        {ikon} {ad}
      </span>
      <span className="aile-etkilesim-alt">
        {kilitli
          ? bic(m.aeKilitliYil, kalanYil)
          : parasiYok
            ? m.aeParaYetmez
            : maliyet > 0
              ? `${maliyet} ${paraBirimi}`
              : m.aeBedava}
      </span>
    </button>
  );
}

export function AileEkrani({
  cag,
  anneAdi,
  babaAdi,
  dostAdi,
  rakipAdi,
  dostPuani,
  rakipPuani,
  durum,
  evli,
  yas,
  evcilHayvan,
  yukleniyor,
  islemMesaji,
  onEtkilesim,
  onTalep,
  onEvlilik,
  onGeriDon,
}: AileEkraniProps) {
  const { m, kt } = useDil();

  const kalanYil = (anahtar: string): number => {
    if (!durum) return 0;
    return Math.max(0, (durum.kilitler[anahtar] ?? 0) - durum.guncelYil);
  };

  const esEtkilesimleri = durum?.etkilesimler.filter((e) => e.hedef === 'es') ?? [];
  const cocukEtkilesimleri = durum?.etkilesimler.filter((e) => e.hedef === 'cocuk') ?? [];
  const aileEtkilesimleri = durum?.etkilesimler.filter((e) => e.hedef === 'hepsi') ?? [];
  const yasayanCocukVar = (durum?.cocuklar ?? []).some((c) => c.yasiyor);

  const sanayi = cag === 'Sanayi Devrimi';

  return (
    <div className={`ekran ekran-tam-sayfa ekran-aile${sanayi ? ' ekran-aile-sanayi' : ''}`}>
      <AileArkaplan cag={cag} />
      <h2>{m.aeBaslikTam}</h2>

      {islemMesaji && <p className="yatirim-islem-mesaji aile-islem-mesaji">{islemMesaji}</p>}

      <div className="tam-kaydirilan aile-govde">
        {durum?.talep && (
          <div className="aile-kart aile-kart-tam aile-talep-karti">
            <h3>💰 {m.aeTalepBaslik}</h3>
            <p className="aile-talep-metin">{bic(m.aeTalepMetin, durum.talep.kimAdi, durum.talep.kalem)}</p>
            <p className="aile-talep-tutar">{bic(m.aeTalepTutar, durum.talep.tutar, durum.paraBirimi)}</p>
            <p className="aile-talep-son">{bic(m.aeTalepSon, durum.talep.sonYil)}</p>
            <div className="aile-talep-butonlar">
              <button
                className="birincil"
                disabled={yukleniyor || durum.para < durum.talep.tutar}
                onClick={() => onTalep('kabul')}
              >
                {m.aeTalepKabul}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('ret')}>
                {m.aeTalepRet}
              </button>
            </div>
          </div>
        )}

        <div className="aile-kart aile-koken-karti">
          <h3>{m.aeKoken}</h3>
          <div className="aile-koken-listesi">
            <span className="iliski-rozet iliski-anne">👩 {anneAdi}</span>
            <span className="iliski-rozet iliski-baba">👨 {babaAdi}</span>
          </div>
        </div>

        <DostRakipKarti m={m} dostAdi={dostAdi} rakipAdi={rakipAdi} dostPuani={dostPuani} rakipPuani={rakipPuani} />

        {durum?.es ? (
          <div className="aile-kart aile-es-karti">
            <h3>{m.aeEsin}</h3>
            <div className="aile-es-baslik">
              <span className="aile-es-ad">💍 {durum.es.adi}</span>
              {durum.es.rutbe && durum.es.meslek && (
                <span className="aile-es-meslek">
                  {kt(durum.es.rutbe)} · {kt(durum.es.meslek)}
                </span>
              )}
            </div>
            <IliskiBar deger={durum.es.puan} etiket={esEtiket(m, durum.es.puan)} />
            <div className="aile-etkilesim-satir">
              {esEtkilesimleri.map((e) => (
                <EtkilesimButonu
                  key={e.id}
                  etkilesimId={e.id}
                  ikon={e.ikon}
                  maliyet={e.maliyet}
                  paraBirimi={durum.paraBirimi}
                  para={durum.para}
                  kalanYil={kalanYil(e.id)}
                  yukleniyor={yukleniyor}
                  m={m}
                  onTikla={() => onEtkilesim(e.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="aile-kart aile-es-karti">
            <h3>{m.aeEsin}</h3>
            <p className="aile-bos-metin">{m.aeEsYokMetin}</p>
            {!evli && yas >= 18 && (
              <button className="ikincil aile-evlen-buton" disabled={yukleniyor} onClick={onEvlilik}>
                {m.aeEvlen}
                <span className="aile-etkilesim-alt">{m.aeEvlenAlt}</span>
              </button>
            )}
          </div>
        )}

        <div className="aile-kart aile-evcil-karti">
          <h3>{m.aeEvcilBaslik}</h3>
          {evcilHayvan ? (
            <span className="iliski-rozet">
              {HAYVAN_SIMGESI[evcilHayvan.tur] ?? '🐾'} {evcilHayvan.isim} · {kt(evcilHayvan.tur)}
            </span>
          ) : (
            <p className="aile-bos-metin">{m.aeEvcilYok}</p>
          )}
        </div>

        <div className="aile-kart aile-kart-tam aile-cocuklar-karti">
          <h3>{m.aeCocuklarin}</h3>
          {(durum?.cocuklar ?? []).length === 0 ? (
            <p className="aile-bos-metin">{m.aeCocukYokMetin}</p>
          ) : (
            <ul className="aile-cocuk-listesi">
              {(durum?.cocuklar ?? []).map((cocuk, i) => (
                <li
                  key={cocuk.isim + cocuk.dogumYili}
                  className={`aile-cocuk-satiri${cocuk.yasiyor ? '' : ' aile-cocuk-olu'}`}
                >
                  <div className="aile-cocuk-ust">
                    <span className="aile-cocuk-ad">
                      {cocuk.yasiyor ? '🧒' : '🕊️'} {cocuk.isim}
                    </span>
                    <span className="aile-cocuk-detay">
                      {cocuk.yasiyor ? bic(m.aeYasEk, cocuk.yas) : m.aeKaybedildi}
                    </span>
                  </div>
                  {cocuk.yasiyor && (
                    <>
                      <IliskiBar deger={cocuk.iliski} etiket={cocukEtiket(m, cocuk.iliski)} />
                      <div className="aile-etkilesim-satir">
                        {cocukEtkilesimleri.map((e) => (
                          <EtkilesimButonu
                            key={e.id}
                            etkilesimId={e.id}
                            ikon={e.ikon}
                            maliyet={e.maliyet}
                            paraBirimi={durum!.paraBirimi}
                            para={durum!.para}
                            kalanYil={kalanYil(`${e.id}:${i}`)}
                            yukleniyor={yukleniyor}
                            m={m}
                            onTikla={() => onEtkilesim(e.id, i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {(durum?.es || yasayanCocukVar) && aileEtkilesimleri.length > 0 && (
          <div className="aile-kart aile-kart-tam aile-birlikte-karti">
            <h3>{m.aeBirlikteBaslik}</h3>
            <div className="aile-etkilesim-satir">
              {aileEtkilesimleri.map((e) => (
                <EtkilesimButonu
                  key={e.id}
                  etkilesimId={e.id}
                  ikon={e.ikon}
                  maliyet={e.maliyet}
                  paraBirimi={durum!.paraBirimi}
                  para={durum!.para}
                  kalanYil={kalanYil(e.id)}
                  yukleniyor={yukleniyor}
                  m={m}
                  onTikla={() => onEtkilesim(e.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
