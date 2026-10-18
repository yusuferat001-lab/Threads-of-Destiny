import { describe, it, expect, vi, afterEach } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  aileDurumGetir,
  mantikTeklifEt,
  dugunYap,
  esEylemYap,
} from "../src/game/gameEngine";

afterEach(() => vi.restoreAllMocks());

async function bekarOturum(yas = 30) {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  state.yas = yas;
  state.para = 1000;
  return state;
}

describe("mantık evliliği (aday listesi → teklif → düğün)", () => {
  it("aileDurumGetir: bekar, uygun yaştaki karaktere 3 aday + teklif/düğün seçeneklerini döner", async () => {
    const state = await bekarOturum();
    const durum = await aileDurumGetir(state.id);
    expect(durum.mantik.acik).toBe(true);
    expect(durum.mantik.sebep).toBeNull();
    expect(durum.mantik.adaylar).toHaveLength(3);
    for (const a of durum.mantik.adaylar) {
      expect(["genc", "olgun"]).toContain(a.grup);
      expect(typeof a.huy).toBe("string"); // yalnız ilk huy görünür
      expect(a.ceyiz).toBeGreaterThan(0);
      expect((a as unknown as { huylar?: unknown }).huylar).toBeUndefined();
    }
    expect(durum.mantik.teklifSecenekleri.map((t) => t.hediye)).toEqual(["sade", "ucuz", "pahali"]);
    expect(durum.dugunSecenekleri.map((d) => d.butce)).toEqual(["ucuz", "orta", "pahali"]);
    expect(durum.es).toBeNull();
    // Aynı liste tekrar açılınca değişmez (state'te saklanır)
    const tekrar = await aileDurumGetir(state.id);
    expect(tekrar.mantik.adaylar.map((a) => a.isim)).toEqual(durum.mantik.adaylar.map((a) => a.isim));
  });

  it("22 yaş altı karakter için mantık evliliği kapalıdır", async () => {
    const state = await bekarOturum(20);
    const durum = await aileDurumGetir(state.id);
    expect(durum.mantik.acik).toBe(false);
    expect(durum.mantik.sebep).toBe("yas_dusuk");
    expect(durum.mantik.adaylar).toEqual([]);
    await expect(mantikTeklifEt(state.id, 0, "sade")).rejects.toThrow();
  });

  it("tam akış: teklif kabul → bekleyen düğün → bütçe → evli; sonra bar eylemleri", async () => {
    const state = await bekarOturum();
    await aileDurumGetir(state.id);
    vi.spyOn(Math, "random").mockReturnValue(0); // teklif zarı başarılı
    const teklif = await mantikTeklifEt(state.id, 0, "pahali");
    vi.restoreAllMocks();
    expect(teklif.kabul).toBe(true);
    let durum = await aileDurumGetir(state.id);
    expect(durum.bekleyenDugun).not.toBeNull();
    expect(durum.mantik.acik).toBe(false);
    expect(durum.mantik.sebep).toBe("bekleyen_dugun");

    const sonuc = await dugunYap(state.id, "orta");
    expect(sonuc.state.etiketler).toContain("medeni:evli");
    expect(sonuc.state.es_adi).toBe(teklif.state.bekleyen_dugun ? teklif.state.bekleyen_dugun.isim : sonuc.state.es_adi);
    durum = await aileDurumGetir(state.id);
    expect(durum.es?.tur).toBe("mantik");
    expect(durum.es?.huylar).toHaveLength(2); // evlilikten sonra iki huy da görünür
    expect(durum.bekleyenDugun).toBeNull();
    expect(durum.mantik.sebep).toBe("evli");

    const once = durum.es!.puan;
    const eylem = await esEylemYap(state.id, "hediye_ver", "ucuz");
    expect(eylem.state.es_puani).toBeGreaterThan(once);
    await expect(esEylemYap(state.id, "hediye_ver", "ucuz")).rejects.toThrow(); // 2 yıl bekleme
  });

  it("red: mantık sistemi 2 yıl kilitlenir", async () => {
    const state = await bekarOturum();
    await aileDurumGetir(state.id);
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const teklif = await mantikTeklifEt(state.id, 0, "sade");
    vi.restoreAllMocks();
    expect(teklif.kabul).toBe(false);
    const durum = await aileDurumGetir(state.id);
    expect(durum.mantik.sebep).toBe("kilit");
    expect(durum.mantik.kilitKalanYil).toBe(2);
    expect(durum.mantik.adaylar).toEqual([]);
  });

  it("geçersiz aday / düğün olmadan bütçe / evli iken teklif hata verir", async () => {
    const state = await bekarOturum();
    await aileDurumGetir(state.id);
    await expect(mantikTeklifEt(state.id, 99, "sade")).rejects.toThrow();
    await expect(dugunYap(state.id, "orta")).rejects.toThrow();
    vi.spyOn(Math, "random").mockReturnValue(0);
    await mantikTeklifEt(state.id, 0, "sade");
    vi.restoreAllMocks();
    await dugunYap(state.id, "ucuz");
    await expect(mantikTeklifEt(state.id, 0, "sade")).rejects.toThrow();
  });
});
