import type {
  BirlikArazi,
  BirlikGanimetPayi,
  BirlikIkmal,
  BirlikKalite,
  BirlikRol,
  BirlikSeferberlik,
  BirlikTalim,
  BirlikTon,
  BirlikTur,
} from "../types";
import type { DilliMetin } from "./meslekProfilleri";

/**
 * Asker "birlik" işletmesi sayıları (2026-11). Tek kaynak: game/birlik.ts bunları okur.
 * Tüm sayılar BAŞLANGIÇ değeridir; simülasyonla (scripts/simulateIsletme.ts) kalibre edilir.
 */

// ── Ordu büyüklüğü ve limitler ──────────────────────────────────────────────
export const BASLANGIC_ER = 20;
export const ER_TAVANI = 450;
/** Asker için toplam "silahlı" havuzu (rakipler + diğer ordular + oyuncu) oyun başında bu aralıktan atanır. */
export const ASKER_PAZAR_BASLANGIC: [number, number] = [185, 205];
/** Kışla kademesi K0..K4 → kışla limiti (tek ordu limiti; rütbe limiti kalktı). */
export const KISLA_ER_LIMITI = [25, 60, 120, 240, 450];
/** Kışla kademesi K0..K4 → yıllık bakım (enflasyonlu). Büyük kışla ordu büyüdükçe pahalı bir yük getirir. */
export const KISLA_BAKIM = [4, 10, 25, 60, 120];
/** Subay limiti: rütbe tabanı + kışla bonusu (K0..K4). */
export const SUBAY_RUTBE_TABANI = [1, 2, 3, 4, 5];
export const SUBAY_KISLA_BONUSU = [0, 1, 1, 2, 2];
/** Kışla limitini aşan her er için er masrafı ve erzak bu çarpanla ödenir (savaş sürerken seferberlik erleri muaf). */
export const LIMIT_ASIM_GIDER_CARPANI = 3;
/** Pazar (toplam silahlı) rütbeye göre hedef büyüklüğü: rakipler oyuncuyla birlikte büyür (payın %90'a çıkmaması için). */
export const ASKER_PAZAR_HEDEF = [200, 330, 580, 980, 1900];
/** Her yıl pazar büyüklüğü hedefe bu oranda yaklaşır. */
export const ASKER_PAZAR_YAKINSAMA = 0.2;
/** Rakip gücünün er başına çarpanı = 1 + bu × (rütbe − 1) (rakipler de donatılır). */
export const RAKIP_GUC_RUTBE_EKI = 0.12;
/** Toplam silahlı hedefinin dönem çarpanı (ters dinamik: savaşta büyür, bollukta/vebada küçülür). */
export const ASKER_PAZAR_DONEM_CARPANI = { bolluk: 0.97, durgunluk: 1, kitlik: 1.04, savas: 1.12, veba: 0.85 };

// ── Teçhizat kalitesi ───────────────────────────────────────────────────────
export const KALITE_SIRASI: BirlikKalite[] = ["dusuk", "orta", "yuksek"];
export const KALITE_CARPANI: Record<BirlikKalite, number> = { dusuk: 1, orta: 1.25, yuksek: 1.5 };
/** Düşükten verilen kaliteye yükseltmenin er başı fiyatı (enflasyonsuz). */
export const KALITE_FIYATI: Record<BirlikKalite, number> = { dusuk: 0, orta: 0, yuksek: 0 };
/** Teçhizat bakımı: er başı yıllık (enflasyonlu), seviyeye göre. */
export const KALITE_BAKIM: Record<BirlikKalite, number> = { dusuk: 0.15, orta: 0.3, yuksek: 0.45 };
/** Teçhizat seviyesinin yıllık moral etkisi (kalite karışımının ağırlıklı ortalaması) ve talim kazancı çarpanı. */
export const KALITE_MORAL: Record<BirlikKalite, number> = { dusuk: -2, orta: 0, yuksek: 2 };
export const KALITE_TALIM_CARPANI: Record<BirlikKalite, number> = { dusuk: 0.9, orta: 1, yuksek: 1.1 };
/** Kalite değişiminden sonra yeniden değiştirmek için beklenecek yıl. */
export const KALITE_KILIT_YIL = 5;
export const KALITE_ADLARI: Record<BirlikKalite, DilliMetin> = {
  dusuk: { tr: "Hafif donanım", en: "Light kit" },
  orta: { tr: "Standart donanım", en: "Standard kit" },
  yuksek: { tr: "Ağır donanım", en: "Heavy kit" },
};
/** Sanayi Devrimi'nde en üst seviye "Seçkin" adını taşır. */
export function kaliteAdlari(cag: string): Record<BirlikKalite, DilliMetin> {
  return cag === "Sanayi Devrimi" ? { ...KALITE_ADLARI, yuksek: { tr: "Seçkin donanım", en: "Elite kit" } } : KALITE_ADLARI;
}
export function techizatAdi(cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? { tr: "tüfek ve üniforma", en: "rifles and uniforms" } : { tr: "zırh ve kılıç", en: "armour and swords" };
}

// ── Özel birlikler ──────────────────────────────────────────────────────────
export const TUR_SIRASI: BirlikTur[] = ["okcu", "suvari", "mizrakli"];
/** Açık her özel birlik türü ordunun bu kesrini oluşturur (tek seçenek; üç tür açıksa %75 özel + %25 piyade). */
export const TUR_PAYI = 0.25;
/** Rütbeye (S1..S5) göre aynı anda açık tutulabilecek özel birlik sayısı. */
export const OZEL_BIRLIK_LIMITI = [1, 1, 2, 2, 3];
/** Birlik seviyesi yükseltme/değiştirme kilidi (yıl). */
export const BIRLIK_KILIT_YIL = 5;
/** Birliği küçültme / terhis iadesi. */
export const IADE_ORANI = 0.35;

export interface TurTanimi {
  /** Saldırı / savunma çarpanı (o payın erlerine uygulanır). */
  saldiri: number;
  savunma: number;
  /** Birliğe geçen er başına tek seferlik ücret (enflasyonsuz); bakım = erzak − 1 = yıllık toplam er maliyetine (masraf + erzak) eklenen kesir (+%25–35). */
  ucret: number;
  bakim: number;
  /** Erzak tüketimi çarpanı. */
  erzak: number;
  simge: string;
  ad: { orta: DilliMetin; sanayi: DilliMetin };
  arti: DilliMetin;
  eksi: DilliMetin;
}
export const TUR_TANIMLARI: Record<BirlikTur, TurTanimi> = {
  okcu: {
    saldiri: 1.35, savunma: 1.7, ucret: 0.5, bakim: 0.3, erzak: 1.3, simge: "🏹",
    ad: { orta: { tr: "Okçu", en: "Archers" }, sanayi: { tr: "Nişancı", en: "Riflemen" } },
    arti: { tr: "Güçlü savunma, dağ ve orman, sınır olaylarında üstün", en: "Strong defence, hills and forest, excels in border clashes" },
    eksi: { tr: "Ovada ve atlı hücumuna karşı zayıf", en: "Weak on open ground and against cavalry charges" },
  },
  suvari: {
    saldiri: 2.1, savunma: 0.9, ucret: 1.3, bakim: 0.35, erzak: 1.35, simge: "🐎",
    ad: { orta: { tr: "Ağır Süvari", en: "Heavy Cavalry" }, sanayi: { tr: "Süvari", en: "Cavalry" } },
    arti: { tr: "En güçlü saldırı, ova, haydut takibi ve bozguna uğrayanı kovalama", en: "Strongest attack, open ground, bandit pursuit and running down a rout" },
    eksi: { tr: "Zayıf savunma, kale ve dağda cılız, pahalı ve erzak tüketir", en: "Weak defence, poor in forts and hills, costly and eats supplies" },
  },
  mizrakli: {
    saldiri: 1.15, savunma: 1.85, ucret: 0.4, bakim: 0.25, erzak: 1.25, simge: "🛡️",
    ad: { orta: { tr: "Kalkan-Mızrak", en: "Shield & Spear" }, sanayi: { tr: "Süngülü Piyade", en: "Bayonet Infantry" } },
    arti: { tr: "Çok güçlü savunma, atlıya karşı etkili, ucuz", en: "Very strong defence, effective against cavalry, cheap" },
    eksi: { tr: "Saldırısı düşük; akın ve baskın görevlerinde yavaş", en: "Weak attack; slow on raids" },
  },
};
export const PIYADE = { saldiri: 1, savunma: 1.1 };
export function turAdi(tur: BirlikTur, cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? TUR_TANIMLARI[tur].ad.sanayi : TUR_TANIMLARI[tur].ad.orta;
}

