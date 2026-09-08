/**
 * Oyun ayarları (arayüz dili + arka plan müziği) — tarayıcıda kalıcı, sunucuya gönderilmez.
 * Ses (kısa efekt) tercihi geriye dönük uyumluluk için ayrıca `ses.ts` içinde tutulur;
 * ayarlar ekranı onu mevcut `sesTercihiKaydet`/`sesKapaliMi` üzerinden yönetir.
 */
export type Dil = 'tr' | 'en';

export interface Ayarlar {
  dil: Dil;
  /** Arka plan müziği açık mı (varsayılan: açık). */
  muzik: boolean;
}

const ANAHTAR = 'kader-carki-ayarlar';
const VARSAYILAN: Ayarlar = { dil: 'tr', muzik: true };

export function ayarlariGetir(): Ayarlar {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    if (!ham) return { ...VARSAYILAN };
    const cozulmus = JSON.parse(ham) as Partial<Ayarlar>;
    return {
      dil: cozulmus.dil === 'en' ? 'en' : 'tr',
      muzik: cozulmus.muzik !== false,
    };
  } catch {
    return { ...VARSAYILAN };
  }
}

export function ayarlariKaydet(yama: Partial<Ayarlar>): Ayarlar {
  const yeni: Ayarlar = { ...ayarlariGetir(), ...yama };
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(yeni));
  } catch {
    // localStorage kapalı/dolu olabilir (gizli sekme vb.) — ayar sessizce kalıcı olmaz.
  }
  return yeni;
}
