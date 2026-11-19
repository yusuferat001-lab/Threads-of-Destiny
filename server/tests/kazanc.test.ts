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
    // Hazine payı ilk dilimi %10 (v67): küçük pozitif Kazanç'ta vergi payı farkı olabilir, bu yüzden ±0,5 tolerans.
    expect(Math.abs(once - sonra.kazanc.net - 7)).toBeLessThanOrEqual(1); // taksit 7; hazine payı %10 olduğundan küçük kazançta fark ≤ 0,7
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
    expect(f.hazinePayi).toBeCloseTo(d.butce.hazinePayi, 1); // Gelir&Gider ekranındaki Hazine payı satırı
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
    // Hazine payı ilk dilimi %10 (v67): küçük pozitif Kazanç'ta vergi payı farkı olabilir, bu yüzden ±0,5 tolerans.
    expect(Math.abs(once.net - sonra.net - 5)).toBeLessThanOrEqual(0.55); // 5 maaş; hazine payı ilk dilimi %10 → fark 4,5–5
    const durum = await isletmeDurumGetir(st.id);
    expect(durum.butce.gelir).toBeGreaterThan(0);
  });
});

describe("v67 Madde 8 — iki sütunlu bütçe kalemleri", () => {
  for (const meslek of MESLEKLER) {
    it(`${meslek}: Σgelir − Σgider = Kazanç (butce.kazanc = finans.kazanc.net); gelir sol, gider sağ`, async () => {
      const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
      await mesleğiAta(st.id, meslek);
      const d = await isletmeDurumGetir(st.id);
      const f = await finansGetir(st.id);
      const k = d.butce.kalemler;
      expect(k.gelir.length).toBeGreaterThan(0);
      expect(k.gider.length).toBeGreaterThan(0);
      for (const x of [...k.gelir, ...k.gider]) expect(x.tutar).toBeGreaterThan(0);
      const gelir = k.gelir.reduce((t, x) => t + x.tutar, 0);
      const gider = k.gider.reduce((t, x) => t + x.tutar, 0);
      expect(gelir - gider).toBeCloseTo(d.butce.kazanc, 1);
      expect(f.kalemler).toEqual(k); // iki ekran aynı kaynak
      expect(f.kazanc.net).toBeCloseTo(d.butce.kazanc, 1);
    });
  }

  it("Asker: subay maaşı gider sütununda ve Kazanç'ı düşürür; kalem toplamı hâlâ Kazanç'a eşit", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    const state = await stateGetir(st.id);
    const once = (await isletmeDurumGetir(st.id)).butce;
    state.ekip = [{ id: "o1", isim: "Test", rol: "Harp subayı", rol_turu: "ana", maas: 5, sadakat: 70, gercekKalite: 60, y_giris: 60, s_giris: 70, maas_taban: 5 } as never];
    const sonra = (await isletmeDurumGetir(st.id)).butce;
    expect(sonra.kazanc).toBeLessThan(once.kazanc);
    const maas = sonra.kalemler.gider.find((x) => x.kod === "maas");
    expect(maas?.tutar).toBeCloseTo(5, 1);
    const gelir = sonra.kalemler.gelir.reduce((t, x) => t + x.tutar, 0);
    const gider = sonra.kalemler.gider.reduce((t, x) => t + x.tutar, 0);
    expect(gelir - gider).toBeCloseTo(sonra.kazanc, 1);
  });

  it("Asker: çatışma ganimeti birikimi Kazanç'a eklenir ve hazine payına tabi olur (gelir sütununda 'Çatışma ganimeti')", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    const state = await stateGetir(st.id);
    const once = (await isletmeDurumGetir(st.id)).butce;
    state.isletme!.birlik!.ganimet_birikimi = 80;
    const sonra = (await isletmeDurumGetir(st.id)).butce;
    const g = sonra.kalemler.gelir.find((x) => x.kod === "catisma_ganimeti");
    expect(g?.tutar).toBeCloseTo(80, 1);
    expect(sonra.kazanc).toBeGreaterThan(once.kazanc);
    expect(sonra.kazanc - once.kazanc).toBeLessThan(80); // vergi (hazine payı) kesildi
    expect(sonra.hazinePayi).toBeGreaterThan(once.hazinePayi);
    const gelir = sonra.kalemler.gelir.reduce((t, x) => t + x.tutar, 0);
    const gider = sonra.kalemler.gider.reduce((t, x) => t + x.tutar, 0);
    expect(gelir - gider).toBeCloseTo(sonra.kazanc, 1);
  });
});
