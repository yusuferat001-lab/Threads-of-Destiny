import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl } from "../src/game/birlik";
import { barisCatismaCoz, saglikBedeliUygula, savasBaslat, savasiBitir, seferberlikUygula } from "../src/game/birlikYil";
import { SAVAS_SAGLIK_TOPLAM } from "../src/data/birlik";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 35;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  s.saglik = 90;
  s.rutbe_seviye = 1;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("v63 oyuncunun sağlığı: savaş ve çatışma", () => {
  it("büyük savaşın toplam ham bedeli 5–20 aralığında çekilir; rütbe arttıkça sağlık kaybı sabit kalır", () => {
    for (let i = 0; i < 30; i++) {
      const sv = savasBaslat(asker());
      expect(sv.saglik_plan!).toBeGreaterThanOrEqual(SAVAS_SAGLIK_TOPLAM[0]);
      expect(sv.saglik_plan!).toBeLessThanOrEqual(SAVAS_SAGLIK_TOPLAM[1]);
    }
    const s1 = asker();
    const s5 = asker();
    s5.rutbe_seviye = 5;
    expect(saglikBedeliUygula(s1, 10)).toBe(10);
    expect(saglikBedeliUygula(s5, 10)).toBe(10);
  });

  it("Tabip subayı ve revir sağlık bedelini azaltır", () => {
    const s = asker();
    const taban = saglikBedeliUygula(s, 10);
    const r = asker();
    r.isletme!.yatirimlar.revir = 4;
    expect(saglikBedeliUygula(r, 20)).toBeLessThan(20);
    expect(taban).toBe(10);
    const t = asker();
    t.ekip.push({ id: "t1", ad: "Tabip", rol_turu: "guvenlik", gercekKalite: 100, sadakat: 90, maas: 0 } as never);
    expect(saglikBedeliUygula(t, 20)).toBeLessThan(20);
  });

  it("alt limit yok: sağlık 0'a inerse oyuncu savaşta ölür", () => {
    const s = asker();
    s.saglik = 3;
    saglikBedeliUygula(s, 10);
    expect(s.saglik).toBe(0);
    expect(s.aktif).toBe(false);
    expect(s.olum_nedeni).toMatch(/yaralar/);
  });

  it("savaş bitince toplam kayıp ≈ plan (yenilgide +3 ek) ve savas_saglik uyarısı gelir", () => {
    for (const zafer of [true, false]) {
      const s = asker();
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.saglik_plan = 12;
      sv.sonuc = zafer ? "zafer" : "yenilgi";
      s.ulke.savasta = false;
      const uyarilar: { kod: string }[] = [];
      savasiBitir(s, b, bg(s), uyarilar as never);
      expect(90 - s.saglik).toBe(zafer ? 12 : 15);
      expect(uyarilar.some((u) => u.kod === "savas_saglik")).toBe(true);
    }
  });

  it("çatışma: yenilgi zaferden fazla sağlık götürür ve sonuçta görünür", () => {
    const sonuc = (zafer: boolean) => {
      const s = asker();
      s.meslek_musteri = 100;
      const b = birlikAl(s);
      b.catisma_bekleyen = { yil: s.yil, tur: "sinir", baskin: false, dusmanTur: "karma", dusmanGuc: zafer ? 1 : 100000 };
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      const r = barisCatismaCoz(s, b, bg(s), "savunma");
      vi.restoreAllMocks();
      return { r, kayip: 90 - s.saglik };
    };
    const z = sonuc(true);
    const y = sonuc(false);
    expect(z.r.zafer).toBe(true);
    expect(y.r.zafer).toBe(false);
    expect(y.kayip).toBeGreaterThan(z.kayip);
    expect(y.r.saglik).toBe(y.kayip);
  });
});
