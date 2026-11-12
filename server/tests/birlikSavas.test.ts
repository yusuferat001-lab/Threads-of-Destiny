import { afterEach, describe, expect, it, vi } from "vitest";
import { createCharacter, mesleğiSec, isletmeBaglami } from "../src/game/stateManager";
import {
  birlikAl,
  birlikHesapla,
  erSayisi,
  gorevPaylari,
  dusmanReferansGucu,
  gucHesapla,
  kaliteToplami,
  komutaLimiti,
  limitAsimEri,
  yaraliSayisi,
} from "../src/game/birlik";
import {
  dagit,
  kayipUygula,
  savasBaslat,
  savasKayipTavani,
  savasYiliCoz,
  savasiBitir,
  seferberlikUygula,
  yaraliIyilestir,
  yaraliIyilesmeSuresi,
  yaraliOrani,
} from "../src/game/birlikYil";
import {
  BARIS_KAYBI,
  ER_BASI_GELIR,
  KALE_GELIR,
  SAVAS_ER_BASI_CARPANI,
  SOLD,
  ERZAK_DONEM_CARPANI,
  GOREVLER,
  GOREV_DONEM_CARPANI,
  KALITE_BAKIM,
  KISLA_ER_LIMITI,
  LIMIT_ASIM_GIDER_CARPANI,
  MIN_CEKIRDEK_ER,
  SAVAS_KARAR_KAYBI,
  SAVAS_KARAR_YILI,
  SAVAS_KAYIP_TAVANI,
  SAVAS_ON_YIL_OLAYLARI,
  SAVAS_SONRA_KAYBI,
  SEFERBERLIK_KALMA_YENILGI,
  SEFERBERLIK_KALMA_ZAFER,
  SEFERBERLIK_TANIMLARI,
  YARALI_ORAN,
} from "../src/data/birlik";
import { birlikKararUygula } from "../src/game/birlikIslem";
import { ogretileriTamamla } from "./_ogreti";
import type { CharacterState, IsletmeUyari } from "../src/types";

afterEach(() => vi.restoreAllMocks());

function asker(): CharacterState {
  const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
  s.yas = 15;
  mesleğiSec(s, "Asker");
  s.ulke.savasta = false;
  s.para = 1000;
  ogretileriTamamla(s);
  return s;
}
const bg = (s: CharacterState) => isletmeBaglami(s);
/** Belirli büyüklükte ordu kurar (kışla yeterli, tek kalite). */
function ordu(s: CharacterState, n: number, kisla = 4): void {
  s.isletme!.yatirimlar.kisla = kisla;
  s.meslek_musteri = n;
  birlikAl(s).kalite = { dusuk: n, orta: 0, yuksek: 0 };
  birlikAl(s).yarali = 0;
}
function savasa(s: CharacterState, tur: "genel" | "dengeli" | "secme" = "genel") {
  s.ulke.savasta = true;
  const sv = savasBaslat(s);
  seferberlikUygula(s, tur, bg(s));
  return sv;
}

describe("tam sayı dağıtımı", () => {
  it("dagit: toplam birebir tutar, üst sınırı aşmaz, hepsi tam sayı", () => {
    for (let i = 0; i < 300; i++) {
      const toplam = Math.floor(Math.random() * 60);
      const a = Math.floor(Math.random() * 40);
      const b = Math.floor(Math.random() * 40);
      const r = dagit(toplam, [a, b], [a, b]);
      expect(r.every(Number.isInteger)).toBe(true);
      expect(r[0]).toBeLessThanOrEqual(a);
      expect(r[1]).toBeLessThanOrEqual(b);
      expect(r[0] + r[1]).toBe(Math.min(toplam, a + b));
    }
  });
  it("dagit: orantılıdır (en büyük kalan)", () => {
    expect(dagit(10, [30, 10])).toEqual([8, 2]);
    expect(dagit(3, [1, 1, 1])).toEqual([1, 1, 1]);
  });
});

