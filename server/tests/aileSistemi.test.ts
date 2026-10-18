import { describe, it, expect, vi, afterEach } from "vitest";
import { createCharacter, mesleğiSec, hesaplaMaasYillik, esiSifirla } from "../src/game/stateManager";
import * as AS from "../src/game/aileSistemi";
import * as S from "../src/data/aileSabitleri";
import type { CharacterState, MantikAday } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function bekarKarakter(yas = 30): CharacterState {
  const state = createCharacter("Orta Çağ", "Fransa", "kasaba");
  mesleğiSec(state, "Tüccar");
  state.yas = yas;
  state.para = 1000;
  state.mutluluk = 50;
  return state;
}

function aday(grup: "genc" | "olgun" = "genc", ek: Partial<MantikAday> = {}): MantikAday {
  return {
    isim: "Adela",
    meslek: "Tüccar",
    rutbe: "Pazarcı",
    yas: grup === "genc" ? 30 : 40,
    grup,
    huylar: ["mizahsever", "ciddi"],
    ceyiz: 40,
    meslek_bonusu: grup === "genc" ? 4 : 6,
    ...ek,
  };
}

/** Evlenmiş bir karakter kurar (düğün akışı üzerinden). */
function evliKarakter(grup: "genc" | "olgun" = "genc", butce: "ucuz" | "orta" | "pahali" = "orta", yas = 30): CharacterState {
  const state = bekarKarakter(yas);
  state.bekleyen_dugun = { ...aday(grup), tur: "mantik" };
  AS.dugunYap(state, butce);
  return state;
}

describe("mantık adayları", () => {
  it("3 aday üretir, iki grup da temsil edilir, yenileme 5-6 yıl sonra", () => {
    const state = bekarKarakter();
    const liste = AS.mantikListesiniHazirla(state);
    expect(liste).toHaveLength(S.MANTIK_ADAY_SAYISI);
    expect(liste.some((a) => a.grup === "genc")).toBe(true);
    expect(liste.some((a) => a.grup === "olgun")).toBe(true);
    const fark = state.mantik_yenileme_yili - state.yil;
    expect(fark).toBeGreaterThanOrEqual(5);
    expect(fark).toBeLessThanOrEqual(6);
    // süre dolmadan aynı liste döner
    expect(AS.mantikListesiniHazirla(state)).toBe(liste);
  });

  it("yaş aralıkları ve olgun adayın 1,5× çeyiz/bonusu", () => {
    const state = bekarKarakter();
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const genc = AS.mantikAdayiUret(state, "genc");
    const olgun = AS.mantikAdayiUret(state, "olgun");
    expect(genc.yas).toBeGreaterThanOrEqual(27);
    expect(genc.yas).toBeLessThanOrEqual(33);
    expect(olgun.yas).toBeGreaterThanOrEqual(38);
    expect(olgun.yas).toBeLessThanOrEqual(43);
    expect(olgun.ceyiz / genc.ceyiz).toBeCloseTo(1.5, 1);
    expect(olgun.meslek_bonusu / genc.meslek_bonusu).toBeCloseTo(1.5, 5);
    expect(genc.huylar[0]).not.toBe(genc.huylar[1]);
  });

  it("süre dolunca liste yenilenir", () => {
    const state = bekarKarakter();
    const ilk = AS.mantikListesiniHazirla(state);
    state.yil = state.mantik_yenileme_yili;
    expect(AS.mantikListesiniHazirla(state)).not.toBe(ilk);
  });
});

