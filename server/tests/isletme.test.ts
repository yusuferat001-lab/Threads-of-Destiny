import { pazarOlcekle } from "../src/game/piyasa";
import { describe, it, expect, vi } from "vitest";
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
  isletmeUrunSec,
  senaryoUret,
} from "../src/game/gameEngine";
import {
  isletmeYilIsle,
  hatSlotSayisi,
  calisanLimiti,
  calisanBonusu,
  tanitimBuyumesi,
  ekipBonuslari,
  korumaHesapla,
  maasTabani,
  hirsizlikOlasiliklari,
  hirsizlikSonrakiYil,
  loncaAidatiOrani,
  depoDoldurPlani,
  olasilikliYuvarla,
  HIRSIZLIK_KAYIPLARI,
  depoyuDoldur,
  otomatikDepoDoldur,
  piyasaSapmasiniYenile,
  hatHesapla,
  vergiOrani,
  depoKapasitesi,
  depoKapasiteTablosu,
  curumeOrani,
  FIYAT_POLITIKASI,
  fiyatTalepCarpani,
  ilkYillarGuvenli,
  isletmeHazirla,
  dukkanGideri,
  depoBakimMasrafi,
  toplamStok,
  BASLANGIC_DEPO_DOLULUK,
  BASLANGIC_VERESIYE_ORANI,
  baslangicDepoDoluluk,
  baslangicVeresiyeOrani,
} from "../src/game/isletme";
import { YATIRIM_MASRAF_ORANI } from "../src/game/yatirimMasrafi";
import { isletmeBaglami, hesaplaMaasYillik, createCharacter, mesleğiSec } from "../src/game/stateManager";
import { hatTanimiGetir, isletmeProfiliGetir } from "../src/data/meslekProfilleri";
import { pazarPayiHesapla, musteriSayisi } from "../src/data/pazar";
import type { EkipUyesi } from "../src/types";

async function tuccar(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ") {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Tüccar");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  if (s.isletme) s.isletme.baslangic_yili = s.yil - 10; // ilk 7 yıl güvenli dönemi dolmuş say
  return s;
}

/** Bir hattın bu yılki beklenen talebi (gürültüsüz). */
function talepOf(s: Awaited<ReturnType<typeof tuccar>>, hatId: string): number {
  const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
  const hat = s.isletme!.hatlar.find((h) => h.id === hatId)!;
  return hatHesapla(s, hat, hatTanimiGetir(profil, hatId)!, isletmeBaglami(s)).talep;
}

function uye(rol: EkipUyesi["rol_turu"], y: number, sadakat = 60): EkipUyesi {
  return {
    id: `u-${Math.random()}`, isim: "Test", rol: "Test", gercekKalite: y, tahminiMin: y, tahminiMax: y, maas: 3, sadakat, kisilik: "Sadık",
    rol_turu: rol, y_giris: y, s_giris: sadakat, maas_taban: maasTabani(y, sadakat),
  };
}

