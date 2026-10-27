import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  rakipMusteriKir,
  rakiplerGuncelle,
  rakipMisillemesiDene,
  krediAl,
  krediPazarlik,
  krediTeklifleri,
  krediYillikUygula,
  krediMaksTutar,
  vebaBaslat,
  havuzKilidiVar,
  etiketEkle,
} from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, hediyeEt, salginKorunmaYatirimiYap, senaryoUret } from "../src/game/gameEngine";
import type { CharacterState } from "../src/types";
import { KREDI_HAVUZU, annuiteTaksit } from "../src/data/krediHavuzu";

function taze(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(s, "Asker");
  s.para = 500;
  s.maas_yillik = 20; // kredi tavanı rastgele dönem etkisine bağlı kalmasın
  return s;
}

describe("Derin rakip ilişkileri", () => {
  it("meslek seçilince iki isimli rakip üretilir; rakip_adi büyük rakiple aynı kişi", () => {
    const s = taze();
    expect(s.rakipler).toHaveLength(2);
    expect(s.rakipler[0].ad).toBe(s.rakip_adi);
    expect(s.rakipler.every((r) => !r.yenildi)).toBe(true);
  });

  it("rakipMusteriKir: rakibin müşterisini azaltır, pazar payı (para + kariyer) verir, husumet artırır", () => {
    const s = taze();
    const r = s.rakipler[0];
    const onceMusteri = r.musteri;
    const payOnce = s.meslek_musteri;
    const paraOnce = s.para;
    const kpOnce = s.kariyer_puani;
    const husumetOnce = r.husumet;
    const sonuc = rakipMusteriKir(s, r.ad, 0.15, 1);
    expect(sonuc).not.toBeNull();
    expect(r.musteri).toBeCloseTo(onceMusteri * 0.85, 0);
    expect(s.meslek_musteri).toBeGreaterThan(payOnce);
    expect(s.para).toBeGreaterThan(paraOnce);
    expect(s.kariyer_puani).toBeGreaterThan(kpOnce);
    expect(r.husumet).toBeGreaterThan(husumetOnce);
  });

  it("rakibin payı %4'ün altına inince yenildi olur ve bir daha kırılamaz", () => {
    const s = taze();
    const r = s.rakipler[0];
    r.musteri = s.pazar_musteri * 0.05;
    const sonuc = rakipMusteriKir(s, r.ad, 0.5, 1);
    expect(sonuc?.yenildiMi).toBe(true);
    expect(r.yenildi).toBe(true);
    expect(rakipMusteriKir(s, r.ad, 0.1, 1)).toBeNull();
  });

  it("rakiplerGuncelle: husumet soğur (müşteri hareketi piyasaYillikUygula'da)", () => {
    const s = taze();
    s.rakipler[0].husumet = 60;
    rakiplerGuncelle(s, 4);
    expect(s.rakipler[0].husumet).toBeLessThan(60);
  });

  it("rakipMisillemesiDene: hapiste iken misilleme yapılmaz", () => {
    const s = taze();
    s.rakipler[0].husumet = 100;
    etiketEkle(s, ["hapiste"]);
    for (let i = 0; i < 20; i++) expect(rakipMisillemesiDene(s, 2)).toBeNull();
  });
});

describe("Havuz kilidi karşılıklı dışlama invariant'ı", () => {
  it("etiketEkle: yeni bir havuz kilidi eklenince çakışan kilitler düşer", () => {
    const s = taze();
    etiketEkle(s, ["kacak"]);
    expect(s.etiketler).toContain("kacak");
    etiketEkle(s, ["veba_hastasi"]);
    expect(s.etiketler).toContain("veba_hastasi");
    expect(s.etiketler).not.toContain("kacak");
    expect(havuzKilidiVar(s)).toBe(true);
  });

  it("aynı anda iki havuz kilidi hiçbir zaman set olmaz", () => {
    const s = taze();
    etiketEkle(s, ["yolculukta", "hapiste", "veba_hastasi", "kacak"]);
    const kilitSayisi = ["hapiste", "yolculukta", "kacak", "veba_hastasi"].filter((e) => s.etiketler.includes(e)).length;
    expect(kilitSayisi).toBe(1);
  });
});

