/**
 * TEK SEFERLİK codemod — aranma etkisini `suc_sinifi` sistemine taşır (2026-10).
 *
 * Eski durum: (a) motor kuralı: para>0 ve ahlak<=-5 olan HER dal otomatik +16..65 aranma
 * ve para ×1.6 alıyordu (örtük, ~256 olay); (b) olay verisinde açık `suc_artis: N` pozitifleri.
 * Yeni durum: yalnız yasa dışı eylem içeren dallarda `suc_sinifi: "kucuk"|"orta"|"buyuk"|"agir"`
 * yazılıdır; motor aralıktan değer seçer (gameEngine.SUC_SINIFI_ARALIKLARI). Açık pozitif
 * `suc_artis` kaldırılır, negatifler (kefaret/rüşvet) ve `suc_seviyesi_ayarla` korunur.
 *
 * Kullanım:
 *   npx tsx scripts/aranmaSinifCodemod.ts rapor <cikti.json>
 *       -> adayları ve ÖNERİLEN sınıfları listeler (elle gözden geçirmek için)
 *   npx tsx scripts/aranmaSinifCodemod.ts uygula <duzeltmeler.json> [--yaz]
 *       -> öneri + elle düzeltmeleri birleştirir; --yaz yoksa kuru çalıştırma (özet)
 *
 * Düzeltme dosyası biçimi: { "olayId#seçenekIndex": "none" | { "S": "orta", "F": "buyuk" } }
 *   S = basariliSonuc, F = basarisizSonuc, G/D = onTepki.geriCekilSonucu/devamSonucu.
 *   "none" = bu şık suç değil (hiçbir dala sınıf yazılmaz; açık pozitif suc_artis silinir).
 */
import { OLAY_BANKASI } from "../src/data/olaylar/index";
// Projedeki typescript 7 (yerel derleyici) JS API sunmaz: AST için eski bir sürüm gerekir.
// Kullanım:  TS_API_YOLU=/yol/node_modules/typescript npx tsx scripts/aranmaSinifCodemod.ts ...
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ts: typeof import("typescript") = require(process.env.TS_API_YOLU ?? "typescript");
import * as fs from "fs";
import * as path from "path";

type Sinif = "kucuk" | "orta" | "buyuk" | "agir" | "kumar";
type DalAd = "S" | "F" | "G" | "D";
const DAL_ALAN: Record<DalAd, string> = {
  S: "basariliSonuc",
  F: "basarisizSonuc",
  G: "geriCekilSonucu",
  D: "devamSonucu",
};
const OLAY_DIR = path.join(__dirname, "..", "src", "data", "olaylar");

const ust = (s: Sinif): Sinif => (s === "kucuk" ? "orta" : s === "orta" ? "buyuk" : "agir");
function degerdenSinif(v: number, yakalanma: boolean): Sinif {
  if (v <= 9) return "kucuk";
  if (v <= 17) return "orta";
  if (v <= 26) return "buyuk";
  return yakalanma ? "agir" : "buyuk";
}

// Yasa dışı eylem sezgisi (yalnız ÖNERİ üretir; son karar elle gözden geçirmeyle verilir).
const YASA_DISI = new RegExp(
  [
    "hırsız", "çal[ıa]", "çalın", "\\bsoy", "soygun", "yağma", "gasp", "kaçak", "kaçır",
    "rüşvet", "sahte", "taklit", "hile", "dolandır", "doland", "karaborsa", "kara borsa",
    "cinayet", "öldür", "zehir", "kundak", "\\byak\\b", "yakıl", "isyan", "sabotaj", "haraç",
    "şantaj", "vurgun", "yolsuz", "zimmet", "korsan", "baskın", "vergi kaç", "yasa dışı",
    "yasadışı", "illegal", "sahtecilik", "dövdür", "\\bdöv", "kavga", "yağmala", "ele geçir",
    "el koy", "tefeci", "faiz", "komplo", "suikast", "tuzak", "sızdır", "kaçakç", "gümrük",
  ].join("|"),
  "i"
);

