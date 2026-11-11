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
