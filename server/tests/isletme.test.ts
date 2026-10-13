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
