import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  enflasyonCarpani,
  paraYuvarla,
  zorunluBagisKontrolEt,
  rakipSoygunKontrolEt,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslamaliMi,
  vebaBaslat,
  vebaYillikKontrol,
  vebaHastaligiKontrol,
  vebaHastaligiBaslatEt,
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

  it("Sanayi Devrimi'nde gelir enflasyonu yılda %2 büyür (Orta Çağ'dan belirgin şekilde hızlı)", () => {
    const state = taze("Sanayi Devrimi");
    state.yil = state.baslangic_yili + 10;
    expect(enflasyonCarpani(state)).toBeCloseTo(Math.pow(1.02, 10), 6);
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

  it("eşik aşılmış + cooldown dolmuşken makul sürede tetiklenir ve servetin %20-25'ini alır", () => {
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
    // ZORUNLU_BAGIS_ORAN_MIN 0.20 + ARALIK 0.05 → toplam servetin %20-25'i (jitter/yuvarlama payıyla).
    expect(sonuc!.miktar).toBeGreaterThan(5000 * 0.19);
    expect(sonuc!.miktar).toBeLessThan(5000 * 0.26);
  });
});

describe("rakipSoygunKontrolEt — çok nakitle dolaşırken rakip parayı alıp kaçar", () => {
  it("nakit eşiğin (150) altındayken asla tetiklenmez", () => {
    const state = taze();
    state.para = 120;
    for (let i = 0; i < 300; i++) {
      expect(rakipSoygunKontrolEt(state, 1)).toBeNull();
    }
  });

  it("hapiste/yolculukta iken tetiklenmez", () => {
    const state = taze();
    state.para = 5000;
    state.yil = state.baslangic_yili + 20;
    state.etiketler.push("yolculukta");
    for (let i = 0; i < 300; i++) {
      expect(rakipSoygunKontrolEt(state, 1)).toBeNull();
    }
  });

  it("cooldown dolmadan tetiklenmez", () => {
    const state = taze();
    state.para = 5000;
    state.son_rakip_soygun_yili = state.yil;
    for (let i = 0; i < 300; i++) {
      expect(rakipSoygunKontrolEt(state, 1)).toBeNull();
    }
  });

  it("eşik + cooldown dolmuşken tetiklenir, nakitin %25-45'ini alır, ilişkiyi bozar", () => {
    const state = taze();
    state.para = 5000;
    state.yil = state.baslangic_yili + 30;
    const rakipOnce = state.rakip_puani;
    let sonuc = null;
    for (let i = 0; i < 4000 && !sonuc; i++) {
      state.para = 5000;
      state.son_rakip_soygun_yili = null;
      state.yil = state.baslangic_yili + 30;
      sonuc = rakipSoygunKontrolEt(state, 1);
    }
    expect(sonuc).not.toBeNull();
    expect(sonuc!.miktar).toBeGreaterThan(5000 * 0.24);
    expect(sonuc!.miktar).toBeLessThan(5000 * 0.46);
    expect(sonuc!.mesaj).toContain(state.rakip_adi);
    expect(state.son_rakip_soygun_yili).toBe(state.yil);
    expect(state.rakip_puani).toBeLessThan(rakipOnce);
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

  it("dalga bittikten sonra 25 yıl cooldown boyunca tetiklenmez, sonra tekrar tetiklenebilir", () => {
    const state = taze();
    state.yas = 40;
    state.veba_gecirdi = true;
    // Cooldown içinde (dalga 5 yıl önce bitti): asla tetiklenmez.
    state.son_veba_bitis_yili = state.yil - 5;
    for (let i = 0; i < 500; i++) {
      expect(vebaBaslamaliMi(state, 2)).toBe(false);
    }
    // Cooldown dolmuş (25 yıl önce): artık yeniden tetiklenebilir.
    state.son_veba_bitis_yili = state.yil - 25;
    let tekrar = false;
    for (let i = 0; i < 400 && !tekrar; i++) tekrar = vebaBaslamaliMi(state, 2);
    expect(tekrar).toBe(true);
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
    expect(v.bitisYili - v.baslangicYili).toBeGreaterThanOrEqual(5);
    expect(v.bitisYili - v.baslangicYili).toBeLessThanOrEqual(7);
    expect(v.etkiBitisYili - v.bitisYili).toBeGreaterThanOrEqual(10);
    expect(v.etkiBitisYili - v.bitisYili).toBeLessThanOrEqual(15);
    expect(v.konutKiraCarpani).toBeGreaterThanOrEqual(0.6);
    expect(v.konutKiraCarpani).toBeLessThanOrEqual(0.7);
    expect(v.gelirCarpani).toBeGreaterThanOrEqual(1.2);
    expect(v.gelirCarpani).toBeLessThanOrEqual(1.3);
  });

  it("önlem alınmışsa hastalığı KAPMA oranı önlem alınmamıştan belirgin şekilde düşüktür", () => {
    let kapanOnlemsiz = 0;
    let kapanOnlemli = 0;
    const DENEME = 2000;
    for (let i = 0; i < DENEME; i++) {
      const onlemsiz = taze();
      vebaBaslat(onlemsiz, 0);
      if (vebaYillikKontrol(onlemsiz, 1).hastalandi) kapanOnlemsiz++;

      const onlemli = taze();
      vebaBaslat(onlemli, 2);
      if (vebaYillikKontrol(onlemli, 1).hastalandi) kapanOnlemli++;
    }
    expect(kapanOnlemsiz).toBeGreaterThan(0);
    expect(kapanOnlemli).toBeLessThan(kapanOnlemsiz);
  });

  it("hastalığı kapan karakter 'veba_hastasi' etiketi + ~%70 ölüm riski alır (ölmez)", () => {
    const state = taze();
    state.yas = 30;
    vebaBaslat(state, 0);
    let denemeSayisi = 0;
    while (!state.etiketler.includes("veba_hastasi") && denemeSayisi < 5000) {
      vebaYillikKontrol(state, 1);
      denemeSayisi++;
    }
    expect(state.etiketler.includes("veba_hastasi")).toBe(true);
    expect(state.veba_olum_riski).toBe(70);
    expect(state.aktif).toBe(true);
  });

  it("vebaHastaligiKontrol: ölmezse risk düşer, eşik altında iyileşir (etiket silinir)", () => {
    const state = taze();
    vebaHastaligiBaslatEt(state);
    expect(state.veba_olum_riski).toBe(70);
    // Riski elle düşürüp iyileşmeyi zorla (tek turda eşik altına insin).
    state.veba_olum_riski = 20;
    let iyilesti = false;
    for (let i = 0; i < 50 && !iyilesti; i++) {
      const sonuc = vebaHastaligiKontrol(state);
      if (sonuc.karakterOldu) {
        // düşük riskte de nadiren ölebilir; yeniden hastalandır ve dene
        vebaHastaligiBaslatEt(state);
        state.veba_olum_riski = 20;
        continue;
      }
      iyilesti = sonuc.iyilesti;
    }
    expect(iyilesti).toBe(true);
    expect(state.etiketler.includes("veba_hastasi")).toBe(false);
    expect(state.veba_olum_riski).toBe(0);
  });

  it("vebaHastaligiKontrol: yüksek riskte karakter ölebilir (sinyal döner)", () => {
    let oldu = false;
    for (let i = 0; i < 200 && !oldu; i++) {
      const state = taze();
      vebaHastaligiBaslatEt(state);
      state.veba_olum_riski = 95;
      oldu = vebaHastaligiKontrol(state).karakterOldu;
    }
    expect(oldu).toBe(true);
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
    // Şok +2 yıl geçerli (kucukKriz pasifEkonomi'den SONRA çağrıldığı için +1
    // hiç tahsil edilemiyordu — eski hata).
    expect(state.gida_fiyat_sok_bitis_yili).toBe(state.yil + 2);
    expect(state.kucuk_kriz_sonraki_yil).toBeGreaterThanOrEqual(state.yil + 5);
    expect(state.kucuk_kriz_sonraki_yil).toBeLessThanOrEqual(state.yil + 7);
  });

  it("gıda şoku tetik turunda ve bir sonraki turda ×2, iki tur sonra normale döner", () => {
    const state = taze();
    const giderOncesi = giderKalemleriHesapla(state).yasam;

    state.kucuk_kriz_sonraki_yil = state.yil;
    kucukKrizKontrolEt(state, 1); // gida_fiyat_sok_bitis_yili = state.yil + 2

    expect(giderKalemleriHesapla(state).yasam).toBeGreaterThan(giderOncesi * 1.8); // tetik turu ×2

    state.yil += 1; // bir sonraki tur — şok HÂLÂ geçerli (asıl tahsilat burada)
    expect(giderKalemleriHesapla(state).yasam).toBeGreaterThan(giderOncesi * 1.8);

    state.yil += 1; // iki tur sonra — normale döner
    expect(giderKalemleriHesapla(state).yasam).toBeLessThan(giderOncesi * 1.2);
  });
});
