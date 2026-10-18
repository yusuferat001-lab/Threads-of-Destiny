import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec } from "../src/game/stateManager";
import * as AK from "../src/game/askSistemi";
import * as AS from "../src/game/aileSistemi";
import * as S from "../src/data/aileSabitleri";
import * as D from "../src/data/tanismaDiyalog";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  tanismaGetir,
  tanismaYaklas,
  tanismaSec,
  tanismaVazgec,
  sevgiliTeklifEt,
  sevgiliGonulAl,
  aileDurumGetir,
  dugunYap,
} from "../src/game/gameEngine";
import type { CharacterState, AileHuy } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function bekar(yas = 27): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(state, "Tüccar");
  state.yas = yas;
  state.para = 500;
  state.mutluluk = 50;
  state.un = 20;
  return state;
}

function adayKur(state: CharacterState, huylar: [AileHuy, AileHuy], toplam = 3) {
  AK.tanismaBaslat(state, "pazar_meydani");
  const t = state.aktif_tanisma!;
  t.aday.huylar = huylar;
  t.toplam = toplam;
  AK.tanismaYaklas(state);
  return t;
}

describe("tanışma başlatma", () => {
  it("bekar yetişkin için başlar: aday, 3-4 adım, 0. adımda göz göze", () => {
    const state = bekar();
    const t = AK.tanismaBaslat(state, "meyhane");
    expect(state.aktif_tanisma).toBe(t);
    expect(t.adim).toBe(0);
    expect(t.toplam).toBeGreaterThanOrEqual(3);
    expect(t.toplam).toBeLessThanOrEqual(4);
    expect(t.aday.huylar[0]).not.toBe(t.aday.huylar[1]);
    expect(t.aday.yas).toBeGreaterThanOrEqual(18);
    expect(Math.abs(t.aday.yas - state.yas)).toBeLessThanOrEqual(8);
    // ikinci tanışma aynı anda başlatılamaz
    expect(() => AK.tanismaBaslat(state, "pazar_meydani")).toThrow();
  });

  it("sevgilisi olan, yas tutan ve 18 yaş altı karakter tanışamaz", () => {
    const sevgiliVar = bekar();
    sevgiliVar.sevgili = { isim: "A", meslek: "Tüccar", rutbe: "x", dogum_yili: 1, huylar: ["ciddi", "mizahsever"], iliski: 70, baslangic_yili: 1, son_yil: 5, darildi: false, darilma_yili: null, gonul_kilit_yili: 0, meslek_bonusu: 2 };
    expect(AK.tanismaBaslatilabilirMi(sevgiliVar)).toBe(false);
    const yasli = bekar();
    yasli.yas_bitis_yili = yasli.yil + 2;
    expect(AK.tanismaBaslatilabilirMi(yasli)).toBe(false);
    expect(AK.tanismaBaslatilabilirMi(bekar(17))).toBe(false);
    expect(AK.tanismaBaslatilabilirMi(bekar(30))).toBe(true);
  });

  it("evli karakter de tanışabilir; sevgili ya da düğün bekleyen tanışamaz", () => {
    const evli = bekar(30);
    AS.esiOlaydanAta(evli, "Mira");
    expect(AK.tanismaBaslatilabilirMi(evli)).toBe(true);
  });

  it("27 ve 36 yaş dönümlerinde, o dönemde hiç tanışma yaşanmamışsa zorlar; işaretlenince bir daha vermez", () => {
    expect(AK.tanismaDonumEtiketi(bekar(26))).toBeNull();
    const a = bekar(28);
    expect(AK.tanismaDonumEtiketi(a)).toEqual({ etiket: "tanisma_donum_27", zorla: true });
    a.etiketler.push("tanisma_donum_27");
    expect(AK.tanismaDonumEtiketi(a)).toBeNull();
    a.yas = 37;
    expect(AK.tanismaDonumEtiketi(a)).toEqual({ etiket: "tanisma_donum_36", zorla: true });
    a.etiketler.push("tanisma_donum_36");
    expect(AK.tanismaDonumEtiketi(a)).toBeNull();
  });

  it("evli karakter de dönümde zorlanır; dönemde tanışma yaşadıysa zorlanmaz (sessizce işaretlenir)", () => {
    const evli = bekar(28);
    AS.esiOlaydanAta(evli, "Mira");
    expect(AK.tanismaDonumEtiketi(evli)?.zorla).toBe(true);
    const yasadi = bekar(28);
    yasadi.etiketler.push("tanisma_yasandi:22");
    expect(AK.tanismaDonumEtiketi(yasadi)).toEqual({ etiket: "tanisma_donum_27", zorla: false });
    // 36 penceresi 27'den sonrasını sayar: 22'deki tanışma 36'yı karşılamaz
    yasadi.etiketler.push("tanisma_donum_27");
    yasadi.yas = 37;
    expect(AK.tanismaDonumEtiketi(yasadi)?.zorla).toBe(true);
  });

  it("yıllık %4 zar: tutarsa true, tutmazsa false; etiket zaten varsa ya da tanışamıyorsa false", () => {
    const a = bekar(30);
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    expect(AK.tanismaYillikZar(a, 1)).toBe(true);
    a.etiketler.push("tanisma_firsati_bekliyor");
    expect(AK.tanismaYillikZar(a, 1)).toBe(false);
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(AK.tanismaYillikZar(bekar(30), 3)).toBe(false);
    vi.restoreAllMocks();
  });
});

