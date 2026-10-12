import type { Dil } from './ayarlar';

export interface BolgeTema {
  renk1: string;
  renk2: string;
  sembol: string;
}

const VARSAYILAN: BolgeTema = { renk1: '#4a3728', renk2: '#2a1f18', sembol: '🏳️' };

export const BOLGE_TEMALARI: Record<string, BolgeTema> = {
  Fransa: { renk1: '#2b3a8f', renk2: '#1a2456', sembol: '⚜️' },
  'Kutsal Roma': { renk1: '#3a3a3a', renk2: '#1a1a1a', sembol: '🦅' },
  Bizans: { renk1: '#5a2d7a', renk2: '#331645', sembol: '☦️' },
  Selçuklu: { renk1: '#8a1f2d', renk2: '#4a1017', sembol: '🌙' },
  Eyyubiler: { renk1: '#1f6b3a', renk2: '#0f3a1f', sembol: '🦁' },
  İngiltere: { renk1: '#8a1f2d', renk2: '#2b3a8f', sembol: '🎩' },
  Osmanlı: { renk1: '#8a1f2d', renk2: '#1f6b3a', sembol: '🕌' },
  Rusya: { renk1: '#8a1f2d', renk2: '#3a2a10', sembol: '❄️' },
};

export function bolgeTemasiGetir(bolge: string): BolgeTema {
  return BOLGE_TEMALARI[bolge] ?? VARSAYILAN;
}

const KATEGORI_GORSEL: Record<string, string> = {
  savas: '⚔️',
  ticaret: '💰',
  din: '🙏',
  siyaset: '🏛️',
  saglik: '❤️‍🩹',
  sosyal: '🎉',
};

export function sonucIkonuGetir(basarili: boolean, olduMu: boolean, kategori?: string): string {
  if (olduMu) return '💀';
  if (basarili) return (kategori && KATEGORI_GORSEL[kategori]) || '✅';
  return '⚠️';
}

const AHLAK_ETIKETLERI: [number, string, string][] = [
  [15, 'Zalim', 'Ruthless'],
  [30, 'Onursuz', 'Dishonorable'],
  [50, 'Sıradan', 'Unremarkable'],
  [70, 'Onurlu', 'Honorable'],
  [85, 'Yüksek Onurlu', 'Highly Honorable'],
  [100, 'Gurur Abidesi', 'Paragon of Pride'],
];

export function ahlakEtiketi(ahlak: number, dil: Dil = 'tr'): string {
  const i = dil === 'en' ? 2 : 1;
  for (const satir of AHLAK_ETIKETLERI) {
    if (ahlak <= satir[0]) return satir[i] as string;
  }
  return AHLAK_ETIKETLERI[AHLAK_ETIKETLERI.length - 1][i] as string;
}

/**
 * Şöhret (kod alanı `un`) artık oyuncuya çıplak bir sayı/yıldız olarak değil,
 * 8 kademeli bir ünvan olarak gösterilir. İlk kademeler hızlı açılır, son 2
 * kademe (Tarihi Şahsiyet, Yaşayan Efsane) kasıtlı olarak devasa bir puan
 * sıçraması gerektirir — değer 0-100 aralığında clamp'lendiği için bu son iki
 * kademe tavana çok yakın, dar bir bantta sıkışır ve neredeyse ulaşılamaz kalır.
 */
const UN_UNVANLARI: [number, string, string][] = [
  [0, 'Kimliği Belirsiz', 'Unknown Face'],
  [5, 'Aşina Yüz', 'Familiar Face'],
  [15, 'Bilindik İsim', 'Known Name'],
  [30, 'Saygın Birey', 'Respected Figure'],
  [50, 'Bölgenin Gururu', "Pride of the Region"],
  [70, 'Şöhretli', 'Renowned'],
  [88, 'Tarihi Şahsiyet', 'Historic Figure'],
  [99, 'Yaşayan Efsane', 'Living Legend'],
];

export function unUnvani(un: number, dil: Dil = 'tr'): string {
  const i = dil === 'en' ? 2 : 1;
  let sonuc = UN_UNVANLARI[0][i] as string;
  for (const satir of UN_UNVANLARI) {
    if (un >= satir[0]) sonuc = satir[i] as string;
    else break;
  }
  return sonuc;
}

