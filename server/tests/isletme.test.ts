import { pazarOlcekle } from "../src/game/piyasa";
import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  stateGetir,
  isletmeDurumGetir,
  isletmeKararVer,
  isletmeYatirimYap,
  isletmeCalisanAl,
  ekipCikar,
  ciftKazancKirp,
} from "../src/game/gameEngine";
import {
  isletmeYilIsle,
  hatSlotSayisi,
  calisanLimiti,
  calisanBonusu,
  ekipBonuslari,
  korumaHesapla,
  maasTabani,
  hirsizlikOlasiliklari,
  hirsizlikGirisimSansi,
  hirsizlikOrtalamaAralik,
  vergiOrani,
  depoKapasitesi,
  curumeOrani,
  STOK_HEDEFI_ORANLARI,
  FIYAT_POLITIKASI,
} from "../src/game/isletme";
import { isletmeBaglami, hesaplaMaasYillik, createCharacter, mesleğiSec } from "../src/game/stateManager";
import { pazarPayiHesapla, musteriSayisi } from "../src/data/pazar";
import type { EkipUyesi } from "../src/types";

async function tuccar(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ") {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Tüccar");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  return s;
}

function uye(rol: EkipUyesi["rol_turu"], y: number, sadakat = 60): EkipUyesi {
  return {
    id: `u-${Math.random()}`, isim: "Test", rol: "Test", gercekKalite: y, tahminiMin: y, tahminiMax: y, maas: 3, sadakat, kisilik: "Sadık",
    rol_turu: rol, y_giris: y, s_giris: sadakat, maas_taban: maasTabani(y, sadakat),
  };
}