interface DalBilgi {
  p: number;
  a: number;
  sa: number; // açık suc_artis (pozitif ya da negatif)
}
interface Satir {
  key: string;
  dosya: string;
  id: string;
  i: number;
  baslik: string;
  metin: string;
  bs: number;
  dallar: Partial<Record<DalAd, DalBilgi>>;
  oneri: Partial<Record<DalAd, Sinif>>;
  not: string;
}

// ---- id -> dosya ----
const DOSYALAR = fs
  .readdirSync(OLAY_DIR)
  .filter((f) => f.endsWith(".ts") && !f.endsWith(".en.ts") && f !== "index.ts" && f !== "types.ts");
const idDosya = new Map<string, string[]>();
for (const f of DOSYALAR) {
  const txt = fs.readFileSync(path.join(OLAY_DIR, f), "utf8");
  for (const m of txt.matchAll(/^\s{2,6}id:\s*["'`]([^"'`]+)["'`]/gm)) {
    const arr = idDosya.get(m[1]) ?? [];
    if (!arr.includes(f)) arr.push(f);
    idDosya.set(m[1], arr);
  }
}

function dallarOf(sec: any): Partial<Record<DalAd, any>> {
  return {
    S: sec.basariliSonuc,
    F: sec.basarisizSonuc,
    G: sec.onTepki?.geriCekilSonucu,
    D: sec.onTepki?.devamSonucu,
  };
}

function rapor(): Satir[] {
  const satirlar: Satir[] = [];
  for (const o of OLAY_BANKASI as any[]) {
    (o.secenekler ?? []).forEach((sec: any, i: number) => {
      const dallar: Partial<Record<DalAd, DalBilgi>> = {};
      let aday = false;
      let aciklarPozitif = false;
      for (const [ad, e] of Object.entries(dallarOf(sec)) as [DalAd, any][]) {
        if (!e) continue;
        const p = e.para ?? 0;
        const a = e.ahlak ?? 0;
        const sa = e.suc_artis ?? 0;
        const orturuk = p > 0 && a <= -5;
        if (sa > 0 || orturuk) {
          aday = true;
          if (sa > 0) aciklarPozitif = true;
        }
        if (sa !== 0 || p !== 0 || a !== 0) dallar[ad] = { p, a, sa };
      }
      if (!aday) return;

      const oneri: Partial<Record<DalAd, Sinif>> = {};
      let not = "";
      const S = dallar.S;
      const sezgi = YASA_DISI.test(
        `${o.baslik} ${sec.metin} ${sec.basariliSonuc?.mesaj ?? ""} ${sec.basariliSonuc?.detay ?? ""}`
      );
      // Önce açık pozitif değerler
      for (const [ad, b] of Object.entries(dallar) as [DalAd, DalBilgi][]) {
        if (b.sa > 0) oneri[ad] = degerdenSinif(b.sa, ad === "F");
      }
      // Sonra örtük kural (yalnız açık değeri olmayan dallar)
      for (const [ad, b] of Object.entries(dallar) as [DalAd, DalBilgi][]) {
        if (oneri[ad] || b.sa > 0) continue;
        if (b.p > 0 && b.a <= -5) {
          if (!sezgi) {
            not = "SUPHE: anahtar kelime yok";
            continue;
          }
          const sinif: Sinif = b.a > -10 && b.p < 20 ? "kucuk" : b.a <= -20 || b.p >= 40 ? "buyuk" : "orta";
          oneri[ad] = sinif;
        }
      }
      // Başarısız dal: başarılı dalda sınıf varsa ve F'nin kendi açık değeri yoksa bir üst sınıf
      if (oneri.S && !oneri.F && (sec.baseBasariSansi ?? 100) < 100 && sec.basarisizSonuc) {
        oneri.F = ust(oneri.S);
      }
      if (!aciklarPozitif && !oneri.S && !oneri.F && !oneri.G && !oneri.D && !not) not = "SUPHE";
      void S;
      satirlar.push({
        key: `${o.id}#${i}`,
        dosya: (idDosya.get(o.id) ?? ["?"]).join("|"),
        id: o.id,
        i,
        baslik: o.baslik,
        metin: sec.metin,
        bs: sec.baseBasariSansi ?? 100,
        dallar,
        oneri,
        not,
      });
    });
  }
  return satirlar;
}

