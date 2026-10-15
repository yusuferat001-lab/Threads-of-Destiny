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
import { isletmeYilIsle, hatSlotSayisi } from "../src/game/isletme";
import { isletmeBaglami, hesaplaMaasYillik, createCharacter, mesleğiSec } from "../src/game/stateManager";

async function tuccar(cag: "Orta Çağ" | "Sanayi Devrimi" = "Orta Çağ") {
  const st = await yeniOyun(cag, cag === "Orta Çağ" ? "Fransa" : "İngiltere", "kasaba");
  await mesleğiAta(st.id, "Tüccar");
  const s = await stateGetir(st.id);
  s.ulke.donem = { tur: "durgunluk", baslangicYili: s.yil, bitisYili: s.yil + 5, sonraki: "bolluk", etki: s.ulke.donem!.etki };
  s.para = 300;
  return s;
}

describe("işletme (Tüccar dilimi)", () => {
  it("Tüccar seçilince işletme kurulur: 1 açık hat, veresiye borç, 3-4 aday", async () => {
    const s = await tuccar();
    expect(s.isletme).toBeTruthy();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
    expect(s.isletme!.tedarikci_borcu).toBeGreaterThan(0);
    expect(s.isletme!.adaylar.length).toBeGreaterThanOrEqual(3);
    expect(s.isletme!.adaylar.length).toBeLessThanOrEqual(4);
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
    expect(net).toBeGreaterThan(-5);
    expect(hesaplaMaasYillik(s)).toBeGreaterThanOrEqual(1);
  });

  it("stok biterse müşteri kitlesi erir", async () => {
    const s = await tuccar();
    const hat = s.isletme!.hatlar.find((h) => h.acik)!;
    hat.otomatik = false;
    hat.siparis = 0;
    hat.stok = 0;
    const once = s.meslek_gucu;
    isletmeYilIsle(s, isletmeBaglami(s));
    expect(s.meslek_gucu).toBeLessThan(once);
  });

  it("ucuz fiyat daha çok, pahalı fiyat daha az talep çeker", async () => {
    const s = await tuccar();
    const d1 = await isletmeKararVer(s.id, [{ id: "tahil", fiyat: "ucuz" }]);
    const ucuz = d1.durum.hatlar.find((h) => h.id === "tahil")!.tahminiTalep;
    const d2 = await isletmeKararVer(s.id, [{ id: "tahil", fiyat: "pahali" }]);
    const pahali = d2.durum.hatlar.find((h) => h.id === "tahil")!.tahminiTalep;
    expect(ucuz).toBeGreaterThan(pahali);
  });

  it("hat kararı doğrulanır: slot sınırı, rütbe kilidi, geçersiz değerler; hiçbir şey yarım uygulanmaz", async () => {
    const s = await tuccar();
    await expect(isletmeKararVer(s.id, [{ id: "kumas", acik: true }])).rejects.toThrow(/rütben/);
    s.rutbe_seviye = 3;
    await expect(isletmeKararVer(s.id, [{ id: "kumas", acik: true }])).rejects.toThrow(/aynı anda/);
    await expect(isletmeKararVer(s.id, [{ id: "tahil", fiyat: "bedava" as never }])).rejects.toThrow();
    await expect(isletmeKararVer(s.id, [{ id: "tahil", siparis: 9999 }])).rejects.toThrow();
    await expect(isletmeKararVer(s.id, [{ id: "yok", acik: true }])).rejects.toThrow();
    expect(s.isletme!.hatlar.filter((h) => h.acik)).toHaveLength(1);
  });

  it("çalışan alımı: ücret düşer, aday havuzdan çıkar, rol etkisi var; 3 çalışan 2. slotu açar", async () => {
    const s = await tuccar();
    s.rutbe_seviye = 2;
    for (let i = 0; i < 3; i++) {
      if (s.isletme!.adaylar.length === 0) break;
      const aday = s.isletme!.adaylar[0];
      const para = s.para;
      const sonuc = await isletmeCalisanAl(s.id, aday.id);
      expect(s.para).toBeCloseTo(para - aday.ucret, 1);
      expect(s.isletme!.adaylar.find((a) => a.id === aday.id)).toBeUndefined();
      expect(sonuc.durum.calisanlar.some((c) => c.isim === aday.isim)).toBe(true);
    }
    expect(s.ekip.length).toBeGreaterThan(0);
    expect(s.ekip[0].rol_turu).toBeDefined();
    if (s.ekip.length >= 3) {
      expect(hatSlotSayisi(s)).toBe(2);
      await isletmeKararVer(s.id, [{ id: "kumas", acik: true }]);
      expect(s.isletme!.hatlar.find((h) => h.id === "kumas")!.acik).toBe(true);
    }
    await ekipCikar(s.id, s.ekip[0].id);
  });

  it("yetersiz parayla aday alınamaz / yatırım yapılamaz", async () => {
    const s = await tuccar();
    s.para = 0;
    await expect(isletmeCalisanAl(s.id, s.isletme!.adaylar[0].id)).rejects.toThrow(/Yeterli paran yok/);
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/Yeterli paran yok/);
  });

  it("depo yatırımı kapasiteyi büyütür, dükkân talebi artırır; en üst kademeden sonra reddedilir", async () => {
    const s = await tuccar();
    s.para = 5000;
    const once = (await isletmeDurumGetir(s.id)).depo.kapasite;
    const talepOnce = (await isletmeDurumGetir(s.id)).hatlar.find((h) => h.id === "tahil")!.tahminiTalep;
    await isletmeYatirimYap(s.id, "depo");
    await isletmeYatirimYap(s.id, "dukkan");
    const d = await isletmeDurumGetir(s.id);
    expect(d.depo.kapasite).toBeGreaterThan(once);
    expect(d.hatlar.find((h) => h.id === "tahil")!.tahminiTalep).toBeGreaterThanOrEqual(talepOnce);
    await isletmeYatirimYap(s.id, "depo");
    await isletmeYatirimYap(s.id, "depo");
    await expect(isletmeYatirimYap(s.id, "depo")).rejects.toThrow(/en üst kademe/);
  });

  it("çifte kazanç önlemi: kendi kategorisindeki olay parası yarıya iner, kalanı kitleye gider", async () => {
    const s = await tuccar();
    const kitle = s.meslek_gucu;
    const etki = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, etki, "ticaret");
    expect(etki.para).toBe(10);
    expect(s.meslek_gucu).toBeGreaterThan(kitle);
    const baskaKategori = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, baskaKategori, "savas");
    expect(baskaKategori.para).toBe(20);
  });

  it("Selçuklu'da otorite özel adla gelir; Sanayi Devrimi'nde Ticaret Odası Başkanı", async () => {
    const st = await yeniOyun("Orta Çağ", "Selçuklu", "kasaba");
    await mesleğiAta(st.id, "Tüccar");
    expect((await isletmeDurumGetir(st.id)).otorite).toBe("Muhtesip");
    const s2 = await tuccar("Sanayi Devrimi");
    expect((await isletmeDurumGetir(s2.id)).otorite).toBe("Ticaret Odası Başkanı");
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

  it("toplam üretim tavanı aşamaz; tavan aşılırsa uyarı ve dökümde üretim bilgisi çıkar", async () => {
    const s = await zanaatkar();
    s.rutbe_seviye = 3;
    s.ekip = [];
    const hatlar = s.isletme!.hatlar;
    hatlar.forEach((h) => { h.acik = false; h.stok = 0; });
    const hat = hatlar.find((h) => h.id === "kap")!;
    hat.acik = true;
    hat.otomatik = false;
    hat.siparis = 150; // tavanın çok üstünde
    s.isletme!.yatirimlar.depo = 3;
    const tavan = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    const uretilen = dokum.hatlar.reduce((t, h) => t + h.alinan, 0);
    expect(uretilen).toBeLessThanOrEqual(tavan);
    expect(dokum.uretim?.tavan).toBe(tavan);
    expect(dokum.uyarilar.some((u) => u.kod === "uretim_tavani")).toBe(true);
  });

  it("Tüccar'da aynı sipariş tavana takılmaz (depo kapasitesi dışında sınır yok)", async () => {
    const s = await tuccar();
    const hat = s.isletme!.hatlar.find((h) => h.acik)!;
    hat.otomatik = false;
    hat.stok = 0;
    hat.siparis = 150;
    s.isletme!.yatirimlar.depo = 3;
    const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
    expect(dokum.uretim).toBeUndefined();
    expect(dokum.hatlar[0].alinan).toBeGreaterThan(60);
  });

  it("tezgâh yatırımı, çalışan ve üretim kapasitesi metriği tavanı büyütür", async () => {
    const s = await zanaatkar();
    s.para = 5000;
    const once = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    await isletmeYatirimYap(s.id, "tezgah");
    const tezgahSonra = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    expect(tezgahSonra).toBeGreaterThan(once);
    s.uretim_kapasitesi = 40;
    expect((await isletmeDurumGetir(s.id)).uretim!.tavan).toBeGreaterThan(tezgahSonra);
    const ayrintiOnce = (await isletmeDurumGetir(s.id)).uretim!.tavan;
    await isletmeCalisanAl(s.id, s.isletme!.adaylar[0].id);
    expect((await isletmeDurumGetir(s.id)).uretim!.tavan).toBeGreaterThan(ayrintiOnce);
  });

  it("hiç dokunmayan Zanaatkâr bir yılda makul kâr eder", async () => {
    for (const cag of ["Orta Çağ", "Sanayi Devrimi"] as const) {
      const s = await zanaatkar(cag);
      const { dokum } = isletmeYilIsle(s, isletmeBaglami(s));
      expect(dokum.satis).toBeGreaterThan(0);
      expect(dokum.net).toBeGreaterThan(-5);
    }
  });

  it("rol adları ve otorite meslek × çağ × ülkeye göre gelir", async () => {
    const s = await zanaatkar();
    expect(s.isletme!.adaylar.every((a) => ["Çırak", "Kalfa", "Pazarcı"].includes(a.rol))).toBe(true);
    expect((await isletmeDurumGetir(s.id)).otorite).toBe("Loncabaşı");
    const st = await yeniOyun("Orta Çağ", "Selçuklu", "kasaba");
    await mesleğiAta(st.id, "Zanaatkâr");
    expect((await isletmeDurumGetir(st.id)).otorite).toBe("Ahi Baba");
    const s2 = await zanaatkar("Sanayi Devrimi");
    expect((await isletmeDurumGetir(s2.id)).otorite).toBe("Sanayi Odası Başkanı");
  });

  it("çifte kazanç önlemi Zanaatkâr'ın zanaat kategorisinde de işler", async () => {
    const s = await zanaatkar();
    const kitle = s.meslek_gucu;
    const etki = { para: 20, mesaj: "x" };
    ciftKazancKirp(s, etki, "zanaat");
    expect(etki.para).toBe(10);
    expect(s.meslek_gucu).toBeGreaterThan(kitle);
  });
});
