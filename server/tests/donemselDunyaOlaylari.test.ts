import { describe, it, expect, vi } from "vitest";
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
  donemIlerlet,
  ilkDonemOlustur,
  ulkeGuncelle,
  giderKalemleriHesapla,
  hesaplaMaasYillik,
} from "../src/game/stateManager";
import { olaySec } from "../src/game/olaySecici";
import { pazarBuyumeOrani, vebaToparlanmasindaMi } from "../src/game/isletme";
import { VEBA_TOPARLANMA_ORAN, VEBA_TOPARLANMA_YIL } from "../src/data/dunyaDonemleri";
import type { CharacterState } from "../src/types";

/** Savaş çıkabilmesi için dönemi bolluk dışı yapar. */
function bollukDisi(state: CharacterState): void {
  state.ulke.donem = ilkDonemOlustur(state.yil, "durgunluk");
  state.ulke.donem.bitisYili = state.yil + 50;
}

/** Zar tutana kadar dener; tutunca bir yıl ilerleyip savaşı başlatır. */
function savasTetikle(state: CharacterState, deneme = 400): string | null {
  for (let i = 0; i < deneme; i++) {
    const mesaj = buyukSavasKontrolEt(state, 1);
    if (mesaj) return mesaj;
    if (state.dunya_yaklasan?.tur === "savas") state.yil = state.dunya_yaklasan.yil;
  }
  return null;
}

/** Zar tutana kadar dener; tutunca bir yıl ilerleyip vebayı başlatır. */
function vebaTetikle(state: CharacterState, deneme = 600): boolean {
  for (let i = 0; i < deneme; i++) {
    if (vebaBaslamaliMi(state, 1)) return true;
    if (state.dunya_yaklasan?.tur === "veba") state.yil = state.dunya_yaklasan.yil;
  }
  return false;
}

function taze(cag: CharacterState["cag"] = "Orta Çağ"): CharacterState {
  const state = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  mesleğiSec(state, "Asker");
  state.para = 1000;
  return state;
}

