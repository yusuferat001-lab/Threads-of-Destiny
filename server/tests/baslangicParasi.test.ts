import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";

/** v67 sonrası: oyuna başlama parası dört meslekte de en az 20 (üst sınır 54 aynı); para meslek seçiminden önce bir kez belirlenir. */
describe("başlangıç parası: dört meslekte de en az 20", () => {
  const kombinasyonlar: [Parameters<typeof createCharacter>[0], string][] = [
    ["Orta Çağ", "Fransa"],
    ["Orta Çağ", "Kutsal Roma"],
    ["Orta Çağ", "Bizans"],
    ["Orta Çağ", "Selçuklu"],
    ["Sanayi Devrimi", "İngiltere"],
    ["Sanayi Devrimi", "Osmanlı"],
  ];
  for (const meslek of ["Asker", "Tüccar", "Din Adamı", "Zanaatkâr"]) {
    it(`${meslek}: tüm aile/bölge kombinasyonlarında para ∈ [20, 54]`, () => {
      let enAz = Infinity;
      for (const [cag, bolge] of kombinasyonlar) {
        for (let i = 0; i < 40; i++) {
          const s = createCharacter(cag, bolge, "kasaba");
          mesleğiSec(s, meslek);
          enAz = Math.min(enAz, s.para);
          expect(s.para).toBeGreaterThanOrEqual(20);
          expect(s.para).toBeLessThanOrEqual(54);
        }
      }
      expect(enAz).toBeGreaterThanOrEqual(20);
    });
  }
});
