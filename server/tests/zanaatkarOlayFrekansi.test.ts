import { describe, it, expect } from "vitest";
import { yeniOyun, mesleğiAta, senaryoUret, secimUygula } from "../src/game/gameEngine";

/**
 * "Zanaatkâr'ın kendi olay havuzu (kariyer yolu + standalone, 130 olay) bir
 * ömürde kaç kez tetikleniyor?" sorusuna cevap veren bir simülasyon guardrail'i
 * — analyzeOlaylar.ts'in "gerçek olaySec() ile simülasyon" felsefesiyle aynı,
 * ama kalıcı bir teste dönüştürülmüş hâli (§22 deseniyle uyumlu).
 *
 * Bot her turda AÇIK seçeneklerden rastgele birini seçer (gerçek bir oyuncunun
 * ortalama davranışına en yakın kaba yaklaşım — hep ilk seçeneği seçen bir bot
 * sistematik bir yanlılık yaratabilirdi). Ölüm mekanikleri (ecel/ani ölüm)
 * çalıştığı için ortalama ömür ~45-50 yaşta kesiliyor; bu, gerçek `checkDeath`
 * davranışının bir sonucu, testin bir kusuru değil.
 */

async function secimUygulaVeCoz(id: string, idx: number) {
  const sonuc = await secimUygula(id, idx);
  if ("ara_tepki" in sonuc) return secimUygula(id, 1);
  return sonuc;
}

async function birOmurOyna(cag: "Orta Çağ" | "Sanayi Devrimi", bolge: string) {
  const state = await yeniOyun(cag, bolge, "sehir_merkezi");
  await mesleğiAta(state.id, "Zanaatkâr");
  let aktif = true;
  let sonState = state;
  for (let tur = 0; tur < 200 && aktif; tur++) {
    const senaryo = await senaryoUret(state.id);
    const acik = senaryo.secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
    const secim = acik.length > 0 ? acik[Math.floor(Math.random() * acik.length)].i : 0;
    const sonuc = await secimUygulaVeCoz(state.id, secim);
    aktif = sonuc.state.aktif;
    sonState = sonuc.state;
  }
  return sonState;
}

interface Ozet {
  n: number;
  ortalama: number;
  min: number;
  max: number;
  sifirOmurSayisi: number;
}

function ozetHesapla(sayilar: number[]): Ozet {
  const n = sayilar.length;
  const ortalama = sayilar.reduce((a, b) => a + b, 0) / n;
  return {
    n,
    ortalama: Math.round(ortalama * 100) / 100,
    min: Math.min(...sayilar),
    max: Math.max(...sayilar),
    sifirOmurSayisi: sayilar.filter((s) => s === 0).length,
  };
}

describe("Zanaatkâr olay havuzunun bir ömürde tetiklenme sıklığı (simülasyon)", () => {
  it("Orta Çağ: 130'luk havuzdan (44 kariyer-yolu + 20 standalone) bir ömürde ortalama en az 1 kez tetiklenir", async () => {
    const N = 120;
    const toplamSayilar: number[] = [];
    const yolSayilar: number[] = [];
    for (let i = 0; i < N; i++) {
      const s = await birOmurOyna("Orta Çağ", "Fransa");
      const zanaatOlaylari = s.gecmis_olaylar.filter((id) => id.startsWith("oc_zanaatkar_"));
      const yolOlaylari = zanaatOlaylari.filter(
        (id) => id === "oc_zanaatkar_yol_ilk_siparis" || /_[0-9]+$/.test(id)
      );
      toplamSayilar.push(zanaatOlaylari.length);
      yolSayilar.push(yolOlaylari.length);
    }
    const ozet = ozetHesapla(toplamSayilar);
    const yolOzet = ozetHesapla(yolSayilar);
    // eslint-disable-next-line no-console
    console.log(
      `[Zanaatkâr/Orta Çağ] ${N} ömür — ortalama ${ozet.ortalama} olay/ömür (min ${ozet.min}, max ${ozet.max}, ${ozet.sifirOmurSayisi} ömür hiç görmedi); kariyer-yolu payı ortalama ${yolOzet.ortalama}`
    );
    expect(ozet.ortalama).toBeGreaterThan(1);
    expect(ozet.max).toBeGreaterThan(5);
    // Havuzun tamamen erişilemez hale gelmediğinin (etiket/filtre hatası) kanıtı.
    expect(ozet.sifirOmurSayisi).toBeLessThan(N);
  }, 30000);

  it("Sanayi Devrimi: 130'luk havuzdan (44 kariyer-yolu + 20 standalone) bir ömürde ortalama en az 1 kez tetiklenir", async () => {
    const N = 120;
    const toplamSayilar: number[] = [];
    const yolSayilar: number[] = [];
    for (let i = 0; i < N; i++) {
      const s = await birOmurOyna("Sanayi Devrimi", "İngiltere");
      const zanaatOlaylari = s.gecmis_olaylar.filter((id) => id.startsWith("sd_zanaatkar_"));
      const yolOlaylari = zanaatOlaylari.filter(
        (id) => id === "sd_zanaatkar_yol_ilk_makine" || /_[0-9]+$/.test(id)
      );
      toplamSayilar.push(zanaatOlaylari.length);
      yolSayilar.push(yolOlaylari.length);
    }
    const ozet = ozetHesapla(toplamSayilar);
    const yolOzet = ozetHesapla(yolSayilar);
    // eslint-disable-next-line no-console
    console.log(
      `[Zanaatkâr/Sanayi Devrimi] ${N} ömür — ortalama ${ozet.ortalama} olay/ömür (min ${ozet.min}, max ${ozet.max}, ${ozet.sifirOmurSayisi} ömür hiç görmedi); kariyer-yolu payı ortalama ${yolOzet.ortalama}`
    );
    expect(ozet.ortalama).toBeGreaterThan(1);
    expect(ozet.max).toBeGreaterThan(5);
    expect(ozet.sifirOmurSayisi).toBeLessThan(N);
  }, 30000);
});
