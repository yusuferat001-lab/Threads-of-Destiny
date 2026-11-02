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
export const ER_TAVANI = 300;
/** Asker için toplam "silahlı" havuzu (rakipler + diğer ordular + oyuncu) oyun başında bu aralıktan atanır. */
export const ASKER_PAZAR_BASLANGIC: [number, number] = [185, 205];
/** Rütbe S1..S5 → rütbe limiti (en çok er). Etkin limit = min(rütbe, kışla). */
export const RUTBE_ER_LIMITI = [30, 65, 120, 200, 300];
/** Kışla kademesi K0..K4 → kışla limiti. */
export const KISLA_ER_LIMITI = [25, 55, 100, 190, 300];
export const KISLA_BAKIM = [4, 8, 12, 19, 30];
/** Subay limiti: rütbe tabanı + kışla bonusu (K0..K4). */
export const SUBAY_RUTBE_TABANI = [1, 2, 3, 4, 5];
export const SUBAY_KISLA_BONUSU = [0, 1, 1, 2, 2];
/** Seferberlik sırasında geçici limit çarpanı. */
export const SEFERBERLIK_LIMIT_CARPANI = 1.5;
/** Pazar (toplam silahlı) rütbeye göre hedef büyüklüğü: rakipler oyuncuyla birlikte büyür (payın %90'a çıkmaması için). */
export const ASKER_PAZAR_HEDEF = [200, 330, 560, 900, 1400];
/** Her yıl pazar büyüklüğü hedefe bu oranda yaklaşır. */
export const ASKER_PAZAR_YAKINSAMA = 0.2;
/** Rakip gücünün er başına çarpanı = 1 + bu × (rütbe − 1) (rakipler de donatılır). */
export const RAKIP_GUC_RUTBE_EKI = 0.12;
/** Asker'e özel toplam silahlı yıllık değişimi (ters dinamik: savaşta büyür). Kesir, yıllık. */
export const ASKER_PAZAR_BUYUME = { bolluk: -0.005, durgunluk: 0, kitlik: 0.01, savas: 0.03, veba: -0.04 };
/** Toplam silahlı hedefinin dönem çarpanı (ters dinamik: savaşta büyür, bollukta/vebada küçülür). */
export const ASKER_PAZAR_DONEM_CARPANI = { bolluk: 0.97, durgunluk: 1, kitlik: 1.04, savas: 1.12, veba: 0.85 };

// ── Teçhizat kalitesi ───────────────────────────────────────────────────────
export const KALITE_SIRASI: BirlikKalite[] = ["dusuk", "orta", "yuksek"];
export const KALITE_CARPANI: Record<BirlikKalite, number> = { dusuk: 1, orta: 1.5, yuksek: 2 };
/** Düşükten verilen kaliteye yükseltmenin er başı fiyatı (enflasyonsuz). */
export const KALITE_FIYATI: Record<BirlikKalite, number> = { dusuk: 0, orta: 0.7, yuksek: 1.6 };
/** Yıllık bakım: kalite fiyatının bu kesri (düşük kalite bakımsız). */
export const KALITE_BAKIM_ORANI = 0.03;
/** Kalite değişiminden sonra yeniden değiştirmek için beklenecek yıl. */
export const KALITE_KILIT_YIL = 5;
export const KALITE_ADLARI: Record<BirlikKalite, DilliMetin> = {
  dusuk: { tr: "Düşük", en: "Basic" },
  orta: { tr: "Orta", en: "Standard" },
  yuksek: { tr: "Yüksek", en: "Superior" },
};
export function techizatAdi(cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? { tr: "tüfek ve üniforma", en: "rifles and uniforms" } : { tr: "zırh ve kılıç", en: "armour and swords" };
}

// ── Özel birlikler ──────────────────────────────────────────────────────────
export const TUR_SIRASI: BirlikTur[] = ["okcu", "suvari", "mizrakli"];
/** Birlik seviyesi 0..3 → toplam pay (seçili türlere eşit bölünür); seçili tür sayısı = seviye. */
export const BIRLIK_SEVIYE_PAYI = [0, 0.15, 0.2, 0.25];
/** Birlik seviyesi yükseltme/değiştirme kilidi (yıl). */
export const BIRLIK_KILIT_YIL = 5;
/** Birliği küçültme / terhis iadesi. */
export const IADE_ORANI = 0.35;

