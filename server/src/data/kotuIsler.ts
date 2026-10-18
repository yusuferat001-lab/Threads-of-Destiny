import type { Cag, Kategori, UlkeKrizi } from "../types";
import type { AjanRolu } from "./ajanlar";

/**
 * "Karanlık / illegal işler" kataloğu — Kariyer ekranındaki "Karanlık İşler"
 * penceresinde, oyuncunun istediği an tetikleyebileceği (turu TÜKETMEYEN)
 * aksiyonlar.
 *
 * 2026-10 (meslek pazarı, §43 Faz 1): 4 GENEL iş herkese açık, ayrıca her
 * mesleğin kendi "savaş alanına" ait 3 özel işi var (Tüccar pazar, Din Adamı
 * cemaat, Zanaatkâr lonca/üretim, Asker sokak/asayiş). Özel işlerin asıl
 * ödülü ham para değil, meslek pazarındaki müşteri sayın (`musteri`) ve rakibin
 * gücünü kırmaktır — tur harcamadığı için para veren her şey sömürülürdü.
 *
 * Her işin kendi bekleme süresi var (`cooldownYil`, `state.kotu_is_kilit`) —
 * eskiden hiç yoktu, "Birini Soy" tur harcamadan arka arkaya çevrilebiliyordu.
 *
 * Başarı şansı: `basariSansi × (1 + yatkinlikZarBonusOrani(kategori))` (5-95)
 * — §40'taki kademe formülü; kategori `yatkinlik` yoksa oyuncunun kendi meslek
 * kategorisi. Etkiler doğrudan uygulanır (jitter yok, olay hattından geçmez).
 * `para` alanları ve `maliyet` TABAN değerdir; enflasyonla ölçeklenir.
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
  /** Rütbe ilerlemesine katkı. */
  kariyer_puani?: number;
  /** Oyuncunun müşteri sayısına delta (±; P=416 referansı, gerçek pazarda P/416 ile ölçeklenir; data/pazar.ts). */
  musteri?: number;
  /** Meslek metrikleri (yalnız ilgili meslekte anlamlı). */
  ticaret_sermaye?: number;
  nufuz?: number;
  uretim_kapasitesi?: number;
  ordu_techizat?: number;
  /** Yönetimle bağlar (§35): kral/vali ve patron hattına delta. */
  yonetim_iliski?: number;
  patron_iliski?: number;
  /** İşletmede alış/hammadde maliyetini bu kadar yıl %10 düşürür (gümrük rüşveti, hammadde kapatma; §45). */
  gumruk_indirim_yil?: number;
  /** Şehirde kısa bir kriz başlatır (yalnız o an başka kriz yoksa). */
  kriz?: { tur: UlkeKrizi["tur"]; sureYil: number };
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
  /** Başarıya katkı veren yatkınlık kategorisi; yoksa oyuncunun meslek kategorisi. */
  yatkinlik?: Kategori;
  /** Yalnız bu mesleklere görünür; yoksa herkese (genel iş). */
  meslekler?: string[];
  /** Yalnız bu çağda görünür. */
  cag?: Cag;
  /** Bir kez çevrildikten sonra kaç oyun yılı kilitli kalır. */
  cooldownYil: number;
  /** Peşin, geri alınmayan taban maliyet (rüşvet, mal alımı...); enflasyonla ölçeklenir. */
  maliyet?: number;
  /** Başarılı dalda hedef rakibin müşterisinin bu kesri alınır (rakipMusteriKir; %30'u doğrudan oyuncuya). */
  rakipKirmaYuzde?: number;
  /** Başarılı dalda hedef rakip doğrudan saf dışı kalır. */
  rakipYenilt?: boolean;
  /** Bu işi senin yerine çevirebilecek ajan rolü (§43 Faz 2, data/ajanlar.ts). */
  ajanRolu?: AjanRolu;
  /** Yalnız bir ajana yaptırılabilir (kendin çeviremezsin). */
  sadeceAjan?: boolean;
  /** İşletmesi olan mesleklerde (§45) HERHANGİ bir çalışanın yapabildiği iş; ajan rolü aranmaz. */
  calisanIsi?: boolean;
  basarili: KotuIsEtki;
  basarisiz: KotuIsEtki;
}

