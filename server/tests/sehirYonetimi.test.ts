import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import {
  createCharacter,
  mesleğiSec,
  hesaplaMaasYillik,
  sehirYonetimUnvanGetir,
  sehirYonetimMaasCarpani,
} from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";

describe("şehir yönetimi (en üst rütbe sonrası sonsuz ilerleme)", () => {
  it("en üst rütbeye ulaşmamış karaktere başlangıç olayı hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Asker");
    state.rutbe_seviye = 2;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sehir_yonetim_asker_baslangic");
    }
  });

  it("en üst rütbeye (3) ulaşan her meslek için başlangıç olayı uygun hale gelir", () => {
    const beklenenler: Record<string, string> = {
      Asker: "sehir_yonetim_asker_baslangic",
      Tüccar: "sehir_yonetim_tuccar_baslangic",
      "Din Adamı": "sehir_yonetim_dinadami_baslangic",
    };
    for (const [meslek, beklenenId] of Object.entries(beklenenler)) {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, meslek);
      state.rutbe_seviye = 3;
      let bulundu = false;
      for (let i = 0; i < 500 && !bulundu; i++) {
        const { olay } = olaySec(state);
        if (olay.id === beklenenId) bulundu = true;
      }
      expect(bulundu).toBe(true);
    }
  });

  it("senaryoUret: en üst rütbeye ulaşan karaktere başlangıç olayı şansa bırakılmadan ilk turda zorla sunulur", async () => {
    const beklenenler: Record<string, string> = {
      Asker: "sehir_yonetim_asker_baslangic",
      Tüccar: "sehir_yonetim_tuccar_baslangic",
      "Din Adamı": "sehir_yonetim_dinadami_baslangic",
    };
    for (const [meslek, beklenenId] of Object.entries(beklenenler)) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
      await mesleğiAta(state.id, meslek);
      state.hayat_amaci = { id: "x", ad: "x", aciklama: "x", hedefTuru: "para", hedefDeger: 999999, tamamlandi: false };
      state.gecmis_olaylar.push("hayat_amaci_secimi", "iliski_evlilik_teklifi", "iliski_ikinci_teklif");
      state.ulke.savasta = true;
      state.rutbe_seviye = 3;
      const senaryo = await senaryoUret(state.id);
      expect(senaryo.olay_basligi).toBe(
        beklenenId === "sehir_yonetim_asker_baslangic"
          ? "Ordunun Üstünde Bir Güç"
          : beklenenId === "sehir_yonetim_tuccar_baslangic"
            ? "Loncanın Ötesinde"
            : "Kürsünün Ötesinde"
      );
    }
  });

  it("sehir_yonetimi_basladi etiketi yokken tekrar eden rekabet olayları hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.rutbe_seviye = 3;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sehir_yonetim_tuccar_ticaret_yollari");
      expect(olay.id).not.toBe("sehir_yonetim_tuccar_vergi_imtiyazi");
    }
  });

  it("sehirYonetimUnvanGetir dört isimli kademeden sonra sayısal olarak sonsuza büyür", () => {
    expect(sehirYonetimUnvanGetir("Asker", 0)).toBeNull();
    expect(sehirYonetimUnvanGetir("Asker", 1)).toBe("Bölge Komutanı");
    expect(sehirYonetimUnvanGetir("Asker", 4)).toBe("Krallığın Kalkanı");
    expect(sehirYonetimUnvanGetir("Asker", 7)).toBe("Krallığın Kalkanı (Seviye 7)");
    expect(sehirYonetimUnvanGetir("Asker", 50)).toBe("Krallığın Kalkanı (Seviye 50)");
  });

  it("şehir yönetim seviyesi arttıkça maaş kalıcı ve sınırsız olarak büyümeye devam eder", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.rutbe_seviye = 3;
    const taban = hesaplaMaasYillik(state);
    state.sehir_yonetim_seviyesi = 5;
    const besSeviye = hesaplaMaasYillik(state);
    state.sehir_yonetim_seviyesi = 20;
    const yirmiSeviye = hesaplaMaasYillik(state);
    expect(besSeviye).toBeGreaterThan(taban);
    expect(yirmiSeviye).toBeGreaterThan(besSeviye);
  });

  it("sehirYonetimMaasCarpani her kademede %8 kalıcı artış sağlar, üst sınırı yok", () => {
    expect(sehirYonetimMaasCarpani(0)).toBeCloseTo(1);
    expect(sehirYonetimMaasCarpani(10)).toBeCloseTo(1.8);
    expect(sehirYonetimMaasCarpani(100)).toBeCloseTo(9);
  });
});
