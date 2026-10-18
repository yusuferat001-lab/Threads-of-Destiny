import type { CharacterState, EvcilHayvan } from "../types";

/** Evcil hayvan türleri (2026-10 yeniden tasarım: Papağan/Kurt kaldırıldı, Karga/At eklendi). İki çağda da aynı beş tür çıkar. */
export const EVCIL_HAYVAN_TURLERI = ["Köpek", "Kedi", "Şahin", "Karga", "At"] as const;
export type HayvanTuru = (typeof EVCIL_HAYVAN_TURLERI)[number];

/** Bir hayatta yaşanabilecek en fazla karşılaşma (edinme fırsatı) sayısı ve aynı anda yaşayabilecek en fazla hayvan. */
export const HAYVAN_KARSILASMA_TAVANI = 2;
export const HAYVAN_AYNI_ANDA_TAVANI = 2;

/** Türün ortalama ömrü (yıl); edinirken ±2 yıl rastgelelik eklenir. */
export const HAYVAN_ORTALAMA_OMUR: Record<string, number> = {
  Köpek: 14,
  Kedi: 15,
  Şahin: 17,
  Karga: 18,
  At: 20,
};

export type HayvanBonusId =
  | "kopek_savunma"
  | "kopek_saglik"
  | "kedi_mutluluk"
  | "kedi_sans"
  | "sahin_sohret"
  | "sahin_saldiri"
  | "karga_istihbarat"
  | "karga_karanlik"
  | "at_ticaret"
  | "at_enerji";

export interface HayvanBonusTanimi {
  id: HayvanBonusId;
  /** Kısa etiket: "Sağlık" (arayüzde "Pasif: +Sağlık"). */
  kisa: { tr: string; en: string };
  aciklama: { tr: string; en: string };
}

/** Her türün iki olası pasif bonusu; edinirken biri rastgele atanır, kalıcıdır. Tüm meslekler için evrensel olarak faydalıdır. */
export const HAYVAN_BONUSLARI: Record<string, [HayvanBonusTanimi, HayvanBonusTanimi]> = {
  Köpek: [
    {
      id: "kopek_savunma",
      kisa: { tr: "Savunma", en: "Defense" },
      aciklama: {
        tr: "Soygun, sabotaj ve rakip saldırısı riskini düşürür.",
        en: "Lowers the risk of theft, sabotage and rival attacks.",
      },
    },
    {
      id: "kopek_saglik",
      kisa: { tr: "Sağlık", en: "Health" },
      aciklama: {
        tr: "Hastalık, salgın ve yaralanmalara karşı direnci artırır.",
        en: "Raises resistance to illness, plague and injury.",
      },
    },
  ],
  Kedi: [
    {
      id: "kedi_mutluluk",
      kisa: { tr: "Mutluluk", en: "Happiness" },
      aciklama: {
        tr: "Kötü olayların mutluluk kaybını hafifletir.",
        en: "Softens the happiness lost to bad events.",
      },
    },
    {
      id: "kedi_sans",
      kisa: { tr: "Şans", en: "Luck" },
      aciklama: {
        tr: "Riskli kararlarda küçük bir başarı şansı ekler.",
        en: "Adds a small success chance to risky decisions.",
      },
    },
  ],
  Şahin: [
    {
      id: "sahin_sohret",
      kisa: { tr: "Şöhret", en: "Renown" },
      aciklama: {
        tr: "Yönetici figürlerle ilişkiyi ve şöhreti yavaşça artırır.",
        en: "Slowly raises renown and standing with rulers.",
      },
    },
    {
      id: "sahin_saldiri",
      kisa: { tr: "Saldırı", en: "Offense" },
      aciklama: {
        tr: "Rakip ve çatışmalarda baskı gücünü artırır.",
        en: "Adds pressure against rivals and in clashes.",
      },
    },
  ],
  Karga: [
    {
      id: "karga_istihbarat",
      kisa: { tr: "İstihbarat", en: "Intel" },
      aciklama: {
        tr: "Rakip komplolarını sezdirir, tecrübe kazancını artırır.",
        en: "Senses rival plots and boosts career experience.",
      },
    },
    {
      id: "karga_karanlik",
      kisa: { tr: "Karanlık işler", en: "Shady work" },
      aciklama: {
        tr: "Gizli ve yasadışı işlerde başarı şansını artırır.",
        en: "Raises success chances in secret and illegal deeds.",
      },
    },
  ],
  At: [
    {
      id: "at_ticaret",
      kisa: { tr: "Ticaret", en: "Trade" },
      aciklama: {
        tr: "Ticaret kazançlarını ve mülk getirisini biraz artırır.",
        en: "Slightly raises trade earnings and property income.",
      },
    },
    {
      id: "at_enerji",
      kisa: { tr: "Enerji", en: "Stamina" },
      aciklama: {
        tr: "Aile etkileşimlerinin bekleme süresini kısaltır.",
        en: "Shortens the cooldown of family interactions.",
      },
    },
  ],
};

export function hayvanBonusuBul(bonusId: string): HayvanBonusTanimi | undefined {
  for (const cift of Object.values(HAYVAN_BONUSLARI)) {
    const bulunan = cift.find((b) => b.id === bonusId);
    if (bulunan) return bulunan;
  }
  return undefined;
}

const HAYVAN_ISIMLERI = [
  "Boncuk",
  "Tekir",
  "Duman",
  "Şeker",
  "Pamuk",
  "Zeytin",
  "Kömür",
  "Fındık",
  "Minnoş",
  "Bulut",
  "Toprak",
  "Yıldız",
];

export function rastgeleHayvanIsmiSec(haric: string[] = []): string {
  const adaylar = HAYVAN_ISIMLERI.filter((i) => !haric.includes(i));
  const havuz = adaylar.length > 0 ? adaylar : HAYVAN_ISIMLERI;
  return havuz[Math.floor(Math.random() * havuz.length)];
}

/** Yeni bir hayvan kaydı üretir: türün ortalama ömrü ±2 yıl, iki bonustan biri rastgele. */
export function yeniEvcilHayvanUret(tur: string, state: CharacterState): EvcilHayvan {
  const ortalama = HAYVAN_ORTALAMA_OMUR[tur] ?? 14;
  const omur = ortalama + Math.floor(Math.random() * 5) - 2;
  const cift = HAYVAN_BONUSLARI[tur];
  const bonus = cift ? cift[Math.floor(Math.random() * cift.length)] : undefined;
  return {
    tur,
    isim: rastgeleHayvanIsmiSec(state.evcil_hayvanlar.map((h) => h.isim)),
    edinim_yili: state.yil,
    edinim_yasi: state.yas,
    omur,
    bonus_id: bonus?.id ?? "",
  };
}

/** Yaşayan hayvanlardan birinde bu pasif bonus var mı? */
export function hayvanBonusVar(state: CharacterState, bonusId: HayvanBonusId): boolean {
  return (state.evcil_hayvanlar ?? []).some((h) => h.bonus_id === bonusId);
}

/** Eski tek-hayvan alanını (`evcil_hayvan`) yaşayan listenin ilk elemanına eşitler. */
export function evcilHayvanSenkronla(state: CharacterState): void {
  state.evcil_hayvan = state.evcil_hayvanlar.length > 0 ? state.evcil_hayvanlar[0] : null;
}

/** Hayvan etiketlerini (`evcil_hayvan_var`, `evcil_hayvan_tur:<Tür>`) yaşayan listeyle uyumlu tutmak için gereken etiketler. */
export function hayvanEtiketleri(tur: string): string[] {
  return [`evcil_hayvan_tur:${tur}`];
}
