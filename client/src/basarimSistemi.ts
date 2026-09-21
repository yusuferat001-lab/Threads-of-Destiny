/**
 * Gerçek başarım sistemi. `basarimlar.ts` (olaylardan gelen ünvan + efsanevi ölüm
 * koleksiyonu) hâlâ ham depo olarak korunur; bu dosya onun ÜSTÜNE biner:
 *
 *  - Adlandırılmış/koşullu `BASARIMLAR[]` — her birinin bir `kosul(ozet)` fonksiyonu
 *    vardır, karakter öldüğünde değerlendirilir, kilidi açılanlar cihaz-yerel
 *    (localStorage) kalıcı biriktirilir.
 *  - Kademeli "kilometre taşları" (tecrübe/servet/şöhret/ömür/aile/rütbe) — aynı
 *    eksende 2 kademe; galeri bunlarda ilerleme çubuğu gösterir.
 *  - Çapraz-oyun `OyunIstatistigi` blob'u — her ölümde güncellenen rekorlar.
 *  - "Koleksiyon" başarımları — `basarimlar.ts`'teki efsanevi ölüm / ünvan
 *    sayısına bağlanır, böylece OLAYLI (efsanevi) ölümler de gerçek başarım sayılır.
 *
 * 2026-09: kullanıcının seçtiği havuz ~54 tanıma sabitlendi (kademeli eksenler
 * 2 kademe, tarz/keşif kümeleri seyreltildi, büyülü/lanetli eşya kümesi bütün
 * bırakıldı). Kaldırılan id'ler eski localStorage kümesinde yetim kalabilir —
 * zararsız (galeri/sayaç yalnız `BASARIMLAR` içindekileri işler).
 *
 * Hiçbir şey sunucuya gönderilmez.
 */
import type { CharacterState } from './types';
import type { Dil } from './ayarlar';
import { basarimlariGetir } from './basarimlar';
import { hesaplaSkor } from './skor';

const ACILAN_ANAHTAR = 'kader_carki_basarimlar_v2';
const ISTATISTIK_ANAHTAR = 'kader_carki_oyun_istatistik';
/** Değerlendirilmiş karakter id'leri — aynı ölüm için istatistiğin iki kez sayılmasını önler. */
const DEGERLENDIRILEN_ANAHTAR = 'kader_carki_basarim_degerlendirilen';
const DEGERLENDIRILEN_MAKS = 40;
/** Eski (tek-eşik) başarım id'lerini yeni kademeli id'lere taşıyan tek seferlik migrasyon bayrağı. */
const MIGRASYON_ANAHTAR = 'kader_carki_basarim_migrasyon_v3';

/** Ölüm anında güncellenen "en iyi" değerler — kademeli başarımlar + ilerleme çubukları bunları okur. */
export interface OyunRekorlari {
  un: number;
  ahlak: number;
  suc: number;
  yas: number;
  cocuk: number;
  ordu: number;
  sermaye: number;
  nufuz: number;
  ekip: number;
  mulk: number;
  rutbe: number;
  sehirYonetim: number;
}

const BOS_REKOR: OyunRekorlari = {
  un: 0, ahlak: 0, suc: 0, yas: 0, cocuk: 0, ordu: 0,
  sermaye: 0, nufuz: 0, ekip: 0, mulk: 0, rutbe: 0, sehirYonetim: 0,
};

export interface OyunIstatistigi {
  caglar: string[];
  meslekler: string[];
  bolgeler: string[];
  enYuksekSkor: number;
  toplamOlum: number;
  /** Tüm hayatlarda yaşanan toplam oyun-içi yıl (yaş - 15 toplamı). */
  toplamYilYasandi: number;
  /** Görülen benzersiz ölüm nedeni metinleri. */
  gorulenOlumNedenleri: string[];
  /** Tek bir hayatta bırakılan en yüksek nakit. */
  enTekOmurServet: number;
  /** Tamamlanan hayat amacı türleri (`hedefTuru`), benzersiz. */
  tamamlananAmaclar: string[];
  /** `yolculuk_tamamlandi` ile ölen hayat sayısı. */
  yolculukTamamlayan: number;
  rekor: OyunRekorlari;
}

const BOS_ISTATISTIK: OyunIstatistigi = {
  caglar: [],
  meslekler: [],
  bolgeler: [],
  enYuksekSkor: 0,
  toplamOlum: 0,
  toplamYilYasandi: 0,
  gorulenOlumNedenleri: [],
  enTekOmurServet: 0,
  tamamlananAmaclar: [],
  yolculukTamamlayan: 0,
  rekor: { ...BOS_REKOR },
};

export interface KoleksiyonSayilari {
  /** `basarimlar.ts` — biriktirilen benzersiz efsanevi ölüm sayısı. */
  olumSayisi: number;
  /** `basarimlar.ts` — biriktirilen benzersiz ünvan sayısı. */
  unvanSayisi: number;
}

/** Başarım koşullarının baktığı, ölmüş bir karakterin özeti + çapraz-oyun bağlamı. */
export interface BasarimOzeti {
  state: CharacterState;
  skor: number;
  istatistik: OyunIstatistigi;
  koleksiyon: KoleksiyonSayilari;
}

/** Galeri ilerleme çubuğu için — `state` yok, yalnız çapraz-oyun bağlamı. */
export interface IlerlemeBaglami {
  istatistik: OyunIstatistigi;
  koleksiyon: KoleksiyonSayilari;
}

