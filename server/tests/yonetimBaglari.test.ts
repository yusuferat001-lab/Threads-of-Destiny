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

/** Eski iki hatlı düzen (kral + patron) işletmesi olmayan mesleklerde sürer: Asker/Din Adamı. */
async function oturum(meslek = "Asker"): Promise<CharacterState> {
  const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(state.id, meslek);
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

  it("sermaye_destegi Asker'de ordu teçhizatını artırır", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // rollSuccess geçer
    const state = await oturum();
    state.patron_iliski = 90;
    const once = state.ordu_techizat_seviyesi;
    const sonuc = await yonetimIstekYap(state.id, "sermaye_destegi");
    expect(sonuc.basarili).toBe(true);
    expect(sonuc.state.ordu_techizat_seviyesi).toBe(Math.min(100, once + 10));
  });

  it("işletmeli meslekte eski patron istekleri ve kral istekleri yoktur", async () => {
    const state = await oturum("Tüccar");
    state.patron_iliski = 90;
    await expect(yonetimIstekYap(state.id, "sermaye_destegi")).rejects.toThrow();
    await expect(yonetimIstekYap(state.id, "zam")).rejects.toThrow();
    await expect(yonetimIstekYap(state.id, "terfi_destegi")).rejects.toThrow();
    await expect(yonetimIstekYap(state.id, "vergi_kayirma")).rejects.toThrow();
  });
});

