import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { OLAY_BANKASI } from "../src/data/olaylar";

describe("din bazlı olaylar", () => {
  it("gerekliDin karakterin din_kultur'üyle eşleşmiyorsa olay hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Selçuklu", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    expect(state.din_kultur).toBe("Sünni İslam");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      if (olay.gerekliDin) expect(olay.gerekliDin).toBe("Sünni İslam");
    }
  });

  it("her tanımlı din için en az bir olay eşleşiyor", () => {
    const dinler = ["Katolik", "Ortodoks", "Sünni İslam", "Anglikan"];
    for (const din of dinler) {
      const sayi = OLAY_BANKASI.filter((o) => o.gerekliDin === din).length;
      expect(sayi).toBeGreaterThan(0);
    }
  });

  it("Katolik karakter Ortodoks'a özel bir olayı hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    expect(state.din_kultur).toBe("Katolik");
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("İkonanın Önünde");
      expect(senaryo.olay_basligi).not.toBe("Büyük Perhiz");
    }
  });
});

describe("hizip olay havuzu (garanti mekanizmasının dayandığı havuz)", () => {
  it("her isimli hizip için en az beş özel olay bulunur", () => {
    for (const hizip of ["Eski Muhafızlar", "Yeni Nizam", "Liman Loncası", "Pazar Birliği", "Gelenekçiler", "Yenilikçiler"]) {
      const sayi = OLAY_BANKASI.filter((o) => o.gerekliEtiketler?.includes(`hizip:${hizip}`)).length;
      expect(sayi).toBeGreaterThanOrEqual(5);
    }
  });

  it("her meslek için en az üç genel/çatışma hizip olayı bulunur", () => {
    for (const meslek of ["Asker", "Tüccar", "Din Adamı"]) {
      const sayi = OLAY_BANKASI.filter((o) => o.gerekliHizip && (!o.meslekler || o.meslekler.includes(meslek))).length;
      expect(sayi).toBeGreaterThanOrEqual(3);
    }
  });
});