export type BasarimGrubu = 'kilometre' | 'tarz' | 'kesif' | 'dunya' | 'koleksiyon';
export type Nadirlik = 'yaygin' | 'nadir' | 'efsanevi';

export interface BasarimTanimi {
  id: string;
  ikon: string;
  grup: BasarimGrubu;
  nadirlik: Nadirlik;
  /** true → kilidi açılana kadar isim/açıklama "???" gösterilir. */
  gizli?: boolean;
  ad: Record<Dil, string>;
  aciklama: Record<Dil, string>;
  kosul: (o: BasarimOzeti) => boolean;
  /** Kilitli (ve gizli olmayan) kartlarda ilerleme çubuğu: [şimdi, hedef]. */
  ilerleme?: (b: IlerlemeBaglami) => [number, number];
}

const yasayanCocuklar = (s: CharacterState) => s.cocuklar.filter((c) => c.yasiyor);
const etiketVar = (s: CharacterState, e: string) => s.etiketler.includes(e);
const etiketBiri = (s: CharacterState, ...ler: string[]) => ler.some((e) => s.etiketler.includes(e));
const olayGorildi = (s: CharacterState, ...ler: string[]) =>
  ler.some((id) => s.gecmis_olaylar.includes(id));

const HAPIS_KACIS_IDLERI = ['hapis_avlu_duvari', 'hapis_camasir_arabasi', 'hapis_sayim_karisikligi'];

/** Kademeli bir başarım ekseni için N kademelik `BasarimTanimi` üretir (şu an hep 2 kademe). */
function kademeli(
  taban: string,
  ikon: string,
  grup: BasarimGrubu,
  adlar: [string, string], // [tr, en] — kademe numarası eklenir
  esikler: number[],
  deger: (b: IlerlemeBaglami) => number,
  aciklamaSablon: [(n: number) => string, (n: number) => string],
  nadirlikler: Nadirlik[] = ['yaygin', 'efsanevi'],
): BasarimTanimi[] {
  const rakam = ['I', 'II', 'III'];
  return esikler.map((esik, i) => ({
    id: `${taban}_${i + 1}`,
    ikon,
    grup,
    nadirlik: nadirlikler[i] ?? 'nadir',
    ad: { tr: `${adlar[0]} ${rakam[i]}`, en: `${adlar[1]} ${rakam[i]}` },
    aciklama: { tr: aciklamaSablon[0](esik), en: aciklamaSablon[1](esik) },
    kosul: (o) => deger({ istatistik: o.istatistik, koleksiyon: o.koleksiyon }) >= esik,
    ilerleme: (b) => [Math.min(deger(b), esik), esik],
  }));
}

