export type MeslekKategorisi = "savas" | "ticaret" | "din" | "zanaat";

export interface KisilikTanimi {
  ad: string;
  /** Bu özellikle aynı karakterde asla bulunmaması gereken özellikler. */
  celisenler: string[];
  /**
   * Bu özelliğin kategorilere verdiği somut yatkınlık etkisi (oyuncuya gösterilir).
   * 2026-09 sonu (§41, kullanıcı isteği: "siyaset falan olmasın, mesleklere
   * bağlı olsun"): ARTIK yalnızca 4 meslek kategorisi kullanılır — eski
   * siyaset/sosyal/sağlık etkileri tamamen kaldırıldı (aileler.ts/
   * bolgeOzellikleri.ts'teki aynı düzenlemeyle tutarlı, §40).
   */
  etkiler: Partial<Record<MeslekKategorisi, number>>;
  /**
   * v10: her yıl uygulanan ÇOK KÜÇÜK stat sürüklenmesi (kişilik doğuşta atanır, hayat boyu kalıcıdır).
   * Eski kalıcı maaş çarpanlarının yerini aldı; iki özelliğin toplamı stat başına yılda en çok ±0.4.
   */
  yillikEtki?: { ahlak?: number; sohret?: number; mutluluk?: number };
  /** mulkGetiriOraniHesapla'nın sonucuna eklenen kalıcı oransal bonus/malus (ör. +0.02 = +%2 puan). */
  gayrimenkulBonusu?: number;
  /** Doğuşta yonetim_iliski ve/veya patron_iliski'ye eklenen tek seferlik puan. */
  iliskiBonusu?: { hat: "yonetici" | "patron" | "ikisi"; deger: number };
}

/**
 * 2026-09 sonu (§41): kişilik özellikleri artık YALNIZ mesleğe bağlı 4
 * kategoriyi (savas/ticaret/din/zanaat) etkiler — eski siyaset/sosyal/sağlık
 * etkileri (aileler.ts/bolgeOzellikleri.ts'teki §40 düzenlemesiyle aynı
 * disiplin) kaldırıldı. Ayrıca "çeşit artışı" için 9 özellik artık yatkınlığın
 * dışında ekstra bir bonus/malus taşıyor: maaş çarpanı, gayrimenkul (mülk
 * getirisi) bonusu ya da üstlerle (yönetici/patron) ilişki bonusu — geri
 * kalan 9 özellik saf yatkınlık kalıyor. Zaten olumsuz karakterli özellikler
 * (Umutsuz, Sivri Dilli, Obur) yeni bonuslarında da olumsuz — "bedelsiz bonus
 * yok" felsefesiyle tutarlı. `FEVRILIK_ETKI`/`MERHAMET_ETKI` (stateManager.ts)
 * TAMAMEN AYRI bir mekanizma, bu düzenlemeden etkilenmedi.
 */
