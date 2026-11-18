import { useState, type ReactNode } from 'react';
import type { BirlikGorunumu, BirlikKararGirdisi, BirlikTur, IsletmeGorunumu, IsletmeUyari, PazarDurumu } from '../types';
import { useDil } from '../DilContext';
import { RenkliEtki } from './Renkli';
import { PiyasaHaberleri } from './PiyasaHaberleri';
import { IsletmeOrtak } from './IsletmeOrtak';
import { BilgiNotu } from './BilgiNotu';
import { ButceIkiSutun } from './ButceIkiSutun';
import { GanimetDokumu } from './GanimetDokumu';
import { GucKarsilastirma, KararSatiri } from './KararKabuk';
import { kolOlarak, useKolEtiketi } from './kararKol';
import { isletmeUyariMetni } from './IsletmePaneli';
import { formatPara, isaretSinifi } from '../format';

interface Props {
  durum: IsletmeGorunumu;
  pazar?: PazarDurumu | null;
  yukleniyor: boolean;
  onBirlikKarar: (k: BirlikKararGirdisi) => void;
  onTechizat: (seviye: 'dusuk' | 'orta' | 'yuksek') => void;
  onBirlikSec: (turler: BirlikTur[]) => void;
  onKusatma: (seviye: number) => void;
  onTerhis: (adet: number) => void;
  onKiralik?: (seviye: 'kucuk' | 'buyuk') => void;
  onIkmal?: (id: string) => void;
  onYatirim: (yatirimId: string) => void;
  onYatirimDusur?: (yatirimId: string) => void;
  onCalisanAl: (adayId: string) => void;
  onEkipCikar: (ekipId: string) => void;
  /** Strateji sayfası: hangi bölüm çizilir. */
  bolum: 'isletme' | 'yatirim' | 'calisan';
  /** Ordu sayfasında "durum" hücresinin üstüne konan blok (rütbe kademesi + ilerleme çubukları). */
  ustBlok?: ReactNode;
  /** Yatırım sayfasında üçüncü sütunun altına konan kart (Tefeci/Kredi). */
  yanKart?: ReactNode;
}

type D = { tr: string; en: string };

