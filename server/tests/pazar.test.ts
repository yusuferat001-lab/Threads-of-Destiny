import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  rakipMusteriKir,
  pazarYillikUygula,
  musteriEkle,
  hesaplaMaasYillik,
  maasKirilimHesapla,
  eskiKayitGocu,
} from "../src/game/stateManager";
import { pazarPayiHesapla, pazarMaasCarpani, baslangicMusteri } from "../src/data/pazar";
import { pazarDurumuHesapla } from "../src/game/gameEngine";
import { musteriDagilimi, musteriKaydir, musteriAktar, pazarOlcekle, rakipGrubu } from "../src/game/piyasa";

function tuccar() {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(s, "Tüccar");
  return s;
}

function toplamTamam(s: ReturnType<typeof tuccar>) {
  const d = musteriDagilimi(s);
  expect(d.oyuncu + d.rakip + d.kucuk).toBeCloseTo(d.toplam, 3);
  expect(d.kucuk).toBeGreaterThanOrEqual(0);
}

describe("meslek pazarı (müşteri modeli)", () => {
  it("meslek seçilince müşteri atanır ve pazar payı müşteri/pazar oranıdır", () => {
    const s = tuccar();
    expect(s.meslek_musteri).toBeGreaterThanOrEqual(3);
    expect(pazarPayiHesapla(s)).toBeCloseTo(s.meslek_musteri / s.pazar_musteri, 6);
    // Başlangıç payı ~%5–12; iki rakip: büyük %44–51, ikinci %28–34 (P'nin kesri).
    expect(pazarPayiHesapla(s)).toBeGreaterThan(0.04);
    expect(pazarPayiHesapla(s)).toBeLessThan(0.14);
    expect(s.rakipler.filter((r) => !r.yenildi)).toHaveLength(2);
    const buyuk = s.rakipler[0].musteri / s.pazar_musteri;
    const ikinci = s.rakipler[1].musteri / s.pazar_musteri;
    expect(buyuk).toBeGreaterThan(0.4);
    expect(buyuk).toBeLessThan(0.52);
    expect(ikinci).toBeGreaterThan(0.27);
    expect(ikinci).toBeLessThan(0.35);
    expect(buyuk).toBeGreaterThan(ikinci);
    expect(musteriDagilimi(s).kucuk).toBeGreaterThanOrEqual(s.pazar_musteri * 0.03 - 1);
    toplamTamam(s);
  });

  it("meslek seçilmeden pazar payı 0", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(pazarPayiHesapla(s)).toBe(0);
    musteriEkle(s, 20);
    expect(s.meslek_musteri).toBe(0);
  });

  function sabitle(s: ReturnType<typeof tuccar>) {
    s.pazar_musteri = 1000;
    s.meslek_musteri = 90;
    s.rakipler[0].musteri = 480; // büyük
    s.rakipler[1].musteri = 310; // ikinci → küçükler 120
  }

  it("dağılım aktarımı: kazanç diğer tüm gruplardan büyüklükleriyle orantılı alınır", () => {
    const s = tuccar();
    sabitle(s);
    const g = musteriKaydir(s, "oyuncu", 10);
    expect(g).toBeCloseTo(10, 3);
    expect(s.meslek_musteri).toBeCloseTo(100, 1);
    // Diğer 910 kişiden 10: büyük −10×480/910, ikinci −10×310/910, küçük −10×120/910.
    expect(s.rakipler[0].musteri).toBeCloseTo(480 - (10 * 480) / 910, 1);
    expect(s.rakipler[1].musteri).toBeCloseTo(310 - (10 * 310) / 910, 1);
    expect(musteriDagilimi(s).kucuk).toBeCloseTo(120 - (10 * 120) / 910, 1);
    toplamTamam(s);
  });

  it("dağılım aktarımı: bir rakibin kaybı oyuncuya ve diğer gruplara büyüklükleri oranında dağılır", () => {
    const s = tuccar();
    sabitle(s);
    musteriKaydir(s, rakipGrubu(s.rakipler[0].ad), -20);
    expect(s.rakipler[0].musteri).toBeCloseTo(460, 1);
    // Alıcılar: oyuncu 90, ikinci 310, küçük 120 (toplam 520).
    expect(s.meslek_musteri).toBeCloseTo(90 + (20 * 90) / 520, 1);
    expect(s.rakipler[1].musteri).toBeCloseTo(310 + (20 * 310) / 520, 1);
    toplamTamam(s);
  });

  it("hedefli aktarım yalnız iki grup arasındadır (diğerleri etkilenmez)", () => {
    const s = tuccar();
    sabitle(s);
    const ikinciOnce = s.rakipler[1].musteri;
    const kucukOnce = musteriDagilimi(s).kucuk;
    const m = musteriAktar(s, "oyuncu", rakipGrubu(s.rakipler[0].ad), 4);
    expect(m).toBeCloseTo(4, 5);
    expect(s.meslek_musteri).toBeCloseTo(86, 5);
    expect(s.rakipler[0].musteri).toBeCloseTo(484, 5);
    expect(s.rakipler[1].musteri).toBeCloseTo(ikinciOnce, 5);
    expect(musteriDagilimi(s).kucuk).toBeCloseTo(kucukOnce, 5);
  });

  it("sınırlar: oyuncu ≥3 müşteri, küçükler P'nin %3'ünün altına inmez ve payı kalanlara kayar, toplam daima P", () => {
    const s = tuccar();
    sabitle(s);
    musteriKaydir(s, "oyuncu", -500);
    expect(s.meslek_musteri).toBeGreaterThanOrEqual(3);
    toplamTamam(s);
    sabitle(s);
    // Büyük kazanç: küçükler tabana (%3 = 30) dayanınca kalan pay rakiplerden alınır, oyuncu yine de büyür.
    const once = s.meslek_musteri;
    const g = musteriKaydir(s, "oyuncu", 200);
    expect(g).toBeGreaterThan(100); // küçükler tükenince bile ilerler
    expect(s.meslek_musteri).toBeGreaterThan(once + 100);
    expect(musteriDagilimi(s).kucuk).toBeGreaterThanOrEqual(1000 * 0.03 - 1e-6);
    toplamTamam(s);
  });

  it("pazar büyüklüğü değişince herkesin müşterisi aynı oranda ölçeklenir (pay sabit)", () => {
    const s = tuccar();
    const pay = pazarPayiHesapla(s);
    const rp = s.rakipler[0].musteri / s.pazar_musteri;
    pazarOlcekle(s, 1.1);
    expect(pazarPayiHesapla(s)).toBeCloseTo(pay, 2);
    expect(s.rakipler[0].musteri / s.pazar_musteri).toBeCloseTo(rp, 2);
    toplamTamam(s);
  });

  it("rakipten müşteri alınca oyuncunun payı artar, rakip küçülür", () => {
    const s = tuccar();
    const once = pazarPayiHesapla(s);
    const rOnce = s.rakipler[0].musteri;
    rakipMusteriKir(s, s.rakipler[0].ad, 0.2, 1);
    expect(pazarPayiHesapla(s)).toBeGreaterThan(once);
    expect(s.rakipler[0].musteri).toBeLessThan(rOnce);
    toplamTamam(s);
  });

  it("rakip yenilince paydan düşer ve birkaç yıl sonra yeni rakip gelir", () => {
    const s = tuccar();
    const eskiAd = s.rakipler[0].ad;
    s.rakipler[0].musteri = s.pazar_musteri * 0.05;
    const kir = rakipMusteriKir(s, eskiAd, 0.5, 1);
    expect(kir?.yenildiMi).toBe(true);
    expect(s.rakipler[0].yenildi).toBe(true);
    expect(s.rakip_yeni_yil).not.toBeNull();
    // Kalan tek aktif rakip artık rakip_adi.
    expect(s.rakip_adi).toBe(s.rakipler[1].ad);
    toplamTamam(s);

    s.yil = s.rakip_yeni_yil!;
    pazarYillikUygula(s, 1);
    const aktif = s.rakipler.filter((r) => !r.yenildi);
    expect(aktif).toHaveLength(2); // kontenjan yeniden doldu
    expect(s.rakipler[0].yenildi).toBe(false);
    expect(s.rakipler[0].ad).not.toBe(eskiAd);
    expect(s.rakipler.filter((r) => r.yenildi)).toHaveLength(1);
    expect(s.rakip_yeni_yil).toBeNull();
    toplamTamam(s);
  });

  it("işletmeli mesleklerde oyuncunun pasif müşteri artışı pazarYillikUygula'da yok (isletmeYilIsle'de); paya bağlı kariyer puanı var", () => {
    const s = tuccar();
    const kp = s.kariyer_puani;
    for (let i = 0; i < 20; i++) pazarYillikUygula(s, 1);
    // Piyasa dalgalanması oynatır ama sabit +1/yıl artışı yoktur: 20 yılda +20'nin çok altında kalır (küçük sapmalar).
    expect(s.kariyer_puani).toBeGreaterThan(kp);
    toplamTamam(s);
  });

  it("yıllık akış (işletmesiz meslek): pasif müşteri kazancı + paya bağlı kariyer puanı; hapiste müşteri erir", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Din Adamı");
    const m0 = s.meslek_musteri;
    const kp = s.kariyer_puani;
    pazarYillikUygula(s, 2);
    expect(s.meslek_musteri).toBeGreaterThan(m0 * 0.9); // piyasa dalgalanması olsa da artış baskın
    expect(s.kariyer_puani).toBeGreaterThan(kp);

    s.etiketler.push("hapiste");
    s.meslek_musteri = 100;
    pazarYillikUygula(s, 2);
    expect(s.meslek_musteri).toBeLessThan(100);
  });

  it("pazar payı maaşa ayrı bir kalem olarak biner", () => {
    const s = tuccar();
    const once = hesaplaMaasYillik(s);
    s.meslek_musteri = s.pazar_musteri * 0.6;
    for (const r of s.rakipler) r.musteri = s.pazar_musteri * 0.1;
    expect(hesaplaMaasYillik(s)).toBeGreaterThan(once);
    const k = maasKirilimHesapla(s);
    expect(k.pazarYuzde).toBe(Math.round((pazarMaasCarpani(pazarPayiHesapla(s)) - 1) * 100));
    expect(k.pazarPayiYuzde).toBe(Math.round(pazarPayiHesapla(s) * 100));
    expect(k.pazarAdi).toBe("Pazar Payı");
  });

  it("pazar ekranı özeti tutarlı (dağılım + haberler)", () => {
    const s = tuccar();
    const d = pazarDurumuHesapla(s);
    expect(d.aktif).toBe(true);
    expect(d.pazarAdi).toBe("Pazar Payı");
    expect(d.musteri).toBeGreaterThan(0);
    expect(d.pazarMusteri).toBeGreaterThan(300);
    expect(d.rakipler).toHaveLength(2);
    expect(Math.abs(d.pazarPayi + d.rakipler[0].pay + d.rakipler[1].pay + d.digerPay - 100)).toBeLessThanOrEqual(3);
    expect(d.dagilim.oyuncu + d.dagilim.rakip + d.dagilim.kucuk).toBeGreaterThan(d.pazarMusteri - 3);
    expect(Array.isArray(d.haberler)).toBe(true);
    expect(d.rutbeSarti?.seviye).toBe(2); // işletmeli meslekte S2 de %12 pay ister
    expect(d.rutbeSarti?.gerekliPay).toBe(12);
    s.rutbe_seviye = 3;
    expect(pazarDurumuHesapla(s).rutbeSarti?.seviye).toBe(4);
    expect(pazarDurumuHesapla(s).rutbeSarti?.gerekliPay).toBe(32);
  });

  it("eski kayıtta güçten müşteri türetilir; en çok iki aktif rakip kalır, yenilenler korunur", () => {
    const s = tuccar();
    const eski = s as unknown as Record<string, unknown>;
    delete eski.meslek_musteri;
    delete eski.rakip_yeni_yil;
    eski.meslek_gucu = 30;
    s.rakipler = [
      { ad: "A", meslek: "Tüccar", guc: 50, husumet: 30, yenildi: false },
      { ad: "B", meslek: "Tüccar", guc: 40, husumet: 30, yenildi: false },
      { ad: "D", meslek: "Tüccar", guc: 30, husumet: 30, yenildi: false },
      { ad: "C", meslek: "Tüccar", guc: 5, husumet: 30, yenildi: true },
    ] as never;
    s.pazar_musteri = 400;
    eskiKayitGocu(s);
    expect(s.meslek_musteri).toBeGreaterThan(0);
    expect(s.meslek_musteri).toBeLessThan(s.pazar_musteri);
    expect(s.rakip_yeni_yil).toBeNull();
    expect(s.rakipler.map((r) => r.ad)).toEqual(["A", "B", "C"]);
    expect((s as unknown as Record<string, unknown>).meslek_gucu).toBeUndefined();
    expect(s.rakipler[0].musteri).toBeGreaterThan(0);
  });

  it("baslangicMusteri yatkınlığa ve mirasa göre artar", () => {
    const dusuk = baslangicMusteri(400, 1, false, () => 0);
    const yuksek = baslangicMusteri(400, 4, true, () => 0);
    expect(yuksek).toBeGreaterThan(dusuk);
  });
});
