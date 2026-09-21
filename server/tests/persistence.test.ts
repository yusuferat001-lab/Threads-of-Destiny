import { describe, it, expect } from "vitest";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  stateGetir,
  oturumlariYukle,
  oturumlariBellektenTemizle,
  aktifOturumSayisi,
} from "../src/game/gameEngine";
import { oturumYukle, eskiOturumlariTemizle } from "../src/db/sessionRepository";
import { secimUygulaVeCoz } from "./testUtils";

describe("oturum kalıcılığı", () => {
  it("yeni oyun oluşturulduğunda DB'ye de yazılır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    const dbdenOkunan = await oturumYukle(state.id);
    expect(dbdenOkunan).not.toBeNull();
    expect(dbdenOkunan?.id).toBe(state.id);
  });

  it("seçim uygulandıktan sonra DB'deki kayıt güncellenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");
    const senaryo = await senaryoUret(state.id);
    const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
    const sonuc = await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);

    const dbdenOkunan = await oturumYukle(state.id);
    expect(dbdenOkunan?.yil).toBe(sonuc.state.yil);
    expect(dbdenOkunan?.tur_sayisi).toBe(sonuc.state.tur_sayisi);
  });

  it("oturumlariYukle DB'deki aktif oturumları in-memory önbelleğe geri yükler", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    await mesleğiAta(state.id, "Tüccar");

    const sayi = await oturumlariYukle();
    expect(sayi).toBeGreaterThanOrEqual(1);

    // Yükleme sonrası stateGetir hâlâ çalışmalı (ister önbellekten ister DB'den).
    const geriYuklenen = await stateGetir(state.id);
    expect(geriYuklenen.id).toBe(state.id);
    expect(geriYuklenen.meslek).toBe("Tüccar");
  });

  it("var olmayan bir oturum id'si için hata fırlatır", async () => {
    await expect(stateGetir("olmayan-bir-id")).rejects.toThrow("bulunamadı");
  });

  it("bitmiş oturumlar bellekten temizlenir, aktifler kalır", async () => {
    const olen = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    olen.aktif = false;
    const aktifOlan = await yeniOyun("Orta Çağ", "Fransa", "kasaba");

    const oncekiSayi = aktifOturumSayisi();
    // grace süresi 0: hemen erişilmemiş sayılıp silinsin (test amaçlı)
    const silinen = oturumlariBellektenTemizle(-1);
    expect(silinen).toBeGreaterThanOrEqual(1);
    expect(aktifOturumSayisi()).toBeLessThan(oncekiSayi);

    // Bitmiş oturum bellekten silinse de DB'den hâlâ okunabilmeli.
    const dbdenOkunan = await stateGetir(olen.id);
    expect(dbdenOkunan.id).toBe(olen.id);

    // Aktif oturum hâlâ erişilebilir olmalı.
    const hala = await stateGetir(aktifOlan.id);
    expect(hala.aktif).toBe(true);
  });

  it("eskiOturumlariTemizle eski bitmiş kayıtları DB'den siler, aktif olanı silmez", async () => {
    const bitmis = await yeniOyun("Orta Çağ", "Fransa", "kasaba");
    bitmis.aktif = false;
    await mesleğiAta(bitmis.id, "Tüccar"); // state.aktif=false hâliyle DB'ye yazılmasını sağlar

    const aktif = await yeniOyun("Orta Çağ", "Fransa", "kasaba");

    const gelecekTarih = new Date(Date.now() + 1000 * 60 * 60);
    await eskiOturumlariTemizle(gelecekTarih);

    expect(await oturumYukle(bitmis.id)).toBeNull();
    expect(await oturumYukle(aktif.id)).not.toBeNull();
  });
});