describe("evli karakterde tanışma", () => {
  function evliTanisma(barBaslangic = 70) {
    const state = bekar(30);
    AS.esiOlaydanAta(state, "Mira");
    state.es_puani = barBaslangic;
    state.ahlak = 60;
    adayKur(state, ["mizahsever", "sefkatli"], 3);
    return state;
  }

  it("kabul = aldatma: sevgili oluşmaz, eş barı ve ahlak düşer", () => {
    const state = evliTanisma();
    const t = state.aktif_tanisma!;
    t.basari = t.toplam; // kabul garantili
    t.adim = t.toplam;
    vi.spyOn(Math, "random").mockReturnValue(0.99); // ifşa olmaz
    const son = AK.tanismaSec(state, 0);
    vi.restoreAllMocks();
    expect(son.bitti).toBe(true);
    expect(son.basarili).toBe(false);
    expect(state.sevgili).toBeNull();
    expect(state.es_puani).toBe(70 - S.ALDATMA_BAR_CEZASI);
    expect(state.ahlak).toBe(60 + S.ALDATMA_AHLAK);
  });

  it("ifşa olursa eş barı ek olarak düşer", () => {
    const state = evliTanisma(90);
    const t = state.aktif_tanisma!;
    t.basari = t.toplam; // kabul garantili
    t.adim = t.toplam;
    vi.spyOn(Math, "random").mockReturnValue(0.0); // adım başarılı + ifşa (0 < 0.4)
    const son = AK.tanismaSec(state, 0);
    vi.restoreAllMocks();
    expect(son.mesaj).toBeTruthy();
    expect(state.es_puani).toBe(90 - S.ALDATMA_BAR_CEZASI - S.ALDATMA_IFSA_BAR);
  });

  it("vazgeçmek sadakat ödülüdür ve nostalji kurmaz", () => {
    const state = evliTanisma(50);
    state.ahlak = 50;
    AK.tanismaVazgec(state);
    expect(state.nostalji_yili).toBeNull();
    expect(state.es_puani).toBe(50 + S.SADAKAT_BAR);
    expect(state.ahlak).toBe(50 + S.SADAKAT_AHLAK);
  });
});

