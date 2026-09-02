import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  enflasyonCarpani,
  paraYuvarla,
  zorunluBagisKontrolEt,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaYillikKontrol,
  vebaBitisKontrolEt,
  kucukKrizKontrolEt,
  giderKalemleriHesapla,
  hesaplaMaasYillik,
} from "../src/game/stateManager";
import type { CharacterState } from "../src/types";

function taze(cag: CharacterState["cag"] = "Orta Çağ"): CharacterState {
  const state = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "sehir_merkezi");
  mesleğiSec(state, "Tüccar");
  state.para = 1000;
  return state;
}

describe("enflasyonCarpani — çağa göre yıllık bileşik oran", () => {
  it("Orta Çağ'da yılda %1 büyür", () => {
    const state = taze("Orta Çağ");
    state.yil = state.baslangic_yili + 10;
    expect(enflasyonCarpani(state)).toBeCloseTo(Math.pow(1.01, 10), 6);
  });

  it("Sanayi Devrimi'nde yılda %3 büyür (Orta Çağ'dan belirgin şekilde hızlı)", () => {
    const state = taze("Sanayi Devrimi");
    state.yil = state.baslangic_yili + 10;
    expect(enflasyonCarpani(state)).toBeCloseTo(Math.pow(1.03, 10), 6);
    expect(enflasyonCarpani(state)).toBeGreaterThan(Math.pow(1.01, 10));
  });

  it("hiç yıl geçmediyse çarpan tam 1", () => {
    const state = taze("Orta Çağ");
    expect(enflasyonCarpani(state)).toBe(1);
  });
});

describe("paraYuvarla — para 2 ondalık basamağa yuvarlanır", () => {
  it("2 basamaktan fazlasını keser", () => {
    expect(paraYuvarla(12.3456)).toBe(12.35);
    expect(paraYuvarla(10)).toBe(10);
  });
});

describe("zorunluBagisKontrolEt", () => {
  it("servet eşiğin altındayken asla tetiklenmez", () => {
    const state = taze();
    state.para = 100;
    for (let i = 0; i < 200; i++) {
      expect(zorunluBagisKontrolEt(state, 1)).toBeNull();
    }
  });

  it("eşik aşılsa da cooldown dolmadan tetiklenmez", () => {
    const state = taze();
    state.para = 5000;
    state.son_zorunlu_bagis_yili = state.yil; // az önce tetiklenmiş
    for (let i = 0; i < 200; i++) {
      expect(zorunluBagisKontrolEt(state, 1)).toBeNull();
    }
  });

  it("hapiste/yolculukta iken tetiklenmez", () => {
    const state = taze();
    state.para = 5000;
    state.etiketler.push("hapiste");
    for (let i = 0; i < 200; i++) {
      expect(zorunluBagisKontrolEt(state, 1)).toBeNull();
    }
  });

  it("eşik aşılmış + cooldown dolmuşken makul sürede tetiklenir ve servetin %15-20'sini alır", () => {
    const state = taze();
    state.para = 5000;
    state.yil = state.baslangic_yili + 10; // 5 yıllık cooldown zaten dolmuş olsun
    let sonuc = null;
    for (let i = 0; i < 100 && !sonuc; i++) {
      sonuc = zorunluBagisKontrolEt(state, 2);
    }
    expect(sonuc).not.toBeNull();
    expect(sonuc!.miktar).toBeGreaterThan(0);
    expect(state.son_zorunlu_bagis_yili).toBe(state.yil);
    // %15-20 aralığı yaklaşık toplam servetin üstünden kontrol edilir (jitter/yuvarlama payı ile).
    expect(sonuc!.miktar).toBeGreaterThan(5000 * 0.14);
    expect(sonuc!.miktar).toBeLessThan(5000 * 0.21);
  });
});

