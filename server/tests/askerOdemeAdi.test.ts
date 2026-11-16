import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { MAAS_ADLARI, maasAdi } from "../src/data/birlik";

/**
 * Oyuncuya görünen Türkçe metinde "sold" kelimesi YAZILMAZ: asker ödemesinin adı çağ + ülkeye göre yereldir
 * (Ulûfe, Löhnung, Roga, Soldée, Prêt, Mevacib, Jalovanye, Kraliyet Maaşı; bilinmeyen için "Maaş").
 * Bu test client/src ve server/src içindeki tüm metin değişmezlerini (string literal) tarar.
 */
const KOK = resolve(__dirname, "..");
const DIZINLER = [join(KOK, "src"), join(KOK, "..", "client", "src")];

function dosyalar(d: string): string[] {
  return readdirSync(d).flatMap((ad) => {
    const yol = join(d, ad);
    if (ad === "node_modules") return [];
    if (statSync(yol).isDirectory()) return dosyalar(yol);
    return /\.(ts|tsx)$/.test(ad) && !/\.en\.ts$/.test(ad) ? [yol] : []; // İngilizce aynalar hariç (orada "sold" fiil)
  });
}

const TURKCE_HARF = /[çğıöşüÇĞİÖŞÜ]/;
const BUYUK_SOLD = /(^|[^\p{L}])Sold(?![\p{L}])/u; // "Sold", "Sold (devlet)", "Sold'un"
const KUCUK_SOLD = /(^|[^\p{L}])sold(?![\p{L}])/u; // İngilizce fiil "sold" ile karışmasın diye yalnız Türkçe harfli metinlerde

describe("oyuncuya görünen metinde 'sold' yazılmaz", () => {
  it("hiçbir Türkçe metin değişmezinde 'Sold' / 'sold' kelimesi yok", () => {
    const ihlal: string[] = [];
    for (const dizin of DIZINLER) {
      for (const dosya of dosyalar(dizin)) {
        const satirlar = readFileSync(dosya, "utf8").split("\n");
        satirlar.forEach((satir, i) => {
          const t = satir.trim();
          if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*")) return; // yorum satırı
          const kod = satir.replace(/\s\/\/.*$/, ""); // satır sonu yorumu
          for (const m of kod.matchAll(/(["'`])((?:\\.|(?!\1).)*)\1/g)) {
            const metin = m[2];
            if (BUYUK_SOLD.test(metin) || (TURKCE_HARF.test(metin) && KUCUK_SOLD.test(metin))) {
              ihlal.push(`${dosya.replace(KOK, "server").replace(join(KOK, ".."), "")}:${i + 1}: ${metin.slice(0, 80)}`);
            }
          }
        });
      }
    }
    expect(ihlal).toEqual([]);
  });

  it("her çağ+ülkenin yerel bir ödeme adı var; ad 'sold' değil", () => {
    for (const [anahtar, ad] of Object.entries(MAAS_ADLARI)) {
      expect(ad.tr, anahtar).not.toMatch(/^sold$/i);
      expect(ad.en, anahtar).not.toMatch(/^sold$/i);
    }
    expect(maasAdi("Orta Çağ", "Selçuklu").tr).toBe("Ulûfe");
    expect(maasAdi("Sanayi Devrimi", "Osmanlı").tr).toBe("Mevacib");
    expect(maasAdi("Bilinmeyen", "Yer").tr).toBe("Maaş");
  });
});
