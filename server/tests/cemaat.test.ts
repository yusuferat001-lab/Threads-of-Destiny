import { describe, it, expect, vi, afterEach } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  senaryoUret,
  secimUygula,
  isletmeDurumGetir,
  isletmeKararVer,
  isletmeOgretiSec,
  isletmeYatirimYap,
  yonetimTalebiKararlastir,
} from "../src/game/gameEngine";
import { isletmeBaglami, createCharacter, mesleğiSec, eskiKayitGocu, maasCarpaniUygula, yonetimTalebiUret } from "../src/game/stateManager";
import {
  cemaatHesapla,
  cemaatYilIsle,
  cemaatEtkenleri,
  cemaatDonemBilesik,
  gelmeAraligi,
  gelmeKaynagiBul,
  ogretiBekleyenSeviye,
  ogretiBekliyorMu,
  ogretiSec,
  faaliyetSlotSayisi,
  cemaatHazirla,
} from "../src/game/cemaat";
import {
  ahlakInananEtkisi,
  AHLAK_BANTLARI,
  BAGIS_BIRIMI,
  CEMAAT_DONEM_ETKILERI,
  FAALIYETLER,
  GELME_ARALIKLARI,
  KITLE_POLITIKASI,
  YARDIM_POLITIKASI,
  BAGIS_POLITIKASI,
} from "../src/data/cemaat";
import { OGRETILER, ogretiSecenekleri, ogretiToplami } from "../src/data/ogretiler";
import { OLAY_KURESEL } from "../src/data/olaylar/kureselOlaylar";
import { musteriSayisi } from "../src/data/pazar";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function din(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ"): Promise<CharacterState> {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Din Adamı");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  return s;
}

/** Öğretileri sırayla seçtirir (rütbe kadar). */
function ogretileriSec(s: CharacterState, fanatik = false) {
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(s);
    if (sev === null) break;
    const sec = ogretiSecenekleri(sev);
    ogretiSec(s, (fanatik ? sec.find((o) => o.fanatik) : sec.find((o) => !o.fanatik))!.id);
  }
}

describe("cemaat — kurulum ve öğreti", () => {
  it("Din Adamı seçilince cemaat kurulur: 5 faaliyet, yalnız tövbe açık, öğreti seçimi bekler", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    expect(cm).toBeTruthy();
    expect(s.isletme!.hatlar.map((h) => h.id)).toEqual(FAALIYETLER.map((f) => f.id));
    expect(s.isletme!.hatlar.filter((h) => h.acik).map((h) => h.id)).toEqual(["tovbe"]);
    expect(cm.ogretiler).toEqual([]);
    expect(ogretiBekliyorMu(s)).toBe(true);
    expect(ogretiBekleyenSeviye(s)).toBe(1);
  });

  it("öğreti seçilmeden senaryo ve seçim reddedilir; seçince devam edilir", async () => {
    const s = await din();
    await expect(senaryoUret(s.id)).rejects.toThrow("öğretini");
    await isletmeOgretiSec(s.id, ogretiSecenekleri(1)[0].id);
    const senaryo = await senaryoUret(s.id);
    expect(senaryo.secenekler.length).toBeGreaterThan(0);
  });

  it("öğreti seviyesi rütbeyle sırayla açılır; yanlış seviye reddedilir; fanatik seçenek fanatikliği artırır", async () => {
    const s = await din();
    expect(() => ogretiSec(s, ogretiSecenekleri(2)[0].id)).toThrow();
    const fanatik = ogretiSecenekleri(1).find((o) => o.fanatik)!;
    ogretiSec(s, fanatik.id);
    expect(s.isletme!.cemaat!.fanatiklik).toBe(5);
    expect(ogretiBekliyorMu(s)).toBe(false);
    s.rutbe_seviye = 2;
    expect(ogretiBekliyorMu(s)).toBe(true);
    expect(ogretiBekleyenSeviye(s)).toBe(2);
    expect(() => ogretiSec(s, fanatik.id)).toThrow();
    ogretiSec(s, ogretiSecenekleri(2).find((o) => o.fanatik)!.id);
    expect(s.isletme!.cemaat!.fanatiklik).toBe(11);
  });

  it("15 öğreti: seviye başına 3 seçenek, üçüncüsü fanatik; fanatik artışları 5/6/7/8/10", () => {
    expect(OGRETILER).toHaveLength(15);
    for (let sv = 1; sv <= 5; sv++) {
      const sec = ogretiSecenekleri(sv);
      expect(sec).toHaveLength(3);
      expect(sec.filter((o) => o.fanatik)).toHaveLength(1);
    }
    expect(ogretiSecenekleri(1).find((o) => o.fanatik)!.etki.fanatiklik).toBe(5);
    expect([1, 2, 3, 4, 5].map((sv) => ogretiSecenekleri(sv).find((o) => o.fanatik)!.etki.fanatiklik)).toEqual([5, 6, 7, 8, 10]);
  });

  it("öğreti etkileri toplanır/çarpılır", () => {
    const t = ogretiToplami(["adak_gelenegi", "vaaz_sanati", "sifa_merhamet", "ortak_sofra"]);
    expect(t.bagisOrani).toBeCloseTo(0.04);
    expect(t.bagisBirimi).toBeCloseTo(0.1);
    expect(t.yardimEtkisi).toBeCloseTo(1.2 * 1.4);
    expect(t.faaliyet.sifa).toBeCloseTo(1.3);
    expect(t.yardimMaliyet).toBeCloseTo(0.2);
  });
});