describe("mantık evliliği uygunluk ve teklif", () => {
  it("22 yaş altı, evli, yas, kilit ve bekleyen düğün engeller", () => {
    const genc = bekarKarakter(21);
    expect(() => AS.mantikUygunlukKontrolEt(genc)).toThrow();

    const yasli = bekarKarakter(30);
    expect(() => AS.mantikUygunlukKontrolEt(yasli)).not.toThrow();

    yasli.yas_bitis_yili = yasli.yil + 2;
    expect(() => AS.mantikUygunlukKontrolEt(yasli)).toThrow();
    yasli.yas_bitis_yili = 0;

    yasli.mantik_kilit_yili = yasli.yil + 1;
    expect(() => AS.mantikUygunlukKontrolEt(yasli)).toThrow();
    yasli.mantik_kilit_yili = 0;

    yasli.bekleyen_dugun = { ...aday(), tur: "mantik" };
    expect(() => AS.mantikUygunlukKontrolEt(yasli)).toThrow();

    const evli = evliKarakter();
    expect(() => AS.mantikUygunlukKontrolEt(evli)).toThrow();
  });

  it("kabul: bekleyen düğün kurulur, hediye parası düşer", () => {
    const state = bekarKarakter();
    AS.mantikListesiniHazirla(state);
    const para = state.para;
    vi.spyOn(Math, "random").mockReturnValue(0); // her zar başarılı
    const sonuc = AS.mantikTeklifEt(state, 0, "ucuz");
    expect(sonuc.kabul).toBe(true);
    expect(state.bekleyen_dugun?.tur).toBe("mantik");
    expect(state.bekleyen_dugun?.isim).toBe(sonuc.aday.isim);
    expect(state.para).toBe(para - sonuc.maliyet);
    expect(sonuc.maliyet).toBeGreaterThan(0);
    // bekleyen düğün varken yeni teklif yapılamaz
    expect(() => AS.mantikTeklifEt(state, 1, "sade")).toThrow();
  });

  it("red: aday listeden düşer, mantık sistemi 2 yıl kilitlenir", () => {
    const state = bekarKarakter();
    AS.mantikListesiniHazirla(state);
    const reddeden = state.mantik_adaylar[0].isim;
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const sonuc = AS.mantikTeklifEt(state, 0, "sade");
    expect(sonuc.kabul).toBe(false);
    expect(state.bekleyen_dugun).toBeNull();
    expect(state.mantik_adaylar.some((a) => a.isim === reddeden)).toBe(false);
    expect(state.mantik_kilit_yili).toBe(state.yil + S.MANTIK_RED_KILIT_YIL);
    expect(() => AS.mantikTeklifEt(state, 0, "sade")).toThrow();
  });

  it("hediye kademesi şansı artırır; hediyeye para yetmezse hata", () => {
    const state = bekarKarakter();
    const sade = AS.mantikTeklifSansi(state, "sade");
    const ucuz = AS.mantikTeklifSansi(state, "ucuz");
    const pahali = AS.mantikTeklifSansi(state, "pahali");
    expect(ucuz).toBeGreaterThan(sade);
    expect(pahali).toBeGreaterThan(ucuz);

    AS.mantikListesiniHazirla(state);
    state.para = 0;
    expect(() => AS.mantikTeklifEt(state, 0, "pahali")).toThrow();
    expect(state.para).toBe(0);
  });
});

