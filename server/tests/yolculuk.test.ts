import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { CharacterState } from "../src/types";

function baslikGetir(id: string): string {
  const olay = OLAY_BANKASI.find((o) => o.id === id);
  if (!olay) throw new Error(`${id} OLAY_BANKASI'nda yok`);
  return olay.baslik;
}

/** Yolculuk garantisi dışındaki tüm diğer zorla-tetiklenen olayları (evlilik, evcil hayvan, savaş ilanı vb.) devre dışı bırakır. */
function digerGarantileriGecistir(state: CharacterState) {
  state.ulke.savasta = true;
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif");
  state.evcil_hayvan = { tur: "Kedi", isim: "Testçik" };
}

describe("yolculuk teklifi garantisi (senaryoUret)", () => {
  it("Orta Çağ Fransa'da bir asker, Haçlı Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("oc_hacli_sefer_karari"));
  });

  it("Orta Çağ Selçuklu'da bir asker, Kutsal Toprakları Savunma Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Selçuklu", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("yolculuk_savunma_teklif"));
  });

  it("Sanayi Devrimi'nde bir asker, Sömürge Seferi teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    await mesleğiAta(state.id, "Asker");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("sd_somurge_gitme_karari"));
  });

  it("Orta Çağ'da bir tüccar, Coğrafi Keşif teklifiyle karşılaşır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
  });

  it("Sanayi Devrimi'nde bir tüccar, Coğrafi Keşif/Mucit Turnesi/Sömürge Seferi tekliflerinden biriyle karşılaşır", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    const beklenenler = [
      baslikGetir("yolculuk_kesif_teklif"),
      baslikGetir("yolculuk_mucit_teklif"),
      baslikGetir("sd_somurge_gitme_karari"),
    ];
    expect(beklenenler).toContain(senaryo.olay_basligi);
  });

  it.each([
    ["Selçuklu", "Sünni İslam", "hac_sunni_karar"],
    ["Fransa", "Katolik", "hac_katolik_karar"],
  ])("Orta Çağ %s bölgesindeki bir din adamı (%s), kendi Hac teklifiyle karşılaşır", async (bolge, _din, beklenenId) => {
    const state = await yeniOyun("Orta Çağ", bolge, "sehir_merkezi");
    await mesleğiAta(state.id, "Din Adamı");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe(baslikGetir(beklenenId));
  });

  it("bir yolculuk tamamlandıktan sonra garanti bir daha hiç tetiklenmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerGarantileriGecistir(state);
    state.yas = 27;
    state.etiketler.push("yolculuk_tamamlandi");
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe(baslikGetir("yolculuk_kesif_teklif"));
  });

  it("reddedilen teklif birkaç yıl sonra tekrar sorulur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerGarantileriGecistir(state);
    state.yas = 27;
    const ilkSenaryo = await senaryoUret(state.id);
    expect(ilkSenaryo.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
    // Reddet seçeneği (üçüncü şık, index 2).
    const redSonuc = await secimUygulaVeCoz(state.id, 2);
    expect(redSonuc.state.etiketler).toContain("yolculuk_teklifi_edildi");
    expect(redSonuc.state.etiketler).not.toContain("yolculukta");

    // Cooldown bitene kadar (birkaç tur) tekrar teklif çıkmamalı.
    let tekrarTeklifGorundu = false;
    for (let i = 0; i < 6 && !tekrarTeklifGorundu; i++) {
      digerGarantileriGecistir(redSonuc.state);
      const s = await senaryoUret(state.id);
      if (s.olay_basligi === baslikGetir("yolculuk_kesif_teklif")) tekrarTeklifGorundu = true;
      else {
        // Zorlanan olay değilse normal akışta rastgele bir şık seçip ilerleyelim.
        const secenekler = s.secenekler;
        const acikIdx = secenekler.findIndex((sec) => !sec.kilitli);
        await secimUygulaVeCoz(state.id, acikIdx >= 0 ? acikIdx : 0);
      }
    }
    expect(tekrarTeklifGorundu).toBe(true);
  });
});

describe("yolculukta iken normal olay havuzu tamamen kilitleniyor", () => {
  it("Coğrafi Keşif'in deniz rotasında sadece o rotaya ait olaylar çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 25;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:kesif", "yolculuk_yolu:deniz"]);

    const izinVerilenler = new Set([
      "yolculuk_kesif_deniz_1",
      "yolculuk_kesif_deniz_2",
      "yolculuk_kesif_deniz_3",
      "yolculuk_kesif_donus",
    ]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(izinVerilenler.has(olay.id)).toBe(true);
      // Kara rotasına ait hiçbir olay hiçbir zaman çıkmamalı.
      expect(olay.id).not.toBe("yolculuk_kesif_kara_1");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_2");
      expect(olay.id).not.toBe("yolculuk_kesif_kara_3");
    }
  });

  it("Coğrafi Keşif'in kara rotasında sadece o rotaya ait olaylar çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 25;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:kesif", "yolculuk_yolu:kara"]);

    const izinVerilenler = new Set([
      "yolculuk_kesif_kara_1",
      "yolculuk_kesif_kara_2",
      "yolculuk_kesif_kara_3",
      "yolculuk_kesif_donus",
    ]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(izinVerilenler.has(olay.id)).toBe(true);
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_1");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_2");
      expect(olay.id).not.toBe("yolculuk_kesif_deniz_3");
    }
  });

  it("yolculukta etiketi varken hiçbir sıradan (yolculukOlayi olmayan) olay çıkmaz", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 30;
    etiketEkle(state, ["yolculukta", "yolculuk_tipi:mucit", "yolculuk_yolu:sanayici"]);
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(olay.yolculukOlayi).toBe(true);
    }
  });

  it("yolculukta etiketi yokken hiçbir yolculuk olayı (yolculukOlayi:true) çıkmaz", () => {
    const state = createCharacter("Sanayi Devrimi", "İngiltere", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.yas = 30;
    for (let i = 0; i < 300; i++) {
      const { olay } = olaySec(state);
      expect(olay.yolculukOlayi).not.toBe(true);
    }
  });
});

describe("yolculuk zinciri uçtan uca (Coğrafi Keşif, deniz rotası)", () => {
  it("teklif kabul edilince zincir sırayla ilerler ve sonunda yolculuk_tamamlandi ile normal havuz açılır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerGarantileriGecistir(state);
    state.yas = 27;
    state.para = 500;

    const teklif = await senaryoUret(state.id);
    expect(teklif.olay_basligi).toBe(baslikGetir("yolculuk_kesif_teklif"));
    // İlk şık: deniz yoluyla kabul et.
    let sonuc = await secimUygulaVeCoz(state.id, 0);
    expect(sonuc.state.etiketler).toContain("yolculukta");
    expect(sonuc.state.etiketler).toContain("yolculuk_yolu:deniz");

    const beklenenSira = ["yolculuk_kesif_deniz_1", "yolculuk_kesif_deniz_2", "yolculuk_kesif_deniz_3", "yolculuk_kesif_donus"];
    for (const beklenenId of beklenenSira) {
      const senaryo = await senaryoUret(state.id);
      expect(senaryo.olay_basligi).toBe(baslikGetir(beklenenId));
      const acikIdx = senaryo.secenekler.findIndex((s) => !s.kilitli);
      sonuc = await secimUygulaVeCoz(state.id, acikIdx >= 0 ? acikIdx : 0);
    }

    expect(sonuc.state.etiketler).toContain("yolculuk_tamamlandi");
    expect(sonuc.state.etiketler).not.toContain("yolculukta");
  });
});