describe("kayıp: ölü – yaralı – firar", () => {
  it("kayipUygula: tam sayı, çekirdek kadro korunur, yaralı ölünün 1,4–1,5 katı (revirsiz)", () => {
    for (let n = 0; n < 60; n++) {
      const s = asker();
      ordu(s, 100);
      const b = birlikAl(s);
      const k = kayipUygula(s, b, { oluPct: 8, firarPct: 4 });
      expect(Number.isInteger(k.olu)).toBe(true);
      expect(Number.isInteger(k.firar)).toBe(true);
      expect(Number.isInteger(k.yaralanan)).toBe(true);
      expect(erSayisi(s)).toBe(100 - k.olu - k.firar);
      expect(kaliteToplami(b)).toBe(erSayisi(s));
      expect(yaraliSayisi(s)).toBe(k.yaralanan);
      expect(k.yaralanan).toBeLessThanOrEqual(Math.round(k.olu * YARALI_ORAN[1]) + 1);
      expect(k.yaralanan).toBeGreaterThanOrEqual(Math.floor(k.olu * 1.0));
    }
    const s = asker();
    ordu(s, 8);
    kayipUygula(s, birlikAl(s), { oluPct: 90, firarPct: 90 });
    expect(erSayisi(s)).toBeGreaterThanOrEqual(MIN_CEKIRDEK_ER);
  });

  it("revir ve tabip yaralı oranını düşürür ve iyileşmeyi kısaltır (3 yıl → 1 yıl); oran en az 1", () => {
    const s = asker();
    ordu(s, 100);
    expect(yaraliIyilesmeSuresi(s)).toBe(3);
    const oranlar0 = Array.from({ length: 50 }, () => yaraliOrani(s));
    expect(Math.min(...oranlar0)).toBeGreaterThanOrEqual(1.4 - 1e-9);
    expect(Math.max(...oranlar0)).toBeLessThanOrEqual(1.5 + 1e-9);
    s.isletme!.yatirimlar.revir = 4;
    expect(yaraliIyilesmeSuresi(s)).toBe(1);
    const oranlar4 = Array.from({ length: 50 }, () => yaraliOrani(s));
    expect(Math.max(...oranlar4)).toBeLessThanOrEqual(1.5 - 0.16 + 1e-9);
    expect(Math.min(...oranlar4)).toBeGreaterThanOrEqual(1);
  });

  it("yaralılar tam sayı iyileşir ve süresi dolunca hepsi iyileşir; kademe iyileşmeyi hızlandırır", () => {
    function yilSayisi(revir: number) {
      const s = asker();
      ordu(s, 100);
      s.isletme!.yatirimlar.revir = revir;
      const b = birlikAl(s);
      b.yarali = 30;
      b.yarali_hizi = Math.ceil(30 / yaraliIyilesmeSuresi(s));
      let yil = 0;
      while (yaraliSayisi(s) > 0 && yil < 10) {
        const once = yaraliSayisi(s);
        const iyi = yaraliIyilestir(s, b);
        expect(Number.isInteger(iyi)).toBe(true);
        expect(yaraliSayisi(s)).toBe(once - iyi);
        yil++;
      }
      return yil;
    }
    expect(yilSayisi(0)).toBe(3);
    expect(yilSayisi(4)).toBe(1);
    expect(yilSayisi(2)).toBeLessThan(yilSayisi(0));
  });

  it("yaralı görevlerde çalışmaz, savaş gücüne katılmaz, tedavi gideri öder", () => {
    const s = asker();
    ordu(s, 60);
    s.rutbe_seviye = 3;
    birlikAl(s).gorevler = ["devriye", "haydut"];
    const saglam = gorevPaylari(s).reduce((t, x) => t + x.er, 0);
    const g0 = gucHesapla(s).guc;
    const h0 = birlikHesapla(s, bg(s));
    birlikAl(s).yarali = 20;
    const yarali = gorevPaylari(s).reduce((t, x) => t + x.er, 0);
    expect(saglam).toBe(60);
    expect(yarali).toBe(40);
    expect(gucHesapla(s).guc).toBeLessThan(g0);
    const h1 = birlikHesapla(s, bg(s));
    expect(h1.yaraliGideri).toBeCloseTo(20 * 0.2 * bg(s).giderEnflasyon, 4);
    expect(h0.yaraliGideri).toBe(0);
    expect(h1.gorevGeliri).toBeLessThan(h0.gorevGeliri);
  });
});