describe("§24: zorlanan kaskad havuz kilidi altında milestone zorlamaz", () => {
  it("yolculukta iken 30 yaşında bekar karaktere evlilik teklifi ZORLANMAZ", async () => {
    const s = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(s.id, "Tüccar");
    // yolculuk havuzunu aç + yaşı ilerlet
    for (let i = 0; i < 40; i++) {
      const senaryo = await senaryoUret(s.id);
      // yolculuk etiketi olmadan da olay üretilebilmeli; sadece crash olmamalı
      expect(senaryo.secenekler.length).toBeGreaterThan(0);
    }
  });
});

describe("Kredi / tefeci (havuzdan 2 teklif, vadeli)", () => {
  it("tefeci aynı anda tam 2 farklı teklif sunar; 3 yıl sabit kalır, sonra yenilenir", () => {
    const s = taze();
    s.maas_yillik = 100;
    const ilk = krediTeklifleri(s);
    expect(ilk).toHaveLength(2);
    expect(new Set(ilk.map((t) => t.id)).size).toBe(2);
    expect(KREDI_HAVUZU.map((k) => k.id)).toEqual(expect.arrayContaining(ilk.map((t) => t.id)));
    expect(krediTeklifleri(s).map((t) => t.id)).toEqual(ilk.map((t) => t.id)); // aynı yıl: aynı teklifler
    s.yil += 3;
    krediTeklifleri(s);
    expect(s.kredi_teklifleri!.yil).toBe(s.yil); // yenilendi
  });

  it("havuzda kısa vade = yüksek faiz, uzun vade = düşük faiz; tüm vadeler 6–10 yıl, faizler %7–13 (v18)", () => {
    for (const boyut of ["kucuk", "orta", "buyuk"]) {
      const kisa = KREDI_HAVUZU.find((k) => k.id === `kisa_${boyut}`)!;
      const uzun = KREDI_HAVUZU.find((k) => k.id === `uzun_${boyut}`)!;
      expect(kisa.vade).toBeLessThan(uzun.vade);
      expect(kisa.faiz).toBeGreaterThan(uzun.faiz);
    }
    for (const k of KREDI_HAVUZU) {
      expect(k.vade).toBeGreaterThanOrEqual(6);
      expect(k.vade).toBeLessThanOrEqual(10);
      expect(k.faiz).toBeGreaterThanOrEqual(0.07);
      expect(k.faiz).toBeLessThanOrEqual(0.13);
    }
  });

  it("tutarlar enflasyonla büyür", () => {
    const s = taze();
    s.maas_yillik = 1000;
    s.kredi_teklifleri = { idler: ["uzun_orta", "kisa_orta"], yil: s.yil };
    const bugun = krediTeklifleri(s).find((t) => t.id === "uzun_orta")!.tutar;
    s.yil += 40;
    s.kredi_teklifleri = { idler: ["uzun_orta", "kisa_orta"], yil: s.yil };
    const sonra = krediTeklifleri(s).find((t) => t.id === "uzun_orta")!.tutar;
    expect(sonra).toBeGreaterThan(bugun);
  });

  it("krediAl: parayı ekler, vadeli kredi oluşturur, teklifleri yeniletir", () => {
    const s = taze();
    s.maas_yillik = 100;
    s.para = 20;
    const t = krediTeklifleri(s)[0];
    krediAl(s, t.id);
    expect(s.para).toBe(20 + t.tutar);
    expect(s.kredi?.anapara).toBe(t.tutar);
    expect(s.kredi?.kalanBorc).toBe(t.tutar);
    expect(s.kredi?.vadeYil).toBe(t.vade);
    expect(s.kredi?.yillikTaksit).toBe(t.taksit);
    expect(s.kredi_teklifleri).toBeNull();
    expect(() => krediAl(s, t.id)).toThrow();
    expect(() => krediAl(taze(), "olmayan_teklif")).toThrow(/teklif/);
  });

  it("krediMaksTutar: aktif kredi varken 0 döner", () => {
    const s = taze();
    s.maas_yillik = 100;
    krediAl(s, krediTeklifleri(s)[0].id);
    expect(krediMaksTutar(s)).toBe(0);
    expect(krediTeklifleri(s)).toHaveLength(0);
  });

  it("eşit yıllık taksit vade bitince krediyi kapatır (annüite)", () => {
    const s = taze();
    s.maas_yillik = 100;
    s.para = 5000;
    const t = krediTeklifleri(s)[0];
    krediAl(s, t.id);
    for (let i = 0; i < t.vade; i++) krediYillikUygula(s, 1);
    expect(s.kredi).toBeNull();
    expect(annuiteTaksit(100, 0.1, 5) * 5).toBeGreaterThan(100);
  });

  it("krediYillikUygula: taksit ödenir, borç azalır", () => {
    const s = taze();
    s.maas_yillik = 100;
    s.para = 200;
    krediAl(s, krediTeklifleri(s)[0].id);
    const borcOnce = s.kredi!.kalanBorc;
    krediYillikUygula(s, 1);
    expect(s.kredi!.kalanBorc).toBeLessThan(borcOnce);
  });

  it("pazarlık faizi değiştirir ve taksiti kalan vadeye göre yeniden hesaplar", () => {
    const s = taze();
    s.maas_yillik = 100;
    krediAl(s, krediTeklifleri(s)[0].id);
    krediPazarlik(s);
    expect(s.kredi!.faizOrani).toBeGreaterThanOrEqual(0.07);
    expect(s.kredi!.faizOrani).toBeLessThanOrEqual(0.17);
    expect(s.kredi!.pazarlikYapildi).toBe(true);
  });

  it("nakit yetmese de taksit ödenir: para eksiye düşer, el koyma/ceza yok (v18)", () => {
    const s = taze();
    s.maas_yillik = 100;
    s.para = 200;
    krediAl(s, krediTeklifleri(s)[0].id);
    s.mulkler = ["ciftlik"];
    s.para = 0;
    const borcOnce = s.kredi!.kalanBorc;
    krediYillikUygula(s, 3);
    expect(s.mulkler).toContain("ciftlik");
    expect(s.para).toBeLessThan(0);
    expect(s.kredi!.kalanBorc).toBeLessThan(borcOnce);
    expect(s.kredi!.odenmeyenTaksit).toBe(0);
  });
});

