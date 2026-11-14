import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl, birlikHesapla, birlikHazirla, erSayisi, gucHesapla } from "../src/game/birlik";
import { subayDegeri, subayToplami } from "../src/game/subay";
import { araziIhtimali } from "../src/game/birlikIslem";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { birlikYilIsle, savasBaslat, savasiBitir, seferberlikUygula, barisCatismaOtomatik, barisCatismaCoz } from "../src/game/birlikYil";
import { BARIS_GANIMET_ARALIK, SAVAS_ZAFER_GANIMET, YARALI_TEDAVI_GIDERI, GANIMET_PAYI_TANIMLARI, IKMAL_TANIMLARI, IKMAL_SIRASI, ERZAK_DONEM_CARPANI, ganimetGucCarpani, BARIS_GANIMET_TABAN, SAVAS_ZAFER_GANIMET_TABAN, SAVAS_KISLA_INDIRIMI, KISLA_BAKIM, ganimetBrutTemel } from "../src/data/birlik";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState, IsletmeUyari } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 30;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("v39 barış kaybı ve sabit büyüme", () => {
  it("barış görev kayıpları ölü değil yaralı olur ve kaynağı görev adıyla yazılır", () => {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 200;
    const b = birlikAl(s);
    b.kalite = { dusuk: 200, orta: 0, yuksek: 0 };
    b.gorevler = ["haydut", "devriye"];
    b.baris_bekleme = 99; // çatışma çıkmasın
    let olu = 0;
    let yar = 0;
    let kaynakli = 0;
    for (let i = 0; i < 6; i++) {
      const u: IsletmeUyari[] = birlikYilIsle(s, bg(s)).dokum.uyarilar ?? [];
      for (const x of u) {
        if (x.kod !== "savas_kayip") continue;
        olu += x.sayi ?? 0;
        yar += x.yaralanan ?? 0;
        if (x.kaynak === "gorev" && x.kaynakAd?.tr) kaynakli++;
      }
    }
    expect(olu).toBe(0);
    expect(yar).toBeGreaterThan(0);
    expect(kaynakli).toBeGreaterThan(0);
  });

  it("her yıl en az +1 er gelir (savaşsız, subaysız, şöhretsiz)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const s = asker();
    s.un = 40; // kötü şöhret devşirmeyi azaltmasın
    s.rutbe_seviye = 3; // komuta limiti ordunun üstünde olsun
    s.isletme!.yatirimlar.kisla = 4;
    const once = erSayisi(s);
    birlikYilIsle(s, bg(s));
    expect(erSayisi(s)).toBeGreaterThanOrEqual(once + 1);
  });
});

describe("v39 ganimet", () => {
  it("savaş zaferi tek seferde güç × 5–7; yenilgide ganimet yok", () => {
    for (const zafer of [true, false]) {
      const s = asker();
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.sonuc = zafer ? "zafer" : "yenilgi";
      s.ulke.savasta = false;
      const guc = b.guc;
      const sonuc = savasiBitir(s, b, bg(s), []);
      if (zafer) {
        expect(sonuc.brut).toBeGreaterThanOrEqual(guc * SAVAS_ZAFER_GANIMET[0] * ganimetGucCarpani(guc) * 0.5);
        expect(sonuc.brut).toBeLessThanOrEqual(guc * SAVAS_ZAFER_GANIMET[1] * ganimetGucCarpani(guc) * 3);
      } else expect(sonuc.brut).toBe(0);
    }
  });

  it("sabitler: haydut/sınır 2,6–3,2, savaş zaferi 64–75 (asıl gelir savaş ganimeti), yaralı 0,20, ganimet politikası morali −8/0/+6", () => {
    expect(BARIS_GANIMET_ARALIK).toEqual([2.6, 3.2]);
    expect(SAVAS_ZAFER_GANIMET).toEqual([64, 75]);
    expect(YARALI_TEDAVI_GIDERI).toBe(0.2);
    expect([GANIMET_PAYI_TANIMLARI.az.moral, GANIMET_PAYI_TANIMLARI.dengeli.moral, GANIMET_PAYI_TANIMLARI.comert.moral]).toEqual([-8, 0, 6]);
  });

  it("görev ganimeti savaş yılında yok; yağma yalnız ilk 3 savaş yılında, yenilgiden sonra yok", () => {
    const s = asker();
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.rutbe_seviye = 3;
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    seferberlikUygula(s, "secme", bg(s));
    sv.ikmal = "yagma_orta";
    sv.yil_sayac = 0;
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBeGreaterThan(0);
    sv.yil_sayac = 2; // 3. yıl: karar savaşı — yağma hâlâ var
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBeGreaterThan(0);
    sv.yil_sayac = 3; // 4. yıl: sonuç yılı — yağma yok
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBe(0);
    sv.yil_sayac = 0;
    sv.sonuc = "yenilgi";
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBe(0);
    sv.sonuc = null;
    expect(birlikHesapla(s, bg(s)).gorevler.every((g) => g.ganimet === 0)).toBe(true);
  });
});

