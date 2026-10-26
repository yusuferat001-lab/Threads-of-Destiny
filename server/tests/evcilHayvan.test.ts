import { describe, it, expect, vi, afterEach } from "vitest";
import { temelUygunMu } from "../src/game/olaySecici";
import {
  createCharacter,
  mesleğiSec,
  giderKalemleriHesapla,
  etiketEkle,
  evcilHayvanEkle,
  evcilHayvanYillikUygula,
  eskiKayitGocu,
  vebaHastaligiKontrol,
} from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";
import { OLAY_BANKASI } from "../src/data/olaylar";
import {
  EVCIL_HAYVAN_TURLERI,
  HAYVAN_ORTALAMA_OMUR,
  HAYVAN_BONUSLARI,
  hayvanBonusVar,
  yeniEvcilHayvanUret,
} from "../src/data/evcilHayvanlar";
import { hayvanOlayEtkisiUygula } from "../src/game/hayvanEtkileri";
import { secimUygulaVeCoz } from "./testUtils";
import type { CharacterState } from "../src/types";

afterEach(() => {
  vi.restoreAllMocks();
});

function yeniKarakter(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ"): CharacterState {
  const state = createCharacter(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  mesleğiSec(state, "Tüccar");
  return state;
}

/** Diğer garantili olaylar (hayat amacı, evlilik teklifi, yol girişi, yolculuk) devreye girmesin diye zaten "görülmüş" işaretlenir. */
function digerZorunluOlaylariGecistir(state: CharacterState) {
  state.hayat_amaci = { id: "x", ad: "x", aciklama: "x", hedefTuru: "para", hedefDeger: 999999, tamamlandi: false };
  state.gecmis_olaylar.push("hayat_amaci_secimi", "iliski_evlilik_teklifi", "iliski_ikinci_teklif");
  state.ulke.savasta = true;
  state.etiketler.push("yol:tuccar:hayirsever", "yolculuk_tamamlandi", "hizip_secildi");
  state.etiketler.push("tanisma_donum_25", "tanisma_donum_40"); // aşk evliliği tanışma fırsatı zorlanmasın
  state.gecmis_olaylar.push("oc_tuccar_yol_ilk_anlasma", "sd_tuccar_yol_ilk_karar");
}

describe("evcil hayvan sistemi: durum ve veri", () => {
  it("yeni karakter evcil hayvansız başlar", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    expect(state.evcil_hayvan).toBeNull();
    expect(state.evcil_hayvanlar).toEqual([]);
    expect(state.hayvan_karsilasma_sayisi).toBe(0);
    expect(state.hayvan_karsilasma_turleri).toEqual([]);
  });

  it("5 tür için ortalama ömür ve iki bonus tanımlı", () => {
    expect([...EVCIL_HAYVAN_TURLERI].sort()).toEqual(["At", "Karga", "Kedi", "Köpek", "Şahin"].sort());
    expect(HAYVAN_ORTALAMA_OMUR).toMatchObject({ Köpek: 14, Kedi: 15, Şahin: 17, Karga: 18, At: 20 });
    for (const tur of EVCIL_HAYVAN_TURLERI) expect(HAYVAN_BONUSLARI[tur]).toHaveLength(2);
  });

  it("yeni hayvanın ömrü ortalama ±2 yıl, bonusu türün iki bonusundan biridir", () => {
    const state = yeniKarakter();
    for (const tur of EVCIL_HAYVAN_TURLERI) {
      const idler = HAYVAN_BONUSLARI[tur].map((b) => b.id as string);
      for (let i = 0; i < 40; i++) {
        const h = yeniEvcilHayvanUret(tur, state);
        expect(h.omur).toBeGreaterThanOrEqual(HAYVAN_ORTALAMA_OMUR[tur] - 2);
        expect(h.omur).toBeLessThanOrEqual(HAYVAN_ORTALAMA_OMUR[tur] + 2);
        expect(idler).toContain(h.bonus_id);
      }
    }
  });

  it("hayvan ekleyince etiketler ve eski tek-alan güncellenir; iki hayvan bonusu birlikte çalışır", () => {
    const state = yeniKarakter();
    evcilHayvanEkle(state, "Kedi");
    evcilHayvanEkle(state, "At");
    expect(state.evcil_hayvanlar).toHaveLength(2);
    expect(state.evcil_hayvan?.tur).toBe("Kedi");
    expect(state.etiketler).toEqual(expect.arrayContaining(["evcil_hayvan_var", "evcil_hayvan_tur:Kedi", "evcil_hayvan_tur:At"]));
    const [kedi, at] = state.evcil_hayvanlar;
    kedi.bonus_id = "kedi_mutluluk";
    at.bonus_id = "at_ticaret";
    expect(hayvanBonusVar(state, "kedi_mutluluk")).toBe(true);
    expect(hayvanBonusVar(state, "at_ticaret")).toBe(true);
    expect(hayvanBonusVar(state, "kopek_savunma")).toBe(false);
  });

  it("yıllık gider hayvan sayısıyla orantılı", () => {
    const state = yeniKarakter();
    expect(giderKalemleriHesapla(state).evcilHayvan).toBe(0);
    evcilHayvanEkle(state, "Köpek");
    const bir = giderKalemleriHesapla(state).evcilHayvan;
    expect(bir).toBeGreaterThan(0);
    evcilHayvanEkle(state, "Kedi");
    expect(giderKalemleriHesapla(state).evcilHayvan).toBeCloseTo(bir * 2, 5);
  });

  it("ömrünü dolduran hayvan ölür, etiketi ve bonusu biter", () => {
    const state = yeniKarakter();
    const h = evcilHayvanEkle(state, "Köpek");
    h.bonus_id = "kopek_savunma";
    h.edinim_yili = state.yil - 10;
    h.omur = 12;
    state.yil += 0; // 10 yıl dolu, ömür 12
    expect(evcilHayvanYillikUygula(state, 1)).toBeNull();
    state.yil += 2;
    const cumle = evcilHayvanYillikUygula(state, 2);
    expect(cumle).toContain(h.isim);
    expect(state.evcil_hayvanlar).toHaveLength(0);
    expect(state.evcil_hayvan).toBeNull();
    expect(state.etiketler).not.toContain("evcil_hayvan_var");
    expect(state.etiketler).not.toContain("evcil_hayvan_tur:Köpek");
    expect(hayvanBonusVar(state, "kopek_savunma")).toBe(false);
  });

  it("eski kayıt: Papağan Karga'ya, Kurt Köpek'e taşınır; ömür ve bonus doldurulur", () => {
    const state = yeniKarakter();
    (state as { evcil_hayvanlar?: unknown }).evcil_hayvanlar = undefined;
    (state as { hayvan_karsilasma_sayisi?: unknown }).hayvan_karsilasma_sayisi = undefined;
    (state as { hayvan_karsilasma_turleri?: unknown }).hayvan_karsilasma_turleri = undefined;
    state.evcil_hayvan = { tur: "Papağan", isim: "Duman" } as CharacterState["evcil_hayvan"];
    state.etiketler.push("evcil_hayvan_var", "evcil_hayvan_tur:Papağan");
    eskiKayitGocu(state);
    expect(state.evcil_hayvanlar).toHaveLength(1);
    expect(state.evcil_hayvanlar[0]).toMatchObject({ tur: "Karga", isim: "Duman" });
    expect(state.evcil_hayvanlar[0].omur).toBeGreaterThan(0);
    expect(state.evcil_hayvanlar[0].bonus_id).not.toBe("");
    expect(state.etiketler).toContain("evcil_hayvan_tur:Karga");
    expect(state.etiketler).not.toContain("evcil_hayvan_tur:Papağan");
    expect(state.hayvan_karsilasma_sayisi).toBe(1);
  });
});

