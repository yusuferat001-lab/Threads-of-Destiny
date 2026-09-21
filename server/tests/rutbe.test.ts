import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, rutbeGuncelle, hesaplaMaasYillik } from "../src/game/stateManager";
import { RUTBELER, TERFI_COOLDOWN } from "../src/data/rutbeler";

/** Eşikleri fazlasıyla doldurup yılı ilerleterek karakteri hedef kademeye çıkarır. */
function terfiEttir(state: ReturnType<typeof createCharacter>, hedef: number): void {
  let guard = 0;
  while (state.rutbe_seviye < hedef && guard++ < 30) {
    state.kariyer_puani = 999;
    state.un = 100;
    state.ahlak = 100;
    state.yil += 10;
    rutbeGuncelle(state);
  }
}

describe("rütbe reformu — 5 kademe, ratchet, cooldown, kariyer puanı", () => {
  it("her meslek×çağ için 5 unvan ve 4 eşik tanımlı, hiçbir eşikte para koşulu yok", () => {
    for (const meslek of Object.keys(RUTBELER)) {
      for (const cag of Object.keys(RUTBELER[meslek])) {
        const t = RUTBELER[meslek][cag as keyof (typeof RUTBELER)[string]];
        expect(t.unvanlar).toHaveLength(5);
        expect(t.esikler).toHaveLength(4);
        for (const e of t.esikler) {
          expect(typeof e.kariyer_puani).toBe("number");
          expect((e as Record<string, unknown>).para).toBeUndefined();
          // Asker/Tüccar ün, Din Adamı ahlak — her kademede mesleğe özgü stat şart
          if (meslek === "Din Adamı") expect(typeof e.ahlak).toBe("number");
          else expect(typeof e.un).toBe("number");
        }
      }
    }
  });

  it("yeni karakter seviye 1, kariyer_puani 0, son_terfi_yili = baslangic_yili", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    expect(s.rutbe_seviye).toBe(1);
    expect(s.kariyer_puani).toBe(0);
    expect(s.son_terfi_yili).toBe(s.baslangic_yili);
  });

  it("kariyer_puani + ün eşiği aşılınca seviye 2'ye terfi eder (S2 cooldown yok)", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    s.kariyer_puani = 20;
    s.un = 40;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2);
    expect(s.rutbe).toBe("Onbaşı");
    expect(s.son_terfi_yili).toBe(s.yil);
  });

  it("cooldown: puan fazlasıyla dolsa bile son terfiden TERFI_COOLDOWN[3] yıl geçmeden seviye 3 olmaz", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    s.kariyer_puani = 20;
    s.un = 40;
    rutbeGuncelle(s);
    const s2Yili = s.yil;

    s.kariyer_puani = 999;
    s.un = 100;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2); // cooldown dolmadı

    s.yil = s2Yili + TERFI_COOLDOWN[3];
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(3);
  });

  it("çağrı başına en fazla +1 kademe ilerler", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Tüccar");
    s.kariyer_puani = 999;
    s.un = 100;
    s.yil += 50; // tüm cooldownlar aşılmış olsa bile
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2);
    s.yil += 50;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(3);
  });

  it("RATCHET: kariyer_puani ve statlar sıfırlansa bile rütbe düşmez", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Din Adamı");
    terfiEttir(s, 4);
    expect(s.rutbe_seviye).toBe(4);

    s.kariyer_puani = 0;
    s.ahlak = 0;
    s.un = 0;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(4);
  });

  it("en üst kademede (5) amir yoktur, 4 ast vardır", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    terfiEttir(s, 5);
    expect(s.rutbe_seviye).toBe(5);
    expect(s.amir_adi).toBeNull();
    expect(s.astlar).toHaveLength(4);
  });

  it("Tüccar'da her kademe ün ister — ün düşükken kariyer_puani ne olursa olsun terfi olmaz", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Tüccar");
    s.kariyer_puani = 999;
    s.un = 5; // S2 ün eşiğinin (12) altında
    s.yil += 50;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(1);
    s.un = 50;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2);
  });

  it("maaş rütbe yükseldikçe kalıcı olarak artar", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    s.un = 50;
    const m1 = hesaplaMaasYillik(s);
    s.rutbe_seviye = 3;
    const m3 = hesaplaMaasYillik(s);
    s.rutbe_seviye = 5;
    const m5 = hesaplaMaasYillik(s);
    expect(m3).toBeGreaterThan(m1);
    expect(m5).toBeGreaterThan(m3);
  });

  it("Din Adamı unvanları dine göre değişir (Sünni İslam), eşikler aynı kalır", () => {
    const s = createCharacter("Orta Çağ", "Selçuklu", "kasaba");
    mesleğiSec(s, "Din Adamı");
    expect(s.din_kultur).toBe("Sünni İslam");
    terfiEttir(s, 5);
    expect(s.rutbe).toBe("Baş İmam");
  });
});