describe("işletme (Tüccar dilimi)", () => {
  it("Tüccar seçilince işletme kurulur: 1 açık hat, veresiye borç, 6 aday (tam 3'ü ana rol)", async () => {
    const s = await tuccar();
    expect(s.isletme).toBeTruthy();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
    expect(s.isletme!.tedarikci_borcu).toBeGreaterThan(0);
    expect(s.isletme!.adaylar).toHaveLength(6);
    expect(s.isletme!.adaylar.filter((a) => a.rolTuru === "ana")).toHaveLength(3);
    for (const a of s.isletme!.adaylar) {
      expect(a.yetenek).toBeGreaterThanOrEqual(20);
      expect(a.yetenek).toBeLessThanOrEqual(90);
      expect(a.sadakat).toBeGreaterThanOrEqual(10);
      expect(a.sadakat).toBeLessThanOrEqual(80);
    }
  });

  it("pazar büyüklüğü 350–500, başlangıç payı ≈%8–16, ilk saldırı henüz planlanmamış", async () => {
    for (let i = 0; i < 20; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      mesleğiSec(s, "Tüccar");
      expect(s.pazar_musteri).toBeGreaterThanOrEqual(350);
      expect(s.pazar_musteri).toBeLessThanOrEqual(500);
      const pay = pazarPayiHesapla(s);
      expect(pay).toBeGreaterThan(0.045);
      expect(pay).toBeLessThan(0.17);
      expect(musteriSayisi(s)).toBeCloseTo(pay * s.pazar_musteri, 5);
      expect(s.rakip_sonraki_saldiri_yili).toBeNull();
      expect(s.yonetim_iliski).toBeGreaterThanOrEqual(30);
      expect(s.yonetim_iliski).toBeLessThanOrEqual(40);
    }
  });

  it("diğer mesleklerde işletme yok (eski maaş sistemi)", async () => {
    const st = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(st.id, "Asker");
    expect((await stateGetir(st.id)).isletme).toBeNull();
  });

  it("hiç dokunmayan oyuncu bir yılda makul kâr eder ve kâr maaş yerine geçer", async () => {
    const s = await tuccar();
    const b = isletmeBaglami(s);
    const { net, dokum } = isletmeYilIsle(s, b);
    expect(dokum.satis).toBeGreaterThan(0);
    expect(net).toBeGreaterThan(-8);
    expect(dokum.pazarPayi).toBeGreaterThan(0);
    expect(hesaplaMaasYillik(s)).toBeGreaterThanOrEqual(1);
  });

  it("talep = müşteri × %40 × ...: pazar büyüklüğü iki katına çıkınca talep de iki katına çıkar", async () => {
    const s = await tuccar();
    const once = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.acik)!.tahminiTalep;
    pazarOlcekle(s, 2);
    const sonra = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.acik)!.tahminiTalep;
    expect(sonra / once).toBeGreaterThan(1.9);
    expect(sonra / once).toBeLessThan(2.1);
  });

  it("stok hedefi çok düşükse mal biter ve müşteri kaybedilir", async () => {
    const s = await tuccar();
    const hat = s.isletme!.hatlar.find((h) => h.acik)!;
    hat.stok = 0;
    s.isletme!.stok_hedefi = "cokaz"; // talebin %75'i: karşılanamayan > %15
    s.pazar_musteri = 100000; // gürültü etkisini ezmek için büyük sabit pay
    const once = pazarPayiHesapla(s); // pay, pazar büyüklüğü ölçeklenmesinden etkilenmez
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "kitle_kaybi")).toBe(true);
    expect(pazarPayiHesapla(s)).toBeLessThan(once);
  });

  it("5 fiyat seçeneği: daha ucuz = daha çok talep; ve yıllık pay değişimi tabloya uyar", async () => {
    const s = await tuccar();
    const talepler: number[] = [];
    for (const f of ["eksi20", "eksi10", "normal", "arti10", "arti20"] as const) {
      const d = await isletmeKararVer(s.id, [{ id: "tahil", fiyat: f }]);
      talepler.push(d.durum.hatlar.find((h) => h.id === "tahil")!.tahminiTalep);
    }
    for (let i = 1; i < talepler.length; i++) expect(talepler[i - 1]).toBeGreaterThan(talepler[i]);
    expect(FIYAT_POLITIKASI.eksi20.pay).toBeCloseTo(0.03);
    expect(FIYAT_POLITIKASI.arti20.pay).toBeCloseTo(-0.03);
    expect(FIYAT_POLITIKASI.eksi20.talep).toBeCloseTo(1.45);
  });

  it("stok hedefi 5 seçenek ve oranlar (%75/%95/%115/%150/dolu)", async () => {
    expect(STOK_HEDEFI_ORANLARI).toEqual({ cokaz: 0.75, az: 0.95, normal: 1.15, fazla: 1.5, dolu: null });
    const s = await tuccar();
    for (const h of ["cokaz", "az", "normal", "fazla", "dolu"] as const) {
      const d = await isletmeKararVer(s.id, [], h);
      expect(d.durum.stokHedefi).toBe(h);
    }
    await expect(isletmeKararVer(s.id, [], "bos" as never)).rejects.toThrow();
  });

  it("hat kararı doğrulanır: slot sınırı, rütbe kilidi, geçersiz değerler; hiçbir şey yarım uygulanmaz", async () => {
    const s = await tuccar();
    await expect(isletmeKararVer(s.id, [{ id: "kumas", acik: true }])).rejects.toThrow(/rütben/);
    s.rutbe_seviye = 3;
    await expect(isletmeKararVer(s.id, [{ id: "kumas", acik: true }])).rejects.toThrow(/aynı anda/);
    await expect(isletmeKararVer(s.id, [{ id: "tahil", fiyat: "bedava" as never }])).rejects.toThrow();
    await expect(isletmeKararVer(s.id, [{ id: "yok", acik: true }])).rejects.toThrow();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
  });

  it("çalışan limiti rütbeye göre 2/4/6/8/10", async () => {
    const s = await tuccar();
    const beklenen = [2, 4, 6, 8, 10];
    beklenen.forEach((limit, i) => {
      s.rutbe_seviye = i + 1;
      expect(calisanLimiti(s)).toBe(limit);
    });
  });

  it("çalışan alımı: peşin ücret yok, aday havuzdan çıkar, rol etkisi var; limit aşılamaz; 3 çalışan 2. slotu açar", async () => {
    const s = await tuccar();
    s.rutbe_seviye = 2; // limit 4
    s.ekip = [];
    for (let i = 0; i < 3; i++) {
      const aday = s.isletme!.adaylar[0];
      const para = s.para;
      const sonuc = await isletmeCalisanAl(s.id, aday.id);
      expect(s.para).toBe(para);
      expect(s.isletme!.adaylar.find((a) => a.id === aday.id)).toBeUndefined();
      const c = sonuc.durum.calisanlar.find((x) => x.isim === aday.isim)!;
      expect(c.yetenek).toBe(aday.yetenek);
      expect(c.sadakat).toBe(aday.sadakat);
    }
    expect(s.ekip[0].rol_turu).toBeDefined();
    expect(s.ekip[0].y_giris).toBe(s.ekip[0].gercekKalite);
    expect(s.ekip[0].maas_taban).toBeGreaterThan(0);
    expect(hatSlotSayisi(s)).toBe(2);
    s.rutbe_seviye = 3;
    await isletmeKararVer(s.id, [{ id: "kumas", acik: true }]);
    expect(s.isletme!.hatlar.find((h) => h.id === "kumas")!.acik).toBe(true);
    s.rutbe_seviye = 1; // limit 2, zaten 3 çalışan var
    await expect(isletmeCalisanAl(s.id, s.isletme!.adaylar[0].id)).rejects.toThrow();
    await ekipCikar(s.id, s.ekip[0].id);
  });

  it("yetersiz parayla yatırım yapılamaz", async () => {
    const s = await tuccar();
    s.para = 0;
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/Yeterli paran yok/);
  });

  it("depo yatırımı kapasiteyi büyütür (100/220/420/750), çürümeyi azaltır; en üst kademeden sonra reddedilir", async () => {
    const s = await tuccar();
    s.para = 5000;
    expect(depoKapasitesi(s.isletme!)).toBe(100);
    expect(curumeOrani(s.isletme!)).toBeCloseTo(0.15);
    await isletmeYatirimYap(s.id, "depo");
    expect(depoKapasitesi(s.isletme!)).toBe(220);
    await isletmeYatirimYap(s.id, "depo");
    await isletmeYatirimYap(s.id, "depo");
    expect(depoKapasitesi(s.isletme!)).toBe(750);
    expect(curumeOrani(s.isletme!)).toBeCloseTo(0.08);
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/en üst kademe/);
  });

  it("dükkân talebi, tanıtım pay büyümesini artırır; güvenlik yatırımı Korumayı yükseltir", async () => {
    const s = await tuccar();
    s.para = 5000;
    const talepOnce = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.id === "tahil")!.tahminiTalep;
    await isletmeYatirimYap(s.id, "dukkan");
    expect((await isletmeDurumGetir(s.id)).hatlar.find((h) => h.id === "tahil")!.tahminiTalep).toBeGreaterThan(talepOnce);
    expect(korumaHesapla(s).yatirim).toBe(0);
    await isletmeYatirimYap(s.id, "guvenlik");
    expect(korumaHesapla(s).yatirim).toBeCloseTo(0.17);
    await isletmeYatirimYap(s.id, "guvenlik");
    await isletmeYatirimYap(s.id, "guvenlik");
    expect(korumaHesapla(s).yatirim).toBeCloseTo(0.5);
  });

  it("çalışan bonusları güncel Yeteneğe göre ve düz toplanır; sadık (≥75) ×1,05", () => {
    const ana = calisanBonusu(uye("ana", 50, 60))!;
    expect(ana.deger).toBeCloseTo(0.05 + 0.35 * 0.5);
    expect(calisanBonusu(uye("maliyet", 100, 60))!.deger).toBeCloseTo(0.23);
    expect(calisanBonusu(uye("musteri", 100, 60))!.deger).toBeCloseTo(0.06);
    expect(calisanBonusu(uye("guvenlik", 50, 60))!.deger).toBeCloseTo(0.36);
    const sadik = calisanBonusu(uye("ana", 50, 80))!;
    expect(sadik.deger).toBeCloseTo(ana.deger * 1.05);
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    s.ekip = [uye("ana", 50, 60), uye("ana", 50, 60), uye("guvenlik", 50, 60)];
    const b = ekipBonuslari(s);
    expect(b.ana).toBeCloseTo(ana.deger * 2);
    expect(b.koruma).toBeCloseTo(0.36);
  });

  it("maaş giriş seviyesine göre sabit, yalnız enflasyonla artar", () => {
    expect(maasTabani(20, 10)).toBeCloseTo(1.15 * (1.2 + 0.4 + 0.1 + 0.08), 2);
    expect(maasTabani(90, 80)).toBeCloseTo(1.15 * (1.2 + 1.8 + 0.8 + 2.88), 2);
    expect(maasTabani(90, 80)).toBeGreaterThan(maasTabani(20, 10));
  });

  it("çalışan çalıştıkça gelişir (Yetenek +0,4, Sadakat +0,7) ama giriş maaşı değişmez", async () => {
    const s = await tuccar();
    const u = uye("ana", 50, 50);
    s.ekip = [u];
    const taban = u.maas_taban;
    isletmeYilIsle(s, isletmeBaglami(s));
    expect(u.gercekKalite).toBeCloseTo(50.4);
    expect(u.sadakat).toBeCloseTo(50.7);
    expect(u.maas_taban).toBe(taban);
  });

  it("düşük sadakatli çalışan sızdırma/iç hırsızlık/ayrılma uyarısı üretebilir; yüksek sadakatli üretmez", async () => {
    let uyari = 0;
    for (let i = 0; i < 300; i++) {
      const s = await tuccar();
      s.ekip = [uye("ana", 60, 0)];
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      uyari += dokum.uyarilar.filter((u) => ["sizdirma", "ic_hirsizlik", "calisan_ayrildi"].includes(u.kod)).length;
    }
    expect(uyari).toBeGreaterThan(0);
    const guvenli = await tuccar();
    guvenli.ekip = [uye("ana", 60, 80)];
    const { dokum } = isletmeYilIsle(guvenli, isletmeBaglami(guvenli));
    expect(dokum.uyarilar.some((u) => ["sizdirma", "ic_hirsizlik", "calisan_ayrildi"].includes(u.kod))).toBe(false);
  });

  it("dış hırsızlık sonuç dağılımı Koruma ile parçalı doğrusal (0 / 0,5 / 0,6 / 0,9 / 1 çapaları)", () => {
    const yuz = (k: number) => Object.values(hirsizlikOlasiliklari(k)).map((x) => Math.round(x * 100));
    expect(yuz(0)).toEqual([30, 40, 5, 0, 25]);
    expect(yuz(0.5)).toEqual([18, 26, 36, 0, 20]);
    expect(yuz(0.6)).toEqual([14, 20, 32, 34, 0]);
    expect(yuz(0.9)).toEqual([4, 6, 12, 78, 0]);
    expect(yuz(1)).toEqual([1, 2, 6, 91, 0]);
    // 0,5'e kadar tam engel yok; 0,5'ten sonra şans eseri hızla sıfırlanır
    expect(hirsizlikOlasiliklari(0.45).engellendi).toBe(0);
    expect(hirsizlikOlasiliklari(0.55).sans).toBeLessThan(0.11);
  });

  it("hırsızlık girişim şansı güvenlikten bağımsız; ortalama aralık 8–12 yıl", async () => {
    const s = await tuccar();
    expect(hirsizlikGirisimSansi(s, 0)).toBeCloseTo(0.11);
    expect(hirsizlikGirisimSansi(s, 1)).toBeCloseTo(0.18);
    expect(hirsizlikOrtalamaAralik(0.11)).toBeGreaterThan(11.5);
    expect(hirsizlikOrtalamaAralik(0.18)).toBeLessThan(9);
    const a = hirsizlikGirisimSansi(s, 0.5);
    s.ekip = [uye("guvenlik", 80, 60)];
    expect(hirsizlikGirisimSansi(s, 0.5)).toBe(a);
  });

  it("Koruma: güvenlik çalışanı + yatırım + otorite (≥70 ilişki +0,10), tavan 1", async () => {
    const s = await tuccar();
    s.yonetim_iliski = 50;
    s.ekip = [uye("guvenlik", 100, 60), uye("guvenlik", 100, 60)];
    s.isletme!.yatirimlar.guvenlik = 3;
    expect(korumaHesapla(s).toplam).toBe(1);
    s.ekip = [uye("guvenlik", 50, 60)];
    s.isletme!.yatirimlar.guvenlik = 0;
    expect(korumaHesapla(s).toplam).toBeCloseTo(0.36);
    s.yonetim_iliski = 70;
    expect(korumaHesapla(s).toplam).toBeCloseTo(0.46);
    s.yonetim_iliski = 95;
    expect(korumaHesapla(s).otorite).toBeCloseTo(0.1);
  });

  it("vergi: kârın %25'i; savaşta +10 puan; otorite ilişkisi <25'te +3 puan; indirim yarıya indirir; zarar yılında vergi yok", async () => {
    const s = await tuccar();
    s.yonetim_iliski = 50;
    s.ulke.savasta = false;
    expect(vergiOrani(s)).toBeCloseTo(0.25);
    s.ulke.savasta = true;
    expect(vergiOrani(s)).toBeCloseTo(0.35);
    s.ulke.savasta = false;
    s.yonetim_iliski = 10;
    expect(vergiOrani(s)).toBeCloseTo(0.28);
    s.yonetim_iliski = 50;
    s.vergi_carpan = 0.5;
    s.vergi_carpan_bitis_yili = s.yil + 9;
    expect(vergiOrani(s)).toBeCloseTo(0.125);
    s.yil += 10;
    s.vergi_carpan_bitis_yili = s.yil - 1;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(s.vergi_carpan).toBe(1);
    expect(dokum.vergi).toBeGreaterThanOrEqual(0);
  });

  it("çifte kazanç önlemi: kendi kategorisindeki olay parası yarıya iner, kalanı kitleye gider", async () => {
    const s = await tuccar();
    const kitle = s.meslek_musteri;
    const etki = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, etki, "ticaret");
    expect(etki.para).toBe(10);
    expect(s.meslek_musteri).toBeGreaterThan(kitle);
    const baskaKategori = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, baskaKategori, "savas");
    expect(baskaKategori.para).toBe(20);
  });

  it("şehir yöneticisi unvanı ülke × çağa göre (tek otorite, TR)", async () => {
    const beklenen: [string, string, "Orta Çağ" | "Sanayi Devrimi"][] = [
      ["Fransa", "Prévôt", "Orta Çağ"],
      ["Kutsal Roma", "Burggraf", "Orta Çağ"],
      ["Bizans", "Eparkhos", "Orta Çağ"],
      ["Selçuklu", "Subaşı", "Orta Çağ"],
      ["İngiltere", "Belediye Başkanı", "Sanayi Devrimi"],
      ["Fransa", "Préfet", "Sanayi Devrimi"],
      ["Osmanlı", "Vali", "Sanayi Devrimi"],
      ["Rusya", "Gubernator", "Sanayi Devrimi"],
    ];
    for (const [bolge, unvan, cag] of beklenen) {
      const st = await yeniOyun(cag, bolge, "kasaba");
      await mesleğiAta(st.id, "Tüccar");
      expect((await isletmeDurumGetir(st.id)).otorite).toBe(unvan);
    }
  });

  it("createCharacter + mesleğiSec ile doğrudan da işletme kurulur", () => {
    const s = createCharacter("Sanayi Devrimi", "İngiltere", "kasaba");
    mesleğiSec(s, "Tüccar");
    expect(s.isletme?.hatlar.length).toBeGreaterThan(0);
  });
});

