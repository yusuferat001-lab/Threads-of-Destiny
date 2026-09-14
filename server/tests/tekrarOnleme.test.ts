import { describe, it, expect } from "vitest";
import { sonKTekrarOnlemeHesapla, olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";

/**
 * "Az olay var" turu, Faz 2 (Yol C) — bkz. kullanıcıyla konuşulan plan.
 * Sabit `SON_K_TEKRAR_ONLEME=6` küçük (tag-gated) havuzlarda neredeyse hiç
 * koruma sağlamıyordu; artık havuz büyüklüğüne uyarlanıyor.
 */
describe("sonKTekrarOnlemeHesapla (havuza uyarlanan tekrar-önleme penceresi)", () => {
  it("çok küçük havuzda taban 6'yı korur", () => {
    expect(sonKTekrarOnlemeHesapla(4)).toBe(6);
    expect(sonKTekrarOnlemeHesapla(8)).toBe(6);
  });

  it("orta büyüklükte havuzun ~%70'i kadar büyür", () => {
    expect(sonKTekrarOnlemeHesapla(39)).toBe(27); // hapis havuzu
    expect(sonKTekrarOnlemeHesapla(10)).toBe(7); // kaçak havuzu
  });

  it("büyük havuzda 30'da tavanlanır", () => {
    expect(sonKTekrarOnlemeHesapla(150)).toBe(30);
    expect(sonKTekrarOnlemeHesapla(1000)).toBe(30);
  });
});

describe("hapis havuzunda gerçek tekrar sıklığı (entegrasyon)", () => {
  it("art arda 20 çekilişte aynı olay eskisi kadar sık dönmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    state.yas = 35;
    state.etiketler.push("hapiste");

    const gorulenSayaci: Record<string, number> = {};
    for (let i = 0; i < 20; i++) {
      const { olay } = olaySec(state);
      gorulenSayaci[olay.id] = (gorulenSayaci[olay.id] ?? 0) + 1;
      state.gecmis_olaylar.push(olay.id);
    }

    const enSikTekrar = Math.max(...Object.values(gorulenSayaci));
    // Havuz ~39 olay; 27'lik pencere ile 20 çekilişte hiçbir olay 2'den
    // fazla tekrar etmemeli (eski sabit-6 davranışında bu rahatlıkla 4-5+ olabiliyordu).
    expect(enSikTekrar).toBeLessThanOrEqual(2);
  });
});
