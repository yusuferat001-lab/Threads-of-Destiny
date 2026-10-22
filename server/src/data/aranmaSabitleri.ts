// Aranma II (2026-10): gizli suç / ifşa, kefaret, polis uyarısı, baskın, yıldız
// debuff'ları ve hapis süreleri için TÜM sayılar tek yerde (aileSabitleri.ts gibi).
// Saf veri + saf yardımcılar — oyun durumu import etmez (döngüsel bağ olmasın).
import type { SucSinifi } from "../types";

/**
 * Suç büyüklüğü sınıfları (2026-10, kullanıcı isteği "aranma artışı suça göre belli bir
 * aralıkta olsun"): olay verisi yalnız `suc_sinifi` yazar, motor aralıktan rastgele tam
 * sayı seçer. Aralıklar TEK yerde — dengelemek için buradan ayarlanır.
 *  - kucuk: hafif hile / küçük vurgun · orta: rüşvet, sahte mal, kavga · buyuk: soygun,
 *    ağır şiddet, isyan · agir: suçüstü yakalanma (başarısız dalda bir üst sınıf).
 */
export const SUC_SINIFI_ARALIKLARI: Record<SucSinifi, readonly [number, number]> = {
  kucuk: [4, 8],
  orta: [10, 16],
  buyuk: [20, 26],
  agir: [24, 30],
};

/** Başarısız dal (suçüstü) için bir üst sınıf: kucuk→orta, orta→buyuk, buyuk/agir→agir. */
export function sucSinifiUst(sinif: SucSinifi): SucSinifi {
  return sinif === "kucuk" ? "orta" : sinif === "orta" ? "buyuk" : "agir";
}