describe("cemaat — gelir ve gider", () => {
  it("ayine gelme oranı aralığı dönemden gelir: normal %78–86, kıtlık %72–80, savaş %68–78, veba %35–50", async () => {
    const s = await din();
    expect(GELME_ARALIKLARI.normal).toEqual([0.78, 0.86]);
    s.ulke.donem!.tur = "bolluk";
    expect(gelmeKaynagiBul(s)).toBe("normal");
    s.ulke.donem!.tur = "kitlik";
    expect(gelmeAraligi(s)).toEqual([0.72, 0.8]);
    s.ulke.savasta = true;
    expect(gelmeAraligi(s)).toEqual([0.68, 0.78]);
    s.veba = { aktif: true, baslangicYili: s.yil, bitisYili: s.yil + 4, etkiBitisYili: s.yil + 4, konutKiraCarpani: 1, gelirCarpani: 1, korumaSeviyesi: 0 } as never;
    expect(gelmeAraligi(s)).toEqual([0.35, 0.5]);
  });

  it("yıllık işlemde gelme oranı her yıl aralıkta zarlanır", async () => {
    const s = await din();
    ogretileriSec(s);
    const oranlar = new Set<number>();
    for (let i = 0; i < 6; i++) {
      const c = structuredClone(s);
      const { dokum } = cemaatYilIsle(c, isletmeBaglami(c));
      expect(dokum.cemaat!.gelmeOrani).toBeGreaterThanOrEqual(0.78);
      expect(dokum.cemaat!.gelmeOrani).toBeLessThanOrEqual(0.86);
      oranlar.add(dokum.cemaat!.gelmeOrani);
    }
    expect(oranlar.size).toBeGreaterThan(1);
  });

  it("bağış = gelen × bağış oranı × bağış birimi; gelen kapasiteyle sınırlanır", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const h = cemaatHesapla(s, b, 0.75);
    expect(h.gelen).toBeCloseTo(Math.min(musteriSayisi(s) * 0.75, h.kapasite));
    expect(h.bagisOrani).toBeCloseTo(0.65);
    expect(h.bagis).toBeCloseTo(h.gelen * 0.65 * BAGIS_BIRIMI * b.enflasyon * CEMAAT_DONEM_ETKILERI.durgunluk.bagis, 5);
    const buyuk = structuredClone(s);
    buyuk.meslek_musteri = 400;
    buyuk.pazar_musteri = 900;
    const hb = cemaatHesapla(buyuk, b, 0.75);
    expect(hb.gelen).toBeCloseTo(hb.kapasite);
    expect(hb.tasan).toBeGreaterThan(0);
  });

  it("faaliyet geliri inanan sayısına bağlıdır, kapasiteye değil", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const kucuk = cemaatHesapla(s, b, 0.75);
    const buyuk = structuredClone(s);
    buyuk.meslek_musteri = musteriSayisi(s) * 2;
    buyuk.pazar_musteri = s.pazar_musteri * 3;
    const hb = cemaatHesapla(buyuk, b, 0.75);
    expect(hb.faaliyetGelir).toBeCloseTo(kucuk.faaliyetGelir * 2, 5);
  });

  it("yardım harcaması toplam gelirin %10/%20/%30'u (dönem yardım etkisi 1 iken)", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    for (const [k, oran] of [["dusuk", 0.1], ["orta", 0.2], ["yuksek", 0.3]] as const) {
      const c = structuredClone(s);
      c.isletme!.cemaat!.yardim = k;
      const h = cemaatHesapla(c, b, 0.75);
      expect(h.yardim).toBeCloseTo(h.toplamGelir * oran, 5);
      expect(YARDIM_POLITIKASI[k].oran).toBe(oran);
    }
  });

  it("teşkilat aidatı gelirin %2'si; ayin masrafı bağışın %8'i; vergi brüt kârın %20'si (durgunluk)", async () => {
    const s = await din();
    const h = cemaatHesapla(s, isletmeBaglami(s), 0.75);
    expect(h.aidat).toBeCloseTo(h.toplamGelir * 0.02, 5);
    expect(h.ayinMasrafi).toBeCloseTo(h.bagis * 0.08, 5);
    expect(h.vergiOrani).toBeCloseTo(0.2, 5);
  });

  it("bağış politikası: zorunlu öşür bağış başına daha çok, bağış yapan oranı daha az", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const normal = cemaatHesapla(s, b, 0.75);
    const asir = structuredClone(s);
    asir.isletme!.cemaat!.bagis = "arti20";
    const ha = cemaatHesapla(asir, b, 0.75);
    expect(ha.bagisBirimi / normal.bagisBirimi).toBeCloseTo(BAGIS_POLITIKASI.arti20.miktar, 5);
    expect(ha.bagisOrani / normal.bagisOrani).toBeCloseTo(BAGIS_POLITIKASI.arti20.oran, 5);
  });

  it("vaaz kitlesi bağışı doğrudan çarpar: alt ×0.85, üst ×1.25", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const gen = cemaatHesapla(s, b, 0.75).bagisBirimi;
    for (const k of ["alt", "ust"] as const) {
      const c = structuredClone(s);
      c.isletme!.cemaat!.kitle = k;
      expect(cemaatHesapla(c, b, 0.75).bagisBirimi / gen).toBeCloseTo(KITLE_POLITIKASI[k].bagis, 5);
    }
  });

  it("fanatiklik bağış yapma oranını artırır (f=50 → ×1.3), tavan %95", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const f0 = cemaatHesapla(s, b, 0.75).bagisOrani;
    s.isletme!.cemaat!.fanatiklik = 50;
    expect(cemaatHesapla(s, b, 0.75).bagisOrani / f0).toBeCloseTo(1.3, 3);
    s.isletme!.cemaat!.fanatiklik = 100;
    s.isletme!.cemaat!.bagis = "eksi20";
    expect(cemaatHesapla(s, b, 0.75).bagisOrani).toBeLessThanOrEqual(0.95);
  });

  it("dönem çarpanları çarpımsal birleşir: kıtlık+savaş bağışı 0.70×0.90", async () => {
    const s = await din();
    s.ulke.donem!.tur = "kitlik";
    expect(cemaatDonemBilesik(s).bagis).toBeCloseTo(0.7);
    s.ulke.savasta = true;
    expect(cemaatDonemBilesik(s).bagis).toBeCloseTo(0.7 * 0.9);
    expect(CEMAAT_DONEM_ETKILERI.veba.ritual).toBeCloseTo(1.8);
    expect(CEMAAT_DONEM_ETKILERI.kitlik.emanet).toBeCloseTo(0.4);
  });

  it("Yılın gelir/gider dökümü dolar: satış=toplam gelir, net=brüt-vergi", async () => {
    const s = await din();
    ogretileriSec(s);
    const { net, dokum } = cemaatYilIsle(s, isletmeBaglami(s));
    expect(dokum.cemaat).toBeTruthy();
    expect(dokum.satis).toBeGreaterThan(0);
    expect(net).toBeCloseTo(dokum.brutKar - dokum.vergi, 1);
  });
});