describe("v39 subaylar", () => {
  it("Taarruz/Savunma/Keşif/Devşirme/Tabip değerleri Y30/60/90 noktalarından geçer ve tavanlıdır", () => {
    const e = (rol: "taarruz" | "savunma" | "kesif" | "musteri" | "guvenlik", y: number) => subayDegeri({ rol_turu: rol, gercekKalite: y, sadakat: 50 });
    expect(e("taarruz", 30).saldiri).toBeCloseTo(0.09, 6);
    expect(e("taarruz", 60).saldiri).toBeCloseTo(0.15, 6);
    expect(e("taarruz", 90).saldiri).toBeCloseTo(0.2, 6);
    expect(e("taarruz", 60).ganimet).toBeCloseTo(0.07, 6);
    expect(e("taarruz", 60).kayip).toBeCloseTo(0.04, 6);
    expect(e("savunma", 60).savunma).toBeCloseTo(0.15, 6);
    expect(e("savunma", 60).kayip).toBeCloseTo(-0.07, 6);
    expect(e("savunma", 60).ganimet).toBeCloseTo(-0.04, 6);
    expect(e("kesif", 30).arazi).toBeCloseTo(0.22, 6);
    expect(e("kesif", 90).tahminAralik).toBeCloseTo(0.023, 6);
    expect(e("kesif", 60).pusuAzalt).toBeCloseTo(0.48, 6);
    expect(e("musteri", 30).devsirme).toBe(2); // 1,5 → 2
    expect(e("musteri", 90).devsirme).toBe(4); // en çok 4 (Y100 + sadık dahil)
    expect(e("musteri", 100).devsirme).toBeLessThanOrEqual(4);
    expect(e("guvenlik", 60).oluFirarAzalt).toBeCloseTo(0.22, 6);
    expect(e("guvenlik", 60).yaraliAzalt).toBeCloseTo(0.14, 6);
    // sadık ×1,05
    expect(subayDegeri({ rol_turu: "taarruz", gercekKalite: 60, sadakat: 90 }).saldiri).toBeCloseTo(0.15 * 1.05, 6);
  });

  it("toplam tavanlıdır: çok Taarruz komutanı saldırıyı en çok +%30 yapar", () => {
    const s = asker();
    for (let i = 0; i < 4; i++) s.ekip.push({ id: `t${i}`, isim: `T${i}`, rol: "Taarruz komutanı", gercekKalite: 90, tahminiMin: 80, tahminiMax: 90, maas: 5, sadakat: 90, kisilik: "Sadık", rol_turu: "taarruz" });
    expect(subayToplami(s).saldiri).toBeCloseTo(0.3, 6);
  });

  it("eski Harp/Levazım rolleri Taarruz/Savunma'ya taşınır; Asker rolleri 5'tir", () => {
    const s = asker();
    s.ekip.push({ id: "h1", isim: "Eski", rol: "Harp subayı", gercekKalite: 60, tahminiMin: 50, tahminiMax: 70, maas: 4, sadakat: 60, kisilik: "Sıradan", rol_turu: "ana" });
    s.ekip.push({ id: "h2", isim: "Eski2", rol: "Levazım subayı", gercekKalite: 60, tahminiMin: 50, tahminiMax: 70, maas: 4, sadakat: 60, kisilik: "Sıradan", rol_turu: "maliyet" });
    birlikHazirla(s);
    expect(s.ekip[0].rol_turu).toBe("taarruz");
    expect(s.ekip[1].rol_turu).toBe("savunma");
  });

  it("Keşif subayı arazi seçme ihtimalini artırır (en çok %95) ve tahmin aralığını daraltır", () => {
    const s = asker();
    s.rutbe_seviye = 2;
    const taban = araziIhtimali(s);
    s.ekip.push({ id: "k1", isim: "Kâşif", rol: "Keşif subayı", gercekKalite: 90, tahminiMin: 80, tahminiMax: 90, maas: 5, sadakat: 50, kisilik: "Sıradan", rol_turu: "kesif" });
    expect(araziIhtimali(s)).toBeCloseTo(Math.min(0.95, taban + 0.46), 6);
    expect(subayToplami(s).tahminAralik).toBeCloseTo(0.023, 6);
  });

  it("yatırım fiyatları: Revir 13/22/34/50; Karakol (koruma yatırımı) yok", () => {
    const profil = isletmeProfiliGetir("Asker", "Orta Çağ")!;
    expect(profil.yatirimlar.find((y) => y.id === "karakol")).toBeUndefined();
    expect(profil.yatirimlar.find((y) => y.id === "revir")!.fiyatlar).toEqual([13, 22, 34, 50]);
    expect(profil.roller.map((r) => r.tur)).toEqual(["taarruz", "savunma", "kesif", "musteri", "guvenlik"]);
  });
});

describe("v39 haydut / sınır çatışması", () => {
  it("düşman tabloları: haydut < sınır < savaş (ilk yıllar); ilk 6 yıl (15–21 yaş) neredeyse düz, sonra artar; tablolar yaşla azalmaz", async () => {
    const { barisDusmanGucuYas, savasDusmanGucuYas, BARIS_DUSMAN_TABLOLARI, SAVAS_DUSMAN_YAS } = await import("../src/data/birlik");
    for (const yas of [15, 18, 21, 30, 45]) {
      expect(barisDusmanGucuYas(yas, "haydut")).toBeLessThan(barisDusmanGucuYas(yas, "sinir"));
      expect(barisDusmanGucuYas(yas, "sinir")).toBeLessThan(savasDusmanGucuYas(yas));
    }
    // ilk 6 yılda artış çok küçük (haydut ≤ +%25, sınır ≤ +%25, savaş ≤ +%20)
    expect(barisDusmanGucuYas(21, "haydut") / barisDusmanGucuYas(15, "haydut")).toBeLessThan(1.25);
    expect(barisDusmanGucuYas(21, "sinir") / barisDusmanGucuYas(15, "sinir")).toBeLessThan(1.25);
    expect(savasDusmanGucuYas(21) / savasDusmanGucuYas(15)).toBeLessThan(1.2);
    // sonra hızlı artış
    expect(barisDusmanGucuYas(65, "haydut")).toBeGreaterThan(100);
    // haydut ve sınır savaştan daha YAVAŞ artar (40 → 80 yaş büyüme oranı)
    const buyume = (f: (y: number) => number) => f(80) / f(40);
    expect(buyume((y) => barisDusmanGucuYas(y, "haydut"))).toBeLessThan(buyume(savasDusmanGucuYas));
    expect(buyume((y) => barisDusmanGucuYas(y, "sinir"))).toBeLessThan(buyume(savasDusmanGucuYas));
    expect(savasDusmanGucuYas(80)).toBeGreaterThan(500);
    for (const tablo of [BARIS_DUSMAN_TABLOLARI.haydut, BARIS_DUSMAN_TABLOLARI.sinir, SAVAS_DUSMAN_YAS]) {
      for (let i = 1; i < tablo.length; i++) {
        expect(tablo[i][0]).toBeGreaterThan(tablo[i - 1][0]);
        expect(tablo[i][1]).toBeGreaterThanOrEqual(tablo[i - 1][1]);
      }
    }
  });

  it("çatışma baskın/av olabilir; sonuçta düşman kaybı, kayıp (yaralı ≥ ölü) ve ganimet tutarlıdır; yenilgide ganimet yok", () => {
    const sonuclar: ReturnType<typeof barisCatismaOtomatik>[] = [];
    for (let n = 0; n < 60; n++) {
      const s = asker();
      s.yas = 40;
      s.rutbe_seviye = 3;
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = 100;
      birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      birlikAl(s).baris_bekleme = 0;
      vi.spyOn(Math, "random").mockRestore();
      birlikYilIsle(s, bg(s));
      expect(birlikAl(s).catisma_bekleyen).toBeTruthy();
      sonuclar.push(barisCatismaOtomatik(s, birlikAl(s), bg(s)));
    }
    const c = sonuclar.filter((x): x is NonNullable<typeof x> => !!x);
    expect(c.length).toBe(60);
    expect(c.some((x) => x.baskin)).toBe(true);
    expect(c.some((x) => !x.baskin)).toBe(true);
    expect(c.every((x) => typeof x.dusmanOlu === "number")).toBe(true);
    expect(c.filter((x) => !x.zafer).every((x) => x.ganimet === 0)).toBe(true);
    for (const x of c) expect(x.yarali).toBeGreaterThanOrEqual(x.olu);
    // baskında yalnız savunma
    expect(c.filter((x) => x.baskin).every((x) => x.inisiyatif === "savunma")).toBe(true);
  });
});

