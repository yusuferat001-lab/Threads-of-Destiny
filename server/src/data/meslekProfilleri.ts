import type { Cag, IsletmeAdayTipi, IsletmeFiyat, IsletmeRolTuru } from "../types";
import { ADAY_SABLONLARI, type AdayTaslagi } from "./adayHavuzlari";

export type { AdayTaslagi } from "./adayHavuzlari";

/**
 * Meslek işletmesi profilleri (2026-10, dikey dilim — Tüccar + Zanaatkâr).
 * Kural kodu tek (game/isletme.ts); meslek × çağ yalnız burada isim, kalem
 * listesi ve birkaç sayıyla değişir. Metinler {tr,en} çiftleri olarak gömülüdür
 * (KARANLIK_ISLER deseni): oyuncunun diline göre `ikiDil` ile seçilir.
 */

export interface DilliMetin {
  tr: string;
  en: string;
}

export type UrunKesimi = "temel" | "orta" | "luks";

export interface HatTanimi {
  id: string;
  simge: string;
  ad: DilliMetin;
  kesim: UrunKesimi;
  /** Müşteri başına yıllık talep birimi (pazar.ts ALIM_ORANI ile ölçeklenir). */
  talepTabani: number;
  /** Birim alış/üretim maliyeti ve satış fiyatı (enflasyonsuz taban). */
  birimMaliyet: number;
  birimFiyat: number;
  /** Bu hattı açmak için gereken en düşük rütbe. */
  minRutbe: number;
  /** Savaş sürerken talep çarpanı (silah/makine gibi). */
  savasTalep?: number;
}

/** Yatırımın motor etkisi: id'ye değil bu türe bakılır. */
export type YatirimEtkisi = "depo" | "talep" | "alis" | "uretim" | "pazar" | "koruma";

export interface YatirimTanimi {
  id: string;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  etki: YatirimEtkisi;
  /** Kademe başına enflasyonsuz fiyat (index 0 = 1. kademe). */
  fiyatlar: number[];
}

export interface RolTanimi {
  tur: IsletmeRolTuru;
  ad: DilliMetin;
}

export interface IsletmeProfili {
  /** "ticaret": mal satın alınır (depo dolana dek); "uretim": yıllık üretim tavanı vardır, maliyet hammaddedir. */
  mod?: "ticaret" | "uretim";
  hatlar: HatTanimi[];
  yatirimlar: YatirimTanimi[];
  roller: RolTanimi[];
  adaylar: AdayTaslagi[];
}

// ── Aday tipleri (Yetenek 20–90, Sadakat 10–80) ────────────────────────────
export const ADAY_TIP_ARALIKLARI: Record<IsletmeAdayTipi, { y: [number, number]; s: [number, number] }> = {
  serseri: { y: [20, 40], s: [10, 35] },
  sadik_cirak: { y: [20, 45], s: [60, 80] },
  siradan: { y: [40, 65], s: [40, 65] },
  usta_guvenilmez: { y: [65, 90], s: [10, 40] },
  usta_sadik: { y: [70, 90], s: [60, 80] },
};

export const ADAY_TIP_ADLARI: Record<IsletmeAdayTipi, DilliMetin> = {
  serseri: { tr: "Serseri", en: "Drifter" },
  sadik_cirak: { tr: "Sadık çırak", en: "Loyal apprentice" },
  siradan: { tr: "Sıradan", en: "Ordinary" },
  usta_guvenilmez: { tr: "Usta ama güvenilmez", en: "Skilled but untrustworthy" },
  usta_sadik: { tr: "Usta ve sadık", en: "Skilled and loyal" },
};