describe("tanışma adımları", () => {
  it("huy eşleşmesi şansı +20, uyumsuzluk −15 (ikisi birlikte toplanır)", () => {
    const state = bekar();
    const aday = AK.tanismaAdayiUret(state);
    aday.huylar = ["mizahsever", "ciddi"]; // komik: +20 (mizahsever) −15 (ciddi sevmez) = +5
    const baz = S.TANISMA_BAZ_SANS;
    expect(AK.tanismaAdimSansi(state, aday, "komik")).toBe(baz + 5);
    expect(AK.tanismaAdimSansi(state, aday, "mutevazi")).toBe(baz + 20 - 15); // ciddi sever, mizahsever sevmez
    expect(AK.tanismaAdimSansi(state, aday, "nazik")).toBe(baz);
    aday.huylar = ["parasever", "gururlu"]; // ovunme +20; komik −15, mutevazi −15, nazik +20
    expect(AK.tanismaAdimSansi(state, aday, "ovunme")).toBe(baz + 20);
    expect(AK.tanismaAdimSansi(state, aday, "nazik")).toBe(baz + 20);
    expect(AK.tanismaAdimSansi(state, aday, "komik")).toBe(baz - 15);
    // şans her zaman bandın içinde
    state.un = 100;
    state.mutluluk = 100;
    const [alt, ust] = S.TANISMA_SANS_ARALIK;
    expect(AK.tanismaAdimSansi(state, aday, "nazik")).toBeLessThanOrEqual(ust);
    expect(AK.tanismaAdimSansi(state, aday, "komik")).toBeGreaterThanOrEqual(alt);
  });

  it("yaklaşınca 3 yaklaşım sunulur; adımlar ilerler; son adımda biter", () => {
    const state = bekar();
    const t = adayKur(state, ["mizahsever", "sefkatli"], 3);
    expect(t.adim).toBe(1);
    expect(t.yaklasimlar).toHaveLength(3);
    expect(new Set(t.yaklasimlar).size).toBe(3);
    vi.spyOn(Math, "random").mockReturnValue(0.0); // hep başarılı
    expect(AK.tanismaSec(state, 0).bitti).toBe(false);
    expect(state.aktif_tanisma?.adim).toBe(2);
    expect(AK.tanismaSec(state, 1).bitti).toBe(false);
    const son = AK.tanismaSec(state, 2);
    expect(son.bitti).toBe(true);
    expect(son.basarili).toBe(true);
    expect(state.aktif_tanisma).toBeNull();
    expect(state.sevgili).not.toBeNull();
    expect(state.sevgili!.iliski).toBeGreaterThanOrEqual(68);
    expect(state.sevgili!.iliski).toBeLessThanOrEqual(79);
    expect(state.sevgili!.son_yil).toBe(state.yil + S.SEVGILI_SURE_YIL);
    expect(state.sevgili!.meslek_bonusu).toBe(2);
    expect(state.sevgili!.huylar).toEqual(["mizahsever", "sefkatli"]);
  });

  it("başarı eşiği: toplam − 1; yetersizse sevgili olmaz", () => {
    const state = bekar();
    adayKur(state, ["ciddi", "ciddi"].slice(0, 2) as [AileHuy, AileHuy], 3);
    vi.spyOn(Math, "random").mockReturnValue(0.999); // hep başarısız
    AK.tanismaSec(state, 0);
    AK.tanismaSec(state, 0);
    const son = AK.tanismaSec(state, 0);
    expect(son.bitti).toBe(true);
    expect(son.basarili).toBe(false);
    expect(state.sevgili).toBeNull();
    expect(state.aktif_tanisma).toBeNull();
  });

  it("tam eşik: 3 adımda 2 başarı kabul, 1 başarı ret", () => {
    for (const [basari, beklenen] of [[2, true], [1, false]] as const) {
      const state = bekar();
      const t = adayKur(state, ["mizahsever", "sefkatli"], 3);
      t.basari = basari - 1; // son adımda 1 daha başarılı olursa `basari` olur
      vi.spyOn(Math, "random").mockReturnValue(0);
      t.adim = t.toplam; // doğrudan son adım
      const son = AK.tanismaSec(state, 0);
      expect(son.basarili, `basari=${basari}`).toBe(beklenen);
      vi.restoreAllMocks();
    }
  });

  it("tepki tonu huy eşleşmesi ve başarıyla ilişkilidir (düz anlatı, rozet yok)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(AK.tepkiTonu(true, "sever")).toBe("olumlu");
    expect(AK.tepkiTonu(true, "sevmez")).toBe("notr");
    expect(AK.tepkiTonu(false, "sevmez")).toBe("soguk");
    expect(AK.tepkiTonu(false, "yok")).toBe("soguk");
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.95); // gürültü payı
    expect(AK.tepkiTonu(true, "sever")).toBe("notr");
    expect(AK.tepkiTonu(false, "sever")).toBe("soguk");
  });

  it("vazgeç: tanışma silinir, 4-6 yıl sonra nostalji kurulur (ikinci vazgeçiş süreyi uzatmaz)", () => {
    const state = bekar();
    AK.tanismaBaslat(state, "pazar_meydani");
    const mesaj = AK.tanismaVazgec(state);
    expect(mesaj.length).toBeGreaterThan(5);
    expect(state.aktif_tanisma).toBeNull();
    const fark = (state.nostalji_yili as number) - state.yil;
    expect(fark).toBeGreaterThanOrEqual(4);
    expect(fark).toBeLessThanOrEqual(6);
    const ilk = state.nostalji_yili;
    AK.tanismaBaslat(state, "pazar_meydani");
    AK.tanismaVazgec(state);
    expect(state.nostalji_yili).toBe(ilk);
  });

  it("diyalog verisi: her yaklaşımın 4 adım metni ve 3 tonda 2 varyant tepkisi var, iki dilli", () => {
    expect(D.ADIM_METNI).toHaveLength(4);
    for (const y of D.YAKLASIMLAR) {
      expect(D.SECENEK_METNI[y]).toHaveLength(4);
      for (const ton of ["olumlu", "notr", "soguk"] as const) {
        expect(D.TEPKI[y][ton]).toHaveLength(2);
        for (const m of D.TEPKI[y][ton]) {
          expect(m.tr.length).toBeGreaterThan(3);
          expect(m.en.length).toBeGreaterThan(3);
          expect(m.tr).toContain("{0}");
        }
      }
    }
    for (const huy of S.HUYLAR) {
      expect(D.YAKLASIMLAR).toContain(D.HUY_SEVER[huy]);
      expect(D.YAKLASIMLAR).toContain(D.HUY_SEVMEZ[huy]);
      expect(D.HUY_SEVER[huy]).not.toBe(D.HUY_SEVMEZ[huy]);
    }
  });
});

