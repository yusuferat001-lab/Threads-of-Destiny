import type { OlayTanimi } from "../data/olaylar";

/** Aranma kademesinin büyük "Ev/İş Yeri Baskını" olayları. */
const BASKIN_OLAYLARI = new Set(["aranma_baskin_ortacag", "aranma_baskin_sanayi"]);

/** Evlilik teklifi / düğün olayları (evlilik içi çatışma olayları değil — onlar aile havuzunda). */
const EVLILIK_OLAYLARI = new Set([
  "iliski_evlilik_teklifi",
  "iliski_ikinci_teklif",
  "evlilik_uc_yol_karari",
  "cocuk_evlilik",
  "cocuk_dugun_masrafi",
]);

/**
 * Olay illüstrasyonunun "havuz anahtarı" (`client/public/assets/olay/<anahtar>-<orta-cag|sanayi>.webp`).
 *
 * Genel kural kategori×çağ resmidir (savas/ticaret/...); ama hapis ve büyük yolculuk gibi özel
 * havuzların olayları kategori olarak karışıktır (hapis olaylarının çoğu `siyaset`/`sosyal`,
 * yolculuklar `din`/`savas`/`ticaret`), bu yüzden kendi resimleri vardır. Burada anahtar dönerse
 * istemci önce onu dener, dosya yoksa kategori resmine, o da yoksa emojiye düşer.
 *
 * Öncelik: hapis > veba > kaçak > baskın > evlilik > yolculuk > gizemli (özel olan genel olanı yener).
 * Yalnız resmi OLAN havuzlar eşlenir — yeni bir havuz resmi eklenince buraya bir kural eklenir.
 */
export function olayResimAnahtari(
  olay: Pick<OlayTanimi, "id" | "hapisOlayi" | "yolculukOlayi" | "kacakOlayi" | "vebaHastasiOlayi" | "gizemli">
): string | undefined {
  if (olay.hapisOlayi) return "hapis";
  if (olay.vebaHastasiOlayi || olay.id === "kuresel_veba_baslangici" || olay.id.startsWith("veba_")) return "veba";
  if (olay.kacakOlayi) return "kacak";
  if (BASKIN_OLAYLARI.has(olay.id)) return "baskin";
  if (EVLILIK_OLAYLARI.has(olay.id)) return "evlilik";
  if (!olay.yolculukOlayi) return olay.gizemli ? "gizem" : undefined;

  const id = olay.id;
  const deniz = /(^|_)deniz(_|$)/.test(id);
  const kara = /(^|_)kara(_|$)/.test(id);

  // Haçlı Seferi + Savunma Seferi: ordu yürüyüşü; deniz etabı gemi; esaret dalları zindan.
  if (id.startsWith("oc_hacli_") || id.startsWith("yolculuk_savunma_")) {
    if (id.includes("_esaret_")) return "hapis";
    if (deniz) return "yolculuk-deniz";
    return "yolculuk-sefer";
  }
  // Hac: kara/deniz etapları kendi resmi, karar/yolda/varış hac kafilesi.
  if (id.startsWith("hac_")) {
    if (deniz) return "yolculuk-deniz";
    if (kara) return "yolculuk-kara";
    return "yolculuk-hac";
  }
  // Coğrafi Keşif: kara kervanı / deniz seferi.
  if (id.startsWith("yolculuk_kesif_")) {
    if (deniz) return "yolculuk-deniz";
    if (kara) return "yolculuk-kara";
  }
  return undefined;
}
