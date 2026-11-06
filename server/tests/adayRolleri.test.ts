import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { adaylariYenile, ADAY_SAYISI } from "../src/game/isletme";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";

describe("aday önerisi: her rolden bir aday, en çok 5", () => {
  for (const meslek of ["Tüccar", "Zanaatkâr", "Din Adamı"]) {
    for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as const) {
      it(`${meslek} / ${cag}`, () => {
        const s = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
        mesleğiSec(s, meslek);
        const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
        for (let i = 0; i < 25; i++) {
          adaylariYenile(s);
          const adaylar = s.isletme!.adaylar;
          expect(adaylar.length).toBeLessThanOrEqual(ADAY_SAYISI);
          const roller = new Set(adaylar.map((a) => a.rolTuru));
          for (const r of profil.roller) expect(roller.has(r.tur)).toBe(true);
          for (const r of roller) expect(adaylar.filter((a) => a.rolTuru === r).length).toBeLessThanOrEqual(2);
        }
      });
    }
  }
});
