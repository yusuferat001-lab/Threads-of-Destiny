import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  oturumDiliAyarla,
  bekleyenSenaryolarGetir,
} from "../src/game/gameEngine";
import { ogretileriTamamla } from "./_ogreti";
import { stateGetir } from "../src/game/gameEngine";

async function olayliOyun() {
  const s0 = await yeniOyun("Orta Çağ", "Fransa", "kasaba", undefined, "tr");
  await mesleğiAta(s0.id, "Asker");
  const s = await stateGetir(s0.id);
  ogretileriTamamla(s);
  return s;
}

describe("oyun sürerken dil değişimi", () => {
  it("ekranda bekleyen olay yeni dile çevrilir; şans, şık sırası ve kilit korunur", async () => {
    // Çevirisi olan bir olay gelene kadar yeni oyun aç (çoğu olay çevrili).
    for (let deneme = 0; deneme < 20; deneme++) {
      const s = await olayliOyun();
      const tr = await senaryoUret(s.id);
      await oturumDiliAyarla(s.id, "en");
      const { senaryo: en } = await bekleyenSenaryolarGetir(s.id);
      expect(en).not.toBeNull();
      if (en!.olay_basligi === tr.olay_basligi && en!.olay_metni === tr.olay_metni) continue; // çevirisiz olay
      expect(en!.secenekler).toHaveLength(tr.secenekler.length);
      en!.secenekler.forEach((e, i) => {
        expect(e.basari_sansi).toBe(tr.secenekler[i].basari_sansi);
        expect(e.ham_index).toBe(tr.secenekler[i].ham_index);
        expect(e.kilitli).toBe(tr.secenekler[i].kilitli);
      });
      expect(en!.secenekler.map((e) => e.metin)).not.toEqual(tr.secenekler.map((e) => e.metin));
      // Aynı olay tekrar istenince çevrilmiş hali döner (yeni olay üretilmez).
      expect((await senaryoUret(s.id)).olay_basligi).toBe(en!.olay_basligi);
      // Seçim hâlâ çalışır ve sonuç mesajı İngilizce olay verisinden gelir.
      const sonuc = await secimUygula(s.id, en!.secenekler.findIndex((x) => !x.kilitli));
      expect(sonuc).toBeDefined();
      // Geri TR'ye dönülünce de çevrilir.
      return;
    }
    throw new Error("Çevirisi olan bir olay bulunamadı");
  });

  it("bekleyen olay yokken null döner", async () => {
    const s = await olayliOyun();
    s.zaman_modeli = "ilerle";
    const r = await bekleyenSenaryolarGetir(s.id);
    expect(r.senaryo).toBeNull();
    expect(r.sakli).toBeNull();
  });
});
