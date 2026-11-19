import type { CharacterState, ProjeDurumu } from "../types";
import { isletmeProfiliGetir } from "../data/meslekProfilleri";
import {
  ATOLYE_KARARLARI,
  ATOLYE_KARAR_BASLIK,
  ATOLYE_PROJELERI,
  PROJE_SANS_TABAN,
  PROJE_UZAT_SANS,
  PROJE_USTA_KATKI,
  PROJE_USTA_TAVAN,
  PROJE_VAZGEC_ITIBAR,
  atolyeProjesiGetir,
  type ProjeTanimi,
} from "../data/atolye";
import { ESKORTLAR, SEFER_KARAR_METINLERI, YOL_OLAYLARI, seferGetir } from "../data/ticaret";
import { ekipBonuslari, hatKilitNedeni } from "./isletme";
import { itibarDegeri, itibarEkle } from "./itibar";
import { atolyeHatAcikMi, atolyeHatGelistirilebilir, atolyeSonucUygula, atolyeTezgahGelistirilebilir } from "./atolye";
import { eskortGetir, seferKatalogu, seferKararUygula, seferOlayiSec, seferSansi } from "./ticaret";

/**
 * Proje yuvası: aynı anda tek, çok yıllı proje. Zanaatkâr = atölye projesi (ürün geliştirme/icat), Tüccar = ticaret seferi.
 * Süre dolunca `karar_bekliyor` olur; oyuncu karar verene dek oyun devam etmez (münazara gibi zorunlu karar).
 */
export interface ProjeOrtak {
  id: string;
  minRutbe: number;
  sure: number;
  /** "acik": rütbesi yeten bir hat; "kilitli": rütbesi yetmeyen bir hat; null: hat gerekmez. */
  hat: "acik" | "kilitli" | null;
  masraf: number;
  tavanPayi: number;
  zorluk: number;
}

export function projeKatalogu(state: CharacterState): ProjeOrtak[] {
  if (state.meslek === "Zanaatkâr") return ATOLYE_PROJELERI;
  return seferKatalogu(state).map((s) => ({ id: s.id, minRutbe: s.minRutbe, sure: s.sure, hat: "acik" as const, masraf: s.masraf, tavanPayi: 0, zorluk: s.risk }));
}

export function projeTanimiGetir(state: CharacterState, id: string): ProjeOrtak | undefined {
  return projeKatalogu(state).find((p) => p.id === id);
}

export function projeDurumu(state: CharacterState): ProjeDurumu | null {
  return state.isletme?.proje ?? null;
}

export function projeBekliyorMu(state: CharacterState): boolean {
  return !!projeDurumu(state)?.karar_bekliyor;
}

/** Projenin hedef olabilecek hatları (hat gerektirmeyen projelerde boş). */
export function projeHatAdaylari(state: CharacterState, t: ProjeOrtak): string[] {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil || !t.hat) return [];
  return profil.hatlar
    .filter((h) => {
      const kilit = hatKilitNedeni(state, h);
      if (t.hat === "acik") return kilit === null && (state.meslek !== "Zanaatkâr" || atolyeHatGelistirilebilir(state, atolyeProjesiGetir(t.id)!, h.id));
      return kilit === "rutbe" && !atolyeHatAcikMi(state, h.id);
    })
    .map((h) => h.id);
}

/** Proje başlatılamıyorsa nedeni; başlatılabiliyorsa null. */
export function projeKilitNedeni(state: CharacterState, t: ProjeOrtak): "rutbe" | "hat" | "tezgah" | "proje" | null {
  if (projeDurumu(state)) return "proje";
  if (t.minRutbe > (state.rutbe_seviye ?? 1)) return "rutbe";
  if (state.meslek === "Zanaatkâr" && atolyeProjesiGetir(t.id)?.tur === "tezgah" && !atolyeTezgahGelistirilebilir(state)) return "tezgah";
  if (t.hat && projeHatAdaylari(state, t).length === 0) return "hat";
  return null;
}

