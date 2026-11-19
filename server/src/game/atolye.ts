import type { AtolyeDurumu, CharacterState } from "../types";
import type { UrunBonusu } from "../data/meslekProfilleri";
import {
  MODEL_FIYAT_ARTISI,
  MODEL_MAKS,
  MODEL_TALEP_ARTISI,
  PROJE_BASARISIZ_ITIBAR,
  SAHESER_ITIBAR,
  SAHESER_MUSTERI,
  SAHESER_SOHRET,
  TEZGAH_ICAT_MAKS,
  TEZGAH_ICAT_TAVAN,
  VERIM_MALIYET_INDIRIMI,
  VERIM_MAKS,
  type ProjeTanimi,
} from "../data/atolye";
import { itibarEkle } from "./itibar";
import { musteriKaydir } from "./piyasa";

/** Zanaatkâr geliştirmeleri (verim, model, tezgâh icadı, erken açılan hatlar); alan yoksa oluşturur. */
export function atolyeDurumu(state: CharacterState): AtolyeDurumu {
  const is = state.isletme!;
  if (!is.atolye) is.atolye = { verim: {}, model: {}, tezgah: 0, acilan_hatlar: [] };
  return is.atolye;
}

/** Hat başına kalıcı geliştirme bonusu: verim → alış maliyeti, model → satış fiyatı ve talep. `hatBonusu` birleştirir. */
export function atolyeBonusu(state: CharacterState, hatId: string): UrunBonusu | null {
  const a = state.isletme?.atolye;
  if (state.meslek !== "Zanaatkâr" || !a) return null;
  const v = a.verim[hatId] ?? 0;
  const m = a.model[hatId] ?? 0;
  if (!v && !m) return null;
  return {
    ...(v ? { alisCarpani: 1 - VERIM_MALIYET_INDIRIMI * v } : {}),
    ...(m ? { satisCarpani: 1 + MODEL_FIYAT_ARTISI * m, talepCarpani: 1 + MODEL_TALEP_ARTISI * m } : {}),
  };
}

/** Tezgâh icadının üretim tavanı çarpanı. */
export function atolyeTavanCarpani(state: CharacterState): number {
  return 1 + TEZGAH_ICAT_TAVAN * (state.isletme?.atolye?.tezgah ?? 0);
}

/** Yeni ürün hattı projesiyle rütbe şartsız açılan hat mı? */
export function atolyeHatAcikMi(state: CharacterState, hatId: string): boolean {
  return !!state.isletme?.atolye?.acilan_hatlar.includes(hatId);
}

/** Bu hat bu proje türü için hâlâ geliştirilebilir mi (kademe tavanı)? */
export function atolyeHatGelistirilebilir(state: CharacterState, t: ProjeTanimi, hatId: string): boolean {
  const a = state.isletme?.atolye;
  if (t.tur === "verim") return (a?.verim[hatId] ?? 0) < VERIM_MAKS;
  if (t.tur === "model") return (a?.model[hatId] ?? 0) < MODEL_MAKS;
  return true;
}

export function atolyeTezgahGelistirilebilir(state: CharacterState): boolean {
  return (state.isletme?.atolye?.tezgah ?? 0) < TEZGAH_ICAT_MAKS;
}

/** Projenin sonucunu uygular (başarı: kalıcı etki; başarısızlık: itibar ve şöhret bedeli). */
export function atolyeSonucUygula(state: CharacterState, t: ProjeTanimi, hat: string | null, basari: boolean): void {
  if (!basari) {
    itibarEkle(state, PROJE_BASARISIZ_ITIBAR);
    state.un = Math.max(0, state.un - 1);
    return;
  }
  const a = atolyeDurumu(state);
  switch (t.tur) {
    case "verim":
      if (hat) a.verim[hat] = Math.min(VERIM_MAKS, (a.verim[hat] ?? 0) + 1);
      break;
    case "model":
      if (hat) a.model[hat] = Math.min(MODEL_MAKS, (a.model[hat] ?? 0) + 1);
      break;
    case "hat":
      if (hat && !a.acilan_hatlar.includes(hat)) a.acilan_hatlar.push(hat);
      break;
    case "tezgah":
      a.tezgah = Math.min(TEZGAH_ICAT_MAKS, a.tezgah + 1);
      break;
    case "saheser":
      itibarEkle(state, SAHESER_ITIBAR);
      state.un = Math.min(100, state.un + SAHESER_SOHRET);
      musteriKaydir(state, "oyuncu", state.meslek_musteri * SAHESER_MUSTERI);
      break;
  }
}
