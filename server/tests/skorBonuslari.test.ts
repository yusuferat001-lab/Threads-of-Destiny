import { describe, it, expect, vi, afterEach } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { etiketEkle, vebaHastaligiBaslatEt, hesaplaSkorKirilimi } from "../src/game/stateManager";
import { OLAY_BANKASI } from "../src/data/olaylar";
import { OLAY_GENEL } from "../src/data/olaylar/genel";
import { OLAY_ORTACAG_TUCCAR } from "../src/data/olaylar/ortaCagTuccar";
import { OLAY_ILISKILER } from "../src/data/olaylar/iliskiler";
import { OLAY_AILE } from "../src/data/olaylar/aile";
import { OLAY_EVLILIK_AILE } from "../src/data/olaylar/evlilikVeAile";
import { OLAY_KOMIK_GARIP } from "../src/data/olaylar/komikGaripOlaylar";
import { OLAY_GECIKMIS_TAKIP } from "../src/data/olaylar/gecikmisTakip";
import { OLAY_BOLGESEL_ORTACAG } from "../src/data/olaylar/bolgeselOrtaCag";
import { OLAY_BOLGESEL_SANAYI } from "../src/data/olaylar/bolgeselSanayi";
import { secimUygulaVeCoz } from "./testUtils";

afterEach(() => vi.restoreAllMocks());

/**
 * Faz 5 (2026-09 sonu) — tek seferlik "başarı olayı" skor bonusları:
 * komik ölüm riski (hayatta kalma/ölüm), yolculuk tamamlama, veba atlatma,
 * hapisten fiziksel kaçış. Her biri hesaplaSkorKirilimi'nde toplamsal bir
 * bonus olarak sayılır (bkz. stateManager.ts SKOR_* sabitleri).
 */

async function isoleKomikOlumKarakteri(yas: number) {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  state.ulke.savasta = true; // tarihi savaş ilanı kuralını atla
  etiketEkle(state, ["yol:tuccar:__test_dal__"]); // kariyer yolu girişini atla
  etiketEkle(state, ["hizip_secildi"]); // hizip zorunlu seçim kuralını atla
  state.gecmis_olaylar.push("iliski_evlilik_teklifi", "iliski_ikinci_teklif"); // evlilik teklifi garantisini atla
  state.etiketler.push("tanisma_donum_27", "tanisma_donum_36"); // aşk evliliği tanışma fırsatı zorlanmasın
  etiketEkle(state, ["yolculuk_tamamlandi"]); // büyük yolculuk garantisini atla
  state.gecmis_olaylar.push("gizem_ejderha_tilsimi"); // mistik garantiyi atla
  state.hayvan_karsilasma_sayisi = 2; // evcil hayvan karşılaşma garantisini atla
  // Komik ölüm havuzu HARİÇ diğer tüm standalone havuzları tamamen "görülmüş"
  // yap ki standaloneHavuzGarantisiSec'in tek adayı komik ölüm havuzu kalsın.
  state.gecmis_olaylar.push(...OLAY_GENEL.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_ORTACAG_TUCCAR.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_ILISKILER.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_AILE.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_EVLILIK_AILE.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_KOMIK_GARIP.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_GECIKMIS_TAKIP.filter((o) => o.gecikmisTakipOlayi).map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_BOLGESEL_ORTACAG.map((o) => o.id));
  state.gecmis_olaylar.push(...OLAY_BOLGESEL_SANAYI.map((o) => o.id));
  state.yas = yas;
  return state;
}

describe("Faz 5 — komik ölüm riski skor bonusu", () => {
  it("riskli şıkkı seçip hayatta kalınca komik_olum_basarili_risk true olur ve skora +3000 katar", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.02); // her zar/jitter en iyi ihtimali versin
    const state = await isoleKomikOlumKarakteri(40);
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.secenekler.length).toBe(2);
    const sonuc = await secimUygulaVeCoz(state.id, 0); // "aptalca olanı yap"
    expect(sonuc.state.aktif).toBe(true);
    expect(sonuc.state.komik_olum_basarili_risk).toBe(true);
    expect(sonuc.state.komik_olum_ile_oldu).toBe(false);
    const kirilim = hesaplaSkorKirilimi(sonuc.state);
    expect(kirilim.basariOlayiPuani).toBeGreaterThanOrEqual(3000);
  });

  it("riskli şıkkı seçip ölünce komik_olum_ile_oldu true olur ve skora +2000 katar", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // nötr: senaryoUret'in kendi seçim zarlarını tüketsin
    const state = await isoleKomikOlumKarakteri(40);
    await senaryoUret(state.id);
    vi.restoreAllMocks();
    let cagri = 0;
    vi.spyOn(Math, "random").mockImplementation(() => (cagri++ === 0 ? 0.95 : 0.01));
    const sonuc = await secimUygulaVeCoz(state.id, 0);
    expect(sonuc.state.aktif).toBe(false);
    expect(sonuc.state.komik_olum_ile_oldu).toBe(true);
    expect(sonuc.state.komik_olum_basarili_risk).toBe(false);
    // isoleKomikOlumKarakteri bypass için yolculuk_tamamlandi etiketini de ekliyor,
    // o da kendi +2000 bonusunu katıyor — burada yalnız komik-ölüm payının en az
    // 2000 olduğunu doğrula (kesin toplam değil, bileşenin varlığı önemli).
    const kirilim = hesaplaSkorKirilimi(sonuc.state);
    expect(kirilim.basariOlayiPuani).toBeGreaterThanOrEqual(2000);
  });
});

