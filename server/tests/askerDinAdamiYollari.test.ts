import { describe, it, expect } from "vitest";
import { ogretileriTamamla } from "./_ogreti";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";

function yolaKilitle(state: ReturnType<typeof createCharacter>, yolEtiketi: string, kilitEtiketi: string) {
  state.etiketler.push(yolEtiketi, kilitEtiketi);
}

describe("Orta Çağ Asker kariyer yolları — karşılıklı dışlama", () => {
  it("Sadık yoluna kilitlenen asker, diğer 4 yolun olaylarını hiç görmez ve kendi yolunu görür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    yolaKilitle(state, "yol:asker:sadik", "asker_yolu_secildi");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 1000; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.includes("yol:asker:isyanci")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:kahraman")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:firari")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:hain")).not.toBe(true);
      if (olay.gerekliEtiketler?.includes("yol:asker:sadik")) kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("Kahraman yoluna kilitlenen asker, diğer 4 yolun olaylarını hiç görmez ve kendi yolunu görür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    state.rutbe_seviye = 3;
    mesleğiSec(state, "Asker");
    yolaKilitle(state, "yol:asker:kahraman", "asker_yolu_secildi");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 1000; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.includes("yol:asker:sadik")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:isyanci")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:firari")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:asker:hain")).not.toBe(true);
      if (olay.gerekliEtiketler?.includes("yol:asker:kahraman")) kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("hiçbir yola girmemiş asker hiçbir yol-özel olayı görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.some((e) => e.startsWith("yol:asker:"))).not.toBe(true);
    }
  });
});

describe("Orta Çağ Din Adamı kariyer yolları — karşılıklı dışlama", () => {
  it("Tarikat yoluna kilitlenen din adamı, diğer 3 yolun olaylarını hiç görmez ve kendi yolunu görür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Din Adamı");
    yolaKilitle(state, "yol:din:tarikat", "din_yolu_secildi");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 1000; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.includes("yol:din:durust")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:din:yozlasmis")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:din:fanatik")).not.toBe(true);
      if (olay.gerekliEtiketler?.includes("yol:din:tarikat")) kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("Dürüst yoluna kilitlenen din adamı, diğer 3 yolun olaylarını hiç görmez ve kendi yolunu görür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Din Adamı");
    yolaKilitle(state, "yol:din:durust", "din_yolu_secildi");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 1000; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.includes("yol:din:yozlasmis")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:din:fanatik")).not.toBe(true);
      expect(olay.gerekliEtiketler?.includes("yol:din:tarikat")).not.toBe(true);
      if (olay.gerekliEtiketler?.includes("yol:din:durust")) kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("hiçbir yola girmemiş din adamı hiçbir yol-özel olayı görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Din Adamı");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.gerekliEtiketler?.some((e) => e.startsWith("yol:din:"))).not.toBe(true);
    }
  });
});

describe("kariyer yolu giriş zinciri garantisi (senaryoUret)", () => {
  it("18 yaşındaki yeni bir Orta Çağ askeri, henüz yol seçmemişse 'İlk Emir' ile karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 18;
    state.ulke.savasta = true; // dünya_savas_ilani garantisini devre dışı bırak
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("İlk Emir");
  });

  it("18 yaşındaki yeni bir Orta Çağ din adamı, henüz yol seçmemişse 'İlk Sınav' ile karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Din Adamı");
    state.yas = 18;
    state.ulke.savasta = true;
    ogretileriTamamla(state);
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("İlk Sınav");
  });

  it("zaten bir yola kilitlenmiş asker 'İlk Emir' ile bir daha karşılaşmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 18;
    state.ulke.savasta = true;
    state.etiketler.push("yol:asker:sadik", "asker_yolu_secildi");
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe("İlk Emir");
  });

  it("İlk Emir'de bir seçenek seçildiğinde eğilime özel ikinci olay zorunlu olarak gelir ve yol kilitlenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.yas = 18;
    state.saglik = 100; // rastgele ölüm ihtimalini en aza indirir, testi kırılganlıktan korur
    state.ulke.savasta = true;
    const ilkSenaryo = await senaryoUret(state.id);
    expect(ilkSenaryo.olay_basligi).toBe("İlk Emir");

    // 0: itaat et -> sadik eğilimi -> "Sadakat Sınavı"
    const sonuc1 = await secimUygula(state.id, 0);
    if (!("state" in sonuc1)) throw new Error("beklenmeyen ara-tepki");
    expect(sonuc1.state.etiketler).toContain("asker_yol_egilim:sadik");

    const ikinciSenaryo = await senaryoUret(state.id);
    expect(ikinciSenaryo.olay_basligi).toBe("Sadakat Sınavı");

    const sonuc2 = await secimUygula(state.id, 0);
    if (!("state" in sonuc2)) throw new Error("beklenmeyen ara-tepki");
    expect(sonuc2.state.etiketler).toContain("yol:asker:sadik");
    expect(sonuc2.state.etiketler).toContain("asker_yolu_secildi");
    expect(sonuc2.state.etiketler).not.toContain("asker_yol_egilim:sadik");
  });
});

describe("Asker savaş/Haçlı Seferi otomatik katılım (reddetme seçeneği yok)", () => {
  it("dunya_savas_ilani Asker'e hiç çıkmaz, sadece Tüccar/Din Adamı'na çıkar", () => {
    const olay = OLAY_BANKASI.find((o) => o.id === "dunya_savas_ilani");
    expect(olay).toBeDefined();
    expect(olay!.meslekler).toEqual(["Tüccar", "Din Adamı"]);
  });

  it("dunya_savas_ilani_asker sadece Asker'e özeldir ve reddetme/kaçma seçeneği yoktur", () => {
    const olay = OLAY_BANKASI.find((o) => o.id === "dunya_savas_ilani_asker");
    expect(olay).toBeDefined();
    expect(olay!.meslekler).toEqual(["Asker"]);
    for (const secenek of olay!.secenekler) {
      expect(secenek.metin.toLowerCase()).not.toContain("kaç");
      expect(secenek.metin.toLowerCase()).not.toContain("reddet");
    }
  });

  it("oc_hacli_sefer_karari Asker'e hiç çıkmaz, sadece Tüccar/Din Adamı'na çıkar", () => {
    const olay = OLAY_BANKASI.find((o) => o.id === "oc_hacli_sefer_karari");
    expect(olay).toBeDefined();
    expect(olay!.meslekler).toEqual(["Tüccar", "Din Adamı"]);
  });

  it("oc_hacli_sefer_asker_cagrisi sadece Asker'e özeldir ve reddetme seçeneği yoktur", () => {
    const olay = OLAY_BANKASI.find((o) => o.id === "oc_hacli_sefer_asker_cagrisi");
    expect(olay).toBeDefined();
    expect(olay!.meslekler).toEqual(["Asker"]);
    expect(olay!.secenekler.length).toBe(2);
    for (const secenek of olay!.secenekler) {
      expect(secenek.metin.toLowerCase()).not.toContain("reddet");
    }
  });

  it("yolculuk_savunma_teklif artık reddetme seçeneği içermez (sadece rota seçimi)", () => {
    const olay = OLAY_BANKASI.find((o) => o.id === "yolculuk_savunma_teklif");
    expect(olay).toBeDefined();
    expect(olay!.secenekler.length).toBe(2);
    for (const secenek of olay!.secenekler) {
      expect(secenek.metin.toLowerCase()).not.toContain("reddet");
    }
  });
});