describe("savaş: 3. yıl tek karar savaşı", () => {
  it("1–2. yıl olay zarı, 3. yıl karar, sonrası sonuca göre düşük kayıp; oranlar tablo aralıklarında", () => {
    for (let n = 0; n < 40; n++) {
      const s = asker();
      ordu(s, 100);
      const b = birlikAl(s);
      s.ulke.savasta = true;
      savasBaslat(s);
      const f1 = savasYiliCoz(s, b, bg(s));
      const f2 = savasYiliCoz(s, b, bg(s));
      expect(f1.faz).toBe("on");
      expect(f2.faz).toBe("on");
      expect(f1.catisma).toBeNull();
      for (const f of [f1, f2]) {
        expect(f.oluPct).toBeLessThanOrEqual(Math.max(...SAVAS_ON_YIL_OLAYLARI.map((o) => o.olu[1])));
        expect(f.firarPct).toBeLessThanOrEqual(Math.max(...SAVAS_ON_YIL_OLAYLARI.map((o) => o.firar[1])));
      }
      const f3 = savasYiliCoz(s, b, bg(s));
      expect(b.savas!.yil_sayac).toBe(SAVAS_KARAR_YILI);
      expect(f3.faz).toBe("karar");
      expect(f3.catisma).not.toBeNull();
      const sonuc = b.savas!.sonuc!;
      expect(["zafer", "yenilgi"]).toContain(sonuc);
      const t = SAVAS_KARAR_KAYBI[sonuc];
      expect(f3.oluPct).toBeGreaterThanOrEqual(t.olu[0] - 1e-9);
      expect(f3.oluPct).toBeLessThanOrEqual(t.olu[1] + 1e-9);
      expect(f3.firarPct).toBeGreaterThanOrEqual(t.firar[0] - 1e-9);
      expect(f3.firarPct).toBeLessThanOrEqual(t.firar[1] + 1e-9);
      const f4 = savasYiliCoz(s, b, bg(s));
      expect(f4.faz).toBe("sonra");
      expect(f4.catisma).toBeNull();
      const so = SAVAS_SONRA_KAYBI[sonuc];
      expect(f4.oluPct).toBeGreaterThanOrEqual(so.olu[0] - 1e-9);
      expect(f4.oluPct).toBeLessThanOrEqual(so.olu[1] + 1e-9);
      // Sonuç bir kez zarlanır.
      expect(b.savas!.kanat_zafer + b.savas!.kanat_yenilgi).toBe(1);
      expect(b.savas!.genel_zafer + b.savas!.genel_yenilgi).toBe(1);
    }
  });

  it("kümülatif tavan: zaferde ölü ≤%6 + firar ≤%4, yenilgide ölü ≤%27 + firar ≤%10 (savaş başı toplam üzerinden)", () => {
    expect(SAVAS_KAYIP_TAVANI.zafer).toEqual({ olu: 6, firar: 4 });
    expect(SAVAS_KAYIP_TAVANI.yenilgi).toEqual({ olu: 27, firar: 10 });
    const s = asker();
    ordu(s, 100);
    const sv = savasa(s, "genel"); // 100 + 50 = 150
    expect(sv.baslangic_toplam).toBe(150);
    sv.sonuc = "zafer";
    expect(savasKayipTavani(s, birlikAl(s))).toEqual({ olu: 9, firar: 6 });
    sv.sonuc = "yenilgi";
    expect(savasKayipTavani(s, birlikAl(s))).toEqual({ olu: 40, firar: 15 });
    sv.olu_toplam = 38;
    sv.firar_toplam = 15;
    expect(savasKayipTavani(s, birlikAl(s))).toEqual({ olu: 2, firar: 0 });
  });

  it("savaş boyu toplam kayıp tavanı aşılmaz (yenilgi ≤%37, zafer ≤%10); tüm sayaçlar tam sayı", () => {
    for (let n = 0; n < 40; n++) {
      const s = asker();
      ordu(s, 120);
      const b = birlikAl(s);
      const sv = savasa(s, "genel");
      const T = sv.baslangic_toplam!;
      for (let y = 0; y < 5; y++) {
        const fy = savasYiliCoz(s, b, bg(s));
        const tavan = savasKayipTavani(s, b);
        const k = kayipUygula(s, b, { oluPct: fy.oluPct, firarPct: fy.firarPct, oluTavan: tavan.olu, firarTavan: tavan.firar });
        expect(Number.isInteger(k.olu) && Number.isInteger(k.firar) && Number.isInteger(k.yaralanan)).toBe(true);
        expect(Number.isInteger(sv.seferberlik_er) && Number.isInteger(sv.seferberlik_yarali ?? 0)).toBe(true);
        expect(sv.seferberlik_yarali ?? 0).toBeLessThanOrEqual(sv.seferberlik_er);
        expect(yaraliSayisi(s)).toBeLessThanOrEqual(erSayisi(s));
      }
      const sinir = sv.sonuc === "yenilgi" ? SAVAS_KAYIP_TAVANI.yenilgi : SAVAS_KAYIP_TAVANI.zafer;
      expect(sv.olu_toplam!).toBeLessThanOrEqual(Math.floor((T * sinir.olu) / 100));
      expect(sv.firar_toplam!).toBeLessThanOrEqual(Math.floor((T * sinir.firar) / 100));
      expect(kaliteToplami(b)).toBe(erSayisi(s));
    }
  });

  it("ana ordu ve seferberlik erleri aynı yüzdeyle kesilir (en büyük kalan yöntemi)", () => {
    const s = asker();
    ordu(s, 100);
    const b = birlikAl(s);
    const sv = savasa(s, "genel"); // 100 ana + 50 seferber
    expect(sv.seferberlik_er).toBe(50);
    const k = kayipUygula(s, b, { oluPct: 20, firarPct: 0 });
    // 150 × %20 ≈ 30 ölü; seferberler payı 1/3 ≈ 10
    expect(k.oluLevy).toBeGreaterThanOrEqual(Math.floor((k.olu * 50) / 150) - 1);
    expect(k.oluLevy).toBeLessThanOrEqual(Math.ceil((k.olu * 50) / 150) + 1);
    expect(sv.seferberlik_er).toBe(50 - k.oluLevy);
  });
});

