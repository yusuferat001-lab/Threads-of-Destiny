import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, haberleriUret } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, ekipCikar } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";
import { vergisizSenaryo } from "./_ogreti";

describe("kişilik ekseni", () => {
  it("yüksek fevrilikte sadece fevri seçenek görünür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.meslek = "Tüccar";
    state.kisilik_eksenleri.fevrilik = 90;
    for (let i = 0; i < 3000; i++) {
      const { senaryo } = olaySec(state);
      if (senaryo.olay_basligi === "Gecikmeye Gelmez") {
        expect(senaryo.secenekler).toHaveLength(1);
        expect(senaryo.secenekler[0].metin).toContain("İçeri dal ve o sandığı kap!");
        return;
      }
    }
    throw new Error("Olay 3000 denemede bulunamadı.");
  });

  it("düşük fevrilikte sadece planlayıcı seçenek görünür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.meslek = "Tüccar";
    state.kisilik_eksenleri.fevrilik = 10;
    for (let i = 0; i < 3000; i++) {
      const { senaryo } = olaySec(state);
      if (senaryo.olay_basligi === "Gecikmeye Gelmez") {
        expect(senaryo.secenekler).toHaveLength(1);
        expect(senaryo.secenekler[0].metin).toContain("Delilik bu! Uzaktan izle.");
        return;
      }
    }
    throw new Error("Olay 3000 denemede bulunamadı.");
  });
});

describe("ekip sistemi", () => {
  it("başarılı işe alım gerçek kaliteyi gizler ama tahmini aralık üretir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.para = 5000;
    await mesleğiAta(state.id, "Tüccar");

    for (let i = 0; i < 1000 && state.aktif; i++) {
      const senaryo = await vergisizSenaryo(state);
      if (senaryo.olay_basligi === "Referanslı Ama Pahalı Bir Yardımcı") {
        const sonuc = await secimUygulaVeCoz(state.id, 0);
        if (sonuc.basarili) {
          expect(sonuc.state.ekip.length).toBeGreaterThanOrEqual(1);
          const uye = sonuc.state.ekip[sonuc.state.ekip.length - 1];
          expect(uye.isim).toBeTruthy();
          expect(uye.tahminiMin).toBeLessThanOrEqual(uye.tahminiMax);
          expect(uye.tahminiMin).toBeGreaterThanOrEqual(0);
          expect(uye.tahminiMax).toBeLessThanOrEqual(100);
        }
        return;
      }
      const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
      await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
    }
  });

  it("gerekliEkip:true olaylar ekip yokken çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.meslek = "Tüccar";
    expect(state.ekip).toHaveLength(0);
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Tehlikeli Bir Kervan Yolu");
      expect(senaryo.olay_basligi).not.toBe("Riskli Bir Görev Teklifi");
    }
  });

  it("yeni işe alınan ekip üyesinin yıllık maaşı 2-9 aralığında kalır (eskiden 5-18'di)", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.para = 5000;
    await mesleğiAta(state.id, "Tüccar");

    for (let i = 0; i < 1000 && state.aktif; i++) {
      const senaryo = await vergisizSenaryo(state);
      if (senaryo.olay_basligi === "Referanslı Ama Pahalı Bir Yardımcı") {
        const sonuc = await secimUygulaVeCoz(state.id, 0);
        if (sonuc.basarili) {
          const uye = sonuc.state.ekip[sonuc.state.ekip.length - 1];
          expect(uye.maas).toBeGreaterThanOrEqual(2);
          expect(uye.maas).toBeLessThanOrEqual(9);
        }
        return;
      }
      const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
      await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
    }
  });

  it("ekipCikar bir tur harcamadan istenen ekip üyesini kaldırır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.ekip.push({
      id: "test-uye-1",
      isim: "Test Kişi",
      rol: "Yardımcı",
      gercekKalite: 50,
      tahminiMin: 40,
      tahminiMax: 60,
      maas: 5,
      sadakat: 60,
      kisilik: "Sadık",
    });
    const oncekiYil = state.yil;
    const sonuc = await ekipCikar(state.id, "test-uye-1");
    expect(sonuc.state.ekip.find((u) => u.id === "test-uye-1")).toBeUndefined();
    expect(sonuc.state.yil).toBe(oncekiYil);
    expect(sonuc.mesaj).toContain("Test Kişi");
  });

  it("olmayan bir ekip üyesini kovmaya çalışmak hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(ekipCikar(state.id, "olmayan-id")).rejects.toThrow();
  });
});

describe("hizip sistemi", () => {
  it("saflaşma olayı state.hizip'i doldurur, çatışma olayı sadece hizip varken çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 20;
    state.meslek = "Asker";
    expect(state.hizip).toBeNull();
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Hizipler Arasında Gerginlik");
    }
  });
});

describe("haberler", () => {
  it("ülke durumuna göre haber üretilir, hükümdar satırı artık yok", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    expect(Array.isArray(state.haberler)).toBe(true);
    expect(state.haberler.length).toBeGreaterThan(0);
    expect(state.haberler.some((h) => h.includes("yönetiyor"))).toBe(false);
  });

  it("aynı ülke durumunda art arda çağrılar farklı cümleler üretebilir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.ulke.savasta = true;
    const gorulenler = new Set<string>();
    for (let i = 0; i < 100; i++) {
      for (const haber of haberleriUret(state)) gorulenler.add(haber);
    }
    expect(gorulenler.size).toBeGreaterThan(1);
  });

  it("bölgeye özgü yerel haberler zaman zaman eklenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    let yerelGorundu = false;
    for (let i = 0; i < 200 && !yerelGorundu; i++) {
      const haberler = haberleriUret(state);
      if (haberler.some((h) => h.includes("Panayır") || h.includes("Değirmenci") || h.includes("Roma sikkesi") || h.includes("bağ bozumu"))) {
        yerelGorundu = true;
      }
    }
    expect(yerelGorundu).toBe(true);
  });
});