export const KOTU_ISLER: KotuIsTanimi[] = [
  // ===== GENEL (her meslek) =====
  {
    id: "rakibi_korkut",
    ajanRolu: "Kabadayı",
    simge: "🗡️",
    basariSansi: 76,
    cooldownYil: 1,
    rakipKirmaYuzde: 0.14,
    basarili: { para: 6, un: 2, ahlak: -6, mutluluk: 2, rakip_puani: -10, suc_sinifi: "kucuk", kariyer_puani: 2 },
    basarisiz: { ahlak: -3, mutluluk: -3, rakip_puani: -3, suc_sinifi: "orta" },
  },
  {
    id: "adam_dov",
    simge: "👊",
    basariSansi: 66,
    yatkinlik: "savas",
    cooldownYil: 1,
    basarili: { mutluluk: 9, ahlak: -14, suc_sinifi: "orta" },
    basarisiz: { saglik: -12, ahlak: -6, mutluluk: -5, suc_sinifi: "buyuk", hapis_sansi: 0.1 },
  },
  {
    id: "birini_soy",
    ajanRolu: "Hırsız",
    simge: "💰",
    basariSansi: 56,
    cooldownYil: 2,
    basarili: { para: 24, ahlak: -16, mutluluk: 2, suc_sinifi: "buyuk" },
    basarisiz: { saglik: -10, ahlak: -4, suc_sinifi: "agir", hapis_sansi: 0.25 },
  },
  {
    id: "isyeri_yak",
    ajanRolu: "Kabadayı",
    simge: "🔥",
    basariSansi: 44,
    yatkinlik: "savas",
    cooldownYil: 4,
    rakipKirmaYuzde: 0.45,
    basarili: { para: 30, un: -4, ahlak: -22, mutluluk: 2, rakip_puani: -30, suc_sinifi: "buyuk", kariyer_puani: 6 },
    basarisiz: { saglik: -18, ahlak: -6, suc_sinifi: "agir", olum_sansi: 6, hapis_sansi: 0.35 },
  },

  {
    id: "suikast_ettir",
    simge: "☠️",
    basariSansi: 40,
    cooldownYil: 8,
    rakipYenilt: true,
    ajanRolu: "Suikastçı",
    sadeceAjan: true,
    basarili: { musteri: 12, ahlak: -24, suc_sinifi: "buyuk" },
    basarisiz: { ahlak: -6, suc_sinifi: "agir", hapis_sansi: 0.3 },
  },

  // ===== TÜCCAR — işletmeni etkileyen 3 iş (kendin ya da bir çalışanınla, §45) =====
  {
    id: "rakibe_iftira",
    simge: "📜",
    basariSansi: 62,
    meslekler: ["Tüccar"],
    calisanIsi: true,
    cooldownYil: 2,
    maliyet: 6,
    rakipKirmaYuzde: 0.2,
    basarili: { musteri: 9, ahlak: -10, mutluluk: 1, rakip_puani: -8, suc_sinifi: "orta", kariyer_puani: 2 },
    basarisiz: { un: -4, ahlak: -4, suc_sinifi: "buyuk", hapis_sansi: 0.1 },
  },
  {
    id: "kervan_yagmalat",
    simge: "🐫",
    basariSansi: 58,
    meslekler: ["Tüccar"],
    calisanIsi: true,
    cooldownYil: 2,
    rakipKirmaYuzde: 0.24,
    basarili: { para: 14, musteri: 6, ahlak: -12, mutluluk: 1, rakip_puani: -8, suc_sinifi: "orta", kariyer_puani: 3 },
    basarisiz: { saglik: -8, ahlak: -4, suc_sinifi: "buyuk", hapis_sansi: 0.15 },
  },
  {
    id: "gumruk_rusvet",
    simge: "🛃",
    basariSansi: 68,
    meslekler: ["Tüccar"],
    calisanIsi: true,
    cooldownYil: 5,
    maliyet: 14,
    basarili: { musteri: 6, ticaret_sermaye: 6, ahlak: -8, suc_sinifi: "orta", gumruk_indirim_yil: 4 },
    basarisiz: { un: -5, ahlak: -3, suc_sinifi: "buyuk", hapis_sansi: 0.15 },
  },

  // ===== DİN ADAMI — cemaat =====
  {
    id: "sahte_mucize",
    simge: "✨",
    basariSansi: 60,
    meslekler: ["Din Adamı"],
    cooldownYil: 4,
    basarili: { un: 6, nufuz: 4, musteri: 21, ahlak: -14, suc_sinifi: "kucuk" },
    basarisiz: { un: -8, ahlak: -6, musteri: -12, suc_sinifi: "orta" },
  },
  {
    id: "afaroz_ettir",
    ajanRolu: "Casus",
    simge: "📜",
    basariSansi: 55,
    meslekler: ["Din Adamı"],
    cooldownYil: 3,
    rakipKirmaYuzde: 0.28,
    basarili: { musteri: 6, ahlak: -12, rakip_puani: -10, suc_sinifi: "kucuk", kariyer_puani: 3 },
    basarisiz: { patron_iliski: -10, un: -5, ahlak: -4, suc_sinifi: "orta" },
  },
  {
    id: "vali_santaj",
    ajanRolu: "Casus",
    simge: "🗝️",
    basariSansi: 52,
    meslekler: ["Din Adamı"],
    cooldownYil: 5,
    basarili: { yonetim_iliski: 12, para: 12, musteri: 9, ahlak: -12, suc_sinifi: "orta" },
    basarisiz: { yonetim_iliski: -15, ahlak: -4, suc_sinifi: "buyuk", hapis_sansi: 0.2 },
  },

  // ===== ZANAATKÂR — lonca/üretim =====
  {
    id: "formul_cal",
    ajanRolu: "Casus",
    simge: "🔍",
    basariSansi: 58,
    meslekler: ["Zanaatkâr"],
    calisanIsi: true,
    cooldownYil: 3,
    rakipKirmaYuzde: 0.14,
    basarili: { uretim_kapasitesi: 10, musteri: 18, ahlak: -10, suc_sinifi: "orta" },
    basarisiz: { un: -4, ahlak: -3, suc_sinifi: "buyuk", hapis_sansi: 0.15 },
  },
  {
    id: "hammadde_topla",
    simge: "🪵",
    basariSansi: 70,
    meslekler: ["Zanaatkâr"],
    calisanIsi: true,
    cooldownYil: 3,
    maliyet: 15,
    rakipKirmaYuzde: 0.2,
    basarili: { para: 8, musteri: 9, ahlak: -6, rakip_puani: -6, suc_sinifi: "kucuk", gumruk_indirim_yil: 4 },
    basarisiz: { para: -6, un: -2, ahlak: -2 },
  },
  {
    id: "lonca_manipule",
    simge: "⚖️",
    basariSansi: 60,
    meslekler: ["Zanaatkâr"],
    calisanIsi: true,
    cooldownYil: 4,
    basarili: { kariyer_puani: 6, patron_iliski: 10, musteri: 12, ahlak: -10, suc_sinifi: "kucuk" },
    basarisiz: { patron_iliski: -15, un: -4, ahlak: -3, suc_sinifi: "orta" },
  },

  // ===== ASKER — sokak/asayiş =====
  {
    id: "kaos_cikar",
    ajanRolu: "Kabadayı",
    simge: "🌪️",
    basariSansi: 55,
    meslekler: ["Asker"],
    cooldownYil: 5,
    basarili: { para: 16, yonetim_iliski: 8, musteri: 15, ahlak: -18, suc_sinifi: "buyuk", kriz: { tur: "isyan", sureYil: 1 } },
    basarisiz: { saglik: -10, ahlak: -5, suc_sinifi: "agir", hapis_sansi: 0.25 },
  },
  {
    id: "kaza_duello",
    ajanRolu: "Suikastçı",
    simge: "🤺",
    basariSansi: 45,
    meslekler: ["Asker"],
    cooldownYil: 6,
    rakipYenilt: true,
    basarili: { un: 6, musteri: 18, ahlak: -16, suc_sinifi: "orta", kariyer_puani: 4 },
    basarisiz: { saglik: -25, un: -4, suc_sinifi: "buyuk", olum_sansi: 14 },
  },
  {
    id: "kervan_baskini",
    ajanRolu: "Kabadayı",
    simge: "🏴",
    basariSansi: 60,
    meslekler: ["Asker"],
    cooldownYil: 2,
    basarili: { para: 18, ordu_techizat: 8, musteri: 9, ahlak: -12, suc_sinifi: "orta" },
    basarisiz: { saglik: -12, ahlak: -4, suc_sinifi: "buyuk", hapis_sansi: 0.15 },
  },
];