describe("sevgili", () => {
  function sevgiliKur(): CharacterState {
    const state = bekar(30);
    adayKur(state, ["mizahsever", "sefkatli"], 3);
    vi.spyOn(Math, "random").mockReturnValue(0);
    for (let i = 0; i < 3; i++) AK.tanismaSec(state, 0);
    vi.restoreAllMocks();
    return state;
  }

  it("4 yıl dolunca darılır ve bar sertçe düşer; 2 yıl gönlü alınmazsa ayrılır", () => {
    const state = sevgiliKur();
    const s = state.sevgili!;
    s.iliski = 75;
    state.yil = s.son_yil; // süre doldu
    const mesajlar = AK.sevgiliYillikUygula(state, 1);
    expect(s.darildi).toBe(true);
    expect(s.iliski).toBe(75 - S.GIZLI_YILLIK_DUSUS - S.SEVGILI_DARILMA_BAR_KAYBI);
    expect(mesajlar.length).toBe(1);
    expect(state.sevgili).not.toBeNull();
    // gönlü alınmadan 2 yıl geçer
    state.yil += S.SEVGILI_DARGIN_SURE_YIL;
    s.iliski = 60; // bar yüzünden değil, dargınlık yüzünden ayrılsın
    const son = AK.sevgiliYillikUygula(state, S.SEVGILI_DARGIN_SURE_YIL);
    expect(state.sevgili).toBeNull();
    expect(son.length).toBeGreaterThanOrEqual(1);
  });

  it("gönül al: bedel düşer, dargınlık biter, bar artar, süre 3 yıl uzar, 1 yıl bekleme", () => {
    const state = sevgiliKur();
    const s = state.sevgili!;
    s.darildi = true;
    s.darilma_yili = state.yil;
    s.iliski = 40;
    s.son_yil = state.yil - 1;
    const para = state.para;
    const { maliyet } = AK.gonulAl(state);
    expect(state.para).toBe(para - maliyet);
    expect(maliyet).toBeGreaterThan(0);
    expect(s.darildi).toBe(false);
    expect(s.iliski).toBe(40 + S.GONUL_AL_BAR_ARTISI);
    expect(s.son_yil).toBe(state.yil + S.GONUL_AL_UZATMA_YIL);
    expect(() => AK.gonulAl(state)).toThrow();
    state.yil += 1;
    expect(() => AK.gonulAl(state)).not.toThrow();
    state.para = 0;
    state.yil += 1;
    expect(() => AK.gonulAl(state)).toThrow();
  });

  it("bar 20'nin altına düşerse ayrılır", () => {
    const state = sevgiliKur();
    state.sevgili!.iliski = 20;
    state.yil += 1;
    AK.sevgiliYillikUygula(state, 1);
    expect(state.sevgili).toBeNull();
  });

  it("evlilik teklifi: şans bar−10 (20-95); kabulde bekleyen aşk düğünü, sevgili silinir; red barı düşürür", () => {
    const state = sevgiliKur();
    state.sevgili!.iliski = 70;
    expect(AK.sevgiliTeklifSansi(state.sevgili!)).toBe(60);
    state.sevgili!.iliski = 10;
    expect(AK.sevgiliTeklifSansi(state.sevgili!)).toBe(20);
    state.sevgili!.iliski = 100;
    expect(AK.sevgiliTeklifSansi(state.sevgili!)).toBe(90);

    state.sevgili!.iliski = 70;
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const red = AK.sevgiliTeklifEt(state);
    expect(red.kabul).toBe(false);
    expect(state.sevgili!.iliski).toBe(60);
    expect(state.bekleyen_dugun).toBeNull();
    vi.restoreAllMocks();

    vi.spyOn(Math, "random").mockReturnValue(0);
    const kabul = AK.sevgiliTeklifEt(state);
    vi.restoreAllMocks();
    expect(kabul.kabul).toBe(true);
    expect(state.sevgili).toBeNull();
    expect(state.bekleyen_dugun?.tur).toBe("ask");
    expect(state.bekleyen_dugun?.ceyiz).toBe(0);
    expect(state.bekleyen_dugun?.meslek_bonusu).toBe(2);
    AS.dugunYap(state, "orta");
    expect(state.es_evlilik_turu).toBe("ask");
    expect(state.es_puani).toBeGreaterThanOrEqual(68 + 5);
    expect(state.es_puani).toBeLessThanOrEqual(79 + 5);
    expect(state.es_meslek_bonusu).toBe(2); // mantık-gencin (4) yarısı
    expect(state.etiketler).toContain("evlilik_yolu:ask");
  });

  it("sevgili varken mantık evliliği kapalıdır", () => {
    const state = sevgiliKur();
    expect(() => AS.mantikUygunlukKontrolEt(state)).toThrow();
  });
});

