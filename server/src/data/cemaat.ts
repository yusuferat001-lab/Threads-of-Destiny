import type { CemaatBagis, CemaatKitle, CemaatTon, CemaatYardim, DonemTuru } from "../types";
import type { DilliMetin } from "./meslekProfilleri";
import type { FaaliyetId } from "./ogretiler";

/**
 * Din Adamı "cemaat" işletmesi sayıları (v10). Tek kaynak: game/cemaat.ts bunları okur.
 * Birimler: "b" = BAGIS_BIRIMI (bir bağışçının yıllık ortalama bağışı, enflasyonsuz).
 */

/** Bağış yapan başına yıllık ortalama bağış (enflasyonsuz). Simülasyonla ayarlanır (scripts/simulateIsletme.ts). */
export const BAGIS_BIRIMI = 1.27;
/** Bağış yapan inanan oranının taban değeri (adak politikasında). */
export const BAGIS_TABAN_ORANI = 0.65;
export const BAGIS_ORANI_TAVAN = 0.95;
/** Fanatiklik başına bağış yapma oranı artışı (f=50 → ×1.30). */
export const FANATIK_BAGIS_KATSAYI = 0.006;
/** Fanatiklik başına yıllık inanan kaçışı (f=50 → %1.5). */
export const FANATIK_KACIS_KATSAYI = 0.0003;
/** Fanatiklik başına yıllık otorite kaybı. */
export const FANATIK_OTORITE_KATSAYI = 0.006;
/** Fanatikliğin aşırılık olayı doğurmaya başladığı eşik ve olay etkileri. */
export const ASIRI_ESIK = 40;
export const ASIRI_COOLDOWN_YIL = 3;
export const ASIRI_SOHRET = 5;
export const ASIRI_OTORITE = 10;
export const ASIRI_INANAN = 0.03;
/** Ton başına yıllık fanatiklik değişimi + doğal sönüm. */
export const TON_FANATIKLIK: Record<CemaatTon, number> = { ilimli: -1.5, dengeli: 0, atesli: 1.2 };
export const FANATIK_DOGAL_SONUM = 0.3;

/** Ayin masrafı: bağışın %8'i (mum, buhur, ekmek-şarap). */
export const AYIN_MASRAF_ORANI = 0.08;
/** Teşkilat aidatı: toplam gelirin %3'ü. */
export const TESKILAT_AIDATI_ORANI = 0.02;

/** Ahlak → yıllık inanan değişimi (kesir), 25'erli bantlar. */
export const AHLAK_BANTLARI: { min: number; max: number; inanan: number }[] = [
  { min: 0, max: 24, inanan: -0.015 },
  { min: 25, max: 49, inanan: 0 },
  { min: 50, max: 74, inanan: 0.005 },
  { min: 75, max: 100, inanan: 0.015 },
];
export function ahlakInananEtkisi(ahlak: number): number {
  const a = Math.round(ahlak);
  return (AHLAK_BANTLARI.find((b) => a >= b.min && a <= b.max) ?? AHLAK_BANTLARI[1]).inanan;
}
export function ahlakBandiIndeksi(ahlak: number): number {
  const a = Math.round(ahlak);
  const i = AHLAK_BANTLARI.findIndex((b) => a >= b.min && a <= b.max);
  return i < 0 ? 1 : i;
}

/** Ayine gelme oranı aralıkları (yıl yıl rastgele). */
export type GelmeKaynagi = "normal" | "kitlik" | "savas" | "veba";
export const GELME_ARALIKLARI: Record<GelmeKaynagi, [number, number]> = {
  normal: [0.78, 0.86],
  kitlik: [0.72, 0.8],
  savas: [0.68, 0.78],
  veba: [0.35, 0.5],
};

/** Bina kademesi (0..4) → ibadethane kapasitesi (aynı anda ayine sığan inanan). */
export const BINA_KAPASITE = [50, 75, 105, 145, 195];
/** Bina bakımı (enflasyonsuz yıllık). */
export const BINA_BAKIM = [4, 8, 12, 19, 30]; // v26: depo bakımıyla aynı

