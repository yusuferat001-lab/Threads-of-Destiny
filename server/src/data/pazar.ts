import type { CharacterState } from "../types";

/**
 * Meslek pazarı (2026-10, v8.1): toplam pazar `P = state.pazar_musteri` müşteridir;
 * oyuncunun müşterisi `state.meslek_musteri`, aktif rakibin müşterisi `Rakip.musteri`,
 * geri kalanı isimsiz küçük esnaf havuzudur (P − oyuncu − rakip). Pazar payı SAKLANMAZ,
 * türetilir:  pay = meslek_musteri / pazar_musteri.
 *
 * Gizli "güç" yoktur: her etken (çalışan, fiyat, tanıtım, şöhret, olaylar, karanlık
 * işler, rakip hamleleri) doğrudan müşteri sayısını değiştirir; kazanç/kayıp diğer
 * gruplardan büyüklükleriyle orantılı alınır/verilir (game/piyasa.ts).
 *
 * Pazar payı maaşı (pazarMaasCarpani, maaş kırılımında ayrı "pazar" grubu) ve
 * rütbeyi (rutbeler.ts S4/S5 `pazar_payi` eşiği + yıllık kariyer puanı) etkiler.
 *
 * Bu dosya bilerek saf/bağımlılıksız tutuldu: stateManager buradan okur, döngüsel
 * içe aktarma oluşmaz.
 */

/**
 * Yıllık sabit müşteri desteği (v8.2): paydan bağımsız düz değer, yaşa göre kademeli —
 * mesleğin ilk 10 yılı (yaş 15–24) +1, sonraki 10 yıl (25–34) +0,5, sonrası +0,2.
 * Yalnız küçük bir taban destektir; asıl büyüme çalışan/yatırım/fiyat/şöhret ve olaylardan gelir.
 */
export const MUSTERI_DESTEK_KADEMELERI: { yasAltinda: number; deger: number }[] = [
  { yasAltinda: 25, deger: 1 },
  { yasAltinda: 35, deger: 0.5 },
  { yasAltinda: Infinity, deger: 0.2 },
];
export function sabitMusteriArtisi(yas: number): number {
  return (MUSTERI_DESTEK_KADEMELERI.find((k) => yas < k.yasAltinda) ?? MUSTERI_DESTEK_KADEMELERI[MUSTERI_DESTEK_KADEMELERI.length - 1]).deger;
}
export const MUSTERI_YILLIK_RUTBE = 0.3;
/** Hapiste/yolculuktayken pazardan uzak kalmanın yıllık müşteri kaybı (kendi müşterisinin kesri). */
export const MUSTERI_YOKLUK_KAYBI = 0.03;
/** Mesleğine uygun kategoride başarılı her olay oyuncuya bu kadar müşteri kazandırır (tecrübe hızıyla çarpılır). */
export const MUSTERI_KATEGORI_BASARI = 3;
/** Pazar payı başına yıllık kariyer puanı katkısı (pay 0.40 → +2.4/yıl). */
export const PAZAR_KARIYER_PUANI_YILLIK = 6;
/** Bir rakip yenildikten sonra yeni rakibin ortaya çıkması için beklenen yıl aralığı. */
export const YENI_RAKIP_MIN_YIL = 8;
export const YENI_RAKIP_MAX_YIL = 12;
/** Karanlık işte rakipten alınan müşterinin doğrudan oyuncuya geçen kısmı (kalanı orantılı dağılır). */
export const RAKIP_KIRMA_DOGRUDAN = 0.3;
/** Başlangıç payları (P'nin kesri): büyük rakip %44–51, ikinci rakip %28–34; yeni girişteki rakip payı. */
export const BUYUK_RAKIP_PAY: [number, number] = [0.44, 0.51];
export const IKINCI_RAKIP_PAY: [number, number] = [0.28, 0.34];
export const YENI_RAKIP_PAY: [number, number] = [0.2, 0.3];
/** Aynı anda en fazla bu kadar aktif rakip vardır. */
export const MAKS_AKTIF_RAKIP = 2;
/** Bir rakip payı bu eşiğin altına inince "yenildi" sayılır (P'nin kesri). */
export const RAKIP_YENILDI_ESIGI = 0.04;
/** Grup sınırları (P'nin kesri): küçük esnaf havuzu dibe vurmaz, rakip/oyuncu tavanı. */
export const KUCUK_TABAN_PAY = 0.03;
export const RAKIP_TAVAN_PAY = 0.62;
export const OYUNCU_TAVAN_PAY = 0.7;
export const OYUNCU_TABAN_MUSTERI = 3;

