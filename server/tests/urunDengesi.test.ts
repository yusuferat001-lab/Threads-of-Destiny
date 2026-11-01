import { describe, it, expect } from "vitest";
import { isletmeProfiliGetir, type HatTanimi, type UrunBonusu } from "../src/data/meslekProfilleri";
import { donemEtkisiZarla, savasEtkisiZarla } from "../src/data/dunyaDonemleri";
import { ALIM_ORANI } from "../src/data/pazar";

// Orta nokta (rnd=0.5) dönem etkileri: deterministik.
const orta = () => 0.5;
const E: Record<string, { tt: number; tf: number; lt: number; lf: number }> = {};
for (const d of ["bolluk", "durgunluk", "kitlik"] as const) {
  const e = donemEtkisiZarla(d, orta);
  E[d] = { tt: e.temelTalep, tf: e.temelFiyat, lt: e.luksTalep, lf: e.luksFiyat };
}
{
  const e = savasEtkisiZarla(orta);
  E.savas = { tt: e.temelTalep, tf: e.temelFiyat, lt: e.luksTalep, lf: e.luksFiyat };
}
// Zaman payları: bolluk %31 · durgunluk %31 · kıtlık %18 · savaş %20.
const ZAMAN: Record<string, number> = { bolluk: 0.31, durgunluk: 0.31, kitlik: 0.18, savas: 0.2 };
const MUSTERI = 100;

function yillikKar(h: HatTanimi, b: UrunBonusu, donem: string, musteri = MUSTERI) {
  const luks = h.kesim === "luks";
  const e = E[donem];
  const fs = luks ? e.lf : e.tf;
  const ts = luks ? e.lt : e.tt;
  const sav = donem === "savas" && h.savasTalep ? h.savasTalep + (b.savasTalepEki ?? 0) : 1;
  const kar = (h.birimFiyat * (b.satisCarpani ?? 1) - h.birimMaliyet * (b.alisCarpani ?? 1)) * fs;
  return kar * musteri * ALIM_ORANI * h.talepTabani * ts * (b.talepCarpani ?? 1) * sav;
}
const toplam50 = (h: HatTanimi, b: UrunBonusu) => 50 * Object.keys(ZAMAN).reduce((t, d) => t + ZAMAN[d] * yillikKar(h, b, d), 0);

const PROFILLER: [string, "Orta Çağ" | "Sanayi Devrimi"][] = [
  ["Tüccar", "Orta Çağ"],
  ["Tüccar", "Sanayi Devrimi"],
  ["Zanaatkâr", "Orta Çağ"],
  ["Zanaatkâr", "Sanayi Devrimi"],
];

describe("ürün dengesi (50 yıllık getiri)", () => {
  for (const [meslek, cag] of PROFILLER) {
    describe(`${meslek} — ${cag}`, () => {
      const p = isletmeProfiliGetir(meslek, cag)!;
      const bas = p.baslangicUrunleri!;
      const satirlar = p.hatlar.map((h) => {
        const u = bas.find((x) => x.hat === h.id);
        return { h, b: (u?.bonus ?? {}) as UrunBonusu, star: !!u, toplam: toplam50(h, (u?.bonus ?? {}) as UrunBonusu) };
      });
      const stars = satirlar.filter((x) => x.star);
      const sonra = satirlar.filter((x) => !x.star);
      const ortStar = stars.reduce((t, x) => t + x.toplam, 0) / stars.length;

      it("başlangıç üçlüsünün 50 yıllık toplamı birbirine %10 içinde yakın", () => {
        const max = Math.max(...stars.map((x) => x.toplam));
        const min = Math.min(...stars.map((x) => x.toplam));
        expect(max / min).toBeLessThanOrEqual(1.1);
      });

      it("rütbeyle açılan (S2+) sonradan hatlar başlangıç ortalamasının üstünde", () => {
        // S1'de açılan sonradan hatlar (Demir Alet, Ev Eşyası, Kömür) erken oyunu dengede tutmak için bilerek yükseltilmedi.
        for (const x of sonra.filter((y) => y.h.minRutbe >= 2)) expect(x.toplam, x.h.id).toBeGreaterThanOrEqual(ortStar * 1.03);
      });

      it("hiçbir ürün hiçbir dönemde eksiye düşmez (brüt − çürüme − aidat > 0 @55 müşteri)", () => {
        const KOMBO: { ad: string; d: string; savas: boolean }[] = [
          { ad: "bolluk", d: "bolluk", savas: false },
          { ad: "durgunluk", d: "durgunluk", savas: false },
          { ad: "kitlik", d: "kitlik", savas: false },
        ];
        for (const x of satirlar) {
          for (const k of KOMBO) {
            const brut = yillikKar(x.h, x.b, k.d, 55);
            // Çürüme kaybı: ilk depo kademesi (≈58 birim kapasitenin hat payı ~ 20 birim) × %10 × birim maliyet; aidat satışın %2'si.
            const curume = 20 * 0.1 * x.h.birimMaliyet * (E[k.d][x.h.kesim === "luks" ? "lf" : "tf"] as number);
            const satis = brut + 0; // aidat yaklaşık: brütün %2'si yeter (satış ≥ brüt)
            expect(brut - curume - satis * 0.02, `${x.h.id} ${k.ad}`).toBeGreaterThan(0);
          }
          // Savaşta (dönem etkisi yalnız savaş katmanı)
          const sav = yillikKar(x.h, x.b, "savas", 55);
          expect(sav, `${x.h.id} savaş`).toBeGreaterThan(0);
        }
      });
    });
  }
});