/** Aranma (suç) seviyesini üst şeritte yıldız olarak göstermek için 0-5 aralığına ölçekler. */
export function aranmaYildiz(sucSeviyesi: number): number {
  // Aranma yeniden dengeleme turu: 5 yıldız/20-band → 4 yıldız/25-band
  // (bkz. server/src/data/olaylar/aranmaSeviyesi.ts kademe bantları).
  return Math.max(0, Math.min(4, sucSeviyesi / 25));
}

export type GostergeTonu = 'iyi' | 'orta' | 'kotu' | 'kritik';

export interface GostergeGorunumu {
  /** Değere göre kademeli emoji (değer düştükçe/yükseldikçe değişir). */
  ikon: string;
  /** Dolum çubuğunun rengi/animasyonu için kademe. */
  ton: GostergeTonu;
  /** Çubuğun doluluk oranı, 0-1. */
  oran: number;
}

/** Para çubuğunun tam dolu sayıldığı birim cinsinden servet çıpası (zorunlu bağış eşiğiyle aynı büyüklük). */
const PARA_CUBUK_CIPASI = 350;

const sinirla01 = (x: number) => Math.max(0, Math.min(1, x));

/**
 * Üst şerit göstergelerinin kademeli görünümü: değer düştükçe emoji ve çubuk rengi değişir.
 * Ahlak/Şöhret düşükken "tehlike" değildir (yeni karakterler bile düşük şöhretle başlar),
 * bu yüzden bu ikisi en kötü `kotu` tonuna iner, `kritik` yalnız Can/Mutluluk/Para'ya özeldir.
 */
export function gostergeGorunumu(stat: 'saglik' | 'mutluluk' | 'ahlak' | 'sohret' | 'para', deger: number): GostergeGorunumu {
  const kademeTonu = (d: number, kritikVar: boolean): GostergeTonu =>
    d >= 60 ? 'iyi' : d >= 40 ? 'orta' : d >= 20 || !kritikVar ? 'kotu' : 'kritik';
  switch (stat) {
    case 'saglik':
      return { ikon: deger >= 60 ? '❤️' : deger > 30 ? '🩹' : '💔', ton: kademeTonu(deger, true), oran: sinirla01(deger / 100) };
    case 'mutluluk':
      return { ikon: deger >= 60 ? '🙂' : deger > 30 ? '😐' : deger > 15 ? '😞' : '😭', ton: kademeTonu(deger, true), oran: sinirla01(deger / 100) };
    case 'ahlak':
      return { ikon: deger >= 71 ? '😇' : deger > 30 ? '⚖️' : '😈', ton: kademeTonu(deger, false), oran: sinirla01(deger / 100) };
    case 'sohret':
      return {
        ikon: deger >= 80 ? '🌟' : deger >= 50 ? '⭐' : deger >= 15 ? '🏅' : '👤',
        ton: deger >= 50 ? 'iyi' : deger >= 15 ? 'orta' : 'kotu',
        oran: sinirla01(deger / 100),
      };
    case 'para':
      return {
        ikon: deger < 0 ? '💸' : deger < 5 ? '🪙' : '💰',
        ton: deger < 0 ? 'kritik' : deger < 5 ? 'kotu' : deger < 40 ? 'orta' : 'iyi',
        oran: deger <= 0 ? 0 : sinirla01(deger / PARA_CUBUK_CIPASI),
      };
  }
}

export const HAYVAN_SIMGESI: Record<string, string> = {
  Kedi: '🐈',
  Köpek: '🐕',
  Kurt: '🐺',
  Şahin: '🦅',
  Papağan: '🦜',
};

/** Mesleklerin hangi yatkınlık kategorisine karşılık geldiği. */
export const MESLEK_KATEGORI: Record<string, string> = {
  Asker: 'savas',
  Tüccar: 'ticaret',
  'Din Adamı': 'din',
  Zanaatkâr: 'zanaat',
};

export const KATEGORI_ADI: Record<string, string> = {
  savas: 'Askerlik',
  ticaret: 'Ticaret',
  din: 'Din',
  siyaset: 'Siyaset',
  saglik: 'Sağlık',
  sosyal: 'Sosyal',
  zanaat: 'Zanaat',
};

