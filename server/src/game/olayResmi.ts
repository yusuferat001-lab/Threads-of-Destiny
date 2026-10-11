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
 * Evde/ailenin içinde geçen olaylar: aile ikilemleri, çocuk ve evlilik-içi olayları. Aile mesleği
 * KÖKENİ olayları (`aile_koken_*`, `aile_tuccar_musteri`, `aile_isci_grev` vb.) bilerek dışarıda —
 * onlar evden çok ailenin mesleği/geçmişiyle ilgili, kategori resmini alırlar.
 */
const AILE_ONEKLERI = ["aile_ikilem_", "aile2_", "cocuk_", "evl_"];
const AILE_OLAYLARI = new Set([
  "aile_tatil_karari",
  "iliski_ev_ici_kavga",
  "iliski_es_gizli_talep",
  "iliski_bosanma_esigi",
  "iliski_es_hastalik",
  "iliski_cocuk_mujdesi",
]);

/** Bölgeye özel olaylar: olay id öneki → resim anahtarı (çağ soneki istemcide eklenir). */
const BOLGE_RESIMLERI: ReadonlyArray<readonly [onek: string, anahtar: string]> = [
  ["bolge_fransa_oc_", "bolge-fransa"],
  ["bolge_kutsalroma_", "bolge-kutsal-roma"],
  ["bolge_bizans_", "bolge-bizans"],
  ["bolge_selcuklu_", "bolge-selcuklu"],
];

/** Evcil hayvan olayları: takip/teklif havuzu (`evcil_hayvan_*`, `evcilhayvan_*`) + vahşi kurt yavrusu. */
const EVCIL_HAYVAN_ONEKLERI = ["evcil_hayvan_", "evcilhayvan_"];
const EVCIL_HAYVAN_OLAYLARI = new Set(["vahsi_kurt_yavrusu_bulma"]);

/**
 * Olay illüstrasyonunun "havuz anahtarı" (`client/public/assets/olay/<anahtar>-<orta-cag|sanayi>.webp`).
 *
 * Genel kural kategori×çağ resmidir (savas/ticaret/...); ama hapis ve büyük yolculuk gibi özel
 * havuzların olayları kategori olarak karışıktır (hapis olaylarının çoğu `siyaset`/`sosyal`,
 * yolculuklar `din`/`savas`/`ticaret`), bu yüzden kendi resimleri vardır. Burada anahtar dönerse
 * istemci önce onu dener, dosya yoksa kategori resmine, o da yoksa emojiye düşer.
 *
 * Öncelik: sağlık krizi > hapis > veba > kaçak > baskın > evlilik > hizip > aile > bölge > evcil hayvan >
 * yolculuk > gizemli (özel olan genel olanı yener). Yalnız resmi OLAN havuzlar eşlenir — yeni bir havuz resmi
 * eklenince buraya bir kural eklenir.
 */
export function olayResimAnahtari(
  olay: Pick<
    OlayTanimi,
    | "id"
    | "hapisOlayi"
    | "yolculukOlayi"
    | "kacakOlayi"
    | "vebaHastasiOlayi"
    | "gizemli"
    | "saglikEsikOlayi"
    | "gerekliHizip"
  >
): string | undefined {
  if (olay.saglikEsikOlayi) return "saglik-kriz";
  if (olay.hapisOlayi) return "hapis";
  if (olay.vebaHastasiOlayi || olay.id === "kuresel_veba_baslangici" || olay.id.startsWith("veba_")) return "veba";
  if (olay.kacakOlayi) return "kacak";
  if (BASKIN_OLAYLARI.has(olay.id)) return "baskin";
  if (EVLILIK_OLAYLARI.has(olay.id)) return "evlilik";
  if (olay.gerekliHizip || olay.id.startsWith("hizip_")) return "hizip";
  if (AILE_OLAYLARI.has(olay.id) || AILE_ONEKLERI.some((onek) => olay.id.startsWith(onek))) return "aile";
  const bolge = BOLGE_RESIMLERI.find(([onek]) => olay.id.startsWith(onek));
  if (bolge) return bolge[1];
  if (EVCIL_HAYVAN_OLAYLARI.has(olay.id) || EVCIL_HAYVAN_ONEKLERI.some((onek) => olay.id.startsWith(onek))) {
    return "evcil-hayvan";
  }
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