export interface TurTanimi {
  /** Saldırı / savunma çarpanı (o payın erlerine uygulanır). */
  saldiri: number;
  savunma: number;
  /** Birliğe geçen er başına tek seferlik ücret (enflasyonsuz) ve yıllık bakım artışı (er masrafının kesri). */
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
    saldiri: 1.3, savunma: 1.6, ucret: 0.5, bakim: 0.1, erzak: 1, simge: "🏹",
    ad: { orta: { tr: "Okçu", en: "Archers" }, sanayi: { tr: "Nişancı", en: "Riflemen" } },
    arti: { tr: "Güçlü savunma, dağ ve orman, sınır olaylarında üstün", en: "Strong defence, hills and forest, excels in border clashes" },
    eksi: { tr: "Ovada ve atlı hücumuna karşı zayıf", en: "Weak on open ground and against cavalry charges" },
  },
  suvari: {
    saldiri: 1.9, savunma: 0.8, ucret: 1.3, bakim: 0.25, erzak: 1.25, simge: "🐎",
    ad: { orta: { tr: "Ağır Süvari", en: "Heavy Cavalry" }, sanayi: { tr: "Süvari", en: "Cavalry" } },
    arti: { tr: "En güçlü saldırı, ova, haydut takibi ve bozguna uğrayanı kovalama", en: "Strongest attack, open ground, bandit pursuit and running down a rout" },
    eksi: { tr: "Zayıf savunma, kale ve dağda cılız, pahalı ve erzak tüketir", en: "Weak defence, poor in forts and hills, costly and eats supplies" },
  },
  mizrakli: {
    saldiri: 1.1, savunma: 1.75, ucret: 0.4, bakim: 0.08, erzak: 1, simge: "🛡️",
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
export const MORAL_YONELIM_TAVAN = 4;
/** Firar ve kayıpların orduyu indirebileceği en düşük er sayısı (çekirdek kadro). */
export const MIN_CEKIRDEK_ER = 3;
/** Yıllık moral değişiminin (olaylar + etkenler toplamı) en fazla düşebileceği miktar. */
export const MORAL_YILLIK_TABAN = 22;
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
/** Firar: moral bu eşiğin altına inince yıllık oran (eşik − moral) × katsayı. */
export const FIRAR_MORAL_ESIGI = 40;
export const FIRAR_MORAL_KATSAYI = 0.003;
export const FIRAR_ERZAK_EKI = 0.04;
export const FIRAR_ZAYIF_ORAN_EKI = 0.03;
/** Yıllık moral etkenleri. */
export const GANIMET_PAYI_TANIMLARI: Record<BirlikGanimetPayi, { oran: number; moral: number; ad: DilliMetin }> = {
  az: { oran: 0.1, moral: -3, ad: { tr: "Az pay", en: "Small share" } },
  dengeli: { oran: 0.25, moral: 0, ad: { tr: "Dengeli pay", en: "Fair share" } },
  comert: { oran: 0.4, moral: 3, ad: { tr: "Cömert pay", en: "Generous share" } },
};
export const GANIMET_SIRASI: BirlikGanimetPayi[] = ["az", "dengeli", "comert"];
export const TON_TANIMLARI: Record<BirlikTon, { moral: number; sertlik: number; ad: DilliMetin; aciklama: DilliMetin }> = {
  merhametli: { moral: 3, sertlik: -1.5, ad: { tr: "Merhametli komuta", en: "Merciful command" }, aciklama: { tr: "Moral +3/yıl, sertlik −1,5/yıl.", en: "Morale +3/yr, harshness −1.5/yr." } },
  dengeli: { moral: 0, sertlik: 0, ad: { tr: "Dengeli komuta", en: "Balanced command" }, aciklama: { tr: "Sertlik yalnız doğal olarak söner.", en: "Harshness only fades naturally." } },
  sert: { moral: -3, sertlik: 1.5, ad: { tr: "Sert komuta", en: "Harsh command" }, aciklama: { tr: "Moral −3/yıl, sertlik +1,5/yıl; gelir ve ganimet artar.", en: "Morale −3/yr, harshness +1.5/yr; income and loot rise." } },
};
export const TON_SIRASI: BirlikTon[] = ["merhametli", "dengeli", "sert"];
export const SERTLIK_DOGAL_SONUM = 0.3;
/** Sertlik başına gelir/ganimet bonusu (sertlik 50 → +%7,5) ve firar/otorite etkisi. */
export const SERTLIK_GELIR_KATSAYISI = 0.0015;
export const SERTLIK_OTORITE_KATSAYISI = 0.006;
export const SERTLIK_FIRAR_KATSAYISI = 0.0002;
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
export const MORAL_TERFI = 8;
export const MORAL_IDAM = -3;
export const MORAL_SERBEST = 3;

// ── Gelir ve gider ──────────────────────────────────────────────────────────
/** Rütbe S1..S5 → yıllık sold (devlet öder, sabit, enflasyonla büyür). */
export const SOLD = [14, 20, 28, 40, 56];
export const ER_BASI_GELIR = 0.023;
export const ER_MASRAFI = 0.12;
export const ERZAK_BIRIMI = 0.08;
/**
 * Barış çatışması (haydut / sınır, takvimli): ganimet havuzu = toplam askerî güç × bu birim × tür çarpanı × sonuç çarpanı.
 * Büyük ve iyi donanımlı ordu aynı çatışmadan çok daha fazla kazanır (sim ile kalibre edilecek).
 */
export const GANIMET_GUC_BIRIMI = 0.45;
/** İki çatışma arası yıl [min, max] ve ilk çatışmanın işletmenin kaçıncı yılından sonra geleceği. */
export const BARIS_CATISMA_ARALIK: [number, number] = [3, 5];
export const BARIS_CATISMA_ILK_YIL = 2;
export interface BarisCatismaTanimi {
  /** Ganimet çarpanı (sınır hedefi daha büyük). */
  ganimet: number;
  /** Düşman gücü / oyuncu gücü aralığı. */
  dusman: [number, number];
  /** Zaferde beklenen esir / güç. */
  esir: number;
  ad: { orta: { tr: string; en: string }; sanayi: { tr: string; en: string } };
}
export const BARIS_CATISMALARI: Record<"haydut" | "sinir", BarisCatismaTanimi> = {
  haydut: {
    ganimet: 1,
    dusman: [0.7, 1.1],
    esir: 0.012,
    ad: { orta: { tr: "Haydut Çetesi", en: "Bandit Gang" }, sanayi: { tr: "Eşkıya Çetesi", en: "Brigand Band" } },
  },
  sinir: {
    ganimet: 1.3,
    dusman: [0.8, 1.2],
    esir: 0.008,
    ad: { orta: { tr: "Sınır Akını", en: "Border Raid" }, sanayi: { tr: "Sınır Çatışması", en: "Border Clash" } },
  },
};
export const BARIS_YENILGI_GANIMET = 0.2;
export const BARIS_KAYIP_ZAFER = 0.01;
export const BARIS_KAYIP_YENILGI = 0.04;
export const BARIS_TALIM_ZAFER = 5;
export const BARIS_TALIM_YENILGI = 2;
export const BARIS_MORAL_ZAFER = 4;
export const BARIS_MORAL_YENILGI = -4;
/** Devlet, ganimetten (para ve esir) sabit bu payı alır. */
export const DEVLET_PAYI = 0.2;
/** Yıllık erzak fiyatı dönem çarpanı (giderler üzerinden). */
export const ERZAK_DONEM_CARPANI = { bolluk: 0.9, durgunluk: 1, kitlik: 1.5, savas: 1.2, veba: 1 };
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
export type GorevTuru = "devriye" | "eskort" | "haydut" | "tahsilat" | "akin" | "garnizon" | "sefer" | "muhafiz" | "komuta" | "baskomutan";
export interface GorevTanimi {
  id: string;
  tur: GorevTuru;
  simge: string;
  ad: { orta: DilliMetin; sanayi: DilliMetin };
  aciklama: DilliMetin;
  /** Göreve düşen (eşit bölünmüş) er sayısı bu değerin altındaysa görev açılamaz. */
  minEr: number;
  /** Göreve düşen er başına yıllık ödeme (enflasyonsuz) ve masraf oranı. */
  erBasi: number;
  masraf: number;
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
    id: "devriye", tur: "devriye", simge: "🏮", minEr: 5, erBasi: 0.2, masraf: 0.1, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0, kayipSavas: 0.01, sertlik: 0, savasCarpani: 1.1, senaryo: null,
    ad: { orta: { tr: "Nöbet ve Devriye", en: "Watch & Patrol" }, sanayi: { tr: "Asayiş ve Devriye", en: "Policing & Patrol" } },
    aciklama: { tr: "Sakin ve güvenli; küçük ama düzenli gelir.", en: "Calm and safe; small but steady income." },
  },
  {
    id: "eskort", tur: "eskort", simge: "🐫", minEr: 10, erBasi: 0.28, masraf: 0.12, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.002, kayipSavas: 0.01, sertlik: 0, savasCarpani: 0.7, senaryo: null,
    ad: { orta: { tr: "Kervan Eskortu", en: "Caravan Escort" }, sanayi: { tr: "Demiryolu ve Kervan Koruması", en: "Railway & Convoy Guard" } },
    aciklama: { tr: "Bollukta artar, savaşta düşer, kıtlıkta haydut yüzünden çok iş çıkar.", en: "Rises in boom, falls in war, plentiful in famine because of bandits." },
  },
  {
    id: "haydut", tur: "haydut", simge: "🗡️", minEr: 15, erBasi: 0.3, masraf: 0.15, yalnizSavas: false, ganimet: 0.1,
    kayipBaris: 0.01, kayipSavas: 0.02, sertlik: 0, savasCarpani: 1, senaryo: "haydut",
    ad: { orta: { tr: "Haydut Avı", en: "Bandit Hunt" }, sanayi: { tr: "Eşkıya Avı", en: "Outlaw Hunt" } },
    aciklama: { tr: "Küçük ganimet ve esir; süvari ve okçu işe yarar.", en: "Small loot and prisoners; cavalry and archers help." },
  },
  {
    id: "tahsilat", tur: "tahsilat", simge: "💰", minEr: 20, erBasi: 0.42, masraf: 0.1, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.005, kayipSavas: 0.01, sertlik: 1.2, savasCarpani: 1, senaryo: null,
    ad: { orta: { tr: "Haraç ve Vergi Tahsilatı", en: "Tribute & Tax Collection" }, sanayi: { tr: "Jandarma ve Vergi Tahsilatı", en: "Gendarmerie & Tax Collection" } },
    aciklama: { tr: "Yüksek gelir; sertliği ve halk tepkisini yükseltir.", en: "High income; raises harshness and public anger." },
  },
  {
    id: "akin", tur: "akin", simge: "🔥", minEr: 30, erBasi: 0.32, masraf: 0.2, yalnizSavas: false, ganimet: 0.15,
    kayipBaris: 0.02, kayipSavas: 0.08, sertlik: 0.6, savasCarpani: 2, senaryo: "savas",
    ad: { orta: { tr: "Akın ve Baskın", en: "Raid & Foray" }, sanayi: { tr: "İsyan Bastırma", en: "Suppressing Revolt" } },
    aciklama: { tr: "Barışta zayıf; savaşta geliri ikiye katlar, ganimet getirir ama kayıp yüksektir.", en: "Weak in peace; doubles income in war and brings loot, but losses are heavy." },
  },
  {
    id: "garnizon", tur: "garnizon", simge: "🏰", minEr: 40, erBasi: 0.3, masraf: 0.08, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0.002, kayipSavas: 0.02, sertlik: 0, savasCarpani: 1.2, senaryo: "sinir",
    ad: { orta: { tr: "Sınır ve Kale Garnizonu", en: "Border & Castle Garrison" }, sanayi: { tr: "Sınır ve Liman Garnizonu", en: "Border & Harbour Garrison" } },
    aciklama: { tr: "Düşük kayıp, istikrarlı gelir; sınır olaylarında okçu ve mızraklı güçlenir.", en: "Low losses, steady income; archers and spearmen shine in border clashes." },
  },
  {
    id: "sefer", tur: "sefer", simge: "⚔️", minEr: 60, erBasi: 0.5, masraf: 0.25, yalnizSavas: true, ganimet: 0.45,
    kayipBaris: 0, kayipSavas: 0.1, sertlik: 0.8, savasCarpani: 1, senaryo: "savas",
    ad: { orta: { tr: "Kale Kuşatması ve Sefer", en: "Siege & Campaign" }, sanayi: { tr: "Cephe Harekâtı", en: "Front Operation" } },
    aciklama: { tr: "Yalnız savaşta açılır; en yüksek ödeme ve ganimet, en yüksek kayıp.", en: "Opens only in war; the best pay and loot, the heaviest losses." },
  },
  {
    id: "muhafiz", tur: "muhafiz", simge: "👑", minEr: 90, erBasi: 0.45, masraf: 0.08, yalnizSavas: false, ganimet: 0,
    kayipBaris: 0, kayipSavas: 0.005, sertlik: -0.3, savasCarpani: 1, senaryo: null,
    ad: { orta: { tr: "Saray ve Kale Muhafızlığı", en: "Court & Castle Guard" }, sanayi: { tr: "Liman ve Kale Komutanlığı", en: "Harbour & Fort Command" } },
    aciklama: { tr: "Düşük kayıp, iyi ödeme; şöhret getirir.", en: "Low losses, good pay; brings renown." },
  },
  {
    id: "komuta", tur: "komuta", simge: "🏯", minEr: 130, erBasi: 0.55, masraf: 0.1, yalnizSavas: false, ganimet: 0.05,
    kayipBaris: 0.005, kayipSavas: 0.03, sertlik: 0, savasCarpani: 1.15, senaryo: "sinir",
    ad: { orta: { tr: "Eyalet ve Kale Komutanlığı", en: "Province & Castle Command" }, sanayi: { tr: "Eyalet Garnizon Komutanlığı", en: "Provincial Command" } },
    aciklama: { tr: "Büyük ordu ister; yüksek ve düzenli gelir.", en: "Needs a big army; high, steady income." },
  },
  {
    id: "baskomutan", tur: "baskomutan", simge: "🎖️", minEr: 200, erBasi: 0.65, masraf: 0.15, yalnizSavas: true, ganimet: 0.35,
    kayipBaris: 0, kayipSavas: 0.06, sertlik: 0.5, savasCarpani: 1, senaryo: "savas",
    ad: { orta: { tr: "Başkomutanlık", en: "Supreme Command" }, sanayi: { tr: "Başkomutanlık", en: "Supreme Command" } },
    aciklama: { tr: "Yalnız savaşta; en büyük ordu, en büyük pay.", en: "War only; the largest army, the largest stake." },
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
  devriye: { bolluk: 1.1, durgunluk: 0.9 },
  eskort: { bolluk: 1.3, durgunluk: 0.9, kitlik: 1.2 },
  haydut: { bolluk: 0.8, durgunluk: 0.9, kitlik: 1.4 },
  tahsilat: { bolluk: 1, durgunluk: 1.1, kitlik: 0.8 },
  akin: { bolluk: 0.6, durgunluk: 0.9 },
};
export const VEBA_GOREV_CARPANI = 0.55;

// ── Savaş ───────────────────────────────────────────────────────────────────
export const ARAZI_SIRASI: BirlikArazi[] = ["ova", "kale", "dag"];
export const ARAZI_ADLARI: Record<BirlikArazi, { orta: DilliMetin; sanayi: DilliMetin; simge: string }> = {
  ova: { orta: { tr: "Açık ova", en: "Open plain" }, sanayi: { tr: "Açık arazi", en: "Open ground" }, simge: "🌾" },
  kale: { orta: { tr: "Kale çevresi", en: "Castle grounds" }, sanayi: { tr: "Siperli hat / şehir", en: "Trenches / town" }, simge: "🏰" },
  dag: { orta: { tr: "Dağ geçidi / orman", en: "Mountain pass / forest" }, sanayi: { tr: "Dağ / boğaz", en: "Mountain / strait" }, simge: "⛰️" },
};
/** Arazi × tür çarpanı (Mızraklı piyade "piyade" sayılır). */
export const ARAZI_CARPANLARI: Record<BirlikArazi, { piyade: number; okcu: number; suvari: number; kusatma: number }> = {
  ova: { piyade: 1, okcu: 0.95, suvari: 1.25, kusatma: 0.85 },
  kale: { piyade: 1.1, okcu: 1.15, suvari: 0.8, kusatma: 1 },
  dag: { piyade: 1.1, okcu: 1.2, suvari: 0.7, kusatma: 0.7 },
};
/** Rütbe S1..S5 → seçtiğin arazinin gerçekleşme ihtimali. */
export const ARAZI_TERCIH_IHTIMALI = [0, 0.15, 0.3, 0.55, 0.8];
/** Bölgeye göre arazi ağırlıkları (ova, kale, dağ). */
export const BOLGE_ARAZI_AGIRLIGI: Record<string, [number, number, number]> = {
  Fransa: [0.45, 0.35, 0.2],
  "Kutsal Roma": [0.3, 0.35, 0.35],
  Bizans: [0.25, 0.4, 0.35],
  Selçuklu: [0.5, 0.2, 0.3],
  Eyyubiler: [0.5, 0.25, 0.25],
  İngiltere: [0.4, 0.35, 0.25],
  Osmanlı: [0.3, 0.3, 0.4],
  Rusya: [0.6, 0.15, 0.25],
};
export const ARAZI_DEGISIM_ORANI = 0.4;
/** İnisiyatif zarı: oyuncu seçer / zorunlu saldırı / zorunlu savunma. */
export const INISIYATIF_OYUNCU_SECER = 0.4;
export const INISIYATIF_ZORUNLU_SALDIRI = 0.3;
export const DUSMAN_ORAN: [number, number] = [0.85, 1.25];
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
    erzakOran: -0.1, maliyet: 0.9, sertlik: 1.5, ganimet: 0.8,
    ad: { tr: "Yağma ile geçin", en: "Live off the land" },
    aciklama: { tr: "Erzak %10 eksik, halk ezilir: sertlik +1,5, ganimet ×0,8.", en: "Supplies 10% short, locals suffer: harshness +1.5, loot ×0.8." },
  },
};
export const IKMAL_SIRASI: BirlikIkmal[] = ["yeterli", "kit", "yagma"];

