import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, yilGec, stateGetir } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";

async function ilerleOyunu(meslek = "Tüccar") {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba", undefined, "tr", undefined, "ilerle");
  await mesleğiAta(state.id, meslek);
  return state; // yeniOyun bellek oturumundaki AYNI nesneyi döner
}

/** İlk olayı çözüp "olay yok" durumuna getirir (sayaç 0). */
async function ilkOlayiCoz(id: string) {
  const senaryo = await senaryoUret(id);
  const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
  return secimUygulaVeCoz(id, idx >= 0 ? idx : 0);
}

/** İlk olay seçimi rastgele öldürebilir; hayatta kalan bir "olay yok" oyunu döner. */
async function olaysizOyun(meslek = "Tüccar") {
  for (let i = 0; i < 20; i++) {
    const state = await ilerleOyunu(meslek);
    await ilkOlayiCoz(state.id);
    if (state.aktif) return state;
  }
  throw new Error("Hayatta kalan oyun üretilemedi.");
}

describe("ilerle zaman modeli (İLERLE + 2 yılda bir olay)", () => {
  it("meslek seçilince ilk olay hemen bekler; İLERLE reddedilir", async () => {
    const state = await ilerleOyunu();
    expect((await stateGetir(state.id)).olay_bekliyor).toBe(true);
    await expect(yilGec(state.id)).rejects.toThrow("bekleyen olay");
  });

  it("olaya cevap vermek yıl geçirmez, sayaç sıfırlanır, olay bitince ana ekran açılır", async () => {
    const state = await ilerleOyunu();
    const yas = state.yas;
    const yil = state.yil;
    const sonuc = await ilkOlayiCoz(state.id);
    expect(sonuc.yasArtisi).toBe(0);
    expect(state.yas).toBe(yas);
    expect(state.yil).toBe(yil);
    expect(state.yil_sayaci).toBe(0);
    expect((await stateGetir(state.id)).olay_bekliyor).toBe(false);
  });

  it("senaryo, olay çıkmadıysa üretilmez", async () => {
    const state = await ilerleOyunu();
    await ilkOlayiCoz(state.id);
    await expect(senaryoUret(state.id)).rejects.toThrow("olay yok");
  });

  it("İLERLE tam 1 yıl geçirir; 2 İLERLE'den sonra olay çıkar", async () => {
    const state = await olaysizOyun();
    const yil = state.yil;
    const yas = state.yas;

    const bir = await yilGec(state.id);
    expect(bir.yasArtisi).toBe(1);
    expect(state.yil).toBe(yil + 1);
    expect(state.yas).toBe(yas + 1);
    expect(state.yil_sayaci).toBe(1);
    expect(bir.olayBekliyor).toBe(false);

    const iki = await yilGec(state.id);
    expect(state.yil).toBe(yil + 2);
    expect(state.yil_sayaci).toBe(2);
    expect(iki.olayBekliyor).toBe(true);

    await expect(yilGec(state.id)).rejects.toThrow("bekleyen olay");
    const senaryo = await senaryoUret(state.id); // artık üretilebilir
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
    expect(state.yil_sayaci).toBe(0);
  });

  it("İLERLE olayı gecmis_olaylar'a yazmaz", async () => {
    const state = await olaysizOyun();
    const once = state.gecmis_olaylar.length;
    await yilGec(state.id);
    expect(state.gecmis_olaylar.length).toBe(once);
    expect(state.gecmis_olaylar).not.toContain("__yil_gec__");
  });

  it("zaman modeli olmayan (klasik) oyunda İLERLE reddedilir; olay cevabı yıl geçirir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    await expect(yilGec(state.id)).rejects.toThrow("yıl geçirme modunda değil");
    const yas = state.yas;
    const senaryo = await senaryoUret(state.id);
    const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
    const sonuc = await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
    // (Seçim öldürürse yıl bloğu çalışmaz; hayattaysa klasik akış yıl geçirir.)
    if (sonuc.state.aktif) {
      expect(sonuc.yasArtisi).toBeGreaterThan(0);
      expect(state.yas).toBeGreaterThan(yas);
    }
  });

  it("yolculukta her adım hemen çıkar (İLERLE kapalı)", async () => {
    const state = await olaysizOyun();
    state.etiketler.push("yolculukta");
    expect((await stateGetir(state.id)).olay_bekliyor).toBe(true);
    await expect(yilGec(state.id)).rejects.toThrow("bekleyen olay");
  });

  it("hapiste İLERLE cezayı bir yıl eritir", async () => {
    const state = await olaysizOyun();
    state.etiketler.push("hapiste");
    state.hapis_ceza_kalan = 3;
    state.hapis_ceza_toplam = 3;
    await yilGec(state.id);
    expect(state.hapis_ceza_kalan).toBe(2);
  });

  it("100 yaş tavanı: son İLERLE ölümle biter ve sonrasında İLERLE reddedilir", async () => {
    const state = await olaysizOyun();
    state.yas = 99;
    const sonuc = await yilGec(state.id);
    expect(sonuc.state.aktif).toBe(false);
    await expect(yilGec(state.id)).rejects.toThrow("Oyun zaten bitmiş");
  });
});