export const KISILIKLER: KisilikTanimi[] = [
  { ad: "Sinirli", celisenler: ["Sakin"], etkiler: { savas: 8, zanaat: -4 }, yillikEtki: { ahlak: -0.1, mutluluk: -0.1 } },
  {
    ad: "Sakin",
    celisenler: ["Sinirli"],
    etkiler: { din: 5, savas: -5 },
    gayrimenkulBonusu: 0.02, yillikEtki: { mutluluk: 0.15 },
  },
  { ad: "Kibirli", celisenler: ["Vicdanlı"], etkiler: { ticaret: 6, din: -6 }, yillikEtki: { sohret: 0.1, ahlak: -0.15 } },
  { ad: "Alaycı", celisenler: ["Yumuşak Başlı"], etkiler: { ticaret: 4, din: -8 }, yillikEtki: { ahlak: -0.1 } },
  { ad: "Umutlu", celisenler: ["Umutsuz", "Depresif", "Hüzünlü"], etkiler: { din: 6, zanaat: 4 }, yillikEtki: { mutluluk: 0.2 } },
  {
    ad: "Umutsuz",
    celisenler: ["Umutlu", "Hırslı"],
    etkiler: { ticaret: -4, zanaat: -6 }, yillikEtki: { mutluluk: -0.2 },
  },
  { ad: "Depresif", celisenler: ["Umutlu", "Hırslı"], etkiler: { savas: -4, zanaat: -8 }, yillikEtki: { mutluluk: -0.25 } },
  // Cesur bilinçli olarak KISILIK_YATKINLIK_LIMIT (8)'in üstünde bırakıldı —
  // limit kırpmasının gerçekten çalıştığını kanıtlayan tek örnek (test).
  { ad: "Cesur", celisenler: [], etkiler: { savas: 10, ticaret: 4 }, yillikEtki: { sohret: 0.1 } },
  { ad: "Hüzünlü", celisenler: ["Umutlu"], etkiler: { din: 6, ticaret: -6 }, yillikEtki: { mutluluk: -0.15 } },
  {
    ad: "Sosyal",
    celisenler: ["İçedönük"],
    etkiler: { ticaret: 8, zanaat: -4 },
    iliskiBonusu: { hat: "patron", deger: 5 }, yillikEtki: { sohret: 0.15, mutluluk: 0.1 },
  },
  { ad: "İçedönük", celisenler: ["Sosyal"], etkiler: { zanaat: 8, ticaret: -6 }, yillikEtki: { sohret: -0.1 } },
  {
    ad: "Sivri Dilli",
    celisenler: ["Yumuşak Başlı"],
    etkiler: { ticaret: 6, din: -6 },
    iliskiBonusu: { hat: "patron", deger: -5 }, yillikEtki: { sohret: -0.1, ahlak: -0.1 },
  },
  {
    ad: "Yumuşak Başlı",
    celisenler: ["Sivri Dilli", "Alaycı"],
    etkiler: { din: 8, savas: -8 },
    iliskiBonusu: { hat: "ikisi", deger: 6 }, yillikEtki: { ahlak: 0.1, mutluluk: 0.1 },
  },
  {
    ad: "Rekabetçi",
    celisenler: [],
    etkiler: { ticaret: 6, savas: 6 }, yillikEtki: { sohret: 0.1 },
  },
  {
    ad: "Hırslı",
    celisenler: ["Umutsuz", "Depresif"],
    etkiler: { ticaret: 8, din: -4 }, yillikEtki: { sohret: 0.15, mutluluk: -0.1 },
  },
  {
    ad: "Vicdanlı",
    celisenler: ["Kibirli"],
    etkiler: { din: 8, ticaret: -6 },
    gayrimenkulBonusu: 0.02, yillikEtki: { ahlak: 0.2 },
  },
  // Faz 7 (2026-09 sonu, kullanıcı isteği: "kişilikleri daha komik/belirgin
  // yap"): var olan 16 özellik ciddi/dramatik eksenlere (öfke/umut/kibir vb.)
  // yoğunlaşmıştı — komedi/flavor tarafında hiçbiri yoktu. İki yeni, mekanik
  // olarak da belirgin (farklı kategorilerde etki) komik özellik eklendi.
  { ad: "Palavracı", celisenler: ["Vicdanlı"], etkiler: { ticaret: 6, zanaat: -4 }, yillikEtki: { sohret: 0.1, ahlak: -0.1 } },
  {
    ad: "Obur",
    celisenler: [],
    etkiler: { savas: -6, ticaret: 4, zanaat: -4 },
    gayrimenkulBonusu: -0.02, yillikEtki: { mutluluk: 0.1 },
  },
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Birbiriyle çelişmeyen, rastgele ve uyumlu iki kişilik özelliği döndürür. */
export function rastgeleKisilikCifti(): [string, string] {
  const ilk = pickRandom(KISILIKLER);
  const uygunlar = KISILIKLER.filter(
    (k) => k.ad !== ilk.ad && !ilk.celisenler.includes(k.ad) && !k.celisenler.includes(ilk.ad)
  );
  const ikinci = pickRandom(uygunlar);
  return [ilk.ad, ikinci.ad];
}

export function kisilikGetir(ad: string): KisilikTanimi | undefined {
  return KISILIKLER.find((k) => k.ad === ad);
}
