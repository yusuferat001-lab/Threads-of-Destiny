import { describe, it, expect } from "vitest";
import { ozetHesapla } from "../src/db/metrikRepository";
import { olayGovdesiTemizle } from "../src/routes/istatistik.routes";

/** ozetHesapla saf bir fonksiyondur — sahte metrik satırlarıyla test edilir. */
type Satir = Parameters<typeof ozetHesapla>[0][number];

function satir(p: Partial<Satir>): Satir {
  return {
    tur: "yeni_oyun",
    istemci_id: "",
    cag: "",
    bolge: "",
    yerlesim: "",
    meslek: "",
    yas: 0,
    tur_sayisi: 0,
    servet: 0,
    skor: 0,
    olum_nedeni: "",
    oturum_sn: 0,
    createdAt: new Date(),
    ...p,
  };
}

describe("istatistik — ozetHesapla", () => {
  it("boş girdi için sıfırlı ama geçerli bir özet döner", () => {
    const o = ozetHesapla([]);
    expect(o.toplamKayit).toBe(0);
    expect(o.sayilar.tekilKisi).toBe(0);
    expect(o.tamamlanmaOrani).toBe(0);
    expect(o.gunlukSeri).toHaveLength(30);
  });

  it("tür sayaçlarını ve tekil kişiyi doğru toplar", () => {
    const o = ozetHesapla([
      satir({ tur: "ziyaret", istemci_id: "a" }),
      satir({ tur: "ziyaret", istemci_id: "b" }),
      satir({ tur: "yeni_oyun", istemci_id: "a", cag: "Orta Çağ", bolge: "Fransa", yerlesim: "Şehir Merkezi" }),
      satir({ tur: "meslek_secim", meslek: "Asker", cag: "Orta Çağ", bolge: "Fransa" }),
      satir({
        tur: "olum",
        cag: "Orta Çağ",
        bolge: "Fransa",
        yerlesim: "Şehir Merkezi",
        meslek: "Asker",
        yas: 60,
        tur_sayisi: 30,
        servet: 120,
        olum_nedeni: "Yaşlılık",
        oturum_sn: 600,
      }),
      satir({ tur: "skor_kaydi", skor: 5000 }),
    ]);
    expect(o.sayilar.ziyaret).toBe(2);
    expect(o.sayilar.yeniOyun).toBe(1);
    expect(o.sayilar.meslekSecim).toBe(1);
    expect(o.sayilar.olum).toBe(1);
    expect(o.sayilar.skorKaydi).toBe(1);
    expect(o.sayilar.tekilKisi).toBe(2); // "a" ve "b" (boşlar sayılmaz)
    expect(o.tamamlanmaOrani).toBe(1); // 1 ölüm / 1 yeni oyun
  });

  it("oyun-içi süre + gerçek-zaman + servet istatistiklerini hesaplar", () => {
    const o = ozetHesapla([
      satir({ tur: "olum", yas: 40, tur_sayisi: 20, servet: -50, oturum_sn: 120 }),
      satir({ tur: "olum", yas: 80, tur_sayisi: 40, servet: 300, oturum_sn: 360 }),
    ]);
    expect(o.oyunIciSure.yas.ortalama).toBe(60);
    expect(o.oyunIciSure.yas.medyan).toBe(60);
    expect(o.oyunIciSure.yas.maks).toBe(80);
    expect(o.gercekZamanOturumDk.ortalama).toBe(4); // (2 + 6) / 2
    expect(o.servet.borcluOlumOrani).toBe(0.5);
    expect(o.enSikOlumNedenleri).toEqual([]); // olum_nedeni boş
  });

  it("çağ/meslek dağılımında hem başlangıç hem ölüm sayısını verir", () => {
    const o = ozetHesapla([
      satir({ tur: "yeni_oyun", cag: "Sanayi Devrimi" }),
      satir({ tur: "yeni_oyun", cag: "Sanayi Devrimi" }),
      satir({ tur: "olum", cag: "Sanayi Devrimi" }),
      satir({ tur: "meslek_secim", meslek: "Tüccar" }),
      satir({ tur: "olum", meslek: "Tüccar" }),
    ]);
    expect(o.dagilim.cag["Sanayi Devrimi"]).toEqual({ yeniOyun: 2, olum: 1 });
    expect(o.dagilim.meslek["Tüccar"]).toEqual({ secim: 1, olum: 1 });
  });
});

describe("istatistik — olayGovdesiTemizle", () => {
  it("geçerli ziyaret olayını kabul eder + istemci_id'yi kırpar", () => {
    const r = olayGovdesiTemizle({ tur: "ziyaret", istemci_id: "  x".padEnd(200, "y") });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.istemci_id.length).toBeLessThanOrEqual(64);
  });

  it("client'ın yazamayacağı türleri reddeder", () => {
    expect(olayGovdesiTemizle({ tur: "olum" }).ok).toBe(false);
    expect(olayGovdesiTemizle({ tur: "yeni_oyun" }).ok).toBe(false);
    expect(olayGovdesiTemizle({}).ok).toBe(false);
    expect(olayGovdesiTemizle(null).ok).toBe(false);
  });
});