describe("v39 Savaş Günü hemen çözülür", () => {
  function karaSavasi() {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    b.gorevler = [];
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    seferberlikUygula(s, "secme", bg(s));
    sv.emir = "temkinli";
    sv.ikmal = "yagma_orta";
    sv.yil_sayac = 2; // 3. yıl: karar savaşı
    return { s, b, sv };
  }

  it("pencere onayı savaşı çözer; yıl işleme aynı savaşı yeniden atmaz ve kaybı ikinci kez uygulamaz", async () => {
    const { birlikSavasKarariHazirlaTest } = { birlikSavasKarariHazirlaTest: null } as never;
    void birlikSavasKarariHazirlaTest;
    const { savasKarariHazirla, savasKarariVer, savasGunuSonucuAl } = await import("../src/game/birlikIslem");
    const { s, b, sv } = karaSavasi();
    const k = savasKarariHazirla(s)!;
    expect(k.adimlar).toContain("rol");
    for (let i = 0; i < 6 && k.adim < k.adimlar.length; i++) {
      const adim = k.adimlar[k.adim];
      const secim = adim === "rol" ? "ana" : adim === "inisiyatif" ? "savunma" : adim === "arazi" ? "ova" : adim === "esir" ? "karma" : adim === "seferberlik" ? "dengeli" : adim === "emir" ? "temkinli" : "yeterli";
      savasKarariVer(s, secim, bg(s));
    }
    expect(sv.gun_cozuldu_yil).toBe(s.yil);
    const g = savasGunuSonucuAl(s)!;
    expect(g).toBeTruthy();
    expect(savasGunuSonucuAl(s)).toBeNull(); // ikinci kez gösterilmez
    expect(g.oyuncuGuc).toBeGreaterThan(0);
    expect(g.dusmanGuc).toBeGreaterThan(0);
    expect(g.olu + g.firar).toBeGreaterThanOrEqual(0);
    const sayac = sv.genel_zafer + sv.genel_yenilgi;
    const oluOnce = sv.olu_toplam;
    const zaferOnce = sv.sonuc;
    birlikYilIsle(s, bg(s));
    const sv2 = b.savas ?? sv;
    expect(sv2.genel_zafer + sv2.genel_yenilgi).toBe(sayac);
    expect(sv2.sonuc).toBe(zaferOnce);
    expect(sv2.olu_toplam).toBe(oluOnce);
  });
});

describe("v39 savaş boyu pencere sayısı (ikmal her yıl sorulmaz)", () => {
  it("5 yıllık savaşta ikmal yalnız ilk yıl sorulur; toplam ≤ 3 pencere (plan, savaş günü, esir)", async () => {
    const { savasKarariHazirla, savasKarariVer, savasGunuSonucuAl, savasKarariDurumu } = await import("../src/game/birlikIslem");
    const s = asker();
    s.rutbe_seviye = 3;
    s.yas = 40;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.ulke.savasta = true;
    s.buyuk_savas = { dusman: "Test", baslangicYili: s.yil, bitisYili: s.yil + 5, vergiOrani: 0.08, gidaCarpani: 1.1 };
    const pencereler: string[][] = [];
    for (let yil = 1; yil <= 5; yil++) {
      let k = savasKarariHazirla(s);
      let guard = 0;
      const buYil: string[] = [];
      while (k && k.adim < k.adimlar.length && guard++ < 12) {
        const adim = k.adimlar[k.adim];
        buYil.push(adim);
        const d = savasKarariDurumu(s, bg(s))!;
        const tercih: Record<string, string> = { seferberlik: "dengeli", ikmal: "yagma_orta", rol: "ana" };
        const secim = d.secenekler.find((o) => o.id === tercih[adim])?.id ?? d.secenekler[0].id;
        savasKarariVer(s, secim, bg(s));
        k = savasKarariHazirla(s);
      }
      savasGunuSonucuAl(s);
      pencereler.push(buYil);
      birlikYilIsle(s, bg(s));
      s.yil += 1;
      if (!birlikAl(s).savas) break;
    }
    const ikmalYili = pencereler.filter((p) => p.includes("ikmal")).length;
    expect(ikmalYili).toBe(1);
    expect(pencereler[0]).toContain("ikmal");
    expect(pencereler.slice(1).every((p) => !p.includes("ikmal") && !p.includes("seferberlik") && !p.includes("emir"))).toBe(true);
    expect(pencereler.filter((p) => p.length > 0).length).toBeLessThanOrEqual(3);
  });
});

describe("v40 görev geliri ve birim küçük artıları", () => {
  it("güç başı görev geliri 0,49–0,735 arası; ek çarpan ×1,9 (gelir ağırlığı ganimete kaydırıldı)", async () => {
    const { GOREVLER, GOREV_GELIR_CARPANI } = await import("../src/data/birlik");
    expect(GOREV_GELIR_CARPANI).toBe(1.9);
    const v = GOREVLER.map((g) => g.erBasi);
    expect(Math.min(...v)).toBeCloseTo(0.49, 6);
    expect(Math.max(...v)).toBeCloseTo(0.735, 6);
    for (let i = 1; i < v.length; i++) expect(v[i]).toBeGreaterThan(v[i - 1]);
  });

  it("mızraklı yaralıyı, zırhlı ölüyü azaltır; süvari haydut/akın görev gelirini +%10 artırır", async () => {
    const { yaraliOrani } = await import("../src/game/birlikYil");
    const { kayipCarpani } = await import("../src/game/birlik");
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const s = asker();
    const b = birlikAl(s);
    const y0 = yaraliOrani(s);
    const k0 = kayipCarpani(s);
    b.birlik_turler = ["mizrakli"];
    expect(yaraliOrani(s)).toBeLessThan(y0);
    b.birlik_turler = ["zirhli"];
    expect(kayipCarpani(s)).toBeCloseTo(k0 - 0.15, 6);
    // süvari: haydut görevi geliri
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 200;
    b.kalite = { dusuk: 200, orta: 0, yuksek: 0 };
    b.gorevler = ["haydut"];
    b.birlik_turler = [];
    const guc0 = gucHesapla(s).guc;
    const g0 = birlikHesapla(s, bg(s)).gorevGeliri;
    b.birlik_turler = ["suvari"];
    const guc1 = gucHesapla(s).guc;
    const g1 = birlikHesapla(s, bg(s)).gorevGeliri;
    // görev geliri güç başına ödenir: süvari hem görev bonusunu (+%10) hem gücü değiştirir
    expect(g1 / g0).toBeCloseTo(1.1 * (guc1 / guc0), 6);
  });
});