export interface PazarAdlari {
  /** Pazarın adı ("Pazar Payı" vb.) — kanonik TR, gösterimde K() ile çevrilir. Oyuncuya "güç" hiçbir yerde gösterilmez (yalnız pay ve müşteri). */
  pazar: string;
  simge: string;
}

export const PAZAR_ADLARI: Record<string, PazarAdlari> = {
  Tüccar: { pazar: "Pazar Payı", simge: "⚖️" },
  "Din Adamı": { pazar: "Cemaat Payı", simge: "🕯️" },
  Zanaatkâr: { pazar: "Üretim Payı", simge: "🔨" },
  Asker: { pazar: "Bölge Hâkimiyeti", simge: "🛡️" },
};

// ── Müşteri sayısı modeli (işletmeli meslekler; §45) ──────────────────────
/** Toplam pazar büyüklüğü (müşteri sayısı) oyun başında bu aralıktan atanır. */
export const PAZAR_MUSTERI_ARALIK: [number, number] = [350, 500];
/** Her müşterinin bir üründen yıllık baz alım oranı (dönem etkilerinden bağımsız; üstüne dönem çarpanları biner). */
export const ALIM_ORANI = 0.6;
/** Başlangıç pazar payı tabanı (%8–9) ve mesleğe yatkınlık kademesine göre ek (puan). */
export const BASLANGIC_PAY_ARALIK: [number, number] = [0.1, 0.11];
export const YATKINLIK_PAY_EKI = [0, -0.03, 0, 0.01, 0.02, 0.03]; // index = meslek_yatkinlik_seviyesi (1 kötü … 5 mükemmel)

// ── Rakip saldırıları (v8.2) ───────────────────────────────────────────────
/** Saldırı kademesi sabit pay aralığıyla belirlenir: %0–20 → 1, %21–34 → 2, %35+ → 3. */
export function rakipSaldiriKademesi(pay: number): 1 | 2 | 3 {
  const yuzde = Math.round(pay * 100);
  if (yuzde <= 20) return 1;
  if (yuzde <= 34) return 2;
  return 3;
}
/** Saldırılar zarla değil takvimle gelir: bir sonraki saldırı, bugünden 4–9 yıl sonra (eşit olasılık) bir yıla konur. */
export const RAKIP_SALDIRI_ARALIK_YIL: [number, number] = [5, 8];
/** Şehir yöneticisi ilişkisi yüksekse aralığa eklenen yıl. */
export const RAKIP_SALDIRI_OTORITE_EKI_YIL = 1;
/** v11: işletme kurulduktan sonra bu kadar yıl dış hırsızlık ve rakip saldırısı olmaz. */
export const ISLETME_GUVENLI_YIL = 7;
export function rastgeleSaldiriYili(yil: number, otoriteKoruma: boolean, rnd: () => number = Math.random): number {
  const [a, b] = RAKIP_SALDIRI_ARALIK_YIL;
  return yil + a + Math.floor(rnd() * (b - a + 1)) + (otoriteKoruma ? RAKIP_SALDIRI_OTORITE_EKI_YIL : 0);
}
/** Saldıran: %65 büyük rakip, %35 ikinci rakip (tek aktif rakip varsa o). İkinci rakibin hasarı ×0,8. */
export const RAKIP_BUYUK_SALDIRI_ORANI = 0.65;
export const RAKIP_IKINCI_HASAR_CARPANI = 0.8;
/** Sadakati düşük çalışan rakibe bilgi sızdırırsa hasar %30 artar, güvenlik devre dışı kalır, çalışanın sadakati düşer. */
export const SIZMA_HASAR_CARPANI = 1.3;
export const SIZMA_SADAKAT_KAYBI = 15;