describe("buyukSavasKontrolEt / buyukSavasBitisKontrolEt", () => {
  it("zaten savaştayken asla ikinci bir savaş başlatmaz", () => {
    const state = taze();
    state.ulke.savasta = true;
    state.son_buyuk_savas_bitis_yili = state.baslangic_yili - 100;
    for (let i = 0; i < 200; i++) {
      expect(buyukSavasKontrolEt(state, 2)).toBeNull();
    }
  });

  it("10 yıllık cooldown dolmadan tetiklenmez", () => {
    const state = taze();
    state.yil = state.baslangic_yili + 5;
    for (let i = 0; i < 200; i++) {
      expect(buyukSavasKontrolEt(state, 2)).toBeNull();
    }
  });

  it("cooldown dolunca makul sürede tetiklenir; parametreler beklenen aralıkta", () => {
    const state = taze();
    state.yil = state.baslangic_yili + 15;
    let mesaj: string | null = null;
    for (let i = 0; i < 200 && !mesaj; i++) {
      mesaj = buyukSavasKontrolEt(state, 1);
    }
    expect(mesaj).not.toBeNull();
    expect(state.ulke.savasta).toBe(true);
    expect(state.buyuk_savas).not.toBeNull();
    const savas = state.buyuk_savas!;
    expect(savas.dusman).toBeTruthy();
    expect(savas.bitisYili - savas.baslangicYili).toBeGreaterThanOrEqual(3);
    expect(savas.bitisYili - savas.baslangicYili).toBeLessThanOrEqual(6);
    expect(savas.vergiOrani).toBeGreaterThanOrEqual(0.15);
    expect(savas.vergiOrani).toBeLessThanOrEqual(0.2);
    expect(savas.gidaCarpani).toBeGreaterThanOrEqual(1.25);
    expect(savas.gidaCarpani).toBeLessThanOrEqual(1.35);
  });

  it("bitiş yılına ulaşınca savaş sona erer ve cooldown yeniden kurulur", () => {
    const state = taze();
    state.ulke.savasta = true;
    state.buyuk_savas = {
      dusman: "Test Düşmanı",
      baslangicYili: state.yil - 4,
      bitisYili: state.yil,
      vergiOrani: 0.17,
      gidaCarpani: 1.3,
    };
    const mesaj = buyukSavasBitisKontrolEt(state);
    expect(mesaj).not.toBeNull();
    expect(state.ulke.savasta).toBe(false);
    expect(state.buyuk_savas).toBeNull();
    expect(state.son_buyuk_savas_bitis_yili).toBe(state.yil);
  });

  it("savaş sırasında yaşam giderine gıda çarpanı ve ayrı bir savaş vergisi kalemi biner", () => {
    // Aynı karakter üzerinde önce/sonra karşılaştırılır (bkz. veba testindeki not).
    const state = taze();
    const giderSavassiz = giderKalemleriHesapla(state);
    expect(giderSavassiz.savasVergisi).toBe(0);

    state.ulke.savasta = true;
    state.buyuk_savas = {
      dusman: "Test Düşmanı",
      baslangicYili: state.yil,
      bitisYili: state.yil + 4,
      vergiOrani: 0.18,
      gidaCarpani: 1.3,
    };
    const giderSavasli = giderKalemleriHesapla(state);

    expect(giderSavasli.yasam).toBeGreaterThan(giderSavassiz.yasam);
    expect(giderSavasli.savasVergisi).toBeGreaterThan(0);
  });
});