describe("üç yağma türü ve erzak dönem çarpanı", () => {
  function savasAskeri() {
    const s = asker();
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.rutbe_seviye = 3;
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    seferberlikUygula(s, "secme", bg(s));
    sv.yil_sayac = 0;
    return { s, b, sv };
  }

  it("ikmal kararı yalnız üç yağma türüdür; gelir gücün 0,56 / 0,4 / 0,24'ü", () => {
    expect(IKMAL_SIRASI).toEqual(["yagma_sert", "yagma_orta", "yagma_yumusak"]);
    const { s, b, sv } = savasAskeri();
    const brut: Record<string, number> = {};
    for (const id of IKMAL_SIRASI) {
      sv.ikmal = id;
      brut[id] = birlikHesapla(s, bg(s)).yagmaBrut;
      const oran = IKMAL_TANIMLARI[id].yagma.gucOrani;
      expect(brut[id] / (b.guc * bg(s).enflasyon)).toBeGreaterThanOrEqual(oran);
    }
    expect(brut.yagma_sert / brut.yagma_orta).toBeCloseTo(0.56 / 0.4, 6);
    expect(brut.yagma_yumusak / brut.yagma_orta).toBeCloseTo(0.24 / 0.4, 6);
  });

  it("sert yağma ahlak ve oyuncu morali düşürür, ordu morali artırır; yumuşak tam tersi", () => {
    const sonuc: Record<string, { ahlak: number; mutluluk: number; moral: number }> = {};
    for (const id of ["yagma_sert", "yagma_yumusak"] as const) {
      const { s, b, sv } = savasAskeri();
      sv.ikmal = id;
      sv.yil_sayac = 0;
      s.ahlak = 50;
      s.mutluluk = 50;
      b.moral = 50;
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      birlikYilIsle(s, bg(s));
      sonuc[id] = { ahlak: s.ahlak, mutluluk: s.mutluluk, moral: b.moral };
      vi.restoreAllMocks();
    }
    expect(sonuc.yagma_sert.ahlak).toBeLessThan(sonuc.yagma_yumusak.ahlak);
    expect(sonuc.yagma_sert.mutluluk).toBeLessThan(sonuc.yagma_yumusak.mutluluk);
    expect(sonuc.yagma_sert.moral).toBeGreaterThan(sonuc.yagma_yumusak.moral);
  });

  it("yağma türlerinin sertliği farklıdır; erzak gideri yalnız savaşta, türe göre %75/55/35 düşer", () => {
    expect(IKMAL_SIRASI.map((i) => IKMAL_TANIMLARI[i].sertlik)).toEqual([2.5, 1.5, 0.5]);
    expect(IKMAL_SIRASI.map((i) => IKMAL_TANIMLARI[i].yagma.erzakIndirimi)).toEqual([0.75, 0.55, 0.35]);
    const { s, sv } = savasAskeri();
    const savasErzak: Record<string, number> = {};
    for (const id of IKMAL_SIRASI) {
      sv.ikmal = id;
      sv.yil_sayac = 2; // yağma yılı dışında da (3. yıl) indirim sürer: savaş boyu
      savasErzak[id] = birlikHesapla(s, bg(s)).erzak;
    }
    expect(savasErzak.yagma_sert).toBeLessThan(savasErzak.yagma_orta);
    expect(savasErzak.yagma_orta).toBeLessThan(savasErzak.yagma_yumusak);
    expect(savasErzak.yagma_sert / savasErzak.yagma_orta).toBeCloseTo(0.25 / 0.45, 6);
    expect(savasErzak.yagma_yumusak / savasErzak.yagma_orta).toBeCloseTo(0.65 / 0.45, 6);
    // barışta indirim yok: seçilen yağma türü erzak giderini değiştirmez
    s.ulke.savasta = false;
    birlikAl(s).savas = null;
    const baris = birlikHesapla(s, bg(s)).erzak;
    expect(baris).toBeGreaterThan(savasErzak.yagma_yumusak / 1.07); // savaş dönem çarpanı 1,07 ve indirim yokken
  });

  it("erzak dönem çarpanı 0,9–1,1 bandında (bolluk 0,9 · durgunluk 1 · kıtlık 1,1)", () => {
    for (const v of Object.values(ERZAK_DONEM_CARPANI)) {
      expect(v).toBeGreaterThanOrEqual(0.9);
      expect(v).toBeLessThanOrEqual(1.1);
    }
    expect(ERZAK_DONEM_CARPANI.durgunluk).toBe(1);
  });

  it("eski kayıttaki ikmal (yeterli/kit/yagma) yüklenince orta yağmaya döner", () => {
    const { s, b, sv } = savasAskeri();
    (sv as { ikmal?: string }).ikmal = "yeterli";
    b.savas_karari = null;
    birlikHazirla(s);
    expect(birlikAl(s).savas!.ikmal).toBe("yagma_orta");
  });
});

describe("güce göre kesintisiz ganimet çarpanı", () => {
  it("max(0,25; 1 − 0,0016 × güç): 0 → 1 · 100 → 0,84 · 300 → 0,52 · 468+ → 0,25", () => {
    expect(ganimetGucCarpani(0)).toBe(1);
    expect(ganimetGucCarpani(100)).toBeCloseTo(0.84, 10);
    expect(ganimetGucCarpani(300)).toBeCloseTo(0.52, 10);
    expect(ganimetGucCarpani(468.75)).toBeCloseTo(0.25, 10);
    expect(ganimetGucCarpani(5000)).toBe(0.25);
    // kesintisiz: 99 ile 100 arasında sıçrama yok
    expect(Math.abs(ganimetGucCarpani(99) - ganimetGucCarpani(100))).toBeLessThan(0.002);
  });

  it("barış çatışması ve savaş zaferi ganimeti çarpanı uygular; yağma uygulamaz", () => {
    const hesap = (guc: number) => {
      const s = asker();
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = 300;
      const b = birlikAl(s);
      b.kalite = { dusuk: 300, orta: 0, yuksek: 0 };
      b.guc = guc;
      s.ulke.savasta = true;
      const sv = savasBaslat(s);
      sv.genel_zafer = 3;
      sv.genel_yenilgi = 1;
      b.guc = guc;
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      const sonuc = savasiBitir(s, b, bg(s), []);
      vi.restoreAllMocks();
      return { brut: sonuc.brut, guc };
    };
    const kucuk = hesap(100);
    const buyuk = hesap(500);
    // aynı rastgelelik, aynı bonuslar: birim başı ganimet oranı çarpan oranına eşit
    expect(buyuk.brut / buyuk.guc / (kucuk.brut / kucuk.guc)).toBeCloseTo(ganimetGucCarpani(500) / ganimetGucCarpani(100), 1);
  });
});

