// Aile / evlilik / çocuk sisteminin TÜM ayarlanabilir sayıları tek yerde.
// Mantık: game/aileSistemi.ts (saf fonksiyonlar). Para tutarları "taban"dır —
// kullanım yerinde enflasyonCarpani ile çarpılır.

import { AileHuy, DugunButcesi, TeklifHediyesi } from "../types";

// ---------- Mantık evliliği ----------
/** Mantık evliliği aday listesinin açıldığı en düşük yaş. */
export const MANTIK_MIN_YAS = 22;
export const MANTIK_ADAY_SAYISI = 3;
/** Liste bu kadar yılda bir yenilenir (5-6 arası rastgele). */
export const MANTIK_YENILEME_YIL: [number, number] = [5, 6];
/** Reddedilen teklif sonrası mantık sistemi bu kadar yıl kilitli. */
export const MANTIK_RED_KILIT_YIL = 2;
/** Adayın (kadın) yaş aralıkları. */
export const ADAY_GENC_YAS: [number, number] = [27, 33];
export const ADAY_OLGUN_YAS: [number, number] = [38, 43];
/** Adayın genç/olgun olma olasılığı (olgun = daha az). */
export const ADAY_OLGUN_ORANI = 0.4;

/** Genç adayın standart çeyizi (taban, ±%20 oynar); olgun adayda ×OLGUN_CARPANI. */
export const CEYIZ_GENC_TABAN = 30;
/** Genç mantık eşinin "meslek bonusu" (maaş yüzdesi). Olgun ×OLGUN_CARPANI, aşk ×ASK_BONUS_ORANI. */
export const MESLEK_BONUSU_GENC = 4;
export const OLGUN_CARPANI = 1.5;
export const ASK_BONUS_ORANI = 0.5;

/** Teklif temel şansı (%) hediye kademesine göre. */
export const TEKLIF_SANSI: Record<TeklifHediyesi, number> = { sade: 50, ucuz: 62, pahali: 82 };
/** Teklif hediyesinin taban maliyeti (sade = 0). */
export const TEKLIF_HEDIYE_MALIYETI: Record<TeklifHediyesi, number> = { sade: 0, ucuz: 8, pahali: 28 };
/** Aşk evliliğinde teklif şansı = clamp(bar − düşüş, alt, üst). */
export const ASK_TEKLIF_BAR_DUSUSU = 10;
export const ASK_TEKLIF_SANS_ARALIK: [number, number] = [20, 95];
/** Aşk teklifi reddedilince ilişki bar kaybı. */
export const ASK_TEKLIF_RED_BAR_KAYBI = 10;

// ---------- Düğün ----------
export interface DugunTanimi {
  /** İlişki başlangıcına eklenen değer. */
  iliski: number;
  /** Şöhret (un) değişimi. */
  un: number;
  /** Taban maliyet (enflasyonlu). */
  maliyet: number;
}
export const DUGUN: Record<DugunButcesi, DugunTanimi> = {
  ucuz: { iliski: -20, un: -4, maliyet: 4 },
  orta: { iliski: 5, un: 0, maliyet: 18 },
  pahali: { iliski: 25, un: 8, maliyet: 60 },
};
/** Evlilik anındaki taban ilişki aralığı (düğün değeri eklenmeden). */
export const BASLANGIC_ILISKI: Record<"ask" | "mantik", [number, number]> = {
  ask: [68, 79],
  mantik: [51, 61],
};

// ---------- İlişki barı eylemleri ----------
/** Zaman geçir: ücretsiz ama zayıf; küçük bir yorgunluk bedeli (enerji statı yok). */
export const ZAMAN_GECIR = { artis: [4, 8] as [number, number], saglik: -2, bekleme: 2 };
/** Hediye ver: para karşılığı, zamandan güçlü. */
export const HEDIYE_VER: Record<"ucuz" | "pahali", { artis: [number, number]; maliyet: number }> = {
  ucuz: { artis: [8, 10], maliyet: 10 },
  pahali: { artis: [14, 17], maliyet: 30 },
};
export const HEDIYE_BEKLEME = 2;

/** Gizli yıllık otomatik düşüş (oyuncuya hiçbir yerde gösterilmez). */
export const GIZLI_YILLIK_DUSUS = 1;
/** "Ciddi" huylu eşte gizli düşüş daha yavaş. */
export const CIDDI_GIZLI_DUSUS = 0.5;

/** Son "zaman geçir"den sonra bu kadar yıl ceza işlemez. */
export const IHMAL_MUAF_YIL = 2;
/** İhmal yılına (muaf yıllar sonrası değil, toplam) göre yıllık ceza: [ihmal yılı üst sınırı, ceza]. */
export const IHMAL_KADEMELERI: { azami: number; ceza: number }[] = [
  { azami: 5, ceza: 3 },
  { azami: 10, ceza: 4 },
  { azami: Infinity, ceza: 5 },
];
/** Bu yıl kadar ihmalden sonra tek seferlik uyarı olayı tetiklenir. */
export const IHMAL_UYARI_YIL = 7;

/** Bar bunun altındayken `es_dusuk_yil` birikir. */
export const DUSUK_BAR_ESIGI = 20;
/** Bar bu kadar yıl boyunca düşük kalırsa eş terk eder: [en az, en çok] (evlilikte rastgele seçilir). */
export const TERK_YIL_ARALIK: [number, number] = [2, 3];

