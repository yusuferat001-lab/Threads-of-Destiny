import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { OLAY_BANKASI } from "../src/data/olaylar";

describe("hapishane sistemi", () => {
  it("hapiste değilken hapis olayları hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.hapisOlayi).not.toBe(true);
    }
  });

  it("hapisteyken sadece hapis olayları çıkar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    etiketEkle(state, ["hapiste"]);
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.hapisOlayi).toBe(true);
    }
  });

  it("ahlak ve ün çok düşükken tutuklanma olayı uygun hale gelir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ahlak = 5;
    state.un = 2;
    let bulundu = false;
    for (let i = 0; i < 500 && !bulundu; i++) {
      const { olay } = olaySec(state);
      if (olay.id === "hapis_tutuklanma") bulundu = true;
    }
    expect(bulundu).toBe(true);
  });

  it("ahlak/ün normalken tutuklanma olayı hiç çıkmaz", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.ahlak = 50;
    state.un = 50;
    for (let i = 0; i < 500; i++) {
      const { olay } = olaySec(state);
      expect(olay.id).not.toBe("hapis_tutuklanma");
    }
  });

  it("her hapis olayında oyuncu için en az bir kilitsiz seçenek vardır (para/ahlak/ün yetersiz olsa bile)", () => {
    const hapisOlaylari = OLAY_BANKASI.filter((o) => o.hapisOlayi);
    expect(hapisOlaylari.length).toBeGreaterThan(0);
    const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(state, "Tüccar");
    state.para = -50; // borçlu: maliyetli seçenekler kilitlenir
    etiketEkle(state, ["hapiste"]);
    for (const tanim of hapisOlaylari) {
      const { senaryo } = olaySec(state, tanim.id);
      expect(senaryo.secenekler.some((s) => !s.kilitli)).toBe(true);
    }
  });

  it("kaçış/rüşvet/ceza-doldu olaylarının başarılı sonucu hapiste etiketini kaldırır", () => {
    const kacis = OLAY_BANKASI.find((o) => o.id === "hapis_kacis_girisimi")!;
    const rusvet = OLAY_BANKASI.find((o) => o.id === "hapis_rusvet_girisimi")!;
    const cezaDoldu = OLAY_BANKASI.find((o) => o.id === "hapis_cezasi_doldu")!;
    for (const olay of [kacis, rusvet, cezaDoldu]) {
      expect(olay.secenekler.some((s) => s.basariliSonuc.etiket_sil?.includes("hapiste"))).toBe(true);
    }
  });

  it("en az 40 hapishane-ilişkili olay var (hapisOlayi:true ya da hapis_ önekli)", () => {
    const hapisIliskili = OLAY_BANKASI.filter((o) => o.hapisOlayi === true || o.id.startsWith("hapis_"));
    expect(hapisIliskili.length).toBeGreaterThanOrEqual(40);
  });

  it.each(["hapis_hirsizlik_yakalanma", "hapis_asilzade_husumeti", "hapis_kacakcilik_baskini", "hapis_ayaklanma_tutuklamasi"])(
    "%s: ahlak/ün normalken hiç çıkmaz, kendi eşiği altındayken uygun hale gelir",
    (id) => {
      const tanim = OLAY_BANKASI.find((o) => o.id === id)!;
      expect(tanim).toBeDefined();

      const normalState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(normalState, "Tüccar");
      normalState.ahlak = 60;
      normalState.un = 60;
      for (let i = 0; i < 300; i++) {
        const { olay } = olaySec(normalState);
        expect(olay.id).not.toBe(id);
      }

      const dusukState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(dusukState, "Tüccar");
      dusukState.ahlak = 1;
      dusukState.un = 1;
      let bulundu = false;
      for (let i = 0; i < 500 && !bulundu; i++) {
        const { olay } = olaySec(dusukState);
        if (olay.id === id) bulundu = true;
      }
      expect(bulundu).toBe(true);
    }
  );

  it("ahlak ve ün düştükçe havuzda birden fazla giriş olayı aynı anda uygun hale gelir (toplam olasılık artışı)", () => {
    const normalState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(normalState, "Tüccar");
    normalState.ahlak = 60;
    normalState.un = 60;
    const normaldeUygunGiris = OLAY_BANKASI.filter(
      (o) => !o.hapisOlayi && (o.maxAhlak !== undefined || o.maxUn !== undefined) && o.id.startsWith("hapis_")
    ).filter((o) => (o.maxAhlak === undefined || normalState.ahlak <= o.maxAhlak) && (o.maxUn === undefined || normalState.un <= o.maxUn));

    const dusukState = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
    mesleğiSec(dusukState, "Tüccar");
    dusukState.ahlak = 1;
    dusukState.un = 1;
    const dusukteUygunGiris = OLAY_BANKASI.filter(
      (o) => !o.hapisOlayi && (o.maxAhlak !== undefined || o.maxUn !== undefined) && o.id.startsWith("hapis_")
    ).filter((o) => (o.maxAhlak === undefined || dusukState.ahlak <= o.maxAhlak) && (o.maxUn === undefined || dusukState.un <= o.maxUn));

    expect(dusukteUygunGiris.length).toBeGreaterThan(normaldeUygunGiris.length);
  });

  it("tünel yöntemi (tek başına): karardan kaçışa kadar zorunlu_sonraki ile doğru sırayla ilerler", () => {
    const karar = OLAY_BANKASI.find((o) => o.id === "hapis_tunel_karar")!;
    const tek1Id = karar.secenekler[0].basariliSonuc.zorunlu_sonraki;
    expect(tek1Id).toBe("hapis_tunel_tek_1");
    const tek1 = OLAY_BANKASI.find((o) => o.id === tek1Id)!;
    const tek2Id = tek1.secenekler[0].basariliSonuc.zorunlu_sonraki;
    expect(tek2Id).toBe("hapis_tunel_tek_2");
    const tek2 = OLAY_BANKASI.find((o) => o.id === tek2Id)!;
    expect(tek2.secenekler.some((s) => s.basariliSonuc.etiket_sil?.includes("hapiste"))).toBe(true);
    // Yakalanma anında geri hapis veya ölüm riski gerçek olmalı.
    expect(tek2.secenekler.some((s) => s.basarisizSonuc.etiket_ekle?.includes("hapiste") && (s.basarisizSonuc.olum_sansi ?? 0) > 0)).toBe(true);
  });

  it("tünel yöntemi (ekip): karardan toplu kaçışa kadar zorunlu_sonraki ile doğru sırayla ilerler", () => {
    const karar = OLAY_BANKASI.find((o) => o.id === "hapis_tunel_karar")!;
    const ekip1Id = karar.secenekler[1].basariliSonuc.zorunlu_sonraki;
    expect(ekip1Id).toBe("hapis_tunel_ekip_1");
    const ekip1 = OLAY_BANKASI.find((o) => o.id === ekip1Id)!;
    const ekip2Id = ekip1.secenekler[0].basariliSonuc.zorunlu_sonraki;
    const ekip2 = OLAY_BANKASI.find((o) => o.id === ekip2Id)!;
    const ekip3Id = ekip2.secenekler[0].basariliSonuc.zorunlu_sonraki;
    expect(ekip3Id).toBe("hapis_tunel_ekip_3");
    const ekip3 = OLAY_BANKASI.find((o) => o.id === ekip3Id)!;
    expect(ekip3.secenekler.some((s) => s.basariliSonuc.etiket_sil?.includes("hapiste"))).toBe(true);
  });

  it("gardiyan bayıltma yöntemi: en yüksek ölüm riskini taşır (diğer yöntemlerden daha riskli)", () => {
    const saldiri = OLAY_BANKASI.find((o) => o.id === "hapis_bayiltma_saldiri")!;
    const kacis = OLAY_BANKASI.find((o) => o.id === "hapis_bayiltma_kacis")!;
    const bayiltmaMaxOlumSansi = Math.max(
      ...[saldiri, kacis].flatMap((o) => o.secenekler.map((s) => s.basarisizSonuc.olum_sansi ?? 0))
    );
    const tunelMaxOlumSansi = Math.max(
      ...["hapis_tunel_tek_2", "hapis_tunel_ekip_3"].map((id) => OLAY_BANKASI.find((o) => o.id === id)!).flatMap((o) => o.secenekler.map((s) => s.basarisizSonuc.olum_sansi ?? 0))
    );
    expect(bayiltmaMaxOlumSansi).toBeGreaterThanOrEqual(tunelMaxOlumSansi);
    expect(bayiltmaMaxOlumSansi).toBeGreaterThan(0);
  });

  it("rüşvet (derinleştirilmiş) ve iyi hal zincirleri sonunda hapiste etiketini kaldırır", () => {
    const rusvetSon = OLAY_BANKASI.find((o) => o.id === "hapis_rusvet_uygulama")!;
    const iyiHalSon = OLAY_BANKASI.find((o) => o.id === "hapis_iyi_hal_degerlendirme")!;
    for (const olay of [rusvetSon, iyiHalSon]) {
      expect(olay.secenekler.some((s) => s.basariliSonuc.etiket_sil?.includes("hapiste"))).toBe(true);
    }
  });

  it("isyan hazırlığı mevcut hapis_isyan_firsati'na bağlanır", () => {
    const hazirlik = OLAY_BANKASI.find((o) => o.id === "hapis_isyan_hazirlik")!;
    expect(hazirlik.secenekler.every((s) => s.basariliSonuc.zorunlu_sonraki === "hapis_isyan_firsati")).toBe(true);
  });

  describe("kaçış/erken-tahliye stratejilerini geciktirme (Faz 8)", () => {
    const KACIS_BASLANGICI = [
      "hapis_kacis_girisimi",
      "hapis_rusvet_girisimi",
      "hapis_isyan_firsati",
      "hapis_tunel_karar",
      "hapis_rusvet_muhbir_bulma",
      "hapis_bayiltma_plan",
      "hapis_iyi_hal_karar",
      "hapis_avlu_duvari",
      "hapis_camasir_arabasi",
      "hapis_sayim_karisikligi",
    ];

    it("tam olarak 10 olay hapisKacisBaslangici:true taşır", () => {
      const isaretliler = OLAY_BANKASI.filter((o) => o.hapisKacisBaslangici === true).map((o) => o.id);
      expect(isaretliler.sort()).toEqual([...KACIS_BASLANGICI].sort());
    });

    it("toplam ceza 5 yıldan kısaysa hiçbir kaçış-başlangıç olayı çıkmaz (sayaç yeterli olsa bile)", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      state.hapis_ceza_toplam = 4;
      state.hapis_tur_sayaci = 10;
      etiketEkle(state, ["hapiste"]);
      for (let i = 0; i < 500; i++) {
        const { olay } = olaySec(state);
        expect(KACIS_BASLANGICI).not.toContain(olay.id);
      }
    });

    it("ceza yeterli (≥5 yıl) ama ilk 2 hapisOlayi çözülmeden kaçış-başlangıç olayı çıkmaz", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      state.hapis_ceza_toplam = 8;
      state.hapis_tur_sayaci = 1;
      etiketEkle(state, ["hapiste"]);
      for (let i = 0; i < 500; i++) {
        const { olay } = olaySec(state);
        expect(KACIS_BASLANGICI).not.toContain(olay.id);
      }
    });

    it("ceza yeterli VE en az 2 hapisOlayi çözülmüşse kaçış-başlangıç olayları uygun hale gelir", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      state.hapis_ceza_toplam = 8;
      state.hapis_tur_sayaci = 2;
      etiketEkle(state, ["hapiste"]);
      const gorulen = new Set<string>();
      for (let i = 0; i < 500; i++) {
        const { olay } = olaySec(state);
        gorulen.add(olay.id);
      }
      expect(KACIS_BASLANGICI.some((id) => gorulen.has(id))).toBe(true);
    });
  });

  describe("aranma bandına göre ceza süresi (2026-09 yeniden düzenleme)", () => {
    it("hafif bir tutuklamada (toplam ceza <7y) para/af ile çıkış her zaman görülebilir", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      etiketEkle(state, ["hapiste"]);
      state.hapis_ceza_toplam = 6;
      state.hapis_ceza_kalan = 6;
      state.hapis_tur_sayaci = 2; // Faz 8 kapısı: kaçış/çıkış-başlangıç olayları için en az 2 hapisOlayi geçmiş olmalı
      let bulundu = false;
      for (let i = 0; i < 1000 && !bulundu; i++) {
        const { olay } = olaySec(state);
        if (olay.hapisParaylaCikisOlayi) bulundu = true;
      }
      expect(bulundu).toBe(true);
    });

    it("ağır bir tutuklamada (toplam ceza ≥7y) 5 yıl yatmadan para/af ile çıkış olayı hiç çıkmaz", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      etiketEkle(state, ["hapiste"]);
      state.hapis_ceza_toplam = 9;
      state.hapis_ceza_kalan = 9; // henüz hiç yatmadı
      for (let i = 0; i < 1000; i++) {
        const { olay } = olaySec(state);
        expect(olay.hapisParaylaCikisOlayi).not.toBe(true);
      }
    });

    it("ağır bir tutuklamada 5 yıl yatınca para/af ile çıkış olayı tekrar görülebilir", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      etiketEkle(state, ["hapiste"]);
      state.hapis_ceza_toplam = 9;
      state.hapis_ceza_kalan = 4; // 5 yıl yatmış (9-4)
      state.hapis_tur_sayaci = 2; // Faz 8 kapısı: kaçış/çıkış-başlangıç olayları için en az 2 hapisOlayi geçmiş olmalı
      let bulundu = false;
      for (let i = 0; i < 1000 && !bulundu; i++) {
        const { olay } = olaySec(state);
        if (olay.hapisParaylaCikisOlayi) bulundu = true;
      }
      expect(bulundu).toBe(true);
    });

    it("fiziksel kaçış girişimleri (tünel/bayıltma/avlu duvarı) ağır tutuklamada da her zaman uygun kalır", () => {
      const state = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
      mesleğiSec(state, "Tüccar");
      etiketEkle(state, ["hapiste"]);
      state.hapis_ceza_toplam = 12;
      state.hapis_ceza_kalan = 12;
      state.hapis_tur_sayaci = 2; // Faz 8 kapısı: kaçış/çıkış-başlangıç olayları için en az 2 hapisOlayi geçmiş olmalı
      const kacisIdleri = ["hapis_kacis_girisimi", "hapis_avlu_duvari", "hapis_camasir_arabasi", "hapis_sayim_karisikligi"];
      const bulunanlar = new Set<string>();
      for (let i = 0; i < 2000 && bulunanlar.size < kacisIdleri.length; i++) {
        const { olay } = olaySec(state);
        if (kacisIdleri.includes(olay.id)) bulunanlar.add(olay.id);
      }
      expect(bulunanlar.size).toBeGreaterThan(0);
    });
  });
});
