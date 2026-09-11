import { useEffect, useState } from 'react';
import type { EkipUyesi, Rakip, YonetimDurumu, YonetimHat } from '../types';
import { useDil } from '../DilContext';
import { formatPara } from '../format';
import { bic } from '../i18n';

interface KariyerEkraniProps {
  meslek: string;
  rutbe: string;
  rutbeSeviye: number;
  amirAdi: string | null;
  amirRutbe: string | null;
  ekip: EkipUyesi[];
  rakipler: Rakip[];
  orduMevcudu: number;
  orduTechizatSeviyesi: number;
  ticaretSermaye: number;
  nufuz: number;
  hapiste: boolean;
  hapisCezaKalan?: number;
  vebaHastasi?: boolean;
  vebaOlumRiski?: number;
  paraBirimi: string;
  yukleniyor: boolean;
  /** Son işlem/hata metni — ekrana açılır sonuç penceresinde gösterilir. */
  islemMesaji: string | null;
  yonetimDurum: YonetimDurumu | null;
  onEtkilesim: (etkilesimId: string, kademe?: number) => void;
  onIstek: (istekId: string, yalan: boolean) => void;
  onTalep: (karar: 'kabul' | 'ret' | 'yalan') => void;
  onEkipCikar: (ekipId: string) => void;
  onGeriDon: () => void;
}

/** Yönetim etkileşimleri (bağış / yağcılık / hizmet) — iki dilli, bileşene gömülü. */
const ETKILESIM_ADLARI: Record<string, { tr: string; en: string; ipTr: string; ipEn: string }> = {
  bagis: {
    tr: '💰 Bağış',
    en: '💰 Donation',
    ipTr: 'Tutarı sen seç. Büyük bağış ilişkiyi daha çok yükseltir.',
    ipEn: 'You pick the amount. A bigger gift raises the relationship more.',
  },
  yalan: {
    tr: '🗣️ Yağ çek / kandır',
    en: '🗣️ Flatter / deceive',
    ipTr: 'Bedava ama ahlak ve moral düşer; yakalanırsan ilişki + şöhret çöker.',
    ipEn: 'Free, but morality and mood drop; if caught, relationship + fame crash.',
  },
  hizmet: {
    tr: '🤝 Hizmet et',
    en: '🤝 Do a service',
    ipTr: 'Vaktini ver; ilişki + kariyer puanı, ufak moral bedeli.',
    ipEn: 'Give your time; relationship + career points, small mood cost.',
  },
};

/** İlişki yüksekken açılan istekler (iyilikler) — iki dilli, bileşene gömülü. */
const ISTEK_ADLARI: Record<string, { tr: string; en: string; ipTr: string; ipEn: string }> = {
  vergi_kayirma: {
    tr: 'Vergide kayırılma',
    en: 'Tax favoritism',
    ipTr: 'Yönetici işine göz yumar — kalıcı maaş artışı.',
    ipEn: 'The ruler looks the other way — a permanent salary bump.',
  },
  sicil_temizligi: {
    tr: 'Sicil temizliği',
    en: 'Record wiped',
    ipTr: 'Saraydan bir söz aranma seviyeni ciddi düşürür.',
    ipEn: 'A word from the palace drops your wanted level sharply.',
  },
  terfi_destegi: {
    tr: 'Terfi desteği',
    en: 'Promotion backing',
    ipTr: 'Kariyer puanına büyük sıçrama.',
    ipEn: 'A big jump in career points.',
  },
  rakibe_darbe: {
    tr: 'Rakibe darbe',
    en: 'Strike a rival',
    ipTr: 'En güçlü rakibinin gücü resmi elle kırılır.',
    ipEn: "Your strongest rival's power is broken by official hands.",
  },
  sermaye_destegi: {
    tr: 'Sermaye / teçhizat desteği',
    en: 'Capital / equipment support',
    ipTr: 'Mesleğine göre ordu teçhizatı / ticaret sermayesi / nüfuz artar.',
    ipEn: 'Boosts army gear / trade capital / influence per your profession.',
  },
  zam: {
    tr: 'Zam',
    en: 'A raise',
    ipTr: 'Patron maaşını kalıcı olarak yükseltir.',
    ipEn: 'The patron permanently raises your salary.',
  },
  kredi_kefaleti: {
    tr: 'Kredi kefaleti',
    en: 'Loan guarantee',
    ipTr: 'Aktif kredinin gecikmiş taksitleri silinir, faiz düşer.',
    ipEn: 'Missed instalments on your active loan cleared, interest lowered.',
  },
  is_baglantisi: {
    tr: 'İş bağlantısı',
    en: 'A business connection',
    ipTr: 'Tek seferlik nakit + kariyer puanı.',
    ipEn: 'One-off cash + career points.',
  },
};