describe("seferberlik ve savaş sonu terhis", () => {
  it("üç seçenek: genel +%50 düşük, dengeli +%28 orta, seçkin +%12 yüksek teçhizat; gönüllü yok", () => {
    expect(SEFERBERLIK_TANIMLARI.genel.er).toBe(0.5);
    expect(SEFERBERLIK_TANIMLARI.dengeli.er).toBe(0.28);
    expect(SEFERBERLIK_TANIMLARI.secme.er).toBe(0.12);
    for (const [tur, kalite] of [["genel", "dusuk"], ["dengeli", "orta"], ["secme", "yuksek"]] as const) {
      const s = asker();
      ordu(s, 100);
      const sv = savasa(s, tur);
      expect(sv.seferberlik_kalite).toBe(kalite);
      expect(birlikAl(s).kalite[kalite]).toBe(100 * 0 + (kalite === "dusuk" ? 100 : 0) + sv.seferberlik_er);
    }
  });

  it("savaş sonu: kalan seferber zaferde %35–45, yenilgide %20–25 (hayatta kalanlar üzerinden), yaralı/sağlam oransal; ana ordu değişmez", () => {
    for (const sonuc of ["zafer", "yenilgi"] as const) {
      for (let n = 0; n < 25; n++) {
        const s = asker();
        ordu(s, 100);
        const b = birlikAl(s);
        const sv = savasa(s, "genel");
        sv.sonuc = sonuc;
        // 10 seferber yaralı varsayılsın
        sv.seferberlik_yarali = 10;
        b.yarali = 10;
        const anaOnce = erSayisi(s) - sv.seferberlik_er;
        const hayatta = sv.seferberlik_er;
        s.ulke.savasta = false;
        const uyarilar: IsletmeUyari[] = [];
        savasiBitir(s, b, bg(s), uyarilar);
        const kalan = erSayisi(s) - anaOnce;
        const [lo, hi] = sonuc === "zafer" ? SEFERBERLIK_KALMA_ZAFER : SEFERBERLIK_KALMA_YENILGI;
        expect(Number.isInteger(kalan)).toBe(true);
        expect(kalan).toBeGreaterThanOrEqual(Math.round(hayatta * lo) - 1);
        expect(kalan).toBeLessThanOrEqual(Math.round(hayatta * hi) + 1);
        // yaralı kalanlar sağlam/yaralı oranına uyar (10/50 = %20)
        expect(yaraliSayisi(s)).toBeLessThanOrEqual(kalan);
        expect(yaraliSayisi(s)).toBeLessThanOrEqual(Math.round((kalan * 10) / hayatta) + 1);
        expect(b.savas).toBeNull();
        expect(kaliteToplami(b)).toBe(erSayisi(s));
      }
    }
  });

  it("gönüllü akını yok: zaferde ordu kalan seferberler dışında büyümez", () => {
    const s = asker();
    ordu(s, 100);
    const b = birlikAl(s);
    const sv = savasa(s, "dengeli");
    sv.sonuc = "zafer";
    const ana = erSayisi(s) - sv.seferberlik_er;
    s.ulke.savasta = false;
    savasiBitir(s, b, bg(s), []);
    expect(erSayisi(s)).toBeLessThanOrEqual(ana + Math.round(sv.seferberlik_er * 0.45) + 1);
  });
});

