/**
 * GEÇİCİ codemod — ajanların kısalttığı batch'leri kaynak dosyalara uygular.
 *
 *   npx tsx scripts/kisaltUygula.ts <dosyaAdi> --out <dizin> [--dry] [--batch <batch.json>]
 *
 * <out>/in/<dosya>.*.json ile <out>/out/<aynı ad> eşleştirilir. Bir olay şu durumlarda
 * REDDEDİLİR (hiçbir alanı yazılmaz; <out>/red/<dosya>.json'a listelenir, yeniden
 * `kisaltCikar --idler ... --onek redN` ile işlenir):
 *   - anahtar kümesi ya da değer tipi uyuşmuyor, boş metin
 *   - metin eskisinden UZUN
 *   - placeholder / ek kalıbı kümesi değişmiş
 *   - dondurulmuş şık metni değişmiş / yasaklı kelime girmiş
 *   - kaynak, ajana verilen girdiden sonra değişmiş (bayat)
 * Kabul edilip yumuşak üst sınırı aşan metinler <out>/uzun/<dosya>.json'a yazılır.
 */
import * as fs from "fs";
import * as path from "path";
import {
  CEVIRI_DIR,
  DONDURULMUS_SIK_OLAYLARI,
  OLAY_DIR,
  YASAKLI_KELIMELER,
  enKaynagiTopla,
  metinleriDegistir,
  trKaynagiTopla,
  ustSinir,
  yerTutucular,
  type Hedef,
} from "./kisaltLib";