// ---------------------------------------------------------------------------
// Uygulama (TS AST ile konumlandırıp metin düzenlemesi)
// ---------------------------------------------------------------------------
interface Duzenleme {
  start: number;
  end: number;
  text: string;
}

function propAdi(p: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(p) && !ts.isShorthandPropertyAssignment(p)) return null;
  const n = p.name;
  if (ts.isIdentifier(n) || ts.isStringLiteral(n)) return n.text;
  return null;
}
function propGetir(obj: ts.ObjectLiteralExpression, ad: string): ts.PropertyAssignment | undefined {
  return obj.properties.find((p) => propAdi(p) === ad && ts.isPropertyAssignment(p)) as ts.PropertyAssignment | undefined;
}

function dalNesnesiBul(
  src: ts.SourceFile,
  olayId: string,
  secIdx: number,
  dal: DalAd
): ts.ObjectLiteralExpression | null {
  let bulunan: ts.ObjectLiteralExpression | null = null;
  const gez = (n: ts.Node) => {
    if (bulunan) return;
    if (ts.isObjectLiteralExpression(n)) {
      const idP = propGetir(n, "id");
      if (idP && ts.isStringLiteralLike(idP.initializer) && idP.initializer.text === olayId) {
        const secP = propGetir(n, "secenekler");
        if (secP && ts.isArrayLiteralExpression(secP.initializer)) {
          const el = secP.initializer.elements[secIdx];
          if (el && ts.isObjectLiteralExpression(el)) {
            let hedef: ts.ObjectLiteralExpression | undefined = el;
            if (dal === "G" || dal === "D") {
              const ot = propGetir(el, "onTepki");
              hedef = ot && ts.isObjectLiteralExpression(ot.initializer) ? ot.initializer : undefined;
            }
            if (hedef) {
              const d = propGetir(hedef, DAL_ALAN[dal]);
              if (d && ts.isObjectLiteralExpression(d.initializer)) bulunan = d.initializer;
            }
          }
          return;
        }
      }
    }
    ts.forEachChild(n, gez);
  };
  gez(src);
  return bulunan;
}

function duzenlemeUret(
  metin: string,
  obj: ts.ObjectLiteralExpression,
  sinif: Sinif | null
): Duzenleme[] {
  const eds: Duzenleme[] = [];
  // 1) açık pozitif suc_artis'i sil
  const sa = propGetir(obj, "suc_artis");
  if (sa && ts.isNumericLiteral(sa.initializer) && Number(sa.initializer.text) > 0) {
    let s = sa.getStart();
    let e = sa.getEnd();
    if (metin[e] === ",") e++;
    let ls = s;
    while (ls > 0 && (metin[ls - 1] === " " || metin[ls - 1] === "\t")) ls--;
    if (metin[ls - 1] === "\n" && (metin[e] === "\n" || metin[e] === "\r")) {
      s = ls;
      e = metin[e] === "\r" ? e + 2 : e + 1;
    } else {
      while (metin[e] === " ") e++;
    }
    eds.push({ start: s, end: e, text: "" });
  }
  // 2) suc_sinifi ekle (zaten varsa değiştirme). "kumar" = sınıf DEĞİL, sabit +1 (suc_artis: 1).
  const yazilacak = sinif === "kumar" ? "suc_artis: 1" : sinif ? `suc_sinifi: "${sinif}"` : null;
  if (yazilacak && !propGetir(obj, "suc_sinifi")) {
    const acilis = obj.getStart() + 1;
    const ilk = obj.properties[0];
    const cokSatir = ilk && metin.slice(acilis, ilk.getStart()).includes("\n");
    if (cokSatir) {
      const satirBasi = metin.lastIndexOf("\n", ilk.getStart()) + 1;
      const girinti = metin.slice(satirBasi, ilk.getStart());
      eds.push({ start: acilis, end: acilis, text: `\n${girinti}${yazilacak},` });
    } else {
      eds.push({ start: acilis, end: acilis, text: ` ${yazilacak},` });
    }
  }
  return eds;
}

