import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec, etiketEkle } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, senaryoUret } from "../src/game/gameEngine";

function hizbeKatil(state: ReturnType<typeof createCharacter>, hizip: string) {
  state.hizip = hizip;
  state.etiketler.push(`hizip:${hizip}`, "hizip_secildi");
}

describe("hizbe özel olaylar", () => {
  it("Eski Muhafızlar'a katılan asker, Yeni Nizam'a özel olayları hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    hizbeKatil(state, "Eski Muhafızlar");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 800; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("İhtilalin Ayak Sesleri");
      expect(senaryo.olay_basligi).not.toBe("Barut Kokusu");
      expect(senaryo.olay_basligi).not.toBe("Karanlık Liderlik");
      if (senaryo.olay_basligi === "Kanla Yazılan Yemin") kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("Yeni Nizam'a katılan asker, Eski Muhafızlar'a özel olayları hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    hizbeKatil(state, "Yeni Nizam");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 800; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Kanla Yazılan Yemin");
      expect(senaryo.olay_basligi).not.toBe("Karanlık Operasyon");
      expect(senaryo.olay_basligi).not.toBe("Paşaların Savaşı");
      if (senaryo.olay_basligi === "İhtilalin Ayak Sesleri") kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("Liman Loncası'na katılan tüccar, Pazar Birliği'ne özel olayları hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Tüccar");
    hizbeKatil(state, "Liman Loncası");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 800; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Boykot Sancısı");
      expect(senaryo.olay_basligi).not.toBe("Resmi Makamların Gölgesi");
      if (senaryo.olay_basligi === "Acımasız Tarife") kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("Gelenekçiler'e katılan din adamı, Yenilikçiler'e özel olayları hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Din Adamı");
    hizbeKatil(state, "Gelenekçiler");

    let kendiOlayiGorundu = false;
    for (let i = 0; i < 800; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Yeni Bir Yorum");
      expect(senaryo.olay_basligi).not.toBe("Susturma Girişimi");
      if (senaryo.olay_basligi === "Eski Ritüeller") kendiOlayiGorundu = true;
    }
    expect(kendiOlayiGorundu).toBe(true);
  });

  it("hizbi olmayan karakter hiçbir hizbe özel olayı görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 25;
    mesleğiSec(state, "Asker");
    expect(state.hizip).toBeNull();
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Kanla Yazılan Yemin");
      expect(senaryo.olay_basligi).not.toBe("İhtilalin Ayak Sesleri");
    }
  });
});

describe("bekarlık olayları", () => {
  it("evli karakter bekarlık olaylarını hiç görmez", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 30;
    mesleğiSec(state, "Tüccar");
    state.etiketler.push("medeni:evli");
    for (let i = 0; i < 500; i++) {
      const { senaryo } = olaySec(state);
      expect(senaryo.olay_basligi).not.toBe("Bekarlığın Özgürlüğü");
      expect(senaryo.olay_basligi).not.toBe("Ne Zaman Evleneceksin?");
    }
  });

  it("hiç evlenmemiş yetişkin karakter bekarlık olaylarını görebilir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    state.yas = 30;
    mesleğiSec(state, "Tüccar");
    expect(state.etiketler.includes("medeni:evli")).toBe(false);
    let gorundu = false;
    for (let i = 0; i < 800 && !gorundu; i++) {
      const { senaryo } = olaySec(state);
      if (senaryo.olay_basligi === "Bekarlığın Özgürlüğü" || senaryo.olay_basligi === "Ne Zaman Evleneceksin?") {
        gorundu = true;
      }
    }
    expect(gorundu).toBe(true);
  });
});

/**
 * Hizip zorunlu seçim (2026-09 sonu, kullanıcı isteği: "hizip zorunlu çıkacak,
 * birini seçicen"). `senaryoUret` kaskadını (§11 kural 2'nin hemen ardı)
 * gerçek `yeniOyun`/`mesleğiAta` akışıyla test eder — `izoleKarakterOlustur`
 * (havuzGarantisi.test.ts) ile aynı desende, kariyer yolu girişini (daha
 * yüksek öncelikli bir kaskad kuralı) uydurma bir `yol:` etiketiyle atlıyoruz
 * ki hizip kuralı gözlemlenebilsin.
 */
describe("hizip zorunlu seçim (2026-09 sonu)", () => {
  const MESLEK_BEKLENEN: Record<string, { yolOnEki: string; baslik: string }> = {
    Asker: { yolOnEki: "yol:asker:", baslik: "Kışlada Bölünme" },
    Tüccar: { yolOnEki: "yol:tuccar:", baslik: "Pazarın Hakimi Kim?" },
    "Din Adamı": { yolOnEki: "yol:din:", baslik: "Kutsal Bölünme" },
  };

  for (const meslek of Object.keys(MESLEK_BEKLENEN)) {
    it(`${meslek}: 18 yaşında henüz hizip seçmemiş karakter saflaşma olayına zorlanır (nötr şık yok)`, async () => {
      const { yolOnEki, baslik } = MESLEK_BEKLENEN[meslek];
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      await mesleğiAta(state.id, meslek);
      state.ulke.savasta = true; // tarihi savaş ilanı kuralını atla
      etiketEkle(state, [`${yolOnEki}__test_dal__`]); // kariyer yolu girişini atla
      state.yas = 20;
      const senaryo = await senaryoUret(state.id);
      expect(senaryo.olay_basligi).toBe(baslik);
      expect(senaryo.secenekler).toHaveLength(2); // "Tarafsız kal" yok, yalnız iki taraf
    });
  }

  it("Asker/Tüccar/Din Adamı: 18 yaşından önce zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.ulke.savasta = true;
    etiketEkle(state, ["yol:asker:__test_dal__"]);
    state.yas = 16;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe("Kışlada Bölünme");
  });

  it("hizip zaten seçilmişse bir daha zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Asker");
    state.ulke.savasta = true;
    etiketEkle(state, ["yol:asker:__test_dal__", "hizip_secildi"]);
    state.yas = 20;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe("Kışlada Bölünme");
  });

  it("Zanaatkâr: S1'de (rütbe seviye 1) zorlanmaz", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    state.ulke.savasta = true;
    etiketEkle(state, ["yol:zanaatkar:__test_dal__"]);
    state.yas = 40;
    state.rutbe_seviye = 1;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).not.toBe("Loncanın İçi Karıştı");
  });

  it("Zanaatkâr: rütbe seviye 2'ye (kalfalık) ulaşınca zorlanır (nötr şık yok)", async () => {
    // senaryoUret bir oturumda mevcut senaryoyu çözülene kadar önbelleğe alıyor
    // (bkz. §10) — bu yüzden S1→S2 geçişini AYNI karakterde ikinci bir
    // senaryoUret çağrısıyla test edemeyiz; ayrı, doğrudan S2'de yaratılan bir
    // karakter kullanıyoruz (diğer eşik testleriyle aynı desen).
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Zanaatkâr");
    state.ulke.savasta = true;
    etiketEkle(state, ["yol:zanaatkar:__test_dal__"]);
    state.yas = 40;
    state.rutbe_seviye = 2;
    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Loncanın İçi Karıştı");
    expect(senaryo.secenekler).toHaveLength(2);
  });
});
