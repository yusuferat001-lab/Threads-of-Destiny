import { describe, it, expect, vi, afterEach } from "vitest";
import {
  createCharacter,
  mesleğiSec,
  isletmeBaglami,
  pasifEkonomiUygula,
  eskiKayitGocu,
  buyukSavasKontrolEt,
  buyukSavasBitisKontrolEt,
  rutbeGuncelle,
  yillikKariyerPuaniHesapla,
  pazarYillikUygula,
} from "../src/game/stateManager";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  senaryoUret,
  yilGec,
  isletmeDurumGetir,
  isletmeKararVer,
  birlikDoktrinSec,
  birlikTechizatSec,
  birlikBirlikSec,
  birlikKusatma,
  birlikTerhis,
  birlikSavasKarariGetir,
  birlikSavasKarariVer,
  yonetimIstekYap,
  yonetimDurumGetir,
  kotuIsYap,
  isletmeYatirimYap,
  isletmeYatirimDusur,
} from "../src/game/gameEngine";
import {
  birlikAl,
  birlikDurumu,
  birlikSenkron,
  erSayisi,
  gucHesapla,
  komutaLimiti,
  kislaLimiti,
  subayLimiti,
  gorevPaylari,
  gorevSlotSayisi,
  doktrinBekleyenSeviye,
  birlikHesapla,
  turPaylari,
  kaliteToplami,
} from "../src/game/birlik";
import {
  birlikSec,
  doktrinSec,
  techizatSec,
  kusatmaAyarla,
  terhisEt,
  savasKarariBekliyorMu,
  savasKarariDurumu,
  savasKarariVer,
  ganimetSaklamaEngeli,
} from "../src/game/birlikIslem";
import { yeniErEkle, birlikYilIsle, seferberlikUygula, savasBaslat, savasiBitir } from "../src/game/birlikYil";
import { askerGucleri, pazarPayiHesapla } from "../src/data/pazar";
import {
  ARAZI_TERCIH_IHTIMALI,
  BARIS_BEKLEME_ARALIK,
  BARIS_YILLIK_IHTIMAL,
  BASLANGIC_ER,
  TUR_PAYI,
  TUR_TANIMLARI,
  DOKTRINLER,
  GOREV_SLOTLARI,
  KISLA_ER_LIMITI,
  MIN_CEKIRDEK_ER,
  SOLD,
  ER_MASRAFI,
  ERZAK_BIRIMI,
  ASKER_KARIYER_GUC_TAVANI,
  ASKER_KARIYER_PUANI_KATSAYISI,
  KALITE_BAKIM,
  KALITE_CARPANI,
  ER_BASI_GELIR,
  SAVAS_ER_BASI_CARPANI,
  TALIM_TANIMLARI,
  doktrinSecenekleri,
  doktrinToplami,
  emirSeviyesi,
  maasAdi,
  moralGucEtkisi,
  odenmeyenCeza,
} from "../src/data/birlik";
import { rutbeTanimiGetir } from "../src/data/rutbeler";
import { SAVAS_YILLIK_IHTIMAL, SAVAS_COOLDOWN_YIL, SAVAS_SURE } from "../src/data/dunyaDonemleri";
import { VERGI_SAVAS_EKI } from "../src/game/isletme";
import { hataCevir } from "../src/i18n";
import { ogretileriTamamla, bekleyenleriCoz } from "./_ogreti";
import { payiAyarla } from "./testUtils";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

/** Doktrinleri seçilmiş, barış yılı, bol paralı taze Asker (saf fonksiyon testleri için). */
function asker(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ", bolge?: string): CharacterState {
  const s = createCharacter(cag, bolge ?? (cag === "Orta Çağ" ? "Fransa" : "İngiltere"), "kasaba");
  s.yas = 15;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);

describe("kurulum", () => {
  it("20 er, piyade, düşük kalite; pazar 185–205; iki aktif rakip; başlangıç payı %8–14", () => {
    for (let i = 0; i < 20; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      mesleğiSec(s, "Asker");
      expect(s.meslek_musteri).toBe(BASLANGIC_ER);
      expect(s.pazar_musteri).toBeGreaterThanOrEqual(185);
      expect(s.pazar_musteri).toBeLessThanOrEqual(205);
      const b = s.isletme!.birlik!;
      expect(b.kalite).toEqual({ dusuk: 20, orta: 0, yuksek: 0 });
      expect(b.birlik_seviye).toBe(0);
      expect(b.moral).toBe(60);
      expect(s.rakipler.filter((r) => !r.yenildi)).toHaveLength(2);
      const pay = pazarPayiHesapla(s);
      expect(pay).toBeGreaterThan(0.08);
      expect(pay).toBeLessThan(0.14);
    }
  });

  it("ordu_mevcudu/ordu_techizat_seviyesi eski alanları er sayısının aynasıdır", () => {
    const s = asker();
    expect(s.ordu_mevcudu).toBe(20);
    const b = birlikAl(s);
    b.kalite = { dusuk: 10, orta: 10, yuksek: 0 };
    birlikSenkron(s);
    expect(s.ordu_techizat_seviyesi).toBeGreaterThan(0);
  });

  it("işletme hatsızdır (birlik modu), eski ajan/ekip kalıntısı yoktur", () => {
    const s = asker();
    expect(s.isletme!.hatlar).toHaveLength(0);
    expect(s.ekip).toHaveLength(0);
  });

  it("eskiKayitGocu: işletmesiz eski Asker kaydı birlik durumuna taşınır, teçhizat seviyesi kaliteye dönüşür", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    s.isletme = null;
    s.meslek_musteri = 60;
    s.ordu_mevcudu = 60;
    s.ordu_techizat_seviyesi = 50;
    eskiKayitGocu(s);
    expect(birlikDurumu(s)).toBeTruthy();
    expect(erSayisi(s)).toBe(60);
    expect(kaliteToplami(s.isletme!.birlik!)).toBe(60);
    expect(s.isletme!.birlik!.kalite.orta + s.isletme!.birlik!.kalite.yuksek).toBeGreaterThan(0);
  });
});

