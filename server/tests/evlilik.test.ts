import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, evlilikAdaylariGetir, evlilikTeklifEt } from "../src/game/gameEngine";

describe("olay dışı evlenme (evlilik-adaylari / evlilik-teklifi)", () => {
  it("evlilikAdaylariGetir: reşit ve bekar bir karaktere 2 aday döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
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

  it("18 yaş altına adaylar/teklif reddedilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 16;
    await expect(evlilikAdaylariGetir(state.id)).rejects.toThrow();
  });

  it("zaten evliyken adaylar/teklif reddedilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    state.etiketler.push("medeni:evli");
    await expect(evlilikAdaylariGetir(state.id)).rejects.toThrow();
  });

  it("evlilikTeklifEt: yüksek uyumlu bir aday çoğunlukla kabul eder ve state'i günceller", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
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
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 25;
    await expect(evlilikTeklifEt(state.id, {} as never)).rejects.toThrow();
  });
});
