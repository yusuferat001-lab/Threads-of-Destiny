import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec, aileYillikUygula } from "../src/game/stateManager";
import {
  yeniOyun,
  mesleğiAta,
  aileDurumGetir,
  aileEtkilesimYap,
  aileTalebiKararlastir,
} from "../src/game/gameEngine";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function evliOturum(): Promise<CharacterState> {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  state.para = 500;
  state.yas = 30;
  state.es_adi = "Adela";
  state.es_meslek = "Tüccar";
  state.es_rutbe = "Pazarcı";
  state.es_puani = 40;
  state.etiketler.push("medeni:evli");
  state.cocuklar.push({ isim: "Milo", dogum_yili: state.yil - 8, yasiyor: true, iliski: 50 });
  state.cocuk_sayisi = 1;
  return state;
}

describe("aileEtkilesimYap", () => {
  it("maliyeti düşer, eş ilişkisini artırır, cooldown yazar; ikinci çağrı reddedilir", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.8 → tam etki
    const state = await evliOturum();
    const oncekiPara = state.para;
    const oncekiPuan = state.es_puani;

    const sonuc = await aileEtkilesimYap(state.id, "es_hediye");
    expect(sonuc.tam).toBe(true);
    expect(sonuc.state.para).toBeLessThan(oncekiPara);
    expect(sonuc.state.es_puani).toBeGreaterThan(oncekiPuan);
    expect(sonuc.state.aile_etkilesim_kilit["es_hediye"]).toBeGreaterThan(sonuc.state.yil);

    await expect(aileEtkilesimYap(state.id, "es_hediye")).rejects.toThrow();
  });

  it("ücretsiz etkileşim (es_zaman) parayı değiştirmez ama ilişkiyi artırır", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const state = await evliOturum();
    const oncekiPara = state.para;
    const oncekiPuan = state.es_puani;
    const sonuc = await aileEtkilesimYap(state.id, "es_zaman");
    expect(sonuc.state.para).toBe(oncekiPara);
    expect(sonuc.state.es_puani).toBeGreaterThan(oncekiPuan);
  });

  it("çocuk etkileşimi hedef çocuğun ilişkisini artırır ve child-index'li cooldown yazar", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const state = await evliOturum();
    const sonuc = await aileEtkilesimYap(state.id, "cocuk_oyna", 0);
    expect(sonuc.state.cocuklar[0].iliski).toBeGreaterThan(50);
    expect(sonuc.state.aile_etkilesim_kilit["cocuk_oyna:0"]).toBeGreaterThan(sonuc.state.yil);
  });

  it("para yetmezse hata verir", async () => {
    const state = await evliOturum();
    state.para = 0;
    await expect(aileEtkilesimYap(state.id, "es_gezi")).rejects.toThrow();
  });
});

describe("aileDurumGetir", () => {
  it("eş + çocuk özetini ve etkileşim kataloğunu döndürür", async () => {
    const state = await evliOturum();
    const durum = await aileDurumGetir(state.id);
    expect(durum.es?.adi).toBe("Adela");
    expect(durum.cocuklar).toHaveLength(1);
    expect(durum.cocuklar[0].yas).toBe(8);
    expect(durum.etkilesimler.length).toBeGreaterThan(0);
    expect(durum.etkilesimler.some((e) => e.id === "es_hediye")).toBe(true);
  });
});

describe("aileTalebiKararlastir", () => {
  it("kabul: parayı düşürür, ilişkiyi artırır, talebi temizler", async () => {
    const state = await evliOturum();
    state.aile_talep = {
      id: "t1",
      kimden: "es",
      kimAdi: "Adela",
      cocukIndex: null,
      tutar: 20,
      kalem: "ipek bir şal",
      sonYil: state.yil + 3,
    };
    const oncekiPuan = state.es_puani;
    const sonuc = await aileTalebiKararlastir(state.id, "kabul");
    expect(sonuc.kabul).toBe(true);
    expect(sonuc.state.para).toBe(480);
    expect(sonuc.state.es_puani).toBeGreaterThan(oncekiPuan);
    expect(sonuc.state.aile_talep).toBeNull();
  });

  it("ret: ilişki ve mutluluk düşer, talep temizlenir", async () => {
    const state = await evliOturum();
    state.mutluluk = 60;
    state.aile_talep = {
      id: "t2",
      kimden: "cocuk",
      kimAdi: "Milo",
      cocukIndex: 0,
      tutar: 15,
      kalem: "yeni bir oyuncak",
      sonYil: state.yil + 3,
    };
    const sonuc = await aileTalebiKararlastir(state.id, "ret");
    expect(sonuc.kabul).toBe(false);
    expect(sonuc.state.cocuklar[0].iliski).toBeLessThan(50);
    expect(sonuc.state.mutluluk).toBeLessThan(60);
    expect(sonuc.state.aile_talep).toBeNull();
  });
});

describe("aileYillikUygula", () => {
  it("ilgilenilmeyen eş/çocuk ilişkisi zamanla düşer", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.es_adi = "Adela";
    state.es_puani = 60;
    state.cocuklar.push({ isim: "Milo", dogum_yili: state.yil - 5, yasiyor: true, iliski: 60 });
    aileYillikUygula(state, 2);
    expect(state.es_puani).toBeLessThan(60);
    expect(state.cocuklar[0].iliski).toBeLessThan(60);
  });

  it("düşük çocuk ilişkisi mutluluğu aşındırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.mutluluk = 70;
    state.cocuklar.push({ isim: "Milo", dogum_yili: state.yil - 5, yasiyor: true, iliski: 5 });
    aileYillikUygula(state, 2);
    expect(state.mutluluk).toBeLessThan(70);
  });

  it("süresi dolan talep ilişki + mutuluk cezası verir ve temizlenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.es_adi = "Adela";
    state.es_puani = 50;
    state.mutluluk = 60;
    state.yil = 1200;
    state.aile_talep_sonraki_yil = 1260; // aynı çağrıda yeni talep üretilmesin, sadece süre dolmasını ölç
    state.aile_talep = {
      id: "t3",
      kimden: "es",
      kimAdi: "Adela",
      cocukIndex: null,
      tutar: 20,
      kalem: "güzel bir at",
      sonYil: 1198,
    };
    const not = aileYillikUygula(state, 1);
    expect(state.aile_talep).toBeNull();
    expect(state.es_puani).toBeLessThan(50);
    expect(state.mutluluk).toBeLessThan(60);
    expect(not).toBeTruthy();
  });

  it("uygun koşulda yeni talep üretebilir", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01); // < 0.15 → talep üret
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.es_adi = "Adela";
    state.es_puani = 50;
    state.yil = 1300;
    state.aile_talep_sonraki_yil = 1290;
    aileYillikUygula(state, 1);
    expect(state.aile_talep).not.toBeNull();
    expect(state.aile_talep?.tutar).toBeGreaterThan(0);
  });
});