describe("limit aşımı", () => {
  it("kışla limitini aşan her er masraf ve erzakta ×3 öder; savaşta seferberlik erleri muaf", () => {
    expect(LIMIT_ASIM_GIDER_CARPANI).toBe(3);
    const s = asker();
    ordu(s, 25, 0); // limit 25
    expect(komutaLimiti(s)).toBe(KISLA_ER_LIMITI[0]);
    const h0 = birlikHesapla(s, bg(s));
    expect(limitAsimEri(s)).toBe(0);
    s.meslek_musteri = 35;
    birlikAl(s).kalite = { dusuk: 35, orta: 0, yuksek: 0 };
    expect(limitAsimEri(s)).toBe(10);
    const h1 = birlikHesapla(s, bg(s));
    const birim = (h0.erMasrafi + h0.erzak) / 25;
    expect(h1.erMasrafi + h1.erzak).toBeCloseTo(birim * (25 + 10 * 3), 4);
    expect(h1.limitAsimGideri).toBeCloseTo(birim * 10 * 2, 4);
    // savaşta: seferberlik erleri aşım sayılmaz
    s.ulke.savasta = true;
    savasBaslat(s).seferberlik_er = 10;
    expect(limitAsimEri(s)).toBe(0);
  });

  it("devşirme limitte durur (limit dolunca yıllık artış 0)", () => {
    const s = asker();
    ordu(s, 25, 0);
    birlikAl(s).zar_bonusu = 0;
    for (let i = 0; i < 5; i++) birlikYilKos(s);
    expect(erSayisi(s)).toBeLessThanOrEqual(25);
  });
});

import { birlikYilIsle } from "../src/game/birlikYil";
function birlikYilKos(s: CharacterState) {
  s.yil += 1;
  return birlikYilIsle(s, bg(s));
}

describe("barış çatışması (haydut / sınır): ölü – yaralı – firar", () => {
  it("tablo: zafer ölü %0,5–1,5 firar 0; yenilgi ölü %2–4 firar %1–2", () => {
    expect(BARIS_KAYBI.zafer.olu).toEqual([0.5, 1.5]);
    expect(BARIS_KAYBI.zafer.firar).toEqual([0, 0]);
    expect(BARIS_KAYBI.yenilgi.olu).toEqual([2, 4]);
    expect(BARIS_KAYBI.yenilgi.firar).toEqual([1, 2]);
  });
  it("yıl işleme sayıları tam sayı kalır; ordu çekirdeğin altına inmez", () => {
    for (let n = 0; n < 20; n++) {
      const s = asker();
      ordu(s, 80);
      for (let y = 0; y < 12; y++) {
        const d = birlikYilKos(s).dokum;
        expect(Number.isInteger(d.birlik!.olen)).toBe(true);
        expect(Number.isInteger(d.birlik!.firar)).toBe(true);
        expect(Number.isInteger(d.birlik!.yaralanan ?? 0)).toBe(true);
        expect(Number.isInteger(d.birlik!.yarali ?? 0)).toBe(true);
        expect(erSayisi(s)).toBeGreaterThanOrEqual(MIN_CEKIRDEK_ER);
        expect(yaraliSayisi(s)).toBeLessThanOrEqual(erSayisi(s));
        expect(kaliteToplami(birlikAl(s))).toBe(erSayisi(s));
      }
    }
  });
});

