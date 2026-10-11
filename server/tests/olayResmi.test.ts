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
    // Evlilik içi çatışma olayı düğün resmini almaz.
    expect(anahtar({ id: "evl_mt_ev_ici_kavga" })).toBeUndefined();
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
