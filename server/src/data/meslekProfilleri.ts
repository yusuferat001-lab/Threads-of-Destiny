import type { Cag, IsletmeAdayTipi, IsletmeFiyat, IsletmeRolTuru } from "../types";
import { ADAY_SABLONLARI, type AdayTaslagi } from "./adayHavuzlari";

export type { AdayTaslagi } from "./adayHavuzlari";

/**
 * Meslek işletmesi profilleri (2026-10, dikey dilim — Tüccar + Zanaatkâr; Din Adamı 3. meslek olarak eklendi).
 * Kural kodu tek (game/isletme.ts); meslek × çağ yalnız burada isim, kalem
 * listesi ve birkaç sayıyla değişir. Metinler {tr,en} çiftleri olarak gömülüdür
 * (KARANLIK_ISLER deseni): oyuncunun diline göre `ikiDil` ile seçilir.
 */

export interface DilliMetin {
  tr: string;
  en: string;
}

/** v11: üç sınıf — temel (gündelik), savas (savaşta talebi artar), luks (bollukta kazandırır). */
export type UrunKesimi = "temel" | "savas" | "luks";

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
export type YatirimEtkisi = "depo" | "talep" | "alis" | "uretim" | "pazar" | "koruma" | "bina" | "okul" | "yardim";

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

/** Başlangıçta seçilen "ana ürün" bonusu (yalnız o hatta uygulanır). */
export interface UrunBonusu {
  /** Alış maliyeti çarpanı (<1 ucuzlatır). */
  alisCarpani?: number;
  /** Satış fiyatı çarpanı. */
  satisCarpani?: number;
  /** Talep çarpanı. */
  talepCarpani?: number;
  /** Depo çürümesi çarpanı (<1 az çürür). */
  curumeCarpani?: number;
  /** Savaşta ürünün savaş talebine eklenen ek (ör. 0.15 = ek +%15). */
  savasTalepEki?: number;
}

export interface BaslangicUrunu {
  hat: string;
  bonus: UrunBonusu;
  /** Seçim penceresinde gösterilen bir cümlelik bonus açıklaması. */
  ozet: DilliMetin;
}

export interface IsletmeProfili {
  /** v11: oyun başında seçilen üç ürün (temel / savaş / lüks); yoksa (Din Adamı) seçim yok. */
  baslangicUrunleri?: BaslangicUrunu[];
  /** "ticaret": mal satın alınır (depo dolana dek); "uretim": yıllık üretim tavanı vardır, maliyet hammaddedir; "cemaat": Din Adamı (bağış + faaliyetler, stok yok; game/cemaat.ts). */
  mod?: "ticaret" | "uretim" | "cemaat";
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
  savas: {
    arti: { tr: "Savaşta talebi ve fiyatı yükselir", en: "Demand and price rise in war" },
    eksi: { tr: "Barışta durgun satar", en: "Sells slowly in peacetime" },
  },
  luks: {
    arti: { tr: "Bollukta çok yüksek kâr", en: "Very high profit in boom years" },
    eksi: { tr: "Kıtlık, durgunluk ve savaşta satmaz", en: "Won't sell in famine, slump or war" },
  },
};
export const SAVAS_TALEP_ARTISI: DilliMetin = { tr: "Savaşta talebi artar", en: "Demand rises in war" };

export const FIYAT_ARTI_EKSI: Record<IsletmeFiyat, DilliMetin> = {
  eksi20: {
    tr: "Fiyat −%20, talep ≈ +%50. Çok satar, müşteri kazanırsın (yılda +%3 pay); birim kâr az, stok çabuk biter.",
    en: "Price −20%, demand ≈ +50%. You sell a lot and win customers (+3% share a year); thin margin, stock runs out fast.",
  },
  eksi10: {
    tr: "Fiyat −%10, talep ≈ +%21. Daha çok satar, müşteri çekersin (yılda +%1,5 pay); birim kâr biraz düşer.",
    en: "Price −10%, demand ≈ +21%. You sell more and attract customers (+1.5% share a year); slightly lower margin.",
  },
  normal: { tr: "Piyasa fiyatı. Dengeli.", en: "Market price. Balanced." },
  arti10: {
    tr: "Fiyat +%10, talep ≈ −%16. Birim kâr artar; müşteri yavaşça kaçar (yılda −%1,5 pay). Krizde talep daha çok düşer.",
    en: "Price +10%, demand ≈ −16%. Better margin; customers slowly drift away (−1.5% share a year). Demand drops more in a crisis.",
  },
  arti20: {
    tr: "Fiyat +%20, talep ≈ −%28. Birim kâr yüksek ama müşteri kaçar (yılda −%3 pay). Kıtlık ve savaşta riskli.",
    en: "Price +20%, demand ≈ −28%. High margin but customers leave (−3% share a year). Risky in famine and war.",
  },
};