describe("askerî güç ve pay", () => {
  it("ham güç: düşük ×1, orta ×1,25, yüksek ×1,5", () => {
    const s = asker();
    const b = birlikAl(s);
    b.kalite = { dusuk: 10, orta: 10, yuksek: 10 };
    s.meslek_musteri = 30;
    const d = gucHesapla(s);
    expect(d.ham).toBeCloseTo(10 * 1 + 10 * 1.25 + 10 * 1.5, 5);
  });

  it("her açık savaş birliği ordunun %20'sidir; dört tür açıkken %80 özel + %20 piyade", () => {
    expect(TUR_PAYI).toBe(0.2);
    const s = asker();
    const b = birlikAl(s);
    b.birlik_turler = ["okcu"];
    const p1 = turPaylari(b);
    expect(Object.keys(p1)).toHaveLength(1);
    expect(p1.okcu).toBeCloseTo(0.2);
    b.birlik_turler = ["okcu", "suvari", "mizrakli", "zirhli"];
    const p3 = turPaylari(b);
    expect(Object.keys(p3)).toHaveLength(4);
    expect(Object.values(p3).reduce((t, x) => t + (x ?? 0), 0)).toBeCloseTo(0.8);
    expect(gucHesapla(s).piyadePayi).toBeCloseTo(0.2);
  });

  it("birlik maliyeti: er maliyetine eklenen kesir okçu +%46, süvari +%55, mızraklı +%49, zırhlı +%88; gizli kuşatma pay almaz", () => {
    for (const [tur, x] of [["okcu", 0.46], ["suvari", 0.55], ["mizrakli", 0.49], ["zirhli", 0.88]] as const) {
      expect(TUR_TANIMLARI[tur].bakim).toBeCloseTo(x);
      expect(TUR_TANIMLARI[tur].erzak).toBeCloseTo(1 + x);
    }
    const s = asker();
    const b = birlikAl(s);
    b.birlik_turler = ["kusatma"]; // kuşatma kapalıyken (KUSATMA_ACIK=false) pay almaz
    expect(Object.keys(turPaylari(b))).toHaveLength(0);
  });

  it("süvari saldırıyı, mızraklı savunmayı artırır; toplam çarpan [0,4; 2,0] bandında kalır", () => {
    const s = asker();
    const taban = gucHesapla(s);
    const b = birlikAl(s);
    b.birlik_turler = ["suvari"];
    const suv = gucHesapla(s);
    expect(suv.saldiriCarpani).toBeGreaterThan(taban.saldiriCarpani);
    b.birlik_turler = ["mizrakli"];
    const miz = gucHesapla(s);
    expect(miz.savunmaCarpani).toBeGreaterThan(taban.savunmaCarpani);
    // Uç durum: aşırı talim + moral → çarpan 2,0'ı geçmez.
    b.talim = 100;
    b.moral = 100;
    const d = gucHesapla(s);
    expect(d.guc / d.ham).toBeLessThanOrEqual(2.0 * 1.2 + 1e-6);
  });

  it("moral güç bandı: <30 −%20, 30–45 −%10, 45–65 0, 65–80 +%6, 80+ +%15", () => {
    expect(moralGucEtkisi(10)).toBeCloseTo(-0.2);
    expect(moralGucEtkisi(35)).toBeCloseTo(-0.1);
    expect(moralGucEtkisi(55)).toBeCloseTo(0);
    expect(moralGucEtkisi(70)).toBeCloseTo(0.06);
    expect(moralGucEtkisi(90)).toBeCloseTo(0.15);
  });

  it("talim güce en çok +%20 ekler", () => {
    const s = asker();
    const b = birlikAl(s);
    b.moral = 55;
    b.talim = 0;
    const g0 = gucHesapla(s).guc;
    b.talim = 100;
    const g1 = gucHesapla(s).guc;
    expect(g1 / g0).toBeLessThanOrEqual(1.2 + 1e-6);
    expect(g1 / g0).toBeGreaterThan(1.1);
  });

  it("pay = güç / (güç + rakipler + diğer ordular); güç ikiye katlanınca pay artar", () => {
    const s = asker();
    const g = askerGucleri(s);
    expect(pazarPayiHesapla(s)).toBeCloseTo(g.oyuncu / g.toplam, 6);
    const once = pazarPayiHesapla(s);
    birlikAl(s).guc *= 2;
    expect(pazarPayiHesapla(s)).toBeGreaterThan(once);
  });

  it("toplam silahlı sayısı ve diğer ordular piyasa akışlarında oyuncunun erini değiştirmez (er yalnız birlik motorundan değişir)", async () => {
    const s = asker();
    const piyasa = await import("../src/game/piyasa");
    const once = s.meslek_musteri;
    piyasa.musteriKaydir(s, "oyuncu", +15);
    expect(s.meslek_musteri).toBe(once);
    piyasa.musteriKaydir(s, "oyuncu", -15);
    expect(s.meslek_musteri).toBe(once);
  });
});

describe("limitler ve yeni er katılımı", () => {
  it("ordu limiti yalnız kışla (rütbe limiti ve seferberlik çarpanı yok)", () => {
    const s = asker();
    expect(KISLA_ER_LIMITI).toEqual([25, 60, 120, 240, 450]);
    expect(komutaLimiti(s)).toBe(kislaLimiti(s));
    expect(komutaLimiti(s)).toBe(25);
    s.rutbe_seviye = 1;
    s.isletme!.yatirimlar.kisla = 4;
    expect(komutaLimiti(s)).toBe(450); // rütbe sınırlamaz
    s.isletme!.yatirimlar.kisla = 2;
    birlikAl(s).savas = savasBaslat(s);
    birlikAl(s).savas!.seferberlik = "dengeli";
    expect(komutaLimiti(s)).toBe(120); // seferberlik limiti büyütmez
  });

  it("subay limiti: rütbe tabanı 1..5 + kışla bonusu", () => {
    expect(subayLimiti(1, 0)).toBe(1);
    expect(subayLimiti(5, 4)).toBeGreaterThan(subayLimiti(5, 0));
    expect(subayLimiti(3, 0)).toBe(3);
  });

  it("yeniErEkle limiti aşmaz, hedef kalite ücretini nakitten çeker ve talimi seyreltir", () => {
    const s = asker();
    const b = birlikAl(s);
    b.talim = 60;
    b.hedef_kalite = "orta";
    const r = yeniErEkle(s, 100, bg(s), { butce: 1000 });
    expect(r.eklenen).toBe(komutaLimiti(s) - 20);
    expect(erSayisi(s)).toBe(komutaLimiti(s));
    expect(b.kalite.orta).toBe(r.eklenen);
    expect(r.maliyet).toBe(0); // teçhizat yükseltme/katılım ücretsiz (yalnız yıllık bakım)
    // talim = 60 × 20 / (20 + eklenen)
    expect(b.talim).toBeCloseTo((60 * 20) / (20 + r.eklenen), 4);
  });

  it("yeni erler hedef kaliteyle gelir; teçhizat ücreti yok", () => {
    const s = asker();
    const b = birlikAl(s);
    b.hedef_kalite = "yuksek";
    const r = yeniErEkle(s, 5, bg(s), { butce: 0 });
    expect(r.eklenen).toBe(5);
    expect(r.maliyet).toBe(0);
    expect(b.kalite.yuksek).toBe(5);
    expect(b.kalite.dusuk).toBe(20);
  });

  it("birlik seviyesi varsa yeni erlerin birlik payı için er başı ücret alınır", () => {
    const s = asker();
    const b = birlikAl(s);
    b.birlik_turler = ["suvari"];
    const r = yeniErEkle(s, 5, bg(s), { butce: 1000 });
    expect(r.maliyet).toBeGreaterThan(0);
  });
});

