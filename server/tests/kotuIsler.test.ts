import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, kotuIsYap, kotuIsConfigGetir, stateGetir, hapisCezaSuresiHesapla } from "../src/game/gameEngine";

describe("karanlık işler (illegal işler paneli)", () => {
  it("kotuIsConfigGetir Tüccar için yalnız kendi 3 işini şans/kazanç önizlemesiyle döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const config = await kotuIsConfigGetir(state.id);
    expect(config).toHaveLength(3);
    expect(config.filter((k) => k.meslegeOzel).map((k) => k.id).sort()).toEqual(
      ["gumruk_rusvet", "kervan_yagmalat", "rakibe_iftira"]
    );
    for (const kart of config) {
      expect(kart.basariSansi).toBeGreaterThanOrEqual(5);
      expect(kart.basariSansi).toBeLessThanOrEqual(95);
      expect(typeof kart.tahminiKazanc).toBe("number");
    }
    expect(config.some((k) => k.rakibeYonelik)).toBe(true);
  });

  it("Zanaatkâr için yalnız kendi 3 işi gelir ve üçü de çalışanla yaptırılabilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    const config = await kotuIsConfigGetir(state.id);
    expect(config.map((k) => k.id).sort()).toEqual(["formul_cal", "hammadde_topla", "lonca_manipule"]);
    expect(config.every((k) => k.calisanIsi)).toBe(true);
  });

  it("hammadde kapatma başarılı olunca hammadde maliyeti birkaç yıl düşer", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    const s = await stateGetir(state.id);
    s.para = 500;
    let basardi = false;
    for (let i = 0; i < 60 && !basardi; i++) {
      s.kotu_is_kilit = {};
      s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
      s.ahlak = 50;
      const { kazandi } = await kotuIsYap(state.id, "hammadde_topla");
      basardi = kazandi;
    }
    expect(basardi).toBe(true);
    expect(s.isletme!.gumruk_indirim_bitis).toBeGreaterThan(s.yil);
  });

  it("bir karanlık iş ahlakı düşürür ve suç seviyesini yükseltir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    let s = await stateGetir(state.id);
    const onceAhlak = s.ahlak;
    const onceSuc = s.suc_seviyesi;
    await kotuIsYap(state.id, "adam_dov");
    s = await stateGetir(state.id);
    expect(s.ahlak).toBeLessThan(onceAhlak);
    expect(s.suc_seviyesi).toBeGreaterThan(onceSuc);
  });

  it("aranma artışı iş sınıfının aralığındadır: başarıda sınıf, başarısızlıkta bir üst sınıf", async () => {
    // birini_soy: başarı = büyük (20-26), başarısızlık = ağır (24-30).
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker"); // genel işler yalnız işletmesi olmayan mesleklerde
    const s0 = await stateGetir(state.id);
    s0.suc_seviyesi = 0;
    s0.para = 1000;
    const sonuc = await kotuIsYap(state.id, "birini_soy");
    const artis = sonuc.state.suc_seviyesi;
    if (sonuc.kazandi) {
      expect(artis).toBeGreaterThanOrEqual(20);
      expect(artis).toBeLessThanOrEqual(26);
    } else {
      expect(artis).toBeGreaterThanOrEqual(24);
      expect(artis).toBeLessThanOrEqual(30);
    }
    // Aranmayı artıran iş "4 yıl temiz" sayacını sıfırlar.
    expect(sonuc.state.son_suc_yili).toBe(sonuc.state.yil);
  });

  it("geçersiz iş türü hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(kotuIsYap(state.id, "olmayan_is")).rejects.toThrow();
  });

  it("hapisteyken karanlık iş çevrilemez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const s = await stateGetir(state.id);
    s.etiketler.push("hapiste");
    await expect(kotuIsYap(state.id, "birini_soy")).rejects.toThrow();
  });

  it("rakip hedefleyen iş, yeterince denenince kariyer puanına katkı verebilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    let s = await stateGetir(state.id);
    const oncePuan = s.kariyer_puani;
    // rakibi_korkut'un başarısız dalında hapis riski YOK — güvenle döngüye sokulabilir.
    for (let i = 0; i < 60; i++) {
      s = await stateGetir(state.id);
      if (s.etiketler.includes("hapiste")) break;
      s.kotu_is_kilit = {}; // bekleme süresini test için sıfırla
      await kotuIsYap(state.id, "rakibi_korkut");
    }
    s = await stateGetir(state.id);
    expect(s.kariyer_puani).toBeGreaterThan(oncePuan);
  });

  it("hapisCezaSuresiHesapla, tutuklanma anındaki aranma bandına göre doğru aralıkta ceza üretir (2026-09 yeniden düzenleme)", () => {
    const beklenenAralik: [number, [number, number]][] = [
      [0, [3, 4]],
      [10, [3, 4]],
      [24, [3, 4]],
      [25, [7, 9]],
      [40, [7, 9]],
      [49, [7, 9]],
      [50, [9, 11]],
      [60, [9, 11]],
      [74, [9, 11]],
      [75, [12, 14]],
      [90, [12, 14]],
      [100, [12, 14]],
    ];
    for (const [sucSeviyesi, [min, max]] of beklenenAralik) {
      for (let i = 0; i < 50; i++) {
        const ceza = hapisCezaSuresiHesapla(sucSeviyesi);
        expect(ceza).toBeGreaterThanOrEqual(min);
        expect(ceza).toBeLessThanOrEqual(max);
      }
    }
  });

  it("karanlık iş yakalanması hapis_ceza_kalan ve hapis_ceza_toplam'ı birlikte, tutarlı bir aralıkta ayarlar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const s = await stateGetir(state.id);
    s.para = 1000; // birini_soy'un maliyet kontrolüne takılmasın (ölüm riski yok, güvenle döngüye sokulabilir)
    let tutuklandi = false;
    for (let i = 0; i < 60 && !tutuklandi; i++) {
      s.kotu_is_kilit = {}; // bekleme süresini test için sıfırla
      s.suc_seviyesi = 0; // yıldız başarı bonusu yakalanmayı nadirleştirmesin (testin konusu ceza aralığı)
      await kotuIsYap(state.id, "birini_soy");
      if (s.etiketler.includes("hapiste")) tutuklandi = true;
    }
    expect(tutuklandi).toBe(true);
    expect(s.hapis_ceza_kalan).toBeGreaterThanOrEqual(2);
    expect(s.hapis_ceza_toplam).toBe(s.hapis_ceza_kalan);
  });

  it("her iş çevrildikten sonra kendi bekleme süresi kadar kilitlenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    await kotuIsYap(state.id, "adam_dov");
    const s = await stateGetir(state.id);
    if (s.etiketler.includes("hapiste")) s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
    await expect(kotuIsYap(state.id, "adam_dov")).rejects.toThrow(/sakinleşmedi/);
    const kart = (await kotuIsConfigGetir(state.id)).find((k) => k.id === "adam_dov");
    expect(kart?.kalanYil).toBeGreaterThan(0);
    s.yil += 1;
    expect((await kotuIsConfigGetir(state.id)).find((k) => k.id === "adam_dov")?.kalanYil).toBe(0);
  });

  it("başka mesleğin özel işi çevrilemez, kendi mesleğininki görünür", async () => {
    const state = await yeniOyun("Sanayi Devrimi", "İngiltere", "kasaba");
    await mesleğiAta(state.id, "Din Adamı");
    const idler = (await kotuIsConfigGetir(state.id)).map((k) => k.id);
    expect(idler).toContain("sahte_mucize");
    expect(idler).not.toContain("kervan_yagmalat");
    await expect(kotuIsYap(state.id, "kervan_yagmalat")).rejects.toThrow();
  });

  it("mesleğe özel iş başarılı olunca meslek pazarındaki müşteri sayısı artar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    const s = await stateGetir(state.id);
    let arttiMi = false;
    for (let i = 0; i < 40 && !arttiMi; i++) {
      s.kotu_is_kilit = {};
      s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
      s.ahlak = 50;
      const once = s.meslek_musteri;
      const { kazandi } = await kotuIsYap(state.id, "lonca_manipule");
      if (kazandi) arttiMi = s.meslek_musteri > once;
    }
    expect(arttiMi).toBe(true);
  });

  it("kaza süsü düello başarılı olursa rakip saf dışı kalır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const s = await stateGetir(state.id);
    const rakipAd = s.rakipler[0].ad;
    // Kaybedilen düello ölüm ya da hapisle bitebilir; her denemede karakteri sıfırlayıp yeniden dene.
    for (let i = 0; i < 80 && !s.rakipler.find((r) => r.ad === rakipAd)?.yenildi; i++) {
      s.kotu_is_kilit = {};
      s.saglik = 100;
      s.aktif = true;
      s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
      await kotuIsYap(state.id, "kaza_duello", { hedefRakipAd: rakipAd });
    }
    expect(s.rakipler.find((r) => r.ad === rakipAd)?.yenildi).toBe(true);
  });

  it("peşin maliyeti olan işte para yetmezse hata verir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const s = await stateGetir(state.id);
    s.para = 0;
    await expect(kotuIsYap(state.id, "gumruk_rusvet")).rejects.toThrow(/Yeterli paran yok/);
  });
});
