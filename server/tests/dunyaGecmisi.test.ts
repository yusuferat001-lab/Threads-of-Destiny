import { describe, it, expect } from "vitest";
import {
  createCharacter,
  ulkeGecmisiEkle,
  eskiKayitGocu,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  vebaBaslat,
  vebaBitisKontrolEt,
  krizEtkisiUygula,
} from "../src/game/stateManager";
import { dunyaGecmisiUret } from "../src/game/dunyaGecmisi";
import { dunyaGecmisiGetir, yeniOyun } from "../src/game/gameEngine";
import { DUNYA_OLAYLARI } from "../src/data/dunyaOlaylari";
import { CharacterState } from "../src/types";

function karakter(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ", bolge = "Fransa", dil = "tr"): CharacterState {
  return createCharacter(cag, bolge, "kasaba", "Test", dil);
}

describe("DUNYA_OLAYLARI verisi", () => {
  it("kapsamı bölge olan her kayıt bir bölge taşır, yilSon yildan küçük olamaz", () => {
    for (const o of DUNYA_OLAYLARI) {
      if (o.kapsam === "bolge") expect(o.bolge, o.baslik.tr).toBeTruthy();
      if (o.yilSon !== undefined) expect(o.yilSon).toBeGreaterThanOrEqual(o.yil);
      expect(o.baslik.tr.length).toBeGreaterThan(3);
      expect(o.baslik.en.length).toBeGreaterThan(3);
    }
  });

  it("her çağın yıl aralığında olaylar vardır", () => {
    expect(DUNYA_OLAYLARI.some((o) => o.cag === "Orta Çağ" && o.kapsam === "dunya")).toBe(true);
    expect(DUNYA_OLAYLARI.some((o) => o.cag === "Sanayi Devrimi" && o.kapsam === "dunya")).toBe(true);
  });
});

describe("ulkeGecmisiEkle", () => {
  it("en fazla 30 kayıt tutar, en eskiler düşer", () => {
    const s = karakter();
    for (let i = 0; i < 45; i++) ulkeGecmisiEkle(s, "kriz_basladi", 1100 + i, "kitlik");
    expect(s.ulke_gecmisi.length).toBe(30);
    expect(s.ulke_gecmisi[0].yil).toBe(1115);
    expect(s.ulke_gecmisi[29].yil).toBe(1144);
  });

  it("yeni karakterde boş başlar, eski kayıtta backfill edilir", () => {
    const s = karakter();
    expect(s.ulke_gecmisi).toEqual([]);
    delete (s as Partial<CharacterState>).ulke_gecmisi;
    eskiKayitGocu(s);
    expect(s.ulke_gecmisi).toEqual([]);
  });
});

describe("motor kayıt noktaları", () => {
  it("büyük savaş başlayınca ve bitince kaydedilir", () => {
    const s = karakter();
    s.yil = 1100;
    s.baslangic_yili = 1050;
    const orijinal = Math.random;
    Math.random = () => 0; // yıllık zarı kesin tutsun
    s.ulke.donem!.tur = "durgunluk"; // bollukta savaş başlamaz
    s.ulke.savasta = false;
    let mesaj: string | null;
    try {
      expect(buyukSavasKontrolEt(s, 1)).toBeNull(); // önce bir yıl önceden sinyal verir
      expect(s.dunya_yaklasan?.tur).toBe("savas");
      s.yil += 1;
      mesaj = buyukSavasKontrolEt(s, 1);
    } finally {
      Math.random = orijinal;
    }
    expect(mesaj).toBeTruthy();
    expect(s.ulke_gecmisi.at(-1)?.tur).toBe("savas_basladi");
    expect(s.ulke_gecmisi.at(-1)?.ayrinti).toBe(s.buyuk_savas!.dusman);
    s.yil = s.buyuk_savas!.bitisYili;
    expect(buyukSavasBitisKontrolEt(s)).toBeTruthy();
    expect(s.ulke_gecmisi.at(-1)?.tur).toBe("savas_bitti");
    expect(s.ulke_gecmisi.at(-1)?.yil).toBe(s.yil);
  });

  it("veba başlayınca ve aktif faz bitince kaydedilir", () => {
    const s = karakter();
    vebaBaslat(s, 0);
    expect(s.ulke_gecmisi.at(-1)).toEqual({ yil: s.yil, tur: "veba_basladi" });
    s.yil = s.veba!.bitisYili;
    expect(vebaBitisKontrolEt(s)).toBeTruthy();
    expect(s.ulke_gecmisi.at(-1)?.tur).toBe("veba_bitti");
  });

  it("kriz bitince kaydedilir", () => {
    const s = karakter();
    s.ulke.kriz = { tur: "kitlik", bitisYili: s.yil + 1 };
    s.yil = s.ulke.kriz.bitisYili;
    expect(krizEtkisiUygula(s, 1)).toBeTruthy();
    expect(s.ulke_gecmisi.at(-1)?.tur).toBe("kriz_bitti");
  });
});