describe("enflasyonCarpani — çağa göre yıllık bileşik oran", () => {
  it("Orta Çağ'da yılda %1 büyür", () => {
    const state = taze("Orta Çağ");
    state.yil = state.baslangic_yili + 10;
    expect(enflasyonCarpani(state)).toBeCloseTo(Math.pow(1.01, 10), 6);
  });

  it("Sanayi Devrimi'nde enflasyon yılda %2.5 büyür (Orta Çağ'dan belirgin şekilde hızlı)", () => {
    const state = taze("Sanayi Devrimi");
    state.yil = state.baslangic_yili + 10;
    expect(enflasyonCarpani(state)).toBeCloseTo(Math.pow(1.025, 10), 6);
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

  it("6 yıllık bekleme dolmadan tetiklenmez", () => {
    const state = taze();
    bollukDisi(state);
    state.son_buyuk_savas_bitis_yili = state.yil - 3;
    for (let i = 0; i < 200; i++) {
      expect(buyukSavasKontrolEt(state, 2)).toBeNull();
      expect(state.dunya_yaklasan).toBeNull();
    }
  });

  it("bolluk döneminde başlamaz", () => {
    const state = taze();
    state.ulke.donem = ilkDonemOlustur(state.yil, "bolluk");
    state.ulke.donem.bitisYili = state.yil + 50;
    state.yil = state.baslangic_yili + 15;
    for (let i = 0; i < 300; i++) expect(buyukSavasKontrolEt(state, 2)).toBeNull();
    expect(state.dunya_yaklasan).toBeNull();
  });

  it("veba sürerken başlamaz", () => {
    const state = taze();
    bollukDisi(state);
    state.yil = state.baslangic_yili + 15;
    vebaBaslat(state, 0);
    state.ulke.vebada = true;
    for (let i = 0; i < 300; i++) expect(buyukSavasKontrolEt(state, 2)).toBeNull();
  });

  it("zar tutunca önce bir yıl 'yaklaşıyor' olur, sonra başlar; parametreler beklenen aralıkta", () => {
    const state = taze();
    bollukDisi(state);
    state.yil = state.baslangic_yili + 15;
    const mesaj = savasTetikle(state);
    expect(mesaj).not.toBeNull();
    expect(state.ulke.savasta).toBe(true);
    expect(state.dunya_yaklasan).toBeNull();
    const savas = state.buyuk_savas!;
    expect(savas.dusman).toBeTruthy();
    expect(savas.bitisYili - savas.baslangicYili).toBeGreaterThanOrEqual(4);
    expect(savas.bitisYili - savas.baslangicYili).toBeLessThanOrEqual(5);
    expect(savas.vergiOrani).toBeGreaterThanOrEqual(0.07);
    expect(savas.vergiOrani).toBeLessThanOrEqual(0.1);
    expect(savas.gidaCarpani).toBeGreaterThanOrEqual(1.12);
    expect(savas.gidaCarpani).toBeLessThanOrEqual(1.18);
  });

  it("olayla savaş başlarken bolluk sürüyorsa bolluk biter", () => {
    const state = taze();
    state.ulke.donem = ilkDonemOlustur(state.yil, "bolluk");
    ulkeGuncelle(state, { savasta: true });
    expect(state.ulke.savasta).toBe(true);
    expect(state.ulke.donem!.tur).not.toBe("bolluk");
  });

  it("veba sürerken olay savaş başlatamaz", () => {
    const state = taze();
    state.ulke.vebada = true;
    ulkeGuncelle(state, { savasta: true });
    expect(state.ulke.savasta).toBe(false);
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

/** Karakteri `yas` yaşına getirir (yıl da buna göre ilerler; ilk 12 yıl kuralı gerçek geçen yıla bakar). */
function yasliTaze(yas: number): CharacterState {
  const state = taze();
  state.yas = yas;
  state.yil = state.baslangic_yili + (yas - 15);
  return state;
}

describe("vebaBaslamaliMi / vebaBaslat / vebaYillikKontrol / vebaBitisKontrolEt", () => {
  it("oyunun ilk 12 yılında (27 yaşına kadar) asla tetiklenmez", () => {
    const state = yasliTaze(26);
    vi.spyOn(Math, "random").mockReturnValue(0);
    for (let i = 0; i < 100; i++) {
      expect(vebaBaslamaliMi(state, 1)).toBe(false);
      expect(state.dunya_yaklasan).toBeNull();
    }
    vi.restoreAllMocks();
  });

  it("12. yıldan sonra yıllık %5 şansla sinyal kurulur", () => {
    const state = yasliTaze(30);
    vi.spyOn(Math, "random").mockReturnValue(0.049);
    expect(vebaBaslamaliMi(state, 1)).toBe(false);
    expect(state.dunya_yaklasan?.tur).toBe("veba");
    vi.restoreAllMocks();
    const state2 = yasliTaze(30);
    vi.spyOn(Math, "random").mockReturnValue(0.051);
    expect(vebaBaslamaliMi(state2, 1)).toBe(false);
    expect(state2.dunya_yaklasan).toBeNull();
    vi.restoreAllMocks();
  });

  it("50 yaşına kadar hiç çıkmadıysa zar atmadan kesin tetiklenir", () => {
    for (let i = 0; i < 50; i++) {
      const state = yasliTaze(50);
      vi.spyOn(Math, "random").mockReturnValue(0.99); // zar asla tutmasın
      expect(vebaBaslamaliMi(state, 1)).toBe(false);
      expect(state.dunya_yaklasan?.tur).toBe("veba");
      state.yil = state.dunya_yaklasan!.yil;
      expect(vebaBaslamaliMi(state, 1)).toBe(true);
      vi.restoreAllMocks();
    }
  });

  it("49 yaşında zar tutmazsa zorlama henüz yok", () => {
    const state = yasliTaze(49);
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    for (let i = 0; i < 10; i++) expect(vebaBaslamaliMi(state, 1)).toBe(false);
    expect(state.dunya_yaklasan).toBeNull();
    vi.restoreAllMocks();
  });

  it("50'de savaş sürüyorsa savaş bitince tetiklenir", () => {
    const state = yasliTaze(51);
    state.ulke.savasta = true;
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(vebaBaslamaliMi(state, 1)).toBe(false);
    expect(state.dunya_yaklasan).toBeNull();
    state.ulke.savasta = false;
    expect(vebaBaslamaliMi(state, 1)).toBe(false);
    expect(state.dunya_yaklasan?.tur).toBe("veba");
    vi.restoreAllMocks();
  });

  it("bir ömürde TAM BİR veba: geçirilmiş vebadan sonra ne zar ne zorlama tetikler", () => {
    const state = yasliTaze(60);
    state.veba_gecirdi = true;
    state.son_veba_bitis_yili = state.yil - 30;
    vi.spyOn(Math, "random").mockReturnValue(0);
    for (let i = 0; i < 500; i++) expect(vebaBaslamaliMi(state, 2)).toBe(false);
    expect(state.dunya_yaklasan).toBeNull();
    vi.restoreAllMocks();
  });

  it("uygun yaşta makul sürede tetiklenir", () => {
    const state = yasliTaze(30);
    expect(vebaTetikle(state)).toBe(true);
  });

  it("savaş sürerken başlamaz", () => {
    const state = yasliTaze(30);
    state.ulke.savasta = true;
    expect(vebaTetikle(state, 400)).toBe(false);
  });

  it("vebaBaslat parametreleri beklenen aralıkta üretir ve veba_gecirdi'yi kalıcı işaretler", () => {
    const state = taze();
    vebaBaslat(state, 0);
    expect(state.veba_gecirdi).toBe(true);
    const v = state.veba!;
    expect(v.aktif).toBe(true);
    expect(v.bitisYili - v.baslangicYili).toBeGreaterThanOrEqual(4);
    expect(v.bitisYili - v.baslangicYili).toBeLessThanOrEqual(5);
    expect(v.etkiBitisYili).toBe(v.bitisYili); // ayrı "iz" fazı yok
    expect(v.konutKiraCarpani).toBe(1);
    expect(v.gelirCarpani).toBeGreaterThanOrEqual(1.08);
    expect(v.gelirCarpani).toBeLessThanOrEqual(1.12);
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

  it("süresi dolunca veba tamamen biter ve bekleme süresi başlar", () => {
    const state = taze();
    vebaBaslat(state, 2);
    state.ulke.vebada = true;
    state.veba!.bitisYili = state.yil;
    expect(vebaBitisKontrolEt(state)).not.toBeNull();
    expect(state.ulke.vebada).toBe(false);
    expect(state.veba).toBeNull();
    expect(state.son_veba_bitis_yili).toBe(state.yil);
  });

  it("veba sürerken işçi kıtlığı yüzünden maaş artar", () => {
    const state = taze();
    const maasNormal = hesaplaMaasYillik(state);
    vebaBaslat(state, 2);
    expect(hesaplaMaasYillik(state)).toBeGreaterThan(maasNormal);
  });
});

describe("dünya dönemleri (bolluk / durgunluk / kıtlık)", () => {
  it("yeni karakterde her zaman bir dönem vardır, ekonomi ondan türetilir", () => {
    for (let i = 0; i < 50; i++) {
      const state = taze();
      expect(state.ulke.donem).toBeTruthy();
      expect(state.ulke.ekonomi).toBe(state.ulke.donem!.tur === "bolluk" ? "iyi" : "kotu");
    }
  });

  it("aynı dönem asla arka arkaya gelmez; süreler aralıkta; savaşta bolluk gelmez", () => {
    const state = taze();
    let onceki = state.ulke.donem!;
    let gecis = 0;
    for (let yil = 0; yil < 2000; yil++) {
      state.ulke.savasta = yil % 40 < 10; // ara sıra savaş
      state.yil += 1;
      donemIlerlet(state, 1);
      const d = state.ulke.donem!;
      if (d !== onceki) {
        gecis++;
        expect(d.tur).not.toBe(onceki.tur);
        if (state.ulke.savasta) expect(d.tur).not.toBe("bolluk");
        const sure = d.bitisYili - d.baslangicYili;
        if (d.tur === "kitlik") expect(sure >= 2 && sure <= 3).toBe(true);
        else expect(sure >= 4 && sure <= 5).toBe(true);
        onceki = d;
      }
    }
    expect(gecis).toBeGreaterThan(200);
  });

  it("dönem torbası: 50 yıllık ömürlerde üç dönemin GELME sayısı birbirine yakındır", () => {
    const sayim = { bolluk: 0, durgunluk: 0, kitlik: 0 };
    const OMUR = 300;
    for (let i = 0; i < OMUR; i++) {
      const state = taze();
      let onceki = state.ulke.donem!;
      sayim[onceki.tur]++;
      for (let yil = 0; yil < 50; yil++) {
        state.yil += 1;
        donemIlerlet(state, 1);
        if (state.ulke.donem !== onceki) {
          sayim[state.ulke.donem!.tur]++;
          onceki = state.ulke.donem!;
        }
      }
    }
    const ort = (sayim.bolluk + sayim.durgunluk + sayim.kitlik) / 3;
    for (const k of ["bolluk", "durgunluk", "kitlik"] as const) {
      expect(Math.abs(sayim[k] - ort) / ort).toBeLessThan(0.12);
    }
  });

  it("dönem süreleri: bolluk/durgunluk 4–5, kıtlık 2–3 yıl; pazar oranları kullanıcı aralıklarında", () => {
    for (let i = 0; i < 300; i++) {
      const b = ilkDonemOlustur(1100, "bolluk");
      expect(b.etki.pazarBuyume).toBeGreaterThanOrEqual(0.04);
      expect(b.etki.pazarBuyume).toBeLessThanOrEqual(0.05);
      const d = ilkDonemOlustur(1100, "durgunluk");
      expect(d.etki.pazarBuyume).toBeGreaterThanOrEqual(0.01);
      expect(d.etki.pazarBuyume).toBeLessThanOrEqual(0.02);
      const k = ilkDonemOlustur(1100, "kitlik");
      expect(k.etki.pazarBuyume).toBeGreaterThanOrEqual(-0.03);
      expect(k.etki.pazarBuyume).toBeLessThanOrEqual(-0.02);
    }
  });

  it("veba ve savaş pazarı daraltır (veba −%4…5, savaş −%1.5…2.5); veba bitince 8 yıl +%2 toparlanma", () => {
    const state = taze();
    bollukDisi(state);
    vebaBaslat(state, 0);
    state.ulke.vebada = true;
    expect(state.veba!.etki!.pazarBuyume).toBeGreaterThanOrEqual(-0.05);
    expect(state.veba!.etki!.pazarBuyume).toBeLessThanOrEqual(-0.04);
    expect(pazarBuyumeOrani(state)).toBe(state.veba!.etki!.pazarBuyume);
    state.yil = state.veba!.bitisYili;
    vebaBitisKontrolEt(state);
    expect(vebaToparlanmasindaMi(state)).toBe(true);
    expect(pazarBuyumeOrani(state)).toBe(VEBA_TOPARLANMA_ORAN);
    state.yil += VEBA_TOPARLANMA_YIL - 1;
    expect(vebaToparlanmasindaMi(state)).toBe(true);
    state.yil += 1;
    expect(vebaToparlanmasindaMi(state)).toBe(false);
    expect(pazarBuyumeOrani(state)).toBe(state.ulke.donem!.etki.pazarBuyume);
  });

  it("etkiler aralıktan tam yüzde olarak gelir", () => {
    for (let i = 0; i < 200; i++) {
      const d = ilkDonemOlustur(1100, "kitlik");
      const yuzde = Math.round((d.etki.temelFiyat - 1) * 100);
      expect(yuzde).toBeGreaterThanOrEqual(45);
      expect(yuzde).toBeLessThanOrEqual(60);
      expect(Math.abs((d.etki.temelFiyat - 1) * 100 - yuzde)).toBeLessThan(1e-9);
    }
  });

  it("kıtlık yaşam giderini artırır ama sağlık götürmez", () => {
    const state = taze();
    state.ulke.donem = ilkDonemOlustur(state.yil, "bolluk");
    state.ulke.donem.bitisYili = state.yil + 50;
    const giderBolluk = giderKalemleriHesapla(state).yasam;
    state.ulke.donem = ilkDonemOlustur(state.yil, "kitlik");
    state.ulke.donem.bitisYili = state.yil + 50;
    expect(giderKalemleriHesapla(state).yasam).toBeGreaterThanOrEqual(giderBolluk);
    state.saglik = 80;
    state.yil += 2;
    donemIlerlet(state, 2);
    expect(state.saglik).toBe(80);
  });

  it("olayın ekonomi etkisi dönemi değiştirmez, yalnız süresini ±1 yıl kaydırır", () => {
    const state = taze();
    state.ulke.donem = ilkDonemOlustur(state.yil, "durgunluk");
    state.ulke.donem.bitisYili = state.yil + 4;
    ulkeGuncelle(state, { ekonomi: "iyi" });
    expect(state.ulke.donem!.tur).toBe("durgunluk");
    expect(state.ulke.donem!.bitisYili).toBe(state.yil + 3);
    expect(state.ulke.ekonomi).toBe("kotu");
    ulkeGuncelle(state, { ekonomi: "kotu" });
    expect(state.ulke.donem!.bitisYili).toBe(state.yil + 4);
  });
});

describe("havuz kilidi çakışması — oyunu kilitleyen crash regresyonu", () => {
  it("vebaYillikKontrol, havuz kilitleyen etiket (hapiste/kacak/yolculukta) varken karaktere veba BULAŞTIRMAZ", () => {
    for (const kilit of ["hapiste", "kacak", "yolculukta"]) {
      const state = taze();
      vebaBaslat(state, 0); // en yüksek bulaşma kademesi
      state.etiketler.push(kilit);
      const rnd = vi.spyOn(Math, "random").mockReturnValue(0); // zar her zaman "bulaştı" der
      try {
        for (let i = 0; i < 20; i++) vebaYillikKontrol(state, 2);
      } finally {
        rnd.mockRestore();
      }
      expect(state.etiketler.includes("veba_hastasi")).toBe(false);
    }
  });

  it("kilit yokken aynı koşulda veba BULAŞIR (guard fazla geniş değil)", () => {
    const state = taze();
    vebaBaslat(state, 0);
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    try {
      vebaYillikKontrol(state, 2);
    } finally {
      rnd.mockRestore();
    }
    expect(state.etiketler.includes("veba_hastasi")).toBe(true);
  });

  it("olaySec, iki havuz kilidi aynı anda set olsa bile ASLA throw etmez", () => {
    const kombinasyonlar = [
      ["kacak", "veba_hastasi"],
      ["hapiste", "veba_hastasi"],
      ["yolculukta", "veba_hastasi"],
      ["hapiste", "kacak"],
    ];
    for (const etiketler of kombinasyonlar) {
      const state = taze();
      state.etiketler.push(...etiketler);
      expect(() => olaySec(state)).not.toThrow();
      const secilen = olaySec(state);
      expect(secilen.senaryo.secenekler.length).toBeGreaterThan(0);
    }
  });
});