const KATEGORI_ADI_EN: Record<string, string> = {
  savas: 'Soldiering',
  ticaret: 'Trade',
  din: 'Faith',
  siyaset: 'Politics',
  saglik: 'Health',
  sosyal: 'Social',
  zanaat: 'Craft',
};

export function kategoriAdi(kategori: string, dil: Dil = 'tr'): string {
  return (dil === 'en' ? KATEGORI_ADI_EN : KATEGORI_ADI)[kategori] ?? kategori;
}

const YATKINLIK_ETIKETLERI: [number, string, string, string][] = [
  [-18, 'Hiç Yatkın Değil', 'No Aptitude', '❌'],
  [-8, 'Az Yatkın', 'Low Aptitude', '👎'],
  [7, 'Nötr', 'Neutral', '➖'],
  [17, 'Yatkın', 'Apt', '👍'],
  [Infinity, 'Çok Yatkın', 'Very Apt', '🔥'],
];

export function yatkinlikEtiketi(deger: number, dil: Dil = 'tr'): { etiket: string; simge: string } {
  const i = dil === 'en' ? 2 : 1;
  for (const satir of YATKINLIK_ETIKETLERI) {
    if (deger <= satir[0]) return { etiket: satir[i] as string, simge: satir[3] as string };
  }
  return { etiket: dil === 'en' ? 'Very Apt' : 'Çok Yatkın', simge: '🔥' };
}

/**
 * Meslek seçiminde gösterilen yatkınlık bonus önizlemesi — sunucudaki
 * meslekYatkinlik.ts kademe eşikleri/oranlarının aynası (<=-5 kötü, -4..4 nötr,
 * 5..19 iyi, >=20 mükemmel). Oranlar yüzde olarak; mükemmelde tek seferlik şöhret de var.
 */
export function meslekYatkinlikOnizleme(
  puan: number,
): { seviye: 1 | 2 | 3 | 4; zar: number; maas: number; tecrube: number; sohret: number } {
  if (puan <= -5) return { seviye: 1, zar: -15, maas: -10, tecrube: -15, sohret: 0 };
  if (puan >= 20) return { seviye: 4, zar: 20, maas: 10, tecrube: 15, sohret: 8 };
  if (puan >= 5) return { seviye: 3, zar: 10, maas: 5, tecrube: 7, sohret: 0 };
  return { seviye: 2, zar: 0, maas: 0, tecrube: 0, sohret: 0 };
}

interface DonemselTema {
  ad: string;
  adEn: string;
  simge: string;
}

/**
 * Konut kademelerinin (nemli_baraka/mutevazi_yuva/sicak_ocak/saglam_konut/
 * gorkemli_konak — bkz. server/src/data/konutlar.ts) çağ VE bölgeye göre
 * dönemsel görünen adı ve simgesi (Faz 9, 2026-09 sonu — eskiden yalnız çağa
 * göre değişiyordu, ülke ayrımı yoktu). Sunucudaki kira/etki değerleri
 * değişmez, sadece oyuncuya gösterilen isim/simge döneme VE ülkeye uygun hale
 * gelir. Anahtar `${cag}|${bolge}` — server/src/data/sosyallesmeAksiyonlari.ts
 * BOLGE_ICECEKLERI ile aynı desen (Eyyubiler dahil, eski kayıt uyumu için).
 * Eşleşme bulunamazsa çağıranın verdiği jenerik ad/simgeye (konutlar.ts'teki
 * taban değerler) düşülür.
 */
