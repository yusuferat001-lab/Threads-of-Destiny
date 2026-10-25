import { useEffect, useState } from 'react';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import type { FinansOzeti, GecmisNoktasi, IsletmeGorunumu, IsletmeKararGirdisi, IsletmeStokHedefi, EkipUyesi, Rakip, KotuIsKarti, YonetimDurumu, YonetimHat, PazarDurumu, AjanDurumu } from '../types';
import { useDil } from '../DilContext';
import { formatPara, formatYuzde, formatYuzdeAralik, formatMusteri } from '../format';
import { bic, type Metinler } from '../i18n';
import type { Dil } from '../ayarlar';
import { rutbeIlerlemeHesapla } from '../rutbeIlerleme';
import { IsletmePaneli } from './IsletmePaneli';
import { ButcePaneli } from './ButcePaneli';

interface KariyerEkraniProps {
  meslek: string;
  rutbe: string;
  rutbeSeviye: number;
  cag: string;
  dinKultur: string | null;
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
  onEtkilesim: (etkilesimId: string, kademe?: number) => void;
  onIstek: (istekId: string, rusvet?: boolean) => void;
  onTalep: (karar: 'kabul' | 'ret' | 'yalan') => void;
  onEkipCikar: (ekipId: string) => void;
  onKotuIs: (id: string, opts?: { hedefRakipAd?: string; ajanId?: string }) => void;
  /** Ajan sistemi (§43 Faz 2) — arayüzü meslek ekip rolleriyle birlikte gelecek; şimdilik kullanılmıyor. */
  ajanDurum?: AjanDurumu | null;
  onAjanTut?: (rol: string) => void;
  /** Bütçen (gelir & gider dökümü) — Evin ekranından buraya taşındı. */
  /** Piyasa dedikoduları (Yatırım ekranından Kariyer'in eylemlerine taşındı). */
  dedikodular?: string[];
  finans?: FinansOzeti | null;
  gecmis?: GecmisNoktasi[];
  /** Meslek işletmesi (GET /:id/isletme); işletmesi olmayan mesleklerde null. */
  isletme?: IsletmeGorunumu | null;
  onIsletmeKarar?: (hatlar: IsletmeKararGirdisi[], stokHedefi?: IsletmeStokHedefi) => void;
  onIsletmeYatirim?: (yatirimId: string) => void;
  onIsletmeCalisanAl?: (adayId: string) => void;
  onGeriDon: () => void;
}

