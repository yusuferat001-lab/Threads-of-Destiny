import { describe, it, expect, vi, afterEach } from "vitest";
import { yeniOyun, mesleğiAta, stateGetir, isletmeDurumGetir, isletmeProjeBaslat, isletmeProjeBirak, isletmeProjeKarar, senaryoUret } from "../src/game/gameEngine";
import { isletmeBaglami } from "../src/game/stateManager";
import { hatBonusu, hatKilitNedeni, isletmeButcesi, isletmeYilIsle, uretimTavani } from "../src/game/isletme";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { projeBaslat, projeHatAdaylari, projeBekliyorMu, projeKararVer, projeKilitNedeni, projeKatalogu, projeBasariSansi } from "../src/game/proje";
import { atolyeProjesiGetir } from "../src/data/atolye";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function zanaat(rutbe = 3): Promise<CharacterState> {
  const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(st.id, "Zanaatkâr");
  const s = await stateGetir(st.id);
  s.rutbe_seviye = rutbe;
  s.para = 500;
  return s;
}
const yilIsle = (s: CharacterState) => isletmeYilIsle(s, isletmeBaglami(s));
const acikHat = (s: CharacterState) => isletmeProfiliGetir(s.meslek, s.cag)!.hatlar.find((h) => hatKilitNedeni(s, h) === null)!.id;

