import type { DonemEtkisi, DonemTuru } from "../types";

/**
 * Dünya dönemleri (2026-10, Faz A): her an bolluk / durgunluk / kıtlık'tan biri
 * sürer. Aynı dönem asla arka arkaya gelmez — biten dönemin yerine kalan ikisinden
 * biri %50 gelir (savaş sürerken bolluk gelemez). Savaş ve veba dönemden bağımsız
 * işler ama ikisi aynı anda olmaz.
 *
 * Etkiler her dönem / savaş / veba başlarken kendi aralığından BİR KEZ, tam yüzde
 * olarak zarla belirlenir ve o dönem boyunca sabit kalır (bir bollukta lüks talep
 * +%37, bir sonrakinde +%31 gibi). Bu dosya saf veri + saf fonksiyon; durum
 * makinesi stateManager.ts'te (donemIlerlet).
 */

/** [min, max] tam yüzde (−9 = −%9). */
type Aralik = [number, number];

interface EtkiAraliklari {
  temelTalep: Aralik;
  temelFiyat: Aralik;
  luksTalep: Aralik;
  luksFiyat: Aralik;
  yasamGideri: Aralik;
  maas: Aralik;
  /** Toplam pazar büyüklüğünün yıllık değişimi, ONDALIKLI yüzde ×10 (35 = +%3,5; −50 = −%5,0). */
  pazarBuyume: Aralik;
}

/** Süre (yıl, iki uç dahil). */
export const DONEM_SURE: Record<DonemTuru, Aralik> = {
  bolluk: [5, 6],
  durgunluk: [5, 6],
  kitlik: [3, 3],
};

const DONEM_ETKI_ARALIKLARI: Record<DonemTuru, EtkiAraliklari> = {
  bolluk: { temelTalep: [3, 7], temelFiyat: [-9, -5], luksTalep: [30, 45], luksFiyat: [10, 16], yasamGideri: [-10, -6], maas: [6, 10], pazarBuyume: [30, 45] },
  durgunluk: { temelTalep: [-13, -8], temelFiyat: [-2, 2], luksTalep: [-35, -25], luksFiyat: [-11, -6], yasamGideri: [2, 5], maas: [-10, -6], pazarBuyume: [10, 20] },
  // Kıtlıkta temel mal (tahıl, kap-kacak) talebi patlar: işletme için "depoyu doldur" fırsatı (§45).
  kitlik: { temelTalep: [40, 60], temelFiyat: [45, 60], luksTalep: [-50, -40], luksFiyat: [-12, -8], yasamGideri: [25, 35], maas: [-12, -8], pazarBuyume: [0, 10] },
};


// ── Savaş ──────────────────────────────────────────────────────────────────
/** Durgunluk/kıtlıkta (bollukta asla) savaşın yıllık başlama ihtimali. */
export const SAVAS_YILLIK_IHTIMAL = 0.18;
/** Son savaşın bitişinden sonra yeni savaş için beklenecek yıl. */
export const SAVAS_COOLDOWN_YIL = 6;
export const SAVAS_SURE: Aralik = [4, 5];
/** Savaş vergisi (maaşın yüzdesi) ve yaşam gideri artışı. */
export const SAVAS_VERGI: Aralik = [7, 10];
const SAVAS_ETKI_ARALIKLARI: EtkiAraliklari = {
  temelTalep: [0, 0],
  temelFiyat: [18, 25],
  luksTalep: [-40, -30],
  luksFiyat: [0, 0],
  yasamGideri: [12, 18],
  maas: [-10, -6],
  pazarBuyume: [-60, -40],
};

// ── Veba ───────────────────────────────────────────────────────────────────
export const VEBA_YILLIK_IHTIMAL = 0.04;
/** Veba bu yaştan itibaren çıkabilir. */
export const VEBA_MIN_YAS = 20;
/** Bu yaşa kadar hiç veba görmediyse zorla tetiklenir (her oyunda veba kesin çıkar). */
export const VEBA_ZORUNLU_YAS = 45;
/** Son vebanın bitişinden sonra yeni dalga için beklenecek yıl. */
export const VEBA_COOLDOWN_YIL = 30;
export const VEBA_SURE: Aralik = [5, 6];
const VEBA_ETKI_ARALIKLARI: EtkiAraliklari = {
  temelTalep: [-25, -18],
  temelFiyat: [12, 18],
  luksTalep: [-55, -45],
  luksFiyat: [0, 0],
  yasamGideri: [0, 0],
  // İşçi kıtlığı: maaşla çalışanın ücreti artar.
  maas: [8, 12],
  // Veba: müşteri ölür.
  pazarBuyume: [-100, -60],
};