export function kotuIsTanimiGetir(id: string): KotuIsTanimi | undefined {
  return KOTU_ISLER.find((k) => k.id === id);
}

/** Bu karaktere (meslek + çağ) görünen karanlık işler. */
export function uygunKotuIsler(meslek: string, cag: Cag): KotuIsTanimi[] {
  // İşletme dilimi (§45): işletmesi olan mesleklerin listesi yalnız kendi 3 işidir; genel işler gelmez.
  if (meslek === "Tüccar" || meslek === "Zanaatkâr") return KOTU_ISLER.filter((k) => k.meslekler?.includes(meslek) && (!k.cag || k.cag === cag));
  return KOTU_ISLER.filter((k) => (!k.meslekler || k.meslekler.includes(meslek)) && (!k.cag || k.cag === cag));
}

/** Kanonik (TR) iş adları — K() ile çevrilir, sonuç mesajlarında kullanılır. */
export const KOTU_IS_ADLARI: Record<string, string> = {
  rakibi_korkut: "Rakibini Korkut",
  adam_dov: "Zevkine Adam Döv",
  birini_soy: "Birini Soy",
  isyeri_yak: "Rakibin İş Yerini Yak",
  rakibe_iftira: "Rakibe İftira At",
  kervan_yagmalat: "Rakibin Kervanını Yağmalat",
  gumruk_rusvet: "Gümrüğe Rüşvet",
  sahte_mucize: "Sahte Mucize",
  afaroz_ettir: "Rakibi Aforoz Ettir",
  vali_santaj: "Valiye Şantaj",
  formul_cal: "Rakibin Formülünü Çal",
  hammadde_topla: "Hammaddeyi Kapat",
  lonca_manipule: "Lonca Kararını Çarpıt",
  kaos_cikar: "Kaos Çıkar, Koruma Sat",
  kaza_duello: "Kaza Süsü Verilmiş Düello",
  kervan_baskini: "Kervan Baskını",
  suikast_ettir: "Rakibi Ortadan Kaldırt",
};
