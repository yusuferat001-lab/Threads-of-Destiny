/**
 * Gerçek başarım sistemi (büyük denge turu). `basarimlar.ts` (olaylardan gelen ünvan +
 * efsanevi ölüm koleksiyonu) korunur; bu ayrı, adlandırılmış ve koşullu bir katmandır:
 * her başarımın bir `kosul(ozet)` fonksiyonu vardır, karakter öldüğünde değerlendirilir,
 * kilidi açılanlar cihaz-yerel olarak (localStorage) kalıcı biriktirilir.
 *
 * Çapraz-oyun koşulları için ("iki farklı çağda oyna", "üç mesleğin üçünde de oyna")
 * ayrıca küçük bir `OyunIstatistigi` blob'u tutulur ve her ölümde güncellenir.
 * Hiçbir şey sunucuya gönderilmez.
 */
import type { CharacterState } from './types';
import type { Dil } from './ayarlar';

const ACILAN_ANAHTAR = 'kader_carki_basarimlar_v2';
const ISTATISTIK_ANAHTAR = 'kader_carki_oyun_istatistik';
/** Değerlendirilmiş karakter id'leri — aynı ölüm için istatistiğin/başarımın iki kez sayılmasını önler. */
const DEGERLENDIRILEN_ANAHTAR = 'kader_carki_basarim_degerlendirilen';
const DEGERLENDIRILEN_MAKS = 40;

export interface OyunIstatistigi {
  caglar: string[];
  meslekler: string[];
  bolgeler: string[];
  enYuksekSkor: number;
  toplamOlum: number;
}

const BOS_ISTATISTIK: OyunIstatistigi = {
  caglar: [],
  meslekler: [],
  bolgeler: [],
  enYuksekSkor: 0,
  toplamOlum: 0,
};

/** Başarım koşullarının baktığı, ölmüş bir karakterin özeti + o ana kadarki çapraz-oyun istatistiği. */
export interface BasarimOzeti {
  state: CharacterState;
  skor: number;
  istatistik: OyunIstatistigi;
}

export interface BasarimTanimi {
  id: string;
  ikon: string;
  /** true → kilidi açılana kadar isim/açıklama "???" gösterilir. */
  gizli?: boolean;
  ad: Record<Dil, string>;
  aciklama: Record<Dil, string>;
  kosul: (o: BasarimOzeti) => boolean;
}

const yasayanCocuk = (s: CharacterState) => s.cocuklar.filter((c) => c.yasiyor).length;
const etiketVar = (s: CharacterState, e: string) => s.etiketler.includes(e);

