import type { YatirimEtkisi, DilliMetin, YatirimTanimi } from "../data/meslekProfilleri";
import { yatirimKademeMasrafi, yatirimToplamFiyati, YATIRIM_MASRAF_ORANI } from "./yatirimMasrafi";
import {
  CURUME_ORANLARI,
  DEPO_BAKIM,
  DEPO_KAPASITE,
  GUVENLIK_YATIRIM_KORUMA,
  KERVAN_INDIRIM_KADEME,
  TANITIM_PAY_KADEME,
  TEZGAH_URETIM_KADEME,
} from "./isletme";
import { ASEVI_KADEME_ETKISI, BINA_BAKIM, BINA_KAPASITE, OKUL_MEZUN_SANSI } from "../data/cemaat";

/** 12.5 → "12,5" (tr) / "12.5" (en); tam sayılar ondalıksız. */
function sayi(n: number, dil: "tr" | "en"): string {
  const r = Math.round(n * 10) / 10;
  const s = Number.isInteger(r) ? String(r) : r.toFixed(1);
  return dil === "tr" ? s.replace(".", ",") : s;
}
const yuzde = (n: number, dil: "tr" | "en") => (dil === "tr" ? `%${sayi(n, dil)}` : `${sayi(n, dil)}%`);
const art = (n: number, dil: "tr" | "en") => `+${yuzde(n, dil)}`;
const eksi = (n: number, dil: "tr" | "en") => `−${yuzde(n, dil)}`;
const dili = (f: (dil: "tr" | "en") => string): DilliMetin => ({ tr: f("tr"), en: f("en") });

/**
 * Bir yatırımın verilen kademedeki TOPLAM etkisi (kademe 0 = hiç yatırım yok).
 * Oyuncuya "şimdi → bir sonraki kademe" karşılaştırması göstermek için; sayılar motor sabitlerinden okunur.
 */
export function yatirimEtkiMetni(etki: YatirimEtkisi, kademe: number, enflasyon: number): DilliMetin {
  const k = Math.max(0, Math.floor(kademe));
  const r2 = (n: number) => Math.round(n * 100) / 100;
  switch (etki) {
    case "depo": {
      const i = Math.min(k, DEPO_KAPASITE.length - 1);
      return dili((d) =>
        d === "tr"
          ? `${DEPO_KAPASITE[i]} birim stok · çürüme ${yuzde(CURUME_ORANLARI[i] * 100, d)} · bakım ${sayi(r2(DEPO_BAKIM[i] * enflasyon), d)}/yıl`
          : `${DEPO_KAPASITE[i]} units of stock · ${yuzde(CURUME_ORANLARI[i] * 100, d)} spoilage · upkeep ${sayi(r2(DEPO_BAKIM[i] * enflasyon), d)}/yr`
      );
    }
    case "bina": {
      const i = Math.min(k, BINA_KAPASITE.length - 1);
      return dili((d) =>
        d === "tr"
          ? `${BINA_KAPASITE[i]} kişi kapasite · bakım ${sayi(r2(BINA_BAKIM[i] * enflasyon), d)}/yıl`
          : `Holds ${BINA_KAPASITE[i]} worshippers · upkeep ${sayi(r2(BINA_BAKIM[i] * enflasyon), d)}/yr`
      );
    }
    case "alis":
      return dili((d) => (k === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Alış maliyeti" : "Purchase cost"} ${eksi((1 - Math.pow(1 - KERVAN_INDIRIM_KADEME, k)) * 100, d)}`));
    case "uretim":
      return dili((d) => (k === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Üretim tavanı" : "Production cap"} ${art(k * TEZGAH_URETIM_KADEME * 100, d)}`));
    case "pazar":
      return dili((d) => (k === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Müşteri artışı" : "Customer growth"} ${art(k * TANITIM_PAY_KADEME * 100, d)}${d === "tr" ? "/yıl" : "/yr"}`));
    case "koruma": {
      const i = Math.min(k, GUVENLIK_YATIRIM_KORUMA.length - 1);
      return dili((d) => (i === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Koruma" : "Protection"} +${d === "tr" ? String(GUVENLIK_YATIRIM_KORUMA[i]).replace(".", ",") : String(GUVENLIK_YATIRIM_KORUMA[i])}`));
    }
    case "okul": {
      const i = Math.min(k, OKUL_MEZUN_SANSI.length - 1);
      return dili((d) => (i === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Yıllık mezun şansı" : "Yearly graduate chance"} ${yuzde(OKUL_MEZUN_SANSI[i] * 100, d)}`));
    }
    case "yardim":
      return dili((d) => (k === 0 ? (d === "tr" ? "Etki yok" : "No effect") : `${d === "tr" ? "Yardım getirisi" : "Aid payoff"} ${art(k * ASEVI_KADEME_ETKISI * 100, d)}`));
  }
}

/**
 * Yatırım kartı için yıllık masraf: şimdiki toplam ve bir sonraki kademenin ekleyeceği tutar.
 * Depo ve ibadethane kademesi kendi bakımını öder; diğer yatırımlar kademe fiyatının %2'sini.
 */
export function yatirimMasrafGorunumu(y: YatirimTanimi, kademe: number, enflasyon: number): { yillikMasraf: number; sonrakiMasraf: number | null } {
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const sonVar = kademe < y.fiyatlar.length;
  if (y.etki === "depo" || y.etki === "bina") {
    const tablo = y.etki === "depo" ? DEPO_BAKIM : BINA_BAKIM;
    const simdi = tablo[Math.min(kademe, tablo.length - 1)] * enflasyon;
    const sonraki = tablo[Math.min(kademe + 1, tablo.length - 1)] * enflasyon;
    return { yillikMasraf: r2(simdi), sonrakiMasraf: sonVar ? r2(sonraki - simdi) : null };
  }
  return {
    yillikMasraf: r2(yatirimToplamFiyati(y.fiyatlar, kademe) * YATIRIM_MASRAF_ORANI * enflasyon),
    sonrakiMasraf: sonVar ? yatirimKademeMasrafi(y.fiyatlar, kademe, enflasyon) : null,
  };
}
