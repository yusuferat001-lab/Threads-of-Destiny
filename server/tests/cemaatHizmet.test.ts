import { describe, it, expect, vi, afterEach } from "vitest";
import { yeniOyun, mesleğiAta, stateGetir, isletmeKararVer, isletmeMunazaraVer, senaryoUret } from "../src/game/gameEngine";
import { isletmeBaglami } from "../src/game/stateManager";
import { adaylariYenile, ekipBonuslari } from "../src/game/isletme";
import { cemaatHesapla, cemaatEtkenleri, cemaatYilIsle, ayinKilitNedeni, hizmetKilitNedeni, hizmetBasariSansi, kadroEtkisi, munazaraBekliyorMu, munazaraDurumu, munazaraVer, ogretiBekleyenSeviye, ogretiSec } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import type { CharacterState } from "../src/types";

afterEach(() => vi.restoreAllMocks());

async function din(rutbe = 3): Promise<CharacterState> {
  const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
  await mesleğiAta(st.id, "Din Adamı");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.ulke.savasta = false;
  s.veba = undefined as never;
  s.rutbe_seviye = rutbe;
  s.para = 300;
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(s);
    if (sev === null) break;
    ogretiSec(s, ogretiSecenekleri(sev).find((o) => !o.fanatik)!.id);
  }
  return s;
}

describe("Büyük Ayin", () => {
  it("rütbe ve bekleme kilidi", async () => {
    const s = await din(1);
    expect(ayinKilitNedeni(s, "yok")).toBeNull();
    expect(ayinKilitNedeni(s, "olcul")).toBe("rutbe");
    s.rutbe_seviye = 3;
    expect(ayinKilitNedeni(s, "buyuk")).toBeNull();
    s.isletme!.cemaat!.ayin_son_yil = s.yil - 1;
    expect(ayinKilitNedeni(s, "buyuk")).toBe("bekleme");
    s.isletme!.cemaat!.ayin_son_yil = s.yil - 10;
    expect(ayinKilitNedeni(s, "buyuk")).toBeNull();
  });

  it("karar uç noktası doğrular, kilitliyse reddeder", async () => {
    const s = await din(1);
    await expect(isletmeKararVer(s.id, [], { ayin: "buyuk" })).rejects.toThrow("rütben");
    await expect(isletmeKararVer(s.id, [], { ayin: "xxx" })).rejects.toThrow("Geçersiz");
    const s2 = await stateGetir(s.id);
    s2.rutbe_seviye = 3;
    const r = await isletmeKararVer(s.id, [], { ayin: "buyuk" });
    expect(r.durum.cemaat!.politikalar.ayin.secili).toBe("buyuk");
  });

  it("büyük ayin bağış/gelen/masrafı artırır, inanan ve fanatikliği yükseltir (vebasız)", async () => {
    const s = await din();
    const b = isletmeBaglami(s);
    const cm = s.isletme!.cemaat!;
    const taban = cemaatHesapla(s, b, 0.8);
    const etkenTaban = cemaatEtkenleri(s);
    cm.ayin = "buyuk";
    const ayin = cemaatHesapla(s, b, 0.8);
    const etkenAyin = cemaatEtkenleri(s);
    expect(ayin.bagis).toBeGreaterThan(taban.bagis);
    expect(ayin.ayinMasrafi / ayin.bagis).toBeGreaterThan(taban.ayinMasrafi / taban.bagis);
    expect(etkenAyin.toplam).toBeGreaterThan(etkenTaban.toplam);
    expect(etkenAyin.fanatiklikDegisim).toBeGreaterThan(etkenTaban.fanatiklikDegisim);
  });

  it("vebada büyük ayin inanan kaybettirir", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    s.veba = { aktif: true } as never;
    const etkenTaban = cemaatEtkenleri(s);
    cm.ayin = "buyuk";
    expect(cemaatEtkenleri(s).toplam).toBeLessThan(etkenTaban.toplam);
  });

  it("yıl işlenince ayin 'yok'a döner ve bekleme başlar", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    cm.ayin = "olcul";
    cemaatYilIsle(s, isletmeBaglami(s));
    expect(cm.ayin).toBe("yok");
    expect(cm.ayin_son_yil).toBe(s.yil);
    expect(ayinKilitNedeni(s, "olcul")).toBe("bekleme");
  });
});