describe("işletme (Tüccar dilimi)", () => {
  it("Tüccar seçilince işletme kurulur: 1 açık hat, veresiye borç, 5 aday (ana rol yok, rol başına en çok 2)", async () => {
    const s = await tuccar();
    expect(s.isletme).toBeTruthy();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
    expect(s.isletme!.tedarikci_borcu).toBe(0);
    expect(s.isletme!.adaylar).toHaveLength(5);
    expect(s.isletme!.adaylar.filter((a) => a.rolTuru === "ana")).toHaveLength(0);
    for (const rol of ["maliyet", "musteri", "guvenlik"]) expect(s.isletme!.adaylar.filter((a) => a.rolTuru === rol).length).toBeLessThanOrEqual(2);
    for (const a of s.isletme!.adaylar) {
      expect(a.yetenek).toBeGreaterThanOrEqual(20);
      expect(a.yetenek).toBeLessThanOrEqual(90);
      expect(a.sadakat).toBeGreaterThanOrEqual(10);
      expect(a.sadakat).toBeLessThanOrEqual(80);
    }
  });

  it("pazar büyüklüğü 510–540, başlangıç payı ≈%8–16, ilk saldırı henüz planlanmamış", async () => {
    for (let i = 0; i < 20; i++) {
      const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
      mesleğiSec(s, "Tüccar");
      expect(s.pazar_musteri).toBeGreaterThanOrEqual(510);
      expect(s.pazar_musteri).toBeLessThanOrEqual(540);
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
    const once = talepOf(s, "tahil");
    pazarOlcekle(s, 2);
    const sonra = talepOf(s, "tahil");
    expect(sonra / once).toBeGreaterThan(1.9);
    expect(sonra / once).toBeLessThan(2.1);
  });

  it("mal ilk yıl yetmezse yalnız uyarı; üst üste ikinci yıl yetmezse iki yılın ortalamasının %30'u kadar müşteri gider", async () => {
    const s = await tuccar();
    const hat = s.isletme!.hatlar.find((h) => h.acik)!;
    s.pazar_musteri = 100000; // gürültü etkisini ezmek için büyük sabit pay
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5); // talep gürültüsü sıfır
    hat.stok = 0; // depo boş: karşılanamayan oran ≈ %100
    const musteri0 = s.meslek_musteri;
    const yil1 = isletmeYilIsle(s, isletmeBaglami(s));
    expect(yil1.dokum.uyarilar.some((u) => u.kod === "stok_bitti")).toBe(true);
    expect(yil1.dokum.uyarilar.some((u) => u.kod === "kitle_kaybi")).toBe(false);
    expect(s.meslek_musteri).toBeGreaterThanOrEqual(musteri0 * 0.95); // ilk yıl stok kaybı yok (yatkınlığa bağlı küçük oynama olabilir)
    expect(s.isletme!.onceki_karsilanamayan_orani).toBeGreaterThan(0.9);
    hat.stok = 0; // ikinci yıl da yetmedi
    const musteri1 = s.meslek_musteri;
    const yil2 = isletmeYilIsle(s, isletmeBaglami(s));
    rnd.mockRestore();
    expect(yil2.dokum.uyarilar.some((u) => u.kod === "kitle_kaybi")).toBe(true);
    const kayipOrani = (musteri1 - s.meslek_musteri) / musteri1;
    expect(kayipOrani).toBeGreaterThan(0.2); // ortalama oran ≈1 → ~%30; büyüme kaybın bir kısmını telafi eder
    expect(kayipOrani).toBeLessThanOrEqual(0.34);
  });

  it("kayıp sürdükçe her yıl son iki yılın ortalaması kullanılır (taban yok)", async () => {
    const s = await tuccar();
    s.pazar_musteri = 100000;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    s.isletme!.onceki_karsilanamayan_orani = 0.2; // geçen yıl talebin %20'si karşılanamadı
    s.isletme!.hatlar.find((h) => h.acik)!.stok = 0; // bu yıl ≈ %100 karşılanamıyor
    const musteri0 = s.meslek_musteri;
    isletmeYilIsle(s, isletmeBaglami(s));
    const p = s.isletme!.onceki_karsilanamayan_orani!;
    expect(p).toBeGreaterThan(0.9);
    const kayip = (musteri0 - s.meslek_musteri) / musteri0;
    const beklenen = ((p + 0.2) / 2) * 0.3; // ≈ %18
    expect(kayip).toBeGreaterThan(beklenen - 0.05);
    expect(kayip).toBeLessThanOrEqual(beklenen + 0.05); // v18b: rekabet aşınması (%2) eklenir
    // Üçüncü yıl da karşılanamazsa ortalama (bu yıl + geçen yıl) yine uygulanır.
    s.isletme!.hatlar.find((h) => h.acik)!.stok = 0;
    const musteri1 = s.meslek_musteri;
    isletmeYilIsle(s, isletmeBaglami(s));
    rnd.mockRestore();
    expect((musteri1 - s.meslek_musteri) / musteri1).toBeGreaterThan(0.2);
  });

  it("karşılanamayan talep hiç yoksa ya da önceki yıl yetmişse müşteri kaybı olmaz", async () => {
    const s = await tuccar();
    s.isletme!.onceki_karsilanamayan_orani = 0.5; // geçen yıl yetmedi
    s.pazar_musteri = 100000;
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    const hat = s.isletme!.hatlar.find((h) => h.acik)!;
    hat.stok = 100000; // bu yıl mal bol
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "kitle_kaybi")).toBe(false);
    expect(s.isletme!.onceki_karsilanamayan_orani).toBe(0);
    // Bir sonraki yıl yetmezse, geçen yıl yettiği için yalnız uyarı (kayıp yok).
    hat.stok = 0;
    const m = s.meslek_musteri;
    const sonuc = isletmeYilIsle(s, isletmeBaglami(s));
    rnd.mockRestore();
    expect(sonuc.dokum.uyarilar.some((u) => u.kod === "kitle_kaybi")).toBe(false);
    expect(s.meslek_musteri).toBeGreaterThanOrEqual(m * 0.95);
  });

  it("5 fiyat seçeneği: daha ucuz = daha çok talep; ve yıllık pay değişimi tabloya uyar", async () => {
    const s = await tuccar();
    const talepler: number[] = [];
    for (const f of ["eksi20", "eksi10", "normal", "arti10", "arti20"] as const) {
      await isletmeKararVer(s.id, [{ id: "tahil", fiyat: f }]);
      talepler.push(talepOf(s, "tahil"));
    }
    for (let i = 1; i < talepler.length; i++) expect(talepler[i - 1]).toBeGreaterThan(talepler[i]);
    // v27: müşteri etkisi yıllık TAM sayı (+3/+1/0/−1/−3); talep esnekliği 0,82 (kriz 1,0)
    expect(FIYAT_POLITIKASI.eksi20.pay).toBe(3);
    expect(FIYAT_POLITIKASI.eksi10.pay).toBe(1);
    expect(FIYAT_POLITIKASI.arti10.pay).toBe(-1);
    expect(FIYAT_POLITIKASI.arti20.pay).toBe(-3);
    expect(fiyatTalepCarpani(FIYAT_POLITIKASI.eksi20, false)).toBeCloseTo(1.2, 1);
    expect(fiyatTalepCarpani(FIYAT_POLITIKASI.arti20, true)).toBeCloseTo(0.83, 2);
  });

  it("depoyu doldur: seçenekler %25/50/75/100; plan adet × birim alış; para yetmezse yalnız parası kadar alınır, eksiye düşmez", async () => {
    const s = await tuccar();
    const b = isletmeBaglami(s);
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    expect(() => depoDoldurPlani(s, 0, b)).toThrow();
    const plan = depoDoldurPlani(s, 50, b);
    expect(plan.adet).toBe(Math.floor(depoKapasitesi(s.isletme!) * 0.5));
    expect(plan.maliyet).toBeCloseTo(plan.hatlar.reduce((t, h) => t + h.adet * h.birimMaliyet, 0), 0);
    expect(plan.yetersiz).toBe(false);
    // v27: nakit yetmeyince eksik kısım veresiye alınır (tedarikçi borcu); plan yetersiz sayılmaz.
    s.para = plan.maliyet / 2;
    const veresiyeli = depoDoldurPlani(s, 50, b);
    expect(veresiyeli.yetersiz).toBe(false);
    expect(veresiyeli.veresiye).toBeCloseTo(plan.maliyet / 2, 0);
    // Veresiye hakkı da tükenmişse yalnız nakit + kalan hak kadar alınır, para eksiye düşmez.
    s.isletme!.tedarikci_borcu = 1e9;
    const yetmeyen = depoDoldurPlani(s, 50, b);
    expect(yetmeyen.yetersiz).toBe(true);
    expect(yetmeyen.veresiye).toBe(0);
    expect(yetmeyen.maliyet).toBeLessThanOrEqual(s.para + 0.01);
    expect(yetmeyen.adet).toBeLessThan(plan.adet);
    expect(yetmeyen.tamAdet).toBe(plan.adet);
    depoyuDoldur(s, 50, b);
    expect(s.para).toBeGreaterThanOrEqual(0);
    s.para = 0;
    const sifir = depoyuDoldur(s, 100, b);
    expect(sifir.adet).toBe(0);
    expect(s.para).toBe(0);
  });

  it("v27: veresiye alım — para eksideyken bile mal alınır, borç yazılır, nakit eksiye düşmez; kârdan ödenir", async () => {
    const s = await tuccar();
    const b = isletmeBaglami(s);
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    s.isletme!.tedarikci_borcu = 0;
    s.para = -50;
    const plan = depoyuDoldur(s, 100, b);
    expect(plan.adet).toBeGreaterThan(0);
    expect(plan.veresiye).toBeCloseTo(plan.maliyet, 5);
    expect(s.para).toBe(0);
    expect(s.isletme!.tedarikci_borcu).toBeCloseTo(plan.maliyet, 1);
    expect(s.isletme!.tedarikci_borcu).toBeLessThanOrEqual(plan.tamMaliyet * 0.6 + 0.5);
  });

  it("otomatik depo: her yıl kapasiteye (%100) kadar kendiliğinden dolar; sapma alış ±%3 / satış ±%2 aralığında", async () => {
    const s = await tuccar();
    const b = isletmeBaglami(s);
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    otomatikDepoDoldur(s, b); // ayar yok: depo_oto kapalı olsa da dolar
    expect(s.isletme!.hatlar.reduce((t, h) => t + h.stok, 0)).toBe(depoKapasitesi(s.isletme!));
    for (let i = 0; i < 50; i++) {
      piyasaSapmasiniYenile(s);
      for (const v of Object.values(s.isletme!.piyasa_sapma!)) {
        expect(v.alis).toBeGreaterThanOrEqual(0.97);
        expect(v.alis).toBeLessThanOrEqual(1.03);
        expect(v.satis).toBeGreaterThanOrEqual(0.98);
        expect(v.satis).toBeLessThanOrEqual(1.02);
      }
    }
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

  it("çalışan limiti rütbeye göre 2/3/5/6/7", async () => {
    const s = await tuccar();
    const beklenen = [2, 3, 5, 6, 7];
    beklenen.forEach((limit, i) => {
      s.rutbe_seviye = i + 1;
      expect(calisanLimiti(s)).toBe(limit);
    });
  });

  it("çalışan alımı: peşin ücret yok, aday havuzdan çıkar, rol etkisi var; limit aşılamaz; 3 çalışan 2. slotu açar", async () => {
    const s = await tuccar();
    s.rutbe_seviye = 2; // limit 3
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

  it("yatırım fiyatları 20 / 55 / 135 / 325 merdiveniyle artar ve kartta şimdi/sonraki etki görünür", async () => {
    const s = await tuccar();
    s.para = 100000;
    const ilk = (await isletmeDurumGetir(s.id)).yatirimlar.find((y) => y.id === "tanitim")!;
    expect(ilk.maxKademe).toBe(4);
    expect(ilk.etkiSimdi.tr).toBe("Etki yok");
    expect(ilk.etkiSonraki!.tr).toBe("Müşteri artışı +1 müşteri/yıl");
    const fiyatlar: number[] = [ilk.sonrakiFiyat!];
    for (let i = 0; i < 3; i++) {
      await isletmeYatirimYap(s.id, "tanitim");
      fiyatlar.push((await isletmeDurumGetir(s.id)).yatirimlar.find((y) => y.id === "tanitim")!.sonrakiFiyat ?? 0);
    }
    expect(fiyatlar[1] / fiyatlar[0]).toBeCloseTo(55 / 20, 1);
    expect(fiyatlar[2] / fiyatlar[1]).toBeCloseTo(135 / 55, 1);
    expect(fiyatlar[3] / fiyatlar[2]).toBeCloseTo(325 / 135, 1);
    const k = (await isletmeDurumGetir(s.id)).yatirimlar.find((y) => y.id === "tanitim")!;
    expect(k.etkiSimdi.tr).toBe("Müşteri artışı +4 müşteri/yıl");
    expect(k.etkiSonraki!.tr).toBe("Müşteri artışı +5 müşteri/yıl");
  });

  it("dükkân yatırımı kalktı: müşteriyi etkileyen tek yatırım Tanıtım; eski kayıttaki dükkân kademesi Tanıtım'a taşınır", async () => {
    const s = await tuccar();
    const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
    expect(profil.yatirimlar.some((y) => y.id === "dukkan")).toBe(false);
    expect(profil.yatirimlar.filter((y) => y.etki === "pazar")).toHaveLength(1);
    s.isletme!.yatirimlar = { dukkan: 2, tanitim: 1 };
    isletmeHazirla(s, isletmeBaglami(s));
    expect(s.isletme!.yatirimlar.dukkan).toBeUndefined();
    expect(s.isletme!.yatirimlar.tanitim).toBe(2);
  });

  it("yetersiz parayla yatırım yapılamaz", async () => {
    const s = await tuccar();
    s.para = 0;
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/Yeterli paran yok/);
  });

  it("depo yatırımı kapasiteyi büyütür (Tüccar Orta Çağ tablosu), çürümeyi azaltır; en üst kademeden sonra reddedilir", async () => {
    const s = await tuccar();
    s.para = 100000;
    const kap = depoKapasiteTablosu("Orta Çağ", "Tüccar");
    expect(depoKapasitesi(s.isletme!)).toBe(kap[0]);
    expect(curumeOrani(s.isletme!)).toBeCloseTo(0.1);
    await isletmeYatirimYap(s.id, "depo");
    expect(depoKapasitesi(s.isletme!)).toBe(kap[1]);
    await isletmeYatirimYap(s.id, "depo");
    await isletmeYatirimYap(s.id, "depo");
    expect(depoKapasitesi(s.isletme!)).toBe(kap[3]);
    expect(curumeOrani(s.isletme!)).toBeCloseTo(0.045);
    await isletmeYatirimYap(s.id, "depo");
    expect(depoKapasitesi(s.isletme!)).toBe(kap[4]);
    expect(curumeOrani(s.isletme!)).toBeCloseTo(0.03);
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/en üst kademe/);
  });

  it("toplam talep müşteri sayısını (×1,0) aşamaz; talep oranı 0,60", async () => {
    const { ALIM_ORANI } = await import("../src/data/pazar");
    expect(ALIM_ORANI).toBe(0.6);
    const s = await tuccar();
    s.pazar_musteri = 2000;
    s.meslek_musteri = 100;
    s.rutbe_seviye = 5;
    s.isletme!.hatlar.forEach((h) => { h.acik = true; h.stok = 5000; });
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const toplam = dokum.hatlar.reduce((t, h) => t + h.talep, 0);
    expect(toplam).toBeLessThanOrEqual(100 + 1e-6);
  });

  it("güvenlik yatırımı Korumayı yükseltir (kademe başı +0,125, en çok 0,5)", async () => {
    const s = await tuccar();
    s.para = 100000;
    expect(korumaHesapla(s).yatirim).toBe(0);
    await isletmeYatirimYap(s.id, "guvenlik");
    expect(korumaHesapla(s).yatirim).toBeCloseTo(0.125);
    await isletmeYatirimYap(s.id, "guvenlik");
    await isletmeYatirimYap(s.id, "guvenlik");
    await isletmeYatirimYap(s.id, "guvenlik");
    expect(korumaHesapla(s).yatirim).toBeCloseTo(0.5);
  });

  it("çalışan bonusları güncel Yeteneğe göre ve düz toplanır; sadık (≥75) ×1,05", () => {
    const ana = calisanBonusu(uye("ana", 50, 60))!;
    expect(ana.deger).toBeCloseTo(0.075 + 0.525 * 0.5);
    expect(calisanBonusu(uye("maliyet", 100, 60))!.deger).toBeCloseTo(0.18);
    expect(calisanBonusu(uye("musteri", 100, 60))!.deger).toBe(5); // yıllık +5 müşteri (tam sayı)
    expect(calisanBonusu(uye("guvenlik", 50, 60))!.deger).toBeCloseTo(0.48);
    const sadik = calisanBonusu(uye("ana", 50, 80))!;
    expect(sadik.deger).toBeCloseTo(ana.deger * 1.05);
    const s = createCharacter("Orta Çağ", "Fransa", "kasaba");
    s.ekip = [uye("ana", 50, 60), uye("ana", 50, 60), uye("guvenlik", 50, 60)];
    const b = ekipBonuslari(s);
    expect(b.ana).toBeCloseTo(ana.deger * 2);
    expect(b.koruma).toBeCloseTo(0.48);
  });

  it("maaş giriş seviyesine göre sabit, yalnız enflasyonla artar", () => {
    expect(maasTabani(20, 10)).toBeCloseTo(0.95 * (1.2 + 0.4 + 0.1 + 0.08), 2);
    expect(maasTabani(90, 80)).toBeCloseTo(0.95 * (1.2 + 1.8 + 0.8 + 2.88), 2);
    expect(maasTabani(90, 80)).toBeGreaterThan(maasTabani(20, 10));
  });

  it("çalışan çalıştıkça gelişir (Yetenek +0,3, Sadakat +0,6) ve maaşı güncel Yetenek/Sadakat'e göre artar", async () => {
    const s = await tuccar();
    const u = uye("ana", 50, 50);
    s.ekip = [u];
    const taban = u.maas_taban;
    isletmeYilIsle(s, isletmeBaglami(s));
    expect(u.gercekKalite).toBeCloseTo(50.3);
    expect(u.sadakat).toBeCloseTo(50.6);
    expect(u.maas_taban).toBeCloseTo(maasTabani(50.3, 50.6), 2);
    expect(u.maas_taban).toBeGreaterThan(taban);
    // yıllar içinde artmaya devam eder
    for (let i = 0; i < 10; i++) isletmeYilIsle(s, isletmeBaglami(s));
    expect(u.maas_taban).toBeCloseTo(maasTabani(u.gercekKalite, u.sadakat), 2);
    expect(u.maas_taban).toBeGreaterThan(taban * 1.05);
  });

  it("dükkân gideri = depo bakımı + yatırım kademe fiyatlarının %2'si (depo/bina hariç)", async () => {
    const s = await tuccar();
    const b = isletmeBaglami(s);
    const bos = dukkanGideri(s, b.giderEnflasyon);
    expect(bos).toBeCloseTo(depoBakimMasrafi(s.isletme!, b.giderEnflasyon), 2);
    s.isletme!.yatirimlar.pazar = 2; // tanıtım: ilk iki kademe fiyatı
    const profil = isletmeProfiliGetir(s.meslek, s.cag)!;
    const y = profil.yatirimlar.find((x) => x.etki === "pazar")!;
    s.isletme!.yatirimlar = { ...s.isletme!.yatirimlar, [y.id]: 2 };
    const beklenen = (y.fiyatlar[0] + y.fiyatlar[1]) * YATIRIM_MASRAF_ORANI * b.giderEnflasyon;
    expect(dukkanGideri(s, b.giderEnflasyon) - bos).toBeCloseTo(beklenen, 1);
    const { dokum } = isletmeYilIsle(s, b);
    expect(dokum.yatirimMasrafi).toBeCloseTo(beklenen, 1);
    expect(dokum.depoMasrafi).toBeGreaterThanOrEqual(dokum.yatirimMasrafi!);
  });

  it("görünümde hat başına stok ve tahmini talep aralığı (adet) var", async () => {
    const s = await tuccar();
    const g = await isletmeDurumGetir(s.id);
    const hat = g.hatlar.find((h) => h.acik)!;
    expect(hat.stok).toBe(s.isletme!.hatlar.find((h) => h.id === hat.id)!.stok);
    expect(hat.talepMin).toBeGreaterThan(0);
    expect(hat.talepMax).toBeGreaterThanOrEqual(hat.talepMin);
    expect(hat.talepMax).toBeLessThanOrEqual(Math.round(hat.talepMin * 1.25) + 1); // ±%8 gürültü
  });

  it("depo kapasitesi çağa göre: Sanayi Devrimi'nde Orta Çağ'dan büyük; yıl işlerken depo kendiliğinden dolar", async () => {
    const oc = await tuccar("Orta Çağ");
    const sd = await tuccar("Sanayi Devrimi");
    expect(depoKapasitesi(sd.isletme!)).toBeGreaterThan(depoKapasitesi(oc.isletme!));
    // Tüccar başlangıçta tam dolu başlar; yıl sonunda stok erir, pasifEkonomi yıl başında yeniden doldurur (ayar gerekmez).
    oc.isletme!.depo_oto = { acik: false, yuzde: 50 };
    oc.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    oc.para = 500;
    otomatikDepoDoldur(oc, isletmeBaglami(oc));
    expect(toplamStok(oc.isletme!)).toBe(depoKapasitesi(oc.isletme!));
  });

  it("Tüccar başlangıçta depo tam dolu ve borçsuz başlar", async () => {
    const s = await tuccar();
    const is = s.isletme!;
    expect(toplamStok(is)).toBe(depoKapasitesi(is));
    expect(is.tedarikci_borcu).toBe(0);
  });

  it("Zanaatkâr da Tüccar gibi depo tam dolu ve borçsuz başlar; yedek sabitler %75/yarım veresiye", async () => {
    const s = await tuccar();
    s.meslek = "Zanaatkâr";
    const is = s.isletme!;
    expect(baslangicDepoDoluluk(s.meslek)).toBe(1);
    expect(baslangicVeresiyeOrani(s.meslek)).toBe(0);
    expect(BASLANGIC_DEPO_DOLULUK).toBe(0.75);
    expect(BASLANGIC_VERESIYE_ORANI).toBe(0.5);
    expect(is).toBeTruthy();
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

  it("dış hırsızlık kesin takvimle gelir: 9–11 yıl arayla; vakti gelince olur, sonrakini 9–11 yıl sonraya koyar", async () => {
    for (let i = 0; i < 40; i++) {
      const y = hirsizlikSonrakiYil(1000);
      expect(y).toBeGreaterThanOrEqual(1009);
      expect(y).toBeLessThanOrEqual(1011);
    }
    const s = await tuccar();
    s.ekip = [];
    s.isletme!.hatlar.forEach((h) => { h.stok = 30; });
    s.isletme!.hirsizlik_sonraki_yil = s.yil;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "hirsizlik")).toBe(true);
    expect(s.isletme!.hirsizlik_sonraki_yil).toBeGreaterThanOrEqual(s.yil + 9);
    expect(s.isletme!.hirsizlik_sonraki_yil).toBeLessThanOrEqual(s.yil + 11);
    // vakti gelmemişse hırsızlık olmaz
    const s2 = await tuccar();
    s2.ekip = [];
    s2.isletme!.hirsizlik_sonraki_yil = s2.yil + 5;
    const { dokum: d2 } = isletmeYilIsle(s2, isletmeBaglami(s2));
    expect(d2.uyarilar.some((u) => u.kod === "hirsizlik")).toBe(false);
  });

  it("lonca aidatı pay'a göre: %2; pay %15'i geçince %3, %20'yi geçince %4, %30'u geçince %5", () => {
    expect(loncaAidatiOrani(0.05)).toBeCloseTo(0.02);
    expect(loncaAidatiOrani(0.15)).toBeCloseTo(0.03);
    expect(loncaAidatiOrani(0.2)).toBeCloseTo(0.04);
    expect(loncaAidatiOrani(0.3)).toBeCloseTo(0.05);
    expect(loncaAidatiOrani(0.6)).toBeCloseTo(0.05);
  });

  it("Koruma: güvenlik çalışanı + yatırım + otorite (≥70 ilişki +0,10), tavan 1", async () => {
    const s = await tuccar();
    s.yonetim_iliski = 50;
    s.ekip = [uye("guvenlik", 100, 60), uye("guvenlik", 100, 60)];
    s.isletme!.yatirimlar.guvenlik = 3;
    expect(korumaHesapla(s).toplam).toBe(1);
    s.ekip = [uye("guvenlik", 50, 60)];
    s.isletme!.yatirimlar.guvenlik = 0;
    expect(korumaHesapla(s).toplam).toBeCloseTo(0.48);
    s.yonetim_iliski = 70;
    expect(korumaHesapla(s).toplam).toBeCloseTo(0.58);
    s.yonetim_iliski = 95;
    expect(korumaHesapla(s).otorite).toBeCloseTo(0.1);
  });

  it("vergi: kârın %20'si; savaşta +10 puan; otorite ilişkisi <25'te +3 puan; indirim yarıya indirir; zarar yılında vergi yok", async () => {
    const s = await tuccar();
    s.yonetim_iliski = 50;
    s.ulke.savasta = false;
    expect(vergiOrani(s)).toBeCloseTo(0.2);
    s.ulke.savasta = true;
    expect(vergiOrani(s)).toBeCloseTo(0.3);
    s.ulke.savasta = false;
    s.yonetim_iliski = 10;
    expect(vergiOrani(s)).toBeCloseTo(0.23);
    s.yonetim_iliski = 50;
    s.vergi_carpan = 0.5;
    s.vergi_carpan_bitis_yili = s.yil + 9;
    expect(vergiOrani(s)).toBeCloseTo(0.1);
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
  if (s.isletme) s.isletme.baslangic_yili = s.yil - 10; // ilk 7 yıl güvenli dönemi dolmuş say
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
    s.para = 100000;
    depoyuDoldur(s, 100, isletmeBaglami(s));
    const tavan = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const satilan = dokum.hatlar.reduce((t, h) => t + h.satilan, 0);
    const alinan = dokum.hatlar.reduce((t, h) => t + h.alinan, 0);
    expect(satilan).toBeLessThanOrEqual(tavan);
    expect(alinan).toBeGreaterThan(tavan); // hammadde depoya sığdığı kadar alınır, satış tavana takılır
    expect(alinan).toBeLessThanOrEqual(depoKapasitesi(s.isletme!));
    expect(dokum.uretim?.tavan).toBe(tavan);
    expect(dokum.uyarilar.some((u) => u.kod === "uretim_tavani")).toBe(true);
  });

  it("Tüccar'da aynı talep tavana takılmaz (depo kapasitesi dışında sınır yok)", async () => {
    const s = await tuccar();
    s.pazar_musteri = 20000;
    s.meslek_musteri = 4000;
    s.isletme!.yatirimlar.depo = 3;
    s.isletme!.hatlar.forEach((h) => { h.stok = 0; });
    s.para = 100000;
    depoyuDoldur(s, 100, isletmeBaglami(s));
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uretim).toBeUndefined();
    expect(dokum.hatlar[0].alinan).toBeGreaterThan(60);
    expect(dokum.hatlar[0].alinan).toBeLessThanOrEqual(depoKapasitesi(s.isletme!)); // depo kademe 3
  });

  it("tezgâh yatırımı (+%35/kademe), üretim kapasitesi ve ana rol çalışanı tavanı büyütür", async () => {
    const s = await zanaatkar();
    s.para = 5000;
    const once = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    await isletmeYatirimYap(s.id, "tezgah");
    const tezgahSonra = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    expect(tezgahSonra / once).toBeGreaterThanOrEqual(1.3);
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
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const satilan = dokum.hatlar.reduce((t, h) => t + h.satilan, 0);
    const talep = dokum.hatlar.reduce((t, h) => t + h.talep, 0);
    expect(satilan).toBeLessThan(talep);
  });
});