export type SaldiriTuru = "baskin" | "sabotaj" | "iftira" | "musteri_calma";
/** Fiziksel saldırıları (baskın, sabotaj) güvenlik engelleyebilir; söylenti saldırıları (iftira, müşteri çalma) engellenemez. */
export const FIZIKSEL_SALDIRILAR: SaldiriTuru[] = ["baskin", "sabotaj"];
/** Kademeye göre tür ağırlıkları (%). */
export const SALDIRI_TUR_AGIRLIKLARI: Record<1 | 2 | 3, Record<SaldiriTuru, number>> = {
  1: { baskin: 55, sabotaj: 0, iftira: 0, musteri_calma: 45 },
  2: { baskin: 20, sabotaj: 0, iftira: 35, musteri_calma: 45 },
  3: { baskin: 15, sabotaj: 35, iftira: 20, musteri_calma: 30 },
};
/** Tür başına hasar, kademe 1/2/3. nakit: geçen yılın toplam satışının %'si; musteri: oyuncunun müşteri sayısının %'si; sohret: puan; stok: [min,max] %. */
export const SALDIRI_HASARLARI = {
  baskin: { nakit: [5, 9, 13] },
  sabotaj: { stok: [17, 25] as [number, number], nakit: [6, 6, 6] },
  iftira: { sohret: [0, 6, 9.5], musteri: [0, 5, 8] },
  musteri_calma: { musteri: [6, 10, 15] },
} as const;

export function saldiriTuruSec(kademe: 1 | 2 | 3, rnd: () => number = Math.random): SaldiriTuru {
  const agirlik = SALDIRI_TUR_AGIRLIKLARI[kademe];
  const toplam = (Object.values(agirlik) as number[]).reduce((t, x) => t + x, 0);
  let zar = rnd() * toplam;
  for (const tur of Object.keys(agirlik) as SaldiriTuru[]) {
    zar -= agirlik[tur];
    if (zar < 0) return tur;
  }
  return "musteri_calma";
}

/** Şöhret (un) aralıklarına göre pazar payı büyümesi (G'nin yıllık yüzdesi, kesir) ve otorite ilişkisi (yıllık puan). */
export function sohretPayBuyumesi(un: number): number {
  if (un <= 10) return -0.004;
  if (un <= 25) return -0.001;
  if (un <= 50) return 0;
  if (un <= 75) return 0.003;
  if (un <= 90) return 0.006;
  return 0.01;
}
export function sohretOtoriteIliskisi(un: number): number {
  if (un <= 10) return -0.15;
  if (un <= 25) return -0.05;
  if (un <= 50) return 0;
  if (un <= 75) return 0.1;
  if (un <= 90) return 0.2;
  return 0.3;
}

export function rastgelePazarMusteri(rnd: () => number = Math.random): number {
  const [min, max] = PAZAR_MUSTERI_ARALIK;
  return Math.round(min + rnd() * (max - min));
}

export function pazarAdlariGetir(meslek: string): PazarAdlari | null {
  return PAZAR_ADLARI[meslek] ?? null;
}

/** Aktif (yenilmemiş) rakipler, listedeki sırayla (en büyük genellikle ilk). */
export function aktifRakipler(state: CharacterState) {
  return (state.rakipler ?? []).filter((r) => !r.yenildi);
}

