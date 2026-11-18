import { describe, it, expect, vi, afterEach } from "vitest";
import { yeniOyun, mesleğiAta, stateGetir, isletmeKararVer } from "../src/game/gameEngine";
import { isletmeBaglami } from "../src/game/stateManager";
import { cemaatHesapla, cemaatEtkenleri, cemaatYilIsle, ayinKilitNedeni, ogretiBekleyenSeviye, ogretiSec } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function din(rutbe = 3): Promise<CharacterState> {
  const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(st.id, "Din Adamı");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.ulke.savasta = false;
  s.veba = undefined as never;
  s.rutbe_seviye = rutbe;
  s.para = 300;
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(s);
    if (sev === null) break;
    ogretiSec(s, ogretiSecenekleri(sev).find((o) => !o.fanatik)!.id);
  }
  return s;
}

describe("Büyük Ayin", () => {
  it("rütbe ve bekleme kilidi", async () => {
    const s = await din(1);
    expect(ayinKilitNedeni(s, "yok")).toBeNull();
    expect(ayinKilitNedeni(s, "olcul")).toBe("rutbe");
    s.rutbe_seviye = 3;
    expect(ayinKilitNedeni(s, "buyuk")).toBeNull();
    s.isletme!.cemaat!.ayin_son_yil = s.yil - 1;
    expect(ayinKilitNedeni(s, "buyuk")).toBe("bekleme");
    s.isletme!.cemaat!.ayin_son_yil = s.yil - 10;
    expect(ayinKilitNedeni(s, "buyuk")).toBeNull();
  });

  it("karar uç noktası doğrular, kilitliyse reddeder", async () => {
    const s = await din(1);
    await expect(isletmeKararVer(s.id, [], { ayin: "buyuk" })).rejects.toThrow("rütben");
    await expect(isletmeKararVer(s.id, [], { ayin: "xxx" })).rejects.toThrow("Geçersiz");
    const s2 = await stateGetir(s.id);
    s2.rutbe_seviye = 3;
    const r = await isletmeKararVer(s.id, [], { ayin: "buyuk" });
    expect(r.durum.cemaat!.politikalar.ayin.secili).toBe("buyuk");
  });

  it("büyük ayin bağış/gelen/masrafı artırır, inanan ve fanatikliği yükseltir (vebasız)", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const cm = s.isletme!.cemaat!;
    const taban = cemaatHesapla(s, b, 0.8);
    const etkenTaban = cemaatEtkenleri(s);
    cm.ayin = "buyuk";
    const ayin = cemaatHesapla(s, b, 0.8);
    const etkenAyin = cemaatEtkenleri(s);
    expect(ayin.bagis).toBeGreaterThan(taban.bagis);
    expect(ayin.ayinMasrafi / ayin.bagis).toBeGreaterThan(taban.ayinMasrafi / taban.bagis);
    expect(etkenAyin.toplam).toBeGreaterThan(etkenTaban.toplam);
    expect(etkenAyin.fanatiklikDegisim).toBeGreaterThan(etkenTaban.fanatiklikDegisim);
  });

  it("vebada büyük ayin inanan kaybettirir", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    s.veba = { aktif: true } as never;
    const etkenTaban = cemaatEtkenleri(s);
    cm.ayin = "buyuk";
    expect(cemaatEtkenleri(s).toplam).toBeLessThan(etkenTaban.toplam);
  });

  it("yıl işlenince ayin 'yok'a döner ve bekleme başlar", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    cm.ayin = "olcul";
    cemaatYilIsle(s, isletmeBaglami(s));
    expect(cm.ayin).toBe("yok");
    expect(cm.ayin_son_yil).toBe(s.yil);
    expect(ayinKilitNedeni(s, "olcul")).toBe("bekleme");
  });
});