describe("motor sarmalayıcıları (aşk akışı uçtan uca)", () => {
  async function oturum() {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    state.yas = 28;
    state.para = 800;
    return state;
  }

  it("tanışma → yaklaş → seçimler → sevgili → teklif → düğün; durum DTO'su tutarlı", async () => {
    const state = await oturum();
    expect((await tanismaGetir(state.id)).aktif).toBe(false);
    AK.tanismaBaslat(state, "meyhane");
    let durum = await tanismaGetir(state.id);
    expect(durum.aktif).toBe(true);
    expect(durum.adim).toBe(0);
    expect(durum.giris).toContain(durum.aday!.isim);
    expect(durum.secenekler).toEqual([]);

    const y = await tanismaYaklas(state.id);
    expect(y.durum.adim).toBe(1);
    expect(y.durum.secenekler).toHaveLength(3);
    expect(y.durum.istek).toContain(y.durum.aday!.isim);

    vi.spyOn(Math, "random").mockReturnValue(0);
    let yanit = await tanismaSec(state.id, 0);
    let guard = 0;
    while (!yanit.bitti && guard++ < 6) {
      expect(yanit.tepki && yanit.tepki.length).toBeGreaterThan(3);
      expect(yanit.durum.sonTepki).toBe(yanit.tepki);
      yanit = await tanismaSec(state.id, 0);
    }
    vi.restoreAllMocks();
    expect(yanit.bitti).toBe(true);
    expect(yanit.basarili).toBe(true);
    expect(yanit.state.sevgili).not.toBeNull();
    const sevgiliAdi = yanit.state.sevgili!.isim;

    const aile = await aileDurumGetir(state.id);
    expect(aile.sevgili?.isim).toBe(yanit.state.sevgili!.isim);
    expect(aile.sevgili?.kalanYil).toBe(4);
    expect(aile.mantik.sebep).toBe("sevgili");
    expect(aile.tanismaAktif).toBe(false);

    const gonul = await sevgiliGonulAl(state.id);
    expect(gonul.state.sevgili!.son_yil).toBeGreaterThan(state.yil + 4);

    vi.spyOn(Math, "random").mockReturnValue(0);
    const teklif = await sevgiliTeklifEt(state.id);
    vi.restoreAllMocks();
    expect(teklif.kabul).toBe(true);
    const dugun = await dugunYap(state.id, "orta");
    expect(dugun.state.es_adi).toBe(sevgiliAdi);
    expect(dugun.state.es_evlilik_turu).toBe("ask");
    expect(dugun.state.sevgili).toBeNull();
  });

  it("vazgeç motor üzerinden de nostalji kurar; tanışma yokken seçim hata verir", async () => {
    const state = await oturum();
    await expect(tanismaSec(state.id, 0)).rejects.toThrow();
    AK.tanismaBaslat(state, "pazar_meydani");
    const v = await tanismaVazgec(state.id);
    expect(v.bitti).toBe(true);
    expect(v.durum.aktif).toBe(false);
    expect(v.state.nostalji_yili).not.toBeNull();
  });
});