// ── Politikalar ─────────────────────────────────────────────────────────────
export interface BagisPolitikasi {
  /** Bağış tutarı çarpanı. */
  miktar: number;
  /** Bağış yapan oranı çarpanı. */
  oran: number;
  /** Yıllık inanan değişimi (kesir). */
  inanan: number;
  /** Yıllık ahlak değişimi. */
  ahlak: number;
  ad: DilliMetin;
  aciklama: DilliMetin;
}
export const BAGIS_POLITIKASI: Record<CemaatBagis, BagisPolitikasi> = {
  eksi20: {
    miktar: 0.8, oran: 1.12, inanan: 0.03, ahlak: 0.3,
    ad: { tr: "Gönüllü-sembolik", en: "Voluntary & token" },
    aciklama: { tr: "Bağış −%20, bağış yapan oranı ×1,12. İnanan +%3/yıl, ahlak +0,3/yıl.", en: "Donations −20%, giver share ×1.12. Flock +3%/yr, morality +0.3/yr." },
  },
  eksi10: {
    miktar: 0.9, oran: 1.06, inanan: 0.015, ahlak: 0.15,
    ad: { tr: "Gönüllü", en: "Voluntary" },
    aciklama: { tr: "Bağış −%10, bağış yapan oranı ×1,06. İnanan +%1,5/yıl, ahlak +0,15/yıl.", en: "Donations −10%, giver share ×1.06. Flock +1.5%/yr, morality +0.15/yr." },
  },
  normal: {
    miktar: 1, oran: 1, inanan: 0, ahlak: 0,
    ad: { tr: "Adak", en: "Votive offering" },
    aciklama: { tr: "Gelenek ne ise o. Dengeli.", en: "Whatever custom dictates. Balanced." },
  },
  arti10: {
    miktar: 1.1, oran: 0.94, inanan: -0.01, ahlak: -0.2,
    ad: { tr: "Beklenti", en: "Expected tithe" },
    aciklama: { tr: "Bağış +%10, bağış yapan oranı ×0,94. İnanan −%1/yıl, ahlak −0,2/yıl.", en: "Donations +10%, giver share ×0.94. Flock −1%/yr, morality −0.2/yr." },
  },
  arti20: {
    miktar: 1.2, oran: 0.85, inanan: -0.03, ahlak: -0.5,
    ad: { tr: "Zorunlu öşür", en: "Compulsory tithe" },
    aciklama: { tr: "Bağış +%20, bağış yapan oranı ×0,85. İnanan −%3/yıl, ahlak −0,5/yıl. Otorite etkilenmez.", en: "Donations +20%, giver share ×0.85. Flock −3%/yr, morality −0.5/yr. The authority doesn't mind." },
  },
};
export const BAGIS_SIRASI: CemaatBagis[] = ["eksi20", "eksi10", "normal", "arti10", "arti20"];

export interface KitlePolitikasi {
  bagis: number;
  inanan: number;
  ahlak: number;
  otorite: number;
  ad: DilliMetin;
  aciklama: DilliMetin;
}
export const KITLE_POLITIKASI: Record<CemaatKitle, KitlePolitikasi> = {
  alt: {
    bagis: 0.85, inanan: 0.012, ahlak: 0.2, otorite: 0,
    ad: { tr: "Halka", en: "Common folk" },
    aciklama: { tr: "Bağış ×0,85. İnanan +%1,2/yıl, ahlak +0,2/yıl.", en: "Donations ×0.85. Flock +1.2%/yr, morality +0.2/yr." },
  },
  genel: {
    bagis: 1, inanan: 0, ahlak: 0, otorite: 0,
    ad: { tr: "Herkese", en: "Everyone" },
    aciklama: { tr: "Dengeli.", en: "Balanced." },
  },
  ust: {
    bagis: 1.25, inanan: -0.008, ahlak: -0.2, otorite: 0.2,
    ad: { tr: "Zenginlere", en: "The wealthy" },
    aciklama: { tr: "Bağış ×1,25. İnanan −%0,8/yıl, ahlak −0,2/yıl, otorite +0,2/yıl.", en: "Donations ×1.25. Flock −0.8%/yr, morality −0.2/yr, authority +0.2/yr." },
  },
};
export const KITLE_SIRASI: CemaatKitle[] = ["alt", "genel", "ust"];

export interface YardimPolitikasi {
  /** Toplam gelirin yüzdesi (kesir). */
  oran: number;
  inanan: number;
  ahlak: number;
  ad: DilliMetin;
  aciklama: DilliMetin;
}
export const YARDIM_POLITIKASI: Record<CemaatYardim, YardimPolitikasi> = {
  dusuk: {
    oran: 0.1, inanan: -0.006, ahlak: -0.5,
    ad: { tr: "Az yardım", en: "Little aid" },
    aciklama: { tr: "Gelirin %10'u. İnanan −%0,6/yıl, ahlak −0,5/yıl.", en: "10% of income. Flock −0.6%/yr, morality −0.5/yr." },
  },
  orta: {
    oran: 0.2, inanan: 0.005, ahlak: 0,
    ad: { tr: "Orta yardım", en: "Fair aid" },
    aciklama: { tr: "Gelirin %20'si. İnanan +%0,5/yıl.", en: "20% of income. Flock +0.5%/yr." },
  },
  yuksek: {
    oran: 0.3, inanan: 0.015, ahlak: 0.8,
    ad: { tr: "Bol yardım", en: "Generous aid" },
    aciklama: { tr: "Gelirin %30'u. İnanan +%1,5/yıl, ahlak +0,8/yıl.", en: "30% of income. Flock +1.5%/yr, morality +0.8/yr." },
  },
};
export const YARDIM_SIRASI: CemaatYardim[] = ["dusuk", "orta", "yuksek"];
/** Aşevi yatırımının her kademesi yardımın inanan/ahlak getirisini bu kadar artırır. */
export const ASEVI_KADEME_ETKISI = 0.40; // v25: 0.12 → 0.40 (K4 = yardım getirisi ×2,6)
/** v25: aşevi (orta/bol yardım politikasında) kademe başına doğrudan yıllık inanan ve ahlak getirir. */
export const ASEVI_INANAN_YILLIK = [0, 1, 2, 3, 5];
export const ASEVI_AHLAK_YILLIK = [0, 0.15, 0.3, 0.45, 0.7];