export const BASARIMLAR: BasarimTanimi[] = [
  {
    id: 'iki_cag',
    ikon: '⏳',
    ad: { tr: 'İki Çağın İnsanı', en: 'Person of Two Eras' },
    aciklama: {
      tr: 'Hem Orta Çağ hem Sanayi Devrimi\'nde birer hayat tamamla.',
      en: 'Finish a life in both the Middle Ages and the Industrial Revolution.',
    },
    kosul: (o) => o.istatistik.caglar.length >= 2,
  },
  {
    id: 'uc_meslek',
    ikon: '🎭',
    ad: { tr: 'Üç Mesleğin Ustası', en: 'Master of Three Trades' },
    aciklama: {
      tr: 'Asker, Tüccar ve Din Adamı olarak birer hayat yaşa.',
      en: 'Live a life as a Soldier, a Merchant and a Clergyman.',
    },
    kosul: (o) => ['Asker', 'Tüccar', 'Din Adamı'].every((m) => o.istatistik.meslekler.includes(m)),
  },
  {
    id: 'borcsuz_ihtiyar',
    ikon: '🧓',
    ad: { tr: 'Borçsuz İhtiyar', en: 'Debt-Free Elder' },
    aciklama: {
      tr: 'En az 80 yaşında, cebinde para varken öl.',
      en: 'Die at 80 or older with money still in your pocket.',
    },
    kosul: (o) => o.state.yas >= 80 && o.state.para >= 0,
  },
  {
    id: 'yasayan_efsane',
    ikon: '🌟',
    ad: { tr: 'Yaşayan Efsane', en: 'Living Legend' },
    aciklama: { tr: 'Şöhretin 100 iken öl.', en: 'Die with your fame at 100.' },
    kosul: (o) => o.state.un >= 100,
  },
  {
    id: 'aziz',
    ikon: '😇',
    ad: { tr: 'Aziz', en: 'Saint' },
    aciklama: { tr: 'Ahlakın en az 95 iken öl.', en: 'Die with your morality at 95 or higher.' },
    kosul: (o) => o.state.ahlak >= 95,
  },
  {
    id: 'kanli_eller',
    ikon: '🩸',
    gizli: true,
    ad: { tr: 'Kanlı Eller', en: 'Bloody Hands' },
    aciklama: {
      tr: 'Suç/aranma seviyen 80\'in üstündeyken öl.',
      en: 'Die with your crime/wanted level above 80.',
    },
    kosul: (o) => o.state.suc_seviyesi >= 80,
  },
  {
    id: 'hanedan',
    ikon: '👨‍👩‍👧‍👦',
    ad: { tr: 'Kalabalık Sofra', en: 'A Full Table' },
    aciklama: { tr: 'En az 4 yaşayan çocuğun varken öl.', en: 'Die with at least 4 living children.' },
    kosul: (o) => yasayanCocuk(o.state) >= 4,
  },
  {
    id: 'zirvenin_adami',
    ikon: '🏔️',
    ad: { tr: 'Zirvenin Adamı', en: 'Person at the Summit' },
    aciklama: { tr: '5. rütbe seviyesine ulaş.', en: 'Reach rank level 5.' },
    kosul: (o) => o.state.rutbe_seviye >= 5,
  },
  {
    id: 'sehir_yonetimi',
    ikon: '🏛️',
    ad: { tr: 'Şehrin Efendisi', en: 'Lord of the City' },
    aciklama: { tr: 'Şehir yönetiminde bir unvan taşırken öl.', en: 'Die holding a city-administration title.' },
    kosul: (o) => o.state.sehir_yonetim_seviyesi >= 1,
  },
  {
    id: 'kasif',
    ikon: '🧭',
    ad: { tr: 'Kâşif', en: 'Explorer' },
    aciklama: { tr: 'Bir büyük yolculuğu tamamla.', en: 'Complete a great journey.' },
    kosul: (o) => etiketVar(o.state, 'yolculuk_tamamlandi'),
  },
  {
    id: 'firari',
    ikon: '🏃',
    gizli: true,
    ad: { tr: 'Firari', en: 'Fugitive' },
    aciklama: { tr: 'Kaçak olarak, dağlarda öl.', en: 'Die as a fugitive, out in the hills.' },
    kosul: (o) => etiketVar(o.state, 'kacak'),
  },
  {
    id: 'mutevazi_son',
    ikon: '🌾',
    ad: { tr: 'Mütevazı Son', en: 'A Humble End' },
    aciklama: {
      tr: 'Hiç mülk almadan, kendi işine hiç yatırım yapmadan en az 70 yaşında öl.',
      en: 'Die at 70+ without ever buying property or investing in your own business.',
    },
    kosul: (o) => o.state.yas >= 70 && o.state.mulkler.length === 0 && o.state.kendi_isi_yatirim_sayisi === 0,
  },
  {
    id: 'kisa_parlak',
    ikon: '☄️',
    ad: { tr: 'Kısa ama Parlak', en: 'Short but Bright' },
    aciklama: {
      tr: '35 yaşından önce öl ama 250.000 puanın üstünde bir skor bırak.',
      en: 'Die before 35 but leave a score above 250,000.',
    },
    kosul: (o) => o.state.yas < 35 && o.skor >= 250000,
  },
  {
    id: 'yedi_canli',
    ikon: '🐈‍⬛',
    gizli: true,
    ad: { tr: 'Yedi Canlı', en: 'Nine Lives' },
    aciklama: {
      tr: 'Kutsal bir emanet seni ölümden bir kez döndürsün.',
      en: 'Have a holy relic pull you back from death once.',
    },
    kosul: (o) =>
      o.state.hayat_hikayesi.some((h) => /kutsal|relic|holy/i.test(h.baslik)),
  },
  {
    id: 'gizemli_kader',
    ikon: '🔮',
    gizli: true,
    ad: { tr: 'Gizemli Kader', en: 'A Mysterious Fate' },
    aciklama: {
      tr: 'Gizemli bir eşyayı yanında taşırken öl.',
      en: 'Die while carrying a mysterious item.',
    },
    kosul: (o) => o.state.etiketler.some((e) => e.startsWith('esya:') || e.startsWith('envanter:')),
  },
  {
    id: 'tam_kadro',
    ikon: '⚔️',
    ad: { tr: 'Tam Kadro', en: 'Full Roster' },
    aciklama: { tr: 'Aynı anda en az 5 ekip üyen olsun.', en: 'Have at least 5 team members at once.' },
    kosul: (o) => o.state.ekip.length >= 5,
  },
  {
    id: 'servet',
    ikon: '💰',
    ad: { tr: 'Çağ Atlayan Servet', en: 'Era-Spanning Fortune' },
    aciklama: { tr: '1000 birimin üstünde nakitle öl.', en: 'Die with over 1000 in cash.' },
    kosul: (o) => o.state.para >= 1000,
  },
  {
    id: 'amac',
    ikon: '🎯',
    ad: { tr: 'Kaderini Tamamladı', en: 'Fulfilled Their Fate' },
    aciklama: { tr: 'Hayat amacını tamamlayarak öl.', en: 'Die having completed your life goal.' },
    kosul: (o) => o.state.hayat_amaci?.tamamlandi === true,
  },
  {
    id: 'ayyas',
    ikon: '🍷',
    gizli: true,
    ad: { tr: 'Meyhanenin Müdavimi', en: 'Tavern Regular' },
    aciklama: { tr: 'Ayyaş damgası yemişken öl.', en: 'Die bearing the drunkard mark.' },
    kosul: (o) => etiketVar(o.state, 'bagimlilik:ayyas'),
  },
  {
    id: 'evli_barkli',
    ikon: '💍',
    ad: { tr: 'Ömürlük Yoldaş', en: 'Lifelong Companion' },
    aciklama: {
      tr: 'Evli, eş puanı 90\'ın üstündeyken öl.',
      en: 'Die married, with a spouse score above 90.',
    },
    kosul: (o) => etiketVar(o.state, 'medeni:evli') && o.state.es_puani >= 90,
  },
  {
    id: 'komutan',
    ikon: '🛡️',
    ad: { tr: 'Ordular Toplayan', en: 'Gatherer of Armies' },
    aciklama: { tr: 'Ordu mevcudun 250\'nin üstündeyken öl.', en: 'Die with an army over 250 strong.' },
    kosul: (o) => o.state.ordu_mevcudu >= 250,
  },
  {
    id: 'tefeci',
    ikon: '📈',
    ad: { tr: 'Ticaret Baronu', en: 'Trade Baron' },
    aciklama: { tr: 'Ticaret sermayen 200\'ün üstündeyken öl.', en: 'Die with trade capital above 200.' },
    kosul: (o) => o.state.ticaret_sermaye >= 200,
  },
  {
    id: 'nufuzlu',
    ikon: '🕊️',
    ad: { tr: 'Cemaatin Sesi', en: 'Voice of the Faithful' },
    aciklama: { tr: 'Nüfuzun 150\'nin üstündeyken öl.', en: 'Die with influence above 150.' },
    kosul: (o) => o.state.nufuz >= 150,
  },
  {
    id: 'mulk_imparatoru',
    ikon: '🏘️',
    ad: { tr: 'Mülk İmparatoru', en: 'Property Emperor' },
    aciklama: { tr: 'Aynı anda en az 4 piyasa mülküne sahipken öl.', en: 'Die owning at least 4 market properties at once.' },
    kosul: (o) => o.state.mulkler.length >= 4,
  },
  {
    id: 'uzun_omur',
    ikon: '🕰️',
    ad: { tr: 'Bir Asra Yakın', en: 'Nearly a Century' },
    aciklama: { tr: '95 yaşını gör.', en: 'See your 95th year.' },
    kosul: (o) => o.state.yas >= 95,
  },
  {
    id: 'efsanevi_olum',
    ikon: '💀',
    gizli: true,
    ad: { tr: 'Efsaneleşerek Öldü', en: 'Died a Legend' },
    aciklama: {
      tr: 'Bir "efsanevi ölüm" ile hayata veda et.',
      en: 'Bow out with a "legendary death".',
    },
    kosul: (o) => !!o.state.efsanevi_olum,
  },
  {
    id: 'ilk_hayat',
    ikon: '🌱',
    ad: { tr: 'İlk Kader', en: 'A First Fate' },
    aciklama: { tr: 'İlk hayatını tamamla.', en: 'Complete your first life.' },
    kosul: (o) => o.istatistik.toplamOlum >= 1,
  },
  {
    id: 'on_hayat',
    ikon: '📚',
    ad: { tr: 'Kaderin Kroniği', en: 'Chronicle of Fate' },
    aciklama: { tr: 'Bu cihazda 10 hayat tamamla.', en: 'Complete 10 lives on this device.' },
    kosul: (o) => o.istatistik.toplamOlum >= 10,
  },
];

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

