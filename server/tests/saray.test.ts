import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";

describe("saray sistemi", () => {
  it("sarayda değilken saray-içi olaylar hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("saray_ic_entrika");
      expect(olay.id).not.toBe("saray_balosu");
    }
  });

  it("sarayda etiketi varken saray-içi olaylar uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["sarayda"]);
    let bulundu = false;
    for (let i = 0; i < 500 && !bulundu; i++) {
      const { olay } = olaySec(state);
      if (olay.id === "saray_ic_entrika") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });

  it("un ve ahlak 70'in üstündeyse kral daveti olayı ilk turda zorla sunulur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.hayat_amaci = { id: "x", ad: "x", aciklama: "x", hedefTuru: "para", hedefDeger: 999999, tamamlandi: false };
    state.gecmis_olaylar.push("hayat_amaci_secimi", "iliski_evlilik_teklifi", "iliski_ikinci_teklif");
    state.ulke.savasta = true;
    state.un = 75;
    state.ahlak = 75;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Kraldan Bir Davet");
  });

  it("un veya ahlak 70'in altındaysa kral daveti hiç zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.hayat_amaci = { id: "x", ad: "x", aciklama: "x", hedefTuru: "para", hedefDeger: 999999, tamamlandi: false };
    state.gecmis_olaylar.push("hayat_amaci_secimi", "iliski_evlilik_teklifi", "iliski_ikinci_teklif");
    state.ulke.savasta = true;
    state.un = 40;
    state.ahlak = 90;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe("Kraldan Bir Davet");
  });

  it("saraya girme denemesinde her zaman en az bir kilitsiz seçenek vardır (para yetersizken bile)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.para = 0;
    state.un = 0;
    const { senaryo } = olaySec(state, "saray_girme_denemesi");
    expect(senaryo.secenekler.some((s) => !s.kilitli)).toBe(true);
  });

  it("saray içi olayların tam listesi OLAY_BANKASI'nda gerekliEtiketler:['sarayda'] ile tanımlı", () => {
    const beklenenler = ["saray_ic_entrika", "saray_balosu", "saray_dedikodu", "saray_av_daveti", "saray_suikast_duyumu", "saray_mutfak_kazasi"];
    for (const id of beklenenler) {
      const tanim = OLAY_BANKASI.find((o) => o.id === id);
      expect(tanim).toBeDefined();
      expect(tanim?.gerekliEtiketler).toContain("sarayda");
    }
  });
});