/** Kuşatma kolu / topçu bataryası: seviye 0..2, pay almaz. */
export const KUSATMA_SALDIRI_BONUSU = [0, 0.12, 0.25];
/** Seviye başına er sayısına göre fiyat (kümülatif, enflasyonsuz): L1 0,5 · L2 1,1 (toplam). */
export const KUSATMA_ER_FIYATI = [0, 0.5, 1.1];
export const KUSATMA_BAKIM_ORANI = 0.06;
export function kusatmaAdi(cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? { tr: "Topçu Bataryası", en: "Artillery Battery" } : { tr: "Kuşatma Kolu", en: "Siege Train" };
}

// ── Talim / tecrübe ─────────────────────────────────────────────────────────
export const TALIM_SIRASI: BirlikTalim[] = ["hafif", "orta", "agir"];
export interface TalimTanimi {
  /** Yıllık talim seviyesi değişimi ve bu politikayla ulaşılabilecek tavan. */
  delta: number;
  tavan: number;
  /** Er başına yıllık talim masrafı (enflasyonlu) ve yıllık moral değişimi. */
  masraf: number;
  moral: number;
  ad: DilliMetin;
}
export const TALIM_TANIMLARI: Record<BirlikTalim, TalimTanimi> = {
  hafif: { delta: -5, tavan: 100, masraf: 0.01, moral: -1, ad: { tr: "Hafif talim", en: "Light drill" } },
  orta: { delta: 7, tavan: 60, masraf: 0.025, moral: -2, ad: { tr: "Orta talim", en: "Regular drill" } },
  agir: { delta: 15, tavan: 100, masraf: 0.045, moral: -4, ad: { tr: "Ağır talim", en: "Hard drill" } },
};
/** Güç bonusu = seviye × katsayı (en çok +%20). */
export const TALIM_GUC_KATSAYISI = 0.002;
/** Kayıp çarpanı azalması = seviye × katsayı (en çok −%15). */
export const TALIM_KAYIP_KATSAYISI = 0.0015;
export const TALIM_SAVAS_ZAFER = 10;
export const TALIM_SAVAS_YENILGI = 5;
export const TALIM_SECKIN_GIRIS = 70;

// ── Moral ve sertlik ────────────────────────────────────────────────────────
export const MORAL_BASLANGIC = 60;
export const MORAL_YONELIM = 1;
/** Moral dipteyken yıllık geri çekilmenin üst sınırı (puan). */
export const MORAL_YONELIM_TAVAN = 5;
/** Firar ve kayıpların orduyu indirebileceği en düşük er sayısı (çekirdek kadro). */
export const MIN_CEKIRDEK_ER = 6;
export type Aralik = [number, number];
/** Savaş (4–5 yıl): 1–2. yıl olay zarı, 3. yıl tek karar savaşı, 4–5. yıl sonuca göre düşük kayıp. Yüzdeler ordunun % değeridir. */
export const SAVAS_KARAR_YILI = 3;
export interface KayipAraligi {
  olu: Aralik;
  firar: Aralik;
}
export const SAVAS_ON_YIL_OLAYLARI: { ihtimal: number; olu: Aralik; firar: Aralik }[] = [
  { ihtimal: 0.5, olu: [0, 0], firar: [0.25, 0.6] },
  { ihtimal: 0.35, olu: [0.6, 1.2], firar: [0.4, 0.9] },
  { ihtimal: 0.15, olu: [1.9, 3.1], firar: [0.6, 1.2] },
];
export const SAVAS_KARAR_KAYBI: Record<"zafer" | "yenilgi", KayipAraligi> = {
  zafer: { olu: [2, 3.5], firar: [1, 1.5] },
  yenilgi: { olu: [15, 20], firar: [5, 7] },
};
export const SAVAS_SONRA_KAYBI: Record<"zafer" | "yenilgi", KayipAraligi> = {
  zafer: { olu: [0.6, 1.4], firar: [0.5, 1.2] },
  yenilgi: { olu: [4, 6], firar: [2, 3.5] },
};
/** Savaş boyu kümülatif tavan (savaş başı toplam er üzerinden %). */
export const SAVAS_KAYIP_TAVANI: Record<"zafer" | "yenilgi", { olu: number; firar: number }> = {
  zafer: { olu: 6, firar: 4 },
  yenilgi: { olu: 27, firar: 10 },
};
/** Haydut ve sınır çatışması (tek olay). */
export const BARIS_KAYBI: Record<"zafer" | "yenilgi", KayipAraligi> = {
  zafer: { olu: [2, 3], firar: [0, 0] },
  yenilgi: { olu: [5, 6], firar: [2, 3] },
};
/** Firar ayarlayıcıları (puan, %): moral < 40 → (40 − moral) × 0,05; erzak < 0,7 → +0,5; sertlik × 0,005. */
export const FIRAR_MORAL_ESIGI = 40;
export const FIRAR_MORAL_KATSAYI = 0.05;
export const FIRAR_ERZAK_EKI = 0.5;
export const FIRAR_SERTLIK_KATSAYI = 0.005;
export const FIRAR_GENEL_CAGRI_ILK_YIL = 1.5;
/** Yaralı: ölü × oran (tam sayı); revir ve tabip düşürür; iyileşme süresi revirle kısalır; tedavi gideri yaralı başı yıllık. */
export const YARALI_ORAN: Aralik = [1.4, 1.5];
export const YARALI_ORAN_TABAN = 1;
export const YARALI_REVIR_DUSUS = 0.04;
export const YARALI_TABIP_DUSUS_TAVAN = 0.12;
export const YARALI_TABIP_KATSAYI = 0.16;
export const YARALI_IYILESME_YIL = 3;
export const YARALI_REVIR_SURE_KISALTMA = 0.5;
export const YARALI_IYILESME_MIN_YIL = 1;
export const YARALI_TEDAVI_GIDERI = 0.25;
/** Yıllık moral değişiminin (olaylar + etkenler toplamı) en fazla düşebileceği miktar. */
export const MORAL_YILLIK_TABAN = 16;
/** Moralin güce etkisi (bant üst sınırı moral < esik). */
export const MORAL_GUC_BANTLARI: { altinda: number; guc: number }[] = [
  { altinda: 30, guc: -0.2 },
  { altinda: 45, guc: -0.1 },
  { altinda: 65, guc: 0 },
  { altinda: 80, guc: 0.06 },
  { altinda: 101, guc: 0.15 },
];
export function moralGucEtkisi(moral: number): number {
  return (MORAL_GUC_BANTLARI.find((b) => moral < b.altinda) ?? MORAL_GUC_BANTLARI[MORAL_GUC_BANTLARI.length - 1]).guc;
}
/** Yıllık moral etkenleri. */
export const GANIMET_PAYI_TANIMLARI: Record<BirlikGanimetPayi, { oran: number; moral: number; ad: DilliMetin }> = {
  az: { oran: 0.2, moral: -3, ad: { tr: "Az pay", en: "Small share" } },
  dengeli: { oran: 0.4, moral: 0, ad: { tr: "Dengeli pay", en: "Fair share" } },
  comert: { oran: 0.6, moral: 3, ad: { tr: "Cömert pay", en: "Generous share" } },
};
export const GANIMET_SIRASI: BirlikGanimetPayi[] = ["az", "dengeli", "comert"];
export const TON_TANIMLARI: Record<BirlikTon, { moral: number; sertlik: number; ad: DilliMetin; aciklama: DilliMetin }> = {
  merhametli: { moral: 3, sertlik: -1.5, ad: { tr: "Merhametli komuta", en: "Merciful command" }, aciklama: { tr: "Ordu morali +3/yıl, sertlik −1,5/yıl.", en: "Army morale +3/yr, harshness −1.5/yr." } },
  dengeli: { moral: 0, sertlik: 0, ad: { tr: "Dengeli komuta", en: "Balanced command" }, aciklama: { tr: "Sertlik yalnız doğal olarak söner.", en: "Harshness only fades naturally." } },
  sert: { moral: -3, sertlik: 1.5, ad: { tr: "Sert komuta", en: "Harsh command" }, aciklama: { tr: "Ordu morali −3/yıl, sertlik +1,5/yıl; gelir ve ganimet artar.", en: "Army morale −3/yr, harshness +1.5/yr; income and loot rise." } },
};
export const TON_SIRASI: BirlikTon[] = ["merhametli", "dengeli", "sert"];