describe("düğün", () => {
  it("mantık başlangıcı 51-61 + düğün değeri; çeyiz eklenir, maliyet düşer, eş modeli kurulur", () => {
    for (const [butce, delta] of [["ucuz", -20], ["orta", 5], ["pahali", 25]] as const) {
      const state = bekarKarakter();
      const para = state.para;
      const un = state.un;
      state.bekleyen_dugun = { ...aday("genc", { ceyiz: 40 }), tur: "mantik" };
      const maliyet = AS.dugunMaliyeti(state, butce);
      AS.dugunYap(state, butce);
      expect(state.es_puani).toBeGreaterThanOrEqual(51 + delta);
      expect(state.es_puani).toBeLessThanOrEqual(61 + delta);
      expect(state.para).toBe(para - maliyet + 40);
      expect(state.un).toBe(Math.max(0, un + S.DUGUN[butce].un));
      expect(state.es_adi).toBe("Adela");
      expect(state.es_evlilik_turu).toBe("mantik");
      expect(state.es_dogum_yili).toBe(state.yil - 30);
      expect(state.etiketler).toContain("medeni:evli");
      expect(state.etiketler).toContain("evlilik_yolu:mantik_ticari");
      expect(state.bekleyen_dugun).toBeNull();
      expect(state.mantik_adaylar).toEqual([]);
    }
  });

  it("aşk başlangıcı 68-79 + düğün değeri", () => {
    const state = bekarKarakter();
    state.bekleyen_dugun = { ...aday("genc", { ceyiz: 0, meslek_bonusu: 2 }), tur: "ask" };
    AS.dugunYap(state, "orta");
    expect(state.es_puani).toBeGreaterThanOrEqual(68 + 5);
    expect(state.es_puani).toBeLessThanOrEqual(79 + 5);
    expect(state.etiketler).toContain("evlilik_yolu:ask");
    expect(state.es_meslek_bonusu).toBe(2);
  });

  it("para yetmiyorsa bütçe reddedilir, düğün beklemeye devam eder", () => {
    const state = bekarKarakter();
    state.para = 0;
    state.bekleyen_dugun = { ...aday(), tur: "mantik" };
    expect(() => AS.dugunYap(state, "pahali")).toThrow();
    expect(state.bekleyen_dugun).not.toBeNull();
    expect(state.es_adi).toBeNull();
  });

  it("eş bonusu maaşa 'Eşinin desteği' olarak yansır, eş gidince kalkar", () => {
    const evli = bekarKarakter();
    evli.bekleyen_dugun = { ...aday("olgun"), tur: "mantik" }; // bonus 6
    AS.dugunYap(evli, "orta");
    expect(evli.es_meslek_bonusu).toBe(6);
    const destekli = hesaplaMaasYillik(evli);
    evli.es_meslek_bonusu = 0;
    expect(destekli).toBeGreaterThan(hesaplaMaasYillik(evli));
    // eş gidince (terk) bonus sıfırlanır ve maaşa yansımaz
    evli.es_meslek_bonusu = 6;
    evli.es_dugun_un = 0;
    esiSifirla(evli, "terk");
    expect(evli.es_meslek_bonusu).toBe(0);
    expect(hesaplaMaasYillik(evli)).toBe(hesaplaMaasYillik({ ...evli, es_meslek_bonusu: 0 }));
  });
});

describe("ilişki barı eylemleri", () => {
  it("zaman geçir: +4…+8, sağlık bedeli, 2 yıl bekleme; hediye ver bağımsız bekleme", () => {
    const state = evliKarakter();
    state.es_puani = 50;
    const saglik = state.saglik;
    const r1 = AS.esEylemYap(state, "zaman_gecir");
    expect(r1.artis).toBeGreaterThanOrEqual(4);
    expect(r1.artis).toBeLessThanOrEqual(8 * S.HUY_ETKI_CARPANI);
    expect(state.saglik).toBeLessThan(saglik);
    expect(state.es_son_zaman_yili).toBe(state.yil);
    expect(() => AS.esEylemYap(state, "zaman_gecir")).toThrow();
    // hediye ver ayrı kilit
    expect(() => AS.esEylemYap(state, "hediye_ver", "ucuz")).not.toThrow();
    expect(() => AS.esEylemYap(state, "hediye_ver", "ucuz")).toThrow();
    // 2 yıl sonra tekrar
    state.yil += 2;
    expect(() => AS.esEylemYap(state, "zaman_gecir")).not.toThrow();
  });

  it("hediye aralıkları: ucuz 8-10, pahalı 14-17 (huy etkisiz eşte)", () => {
    for (const [hediye, min, max] of [["ucuz", 8, 10], ["pahali", 14, 17]] as const) {
      const state = evliKarakter();
      state.es_huylar = ["ciddi", "maceraci"];
      state.es_puani = 20;
      const para = state.para;
      const r = AS.esEylemYap(state, "hediye_ver", hediye);
      expect(r.artis).toBeGreaterThanOrEqual(min);
      expect(r.artis).toBeLessThanOrEqual(max);
      expect(state.para).toBe(para - r.maliyet);
      expect(r.maliyet).toBeGreaterThan(0);
    }
  });

  it("parasever eşe hediye daha etkili; mizahsever eşle zaman daha etkili", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const a = evliKarakter();
    a.es_huylar = ["parasever", "ciddi"];
    a.es_puani = 10;
    const b = evliKarakter();
    b.es_huylar = ["ciddi", "maceraci"];
    b.es_puani = 10;
    const ra = AS.esEylemYap(a, "hediye_ver", "pahali");
    const rb = AS.esEylemYap(b, "hediye_ver", "pahali");
    expect(ra.artis).toBeGreaterThan(rb.artis);
    expect(ra.huyEtkili).toBe(true);
    const c = evliKarakter();
    c.es_huylar = ["mizahsever", "ciddi"];
    const d = evliKarakter();
    d.es_huylar = ["ciddi", "gururlu"];
    expect(AS.esEylemYap(c, "zaman_gecir").artis).toBeGreaterThan(AS.esEylemYap(d, "zaman_gecir").artis);
  });

  it("para yetmezse hediye verilemez; eş yoksa eylem reddedilir", () => {
    const state = evliKarakter();
    state.para = 0;
    expect(() => AS.esEylemYap(state, "hediye_ver", "pahali")).toThrow();
    expect(() => AS.esEylemYap(bekarKarakter(), "zaman_gecir")).toThrow();
  });
});

