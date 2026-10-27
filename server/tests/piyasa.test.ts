import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { musteriDagilimi, piyasaYillikUygula, piyasaCarpani, rakipYenildiKontrol } from "../src/game/piyasa";
import { RAKIP_HAMLELERI, KUCUK_OLAYLARI } from "../src/data/piyasaHamleleri";
import { pazarPayiHesapla } from "../src/data/pazar";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function kur(meslek = "Tüccar"): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(s, meslek);
  return s;
}

function tamam(s: CharacterState) {
  const d = musteriDagilimi(s);
  expect(d.oyuncu + d.rakip + d.kucuk).toBeCloseTo(d.toplam, 2);
  expect(d.oyuncu).toBeGreaterThanOrEqual(0);
  expect(d.kucuk).toBeGreaterThanOrEqual(d.toplam * 0.03 - 1);
}

describe("piyasa akışı (rakip + küçük esnaf hareketleri, haberler)", () => {
  it("hamle tablosunda her etkinin iki dilli metni ve makul yüzdesi var", () => {
    for (const h of RAKIP_HAMLELERI) {
      expect(h.metin.tr.length).toBeGreaterThan(5);
      expect(h.metin.en.length).toBeGreaterThan(5);
      expect(h.yuzde[0]).toBeGreaterThan(0);
      expect(h.yuzde[1]).toBeLessThanOrEqual(0.06);
      expect(h.metin.tr.includes("{rakip}") || h.etki?.tur === "talep").toBe(true);
    }
    for (const o of KUCUK_OLAYLARI) {
      expect(o.metin.tr.length).toBeGreaterThan(5);
      expect(o.metin.en.length).toBeGreaterThan(5);
      expect(Math.abs(o.yuzde[0])).toBeGreaterThan(0);
    }
    const kimlikler = new Set(RAKIP_HAMLELERI.map((h) => h.id));
    expect(kimlikler.size).toBe(RAKIP_HAMLELERI.length);
  });

  it("yıllık akış sonunda toplam daima P ve haber/fotoğraf alanları dolar", () => {
    const s = kur();
    for (let i = 0; i < 30; i++) {
      s.yil += 1;
      piyasaYillikUygula(s, 1);
      tamam(s);
    }
    expect(s.musteri_ref).not.toBeNull();
    expect(s.son_musteri_degisim).not.toBeNull();
    expect(s.piyasa_gunlugu.length).toBeLessThanOrEqual(6);
  });

  it("rakip hamlesi: zorlanınca haber üretir (iki dilli, rakip adıyla) ve cooldown'a uyar", () => {
    const s = kur();
    // Rakip hamlesi şansı 0.3: random hep 0.0 → hamle her yıl denenir; cooldown 2 yıl olduğundan 3 yılda en fazla 2 hamle.
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    const adet = () => s.piyasa_gunlugu.filter((h) => h.grup === "rakip").length;
    s.yil = 2000;
    piyasaYillikUygula(s, 1);
    expect(adet()).toBeGreaterThanOrEqual(1);
    const ilk = s.piyasa_gunlugu.find((h) => h.grup === "rakip")!;
    expect(s.rakipler.some((r) => ilk.metin.tr.includes(r.ad))).toBe(true);
    expect(ilk.metin.en.length).toBeGreaterThan(5);
    const once = adet();
    // v26: hamleler arası 1–2 yıl. 1 yıl sonra zar %50 — yüksek zarda hamle yok; 2. yılda kesin hamle var.
    (Math.random as unknown as ReturnType<typeof vi.fn>).mockReturnValue(0.9);
    const toplam = () => s.piyasa_gunlugu.length;
    const t0 = toplam();
    s.yil = 2001;
    piyasaYillikUygula(s, 1);
    expect(s.piyasa_gunlugu.filter((h) => h.yil === 2001 && h.kod !== "rakip_yenildi" && h.kod !== "yeni_rakip")).toHaveLength(0);
    expect(toplam()).toBe(t0);
    s.yil = 2002;
    piyasaYillikUygula(s, 1);
    expect(s.piyasa_gunlugu.some((h) => h.yil === 2002)).toBe(true);
    expect(adet()).toBeGreaterThanOrEqual(once);
  });

  it("saldırgan hamleler (fiyat kırdı, ürün satmaya başladı) hedeflidir: oyuncunun müşterisinin %'si", () => {
    for (const id of ["fiyat_kirdi", "urun_satmaya_basladi"]) {
      const h = RAKIP_HAMLELERI.find((x) => x.id === id)!;
      expect(h.hedef).toBe("oyuncu");
      expect(h.yon).toBe("buyur");
    }
    expect(RAKIP_HAMLELERI.find((x) => x.id === "urun_satmaya_basladi")!.urunlu).toBe(true);
  });

  it("ortalamaya dönüş: 10.000 yıllık rastgele yürüyüşte gruplar sınırlarda kalır", () => {
    const s = kur();
    s.etiketler = [];
    let rakipTop = 0;
    let rakipMin = 1;
    let rakipMax = 0;
    for (let i = 0; i < 10000; i++) {
      s.yil += 1;
      piyasaYillikUygula(s, 1);
      const d = musteriDagilimi(s);
      const rp = d.rakip / d.toplam;
      rakipTop += rp;
      rakipMin = Math.min(rakipMin, rp);
      rakipMax = Math.max(rakipMax, rp);
      expect(d.kucuk).toBeGreaterThanOrEqual(d.toplam * 0.03 - 1);
      expect(rp).toBeLessThanOrEqual(0.96);
      // Yenilen rakipten sonra yeni rakip gelebilir; oyuncu hiç patlamaz.
      expect(d.oyuncu / d.toplam).toBeLessThanOrEqual(0.71);
    }
    // Rakip payı ortalaması makul bir bantta kalır (yenildi dönemleri 0 sayılır).
    expect(rakipTop / 10000).toBeGreaterThan(0.12);
    expect(rakipTop / 10000).toBeLessThan(0.92);
    expect(rakipMax).toBeLessThanOrEqual(0.96);
  });

  it("süreli piyasa etkileri çarpana biner ve süresi dolunca temizlenir", () => {
    const s = kur();
    s.yil = 2000;
    s.piyasa_etkileri = [
      { tur: "alis_maliyeti", deger: 0.04, bitis: 2002 },
      { tur: "talep", deger: -0.05, bitis: 2001 },
    ];
    expect(piyasaCarpani(s, "alis_maliyeti")).toBeCloseTo(1.04, 5);
    expect(piyasaCarpani(s, "talep")).toBeCloseTo(0.95, 5);
    s.yil = 2002;
    piyasaYillikUygula(s, 1);
    // Yıl içinde yeni bir hamle yeni etki ekleyebilir; ama eskilerin hiçbiri (bitişi ≤ bugün) kalmaz.
    expect(s.piyasa_etkileri.every((e) => e.bitis > 2002)).toBe(true);
  });

  it("rakip yenildi kontrolü: %4 eşiği; kalan müşterinin yarısı oyuncuya geçer", () => {
    const s = kur();
    const oncekiOyuncu = s.meslek_musteri;
    s.rakipler[0].musteri = s.pazar_musteri * 0.03;
    const kalan = s.rakipler[0].musteri;
    expect(rakipYenildiKontrol(s)).toBe(true);
    expect(s.rakipler[0].yenildi).toBe(true);
    expect(s.rakipler[1].yenildi).toBe(false);
    expect(s.meslek_musteri).toBeGreaterThan(oncekiOyuncu + kalan * 0.49);
    expect(s.piyasa_gunlugu[0].kod).toBe("rakip_yenildi");
  });

  it("Asker/Din Adamı da aynı modeli kullanır (pay müşteriden)", () => {
    const s = kur("Din Adamı");
    expect(pazarPayiHesapla(s)).toBeCloseTo(s.meslek_musteri / s.pazar_musteri, 6);
    for (let i = 0; i < 20; i++) {
      s.yil += 1;
      piyasaYillikUygula(s, 1);
    }
    tamam(s);
  });
});