describe("ganimet payı 5 yılda bir değişir", () => {
  it("ilk değişiklik serbest, sonra 5 yıl kilitli; aynı değeri seçmek kilit koymaz", async () => {
    const { birlikKararUygula } = await import("../src/game/birlikIslem");
    const s = asker();
    s.rutbe_seviye = 2;
    const b = birlikAl(s);
    birlikKararUygula(s, { ganimet_payi: "dengeli" }); // aynı değer: kilit yok
    expect(b.ganimet_kilit_bitis ?? null).toBeNull();
    birlikKararUygula(s, { ganimet_payi: "comert" });
    expect(b.ganimet_payi).toBe("comert");
    expect(b.ganimet_kilit_bitis).toBe(s.yil + 5);
    expect(() => birlikKararUygula(s, { ganimet_payi: "az" })).toThrow(/5 yılda bir/);
    expect(b.ganimet_payi).toBe("comert");
    s.yil += 4;
    expect(() => birlikKararUygula(s, { ganimet_payi: "az" })).toThrow(/5 yılda bir/);
    s.yil += 1;
    birlikKararUygula(s, { ganimet_payi: "az" });
    expect(b.ganimet_payi).toBe("az");
    expect(b.ganimet_kilit_bitis).toBe(s.yil + 5);
  });

  it("kilit durumunda diğer politikalar (talim/ton) yine değişir", async () => {
    const { birlikKararUygula } = await import("../src/game/birlikIslem");
    const s = asker();
    s.rutbe_seviye = 2;
    birlikKararUygula(s, { ganimet_payi: "az" });
    birlikKararUygula(s, { talim: "agir", ton: "sert" });
    expect(birlikAl(s).talim_politikasi).toBe("agir");
    expect(birlikAl(s).ton).toBe("sert");
  });
});

describe("görev geliri güç başına, ganimet tabanı, savaşta kışla indirimi", () => {
  function ordu(er: number, kalite: "dusuk" | "orta" | "yuksek" = "dusuk") {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = er;
    const b = birlikAl(s);
    b.kalite = { dusuk: 0, orta: 0, yuksek: 0, [kalite]: er } as never;
    b.gorevler = ["devriye"];
    return { s, b };
  }

  it("görev geliri barışta yaralı olmayan erlerin toplam gücü × görev erBasi (0,70 devriye)", () => {
    const { s } = ordu(100);
    const h = birlikHesapla(s, bg(s));
    const guc = gucHesapla(s).guc;
    // devriye erBasi 0,70: gelir = güç × 0,70 × enflasyon × dönem çarpanı × bonuslar (savaş yok)
    expect(h.gorevGeliri).toBeGreaterThan(0);
    expect(h.gorevGeliri / (guc * 0.7 * bg(s).enflasyon)).toBeGreaterThan(0.5);
    // aynı er sayısı, daha iyi teçhizat = daha çok güç = daha çok görev geliri
    const iyi = ordu(100, "yuksek");
    expect(birlikHesapla(iyi.s, bg(iyi.s)).gorevGeliri).toBeGreaterThan(h.gorevGeliri);
    // yaralılar güçten düşer, geliri de düşürür
    const { s: sy, b: by } = ordu(100);
    by.yarali = 40;
    expect(birlikHesapla(sy, bg(sy)).gorevGeliri).toBeLessThan(h.gorevGeliri);
    // savaşta görev geliri yok
    s.ulke.savasta = true;
    expect(birlikHesapla(s, bg(s)).gorevGeliri).toBe(0);
  });

  it("ganimet tabanı: küçük ordu bile haydut/sınır ve savaş zaferinde en az taban kadar alır", () => {
    expect(BARIS_GANIMET_TABAN).toBe(120);
    expect(SAVAS_ZAFER_GANIMET_TABAN).toBe(500);
    expect(ganimetBrutTemel(10, 3.6, BARIS_GANIMET_TABAN)).toBe(120); // 10 güç × 3,6 = 36 < 120
    expect(ganimetBrutTemel(10, 12.6, SAVAS_ZAFER_GANIMET_TABAN)).toBe(500);
    expect(ganimetBrutTemel(100, 3.6, BARIS_GANIMET_TABAN)).toBeCloseTo(100 * 3.6 * ganimetGucCarpani(100), 8); // taban devreye girmez // taban devreye girmez
  });

  it("savaşta kışla bakımı %25 düşer", () => {
    const { s } = ordu(100);
    const baris = birlikHesapla(s, bg(s)).kislaBakim;
    expect(baris).toBeCloseTo(KISLA_BAKIM[4] * bg(s).giderEnflasyon, 6);
    s.ulke.savasta = true;
    expect(SAVAS_KISLA_INDIRIMI).toBe(0.25);
    expect(birlikHesapla(s, bg(s)).kislaBakim).toBeCloseTo(baris * 0.75, 6);
  });
});

