import type {
  PazarDurumu,
  IsletmeGorunumu,
  IsletmeHatGorunumu,
  IsletmeFiyat,
  IsletmeKararGirdisi,
  IsletmeUyari,
} from '../types';
import { useDil } from '../DilContext';
import { kt } from '../katalog';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import { IsletmeOrtak } from './IsletmeOrtak';
import { formatPara, formatYuzde, formatMusteri, isaretSinifi } from '../format';

/** Pazar payı: bir ondalık, dile göre yüzde işareti (TR "%12,7", EN "12.7%"). */
function payMetni(dil: 'tr' | 'en', pay: number): string {
  const v = formatMusteri(dil, pay);
  return dil === 'en' ? `${v}%` : `%${v}`;
}

interface Props {
  durum: IsletmeGorunumu;
  /** Piyasa haberleri ve müşteri dağılımı için (yoksa kart gösterilmez). */
  pazar?: PazarDurumu | null;
  yukleniyor: boolean;
  onKarar: (hatlar: IsletmeKararGirdisi[]) => void;
  onYatirim: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
  /** Telefon ana ekranı sayfaları: yalnız bir bölümü çiz (varsayılan hepsi). */
  bolum?: 'hepsi' | 'isletme' | 'yatirim' | 'calisan';
}

type D = { tr: string; en: string };

