/**
 * Günlük giriş serisi — cihaz-yerel (`localStorage`), sunucuya gitmez.
 *
 * Her gün ilk açılışta `gunlukSeriKontrolEt()` çağrılır (giriş ekranı mount).
 * Ardışık günlerde seri +1 artar; 1 günlük bir "grace" payı var (bir gün
 * atlanırsa seri kırılmaz, ama iki gün üst üste atlanırsa sıfırlanır) —
 * agresif seri sistemleri terk sebebi olduğu için kasıtlı yumuşak.
 * Ödül `gold.ts`'e Gold olarak yazılır, **haftalık bir döngüde** artar
 * (bkz. `odulMiktariHesapla`) — sınırsız büyümesin diye 7 günde bir sıfırlanır.
 */
import { goldEkle } from './gold';

interface GunlukSeriDurumu {
  sonGirisTarihi: string | null;
  seriUzunlugu: number;
  enUzunSeri: number;
}

const ANAHTAR = 'kader_carki_gunluk_seri';

function bugununTarihi(): string {
  return new Date().toISOString().slice(0, 10);
}

function gunFarki(eski: string, yeni: string): number {
  const a = new Date(`${eski}T00:00:00Z`).getTime();
  const b = new Date(`${yeni}T00:00:00Z`).getTime();
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

function oku(): GunlukSeriDurumu {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    if (!ham) return { sonGirisTarihi: null, seriUzunlugu: 0, enUzunSeri: 0 };
    const p = JSON.parse(ham);
    return {
      sonGirisTarihi: typeof p.sonGirisTarihi === 'string' ? p.sonGirisTarihi : null,
      seriUzunlugu: Number.isFinite(p.seriUzunlugu) ? p.seriUzunlugu : 0,
      enUzunSeri: Number.isFinite(p.enUzunSeri) ? p.enUzunSeri : 0,
    };
  } catch {
    return { sonGirisTarihi: null, seriUzunlugu: 0, enUzunSeri: 0 };
  }
}

function yaz(d: GunlukSeriDurumu) {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(d));
  } catch {
    // yok say
  }
}

/** Haftanın 7 günü için ödül tablosu — 1. gün 10 Gold, her gün +5, 7. gün 40. */
const HAFTALIK_ODUL = [10, 15, 20, 25, 30, 35, 40];

/**
 * Seri uzunluğuna göre Gold ödülü — **haftalık döngü**: toplam seri sayısı
 * ne olursa olsun, `((seri - 1) % 7) + 1` ile "bu haftanın kaçıncı günü"
 * hesaplanır ve `HAFTALIK_ODUL`'den okunur. 7. günden sonra 1. güne (10 Gold)
 * döner — böylece hem her gün girmenin haftalık bir karşılığı olur hem de
 * ödül sınırsız büyümez (bir önceki tek-yönlü kademeli sistem yerine).
 */
function odulMiktariHesapla(seri: number): number {
  const haftaninGunu = ((seri - 1) % 7) + 1; // 1..7
  return HAFTALIK_ODUL[haftaninGunu - 1];
}

export interface GunlukSeriSonuc {
  seri: number;
  enUzunSeri: number;
  /** Bugün ilk kez çağrıldıysa true — ödül bu çağrıda verildi demektir. */
  yeniOdulMu: boolean;
  odulMiktari: number;
}

/** Günde bir kez etkili olur (localStorage'da bugünün tarihini görürse no-op döner). */
export function gunlukSeriKontrolEt(): GunlukSeriSonuc {
  const durum = oku();
  const bugun = bugununTarihi();

  if (durum.sonGirisTarihi === bugun) {
    return { seri: durum.seriUzunlugu, enUzunSeri: durum.enUzunSeri, yeniOdulMu: false, odulMiktari: 0 };
  }

  let yeniSeri: number;
  if (!durum.sonGirisTarihi) {
    yeniSeri = 1;
  } else {
    const fark = gunFarki(durum.sonGirisTarihi, bugun);
    // fark=1 → dün girmiş (ardışık); fark=2 → bir gün atlamış ama seri kırılmaz (grace); fark>=3 → sıfırlanır.
    yeniSeri = fark <= 2 ? durum.seriUzunlugu + 1 : 1;
  }

  const enUzun = Math.max(durum.enUzunSeri, yeniSeri);
  yaz({ sonGirisTarihi: bugun, seriUzunlugu: yeniSeri, enUzunSeri: enUzun });

  const odul = odulMiktariHesapla(yeniSeri);
  goldEkle(odul);

  return { seri: yeniSeri, enUzunSeri: enUzun, yeniOdulMu: true, odulMiktari: odul };
}

/** Salt okuma — kontrol/ödül tetiklemeden mevcut seriyi gösterir (ör. bir sonraki render'da). */
export function gunlukSeriGetir(): { seri: number; enUzunSeri: number } {
  const d = oku();
  return { seri: d.seriUzunlugu, enUzunSeri: d.enUzunSeri };
}
