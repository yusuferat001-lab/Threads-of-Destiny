import { describe, it, expect } from "vitest";
import {
  istemciGecmisiOku,
  istemciGecmisiGuncelle,
  ISTEMCI_GECMIS_MAKS,
} from "../src/db/istemciGecmisRepository";

describe("istemciGecmisRepository", () => {
  it("kayıt yokken boş dizi döner", async () => {
    expect(await istemciGecmisiOku("hic-olmayan-istemci")).toEqual([]);
  });

  it("bir hayatın gördüğü olayları yazar ve geri okur", async () => {
    const id = "test-istemci-1";
    await istemciGecmisiGuncelle(id, ["a", "b", "c"]);
    expect(await istemciGecmisiOku(id)).toEqual(["a", "b", "c"]);
  });

  it("sonraki hayatlardan gelen olayları birleştirir ve tekilleştirir (son görülme sonda kalır)", async () => {
    const id = "test-istemci-2";
    await istemciGecmisiGuncelle(id, ["a", "b"]);
    await istemciGecmisiGuncelle(id, ["c", "a"]); // "a" tekrar görüldü — en sona taşınmalı
    const gecmis = await istemciGecmisiOku(id);
    expect(gecmis).toEqual(["b", "c", "a"]);
  });

  it("boş liste yazımı mevcut geçmişi bozmaz", async () => {
    const id = "test-istemci-3";
    await istemciGecmisiGuncelle(id, ["x", "y"]);
    await istemciGecmisiGuncelle(id, []);
    expect(await istemciGecmisiOku(id)).toEqual(["x", "y"]);
  });

  it("istemciId olmadan sessizce hiçbir şey yapmaz", async () => {
    await expect(istemciGecmisiGuncelle(null, ["a"])).resolves.toBeUndefined();
    await expect(istemciGecmisiGuncelle(undefined, ["a"])).resolves.toBeUndefined();
    await expect(istemciGecmisiGuncelle("", ["a"])).resolves.toBeUndefined();
  });

  it(`ISTEMCI_GECMIS_MAKS (${ISTEMCI_GECMIS_MAKS}) üzerini kırpar, en yenileri tutar`, async () => {
    const id = "test-istemci-4";
    const fazlaOlaylar = Array.from({ length: ISTEMCI_GECMIS_MAKS + 50 }, (_, i) => `olay_${i}`);
    await istemciGecmisiGuncelle(id, fazlaOlaylar);
    const gecmis = await istemciGecmisiOku(id);
    expect(gecmis.length).toBe(ISTEMCI_GECMIS_MAKS);
    // En eski 50 tanesi düşmüş olmalı, en yeniler (sondakiler) kalmalı.
    expect(gecmis).not.toContain("olay_0");
    expect(gecmis).toContain(`olay_${ISTEMCI_GECMIS_MAKS + 49}`);
  });
});
