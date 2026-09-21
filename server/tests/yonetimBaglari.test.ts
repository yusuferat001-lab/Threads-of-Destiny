import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec, yonetimYillikUygula } from "../src/game/stateManager";
import {
  yeniOyun,
  mesleğiAta,
  yonetimDurumGetir,
  yonetimEtkilesimYap,
  yonetimIstekYap,
  yonetimTalebiKararlastir,
} from "../src/game/gameEngine";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function oturum(): Promise<CharacterState> {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, "Tüccar");
  state.para = 500;
  state.yas = 30;
  return state;
}

describe("yonetimDurumGetir", () => {
  it("iki hattı, etkileşim kataloğunu ve istek listesini döndürür", async () => {
    const state = await oturum();
    const durum = await yonetimDurumGetir(state.id);
    expect(durum.yonetici.ad).toBeTruthy();
    expect(durum.patron.ad).toBeTruthy();
    expect(durum.etkilesimler.some((e) => e.id === "yonetici:bagis")).toBe(true);
    expect(durum.etkilesimler.some((e) => e.id === "yonetici:hediye")).toBe(false); // hediye bağışla birleşti
    expect(durum.yonetici.bagisKademeleri.length).toBeGreaterThan(0);
    expect(durum.patron.bagisKademeleri.length).toBeGreaterThan(0);
    // Kral bağışı işle ilgili kişininkinden belirgin pahalı.
    expect(durum.yonetici.bagisKademeleri[0]).toBeGreaterThan(durum.patron.bagisKademeleri[0]);
    expect(typeof durum.bikkinlik).toBe("number");
    expect(durum.istekler.some((i) => i.id === "zam" && i.hat === "patron")).toBe(true);
    // Düşük ilişkiyle istekler kilitli.
    expect(durum.istekler.every((i) => !i.acik)).toBe(true);
  });
});

describe("yonetimEtkilesimYap", () => {
  it("seçilen bağış tutarı parayı düşürür, ilişkiyi artırır, cooldown yazar; ikinci çağrı reddedilir", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // tam etki, ifşa/ters yok
    const state = await oturum();
    const durum = await yonetimDurumGetir(state.id);
    const tutar = durum.patron.bagisKademeleri[1];
    const oncekiPara = state.para;

    const sonuc = await yonetimEtkilesimYap(state.id, "patron:bagis", tutar);
    expect(sonuc.state.para).toBe(oncekiPara - tutar);
    expect(sonuc.state.patron_iliski).toBeGreaterThan(40);
    expect(sonuc.state.yonetim_etkilesim_kilit["patron:bagis"]).toBeGreaterThan(sonuc.state.yil);

    await expect(yonetimEtkilesimYap(state.id, "patron:bagis", tutar)).rejects.toThrow();
  });

  it("geçersiz bağış tutarı reddedilir", async () => {
    const state = await oturum();
    await expect(yonetimEtkilesimYap(state.id, "patron:bagis", 7)).rejects.toThrow();
    await expect(yonetimEtkilesimYap(state.id, "patron:bagis")).rejects.toThrow();
  });

  it("çok sık üstüne gidilince ters teper: ilişki düşer", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // ters tepme zarını geçer
    const state = await oturum();
    state.yonetim_yakin_etkilesim = 6; // bikkinlik yüksek
    const sonuc = await yonetimEtkilesimYap(state.id, "patron:hizmet");
    expect(sonuc.tam).toBe(false);
    expect(sonuc.state.patron_iliski).toBeLessThan(40);
  });

  it("yağcılık (yalan) ahlak ve mutluluğu düşürür ama parasızdır", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // tam etki, ifşa yok (0.5 > 0.25)
    const state = await oturum();
    const oncekiPara = state.para;
    const oncekiAhlak = state.ahlak;
    const oncekiMutluluk = state.mutluluk;

    const sonuc = await yonetimEtkilesimYap(state.id, "patron:yalan");
    expect(sonuc.state.para).toBe(oncekiPara);
    expect(sonuc.state.ahlak).toBeLessThan(oncekiAhlak);
    expect(sonuc.state.mutluluk).toBeLessThan(oncekiMutluluk);
    expect(sonuc.state.patron_iliski).toBeGreaterThan(40);
  });

  it("yağcılık ifşa olursa ilişki ve şöhret düşer", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.05); // 0.05 < 0.25 → ifşa
    const state = await oturum();
    const sonuc = await yonetimEtkilesimYap(state.id, "yonetici:yalan");
    expect(sonuc.state.yonetim_iliski).toBeLessThan(40);
  });
});

