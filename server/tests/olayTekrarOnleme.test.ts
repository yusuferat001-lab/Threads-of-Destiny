import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { olaySec } from "../src/game/olaySecici";
import { OLAY_BANKASI } from "../src/data/olaylar";

describe("olay tekrar önleme (ömür içi + ömürler arası)", () => {
  it("bir olay bu ömürde bir kez görüldükten sonra, havuzda başka aday varken bir daha çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");

    const gorulenler = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const { olay, senaryo } = olaySec(state);
      expect(senaryo.id).toBe(olay.id);
      // Havuz büyük olduğu için (genel + meslek + ilişkiler vb.) güvenlik ağının
      // devreye girip tekrar vermesi bu kısa döngüde beklenmez.
      expect(gorulenler.has(olay.id)).toBe(false);
      gorulenler.add(olay.id);
      state.gecmis_olaylar.push(olay.id);
    }
  });

  it("önceki ömürlerde görülen olaylar yeni bir karakterde tekrar çıkmaz (havuzda alternatif varken)", () => {
    // Bütün banka hariç birkaç olayı "önceki ömürde görülmüş" say — bu birkaçının
    // yeni karakterde hiç seçilmediğini doğrula.
    const disaridaTutulacaklar = OLAY_BANKASI.slice(0, 30).map((o) => o.id);

    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.onceki_omurler_gorulen_olaylar = disaridaTutulacaklar;

    for (let i = 0; i < 40; i++) {
      const { olay } = olaySec(state);
      expect(disaridaTutulacaklar.includes(olay.id)).toBe(false);
      state.gecmis_olaylar.push(olay.id);
    }
  });

  it("güvenlik ağı: tüm uygun havuz önceki ömürde görülmüş olsa bile olaySec asla throw etmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    // Bankadaki HER olayı "önceki ömürde görülmüş" say — en aşırı durum.
    state.onceki_omurler_gorulen_olaylar = OLAY_BANKASI.map((o) => o.id);

    expect(() => olaySec(state)).not.toThrow();
  });

  it("eski kayıtlarda onceki_omurler_gorulen_olaylar alanı olmasa bile createCharacter güvenli bir varsayılan atar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(Array.isArray(state.onceki_omurler_gorulen_olaylar)).toBe(true);
    expect(state.onceki_omurler_gorulen_olaylar.length).toBe(0);
  });
});