/** Metinler bileşene gömülü (NasilOynanir/KARANLIK_ISLER deseni): TR + EN aynı objede. */
const M = {
  baslik: { tr: '🏪 İşletmen', en: '🏪 Your Business' },
  pay: { tr: 'Pazar payın', en: 'Market share' },
  musteri: { tr: 'Müşterin', en: 'Customers' },
  pazar: { tr: 'Toplam pazar', en: 'Whole market' },
  kisi: { tr: 'kişi', en: 'people' },
  slot: { tr: 'Açık hat', en: 'Open lines' },
  depo: { tr: 'Depo', en: 'Warehouse' },
  curume: { tr: 'çürüme', en: 'spoilage' },
  bakim: { tr: 'bakım', en: 'upkeep' },
  vergi: { tr: 'Vergi', en: 'Tax' },
  vergiIndirim: { tr: 'indirimli, kalan', en: 'reduced, left' },
  yilKisa: { tr: 'yıl', en: 'yr' },
  koruma: { tr: 'Koruma', en: 'Security' },
  butceBaslik: { tr: '📒 Dükkan bütçesi', en: '📒 Shop budget' },
  buYil: { tr: 'Bu yıl (tahmini)', en: 'This year (estimate)' },
  gecenYil: { tr: 'Geçen yıl', en: 'Last year' },
  maasKalemi: { tr: 'Çalışan maaşları', en: 'Staff wages' },
  curumeKalemi: { tr: 'Çürüyen mal', en: 'Spoiled goods' },
  hasarKalemi: { tr: 'Hırsızlık / baskın / tazminat', en: 'Theft / raid / severance' },
  dukkanNeti: { tr: 'Dükkan neti', en: 'Shop net' },
  yasamKira: { tr: 'Yaşam + kira', en: 'Living + rent' },
  krediTaksit: { tr: 'Kredi taksidi', en: 'Loan instalment' },
  cebineKalan: { tr: 'Cebine kalan', en: 'Left in your pocket' },
  gecenAlis: { tr: 'geçen yıl', en: 'last year' },
  alisIndirim: { tr: 'indirimin', en: 'your discount' },
  alisDonem: { tr: 'dönem', en: 'period' },
  alisBaslik: { tr: 'Alış', en: 'Buying' },
  borc: { tr: 'Tedarikçi borcu', en: 'Supplier debt' },
  beklenen: { tr: 'Beklenen net', en: 'Expected net' },
  yil: { tr: '/yıl', en: '/yr' },
  depoBaslik: { tr: 'Depo', en: 'Warehouse' },
  depoOtoNot: { tr: 'Depo her yıl başı kendiliğinden dolar; nakit yetmezse eksik mal tedarikçiden veresiye alınır ve kârdan ödenir. Talep depoyu aşarsa müşteri kaybedersin; çözüm depoyu büyütmek.', en: 'The warehouse refills itself every year; if cash runs short the missing goods are bought on supplier credit and repaid from profit. If demand outgrows it you lose customers; upgrade the warehouse.' },
  depoDolu: { tr: 'dolu', en: 'full' },
  depoBirimFiyat: { tr: 'Birim alış', en: 'Unit cost' },
  depoDoldurNot: {
    tr: 'Mal yılda bir kez, kendin alırsın. Bir yüzdeye bas, ödenecek tutarı gör, sonra satın al. Paran yetmezse yalnız parana yetecek kadar alınır; eksiye düşmezsin, gerekirse tefeciden borç al.',
    en: 'You buy goods yourself, once a year. Pick a percentage, see what you would pay, then buy. If you cannot afford it you only buy what your money covers; you never go into debt by buying — borrow from the moneylender if you must.',
  },
  odenecek: { tr: 'Ödenecek', en: 'To pay' },
  adetBirim: { tr: 'birim', en: 'units' },
  depodaStok: { tr: 'Depoda', en: 'In stock' },
  tahminiTalep: { tr: 'tahmini talep', en: 'expected demand' },
  eldekiPara: { tr: 'Elindeki para', en: 'Your cash' },
  yetmiyor: { tr: 'Paran hedefe yetmiyor; paran kadar alırsın', en: 'You cannot afford the target; you will buy what you can' },
  yetmiyorKarsilik: { tr: 'depo %', en: 'warehouse ' },
  satinAl: { tr: 'Satın al', en: 'Buy' },
  zatenDolu: { tr: 'Depo zaten bu kadar dolu.', en: 'The warehouse is already that full.' },
  otomatik: { tr: 'Otomatik', en: 'Automatic' },
  otomatikNot: {
    tr: 'Açıkken depo her yıl başı seçtiğin yüzdeye, paran yettiği kadar dolar. Sen kapatana kadar sürer.',
    en: 'When on, the warehouse refills to your chosen % at the start of every year as far as your money allows, until you turn it off.',
  },
  sapma: { tr: 'bu yılın piyasa farkı', en: 'this year\'s market swing' },
  hatlar: { tr: 'Ürün hatları', en: 'Product lines' },
  acik: { tr: 'Açık', en: 'Open' },
  kapali: { tr: 'Kapalı', en: 'Closed' },
  rutbeGerek: { tr: 'Rütbe', en: 'Rank' },
  stok: { tr: 'Stok', en: 'Stock' },
  hammaddeStogu: { tr: 'Hammadde stoğu', en: 'Raw materials' },
  fiyat: { tr: 'Fiyat', en: 'Price' },
  talep: { tr: 'Beklenen talep', en: 'Expected demand' },
  birim: { tr: 'Satış / alış', en: 'Sell / buy' },
  kar: { tr: 'Kâr', en: 'Profit' },
  sicak: { tr: '🔥 Dönemin sıcak ürünü: talep ve fiyat yüksek, biterse kayıp ikiye katlanır.', en: '🔥 Hot product this period: high demand and price, and running out costs double.' },
  dunya: { tr: 'Dünya', en: 'World' },
  temel: { tr: 'temel', en: 'staple' },
  kesimSavas: { tr: 'savaş', en: 'war' },
  luks: { tr: 'lüks', en: 'luxury' },
  yatirimlar: { tr: 'Yatırımlar', en: 'Investments' },
  kademe: { tr: 'Kademe', en: 'Tier' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  azami: { tr: 'Azami', en: 'Maxed' },
  calisanlar: { tr: 'Çalışanların', en: 'Your staff' },
  yok: { tr: 'Henüz çalışanın yok. 3 çalışan ikinci bir hat açmanı sağlar; limit rütbeyle artar.', en: 'No staff yet. 3 employees let you open a second line; the limit grows with rank.' },
  yetenek: { tr: 'Yetenek', en: 'Skill' },
  sadakat: { tr: 'Sadakat', en: 'Loyalty' },
  maas: { tr: 'maaş', en: 'wage' },
  sadik: { tr: 'Sadık', en: 'Loyal' },
  riskli: { tr: 'Sadakati düşük: sızdırabilir, çalabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, steal or quit' },
  kov: { tr: 'Çıkar', en: 'Dismiss' },
  adaylar: { tr: 'Adaylar', en: 'Candidates' },
  adayYenilenme: { tr: 'Liste yenilenmesine', en: 'List refreshes in' },
  al: { tr: 'İşe al', en: 'Hire' },
  dokum: { tr: 'Geçen yılın dökümü', en: "Last year's ledger" },
  satis: { tr: 'Satış', en: 'Sales' },
  alim: { tr: 'Mal alımı', en: 'Purchases' },
  hammadde: { tr: 'Hammadde', en: 'Materials' },
  depoMasrafi: { tr: 'Dükkân giderleri', en: 'Shop expenses' },
  dukkanGideri: { tr: 'dükkân gideri', en: 'shop expenses' },
  loncaAidati: { tr: 'Lonca aidatı', en: 'Guild dues' },
  vergiKalemi: { tr: 'Vergi', en: 'Tax' },
  borcOdeme: { tr: 'Borç ödemesi', en: 'Debt repaid' },
  net: { tr: 'Eline geçen', en: 'Net to you' },
  musteriDegisim: { tr: 'Müşteri değişimi', en: 'Customer change' },
  donem: { tr: { bolluk: 'Bolluk', durgunluk: 'Durgunluk', kitlik: 'Kıtlık' }, en: { bolluk: 'Boom', durgunluk: 'Slump', kitlik: 'Famine' } },
  savas: { tr: 'Savaş', en: 'War' },
  veba: { tr: 'Salgın', en: 'Plague' },
  uretimTavani: { tr: 'Üretim tavanı', en: 'Production cap' },
  birimUretim: { tr: 'Satış / hammadde', en: 'Sell / materials' },
  ilkYil: { tr: 'Henüz bir yıl geçmedi. Hiçbir şeye dokunmasan da işletme otomatik çalışır.', en: "A year hasn't passed yet. The business runs on its own even if you touch nothing." },
  imtiyazlar: { tr: 'Aktif imtiyazlar', en: 'Active privileges' },
  otorite: { tr: 'Şehir yöneticin', en: 'Your city governor' },
  iliski: { tr: 'ilişki', en: 'relation' },
  tamam: { tr: 'Tamam', en: 'OK' },
  olayBaslik: { tr: 'Geçen yıl işletmende olanlar', en: 'What happened at your business last year' },
};

const IMTIYAZ_ADLARI: Record<string, D> = {
  pazar_imtiyazi: { tr: 'Pazar yeri imtiyazı (talep +%10)', en: 'Market-stall privilege (demand +10%)' },
  gumruk_muafiyeti: { tr: 'Gümrük muafiyeti (alış −%10)', en: 'Customs exemption (purchases −10%)' },
  tekel_ruhsati: { tr: 'Tekel ruhsatı (en çok satan hatta fiyat +%10)', en: 'Monopoly licence (+10% price on your top line)' },
  hammadde_tahsisi: { tr: 'Hammadde tahsisi (hammadde −%10)', en: 'Material allocation (materials −10%)' },
  atolye_ruhsati: { tr: 'Atölye genişleme ruhsatı (üretim +%10)', en: 'Workshop licence (output +10%)' },
  vakif_muafiyeti: { tr: 'Vakıf muafiyeti (alış −%8)', en: 'Foundation exemption (purchases −8%)' },
  kutsal_gun_imtiyazi: { tr: 'Kutsal gün pazarı (talep +%10)', en: 'Holy-day market (demand +10%)' },
};

const FIYATLAR: { id: IsletmeFiyat; etiket: D; aciklama: D }[] = [
  {
    id: 'eksi20',
    etiket: { tr: '−%20', en: '−20%' },
    aciklama: {
      tr: 'Fiyat −%20: talep ≈ +%20, birim kâr az. Yılda +3 müşteri kazanırsın.',
      en: 'Price −20%: demand ≈ +20%, thin margin. You gain +3 customers a year.',
    },
  },
  {
    id: 'eksi10',
    etiket: { tr: '−%10', en: '−10%' },
    aciklama: {
      tr: 'Fiyat −%10: talep ≈ +%9, birim kâr biraz düşer. Yılda +1 müşteri kazanırsın.',
      en: 'Price −10%: demand ≈ +9%, slightly lower margin. You gain +1 customer a year.',
    },
  },
  { id: 'normal', etiket: { tr: 'Piyasa', en: 'Market' }, aciklama: { tr: 'Piyasa fiyatı. Dengeli.', en: 'Market price. Balanced.' } },
  {
    id: 'arti10',
    etiket: { tr: '+%10', en: '+10%' },
    aciklama: {
      tr: 'Fiyat +%10: talep ≈ −%7, birim kâr artar. Yılda 1 müşteri kaybedersin.',
      en: 'Price +10%: demand ≈ −7%, better margin. You lose 1 customer a year.',
    },
  },
  {
    id: 'arti20',
    etiket: { tr: '+%20', en: '+20%' },
    aciklama: {
      tr: 'Fiyat +%20: talep ≈ −%14, birim kâr yüksek. Yılda 3 müşteri kaybedersin.',
      en: 'Price +20%: demand ≈ −14%, high margin. You lose 3 customers a year.',
    },
  },
];

const HIRSIZLIK_SONUCLARI: Record<string, D> = {
  agir: { tr: 'Hırsızlar ağır vurdu', en: 'Thieves struck hard' },
  rahat: { tr: 'Hırsızlar rahatça çaldı', en: 'Thieves stole freely' },
  kismi: { tr: 'Hırsızlar kısmen başarılı oldu', en: 'Thieves only partly succeeded' },
  engellendi: { tr: 'Hırsızlık girişimi tamamen engellendi', en: 'The theft attempt was completely stopped' },
  sans: { tr: 'Hırsızlar şansları yaver gitmeden kaçtı', en: 'Thieves slipped away empty-handed by luck' },
};
const SALDIRI_SONUCLARI: Record<string, D> = {
  baskin: { tr: 'dükkânını basıp kasayı boşalttı', en: 'raided your shop and emptied the till' },
  musteri_calma: { tr: 'müşterilerini çaldı', en: 'stole your customers' },
  iftira: { tr: 'hakkında iftira yaydı', en: 'spread slander about you' },
  sabotaj: { tr: 'deponu yaktı ve bozdu', en: 'burned and ruined your warehouse' },
  nakit: { tr: 'seni zarara uğrattı', en: 'hurt your finances' },
};
const SALDIRI_ENGELLENDI: Record<string, D> = {
  baskin: { tr: 'dükkânı basmaya/taşlamaya geldi, güvenliğin püskürttü', en: 'came to raid your shop; your guards drove them off' },
  sabotaj: { tr: 'deponu yakmaya geldi, güvenliğin püskürttü', en: 'came to burn your warehouse; your guards drove them off' },
};

export function isletmeUyariMetni(u: IsletmeUyari, durum: IsletmeGorunumu, dil: 'tr' | 'en'): string {
  const d = (m: D) => m[dil];
  const pb = durum.paraBirimi;
  const hatAdi = (id: string) => {
    const h = durum.hatlar.find((x) => x.id === id);
    return h ? d(h.ad) : id;
  };
    const en = dil === 'en';
    switch (u.kod) {
      case 'stok_bitti':
        return `⚠️ ${hatAdi(u.hat ?? '')}: ${en ? 'ran out of stock — if it happens again next year, customers will leave for the rival' : 'stoğun yetmedi (depo küçük ya da para yetmedi); gelecek yıl da yetmezse müşteri rakibe kayacak'}`;
      case 'alim_yetersiz':
        return en
          ? '💸 You could not afford to restock fully — empty shelves mean lost sales, and a second short year costs you customers. Keep cash for stock, or take a loan.'
          : '💸 Mal alacak paran yetmedi; depo eksik doldu. Boş raf satış kaybı demek, üst üste ikinci yılda müşteri de kaybedersin. Mal için nakit ayır ya da kredi al.';
      case 'fazla_stok':
        return `📦 ${hatAdi(u.hat ?? '')}: ${en ? 'idle stock piled up on a closed line' : 'kapalı hatta atıl stok birikti'}`;
      case 'kitle_kaybi':
        return en ? '📉 Two years of unmet demand cost you customers.' : '📉 Üst üste iki yıl karşılanamayan talep müşteri kaybettirdi.';
      case 'uretim_tavani':
        return en ? '🔨 Your production cap fell short of demand — add a workbench or staff.' : '🔨 Üretim tavanın talebe yetmedi; tezgâh ya da çalışan ekle.';
      case 'calisan_ayrildi':
        return `🚪 ${u.isim ?? ''}: ${en ? 'quit and took a severance from the till' : 'işi bıraktı ve kasadan tazminat aldı'}`;
      case 'sizdirma':
        return `🕵️ ${u.isim ?? ''}: ${en ? 'leaked your secrets to the rival; you lost customers' : 'sırlarını rakibe sızdırdı, müşteri kaybettin'}`;
      case 'ic_hirsizlik':
        return `🫳 ${u.isim ?? ''}: ${en ? `stole goods (${u.urunYuzde}%) and cash (${formatPara(u.tutar ?? 0)})` : `mal (%${u.urunYuzde}) ve para (${formatPara(u.tutar ?? 0)}) çaldı`}`;
      case 'hirsizlik': {
        const s = d(HIRSIZLIK_SONUCLARI[u.sonuc ?? 'sans']);
        const ek = u.urunYuzde || u.tutar ? ` — ${en ? 'goods' : 'mal'} ${u.urunYuzde ?? 0}%, ${en ? 'cash' : 'para'} ${formatPara(u.tutar ?? 0)}` : '';
        return `🦹 ${s}${ek}`;
      }
      case 'rakip_saldiri': {
        const kim = u.rakip ?? (en ? 'The rival' : 'Rakip');
        const tur = u.sonuc ?? 'nakit';
        if (u.engellendi) return `🛡️ ${kim}: ${d(SALDIRI_ENGELLENDI[tur] ?? SALDIRI_ENGELLENDI.baskin)}`;
        const kayiplar: string[] = [];
        if (u.musteriKaybi) kayiplar.push(en ? `you lost ${formatMusteri(dil, u.musteriKaybi)} customers` : `${formatMusteri(dil, u.musteriKaybi)} müşteri kaybettin`);
        if (u.tutar) kayiplar.push(`${formatPara(u.tutar)} ${pb}`);
        if (u.urunYuzde) kayiplar.push(en ? `${u.urunYuzde}% of stock` : `stokun %${u.urunYuzde}'i`);
        if (u.sohretKaybi) kayiplar.push(en ? `fame −${u.sohretKaybi}` : `şöhret −${u.sohretKaybi}`);
        const sizma = u.sizma ? ` 🕵️ ${en ? `${u.isim ?? ''} leaked inside information (+30% damage, guards bypassed).` : `${u.isim ?? ''} içeriden bilgi sızdırdı (hasar %30 arttı, güvenlik devre dışı).`}` : '';
        return `⚔️ ${kim} ${d(SALDIRI_SONUCLARI[tur] ?? SALDIRI_SONUCLARI.nakit)}${kayiplar.length ? ` — ${kayiplar.join(', ')}` : ''}.${sizma}`;
      }
      case 'vergi_indirimi_bitti':
        return en ? '🧾 Your tax reduction has ended.' : '🧾 Vergi indirimin sona erdi.';
      case 'imtiyaz_bitti':
        return `📜 ${u.hat && IMTIYAZ_ADLARI[u.hat] ? d(IMTIYAZ_ADLARI[u.hat]) : ''}: ${en ? 'expired' : 'sona erdi'}`;
      default:
        return '';
    }
  }

export function IsletmePaneli({ durum, pazar, yukleniyor, onKarar, onYatirim, onCalisanAl, onEkipCikar, bolum = 'hepsi' }: Props) {
  const { dil } = useDil();
  const t = (k: Exclude<keyof typeof M, 'donem'>) => M[k][dil];
  const d = (m: D) => m[dil];

  const dokum = durum.sonDokum;
  if (!durum.aktif) return null;
  const pb = durum.paraBirimi;
  const uretimModu = !!durum.uretim;
  const etiketAlim = uretimModu ? t('hammadde') : t('alim');
  const donemAdi = durum.dunya.donem ? M.donem[dil][durum.dunya.donem as 'bolluk'] : null;
  const uyariMetni = (u: IsletmeUyari): string => isletmeUyariMetni(u, durum, dil);

  const hatKarti = (h: IsletmeHatGorunumu) => {
    const dunyaEtkisi =
      h.dunyaTalepYuzde !== 0 || h.dunyaFiyatYuzde !== 0
        ? `${dil === 'en' ? 'demand' : 'talep'} ${formatYuzde(dil, h.dunyaTalepYuzde, true)} · ${dil === 'en' ? 'price' : 'fiyat'} ${formatYuzde(dil, h.dunyaFiyatYuzde, true)}`
        : null;
    const secili = FIYATLAR.find((f) => f.id === h.fiyat) ?? FIYATLAR[2];
    return (
      <div key={h.id} className={`isletme-hat${h.acik ? ' isletme-hat-acik' : ''}${h.kilitli ? ' isletme-hat-kilitli' : ''}`}>
        <div className="isletme-hat-baslik">
          <strong>
            {h.simge} {d(h.ad)} {h.sicak ? '🔥' : ''}
          </strong>
          <span className="isletme-etiket">{t(h.kesim === 'savas' ? 'kesimSavas' : h.kesim)}</span>
          {h.anaUrun && <span className="isletme-etiket">⭐ {dil === 'en' ? 'Main product' : 'Ana ürün'}</span>}
          {h.kilitli ? (
            <span className="isletme-etiket">
              🔒 {t('rutbeGerek')} {h.minRutbe}
            </span>
          ) : (
            <button className={h.acik ? '' : 'ikincil'} disabled={yukleniyor} onClick={() => onKarar([{ id: h.id, acik: !h.acik }])}>
              {h.acik ? t('acik') : t('kapali')}
            </button>
          )}
        </div>
        <div className="isletme-hat-artieksi">
          <span>➕ {d(h.arti)}</span>
          <span>➖ {d(h.eksi)}</span>
        </div>
        {h.sicak && <div className="isletme-hat-dunya">{t('sicak')}</div>}
        {h.anaUrunBonus && <div className="isletme-hat-dunya">⭐ {d(h.anaUrunBonus)}</div>}
        <div className="isletme-hat-satir">
          <span>
            {uretimModu ? t('hammaddeStogu') : t('stok')}: <strong>{h.stok}</strong>
          </span>
          <span>
            {uretimModu ? t('birimUretim') : t('birim')}:{' '}
            <strong>
              {formatPara(h.birimFiyat)} / {formatPara(h.birimMaliyet)}
            </strong>
          </span>
          <span>
            {t('kar')}: <strong>{formatPara(h.beklenenKar)}</strong>
          </span>
        </div>
        {dunyaEtkisi && (
          <div className="isletme-hat-dunya">
            🌍 {t('dunya')}: {dunyaEtkisi}
          </div>
        )}
        {h.acik && (
          <div className="isletme-hat-dunya">
            🧾 {t('alisBaslik')}: <strong>{formatPara(h.birimMaliyet)}</strong>
            {h.oncekiBirimMaliyet != null ? ` (${t('gecenAlis')} ${formatPara(h.oncekiBirimMaliyet)})` : ''}
            {h.maliyetDonemYuzde !== 0 ? <> · {t('alisDonem')} <span className={h.maliyetDonemYuzde > 0 ? 'kademe-dusuk' : 'kademe-yuksek'}>{formatYuzde(dil, h.maliyetDonemYuzde, true)}</span></> : null}
            {h.maliyetIndirimYuzde > 0 ? <> · {t('alisIndirim')} <span className="kademe-yuksek">−{formatYuzde(dil, h.maliyetIndirimYuzde)}</span></> : null}
            {' · '}{t('sapma')}: {dil === 'en' ? 'buy' : 'alış'} <span className={h.alisSapmaYuzde > 0 ? 'kademe-dusuk' : 'kademe-yuksek'}>{formatYuzde(dil, h.alisSapmaYuzde, true)}</span>, {dil === 'en' ? 'sell' : 'satış'} <span className={h.satisSapmaYuzde >= 0 ? 'kademe-yuksek' : 'kademe-dusuk'}>{formatYuzde(dil, h.satisSapmaYuzde, true)}</span>
          </div>
        )}
        {h.acik && (
          <>
            <div className="isletme-hat-kontrol">
              <span>{t('fiyat')}:</span>
              {FIYATLAR.map((f) => (
                <button key={f.id} className={h.fiyat === f.id ? '' : 'ikincil'} disabled={yukleniyor} onClick={() => onKarar([{ id: h.id, fiyat: f.id }])}>
                  {d(f.etiket)}
                </button>
              ))}
            </div>
            <div className="isletme-fiyat-not">{d(secili.aciklama)}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className="isletme-paneli">
      {(bolum === 'hepsi' || bolum === 'isletme') && (
        <>
      <h3>{t('baslik')}</h3>

      <div className="isletme-ozet">
        <span>
          ⚖️ {t('pay')}: <strong>{payMetni(dil, durum.pazarPayi)}</strong>
        </span>
        <span>
          👥 {t('musteri')}: <strong>{formatMusteri(dil, durum.musteri)}</strong>
          {dokum && dokum.musteriDegisim !== 0 ? <em> ({formatMusteri(dil, dokum.musteriDegisim, true)})</em> : null}
        </span>
        <span>
          🌐 {t('pazar')}: <strong>{durum.pazarMusteri} {t('kisi')}</strong>
        </span>
        <span>
          📑 {t('slot')}: <strong>{durum.slot.kullanilan}/{durum.slot.toplam}</strong>
        </span>
        {durum.uretim && (
          <span>
            🔨 {t('uretimTavani')}: <strong>{durum.uretim.tavan}{t('yil')}</strong>
          </span>
        )}
        <span>
          🏚️ {t('depo')}: <strong>{durum.depo.kullanilan}/{durum.depo.kapasite}</strong> · {t('curume')} %{durum.depo.curumeYuzde} · {t('dukkanGideri')} {formatPara(durum.depo.dukkanGideri)}
        </span>
        <span>
          🧾 {t('vergi')}: <strong>%{Math.round(durum.vergi.oran * 1000) / 10}</strong>
          {durum.vergi.indirimKalanYil > 0 ? ` (${t('vergiIndirim')} ${durum.vergi.indirimKalanYil} ${t('yilKisa')})` : ''}
        </span>
        <span>
          🔒 {t('koruma')}: <strong>%{Math.round(durum.koruma.toplam * 100)}</strong>
        </span>
        {durum.tedarikciBorcu > 0 && (
          <span>
            🧾 {t('borc')}: <strong>{formatPara(durum.tedarikciBorcu)} {pb}</strong>
          </span>
        )}
        <span>
          💰 {t('beklenen')}: <strong className={isaretSinifi(durum.butce.net)}>~{formatPara(durum.butce.net)} {pb}{t('yil')}</strong>
        </span>
        {durum.otorite && (
          <span>
            🏛️ {t('otorite')}: <strong>{kt(dil, durum.otorite)}</strong> · {t('iliski')} {durum.otoriteIliski}
          </span>
        )}
        {(donemAdi || durum.dunya.savas || durum.dunya.veba) && (
          <span>
            🌍 {[donemAdi, durum.dunya.savas ? t('savas') : null, durum.dunya.veba ? t('veba') : null].filter(Boolean).join(' · ')}
          </span>
        )}
      </div>

      {durum.imtiyazlar.length > 0 && (
        <div className="isletme-imtiyazlar">
          <strong>{t('imtiyazlar')}:</strong>{' '}
          {durum.imtiyazlar.map((i) => `${IMTIYAZ_ADLARI[i.id] ? d(IMTIYAZ_ADLARI[i.id]) : i.id} (${i.kalanYil} ${t('yilKisa')})`).join(' · ')}
        </div>
      )}

      {durum.depo.kapasite > 0 && (
        <div className="isletme-depo-doldur">
          <h4>
            {t('depoBaslik')} — {durum.depo.kullanilan}/{durum.depo.kapasite} {t('adetBirim')} ({durum.depo.dolulukYuzde}% {t('depoDolu')})
          </h4>
          <div className="isletme-hat-dunya">
            {durum.hatlar.filter((h) => h.acik).map((h) => (
              <div key={h.id}>
                {h.simge} {d(h.ad)}: {t('depodaStok')} <strong>{h.stok}</strong> {t('adetBirim')} · {t('tahminiTalep')} <strong>{h.talepMin}–{h.talepMax}</strong> {t('adetBirim')} · {t('depoBirimFiyat')} {formatPara(h.birimMaliyet)}
              </div>
            ))}
          </div>
          <div className="isletme-fiyat-not">{t('depoOtoNot')}</div>
        </div>
      )}

      {pazar && pazar.aktif && <PiyasaHaberleri pazar={pazar} sayilarGoster />}

      <h4>{t('hatlar')}</h4>
      <div className="isletme-hatlar">{durum.hatlar.map(hatKarti)}</div>

        </>
      )}

      <IsletmeOrtak
        goster={bolum === 'isletme' ? 'yok' : bolum}
        durum={durum}
        yukleniyor={yukleniyor}
        sadakatAdi={M.sadakat}
        riskliAciklama={M.riskli}
        onYatirim={onYatirim}
        onCalisanAl={onCalisanAl}
        onEkipCikar={onEkipCikar}
      />

      {(bolum === 'hepsi' || bolum === 'isletme') && (
        <>
      <h4>{t('butceBaslik')}</h4>
      <div className="isletme-butce">
        <div className="isletme-butce-sutun">
          <h5>{t('buYil')}</h5>
          <div className="isletme-butce-satir"><span>{t('satis')}</span><span className="kademe-yuksek">+{formatPara(durum.butce.satis)}</span></div>
          <div className="isletme-butce-satir"><span>{etiketAlim}</span><span className="kademe-dusuk">−{formatPara(durum.butce.alim)}</span></div>
          <div className="isletme-butce-satir"><span>{t('depoMasrafi')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.depo)}</span></div>
          <div className="isletme-butce-satir"><span>{t('loncaAidati')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.aidat)}</span></div>
          <div className="isletme-butce-satir"><span>{t('vergiKalemi')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.vergi)}</span></div>
          {durum.butce.borcOdeme > 0 && <div className="isletme-butce-satir"><span>{t('borcOdeme')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.borcOdeme)}</span></div>}
          <div className="isletme-butce-satir"><span>{t('maasKalemi')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.maas)}</span></div>
          <div className="isletme-butce-satir isletme-butce-toplam"><span>{t('dukkanNeti')}</span><span className={isaretSinifi(durum.butce.net)}>{durum.butce.net >= 0 ? '+' : ''}{formatPara(durum.butce.net)}</span></div>
          <div className="isletme-butce-satir"><span>{t('yasamKira')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.yasamKira)}</span></div>
          {durum.butce.krediTaksit > 0 && <div className="isletme-butce-satir"><span>{t('krediTaksit')}</span><span className="kademe-dusuk">−{formatPara(durum.butce.krediTaksit)}</span></div>}
          <div className="isletme-butce-satir isletme-butce-toplam"><span>{t('cebineKalan')}</span><span className={isaretSinifi(durum.butce.cebineKalan)}>{durum.butce.cebineKalan >= 0 ? '+' : ''}{formatPara(durum.butce.cebineKalan)} {pb}</span></div>
        </div>
        <div className="isletme-butce-sutun">
          <h5>{t('gecenYil')}</h5>
          {!dokum ? (
            <p className="isletme-bos">{t('ilkYil')}</p>
          ) : (
            <>
              <div className="isletme-butce-satir"><span>{t('satis')}</span><span className="kademe-yuksek">+{formatPara(dokum.satis)}</span></div>
              <div className="isletme-butce-satir"><span>{etiketAlim}</span><span className="kademe-dusuk">−{formatPara(dokum.alim)}</span></div>
              {(dokum.curumeKaybi ?? 0) > 0 && <div className="isletme-butce-satir"><span>↳ {t('curumeKalemi')}</span><span>{formatPara(dokum.curumeKaybi ?? 0)}</span></div>}
              <div className="isletme-butce-satir"><span>{t('depoMasrafi')}</span><span className="kademe-dusuk">−{formatPara(dokum.depoMasrafi)}</span></div>
              {dokum.loncaAidati > 0 && <div className="isletme-butce-satir"><span>{t('loncaAidati')}</span><span className="kademe-dusuk">−{formatPara(dokum.loncaAidati)}</span></div>}
              {dokum.vergi > 0 && <div className="isletme-butce-satir"><span>{t('vergiKalemi')} ({formatYuzde(dil, Math.round(dokum.vergiOrani * 1000) / 10)})</span><span className="kademe-dusuk">−{formatPara(dokum.vergi)}</span></div>}
              {dokum.borcOdeme > 0 && <div className="isletme-butce-satir"><span>{t('borcOdeme')}</span><span className="kademe-dusuk">−{formatPara(dokum.borcOdeme)}</span></div>}
              {((dokum.nakitHasar ?? 0) + (dokum.ekstraGider ?? 0)) > 0 && <div className="isletme-butce-satir"><span>{t('hasarKalemi')}</span><span className="kademe-dusuk">−{formatPara((dokum.nakitHasar ?? 0) + (dokum.ekstraGider ?? 0))}</span></div>}
              <div className="isletme-butce-satir"><span>{t('maasKalemi')}</span><span className="kademe-dusuk">−{formatPara(dokum.calisanMaasi ?? durum.butce.maas)}</span></div>
              <div className="isletme-butce-satir isletme-butce-toplam"><span>{t('dukkanNeti')}</span><span className={isaretSinifi(dokum.net)}>{dokum.net >= 0 ? '+' : ''}{formatPara(dokum.net)}</span></div>
            </>
          )}
        </div>
      </div>

      {dokum && (
        <div className="isletme-dokum">
          <div>
            {t('pay')}: <strong>%{dokum.pazarPayi}</strong> · {t('musteriDegisim')}: <strong className={isaretSinifi(dokum.musteriDegisim)}>{formatMusteri(dil, dokum.musteriDegisim, true)}</strong>
          </div>
          {dokum.uyarilar.map((u, i) => (
            <div key={i} className="isletme-uyari">
              {uyariMetni(u)}
            </div>
          ))}
        </div>
      )}

        </>
      )}

    </section>
  );
}