describe("esYillikUygula", () => {
  it("gizli düşüş yılda 1 (ciddi huyda 0,5) ve HİÇBİR mesaj üretmez", () => {
    const state = evliKarakter();
    state.es_huylar = ["maceraci", "mizahsever"];
    state.es_puani = 80;
    state.es_son_zaman_yili = state.yil; // ihmal yok
    state.yil += 1;
    const mesajlar = AS.esYillikUygula(state, 1);
    expect(state.es_puani).toBe(80 - S.GIZLI_YILLIK_DUSUS);
    expect(mesajlar).toEqual([]);

    const ciddi = evliKarakter();
    ciddi.es_huylar = ["ciddi", "mizahsever"];
    ciddi.es_puani = 80;
    ciddi.es_son_zaman_yili = ciddi.yil;
    ciddi.yil += 1;
    AS.esYillikUygula(ciddi, 1);
    expect(ciddi.es_puani).toBe(80 - S.CIDDI_GIZLI_DUSUS);
  });

  it("ihmal cezası: 2 yıl muaf, 3-5. yıl −3, 6-10. yıl −4, 10+ −5 (gizli −1'e ek)", () => {
    const beklenen: [number, number][] = [[1, 0], [2, 0], [3, 3], [5, 3], [6, 4], [10, 4], [11, 5], [15, 5]];
    for (const [ihmal, ceza] of beklenen) {
      const state = evliKarakter();
      state.es_huylar = ["maceraci", "mizahsever"];
      state.es_puani = 90;
      state.es_son_zaman_yili = state.yil;
      state.yil += ihmal;
      state.es_ihmal_uyari_goruldu = true;
      // tek yıllık adımda ihmal yılı = ihmal
      AS.esYillikUygula(state, 1);
      expect(state.es_puani, `ihmal ${ihmal}`).toBe(90 - S.GIZLI_YILLIK_DUSUS - ceza);
    }
  });

  it("ihmal yılı sayacı: zaman geçirince sıfırlanır, 7. yılda uyarı eşiği", () => {
    const state = evliKarakter();
    state.es_son_zaman_yili = state.yil - 7;
    expect(AS.ihmalYili(state)).toBeGreaterThanOrEqual(S.IHMAL_UYARI_YIL);
    state.yil += 0;
    AS.esEylemYap(state, "zaman_gecir");
    expect(AS.ihmalYili(state)).toBe(0);
  });

  it("bar 20'nin altında 2-3 yıl kalırsa eş terk eder: slot sıfırlanır, düğün şöhreti geri alınır", () => {
    const state = evliKarakter("genc", "pahali"); // +8 şöhret
    const dugunUn = state.es_dugun_un;
    expect(dugunUn).toBe(8);
    state.un = 50;
    state.es_terk_esigi = 2;
    state.es_puani = 5;
    state.es_son_zaman_yili = state.yil; // ihmal cezası olmasın
    state.yas_bitis_yili = 0;
    state.yil += 1;
    expect(AS.esYillikUygula(state, 1)).toEqual([]);
    expect(state.es_adi).not.toBeNull();
    state.es_son_zaman_yili = state.yil;
    state.yil += 1;
    const mesajlar = AS.esYillikUygula(state, 1);
    expect(mesajlar.length).toBe(1);
    expect(state.es_adi).toBeNull();
    expect(state.es_puani).toBe(0);
    expect(state.es_meslek_bonusu).toBe(0);
    expect(state.es_dugun_un).toBe(0);
    expect(state.un).toBe(50 - dugunUn);
    expect(state.etiketler).not.toContain("medeni:evli");
    expect(state.mantik_adaylar).toEqual([]);
    expect(state.mantik_kilit_yili).toBe(0);
    expect(state.yas_bitis_yili).toBe(state.yil + S.YAS_TERK_YIL);
  });

  it("bar toparlanırsa düşük yıl sayacı sıfırlanır", () => {
    const state = evliKarakter();
    state.es_puani = 10;
    state.es_son_zaman_yili = state.yil;
    state.yil += 1;
    AS.esYillikUygula(state, 1);
    expect(state.es_dusuk_yil).toBe(1);
    state.es_puani = 70;
    state.es_son_zaman_yili = state.yil;
    state.yil += 1;
    AS.esYillikUygula(state, 1);
    expect(state.es_dusuk_yil).toBe(0);
  });

  it("eşin yaşlılık ölümü: slot sıfırlanır, 3 yıllık yas başlar; yas süresince moral düşer", () => {
    const state = evliKarakter();
    state.es_dogum_yili = state.yil - 82; // 80+ → yıllık %10
    state.es_puani = 80;
    state.es_son_zaman_yili = state.yil;
    state.mutluluk = 60;
    vi.spyOn(Math, "random").mockReturnValue(0.01);
    state.yil += 1;
    const mesajlar = AS.esYillikUygula(state, 1);
    expect(mesajlar.length).toBe(1);
    expect(state.es_adi).toBeNull();
    expect(state.yas_bitis_yili).toBe(state.yil + S.YAS_OLUM_YIL);
    expect(AS.yasDonemindeMi(state)).toBe(true);
    expect(() => AS.mantikUygunlukKontrolEt(state)).toThrow();

    const mutluluk = state.mutluluk;
    state.yil += 1;
    AS.esYillikUygula(state, 1);
    expect(state.mutluluk).toBe(mutluluk - S.YAS_MUTLULUK_YILLIK);
    state.yil = state.yas_bitis_yili;
    expect(AS.yasDonemindeMi(state)).toBe(false);
    expect(() => AS.mantikUygunlukKontrolEt(state)).not.toThrow();
  });

  it("karanlık sır / iş eşin barını düşürür; eş yoksa etkisiz", () => {
    const state = evliKarakter();
    state.es_puani = 70;
    AS.esBarDusur(state, 8);
    expect(state.es_puani).toBe(62);
    AS.esBarDusur(state, 100);
    expect(state.es_puani).toBe(0);
    const bekar = bekarKarakter();
    expect(() => AS.esBarDusur(bekar, 5)).not.toThrow();
  });
});

