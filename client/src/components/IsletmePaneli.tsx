import { useEffect, useState } from 'react';
import type {
  PazarDurumu,
  IsletmeGorunumu,
  IsletmeHatGorunumu,
  IsletmeFiyat,
  IsletmeKararGirdisi,
  IsletmeStokHedefi,
  IsletmeUyari,
} from '../types';
import { useDil } from '../DilContext';
import { kt } from '../katalog';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import { IsletmeOrtak } from './IsletmeOrtak';
import { formatPara, formatYuzde, formatMusteri } from '../format';

interface Props {
  durum: IsletmeGorunumu;
  /** Piyasa haberleri ve müşteri dağılımı için (yoksa kart gösterilmez). */
  pazar?: PazarDurumu | null;
  yukleniyor: boolean;
  onKarar: (hatlar: IsletmeKararGirdisi[], stokHedefi?: IsletmeStokHedefi) => void;
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
  hirsizlikAralik: { tr: 'hırsızlık ~her', en: 'theft ~every' },
  borc: { tr: 'Tedarikçi borcu', en: 'Supplier debt' },
  beklenen: { tr: 'Beklenen kâr', en: 'Expected profit' },
  yil: { tr: '/yıl', en: '/yr' },
  stokHedefi: { tr: 'Stok hedefi', en: 'Stock target' },
  stokHedefiNot: {
    tr: 'Yıl başında depoyu beklenen talebe göre doldurursun. Az tutarsan malın biter ve müşteri kaçar; çok tutarsan mal çürür, depo masrafı artar.',
    en: 'At the start of each year you fill the warehouse to the expected demand. Too little and you sell out and lose customers; too much and goods spoil and storage costs rise.',
  },
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
  orta: { tr: 'orta', en: 'mid' },
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
  depoMasrafi: { tr: 'Depo masrafı', en: 'Storage' },
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

const STOK_HEDEFLERI: { id: IsletmeStokHedefi; ad: D; ipucu: D }[] = [
  { id: 'cokaz', ad: { tr: 'Çok az', en: 'Very low' }, ipucu: { tr: 'Talebin %75\'i kadar stok. Ucuz ama sık biter.', en: '75% of expected demand. Cheap but often sells out.' } },
  { id: 'az', ad: { tr: 'Az', en: 'Low' }, ipucu: { tr: 'Talebin %95\'i kadar stok.', en: '95% of expected demand.' } },
  { id: 'normal', ad: { tr: 'Normal', en: 'Normal' }, ipucu: { tr: 'Talebin %115\'i kadar stok. Dengeli.', en: '115% of expected demand. Balanced.' } },
  { id: 'fazla', ad: { tr: 'Fazla', en: 'High' }, ipucu: { tr: 'Talebin %150\'si kadar stok. Güvenli ama çürür.', en: '150% of expected demand. Safe but spoils.' } },
  { id: 'dolu', ad: { tr: 'Dolu', en: 'Full' }, ipucu: { tr: 'Depoyu tamamen doldur. En yüksek masraf.', en: 'Fill the warehouse. Highest cost.' } },
];

const FIYATLAR: { id: IsletmeFiyat; etiket: D; aciklama: D }[] = [
  {
    id: 'eksi20',
    etiket: { tr: '−%20', en: '−20%' },
    aciklama: {
      tr: 'Fiyat −%20, talep +%45. Çok satar, müşteri kazanırsın (yılda +%3 pay); birim kâr az, stok çabuk biter.',
      en: 'Price −20%, demand +45%. You sell a lot and win customers (+3% share a year); thin margin, stock runs out fast.',
    },
  },
  {
    id: 'eksi10',
    etiket: { tr: '−%10', en: '−10%' },
    aciklama: {
      tr: 'Fiyat −%10, talep +%20. Daha çok satar, müşteri çekersin (yılda +%1,5 pay); birim kâr biraz düşer.',
      en: 'Price −10%, demand +20%. You sell more and attract customers (+1.5% share a year); slightly lower margin.',
    },
  },
  { id: 'normal', etiket: { tr: 'Piyasa', en: 'Market' }, aciklama: { tr: 'Piyasa fiyatı. Dengeli.', en: 'Market price. Balanced.' } },
  {
    id: 'arti10',
    etiket: { tr: '+%10', en: '+10%' },
    aciklama: {
      tr: 'Fiyat +%10, talep −%12. Birim kâr artar; müşteri yavaşça kaçar (yılda −%1 pay). Krizde talep daha çok düşer.',
      en: 'Price +10%, demand −12%. Better margin; customers slowly drift away (−1% share a year). Demand drops more in a crisis.',
    },
  },
  {
    id: 'arti20',
    etiket: { tr: '+%20', en: '+20%' },
    aciklama: {
      tr: 'Fiyat +%20, talep −%30. Birim kâr yüksek ama müşteri kaçar (yılda −%3 pay). Kıtlık ve savaşta riskli.',
      en: 'Price +20%, demand −30%. High margin but customers leave (−3% share a year). Risky in famine and war.',
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

/** Aynı yıl için açılır uyarıyı yalnız bir kez göstermek için (modül düzeyi; sayfa yenilenince sıfırlanır). */
let sonGosterilenYil = -1;

export function IsletmePaneli({ durum, pazar, yukleniyor, onKarar, onYatirim, onCalisanAl, onEkipCikar, bolum = 'hepsi' }: Props) {
  const { dil } = useDil();
  const t = (k: Exclude<keyof typeof M, 'donem'>) => M[k][dil];
  const d = (m: D) => m[dil];
  const [uyariAcik, setUyariAcik] = useState(false);

  const dokum = durum.sonDokum;
  const onemliKodlar: IsletmeUyari['kod'][] = ['hirsizlik', 'sizdirma', 'ic_hirsizlik', 'rakip_saldiri', 'calisan_ayrildi', 'vergi_indirimi_bitti', 'imtiyaz_bitti'];
  const onemliUyarilar = dokum ? dokum.uyarilar.filter((u) => onemliKodlar.includes(u.kod)) : [];
  useEffect(() => {
    if (dokum && onemliUyarilar.length > 0 && dokum.yil !== sonGosterilenYil) {
      sonGosterilenYil = dokum.yil;
      setUyariAcik(true);
    }
  }, [dokum?.yil]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!durum.aktif) return null;
  const pb = durum.paraBirimi;
  const uretimModu = !!durum.uretim;
  const etiketAlim = uretimModu ? t('hammadde') : t('alim');
  const donemAdi = durum.dunya.donem ? M.donem[dil][durum.dunya.donem as 'bolluk'] : null;
  const hatAdi = (id: string) => {
    const h = durum.hatlar.find((x) => x.id === id);
    return h ? d(h.ad) : id;
  };

  const uyariMetni = (u: IsletmeUyari): string => {
    const en = dil === 'en';
    switch (u.kod) {
      case 'stok_bitti':
        return `⚠️ ${hatAdi(u.hat ?? '')}: ${en ? 'ran out of stock — customers left for the rival' : 'stoğun bitti, müşteri rakibe kaçtı'}`;
      case 'fazla_stok':
        return `📦 ${hatAdi(u.hat ?? '')}: ${en ? 'idle stock piled up on a closed line' : 'kapalı hatta atıl stok birikti'}`;
      case 'kitle_kaybi':
        return en ? '📉 Unmet demand cost you customers.' : '📉 Karşılanamayan talep müşteri kaybettirdi.';
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
  };

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
          <span className="isletme-etiket">{t(h.kesim)}</span>
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
        <div className="isletme-hat-satir">
          <span>
            {uretimModu ? t('hammaddeStogu') : t('stok')}: <strong>{h.stok}</strong>
          </span>
          <span>
            {t('talep')}: <strong>~{h.tahminiTalep}</strong>
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
          ⚖️ {t('pay')}: <strong>{formatPara(durum.pazarPayi)}%</strong>
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
          🏚️ {t('depo')}: <strong>{durum.depo.kullanilan}/{durum.depo.kapasite}</strong> · {t('curume')} %{durum.depo.curumeYuzde} · {t('bakim')} {formatPara(durum.depo.bakim)}
        </span>
        <span>
          🧾 {t('vergi')}: <strong>%{Math.round(durum.vergi.oran * 1000) / 10}</strong>
          {durum.vergi.indirimKalanYil > 0 ? ` (${t('vergiIndirim')} ${durum.vergi.indirimKalanYil} ${t('yilKisa')})` : ''}
        </span>
        <span>
          🔒 {t('koruma')}: <strong>%{Math.round(durum.koruma.toplam * 100)}</strong> · {t('hirsizlikAralik')} {durum.koruma.hirsizlikAralik} {t('yilKisa')}
        </span>
        {durum.tedarikciBorcu > 0 && (
          <span>
            🧾 {t('borc')}: <strong>{formatPara(durum.tedarikciBorcu)} {pb}</strong>
          </span>
        )}
        <span>
          💰 {t('beklenen')}: <strong>~{formatPara(durum.beklenenBrutKar)} {pb}{t('yil')}</strong>
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

      <h4>{t('stokHedefi')}</h4>
      <div className="isletme-hat-kontrol">
        {STOK_HEDEFLERI.map((s) => (
          <button key={s.id} className={durum.stokHedefi === s.id ? '' : 'ikincil'} disabled={yukleniyor} title={d(s.ipucu)} onClick={() => onKarar([], s.id)}>
            {d(s.ad)}
          </button>
        ))}
      </div>
      <div className="isletme-fiyat-not">
        {d(STOK_HEDEFLERI.find((s) => s.id === durum.stokHedefi)?.ipucu ?? STOK_HEDEFLERI[2].ipucu)} {t('stokHedefiNot')}
      </div>

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
      <h4>{t('dokum')}</h4>
      {!dokum ? (
        <p className="isletme-bos">{t('ilkYil')}</p>
      ) : (
        <div className="isletme-dokum">
          <div>
            {t('satis')}: <strong>+{formatPara(dokum.satis)}</strong>
          </div>
          <div>
            {etiketAlim}: <strong>−{formatPara(dokum.alim)}</strong>
          </div>
          <div>
            {t('depoMasrafi')}: <strong>−{formatPara(dokum.depoMasrafi)}</strong>
          </div>
          {dokum.loncaAidati > 0 && (
            <div>
              {t('loncaAidati')} (%3): <strong>−{formatPara(dokum.loncaAidati)}</strong>
            </div>
          )}
          {dokum.vergi > 0 && (
            <div>
              {t('vergiKalemi')} (%{Math.round(dokum.vergiOrani * 1000) / 10}): <strong>−{formatPara(dokum.vergi)}</strong>
            </div>
          )}
          {dokum.borcOdeme > 0 && (
            <div>
              {t('borcOdeme')}: <strong>−{formatPara(dokum.borcOdeme)}</strong>
            </div>
          )}
          <div className="isletme-dokum-net">
            {t('net')}: <strong>{dokum.net >= 0 ? '+' : ''}{formatPara(dokum.net)} {pb}</strong>
          </div>
          <div>
            {t('pay')}: <strong>%{dokum.pazarPayi}</strong> · {t('musteriDegisim')}: <strong>{formatMusteri(dil, dokum.musteriDegisim, true)}</strong>
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

      {uyariAcik && dokum && (
        <div className="kariyer-sonuc-katman kariyer-sonuc-katman-ust" role="dialog" onClick={() => setUyariAcik(false)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <h4>{t('olayBaslik')}</h4>
            {onemliUyarilar.map((u, i) => (
              <p key={i}>{uyariMetni(u)}</p>
            ))}
            {durum.calisanlar.some((c) => c.riskli) && (
              <p>
                ⚠️ {t('riskli')}: {durum.calisanlar.filter((c) => c.riskli).map((c) => `${c.isim} (${t('yetenek')} ${c.yetenek} · ${t('sadakat')} ${c.sadakat})`).join(', ')}
              </p>
            )}
            <button onClick={() => setUyariAcik(false)}>{t('tamam')}</button>
          </div>
        </div>
      )}
    </section>
  );
}
