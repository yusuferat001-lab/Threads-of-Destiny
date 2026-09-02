import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, rutbeGuncelle, BOLGELER_BY_CAG } from "../src/game/stateManager";

describe("ebeveynler (anne/baba)", () => {
  it("yeni karakterin anne_adi ve baba_adi'si dolu ve birbirinden/dost-rakipten farklıdır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    expect(state.anne_adi).toBeTruthy();
    expect(state.baba_adi).toBeTruthy();
    expect(state.anne_adi).not.toBe(state.baba_adi);
    expect(state.anne_adi).not.toBe(state.dost_adi);
    expect(state.anne_adi).not.toBe(state.rakip_adi);
    expect(state.baba_adi).not.toBe(state.dost_adi);
    expect(state.baba_adi).not.toBe(state.rakip_adi);
  });

  it("her bölgede anne_adi hep kadın, baba_adi hep erkek isim havuzundan gelir (100 karakterlik örnekte)", () => {
    for (const cag of Object.keys(BOLGELER_BY_CAG) as (keyof typeof BOLGELER_BY_CAG)[]) {
      for (const bolge of BOLGELER_BY_CAG[cag]) {
        for (let i = 0; i < 100; i++) {
          const state = createCharacter(cag, bolge, "sehir_merkezi");
          expect(KADIN_ISIMLERI[bolge]).toBeDefined();
          expect(KADIN_ISIMLERI[bolge]).toContain(state.anne_adi);
          expect(ERKEK_ISIMLERI[bolge]).toContain(state.baba_adi);
        }
      }
    }
  });
});

/** Testin kendi bağımsız beklenti listesi — npcIsimleri.ts'teki gerçek havuzla birebir örtüşmeli. */
const KADIN_ISIMLERI: Record<string, string[]> = {
  Fransa: ["Isabeau", "Marguerite", "Blanche", "Aliénor"],
  "Kutsal Roma": ["Adelheid", "Gertrud", "Brunhild", "Hildegard"],
  Bizans: ["Zoe", "Eirene", "Theodora", "Anna"],
  Selçuklu: ["Elif", "Zeynep", "Gülhatun"],
  Eyyubiler: ["Zeynab", "Amina", "Leyla", "Nur"],
  İngiltere: ["Margaret", "Charlotte", "Alice", "Emily"],
  Osmanlı: ["Fatma", "Ayşe", "Zehra", "Emine"],
  Rusya: ["Elena", "Anastasia", "Olga", "Irina"],
};

const ERKEK_ISIMLERI: Record<string, string[]> = {
  Fransa: ["Étienne", "Baudouin", "Guillaume", "Aymeric", "Thibault", "Renaud"],
  "Kutsal Roma": ["Konrad", "Heinrich", "Friedrich", "Wolfram", "Ludwig", "Otto"],
  Bizans: ["Theodoros", "Ioannes", "Anastasios", "Konstantinos", "Photios", "Nikephoros"],
  Selçuklu: ["Alparslan", "Yusuf", "Melikşah", "Turhan", "Sencer", "Tuğrul", "Kılıçarslan"],
  Eyyubiler: ["Selahaddin", "Faruk", "Halil", "Kerim", "Tarık", "Eyüp"],
  İngiltere: ["Thomas", "William", "Edward", "Henry", "George", "Arthur"],
  Osmanlı: ["Ahmet", "Mehmet", "Hasan", "Hüseyin", "Mustafa", "Osman"],
  Rusya: ["Ivan", "Nikolai", "Mikhail", "Dmitri", "Pyotr", "Sergei"],
};

/** Test yardımcısı: eşikleri fazlasıyla doldurup yılı ilerleterek karakteri hedef kademeye çıkarır. */
function terfiEttir(state: ReturnType<typeof createCharacter>, hedefSeviye: number): void {
  let guard = 0;
  while (state.rutbe_seviye < hedefSeviye && guard++ < 20) {
    state.kariyer_puani = 999;
    state.un = 100;
    state.ahlak = 100;
    state.yil += 10; // her kademe cooldown'unu fazlasıyla aşar
    rutbeGuncelle(state);
  }
}

describe("astlar", () => {
  it("meslek seçildiğinde (rütbe seviye 1) hiç ast yok", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Asker");
    expect(state.rutbe_seviye).toBe(1);
    expect(state.astlar).toEqual([]);
  });

  it("seviye 2'ye terfi edince tam 1 ast, kendinden düşük (seviye 1) unvanla eklenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Asker");
    state.kariyer_puani = 20;
    state.un = 40;
    rutbeGuncelle(state);
    expect(state.rutbe_seviye).toBe(2);
    expect(state.astlar).toHaveLength(1);
    expect(state.astlar[0].rutbe).toBe("Er");
    expect(state.astlar[0].isim).toBeTruthy();
    expect(state.astlar[0].isim).not.toBe(state.dost_adi);
    expect(state.astlar[0].isim).not.toBe(state.rakip_adi);
    expect(state.astlar[0].isim).not.toBe(state.anne_adi);
    expect(state.astlar[0].isim).not.toBe(state.baba_adi);
  });

  it("seviye 3'e terfi edince 2. bir ast (seviye 2 unvanlı) eklenir, ilk astın ismi değişmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Asker");
    state.kariyer_puani = 20;
    state.un = 40;
    rutbeGuncelle(state);
    const ilkAstIsim = state.astlar[0].isim;

    state.kariyer_puani = 60;
    state.un = 55;
    state.yil += 5; // seviye 3 cooldown'u (3 yıl) aşılır
    rutbeGuncelle(state);

    expect(state.rutbe_seviye).toBe(3);
    expect(state.astlar).toHaveLength(2);
    expect(state.astlar[0].isim).toBe(ilkAstIsim);
    expect(state.astlar[0].rutbe).toBe("Er");
    expect(state.astlar[1].rutbe).toBe("Onbaşı");
    expect(state.astlar[1].isim).not.toBe(state.astlar[0].isim);
  });

  it("amir_adi en üst kademede (5) null olsa da astlar dolu kalır — en tepede bile ast eksikliği olmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    terfiEttir(state, 5);
    expect(state.rutbe_seviye).toBe(5);
    expect(state.amir_adi).toBeNull();
    expect(state.astlar).toHaveLength(4);
  });
});