/** Dedikodunun yaklaşan dönem/savaş/veba hakkında doğru söyleme ihtimali. */
export const DEDIKODU_ISABET = 0.7;
/** Hiçbir şey yaklaşmazken "savaş geliyor" yanlış alarmı ihtimali (dedikodu üretimi başına). */
export const DEDIKODU_YANLIS_ALARM = 0.08;

export const DONEM_ADLARI: Record<DonemTuru, { ad: string; simge: string }> = {
  bolluk: { ad: "Bolluk", simge: "🌾" },
  durgunluk: { ad: "Durgunluk", simge: "📉" },
  kitlik: { ad: "Kıtlık", simge: "🥀" },
};

export const DONEM_TURLERI: DonemTuru[] = ["bolluk", "durgunluk", "kitlik"];

function tamSayi([min, max]: Aralik, rnd: () => number): number {
  return min + Math.floor(rnd() * (max - min + 1));
}

/** Aralıktaki tam yüzdeyi çarpana çevirir (−9 → 0.91). */
function carpan(aralik: Aralik, rnd: () => number): number {
  return 1 + tamSayi(aralik, rnd) / 100;
}

function etkiZarla(a: EtkiAraliklari, rnd: () => number): DonemEtkisi {
  return {
    temelTalep: carpan(a.temelTalep, rnd),
    temelFiyat: carpan(a.temelFiyat, rnd),
    luksTalep: carpan(a.luksTalep, rnd),
    luksFiyat: carpan(a.luksFiyat, rnd),
    yasamGideri: carpan(a.yasamGideri, rnd),
    maas: carpan(a.maas, rnd),
    pazarBuyume: tamSayi(a.pazarBuyume, rnd) / 1000,
  };
}

/** Eski kayıtlarda `etki.pazarBuyume` yoksa türün orta değeri (kesir, yıllık). */
export function pazarBuyumeVarsayilan(tur: DonemTuru | "savas" | "veba"): number {
  const ort: Record<string, number> = { bolluk: 0.0375, durgunluk: 0.015, kitlik: 0.005, savas: -0.05, veba: -0.08 };
  return ort[tur] ?? 0.02;
}

export function donemEtkisiZarla(tur: DonemTuru, rnd: () => number = Math.random): DonemEtkisi {
  return etkiZarla(DONEM_ETKI_ARALIKLARI[tur], rnd);
}

export function savasEtkisiZarla(rnd: () => number = Math.random): DonemEtkisi {
  return etkiZarla(SAVAS_ETKI_ARALIKLARI, rnd);
}

export function vebaEtkisiZarla(rnd: () => number = Math.random): DonemEtkisi {
  return etkiZarla(VEBA_ETKI_ARALIKLARI, rnd);
}

export function sureZarla(aralik: Aralik, rnd: () => number = Math.random): number {
  return tamSayi(aralik, rnd);
}

/** Savaş vergisi oranı (0.07-0.10). */
export function savasVergisiZarla(rnd: () => number = Math.random): number {
  return tamSayi(SAVAS_VERGI, rnd) / 100;
}

/** `tur`'dan sonra gelecek dönem: kalan ikisinden biri %50. */
export function sonrakiDonemZarla(tur: DonemTuru, rnd: () => number = Math.random): DonemTuru {
  const digerleri = DONEM_TURLERI.filter((t) => t !== tur);
  return digerleri[rnd() < 0.5 ? 0 : 1];
}

/** Savaş sürerken bolluk gelemez: `aday` bolluksa ve savaş varsa, öncekinden ve bolluktan farklı olan döner. */
export function savasaGoreDuzelt(aday: DonemTuru, onceki: DonemTuru, savasta: boolean): DonemTuru {
  if (!savasta || aday !== "bolluk") return aday;
  return DONEM_TURLERI.find((t) => t !== "bolluk" && t !== onceki) ?? "durgunluk";
}

/** Eski olaylar/mülk/mağaza `ulke.ekonomi` okur; dönemden türetilir ("normal" artık oluşmaz). */
export function ekonomiFromDonem(tur: DonemTuru): "iyi" | "kotu" {
  return tur === "bolluk" ? "iyi" : "kotu";
}

/** Çarpanı işaretli tam yüzde metnine çevirir (1.37 → "+%37", 0.91 → "−%9"); dile göre biçim istemcide. */
export function yuzdeFarki(carpanDegeri: number): number {
  return Math.round((carpanDegeri - 1) * 100);
}
