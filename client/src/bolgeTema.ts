import type { SonucEtkisi } from './types';

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

const AHLAK_ETIKETLERI: [number, string][] = [
  [15, 'Zalim'],
  [30, 'Onursuz'],
  [50, 'Sıradan'],
  [70, 'Onurlu'],
  [85, 'Yüksek Onurlu'],
  [100, 'Gurur Abidesi'],
];

export function ahlakEtiketi(ahlak: number): string {
  for (const [esik, etiket] of AHLAK_ETIKETLERI) {
    if (ahlak <= esik) return etiket;
  }
  return AHLAK_ETIKETLERI[AHLAK_ETIKETLERI.length - 1][1];
}

export function unYildiz(un: number): number {
  return Math.max(0, un / 20);
}

/** Mesleklerin hangi yatkınlık kategorisine karşılık geldiği. */
export const MESLEK_KATEGORI: Record<string, string> = {
  Asker: 'savas',
  Tüccar: 'ticaret',
  'Din Adamı': 'din',
};

export const KATEGORI_ADI: Record<string, string> = {
  savas: 'Askerlik',
  ticaret: 'Ticaret',
  din: 'Din',
  siyaset: 'Siyaset',
  saglik: 'Sağlık',
  sosyal: 'Sosyal',
};

const YATKINLIK_ETIKETLERI: [number, string, string][] = [
  [-18, 'Hiç Yatkın Değil', '❌'],
  [-8, 'Az Yatkın', '👎'],
  [7, 'Nötr', '➖'],
  [17, 'Yatkın', '👍'],
  [Infinity, 'Çok Yatkın', '🔥'],
];

export function yatkinlikEtiketi(deger: number): { etiket: string; simge: string } {
  for (const [esik, etiket, simge] of YATKINLIK_ETIKETLERI) {
    if (deger <= esik) return { etiket, simge };
  }
  return { etiket: 'Çok Yatkın', simge: '🔥' };
}

export interface EtkiTahmini {
  simge: string;
  metin: string;
  pozitif: boolean;
}

const PARA_BUYUKLUK_ESIKLERI: [number, string][] = [
  [10, 'küçük'],
  [30, 'orta'],
  [Infinity, 'büyük'],
];

const SAGLIK_BUYUKLUK_ESIKLERI: [number, string][] = [
  [6, 'küçük'],
  [15, 'orta'],
  [Infinity, 'büyük'],
];

const MUTLULUK_BUYUKLUK_ESIKLERI: [number, string][] = [
  [6, 'küçük'],
  [15, 'orta'],
  [Infinity, 'büyük'],
];

function buyuklukEtiketi(esikler: [number, string][], mutlakDeger: number): string {
  for (const [esik, etiket] of esikler) {
    if (mutlakDeger <= esik) return etiket;
  }
  return esikler[esikler.length - 1][1];
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
export function etkiTahminiGetir(basariliSonuc: SonucEtkisi, basarisizSonuc: SonucEtkisi): EtkiTahmini[] {
  const tahminler: EtkiTahmini[] = [];

  for (const para of belirginDegerler(basariliSonuc.para, basarisizSonuc.para)) {
    tahminler.push({
      simge: '💰',
      metin: `${buyuklukEtiketi(PARA_BUYUKLUK_ESIKLERI, Math.abs(para))} ${para > 0 ? 'kazanç' : 'kayıp'} ihtimali`,
      pozitif: para > 0,
    });
  }

  for (const saglik of belirginDegerler(basariliSonuc.saglik, basarisizSonuc.saglik)) {
    tahminler.push({
      simge: '❤️',
      metin: `${buyuklukEtiketi(SAGLIK_BUYUKLUK_ESIKLERI, Math.abs(saglik))} can ${saglik > 0 ? 'kazancı' : 'kaybı'} ihtimali`,
      pozitif: saglik > 0,
    });
  }

  for (const mutluluk of belirginDegerler(basariliSonuc.mutluluk, basarisizSonuc.mutluluk)) {
    tahminler.push({
      simge: '🙂',
      metin: `${buyuklukEtiketi(MUTLULUK_BUYUKLUK_ESIKLERI, Math.abs(mutluluk))} moral ${mutluluk > 0 ? 'kazancı' : 'kaybı'} ihtimali`,
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
const KONUT_TEMALARI: Record<string, Partial<Record<string, { ad: string; simge: string }>>> = {
  basit_barinak: {
    'Orta Çağ': { ad: 'Saz Kulübe', simge: '🛖' },
    'Sanayi Devrimi': { ad: 'İşçi Barakası', simge: '🏚️' },
  },
  ahsap_ev: {
    'Orta Çağ': { ad: 'Ahşap Ev', simge: '🪵' },
    'Sanayi Devrimi': { ad: 'Kiralık Daire', simge: '🏘️' },
  },
  normal_ev: {
    'Orta Çağ': { ad: 'Taş Şehir Evi', simge: '🏠' },
    'Sanayi Devrimi': { ad: 'Apartman Dairesi', simge: '🏢' },
  },
  tas_ev: {
    'Orta Çağ': { ad: 'Zanaatkâr Evi', simge: '🧱' },
    'Sanayi Devrimi': { ad: 'Burjuva Dairesi', simge: '🧱' },
  },
  konak: {
    'Orta Çağ': { ad: 'Malikane', simge: '🏛️' },
    'Sanayi Devrimi': { ad: 'Villa', simge: '🏛️' },
  },
  sato: {
    'Orta Çağ': { ad: 'Şato', simge: '🏰' },
    'Sanayi Devrimi': { ad: 'Köşk', simge: '🏰' },
  },
};

export function konutGoruntusuGetir(
  konutId: string,
  varsayilanAd: string,
  varsayilanSimge: string,
  cag: string
): { ad: string; simge: string } {
  const tema = KONUT_TEMALARI[konutId]?.[cag];
  return tema ?? { ad: varsayilanAd, simge: varsayilanSimge };
}