describe("evcil hayvan sistemi: olay havuzları", () => {
  const karsilasmalar = OLAY_BANKASI.filter((o) => o.hayvanKarsilasmaTuru);
  const devamlar = OLAY_BANKASI.filter((o) => o.hayvanTuru);

  it("her tür için 3 Orta Çağ + 3 Sanayi karşılaşması var", () => {
    for (const tur of EVCIL_HAYVAN_TURLERI) {
      const t = karsilasmalar.filter((o) => o.hayvanKarsilasmaTuru === tur);
      expect(t.filter((o) => o.cag === "Orta Çağ")).toHaveLength(3);
      expect(t.filter((o) => o.cag === "Sanayi Devrimi")).toHaveLength(3);
      for (const o of t) {
        expect(o.yasakliEtiketler).toContain(`evcil_hayvan_tur:${tur}`);
        expect(o.secenekler.some((s) => s.basariliSonuc.evcil_hayvan_edin?.tur === tur)).toBe(true);
      }
    }
  });

  it("her tür için her çağda en az 10 devam olayı görünür", () => {
    for (const tur of EVCIL_HAYVAN_TURLERI) {
      const t = devamlar.filter((o) => o.hayvanTuru === tur);
      for (const cag of ["Orta Çağ", "Sanayi Devrimi"]) {
        const gorunur = t.filter((o) => !o.cag || o.cag === cag);
        expect(gorunur.length, `${tur} / ${cag}`).toBeGreaterThanOrEqual(10);
      }
      for (const o of t) expect(o.gerekliEtiketler).toContain(`evcil_hayvan_tur:${tur}`);
    }
  });

  it("Papağan ve Kurt artık hiçbir olayda geçmez", () => {
    const json = JSON.stringify(OLAY_BANKASI);
    expect(json).not.toContain("evcil_hayvan_tur:Papağan");
    expect(json).not.toContain("evcil_hayvan_tur:Kurt");
    expect(json).not.toContain('tur: "Kurt"');
    expect(OLAY_BANKASI.find((o) => o.id === "vahsi_kurt_yavrusu_bulma")).toBeUndefined();
  });

  it("hayvanı olmayan karakter hiçbir devam olayını göremez", () => {
    const state = yeniKarakter();
    for (const o of devamlar) expect(temelUygunMu(o, state)).toBe(false);
  });

  it("karşılaşma kuralları: tavan 2, aynı tür tekrarı yok, 2 hayvan yaşıyorsa yeni edinilemez", () => {
    const state = yeniKarakter();
    state.yas = 30;
    const kopek = karsilasmalar.find((o) => o.hayvanKarsilasmaTuru === "Köpek" && o.cag === state.cag)!;
    const kedi = karsilasmalar.find((o) => o.hayvanKarsilasmaTuru === "Kedi" && o.cag === state.cag)!;
    expect(temelUygunMu(kopek, state)).toBe(true);
    state.hayvan_karsilasma_turleri = ["Köpek"];
    state.hayvan_karsilasma_sayisi = 1;
    expect(temelUygunMu(kopek, state)).toBe(false);
    expect(temelUygunMu(kedi, state)).toBe(true);
    state.hayvan_karsilasma_sayisi = 2;
    expect(temelUygunMu(kedi, state)).toBe(false);
    state.hayvan_karsilasma_sayisi = 1;
    evcilHayvanEkle(state, "At");
    evcilHayvanEkle(state, "Karga");
    expect(temelUygunMu(kedi, state)).toBe(false);
  });
});

