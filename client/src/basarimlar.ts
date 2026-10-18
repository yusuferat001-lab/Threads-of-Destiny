const UNVAN_KEY = 'kader_carki_basarim_unvanlar';
const OLUM_KEY = 'kader_carki_basarim_olumler';

function oku(key: string): string[] {
  try {
    const ham = localStorage.getItem(key);
    const veri = ham ? JSON.parse(ham) : [];
    return Array.isArray(veri) ? veri.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function yaz(key: string, liste: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(liste));
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say
  }
}

/** Bir karakter öldüğünde kazandığı ünvanları/efsanevi ölümü tarayıcıdaki kalıcı koleksiyona ekler. */
export function basarimlariKaydet(unvanlar: string[], efsaneviOlum: string | null): void {
  if (unvanlar.length > 0) {
    const mevcut = new Set(oku(UNVAN_KEY));
    unvanlar.forEach((u) => mevcut.add(u));
    yaz(UNVAN_KEY, Array.from(mevcut));
  }
  if (efsaneviOlum) {
    const mevcut = new Set(oku(OLUM_KEY));
    mevcut.add(efsaneviOlum);
    yaz(OLUM_KEY, Array.from(mevcut));
  }
}

export function basarimlariGetir(): { unvanlar: string[]; olumler: string[] } {
  return { unvanlar: oku(UNVAN_KEY), olumler: oku(OLUM_KEY) };
}
