import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec, hesaplaMaasYillik } from "../src/game/stateManager";
import * as AS from "../src/game/aileSistemi";
import * as S from "../src/data/aileSabitleri";
import { yeniOyun, mesleğiAta, cocukIseAl, cocukRedTepkisi, ekipCikar, aileDurumGetir } from "../src/game/gameEngine";
import type { CharacterState, Cocuk } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function babaKarakter(): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(state, "Tüccar");
  state.yas = 40;
  return state;
}

function cocukEkle(state: CharacterState, yas: number, yatkinlik: Cocuk["yatkinlik"] = "yatkin", ek: Partial<Cocuk> = {}): Cocuk {
  const c: Cocuk = { isim: `Cocuk${state.cocuklar.length}`, dogum_yili: state.yil - yas, yasiyor: true, iliski: 60, yatkinlik, ...ek };
  state.cocuklar.push(c);
  state.cocuk_sayisi = state.cocuklar.filter((x) => x.yasiyor).length;
  return c;
}

describe("15 yaşında yanında çalışma daveti", () => {
  it("15 yaşına gelen çocuğa davet hakkı açılır (bir kez), 14 yaşındakine açılmaz", () => {
    const state = babaKarakter();
    const genc = cocukEkle(state, 14);
    const hazir = cocukEkle(state, 15);
    const buyuk = cocukEkle(state, 22);
    const mesajlar = AS.cocukIsYillikUygula(state);
    expect(genc.is_durumu).toBeUndefined();
    expect(hazir.is_durumu).toBe("bekliyor");
    expect(buyuk.is_durumu).toBe("bekliyor");
    expect(mesajlar).toHaveLength(2);
    // ikinci çağrıda tekrar mesaj yok
    expect(AS.cocukIsYillikUygula(state)).toEqual([]);
    // genç çocuk büyüyünce davet hakkı gelir
    state.yil += 1;
    expect(AS.cocukIsYillikUygula(state)).toHaveLength(1);
    expect(genc.is_durumu).toBe("bekliyor");
  });

  it("kabul olasılığı: yatkın %100, nötr ~%50, uyumsuz ~%15 (ilişkiyle ±12,5)", () => {
    const yatkin = { isim: "A", dogum_yili: 1, yasiyor: true, iliski: 0, yatkinlik: "yatkin" } as Cocuk;
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(AS.cocukKabulEder(yatkin)).toBe(true);
    const notr = { isim: "B", dogum_yili: 1, yasiyor: true, iliski: 50, yatkinlik: "notr" } as Cocuk;
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.49);
    expect(AS.cocukKabulEder(notr)).toBe(true);
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.51);
    expect(AS.cocukKabulEder(notr)).toBe(false);
    const uyumsuz = { isim: "C", dogum_yili: 1, yasiyor: true, iliski: 50, yatkinlik: "uyumsuz" } as Cocuk;
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.14);
    expect(AS.cocukKabulEder(uyumsuz)).toBe(true);
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.16);
    expect(AS.cocukKabulEder(uyumsuz)).toBe(false);
    // yüksek ilişki şansı artırır
    uyumsuz.iliski = 100;
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.26);
    expect(AS.cocukKabulEder(uyumsuz)).toBe(true);
  });

  it("ekip değerleri: kalite en iyinin %1-2 üstü, maaş indirimi %15-20, buff piyasa en iyisinden %1-2 fazla", () => {
    for (let i = 0; i < 50; i++) {
      const d = AS.cocukEkipDegerleri();
      expect(d.gercekKalite).toBeGreaterThanOrEqual(Math.round(S.PIYASA_EN_IYI_KALITE * 1.01));
      expect(d.gercekKalite).toBeLessThanOrEqual(Math.round(S.PIYASA_EN_IYI_KALITE * 1.02));
      expect(d.maasIndirimi).toBeGreaterThanOrEqual(0.15);
      expect(d.maasIndirimi).toBeLessThanOrEqual(0.2);
      const piyasaBuff = 1 + (S.PIYASA_EN_IYI_KALITE - 50) / 500;
      expect(d.buffCarpani / piyasaBuff).toBeGreaterThanOrEqual(1.01 - 1e-9);
      expect(d.buffCarpani / piyasaBuff).toBeLessThanOrEqual(1.02 + 1e-9);
    }
  });

  it("ölen çocuk ekipten düşer", () => {
    const state = babaKarakter();
    const c = cocukEkle(state, 20, "yatkin", { is_durumu: "ise_alindi" });
    state.ekip.push({ id: "e1", isim: c.isim, rol: "Varis", gercekKalite: 86, tahminiMin: 80, tahminiMax: 90, maas: 7, sadakat: 100, kisilik: "Sadık", cocuk_isim: c.isim });
    c.ekip_id = "e1";
    c.yasiyor = false;
    const mesajlar = AS.cocukIsYillikUygula(state);
    expect(state.ekip).toHaveLength(0);
    expect(mesajlar).toHaveLength(1);
  });
});