export const TON_SIRASI: CemaatTon[] = ["ilimli", "dengeli", "atesli"];
export const TON_ADLARI: Record<CemaatTon, { ad: DilliMetin; aciklama: DilliMetin }> = {
  ilimli: {
    ad: { tr: "Ilımlı vaaz", en: "Moderate preaching" },
    aciklama: { tr: "Fanatiklik yılda 1,5 düşer.", en: "Zealotry drops by 1.5 a year." },
  },
  dengeli: {
    ad: { tr: "Dengeli vaaz", en: "Balanced preaching" },
    aciklama: { tr: "Fanatiklik yalnız doğal olarak (−0,3/yıl) söner.", en: "Zealotry only fades naturally (−0.3/yr)." },
  },
  atesli: {
    ad: { tr: "Ateşli vaaz", en: "Fiery preaching" },
    aciklama: { tr: "Fanatiklik yılda 1,2 artar (doğal sönüm −0,3).", en: "Zealotry rises by 1.2 a year (natural fade −0.3)." },
  },
};

// ── Faaliyetler ─────────────────────────────────────────────────────────────
export interface FaaliyetTanimi {
  id: FaaliyetId;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  /** İnanan başına yıllık gelir (b cinsinden). */
  gelirBirimi: number;
  /** Gelirin masraf oranı. */
  masraf: number;
  minRutbe: number;
  /** Yıllık ahlak / inanan etkisi (açıkken). */
  ahlak: number;
  inanan: number;
}
export const FAALIYETLER: FaaliyetTanimi[] = [
  {
    id: "tovbe", simge: "🙏", gelirBirimi: 0.23, masraf: 0.1, minRutbe: 1, ahlak: -0.4, inanan: 0,
    ad: { tr: "Tövbe ve İtiraf", en: "Penance & Confession" },
    aciklama: { tr: "Günahlarından arınmak isteyenlerden ücret alırsın. Ahlak −0,4/yıl.", en: "You charge those seeking absolution. Morality −0.4/yr." },
  },
  {
    id: "ritual", simge: "⚰️", gelirBirimi: 0.17, masraf: 0.2, minRutbe: 1, ahlak: 0, inanan: 0,
    ad: { tr: "Ayin, Nikâh ve Cenaze", en: "Rites, Weddings & Funerals" },
    aciklama: { tr: "Nikâh, cenaze, dua. Savaş ve salgında çok artar.", en: "Weddings, funerals, prayers. Soar in war and plague." },
  },
  {
    id: "sifa", simge: "🌿", gelirBirimi: 0.06, masraf: 0.6, minRutbe: 2, ahlak: 0.4, inanan: 0.01,
    ad: { tr: "Şifa ve Bakım", en: "Healing & Care" },
    aciklama: { tr: "Hastalara bakar, ilaç verirsin; masrafı yüksek. Ahlak +0,4, inanan +%1/yıl.", en: "You tend the sick; costs are high. Morality +0.4, flock +1%/yr." },
  },
  {
    id: "egitim", simge: "📖", gelirBirimi: 0.05, masraf: 0.3, minRutbe: 3, ahlak: 0, inanan: 0.012,
    ad: { tr: "Eğitim ve Okuma", en: "Teaching & Reading" },
    aciklama: { tr: "Çocuklara okuma-yazma ve ilahi. İnanan +%1,2/yıl.", en: "Reading, writing and hymns for the young. Flock +1.2%/yr." },
  },
  {
    id: "emanet", simge: "🏺", gelirBirimi: 0.25, masraf: 0.4, minRutbe: 4, ahlak: -0.3, inanan: 0,
    ad: { tr: "Kutsal Emanet ve Hac", en: "Relics & Pilgrimage" },
    aciklama: { tr: "Emanetleri gösterir, hacıları ağırlarsın. Ahlak −0,3/yıl; kıtlık ve savaşta çöker.", en: "You show relics and host pilgrims. Morality −0.3/yr; collapses in famine and war." },
  },
];
export function faaliyetGetir(id: string): FaaliyetTanimi | undefined {
  return FAALIYETLER.find((f) => f.id === id);
}
/** Rütbe S1..S5 → aynı anda açık tutulabilecek faaliyet sayısı. */
export const FAALIYET_SLOTLARI = [1, 2, 2, 3, 3];