/** En büyük aktif rakip (saldırgan / "rakip_adi"); yoksa undefined. */
export function aktifRakip(state: CharacterState) {
  return [...aktifRakipler(state)].sort((a, b) => b.musteri - a.musteri)[0];
}

/** Yenilmemiş rakiplerin toplam müşterisi. */
export function rakipMusteriToplami(state: CharacterState): number {
  return aktifRakipler(state).reduce((t, r) => t + Math.max(0, r.musteri), 0);
}

/** Oyuncunun pazar payı (0-1). Meslek seçilmemişse 0. */
export function pazarPayiHesapla(state: CharacterState): number {
  if (!PAZAR_ADLARI[state.meslek]) return 0;
  const p = Math.max(0, state.pazar_musteri ?? 0);
  return p > 0 ? Math.min(1, Math.max(0, state.meslek_musteri ?? 0) / p) : 0;
}

/** Bir rakibin pazar payı (0-1) — Kariyer ekranındaki pazar çubuğu için. */
export function rakipPayiHesapla(state: CharacterState, rakipMusteri: number): number {
  const p = Math.max(0, state.pazar_musteri ?? 0);
  return p > 0 ? Math.max(0, rakipMusteri) / p : 0;
}

/**
 * Pazar payının maaşa çarpanı: 0.94 + pay × 0.55. Başlangıç payında (~%11)
 * neredeyse nötr, %35'te ~×1.13, %60'ta ~×1.27.
 */
export function pazarMaasCarpani(pay: number): number {
  return 0.94 + Math.max(0, Math.min(1, pay)) * 0.55;
}

/**
 * Meslek seçilince oyuncunun başlangıç müşterisi: P × (%10–11 taban + mesleğe yatkınlık eki
 * [Kötü −3, Nötr 0, İyi +1, Çok İyi +2, Mükemmel +3 puan]). Aile mirası eki v10'da kalktı.
 */
export function baslangicMusteri(
  pazarMusteri: number,
  yatkinlikSeviyesi: number | null,
  rnd: () => number = Math.random
): number {
  const [a, b] = BASLANGIC_PAY_ARALIK;
  const taban = a + rnd() * (b - a);
  const kademeEki = YATKINLIK_PAY_EKI[yatkinlikSeviyesi ?? 2] ?? 0;
  const hedef = taban + kademeEki;
  return Math.max(OYUNCU_TABAN_MUSTERI, Math.round(pazarMusteri * Math.max(0.02, hedef) * 10) / 10);
}

/** Bir rakibin rastgele müşterisi (P'nin verilen aralığındaki kesri). */
export function rastgeleRakipMusteri(pazarMusteri: number, aralik: [number, number], rnd: () => number = Math.random): number {
  const [a, b] = aralik;
  return Math.round(pazarMusteri * (a + rnd() * (b - a)) * 10) / 10;
}

/**
 * Başlangıçtaki iki rakibin müşterisi: büyük %44–51, ikinci %28–34 (P'nin kesri). Oyuncunun
 * ve en az %3'lük "diğerleri" payının sığması için toplam `P × (1 − oyuncuPayi − %3)`'ü aşarsa büyük rakip kırpılır.
 */
export function baslangicRakipMusterileri(pazarMusteri: number, oyuncuMusteri: number, rnd: () => number = Math.random): [number, number] {
  let buyuk = rastgeleRakipMusteri(pazarMusteri, BUYUK_RAKIP_PAY, rnd);
  const ikinci = rastgeleRakipMusteri(pazarMusteri, IKINCI_RAKIP_PAY, rnd);
  const sigan = pazarMusteri * (1 - KUCUK_TABAN_PAY) - oyuncuMusteri - ikinci;
  buyuk = Math.round(Math.min(buyuk, Math.max(0, sigan)) * 10) / 10;
  return [buyuk, ikinci];
}

/** Oyuncunun müşteri sayısı. */
export function musteriSayisi(state: CharacterState): number {
  return Math.max(0, state.meslek_musteri ?? 0);
}