const KONUT_TEMALARI: Record<string, Record<string, DonemselTema>> = {
  'Orta Çağ|Fransa': {
    nemli_baraka: { ad: 'Samanlı Kulübe', adEn: 'Thatched Hovel', simge: '🛖' },
    mutevazi_yuva: { ad: 'Bağ Evi', adEn: 'Vineyard Cottage', simge: '🏠' },
    sicak_ocak: { ad: 'Şömineli Köy Evi', adEn: 'Cottage with a Hearth', simge: '🔥' },
    saglam_konut: { ad: 'Taşra Malikânesi', adEn: 'Provincial Manor', simge: '🏡' },
    gorkemli_konak: { ad: 'Loire Şatosu', adEn: 'Loire Château', simge: '🏰' },
  },
  'Orta Çağ|Kutsal Roma': {
    nemli_baraka: { ad: 'Kerpiç Baraka', adEn: 'Mudbrick Shack', simge: '🛖' },
    mutevazi_yuva: { ad: 'Yarım Ahşap Ev', adEn: 'Timber-Framed House', simge: '🏠' },
    sicak_ocak: { ad: 'Çinili Sobalı Ev', adEn: 'Tiled-Stove House', simge: '🔥' },
    saglam_konut: { ad: 'Dağ Eteği Çiftliği', adEn: 'Foothill Farmstead', simge: '🏡' },
    gorkemli_konak: { ad: 'Ren Şatosu', adEn: 'Rhine Castle', simge: '🏰' },
  },
  'Orta Çağ|Bizans': {
    nemli_baraka: { ad: 'Liman Kenarı Baraka', adEn: 'Harborside Shack', simge: '🛖' },
    mutevazi_yuva: { ad: 'Taş Avlulu Ev', adEn: 'Stone Courtyard House', simge: '🏠' },
    sicak_ocak: { ad: 'Bahçeli Avlu Evi', adEn: 'Garden Courtyard House', simge: '🌿' },
    saglam_konut: { ad: 'Mermer Serinlikli Konak', adEn: 'Marble-Cooled Manor', simge: '🏛️' },
    gorkemli_konak: { ad: 'Altın Boynuz Sarayı', adEn: 'Golden Horn Palace', simge: '🏰' },
  },
  'Orta Çağ|Selçuklu': {
    nemli_baraka: { ad: 'Kerpiç Dam', adEn: 'Mudbrick Hut', simge: '🛖' },
    mutevazi_yuva: { ad: 'Kerpiç Avlu Evi', adEn: 'Mudbrick Courtyard House', simge: '🏠' },
    sicak_ocak: { ad: 'Fıskiyeli Avlu Evi', adEn: 'Fountain Courtyard House', simge: '💧' },
    saglam_konut: { ad: 'Hamamlı Konak', adEn: 'Manor with a Bathhouse', simge: '🛁' },
    gorkemli_konak: { ad: 'Sırçalı Köşk', adEn: 'Glazed Pavilion', simge: '🕌' },
  },
  'Orta Çağ|Eyyubiler': {
    nemli_baraka: { ad: 'Çamur Damlı Ev', adEn: 'Mud-Roofed House', simge: '🛖' },
    mutevazi_yuva: { ad: 'Taş Avlu Evi', adEn: 'Stone Courtyard House', simge: '🏠' },
    sicak_ocak: { ad: 'Fıskiyeli Şam Evi', adEn: 'Damascene Fountain House', simge: '💧' },
    saglam_konut: { ad: 'Hamamlı Ev', adEn: 'House with a Bathhouse', simge: '🛁' },
    gorkemli_konak: { ad: 'Kale Eteği Konağı', adEn: 'Citadel-Foot Mansion', simge: '🏯' },
  },
  'Sanayi Devrimi|İngiltere': {
    nemli_baraka: { ad: 'Rıhtım Gecekondusu', adEn: 'Dockside Slum', simge: '🏚️' },
    mutevazi_yuva: { ad: 'Tuğla Sıra Ev', adEn: 'Brick Terrace House', simge: '🏘️' },
    sicak_ocak: { ad: 'Bahçeli Kır Evi', adEn: 'Country Cottage with a Garden', simge: '🌷' },
    saglam_konut: { ad: 'Deniz Kenarı Villası', adEn: 'Seaside Villa', simge: '🏖️' },
    gorkemli_konak: { ad: 'Viktorya Konağı', adEn: 'Victorian Manor', simge: '🏛️' },
  },
  'Sanayi Devrimi|Fransa': {
    nemli_baraka: { ad: 'Tavan Arası Odası', adEn: 'Garret Room', simge: '🏚️' },
    mutevazi_yuva: { ad: 'Kiracı Apartmanı', adEn: 'Tenant Apartment', simge: '🏢' },
    sicak_ocak: { ad: 'Balkonlu Paris Dairesi', adEn: 'Parisian Flat with a Balcony', simge: '🌸' },
    saglam_konut: { ad: 'Bahçeli Banliyö Evi', adEn: 'Garden Suburb House', simge: '🏡' },
    gorkemli_konak: { ad: 'Haussmann Konağı', adEn: 'Haussmann Townhouse', simge: '🏛️' },
  },
  'Sanayi Devrimi|Osmanlı': {
    nemli_baraka: { ad: 'Rutubetli Gecekondu', adEn: 'Damp Shantyhouse', simge: '🏚️' },
    mutevazi_yuva: { ad: 'Bağdadi Ahşap Ev', adEn: 'Bağdadi-Style Wooden House', simge: '🏠' },
    sicak_ocak: { ad: 'Cumbalı Ahşap Ev', adEn: 'Wooden House with a Bay Window', simge: '🏠' },
    saglam_konut: { ad: 'Çamlıca Köşkü', adEn: 'Çamlıca Hillside Pavilion', simge: '🏡' },
    gorkemli_konak: { ad: 'Boğaziçi Yalısı', adEn: 'Bosphorus Yalı Mansion', simge: '🏯' },
  },
  'Sanayi Devrimi|Rusya': {
    nemli_baraka: { ad: 'Köhne İzba', adEn: 'Decrepit Izba', simge: '🛖' },
    mutevazi_yuva: { ad: 'Ahşap İzba', adEn: 'Wooden Izba', simge: '🏠' },
    sicak_ocak: { ad: 'Oymalı İzba', adEn: 'Carved Izba', simge: '🏠' },
    saglam_konut: { ad: 'Kır Dachası', adEn: 'Country Dacha', simge: '🏡' },
    gorkemli_konak: { ad: 'Neva Kıyısı Sarayı', adEn: 'Neva-side Palace', simge: '🏰' },
  },
};

