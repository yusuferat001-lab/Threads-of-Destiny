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
        { id: 'yatirim', ikon: '⚒️', ad: { tr: 'Teçhizat', en: 'Gear' } },
        { id: 'calisan', ikon: '📜', ad: { tr: 'Görevler', en: 'Duties' } },
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
export function AnaEkranMobil({ karakter, isletme, finans, yukleniyor, onTus, onMusteriTikla, onGelirTikla, onIlerle, yilNotu, onNotKapat }: AnaEkranProps) {
  const { dil } = useDil();
  const [donemAcik, setDonemAcik] = useState(false);
  const tr = dil !== 'en';
  const dokum = isletme?.sonDokum ?? null;
  const birim = karakter.para_birimi;

  // Müşteri paneli: işletmeli meslekte müşteri/inanan, Asker'de ordu mevcudu.
  const musteriDeger = isletme ? isletme.musteri : karakter.ordu_mevcudu;
  const musteriEtiket = isletme
    ? karakter.meslek === 'Din Adamı'
      ? tr ? 'İnanan' : 'Flock'
      : tr ? 'Müşteri' : 'Customers'
    : tr ? 'Ordu' : 'Army';
  const degisim = dokum?.musteriDegisim ?? null;

  // "Elde kalan" paneli: yıllık tahmini bütçe (işletme) ya da maaş − gider; tüm gelir ve tüm gider altında.
  const tumGelir = isletme ? (isletme.cemaat ? isletme.cemaat.toplamGelir : isletme.butce.satis) : karakter.maas_yillik;
  const eldeKalan = isletme ? isletme.butce.cebineKalan : (finans?.netYillik ?? 0);
  const tumGider = Math.max(0, tumGelir - eldeKalan);

  const donemAnahtar = isletme?.dunya.donem ?? karakter.ulke.donem?.tur ?? null;
  const donem = donemAnahtar ? DONEM_ADLARI[donemAnahtar] : null;
  const donemEtkisi = (finans?.dunyaEtkileri ?? []).find((e) => /:/.test(e.metin))?.metin.split(':').slice(1).join(':').trim();

  const pay = isletme?.pazarPayi ?? null;
  const acikHat = isletme?.hatlar.filter((h) => h.acik).length ?? 0;
  const altMetinler: Record<AnaTusId, string> = {
    isletme: isletme?.cemaat
      ? tr ? 'politika, öğreti' : 'policy, doctrine'
      : isletme
        ? tr ? `${acikHat} hat açık` : `${acikHat} lines open`
        : tr ? `${karakter.ordu_mevcudu} er` : `${karakter.ordu_mevcudu} men`,
    yatirim: tr ? 'bina, kredi' : 'upgrades, loans',
    calisan: isletme ? `${isletme.calisanlar.length}/${isletme.calisanTavani}` : `${karakter.ekip.length}`,
    cevre: tr ? 'rakip, şehir' : 'rivals, city',
  };

  return (
    <div className="ana-ekran">
      <div className="ana-tablolar">
        <button type="button" className="ana-cam ana-cam-tikla" onClick={onMusteriTikla} disabled={yukleniyor} title={tr ? 'Dükkân sayfasını aç' : 'Open shop page'}>
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
          <span className="ana-etiket">{tr ? 'Elde Kalan' : 'Take-Home'}</span>
          <strong className={`ana-deger ${eldeKalan >= 0 ? '' : 'ana-kotu'}`}>
            {eldeKalan >= 0 ? '+' : '−'}
            {formatPara(Math.abs(Math.round(eldeKalan * 10) / 10))} <span className="ana-birim">{birim}</span>
          </strong>
          <span className="ana-alt">
            {tr ? 'Tüm gelir' : 'Total income'}: <b className="ana-iyi">{formatPara(Math.round(tumGelir))}</b>
          </span>
          <span className="ana-alt">
            {tr ? 'Tüm gider' : 'Total costs'}: <b className="ana-kotu">{formatPara(Math.round(tumGider))}</b>
          </span>
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

      {pay !== null && (
        <div className="ana-cam ana-pay">
          <span className="ana-etiket">{karakter.meslek === 'Din Adamı' ? (tr ? 'Cemaat Payı' : 'Flock Share') : tr ? 'Pazar Payı' : 'Market Share'}</span>
          <div className="ana-cubuk" role="progressbar" aria-valuenow={pay} aria-valuemin={0} aria-valuemax={100}>
            <i style={{ width: `${Math.min(100, Math.max(0, pay))}%` }} />
          </div>
          <b>%{Math.round(pay)}</b>
        </div>
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

      <div className="ana-tuslar">
        {tuslar(karakter.meslek).map((t) => (
          <button key={t.id} type="button" className="ana-tus" disabled={yukleniyor} onClick={() => onTus(t.id)}>
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
