import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, evlilikAdaylariGetir, evlilikTeklifEt } from "../src/game/gameEngine";

// Oyuncu karakteri erkek → eş ve tüm evlilik adayları kadın isim havuzundan gelmeli.
const FRANSA_KADIN_ISIMLERI = new Set([
  "Isabeau", "Marguerite", "Blanche", "Aliénor", "Adèle", "Mahaut",
  "Béatrice", "Jeanne", "Sibylle", "Agnès", "Ermengarde", "Constance",
]);

describe("olay dışı evlenme (evlilik-adaylari / evlilik-teklifi)", () => {
  it("evlilikAdaylariGetir: reşit ve bekar bir karaktere 2 aday döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 20;
    const adaylar = await evlilikAdaylariGetir(state.id);
    expect(adaylar).toHaveLength(2);
    for (const aday of adaylar) {
      expect(typeof aday.isim).toBe("string");
      expect(aday.kisilik).toHaveLength(2);
      expect(aday.uyumYuzdesi).toBeGreaterThanOrEqual(0);
      expect(aday.uyumYuzdesi).toBeLessThanOrEqual(100);
    }
  });

  it("tüm evlilik adayları kadın isim havuzundan gelir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 24;
    for (let i = 0; i < 25; i++) {
      const adaylar = await evlilikAdaylariGetir(state.id);
      for (const aday of adaylar) {
        expect(FRANSA_KADIN_ISIMLERI.has(aday.isim)).toBe(true);
      }
    }
  });

  it("teklif kabul edilince atanan eş adı kadın isim havuzundan olur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 30;
    state.mutluluk = 90;
    state.un = 90;
    let evlendi = false;
    for (let i = 0; i < 40 && !evlendi; i++) {
      const [aday] = await evlilikAdaylariGetir(state.id);
      const sonuc = await evlilikTeklifEt(state.id, { ...aday, uyumYuzdesi: 95 });
      if (sonuc.basarili) {
        evlendi = true;
        expect(FRANSA_KADIN_ISIMLERI.has(sonuc.state.es_adi as string)).toBe(true);
      }
    }
    expect(evlendi).toBe(true);
  });

  it("18 yaş altına adaylar/teklif reddedilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 16;
    await expect(evlilikAdaylariGetir(state.id)).rejects.toThrow();
  });

  it("zaten evliyken adaylar/teklif reddedilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.etiketler.push("medeni:evli");
    await expect(evlilikAdaylariGetir(state.id)).rejects.toThrow();
  });

  it("evlilikTeklifEt: yüksek uyumlu bir aday çoğunlukla kabul eder ve state'i günceller", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.mutluluk = 90;
    state.un = 90;
    const aday = { isim: "Test Aday", meslek: "Tüccar", rutbe: "Çırak Tüccar", kisilik: ["Cesur", "Sosyal"] as [string, string], uyumYuzdesi: 95 };

    let kabulEdildi = false;
    for (let i = 0; i < 30 && !kabulEdildi; i++) {
      const sonuc = await evlilikTeklifEt(state.id, aday);
      if (sonuc.basarili) {
        kabulEdildi = true;
        expect(sonuc.state.es_adi).toBe("Test Aday");
        expect(sonuc.state.etiketler).toContain("medeni:evli");
      } else {
        expect(sonuc.state.es_adi).toBeNull();
      }
    }
    expect(kabulEdildi).toBe(true);
  });

  it("evlilikTeklifEt: geçersiz aday nesnesi hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    await expect(evlilikTeklifEt(state.id, {} as never)).rejects.toThrow();
  });
});
