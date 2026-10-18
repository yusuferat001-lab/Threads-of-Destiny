import { describe, it, expect, vi, afterEach } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  magazaFiyatiHesapla,
  envanterBozulmasiUygula,
  temelMagazaKilitliMi,
  TEMEL_MAGAZA_KILIT_SURESI_YIL,
  ilkDonemOlustur,
} from "../src/game/stateManager";
import {
  yeniOyun,
  mesleğiAta,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
} from "../src/game/gameEngine";
import { MAGAZA_ESYALARI, magazaEsyasiTanimiGetir } from "../src/data/magazaEsyalari";
import type { CharacterState } from "../src/types";

function taze(): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(state, "Tüccar");
  state.para = 2000;
  // Rastgele başlangıç dönemi (kıtlık çıkabilir) karşılaştırmaları bozmasın: sabit durgunluk.
  state.ulke.donem = ilkDonemOlustur(state.yil, "durgunluk");
  state.ulke.donem.bitisYili = state.yil + 50;
  state.ulke.ekonomi = "normal";
  return state;
}

afterEach(() => {
  vi.restoreAllMocks(); // sifa zar testlerindeki Math.random mock'u diğer testlere sızmasın
});

describe("mağaza kataloğu — fiyat/etki dengesi mantıklı olmalı", () => {
  it("her sifa eşyası için: fiyat arttıkça toplam (saglik+mutluluk) etki de artar", () => {
    const sifaEsyalari = [...MAGAZA_ESYALARI.filter((e) => e.kategori === "sifa")].sort(
      (a, b) => a.tabanFiyat - b.tabanFiyat
    );
    let oncekiToplamEtki = -Infinity;
    for (const esya of sifaEsyalari) {
      const toplamEtki = (esya.saglikEtkisi ?? 0) + (esya.mutlulukEtkisi ?? 0);
      expect(toplamEtki).toBeGreaterThan(oncekiToplamEtki);
      oncekiToplamEtki = toplamEtki;
    }
  });

  it("ucuz sifa eşyaları sadece sağlık verir, pahalı olanlar hem sağlık hem mutluluk verir", () => {
    const ucuzEsyalar = MAGAZA_ESYALARI.filter((e) => e.kategori === "sifa" && e.tabanFiyat < 30);
    const pahaliEsyalar = MAGAZA_ESYALARI.filter((e) => e.kategori === "sifa" && e.tabanFiyat >= 30);
    expect(ucuzEsyalar.length).toBeGreaterThan(0);
    expect(pahaliEsyalar.length).toBeGreaterThan(0);
    for (const esya of ucuzEsyalar) {
      expect(esya.saglikEtkisi).toBeGreaterThan(0);
      expect(esya.mutlulukEtkisi ?? 0).toBe(0);
    }
    for (const esya of pahaliEsyalar) {
      expect(esya.saglikEtkisi ?? 0).toBeGreaterThan(0);
      expect(esya.mutlulukEtkisi ?? 0).toBeGreaterThan(0);
    }
  });

  it("her sifa eşyasının ömrü 7-12 yıl arasındadır", () => {
    for (const esya of MAGAZA_ESYALARI.filter((e) => e.kategori === "sifa")) {
      expect(esya.omurYil).toBeGreaterThanOrEqual(7);
      expect(esya.omurYil).toBeLessThanOrEqual(12);
    }
  });

  it("luks eşyalarda omurYil tanımlı değildir (çürümez)", () => {
    for (const esya of MAGAZA_ESYALARI.filter((e) => e.kategori === "luks")) {
      expect(esya.omurYil).toBeUndefined();
    }
  });
});

describe("mağaza fiyatı — dünya durumuna göre dinamik", () => {
  it("şifa eşyası kıtlıkta pahalanır", () => {
    const otlar = magazaEsyasiTanimiGetir("sifali_otlar");
    const normal = taze();
    const kitlik = taze();
    kitlik.ulke.kriz = { tur: "kitlik", bitisYili: 9999 };
    expect(magazaFiyatiHesapla(otlar, kitlik)).toBeGreaterThan(magazaFiyatiHesapla(otlar, normal));
  });

  it("lüks eşya savaşta ucuzlar, altın çağda pahalanır (tüketimin tersi yönde)", () => {
    const mucevher = magazaEsyasiTanimiGetir("degerli_mucevher");
    const normal = taze();
    const savas = taze();
    savas.ulke.savasta = true;
    const altinCag = taze();
    altinCag.ulke.kriz = { tur: "altin_cag", bitisYili: 9999 };
    expect(magazaFiyatiHesapla(mucevher, savas)).toBeLessThan(magazaFiyatiHesapla(mucevher, normal));
    expect(magazaFiyatiHesapla(mucevher, altinCag)).toBeGreaterThan(magazaFiyatiHesapla(mucevher, normal));
  });
});

