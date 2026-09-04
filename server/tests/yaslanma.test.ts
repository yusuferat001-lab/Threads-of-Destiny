import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, ecelDenemesi, pasifRegenEtkisi } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import type { SecimSonucu } from "../src/types";

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

describe("ecelDenemesi — ileri yaş doğal ölüm riski", () => {
  it("70 yaşından önce asla tetiklenmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.yas = 69;
    for (let i = 0; i < 5000; i++) expect(ecelDenemesi(state, 1)).toBeNull();
  });

  it("yaş ilerledikçe yıllık ölüm ihtimali artar", () => {
    function oran(yas: number): number {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      state.yas = yas;
      let olum = 0;
      const N = 20000;
      for (let i = 0; i < N; i++) if (ecelDenemesi(state, 1) !== null) olum++;
      return olum / N;
    }
    const o75 = oran(75);
    const o90 = oran(90);
    expect(o75).toBeGreaterThan(0.02);
    expect(o75).toBeLessThan(0.08);
    expect(o90).toBeGreaterThan(o75);
    expect(o90).toBeGreaterThan(0.1);
  });

  it("çok yıllı turda her yıl ayrı denenir (2 yıl ≈ tek yılın ~2 katı risk)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.yas = 80;
    let tek = 0;
    let cift = 0;
    const N = 20000;
    for (let i = 0; i < N; i++) {
      const s1 = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      s1.yas = 80;
      if (ecelDenemesi(s1, 1) !== null) tek++;
      const s2 = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      s2.yas = 81;
      if (ecelDenemesi(s2, 2) !== null) cift++;
    }
    expect(cift).toBeGreaterThan(tek * 1.5);
  });
});

describe("zengin karakter artık 'ölümsüz' değil (entegrasyon)", () => {
  it("şato + ziyafet + tam can ile bile 70'ten sonra ~30 yıl içinde ölür (çoğu koşuda)", async () => {
    let toplamOlumYasi = 0;
    let yuzdenOnceOldu = 0;
    const KOSU = 12;
    for (let k = 0; k < KOSU; k++) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "dag_basi");
      await mesleğiAta(state.id, "Tüccar");
      state.yas = 70;
      state.saglik = 100;
      state.mutluluk = 100;
      state.para = 100000;
      state.konut_id = "sato";
      state.yasam_secimi_id = "ziyafet_gibi_ye";

      for (let tur = 0; tur < 60 && state.aktif; tur++) {
        const senaryo = await senaryoUret(state.id);
        const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
        const cevap = await secimUygula(state.id, idx === -1 ? 0 : idx);
        if ("ara_tepki" in cevap) await secimUygula(state.id, 0);
      }
      expect(state.aktif).toBe(false);
      toplamOlumYasi += state.yas;
      if (state.yas < 100) yuzdenOnceOldu++;
    }
    // 100 yaş sabit tavanına dayanmadan, ecel/yaşlanma ile daha erken ölmeli.
    expect(yuzdenOnceOldu).toBeGreaterThanOrEqual(KOSU - 2);
    expect(toplamOlumYasi / KOSU).toBeLessThan(97);
  }, 60000);
});