// ── Politika artı/eksi metinleri (sayılar yukarıdaki sabitlerden hesaplanır) ─────
export interface ArtiEksi {
  arti: DilliMetin[];
  eksi: DilliMetin[];
}
const sayiTr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",");
const sayiEn = (x: number) => String(Math.round(x * 1000) / 1000);
const isaretli = (x: number, f: (n: number) => string) => (x > 0 ? "+" : x < 0 ? "−" : "") + f(Math.abs(x));
const sayiMetin = (x: number, ek: { tr: string; en: string }): DilliMetin => ({ tr: `${sayiTr(x)}${ek.tr}`, en: `${sayiEn(x)}${ek.en}` });
const moralMetni = (m: number): DilliMetin => ({ tr: `Ordu morali ${isaretli(m, sayiTr)}/yıl`, en: `Army morale ${isaretli(m, sayiEn)}/yr` });

export function ganimetArtiEksi(id: BirlikGanimetPayi): ArtiEksi {
  const d = GANIMET_PAYI_TANIMLARI[id];
  const sende = Math.round((1 - d.oran) * 100);
  const erlere = Math.round(d.oran * 100);
  const arti: DilliMetin[] = [{ tr: `Ganimetin %${sende}'i sende kalır`, en: `You keep ${sende}% of the loot` }];
  const eksi: DilliMetin[] = [{ tr: `Ganimetin %${erlere}'i erlere gider`, en: `${erlere}% of the loot goes to the men` }];
  if (d.moral > 0) arti.push(moralMetni(d.moral));
  else if (d.moral < 0) eksi.push(moralMetni(d.moral));
  return { arti, eksi };
}

export function talimArtiEksi(id: BirlikTalim): ArtiEksi {
  const d = TALIM_TANIMLARI[id];
  const guc = Math.round(Math.min(20, d.tavan * TALIM_GUC_KATSAYISI * 100));
  const kayip = Math.round(Math.min(15, d.tavan * TALIM_KAYIP_KATSAYISI * 100));
  const arti: DilliMetin[] = [];
  const eksi: DilliMetin[] = [];
  if (d.delta > 0) {
    arti.push({ tr: `Talim yılda +${d.delta} artar`, en: `Drill rises +${d.delta}/yr` });
    arti.push({ tr: `En çok +%${guc} güç, −%${kayip} kayıp`, en: `Up to +${guc}% power, −${kayip}% losses` });
    if (d.tavan < 100) eksi.push({ tr: `Talim ${d.tavan}'te durur`, en: `Drill stops at ${d.tavan}` });
  } else {
    eksi.push({ tr: `Talim yılda ${d.delta} söner; güç ve kayıp avantajı erir`, en: `Drill fades ${d.delta}/yr; power and loss edge melt away` });
  }
  if (d.masraf <= 0.01) arti.push({ tr: `En ucuz: er başı ${sayiTr(d.masraf)}/yıl`, en: `Cheapest: ${sayiEn(d.masraf)} per man/yr` });
  else eksi.push({ tr: `Er başı ${sayiTr(d.masraf)}/yıl masraf`, en: `${sayiEn(d.masraf)} per man/yr upkeep` });
  if (d.moral < 0) eksi.push(moralMetni(d.moral));
  return { arti, eksi };
}

export function tonArtiEksi(id: BirlikTon): ArtiEksi {
  const d = TON_TANIMLARI[id];
  const arti: DilliMetin[] = [];
  const eksi: DilliMetin[] = [];
  if (d.moral > 0) arti.push(moralMetni(d.moral));
  if (d.moral < 0) eksi.push(moralMetni(d.moral));
  if (d.sertlik < 0) arti.push({ tr: `Sertlik −${sayiTr(-d.sertlik)}/yıl: firar ve otorite cezası düşer`, en: `Harshness −${sayiEn(-d.sertlik)}/yr: less desertion and authority loss` });
  if (d.sertlik > 0) {
    arti.push({ tr: `Sertlik 50'de gelir ve ganimet +%${sayiTr(50 * SERTLIK_GELIR_KATSAYISI * 100)}`, en: `At harshness 50, income and loot +${sayiEn(50 * SERTLIK_GELIR_KATSAYISI * 100)}%` });
    eksi.push({ tr: `Sertlik +${sayiTr(d.sertlik)}/yıl: firar ve otorite cezası artar`, en: `Harshness +${sayiEn(d.sertlik)}/yr: more desertion and authority loss` });
  }
  if (id === "dengeli") {
    arti.push({ tr: "Ek bedel yok; sertlik doğal söner", en: "No extra cost; harshness fades naturally" });
    eksi.push({ tr: "Moral ya da gelir bonusu yok", en: "No morale or income bonus" });
  }
  if (id === "merhametli") eksi.push({ tr: "Sertlik gelir bonusu kaybolur", en: "Harshness income bonus fades" });
  return { arti, eksi };
}
export const SERTLIK_DOGAL_SONUM = 0.3;
/** Sertlik başına gelir/ganimet bonusu (sertlik 50 → +%7,5) ve firar/otorite etkisi. */
export const SERTLIK_GELIR_KATSAYISI = 0.0015;
export const SERTLIK_OTORITE_KATSAYISI = 0.006;
export const ASIRI_ESIK = 40;
export const ASIRI_COOLDOWN_YIL = 3;
/** Yıllık moral etkenleri: dönem, savaş yorgunluğu, kayıp, revir. */
export const MORAL_SAVAS_YILLIK = -1.5;
export const MORAL_BARIS_YILLIK = 1.5;
export const MORAL_KITLIK_YILLIK = -1.5;
export const MORAL_BOLLUK_YILLIK = 1.5;
export const MORAL_YUKSEK_KAYIP_ESIGI = 0.1;
export const MORAL_YUKSEK_KAYIP = -4;
export const REVIR_MORAL_KADEME = 0.75;
/** Bir kerelik moral etkileri. */
export const MORAL_ZAFER = 9;
export const MORAL_KANAT_BOZGUN = -9;
export const MORAL_YENILGI = -15;
export const MORAL_IDAM = -3;
export const MORAL_SERBEST = 3;

// ── Gelir ve gider ──────────────────────────────────────────────────────────
/** Rütbe S1..S5 → yıllık sold (devlet öder, sabit, enflasyonla büyür). */
export const SOLD = [6, 6, 6, 6, 6];
/** Asker başı yıllık ödeme (maaş kalemine sabit kısımla toplanır). Savaşta devletin zammı: ×SAVAS_ER_BASI_CARPANI (oyuncuya gelir). */
export const ER_BASI_GELIR = 0.2;
export const SAVAS_ER_BASI_CARPANI = 2;
export const ER_MASRAFI = 0.25;
export const ERZAK_BIRIMI = 0.15;
/**
 * Barış çatışması (haydut / sınır, takvimli): ganimet havuzu = toplam askerî güç × bu birim × tür çarpanı × sonuç çarpanı.
 * Büyük ve iyi donanımlı ordu aynı çatışmadan çok daha fazla kazanır (sim ile kalibre edilecek).
 */
