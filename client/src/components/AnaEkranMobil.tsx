import { useState } from 'react';
import { useDil } from '../DilContext';
import type { CharacterState, FinansOzeti, IsletmeGorunumu } from '../types';
import { formatMusteri, formatPara } from '../format';

/** Ana ekrandaki dört sabit tuşun kimliği — konum ve renk her meslekte aynıdır, yalnız ad/ikon değişir. */
export type AnaTusId = 'isletme' | 'yatirim' | 'calisan' | 'cevre';

interface AnaEkranProps {
  karakter: CharacterState;
  isletme: IsletmeGorunumu | null;
  finans: FinansOzeti | null;
  yukleniyor: boolean;
  onTus: (tus: AnaTusId) => void;
  /** Müşteri paneline dokununca Dükkân sayfası ilgili bölümüne açılır. */
  onMusteriTikla: () => void;
  /** Elde Kalan (gelir/gider) paneline dokununca Dükkân sayfasının bütçe bölümü açılır. */
  onGelirTikla: () => void;
  onIlerle: () => void;
  /** Geçen yılın kısa haberi (dönem/terfi/hapis…); sahne alanında kapatılabilir şerit olarak gösterilir. */
  yilNotu: string | null;
  onNotKapat: () => void;
  /** PC: açık strateji sayfası (varsa) — tuş vurgulanır, üstteki cam paneller gizlenir, tuşlar tek satıra iner. */
  sayfaAcik?: AnaTusId | null;
  /** PC: yan ekran (Evin/Mağaza/…) ortada açıkken de tuşlar tek satıra iner. */
  kompakt?: boolean;
}

interface TusTanimi {
  id: AnaTusId;
  ikon: string;
  ad: { tr: string; en: string };
}

const DONEM_ADLARI: Record<string, { ikon: string; tr: string; en: string }> = {
  bolluk: { ikon: '🌾', tr: 'Bolluk', en: 'Plenty' },
  durgunluk: { ikon: '🍂', tr: 'Durgunluk', en: 'Slump' },
  kitlik: { ikon: '🥀', tr: 'Kıtlık', en: 'Famine' },
};

/** Meslek başına dört tuş: konum sabit (İşletme/Yatırım üstte, Çalışan/Çevre altta), isimler mesleğe özgü. */
function tuslar(meslek: string): TusTanimi[] {
  switch (meslek) {
    case 'Din Adamı':
      return [
        { id: 'isletme', ikon: '⛪', ad: { tr: 'Cemaat', en: 'Parish' } },
        { id: 'yatirim', ikon: '🏗️', ad: { tr: 'Yatırım', en: 'Invest' } },
        { id: 'calisan', ikon: '👥', ad: { tr: 'Hizmetliler', en: 'Staff' } },
        { id: 'cevre', ikon: '🗡️', ad: { tr: 'Çevre', en: 'Rivals' } },
      ];
    case 'Zanaatkâr':
      return [
        { id: 'isletme', ikon: '🔨', ad: { tr: 'Atölye', en: 'Workshop' } },
        { id: 'yatirim', ikon: '🏗️', ad: { tr: 'Yatırım', en: 'Invest' } },
        { id: 'calisan', ikon: '👥', ad: { tr: 'Çıraklar', en: 'Staff' } },
        { id: 'cevre', ikon: '🗡️', ad: { tr: 'Çevre', en: 'Rivals' } },
      ];
    case 'Asker':
      return [
        { id: 'isletme', ikon: '🛡️', ad: { tr: 'Ordu', en: 'Army' } },
        { id: 'yatirim', ikon: '🏯', ad: { tr: 'Yatırım', en: 'Invest' } },
        { id: 'calisan', ikon: '🎖️', ad: { tr: 'Subaylar', en: 'Officers' } },
        { id: 'cevre', ikon: '🗡️', ad: { tr: 'Çevre', en: 'Rivals' } },
      ];
    default:
      return [
        { id: 'isletme', ikon: '🏪', ad: { tr: 'Dükkân', en: 'Shop' } },
        { id: 'yatirim', ikon: '🏗️', ad: { tr: 'Yatırım', en: 'Invest' } },
        { id: 'calisan', ikon: '👥', ad: { tr: 'Çalışan', en: 'Staff' } },
        { id: 'cevre', ikon: '🗡️', ad: { tr: 'Çevre', en: 'Rivals' } },
      ];
  }
}

