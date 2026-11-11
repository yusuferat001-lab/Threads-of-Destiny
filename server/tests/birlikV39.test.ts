import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import { birlikAl, birlikHesapla, birlikHazirla, erSayisi } from "../src/game/birlik";
import { subayDegeri, subayToplami } from "../src/game/subay";
import { araziIhtimali } from "../src/game/birlikIslem";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { birlikYilIsle, savasBaslat, savasiBitir, seferberlikUygula } from "../src/game/birlikYil";
import { BARIS_GANIMET_ARALIK, SAVAS_ZAFER_GANIMET, YARALI_TEDAVI_GIDERI, GANIMET_PAYI_TANIMLARI } from "../src/data/birlik";
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
        expect(sonuc.brut).toBeGreaterThanOrEqual(guc * SAVAS_ZAFER_GANIMET[0] * 0.5);
        expect(sonuc.brut).toBeLessThanOrEqual(guc * SAVAS_ZAFER_GANIMET[1] * 3);
      } else expect(sonuc.brut).toBe(0);
    }
  });

  it("sabitler: haydut/sınır 1–1,5, yaralı 0,30, ganimet politikası morali −8/0/+6", () => {
    expect(BARIS_GANIMET_ARALIK).toEqual([1, 1.5]);
    expect(SAVAS_ZAFER_GANIMET).toEqual([5, 7]);
    expect(YARALI_TEDAVI_GIDERI).toBe(0.3);
    expect([GANIMET_PAYI_TANIMLARI.az.moral, GANIMET_PAYI_TANIMLARI.dengeli.moral, GANIMET_PAYI_TANIMLARI.comert.moral]).toEqual([-8, 0, 6]);
  });

  it("görev ganimeti savaş yılında yok; yağma yalnız ilk 2 savaş yılında, yenilgiden sonra yok", () => {
    const s = asker();
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 100, orta: 0, yuksek: 0 };
    s.rutbe_seviye = 3;
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    seferberlikUygula(s, "secme", bg(s));
    sv.ikmal = "yagma";
    sv.yil_sayac = 0;
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBeGreaterThan(0);
    sv.yil_sayac = 2; // 3. yıl: karar savaşı
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
    expect(e("musteri", 30).devsirme).toBe(2);
    expect(e("musteri", 90).devsirme).toBe(5);
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

  it("yatırım fiyatları: Karakol 12/20/32/48, Revir 13/22/34/50", () => {
    const profil = isletmeProfiliGetir("Asker", "Orta Çağ")!;
    expect(profil.yatirimlar.find((y) => y.id === "karakol")!.fiyatlar).toEqual([12, 20, 32, 48]);
    expect(profil.yatirimlar.find((y) => y.id === "revir")!.fiyatlar).toEqual([13, 22, 34, 50]);
    expect(profil.roller.map((r) => r.tur)).toEqual(["taarruz", "savunma", "kesif", "musteri", "guvenlik"]);
  });
});

describe("v39 haydut / sınır çatışması", () => {
  it("haydut tablosu yaşa göre yavaş artar, sınır ×1,3; savaş tablosundan düşüktür", async () => {
    const { barisDusmanGucuYas, dusmanReferansGucuYas } = await import("../src/data/birlik");
    expect(barisDusmanGucuYas(25, "haydut")).toBe(28);
    expect(barisDusmanGucuYas(45, "haydut")).toBe(80);
    expect(barisDusmanGucuYas(80, "haydut")).toBe(250);
    expect(barisDusmanGucuYas(35, "sinir")).toBeCloseTo(50 * 1.3, 6);
    for (const y of [25, 35, 45, 55, 65, 80]) expect(barisDusmanGucuYas(y, "haydut")).toBeLessThan(dusmanReferansGucuYas(y));
  });

  it("çatışma uyarısı baskın/av, düşman kaybı ve bizim kaybımız (yaralı ≥ ölü) içerir; yenilgide ganimet yok", () => {
    const sonuclar: IsletmeUyari[] = [];
    for (let n = 0; n < 60; n++) {
      const s = asker();
      s.yas = 40;
      s.rutbe_seviye = 3;
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = 100;
      birlikAl(s).kalite = { dusuk: 100, orta: 0, yuksek: 0 };
      birlikAl(s).baris_bekleme = 0;
      vi.spyOn(Math, "random").mockRestore();
      const u = birlikYilIsle(s, bg(s)).dokum.uyarilar ?? [];
      sonuclar.push(...u);
    }
    const c = sonuclar.filter((x) => x.kod === "baris_catisma");
    expect(c.length).toBeGreaterThan(10);
    expect(c.some((x) => x.baskin === true)).toBe(true);
    expect(c.some((x) => x.baskin === false)).toBe(true);
    expect(c.every((x) => typeof x.dusmanOlu === "number")).toBe(true);
    expect(c.filter((x) => x.savasSonucu === "yenilgi").every((x) => (x.tutar ?? 0) === 0)).toBe(true);
    const kayiplar = sonuclar.filter((x) => x.kod === "savas_kayip" && x.kaynak === "catisma");
    for (const k of kayiplar) expect((k.yaralanan ?? 0)).toBeGreaterThanOrEqual(k.sayi ?? 0);
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
    sv.ikmal = "yeterli";
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
        const tercih: Record<string, string> = { seferberlik: "dengeli", ikmal: "yeterli", rol: "ana" };
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
