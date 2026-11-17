import type {
  BirlikArazi,
  BirlikGanimetPayi,
  BirlikIkmal,
  BirlikKalite,
  BirlikRol,
  BirlikSeferberlik,
  BirlikTalim,
  BirlikTur,
} from "../types";
import type { DilliMetin } from "./meslekProfilleri";

/**
 * Asker "birlik" işletmesi sayıları (2026-11). Tek kaynak: game/birlik.ts bunları okur.
 * Tüm sayılar BAŞLANGIÇ değeridir; simülasyonla (scripts/simulateIsletme.ts) kalibre edilir.
 */

// ── Ordu büyüklüğü ve limitler ──────────────────────────────────────────────
export const BASLANGIC_ER = 20;
export const ER_TAVANI = 500;
/** Asker'de pazar yok; karanlık işlerin "müşteri" (er devşirme) kazancı bu sabit ölçekle çarpılır (eskiden pazar büyüklüğü ≈195 / 416, v67 Madde 7). */
export const ASKER_OLAY_OLCEGI = 195;
/** Kışla kademesi K0..K4 → kışla limiti (tek ordu limiti; rütbe limiti kalktı). */
export const KISLA_ER_LIMITI = [30, 70, 140, 280, 500];
/** Kışla kademesi K0..K4 → yıllık bakım (enflasyonlu). Düşük kademe yumuşak; er başı bakım kademeyle artar (tam dolu kışlada er başı ≈ 0,07 / 0,09 / 0,13 / 0,18 / 0,24). */
export const KISLA_BAKIM = [3, 8, 22, 60, 150];
/** Subay limiti: rütbe tabanı + kışla bonusu (K0..K4). */
export const SUBAY_RUTBE_TABANI = [1, 2, 3, 4, 5];
export const SUBAY_KISLA_BONUSU = [0, 1, 1, 2, 2];
/** En çok kaç subay tutulabilir (v67). */
export const SUBAY_MAKS = 4;
/** Kışla limitini aşan her er için er masrafı ve erzak bu çarpanla ödenir (savaş sürerken seferberlik erleri muaf). */
export const LIMIT_ASIM_GIDER_CARPANI = 2.5;
// ── Teçhizat kalitesi ───────────────────────────────────────────────────────
export const KALITE_SIRASI: BirlikKalite[] = ["dusuk", "orta", "yuksek"];
export const KALITE_CARPANI: Record<BirlikKalite, number> = { dusuk: 0.75, orta: 1, yuksek: 1.25 };
/** Düşükten verilen kaliteye yükseltmenin er başı fiyatı (enflasyonsuz). */
export const KALITE_FIYATI: Record<BirlikKalite, number> = { dusuk: 0, orta: 0, yuksek: 0 };
/** Teçhizat bakımı: er başı yıllık (enflasyonlu), seviyeye göre. */
export const KALITE_BAKIM: Record<BirlikKalite, number> = { dusuk: 0.13, orta: 0.24, yuksek: 0.36 };
/** Teçhizat seviyesinin yıllık moral etkisi (kalite karışımının ağırlıklı ortalaması) ve talim kazancı çarpanı. */
export const KALITE_MORAL: Record<BirlikKalite, number> = { dusuk: -1, orta: 0, yuksek: 1 };
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
/**
 * Kuşatma birliği kodda duruyor ama oyunda GİZLİ (kapalıyken seçim listesinde yok, birlikSec reddeder, kale eşiğine katkısı yok).
 * Açılırsa: ordunun %10'u, savaşta piyade sayılır, tek etkisi kale ele geçirme eşiğini KUSATMA_KALE_ESIGI_CARPANI kadar indirir.
 */
export const KUSATMA_ACIK = false;
export const KUSATMA_KALE_ESIGI_CARPANI = 1.25;
export const TUR_SIRASI: BirlikTur[] = ["okcu", "suvari", "mizrakli", "zirhli", ...(KUSATMA_ACIK ? (["kusatma"] as BirlikTur[]) : [])];
/** Açık her savaş birliği ordunun bu kesrini oluşturur (kuşatma ayrı: TUR_TANIMLARI.kusatma.pay). En çok 4×%20 + %10 = %90 özel, en az %10 piyade. */
export const TUR_PAYI = 0.2;
/** Rütbeye (S1..S5) göre aynı anda açık tutulabilecek özel birlik sayısı (görünür sınıf sayısı 4). */
export const OZEL_BIRLIK_LIMITI = [1, 2, 3, 4, 4];
/** Birlik seviyesi yükseltme/değiştirme kilidi (yıl). */
export const BIRLIK_KILIT_YIL = 5;
/** Birliği küçültme / terhis iadesi. */
export const IADE_ORANI = 0.35;

export interface TurTanimi {
  /** Saldırı / savunma çarpanı (o payın erlerine uygulanır). */
  saldiri: number;
  savunma: number;
  /** Ordunun bu birliğe ayrılan kesri. */
  pay: number;
  /** Savaşta ve çatışmada kendi arazi çarpanı (ova / dağ geçidi / sık orman), SALDIRIDA ve SAVUNMADA ayrı (v67). Ortalama değil, birlik başına farklı; ortalaması ≥1,15 güçlü, ≤0,90 zayıf sayılır. */
  arazi: Record<BirlikArazi, { saldiri: number; savunma: number }>;
  /** Birliğe geçen er başına tek seferlik ücret (enflasyonsuz). */
  ucret: number;
  /** Bakım: bu birliğin her eri için yıllık EK sabit tutar (enflasyonlu; v67). Birlikte kaç er varsa o kadar ödenir; teçhizat bakımı ayrı kalem. */
  bakimEriBasi: number;
  simge: string;
  ad: { orta: DilliMetin; sanayi: DilliMetin };
  arti: DilliMetin;
  eksi: DilliMetin;
}
export const TUR_TANIMLARI: Record<BirlikTur, TurTanimi> = {
  okcu: {
    saldiri: 1.75, savunma: 1.35, pay: TUR_PAYI, arazi: { ova: { saldiri: 0.8, savunma: 0.9 }, dag: { saldiri: 1.1, savunma: 1.35 }, orman: { saldiri: 1.25, savunma: 1.4 } }, ucret: 0.7, bakimEriBasi: 0.2, simge: "🏹",
    ad: { orta: { tr: "Okçu", en: "Archers" }, sanayi: { tr: "Nişancı", en: "Riflemen" } },
    arti: { tr: "Güçlü saldırı ve iyi savunma; dağda ve ormanda üstün; baskın cezası −%5", en: "Strong attack, good defence; excels in hills and forest; ambush penalty −5%" },
    eksi: { tr: "Açık ovada zayıf", en: "Weak on open ground" },
  },
  suvari: {
    saldiri: 2.6, savunma: 0.6, pay: TUR_PAYI, arazi: { ova: { saldiri: 1.7, savunma: 0.9 }, dag: { saldiri: 0.8, savunma: 0.7 }, orman: { saldiri: 0.8, savunma: 0.8 } }, ucret: 0.85, bakimEriBasi: 0.25, simge: "🐎",
    ad: { orta: { tr: "Ağır Süvari", en: "Heavy Cavalry" }, sanayi: { tr: "Süvari", en: "Cavalry" } },
    arti: { tr: "En güçlü saldırı; ovada ezici; haraç ve vergi tahsilatı geliri +%10", en: "Strongest attack; crushing on open ground; tribute and tax collection income +10%" },
    eksi: { tr: "Zayıf savunma; dağ ve ormanda zayıf, pahalı", en: "Weak defence; poor in hills and forest, costly" },
  },
  mizrakli: {
    saldiri: 1.0, savunma: 2.2, pay: TUR_PAYI, arazi: { ova: { saldiri: 1.0, savunma: 1.2 }, dag: { saldiri: 1.25, savunma: 1.6 }, orman: { saldiri: 0.8, savunma: 0.9 } }, ucret: 0.75, bakimEriBasi: 0.25, simge: "🛡️",
    ad: { orta: { tr: "Kalkan-Mızrak", en: "Shield & Spear" }, sanayi: { tr: "Süngülü Piyade", en: "Bayonet Infantry" } },
    arti: { tr: "Çok güçlü savunma; dağ geçidinde duvar gibi; yaralı −%10", en: "Very strong defence; a wall in mountain passes; wounded −10%" },
    eksi: { tr: "Saldırısı düşük; sık ormanda zayıf", en: "Weak attack; poor in dense forest" },
  },
  zirhli: {
    saldiri: 1.5, savunma: 2.4, pay: TUR_PAYI, arazi: { ova: { saldiri: 1.3, savunma: 1.3 }, dag: { saldiri: 1.05, savunma: 1.25 }, orman: { saldiri: 1.0, savunma: 1.2 } }, ucret: 1.35, bakimEriBasi: 0.4, simge: "⚔️",
    ad: { orta: { tr: "Zırhlı Şövalye", en: "Armoured Knights" }, sanayi: { tr: "Zırhlı Birlik", en: "Armoured Corps" } },
    arti: { tr: "En güçlü savunma ve güçlü saldırı; her arazide iyi; ölü −%15", en: "Strongest defence and strong attack; good everywhere; deaths −15%" },
    eksi: { tr: "En pahalı bakım", en: "Costliest upkeep" },
  },
  kusatma: {
    saldiri: 1, savunma: 1.1, pay: 0.1, arazi: { ova: { saldiri: 1, savunma: 1 }, dag: { saldiri: 1, savunma: 1 }, orman: { saldiri: 1, savunma: 1 } }, ucret: 0.5, bakimEriBasi: 0.2, simge: "🏰",
    ad: { orta: { tr: "Kuşatma Kolu", en: "Siege Train" }, sanayi: { tr: "Topçu Bataryası", en: "Artillery Battery" } },
    arti: { tr: "Kale kuşatmasında eşiği düşürür", en: "Lowers the bar for taking a fort" },
    eksi: { tr: "Savaş ve çatışmada piyade sayılır", en: "Counts as infantry in battle" },
  },
};
export const PIYADE = { saldiri: 0.95, savunma: 1.05 };
export function turAdi(tur: BirlikTur, cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? TUR_TANIMLARI[tur].ad.sanayi : TUR_TANIMLARI[tur].ad.orta;
}
/** Oyuncuya görünen güçlü / zayıf arazi listesi (eşikler ≥1,15 / ≤0,90). */
export function turGucluZayif(tur: BirlikTur): { guclu: BirlikArazi[]; zayif: BirlikArazi[] } {
  const a = TUR_TANIMLARI[tur].arazi;
  const ids = Object.keys(a) as BirlikArazi[];
  const ort = (x: BirlikArazi) => (a[x].saldiri + a[x].savunma) / 2;
  return { guclu: ids.filter((x) => ort(x) >= 1.15), zayif: ids.filter((x) => ort(x) <= 0.9) };
}