// ── Dönem etkileri (cemaat) ─────────────────────────────────────────────────
export interface CemaatDonemEtkisi {
  /** Yüzde değişimler (1 = etkisiz çarpan). */
  bagis: number;
  tovbe: number;
  ritual: number;
  sifa: number;
  egitim: number;
  emanet: number;
  yardim: number;
}
const e = (b: number, t: number, r: number, s: number, ed: number, em: number, y: number): CemaatDonemEtkisi => ({
  bagis: 1 + b / 100, tovbe: 1 + t / 100, ritual: 1 + r / 100, sifa: 1 + s / 100, egitim: 1 + ed / 100, emanet: 1 + em / 100, yardim: y,
});
export const CEMAAT_DONEM_ETKILERI: Record<DonemTuru | "savas" | "veba", CemaatDonemEtkisi> = {
  bolluk: e(15, 10, 10, -10, 0, 35, 0.8),
  durgunluk: e(-10, 15, 0, 10, 0, -30, 1),
  kitlik: e(-30, 30, 10, 30, 0, -60, 1.5),
  savas: e(-10, 40, 50, 50, 0, -70, 1.3),
  veba: e(0, 50, 80, 80, -20, -80, 1.5),
};

// ── Okul / misyoner ─────────────────────────────────────────────────────────
/** Okul kademesi (0..4) → yıllık mezun şansı. */
export const OKUL_MEZUN_SANSI = [0, 0.08, 0.16, 0.24, 0.32];
/** Misyoner mezun: inanan büyümesi (kendi inananının… P'nin) yüzdesi ve usta aday ihtimali. */
export const MEZUN_PAZAR_ARALIK: [number, number] = [0.008, 0.015];
export const MEZUN_ADAY_SANSI = 0.35;
export const OKUL_YETENEK_KADEME = 0.15;

// ── Dini saldırılar ─────────────────────────────────────────────────────────
export type DiniSaldiri = "kumbara" | "muridcalma" | "bidat" | "aforoz" | "yangin" | "engizisyon";
/** Kademe (1..3) → saldırı türü ağırlıkları. */
export const DINI_SALDIRI_AGIRLIKLARI: Record<1 | 2 | 3, Partial<Record<DiniSaldiri, number>>> = {
  1: { kumbara: 30, muridcalma: 40, bidat: 30 },
  2: { kumbara: 15, muridcalma: 30, bidat: 30, aforoz: 25 },
  3: { kumbara: 10, muridcalma: 20, bidat: 25, aforoz: 20, yangin: 15, engizisyon: 10 },
};
export const DINI_FIZIKSEL: DiniSaldiri[] = ["kumbara", "yangin"];
export const ENGIZISYON_AHLAK_ESIGI = 45;
/** Hasarlar [k1,k2,k3]. nakit: önceki brüt kârın %'si; inanan: kendi inananının %'si; sohret/ahlak/otorite: puan. */
export const DINI_SALDIRI_HASARLARI = {
  kumbara: { nakit: [6, 10, 14] },
  muridcalma: { inanan: [5, 9, 13] },
  bidat: { sohret: [0, 5, 8], ahlak: [1, 2, 3], inanan: [3, 5, 8] },
  aforoz: { otorite: [0, 10, 15], inanan: [0, 6, 10] },
  yangin: { nakit: [0, 0, 7], inanan: [0, 0, 3] },
  engizisyon: { nakit: [0, 0, 14], sohret: [0, 0, 8], otorite: [0, 0, 10], inanan: [0, 0, 6] },
} as const;

// ── Otorite talepleri (Yap / Yapma) ─────────────────────────────────────────
/** Din Adamı'nda talep türü ağırlıkları. */
export const DIN_TALEP_AGIRLIKLARI = { aciklama: 50, bagis: 30, sadakat: 20 };
export const YAP_ACIKLAMA = { otorite: [13, 15], ahlak: [-8, -7], inanan: -0.03 } as const;
export const YAPMA_ACIKLAMA = { otorite: [-20, -18], sohret: -3, ahlak: 2, inanan: 0.02 } as const;
export const YAP_DIGER_OTORITE: [number, number] = [13, 15];
export const YAPMA_DIGER_OTORITE: [number, number] = [-20, -18];

export const ILK_FANATIKLIK = 0;
