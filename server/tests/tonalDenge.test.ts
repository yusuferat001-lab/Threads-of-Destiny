import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter } from "../src/game/stateManager";

describe("tonal tutarsızlık mitigasyonu", () => {
  it("bir önceki olay ağırsa, art arda ağır olay gelme ihtimali belirgin şekilde azalır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.yas = 20;
    state.meslek = "Tüccar";
    state.etiketler.push("aile:soylu");

    const DENEME = 8000;
    let agirNormal = 0;
    let agirArdArda = 0;

    for (let i = 0; i < DENEME; i++) {
      if (olaySec(state, undefined, null).olay.ton === "agir") agirNormal++;
      if (olaySec(state, undefined, "agir").olay.ton === "agir") agirArdArda++;
    }

    const normalOran = agirNormal / DENEME;
    const ardArdaOran = agirArdArda / DENEME;

    expect(normalOran).toBeGreaterThan(0);
    expect(ardArdaOran).toBeLessThan(normalOran * 0.3);
  });
});
