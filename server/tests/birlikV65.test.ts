import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami, dunyaFinansEtkileri } from "../src/game/stateManager";
import { birlikAl, birlikHesapla } from "../src/game/birlik";
import { gucHesapla } from "../src/game/birlik";
import { savasYiliCoz, kayipUygula, barisCatismaCoz, barisCatismaKur, savasBaslat, savasiBitir, seferberlikUygula, sohretSonucuUygula, hazirlikCek, zaferSerisiIsle, saglikBedeliUygula } from "../src/game/birlikYil";
import { TAHMIN_ARALIGI_TABAN } from "../src/game/subay";
import { SAVAS_ZAR_YUZDE, gorevErOrani, ZAFER_SERISI_ESIGI, ZAFER_SERISI_ESIGI_2, IKMAL_TANIMLARI, SAVAS_BOZGUN_FIRARI, SAVAS_SONRA_KAYBI, SUVARI_GOREV_GELIRI } from "../src/data/birlik";
import { KISLA_BAKIM, KISLA_ER_LIMITI, SOHRET_SONUCU } from "../src/data/birlik";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 35;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  s.un = 50;
  s.saglik = 100;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("v65 kışla bakımı ve sonuca göre şöhret", () => {
  it("kışla bakımı düşük kademede yumuşak; tam dolu kışlada er başı bakım kademeyle artar", () => {
    expect(KISLA_BAKIM).toEqual([2, 6, 18, 50, 120]);
    const erBasi = KISLA_BAKIM.map((x, i) => x / KISLA_ER_LIMITI[i]);
    for (let i = 1; i < erBasi.length; i++) expect(erBasi[i]).toBeGreaterThan(erBasi[i - 1]);
    for (let i = 1; i < KISLA_BAKIM.length; i++) expect(KISLA_BAKIM[i]).toBeGreaterThan(KISLA_BAKIM[i - 1]);
  });

  it("şöhret aralıkları: haydut < sınır < savaş; yenilgi zaferden az değil (savaşta daha ağır)", () => {
    expect(SOHRET_SONUCU.haydut.zafer[1]).toBeLessThan(SOHRET_SONUCU.sinir.zafer[1]);
    expect(SOHRET_SONUCU.sinir.zafer[1]).toBeLessThan(SOHRET_SONUCU.savas.zafer[1]);
    expect(SOHRET_SONUCU.savas.zafer).toEqual([6.5, 8]);
    expect(SOHRET_SONUCU.savas.yenilgi[1]).toBeGreaterThan(SOHRET_SONUCU.sinir.yenilgi[1]);
    const s = asker();
    expect(sohretSonucuUygula(s, "savas", true, 1)).toBe(8);
    expect(s.un).toBe(58);
    for (let i = 0; i < 50; i++) {
      s.un = 50;
      const d = sohretSonucuUygula(s, "savas", true, 0.5);
      expect([7, 8]).toContain(d); // 7,25 → 7 ya da 8
    }
    s.un = 50;
    expect(sohretSonucuUygula(s, "savas", false, 1)).toBe(-5);
    expect(s.un).toBe(45);
    s.un = 1;
    sohretSonucuUygula(s, "savas", false, 1);
    expect(s.un).toBe(0); // alt sınır 0
  });

  it("çatışma: zafer şöhret kazandırır, yenilgi götürür; baskın ekstra; sonuç ekranına yansır", () => {
    const sonuc = (zafer: boolean, baskin: boolean, tur: "haydut" | "sinir") => {
      const s = asker();
      s.meslek_musteri = 100;
      const b = birlikAl(s);
      b.catisma_bekleyen = { yil: s.yil, tur, baskin, dusmanTur: "karma", dusmanGuc: zafer ? 1 : 100000 };
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      const r = barisCatismaCoz(s, b, bg(s), "savunma");
      vi.restoreAllMocks();
      return { r, fark: r.sohret ?? 0 }; // (ilk haydut zaferindeki madalya şöhreti ayrıdır)
    };
    for (const tur of ["haydut", "sinir"] as const) {
      const z = sonuc(true, false, tur);
      const y = sonuc(false, false, tur);
      expect(z.r.zafer).toBe(true);
      expect(y.r.zafer).toBe(false);
      expect(z.fark).toBeGreaterThanOrEqual(0);
      expect(y.fark).toBeLessThanOrEqual(0);
    }
    const bz = sonuc(true, true, "sinir");
    const bn = sonuc(true, false, "sinir");
    expect(bz.fark).toBeGreaterThan(bn.fark - 0.5);
    expect(sonuc(false, true, "sinir").fark).toBeLessThan(sonuc(false, false, "sinir").fark + 0.5);
  });

  it("büyük savaş sonu: zafer şöhret kazandırır, yenilgi götürür", () => {
    for (const zafer of [true, false]) {
      const s = asker();
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.sonuc = zafer ? "zafer" : "yenilgi";
      s.ulke.savasta = false;
      savasiBitir(s, b, bg(s), []);
      if (zafer) expect(s.un).toBeGreaterThanOrEqual(56);
      else expect(s.un).toBeLessThanOrEqual(47);
    }
  });

  it("tahmin aralığı ±%6,5, Keşif ile ±%2,5'e kadar iner; zar ±%4", () => {
    expect(TAHMIN_ARALIGI_TABAN).toBe(0.065);
    expect(SAVAS_ZAR_YUZDE).toBe(0.04);
  });

  it("zafer serisi: her tür ayrı sayılır; 3 arka arkaya zaferden sonra düşman +%10–15, yenilgi sıfırlar", () => {
    const s = asker();
    const b = birlikAl(s);
    for (let i = 0; i < 2; i++) zaferSerisiIsle(b, "haydut", true);
    expect(hazirlikCek(b, "haydut")).toBe(1);
    zaferSerisiIsle(b, "haydut", true);
    expect(b.zafer_serisi!.haydut).toBe(ZAFER_SERISI_ESIGI);
    expect(b.zafer_serisi!.sinir).toBe(0); // türler ayrı
    for (let i = 0; i < 40; i++) {
      const h = hazirlikCek(b, "haydut");
      expect(h).toBeGreaterThanOrEqual(1.1);
      expect(h).toBeLessThanOrEqual(1.15);
    }
    expect(hazirlikCek(b, "sinir")).toBe(1);
    zaferSerisiIsle(b, "haydut", true); // seri sürer
    expect(hazirlikCek(b, "haydut")).toBeGreaterThan(1);
    zaferSerisiIsle(b, "haydut", false); // yenilgi sıfırlar
    expect(b.zafer_serisi!.haydut).toBe(0);
    expect(hazirlikCek(b, "haydut")).toBe(1);
  });

  it("çatışma: seri varsa düşman gerçekten güçlenir ve penceredeki 'hazırlıklı' işareti çıkar; sonuç seriyi günceller", async () => {
    const { catismaKarariDurumu } = await import("../src/game/birlikIslem");
    const s = asker();
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    b.zafer_serisi = { haydut: 3, sinir: 3, savas: 0 };
    const k = barisCatismaKur(s, b);
    expect(k.hazirlik).toBeGreaterThan(1.09);
    expect(catismaKarariDurumu(s, bg(s))!.hazirlikli).toBe(true);
    vi.restoreAllMocks();
    const tur = k.tur;
    b.catisma_bekleyen = { ...k, dusmanGuc: 1 }; // kesin zafer
    barisCatismaCoz(s, b, bg(s), "savunma");
    expect(b.zafer_serisi![tur]).toBe(4);
    b.catisma_bekleyen = { yil: s.yil, tur, baskin: false, dusmanTur: "karma", dusmanGuc: 100000 };
    barisCatismaCoz(s, b, bg(s), "savunma");
    expect(b.zafer_serisi![tur]).toBe(0);
    // seri yokken pencere işaretsiz
    b.catisma_bekleyen = { yil: s.yil, tur, baskin: false, dusmanTur: "karma", dusmanGuc: 10 };
    expect(catismaKarariDurumu(s, bg(s))!.hazirlikli).toBe(false);
  });

  it("görev gelirinde er sayısına bağlı azalan verim: ≤200 er ×1, 350 → ~0,93, 500 → ~0,86; gelir ere göre hep artar", () => {
    expect(gorevErOrani(100)).toBe(1);
    expect(gorevErOrani(200)).toBe(1);
    expect(gorevErOrani(350)).toBeCloseTo((200 + 150 * 0.85) / 350, 8);
    expect(gorevErOrani(500)).toBeCloseTo((200 + 127.5 + 150 * 0.7) / 500, 8);
    let onceki = 0;
    for (let e = 10; e <= 500; e += 10) {
      expect(e * gorevErOrani(e)).toBeGreaterThan(onceki);
      onceki = e * gorevErOrani(e);
    }
  });

  it("savaş sağlık kaybı iyi ikmalle (yumuşak yağma) azalır, sert yağmayla artar", () => {
    expect(IKMAL_TANIMLARI.yagma_yumusak.yagma.kayip).toBeLessThan(IKMAL_TANIMLARI.yagma_orta.yagma.kayip);
    const kayip = (ikmal: "yagma_sert" | "yagma_orta" | "yagma_yumusak") => {
      const s = asker();
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      const sv = savasBaslat(s);
      sv.ikmal = ikmal;
      sv.saglik_plan = 20;
      sv.sonuc = "zafer";
      s.ulke.savasta = false;
      s.saglik = 100;
      savasiBitir(s, b, bg(s), []);
      return 100 - s.saglik;
    };
    expect(kayip("yagma_yumusak")).toBeLessThan(kayip("yagma_orta"));
    expect(kayip("yagma_sert")).toBeGreaterThan(kayip("yagma_orta"));
  });

  it("zafer serisi 5'e ulaşınca düşman bonusu +%20–25'e çıkar (3–4'te +%10–15); etki seri sürdükçe kalıcıdır; yenilgi sıfırlar", () => {
    const s = asker();
    const b = birlikAl(s);
    b.zafer_serisi = { haydut: 0, sinir: 0, savas: 0 };
    for (let i = 0; i < ZAFER_SERISI_ESIGI_2 - 1; i++) zaferSerisiIsle(b, "sinir", true);
    for (let i = 0; i < 40; i++) {
      const h = hazirlikCek(b, "sinir"); // seri 4
      expect(h).toBeGreaterThanOrEqual(1.1);
      expect(h).toBeLessThanOrEqual(1.15);
    }
    zaferSerisiIsle(b, "sinir", true); // seri 5
    for (let i = 0; i < 40; i++) {
      const h = hazirlikCek(b, "sinir");
      expect(h).toBeGreaterThanOrEqual(1.2);
      expect(h).toBeLessThanOrEqual(1.25);
    }
    for (let i = 0; i < 6; i++) zaferSerisiIsle(b, "sinir", true); // kalıcı: seri sürerken bonus düşmez
    expect(hazirlikCek(b, "sinir")).toBeGreaterThanOrEqual(1.2);
    expect(hazirlikCek(b, "haydut")).toBe(1); // türler ayrı
    zaferSerisiIsle(b, "sinir", false);
    expect(hazirlikCek(b, "sinir")).toBe(1);
  });

  it("büyük savaş YENİLGİSİNDE 4. yıl bozgun firarı yüksektir (%5–7) ve tavana sayılmaz; diğer yıllar ve zafer değişmez", () => {
    const yil = (sonuc: "zafer" | "yenilgi", yilNo: number) => {
      const s = asker();
      s.meslek_musteri = 100;
      s.ulke.savasta = true;
      const b = birlikAl(s);
      const sv = savasBaslat(s);
      seferberlikUygula(s, "secme", bg(s));
      sv.sonuc = sonuc;
      sv.yil_sayac = yilNo - 1;
      return savasYiliCoz(s, b, bg(s));
    };
    for (let i = 0; i < 30; i++) {
      const y4 = yil("yenilgi", 4);
      expect(y4.bozgun).toBe(true);
      expect(y4.firarPct).toBeGreaterThanOrEqual(SAVAS_BOZGUN_FIRARI[0]);
      expect(y4.firarPct).toBeLessThanOrEqual(SAVAS_BOZGUN_FIRARI[1]);
      expect(y4.firarPct).toBeGreaterThan(SAVAS_SONRA_KAYBI.yenilgi.firar[1]); // eski değerin üstünde
      const y5 = yil("yenilgi", 5);
      expect(y5.bozgun).toBeUndefined();
      expect(y5.firarPct).toBeLessThanOrEqual(SAVAS_SONRA_KAYBI.yenilgi.firar[1]);
      expect(yil("zafer", 4).bozgun).toBeUndefined(); // yalnız yenilgide
    }
    // bozgun firarı savaş toplam firar sayacına eklenmez (sonraki yıllar kendi payını korur)
    const s = asker();
    s.meslek_musteri = 200;
    s.ulke.savasta = true;
    const b = birlikAl(s);
    const sv = savasBaslat(s);
    sv.firar_toplam = 0;
    kayipUygula(s, b, { oluPct: 0, firarPct: 6, firarSayma: true });
    expect(sv.firar_toplam).toBe(0);
    kayipUygula(s, b, { oluPct: 0, firarPct: 6 });
    expect(sv.firar_toplam).toBeGreaterThan(0);
  });

  it("süvari birimi haraç ve vergi tahsilatı görev gelirini +%10 artırır (haydut/akın görevleri kalktığı için)", () => {
    const s = asker();
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 4;
    s.meslek_musteri = 200;
    const b = birlikAl(s);
    b.kalite = { dusuk: 200, orta: 0, yuksek: 0 };
    b.gorevler = ["tahsilat"];
    b.birlik_turler = [];
    const guc0 = gucHesapla(s).guc;
    const g0 = birlikHesapla(s, bg(s)).gorevGeliri;
    b.birlik_turler = ["suvari"];
    const guc1 = gucHesapla(s).guc;
    const g1 = birlikHesapla(s, bg(s)).gorevGeliri;
    expect(g0).toBeGreaterThan(0);
    expect(SUVARI_GOREV_GELIRI).toBe(0.1);
    expect(g1 / g0).toBeGreaterThan(1.05 * (guc1 / guc0) * 0.9); // güç değişimi + %10 bonus (güç/er bantları aynı bantta)
    b.gorevler = ["eskort"];
    b.birlik_turler = [];
    const e0 = birlikHesapla(s, bg(s)).gorevGeliri / gucHesapla(s).guc;
    b.birlik_turler = ["suvari"];
    const e1 = birlikHesapla(s, bg(s)).gorevGeliri / gucHesapla(s).guc;
    expect(e1 / e0).toBeCloseTo(1, 1); // eskortta bonus yok
  });
});