describe("evcil hayvan sistemi: pasif bonuslar", () => {
  it("Kedi (mutluluk) olay mutluluk kaybını, Köpek (sağlık) sağlık kaybını hafifletir; At (ticaret) ticaret kazancını artırır", () => {
    const state = yeniKarakter();
    const k = evcilHayvanEkle(state, "Kedi");
    const p = evcilHayvanEkle(state, "Köpek");
    k.bonus_id = "kedi_mutluluk";
    p.bonus_id = "kopek_saglik";
    const etki = { mesaj: "x", mutluluk: -20, saglik: -10, para: 100 };
    hayvanOlayEtkisiUygula(state, etki, "ticaret");
    expect(etki.mutluluk).toBe(-15);
    expect(etki.saglik).toBe(-8);
    expect(etki.para).toBe(100); // At yok
    evcilHayvanEkle(state, "At").bonus_id = "at_ticaret";
    // 2 hayvan tavanı motorda edinme sırasında kontrol edilir; helper doğrudan eklemeyi engellemez
    state.evcil_hayvanlar[2].bonus_id = "at_ticaret";
    const etki2 = { mesaj: "x", para: 100 };
    hayvanOlayEtkisiUygula(state, etki2, "ticaret");
    expect(etki2.para).toBe(107);
    const etki3 = { mesaj: "x", para: 100 };
    hayvanOlayEtkisiUygula(state, etki3, "savas");
    expect(etki3.para).toBe(100);
  });

  it("Köpek (sağlık) veba hastalığında ölüm olasılığını 5 puan düşürür", () => {
    const olum = (kopekli: boolean) => {
      const state = yeniKarakter();
      state.etiketler.push("veba_hastasi");
      state.veba_olum_riski = 55;
      if (kopekli) evcilHayvanEkle(state, "Köpek").bonus_id = "kopek_saglik";
      let oldu = 0;
      const N = 6000;
      for (let i = 0; i < N; i++) {
        state.etiketler = state.etiketler.filter((e) => e !== "veba_hastasi").concat("veba_hastasi");
        state.veba_olum_riski = 55;
        state.saglik = 80;
        if (vebaHastaligiKontrol(state).karakterOldu) oldu++;
      }
      return oldu / N;
    };
    expect(olum(false) - olum(true)).toBeGreaterThan(0.02);
  });
});

