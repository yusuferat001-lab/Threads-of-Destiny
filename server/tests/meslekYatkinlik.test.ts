import { describe, it, expect } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  yatkinlikHesapla,
  maasKirilimHesapla,
  BOLGE_YATKINLIK_LIMIT,
  AILE_YATKINLIK_LIMIT,
  KISILIK_YATKINLIK_LIMIT,
} from "../src/game/stateManager";
import { olaySec, temelUygunMu } from "../src/game/olaySecici";
import { OLAY_MESLEK_YATKINLIK } from "../src/data/olaylar/meslekYatkinlikOlaylari";
import type { AileTanimi } from "../src/data/aileler";
import { yerlesimGetir } from "../src/data/yerlesimler";
import { BolgeOzellikleri } from "../src/data/bolgeOzellikleri";
import {
  yatkinlikTierBelirle,
  yatkinlikZarBonusOrani,
  YATKINLIK_TIER_ETKILERI,
  meslekYatkinlikUnvaniGetir,
} from "../src/data/meslekYatkinlik";

const olayBul = (id: string) => {
  const olay = OLAY_MESLEK_YATKINLIK.find((o) => o.id === id);
  if (!olay) throw new Error(`test olayı bulunamadı: ${id}`);
  return olay;
};

describe("Mesleğe Yatkınlık Kademeleri (2026-09 sonu)", () => {
  it("yatkinlikTierBelirle 4 kademeyi doğru sınırlarla ayırır", () => {
    expect(yatkinlikTierBelirle(-100)).toBe("kotu");
    expect(yatkinlikTierBelirle(-5)).toBe("kotu");
    expect(yatkinlikTierBelirle(-4)).toBe("notr");
    expect(yatkinlikTierBelirle(0)).toBe("notr");
    expect(yatkinlikTierBelirle(4)).toBe("notr");
    expect(yatkinlikTierBelirle(5)).toBe("iyi");
    expect(yatkinlikTierBelirle(19)).toBe("iyi");
    expect(yatkinlikTierBelirle(20)).toBe("mukemmel");
    expect(yatkinlikTierBelirle(100)).toBe("mukemmel");
  });

  it("her kademenin oranları kullanıcının verdiği tam değerlerle eşleşir", () => {
    expect(YATKINLIK_TIER_ETKILERI.kotu).toEqual({ zarBonusu: -0.15, maasCarpani: -0.1, tecrubeHizi: -0.15 });
    expect(YATKINLIK_TIER_ETKILERI.notr).toEqual({ zarBonusu: 0, maasCarpani: 0, tecrubeHizi: 0 });
    expect(YATKINLIK_TIER_ETKILERI.iyi).toEqual({ zarBonusu: 0.1, maasCarpani: 0.05, tecrubeHizi: 0.07 });
    expect(YATKINLIK_TIER_ETKILERI.mukemmel).toEqual({ zarBonusu: 0.2, maasCarpani: 0.1, tecrubeHizi: 0.15 });
  });

  it("meslekYatkinlikUnvaniGetir her meslek+çağ+kademe için bir unvan döner ve Orta Çağ/Sanayi isimleri farklıdır", () => {
    for (const meslek of ["Asker", "Tüccar", "Din Adamı", "Zanaatkâr"]) {
      for (const tier of ["kotu", "notr", "iyi", "mukemmel"] as const) {
        const oc = meslekYatkinlikUnvaniGetir("Orta Çağ", meslek, tier);
        const sd = meslekYatkinlikUnvaniGetir("Sanayi Devrimi", meslek, tier);
        expect(oc).toBeTruthy();
        expect(sd).toBeTruthy();
        expect(oc).not.toBe(sd);
      }
    }
    expect(meslekYatkinlikUnvaniGetir("Orta Çağ", "Asker", "mukemmel")).toBe("Doğuştan Savaşçı");
    expect(meslekYatkinlikUnvaniGetir("Orta Çağ", "Asker", "kotu")).toBe("Savaş Korkusu");
  });

  it("mesleğiSec kademeyi meslek seçilirken bir kez sabitler ve kalıcı çarpanları yazar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.savas = 25; // mükemmel
    const oncekiUn = state.un;
    mesleğiSec(state, "Asker");

    expect(state.meslek_yatkinlik_seviyesi).toBe(4);
    expect(state.meslek_yatkinlik_unvani).toBe("Doğuştan Savaşçı");
    expect(state.meslek_zar_bonusu).toBeCloseTo(0.2);
    expect(state.meslek_maas_carpani).toBeCloseTo(0.1);
    expect(state.meslek_tecrube_hizi).toBeCloseTo(0.15);
    // Mükemmel kademe tek seferlik ekstra şöhret bonusu verir.
    expect(state.un).toBeGreaterThan(oncekiUn);

    // yatkınlık sonradan değişse bile kademe SABİT kalır (doğuştan yetenek damgası).
    state.yatkinliklar.savas = -50;
    expect(state.meslek_yatkinlik_seviyesi).toBe(4);
  });

  it("kötü kademe negatif kalıcı çarpanlar üretir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.ticaret = -12; // kötü
    mesleğiSec(state, "Tüccar");
    expect(state.meslek_yatkinlik_seviyesi).toBe(1);
    expect(state.meslek_yatkinlik_unvani).toBe("Pazarlıktan Anlamaz");
    expect(state.meslek_zar_bonusu).toBeCloseTo(-0.15);
    expect(state.meslek_maas_carpani).toBeCloseTo(-0.1);
    expect(state.meslek_tecrube_hizi).toBeCloseTo(-0.15);
  });

  it("nötr kademede tüm çarpanlar 0'dır", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.din = 2; // nötr
    mesleğiSec(state, "Din Adamı");
    expect(state.meslek_yatkinlik_seviyesi).toBe(2);
    expect(state.meslek_zar_bonusu).toBe(0);
    expect(state.meslek_maas_carpani).toBe(0);
    expect(state.meslek_tecrube_hizi).toBe(0);
  });

  it("meslek_maas_carpani maaş kırılımında ayrı bir kalıcı ('kariyer') kalemi olarak görünür", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.zanaat = 30; // mükemmel
    mesleğiSec(state, "Zanaatkâr");
    const kirilim = maasKirilimHesapla(state);
    const kalem = kirilim.kariyerKalemler.find((k) => k.ad === "Mesleğe yatkınlığın");
    expect(kalem).toBeTruthy();
    expect(kalem!.yuzde).toBe(10);
  });

  it("nötr kademede maaş kırılımında 'Mesleğe yatkınlığın' kalemi hiç görünmez (etkisiz kalem gizlenir)", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.zanaat = 0; // nötr
    mesleğiSec(state, "Zanaatkâr");
    const kirilim = maasKirilimHesapla(state);
    expect(kirilim.kariyerKalemler.find((k) => k.ad === "Mesleğe yatkınlığın")).toBeUndefined();
  });

  it("yatkinlikZarBonusOrani herhangi bir kategoride güncel yatkınlığa göre doğru oranı döner", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yatkinliklar.savas = -10;
    expect(yatkinlikZarBonusOrani(state, "savas")).toBeCloseTo(-0.15);
    state.yatkinliklar.savas = 0;
    expect(yatkinlikZarBonusOrani(state, "savas")).toBe(0);
    state.yatkinliklar.savas = 10;
    expect(yatkinlikZarBonusOrani(state, "savas")).toBeCloseTo(0.1);
    state.yatkinliklar.savas = 25;
    expect(yatkinlikZarBonusOrani(state, "savas")).toBeCloseTo(0.2);
  });

  it("olay başarı şansı artık yatkınlığı TOPLAMAZ, küçük bir ORANLA çarpar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.meslek = "Asker";
    // "Temkinli oyna" seçeneğinin baseBasariSansi'si 78, gating yok.
    const beklenenTaban = 78;

    state.yatkinliklar.savas = -10; // kötü → ×0.85
    let sonuc = olaySec(state, "myk_asker_ordugah_meydan_okumasi");
    expect(sonuc.senaryo.secenekler[1].basari_sansi).toBe(Math.round(beklenenTaban * 0.85));

    state.yatkinliklar.savas = 25; // mükemmel → ×1.20
    sonuc = olaySec(state, "myk_asker_ordugah_meydan_okumasi");
    expect(sonuc.senaryo.secenekler[1].basari_sansi).toBe(Math.round(beklenenTaban * 1.2));

    // Eski davranış (±30 puana kadar toplama) artık geçerli değil: 78+25 (=103, clamp 95)
    // gibi bir değer üretmemeli.
    expect(sonuc.senaryo.secenekler[1].basari_sansi).not.toBe(95);
  });

  it("kesin (baseBasariSansi 100) şıklar yatkınlıktan ve %95 tavanından etkilenmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.meslek = "Asker";
    // "Göz Göze": iki şık da %100 (tanışma başlat / vazgeç) — kötü yatkınlıkta bile 100 kalmalı.
    for (const yatkinlik of [-25, 0, 25]) {
      state.yatkinliklar.sosyal = yatkinlik;
      state.yatkinliklar.savas = yatkinlik;
      state.yatkinliklar.zanaat = yatkinlik;
      const sonuc = olaySec(state, "iliski_tanisma_firsati");
      expect(sonuc.senaryo.secenekler.map((x) => x.basari_sansi)).toEqual([100, 100]);
    }
  });

  it("OlaySecenegi.minMeslekYatkinlikSeviye yalnız yetersiz kademeyi kilitler", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.meslek = "Asker";

    state.meslek_yatkinlik_seviyesi = 2; // nötr — "Ustaca bir hamle" (min 3) kilitli olmalı
    let sonuc = olaySec(state, "myk_asker_ordugah_meydan_okumasi");
    expect(sonuc.senaryo.secenekler[0].kilitli).toBe(true);

    state.meslek_yatkinlik_seviyesi = 3; // iyi — artık açık olmalı
    sonuc = olaySec(state, "myk_asker_ordugah_meydan_okumasi");
    expect(sonuc.senaryo.secenekler[0].kilitli).toBe(false);
  });

  it("OlayTanimi.minMeslekYatkinlikSeviye/maxMeslekYatkinlikSeviye olay görünürlüğünü doğru filtreler", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.meslek = "Tüccar";
    state.yas = 25;

    const ozelTeklif = olayBul("myk_tuccar_ozel_teklif"); // minMeslekYatkinlikSeviye: 3
    state.meslek_yatkinlik_seviyesi = 2;
    expect(temelUygunMu(ozelTeklif, state)).toBe(false);
    state.meslek_yatkinlik_seviyesi = 3;
    expect(temelUygunMu(ozelTeklif, state)).toBe(true);

    state.meslek = "Din Adamı";
    const gunahkarYuku = olayBul("myk_din_gunahkarin_yuku"); // maxMeslekYatkinlikSeviye: 1
    state.meslek_yatkinlik_seviyesi = 2;
    expect(temelUygunMu(gunahkarYuku, state)).toBe(false);
    state.meslek_yatkinlik_seviyesi = 1;
    expect(temelUygunMu(gunahkarYuku, state)).toBe(true);
  });

  it("meslek seçilmemiş (seviye null) karakter meslek-yatkınlık gating'li hiçbir olayı görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.meslek_yatkinlik_seviyesi).toBeNull();
    const ozelTeklif = olayBul("myk_tuccar_ozel_teklif");
    expect(temelUygunMu(ozelTeklif, state)).toBe(false);
  });

  it("yatkınlık kaynak limitleri: kişilik/aile katkısı kendi sınırını, bölge katkısı kendi sınırını aşmaz", () => {
    const yerlesim = yerlesimGetir("kasaba")!;
    // Cesur: savas+10 (limit öncesi) — bilinçli olarak KISILIK_YATKINLIK_LIMIT'i (8) aşıyor
    // (§41 yeniden tasarımında kırpmayı kanıtlamak için tek istisna bırakıldı).
    // Gerçek aile verisi artık zaten ±8 tavanında durduğu için (§40, "her aile
    // her mesleğe" düzenlemesi) kırpmayı gerçekten kanıtlamak üzere kasıtlı
    // aşırı değerli sentetik bir aile/bölge kullanılıyor.
    const asiriAile: AileTanimi = {
      id: "test_asiri_aile",
      ad: "TestAile",
      agirlik: 1,
      anlati: "test",
      yatkinlikEtkisi: { savas: 50, ticaret: -50 },
    };
    const asiriBolge: BolgeOzellikleri = {
      ozet: { tr: "test", en: "test" },
      yatkinlikEtkisi: { zanaat: 40, din: -40 },
    };
    const { kaynaklar } = yatkinlikHesapla(["Cesur", "Sakin"], asiriAile, yerlesim, asiriBolge, "TestBölge");

    for (const kaynak of kaynaklar) {
      if (kaynak.kaynak === "Cesur" || kaynak.kaynak === "Sakin") {
        expect(Math.abs(kaynak.deger)).toBeLessThanOrEqual(KISILIK_YATKINLIK_LIMIT);
      } else if (kaynak.kaynak === asiriAile.ad) {
        expect(Math.abs(kaynak.deger)).toBeLessThanOrEqual(AILE_YATKINLIK_LIMIT);
      } else if (kaynak.kaynak === "TestBölge") {
        expect(Math.abs(kaynak.deger)).toBeLessThanOrEqual(BOLGE_YATKINLIK_LIMIT);
      }
    }
    // Uç değerlerin gerçekten kırpıldığını (limit öncesi ham değerlere eşit KALMADIĞINI) doğrula.
    const cesurSavas = kaynaklar.find((k) => k.kaynak === "Cesur" && k.kategori === "savas");
    expect(cesurSavas?.deger).toBe(KISILIK_YATKINLIK_LIMIT); // ham +10 → +8'e kırpıldı
    const aileSavas = kaynaklar.find((k) => k.kaynak === asiriAile.ad && k.kategori === "savas");
    expect(aileSavas?.deger).toBe(AILE_YATKINLIK_LIMIT); // ham +50 → +8'e kırpıldı
    const bolgeZanaat = kaynaklar.find((k) => k.kaynak === "TestBölge" && k.kategori === "zanaat");
    expect(bolgeZanaat?.deger).toBe(BOLGE_YATKINLIK_LIMIT); // ham +40 → +6'ya kırpıldı
    const bolgeDin = kaynaklar.find((k) => k.kaynak === "TestBölge" && k.kategori === "din");
    expect(bolgeDin?.deger).toBe(-BOLGE_YATKINLIK_LIMIT); // ham -40 → -6'ya kırpıldı
  });

  it("KISILIKLER içindeki tüm etkiler yalnızca 4 meslek kategorisini (savas/ticaret/din/zanaat) kullanır", async () => {
    const { KISILIKLER } = await import("../src/data/kisilikler");
    const izinliKategoriler = new Set(["savas", "ticaret", "din", "zanaat"]);
    for (const ozellik of KISILIKLER) {
      for (const kategori of Object.keys(ozellik.etkiler)) {
        expect(izinliKategoriler.has(kategori)).toBe(true);
      }
    }
  });

  it("createCharacter kişilik özelliklerinin maaş/gayrimenkul/ilişki bonuslarını doğuşta uygular", () => {
    // Vicdanlı: gayrimenkulBonusu +0.02. Hırslı: maasCarpani ×1.05 (ham).
    const stateBonus = createCharacter("Orta Çağ", "Fransa", "kasaba");
    stateBonus.kisilik = ["Vicdanlı", "Hırslı"];
    // yatkinlikHesapla zaten createCharacter içinde çağrıldığı için burada state'i
    // yeniden yaratmak yerine doğrudan üretim mantığını taklit eden gerçek bir
    // karakter yaratıp kişiliğe göre filtreleyeceğiz — bu yüzden birkaç deneme
    // yapıp Vicdanlı+Hırslı çıkana kadar üretmek yerine, motorun gerçek akışını
    // (createCharacter → kişilik ataması + bonus uygulaması) `Math.random`
    // sabitlemeden doğrudan gözlemlemek için yardımcı bir döngü kullanıyoruz.
    // "Obur" da gayrimenkulBonusu taşır (-0.02) — Vicdanlı ile eşleşirse birbirini
    // götürüp testi rastgele başarısız kılabilir (§41 kişilik eşleşme kanıtlanmış
    // sorunu, tıpkı createCharacter'da gözlemlenen Vicdanlı+Obur=0 birleşimi gibi);
    // bu eşleşmeyi eleyerek testi deterministik kılıyoruz.
    let bulundu: typeof stateBonus | null = null;
    for (let i = 0; i < 500 && !bulundu; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      if (s.kisilik.includes("Vicdanlı") && !s.kisilik.includes("Obur")) bulundu = s;
    }
    expect(bulundu).toBeTruthy();
    expect(bulundu!.gayrimenkul_getiri_bonusu).toBeGreaterThanOrEqual(0.02);

    let hirsliState: typeof stateBonus | null = null;
    for (let i = 0; i < 500 && !hirsliState; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      if (s.kisilik.includes("Hırslı")) hirsliState = s;
    }
    expect(hirsliState).toBeTruthy();
    expect(hirsliState!.etiketler.some((e) => e.startsWith("maas_carpani:"))).toBe(true);

    // "Sivri Dilli" de patron ilişkisini etkiler (-5) — Sosyal ile eşleşirse
    // (40+5-5=40) toplam etkiyi tam iptal edip testi rastgele başarısız kılabilir;
    // bu eşleşmeyi eleyerek deterministik kılıyoruz (yukarıdaki Vicdanlı/Obur ile
    // aynı kök sebep: iki kişilik özelliği aynı hedefi zıt yönde etkileyebiliyor).
    let sosyalState: typeof stateBonus | null = null;
    for (let i = 0; i < 500 && !sosyalState; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      if (s.kisilik.includes("Sosyal") && !s.kisilik.includes("Sivri Dilli")) sosyalState = s;
    }
    expect(sosyalState).toBeTruthy();
    expect(sosyalState!.patron_iliski).toBeGreaterThan(40); // taban 40 + Sosyal'in +5'i
  });

  it("mulkGetiriOraniKisisel, gayrimenkul_getiri_bonusu'nu getiri oranına ekler", async () => {
    const { mulkGetiriOraniKisisel, mulkGetiriOraniHesapla } = await import("../src/game/stateManager");
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.gayrimenkul_getiri_bonusu = 0;
    const taban = mulkGetiriOraniKisisel(state, "ciftlik");
    expect(taban).toBeCloseTo(mulkGetiriOraniHesapla("ciftlik", state.ulke));

    state.gayrimenkul_getiri_bonusu = 0.02;
    const bonuslu = mulkGetiriOraniKisisel(state, "ciftlik");
    expect(bonuslu).toBeCloseTo(taban + 0.02);
  });

  it("her ailenin yatkinlikEtkisi'si artık tüm 4 meslek kategorisini (savas/ticaret/din/zanaat) kapsıyor ve ±8 sınırı içinde", async () => {
    const { AILELER } = await import("../src/data/aileler");
    for (const aile of AILELER) {
      expect(aile.yatkinlikEtkisi).toBeTruthy();
      for (const kategori of ["savas", "ticaret", "din", "zanaat"] as const) {
        expect(aile.yatkinlikEtkisi?.[kategori]).toBeDefined();
        expect(Math.abs(aile.yatkinlikEtkisi![kategori]!)).toBeLessThanOrEqual(AILE_YATKINLIK_LIMIT);
      }
      // devamMeslegi varsa, en güçlü uyum (tavan) her zaman o mesleğin kategorisi olmalı.
      if (aile.devamMeslegi) {
        const kategoriDevam = { Asker: "savas", Tüccar: "ticaret", "Din Adamı": "din", "Zanaatkâr": "zanaat" }[
          aile.devamMeslegi
        ] as "savas" | "ticaret" | "din" | "zanaat" | undefined;
        if (kategoriDevam) expect(aile.yatkinlikEtkisi![kategoriDevam]).toBe(AILE_YATKINLIK_LIMIT);
      }
    }
  });

  it("gerçek bolgeOzellikleri.ts verisi artık her kalemde ±6 sınırının içinde", async () => {
    const { bolgeOzellikleriGetir } = await import("../src/data/bolgeOzellikleri");
    const kombinasyonlar: [string, string][] = [
      ["Orta Çağ", "Fransa"],
      ["Orta Çağ", "Kutsal Roma"],
      ["Orta Çağ", "Bizans"],
      ["Orta Çağ", "Selçuklu"],
      ["Sanayi Devrimi", "İngiltere"],
      ["Sanayi Devrimi", "Fransa"],
      ["Sanayi Devrimi", "Osmanlı"],
      ["Sanayi Devrimi", "Rusya"],
    ];
    for (const [cag, bolge] of kombinasyonlar) {
      const ozellik = bolgeOzellikleriGetir(cag as any, bolge);
      if (!ozellik?.yatkinlikEtkisi) continue;
      for (const deger of Object.values(ozellik.yatkinlikEtkisi)) {
        expect(Math.abs(deger as number)).toBeLessThanOrEqual(BOLGE_YATKINLIK_LIMIT);
      }
    }
  });
});
