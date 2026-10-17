import type { CharacterState } from "../types";

/**
 * Meslek pazarı (2026-10): her meslekte oyuncunun bir "güç"ü (state.meslek_gucu,
 * 0-100) ve isimli rakiplerin kendi güçleri (Rakip.guc) vardır. Pazar payı bu
 * güçlerin oranından TÜRETİLİR (saklanmaz):
 *
 *   pay = oyuncuGücü / (oyuncuGücü + Σ yenilmemiş rakip gücü + PAZAR_DIGER_GUC)
 *
 * `PAZAR_DIGER_GUC` pazardaki isimsiz küçük oyuncuları temsil eder — rakip
 * tamamen yok olsa bile pay %100'e çıkmaz. Rakibin gücü düştükçe (karanlık
 * işler, ajanlar) oyuncunun payı kendiliğinden büyür.
 *
 * Pazar payı maaşı (pazarMaasCarpani, maaş kırılımında ayrı "pazar" grubu) ve
 * rütbeyi (rutbeler.ts S4/S5 `pazar_payi` eşiği + yıllık kariyer puanı) etkiler.
 *
 * Bu dosya bilerek saf/bağımlılıksız tutuldu: stateManager buradan okur, döngüsel
 * içe aktarma oluşmaz.
 */

/** Pazardaki isimsiz küçük oyuncuların toplam gücü. */
export const PAZAR_DIGER_GUC = 40;
/** Meslek seçilince oyuncunun başladığı taban güç (yatkınlık kademesine göre artar, bkz. baslangicMeslekGucu). */
export const MESLEK_GUCU_TABAN = 10;
export const MESLEK_GUCU_TAVAN = 100;
/** Mesleğine uygun kategoride başarılı her olay oyuncuya bu kadar güç kazandırır (tecrübe hızıyla çarpılır). */
export const MESLEK_GUCU_KATEGORI_BASARI = 1.2;
/** Yıllık pasif güç kazancı: taban + rütbe başına ek. */
export const MESLEK_GUCU_YILLIK_TABAN = 0.2;
export const MESLEK_GUCU_YILLIK_RUTBE = 0.05;
/** Hapiste/yolculuktayken pazardan uzak kalmanın yıllık güç kaybı. */
export const MESLEK_GUCU_YOKLUK_KAYBI = 1;
/** Pazar payı başına yıllık kariyer puanı katkısı (pay 0.40 → +2.4/yıl). */
export const PAZAR_KARIYER_PUANI_YILLIK = 6;
/** Bir rakip yenildikten sonra yeni rakibin ortaya çıkması için beklenen yıl aralığı. */
export const YENI_RAKIP_MIN_YIL = 8;
export const YENI_RAKIP_MAX_YIL = 12;
/** Kırılan rakip gücünün bu oranı müşteri olarak oyuncuya geçer (meslek_gucu). */
export const RAKIP_KIRMA_GUC_AKTARIMI = 0.3;

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

/** Yenilmemiş rakiplerin toplam gücü. */
export function rakipGucToplami(state: CharacterState): number {
  return (state.rakipler ?? []).filter((r) => !r.yenildi).reduce((t, r) => t + Math.max(0, r.guc), 0);
}

/** Oyuncunun pazar payı (0-1). Meslek seçilmemişse 0. */
export function pazarPayiHesapla(state: CharacterState): number {
  if (!PAZAR_ADLARI[state.meslek]) return 0;
  const g = Math.max(0, state.meslek_gucu ?? 0);
  const toplam = g + rakipGucToplami(state) + PAZAR_DIGER_GUC;
  return toplam > 0 ? g / toplam : 0;
}

/** Bir rakibin pazar payı (0-1) — Kariyer ekranındaki pazar çubuğu için. */
export function rakipPayiHesapla(state: CharacterState, rakipGuc: number): number {
  const toplam = Math.max(0, state.meslek_gucu ?? 0) + rakipGucToplami(state) + PAZAR_DIGER_GUC;
  return toplam > 0 ? Math.max(0, rakipGuc) / toplam : 0;
}

/**
 * Pazar payının maaşa çarpanı: 0.94 + pay × 0.55. Başlangıç payında (~%11)
 * neredeyse nötr, %35'te ~×1.13, %60'ta ~×1.27.
 */
export function pazarMaasCarpani(pay: number): number {
  return 0.94 + Math.max(0, Math.min(1, pay)) * 0.55;
}

/** Hedef pay (0-1) ve mevcut rakip toplam gücü için oyuncunun gizli gücünü (G) hesaplar: G = pay/(1−pay) × (ΣR + diğer). */
export function paydanMeslekGucu(hedefPay: number, rakipToplam: number): number {
  const pay = Math.max(0, Math.min(0.9, hedefPay));
  return (pay / (1 - pay)) * (rakipToplam + PAZAR_DIGER_GUC);
}

/**
 * Meslek seçilince oyuncunun başladığı güç: hedef başlangıç payı = %8–9 (rastgele) ± mesleğe
 * yatkınlık kademesi (Kötü −3, Nötr 0, İyi +2, Mükemmel +3 puan) + aile mirası +1 puan.
 * Oyuncuya güç değil pay gösterilir; G yalnız içeride payı üretir.
 */
export function baslangicMeslekGucu(
  yatkinlikSeviyesi: number | null,
  mirasSurduruldu: boolean,
  rakipToplam = 58,
  rnd: () => number = Math.random
): number {
  const [a, b] = BASLANGIC_PAY_ARALIK;
  const taban = a + rnd() * (b - a);
  const kademeEki = YATKINLIK_PAY_EKI[yatkinlikSeviyesi ?? 2] ?? 0;
  const hedef = taban + kademeEki + (mirasSurduruldu ? 0.01 : 0);
  return Math.round(paydanMeslekGucu(hedef, rakipToplam) * 10) / 10;
}

/** Pay değişimini (yüzde PUANI, kesir: 0.01 = +1 puan) gizli güce çevirir; küçük olay/sızdırma etkileri için. */
export function payDegisimiGuce(state: CharacterState, payDegisimi: number): number {
  const rakipToplam = rakipGucToplami(state);
  const mevcutPay = pazarPayiHesapla(state);
  const yeniGuc = paydanMeslekGucu(mevcutPay + payDegisimi, rakipToplam);
  return yeniGuc - Math.max(0, state.meslek_gucu ?? 0);
}

/** Oyuncunun müşteri sayısı = pay × toplam pazar. */
export function musteriSayisi(state: CharacterState): number {
  return pazarPayiHesapla(state) * Math.max(0, state.pazar_musteri ?? 0);
}