/** `secim`: Tüccar seferinde eskort seviyesi (yoksa "yok"). */
export function projeBaslat(state: CharacterState, id: string, hat?: string | null, secim?: string | null): void {
  const is = state.isletme;
  const t = is ? projeTanimiGetir(state, id) : undefined;
  if (!is || !t) throw new Error("Böyle bir proje yok.");
  const kilit = projeKilitNedeni(state, t);
  if (kilit === "proje") throw new Error("Önce yürüyen projeni bitirmeli ya da bırakmalısın.");
  if (kilit === "rutbe") throw new Error("Bu proje için rütben yetersiz.");
  if (kilit === "tezgah") throw new Error("Tezgâhın bu yönde daha fazla geliştirilemez.");
  if (kilit === "hat") throw new Error("Bu proje için uygun bir ürün hattı yok.");
  if (t.hat && (!hat || !projeHatAdaylari(state, t).includes(hat))) throw new Error("Bu proje için geçersiz ürün hattı.");
  const eskort = state.meslek === "Tüccar" ? (secim ?? "yok") : null;
  if (eskort !== null && !ESKORTLAR.some((e) => e.id === eskort)) throw new Error("Geçersiz eskort seçimi.");
  is.proje = { id: t.id, hat: t.hat ? hat! : null, kalan: t.sure, gecen: 0, uzatildi: false, karar_bekliyor: false, secim: eskort, olay: null };
}

/** Projeyi bırakır (en az bir yıl geçtiyse itibar bedeli). */
export function projeBirak(state: CharacterState): void {
  const p = projeDurumu(state);
  if (!p) throw new Error("Yürüyen bir projen yok.");
  if (p.karar_bekliyor) throw new Error("Önce proje kararını vermelisin.");
  if (p.gecen > 0) itibarEkle(state, PROJE_VAZGEC_ITIBAR);
  state.isletme!.proje = null;
}

function yurumeVar(state: CharacterState): { p: ProjeDurumu; t: ProjeOrtak } | null {
  const p = projeDurumu(state);
  const t = p ? projeTanimiGetir(state, p.id) : undefined;
  return p && t && !p.karar_bekliyor ? { p, t } : null;
}

/** Bu yılki proje masrafı (gider enflasyonlu; sefer eskortu dahil); dükkân giderine girer. */
export function projeMasrafi(state: CharacterState, giderEnflasyon: number): number {
  const y = yurumeVar(state);
  if (!y) return 0;
  const eskort = state.meslek === "Tüccar" ? eskortGetir(y.p.secim).masraf : 0;
  return Math.round((y.t.masraf + eskort) * giderEnflasyon * 100) / 100;
}

/** Proje sürerken üretim tavanından ayrılan payın çarpanı (1 = pay yok). */
export function projeTavanCarpani(state: CharacterState): number {
  const y = yurumeVar(state);
  return y ? 1 - y.t.tavanPayi : 1;
}

/** Atölye projesi: süre dolunca başarı şansı (zorluk, itibar, Üretici çalışanlar, uzatma). */
export function projeBasariSansi(state: CharacterState, t: ProjeOrtak, uzatildi: boolean): number {
  const usta = Math.min(PROJE_USTA_TAVAN, ekipBonuslari(state).ana * PROJE_USTA_KATKI);
  const sans = PROJE_SANS_TABAN - t.zorluk + (itibarDegeri(state) - 50) / 250 + usta + (uzatildi ? PROJE_UZAT_SANS : 0);
  return Math.max(0.2, Math.min(0.95, sans));
}

/** Oyuncuya yalnız sözel gösterilir. */
export function projeSansEtiketi(sans: number): "iyi" | "belirsiz" | "zor" {
  return sans >= 0.75 ? "iyi" : sans >= 0.5 ? "belirsiz" : "zor";
}

/** Yıl işlenirken: sayaç ilerler, süre dolunca karar penceresi beklenir (seferde yolda çıkan olay seçilir). */
export function projeYilIsle(state: CharacterState): void {
  const y = yurumeVar(state);
  if (!y) return;
  y.p.gecen += 1;
  y.p.kalan -= 1;
  if (y.p.kalan <= 0) {
    y.p.karar_bekliyor = true;
    const sefer = seferGetir(y.p.id);
    if (sefer) y.p.olay = seferOlayiSec(sefer);
  }
}