export function konutGoruntusuGetir(
  konutId: string,
  varsayilanAd: string,
  varsayilanSimge: string,
  cag: string,
  bolge: string,
  dil: Dil = 'tr'
): { ad: string; simge: string } {
  const tema = KONUT_TEMALARI[`${cag}|${bolge}`]?.[konutId];
  if (!tema) return { ad: varsayilanAd, simge: varsayilanSimge };
  return { ad: dil === 'en' ? tema.adEn : tema.ad, simge: tema.simge };
}

/**
 * yasamSecenekleri.ts kademelerinin (bayat_artik/sade_sofra/keyifli_sofra/
 * dengeli_sofra/solen_sofrasi) çağ + bölgeye göre dönemsel görünen adı ve
 * simgesi — konutGoruntusuGetir'in sofra karşılığı (Faz 9, 2026-09 sonu; eskiden
 * yaşam tarzı kartlarının hiç bölgesel/dönemsel bir adı yoktu).
 */
const YASAM_TEMALARI: Record<string, Record<string, DonemselTema>> = {
  'Orta Çağ|Fransa': {
    bayat_artik: { ad: 'Bayat Ekmek Kırıntısı', adEn: 'Stale Bread Scraps', simge: '🍞' },
    sade_sofra: { ad: 'Sade Çorba ve Ekmek', adEn: 'Plain Soup and Bread', simge: '🍲' },
    keyifli_sofra: { ad: 'Şaraplı Güveç', adEn: 'Wine-Braised Stew', simge: '🍷' },
    dengeli_sofra: { ad: 'Taze Sebze ve Peynir', adEn: 'Fresh Vegetables and Cheese', simge: '🧀' },
    solen_sofrasi: { ad: 'Kraliyet Ziyafeti', adEn: 'Royal Feast', simge: '🍖' },
  },
  'Orta Çağ|Kutsal Roma': {
    bayat_artik: { ad: 'Küf Kokan Yulaf Lapası', adEn: 'Moldy Oat Gruel', simge: '🥣' },
    sade_sofra: { ad: 'Siyah Ekmek ve Turp', adEn: 'Black Bread and Radish', simge: '🍞' },
    keyifli_sofra: { ad: 'Bal Şerbetli Sofra', adEn: 'Honey-Mead Spread', simge: '🍯' },
    dengeli_sofra: { ad: 'Lahana Turşusu ve Sosis', adEn: 'Sauerkraut and Sausage', simge: '🥬' },
    solen_sofrasi: { ad: 'Domuz Kızartması Şöleni', adEn: 'Roast Boar Feast', simge: '🐗' },
  },
  'Orta Çağ|Bizans': {
    bayat_artik: { ad: 'Bayat Arpa Ekmeği', adEn: 'Stale Barley Bread', simge: '🍞' },
    sade_sofra: { ad: 'Zeytin ve Peynirli Sofra', adEn: 'Olives and Cheese', simge: '🫒' },
    keyifli_sofra: { ad: 'Ballı Fıstıklı Tatlı Sofra', adEn: 'Honey-Pistachio Sweets', simge: '🍯' },
    dengeli_sofra: { ad: 'Balık ve Zeytinyağlı Sebze', adEn: 'Fish and Olive-Oil Vegetables', simge: '🐟' },
    solen_sofrasi: { ad: 'İmparatorluk Sofrası', adEn: 'Imperial Table', simge: '👑' },
  },
  'Orta Çağ|Selçuklu': {
    bayat_artik: { ad: 'Kuru Bulgur Lapası', adEn: 'Dry Bulgur Mush', simge: '🥣' },
    sade_sofra: { ad: 'Yoğurtlu Çorba ve Pide', adEn: 'Yogurt Soup and Flatbread', simge: '🍲' },
    keyifli_sofra: { ad: 'Baklavalı Şerbetli Sofra', adEn: 'Baklava and Sherbet Spread', simge: '🍯' },
    dengeli_sofra: { ad: 'Etli Sebze Yahnisi', adEn: 'Meat and Vegetable Stew', simge: '🍛' },
    solen_sofrasi: { ad: 'Sultan Sofrası', adEn: "Sultan's Table", simge: '👑' },
  },
  'Orta Çağ|Eyyubiler': {
    bayat_artik: { ad: 'Kuru Nohut Lapası', adEn: 'Dry Chickpea Mush', simge: '🥣' },
    sade_sofra: { ad: 'Mercimek Çorbası ve Pide', adEn: 'Lentil Soup and Flatbread', simge: '🍲' },
    keyifli_sofra: { ad: 'Hurmalı Şerbetli Sofra', adEn: 'Date and Sherbet Spread', simge: '🌴' },
    dengeli_sofra: { ad: 'Sebzeli Kuzu Yahnisi', adEn: 'Lamb and Vegetable Stew', simge: '🍖' },
    solen_sofrasi: { ad: 'Emir Sofrası', adEn: "Emir's Table", simge: '👑' },
  },
  'Sanayi Devrimi|İngiltere': {
    bayat_artik: { ad: 'Su Katılmış Lapa', adEn: 'Watered-Down Gruel', simge: '🥣' },
    sade_sofra: { ad: 'Ekmek ve Peynir Tabağı', adEn: 'Bread and Cheese Plate', simge: '🧀' },
    keyifli_sofra: { ad: 'Çay Saati Tatlıları', adEn: 'Afternoon Tea Sweets', simge: '🫖' },
    dengeli_sofra: { ad: 'Sebzeli Et Yahnisi', adEn: 'Meat and Vegetable Stew', simge: '🍲' },
    solen_sofrasi: { ad: 'Lord Sofrası: Rosto', adEn: "Lord's Table: Roast Dinner", simge: '🍖' },
  },
  'Sanayi Devrimi|Fransa': {
    bayat_artik: { ad: 'Sulu Lahana Çorbası', adEn: 'Watery Cabbage Soup', simge: '🥣' },
    sade_sofra: { ad: 'Baget ve Peynir', adEn: 'Baguette and Cheese', simge: '🥖' },
    keyifli_sofra: { ad: 'Kruvasan ve Kahve', adEn: 'Croissant and Coffee', simge: '☕' },
    dengeli_sofra: { ad: 'Sebze Ragusu', adEn: 'Vegetable Ragout', simge: '🥕' },
    solen_sofrasi: { ad: 'Haute Cuisine Sofrası', adEn: 'Haute Cuisine Table', simge: '🍷' },
  },
  'Sanayi Devrimi|Osmanlı': {
    bayat_artik: { ad: 'Kuru Bulgur ve Soğan', adEn: 'Dry Bulgur and Onion', simge: '🧅' },
    sade_sofra: { ad: 'Zeytinyağlı Sofra', adEn: 'Olive-Oil Dishes', simge: '🫒' },
    keyifli_sofra: { ad: 'Muhallebici Tatlı Sofrası', adEn: 'Milk-Pudding Sweets', simge: '🍮' },
    dengeli_sofra: { ad: 'Sebzeli Et Yemeği', adEn: 'Meat and Vegetable Dish', simge: '🍛' },
    solen_sofrasi: { ad: 'Paşa Sofrası', adEn: "Pasha's Table", simge: '👑' },
  },
  'Sanayi Devrimi|Rusya': {
    bayat_artik: { ad: 'Sulu Lahana Aşı', adEn: 'Watery Shchi', simge: '🥣' },
    sade_sofra: { ad: 'Kara Ekmek ve Pancar Çorbası', adEn: 'Black Bread and Borscht', simge: '🍲' },
    keyifli_sofra: { ad: 'Semaver Başı Çay Sofrası', adEn: 'Samovar Tea Table', simge: '🫖' },
    dengeli_sofra: { ad: 'Balık ve Lahana Sofrası', adEn: 'Fish and Cabbage Table', simge: '🐟' },
    solen_sofrasi: { ad: 'Çariçe Sofrası', adEn: "Tsarina's Table", simge: '👑' },
  },
};

