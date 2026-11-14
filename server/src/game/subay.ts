import type { CharacterState, EkipUyesi, IsletmeRolTuru } from "../types";

/**
 * Asker subayları (Taarruz, Savunma, Keşif, Devşirme, Tabip) — TEK formül yeri.
 * Her etki yeteneğe (Y30 / Y60 / Y90) göre ara değerlenir; sadık (≥80) subay ×1,05. Aynı türden birden çok subay toplanır, tavanlıdır.
 */
const SADIK_ESIGI = 80;
const SADIK_BONUS = 1.05;

/** [Y30, Y60, Y90] noktalarından doğrusal eğri; 0–30 arası değerin yarısından başlar, 90–100 arası %5 daha artar. */
function egri(yetenek: number, v: [number, number, number]): number {
  const y = Math.max(0, Math.min(100, yetenek));
  if (y <= 30) return v[0] * (0.5 + (0.5 * y) / 30);
  if (y <= 60) return v[0] + ((v[1] - v[0]) * (y - 30)) / 30;
  if (y <= 90) return v[1] + ((v[2] - v[1]) * (y - 60)) / 30;
  return v[2] * (1 + (0.05 * (y - 90)) / 10);
}

export interface SubayTablosu {
  /** Saldırı / savunma gücüne eklenen kesir. */
  saldiri: [number, number, number];
  savunma: [number, number, number];
}
export const SUBAY_DEGERLERI = {
  taarruz: { saldiri: [0.09, 0.15, 0.2], ganimet: [0.04, 0.07, 0.1], kayipArtis: [0.03, 0.04, 0.06] },
  savunma: { savunma: [0.09, 0.15, 0.2], olu: [0.04, 0.07, 0.1], ganimetEksi: [0.02, 0.04, 0.05] },
  kesif: { arazi: [0.22, 0.34, 0.46], tahmin: [0.041, 0.032, 0.023], pusu: [0.24, 0.48, 0.72] },
  devsirme: { er: [1.5, 3, 3.8] },
  tabip: { oluFirar: [0.13, 0.22, 0.3], yarali: [0.08, 0.14, 0.21] },
} as const;

/** `devsirme`: tüm devşirme subaylarının toplamı en çok bu kadar er/yıl (tek subay da en çok 4: Y100 + sadık). */
export const SUBAY_TAVANLARI = { saldiri: 0.3, savunma: 0.3, arazi: 0.95, oluFirar: 0.3, yarali: 0.3, devsirme: 4 } as const;
/** Düşman tahmin aralığının tabanı (±%5); Keşif subayı bunu ±%4,1…%2,3'e daraltır. */
export const TAHMIN_ARALIGI_TABAN = 0.05;

export interface SubayEtkileri {
  saldiri: number;
  savunma: number;
  /** Ganimet çarpanına eklenen kesir (Taarruz +, Savunma −). */
  ganimet: number;
  /** Ölü ve yaralıyı çarpan kesir (Taarruz +, Savunma ölü −). */
  kayip: number;
  /** Tabip: ölü ve firar azalması, yaralı oranı azalması. */
  oluFirarAzalt: number;
  yaraliAzalt: number;
  /** Keşif: arazi seçme ihtimaline eklenen kesir, tahmin aralığı (±), baskın pusu cezasının azalan kesri. */
  arazi: number;
  tahminAralik: number;
  pusuAzalt: number;
  kesifVar: boolean;
  /** Devşirme: yılda gelen er (tam sayı). */
  devsirme: number;
}

export function subayDegeri(uye: Pick<EkipUyesi, "gercekKalite" | "sadakat" | "rol_turu">): SubayEtkileri {
  const e = bos();
  if (!uye.rol_turu) return e;
  const y = uye.gercekKalite;
  const k = uye.sadakat >= SADIK_ESIGI ? SADIK_BONUS : 1;
  const D = SUBAY_DEGERLERI;
  switch (uye.rol_turu) {
    case "taarruz":
      e.saldiri = egri(y, [...D.taarruz.saldiri] as [number, number, number]) * k;
      e.ganimet = egri(y, [...D.taarruz.ganimet] as [number, number, number]);
      e.kayip = egri(y, [...D.taarruz.kayipArtis] as [number, number, number]);
      break;
    case "savunma":
      e.savunma = egri(y, [...D.savunma.savunma] as [number, number, number]) * k;
      e.kayip = -egri(y, [...D.savunma.olu] as [number, number, number]) * k;
      e.ganimet = -egri(y, [...D.savunma.ganimetEksi] as [number, number, number]);
      break;
    case "kesif":
      e.arazi = egri(y, [...D.kesif.arazi] as [number, number, number]) * k;
      e.tahminAralik = egri(y, [...D.kesif.tahmin] as [number, number, number]);
      e.pusuAzalt = Math.min(1, egri(y, [...D.kesif.pusu] as [number, number, number]) * k);
      e.kesifVar = true;
      break;
    case "musteri":
      e.devsirme = Math.round(egri(y, [...D.devsirme.er] as [number, number, number]) * k);
      break;
    case "guvenlik":
      e.oluFirarAzalt = egri(y, [...D.tabip.oluFirar] as [number, number, number]) * k;
      e.yaraliAzalt = egri(y, [...D.tabip.yarali] as [number, number, number]) * k;
      break;
    default:
      break;
  }
  return e;
}