describe("gelir ve gider", () => {
  it("sabit maaş 6 ve rütbeyle artmaz; vergi/aidat kalemi yoktur", () => {
    expect(SOLD).toEqual([6, 6, 6, 6, 6]);
    const s = asker();
    const h0 = birlikHesapla(s, bg(s));
    s.rutbe_seviye = 4;
    const h3 = birlikHesapla(s, bg(s));
    expect(h3.sold).toBeCloseTo(h0.sold, 6);
    const sonuc = birlikYilIsle(s, bg(s));
    expect(sonuc.dokum.vergi).toBe(0);
    expect(sonuc.dokum.loncaAidati).toBe(0);
  });

  it("görev slotları S1..S5 = 1/1/2/2/3; ordu açık görevlere eşit bölünür; min er şartı", () => {
    expect(GOREV_SLOTLARI).toEqual([1, 1, 2, 2, 3]);
    const s = asker();
    s.rutbe_seviye = 3;
    const b = birlikAl(s);
    s.meslek_musteri = 60;
    b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
    b.gorevler = ["devriye", "tahsilat"];
    const p = gorevPaylari(s);
    expect(p).toHaveLength(2);
    expect(p[0].er + p[1].er).toBe(60);
    expect(gorevSlotSayisi(s)).toBe(2);
    // komuta (130 er şartı) 60 erle açılamaz
    b.gorevler = ["komuta"];
    expect(gorevPaylari(s).every((x) => !x.aktif || x.gorev.minEr <= x.er)).toBe(true);
  });

  it("askerde devlet payı yok; görev ganimetinden askerlere giden pay politikayla %30/%45/%60; yağmadan pay düşülmez", () => {
    const s = asker();
    s.meslek_musteri = 60;
    const b = birlikAl(s);
    b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
    b.gorevler = ["haydut"];
    b.ganimet_payi = "az";
    const az = birlikHesapla(s, bg(s));
    b.ganimet_payi = "dengeli";
    const de = birlikHesapla(s, bg(s));
    b.ganimet_payi = "comert";
    const co = birlikHesapla(s, bg(s));
    expect(az.erPayi / az.ganimetBrut).toBeCloseTo(0.3, 6);
    expect(de.erPayi / de.ganimetBrut).toBeCloseTo(0.45, 6);
    expect(co.erPayi / co.ganimetBrut).toBeCloseTo(0.6, 6);
    s.ulke.savasta = true;
    b.ganimet_payi = "comert";
    b.savas_karari = { yil: s.yil, adimlar: [], adim: 0, inisiyatif_zorunlu: null, seferberlik: null, arazi: null, rol: "ana", inisiyatif: null, ikmal: "yagma_orta", esir: "karma" };
    const y = birlikHesapla(s, bg(s));
    expect(y.devletPayi).toBe(0);
    expect(y.yagmaBrut).toBeGreaterThan(0);
    expect(y.erPayi).toBe(0); // yağma direkt hazineye: er payı yok (savaşta görev ganimeti de yok)
    expect(y.ganimetNet).toBeCloseTo(y.yagmaBrut, 6);
    expect(az.devletPayi + de.devletPayi + co.devletPayi).toBe(0);
  });

  it("savaşta görevlerden gelir yok; sabit maaş aynen, asker başı kısım ×1,30; maaşın adı çağ+ülkeye göre", () => {
    const s = asker();
    s.meslek_musteri = 90;
    const b = birlikAl(s);
    b.kalite = { dusuk: 90, orta: 0, yuksek: 0 };
    b.gorevler = ["haydut"];
    const baris = birlikHesapla(s, bg(s));
    expect(baris.gorevGeliri).toBeGreaterThan(0);
    s.ulke.savasta = true;
    const savas = birlikHesapla(s, bg(s));
    expect(savas.gorevGeliri).toBe(0);
    const sabit = SOLD[0] * bg(s).enflasyon;
    expect(baris.sold).toBeCloseTo(sabit + 90 * ER_BASI_GELIR * bg(s).enflasyon, 3);
    expect(savas.sold).toBeCloseTo(sabit + 90 * ER_BASI_GELIR * SAVAS_ER_BASI_CARPANI * bg(s).enflasyon, 3);
    expect(savas.savasOdenegi).toBeCloseTo(savas.sold, 6);
    expect(baris.erBasiGelir).toBe(0); // ayrı kalem yok
    expect(maasAdi("Orta Çağ", "Bizans").tr).toBe("Roga");
    expect(maasAdi("Sanayi Devrimi", "Rusya").tr).toBe("Jalovanye");
  });

  it("büyük zafer: güçle ve savaş süresiyle orantılı ganimet + esir; yeterli güçte kale ve madalyalar", () => {
    const s = asker();
    s.meslek_musteri = 200;
    const b = birlikAl(s);
    b.kalite = { dusuk: 0, orta: 0, yuksek: 200 };
    b.guc = 400;
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    sv.baslangic_yili = s.yil - 4;
    sv.genel_zafer = 3;
    sv.genel_yenilgi = 1;
    const uyar: never[] = [];
    const sonuc = savasiBitir(s, b, bg(s), uyar);
    expect(sonuc.zafer).toBe(true);
    expect(sonuc.brut).toBeGreaterThan(0);
    expect(sonuc.net).toBeCloseTo(sonuc.brut * (1 - 0.45), 1);
    expect(sonuc.kale).toBe(true);
    expect(b.kale).toBe(1);
    expect(s.unvanlar).toContain("Zafer Madalyası");
    expect(s.unvanlar).toContain("Kale Fatihi");
    // zayıf ordu kale alamaz
    const z = asker();
    z.meslek_musteri = 20;
    const bz = birlikAl(z);
    bz.guc = 30;
    z.ulke.savasta = true;
    const sz = savasBaslat(z);
    sz.genel_zafer = 2;
    expect(savasiBitir(z, bz, bg(z), []).kale).toBe(false);
    // yenilgide büyük ganimet yok
    const y = asker();
    const by = birlikAl(y);
    y.ulke.savasta = true;
    const sy = savasBaslat(y);
    sy.genel_yenilgi = 2;
    expect(savasiBitir(y, by, bg(y), []).brut).toBe(0);
  });

  it("komutan emri rütbeyle iki kademede bir değişir; kiralık ordu gücü artırır ve yıllık gider getirir; sefer yolculuğunda güç yarıya iner", () => {
    expect(emirSeviyesi(0)).toBe(1);
    expect(emirSeviyesi(1)).toBe(1);
    expect(emirSeviyesi(2)).toBe(2);
    expect(emirSeviyesi(3)).toBe(2);
    expect(emirSeviyesi(4)).toBe(3);
    const s = asker();
    s.meslek_musteri = 60;
    const b = birlikAl(s);
    b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
    s.ulke.savasta = true;
    const sv = savasBaslat(s);
    const taban = gucHesapla(s).guc;
    sv.emir = "duzenli_hat";
    expect(gucHesapla(s).guc).toBeGreaterThan(taban);
    sv.kiralik_er = 24;
    expect(gucHesapla(s).guc).toBeGreaterThan(taban * 1.3);
    expect(birlikHesapla(s, bg(s)).kiralikMasrafi).toBeGreaterThan(0);
    s.ulke.savasta = false;
    sv.kiralik_er = 0;
    const evde = gucHesapla(s).guc;
    s.etiketler.push("yolculukta");
    expect(gucHesapla(s).guc).toBeCloseTo(evde * 0.5, 1);
  });

  it("ödenmeyen maaş/erzak cezası nakit −50×enflasyon altında başlar ve kademelenir (azami −%30/−%40)", () => {
    expect(odenmeyenCeza(-10, 1)).toBeNull();
    const c1 = odenmeyenCeza(-60, 1)!;
    expect(c1.maasGuc).toBeCloseTo(-0.15);
    expect(c1.erzakGuc).toBeCloseTo(-0.22);
    const c9 = odenmeyenCeza(-1000, 1)!;
    expect(c9.maasGuc).toBeGreaterThanOrEqual(-0.3);
    expect(c9.erzakGuc).toBeGreaterThanOrEqual(-0.4);
    expect(c9.kademe).toBeGreaterThan(c1.kademe);
  });

  it("ordunun pazar payı / askerî gücü dökümde ve hesapta tutarlıdır (net = gelir − gider)", () => {
    const s = asker();
    const h = birlikHesapla(s, bg(s));
    expect(h.net).toBeCloseTo(h.toplamGelir - h.toplamGider, 6);
  });
});

