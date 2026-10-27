import { describe, it, expect } from "vitest";
import { createCharacter, yaslanmaUygula, yaslanmaYillikKayip, gencSaglikToparlanmasi, capraletkiUygula, sohretErimesiYillik, pasifEkonomiUygula } from "../src/game/stateManager";
import { gostergeDetayiUret, gostergeStatiMi, etkenGunluguNotEt, GOSTERGE_STATLARI } from "../src/game/gostergeDetay";
import { sucDegisimiHesapla, yeniOyun, gostergeGetir } from "../src/game/gameEngine";

function karakter(dil = "tr") {
  return createCharacter("Orta Çağ", "Fransa", "kasaba", "Test", dil);
}

describe("yaslanmaYillikKayip", () => {
  it("yaşlanmaUygula ile aynı tabloyu kullanır", () => {
    expect(yaslanmaYillikKayip(49)).toBe(0);
    expect(yaslanmaYillikKayip(50)).toBe(3);
    expect(yaslanmaYillikKayip(60)).toBe(5);
    expect(yaslanmaYillikKayip(70)).toBe(5);
    expect(yaslanmaYillikKayip(75)).toBe(6);
    expect(yaslanmaYillikKayip(80)).toBe(8);
    expect(yaslanmaYillikKayip(84)).toBe(8);
    expect(yaslanmaYillikKayip(85)).toBe(10);
    expect(yaslanmaYillikKayip(95)).toBe(10);
    const s = karakter();
    s.yas = 72;
    s.saglik = 100;
    expect(yaslanmaUygula(s, 1)).toBe(5);
    expect(s.saglik).toBe(95);
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
    const e = gostergeDetayiUret(yasli, "saglik").etkenler.find((x) => x.metin.startsWith("Yaşlanma:"));
    expect(e?.metin).toContain("−5");
    expect(e?.yon).toBe("kotu");
  });

  it("borç sağlığı düşürmez (yalnız mutluluğu −1/yıl yıpratır); kıtlık sağlık götürmez", () => {
    const s = karakter();
    s.para = -20;
    s.ulke.kriz = { tur: "kitlik", bitisYili: s.yil + 2 };
    const m = gostergeDetayiUret(s, "saglik").etkenler.map((e) => e.metin).join("|");
    expect(m).not.toContain("Borç stresi");
    expect(m).not.toContain("Kıtlık");
    const mut = gostergeDetayiUret(s, "mutluluk").etkenler.map((e) => e.metin).join("|");
    expect(mut).toContain("Borç stresi");
    expect(mut).toContain("−1");
  });

  it("yaşlanma tavanlı iniş: 50-59 → 40, 60-64 → 30, 65-69 → 20, 70-74 → 10; tavanın altındaki sağlığa dokunmaz; genç 30'a kadar +1", () => {
    const a = karakter();
    a.yas = 58; // yasArtisi 1 → yıl yaşı 58
    a.saglik = 41;
    yaslanmaUygula(a, 1);
    expect(a.saglik).toBe(40);
    a.yas = 59;
    yaslanmaUygula(a, 1);
    expect(a.saglik).toBe(40); // tavanda durur
    const b = karakter();
    b.yas = 62;
    b.saglik = 35;
    yaslanmaUygula(b, 2); // 61-62 → tavan 30
    expect(b.saglik).toBe(30);
    const c = karakter();
    c.yas = 72;
    c.saglik = 8; // tavanın (10) altında: değişmez
    yaslanmaUygula(c, 1);
    expect(c.saglik).toBe(8);
    const g = karakter();
    g.yas = 25;
    g.saglik = 60;
    gencSaglikToparlanmasi(g, 2);
    expect(g.saglik).toBe(62);
    g.saglik = 70;
    gencSaglikToparlanmasi(g, 1);
    expect(g.saglik).toBe(70); // 70'te durur
    g.yas = 31;
    g.saglik = 50;
    gencSaglikToparlanmasi(g, 1);
    expect(g.saglik).toBe(50); // 30'dan sonra yok
  });

  it("şöhret erimesi: 40 altı yok, 40-50 −1, 50-65 −2, 65-80 −3, 80+ −4 (pasifEkonomiUygula + gösterge)", () => {
    const beklenen: [number, number][] = [[39, 0], [40, 1], [49, 1], [50, 2], [64, 2], [65, 3], [79, 3], [80, 4], [100, 4]];
    for (const [un, kayip] of beklenen) expect(sohretErimesiYillik(un)).toBe(kayip);
    const s = karakter();
    s.meslek = null as never;
    s.un = 90;
    pasifEkonomiUygula(s, 1);
    expect(s.un).toBe(86);
    s.un = 55;
    s.para = 500; // borç kademesi şöhreti etkilemesin
    pasifEkonomiUygula(s, 2);
    expect(s.un).toBe(51);
    s.un = 30;
    s.para = 500;
    pasifEkonomiUygula(s, 1);
    expect(s.un).toBe(30);
    s.un = 90;
    const m = gostergeDetayiUret(s, "sohret").etkenler.map((e) => e.metin).join("|");
    expect(m).toContain("−4");
    expect(m).toContain("sönüyor");
  });

  it("borç kademeleri: faiz eşiği aşan kısma %10; mutluluk/şöhret kaybı kademeli; eşik enflasyonlu", () => {
    const hazirla = (para: number) => {
      const s = karakter();
      s.meslek = null as never;
      s.para = para;
      s.mutluluk = 80;
      s.un = 30; // şöhret erimesi (40+) karışmasın
      s.yas = 20;
      return s;
    };
    // 0-50: yalnız mutluluk −1
    const a = hazirla(-30);
    pasifEkonomiUygula(a, 1);
    expect(a.mutluluk).toBeLessThanOrEqual(79.5);
    expect(a.un).toBeCloseTo(30, 0);
    // 50-100: mutluluk −2, şöhret −1
    const b = hazirla(-80);
    const bMut = b.mutluluk;
    const bUn = b.un;
    pasifEkonomiUygula(b, 1);
    expect(bMut - b.mutluluk).toBeGreaterThanOrEqual(2);
    expect(bUn - b.un).toBeGreaterThanOrEqual(1);
    expect(bUn - b.un).toBeLessThan(3);
    // 100+: mutluluk −3, şöhret −3; faiz 100×%4 + 200×%10 = 24 (net gelir ≤ 0)
    const c = hazirla(-300);
    const cUn = c.un;
    const sonuc = pasifEkonomiUygula(c, 1);
    expect(cUn - c.un).toBeGreaterThanOrEqual(3);
    expect(sonuc.faiz).toBeGreaterThan(300 * 0.04 * 1.5); // düz %4 olsaydı ~12; aşan kısma %10 → ~24+
    // eşik altında eski düz oran: 80 × %4
    const d = hazirla(-80);
    const dFaiz = pasifEkonomiUygula(d, 1).faiz;
    expect(dFaiz).toBeGreaterThan(80 * 0.03);
    expect(dFaiz).toBeLessThan(80 * 0.08);
  });

  it("85+ yaşta tavansız yılda −10 can iner", () => {
    const s = karakter();
    s.yas = 86;
    s.saglik = 60;
    expect(yaslanmaUygula(s, 1)).toBe(10);
    expect(s.saglik).toBe(50);
  });

  it("çapraz erozyon: sağlık 10 altında ARDIŞIK 2 yıl kalırsa mutluluk −1/yıl; sağlık yükselince sayaç sıfırlanır; mutluluk sağlığı etkilemez", () => {
    const s = karakter();
    s.saglik = 9;
    s.mutluluk = 50;
    capraletkiUygula(s, 1);
    expect(s.mutluluk).toBe(50); // 1. yıl: etki yok
    expect(s.saglik_kritik_yil_sayaci).toBe(1);
    capraletkiUygula(s, 1);
    expect(s.mutluluk).toBe(49); // 2. yıl: −1
    capraletkiUygula(s, 1);
    expect(s.mutluluk).toBe(48);
    s.saglik = 10; // eşiğin üstü (< 10 değil)
    capraletkiUygula(s, 1);
    expect(s.saglik_kritik_yil_sayaci).toBe(0);
    expect(s.mutluluk).toBe(48);
    // eski kural: sağlık 25 / mutluluk 5 artık hiçbir şey yapmaz
    const t = karakter();
    t.saglik = 25;
    t.mutluluk = 5;
    capraletkiUygula(t, 3);
    expect(t.saglik).toBe(25);
    expect(t.mutluluk).toBe(5);
    // çok yıllı tur: yıl yıl sayılır
    const u = karakter();
    u.saglik = 5;
    u.mutluluk = 50;
    capraletkiUygula(u, 3); // yıl1 sayaç1, yıl2 −1, yıl3 −1
    expect(u.mutluluk).toBe(48);
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

describe("etken günlüğü (son seçimlerin etkisi)", () => {
  it("etkenGunluguNotEt yalnız belirgin değişimleri yazar ve 40 kayıtla sınırlar", () => {
    const s = karakter();
    etkenGunluguNotEt(s, "Pazar Kavgası", { mesaj: "x", saglik: -8, para: 0.4, ahlak: -3, suc_degisim: 12 });
    expect(s.etken_gunlugu.map((k) => k.stat).sort()).toEqual(["ahlak", "aranma", "saglik"]);
    for (let i = 0; i < 60; i++) etkenGunluguNotEt(s, `Olay ${i}`, { mesaj: "x", mutluluk: 2 });
    expect(s.etken_gunlugu.length).toBe(40);
  });

  it("gostergeDetayiUret ilgili göstergenin geçmişini en yeni üstte, en fazla 6 satır verir", () => {
    const s = karakter();
    for (let i = 0; i < 8; i++) etkenGunluguNotEt(s, `Olay ${i}`, { mesaj: "x", saglik: -2 });
    etkenGunluguNotEt(s, "Rüşvet", { mesaj: "x", suc_degisim: -25 });
    const sag = gostergeDetayiUret(s, "saglik");
    expect(sag.gecmis.length).toBe(6);
    expect(sag.gecmis[0].kaynak).toBe("Olay 7");
    const ar = gostergeDetayiUret(s, "aranma");
    expect(ar.gecmis).toEqual([{ yil: s.yil, kaynak: "Rüşvet", delta: -25 }]);
    expect(gostergeDetayiUret(s, "para").gecmis).toEqual([]);
  });
});
