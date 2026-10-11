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

  it("kıtlık turun içinde öldürürse kalan yıl-sonu adımları (tefeci el koyması, bağış) çalışmaz", async () => {
    let kitlikOlumu = 0;
    for (let deneme = 0; deneme < 60 && kitlikOlumu === 0; deneme++) {
      const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      await mesleğiAta(st.id, "Tüccar");
      const s = await stateGetir(st.id);
      s.yas = 30;
      s.saglik = 1;
      // Sağlık kritik eşik olayları (§11 kural 1.5) zorlanıp canı yükseltmesin: zaten görülmüş say.
      s.etiketler.push("saglik_esik_10_gorundu", "saglik_esik_25_gorundu");
      s.para = 0;
      s.ulke.kriz = { tur: "kitlik", bitisYili: s.yil + 10 };
      // Ödenemeyen taksit sayacı 2: yıl-sonu adımı çalışsaydı 3'e çıkıp krediyi silerdi (el koyma).
      s.kredi = {
        anapara: 100,
        kalanBorc: 100,
        faizOrani: 0.12,
        yillikTaksit: 50,
        alindigiYil: s.yil,
        odenmeyenTaksit: 2,
        pazarlikYapildi: false,
      };
      const senaryo = await senaryoUret(st.id);
      const idx = senaryo.secenekler.findIndex((x) => !x.kilitli);
      const sonuc = await secimUygulaVeCoz(st.id, idx >= 0 ? idx : 0);
      if (!sonuc.state.aktif && sonuc.state.olum_nedeni_ceviri?.tr.includes("Kıtlığın")) {
        kitlikOlumu++;
        expect(sonuc.state.kredi).not.toBeNull();
        expect(sonuc.state.kredi?.odenmeyenTaksit).toBe(2);
      }
    }
    expect(kitlikOlumu).toBeGreaterThan(0);
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
      expect(vebaBaslamaliMi(s, 1)).toBe(true); // kontrol: normalde tetiklenir
      etiketEkle(s, ["kacak"]);
      expect(vebaBaslamaliMi(s, 1)).toBe(false);
    } finally {
      rnd.mockRestore();
    }
  });
});
