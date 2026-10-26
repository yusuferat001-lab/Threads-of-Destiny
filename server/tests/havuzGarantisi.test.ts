import { describe, it, expect } from "vitest";
import { etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret, mulkSatinAl } from "../src/game/gameEngine";
import { temelUygunMu } from "../src/game/olaySecici";
import { OLAY_GENEL } from "../src/data/olaylar/genel";
import { OLAY_ORTACAG_TUCCAR } from "../src/data/olaylar/ortaCagTuccar";
import { OLAY_ILISKILER } from "../src/data/olaylar/iliskiler";
import { OLAY_AILE } from "../src/data/olaylar/aile";
import { OLAY_EVLILIK_AILE } from "../src/data/olaylar/evlilikVeAile";
import { OLAY_KOMIK_GARIP } from "../src/data/olaylar/komikGaripOlaylar";
import { OLAY_KOMIK_OLUM } from "../src/data/olaylar/komikOlumler";
import { OLAY_MULK } from "../src/data/olaylar/mulkOlaylari";
import { OLAY_OTORITE } from "../src/data/olaylar/otoriteOlaylari";
import { OLAY_VERGI } from "../src/data/olaylar/vergiOlaylari";
import { OLAY_MESLEK_YATKINLIK } from "../src/data/olaylar/meslekYatkinlikOlaylari";
import { OLAY_GECIKMIS_TAKIP } from "../src/data/olaylar/gecikmisTakip";
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
 * desen). Evcil hayvan karşılaşma garantisi (29/38 yaş, kural 5) bu testlerin
 * 30 yaşındaki kontrol noktasının önüne geçmesin diye karşılaşma sayacı
 * tavana (2) çekilir; hayvan hiç edinilmez.
 */
async function izoleKarakterOlustur(meslek: "Tüccar" | "Asker" | "Din Adamı") {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);
  state.ulke.savasta = true; // tarihi savaş ilanı kuralını atla
  const yolOnEki = meslek === "Tüccar" ? "yol:tuccar:" : meslek === "Asker" ? "yol:asker:" : "yol:din:";
  etiketEkle(state, [`${yolOnEki}__test_dal__`]); // kariyer yolu girişini atla (YOL_TAKIP_KONTROL_NOKTALARI'nde olmayan uydurma bir dal)
  etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kuralını atla (2026-09 sonu)
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif"); // evlilik teklifi garantisini atla
  state.etiketler.push("tanisma_donum_25", "tanisma_donum_40"); // aşk evliliği tanışma fırsatı zorlanmasın
  etiketEkle(state, ["yolculuk_tamamlandi"]); // büyük yolculuk garantisini atla (§11 kural 11)
  state.gecmis_olaylar.push("gizem_ejderha_tilsimi"); // mistik garantiyi (§11 kural 13, 25-45 yaş) atla
  state.hayvan_karsilasma_sayisi = 2; // evcil hayvan karşılaşma garantisini (kural 5, 29/38 yaş) atla
  return state;
}

/** Aynı yaşta (≈30) hedefi dolan diğer standalone havuzları doyurur ki "oransal en geride kalan" seçimi test edilen havuzla yarışmasın. */
function digerleriniDoyur(state: Awaited<ReturnType<typeof izoleKarakterOlustur>>, haric: "genel" | "meslek") {
  if (haric !== "meslek") state.gecmis_olaylar.push(OLAY_ORTACAG_TUCCAR[0].id);
  if (haric !== "genel") state.gecmis_olaylar.push(OLAY_GENEL[0].id);
  state.gecmis_olaylar.push(
    OLAY_ILISKILER[0].id,
    OLAY_KOMIK_GARIP[0].id,
    OLAY_OTORITE[0].id,
    ...OLAY_MESLEK_YATKINLIK.map((o) => o.id),
    ...OLAY_GECIKMIS_TAKIP.filter((o) => o.gecikmisTakipOlayi).slice(0, 2).map((o) => o.id)
  );
}

