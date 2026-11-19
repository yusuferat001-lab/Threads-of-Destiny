import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, stateGetir, isletmeDurumGetir } from "../src/game/gameEngine";
import { hatHesapla } from "../src/game/isletme";
import { isletmeBaglami } from "../src/game/stateManager";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { itibarBonusu, itibarEkle, itibarUstLimit, itibarYillikDegisim, itibarYilSonu } from "../src/game/itibar";
import type { CharacterState } from "../src/types";

async function oyun(meslek: "Tüccar" | "Zanaatkâr"): Promise<CharacterState> {
  const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(st.id, meslek);
  return stateGetir(st.id);
}

describe("Güven / Ustalık ekseni", () => {
  it("tarafsız 50'de etkisiz; üst sınır yatırımsız 60, Hesap/Usta Odası ile artar", async () => {
    for (const m of ["Tüccar", "Zanaatkâr"] as const) {
      const s = await oyun(m);
      expect(itibarBonusu(s)).toBeNull();
      expect(itibarUstLimit(s)).toBe(60);
      itibarEkle(s, 40);
      expect(s.isletme!.itibar).toBe(60); // üst sınırı aşmaz
      s.isletme!.yatirimlar[m === "Tüccar" ? "hesap_odasi" : "usta_odasi"] = 2;
      expect(itibarUstLimit(s)).toBe(80);
      itibarEkle(s, 40);
      expect(s.isletme!.itibar).toBe(80);
      itibarEkle(s, -100);
      expect(s.isletme!.itibar).toBe(0);
    }
  });

  it("yıllık: iyi hizmet yükseltir, kötü hizmet düşürür, tarafsıza çekilir", async () => {
    const s = await oyun("Tüccar");
    expect(itibarYillikDegisim(s, 0)).toBeGreaterThan(0);
    expect(itibarYillikDegisim(s, 0.3)).toBeLessThan(0);
    s.isletme!.itibar = 58;
    const iyi = itibarYillikDegisim(s, 0);
    s.isletme!.itibar = 40;
    expect(itibarYillikDegisim(s, 0.1)).toBeGreaterThan(0); // alttan tarafsıza çekim
    s.isletme!.itibar = 58;
    itibarYilSonu(s, 0);
    expect(s.isletme!.itibar).toBeCloseTo(58 + iyi, 5);
  });

  it("Tüccar'da güven talebi, Zanaatkâr'da ustalık satış fiyatını etkiler", async () => {
    for (const m of ["Tüccar", "Zanaatkâr"] as const) {
      const s = await oyun(m);
      const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
      const tanim = profil.hatlar[0];
      const hat = s.isletme!.hatlar.find((h) => h.id === tanim.id)!;
      const b = isletmeBaglami(s);
      const once = hatHesapla(s, hat, tanim, b);
      s.isletme!.itibar = 60;
      const sonra = hatHesapla(s, hat, tanim, b);
      if (m === "Tüccar") expect(sonra.talep).toBeGreaterThan(once.talep);
      else expect(sonra.birimFiyat).toBeGreaterThan(once.birimFiyat);
      s.isletme!.itibar = 30;
      const dusuk = hatHesapla(s, hat, tanim, b);
      if (m === "Tüccar") expect(dusuk.talep).toBeLessThan(once.talep);
      else expect(dusuk.birimFiyat).toBeLessThan(once.birimFiyat);
    }
  });

  it("görünümde yalnız Tüccar/Zanaatkâr için gelir", async () => {
    const t = await oyun("Tüccar");
    const g = await isletmeDurumGetir(t.id);
    expect(g.itibar).toMatchObject({ ad: { tr: "Güven" }, deger: 50, limit: 60 });
    const a = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(a.id, "Asker");
    expect((await isletmeDurumGetir(a.id)).itibar).toBeNull();
  });
});
