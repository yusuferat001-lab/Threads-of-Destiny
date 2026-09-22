import { Cag, Kategori } from "../types";

/**
 * Çağ+bölge kombinasyonu başına küçük, dar bantlı (aileler.ts/yerlesimler.ts ile
 * aynı ölçekte, ~±15) başlangıç bonus/malus paketi. Her bölgenin hem bir artısı
 * hem bir eksisi olacak şekilde tasarlandı — hiçbiri net "en iyi seçim" değil.
 * `createCharacter`'da aile+yerleşim bonuslarının yanına ÜÇÜNCÜ bir katman
 * olarak eklenir; `yatkinlikHesapla`'ya da aynı desende bir kaynak olarak girer.
 */
export interface BolgeOzellikleri {
  para?: number;
  saglik?: number;
  un?: number;
  ahlak?: number;
  mutluluk?: number;
  yatkinlikEtkisi?: Partial<Record<Kategori, number>>;
  /** Oyuncuya bayrak kartında gösterilen kısa özet (bölge seçim ekranı). */
  ozet: { tr: string; en: string };
}

const BOLGE_OZELLIKLERI: Record<string, BolgeOzellikleri> = {
  "Orta Çağ|Fransa": {
    para: 6,
    saglik: -6,
    mutluluk: 4,
    yatkinlikEtkisi: { ticaret: 8, sosyal: 6, savas: -6 },
    ozet: {
      tr: "🌾 Ticaret ve sosyal yaşam güçlü · ⚔️ sınır çatışmaları can yorar",
      en: "🌾 Strong trade & social life · ⚔️ border skirmishes wear on health",
    },
  },
  "Orta Çağ|Kutsal Roma": {
    saglik: 4,
    ahlak: -6,
    yatkinlikEtkisi: { ticaret: 6, siyaset: -8 },
    ozet: {
      tr: "🛒 Ticaret canlı, beden dinç · 👑 parçalı beylikler otoriteyi ve vicdanı zorlar",
      en: "🛒 Lively trade, robust health · 👑 fractured princedoms strain authority and conscience",
    },
  },
  "Orta Çağ|Bizans": {
    para: 14,
    saglik: -10,
    un: 10,
    ahlak: -4,
    mutluluk: -2,
    yatkinlikEtkisi: { ticaret: 6, sosyal: 6 },
    ozet: {
      tr: "💰 Zengin başlangıç, tanınırsın · 🏙️ kalabalık şehir sağlığı yorar",
      en: "💰 Wealthy start, well known · 🏙️ the crowded city wears on health",
    },
  },
  "Orta Çağ|Selçuklu": {
    para: -4,
    ahlak: 8,
    yatkinlikEtkisi: { din: 12, savas: 8, ticaret: -8 },
    ozet: {
      tr: "🕌 Din ve savaş yatkınlığı güçlü · 🛒 ticaret biraz geride",
      en: "🕌 Strong faith & war aptitude · 🛒 trade lags behind",
    },
  },
  "Sanayi Devrimi|İngiltere": {
    para: 10,
    saglik: -4,
    un: 4,
    mutluluk: -8,
    yatkinlikEtkisi: { ticaret: 10, siyaset: 4 },
    ozet: {
      tr: "🏭 Sanayi kazancı yüksek · 😔 fabrika dumanı moral kırar",
      en: "🏭 High industrial earnings · 😔 factory smoke breaks morale",
    },
  },
  "Sanayi Devrimi|Fransa": {
    para: -8,
    un: 6,
    mutluluk: 2,
    yatkinlikEtkisi: { siyaset: 10, sosyal: 6 },
    ozet: {
      tr: "🗣️ Sosyal/siyasi güç · 💸 devrim sonrası bütçe zayıf başlar",
      en: "🗣️ Social & political clout · 💸 post-revolution budget starts weak",
    },
  },
  "Sanayi Devrimi|Osmanlı": {
    para: -6,
    ahlak: 10,
    mutluluk: 4,
    yatkinlikEtkisi: { din: 10, ticaret: -8 },
    ozet: {
      tr: "🕌 Din/ahlak temeli güçlü · 🏭 sanayi geride, ticaret zor",
      en: "🕌 Strong faith & morals · 🏭 industry lags, trade is harder",
    },
  },
  "Sanayi Devrimi|Rusya": {
    saglik: 8,
    un: -10,
    mutluluk: -4,
    yatkinlikEtkisi: { savas: 10 },
    ozet: {
      tr: "🛡️ Asker ve dayanıklılık güçlü · 🌍 itibarın dışarıda zayıf başlar",
      en: "🛡️ Strong soldiering & endurance · 🌍 your standing abroad starts weak",
    },
  },
};

export function bolgeOzellikleriGetir(cag: Cag, bolge: string): BolgeOzellikleri | null {
  return BOLGE_OZELLIKLERI[`${cag}|${bolge}`] ?? null;
}
