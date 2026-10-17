import { useState } from 'react';
import type { AileDurumu, DugunButcesi, EvcilHayvan, TeklifHediyesi } from '../types';
import { im, huyAdi } from '../iliskilerMetin';
import { bic, type Metinler } from '../i18n';
import { HAYVAN_SIMGESI } from '../bolgeTema';
import { useDil } from '../DilContext';

interface AileEkraniProps {
  anneAdi: string;
  babaAdi: string;
  dostAdi: string;
  rakipAdi: string;
  dostPuani: number;
  rakipPuani: number;
  durum: AileDurumu | null;
  evcilHayvan: EvcilHayvan | null;
  yukleniyor: boolean;
  islemMesaji: string | null;
  onEtkilesim: (etkilesimId: string, cocukIndex?: number) => void;
  onTalep: (karar: 'kabul' | 'ret') => void;
  /** Eşle ilişki barı eylemi: zaman geçir / hediye ver (ucuz | pahali). */
  onEsEylem: (eylem: 'zaman_gecir' | 'hediye_ver', hediye?: 'ucuz' | 'pahali') => void;
  /** Mantık evliliği: listedeki adaya (hediye kademesiyle) teklif. */
  onMantikTeklif: (adayIndex: number, hediye: TeklifHediyesi) => void;
  /** Bekleyen düğün için bütçe seçimi. */
  onDugun: (butce: DugunButcesi) => void;
  /** 15 yaşındaki çocuğu yanında çalışmaya davet et. */
  onCocukIseAl: (cocukIndex: number) => void;
  /** Reddeden çocuğa öfkelen / sakin karşıla. */
  onCocukRedTepkisi: (cocukIndex: number, tepki: 'ofke' | 'sakin') => void;
  /** Sevgili eylemleri: evlilik teklifi / gönül al / ayrıl. */
  onSevgili: (eylem: 'teklif' | 'gonul_al' | 'ayril') => void;
  onGeriDon: () => void;
}

