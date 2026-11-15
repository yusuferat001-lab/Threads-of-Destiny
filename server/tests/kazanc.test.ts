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

  it("Asker: hazine payı KAZANÇ üzerinden alınır (ordu neti − subay − yaşam − kira − hayvan − kredi + mülk); kazanç vergi sonrasıdır", async () => {
    const { hazinePayiKazanctan } = await import("../src/game/birlik");
    const { isletmeBaglami } = await import("../src/game/stateManager");
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    const state = await stateGetir(st.id);
    state.rutbe_seviye = 5;
    state.isletme!.yatirimlar.kisla = 4;
    state.meslek_musteri = 320;
    state.isletme!.birlik!.kalite = { dusuk: 0, orta: 320, yuksek: 0 };
    state.isletme!.birlik!.gorevler = ["komuta"];
    state.isletme!.birlik!.kale = 3; // ele geçirilmiş kaleler yıllık gelir verir
    state.isletme!.birlik!.kale_gelir = [100, 100, 100];
    state.isletme!.birlik!.moral = 100;
    state.isletme!.birlik!.talim = 100;
    state.ekip = [{ id: "o1", isim: "Test", rol: "Harp subayı", rol_turu: "ana", maas: 20, sadakat: 70, gercekKalite: 60, y_giris: 60, s_giris: 70, maas_taban: 5 } as never];
    state.para_birimi = state.para_birimi;
    const f = await finansGetir(st.id);
    const d = await isletmeDurumGetir(st.id);
    const e = isletmeBaglami(state).enflasyon;
    const vergisiz = d.butce.cebineKalan + d.butce.mulkGeliri; // ordu neti (subay sonrası) − yaşam − kira − hayvan − kredi + mülk
    expect(vergisiz).toBeGreaterThan(100 * e); // vergiye takılacak kadar kazanç
    expect(d.butce.hazinePayi).toBeCloseTo(hazinePayiKazanctan(state, e, vergisiz), 1);
    expect(d.butce.hazinePayi).toBeGreaterThan(0);
    expect(d.butce.kazanc).toBeCloseTo(vergisiz - d.butce.hazinePayi, 1);
    expect(f.kazanc.net).toBeCloseTo(d.butce.kazanc, 1); // ana ekran Kazanç == Ordu bütçesi Kazanç (vergi sonrası)
    // Ordu netinden (yaşam/subay düşülmeden) alınsaydı vergi daha yüksek olurdu: kazançtan alınan, ordu netinden alınandan azdır.
    expect(d.butce.hazinePayi).toBeLessThan(hazinePayiKazanctan(state, e, d.butce.net));
    // Zararda vergi yok
    expect(hazinePayiKazanctan(state, e, -500)).toBe(0);
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
