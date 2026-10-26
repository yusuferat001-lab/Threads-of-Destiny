import { describe, it, expect } from "vitest";
import { createCharacter, mesleğiSec, etiketEkle, durumlariUygula, durumEkle } from "../src/game/stateManager";
import { olaySec } from "../src/game/olaySecici";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
} from "../src/game/gameEngine";
import { evcilHayvanEkle } from "../src/game/stateManager";
import { OLAY_HIZIP_ZANAATKAR } from "../src/data/olaylar/hizipZanaatkar";
import { OLAY_BANKASI } from "../src/data/olaylar";
import type { SecimSonucu, TepkiSonucu } from "../src/types";

/** Rastgele olayın şıkkı kilitli/pahalı olabilir: ilk uygulanabilir şıkkı dener; ara_tepki'yi çözer. */
async function sec(id: string, index: number, _u?: boolean): Promise<SecimSonucu> {
  let sonuc: SecimSonucu | TepkiSonucu | undefined;
  let hata: unknown;
  for (const i of [index, 0, 1, 2, 3]) {
    try {
      sonuc = await secimUygula(id, i);
      break;
    } catch (e) {
      hata = e;
    }
  }
  if (!sonuc) throw hata;
  if ("ara_tepki" in sonuc) sonuc = await secimUygula(id, 1);
  return sonuc as SecimSonucu;
}

async function hazirOyun() {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  etiketEkle(state, ["hizip_secildi", "yolculuk_tamamlandi"]);
  state.ulke.savasta = true; // tarihi savaş ilanı araya girmesin
  state.para = 500; // rastgele olayın şık maliyeti testi bozmasın
  return state;
}

describe("durumlar yıl sayar", () => {
  it("yıllık etki geçen yıl sayısıyla çarpılır, süre yıl olarak düşer, bitince etiket eklenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 80;
    durumEkle(state, {
      id: "test",
      ad: "Test Hastalığı",
      tur: "gecici",
      kalan_yil: 3,
      yil_basi_saglik: -2,
      bitince_etiket: "test:bitti",
    });
    durumlariUygula(state, 2);
    expect(state.saglik).toBe(76);
    expect(state.durumlar[0].kalan_yil).toBe(1);
    expect(state.etiketler).not.toContain("test:bitti");
    durumlariUygula(state, 2);
    expect(state.durumlar).toHaveLength(0);
    expect(state.etiketler).toContain("test:bitti");
  });

  it("0 yıllık adımda (yolculuk yarım adımı) etki ve süre değişmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.saglik = 80;
    durumEkle(state, { id: "t", ad: "T", tur: "gecici", kalan_yil: 2, yil_basi_saglik: -5 });
    durumlariUygula(state, 0);
    expect(state.saglik).toBe(80);
    expect(state.durumlar[0].kalan_yil).toBe(2);
  });
});

describe("evcil hayvan olayları rastgele havuzdan çıkar", () => {
  it("hayvanı olan karakter de rastgele seçimde hayvan karşılaşma/devam olayı görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yas = 33;
    evcilHayvanEkle(state, "Kedi");
    for (let i = 0; i < 600; i++) {
      const { olay } = olaySec(state);
      expect(olay.hayvanTuru).toBeUndefined();
      expect(olay.hayvanKarsilasmaTuru).toBeUndefined();
    }
  });
});

