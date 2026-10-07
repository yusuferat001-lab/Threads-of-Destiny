import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, checkDeath, durumlariUygula, ilerletYas } from "../src/game/stateManager";
import { skorKaydet } from "../src/db/scoreRepository";
import { ikiDilT } from "../src/i18n";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";

// Ölüm nedeni iki dilde saklanır: liderlik tablosu hangi dilde açılırsa o dilde
// göstersin (eskiden oyuncunun o anki dilinde tek metin yazılıyor, tablo karışık görünüyordu).
describe("iki dilli ölüm nedeni", () => {
  it("checkDeath iki dilli nedeni oyuncunun diline göre seçer ve ikisini de saklar", () => {
    const tr = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "tr");
    checkDeath(tr, true, ikiDilT("Kıtlığın getirdiği yoksunlukla tükendi."));
    expect(tr.olum_nedeni).toBe("Kıtlığın getirdiği yoksunlukla tükendi.");
    expect(tr.olum_nedeni_ceviri?.en).not.toBe(tr.olum_nedeni_ceviri?.tr);

    const en = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "en");
    checkDeath(en, true, ikiDilT("Kıtlığın getirdiği yoksunlukla tükendi."));
    expect(en.olum_nedeni).toBe(en.olum_nedeni_ceviri?.en);
    expect(en.olum_nedeni_ceviri?.tr).toBe("Kıtlığın getirdiği yoksunlukla tükendi.");
  });

  it("nedensiz sağlık ölümü ve 100 yaş ölümü de iki dilli", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "en");
    s.saglik = 0;
    checkDeath(s, false);
    expect(s.olum_nedeni_ceviri?.tr).toBe("Sağlık kaybı");

    const y = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "en");
    y.yas = 99;
    ilerletYas(y, 1, 1);
    expect(y.aktif).toBe(false);
    expect(y.olum_nedeni_ceviri?.tr).toContain("Yüz yaşını doldurdun");
    expect(y.olum_nedeni).toBe(y.olum_nedeni_ceviri?.en);
  });

  it("ölümcül durum adı her dilde kendi katalog adıyla yazılır", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "en");
    mesleğiSec(s, "Asker");
    s.saglik = 1;
    s.durumlar.push({ id: "x", ad: "Kronik Eklem Ağrısı", tur: "kalici", tur_basi_saglik: -5 });
    const neden = durumlariUygula(s);
    expect(neden?.tr).toContain("Kronik Eklem Ağrısı");
    expect(neden?.en).toContain("Chronic Joint Pain");
  });

  it("skor kaydı Türkçe ve İngilizce nedeni ayrı sütunlara yazar", async () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba", undefined, "en");
    mesleğiSec(s, "Tüccar");
    checkDeath(s, true, ikiDilT("Zar masasındaki bıçaklı bir kavgada öldü."));
    const kayit = (await skorKaydet(s, "Test")) as any;
    expect(kayit.olum_nedeni).toBe("Zar masasındaki bıçaklı bir kavgada öldü.");
    expect(kayit.olum_nedeni_en).toBe(s.olum_nedeni_ceviri?.en);
  });

  it("olay seçimiyle gelen ölümde öbür dil ham olaydan üretilir", async () => {
    // Ölene kadar oyna; ilk olay kaynaklı ölümde çeviri çifti tutarlı olmalı.
    for (let deneme = 0; deneme < 30; deneme++) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba", undefined, "en");
      await mesleğiAta(state.id, "Asker");
      for (let tur = 0; tur < 80; tur++) {
        const senaryo = await senaryoUret(state.id);
        const idx = senaryo.secenekler.findIndex((x) => !x.kilitli);
        const sonuc: any = await secimUygula(state.id, Math.max(0, idx));
        if (sonuc.ara_tepki) await secimUygula(state.id, 1);
        const st = sonuc.state ?? state;
        if (st.aktif === false) {
          expect(st.olum_nedeni_ceviri).toBeTruthy();
          expect(st.olum_nedeni).toBe(st.olum_nedeni_ceviri.en);
          expect(st.olum_nedeni_ceviri.tr.length).toBeGreaterThan(0);
          return;
        }
      }
    }
    throw new Error("Hiçbir denemede ölüm gerçekleşmedi");
  }, 60000);
});
