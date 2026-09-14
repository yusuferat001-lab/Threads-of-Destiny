import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, giderKalemleriHesapla } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";

describe("evcil hayvan sistemi", () => {
  it("yeni karakter evcil hayvansız başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    expect(state.evcil_hayvan).toBeNull();
  });

  it("evcil hayvan varken edinme olayları çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.evcil_hayvan = { tur: "Kedi", isim: "Boncuk" };
    state.etiketler.push("evcil_hayvan_var");
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Sokak Köpeği");
      expect(senaryo.olay_basligi).not.toBe("Bir Kedi Yavrusu");
      expect(senaryo.olay_basligi).not.toBe("Yalnız Bir Kurt Yavrusu");
    }
  });

  it("evcil hayvan yokken takip olayları (hastalık, kayıp vb.) çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    expect(state.evcil_hayvan).toBeNull();
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Hasta Bir Dost");
      expect(senaryo.olay_basligi).not.toBe("Kayıp");
    }
  });

  it("dağ başı yerleşiminde olmayan karakter kurt yavrusu olayını hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    expect(state.etiketler.includes("yerlesim:dag")).toBe(false);
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Yalnız Bir Kurt Yavrusu");
    }
  });

  it("uçtan uca: sokak köpeğini sahiplenmek state.evcil_hayvan'ı doldurur", async () => {
    let bulundu = false;
    let kalanButce = 3000;
    while (!bulundu && kalanButce > 0) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
      state.yas = 20;
      state.para = 200;
      await mesleğiAta(state.id, "Tüccar");

      while (!bulundu && kalanButce > 0 && state.aktif) {
        kalanButce--;
        if (state.saglik < 60) state.saglik = 90;
        if (state.para < 50) state.para = 200;
        const senaryo = await senaryoUret(state.id);
        if (senaryo.olay_basligi === "Bir Dost mu, Yoksa Yalnızlık mı?") {
          bulundu = true;
          const sonuc = await secimUygula(state.id, 0); // "Bir köpek yavrusu edin."
          if (!("ara_tepki" in sonuc) && sonuc.basarili) {
            expect(state.evcil_hayvan).not.toBeNull();
            expect(state.evcil_hayvan?.tur).toBe("Köpek");
            expect(state.etiketler.includes("evcil_hayvan_var")).toBe(true);
          }
          break;
        }
        const acikSecenekler = senaryo.secenekler.map((s, i2) => ({ s, i2 })).filter(({ s }) => !s.kilitli);
        const idx = acikSecenekler.length > 0 ? acikSecenekler[Math.floor(Math.random() * acikSecenekler.length)].i2 : 0;
        const cevap = await secimUygula(state.id, idx);
        if ("ara_tepki" in cevap) await secimUygula(state.id, 0);
      }
    }
    expect(bulundu).toBe(true);
  }, 60000);

  /** Diğer garantili olaylar (hayat amacı, evlilik teklifi) devreye girmesin diye zaten "görülmüş" işaretlenir. */
  function digerZorunluOlaylariGecistir(state: Awaited<ReturnType<typeof yeniOyun>>) {
    state.hayat_amaci = { id: "x", ad: "x", aciklama: "x", hedefTuru: "para", hedefDeger: 999999, tamamlandi: false };
    state.gecmis_olaylar.push("hayat_amaci_secimi", "iliski_evlilik_teklifi", "iliski_ikinci_teklif");
    // Tarihi savaş ilanı zorlanan olayı bazı yıl/bölge kombinasyonlarında devreye girebiliyor; savasta=true ile o kontrolü baştan atlarız.
    state.ulke.savasta = true;
    // Kariyer yolu girişi (Tüccar için "İlk Anlaşma") 18 yaşından itibaren zorla
    // tetiklenir; bu karakter zaten bir yola girmiş gibi işaretlenir ki evcil
    // hayvan garantisi kural sırasında gölgelenmesin.
    state.etiketler.push("yol:tuccar:hayirsever");
    state.gecmis_olaylar.push("oc_tuccar_yol_ilk_anlasma");
  }

  it("20-25 yaş arası, evcil hayvanı olmayan bir karaktere garantili sahiplenme teklifi zorla çıkar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.yas = 20;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Bir Dost mu, Yoksa Yalnızlık mı?");
    expect(senaryo.secenekler.length).toBe(4);
  });

  it("garantili sahiplenme teklifini reddetmek evcil hayvan atamaz ve olay bir daha zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.yas = 20;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Bir Dost mu, Yoksa Yalnızlık mı?");
    const reddetIndex = senaryo.secenekler.findIndex((s) => s.metin.includes("Hayır"));
    await secimUygulaVeCoz(state.id, reddetIndex);
    expect(state.evcil_hayvan).toBeNull();
    expect(state.gecmis_olaylar.includes("evcilhayvan_sahiplenme_teklifi_ortacag")).toBe(true);
  });

  it("evcil hayvan sahibiyken yıllık giderde bakım maliyeti görünür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.evcil_hayvan = { tur: "Kedi", isim: "Boncuk" };
    const gider = giderKalemleriHesapla(state);
    expect(gider.evcilHayvan).toBeGreaterThan(0);
  });

  it("evcil hayvanı olan ve 45-50 yaşında iken hiç takip olayı yaşamamış karaktere garanti olay zorlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.evcil_hayvan = { tur: "Kedi", isim: "Boncuk" };
    state.etiketler.push("evcil_hayvan_var", "evcil_hayvan_tur:Kedi");
    state.yas = 46;
    const senaryo = await senaryoUret(state.id);
    const EVCIL_HAYVAN_GENEL_BASLIKLAR = [
      "Hasta Bir Dost",
      "Sessiz Bir Sadakat",
      "Kayıp Dost",
      "Sadık Bir Bekçi",
      "Ağzında Bir Sürpriz",
      "Parkta Bir Karşılaşma",
    ];
    expect(EVCIL_HAYVAN_GENEL_BASLIKLAR).toContain(senaryo.olay_basligi);
  });
});
