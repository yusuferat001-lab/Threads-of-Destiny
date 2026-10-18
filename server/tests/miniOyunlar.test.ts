import { describe, it, expect, vi } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  zarAt,
  zarKademeleriGetir,
  ucKagitciOyna,
  bilekGuresiSonuc,
  stateGetir,
} from "../src/game/gameEngine";

describe("mini oyunlar", () => {
  it("Hazard (zarAt): 2+2 zar döner, çift ya da yüksek toplam kazandırır, suç seviyesi artar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    let s = await stateGetir(state.id);
    s.para = 5000;
    const [kademe] = await zarKademeleriGetir(state.id);
    const onceSuc = s.suc_seviyesi;
    const sonuc = await zarAt(state.id, kademe);
    expect(sonuc.senZar).toHaveLength(2);
    expect(sonuc.rakipZar).toHaveLength(2);
    expect(typeof sonuc.kazandi).toBe("boolean");
    expect(sonuc.cift).toBe(sonuc.senZar[0] === sonuc.senZar[1]);
    if (sonuc.cift) expect(sonuc.kazandi).toBe(true);
    s = await stateGetir(state.id);
    expect(s.suc_seviyesi).toBeGreaterThan(onceSuc);
    expect(s.hazard_el_sayisi).toBe(1);
  });

  it("Hazard: oyun yılı başına en fazla 5 el; yıl dönünce sayaç sıfırlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const s = await stateGetir(state.id);
    s.para = 100000;
    s.saglik = 100;
    const [kademe] = await zarKademeleriGetir(state.id);
    // Bıçak olayı (rastgele ölüm riski) testi flake etmesin: Math.random sabit, bıçak çekilmez.
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.99);
    try {
      for (let i = 0; i < 5; i++) await zarAt(state.id, kademe);
      await expect(zarAt(state.id, kademe)).rejects.toThrow(/yeterince oynadın/);
    } finally {
      rnd.mockRestore();
    }
    s.yil += 1;
    const [yeniKademe] = await zarKademeleriGetir(state.id); // enflasyon kademeyi kaydırır
    await expect(zarAt(state.id, yeniKademe)).resolves.toBeDefined();
  });

  it("Hazard: geçersiz bahis tutarı hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(zarAt(state.id, 7)).rejects.toThrow();
  });

  it("Üç Kağıtçı: seçilen bardak kazanınca dogruBardak'a eşit, para hareket eder, oyun sayacı artar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    let s = await stateGetir(state.id);
    s.para = 5000;
    const [kademe] = await zarKademeleriGetir(state.id);
    let herhangiKazandi = false;
    for (let i = 0; i < 40; i++) {
      const r = await ucKagitciOyna(state.id, kademe, 1);
      expect([0, 1, 2]).toContain(r.dogruBardak);
      if (r.kazandi) {
        expect(r.dogruBardak).toBe(1);
        herhangiKazandi = true;
      } else {
        expect(r.dogruBardak).not.toBe(1);
      }
    }
    s = await stateGetir(state.id);
    expect(s.uc_kagitci_oyun_sayisi).toBe(40);
    expect(herhangiKazandi).toBe(true); // ~%32, 40 denemede neredeyse kesin
  });

  it("Üç Kağıtçı: geçersiz bardak indeksi hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const [kademe] = await zarKademeleriGetir(state.id);
    await expect(ucKagitciOyna(state.id, kademe, 5)).rejects.toThrow();
  });

  it("Bilek güreşi: kazanınca ün artar, kaybedince sağlık düşer; turu tüketmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    let s = await stateGetir(state.id);
    const onceTur = s.tur_sayisi;
    const onceUn = s.un;
    await bilekGuresiSonuc(state.id, true);
    s = await stateGetir(state.id);
    expect(s.un).toBeGreaterThan(onceUn);
    expect(s.tur_sayisi).toBe(onceTur);

    // Aynı oyun yılında ikinci kez güreşilemez (sınırsız şöhret/para kasılmasını önleyen cooldown).
    await expect(bilekGuresiSonuc(state.id, true)).rejects.toThrow(/bilek güreşebilirsin/);
    s.yil += 1;

    const onceSaglik = s.saglik;
    await bilekGuresiSonuc(state.id, false);
    s = await stateGetir(state.id);
    expect(s.saglik).toBeLessThan(onceSaglik);
  });

  it("Bilek güreşi: hapisteyken yapılamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    const s = await stateGetir(state.id);
    s.etiketler.push("hapiste");
    await expect(bilekGuresiSonuc(state.id, true)).rejects.toThrow();
  });
});
