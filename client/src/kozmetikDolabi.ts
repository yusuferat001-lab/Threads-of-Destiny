/**
 * Kalıcı kozmetik dolabı — cihaz-yerel (`localStorage`), sunucuya gitmez.
 * `basarimlar.ts` deseniyle aynı: karakter ölse de dolap kalır.
 */
import { goldHarca } from './gold';
import { KOZMETIK_KATALOG, kozmetikTanimGetir, type KozmetikKategori } from './kozmetikKatalog';

const SAHIP_ANAHTAR = 'kader_carki_kozmetik_sahip';
const GIYILEN_ANAHTAR = 'kader_carki_kozmetik_giyilen';

export interface GiyilenKozmetikler {
  bas?: string;
  sirt?: string;
  cerceve?: string;
}

function sahipOkuSet(): Set<string> {
  try {
    const ham = localStorage.getItem(SAHIP_ANAHTAR);
    const veri = ham ? JSON.parse(ham) : [];
    return new Set(Array.isArray(veri) ? veri.filter((x): x is string => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

function sahipYaz(s: Set<string>) {
  try {
    localStorage.setItem(SAHIP_ANAHTAR, JSON.stringify(Array.from(s)));
  } catch {
    // yok say
  }
}

function giyilenOku(): GiyilenKozmetikler {
  try {
    const ham = localStorage.getItem(GIYILEN_ANAHTAR);
    const veri = ham ? JSON.parse(ham) : {};
    return veri && typeof veri === 'object' && !Array.isArray(veri) ? veri : {};
  } catch {
    return {};
  }
}

function giyilenYaz(g: GiyilenKozmetikler) {
  try {
    localStorage.setItem(GIYILEN_ANAHTAR, JSON.stringify(g));
  } catch {
    // yok say
  }
}

export function kozmetikSahipMi(id: string): boolean {
  return sahipOkuSet().has(id);
}

export function kozmetikSahipListesiGetir(): string[] {
  return Array.from(sahipOkuSet());
}

export function kozmetikGiyilenlerGetir(): GiyilenKozmetikler {
  return giyilenOku();
}

/** Yeterli Gold varsa satın alır + sahiplenir, yetersizse false döner. */
export function kozmetikSatinAl(id: string): boolean {
  const tanim = kozmetikTanimGetir(id);
  if (!tanim) return false;
  const sahip = sahipOkuSet();
  if (sahip.has(id)) return false; // zaten sahip — tekrar satın alınmaz
  if (!goldHarca(tanim.fiyat)) return false;
  sahip.add(id);
  sahipYaz(sahip);
  return true;
}

/** Sahip olunan bir eşyayı giyer (aynı kategoriden öncekinin yerine geçer). */
export function kozmetikGiy(id: string): boolean {
  const tanim = kozmetikTanimGetir(id);
  if (!tanim || !kozmetikSahipMi(id)) return false;
  const giyilen = giyilenOku();
  giyilen[tanim.kategori] = id;
  giyilenYaz(giyilen);
  return true;
}

/** Bir kategoriyi çıkarır (o kategori boş görünür). */
export function kozmetikCikar(kategori: KozmetikKategori): void {
  const giyilen = giyilenOku();
  delete giyilen[kategori];
  giyilenYaz(giyilen);
}

export { KOZMETIK_KATALOG };