/** Metinler bileşene gömülü (CemaatPaneli deseni): TR + EN aynı objede. */
const M = {
  baslik: { tr: '🛡️ Ordun', en: '🛡️ Your Army' },
  er: { tr: 'Erin', en: 'Men' },
  guc: { tr: 'Askerî gücün', en: 'Military strength' },
  moral: { tr: 'Ordu morali', en: 'Army morale' },
  talim: { tr: 'Talim / Tecrübe', en: 'Drill / Experience' },
  limit: { tr: 'Komuta limiti', en: 'Command limit' },
  limitNot: { tr: 'kışlanın barındırabildiği er sayısı', en: 'how many men the barracks can house' },
  otorite: { tr: 'Şehir yöneticin', en: 'Your city governor' },
  iliski: { tr: 'ilişki', en: 'relation' },
  rakipGuc: { tr: 'askerî güç', en: 'strength' },
  gucBaslik: { tr: 'Askerî güç dökümü', en: 'Strength breakdown' },
  ham: { tr: 'Ham güç (kalite × er)', en: 'Raw strength (quality × men)' },
  birlikCarpani: { tr: 'Özel birlik çarpanı (saldırı / savunma)', en: 'Special-unit multiplier (attack / defence)' },
  toplamGuc: { tr: 'Toplam güç', en: 'Total strength' },
  gucNot: { tr: 'Güç, yalnız sağlam erlerin saldırı ve savunma ortalamasıdır; yaralılar tedavi sürerken katılmaz.', en: 'Strength is the average of attack and defence of HEALTHY men only; the wounded do not count while they recover.' },
  gorevBaslik: { tr: 'Görevler', en: 'Duties' },
  gorevNot: { tr: 'Aynı anda tek görev yürütülür; ordunun tamamı o göreve çıkar. Kazandıran görev daha çok kayıp verdirir.', en: 'Only one duty runs at a time and your whole army takes it. The better a duty pays, the more it costs.' },
  slot: { tr: 'açık görev', en: 'open duties' },
  minEr: { tr: 'en az', en: 'min' },
  yalnizSavas: { tr: 'yalnız savaşta', en: 'wartime only' },
  gorevAc: { tr: 'Aç', en: 'Open' },
  risk: { tr: 'risk', en: 'risk' },
  riskIpucu: { tr: 'Kazandıran görev daha çok yaralı, ölü ve firar verdirir.', en: 'The better a duty pays, the more wounded, dead and deserters it costs.' },
  gorevKapat: { tr: 'Kapat', en: 'Close' },
  gelir: { tr: 'gelir', en: 'income' },
  ganimet: { tr: 'ganimet', en: 'loot' },
  politikaBaslik: { tr: 'Politikalar', en: 'Policies' },
  ganimetPayi: { tr: 'Ganimet payı (erlere; yalnız haydut, sınır ve savaş ganimeti)', en: 'Loot share (to the men; only bandit, border and war loot)' },
  talimPol: { tr: 'Talim', en: 'Drill' },
  donatimBaslik: { tr: 'Teçhizat', en: 'Equipment' },
  hedefKalite: { tr: 'Yeni erler için hedef', en: 'Target for new men' },
  yukselt: { tr: 'Yükselt', en: 'Upgrade' },
  kilit: { tr: 'Kilit: ~', en: 'Locked: ~' },
  yilKisa: { tr: 'yıl', en: 'yr' },
  birlikBaslik: { tr: 'Özel birlikler', en: 'Special units' },
  maliyetArti: { tr: 'yıllık maliyet', en: 'upkeep' },
  gucEsik: { tr: 'askeri güç', en: 'military strength' },
  toplamPay: { tr: 'toplam pay', en: 'total share' },
  uygula: { tr: 'Uygula', en: 'Apply' },
  kusatma: { tr: 'Kuşatma', en: 'Siege' },
  guclu: { tr: 'Güçlü', en: 'Strong' },
  zayif: { tr: 'Zayıf', en: 'Weak' },
  terhisBaslik: { tr: 'Terhis', en: 'Discharge' },
  terhisNot: { tr: 'Savaşta terhis edemezsin. Savaş bitince seferberlikle gelenler sıradan er olarak kalır; kışla limitini aşanları sen terhis edersin.', en: 'You cannot discharge during a war. When it ends, wartime recruits stay as ordinary men; you discharge anyone over the barracks limit yourself.' },
  yarali: { tr: 'Yaralı', en: 'Wounded' },
  gYarali: { tr: 'Yaralı tedavisi', en: 'Wounded care' },
  gAsim: { tr: 'Limit üstü erlerin ek gideri', en: 'Extra cost of men over the limit' },
  fazla: { tr: 'fazla', en: 'over' },
  terhisEt: { tr: 'Terhis et', en: 'Discharge' },
  doktrinBaslik: { tr: 'Doktrinlerin', en: 'Your doctrines' },
  doktrinYok: { tr: 'Henüz doktrin seçmedin.', en: 'No doctrine chosen yet.' },
  savasBaslik: { tr: 'Savaş durumu', en: 'War status' },
  savasYok: { tr: 'Şu an savaş yok.', en: 'No war right now.' },
  emirBaslik: { tr: 'Komutan emri', en: 'Commander\'s order' },
  kale: { tr: 'Ele geçirilen kale', en: 'Castles held' },
  kiralikTut: { tr: 'Paralı asker tut', en: 'Hire mercenaries' },
  erK: { tr: 'er', en: 'men' },
  pesin: { tr: 'peşin', en: 'up front' },
  yillikUcret: { tr: 'yıllık', en: 'yearly' },
  kiralikVar: { tr: 'Kiralık ordu', en: 'Hired troops' },
  gKiralik: { tr: 'Kiralık ordu', en: 'Hired troops' },
  gKale: { tr: 'Kale geliri', en: 'Castle income' },
  arazi: { tr: 'Arazi', en: 'Terrain' },
  araziIhtimali: { tr: 'arazi seçme ihtimalin', en: 'chance to pick the terrain' },
  kanat: { tr: 'Kanat sonuçları (zafer / yenilgi)', en: 'Wing results (wins / losses)' },
  dusmanTahmin: { tr: 'Düşmanın tahmini gücü', en: 'Estimated enemy strength' },
  kiyasSaldiri: { tr: 'Saldırıdaysan', en: 'If you attack' },
  kiyasSavunma: { tr: 'Savunmadaysan', en: 'If you defend' },
  kiyasNot: { tr: 'Saldırırsan saldırın düşmanın savunmasıyla, savunursan savunman düşmanın saldırısıyla yarışır.', en: 'If you attack, your attack meets their defence; if you defend, your defence meets their attack.' },
  senK: { tr: 'Sen', en: 'You' },
  dusmanK: { tr: 'Düşman', en: 'Enemy' },
  saldiriK: { tr: 'Saldırı', en: 'Attack' },
  savunmaK: { tr: 'Savunma', en: 'Defence' },
  sonSavas: { tr: 'Son karar savaşı', en: 'Last decisive battle' },
  zafer: { tr: 'zafer', en: 'victory' },
  savasYili: { tr: 'Savaş', en: 'War' },
  yilK: { tr: 'yıl', en: 'year' },
  seferberlikAd: { tr: 'Seferberlik', en: 'Mobilisation' },
  ikmalAd: { tr: 'İkmal', en: 'Supply' },
  ikmalDegistir: { tr: 'İkmali değiştir (ücretsiz)', en: 'Change supply (free)' },
  yenilgi: { tr: 'yenilgi', en: 'defeat' },
  dokumBaslik: { tr: 'Beklenen gelir ve giderler', en: 'Expected income & costs' },
  erBasi: { tr: 'Er başı gelir', en: 'Income per man' },
  gorevGeliri: { tr: 'Görev kazancı', en: 'Duty earnings' },
  ganimetNet: { tr: 'Ganimet (net)', en: 'Loot (net)' },
  toplamGelir: { tr: 'Toplam gelir', en: 'Total income' },
  gErMasrafi: { tr: 'Er masrafı', en: 'Upkeep of men' },
  gErzak: { tr: 'Erzak', en: 'Provisions' },
  kazanc: { tr: 'Kazanç', en: 'Earnings' },
  toplamKazanc: { tr: 'Toplam kazanç', en: 'Total earnings' },
  gKisla: { tr: 'Kışla bakımı', en: 'Barracks upkeep' },
  gTechizat: { tr: 'Teçhizat bakımı', en: 'Equipment upkeep' },
  gBirlikBakim: { tr: 'Özel birlik bakımı', en: 'Special unit upkeep' },
  gKusatma: { tr: 'Kuşatma bakımı', en: 'Siege upkeep' },
  gTalim: { tr: 'Talim masrafı', en: 'Drill costs' },
  beklenenNet: { tr: 'Beklenen net', en: 'Expected net' },
  yil: { tr: '/yıl', en: '/yr' },
  gYagma: { tr: 'Yağma', en: 'Plunder' },
  gGanimet: { tr: 'Ganimet', en: 'Loot' },
  gSubay: { tr: 'Subay maaşları', en: 'Officers\' wages' },
  gYasam: { tr: 'Yaşam gideri', en: 'Living costs' },
  gKira: { tr: 'Kira', en: 'Rent' },
  gHayvan: { tr: 'Evcil hayvan', en: 'Pets' },
  gKredi: { tr: 'Kredi taksidi', en: 'Loan instalment' },
  gMulk: { tr: 'Mülk geliri', en: 'Property income' },
  gHazine: { tr: 'Hazine payı', en: 'Treasury share' },
  barisGanimetBaslik: { tr: 'Çatışma zaferinde ganimet', en: 'Loot from a clash victory' },
  sonDokum: { tr: 'Geçen yıl', en: 'Last year' },
  firar: { tr: 'firar', en: 'deserted' },
  olen: { tr: 'kayıp', en: 'lost' },
  devletPayi: { tr: 'devlet payı', en: 'state share' },
  yatirimBaslik: { tr: 'Yatırımlar', en: 'Investments' },
  durumBaslik: { tr: 'Ordu durumu', en: 'Army status' },
  artilar: { tr: 'Artılar', en: 'Pros' },
  eksiler: { tr: 'Eksiler', en: 'Cons' },
  techUyari: { tr: '⚠ Seçtikten sonra 5 yıl boyunca değiştirilemez', en: '⚠ Once chosen, it cannot be changed for 5 years' },
  ganimetUyari: { tr: '⚠ Ganimet payı 5 yılda bir değiştirilebilir', en: '⚠ The loot share can be changed once every 5 years' },
  techKilitli: { tr: '🔒 Değiştirmek için beklemelisin:', en: '🔒 You must wait to change it:' },
  techGuc: { tr: 'Güç', en: 'Strength' },
  techTalim: { tr: 'talim', en: 'drill' },
  techBakim: { tr: 'bakım', en: 'upkeep' },
  techSec: { tr: 'Seç', en: 'Choose' },
  techSecili: { tr: '✓ Seçili', en: '✓ Chosen' },
  techNot: { tr: 'Tüm ordu aynı seviyede donatılır; yeni erler de bu seviyeyle gelir. Geçiş ücretsizdir, bedeli yıllık bakımdır.', en: 'The whole army is kitted out at one level; new men arrive at it too. Switching is free; the cost is yearly upkeep.' },
  yilSonra: { tr: 'yıl', en: 'yr' },
  ekle: { tr: 'Ekle', en: 'Add' },
  terhisBirlik: { tr: 'Terhis', en: 'Disband' },
  birlikHak: { tr: 'Özel birlik hakkın', en: 'Special-unit slots' },
  limitDolu: { tr: 'Rütben en fazla', en: 'Your rank allows only' },
  limitDoluSon: { tr: 'özel birliğe izin veriyor', en: 'special units' },
  kilitTerhis: { tr: '5 yıl kilidi sürüyor', en: '5-year lock is active' },
  birlikNotYeni: { tr: 'Açtığın her birlik ordunun bir bölümünü alır; geçiş ücretini yeni erler kendiliğinden öder. Yeni birlik açmak serbesttir, kapatmak ancak belirli aralıklarla yapılabilir.', en: 'Each unit you open takes a share of the army; the transfer fee is paid as men join. Opening a unit is free any time; disbanding is allowed only at set intervals.' },
  kur: { tr: 'Kur', en: 'Build' },
  yukseltKusatma: { tr: 'Yükselt', en: 'Upgrade' },
  sok: { tr: 'Sök', en: 'Dismantle' },
  kusatmaOzel: { tr: 'Yalnız kale kuşatmasında saldırı bonusu verir; savaş ve çatışma gücüne girmez.', en: 'Adds an attack bonus only when besieging a fort; it does not count in battles or clashes.' },
  seviye: { tr: 'seviye', en: 'level' },
  gelecekYil: { tr: 'Gelecek yıl', en: 'Next year' },
  gucteEtki: { tr: 'güçte', en: 'on strength' },
  moralNot: { tr: 'Moral yıl boyu ganimet payı, talim, görev ve doktrinle değişir; yüksek moral güce katkı verir, düşük moral ceza getirir.', en: 'Morale shifts yearly with loot share, drill, duties and doctrine; high morale adds to strength, low morale costs it.' },
  talimNot: { tr: 'Talim ordunun savaşa hazırlığıdır. Üst sınırını Talim Alanı yatırımı belirler; şu an:', en: 'Drill is how battle-ready the army is. The Drill Ground investment sets its ceiling; right now:' },
  erBasiKisa: { tr: 'er başı', en: 'per man' },
  gGereken: { tr: 'Gereken güç', en: 'Required strength' },
  gMevcut: { tr: 'Şimdiki gücün', en: 'Your strength' },
  gKarsilar: { tr: 'karşılıyor', en: 'met' },
  gEksik: { tr: 'Eksik', en: 'Short by' },
  gGucNot: { tr: 'Güç yalnız görevi açmak içindir; görev geliri er sayısına bağlıdır.', en: 'Strength only unlocks the duty; duty income depends on the number of men.' },
  gHam: { tr: 'Ham', en: 'Raw' },
  gBirlik: { tr: 'birlik', en: 'units' },
  gToplam: { tr: 'toplam', en: 'total' },
  bilgi: { tr: 'Bilgi', en: 'Info' },
};

