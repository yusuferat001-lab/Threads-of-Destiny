import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  giderKalemleriHesapla,
  pasifEkonomiUygula,
  konutDegistir,
  yasamSecimiDegistir,
} from "../src/game/stateManager";
import { yeniOyun, konutDegistir as konutDegistirEngine } from "../src/game/gameEngine";
import { VARSAYILAN_KONUT_ID, TASINMA_MALIYETI } from "../src/data/konutlar";
import { VARSAYILAN_YASAM_SECIMI_ID } from "../src/data/yasamSecenekleri";

describe("konut sistemi (stateManager)", () => {
  it("yeni karakter varsayılan konutta (Mütevazı Yuva) başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.konut_id).toBe(VARSAYILAN_KONUT_ID);
    expect(VARSAYILAN_KONUT_ID).toBe("mutevazi_yuva"); // 2026-09 Faz 9: sağlık/ün açısından nötr varsayılan
  });

  it("giderKalemleriHesapla konut kirasını döker", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "gorkemli_konak");
    const gider = giderKalemleriHesapla(state);
    expect(gider.konut).toBe(21); // görkemli konak kirası 21 (v11); başlangıçta enflasyon 1 → çarpansız
  });

  it("nemli barakada sağlık zamanla azalır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "nemli_baraka"); // en dibi açıkça seç
    state.yas = 40; // gençlik toparlanması (30 yaşa kadar +1/yıl) devreye girmesin
    state.saglik = 80;
    pasifEkonomiUygula(state, 5);
    expect(state.saglik).toBe(80 - 4 * 5); // Faz 9: dip kademe cezası -4/yıl
  });

  it("görkemli konakta ün zamanla artar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "gorkemli_konak");
    const oncekiUn = state.un;
    pasifEkonomiUygula(state, 5);
    expect(state.un).toBeGreaterThan(oncekiUn);
  });

  it("mütevazı yuvada sağlık/ün pasif etkisi yok", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.kisilik = ["Sakin", "Vicdanlı"]; // kişiliğin yıllık şöhret etkisi (v10) olmasın
    state.para = 1000;
    state.un = 20; // başlangıç şöhreti rastgele; 40 ve üstü şöhret erimesine (§52) girer, konut etkisini izole etmek için sabitle
    state.yasam_secimi_id = "sade_sofra"; // sağlık/mutluluk etkisi olmayan yaşam tarzı; sadece konut etkisini izole eder
    // mutevazi_yuva artık varsayılan — ekstra konutDegistir gerekmez
    const oncekiUn = state.un;
    const oncekiSaglik = state.saglik;
    pasifEkonomiUygula(state, 5);
    expect(state.un).toBe(oncekiUn);
    expect(state.saglik).toBe(oncekiSaglik);
  });

  it("aynı konuta taşınma hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(() => konutDegistir(state, VARSAYILAN_KONUT_ID)).toThrow();
  });

  it("yetersiz parada taşınma hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.para = 0;
    expect(() => konutDegistir(state, "gorkemli_konak")).toThrow();
  });

  it("geçersiz konut id'si hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.para = 1000;
    expect(() => konutDegistir(state, "olmayan_konut")).toThrow();
  });

  it("taşınma nakliye maliyetini düşer", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.para = 100;
    konutDegistir(state, "sicak_ocak"); // mutevazi_yuva'dan (varsayılan) daha pahalı kademe → nakliye ücreti biner
    expect(state.para).toBe(100 - TASINMA_MALIYETI);
    expect(state.konut_id).toBe("sicak_ocak");
  });

  describe("konut_surekli_yasadigi_yil (konut_sahibi amacı için süreklilik takibi)", () => {
    it("yeni karakterde null'dır (mutevazi_yuva nitelikli banda girmez)", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      expect(state.konut_surekli_yasadigi_yil).toBeNull();
    });

    it("nitelikli banda (Sıcak Ocak+) girince sayaç o yıldan başlar", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      state.para = 1000;
      state.yil = 1150;
      konutDegistir(state, "sicak_ocak");
      expect(state.konut_surekli_yasadigi_yil).toBe(1150);
    });

    it("nitelikli bant İÇİNDE yükselmek (Sıcak Ocak→Sağlam Konut) sayacı bozmaz", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      state.para = 1000;
      state.yil = 1150;
      konutDegistir(state, "sicak_ocak");
      state.yil = 1153;
      konutDegistir(state, "saglam_konut");
      expect(state.konut_surekli_yasadigi_yil).toBe(1150); // korunuyor, 1153 değil
    });

    it("nitelikli bandın dışına (Mütevazı Yuva'ya geri) çıkınca sayaç sıfırlanır", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      state.para = 1000;
      state.yil = 1150;
      konutDegistir(state, "sicak_ocak");
      state.yil = 1152;
      konutDegistir(state, "mutevazi_yuva");
      expect(state.konut_surekli_yasadigi_yil).toBeNull();
      // tekrar sıcak ocağa dönünce sayaç YENİDEN başlar, eski yıl korunmaz
      state.yil = 1160;
      konutDegistir(state, "sicak_ocak");
      expect(state.konut_surekli_yasadigi_yil).toBe(1160);
    });
  });
});

