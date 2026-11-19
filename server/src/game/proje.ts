import type { CharacterState, ProjeDurumu } from "../types";
import { isletmeProfiliGetir } from "../data/meslekProfilleri";
import {
  ATOLYE_PROJELERI,
  PROJE_SANS_TABAN,
  PROJE_UZAT_SANS,
  PROJE_USTA_KATKI,
  PROJE_USTA_TAVAN,
  PROJE_VAZGEC_ITIBAR,
  atolyeProjesiGetir,
  type ProjeTanimi,
} from "../data/atolye";
import { ekipBonuslari, hatKilitNedeni } from "./isletme";
import { itibarDegeri, itibarEkle } from "./itibar";
import { atolyeHatAcikMi, atolyeHatGelistirilebilir, atolyeSonucUygula, atolyeTezgahGelistirilebilir } from "./atolye";

/**
 * Proje yuvası: aynı anda tek, çok yıllı proje (şu an yalnız Zanaatkâr atölye projeleri).
 * Süre dolunca `karar_bekliyor` olur; oyuncu sürer / bir yıl uzatır / vazgeçer (münazara gibi zorunlu karar).
 */
export function projeTanimiGetir(id: string): ProjeTanimi | undefined {
  return atolyeProjesiGetir(id);
}

export function projeKatalogu(state: CharacterState): ProjeTanimi[] {
  return state.meslek === "Zanaatkâr" ? ATOLYE_PROJELERI : [];
}

export function projeDurumu(state: CharacterState): ProjeDurumu | null {
  return state.isletme?.proje ?? null;
}

export function projeBekliyorMu(state: CharacterState): boolean {
  return !!projeDurumu(state)?.karar_bekliyor;
}

/** Projenin hedef olabilecek hatları (hat gerektirmeyen projelerde boş). */
export function projeHatAdaylari(state: CharacterState, t: ProjeTanimi): string[] {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !t.hat) return [];
  return profil.hatlar
    .filter((h) => {
      const kilit = hatKilitNedeni(state, h);
      if (t.hat === "acik") return kilit === null && atolyeHatGelistirilebilir(state, t, h.id);
      return kilit === "rutbe" && !atolyeHatAcikMi(state, h.id);
    })
    .map((h) => h.id);
}

/** Proje başlatılamıyorsa nedeni; başlatılabiliyorsa null. */
export function projeKilitNedeni(state: CharacterState, t: ProjeTanimi): "rutbe" | "hat" | "tezgah" | "proje" | null {
  if (projeDurumu(state)) return "proje";
  if (t.minRutbe > (state.rutbe_seviye ?? 1)) return "rutbe";
  if (t.tur === "tezgah" && !atolyeTezgahGelistirilebilir(state)) return "tezgah";
  if (t.hat && projeHatAdaylari(state, t).length === 0) return "hat";
  return null;
}

export function projeBaslat(state: CharacterState, id: string, hat?: string | null): void {
  const is = state.isletme;
  const t = projeKatalogu(state).find((p) => p.id === id);
  if (!is || !t) throw new Error("Böyle bir proje yok.");
  const kilit = projeKilitNedeni(state, t);
  if (kilit === "proje") throw new Error("Önce yürüyen projeni bitirmeli ya da bırakmalısın.");
  if (kilit === "rutbe") throw new Error("Bu proje için rütben yetersiz.");
  if (kilit === "tezgah") throw new Error("Tezgâhın bu yönde daha fazla geliştirilemez.");
  if (kilit === "hat") throw new Error("Bu proje için uygun bir ürün hattı yok.");
  if (t.hat && (!hat || !projeHatAdaylari(state, t).includes(hat))) throw new Error("Bu proje için geçersiz ürün hattı.");
  is.proje = { id: t.id, hat: t.hat ? hat! : null, kalan: t.sure, gecen: 0, uzatildi: false, karar_bekliyor: false };
}