describe("Hizmet Görevi (Ordu Papazı ve Salgın Bakımı dahil)", () => {
  it("kilit nedenleri: rütbe, savaş, salgın, hapis", async () => {
    const s = await din(1);
    expect(hizmetKilitNedeni(s, "hayir")).toBeNull();
    expect(hizmetKilitNedeni(s, "hac")).toBe("rutbe");
    s.rutbe_seviye = 3;
    expect(hizmetKilitNedeni(s, "ordu_papazi")).toBe("savas");
    expect(hizmetKilitNedeni(s, "veba_bakimi")).toBe("veba");
    s.ulke.savasta = true;
    s.veba = { aktif: true } as never;
    expect(hizmetKilitNedeni(s, "ordu_papazi")).toBeNull();
    expect(hizmetKilitNedeni(s, "veba_bakimi")).toBeNull();
    s.etiketler.push("hapiste");
    expect(hizmetKilitNedeni(s, "hayir")).toBe("hapis");
  });

  it("karar: görev seçilir, ikincisi reddedilir, 'yok' yarıda bırakır", async () => {
    const s = await din(3);
    await expect(isletmeKararVer(s.id, [], { hizmet: "yok_boyle_gorev" })).rejects.toThrow("Geçersiz");
    await expect(isletmeKararVer(s.id, [], { hizmet: "ordu_papazi" })).rejects.toThrow("savaş");
    const r = await isletmeKararVer(s.id, [], { hizmet: "hac" });
    expect(r.durum.cemaat!.hizmet.aktif).toEqual({ id: "hac", kalan: 3, gecen: 0 });
    await expect(isletmeKararVer(s.id, [], { hizmet: "misyon" })).rejects.toThrow("yürüyen görevini");
    const un = s.un;
    const r2 = await isletmeKararVer(s.id, [], { hizmet: "yok" });
    expect(r2.durum.cemaat!.hizmet.aktif).toBeNull();
    expect(s.un).toBe(un); // hiç yıl geçmediyse ceza yok
  });

  it("masraf brüt kârdan düşer; gelirli görev toplam geliri artırır; inanan kalemi eklenir", async () => {
    const s = await din(3);
    const b = isletmeBaglami(s);
    const cm = s.isletme!.cemaat!;
    const taban = cemaatHesapla(s, b, 0.8);
    cm.hizmet = { id: "hac", kalan: 3, gecen: 0 };
    const hac = cemaatHesapla(s, b, 0.8);
    expect(hac.hizmetMasraf).toBeGreaterThan(0);
    expect(hac.brutKar).toBeLessThan(taban.brutKar);
    cm.hizmet = { id: "emanet", kalan: 3, gecen: 0 };
    expect(cemaatHesapla(s, b, 0.8).hizmetGelir).toBeGreaterThan(0);
    const k = cemaatEtkenleri(s).kalemler.find((x) => x.kod === "hizmet")!;
    expect(k.deger).toBeGreaterThan(0);
  });

  it("yıl sonu: süre azalır; bitişte başarı ödül, başarısızlık ceza verir", async () => {
    const s = await din(3);
    const cm = s.isletme!.cemaat!;
    cm.hizmet = { id: "hayir", kalan: 2, gecen: 0 };
    cemaatYilIsle(s, isletmeBaglami(s));
    expect(cm.hizmet).toEqual({ id: "hayir", kalan: 1, gecen: 1 });
    vi.spyOn(Math, "random").mockReturnValue(0); // zar: başarı
    const ahlak = s.ahlak;
    const sonuc = cemaatYilIsle(s, isletmeBaglami(s));
    expect(cm.hizmet).toBeNull();
    expect(sonuc.dokum.uyarilar!.find((u) => u.kod === "hizmet_sonuc")).toMatchObject({ hat: "hayir", basari: true });
    expect(s.ahlak).toBeGreaterThan(ahlak);
  });

  it("başarısız bitiş", async () => {
    const s = await din(3);
    const cm = s.isletme!.cemaat!;
    cm.hizmet = { id: "hac", kalan: 1, gecen: 2 };
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const sonuc = cemaatYilIsle(s, isletmeBaglami(s));
    expect(sonuc.dokum.uyarilar!.find((u) => u.kod === "hizmet_sonuc")).toMatchObject({ hat: "hac", basari: false });
  });

  it("ordu papazlığı: savaş bitince erken kapanır, yarım ödül; sağlık en az 1 kalır", async () => {
    const s = await din(3);
    const cm = s.isletme!.cemaat!;
    s.ulke.savasta = true;
    cm.hizmet = { id: "ordu_papazi", kalan: 2, gecen: 0 };
    s.saglik = 1;
    cemaatYilIsle(s, isletmeBaglami(s));
    expect(s.saglik).toBe(1);
    expect(cm.hizmet!.gecen).toBe(1);
    s.ulke.savasta = false;
    const sonuc = cemaatYilIsle(s, isletmeBaglami(s));
    expect(cm.hizmet).toBeNull();
    expect(sonuc.dokum.uyarilar!.find((u) => u.kod === "hizmet_sonuc")).toMatchObject({ hat: "ordu_papazi", basari: true, yariyolda: true });
  });
});

