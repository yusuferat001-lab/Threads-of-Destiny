import type { Dil } from "./ayarlar";

/**
 * Sunucudaki server/src/data/bolgeOzellikleri.ts ile ELLE senkronize edilen bir
 * kopya — yalnızca oyuncuya bayrak kartında gösterilen kısa özet metnini taşır
 * (gerçek stat/yatkınlık sayıları sunucuda kalır, burada tekrarlanmaz).
 */
const BOLGE_OZET: Record<string, { tr: string; en: string }> = {
  "Orta Çağ|Fransa": {
    tr: "🌾 Ticaret ve sosyal yaşam güçlü · ⚔️ sınır çatışmaları can yorar",
    en: "🌾 Strong trade & social life · ⚔️ border skirmishes wear on health",
  },
  "Orta Çağ|Kutsal Roma": {
    tr: "🔨 Zanaat dengeli · 👑 parçalı beylikler otoriteyi zorlar",
    en: "🔨 Balanced craftsmanship · 👑 fractured princedoms strain authority",
  },
  "Orta Çağ|Bizans": {
    tr: "💰 Zengin başlangıç, tanınırsın · 🏙️ kalabalık şehir sağlığı yorar",
    en: "💰 Wealthy start, well known · 🏙️ the crowded city wears on health",
  },
  "Orta Çağ|Selçuklu": {
    tr: "🕌 Din ve savaş yatkınlığı güçlü · 🛒 ticaret biraz geride",
    en: "🕌 Strong faith & war aptitude · 🛒 trade lags behind",
  },
  "Sanayi Devrimi|İngiltere": {
    tr: "🏭 Sanayi kazancı yüksek · 😔 fabrika dumanı moral kırar",
    en: "🏭 High industrial earnings · 😔 factory smoke breaks morale",
  },
  "Sanayi Devrimi|Fransa": {
    tr: "🗣️ Sosyal/siyasi güç · 💸 devrim sonrası bütçe zayıf başlar",
    en: "🗣️ Social & political clout · 💸 post-revolution budget starts weak",
  },
  "Sanayi Devrimi|Osmanlı": {
    tr: "🕌 Din/ahlak temeli güçlü · 🏭 sanayi geride, ticaret zor",
    en: "🕌 Strong faith & morals · 🏭 industry lags, trade is harder",
  },
  "Sanayi Devrimi|Rusya": {
    tr: "🛡️ Asker ve dayanıklılık güçlü · 🌍 itibarın dışarıda zayıf başlar",
    en: "🛡️ Strong soldiering & endurance · 🌍 your standing abroad starts weak",
  },
};

export function bolgeOzetiGetir(dil: Dil, cag: string, bolge: string): string | null {
  const kayit = BOLGE_OZET[`${cag}|${bolge}`];
  if (!kayit) return null;
  return dil === "en" ? kayit.en : kayit.tr;
}
