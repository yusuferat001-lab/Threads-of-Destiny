import { describe, it, expect } from "vitest";
import { createCharacter, yaslanmaUygula, yaslanmaYillikKayip } from "../src/game/stateManager";
import { gostergeDetayiUret, gostergeStatiMi, GOSTERGE_STATLARI } from "../src/game/gostergeDetay";
import { sucDegisimiHesapla, yeniOyun, gostergeGetir } from "../src/game/gameEngine";

function karakter(dil = "tr") {
  return createCharacter("Orta Çağ", "Fransa", "kasaba", "Test", dil);
}

describe("yaslanmaYillikKayip", () => {
  it("yaşlanmaUygula ile aynı tabloyu kullanır", () => {
    expect(yaslanmaYillikKayip(49)).toBe(0);
    expect(yaslanmaYillikKayip(50)).toBe(1);
    expect(yaslanmaYillikKayip(60)).toBe(4);
    expect(yaslanmaYillikKayip(70)).toBe(6);
    expect(yaslanmaYillikKayip(80)).toBe(8);
    const s = karakter();
    s.yas = 72;
    s.saglik = 100;
    expect(yaslanmaUygula(s, 1)).toBe(6);
    expect(s.saglik).toBe(94);
  });
});

describe("sucDegisimiHesapla", () => {
  it("net değişimi 0-100 kelepçesiyle verir", () => {
    expect(sucDegisimiHesapla(10, 30)).toBe(20);
    expect(sucDegisimiHesapla(90, 130)).toBe(10);
    expect(sucDegisimiHesapla(40, 10)).toBe(-30);
    expect(sucDegisimiHesapla(5, -10)).toBe(-5);
  });
});

describe("gostergeDetayiUret", () => {
  it("tüm statlar için etken ve ipucu listesi döner", () => {
    const s = karakter();
    for (const stat of GOSTERGE_STATLARI) {
      const d = gostergeDetayiUret(s, stat);
      expect(d.stat).toBe(stat);
      expect(d.etkenler.length).toBeGreaterThan(0);
      expect(d.yukselt.length).toBeGreaterThan(0);
      expect(d.dusur.length).toBeGreaterThan(0);
    }
  });

  it("sağlık: yaşlanma yalnız 50+ yaşta, sayı tablodan gelir", () => {
    const genc = karakter();
    genc.yas = 30;
    expect(gostergeDetayiUret(genc, "saglik").etkenler.some((e) => e.metin.startsWith("Yaşlanma"))).toBe(false);
    const yasli = karakter();
    yasli.yas = 72;
    const e = gostergeDetayiUret(yasli, "saglik").etkenler.find((x) => x.metin.startsWith("Yaşlanma"));
    expect(e?.metin).toContain("−6");
    expect(e?.yon).toBe("kotu");
  });

  it("sağlık: borçlu karakterde borç stresi, kıtlıkta kıtlık etkeni görünür", () => {
    const s = karakter();
    s.para = -20;
    s.ulke.kriz = { tur: "kitlik", bitisYili: s.yil + 2 };
    const m = gostergeDetayiUret(s, "saglik").etkenler.map((e) => e.metin).join("|");
    expect(m).toContain("Borç stresi");
    expect(m).toContain("Kıtlık");
  });

  it("mutluluk: 26+ yaşında bekâr karakter yalnızlık cezası görür", () => {
    const s = karakter();
    s.yas = 30;
    s.es_adi = null;
    const m = gostergeDetayiUret(s, "mutluluk").etkenler.map((e) => e.metin).join("|");
    expect(m).toContain("Yalnızlık");
    expect(m).toContain("−0.7");
  });

  it("aranma: bant ve düşürme yolları listelenir, karaborsa etkeni ekler", () => {
    const s = karakter();
    s.suc_seviyesi = 60;
    s.mulkler = ["karaborsa"];
    const d = gostergeDetayiUret(s, "aranma");
    const m = d.etkenler.map((e) => e.metin).join("|");
    expect(m).toContain("Baskın bandı");
    expect(m).toContain("Karaborsa");
    expect(d.dusur.some((x) => x.includes("kefaret"))).toBe(true);
    expect(d.deger).toBe(60);
  });

  it("İngilizce karakterde metinler çevrilir", () => {
    const s = karakter("en");
    s.yas = 72;
    s.suc_seviyesi = 30;
    const sag = gostergeDetayiUret(s, "saglik");
    expect(sag.etkenler.some((e) => e.metin.startsWith("Aging"))).toBe(true);
    const ar = gostergeDetayiUret(s, "aranma");
    expect(ar.etkenler.some((e) => e.metin.includes("Capture band"))).toBe(true);
    expect(ar.dusur.every((x) => !/[ığşçöüİ]/.test(x))).toBe(true);
  });

  it("para: maaş, gider ve dünya durumları listelenir", () => {
    const s = karakter();
    const m = gostergeDetayiUret(s, "para").etkenler.map((e) => e.metin).join("|");
    expect(m).toContain("Yıllık maaşın");
    expect(m).toContain("Yıllık giderin");
  });
});

describe("gostergeStatiMi / gostergeGetir", () => {
  it("geçersiz stat'ı reddeder", async () => {
    expect(gostergeStatiMi("saglik")).toBe(true);
    expect(gostergeStatiMi("kader")).toBe(false);
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await expect(gostergeGetir(st.id, "kader")).rejects.toThrow();
    const d = await gostergeGetir(st.id, "ahlak");
    expect(d.stat).toBe("ahlak");
  });
});