describe("konut sistemi (gameEngine, uçtan uca)", () => {
  it("konutDegistir bir tur harcamadan state'i günceller ve DB'ye kaydeder", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const oncekiYil = state.yil;
    state.para = 200;
    const sonuc = await konutDegistirEngine(state.id, "gorkemli_konak");
    expect(sonuc.state.konut_id).toBe("gorkemli_konak");
    expect(sonuc.state.yil).toBe(oncekiYil);
    expect(sonuc.mesaj).toContain("Konak");
  });
});

describe("yaşam tarzı seçimi sistemi", () => {
  it("yeni karakter varsayılan yaşam tarzıyla başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.yasam_secimi_id).toBe(VARSAYILAN_YASAM_SECIMI_ID);
  });

  it("bayat artık bedavadır ama sağlığı aşındırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000; // borç cezası devreye girmesin
    state.saglik = 90;
    yasamSecimiDegistir(state, "bayat_artik");
    const gider = giderKalemleriHesapla(state);
    expect(gider.yasam).toBe(0);
    pasifEkonomiUygula(state, 3);
    expect(state.saglik).toBe(90 - 4 * 3); // Faz 9: dip sofra cezası -4/yıl
  });

  it("dengeli sofra pahalıdır ama sağlık ve mutluluk katar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 50; // pasif regen yumuşak tavanının (80) altında, tam oranında işlesin
    state.mutluluk = 40;
    state.para = 1000; // borç faizi/sağlık cezası devreye girmesin (rastgele aile başlangıçta negatif para verebilir)
    state.konut_id = "mutevazi_yuva"; // konutun sağlık etkisi olmasın, sadece yaşam tarzı etkisini izole eder
    yasamSecimiDegistir(state, "dengeli_sofra");
    pasifEkonomiUygula(state, 3);
    expect(state.saglik).toBeGreaterThan(50);
    expect(state.mutluluk).toBeGreaterThan(40);
  });

  it("pasif regen yumuşak tavanı: 80 canın üstünde ev+yemek kazancı ciddi şekilde kısılır", () => {
    // Tavan altı: 55 candan başlayınca görkemli konak(+3)+şölen(+3) = +6/yıl tam işler.
    const altta = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(altta, "Tüccar");
    altta.para = 100000;
    altta.saglik = 55;
    altta.konut_id = "gorkemli_konak";
    altta.yasam_secimi_id = "solen_sofrasi";
    pasifEkonomiUygula(altta, 1);
    const alttaKazanc = altta.saglik - 55;

    // Tavan üstü: 90 candan başlayınca aynı +6, yumuşak tavan yüzünden çok daha az yansır.
    const ustte = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(ustte, "Tüccar");
    ustte.para = 100000;
    ustte.saglik = 90;
    ustte.konut_id = "gorkemli_konak";
    ustte.yasam_secimi_id = "solen_sofrasi";
    pasifEkonomiUygula(ustte, 1);
    const usttteKazanc = ustte.saglik - 90;

    expect(alttaKazanc).toBeGreaterThanOrEqual(5); // ~+6
    expect(usttteKazanc).toBeLessThanOrEqual(2); // ~+1.5 (clampStats yuvarlaması ile ≤2) — 100'de sabitlenemez
    expect(alttaKazanc).toBeGreaterThan(usttteKazanc); // tavan üstü belirgin daha az
  });

  it("aynı yaşam tarzına geçmeye çalışmak hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(() => yasamSecimiDegistir(state, VARSAYILAN_YASAM_SECIMI_ID)).toThrow();
  });

  it("geçersiz yaşam tarzı id'si hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(() => yasamSecimiDegistir(state, "olmayan_secim")).toThrow();
  });
});

describe("konfor sistemi kaldırıldı", () => {
  it("GiderKalemleri artık konfor alanı içermez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const gider = giderKalemleriHesapla(state);
    expect((gider as Record<string, unknown>).konfor).toBeUndefined();
  });
});

describe("konut/yaşam id göçü (Faz 9, eski canlı oturumlar)", () => {
  it("eski konut id'leri en yakın yeni karşılığa taşınır", async () => {
    const { eskiKayitGocu } = await import("../src/game/stateManager");
    const eski: Record<string, string> = {
      basit_barinak: "nemli_baraka",
      ahsap_ev: "nemli_baraka",
      normal_ev: "mutevazi_yuva",
      tas_ev: "sicak_ocak",
      konak: "saglam_konut",
      sato: "gorkemli_konak",
    };
    for (const [eskiId, yeniId] of Object.entries(eski)) {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      state.konut_id = eskiId;
      eskiKayitGocu(state);
      expect(state.konut_id).toBe(yeniId);
    }
  });

  it("eski yaşam tarzı id'leri en yakın yeni karşılığa taşınır", async () => {
    const { eskiKayitGocu } = await import("../src/game/stateManager");
    const eski: Record<string, string> = {
      copten_topla: "bayat_artik",
      ucuza_ye: "bayat_artik",
      normal_ye: "sade_sofra",
      iyi_ye: "keyifli_sofra",
      kaliteli_ye: "dengeli_sofra",
      ziyafet_gibi_ye: "solen_sofrasi",
    };
    for (const [eskiId, yeniId] of Object.entries(eski)) {
      const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
      state.yasam_secimi_id = eskiId;
      eskiKayitGocu(state);
      expect(state.yasam_secimi_id).toBe(yeniId);
    }
  });
});
