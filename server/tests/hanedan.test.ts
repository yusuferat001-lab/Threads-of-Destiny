import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, soyuSurdur } from "../src/game/gameEngine";
import { secimUygulaVeCoz } from "./testUtils";

async function baslikBul(
  state: { aktif: boolean; id: string; saglik: number; para: number },
  hedef: string,
  maxDeneme: number
): Promise<boolean> {
  for (let i = 0; i < maxDeneme && state.aktif; i++) {
    if (state.saglik < 60) state.saglik = 90;
    if (state.para < 50) state.para = 300;
    const senaryo = await senaryoUret(state.id);
    if (senaryo.olay_basligi === hedef) {
      const idx = senaryo.secenekler.findIndex((s) => !s.kilitli);
      await secimUygulaVeCoz(state.id, idx >= 0 ? idx : 0);
      return true;
    }
    // Hedefi bulamadıysak bu turu çözüp bir sonraki senaryoUret'e geçiyoruz; rastgele bir
    // açık seçenek seçilir (hep ilkini seçmek, riskli seçeneklerin hep ilk sırada olduğu
    // olaylarda ölüm riskini gereksiz artırır — zorunlu (deterministik) olay hep aynı sonucu
    // döndürüp döngüyü kilitlemesin diye de bu tur mutlaka çözülüyor).
    const acikSecenekler = senaryo.secenekler.map((s, i2) => ({ s, i2 })).filter(({ s }) => !s.kilitli);
    const idx = acikSecenekler.length > 0 ? acikSecenekler[Math.floor(Math.random() * acikSecenekler.length)].i2 : 0;
    await secimUygulaVeCoz(state.id, idx);
  }
  return false;
}

describe("evlilik → çocuk → hanedan modu", () => {
  it("evlilik olayı es_adi atar ve hayat_hikayesine yazar", async () => {
    let bulundu = false;
    let state: Awaited<ReturnType<typeof yeniOyun>> | null = null;
    // Tek bir karakter, evlilik olayına hiç rastlamadan ölebilir (nadir ama olası —
    // eskiden testi flaky yapıyordu). Bağımsız birkaç ömre bölmek, tek bir kötü
    // şanslı ömrün testi düşürmesini pratikte imkansız hale getiriyor.
    for (let deneme = 0; deneme < 5 && !bulundu; deneme++) {
      state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
      state.yas = 20;
      await mesleğiAta(state.id, "Tüccar");
      bulundu = await baslikBul(state, "Nüfuzlu Bir Bağ", 2000);
    }
    expect(bulundu).toBe(true);
    if (state!.es_adi) {
      expect(state!.hayat_hikayesi.some((h) => h.ikon === "💍")).toBe(true);
    }
  }, 60000);

  it("29 yaşına kadar hiç evlenmemişse evlilik teklifi zorla tetiklenir", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");

    state.yas = 29;
    // Tarihi savaş ilanı zorlaması bu testle çakışmasın diye (aynı senaryoUret
    // içinde iki farklı zorlama önceliği var), savaşta:true ile o yolu kapatıyoruz.
    state.ulke.savasta = true;

    const senaryo = await senaryoUret(state.id);
    expect(senaryo.olay_basligi).toBe("Nüfuzlu Bir Bağ");

    const idx = senaryo.secenekler.findIndex((s) => s.metin.includes("Mantık evliliğini kabul et"));
    expect(idx).toBeGreaterThanOrEqual(0);
    const sonuc = await secimUygulaVeCoz(state.id, idx);
    if (sonuc.basarili) {
      expect(sonuc.state.es_adi).toBeTruthy();
      expect(sonuc.state.es_meslek).toBeTruthy();
      expect(sonuc.state.es_rutbe).toBeTruthy();
    }
  });

  it("çocuk doğumu isimli bir çocuk ekler ve cocuk_var etiketini açar", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    state.yas = 20;
    await mesleğiAta(state.id, "Tüccar");
    await baslikBul(state, "Nüfuzlu Bir Bağ", 6000);

    if (state.es_adi) {
      const mujde = await baslikBul(state, "Bir Müjde", 6000);
      if (mujde && state.cocuklar.length > 0) {
        expect(state.cocuklar[0].isim).toBeTruthy();
        expect(state.etiketler).toContain("cocuk_var");
      }
    }
  });

  it("soyuSurdur: aktif karakterde çağrılırsa hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    await expect(soyuSurdur(state.id)).rejects.toThrow("hâlâ hayatta");
  });

  it("soyuSurdur: yaşayan çocuk yoksa hata fırlatır", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.aktif = false;
    await expect(soyuSurdur(state.id)).rejects.toThrow("yaşayan bir çocuk yok");
  });

  it("soyuSurdur: yaşayan çocukla ebeveynin mesleğini/servetini devralan yeni karakter oluşturur", async () => {
    const state = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
    await mesleğiAta(state.id, "Tüccar");
    state.cocuklar.push({ isim: "TestÇocuk", dogum_yili: state.yil, yasiyor: true });
    state.para = 200;
    state.un = 40;
    state.aktif = false;
    state.olum_nedeni = "Test için öldürüldü.";

    const yeni = await soyuSurdur(state.id);
    expect(yeni.isim).toBe("TestÇocuk");
    expect(yeni.aile_meslegi).toBe("Tüccar");
    expect(yeni.para).toBeGreaterThan(0);
    expect(yeni.etiketler).toContain("miras:soy_surdu");
    expect(yeni.acilis_anlatimi).toContain("TestÇocuk");
  });
});
