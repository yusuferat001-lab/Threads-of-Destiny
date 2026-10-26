import { useEffect, useState } from 'react';
import type { CemaatKararGirdisi, CemaatPolitikaGorunumu, IsletmeGorunumu, IsletmeKararGirdisi, IsletmeUyari, PazarDurumu } from '../types';
import { useDil } from '../DilContext';
import { kt } from '../katalog';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import { IsletmeOrtak } from './IsletmeOrtak';
import { formatPara, formatYuzde, formatMusteri, isaretSinifi } from '../format';

interface Props {
  durum: IsletmeGorunumu;
  pazar?: PazarDurumu | null;
  yukleniyor: boolean;
  onKarar: (hatlar: IsletmeKararGirdisi[], cemaat?: CemaatKararGirdisi) => void;
  onYatirim: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
  /** Telefon ana ekranı sayfaları: yalnız bir bölümü çiz (varsayılan hepsi). */
  bolum?: 'hepsi' | 'isletme' | 'yatirim' | 'calisan';
}

type D = { tr: string; en: string };

const M = {
  baslik: { tr: '⛪ Cemaatin', en: '⛪ Your Congregation' },
  pay: { tr: 'Cemaat payın', en: 'Flock share' },
  inanan: { tr: 'İnananın', en: 'Believers' },
  pazar: { tr: 'Toplam pazar', en: 'Whole market' },
  kisi: { tr: 'kişi', en: 'people' },
  bina: { tr: 'İbadethane', en: 'Sanctuary' },
  kapasite: { tr: 'kapasite', en: 'capacity' },
  gelme: { tr: 'Ayine gelme', en: 'Attendance' },
  gelenTahmin: { tr: 'bu yıl ~', en: 'this year ~' },
  tasma: { tr: 'İbadethane taşıyor: sığmayan inananlar rakibe geçiyor!', en: 'The sanctuary is overflowing: believers who cannot fit drift to your rival!' },
  vergi: { tr: 'Vergi', en: 'Tax' },
  otorite: { tr: 'Şehir yöneticin', en: 'Your city governor' },
  iliski: { tr: 'ilişki', en: 'relation' },
  yil: { tr: '/yıl', en: '/yr' },
  yilKisa: { tr: 'yıl', en: 'yr' },
  donemBaslik: { tr: 'Şu anki dönem', en: 'Current period' },
  pazarBuyume: { tr: 'toplam pazar yılda', en: 'whole market per year' },
  bagisKalemi: { tr: 'Bağış', en: 'Donations' },
  faaliyetKalemi: { tr: 'Faaliyet geliri', en: 'Activity income' },
  toplamGelir: { tr: 'Toplam gelir', en: 'Total income' },
  gFaaliyet: { tr: 'Faaliyet masrafı', en: 'Activity costs' },
  gAyin: { tr: 'Ayin masrafı (bağışın %8\'i)', en: 'Rite costs (8% of donations)' },
  gBina: { tr: 'İbadethane bakımı', en: 'Sanctuary upkeep' },
  gYardim: { tr: 'Yardım harcaması', en: 'Aid spending' },
  gAidat: { tr: 'Teşkilat aidatı (%3)', en: 'Church dues (3%)' },
  gVergi: { tr: 'Vergi', en: 'Tax' },
  beklenenNet: { tr: 'Beklenen net', en: 'Expected net' },
  ekipNot: { tr: 'Çalışan maaşları ayrıca giderinden düşer.', en: 'Staff wages come out of your expenses separately.' },
  bagisYapan: { tr: 'bağış yapan oranı', en: 'giver share' },
  ahlakBaslik: { tr: 'Ahlakın', en: 'Your morality' },
  ahlakNot: { tr: 'İnananların yıllık değişimi ahlakına bağlıdır:', en: 'Your flock changes each year depending on your morality:' },
  fanatik: { tr: 'Fanatiklik', en: 'Zealotry' },
  fanatikNot: {
    tr: 'Yavaş artar. Bağış yapma oranını yükseltir; ama inanan kaçışı, otorite kaybı ve 40\'ın üstünde aşırılık olayı riski getirir.',
    en: 'Rises slowly. Lifts how many give, but brings attrition, lost authority, and extremism incidents above 40.',
  },
  bagisCarpani: { tr: 'bağış yapma oranı', en: 'giving rate' },
  kacis: { tr: 'yıllık inanan kaçışı', en: 'yearly attrition' },
  otoriteKaybi: { tr: 'yıllık otorite kaybı', en: 'yearly authority loss' },
  asiriRisk: { tr: 'yıllık aşırılık olayı şansı', en: 'yearly extremism chance' },
  politikalar: { tr: 'Politikaların', en: 'Your policies' },
  pBagis: { tr: 'Bağış beklentisi', en: 'Donation expectation' },
  pKitle: { tr: 'Vaaz kitlesi', en: 'Sermon audience' },
  pYardim: { tr: 'Yardım harcaması', en: 'Aid spending' },
  pTon: { tr: 'Vaaz tonu', en: 'Sermon tone' },
  faaliyetler: { tr: 'Faaliyetler', en: 'Activities' },
  faaliyetNot: { tr: 'Rütbeyle yeni faaliyet ve yer açılır. Gelir inanan sayına bağlıdır.', en: 'Rank unlocks more activities and slots. Income depends on your flock.' },
  slot: { tr: 'Açık faaliyet', en: 'Open activities' },
  acik: { tr: 'Açık', en: 'Open' },
  kapali: { tr: 'Kapalı', en: 'Closed' },
  rutbeGerek: { tr: 'Rütbe', en: 'Rank' },
  gelirMasraf: { tr: 'Beklenen gelir / masraf', en: 'Expected income / cost' },
  dunya: { tr: 'Dünya', en: 'World' },
  ogretiler: { tr: 'Öğretilerin', en: 'Your doctrines' },
  ogretiYok: { tr: 'Henüz öğreti seçmedin.', en: 'No doctrine chosen yet.' },
  inananDegisim: { tr: 'Yıllık inanan değişimin', en: 'Your yearly flock change' },
  okul: { tr: 'Okul', en: 'School' },
  mezun: { tr: 'yıllık mezun şansı', en: 'yearly graduate chance' },
  asevi: { tr: 'Aşevi', en: 'Soup kitchen' },
  yardimCarpani: { tr: 'yardımın etkisi', en: 'aid effect' },
  dokum: { tr: 'Geçen yılın dökümü', en: "Last year's ledger" },
  ilkYil: { tr: 'Henüz bir yıl geçmedi. Hiçbir şeye dokunmasan da cemaat kendi kendine işler.', en: "A year hasn't passed yet. The congregation carries on even if you touch nothing." },
  net: { tr: 'Eline geçen', en: 'Net to you' },
  musteriDegisim: { tr: 'İnanan değişimi', en: 'Flock change' },
  gelenGercek: { tr: 'Ayine gelen', en: 'Attended' },
  olayBaslik: { tr: 'Geçen yıl cemaatinde olanlar', en: 'What happened in your congregation last year' },
  tamam: { tr: 'Tamam', en: 'OK' },
  imtiyazlar: { tr: 'Aktif imtiyazlar', en: 'Active privileges' },
  savas: { tr: 'Savaş', en: 'War' },
  veba: { tr: 'Salgın', en: 'Plague' },
};

