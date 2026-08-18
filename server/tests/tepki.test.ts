import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import type { CharacterState, SecimSonucu, TepkiSonucu } from "../src/types";

interface TepkiBulgusu {
  state: CharacterState;
  tepki: TepkiSonucu;
  oncekiYil: number;
  oncekiYas: number;
}

/**
 * Rastgele oynayarak ilk onTepki'li ara-ekranı arar; karakter ölürse yeni bir
 * karakterle devam eder (ölüm rastgele erken gelebilir, tek karakterle sınırlı
 * kalmak testi gereksiz kırılgan yapardı). Toplam deneme bütçesi tükenirse null döner.
 */
async function tepkiAra(toplamButce: number): Promise<TepkiBulgusu | null> {
  let kalan = toplamButce;
  while (kalan > 0) {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    state.yas = 20;
    state.para = 500;
    state.saglik = 100;
    await mesleğiAta(state.id, "Tüccar");

    while (kalan > 0 && state.aktif) {
      kalan--;
      if (state.saglik < 60) state.saglik = 90;
      if (state.para < 100) state.para = 500;
      const senaryo = await senaryoUret(state.id);
      const acikSecenekler = senaryo.secenekler.map((s, i) => ({ s, i })).filter(({ s }) => !s.kilitli);
      const idx = acikSecenekler.length > 0 ? acikSecenekler[Math.floor(Math.random() * acikSecenekler.length)].i : 0;
      const oncekiYil = state.yil;
      const oncekiYas = state.yas;
      const cevap = await secimUygula(state.id, idx);
      if ("ara_tepki" in cevap) {
        return { state, tepki: cevap, oncekiYil, oncekiYas };
      }
    }
  }
  return null;
}

describe("geri adım mekanizması (onTepki)", () => {
  it("onTepki'li seçenek seçilince zaman ilerlemez, ara-ekran döner", async () => {
    const bulunan = await tepkiAra(4000);
    expect(bulunan).not.toBeNull();
    if (!bulunan) return;
    expect(bulunan.tepki.olay_metni.length).toBeGreaterThan(0);
    expect(bulunan.tepki.secenekler).toHaveLength(2);
    expect(bulunan.state.yil).toBe(bulunan.oncekiYil);
    expect(bulunan.state.yas).toBe(bulunan.oncekiYas);
  }, 60000);

  it("tepki sonrası geri çekil/ısrar et seçimi zamanı ilerletir ve normal SecimSonucu döner", async () => {
    const bulunan = await tepkiAra(4000);
    expect(bulunan).not.toBeNull();
    if (!bulunan) return;
    const sonuc: SecimSonucu | TepkiSonucu = await secimUygula(bulunan.state.id, Math.random() < 0.5 ? 0 : 1);
    expect("ara_tepki" in sonuc).toBe(false);
    if (!("ara_tepki" in sonuc)) {
      expect(typeof sonuc.sonucAnlatimi).toBe("string");
      expect(typeof sonuc.yasArtisi).toBe("number");
    }
  }, 60000);

  it("bekleyen tepki varken geçersiz index (0/1 dışı) hata fırlatır", async () => {
    const bulunan = await tepkiAra(4000);
    expect(bulunan).not.toBeNull();
    if (!bulunan) return;
    await expect(secimUygula(bulunan.state.id, 5)).rejects.toThrow();
  }, 60000);
});
