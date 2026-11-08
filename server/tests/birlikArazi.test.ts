import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl, gucHesapla, erSayisi } from "../src/game/birlik";
import { isletmeButcesi } from "../src/game/isletme";
import { savasKiyasiHesapla } from "../src/game/birlikIslem";
import {
  ARAZI_CARPANLARI,
  ARAZI_SIRASI,
  BOLGE_ARAZI_AGIRLIGI,
  DUSMAN_ORAN,
  SAVAS_ZAR_BOLEN,
  dusmanAraziCarpani,
  dusmanSaldiriSavunma,
  dusmanReferansGucuYas,
} from "../src/data/birlik";
import type { CharacterState } from "../src/types";

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 30;
  mesleğiSec(s, "Asker");
  return s;
}

describe("arazi üçlüsü: ova / dağ geçidi / sık orman", () => {
  it("üç arazi var; kale çevresi kalktı", () => {
    expect(ARAZI_SIRASI).toEqual(["ova", "dag", "orman"]);
    expect(Object.keys(ARAZI_CARPANLARI).sort()).toEqual(["dag", "orman", "ova"]);
  });

  it("her arazide her birliğin (piyade/mızraklı/okçu/süvari) çarpanı var ve satır ortalaması ≈1", () => {
    for (const a of ARAZI_SIRASI) {
      const satir = ARAZI_CARPANLARI[a];
      expect(Object.keys(satir).sort()).toEqual(["mizrakli", "okcu", "piyade", "suvari"]);
      const ort = (satir.piyade + satir.mizrakli + satir.okcu + satir.suvari) / 4;
      expect(ort).toBeGreaterThan(0.9);
      expect(ort).toBeLessThan(1.1);
    }
    // Her birliğin kendine göre en iyi arazisi var: süvari ova, okçu dağ, piyade orman.
    expect(ARAZI_CARPANLARI.ova.suvari).toBeGreaterThan(ARAZI_CARPANLARI.dag.suvari);
    expect(ARAZI_CARPANLARI.dag.okcu).toBeGreaterThan(ARAZI_CARPANLARI.ova.okcu);
    expect(ARAZI_CARPANLARI.orman.piyade).toBeGreaterThan(ARAZI_CARPANLARI.ova.piyade);
  });

  it("bölge arazi ağırlıkları 3'lü ve toplamı 1", () => {
    for (const w of Object.values(BOLGE_ARAZI_AGIRLIGI)) {
      expect(w).toHaveLength(3);
      expect(w[0] + w[1] + w[2]).toBeCloseTo(1, 6);
    }
  });

  it("arazi düşmanın baskın birliğine de uygulanır (karma = ortalama)", () => {
    expect(dusmanAraziCarpani("dag", "okcu")).toBe(ARAZI_CARPANLARI.dag.okcu);
    expect(dusmanAraziCarpani("orman", "suvari")).toBe(ARAZI_CARPANLARI.orman.suvari);
    const k = ARAZI_CARPANLARI.ova;
    expect(dusmanAraziCarpani("ova", "karma")).toBeCloseTo((k.piyade + k.mizrakli + k.okcu + k.suvari) / 4, 9);
  });

  it("oyuncunun özel birliği araziden kendi çarpanıyla etkilenir (süvari dağda zayıflar, ovada güçlenir)", () => {
    const s = asker();
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    b.birlik_turler = ["suvari"];
    b.birlik_seviye = 1;
    const baz = { enflasyon: 1 };
    const ova = gucHesapla(s, { ...baz, savas: { arazi: "ova", dusmanTur: "karma", inisiyatif: "saldiri" } });
    const dag = gucHesapla(s, { ...baz, savas: { arazi: "dag", dusmanTur: "karma", inisiyatif: "saldiri" } });
    expect(ova.saldiri).toBeGreaterThan(dag.saldiri);
  });
});

describe("düşman gücü: yaşa göre, ±%5, saldırı/savunma ayrımlı", () => {
  it("savaş sapması ±%5, zar ±%8", () => {
    expect(DUSMAN_ORAN).toEqual([0.95, 1.05]);
    expect((20 - 10.5) / SAVAS_ZAR_BOLEN).toBeCloseTo(0.08, 6);
    expect((1 - 10.5) / SAVAS_ZAR_BOLEN).toBeCloseTo(-0.08, 6);
  });

  it("referans güç yaşla artar", () => {
    expect(dusmanReferansGucuYas(25)).toBeLessThan(dusmanReferansGucuYas(35));
    expect(dusmanReferansGucuYas(35)).toBeLessThan(dusmanReferansGucuYas(55));
  });

  it("saldırı/savunma dağılımının ortalaması 1 (toplam güç değişmez); süvari saldırgan, okçu/mızraklı savunmacı", () => {
    for (const t of ["okcu", "suvari", "mizrakli", "karma"] as const) {
      const d = dusmanSaldiriSavunma(t);
      expect((d.saldiri + d.savunma) / 2).toBeCloseTo(1, 9);
    }
    expect(dusmanSaldiriSavunma("suvari").saldiri).toBeGreaterThan(dusmanSaldiriSavunma("suvari").savunma);
    expect(dusmanSaldiriSavunma("okcu").savunma).toBeGreaterThan(dusmanSaldiriSavunma("okcu").saldiri);
    expect(dusmanSaldiriSavunma("karma")).toEqual({ saldiri: 1, savunma: 1 });
  });

  it("kıyas özeti: tahmin aralığı referans ±%5, oyuncunun saldırı/savunması yazılır", () => {
    const s = asker();
    const b = birlikAl(s);
    b.savas = {
      baslangic_yili: s.yil, seferberlik: null, seferberlik_er: 0, yil_sayac: 0, sonuc: null, olu_toplam: 0, firar_toplam: 0,
      arazi: "ova", inisiyatif: "savunma", dusman_orani: 1, dusman_tur: "karma", kanat_zafer: 0, kanat_yenilgi: 0, genel_zafer: 0, genel_yenilgi: 0,
    };
    const k = savasKiyasiHesapla(s, isletmeBaglami(s));
    const ref = dusmanReferansGucuYas(s.yas) * dusmanAraziCarpani("ova", "karma");
    expect(k.dusman.guc[0]).toBe(Math.round(ref * 0.95));
    expect(k.dusman.guc[1]).toBe(Math.round(ref * 1.05));
    expect(k.oyuncu.saldiri).toBeGreaterThan(0);
    expect(erSayisi(s)).toBeGreaterThan(0);
  });
});

describe("Asker bütçesi: Kazanç kutusu tutarlı", () => {
  it("gelir ve gider kalemleri dolu; net = brüt − subay maaşı", () => {
    const s = asker();
    s.meslek_musteri = 60;
    const b = isletmeButcesi(s, isletmeBaglami(s));
    expect(b.satis).toBeGreaterThan(0);
    expect(b.alim).toBeGreaterThan(0);
    expect(b.net).toBeCloseTo(b.brut - b.maas, 1);
  });

  it("subay maaşı net'ten düşer", () => {
    const s = asker();
    s.meslek_musteri = 60;
    const maassiz = isletmeButcesi(s, isletmeBaglami(s)).net;
    s.ekip = [{ id: "o1", isim: "Test", rol: "Harp subayı", rol_turu: "ana", maas: 5, sadakat: 70, gercekKalite: 60, y_giris: 60, s_giris: 70, maas_taban: 5 } as never];
    const maasli = isletmeButcesi(s, isletmeBaglami(s)).net;
    expect(maasli).toBeCloseTo(maassiz - 5, 1);
  });
});