export const BASARIMLAR: BasarimTanimi[] = [
  // ===================== KİLOMETRE TAŞLARI (2 kademe) =====================
  ...kademeli(
    'tecrube', '📚', 'kilometre', ['Kaderin Kroniği', 'Chronicle of Fate'],
    [1, 10],
    (b) => b.istatistik.toplamOlum,
    [(n) => `Bu cihazda ${n} hayat tamamla.`, (n) => `Complete ${n} lives on this device.`],
  ),
  ...kademeli(
    'servet', '💰', 'kilometre', ['Servet', 'Fortune'],
    [400, 4000],
    (b) => b.istatistik.enTekOmurServet,
    [(n) => `Tek bir hayatta ${n} nakit biriktir.`, (n) => `Amass ${n} cash in a single life.`],
  ),
  ...kademeli(
    'sohret', '🌟', 'kilometre', ['Şöhret', 'Renown'],
    [70, 100],
    (b) => b.istatistik.rekor.un,
    [(n) => `Şöhretin ${n}'e ulaşsın.`, (n) => `Reach a fame of ${n}.`],
  ),
  ...kademeli(
    'omur', '🕰️', 'kilometre', ['Uzun Ömür', 'Long Life'],
    [80, 95],
    (b) => b.istatistik.rekor.yas,
    [(n) => `${n} yaşına ulaş.`, (n) => `Reach age ${n}.`],
  ),
  ...kademeli(
    'aile', '👨‍👩‍👧‍👦', 'kilometre', ['Kalabalık Sofra', 'A Full Table'],
    [3, 6],
    (b) => b.istatistik.rekor.cocuk,
    [(n) => `${n} yaşayan çocuğun olsun.`, (n) => `Have ${n} living children at once.`],
  ),
  ...kademeli(
    'rutbe', '🎖️', 'kilometre', ['Merdiven', 'The Ladder'],
    [4, 5],
    (b) => b.istatistik.rekor.rutbe,
    [(n) => `${n}. rütbe seviyesine ulaş.`, (n) => `Reach rank level ${n}.`],
    ['nadir', 'efsanevi'],
  ),
  {
    id: 'meslek_zirvesi',
    ikon: '🏆',
    grup: 'kilometre',
    nadirlik: 'nadir',
    ad: { tr: 'Mesleğinin Zirvesi', en: 'Peak of Your Trade' },
    aciklama: {
      tr: 'Ordunu 250\'ye / ticaret sermayeni 200\'e / nüfuzunu 150\'ye taşı.',
      en: 'Take your army to 250 / trade capital to 200 / influence to 150.',
    },
    kosul: (o) =>
      o.istatistik.rekor.ordu >= 250 ||
      o.istatistik.rekor.sermaye >= 200 ||
      o.istatistik.rekor.nufuz >= 150,
  },
  {
    id: 'bolge_gezgini',
    ikon: '🗺️',
    grup: 'kilometre',
    nadirlik: 'nadir',
    ad: { tr: 'Diyar Diyar', en: 'Land after Land' },
    aciklama: {
      tr: '4 farklı bölgede birer hayat tamamla.',
      en: 'Finish a life in 4 different regions.',
    },
    kosul: (o) => o.istatistik.bolgeler.length >= 4,
    ilerleme: (b) => [Math.min(b.istatistik.bolgeler.length, 4), 4],
  },

  // ============================ TARZ (çok koşullu) ============================
  {
    id: 'iki_cag',
    ikon: '⏳',
    grup: 'tarz',
    nadirlik: 'yaygin',
    ad: { tr: 'İki Çağın İnsanı', en: 'Person of Two Eras' },
    aciklama: {
      tr: 'Hem Orta Çağ hem Sanayi Devrimi\'nde birer hayat tamamla.',
      en: 'Finish a life in both the Middle Ages and the Industrial Revolution.',
    },
    kosul: (o) => o.istatistik.caglar.length >= 2,
    ilerleme: (b) => [Math.min(b.istatistik.caglar.length, 2), 2],
  },
  {
    id: 'uc_meslek',
    ikon: '🎭',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Üç Mesleğin Ustası', en: 'Master of Three Trades' },
    aciklama: {
      tr: 'Asker, Tüccar ve Din Adamı olarak birer hayat yaşa.',
      en: 'Live a life as a Soldier, a Merchant and a Clergyman.',
    },
    kosul: (o) => ['Asker', 'Tüccar', 'Din Adamı'].every((m) => o.istatistik.meslekler.includes(m)),
    ilerleme: (b) => [
      ['Asker', 'Tüccar', 'Din Adamı'].filter((m) => b.istatistik.meslekler.includes(m)).length,
      3,
    ],
  },
  {
    id: 'mutevazi_son',
    ikon: '🌾',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Mütevazı Son', en: 'A Humble End' },
    aciklama: {
      tr: 'Hiç mülk almadan, sicilin tertemizken (suç < 20) en az 70 yaşında öl.',
      en: 'Die at 70+ without ever buying property and with a clean record (crime < 20).',
    },
    kosul: (o) => o.state.yas >= 70 && o.state.mulkler.length === 0 && o.state.suc_seviyesi < 20,
  },
  {
    id: 'kisa_parlak',
    ikon: '☄️',
    grup: 'tarz',
    nadirlik: 'efsanevi',
    ad: { tr: 'Kısa ama Parlak', en: 'Short but Bright' },
    aciklama: {
      tr: '35 yaşından önce öl ama 250.000 puanın üstünde bir skor bırak.',
      en: 'Die before 35 but leave a score above 250,000.',
    },
    kosul: (o) => o.state.yas < 35 && o.skor >= 250000,
  },
  {
    id: 'yeminli',
    ikon: '🕯️',
    grup: 'tarz',
    nadirlik: 'efsanevi',
    ad: { tr: 'Yeminli', en: 'The Sworn' },
    aciklama: {
      tr: 'Din Adamı olarak, ahlakın 90\'ın üstünde ve sicilin temizken (suç < 20) öl.',
      en: 'Die as a Clergyman with morality above 90 and a clean record (crime < 20).',
    },
    kosul: (o) => o.state.meslek === 'Din Adamı' && o.state.ahlak >= 90 && o.state.suc_seviyesi < 20,
  },
  {
    id: 'kanli_eller',
    ikon: '🩸',
    grup: 'tarz',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Kanlı Eller', en: 'Bloody Hands' },
    aciklama: {
      tr: 'Suç/aranma seviyen 80\'in üstündeyken öl.',
      en: 'Die with your crime/wanted level above 80.',
    },
    kosul: (o) => o.state.suc_seviyesi >= 80,
  },
  {
    id: 'kilic_zoruyla',
    ikon: '🗡️',
    grup: 'tarz',
    gizli: true,
    nadirlik: 'efsanevi',
    ad: { tr: 'Kılıç Zoruyla', en: 'By the Sword' },
    aciklama: {
      tr: '5. rütbeye ulaş, şöhretin 70\'in üstünde ama ahlakın 25\'in altındayken öl.',
      en: 'Reach rank 5 and die with fame above 70 but morality below 25.',
    },
    kosul: (o) => o.state.rutbe_seviye >= 5 && o.state.un >= 70 && o.state.ahlak <= 25,
  },
  {
    id: 'yoktan_var',
    ikon: '🏚️',
    grup: 'tarz',
    nadirlik: 'efsanevi',
    ad: { tr: 'Yoktan Var Eden', en: 'From Nothing' },
    aciklama: {
      tr: 'Köle ya da sürgün bir aileden doğ, şato/malikâne konutunda öl.',
      en: 'Be born to a slave or exile family and die living in a castle.',
    },
    kosul: (o) => etiketBiri(o.state, 'aile:kole', 'aile:surgun') && o.state.konut_id === 'sato',
  },
  {
    id: 'evli_barkli',
    ikon: '💍',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Ömürlük Yoldaş', en: 'Lifelong Companion' },
    aciklama: {
      tr: 'Evli, eş puanı 90\'ın üstündeyken öl.',
      en: 'Die married, with a spouse score above 90.',
    },
    kosul: (o) => etiketVar(o.state, 'medeni:evli') && o.state.es_puani >= 90,
  },
  {
    id: 'yalniz_kalan',
    ikon: '💔',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Yalnız Kalan', en: 'The Bereaved' },
    aciklama: {
      tr: 'Hem eş hem evlat acısını taşırken 60 yaşını gör.',
      en: 'Reach age 60 bearing the loss of both a spouse and a child.',
    },
    kosul: (o) => etiketVar(o.state, 'kalici:dul') && etiketVar(o.state, 'kalici:evlat_acisi') && o.state.yas >= 60,
  },
  {
    id: 'kumarbaz',
    ikon: '🎲',
    grup: 'tarz',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Kumarbaz', en: 'The Gambler' },
    aciklama: {
      tr: 'Kumar bağımlısı damgasıyla öl.',
      en: 'Die bearing the gambling-addict mark.',
    },
    kosul: (o) => etiketVar(o.state, 'bagimlilik:kumarbaz'),
  },
  {
    id: 'katil',
    ikon: '🔪',
    grup: 'tarz',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Kanlı Sır', en: 'A Bloody Secret' },
    aciklama: {
      tr: 'Bir cinayet sırrını mezara götür.',
      en: 'Carry the secret of a killing to your grave.',
    },
    kosul: (o) => etiketBiri(o.state, 'sir:cinayet', 'sir:kanli_eller'),
  },
  {
    id: 'soylu_kani',
    ikon: '👑',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Soylu Kanı', en: 'Noble Blood' },
    aciklama: {
      tr: 'Soylu bir aileden doğ, şatoda ve şöhretin 80\'in üstündeyken öl.',
      en: 'Be born noble and die in a castle with fame above 80.',
    },
    kosul: (o) => etiketVar(o.state, 'aile:soylu') && o.state.konut_id === 'sato' && o.state.un >= 80,
  },
  {
    id: 'sevilen_baba',
    ikon: '🫂',
    grup: 'tarz',
    nadirlik: 'efsanevi',
    ad: { tr: 'Sevilen Baba', en: 'A Beloved Parent' },
    aciklama: {
      tr: 'En az 3 yaşayan çocuğun olsun ve hepsinin sana bağlılığı 75\'in üstünde olsun.',
      en: 'Have at least 3 living children, each with a bond above 75.',
    },
    kosul: (o) => {
      const yc = yasayanCocuklar(o.state);
      return yc.length >= 3 && yc.every((c) => (c.iliski ?? 0) >= 75);
    },
  },
  {
    id: 'sadik_asker',
    ikon: '🛡️',
    grup: 'tarz',
    nadirlik: 'nadir',
    ad: { tr: 'Sadık Asker', en: 'The Loyal Soldier' },
    aciklama: {
      tr: 'Sadık asker yolunu seç ve 5. rütbeye ulaş.',
      en: 'Walk the loyal-soldier path and reach rank 5.',
    },
    kosul: (o) => etiketVar(o.state, 'yol:asker:sadik') && o.state.rutbe_seviye >= 5,
  },

  // ============================== KEŞİF (içerik) ==============================
  {
    id: 'kahraman',
    ikon: '⭐',
    grup: 'kesif',
    nadirlik: 'nadir',
    ad: { tr: 'Kahraman', en: 'The Hero' },
    aciklama: {
      tr: 'Kahraman asker ya da dürüst din adamı yolunu seç.',
      en: 'Walk the path of the heroic soldier or the honest clergyman.',
    },
    kosul: (o) => etiketBiri(o.state, 'yol:asker:kahraman', 'yol:din:durust'),
  },
  {
    id: 'hain',
    ikon: '🏴',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Hain', en: 'The Traitor' },
    aciklama: {
      tr: 'Hain asker ya da yozlaşmış din adamı yolunu seç.',
      en: 'Walk the path of the traitorous soldier or the corrupt clergyman.',
    },
    kosul: (o) => etiketBiri(o.state, 'yol:asker:hain', 'yol:din:yozlasmis'),
  },
  {
    id: 'kasif',
    ikon: '🧭',
    grup: 'kesif',
    nadirlik: 'yaygin',
    ad: { tr: 'Kâşif', en: 'Explorer' },
    aciklama: { tr: 'Bir büyük yolculuğu tamamla.', en: 'Complete a great journey.' },
    kosul: (o) => etiketVar(o.state, 'yolculuk_tamamlandi'),
  },
  {
    id: 'yollara_dusen',
    ikon: '🐫',
    grup: 'kesif',
    nadirlik: 'efsanevi',
    ad: { tr: 'Yollara Düşen', en: 'The Wayfarer' },
    aciklama: {
      tr: 'Ayrı hayatlarda 3 büyük yolculuğu tamamla.',
      en: 'Complete 3 great journeys across separate lives.',
    },
    kosul: (o) => o.istatistik.yolculukTamamlayan >= 3,
    ilerleme: (b) => [Math.min(b.istatistik.yolculukTamamlayan, 3), 3],
  },
  {
    id: 'zindandan_kacis',
    ikon: '⛓️',
    grup: 'kesif',
    nadirlik: 'nadir',
    ad: { tr: 'Zindandan Kaçış', en: 'The Jailbreak' },
    aciklama: {
      tr: 'Parasız, riskli bir kaçış girişimiyle hapisten kurtul.',
      en: 'Break out of prison through a desperate, penniless escape.',
    },
    kosul: (o) => olayGorildi(o.state, ...HAPIS_KACIS_IDLERI) && !etiketVar(o.state, 'hapiste'),
  },
  {
    id: 'firari',
    ikon: '🏃',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Firari', en: 'Fugitive' },
    aciklama: { tr: 'Kaçak olarak, dağlarda öl.', en: 'Die as a fugitive, out in the hills.' },
    kosul: (o) => etiketVar(o.state, 'kacak'),
  },
  {
    id: 'yedi_canli',
    ikon: '🐈‍⬛',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'efsanevi',
    ad: { tr: 'Yedi Canlı', en: 'Nine Lives' },
    aciklama: {
      tr: 'Kutsal bir emanet seni ölümden bir kez döndürsün.',
      en: 'Have a holy relic pull you back from death once.',
    },
    kosul: (o) => o.state.hayat_hikayesi.some((h) => /kutsal|relic|holy/i.test(h.baslik)),
  },
  {
    id: 'gizemli_kader',
    ikon: '🔮',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'yaygin',
    ad: { tr: 'Gizemli Kader', en: 'A Mysterious Fate' },
    aciklama: {
      tr: 'Gizemli bir eşyayı yanında taşırken öl.',
      en: 'Die while carrying a mysterious item.',
    },
    kosul: (o) => o.state.etiketler.some((e) => e.startsWith('esya:') || e.startsWith('envanter:')),
  },
  {
    id: 'ejderha',
    ikon: '🐉',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Ejderhanın İzinde', en: 'On the Dragon\'s Trail' },
    aciklama: {
      tr: 'Ejderha tılsımıyla başlayan gizemi kendi hayatında yaşa.',
      en: 'Live through the mystery that begins with the dragon talisman.',
    },
    kosul: (o) => olayGorildi(o.state, 'gizem_ejderha_tilsimi'),
  },
  {
    id: 'yasak_ilim',
    ikon: '📕',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Yasak İlim', en: 'Forbidden Lore' },
    aciklama: {
      tr: 'Yasak bir bilginin peşine düşmüş olarak öl.',
      en: 'Die having pursued forbidden knowledge.',
    },
    kosul: (o) => etiketVar(o.state, 'bilgi:yasak_ilim'),
  },
  {
    id: 'fisildayan_tas',
    ikon: '🪨',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Fısıldayan Taş', en: 'The Whispering Stone' },
    aciklama: {
      tr: 'Ruh çağırma seansından fısıldayan taşla çık.',
      en: 'Walk away from a séance with the whispering stone.',
    },
    kosul: (o) =>
      etiketVar(o.state, 'envanter:fisildayan_tas') || olayGorildi(o.state, 'gizem_fisildayan_tas'),
  },
  {
    id: 'seytanla_pazarlik',
    ikon: '😈',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'efsanevi',
    ad: { tr: 'Dört Yol Ağzı', en: 'The Crossroads' },
    aciklama: {
      tr: 'Dört yol ağzında karanlık bir pazarlığa otur.',
      en: 'Sit down to a dark bargain at the crossroads.',
    },
    kosul: (o) => olayGorildi(o.state, 'buyu_seytanla_pazarlik'),
  },
  {
    id: 'kara_kilic',
    ikon: '⚔️',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Kara Kılıç', en: 'The Black Sword' },
    aciklama: {
      tr: 'Lanetli kara kılıcı kuşanmış olarak öl.',
      en: 'Die girded with the cursed black sword.',
    },
    kosul: (o) => etiketVar(o.state, 'envanter:kara_kilic'),
  },
  {
    id: 'kara_kedi',
    ikon: '🐈‍⬛',
    grup: 'kesif',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Uğursuz Kedi', en: 'The Ill-Omened Cat' },
    aciklama: {
      tr: 'Kara kedinin yolunu bir kez kesmesine izin ver.',
      en: 'Let a black cat cross your path once.',
    },
    kosul: (o) =>
      olayGorildi(o.state, 'buyu_kara_kedi', 'derinlik_manastir_kedisi') ||
      etiketVar(o.state, 'esya:veba_koruyucu_kedi'),
  },
  {
    id: 'kahin',
    ikon: '🔯',
    grup: 'kesif',
    nadirlik: 'yaygin',
    ad: { tr: 'Kâhinin Dediği', en: 'The Oracle\'s Word' },
    aciklama: {
      tr: 'Bir medyuma, kristal küreye ya da kâhine danış.',
      en: 'Consult a medium, a crystal ball or an oracle.',
    },
    kosul: (o) => olayGorildi(o.state, 'buyu_koy_medyumu', 'buyu_kristal_kure', 'buyu_kahin_kehaneti'),
  },

  // ================================= DÜNYA ==================================
  {
    id: 'vebayi_yendi',
    ikon: '☠️',
    grup: 'dunya',
    nadirlik: 'nadir',
    ad: { tr: 'Vebayı Yenen', en: 'Plague Survivor' },
    aciklama: {
      tr: 'Vebayı bizzat kap ve iyileşerek hayatta kal.',
      en: 'Catch the plague yourself and recover from it.',
    },
    kosul: (o) =>
      o.state.veba_gecirdi &&
      !etiketVar(o.state, 'veba_hastasi') &&
      !/veba|plague/i.test(o.state.olum_nedeni ?? ''),
  },
  {
    id: 'cephede_yaslandi',
    ikon: '⚔️',
    grup: 'dunya',
    nadirlik: 'nadir',
    ad: { tr: 'Cephede Yaşlanan', en: 'Grew Old at the Front' },
    aciklama: {
      tr: 'Bir büyük savaşı baştan sona atlat ve 55 yaşını gör.',
      en: 'Live through a great war from start to finish and reach age 55.',
    },
    kosul: (o) => o.state.son_buyuk_savas_bitis_yili != null && o.state.yas >= 55,
  },
  {
    id: 'kiyametten_sag',
    ikon: '🌩️',
    grup: 'dunya',
    nadirlik: 'efsanevi',
    ad: { tr: 'Kıyametten Sağ Çıkan', en: 'Rode Out the Apocalypse' },
    aciklama: {
      tr: 'Aynı hayatta hem vebayı hem bir büyük savaşı atlat, 60 yaşını gör.',
      en: 'Survive both a plague and a great war in one life, and reach age 60.',
    },
    kosul: (o) =>
      o.state.veba_gecirdi && o.state.son_buyuk_savas_bitis_yili != null && o.state.yas >= 60,
  },
  {
    id: 'veba_bagisik',
    ikon: '🧬',
    grup: 'dunya',
    nadirlik: 'nadir',
    ad: { tr: 'Veba Bağışıklı', en: 'Plague-Immune' },
    aciklama: {
      tr: 'Vebaya karşı bağışıklık kazanmış olarak öl.',
      en: 'Die having gained immunity to the plague.',
    },
    kosul: (o) => etiketVar(o.state, 'tibbi:veba_bagisik'),
  },
  {
    id: 'rakipsiz',
    ikon: '🕸️',
    grup: 'dunya',
    nadirlik: 'efsanevi',
    ad: { tr: 'Rakipsiz', en: 'Without Rival' },
    aciklama: {
      tr: 'Tüm isimli rakiplerini alt etmiş olarak öl.',
      en: 'Die having defeated every named rival.',
    },
    kosul: (o) => o.state.rakipler.length > 0 && o.state.rakipler.every((r) => r.yenildi),
  },
  {
    id: 'tefeci_kurbani',
    ikon: '📉',
    grup: 'dunya',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Tefecinin Eline Düşen', en: 'In the Usurer\'s Grip' },
    aciklama: {
      tr: 'Aktif bir kredin varken, en az iki taksitini ödeyemeden öl.',
      en: 'Die with an active loan and at least two missed installments.',
    },
    kosul: (o) => o.state.kredi != null && o.state.kredi.odenmeyenTaksit >= 2,
  },

  // ============================== KOLEKSİYONLAR ==============================
  {
    id: 'efsanevi_olum',
    ikon: '💀',
    grup: 'koleksiyon',
    gizli: true,
    nadirlik: 'nadir',
    ad: { tr: 'Efsaneleşerek Öldü', en: 'Died a Legend' },
    aciklama: {
      tr: 'Bir "efsanevi ölüm" ile hayata veda et.',
      en: 'Bow out with a "legendary death".',
    },
    kosul: (o) => !!o.state.efsanevi_olum,
  },
  {
    id: 'efsanevi_koleksiyon_1',
    ikon: '💀',
    grup: 'koleksiyon',
    nadirlik: 'efsanevi',
    ad: { tr: 'Ölüm Koleksiyoncusu', en: 'Death Collector' },
    aciklama: {
      tr: '5 farklı efsanevi/olaylı ölüm biriktir.',
      en: 'Collect 5 distinct legendary deaths.',
    },
    kosul: (o) => o.koleksiyon.olumSayisi >= 5,
    ilerleme: (b) => [Math.min(b.koleksiyon.olumSayisi, 5), 5],
  },
  {
    id: 'unvan_koleksiyon_1',
    ikon: '🏵️',
    grup: 'koleksiyon',
    nadirlik: 'nadir',
    ad: { tr: 'Ünvan Avcısı', en: 'Title Hunter' },
    aciklama: {
      tr: 'Olaylardan 8 farklı ünvan kazan.',
      en: 'Earn 8 distinct titles from events.',
    },
    kosul: (o) => o.koleksiyon.unvanSayisi >= 8,
    ilerleme: (b) => [Math.min(b.koleksiyon.unvanSayisi, 8), 8],
  },
  {
    id: 'evcil_dost',
    ikon: '🐾',
    grup: 'koleksiyon',
    nadirlik: 'yaygin',
    ad: { tr: 'Sadık Dost', en: 'A Faithful Friend' },
    aciklama: {
      tr: 'Bir evcil hayvanınla birlikte öl.',
      en: 'Die with a pet at your side.',
    },
    kosul: (o) => o.state.evcil_hayvan != null,
  },
  {
    id: 'luks_duskun',
    ikon: '💎',
    grup: 'koleksiyon',
    nadirlik: 'efsanevi',
    ad: { tr: 'Lüks Düşkünü', en: 'Lover of Luxury' },
    aciklama: {
      tr: '4 lüks eşyanın hepsine aynı anda sahipken öl.',
      en: 'Die owning all 4 luxury items at once.',
    },
    kosul: (o) => o.state.magaza_envanteri.filter((e) => e.kategori === 'luks').length >= 4,
    ilerleme: () => [0, 4],
  },
];

