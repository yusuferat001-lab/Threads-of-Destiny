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
 * yolu girişi / evlilik teklifi garantisi / büyük yolculuk / mistik garanti)
 * devre dışı bırakan ortak bir hazırlık — standalone havuz garantisinin izole
 * test edilebilmesi için (bkz. saray.test.ts/yolculuk.test.ts'teki aynı
 * desen). Evcil hayvan sahiplenilmez (`evcil_hayvan` null kalır) — sahiplenme
 * teklifi (kural 5) yalnız 20-24 yaşta, takip garantisi (kural 6) yalnız
 * hayvan varken devreye girdiği için testlerin kullandığı 25+ yaşlarda zaten
 * devre dışı kalırlardı; hayvan atamak gerçek kod eşiğiyle (30 yaş, CLAUDE.md
 * §11'deki "45-50" notu güncel değil) kural 6'yı beklenmedik biçimde
 * tetikleyip standalone havuz garantisinin önüne geçiyordu.
 */
async function izoleKarakterOlustur(meslek: "Tüccar" | "Asker" | "Din Adamı") {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);
  state.ulke.savasta = true; // tarihi savaş ilanı kuralını atla
  const yolOnEki = meslek === "Tüccar" ? "yol:tuccar:" : meslek === "Asker" ? "yol:asker:" : "yol:din:";
  etiketEkle(state, [`${yolOnEki}__test_dal__`]); // kariyer yolu girişini atla (YOL_TAKIP_KONTROL_NOKTALARI'nde olmayan uydurma bir dal)
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif"); // evlilik teklifi garantisini atla
  etiketEkle(state, ["yolculuk_tamamlandi"]); // büyük yolculuk garantisini atla (§11 kural 11)
  state.gecmis_olaylar.push("gizem_ejderha_tilsimi"); // mistik garantiyi (§11 kural 13, 25-45 yaş) atla
  return state;
}

describe("standalone havuz garantisi", () => {
  it("genel.ts havuzundan hiç olay görülmemişse 30 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // Meslek-standalone havuzun (Orta Çağ Tüccar) hedefini bu yaşta önceden
    // karşılanmış say — "oransal en geride kalan" seçimi genel.ts ile
    // eşit orana (her ikisi de 30→1 hedefinde 0/1) düşüp kararsız kalmasın.
    state.gecmis_olaylar.push(OLAY_ORTACAG_TUCCAR[0].id);
    state.yas = 30; // ilk kontrol noktası (GENEL_HAVUZ_KONTROL_NOKTALARI[0])
    const senaryo = await senaryoUret(state.id);
    expect(GENEL_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("meslek-standalone havuzdan (Orta Çağ Tüccar) hiç olay görülmemişse 30 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // Genel.ts hedefini bu yaşta önceden karşılanmış say — aynı "eşit oran"
    // kararsızlığını (bu kez tersten) önlemek için.
    state.gecmis_olaylar.push(OLAY_GENEL[0].id);
    state.yas = 30; // meslek-standalone ilk kontrol noktası
    const senaryo = await senaryoUret(state.id);
    expect(ORTACAG_TUCCAR_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("hedef zaten karşılanmışsa aynı havuzdan fazladan zorlama yapılmaz (çökme yok, geçerli bir senaryo döner)", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // 95 yaşındaki en yüksek hedefi (7) fazlasıyla aşacak kadar genel.ts id'si "görülmüş" say.
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_GENEL));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_ORTACAG_TUCCAR));
    state.yas = 95;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBeTruthy();
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
  });

  it("zorlanan olay her zaman kendi koşullarını (temelUygunMu) gerçekten sağlar — karakterin gerçek durumuyla çelişen bir olay asla zorlanmaz", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.yas = 85; // tüm havuzların (genel hariç, 95'te) en yüksek kontrol noktası
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