// ── Hat/fiyat artı-eksi metinleri (oyuncuya kısa gösterilir) ───────────────
export const KESIM_ARTI_EKSI: Record<UrunKesimi, { arti: DilliMetin; eksi: DilliMetin }> = {
  temel: {
    arti: { tr: "Krizde de satar, talebi sağlam", en: "Sells even in a crisis, steady demand" },
    eksi: { tr: "Birim kârı düşük", en: "Low profit per unit" },
  },
  orta: {
    arti: { tr: "Dengeli kâr ve talep", en: "Balanced profit and demand" },
    eksi: { tr: "Savaşta ve krizde dalgalı", en: "Swings in war and crisis" },
  },
  luks: {
    arti: { tr: "Bollukta çok yüksek kâr", en: "Very high profit in boom years" },
    eksi: { tr: "Kıtlık, durgunluk ve savaşta satmaz", en: "Won't sell in famine, slump or war" },
  },
};
export const SAVAS_TALEP_ARTISI: DilliMetin = { tr: "Savaşta talebi artar", en: "Demand rises in war" };

export const FIYAT_ARTI_EKSI: Record<IsletmeFiyat, DilliMetin> = {
  eksi20: {
    tr: "Fiyat −%20, talep +%45. Çok satar, müşteri kazanırsın (yılda +%3 pay); birim kâr az, stok çabuk biter.",
    en: "Price −20%, demand +45%. You sell a lot and win customers (+3% share a year); thin margin, stock runs out fast.",
  },
  eksi10: {
    tr: "Fiyat −%10, talep +%20. Daha çok satar, müşteri çekersin (yılda +%1,5 pay); birim kâr biraz düşer.",
    en: "Price −10%, demand +20%. You sell more and attract customers (+1.5% share a year); slightly lower margin.",
  },
  normal: { tr: "Piyasa fiyatı. Dengeli.", en: "Market price. Balanced." },
  arti10: {
    tr: "Fiyat +%10, talep −%12. Birim kâr artar; müşteri yavaşça kaçar (yılda −%1 pay). Krizde talep daha çok düşer.",
    en: "Price +10%, demand −12%. Better margin; customers slowly drift away (−1% share a year). Demand drops more in a crisis.",
  },
  arti20: {
    tr: "Fiyat +%20, talep −%30. Birim kâr yüksek ama müşteri kaçar (yılda −%3 pay). Kıtlık ve savaşta riskli.",
    en: "Price +20%, demand −30%. High margin but customers leave (−3% share a year). Risky in famine and war.",
  },
};

// ── Yatırımlar (profil başına 5 × 3 kademe; fiyat enflasyonsuz taban) ──────
const YATIRIM_DEPO: YatirimTanimi = {
  id: "depo",
  simge: "🏚️",
  ad: { tr: "Depo", en: "Warehouse" },
  aciklama: {
    tr: "Stok kapasitesi: 100 → 220 → 420 → 750. Büyük depo mal çürümesini azaltır (%10 → %2) ama bakımı pahalıdır.",
    en: "Stock capacity: 100 → 220 → 420 → 750. A bigger warehouse reduces spoilage (10% → 2%) but costs more to maintain.",
  },
  etki: "depo",
  fiyatlar: [35, 90, 180],
};
const YATIRIM_TANITIM: YatirimTanimi = {
  id: "tanitim",
  simge: "📣",
  ad: { tr: "Tanıtım", en: "Advertising" },
  aciklama: {
    tr: "Her kademe pazar payı büyümesini artırır: yılda +%1 / +%2 / +%3 (toplam).",
    en: "Each tier boosts market share growth: +1% / +2% / +3% a year (total).",
  },
  etki: "pazar",
  fiyatlar: [20, 45, 90],
};
const YATIRIM_GUVENLIK_TUCCAR: YatirimTanimi = {
  id: "guvenlik",
  simge: "🔒",
  ad: { tr: "Depo Güvenliği", en: "Warehouse Security" },
  aciklama: {
    tr: "Kilit-sürgü → demir kapı + bekçi köpeği → nöbet kulesi. Koruma +0,17 / +0,34 / +0,50 (toplam).",
    en: "Bolt and lock → iron door + guard dog → watchtower. Protection +0.17 / +0.34 / +0.50 (total).",
  },
  etki: "koruma",
  fiyatlar: [20, 50, 110],
};
const YATIRIM_GUVENLIK_ZANAAT: YatirimTanimi = {
  ...YATIRIM_GUVENLIK_TUCCAR,
  ad: { tr: "Atölye Güvenliği", en: "Workshop Security" },
};

