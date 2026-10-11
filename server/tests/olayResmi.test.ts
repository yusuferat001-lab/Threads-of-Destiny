import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { OLAY_BANKASI } from "../src/data/olaylar";
import { olayResimAnahtari } from "../src/game/olayResmi";

const RESIM_DIZINI = join(__dirname, "..", "..", "client", "public", "assets", "olay");

describe("olay illüstrasyonu havuz anahtarı", () => {
  it("hapis havuzunun tüm olayları 'hapis' anahtarını alır", () => {
    const hapis = OLAY_BANKASI.filter((o) => o.hapisOlayi);
    expect(hapis.length).toBeGreaterThan(20);
    for (const o of hapis) expect(olayResimAnahtari(o), o.id).toBe("hapis");
  });

  it("yolculuk etapları kendi resmini alır", () => {
    const anahtar = (id: string) => olayResimAnahtari({ id, yolculukOlayi: true });
    expect(anahtar("hac_sunni_karar")).toBe("yolculuk-hac");
    expect(anahtar("hac_katolik_yolda")).toBe("yolculuk-hac");
    expect(anahtar("hac_sunni_kara_2b")).toBe("yolculuk-kara");
    expect(anahtar("hac_ortodoks_deniz_3")).toBe("yolculuk-deniz");
    expect(anahtar("oc_hacli_kara_1")).toBe("yolculuk-sefer");
    expect(anahtar("oc_hacli_deniz_2b")).toBe("yolculuk-deniz");
    expect(anahtar("oc_hacli_esaret_2")).toBe("hapis");
    expect(anahtar("yolculuk_savunma_kara_2")).toBe("yolculuk-sefer");
    expect(anahtar("yolculuk_savunma_esaret_3b")).toBe("hapis");
    expect(anahtar("yolculuk_kesif_kara_3b")).toBe("yolculuk-kara");
    expect(anahtar("yolculuk_kesif_deniz_1")).toBe("yolculuk-deniz");
  });

  it("veba, kaçak, baskın, evlilik ve gizemli havuzları kendi resmini alır", () => {
    const anahtar = (o: Parameters<typeof olayResimAnahtari>[0]) => olayResimAnahtari(o);
    expect(anahtar({ id: "veba_hasta_hekim", vebaHastasiOlayi: true })).toBe("veba");
    expect(anahtar({ id: "veba_cenaze" })).toBe("veba");
    expect(anahtar({ id: "kuresel_veba_baslangici" })).toBe("veba");
    expect(anahtar({ id: "kacak_kis", kacakOlayi: true })).toBe("kacak");
    expect(anahtar({ id: "aranma_baskin_ortacag" })).toBe("baskin");
    expect(anahtar({ id: "iliski_evlilik_teklifi" })).toBe("evlilik");
    expect(anahtar({ id: "cocuk_dugun_masrafi" })).toBe("evlilik");
    expect(anahtar({ id: "buyu_kristal_kure", gizemli: true })).toBe("gizem");
    // Özel havuz genel olanı yener: gizemli ama hapis olayı → hapis.
    expect(anahtar({ id: "x", hapisOlayi: true, gizemli: true })).toBe("hapis");
    // Evlilik içi çatışma olayı düğün resmini değil aile resmini alır.
    expect(anahtar({ id: "evl_mt_ev_ici_kavga" })).toBe("aile");
  });

  it("sağlık kritik eşik havuzunun tüm olayları 'saglik-kriz' anahtarını alır", () => {
    const esik = OLAY_BANKASI.filter((o) => o.saglikEsikOlayi);
    expect(esik.length).toBe(30);
    for (const o of esik) expect(olayResimAnahtari(o), o.id).toBe("saglik-kriz");
  });

  it("hizip olayları 'hizip' anahtarını alır (hizbe özel, saflaşma ve tepki olayları dahil)", () => {
    const hizip = OLAY_BANKASI.filter((o) => o.gerekliHizip || o.id.startsWith("hizip_"));
    expect(hizip.length).toBeGreaterThan(60);
    for (const o of hizip) expect(olayResimAnahtari(o), o.id).toBe("hizip");
    expect(olayResimAnahtari({ id: "hizip_asker_saflasma" })).toBe("hizip");
    expect(olayResimAnahtari({ id: "x", gerekliHizip: true })).toBe("hizip");
  });

  it("aile olayları 'aile' anahtarını alır; aile mesleği kökeni olayları ve evlilik/düğün olayları almaz", () => {
    const anahtar = (id: string) => olayResimAnahtari({ id });
    expect(anahtar("evl_ms_sogukluk")).toBe("aile");
    expect(anahtar("evl_ask_cocuk_yoksullugu")).toBe("aile");
    expect(anahtar("evl_krizi")).toBe("aile");
    expect(anahtar("cocuk_okul_secimi")).toBe("aile");
    expect(anahtar("cocuk_hastalik_baslangic")).toBe("aile");
    expect(anahtar("aile_ikilem_miras_kavgasi")).toBe("aile");
    expect(anahtar("aile2_evlatlik_verme")).toBe("aile");
    expect(anahtar("aile_tatil_karari")).toBe("aile");
    expect(anahtar("iliski_ev_ici_kavga")).toBe("aile");
    expect(anahtar("iliski_cocuk_mujdesi")).toBe("aile");
    // Aile mesleği kökeni olayları kategori resmine düşer.
    expect(anahtar("aile_koken_cellat_damgasi")).toBeUndefined();
    expect(anahtar("aile_isci_grev")).toBeUndefined();
    expect(anahtar("aile_tuccar_musteri")).toBeUndefined();
    // Dost/rakip ilişkileri aile değil.
    expect(anahtar("iliski_dost_zor_durumda")).toBeUndefined();
    // Evlilik/düğün aileden önce gelir; hizip/veba/hapis de.
    expect(anahtar("cocuk_evlilik")).toBe("evlilik");
    expect(anahtar("cocuk_dugun_masrafi")).toBe("evlilik");
    expect(anahtar("hizip_eski_muhafizlar_aile_miras_silah")).toBe("hizip");
    expect(anahtar("veba_hasta_aile_bakimi")).toBe("veba");
  });

  it("bölgeye özel Orta Çağ olayları kendi bölge resmini alır (resmi olmayan bölgeler almaz)", () => {
    const bolge = (onek: string) => OLAY_BANKASI.filter((o) => o.id.startsWith(onek));
    const fransa = bolge("bolge_fransa_oc_");
    const roma = bolge("bolge_kutsalroma_");
    expect(fransa.length).toBe(10);
    expect(roma.length).toBe(10);
    for (const o of fransa) expect(olayResimAnahtari(o), o.id).toBe("bolge-fransa");
    for (const o of roma) expect(olayResimAnahtari(o), o.id).toBe("bolge-kutsal-roma");
    // Resmi henüz olmayan bölgeler ve Sanayi Devrimi bölgeleri kategori resmine düşer.
    for (const o of [...bolge("bolge_bizans_"), ...bolge("bolge_selcuklu_"), ...bolge("bolge_fransa_sd_"), ...bolge("bolge_ingiltere_")]) {
      expect(olayResimAnahtari(o), o.id).toBeUndefined();
    }
  });

  it("havuz dışı olaylar ve eşlenmeyen yolculuklar anahtar almaz (kategori resmine düşer)", () => {
    expect(olayResimAnahtari({ id: "genel_pazar_gunu" })).toBeUndefined();
    expect(olayResimAnahtari({ id: "yolculuk_ozlemi", yolculukOlayi: true })).toBeUndefined();
    expect(olayResimAnahtari({ id: "yolculuk_kesif_teklif", yolculukOlayi: true })).toBeUndefined();
    expect(olayResimAnahtari({ id: "sd_somurge_donus", yolculukOlayi: true })).toBeUndefined();
  });

  it("bankadan dönen her anahtarın Orta Çağ resim dosyası repoda var", () => {
    const anahtarlar = new Set<string>();
    for (const o of OLAY_BANKASI) {
      const a = olayResimAnahtari(o);
      if (a) anahtarlar.add(a);
    }
    expect(anahtarlar.size).toBeGreaterThan(0);
    for (const a of anahtarlar) {
      expect(existsSync(join(RESIM_DIZINI, `${a}-orta-cag.webp`)), a).toBe(true);
    }
  });
});
