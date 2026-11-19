import { describe, it, expect, vi, afterEach } from "vitest";
import { yeniOyun, mesleğiAta, stateGetir, isletmeDurumGetir, isletmeProjeBaslat, isletmeProjeKarar, senaryoUret } from "../src/game/gameEngine";
import { isletmeBaglami } from "../src/game/stateManager";
import { hatBonusu, hatHesapla, hatKilitNedeni, isletmeButcesi, isletmeYilIsle } from "../src/game/isletme";
import { isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { projeBaslat, projeBekliyorMu, projeKararVer, projeKarariGorunumu, projeKatalogu } from "../src/game/proje";
import { seferBonusu, seferSansi } from "../src/game/ticaret";
import { seferGetir } from "../src/data/ticaret";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function tuccar(rutbe = 3, cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ"): Promise<CharacterState> {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Tüccar");
  const s = await stateGetir(st.id);
  s.rutbe_seviye = rutbe;
  s.para = 500;
  return s;
}
const yilIsle = (s: CharacterState) => isletmeYilIsle(s, isletmeBaglami(s));
const acikHat = (s: CharacterState) => isletmeProfiliGetir(s.meslek, s.cag)!.hatlar.find((h) => hatKilitNedeni(s, h) === null)!.id;
/** Seferi süresi dolmuş, yol olayı seçilmiş duruma getirir. */
const bitir = (s: CharacterState) => {
  s.isletme!.proje!.karar_bekliyor = true;
  s.isletme!.proje!.olay = seferGetir(s.isletme!.proje!.id)!.olaylar[0];
};