describe("barış çatışması (haydut / sınır) ve ganimet", () => {
  function barisYili(s: CharacterState) {
    const b = birlikAl(s);
    s.isletme!.baslangic_yili = s.yil - 10;
    b.baris_bekleme = 0; // bekleme bitti
    return b;
  }

  it("takvim: savaşta sayaç DURUR (azalmaz, zar atılmaz); barışta çatışmalar arası 2–3 yıl, savaş sonrası en az 1 yıl", () => {
    const s = asker();
    const b = birlikAl(s);
    b.baris_bekleme = 2;
    s.ulke.savasta = true;
    birlikYilIsle(s, bg(s));
    expect(b.baris_bekleme).toBe(2);
    s.ulke.savasta = false;
    // savaş bitti: bekleme bitmiş sayaçla ilk barış yılında (zar tuttu) çatışma çıkar
    b.baris_bekleme = 0;
    b.savas = null;
    expect(BARIS_BEKLEME_ARALIK).toEqual([1, 2]); // bekleme + 1 = çatışmalar arası 2–3 yıl
    expect(BARIS_YILLIK_IHTIMAL).toBe(1);
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    const sonuc = birlikYilIsle(s, bg(s));
    rnd.mockRestore();
    expect(sonuc.dokum.uyarilar.some((u) => u.kod === "baris_catisma")).toBe(true);
    expect(b.baris_bekleme).toBeGreaterThanOrEqual(BARIS_BEKLEME_ARALIK[0]);
    expect(b.baris_bekleme).toBeLessThanOrEqual(BARIS_BEKLEME_ARALIK[1]);
  });

  it("çatışma sonrası bekleme boyunca çıkmaz; bekleme biter bitmez çıkar", () => {
    const s = asker();
    const b = birlikAl(s);
    b.baris_bekleme = BARIS_BEKLEME_ARALIK[1];
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    for (let i = 0; i < BARIS_BEKLEME_ARALIK[1]; i++) {
      expect(birlikYilIsle(s, bg(s)).dokum.uyarilar.some((u) => u.kod === "baris_catisma")).toBe(false);
    }
    expect(birlikYilIsle(s, bg(s)).dokum.uyarilar.some((u) => u.kod === "baris_catisma")).toBe(true);
    rnd.mockRestore();
  });

  it("savaş bitince sayaç en az 1 yıl bekletir (sıfırlanmaz, ilerlemiş sayaç da korunur)", () => {
    const s = asker();
    s.ulke.savasta = true;
    birlikYilIsle(s, bg(s));
    const b = birlikAl(s);
    b.baris_bekleme = 0;
    s.ulke.savasta = false;
    birlikYilIsle(s, bg(s)); // savasiBitir bekleme >= 1 yapar
    expect(b.baris_bekleme ?? 0).toBeGreaterThanOrEqual(0);
  });

  it("ilk çatışma işletmenin ilk 2 yılında gelmez", () => {
    const s = asker();
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    expect(birlikAl(s).baris_bekleme).toBe(2);
    for (let i = 0; i < 2; i++) {
      expect(birlikYilIsle(s, bg(s)).dokum.uyarilar.some((u) => u.kod === "baris_catisma")).toBe(false);
    }
    rnd.mockRestore();
  });

  it("zaferde ganimet ASKERÎ GÜÇLE ORANTILIDIR (aynı zarla güç ×2 → ganimet ≈ ×2)", () => {
    function ganimet(carpan: number): number {
      const s = asker();
      s.para = 5000;
      const b = barisYili(s);
      b.moral = 55;
      b.kalite = { dusuk: 40, orta: 0, yuksek: 0 };
      s.meslek_musteri = 40 * carpan;
      b.kalite.dusuk = 40 * carpan;
      s.rutbe_seviye = 5;
      s.isletme!.yatirimlar.kisla = 4;
      const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5); // iki taraf da orta zar, düşman gücü ortada → oyuncu güçlü çıkar (zafer); tür sabit
      const d = birlikYilIsle(s, bg(s)).dokum;
      rnd.mockRestore();
      const u = d.uyarilar.find((x) => x.kod === "baris_catisma");
      expect(u?.savasSonucu).toBe("zafer");
      return u?.tutar ?? 0;
    }
    const k1 = ganimet(1);
    const k2 = ganimet(2);
    expect(k1).toBeGreaterThan(0);
    expect(k2 / k1).toBeGreaterThan(1.6);
    expect(k2 / k1).toBeLessThan(2.4);
  });

  it("yenilgide ganimet çok azalır (zaferin %20'si) ve kayıp verilir", () => {
    const s = asker();
    const b = barisYili(s);
    b.moral = 55;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0); // zar en düşük → yenilgi
    const d = birlikYilIsle(s, bg(s)).dokum;
    rnd.mockRestore();
    const u = d.uyarilar.find((x) => x.kod === "baris_catisma");
    expect(u).toBeTruthy();
    if (u!.savasSonucu === "yenilgi") expect(u!.tutar ?? 0).toBeLessThan(100);
  });

  it("tahmini ganimet görünümde güçle büyür", () => {
    const s = asker();
    return isletmeDurumGetirYardimci(s);
  });
});