/** Eski kuşatma seviyesi (kullanımdan kalktı; kuşatma artık gizli bir birlik türü). Veri uyumu için sabitler duruyor. */
export const KUSATMA_SALDIRI_BONUSU = [0, 0.12, 0.25];
export const KUSATMA_ER_FIYATI = [0, 0.5, 1.1];
export const KUSATMA_BAKIM_ORANI = 0.06;
export function kusatmaAdi(cag: string): DilliMetin {
  return TUR_TANIMLARI.kusatma.ad[cag === "Sanayi Devrimi" ? "sanayi" : "orta"];
}

// ── Talim / tecrübe ─────────────────────────────────────────────────────────
export const TALIM_SIRASI: BirlikTalim[] = ["hafif", "orta", "agir"];
export interface TalimTanimi {
  /** Yıllık talim kazancı (unutma düşülmeden). Üst sınır politikaya değil Talim Alanı'na bağlıdır. */
  delta: number;
  /** Er başına yıllık talim masrafı (enflasyonlu) ve yıllık moral değişimi. */
  masraf: number;
  moral: number;
  ad: DilliMetin;
}
export const TALIM_TANIMLARI: Record<BirlikTalim, TalimTanimi> = {
  // Yıllık NET talim değişimi (doğal unutma −TALIM_DOGAL_DUSUS dahil, standart teçhizat, Talim Alanı yok): hafif −2 / orta +2 / ağır +7. Talim ücretsizdir; morale etkisi +1 / −1 / −5.
  // Üst sınırı politika değil Talim Alanı binası belirler (v67 Madde 6: TALIM_ALANI_TAVAN).
  hafif: { delta: 0, masraf: 0, moral: 1, ad: { tr: "Hafif talim", en: "Light drill" } },
  orta: { delta: 4, masraf: 0, moral: -1, ad: { tr: "Orta talim", en: "Regular drill" } },
  agir: { delta: 9, masraf: 0, moral: -5, ad: { tr: "Ağır talim", en: "Hard drill" } },
};
/** Talim Alanı yatırımı (v67 Madde 6): kademe başına yıllık talim kazancına eklenen puan (politikadan bağımsız) ve ordunun talim ÜST LİMİTİ (kademe 0 = bina yok). */
export const TALIM_ALANI_YILLIK = [0, 1, 2, 3, 4];
export const TALIM_ALANI_TAVAN = [70, 75, 80, 85, 90];
/** Güç bonusu = seviye × katsayı (en çok +%20). */
export const TALIM_GUC_KATSAYISI = 0.002;
/** Kayıp çarpanı (talim, revir, tabip, zırhlı, doktrin indirimleri sonrası) bunun altına inmez: tam yatırım kaybı sıfırlamaz. */
export const KAYIP_CARPANI_TABANI = 0.5;
/** Kayıp çarpanı azalması = seviye × katsayı (en çok −%15). */
export const TALIM_KAYIP_KATSAYISI = 0.0015;
export const TALIM_SAVAS_ZAFER = 6;
export const TALIM_SAVAS_YENILGI = 3;
export const TALIM_SECKIN_GIRIS = 70;

// ── Moral ve sertlik ────────────────────────────────────────────────────────
/** Moral ve talim NÖTR noktada başlar (güce etkisi 0); bakım yapılmazsa zamanla düşerler. */
export const MORAL_BASLANGIC = 50;
export const TALIM_BASLANGIC = 50;
export const MORAL_NOTR = 50;
export const TALIM_NOTR = 50;
/** Yeni katılan erlerin (gönüllü, devşirme, esir) giriş talimi; ordunun talim ortalamasını seyreltir. Seferber erlerin giriş talimi ayrıdır. */
export const TALIM_YENI_ER_GIRIS = 15;
/** Moral ve talimin güce etkisi: nötrde 0, 100'de +%20, 0'da −%15 (doğrusal; v67). */
export const MORAL_TALIM_GUC_UST = 0.2;
export const MORAL_TALIM_GUC_ALT = 0.15;
/** Doğal moral düşüşü (yıllık, savaşta daha sert) ve dipteki toparlanma (moral bu eşiğin altındaysa +MORAL_DIP_TOPARLANMA). */
export const MORAL_DOGAL_DUSUS_BARIS = -0.5;
export const MORAL_DOGAL_DUSUS_SAVAS = -2;
export const MORAL_DIP_ESIGI = 30;
export const MORAL_DIP_TOPARLANMA = 2;
/** Talim bakım görmezse her yıl bu kadar unutulur; moral dipteyken (MORAL_DIP_ESIGI altı) talim kazancı yarıya iner. */
export const TALIM_DOGAL_DUSUS = 2;
/** Yüksekte pasif düşüş (yalnız MORAL için; talimin üst sınırını Talim Alanı belirler): yıl başındaki değer bu eşiğin üstündeyse o yıl ek olarak −(değer−eşik)×katsayı düşer (80'de −2, 90'da −4, 100'de −6). */
export const PASIF_DUSUS_ESIGI = 70;
export const PASIF_DUSUS_KATSAYI = 0.2;
export function yuksekPasifDusus(deger: number): number {
  return deger > PASIF_DUSUS_ESIGI ? (deger - PASIF_DUSUS_ESIGI) * PASIF_DUSUS_KATSAYI : 0;
}
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
/**
 * Savaşın İLK İKİ YILI: ölü + yaralı + firar toplamı iki yılda ordunun %5–6'sı (yağma ve kayıp çarpanı sonrası bile en çok %6, `SAVAS_ON_YIL_TAVANI`).
 * Savaş başlayınca toplam çekilir, üç türe rastgele ama yaklaşık eşit bölünür (±%30 sapma) ve iki yıla rastgele dağıtılır (iki yıl aynı olmaz).
 * Yaralı ölüden BAĞIMSIZDIR (ölü × oran değil).
 */
export const SAVAS_ON_YIL_TOPLAM: Aralik = [5, 6];
export const SAVAS_ON_YIL_TAVANI = 6;
export const SAVAS_ON_YIL_SAPMA = 0.3;
export const SAVAS_KARAR_KAYBI: Record<"zafer" | "yenilgi", KayipAraligi> = {
  zafer: { olu: [8, 11], firar: [2.5, 4] },
  yenilgi: { olu: [18, 23], firar: [7, 9.5] },
};
export const SAVAS_SONRA_KAYBI: Record<"zafer" | "yenilgi", KayipAraligi> = {
  zafer: { olu: [0.6, 1.4], firar: [0.5, 1.2] },
  yenilgi: { olu: [4, 6], firar: [2, 3.5] },
};
/** Savaş boyu kümülatif tavan (savaş başı toplam er üzerinden %). */
export const SAVAS_KAYIP_TAVANI: Record<"zafer" | "yenilgi", { olu: number; firar: number }> = {
  zafer: { olu: 16, firar: 9 },
  yenilgi: { olu: 31, firar: 15 },
};
/** Haydut ve sınır çatışması (tek olay; ordunun %'si). Sınır, düzenli düşman ordusu olduğu için haydutlardan ağırdır. */
export const BARIS_KAYBI: Record<"haydut" | "sinir", Record<"zafer" | "yenilgi", KayipAraligi>> = {
  haydut: {
    zafer: { olu: [1.5, 3], firar: [0, 0.5] },
    yenilgi: { olu: [4, 7], firar: [2, 3] },
  },
  sinir: {
    zafer: { olu: [2, 3.5], firar: [0, 0.5] },
    yenilgi: { olu: [5, 8], firar: [2, 4] },
  },
};
/** Barış çatışmasında yaralı = ölü × U(a; b) (savaşta YARALI_ORAN); revir, Tabip ve mızraklı düşürür, alt sınır YARALI_ORAN_TABAN. */
export const BARIS_YARALI_ORAN: Aralik = [2, 2.5];