function arg(ad: string): string | undefined {
  const i = process.argv.indexOf(`--${ad}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const dosya = process.argv[2];
const outDir = arg("out");
const kuru = process.argv.includes("--dry");
if (!dosya || !outDir) {
  console.error("Kullanım: kisaltUygula.ts <dosyaAdi> --out <dizin> [--dry]");
  process.exit(1);
}

interface Giris {
  id: string;
  tr: Record<string, string>;
  en: Record<string, string> | null;
}

const trYolu = path.join(OLAY_DIR, `${dosya}.ts`);
const enYolu = path.join(CEVIRI_DIR, `${dosya}.en.ts`);
const trKaynak = new Map(trKaynagiTopla(trYolu).map((o) => [o.id, o.hedefler]));
const enKaynak: Map<string, Map<string, Hedef>> = fs.existsSync(enYolu) ? enKaynagiTopla(enYolu) : new Map();

const inDizin = path.join(outDir, "in");
const tekBatch = arg("batch");
const batchler = fs
  .readdirSync(inDizin)
  .filter((f) => f.startsWith(`${dosya}.`) && f.endsWith(".json") && (!tekBatch || f === tekBatch))
  .sort();

const trDegisiklik: { bas: number; bit: number; yeni: string }[] = [];
const enDegisiklik: { bas: number; bit: number; yeni: string }[] = [];
const red: { id: string; neden: string }[] = [];
const uzun: { id: string; dil: string; yol: string; uzunluk: number; limit: number }[] = [];
let kabul = 0;
let eksikBatch = 0;
let oncesi = 0;
let sonrasi = 0;

function dilKontrol(
  id: string,
  dil: "tr" | "en",
  girdi: Record<string, string>,
  cikti: Record<string, string> | undefined,
  kaynak: Map<string, Hedef> | undefined
): string | null {
  if (!cikti || typeof cikti !== "object") return `${dil}: çıktı yok`;
  const gA = Object.keys(girdi).sort().join("|");
  const cA = Object.keys(cikti).sort().join("|");
  if (gA !== cA) return `${dil}: anahtar kümesi uyuşmuyor`;
  for (const [yol, eski] of Object.entries(girdi)) {
    const yeni = cikti[yol];
    if (typeof yeni !== "string" || yeni.trim() === "") return `${dil}.${yol}: boş/geçersiz`;
    const k = kaynak?.get(yol);
    if (!k) return `${dil}.${yol}: kaynakta yok`;
    if (k.metin !== eski && k.metin !== yeni) return `${dil}.${yol}: bayat (kaynak değişmiş)`;
    if (yeni.length > eski.length) return `${dil}.${yol}: eskisinden uzun (${eski.length}→${yeni.length})`;
    if (yerTutucular(eski).join("¦") !== yerTutucular(yeni).join("¦")) return `${dil}.${yol}: placeholder değişmiş`;
    if (dil === "tr" && DONDURULMUS_SIK_OLAYLARI.has(id) && /^s\d+\.metin$/.test(yol) && yeni !== eski) {
      return `${dil}.${yol}: dondurulmuş şık`;
    }
    const yasak = YASAKLI_KELIMELER[id];
    if (dil === "tr" && yasak && /^s\d+\.metin$/.test(yol)) {
      const kucuk = yeni.toLowerCase();
      if (yasak.some((w) => kucuk.includes(w))) return `${dil}.${yol}: yasaklı kelime`;
    }
  }
  return null;
}

for (const ad of batchler) {
  const girdiYolu = path.join(inDizin, ad);
  const cikti = path.join(outDir, "out", ad);
  if (!fs.existsSync(cikti)) {
    eksikBatch++;
    continue;
  }
  const girdi: Giris[] = JSON.parse(fs.readFileSync(girdiYolu, "utf8"));
  let ciktiVeri: Giris[];
  try {
    ciktiVeri = JSON.parse(fs.readFileSync(cikti, "utf8"));
  } catch (e) {
    red.push(...girdi.map((g) => ({ id: g.id, neden: `JSON okunamadı: ${ad}` })));
    continue;
  }
  const cikById = new Map(ciktiVeri.map((c) => [c.id, c]));
  for (const g of girdi) {
    const c = cikById.get(g.id);
    if (!c) {
      red.push({ id: g.id, neden: "çıktıda olay yok" });
      continue;
    }
    let neden = dilKontrol(g.id, "tr", g.tr, c.tr, trKaynak.get(g.id));
    if (!neden && g.en) neden = dilKontrol(g.id, "en", g.en, c.en ?? undefined, enKaynak.get(g.id));
    if (neden) {
      red.push({ id: g.id, neden });
      continue;
    }
    kabul++;
    for (const [dil, harita, kaynak, liste] of [
      ["tr", g.tr, trKaynak.get(g.id)!, trDegisiklik],
      ["en", g.en ?? {}, enKaynak.get(g.id), enDegisiklik],
    ] as const) {
      for (const [yol, eski] of Object.entries(harita)) {
        const yeni = (dil === "tr" ? c.tr : c.en!)[yol];
        oncesi += eski.length;
        sonrasi += yeni.length;
        if (yeni !== eski && kaynak) {
          const k = kaynak.get(yol)!;
          liste.push({ bas: k.bas, bit: k.bit, yeni });
        }
        const lim = ustSinir(yol, dil);
        if (yeni.length > lim) uzun.push({ id: g.id, dil, yol, uzunluk: yeni.length, limit: lim });
      }
    }
  }
}

fs.mkdirSync(path.join(outDir, "red"), { recursive: true });
fs.mkdirSync(path.join(outDir, "uzun"), { recursive: true });
fs.writeFileSync(path.join(outDir, "red", `${dosya}.json`), JSON.stringify(red, null, 1), "utf8");
fs.writeFileSync(path.join(outDir, "uzun", `${dosya}.json`), JSON.stringify(uzun, null, 1), "utf8");

if (!kuru) {
  metinleriDegistir(trYolu, trDegisiklik);
  if (enDegisiklik.length > 0) metinleriDegistir(enYolu, enDegisiklik);
}

const yuzde = oncesi ? Math.round((1 - sonrasi / oncesi) * 100) : 0;
console.log(
  `${dosya}${kuru ? " (DRY)" : ""}: ${kabul} olay kabul, ${red.length} red, ${eksikBatch} batch çıktısı eksik; ` +
    `TR ${trDegisiklik.length} + EN ${enDegisiklik.length} metin yazıldı; karakter ${oncesi}→${sonrasi} (−%${yuzde}); ` +
    `üst sınırı aşan ${uzun.length}`
);
if (red.length) console.log("RED:\n" + red.map((r) => `  ${r.id}: ${r.neden}`).join("\n"));
if (tekBatch && uzun.length) console.log("ÜST SINIRI AŞAN (yeniden kısalt):\n" + uzun.map((u) => `  ${u.id} ${u.dil}.${u.yol} ${u.uzunluk}>${u.limit}`).join("\n"));
