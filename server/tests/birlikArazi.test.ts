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

  it("her arazide her birliğin (piyade/mızraklı/okçu/süvari) çarpanı var ve her birlik kendi arazi profiline sahip, piyade 1,00", () => {
    for (const a of ARAZI_SIRASI) {
      const satir = ARAZI_CARPANLARI[a];
      expect(Object.keys(satir).sort()).toEqual(["kusatma", "mizrakli", "okcu", "piyade", "suvari", "zirhli"]);
      for (const v of Object.values(satir)) {
        expect(v).toBeGreaterThanOrEqual(0.8);
        expect(v).toBeLessThanOrEqual(1.6);
      }
      expect(satir.piyade).toBe(1);
    }
    // Piyade dışı her birlik toplamda ≈ bakımıyla orantılı (3 arazi toplamı 3,3–3,8), piyade 3,0; zırhlı hiçbir arazide zayıf değil.
    for (const t of ["okcu", "suvari", "mizrakli", "zirhli"] as const) {
      const top = ARAZI_CARPANLARI.ova[t] + ARAZI_CARPANLARI.dag[t] + ARAZI_CARPANLARI.orman[t];
      expect(top).toBeGreaterThan(3.3);
      expect(top).toBeLessThan(3.8);
    }
    expect(Math.min(ARAZI_CARPANLARI.ova.zirhli, ARAZI_CARPANLARI.dag.zirhli, ARAZI_CARPANLARI.orman.zirhli)).toBeGreaterThanOrEqual(1.2);
    // Her birliğin kendine göre en iyi arazisi var: süvari ova, okçu orman, mızraklı dağ; piyade her yerde 1,00.
    expect(ARAZI_CARPANLARI.ova.suvari).toBeGreaterThan(ARAZI_CARPANLARI.dag.suvari);
    expect(ARAZI_CARPANLARI.dag.okcu).toBeGreaterThan(ARAZI_CARPANLARI.ova.okcu);
    expect(ARAZI_CARPANLARI.dag.mizrakli).toBeGreaterThan(ARAZI_CARPANLARI.orman.mizrakli);
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
    // karma = beş sınıfın ortalaması, üç arazide ortalaması 1 olacak şekilde normalleştirilir
    const ort = (["ova", "dag", "orman"] as const).reduce((t, ar) => t + dusmanAraziCarpani(ar, "karma"), 0) / 3;
    expect(ort).toBeCloseTo(1, 9);
    expect(dusmanAraziCarpani("ova", "karma")).toBeGreaterThan(k.piyade * 0.9);
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
    for (const t of ["okcu", "suvari", "mizrakli", "zirhli", "karma"] as const) {
      const d = dusmanSaldiriSavunma(t);
      expect((d.saldiri + d.savunma) / 2).toBeCloseTo(1, 9);
    }
    expect(dusmanSaldiriSavunma("suvari").saldiri).toBeGreaterThan(dusmanSaldiriSavunma("suvari").savunma);
    expect(dusmanSaldiriSavunma("mizrakli").savunma).toBeGreaterThan(dusmanSaldiriSavunma("mizrakli").saldiri);
    expect(dusmanSaldiriSavunma("zirhli").savunma).toBeGreaterThan(dusmanSaldiriSavunma("zirhli").saldiri);
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

describe("savaş planı: ikmal sonradan Ordu ekranından değişir", () => {
  it("savaş yokken ya da plan tamamlanmadan değiştirilemez; sonra ücretsiz değişir", async () => {
    const { ikmalDegistir, savasKarariVer, savasKarariDurumu } = await import("../src/game/birlikIslem");
    const s = asker();
    const bg = isletmeBaglami(s);
    expect(() => ikmalDegistir(s, "yagma_sert", bg)).toThrow(/savaş sürerken/);
    s.ulke.savasta = true;
    // Plan penceresi: seferberlik + emir + ikmal tek grupta.
    const d = savasKarariDurumu(s, bg)!;
    expect(d.grup).toBe("plan");
    expect(d.adimlar.map((a) => a.adim)).toEqual(["seferberlik", "emir", "ikmal"]);
    expect(() => ikmalDegistir(s, "yagma_sert", bg)).toThrow(/savaş sürerken|savaş planını/);
    for (const a of d.adimlar) savasKarariVer(s, a.secenekler[0].id, bg);
    expect(birlikAl(s).savas!.ikmal).toBe("yagma_sert");
    expect(ikmalDegistir(s, "yagma_yumusak", bg)).toBe("yagma_yumusak");
    expect(birlikAl(s).savas!.ikmal).toBe("yagma_yumusak");
    expect(() => ikmalDegistir(s, "olmayan", bg)).toThrow(/Geçersiz/);
    // İkinci kez plan penceresi açılmaz.
    expect(savasKarariDurumu(s, bg)).toBeNull();
  });
});
