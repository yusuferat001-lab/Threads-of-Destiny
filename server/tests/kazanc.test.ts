import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, finansGetir, isletmeDurumGetir, stateGetir } from "../src/game/gameEngine";

const MESLEKLER = ["Asker", "Tüccar", "Zanaatkâr", "Din Adamı"];

describe("Kazanç tek kaynak (FinansOzeti.kazanc)", () => {
  for (const meslek of MESLEKLER) {
    it(`${meslek}: gelir − gider = net, aralık net'i içerir, gelir > 0`, async () => {
      const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
      await mesleğiAta(st.id, meslek);
      const f = await finansGetir(st.id);
      const k = f.kazanc;
      expect(k.gelir).toBeGreaterThan(0);
      expect(k.gelir - k.gider).toBeCloseTo(k.net, 1);
      expect(k.alt).toBeLessThanOrEqual(k.net + 1e-9);
      expect(k.ust).toBeGreaterThanOrEqual(k.net - 1e-9);
    });
  }

  it("kredi taksidi net'ten düşer (ayrı satır ya da yazı gerekmeden)", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    const once = (await finansGetir(st.id)).kazanc.net;
    const state = await stateGetir(st.id);
    state.kredi = { kalanBorc: 100, yillikTaksit: 7, anapara: 100, faiz: 0.1, kalanYil: 14 } as never;
    const sonra = await finansGetir(st.id);
    expect(sonra.krediTaksit).toBeCloseTo(7, 1);
    expect(sonra.kazanc.net).toBeCloseTo(once - 7, 1);
  });

  it("Asker'de subay maaşı net'ten düşer ve gelir sold + görev içerir", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    const once = (await finansGetir(st.id)).kazanc;
    const state = await stateGetir(st.id);
    state.ekip = [{ id: "o1", isim: "Test", rol: "Harp subayı", rol_turu: "ana", maas: 5, sadakat: 70, gercekKalite: 60, y_giris: 60, s_giris: 70, maas_taban: 5 } as never];
    const sonra = (await finansGetir(st.id)).kazanc;
    expect(sonra.net).toBeCloseTo(once.net - 5, 1);
    const durum = await isletmeDurumGetir(st.id);
    expect(durum.butce.gelir).toBeGreaterThan(0);
  });
});
