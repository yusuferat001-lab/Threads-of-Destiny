import { useEffect, useState } from 'react';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import type { KrediConfig, FinansOzeti, GecmisNoktasi, IsletmeGorunumu, IsletmeKararGirdisi, CemaatKararGirdisi, BirlikKararGirdisi, BirlikTur, EkipUyesi, Rakip, KotuIsKarti, YonetimDurumu, YonetimHat, PazarDurumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara, formatYuzde, formatYuzdeAralik, formatMusteri, kademeSinifi, kitleSozlugu } from '../format';
import { bic } from '../i18n';
import { rutbeIlerlemeHesapla } from '../rutbeIlerleme';
import { IsletmePaneli } from './IsletmePaneli';
import { CemaatPaneli } from './CemaatPaneli';
import { BirlikPaneli } from './BirlikPaneli';
import { ButcePaneli } from './ButcePaneli';
import { KrediKarti } from './KrediKarti';
import { KaranlikIsler } from './KaranlikIsler';
import type { AnaTusId } from './AnaEkranMobil';

type StratejiSayfa = AnaTusId;

/** Strateji sayfası başlıkları: mesleğe özgü adlar (ana ekran tuşlarıyla aynı). */
function SAYFA_BASLIKLARI(meslek: string, sayfa: StratejiSayfa, en: boolean): string {
  const ad: Record<string, Record<string, [string, string]>> = {
    isletme: { 'Din Adamı': ['Cemaatin', 'Your Parish'], 'Zanaatkâr': ['Atölyen', 'Your Workshop'], Asker: ['Ordun', 'Your Army'], '': ['Dükkânın', 'Your Shop'] },
    gorevler: { '': ['Görevler', 'Duties'] },
    techizat: { '': ['Teçhizat & Birlikler', 'Gear & Units'] },
    yatirim: { '': ['Yatırımlar', 'Investments'] },
    calisan: { 'Din Adamı': ['Hizmetliler', 'Clergy & Staff'], 'Zanaatkâr': ['Çıraklar & Ustalar', 'Staff'], Asker: ['Subaylar', 'Officers'], '': ['Çalışanlar', 'Staff'] },
    cevre: { '': ['Çevre', 'Rivals & City'] },
  };
  const tablo = ad[sayfa];
  const [tr, enAd] = tablo[meslek] ?? tablo[''];
  return en ? enAd : tr;
}

interface StratejiSayfasiProps {
  meslek: string;
  rutbe: string;
  rutbeSeviye: number;
  cag: string;
  dinKultur: string | null;
  /** Ülke (Asker rütbe unvanları ülkeye göre değişir). */
  bolge?: string;
  kariyerPuani: number;
  un: number;
  ahlak: number;
  yil: number;
  sonTerfiYili: number;
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
  kotuIsler: KotuIsKarti[];
  sucSeviyesi: number;
  yukleniyor: boolean;
  /** Son işlem/hata metni — ekrana açılır sonuç penceresinde gösterilir. */
  islemMesaji: string | null;
  yonetimDurum: YonetimDurumu | null;
  /** Meslek pazarı (GET /:id/pazar): paylar, müşteriler, maaş etkisi, rütbe şartı. */
  pazarDurum: PazarDurumu | null;
  onEtkilesim: (etkilesimId: string, kademe?: number, varyant?: string) => void;
  onIstek: (istekId: string, rusvet?: boolean) => void;
  onTalep: (karar: 'kabul' | 'ret' | 'yalan' | 'rusvet') => void;
  onEkipCikar: (ekipId: string) => void;
  onKotuIs: (id: string, opts?: { hedefRakipAd?: string; ajanId?: string }) => void;
  /** Bütçen (gelir & gider dökümü) — Evin ekranından buraya taşındı. */
  /** Piyasa dedikoduları (Yatırım ekranından Kariyer'in eylemlerine taşındı). */
  dedikodular?: string[];
  finans?: FinansOzeti | null;
  gecmis?: GecmisNoktasi[];
  /** Meslek işletmesi (GET /:id/isletme); işletmesi olmayan mesleklerde null. */
  isletme?: IsletmeGorunumu | null;
  onIsletmeKarar?: (hatlar: IsletmeKararGirdisi[], cemaat?: CemaatKararGirdisi) => void;
  /** Asker (birlik modu) eylemleri. */
  onBirlikKarar?: (k: BirlikKararGirdisi) => void;
  onBirlikTechizat?: (seviye: 'dusuk' | 'orta' | 'yuksek') => void;
  onBirlikSec?: (turler: BirlikTur[]) => void;
  onBirlikKusatma?: (seviye: number) => void;
  onBirlikTerhis?: (adet: number) => void;
  onBirlikKiralik?: () => void;
  onBirlikIkmal?: (id: string) => void;
  onIsletmeYatirim?: (yatirimId: string) => void;
  onIsletmeYatirimDusur?: (yatirimId: string) => void;
  onIsletmeCalisanAl?: (adayId: string) => void;
  onGeriDon: () => void;
  /** Telefon ana ekranı sayfası: verilirse yalnız o bölüm yeni strateji sayfası kabuğunda çizilir. */
  sayfa: StratejiSayfa;
  /** Ana ekrandaki Müşteri/Gelir panellerinden gelindiyse sayfa açılınca kaydırılıp vurgulanacak bölüm. */
  odak?: 'musteri' | 'butce' | null;
  /** 'panel': PC'de ana oyun ekranının ortasında; 'tam': mobilde tam ekran. */
  modu?: 'panel' | 'tam';
  /** Tefeci/kredi (Yatırım sayfası, tüm meslekler). */
  krediConfig?: KrediConfig | null;
  onKrediAl?: (teklifId: string) => void;
  onKrediPazarlik?: () => void;
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
    tr: '💬 Övgü / İltifat',
    en: '💬 Praise / Compliment',
    ipTr: 'Bedava ama ahlak ve moral biraz düşer; yakalanırsan ilişki + şöhret çöker. Neyi övdüğünü sen seçersin.',
    ipEn: 'Free, but morality and mood dip a little; if caught, relationship + fame crash. You pick what to praise.',
  },
  hizmet: {
    tr: '🤝 Hizmet et',
    en: '🤝 Do a service',
    ipTr: 'Vaktini ver; ilişki + kariyer puanı, ufak moral bedeli.',
    ipEn: 'Give your time; relationship + career points, small mood cost.',
  },
};