async function zanaatkar(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ") {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Zanaatkâr");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  return s;
}

describe("işletme (Zanaatkâr — üretim modu)", () => {
  it("Zanaatkâr seçilince işletme kurulur, görünümde üretim tavanı vardır (Tüccar'da yok)", async () => {
    const s = await zanaatkar();
    expect(s.isletme).toBeTruthy();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
    const d = await isletmeDurumGetir(s.id);
    expect(d.uretim?.tavan).toBeGreaterThan(0);
    const t = await tuccar();
    expect((await isletmeDurumGetir(t.id)).uretim).toBeNull();
  });

  it("üretim tavanı SATIŞI sınırlar (alım depoya sığdığı kadar); tavan aşılırsa uyarı ve dökümde üretim bilgisi çıkar", async () => {
    const s = await zanaatkar();
    s.rutbe_seviye = 3;
    s.ekip = [];
    s.pazar_musteri = 20000; // devasa talep: tavan kesin aşılır
    s.meslek_musteri = 4000;
    const hatlar = s.isletme!.hatlar;
    hatlar.forEach((h) => { h.acik = false; h.stok = 0; });
    hatlar.find((h) => h.id === "kap")!.acik = true;
    s.isletme!.yatirimlar.depo = 3;
    s.isletme!.stok_hedefi = "dolu";
    const tavan = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const satilan = dokum.hatlar.reduce((t, h) => t + h.satilan, 0);
    const alinan = dokum.hatlar.reduce((t, h) => t + h.alinan, 0);
    expect(satilan).toBeLessThanOrEqual(tavan);
    expect(alinan).toBeGreaterThan(tavan); // hammadde depoya sığdığı kadar alınır, satış tavana takılır
    expect(alinan).toBeLessThanOrEqual(750);
    expect(dokum.uretim?.tavan).toBe(tavan);
    expect(dokum.uyarilar.some((u) => u.kod === "uretim_tavani")).toBe(true);
  });

  it("Tüccar'da aynı talep tavana takılmaz (depo kapasitesi dışında sınır yok)", async () => {
    const s = await tuccar();
    s.pazar_musteri = 20000;
    s.isletme!.yatirimlar.depo = 3;
    s.isletme!.stok_hedefi = "dolu";
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uretim).toBeUndefined();
    expect(dokum.hatlar[0].alinan).toBeGreaterThan(60);
  });

  it("tezgâh yatırımı (+%60/kademe), üretim kapasitesi ve ana rol çalışanı tavanı büyütür", async () => {
    const s = await zanaatkar();
    s.para = 5000;
    const once = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    await isletmeYatirimYap(s.id, "tezgah");
    const tezgahSonra = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    expect(tezgahSonra / once).toBeGreaterThan(1.5);
    s.uretim_kapasitesi = 40;
    expect((await isletmeDurumGetir(s.id)).uretim!.tavan).toBeGreaterThan(tezgahSonra);
    const ayrintiOnce = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    s.ekip = [uye("ana", 70, 60)];
    expect((await isletmeDurumGetir(s.id)).uretim!.tavan).toBeGreaterThan(ayrintiOnce);
  });

  it("hiç dokunmayan Zanaatkâr bir yılda makul kâr eder", async () => {
    for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as const) {
      const s = await zanaatkar(cag);
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      expect(dokum.satis).toBeGreaterThan(0);
      expect(dokum.net).toBeGreaterThan(-8);
    }
  });

  it("rol adları ve şehir yöneticisi meslek × çağ × ülkeye göre gelir (tek otorite)", async () => {
    const s = await zanaatkar();
    const roller = new Set(["Üretici", "Hammaddeci", "Tanıtımcı", "Atölye bekçisi"]);
    expect(s.isletme!.adaylar.every((a) => roller.has(a.rol))).toBe(true);
    expect((await isletmeDurumGetir(s.id)).otorite).toBe("Prévôt");
    const st = await yeniOyun("Orta Çağ", "Selçuklu", "kasaba");
    await mesleğiAta(st.id, "Zanaatkâr");
    expect((await isletmeDurumGetir(st.id)).otorite).toBe("Subaşı");
    const s2 = await zanaatkar("Sanayi Devrimi");
    expect((await isletmeDurumGetir(s2.id)).otorite).toBe("Belediye Başkanı");
  });

  it("çifte kazanç önlemi Zanaatkâr'ın zanaat kategorisinde de işler", async () => {
    const s = await zanaatkar();
    const kitle = s.meslek_musteri;
    const etki = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, etki, "zanaat");
    expect(etki.para).toBe(10);
    expect(s.meslek_musteri).toBeGreaterThan(kitle);
  });

  it("hammadde biterse satış durur; artan hammadde depoda kalıp çürür (parası ödenip boşa giden üretim yok)", async () => {
    const s = await zanaatkar();
    s.ekip = [];
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    s.isletme!.stok_hedefi = "cokaz"; // talebin 0,75 katı: hammadde yetmez
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const satilan = dokum.hatlar.reduce((t, h) => t + h.satilan, 0);
    const talep = dokum.hatlar.reduce((t, h) => t + h.talep, 0);
    expect(satilan).toBeLessThan(talep);
  });
});