describe("v11: ilk 7 yıl güvenli dönem, dürüst bütçe, ürün bonusu", () => {
  it("işletmenin ilk 7 yılında rakip saldırısı ve dış hırsızlık olmaz; 7. yıldan sonra saldırı gelir", async () => {
    const s = await tuccar();
    s.ekip = [];
    s.isletme!.baslangic_yili = s.yil; // yeni kurulmuş
    expect(ilkYillarGuvenli(s)).toBe(true);
    s.rakip_sonraki_saldiri_yili = s.yil;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uyarilar.some((u) => u.kod === "rakip_saldiri" || u.kod === "hirsizlik")).toBe(false);
    s.yil += 8;
    expect(ilkYillarGuvenli(s)).toBe(false);
  });

  it("beklenen bütçe: satış − alım − depo − aidat; vergi ve cebine kalan hesaplanır, dökümde maaş ve çürüme kaybı alanları vardır", async () => {
    const s = await tuccar();
    s.ekip = [];
    const g = await isletmeDurumGetir(s.id);
    const b = g.butce;
    expect(b.brut).toBeCloseTo(b.satis - b.alim - b.depo - b.aidat, 1);
    expect(b.net).toBeCloseTo(b.brut - b.vergi - b.borcOdeme, 1);
    expect(b.cebineKalan).toBeCloseTo(b.net - b.maas - b.yasamKira - b.krediTaksit, 1);
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(typeof dokum.calisanMaasi).toBe("number");
    expect(typeof dokum.curumeKaybi).toBe("number");
    expect(dokum.hatlar[0].birimMaliyet).toBeGreaterThan(0);
  });

  it("dönem fiyat şoku alışa ve satışa aynı oranda yansır (marj oransal korunur)", async () => {
    const s = await tuccar();
    const hat = s.isletme!.hatlar.find((h) => h.id === "tahil")!;
    s.ulke.donem = { ...s.ulke.donem!, tur: "kitlik", etki: { ...s.ulke.donem!.etki, temelFiyat: 1.3 } };
    const kitlik = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.id === hat.id)!;
    s.ulke.donem = { ...s.ulke.donem!, tur: "durgunluk", etki: { ...s.ulke.donem!.etki, temelFiyat: 1 } };
    const normal = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.id === hat.id)!;
    expect(kitlik.birimMaliyet / normal.birimMaliyet).toBeCloseTo(1.3, 1);
    const sicakSiz = (h: { birimFiyat: number; sicak: boolean }) => h.birimFiyat / (h.sicak ? 1.08 : 1);
    expect(sicakSiz(kitlik) / sicakSiz(normal)).toBeCloseTo(1.3, 1);
  });
});

