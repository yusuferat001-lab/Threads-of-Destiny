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

/** Oyuncunun yıllık sabit müşteri artışı (işletmesizlerde rütbe başına ek). */
export const MUSTERI_YILLIK_SABIT = 2.6;
/** Sabit büyüme doğal olarak doyar: pay bu eşiğe yaklaştıkça sıfıra iner (küçük işletme hızlı, büyük işletme yüzdelik etkenlerle büyür). */
export const MUSTERI_SABIT_DOYMA_PAYI = 0.27;
export function sabitMusteriArtisi(pay: number): number {
  return MUSTERI_YILLIK_SABIT * Math.max(0, 1 - pay / MUSTERI_SABIT_DOYMA_PAYI);
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
export const ALIM_ORANI = 0.4;
/** Başlangıç pazar payı tabanı (%8–9) ve mesleğe yatkınlık kademesine göre ek (puan). */
export const BASLANGIC_PAY_ARALIK: [number, number] = [0.08, 0.09];
export const YATKINLIK_PAY_EKI = [0, -0.03, 0, 0.02, 0.03]; // index = meslek_yatkinlik_seviyesi (1 kötü … 4 mükemmel)

/** Rakip saldırı eşikleri oyuncunun pazar payına göre: oyun başında bu aralıklardan atanır. */
export const RAKIP_ESIK_ARALIKLARI: [[number, number], [number, number], [number, number]] = [
  [0.2, 0.22],
  [0.34, 0.35],
  [0.45, 0.46],
];
/** Kademe başına [yıllık saldırı şansı, saldırıdan sonra cooldown yılı]. */
export const RAKIP_SALDIRI_KADEMELERI: [number, number][] = [
  [0.12, 4],
  [0.15, 3],
  [0.2, 2],
];

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

export function rastgeleRakipEsikleri(rnd: () => number = Math.random): [number, number, number] {
  const r = RAKIP_ESIK_ARALIKLARI.map(([a, b]) => Math.round((a + rnd() * (b - a)) * 1000) / 1000);
  return [r[0], r[1], r[2]];
}

/** Rakip saldırı kademesi (0 = yok, 1-3) — oyuncunun payı eşikleri geçtikçe artar. */
export function rakipSaldiriKademesi(pay: number, esikler: [number, number, number]): number {
  if (pay >= esikler[2]) return 3;
  if (pay >= esikler[1]) return 2;
  if (pay >= esikler[0]) return 1;
  return 0;
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
 * Meslek seçilince oyuncunun başlangıç müşterisi: P × (%8–9 taban + mesleğe yatkınlık eki
 * [Kötü −3, Nötr 0, İyi +2, Mükemmel +3 puan] + aile mirası +1 puan).
 */
export function baslangicMusteri(
  pazarMusteri: number,
  yatkinlikSeviyesi: number | null,
  mirasSurduruldu: boolean,
  rnd: () => number = Math.random
): number {
  const [a, b] = BASLANGIC_PAY_ARALIK;
  const taban = a + rnd() * (b - a);
  const kademeEki = YATKINLIK_PAY_EKI[yatkinlikSeviyesi ?? 2] ?? 0;
  const hedef = taban + kademeEki + (mirasSurduruldu ? 0.01 : 0);
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