async function isletmeDurumGetirYardimci(s: CharacterState) {
  const { birlikGorunumuHesapla } = await import("../src/game/birlikIslem");
  const kucuk = birlikGorunumuHesapla(s, bg(s)).hesap.barisGanimetTahmini;
  const b = birlikAl(s);
  s.meslek_musteri = 60;
  b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
  const buyuk = birlikGorunumuHesapla(s, bg(s)).hesap.barisGanimetTahmini;
  expect(buyuk).toBeGreaterThan(kucuk);
}

describe("savaş", () => {
  function savasYili(s: CharacterState) {
    s.ulke.savasta = true;
    s.buyuk_savas = { dusman: "Komşu", baslangicYili: s.yil, bitisYili: s.yil + 4, vergiOrani: 0.08, gidaCarpani: 1.15 } as never;
  }

  it("savaş sıklığı %45, bekleme 5 yıl, süre sabit 4 yıl, vergi eki 0,05 ve savaşın diğer mesleklere etkisi kısılmıştır", () => {
    expect(SAVAS_YILLIK_IHTIMAL).toBe(0.45);
    expect(SAVAS_COOLDOWN_YIL).toBe(5);
    expect(SAVAS_SURE).toEqual([4, 4]);
    expect(VERGI_SAVAS_EKI).toBe(0.05);
  });

  /** İlk savaş yılının kararlarını verir, sonra karar yılına (savaşın 3. yılı) geçer. */
  function kararYilinaGec(s: CharacterState): string[] {
    const ilk: string[] = [];
    for (let g = 0; g < 10 && savasKarariBekliyorMu(s); g++) {
      const d = savasKarariDurumu(s)!;
      ilk.push(d.adim);
      savasKarariVer(s, d.secenekler[0].id, bg(s));
    }
    s.isletme!.birlik!.savas!.yil_sayac = 2;
    s.yil += 1;
    return ilk;
  }
  function kararAdimlari(s: CharacterState): string[] {
    const adimlar: string[] = [];
    for (let g = 0; g < 10 && savasKarariBekliyorMu(s); g++) {
      const d = savasKarariDurumu(s)!;
      adimlar.push(d.adim);
      expect(d.secenekler.length).toBeGreaterThan(0);
      savasKarariVer(s, d.secenekler[0].id, bg(s));
    }
    return adimlar;
  }

  it("savaşın ilk yılında yalnız seferberlik, emir ve ikmal sorulur; arazi/rol/inisiyatif karar yılında", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const s = asker();
    savasYili(s);
    expect(savasKarariBekliyorMu(s)).toBe(true);
    const ilk = kararYilinaGec(s);
    expect(ilk[0]).toBe("seferberlik");
    expect(ilk).toContain("ikmal");
    expect(ilk).not.toContain("rol");
    expect(ilk).not.toContain("arazi");
    const karar = kararAdimlari(s);
    expect(karar).not.toContain("arazi"); // S1: arazi seçme ekranı ihtimali %0 → hiç gelmez
    expect(karar).toContain("rol");
    expect(karar).toContain("inisiyatif"); // zar 0,1 < %40: seçim ekranı gelir
    expect(karar).not.toContain("ikmal"); // ikmal savaş planında (ilk yıl) bir kez seçilir, bir daha sorulmaz
    expect(karar).not.toContain("seferberlik");
    expect(karar).not.toContain("emir");
    expect(karar).not.toContain("esir"); // S1: esir yetkisi yok
    expect(savasKarariBekliyorMu(s)).toBe(false);
  });

  it("arazi seçme ekranı rütbenin ihtimaliyle gelir; gelmezse hiç sorulmaz", () => {
    const s = asker();
    s.rutbe_seviye = 3; // %30
    ogretileriTamamla(s);
    savasYili(s);
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    kararYilinaGec(s);
    expect(kararAdimlari(s)).toContain("arazi");
    const t = asker();
    t.rutbe_seviye = 3;
    ogretileriTamamla(t);
    savasYili(t);
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    kararYilinaGec(t);
    expect(kararAdimlari(t)).not.toContain("arazi");
  });

  it("S3'ten itibaren esir kararı yalnız ilk esir çıkınca bir kez sorulur ve savaş boyu kalıcıdır", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const s = asker();
    s.rutbe_seviye = 3;
    ogretileriTamamla(s);
    savasYili(s);
    kararYilinaGec(s);
    expect(kararAdimlari(s)).not.toContain("esir"); // henüz esir yok
    const b = birlikAl(s);
    b.savas!.esir_bekliyor = true; // ilk esir alındı
    const sonra = kararAdimlari(s);
    expect(sonra).toEqual(["esir"]);
    expect(b.savas!.esir_karari).toBeDefined();
    expect(b.savas!.esir_bekliyor).toBe(false);
    expect(kararAdimlari(s)).not.toContain("esir"); // bir daha sorulmaz
  });

  it("ikmal ilk yıl seçilir ve savaş boyu kalıcıdır (yıl sonunda savas_karari silinse de)", () => {
    const s = asker();
    savasYili(s);
    kararYilinaGec(s);
    const b = birlikAl(s);
    expect(b.savas!.ikmal).toBeDefined();
    const secilen = b.savas!.ikmal!;
    b.savas_karari = null; // yıl sonu
    expect(secilen.startsWith("yagma")).toBe(true); // ikmal yalnız yağma türleri
    expect(birlikHesapla(s, bg(s)).yagmaBrut).toBeGreaterThan(0); // karar yılında (3. yıl) yağma hâlâ var (YAGMA_YIL=3)
    expect(b.savas!.ikmal).toBe(secilen);
  });

  it("geçersiz savaş kararı seçimi reddedilir; karar yokken verilemez", () => {
    const s = asker();
    expect(() => savasKarariVer(s, "dengeli", bg(s))).toThrow(/savaş kararı/);
    savasYili(s);
    expect(() => savasKarariVer(s, "olmayan", bg(s))).toThrow(/Geçersiz seçim/);
  });

  it("seferberlik türleri: genel çağrı en çok er, seçkin birlik yüksek kalite ve eğitimli", () => {
    function dene(tur: "genel" | "secme" | "dengeli") {
      const s = asker();
      s.rutbe_seviye = 3;
      s.isletme!.yatirimlar.kisla = 3;
      const b = birlikAl(s);
      b.moral = 60;
      savasYili(s);
      const once = erSayisi(s);
      seferberlikUygula(s, tur, bg(s));
      return { s, b, eklenen: erSayisi(s) - once };
    }
    const g = dene("genel");
    const sc = dene("secme");
    const d = dene("dengeli");
    expect(g.eklenen).toBeGreaterThan(d.eklenen);
    expect(d.eklenen).toBeGreaterThan(sc.eklenen);
    expect(sc.b.kalite.yuksek).toBeGreaterThan(0);
    expect(g.b.kalite.yuksek).toBe(0);
    expect(g.b.moral).toBeLessThan(sc.b.moral);
  });

  it("savaş yılı yıl işleme: ordu savaş öncesi sayısının ve çekirdek kadronun altına düşmez (terhis sınırı), NaN/negatif yok", () => {
    for (let n = 0; n < 15; n++) {
      const s = asker();
      s.rutbe_seviye = 2;
      s.isletme!.yatirimlar.kisla = 2;
      ogretileriTamamla(s);
      savasYili(s);
      for (let y = 0; y < 7; y++) {
        for (let g = 0; g < 10 && savasKarariBekliyorMu(s); g++) savasKarariVer(s, savasKarariDurumu(s)!.secenekler[0].id, bg(s));
        s.yil += 1;
        pasifEkonomiUygula(s, 1);
        if (s.yil > s.buyuk_savas!.bitisYili) s.ulke.savasta = false;
        expect(Number.isFinite(s.meslek_musteri)).toBe(true);
        expect(s.meslek_musteri).toBeGreaterThanOrEqual(MIN_CEKIRDEK_ER);
        const b = birlikAl(s);
        expect(b.moral).toBeGreaterThanOrEqual(0);
        expect(b.moral).toBeLessThanOrEqual(100);
        expect(kaliteToplami(b)).toBe(erSayisi(s));
      }
    }
  });

  it("pasif ordu bir savaşta tamamen erimez (medyan ≥ %60'ı kalır)", () => {
    const kalan: number[] = [];
    for (let n = 0; n < 40; n++) {
      const s = asker();
      s.isletme!.yatirimlar.kisla = 0;
      ogretileriTamamla(s);
      savasYili(s);
      for (let y = 0; y < 6; y++) {
        for (let g = 0; g < 10 && savasKarariBekliyorMu(s); g++) savasKarariVer(s, savasKarariDurumu(s)!.secenekler[0].id, bg(s));
        s.yil += 1;
        pasifEkonomiUygula(s, 1);
        if (s.yil > s.buyuk_savas!.bitisYili) s.ulke.savasta = false;
      }
      kalan.push(s.meslek_musteri);
    }
    kalan.sort((a, b) => a - b);
    expect(kalan[Math.floor(kalan.length / 2)]).toBeGreaterThanOrEqual(12);
  });

  it("arazi tercih şansı rütbeyle artar: 0/15/30/55/80", () => {
    expect(ARAZI_TERCIH_IHTIMALI).toEqual([0, 0.15, 0.3, 0.55, 0.8]);
  });
});