// Galeri sıralaması için grup ağırlığı.
export const GRUP_SIRA: BasarimGrubu[] = ['kilometre', 'tarz', 'kesif', 'dunya', 'koleksiyon'];

// ---------------------------------------------------------------------------

function okuSet(key: string): Set<string> {
  try {
    const ham = localStorage.getItem(key);
    const veri = ham ? JSON.parse(ham) : [];
    return new Set(Array.isArray(veri) ? veri : []);
  } catch {
    return new Set();
  }
}

function yazSet(key: string, s: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(s)));
  } catch {
    // gizli sekme / dolu depo — sessizce yok say
  }
}

/** Eski tek-eşik başarım id'lerini yeni kademeli id'lere bir kez taşır (kilit kaybı olmasın). */
function migrasyonuYap() {
  try {
    if (localStorage.getItem(MIGRASYON_ANAHTAR)) return;
    const HARITA: Record<string, string> = {
      yasayan_efsane: 'sohret_2',
      hanedan: 'aile_2',
      zirvenin_adami: 'rutbe_2',
      servet: 'servet_1',
      uzun_omur: 'omur_2',
      ilk_hayat: 'tecrube_1',
      on_hayat: 'tecrube_2',
    };
    const acilan = okuSet(ACILAN_ANAHTAR);
    let degisti = false;
    for (const [eski, yeni] of Object.entries(HARITA)) {
      if (acilan.has(eski)) {
        acilan.delete(eski);
        acilan.add(yeni);
        degisti = true;
      }
    }
    if (degisti) yazSet(ACILAN_ANAHTAR, acilan);
    localStorage.setItem(MIGRASYON_ANAHTAR, '1');
  } catch {
    // yok say
  }
}
migrasyonuYap();

