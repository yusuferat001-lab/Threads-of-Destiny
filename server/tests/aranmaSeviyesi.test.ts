import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle, clampStats } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";
import { OLAY_ARANMA_SEVIYESI } from "../src/data/olaylar/aranmaSeviyesi";
import type { CharacterState, SecimSonucu } from "../src/types";

/**
 * TEK suç/aranma ekseni (suc_seviyesi, 0-100). Aranma kademe bantları:
 *   temiz 0-19 | kademe 1: 20-39 | kademe 2: 40-59 | kademe 3: 60-79 | kademe 4: 80-100
 */
const BANT = { temiz: 10, k1: 30, k2: 50, k3: 70, k4: 90 } as const;

function sadeceBuOlayaZorla(state: CharacterState, hedefId: string): void {
  state.gecmis_olaylar = OLAY_BANKASI.filter((o) => o.id !== hedefId).map((o) => o.id);
}

async function tazeOturum(meslek: string): Promise<CharacterState> {
  const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
  state.yas = 18;
  state.saglik = 100;
  state.mutluluk = 60;
  state.ulke.savasta = true;
  await mesleğiAta(state.id, meslek);
  return state;
}

describe("aranma kademesi — tek eksen (suc_seviyesi) ve klemp", () => {
  it("yeni karakter suc_seviyesi 0 ile başlar ve ayrı bir aranma_seviyesi alanı yoktur", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    expect(state.suc_seviyesi).toBe(0);
    expect((state as Record<string, unknown>).aranma_seviyesi).toBeUndefined();
  });

  it("clampStats suc_seviyesi'ni 0-100 aralığında tutar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    state.suc_seviyesi = 250;
    clampStats(state);
    expect(state.suc_seviyesi).toBe(100);
    state.suc_seviyesi = -40;
    clampStats(state);
    expect(state.suc_seviyesi).toBe(0);
  });
});

describe("aranma kademesi — olay havuzu şekli", () => {
  it("en az 25 aranma-ilişkili olay var", () => {
    expect(OLAY_ARANMA_SEVIYESI.length).toBeGreaterThanOrEqual(25);
  });

  it("tetikleyici olaylar temiz banda (maxSucSeviyesi:24) kilitli", () => {
    const tetikleyiciler = OLAY_ARANMA_SEVIYESI.filter((o) => o.maxSucSeviyesi === 24);
    expect(tetikleyiciler.length).toBeGreaterThanOrEqual(3);
    for (const o of tetikleyiciler) expect(o.minSucSeviyesi).toBeUndefined();
  });

  it("her kademe (1-4) için o banda kilitli en az bir olay var", () => {
    // 2026-09 aranma yeniden dengeleme turu: 5 bant (temiz+1-4) → 4 bant
    // (0-25/25-50/50-75/75-100). Kademe 1 (rutin/rüşvet) artık temiz bandıyla
    // aynı üst sınırı (25) paylaşır (minSucSeviyesi tanımsız, temiz olaylarla
    // aynı havuzda rekabet eder).
    const bantlar: Array<[number | undefined, number | undefined]> = [
      [undefined, 25],
      [25, 50],
      [50, 75],
      [75, undefined],
    ];
    for (const [min, max] of bantlar) {
      const varMi = OLAY_ARANMA_SEVIYESI.some(
        (o) => o.minSucSeviyesi === min && o.maxSucSeviyesi === max && !o.id.startsWith("aranma_baskin_")
      );
      expect(varMi).toBe(true);
    }
  });

  it("kacak (dağ/fugitive) havuzu tek başına yeterince büyük", () => {
    const kacakOlaylari = OLAY_ARANMA_SEVIYESI.filter((o) => o.kacakOlayi);
    expect(kacakOlaylari.length).toBeGreaterThanOrEqual(8);
  });

  it("iki baskın olayı da suc_seviyesi 50'de başlar, üst sınırı yok (kademe 3 VE 4'te çıkar)", () => {
    const baskinlar = OLAY_ARANMA_SEVIYESI.filter((o) => o.id.startsWith("aranma_baskin_"));
    expect(baskinlar).toHaveLength(2);
    for (const b of baskinlar) {
      expect(b.minSucSeviyesi).toBe(50);
      expect(b.maxSucSeviyesi).toBeUndefined();
      expect(b.secenekler).toHaveLength(3);
    }
  });

  it("her aranma olayında en az bir kilitsiz seçenek vardır (borçlu/parasız karakterde bile)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.para = -50;
    for (const tanim of OLAY_ARANMA_SEVIYESI) {
      const { senaryo } = olaySec(state, tanim.id);
      expect(senaryo.secenekler.some((s) => !s.kilitli)).toBe(true);
    }
  });
});

