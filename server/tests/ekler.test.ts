import { describe, expect, it } from "vitest";
import { ekUyumla, sayiSonKelime } from "../src/i18n/ekler";
import { T } from "../src/i18n";

describe("Türkçe ek uyumu (ekUyumla)", () => {
  const ornekler: [string, string, string][] = [
    // [kelime, kalıp ek, beklenen]
    ["Theodora", "in", "nın"],
    ["Theodora", "e", "ya"],
    ["Theodora", "i", "yı"],
    ["Theodora", "dı", "ydı"],
    ["Komnenos", "e", "a"],
    ["Komnenos", "in", "un"],
    ["Basil", "i", "i"],
    ["Ali", "i", "yi"],
    ["Ayşe", "in", "nin"],
    ["Jean", "un", "ın"],
    ["Maria", "u", "yı"],
    ["Duman", "ı", "ı"],
    ["Pamuk", "ın", "un"],
    ["Pamuk", "dı", "tu"],
    ["Duman", "dı", "dı"],
    ["Kedi", "dı", "ydi"],
    ["Paris", "deki", "teki"],
    ["Ankara", "deki", "daki"],
    ["Bizans", "nin", "ın"],
    ["Fransa", "yi", "yı"],
    ["Fransa", "den", "dan"],
    ["Mehmet", "den", "ten"],
    ["Onbaşı", "sin", "sın"],
    ["Er", "sin", "sin"],
    ["Silahşor", "sin", "sun"],
    ["Lonca Ustası", "sin", "sın"],
    ["Vasıflı İşçi", "sin", "sin"],
    ["Görkemli Konak", "e", "a"],
    ["Sırçalı Köşk", "e", "e"],
    ["6", "e", "ya"],
    ["7", "e", "ye"],
    ["8", "e", "e"],
    ["9", "e", "a"],
    ["10", "e", "a"],
    ["12", "e", "ye"],
    ["%20", "sini", "sini"],
    ["%25", "sini", "ini"],
    ["50", "ini", "sini"],
    ["Ahmet", "le", "le"],
    ["Ayşe", "le", "yle"],
    ["Ayşe", "yla", "yle"],
    ["Ahmet", "yla", "le"],
  ];
  for (const [kelime, ek, beklenen] of ornekler) {
    it(`${kelime} + '${ek} → '${beklenen}`, () => {
      expect(ekUyumla(kelime, ek)).toBe(beklenen);
    });
  }

  it("sayı okunuşunun son kelimesi", () => {
    expect(sayiSonKelime(6)).toBe("altı");
    expect(sayiSonKelime(120)).toBe("yirmi");
    expect(sayiSonKelime(1000)).toBe("bin");
    expect(sayiSonKelime(105)).toBe("beş");
  });
});

describe("T() şablonlarında ek uyumu", () => {
  it("Türkçede {0}'ek kalıbını değere göre uyumlar", () => {
    expect(T("tr", "🎖️ Artık {0}'sin! Yıllık kazancın: {1} {birim}.", ["Onbaşı", 11])).toBe(
      "🎖️ Artık Onbaşı'sın! Yıllık kazancın: 11 {birim}."
    );
    expect(T("tr", "{0}'e {1} — zar senden yana.", [6, 7])).toBe("6'ya 7 — zar senden yana.");
  });
  it("İngilizce şablona dokunmaz", () => {
    expect(T("en", "🎖️ Artık {0}'sin! Yıllık kazancın: {1} {birim}.", ["Corporal", 11])).toBe(
      "🎖️ You are now a Corporal! Your yearly earnings: 11 {birim}."
    );
  });
});