export function oyunIstatistigiGetir(): OyunIstatistigi {
  try {
    const ham = localStorage.getItem(ISTATISTIK_ANAHTAR);
    if (!ham) return { ...BOS_ISTATISTIK, rekor: { ...BOS_REKOR } };
    const v = JSON.parse(ham) as Partial<OyunIstatistigi>;
    return {
      caglar: Array.isArray(v.caglar) ? v.caglar : [],
      meslekler: Array.isArray(v.meslekler) ? v.meslekler : [],
      bolgeler: Array.isArray(v.bolgeler) ? v.bolgeler : [],
      enYuksekSkor: typeof v.enYuksekSkor === 'number' ? v.enYuksekSkor : 0,
      toplamOlum: typeof v.toplamOlum === 'number' ? v.toplamOlum : 0,
      toplamYilYasandi: typeof v.toplamYilYasandi === 'number' ? v.toplamYilYasandi : 0,
      gorulenOlumNedenleri: Array.isArray(v.gorulenOlumNedenleri) ? v.gorulenOlumNedenleri : [],
      enTekOmurServet: typeof v.enTekOmurServet === 'number' ? v.enTekOmurServet : 0,
      tamamlananAmaclar: Array.isArray(v.tamamlananAmaclar) ? v.tamamlananAmaclar : [],
      yolculukTamamlayan: typeof v.yolculukTamamlayan === 'number' ? v.yolculukTamamlayan : 0,
      rekor: { ...BOS_REKOR, ...(v.rekor && typeof v.rekor === 'object' ? v.rekor : {}) },
    };
  } catch {
    return { ...BOS_ISTATISTIK, rekor: { ...BOS_REKOR } };
  }
}