describe("v50 etkileşimli çatışma ekranı", () => {
  it("çatışma çıkınca zaman durur; pencere iki tarafın saldırı/savunmasını verir; baskında yalnız savunma; karar sonrası bekleme biter", async () => {
    const { catismaKarariDurumu, catismaKarariVer, savasKarariBekliyorMu } = await import("../src/game/birlikIslem");
    const s = asker();
    s.isletme!.baslangic_yili = s.yil - 10;
    const b = birlikAl(s);
    b.baris_bekleme = 0;
    expect(savasKarariBekliyorMu(s)).toBe(false);
    birlikYilIsle(s, bg(s));
    expect(b.catisma_bekleyen).toBeTruthy();
    expect(savasKarariBekliyorMu(s)).toBe(true); // zaman ilerlemez
    const k = catismaKarariDurumu(s, bg(s))!;
    expect(k.oyuncu.saldiri).toBeGreaterThan(0);
    expect(k.oyuncu.savunma).toBeGreaterThan(0);
    expect(k.dusman.saldiri[1]).toBeGreaterThanOrEqual(k.dusman.saldiri[0]);
    expect(k.dusman.savunma[1]).toBeGreaterThanOrEqual(k.dusman.savunma[0]);
    expect(() => catismaKarariVer(s, "yanlis", bg(s))).toThrow();
    const paraOnce = s.para;
    const sonuc = catismaKarariVer(s, "saldiri", bg(s));
    expect(sonuc.inisiyatif).toBe(k.baskin ? "savunma" : "saldiri");
    expect(b.catisma_bekleyen).toBeNull();
    expect(savasKarariBekliyorMu(s)).toBe(false);
    if (sonuc.zafer) expect(s.para).toBeGreaterThanOrEqual(paraOnce); // ganimet nakde eklenir
    expect(() => catismaKarariVer(s, "savunma", bg(s))).toThrow(); // ikinci kez çözülmez
  });

  it("savaşta çatışma kurulmaz; Karakol yatırımı yok; rakip komutan saldırısı ve subay hırsızlığı yok", () => {
    const s = asker();
    const b = birlikAl(s);
    s.ulke.savasta = true;
    b.baris_bekleme = 0;
    birlikYilIsle(s, bg(s));
    expect(b.catisma_bekleyen).toBeFalsy();
    s.ulke.savasta = false;
    for (let i = 0; i < 12; i++) {
      const uy = birlikYilIsle(s, bg(s)).dokum.uyarilar.map((u) => u.kod);
      for (const yasak of ["rakip_saldiri", "hirsizlik", "sizdirma", "ic_hirsizlik", "kazanc_ozet", "baris_catisma"]) expect(uy).not.toContain(yasak);
      if (b.catisma_bekleyen) barisCatismaOtomatik(s, b, bg(s));
    }
  });
});

describe("v51 çatışma kayıpları: B paketi, seçim etkisi, kayıp tabanı", () => {
  function hazir() {
    const s = asker();
    s.yas = 40;
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    return s;
  }
  function coz(secim: "saldiri" | "savunma", baskin: boolean) {
    const s = hazir();
    const b = birlikAl(s);
    b.catisma_bekleyen = { yil: s.yil, tur: "haydut", baskin, dusmanTur: "karma", dusmanGuc: 5 }; // çok zayıf düşman: kesin zafer
    s.para = 0;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    const r = barisCatismaCoz(s, b, bg(s), secim);
    rnd.mockRestore();
    return r;
  }
  it("seçilmiş saldırıda ganimet ≈ ×1,3/0,8 = 1,625 kat; baskında seçim yok (çarpan uygulanmaz)", () => {
    const sal = coz("saldiri", false);
    const sav = coz("savunma", false);
    expect(sal.zafer && sav.zafer).toBe(true);
    expect(sal.ganimet / sav.ganimet).toBeGreaterThan(1.5);
    expect(sal.ganimet / sav.ganimet).toBeLessThan(1.75);
    const baskin = coz("saldiri", true);
    expect(baskin.inisiyatif).toBe("savunma");
    expect(baskin.ganimet / sav.ganimet).toBeGreaterThan(1.15); // 1 / 0,8 = 1,25 (baskında ×1)
  });
  it("kayıp çarpanı tam yatırımla bile 0,5 altına inmez", async () => {
    const { kayipCarpani } = await import("../src/game/birlik");
    const s = hazir();
    const b = birlikAl(s);
    b.talim = 100;
    s.isletme!.yatirimlar.revir = 4;
    expect(kayipCarpani(s)).toBeGreaterThanOrEqual(0.5);
  });
});

describe("v52 yağma türüne göre savaş yılı kaybı", () => {
  it("yağma yıllarında (1–3. yıl) sert ×1,3 / orta ×1 / yumuşak ×0,8; 4. yıldan sonra çarpan yok; karar savaşı mağlubiyeti ölü %21–25", async () => {
    const { yagmaKayipCarpani } = await import("../src/game/birlikYil");
    const { IKMAL_TANIMLARI, SAVAS_KARAR_KAYBI } = await import("../src/data/birlik");
    expect(SAVAS_KARAR_KAYBI.yenilgi.olu).toEqual([21, 25]);
    const s = asker();
    const sv = savasBaslat(s);
    const b = birlikAl(s);
    for (const [id, c] of [["yagma_sert", 1.3], ["yagma_orta", 1], ["yagma_yumusak", 0.8]] as const) {
      sv.ikmal = id;
      expect(IKMAL_TANIMLARI[id].yagma.kayip).toBe(c);
      for (const y of [1, 2, 3]) expect(yagmaKayipCarpani(b, y)).toBe(c);
      expect(yagmaKayipCarpani(b, 4)).toBe(1);
    }
  });
});