describe("dönem etkisi: ödeme (sold), erzak ve ana ekran satırı (asker)", () => {
  function nötrAsker() {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    s.yas = 30;
    mesleğiSec(s, "Asker");
    s.ulke.savasta = false;
    s.veba = undefined as never;
    ogretileriTamamla(s);
    s.isletme!.yatirimlar.kisla = 3;
    s.meslek_musteri = 200;
    birlikAl(s).kalite = { dusuk: 200, orta: 0, yuksek: 0 };
    return s;
  }
  const donemKur = (s: ReturnType<typeof nötrAsker>, tur: "bolluk" | "durgunluk" | "kitlik", maas: number, temelFiyat: number) => {
    s.ulke.donem = { ...s.ulke.donem!, tur, etki: { ...s.ulke.donem!.etki, maas, temelFiyat } };
  };

  it("sold dönemin maaş etkisiyle, erzak dönemin gıda fiyatıyla değişir", () => {
    const a = nötrAsker(); donemKur(a, "durgunluk", 1, 1);
    const b = nötrAsker(); donemKur(b, "kitlik", 0.9, 1.25);
    const c = nötrAsker(); donemKur(c, "bolluk", 1.08, 0.93);
    const ha = birlikHesapla(a, isletmeBaglami(a));
    const hb = birlikHesapla(b, isletmeBaglami(b));
    const hc = birlikHesapla(c, isletmeBaglami(c));
    expect(hb.sold / ha.sold).toBeCloseTo(0.9, 2);
    expect(hc.sold / ha.sold).toBeCloseTo(1.08, 2);
    expect(hb.erzak / ha.erzak).toBeCloseTo(1.25, 2);
    expect(hc.erzak / ha.erzak).toBeCloseTo(0.93, 2);
  });

  it("ana ekran dünya satırı Asker için maaş yerine sold/erzak/görev geliri yazar", () => {
    const s = nötrAsker(); donemKur(s, "kitlik", 0.9, 1.25);
    const metin = dunyaFinansEtkileri(s)[0].metin;
    expect(metin).not.toMatch(/maaş/);
    expect(metin).toMatch(/Soldée −%10/); // Fransa (Orta Çağ) ödeme adı; "sold" kelimesi yazılmaz
    expect(metin).not.toMatch(/(^|[\s:·])sold(\s|$)/i);
    expect(metin).toMatch(/erzak \+%25/);
    expect(metin).toMatch(/moral/);
  });
});