export const GANIMET_GUC_BIRIMI = 1.5;
/** Asker'in yıllık kariyer puanı = min(tavan, güç / düşman referansı) × katsayı (pazar payı yerine askerî güçten). */
export const ASKER_KARIYER_PUANI_KATSAYISI = 1.1;
export const ASKER_KARIYER_GUC_TAVANI = 2.5;
/** Çatışma sonrası bekleme (yıl; savaşta sayaç durur, savaştan sonra en az 1 yıl) ve ilk çatışmanın işletmenin kaçıncı yılından sonra geleceği. */
export const BARIS_BEKLEME = 2;
/** Bekleme bittikten sonra her yıl çatışma çıkma şansı. */
export const BARIS_YILLIK_IHTIMAL = 0.5;
export const BARIS_CATISMA_ILK_YIL = 2;
export interface BarisCatismaTanimi {
  /** Ganimet çarpanı (sınır hedefi daha büyük). */
  ganimet: number;
  /** Düşman gücü / DUSMAN_REFERANS_GUC (rütbe) aralığı. */
  dusman: [number, number];
  /** Zaferde beklenen esir / güç. */
  esir: number;
  ad: { orta: { tr: string; en: string }; sanayi: { tr: string; en: string } };
}
export const BARIS_CATISMALARI: Record<"haydut" | "sinir", BarisCatismaTanimi> = {
  haydut: {
    ganimet: 1,
    dusman: [0.5, 0.9],
    esir: 0.012,
    ad: { orta: { tr: "Firari Haydut Çetesi", en: "Deserter Bandits" }, sanayi: { tr: "Firari Eşkıya Çetesi", en: "Deserter Brigands" } },
  },
  sinir: {
    ganimet: 1.3,
    dusman: [0.6, 1.05],
    esir: 0.008,
    ad: { orta: { tr: "Düşman Akıncıları", en: "Enemy Raiders" }, sanayi: { tr: "Sınır Çatışması", en: "Border Clash" } },
  },
};
export const BARIS_YENILGI_GANIMET = 0.2;
export const BARIS_TALIM_ZAFER = 5;
export const BARIS_TALIM_YENILGI = 2;
export const BARIS_MORAL_ZAFER = 4;
export const BARIS_MORAL_YENILGI = -4;
/** Yıllık erzak fiyatı dönem çarpanı (giderler üzerinden). */
export const ERZAK_DONEM_CARPANI = { bolluk: 0.8, durgunluk: 1, kitlik: 1.3, savas: 1.2, veba: 1.1 };
/** Nakit bu eşiğin (× enflasyon, eksi) altına inince maaş ve erzak ödenemez. */
export const ODENMEYEN_ESIK = 50;
export interface OdenmeyenCeza {
  kademe: number;
  maasGuc: number;
  erzakGuc: number;
  moral: number;
}
/** Nakit eşiği altındaki her ek ODENMEYEN_ESIK için bir kademe. */
export function odenmeyenCeza(para: number, enflasyon: number): OdenmeyenCeza | null {
  const esik = ODENMEYEN_ESIK * enflasyon;
  if (para >= -esik) return null;
  const kademe = Math.floor((-para - esik) / esik) + 1;
  return {
    kademe,
    maasGuc: -Math.min(0.3, 0.15 + 0.05 * (kademe - 1)),
    erzakGuc: -Math.min(0.4, 0.22 + 0.06 * (kademe - 1)),
    moral: -Math.min(10, 6 + (kademe - 1)),
  };
}

// ── Görevler (yalnız minimum er şartı) ──────────────────────────────────────
export type GorevTuru = "devriye" | "eskort" | "haydut" | "tahsilat" | "akin" | "garnizon" | "muhafiz" | "komuta";
export interface GorevTanimi {
  id: string;
  tur: GorevTuru;
  simge: string;
  ad: { orta: DilliMetin; sanayi: DilliMetin };
  aciklama: DilliMetin;
  /** Göreve düşen (eşit bölünmüş) askeri güç bu değerin altındaysa görev açılamaz. */
  minGuc: number;
  /** Göreve düşen er başına yıllık NET kazanç (enflasyonsuz; masraf yok). */
  erBasi: number;
  /** Yıllık şöhret kazancı (yalnız çok yüksek görevler). */
  sohret?: number;
  /** Yalnız savaşta açılabilir. */
  yalnizSavas: boolean;
  /** Er başına brüt ganimet (savaş yılında savaş çarpanıyla büyür; 0 = ganimetsiz). */
  ganimet: number;
  /** Yıllık er kaybı oranı (göreve düşen erlerin kesri): barışta ve savaşta. */
  kayipBaris: number;
  kayipSavas: number;
  /** Sertlik değişimi (yıllık) bu görev açıkken. */
  sertlik: number;
  /** Savaşta gelir çarpanı. */
  savasCarpani: number;
  /** Senaryo etiketi (birlik türü bonusu için). */
  senaryo: "haydut" | "sinir" | "savas" | null;
}
export const GOREVLER: GorevTanimi[] = [
  {
    id: "devriye", tur: "devriye", simge: "🏮", minGuc: 10, erBasi: 1.10, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0, kayipSavas: 0.01, sertlik: 0, savasCarpani: 1.1, senaryo: null,
    ad: { orta: { tr: "Nöbet ve Devriye", en: "Watch & Patrol" }, sanayi: { tr: "Asayiş ve Devriye", en: "Policing & Patrol" } },
    aciklama: { tr: "Sakin ve güvenli; küçük ama düzenli gelir.", en: "Calm and safe; small but steady income." },
  },
  {
    id: "eskort", tur: "eskort", simge: "🐫", minGuc: 25, erBasi: 1.20, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.002, kayipSavas: 0.01, sertlik: 0, savasCarpani: 0.7, senaryo: null,
    ad: { orta: { tr: "Kervan Eskortu", en: "Caravan Escort" }, sanayi: { tr: "Demiryolu ve Kervan Koruması", en: "Railway & Convoy Guard" } },
    aciklama: { tr: "Bollukta artar, savaşta düşer, kıtlıkta haydut yüzünden çok iş çıkar.", en: "Rises in boom, falls in war, plentiful in famine because of bandits." },
  },
  {
    id: "haydut", tur: "haydut", simge: "🗡️", minGuc: 45, erBasi: 1.30, yalnizSavas: false, ganimet: 0.1,
    kayipBaris: 0.01, kayipSavas: 0.02, sertlik: 0, savasCarpani: 1, senaryo: "haydut",
    ad: { orta: { tr: "Haydut Avı", en: "Bandit Hunt" }, sanayi: { tr: "Eşkıya Avı", en: "Outlaw Hunt" } },
    aciklama: { tr: "Küçük ganimet ve esir; süvari ve okçu işe yarar.", en: "Small loot and prisoners; cavalry and archers help." },
  },
  {
    id: "tahsilat", tur: "tahsilat", simge: "💰", minGuc: 70, erBasi: 1.40, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.005, kayipSavas: 0.01, sertlik: 1.2, savasCarpani: 1, senaryo: null,
    ad: { orta: { tr: "Haraç ve Vergi Tahsilatı", en: "Tribute & Tax Collection" }, sanayi: { tr: "Jandarma ve Vergi Tahsilatı", en: "Gendarmerie & Tax Collection" } },
    aciklama: { tr: "Yüksek gelir; sertliği ve halk tepkisini yükseltir.", en: "High income; raises harshness and public anger." },
  },
  {
    id: "akin", tur: "akin", simge: "🔥", minGuc: 100, erBasi: 1.50, yalnizSavas: false, ganimet: 0.15,
    kayipBaris: 0.02, kayipSavas: 0.08, sertlik: 0.6, savasCarpani: 2, senaryo: "savas",
    ad: { orta: { tr: "Akın ve Baskın", en: "Raid & Foray" }, sanayi: { tr: "İsyan Bastırma", en: "Suppressing Revolt" } },
    aciklama: { tr: "Barışta zayıf; savaşta geliri ikiye katlar, ganimet getirir ama kayıp yüksektir.", en: "Weak in peace; doubles income in war and brings loot, but losses are heavy." },
  },
  {
    id: "garnizon", tur: "garnizon", simge: "🏰", minGuc: 140, erBasi: 1.60, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.002, kayipSavas: 0.02, sertlik: 0, savasCarpani: 1.2, senaryo: "sinir",
    ad: { orta: { tr: "Sınır ve Kale Garnizonu", en: "Border & Castle Garrison" }, sanayi: { tr: "Sınır ve Liman Garnizonu", en: "Border & Harbour Garrison" } },
    aciklama: { tr: "Düşük kayıp, istikrarlı gelir; sınır olaylarında okçu ve mızraklı güçlenir.", en: "Low losses, steady income; archers and spearmen shine in border clashes." },
  },
  {
    id: "muhafiz", tur: "muhafiz", simge: "👑", minGuc: 185, erBasi: 1.70, sohret: 0.5, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0, kayipSavas: 0.005, sertlik: -0.3, savasCarpani: 1, senaryo: null,
    ad: { orta: { tr: "Saray ve Kale Muhafızlığı", en: "Court & Castle Guard" }, sanayi: { tr: "Liman ve Kale Komutanlığı", en: "Harbour & Fort Command" } },
    aciklama: { tr: "Düşük kayıp, iyi ödeme; şöhret getirir.", en: "Low losses, good pay; brings renown." },
  },
  {
    id: "komuta", tur: "komuta", simge: "🏯", minGuc: 230, erBasi: 1.80, sohret: 1.0, yalnizSavas: false, ganimet: 0.05,
    kayipBaris: 0.005, kayipSavas: 0.03, sertlik: 0, savasCarpani: 1.15, senaryo: "sinir",
    ad: { orta: { tr: "Eyalet ve Kale Komutanlığı", en: "Province & Castle Command" }, sanayi: { tr: "Eyalet Garnizon Komutanlığı", en: "Provincial Command" } },
    aciklama: { tr: "Büyük ordu ister; yüksek ve düzenli kazanç, şöhret getirir.", en: "Needs a big army; high, steady earnings and renown." },
  },
];
export function gorevGetir(id: string): GorevTanimi | undefined {
  return GOREVLER.find((g) => g.id === id);
}
export function gorevAdi(g: GorevTanimi, cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? g.ad.sanayi : g.ad.orta;
}
/** Rütbe S1..S5 → aynı anda açık görev sayısı. */
export const GOREV_SLOTLARI = [1, 1, 2, 2, 3];
/** Görev × dönem gelir çarpanı (anahtar yoksa 1). */
type DonemAnahtari = "bolluk" | "durgunluk" | "kitlik" | "veba";
export const GOREV_DONEM_CARPANI: Partial<Record<GorevTuru, Partial<Record<DonemAnahtari, number>>>> = {
  // Her görevin üç dönem ortalaması 1,00'dır; görevin `erBasi`'si doğrudan 3 dönem ortalamasıdır. Tepe ≤ 2,5 (en üst görevlerde salınım dar).
  devriye: { bolluk: 1.1, durgunluk: 0.9, kitlik: 1 },
  eskort: { bolluk: 1.364, durgunluk: 0.636, kitlik: 1 },
  haydut: { bolluk: 0.636, durgunluk: 0.909, kitlik: 1.455 },
  tahsilat: { bolluk: 1.3, durgunluk: 1, kitlik: 0.7 },
  akin: { bolluk: 0.7, durgunluk: 1.05, kitlik: 1.25 },
  garnizon: { bolluk: 0.9, durgunluk: 1.1, kitlik: 1 },
  muhafiz: { bolluk: 1.15, durgunluk: 0.95, kitlik: 0.9 },
  komuta: { bolluk: 1.1, durgunluk: 0.95, kitlik: 0.95 },
};
export const VEBA_GOREV_CARPANI = 0.55;