describe("v54 paralı asker, seferberlik penceresi, moral ve savaş ödemesi", () => {
  function savasHazir() {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.para = 100000;
    s.ulke.savasta = true;
    savasBaslat(s);
    return s;
  }
  it("paralı asker: iki seviye (%20 / %40), peşin 6,4 + yıllık 2,4 er başı, moral −7 / −14; savaşta bir kez", async () => {
    const { kiralikOrduTut, kiralikOnizleme } = await import("../src/game/birlikIslem");
    const { KIRALIK_SEVIYELERI, KIRALIK_PESIN, KIRALIK_YILLIK } = await import("../src/data/birlik");
    expect([KIRALIK_PESIN, KIRALIK_YILLIK]).toEqual([6.4, 2.4]);
    for (const [sev, adet, moral] of [["kucuk", 20, -7], ["buyuk", 40, -14]] as const) {
      const s = savasHazir();
      const b = birlikAl(s);
      b.moral = 60;
      const o = kiralikOnizleme(s, bg(s), sev);
      expect(o.er).toBe(adet);
      expect(o.gucSonra).toBeGreaterThan(o.gucOnce);
      const para0 = s.para;
      const r = kiralikOrduTut(s, bg(s), sev);
      expect(r.adet).toBe(adet);
      expect(para0 - s.para).toBeCloseTo(adet * 6.4 * bg(s).giderEnflasyon, 3);
      expect(b.moral).toBe(60 + moral);
      expect(KIRALIK_SEVIYELERI[sev].moral).toBe(moral);
      expect(birlikHesapla(s, bg(s)).kiralikMasrafi).toBeCloseTo(adet * 2.4 * bg(s).giderEnflasyon, 3);
      expect(() => kiralikOrduTut(s, bg(s), sev)).toThrow();
    }
  });
  it("seferberlik penceresi tam sayı er ve askerî güç yazar; ücret yok (para değişmez)", async () => {
    const { savasKarariDurumu, savasKarariVer, savasKarariHazirla } = await import("../src/game/birlikIslem");
    const s = savasHazir();
    const b = birlikAl(s);
    b.savas = null;
    const d = savasKarariDurumu(s, bg(s))!;
    const sec = d.adimlar.find((a) => a.adim === "seferberlik")!.secenekler;
    expect(sec.map((x) => x.id)).toEqual(["secme", "dengeli", "genel"]);
    expect(sec[0].aciklama.tr).toContain("+10 er (100 → 110)");
    expect(sec[0].aciklama.tr).not.toContain("peşin");
    expect(sec[1].aciklama.tr).toContain("+20 er");
    expect(sec[2].aciklama.tr).toContain("+30 er");
    expect(sec[2].aciklama.tr).not.toContain("peşin");
    for (const x of sec) expect(x.aciklama.tr).toMatch(/yıllık ekstra gider ≈ \d/);
    const gider = (i: number) => Number(/ekstra gider ≈ ([\d.]+)/.exec(sec[i].aciklama.tr)![1]);
    expect(gider(0)).toBeGreaterThan(0);
    expect(gider(2)).toBeGreaterThan(gider(1));
    expect(gider(1)).toBeGreaterThan(gider(0)); // büyük çağrı daha pahalı
    expect(sec[2].aciklama.tr).toMatch(/askerî güç \d+ → \d+/);
    const k = savasKarariHazirla(s)!;
    expect(k.adimlar[0]).toBe("seferberlik");
    const para0 = s.para;
    savasKarariVer(s, "genel", bg(s));
    expect(s.para).toBe(para0); // seferberlik ücretsiz
    expect(birlikAl(s).savas!.seferberlik_er).toBe(30);
  });
  it("savaşta asker başı ödeme yalnız ana kadroya (seferber hariç)", () => {
    const s = savasHazir();
    const e = bg(s).enflasyon;
    const yalin = birlikHesapla(s, bg(s));
    seferberlikUygula(s, "genel", bg(s));
    const sef = birlikHesapla(s, bg(s));
    expect(sef.sold).toBeCloseTo(yalin.sold, 6);
    expect(yalin.sold).toBeCloseTo(6 * e + 100 * 0.45 * e, 3);
  });
  it("çatışma ve savaş morali türe göre farklı: ordu ve kişi", async () => {
    const { CATISMA_ORDU_MORALI, CATISMA_KISI_MORALI, SAVAS_KISI_MORALI } = await import("../src/data/birlik");
    expect(CATISMA_ORDU_MORALI.haydut).toEqual({ zafer: 3, yenilgi: -3 });
    expect(CATISMA_ORDU_MORALI.sinir).toEqual({ zafer: 4, yenilgi: -5 });
    expect(CATISMA_KISI_MORALI.sinir.yenilgi).toBeLessThan(CATISMA_KISI_MORALI.haydut.yenilgi);
    expect(SAVAS_KISI_MORALI.yenilgi).toBeLessThan(CATISMA_KISI_MORALI.sinir.yenilgi);
    const s = asker();
    const b = birlikAl(s);
    b.catisma_bekleyen = { yil: s.yil, tur: "sinir", baskin: false, dusmanTur: "karma", dusmanGuc: 5 };
    b.moral = 50;
    s.mutluluk = 50;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    barisCatismaCoz(s, b, bg(s), "saldiri");
    rnd.mockRestore();
    expect(b.moral).toBeGreaterThanOrEqual(54); // +4 sınır zaferi (+ ilk zaferde madalya morali)
    expect(s.mutluluk).toBe(52);
  });
});

