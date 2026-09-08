/**
 * Arka plan müziği denetleyicisi — tek bir `HTMLAudioElement` sarmalar.
 *
 * Kısa geri bildirim sesleri (`ses.ts`) sentezlenmiş ve olay-anlıktır; bu modül ise
 * `client/public/assets/muzik/` altındaki gerçek ses dosyalarını döngüde çalar.
 * Ekrana/çağa göre bir "mod" seçilir; mod değişince eskisi kısılıp yenisi yükselir
 * (yumuşak geçiş). Bir dosya yoksa/çalınamıyorsa (404, desteklenmeyen format) o parça
 * atlanır; modun HİÇBİR parçası çalınamazsa sessizce susar — sahne görsel fallback'iyle
 * aynı felsefe: kod, ses dosyaları olmadan da sorunsuz çalışır.
 *
 * Format: her parça için önce `.mp3`, olmazsa `.ogg` denenir (tarayıcı `canPlayType`'a
 * göre). Yani dosyaları `.mp3` ya da `.ogg` olarak bırakabilirsin; ikisi de olur.
 *
 * Otomatik oynatma: tarayıcılar kullanıcı etkileşimi olmadan sesi başlatmaz.
 * İlk `play()` reddedilirse tek seferlik bir `pointerdown`/`keydown` dinleyicisi
 * kurulur ve ilk tıklama/tuşta oynatma yeniden denenir.
 */

export type MuzikModu = 'menu' | 'ortacag' | 'sanayi' | 'olum';

/** Her mod için sırayla çalınacak dosya adları — UZANTISIZ (assets/muzik/ altında). */
const PARCALAR: Record<MuzikModu, string[]> = {
  menu: ['menu-1', 'menu-2', 'menu-3'],
  ortacag: ['ortacag-1', 'ortacag-2', 'ortacag-3'],
  sanayi: ['sanayi-1', 'sanayi-2', 'sanayi-3', 'sanayi-4', 'sanayi-5', 'sanayi-6'],
  olum: ['olum-1'],
};

const TABAN_YOL = '/assets/muzik/';
const UZANTILAR = ['mp3', 'ogg'] as const;
const HEDEF_SES = 0.32;
const FADE_MS = 900;
const FADE_ADIM_MS = 60;

let audio: HTMLAudioElement | null = null;
let aktifMod: MuzikModu | null = null;
let calmaListesi: string[] = [];
let parcaIndeksi = 0;
let uzantiIndeksi = 0;
let ardArdaHata = 0;
let sessiz = false;
let fadeZamanlayici: ReturnType<typeof setInterval> | null = null;
let etkilesimBekliyor = false;

function desteklenenUzantilar(el: HTMLAudioElement): string[] {
  const mime: Record<string, string> = { mp3: 'audio/mpeg', ogg: 'audio/ogg' };
  const list = UZANTILAR.filter((u) => {
    try {
      return el.canPlayType(mime[u]) !== '';
    } catch {
      return true;
    }
  });
  return list.length > 0 ? list : [...UZANTILAR];
}

function elemanGetir(): HTMLAudioElement | null {
  if (typeof window === 'undefined' || typeof Audio === 'undefined') return null;
  if (!audio) {
    audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0;
    audio.addEventListener('ended', sonrakiParca);
    audio.addEventListener('playing', () => {
      ardArdaHata = 0;
    });
    audio.addEventListener('error', parcaHatasi);
  }
  return audio;
}

function fadeIptal(): void {
  if (fadeZamanlayici) {
    clearInterval(fadeZamanlayici);
    fadeZamanlayici = null;
  }
}

function fadeYap(hedef: number, bitince?: () => void): void {
  const el = elemanGetir();
  if (!el) return;
  fadeIptal();
  const baslangic = el.volume;
  const fark = hedef - baslangic;
  const toplamAdim = Math.max(1, Math.round(FADE_MS / FADE_ADIM_MS));
  let adim = 0;
  fadeZamanlayici = setInterval(() => {
    adim += 1;
    const oran = Math.min(1, adim / toplamAdim);
    el.volume = Math.max(0, Math.min(1, baslangic + fark * oran));
    if (oran >= 1) {
      fadeIptal();
      bitince?.();
    }
  }, FADE_ADIM_MS);
}

