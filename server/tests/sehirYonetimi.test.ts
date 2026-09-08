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

  it("en üst rütbeye (4) ulaşan her meslek için başlangıç olayı uygun hale gelir", () => {
    const beklenenler: Record<string, string> = {
      Asker: "sehir_yonetim_asker_baslangic",
      Tüccar: "sehir_yonetim_tuccar_baslangic",
      "Din Adamı": "sehir_yonetim_dinadami_baslangic",
    };
    for (const [meslek, beklenenId] of Object.entries(beklenenler)) {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, meslek);
      state.rutbe_seviye = 4;
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
      state.rutbe_seviye = 4;
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
    state.rutbe_seviye = 4;
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

  it("şehir yönetimine girmek maaşa kalıcı SABİT +%8 katar; seviyeyle ölçeklenmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.rutbe_seviye = 4;
    const taban = hesaplaMaasYillik(state);
    state.sehir_yonetim_seviyesi = 1;
    const birSeviye = hesaplaMaasYillik(state);
    state.sehir_yonetim_seviyesi = 20;
    const yirmiSeviye = hesaplaMaasYillik(state);
    expect(birSeviye).toBeGreaterThan(taban);
    expect(yirmiSeviye).toBe(birSeviye); // daha yüksek seviye maaşa ek katkı sağlamaz
  });

  it("sehirYonetimMaasCarpani girilmişse 1.03, girilmemişse 1.0 döner", () => {
    expect(sehirYonetimMaasCarpani(0)).toBeCloseTo(1);
    expect(sehirYonetimMaasCarpani(1)).toBeCloseTo(1.03);
    expect(sehirYonetimMaasCarpani(10)).toBeCloseTo(1.03);
    expect(sehirYonetimMaasCarpani(100)).toBeCloseTo(1.03);
  });
});
