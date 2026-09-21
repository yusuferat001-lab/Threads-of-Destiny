import { describe, it, expect } from "vitest";
import { olaySec } from "../src/game/olaySecici";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";

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