const BONUS_ETIKET: Record<string, { simge: string; ad: D }> = {
  moral: { simge: '🙂', ad: { tr: 'moral', en: 'morale' } },
  sohret: { simge: '🌟', ad: { tr: 'şöhret', en: 'renown' } },
  otorite: { simge: '🏛️', ad: { tr: 'otorite', en: 'authority' } },
  ahlak: { simge: '⚖️', ad: { tr: 'ahlak', en: 'morality' } },
  sertlik: { simge: '😠', ad: { tr: 'sertlik', en: 'harshness' } },
  ganimet: { simge: '🎁', ad: { tr: 'ganimet', en: 'loot' } },
};

const KALITE_SIMGE: Record<string, string> = { dusuk: '🪓', orta: '⚔️', yuksek: '🗡️' };
const ETKI_ETIKET: Record<string, D> = {
  guc: { tr: 'Güç', en: 'Strength' },
  saldiri: { tr: 'Saldırı', en: 'Attack' },
  savunma: { tr: 'Savunma', en: 'Defence' },
  gelir: { tr: 'Gelir', en: 'Income' },
  ganimet: { tr: 'Ganimet', en: 'Loot' },
  kayip: { tr: 'Kayıp', en: 'Losses' },
  masraf: { tr: 'Masraf', en: 'Costs' },
  moral: { tr: 'Ordu morali', en: 'Army morale' },
  sertlik: { tr: 'Sertlik', en: 'Harshness' },
  ahlak: { tr: 'Ahlak', en: 'Morality' },
  sold: { tr: 'Ödeme', en: 'Pay' }, // yedek: asıl ad çağ+ülkeye göre (odemeAdi) verilir
  otorite: { tr: 'Otorite', en: 'Authority' },
  devsirme: { tr: 'Devşirme', en: 'Recruits' },
  firar: { tr: 'Firar', en: 'Desertion' },
};
/** Doktrin etkilerini kısa çiplere çevirir (kesirler yüzde, moral/sertlik/ahlak/otorite/devşirme düz sayı). */
export function doktrinEtkiMetni(etki: Record<string, number>, dil: 'tr' | 'en', odemeAdi?: string): string[] {
  const duz = new Set(['moral', 'sertlik', 'ahlak', 'otorite', 'devsirme']);
  return Object.entries(etki)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      const ad = k === 'sold' && odemeAdi ? odemeAdi : (ETKI_ETIKET[k] ?? { tr: k, en: k })[dil];
      const sayi = duz.has(k) ? `${v > 0 ? '+' : '−'}${String(Math.abs(Math.round(v * 10) / 10)).replace('.', dil === 'tr' ? ',' : '.')}` : `${v > 0 ? '+' : '−'}${Math.abs(Math.round(v * 100))}%`;
      return `${ad} ${sayi}`;
    });
}