// ── Savaş ───────────────────────────────────────────────────────────────────
export const ARAZI_SIRASI: BirlikArazi[] = ["ova", "dag", "orman"];
export const ARAZI_ADLARI: Record<BirlikArazi, { orta: DilliMetin; sanayi: DilliMetin; simge: string }> = {
  ova: { orta: { tr: "Açık ova", en: "Open plain" }, sanayi: { tr: "Açık arazi", en: "Open ground" }, simge: "🌾" },
  dag: { orta: { tr: "Dağ geçidi", en: "Mountain pass" }, sanayi: { tr: "Dağ geçidi / boğaz", en: "Mountain pass / strait" }, simge: "⛰️" },
  orman: { orta: { tr: "Sık orman", en: "Dense forest" }, sanayi: { tr: "Sık orman / çalılık", en: "Dense forest / thicket" }, simge: "🌲" },
};
/**
 * Arazi × birlik çarpanı (her birliğin kendi satırı; hem oyuncuya hem düşmanın baskın birliğine uygulanır).
 * Ova: süvari alanı · Dağ geçidi: dar cephe, okçu üstün, süvari felç · Sık orman: yakın dövüş, piyade üstün, atlı ve atış kısıtlı.
 * Satır ortalaması ≈ 1 (ova 1,06 · dağ 1,01 · orman 0,94) → hiçbir arazi herkese birden avantaj vermez. "karma" = dört satırın ortalaması.
 */
export type AraziBirimi = "piyade" | "mizrakli" | "okcu" | "suvari";
export const ARAZI_CARPANLARI: Record<BirlikArazi, Record<AraziBirimi, number>> = {
  ova: { piyade: 1, mizrakli: 1.05, okcu: 0.95, suvari: 1.25 },
  dag: { piyade: 1.05, mizrakli: 1.1, okcu: 1.2, suvari: 0.7 },
  orman: { piyade: 1.2, mizrakli: 0.95, okcu: 0.9, suvari: 0.7 },
};
/** Düşmanın baskın türüne göre arazi çarpanı ("karma" = ortalama). */
export function dusmanAraziCarpani(arazi: BirlikArazi, tur: BirlikTur | "karma"): number {
  const a = ARAZI_CARPANLARI[arazi];
  if (tur === "karma") return (a.piyade + a.mizrakli + a.okcu + a.suvari) / 4;
  return a[tur];
}
/** Düşmanın saldırı/savunma dağılımı (baskın türe göre; ikisinin ortalaması 1 → toplam güç değişmez). */
export function dusmanSaldiriSavunma(tur: BirlikTur | "karma"): { saldiri: number; savunma: number } {
  if (tur === "karma") return { saldiri: 1, savunma: 1 };
  const t = TUR_TANIMLARI[tur];
  const top = t.saldiri + t.savunma;
  return { saldiri: (2 * t.saldiri) / top, savunma: (2 * t.savunma) / top };
}
/** Rütbe S1..S5 → seçtiğin arazinin gerçekleşme ihtimali. */
export const ARAZI_TERCIH_IHTIMALI = [0, 0.15, 0.3, 0.55, 0.8];
/** Bölgeye göre arazi ağırlıkları (sıra: ova, dağ geçidi, sık orman = ARAZI_SIRASI). */
export const BOLGE_ARAZI_AGIRLIGI: Record<string, [number, number, number]> = {
  Fransa: [0.45, 0.25, 0.3],
  "Kutsal Roma": [0.25, 0.3, 0.45],
  Bizans: [0.3, 0.55, 0.15],
  Selçuklu: [0.5, 0.45, 0.05],
  Eyyubiler: [0.65, 0.3, 0.05],
  İngiltere: [0.4, 0.2, 0.4],
  Osmanlı: [0.3, 0.45, 0.25],
  Rusya: [0.45, 0.15, 0.4],
};
export const ARAZI_DEGISIM_ORANI = 0.4;
/** İnisiyatif zarı: oyuncu seçer / zorunlu saldırı / zorunlu savunma. */
export const INISIYATIF_OYUNCU_SECER = 0.4;
export const INISIYATIF_ZORUNLU_SALDIRI = 0.3;
/** Büyük savaşta düşman gücü sapması: referans × [0,95; 1,05] (savaş başında bir kez çekilir; oyuncuya ±%5 aralık olarak gösterilir). */
export const DUSMAN_ORAN: [number, number] = [0.95, 1.05];
/** Karar savaşı zarı: her taraf güç × (1 ± %8) (d20: (zar − 10,5) / 118,75). */
export const SAVAS_ZAR_BOLEN = 118.75;
/**
 * Düşmanın MUTLAK gücü (bizim gücümüzden bağımsız). Referans karakterin YAŞINA göre büyür ("zamanla tehlike artar"):
 * rütbeye bağlamak, rütbenin kendisi güçten çıktığı için yatırımın etkisini siler. Büyük savaşta × DUSMAN_ORAN,
 * barış çatışmasında BARIS_CATISMALARI.dusman aralığı çarpılır. Kalibrasyonun tek düğmesi: [yaş, referans güç] (aralarda doğrusal).
 */
export const DUSMAN_REFERANS_YAS: [number, number][] = [
  [15, 28],
  [25, 40],
  [35, 80],
  [45, 130],
  [55, 200],
  [65, 290],
  [80, 420],
];
export function dusmanReferansGucuYas(yas: number): number {
  const t = DUSMAN_REFERANS_YAS;
  if (yas <= t[0][0]) return t[0][1];
  for (let i = 1; i < t.length; i++) {
    if (yas <= t[i][0]) {
      const [y0, g0] = t[i - 1];
      const [y1, g1] = t[i];
      return g0 + ((g1 - g0) * (yas - y0)) / (y1 - y0);
    }
  }
  return t[t.length - 1][1];
}
/** d20 zarın güce katkısı: güç × (zar − 10,5)/40 (±%24). */
export const ZAR_BOLEN = 40;
/** Düşman baskın türüne karşı doğru birliğin (payı %15'i doldurunca) güç bonusu. */
export const KARSI_TUR_BONUSU = 0.1;
export const KARSI_TUR: Record<BirlikTur, BirlikTur> = { suvari: "mizrakli", okcu: "suvari", mizrakli: "okcu" };