type IkiMetin = { tr: string; en: string };
export interface ProjeKararGorunumu {
  simge: string;
  baslik: IkiMetin;
  metin: IkiMetin;
  secenekler: { id: string; simge: string; ad: IkiMetin; aciklama: IkiMetin; sans: "iyi" | "belirsiz" | "zor" | null }[];
}

/** Süre dolunca açılan karar penceresinin içeriği (yoksa null). */
export function projeKarariGorunumu(state: CharacterState): ProjeKararGorunumu | null {
  const p = projeDurumu(state);
  if (!p || !p.karar_bekliyor) return null;
  const sefer = seferGetir(p.id);
  if (sefer) {
    const olay = p.olay ? YOL_OLAYLARI[p.olay] : null;
    return {
      simge: olay?.simge ?? "🧭",
      baslik: olay?.ad ?? { tr: "Yolda", en: "On the road" },
      metin: olay?.metin ?? { tr: "Yolda bir şey oldu.", en: "Something happened on the road." },
      secenekler: (["ode", "pazarlik", "karsi", "geri"] as const).map((id) => {
        const sans = seferSansi(state, sefer, p, id);
        const m = SEFER_KARAR_METINLERI[id];
        return { id, simge: m.simge, ad: m.ad, aciklama: m.aciklama, sans: sans === null ? null : projeSansEtiketi(sans) };
      }),
    };
  }
  const t = projeTanimiGetir(state, p.id);
  const sans = t ? projeSansEtiketi(projeBasariSansi(state, t, p.uzatildi)) : null;
  return {
    simge: atolyeProjesiGetir(p.id)?.simge ?? "🔬",
    baslik: ATOLYE_KARAR_BASLIK.baslik,
    metin: ATOLYE_KARAR_BASLIK.metin,
    secenekler: (["sur", "uzat", "vazgec"] as const)
      .filter((id) => id !== "uzat" || !p.uzatildi)
      .map((id) => ({ id, simge: ATOLYE_KARARLARI[id].simge, ad: ATOLYE_KARARLARI[id].ad, aciklama: ATOLYE_KARARLARI[id].aciklama, sans: id === "sur" ? sans : null })),
  };
}

export interface ProjeSonucu {
  id: string;
  hat: string | null;
  aile: "atolye" | "sefer";
  sonuc: "basari" | "basarisiz" | "uzatildi" | "vazgecti";
}

/** Süre dolunca verilen karar. Atölye: "sur" | "uzat" | "vazgec"; sefer: "ode" | "pazarlik" | "karsi" | "geri". */
export function projeKararVer(state: CharacterState, secim: string, giderEnflasyon = 1): ProjeSonucu {
  const p = projeDurumu(state);
  if (!p || !p.karar_bekliyor) throw new Error("Şu an bekleyen bir proje kararı yok.");
  const bilgi = { id: p.id, hat: p.hat };
  const sefer = seferGetir(p.id);
  if (sefer) {
    const sonuc = seferKararUygula(state, sefer, p, secim, giderEnflasyon);
    state.isletme!.proje = null;
    return { ...bilgi, aile: "sefer", sonuc };
  }
  const t = projeTanimiGetir(state, p.id);
  const atolye = atolyeProjesiGetir(p.id);
  if (!t || !atolye) throw new Error("Şu an bekleyen bir proje kararı yok.");
  if (secim !== "sur" && secim !== "uzat" && secim !== "vazgec") throw new Error("Geçersiz proje kararı.");
  if (secim === "uzat") {
    if (p.uzatildi) throw new Error("Bu proje daha fazla uzatılamaz.");
    p.uzatildi = true;
    p.kalan = 1;
    p.karar_bekliyor = false;
    return { ...bilgi, aile: "atolye", sonuc: "uzatildi" };
  }
  if (secim === "vazgec") {
    itibarEkle(state, PROJE_VAZGEC_ITIBAR);
    state.isletme!.proje = null;
    return { ...bilgi, aile: "atolye", sonuc: "vazgecti" };
  }
  const basari = Math.random() < projeBasariSansi(state, t, p.uzatildi);
  atolyeSonucUygula(state, atolye as ProjeTanimi, p.hat, basari);
  state.isletme!.proje = null;
  return { ...bilgi, aile: "atolye", sonuc: basari ? "basari" : "basarisiz" };
}