describe("görev geliri ve erzak tabloları", () => {
  it("her görevin asker başı net kazancı 1,00–1,50 arası, açılış eşiği (askeri güç) 10–230 ve görev açıldıkça artar; masraf alanı yok", () => {
    const sira = [...GOREVLER].sort((a, b) => a.minGuc - b.minGuc);
    let onceki = 0;
    for (const g of sira) {
      expect("masraf" in g).toBe(false);
      expect(g.erBasi).toBeGreaterThanOrEqual(1.0 - 1e-6);
      expect(g.erBasi).toBeLessThanOrEqual(1.5 + 1e-6);
      expect(g.erBasi).toBeGreaterThanOrEqual(onceki - 1e-6);
      onceki = g.erBasi;
    }
    expect(sira[0].minGuc).toBe(10);
    expect(sira[sira.length - 1].minGuc).toBe(230);
    expect(sira[0].erBasi).toBe(1);
    expect(sira[sira.length - 1].erBasi).toBe(1.5);
    expect(GOREVLER.filter((g) => (g.sohret ?? 0) > 0).map((g) => g.id).sort()).toEqual(["komuta", "muhafiz"]);
  });
  it("erzak dönem çarpanı 0,8–1,3; teçhizat bakımı 0,15 / 0,30 / 0,45", () => {
    for (const v of Object.values(ERZAK_DONEM_CARPANI)) {
      expect(v).toBeGreaterThanOrEqual(0.8);
      expect(v).toBeLessThanOrEqual(1.3);
    }
    expect(KALITE_BAKIM).toEqual({ dusuk: 0.15, orta: 0.3, yuksek: 0.45 });
    const s = asker();
    ordu(s, 40);
    birlikAl(s).kalite = { dusuk: 10, orta: 10, yuksek: 20 };
    const h = birlikHesapla(s, bg(s));
    expect(h.techizatBakim).toBeCloseTo((10 * 0.15 + 10 * 0.3 + 20 * 0.45) * bg(s).giderEnflasyon, 4);
  });
});

describe("ödeme yapısı, kale ve şöhret (v33 ek tur 3)", () => {
  it("sabit maaş 6; asker başı 0,25, savaşta ×3", () => {
    expect(SOLD).toEqual([6, 6, 6, 6, 6]);
    expect(ER_BASI_GELIR).toBe(0.25);
    expect(SAVAS_ER_BASI_CARPANI).toBe(3);
    const s = asker();
    ordu(s, 100);
    const baris = birlikHesapla(s, bg(s));
    s.ulke.savasta = true;
    const savas = birlikHesapla(s, bg(s));
    const e = bg(s).enflasyon;
    expect(baris.sold).toBeCloseTo(6 * e + 100 * 0.25 * e, 3);
    expect(savas.sold).toBeCloseTo(6 * e + 100 * 0.75 * e, 3);
  });

  it("4. yıl (sonuç yılı) kayıpları büyüdü ve beklenen toplam kullanıcı tavanının altında kalır", () => {
    expect(SAVAS_SONRA_KAYBI.zafer).toEqual({ olu: [0.6, 1.4], firar: [0.5, 1.2] });
    expect(SAVAS_SONRA_KAYBI.yenilgi).toEqual({ olu: [4, 6], firar: [2, 3.5] });
    const ort = (a: [number, number]) => (a[0] + a[1]) / 2;
    const toplam = (sonuc: "zafer" | "yenilgi") => {
      const on = SAVAS_ON_YIL_OLAYLARI.reduce((t, o) => t + o.ihtimal * ort(o.olu), 0) * 2;
      const onF = SAVAS_ON_YIL_OLAYLARI.reduce((t, o) => t + o.ihtimal * ort(o.firar), 0) * 2;
      return {
        olu: on + ort(SAVAS_KARAR_KAYBI[sonuc].olu) + ort(SAVAS_SONRA_KAYBI[sonuc].olu),
        firar: onF + ort(SAVAS_KARAR_KAYBI[sonuc].firar) + ort(SAVAS_SONRA_KAYBI[sonuc].firar),
      };
    };
    for (const sonuc of ["zafer", "yenilgi"] as const) {
      expect(toplam(sonuc).olu).toBeLessThanOrEqual(SAVAS_KAYIP_TAVANI[sonuc].olu);
      expect(toplam(sonuc).firar).toBeLessThanOrEqual(SAVAS_KAYIP_TAVANI[sonuc].firar);
    }
  });

  it("kale başı yıllık net gelir 12–14 (garnizon gideri yok) ve yıllık şöhret verir", () => {
    expect(KALE_GELIR).toEqual([12, 14]);
    const s = asker();
    ordu(s, 40);
    const b = birlikAl(s);
    b.kale = 2;
    b.kale_gelir = [12, 14];
    const h = birlikHesapla(s, bg(s));
    expect(h.kaleGeliri).toBeCloseTo(26 * bg(s).enflasyon, 3);
    s.un = 20;
    birlikYilIsle(s, bg(s));
    expect(s.un).toBeGreaterThan(20); // kale başı +0,5/yıl (2 kale → +1)
  });

  it("Eyalet Komutanlığı ve Saray Muhafızlığı açıkken yıllık şöhret artar; düşük görevlerde artmaz", () => {
    const s = asker();
    s.rutbe_seviye = 5;
    ordu(s, 300);
    const b = birlikAl(s);
    b.gorevler = ["devriye"];
    s.un = 30;
    birlikYilIsle(s, bg(s));
    const dusukSonrasi = s.un;
    expect(dusukSonrasi).toBeLessThanOrEqual(30.5);
    b.gorevler = ["komuta"];
    s.un = 30;
    birlikYilIsle(s, bg(s));
    expect(s.un).toBeGreaterThanOrEqual(30.9);
  });
});