// ── Yatırımlar (profil başına 5 × 3 kademe; fiyat enflasyonsuz taban) ──────
const YATIRIM_DEPO: YatirimTanimi = {
  id: "depo",
  simge: "🏚️",
  ad: { tr: "Depo", en: "Warehouse" },
  aciklama: {
    tr: "Stok kapasitesi: 50 → 90 → 130 → 190 birim. Büyük depo mal çürümesini azaltır (%10 → %3) ama bakımı yıllık gider yazar.",
    en: "Stock capacity: 50 → 90 → 130 → 190 units. A bigger warehouse reduces spoilage (10% → 3%) but upkeep is a yearly cost.",
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
      tr: "Her kademe alış maliyetini %5 düşürür (diğer indirimlerle çarpımsal birleşir).",
      en: "Each tier cuts purchase costs by 5% (stacks multiplicatively with other discounts).",
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

// ── Din Adamı (cemaat işletmesi, v10: mum "satmaz"; bağış + faaliyet geliri, stok yok) ──
const DIN_YATIRIMLAR: YatirimTanimi[] = [
  {
    id: "bina",
    simge: "⛪",
    ad: { tr: "İbadethane", en: "House of Worship" },
    aciklama: {
      tr: "Ayine sığan inanan: 50 → 80 → 120 → 175. Kapasiteyi aşan inananlar rakibe geçer; bakımı yıllık gider yazar.",
      en: "Worshippers it can hold: 50 → 80 → 120 → 175. Those beyond capacity drift to your rival; upkeep is a yearly cost.",
    },
    etki: "bina",
    fiyatlar: [22, 55, 120],
  },
  {
    id: "okul",
    simge: "🏫",
    ad: { tr: "Okul", en: "School" },
    aciklama: {
      tr: "Yılda mezun çıkarma şansı %12 / %20 / %30. Mezun misyoner olur: yeni inananlar getirir, bazen usta bir aday çıkar. Çalışanlar da daha hızlı gelişir.",
      en: "Yearly chance of a graduate: 12% / 20% / 30%. Graduates become missionaries, bring new believers, and sometimes a skilled recruit emerges. Staff also improve faster.",
    },
    etki: "okul",
    fiyatlar: [28, 65, 130],
  },
  {
    id: "asevi",
    simge: "🍲",
    ad: { tr: "Aşevi", en: "Soup Kitchen" },
    aciklama: {
      tr: "Her kademe yardım harcamasının inanan ve ahlak getirisini %15 artırır.",
      en: "Each tier raises the flock and morality payoff of your aid spending by 15%.",
    },
    etki: "yardim",
    fiyatlar: [15, 35, 70],
  },
  {
    ...YATIRIM_TANITIM,
    ad: { tr: "Vaaz ve Davet", en: "Sermons & Outreach" },
  },
  {
    ...YATIRIM_GUVENLIK_TUCCAR,
    ad: { tr: "Kilise Güvenliği", en: "Church Security" },
    aciklama: {
      tr: "Kumbara ve ibadethaneyi korur: Koruma +0,17 / +0,34 / +0,50 (toplam).",
      en: "Guards the offering box and the sanctuary: Protection +0.17 / +0.34 / +0.50 (total).",
    },
  },
];

const DIN_ROLLER: RolTanimi[] = [
  { tur: "ana", ad: { tr: "Vaiz", en: "Preacher" } },
  { tur: "maliyet", ad: { tr: "Ekonom", en: "Steward" } },
  { tur: "musteri", ad: { tr: "Davetçi", en: "Outreach worker" } },
  { tur: "guvenlik", ad: { tr: "Kilise bekçisi", en: "Church watchman" } },
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
export const ROL_ACIKLAMALARI: Record<"ticaret" | "uretim" | "cemaat", Record<IsletmeRolTuru, DilliMetin>> = {
  cemaat: {
    ana: { tr: "Bağışları artırır", en: "Raises donations" },
    maliyet: { tr: "Faaliyet masraflarını düşürür", en: "Lowers activity costs" },
    musteri: { tr: "İnanan sayısını artırır", en: "Grows the flock" },
    guvenlik: { tr: "Kumbarayı ve ibadethaneyi korur", en: "Protects the offering box and sanctuary" },
  },
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
  baslangicUrunleri: [
    { hat: "tahil", bonus: { curumeCarpani: 0.7 }, ozet: { tr: "Çürümesi %30 az: stok daha uzun dayanır.", en: "30% less spoilage: stock lasts longer." } },
    { hat: "silah", bonus: { savasTalepEki: 0.15, alisCarpani: 0.96 }, ozet: { tr: "Savaşta talebi ek +%15, alışı %4 ucuz; barışta durgun.", en: "+15% extra demand in war and 4% cheaper to buy; sluggish in peace." } },
    { hat: "baharat", bonus: { satisCarpani: 1.08 }, ozet: { tr: "Satış fiyatı +%8; talebi az ama marjı yüksek.", en: "+8% selling price; low demand but a fat margin." } },
  ],
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.49, birimMaliyet: 0.67, birimFiyat: 1.15, minRutbe: 1 },
    { id: "kumas", simge: "🧵", ad: { tr: "Kumaş", en: "Cloth" }, kesim: "temel", talepTabani: 0.84, birimMaliyet: 0.96, birimFiyat: 1.9, minRutbe: 2 },
    { id: "sarap", simge: "🍷", ad: { tr: "Şarap", en: "Wine" }, kesim: "temel", talepTabani: 0.74, birimMaliyet: 1.06, birimFiyat: 2.1, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Silah", en: "Arms" }, kesim: "savas", talepTabani: 0.65, birimMaliyet: 1.15, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.35 },
    { id: "baharat", simge: "🌶️", ad: { tr: "Baharat", en: "Spices" }, kesim: "luks", talepTabani: 0.28, birimMaliyet: 2.11, birimFiyat: 5.0, minRutbe: 3 },
    { id: "kurk", simge: "🦊", ad: { tr: "Kürk ve İpek", en: "Fur & Silk" }, kesim: "luks", talepTabani: 0.33, birimMaliyet: 2.3, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: TUCCAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Tüccar|Orta Çağ"] ?? [],
};

const TUCCAR_SANAYI: IsletmeProfili = {
  baslangicUrunleri: [
    { hat: "tahil", bonus: { curumeCarpani: 0.7 }, ozet: { tr: "Çürümesi %30 az: stok daha uzun dayanır.", en: "30% less spoilage: stock lasts longer." } },
    { hat: "makine", bonus: { savasTalepEki: 0.15, alisCarpani: 0.96 }, ozet: { tr: "Savaşta talebi ek +%15, alışı %4 ucuz; barışta durgun.", en: "+15% extra demand in war and 4% cheaper to buy; sluggish in peace." } },
    { hat: "ipek", bonus: { satisCarpani: 1.08 }, ozet: { tr: "Satış fiyatı +%8; talebi az ama marjı yüksek.", en: "+8% selling price; low demand but a fat margin." } },
  ],
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.496, birimMaliyet: 0.67, birimFiyat: 1.15, minRutbe: 1 },
    { id: "komur", simge: "⛏️", ad: { tr: "Kömür", en: "Coal" }, kesim: "temel", talepTabani: 1.397, birimMaliyet: 0.72, birimFiyat: 1.2, minRutbe: 1 },
    { id: "pamuklu", simge: "🧶", ad: { tr: "Pamuklu", en: "Cotton Goods" }, kesim: "temel", talepTabani: 0.77, birimMaliyet: 0.96, birimFiyat: 1.9, minRutbe: 2 },
    { id: "cay_kahve", simge: "☕", ad: { tr: "Çay ve Kahve", en: "Tea & Coffee" }, kesim: "temel", talepTabani: 0.68, birimMaliyet: 1.06, birimFiyat: 2.1, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "savas", talepTabani: 0.59, birimMaliyet: 1.25, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.25 },
    { id: "ipek", simge: "🪭", ad: { tr: "İpek", en: "Silk" }, kesim: "luks", talepTabani: 0.3, birimMaliyet: 2.3, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: TUCCAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Tüccar|Sanayi Devrimi"] ?? [],
};

const ZANAATKAR_ORTA_CAG: IsletmeProfili = {
  baslangicUrunleri: [
    { hat: "kap", bonus: { alisCarpani: 0.92 }, ozet: { tr: "Hammaddesi %8 ucuz; gündelik talep sağlam.", en: "Raw materials 8% cheaper; steady everyday demand." } },
    { hat: "silah", bonus: { savasTalepEki: 0.15, alisCarpani: 0.96 }, ozet: { tr: "Savaşta talebi ek +%15, hammaddesi %4 ucuz; barışta durgun.", en: "+15% extra demand in war and 4% cheaper materials; sluggish in peace." } },
    { hat: "kuyum", bonus: { satisCarpani: 1.08 }, ozet: { tr: "Satış fiyatı +%8; talebi az ama marjı yüksek.", en: "+8% selling price; low demand but a fat margin." } },
  ],
  mod: "uretim",
  hatlar: [
    { id: "kap", simge: "🏺", ad: { tr: "Çömlek ve Kap", en: "Pottery & Vessels" }, kesim: "temel", talepTabani: 1.711, birimMaliyet: 0.58, birimFiyat: 1.15, minRutbe: 1 },
    { id: "demir", simge: "⚒️", ad: { tr: "Demir Alet", en: "Iron Tools" }, kesim: "temel", talepTabani: 1.38, birimMaliyet: 0.67, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🪑", ad: { tr: "Mobilya", en: "Furniture" }, kesim: "temel", talepTabani: 1.12, birimMaliyet: 0.86, birimFiyat: 1.9, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Kılıç ve Zırh", en: "Swords & Armour" }, kesim: "savas", talepTabani: 0.927, birimMaliyet: 0.96, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.35 },
    { id: "kuyum", simge: "💍", ad: { tr: "Kuyum ve İşleme", en: "Jewellery & Fine Work" }, kesim: "luks", talepTabani: 0.414, birimMaliyet: 1.82, birimFiyat: 5.0, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: ZANAATKAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Zanaatkâr|Orta Çağ"] ?? [],
};

const ZANAATKAR_SANAYI: IsletmeProfili = {
  baslangicUrunleri: [
    { hat: "ayakkabi", bonus: { alisCarpani: 0.92 }, ozet: { tr: "Hammaddesi %8 ucuz; gündelik talep sağlam.", en: "Raw materials 8% cheaper; steady everyday demand." } },
    { hat: "makine", bonus: { savasTalepEki: 0.15, alisCarpani: 0.96 }, ozet: { tr: "Savaşta talebi ek +%15, hammaddesi %4 ucuz; barışta durgun.", en: "+15% extra demand in war and 4% cheaper materials; sluggish in peace." } },
    { hat: "saat", bonus: { satisCarpani: 1.08 }, ozet: { tr: "Satış fiyatı +%8; talebi az ama marjı yüksek.", en: "+8% selling price; low demand but a fat margin." } },
  ],
  mod: "uretim",
  hatlar: [
    { id: "ayakkabi", simge: "👞", ad: { tr: "Ayakkabı ve Deri", en: "Shoes & Leather" }, kesim: "temel", talepTabani: 1.49, birimMaliyet: 0.62, birimFiyat: 1.15, minRutbe: 1 },
    { id: "ev_esyasi", simge: "🍳", ad: { tr: "Ev Eşyası", en: "Household Goods" }, kesim: "temel", talepTabani: 1.389, birimMaliyet: 0.67, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🛋️", ad: { tr: "Mobilya ve Cam", en: "Furniture & Glass" }, kesim: "temel", talepTabani: 1.05, birimMaliyet: 0.91, birimFiyat: 1.9, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "savas", talepTabani: 0.875, birimMaliyet: 1.06, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.25 },
    { id: "saat", simge: "⌚", ad: { tr: "Saat ve Mücevher", en: "Watches & Jewellery" }, kesim: "luks", talepTabani: 0.405, birimMaliyet: 1.92, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: ZANAATKAR_ROLLER,
  adaylar: ADAY_SABLONLARI["Zanaatkâr|Sanayi Devrimi"] ?? [],
};

const DIN_ORTA_CAG: IsletmeProfili = {
  mod: "cemaat",
  hatlar: [],
  yatirimlar: DIN_YATIRIMLAR,
  roller: DIN_ROLLER,
  adaylar: ADAY_SABLONLARI["Din Adamı|Orta Çağ"] ?? [],
};

const DIN_SANAYI: IsletmeProfili = {
  mod: "cemaat",
  hatlar: [],
  yatirimlar: DIN_YATIRIMLAR,
  roller: DIN_ROLLER,
  adaylar: ADAY_SABLONLARI["Din Adamı|Sanayi Devrimi"] ?? [],
};

const PROFILLER: Partial<Record<string, Record<Cag, IsletmeProfili>>> = {
  Tüccar: { "Orta Çağ": TUCCAR_ORTA_CAG, "Sanayi Devrimi": TUCCAR_SANAYI },
  Zanaatkâr: { "Orta Çağ": ZANAATKAR_ORTA_CAG, "Sanayi Devrimi": ZANAATKAR_SANAYI },
  "Din Adamı": { "Orta Çağ": DIN_ORTA_CAG, "Sanayi Devrimi": DIN_SANAYI },
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
 * Asker için (henüz işletmesi olmayan meslek) eski "patron" figürünün adı (Din Adamı satırı işletmeye geçince kullanılmaz)
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