// ---------- Doğum ----------
export const ES_MAKS_DOGUM = 5;
/** Eşin hamile kalabileceği son yaş (50 dahil değil). */
export const ES_MAKS_DOGUM_YAS = 50;
/** n. doğumdan sonra beklenecek yıl (n = 1..5). */
export const HAMILELIK_BEKLEME_YIL = [3, 4, 5, 6, 7];
/** İlişki barına göre yıllık doğum olasılığı: [bar alt sınırı, olasılık]. En yüksek eşleşen uygulanır. */
export const DOGUM_BANDLARI: { min: number; sans: number }[] = [
  { min: 90, sans: 0.23 },
  { min: 75, sans: 0.18 },
  { min: 60, sans: 0.12 },
  { min: 40, sans: 0.06 },
];
/** Olgun evlenilen eşte doğum şansı çarpanı. */
export const OLGUN_DOGUM_CARPANI = 0.25;
/** Doğum başına komplikasyon olasılığı; bunun BEBEK_PAYI kadarı bebeği, kalanı anneyi etkiler. */
export const DOGUM_KOMPLIKASYON = 0.3;
export const KOMPLIKASYON_BEBEK_PAYI = 0.7;
/** Bebek komplikasyonunda ölüm doğumdan sonra en geç bu kadar yıl içinde. */
export const BEBEK_OLUM_PENCERE_YIL = 3;
/** Ömür boyu toplam çocuk tavanı (birden çok evlilik dahil). */
export const OMUR_COCUK_TAVANI = 8;

/** Çocuğun baba mesleğine yatkınlığı: [yatkın, uyumsuz] olasılıkları (kalan nötr). */
export const COCUK_YATKINLIK_ORAN = { yatkin: 0.7, uyumsuz: 0.2 };

// ---------- Yas ve yaşlılık ----------
/** Eş ölümünden sonra yas (yıl) ve terk sonrası kısa yas. */
export const YAS_OLUM_YIL = 3;
export const YAS_TERK_YIL = 1;
/** Yas süresince yıllık mutluluk kaybı. */
export const YAS_MUTLULUK_YILLIK = 1;
/** Eşin yaşlılıktan ölme riski (yıllık): [yaş alt sınırı, olasılık], en yüksek eşleşen uygulanır. */
export const ES_YASLILIK_OLUM: { min: number; sans: number }[] = [
  { min: 80, sans: 0.1 },
  { min: 70, sans: 0.05 },
  { min: 65, sans: 0.02 },
];

// ---------- Gizli huylar ----------
export const HUYLAR: AileHuy[] = ["mizahsever", "parasever", "ciddi", "maceraci", "sefkatli", "gururlu"];
/** Huyun hediye / zaman geçirme etkisine çarpanı. */
export const HUY_ETKI_CARPANI = 1.25;
export const HUY_HEDIYE: AileHuy[] = ["parasever", "gururlu"];
export const HUY_ZAMAN: AileHuy[] = ["mizahsever", "sefkatli", "maceraci"];

// ---------- Risk: eşin bar kaybı ----------
/** Karanlık işlerin eş ilişkisine verdiği anlık zarar (bar puanı). */
export const KOTU_IS_ES_ZARARI: Record<string, number> = {
  rakibi_korkut: 4,
  adam_dov: 6,
  rakibi_dov: 8,
  birini_soy: 8,
  isyeri_yak: 12,
};
/** Tek seçimde aranma artışı bu eşiği aşarsa eş ilişkisi düşer. */
export const SUC_ES_ESIGI = 20;
export const SUC_ES_ZARARI = 6;
/** `sir:*` etiketi ekleyen seçimlerin eşe zararı. */
export const SIR_ES_ZARARI = 8;

// ---------- Aşk evliliği: tanışma + sevgili ----------
/** Tanışma diyaloğunun adım sayısı (3 ya da 4, rastgele). */
export const TANISMA_ADIM_ARALIK: [number, number] = [3, 4];
/** Adım temel başarı şansı (%) ve huy eşleşme/uyumsuzluk etkisi (puan). */
export const TANISMA_BAZ_SANS = 50;
export const TANISMA_ESLESME_BONUSU = 20;
export const TANISMA_UYUMSUZLUK_CEZASI = 15;
export const TANISMA_SANS_ARALIK: [number, number] = [10, 92];
/** Tanışmanın başarılı sayılması için gereken başarılı adım sayısı = toplam − bu kadar. */
export const TANISMA_TOLERANS = 1;
/** Bekar oyuncu bir sosyalleşme mekânına girdiğinde tanışma çıkma olasılığı. */
export const TANISMA_MEKAN_SANSI = 0.12;
/** Bekar karaktere bu yaşlarda (ilk fırsatta) zorunlu tanışma fırsatı sunulur. */
export const TANISMA_DONUMLERI = [26, 36];
/** Vazgeçilen tanışmanın nostalji olayı bu kadar yıl sonra gelir. */
export const NOSTALJI_YIL_ARALIK: [number, number] = [4, 6];

/** Sevgili: başlangıç barı, evlilik teklifi için süre, darılma ve gönül alma. */
export const SEVGILI_BASLANGIC_BAR: [number, number] = [68, 79];
export const SEVGILI_SURE_YIL = 4;
export const SEVGILI_DARILMA_BAR_KAYBI = 25;
/** Darılan sevgili bu kadar yıl içinde gönlü alınmazsa ayrılır. */
export const SEVGILI_DARGIN_SURE_YIL = 2;
export const GONUL_AL_MALIYET = 20;
export const GONUL_AL_UZATMA_YIL = 3;
export const GONUL_AL_BEKLEME_YIL = 1;
export const GONUL_AL_BAR_ARTISI = 12;
/** Sevgili barı bunun altına düşerse sevgili ayrılır. */
export const SEVGILI_AYRILMA_ESIGI = 20;
