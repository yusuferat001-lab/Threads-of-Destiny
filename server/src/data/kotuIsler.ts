/**
 * "Karanlık / illegal işler" kataloğu — İşin & Yatırımların ekranındaki eski
 * "Kendi İşine Yatırım Yap" kartının yerini alan, oyuncunun istediği an
 * tetikleyebileceği (turu TÜKETMEYEN) aksiyonlar.
 *
 * Her aksiyon zarlı: başarı şansı `basariSansi + yatkinliklar[yatkinlik]` (5-95
 * clamp). Başarılı/başarısız dalın etkileri doğrudan state'e uygulanır
 * (gameEngine.kotuIsYap) — olay hattından geçmez, jitter uygulanmaz.
 *
 * Tasarım: ekonomik getirisi VAR ama bedeli ağır — büyük ahlak düşüşü + hızlı
 * aranma (suc_sinifi) + başarısızlıkta hapis/ölüm riski ("ortaya çıkma"). Rakip
 * hedefleyen işler `rakip_puani`'yi düşürür ve küçük `kariyer_puani` verir
 * (rakibini zayıflatmak terfi yolunu açar) — ileride gelecek "derin rakip
 * ilişkileri" sistemi bu alanları büyütecek.
 *
 * `para` alanları TABAN değerdir; uygulanırken enflasyon çarpanıyla ölçeklenir.
 */
import type { SucSinifi } from "../types";

export interface KotuIsEtki {
  /** Taban para deltası (±); enflasyonCarpani ile ölçeklenir. */
  para?: number;
  un?: number;
  ahlak?: number;
  saglik?: number;
  mutluluk?: number;
  rakip_puani?: number;
  /** Suç büyüklüğü sınıfı: gameEngine.SUC_SINIFI_ARALIKLARI aralığından rastgele aranma eklenir (başarısız dalda bir üst sınıf, yani suçüstü). */
  suc_sinifi?: SucSinifi;
  /** Rütbe ilerlemesine küçük katkı (rakibini zayıflatmak = terfi fırsatı). */
  kariyer_puani?: number;
  /** 0-1: bu dalda "hapiste" etiketi + ceza süresi tetiklenme ihtimali. */
  hapis_sansi?: number;
  /** 0-100 taban ölüm şansı (efektifOlumSansi ile sağlığa göre büyür). */
  olum_sansi?: number;
}

export interface KotuIsTanimi {
  id: string;
  simge: string;
  /** Başarı şansı tabanı (0-100). */
  basariSansi: number;
  /** Başarıya katkı veren yatkınlık kategorisi. */
  yatkinlik: "savas" | "siyaset";
  basarili: KotuIsEtki;
  basarisiz: KotuIsEtki;
}

export const KOTU_ISLER: KotuIsTanimi[] = [
  {
    id: "rakibi_korkut",
    simge: "🗡️",
    basariSansi: 76,
    yatkinlik: "siyaset",
    basarili: {
      para: 6,
      un: 2,
      ahlak: -6,
      mutluluk: 2,
      rakip_puani: -10,
      suc_sinifi: "kucuk",
      kariyer_puani: 2,
    },
    basarisiz: { ahlak: -3, mutluluk: -3, rakip_puani: -3, suc_sinifi: "orta" },
  },
  {
    id: "adam_dov",
    simge: "👊",
    basariSansi: 66,
    yatkinlik: "savas",
    basarili: { mutluluk: 9, ahlak: -14, suc_sinifi: "orta" },
    basarisiz: { saglik: -12, ahlak: -6, mutluluk: -5, suc_sinifi: "buyuk", hapis_sansi: 0.1 },
  },
  {
    id: "rakibi_dov",
    simge: "🩸",
    basariSansi: 60,
    yatkinlik: "savas",
    basarili: {
      para: 5,
      ahlak: -12,
      mutluluk: 3,
      rakip_puani: -18,
      suc_sinifi: "orta",
      kariyer_puani: 4,
    },
    basarisiz: { saglik: -15, ahlak: -5, mutluluk: -4, suc_sinifi: "buyuk", hapis_sansi: 0.1 },
  },
  {
    id: "birini_soy",
    simge: "💰",
    basariSansi: 56,
    yatkinlik: "siyaset",
    basarili: { para: 24, ahlak: -16, mutluluk: 2, suc_sinifi: "buyuk" },
    basarisiz: { saglik: -10, ahlak: -4, suc_sinifi: "agir", hapis_sansi: 0.25 },
  },
  {
    id: "isyeri_yak",
    simge: "🔥",
    basariSansi: 44,
    yatkinlik: "savas",
    basarili: {
      para: 30,
      un: -4,
      ahlak: -22,
      mutluluk: 2,
      rakip_puani: -30,
      suc_sinifi: "buyuk",
      kariyer_puani: 6,
    },
    basarisiz: { saglik: -18, ahlak: -6, suc_sinifi: "agir", olum_sansi: 6, hapis_sansi: 0.35 },
  },
];

export function kotuIsTanimiGetir(id: string): KotuIsTanimi | undefined {
  return KOTU_ISLER.find((k) => k.id === id);
}
