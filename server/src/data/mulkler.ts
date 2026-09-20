import { MulkTuru } from "../types";

/** Piyasa mülkleri: taban maliyet enflasyona göre ölçeklenir; getirisi state.ulke'ye göre her tur yeniden hesaplanır (bkz. stateManager.ts mulkGelirleriUygula). */
export interface MulkTanimi {
  tur: MulkTuru;
  ad: string;
  simge: string;
  taban_maliyet: number;
  aciklama: string;
  avantajli_durum: string;
  dezavantajli_durum: string;
}

export const MULK_TANIMLARI: MulkTanimi[] = [
  {
    tur: "kucuk_tarla",
    ad: "Küçük Tarla",
    simge: "🥕",
    taban_maliyet: 50,
    aciklama: "En ucuz ve en istikrarlı yatırım: getirisi küçük ama kıtlıkta bile neredeyse hiç zarar ettirmez. Garanti arayan için.",
    avantajli_durum: "Bolluk (iyi ekonomi)",
    dezavantajli_durum: "Kıtlık (küçük kayıp)",
  },
  {
    tur: "ciftlik",
    ad: "Buğday Tarlası",
    simge: "🌾",
    taban_maliyet: 80,
    aciklama: "Ekonomi iyiyken bereketli bir hasat getirir; kıtlıkta zarar ettirir.",
    avantajli_durum: "Bolluk (iyi ekonomi)",
    dezavantajli_durum: "Kıtlık",
  },
  {
    tur: "demirci",
    ad: "Demirci Atölyesi",
    simge: "⚒️",
    taban_maliyet: 130,
    aciklama: "Savaş ve isyan dönemlerinde ordu siparişleriyle kazancı katlanır; uzun barışta sürünür.",
    avantajli_durum: "Savaş veya isyan",
    dezavantajli_durum: "Uzun barış",
  },
  {
    tur: "han",
    ad: "Şehir Hanı",
    simge: "🍺",
    taban_maliyet: 170,
    aciklama: "Nüfus artışı ve barış döneminde dolup taşar; veba ya da savaşta iflasın eşiğine gelir.",
    avantajli_durum: "Nüfus artışı ve barış",
    dezavantajli_durum: "Veba veya savaş",
  },
  {
    tur: "kervan",
    ad: "Ticaret Kervanı",
    simge: "🐫",
    taban_maliyet: 220,
    aciklama: "Barış ve bolluk döneminin en kazançlı yatırımı; savaş çıkarsa tamamen kaybolma riski taşır.",
    avantajli_durum: "Barış ve bolluk",
    dezavantajli_durum: "Savaş (yağma/batma riski)",
  },
  {
    tur: "karaborsa",
    ad: "Karaborsa Deposu",
    simge: "🕶️",
    taban_maliyet: 320,
    aciklama: "Kıtlık, veba ve savaşta dehşet para basar; ama her yıl aranma seviyeni artırır ve vicdanını aşındırır.",
    avantajli_durum: "Kıtlık, veba veya savaş",
    dezavantajli_durum: "Barış ve bolluk (getirisi zayıflar)",
  },
];

export function mulkTanimiGetir(tur: MulkTuru): MulkTanimi {
  const tanim = MULK_TANIMLARI.find((m) => m.tur === tur);
  if (!tanim) throw new Error(`Bilinmeyen mülk türü: ${tur}`);
  return tanim;
}