describe("Kadro (Âlim ve Haberci)", () => {
  const uye = (rol: "savunma" | "kesif" | "guvenlik", kalite: number) =>
    ({ id: rol + kalite, isim: "x", rol_turu: rol, gercekKalite: kalite, sadakat: 50, maas: 1, maas_taban: 1 }) as never;

  it("kadro etkisi yeteneğe bağlı, tavanlı; koruma ve diğer bonuslara karışmaz", async () => {
    const s = await din();
    expect(kadroEtkisi(s)).toEqual({ alim: 0, okuma: 0 });
    s.ekip = [uye("savunma", 80), uye("kesif", 20)];
    const k = kadroEtkisi(s);
    expect(k.alim).toBeGreaterThan(0.15);
    expect(k.okuma).toBeGreaterThan(0);
    expect(k.okuma).toBeLessThan(k.alim);
    expect(ekipBonuslari(s).koruma).toBe(0);
    s.ekip = Array.from({ length: 6 }, () => uye("savunma", 100));
    expect(kadroEtkisi(s).alim).toBeLessThanOrEqual(0.3);
  });

  it("Âlim görev başarı şansını artırır", async () => {
    const s = await din();
    const tabanSans = hizmetBasariSansi(s, 0.25);
    s.ekip = [uye("savunma", 90)];
    expect(hizmetBasariSansi(s, 0.25)).toBeGreaterThan(tabanSans);
  });

  it("aday havuzu Âlim ve Haberci adayı da sunar", async () => {
    const s = await din();
    const roller = new Set<string>();
    for (let i = 0; i < 30; i++) {
      adaylariYenile(s);
      s.isletme!.adaylar.forEach((a) => roller.add(a.rolTuru));
    }
    expect(roller.has("savunma")).toBe(true);
    expect(roller.has("kesif")).toBe(true);
  });
});