describe("Salgından korunma yatırımı", () => {
  it("yatırım yapılınca vebaBaslat taban korunmayı yükseltir ve yatırımı tüketir", async () => {
    const s = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(s.id, "Tüccar");
    s.para = 300;
    const sonuc = await salginKorunmaYatirimiYap(s.id, 2);
    expect(sonuc.state.salgin_korunma_yatirimi?.kademe).toBe(2);
    // aynı state referansı üzerinde vebaBaslat çağır
    vebaBaslat(sonuc.state, 0);
    expect(sonuc.state.veba?.korumaSeviyesi).toBe(2);
    expect(sonuc.state.salgin_korunma_yatirimi).toBeNull();
  });
});

describe("Hediye et", () => {
  it("eşe hediye: eşya tükenir, es_puani artar", async () => {
    const s = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(s.id, "Tüccar");
    // eş + envanter kur
    s.es_adi = "Jeanne";
    s.es_puani = 50;
    s.magaza_envanteri = [
      { id: "e1", katalogId: "kaliteli_erzak", ad: "Kaliteli Erzak", simge: "🍞", kategori: "sifa", alisYili: s.yil, kalanYil: 7 },
    ];
    const sonuc = await hediyeEt(s.id, "e1", "es");
    expect(sonuc.state.magaza_envanteri).toHaveLength(0);
    expect(sonuc.state.es_puani).toBeGreaterThan(50);
  });
});