describe("cemaat — rütbeye bağlı faaliyetler", () => {
  it("slot S1:1 S2:2 S3:2 S4:3 S5:3; faaliyetler rütbeyle açılır", async () => {
    const s = await din();
    const slotlar = [1, 2, 3, 4, 5].map((r) => {
      s.rutbe_seviye = r;
      return faaliyetSlotSayisi(s);
    });
    expect(slotlar).toEqual([1, 2, 2, 3, 3]);
    expect(FAALIYETLER.map((f) => f.minRutbe)).toEqual([1, 1, 2, 3, 4]);
  });

  it("rütbesi yetmeyen faaliyet ve slot fazlası karardan reddedilir", async () => {
    const s = await din();
    await isletmeOgretiSec(s.id, ogretiSecenekleri(1)[0].id);
    await expect(isletmeKararVer(s.id, [{ id: "emanet", acik: true }])).rejects.toThrow();
    await expect(isletmeKararVer(s.id, [{ id: "ritual", acik: true }])).rejects.toThrow(); // S1'de tek slot (tövbe açık)
    const ok = await isletmeKararVer(s.id, [{ id: "tovbe", acik: false }, { id: "ritual", acik: true }], { bagis: "arti10", ton: "atesli" });
    expect(ok.durum.cemaat!.politikalar.bagis.secili).toBe("arti10");
    expect(ok.durum.cemaat!.politikalar.ton.secili).toBe("atesli");
    await expect(isletmeKararVer(s.id, [], { bagis: "yok" })).rejects.toThrow();
  });

  it("görünüm cemaat verisini döner", async () => {
    const s = await din();
    const g = (await isletmeDurumGetir(s.id)).cemaat!;
    expect(g.faaliyetler).toHaveLength(5);
    expect(g.ogretiler.bekleyen?.seviye).toBe(1);
    expect(g.ahlak.bantlar).toHaveLength(4);
    expect(g.donem.yuzdeler).toBeTruthy();
    expect(g.politikalar.yardim.secenekler).toHaveLength(3);
  });
});