describe("Münazara", () => {
  const kur = (s: CharacterState, ek: Partial<NonNullable<CharacterState["isletme"]>["cemaat"] extends infer C ? (C extends { munazara_bekleyen: infer M } ? NonNullable<M> : never) : never> = {}) => {
    const rakip = s.rakipler?.[0]?.ad ?? s.rakip_adi ?? "Rakip";
    s.isletme!.cemaat!.munazara_bekleyen = { yil: s.yil, saldiri: "bidat", rakip, kademe: 2, carpan: 1, rakipGuc: 60, rakipTaban: 60, hazirlik: 1, ...ek } as never;
  };

  it("rakip saldırısı bid'at/mürit çalma/aforoz ise münazara kurulur ve hasar uygulanmaz", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    let kuruldu = 0;
    for (let i = 0; i < 300 && kuruldu < 3; i++) {
      cm.munazara_bekleyen = null;
      s.isletme!.baslangic_yili = s.yil - 30;
      s.rakip_sonraki_saldiri_yili = s.yil;
      const sonuc = cemaatYilIsle(s, isletmeBaglami(s));
      if (cm.munazara_bekleyen) {
        kuruldu++;
        expect(["bidat", "muridcalma", "aforoz"]).toContain(cm.munazara_bekleyen.saldiri);
        expect(sonuc.dokum.uyarilar!.some((u) => u.kod === "rakip_saldiri" && u.sonuc === cm.munazara_bekleyen!.saldiri)).toBe(false);
      }
    }
    expect(kuruldu).toBeGreaterThan(0);
  });

  it("zafer serisi ≥ eşik: rakip hazırlıklı gelir", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    cm.munazara_seri = 4;
    let hazir = 0;
    for (let i = 0; i < 300 && !hazir; i++) {
      cm.munazara_bekleyen = null;
      s.isletme!.baslangic_yili = s.yil - 30;
      s.rakip_sonraki_saldiri_yili = s.yil;
      cemaatYilIsle(s, isletmeBaglami(s));
      if (cm.munazara_bekleyen) {
        expect(cm.munazara_bekleyen.hazirlik).toBeGreaterThan(1);
        hazir = 1;
      }
    }
    expect(hazir).toBe(1);
  });

  it("bekleyen münazara varken senaryo üretilemez; cevap verilince devam eder", async () => {
    const s = await din();
    kur(s);
    expect(munazaraBekliyorMu(s)).toBe(true);
    await expect(senaryoUret(s.id)).rejects.toThrow("münazara");
    await isletmeMunazaraVer(s.id, "cekil");
    expect(munazaraBekliyorMu(s)).toBe(false);
    await expect(isletmeMunazaraVer(s.id, "cekil")).rejects.toThrow("bekleyen");
  });

  it("zafer: rakipten inanan geçer, şöhret artar, seri artar, hasar yok", async () => {
    const s = await din();
    kur(s, { rakipGuc: 1 });
    const cm = s.isletme!.cemaat!;
    const sonuc = munazaraVer(s, "halk");
    expect(sonuc.zafer).toBe(true);
    expect(sonuc.musteriDegisim).toBeGreaterThanOrEqual(0);
    expect(sonuc.sohretDegisim).toBeGreaterThan(0);
    expect(cm.munazara_seri).toBe(1);
    expect(cm.munazara_bekleyen).toBeNull();
  });

  it("yenilgi: hasar uygulanır, seri sıfırlanır; çekilmek hasarın yarısı", async () => {
    const s = await din();
    const cm = s.isletme!.cemaat!;
    cm.munazara_seri = 3;
    kur(s, { rakipGuc: 9999, saldiri: "muridcalma", kademe: 3 });
    const kayip = munazaraVer(s, "ilim");
    expect(kayip.zafer).toBe(false);
    expect(kayip.musteriDegisim).toBeLessThan(0);
    expect(cm.munazara_seri).toBe(0);
    kur(s, { rakipGuc: 9999, saldiri: "muridcalma", kademe: 3 });
    const cekil = munazaraVer(s, "cekil");
    expect(cekil.zafer).toBeNull();
    expect(cekil.musteriDegisim).toBeLessThan(0);
    expect(Math.abs(cekil.musteriDegisim)).toBeLessThan(Math.abs(kayip.musteriDegisim) * 1.01 + 1);
  });

  it("geçersiz seçim reddedilir; yaklaşım fanatikliği etkiler", async () => {
    const s = await din();
    kur(s, { rakipGuc: 1 });
    expect(() => munazaraVer(s, "xxx")).toThrow("Geçersiz");
    const f = s.isletme!.cemaat!.fanatiklik;
    munazaraVer(s, "halk");
    expect(s.isletme!.cemaat!.fanatiklik).toBeGreaterThan(f);
  });

  it("Haberci tahmin aralığını daraltır", async () => {
    const s = await din();
    kur(s, { rakipGuc: 66, rakipTaban: 60 });
    const a = munazaraDurumu(s)!.rakipAralik;
    s.ekip = [{ id: "h", isim: "x", rol_turu: "kesif", gercekKalite: 100, sadakat: 50, maas: 1, maas_taban: 1 }] as never;
    const b = munazaraDurumu(s)!.rakipAralik;
    expect(b[1] - b[0]).toBeLessThan(a[1] - a[0]);
  });
});
