import { describe, it, expect } from "vitest";
import {
  amacHavuzu,
  amaclariUret,
  amacSkorCarpani,
  amaclariHerhangiKontrol,
  amaclariOlumdeKontrol,
  amacTanimiGetir,
  HAYAT_AMAC_HAVUZU,
  AMAC_ILERLEME,
  AMAC_BONUS,
} from "../src/data/hayatAmaclari";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import type { Cag } from "../src/types";

const CAGLAR: Cag[] = ["Orta Çağ", "Sanayi Devrimi"];
const MESLEKLER = ["Asker", "Tüccar", "Din Adamı"];

describe("hayat amaçları havuzu", () => {
  it("her (çağ × meslek) kombinasyonu en az 5 normal + 3 zor amaç görür", () => {
    for (const cag of CAGLAR) {
      for (const meslek of MESLEKLER) {
        const havuz = amacHavuzu(cag, meslek);
        const n = havuz.filter((a) => a.zorluk === "normal").length;
        const z = havuz.filter((a) => a.zorluk === "zor").length;
        expect(n, `${cag}/${meslek} normal`).toBeGreaterThanOrEqual(5);
        expect(z, `${cag}/${meslek} zor`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("amaclariUret 2 normal + 1 zor döndürür, hepsi tamamlanmamış, bonus doğru", () => {
    for (const cag of CAGLAR) {
      for (const meslek of MESLEKLER) {
        for (let i = 0; i < 20; i++) {
          const secili = amaclariUret(cag, meslek);
          expect(secili).toHaveLength(3);
          expect(secili.filter((a) => a.zorluk === "normal")).toHaveLength(2);
          expect(secili.filter((a) => a.zorluk === "zor")).toHaveLength(1);
          for (const a of secili) {
            expect(a.tamamlandi).toBe(false);
            expect(a.bonus).toBe(AMAC_BONUS[a.zorluk]);
            expect(amacTanimiGetir(a.id)).toBeTruthy();
          }
          // çekilen amaçlar kombinasyona uygun olmalı
          const izinli = new Set(amacHavuzu(cag, meslek).map((a) => a.id));
          expect(secili.every((a) => izinli.has(a.id))).toBe(true);
        }
      }
    }
  });

  it("her amaç tanımının 2 dilli başlık/açıklaması ve çalışan bir koşulu var", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Asker");
    for (const a of HAYAT_AMAC_HAVUZU) {
      expect(a.baslik.tr && a.baslik.en, a.id).toBeTruthy();
      expect(a.aciklama.tr && a.aciklama.en, a.id).toBeTruthy();
      expect(typeof a.kosul(state, 0), a.id).toBe("boolean");
    }
  });

  it("AMAC_ILERLEME sadece havuzdaki id'leri işaret eder", () => {
    for (const id of Object.keys(AMAC_ILERLEME)) {
      expect(amacTanimiGetir(id), id).toBeTruthy();
      expect(AMAC_ILERLEME[id].hedef).toBeGreaterThan(0);
    }
  });
});

describe("amacSkorCarpani", () => {
  const mk = (bonuslar: { bonus: number; tamamlandi: boolean }[]) =>
    ({ hayat_amaclari: bonuslar.map((b, i) => ({ id: `x${i}`, zorluk: "normal", kontrolAni: "herhangi", ...b })) } as any);

  it("hiçbir amaç tamam değilse ×1", () => {
    expect(amacSkorCarpani(mk([{ bonus: 1.5, tamamlandi: false }]))).toBe(1);
  });
  it("1 normal → ×1.5, 2 normal → ×3, 2 normal + 1 zor → ×5", () => {
    expect(amacSkorCarpani(mk([{ bonus: 1.5, tamamlandi: true }]))).toBe(1.5);
    expect(
      amacSkorCarpani(mk([{ bonus: 1.5, tamamlandi: true }, { bonus: 1.5, tamamlandi: true }]))
    ).toBe(3);
    expect(
      amacSkorCarpani(
        mk([
          { bonus: 1.5, tamamlandi: true },
          { bonus: 1.5, tamamlandi: true },
          { bonus: 2, tamamlandi: true },
        ])
      )
    ).toBe(5);
  });
});

describe("konut_sahibi (süreklilik şartı)", () => {
  it("nitelikli banda yeni girmişse (sayaç henüz yeterince eski değil) tamamlanmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const tanim = amacTanimiGetir("konut_sahibi")!;
    state.konut_id = "tas_ev";
    state.konut_surekli_yasadigi_yil = state.yil - 2; // henüz 5 yıl dolmadı
    expect(tanim.kosul(state, 0)).toBe(false);
  });

  it("nitelikli bantta yeterince uzun kalınca tamamlanır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const tanim = amacTanimiGetir("konut_sahibi")!;
    state.konut_id = "sato";
    state.konut_surekli_yasadigi_yil = state.yil - 5;
    expect(tanim.kosul(state, 0)).toBe(true);
  });

  it("sayaç null iken (hiç nitelikli bantta yaşamamış) tamamlanmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const tanim = amacTanimiGetir("konut_sahibi")!;
    expect(state.konut_surekli_yasadigi_yil).toBeNull();
    expect(tanim.kosul(state, 0)).toBe(false);
  });
});

describe("kontrolAni: herhangi vs olumde", () => {
  it("olumde amacı yaşarken tamamlanmaz, ölüm kontrolünde tamamlanır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.hayat_amaclari = [
      { id: "zengin_ve_ihtiyar", zorluk: "zor", bonus: 2, kontrolAni: "olumde", tamamlandi: false },
    ];
    state.yas = 75;
    const servet = 350;
    amaclariHerhangiKontrol(state, servet); // herhangi taraması dokunmamalı
    expect(state.hayat_amaclari[0].tamamlandi).toBe(false);
    amaclariOlumdeKontrol(state, servet);
    expect(state.hayat_amaclari[0].tamamlandi).toBe(true);
  });
});
