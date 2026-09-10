import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle, ulkeGuncelle } from "../src/game/stateManager";
import { OLAY_BANKASI } from "../src/data/olaylar";

function idBul(baslik: string): boolean {
  return OLAY_BANKASI.some((o) => o.baslik === baslik);
}

describe("Haçlı Seferi (Orta Çağ, dallanan)", () => {
  it("Selçuklu/Eyyubiler oyuncusuna haçlı sefer kararı hiç çıkmaz (bölge kısıtı)", () => {
    const state = createCharacter("Orta Çağ", "Selçuklu", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 20;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_hacli_sefer_karari");
    }
  });

  it("hacli:katildi etiketi olmadan katılım-özel olaylar çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 20;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_hacli_kutsal_topraklar_savasi");
      expect(olay.id).not.toBe("oc_hacli_ganimet_yagma");
    }
  });

  it("hacli:katildi etiketiyle katılım-özel olaylar uygun hale gelir, katilmadi-özel olaylar hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 20;
    // yolculukta etiketi, artık kilitli yolculuk zincirinin parçası olan bu olayların
    // (yolculukOlayi:true) havuza girebilmesi için de gerekli — bkz. olaySecici.ts uygunMu().
    etiketEkle(state, ["hacli:katildi", "hacli_karari_verildi", "yolculukta"]);
    let bulundu = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_hacli_geride_kalanlar");
      expect(olay.id).not.toBe("oc_hacli_korkak_damgasi");
      if (olay.id === "oc_hacli_kutsal_topraklar_savasi") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });

  it("hacli:katilmadi etiketiyle sadece katılmayanlara özel olaylar uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 20;
    etiketEkle(state, ["hacli:katilmadi", "hacli_karari_verildi"]);
    let bulundu = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_hacli_kutsal_topraklar_savasi");
      if (olay.id === "oc_hacli_geride_kalanlar" || olay.id === "oc_hacli_korkak_damgasi") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });
});

describe("Kervan (Orta Çağ, dallanan)", () => {
  it("kervan:katildi olmadan kervan-özel takip olayları çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_kervan_soygun_riski");
      expect(olay.id).not.toBe("oc_kervan_uzak_diyar_ticareti");
    }
  });

  it("kervan:katildi ile takip olayları uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["kervan:katildi", "kervan_karari_verildi"]);
    let bulundu = false;
    for (let i = 0; i < 2000 && !bulundu; i++) {
      const { olay } = olaySec(state);
      if (olay.id === "oc_kervan_soygun_riski") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });
});

describe("Veba kişisel karşılaşma (Orta Çağ)", () => {
  it("ülke vebada değilken bu olay hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ulke.vebada = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("oc_veba_karsilasma");
    }
  });

  it("ülke vebadayken olay uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    ulkeGuncelle(state, { vebada: true });
    let bulundu = false;
    for (let i = 0; i < 2000 && !bulundu; i++) {
      const { olay } = olaySec(state);
      if (olay.id === "oc_veba_karsilasma") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });
});

describe("Fabrika Grevi (Sanayi Devrimi, dallanan)", () => {
  it("Orta Çağ'da grev olayları hiç çıkmaz (cag kısıtı)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sd_fabrika_grev_karari");
    }
  });

  it("grev:destekledi etiketiyle sadece o dalın olayları çıkar", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["grev:destekledi", "grev_karari_verildi"]);
    let bulundu = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sd_fabrika_sadik_isci");
      expect(olay.id).not.toBe("sd_fabrika_disliyanlar");
      if (olay.id === "sd_grev_polis_mudahalesi" || olay.id === "sd_grev_kazanim") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });

  it("grev:karsi_cikti etiketiyle sadece o dalın olayları çıkar", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["grev:karsi_cikti", "grev_karari_verildi"]);
    let bulundu = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sd_grev_polis_mudahalesi");
      expect(olay.id).not.toBe("sd_grev_kazanim");
      if (olay.id === "sd_fabrika_sadik_isci" || olay.id === "sd_fabrika_disliyanlar") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });
});

describe("Sömürgecilik (Sanayi Devrimi, dallanan)", () => {
  it("somurge:gitti etiketiyle sadece o dalın olayları çıkar", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    // yolculukta etiketi, artık kilitli yolculuk zincirinin parçası olan bu olayların
    // (yolculukOlayi:true) havuza girebilmesi için de gerekli — bkz. olaySecici.ts uygunMu().
    etiketEkle(state, ["somurge:gitti", "somurge_karari_verildi", "yolculukta"]);
    let bulundu = false;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("sd_somurge_evde_kalanlar");
      if (olay.id === "sd_somurge_ahlaki_ikilem" || olay.id === "sd_somurge_tropik_hastalik") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });
});

describe("Yeni olay isimleri ve dosya bütünlüğü", () => {
  it("temsili yeni başlıklar OLAY_BANKASI içinde mevcut", () => {
    const basliklar = [
      "Kutsal Toprakların Çağrısı",
      "Uzak Diyarlara Giden Kervan",
      "Fabrika Kapısında Bir Grev",
      "Denizaşırı Bir Fırsat",
      "Bir Mucidin Teklifi",
      "Ağzında Bir Sürpriz",
      "Parkta Bir Karşılaşma",
      "Koğuşta Kargaşa",
    ];
    for (const baslik of basliklar) {
      expect(idBul(baslik)).toBe(true);
    }
  });
});
