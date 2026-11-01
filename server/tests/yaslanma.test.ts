import { describe, it, expect } from "vitest";
import { pasifRegenEtkisi, evYasamSaglikSiniri, evYasamSaglikEtkisi } from "../src/game/stateManager";

describe("evYasamSaglikEtkisi — yaşa bağlı sert can sınırı", () => {
  it("sınır yaşlandıkça düşer", () => {
    expect([20, 30, 31, 45, 46, 60, 61, 75, 76, 90].map(evYasamSaglikSiniri)).toEqual([85, 85, 80, 80, 70, 70, 60, 60, 50, 50]);
  });

  it("sınırın altında tam, taşan kısım kesilir, üstünde sıfır", () => {
    expect(evYasamSaglikEtkisi(50, 6, 40)).toBe(6);
    expect(evYasamSaglikEtkisi(78, 6, 40)).toBe(2); // sınır 80
    expect(evYasamSaglikEtkisi(80, 6, 40)).toBe(0);
    expect(evYasamSaglikEtkisi(95, 6, 40)).toBe(0);
  });

  it("hasar (negatif) aynen geçer", () => {
    expect(evYasamSaglikEtkisi(95, -4, 40)).toBe(-4);
  });
});

describe("pasifRegenEtkisi — yumuşak tavan", () => {
  it("tavanın (80) altında tam işler", () => {
    expect(pasifRegenEtkisi(50, 6)).toBe(6);
    expect(pasifRegenEtkisi(74, 6)).toBe(6);
  });

  it("tavanın üstünde taşan kısım kısılır", () => {
    // 78'den +6: 2 birim tavana (80) kadar tam, kalan 4 birim ×0.25 = 1 → toplam 3
    expect(pasifRegenEtkisi(78, 6)).toBeCloseTo(3, 5);
    // 90'dan +6: tamamı tavan üstü → 6 ×0.25 = 1.5
    expect(pasifRegenEtkisi(90, 6)).toBeCloseTo(1.5, 5);
  });

  it("negatif (hasar) etkilenmez", () => {
    expect(pasifRegenEtkisi(95, -4)).toBe(-4);
    expect(pasifRegenEtkisi(20, -1)).toBe(-1);
  });
});