describe("Tüccar ticaret seferi", () => {
  it("katalog çağa göre; Zanaatkâr/Asker'de sefer yok", async () => {
    const oc = await tuccar(3, "Orta Çağ");
    expect(projeKatalogu(oc).map((p) => p.id)).toContain("kara_kervani");
    expect(projeKatalogu(oc).map((p) => p.id)).not.toContain("demiryolu");
    const sd = await tuccar(3, "Sanayi Devrimi");
    expect(projeKatalogu(sd).map((p) => p.id)).toContain("demiryolu");
    const g = await isletmeDurumGetir(oc.id);
    expect(g.proje!.aile).toBe("sefer");
    expect(g.proje!.eskortlar.map((e) => e.id)).toEqual(["yok", "kiralik", "guclu"]);
  });

  it("başlatma doğrular: rütbe, hat, eskort; masraf eskortla artar ve dükkân giderine girer", async () => {
    const s = await tuccar(1);
    await expect(isletmeProjeBaslat(s.id, "deniz_seferi", acikHat(s), "yok")).rejects.toThrow("rütben");
    await expect(isletmeProjeBaslat(s.id, "nehir_kiyi", "olmayan", "yok")).rejects.toThrow("geçersiz ürün hattı");
    await expect(isletmeProjeBaslat(s.id, "nehir_kiyi", acikHat(s), "xxx")).rejects.toThrow("eskort");
    const b = isletmeBaglami(s);
    const depo0 = isletmeButcesi(s, b).depo;
    projeBaslat(s, "nehir_kiyi", acikHat(s), "yok");
    const depoYok = isletmeButcesi(s, b).depo;
    expect(depoYok).toBeGreaterThan(depo0);
    s.isletme!.proje!.secim = "guclu";
    expect(isletmeButcesi(s, b).depo).toBeGreaterThan(depoYok);
  });

  it("süre dolunca yol olayı çıkar, karar beklenir; oyun devam etmez", async () => {
    const s = await tuccar(3);
    projeBaslat(s, "kara_kervani", acikHat(s), "kiralik"); // süre 1 yıl
    yilIsle(s);
    expect(projeBekliyorMu(s)).toBe(true);
    expect(s.isletme!.proje!.olay).toBeTruthy();
    const k = projeKarariGorunumu(s)!;
    expect(k.secenekler.map((x) => x.id)).toEqual(["ode", "pazarlik", "karsi", "geri"]);
    expect(k.secenekler.find((x) => x.id === "geri")!.sans).toBeNull();
    await expect(senaryoUret(s.id)).rejects.toThrow("proje kararını");
  });

  it("öde: fidye ödenir, kâr payı kısılır; pazarlık başarısında tam etki, başarısızlıkta kayıp", async () => {
    const s = await tuccar(3);
    const hat = acikHat(s);
    vi.spyOn(Math, "random").mockReturnValue(0);
    projeBaslat(s, "kara_kervani", hat, "yok");
    bitir(s);
    const para = s.para;
    const r = projeKararVer(s, "ode", 1);
    expect(r).toMatchObject({ aile: "sefer", sonuc: "basari" });
    expect(s.para).toBeLessThan(para);
    const ode = s.isletme!.sefer_etkileri![0];
    expect(ode.satis).toBeCloseTo(seferGetir("kara_kervani")!.satisPrimi * 0.7, 5);

    projeBaslat(s, "kara_kervani", hat, "yok");
    bitir(s);
    projeKararVer(s, "pazarlik", 1);
    expect(s.isletme!.sefer_etkileri![1].satis).toBeCloseTo(seferGetir("kara_kervani")!.satisPrimi, 5);
    const bonus = seferBonusu(s, hat)!;
    expect(bonus.satisCarpani).toBeGreaterThan(1);
    expect(bonus.alisCarpani).toBeLessThan(1);

    vi.spyOn(Math, "random").mockReturnValue(0.999);
    projeBaslat(s, "nehir_kiyi", hat, "yok");
    bitir(s);
    const para2 = s.para;
    const itibar = s.isletme!.itibar!;
    expect(projeKararVer(s, "pazarlik", 1).sonuc).toBe("basarisiz");
    expect(s.para).toBeLessThan(para2);
    expect(s.isletme!.itibar!).toBeLessThan(itibar);
  });

  it("karşı koy: eskort şansı artırır; başarısızlıkta sağlık düşer ama en az 1 kalır; geri dön itibar düşürür", async () => {
    const s = await tuccar(3);
    const hat = acikHat(s);
    const t = seferGetir("kara_kervani")!;
    projeBaslat(s, "kara_kervani", hat, "yok");
    const yok = seferSansi(s, t, s.isletme!.proje!, "karsi")!;
    s.isletme!.proje!.secim = "guclu";
    expect(seferSansi(s, t, s.isletme!.proje!, "karsi")!).toBeGreaterThan(yok);
    bitir(s);
    s.saglik = 2;
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(projeKararVer(s, "karsi", 1).sonuc).toBe("basarisiz");
    expect(s.saglik).toBe(1);
    projeBaslat(s, "nehir_kiyi", hat, "yok");
    bitir(s);
    const itibar = s.isletme!.itibar!;
    expect(projeKararVer(s, "geri", 1).sonuc).toBe("vazgecti");
    expect(s.isletme!.itibar!).toBeLessThan(itibar);
    expect(() => projeKararVer(s, "ode", 1)).toThrow("bekleyen");
  });

  it("sefer etkisi satış fiyatını/alışı değiştirir ve süresi dolunca kalkar; endpoint kararı işler", async () => {
    const s = await tuccar(3);
    const hat = acikHat(s);
    const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
    const tanim = profil.hatlar.find((h) => h.id === hat)!;
    const hh = s.isletme!.hatlar.find((h) => h.id === hat)!;
    const b = isletmeBaglami(s);
    const once = hatHesapla(s, hh, tanim, b);
    s.isletme!.sefer_etkileri = [{ hat, rota: "kara_kervani", satis: 0.1, alis: 0.1, bitis_yili: s.yil }];
    const sonra = hatHesapla(s, hh, tanim, b);
    expect(sonra.birimFiyat).toBeGreaterThan(once.birimFiyat);
    expect(sonra.birimMaliyet).toBeLessThan(once.birimMaliyet);
    expect(hatBonusu(s, hat)).not.toBeNull();
    s.yil += 1;
    expect(seferBonusu(s, hat)).toBeNull();

    await isletmeProjeBaslat(s.id, "nehir_kiyi", hat, "yok");
    bitir(s);
    vi.spyOn(Math, "random").mockReturnValue(0);
    const r = await isletmeProjeKarar(s.id, "ode");
    expect(r.sonuc.aile).toBe("sefer");
    expect(r.durum.proje!.seferEtkileri.length).toBe(1);
    expect(r.durum.proje!.karar).toBeNull();
  });
});