describe("vebaBaslamaliMi / vebaBaslat / vebaYillikKontrol / vebaBitisKontrolEt", () => {
  it("18 yaşından küçükken asla tetiklenmez", () => {
    const state = taze();
    state.yas = 15;
    for (let i = 0; i < 500; i++) {
      expect(vebaBaslamaliMi(state, 2)).toBe(false);
    }
  });

  it("bir kez geçirdikten sonra asla tekrar tetiklenmez", () => {
    const state = taze();
    state.yas = 30;
    state.veba_gecirdi = true;
    for (let i = 0; i < 500; i++) {
      expect(vebaBaslamaliMi(state, 2)).toBe(false);
    }
  });

  it("uygun yaşta makul sürede tetiklenir", () => {
    const state = taze();
    state.yas = 30;
    let tetiklendi = false;
    for (let i = 0; i < 300 && !tetiklendi; i++) {
      tetiklendi = vebaBaslamaliMi(state, 2);
    }
    expect(tetiklendi).toBe(true);
  });

  it("vebaBaslat parametreleri beklenen aralıkta üretir ve veba_gecirdi'yi kalıcı işaretler", () => {
    const state = taze();
    vebaBaslat(state, 0);
    expect(state.veba_gecirdi).toBe(true);
    const v = state.veba!;
    expect(v.aktif).toBe(true);
    expect(v.bitisYili - v.baslangicYili).toBeGreaterThanOrEqual(2);
    expect(v.bitisYili - v.baslangicYili).toBeLessThanOrEqual(4);
    expect(v.etkiBitisYili - v.bitisYili).toBeGreaterThanOrEqual(10);
    expect(v.etkiBitisYili - v.bitisYili).toBeLessThanOrEqual(15);
    expect(v.konutKiraCarpani).toBeGreaterThanOrEqual(0.6);
    expect(v.konutKiraCarpani).toBeLessThanOrEqual(0.7);
    expect(v.gelirCarpani).toBeGreaterThanOrEqual(1.2);
    expect(v.gelirCarpani).toBeLessThanOrEqual(1.3);
  });

  it("önlem alınmışsa ölüm riski önlem alınmamıştan belirgin şekilde düşüktür", () => {
    let olumluOnlemsiz = 0;
    let olumluOnlemli = 0;
    const DENEME = 2000;
    for (let i = 0; i < DENEME; i++) {
      const onlemsiz = taze();
      vebaBaslat(onlemsiz, 0);
      if (vebaYillikKontrol(onlemsiz, 1).karakterOldu) olumluOnlemsiz++;

      const onlemli = taze();
      vebaBaslat(onlemli, 2);
      if (vebaYillikKontrol(onlemli, 1).karakterOldu) olumluOnlemli++;
    }
    expect(olumluOnlemsiz).toBeGreaterThan(0);
    expect(olumluOnlemli).toBeLessThan(olumluOnlemsiz);
  });

  it("aktif faz bitince ulke.vebada kapanır ama iz (state.veba) etkiBitisYili'ne kadar sürer", () => {
    const state = taze();
    vebaBaslat(state, 2);
    state.ulke.vebada = true;
    state.veba!.bitisYili = state.yil; // aktif fazı hemen bitir

    const mesaj = vebaBitisKontrolEt(state);
    expect(mesaj).not.toBeNull();
    expect(state.ulke.vebada).toBe(false);
    expect(state.veba).not.toBeNull();
    expect(state.veba!.aktif).toBe(false);

    // İz süresi de dolunca state.veba tamamen temizlenir.
    state.veba!.etkiBitisYili = state.yil;
    vebaBitisKontrolEt(state);
    expect(state.veba).toBeNull();
  });

  it("veba izi sürerken kira düşer, maaş artar", () => {
    // Aynı karakter üzerinde önce/sonra karşılaştırılır — iki ayrı createCharacter
    // çağrısı aile/kişilik gibi rastgele farklarla veba etkisini gölgeleyebilir.
    const state = taze();
    const giderNormal = giderKalemleriHesapla(state);
    const maasNormal = hesaplaMaasYillik(state);

    vebaBaslat(state, 2);
    state.veba!.aktif = false; // aktif faz bitmiş, sadece iz sürüyor
    const giderIzli = giderKalemleriHesapla(state);
    const maasIzli = hesaplaMaasYillik(state);

    expect(giderIzli.konut).toBeLessThan(giderNormal.konut);
    expect(maasIzli).toBeGreaterThan(maasNormal);
  });
});

describe("kucukKrizKontrolEt", () => {
  it("eşik yılına ulaşılmadan tetiklenmez", () => {
    const state = taze();
    state.kucuk_kriz_sonraki_yil = state.yil + 5;
    expect(kucukKrizKontrolEt(state, 3)).toBeNull();
  });

  it("başka bir kriz zaten aktifken tetiklenmez", () => {
    const state = taze();
    state.kucuk_kriz_sonraki_yil = state.yil;
    state.ulke.kriz = { tur: "altin_cag", bitisYili: state.yil + 5 };
    expect(kucukKrizKontrolEt(state, 1)).toBeNull();
  });

  it("eşiğe ulaşılınca kıtlık başlatır, o yıla mahsus gıda şoku ekler ve eşiği yeniden kurar", () => {
    const state = taze();
    state.kucuk_kriz_sonraki_yil = state.yil;
    const mesaj = kucukKrizKontrolEt(state, 1);
    expect(mesaj).not.toBeNull();
    expect(state.ulke.kriz).not.toBeNull();
    expect(state.ulke.kriz!.tur).toBe("kitlik");
    expect(state.gida_fiyat_sok_bitis_yili).toBe(state.yil + 1);
    expect(state.kucuk_kriz_sonraki_yil).toBeGreaterThanOrEqual(state.yil + 5);
    expect(state.kucuk_kriz_sonraki_yil).toBeLessThanOrEqual(state.yil + 7);
  });

  it("tetiklendiği yıl gıda gideri 2 katına çıkar, sonraki yıl normale döner", () => {
    const state = taze();
    const giderOncesi = giderKalemleriHesapla(state);

    state.kucuk_kriz_sonraki_yil = state.yil;
    kucukKrizKontrolEt(state, 1);
    const giderSokYili = giderKalemleriHesapla(state);
    expect(giderSokYili.yasam).toBeCloseTo(giderOncesi.yasam * 2, 1);

    state.yil += 1; // bir sonraki tur
    const giderSonraki = giderKalemleriHesapla(state);
    expect(giderSonraki.yasam).toBeCloseTo(giderOncesi.yasam, 1);
  });
});
