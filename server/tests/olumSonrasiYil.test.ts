import { describe, it, expect } from "vitest";
import { createCharacter, checkDeath } from "../src/game/stateManager";
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