/** Etkileşim id → [ad anahtarı, açıklama anahtarı] */
const ETK_METIN: Record<string, [keyof Metinler, keyof Metinler]> = {
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

/** Evin içi arka planı — tema-duyarlı, salt dekor inline SVG. */
/**
 * Evin içi arka planı — sıcak, gündüz ışığı alan bir oda. Salt dekor.
 * Renkler doğrudan gömülü (SVG sunum niteliklerinde `var()` güvenilir değil).
 */
function AileArkaplan() {
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
      {/* asılı tablo */}
      <rect x="372" y="86" width="104" height="82" rx="4" fill="#4a3016" />
      <rect x="383" y="97" width="82" height="60" fill="#8f7a55" />
      {/* ocak */}
      <g>
        <rect x="520" y="238" width="204" height="150" rx="4" fill="#4a3016" />
        <rect x="512" y="224" width="220" height="20" rx="3" fill="#5a3d20" />
        <rect x="548" y="292" width="148" height="96" fill="#1c0f05" />
        <path d="M596 388c10-30 5-46 22-62 5 18 16 20 18 38 12-9 12-22 9-38 18 16 27 40 21 62z" fill="url(#aileAtesGrad)" />
      </g>
      {/* halı */}
      <ellipse cx="400" cy="452" rx="270" ry="40" fill="#8a3830" opacity="0.9" />
      <ellipse cx="400" cy="452" rx="240" ry="32" fill="none" stroke="#c98a5a" strokeWidth="4" opacity="0.5" />
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
  anneAdi,
  babaAdi,
  dostAdi,
  rakipAdi,
  dostPuani,
  rakipPuani,
  durum,
  evcilHayvan,
  yukleniyor,
  islemMesaji,
  onEtkilesim,
  onTalep,
  onEsEylem,
  onMantikTeklif,
  onDugun,
  onSevgili,
  onCocukIseAl,
  onCocukRedTepkisi,
  onGeriDon,
}: AileEkraniProps) {
  const { m, kt, dil } = useDil();
  // Aday kartı başına seçilen teklif hediyesi (varsayılan: sade).
  const [hediyeSecimi, setHediyeSecimi] = useState<Record<number, TeklifHediyesi>>({});

  const kalanYil = (anahtar: string): number => {
    if (!durum) return 0;
    return Math.max(0, (durum.kilitler[anahtar] ?? 0) - durum.guncelYil);
  };

  const cocukEtkilesimleri = durum?.etkilesimler.filter((e) => e.hedef === 'cocuk') ?? [];
  const aileEtkilesimleri = durum?.etkilesimler.filter((e) => e.hedef === 'hepsi') ?? [];
  const yasayanCocukVar = (durum?.cocuklar ?? []).some((c) => c.yasiyor);

  return (
    <div className="ekran ekran-tam-sayfa ekran-aile">
      <AileArkaplan />
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

        {durum?.bekleyenDugun && (
          <div className="aile-kart aile-kart-tam aile-dugun-karti">
            <h3>💒 {im(dil, 'dugunBaslik')}</h3>
            <p className="aile-talep-metin">{im(dil, 'dugunIntro', durum.bekleyenDugun.isim)}</p>
            {durum.bekleyenDugun.ceyiz > 0 && (
              <p className="aile-talep-tutar">
                {im(dil, 'dugunCeyiz', durum.bekleyenDugun.ceyiz, durum.paraBirimi)}
              </p>
            )}
            <div className="aile-dugun-secenekler">
              {durum.dugunSecenekleri.map((d) => {
                const parasiYok = durum.para < d.maliyet;
                const ad =
                  d.butce === 'ucuz' ? im(dil, 'dugunUcuz') : d.butce === 'orta' ? im(dil, 'dugunOrta') : im(dil, 'dugunPahali');
                const isaretli = (n: number) => (n > 0 ? `+${n}` : String(n));
                return (
                  <button
                    key={d.butce}
                    className="aile-etkilesim-buton aile-dugun-buton"
                    disabled={yukleniyor || parasiYok}
                    onClick={() => onDugun(d.butce)}
                  >
                    <span className="aile-etkilesim-ad">{ad}</span>
                    <span className="aile-etkilesim-alt">
                      {parasiYok ? m.aeParaYetmez : im(dil, 'dugunMaliyet', d.maliyet, durum.paraBirimi)}
                    </span>
                    <span className="aile-etkilesim-alt">
                      {im(dil, 'dugunIliski', isaretli(d.iliski))}
                      {d.un !== 0 ? ` · ${im(dil, 'dugunSohret', isaretli(d.un))}` : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {durum?.es ? (
          <div className="aile-kart aile-es-karti">
            <h3>{im(dil, 'esBaslik')}</h3>
            <div className="aile-es-baslik">
              <span className="aile-es-ad">💍 {durum.es.adi}</span>
              {durum.es.rutbe && durum.es.meslek && (
                <span className="aile-es-meslek">
                  {kt(durum.es.rutbe)} · {kt(durum.es.meslek)}
                  {durum.es.yas != null ? ` · ${im(dil, 'yasEk', durum.es.yas)}` : ''}
                </span>
              )}
            </div>
            <div className="aile-huy-satiri">
              {durum.es.tur && (
                <span className="aile-huy-rozet aile-tur-rozet">
                  {durum.es.tur === 'ask' ? '❤️ ' + im(dil, 'turAsk') : '📜 ' + im(dil, 'turMantik')}
                </span>
              )}
              {durum.es.huylar.map((h) => (
                <span key={h} className="aile-huy-rozet">
                  {huyAdi(dil, h)}
                </span>
              ))}
            </div>
            <IliskiBar deger={durum.es.puan} etiket={`${esEtiket(m, durum.es.puan)} · ${im(dil, 'barSayi', durum.es.puan)}`} />
            {durum.es.ihmalYili >= 2 && <p className="aile-ihmal-uyari">⚠️ {im(dil, 'ihmalUyari')}</p>}
            <div className="aile-etkilesim-satir">
              <button
                className="aile-etkilesim-buton"
                disabled={yukleniyor || kalanYil('es:zaman_gecir') > 0}
                onClick={() => onEsEylem('zaman_gecir')}
              >
                <span className="aile-etkilesim-ad">{im(dil, 'zamanGecir')}</span>
                <span className="aile-etkilesim-alt">
                  {kalanYil('es:zaman_gecir') > 0 ? im(dil, 'henuzErken') : im(dil, 'zamanGecirAlt')}
                </span>
              </button>
              {(['ucuz', 'pahali'] as const).map((h) => {
                const maliyet = h === 'ucuz' ? durum.esEylem.hediyeUcuz : durum.esEylem.hediyePahali;
                const kilit = kalanYil('es:hediye_ver');
                const parasiYok = durum.para < maliyet;
                return (
                  <button
                    key={h}
                    className="aile-etkilesim-buton"
                    disabled={yukleniyor || kilit > 0 || parasiYok}
                    onClick={() => onEsEylem('hediye_ver', h)}
                  >
                    <span className="aile-etkilesim-ad">{h === 'ucuz' ? im(dil, 'hediyeUcuz') : im(dil, 'hediyePahali')}</span>
                    <span className="aile-etkilesim-alt">
                      {kilit > 0 ? im(dil, 'henuzErken') : parasiYok ? im(dil, 'paraYetmez') : `${maliyet} ${durum.paraBirimi}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="aile-kart aile-es-karti">
            <h3>{im(dil, 'esBaslik')}</h3>
            <p className="aile-bos-metin">{m.aeEsYokMetin}</p>
          </div>
        )}

        {durum?.sevgili && !durum.es && !durum.bekleyenDugun && (
          <div className="aile-kart aile-kart-tam aile-sevgili-karti">
            <h3>💞 {im(dil, 'sevgiliBaslik')}</h3>
            <div className="aile-es-baslik">
              <span className="aile-es-ad">{durum.sevgili.isim}</span>
              <span className="aile-es-meslek">
                {kt(durum.sevgili.rutbe)} · {kt(durum.sevgili.meslek)} · {im(dil, 'yasEk', durum.sevgili.yas)}
              </span>
            </div>
            <div className="aile-huy-satiri">
              <span className="aile-huy-rozet">{huyAdi(dil, durum.sevgili.huy)}</span>
              <span className="aile-huy-rozet aile-huy-gizli">{im(dil, 'gizliHuy')}</span>
            </div>
            <IliskiBar
              deger={durum.sevgili.bar}
              etiket={`${esEtiket(m, durum.sevgili.bar)} · ${im(dil, 'barSayi', durum.sevgili.bar)}`}
            />
            {durum.sevgili.darildi && <p className="aile-ihmal-uyari">💢 {im(dil, 'sevgiliDargin')}</p>}
            <div className="aile-etkilesim-satir">
              <button
                className="aile-etkilesim-buton"
                disabled={yukleniyor}
                onClick={() => onSevgili('teklif')}
              >
                <span className="aile-etkilesim-ad">{im(dil, 'sevgiliTeklif')}</span>
              </button>
              <button
                className="aile-etkilesim-buton"
                disabled={yukleniyor || durum.sevgili.gonulKilitKalanYil > 0 || durum.para < durum.sevgili.gonulMaliyet}
                onClick={() => onSevgili('gonul_al')}
              >
                <span className="aile-etkilesim-ad">{im(dil, 'gonulAl')}</span>
                <span className="aile-etkilesim-alt">
                  {durum.sevgili.gonulKilitKalanYil > 0
                    ? im(dil, 'henuzErken')
                    : durum.para < durum.sevgili.gonulMaliyet
                      ? im(dil, 'paraYetmez')
                      : `${durum.sevgili.gonulMaliyet} ${durum.paraBirimi}`}
                </span>
              </button>
              <button className="aile-etkilesim-buton" disabled={yukleniyor} onClick={() => onSevgili('ayril')}>
                <span className="aile-etkilesim-ad">{im(dil, 'sevgiliAyril')}</span>
              </button>
            </div>
          </div>
        )}

        {durum && !durum.es && !durum.bekleyenDugun && !durum.sevgili && !durum.tanismaAktif && (
          <div className="aile-kart aile-kart-tam aile-adaylar-karti">
            <h3>📜 {im(dil, 'adaylarBaslik')}</h3>
            {durum.mantik.acik ? (
              <>
                <p className="aile-bos-metin">{im(dil, 'adayIntro')}</p>
                <div className="aile-aday-izgara">
                  {durum.mantik.adaylar.map((a, i) => {
                    const secili = hediyeSecimi[i] ?? 'sade';
                    const secenek = durum.mantik.teklifSecenekleri.find((t) => t.hediye === secili);
                    const parasiYok = !!secenek && durum.para < secenek.maliyet;
                    return (
                      <div key={a.isim} className="aile-aday-karti">
                        <div className="aile-es-baslik">
                          <span className="aile-es-ad">{a.isim}</span>
                          <span className="aile-es-meslek">
                            {kt(a.rutbe)} · {kt(a.meslek)} · {im(dil, 'yasEk', a.yas)}
                          </span>
                        </div>
                        <span className={`aile-huy-rozet aile-grup-${a.grup}`}>
                          {a.grup === 'genc' ? im(dil, 'genc') : im(dil, 'olgun')}
                        </span>
                        <p className="aile-bos-metin">{a.grup === 'genc' ? im(dil, 'gencAciklama') : im(dil, 'olgunAciklama')}</p>
                        <p className="aile-aday-satir">{im(dil, 'ceyiz', a.ceyiz, durum.paraBirimi)}</p>
                        <div className="aile-huy-satiri">
                          <span className="aile-huy-rozet">{huyAdi(dil, a.huy)}</span>
                          <span className="aile-huy-rozet aile-huy-gizli">{im(dil, 'gizliHuy')}</span>
                        </div>
                        <div className="aile-hediye-secimi" role="radiogroup">
                          {(['sade', 'ucuz', 'pahali'] as const).map((h) => {
                            const t = durum.mantik.teklifSecenekleri.find((x) => x.hediye === h);
                            return (
                              <button
                                key={h}
                                type="button"
                                className={`aile-hediye-cip${secili === h ? ' aile-hediye-cip-secili' : ''}`}
                                onClick={() => setHediyeSecimi((onceki) => ({ ...onceki, [i]: h }))}
                              >
                                {h === 'sade' ? im(dil, 'teklifSade') : h === 'ucuz' ? im(dil, 'teklifUcuz') : im(dil, 'teklifPahali')}
                                {t && t.maliyet > 0 ? ` · ${t.maliyet} ${durum.paraBirimi}` : ''}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          className="birincil aile-evlen-buton"
                          disabled={yukleniyor || parasiYok}
                          onClick={() => onMantikTeklif(i, secili)}
                        >
                          {im(dil, 'teklifEt')}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="aile-bos-metin">
                {durum.mantik.sebep === 'yas_dusuk'
                  ? im(dil, 'sebepYasDusuk', durum.mantik.minYas)
                  : durum.mantik.sebep === 'yas_donemi'
                    ? im(dil, 'sebepYasDonemi')
                    : durum.mantik.sebep === 'kilit'
                      ? im(dil, 'sebepKilit')
                      : durum.mantik.sebep === 'sevgili'
                        ? im(dil, 'sebepSevgili')
                        : im(dil, 'sebepHapis')}
              </p>
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
                      {cocuk.isDurumu === 'ise_alindi' && (
                        <p className="aile-bos-metin">💼 {im(dil, 'yanindaCalisiyor')}</p>
                      )}
                      {cocuk.isDurumu === 'bekliyor' && (
                        <button
                          className="aile-etkilesim-buton aile-is-davet"
                          disabled={yukleniyor}
                          onClick={() => onCocukIseAl(i)}
                          title={im(dil, 'yanimaAlAciklama')}
                        >
                          <span className="aile-etkilesim-ad">{im(dil, 'yanimaAl')}</span>
                          <span className="aile-etkilesim-alt">{im(dil, 'yanimaAlAciklama')}</span>
                        </button>
                      )}
                      {cocuk.isDurumu === 'red_tepkisi' && (
                        <>
                          <p className="aile-ihmal-uyari">{im(dil, 'redBasligi')}</p>
                          <div className="aile-etkilesim-satir">
                            <button
                              className="aile-etkilesim-buton"
                              disabled={yukleniyor}
                              onClick={() => onCocukRedTepkisi(i, 'ofke')}
                            >
                              <span className="aile-etkilesim-ad">{im(dil, 'redOfke')}</span>
                            </button>
                            <button
                              className="aile-etkilesim-buton"
                              disabled={yukleniyor}
                              onClick={() => onCocukRedTepkisi(i, 'sakin')}
                            >
                              <span className="aile-etkilesim-ad">{im(dil, 'redSakin')}</span>
                            </button>
                          </div>
                        </>
                      )}
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
