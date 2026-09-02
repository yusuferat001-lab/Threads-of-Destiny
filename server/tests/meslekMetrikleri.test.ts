import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, yatirimYap, finansGetir } from "../src/game/gameEngine";
import { createCharacter, saldiriGucuHesapla, meslekMetrikCarpani, orduKaybiUygula } from "../src/game/stateManager";

describe("meslek-özel derinlik metrikleri", () => {
  it("Asker mesleği seçilince ordu_mevcudu başlangıç değeri alır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    expect(state.ordu_mevcudu).toBeGreaterThan(0);
    expect(state.ordu_techizat_seviyesi).toBe(0);
  });

  it("Tüccar/Din Adamı seçilince ordu_mevcudu 0 kalır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    expect(state.ordu_mevcudu).toBe(0);
  });

  it("'kendi_isi' yatırımı artık meslek metriğine dokunmaz; yıllık maaşı kalıcı olarak artırır", async () => {
    for (const meslek of ["Asker", "Tüccar", "Din Adamı"] as const) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
      await mesleğiAta(state.id, meslek);
      state.para = 500;
      const oncekiTechizat = state.ordu_techizat_seviyesi;
      const oncekiSermaye = state.ticaret_sermaye;
      const oncekiNufuz = state.nufuz;
      const oncekiMaas = state.maas_yillik;

      await yatirimYap(state.id);

      expect(state.ordu_techizat_seviyesi).toBe(oncekiTechizat);
      expect(state.ticaret_sermaye).toBe(oncekiSermaye);
      expect(state.nufuz).toBe(oncekiNufuz);
      expect(state.maas_yillik).toBeGreaterThan(oncekiMaas);
    }
  });

  it("saldiriGucuHesapla ordu mevcudu ve teçhizat seviyesine göre büyür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.meslek = "Asker";
    state.ordu_mevcudu = 10;
    state.ordu_techizat_seviyesi = 0;
    const temel = saldiriGucuHesapla(state);
    state.ordu_techizat_seviyesi = 50;
    const yuksekTechizat = saldiriGucuHesapla(state);
    expect(yuksekTechizat).toBeGreaterThan(temel);
  });

  it("meslekMetrikCarpani sadece kendi kategorisinde ve kendi meslekte devreye girer", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.meslek = "Asker";
    state.ordu_mevcudu = 50;
    state.ordu_techizat_seviyesi = 50;
    expect(meslekMetrikCarpani(state, "savas")).toBeGreaterThan(1);
    expect(meslekMetrikCarpani(state, "ticaret")).toBe(1);

    state.meslek = "Tüccar";
    state.ticaret_sermaye = 100;
    expect(meslekMetrikCarpani(state, "ticaret")).toBeGreaterThan(1);
    expect(meslekMetrikCarpani(state, "savas")).toBe(1);
  });

  it("orduKaybiUygula savaş sırasında barıştan daha fazla kayıp verir", () => {
    let toplamBarisKaybi = 0;
    let toplamSavasKaybi = 0;
    for (let i = 0; i < 200; i++) {
      const barisState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      barisState.meslek = "Asker";
      barisState.ordu_mevcudu = 100;
      barisState.ulke.savasta = false;
      toplamBarisKaybi += orduKaybiUygula(barisState, true);

      const savasState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      savasState.meslek = "Asker";
      savasState.ordu_mevcudu = 100;
      savasState.ulke.savasta = true;
      toplamSavasKaybi += orduKaybiUygula(savasState, true);
    }
    expect(toplamSavasKaybi).toBeGreaterThan(toplamBarisKaybi);
  });

  it("finansGetir hata fırlatmadan meslek metrikleri olan bir karakter için çalışır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    const finans = await finansGetir(state.id);
    expect(finans.maasYillik).toBeGreaterThan(0);
  });
});
