import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, hesaplaSkor, krizEtkisiUygula } from "../src/game/stateManager";
import { amaclariHerhangiKontrol } from "../src/data/hayatAmaclari";
import { skorKaydet } from "../src/db/scoreRepository";

describe("hayat amaçları (3'lü sistem)", () => {
  it("meslek seçilince 2 normal + 1 zor amaç atanır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    expect(state.hayat_amaclari).toHaveLength(3);
    expect(state.hayat_amaclari.filter((a) => a.zorluk === "normal")).toHaveLength(2);
    expect(state.hayat_amaclari.filter((a) => a.zorluk === "zor")).toHaveLength(1);
    expect(state.hayat_amaclari.every((a) => !a.tamamlandi)).toBe(true);
  });

  it("koşul sağlanınca 'herhangi' amaç kalıcı kilitlenir; tekrar kontrol idempotenttir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    // Test için bilinen bir amacı zorla ekle.
    state.hayat_amaclari = [
      { id: "taninan_yuz", zorluk: "normal", bonus: 1.5, kontrolAni: "herhangi", tamamlandi: false },
    ];
    state.un = 60;
    expect(amaclariHerhangiKontrol(state, state.para)).toHaveLength(0);
    expect(state.hayat_amaclari[0].tamamlandi).toBe(false);

    state.un = 80;
    const yeni = amaclariHerhangiKontrol(state, state.para);
    expect(yeni.map((a) => a.id)).toEqual(["taninan_yuz"]);
    expect(state.hayat_amaclari[0].tamamlandi).toBe(true);
    expect(state.hayat_amaclari[0].tamamlanmaYili).toBe(state.yil);

    // idempotent: ikinci kontrol tekrar döndürmez
    state.un = 40; // eşiğin altına düşse bile kilitli kalır
    expect(amaclariHerhangiKontrol(state, state.para)).toHaveLength(0);
    expect(state.hayat_amaclari[0].tamamlandi).toBe(true);
  });

  it("skor çarpanı = max(1, Σ tamamlanan bonuslar) — 2 normal + 1 zor = ×5", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 40;
    state.un = 50;
    state.para = 100;
    state.hayat_amaclari = [
      { id: "a", zorluk: "normal", bonus: 1.5, kontrolAni: "herhangi", tamamlandi: false },
      { id: "b", zorluk: "normal", bonus: 1.5, kontrolAni: "herhangi", tamamlandi: false },
      { id: "c", zorluk: "zor", bonus: 2, kontrolAni: "herhangi", tamamlandi: false },
    ];

    const tabanSkor = hesaplaSkor(state);
    state.hayat_amaclari.forEach((a) => (a.tamamlandi = true));
    const carpanliSkor = hesaplaSkor(state);
    expect(Math.abs(carpanliSkor - tabanSkor * 5)).toBeLessThanOrEqual(5);

    // sadece 1 normal → ×1.5
    state.hayat_amaclari.forEach((a, i) => (a.tamamlandi = i === 0));
    expect(Math.abs(hesaplaSkor(state) - tabanSkor * 1.5)).toBeLessThanOrEqual(5);
  });
});

describe("global kriz/altın çağ", () => {
  it("kıtlık krizi sağlığı düşürmez (v11)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 80;
    state.ulke.kriz = { tur: "kitlik", bitisYili: state.yil + 10 };
    krizEtkisiUygula(state, 3);
    expect(state.saglik).toBe(80); // v11: KRIZ_ETKI.kitlik sağlık götürmez
  });

  it("altın çağ her yıl para/mutluluk artırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 50;
    state.mutluluk = 60;
    state.ulke.kriz = { tur: "altin_cag", bitisYili: state.yil + 10 };
    krizEtkisiUygula(state, 2);
    expect(state.para).toBe(50 + 4 * 2);
    expect(state.mutluluk).toBe(60 + 1 * 2);
  });

  it("bitiş yılına ulaşınca kriz temizlenir ve bitiş mesajı döner", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.ulke.kriz = { tur: "isyan", bitisYili: state.yil };
    const mesaj = krizEtkisiUygula(state, 1);
    expect(state.ulke.kriz).toBeNull();
    expect(mesaj).toContain("bastırıldı");
  });

  it("kriz yokken hiçbir şey yapmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const oncekiSaglik = state.saglik;
    const mesaj = krizEtkisiUygula(state, 5);
    expect(state.saglik).toBe(oncekiSaglik);
    expect(mesaj).toBeNull();
  });
});

describe("başarım kaydı (skorRepository)", () => {
  it("skorKaydet unvanlar/efsanevi_olum/hayat_amaci_tamamlandi alanlarını doğru saklar", async () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.unvanlar = ["İpek Kralı", "Cesur Yürek"];
    state.efsanevi_olum = "Kendi Kazdığı Kuyuya Düşen";
    state.hayat_amaci = {
      id: "en_zengin",
      ad: "Şehrin En Zengini Olmak",
      aciklama: "300 para",
      hedefTuru: "para",
      hedefDeger: 300,
      tamamlandi: true,
    };
    state.aktif = false;
    state.olum_nedeni = "Test";

    const kayit = await skorKaydet(state, "TestOyuncu");
    expect(kayit.unvanlar).toBe("İpek Kralı, Cesur Yürek");
    expect(kayit.efsanevi_olum).toBe("Kendi Kazdığı Kuyuya Düşen");
    expect(kayit.hayat_amaci_tamamlandi).toBe(true);
  });

  it("ünvan/efsanevi ölüm yokken boş string olarak kaydedilir", async () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.aktif = false;
    state.olum_nedeni = "Test";

    const kayit = await skorKaydet(state, "TestOyuncu2");
    expect(kayit.unvanlar).toBe("");
    expect(kayit.efsanevi_olum).toBe("");
    expect(kayit.hayat_amaci_tamamlandi).toBe(false);
  });
});