function istatistikYaz(ist: OyunIstatistigi) {
  try {
    localStorage.setItem(ISTATISTIK_ANAHTAR, JSON.stringify(ist));
  } catch {
    // yok say
  }
}

export function acilanBasarimIdleri(): Set<string> {
  return okuSet(ACILAN_ANAHTAR);
}

/**
 * Uygulama açılışında bir kez çağrılır: çapraz-oyun verisinden (rekor/istatistik/koleksiyon)
 * hâlihazırda KARŞILANAN kademeli/koleksiyon başarımlarını, oyuncunun tekrar ölmesini
 * beklemeden açar. Yalnız `ilerleme` tanımlı — yani `state` olmadan değerlendirilebilen —
 * başarımlara bakar (kademeli eksenler, koleksiyonlar, iki_cag, uc_meslek, yollara_dusen…).
 * Sürüm değişince kilidi görünmez kalan oyuncuların ilerlemesini geri kazandırır.
 */
export function retroaktifKilitAc(): void {
  try {
    const baglam: IlerlemeBaglami = {
      istatistik: oyunIstatistigiGetir(),
      koleksiyon: koleksiyonSayilari(),
    };
    const acilan = okuSet(ACILAN_ANAHTAR);
    let degisti = false;
    for (const b of BASARIMLAR) {
      if (!b.ilerleme || acilan.has(b.id)) continue;
      let p: [number, number];
      try {
        p = b.ilerleme(baglam);
      } catch {
        continue;
      }
      if (p[1] > 0 && p[0] >= p[1]) {
        acilan.add(b.id);
        degisti = true;
      }
    }
    if (degisti) yazSet(ACILAN_ANAHTAR, acilan);
  } catch {
    // yok say
  }
}
retroaktifKilitAc();

