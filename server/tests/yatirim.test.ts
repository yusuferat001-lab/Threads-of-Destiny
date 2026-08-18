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
      await yatirimYap(state.id, "kendi_isi");
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

    await yatirimYap(state.id, "kendi_isi");

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

    await yatirimYap(state.id, "kendi_isi");

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

    await expect(yatirimYap(state.id, "kendi_isi")).rejects.toThrow();
    expect(state.para).toBe(oncekiPara);
  });

  it("meslek seçilmeden yatırım denemesi hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    state.para = 1000;
    await expect(yatirimYap(state.id, "kendi_isi")).rejects.toThrow();
  });
});

describe("güvenli ve riskli yatırım", () => {
  it("güvenli yatırım kademeleri ve riskli maliyeti enflasyonla ölçeklenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");

    const baslangicConfig = await yatirimConfigGetir(state.id);
    state.tur_sayisi = 50; // birkaç enflasyon dönemi geçmiş gibi davran
    const sonraConfig = await yatirimConfigGetir(state.id);

    expect(sonraConfig.guvenliKademeleri[0]).toBeGreaterThan(baslangicConfig.guvenliKademeleri[0]);
    expect(sonraConfig.riskliMaliyeti).toBeGreaterThan(baslangicConfig.riskliMaliyeti);
  });

  it("güvenli yatırımda geçersiz/enflasyona uymayan tutar hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    state.para = 1_000_000;
    await expect(yatirimYap(state.id, "guvenli", 999_999)).rejects.toThrow();
  });

  it("güvenli yatırım config'teki gerçek kademe tutarıyla kabul edilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1_000_000;
    const config = await yatirimConfigGetir(state.id);
    const sonuc = await yatirimYap(state.id, "guvenli", config.guvenliKademeleri[0]);
    expect(sonuc.state.durumlar.some((d) => d.id === "yatirim_guvenli_pasif")).toBe(true);
  });
});

describe("finans ekranı tutarlılığı", () => {
  it("netYillik, zenginlik vergisi dahil tüm gider kalemlerini hesaba katar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 5000; // zenginlik vergisi eşiğinin (200) üstünde, vergi kalemi devreye girsin

    const finans = await finansGetir(state.id);
    const gercekToplamGider =
      finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.vergi;

    expect(finans.giderKalemleri.vergi).toBeGreaterThan(0);
    expect(finans.netYillik).toBe(finans.maasYillik - gercekToplamGider);
  });
});