describe("envanterBozulmasiUygula — yıl bazlı bozulma + lüks bakım masrafı", () => {
  it("sifa: kalanYil geçen yıl kadar azalır, 0'a inince eşya silinir (tur değil YIL sayısına göre)", () => {
    const state = taze();
    state.magaza_envanteri = [
      { id: "a", katalogId: "kaliteli_erzak", ad: "Kaliteli Erzak Sepeti", simge: "🧺", kategori: "sifa", alisYili: state.yil, kalanYil: 7 },
    ];
    let sonuc = envanterBozulmasiUygula(state, 2); // bir turda 2 yıl geçmiş olsun
    expect(sonuc.cozulenler).toHaveLength(0);
    expect(state.magaza_envanteri[0].kalanYil).toBe(5);

    sonuc = envanterBozulmasiUygula(state, 5); // kalan 5 yılı da tüketsin
    expect(sonuc.cozulenler).toEqual(["Kaliteli Erzak Sepeti"]);
    expect(state.magaza_envanteri).toHaveLength(0);
  });

  it("luks: kalanYil dolunca eşya SİLİNMEZ, ~%20 bakım masrafı çıkar ve sayaç sıfırlanır", () => {
    const state = taze();
    state.magaza_envanteri = [
      { id: "b", katalogId: "degerli_mucevher", ad: "Değerli Mücevher", simge: "💎", kategori: "luks", alisYili: state.yil, kalanYil: 1 },
    ];
    const oncekiPara = state.para;
    const sonuc = envanterBozulmasiUygula(state, 1);

    expect(state.magaza_envanteri).toHaveLength(1); // silinmedi
    expect(sonuc.bakimOdemeleri).toHaveLength(1);
    expect(sonuc.bakimOdemeleri[0].ad).toBe("Değerli Mücevher");
    expect(state.para).toBeLessThan(oncekiPara);
    // ~%20 (130-180 taban değer aralığında mantıklı bir masraf)
    const masraf = oncekiPara - state.para;
    expect(masraf).toBeGreaterThan(5);
    expect(masraf).toBeLessThan(80);
    // yeniden 8-10 yıl aralığına sıfırlanmış olmalı
    expect(state.magaza_envanteri[0].kalanYil).toBeGreaterThanOrEqual(8);
    expect(state.magaza_envanteri[0].kalanYil).toBeLessThanOrEqual(10);
  });

  it("bakım masrafının son basamağı asla 0 ya da 5 olmaz", () => {
    const state = taze();
    for (let i = 0; i < 30; i++) {
      state.magaza_envanteri = [
        { id: `x${i}`, katalogId: "antika_eser", ad: "Antika Eser", simge: "🏛️", kategori: "luks", alisYili: state.yil, kalanYil: 1 },
      ];
      const oncekiPara = state.para;
      const sonuc = envanterBozulmasiUygula(state, 1);
      const masraf = Math.round(oncekiPara - state.para);
      expect(masraf % 10).not.toBe(0);
      expect(masraf % 10).not.toBe(5);
      expect(sonuc.bakimOdemeleri).toHaveLength(1);
    }
  });

  it("yasArtisi<=0 iken hiçbir şey değişmez", () => {
    const state = taze();
    state.magaza_envanteri = [
      { id: "c", katalogId: "kaliteli_erzak", ad: "Kaliteli Erzak Sepeti", simge: "🧺", kategori: "sifa", alisYili: state.yil, kalanYil: 7 },
    ];
    const sonuc = envanterBozulmasiUygula(state, 0);
    expect(sonuc.cozulenler).toHaveLength(0);
    expect(sonuc.bakimOdemeleri).toHaveLength(0);
    expect(state.magaza_envanteri[0].kalanYil).toBe(7);
  });
});

describe("temelMagazaKilitliMi — sifa kategorisi satın alma kilidi", () => {
  it("kilit yokken false döner", () => {
    const state = taze();
    expect(temelMagazaKilitliMi(state)).toBe(false);
  });

  it("kilit bitiş yılına ulaşılınca açılır", () => {
    const state = taze();
    state.magaza_temel_kilit_bitis_yili = state.yil + 3;
    expect(temelMagazaKilitliMi(state)).toBe(true);
    state.yil += 3;
    expect(temelMagazaKilitliMi(state)).toBe(false);
  });
});