describe("cemaat — fanatiklik ve inanan akışı", () => {
  it("ateşli ton yılda +0.9 net (1.2 − 0.3 sönüm); ılımlı −1.8; dengeli −0.3", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    cm.ton = "atesli";
    expect(cemaatEtkenleri(s).fanatiklikDegisim).toBeCloseTo(0.9);
    cm.ton = "ilimli";
    expect(cemaatEtkenleri(s).fanatiklikDegisim).toBeCloseTo(-1.8);
    cm.ton = "dengeli";
    expect(cemaatEtkenleri(s).fanatiklikDegisim).toBeCloseTo(-0.3);
  });

  it("fanatiklik yıllık inanan kaçışı (%0.03·f) ve otorite kaybı (0.006·f) getirir", async () => {
    const s = await din();
    s.isletme!.cemaat!.fanatiklik = 50;
    const e = cemaatEtkenleri(s);
    expect(e.kalemler.find((k) => k.kod === "fanatik")!.deger).toBeCloseTo(-0.015, 5);
    expect(e.otorite).toBeCloseTo(-0.3, 5);
  });

  it("aşırılık olayı f>40 iken olur (şöhret −5, otorite −10); f≤40 iken olmaz", async () => {
    const s = await din();
    ogretileriSec(s);
    s.isletme!.cemaat!.fanatiklik = 95;
    s.un = 50;
    s.yonetim_iliski = 50;
    vi.spyOn(Math, "random").mockReturnValue(0.0001);
    const { dokum } = cemaatYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "asiri_olay")).toBe(true);
    const sakin = await din();
    ogretileriSec(sakin);
    sakin.isletme!.cemaat!.fanatiklik = 30;
    const sonuc = cemaatYilIsle(sakin, isletmeBaglami(sakin));
    expect(sonuc.dokum.uyarilar.some((u) => u.kod === "asiri_olay")).toBe(false);
  });

  it("ahlak bantları 25'erli: 0–24 −%1.5 · 25–49 0 · 50–74 +%0.5 · 75–100 +%1.5", () => {
    expect(AHLAK_BANTLARI.map((b) => [b.min, b.max])).toEqual([[0, 24], [25, 49], [50, 74], [75, 100]]);
    expect(ahlakInananEtkisi(0)).toBeCloseTo(-0.015);
    expect(ahlakInananEtkisi(24)).toBeCloseTo(-0.015);
    expect(ahlakInananEtkisi(25)).toBe(0);
    expect(ahlakInananEtkisi(49)).toBe(0);
    expect(ahlakInananEtkisi(50)).toBeCloseTo(0.005);
    expect(ahlakInananEtkisi(74)).toBeCloseTo(0.005);
    expect(ahlakInananEtkisi(75)).toBeCloseTo(0.015);
    expect(ahlakInananEtkisi(100)).toBeCloseTo(0.015);
  });

  it("düşük yardım ahlak ve inananı düşürür, bol yardım artırır", async () => {
    const s = await din();
    s.isletme!.cemaat!.yardim = "dusuk";
    const dusuk = cemaatEtkenleri(s);
    s.isletme!.cemaat!.yardim = "yuksek";
    const yuksek = cemaatEtkenleri(s);
    expect(dusuk.ahlak).toBeLessThan(yuksek.ahlak);
    expect(dusuk.kalemler.find((k) => k.kod === "yardim")!.deger).toBeLessThan(0);
    expect(yuksek.kalemler.find((k) => k.kod === "yardim")!.deger).toBeGreaterThan(0);
  });

  it("kapasite taşması: sığmayan inanan rakibe geçer, bina_tasti uyarısı çıkar", async () => {
    const s = await din();
    ogretileriSec(s);
    s.meslek_musteri = 200;
    s.pazar_musteri = 600;
    s.rakipler[0].musteri = 200;
    const rakipOnce = s.rakipler[0].musteri;
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const { dokum } = cemaatYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "bina_tasti")).toBe(true);
    expect(s.rakipler[0].musteri).toBeGreaterThan(rakipOnce);
    expect(s.meslek_musteri).toBeLessThan(200);
  });

  it("okul mezunu inanan getirir (kademe 1: %12)", async () => {
    const s = await din();
    ogretileriSec(s);
    s.isletme!.yatirimlar.okul = 1;
    const once = s.meslek_musteri;
    vi.spyOn(Math, "random").mockReturnValue(0.05);
    const { dokum } = cemaatYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "mezun")).toBe(true);
    expect(s.meslek_musteri).toBeGreaterThan(once);
  });
});

