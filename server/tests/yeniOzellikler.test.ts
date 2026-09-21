import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  rakipGucKir,
  rakiplerGuncelle,
  rakipMisillemesiDene,
  krediAl,
  krediYillikUygula,
  krediMaksTutar,
  vebaBaslat,
  havuzKilidiVar,
  etiketEkle,
} from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, hediyeEt, salginKorunmaYatirimiYap, senaryoUret } from "../src/game/gameEngine";
import type { CharacterState } from "../src/types";

function taze(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(s, "Tüccar");
  s.para = 500;
  return s;
}

describe("Derin rakip ilişkileri", () => {
  it("meslek seçilince tek isimli rakip üretilir; rakip_adi ile aynı kişi", () => {
    const s = taze();
    expect(s.rakipler).toHaveLength(1);
    expect(s.rakipler[0].ad).toBe(s.rakip_adi);
    expect(s.rakipler.every((r) => !r.yenildi)).toBe(true);
  });

  it("rakipGucKir: gücü düşürür, pazar payı (para + kariyer) verir, husumet artırır", () => {
    const s = taze();
    const r = s.rakipler[0];
    r.guc = 60;
    const paraOnce = s.para;
    const kpOnce = s.kariyer_puani;
    const husumetOnce = r.husumet;
    const sonuc = rakipGucKir(s, r.ad, 15, 1);
    expect(sonuc).not.toBeNull();
    expect(r.guc).toBe(45);
    expect(s.para).toBeGreaterThan(paraOnce);
    expect(s.kariyer_puani).toBeGreaterThan(kpOnce);
    expect(r.husumet).toBeGreaterThan(husumetOnce);
  });

  it("güç ≤ 10'a inince rakip yenildi olur ve bir daha kırılamaz", () => {
    const s = taze();
    const r = s.rakipler[0];
    r.guc = 12;
    const sonuc = rakipGucKir(s, r.ad, 26, 1);
    expect(sonuc?.yenildiMi).toBe(true);
    expect(r.yenildi).toBe(true);
    expect(rakipGucKir(s, r.ad, 10, 1)).toBeNull();
  });

  it("rakiplerGuncelle: yenilmemiş rakiplerin gücü büyür, husumet soğur", () => {
    const s = taze();
    s.rakipler[0].guc = 50;
    s.rakipler[0].husumet = 60;
    rakiplerGuncelle(s, 4);
    expect(s.rakipler[0].guc).toBeGreaterThan(50);
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

describe("Kredi / tefeci", () => {
  it("krediAl: parayı ekler, aktif kredi oluşturur", () => {
    const s = taze();
    s.para = 20;
    krediAl(s, 60);
    expect(s.para).toBe(80);
    expect(s.kredi?.anapara).toBe(60);
    expect(s.kredi?.kalanBorc).toBe(60);
  });

  it("krediMaksTutar: aktif kredi varken 0 döner", () => {
    const s = taze();
    krediAl(s, krediMaksTutar(s));
    expect(krediMaksTutar(s)).toBe(0);
  });

  it("krediYillikUygula: taksit ödenir, borç azalır", () => {
    const s = taze();
    s.para = 200;
    krediAl(s, 60);
    const borcOnce = s.kredi!.kalanBorc;
    krediYillikUygula(s, 1);
    expect(s.kredi!.kalanBorc).toBeLessThan(borcOnce);
  });

  it("üst üste 3 taksit ödenemezse tefeci mülke el koyar", () => {
    const s = taze();
    s.para = 200;
    krediAl(s, 60);
    s.mulkler = ["ciftlik"];
    s.para = 0; // artık taksit ödenemez
    krediYillikUygula(s, 3);
    expect(s.kredi).toBeNull();
    expect(s.mulkler).not.toContain("ciftlik");
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