const DONEM_ADLARI: Record<string, D> = {
  bolluk: { tr: 'Bolluk', en: 'Boom' },
  durgunluk: { tr: 'Durgunluk', en: 'Slump' },
  kitlik: { tr: 'Kıtlık', en: 'Famine' },
  savas: { tr: 'Savaş', en: 'War' },
  veba: { tr: 'Salgın', en: 'Plague' },
};
const DONEM_ALAN: { k: 'bagis' | 'tovbe' | 'ritual' | 'sifa' | 'egitim' | 'emanet'; ad: D }[] = [
  { k: 'bagis', ad: { tr: 'bağış', en: 'donations' } },
  { k: 'tovbe', ad: { tr: 'tövbe', en: 'penance' } },
  { k: 'ritual', ad: { tr: 'ayin/cenaze', en: 'rites/funerals' } },
  { k: 'sifa', ad: { tr: 'şifa', en: 'healing' } },
  { k: 'egitim', ad: { tr: 'eğitim', en: 'teaching' } },
  { k: 'emanet', ad: { tr: 'emanet', en: 'relics' } },
];
const GELME_KAYNAK: Record<string, D> = {
  normal: { tr: 'normal', en: 'normal' },
  kitlik: { tr: 'kıtlık', en: 'famine' },
  savas: { tr: 'savaş', en: 'war' },
  veba: { tr: 'salgın — halk evinde kalıyor', en: 'plague — people stay home' },
};
const INANAN_KALEMLERI: Record<string, D> = {
  sohret: { tr: 'Şöhret', en: 'Fame' },
  ahlak: { tr: 'Ahlak bandı', en: 'Morality band' },
  bagis: { tr: 'Bağış politikası', en: 'Donation policy' },
  kitle: { tr: 'Vaaz kitlesi', en: 'Sermon audience' },
  yardim: { tr: 'Yardım', en: 'Aid' },
  faaliyet: { tr: 'Faaliyetler', en: 'Activities' },
  ogreti: { tr: 'Öğretiler', en: 'Doctrines' },
  tanitim: { tr: 'Vaaz ve davet', en: 'Outreach' },
  davetci: { tr: 'Davetçiler', en: 'Outreach workers' },
  yatkinlik: { tr: 'Yatkınlık', en: 'Aptitude' },
  fanatik: { tr: 'Fanatik kaçış', en: 'Zealot attrition' },
};
const IMTIYAZ_ADLARI: Record<string, D> = {
  kutsal_gun_imtiyazi: { tr: 'Kutsal gün pazarı (bağış +%10)', en: 'Holy-day market (donations +10%)' },
  vakif_muafiyeti: { tr: 'Vakıf muafiyeti (masraf −%8)', en: 'Foundation exemption (costs −8%)' },
};
const SALDIRI_SONUCLARI: Record<string, D> = {
  kumbara: { tr: 'kumbaranı boşalttı', en: 'emptied your offering box' },
  muridcalma: { tr: 'müritlerini ayarttı', en: 'lured away your followers' },
  bidat: { tr: 'seni bid\'atçılıkla suçladı', en: 'accused you of heresy' },
  aforoz: { tr: 'seni aforoz ettirmeye çalıştı', en: 'tried to have you excommunicated' },
  yangin: { tr: 'ibadethaneni yaktı', en: 'burned your sanctuary' },
  engizisyon: { tr: 'engizisyon baskısı kurdurdu', en: 'brought the inquisition down on you' },
  nakit: { tr: 'seni zarara uğrattı', en: 'hurt your finances' },
};
const SALDIRI_ENGELLENDI: Record<string, D> = {
  kumbara: { tr: 'kumbaranı boşaltmaya geldi, bekçilerin püskürttü', en: 'came for your offering box; your watchmen drove them off' },
  yangin: { tr: 'ibadethaneni yakmaya geldi, bekçilerin püskürttü', en: 'came to burn your sanctuary; your watchmen drove them off' },
};

