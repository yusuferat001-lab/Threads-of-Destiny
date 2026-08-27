import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, yatirimYap, yatirimConfigGetir, finansGetir } from "../src/game/gameEngine";

describe("kendi_isi yatırımı", () => {
  it("maliyet her tekrarda artar ve asla 0 veya 5 ile bitmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1_000_000;

    const maliyetler: number[] = [];
    for (let i = 0; i < 15; i++) {
      const config = await yatirimConfigGetir(state.id);
      maliyetler.push(config.kendiIsiMaliyeti);
      await yatirimYap(state.id);
    }

    for (let i = 1; i < maliyetler.length; i++) {
      expect(maliyetler[i]).toBeGreaterThan(maliyetler[i - 1]);
    }
    for (const m of maliyetler) {
      expect(m % 5).not.toBe(0);
    }
  });

  it("yatirimConfigGetir güncel yatırım sayısını ve büyüyen maliyeti yansıtır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1_000_000;

    const oncekiConfig = await yatirimConfigGetir(state.id);
    expect(oncekiConfig.kendiIsiYatirimSayisi).toBe(0);

    await yatirimYap(state.id);

    const sonrakiConfig = await yatirimConfigGetir(state.id);
    expect(sonrakiConfig.kendiIsiYatirimSayisi).toBe(1);
    expect(sonrakiConfig.kendiIsiMaliyeti).toBeGreaterThan(oncekiConfig.kendiIsiMaliyeti);
  });

  it("Asker teçhizatı tavana ulaşınca yatırım ordu mevcuduna yönlenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    state.para = 1_000_000;
    state.ordu_techizat_seviyesi = 100;
    const eskiMevcut = state.ordu_mevcudu;

    await yatirimYap(state.id);

    expect(state.ordu_techizat_seviyesi).toBe(100);
    expect(state.ordu_mevcudu).toBeGreaterThan(eskiMevcut);
  });

  it("Asker hem teçhizat hem ordu mevcudu tavandayken yatırım hata fırlatır ve para düşülmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    state.para = 1_000_000;
    state.ordu_techizat_seviyesi = 100;
    state.ordu_mevcudu = 300;
    const oncekiPara = state.para;

    await expect(yatirimYap(state.id)).rejects.toThrow();
    expect(state.para).toBe(oncekiPara);
  });

  it("meslek seçilmeden yatırım denemesi hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    state.para = 1000;
    await expect(yatirimYap(state.id)).rejects.toThrow();
  });
});

describe("finans ekranı tutarlılığı", () => {
  it("netYillik, zenginlik vergisi dahil tüm gider kalemlerini hesaba katar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 5000; // zenginlik vergisi eşiğinin (500, nakit+mülk toplamına göre) üstünde, vergi kalemi devreye girsin

    const finans = await finansGetir(state.id);
    const gercekToplamGider =
      finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.vergi +
      finans.giderKalemleri.savasVergisi;

    expect(finans.giderKalemleri.vergi).toBeGreaterThan(0);
    // Para artık 2 ondalık basamağa yuvarlanıyor (paraYuvarla); toBeCloseTo kayan
    // nokta kalıntılarını (ör. 7.9399999999999995) tolere eder.
    expect(finans.netYillik).toBeCloseTo(finans.maasYillik - gercekToplamGider, 2);
  });
});