export const ROL_TANIMLARI: Record<BirlikRol, { ganimet: number; kayip: number; zar: number; moral: number; ad: DilliMetin; aciklama: DilliMetin }> = {
  onc: {
    ganimet: 1.3, kayip: 1.4, zar: 0.05, moral: 0,
    ad: { tr: "Öncü", en: "Vanguard" },
    aciklama: { tr: "Ganimet ×1,3, kayıp ×1,4, zara +1.", en: "Loot ×1.3, losses ×1.4, +1 to the roll." },
  },
  ana: {
    ganimet: 1, kayip: 1, zar: 0, moral: 0,
    ad: { tr: "Ana kuvvet", en: "Main body" },
    aciklama: { tr: "Dengeli.", en: "Balanced." },
  },
  yedek: {
    ganimet: 0.6, kayip: 0.6, zar: -0.04, moral: 0,
    ad: { tr: "Yedek", en: "Reserve" },
    aciklama: { tr: "Ganimet ×0,6, kayıp ×0,6, zar −1.", en: "Loot ×0.6, losses ×0.6, −1 to the roll." },
  },
};
export const ROL_SIRASI: BirlikRol[] = ["onc", "ana", "yedek"];

export const IKMAL_TANIMLARI: Record<BirlikIkmal, { erzakOran: number; maliyet: number; sertlik: number; ganimet: number; ad: DilliMetin; aciklama: DilliMetin }> = {
  yeterli: {
    erzakOran: 0, maliyet: 1.15, sertlik: 0, ganimet: 1,
    ad: { tr: "Tam ikmal", en: "Full supply" },
    aciklama: { tr: "Erzak yeterli; masraf +%15.", en: "Supplies suffice; cost +15%." },
  },
  kit: {
    erzakOran: -0.3, maliyet: 0.85, sertlik: 0, ganimet: 1,
    ad: { tr: "Kıt ikmal", en: "Short supply" },
    aciklama: { tr: "Erzak %30 eksik kalır; masraf −%15, firar ve güç kaybı.", en: "Supplies run 30% short; cost −15%, desertion and weaker force." },
  },
  yagma: {
    erzakOran: 0, maliyet: 0.9, sertlik: 1.5, ganimet: 1,
    ad: { tr: "Yağma ile geçin", en: "Live off the land" },
    aciklama: { tr: "Erzak köylerden gelir; her yıl para, esir ve gönüllü kazanırsın. Halk ezilir: sertlik ve ahlak düşer.", en: "Supplies come from the villages; you gain coin, prisoners and recruits each year. The people suffer: harshness up, morality down." },
  },
};
export const IKMAL_SIRASI: BirlikIkmal[] = ["yeterli", "kit", "yagma"];

export const SEFERBERLIK_TANIMLARI: Record<
  BirlikSeferberlik,
  { er: number; moral: number; erzak: number; firar: number; kalite: BirlikKalite; talim: number; ad: DilliMetin; aciklama: DilliMetin }
> = {
  genel: {
    er: 0.5, moral: -15, erzak: 0.2, firar: 1.5, kalite: "dusuk", talim: 0,
    ad: { tr: "Genel çağrı", en: "General levy" },
    aciklama: { tr: "+%50 er, düşük teçhizat ve eğitimsiz; ordu morali −15, savaş boyunca erzak +%20, ilk yıl firar yüksek.", en: "+50% men, basic kit and untrained; army morale −15, supplies +20% for the war, high first-year desertion." },
  },
  secme: {
    er: 0.12, moral: 5, erzak: 0, firar: 1, kalite: "yuksek", talim: TALIM_SECKIN_GIRIS,
    ad: { tr: "Seçkin birlik", en: "Picked troops" },
    aciklama: { tr: "+%12 er, yüksek teçhizat ve eğitimli; ordu morali +5.", en: "+12% men, superior kit and trained; army morale +5." },
  },
  dengeli: {
    er: 0.28, moral: -5, erzak: 0.08, firar: 1, kalite: "orta", talim: 0,
    ad: { tr: "Dengeli çağrı", en: "Balanced levy" },
    aciklama: { tr: "+%28 er, orta teçhizat; ordu morali −5, erzak +%8.", en: "+28% men, standard kit; army morale −5, supplies +8%." },
  },
};
export const SEFERBERLIK_SIRASI: BirlikSeferberlik[] = ["genel", "dengeli", "secme"];
/** Savaş sonunda seferberlik erlerinden (sağlam + yaralı) hayatta kalanların kadroda kalan oranı. */
export const SEFERBERLIK_KALMA_ZAFER: Aralik = [0.35, 0.45];
export const SEFERBERLIK_KALMA_YENILGI: Aralik = [0.2, 0.25];
/** Savaşta devşirme çarpanı. */
export const SAVAS_DEVSIRME_CARPANI = 2;

// ── Ganimet / esir ──────────────────────────────────────────────────────────
/** Esirin orduya katılan oranı (düşük kalite, eğitimsiz). */
export const ESIR_KATILIM_ORANI = 0.25;
/** Esir satış fiyatı (enflasyonlu, esir başına) ve serbest bırakma fidyesi olasılığı/tutarı. */
export const ESIR_SATIS_FIYATI = 0.9;
export const ESIR_FIDYE_IHTIMALI = 0.3;
export const ESIR_FIDYE = 0.5;
export const ESIR_SERBEST_SOHRET = 0.4;
export const ESIR_IDAM_SERTLIK = 1.5;
export const ESIR_IDAM_AHLAK = -0.6;
export const ESIR_SATIS_AHLAK = -0.3;
export const ESIR_SERBEST_AHLAK = 0.5;
/** Esir yetkisi (idam/serbest/sat kararı) bu rütbeden itibaren oyuncuda. */
export const ESIR_YETKI_RUTBE = 3;

