import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter } from "../src/game/stateManager";

describe("tonal tutarsızlık mitigasyonu", () => {
  it("bir önceki olay ağırsa, art arda ağır olay gelme ihtimali belirgin şekilde azalır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.meslek = "Tüccar";
    state.etiketler.push("aile:soylu");

    // "agir" olaylar havuzda az sayıda olduğundan (nadir olay), düşük DENEME'de
    // örneklem gürültüsü oranı yanıltıp testi flaky yapabiliyordu (gerçek çarpan
    // AGIR_ARKA_ARKAYA_CARPANI=0.15 iken, birkaç düzine gözlemle ölçülen oran
    // rastgele 0.3 eşiğinin üstüne çıkabiliyordu). Örneklemi büyütüp eşiğe biraz
    // daha pay bırakmak, gerçek mitigasyonu hâlâ net şekilde doğrularken
    // istatistiksel gürültüyü pratikte ihmal edilebilir seviyeye indiriyor.
    const DENEME = 60000;
    let agirNormal = 0;
    let agirArdArda = 0;

    for (let i = 0; i < DENEME; i++) {
      if (olaySec(state, undefined, null).olay.ton === "agir") agirNormal++;
      if (olaySec(state, undefined, "agir").olay.ton === "agir") agirArdArda++;
    }

    const normalOran = agirNormal / DENEME;
    const ardArdaOran = agirArdArda / DENEME;

    expect(normalOran).toBeGreaterThan(0);
    expect(ardArdaOran).toBeLessThan(normalOran * 0.35);
  }, 240000);
});