describe("gameEngine entegrasyonu — mağaza/envanter aksiyonları", () => {
  it("magazadanSatinAl: sifa eşyası parayı düşürür, envantere ekler, TÜM sifa kategorisini kilitler", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;
    const oncekiSaglik = state.saglik;

    const sonuc = await magazadanSatinAl(state.id, "kaliteli_erzak");
    expect(sonuc.state.para).toBeLessThan(500);
    expect(sonuc.state.magaza_envanteri).toHaveLength(1);
    expect(sonuc.state.saglik).toBe(oncekiSaglik); // kullanılmadan etki uygulanmaz
    expect(sonuc.state.magaza_temel_kilit_bitis_yili).toBe(sonuc.state.yil + TEMEL_MAGAZA_KILIT_SURESI_YIL);

    // Aynı ya da başka bir sifa eşyası artık alınamaz
    await expect(magazadanSatinAl(state.id, "sifali_otlar")).rejects.toThrow();
  });

  it("kilit süresi geçince sifa alışverişi yeniden açılır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;
    await magazadanSatinAl(state.id, "kaliteli_erzak");

    state.yil += TEMEL_MAGAZA_KILIT_SURESI_YIL; // kilidi manuel olarak süresi doldur
    state.para = 500;
    const sonuc = await magazadanSatinAl(state.id, "sifali_otlar");
    expect(sonuc.state.magaza_envanteri).toHaveLength(2);
  });

  it("magazadanSatinAl: luks eşya ünü hemen artırır, aynı eşya bir daha satın alınamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1000;
    const oncekiUn = state.un;

    const sonuc = await magazadanSatinAl(state.id, "ipek_hali");
    expect(sonuc.state.un).toBeGreaterThan(oncekiUn);
    expect(sonuc.state.magaza_envanteri[0].kategori).toBe("luks");

    state.para = 1000;
    await expect(magazadanSatinAl(state.id, "ipek_hali")).rejects.toThrow();
    // Farklı bir luks eşya (kategori kilidi yok, sadece kendi türünde tekil) hâlâ alınabilir
    const ikinciLuks = await magazadanSatinAl(state.id, "nadide_tablo");
    expect(ikinciLuks.state.magaza_envanteri).toHaveLength(2);
  });

  it("magazaConfigGetir: kilitli/sahip alanları doğru yansıtır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1000;
    await magazadanSatinAl(state.id, "ipek_hali");
    await magazadanSatinAl(state.id, "kaliteli_erzak");

    const katalog = await magazaConfigGetir(state.id);
    const ipekHali = katalog.find((k) => k.id === "ipek_hali")!;
    expect(ipekHali.sahipMi).toBe(true);

    const digerSifa = katalog.find((k) => k.id === "sifali_otlar")!;
    expect(digerSifa.kilitli).toBe(true);
    expect(digerSifa.kilitAciklamasi).toBeTruthy();
  });

  it("envanterEsyasiKullan: olumlu zar gelince sağlık artar ve eşya envanterden düşer", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0); // r=0 < pPozitif → tam olumlu dal
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;
    state.saglik = 50;
    const satinAlma = await magazadanSatinAl(state.id, "sifali_merhem");
    const esyaId = satinAlma.state.magaza_envanteri[0].id;

    const sonuc = await envanterEsyasiKullan(state.id, esyaId);
    expect(sonuc.state.saglik).toBeGreaterThan(50);
    expect(sonuc.state.magaza_envanteri).toHaveLength(0);
  });

  it("envanterEsyasiKullan: ters tepen zar gelince sağlık düşer, eşya yine tükenir", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99); // r=0.99 > pPozitif+0.10 → ters tepme dalı
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 500;
    state.saglik = 50;
    const satinAlma = await magazadanSatinAl(state.id, "sifali_merhem");
    const esyaId = satinAlma.state.magaza_envanteri[0].id;

    const sonuc = await envanterEsyasiKullan(state.id, esyaId);
    expect(sonuc.state.saglik).toBeLessThan(50);
    expect(sonuc.state.magaza_envanteri).toHaveLength(0);
  });

  it("envanterEsyasiKullan: lüks eşya kullanılamaz, envanterde kalır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.para = 1000;
    const satinAlma = await magazadanSatinAl(state.id, "antika_eser");
    const esyaId = satinAlma.state.magaza_envanteri[0].id;

    await expect(envanterEsyasiKullan(state.id, esyaId)).rejects.toThrow();
    expect(satinAlma.state.magaza_envanteri).toHaveLength(1);
  });

  it("MAGAZA_ESYALARI: her eşya benzersiz id taşır", () => {
    const idler = MAGAZA_ESYALARI.map((e) => e.id);
    expect(new Set(idler).size).toBe(idler.length);
  });
});