export function oyunIstatistigiGetir(): OyunIstatistigi {
  try {
    const ham = localStorage.getItem(ISTATISTIK_ANAHTAR);
    if (!ham) return { ...BOS_ISTATISTIK };
    const v = JSON.parse(ham) as Partial<OyunIstatistigi>;
    return {
      caglar: Array.isArray(v.caglar) ? v.caglar : [],
      meslekler: Array.isArray(v.meslekler) ? v.meslekler : [],
      bolgeler: Array.isArray(v.bolgeler) ? v.bolgeler : [],
      enYuksekSkor: typeof v.enYuksekSkor === 'number' ? v.enYuksekSkor : 0,
      toplamOlum: typeof v.toplamOlum === 'number' ? v.toplamOlum : 0,
    };
  } catch {
    return { ...BOS_ISTATISTIK };
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

/** hesaplaSkor (sunucu, yama #1) ile aynı: yas × max(un,1) × servetFaktoru, amaç tamamlandıysa ×5. */
function skorHesapla(s: CharacterState): number {
  const servet = s.para; // istemcide gayrimenkul değeri yok; nakit yeterince iyi bir yaklaşım
  const servetFaktoru = servet > 0 ? 1 + Math.log10(1 + servet) : Math.max(0.15, 1 + servet / 400);
  const taban = Math.round(s.yas * Math.max(s.un, 1) * servetFaktoru);
  return s.hayat_amaci?.tamamlandi ? taban * 5 : taban;
}

export interface BasarimDegerlendirmeSonucu {
  yeniAcilanlar: BasarimTanimi[];
  istatistik: OyunIstatistigi;
}

/**
 * Ölmüş bir karakter için başarımları değerlendirir: çapraz-oyun istatistiğini günceller,
 * kilidi yeni açılanları kalıcı olarak işaretler ve döner (ölüm ekranındaki bildirim için).
 * Aynı karakterde tekrar çağrılması güvenlidir (idempotent değil ama zararsız — istatistik
 * çağrı başına artabilir; bu yüzden çağıran, ekran/karakter değişiminde bir kez çağırmalı).
 */
export function basarimlariDegerlendir(state: CharacterState): BasarimDegerlendirmeSonucu {
  const skor = skorHesapla(state);

  // Aynı ölüm için ikinci kez çağrılırsa istatistiği tekrar artırma; yalnız mevcut durumu döndür.
  const degerlendirilen = okuSet(DEGERLENDIRILEN_ANAHTAR);
  if (degerlendirilen.has(state.id)) {
    return { yeniAcilanlar: [], istatistik: oyunIstatistigiGetir() };
  }

  const ist = oyunIstatistigiGetir();
  if (!ist.caglar.includes(state.cag)) ist.caglar = [...ist.caglar, state.cag];
  if (state.meslek && !ist.meslekler.includes(state.meslek)) ist.meslekler = [...ist.meslekler, state.meslek];
  if (!ist.bolgeler.includes(state.bolge)) ist.bolgeler = [...ist.bolgeler, state.bolge];
  ist.enYuksekSkor = Math.max(ist.enYuksekSkor, skor);
  ist.toplamOlum += 1;
  istatistikYaz(ist);

  const ozet: BasarimOzeti = { state, skor, istatistik: ist };
  const acilan = acilanBasarimIdleri();
  const yeniAcilanlar: BasarimTanimi[] = [];

  for (const b of BASARIMLAR) {
    if (acilan.has(b.id)) continue;
    let gecti = false;
    try {
      gecti = b.kosul(ozet);
    } catch {
      gecti = false;
    }
    if (gecti) {
      acilan.add(b.id);
      yeniAcilanlar.push(b);
    }
  }
  if (yeniAcilanlar.length > 0) yazSet(ACILAN_ANAHTAR, acilan);

  degerlendirilen.add(state.id);
  // Son N id yeterli — sınırsız büyümesin.
  const kirpik = Array.from(degerlendirilen).slice(-DEGERLENDIRILEN_MAKS);
  yazSet(DEGERLENDIRILEN_ANAHTAR, new Set(kirpik));

  return { yeniAcilanlar, istatistik: ist };
}
