import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, liderlikTablosunaKaydet, gecmisSkorlariKaydet } from "../src/game/gameEngine";
import { skorKaydet } from "../src/db/scoreRepository";
import { secimUygulaVeCoz } from "./testUtils";
import { vergisizSenaryo } from "./_ogreti";

async function oyunuOlumeKadarOyna(meslek: string) {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);

  let aktif = true;
  let sonState = state;
  for (let tur = 0; tur < 150 && aktif; tur++) {
    const senaryo = await vergisizSenaryo(state);
    const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
    const sonuc = await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
    aktif = sonuc.state.aktif;
    sonState = sonuc.state;
  }
  return sonState;
}

describe("kritik oyun akışı: yeni oyun → meslek → seçim → ölüm → skor", () => {
  it("yeni oyun oluşturur ve geçerli bir başlangıç state'i döner", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    expect(state.id).toBeTruthy();
    expect(state.aktif).toBe(true);
    expect(state.yas).toBe(15);
    expect(state.meslek).toBe("");
  });

  it("geçersiz bölge/çağ kombinasyonunda hata fırlatır", async () => {
    await expect(yeniOyun("Orta Çağ", "Osmanlı", "kasaba")).rejects.toThrow();
  });

  it("meslek ataması sonrası senaryo üretilebilir ve seçim uygulanabilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const atanmis = await mesleğiAta(state.id, "Tüccar");
    expect(atanmis.meslek).toBe("Tüccar");
    expect(atanmis.rutbe).toBeTruthy();

    const senaryo = await vergisizSenaryo(state);
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
    for (const secenek of senaryo.secenekler) {
      if (!secenek.kilitli) {
        expect(secenek.belirsiz_aralik.min).toBeLessThanOrEqual(secenek.belirsiz_aralik.max);
        expect(secenek.belirsiz_aralik.min).toBeGreaterThanOrEqual(0);
        expect(secenek.belirsiz_aralik.max).toBeLessThanOrEqual(100);
      }
    }

    const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
    const sonuc = await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
    expect(sonuc.state.tur_sayisi).toBeGreaterThanOrEqual(0);
    expect(sonuc.state.gecmis_olaylar.length).toBe(1);
  });

  it("meslek seçilmeden ikinci kez atanamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(mesleğiAta(state.id, "Asker")).rejects.toThrow();
  });

  it("senaryo üretilmeden seçim uygulanamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(secimUygula(state.id, 0)).rejects.toThrow("Önce bir senaryo üretilmeli");
  });

  it("bir karakter ölene kadar oynanabilir ve skoru kaydedilebilir", async () => {
    const sonState = await oyunuOlumeKadarOyna("Asker");

    expect(sonState.aktif).toBe(false);
    expect(sonState.olum_nedeni).toBeTruthy();

    const kayit = await skorKaydet(sonState, "Test Karakteri");
    expect(kayit.id).toBeTruthy();
    expect(kayit.skor).toBeGreaterThanOrEqual(0);
  });

  it("aktif bir oyun için liderlikTablosunaKaydet reddedilir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(liderlikTablosunaKaydet(state.id, "Erken Kayıt")).rejects.toThrow("Oyun henüz bitmedi");
  });

  it("aynı oyun için liderlikTablosunaKaydet iki kez çağrılırsa ikincisi reddedilir (skor spam engeli)", async () => {
    const sonState = await oyunuOlumeKadarOyna("Tüccar");
    expect(sonState.aktif).toBe(false);

    const ilkKayit = await liderlikTablosunaKaydet(sonState.id, "İlk İsim");
    expect(ilkKayit.id).toBeTruthy();

    await expect(liderlikTablosunaKaydet(sonState.id, "İkinci Sahte İsim")).rejects.toThrow(
      "skor zaten kaydedildi"
    );
  });

  it("gecmisSkorlariKaydet: skoru kaydedilmemiş bitmiş oyunları liderliğe geçirir, ikinci çağrıda tekrar etmez", async () => {
    const sonState = await oyunuOlumeKadarOyna("Asker");
    expect(sonState.aktif).toBe(false);
    expect(sonState.skoru_kaydedildi).toBe(false);

    const ilk = await gecmisSkorlariKaydet();
    expect(ilk).toBeGreaterThanOrEqual(1);

    // İkinci çağrı: artık skoru_kaydedildi=true olduğu için hiçbirini tekrar eklemez.
    const ikinci = await gecmisSkorlariKaydet();
    expect(ikinci).toBe(0);

    // Aynı oyunu elle kaydetmek de artık reddedilir (spam engeli tutuyor).
    await expect(liderlikTablosunaKaydet(sonState.id, "Elle")).rejects.toThrow("skor zaten kaydedildi");
  });

  it("kilitli bir seçenek uygulanmaya çalışıldığında hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const senaryo = await vergisizSenaryo(state);
    const kilitliIdx = senaryo.secenekler.findIndex((s) => s.kilitli);
    if (kilitliIdx >= 0) {
      await expect(secimUygula(state.id, kilitliIdx)).rejects.toThrow();
    }
  });
});
