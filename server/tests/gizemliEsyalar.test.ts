import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { GIZEMLI_ESYA_TAKIP_HAVUZU } from "../src/data/gizemliEsyalar";
import { OLAY_BANKASI } from "../src/data/olaylar";

/** Diğer garantili olaylar (evlilik teklifi, tarihi savaş) devreye girmesin diye zaten "görülmüş"/geçersiz işaretlenir. */
function digerZorunluOlaylariGecistir(state: Awaited<ReturnType<typeof yeniOyun>>) {
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif", "oc_tuccar_yol_ilk_anlasma");
  state.etiketler.push("yol:tuccar:hayirsever");
  state.ulke.savasta = true;
  // Büyük yolculuk garantisi (kural 11) gizemli eşya takip garantisinden önceliklidir
  // (bkz. gameEngine.ts); bu kural sırasında gölgelenmesin diye zaten tamamlanmış sayılır.
  state.etiketler.push("yolculuk_tamamlandi");
}

function baslikGetir(olayId: string): string {
  const olay = OLAY_BANKASI.find((o) => o.id === olayId);
  if (!olay) throw new Error(`${olayId} OLAY_BANKASI'nda yok`);
  return olay.baslik;
}

describe("gizemli eşya sistemi", () => {
  it("GIZEMLI_ESYA_TAKIP_HAVUZU'ndaki her olay id'si OLAY_BANKASI'nda var ve zorlamayla çelişecek ek bir kısıt taşımıyor", () => {
    const tumIdler = Object.values(GIZEMLI_ESYA_TAKIP_HAVUZU).flat();
    expect(tumIdler.length).toBeGreaterThan(0);
    for (const id of tumIdler) {
      const olay = OLAY_BANKASI.find((o) => o.id === id);
      expect(olay, `${id} OLAY_BANKASI'nda bulunamadı`).toBeDefined();
      expect(olay!.minYas, `${id} minYas kısıtı taşımamalı`).toBeUndefined();
      expect(olay!.maxYas, `${id} maxYas kısıtı taşımamalı`).toBeUndefined();
      expect(olay!.minMutluluk, `${id} minMutluluk kısıtı taşımamalı`).toBeUndefined();
      expect(olay!.maxMutluluk, `${id} maxMutluluk kısıtı taşımamalı`).toBeUndefined();
      expect(olay!.meslekler, `${id} meslek kısıtı taşımamalı`).toBeUndefined();
      expect(olay!.gizemli, `${id} gizemli:true işaretli olmalı`).toBe(true);
    }
  });

  it("hiçbir gizemli eşyası olmayan karakter hiçbir eşya takip olayını göremez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    const tumTakipBasliklari = new Set(Object.values(GIZEMLI_ESYA_TAKIP_HAVUZU).flat().map(baslikGetir));
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(tumTakipBasliklari.has(senaryo.olay_basligi)).toBe(false);
    }
  });

  it("bir eşyaya sahip olup 38-46 yaşındayken hiç takip olayı yaşamamış karaktere garanti olay zorlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerZorunluOlaylariGecistir(state);
    state.etiketler.push("esya:fisildayan_tas");
    state.yas = 40;
    const senaryo = await senaryoUret(state.id);
    const beklenenBasliklar = GIZEMLI_ESYA_TAKIP_HAVUZU["fisildayan_tas"].map(baslikGetir);
    expect(beklenenBasliklar).toContain(senaryo.olay_basligi);
  });

  it("takip olaylarından biri zaten görülmüşse garanti tekrar zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kaskadını bu testte atla (2026-09 sonu)
    digerZorunluOlaylariGecistir(state);
    state.etiketler.push("esya:eski_ayna");
    state.gecmis_olaylar.push(GIZEMLI_ESYA_TAKIP_HAVUZU["eski_ayna"][0], GIZEMLI_ESYA_TAKIP_HAVUZU["eski_ayna"][1]);
    state.yas = 40;
    const senaryo = await senaryoUret(state.id);
    const takipBasliklari = GIZEMLI_ESYA_TAKIP_HAVUZU["eski_ayna"].map(baslikGetir);
    expect(takipBasliklari).not.toContain(senaryo.olay_basligi);
  });
});
