/**
 * GEÇİCİ codemod — bir olay dosyasının (TR) ve .en.ts aynasının METİNLERİNİ batch JSON'a çıkarır.
 *
 *   npx tsx scripts/kisaltCikar.ts <dosyaAdi> --out <dizin> [--butce 60000] [--idler a,b,c] [--onek red1]
 *
 * Çıktı:  <out>/in/<dosyaAdi>.<NN>.json   (ajana verilen girdi)
 * Biçim:  [{ id, baslik, ipucu, tr:{yol:metin}, en:{yol:metin}|null }]
 *   - `baslik` ve `ipucu` SALT-OKUNUR bağlam (ajan geri vermez, `baslik` asla değişmez).
 *   - Ajan <out>/out/<aynı dosya adı> olarak yalnız { id, tr, en } döndürür.
 * Yol şeması için scripts/kisaltLib.ts başlığına bak.
 */
import * as fs from "fs";
import * as path from "path";
import { CEVIRI_DIR, OLAY_DIR, enKaynagiTopla, trKaynagiTopla } from "./kisaltLib";

function arg(ad: string, varsayilan?: string): string | undefined {
  const i = process.argv.indexOf(`--${ad}`);
  return i >= 0 ? process.argv[i + 1] : varsayilan;
}

const dosya = process.argv[2];
const outDir = arg("out");
if (!dosya || !outDir) {
  console.error("Kullanım: kisaltCikar.ts <dosyaAdi> --out <dizin> [--butce N] [--idler a,b] [--onek ad]");
  process.exit(1);
}
const butce = Number(arg("butce", "60000"));
const onek = arg("onek", dosya)!;
const idFiltre = arg("idler") ? new Set(arg("idler")!.split(",")) : null;

const trYolu = path.join(OLAY_DIR, `${dosya}.ts`);
const enYolu = path.join(CEVIRI_DIR, `${dosya}.en.ts`);
const olaylar = trKaynagiTopla(trYolu);
const enHaritasi = fs.existsSync(enYolu) ? enKaynagiTopla(enYolu) : new Map();

interface Giris {
  id: string;
  baslik: string;
  ipucu: Record<string, string>;
  tr: Record<string, string>;
  en: Record<string, string> | null;
}

const girisler: Giris[] = [];
for (const o of olaylar) {
  if (idFiltre && !idFiltre.has(o.id)) continue;
  const tr: Record<string, string> = {};
  for (const [yol, h] of o.hedefler) tr[yol] = h.metin;
  const enH = enHaritasi.get(o.id);
  let en: Record<string, string> | null = null;
  if (enH) {
    en = {};
    for (const [yol, h] of enH) en[yol] = h.metin;
  }
  if (Object.keys(tr).length === 0) continue;
  girisler.push({ id: o.id, baslik: o.baslik, ipucu: o.ipucu, tr, en });
}

const boyut = (g: Giris) =>
  Object.values(g.tr).reduce((a, s) => a + s.length, 0) +
  Object.values(g.en ?? {}).reduce((a, s) => a + s.length, 0);

fs.mkdirSync(path.join(outDir, "in"), { recursive: true });
fs.mkdirSync(path.join(outDir, "out"), { recursive: true });

let batch: Giris[] = [];
let toplam = 0;
let no = 1;
let batchSayisi = 0;
const yaz = () => {
  if (batch.length === 0) return;
  const ad = `${onek}.${String(no).padStart(2, "0")}.json`;
  fs.writeFileSync(path.join(outDir, "in", ad), JSON.stringify(batch, null, 1), "utf8");
  batchSayisi++;
  no++;
  batch = [];
  toplam = 0;
};
for (const g of girisler) {
  const b = boyut(g);
  if (toplam + b > butce && batch.length > 0) yaz();
  batch.push(g);
  toplam += b;
}
yaz();

const eksikEn = girisler.filter((g) => !g.en).length;
console.log(
  `${dosya}: AST'de ${olaylar.length} olay, ${girisler.length} çıkarıldı, ${batchSayisi} batch ` +
    `(EN aynası: ${fs.existsSync(enYolu) ? "var" : "YOK"}, ENsiz olay: ${eksikEn})`
);