const TUCCAR_YATIRIMLAR: YatirimTanimi[] = [
  YATIRIM_DEPO,
  {
    id: "dukkan",
    simge: "🏪",
    ad: { tr: "Dükkân", en: "Shop" },
    aciklama: {
      tr: "Her kademe müşteri talebini %10 artırır.",
      en: "Each tier raises customer demand by 10%.",
    },
    etki: "talep",
    fiyatlar: [15, 30, 55],
  },
  {
    id: "kervan",
    simge: "🐪",
    ad: { tr: "Kervan", en: "Caravan" },
    aciklama: {
      tr: "Her kademe alış maliyetini %8 düşürür.",
      en: "Each tier cuts purchase costs by 8%.",
    },
    etki: "alis",
    fiyatlar: [15, 30, 55],
  },
  YATIRIM_TANITIM,
  YATIRIM_GUVENLIK_TUCCAR,
];

const ZANAATKAR_YATIRIMLAR: YatirimTanimi[] = [
  {
    id: "tezgah",
    simge: "🔨",
    ad: { tr: "Tezgâh ve Aletler", en: "Workbench & Tools" },
    aciklama: {
      tr: "Her kademe yıllık üretim tavanını %60 artırır.",
      en: "Each tier raises your yearly production cap by 60%.",
    },
    etki: "uretim",
    fiyatlar: [30, 70, 140],
  },
  YATIRIM_DEPO,
  {
    id: "dukkan",
    simge: "🏪",
    ad: { tr: "Vitrin", en: "Showroom" },
    aciklama: {
      tr: "Her kademe müşteri talebini %10 artırır.",
      en: "Each tier raises customer demand by 10%.",
    },
    etki: "talep",
    fiyatlar: [15, 30, 55],
  },
  YATIRIM_TANITIM,
  YATIRIM_GUVENLIK_ZANAAT,
];

// ── Roller ─────────────────────────────────────────────────────────────────
const TUCCAR_ROLLER: RolTanimi[] = [
  { tur: "ana", ad: { tr: "Satıcı", en: "Salesman" } },
  { tur: "maliyet", ad: { tr: "Alıcı", en: "Buyer" } },
  { tur: "musteri", ad: { tr: "Tanıtımcı", en: "Promoter" } },
  { tur: "guvenlik", ad: { tr: "Depo muhafızı", en: "Warehouse guard" } },
];
const ZANAATKAR_ROLLER: RolTanimi[] = [
  { tur: "ana", ad: { tr: "Üretici", en: "Maker" } },
  { tur: "maliyet", ad: { tr: "Hammaddeci", en: "Materials buyer" } },
  { tur: "musteri", ad: { tr: "Tanıtımcı", en: "Promoter" } },
  { tur: "guvenlik", ad: { tr: "Atölye bekçisi", en: "Workshop watchman" } },
];

/** Rol başına oyuncuya gösterilen kısa etki açıklaması (bonus yeteneğe göre değişir). */
export const ROL_ACIKLAMALARI: Record<"ticaret" | "uretim", Record<IsletmeRolTuru, DilliMetin>> = {
  ticaret: {
    ana: { tr: "Yıllık satışı artırır", en: "Raises yearly sales" },
    maliyet: { tr: "Mal alış maliyetini düşürür", en: "Lowers purchase costs" },
    musteri: { tr: "Pazar payını büyütür", en: "Grows market share" },
    guvenlik: { tr: "Hırsızlığa karşı korur", en: "Protects against theft" },
  },
  uretim: {
    ana: { tr: "Yıllık üretimi artırır", en: "Raises yearly production" },
    maliyet: { tr: "Hammadde giderini düşürür", en: "Lowers material costs" },
    musteri: { tr: "Pazar payını büyütür", en: "Grows market share" },
    guvenlik: { tr: "Hırsızlığa karşı korur", en: "Protects against theft" },
  },
};