/** Sınıfın aralığından (dahil) rastgele tam sayı aranma puanı. */
export function sucSinifiDegeri(sinif: SucSinifi): number {
  const [min, max] = SUC_SINIFI_ARALIKLARI[sinif];
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** [min, max] aralığından (dahil) rastgele tam sayı. */
export function aralikTamSayi(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// ─── Yıldızlar (3 yıldız: 25 / 50 / 75) ──────────────────────────────────────
export const ARANMA_YILDIZ_ESIKLERI = [25, 50, 75] as const;
export const ARANMA_MAKS_YILDIZ = 3;

export function yildizSayisi(sucSeviyesi: number): number {
  let y = 0;
  for (const e of ARANMA_YILDIZ_ESIKLERI) if (sucSeviyesi >= e) y++;
  return y;
}

/** Yıldıza göre mesleki maaş debuff'ı (oran): 1★ %5.5 · 2★ %10 · 3★ %15. */
export const ARANMA_MESLEK_DEBUFF = [0, 0.055, 0.1, 0.15] as const;
/** v10 — işletmeli üç meslekte (Tüccar/Zanaatkâr/Din) aranma gelir kısmaz; yıllık müşteri/inanan ve ahlak kaybı olur. */
export const ARANMA_MUSTERI_KAYBI = [0, 0.01, 0.025, 0.04] as const;
export const ARANMA_AHLAK_KAYBI = [0, 0.3, 0.6, 1.0] as const;
export function aranmaMusteriKaybi(sucSeviyesi: number): number {
  return ARANMA_MUSTERI_KAYBI[yildizSayisi(sucSeviyesi)];
}
export function aranmaAhlakKaybi(sucSeviyesi: number): number {
  return ARANMA_AHLAK_KAYBI[yildizSayisi(sucSeviyesi)];
}

export function meslekDebuffOrani(sucSeviyesi: number): number {
  return ARANMA_MESLEK_DEBUFF[yildizSayisi(sucSeviyesi)];
}

/** Yüksek yıldız suçu kolaylaştırır: suç sınıflı şıklarda başarı şansı 0★:+0 · 1★:+7 · 2★:+14 · 3★:+25 puan. */
export const ARANMA_BASARI_BONUSU = [0, 7, 14, 25] as const;
export function sucBasariBonusu(sucSeviyesi: number): number {
  return ARANMA_BASARI_BONUSU[yildizSayisi(sucSeviyesi)];
}

/** ...ve yakalanma / ifşa riski düşer: %0 / %10 / %20 / %30 daha az (×1 / ×0.9 / ×0.8 / ×0.7). */
export const ARANMA_RISK_CARPANI = [1, 0.9, 0.8, 0.7] as const;
export function sucRiskCarpani(sucSeviyesi: number): number {
  return ARANMA_RISK_CARPANI[yildizSayisi(sucSeviyesi)];
}

// ─── Gizli suç / ifşa ────────────────────────────────────────────────────────
/** Başarılı (gizli kalan) bir suçun ileride ifşa olma olasılığı, sınıfa göre. */
export const IFSA_OLASILIK: Record<SucSinifi, number> = { kucuk: 0.25, orta: 0.35, buyuk: 0.55, agir: 0.55 };
/** Suçtan kaç yıl sonra ifşa olabilir (rastgele, dahil). */
export const IFSA_YIL_MIN = 4;
export const IFSA_YIL_MAX = 10;
/** İfşa olunca ahlak düşüşü (sınıfa göre). */
export const IFSA_AHLAK_DUSUSU: Record<SucSinifi, number> = { kucuk: 2, orta: 4, buyuk: 6, agir: 8 };

// ─── Kefaret ─────────────────────────────────────────────────────────────────
export const KEFARET_KATSAYI_MIN = 3.3;
export const KEFARET_KATSAYI_MAX = 3.7;
/** Aranma ekranından gönüllü ödemede indirim (uyarıdaki zorunlu ödemede YOK). */
export const KEFARET_GONULLU_INDIRIM = 0.2;
/** Yarım ödeme seçeneği için aranma eşiği ("30 üstü"). */
export const KEFARET_YARIM_ESIGI = 30;
/** Kefareti ödememe / reddetme cezası (aranma artışı). */
export const KEFARET_RED_ARANMA_MIN = 6;
export const KEFARET_RED_ARANMA_MAX = 9;

// ─── Polis uyarısı (60 üstü) ─────────────────────────────────────────────────
export const POLIS_UYARI_ESIGI = 60;
export const POLIS_UYARI_GECIKME_MIN_YIL = 2;
export const POLIS_UYARI_GECIKME_MAX_YIL = 3;
export const POLIS_UYARI_COOLDOWN_YIL = 10;

// ─── 3★ baskın (75 üstü) ─────────────────────────────────────────────────────
export const BASKIN_ESIGI = 75;
export const BASKIN_GECIKME_MIN_YIL = 4;
export const BASKIN_GECIKME_MAX_YIL = 5;
export const BASKIN_KACIS_SANSI = 0.2;
/** Baskından kaçınca aranma bu değere iner (mevcut büyük baskın olaylarıyla aynı). */
export const BASKIN_KACIS_SONRASI_ARANMA = 30;

// ─── Hapis ───────────────────────────────────────────────────────────────────
/** Bant → ceza (yıl, dahil aralık): 0-25 · 25-50 · 50-75 · 75+. */
export const HAPIS_CEZA_ARALIKLARI: readonly (readonly [number, number])[] = [
  [3, 4],
  [7, 9],
  [9, 11],
  [12, 14],
];
/** Gönüllü teslim olana ceza indirimi. */
export const HAPIS_TESLIM_INDIRIM = 0.25;
/** Gönüllü teslim için asgari aranma (1★). */
export const HAPIS_TESLIM_MIN_ARANMA = 25;
/** Tahliyede aranma bu değere çekilir (ceza çekildi, sicil büyük ölçüde silindi). */
export const HAPIS_TAHLIYE_ARANMA = 10;

/** Tutuklanma anındaki aranmaya göre ceza süresi (yıl). */
export function hapisCezaSuresiAraligi(sucSeviyesi: number): readonly [number, number] {
  const idx = sucSeviyesi >= 75 ? 3 : sucSeviyesi >= 50 ? 2 : sucSeviyesi >= 25 ? 1 : 0;
  return HAPIS_CEZA_ARALIKLARI[idx];
}

/** Gönüllü teslim cezası: %25 indirim, yuvarlanmış, en az 1 yıl. */
export function teslimCezasi(ceza: number): number {
  return Math.max(1, Math.round(ceza * (1 - HAPIS_TESLIM_INDIRIM)));
}