// ── Doktrin (rütbe başına bir zorunlu seçim) ───────────────────────────────
export interface DoktrinEtkisi {
  guc?: number;
  saldiri?: number;
  savunma?: number;
  gelir?: number;
  ganimet?: number;
  /** Kayıp çarpanı değişimi (−0,1 = %10 az kayıp). */
  kayip?: number;
  /** Er masrafı ve erzak çarpanı değişimi. */
  masraf?: number;
  moral?: number;
  sertlik?: number;
  ahlak?: number;
  sold?: number;
  otorite?: number;
  devsirme?: number;
  firar?: number;
}
export type DoktrinKaynagi = "evrensel" | "sadik" | "kahraman" | "sert";
export interface DoktrinTanimi {
  id: string;
  seviye: number;
  kaynak: DoktrinKaynagi;
  simge: string;
  ad: DilliMetin;
  etki: DoktrinEtkisi;
  /** ⚡ acımasız kol (yalnız sert yollarda çıkar). */
  acimasiz: boolean;
}
/** Doktrin kartlarının faydalı bonusları (artı güç/gelir/moral…, eksi kayıp/masraf/firar) bu kadar büyütülür; bedeller (artı kayıp/masraf, eksi moral/ahlak/otorite) aynı kalır. */
const DOKTRIN_BONUS_CARPANI = 1.4;
const FAYDALI_YON: Record<string, 1 | -1> = {
  guc: 1, saldiri: 1, savunma: 1, gelir: 1, ganimet: 1, sold: 1, moral: 1, otorite: 1, devsirme: 1, kayip: -1, masraf: -1, firar: -1,
};
function doktrinBonusuBuyut(etki: DoktrinEtkisi): DoktrinEtkisi {
  const o: DoktrinEtkisi = {};
  for (const k of Object.keys(etki) as (keyof DoktrinEtkisi)[]) {
    const v = etki[k] as number;
    const yon = FAYDALI_YON[k];
    o[k] = yon && v * yon > 0 ? Math.round(v * DOKTRIN_BONUS_CARPANI * 1000) / 1000 : v;
  }
  return o;
}
const dk = (id: string, seviye: number, kaynak: DoktrinKaynagi, simge: string, tr: string, en: string, etki: DoktrinEtkisi): DoktrinTanimi => ({
  id, seviye, kaynak, simge, ad: { tr, en }, etki: doktrinBonusuBuyut(etki), acimasiz: kaynak === "sert",
});
export const DOKTRINLER: DoktrinTanimi[] = [
  // S1
  dk("d1_on_saf", 1, "evrensel", "🗡️", "Ön Saf Cesareti", "Front-Rank Courage", { saldiri: 0.04, ganimet: 0.05, kayip: 0.1 }),
  dk("d1_safi_koru", 1, "evrensel", "🛡️", "Safı Koru", "Hold the Line", { savunma: 0.05, kayip: -0.12 }),
  dk("d1_sadik", 1, "sadik", "🎗️", "Yemin ve Sancak", "Oath & Banner", { moral: 1.2, sold: 0.04 }),
  dk("d1_kahraman", 1, "kahraman", "🌟", "Örnek Olmak", "Lead by Example", { guc: 0.04, moral: 0.8 }),
  dk("d1_sert", 1, "sert", "⚡", "Yağma Hakkı", "Right of Plunder", { ganimet: 0.25, sertlik: 1, moral: -1, ahlak: -0.4 }),
  // S2
  dk("d2_kalkan", 2, "evrensel", "🛡️", "Kalkan Duvarı", "Shield Wall", { savunma: 0.07, kayip: -0.1 }),
  dk("d2_baskin", 2, "evrensel", "🐎", "Hızlı Baskın", "Swift Raid", { saldiri: 0.06, gelir: 0.05 }),
  dk("d2_sadik", 2, "sadik", "📜", "Komuta Zinciri", "Chain of Command", { otorite: 0.3, masraf: -0.05 }),
  dk("d2_kahraman", 2, "kahraman", "🏅", "Madalya Geleneği", "Tradition of Honour", { moral: 1.2, devsirme: 1 }),
  dk("d2_sert", 2, "sert", "⚡", "Köyü Yak", "Burn the Village", { gelir: 0.1, ganimet: 0.2, sertlik: 1.2, ahlak: -0.5 }),
  // S3
  dk("d3_suvari", 3, "evrensel", "🐎", "Süvari Çekirdeği", "Cavalry Core", { saldiri: 0.08, masraf: 0.05 }),
  dk("d3_talim", 3, "evrensel", "🎯", "Talim Kültürü", "Drill Culture", { guc: 0.04, kayip: -0.08, masraf: 0.04 }),
  dk("d3_sadik", 3, "sadik", "🤝", "Birlik Ruhu", "Esprit de Corps", { moral: 1.5, firar: -0.01 }),
  dk("d3_kahraman", 3, "kahraman", "🔥", "Gazi Anıları", "Veterans' Tales", { guc: 0.05, devsirme: 1 }),
  dk("d3_sert", 3, "sert", "⚡", "Esir Pazarı", "Slave Market", { ganimet: 0.3, sertlik: 1.5, ahlak: -0.7 }),
  // S4
  dk("d4_sefer", 4, "evrensel", "🧭", "Sefer Düzeni", "Campaign Order", { guc: 0.05, gelir: 0.06 }),
  dk("d4_levazim", 4, "evrensel", "📦", "Levazım Disiplini", "Logistics Discipline", { masraf: -0.12, firar: -0.01 }),
  dk("d4_sadik", 4, "sadik", "🏛️", "Divana Sadakat", "Loyalty to the Court", { otorite: 0.4, sold: 0.06 }),
  dk("d4_kahraman", 4, "kahraman", "🦅", "Kartal Gözü", "Eagle Eye", { saldiri: 0.07, savunma: 0.05 }),
  dk("d4_sert", 4, "sert", "⚡", "Kan Bedeli", "Blood Price", { saldiri: 0.12, ganimet: 0.35, kayip: 0.2, sertlik: 2, firar: 0.02 }),
  // S5
  dk("d5_kale", 5, "evrensel", "🏰", "Kale Ustası", "Master of Fortresses", { savunma: 0.08, gelir: 0.06 }),
  dk("d5_sancak", 5, "evrensel", "🚩", "Sancak Sadakati", "Loyalty to the Standard", { moral: 2, firar: -0.015 }),
  dk("d5_sadik", 5, "sadik", "👑", "Tacın Kalkanı", "Shield of the Crown", { otorite: 0.5, sold: 0.08 }),
  dk("d5_kahraman", 5, "kahraman", "🏆", "Efsane Komutan", "Legendary Commander", { guc: 0.08, moral: 1.5 }),
  dk("d5_sert", 5, "sert", "⚡", "Demir Yumruk", "Iron Fist", { guc: 0.1, gelir: 0.12, sertlik: 2.5, otorite: -0.3, ahlak: -0.8 }),
];
export function doktrinGetir(id: string): DoktrinTanimi | undefined {
  return DOKTRINLER.find((d) => d.id === id);
}
/** Yol dalı → doktrin kaynağı (yola özgü seçenek). */
export function yolDoktrinKaynagi(yol: string | null): DoktrinKaynagi {
  switch (yol) {
    case "kahraman":
    case "reformcu":
      return "kahraman";
    case "isyanci":
    case "zalim":
    case "hain":
    case "firari":
      return "sert";
    default:
      return "sadik";
  }
}
/** Seviye için 3 seçenek: 2 evrensel + yola özgü (sert yollarda ⚡ acımasız). */
export function doktrinSecenekleri(seviye: number, yol: string | null): DoktrinTanimi[] {
  const evrensel = DOKTRINLER.filter((d) => d.seviye === seviye && d.kaynak === "evrensel");
  const k = yolDoktrinKaynagi(yol);
  const ozel = DOKTRINLER.find((d) => d.seviye === seviye && d.kaynak === k);
  return ozel ? [...evrensel, ozel] : evrensel;
}
export function doktrinToplami(idler: string[]): Required<DoktrinEtkisi> {
  const t: Required<DoktrinEtkisi> = {
    guc: 0, saldiri: 0, savunma: 0, gelir: 0, ganimet: 0, kayip: 0, masraf: 0, moral: 0, sertlik: 0, ahlak: 0, sold: 0, otorite: 0, devsirme: 0, firar: 0,
  };
  for (const id of idler) {
    const d = doktrinGetir(id);
    if (!d) continue;
    for (const k of Object.keys(t) as (keyof DoktrinEtkisi)[]) t[k] += d.etki[k] ?? 0;
  }
  return t;
}

// ── Yol dalı kalıcı etkisi ──────────────────────────────────────────────────
export const YOL_ETKILERI: Record<string, DoktrinEtkisi> = {
  sadik: { sold: 0.05, otorite: 0.2 },
  kahraman: { guc: 0.04, moral: 0.8 },
  reformcu: { guc: 0.03, masraf: -0.04 },
  isyanci: { ganimet: 0.15, sertlik: 0.6, otorite: -0.2 },
  zalim: { ganimet: 0.2, sertlik: 1, otorite: -0.3 },
  firari: { moral: -1, sold: -0.05, firar: 0.01 },
  hain: { moral: -0.8, otorite: -0.4, ganimet: 0.05 },
};

// ── Subaylar ────────────────────────────────────────────────────────────────
/** Harp subayı bonusunun (ekipBonuslari().ana) güce yansıyan kesri, tavanı. */
export const HARP_GUC_KATSAYISI = 0.25;
export const HARP_GUC_TAVAN = 0.4;
/** Tabip koruması (korumaHesapla) kayıp/firar çarpanını en çok bu kadar düşürür. */
export const TABIP_KAYIP_AZALTMA = 0.4;
export const TABIP_KAYIP_TAVAN = 0.3;

// ── Yatırımlar ──────────────────────────────────────────────────────────────
/** Revir kademesi başına kayıp ve firar çarpanı azalması. */
export const REVIR_KAYIP_KADEME = 0.06;
/** Devşirme bürosu kademesi başına yıllık er (K0..K4). */
export const DEVSIRME_BUROSU_ER = [0, 1, 3, 4, 5];
export const KARAKOL_KORUMA = [0, 0.15, 0.3, 0.45, 0.6];

// ── Rakip komutan saldırıları ───────────────────────────────────────────────
export type AskerSaldiri = "baskin" | "er_ayartma" | "sabotaj" | "entrika" | "firar";
export const ASKER_SALDIRI_AGIRLIKLARI: Record<1 | 2 | 3, Partial<Record<AskerSaldiri, number>>> = {
  1: { baskin: 40, er_ayartma: 60 },
  2: { baskin: 25, er_ayartma: 35, entrika: 25, firar: 15 },
  3: { baskin: 15, er_ayartma: 25, sabotaj: 20, entrika: 25, firar: 15 },
};
export const ASKER_FIZIKSEL: AskerSaldiri[] = ["baskin", "sabotaj"];
/** Hasarlar [k1,k2,k3]: nakit = önceki yıl gelirinin %'si; er = ordunun %'si; sohret/otorite = puan. */
export const ASKER_SALDIRI_HASARLARI = {
  baskin: { nakit: [5, 9, 13] },
  er_ayartma: { er: [4, 7, 11] },
  sabotaj: { nakit: [6, 6, 6], techizat: [0, 0, 10] },
  entrika: { sohret: [3, 6, 9], otorite: [4, 8, 12] },
  firar: { er: [3, 5, 8] },
} as const;