function iliskiKademe(v: number, en: boolean): string {
  if (v >= 80) return en ? 'favored' : 'gözde';
  if (v >= 60) return en ? 'trusted' : 'güvenilir';
  if (v >= 40) return en ? 'acquainted' : 'tanıdık';
  if (v >= 20) return en ? 'distant' : 'mesafeli';
  return en ? 'hostile' : 'düşman';
}

/** Tek bir yönetim hattı kartı (Yönetici ya da Patron). */
function HatKarti({
  hat,
  durum,
  yukleniyor,
  onEtkilesim,
  onIstek,
}: {
  hat: YonetimHat;
  durum: YonetimDurumu;
  yukleniyor: boolean;
  onEtkilesim: (id: string, kademe?: number) => void;
  onIstek: (id: string, yalan: boolean) => void;
}) {
  const { dil } = useDil();
  const en = dil === 'en';
  const [istekAcik, setIstekAcik] = useState(false);

  const kisi = hat === 'yonetici' ? durum.yonetici : durum.patron;
  const etkilesimler = durum.etkilesimler.filter((e) => e.hat === hat);
  const kilitli = (anahtar: string) => {
    const y = durum.kilitler[anahtar];
    return typeof y === 'number' && y > durum.guncelYil ? y - durum.guncelYil : 0;
  };
  const kademe = iliskiKademe(kisi.iliski, en);
  const yil = (n: number) => (en ? `~${n} yr` : `~${n} yıl`);

  return (
    <div className="kariyer-hat-karti">
      <div className="kariyer-hat-baslik">
        <span className="kariyer-hat-ikon" aria-hidden="true">
          {hat === 'yonetici' ? '👑' : '⚜️'}
        </span>
        <div className="kariyer-hat-kimlik">
          <strong>{kisi.ad}</strong>
          <span>{kisi.unvan}</span>
        </div>
        <span className="kariyer-hat-kademe" data-kademe={kademe}>
          {kademe}
        </span>
      </div>

      <div
        className="kariyer-iliski-bar"
        role="progressbar"
        aria-valuenow={kisi.iliski}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="kariyer-iliski-bar-dolgu" data-kademe={kademe} style={{ width: `${kisi.iliski}%` }} />
        <span className="kariyer-iliski-deger">{kisi.iliski}/100</span>
      </div>

      {/* Bağış: tutarı oyuncu seçer */}
      <div className="kariyer-bagis-satir">
        <span className="kariyer-bagis-etiket" title={en ? ETKILESIM_ADLARI.bagis.ipEn : ETKILESIM_ADLARI.bagis.ipTr}>
          {en ? ETKILESIM_ADLARI.bagis.en : ETKILESIM_ADLARI.bagis.tr}
          {kilitli(`${hat}:bagis`) > 0 && ` · ${yil(kilitli(`${hat}:bagis`))}`}
        </span>
        <div className="kariyer-bagis-kademeler">
          {kisi.bagisKademeleri.map((tutar) => (
            <button
              key={tutar}
              className="kariyer-bagis-cip"
              disabled={yukleniyor || kilitli(`${hat}:bagis`) > 0 || tutar > durum.para}
              onClick={() => onEtkilesim(`${hat}:bagis`, tutar)}
            >
              {formatPara(tutar)} {durum.paraBirimi}
            </button>
          ))}
        </div>
      </div>

      {/* Diğer etkileşimler (yalan / hizmet) */}
      <div className="kariyer-etkilesim-izgara">
        {etkilesimler
          .filter((e) => e.id.split(':')[1] !== 'bagis')
          .map((e) => {
            const taban = e.id.split(':')[1];
            const ad = ETKILESIM_ADLARI[taban];
            const kalan = kilitli(e.id);
            return (
              <button
                key={e.id}
                className="kariyer-etkilesim-buton"
                disabled={yukleniyor || kalan > 0}
                title={en ? ad?.ipEn : ad?.ipTr}
                onClick={() => onEtkilesim(e.id)}
              >
                <span>{en ? ad?.en : ad?.tr}</span>
                {kalan > 0 && <span className="kariyer-etkilesim-alt">{yil(kalan)}</span>}
              </button>
            );
          })}
      </div>

      <button className="kariyer-istek-ac" onClick={() => setIstekAcik((v) => !v)}>
        {istekAcik ? '▾' : '▸'} {en ? 'Favors' : 'İstekler'}
      </button>

      {istekAcik && (
        <ul className="kariyer-istek-listesi">
          {durum.istekler
            .filter((i) => i.hat === hat)
            .map((i) => {
              const ad = ISTEK_ADLARI[i.id];
              const kalan = kilitli(`${hat}:istek:${i.id}`);
              return (
                <li key={i.id} className={`kariyer-istek-satir${i.acik ? '' : ' kariyer-istek-kilit'}`}>
                  <div className="kariyer-istek-ust">
                    <strong>{en ? ad?.en : ad?.tr}</strong>
                    {!i.acik && kalan === 0 && (
                      <span className="kariyer-istek-rozet">🔒 min %{i.minIliski}</span>
                    )}
                    {kalan > 0 && <span className="kariyer-istek-rozet">⏳ {yil(kalan)}</span>}
                  </div>
                  <p className="kariyer-istek-ip">{en ? ad?.ipEn : ad?.ipTr}</p>
                  {i.acik && kalan === 0 && (
                    <IstekAksiyon istek={i} yukleniyor={yukleniyor} onIstek={onIstek} en={en} />
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

function IstekAksiyon({
  istek,
  yukleniyor,
  onIstek,
  en,
}: {
  istek: YonetimDurumu['istekler'][number];
  yukleniyor: boolean;
  onIstek: (id: string, yalan: boolean) => void;
  en: boolean;
}) {
  const [yalan, setYalan] = useState(false);
  return (
    <div className="kariyer-istek-aksiyon">
      <span className="kariyer-istek-maliyet">
        −{istek.iliskiBedeli} {en ? 'rel.' : 'ilişki'} · ~%{istek.tahminiSans}
        {yalan ? ' +' : ''}
      </span>
      <label className="kariyer-istek-yalan">
        <input type="checkbox" checked={yalan} disabled={yukleniyor} onChange={(e) => setYalan(e.target.checked)} />
        {en ? 'back it with a lie' : 'yalanla destekle'}
      </label>
      <button className="ikincil" disabled={yukleniyor} onClick={() => onIstek(istek.id, yalan)}>
        {en ? 'Ask' : 'İste'}
      </button>
    </div>
  );
}

/**
 * Tam sayfa "Kariyer" ekranı (eski "Görevin"): yönetimle bağlar (Yönetici + Patron
 * ilişki hatları, bağış/yağcılık/hizmet, istekler, dayatılan talep), ekip (Kov),
 * rakipler, amir ve mesleğe özel güç metrikleri. İşlem sonuçları ekrana açılır
 * bir pencerede gösterilir (üstte sabit metin yok). §35.
 */
export function KariyerEkrani({
  meslek,
  rutbe,
  rutbeSeviye,
  amirAdi,
  amirRutbe,
  ekip,
  rakipler,
  orduMevcudu,
  orduTechizatSeviyesi,
  ticaretSermaye,
  nufuz,
  hapiste,
  hapisCezaKalan,
  vebaHastasi,
  vebaOlumRiski,
  paraBirimi,
  yukleniyor,
  islemMesaji,
  yonetimDurum,
  onEtkilesim,
  onIstek,
  onTalep,
  onEkipCikar,
  onGeriDon,
}: KariyerEkraniProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';

  // İşlem sonucu / hata → ekrana açılır pencere.
  const [modalMesaj, setModalMesaj] = useState<string | null>(null);
  useEffect(() => {
    if (islemMesaji) setModalMesaj(islemMesaji);
  }, [islemMesaji]);

  const gucEtiket = (g: number) =>
    g >= 75 ? (en ? 'dominant' : 'çok güçlü') : g >= 50 ? (en ? 'strong' : 'güçlü') : g >= 25 ? (en ? 'middling' : 'orta') : en ? 'weak' : 'zayıf';
  const husumetEtiket = (h: number) =>
    h >= 70 ? (en ? 'blood feud' : 'kan davası') : h >= 45 ? (en ? 'holds a grudge' : 'kırgın') : en ? 'lukewarm' : 'ılımlı';

  const meslekGucSatirlari: [string, string][] = [];
  if (meslek === 'Asker') {
    meslekGucSatirlari.push([m.iyOrduMevcudu, String(orduMevcudu)]);
    meslekGucSatirlari.push([m.iyTechizat, `%${orduTechizatSeviyesi}`]);
  } else if (meslek === 'Tüccar' && ticaretSermaye > 0) {
    meslekGucSatirlari.push([m.iyTicaretSermayesi, String(ticaretSermaye)]);
  } else if (meslek === 'Din Adamı' && nufuz > 0) {
    meslekGucSatirlari.push([m.iyNufuz, String(Math.round(nufuz))]);
  }

  const talep = yonetimDurum?.talep ?? null;
  const bikkin = (yonetimDurum?.bikkinlik ?? 0) >= 3;

  return (
    <div className="ekran ekran-aile ekran-kariyer">
      <h2>{m.geBaslik}</h2>

      {/* Rütbe/kademe göstergesi — Yatırım ekranından buraya taşındı, küçültülerek. */}
      <div className="kariyer-kademe-satiri">
        <strong>{kt(rutbe)}</strong>
        <span className="kariyer-kademe-noktalar" aria-label={bic(m.iyKademeAria, rutbeSeviye)}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`kademe-nokta${s <= rutbeSeviye ? ' kademe-nokta-dolu' : ''}`} />
          ))}
        </span>
      </div>

      {modalMesaj && (
        <div className="kariyer-sonuc-katman" onClick={() => setModalMesaj(null)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <p>{modalMesaj}</p>
            <button onClick={() => setModalMesaj(null)}>{en ? 'OK' : 'Tamam'}</button>
          </div>
        </div>
      )}

      {hapiste && (
        <div className="aile-koken-karti gorev-hapis-karti">
          <span className="iliski-rozet">
            ⛓️ {m.ksHapiste}
            {typeof hapisCezaKalan === 'number' && hapisCezaKalan > 0
              ? ` · ~${hapisCezaKalan} ${m.geHapisYilKalan}`
              : ''}
          </span>
        </div>
      )}

      {vebaHastasi && (
        <div className="aile-koken-karti gorev-hapis-karti">
          <span className="iliski-rozet">
            🦠 {m.geVebaHastasi}
            {typeof vebaOlumRiski === 'number' && vebaOlumRiski > 0
              ? ` · ${m.geVebaHayatta} ~%${Math.max(0, Math.round(100 - vebaOlumRiski))}`
              : ''}
          </span>
        </div>
      )}

      {/* ===== YÖNETİMLE BAĞLAR ===== */}
      {yonetimDurum && (
        <section className="kariyer-bolum kariyer-yonetim">
          {talep && (
            <div className="kariyer-talep-afisi">
              <strong>📜 {talep.kimAdi}</strong>
              <p>
                {talep.tur === 'bagis'
                  ? `${talep.kalem} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                  : `${talep.kalem} ${en ? 'awaited.' : 'bekliyor.'}`}
              </p>
              <div className="kariyer-talep-butonlar">
                <button disabled={yukleniyor} onClick={() => onTalep('kabul')}>
                  {talep.tur === 'bagis' ? (en ? 'Pay' : 'Öde') : en ? 'Swear it' : 'Kabul et'}
                </button>
                <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('ret')}>
                  {en ? 'Refuse' : 'Reddet'}
                </button>
                <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('yalan')}>
                  {en ? '“I’m broke”' : '“Param yok” de'}
                </button>
              </div>
            </div>
          )}

          {bikkin && (
            <p className="kariyer-bikkin-uyari">
              ⚠️ {en
                ? "You've been pushing too often — interactions may backfire."
                : 'Çok sık üstüne gidiyorsun — etkileşimler ters tepebilir.'}
            </p>
          )}

          <div className="kariyer-hatlar">
            <HatKarti hat="yonetici" durum={yonetimDurum} yukleniyor={yukleniyor} onEtkilesim={onEtkilesim} onIstek={onIstek} />
            <HatKarti hat="patron" durum={yonetimDurum} yukleniyor={yukleniyor} onEtkilesim={onEtkilesim} onIstek={onIstek} />
          </div>
        </section>
      )}

      {/* ===== EKİBİN ===== */}
      <div className="aile-cocuklar-karti">
        <h3>{m.geEkibin}</h3>
        {ekip.length === 0 ? (
          <p className="aile-bos-metin">{m.geEkipYok}</p>
        ) : (
          <ul className="aile-cocuk-listesi">
            {ekip.map((uye) => (
              <li key={uye.id} className="aile-cocuk-satiri gorev-ekip-satiri">
                <span className="aile-cocuk-ad">🧑 {uye.isim}</span>
                <span className="aile-cocuk-detay">
                  {kt(uye.rol)} · {uye.maas} {paraBirimi}/{m.ksYilBasi} · 🎭 {kt(uye.kisilik)} · 🤝 %{uye.sadakat} ·{' '}
                  {m.ksKalite} %{uye.tahminiMin}-{uye.tahminiMax}
                </span>
                <button className="ikincil gorev-ekip-kov" disabled={yukleniyor} onClick={() => onEkipCikar(uye.id)}>
                  {m.ksKov}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ===== RAKİPLERİN ===== */}
      {rakipler.length > 0 && (
        <div className="aile-koken-karti">
          <h3>{en ? 'Your Rivals' : 'Rakiplerin'}</h3>
          <div className="aile-koken-listesi">
            {rakipler.map((r) => (
              <span key={r.ad} className={`iliski-rozet${r.yenildi ? ' rakip-yenildi' : ''}`}>
                ♟️ {r.ad} · {kt(r.meslek)}
                {r.yenildi
                  ? ` · ${en ? 'defeated' : 'saf dışı'}`
                  : ` · ${en ? 'power' : 'güç'}: ${gucEtiket(r.guc)} · ${husumetEtiket(r.husumet)}`}
              </span>
            ))}
          </div>
          <p className="aile-bos-metin">
            {en
              ? 'Break a rival with dark deeds on the Investments screen, or ask the ruler to strike one here.'
              : 'Rakibini Yatırım ekranındaki karanlık işlerle kır, ya da buradan yöneticiden darbe iste.'}
          </p>
        </div>
      )}

      {/* ===== AMİR ===== */}
      <div className="aile-koken-karti">
        <h3>{m.iyAmirin}</h3>
        {amirAdi ? (
          <div className="iliski-rozet iliski-es">
            <span className="iliski-ad">🎖️ {amirAdi}</span>
            {amirRutbe && <span className="iliski-etiket">{kt(amirRutbe)}</span>}
          </div>
        ) : (
          <p className="aile-bos-metin">{m.geAmirYok}</p>
        )}
      </div>

      {meslekGucSatirlari.length > 0 && (
        <div className="aile-koken-karti">
          <h3>{m.geMeslekGucu}</h3>
          <div className="aile-koken-listesi">
            {meslekGucSatirlari.map(([ad, deger]) => (
              <span key={ad} className="iliski-rozet">
                {ad}: {deger}
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="ikincil" onClick={onGeriDon}>
        {m.geriDon}
      </button>
    </div>
  );
}