/** Övgü / hizmet alt seçenekleri (şehir yöneticisi) — iki dilli, bileşene gömülü. */
const VARYANT_ADLARI: Record<string, { tr: string; en: string; ipTr: string; ipEn: string }> = {
  ovgu_adalet: { tr: '⚖️ Adaletini öv', en: '⚖️ Praise their fairness', ipTr: 'Dengeli: orta risk, ahlak −3.', ipEn: 'Balanced: medium risk, morality −3.' },
  ovgu_comertlik: { tr: '🎁 Cömertliğini öv', en: '🎁 Praise their generosity', ipTr: 'Şöhret +1 ama daha kolay fark edilir, ahlak −4.', ipEn: 'Fame +1 but easier to spot, morality −4.' },
  ovgu_katki: { tr: '🏛️ Şehre katkısını öv', en: '🏛️ Praise what they gave the city', ipTr: 'İçten ve düşük riskli; ilişki biraz az, kariyer +1.', ipEn: 'Sincere and low risk; slightly less relation, career +1.' },
  hizmet_nakliye: { tr: '🐎 Ulaklık / nakliye', en: '🐎 Errands / hauling', ipTr: 'Kariyer puanı +3, moral −3.', ipEn: 'Career points +3, mood −3.' },
  hizmet_danismanlik: { tr: '📜 Danışmanlık', en: '📜 Advice', ipTr: 'Ahlak +1, kariyer +1, moral −3.', ipEn: 'Morality +1, career +1, mood −3.' },
  hizmet_ziyafet: { tr: '🍷 Ziyafet ver', en: '🍷 Host a feast', ipTr: 'Şöhret +1, biraz para gider, moral −3.', ipEn: 'Fame +1, costs some money, mood −3.' },
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
  vergi_indirimi: {
    tr: 'Vergi indirimi',
    en: 'Tax reduction',
    ipTr: 'Vergin 10 yıl boyunca yarıya iner.',
    ipEn: 'Your tax is halved for 10 years.',
  },
  pazar_imtiyazi: {
    tr: 'Pazar yeri imtiyazı',
    en: 'Market-stall privilege',
    ipTr: '5 yıl boyunca talep +%10.',
    ipEn: 'Demand +10% for 5 years.',
  },
  gumruk_muafiyeti: {
    tr: 'Gümrük / transit muafiyeti',
    en: 'Customs / transit exemption',
    ipTr: '5 yıl boyunca alış maliyeti −%8 (diğer indirimlerle çarpımsal).',
    ipEn: 'Purchase costs −8% for 5 years (stacks multiplicatively).',
  },
  tekel_ruhsati: {
    tr: 'Tekel ruhsatı',
    en: 'Monopoly licence',
    ipTr: '5 yıl boyunca en çok sattığın hatta satış fiyatı +%10.',
    ipEn: 'For 5 years, +10% sale price on your best-selling line.',
  },
  hammadde_tahsisi: {
    tr: 'Hammadde tahsisi',
    en: 'Material allocation',
    ipTr: '5 yıl boyunca hammadde gideri −%8 (diğer indirimlerle çarpımsal).',
    ipEn: 'Material costs −8% for 5 years (stacks multiplicatively).',
  },
  atolye_ruhsati: {
    tr: 'Atölye genişleme ruhsatı',
    en: 'Workshop expansion licence',
    ipTr: '5 yıl boyunca üretim +%10.',
    ipEn: 'Output +10% for 5 years.',
  },
  vakif_muafiyeti: {
    tr: 'Vakıf muafiyeti',
    en: 'Foundation exemption',
    ipTr: '5 yıl boyunca mal alış maliyeti −%8 (diğer indirimlerle çarpımsal).',
    ipEn: 'Purchase costs −8% for 5 years (stacks multiplicatively).',
  },
  kutsal_gun_imtiyazi: {
    tr: 'Kutsal gün pazarı',
    en: 'Holy-day market',
    ipTr: '5 yıl boyunca cemaatin alım talebi +%10.',
    ipEn: "The congregation's demand +10% for 5 years.",
  },
  bagis_izni: {
    tr: 'Bağış toplama izni',
    en: 'Fundraising licence',
    ipTr: 'Tek seferlik bağış geliri + cemaate küçük bir artış.',
    ipEn: 'One-off donation income + a small bump in the congregation.',
  },
  resmi_siparis: {
    tr: 'Resmî sipariş',
    en: 'Official order',
    ipTr: 'Tek seferlik para + pazar payına küçük bir artış.',
    ipEn: 'One-off payment + a small bump in market share.',
  },
  rakibe_darbe: {
    tr: 'Rakibe darbe',
    en: 'Strike a rival',
    ipTr: 'Rakibinin müşterileri resmi elle senin payına geçer.',
    ipEn: "Your rival's customers are shifted to you by official hands.",
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
  // Kralla ilişki yeni karakterde ~5'ten başlıyor: "düşman" yanıltıcıydı (kral seni
  // tanımıyor bile). Düşük ilişki hem bu "tanınmamışlık" hem bir kırgınlık için "soğuk".
  return en ? 'cold' : 'soğuk';
}

/**
 * Meslek pazarı kartı: oyuncunun gücü, rakiplerin gücü ve pazar payları tek bir
 * yığılmış çubukta; altında maaşa etkisi, yıllık kariyer puanı katkısı ve
 * (varsa) sıradaki rütbenin pazar şartı.
 */
function PazarKarti({ pazar, meslek, birlik = null }: { pazar: PazarDurumu; meslek: string; birlik?: IsletmeGorunumu['birlik'] }) {
  const { dil } = useDil();
  const en = dil === 'en';
  const kitle = kitleSozlugu(meslek, en ? 'en' : 'tr');
  // Asker: pazar payı yok — yerine askerî güç ve rakip komutanların gücü gösterilir.
  if (birlik) {
    const siralama = [...birlik.rakipler].sort((a, b) => b.guc - a.guc);
    return (
      <div className="aile-koken-karti pazar-karti">
        <h3>⚔️ {en ? 'Military Strength' : 'Askerî Güç'}</h3>
        <ul className="pazar-satirlari">
          <li>
            <span className="pazar-nokta pazar-nokta-sen" /> {en ? 'You' : 'Sen'} — ⚔️ {birlik.guc.saldiri} · 🛡️ {birlik.guc.savunma} · <strong className="s-durum">{birlik.guc.toplam}</strong>
          </li>
          {siralama.map((r) => (
            <li key={r.ad}>
              <span className="pazar-nokta pazar-nokta-rakip" /> {r.ad} · <strong className={r.guc > birlik.guc.toplam ? 's-eksi' : 's-arti'}>{r.guc}</strong>
              <small> · {en ? 'enmity' : 'husumet'} {r.husumet}</small>
            </li>
          ))}
          {siralama.length === 0 && <li>{en ? 'No known rival commanders right now.' : 'Şu an tanınan rakip komutan yok.'}</li>}
        </ul>
        <p className="pazar-etki">
          🎖️ {en ? 'Career XP' : 'Kariyer puanı'} +{pazar.yillikKariyerPuani}/{en ? 'yr' : 'yıl'}
        </p>
        <p className="pazar-ipucu">
          {en
            ? 'Your strength drives rank and career points; rival commanders only raid you when they are strong.'
            : 'Gücün rütbeyi ve kariyer puanını belirler; rakip komutanlar güçlendikçe sana baskın ve sabotaj düzenler.'}
        </p>
      </div>
    );
  }
  const yuzde = (v: number) => formatYuzde(dil, v);
  const isaretli = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + formatYuzde(dil, Math.abs(v));
  return (
    <div className="aile-koken-karti pazar-karti">
      <h3>
        {pazar.simge} {pazar.pazarAdi}
      </h3>
      <div className="pazar-cubuk" role="img" aria-label={`${pazar.pazarAdi}: ${yuzde(pazar.pazarPayi)}`}>
        <span className="pazar-cubuk-sen" style={{ width: `${pazar.pazarPayi}%` }} title={en ? 'You' : 'Sen'} />
        {pazar.rakipler.map((r) => (
          <span key={r.ad} className="pazar-cubuk-rakip" style={{ width: `${r.pay}%` }} title={r.ad} />
        ))}
        <span className="pazar-cubuk-diger" style={{ width: `${pazar.digerPay}%` }} title={en ? 'Others' : 'Diğerleri'} />
      </div>
      <ul className="pazar-satirlari">
        <li>
          <span className="pazar-nokta pazar-nokta-sen" /> {en ? 'You' : 'Sen'}
          {pazar.musteri > 0 ? ` — ${formatMusteri(dil, pazar.musteri)} ${kitle.birim}` : ''} · <strong>{yuzde(pazar.pazarPayi)}</strong>
        </li>
        {pazar.rakipler.map((r) => (
          <li key={r.ad}>
            <span className="pazar-nokta pazar-nokta-rakip" /> {r.ad}
            {pazar.pazarMusteri > 0 ? ` — ${formatMusteri(dil, r.musteri)} ${kitle.birim}` : ''} · {yuzde(r.pay)}
          </li>
        ))}
        <li>
          <span className="pazar-nokta pazar-nokta-diger" /> {en ? 'Small players' : 'Küçük oyuncular'} · {yuzde(pazar.digerPay)}
        </li>
      </ul>
      <p className="pazar-etki">
        {pazar.pazarMusteri > 0 ? null : (
          <>
            💰 {en ? 'Salary effect' : 'Maaşa etkisi'}: <strong>{isaretli(pazar.maasEtkisi)}</strong> ·{' '}
          </>
        )}
        🎖️ {en ? 'Career XP' : 'Kariyer puanı'} +{pazar.yillikKariyerPuani}/{en ? 'yr' : 'yıl'}
      </p>
      {pazar.pazarMusteri > 0 && (
        <p className="pazar-etki">
          🌐 {en ? 'Whole market' : 'Toplam pazar'}: {pazar.pazarMusteri} {en ? 'people' : 'kişi'}
        </p>
      )}
      {pazar.rakipler.length === 0 && pazar.yeniRakipKalanYil !== null && (
        <p className="pazar-etki">
          ♟️ {en
            ? `No rival for now — a newcomer will appear in ~${pazar.yeniRakipKalanYil}y.`
            : `Şimdilik rakibin yok — ~${pazar.yeniRakipKalanYil} yıl içinde yenisi çıkar.`}
        </p>
      )}
      <PiyasaHaberleri pazar={pazar} sayilarGoster={pazar.pazarMusteri > 0 && pazar.musteri > 0} adet={3} meslek={meslek} />
      <p className="pazar-ipucu">
        {meslek === 'Asker'
          ? en
            ? 'Your standing grows with victories, a strong army and good officers; every blow to a rival commander lifts you above them.'
            : 'Payın zaferlerle, güçlü bir orduyla ve iyi subaylarla büyür; rakip komutana indirdiğin her darbe seni onun önüne geçirir.'
          : meslek === 'Din Adamı'
            ? en
              ? 'Your share grows with your good works, generous donations and good clergy; every blow to a rival hands you their believers.'
              : 'Payın hayırlarla, cömert bağışlarla ve iyi hizmetlilerle büyür; rakibe indirdiğin her darbe onun inananını sana geçirir.'
            : en
              ? 'Your share grows with successes in your trade, fair prices and good staff; every blow to a rival hands you their customers.'
              : 'Payın mesleğindeki başarılarla, uygun fiyatla ve iyi çalışanlarla büyür; rakibe indirdiğin her darbe onun müşterisini sana geçirir.'}
      </p>
    </div>
  );
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
  onEtkilesim: (id: string, kademe?: number, varyant?: string) => void;
  onIstek: (id: string, rusvet?: boolean) => void;
}) {
  const { dil } = useDil();
  const en = dil === 'en';
  const [istekAcik, setIstekAcik] = useState(false);
  const [acikVaryant, setAcikVaryant] = useState<string | null>(null);

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
          {hat === 'yonetici' ? (durum.tekOtorite ? '🏛️' : '👑') : '⚜️'}
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
            const varyantli = (e.varyantlar ?? []).length > 0;
            return (
              <div key={e.id} className="kariyer-etkilesim-grup">
                <button
                  className="kariyer-etkilesim-buton"
                  disabled={yukleniyor || kalan > 0}
                  title={en ? ad?.ipEn : ad?.ipTr}
                  onClick={() => (varyantli ? setAcikVaryant(acikVaryant === e.id ? null : e.id) : onEtkilesim(e.id))}
                >
                  <span>{en ? ad?.en : ad?.tr}{varyantli ? (acikVaryant === e.id ? ' ▾' : ' ▸') : ''}</span>
                  {kalan > 0 && <span className="kariyer-etkilesim-alt">{yil(kalan)}</span>}
                </button>
                {varyantli && acikVaryant === e.id && kalan === 0 && (
                  <div className="kariyer-varyantlar">
                    {e.varyantlar.map((v) => (
                      <button
                        key={v}
                        className="kariyer-bagis-cip"
                        disabled={yukleniyor}
                        title={en ? VARYANT_ADLARI[v]?.ipEn : VARYANT_ADLARI[v]?.ipTr}
                        onClick={() => {
                          setAcikVaryant(null);
                          onEtkilesim(e.id, undefined, v);
                        }}
                      >
                        {en ? VARYANT_ADLARI[v]?.en : VARYANT_ADLARI[v]?.tr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
  onIstek: (id: string, rusvet?: boolean) => void;
  en: boolean;
}) {
  return (
    <div className="kariyer-istek-aksiyon">
      <span className="kariyer-istek-maliyet">
        −{istek.iliskiBedeli} {en ? 'rel.' : 'ilişki'} · ~%{istek.tahminiSans}
      </span>
      <button className="ikincil" disabled={yukleniyor} onClick={() => onIstek(istek.id)}>
        {en ? 'Ask' : 'İste'}
      </button>
      {istek.rusvetBonus ? (
        <button
          className="ikincil kariyer-istek-rusvet"
          disabled={yukleniyor}
          title={en ? 'Bribe: raises the chance; costs only morality.' : 'Rüşvet: şansı artırır; tek bedeli ahlakın.'}
          onClick={() => onIstek(istek.id, true)}
        >
          💰 {en ? `Bribe +${istek.rusvetBonus}% chance (morality −5)` : `Rüşvet ver +%${istek.rusvetBonus} şans (ahlak −5)`}
        </button>
      ) : null}
    </div>
  );
}

/**
 * Tam sayfa "Kariyer" ekranı (eski "Görevin"): yönetimle bağlar (Yönetici + Patron
 * ilişki hatları, bağış/yağcılık/hizmet, istekler, dayatılan talep), ekip (Kov),
 * rakibin ve mesleğe özel güç metrikleri. Karanlık İşler ayrı, tam ekranı kaplayan
 * bir açılır pencerede — rakip kartı bu pencerenin en üstünde gösterilir. İşlem
 * sonuçları da ekrana açılır bir pencerede gösterilir (üstte sabit metin yok). §35.
 */
export function StratejiSayfasi({
  meslek,
  rutbe,
  rutbeSeviye,
  cag,
  dinKultur,
  kariyerPuani,
  un,
  ahlak,
  yil,
  sonTerfiYili,
  bolge,
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
  kotuIsler,
  sucSeviyesi,
  yukleniyor,
  islemMesaji,
  yonetimDurum,
  pazarDurum,
  onEtkilesim,
  onIstek,
  onTalep,
  onEkipCikar,
  onKotuIs,
  dedikodular,
  finans,
  gecmis,
  isletme,
  onBirlikKarar,
  onBirlikTechizat,
  onBirlikSec,
  onBirlikKusatma,
  onBirlikTerhis,
  onBirlikKiralik,
  onBirlikIkmal,
  onIsletmeKarar,
  onIsletmeYatirim,
  onIsletmeYatirimDusur,
  onIsletmeCalisanAl,
  onGeriDon,
  sayfa,
  odak,
  modu = 'tam',
  krediConfig,
  onKrediAl,
  onKrediPazarlik,
}: StratejiSayfasiProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';
  // Strateji sayfası modu: hangi bölümler görünür? (sayfa yoksa eski tam ekran: hepsi.)
  // Görevler/Teçhizat yalnız Asker'e özgü; Cemaat/İşletme panelleri bu sayfaları tanımaz.
  const digerBolum: 'hepsi' | 'isletme' | 'yatirim' | 'calisan' = sayfa === 'cevre' ? 'hepsi' : sayfa;
  const gor = (...liste: StratejiSayfa[]) => liste.includes(sayfa);

  // İşlem sonucu / hata → ekrana açılır pencere.
  const [modalMesaj, setModalMesaj] = useState<string | null>(null);
  // Ana ekrandaki Müşteri / Gelir panelinden gelindiyse ilgili bölüme kaydır ve kısaca vurgula.
  useEffect(() => {
    if (!odak) return;
    const t = window.setTimeout(() => {
      const hedef = document.querySelector<HTMLElement>(odak === 'butce' ? '.butce-paneli, .isletme-butce-baslik' : '.isletme-paneli');
      if (!hedef) return;
      hedef.scrollIntoView({ block: 'start', behavior: 'smooth' });
      hedef.classList.add('odak-vurgu');
      window.setTimeout(() => hedef.classList.remove('odak-vurgu'), 2000);
    }, 150);
    return () => window.clearTimeout(t);
  }, [sayfa, odak, isletme?.aktif]);

  useEffect(() => {
    if (islemMesaji) setModalMesaj(islemMesaji);
  }, [islemMesaji]);

  const meslekGucSatirlari: [string, string][] = [];
  // Asker (birlik modu): er sayısı ve teçhizat artık Ordun panelinde (BirlikPaneli) gösterilir.
  void orduMevcudu;
  void orduTechizatSeviyesi;
  // v10: Tüccar sermayesi ve Din Adamı nüfuzu kalktı; yerlerini pazar payı / cemaat paneli aldı.
  void ticaretSermaye;
  void nufuz;
  const dinMi = meslek === 'Din Adamı';

  const talep = yonetimDurum?.talep ?? null;
  const bikkin = (yonetimDurum?.bikkinlik ?? 0) >= 3;
  // Talep bağışsa ve nakit yetmiyorsa "Öde" kapalı (sunucu zaten reddediyor; buton
  // tıklanabilir görünüp hata vermesin).
  const talepParasiYok = !!talep && talep.tur === 'bagis' && talep.tutar > (yonetimDurum?.para ?? Infinity);
  // Kral talebi penceresi ekranı tamamen kilitliyordu; oyuncu "sonra" deyip ekranı
  // kullanabilsin (talebin zaten bir son yılı var, sonra karar verebilir).
  const [hukumdarTalebiErtelendi, setHukumdarTalebiErtelendi] = useState<string | null>(null);
  const hukumdarModalAcik = !!talep && talep.kimden === 'yonetici' && !yonetimDurum?.tekOtorite && hukumdarTalebiErtelendi !== talep.id;

  const ilerleme = rutbeIlerlemeHesapla(
    meslek,
    cag,
    dinKultur,
    rutbeSeviye,
    kariyerPuani,
    un,
    ahlak,
    yil,
    sonTerfiYili,
    bolge
  );
  const statEtiket = (adi: 'un' | 'ahlak' | null) =>
    adi === 'ahlak' ? m.skorKirilimAhlak.replace(/^[^\s]+\s/, '') : m.skorKirilimSohret.replace(/^[^\s]+\s/, '');

  // Rütbe kademesi + ilerleme çubukları + hapis/veba uyarıları (Asker'de Ordu sayfasının ilk hücresine girer).
  const kademeBlok = (
    <>
      {/* Rütbe/kademe göstergesi — Yatırım ekranından buraya taşındı, küçültülerek. */}
      {gor('isletme') && (
      <div className="kariyer-kademe-satiri">
        <strong>{kt(rutbe)}</strong>
        <span className="kariyer-kademe-noktalar" aria-label={bic(m.iyKademeAria, rutbeSeviye)}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`kademe-nokta${s <= rutbeSeviye ? ' kademe-nokta-dolu' : ''}`} />
          ))}
        </span>
      </div>
      )}

      {/* Rütbe/tecrübe ilerleme çubuğu (Faz 6, 2026-09 sonu) — bir sonraki
          kademeye ne kadar kaldığını (kariyer puanı + mesleğe özgü stat) gösterir. */}
      {gor('isletme') && ilerleme.gecerli && (
        <div className="kariyer-ilerleme-blok">
          {ilerleme.enUstMu ? (
            <p className="kariyer-ilerleme-ust">
              {en ? '🏆 You have reached the highest rank.' : '🏆 En üst kademeye ulaştın.'}
            </p>
          ) : (
            <>
              <div className="kariyer-ilerleme-baslik">
                <span>{en ? 'Progress to' : 'Sıradaki kademe:'} <strong>{kt(ilerleme.sonrakiUnvan ?? '')}</strong></span>
              </div>
              <div className="kariyer-ilerleme-cubuk-satiri">
                <span className="kariyer-ilerleme-etiket">{en ? 'Career XP' : 'Kariyer Puanı'}</span>
                <div className="kariyer-ilerleme-cubuk">
                  <div
                    className="kariyer-ilerleme-cubuk-dolu"
                    style={{ width: `${ilerleme.kariyerPuaniYuzde}%` }}
                  />
                </div>
                <span className="kariyer-ilerleme-deger">
                  {ilerleme.kariyerPuaniMevcut}/{ilerleme.kariyerPuaniGerekli}
                  {ilerleme.kariyerPuaniGerekli !== null && ilerleme.kariyerPuaniMevcut >= ilerleme.kariyerPuaniGerekli && ' ✓'}
                </span>
              </div>
              {ilerleme.statAdi && (
                <div className="kariyer-ilerleme-cubuk-satiri">
                  <span className="kariyer-ilerleme-etiket">{statEtiket(ilerleme.statAdi)}</span>
                  <div className="kariyer-ilerleme-cubuk">
                    <div
                      className="kariyer-ilerleme-cubuk-dolu"
                      style={{ width: `${ilerleme.statYuzde}%` }}
                    />
                  </div>
                  <span className="kariyer-ilerleme-deger">
                    {ilerleme.statMevcut}/{ilerleme.statGerekli}
                    {ilerleme.statGerekli !== null && ilerleme.statMevcut >= ilerleme.statGerekli && ' ✓'}
                  </span>
                </div>
              )}
              {pazarDurum?.gucSarti && pazarDurum.gucSarti.seviye === rutbeSeviye + 1 && (
                <div className="kariyer-ilerleme-cubuk-satiri">
                  <span className="kariyer-ilerleme-etiket">{en ? 'Military strength' : 'Askerî Güç'}</span>
                  <div className="kariyer-ilerleme-cubuk">
                    <div
                      className="kariyer-ilerleme-cubuk-dolu"
                      style={{ width: `${Math.min(100, Math.round((pazarDurum.gucSarti.mevcut / pazarDurum.gucSarti.gerekli) * 100))}%` }}
                    />
                  </div>
                  <span className="kariyer-ilerleme-deger">
                    {pazarDurum.gucSarti.mevcut}/{pazarDurum.gucSarti.gerekli}
                    {pazarDurum.gucSarti.karsilaniyor && ' ✓'}
                  </span>
                </div>
              )}
              {pazarDurum?.rutbeSarti && pazarDurum.rutbeSarti.seviye === rutbeSeviye + 1 && (
                <div className="kariyer-ilerleme-cubuk-satiri">
                  <span className="kariyer-ilerleme-etiket">{pazarDurum.pazarAdi}</span>
                  <div className="kariyer-ilerleme-cubuk">
                    <div
                      className="kariyer-ilerleme-cubuk-dolu"
                      style={{
                        width: `${Math.min(100, Math.round((pazarDurum.pazarPayi / pazarDurum.rutbeSarti.gerekliPay) * 100))}%`,
                      }}
                    />
                  </div>
                  <span className="kariyer-ilerleme-deger">
                    {formatYuzde(dil, pazarDurum.pazarPayi)}/{formatYuzde(dil, pazarDurum.rutbeSarti.gerekliPay)}
                    {pazarDurum.rutbeSarti.karsilaniyor && ' ✓'}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {gor('isletme') && hapiste && (
        <div className="aile-koken-karti gorev-hapis-karti">
          <span className="iliski-rozet">
            ⛓️ {m.ksHapiste}
            {typeof hapisCezaKalan === 'number' && hapisCezaKalan > 0
              ? ` · ~${hapisCezaKalan} ${m.geHapisYilKalan}`
              : ''}
          </span>
        </div>
      )}

      {gor('isletme') && vebaHastasi && (
        <div className="aile-koken-karti gorev-hapis-karti">
          <span className="iliski-rozet">
            🦠 {m.geVebaHastasi}
            {typeof vebaOlumRiski === 'number' && vebaOlumRiski > 0
              ? ` · ${m.geVebaHayatta} ~${formatYuzde(dil, Math.max(0, Math.round(100 - vebaOlumRiski)))}`
              : ''}
          </span>
        </div>
      )}

    </>
  );

  return (
    <div className={`ekran strateji-sayfa strateji-sayfa-${sayfa}${modu === 'panel' ? ' strateji-sayfa-panel' : ''}`}>
      {
        <header className="strateji-baslik">
          <div>
            <h1>{SAYFA_BASLIKLARI(meslek, sayfa, en)}</h1>
            <p>
              {kt(rutbe)} · {en ? 'Rank' : 'Rütbe'} {rutbeSeviye}/5
            </p>
          </div>
          <button type="button" className="strateji-kapat" onClick={onGeriDon} aria-label={en ? 'Close' : 'Kapat'}>
            ✕
          </button>
        </header>
      }

      {!(sayfa === 'isletme' && isletme?.aktif) && kademeBlok}

      {/* Hükümdar bağış/sadakat talebi — kralın huzurunda "param yok" yalanına yer
          yok; sadece öde ya da kaç (kaçmak aranmanı ciddi artırır, bkz. onTalep('ret')
          için gameEngine.ts'teki hat==='yonetici' özel dalı). Kral için sade,
          "bekleyen banner" yerine ayrı ve dikkat çeken bir açılır pencere. */}
      {talep && hukumdarModalAcik && (
        <div className="kariyer-sonuc-katman">
          <div className="kariyer-sonuc-modal kariyer-hukumdar-talep-modal">
            <strong>👑 {talep.kimAdi}</strong>
            <p>
              {talep.tur === 'bagis'
                ? `${talep.kalem} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                : `${talep.kalem} ${en ? 'awaited.' : 'bekliyor.'}`}
            </p>
            <p className="kariyer-hukumdar-talep-uyari">
              {en
                ? "Fleeing a king's demand is a crime — your wanted level will rise sharply."
                : 'Hükümdarın talebinden kaçmak suçtur — aranma seviyen ciddi şekilde artar.'}
            </p>
            {talepParasiYok && (
              <p className="kariyer-hukumdar-talep-uyari">
                {en ? "You don't have enough money to pay right now." : 'Şu an ödeyecek kadar paran yok.'}
              </p>
            )}
            <div className="kariyer-talep-butonlar">
              <button disabled={yukleniyor || talepParasiYok} onClick={() => onTalep('kabul')}>
                {talep.tur === 'bagis' ? (en ? 'Pay' : 'Öde') : en ? 'Swear it' : 'Kabul et'}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('ret')}>
                {en ? 'Flee' : 'Kaç'}
              </button>
              <button className="ikincil" disabled={yukleniyor} onClick={() => setHukumdarTalebiErtelendi(talep.id)}>
                {en ? 'Decide later' : 'Sonra karar ver'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PC'de iki sütunlu "saray" düzeni: solda geniş yönetim/ilişki bölümü,
          sağda mesleğe özel güç özeti — strateji oyunlarındaki danışman
          ekranlarına benzer şekilde. Mobilde tek sütuna iner (bkz. medya sorgusu). */}
      <div className="kariyer-govde">
        <div className="kariyer-ana-sutun">
          {/* ===== YÖNETİMLE BAĞLAR ===== */}
          {gor('cevre') && yonetimDurum && (
            <section className="kariyer-bolum kariyer-yonetim">
              {talep && talep.kimden === 'yonetici' && !yonetimDurum.tekOtorite && !hukumdarModalAcik && (
                <div className="kariyer-talep-afisi">
                  <strong>👑 {talep.kimAdi}</strong>
                  <p>
                    {talep.tur === 'bagis'
                      ? `${talep.kalem} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                      : `${talep.kalem} ${en ? 'awaited.' : 'bekliyor.'}`}
                  </p>
                  <div className="kariyer-talep-butonlar">
                    <button disabled={yukleniyor || talepParasiYok} onClick={() => onTalep('kabul')}>
                      {talep.tur === 'bagis' ? (en ? 'Pay' : 'Öde') : en ? 'Swear it' : 'Kabul et'}
                    </button>
                    <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('ret')}>
                      {en ? 'Flee' : 'Kaç'}
                    </button>
                  </div>
                </div>
              )}

              {talep && (talep.kimden === 'patron' || yonetimDurum.tekOtorite) && (
                <div className="kariyer-talep-afisi">
                  <strong>{yonetimDurum.tekOtorite ? '🏛️' : '📜'} {talep.kimAdi}</strong>
                  <p>
                    {talep.tur === 'vergi'
                      ? `${en ? 'Extra tax' : 'Ekstra vergi'} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                      : talep.tur === 'bagis'
                      ? `${talep.kalem} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                      : talep.tur === 'aciklama'
                        ? `${en ? 'Asks you to ' : 'Senden istiyor: '}${talep.kalem}.`
                        : `${talep.kalem} ${en ? 'awaited.' : 'bekliyor.'}`}
                  </p>
                  {dinMi && talep.tur === 'aciklama' && (
                    <p className="kariyer-hukumdar-talep-uyari">
                      {en
                        ? 'Do it: authority +13–15, morality −7–8, your flock −3%. Refuse: authority −18–20, morality +2, fame −3 and your flock +2%.'
                        : 'Yaparsan: otorite +13–15, ahlak −7–8, inanan −%3. Yapmazsan: otorite −18–20, ahlak +2, şöhret −3, inanan +%2.'}
                    </p>
                  )}
                  {talep.tur === 'vergi' ? (
                    <div className="kariyer-talep-butonlar">
                      <button disabled={yukleniyor} onClick={() => onTalep('kabul')}>
                        {en ? 'Pay' : 'Öde'}
                      </button>
                      <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('rusvet')}>
                        {en ? 'Offer a bribe' : 'Rüşvet ver'}
                      </button>
                    </div>
                  ) : (
                  <div className="kariyer-talep-butonlar">
                    <button disabled={yukleniyor || talepParasiYok} onClick={() => onTalep('kabul')}>
                      {dinMi ? (en ? 'Do it' : 'Yap') : talep.tur === 'bagis' ? (en ? 'Pay' : 'Öde') : en ? 'Swear it' : 'Kabul et'}
                    </button>
                    <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('ret')}>
                      {dinMi ? (en ? "Don't" : 'Yapma') : en ? 'Refuse' : 'Reddet'}
                    </button>
                    {!dinMi && (
                      <button className="ikincil" disabled={yukleniyor} onClick={() => onTalep('yalan')}>
                        {en ? '“I’m broke”' : '“Param yok” de'}
                      </button>
                    )}
                  </div>
                  )}
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
                <HatKarti hat={yonetimDurum.tekOtorite ? 'yonetici' : 'patron'} durum={yonetimDurum} yukleniyor={yukleniyor} onEtkilesim={onEtkilesim} onIstek={onIstek} />
              </div>
            </section>
          )}

          {/* ===== İŞLETME (Tüccar dilimi, §45) — çalışanlar da burada yönetilir ===== */}
          {sayfa !== 'cevre' && isletme?.aktif && isletme.birlik && onBirlikKarar && onBirlikTechizat && onBirlikSec && onBirlikKusatma && onBirlikTerhis && onIsletmeYatirim && onIsletmeCalisanAl && (
            <BirlikPaneli
              bolum={sayfa as 'isletme' | 'yatirim' | 'calisan'}
              ustBlok={kademeBlok}
              durum={isletme}
              pazar={pazarDurum}
              yukleniyor={yukleniyor}
              yanKart={onKrediAl && onKrediPazarlik ? <KrediKarti paraBirimi={paraBirimi} krediConfig={krediConfig ?? null} yukleniyor={yukleniyor} onKrediAl={onKrediAl} onKrediPazarlik={onKrediPazarlik} /> : undefined}
              onBirlikKarar={onBirlikKarar}
              onTechizat={onBirlikTechizat}
              onBirlikSec={onBirlikSec}
              onKusatma={onBirlikKusatma}
              onTerhis={onBirlikTerhis}
              onKiralik={onBirlikKiralik}
              onIkmal={onBirlikIkmal}
              onYatirim={onIsletmeYatirim}
              onYatirimDusur={onIsletmeYatirimDusur}
              onCalisanAl={onIsletmeCalisanAl}
              onEkipCikar={onEkipCikar}
            />
          )}
          <div className={sayfa === 'yatirim' && !isletme?.birlik ? 'sayfa-izgara yatirim-izgara' : 'sayfa-sarmal'}>
          {sayfa !== 'cevre' && isletme?.aktif && isletme.cemaat && onIsletmeKarar && onIsletmeYatirim && onIsletmeCalisanAl && (
            <CemaatPaneli
              bolum={digerBolum}
              ustBlok={kademeBlok}
              durum={isletme}
              pazar={pazarDurum}
              yukleniyor={yukleniyor}
              onKarar={onIsletmeKarar}
              onYatirim={onIsletmeYatirim}
              onYatirimDusur={onIsletmeYatirimDusur}
              onCalisanAl={onIsletmeCalisanAl}
              onEkipCikar={onEkipCikar}
            />
          )}
          {sayfa !== 'cevre' && isletme?.aktif && !isletme.cemaat && !isletme.birlik && onIsletmeKarar && onIsletmeYatirim && onIsletmeCalisanAl && (
            <IsletmePaneli
              bolum={digerBolum}
              ustBlok={kademeBlok}
              durum={isletme}
              pazar={pazarDurum}
              yukleniyor={yukleniyor}
              onKarar={onIsletmeKarar}
              onYatirim={onIsletmeYatirim}
              onYatirimDusur={onIsletmeYatirimDusur}
              onCalisanAl={onIsletmeCalisanAl}
              onEkipCikar={onEkipCikar}
            />
          )}


          {sayfa === 'yatirim' && !isletme?.birlik && onKrediAl && onKrediPazarlik && (
            <KrediKarti paraBirimi={paraBirimi} krediConfig={krediConfig ?? null} yukleniyor={yukleniyor} onKrediAl={onKrediAl} onKrediPazarlik={onKrediPazarlik} />
          )}
          </div>

          {/* ===== BÜTÇEN ===== */}
          {gor('isletme') && finans && !isletme?.aktif && <ButcePaneli finans={finans} paraBirimi={paraBirimi} gecmis={gecmis ?? []} isletmeAktif={!!isletme?.aktif} meslek={meslek} />}

          {/* ===== EKİBİN ===== */}
          {gor('calisan') && !isletme?.aktif && (
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
                      {kt(uye.rol)} · {uye.maas} {paraBirimi}/{m.ksYilBasi} · 🎭 {kt(uye.kisilik)} · 🤝{' '}
                      <b className={kademeSinifi(uye.sadakat, [45, 75])}>{formatYuzde(dil, Math.round(uye.sadakat))}</b> · {m.ksKalite}{' '}
                      {formatYuzdeAralik(dil, uye.tahminiMin, uye.tahminiMax)}
                    </span>
                    <button className="ikincil gorev-ekip-kov" disabled={yukleniyor} onClick={() => onEkipCikar(uye.id)}>
                      {m.ksKov}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}

          {/* ===== PİYASA DEDİKODULARI ===== */}
          {gor('cevre') && dedikodular && dedikodular.length > 0 && (
            <div className="aile-cocuklar-karti cevre-dedikodu">
              <h3>{m.iyPiyasaDedikodulari}</h3>
              <div className="dedikodu-panosu dedikodu-panosu-vurgu">
                <ul>
                  {dedikodular.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ===== KARANLIK İŞLER (ayrı bir pencerede açılır) ===== */}
          {sayfa === 'cevre' && (
            <div className="strateji-karanlik">
              <KaranlikIsler
                isler={kotuIsler}
                rakipler={rakipler}
                ekip={ekip}
                paraBirimi={paraBirimi}
                yukleniyor={yukleniyor}
                dinKultur={dinKultur}
                sucSeviyesi={sucSeviyesi}
                meslek={meslek}
                rakipPay={(ad) => pazarDurum?.rakipler.find((x) => x.ad === ad)?.pay ?? 0}
                onKotuIs={onKotuIs}
              />
            </div>
          )}
        </div>

        <aside className="kariyer-yan-sutun">
          {gor('cevre') && pazarDurum?.aktif && <PazarKarti pazar={pazarDurum} meslek={meslek} birlik={isletme?.birlik ?? null} />}
          {gor('isletme') && meslekGucSatirlari.length > 0 && (
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
        </aside>
      </div>

      {/* Sonuç/hata penceresi en sonda ve bir üst katmanda: karanlık işler ya da kral
          talebi penceresi açıkken sonucu onların ARKASINDA göstermesin. */}
      {modalMesaj && (
        <div className="kariyer-sonuc-katman kariyer-sonuc-katman-ust" onClick={() => setModalMesaj(null)}>
          <div className="kariyer-sonuc-modal" role="alertdialog" onClick={(e) => e.stopPropagation()}>
            <p>{modalMesaj}</p>
            <button onClick={() => setModalMesaj(null)}>{en ? 'OK' : 'Tamam'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
