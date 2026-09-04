import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, hesaplaSkor, hayatAmaciKontrolEt, krizEtkisiUygula } from "../src/game/stateManager";
import { skorKaydet } from "../src/db/scoreRepository";

describe("hayat amacı", () => {
  it("hedefe ulaşınca tamamlandi=true olur ve hayat hikayesine eklenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.hayat_amaci = {
      id: "en_zengin",
      ad: "Şehrin En Zengini Olmak",
      aciklama: "300 para",
      hedefTuru: "para",
      hedefDeger: 300,
      tamamlandi: false,
    };
    state.para = 250;
    hayatAmaciKontrolEt(state);
    expect(state.hayat_amaci.tamamlandi).toBe(false);

    state.para = 300;
    hayatAmaciKontrolEt(state);
    expect(state.hayat_amaci.tamamlandi).toBe(true);
    expect(state.hayat_hikayesi.some((h) => h.baslik.includes("Hayat amacını tamamladı"))).toBe(true);
  });

  it("tamamlanmış bir hayat amacı tekrar kontrol edilince değişmez (idempotent)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.hayat_amaci = {
      id: "efsanevi_un",
      ad: "Efsanevi Bir Ün Kazanmak",
      aciklama: "90 ün",
      hedefTuru: "un",
      hedefDeger: 90,
      tamamlandi: true,
    };
    const oncekiHikayeUzunlugu = state.hayat_hikayesi.length;
    state.un = 95;
    hayatAmaciKontrolEt(state);
    expect(state.hayat_hikayesi.length).toBe(oncekiHikayeUzunlugu);
  });

  it("hesaplaSkor tamamlanmış hayat amacında skoru 5 katına çıkarır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 40;
    state.un = 50;
    state.para = 100;

    const tabanSkor = hesaplaSkor(state);
    state.hayat_amaci = {
      id: "buyuk_aile",
      ad: "Büyük Bir Aile Kurmak",
      aciklama: "3 çocuk",
      hedefTuru: "cocuk",
      hedefDeger: 3,
      tamamlandi: true,
    };
    const carpanliSkor = hesaplaSkor(state);
    // hesaplaSkor iç yuvarlama yapıyor (round(taban) vs round(taban*5)) — birkaç
    // puanlık yuvarlama farkı normal; asıl kontrol ×5 çarpanının uygulandığı.
    expect(Math.abs(carpanliSkor - tabanSkor * 5)).toBeLessThanOrEqual(5);
  });
});

describe("global kriz/altın çağ", () => {
  it("kıtlık her yıl sağlığı düşürür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.saglik = 80;
    state.ulke.kriz = { tur: "kitlik", bitisYili: state.yil + 10 };
    krizEtkisiUygula(state, 3);
    expect(state.saglik).toBe(80 - 1 * 3); // KRIZ_ETKI.kitlik.saglik = -1/yıl
  });

  it("altın çağ her yıl para/mutluluk artırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.para = 50;
    state.mutluluk = 60;
    state.ulke.kriz = { tur: "altin_cag", bitisYili: state.yil + 10 };
    krizEtkisiUygula(state, 2);
    expect(state.para).toBe(50 + 4 * 2);
    expect(state.mutluluk).toBe(60 + 1 * 2);
  });

  it("bitiş yılına ulaşınca kriz temizlenir ve bitiş mesajı döner", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ulke.kriz = { tur: "isyan", bitisYili: state.yil };
    const mesaj = krizEtkisiUygula(state, 1);
    expect(state.ulke.kriz).toBeNull();
    expect(mesaj).toContain("bastırıldı");
  });

  it("kriz yokken hiçbir şey yapmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    const oncekiSaglik = state.saglik;
    const mesaj = krizEtkisiUygula(state, 5);
    expect(state.saglik).toBe(oncekiSaglik);
    expect(mesaj).toBeNull();
  });
});

describe("başarım kaydı (skorRepository)", () => {
  it("skorKaydet unvanlar/efsanevi_olum/hayat_amaci_tamamlandi alanlarını doğru saklar", async () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
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
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.aktif = false;
    state.olum_nedeni = "Test";

    const kayit = await skorKaydet(state, "TestOyuncu2");
    expect(kayit.unvanlar).toBe("");
    expect(kayit.efsanevi_olum).toBe("");
    expect(kayit.hayat_amaci_tamamlandi).toBe(false);
  });
});
