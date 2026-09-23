import { describe, it, expect } from "vitest";
import { OLAY_BOLGESEL_ORTACAG } from "../src/data/olaylar/bolgeselOrtaCag";
import { OLAY_BOLGESEL_SANAYI } from "../src/data/olaylar/bolgeselSanayi";
import { OLAY_GENEL } from "../src/data/olaylar/genel";
import { OLAY_ORTACAG_TUCCAR } from "../src/data/olaylar/ortaCagTuccar";
import { OLAY_ILISKILER } from "../src/data/olaylar/iliskiler";
import { OLAY_AILE } from "../src/data/olaylar/aile";
import { OLAY_EVLILIK_AILE } from "../src/data/olaylar/evlilikVeAile";
import { OLAY_KOMIK_GARIP } from "../src/data/olaylar/komikGaripOlaylar";
import { OLAY_KOMIK_OLUM } from "../src/data/olaylar/komikOlumler";
import { yeniOyun, mesleğiAta, senaryoUret, stateGetir } from "../src/game/gameEngine";

/**
 * §38'deki bölgesel olay havuzu (80 olay, 10/bölge) artık §11 kural 15'in
 * ("standalone havuz garantisi") bir üyesi — 2026-09 denetim turu, kullanıcı
 * isteği: "bölgesel olay için tetikleyici ekle yaşa bağlı".
 */
describe("bölgesel olay havuzu — standalone havuz garantisi", () => {
  function digerKaskadlariDevreDisiBirak(state: Awaited<ReturnType<typeof stateGetir>>) {
    state.ulke.savasta = true; // §11 kural 1 (tarihi savaş ilanı)
    state.gecmis_olaylar.push("oc_tuccar_yol_ilk_anlasma"); // §11 kural 2 (kariyer yolu girişi)
    state.gecmis_olaylar.push("iliski_evlilik_teklifi"); // §11 kural 3 (evlilik teklifi garantisi)
    state.gecmis_olaylar.push("evcilhayvan_sahiplenme_teklifi_ortacag"); // §11 kural 5
    state.etiketler.push("yolculuk_tamamlandi"); // §11 kural 11
    state.gecmis_olaylar.push("gizem_ejderha_tilsimi"); // §11 kural 13 (mistik garanti)
    // §11 kural 15'in diğer standalone havuz adayları — hedeflerini önceden
    // karşılanmış say ki bölgesel havuzla "en geride kalan" yarışına girmesinler.
    state.gecmis_olaylar.push(OLAY_ORTACAG_TUCCAR[0].id);
    state.gecmis_olaylar.push(OLAY_GENEL[0].id, OLAY_GENEL[1].id);
    state.gecmis_olaylar.push(OLAY_ILISKILER[0].id);
    state.gecmis_olaylar.push(OLAY_AILE[0].id);
    state.gecmis_olaylar.push(OLAY_EVLILIK_AILE[0].id);
    state.gecmis_olaylar.push(OLAY_KOMIK_GARIP[0].id);
    state.gecmis_olaylar.push(OLAY_KOMIK_OLUM[0].id);
    state.gecmis_olaylar.push("gt_oc01_dilenci"); // §37 gecikmiş takip tetikleyici garantisi
  }

  it("28 yaşına kadar oyuncunun kendi bölgesinden en az 1 bölgesel olay zorlanır", async () => {
    const yeni = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(yeni.id, "Tüccar");
    const state = await stateGetir(yeni.id);
    digerKaskadlariDevreDisiBirak(state);
    state.yas = 28;
    const senaryo = await senaryoUret(yeni.id);
    const kendiBolgesininOlaylari = OLAY_BOLGESEL_ORTACAG.filter((o) => o.bolgeler?.includes("Fransa"));
    const baslikSeti = new Set(kendiBolgesininOlaylari.map((o) => o.baslik));
    expect(baslikSeti.has(senaryo.olay_basligi)).toBe(true);
  });

  it("başka bir bölgenin/çağın olayı ASLA zorlanmaz — yalnız karakterin kendi bölgesi", async () => {
    const yeni = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(yeni.id, "Tüccar");
    const state = await stateGetir(yeni.id);
    digerKaskadlariDevreDisiBirak(state);
    state.yas = 28;
    const senaryo = await senaryoUret(yeni.id);
    const baskaBolgeBaslikSeti = new Set(
      [
        ...OLAY_BOLGESEL_ORTACAG.filter((o) => !o.bolgeler?.includes("Fransa")),
        ...OLAY_BOLGESEL_SANAYI,
      ].map((o) => o.baslik)
    );
    expect(baskaBolgeBaslikSeti.has(senaryo.olay_basligi)).toBe(false);
  });

  // Not: "hedef zaten karşılanmışsa garanti bir daha ZORLAMAZ" iddiası burada
  // uçtan uca test edilmiyor — regional olaylar (sosyalleşme/gecikmiş-takip
  // sonuç olaylarının aksine) normal ağırlıklı havuzdan da tamamen dışlanmış
  // DEĞİL (yalnız kural 15'in ZORLAMASINdan hedefe ulaşınca çıkarlar); yani
  // hedef karşılansa bile normal `olaySec` şansla yine bir bölgesel olay
  // seçebilir — bu kasıtlı/doğru davranış, uçtan uca "asla bir daha çıkmaz"
  // testi bu yüzden doğası gereği kararsız (flaky) olurdu. `standaloneHavuzDurumu`
  // (gameEngine.ts, dışa aktarılmıyor) hedef karşılanınca null döndüğü için
  // kaskad ZORLAMASI kesilir — bu, üstteki "en az 1 zorlanır" testiyle zaten
  // dolaylı doğrulanıyor (hedef=1'e daha ulaşılmamışken zorlanıyor).

  it("her bölgesel olayda bolgeler alanı tam olarak tek bir bölgeyi taşır (havuz kesişimsiz)", () => {
    for (const o of [...OLAY_BOLGESEL_ORTACAG, ...OLAY_BOLGESEL_SANAYI]) {
      expect(o.bolgeler?.length).toBe(1);
    }
  });
});