describe("cemaat — rakip saldırıları, veba kararı, Yap/Yapma", () => {
  it("engizisyon yalnız ahlak ≤45 iken seçilebilir (kademe 3)", async () => {
    const mod = await import("../src/game/cemaat");
    expect(mod).toBeTruthy();
    const { DINI_SALDIRI_AGIRLIKLARI } = await import("../src/data/cemaat");
    expect(DINI_SALDIRI_AGIRLIKLARI[3].engizisyon).toBeGreaterThan(0);
    expect(DINI_SALDIRI_AGIRLIKLARI[1].engizisyon).toBeUndefined();
  });

  it("veba kararı: 3 seçenek, geçici gelir durumu 0.45 / 0.70 / 0.85 (6 yıl) — kırsala çekilme yok", () => {
    const olay = OLAY_KURESEL.find((o) => o.id === "kuresel_veba_baslangici")!;
    expect(olay.secenekler).toHaveLength(3);
    const carpanlar = olay.secenekler.map((s) => s.basariliSonuc.durum_ekle?.gelir_carpani);
    expect(carpanlar).toEqual([0.45, 0.7, 0.85]);
    for (const s of olay.secenekler) {
      expect(s.basariliSonuc.durum_ekle?.kalan_yil).toBe(6);
      expect(s.basarisizSonuc.durum_ekle?.gelir_carpani).toBe(s.basariliSonuc.durum_ekle?.gelir_carpani);
    }
    expect(olay.secenekler.map((s) => s.basariliSonuc.veba_koruma)).toEqual([2, 1, 0]);
    expect(olay.secenekler.some((s) => /kırsal/i.test(s.metin))).toBe(false);
  });

  it("geçici durum çarpanı Din'de bağışa işler", async () => {
    const s = await din();
    const normal = cemaatHesapla(s, isletmeBaglami(s), 0.75).bagis;
    s.durumlar.push({ id: "veba_karantina", ad: "Karantina", tur: "gecici", kalan_yil: 6, gelir_carpani: 0.45 });
    const kapali = cemaatHesapla(s, isletmeBaglami(s), 0.75).bagis;
    expect(kapali / normal).toBeCloseTo(0.45, 5);
  });

  it("işletmede kalıcı maaş çarpanı bağışı değil müşteriyi etkiler; geçici durum bağışta kalır", async () => {
    const s = await din();
    const normal = cemaatHesapla(s, isletmeBaglami(s), 0.75).bagis;
    maasCarpaniUygula(s, 1.1);
    expect(cemaatHesapla(s, isletmeBaglami(s), 0.75).bagis).toBeCloseTo(normal, 6);
    s.durumlar.push({ id: "t", ad: "t", tur: "gecici", kalan_yil: 4, gelir_carpani: 1.1 });
    expect(cemaatHesapla(s, isletmeBaglami(s), 0.75).bagis / normal).toBeCloseTo(1.1, 3);
  });

  it("eş desteği yıllık müşteri artışıdır (eş bonusu 6+ → +1 müşteri); eşsizken 0", async () => {
    const { esMusteriBuyumesi } = await import("../src/game/isletme");
    const s = await din();
    s.es_adi = null;
    expect(esMusteriBuyumesi(s)).toBe(0);
    s.es_adi = "Eş";
    s.es_meslek_bonusu = 2;
    expect(esMusteriBuyumesi(s)).toBe(0);
    s.es_meslek_bonusu = 4;
    expect(esMusteriBuyumesi(s)).toBe(0);
    s.es_meslek_bonusu = 6;
    expect(esMusteriBuyumesi(s)).toBe(1);
  });

  it("Din Adamı talepleri: açıklama %50 / bağış %30 / destek %20; Yap otoriteyi artırır, Yapma düşürür; yalan reddedilir", async () => {
    const s = await din();
    const sayim = { aciklama: 0, bagis: 0, sadakat: 0 };
    for (let i = 0; i < 400; i++) sayim[yonetimTalebiUret(s).tur]++;
    expect(sayim.aciklama).toBeGreaterThan(150);
    expect(sayim.aciklama).toBeLessThan(250);
    expect(sayim.bagis).toBeGreaterThan(70);
    expect(sayim.sadakat).toBeGreaterThan(40);

    s.yonetim_talep = { id: "t", kimden: "yonetici", kimAdi: "x", tur: "aciklama", tutar: 0, kalem: "x", sonYil: s.yil + 3 };
    s.yonetim_iliski = 40;
    const ahlak0 = s.ahlak;
    const yap = await yonetimTalebiKararlastir(s.id, "kabul");
    expect(yap.state.yonetim_iliski).toBeGreaterThanOrEqual(53);
    expect(yap.state.yonetim_iliski).toBeLessThanOrEqual(55);
    expect(yap.state.ahlak).toBeLessThan(ahlak0);

    yap.state.yonetim_talep = { id: "t2", kimden: "yonetici", kimAdi: "x", tur: "aciklama", tutar: 0, kalem: "x", sonYil: s.yil + 3 };
    yap.state.yonetim_iliski = 60;
    const yapma = await yonetimTalebiKararlastir(s.id, "ret");
    expect(yapma.state.yonetim_iliski).toBeGreaterThanOrEqual(40);
    expect(yapma.state.yonetim_iliski).toBeLessThanOrEqual(42);

    yapma.state.yonetim_talep = { id: "t3", kimden: "yonetici", kimAdi: "x", tur: "aciklama", tutar: 0, kalem: "x", sonYil: s.yil + 3 };
    await expect(yonetimTalebiKararlastir(s.id, "yalan")).rejects.toThrow();
  });
});

