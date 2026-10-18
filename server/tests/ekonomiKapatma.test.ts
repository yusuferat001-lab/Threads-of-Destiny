import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  magazadanSatinAl,
  hediyeEt,
  yonetimEtkilesimYap,
} from "../src/game/gameEngine";
import { netServetHesapla, hesaplaSkorKirilimi } from "../src/game/stateManager";

async function oyun() {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  const s = await stateGetir(state.id);
  s.para = 5000;
  return s;
}

describe("ekonomi sömürülerini kapatma", () => {
  it("lüks eşya hediye edilemez (al → hediye et → tekrar al döngüsü kapalı)", async () => {
    const s = await oyun();
    await magazadanSatinAl(s.id, "ipek_hali");
    const esya = s.magaza_envanteri.find((e) => e.katalogId === "ipek_hali");
    expect(esya).toBeDefined();
    await expect(hediyeEt(s.id, esya!.id, "dost")).rejects.toThrow(/koleksiyon/);
    expect(s.magaza_envanteri.some((e) => e.katalogId === "ipek_hali")).toBe(true);
  });

  it("yönetim etkileşim id'sine ek son ek eklenerek bekleme süresi atlatılamaz", async () => {
    const s = await oyun();
    await expect(yonetimEtkilesimYap(s.id, "patron:hizmet:1")).rejects.toThrow();
    await expect(yonetimEtkilesimYap(s.id, "patron:hizmet:2")).rejects.toThrow();
    expect(Object.keys(s.yonetim_etkilesim_kilit)).toHaveLength(0);
    await expect(yonetimEtkilesimYap(s.id, "patron:hizmet")).resolves.toBeDefined();
    await expect(yonetimEtkilesimYap(s.id, "patron:hizmet")).rejects.toThrow();
  });

  it("tefeci borcu net servetten ve skordan düşülür", async () => {
    const s = await oyun();
    s.para = 400;
    s.kredi = null;
    const onceNet = netServetHesapla(s);
    const onceSkor = hesaplaSkorKirilimi(s).skor;
    s.para += 300; // kredi nakde girdi
    s.kredi = {
      anapara: 300,
      kalanBorc: 330,
      faizOrani: 0.12,
      yillikTaksit: 60,
      alindigiYil: s.yil,
      odenmeyenTaksit: 0,
      pazarlikYapildi: false,
    };
    expect(netServetHesapla(s)).toBe(onceNet - 30);
    expect(hesaplaSkorKirilimi(s).skor).toBeLessThanOrEqual(onceSkor);
  });
});