describe("standalone havuz garantisi", () => {
  it("genel.ts havuzundan hiç olay görülmemişse 30 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // Meslek-standalone havuzun (Orta Çağ Tüccar) hedefini bu yaşta önceden
    // karşılanmış say — "oransal en geride kalan" seçimi genel.ts ile
    // eşit orana (her ikisi de 30→1 hedefinde 0/1) düşüp kararsız kalmasın.
    digerleriniDoyur(state, "genel");
    state.yas = 30; // ilk kontrol noktası (GENEL_HAVUZ_KONTROL_NOKTALARI[0] = 30)
    const senaryo = await senaryoUret(state.id);
    expect(GENEL_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("meslek-standalone havuzdan (Orta Çağ Tüccar) hiç olay görülmemişse 30 yaşında biri zorla tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // Genel.ts hedefini bu yaşta önceden karşılanmış say — aynı "eşit oran"
    // kararsızlığını (bu kez tersten) önlemek için.
    digerleriniDoyur(state, "meslek");
    state.yas = 30; // meslek-standalone ilk kontrol noktası (28)
    const senaryo = await senaryoUret(state.id);
    expect(ORTACAG_TUCCAR_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("hedef zaten karşılanmışsa aynı havuzdan fazladan zorlama yapılmaz (çökme yok, geçerli bir senaryo döner)", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    // En yüksek kontrol noktasındaki (92 yaş, hedef 12) hedefi fazlasıyla aşacak kadar genel.ts id'si "görülmüş" say.
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_GENEL));
    state.gecmis_olaylar.push(...havuzTumIdler(OLAY_ORTACAG_TUCCAR));
    state.yas = 95;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBeTruthy();
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
  });

  it("zorlanan olay her zaman kendi koşullarını (temelUygunMu) gerçekten sağlar — karakterin gerçek durumuyla çelişen bir olay asla zorlanmaz", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.yas = 85; // tüm havuzların (genel hariç, 92'de) en yüksek kontrol noktasının (meslek-standalone, 81) üstünde
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

/**
 * Mülk olayı garantisi (§11 kural 14, 2026-09 — kullanıcı isteği: "mülk olayını
 * da tetikli hale getir satın aldıktan sonra 5 yıl sonra 15 yıl içinde gibi").
 * Eski fırsatçı %12 şans yerine, satın alma yılından (`mulk_alis_yili`) 5-15 yıl
 * sonrası arasında o türe ait hiç görülmemiş bir olay varsa kesin tetiklenir.
 */
describe("mülk olayı (satın alımdan 5-8 yıl sonra, tek seferlik)", () => {
  const CIFTLIK_BASLIKLAR = baslikSetiOlustur(OLAY_MULK.filter((o) => o.mulkOlayi === "ciftlik"));

  it("pencere henüz açılmadıysa (satın alımdan <5 yıl) zorlanmaz", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.para = 1000;
    await mulkSatinAl(state.id, "ciftlik");
    state.yil += 3;
    state.yas = 30;
    const senaryo = await senaryoUret(state.id);
    expect(CIFTLIK_BASLIKLAR.has(senaryo.olay_basligi)).toBe(false);
  });

  it("pencere içindeyken (satın alımdan 5-8 yıl) hiç görülmemiş bir mülk olayı kesin tetiklenir", async () => {
    const state = await izoleKarakterOlustur("Tüccar");
    state.para = 1000;
    await mulkSatinAl(state.id, "ciftlik");
    state.yil += 6;
    state.yas = 30;
    const senaryo = await senaryoUret(state.id);
    expect(CIFTLIK_BASLIKLAR.has(senaryo.olay_basligi)).toBe(true);
  });

  it("pencere kapandıysa (satın alımdan >8 yıl) ya da o türden olay zaten görüldüyse mülk olayı çıkmaz", async () => {
    const kapandi = await izoleKarakterOlustur("Tüccar");
    kapandi.para = 1000;
    await mulkSatinAl(kapandi.id, "ciftlik");
    kapandi.yil += 12; // pencere kapandı
    kapandi.yas = 30;
    expect(CIFTLIK_BASLIKLAR.has((await senaryoUret(kapandi.id)).olay_basligi)).toBe(false);

    const gorulmus = await izoleKarakterOlustur("Tüccar");
    gorulmus.para = 1000;
    await mulkSatinAl(gorulmus.id, "ciftlik");
    gorulmus.gecmis_olaylar.push(OLAY_MULK.find((o) => o.mulkOlayi === "ciftlik")!.id);
    gorulmus.yil += 6;
    gorulmus.yas = 30;
    expect(CIFTLIK_BASLIKLAR.has((await senaryoUret(gorulmus.id)).olay_basligi)).toBe(false);
  });
});
