import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl, birlikHesapla, erSayisi } from "../src/game/birlik";
import { birlikYilIsle, savasBaslat, savasiBitir, seferberlikUygula } from "../src/game/birlikYil";
import { BARIS_GANIMET_ARALIK, SAVAS_ZAFER_GANIMET, YARALI_TEDAVI_GIDERI, GANIMET_PAYI_TANIMLARI } from "../src/data/birlik";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState, IsletmeUyari } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 30;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("v39 barış kaybı ve sabit büyüme", () => {
  it("barış görev kayıpları ölü değil yaralı olur ve kaynağı görev adıyla yazılır", () => {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 200;
    const b = birlikAl(s);
    b.kalite = { dusuk: 200, orta: 0, yuksek: 0 };
    b.gorevler = ["haydut", "devriye"];
    b.baris_bekleme = 99; // çatışma çıkmasın
    let olu = 0;
    let yar = 0;
    let kaynakli = 0;
    for (let i = 0; i < 6; i++) {
      const u: IsletmeUyari[] = birlikYilIsle(s, bg(s)).dokum.uyarilar ?? [];
      for (const x of u) {
        if (x.kod !== "savas_kayip") continue;
        olu += x.sayi ?? 0;
        yar += x.yaralanan ?? 0;
        if (x.kaynak === "gorev" && x.kaynakAd?.tr) kaynakli++;
      }
    }
    expect(olu).toBe(0);
    expect(yar).toBeGreaterThan(0);
    expect(kaynakli).toBeGreaterThan(0);
  });

  it("her yıl en az +1 er gelir (savaşsız, subaysız, şöhretsiz)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const s = asker();
    s.un = 40; // kötü şöhret devşirmeyi azaltmasın
    s.rutbe_seviye = 3; // komuta limiti ordunun üstünde olsun
    s.isletme!.yatirimlar.kisla = 4;
    const once = erSayisi(s);
    birlikYilIsle(s, bg(s));
    expect(erSayisi(s)).toBeGreaterThanOrEqual(once + 1);
  });
});

describe("v39 ganimet", () => {
  it("savaş zaferi tek seferde güç × 5–7; yenilgide ganimet yok", () => {
    for (const zafer of [true, false]) {
      const s = asker();
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.sonuc = zafer ? "zafer" : "yenilgi";
      s.ulke.savasta = false;
      const guc = b.guc;
      const sonuc = savasiBitir(s, b, bg(s), []);
      if (zafer) {
        expect(sonuc.brut).toBeGreaterThanOrEqual(guc * SAVAS_ZAFER_GANIMET[0] * 0.5);
        expect(sonuc.brut).toBeLessThanOrEqual(guc * SAVAS_ZAFER_GANIMET[1] * 3);
      } else expect(sonuc.brut).toBe(0);
    }
  });

  it("sabitler: haydut/sınır 1–1,5, yaralı 0,30, ganimet politikası morali −8/0/+6", () => {
    expect(BARIS_GANIMET_ARALIK).toEqual([1, 1.5]);
    expect(SAVAS_ZAFER_GANIMET).toEqual([5, 7]);
    expect(YARALI_TEDAVI_GIDERI).toBe(0.3);
    expect([GANIMET_PAYI_TANIMLARI.az.moral, GANIMET_PAYI_TANIMLARI.dengeli.moral, GANIMET_PAYI_TANIMLARI.comert.moral]).toEqual([-8, 0, 6]);
  });

  it("görev ganimeti savaş yılında yok; yağma yalnız ilk 2 savaş yılında, yenilgiden sonra yok", () => {
    const s = asker();
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.rutbe_seviye = 3;
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    seferberlikUygula(s, "secme", bg(s));
    sv.ikmal = "yagma";
    sv.yil_sayac = 0;
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBeGreaterThan(0);
    sv.yil_sayac = 2; // 3. yıl: karar savaşı
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBe(0);
    sv.yil_sayac = 0;
    sv.sonuc = "yenilgi";
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBe(0);
    sv.sonuc = null;
    expect(birlikHesapla(s, bg(s)).gorevler.every((g) => g.ganimet === 0)).toBe(true);
  });
});