/** `basarimlar.ts` koleksiyonundaki benzersiz efsanevi ölüm / ünvan sayısı. */
export function koleksiyonSayilari(): KoleksiyonSayilari {
  const { unvanlar, olumler } = basarimlariGetir();
  return { olumSayisi: new Set(olumler).size, unvanSayisi: new Set(unvanlar).size };
}

function istatistigiGuncelle(state: CharacterState, skor: number): OyunIstatistigi {
  const ist = oyunIstatistigiGetir();
  if (!ist.caglar.includes(state.cag)) ist.caglar = [...ist.caglar, state.cag];
  if (state.meslek && !ist.meslekler.includes(state.meslek)) ist.meslekler = [...ist.meslekler, state.meslek];
  if (!ist.bolgeler.includes(state.bolge)) ist.bolgeler = [...ist.bolgeler, state.bolge];
  ist.enYuksekSkor = Math.max(ist.enYuksekSkor, skor);
  ist.toplamOlum += 1;
  ist.toplamYilYasandi += Math.max(0, state.yas - 15);
  ist.enTekOmurServet = Math.max(ist.enTekOmurServet, state.para);
  if (state.olum_nedeni && !ist.gorulenOlumNedenleri.includes(state.olum_nedeni)) {
    ist.gorulenOlumNedenleri = [...ist.gorulenOlumNedenleri, state.olum_nedeni];
  }
  if (state.hayat_amaci?.tamamlandi && !ist.tamamlananAmaclar.includes(state.hayat_amaci.hedefTuru)) {
    ist.tamamlananAmaclar = [...ist.tamamlananAmaclar, state.hayat_amaci.hedefTuru];
  }
  if (state.etiketler.includes('yolculuk_tamamlandi')) ist.yolculukTamamlayan += 1;

  const yasayan = yasayanCocuklar(state).length;
  const r = ist.rekor;
  r.un = Math.max(r.un, state.un);
  r.ahlak = Math.max(r.ahlak, state.ahlak);
  r.suc = Math.max(r.suc, state.suc_seviyesi);
  r.yas = Math.max(r.yas, state.yas);
  r.cocuk = Math.max(r.cocuk, yasayan);
  r.ordu = Math.max(r.ordu, state.ordu_mevcudu);
  r.sermaye = Math.max(r.sermaye, state.ticaret_sermaye);
  r.nufuz = Math.max(r.nufuz, state.nufuz);
  r.ekip = Math.max(r.ekip, state.ekip.length);
  r.mulk = Math.max(r.mulk, state.mulkler.length);
  r.rutbe = Math.max(r.rutbe, state.rutbe_seviye);
  r.sehirYonetim = Math.max(r.sehirYonetim, state.sehir_yonetim_seviyesi);

  istatistikYaz(ist);
  return ist;
}

