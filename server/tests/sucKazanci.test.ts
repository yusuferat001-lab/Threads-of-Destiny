import { describe, it, expect } from "vitest";
import { sucKazanciUygula, SUC_SINIFI_ARALIKLARI, sucSinifiDegeri, sucSinifiUst, yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { CharacterState, SecimSonucu, SonucEtkisi } from "../src/types";

function sadeceBuOlayaZorla(state: CharacterState, hedefId: string): void {
  state.gecmis_olaylar = OLAY_BANKASI.filter((o) => o.id !== hedefId).map((o) => o.id);
}

describe("suç sınıfı — motor kuralı (birim)", () => {
  it("suc_sinifi olmayan sonucu değiştirmez (ahlak/para sezgisi kaldırıldı)", () => {
    const etki: SonucEtkisi = { para: 60, ahlak: -40, mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("yok");
    expect(etki.para).toBe(60);
    expect(etki.suc_artis).toBeUndefined();
  });

  it("sınıf aralıkları: küçük 4-8 · orta 10-16 · büyük 20-26 · ağır 24-30", () => {
    expect(SUC_SINIFI_ARALIKLARI).toEqual({ kucuk: [4, 8], orta: [10, 16], buyuk: [20, 26], agir: [24, 30] });
    for (const sinif of ["kucuk", "orta", "buyuk", "agir"] as const) {
      const [min, max] = SUC_SINIFI_ARALIKLARI[sinif];
      for (let i = 0; i < 200; i++) {
        const v = sucSinifiDegeri(sinif);
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(min);
        expect(v).toBeLessThanOrEqual(max);
      }
    }
  });

  it("başarısız dal (suçüstü) bir üst sınıftır", () => {
    expect(sucSinifiUst("kucuk")).toBe("orta");
    expect(sucSinifiUst("orta")).toBe("buyuk");
    expect(sucSinifiUst("buyuk")).toBe("agir");
    expect(sucSinifiUst("agir")).toBe("agir");
  });

  it("küçük/orta suç: para ×1.6, aranma sınıf aralığında", () => {
    const etki: SonucEtkisi = { para: 20, suc_sinifi: "orta", mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("suc");
    expect(etki.para).toBe(32); // 20 * 1.6
    expect(etki.suc_artis).toBeGreaterThanOrEqual(10);
    expect(etki.suc_artis).toBeLessThanOrEqual(16);
  });

  it("büyük/ağır suç: 'ciddi' döner, aranma sınıf aralığında", () => {
    const etki: SonucEtkisi = { para: 50, suc_sinifi: "buyuk", mesaj: "x" };
    expect(sucKazanciUygula(etki)).toBe("ciddi");
    expect(etki.para).toBe(80);
    expect(etki.suc_artis).toBeGreaterThanOrEqual(20);
    expect(etki.suc_artis).toBeLessThanOrEqual(26);
    const yakalanma: SonucEtkisi = { suc_sinifi: "agir", mesaj: "x" };
    expect(sucKazanciUygula(yakalanma)).toBe("ciddi");
    expect(yakalanma.suc_artis).toBeGreaterThanOrEqual(24);
    expect(yakalanma.suc_artis).toBeLessThanOrEqual(30);
  });

  it("para kazandırmayan (zararlı) suçüstü dalında para çarpılmaz", () => {
    const etki: SonucEtkisi = { para: -10, suc_sinifi: "orta", mesaj: "x" };
    sucKazanciUygula(etki);
    expect(etki.para).toBe(-10);
    expect(etki.suc_artis).toBeGreaterThanOrEqual(10);
  });

  it("mevcut suc_artis değerinin üstüne biner", () => {
    const etki: SonucEtkisi = { suc_sinifi: "kucuk", suc_artis: 5, mesaj: "x" };
    sucKazanciUygula(etki);
    expect(etki.suc_artis).toBeGreaterThanOrEqual(9);
  });
});

describe("olay bankası — aranma koruma testi", () => {
  type Dal = SonucEtkisi | undefined;
  const dallar = (): { id: string; i: number; ad: string; e: SonucEtkisi }[] => {
    const liste: { id: string; i: number; ad: string; e: SonucEtkisi }[] = [];
    for (const o of OLAY_BANKASI) {
      o.secenekler.forEach((s, i) => {
        const d: [string, Dal][] = [
          ["S", s.basariliSonuc],
          ["F", s.basarisizSonuc],
          ["G", s.onTepki?.geriCekilSonucu],
          ["D", s.onTepki?.devamSonucu],
        ];
        for (const [ad, e] of d) if (e) liste.push({ id: o.id, i, ad, e });
      });
    }
    return liste;
  };

  it("pozitif açık suc_artis yalnız kumar için sabit +1 olabilir (diğer artışlar suc_sinifi ile)", () => {
    const ihlal = dallar().filter(({ e }) => (e.suc_artis ?? 0) > 1);
    expect(ihlal.map((x) => `${x.id}#${x.i}${x.ad}=${x.e.suc_artis}`)).toEqual([]);
  });

  it("tüm suc_sinifi değerleri geçerli", () => {
    const gecerli = new Set(["kucuk", "orta", "buyuk", "agir"]);
    const ihlal = dallar().filter(({ e }) => e.suc_sinifi !== undefined && !gecerli.has(e.suc_sinifi));
    expect(ihlal).toEqual([]);
  });

  it("hizip olaylarında yalnız gerçek suç şıkları aranma alır (hizip kararı kendi başına aranma vermez)", () => {
    const hizipAranma = dallar().filter(({ id, e }) => id.startsWith("hizip_") && e.suc_sinifi);
    // Sabotaj, rüşvet, kaçakçılık, yangın gibi yasa dışı eylemler: en fazla 7 şık (14 dal).
    expect(new Set(hizipAranma.map((x) => `${x.id}#${x.i}`)).size).toBeLessThanOrEqual(7);
    const saflasma = dallar().filter(({ id, e }) => id.endsWith("_saflasma") && (e.suc_sinifi || e.suc_artis));
    expect(saflasma).toEqual([]);
  });
});

describe("suç işleyerek para kazanma — gerçek olay üzerinden (entegrasyon)", () => {
  it("manastır yağması başarılı olunca suç GİZLİ kalır (aranma hemen artmaz), para çarpılır", async () => {
    for (let deneme = 0; deneme < 60; deneme++) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      state.yas = 40;
      state.saglik = 100;
      state.etiketler.push("yolculuk_tamamlandi", "tanisma_donum_27", "tanisma_donum_36"); // tanışma fırsatı zorlanmasın
      await mesleğiAta(state.id, "Asker");
      sadeceBuOlayaZorla(state, "oc_asker_manastir_talani");

      const senaryo = await senaryoUret(state.id);
      if (senaryo.olay_basligi !== "Manastır Emri") continue;

      const oncekiSuc = state.suc_seviyesi;
      const sonuc = (await secimUygula(state.id, 0)) as SecimSonucu;
      if (!sonuc.basarili) continue;

      expect(sonuc.state.suc_seviyesi).toBe(oncekiSuc); // gizli suç: aranma ifşaya kadar artmaz
      expect(sonuc.uygulananEtki.para ?? 0).toBeGreaterThan(40); // taban 35 → 1.6x
      return;
    }
    throw new Error("60 denemede başarılı manastır yağması yakalanamadı");
  });
});
