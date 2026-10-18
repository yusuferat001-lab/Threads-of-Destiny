import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, kotuIsYap, kotuIsConfigGetir, stateGetir, hapisCezaSuresiHesapla } from "../src/game/gameEngine";

describe("karanlık işler (illegal işler paneli)", () => {
  it("kotuIsConfigGetir 5 aksiyonu şans/kazanç önizlemesiyle döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const config = await kotuIsConfigGetir(state.id);
    expect(config).toHaveLength(5);
    for (const kart of config) {
      expect(kart.basariSansi).toBeGreaterThanOrEqual(5);
      expect(kart.basariSansi).toBeLessThanOrEqual(95);
      expect(typeof kart.tahminiKazanc).toBe("number");
    }
    expect(config.some((k) => k.rakibeYonelik)).toBe(true);
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
    await mesleğiAta(state.id, "Tüccar");
    const s0 = await stateGetir(state.id);
    s0.suc_seviyesi = 0;
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
      s.sosyallesme_aksiyon_kilit = {}; // bekleme süresi bu testin konusu değil
      await kotuIsYap(state.id, "rakibi_korkut");
    }
    s = await stateGetir(state.id);
    expect(s.kariyer_puani).toBeGreaterThan(oncePuan);
  });

  it("hapisCezaSuresiHesapla, tutuklanma anındaki aranma bandına göre doğru aralıkta ceza üretir (2026-09 yeniden düzenleme)", () => {
    const beklenenAralik: [number, [number, number]][] = [
      [0, [2, 4]],
      [10, [2, 4]],
      [24, [2, 4]],
      [25, [4, 7]],
      [40, [4, 7]],
      [49, [4, 7]],
      [50, [7, 9]],
      [60, [7, 9]],
      [74, [7, 9]],
      [75, [9, 12]],
      [90, [9, 12]],
      [100, [9, 12]],
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
      s.sosyallesme_aksiyon_kilit = {}; // bekleme süresi bu testin konusu değil
      await kotuIsYap(state.id, "birini_soy");
      if (s.etiketler.includes("hapiste")) tutuklandi = true;
    }
    expect(tutuklandi).toBe(true);
    expect(s.hapis_ceza_kalan).toBeGreaterThanOrEqual(2);
    expect(s.hapis_ceza_toplam).toBe(s.hapis_ceza_kalan);
  });
  it("aynı karanlık iş bekleme süresi dolmadan tekrar çevrilemez; süre dolunca çevrilir (kalanYil kartta görünür)", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const s = await stateGetir(state.id);
    s.para = 1000;
    await kotuIsYap(state.id, "rakibi_korkut");
    await expect(kotuIsYap(state.id, "rakibi_korkut")).rejects.toThrow(/yakın zamanda/);
    const kartlar = await kotuIsConfigGetir(state.id);
    expect(kartlar.find((k) => k.id === "rakibi_korkut")?.kalanYil).toBeGreaterThan(0);
    expect(kartlar.find((k) => k.id === "adam_dov")?.kalanYil).toBe(0);
    s.yil += 5; // bekleme süresi geçti
    s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
    await expect(kotuIsYap(state.id, "rakibi_korkut")).resolves.toBeDefined();
  });

});