// ── Oyuncunun kendi sağlığı (v63): savaş ve çatışma komutanı da yıpratır; alt limit YOK, sağlık 0'a inerse savaşta ölebilir ──
/** Büyük savaşın toplam ham sağlık bedeli (savaş başında çekilir). */
export const SAVAS_SAGLIK_TOPLAM: Aralik = [5, 20];
/** Yıllık pay = toplam / bu kadar yıl; savaş bundan önce biterse kalanı bitişte, daha uzun sürerse fazlası alınmaz. */
export const SAVAS_SAGLIK_YIL_BOLEN = 6;
/** Yenilgiyle biten savaşın bitişinde ek ham bedel ("yaralı döndün"). */
export const SAVAS_SAGLIK_YENILGI_EK = 3;
/** Haydut / sınır çatışması ham sağlık bedeli (zafer / yenilgi); baskın yenilgisinde ek. */
export const BARIS_SAGLIK: Record<"haydut" | "sinir", { zafer: Aralik; yenilgi: Aralik }> = {
  haydut: { zafer: [0, 1], yenilgi: [2, 4] },
  sinir: { zafer: [1, 2], yenilgi: [3, 6] },
};
export const BASKIN_YENILGI_SAGLIK_EK = 1;
/** Tehlikeli görevlerin yıllık ham sağlık bedeli (rütbeden bağımsız, sabit). */
export const GOREV_SAGLIK: Record<string, Aralik> = { tahsilat: [0, 1], garnizon: [0, 1] };
/** Revir yatırımı seviyesi başına sağlık bedeli azalması (en çok 4 seviye = %10). Tabip subayı ayrıca ölü/firar azaltma oranıyla düşürür. */
export const SAGLIK_REVIR_AZALTMA = 0.025;
/** Çatışma kararı: saldırıda ganimet ve kayıp artar, (seçilmiş) savunmada ikisi de azalır. Baskında savunma zorunludur, bu çarpan uygulanmaz. */
export const CATISMA_SALDIRI = { ganimet: 1.3, kayip: 1.3 } as const;
export const CATISMA_SAVUNMA = { ganimet: 0.8, kayip: 0.8 } as const;
/** Düşmanın tahmini kaybı (gücünün kesri): bizim zaferimizde / yenilgimizde. */
export const BARIS_DUSMAN_KAYBI = { zafer: [0.12, 0.2], yenilgi: [0.03, 0.06] } as const;
/** Baskın: oyuncunun savunması pusu cezasıyla düşer (Keşif subayı, Karakol azaltır); yenilgide yıllık gelirin bu kesri nakit hasarı. */
export const BASKIN_PUSU_CEZASI = 0.1;
export const BASKIN_NAKIT_HASARI = 0.04;
/** Çatışmanın baskın (oyuncu savunmada) olma ihtimali; kalanı av (oyuncu saldırıda). */
/** Barış çatışmasında tür seçimi ağırlığı (v67: haydut sık, sınır seyrek) ve baskın (zorunlu savunma) ihtimali türe göre. */
export const BARIS_TUR_AGIRLIGI: Record<"haydut" | "sinir", number> = { haydut: 0.6, sinir: 0.4 };
export const BARIS_BASKIN_IHTIMALI: Record<"haydut" | "sinir", number> = { haydut: 0.65, sinir: 0.4 };
export type DusmanBirlik = "okcu" | "suvari" | "mizrakli" | "zirhli" | "karma";
/** Ağırlıklı seçim (ağırlıkların toplamı 1 olmak zorunda değil). */
export function agirlikliSec<T extends string>(agirliklar: Partial<Record<T, number>>, rnd01 = Math.random()): T {
  const girdiler = Object.entries(agirliklar) as [T, number][];
  const toplam = girdiler.reduce((t, [, w]) => t + w, 0);
  let x = rnd01 * toplam;
  for (const [k, w] of girdiler) {
    x -= w;
    if (x < 0) return k;
  }
  return girdiler[girdiler.length - 1][0];
}
/**
 * Düşman gücü (v67): E = (yaşa bağlı TABAN + oyuncu gücünün DUSMAN_OYUNCU_PAYI'ı) × tür çarpanı × sapma × zafer serisi hazırlığı.
 * TABAN (`dusmanGucuYas`) yaşla SABİT HIZLA artar, üç tür için ayrı başlangıç ve yıllık oran:
 *   15–20 yaş: neredeyse düz (taban20 / 1,15'ten taban20'ye doğrusal) — ilk yıllar çok artmaz.
 *   20–60 yaş: taban20 × (1 + oran)^(yaş − 20)  (her yıl aynı yüzde; sıçrama yok).
 *   60 yaş sonrası: 60 yaşındaki artış hızı SABİT kalır (doğrusal; yaş 70→80 hızlanmaz).
 * Tür çarpanı: haydut en kolay, sınır (düzenli düşman) daha güçlü, büyük savaş en güçlü. Oyuncu güçlendikçe düşman da büyür.
 */