function bos(): SubayEtkileri {
  return { saldiri: 0, savunma: 0, ganimet: 0, kayip: 0, oluFirarAzalt: 0, yaraliAzalt: 0, arazi: 0, tahminAralik: 0, pusuAzalt: 0, kesifVar: false, devsirme: 0 };
}

/** Tüm subayların toplam etkisi (tavanlı; tahmin aralığı en iyi Keşif subayınınki). */
export function subayToplami(state: CharacterState): SubayEtkileri {
  const t = bos();
  let enIyiTahmin = TAHMIN_ARALIGI_TABAN;
  for (const u of state.ekip) {
    const e = subayDegeri(u);
    t.saldiri += e.saldiri;
    t.savunma += e.savunma;
    t.ganimet += e.ganimet;
    t.kayip += e.kayip;
    t.oluFirarAzalt += e.oluFirarAzalt;
    t.yaraliAzalt += e.yaraliAzalt;
    t.arazi += e.arazi;
    t.pusuAzalt += e.pusuAzalt;
    t.devsirme += e.devsirme;
    if (e.kesifVar) {
      t.kesifVar = true;
      enIyiTahmin = Math.min(enIyiTahmin, e.tahminAralik);
    }
  }
  t.saldiri = Math.min(SUBAY_TAVANLARI.saldiri, t.saldiri);
  t.savunma = Math.min(SUBAY_TAVANLARI.savunma, t.savunma);
  t.arazi = Math.min(SUBAY_TAVANLARI.arazi, t.arazi);
  t.oluFirarAzalt = Math.min(SUBAY_TAVANLARI.oluFirar, t.oluFirarAzalt);
  t.yaraliAzalt = Math.min(SUBAY_TAVANLARI.yarali, t.yaraliAzalt);
  t.pusuAzalt = Math.min(1, t.pusuAzalt);
  t.devsirme = Math.min(SUBAY_TAVANLARI.devsirme, t.devsirme);
  t.tahminAralik = enIyiTahmin;
  return t;
}

/** Ekranda gösterilen kısa artı/eksi satırları (iyi: yeşil, kötü: kırmızı). */
export interface SubayEtkiSatiri {
  tr: string;
  en: string;
  iyi: boolean;
}
const yz = (x: number) => Math.round(x * 100);
export function subayEtkiSatirlari(rol: IsletmeRolTuru | null | undefined, yetenek: number, sadakat: number): SubayEtkiSatiri[] {
  if (!rol) return [];
  const e = subayDegeri({ gercekKalite: yetenek, sadakat, rol_turu: rol });
  const s: SubayEtkiSatiri[] = [];
  const ekle = (tr: string, en: string, iyi: boolean) => s.push({ tr, en, iyi });
  switch (rol) {
    case "taarruz":
      ekle(`Saldırı gücü +%${yz(e.saldiri)}`, `Attack +${yz(e.saldiri)}%`, true);
      ekle(`Ganimet +%${yz(e.ganimet)}`, `Loot +${yz(e.ganimet)}%`, true);
      ekle(`Kayıp +%${yz(e.kayip)}`, `Losses +${yz(e.kayip)}%`, false);
      break;
    case "savunma":
      ekle(`Savunma gücü +%${yz(e.savunma)}`, `Defence +${yz(e.savunma)}%`, true);
      ekle(`Ölü −%${yz(-e.kayip)}`, `Deaths −${yz(-e.kayip)}%`, true);
      ekle(`Ganimet −%${yz(-e.ganimet)}`, `Loot −${yz(-e.ganimet)}%`, false);
      break;
    case "kesif":
      ekle(`Arazi seçme şansı +%${yz(e.arazi)}`, `Terrain choice chance +${yz(e.arazi)}%`, true);
      ekle(`Düşman tahmini ±%${(e.tahminAralik * 100).toFixed(1).replace(".", ",")}`, `Enemy estimate ±${(e.tahminAralik * 100).toFixed(1)}%`, true);
      ekle(`Baskın cezası −%${yz(e.pusuAzalt)}`, `Ambush penalty −${yz(e.pusuAzalt)}%`, true);
      ekle("Savaşı 1 yıl önce haber verir", "Warns of war a year ahead", true);
      break;
    case "musteri":
      ekle(`Yılda +${e.devsirme} er`, `+${e.devsirme} men a year`, true);
      break;
    case "guvenlik":
      ekle(`Ölü ve firar −%${yz(e.oluFirarAzalt)}`, `Deaths and desertion −${yz(e.oluFirarAzalt)}%`, true);
      ekle(`Yaralı −%${yz(e.yaraliAzalt)}`, `Wounded −${yz(e.yaraliAzalt)}%`, true);
      break;
    default:
      break;
  }
  return s;
}
