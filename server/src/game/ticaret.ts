import type { CharacterState, ProjeDurumu } from "../types";
import type { UrunBonusu } from "../data/meslekProfilleri";
import { ESKORTLAR, SEFERLER, SEFER_BASARISIZ_ITIBAR, SEFER_BASARI_ITIBAR, SEFER_KARARLARI, YOL_OLAYLARI, type SeferTanimi } from "../data/ticaret";
import { itibarDegeri, itibarEkle } from "./itibar";

/** Tüccar seferleri: seçilen çağın rotaları. */
export function seferKatalogu(state: CharacterState): SeferTanimi[] {
  return state.meslek === "Tüccar" ? SEFERLER.filter((s) => s.cag === state.cag) : [];
}

export function eskortGetir(id: string | null | undefined) {
  return ESKORTLAR.find((e) => e.id === id) ?? ESKORTLAR[0];
}

/** Süreli sefer etkilerinden gelen hat bonusu (çarpımsal); `hatBonusu` birleştirir. */
export function seferBonusu(state: CharacterState, hatId: string): UrunBonusu | null {
  let satis = 1;
  let alis = 1;
  let etkili = false;
  for (const e of state.isletme?.sefer_etkileri ?? []) {
    if (e.hat !== hatId || e.bitis_yili < state.yil) continue;
    satis *= 1 + e.satis;
    alis *= 1 - e.alis;
    etkili = true;
  }
  return etkili ? { satisCarpani: satis, alisCarpani: alis } : null;
}

/** Süresi dolan etkileri temizler (yıl işlerken). */
export function seferEtkileriniTemizle(state: CharacterState): void {
  const is = state.isletme;
  if (is?.sefer_etkileri) is.sefer_etkileri = is.sefer_etkileri.filter((e) => e.bitis_yili >= state.yil);
}

/** Süre dolunca yolda çıkan olay. */
export function seferOlayiSec(t: SeferTanimi): string {
  return t.olaylar[Math.floor(Math.random() * t.olaylar.length)];
}

const sinirla = (x: number) => Math.max(0.15, Math.min(0.9, x));

/** Karar başına başarı şansı (geri dönüşte null). */
export function seferSansi(state: CharacterState, t: SeferTanimi, p: ProjeDurumu, secim: "ode" | "pazarlik" | "karsi" | "geri"): number | null {
  if (secim === "ode") return SEFER_KARARLARI.ode.sans;
  if (secim === "pazarlik") return sinirla(SEFER_KARARLARI.pazarlik.taban - t.risk + (itibarDegeri(state) - 50) / SEFER_KARARLARI.pazarlik.itibarBolen);
  if (secim === "karsi") return sinirla(SEFER_KARARLARI.karsi.taban - t.risk + eskortGetir(p.secim).koruma);
  return null;
}

export function seferYolOlayi(p: ProjeDurumu) {
  return p.olay ? YOL_OLAYLARI[p.olay] ?? null : null;
}

/** Yol olayına verilen karar: sonucu uygular. */
export function seferKararUygula(state: CharacterState, t: SeferTanimi, p: ProjeDurumu, secim: string, giderEnflasyon: number): "basari" | "basarisiz" | "vazgecti" {
  if (secim !== "ode" && secim !== "pazarlik" && secim !== "karsi" && secim !== "geri") throw new Error("Geçersiz proje kararı.");
  const para = (x: number) => {
    state.para = Math.round((state.para - x) * 100) / 100;
  };
  const kayip = (katsayi: number) => t.masraf * katsayi * giderEnflasyon;
  if (secim === "geri") {
    itibarEkle(state, SEFER_KARARLARI.geri.itibar);
    return "vazgecti";
  }
  const sans = seferSansi(state, t, p, secim)!;
  let karPayi = 1;
  if (secim === "ode") {
    para(kayip(SEFER_KARARLARI.ode.fidyeKatsayi));
    karPayi = SEFER_KARARLARI.ode.karPayi;
  }
  const basari = Math.random() < sans;
  if (!basari) {
    if (secim === "pazarlik") para(kayip(SEFER_KARARLARI.pazarlik.kayipKatsayi));
    if (secim === "karsi") {
      para(kayip(SEFER_KARARLARI.karsi.kayipKatsayi));
      state.saglik = Math.max(1, state.saglik - SEFER_KARARLARI.karsi.saglik);
    }
    itibarEkle(state, SEFER_BASARISIZ_ITIBAR);
    return "basarisiz";
  }
  if (secim === "karsi") state.un = Math.min(100, state.un + SEFER_KARARLARI.karsi.sohret);
  const is = state.isletme!;
  (is.sefer_etkileri ??= []).push({ hat: p.hat!, rota: t.id, satis: t.satisPrimi * karPayi, alis: t.alisIndirimi * karPayi, bitis_yili: state.yil + t.etkiYil });
  itibarEkle(state, SEFER_BASARI_ITIBAR);
  return "basari";
}