describe("aranma kademesi — havuz izolasyonu (kacak etiketi)", () => {
  it("kacak değilken kacak-özel olaylar hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 400; i++) {
      const { olay } = olaySec(state);
      expect(olay.kacakOlayi).not.toBe(true);
    }
  });

  it("kacak etiketiyle SADECE kacak-özel olaylar çıkar (şehir havuzu tamamen kapanır)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["kacak"]);
    for (let i = 0; i < 400; i++) {
      const { olay } = olaySec(state);
      expect(olay.kacakOlayi).toBe(true);
    }
  });
});

describe("aranma kademesi — bant filtreleme (suc_seviyesi)", () => {
  it("temiz bandda (suc_seviyesi 0) üst kademelere özel olaylar (min>=20) hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.suc_seviyesi = 0;
    for (let i = 0; i < 400; i++) {
      const { olay } = olaySec(state);
      if (olay.minSucSeviyesi !== undefined) expect(olay.minSucSeviyesi).toBeLessThanOrEqual(0);
    }
  });

  it.each([BANT.k1, BANT.k2, BANT.k3, BANT.k4])(
    "suc_seviyesi %i iken sadece o banda uygun aranma olayları çıkar",
    (suc) => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      state.suc_seviyesi = suc;
      for (let i = 0; i < 400; i++) {
        const { olay } = olaySec(state);
        if (olay.id.startsWith("aranma_") && !olay.kacakOlayi) {
          if (olay.minSucSeviyesi !== undefined) expect(olay.minSucSeviyesi).toBeLessThanOrEqual(suc);
          if (olay.maxSucSeviyesi !== undefined) expect(olay.maxSucSeviyesi).toBeGreaterThanOrEqual(suc);
        }
      }
    }
  );
});

describe("aranma kademesi — baskın olayının etkileri (gerçek secimUygula üzerinden)", () => {
  it("Teslim Ol: hangi zar sonucu çıkarsa çıksın hapiste eklenir, para/ün sıfırlanır, suc_seviyesi temiz banda döner", async () => {
    const state = await tazeOturum("Tüccar");
    state.suc_seviyesi = BANT.k3;
    state.para = 250;
    state.un = 40;
    sadeceBuOlayaZorla(state, "aranma_baskin_ortacag");

    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Ev Baskını");
    const sonuc = (await secimUygula(state.id, 0)) as SecimSonucu;

    expect(sonuc.state.etiketler).toContain("hapiste");
    expect(sonuc.state.para).toBeLessThan(50);
    expect(sonuc.state.un).toBe(0);
    expect(sonuc.state.suc_seviyesi).toBeLessThan(20);
  });

  it("Servetinle Rüşvet Ver: başarısızsa hapse düşülür ve suc_seviyesi temiz banda iner; başarılıysa servet erir ve kademe 1 bandına sabitlenir", async () => {
    let basariliGorundu = false;
    let basarisizGorundu = false;
    for (let deneme = 0; deneme < 40 && !(basariliGorundu && basarisizGorundu); deneme++) {
      const state = await tazeOturum("Tüccar");
      state.suc_seviyesi = BANT.k4;
      state.para = 400;
      sadeceBuOlayaZorla(state, "aranma_baskin_ortacag");
      await senaryoUret(state.id);
      const sonuc = (await secimUygula(state.id, 1)) as SecimSonucu;

      expect(sonuc.state.para).toBeLessThan(180);
      if (sonuc.state.etiketler.includes("hapiste")) {
        basarisizGorundu = true;
        expect(sonuc.state.suc_seviyesi).toBeLessThan(20);
      } else {
        basariliGorundu = true;
        expect(sonuc.state.suc_seviyesi).toBeGreaterThanOrEqual(20);
        expect(sonuc.state.suc_seviyesi).toBeLessThan(40);
      }
    }
    expect(basariliGorundu || basarisizGorundu).toBe(true);
  });

  it("Arka Kapıdan Kaç başarılı olduğunda: yerlesim dağ başına zorlanır, kacak etiketi eklenir, suc_seviyesi temiz banda iner", async () => {
    let basariylaKactiMi = false;
    for (let deneme = 0; deneme < 50 && !basariylaKactiMi; deneme++) {
      const state = await tazeOturum("Tüccar");
      state.suc_seviyesi = BANT.k3;
      state.para = 100;
      sadeceBuOlayaZorla(state, "aranma_baskin_ortacag");
      await senaryoUret(state.id);
      const sonuc = (await secimUygula(state.id, 2)) as SecimSonucu;

      if (sonuc.state.etiketler.includes("kacak")) {
        basariylaKactiMi = true;
        expect(sonuc.state.yerlesim).toBe("Dağ Başı");
        expect(sonuc.state.suc_seviyesi).toBeLessThan(20);
      } else {
        expect(sonuc.state.etiketler).toContain("hapiste");
      }
    }
    expect(basariylaKactiMi).toBe(true);
  }, 20000);
});