describe("Zanaatkâr atölye projeleri", () => {
  it("katalog Zanaatkâr'da atölye projeleri, Asker'de yok; kilit nedenleri", async () => {
    const s = await zanaat(1);
    expect(projeKatalogu(s).length).toBeGreaterThan(0);
    expect(projeKilitNedeni(s, atolyeProjesiGetir("verimli_yontem")!)).toBe("rutbe");
    expect(projeKilitNedeni(s, atolyeProjesiGetir("yeni_hat")!)).toBeNull();
    s.rutbe_seviye = 3;
    expect(projeKilitNedeni(s, atolyeProjesiGetir("verimli_yontem")!)).toBeNull();
    projeBaslat(s, "verimli_yontem", acikHat(s));
    expect(projeKilitNedeni(s, atolyeProjesiGetir("yeni_model")!)).toBe("proje");
    const t = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(t.id, "Asker");
    expect(projeKatalogu(await stateGetir(t.id))).toEqual([]);
    expect((await isletmeDurumGetir(t.id)).proje).toBeNull();
  });

  it("başlatma doğrular (geçersiz hat/proje, ikinci proje)", async () => {
    const s = await zanaat();
    await expect(isletmeProjeBaslat(s.id, "yok_boyle", null)).rejects.toThrow("Böyle bir proje yok");
    await expect(isletmeProjeBaslat(s.id, "verimli_yontem", "olmayan_hat")).rejects.toThrow("geçersiz ürün hattı");
    const r = await isletmeProjeBaslat(s.id, "verimli_yontem", acikHat(s));
    expect(r.durum.proje!.aktif).toMatchObject({ id: "verimli_yontem", kalan: 3, gecen: 0 });
    await expect(isletmeProjeBaslat(s.id, "yeni_model", acikHat(s))).rejects.toThrow("yürüyen projeni");
    await isletmeProjeBirak(s.id);
    expect((await isletmeDurumGetir(s.id)).proje!.aktif).toBeNull();
  });

  it("masraf dükkân giderine girer, üretim tavanı proje sürerken düşer", async () => {
    const s = await zanaat();
    const b = isletmeBaglami(s);
    const depo0 = isletmeButcesi(s, b).depo;
    const tavan0 = uretimTavani(s)!;
    projeBaslat(s, "saheser", acikHat(s));
    expect(isletmeButcesi(s, b).depo).toBeGreaterThan(depo0);
    expect(uretimTavani(s)!).toBeLessThan(tavan0);
  });

  it("süre dolunca karar beklenir ve oyun devam etmez; uzat bir kez, sonra sür", async () => {
    const s = await zanaat();
    projeBaslat(s, "yeni_model", acikHat(s));
    yilIsle(s);
    yilIsle(s);
    expect(projeBekliyorMu(s)).toBe(false);
    yilIsle(s);
    expect(projeBekliyorMu(s)).toBe(true);
    await expect(senaryoUret(s.id)).rejects.toThrow("proje kararını");
    expect(() => projeKararVer(s, "xxx")).toThrow("Geçersiz");
    expect(projeKararVer(s, "uzat").sonuc).toBe("uzatildi");
    expect(s.isletme!.proje).toMatchObject({ kalan: 1, uzatildi: true, karar_bekliyor: false });
    yilIsle(s);
    expect(projeBekliyorMu(s)).toBe(true);
    expect(() => projeKararVer(s, "uzat")).toThrow("uzatılamaz");
    const sans = projeBasariSansi(s, atolyeProjesiGetir("yeni_model")!, true);
    expect(sans).toBeGreaterThan(projeBasariSansi(s, atolyeProjesiGetir("yeni_model")!, false));
  });

  it("başarı: verim maliyeti, model fiyat ve talebi kalıcı değiştirir; kademe tavanı vardır", async () => {
    const s = await zanaat();
    const hat = acikHat(s);
    const once = hatBonusu(s, hat);
    vi.spyOn(Math, "random").mockReturnValue(0); // zar: başarı
    projeBaslat(s, "verimli_yontem", hat);
    s.isletme!.proje!.karar_bekliyor = true;
    expect(projeKararVer(s, "sur").sonuc).toBe("basari");
    projeBaslat(s, "yeni_model", hat);
    s.isletme!.proje!.karar_bekliyor = true;
    projeKararVer(s, "sur");
    const sonra = hatBonusu(s, hat)!;
    expect(once?.alisCarpani ?? 1).toBeGreaterThan(sonra.alisCarpani!);
    expect(sonra.satisCarpani).toBeGreaterThan(1);
    expect(sonra.talepCarpani).toBeGreaterThan(1);
    expect(s.isletme!.proje).toBeNull();
    s.isletme!.atolye!.verim[hat] = 3;
    expect(projeHatAdaylari(s, atolyeProjesiGetir("verimli_yontem")!)).not.toContain(hat); // kademe tavanına varan hat aday olmaz
  });

  it("başarısızlık itibar ve şöhret düşürür; vazgeçmek itibar düşürür", async () => {
    const s = await zanaat();
    projeBaslat(s, "yeni_model", acikHat(s));
    s.isletme!.proje!.karar_bekliyor = true;
    const itibar = s.isletme!.itibar ?? 50;
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(projeKararVer(s, "sur").sonuc).toBe("basarisiz");
    expect(s.isletme!.itibar).toBeLessThan(itibar);
    expect(s.isletme!.atolye?.model ?? {}).toEqual({});
    projeBaslat(s, "yeni_model", acikHat(s));
    s.isletme!.proje!.karar_bekliyor = true;
    const once = s.isletme!.itibar!;
    expect(projeKararVer(s, "vazgec").sonuc).toBe("vazgecti");
    expect(s.isletme!.itibar).toBeLessThan(once);
  });

  it("yeni ürün hattı rütbesiz hattı açar; tezgâh icadı tavanı artırır; şaheser itibarı yükseltir", async () => {
    const s = await zanaat(1);
    const kilitli = isletmeProfiliGetir(s.meslek, s.cag)!.hatlar.find((h) => hatKilitNedeni(s, h) === "rutbe")!;
    vi.spyOn(Math, "random").mockReturnValue(0);
    projeBaslat(s, "yeni_hat", kilitli.id);
    s.isletme!.proje!.karar_bekliyor = true;
    projeKararVer(s, "sur");
    expect(hatKilitNedeni(s, kilitli)).toBeNull();
    s.rutbe_seviye = 3;
    const tavan = uretimTavani(s)!;
    projeBaslat(s, "tezgah_icadi", null);
    s.isletme!.proje!.karar_bekliyor = true;
    projeKararVer(s, "sur");
    expect(uretimTavani(s)!).toBeGreaterThan(tavan);
    const itibar = s.isletme!.itibar ?? 50;
    projeBaslat(s, "saheser", acikHat(s));
    s.isletme!.proje!.karar_bekliyor = true;
    projeKararVer(s, "sur");
    expect(s.isletme!.itibar!).toBeGreaterThan(itibar);
  });

  it("görünüm: karar bekleyince 'karar' dolu; endpoint kararı işler", async () => {
    const s = await zanaat();
    await isletmeProjeBaslat(s.id, "yeni_model", acikHat(s));
    s.isletme!.proje!.karar_bekliyor = true;
    const g = await isletmeDurumGetir(s.id);
    expect(g.proje!.karar!.secenekler.map((x) => x.id)).toEqual(["sur", "uzat", "vazgec"]);
    expect(g.proje!.karar!.secenekler[0].sans).not.toBeNull();
    const r = await isletmeProjeKarar(s.id, "vazgec");
    expect(r.sonuc.sonuc).toBe("vazgecti");
    expect(r.durum.proje!.karar).toBeNull();
  });
});
