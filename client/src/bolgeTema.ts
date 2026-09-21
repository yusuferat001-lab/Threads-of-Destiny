import type { SonucEtkisi } from './types';
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

export interface EtkiTahmini {
  simge: string;
  metin: string;
  pozitif: boolean;
}

const PARA_BUYUKLUK_ESIKLERI: [number, string, string][] = [
  [10, 'küçük', 'small'],
  [30, 'orta', 'moderate'],
  [Infinity, 'büyük', 'large'],
];

const SAGLIK_BUYUKLUK_ESIKLERI: [number, string, string][] = [
  [6, 'küçük', 'small'],
  [15, 'orta', 'moderate'],
  [Infinity, 'büyük', 'large'],
];

const MUTLULUK_BUYUKLUK_ESIKLERI: [number, string, string][] = [
  [6, 'küçük', 'small'],
  [15, 'orta', 'moderate'],
  [Infinity, 'büyük', 'large'],
];

function buyuklukEtiketi(esikler: [number, string, string][], mutlakDeger: number, dil: Dil): string {
  const i = dil === 'en' ? 2 : 1;
  for (const satir of esikler) {
    if (mutlakDeger <= satir[0]) return satir[i] as string;
  }
  return esikler[esikler.length - 1][i] as string;
}

/**
 * İki olası sonuçtan (başarılı/başarısız) oyuncuya gösterilecek değerleri seçer —
 * kesin miktar değil, ihtimallerin kaba büyüklüğünü vermek için. Başarı ve
 * başarısızlık aynı yönde etkiliyorsa sadece daha dikkat çekici olanı döner;
 * zıt yönlerdeyse (biri kazanç biri kayıp) ikisini de döner, böylece oyuncu
 * "başarırsam kazanabilirim, başarısız olursam kaybedebilirim" ihtimalinin
 * her iki tarafını da görür.
 */
function belirginDegerler(a?: number, b?: number): number[] {
  const aVar = a !== undefined && a !== 0;
  const bVar = b !== undefined && b !== 0;
  if (!aVar && !bVar) return [];
  if (!aVar) return [b as number];
  if (!bVar) return [a as number];
  if (a! > 0 !== b! > 0) return [a as number, b as number];
  return [Math.abs(a as number) >= Math.abs(b as number) ? (a as number) : (b as number)];
}

/**
 * Bir seçeneğin olası para/sağlık/mutluluk etkisini "sisli" (kesin sayı içermeyen,
 * sadece küçük/orta/büyük + yön) bir tahmin listesine çevirir. Seçim yapılmadan
 * önce oyuncuya gösterilir; gerçek miktar sadece seçim sonrasında (EtkiCipleri
 * bileşeninde) görünür.
 */
export function etkiTahminiGetir(
  basariliSonuc: SonucEtkisi,
  basarisizSonuc: SonucEtkisi,
  dil: Dil = 'tr'
): EtkiTahmini[] {
  const tahminler: EtkiTahmini[] = [];
  const en = dil === 'en';

  for (const para of belirginDegerler(basariliSonuc.para, basarisizSonuc.para)) {
    const b = buyuklukEtiketi(PARA_BUYUKLUK_ESIKLERI, Math.abs(para), dil);
    tahminler.push({
      simge: '💰',
      metin: en
        ? `chance of a ${b} ${para > 0 ? 'gain' : 'loss'}`
        : `${b} ${para > 0 ? 'kazanç' : 'kayıp'} ihtimali`,
      pozitif: para > 0,
    });
  }

  for (const saglik of belirginDegerler(basariliSonuc.saglik, basarisizSonuc.saglik)) {
    const b = buyuklukEtiketi(SAGLIK_BUYUKLUK_ESIKLERI, Math.abs(saglik), dil);
    tahminler.push({
      simge: '❤️',
      metin: en
        ? `chance of a ${b} health ${saglik > 0 ? 'gain' : 'loss'}`
        : `${b} can ${saglik > 0 ? 'kazancı' : 'kaybı'} ihtimali`,
      pozitif: saglik > 0,
    });
  }

  for (const mutluluk of belirginDegerler(basariliSonuc.mutluluk, basarisizSonuc.mutluluk)) {
    const b = buyuklukEtiketi(MUTLULUK_BUYUKLUK_ESIKLERI, Math.abs(mutluluk), dil);
    tahminler.push({
      simge: '🙂',
      metin: en
        ? `chance of a ${b} morale ${mutluluk > 0 ? 'gain' : 'loss'}`
        : `${b} moral ${mutluluk > 0 ? 'kazancı' : 'kaybı'} ihtimali`,
      pozitif: mutluluk > 0,
    });
  }

  return tahminler;
}

/**
 * Konut kademelerinin (basit_barinak/ahsap_ev/normal_ev/tas_ev/konak/sato) çağa
 * göre dönemsel görünen adı ve simgesi. Sunucudaki kira/etki değerleri
 * değişmez, sadece oyuncuya gösterilen isim/simge döneme uygun hale gelir.
 */
const KONUT_TEMALARI: Record<string, Partial<Record<string, { ad: string; adEn: string; simge: string }>>> = {
  basit_barinak: {
    'Orta Çağ': { ad: 'Saz Kulübe', adEn: 'Thatched Hut', simge: '🛖' },
    'Sanayi Devrimi': { ad: 'İşçi Barakası', adEn: 'Worker Barracks', simge: '🏚️' },
  },
  ahsap_ev: {
    'Orta Çağ': { ad: 'Ahşap Ev', adEn: 'Wooden House', simge: '🪵' },
    'Sanayi Devrimi': { ad: 'Kiralık Daire', adEn: 'Rented Flat', simge: '🏘️' },
  },
  normal_ev: {
    'Orta Çağ': { ad: 'Taş Şehir Evi', adEn: 'Stone Townhouse', simge: '🏠' },
    'Sanayi Devrimi': { ad: 'Apartman Dairesi', adEn: 'Apartment', simge: '🏢' },
  },
  tas_ev: {
    'Orta Çağ': { ad: 'Zanaatkâr Evi', adEn: "Craftsman's House", simge: '🧱' },
    'Sanayi Devrimi': { ad: 'Burjuva Dairesi', adEn: 'Bourgeois Flat', simge: '🧱' },
  },
  konak: {
    'Orta Çağ': { ad: 'Malikane', adEn: 'Manor House', simge: '🏛️' },
    'Sanayi Devrimi': { ad: 'Villa', adEn: 'Villa', simge: '🏛️' },
  },
  sato: {
    'Orta Çağ': { ad: 'Şato', adEn: 'Castle', simge: '🏰' },
    'Sanayi Devrimi': { ad: 'Köşk', adEn: 'Mansion', simge: '🏰' },
  },
};

export function konutGoruntusuGetir(
  konutId: string,
  varsayilanAd: string,
  varsayilanSimge: string,
  cag: string,
  dil: Dil = 'tr'
): { ad: string; simge: string } {
  const tema = KONUT_TEMALARI[konutId]?.[cag];
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