describe("doğum", () => {
  function dogumHazir(): CharacterState {
    const state = evliKarakter("genc", "orta", 30);
    state.es_dogum_yili = state.yil - 28;
    state.es_son_zaman_yili = state.yil;
    state.es_sonraki_hamilelik_yili = 0;
    return state;
  }

  it("bar bandına göre yıllık şans: <40 → 0; 40-59 %6; 60-74 %12; 75-89 %18; 90+ %23", () => {
    const beklenen: [number, number][] = [[39, 0], [40, 0.06], [59, 0.06], [60, 0.12], [74, 0.12], [75, 0.18], [89, 0.18], [90, 0.23], [100, 0.23]];
    for (const [bar, sans] of beklenen) {
      const state = dogumHazir();
      state.es_puani = bar;
      // zar tam eşiğin hemen altında → doğum; hemen üstünde → doğum yok
      if (sans === 0) {
        vi.spyOn(Math, "random").mockReturnValue(0);
        expect(AS.dogumDenemesi(state, 1), `bar ${bar}`).toBeNull();
        vi.restoreAllMocks();
        continue;
      }
      const spy = vi.spyOn(Math, "random").mockReturnValue(sans - 0.001);
      const dogdu = AS.dogumDenemesi(state, 1);
      expect(dogdu, `bar ${bar}`).not.toBeNull();
      spy.mockRestore();
      const yok = dogumHazir();
      yok.es_puani = bar;
      vi.spyOn(Math, "random").mockReturnValue(sans + 0.001);
      expect(AS.dogumDenemesi(yok, 1), `bar ${bar} üstü`).toBeNull();
      vi.restoreAllMocks();
    }
  });

  it("doğum sayacı, bekleme (3,4,5,6,7 yıl) ve çocuk kaydı", () => {
    const state = dogumHazir();
    state.es_puani = 95;
    const bekleme = S.HAMILELIK_BEKLEME_YIL;
    for (let n = 1; n <= 5; n++) {
      state.es_sonraki_hamilelik_yili = 0;
      const spy = vi.spyOn(Math, "random");
      // sans eşiğinin altı doğum; komplikasyon zarı için yüksek değer (komplikasyon yok)
      spy.mockReturnValueOnce(0.01);
      for (let i = 0; i < 20; i++) spy.mockReturnValueOnce(0.99);
      state.es_puani = 95;
      const not = AS.dogumDenemesi(state, 1);
      expect(not).not.toBeNull();
      expect(state.es_dogum_sayisi).toBe(n);
      expect(state.es_sonraki_hamilelik_yili).toBe(state.yil + bekleme[n - 1]);
      spy.mockRestore();
    }
    expect(state.cocuklar).toHaveLength(5);
    expect(state.cocuk_sayisi).toBe(5);
    expect(state.son_dogum_yili).toBe(state.yil);
    expect(state.cocuklar.every((c) => ["yatkin", "notr", "uyumsuz"].includes(c.yatkinlik as string))).toBe(true);
    // 6. doğum asla
    state.es_sonraki_hamilelik_yili = 0;
    vi.spyOn(Math, "random").mockReturnValue(0.001);
    expect(AS.dogumDenemesi(state, 1)).toBeNull();
  });

  it("bekleme süresi dolmadan, 50 yaşından sonra ve hasta/hapisteyken doğum olmaz", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.001);
    const bekle = dogumHazir();
    bekle.es_puani = 95;
    bekle.es_sonraki_hamilelik_yili = bekle.yil + 2;
    expect(AS.dogumDenemesi(bekle, 1)).toBeNull();

    const yasli = dogumHazir();
    yasli.es_puani = 95;
    yasli.es_dogum_yili = yasli.yil - 50;
    expect(AS.dogumDenemesi(yasli, 1)).toBeNull();
    yasli.es_dogum_yili = yasli.yil - 49;
    expect(AS.dogumDenemesi(yasli, 1)).not.toBeNull();

    const hapis = dogumHazir();
    hapis.es_puani = 95;
    hapis.etiketler.push("hapiste");
    expect(AS.dogumDenemesi(hapis, 1)).toBeNull();
  });

  it("olgun eşte doğum şansı ×0,25", () => {
    const state = dogumHazir();
    state.es_grup = "olgun";
    state.es_puani = 95; // 0.23 × 0.25 = 0.0575
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    expect(AS.dogumDenemesi(state, 1)).toBeNull();
    vi.restoreAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0.05);
    expect(AS.dogumDenemesi(state, 1)).not.toBeNull();
  });

  it("ömür boyu çocuk tavanı (8): dolunca doğum olmaz", () => {
    const state = dogumHazir();
    state.es_puani = 95;
    for (let i = 0; i < 8; i++) state.cocuklar.push({ isim: `C${i}`, dogum_yili: state.yil - 20, yasiyor: true, iliski: 60 });
    vi.spyOn(Math, "random").mockReturnValue(0.001);
    expect(AS.dogumDenemesi(state, 1)).toBeNull();
  });

  it("komplikasyon: bebek ilk 3 yılda ölür; anne komplikasyonunda eş ölür", () => {
    // bebek: komplikasyon (0.1 < 0.3) ve bebek payı (0.1 < 0.7)
    const a = dogumHazir();
    a.es_puani = 95;
    const bebek = { isim: "Milo", dogum_yili: a.yil, yasiyor: true, iliski: 65 } as CharacterState["cocuklar"][number];
    a.cocuklar.push(bebek);
    a.cocuk_sayisi = 1;
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    AS.dogumuKaydet(a, a.yil, bebek);
    vi.restoreAllMocks();
    expect(typeof bebek.erken_olum_yili).toBe("number");
    expect((bebek.erken_olum_yili as number) - a.yil).toBeGreaterThanOrEqual(1);
    expect((bebek.erken_olum_yili as number) - a.yil).toBeLessThanOrEqual(S.BEBEK_OLUM_PENCERE_YIL);
    // süre gelince bebek ölür
    a.yil = bebek.erken_olum_yili as number;
    const mesajlar = AS.esYillikUygula(a, 1);
    expect(bebek.yasiyor).toBe(false);
    expect(mesajlar.length).toBeGreaterThanOrEqual(1);
    expect(a.cocuk_sayisi).toBe(0);

    // anne: komplikasyon (0.1 < 0.3) ama bebek payı dışı (0.9 ≥ 0.7)
    const b = dogumHazir();
    const cocuk = { isim: "Mira", dogum_yili: b.yil, yasiyor: true, iliski: 65 } as CharacterState["cocuklar"][number];
    b.cocuklar.push(cocuk);
    const spy = vi.spyOn(Math, "random");
    spy.mockReturnValueOnce(0.1).mockReturnValue(0.9);
    const mesajlarB = AS.dogumuKaydet(b, b.yil, cocuk);
    expect(mesajlarB.length).toBe(1);
    expect(b.es_adi).toBeNull();
    expect(cocuk.yasiyor).toBe(true);
    expect(cocuk.erken_olum_yili).toBeUndefined();
    expect(b.yas_bitis_yili).toBeGreaterThan(b.yil);
  });

  it("olay kaynaklı çocuk: 5 doğum ve ömür boyu tavanı; evlat edinme tavan hariç sayaçları etkilemez", () => {
    const state = dogumHazir();
    state.es_dogum_sayisi = 5;
    expect(AS.eventCocukuIzinli(state, false)).toBe(false);
    expect(AS.eventCocukuIzinli(state, true)).toBe(true);
    state.es_dogum_sayisi = 1;
    expect(AS.eventCocukuIzinli(state, false)).toBe(true);
    AS.eventCocuguKaydet(state, state.yil, false);
    expect(state.es_dogum_sayisi).toBe(2);
    AS.eventCocuguKaydet(state, state.yil, true);
    expect(state.es_dogum_sayisi).toBe(2);
    for (let i = 0; i < 8; i++) state.cocuklar.push({ isim: `C${i}`, dogum_yili: 1, yasiyor: true, iliski: 60 });
    expect(AS.eventCocukuIzinli(state, true)).toBe(false);
  });
});

describe("olay kaynaklı evlilik (es_ata uyumluluğu)", () => {
  it("yeni eş modeline oturur, bonus yok", () => {
    const state = bekarKarakter(30);
    AS.esiOlaydanAta(state, "Mira");
    expect(state.es_adi).toBe("Mira");
    expect(state.es_puani).toBe(60);
    expect(state.es_meslek_bonusu).toBe(0);
    expect(state.es_huylar).toHaveLength(2);
    expect(state.es_dogum_yili).not.toBeNull();
    expect(state.etiketler).toContain("medeni:evli");
  });
});
