import { describe, it, expect } from "vitest";
import { sucKazanciUygula, yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { CharacterState, SecimSonucu, SonucEtkisi } from "../src/types";

function sadeceBuOlayaZorla(state: CharacterState, hedefId: string): void {
  state.gecmis_olaylar = OLAY_BANKASI.filter((o) => o.id !== hedefId).map((o) => o.id);
}

describe("suç işleyerek para kazanma — motor kuralı (birim)", () => {
  it("para>0 && ahlak tavizi taşımayan sonucu değiştirmez", () => {
    const etki: SonucEtkisi = { para: 40, ahlak: 2, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("yok");
    expect(etki.para).toBe(40);
    expect(etki.suc_artis).toBeUndefined();
  });

  it("ahlak kaybı olsa da para kazandırmayan sonucu değiştirmez", () => {
    const etki: SonucEtkisi = { para: 0, ahlak: -30, saglik: -10, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("yok");
    expect(etki.suc_artis).toBeUndefined();
  });

  it("küçük suç: parayı büyütür, suc_seviyesi'ni (tek eksen) artırır", () => {
    const etki: SonucEtkisi = { para: 20, ahlak: -8, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("suc");
    expect(etki.para).toBe(32); // 20 * 1.6
    expect(etki.suc_artis).toBeGreaterThan(0);
    expect(etki.suc_artis).toBeLessThanOrEqual(45); // normal tavan (büyük denge turu: 28 → 45)
  });

  it("ciddi suç (ağır ahlak tavizi): suc_seviyesi'ni daha çok sıçratır", () => {
    const etki: SonucEtkisi = { para: 20, ahlak: -40, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("ciddi");
    expect(etki.para).toBe(32);
    expect(etki.suc_artis).toBeGreaterThan(45); // normal tavanı (45) aşar, ciddi tavana (65) doğru büyür
  });

  it("ciddi suç (büyük vurgun): eşiği para tarafından geçer", () => {
    const etki: SonucEtkisi = { para: 50, ahlak: -6, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("ciddi");
    expect(etki.para).toBe(80);
  });

  it("suc_artis katkısı ciddi tavana (65) sınırlanır", () => {
    const etki: SonucEtkisi = { para: 300, ahlak: -60, mesaj: "x" };
    sucKazanciUygula(etki);
    expect(etki.suc_artis).toBeLessThanOrEqual(65);
  });

  it("mevcut suc_artis değerinin üstüne biner", () => {
    const etki: SonucEtkisi = { para: 40, ahlak: -20, suc_artis: 5, mesaj: "x" };
    sucKazanciUygula(etki);
    expect(etki.suc_artis).toBeGreaterThan(5);
  });

  it("aranma_arttir gibi ayrı bir alan artık üretilmez (tek eksen)", () => {
    const etki = { para: 60, ahlak: -40, mesaj: "x" } as Record<string, unknown>;
    sucKazanciUygula(etki as SonucEtkisi);
    expect(etki.aranma_arttir).toBeUndefined();
  });
});

describe("suç işleyerek para kazanma — gerçek olay üzerinden (entegrasyon)", () => {
  it("manastır yağması seçilince suc_seviyesi (yıldız göstergesi) fırlar ve para çarpılır", async () => {
    for (let deneme = 0; deneme < 60; deneme++) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "sinir_bolgesi");
      state.yas = 40;
      state.saglik = 100;
      state.etiketler.push("yolculuk_tamamlandi");
      await mesleğiAta(state.id, "Asker");
      sadeceBuOlayaZorla(state, "oc_asker_manastir_talani");

      const senaryo = await senaryoUret(state.id);
      if (senaryo.olay_basligi !== "Manastır Emri") continue;

      const oncekiSuc = state.suc_seviyesi;
      const sonuc = (await secimUygula(state.id, 0)) as SecimSonucu;
      if (!sonuc.basarili) continue;

      expect(sonuc.state.suc_seviyesi).toBeGreaterThan(oncekiSuc + 8);
      expect(sonuc.uygulananEtki.para ?? 0).toBeGreaterThan(40); // taban 35 → 1.6x
      return;
    }
    throw new Error("60 denemede başarılı manastır yağması yakalanamadı");
  });
});