/** Projeyi bırakır (en az bir yıl geçtiyse itibar bedeli). */
export function projeBirak(state: CharacterState): void {
  const p = projeDurumu(state);
  if (!p) throw new Error("Yürüyen bir projen yok.");
  if (p.karar_bekliyor) throw new Error("Önce proje kararını vermelisin.");
  if (p.gecen > 0) itibarEkle(state, PROJE_VAZGEC_ITIBAR);
  state.isletme!.proje = null;
}

function yurumeVar(state: CharacterState): { p: ProjeDurumu; t: ProjeTanimi } | null {
  const p = projeDurumu(state);
  const t = p ? projeTanimiGetir(p.id) : undefined;
  return p && t && !p.karar_bekliyor ? { p, t } : null;
}

/** Bu yılki proje masrafı (gider enflasyonlu); dükkân giderine girer. */
export function projeMasrafi(state: CharacterState, giderEnflasyon: number): number {
  const y = yurumeVar(state);
  return y ? Math.round(y.t.masraf * giderEnflasyon * 100) / 100 : 0;
}

/** Proje sürerken üretim tavanından ayrılan payın çarpanı (1 = pay yok). */
export function projeTavanCarpani(state: CharacterState): number {
  const y = yurumeVar(state);
  return y ? 1 - y.t.tavanPayi : 1;
}

/** Süre dolunca başarı şansı: görevin zorluğu, itibar (Ustalık), Üretici çalışanlar, uzatma. */
export function projeBasariSansi(state: CharacterState, t: ProjeTanimi, uzatildi: boolean): number {
  const usta = Math.min(PROJE_USTA_TAVAN, ekipBonuslari(state).ana * PROJE_USTA_KATKI);
  const sans = PROJE_SANS_TABAN - t.zorluk + (itibarDegeri(state) - 50) / 250 + usta + (uzatildi ? PROJE_UZAT_SANS : 0);
  return Math.max(0.2, Math.min(0.95, sans));
}

/** Oyuncuya yalnız sözel gösterilir. */
export function projeSansEtiketi(sans: number): "iyi" | "belirsiz" | "zor" {
  return sans >= 0.75 ? "iyi" : sans >= 0.5 ? "belirsiz" : "zor";
}

/** Yıl işlenirken: sayaç ilerler, süre dolunca karar penceresi beklenir. */
export function projeYilIsle(state: CharacterState): void {
  const y = yurumeVar(state);
  if (!y) return;
  y.p.gecen += 1;
  y.p.kalan -= 1;
  if (y.p.kalan <= 0) y.p.karar_bekliyor = true;
}

export interface ProjeSonucu {
  id: string;
  hat: string | null;
  sonuc: "basari" | "basarisiz" | "uzatildi" | "vazgecti";
}

/** Süre dolunca verilen karar: "sur" (zarla sonuçlan), "uzat" (bir yıl daha, bir kez), "vazgec". */
export function projeKararVer(state: CharacterState, secim: string): ProjeSonucu {
  const p = projeDurumu(state);
  const t = p ? projeTanimiGetir(p.id) : undefined;
  if (!p || !t || !p.karar_bekliyor) throw new Error("Şu an bekleyen bir proje kararı yok.");
  if (secim !== "sur" && secim !== "uzat" && secim !== "vazgec") throw new Error("Geçersiz proje kararı.");
  const bilgi = { id: p.id, hat: p.hat };
  if (secim === "uzat") {
    if (p.uzatildi) throw new Error("Bu proje daha fazla uzatılamaz.");
    p.uzatildi = true;
    p.kalan = 1;
    p.karar_bekliyor = false;
    return { ...bilgi, sonuc: "uzatildi" };
  }
  if (secim === "vazgec") {
    itibarEkle(state, PROJE_VAZGEC_ITIBAR);
    state.isletme!.proje = null;
    return { ...bilgi, sonuc: "vazgecti" };
  }
  const basari = Math.random() < projeBasariSansi(state, t, p.uzatildi);
  atolyeSonucUygula(state, t, p.hat, basari);
  state.isletme!.proje = null;
  return { ...bilgi, sonuc: basari ? "basari" : "basarisiz" };
}