function oynatmayiDene(): void {
  const el = elemanGetir();
  if (!el) return;
  const sozu = el.play();
  if (sozu && typeof sozu.catch === 'function') {
    sozu.catch(() => {
      // Otomatik oynatma engellendi — ilk kullanıcı etkileşiminde tekrar dene.
      if (etkilesimBekliyor) return;
      etkilesimBekliyor = true;
      const tetik = () => {
        etkilesimBekliyor = false;
        window.removeEventListener('pointerdown', tetik);
        window.removeEventListener('keydown', tetik);
        if (!sessiz && aktifMod) oynatmayiDene();
      };
      window.addEventListener('pointerdown', tetik, { once: true });
      window.addEventListener('keydown', tetik, { once: true });
    });
  }
}

function kaynakUygula(): void {
  const el = elemanGetir();
  if (!el || calmaListesi.length === 0) return;
  const uzantilar = desteklenenUzantilar(el);
  const ext = uzantilar[uzantiIndeksi] ?? uzantilar[0];
  el.src = `${TABAN_YOL}${calmaListesi[parcaIndeksi]}.${ext}`;
  el.loop = calmaListesi.length === 1;
  el.load();
  if (!sessiz) oynatmayiDene();
}

function parcaYukle(index: number): void {
  if (calmaListesi.length === 0) return;
  parcaIndeksi = ((index % calmaListesi.length) + calmaListesi.length) % calmaListesi.length;
  uzantiIndeksi = 0;
  kaynakUygula();
}

function parcaHatasi(): void {
  const el = elemanGetir();
  if (!el || !aktifMod || calmaListesi.length === 0) return;
  const uzantilar = desteklenenUzantilar(el);
  if (uzantiIndeksi < uzantilar.length - 1) {
    // Aynı parçanın öbür uzantısını dene (.mp3 → .ogg).
    uzantiIndeksi += 1;
    kaynakUygula();
    return;
  }
  // Bu parça hiç çalınamadı — sonrakine geç.
  ardArdaHata += 1;
  if (ardArdaHata >= calmaListesi.length) {
    // Modun hiçbir parçası yok — sessizce sus.
    durdurInternal();
    return;
  }
  parcaYukle(parcaIndeksi + 1);
}

function sonrakiParca(): void {
  if (calmaListesi.length <= 1) return;
  parcaYukle(parcaIndeksi + 1);
}

function durdurInternal(): void {
  fadeIptal();
  if (audio) {
    audio.pause();
    audio.volume = 0;
  }
  aktifMod = null;
  calmaListesi = [];
}

/** Basit karıştırma — her mod girişinde sıralar değişsin diye. */
function karistir<T>(dizi: T[]): T[] {
  const k = dizi.slice();
  for (let i = k.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [k[i], k[j]] = [k[j], k[i]];
  }
  return k;
}

/**
 * İstenen modu çalmaya başlar. Zaten o mod çalıyorsa hiçbir şey yapmaz.
 * Başka bir mod çalıyorsa: eskisi kısılır, yeni mod yüklenip yükseltilir.
 */
export function muzikModunuAyarla(mod: MuzikModu): void {
  if (mod === aktifMod) return;
  const el = elemanGetir();
  if (!el) return;

  const gecisYap = () => {
    aktifMod = mod;
    ardArdaHata = 0;
    calmaListesi = karistir(PARCALAR[mod]);
    parcaYukle(0);
    if (!sessiz) fadeYap(HEDEF_SES);
  };

  if (aktifMod && el.volume > 0) {
    fadeYap(0, gecisYap);
  } else {
    gecisYap();
  }
}

/** Müziği tamamen durdurur (ör. ayarlardan kapatınca). */
export function muzikDurdur(): void {
  fadeYap(0, durdurInternal);
}

/** Ayarlardaki "Müzik: Kapalı" tercihini uygular. */
export function muzikSessizAyarla(yeniSessiz: boolean): void {
  sessiz = yeniSessiz;
  const el = elemanGetir();
  if (!el) return;
  if (sessiz) {
    fadeYap(0, () => {
      el.pause();
    });
  } else if (aktifMod) {
    oynatmayiDene();
    fadeYap(HEDEF_SES);
  }
}
