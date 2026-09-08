import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, kotuIsYap, kotuIsConfigGetir, stateGetir } from "../src/game/gameEngine";

describe("karanlık işler (illegal işler paneli)", () => {
  it("kotuIsConfigGetir 5 aksiyonu şans/kazanç önizlemesiyle döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    const config = await kotuIsConfigGetir(state.id);
    expect(config).toHaveLength(5);
    for (const kart of config) {
      expect(kart.basariSansi).toBeGreaterThanOrEqual(5);
      expect(kart.basariSansi).toBeLessThanOrEqual(95);
      expect(typeof kart.tahminiKazanc).toBe("number");
    }
    expect(config.some((k) => k.rakibeYonelik)).toBe(true);
  });

  it("bir karanlık iş ahlakı düşürür ve suç seviyesini yükseltir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    let s = await stateGetir(state.id);
    const onceAhlak = s.ahlak;
    const onceSuc = s.suc_seviyesi;
    await kotuIsYap(state.id, "adam_dov");
    s = await stateGetir(state.id);
    expect(s.ahlak).toBeLessThan(onceAhlak);
    expect(s.suc_seviyesi).toBeGreaterThan(onceSuc);
  });

  it("geçersiz iş türü hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    await expect(kotuIsYap(state.id, "olmayan_is")).rejects.toThrow();
  });

  it("hapisteyken karanlık iş çevrilemez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    const s = await stateGetir(state.id);
    s.etiketler.push("hapiste");
    await expect(kotuIsYap(state.id, "birini_soy")).rejects.toThrow();
  });

  it("rakip hedefleyen iş, yeterince denenince kariyer puanına katkı verebilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    let s = await stateGetir(state.id);
    const oncePuan = s.kariyer_puani;
    // rakibi_korkut'un başarısız dalında hapis riski YOK — güvenle döngüye sokulabilir.
    for (let i = 0; i < 60; i++) {
      s = await stateGetir(state.id);
      if (s.etiketler.includes("hapiste")) break;
      await kotuIsYap(state.id, "rakibi_korkut");
    }
    s = await stateGetir(state.id);
    expect(s.kariyer_puani).toBeGreaterThan(oncePuan);
  });
});