describe("Zanaatkâr hizipleri artık kendi olaylarına sahip", () => {
  it("iki hizbe de 10'ar olay var, hepsi hizip etiketine bağlı ve bankada kayıtlı", () => {
    for (const hizip of ["Lonca Meclisi", "Serbest Ustalar"]) {
      const olaylar = OLAY_HIZIP_ZANAATKAR.filter((o) => o.gerekliEtiketler?.includes(`hizip:${hizip}`));
      expect(olaylar).toHaveLength(10);
      for (const o of olaylar) {
        expect(o.meslekler).toEqual(["Zanaatkâr"]);
        expect(OLAY_BANKASI.some((b) => b.id === o.id)).toBe(true);
      }
    }
  });

  it("Lonca Meclisi'ne katılan Zanaatkâr kendi hizbinin olaylarını görür, diğer hizbinkileri görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 30;
    mesleğiSec(state, "Zanaatkâr");
    state.hizip = "Lonca Meclisi";
    state.etiketler.push("hizip:Lonca Meclisi", "hizip_secildi");
    const kendi = new Set(OLAY_HIZIP_ZANAATKAR.filter((o) => o.gerekliEtiketler?.includes("hizip:Lonca Meclisi")).map((o) => o.baslik));
    const yabanci = new Set(OLAY_HIZIP_ZANAATKAR.filter((o) => o.gerekliEtiketler?.includes("hizip:Serbest Ustalar")).map((o) => o.baslik));
    let kendiGorundu = false;
    for (let i = 0; i < 1500; i++) {
      const { senaryo } = olaySec(state);
      expect(yabanci.has(senaryo.olay_basligi)).toBe(false);
      if (kendi.has(senaryo.olay_basligi)) kendiGorundu = true;
    }
    expect(kendiGorundu).toBe(true);
  });
});

describe("garanti tekrarı hatası düzeldi", () => {
  it("hizip takip garantisi aynı olayı art arda zorlamaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    etiketEkle(state, ["hizip_secildi", "yolculuk_tamamlandi", "yol:zanaatkar:lonca_sadik"]);
    state.hizip = "Lonca Meclisi";
    state.etiketler.push("hizip:Lonca Meclisi");
    state.ulke.savasta = true;
    state.hayvan_karsilasma_sayisi = 2;
    state.etiketler.push("tanisma_donum_25", "tanisma_donum_40");
    state.gecmis_olaylar.push("oc_zanaatkar_yol_ilk_siparis", "gizem_ejderha_tilsimi");
    state.yas = 62;
    const gorulen: string[] = [];
    for (let i = 0; i < 4; i++) {
      const senaryo = await senaryoUret(state.id);
      gorulen.push(senaryo.olay_basligi);
      const s = await sec(state.id, 0);
      if (!s.state.aktif) break;
    }
    // Eskiden aynı genel hizip olayı hedef dolana kadar her turda tekrar zorlanıyordu.
    expect(new Set(gorulen).size).toBeGreaterThan(1);
  });
});

describe("yolculuk teklifi kilide denk gelirse kaçmaz", () => {
  async function teklifOyunu(yas: number, teklifEdildi: boolean) {
    const state = await hazirOyun();
    state.etiketler = state.etiketler.filter((e) => e !== "yolculuk_tamamlandi");
    state.yas = yas;
    state.hayvan_karsilasma_sayisi = 2;
    etiketEkle(state, ["tanisma_donum_25", "tanisma_donum_40", "sehir_yonetimi_basladi", "yol:tuccar:durust", "saray_daveti_goruldu"]);
    state.gecmis_olaylar.push("oc_tuccar_yol_ilk_anlasma");
    if (teklifEdildi) etiketEkle(state, ["yolculuk_teklifi_edildi"]);
    return state;
  }
  const TEKLIFLER = ["yolculuk_kesif_teklif", "yolculuk_mucit_teklif", "sd_somurge_gitme_karari"];

  it("hiç teklif edilmediyse 35-40 yaşında da teklif gelir", async () => {
    const state = await teklifOyunu(38, false);
    const bir = await senaryoUret(state.id);
    expect(TEKLIFLER.some((id) => OLAY_BANKASI.find((o) => o.id === id)?.baslik === bir.olay_basligi)).toBe(true);
  });

  it("teklif edilip reddedildiyse 35 yaşından sonra tekrar zorlanmaz", async () => {
    const state = await teklifOyunu(38, true);
    etiketEkle(state, ["yolculuk_teklifi_zamani"]);
    const bir = await senaryoUret(state.id);
    expect(TEKLIFLER.some((id) => OLAY_BANKASI.find((o) => o.id === id)?.baslik === bir.olay_basligi)).toBe(false);
  });
});