describe("şehir yöneticisi (işletmeli meslekler: tek otorite)", () => {
  it("tek otorite: durum 'tekOtorite', yalnız yonetici etkileşimleri, mesleğe özel istek listesi", async () => {
    const t = await oturum("Tüccar");
    const dt = await yonetimDurumGetir(t.id);
    expect(dt.tekOtorite).toBe(true);
    expect(dt.etkilesimler.every((e) => e.hat === "yonetici")).toBe(true);
    const idler = dt.istekler.map((i) => i.id);
    expect(idler).toEqual(expect.arrayContaining(["vergi_indirimi", "pazar_imtiyazi", "gumruk_muafiyeti", "tekel_ruhsati"]));
    expect(idler).not.toContain("hammadde_tahsisi");
    expect(idler).not.toContain("terfi_destegi");
    expect(idler).not.toContain("zam");
    expect(dt.yonetici.unvan).toBe("Prévôt");
    const z = await oturum("Zanaatkâr");
    const idz = (await yonetimDurumGetir(z.id)).istekler.map((i) => i.id);
    expect(idz).toEqual(expect.arrayContaining(["vergi_indirimi", "hammadde_tahsisi", "atolye_ruhsati", "resmi_siparis"]));
    expect(idz).not.toContain("pazar_imtiyazi");
    const a = await oturum("Asker");
    const ida = (await yonetimDurumGetir(a.id)).istekler.map((i) => i.id);
    expect(ida).not.toContain("vergi_indirimi");
    expect(ida).toContain("terfi_destegi");
  });

  it("hediye +5/+10/+18 (45/100/220), hizmet +7, yağcılık +8; cooldown 4/3/4 yıl", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5); // tam etki, ifşa/ters yok (0.5 > 0.4)
    const state = await oturum("Tüccar");
    state.para = 5000;
    state.yonetim_iliski = 30;
    const kademeler = (await yonetimDurumGetir(state.id)).yonetici.bagisKademeleri;
    expect(kademeler).toEqual([45, 100, 220]);
    const s1 = await yonetimEtkilesimYap(state.id, "yonetici:bagis", kademeler[2]);
    expect(s1.state.yonetim_iliski).toBe(48);
    expect(s1.state.yonetim_etkilesim_kilit["yonetici:bagis"]).toBe(s1.state.yil + 4);
    const s2 = await yonetimEtkilesimYap(state.id, "yonetici:hizmet");
    expect(s2.state.yonetim_iliski).toBe(55);
    expect(s2.state.yonetim_etkilesim_kilit["yonetici:hizmet"]).toBe(s2.state.yil + 3);
    const s3 = await yonetimEtkilesimYap(state.id, "yonetici:yalan");
    expect(s3.state.yonetim_iliski).toBe(63);
    expect(s3.state.yonetim_etkilesim_kilit["yonetici:yalan"]).toBe(s3.state.yil + 4);
  });

  it("vergi indirimi: eşik 70, başarıda oran 10 yıl yarıya iner, ilişki bedeli 24; başarısızda kısa (4 yıl) bekleme", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const state = await oturum("Tüccar");
    state.yonetim_iliski = 69;
    await expect(yonetimIstekYap(state.id, "vergi_indirimi")).rejects.toThrow();
    state.yonetim_iliski = 80;
    const sonuc = await yonetimIstekYap(state.id, "vergi_indirimi");
    expect(sonuc.basarili).toBe(true);
    expect(sonuc.state.vergi_carpan).toBe(0.5);
    expect(sonuc.state.vergi_carpan_bitis_yili).toBe(sonuc.state.yil + 9);
    expect(sonuc.state.yonetim_iliski).toBe(56);
    expect(sonuc.state.yonetim_etkilesim_kilit["yonetici:istek:vergi_indirimi"]).toBe(sonuc.state.yil + 10);
  });

  it("istek şansı sabit (56–66) ve ilişkiden bağımsız; rüşvet +17–21 ekler", async () => {
    const state = await oturum("Tüccar");
    state.yonetim_iliski = 100;
    const d = await yonetimDurumGetir(state.id);
    for (const i of d.istekler) {
      expect(i.tahminiSans).toBeGreaterThanOrEqual(56);
      expect(i.tahminiSans).toBeLessThanOrEqual(66);
      expect(i.rusvetBonus).toBeGreaterThanOrEqual(17);
      expect(i.rusvetBonus).toBeLessThanOrEqual(21);
    }
    state.yonetim_iliski = 72;
    const d2 = await yonetimDurumGetir(state.id);
    for (const i of d.istekler) expect(d2.istekler.find((x) => x.id === i.id)!.tahminiSans).toBe(i.tahminiSans);
    const vi_ = d.istekler.find((i) => i.id === "vergi_indirimi")!;
    expect(vi_.iliskiBedeli).toBe(24);
    expect(vi_.minIliski).toBe(70);
  });

  it("şehir yöneticisine yağcılık ifşa olursa ilişki −5 ve şöhret −4 (eski −16 değil)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // ifşa (0.1 < 0.4)
    const state = await oturum("Tüccar");
    state.yonetim_iliski = 50;
    state.un = 50;
    const unOnce = state.un;
    const sonuc = await yonetimEtkilesimYap(state.id, "yonetici:yalan");
    expect(sonuc.state.yonetim_iliski).toBe(45);
    expect(sonuc.state.un).toBe(unOnce - 4);
  });

  it("rüşvet: şans taban + bonus, tek bedel ahlak −5; rüşvet başarısız olsa da başka yan etki yok", async () => {
    const state = await oturum("Tüccar");
    state.yonetim_iliski = 90;
    const d = await yonetimDurumGetir(state.id);
    const vi_ = d.istekler.find((i) => i.id === "vergi_indirimi")!;
    expect(vi_.tahminiSans).toBe(60);
    expect(vi_.rusvetBonus).toBe(18);
    // Başarısız zar (0.99 > 0.78): ahlak −5, ilişki bedelinin yarısı, aranma/şöhret/ün değişmez.
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    const ahlakOnce = state.ahlak;
    const sucOnce = state.suc_seviyesi;
    const unOnce = state.un;
    const sonuc = await yonetimIstekYap(state.id, "vergi_indirimi", true);
    expect(sonuc.basarili).toBe(false);
    expect(sonuc.state.ahlak).toBe(ahlakOnce - 5);
    expect(sonuc.state.suc_seviyesi).toBe(sucOnce);
    expect(sonuc.state.un).toBe(unOnce);
    expect(sonuc.state.yonetim_iliski).toBe(90 - 12);
  });

  it("rüşvet şansı artırır: taban 60 ile başarısız sayılacak zar (0.70), rüşvetle (78) başarılı olur", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.7);
    const a = await oturum("Tüccar");
    a.yonetim_iliski = 90;
    expect((await yonetimIstekYap(a.id, "vergi_indirimi")).basarili).toBe(false);
    const b = await oturum("Tüccar");
    b.yonetim_iliski = 90;
    expect((await yonetimIstekYap(b.id, "vergi_indirimi", true)).basarili).toBe(true);
  });

  it("eski mesleklerde (Asker) rüşvet yoktur", async () => {
    const a = await oturum("Asker");
    a.yonetim_iliski = 90;
    await expect(yonetimIstekYap(a.id, "terfi_destegi", true)).rejects.toThrow();
  });

  it("tüccar imtiyazı 5 yıl sürer; tekel ruhsatı bir hatta bağlanır; resmi sipariş Zanaatkâr'a para + pay verir", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const t = await oturum("Tüccar");
    t.yonetim_iliski = 90;
    await yonetimIstekYap(t.id, "pazar_imtiyazi");
    expect(t.isletme!.imtiyazlar!.pazar_imtiyazi).toBe(t.yil + 4);
    t.yonetim_iliski = 90;
    await yonetimIstekYap(t.id, "tekel_ruhsati");
    expect(t.isletme!.tekel_hat).toBeTruthy();
    const z = await oturum("Zanaatkâr");
    z.yonetim_iliski = 90;
    const para = z.para;
    const sonuc = await yonetimIstekYap(z.id, "resmi_siparis");
    expect(sonuc.state.para).toBeGreaterThan(para);
  });

  it("talep reddi kaçmak değildir: şehir yöneticisine yalan söylenebilir, aranma artmaz", async () => {
    const state = await oturum("Tüccar");
    state.suc_seviyesi = 10;
    state.yonetim_talep = {
      id: "t9", kimden: "yonetici", kimAdi: "x", tur: "bagis", tutar: 40, kalem: "şehir surlarının onarımı için katkı", sonYil: state.yil + 3,
    };
    const sonuc = await yonetimTalebiKararlastir(state.id, "ret");
    expect(sonuc.state.suc_seviyesi).toBe(10);
    state.yonetim_talep = {
      id: "t10", kimden: "yonetici", kimAdi: "x", tur: "bagis", tutar: 40, kalem: "şehir surlarının onarımı için katkı", sonYil: state.yil + 3,
    };
    await expect(yonetimTalebiKararlastir(state.id, "yalan")).resolves.toBeTruthy();
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

  function patronBagisTalebiEkle(state: CharacterState) {
    state.yonetim_talep = {
      id: "t2",
      kimden: "patron",
      kimAdi: "Usta",
      tur: "bagis",
      tutar: 40,
      kalem: "atölye masrafı için katkı",
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

  it("ret (hükümdar = kaç): ilişki ve şöhret düşer, aranma ciddi artar, talep temizlenir", async () => {
    const state = await oturum();
    state.un = 50;
    state.suc_seviyesi = 10;
    bagisTalebiEkle(state);
    const sonuc = await yonetimTalebiKararlastir(state.id, "ret");
    expect(sonuc.state.yonetim_iliski).toBeLessThan(40);
    expect(sonuc.state.un).toBeLessThan(50);
    expect(sonuc.state.yonetim_talep).toBeNull();
    // Hükümdardan kaçmak yalnızca ilişki sorunu değil, "büyük suç" aralığında (20-26) bir aranma artışıdır.
    expect(sonuc.state.suc_seviyesi).toBeGreaterThanOrEqual(10 + 20);
    expect(sonuc.state.suc_seviyesi).toBeLessThanOrEqual(10 + 26);
  });

  it("ret (patron): aranmaya dokunmaz, sadece ilişki/şöhret düşer", async () => {
    const state = await oturum();
    state.suc_seviyesi = 10;
    patronBagisTalebiEkle(state);
    const sonuc = await yonetimTalebiKararlastir(state.id, "ret");
    expect(sonuc.state.suc_seviyesi).toBe(10);
  });

  it("hükümdara 'yalan' kararı reddedilir — sadece öde ya da kaç var", async () => {
    const state = await oturum();
    bagisTalebiEkle(state);
    await expect(yonetimTalebiKararlastir(state.id, "yalan")).rejects.toThrow();
  });

  it("yalan (patron): ahlak/mutluluk düşer; temiz kaçış dalı parayı korur", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.9); // 0.9 > 0.3 → temiz kaçış
    const state = await oturum();
    patronBagisTalebiEkle(state);
    const oncekiPara = state.para;
    const sonuc = await yonetimTalebiKararlastir(state.id, "yalan");
    expect(sonuc.state.ahlak).toBeLessThan(50);
    expect(sonuc.state.para).toBe(oncekiPara); // temiz kaçışta para gitmez
    expect(sonuc.state.yonetim_talep).toBeNull();
  });

  it("yalan (patron): ifşa dalında hem para hem itibar gider", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // 0.1 < 0.3 → ifşa
    const state = await oturum();
    patronBagisTalebiEkle(state);
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

describe("Din Adamı tek otorite (işletmeli meslek)", () => {
  it("şehir yöneticisi hattı: vergi/rakip/imtiyaz istekleri var, eski patron/kral istekleri yok", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Din Adamı");
    const d = await yonetimDurumGetir(st.id);
    expect(d.tekOtorite).toBe(true);
    expect(d.etkilesimler.every((e) => e.hat === "yonetici")).toBe(true);
    const idler = d.istekler.map((i) => i.id);
    expect(idler).toEqual(expect.arrayContaining(["vergi_indirimi", "vakif_muafiyeti", "kutsal_gun_imtiyazi", "bagis_izni"]));
    expect(idler).not.toContain("zam");
    expect(idler).not.toContain("terfi_destegi");
    expect(idler).not.toContain("pazar_imtiyazi");
    expect(d.yonetici.unvan).toBe("Prévôt");
  });
});