/**
 * Telefon ana ekranı ("ilerle" zaman modeli): olay yokken görünür. Üstte üç cam panel
 * (müşteri, yıllık kâr, dönem) + pazar payı, altta 2×2 meslek tuşu ve bordo İLERLE düğmesi.
 */
export function AnaEkranMobil({ karakter, isletme, finans, yukleniyor, onTus, onMusteriTikla, onGelirTikla, onIlerle, yilNotu, onNotKapat, sayfaAcik = null, kompakt = false }: AnaEkranProps) {
  const { dil } = useDil();
  const [donemAcik, setDonemAcik] = useState(false);
  const [rakipAcik, setRakipAcik] = useState(false);
  const [savasAcik, setSavasAcik] = useState(false);
  const tr = dil !== 'en';
  const dokum = isletme?.sonDokum ?? null;
  const birim = karakter.para_birimi;

  // Müşteri paneli: işletmeli meslekte müşteri/inanan, Asker'de ordu mevcudu.
  const musteriDeger = isletme ? isletme.musteri : karakter.ordu_mevcudu;
  const musteriEtiket = isletme
    ? karakter.meslek === 'Din Adamı'
      ? tr ? 'İnanan' : 'Flock'
      : karakter.meslek === 'Asker'
        ? tr ? 'Er' : 'Men'
        : tr ? 'Müşteri' : 'Customers'
    : tr ? 'Ordu' : 'Army';
  const degisim = dokum?.musteriDegisim ?? null;

  // "Kazanç": sunucudaki tek kaynak (finans.kazanc) — her şey dahil (maaş, kredi, yaşam, kira…) ve ± aralık. Henüz yüklenmediyse eski tahmine düşer.
  const kz = finans?.kazanc ?? null;
  const tumGelir = kz ? kz.gelir : isletme ? (isletme.cemaat ? isletme.cemaat.toplamGelir : isletme.butce.satis) : karakter.maas_yillik;
  const eldeKalan = kz ? kz.net : isletme ? isletme.butce.cebineKalan : (finans?.netYillik ?? 0);
  const tumGider = kz ? kz.gider : Math.max(0, tumGelir - eldeKalan);
  const aralikGenis = kz ? kz.ust - kz.alt : 0;
  const aralikGoster = !!kz && aralikGenis >= Math.max(0.5, 0.06 * Math.abs(kz.net));
  const isaretli = (v: number) => `${v >= 0 ? '+' : '−'}${formatPara(Math.abs(Math.round(v * 10) / 10))}`;

  const donemAnahtar = isletme?.dunya.donem ?? karakter.ulke.donem?.tur ?? null;
  const donem = donemAnahtar ? DONEM_ADLARI[donemAnahtar] : null;
  const donemEtkisi = (finans?.dunyaEtkileri ?? []).find((e) => /:/.test(e.metin))?.metin.split(':').slice(1).join(':').trim();

  const pay = isletme?.pazarPayi ?? null;
  const acikHat = isletme?.hatlar.filter((h) => h.acik).length ?? 0;
  const altMetinler: Record<AnaTusId, string> = {
    isletme: isletme?.birlik
      ? tr ? `${isletme.birlik.er} er · güç ${isletme.birlik.guc.toplam}` : `${isletme.birlik.er} men · str ${isletme.birlik.guc.toplam}`
      : isletme?.cemaat
      ? tr ? 'politika, öğreti' : 'policy, doctrine'
      : isletme
        ? tr ? `${acikHat} hat açık` : `${acikHat} lines open`
        : tr ? `${karakter.ordu_mevcudu} er` : `${karakter.ordu_mevcudu} men`,
    yatirim: isletme?.birlik ? (tr ? 'teçhizat, birlik, kredi' : 'gear, units, loans') : tr ? 'bina, kredi' : 'upgrades, loans',
    calisan: isletme ? `${isletme.calisanlar.length}/${isletme.calisanTavani}` : `${karakter.ekip.length}`,
    cevre: tr ? 'rakip, şehir' : 'rivals, city',
  };

  return (
    <div className={`ana-ekran${sayfaAcik || kompakt ? ' ana-ekran-kompakt' : ''}`}>
      {!sayfaAcik && !kompakt && (<>
      <div className="ana-tablolar">
        <button type="button" className="ana-cam ana-cam-tikla" onClick={onMusteriTikla} disabled={yukleniyor} title={karakter.meslek === 'Asker' ? (tr ? 'Ordu sayfasını aç' : 'Open army page') : karakter.meslek === 'Din Adamı' ? (tr ? 'Cemaat sayfasını aç' : 'Open parish page') : karakter.meslek === 'Zanaatkâr' ? (tr ? 'Atölye sayfasını aç' : 'Open workshop page') : (tr ? 'Dükkân sayfasını aç' : 'Open shop page')}>
          <span className="ana-etiket">{musteriEtiket}</span>
          <strong className="ana-deger">{formatMusteri(dil === 'en' ? 'en' : 'tr', musteriDeger)}</strong>
          <span className="ana-alt">
            {degisim !== null ? (
              <>
                <b className={degisim >= 0 ? 'ana-iyi' : 'ana-kotu'}>
                  {degisim >= 0 ? '▲' : '▼'} {formatMusteri(dil === 'en' ? 'en' : 'tr', Math.abs(degisim))}
                </b>{' '}
                {tr ? 'geçen yıl' : 'last year'}
              </>
            ) : (
              <span>{tr ? 'ilk yıl' : 'first year'}</span>
            )}
          </span>
        </button>
        <button type="button" className="ana-cam ana-cam-tikla" onClick={onGelirTikla} disabled={yukleniyor} title={tr ? 'Bütçeyi aç' : 'Open budget'}>
          <span className="ana-etiket">{tr ? 'Kazanç' : 'Earnings'}</span>
          <strong className={`ana-deger ${eldeKalan >= 0 ? 'ana-iyi' : 'ana-kotu'}`}>
            {eldeKalan >= 0 ? '+' : '−'}
            {formatPara(Math.abs(Math.round(eldeKalan * 10) / 10))} <span className="ana-birim">{birim}</span>
          </strong>
          <span className="ana-alt">
            {tr ? 'Gelir' : 'Income'}: <b className={Math.round(tumGelir) > 0 ? 'ana-iyi' : ''}>{formatPara(Math.round(tumGelir))}</b>
          </span>
          <span className="ana-alt">
            {tr ? 'Gider' : 'Costs'}: <b className={Math.round(tumGider) > 0 ? 'ana-kotu' : ''}>{formatPara(Math.round(tumGider))}</b>
          </span>
          {aralikGoster && kz && (
            <span className="ana-alt" title={tr ? 'Yıllık rastgelelik payı (talep, bağış, görev)' : 'Yearly variance (demand, donations, duty)'}>
              ≈ {isaretli(kz.alt)} … {isaretli(kz.ust)}
            </span>
          )}
        </button>
        <button type="button" className="ana-cam ana-cam-tikla" onClick={() => setDonemAcik(true)} title={tr ? 'Dönemin etkileri' : 'Era effects'}>
          <span className="ana-etiket">{tr ? 'Dönem' : 'Era'}</span>
          <strong className="ana-deger ana-deger-kucuk">
            {donem ? `${donem.ikon} ${tr ? donem.tr : donem.en}` : '—'}
          </strong>
          <span className="ana-alt ana-alt-kisa" title={donemEtkisi}>
            {donemEtkisi ?? (isletme?.dunya.savas ? (tr ? 'savaş sürüyor' : 'war') : isletme?.dunya.veba ? (tr ? 'salgın' : 'plague') : '')}
          </span>
        </button>
      </div>

      {isletme?.birlik ? (
        <button type="button" className="ana-cam ana-pay ana-cam-tikla" onClick={() => setRakipAcik(true)} title={tr ? 'Rakip komutanların gücünü gör' : 'See rival commanders\' strength'}>
          <span className="ana-etiket">{tr ? 'Askerî Güç' : 'Military Strength'}</span>
          <b>{isletme.birlik.guc.toplam}</b>
          <span className="ana-alt">
            ⚔️ {isletme.birlik.guc.saldiri} · 🛡️ {isletme.birlik.guc.savunma}
          </span>
        </button>
      ) : pay !== null && (
        <div className="ana-cam ana-pay">
          <span className="ana-etiket">{karakter.meslek === 'Din Adamı' ? (tr ? 'Cemaat Payı' : 'Flock Share') : tr ? 'Pazar Payı' : 'Market Share'}</span>
          <div className="ana-cubuk" role="progressbar" aria-valuenow={pay} aria-valuemin={0} aria-valuemax={100}>
            <i style={{ width: `${Math.min(100, Math.max(0, pay))}%` }} />
          </div>
          <b>%{Math.round(pay)}</b>
        </div>
      )}

      {isletme?.birlik?.savas.aktif && isletme.birlik.savas.plan && (
        <button type="button" className="ana-cam ana-savas-serit ana-cam-tikla" onClick={() => setSavasAcik(true)} title={tr ? 'Savaş ayrıntıları' : 'War details'}>
          <b>⚔️ {tr ? 'Savaş' : 'War'} {isletme.birlik.savas.plan.yil}/{isletme.birlik.savas.plan.toplamYil}</b>
          {isletme.birlik.emir && (
            <span>
              {isletme.birlik.emir.simge} {isletme.birlik.emir.ad[dil === 'en' ? 'en' : 'tr']}
            </span>
          )}
          {isletme.birlik.savas.plan.ikmal && (
            <span>
              🍞 {isletme.birlik.savas.plan.ikmal.ad[dil === 'en' ? 'en' : 'tr']}
            </span>
          )}
          {isletme.birlik.savas.araziAd && <span>🏞️ {isletme.birlik.savas.araziAd[dil === 'en' ? 'en' : 'tr']}</span>}
          <span>
            🎯 {isletme.birlik.savas.kiyas.dusman.guc[0]}–{isletme.birlik.savas.kiyas.dusman.guc[1]}
          </span>
        </button>
      )}

      <div className="ana-bosluk">
        {yilNotu && (
          <div className="ana-cam ana-not" role="status">
            <span className="ana-not-metin">{yilNotu}</span>
            <button type="button" className="ana-not-kapat" onClick={onNotKapat} aria-label={tr ? 'Kapat' : 'Close'}>
              ✕
            </button>
          </div>
        )}
      </div>

      </>)}
      <div className="ana-tuslar">
        {tuslar(karakter.meslek).map((t) => (
          <button key={t.id} type="button" className={`ana-tus${sayfaAcik === t.id ? ' ana-tus-aktif' : ''}`} aria-pressed={sayfaAcik === t.id} disabled={yukleniyor} onClick={() => onTus(t.id)}>
            <span className="ana-tus-ikon" aria-hidden="true">
              {t.ikon}
            </span>
            <span className="ana-tus-metin">
              <b>{tr ? t.ad.tr : t.ad.en}</b>
              <small>{altMetinler[t.id]}</small>
            </span>
          </button>
        ))}
      </div>
      <button type="button" className="ana-ilerle" disabled={yukleniyor} onClick={onIlerle}>
        <b>{tr ? 'İLERLE' : 'ADVANCE'}</b>
        <small>▸ {tr ? '1 yıl' : '1 year'}</small>
      </button>

      {savasAcik && isletme?.birlik?.savas.plan && (() => {
        const sv = isletme.birlik!.savas;
        const p = sv.plan!;
        const k = sv.kiyas;
        const L = dil === 'en' ? 'en' : 'tr';
        const aralik = (a: [number, number]) => `${a[0]}–${a[1]}`;
        return (
          <div className="kariyer-sonuc-katman" onClick={() => setSavasAcik(false)}>
            <div className="kariyer-sonuc-modal ana-donem-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <h3>⚔️ {tr ? 'Savaş' : 'War'} {p.yil}/{p.toplamYil}</h3>
              <ul className="ana-donem-liste">
                {p.seferberlik && (
                  <li>
                    <b>🎖️ {tr ? 'Seferberlik' : 'Mobilisation'}: {p.seferberlik.ad[L]}</b>
                    <small> — {p.seferberlik.aciklama[L]}</small>
                  </li>
                )}
                {isletme.birlik!.emir && (
                  <li>
                    <b>{isletme.birlik!.emir.simge} {tr ? 'Komutan emri' : "Commander's order"}: {isletme.birlik!.emir.ad[L]}</b>
                    <small> — {isletme.birlik!.emir.aciklama[L]}</small>
                  </li>
                )}
                {p.ikmal && (
                  <li>
                    <b>🍞 {tr ? 'İkmal' : 'Supply'}: {p.ikmal.ad[L]}</b>
                    <small> — {p.ikmal.aciklama[L]}</small>
                  </li>
                )}
                {sv.araziAd && (
                  <li>
                    <b>🏞️ {tr ? 'Arazi' : 'Terrain'}: {sv.araziAd[L]}</b>
                  </li>
                )}
                <li>
                  <b>🎯 {tr ? 'Düşmanın tahmini gücü' : 'Estimated enemy strength'}: {aralik(k.dusman.guc)}</b>
                  <ul>
                    <li>
                      ⚔️ {tr ? 'Saldırıdaysan' : 'If you attack'}: <span className="s-durum">{k.oyuncu.saldiri}</span> ↔ 🛡️ {aralik(k.dusman.savunma)}
                    </li>
                    <li>
                      🛡️ {tr ? 'Savunmadaysan' : 'If you defend'}: <span className="s-durum">{k.oyuncu.savunma}</span> ↔ ⚔️ {aralik(k.dusman.saldiri)}
                    </li>
                  </ul>
                </li>
                {k.son && (
                  <li>
                    <b>📜 {tr ? 'Son karar savaşı' : 'Last decisive battle'} ({k.son.yil})</b>
                    <small>
                      {' '}
                      {k.son.inisiyatif === 'saldiri' ? '⚔️' : '🛡️'} {k.son.oyuncuGuc} ({k.son.oyuncuZar >= 0 ? '+' : ''}{k.son.oyuncuZar}%) ↔ {k.son.dusmanGuc} ({k.son.dusmanZar >= 0 ? '+' : ''}{k.son.dusmanZar}%) →{' '}
                    </small>
                    <b className={k.son.genelZafer ? 's-arti' : 's-eksi'}>{k.son.genelZafer ? (tr ? 'zafer' : 'victory') : tr ? 'yenilgi' : 'defeat'}</b>
                  </li>
                )}
              </ul>
              <button type="button" onClick={() => setSavasAcik(false)}>
                {tr ? 'Tamam' : 'OK'}
              </button>
            </div>
          </div>
        );
      })()}

      {rakipAcik && isletme?.birlik && (
        <div className="kariyer-sonuc-katman" onClick={() => setRakipAcik(false)}>
          <div className="kariyer-sonuc-modal ana-donem-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>⚔️ {tr ? 'Askerî Güç' : 'Military Strength'}</h3>
            <ul className="ana-donem-liste">
              <li>
                <b>
                  {tr ? 'Sen' : 'You'}: <span className="s-durum">{isletme.birlik.guc.toplam}</span>
                </b>
                <small> (⚔️ {isletme.birlik.guc.saldiri} · 🛡️ {isletme.birlik.guc.savunma})</small>
              </li>
              {isletme.birlik.rakipler.length === 0 ? (
                <li>{tr ? 'Şu an tanınan rakip komutan yok.' : 'No known rival commanders right now.'}</li>
              ) : (
                [...isletme.birlik.rakipler]
                  .sort((a, b) => b.guc - a.guc)
                  .map((r) => (
                    <li key={r.ad}>
                      <b>{r.ad}</b>: <span className={r.guc > isletme.birlik!.guc.toplam ? 's-eksi' : 's-arti'}>{r.guc}</span>
                      <small> · {tr ? 'husumet' : 'enmity'} {r.husumet}</small>
                    </li>
                  ))
              )}
            </ul>
            <button type="button" onClick={() => setRakipAcik(false)}>
              {tr ? 'Tamam' : 'OK'}
            </button>
          </div>
        </div>
      )}

      {donemAcik && (
        <div className="kariyer-sonuc-katman" onClick={() => setDonemAcik(false)}>
          <div className="kariyer-sonuc-modal ana-donem-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>
              {donem ? `${donem.ikon} ${tr ? donem.tr : donem.en}` : tr ? 'Dönem' : 'Era'}
            </h3>
            <p className="ana-donem-ust">{tr ? 'Şu an seni ve işini etkileyen dünya durumu:' : 'What the world is doing to you and your business right now:'}</p>
            {(finans?.dunyaEtkileri ?? []).length === 0 ? (
              <p>{tr ? 'Şu an belirgin bir etki yok.' : 'No notable effects right now.'}</p>
            ) : (
              <ul className="ana-donem-liste">
                {(finans?.dunyaEtkileri ?? []).map((e, i) => {
                  const [baslik, ...kalan] = e.metin.split(':');
                  const etkiler = (kalan.length ? kalan.join(':') : '').split('·').map((x) => x.trim()).filter(Boolean);
                  return (
                    <li key={i}>
                      <b>
                        {e.ikon} {kalan.length ? baslik.trim() : e.metin}
                      </b>
                      {etkiler.length > 0 && (
                        <ul>
                          {etkiler.map((x, j) => (
                            <li key={j}>{x}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            <button type="button" onClick={() => setDonemAcik(false)}>
              {tr ? 'Tamam' : 'OK'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