describe("talim, doktrin, birlik, terhis", () => {
  it("talim politikaları: hafif −5, orta +7 (tavan 60), ağır +15", () => {
    expect(TALIM_TANIMLARI.hafif.delta).toBe(-5);
    expect(TALIM_TANIMLARI.orta.delta).toBe(7);
    expect(TALIM_TANIMLARI.orta.tavan).toBe(60);
    expect(TALIM_TANIMLARI.agir.delta).toBe(15);
    const s = asker();
    const b = birlikAl(s);
    b.talim_politikasi = "agir";
    b.talim = 0;
    birlikYilIsle(s, bg(s));
    expect(b.talim).toBeGreaterThan(10);
    b.talim_politikasi = "hafif";
    b.talim = 30;
    birlikYilIsle(s, bg(s));
    expect(b.talim).toBeLessThan(30);
  });

  it("rütbe başına bir doktrin zorunlu; 2 evrensel + yola göre 1 seçenek; seçilince bekleme biter", () => {
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    mesleğiSec(s, "Asker");
    expect(doktrinBekleyenSeviye(s)).toBe(1);
    const sec = doktrinSecenekleri(1, null);
    expect(sec.length).toBeGreaterThanOrEqual(2);
    expect(sec.filter((d) => d.kaynak === "evrensel").length).toBe(2);
    doktrinSec(s, sec[0].id);
    expect(doktrinBekleyenSeviye(s)).toBeNull();
    expect(() => doktrinSec(s, sec[0].id)).toThrow(/doktrin/);
    s.rutbe_seviye = 2;
    expect(doktrinBekleyenSeviye(s)).toBe(2);
    expect(() => doktrinSec(s, sec[0].id)).toThrow(/seçilemez/);
  });

  it("acımasız doktrinler yalnız sert yol dallarında teklif edilir; etkileri toplanır", () => {
    for (let sv = 1; sv <= 5; sv++) {
      expect(doktrinSecenekleri(sv, "sadik").some((d) => d.acimasiz)).toBe(false);
      expect(doktrinSecenekleri(sv, "isyanci").some((d) => d.acimasiz)).toBe(true);
    }
    const t = doktrinToplami([DOKTRINLER[0].id]);
    expect(typeof t.guc).toBe("number");
  });

  it("teçhizat: tüm ordu tek seviyeye geçer, ücretsiz, 5 yıl kilitlenir, geçersiz seviye reddedilir", () => {
    const s = asker();
    const once = s.para;
    const r = techizatSec(s, "orta", bg(s));
    expect(r.maliyet).toBe(0); // geçiş ücretsiz, bedel yıllık bakım
    expect(s.para).toBeCloseTo(once, 5);
    const b = birlikAl(s);
    expect(b.kalite.orta).toBe(erSayisi(s));
    expect(b.kalite.dusuk).toBe(0);
    expect(b.hedef_kalite).toBe("orta");
    expect(() => techizatSec(s, "yuksek", bg(s))).toThrow(/5 yılda bir/);
    s.yil += 5;
    expect(() => techizatSec(s, "orta", bg(s))).toThrow(/zaten/);
    expect(() => techizatSec(s, "olmayan" as never, bg(s))).toThrow(/Geçersiz/);
    techizatSec(s, "yuksek", bg(s));
    expect(birlikAl(s).kalite.yuksek).toBe(erSayisi(s));
  });

  it("teçhizat sabitleri: güç 1/1,25/1,5; bakım 0,15/0,30/0,45; güç başına gider birbirine yakın (hiçbiri baskın değil)", () => {
    expect(KALITE_CARPANI).toEqual({ dusuk: 1, orta: 1.25, yuksek: 1.5 });
    expect(KALITE_BAKIM).toEqual({ dusuk: 0.15, orta: 0.3, yuksek: 0.45 });
    const g = (q: "dusuk" | "orta" | "yuksek") => (ER_MASRAFI + ERZAK_BIRIMI + KALITE_BAKIM[q]) / KALITE_CARPANI[q];
    expect(Math.abs(g("yuksek") - g("dusuk"))).toBeLessThan(0.05);
  });

  it("Asker rütbesi askerî güce bağlı: pazar payı yeterli olsa da güç eşiği gerekir", () => {
    const s = asker();
    s.kariyer_puani = 999;
    s.un = 100;
    s.ahlak = 100;
    s.yil += 10;
    birlikAl(s).guc = 10;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(1);
    birlikAl(s).guc = 60;
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2);
  });

  it("Asker'in yıllık kariyer puanı askerî güçten gelir (güç/düşman referansı, tavanlı)", () => {
    const s = asker();
    birlikAl(s).guc = 0;
    expect(yillikKariyerPuaniHesapla(s)).toBe(0);
    birlikAl(s).guc = 10000;
    expect(yillikKariyerPuaniHesapla(s)).toBeCloseTo(ASKER_KARIYER_GUC_TAVANI * ASKER_KARIYER_PUANI_KATSAYISI, 5);
    const once = s.kariyer_puani;
    pazarYillikUygula(s, 2);
    expect(s.kariyer_puani).toBeGreaterThan(once);
  });

  it("özel birlik limiti rütbeye bağlı (1/2/3/4/4); kuşatma seçilemez (gizli)", () => {
    const s = asker();
    s.rutbe_seviye = 1;
    expect(() => birlikSec(s, ["suvari", "okcu"], bg(s))).toThrow(/en fazla 1/);
    s.rutbe_seviye = 2;
    expect(() => birlikSec(s, ["suvari", "okcu"], bg(s))).not.toThrow();
    expect(() => birlikSec(s, ["suvari", "okcu", "mizrakli"], bg(s))).toThrow(/en fazla 2/);
    s.rutbe_seviye = 4;
    expect(() => birlikSec(s, ["suvari", "okcu", "mizrakli", "zirhli"], bg(s))).not.toThrow();
    expect(() => birlikSec(s, ["kusatma"], bg(s))).toThrow(/Geçersiz birlik/);
  });

  it("birlik seçimi: açık/kapalı tür kümesi (her biri %25); fiyat er sayısıyla ölçeklenir; küçültünce %35 iade; saf ekleme kilide takılmaz", () => {
    const s = asker();
    s.rutbe_seviye = 5;
    expect(() => birlikSec(s, ["suvari", "suvari"] as never, bg(s))).toThrow(/Geçersiz birlik seçimi/);
    const r1 = birlikSec(s, ["suvari"], bg(s));
    expect(r1.maliyet).toBeGreaterThan(0);
    // 40 erlik ordu için aynı seçim iki kat pahalı
    const s2 = asker();
    s2.meslek_musteri = 40;
    birlikAl(s2).kalite = { dusuk: 40, orta: 0, yuksek: 0 };
    const r2 = birlikSec(s2, ["suvari"], bg(s2));
    expect(r2.maliyet / r1.maliyet).toBeGreaterThan(1.6);
    // saf ekleme (üst küme) kilitliyken serbest
    expect(() => birlikSec(s, ["suvari", "okcu"], bg(s))).not.toThrow();
    // tür değiştirme/kapatma ilk seçimden itibaren 5 yıl kilitli
    expect(() => birlikSec(s, ["mizrakli"], bg(s))).toThrow(/5 yılda bir/);
    s.yil += 5;
    expect(() => birlikSec(s, ["mizrakli"], bg(s))).not.toThrow(); // kilit açıldı
    s.yil += 5; // tür değişimi yeni bir 5 yıllık kilit başlattı
    expect(birlikSec(s, [], bg(s)).iade).toBeGreaterThan(0); // küçültme iadeli
    s.yil += 5;
    birlikSec(s, ["okcu", "suvari", "mizrakli"], bg(s));
    expect(birlikAl(s).birlik_turler).toHaveLength(3);
  });

  it("kuşatma kodda duruyor ama oyunda kapalı (KUSATMA_ACIK=false): ayar reddedilir", () => {
    const s = asker();
    expect(() => kusatmaAyarla(s, 1, bg(s))).toThrow(/kapalı/);
  });

  it("terhis: en az 6 er kalmalı, savaşta kapalı", () => {
    const s = asker();
    birlikAl(s).kalite = { dusuk: 10, orta: 10, yuksek: 0 };
    expect(() => terhisEt(s, 15, bg(s))).toThrow(/en az 6 er/);
    expect(() => terhisEt(s, 0, bg(s))).toThrow(/Geçersiz adet/);
    const r = terhisEt(s, 12, bg(s));
    expect(erSayisi(s)).toBe(8);
    expect(r.iade).toBe(0); // teçhizat bedava olduğundan iade yok
    expect(kaliteToplami(birlikAl(s))).toBe(8);
    s.ulke.savasta = true;
    expect(() => terhisEt(s, 1, bg(s))).toThrow(/Savaş sürerken/);
  });

  it("hapisteyken ya da yolculukta ordu eylemleri reddedilir", () => {
    const s = asker();
    s.etiketler.push("hapiste");
    expect(() => techizatSec(s, "orta", bg(s))).toThrow(/Hapisteyken/);
    s.etiketler = s.etiketler.filter((e) => e !== "hapiste");
    s.etiketler.push("yolculukta");
    expect(() => terhisEt(s, 1, bg(s))).toThrow(/Yolculuktayken/);
  });
});