// ── Savaş ekonomisi (2026-11): görev geliri yok; savaş ödeneği, yağma, büyük zafer ganimeti ──
/** Savaş sürerken görevlerden gelir yok; sabit maaş aynen sürer, asker başı kısım ×SAVAS_ER_BASI_CARPANI. */
/** Yağma ikmali (yıllık): ganimet = güç × GANIMET_GUC_BIRIMI × bu; erzak masrafı bu çarpanla; esir/yeni er oranları. */
export const YAGMA_GANIMET = 0.1;
export const YAGMA_ERZAK_CARPANI = 0.6;
export const YAGMA_ESIR = 0.004;
export const YAGMA_ER_ORANI = 0.03;
export const YAGMA_AHLAK = -1.5;
/** Savaş zaferi (savaş sonu, genel zafer): ganimet = güç × GANIMET_GUC_BIRIMI × bu × savaşın yıl sayısı; esir = güç × bu × yıl. */
export const SAVAS_ZAFER_GANIMET = 8; // savaş zaferi ganimeti çok yüksek (güç × birim × 8 × savaşın yıl sayısı)
export const SAVAS_ZAFER_ESIR = 0.015;
/** Kiralık ordu: ordunun bu kesri kadar, savaş süresince; eğitimli ve pahalı. */
export const KIRALIK_ORAN = 0.4;
export const KIRALIK_PESIN = 3.2;
export const KIRALIK_YILLIK = 1.6;
export const KIRALIK_KALITE_CARPANI = 1.7; // yüksek kalite (1,5) × eğitimli (+%14)
/** Kale: bu askerî güç eşiğinin üstünde ve savaş genel zaferle biterse ele geçirilir. */
export const KALE_GUC_ESIGI = 200;
export const KALE_MAKS = 2;
/** Kale başı yıllık net gelir (fetihte aralıktan çekilir) ve yıllık şöhret. */
export const KALE_GELIR: Aralik = [12, 14];
export const KALE_SOHRET = 0.5;
export const KALE_KOMUTA_BONUSU = 15;
/** Haçlı/sefer yolculuğu: ordunun bu kesri seferde, kalanı görevlerine devam eder. */
export const SEFER_ORDU_ORANI = 0.5;
export const SEFER_DONUS_TALIM = 10;
export const SEFER_DONUS_MORAL = 5;

/** Komutan emirleri: savaş başında seçilir, savaş boyu sabit; içerik iki rütbede bir değişir (S1-2, S3-4, S5). */
export interface EmirTanimi {
  id: string;
  seviye: 1 | 2 | 3;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  guc: number;
  kayip: number;
  ganimet: number;
  moral: number;
}
export const EMIRLER: EmirTanimi[] = [
  { id: "duzenli_hat", seviye: 1, simge: "🛡️", ad: { tr: "Düzenli Hat", en: "Steady Line" }, aciklama: { tr: "Safları sıkı tut: kayıp azalır.", en: "Hold the line tight: fewer losses." }, guc: 0.03, kayip: -0.1, ganimet: 0, moral: 0 },
  { id: "hizli_baskin", seviye: 1, simge: "🐎", ad: { tr: "Hızlı Baskın", en: "Swift Raid" }, aciklama: { tr: "Hızlı vur, çekil: ganimet artar, kayıp artar.", en: "Strike and withdraw: more loot, more losses." }, guc: 0.04, kayip: 0.1, ganimet: 0.15, moral: 0 },
  { id: "siki_disiplin", seviye: 1, simge: "📯", ad: { tr: "Sıkı Disiplin", en: "Iron Discipline" }, aciklama: { tr: "Ordu dik durur, moral yükselir.", en: "The men stand firm; morale rises." }, guc: 0.02, kayip: -0.05, ganimet: 0, moral: 2 },
  { id: "yan_kusatma", seviye: 2, simge: "🌀", ad: { tr: "Yan Kuşatma", en: "Flank Sweep" }, aciklama: { tr: "Düşmanı yandan sar: güçlü ama riskli.", en: "Envelop the enemy: strong but risky." }, guc: 0.07, kayip: 0.05, ganimet: 0, moral: 0 },
  { id: "kalkan_duvari", seviye: 2, simge: "🧱", ad: { tr: "Kalkan Duvarı", en: "Shield Wall" }, aciklama: { tr: "Kayıplar belirgin azalır.", en: "Losses drop markedly." }, guc: 0.04, kayip: -0.2, ganimet: 0, moral: 0 },
  { id: "yagma_fermani", seviye: 2, simge: "📜", ad: { tr: "Yağma Fermanı", en: "Plunder Decree" }, aciklama: { tr: "Ganimet artar, asker huysuzlanır.", en: "More loot, restless men." }, guc: 0.03, kayip: 0, ganimet: 0.3, moral: -2 },
  { id: "kesin_darbe", seviye: 3, simge: "⚡", ad: { tr: "Kesin Darbe", en: "Decisive Blow" }, aciklama: { tr: "Her şeyi tek hamleye yatır.", en: "Stake everything on one stroke." }, guc: 0.12, kayip: 0.15, ganimet: 0, moral: 0 },
  { id: "demir_cember", seviye: 3, simge: "⛓️", ad: { tr: "Demir Çember", en: "Iron Ring" }, aciklama: { tr: "Sağlam savunma, az kayıp, yüksek moral.", en: "Firm defence, few losses, high morale." }, guc: 0.08, kayip: -0.25, ganimet: 0, moral: 2 },
  { id: "zafer_ganimeti", seviye: 3, simge: "👑", ad: { tr: "Zafer Ganimeti", en: "Spoils of Victory" }, aciklama: { tr: "Zaferin ganimeti büyür.", en: "Victory spoils swell." }, guc: 0.05, kayip: 0, ganimet: 0.4, moral: 0 },
];
export const emirSeviyesi = (rutbeIndeks: number): 1 | 2 | 3 => (rutbeIndeks <= 1 ? 1 : rutbeIndeks <= 3 ? 2 : 3);
export const emirGetir = (id: string | null | undefined): EmirTanimi | undefined => EMIRLER.find((e) => e.id === id);

/** Madalyalar (unvan olarak verilir; skora ek puan). */
export const MADALYALAR = {
  zafer: { tr: "Zafer Madalyası", en: "Medal of Victory" },
  yarali: { tr: "Yaralı Gazi", en: "Wounded Veteran" },
  kale: { tr: "Kale Fatihi", en: "Conqueror of Castles" },
  haydut: { tr: "Haydut Kıran", en: "Bandit Breaker" },
} as const;
export const MADALYA_ADLARI: string[] = Object.values(MADALYALAR).map((m) => m.tr);
export const MADALYA_SOHRET = 3;
export const MADALYA_MORAL = 3;

/** Maaşın çağ ve ülkeye göre adı ("sold" yazılmaz). */
export const MAAS_ADLARI: Record<string, DilliMetin> = {
  "Orta Çağ|Fransa": { tr: "Soldée", en: "Soldée" },
  "Orta Çağ|Kutsal Roma": { tr: "Löhnung", en: "Löhnung" },
  "Orta Çağ|Bizans": { tr: "Roga", en: "Roga" },
  "Orta Çağ|Selçuklu": { tr: "Ulûfe", en: "Ulufe" },
  "Orta Çağ|Eyyubiler": { tr: "Ulûfe", en: "Ulufe" },
  "Sanayi Devrimi|İngiltere": { tr: "Kraliyet Maaşı", en: "Army Pay" },
  "Sanayi Devrimi|Fransa": { tr: "Prêt", en: "Prêt" },
  "Sanayi Devrimi|Osmanlı": { tr: "Mevacib", en: "Mevacib" },
  "Sanayi Devrimi|Rusya": { tr: "Jalovanye", en: "Zhalovanye" },
};
export const maasAdi = (cag: string, bolge: string): DilliMetin => MAAS_ADLARI[`${cag}|${bolge}`] ?? { tr: "Maaş", en: "Pay" };
