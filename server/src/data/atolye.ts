import type { DilliMetin } from "./meslekProfilleri";

/**
 * Zanaatkâr atölye projeleri (ürün geliştirme / icat). Çok yıllı, aynı anda tek; sayılar tek kaynak: game/proje.ts + game/atolye.ts.
 * `masraf`: yıllık, enflasyonsuz (gider enflasyonuyla çarpılır); `tavanPayi`: proje sürerken üretim tavanından ayrılan pay.
 */
export type AtolyeProjeTuru = "verim" | "model" | "hat" | "tezgah" | "saheser";

export interface ProjeTanimi {
  id: string;
  tur: AtolyeProjeTuru;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  minRutbe: number;
  /** Süre (yıl); sürülünce ya da uzatılınca karar penceresi açılır. */
  sure: number;
  /** "acik": rütbesi yeten bir hat seçilir; "kilitli": rütbesi yetmeyen bir hat seçilir; null: hat gerekmez. */
  hat: "acik" | "kilitli" | null;
  masraf: number;
  tavanPayi: number;
  /** Başarısızlık tabanı (0-1). */
  zorluk: number;
}

export const ATOLYE_PROJELERI: ProjeTanimi[] = [
  {
    id: "verimli_yontem", tur: "verim", simge: "⚙️", minRutbe: 2, sure: 3, hat: "acik", masraf: 4, tavanPayi: 0.1, zorluk: 0.15,
    ad: { tr: "Verimli yöntem", en: "Efficient method" },
    aciklama: { tr: "Bir ürünü daha az malzemeyle, daha az fireyle yapmanın yolunu ararsın. Başarırsan o ürünün maliyeti kalıcı düşer.", en: "You hunt for a way to make one product with less material and waste. On success its cost drops for good." },
  },
  {
    id: "yeni_model", tur: "model", simge: "📐", minRutbe: 2, sure: 3, hat: "acik", masraf: 5, tavanPayi: 0.1, zorluk: 0.2,
    ad: { tr: "Yeni model", en: "New model" },
    aciklama: { tr: "Bir ürünün yeni, daha çok beğenilen bir modelini tasarlarsın. Başarırsan o ürün daha çok talep görür ve daha iyi fiyata gider.", en: "You design a newer, more admired model of a product. On success it draws more demand and sells at a better price." },
  },
  {
    id: "yeni_hat", tur: "hat", simge: "🗝️", minRutbe: 1, sure: 2, hat: "kilitli", masraf: 4, tavanPayi: 0.1, zorluk: 0.15,
    ad: { tr: "Yeni ürün hattı", en: "New product line" },
    aciklama: { tr: "Henüz rütbenin yetmediği bir ürünün yapımını öğrenirsin. Başarırsan o hat rütbe şartı olmadan açılır.", en: "You learn to make a product your rank does not yet allow. On success that line opens without the rank requirement." },
  },
  {
    id: "tezgah_icadi", tur: "tezgah", simge: "🛠️", minRutbe: 3, sure: 4, hat: null, masraf: 6, tavanPayi: 0.15, zorluk: 0.25,
    ad: { tr: "Tezgâh icadı", en: "Workbench invention" },
    aciklama: { tr: "Tezgâhını daha hızlı çalıştıracak bir düzen icat edersin. Başarırsan yıllık üretim kalıcı artar.", en: "You invent a layout that makes your bench run faster. On success your yearly output rises for good." },
  },
  {
    id: "saheser", tur: "saheser", simge: "👑", minRutbe: 3, sure: 3, hat: "acik", masraf: 8, tavanPayi: 0.3, zorluk: 0.3,
    ad: { tr: "Şaheser", en: "Masterpiece" },
    aciklama: { tr: "Adını yıllarca anılacak bir eser yaparsın. Atölyenin işini epey yavaşlatır; başarırsan ustalığın, şöhretin ve müşterin büyür.", en: "You craft a piece your name will be remembered for. It slows the workshop a good deal; on success your mastery, fame and clientele grow." },
  },
];

export function atolyeProjesiGetir(id: string): ProjeTanimi | undefined {
  return ATOLYE_PROJELERI.find((p) => p.id === id);
}

export const VERIM_MAKS = 3;
export const MODEL_MAKS = 2;
export const TEZGAH_ICAT_MAKS = 2;
/** Kademe başına etki: verim → birim maliyet indirimi; model → satış fiyatı ve talep artışı; tezgâh icadı → üretim tavanı. */
export const VERIM_MALIYET_INDIRIMI = 0.06;
export const MODEL_FIYAT_ARTISI = 0.05;
export const MODEL_TALEP_ARTISI = 0.04;
export const TEZGAH_ICAT_TAVAN = 0.1;
/** Şaheser: itibar (Ustalık), şöhret, müşteri kesri. */
export const SAHESER_ITIBAR = 10;
export const SAHESER_SOHRET = 4;
export const SAHESER_MUSTERI = 0.02;
/** Başarısızlık ve vazgeçme bedeli (itibar). */
export const PROJE_BASARISIZ_ITIBAR = -2;
export const PROJE_VAZGEC_ITIBAR = -1;
/** Uzatılan projede ikinci denemenin başarı şansı artışı. */
export const PROJE_UZAT_SANS = 0.2;
export const PROJE_SANS_TABAN = 0.78;
/** Üretici (ana rol) çalışanların bonusunun şansa katkı oranı ve tavanı. */
export const PROJE_USTA_KATKI = 0.3;
export const PROJE_USTA_TAVAN = 0.15;
