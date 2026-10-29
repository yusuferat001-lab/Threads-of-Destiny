import { describe, it, expect, vi, afterEach } from "vitest";
import { yonetimYillikUygula, enflasyonCarpani } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, yonetimTalebiKararlastir, senaryoUret, secimUygula, yilGec } from "../src/game/gameEngine";
import {
  EKSTRA_VERGI_ARALIK_YIL,
  EKSTRA_VERGI_KAR_ESIGI,
  EKSTRA_VERGI_SONSUZ_YIL,
  ekstraVergiCarpani,
  ekstraVergiSonrakiYil,
} from "../src/data/ekstraVergi";
import type { CharacterState, YonetimTalep } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function oturum(meslek = "Tüccar"): Promise<CharacterState> {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);
  state.para = 1000;
  state.yas = 40;
  return state;
}

/** Son yılın NET kârını (dükkân neti) döküme yazar (yalnız bu alan okunur; brüt kâr değil). */
function karYaz(state: CharacterState, net: number) {
  (state.isletme as unknown as { son_dokum: { net: number } }).son_dokum = { net };
}

describe("ekstra vergi sabitleri", () => {
  it("takvim 8-10 yıl; çarpan ilişkiye göre alt/üst uca iner", () => {
    for (let i = 0; i < 50; i++) {
      const y = ekstraVergiSonrakiYil(1200);
      expect(y).toBeGreaterThanOrEqual(1200 + EKSTRA_VERGI_ARALIK_YIL[0]);
      expect(y).toBeLessThanOrEqual(1200 + EKSTRA_VERGI_ARALIK_YIL[1]);
    }
    expect(ekstraVergiCarpani(80)).toBe(2);
    expect(ekstraVergiCarpani(10)).toBe(3);
    const orta = ekstraVergiCarpani(50, () => 0.5);
    expect(orta).toBeCloseTo(2.5, 5);
  });
});

describe("yonetimYillikUygula — ekstra vergi talebi", () => {
  it("ilk çağrı yalnız takvimi kurar (8-9 yıl sonra), talep üretmez", async () => {
    const state = await oturum();
    expect(state.ekstra_vergi_sonraki_yil).toBeNull();
    karYaz(state, 1000);
    yonetimYillikUygula(state, 1);
    expect(state.ekstra_vergi_sonraki_yil).toBeGreaterThanOrEqual(state.yil + EKSTRA_VERGI_ARALIK_YIL[0]);
    expect(state.ekstra_vergi_sonraki_yil).toBeLessThanOrEqual(state.yil + EKSTRA_VERGI_ARALIK_YIL[1]);
    expect(state.yonetim_talep?.tur).not.toBe("vergi");
  });

  it("vadesi gelince, kâr eşiğin üstündeyse net kârın 2-3 katı vergi talebi üretir ve takvimi yeniler", async () => {
    const state = await oturum();
    state.yonetim_iliski = 50;
    karYaz(state, 200);
    state.ekstra_vergi_sonraki_yil = state.yil;
    yonetimYillikUygula(state, 1);
    const t = state.yonetim_talep as YonetimTalep;
    expect(t.tur).toBe("vergi");
    expect(t.kimden).toBe("yonetici");
    expect(t.tutar).toBeGreaterThanOrEqual(400);
    expect(t.tutar).toBeLessThanOrEqual(600);
    expect(t.sonYil).toBe(EKSTRA_VERGI_SONSUZ_YIL);
    expect(state.ekstra_vergi_sonraki_yil).toBeGreaterThanOrEqual(state.yil + EKSTRA_VERGI_ARALIK_YIL[0]);
  });

  it("kâr eşiğin (enflasyonlu) altındaysa talep çıkmaz ve vade korunur", async () => {
    const state = await oturum();
    const esik = EKSTRA_VERGI_KAR_ESIGI * enflasyonCarpani(state);
    karYaz(state, esik - 1);
    state.ekstra_vergi_sonraki_yil = state.yil;
    yonetimYillikUygula(state, 1);
    expect(state.yonetim_talep?.tur).not.toBe("vergi");
    expect(state.ekstra_vergi_sonraki_yil).toBe(state.yil);
  });

  it("Asker (işletmesiz meslek) hiç vergi talebi görmez", async () => {
    const state = await oturum("Asker");
    state.ekstra_vergi_sonraki_yil = state.yil;
    yonetimYillikUygula(state, 1);
    expect(state.yonetim_talep?.tur).not.toBe("vergi");
  });

  it("net kâr eşiği 45'tir: 45×enflasyon üstü talep üretir", async () => {
    expect(EKSTRA_VERGI_KAR_ESIGI).toBe(45);
    const state = await oturum();
    karYaz(state, EKSTRA_VERGI_KAR_ESIGI * enflasyonCarpani(state) + 1);
    state.ekstra_vergi_sonraki_yil = state.yil;
    yonetimYillikUygula(state, 1);
    expect(state.yonetim_talep?.tur).toBe("vergi");
  });

  it("talebin süresi yoktur: yıllar geçse de tutar tahsil edilmez, talep yerinde kalır", async () => {
    const state = await oturum();
    state.yonetim_iliski = 60;
    karYaz(state, 200);
    state.ekstra_vergi_sonraki_yil = state.yil;
    yonetimYillikUygula(state, 1);
    const talep = state.yonetim_talep as YonetimTalep;
    expect(talep.tur).toBe("vergi");
    const para = state.para;
    state.yil += 10;
    yonetimYillikUygula(state, 2);
    expect(state.yonetim_talep).toEqual(talep);
    expect(state.para).toBe(para);
  });
});

