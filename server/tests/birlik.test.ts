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
import { yeniErEkle, birlikYilIsle, seferberlikUygula, savasBaslat, savasiBitir, barisCatismaCoz } from "../src/game/birlikYil";
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
  GOREVLER,
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
  GANIMET_PAYI_TANIMLARI,
  TALIM_YENI_ER_GIRIS,
  MORAL_BOLLUK_YILLIK,
  yuksekPasifDusus,
  talimArtiEksi,
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
      expect(b.moral).toBe(50); // moral ve talim nötr noktada (50) başlar: güce etkisi 0
      expect(b.talim).toBe(50);
      expect(s.rakipler.filter((r) => !r.yenildi)).toHaveLength(2);
      const pay = pazarPayiHesapla(s);
      expect(pay).toBeGreaterThan(0.06); // teçhizat 0,75 / 1 / 1,25 sonrası başlangıç gücü %25 düştü (görev eşikleri ve düşman en son yeniden ayarlanacak)
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
  it("ham güç: düşük ×0,75, orta ×1, yüksek ×1,25", () => {
    const s = asker();
    const b = birlikAl(s);
    b.kalite = { dusuk: 10, orta: 10, yuksek: 10 };
    s.meslek_musteri = 30;
    const d = gucHesapla(s);
    expect(d.ham).toBeCloseTo(10 * 0.75 + 10 * 1 + 10 * 1.25, 5);
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

  it("özel birlik bakımı: birlik eri başına sabit tutar okçu 0,20, süvari 0,25, mızraklı 0,25, zırhlı 0,40; gizli kuşatma pay almaz", () => {
    for (const [tur, x] of [["okcu", 0.2], ["suvari", 0.25], ["mizrakli", 0.25], ["zirhli", 0.4]] as const) {
      expect(TUR_TANIMLARI[tur].bakimEriBasi).toBeCloseTo(x);
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

  it("moral güce etkisi: 50'de 0, 0'da −%15, 100'de +%20 (doğrusal, iki yönde farklı eğim)", () => {
    expect(moralGucEtkisi(0)).toBeCloseTo(-0.15);
    expect(moralGucEtkisi(25)).toBeCloseTo(-0.075);
    expect(moralGucEtkisi(50)).toBeCloseTo(0);
    expect(moralGucEtkisi(75)).toBeCloseTo(0.1);
    expect(moralGucEtkisi(100)).toBeCloseTo(0.2);
  });

  it("talim güce etkisi: 50'de 0, 0'da −%15, 100'de +%20; moral nötrken", () => {
    const s = asker();
    const b = birlikAl(s);
    b.moral = 50;
    b.talim = 50;
    const g50 = gucHesapla(s).guc;
    b.talim = 0;
    const oran0 = gucHesapla(s).guc / g50; // ortak çarpana (erzak vb.) bağlı küçük sapma
    expect(oran0).toBeGreaterThan(0.83);
    expect(oran0).toBeLessThan(0.87);
    b.talim = 100;
    const oran100 = gucHesapla(s).guc / g50;
    expect(oran100).toBeGreaterThan(1.17);
    expect(oran100).toBeLessThan(1.23);
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
    expect(KISLA_ER_LIMITI).toEqual([30, 70, 140, 280, 500]);
    expect(komutaLimiti(s)).toBe(kislaLimiti(s));
    expect(komutaLimiti(s)).toBe(30);
    s.rutbe_seviye = 1;
    s.isletme!.yatirimlar.kisla = 4;
    expect(komutaLimiti(s)).toBe(500); // rütbe sınırlamaz
    s.isletme!.yatirimlar.kisla = 2;
    birlikAl(s).savas = savasBaslat(s);
    birlikAl(s).savas!.seferberlik = "genel";
    expect(komutaLimiti(s)).toBe(140); // seferberlik limiti büyütmez
  });

  it("subay limiti: rütbe tabanı 1..5 + kışla bonusu, en çok 4", () => {
    expect(subayLimiti(1, 0)).toBe(1);
    expect(subayLimiti(3, 0)).toBe(3);
    expect(subayLimiti(3, 4)).toBe(4); // 3 + 2 = 5 → 4
    expect(subayLimiti(5, 0)).toBe(4); // 5 → 4
    expect(subayLimiti(5, 4)).toBe(4); // 7 → 4
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
    // talim = (60 × 20 + giriş talimi 15 × eklenen) / (20 + eklenen)
    expect(b.talim).toBeCloseTo((60 * 20 + 15 * r.eklenen) / (20 + r.eklenen), 4);
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
  it("sabit maaş 8,5 ve rütbeyle artmaz; aidat kalemi yoktur", () => {
    expect(SOLD).toEqual([8.5, 8.5, 8.5, 8.5, 8.5]);
    const s = asker();
    const h0 = birlikHesapla(s, bg(s));
    s.rutbe_seviye = 4;
    const h3 = birlikHesapla(s, bg(s));
    expect(h3.sold).toBeCloseTo(h0.sold, 6);
    const sonuc = birlikYilIsle(s, bg(s));
    expect(sonuc.dokum.vergi).toBe(0);
    expect(sonuc.dokum.loncaAidati).toBe(0);
  });

  it("tek görev: her rütbede aynı anda 1 görev, 5 görev var; ordunun tamamı o göreve çıkar; min güç şartı", () => {
    expect(GOREV_SLOTLARI).toEqual([1, 1, 1, 1, 1]);
    expect(GOREVLER).toHaveLength(5);
    const s = asker();
    s.rutbe_seviye = 3;
    const b = birlikAl(s);
    s.meslek_musteri = 60;
    b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
    b.gorevler = ["devriye", "tahsilat"]; // fazlası yok sayılır
    const p = gorevPaylari(s);
    expect(p).toHaveLength(1);
    expect(p[0].er).toBe(60);
    expect(gorevSlotSayisi(s)).toBe(1);
    // komuta (130 er şartı) 60 erle açılamaz
    b.gorevler = ["komuta"];
    expect(gorevPaylari(s).every((x) => !x.aktif || x.gorev.minEr <= x.er)).toBe(true);
  });

  it("er payı yalnız haydut/sınır çatışması ve savaş zaferi ganimetinden düşer (%30/%50/%70); görev ganimeti ve yağma doğrudan hazineye", () => {
    const s = asker();
    s.meslek_musteri = 60;
    const b = birlikAl(s);
    b.kalite = { dusuk: 60, orta: 0, yuksek: 0 };
    b.gorevler = ["komuta"];
    for (const id of ["az", "dengeli", "comert"] as const) {
      b.ganimet_payi = id;
      const h = birlikHesapla(s, bg(s));
      expect(h.devletPayi).toBe(0);
      expect(h.erPayi).toBe(0); // görev ganimetinden pay düşülmez
      expect(h.ganimetNet).toBeCloseTo(h.ganimetBrut, 6);
    }
    s.ulke.savasta = true;
    b.savas_karari = { yil: s.yil, adimlar: [], adim: 0, inisiyatif_zorunlu: null, seferberlik: null, arazi: null, rol: "ana", inisiyatif: null, ikmal: "yagma_orta", esir: "karma" };
    const y = birlikHesapla(s, bg(s));
    expect(y.yagmaBrut).toBeGreaterThan(0);
    expect(y.erPayi).toBe(0); // yağma direkt hazineye
    expect(y.ganimetNet).toBeCloseTo(y.yagmaBrut, 6);
    // savaş zaferi ganimetinden politikaya göre pay düşer
    const oranlar: Record<string, number> = { az: 0.3, dengeli: 0.5, comert: 0.7 };
    for (const id of ["az", "dengeli", "comert"] as const) {
      const z = asker();
      z.meslek_musteri = 200;
      const bz = birlikAl(z);
      bz.kalite = { dusuk: 0, orta: 0, yuksek: 200 };
      bz.guc = 400;
      bz.ganimet_payi = id;
      z.ulke.savasta = true;
      const sv = savasBaslat(z);
      sv.genel_zafer = 3;
      sv.genel_yenilgi = 1;
      const sonuc = savasiBitir(z, bz, bg(z), []);
      expect(sonuc.zafer).toBe(true);
      expect(sonuc.erPayi / sonuc.brut).toBeCloseTo(oranlar[id], 3);
    }
  });

  it("savaşta görevlerden gelir yok; sabit maaş aynen, asker başı kısım ×1,30; maaşın adı çağ+ülkeye göre", () => {
    const s = asker();
    s.meslek_musteri = 90;
    const b = birlikAl(s);
    b.kalite = { dusuk: 90, orta: 0, yuksek: 0 };
    b.gorevler = ["eskort"];
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
    expect(sonuc.net).toBeCloseTo(sonuc.brut * (1 - 0.5), 1);
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
    expect(b.catisma_bekleyen).toBeTruthy(); // çatışma çıktı; oyuncu kararını verene dek bekler
    expect(b.baris_bekleme).toBeGreaterThanOrEqual(BARIS_BEKLEME_ARALIK[0]);
    expect(b.baris_bekleme).toBeLessThanOrEqual(BARIS_BEKLEME_ARALIK[1]);
  });

  it("çatışma sonrası bekleme boyunca çıkmaz; bekleme biter bitmez çıkar", () => {
    const s = asker();
    const b = birlikAl(s);
    b.baris_bekleme = BARIS_BEKLEME_ARALIK[1];
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0);
    for (let i = 0; i < BARIS_BEKLEME_ARALIK[1]; i++) {
      birlikYilIsle(s, bg(s));
      expect(b.catisma_bekleyen).toBeFalsy();
    }
    birlikYilIsle(s, bg(s));
    expect(b.catisma_bekleyen).toBeTruthy();
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
      birlikYilIsle(s, bg(s));
      expect(birlikAl(s).catisma_bekleyen).toBeFalsy();
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
      birlikYilIsle(s, bg(s)); // çatışma kurulur (karar bekler)
      const u = barisCatismaCoz(s, b, bg(s), "saldiri");
      rnd.mockRestore();
      expect(u.zafer).toBe(true);
      return u.ganimet;
    }
    const k1 = ganimet(1);
    const k2 = ganimet(2);
    expect(k1).toBeGreaterThan(0);
    expect(k2 / k1).toBeGreaterThan(1.3); // güçle büyür (küçük ordularda ganimet tabanı oranı sınırlar)
    expect(k2 / k1).toBeLessThan(2.4);
  });

  it("yenilgide ganimet yok; baskında yalnız savunma, karşılaşmada iki yön de çözülür", () => {
    const s = asker();
    const b = barisYili(s);
    b.moral = 55;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0); // baskın (savunma zorunlu), zar en düşük
    birlikYilIsle(s, bg(s));
    expect(b.catisma_bekleyen?.baskin).toBe(true);
    const u = barisCatismaCoz(s, b, bg(s), "saldiri"); // baskında saldırı seçilse bile savunma sayılır
    rnd.mockRestore();
    expect(u.inisiyatif).toBe("savunma");
    if (!u.zafer) expect(u.ganimet).toBe(0);
    expect(b.catisma_bekleyen).toBeNull();
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

  it("seferberlik türleri (iki tür): Tüm Erkekler en çok er, Gazi Çağrısı orta kalite ve eğitimli; moral büyük çağrıda daha çok düşer", () => {
    function dene(tur: "genel" | "secme") {
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
    expect(g.eklenen).toBeGreaterThan(sc.eklenen);
    expect(sc.b.kalite.orta).toBeGreaterThan(0);
    expect(g.b.kalite.orta).toBe(0);
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
  it("talim politikaları: ücretsiz; politika artışı 0/+4/+9 (orta tavan 70), her yıl −2 unutma → net −2/+2/+7; moral +1/−1/−5", () => {
    expect(TALIM_TANIMLARI.hafif.delta).toBe(0);
    expect(TALIM_TANIMLARI.orta.delta).toBe(4);
    expect(TALIM_TANIMLARI.orta.tavan).toBe(70);
    expect(TALIM_TANIMLARI.agir.delta).toBe(9);
    expect([TALIM_TANIMLARI.hafif.masraf, TALIM_TANIMLARI.orta.masraf, TALIM_TANIMLARI.agir.masraf]).toEqual([0, 0, 0]);
    expect([TALIM_TANIMLARI.hafif.moral, TALIM_TANIMLARI.orta.moral, TALIM_TANIMLARI.agir.moral]).toEqual([1, -1, -5]);
    const s = asker();
    const b = birlikAl(s);
    b.talim_politikasi = "agir";
    b.talim = 40;
    b.moral = 60;
    birlikYilIsle(s, bg(s));
    expect(b.talim).toBeGreaterThan(42); // +9 × kalite çarpanı − 2 (yeni erlerin giriş talimi 15 hafifçe seyreltir)
    b.talim_politikasi = "hafif";
    b.talim = 40;
    birlikYilIsle(s, bg(s));
    expect(b.talim).toBeLessThan(40); // bakımsız talim düşer
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

  it("teçhizat sabitleri: güç 0,75/1/1,25; bakım 0,13/0,24/0,36; güç başına gider yükseldikçe biraz azalır (yükseltme teşvik edilir, ama hiçbiri baskın değil)", () => {
    expect(KALITE_CARPANI).toEqual({ dusuk: 0.75, orta: 1, yuksek: 1.25 });
    expect(KALITE_BAKIM).toEqual({ dusuk: 0.13, orta: 0.24, yuksek: 0.36 });
    const g = (q: "dusuk" | "orta" | "yuksek") => (ER_MASRAFI + ERZAK_BIRIMI + KALITE_BAKIM[q]) / KALITE_CARPANI[q];
    expect(g("yuksek")).toBeLessThan(g("orta"));
    expect(g("orta")).toBeLessThan(g("dusuk"));
    expect(g("dusuk") - g("yuksek")).toBeLessThan(0.1); // fark küçük: yükseltme zorunlu değil
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
    await expect(isletmeKararVer(st.id, [], undefined, { gorevler: ["devriye", "eskort"] })).rejects.toThrow(/[Aa]ynı anda/);
    await expect(isletmeKararVer(st.id, [], undefined, { gorevler: ["sefer"] })).rejects.toThrow(/Böyle bir görev yok/);
    const v = r.durum.birlik!;
    expect(v.er).toBe(20);
    expect(v.guc.toplam).toBeGreaterThan(0);
    expect(v.rakipler.length).toBe(0); // Asker'de rakip komutan yok
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

describe("v67 Madde 2 — talim / moral / ganimet payı", () => {
  /** Ordu kışla sınırında dolu (yeni er gelmez), standart teçhizat, bakım ödenir: yalnız politika etkisi ölçülür. */
  function sabitOrdu(politika: "hafif" | "orta" | "agir", talim: number, moral = 60) {
    const s = asker();
    s.para = 1_000_000;
    s.meslek_musteri = komutaLimiti(s);
    const b = birlikAl(s);
    b.kalite = { dusuk: 0, orta: s.meslek_musteri, yuksek: 0 };
    b.hedef_kalite = "orta";
    b.baris_bekleme = 99;
    b.gorevler = [];
    b.talim_politikasi = politika;
    b.talim = talim;
    b.moral = moral;
    s.ulke.donem = undefined as never; // dönem (bolluk/kıtlık) moral etkisi karışmasın
    return { s, b };
  }

  it("yıllık talim değişimi (unutma dahil): hafif −2, orta +2, ağır +7", () => {
    for (const [politika, beklenen] of [["hafif", -2], ["orta", 2], ["agir", 7]] as const) {
      const { s, b } = sabitOrdu(politika, 40);
      birlikYilIsle(s, bg(s));
      expect(b.talim).toBeCloseTo(40 + beklenen, 6);
    }
  });

  it("orta talim tavan 70'te durur (üstünde artmaz, yalnız söner)", () => {
    const { s, b } = sabitOrdu("orta", 69);
    birlikYilIsle(s, bg(s));
    expect(b.talim).toBeCloseTo(70 - 2 + 1 - 1 + 0, 0); // 69 + min(4, 70−69) − 2 = 68
    const o = sabitOrdu("orta", 72);
    birlikYilIsle(o.s, bg(o.s));
    expect(o.b.talim).toBeLessThan(72);
  });

  it("talim ücretsiz: masraf kalemi 0", () => {
    for (const politika of ["hafif", "orta", "agir"] as const) {
      const { s } = sabitOrdu(politika, 50);
      expect(birlikHesapla(s, bg(s)).talimMasrafi).toBe(0);
    }
  });

  it("politika morali: hafif +1, orta −1, ağır −5 (doğal −0,5 ile birlikte +0,5 / −1,5 / −5,5)", () => {
    for (const [politika, beklenen] of [["hafif", 0.5], ["orta", -1.5], ["agir", -5.5]] as const) {
      const { s, b } = sabitOrdu(politika, 50, 60);
      birlikYilIsle(s, bg(s));
      expect(b.moral).toBeCloseTo(60 + beklenen, 6);
    }
  });

  it("ganimet payı: askere %30/%50/%70, sana %70/%50/%30; yıllık moral −7/0/+4", () => {
    expect(GANIMET_PAYI_TANIMLARI.az.oran).toBe(0.3);
    expect(GANIMET_PAYI_TANIMLARI.dengeli.oran).toBe(0.5);
    expect(GANIMET_PAYI_TANIMLARI.comert.oran).toBe(0.7);
    expect([GANIMET_PAYI_TANIMLARI.az.moral, GANIMET_PAYI_TANIMLARI.dengeli.moral, GANIMET_PAYI_TANIMLARI.comert.moral]).toEqual([-7, 0, 4]);
  });

  it("bolluk dönemi artık ordu morali vermez", () => {
    expect(MORAL_BOLLUK_YILLIK).toBe(0);
  });

  it("yüksekte pasif düşüş: 70 üstü −(değer−70)×0,2 (80'de −2, 90'da −4, 100'de −6)", () => {
    expect(yuksekPasifDusus(70)).toBe(0);
    expect(yuksekPasifDusus(50)).toBe(0);
    expect(yuksekPasifDusus(80)).toBeCloseTo(2, 9);
    expect(yuksekPasifDusus(90)).toBeCloseTo(4, 9);
    expect(yuksekPasifDusus(100)).toBeCloseTo(6, 9);
    // hafif talim: talim 90 → 90 − 2 (unutma) − 4 (pasif) = 84
    const t = sabitOrdu("hafif", 90);
    birlikYilIsle(t.s, bg(t.s));
    expect(t.b.talim).toBeCloseTo(84, 6);
    // moral 90 (hafif +1, doğal −0,5, pasif −4) → 86,5
    const m = sabitOrdu("hafif", 50, 90);
    birlikYilIsle(m.s, bg(m.s));
    expect(m.b.moral).toBeCloseTo(86.5, 6);
  });

  it("yeni er giriş talimi 15: ortalamayı seyreltir", () => {
    expect(TALIM_YENI_ER_GIRIS).toBe(15);
  });

  it("politika metni: net sayı tek satır, ücretsiz, hafif talimin morali artı", () => {
    const hafif = talimArtiEksi("hafif");
    expect(hafif.arti.some((m) => m.tr === "Ücretsiz")).toBe(true);
    expect(hafif.arti.some((m) => m.tr.includes("morali +1"))).toBe(true);
    const orta = talimArtiEksi("orta");
    expect(orta.arti.some((m) => m.tr === "Talim yılda +2 değişir")).toBe(true);
    expect(orta.eksi.some((m) => m.tr.includes("unutma"))).toBe(false);
    const agir = talimArtiEksi("agir");
    expect(agir.arti.some((m) => m.tr === "Talim yılda +7 değişir")).toBe(true);
    expect(agir.eksi.some((m) => m.tr.includes("morali −5"))).toBe(true);
  });
});

describe("v67 Madde 3 — ekonomi sabitleri", () => {
  it("sabitler: er masrafı 0,23, erzak 0,13, devlet er başı 0,15, sold 8,5, savaş ödeneği ×2, yıllık sabit er yok", async () => {
    const d = await import("../src/data/birlik");
    expect(d.ER_MASRAFI).toBe(0.23);
    expect(d.ERZAK_BIRIMI).toBe(0.13);
    expect(d.ER_BASI_GELIR).toBe(0.15);
    expect(d.SOLD).toEqual([8.5, 8.5, 8.5, 8.5, 8.5]);
    expect(d.SAVAS_ER_BASI_CARPANI).toBe(2);
    expect(d.BARIS_YILLIK_ER).toBe(0);
    expect(d.KISLA_BAKIM).toEqual([3, 8, 22, 60, 150]);
    expect(d.KALITE_BAKIM).toEqual({ dusuk: 0.13, orta: 0.24, yuksek: 0.36 });
  });

  it("görev asgari güçleri 10/40/80/145/250; er başı katsayı 0,55…0,70 eşit adımlı", () => {
    const sira = [...GOREVLER].sort((a, b) => a.minGuc - b.minGuc);
    expect(sira.map((g) => g.minGuc)).toEqual([10, 40, 80, 145, 250]);
    expect(sira.map((g) => g.erBasi)).toEqual([0.55, 0.5875, 0.625, 0.6625, 0.7]);
  });

  it("gider (tam ağır teçhizat, özel birlik yok): 40 er 36,8 · 80 er 79,6 · 150 er 168,0 (enflasyonsuz); talim ücretsiz", () => {
    for (const [er, kisla, beklenen] of [[40, 1, 36.8], [80, 2, 79.6], [150, 3, 168.0]] as const) {
      const s = asker();
      s.ulke.donem = undefined as never; // dönem erzak çarpanı karışmasın
      s.isletme!.yatirimlar.kisla = kisla;
      s.meslek_musteri = er;
      const b = birlikAl(s);
      b.kalite = { dusuk: 0, orta: 0, yuksek: er };
      b.birlik_turler = [];
      b.yarali = 0;
      const h = birlikHesapla(s, bg(s));
      expect(h.talimMasrafi).toBe(0);
      expect(h.toplamGider / bg(s).giderEnflasyon).toBeCloseTo(beklenen, 1);
    }
  });

  it("görev geliri er bazlı: aynı er sayısında teçhizat/güç değişse de gelir sabit; er arttıkça artar", () => {
    const gelir = (er: number, kalite: "dusuk" | "yuksek") => {
      const s = asker();
      s.ulke.donem = undefined as never;
      s.rutbe_seviye = 3;
      s.isletme!.yatirimlar.kisla = 4;
      s.meslek_musteri = er;
      const b = birlikAl(s);
      b.kalite = { dusuk: 0, orta: 0, yuksek: 0, [kalite]: er } as never;
      b.gorevler = ["devriye"];
      b.moral = 50;
      return birlikHesapla(s, bg(s)).gorevGeliri;
    };
    expect(gelir(100, "yuksek") / gelir(100, "dusuk")).toBeCloseTo(1, 1);
    expect(gelir(150, "dusuk")).toBeGreaterThan(gelir(100, "dusuk"));
  });
});

describe("v67 Madde 4 — güç formülü", () => {
  it("piyade 0,95/1,05; özel birlik değerleri okçu 1,75/1,35, süvari 2,6/0,6 (saldırı), mızraklı 1,0/2,2 (savunma), zırhlı 1,5/2,4", async () => {
    const { PIYADE } = await import("../src/data/birlik");
    expect(PIYADE).toEqual({ saldiri: 0.95, savunma: 1.05 });
    const d = (t: "okcu" | "suvari" | "mizrakli" | "zirhli") => [TUR_TANIMLARI[t].saldiri, TUR_TANIMLARI[t].savunma];
    expect(d("okcu")).toEqual([1.75, 1.35]);
    expect(d("suvari")).toEqual([2.6, 0.6]);
    expect(d("mizrakli")).toEqual([1.0, 2.2]);
    expect(d("zirhli")).toEqual([1.5, 2.4]);
  });

  it("ağır teçhizat + 4 özel birlik güç artışı ≈ +%54 (eski +%77); dördü birden bile çarpan sınırı içinde", () => {
    const s = asker();
    s.ulke.donem = undefined as never;
    s.isletme!.yatirimlar.kisla = 3;
    s.rutbe_seviye = 5;
    s.meslek_musteri = 100;
    const b = birlikAl(s);
    b.kalite = { dusuk: 0, orta: 0, yuksek: 100 };
    b.moral = 50;
    b.talim = 50;
    b.birlik_turler = [];
    const duz = gucHesapla(s).guc;
    b.birlik_turler = ["okcu", "suvari", "mizrakli", "zirhli"];
    const dort = gucHesapla(s).guc;
    expect(dort / duz).toBeGreaterThan(1.5);
    expect(dort / duz).toBeLessThan(1.58);
  });

  it("özel birlik bakımı ayrı kalem: birlikteki er × er başı tutar (okçu 0,20 · süvari 0,25 · mızraklı 0,25 · zırhlı 0,40); er masrafı/erzak etkilenmez", () => {
    const kur = (turler: ("okcu" | "suvari" | "mizrakli" | "zirhli")[]) => {
      const s = asker();
      s.ulke.donem = undefined as never;
      s.rutbe_seviye = 5;
      s.isletme!.yatirimlar.kisla = 3;
      s.meslek_musteri = 100;
      const b = birlikAl(s);
      b.kalite = { dusuk: 0, orta: 100, yuksek: 0 };
      b.birlik_turler = turler;
      return { s, h: birlikHesapla(s, bg(s)) };
    };
    const yok = kur([]);
    const dort = kur(["okcu", "suvari", "mizrakli", "zirhli"]);
    expect(yok.h.birlikBakim).toBe(0);
    // 100 er × %20 = 20 er her birlikte: 20 × (0,20 + 0,25 + 0,25 + 0,40) = 22
    expect(dort.h.birlikBakim / bg(dort.s).giderEnflasyon).toBeCloseTo(22, 6);
    expect(dort.h.erMasrafi).toBeCloseTo(yok.h.erMasrafi, 6);
    expect(dort.h.erzak).toBeCloseTo(yok.h.erzak, 6);
    expect(dort.h.toplamGider - yok.h.toplamGider).toBeCloseTo(dort.h.birlikBakim, 6);
    // ordu büyüdükçe orantılı artar
    const buyuk = kur(["okcu"]);
    buyuk.s.meslek_musteri = 200;
    birlikAl(buyuk.s).kalite = { dusuk: 0, orta: 200, yuksek: 0 };
    const iki = birlikHesapla(buyuk.s, bg(buyuk.s)).birlikBakim;
    expect(iki / buyuk.h.birlikBakim).toBeCloseTo(2, 6);
  });

  it("rütbe güç eşikleri 18/70/150/340", async () => {
    const { RUTBE_GUC_ESIGI_ASKER } = await import("../src/data/rutbeler");
    expect(RUTBE_GUC_ESIGI_ASKER).toEqual({ 2: 18, 3: 70, 4: 150, 5: 340 });
  });

  it("yağma oranları 0,51 / 0,35 / 0,19; subay en çok 4; subay bonusları ~%10 düşük", async () => {
    const { IKMAL_TANIMLARI, SUBAY_MAKS } = await import("../src/data/birlik");
    expect(IKMAL_TANIMLARI.yagma_sert.yagma.gucOrani).toBe(0.51);
    expect(IKMAL_TANIMLARI.yagma_orta.yagma.gucOrani).toBe(0.35);
    expect(IKMAL_TANIMLARI.yagma_yumusak.yagma.gucOrani).toBe(0.19);
    expect(SUBAY_MAKS).toBe(4);
    const { SUBAY_DEGERLERI } = await import("../src/game/subay");
    expect(SUBAY_DEGERLERI.taarruz.saldiri).toEqual([0.081, 0.135, 0.18]);
  });
});