describe("dunyaGecmisiUret", () => {
  it("yalnız son 15 yıllık pencereyi gösterir ve yeniden eskiye sıralar", () => {
    const s = karakter();
    s.yil = 1190; // 3. Haçlı Seferi (1189-92), II. Philippe Auguste hükümdar
    const g = dunyaGecmisiUret(s);
    expect(g.baslangicYili).toBe(1175);
    expect(g.dunya.some((m) => m.metin.includes("Üçüncü Haçlı"))).toBe(true);
    expect(g.dunya.some((m) => m.metin.includes("Hittin"))).toBe(true); // 1187
    expect(g.dunya.some((m) => m.metin.includes("Dördüncü Haçlı"))).toBe(false); // 1204, gelecek
    expect(g.dunya.some((m) => m.metin.includes("Malazgirt"))).toBe(false); // 1071, çok eski
    const anahtarlar = g.dunya.map((m) => m.yilSon ?? m.yil);
    expect([...anahtarlar].sort((a, b) => b - a)).toEqual(anahtarlar);
  });

  it("bölgeye özgü olaylar yalnız ilgili bölgede Ülkende bölümüne düşer", () => {
    const fr = karakter("Orta Çağ", "Fransa");
    fr.yil = 1215;
    const sl = karakter("Orta Çağ", "Selçuklu");
    sl.yil = 1215;
    expect(dunyaGecmisiUret(fr).ulke.some((m) => m.metin.includes("Bouvines"))).toBe(true);
    expect(dunyaGecmisiUret(sl).ulke.some((m) => m.metin.includes("Bouvines"))).toBe(false);
    // Dünya olayı herkeste var
    expect(dunyaGecmisiUret(fr).dunya.some((m) => m.metin.includes("Magna Carta"))).toBe(true);
    expect(dunyaGecmisiUret(sl).dunya.some((m) => m.metin.includes("Magna Carta"))).toBe(true);
  });

  it("çağa göre ayrışır: Sanayi Devrimi Fransa'sı Orta Çağ olaylarını görmez", () => {
    const s = karakter("Sanayi Devrimi", "Fransa");
    s.yil = 1816;
    const g = dunyaGecmisiUret(s);
    expect(g.dunya.some((m) => m.metin.includes("Waterloo"))).toBe(true);
    expect(g.ulke.some((m) => m.metin.includes("XVIII. Louis"))).toBe(true); // 1814 tahta çıkış
    expect(g.ulke.some((m) => m.metin.includes("Avrupa Koalisyonu"))).toBe(true); // 1803-15 tarihi savaş
    expect(g.ulke.concat(g.dunya).some((m) => m.metin.includes("Bouvines"))).toBe(false);
  });

  it("devam eden tarihi savaş tek bir sürüyor satırıdır", () => {
    const s = karakter("Orta Çağ", "Kutsal Roma");
    s.yil = 1090; // 1075-1122 Papalık savaşı sürüyor
    const savaslar = dunyaGecmisiUret(s).ulke.filter((m) => m.metin.includes("Papalık"));
    expect(savaslar.length).toBe(1);
    expect(savaslar[0].suruyor).toBe(true);
    expect(savaslar[0].yil).toBe(1075);
  });

  it("oyun içi kayıtlar eşleşip aralık olur, bitmemiş olan sürüyor görünür", () => {
    const s = karakter("Orta Çağ", "Bizans");
    s.yil = 1130;
    ulkeGecmisiEkle(s, "veba_basladi", 1120);
    ulkeGecmisiEkle(s, "veba_bitti", 1125);
    ulkeGecmisiEkle(s, "kriz_basladi", 1128, "kitlik");
    const g = dunyaGecmisiUret(s);
    const veba = g.ulke.find((m) => m.ikon === "☠️")!;
    expect(veba.yil).toBe(1120);
    expect(veba.yilSon).toBe(1125);
    const kitlik = g.ulke.find((m) => m.ikon === "🌾")!;
    expect(kitlik.suruyor).toBe(true);
    expect(kitlik.metin).toContain("Kıtlık");
  });

  it("oyun içi büyük savaş aynı düşmanın tarihi penceresiyle çift görünmez", () => {
    const s = karakter("Orta Çağ", "Selçuklu");
    s.yil = 1150; // 1147-49 Haçlı Ordusu penceresi
    ulkeGecmisiEkle(s, "savas_basladi", 1147, "Haçlı Ordusu");
    ulkeGecmisiEkle(s, "savas_bitti", 1149, "Haçlı Ordusu");
    const haclilar = dunyaGecmisiUret(s).ulke.filter((m) => m.metin.includes("Haçlı Ordusu"));
    expect(haclilar.length).toBe(1);
  });

  it("başlangıcı sınırdan düşmüş bitiş kaydı 'sona erdi' olarak görünür", () => {
    const s = karakter("Orta Çağ", "Bizans");
    s.yil = 1130;
    ulkeGecmisiEkle(s, "veba_bitti", 1125);
    const g = dunyaGecmisiUret(s);
    expect(g.ulke.some((m) => m.metin.includes("sona erdi"))).toBe(true);
  });

  it("İngilizce çıktı üretir", () => {
    const s = karakter("Sanayi Devrimi", "Osmanlı", "en");
    s.yil = 1840;
    const g = dunyaGecmisiUret(s);
    expect(g.ulke.some((m) => m.metin.includes("Tanzimat Edict"))).toBe(true);
    expect(g.ulke.some((m) => m.metin.includes("took the throne"))).toBe(true); // Abdülmecid 1839
    expect(g.ulke.some((m) => m.metin.includes("Sultan Abdülmecid"))).toBe(true);
    expect(g.ulke.every((m) => !/[ığşçö]/.test(m.metin.replace(/Abdülmecid|Osmanlı|Abdülaziz/g, "")))).toBe(true);
  });

  it("pencere dışında hiçbir şey yoksa boş listeler döner", () => {
    const s = karakter("Orta Çağ", "Fransa");
    s.yil = 1100;
    const g = dunyaGecmisiUret(s, 3);
    expect(Array.isArray(g.ulke)).toBe(true);
    expect(Array.isArray(g.dunya)).toBe(true);
  });
});

describe("dunyaGecmisiGetir (motor köprüsü)", () => {
  it("var olan oturum için döner ve state'i değiştirmez", async () => {
    const s = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "Test", "tr");
    const onceki = JSON.stringify(s);
    const g = await dunyaGecmisiGetir(s.id);
    expect(g.bolge).toBe("Fransa");
    expect(g.yil).toBe(s.yil);
    expect(JSON.stringify(s)).toBe(onceki);
  });

  it("bilinmeyen oturumda hata fırlatır", async () => {
    await expect(dunyaGecmisiGetir("yok")).rejects.toThrow();
  });
});
