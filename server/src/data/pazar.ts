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
  /** Pazarın adı ("Pazar Payı" vb.) — kanonik TR, gösterimde K() ile çevrilir. */
  pazar: string;
  /** Gücün adı ("Ticari Güç" vb.). */
  guc: string;
  simge: string;
}

export const PAZAR_ADLARI: Record<string, PazarAdlari> = {
  Tüccar: { pazar: "Pazar Payı", guc: "Ticari Güç", simge: "⚖️" },
  "Din Adamı": { pazar: "Cemaat Payı", guc: "Ruhani Güç", simge: "🕯️" },
  Zanaatkâr: { pazar: "Üretim Payı", guc: "Zanaat Gücü", simge: "🔨" },
  Asker: { pazar: "Bölge Hâkimiyeti", guc: "Askeri Güç", simge: "🛡️" },
};

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

/**
 * Meslek seçilince oyuncunun başladığı güç: taban + mesleğe yatkınlık kademesi
 * (1 kötü → +0, 2 nötr → +2, 3 iyi → +5, 4 mükemmel → +10) + aile mirası +4.
 */
export function baslangicMeslekGucu(yatkinlikSeviyesi: number | null, mirasSurduruldu: boolean): number {
  const kademeEki = [0, 0, 2, 5, 10][yatkinlikSeviyesi ?? 2] ?? 2;
  return MESLEK_GUCU_TABAN + kademeEki + (mirasSurduruldu ? 4 : 0);
}