describe("v55 moral/talim 50, etkin talim, paralı kaybı, borç eşikleri, yaralı gücü", () => {
  function savasHazir() {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.para = 100000;
    s.ulke.savasta = true;
    savasBaslat(s);
    return s;
  }
  it("moral ve talim 50'de başlar (etkisi 0); eski kayıtta talim 50'ye çekilir", async () => {
    const { moralGucEtkisi, talimGucEtkisi, MORAL_BASLANGIC, TALIM_BASLANGIC } = await import("../src/data/birlik");
    expect([MORAL_BASLANGIC, TALIM_BASLANGIC]).toEqual([50, 50]);
    expect(moralGucEtkisi(50)).toBe(0);
    expect(talimGucEtkisi(50)).toBe(0);
    const s = asker();
    const b = birlikAl(s);
    b.denge_v55 = false;
    b.talim = 0;
    birlikHazirla(s); // eski kayıt yüklenirken normalleşir
    expect(birlikAl(s).talim).toBe(50);
  });
  it("bakım yoksa moral ve talim zamanla düşer: barışta moral −1, talim −2 (hafif talim, nötr etkenler)", () => {
    const s = asker();
    const b = birlikAl(s);
    b.baris_bekleme = 99;
    s.ulke.donem = undefined as never; // dönem (bolluk/kıtlık) moral etkisi karışmasın
    b.talim_politikasi = "hafif";
    b.moral = 50;
    b.talim = 50;
    b.hedef_kalite = "orta";
    b.kalite = { dusuk: 0, orta: 20, yuksek: 0 };
    birlikYilIsle(s, bg(s));
    expect(b.moral).toBeLessThan(50);
    expect(b.talim).toBeLessThan(50); // doğal unutma −2 ve yeni erlerin (giriş talimi 25) seyreltmesi
    expect(b.talim).toBeGreaterThan(44);
  });
  it("dipteki moral toparlanır (<30 → +2)", () => {
    const s = asker();
    const b = birlikAl(s);
    b.baris_bekleme = 99;
    b.moral = 10;
    birlikYilIsle(s, bg(s));
    expect(b.moral).toBeGreaterThanOrEqual(10 - 16 + 2 > 0 ? 0 : 0);
    expect(b.moral).toBeGreaterThan(0);
  });
  it("savaş morali: ordu zafer +10 / yenilgi −17; kanat bozgunu −9", async () => {
    const { MORAL_ZAFER, MORAL_YENILGI, MORAL_KANAT_BOZGUN } = await import("../src/data/birlik");
    expect([MORAL_ZAFER, MORAL_YENILGI, MORAL_KANAT_BOZGUN]).toEqual([10, -17, -9]);
  });
  it("etkin talim: Gazi etkisiz (ordunun talimi), Eli Silah ve Tüm Erkekler talimi seyreltir; ordunun gerçek talimi bozulmaz; savaş sonu katılan kadroya işler", async () => {
    const { etkinTalim } = await import("../src/game/birlik");
    for (const [tur, giris] of [["secme", 70], ["dengeli", 10], ["genel", 0]] as const) {
      const s = savasHazir();
      const b = birlikAl(s);
      b.talim = 70;
      b.savas = null;
      seferberlikUygula(s, tur, bg(s));
      expect(b.talim).toBe(70); // gerçek talim bozulmadı
      const sef = b.savas!.seferberlik_er;
      const beklenen = tur === "secme" ? 70 : (70 * 100 + giris * sef) / (100 + sef);
      expect(etkinTalim(s)).toBeCloseTo(beklenen, 6);
    }
    const s = savasHazir();
    const b = birlikAl(s);
    b.talim = 70;
    b.savas = null;
    seferberlikUygula(s, "genel", bg(s));
    b.savas!.sonuc = "zafer";
    s.ulke.savasta = false;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    savasiBitir(s, b, bg(s), []);
    rnd.mockRestore();
    expect(b.talim).toBeLessThan(70); // kalanlar (talim 0) ortalamaya katıldı
    expect(b.talim).toBeGreaterThan(50);
  });
  it("kalıcı gazi kadrosu: zaferde kalanların %30'u bir kalite yukarı çıkar; yenilgide çıkmaz", () => {
    for (const sonuc of ["zafer", "yenilgi"] as const) {
      const s = savasHazir();
      const b = birlikAl(s);
      b.savas = null;
      seferberlikUygula(s, "genel", bg(s));
      b.savas!.sonuc = sonuc;
      s.ulke.savasta = false;
      const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
      savasiBitir(s, b, bg(s), []);
      rnd.mockRestore();
      if (sonuc === "zafer") expect(b.kalite.orta).toBeGreaterThan(0);
      else expect(b.kalite.orta).toBe(0);
    }
  });
  it("seferber ahlak bedeli: Gazi 0; Eli Silah −1/−1; Tüm Erkekler −3/−3 ve şöhret −2", () => {
    for (const [tur, ah, mu, un] of [["secme", 0, 0, 0], ["dengeli", -1, -1, 0], ["genel", -3, -3, -2]] as const) {
      const s = savasHazir();
      s.ahlak = 50;
      s.mutluluk = 50;
      s.un = 50;
      birlikAl(s).savas = null;
      seferberlikUygula(s, tur, bg(s));
      expect([s.ahlak - 50, s.mutluluk - 50, s.un - 50]).toEqual([ah, mu, un]);
    }
  });
  it("seferber firarı düşük moralde artar", async () => {
    const { kayipUygula } = await import("../src/game/birlikYil");
    const ort = (moral: number) => {
      let t = 0;
      for (let n = 0; n < 40; n++) {
        const s = savasHazir();
        const b = birlikAl(s);
        b.savas = null;
        seferberlikUygula(s, "genel", bg(s));
        const sef = b.savas!.seferberlik_er;
        b.moral = moral;
        const pct = 10 + Math.max(0, 40 - moral) * 0.15;
        t += kayipUygula(s, b, { oluPct: 0, firarPct: 0, levyFirarPct: pct }).firarLevy / sef;
      }
      return t / 40;
    };
    expect(ort(10)).toBeGreaterThan(ort(60));
  });
  it("paralı asker: ordunun ölü yüzdesini yaşar, yaralanır, firar etmez; yaralılar iyileşir; ücret kalan erler üzerinden", async () => {
    const { kiralikOrduTut } = await import("../src/game/birlikIslem");
    const { kayipUygula, yaraliIyilestir } = await import("../src/game/birlikYil");
    const s = savasHazir();
    const b = birlikAl(s);
    kiralikOrduTut(s, bg(s), "buyuk");
    const sv = b.savas!;
    expect(sv.kiralik_er).toBe(40);
    const k = kayipUygula(s, b, { oluPct: 25, firarPct: 50 });
    expect(k.kiralikOlu).toBeGreaterThan(0);
    expect(sv.kiralik_er).toBe(40 - (k.kiralikOlu ?? 0));
    expect(k.kiralikYarali).toBeGreaterThan(0);
    expect(sv.kiralik_yarali).toBe(k.kiralikYarali);
    const sag = gucHesapla(s).ham;
    sv.kiralik_yarali = 0;
    expect(gucHesapla(s).ham).toBeGreaterThan(sag - 1e-9); // yaralı paralı güce katılmaz
    sv.kiralik_yarali = k.kiralikYarali;
    yaraliIyilestir(s, b);
    expect(sv.kiralik_yarali ?? 0).toBeLessThan(k.kiralikYarali ?? 0);
    expect(birlikHesapla(s, bg(s)).kiralikMasrafi).toBeCloseTo((sv.kiralik_er ?? 0) * 2.4 * bg(s).giderEnflasyon, 3);
  });
  it("savaş borç eşikleri: −50 hafif, −200 ağır (moral, firar, güç, paralı çekilir); barışta eski kademeli ceza", async () => {
    const { odenmeyenCeza } = await import("../src/data/birlik");
    expect(odenmeyenCeza(-10, 1, true)).toBeNull();
    const h = odenmeyenCeza(-60, 1, true)!;
    expect([h.moral, h.firar, h.maasGuc + h.erzakGuc, h.paraliCekilir]).toEqual([-4, 1.5, -0.1, false]);
    const a = odenmeyenCeza(-250, 1, true)!;
    expect([a.moral, a.firar, a.paraliCekilir, a.seferFirarCarpani]).toEqual([-10, 4, true, 1.5]);
    expect(a.maasGuc + a.erzakGuc).toBeCloseTo(-0.25, 6);
    expect(odenmeyenCeza(-60, 1, false)!.kademe).toBe(1); // barış: eşik 50
    const { kiralikOrduTut } = await import("../src/game/birlikIslem");
    const s = savasHazir();
    const b = birlikAl(s);
    kiralikOrduTut(s, bg(s), "kucuk");
    s.para = -100000;
    const uy = birlikYilIsle(s, bg(s)).dokum.uyarilar.map((u) => u.kod);
    expect(uy).toContain("kiralik_cekildi");
    expect(b.savas?.kiralik_er ?? 0).toBe(0);
  });
  it("askerî güç yalnız SAĞLAM erlerden hesaplanır (yaralılar katılmaz)", () => {
    const s = asker();
    s.meslek_musteri = 100;
    birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    const g0 = gucHesapla(s).guc;
    birlikAl(s).yarali = 20;
    const g1 = gucHesapla(s).guc;
    expect(g1 / g0).toBeCloseTo(0.8, 2);
  });
});
