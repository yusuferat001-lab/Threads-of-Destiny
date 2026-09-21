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
  it("yeni karakter varsayılan konutta (Normal Ev) başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.konut_id).toBe(VARSAYILAN_KONUT_ID);
    expect(VARSAYILAN_KONUT_ID).toBe("normal_ev"); // 2026-09: sağlık/ün açısından nötr varsayılan
  });

  it("giderKalemleriHesapla konut kirasını döker", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "konak");
    const gider = giderKalemleriHesapla(state);
    expect(gider.konut).toBe(19); // konak kirası 19; başlangıçta enflasyon 1 → çarpansız
  });

  it("basit barınakta sağlık zamanla azalır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "basit_barinak"); // en dibi açıkça seç
    state.saglik = 80;
    pasifEkonomiUygula(state, 5);
    expect(state.saglik).toBe(80 - 2 * 5); // 2026-09: dip kademe cezası -2/yıl
  });

  it("konakta ün zamanla artar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    konutDegistir(state, "konak");
    const oncekiUn = state.un;
    pasifEkonomiUygula(state, 5);
    expect(state.un).toBeGreaterThan(oncekiUn);
  });

  it("normal evde sağlık/ün pasif etkisi yok", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000;
    state.yasam_secimi_id = "normal_ye"; // sağlık/mutluluk etkisi olmayan yaşam tarzı; sadece konut etkisini izole eder
    // normal_ev artık varsayılan — ekstra konutDegistir gerekmez
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
    expect(() => konutDegistir(state, "konak")).toThrow();
  });

  it("geçersiz konut id'si hata fırlatır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.para = 1000;
    expect(() => konutDegistir(state, "olmayan_konut")).toThrow();
  });

  it("taşınma nakliye maliyetini düşer", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.para = 100;
    konutDegistir(state, "tas_ev"); // normal_ev'den (varsayılan) daha pahalı kademe → nakliye ücreti biner
    expect(state.para).toBe(100 - TASINMA_MALIYETI);
    expect(state.konut_id).toBe("tas_ev");
  });
});

describe("konut sistemi (gameEngine, uçtan uca)", () => {
  it("konutDegistir bir tur harcamadan state'i günceller ve DB'ye kaydeder", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const oncekiYil = state.yil;
    state.para = 200;
    const sonuc = await konutDegistirEngine(state.id, "konak");
    expect(sonuc.state.konut_id).toBe("konak");
    expect(sonuc.state.yil).toBe(oncekiYil);
    expect(sonuc.mesaj).toContain("Konak");
  });
});

describe("yaşam tarzı seçimi sistemi", () => {
  it("yeni karakter varsayılan yaşam tarzıyla başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.yasam_secimi_id).toBe(VARSAYILAN_YASAM_SECIMI_ID);
  });

  it("çöpten toplamak bedavadır ama sağlığı aşındırır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.para = 1000; // borç cezası devreye girmesin
    state.saglik = 90;
    yasamSecimiDegistir(state, "copten_topla");
    const gider = giderKalemleriHesapla(state);
    expect(gider.yasam).toBe(0);
    pasifEkonomiUygula(state, 3);
    expect(state.saglik).toBe(90 - 2 * 3); // 2026-09: dip sofra cezası -2/yıl
  });

  it("kaliteli yemek pahalıdır ama sağlık ve mutluluk katar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 50; // pasif regen yumuşak tavanının (70) altında, tam oranında işlesin
    state.mutluluk = 40;
    state.para = 1000; // borç faizi/sağlık cezası devreye girmesin (rastgele aile başlangıçta negatif para verebilir)
    state.konut_id = "normal_ev"; // konutun sağlık etkisi olmasın, sadece yaşam tarzı etkisini izole eder
    yasamSecimiDegistir(state, "kaliteli_ye");
    pasifEkonomiUygula(state, 3);
    expect(state.saglik).toBeGreaterThan(50);
    expect(state.mutluluk).toBeGreaterThan(40);
  });

  it("pasif regen yumuşak tavanı: 80 canın üstünde ev+yemek kazancı ciddi şekilde kısılır", () => {
    // Tavan altı: 55 candan başlayınca şato(+3)+ziyafet(+3) = +6/yıl tam işler.
    const altta = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(altta, "Tüccar");
    altta.para = 100000;
    altta.saglik = 55;
    altta.konut_id = "sato";
    altta.yasam_secimi_id = "ziyafet_gibi_ye";
    pasifEkonomiUygula(altta, 1);
    const alttaKazanc = altta.saglik - 55;

    // Tavan üstü: 90 candan başlayınca aynı +6, yumuşak tavan yüzünden çok daha az yansır.
    const ustte = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(ustte, "Tüccar");
    ustte.para = 100000;
    ustte.saglik = 90;
    ustte.konut_id = "sato";
    ustte.yasam_secimi_id = "ziyafet_gibi_ye";
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
