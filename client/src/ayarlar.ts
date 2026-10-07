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

/**
 * Kayıtlı bir dil tercihi yoksa tarayıcının dilinden başla: tercih listesinde Türkçe
 * varsa Türkçe, yoksa İngilizce (oyunun yalnız bu iki dili var). Oyuncu Ayarlar'dan
 * seçince o kayıt her zaman önceliklidir.
 */
function tarayiciDili(): Dil {
  try {
    const diller = navigator.languages?.length ? navigator.languages : [navigator.language];
    return diller.some((d) => typeof d === 'string' && d.toLowerCase().startsWith('tr')) ? 'tr' : 'en';
  } catch {
    return 'tr';
  }
}

function varsayilan(): Ayarlar {
  return { dil: tarayiciDili(), muzik: true };
}

export function ayarlariGetir(): Ayarlar {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    if (!ham) return varsayilan();
    const cozulmus = JSON.parse(ham) as Partial<Ayarlar>;
    return {
      dil: cozulmus.dil === 'en' || cozulmus.dil === 'tr' ? cozulmus.dil : tarayiciDili(),
      muzik: cozulmus.muzik !== false,
    };
  } catch {
    return varsayilan();
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