describe("bekleyen vergi talebi oyunu durdurur", () => {
  async function bekleyenVergi() {
    const state = await oturum();
    state.zaman_modeli = "ilerle";
    state.yonetim_talep = { id: "v3", kimden: "yonetici", kimAdi: "x", tur: "vergi", tutar: 300, kalem: "ekstra vergi", sonYil: EKSTRA_VERGI_SONSUZ_YIL };
    return state;
  }

  it("senaryoUret, secimUygula ve yilGec reddedilir", async () => {
    const state = await bekleyenVergi();
    await expect(yilGec(state.id)).rejects.toThrow("ekstra vergi");
    delete state.zaman_modeli; // klasik mod: senaryo/seçim yolları
    await expect(senaryoUret(state.id)).rejects.toThrow("ekstra vergi");
    await expect(secimUygula(state.id, 0)).rejects.toThrow("ekstra vergi");
  });

  it("öde dedikten sonra akış serbest kalır", async () => {
    const state = await bekleyenVergi();
    await yonetimTalebiKararlastir(state.id, "kabul");
    await expect(yilGec(state.id)).resolves.toBeDefined();
  });
});

describe("yonetimTalebiKararlastir — vergi talebi", () => {
  async function vergiliOturum(tutar = 300) {
    const state = await oturum();
    state.yonetim_iliski = 50;
    state.yonetim_talep = { id: "v2", kimden: "yonetici", kimAdi: "x", tur: "vergi", tutar, kalem: "ekstra vergi", sonYil: state.yil + 2 };
    return state;
  }

  it("kabul: tutar düşer, ilişki artar, talep temizlenir; para yetmese de borca girer", async () => {
    const state = await vergiliOturum(300);
    state.para = 100;
    const sonuc = await yonetimTalebiKararlastir(state.id, "kabul");
    expect(sonuc.state.para).toBe(-200);
    expect(sonuc.state.yonetim_iliski).toBeGreaterThan(50);
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("rüşvet başarılı: yalnız %35 peşin gider, ahlak −5", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const state = await vergiliOturum(300);
    const ahlak = state.ahlak;
    const sonuc = await yonetimTalebiKararlastir(state.id, "rusvet");
    expect(sonuc.state.para).toBe(1000 - 105);
    expect(sonuc.state.ahlak).toBe(ahlak - 5);
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("rüşvet tutmaz: peşin bedel + tam vergi gider, ilişki düşer", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const state = await vergiliOturum(300);
    const sonuc = await yonetimTalebiKararlastir(state.id, "rusvet");
    expect(sonuc.state.para).toBe(1000 - 105 - 300);
    expect(sonuc.state.yonetim_iliski).toBe(40);
  });

  it("ret ve yalan bu talepte kabul edilmez; talep yerinde kalır", async () => {
    const state = await vergiliOturum();
    await expect(yonetimTalebiKararlastir(state.id, "ret")).rejects.toThrow();
    await expect(yonetimTalebiKararlastir(state.id, "yalan")).rejects.toThrow();
    expect(state.yonetim_talep?.tur).toBe("vergi");
  });

  it("rüşvet vergi dışı taleplerde reddedilir", async () => {
    const state = await oturum();
    state.yonetim_talep = { id: "b1", kimden: "yonetici", kimAdi: "x", tur: "bagis", tutar: 40, kalem: "bağış", sonYil: state.yil + 3 };
    await expect(yonetimTalebiKararlastir(state.id, "rusvet")).rejects.toThrow();
  });
});