function uygula(duzeltmeDosyasi: string, yaz: boolean) {
  const duz: Record<string, "none" | Partial<Record<DalAd, Sinif>>> = fs.existsSync(duzeltmeDosyasi)
    ? JSON.parse(fs.readFileSync(duzeltmeDosyasi, "utf8"))
    : {};
  const satirlar = rapor();
  const dosyaDuzenleri = new Map<string, Duzenleme[]>();
  const konumlanamayan: string[] = [];
  const sayac: Record<string, number> = { kumar: 0, kucuk: 0, orta: 0, buyuk: 0, agir: 0, none: 0, silinenAcik: 0 };

  for (const s of satirlar) {
    const dosyalar = idDosya.get(s.id) ?? [];
    if (dosyalar.length !== 1) {
      konumlanamayan.push(`${s.key} (dosya: ${dosyalar.join("|") || "yok"})`);
      continue;
    }
    const d = duz[s.key];
    let final: Partial<Record<DalAd, Sinif>>;
    if (d === "none") final = {};
    else if (d) final = d;
    else final = s.oneri;

    const dosya = dosyalar[0];
    const yol = path.join(OLAY_DIR, dosya);
    const metin = fs.readFileSync(yol, "utf8");
    const src = ts.createSourceFile(yol, metin, ts.ScriptTarget.Latest, true);

    for (const ad of ["S", "F", "G", "D"] as DalAd[]) {
      const bilgi = s.dallar[ad];
      const sinif = final[ad] ?? null;
      const acikPozitifVar = !!bilgi && bilgi.sa > 0;
      if (!sinif && !acikPozitifVar) continue;
      const obj = dalNesnesiBul(src, s.id, s.i, ad);
      if (!obj) {
        konumlanamayan.push(`${s.key}/${ad} (AST'de bulunamadı — üretilmiş olay?)`);
        continue;
      }
      const eds = duzenlemeUret(metin, obj, sinif);
      const arr = dosyaDuzenleri.get(dosya) ?? [];
      arr.push(...eds);
      dosyaDuzenleri.set(dosya, arr);
      if (sinif) sayac[sinif]++;
      else sayac.none++;
      if (acikPozitifVar) sayac.silinenAcik++;
    }
  }

  for (const [dosya, eds] of dosyaDuzenleri) {
    const yol = path.join(OLAY_DIR, dosya);
    let metin = fs.readFileSync(yol, "utf8");
    // Aynı konumdaki düzenlemelerde: önce silme (start küçük), sonra ekleme — sondan başa uygula.
    eds.sort((a, b) => b.start - a.start || b.end - a.end);
    for (const e of eds) metin = metin.slice(0, e.start) + e.text + metin.slice(e.end);
    if (yaz) fs.writeFileSync(yol, metin, "utf8");
  }

  console.log(yaz ? "YAZILDI" : "KURU ÇALIŞTIRMA (dosyalara yazılmadı)");
  console.log("dallar:", sayac);
  console.log("dosya sayısı:", dosyaDuzenleri.size);
  if (konumlanamayan.length) {
    console.log(`\nKONUMLANAMAYAN (${konumlanamayan.length}) — elle düzenlenecek:`);
    for (const k of konumlanamayan) console.log(" -", k);
  }
}

const [komut, dosya, ...rest] = process.argv.slice(2);
if (komut === "rapor") {
  const satirlar = rapor();
  fs.writeFileSync(dosya, JSON.stringify(satirlar, null, 1), "utf8");
  const suphe = satirlar.filter((s) => s.not).length;
  console.log(`aday şık: ${satirlar.length}, şüpheli (anahtar kelime yok): ${suphe}`);
} else if (komut === "uygula") {
  uygula(dosya, rest.includes("--yaz"));
} else {
  console.log("Kullanım: rapor <cikti.json> | uygula <duzeltmeler.json> [--yaz]");
}