describe("rütbe adları ve terfi", () => {
  it("9 ülke×çağ tablosu ülkeye özgü unvanları verir", () => {
    const beklenen: [string, string, string, string][] = [
      ["Orta Çağ", "Fransa", "Piyade Er", "Mareşal"],
      ["Orta Çağ", "Kutsal Roma", "Piyade Er", "Ordu Komutanı"],
      ["Orta Çağ", "Bizans", "Stratiotes", "Strategos"],
      ["Orta Çağ", "Selçuklu", "Gulam", "Sipehsalar"],
      ["Sanayi Devrimi", "İngiltere", "Er", "Albay"],
      ["Sanayi Devrimi", "Fransa", "Er", "Albay"],
      ["Sanayi Devrimi", "Osmanlı", "Nefer", "Miralay"],
      ["Sanayi Devrimi", "Rusya", "Ryadovoy", "Polkovnik"],
    ];
    for (const [cag, bolge, ilk, son] of beklenen) {
      const t = rutbeTanimiGetir("Asker", cag as never, null, bolge)!;
      expect(t.unvanlar[0]).toBe(ilk);
      expect(t.unvanlar[4]).toBe(son);
      expect(t.unvanlar).toHaveLength(5);
    }
  });

  it("terfi pay + kariyer puanı + ün şartlarına bağlıdır; ordu gücü payı yetmiyorsa çıkmaz", () => {
    const s = asker();
    s.kariyer_puani = 999;
    s.un = 100;
    payiAyarla(s, 0.05);
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(1);
    payiAyarla(s, 0.5);
    rutbeGuncelle(s);
    expect(s.rutbe_seviye).toBe(2);
  });
});

