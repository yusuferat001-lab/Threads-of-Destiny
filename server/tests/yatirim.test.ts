import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, yatirimYap, yatirimConfigGetir, finansGetir } from "../src/game/gameEngine";
import { maasCarpaniUygula, MAAS_CARPANI_TAVAN } from "../src/game/stateManager";

describe("kendi_isi yatırımı", () => {
  it("maliyet her tekrarda artar ve asla 0 veya 5 ile bitmez", async () => {
    // dag_basi (maasCarpani 0.9) → MAAS_CARPANI_TAVAN'a takılmadan daha çok yatırım sığar.
    const state = await yeniOyun("Orta Çağ", "Fransa", "dag_basi");
    await mesleğiAta(state.id, "Asker"); // miras maaş çarpanı binmesin diye Tüccar dışı
    state.para = 1_000_000;
    state.etiketler = state.etiketler.filter((e) => !e.startsWith("maas_carpani:"));

    // KENDI_ISI_MAAS_PRIMI 1.05^n · MAAS_CARPANI_TAVAN 1.20 (ekonomi sıkılaştırma
    // turunda 1.40'tan düşürüldü) → 1.0 tabandan ~3 yatırım sığar; eskalasyon/
    // yuvarlama testi için 3 tekrar yeter.
    const maliyetler: number[] = [];
    for (let i = 0; i < 3; i++) {
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

  it("yatırım meslek metriğine dokunmaz, yıllık maaşı kalıcı olarak artırır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    state.para = 1_000_000;
    const eskiTechizat = state.ordu_techizat_seviyesi;
    const eskiMevcut = state.ordu_mevcudu;
    const eskiMaas = state.maas_yillik;

    await yatirimYap(state.id);

    expect(state.ordu_techizat_seviyesi).toBe(eskiTechizat);
    expect(state.ordu_mevcudu).toBe(eskiMevcut);
    expect(state.maas_yillik).toBeGreaterThan(eskiMaas);
  });

  it("maaş çarpanı tavana ulaşınca yatırım hata fırlatır ve para düşülmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1_000_000;
    maasCarpaniUygula(state, MAAS_CARPANI_TAVAN + 1, true); // doğrudan tavana sabitle
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
  it("netYillik, tüm gider kalemlerinin toplamını hesaba katar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 5000;

    const finans = await finansGetir(state.id);
    const gercekToplamGider =
      finans.giderKalemleri.yasam +
      finans.giderKalemleri.konut +
      finans.giderKalemleri.ekip +
      finans.giderKalemleri.evcilHayvan +
      finans.giderKalemleri.savasVergisi;

    // Zengin bir karakterde bile artık pasif "zenginlik vergisi" kalemi YOK
    // (yerini 5 yılda bir tetiklenen zorunlu bağış aldı, §27).
    expect(finans.giderKalemleri).not.toHaveProperty("vergi");
    // Para artık 2 ondalık basamağa yuvarlanıyor (paraYuvarla); toBeCloseTo kayan
    // nokta kalıntılarını (ör. 7.9399999999999995) tolere eder.
    expect(finans.netYillik).toBeCloseTo(finans.maasYillik - gercekToplamGider, 2);
  });
});
