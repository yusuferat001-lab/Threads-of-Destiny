import { describe, it, expect } from "vitest";
import { etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";
import { OLAY_SAGLIK_ESIK_25, OLAY_SAGLIK_ESIK_10 } from "../src/data/olaylar/saglikKritik";

/**
 * Sağlık kritik eşikleri (§11 kural 1.5, 2026-09 sonu) — bir hayatta İLK KEZ
 * sağlık 25'in altına düşünce OLAY_SAGLIK_ESIK_25'ten, İLK KEZ 10'un altına
 * düşünce OLAY_SAGLIK_ESIK_10'dan rastgele bir olay zorlanır, her eşik hayat
 * boyu yalnızca bir kez. Diğer kaskad testleriyle (havuzGarantisi.test.ts)
 * aynı desende: `senaryoUret`in döndürdüğü `olay_basligi` beklenen havuzun
 * başlıklarından biri mi diye bakılır.
 */

function baslikSetiOlustur(havuz: typeof OLAY_SAGLIK_ESIK_25) {
  return new Set(havuz.map((o) => o.baslik));
}

const ESIK_25_BASLIKLAR = baslikSetiOlustur(OLAY_SAGLIK_ESIK_25);
const ESIK_10_BASLIKLAR = baslikSetiOlustur(OLAY_SAGLIK_ESIK_10);

/** Diğer tüm "ömürde bir kez" kaskad kurallarını atlayan izole karakter (havuzGarantisi.test.ts ile aynı desen). */
async function izoleKarakterOlustur() {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  state.ulke.savasta = true;
  etiketEkle(state, ["yol:tuccar:__test_dal__", "hizip_secildi"]);
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif");
  state.etiketler.push("tanisma_donum_25", "tanisma_donum_40"); // aşk evliliği tanışma fırsatı zorlanmasın
  etiketEkle(state, ["yolculuk_tamamlandi"]);
  state.gecmis_olaylar.push("gizem_ejderha_tilsimi");
  state.yas = 40;
  return state;
}

describe("sağlık kritik eşikleri", () => {
  it("sağlık ilk kez 25'in altına inince OLAY_SAGLIK_ESIK_25'ten bir olay zorlanır", async () => {
    const state = await izoleKarakterOlustur();
    state.saglik = 20;
    const senaryo = await senaryoUret(state.id);
    expect(ESIK_25_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
    expect(state.etiketler).toContain("saglik_esik_25_gorundu");
  });

  it("aynı eşik ikinci kez tetiklenmez", async () => {
    const state = await izoleKarakterOlustur();
    state.saglik = 20;
    const ilk = await senaryoUret(state.id);
    expect(ESIK_25_BASLIKLAR.has(ilk.olay_basligi)).toBe(true);
    // İlk olayı çöz (bedava/riskli 2. seçenek, her zaman kilitsiz) — mevcutOlay
    // temizlenir, "saglik_esik_25_gorundu" etiketi kalıcı olarak durur.
    await secimUygula(state.id, 1);
    expect(state.aktif).toBe(true); // esik25 havuzunda ölüm riski yok
    state.saglik = 15; // eşiği tekrar aşındır
    const ikinci = await senaryoUret(state.id);
    expect(ESIK_25_BASLIKLAR.has(ikinci.olay_basligi)).toBe(false);
  });

  it("sağlık ilk kez 10'un altına inince OLAY_SAGLIK_ESIK_10'dan bir olay zorlanır (25-eşiğinden önce)", async () => {
    const state = await izoleKarakterOlustur();
    state.saglik = 5;
    const senaryo = await senaryoUret(state.id);
    expect(ESIK_10_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
    expect(state.etiketler).toContain("saglik_esik_10_gorundu");
    expect(state.etiketler).not.toContain("saglik_esik_25_gorundu");
  });

  it("her iki havuz da tam 15 olay içerir ve saglikEsikOlayi ile normal havuzdan dışlanır", () => {
    expect(OLAY_SAGLIK_ESIK_25).toHaveLength(15);
    expect(OLAY_SAGLIK_ESIK_10).toHaveLength(15);
    for (const o of OLAY_SAGLIK_ESIK_25) expect(o.saglikEsikOlayi).toBe("esik25");
    for (const o of OLAY_SAGLIK_ESIK_10) expect(o.saglikEsikOlayi).toBe("esik10");
  });

  it("başarılı dallarda sağlık kazancı 14'ü geçmez", () => {
    for (const olay of [...OLAY_SAGLIK_ESIK_25, ...OLAY_SAGLIK_ESIK_10]) {
      for (const secenek of olay.secenekler) {
        expect(secenek.basariliSonuc.saglik ?? 0).toBeLessThanOrEqual(14);
        expect(secenek.basarisizSonuc.saglik ?? 0).toBeLessThanOrEqual(14);
      }
    }
  });
});
