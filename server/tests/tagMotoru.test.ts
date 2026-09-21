import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, checkDeath, KORUYUCU_MUSKA_ETIKETI } from "../src/game/stateManager";

// Option-level yasakliEtiketler (restricted_tags) mekanizması, Faz 15'te bunu
// gerçekten kullanan içerikle birlikte (bkz. tests/derinlikMekanikleri.test.ts,
// "tek_kolu_yok" senaryosu) uçtan uca doğrulanıyor.

describe("koruyucu muska (ölümden tek seferlik kurtulma)", () => {
  it("muska varken ölümcül darbe atlatılır ve etiket tüketilir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 0;
    state.etiketler.push(KORUYUCU_MUSKA_ETIKETI);

    checkDeath(state, true, "Bir suikast girişimi");

    expect(state.aktif).toBe(true);
    expect(state.saglik).toBeGreaterThan(0);
    expect(state.etiketler.includes(KORUYUCU_MUSKA_ETIKETI)).toBe(false);
    expect(state.hayat_hikayesi.some((h) => h.baslik.includes("ölümden döndü"))).toBe(true);
  });

  it("muska yokken ölümcül darbe normal şekilde öldürür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 0;

    checkDeath(state, true, "Bir suikast girişimi");

    expect(state.aktif).toBe(false);
    expect(state.olum_nedeni).toBe("Bir suikast girişimi");
  });

  it("muska sadece bir kez çalışır, ikinci ölümcül darbede karakter ölür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.etiketler.push(KORUYUCU_MUSKA_ETIKETI);

    state.saglik = 0;
    checkDeath(state, true, "İlk darbe");
    expect(state.aktif).toBe(true);

    state.saglik = 0;
    checkDeath(state, true, "İkinci darbe");
    expect(state.aktif).toBe(false);
  });
});

describe("ünvan sistemi", () => {
  it("createCharacter boş unvanlar listesiyle başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.unvanlar).toEqual([]);
  });
});