describe("cemaat — eski kayıt göçü ve aranma/yatkınlık", () => {
  it("eski ticaret hatlı Din kaydı cemaate çevrilir", async () => {
    const s = await din();
    s.isletme!.hatlar = [{ id: "mum", acik: true, stok: 30, otomatik: true, siparis: 0, fiyat: "normal", son_talep: 0, son_satis: 0 }];
    s.isletme!.yatirimlar = { depo: 2, dukkan: 1 };
    delete (s.isletme as { cemaat?: unknown }).cemaat;
    cemaatHazirla(s);
    expect(s.isletme!.hatlar.map((h) => h.id)).toEqual(FAALIYETLER.map((f) => f.id));
    expect(s.isletme!.yatirimlar.depo).toBeUndefined();
    expect(s.isletme!.cemaat).toBeTruthy();
  });

  it("aranma yıldızı yıllık inanan ve ahlak kaybı getirir (gelir debuff'ı yerine)", async () => {
    const temiz = await din();
    ogretileriSec(temiz);
    const aranan = structuredClone(temiz);
    aranan.suc_seviyesi = 90;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    const ahlak0 = temiz.ahlak;
    cemaatYilIsle(temiz, isletmeBaglami(temiz));
    cemaatYilIsle(aranan, isletmeBaglami(aranan));
    rnd.mockRestore();
    expect(aranan.meslek_musteri).toBeLessThan(temiz.meslek_musteri);
    expect(aranan.ahlak).toBeLessThan(ahlak0 + 1);
    expect(aranan.ahlak).toBeLessThan(temiz.ahlak);
  });

  it("mesleğe yatkınlık gelir yerine inanan artışı sağlar (Mükemmel +2/yıl, Kötü −1/yıl; kalem inanan sayısına oranlanır)", async () => {
    const s = await din();
    const kalem = () => cemaatEtkenleri(s).kalemler.find((k) => k.kod === "yatkinlik")!.deger * Math.max(1, s.meslek_musteri);
    s.meslek_yatkinlik_seviyesi = 2;
    expect(kalem()).toBe(0);
    s.meslek_yatkinlik_seviyesi = 5;
    expect(kalem()).toBeCloseTo(2);
    s.meslek_yatkinlik_seviyesi = 4;
    expect(kalem()).toBeCloseTo(1);
    s.meslek_yatkinlik_seviyesi = 1;
    expect(kalem()).toBeCloseTo(-1);
  });

  it("başlangıç ahlak 20–60 ve şöhret 0–40 bandında", () => {
    for (let i = 0; i < 200; i++) {
      const c = createCharacter("Orta Çağ", "Fransa", "kasaba");
      expect(c.ahlak).toBeGreaterThanOrEqual(20);
      expect(c.ahlak).toBeLessThanOrEqual(60);
      expect(c.un).toBeGreaterThanOrEqual(0);
      expect(c.un).toBeLessThanOrEqual(40);
    }
  });

  it("aile mirası bonusu yok: aile mesleğini seçmek şöhret/para/etiket vermez", () => {
    const c = createCharacter("Orta Çağ", "Fransa", "kasaba");
    c.aile_meslegi = "Din Adamı Ailesi";
    const un = c.un;
    const para = c.para;
    mesleğiSec(c, "Din Adamı");
    expect(c.etiketler).not.toContain("aile_mirasi_surduruldu");
    expect(c.aile_mirasi_surduruldu).toBe(false);
    expect(c.un).toBeGreaterThanOrEqual(un);
    expect(c.para).toBe(para);
  });

  it("yatırım: bina, okul, aşevi, tanıtım, güvenlik", async () => {
    const s = await din();
    const g = (await isletmeDurumGetir(s.id)).yatirimlar.map((y) => y.id);
    expect(g).toEqual(["bina", "okul", "asevi", "tanitim", "guvenlik"]);
    await isletmeYatirimYap(s.id, "bina");
    const yeni = await stateGetir(s.id);
    expect(yeni.isletme!.yatirimlar.bina).toBe(1);
    expect(eskiKayitGocu).toBeTruthy();
  });
});