describe("askeri güç belirleyici (v34)", () => {
  afterEach(() => vi.restoreAllMocks());

  it("görev eşikleri er değil askeri güçle ölçülür: aynı er sayısında orta teçhizat daha üst görev açar", () => {
    const s = asker();
    ordu(s, 60);
    const b = birlikAl(s);
    b.gorevler = ["tahsilat"]; // 70 askeri güç
    expect(gorevPaylari(s)[0].aktif).toBe(false); // 60 düşük er ≈ 63 güç
    b.kalite = { dusuk: 0, orta: 60, yuksek: 0 };
    expect(gorevPaylari(s)[0].aktif).toBe(true); // 60 orta er ≈ 88 güç
    expect(() => birlikKararUygula(s, { gorevler: ["tahsilat"] }, bg(s))).not.toThrow();
  });

  function zaferOrani(kur: (s: CharacterState) => void, deneme = 120): number {
    let zafer = 0;
    let n = 0;
    for (let i = 0; i < deneme * 3 && n < deneme; i++) {
      const s = asker();
      s.yas = 35;
      kur(s);
      const b = birlikAl(s);
      s.isletme!.baslangic_yili = s.yil - 10;
      b.baris_bekleme = 0;
      const u = birlikYilIsle(s, bg(s)).dokum.uyarilar.find((x) => x.kod === "baris_catisma");
      if (!u) continue;
      n++;
      if (u.savasSonucu === "zafer") zafer++;
    }
    expect(n).toBeGreaterThan(deneme / 2);
    return zafer / n;
  }

  it("haydut/sınır sonucu mutlak düşman gücüne karşı bizim gücümüzle belirlenir (zayıf ordu kaybeder, tam yatırımlı kazanır)", () => {
    const zayif = zaferOrani((s) => ordu(s, 20));
    const guclu = zaferOrani((s) => {
      ordu(s, 60);
      const b = birlikAl(s);
      b.kalite = { dusuk: 0, orta: 0, yuksek: 60 };
      b.birlik_turler = ["okcu", "suvari", "mizrakli"];
      b.birlik_seviye = 3;
    });
    expect(zayif).toBeLessThan(0.2);
    expect(guclu).toBeGreaterThan(0.9);
  });

  it("düşman gücü bizim gücümüzden bağımsızdır; yaşla büyür", () => {
    const k = asker();
    k.yas = 25;
    const g = asker();
    g.yas = 55;
    expect(dusmanReferansGucu(g)).toBeGreaterThan(dusmanReferansGucu(k));
    ordu(k, 20);
    const once = dusmanReferansGucu(k);
    ordu(k, 200);
    expect(dusmanReferansGucu(k)).toBe(once);
  });
});
