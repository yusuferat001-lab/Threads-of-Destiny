import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  rakipGucKir,
  pazarYillikUygula,
  meslekGucuEkle,
  hesaplaMaasYillik,
  maasKirilimHesapla,
  eskiKayitGocu,
} from "../src/game/stateManager";
import { pazarPayiHesapla, pazarMaasCarpani, PAZAR_DIGER_GUC, baslangicMeslekGucu } from "../src/data/pazar";
import { pazarDurumuHesapla } from "../src/game/gameEngine";

function tuccar() {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(s, "Tüccar");
  return s;
}

describe("meslek pazarı", () => {
  it("meslek seçilince güç atanır ve pazar payı güç oranından türetilir", () => {
    const s = tuccar();
    expect(s.meslek_gucu).toBeGreaterThanOrEqual(10);
    const rakip = s.rakipler[0].guc;
    expect(pazarPayiHesapla(s)).toBeCloseTo(s.meslek_gucu / (s.meslek_gucu + rakip + PAZAR_DIGER_GUC), 6);
  });

  it("meslek seçilmeden pazar payı 0", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(pazarPayiHesapla(s)).toBe(0);
    meslekGucuEkle(s, 20);
    expect(s.meslek_gucu).toBe(0);
  });

  it("rakibin gücü kırılınca oyuncunun pazar payı artar", () => {
    const s = tuccar();
    const once = pazarPayiHesapla(s);
    rakipGucKir(s, s.rakipler[0].ad, 20, 1);
    expect(pazarPayiHesapla(s)).toBeGreaterThan(once);
  });

  it("rakip yenilince paydan düşer ve birkaç yıl sonra yeni rakip gelir", () => {
    const s = tuccar();
    const eskiAd = s.rakipler[0].ad;
    s.rakipler[0].guc = 15;
    const kir = rakipGucKir(s, eskiAd, 20, 1);
    expect(kir?.yenildiMi).toBe(true);
    expect(s.rakip_yeni_yil).not.toBeNull();
    // Yenilen rakip artık pazarda değil: pay = güç / (güç + diğer)
    expect(pazarPayiHesapla(s)).toBeCloseTo(s.meslek_gucu / (s.meslek_gucu + PAZAR_DIGER_GUC), 6);

    s.yil = s.rakip_yeni_yil!;
    const mesaj = pazarYillikUygula(s, 1);
    expect(mesaj).toBeTruthy();
    expect(s.rakipler).toHaveLength(2);
    expect(s.rakipler[0].yenildi).toBe(false);
    expect(s.rakipler[0].ad).not.toBe(eskiAd);
    expect(s.rakip_adi).toBe(s.rakipler[0].ad);
    expect(s.rakipler[1].yenildi).toBe(true);
    expect(s.rakip_yeni_yil).toBeNull();
  });

  it("yıllık akış: pasif güç kazancı + paya bağlı kariyer puanı; hapiste güç erir", () => {
    const s = tuccar();
    const guc = s.meslek_gucu;
    const kp = s.kariyer_puani;
    pazarYillikUygula(s, 2);
    expect(s.meslek_gucu).toBeGreaterThan(guc);
    expect(s.kariyer_puani).toBeGreaterThan(kp);

    s.etiketler.push("hapiste");
    const g2 = s.meslek_gucu;
    pazarYillikUygula(s, 2);
    expect(s.meslek_gucu).toBeLessThan(g2);
  });

  it("pazar payı maaşa ayrı bir kalem olarak biner", () => {
    const s = tuccar();
    const once = hesaplaMaasYillik(s);
    s.meslek_gucu = 100;
    s.rakipler[0].guc = 0;
    expect(hesaplaMaasYillik(s)).toBeGreaterThan(once);
    const k = maasKirilimHesapla(s);
    expect(k.pazarYuzde).toBe(Math.round((pazarMaasCarpani(pazarPayiHesapla(s)) - 1) * 100));
    expect(k.pazarPayiYuzde).toBe(Math.round(pazarPayiHesapla(s) * 100));
    expect(k.pazarAdi).toBe("Pazar Payı");
  });

  it("pazar ekranı özeti tutarlı", () => {
    const s = tuccar();
    const d = pazarDurumuHesapla(s);
    expect(d.aktif).toBe(true);
    expect(d.pazarAdi).toBe("Pazar Payı");
    expect(d.gucAdi).toBe("Ticari Güç");
    expect(d.rakipler).toHaveLength(1);
    expect(Math.abs(d.pazarPayi + d.rakipler[0].pay + d.digerPay - 100)).toBeLessThanOrEqual(2);
    expect(d.rutbeSarti).toBeNull(); // S2 pazar şartı istemez
    s.rutbe_seviye = 3;
    expect(pazarDurumuHesapla(s).rutbeSarti?.seviye).toBe(4);
  });

  it("eski kayıtlara güç verilir; birden çok aktif rakip teke iner, yenilenler korunur", () => {
    const s = tuccar();
    delete (s as unknown as Record<string, unknown>).meslek_gucu;
    delete (s as unknown as Record<string, unknown>).rakip_yeni_yil;
    s.rakipler = [
      { ad: "A", meslek: "Tüccar", guc: 50, husumet: 30, yenildi: false },
      { ad: "B", meslek: "Tüccar", guc: 40, husumet: 30, yenildi: false },
      { ad: "C", meslek: "Tüccar", guc: 5, husumet: 30, yenildi: true },
    ];
    eskiKayitGocu(s);
    expect(s.meslek_gucu).toBeGreaterThanOrEqual(baslangicMeslekGucu(1, false));
    expect(s.rakip_yeni_yil).toBeNull();
    expect(s.rakipler.map((r) => r.ad)).toEqual(["A", "C"]);
  });
});
