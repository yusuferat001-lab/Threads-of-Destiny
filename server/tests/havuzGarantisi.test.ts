import { describe, it, expect } from "vitest";
import { etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { temelUygunMu } from "../src/game/olaySecici";
import { OLAY_GENEL } from "../src/data/olaylar/genel";
import { OLAY_ORTACAG_TUCCAR } from "../src/data/olaylar/ortaCagTuccar";
import { OLAY_ILISKILER } from "../src/data/olaylar/iliskiler";
import { OLAY_AILE } from "../src/data/olaylar/aile";
import { OLAY_EVLILIK_AILE } from "../src/data/olaylar/evlilikVeAile";
import { OLAY_KOMIK_GARIP } from "../src/data/olaylar/komikGaripOlaylar";
import { OLAY_KOMIK_OLUM } from "../src/data/olaylar/komikOlumler";
import { OlayTanimi } from "../src/data/olaylar";

/**
 * Standalone havuz garantisi (§11 yeni kural, 2026-09) — kullanıcı isteği:
 * "belli yaşlarda yaşanmamışsa tetikleyelim ki bir hayatta belli sayıda
 * kesinlikle görsünler". Diğer kaskad kurallarıyla (saray/yolculuk/hizip)
 * aynı black-box desende test edilir: `senaryoUret`in döndürdüğü
 * `olay_basligi`, adayın havuzundaki bir başlıkla eşleşiyor mu diye bakılır.
 */

function baslikSetiOlustur(havuz: OlayTanimi[]): Set<string> {
  return new Set(havuz.map((o) => o.baslik));
}

const GENEL_BASLIKLAR = baslikSetiOlustur(OLAY_GENEL);
const ORTACAG_TUCCAR_BASLIKLAR = baslikSetiOlustur(OLAY_ORTACAG_TUCCAR);

function havuzTumIdler(havuz: OlayTanimi[]): string[] {
  return havuz.map((o) => o.id);
}

/**
 * Önceki tüm "ömürde bir kez" kaskad kurallarını (tarihi savaş ilanı / kariyer
 * yolu girişi / evlilik teklifi garantisi / evcil hayvan teklifi / büyük
 * yolculuk) devre dışı bırakan ortak bir hazırlık — standalone havuz
 * garantisinin izole test edilebilmesi için (bkz. saray.test.ts/
 * yolculuk.test.ts'teki aynı desen).
 */
async function izoleKarakterOlustur(meslek: "Tüccar" | "Asker" | "Din Adamı") {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);
  state.ulke.savasta = true; // tarihi savaş ilanı kuralını atla
  const yolOnEki = meslek === "Tüccar" ? "yol:tuccar:" : meslek === "Asker" ? "yol:asker:" : "yol:din:";
  etiketEkle(state, [`${yolOnEki}__test_dal__`]); // kariyer yolu girişini atla (YOL_TAKIP_KONTROL_NOKTALARI'nde olmayan uydurma bir dal)
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif"); // evlilik teklifi garantisini atla
  state.evcil_hayvan = { tur: "Kedi", isim: "Test" }; // evcil hayvan sahiplenme teklifini atla
  etiketEkle(state, ["yolculuk_tamamlandi"]); // büyük yolculuk garantisini atla (§11 kural 11)
  state.gecmis_olaylar.push("gizem_ejderha_tilsimi"); // mistik garantiyi (§11 kural 13, 25-45 yaş) atla
  return state;
}

describe("standalone havuz garantisi", () => {
  it("genel.ts havuzundan hiç olay görülmemişse 20 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.yas = 20; // ilk kontrol noktası (GENEL_HAVUZ_KONTROL_NOKTALARI[0])
    const senaryo = await senaryoUret(state.id);
    expect(GENEL_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("meslek-standalone havuzdan (Orta Çağ Tüccar) hiç olay görülmemişse 25 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // Kaskadda meslek-standalone havuz genel.ts'ten ÖNCE kontrol edilir, bu
    // yüzden ekstra bir hazırlığa gerek yok — genel.ts'in hedefi bu yaşta
    // henüz karşılanmamış olsa bile meslek havuzu kuralı önce sıraya girer.
    state.yas = 25; // meslek-standalone ilk kontrol noktası
    const senaryo = await senaryoUret(state.id);
    expect(ORTACAG_TUCCAR_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("hedef zaten karşılanmışsa aynı havuzdan fazladan zorlama yapılmaz (çökme yok, geçerli bir senaryo döner)", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // 90 yaşındaki en yüksek hedefi (24) fazlasıyla aşacak kadar genel.ts id'si "görülmüş" say.
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_GENEL));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_ORTACAG_TUCCAR));
    state.yas = 90;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBeTruthy();
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
  });

  it("zorlanan olay her zaman kendi koşullarını (temelUygunMu) gerçekten sağlar — karakterin gerçek durumuyla çelişen bir olay asla zorlanmaz", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.yas = 75; // tüm havuzların en yüksek kontrol noktası
    // genel/meslek/iliskiler/aile/komikGarip/komikOlum havuzlarını doyur —
    // yalnızca evlilikVeAile (karakter hiç evlenmedi) hedefin altında kalsın.
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_GENEL));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_ORTACAG_TUCCAR));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_ILISKILER));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_AILE));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_KOMIK_GARIP));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_KOMIK_OLUM));
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBeTruthy();
    const zorlananOlay = OLAY_EVLILIK_AILE.find((o) => o.baslik === senaryo.olay_basligi);
    // evlilikVeAile'den bir şey zorlandıysa (beklenen durum — evli olmayan
    // karakter için birçok "evlilik-sonrası" olay temelUygunMu'dan geçemez,
    // ama giriş varyantları geçer), o olay kesinlikle karakterin gerçek
    // durumuyla (evli değil) uyumlu olmalı.
    if (zorlananOlay) {
      expect(temelUygunMu(zorlananOlay, state)).toBe(true);
    }
  });
});
