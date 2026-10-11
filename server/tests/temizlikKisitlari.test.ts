import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir, zarAt, ucKagitciOyna, krediAlEndpoint, mulkSatinAl, konutDegistir } from "../src/game/gameEngine";
import { anahtarEslesiyor } from "../src/utils/anahtar";

describe("meslek seçilmeden oyun akışı", () => {
  it("/scenario ve /choice meslek yokken reddedilir; ölü karakterde meslek atanamaz", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await expect(senaryoUret(st.id)).rejects.toThrow(/meslek/i);
    await expect(secimUygula(st.id, 0)).rejects.toThrow(/meslek/i);
    const olu = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    (await stateGetir(olu.id)).aktif = false;
    await expect(mesleğiAta(olu.id, "Asker")).rejects.toThrow(/bitmiş/);
  });
});

describe("hapis / yolculuk kısıtları", () => {
  for (const etiket of ["hapiste", "yolculukta"]) {
    it(`${etiket} iken kumar, kredi, mülk ve taşınma engellenir`, async () => {
      const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      await mesleğiAta(st.id, "Tüccar");
      const s = await stateGetir(st.id);
      s.para = 1000;
      s.etiketler.push(etiket);
      await expect(zarAt(st.id, 10)).rejects.toThrow();
      await expect(ucKagitciOyna(st.id, 10, 0)).rejects.toThrow();
      await expect(krediAlEndpoint(st.id, 50)).rejects.toThrow();
      await expect(mulkSatinAl(st.id, "ciftlik")).rejects.toThrow();
      await expect(konutDegistir(st.id, "sicak_ocak")).rejects.toThrow();
      expect(s.para).toBe(1000);
    });
  }
});

describe("anahtarEslesiyor", () => {
  it("doğru anahtarı kabul eder, eksik/yanlış/boş env'i reddeder", () => {
    expect(anahtarEslesiyor("gizli", "gizli")).toBe(true);
    expect(anahtarEslesiyor("gizli", "gizlx")).toBe(false);
    expect(anahtarEslesiyor("gizli", "gizli2")).toBe(false);
    expect(anahtarEslesiyor("gizli", undefined)).toBe(false);
    expect(anahtarEslesiyor(undefined, "x")).toBe(false);
    expect(anahtarEslesiyor("", "")).toBe(false);
  });
});
