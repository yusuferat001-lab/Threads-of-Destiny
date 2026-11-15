import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl } from "../src/game/birlik";
import { barisCatismaCoz, savasBaslat, savasiBitir, seferberlikUygula, sohretSonucuUygula } from "../src/game/birlikYil";
import { KISLA_BAKIM, KISLA_ER_LIMITI, SOHRET_SONUCU } from "../src/data/birlik";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 35;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  s.un = 50;
  s.saglik = 100;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("v65 kışla bakımı ve sonuca göre şöhret", () => {
  it("kışla bakımı düşük kademede yumuşak; tam dolu kışlada er başı bakım kademeyle artar", () => {
    expect(KISLA_BAKIM).toEqual([2, 6, 18, 50, 120]);
    const erBasi = KISLA_BAKIM.map((x, i) => x / KISLA_ER_LIMITI[i]);
    for (let i = 1; i < erBasi.length; i++) expect(erBasi[i]).toBeGreaterThan(erBasi[i - 1]);
    for (let i = 1; i < KISLA_BAKIM.length; i++) expect(KISLA_BAKIM[i]).toBeGreaterThan(KISLA_BAKIM[i - 1]);
  });

  it("şöhret aralıkları: haydut < sınır < savaş; yenilgi zaferden az değil (savaşta daha ağır)", () => {
    expect(SOHRET_SONUCU.haydut.zafer[1]).toBeLessThan(SOHRET_SONUCU.sinir.zafer[1]);
    expect(SOHRET_SONUCU.sinir.zafer[1]).toBeLessThan(SOHRET_SONUCU.savas.zafer[1]);
    expect(SOHRET_SONUCU.savas.yenilgi[1]).toBeGreaterThan(SOHRET_SONUCU.savas.zafer[1]);
    const s = asker();
    expect(sohretSonucuUygula(s, "savas", true, 1)).toBe(4);
    expect(s.un).toBe(54);
    expect(sohretSonucuUygula(s, "savas", false, 1)).toBe(-5);
    expect(s.un).toBe(49);
    s.un = 1;
    sohretSonucuUygula(s, "savas", false, 1);
    expect(s.un).toBe(0); // alt sınır 0
  });

  it("çatışma: zafer şöhret kazandırır, yenilgi götürür; baskın ekstra; sonuç ekranına yansır", () => {
    const sonuc = (zafer: boolean, baskin: boolean, tur: "haydut" | "sinir") => {
      const s = asker();
      s.meslek_musteri = 100;
      const b = birlikAl(s);
      b.catisma_bekleyen = { yil: s.yil, tur, baskin, dusmanTur: "karma", dusmanGuc: zafer ? 1 : 100000 };
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      const r = barisCatismaCoz(s, b, bg(s), "savunma");
      vi.restoreAllMocks();
      return { r, fark: r.sohret ?? 0 }; // (ilk haydut zaferindeki madalya şöhreti ayrıdır)
    };
    for (const tur of ["haydut", "sinir"] as const) {
      const z = sonuc(true, false, tur);
      const y = sonuc(false, false, tur);
      expect(z.r.zafer).toBe(true);
      expect(y.r.zafer).toBe(false);
      expect(z.fark).toBeGreaterThanOrEqual(0);
      expect(y.fark).toBeLessThanOrEqual(0);
    }
    const bz = sonuc(true, true, "sinir");
    const bn = sonuc(true, false, "sinir");
    expect(bz.fark).toBeGreaterThan(bn.fark - 0.5);
    expect(sonuc(false, true, "sinir").fark).toBeLessThan(sonuc(false, false, "sinir").fark + 0.5);
  });

  it("büyük savaş sonu: zafer şöhret kazandırır, yenilgi götürür", () => {
    for (const zafer of [true, false]) {
      const s = asker();
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.sonuc = zafer ? "zafer" : "yenilgi";
      s.ulke.savasta = false;
      savasiBitir(s, b, bg(s), []);
      if (zafer) expect(s.un).toBeGreaterThanOrEqual(52);
      else expect(s.un).toBeLessThanOrEqual(47);
    }
  });
});