let sonGosterilenYil = -1;

export function CemaatPaneli({ durum, pazar, yukleniyor, onKarar, onYatirim, onCalisanAl, onEkipCikar, bolum = 'hepsi' }: Props) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const [uyariAcik, setUyariAcik] = useState(false);
  const c = durum.cemaat;
  const dokum = durum.sonDokum;
  const onemliKodlar: IsletmeUyari['kod'][] = ['sizdirma', 'ic_hirsizlik', 'rakip_saldiri', 'calisan_ayrildi', 'vergi_indirimi_bitti', 'imtiyaz_bitti', 'bina_tasti', 'asiri_olay', 'mezun'];
  const onemliUyarilar = dokum ? dokum.uyarilar.filter((u) => onemliKodlar.includes(u.kod)) : [];
  useEffect(() => {
    if (dokum && onemliUyarilar.length > 0 && dokum.yil !== sonGosterilenYil) {
      sonGosterilenYil = dokum.yil;
      setUyariAcik(true);
    }
  }, [dokum?.yil]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!durum.aktif || !c) return null;
  const pb = durum.paraBirimi;
  const yuzdeMetni = (v: number) => formatYuzde(dil, v, true);
  const donemAdi = DONEM_ADLARI[c.donem.kaynak] ? d(DONEM_ADLARI[c.donem.kaynak]) : '';
  const fanatikRenk = c.fanatiklik >= 60 ? 'var(--s-kotu, #9a2f22)' : c.fanatiklik >= 30 ? '#b8741a' : 'var(--s-altin, #c9a24a)';

  const uyariMetni = (u: IsletmeUyari): string => {
    const en = dil === 'en';
    switch (u.kod) {
      case 'calisan_ayrildi':
        return `🚪 ${u.isim ?? ''}: ${en ? 'quit and took a severance from the offering box' : 'işi bıraktı ve kumbaradan tazminat aldı'}`;
      case 'sizdirma':
        return `🕵️ ${u.isim ?? ''}: ${en ? 'leaked your secrets to the rival; you lost believers' : 'sırlarını rakibe sızdırdı, inanan kaybettin'}`;
      case 'ic_hirsizlik':
        return `🫳 ${u.isim ?? ''}: ${en ? `skimmed the offering box (${formatPara(u.tutar ?? 0)})` : `kumbaradan para çaldı (${formatPara(u.tutar ?? 0)})`}`;
      case 'bina_tasti':
        return en
          ? `⛪ The sanctuary was too small: ${formatMusteri(dil, u.musteriKaybi ?? 0)} believers went to your rival.`
          : `⛪ İbadethane yetmedi: ${formatMusteri(dil, u.musteriKaybi ?? 0)} inanan rakibe geçti.`;
      case 'asiri_olay':
        return en ? '🔥 Your zeal went too far: a scandal cost you fame, authority and believers.' : '🔥 Gayretin ipin ucunu kaçırdı: şöhret, otorite ve inanan kaybettin.';
      case 'mezun':
        return en ? `🎓 A school graduate became a missionary: +${formatMusteri(dil, u.musteriKaybi ?? 0)} believers.` : `🎓 Okuldan bir mezun misyoner oldu: +${formatMusteri(dil, u.musteriKaybi ?? 0)} inanan.`;
      case 'rakip_saldiri': {
        const kim = u.rakip ?? (en ? 'The rival' : 'Rakip');
        const tur = u.sonuc ?? 'nakit';
        if (u.engellendi) return `🛡️ ${kim}: ${d(SALDIRI_ENGELLENDI[tur] ?? SALDIRI_ENGELLENDI.kumbara)}`;
        const kayiplar: string[] = [];
        if (u.musteriKaybi) kayiplar.push(en ? `you lost ${formatMusteri(dil, u.musteriKaybi)} believers` : `${formatMusteri(dil, u.musteriKaybi)} inanan kaybettin`);
        if (u.tutar) kayiplar.push(`${formatPara(u.tutar)} ${pb}`);
        if (u.sohretKaybi) kayiplar.push(en ? `fame −${u.sohretKaybi}` : `şöhret −${u.sohretKaybi}`);
        if (u.ahlakKaybi) kayiplar.push(en ? `morality −${u.ahlakKaybi}` : `ahlak −${u.ahlakKaybi}`);
        if (u.otoriteKaybi) kayiplar.push(en ? `authority −${u.otoriteKaybi}` : `otorite −${u.otoriteKaybi}`);
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

  const politika = (baslik: string, anahtar: keyof CemaatKararGirdisi, p: CemaatPolitikaGorunumu) => {
    const secili = p.secenekler.find((s) => s.id === p.secili) ?? p.secenekler[0];
    return (
      <div className="cemaat-politika" key={anahtar}>
        <div className="isletme-hat-kontrol">
          <strong>{baslik}:</strong>
          {p.secenekler.map((s) => (
            <button
              key={s.id}
              className={p.secili === s.id ? '' : 'ikincil'}
              disabled={yukleniyor}
              title={d(s.aciklama)}
              onClick={() => onKarar([], { [anahtar]: s.id })}
            >
              {d(s.ad)}
            </button>
          ))}
        </div>
        <div className="isletme-fiyat-not">{d(secili.aciklama)}</div>
      </div>
    );
  };

  const donemSatiri = DONEM_ALAN.filter((a) => c.donem.yuzdeler[a.k] !== 0)
    .map((a) => `${d(a.ad)} ${yuzdeMetni(c.donem.yuzdeler[a.k])}`)
    .join(' · ');

  return (
    <section className="isletme-paneli cemaat-paneli">
      {(bolum === 'hepsi' || bolum === 'isletme') && (
        <>
      <h3>{t('baslik')}</h3>

      <div className={`cemaat-donem cemaat-donem-${c.donem.kaynak}`}>
        <strong>
          {t('donemBaslik')}: {donemAdi}
        </strong>
        <span>
          {t('pazarBuyume')} {yuzdeMetni(c.donem.pazarBuyumeYuzde)}
          {' · '}
          {t('gelme')} %{c.gelmeMin}–{c.gelmeMax} ({d(GELME_KAYNAK[c.gelmeKaynagi] ?? GELME_KAYNAK.normal)})
        </span>
        {donemSatiri && <span>{donemSatiri}</span>}
        {c.donem.yuzdeler.yardim !== 0 && <span>{dil === 'en' ? 'aid costs' : 'yardım maliyeti'} {yuzdeMetni(c.donem.yuzdeler.yardim)}</span>}
      </div>

      <div className="isletme-ozet">
        <span>
          ⚖️ {t('pay')}: <strong>{dil === 'en' ? `${formatMusteri(dil, durum.pazarPayi)}%` : `%${formatMusteri(dil, durum.pazarPayi)}`}</strong>
        </span>
        <span>
          👥 {t('inanan')}: <strong>{formatMusteri(dil, c.inanan)}</strong>
          {dokum && dokum.musteriDegisim !== 0 ? <em className={isaretSinifi(dokum.musteriDegisim)}> ({formatMusteri(dil, dokum.musteriDegisim, true)})</em> : null}
        </span>
        <span>
          🌐 {t('pazar')}: <strong>{durum.pazarMusteri} {t('kisi')}</strong>
        </span>
        <span>
          ⛪ {t('bina')}: <strong>{c.kapasite}</strong> {t('kapasite')} · {t('gelme')} {t('gelenTahmin')}
          <strong>{formatMusteri(dil, c.gelenTahmin)}</strong>
        </span>
        <span>
          🧾 {t('vergi')}: <strong>%{Math.round(durum.vergi.oran * 1000) / 10}</strong>
        </span>
        {durum.otorite && (
          <span>
            🏛️ {t('otorite')}: <strong>{kt(dil, durum.otorite)}</strong> · {t('iliski')} {durum.otoriteIliski}
          </span>
        )}
      </div>
      {c.tasmaVar && <div className="cemaat-uyari">{t('tasma')}</div>}

      {durum.imtiyazlar.length > 0 && (
        <div className="isletme-imtiyazlar">
          <strong>{t('imtiyazlar')}:</strong>{' '}
          {durum.imtiyazlar.map((i) => `${IMTIYAZ_ADLARI[i.id] ? d(IMTIYAZ_ADLARI[i.id]) : i.id} (${i.kalanYil} ${t('yilKisa')})`).join(' · ')}
        </div>
      )}

      <h4>{dil === 'en' ? 'Expected income & costs' : 'Beklenen gelir ve giderler'}</h4>
      <div className="isletme-dokum">
        <div>
          {t('bagisKalemi')} ({formatMusteri(dil, c.bagisYapan)} {t('bagisYapan')} %{c.bagisOrani}): <strong>+{formatPara(c.bagis)}</strong>
        </div>
        <div>
          {t('faaliyetKalemi')}: <strong>+{formatPara(c.faaliyetGelir)}</strong>
        </div>
        <div>
          {t('toplamGelir')}: <strong>+{formatPara(c.toplamGelir)}</strong>
        </div>
        <div>{t('gFaaliyet')}: <strong>−{formatPara(c.giderler.faaliyet)}</strong></div>
        <div>{t('gAyin')}: <strong>−{formatPara(c.giderler.ayin)}</strong></div>
        <div>{t('gBina')}: <strong>−{formatPara(c.giderler.bina)}</strong></div>
        <div>{t('gYardim')}: <strong>−{formatPara(c.giderler.yardim)}</strong></div>
        <div>{t('gAidat')}: <strong>−{formatPara(c.giderler.aidat)}</strong></div>
        <div>{t('gVergi')}: <strong>−{formatPara(c.giderler.vergi)}</strong></div>
        <div className="isletme-dokum-net">
          {t('beklenenNet')}: <strong>~{c.beklenenNet >= 0 ? '+' : ''}{formatPara(c.beklenenNet)} {pb}{t('yil')}</strong>
        </div>
        <small>{t('ekipNot')}</small>
      </div>

      <h4>
        {t('ahlakBaslik')}: {c.ahlak.deger}
      </h4>
      <div className="cemaat-bar cemaat-ahlak-bar" aria-label={t('ahlakBaslik')}>
        <div className="cemaat-bar-dolgu" style={{ width: `${c.ahlak.deger}%` }} />
        {[25, 50, 75].map((x) => (
          <i key={x} className="cemaat-bar-cizgi" style={{ left: `${x}%` }} />
        ))}
      </div>
      <div className="cemaat-bantlar">
        {c.ahlak.bantlar.map((b, i) => (
          <span key={i} className={`cemaat-bant${i === c.ahlak.bant ? ' cemaat-bant-aktif' : ''}`}>
            {b.min}–{b.max}: <strong>{yuzdeMetni(Math.round(b.inanan * 1000) / 10)}</strong>
          </span>
        ))}
      </div>
      <div className="isletme-fiyat-not">{t('ahlakNot')}</div>

      <h4>
        {t('fanatik')}: {c.fanatiklik} ({c.fanatiklikDegisim >= 0 ? '+' : ''}
        {c.fanatiklikDegisim}
        {t('yil')})
      </h4>
      <div className="cemaat-bar">
        <div className="cemaat-bar-dolgu" style={{ width: `${c.fanatiklik}%`, background: fanatikRenk }} />
        <i className="cemaat-bar-cizgi" style={{ left: '40%' }} />
      </div>
      <div className="isletme-fiyat-not">
        {t('fanatikNot')}
        <br />
        {t('bagisCarpani')} {yuzdeMetni(c.fanatikEtkisi.bagisCarpani)} · {t('kacis')} −%{c.fanatikEtkisi.yillikKacis} · {t('otoriteKaybi')} −{c.fanatikEtkisi.yillikOtorite} · {t('asiriRisk')} %{c.fanatikEtkisi.asiriRisk}
      </div>

      <h4>{t('politikalar')}</h4>
      {politika(t('pBagis'), 'bagis', c.politikalar.bagis)}
      {politika(t('pKitle'), 'kitle', c.politikalar.kitle)}
      {politika(t('pYardim'), 'yardim', c.politikalar.yardim)}
      {politika(t('pTon'), 'ton', c.politikalar.ton)}

      <h4>
        {t('faaliyetler')} ({t('slot')} {c.faaliyetSlot.kullanilan}/{c.faaliyetSlot.toplam})
      </h4>
      <div className="isletme-fiyat-not">{t('faaliyetNot')}</div>
      <div className="isletme-hatlar">
        {c.faaliyetler.map((f) => (
          <div key={f.id} className={`isletme-hat${f.acik ? ' isletme-hat-acik' : ''}${f.kilitli ? ' isletme-hat-kilitli' : ''}`}>
            <div className="isletme-hat-baslik">
              <strong>
                {f.simge} {d(f.ad)}
              </strong>
              {f.kilitli ? (
                <span className="isletme-etiket">
                  🔒 {t('rutbeGerek')} {f.minRutbe}
                </span>
              ) : (
                <button className={f.acik ? '' : 'ikincil'} disabled={yukleniyor} onClick={() => onKarar([{ id: f.id, acik: !f.acik }])}>
                  {f.acik ? t('acik') : t('kapali')}
                </button>
              )}
            </div>
            <div className="isletme-hat-artieksi">
              <span>{d(f.aciklama)}</span>
            </div>
            <div className="isletme-hat-satir">
              <span>
                {t('gelirMasraf')}:{' '}
                <strong>
                  {formatPara(f.gelir)} / {formatPara(f.masraf)}
                </strong>
              </span>
              {f.dunyaYuzde !== 0 && (
                <span>
                  🌍 {t('dunya')}: {yuzdeMetni(f.dunyaYuzde)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <h4>{t('ogretiler')}</h4>
      {c.ogretiler.secilen.length === 0 ? (
        <p className="isletme-bos">{t('ogretiYok')}</p>
      ) : (
        <div className="isletme-yatirimlar">
          {c.ogretiler.secilen.map((o) => (
            <div key={o.id} className="isletme-yatirim" title={d(o.aciklama)}>
              <strong>
                {o.simge} {d(o.ad)} {o.fanatik ? '⚡' : ''}
              </strong>
              <span>{dil === 'en' ? `Level ${o.seviye}` : `Seviye ${o.seviye}`}</span>
              <small>{d(o.aciklama)}</small>
            </div>
          ))}
        </div>
      )}

      <h4>
        {t('inananDegisim')}: {yuzdeMetni(c.inananToplam)}
        {t('yil')}
      </h4>
      <div className="cemaat-kalemler">
        {c.inananKalemleri
          .filter((k) => k.deger !== 0)
          .map((k) => (
            <span key={k.kod} className={k.deger > 0 ? 'cemaat-arti' : 'cemaat-eksi'}>
              {d(INANAN_KALEMLERI[k.kod] ?? { tr: k.kod, en: k.kod })} {yuzdeMetni(k.deger)}
            </span>
          ))}
      </div>
      <div className="isletme-fiyat-not">
        {c.okul.kademe > 0 && (
          <>
            🏫 {t('okul')}: {t('mezun')} %{c.okul.mezunSansi}.{' '}
          </>
        )}
        {c.asevi.kademe > 0 && (
          <>
            🍲 {t('asevi')}: {t('yardimCarpani')} ×{c.asevi.carpan}.
          </>
        )}
      </div>

      {pazar && pazar.aktif && <PiyasaHaberleri pazar={pazar} sayilarGoster />}

        </>
      )}

      <IsletmeOrtak
        goster={bolum === 'isletme' ? 'yok' : bolum}
        durum={durum}
        yukleniyor={yukleniyor}
        sadakatAdi={{ tr: 'İnanç', en: 'Faith' }}
        riskliAciklama={{ tr: 'İnancı düşük: sırlarını sızdırabilir, kumbarayı yoklayabilir, işi bırakabilir', en: 'Low faith: may leak secrets, skim the offering box or quit' }}
        onYatirim={onYatirim}
        onCalisanAl={onCalisanAl}
        onEkipCikar={onEkipCikar}
      />

      {(bolum === 'hepsi' || bolum === 'isletme') && (
        <>
      <h4>{t('dokum')}</h4>
      {!dokum || !dokum.cemaat ? (
        <p className="isletme-bos">{t('ilkYil')}</p>
      ) : (
        <div className="isletme-dokum">
          <div>
            {t('gelenGercek')}: <strong>{formatMusteri(dil, dokum.cemaat.gelen)}</strong> / {dokum.cemaat.kapasite} ({dokum.cemaat.gelmeOrani * 100}%)
          </div>
          <div>
            {t('bagisKalemi')}: <strong>+{formatPara(dokum.cemaat.bagis)}</strong>
          </div>
          <div>
            {t('faaliyetKalemi')}: <strong>+{formatPara(dokum.satis - dokum.cemaat.bagis)}</strong>
          </div>
          <div>{t('gFaaliyet')} + {dil === 'en' ? 'rites' : 'ayin'}: <strong>−{formatPara(dokum.alim)}</strong></div>
          <div>{t('gBina')}: <strong>−{formatPara(dokum.depoMasrafi)}</strong></div>
          <div>{t('gYardim')}: <strong>−{formatPara(dokum.cemaat.yardim)}</strong></div>
          <div>{t('gAidat')}: <strong>−{formatPara(dokum.loncaAidati)}</strong></div>
          {dokum.vergi > 0 && (
            <div>
              {t('gVergi')} (%{Math.round(dokum.vergiOrani * 1000) / 10}): <strong>−{formatPara(dokum.vergi)}</strong>
            </div>
          )}
          {((dokum.nakitHasar ?? 0) + (dokum.ekstraGider ?? 0)) > 0 && (
            <div>{dil === 'en' ? 'Theft / raid / severance' : 'Hırsızlık / baskın / tazminat'}: <strong className="kademe-dusuk">−{formatPara((dokum.nakitHasar ?? 0) + (dokum.ekstraGider ?? 0))}</strong></div>
          )}
          <div className="isletme-dokum-net">
            {t('net')}: <strong className={isaretSinifi(dokum.net)}>{dokum.net >= 0 ? '+' : ''}{formatPara(dokum.net)} {pb}</strong>
          </div>
          <div>{dil === 'en' ? 'Staff wages (paid separately)' : 'Çalışan maaşları (ayrıca ödenir)'}: <strong className="kademe-dusuk">−{formatPara(dokum.calisanMaasi ?? 0)}</strong></div>
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

      {uyariAcik && dokum && (
        <div className="kariyer-sonuc-katman kariyer-sonuc-katman-ust" role="dialog" onClick={() => setUyariAcik(false)}>
          <div className="kariyer-sonuc-modal" onClick={(e) => e.stopPropagation()}>
            <h4>{t('olayBaslik')}</h4>
            {onemliUyarilar.map((u, i) => (
              <p key={i}>{uyariMetni(u)}</p>
            ))}
            <button onClick={() => setUyariAcik(false)}>{t('tamam')}</button>
          </div>
        </div>
      )}
    </section>
  );
}