export function yasamGoruntusuGetir(
  secenekId: string,
  varsayilanAd: string,
  varsayilanSimge: string,
  cag: string,
  bolge: string,
  dil: Dil = 'tr'
): { ad: string; simge: string } {
  const tema = YASAM_TEMALARI[`${cag}|${bolge}`]?.[secenekId];
  if (!tema) return { ad: varsayilanAd, simge: varsayilanSimge };
  return { ad: dil === 'en' ? tema.adEn : tema.ad, simge: tema.simge };
}

/**
 * Sahnede solda beliren işyeri binası — meslek + çağa göre (Din Adamı için ayrıca
 * din_kultur'e göre) seçilir. Konut simgeleri gibi tek bir emoji kullanır, ayrı bir
 * sanat varlığı gerektirmez.
 */
const MESLEK_BINA_TEMALARI: Record<string, Partial<Record<string, { ad: string; adEn: string; simge: string }>>> = {
  Asker: {
    'Orta Çağ': { ad: 'Garnizon', adEn: 'Garrison', simge: '🏯' },
    'Sanayi Devrimi': { ad: 'Kışla', adEn: 'Barracks', simge: '🪖' },
  },
  Tüccar: {
    'Orta Çağ': { ad: 'Çarşı Dükkânı', adEn: 'Bazaar Shop', simge: '🏪' },
    'Sanayi Devrimi': { ad: 'Fabrika', adEn: 'Factory', simge: '🏭' },
  },
  'Din Adamı': {
    'Orta Çağ': { ad: 'İbadethane', adEn: 'Place of Worship', simge: '⛪' },
    'Sanayi Devrimi': { ad: 'İbadethane', adEn: 'Place of Worship', simge: '⛪' },
  },
  Zanaatkâr: {
    'Orta Çağ': { ad: 'Atölye', adEn: 'Workshop', simge: '🔨' },
    'Sanayi Devrimi': { ad: 'Fabrika Atölyesi', adEn: 'Factory Workshop', simge: '⚙️' },
  },
};

const CAMI_TEMASI = { ad: 'Cami', adEn: 'Mosque', simge: '🕌' };

export function meslekBinasiGetir(
  meslek: string,
  cag: string,
  dinKultur?: string,
  dil: Dil = 'tr'
): { ad: string; simge: string } {
  const en = dil === 'en';
  if (meslek === 'Din Adamı' && dinKultur === 'Sünni İslam')
    return { ad: en ? CAMI_TEMASI.adEn : CAMI_TEMASI.ad, simge: CAMI_TEMASI.simge };
  const t = MESLEK_BINA_TEMALARI[meslek]?.[cag];
  if (!t) return { ad: meslek, simge: '🏛️' };
  return { ad: en ? t.adEn : t.ad, simge: t.simge };
}
