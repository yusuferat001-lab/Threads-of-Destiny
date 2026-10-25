import { describe, it, expect, vi } from "vitest";
import { createCharacter, checkDeath, etiketEkle, vebaBaslamaliMi } from "../src/game/stateManager";
import { ikiDilT } from "../src/i18n";
import { yeniOyun, mesleğiAta, senaryoUret, stateGetir } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";

describe("ölüm sonrası yıl bloğu", () => {
  it("checkDeath idempotent: ölü karakterde ölüm nedeni ikinci çağrıyla ezilmez", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "tr");
    checkDeath(s, true, ikiDilT("Kıtlığın getirdiği yoksunlukla tükendi."));
    const ilk = s.olum_nedeni;
    checkDeath(s, true, ikiDilT("Zar masasındaki bıçaklı bir kavgada öldü."));
    checkDeath(s, false);
    expect(s.olum_nedeni).toBe(ilk);
    expect(s.aktif).toBe(false);
  });
});

describe("havuz-kilit çakışmaları", () => {
  it("başka bir kilit hapsi devralınca ceza sayaçları sıfırlanır", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "tr");
    etiketEkle(s, ["hapiste"]);
    s.hapis_ceza_kalan = 6;
    s.hapis_ceza_toplam = 8;
    s.hapis_tur_sayaci = 3;
    etiketEkle(s, ["kacak"]);
    expect(s.etiketler.includes("hapiste")).toBe(false);
    expect(s.etiketler.includes("kacak")).toBe(true);
    expect(s.hapis_ceza_kalan).toBe(0);
    expect(s.hapis_ceza_toplam).toBe(0);
    expect(s.hapis_tur_sayaci).toBe(0);
  });

  it("kaçak karaktere veba başlangıcı zorlanmaz (kaçak durumu silinmesin)", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "tr");
    s.yas = 30;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    try {
      s.dunya_yaklasan = { tur: "veba", yil: s.yil }; // veba sırası gelmiş
      expect(vebaBaslamaliMi(s, 1)).toBe(true); // kontrol: normalde tetiklenir
      s.dunya_yaklasan = { tur: "veba", yil: s.yil };
      etiketEkle(s, ["kacak"]);
      expect(vebaBaslamaliMi(s, 1)).toBe(false); // kaçakken beklenir
      expect(s.dunya_yaklasan?.tur).toBe("veba"); // sinyal korunur, kaçak bitince başlar
    } finally {
      rnd.mockRestore();
    }
  });
});