describe("v8.2: lonca aidatı, saldırı takvimi", () => {
  it("lonca aidatı satışın %3'üdür ve brüt kârdan düşer", async () => {
    const s = await tuccar();
    s.ekip = [];
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.loncaAidati).toBeCloseTo(dokum.satis * 0.03, 1);
    expect(dokum.brutKar).toBeCloseTo(dokum.satis - dokum.alim - dokum.depoMasrafi - dokum.loncaAidati, 1);
  });

  it("ilk işletme yılında saldırı yılı 4–9 yıl sonraya planlanır; vakti gelmeden saldırı olmaz", async () => {
    const s = await tuccar();
    s.ekip = [];
    s.yonetim_iliski = 10;
    const yil = s.yil;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(s.rakip_sonraki_saldiri_yili).toBeGreaterThanOrEqual(yil + 4);
    expect(s.rakip_sonraki_saldiri_yili).toBeLessThanOrEqual(yil + 9);
    expect(dokum.uyarilar.some((u) => u.kod === "rakip_saldiri")).toBe(false);
  });

  it("vakti gelen saldırı kesin gerçekleşir ve bir sonrakini 4–9 yıl sonraya koyar", async () => {
    for (let i = 0; i < 20; i++) {
      const s = await tuccar();
      s.ekip = [];
      s.yonetim_iliski = 10;
      s.rakip_sonraki_saldiri_yili = s.yil;
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      const u = dokum.uyarilar.find((x) => x.kod === "rakip_saldiri");
      expect(u).toBeTruthy();
      expect(u!.rakip).toBeTruthy();
      expect(s.rakip_saldiri_son_yil).toBe(s.yil);
      expect(s.rakip_sonraki_saldiri_yili).toBeGreaterThanOrEqual(s.yil + 4);
      expect(s.rakip_sonraki_saldiri_yili).toBeLessThanOrEqual(s.yil + 9);
    }
  });

  it("içerden sızma: sadakati <45 çalışan varsa güvenlik engelleyemez, sızma işaretlenir ve çalışanın sadakati düşer", async () => {
    let sizmaGordu = false;
    for (let i = 0; i < 30; i++) {
      const s = await tuccar();
      s.ekip = [uye("guvenlik", 80, 30)];
      s.isletme!.yatirimlar.guvenlik = 3; // Koruma yüksek
      s.yonetim_iliski = 10;
      s.rakip_sonraki_saldiri_yili = s.yil;
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      if (s.ekip.length === 0) continue; // düşük sadakatli çalışan o yıl işi bırakmış olabilir (adım 2)
      const u = dokum.uyarilar.find((x) => x.kod === "rakip_saldiri");
      expect(u).toBeTruthy();
      expect(u!.sizma).toBe(true);
      expect(u!.engellendi).toBeFalsy();
      expect(s.ekip[0].sadakat).toBeLessThan(30);
      sizmaGordu = true;
    }
    expect(sizmaGordu).toBe(true);
  });

  it("güvenlik yüksekken fiziksel saldırılar (baskın, sabotaj) çoğunlukla engellenir; söylenti saldırıları asla", async () => {
    let fizikselEngel = 0;
    let fiziksel = 0;
    for (let i = 0; i < 120; i++) {
      const s = await tuccar();
      s.ekip = [uye("guvenlik", 100, 90), uye("guvenlik", 100, 90)];
      s.isletme!.yatirimlar.guvenlik = 3; // Koruma ≥ 0,9
      s.yonetim_iliski = 10;
      s.rakip_sonraki_saldiri_yili = s.yil;
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      const u = dokum.uyarilar.find((x) => x.kod === "rakip_saldiri")!;
      if (u.sonuc === "baskin" || u.sonuc === "sabotaj") {
        fiziksel++;
        if (u.engellendi) fizikselEngel++;
      } else {
        expect(u.engellendi).toBeFalsy();
        expect(u.musteriKaybi ?? 0).toBeGreaterThanOrEqual(0);
      }
    }
    expect(fiziksel).toBeGreaterThan(0);
    expect(fizikselEngel / fiziksel).toBeGreaterThan(0.7);
  });
});