describe("zorunlu tanışma fırsatı (senaryoUret kaskadı)", () => {
  it("bekar 26+ karakterde iliski_tanisma_firsati çıkar; 'yanına git' tanışmayı başlatır, 'vazgeç' nostalji kurar", async () => {
    for (const secim of ["git", "vazgec"] as const) {
      const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
      await mesleğiAta(state.id, "Tüccar");
      state.yas = 27;
      state.para = 500;
      let bulundu = false;
      for (let tur = 0; tur < 25 && !bulundu; tur++) {
        const senaryo = await senaryoUret(state.id);
        if (senaryo.olay_basligi === "Göz Göze") {
          bulundu = true;
          const secimIndex = senaryo.secenekler.findIndex((x) => (secim === "git" ? x.metin.startsWith("Yanına git") : x.metin.startsWith("Vazgeç")));
          await secimUygula(state.id, secimIndex);
          if (secim === "git") {
            expect(state.aktif_tanisma).not.toBeNull();
            expect(state.aktif_tanisma?.adim).toBe(0);
          } else {
            expect(state.aktif_tanisma).toBeNull();
            expect(state.nostalji_yili).not.toBeNull();
          }
          expect(state.etiketler).toContain("tanisma_donum_27");
        } else {
          const acik = senaryo.secenekler.findIndex((x) => !x.kilitli);
          await secimUygula(state.id, acik >= 0 ? acik : 0);
        }
        if (!state.aktif) break;
      }
      expect(bulundu, `secim=${secim}`).toBe(true);
    }
  });
});