/** Karanlık iş adları/açıklamaları — i18n.ts yerine bileşene gömülü (NasilOynanir deseni). */
const KARANLIK_ISLER: Record<string, { tr: { ad: string; aciklama: string }; en: { ad: string; aciklama: string } }> = {
  rakibi_korkut: {
    tr: { ad: '🗡️ Rakibini Korkut', aciklama: 'Rakibinin gücünü biraz kır, biraz da haraç al. Düşük risk.' },
    en: { ad: '🗡️ Intimidate Your Rival', aciklama: 'Cut your rival down a notch and squeeze a little coin. Low risk.' },
  },
  adam_dov: {
    tr: { ad: '👊 Zevkine Adam Döv', aciklama: 'Sırf içini rahatlatmak için birini benzet. Getirisi yok, ahlakın çöker.' },
    en: { ad: '👊 Beat Someone for Sport', aciklama: 'Rough someone up just to blow off steam. No payoff, morality tanks.' },
  },
  birini_soy: {
    tr: { ad: '💰 Birini Soy', aciklama: 'Doğrudan para. Yakalanırsan kodesi boylarsın.' },
    en: { ad: '💰 Rob Someone', aciklama: 'Straight cash. Get caught and you land in a cell.' },
  },
  isyeri_yak: {
    tr: { ad: '🔥 Rakibin İş Yerini Yak', aciklama: 'Rakibe en büyük darbe, en büyük risk: ölüm ve hapis ihtimali var.' },
    en: { ad: "🔥 Burn Down Your Rival's Business", aciklama: 'The biggest blow to a rival, the biggest risk: death and prison are on the table.' },
  },
  kervan_yagmalat: {
    tr: { ad: '🐫 Rakibin Kervanını Yağmalat', aciklama: 'Yolda baskın yaptır; mal senin olsun, rakibin pazarı sarsılsın.' },
    en: { ad: "🐫 Have Your Rival's Caravan Raided", aciklama: 'Ambush it on the road; the goods are yours and your rival’s market reels.' },
  },
  rakibe_iftira: {
    tr: { ad: '📜 Rakibe İftira At', aciklama: 'Rakibin hakkında dedikodu yay; müşterileri sana geçsin. Yakalanırsan itibarın zedelenir.' },
    en: { ad: '📜 Slander Your Rival', aciklama: 'Spread rumours about your rival so customers drift to you. Get caught and your name suffers.' },
  },
  gumruk_rusvet: {
    tr: { ad: '🛃 Gümrüğe Rüşvet', aciklama: 'Gümrükçüye avuç dolusu para; malın sorgusuz geçer, sermayen büyür.' },
    en: { ad: '🛃 Bribe the Customs House', aciklama: 'A fistful of coin to the customs man; your goods pass unasked, your capital grows.' },
  },
  sahte_mucize: {
    tr: { ad: '✨ Sahte Mucize', aciklama: 'Ağlayan ikona, iyileşen kör… Cemaat sana koşar. Yakalanırsan şarlatansın.' },
    en: { ad: '✨ Stage a False Miracle', aciklama: 'A weeping icon, a blind man healed… the faithful flock to you. Get caught and you are a fraud.' },
  },
  afaroz_ettir: {
    tr: { ad: '📜 Rakibi Aforoz Ettir', aciklama: 'Üstlerine rakibini ihbar et; cemaatini elinden al.' },
    en: { ad: '📜 Have Your Rival Excommunicated', aciklama: 'Denounce your rival to the hierarchy and strip away their flock.' },
  },
  vali_santaj: {
    tr: { ad: '🗝️ Valiye Şantaj', aciklama: 'Günah çıkarırken duyduklarını kullan; vali sana borçlansın.' },
    en: { ad: '🗝️ Blackmail the Governor', aciklama: 'Use what you heard in confession; let the governor owe you.' },
  },
  formul_cal: {
    tr: { ad: '🔍 Rakibin Formülünü Çal', aciklama: 'Atölyesine birini sok; sırrı senin olsun, üretimin artsın.' },
    en: { ad: "🔍 Steal Your Rival's Formula", aciklama: 'Slip someone into their workshop; the secret is yours and your output grows.' },
  },
  hammadde_topla: {
    tr: { ad: '🪵 Hammaddeyi Kapat', aciklama: 'Piyasadaki malzemeyi peşin al; rakip boş tezgâhta kalsın, sen kârla sat.' },
    en: { ad: '🪵 Corner the Raw Materials', aciklama: 'Buy up the supply in advance; your rival idles while you sell at a profit.' },
  },
  lonca_manipule: {
    tr: { ad: '⚖️ Lonca Kararını Çarpıt', aciklama: 'Oyları satın al; kararlar senden yana çıksın, ustalar sana yaklaşsın.' },
    en: { ad: '⚖️ Rig the Guild Vote', aciklama: 'Buy the votes; decisions go your way and the masters draw closer to you.' },
  },
  kaos_cikar: {
    tr: { ad: '🌪️ Kaos Çıkar, Koruma Sat', aciklama: 'Sokakları karıştır, sonra düzeni sen getir; vali sana muhtaç kalsın.' },
    en: { ad: '🌪️ Stir Chaos, Sell Protection', aciklama: 'Stir up the streets, then bring the order yourself; leave the governor needing you.' },
  },
  kaza_duello: {
    tr: { ad: '🤺 Kaza Süsü Verilmiş Düello', aciklama: 'Rakip komutanı düelloya çağır, "kaza" olsun. Kazanırsan rakibin biter; kaybedersen ölebilirsin.' },
    en: { ad: '🤺 A Duel Dressed Up as an Accident', aciklama: 'Call the rival commander out and let it be an "accident". Win and your rival is finished; lose and you may die.' },
  },
  kervan_baskini: {
    tr: { ad: '🏴 Kervan Baskını', aciklama: 'Adamlarınla yol kes; ganimet ve silah senin.' },
    en: { ad: '🏴 Caravan Raid', aciklama: 'Hold up the road with your men; the loot and the weapons are yours.' },
  },
};