describe("evcil hayvan sistemi: motor akışı", () => {
  it("29 yaşında hiç karşılaşma yaşamamış karakterde garantili bir karşılaşma olayı zorlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.yas = 29;
    const senaryo = await senaryoUret(state.id);
    const olay = OLAY_BANKASI.find((o) => o.baslik === senaryo.olay_basligi && o.hayvanKarsilasmaTuru);
    expect(olay).toBeDefined();
    expect(olay!.cag).toBe("Orta Çağ");
  });

  it("karşılaşmayı kabul etmek hayvanı edindirir, sayaç artar ve tür bir daha çıkmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.yas = 29;
    const senaryo = await senaryoUret(state.id);
    const olay = OLAY_BANKASI.find((o) => o.baslik === senaryo.olay_basligi && o.hayvanKarsilasmaTuru)!;
    const tur = olay.hayvanKarsilasmaTuru!;
    const kabulIndex = olay.secenekler.findIndex((s) => s.basariliSonuc.evcil_hayvan_edin);
    // Seçenekler kişilik filtresiyle gizlenmiş olabilir; ham indeksten istemci indeksine çevir.
    const istemciIndex = senaryo.secenekler.findIndex((s) => s.ham_index === kabulIndex);
    state.saglik = 100;
    state.para = 500;
    vi.spyOn(Math, "random").mockReturnValue(0); // zar başarılı
    await secimUygulaVeCoz(state.id, istemciIndex);
    vi.restoreAllMocks();
    expect(state.evcil_hayvanlar.map((h) => h.tur)).toEqual([tur]);
    expect(state.hayvan_karsilasma_sayisi).toBe(1);
    expect(state.hayvan_karsilasma_turleri).toEqual([tur]);
    expect(state.etiketler).toContain(`evcil_hayvan_tur:${tur}`);
    expect(hayvanBonusVar(state, state.evcil_hayvanlar[0].bonus_id as never)).toBe(true);
  });

  it("38 yaşında yalnız 1 karşılaşma yaşamış karaktere ikinci karşılaşma, farklı türden zorlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.hayvan_karsilasma_sayisi = 1;
    state.hayvan_karsilasma_turleri = ["Köpek"];
    state.yas = 38;
    const senaryo = await senaryoUret(state.id);
    const olay = OLAY_BANKASI.find((o) => o.baslik === senaryo.olay_basligi && o.hayvanKarsilasmaTuru);
    expect(olay).toBeDefined();
    expect(olay!.hayvanKarsilasmaTuru).not.toBe("Köpek");
  });

  it("2 karşılaşma yaşanmışsa artık karşılaşma zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.hayvan_karsilasma_sayisi = 2;
    state.hayvan_karsilasma_turleri = ["Köpek", "Kedi"];
    state.yas = 45;
    for (let i = 0; i < 25; i++) {
      const senaryo = await senaryoUret(state.id);
      expect(OLAY_BANKASI.find((o) => o.baslik === senaryo.olay_basligi && o.hayvanKarsilasmaTuru)).toBeUndefined();
      const acik = senaryo.secenekler.findIndex((x) => !x.kilitli);
      await secimUygulaVeCoz(state.id, Math.max(0, acik));
      if (!state.aktif) break;
      state.saglik = 100;
      state.para = Math.max(state.para, 200);
      state.yas = 45;
    }
  }, 60000);

  it("sahipliğin 7. yılında hayvanın türüne özel TEK bir devam olayı zorlanır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    digerZorunluOlaylariGecistir(state);
    state.hayvan_karsilasma_sayisi = 1;
    state.hayvan_karsilasma_turleri = ["Şahin"];
    state.yas = 32;
    const h = evcilHayvanEkle(state, "Şahin");
    h.edinim_yasi = 25;
    h.edinim_yili = state.yil - 7;
    h.omur = 17;
    const senaryo = await senaryoUret(state.id);
    const olay = OLAY_BANKASI.find((o) => o.baslik === senaryo.olay_basligi && o.hayvanTuru === "Şahin");
    expect(olay).toBeDefined();
  });
});