export interface BasarimDegerlendirmeSonucu {
  /** Bu ölümde İLK kez kilidi açılan başarımlar (ölüm ekranı "YENİ" vurgusu). */
  yeniAcilanlar: BasarimTanimi[];
  /** Bu hayatın karşıladığı TÜM başarımlar (ölüm ekranı rozet şeridi). */
  buOmurKazanilanlar: BasarimTanimi[];
  istatistik: OyunIstatistigi;
  /** Bu ömrün nihai skoru (Gold kazancı bundan türetilir). */
  skor: number;
}

/**
 * Ölmüş bir karakter için başarımları değerlendirir: çapraz-oyun istatistiğini/rekorları
 * günceller, kilidi yeni açılanları kalıcı işaretler, bu hayatın karşıladığı tüm başarımları döner.
 * Aynı karakter için ikinci çağrı istatistiği tekrar artırmaz (idempotent koruma).
 */
export function basarimlariDegerlendir(state: CharacterState): BasarimDegerlendirmeSonucu {
  const skor = hesaplaSkor(state);
  const kol = koleksiyonSayilari();
  const degerlendirilen = okuSet(DEGERLENDIRILEN_ANAHTAR);
  const tekrar = degerlendirilen.has(state.id);

  const ist = tekrar ? oyunIstatistigiGetir() : istatistigiGuncelle(state, skor);
  const ozet: BasarimOzeti = { state, skor, istatistik: ist, koleksiyon: kol };

  const buOmurKazanilanlar: BasarimTanimi[] = [];
  for (const b of BASARIMLAR) {
    let gecti = false;
    try {
      gecti = b.kosul(ozet);
    } catch {
      gecti = false;
    }
    if (gecti) buOmurKazanilanlar.push(b);
  }

  const yeniAcilanlar: BasarimTanimi[] = [];
  if (!tekrar) {
    const acilan = acilanBasarimIdleri();
    for (const b of buOmurKazanilanlar) {
      if (!acilan.has(b.id)) {
        acilan.add(b.id);
        yeniAcilanlar.push(b);
      }
    }
    if (yeniAcilanlar.length > 0) yazSet(ACILAN_ANAHTAR, acilan);

    degerlendirilen.add(state.id);
    const kirpik = Array.from(degerlendirilen).slice(-DEGERLENDIRILEN_MAKS);
    yazSet(DEGERLENDIRILEN_ANAHTAR, new Set(kirpik));
  }

  return { yeniAcilanlar, buOmurKazanilanlar, istatistik: ist, skor };
}
