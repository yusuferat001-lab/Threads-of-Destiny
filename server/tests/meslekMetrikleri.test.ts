import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, finansGetir } from "../src/game/gameEngine";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { birlikKaybiUygula } from "../src/game/birlikIslem";

describe("meslek-özel derinlik metrikleri", () => {
  it("Asker mesleği seçilince ordu_mevcudu başlangıç değeri alır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    expect(state.ordu_mevcudu).toBe(20); // birlik modu: 20 er (meslek_musteri aynası)
    expect(state.meslek_musteri).toBe(20);
    expect(state.ordu_techizat_seviyesi).toBe(0);
  });

  it("Tüccar/Din Adamı seçilince ordu_mevcudu 0 kalır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    expect(state.ordu_mevcudu).toBe(0);
  });

  it("birlikKaybiUygula savaş sırasında barıştan daha fazla kayıp verir", () => {
    let toplamBarisKaybi = 0;
    let toplamSavasKaybi = 0;
    for (let i = 0; i < 200; i++) {
      const barisState = createCharacter("Orta Çağ", "Fransa", "kasaba");
      mesleğiSec(barisState, "Asker");
      barisState.meslek_musteri = 100;
      barisState.isletme!.birlik!.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      barisState.ulke.savasta = false;
      toplamBarisKaybi += birlikKaybiUygula(barisState, true);

      const savasState = createCharacter("Orta Çağ", "Fransa", "kasaba");
      mesleğiSec(savasState, "Asker");
      savasState.meslek_musteri = 100;
      savasState.isletme!.birlik!.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      savasState.ulke.savasta = true;
      toplamSavasKaybi += birlikKaybiUygula(savasState, true);
    }
    expect(toplamSavasKaybi).toBeGreaterThan(toplamBarisKaybi);
  });

  it("finansGetir hata fırlatmadan meslek metrikleri olan bir karakter için çalışır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const finans = await finansGetir(state.id);
    expect(finans.maasYillik).toBeGreaterThan(0);
  });
});