const TUCCAR_ORTA_CAG: IsletmeProfili = {
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.49, birimMaliyet: 0.67, birimFiyat: 1.15, minRutbe: 1 },
    { id: "kumas", simge: "🧵", ad: { tr: "Kumaş", en: "Cloth" }, kesim: "orta", talepTabani: 0.84, birimMaliyet: 0.96, birimFiyat: 1.9, minRutbe: 2 },
    { id: "sarap", simge: "🍷", ad: { tr: "Şarap", en: "Wine" }, kesim: "orta", talepTabani: 0.74, birimMaliyet: 1.06, birimFiyat: 2.1, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Silah", en: "Arms" }, kesim: "orta", talepTabani: 0.65, birimMaliyet: 1.15, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.5 },
    { id: "baharat", simge: "🌶️", ad: { tr: "Baharat", en: "Spices" }, kesim: "luks", talepTabani: 0.28, birimMaliyet: 2.11, birimFiyat: 5.0, minRutbe: 3 },
    { id: "kurk", simge: "🦊", ad: { tr: "Kürk ve İpek", en: "Fur & Silk" }, kesim: "luks", talepTabani: 0.33, birimMaliyet: 2.3, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: TUCCAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Tüccar|Orta Çağ"] ?? [],
};

const TUCCAR_SANAYI: IsletmeProfili = {
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.496, birimMaliyet: 0.67, birimFiyat: 1.15, minRutbe: 1 },
    { id: "komur", simge: "⛏️", ad: { tr: "Kömür", en: "Coal" }, kesim: "temel", talepTabani: 1.397, birimMaliyet: 0.72, birimFiyat: 1.2, minRutbe: 1 },
    { id: "pamuklu", simge: "🧶", ad: { tr: "Pamuklu", en: "Cotton Goods" }, kesim: "orta", talepTabani: 0.77, birimMaliyet: 0.96, birimFiyat: 1.9, minRutbe: 2 },
    { id: "cay_kahve", simge: "☕", ad: { tr: "Çay ve Kahve", en: "Tea & Coffee" }, kesim: "orta", talepTabani: 0.68, birimMaliyet: 1.06, birimFiyat: 2.1, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "orta", talepTabani: 0.59, birimMaliyet: 1.25, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.3 },
    { id: "ipek", simge: "🪭", ad: { tr: "İpek", en: "Silk" }, kesim: "luks", talepTabani: 0.3, birimMaliyet: 2.3, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: TUCCAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Tüccar|Sanayi Devrimi"] ?? [],
};

const ZANAATKAR_ORTA_CAG: IsletmeProfili = {
  mod: "uretim",
  hatlar: [
    { id: "kap", simge: "🏺", ad: { tr: "Çömlek ve Kap", en: "Pottery & Vessels" }, kesim: "temel", talepTabani: 1.584, birimMaliyet: 0.58, birimFiyat: 1.15, minRutbe: 1 },
    { id: "demir", simge: "⚒️", ad: { tr: "Demir Alet", en: "Iron Tools" }, kesim: "temel", talepTabani: 1.278, birimMaliyet: 0.67, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🪑", ad: { tr: "Mobilya", en: "Furniture" }, kesim: "orta", talepTabani: 1.037, birimMaliyet: 0.86, birimFiyat: 1.9, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Kılıç ve Zırh", en: "Swords & Armour" }, kesim: "orta", talepTabani: 0.858, birimMaliyet: 0.96, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.5 },
    { id: "kuyum", simge: "💍", ad: { tr: "Kuyum ve İşleme", en: "Jewellery & Fine Work" }, kesim: "luks", talepTabani: 0.383, birimMaliyet: 1.82, birimFiyat: 5.0, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: ZANAATKAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Zanaatkâr|Orta Çağ"] ?? [],
};

const ZANAATKAR_SANAYI: IsletmeProfili = {
  mod: "uretim",
  hatlar: [
    { id: "ayakkabi", simge: "👞", ad: { tr: "Ayakkabı ve Deri", en: "Shoes & Leather" }, kesim: "temel", talepTabani: 1.602, birimMaliyet: 0.62, birimFiyat: 1.15, minRutbe: 1 },
    { id: "ev_esyasi", simge: "🍳", ad: { tr: "Ev Eşyası", en: "Household Goods" }, kesim: "temel", talepTabani: 1.494, birimMaliyet: 0.67, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🛋️", ad: { tr: "Mobilya ve Cam", en: "Furniture & Glass" }, kesim: "orta", talepTabani: 1.129, birimMaliyet: 0.91, birimFiyat: 1.9, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "orta", talepTabani: 0.941, birimMaliyet: 1.06, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.3 },
    { id: "saat", simge: "⌚", ad: { tr: "Saat ve Mücevher", en: "Watches & Jewellery" }, kesim: "luks", talepTabani: 0.436, birimMaliyet: 1.92, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: ZANAATKAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Zanaatkâr|Sanayi Devrimi"] ?? [],
};

const PROFILLER: Partial<Record<string, Record<Cag, IsletmeProfili>>> = {
  Tüccar: { "Orta Çağ": TUCCAR_ORTA_CAG, "Sanayi Devrimi": TUCCAR_SANAYI },
  Zanaatkâr: { "Orta Çağ": ZANAATKAR_ORTA_CAG, "Sanayi Devrimi": ZANAATKAR_SANAYI },
};

/** Meslek işletmesi tanımlıysa profili döner; tanımsız meslekler eski maaş sistemiyle çalışır. */
export function isletmeProfiliGetir(meslek: string, cag: Cag): IsletmeProfili | null {
  return PROFILLER[meslek]?.[cag] ?? null;
}

export function isletmeMeslegiMi(meslek: string): boolean {
  return !!PROFILLER[meslek];
}

export function hatTanimiGetir(profil: IsletmeProfili, id: string): HatTanimi | undefined {
  return profil.hatlar.find((h) => h.id === id);
}

export function yatirimTanimiGetir(profil: IsletmeProfili, id: string): YatirimTanimi | undefined {
  return profil.yatirimlar.find((y) => y.id === id);
}

export function rolAdiGetir(profil: IsletmeProfili, tur: IsletmeRolTuru): DilliMetin {
  return profil.roller.find((r) => r.tur === tur)?.ad ?? { tr: tur, en: tur };
}

/**
 * Şehir yöneticisi (işletmeli meslekler için TEK otorite): ülke × çağ'a göre unvan.
 * Dönen değer kanonik Türkçe addır (K() ile çevrilir; katalog.en.ts).
 */
const SEHIR_YONETICISI: Record<Cag, Record<string, string>> = {
  "Orta Çağ": {
    Fransa: "Prévôt",
    "Kutsal Roma": "Burggraf",
    Bizans: "Eparkhos",
    Selçuklu: "Subaşı",
    Eyyubiler: "Subaşı",
  },
  "Sanayi Devrimi": {
    İngiltere: "Belediye Başkanı",
    Fransa: "Préfet",
    Osmanlı: "Vali",
    Rusya: "Gubernator",
  },
};

export function sehirYoneticisiUnvani(cag: Cag, bolge: string): string {
  return SEHIR_YONETICISI[cag]?.[bolge] ?? (cag === "Sanayi Devrimi" ? "Vali" : "Prévôt");
}

/**
 * Din Adamı/Asker için (henüz işletmesi olmayan meslekler) eski "patron" figürünün adı
 * (meslek × çağ × ülke/din). Dönen değer kanonik Türkçe addır (K() ile çevrilir).
 */
const OTORITE_TABLOSU: Record<string, Record<Cag, { genel: string; ozel?: Record<string, string> }>> = {
  "Din Adamı": {
    "Orta Çağ": { genel: "Piskopos", ozel: { Bizans: "Metropolit", Selçuklu: "Kadı" } },
    "Sanayi Devrimi": { genel: "Piskopos", ozel: { Rusya: "Metropolit", Osmanlı: "Müftü" } },
  },
  Asker: {
    "Orta Çağ": { genel: "Kumandan", ozel: { Selçuklu: "Subaşı" } },
    "Sanayi Devrimi": { genel: "Albay", ozel: { Osmanlı: "Paşa", Rusya: "General" } },
  },
};

export function otoriteUnvaniGetir(meslek: string, cag: Cag, bolge: string): string | null {
  if (isletmeMeslegiMi(meslek)) return sehirYoneticisiUnvani(cag, bolge);
  const t = OTORITE_TABLOSU[meslek]?.[cag];
  if (!t) return null;
  return t.ozel?.[bolge] ?? t.genel;
}