/** Sünni İslam'da aforoz yerine tekfir fetvası (aynı mekanik, farklı ad). */
const AFAROZ_SUNNI = {
  tr: { ad: '📜 Rakip Hakkında Fetva Çıkart', aciklama: 'Kadıya rakibini şikâyet et; hakkında fetva çıksın, cemaati dağılsın.' },
  en: { ad: '📜 Get a Fatwa Against Your Rival', aciklama: "Denounce your rival to the qadi; let a fatwa scatter their flock." },
};

function karanlikIsMetni(dil: Dil, id: string, dinKultur?: string | null): { ad: string; aciklama: string } {
  const kayit = id === 'afaroz_ettir' && dinKultur === 'Sünni İslam' ? AFAROZ_SUNNI : KARANLIK_ISLER[id];
  if (!kayit) return { ad: id, aciklama: '' };
  return dil === 'en' ? kayit.en : kayit.tr;
}

function sucSeviyesiEtiketi(m: Metinler, seviye: number): string {
  if (seviye < 25) return m.iySicilTemiz;
  if (seviye < 50) return m.iySicilDikkat;
  if (seviye < 75) return m.iySicilCiddi;
  return m.iySicilPesinde;
}

/** Tek bir karanlık iş kartı — rakip hedefleyen işlerde hedef seçimi taşır. */
function KaranlikIsKart({
  is,
  dil,
  m,
  paraBirimi,
  yukleniyor,
  rakipler,
  dinKultur,
  ekip,
  onKotuIs,
}: {
  is: KotuIsKarti;
  dil: Dil;
  m: Metinler;
  paraBirimi: string;
  yukleniyor: boolean;
  rakipler: Rakip[];
  dinKultur: string | null;
  ekip: EkipUyesi[];
  onKotuIs: KariyerEkraniProps['onKotuIs'];
}) {
  const en = dil === 'en';
  const metin = karanlikIsMetni(dil, is.id, dinKultur);
  const aktifRakipler = rakipler.filter((r) => !r.yenildi);
  const rakipHedefli = is.rakipKirmaYuzde > 0 && aktifRakipler.length > 0;
  const [hedef, setHedef] = useState<string>(aktifRakipler[0]?.ad ?? '');
  const bekliyor = is.kalanYil > 0;
  const [calisanId, setCalisanId] = useState<string>('');

  const ozet: string[] = [bic(m.iyKaranlikSans, is.basariSansi)];
  if (is.tahminiKazanc > 0) ozet.push(bic(m.iyKaranlikKazanc, formatPara(is.tahminiKazanc), paraBirimi));
  if (is.maliyet > 0) ozet.push(`${en ? 'cost' : 'bedel'} ${formatPara(is.maliyet)} ${paraBirimi}`);
  if (is.musteriKazanci > 0) ozet.push(en ? `+${is.musteriKazanci} customers` : `+${is.musteriKazanci} müşteri`);
  if (is.rakipKirmaYuzde >= 100) ozet.push(en ? 'finishes your rival' : 'rakibi bitirir');
  else if (is.rakipKirmaYuzde > 0) ozet.push(en ? 'weakens your rival' : 'rakibi zayıflatır');

  return (
    <div className={`yatirim-kart isyatirim-kendi-is-kart${bekliyor ? ' karanlik-bekliyor' : ''}`} title={metin.aciklama}>
      <span className="meslek-simge">{is.simge}</span>
      <strong>{metin.ad.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, '')}</strong>
      <span className="meslek-aciklama">{ozet.join(' · ')}</span>
      <span className="meslek-aciklama tam-yardimci-metin">{metin.aciklama}</span>

      {rakipHedefli && !bekliyor && (
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
        </div>
      )}

      <button
        className="ikincil karanlik-cevir-buton"
        disabled={yukleniyor || bekliyor || is.sadeceAjan}
        onClick={() => onKotuIs(is.id, { hedefRakipAd: rakipHedefli ? hedef : undefined })}
      >
        {bekliyor ? (en ? 'Lie low for now' : 'Ortalık kızışık') : en ? 'Do it yourself' : 'Kendin çevir'}
      </button>

      {/* Çalışanınla yaptır (§45): sonuç yıl dönerken öğrenilir; başarıda risk onda, ele verirse sana dönebilir. */}
      {is.calisanIsi && !bekliyor && (
        <div className="karanlik-hedef-satir">
          {ekip.length === 0 ? (
            <small>{en ? 'Hire an employee to have them do this for you.' : 'Bu işi yaptırmak için bir çalışan tut.'}</small>
          ) : (
            <>
              <select
                className="karanlik-hedef-secim"
                value={calisanId || ekip[0].id}
                disabled={yukleniyor}
                onChange={(e) => setCalisanId(e.target.value)}
              >
                {ekip.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.isim} ({formatYuzde(dil, Math.round(u.sadakat))} {en ? 'loyal' : 'sadık'})
                  </option>
                ))}
              </select>
              <button
                className="karanlik-cevir-buton"
                disabled={yukleniyor}
                onClick={() => onKotuIs(is.id, { hedefRakipAd: rakipHedefli ? hedef : undefined, ajanId: calisanId || ekip[0].id })}
              >
                {en ? 'Have them do it' : 'Yaptır'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
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
    ipTr: '5 yıl boyunca üretim tavanı +%10.',
    ipEn: 'Production cap +10% for 5 years.',
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
function PazarKarti({ pazar }: { pazar: PazarDurumu }) {
  const { dil } = useDil();
  const en = dil === 'en';
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
          {pazar.musteri > 0 ? ` — ${formatMusteri(dil, pazar.musteri)} ${en ? 'customers' : 'müşteri'}` : ''} · <strong>{yuzde(pazar.pazarPayi)}</strong>
        </li>
        {pazar.rakipler.map((r) => (
          <li key={r.ad}>
            <span className="pazar-nokta pazar-nokta-rakip" /> {r.ad}
            {pazar.pazarMusteri > 0 ? ` — ${formatMusteri(dil, r.musteri)} ${en ? 'customers' : 'müşteri'}` : ''} · {yuzde(r.pay)}
          </li>
        ))}
        <li>
          <span className="pazar-nokta pazar-nokta-diger" /> {en ? 'Small players' : 'Küçük oyuncular'} · {yuzde(pazar.digerPay)}
        </li>
      </ul>
      <p className="pazar-etki">
        💰 {en ? 'Salary effect' : 'Maaşa etkisi'}: <strong>{isaretli(pazar.maasEtkisi)}</strong> · 🎖️{' '}
        {en ? 'Career XP' : 'Kariyer puanı'} +{pazar.yillikKariyerPuani}/{en ? 'yr' : 'yıl'}
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
      <PiyasaHaberleri pazar={pazar} sayilarGoster={pazar.pazarMusteri > 0 && pazar.musteri > 0} adet={3} />
      <p className="pazar-ipucu">
        {en
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
  onEtkilesim: (id: string, kademe?: number) => void;
  onIstek: (id: string, rusvet?: boolean) => void;
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
export function KariyerEkrani({
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
  onIsletmeKarar,
  onIsletmeYatirim,
  onIsletmeCalisanAl,
  onGeriDon,
}: KariyerEkraniProps) {
  const { m, kt, dil } = useDil();
  const en = dil === 'en';
  const [karanlikAcik, setKaranlikAcik] = useState(false);

  // İşlem sonucu / hata → ekrana açılır pencere.
  const [modalMesaj, setModalMesaj] = useState<string | null>(null);
  useEffect(() => {
    if (islemMesaji) setModalMesaj(islemMesaji);
  }, [islemMesaji]);

  const husumetEtiket = (h: number) =>
    h >= 70 ? (en ? 'blood feud' : 'kan davası') : h >= 45 ? (en ? 'holds a grudge' : 'kırgın') : en ? 'lukewarm' : 'ılımlı';

  const meslekGucSatirlari: [string, string][] = [];
  if (meslek === 'Asker') {
    meslekGucSatirlari.push([m.iyOrduMevcudu, String(orduMevcudu)]);
    meslekGucSatirlari.push([m.iyTechizat, formatYuzde(dil, orduTechizatSeviyesi)]);
  } else if (meslek === 'Tüccar' && ticaretSermaye > 0) {
    meslekGucSatirlari.push([m.iyTicaretSermayesi, String(ticaretSermaye)]);
  } else if (meslek === 'Din Adamı' && nufuz > 0) {
    meslekGucSatirlari.push([m.iyNufuz, String(Math.round(nufuz))]);
  }

  const talep = yonetimDurum?.talep ?? null;
  const bikkin = (yonetimDurum?.bikkinlik ?? 0) >= 3;
  // Talep bağışsa ve nakit yetmiyorsa "Öde" kapalı (sunucu zaten reddediyor; buton
  // tıklanabilir görünüp hata vermesin).
  const talepParasiYok = !!talep && talep.tur === 'bagis' && talep.tutar > (yonetimDurum?.para ?? Infinity);
  // Kral talebi penceresi ekranı tamamen kilitliyordu; oyuncu "sonra" deyip ekranı
  // kullanabilsin (talebin zaten bir son yılı var, sonra karar verebilir).
  const [hukumdarTalebiErtelendi, setHukumdarTalebiErtelendi] = useState<string | null>(null);
  const hukumdarModalAcik = !!talep && talep.kimden === 'yonetici' && hukumdarTalebiErtelendi !== talep.id;

  const ilerleme = rutbeIlerlemeHesapla(
    meslek,
    cag,
    dinKultur,
    rutbeSeviye,
    kariyerPuani,
    un,
    ahlak,
    yil,
    sonTerfiYili
  );
  const statEtiket = (adi: 'un' | 'ahlak' | null) =>
    adi === 'ahlak' ? m.skorKirilimAhlak.replace(/^[^\s]+\s/, '') : m.skorKirilimSohret.replace(/^[^\s]+\s/, '');

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

      {/* Rütbe/tecrübe ilerleme çubuğu (Faz 6, 2026-09 sonu) — bir sonraki
          kademeye ne kadar kaldığını (kariyer puanı + mesleğe özgü stat) gösterir. */}
      {ilerleme.gecerli && (
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
              ? ` · ${m.geVebaHayatta} ~${formatYuzde(dil, Math.max(0, Math.round(100 - vebaOlumRiski)))}`
              : ''}
          </span>
        </div>
      )}

      {/* PC'de iki sütunlu "saray" düzeni: solda geniş yönetim/ilişki bölümü,
          sağda mesleğe özel güç özeti — strateji oyunlarındaki danışman
          ekranlarına benzer şekilde. Mobilde tek sütuna iner (bkz. medya sorgusu). */}
      <div className="kariyer-govde">
        <div className="kariyer-ana-sutun">
          {/* ===== YÖNETİMLE BAĞLAR ===== */}
          {yonetimDurum && (
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
                    {talep.tur === 'bagis'
                      ? `${talep.kalem} — ${formatPara(talep.tutar)} ${paraBirimi} ${en ? 'demanded.' : 'istiyor.'}`
                      : `${talep.kalem} ${en ? 'awaited.' : 'bekliyor.'}`}
                  </p>
                  <div className="kariyer-talep-butonlar">
                    <button disabled={yukleniyor || talepParasiYok} onClick={() => onTalep('kabul')}>
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
                <HatKarti hat={yonetimDurum.tekOtorite ? 'yonetici' : 'patron'} durum={yonetimDurum} yukleniyor={yukleniyor} onEtkilesim={onEtkilesim} onIstek={onIstek} />
              </div>
            </section>
          )}

          {/* ===== İŞLETME (Tüccar dilimi, §45) — çalışanlar da burada yönetilir ===== */}
          {isletme?.aktif && onIsletmeKarar && onIsletmeYatirim && onIsletmeCalisanAl && (
            <IsletmePaneli
              durum={isletme}
              pazar={pazarDurum}
              yukleniyor={yukleniyor}
              onKarar={onIsletmeKarar}
              onYatirim={onIsletmeYatirim}
              onCalisanAl={onIsletmeCalisanAl}
              onEkipCikar={onEkipCikar}
            />
          )}

          {/* ===== BÜTÇEN ===== */}
          {finans && <ButcePaneli finans={finans} paraBirimi={paraBirimi} gecmis={gecmis ?? []} isletmeAktif={!!isletme?.aktif} />}

          {/* ===== EKİBİN ===== */}
          {!isletme?.aktif && (
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
                      {formatYuzde(dil, Math.round(uye.sadakat))} · {m.ksKalite}{' '}
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
          {dedikodular && dedikodular.length > 0 && (
            <div className="aile-cocuklar-karti">
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
          <div className="aile-cocuklar-karti">
            <button className="kariyer-istek-ac" onClick={() => setKaranlikAcik(true)}>
              ▸ {m.iyKaranlikIsler}
            </button>
          </div>
        </div>

        <aside className="kariyer-yan-sutun">
          {pazarDurum?.aktif && <PazarKarti pazar={pazarDurum} />}
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
        </aside>
      </div>

      {karanlikAcik && (
        <div className="kariyer-sonuc-katman" onClick={() => setKaranlikAcik(false)}>
          <div
            className="kariyer-sonuc-modal kariyer-karanlik-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kariyer-karanlik-modal-baslik">
              <h3>{m.iyKaranlikIsler}</h3>
              <button className="ikincil kariyer-karanlik-kapat" onClick={() => setKaranlikAcik(false)}>
                ✕
              </button>
            </div>

            {/* Rakibin — karanlık işlerin en üstünde: hedef seçimi buradan başlar. */}
            {rakipler.length > 0 && (
              <div className="aile-koken-karti kariyer-karanlik-rakip">
                <h3>{en ? 'Your Rival' : 'Rakibin'}</h3>
                <div className="aile-koken-listesi">
                  {rakipler.map((r) => (
                    <span key={r.ad} className={`iliski-rozet${r.yenildi ? ' rakip-yenildi' : ''}`}>
                      ♟️ {r.ad} · {kt(r.meslek)}
                      {r.yenildi
                        ? ` · ${en ? 'defeated' : 'saf dışı'}`
                        : ` · ${en ? 'share' : 'pay'}: ${formatYuzde(dil, pazarDurum?.rakipler.find((x) => x.ad === r.ad)?.pay ?? 0)} · ${husumetEtiket(r.husumet)}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="giris-aciklama tam-yardimci-metin">{m.iyKaranlikIsAcikla}</p>

            {[true, false].map((ozel) => {
              const liste = kotuIsler.filter((k) => k.meslegeOzel === ozel);
              if (liste.length === 0) return null;
              return (
                <div key={String(ozel)} className="karanlik-grup">
                  <h4 className="karanlik-grup-baslik">
                    {ozel ? (en ? 'Your trade’s dirty work' : 'Mesleğine özel işler') : en ? 'Anyone can do these' : 'Herkesin işleri'}
                  </h4>
                  <div className="yatirim-kartlari">
                    {liste.map((is) => (
                      <KaranlikIsKart
                        key={is.id}
                        is={is}
                        dil={dil}
                        m={m}
                        paraBirimi={paraBirimi}
                        yukleniyor={yukleniyor}
                        rakipler={rakipler}
                        dinKultur={dinKultur}
                        ekip={ekip}
                        onKotuIs={onKotuIs}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            <p className={`suc-seviyesi-gostergesi ${sucSeviyesi >= 50 ? 'suc-seviyesi-riskli' : ''}`}>
              {bic(m.iySucSeviyen, Math.round(sucSeviyesi), sucSeviyesiEtiketi(m, sucSeviyesi))}
            </p>

            <button className="ikincil" onClick={() => setKaranlikAcik(false)}>
              {en ? 'Close' : 'Kapat'}
            </button>
          </div>
        </div>
      )}

      <button className="ikincil tam-geri-buton" onClick={onGeriDon}>
        {m.geriDon}
      </button>

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