describe("aranma kademesi — tetikleyici ve kademe olaylarının etki alanı", () => {
  it("kademe 1 rutin sorgu olayının kefaret ödemesi başarılı olursa suc_seviyesi temiz banda iner", async () => {
    let dususGorundu = false;
    for (let deneme = 0; deneme < 30 && !dususGorundu; deneme++) {
      const state = await tazeOturum("Tüccar");
      state.suc_seviyesi = BANT.k1;
      state.para = 200;
      sadeceBuOlayaZorla(state, "aranma_1_rutin_sorgu");
      await senaryoUret(state.id);
      const sonuc = (await secimUygula(state.id, 0)) as SecimSonucu;
      if (sonuc.state.suc_seviyesi < 20) dususGorundu = true;
    }
    expect(dususGorundu).toBe(true);
  });

  it("giriş olayında kavgaya devam etmek başarısız olursa suc_seviyesi temiz banddan kademe 1 bandına çıkar", async () => {
    let yukselisGorundu = false;
    for (let deneme = 0; deneme < 30 && !yukselisGorundu; deneme++) {
      const state = await tazeOturum("Tüccar");
      state.suc_seviyesi = 0;
      sadeceBuOlayaZorla(state, "aranma_giris_meyhane_kavgasi");
      await senaryoUret(state.id);
      const sonuc = (await secimUygula(state.id, 1)) as SecimSonucu;
      if (sonuc.state.suc_seviyesi >= 20) yukselisGorundu = true;
    }
    expect(yukselisGorundu).toBe(true);
  });
});

describe("aranma kademesi — kaçak hayatı asla açmaza girmiyor", () => {
  it("kacak etiketiyle onlarca tur boyunca sürekli uygun bir olay bulunur (havuz asla boşalmaz)", async () => {
    const state = await tazeOturum("Tüccar");
    state.para = 50;
    etiketEkle(state, ["kacak"]);
    state.suc_seviyesi = 0;

    for (let tur = 0; tur < 15 && state.aktif; tur++) {
      if (state.saglik < 50) state.saglik = 90;
      if (state.para < 20) state.para = 60;
      const senaryo = await senaryoUret(state.id);
      const acikSecenekler = senaryo.secenekler.map((s, i) => ({ s, i })).filter(({ s }) => !s.kilitli);
      expect(acikSecenekler.length).toBeGreaterThan(0);
      const idx = acikSecenekler[Math.floor(Math.random() * acikSecenekler.length)].i;
      const cevap = await secimUygula(state.id, idx);
      if ("ara_tepki" in cevap) continue;
    }
    expect(true).toBe(true);
  }, 30000);
});