/** Doktrin etkilerini yeşil/kırmızı rozetlere çevirir (kayıp, masraf, firar, sertlik artarsa kötüdür). */
/** `odemeAdi`: oyuncunun ülkesindeki ödeme adı (Ulûfe, Löhnung…); verilmezse genel 'Ödeme'. */
export function DoktrinEtkiSatiri({ etki, dil, odemeAdi, cip }: { etki: Record<string, number>; dil: 'tr' | 'en'; odemeAdi?: string; cip?: boolean }) {
  const tersi = new Set(['kayip', 'masraf', 'firar', 'sertlik']);
  const metinler = doktrinEtkiMetni(etki, dil, odemeAdi);
  const anahtarlar = Object.entries(etki).filter(([, v]) => v).map(([k, v]) => ({ k, iyi: tersi.has(k) ? v < 0 : v > 0 }));
  return (
    <>
      {metinler.map((m, i) => (
        <span key={i} className={`${anahtarlar[i]?.iyi ? 's-arti' : 's-eksi'}${cip ? ' kk-cip' : ''}`}>
          {!cip && i > 0 ? ' · ' : ''}
          {m}
        </span>
      ))}
    </>
  );
}

export function BirlikPaneli({
  durum,
  pazar,
  yukleniyor,
  onBirlikKarar,
  onTechizat,
  onBirlikSec,
  onKusatma,
  onTerhis,
  onKiralik,
  onIkmal,
  onYatirim,
  onYatirimDusur,
  onCalisanAl,
  onEkipCikar,
  bolum,
  ustBlok,
  yanKart,
}: Props) {
  const { dil } = useDil();
  const t = (k: keyof typeof M) => M[k][dil];
  const d = (m: D) => m[dil];
  const kolEtiketi = useKolEtiketi();
  const b: BirlikGorunumu | null = durum.birlik;
  const pb = durum.paraBirimi;
  const erBirim = dil === 'en' ? '/man' : '/er';
  const [terhis, setTerhis] = useState(1);
  // Görev kartında asgari güç hesabı açık olan görev (tek kart).
  const [gucAcik, setGucAcik] = useState<string | null>(null);
  // Moral / Talim kartındaki "!" notu: kutu kartların altında tam genişlikte açılır.
  const [kartNot, setKartNot] = useState<'moral' | 'talim' | null>(null);
  // Politika ayrıntısı: üzerine gelinen (ya da seçili) seçeneğin artı/eksileri gösterilir.
  const [onizle, setOnizle] = useState<Record<string, string | null>>({});

  if (!durum.aktif || !b) return null;
  const dokum = durum.sonDokum;
  const uyariMetni = (u: IsletmeUyari): string => isletmeUyariMetni(u, durum, dil);
  const yuzdeMetni = (v: number, isaretli = true) => {
    const isaret = isaretli && v > 0 ? '+' : v < 0 ? '−' : '';
    return dil === 'en' ? `${isaret}${Math.abs(v)}%` : `${isaret}%${Math.abs(v)}`;
  };
  const sayi = (x: number) => (dil === 'en' ? String(x) : String(x).replace('.', ','));
  const isaretliSayi = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${sayi(Math.abs(x))}`;
  /** Gelecek yıl değişimi: işaretli, 1 ondalık (+2,0 / −1,5); sıfır "0,0". */
  const degisimMetni = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(x).toFixed(1).replace('.', dil === 'en' ? '.' : ',')}`;
  const degisimSinifi = (x: number) => (x > 0 ? 's-arti' : x < 0 ? 's-eksi' : 's-durum');
  const moralCubuk = b.moral.deger < 30 ? 'dusuk' : b.moral.deger >= 70 ? 'yuksek' : '';

  /** Üç seçenekli politika: seçici düğmeler + seçili/üzerine gelinen seçeneğin ✓ artı / ✗ eksi listesi. */
  const politika = <T extends string>(
    anahtar: string,
    baslik: string,
    secili: T,
    secenekler: { id: T; ad: D; arti: D[]; eksi: D[] }[],
    onSec: (id: T) => void,
    kilit?: { kalanYil: number; uyari: string; kilitli: string }
  ) => {
    const gosterilen = secenekler.find((s) => s.id === (onizle[anahtar] ?? secili)) ?? secenekler[0];
    return (
      <div className="ordu-politika">
        <div className="ordu-politika-baslik">{baslik}</div>
        <div className="ordu-politika-secici" onMouseLeave={() => setOnizle({ ...onizle, [anahtar]: null })}>
          {secenekler.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.id === secili ? 'ordu-politika-secili' : 'ikincil'}
              disabled={yukleniyor || s.id === secili || (kilit?.kalanYil ?? 0) > 0}
              onClick={() => onSec(s.id)}
              onMouseEnter={() => setOnizle({ ...onizle, [anahtar]: s.id })}
              onFocus={() => setOnizle({ ...onizle, [anahtar]: s.id })}
            >
              {d(s.ad)}
            </button>
          ))}
        </div>
        {kilit && (
          <div className={`techizat-uyari${kilit.kalanYil > 0 ? ' techizat-uyari-kilit' : ''}`}>
            {kilit.kalanYil > 0 ? `${kilit.kilitli} ${kilit.kalanYil} ${t('yilSonra')}` : kilit.uyari}
          </div>
        )}
        <div className="ordu-politika-detay">
          <ul className="ordu-arti" aria-label={t('artilar')}>
            {gosterilen.arti.map((x, i) => (
              <li key={i}>{d(x)}</li>
            ))}
          </ul>
          <ul className="ordu-eksi" aria-label={t('eksiler')}>
            {gosterilen.eksi.map((x, i) => (
              <li key={i}>{d(x)}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const seciliTurler = b.birlik.seciliTurler;
  const birlikKilitli = b.birlik.kilitKalanYil > 0;
  const limitDolu = seciliTurler.length >= b.birlik.limit;
  const kilitli = b.kalite.kilitKalanYil > 0;
  const kusatma = b.birlik.kusatma;

  // ── Görevler (Ordu sayfasında, sağ sütun) ──
  const gorevlerBlok = (
    <div className="sayfa-blok blok-gorev-liste">
      <h4>
        {t('gorevBaslik')}
        <BilgiNotu etiket={t('bilgi')} metin={t('gorevNot')} />
      </h4>
      <div className="gorev-liste">
        {b.gorevler.katalog.map((g) => {
          const secili = b.gorevler.secili.includes(g.id);
          return (
            <div key={g.id} className={`gorev-kart${secili ? ' gorev-kart-acik' : ''}${!g.kullanilabilir ? ' gorev-kart-kilitli' : ''}`} title={d(g.aciklama)}>
              <div className="gorev-kart-ust">
                <strong>
                  {g.simge} {d(g.ad)}
                </strong>
                {!g.kullanilabilir ? (
                  <span className="isletme-etiket">⚔️ {t('yalnizSavas')}</span>
                ) : (
                  <button
                    className={secili ? '' : 'ikincil'}
                    disabled={yukleniyor}
                    onClick={() => onBirlikKarar({ gorevler: secili ? [] : [g.id] })}
                  >
                    {secili ? t('gorevKapat') : t('gorevAc')}
                  </button>
                )}
              </div>
              <small>
                <button type="button" className="gorev-esik" aria-expanded={gucAcik === g.id} onClick={() => setGucAcik(gucAcik === g.id ? null : g.id)}>
                  {t('minEr')} {g.minGuc} {t('gucEsik')}
                </button>{' '}
                · <span title={t('riskIpucu')}>{t('risk')} {'●'.repeat(g.risk)}{'○'.repeat(Math.max(0, 5 - g.risk))}</span> · {t('erBasiKisa')} <span className="s-gelir">{formatPara(g.erBasi)}</span>
                {g.aktif ? <span className="s-gelir"> · {formatPara(g.gelir)} {pb}{g.ganimet > 0 ? ` + ${t('ganimet')} ${formatPara(g.ganimet)}` : ''}</span> : null}
              </small>
              {g.bonuslar.length > 0 && (
                <div className="gorev-rozetler">
                  {g.bonuslar.map((x) => {
                    const iyi = x.kod === 'sertlik' ? x.yon < 0 : x.yon > 0;
                    return (
                      <span key={x.kod} className={iyi ? 's-arti' : 's-eksi'}>
                        {BONUS_ETIKET[x.kod].simge} {BONUS_ETIKET[x.kod].ad[dil]} {x.yon > 0 ? '▲' : '▼'}
                      </span>
                    );
                  })}
                </div>
              )}
              {gucAcik === g.id && (
                <div className="gorev-guc-hesap">
                  <div>
                    {t('gGereken')}: <strong className="s-esik">{g.minGuc}</strong> · {t('gMevcut')}: <strong className="s-durum">{b.guc.toplam}</strong>{' '}
                    {b.guc.toplam >= g.minGuc ? (
                      <strong className="s-arti">✓ {t('gKarsilar')}</strong>
                    ) : (
                      <strong className="s-eksi">
                        {t('gEksik')} {g.minGuc - b.guc.toplam} ≈ {Math.ceil((g.minGuc - b.guc.toplam) / Math.max(0.1, b.guc.toplam / Math.max(1, b.er)))} {t('erK')}
                      </strong>
                    )}
                  </div>
                  <div>
                    {t('gHam')} <strong>{b.guc.ham}</strong> → {t('gBirlik')} ×{b.guc.saldiriCarpani} / ×{b.guc.savunmaCarpani}
                    {b.guc.bonuslar.length > 0 ? ` → ${b.guc.bonuslar.map((x) => `${d(x.ad)} ${yuzdeMetni(x.yuzde)}`).join(' · ')}` : ''} → {t('gToplam')} <strong>{b.guc.toplam}</strong>
                  </div>
                  <small>{t('gGucNot')}</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Ordu sayfası ──
  const orduSayfasi = (
    <div className="sayfa-izgara ordu-izgara">
      <div className="sayfa-sutun ordu-kol">
        <div className="sayfa-blok blok-durum">
          {ustBlok}
          <h4>{t('durumBaslik')}</h4>
          <div className="ordu-satirlar isletme-ozet">
            <span title={t('limitNot')}>
              🪖 {t('er')}: <strong>{b.er}</strong> / <strong className="s-esik">{b.limit.komuta}</strong>
              {dokum && dokum.musteriDegisim !== 0 ? <em className={isaretSinifi(dokum.musteriDegisim)}> ({dokum.musteriDegisim > 0 ? '+' : ''}{dokum.musteriDegisim})</em> : null}
              {b.limit.asim > 0 ? <em className="negatif"> (+{b.limit.asim} {t('fazla')})</em> : null}
            </span>
            {b.yarali.sayi > 0 && (
              <span>
                🩹 {t('yarali')}: <strong>{b.yarali.sayi}</strong>
              </span>
            )}
          </div>
          <div className="ordu-kartlar">
            <div className="ordu-kart">
              <span className="ordu-kart-etiket">🙂 {t('moral')}<BilgiNotu etiket={t('bilgi')} acik={kartNot === 'moral'} onDegis={(a) => setKartNot(a ? 'moral' : null)} /></span>
              <b className="ordu-kart-deger s-durum">{b.moral.deger}</b>
              <span className="ordu-kart-cubuk" aria-hidden="true"><i className={moralCubuk} style={{ width: `${Math.max(0, Math.min(100, b.moral.deger))}%` }} /></span>
              <span className="ordu-kart-alt">
                {t('gelecekYil')} <strong className={degisimSinifi(b.moral.gelecek)}>{degisimMetni(b.moral.gelecek)}</strong>
                <br />
                {t('gucteEtki')} <strong className={b.moral.gucYuzde >= 0 ? 's-arti' : 's-eksi'}>{yuzdeMetni(b.moral.gucYuzde)}</strong>
              </span>
            </div>
            <div className="ordu-kart">
              <span className="ordu-kart-etiket">🎖️ {dil === 'en' ? 'Drill' : 'Talim'}<BilgiNotu etiket={t('bilgi')} acik={kartNot === 'talim'} onDegis={(a) => setKartNot(a ? 'talim' : null)} /></span>
              <b className="ordu-kart-deger s-durum">{Math.round(b.talim.seviye)}</b>
              <span className="ordu-kart-cubuk" aria-hidden="true"><i style={{ width: `${Math.max(0, Math.min(100, b.talim.seviye))}%` }} /></span>
              <span className="ordu-kart-alt">
                {t('gelecekYil')} <strong className={degisimSinifi(b.talim.gelecek)}>{degisimMetni(b.talim.gelecek)}</strong>
                <br />
                {t('gucteEtki')} <strong className={b.talim.gucYuzde >= 0 ? 's-arti' : 's-eksi'}>{yuzdeMetni(b.talim.gucYuzde)}</strong>
              </span>
            </div>
            <div className="ordu-kart">
              <span className="ordu-kart-etiket">💪 {t('guc')}</span>
              <b className="ordu-kart-deger s-durum">{b.guc.toplam}</b>
              <span className="ordu-kart-alt">⚔️ {b.guc.saldiri} · 🛡️ {b.guc.savunma}</span>
            </div>
          </div>
          {kartNot && (
            <span role="note" className="bilgi-notu-metin">
              {kartNot === 'moral' ? t('moralNot') : <>{t('talimNot')} <strong className="s-esik">{b.talim.limit}</strong></>}
            </span>
          )}
        </div>
        <div className="sayfa-sutun blok-yan1">
          <div className="sayfa-blok blok-guc">
            <h4>{t('gucBaslik')}<BilgiNotu etiket={t('bilgi')} metin={t('gucNot')} /></h4>
            <div className="isletme-dokum">
              <div>
                {t('ham')}: <strong>{b.guc.ham}</strong>
                <small>
                  {' '}
                  ({(['dusuk', 'orta', 'yuksek'] as const).filter((k) => b.kalite.sayilar[k] > 0).map((k) => `${KALITE_SIMGE[k]} ${b.kalite.sayilar[k]}×${b.guc.kaliteCarpani[k]}`).join(' · ')})
                </small>
              </div>
              <div>
                {t('birlikCarpani')}: <strong>×{b.guc.saldiriCarpani} / ×{b.guc.savunmaCarpani}</strong>
              </div>
              {b.guc.bonuslar.map((x) => (
                <div key={x.kod + x.taraf} className={x.yuzde >= 0 ? 'cemaat-arti' : 'cemaat-eksi'}>
                  {d(x.ad)}: <strong>{yuzdeMetni(x.yuzde)}</strong>
                </div>
              ))}
              <div className="isletme-dokum-net">
                {t('toplamGuc')}: <strong>{b.guc.toplam}</strong> <small>(⚔️ {b.guc.saldiri} · 🛡️ {b.guc.savunma})</small>
              </div>
            </div>
          </div>
          <div className="sayfa-blok blok-doktrin">
            <h4>{t('doktrinBaslik')}</h4>
            {b.doktrin.secilen.length === 0 ? (
              <p className="isletme-bos">{t('doktrinYok')}</p>
            ) : (
              <div className="kk-liste kk-kucuk">
                {b.doktrin.secilen.map((o) => {
                  const kol = kolOlarak(o.kaynak);
                  return (
                    <KararSatiri
                      key={o.id}
                      kol={kol}
                      simge={o.simge}
                      dal={`${kolEtiketi(kol)} · ${dil === 'en' ? `Lv.${o.seviye}` : `Sv.${o.seviye}`}`}
                      ad={d(o.ad)}
                      cipler={<DoktrinEtkiSatiri etki={o.etki} dil={dil} odemeAdi={d(b.hesap.soldAdi)} cip />}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>


      </div>
      <div className="sayfa-sutun ordu-kol">

        <div className="sayfa-blok blok-pol">
          <h4>{t('politikaBaslik')}</h4>
          {politika(
            'ganimet',
            t('ganimetPayi'),
            b.politikalar.ganimetPayi.secili,
            b.politikalar.ganimetPayi.secenekler,
            (id) => onBirlikKarar({ ganimet_payi: id }),
            { kalanYil: b.politikalar.ganimetPayi.kilitKalanYil, uyari: t('ganimetUyari'), kilitli: t('techKilitli') }
          )}
          {politika('talim', t('talimPol'), b.talim.politika, b.talim.politikalar, (id) => onBirlikKarar({ talim: id }))}
        </div>
        <div className="sayfa-blok blok-butce">
          <h4>{t('dokumBaslik')}</h4>
          <ButceIkiSutun kalemler={durum.butce.kalemler} kazanc={durum.butce.kazanc} paraBirimi={pb} />
          {b.hesap.barisGanimetBrut > 0 && (
            <GanimetDokumu
              baslik={t('barisGanimetBaslik')}
              brut={b.hesap.barisGanimetBrut}
              erPayi={b.hesap.barisGanimetErPayi}
              oran={b.hesap.barisGanimetPayOrani}
              net={b.hesap.barisGanimetTahmini}
              paraBirimi={pb}
            />
          )}
          {dokum && dokum.birlik && (
            <div className="isletme-dokum">
              <div>
                {t('sonDokum')} ({dokum.yil}): 🪖 {dokum.musteri} · {dokum.birlik.firar} {t('firar')} · {dokum.birlik.olen} {t('olen')} · {t('gGanimet')} {formatPara(dokum.birlik.ganimetPara)}{(dokum.birlik.yagmaPara ?? 0) > 0 ? ` · ${t('gYagma')} ${formatPara(dokum.birlik.yagmaPara ?? 0)}` : ''}
              </div>
              {dokum.uyarilar.map((u, i) => {
                const sm = uyariMetni(u);
                return sm ? <div key={i}><RenkliEtki metin={sm} /></div> : null;
              })}
            </div>
          )}
        </div>

      </div>
      <div className="sayfa-sutun ordu-kol">
        <div className={`sayfa-sutun blok-gorev${b.savas.aktif ? ' savas-aktif' : ''}`}>
          {gorevlerBlok}
          <div className="sayfa-blok blok-savas">
            <h4>{t('savasBaslik')}</h4>
            {!b.savas.aktif ? (
              <p className="isletme-bos">{t('savasYok')}</p>
            ) : (
              <div className="isletme-ozet">
                {b.savas.araziAd && (
                  <span>
                    🏞️ {t('arazi')}: <strong>{d(b.savas.araziAd)}</strong>
                  </span>
                )}
                <span>
                  ⚔️ {t('kanat')}: <strong>{b.savas.kanatZafer} / {b.savas.kanatYenilgi}</strong>
                </span>
                {(() => {
                  const k = b.savas.kiyas;
                  const renk = (sen: number, a: [number, number]) => (sen > a[1] ? 's-arti' : sen < a[0] ? 's-eksi' : 's-durum');
                  return (
                    <>
                      <GucKarsilastirma ben={k.oyuncu} dusman={k.dusman} dusmanTur={b.savas.dusmanTur} renk={renk} />
                      <BilgiNotu etiket={t('bilgi')} metin={t('kiyasNot')} />
                      {k.son && (
                        <span>
                          📜 {t('sonSavas')} ({k.son.yil}): {k.son.inisiyatif === 'saldiri' ? '⚔️' : '🛡️'} <strong>{k.son.oyuncuGuc}</strong> ↔ <strong>{k.son.dusmanGuc}</strong> →{' '}
                          <strong className={k.son.genelZafer ? 's-arti' : 's-eksi'}>{k.son.genelZafer ? t('zafer') : t('yenilgi')}</strong>
                        </span>
                      )}
                    </>
                  );
                })()}
                {b.emir && (
                  <span title={d(b.emir.aciklama)}>
                    {b.emir.simge} {t('emirBaslik')}: <strong>{d(b.emir.ad)}</strong>
                  </span>
                )}
                {b.savas.plan && (
                  <>
                    <span>
                      📅 {t('savasYili')}: <strong>{b.savas.plan.yil}/{b.savas.plan.toplamYil}. {t('yilK')}</strong>
                    </span>
                    {b.savas.plan.seferberlik && (
                      <span title={d(b.savas.plan.seferberlik.aciklama)}>
                        🎖️ {t('seferberlikAd')}: <strong>{d(b.savas.plan.seferberlik.ad)}</strong>
                      </span>
                    )}
                    {b.savas.plan.ikmal && (
                      <span title={d(b.savas.plan.ikmal.aciklama)}>
                        🍞 {t('ikmalAd')}: <strong>{d(b.savas.plan.ikmal.ad)}</strong> — <small>{d(b.savas.plan.ikmal.aciklama)}</small>
                      </span>
                    )}
                    {onIkmal && b.savas.plan.ikmal && (
                      <span className="savas-ikmal-sec">
                        <small>{t('ikmalDegistir')}:</small>{' '}
                        {b.savas.plan.ikmalSecenekleri.map((o) => (
                          <button key={o.id} type="button" className="ikincil" disabled={yukleniyor || o.id === b.savas.plan!.ikmal!.id} title={d(o.aciklama)} onClick={() => onIkmal(o.id)}>
                            {d(o.ad)}
                          </button>
                        ))}
                      </span>
                    )}
                  </>
                )}
                {b.kiralik.aktif && (
                  <span>
                    🗡️ {t('kiralikVar')}: <strong>{b.kiralik.er}</strong>
                  </span>
                )}
                {onKiralik && b.kiralik.mumkun && (
                  <span className="savas-ikmal-sec">
                    <small>{t('kiralikTut')}:</small>{' '}
                    {b.kiralik.seviyeler.map((sv) => (
                      <button key={sv.id} type="button" className="ikincil" disabled={yukleniyor} onClick={() => onKiralik(sv.id)}>
                        {d(sv.ad)} · +{sv.er} {t('erK')} · {t('guc')} {sv.gucOnce} → {sv.gucSonra} · {t('pesin')} {formatPara(sv.pesin)} {pb} · {t('yillikUcret')} {formatPara(sv.yillik)} {pb}
                      </button>
                    ))}
                  </span>
                )}
              </div>
            )}
            {b.kale > 0 && (
              <div className="isletme-ozet">
                <span>
                  🏰 {t('kale')}: <strong>{b.kale}</strong>
                </span>
              </div>
            )}
            {pazar && pazar.aktif && <PiyasaHaberleri pazar={pazar} sayilarGoster={false} meslek="Asker" />}
          </div>
        </div>

      </div>
    </div>
  );

  // ── Yatırım sayfası: Teçhizat · Özel birlikler + Kuşatma · Yatırımlar + Kredi ──
  const techizatBlok = (
    <div className="sayfa-blok blok-techizat">
      <h4>{t('donatimBaslik')}: {d(b.kalite.techizat)}</h4>
      <div className={`techizat-uyari${kilitli ? ' techizat-uyari-kilit' : ''}`}>
        {kilitli ? `${t('techKilitli')} ${b.kalite.kilitKalanYil} ${t('yilSonra')}` : t('techUyari')}
      </div>
      <div className="techizat-kartlar">
        {b.kalite.seviyeler.map((sv) => {
          const secili = b.kalite.hedef === sv.id;
          return (
            <div key={sv.id} className={`techizat-kart${secili ? ' techizat-kart-secili' : ''}`}>
              <div className="techizat-kart-ust">
                <strong>
                  {KALITE_SIMGE[sv.id]} {d(b.kalite.adlar[sv.id])}
                </strong>
                <button type="button" className={secili ? '' : 'ikincil'} disabled={yukleniyor || kilitli || secili} onClick={() => onTechizat(sv.id)}>
                  {secili ? t('techSecili') : t('techSec')}
                </button>
              </div>
              <div className="techizat-kart-etki">
                <span>
                  {t('techGuc')} <b>×{sayi(sv.carpan)}</b>
                </span>
                <span>
                  {t('moral')} <b className={sv.moral > 0 ? 's-arti' : sv.moral < 0 ? 's-eksi' : ''}>{isaretliSayi(sv.moral)}{dil === 'en' ? '/yr' : '/yıl'}</b>
                </span>
                <span>
                  {t('techTalim')} <b>×{sayi(sv.talim)}</b>
                </span>
              </div>
              <div className="techizat-kart-masraf">
                {t('techBakim')}: {formatPara(sv.bakim)} {pb}
                {erBirim} · <b>{formatPara(sv.bakimToplam)} {pb}{t('yil')}</b>
              </div>
            </div>
          );
        })}
      </div>
      <div className="isletme-fiyat-not">{t('donatimBaslik')}<BilgiNotu etiket={t('bilgi')} metin={t('techNot')} /></div>
    </div>
  );

  const birlikBlok = (
    <div className="sayfa-blok blok-birlik">
      <h4>{t('birlikBaslik')}</h4>
      <div className="birlik-hak">
        {t('birlikHak')}: <strong className="s-esik">{seciliTurler.length}/{b.birlik.limit}</strong>
        {birlikKilitli && <small> · 🔒 {b.birlik.kilitKalanYil} {t('yilSonra')} — {t('kilitTerhis')}</small>}
        {limitDolu && (
          <small>
            {' '}
            · {t('limitDolu')} {b.birlik.limit} {t('limitDoluSon')}
          </small>
        )}
      </div>
      <div className="birlik-kartlar">
        {b.birlik.turler.map((tur) => {
          const acik = seciliTurler.includes(tur.id);
          return (
            <div key={tur.id} className={`birlik-kart${acik ? ' birlik-kart-acik' : ''}`}>
              <div className="birlik-kart-ust">
                <strong>
                  {tur.simge} {d(tur.ad)}
                </strong>
                {acik ? (
                  <button type="button" className="ikincil" disabled={yukleniyor || birlikKilitli} title={birlikKilitli ? t('kilitTerhis') : ''} onClick={() => onBirlikSec(seciliTurler.filter((x) => x !== tur.id))}>
                    {t('terhisBirlik')}
                  </button>
                ) : (
                  <button type="button" disabled={yukleniyor || limitDolu} title={limitDolu ? `${t('limitDolu')} ${b.birlik.limit} ${t('limitDoluSon')}` : ''} onClick={() => onBirlikSec([...seciliTurler, tur.id])}>
                    {t('ekle')}
                  </button>
                )}
              </div>
              <div className="birlik-kart-etki">
                ⚔️ ×{tur.saldiri} · 🛡️ ×{tur.savunma} · <span className="s-gider">{formatPara(tur.ucret)} {pb}{erBirim}</span> · {t('maliyetArti')} <span className="s-gider">+{formatPara(tur.bakim)} {pb}{erBirim}</span>
              </div>
              <div className="birlik-arazi">
                {tur.guclu.length > 0 && <span className="s-arti">▲ {t('guclu')}: {tur.guclu.map(d).join(', ')}</span>}
                {tur.zayif.length > 0 && <span className="s-eksi">▼ {t('zayif')}: {tur.zayif.map(d).join(', ')}</span>}
              </div>
              <small>
                ＋ {d(tur.arti)} · － {d(tur.eksi)}
              </small>
            </div>
          );
        })}
        {b.birlik.kusatmaAcik && (
        <div className={`birlik-kart birlik-kart-kusatma${kusatma.seviye > 0 ? ' birlik-kart-acik' : ''}`}>
          <div className="birlik-kart-ust">
            <strong>
              🏰 {d(kusatma.ad)}
            </strong>
            <span className="birlik-kusatma-dugmeler">
              {kusatma.seviye < 2 && (
                <button type="button" disabled={yukleniyor} onClick={() => onKusatma(kusatma.seviye + 1)} title={`${formatPara(kusatma.fiyatlar[kusatma.seviye + 1] ?? 0)} ${pb}`}>
                  {kusatma.seviye === 0 ? t('kur') : t('yukseltKusatma')}
                </button>
              )}
              {kusatma.seviye > 0 && (
                <button type="button" className="ikincil" disabled={yukleniyor} onClick={() => onKusatma(0)}>
                  {t('sok')}
                </button>
              )}
            </span>
          </div>
          <div className="birlik-kart-etki">
            {t('seviye')} {kusatma.seviye}/2 · +%{Math.round((kusatma.bonuslar[kusatma.seviye] ?? 0) * 100)}
            {kusatma.seviye < 2 ? <> → +%{Math.round((kusatma.bonuslar[kusatma.seviye + 1] ?? 0) * 100)} (<span className="s-gider">{formatPara(kusatma.fiyatlar[kusatma.seviye + 1] ?? 0)} {pb}</span>)</> : ''}
          </div>
          <small>{t('kusatma')}<BilgiNotu etiket={t('bilgi')} metin={t('kusatmaOzel')} /></small>
        </div>
        )}
      </div>
      <div className="isletme-fiyat-not">{t('birlikBaslik')}<BilgiNotu etiket={t('bilgi')} metin={t('birlikNotYeni')} /></div>
    </div>
  );

  const terhisBlok = (
    <div className="sayfa-blok blok-terhis">
      <h4>{t('terhisBaslik')}</h4>
      <div className="isletme-fiyat-not terhis-not">{t('terhisBaslik')}<BilgiNotu etiket={t('bilgi')} metin={t('terhisNot')} /></div>
      <div className="isletme-fiyat-satir">
        <input type="number" min={1} max={Math.max(1, b.er - 6)} value={terhis} onChange={(e) => setTerhis(Math.max(1, Math.floor(Number(e.target.value) || 1)))} className="isletme-sayi-giris" />{' '}
        <button className="ikincil" disabled={yukleniyor || b.savas.aktif || b.er - 6 < 1} onClick={() => onTerhis(terhis)}>
          {t('terhisEt')}
        </button>
      </div>
    </div>
  );

  const yatirimSayfasi = (
    <div className="sayfa-izgara asker-yatirim-izgara">
      <div className="sayfa-sutun sutun-techizat">
        {techizatBlok}
        {terhisBlok}
        {yanKart}
      </div>
      <div className="sayfa-sutun sutun-birlik">{birlikBlok}</div>
      <div className="sayfa-sutun sutun-yatirim">
        <IsletmeOrtak
          goster="yatirim"
          durum={durum}
          yukleniyor={yukleniyor}
          sadakatAdi={{ tr: 'Sadakat', en: 'Loyalty' }}
          riskliAciklama={{ tr: 'Sadakati düşük: sırlarını sızdırabilir, erleri ayartabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, lure men away or quit' }}
          onYatirim={onYatirim}
          onYatirimDusur={onYatirimDusur}
          onCalisanAl={onCalisanAl}
          onEkipCikar={onEkipCikar}
        />
      </div>
    </div>
  );

  return (
    <section className="isletme-paneli birlik-paneli">
      {bolum === 'isletme' && orduSayfasi}
      {bolum === 'yatirim' && yatirimSayfasi}
      {bolum === 'calisan' && (
        <IsletmeOrtak
          goster="calisan"
          durum={durum}
          yukleniyor={yukleniyor}
          sadakatAdi={{ tr: 'Sadakat', en: 'Loyalty' }}
          riskliAciklama={{ tr: 'Sadakati düşük: sırlarını sızdırabilir, erleri ayartabilir, işi bırakabilir', en: 'Low loyalty: may leak secrets, lure men away or quit' }}
          onYatirim={onYatirim}
          onYatirimDusur={onYatirimDusur}
          onCalisanAl={onCalisanAl}
          onEkipCikar={onEkipCikar}
        />
      )}
    </section>
  );
}