export type DusmanTuru = "haydut" | "sinir" | "savas";
export const DUSMAN_PARAMETRELERI: Record<DusmanTuru, { taban20: number; oran: number }> = {
  haydut: { taban20: 7, oran: 0.061 },
  sinir: { taban20: 8.5, oran: 0.063 },
  savas: { taban20: 10.5, oran: 0.071 },
};
/** Düşman gücüne eklenen oyuncu askerî gücü payı ve tür çarpanları. */
export const DUSMAN_OYUNCU_PAYI = 0.3;
export const DUSMAN_TUR_CARPANI: Record<DusmanTuru, number> = { haydut: 0.9, sinir: 1.1, savas: 1.3 };
export const DUSMAN_ILK_YIL_ORANI = 1.15;
export const DUSMAN_BASLANGIC_YASI = 20;
export const DUSMAN_SABIT_ARTIS_YASI = 60;
/** Yaşa bağlı TABAN (oyuncu gücü hariç). */
export function dusmanGucuYas(yas: number, tur: DusmanTuru): number {
  const { taban20, oran } = DUSMAN_PARAMETRELERI[tur];
  if (yas < DUSMAN_BASLANGIC_YASI) {
    const e15 = taban20 / DUSMAN_ILK_YIL_ORANI;
    return e15 + ((taban20 - e15) * Math.max(0, yas - 15)) / (DUSMAN_BASLANGIC_YASI - 15);
  }
  const e = (y: number) => taban20 * Math.pow(1 + oran, y - DUSMAN_BASLANGIC_YASI);
  if (yas <= DUSMAN_SABIT_ARTIS_YASI) return e(yas);
  return e(DUSMAN_SABIT_ARTIS_YASI) * (1 + oran * (yas - DUSMAN_SABIT_ARTIS_YASI));
}
/** Düşmanın gücü (sapma ve zafer serisi hazırlığı ÇAĞIRANDA): (taban + oyuncu gücü × pay) × tür çarpanı. */
export function dusmanGucuHesapla(yas: number, tur: DusmanTuru, oyuncuGuc: number): number {
  return (dusmanGucuYas(yas, tur) + DUSMAN_OYUNCU_PAYI * Math.max(0, oyuncuGuc)) * DUSMAN_TUR_CARPANI[tur];
}
/** Tablo görünümü (5 yılda bir; test ve belge için). */
export const BARIS_DUSMAN_TABLOLARI: Record<"haydut" | "sinir", [number, number][]> = {
  haydut: [15, 21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((y) => [y, Math.round(dusmanGucuYas(y, "haydut"))] as [number, number]),
  sinir: [15, 21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((y) => [y, Math.round(dusmanGucuYas(y, "sinir"))] as [number, number]),
};
export const SAVAS_DUSMAN_YAS: [number, number][] = [15, 21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80].map((y) => [y, Math.round(dusmanGucuYas(y, "savas"))] as [number, number]);
export const BARIS_DUSMAN_SAPMA: [number, number] = [0.95, 1.05];
export function barisDusmanGucuYas(yas: number, tur: "haydut" | "sinir"): number {
  return dusmanGucuYas(yas, tur);
}
/** Firar ayarlayıcıları (puan, %): moral < 40 → (40 − moral) × 0,05; erzak < 0,7 → +0,5; sertlik × 0,005. */
export const FIRAR_MORAL_ESIGI = 40;
export const FIRAR_MORAL_KATSAYI = 0.05;
export const FIRAR_ERZAK_EKI = 0.5;
export const FIRAR_SERTLIK_KATSAYI = 0.005;
export const FIRAR_GENEL_CAGRI_ILK_YIL = 1.5;
/** Yaralı: ölü × oran (tam sayı); revir ve tabip düşürür; iyileşme süresi revirle kısalır; tedavi gideri yaralı başı yıllık. */
export const YARALI_ORAN: Aralik = [1.5, 1.75];
export const YARALI_ORAN_TABAN = 1;
export const YARALI_REVIR_DUSUS = 0.04;
export const YARALI_TABIP_DUSUS_TAVAN = 0.12;
export const YARALI_TABIP_KATSAYI = 0.16;
export const YARALI_IYILESME_YIL = 3;
export const YARALI_REVIR_SURE_KISALTMA = 0.5;
export const YARALI_IYILESME_MIN_YIL = 1;
export const YARALI_TEDAVI_GIDERI = 0.2;
/** Yıllık moral değişiminin (olaylar + etkenler toplamı) en fazla düşebileceği miktar. */
export const MORAL_YILLIK_TABAN = 16;
function dogrusalGucEtkisi(deger: number, notr: number): number {
  const d = (deger - notr) / 50;
  return d >= 0 ? Math.min(MORAL_TALIM_GUC_UST, d * MORAL_TALIM_GUC_UST) : Math.max(-MORAL_TALIM_GUC_ALT, d * MORAL_TALIM_GUC_ALT);
}
/** Moralin güce etkisi: moral 50'de 0, 0'da −%25, 100'de +%25 (doğrusal). */
export function moralGucEtkisi(moral: number): number {
  return dogrusalGucEtkisi(moral, MORAL_NOTR);
}
/** Talimin güce etkisi: talim 50'de 0, 0'da −%25, 100'de +%25 (doğrusal). */
export function talimGucEtkisi(talim: number): number {
  return dogrusalGucEtkisi(talim, TALIM_NOTR);
}
/** Talimin kayıp çarpanına etkisi: talim 50'de 0; yüksek talim kaybı en çok −%15, düşük talim en çok +%15 artırır. */
export function talimKayipEtkisi(talim: number): number {
  return Math.max(-0.15, Math.min(0.15, ((talim - TALIM_NOTR) / 50) * 0.15));
}
/** Yıllık moral etkenleri. */
export const GANIMET_PAYI_TANIMLARI: Record<BirlikGanimetPayi, { oran: number; moral: number; ad: DilliMetin }> = {
  az: { oran: 0.3, moral: -7, ad: { tr: "Az pay", en: "Small share" } },
  dengeli: { oran: 0.5, moral: 0, ad: { tr: "Dengeli pay", en: "Fair share" } },
  comert: { oran: 0.7, moral: 4, ad: { tr: "Cömert pay", en: "Generous share" } },
};
export const GANIMET_SIRASI: BirlikGanimetPayi[] = ["az", "dengeli", "comert"];

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
  const guc = Math.round(MORAL_TALIM_GUC_UST * 100);
  const kayip = 15;
  const arti: DilliMetin[] = [];
  const eksi: DilliMetin[] = [];
  if (d.delta > 0) {
    // Tek sayı: unutma düşülmüş gerçek yıllık değişim.
    const net = d.delta - TALIM_DOGAL_DUSUS;
    arti.push({ tr: `Talim yılda ${isaretli(net, sayiTr)} değişir`, en: `Drill ${isaretli(net, sayiEn)}/yr` });
    arti.push({ tr: `En çok +%${guc} güç, −%${kayip} kayıp`, en: `Up to +${guc}% power, −${kayip}% losses` });
  } else {
    eksi.push({ tr: `Talim yılda −${TALIM_DOGAL_DUSUS} söner; güç ve kayıp avantajı erir`, en: `Drill fades −${TALIM_DOGAL_DUSUS}/yr; power and loss edge melt away` });
  }
  if (d.masraf <= 0) arti.push({ tr: "Ücretsiz", en: "Free" });
  else if (d.masraf <= 0.01) arti.push({ tr: `En ucuz: er başı ${sayiTr(d.masraf)}/yıl`, en: `Cheapest: ${sayiEn(d.masraf)} per man/yr` });
  else eksi.push({ tr: `Er başı ${sayiTr(d.masraf)}/yıl masraf`, en: `${sayiEn(d.masraf)} per man/yr upkeep` });
  if (d.moral > 0) arti.push(moralMetni(d.moral));
  if (d.moral < 0) eksi.push(moralMetni(d.moral));
  return { arti, eksi };
}

export const SERTLIK_DOGAL_SONUM = 0.3;
/** Sertlik başına gelir/ganimet bonusu (sertlik 50 → +%7,5) ve firar/otorite etkisi. */
export const SERTLIK_GELIR_KATSAYISI = 0.0015;
export const SERTLIK_OTORITE_KATSAYISI = 0.006;
export const ASIRI_ESIK = 40;
export const ASIRI_COOLDOWN_YIL = 3;
/** Yıllık moral etkenleri: dönem, savaş yorgunluğu, kayıp, revir. */
export const MORAL_SAVAS_YILLIK = MORAL_DOGAL_DUSUS_SAVAS;
export const MORAL_BARIS_YILLIK = MORAL_DOGAL_DUSUS_BARIS;
export const MORAL_KITLIK_YILLIK = -1.5;
export const MORAL_BOLLUK_YILLIK = 0; // bolluk dönemi artık ordu morali vermez
export const MORAL_YUKSEK_KAYIP_ESIGI = 0.1;
export const MORAL_YUKSEK_KAYIP = -4;
export const REVIR_MORAL_KADEME = 0.4;
/** Bir kerelik moral etkileri. */
export const MORAL_ZAFER = 6;
export const MORAL_KANAT_BOZGUN = -9;
export const MORAL_YENILGI = -17;
export const MORAL_IDAM = -3;
export const MORAL_SERBEST = 3;

// ── Gelir ve gider ──────────────────────────────────────────────────────────
/** Rütbe S1..S5 → yıllık sold (devlet öder, sabit, enflasyonla büyür). */
export const SOLD = [8.5, 8.5, 8.5, 8.5, 8.5];
/** Asker başı yıllık ödeme (maaş kalemine sabit kısımla toplanır). Savaşta devletin zammı: ×SAVAS_ER_BASI_CARPANI (oyuncuya gelir); yalnız ana kadro içindir, seferber ve kiralık erler ödeme almaz. */
export const ER_BASI_GELIR = 0.15;
/** Görev geliri ek çarpanı (1 = yok). Teçhizat çarpanı 0,75/1/1,25'e inince güç ≈×0,75 oldu; güçle orantılı gelirler (görev, yağma, ganimet) ×1,33 ile yeniden dengelendi (1,11 × 1,333). */
export const GOREV_GELIR_CARPANI = 1.05; // v67: görev geliri +%5
/** Her rütbede sabit yıllık gönüllü er (savaşta ayrıca çarpılmaz; vebada kısılır, kışla limitine takılır). */
export const BARIS_YILLIK_ER = 0; // v67: yıllık sabit gönüllü er kalktı (büyüme yalnız devşirme subayı, büro, şöhret, doktrin, yatkınlık)
/** Birim küçük artıları (pay %20 doluyken tam; pay azsa orantılı): mızraklı yaralıyı, zırhlı ölüyü azaltır; okçu baskın pusu cezasını azaltır; süvari haraç ve vergi tahsilatı görev gelirini artırır. */
export const MIZRAKLI_YARALI_AZALTMA = 0.1;
export const ZIRHLI_OLU_AZALTMA = 0.15;
export const OKCU_PUSU_AZALTMA = 0.05;
export const SAVAS_ER_BASI_CARPANI = 2;
export const ER_MASRAFI = 0.23;
export const ERZAK_BIRIMI = 0.13;
/** Ganimet payı politikası (az/dengeli/cömert) en çok bu kadar yılda bir değiştirilebilir. */
export const GANIMET_PAYI_KILIT_YIL = 5;
/** Barış çatışması (haydut / sınır) zafer ganimeti = max(40; askerî güç) × U(a; b) × güç bantları (ganimetEtkinGuc; yenilgide ganimet yok). */
export const BARIS_GANIMET_ARALIK: Record<"haydut" | "sinir", Aralik> = { haydut: [2.2, 2.8], sinir: [3.2, 4.0] };
/** Bütçe önizlemeleri için: tüm türlerdeki en yüksek çarpan ve tür ağırlıklı ortalama orta nokta. */
export const BARIS_GANIMET_UST = Math.max(BARIS_GANIMET_ARALIK.haydut[1], BARIS_GANIMET_ARALIK.sinir[1]);
export const BARIS_GANIMET_ORTA =
  BARIS_TUR_AGIRLIGI.haydut * ((BARIS_GANIMET_ARALIK.haydut[0] + BARIS_GANIMET_ARALIK.haydut[1]) / 2) +
  BARIS_TUR_AGIRLIGI.sinir * ((BARIS_GANIMET_ARALIK.sinir[0] + BARIS_GANIMET_ARALIK.sinir[1]) / 2);
/** Ganimet tabanı: askerî gücü bunun altındaki ordu da zaferde (haydut, sınır ve savaş) 40 güçlük bir ordunun ganimetini alır. */
export const GANIMET_TABAN_GUC = 40;
/**
 * Ganimet güç bantları (kademeli): her askerî güç dilimi kendi çarpanıyla sayılır ("etkin güç"), toplam güçle hiç azalmaz; etkin güç bir tavanda durur.
 * Aralıklar (SAVAS_ZAFER_GANIMET 11–14, BARIS_GANIMET_ARALIK) 0–40 bandının birim çarpanıdır; sonraki bantlarda ×0,80 / 0,55 / 0,35 / 0,22 / 0,12.
 */
export const GANIMET_BANTLARI: [number, number, number][] = [[0, 40, 1], [40, 100, 0.8], [100, 200, 0.55], [200, 350, 0.35], [350, 500, 0.22], [500, Infinity, 0.12]];
export const GANIMET_ETKIN_GUC_TAVANI = 240;
/** Yağma (savaşın ilk yılları) daha yumuşak bantlarla sayılır; tavanı yok. */
export const YAGMA_BANTLARI: [number, number, number][] = [[0, 40, 1], [40, 100, 1], [100, 200, 0.8], [200, 350, 0.65], [350, 500, 0.5], [500, Infinity, 0.4]];
function bantToplami(guc: number, bantlar: [number, number, number][]): number {
  let t = 0;
  for (const [lo, hi, f] of bantlar) t += Math.max(0, Math.min(guc, hi) - lo) * f;
  return t;
}
export function ganimetEtkinGuc(guc: number): number {
  return Math.min(GANIMET_ETKIN_GUC_TAVANI, bantToplami(Math.max(0, guc), GANIMET_BANTLARI));
}
export function yagmaEtkinGuc(guc: number): number {
  return bantToplami(Math.max(0, guc), YAGMA_BANTLARI);
}
export function ganimetBrutTemel(guc: number, aralikDegeri: number): number {
  return ganimetEtkinGuc(Math.max(GANIMET_TABAN_GUC, guc)) * aralikDegeri;
}
/** Savaşta kışla/yapı bakımı bu oranda düşer. */
export const SAVAS_KISLA_INDIRIMI = 0.25;
/** Asker'in yıllık kariyer puanı = min(tavan, güç / düşman referansı) × katsayı (pazar payı yerine askerî güçten). */
export const ASKER_KARIYER_PUANI_KATSAYISI = 1.1;
export const ASKER_KARIYER_GUC_TAVANI = 2.5;
/** Çatışma sonrası bekleme (yıl, bu aralıktan tam sayı çekilir; savaşta sayaç durur, savaştan sonra en az 1 yıl): bekleme + 1 = çatışmalar arası 2–3 yıl. */
export const BARIS_BEKLEME_ARALIK: [number, number] = [1, 2];
/** Bekleme bittikten sonra her yıl çatışma çıkma şansı (1 = bekleme biter bitmez çıkar). */
export const BARIS_YILLIK_IHTIMAL = 1;
export const BARIS_CATISMA_ILK_YIL = 2;
export interface BarisCatismaTanimi {
  /** Düşman gücü / DUSMAN_REFERANS_GUC (rütbe) aralığı. */
  dusman: [number, number];
  /** Zaferde beklenen esir / güç. */
  esir: number;
  ad: { orta: { tr: string; en: string }; sanayi: { tr: string; en: string } };
}
export const BARIS_CATISMALARI: Record<"haydut" | "sinir", BarisCatismaTanimi> = {
  haydut: {
    dusman: [0.5, 0.9],
    esir: 0.016,
    ad: { orta: { tr: "Firari Haydut Çetesi", en: "Deserter Bandits" }, sanayi: { tr: "Firari Eşkıya Çetesi", en: "Deserter Brigands" } },
  },
  sinir: {
    dusman: [0.6, 1.05],
    esir: 0.011,
    ad: { orta: { tr: "Düşman Akıncıları", en: "Enemy Raiders" }, sanayi: { tr: "Sınır Çatışması", en: "Border Clash" } },
  },
};

// ── Çatışma senaryoları (v67 Madde 5c): tür (haydut/sınır) × yön (karşılaşma/baskın) başına 4 senaryo; her biri arazi, düşman birliği, ganimet ve kayıp farkı getirir ──
export interface CatismaSenaryosu {
  id: string;
  tur: "haydut" | "sinir";
  /** true: baskın (zorunlu savunma); false: karşılaşma (saldırı ya da savunma seçilir). */
  baskin: boolean;
  arazi: BirlikArazi;
  /** Düşmanın baskın birliği ağırlıkları (senaryoya özgü). */
  dusman: Partial<Record<DusmanBirlik, number>>;
  /** Zaferde ganimet ve genel kayıp çarpanı (küçük farklar). */
  ganimet: number;
  kayip: number;
  ad: DilliMetin;
  metin: DilliMetin;
}
export const CATISMA_SENARYOLARI: CatismaSenaryosu[] = [
  // Haydut — karşılaşma
  { id: "h_magara", tur: "haydut", baskin: false, arazi: "dag", dusman: { okcu: 0.5, karma: 0.5 }, ganimet: 1, kayip: 1.1,
    ad: { tr: "Mağara Sığınağı", en: "Cave Hideout" },
    metin: { tr: "Haydutlar dağ eteğindeki bir mağaraya çekilmiş. Üstlerine yürüyebilir ya da yolu tutabilirsin.", en: "Bandits hold a cave in the foothills. You may storm them or hold the road." } },
  { id: "h_kervan", tur: "haydut", baskin: false, arazi: "orman", dusman: { suvari: 0.5, okcu: 0.5 }, ganimet: 1.1, kayip: 1,
    ad: { tr: "Kervan Yolu Pusu", en: "Caravan Road Ambush" },
    metin: { tr: "Kervan yolunun ormanlık kıvrımında bir çete pusuda bekliyor.", en: "A gang lies in wait at a wooded bend of the caravan road." } },
  { id: "h_han", tur: "haydut", baskin: false, arazi: "ova", dusman: { karma: 0.6, suvari: 0.4 }, ganimet: 1.15, kayip: 0.95,
    ad: { tr: "Han Baskını", en: "Inn Raid" },
    metin: { tr: "Bir çete yol üstündeki hanı ele geçirmiş.", en: "A gang has seized an inn on the road." } },
  { id: "h_nehir", tur: "haydut", baskin: false, arazi: "ova", dusman: { suvari: 0.5, karma: 0.5 }, ganimet: 1, kayip: 1,
    ad: { tr: "Nehir Geçidi", en: "River Ford" },
    metin: { tr: "Çete, bir nehir geçidinde yolcudan haraç topluyor.", en: "A gang is shaking down travellers at a river ford." } },
  // Haydut — baskın
  { id: "h_gece", tur: "haydut", baskin: true, arazi: "orman", dusman: { suvari: 0.4, okcu: 0.3, karma: 0.3 }, ganimet: 1, kayip: 1.1,
    ad: { tr: "Gece Baskını", en: "Night Raid" },
    metin: { tr: "Gece yarısı ormandan çıkan haydutlar ordugâhına daldı!", en: "Bandits burst from the forest into your camp at midnight!" } },
  { id: "h_erzak", tur: "haydut", baskin: true, arazi: "dag", dusman: { okcu: 0.5, karma: 0.5 }, ganimet: 1, kayip: 1.05,
    ad: { tr: "Erzak Arabası Pusu", en: "Supply Wagon Ambush" },
    metin: { tr: "Erzak arabaların dar bir geçitte pusuya düştü!", en: "Your supply wagons are ambushed in a narrow pass!" } },
  { id: "h_ordugah", tur: "haydut", baskin: true, arazi: "ova", dusman: { suvari: 0.5, karma: 0.5 }, ganimet: 0.95, kayip: 1,
    ad: { tr: "Ordugâh Yağması", en: "Camp Plunder" },
    metin: { tr: "Çete, nöbet değişiminde ordugâhın kenarından sızdı!", en: "A gang slips in at the edge of your camp during the watch change!" } },
  { id: "h_koyyolu", tur: "haydut", baskin: true, arazi: "orman", dusman: { okcu: 0.4, suvari: 0.3, karma: 0.3 }, ganimet: 1, kayip: 1,
    ad: { tr: "Köy Yolunda Pusu", en: "Village Road Ambush" },
    metin: { tr: "Köy yolunda ormandan fırlayan haydutlar sütunu kesti!", en: "Bandits spring from the woods and cut your column on the village road!" } },
  // Sınır — karşılaşma
  { id: "s_kopru", tur: "sinir", baskin: false, arazi: "ova", dusman: { mizrakli: 0.5, zirhli: 0.5 }, ganimet: 1.1, kayip: 1.1,
    ad: { tr: "Köprübaşı", en: "Bridgehead" },
    metin: { tr: "Düşman bir köprübaşını tutmuş. Zorlayabilir ya da karşı yakada siper alabilirsin.", en: "The enemy holds a bridgehead. You may force it or dig in across the river." } },
  { id: "s_dagkarakol", tur: "sinir", baskin: false, arazi: "dag", dusman: { mizrakli: 0.5, okcu: 0.5 }, ganimet: 1.15, kayip: 1.15,
    ad: { tr: "Dağ Karakolu", en: "Mountain Outpost" },
    metin: { tr: "Düşman bir dağ karakoluna yerleşmiş.", en: "The enemy has taken a mountain outpost." } },
  { id: "s_akinci", tur: "sinir", baskin: false, arazi: "ova", dusman: { suvari: 0.7, okcu: 0.3 }, ganimet: 1, kayip: 0.95,
    ad: { tr: "Akıncı Kolu Takibi", en: "Raiding Party Pursuit" },
    metin: { tr: "Bir akıncı kolu sınırı geçmiş; peşine düşebilir ya da yolunu kesebilirsin.", en: "A raiding party has crossed the border; pursue it or cut it off." } },
  { id: "s_ormandevriye", tur: "sinir", baskin: false, arazi: "orman", dusman: { okcu: 0.5, mizrakli: 0.5 }, ganimet: 0.95, kayip: 1,
    ad: { tr: "Orman Kenarı Devriyesi", en: "Forest Edge Patrol" },
    metin: { tr: "Sınır ormanında düşman devriyesiyle karşılaştın.", en: "You met an enemy patrol in the border forest." } },
  // Sınır — baskın
  { id: "s_gece", tur: "sinir", baskin: true, arazi: "orman", dusman: { suvari: 0.5, okcu: 0.5 }, ganimet: 1, kayip: 1.1,
    ad: { tr: "Gece Akını", en: "Night Incursion" },
    metin: { tr: "Sınırı aşan düşman akıncıları geceleyin ordugâhını bastı!", en: "Enemy raiders crossed the border and hit your camp by night!" } },
  { id: "s_karakolkusatma", tur: "sinir", baskin: true, arazi: "dag", dusman: { mizrakli: 0.5, okcu: 0.5 }, ganimet: 1.05, kayip: 1.1,
    ad: { tr: "Karakol Kuşatması", en: "Outpost Siege" },
    metin: { tr: "Düşman karakolunu çembere aldı!", en: "The enemy has surrounded your outpost!" } },
  { id: "s_koyyagma", tur: "sinir", baskin: true, arazi: "ova", dusman: { suvari: 0.6, zirhli: 0.4 }, ganimet: 1.1, kayip: 1.05,
    ad: { tr: "Köy Yağması", en: "Village Sack" },
    metin: { tr: "Düşman akıncıları sınır köyünü yağmalarken sana saldırdı!", en: "Enemy raiders struck you as they plundered a border village!" } },
  { id: "s_hat", tur: "sinir", baskin: true, arazi: "ova", dusman: { zirhli: 0.5, mizrakli: 0.5 }, ganimet: 1, kayip: 1.15,
    ad: { tr: "Sınır Hattı Yarılması", en: "Border Line Breach" },
    metin: { tr: "Düşman sınır hattını yarmak için üzerine yürüyor!", en: "The enemy marches to break your border line!" } },
];
export function catismaSenaryosuGetir(id: string | undefined): CatismaSenaryosu | undefined {
  return id ? CATISMA_SENARYOLARI.find((x) => x.id === id) : undefined;
}
/** Tür ve yöne göre EŞİT olasılıkla senaryo seçer. */
export function catismaSenaryosuSec(tur: "haydut" | "sinir", baskin: boolean, rnd01 = Math.random()): CatismaSenaryosu {
  const liste = CATISMA_SENARYOLARI.filter((x) => x.tur === tur && x.baskin === baskin);
  return liste[Math.min(liste.length - 1, Math.floor(rnd01 * liste.length))];
}
export const BARIS_TALIM_ZAFER = 3;
export const BARIS_TALIM_YENILGI = 1;
export const BARIS_MORAL_ZAFER = 4;
export const BARIS_MORAL_YENILGI = -4;
/** Çatışma türüne göre ordu morali (haydut hafif, sınır daha ağır) ve oyuncunun kendi morali (mutluluk). Savaş türü: ordu morali MORAL_ZAFER/MORAL_YENILGI (yıl işleme), kişi morali SAVAS_KISI_MORALI. */
export const CATISMA_ORDU_MORALI: Record<"haydut" | "sinir", { zafer: number; yenilgi: number }> = {
  haydut: { zafer: 2, yenilgi: -3 },
  sinir: { zafer: 3, yenilgi: -5 },
};
export const CATISMA_KISI_MORALI: Record<"haydut" | "sinir", { zafer: number; yenilgi: number }> = {
  haydut: { zafer: 1, yenilgi: -2 },
  sinir: { zafer: 2, yenilgi: -4 },
};
export const SAVAS_KISI_MORALI = { zafer: 6, yenilgi: -10 };
/** Yıllık erzak fiyatı dönem çarpanı (giderler üzerinden). */
/** Erzak giderinin döneme göre çarpanı: eski [0,8–1,3] bandı [0,9–1,1] aralığına sıkıştırıldı (durgunluk 1 sabit; aşağı ve yukarı ayrı ölçeklendi). */
export const ERZAK_DONEM_CARPANI = { bolluk: 0.9, durgunluk: 1, kitlik: 1.1, savas: 1.07, veba: 1.03 };
/** Nakit bu eşiğin (× enflasyon, eksi) altına inince maaş ve erzak ödenemez. */
export const ODENMEYEN_ESIK = 50;
export interface OdenmeyenCeza {
  kademe: number;
  maasGuc: number;
  erzakGuc: number;
  moral: number;
  /** Yıllık ek firar (puan, ordunun %'si) — yalnız savaşta. */
  firar: number;
  /** Savaşta ikinci eşik: kiralık ordu (paralı) toplu çekilir. */
  paraliCekilir: boolean;
  /** Seferber erlerin firar çarpanı. */
  seferFirarCarpani: number;
}
/** Savaş zamanı borç eşikleri (× enflasyon): −50 altı hafif, −200 altı ağır. Barışta eski kademeli ceza sürer. */
export const SAVAS_BORC_ESIKLERI = { hafif: 50, agir: 200 } as const;
/** Nakit eşiği altındaki her ek ODENMEYEN_ESIK için bir kademe (barış); savaşta iki sabit eşik. */
export function odenmeyenCeza(para: number, enflasyon: number, savasta = false): OdenmeyenCeza | null {
  if (savasta) {
    if (para < -SAVAS_BORC_ESIKLERI.agir * enflasyon) {
      return { kademe: 2, maasGuc: -0.12, erzakGuc: -0.13, moral: -10, firar: 4, paraliCekilir: true, seferFirarCarpani: 1.5 };
    }
    if (para < -SAVAS_BORC_ESIKLERI.hafif * enflasyon) {
      return { kademe: 1, maasGuc: -0.05, erzakGuc: -0.05, moral: -4, firar: 1.5, paraliCekilir: false, seferFirarCarpani: 1 };
    }
    return null;
  }
  const esik = ODENMEYEN_ESIK * enflasyon;
  if (para >= -esik) return null;
  const kademe = Math.floor((-para - esik) / esik) + 1;
  return {
    kademe,
    maasGuc: -Math.min(0.3, 0.15 + 0.05 * (kademe - 1)),
    erzakGuc: -Math.min(0.4, 0.22 + 0.06 * (kademe - 1)),
    moral: -Math.min(10, 6 + (kademe - 1)),
    firar: 0,
    paraliCekilir: false,
    seferFirarCarpani: 1,
  };
}

// ── Görevler (yalnız minimum er şartı) ──────────────────────────────────────
export type GorevTuru = "devriye" | "eskort" | "tahsilat" | "garnizon" | "komuta";
export interface GorevTanimi {
  id: string;
  tur: GorevTuru;
  simge: string;
  ad: { orta: DilliMetin; sanayi: DilliMetin };
  aciklama: DilliMetin;
  /** Göreve düşen (eşit bölünmüş) askeri güç bu değerin altındaysa görev açılamaz. */
  minGuc: number;
  /** Güç başına yıllık görev geliri (barışta, yaralı olmayan erlerin toplam gücü × bu); ekranda yazan değer. */
  erBasi: number;
  /** Yıllık etkiler (görev açıkken): şöhret, ordu morali, otorite ilişkisi, ahlak. Görev kademesi arttıkça farklı karışımlarla artar; oyuncuya sayı yazılmaz. */
  sohret?: number;
  moral?: number;
  otorite?: number;
  ahlak?: number;
  /** Yalnız savaşta açılabilir. */
  yalnizSavas: boolean;
  /** Er başına brüt ganimet (savaş yılında savaş çarpanıyla büyür; 0 = ganimetsiz). */
  ganimet: number;
  /** Yıllık beklenen kayıp (göreve düşen sağlam erlerin kesri): çoğunlukla yaralı, az ölü, ara sıra firar. Kazandıran görev daha çok kaybettirir. */
  kayip: { yarali: number; olu: number; firar: number };
  /** Sertlik değişimi (yıllık) bu görev açıkken. */
  sertlik: number;
  /** Savaşta gelir çarpanı. */
  savasCarpani: number;
  /** Senaryo etiketi (birlik türü bonusu için). */
  senaryo: "haydut" | "sinir" | "savas" | null;
}
export const GOREVLER: GorevTanimi[] = [
  {
    id: "devriye", tur: "devriye", simge: "🏮", minGuc: 10, erBasi: 0.55, moral: 0.2, yalnizSavas: false, ganimet: 0,
    kayip: { yarali: 0.003, olu: 0.0003, firar: 0.0005 }, sertlik: 0, savasCarpani: 1.1, senaryo: null,
    ad: { orta: { tr: "Nöbet ve Devriye", en: "Watch & Patrol" }, sanayi: { tr: "Asayiş ve Devriye", en: "Policing & Patrol" } },
    aciklama: { tr: "Sakin ve güvenli; küçük ama düzenli gelir.", en: "Calm and safe; small but steady income." },
  },
  {
    id: "eskort", tur: "eskort", simge: "🐫", minGuc: 40, erBasi: 0.5875, sohret: 0.3, otorite: 0.3, yalnizSavas: false, ganimet: 0,
    kayip: { yarali: 0.006, olu: 0.0006, firar: 0.001 }, sertlik: 0, savasCarpani: 0.7, senaryo: null,
    ad: { orta: { tr: "Kervan Eskortu", en: "Caravan Escort" }, sanayi: { tr: "Demiryolu ve Kervan Koruması", en: "Railway & Convoy Guard" } },
    aciklama: { tr: "Bollukta artar, savaşta düşer, kıtlıkta haydut yüzünden çok iş çıkar.", en: "Rises in boom, falls in war, plentiful in famine because of bandits." },
  },
  {
    id: "tahsilat", tur: "tahsilat", simge: "💰", minGuc: 80, erBasi: 0.625, otorite: 0.4, sohret: -0.3, yalnizSavas: false, ganimet: 0,
    kayip: { yarali: 0.01, olu: 0.001, firar: 0.002 }, sertlik: 1.2, savasCarpani: 1, senaryo: null,
    ad: { orta: { tr: "Haraç ve Vergi Tahsilatı", en: "Tribute & Tax Collection" }, sanayi: { tr: "Jandarma ve Vergi Tahsilatı", en: "Gendarmerie & Tax Collection" } },
    aciklama: { tr: "Yüksek gelir; sertliği ve halk tepkisini yükseltir.", en: "High income; raises harshness and public anger." },
  },
  {
    id: "garnizon", tur: "garnizon", simge: "🏰", minGuc: 145, erBasi: 0.6625, moral: 0.3, otorite: 0.5, yalnizSavas: false, ganimet: 0,
    kayip: { yarali: 0.015, olu: 0.0017, firar: 0.003 }, sertlik: 0, savasCarpani: 1.2, senaryo: "sinir",
    ad: { orta: { tr: "Sınır ve Kale Garnizonu", en: "Border & Castle Garrison" }, sanayi: { tr: "Sınır ve Liman Garnizonu", en: "Border & Harbour Garrison" } },
    aciklama: { tr: "İstikrarlı gelir; sınır olaylarında okçu ve mızraklı güçlenir.", en: "Steady income; archers and spearmen shine in border clashes." },
  },
  {
    id: "komuta", tur: "komuta", simge: "🏯", minGuc: 250, erBasi: 0.7, moral: 0.6, sohret: 1.2, otorite: 0.6, yalnizSavas: false, ganimet: 0.05,
    kayip: { yarali: 0.022, olu: 0.0025, firar: 0.004 }, sertlik: 0, savasCarpani: 1.15, senaryo: "sinir",
    ad: { orta: { tr: "Eyalet ve Kale Komutanlığı", en: "Province & Castle Command" }, sanayi: { tr: "Eyalet Garnizon Komutanlığı", en: "Provincial Command" } },
    aciklama: { tr: "Büyük ordu ister; en yüksek kazanç ve şöhret, en çok kayıp.", en: "Needs a big army; the highest earnings and renown, and the heaviest losses." },
  },
];
/** Görev kaybı: firar her yıl değil, bu olasılıkla "ara sıra" olur (olduğunda beklenen yıllık oranın 1/olasılık katı); bildirim yalnız belirgin yıllarda. */
/** Görevin kayıp riski seviyesi (1–5; arayüzde sayı yazılmaz, yalnız işaret): kayıp oranlarının sırasına göre. */
export function gorevRiski(g: GorevTanimi): number {
  const sira = [...GOREVLER].sort((a, b) => a.kayip.yarali - b.kayip.yarali);
  return sira.findIndex((x) => x.id === g.id) + 1;
}
export const GOREV_FIRAR_YIL_IHTIMALI = 0.3;
/** Barışta görev kaybı bildirimi: kayıp ordunun %5'ini (en az 4 er) aşarsa her zaman; daha azsa yalnız bu olasılıkla ("ara sıra"). */
export const GOREV_KAYIP_BILDIRIM_ESIGI = { mutlak: 4, oran: 0.05, ihtimal: 0.3 };
/** (v67: görev geliri artık ER sayısına bağlı — gorevErOrani; bu güç bantları yalnız eski gösterge/test içindir.) Görev geliri güçle azalan verimle ödenirdi: her güç dilimi kendi çarpanıyla sayılırdı. */
export const GOREV_BANTLARI: [number, number, number][] = [[0, 150, 1], [150, 300, 0.9], [300, 450, 0.75], [450, 600, 0.6], [600, Infinity, 0.45]];
export function gorevGucOrani(guc: number): number {
  if (guc <= 0) return 1;
  let t = 0;
  for (const [lo, hi, f] of GOREV_BANTLARI) t += Math.max(0, Math.min(guc, hi) - lo) * f;
  return t / guc;
}
export function gorevGetir(id: string): GorevTanimi | undefined {
  return GOREVLER.find((g) => g.id === id);
}
export function gorevAdi(g: GorevTanimi, cag: string): DilliMetin {
  return cag === "Sanayi Devrimi" ? g.ad.sanayi : g.ad.orta;
}
/** Rütbe S1..S5 → aynı anda açık görev sayısı. */
export const GOREV_SLOTLARI = [1, 1, 1, 1, 1];
/** Görev × dönem gelir çarpanı (anahtar yoksa 1). */
type DonemAnahtari = "bolluk" | "durgunluk" | "kitlik" | "veba";
export const GOREV_DONEM_CARPANI: Partial<Record<GorevTuru, Partial<Record<DonemAnahtari, number>>>> = {
  // Her görevin üç dönem ortalaması 1,00'dır; görevin `erBasi`'si doğrudan 3 dönem ortalamasıdır.
  devriye: { bolluk: 1.1, durgunluk: 0.9, kitlik: 1 },
  eskort: { bolluk: 1.364, durgunluk: 0.636, kitlik: 1 },
  tahsilat: { bolluk: 1.3, durgunluk: 1, kitlik: 0.7 },
  garnizon: { bolluk: 0.9, durgunluk: 1.1, kitlik: 1 },
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
export type AraziBirimi = "piyade" | BirlikTur;
export type AraziYonu = "saldiri" | "savunma";
const araziSatiri = (arazi: BirlikArazi): Record<AraziBirimi, { saldiri: number; savunma: number }> => {
  const r = { piyade: { saldiri: 1, savunma: 1 } } as Record<AraziBirimi, { saldiri: number; savunma: number }>;
  for (const t of Object.keys(TUR_TANIMLARI) as BirlikTur[]) r[t] = TUR_TANIMLARI[t].arazi[arazi];
  return r;
};
export const ARAZI_CARPANLARI: Record<BirlikArazi, Record<AraziBirimi, { saldiri: number; savunma: number }>> = {
  ova: araziSatiri("ova"),
  dag: araziSatiri("dag"),
  orman: araziSatiri("orman"),
};
/** Karma düşmanın arazi ortalaması üç arazide ortalama 1 olsun diye (her yön için ayrı) bölünen sabit: karma hiçbir arazide kendiliğinden avantaj almaz. */
const karmaOrtalama = (a: Record<AraziBirimi, { saldiri: number; savunma: number }>, yon: AraziYonu) => (a.piyade[yon] + a.mizrakli[yon] + a.okcu[yon] + a.suvari[yon] + a.zirhli[yon]) / 5;
const KARMA_ARAZI_NORMU: Record<AraziYonu, number> = {
  saldiri: (["ova", "dag", "orman"] as BirlikArazi[]).reduce((t, ar) => t + karmaOrtalama(ARAZI_CARPANLARI[ar], "saldiri"), 0) / 3,
  savunma: (["ova", "dag", "orman"] as BirlikArazi[]).reduce((t, ar) => t + karmaOrtalama(ARAZI_CARPANLARI[ar], "savunma"), 0) / 3,
};
/** Düşmanın baskın türüne göre arazi çarpanı; `yon` düşmanın o karşılaşmadaki tarafı (sen saldırırken o SAVUNUR, sen savunurken o SALDIRIR). "karma" = ortalama. */
export function dusmanAraziCarpani(arazi: BirlikArazi, tur: BirlikTur | "karma", yon: AraziYonu): number {
  const a = ARAZI_CARPANLARI[arazi];
  if (tur === "karma") return karmaOrtalama(a, yon) / KARMA_ARAZI_NORMU[yon];
  return a[tur][yon];
}
/** Düşmanın saldırı/savunma dağılımı (baskın türe göre; ikisinin ortalaması 1 → toplam güç değişmez). */
export function dusmanSaldiriSavunma(tur: BirlikTur | "karma"): { saldiri: number; savunma: number } {
  if (tur === "karma") return { saldiri: 1, savunma: 1 };
  const t = TUR_TANIMLARI[tur];
  const top = t.saldiri + t.savunma;
  return { saldiri: (2 * t.saldiri) / top, savunma: (2 * t.savunma) / top };
}
/**
 * Barış çatışmasında düşmanın arazi çarpanı katalog ortalamasına bölünür: senaryolar düşmanın elverişli birliğini elverişli arazisiyle eşleştirdiği için
 * (süvari ovada, okçu dağ/ormanda…) ham çarpan ortalamada düşman lehine (~+%13–18) olurdu. Normalleştirilince senaryolar arası çeşitlilik kalır, ortalama 1'dir.
 */
export const BARIS_DUSMAN_ARAZI_NORMU: Record<AraziYonu, number> = (() => {
  const ort = (yon: AraziYonu) =>
    CATISMA_SENARYOLARI.reduce((t, sen) => {
      const e = (Object.entries(sen.dusman) as [DusmanBirlik, number][]).reduce((u, [tur, w]) => u + w * dusmanAraziCarpani(sen.arazi, tur === "karma" ? "karma" : tur, yon), 0);
      return t + e;
    }, 0) / CATISMA_SENARYOLARI.length;
  return { saldiri: ort("saldiri"), savunma: ort("savunma") };
})();
/** Barış çatışmasında düşmanın (normalleştirilmiş) arazi çarpanı. */
export function barisDusmanAraziCarpani(arazi: BirlikArazi, tur: BirlikTur | "karma", yon: AraziYonu): number {
  return dusmanAraziCarpani(arazi, tur, yon) / BARIS_DUSMAN_ARAZI_NORMU[yon];
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
/** Büyük savaşta düşman gücü sapması: referans × [0,95; 1,05] (savaş başında bir kez çekilir; oyuncuya ±%6,5 aralık olarak gösterilir, Keşif ile ±%2,5'e kadar). */
export const DUSMAN_ORAN: [number, number] = [0.95, 1.05];
/** Savaş günü / çatışma zarı: her taraf güç × (1 ± %4) (d20: (zar − 10,5) / SAVAS_ZAR_BOLEN, uçlar ±9,5 → ±%4, iki taraf için de). */
export const SAVAS_ZAR_YUZDE = 0.04;
export const SAVAS_ZAR_BOLEN = 9.5 / SAVAS_ZAR_YUZDE;
/**
 * Düşmanın MUTLAK gücü (bizim gücümüzden bağımsız). Referans karakterin YAŞINA göre büyür ("zamanla tehlike artar"):
 * rütbeye bağlamak, rütbenin kendisi güçten çıktığı için yatırımın etkisini siler. Büyük savaşta × DUSMAN_ORAN,
 * barış çatışmasında BARIS_CATISMALARI.dusman aralığı çarpılır. Kalibrasyonun tek düğmesi: [yaş, referans güç] (aralarda doğrusal).
 */
export const DUSMAN_REFERANS_YAS: [number, number][] = [
  [15, 21],
  [25, 30],
  [35, 60],
  [45, 98],
  [55, 150],
  [65, 218],
  [80, 315],
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

/**
 * Büyük savaştaki düşmanın yaşa göre mutlak gücü (kalibrasyon tablosu: [yaş, güç], aralarda doğrusal). `DUSMAN_REFERANS_YAS`
 * yalnız Asker kariyer puanının ölçeği olarak kalır (rütbe hızı değişmesin); savaş düşmanı bu tablodan gelir.
 */
export function savasDusmanGucuYas(yas: number): number {
  return dusmanGucuYas(yas, "savas");
}
/** d20 zarın güce katkısı: güç × (zar − 10,5)/40 (±%24). */
export const ZAR_BOLEN = 40;
/** Düşman baskın türüne karşı doğru birliğin (payı %15'i doldurunca) güç bonusu. */
export const KARSI_TUR_BONUSU = 0.1;
/** Düşmanın baskın türü → ona karşı etkili birlik (zincir: mızraklı → süvari → okçu → zırhlı → mızraklı). */
export const KARSI_TUR: Partial<Record<BirlikTur, BirlikTur>> = { suvari: "mizrakli", okcu: "suvari", zirhli: "okcu", mizrakli: "zirhli" };

export const ROL_TANIMLARI: Record<BirlikRol, { ganimet: number; kayip: number; zar: number; moral: number; ad: DilliMetin; aciklama: DilliMetin }> = {
  onc: {
    ganimet: 1.3, kayip: 1.4, zar: 0.05, moral: 0,
    ad: { tr: "Öncü", en: "Vanguard" },
    aciklama: { tr: "Ganimet ×1,3, kayıp ×1,4, çarpışmada küçük avantaj.", en: "Loot ×1.3, losses ×1.4, a slight edge in the clash." },
  },
  ana: {
    ganimet: 1, kayip: 1, zar: 0, moral: 0,
    ad: { tr: "Ana kuvvet", en: "Main body" },
    aciklama: { tr: "Dengeli.", en: "Balanced." },
  },
  yedek: {
    ganimet: 0.6, kayip: 0.6, zar: -0.04, moral: 0,
    ad: { tr: "Yedek", en: "Reserve" },
    aciklama: { tr: "Ganimet ×0,6, kayıp ×0,6, çarpışmada küçük dezavantaj.", en: "Loot ×0.6, losses ×0.6, a slight disadvantage in the clash." },
  },
};
export const ROL_SIRASI: BirlikRol[] = ["onc", "ana", "yedek"];

/** Yağma türü: yıllık yağma geliri = askerî güç × gucOrani (savaşın ilk YAGMA_YIL yılı); ahlak/mutluluk (oyuncu) ve ordu morali o yağma yılı için bir kerelik değişir. */
export interface YagmaTuru {
  gucOrani: number;
  /** Savaş boyunca (yalnız savaşta) erzak giderinden düşen oran: sert %75, orta %55, yumuşak %35. */
  erzakIndirimi: number;
  ahlak: number;
  mutluluk: number;
  moral: number;
  /** Yağma yıllarında (savaşın ilk YAGMA_YIL yılı) savaş yılı ölü ve firar yüzdelerine çarpan: sert yağma halkı ve ordu hırsını çoğaltır. */
  kayip: number;
}
/** Savaş planındaki ikmal kararı = yalnız üç yağma türü (sert / orta / yumuşak). */
export const IKMAL_TANIMLARI: Record<
  BirlikIkmal,
  { erzakOran: number; maliyet: number; sertlik: number; ganimet: number; yagma: YagmaTuru; ad: DilliMetin; aciklama: DilliMetin }
> = {
  yagma_sert: {
    erzakOran: 0, maliyet: 1, sertlik: 2.5, ganimet: 1,
    yagma: { gucOrani: 0.51, erzakIndirimi: 0.75, ahlak: -3, mutluluk: -3, moral: 4, kayip: 1.15 },
    ad: { tr: "Sert yağma", en: "Harsh plunder" },
    aciklama: { tr: "Köyleri soyarsın: en çok para; ordu coşar ama halk direnir, kayıplar artar, vicdanın ve keyfin kaçar.", en: "You strip the villages bare: the most coin; the men are exalted, but the people fight back, losses rise, and your conscience and spirits sink." },
  },
  yagma_orta: {
    erzakOran: 0, maliyet: 1, sertlik: 1.5, ganimet: 1,
    yagma: { gucOrani: 0.35, erzakIndirimi: 0.55, ahlak: 0, mutluluk: 0, moral: 0, kayip: 1 },
    ad: { tr: "Orta yağma", en: "Moderate plunder" },
    aciklama: { tr: "Köylerden ölçülü ganimet; ne ordunun ne senin moralin değişir.", en: "Measured loot from the villages; neither the army's morale nor yours shifts." },
  },
  yagma_yumusak: {
    erzakOran: 0, maliyet: 1, sertlik: 0.5, ganimet: 1,
    yagma: { gucOrani: 0.19, erzakIndirimi: 0.35, ahlak: 3, mutluluk: 3, moral: -4, kayip: 0.85 },
    ad: { tr: "Yumuşak yağma", en: "Gentle plunder" },
    aciklama: { tr: "Az para toplarsın; halka kıymazsın, kayıplar azalır, vicdanın ve keyfin yerinde olur ama ordu söylenir.", en: "You gather little; you spare the people, losses ease, and your conscience and spirits stay light, but the men grumble." },
  },
};
export const IKMAL_SIRASI: BirlikIkmal[] = ["yagma_sert", "yagma_orta", "yagma_yumusak"];

export const SEFERBERLIK_TANIMLARI: Record<
  BirlikSeferberlik,
  {
    /** Ordunun bu kesri kadar er çağrılır (tam sayıya yuvarlanır). */
    er: number;
    /** Çağrı anında bir kerelik ordu morali. */
    moral: number;
    /** Savaşın İLK İKİ YILINDA çağrılan erlerden EK olarak firar eden TOPLAM % (iki yıla rastgele bölünür; ön yıl kayıp toplamından ayrıdır). */
    firar: number;
    erzak: number;
    /** Çağrılan erlerin giriş talimi (sabit). Ordunun gerçek talimi bozulmaz (etkin talim hesabı); savaş bitince ortalamaya katılır. Teçhizat kalitesi ordunun `hedef_kalite`'sidir (v67 Madde 6). */
    talim: number;
    /** Bir kerelik halk bedeli: ahlak, mutluluk (oyuncu) ve şöhret. */
    ahlak: number;
    mutluluk: number;
    sohret: number;
    ad: DilliMetin;
    aciklama: DilliMetin;
  }
> = {
  secme: {
    er: 0.08, moral: -7, firar: 5, erzak: 0.04, talim: 55, ahlak: 0, mutluluk: 0, sohret: 0,
    ad: { tr: "Gazi Çağrısı", en: "Veterans' Call" },
    aciklama: { tr: "Eski gaziler silah başına: az ama eğitimli; moral düşer.", en: "Old veterans take up arms: few but trained; morale dips." },
  },
  genel: {
    er: 0.2, moral: -15, firar: 8, erzak: 0.15, talim: 10, ahlak: -2, mutluluk: -2, sohret: -1,
    ad: { tr: "Tüm Erkekler", en: "Every Man" },
    aciklama: { tr: "Bütün erkekler silah altında: büyük ama eğitimsiz ordu; moral düşer, firar yüksek, halk ve şöhretin zarar görür.", en: "Every man is under arms: a big but untrained army; morale falls, desertion runs high, and the people and your renown suffer." },
  },
};
/** Küçükten büyüğe. */
export const SEFERBERLIK_SIRASI: BirlikSeferberlik[] = ["secme", "genel"];
/** Savaş sonunda seferberlik erlerinden (sağlam + yaralı) hayatta kalanların kadroda kalan oranı. */
/** Savaş sonunda seferberlerin HEPSİ (hayatta kalanlar) ordunun sıradan eri olarak kadroda kalır. */
export const SEFERBERLIK_KALMA_ZAFER: Aralik = [1, 1];
export const SEFERBERLIK_KALMA_YENILGI: Aralik = [1, 1];

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
/** Doktrin kartlarının faydalı bonusları (artı güç/gelir/moral…, eksi kayıp/masraf/firar) bu kadar büyütülür (v67: ×1,15); bedeller (artı kayıp/masraf, eksi moral/ahlak/otorite) aynı kalır. */
const DOKTRIN_BONUS_CARPANI = 1.15;
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
export const DEVSIRME_BUROSU_ER = [0, 1, 2, 3, 4];
export const KARAKOL_KORUMA = [0, 0.15, 0.3, 0.45, 0.6];

// ── Savaş ekonomisi (2026-11): görev geliri yok; savaş ödeneği, yağma, büyük zafer ganimeti ──
/** Savaş sürerken görevlerden gelir yok; sabit maaş aynen sürer, asker başı kısım ×SAVAS_ER_BASI_CARPANI. */
/** Yağma ikmali (yıllık): ganimet = askerî güç × yağma türünün gucOrani'si (IKMAL_TANIMLARI.yagma: sert 0,7 / ölçülü 0,5 / yumuşak 0,3); yalnız savaşın karar savaşından önceki YAGMA_YIL yılında, yenilgi sonrası yok. Erzak masrafı savaş boyunca yağma türüne göre %75/55/35 düşer (YagmaTuru.erzakIndirimi); esir/yeni er oranları. */
export const YAGMA_YIL = 3;
export const YAGMA_ESIR = 0.0053;
/** Savaş zaferi (savaş sonu, genel zafer, tek seferde): ganimet = ganimetEtkinGuc(max(40; askerî güç)) × U(11; 14); esir = güç × bu × yıl. Yenilgide ganimet yok. */
export const SAVAS_ZAFER_GANIMET: Aralik = [11, 14];
export const SAVAS_ZAFER_ESIR = 0.02;
/** Kiralık ordu (paralı asker): savaş başına bir kez, iki seviye; savaş süresince tutulur, eğitimli ve pahalıdır. Peşin ve yıllık ücret er başınadır (× gider enflasyonu); yıllık ücret erzak ve masrafı da kapsar (ayrı erzak/er masrafı yok). */
export type KiralikSeviye = "kucuk" | "buyuk";
export const KIRALIK_SEVIYELERI: Record<KiralikSeviye, { oran: number; moral: number; ad: DilliMetin }> = {
  kucuk: { oran: 0.2, moral: -7, ad: { tr: "Küçük paralı birlik", en: "Small mercenary band" } },
  buyuk: { oran: 0.4, moral: -14, ad: { tr: "Büyük paralı ordu", en: "Large mercenary army" } },
};
export const KIRALIK_SIRASI: KiralikSeviye[] = ["kucuk", "buyuk"];
export const KIRALIK_PESIN = 6.4;
export const KIRALIK_YILLIK = 2.4;
export const KIRALIK_KALITE_CARPANI = 1.4; // yüksek kalite (1,25) × eğitimli (+%14 ≈ 1,43)
/** Kale: bu askerî güç eşiğinin üstünde ve savaş genel zaferle biterse ele geçirilir. */
export const KALE_GUC_ESIGI = 150;
export const KALE_MAKS = 2;
/** Kale başı yıllık net gelir (fetihte aralıktan çekilir) ve yıllık şöhret. */
export const KALE_GELIR: Aralik = [12, 14];
export const KALE_SOHRET = 0.5;
export const KALE_KOMUTA_BONUSU = 15;
/** Haçlı/sefer yolculuğu: ordunun bu kesri seferde, kalanı görevlerine devam eder. */
export const SEFER_ORDU_ORANI = 0.5;
export const SEFER_DONUS_TALIM = 5;
export const SEFER_DONUS_MORAL = 3;

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

// ── Hazine payı: KAZANÇ (= ELE KALAN: ordu neti − subay − yaşam − kira − hayvan − kredi + mülk; enflasyonsuz yıllık) üzerinden kademeli vergi, en çok %40. Zararda vergi yok. ORDU NETİNDEN DEĞİL, son kazançtan alınır. ──
export const HAZINE_KADEMELERI: [number, number, number][] = [[0, 100, 0.1], [100, 250, 0.15], [250, 500, 0.25], [500, 900, 0.35], [900, Infinity, 0.4]];
export function hazinePayi(reelNet: number): number {
  if (!(reelNet > 0)) return 0;
  let t = 0;
  for (const [lo, hi, o] of HAZINE_KADEMELERI) t += Math.max(0, Math.min(reelNet, hi) - lo) * o;
  return t;
}

// ── Sonuca göre şöhret (v65): zafer kazandırır, yenilgi götürür; tam sayıya olasılıkla yuvarlanır ──
/** [en az, en çok] şöhret değişimi büyüklüğü (zafer +, yenilgi −). Çatışmada güç farkına göre (ezici zafer/yenilgi üst uçta), savaşta aralıktan çekilir. */
export const SOHRET_SONUCU: Record<"haydut" | "sinir" | "savas", { zafer: [number, number]; yenilgi: [number, number] }> = {
  haydut: { zafer: [0, 1], yenilgi: [0, 1] },
  sinir: { zafer: [1, 2], yenilgi: [1, 2] },
  savas: { zafer: [6.5, 8], yenilgi: [3, 5] },
};
/** Baskın (zorunlu savunma): başarılı savunma ekstra şöhret, yenilgi ekstra itibar kaybı. */
export const SOHRET_BASKIN = { zafer: 1, yenilgi: 1 };

// ── Zafer serisi (v67): aynı türde arka arkaya 2 zafer → sıradaki karşılaşmada düşman ×1,2 ("hazırlıklı"); 4 zafer → ×1,5; yenilgi sayacı sıfırlar ──
/** Seri sayaçları her tür için AYRIDIR: haydut, sınır, büyük savaş. Bonuslar ÜST ÜSTE BİNMEZ: 2-3 zaferde ×1,2, 4 ve üstü (5, 6, 7…) ×1,5. */
export const ZAFER_SERISI_ESIGI = 2;
export const ZAFER_SERISI_DUSMAN_ARTISI = 0.2;
/** Aynı türde arka arkaya 4 zafer: bonus kademe atlar (düşman ×1,5); yenilgi sayacı sıfırlar, etki seri sürdükçe KALICIDIR. */
export const ZAFER_SERISI_ESIGI_2 = 4;
export const ZAFER_SERISI_DUSMAN_ARTISI_2 = 0.5;
export type ZaferSerisi = { haydut: number; sinir: number; savas: number };
export const ZAFER_SERISI_BOS: ZaferSerisi = { haydut: 0, sinir: 0, savas: 0 };

// ── Görev gelirinde er sayısına bağlı azalan verim (v67 Madde 7): ilk 100 er tam verim; sonra doğrusal düşer, en büyük kışla kapasitesinde (500) %75 ──
export const GOREV_VERIM_TAM_ER = 100;
export const GOREV_VERIM_KAPASITE_ORANI = 0.75;
/** Göreve çıkan er sayısı için gelir çarpanı (ortalama verim): er ≤ 100 → 1; 500 erde 0,75; arası doğrusal. Toplam gelir (er × verim) kapasiteye kadar hep artar. */
export function gorevErOrani(er: number): number {
  const kap = KISLA_ER_LIMITI[KISLA_ER_LIMITI.length - 1];
  if (er <= GOREV_VERIM_TAM_ER) return 1;
  const k = Math.min(er, kap);
  return 1 - (1 - GOREV_VERIM_KAPASITE_ORANI) * ((k - GOREV_VERIM_TAM_ER) / (kap - GOREV_VERIM_TAM_ER));
}

// ── Büyük savaş yenilgisinde bozgun firarı (v68): yalnız TÜM ORDU yenilgisi (büyük savaş); karar savaşından sonraki ilk yıl (savaşın 4. yılı) ──
/** 4. yıl firarı ordunun %'si; savaş kayıp tavanının (SAVAS_KAYIP_TAVANI) DIŞINDA sayılır (bozgun: ordu dağılır). Eskiden bu yıl %2–3,5'ti (tavana da takılırdı). */
export const SAVAS_BOZGUN_FIRARI: Aralik = [5, 7];
/** Süvari birimi görev geliri bonusu (haydut avı/akın görevleri kalkınca Haraç ve Vergi Tahsilatı'na taşındı). */
export const SUVARI_GOREV_GELIRI = 0.1;
export const SUVARI_BONUS_GOREVLERI: string[] = ["tahsilat"];