describe("v8.2: lonca aidatı, saldırı takvimi", () => {
  it("lonca aidatı başlangıçta satışın %2'sidir ve brüt kârdan düşer", async () => {
    const s = await tuccar();
    s.ekip = [];
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.loncaAidati).toBeCloseTo(dokum.satis * 0.02, 1);
    expect(dokum.brutKar).toBeCloseTo(dokum.satis - dokum.alim - dokum.depoMasrafi - dokum.loncaAidati, 1);
  });

  it("ilk işletme yılında saldırı yılı 5–8 yıl sonraya planlanır; vakti gelmeden saldırı olmaz", async () => {
    const s = await tuccar();
    s.ekip = [];
    s.yonetim_iliski = 10;
    const yil = s.yil;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(s.rakip_sonraki_saldiri_yili).toBeGreaterThanOrEqual(yil + 5);
    expect(s.rakip_sonraki_saldiri_yili).toBeLessThanOrEqual(yil + 8);
    expect(dokum.uyarilar.some((u) => u.kod === "rakip_saldiri")).toBe(false);
  });

  it("vakti gelen saldırı kesin gerçekleşir ve bir sonrakini 5–8 yıl sonraya koyar", async () => {
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
      expect(s.rakip_sonraki_saldiri_yili).toBeGreaterThanOrEqual(s.yil + 5);
      expect(s.rakip_sonraki_saldiri_yili).toBeLessThanOrEqual(s.yil + 8);
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

async function dinAdami(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ", bolge?: string) {
  const st = await yeniOyun(cag, bolge ?? (cag === "Orta Çağ" ? "Fransa" : "İngiltere"), "kasaba");
  await mesleğiAta(st.id, "Din Adamı");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  if (s.isletme) s.isletme.baslangic_yili = s.yil - 10; // ilk 7 yıl güvenli dönemi dolmuş say
  return s;
}

describe("işletme (Din Adamı — cemaat, ticaret modu)", () => {
  it("Din Adamı seçilince işletme kurulur; üretim tavanı yok; 5 aday (ana rol yok)", async () => {
    for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as const) {
      const s = await dinAdami(cag);
      expect(s.isletme).toBeTruthy();
      expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
      expect(s.isletme!.adaylar).toHaveLength(5);
      expect(s.isletme!.adaylar.filter((a) => a.rolTuru === "ana")).toHaveLength(0);
      expect((await isletmeDurumGetir(s.id)).uretim).toBeNull();
    }
  });

  it("rol adları ve şehir yöneticisi (tek otorite): Vaiz/Ekonom/Davetçi/Kilise bekçisi; Selçuklu'da Subaşı", async () => {
    const s = await dinAdami();
    const roller = new Set(["Ekonom", "Davetçi", "Kilise bekçisi"]);
    expect(s.isletme!.adaylar.every((a) => roller.has(a.rol))).toBe(true);
    expect((await isletmeDurumGetir(s.id)).otorite).toBe("Prévôt");
    const st = await dinAdami("Orta Çağ", "Selçuklu");
    expect((await isletmeDurumGetir(st.id)).otorite).toBe("Subaşı");
  });

  it("hiç dokunmayan Din Adamı bir yılda makul kâr eder; pazar adı Cemaat Payı", async () => {
    const s = await dinAdami();
    const { net, dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.satis).toBeGreaterThan(0);
    expect(net).toBeGreaterThan(-8);
    expect(hesaplaMaasYillik(s)).toBeGreaterThanOrEqual(1);
  });

  it("çifte kazanç önlemi din kategorisinde de işler", async () => {
    const s = await dinAdami();
    const once = s.meslek_musteri;
    const etki = { para: 20, mesaj: "x" } as never as { para: number; mesaj: string };
    ciftKazancKirp(s, etki, "din");
    expect(etki.para).toBeLessThan(20);
    expect(s.meslek_musteri).toBeGreaterThanOrEqual(once);
  });

  it("Tüccar/Zanaatkâr dışındaki imtiyazlar da işletmeye bağlanır (vakıf muafiyeti alışı, kutsal gün talebi artırır)", async () => {
    const s = await dinAdami();
    const b = isletmeBaglami(s);
    const rnd = vi.spyOn(Math, "random").mockReturnValue(0.5);
    const normal = isletmeYilIsle(structuredClone(s), b);
    const m = structuredClone(s);
    m.isletme!.imtiyazlar = { vakif_muafiyeti: m.yil + 4, kutsal_gun_imtiyazi: m.yil + 4 };
    const imtiyazli = isletmeYilIsle(m, isletmeBaglami(m));
    rnd.mockRestore();
    expect(imtiyazli.dokum.satis).toBeGreaterThan(normal.dokum.satis);
    expect(imtiyazli.net).toBeGreaterThan(normal.net);
  });
});

describe("v11: başlangıç ürünü seçimi", () => {
  async function ilerleOyunu(meslek: string, cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ") {
    const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba", undefined, "tr", undefined, "ilerle");
    await mesleğiAta(st.id, meslek);
    return st;
  }

  it("Tüccar/Zanaatkâr 'ilerle' oyununda 3 ürün (temel/savaş/lüks) seçmeden oyun devam etmez", async () => {
    for (const meslek of ["Tüccar", "Zanaatkâr"]) {
      for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as const) {
        const st = await ilerleOyunu(meslek, cag);
        expect(st.urun_secim_bekliyor).toBe(true);
        const g = await isletmeDurumGetir(st.id);
        expect(g.urunSecimi.bekliyor).toBe(true);
        expect(g.urunSecimi.secenekler.map((o) => o.kesim)).toEqual(["temel", "savas", "luks"]);
        await expect(senaryoUret(st.id)).rejects.toThrow(/başlangıç ürününü/);
      }
    }
  });

  it("ürün seçilince yalnız o hat açık kalır (rütbe kilidi aranmaz), ilk stok ve veresiye verilir, bonus uygulanır", async () => {
    const st = await ilerleOyunu("Tüccar");
    const g0 = await isletmeDurumGetir(st.id);
    const bahar = g0.urunSecimi.secenekler.find((o) => o.kesim === "luks")!;
    const fiyatOnce = g0.hatlar.find((h) => h.id === bahar.id)!.birimFiyat;
    const sonuc = await isletmeUrunSec(st.id, bahar.id);
    expect(sonuc.state.urun_secim_bekliyor).toBe(false);
    expect(sonuc.state.isletme!.ana_urun).toBe(bahar.id);
    const hatlar = sonuc.state.isletme!.hatlar;
    expect(hatlar.filter((h) => h.acik).map((h) => h.id)).toEqual([bahar.id]);
    expect(hatlar.find((h) => h.id === bahar.id)!.stok).toBeGreaterThan(0);
    expect(sonuc.durum.hatlar.find((h) => h.id === bahar.id)!.anaUrun).toBe(true);
    expect(sonuc.durum.hatlar.find((h) => h.id === bahar.id)!.kilitli).toBe(false);
    expect(sonuc.durum.hatlar.find((h) => h.id === bahar.id)!.birimFiyat).toBeGreaterThan(fiyatOnce * 1.05); // lüks ürün: satış +%8
    await expect(isletmeUrunSec(st.id, bahar.id)).rejects.toThrow(/zaten/);
  });

  it("geçersiz ürün reddedilir; Din Adamı'nda ürün seçimi yoktur; klasik (ilerle olmayan) oyunlarda beklenmez", async () => {
    const st = await ilerleOyunu("Tüccar");
    await expect(isletmeUrunSec(st.id, "yok")).rejects.toThrow();
    const din = await ilerleOyunu("Din Adamı");
    expect(din.urun_secim_bekliyor).toBeFalsy();
    const klasik = await tuccar();
    expect(klasik.urun_secim_bekliyor).toBeFalsy();
  });

  it("v26: tanıtım ve müşteri rolü yıllık SAYI olarak müşteri kazandırır; pasif erime yok", async () => {
    const s = await tuccar();
    s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 50, sonraki: "bolluk", etki: s.ulke.donem!.etki };
    s.un = 40;
    s.meslek_yatkinlik_seviyesi = 3; // yatkınlık yüzdesini nötrle (3 → 0)
    s.es_adi = null;
    s.isletme!.hatlar.forEach((h, i) => (h.acik = i === 0));
    expect(tanitimBuyumesi(s)).toBe(0);
    s.isletme!.yatirimlar.tanitim = 4;
    expect(tanitimBuyumesi(s)).toBe(5); // K4 = +5 müşteri/yıl
    for (const [k, beklenen] of [[1, 1], [2, 3], [3, 4]] as const) {
      s.isletme!.yatirimlar.tanitim = k;
      expect(tanitimBuyumesi(s)).toBe(beklenen); // +1/+3/+4/+5
    }
    const bn = calisanBonusu({ rol_turu: "musteri", gercekKalite: 100, sadakat: 50 } as never);
    expect(bn!.deger).toBe(5); // en iyi çalışan +5 müşteri/yıl (tam sayı)
    const dusuk = calisanBonusu({ rol_turu: "musteri", gercekKalite: 0, sadakat: 50 } as never);
    expect(dusuk!.deger).toBe(1);
  });

  it("v26: Zanaatkâr depo tam dolu ve borçsuz başlar", async () => {
    const z = await zanaatkar();
    expect(z.isletme!.tedarikci_borcu).toBe(0);
    const ilk = z.isletme!.hatlar.find((h) => h.acik)!;
    expect(ilk.stok).toBe(depoKapasiteTablosu(z.cag, z.meslek)[0]);
  });
  it("v27: olasılıklı yuvarlama beklenen değeri korur ve her zaman tam sayı verir", () => {
    expect(olasilikliYuvarla(3)).toBe(3);
    expect(olasilikliYuvarla(2.4, () => 0.39)).toBe(3);
    expect(olasilikliYuvarla(2.4, () => 0.41)).toBe(2);
    expect(olasilikliYuvarla(-0.4, () => 0.3)).toBe(0);
    expect(olasilikliYuvarla(-0.4, () => 0.7)).toBe(-1);
    let top = 0;
    for (let i = 0; i < 20000; i++) top += olasilikliYuvarla(1.3);
    expect(top / 20000).toBeCloseTo(1.3, 1);
  });

  it("v27: hırsızlıkta çalınan nakit yarıya indi (ağır 15–22, rahat 10–15, kısmi 0–4)", () => {
    expect(HIRSIZLIK_KAYIPLARI.agir.nakit).toEqual([15, 22]);
    expect(HIRSIZLIK_KAYIPLARI.rahat.nakit).toEqual([10, 15]);
    expect(HIRSIZLIK_KAYIPLARI.kismi.nakit).toEqual([0, 4]);
  });
});