export const SEFERBERLIK_TANIMLARI: Record<
  BirlikSeferberlik,
  { er: number; moral: number; erzak: number; firar: number; kalite: "dusuk" | "yuksek" | "karma"; talim: number; ad: DilliMetin; aciklama: DilliMetin }
> = {
  genel: {
    er: 0.45, moral: -15, erzak: 0.2, firar: 1.5, kalite: "dusuk", talim: 0,
    ad: { tr: "Genel çağrı", en: "General levy" },
    aciklama: { tr: "+%45 er, hepsi düşük kalite ve eğitimsiz; moral −15, savaş boyunca erzak +%20, ilk yıl firar ×1,5.", en: "+45% men, all basic kit and untrained; morale −15, supplies +20% for the war, first-year desertion ×1.5." },
  },
  secme: {
    er: 0.1, moral: 5, erzak: 0, firar: 1, kalite: "yuksek", talim: TALIM_SECKIN_GIRIS,
    ad: { tr: "Seçkin birlik", en: "Picked troops" },
    aciklama: { tr: "+%10 er, hepsi yüksek kalite ve eğitimli; moral +5.", en: "+10% men, all superior kit and trained; morale +5." },
  },
  dengeli: {
    er: 0.25, moral: -5, erzak: 0.08, firar: 1, kalite: "karma", talim: 0,
    ad: { tr: "Dengeli çağrı", en: "Balanced levy" },
    aciklama: { tr: "+%25 er, %40'ı orta kalite; moral −5, erzak +%8.", en: "+25% men, 40% standard kit; morale −5, supplies +8%." },
  },
};
export const SEFERBERLIK_SIRASI: BirlikSeferberlik[] = ["genel", "dengeli", "secme"];
/** Savaş sonunda seferberlik erlerinin kalan oranı. */
export const SEFERBERLIK_KALMA_ZAFER = 0.6;
export const SEFERBERLIK_KALMA_YENILGI = 0.25;
/** Savaşta devşirme çarpanı ve zaferde gönüllü akını (ordunun kesri). */
export const SAVAS_DEVSIRME_CARPANI = 2;
export const ZAFER_GONULLU: [number, number] = [0.1, 0.2];

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
/** Ganimeti saklama (karanlık iş): rütbe şartı. */
export const GANIMET_SAKLAMA_RUTBE = 3;

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
const dk = (id: string, seviye: number, kaynak: DoktrinKaynagi, simge: string, tr: string, en: string, etki: DoktrinEtkisi): DoktrinTanimi => ({
  id, seviye, kaynak, simge, ad: { tr, en }, etki, acimasiz: kaynak === "sert",
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
/** Subay rolünün (ana/maliyet/musteri/guvenlik) askerî karşılığı. */
export const SUBAY_ROL_ACIKLAMASI = {
  ana: { tr: "Harp subayı: askerî gücü artırır", en: "War officer: raises military strength" },
  maliyet: { tr: "Levazım subayı: er ve erzak masrafını düşürür", en: "Quartermaster: cuts soldier and supply costs" },
  musteri: { tr: "Devşirme subayı: yılda +1…+5 er çeker", en: "Recruiting officer: brings +1…+5 men a year" },
  guvenlik: { tr: "Tabip subayı: ölüm ve firarı azaltır, saldırılara karşı korur", en: "Surgeon: reduces deaths and desertion, guards against attacks" },
} as const;
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
