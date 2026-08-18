import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { OLAY_BANKASI } from "../src/data/olaylar";

describe("hapishane sistemi", () => {
  it("hapiste değilken hapis olayları hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.hapisOlayi).not.toBe(true);
    }
  });

  it("hapisteyken sadece hapis olayları çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["hapiste"]);
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.hapisOlayi).toBe(true);
    }
  });

  it("ahlak ve ün çok düşükken tutuklanma olayı uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ahlak = 5;
    state.un = 2;
    let bulundu = false;
    for (let i = 0; i < 500 && !bulundu; i++) {
      const { olay } = olaySec(state);
      if (olay.id === "hapis_tutuklanma") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });

  it("ahlak/ün normalken tutuklanma olayı hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ahlak = 50;
    state.un = 50;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("hapis_tutuklanma");
    }
  });

  it("her hapis olayında oyuncu için en az bir kilitsiz seçenek vardır (para/ahlak/ün yetersiz olsa bile)", () => {
    const hapisOlaylari = OLAY_BANKASI.filter((o) => o.hapisOlayi);
    expect(hapisOlaylari.length).toBeGreaterThan(0);
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.para = -50; // borçlu: maliyetli seçenekler kilitlenir
    etiketEkle(state, ["hapiste"]);
    for (const tanim of hapisOlaylari) {
      const { senaryo } = olaySec(state, tanim.id);
      expect(senaryo.secenekler.some((s) => !s.kilitli)).toBe(true);
    }
  });

  it("kaçış/rüşvet/ceza-doldu olaylarının başarılı sonucu hapiste etiketini kaldırır", () => {
    const kacis = OLAY_BANKASI.find((o) => o.id === "hapis_kacis_girisimi")!;
    const rusvet = OLAY_BANKASI.find((o) => o.id === "hapis_rusvet_girisimi")!;
    const cezaDoldu = OLAY_BANKASI.find((o) => o.id === "hapis_cezasi_doldu")!;
    for (const olay of [kacis, rusvet, cezaDoldu]) {
      expect(olay.secenekler.some((s) => s.basariliSonuc.etiket_sil?.includes("hapiste"))).toBe(true);
    }
  });
});