describe("yonetimIstekYap", () => {
  it("ilişki eşiğin altındaysa reddedilir", async () => {
    const state = await oturum();
    state.suc_seviyesi = 60;
    await expect(yonetimIstekYap(state.id, "sicil_temizligi")).rejects.toThrow();
  });

  it("eşik aşıldığında ilişki bedeli düşer ve etki uygulanır", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // rollSuccess geçer
    const state = await oturum();
    state.suc_seviyesi = 60;
    state.yonetim_iliski = 85;

    const sonuc = await yonetimIstekYap(state.id, "sicil_temizligi");
    expect(sonuc.basarili).toBe(true);
    expect(sonuc.state.suc_seviyesi).toBe(20); // max(10, 60 - 40)
    expect(sonuc.state.yonetim_iliski).toBeLessThan(85); // bedel düştü
    expect(sonuc.state.yonetim_etkilesim_kilit["yonetici:istek:sicil_temizligi"]).toBeGreaterThan(
      sonuc.state.yil
    );
  });

  it("yalanla desteklemek ahlakı düşürür", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // ifşa yok (0.5 > 0.22), rollSuccess ~geçer
    const state = await oturum();
    state.patron_iliski = 80;
    const oncekiAhlak = state.ahlak;
    const sonuc = await yonetimIstekYap(state.id, "zam", { yalan: true });
    expect(sonuc.state.ahlak).toBeLessThan(oncekiAhlak);
  });
});

describe("yonetimTalebiKararlastir", () => {
  function bagisTalebiEkle(state: CharacterState) {
    state.yonetim_talep = {
      id: "t1",
      kimden: "yonetici",
      kimAdi: "Vali",
      tur: "bagis",
      tutar: 40,
      kalem: "saray onarımı için bağış",
      sonYil: state.yil + 3,
    };
  }

  it("kabul: bağış parası düşer, ilişki artar, talep temizlenir", async () => {
    const state = await oturum();
    bagisTalebiEkle(state);
    const oncekiIliski = state.yonetim_iliski;
    const sonuc = await yonetimTalebiKararlastir(state.id, "kabul");
    expect(sonuc.kabul).toBe(true);
    expect(sonuc.state.para).toBe(460);
    expect(sonuc.state.yonetim_iliski).toBeGreaterThan(oncekiIliski);
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("ret: ilişki ve şöhret düşer, talep temizlenir", async () => {
    const state = await oturum();
    state.un = 50;
    bagisTalebiEkle(state);
    const sonuc = await yonetimTalebiKararlastir(state.id, "ret");
    expect(sonuc.state.yonetim_iliski).toBeLessThan(40);
    expect(sonuc.state.un).toBeLessThan(50);
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("yalan: ahlak/mutluluk düşer; temiz kaçış dalı parayı korur", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9); // 0.9 > 0.3 → temiz kaçış
    const state = await oturum();
    bagisTalebiEkle(state);
    const oncekiPara = state.para;
    const sonuc = await yonetimTalebiKararlastir(state.id, "yalan");
    expect(sonuc.state.ahlak).toBeLessThan(50);
    expect(sonuc.state.para).toBe(oncekiPara); // temiz kaçışta para gitmez
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("yalan: ifşa dalında hem para hem itibar gider", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // 0.1 < 0.3 → ifşa
    const state = await oturum();
    bagisTalebiEkle(state);
    const sonuc = await yonetimTalebiKararlastir(state.id, "yalan");
    expect(sonuc.state.para).toBe(460); // bağış yine de düşer
    expect(sonuc.state.yonetim_talep).toBeNull();
  });
});

describe("yonetimYillikUygula", () => {
  it("ilgilenilmeyen iki hat zamanla soğur", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yonetim_iliski = 60;
    state.patron_iliski = 60;
    yonetimYillikUygula(state, 2);
    expect(state.yonetim_iliski).toBeLessThan(60);
    expect(state.patron_iliski).toBeLessThan(60);
  });

  it("süresi dolan talep ilişki + mutluluk cezası verir ve temizlenir", () => {
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yil = 1200;
    state.yonetim_iliski = 50;
    state.mutluluk = 60;
    state.yonetim_talep_sonraki_yil = 1300; // aynı çağrıda yeni talep üretilmesin
    state.yonetim_talep = {
      id: "t3",
      kimden: "yonetici",
      kimAdi: "Vali",
      tur: "sadakat",
      tutar: 0,
      kalem: "bağlılık yemini",
      sonYil: 1198,
    };
    const not = yonetimYillikUygula(state, 1);
    expect(state.yonetim_talep).toBeNull();
    expect(state.yonetim_iliski).toBeLessThan(50);
    expect(state.mutluluk).toBeLessThan(60);
    expect(not).toBeTruthy();
  });

  it("uygun koşulda yeni talep üretebilir", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.01); // < 0.13 → talep üret
    const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(state, "Tüccar");
    state.yil = 1300;
    state.yonetim_talep_sonraki_yil = 1290;
    yonetimYillikUygula(state, 1);
    expect(state.yonetim_talep).not.toBeNull();
  });
});