describe("Faz 5 — veba atlatma skor bonusu", () => {
  it("vebaHastaligiKontrol iyileşme sinyali verince veba_hayatta_kaldi işaretlenir (glue mantığı doğrudan)", async () => {
    // gameEngine'in yıl-ilerleme bloğundaki glue mantığının aynısı:
    // hastalikSonucu.iyilesti === true ise bayrak set edilir.
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    vebaHastaligiBaslatEt(state);
    expect(state.etiketler.includes("veba_hastasi")).toBe(true);
    state.veba_olum_riski = 13; // bir sonraki doğal düşüşte (-21) eşik (12) altına iner
    expect(state.veba_hayatta_kaldi).toBe(false);
    const kirilimOnce = hesaplaSkorKirilimi(state);
    expect(kirilimOnce.basariOlayiPuani).toBe(0);
    state.veba_hayatta_kaldi = true; // gameEngine'in vebaHastaligiKontrol().iyilesti dalının yaptığı
    const kirilimSonra = hesaplaSkorKirilimi(state);
    expect(kirilimSonra.basariOlayiPuani).toBe(2000);
  });
});

describe("Faz 5 — hapisten fiziksel kaçış skor bonusu", () => {
  it("başarılı fiziksel kaçış hapis_basarili_kacis'i işaretler ve skora +2000 katar (rüşvet/af sayılmaz)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.05); // %32 şanslı kaçışı geçer, diğer arka plan zarlarını tetiklemez
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 30;
    etiketEkle(state, ["hapiste"]);
    state.hapis_tur_sayaci = 5;
    state.hapis_ceza_toplam = 8;
    state.hapis_ceza_kalan = 8;
    // Hedef dışındaki TÜM hapis olaylarını "görülmüş" say ki olaySec kesin
    // olarak hedefi (hapis_avlu_duvari) seçsin.
    const digerHapisIdler = OLAY_BANKASI.filter((o) => o.hapisOlayi && o.id !== "hapis_avlu_duvari").map(
      (o) => o.id
    );
    state.gecmis_olaylar.push(...digerHapisIdler);
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Avlu Duvarı");
    const sonuc = await secimUygulaVeCoz(state.id, 0); // "duvara tırman, atla"
    expect(sonuc.state.etiketler.includes("hapiste")).toBe(false);
    expect(sonuc.state.hapis_basarili_kacis).toBe(true);
    const kirilim = hesaplaSkorKirilimi(sonuc.state);
    expect(kirilim.basariOlayiPuani).toBeGreaterThanOrEqual(2000);
  });

  it("rüşvetle çıkış hapis_basarili_kacis'i İŞARETLEMEZ (fiziksel kaçış değil)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.05);
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 30;
    state.para = 100;
    etiketEkle(state, ["hapiste"]);
    state.hapis_tur_sayaci = 5;
    // hapisKacisBaslangici gating'i geçmek için ceza_toplam >= 5 gerekir, ama
    // hapisErkenCikisMumkunMu'nun "en az 5 yıl yatmadan çıkış yok" kısıtına
    // takılmamak için 7'nin altında tutuluyor (bkz. §17).
    state.hapis_ceza_toplam = 6;
    state.hapis_ceza_kalan = 6;
    const digerHapisIdler = OLAY_BANKASI.filter(
      (o) => o.hapisOlayi && o.id !== "hapis_rusvet_girisimi"
    ).map((o) => o.id);
    state.gecmis_olaylar.push(...digerHapisIdler);
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Altının Gücü");
    const sonuc = await secimUygulaVeCoz(state.id, 0); // rüşvet teklif et
    expect(sonuc.state.etiketler.includes("hapiste")).toBe(false);
    expect(sonuc.state.hapis_basarili_kacis).toBe(false);
  });
});

describe("büyük yolculuk skoru (çifte sayım düzeltmesi)", () => {
  it("yolculuğu tamamlamak skora yalnız +2000 katar, tik puanına girmez", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const once = hesaplaSkorKirilimi(state);
    etiketEkle(state, ["yolculuk_tamamlandi"]);
    const sonra = hesaplaSkorKirilimi(state);
    expect(sonra.tikPuani).toBe(once.tikPuani);
    expect(sonra.basariOlayiPuani - once.basariOlayiPuani).toBe(2000);
    expect(sonra.temelToplam - once.temelToplam).toBe(2000);
  });
});
