import { describe, it, expect } from "vitest";
import { pasifRegenEtkisi } from "../src/game/stateManager";

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