describe("motor: çocuğu ekibe al / reddedilen davete tepki", () => {
  async function oturum() {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 40;
    state.para = 500;
    return state;
  }

  it("yatkın çocuk kabul eder: ekibe girer (sadakat 100, düşük maaş), maaş çarpanı artar, ilişki ve moral yükselir", async () => {
    const state = await oturum();
    const c = cocukEkle(state, 16, "yatkin", { is_durumu: "bekliyor" });
    const maasOnce = hesaplaMaasYillik(state);
    const mutluluk = state.mutluluk;
    const sonuc = await cocukIseAl(state.id, 0);
    expect(sonuc.kabul).toBe(true);
    expect(c.is_durumu).toBe("ise_alindi");
    const uye = state.ekip.find((e) => e.cocuk_isim === c.isim)!;
    expect(uye).toBeDefined();
    expect(c.ekip_id).toBe(uye.id);
    expect(uye.rol).toBe("Varis");
    expect(uye.isim).toBe(c.isim);
    expect(uye.sadakat).toBe(100);
    expect(uye.gercekKalite).toBeGreaterThanOrEqual(86);
    // normal bir çalışandan (aynı kalite) %15-20 ucuz
    const tam = 2 + Math.round(uye.gercekKalite / 14);
    expect(uye.maas).toBeLessThanOrEqual(tam * 0.86);
    expect(uye.maas).toBeGreaterThanOrEqual(tam * 0.79);
    expect(hesaplaMaasYillik(state)).toBeGreaterThan(maasOnce);
    expect(c.iliski).toBe(65);
    expect(state.mutluluk).toBeGreaterThan(mutluluk);
    // ikinci kez davet edilemez
    await expect(cocukIseAl(state.id, 0)).rejects.toThrow();
  });

  it("reddeden çocuk: öfke ilişkiyi düşürür, sakin yükseltir; davet kapanır", async () => {
    for (const [tepki, beklenen] of [["ofke", 45], ["sakin", 63]] as const) {
      const state = await oturum();
      const c = cocukEkle(state, 16, "uyumsuz", { is_durumu: "bekliyor" });
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      const red = await cocukIseAl(state.id, 0);
      vi.restoreAllMocks();
      expect(red.kabul).toBe(false);
      expect(c.is_durumu).toBe("red_tepkisi");
      expect(state.ekip).toHaveLength(0);
      const mutluluk = state.mutluluk;
      const sonuc = await cocukRedTepkisi(state.id, 0, tepki);
      expect(sonuc.mesaj.length).toBeGreaterThan(5);
      expect(c.is_durumu).toBe("reddetti");
      expect(c.iliski).toBe(beklenen);
      if (tepki === "ofke") expect(state.mutluluk).toBeLessThan(mutluluk);
      await expect(cocukRedTepkisi(state.id, 0, tepki)).rejects.toThrow();
      await expect(cocukIseAl(state.id, 0)).rejects.toThrow();
    }
  });

  it("davet yokken/ölü çocuk için hata; çocuğu ekipten kovmak ilişkiyi düşürür ve daveti kapatır", async () => {
    const state = await oturum();
    cocukEkle(state, 10);
    await expect(cocukIseAl(state.id, 0)).rejects.toThrow(); // henüz 15 değil, davet yok
    const c = cocukEkle(state, 18, "yatkin", { is_durumu: "bekliyor" });
    await cocukIseAl(state.id, 1);
    const uye = state.ekip.find((e) => e.cocuk_isim === c.isim)!;
    const iliski = c.iliski;
    const kov = await ekipCikar(state.id, uye.id);
    expect(kov.mesaj.length).toBeGreaterThan(10);
    expect(c.iliski).toBe(iliski + S.COCUK_KOV_ILISKI);
    expect(c.is_durumu).toBe("reddetti");
    expect(state.ekip).toHaveLength(0);
  });

  it("aileDurumGetir çocukların davet durumunu döner, yatkınlığı sızdırmaz", async () => {
    const state = await oturum();
    cocukEkle(state, 16, "yatkin", { is_durumu: "bekliyor" });
    const durum = await aileDurumGetir(state.id);
    expect(durum.cocuklar[0].isDurumu).toBe("bekliyor");
    expect((durum.cocuklar[0] as unknown as { yatkinlik?: unknown }).yatkinlik).toBeUndefined();
  });

  it("doğan çocukların yatkınlığı ~%70 yatkın / %20 uyumsuz / %10 nötr dağılır", () => {
    let yatkin = 0;
    let uyumsuz = 0;
    let notr = 0;
    const N = 4000;
    for (let i = 0; i < N; i++) {
      const y = AS.cocukYatkinligi();
      if (y === "yatkin") yatkin++;
      else if (y === "uyumsuz") uyumsuz++;
      else notr++;
    }
    expect(yatkin / N).toBeGreaterThan(0.65);
    expect(yatkin / N).toBeLessThan(0.75);
    expect(uyumsuz / N).toBeGreaterThan(0.16);
    expect(uyumsuz / N).toBeLessThan(0.24);
    expect(notr / N).toBeGreaterThan(0.07);
    expect(notr / N).toBeLessThan(0.13);
  });
});