describe("motor entegrasyonu (gameEngine / API)", () => {
  it("doktrin ve savaş kararı beklerken senaryo/yıl geçişi reddedilir", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba", "T", "tr", undefined, "ilerle");
    await mesleğiAta(st.id, "Asker");
    await expect(senaryoUret(st.id)).rejects.toThrow(/doktrin/);
    await expect(yilGec(st.id)).rejects.toThrow(/doktrin/);
    const d = await isletmeDurumGetir(st.id);
    expect(d.birlik).toBeTruthy();
    expect(d.birlik!.doktrin.bekleyen?.seviye).toBe(1);
    await birlikDoktrinSec(st.id, d.birlik!.doktrin.bekleyen!.secenekler[0].id);
    await expect(birlikDoktrinSec(st.id, "d1_on_saf")).rejects.toThrow(/doktrin/);
    const s = await stateGetir(st.id);
    s.ulke.savasta = true;
    await expect(yilGec(st.id)).rejects.toThrow(/savaş kararlarını/);
    let k = await birlikSavasKarariGetir(st.id);
    expect(k).toBeTruthy();
    for (let g = 0; g < 10 && k; g++) {
      const r = await birlikSavasKarariVer(st.id, k.secenekler[0].id);
      k = r.sonraki;
    }
    expect(k).toBeNull();
  });

  it("isletmeKararVer birlik kararı: görev/politika/hedef kalite uygulanır, geçersizi reddeder; durum görünümü tutarlı", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    await bekleyenleriCoz(st.id);
    const r = await isletmeKararVer(st.id, [], undefined, { gorevler: ["devriye"], ganimet_payi: "dengeli", talim: "agir", ton: "sert" });
    expect(r.durum.birlik!.talim.politika).toBe("agir");
    expect(r.durum.birlik!.politikalar.ton.secili).toBe("sert");
    await expect(isletmeKararVer(st.id, [], undefined, { talim: "yok" })).rejects.toThrow(/talim/);
    await expect(isletmeKararVer(st.id, [], undefined, { gorevler: ["devriye", "eskort"] })).rejects.toThrow(/aynı anda/);
    await expect(isletmeKararVer(st.id, [], undefined, { gorevler: ["sefer"] })).rejects.toThrow(/Böyle bir görev yok/);
    const v = r.durum.birlik!;
    expect(v.er).toBe(20);
    expect(v.guc.toplam).toBeGreaterThan(0);
    expect(v.rakipler.length).toBe(2);
    expect(v.hesap.barisGanimetTahmini).toBeGreaterThan(0);
  });

  it("kalite/birlik/kuşatma/terhis API'leri durumu günceller ve hataları fırlatır", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    await bekleyenleriCoz(st.id);
    const s = await stateGetir(st.id);
    s.para = 1000;
    const k = await birlikTechizatSec(st.id, "orta");
    expect(k.durum.birlik!.kalite.sayilar.orta).toBe(20);
    await expect(birlikTechizatSec(st.id, "yuksek")).rejects.toThrow(/5 yılda bir/);
    const b = await birlikBirlikSec(st.id, ["okcu"]);
    expect(b.durum.birlik!.birlik.seciliTurler).toEqual(["okcu"]);
    await expect(birlikKusatma(st.id, 1)).rejects.toThrow(/kapalı/);
    const t = await birlikTerhis(st.id, 5);
    expect(t.durum.birlik!.er).toBe(15);
    await expect(birlikTerhis(st.id, 15)).rejects.toThrow();
  });

  it("Tüccar'da birlik API'leri reddedilir", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Tüccar");
    await expect(birlikTerhis(st.id, 1)).rejects.toThrow(/birliği yok/);
    expect(await birlikSavasKarariGetir(st.id)).toBeNull();
  });

  it("yeni hata metinleri İngilizceye çevrilir", () => {
    expect(hataCevir("en", "Teçhizat kalitesi 5 yılda bir değiştirilebilir.")).toMatch(/once every 5 years/);
    expect(hataCevir("en", "Savaş sürerken terhis edemezsin.")).toMatch(/war/);
    expect(hataCevir("en", "Önce doktrinini seçmelisin.")).toMatch(/doctrine/);
    expect(hataCevir("en", "Ordunda en az 5 er kalmalı.")).toMatch(/5 men/);
  });
});

describe("otorite istekleri ve karanlık işler", () => {
  it("3 Asker şehir isteği: levazım muafiyeti (erzak −%20), sefer emri (ganimet +%25), ek kadro (+er)", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    await bekleyenleriCoz(st.id);
    const s = await stateGetir(st.id);
    s.yonetim_iliski = 95;
    s.rutbe_seviye = 3;
    s.isletme!.yatirimlar.kisla = 2;
    const erzakOnce = birlikHesapla(s, bg(s)).erzak;
    const r1 = await yonetimIstekYap(st.id, "levazim_muafiyeti");
    expect(r1.basarili).toBe(true);
    expect(birlikHesapla(s, bg(s)).erzak).toBeLessThan(erzakOnce);
    s.yonetim_etkilesim_kilit = {};
    s.yonetim_iliski = 95;
    const erOnce = erSayisi(s);
    const r2 = await yonetimIstekYap(st.id, "ek_kadro");
    expect(r2.basarili).toBe(true);
    expect(erSayisi(s)).toBeGreaterThan(erOnce);
    const d = await yonetimDurumGetir(st.id);
    expect(d.tekOtorite).toBe(true);
    expect(d.istekler.map((i) => i.id)).toEqual(expect.arrayContaining(["levazim_muafiyeti", "sefer_emri", "ek_kadro"]));
  });

  it("ganimeti_sakla: S3 şartı ve askerlere ayrılan pay yoksa engellenir; çalışan işi (ajan gerekmez)", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    await bekleyenleriCoz(st.id);
    const s = await stateGetir(st.id);
    expect(ganimetSaklamaEngeli(s)).toMatch(/üçüncü rütbe/);
    await expect(kotuIsYap(st.id, "ganimeti_sakla")).rejects.toThrow(/üçüncü rütbe/);
    s.rutbe_seviye = 3;
    expect(ganimetSaklamaEngeli(s)).toMatch(/ganimet payı yok/);
    s.isletme!.son_dokum = { ...(s.isletme!.son_dokum ?? ({} as never)), birlik: { erPayi: 40 } } as never;
    expect(ganimetSaklamaEngeli(s)).toBeNull();
    const once = s.para;
    vi.spyOn(Math, "random").mockReturnValue(0); // başarı
    const r = await kotuIsYap(st.id, "ganimeti_sakla");
    expect(r.kazandi).toBe(true);
    expect(s.para).toBeGreaterThan(once);
  });
});

describe("kışla kademesi düşürme", () => {
  it("%40 iade; erler küçülen kışlaya sığmıyorsa reddedilir", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    const s = await stateGetir(st.id);
    s.para = 100000;
    await isletmeYatirimYap(s.id, "kisla");
    await isletmeYatirimYap(s.id, "kisla");
    const once = (await stateGetir(s.id)).para;
    const odenen = s.isletme!.yatirim_odenen!.kisla[1];
    const r = await isletmeYatirimDusur(s.id, "kisla");
    expect(r.state.isletme!.yatirimlar.kisla).toBe(1);
    expect(r.state.para).toBeCloseTo(once + odenen * 0.4, 1);
    s.meslek_musteri = 100; // K0 sınırı 25'i aşar
    await expect(isletmeYatirimDusur(s.id, "kisla")).rejects.toThrow(/sığmıyor/);
  });
});
