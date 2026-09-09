/**
 * GEÇİCİ codemod #2 — "para şıkkı huzuru/itibarı da götürsün".
 *
 * Kullanıcı isteği (2026-09): "hâlâ bazı olaylarda şıklar çok dengesiz: bir şık
 * yüklü para, diğer şıkta ciddi bir eksi yok. Tüm olayların şıkları birbirine
 * yakın olsun; PARA seçersen mutluluk/ahlak/şöhret gibi şeyler CİDDİ düşsün."
 *
 * dengeCodemod.ts'in BEDAVA_PARA kuralı çok yumuşaktı (yalnız yüksek şanslıya
 * ahlak -3). Bu tur, "bedava para" imzalı her BAŞARILI dala tutarlı bir ruhsal
 * bedel biner — para hâlâ pozitif kalır ama artık "açgözlü" şık huzurdan/
 * itibardan ödün verdirir.
 *
 * Hedef seçim = başarılı dalda para >= 12, ölüm riski yok, telafi edici bayrak
 * (meslek/etiket/ittifak) yok, beklenen-değerde ciddi bir negatif takas yok
 * (neg toplam > -6) ve net para (para - maliyet) hâlâ cazip (>= 10).
 *
 * Uygulanan bedel (yalnız BAŞARILI dal, net = para - maliyet):
 *   mutluluk  -= clamp(round(net*0.40), 4, 11)      // her zaman — kovalamacanın yorgunluğu
 *   un(şöhret): un>0 ise yarıya indir (para uğruna yüksek yoldan vazgeçtin);
 *               aksi halde -= clamp(round(net*0.14), 2, 5)
 *   ahlak     : ahlak>0 ise yarıya indir. Ek ahlak CEZASI yalnız "kirli" imza varsa
 *               (mevcut ahlak<0 / suc_artis>0 / şüpheli metin / baseBasariSansi<55):
 *               -= clamp(round(net*0.20), 3, 8). Dürüst/hırslı ama temiz bir şıkkı
 *               parite uğruna ahlaksız göstermeyiz — yalnız huzur + şöhret bedeli biner.
 *
 * HARİÇ: komikOlumler.ts, saglikToparlanma.ts (kasıtlı ayrı denge).
 * Guardrail (tests/mutlulukDengesi.test.ts): net mutluluk < 0, pozitif oran < %50,
 * tekil mutluluk <= +12 — hepsi aşağı yönlü oynatıldığı için korunur.
 *
 * Kullanım:  npx tsx scripts/dengeCodemod2.ts           (dry-run)
 *            npx tsx scripts/dengeCodemod2.ts --apply    (yaz)
 */
import { OLAY_BANKASI } from "../src/data/olaylar/index";
import type { OlaySecenegi } from "../src/data/olaylar/types";
import type { SonucEtkisi } from "../src/types";
import * as fs from "fs";
import * as path from "path";

const APPLY = process.argv.includes("--apply");
const OLAY_DIR = path.join(__dirname, "..", "src", "data", "olaylar");
const HARIC = new Set(["komikOlumler.ts", "saglikToparlanma.ts"]);
const STAT = ["para", "un", "ahlak", "saglik", "mutluluk"] as const;
type Stat = (typeof STAT)[number];

const BAYRAKLAR: (keyof SonucEtkisi)[] = [
  "yeni_meslek", "olum", "olum_sansi", "etiket_ekle", "etiket_sil", "durum_ekle",
  "ulke_etkisi", "maas_carpani", "es_ata", "es_kaybet", "cocuk_ekle", "cocuk_kaybet",
  "zorunlu_sonraki", "ekip_ekle", "ekip_kaybi", "ekip_sil", "hizip_ata",
  "suc_seviyesi_ayarla", "mulk_kaybet", "unvan_kazan", "kriz_baslat", "efsanevi_olum",
  "sehir_yonetim_artis",
];
const hasFlag = (e: SonucEtkisi) =>
  BAYRAKLAR.some((k) => {
    const v = e[k] as unknown;
    if (v === undefined || v === null || v === false) return false;
    if (Array.isArray(v)) return v.length > 0;
    return true;
  });
const vec = (e: SonucEtkisi) => Object.fromEntries(STAT.map((s) => [s, e[s] ?? 0])) as Record<Stat, number>;
function ev(sec: OlaySecenegi): Record<Stat, number> {
  const p = Math.max(0, Math.min(100, sec.baseBasariSansi ?? 100)) / 100;
  const a = vec(sec.basariliSonuc), b = vec(sec.basarisizSonuc);
  return Object.fromEntries(STAT.map((s) => [s, p * a[s] + (1 - p) * b[s]])) as Record<Stat, number>;
}
const olumRiski = (sec: OlaySecenegi) =>
  [sec.basariliSonuc, sec.basarisizSonuc].some((e) => e.olum || (e.olum_sansi ?? 0) > 0);
const clampR = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(v)));

// ---- id -> dosya ----
const DOSYALAR = fs.readdirSync(OLAY_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");
const idDosya = new Map<string, string>();
for (const f of DOSYALAR) {
  const txt = fs.readFileSync(path.join(OLAY_DIR, f), "utf8");
  for (const m of txt.matchAll(/^ {4}id: ["'`]([^"'`]+)["'`]/gm)) if (!idDosya.has(m[1])) idDosya.set(m[1], f);
}

type Key = string;
const deltas = new Map<Key, Partial<Record<Stat, number>>>();
const sets = new Map<Key, Partial<Record<Stat, number>>>();
const k = (id: string, ti: number): Key => `${id}|${ti}`;
function addDelta(key: Key, f: Stat, v: number) {
  if (!v) return;
  const cur = deltas.get(key) ?? {};
  cur[f] = (cur[f] ?? 0) + v;
  deltas.set(key, cur);
}
function setAbs(key: Key, f: Stat, v: number) {
  const cur = sets.get(key) ?? {};
  cur[f] = v;
  sets.set(key, cur);
}

let hedef = 0;
for (const o of OLAY_BANKASI) {
  const dosya = idDosya.get(o.id);
  if (!dosya || HARIC.has(dosya)) continue;
  let ti = -1;
  for (const sec of o.secenekler) {
    if (sec.onTepki) continue;
    ti++;
    if (sec.gerekliKisilik || sec.gerekliEksen || sec.ekipKalitesiZarBelirler) continue;
    const a = sec.basariliSonuc;
    const para = a.para ?? 0;
    if (para < 12) continue;
    if (olumRiski(sec)) continue;
    if (hasFlag(a)) continue;
    const m = a.mutluluk ?? 0, ah = a.ahlak ?? 0, u = a.un ?? 0;
    const negSum = Math.min(0, m) + Math.min(0, ah) + Math.min(0, u);
    if (negSum <= -6) continue; // zaten gerçek bir ruhsal takası var
    const maliyet = sec.maliyet ?? 0;
    const net = para - maliyet;
    if (net < 10) continue;

    const key = k(o.id, ti);
    hedef++;

    // mutluluk — her zaman aşağı
    addDelta(key, "mutluluk", -clampR(net * 0.4, 4, 11));

    // un (şöhret) — para uğruna yüksek yoldan vazgeçtin
    if (u > 0) setAbs(key, "un", Math.round(u * 0.5));
    else addDelta(key, "un", -clampR(net * 0.14, 2, 5));

    // ahlak — pozitif "erdem parıltısını" yarıla; ek ceza YALNIZ veride zaten
    // kirli imza varsa (ahlak<0 ya da suc_artis>0). Metin/şans tahminiyle temiz bir
    // hırs şıkkını ahlaksız göstermeyiz.
    if (ah > 0) setAbs(key, "ahlak", Math.floor(ah * 0.5));
    else if (ah < 0 || (a.suc_artis ?? 0) > 0) addDelta(key, "ahlak", -clampR(net * 0.2, 3, 8));
  }
}

// ---- kaynak düzenleme (dengeCodemod.ts'ten) ----
function blockRange(text: string, open: number): [number, number] {
  let depth = 0, i = open, q: string | null = null;
  for (; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === "\\") { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === "`") { q = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return [open, i]; }
  }
  throw new Error("brace eşleşmedi @" + open);
}
function editSuccess(text: string, evId: string, tokenIndex: number, dts: Partial<Record<Stat, number>>, sts: Partial<Record<Stat, number>>): string {
  const idRe = new RegExp(`^ {4}id: ["'\`]${evId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'\`]`, "m");
  const idM = idRe.exec(text);
  if (!idM) throw new Error("id yok: " + evId);
  const spanStart = idM.index;
  const nextM = /^ {4}id: ["'`]/m.exec(text.slice(spanStart + 10));
  const spanEnd = nextM ? spanStart + 10 + nextM.index : text.length;
  const span = text.slice(spanStart, spanEnd);
  const re = /basariliSonuc:\s*\{/g;
  let m: RegExpExecArray | null, count = 0, openRel = -1;
  while ((m = re.exec(span))) { if (count === tokenIndex) { openRel = m.index + m[0].length - 1; break; } count++; }
  if (openRel < 0) throw new Error(`${evId} basariliSonuc #${tokenIndex} yok`);
  const openAbs = spanStart + openRel;
  const [bs, be] = blockRange(text, openAbs);
  let inner = text.slice(bs + 1, be);
  const propIndentM = inner.match(/\n( +)\S/);
  const propIndent = propIndentM ? propIndentM[1] : "        ";
  const msgM = inner.match(/\n *(mesaj|detay):/);
  const headEnd = msgM ? msgM.index! : inner.length;
  let head = inner.slice(0, headEnd);
  const tail = inner.slice(headEnd);

  const target = new Map<Stat, { mode: "set" | "delta"; v: number }>();
  for (const [f, v] of Object.entries(dts)) if (v) target.set(f as Stat, { mode: "delta", v });
  for (const [f, v] of Object.entries(sts)) target.set(f as Stat, { mode: "set", v: v as number });

  const toInsert: string[] = [];
  for (const [f, spec] of target) {
    const fre = new RegExp(`(^|[^_\\w])(${f}): *(-?\\d+)`, "m");
    const fm = fre.exec(head);
    let val = fm ? (spec.mode === "set" ? spec.v : parseInt(fm[3], 10) + spec.v) : spec.v;
    if (f === "mutluluk") val = Math.max(-20, Math.min(12, val));
    else if (f !== "para") val = Math.max(-30, Math.min(45, val));
    if (fm) {
      if (val === 0) head = head.replace(new RegExp(`\\n *${f}: *-?\\d+,?`), "");
      else head = head.replace(fre, `$1$2: ${val}`);
    } else if (val !== 0) {
      toInsert.push(`${propIndent}${f}: ${val},`);
    }
  }
  let rebuilt = head + tail;
  if (toInsert.length) {
    rebuilt = rebuilt.replace(/^\n/, "");
    rebuilt = toInsert.map((l) => "\n" + l).join("") + "\n" + rebuilt;
  }
  rebuilt = rebuilt.replace(/\n[ \t]*\n/g, "\n");
  return text.slice(0, bs + 1) + rebuilt + text.slice(be);
}

type Rec = { evId: string; ti: number; dts: Partial<Record<Stat, number>>; sts: Partial<Record<Stat, number>>; dosya: string };
const recs: Rec[] = [];
for (const key of new Set<Key>([...deltas.keys(), ...sets.keys()])) {
  const [evId, tiS] = key.split("|");
  recs.push({ evId, ti: +tiS, dts: deltas.get(key) ?? {}, sts: sets.get(key) ?? {}, dosya: idDosya.get(evId)! });
}
const byFile = new Map<string, Rec[]>();
for (const r of recs) (byFile.get(r.dosya) ?? byFile.set(r.dosya, []).get(r.dosya)!).push(r);

console.log("Hedef seçim:", hedef, "· düzenlenecek blok:", recs.length, "·", byFile.size, "dosya");
let ornek = 0;
for (const [dosya, list] of byFile) {
  const fp = path.join(OLAY_DIR, dosya);
  const raw = fs.readFileSync(fp, "utf8");
  const crlf = raw.includes("\r\n");
  let text = raw.replace(/\r\n/g, "\n");
  list.sort((a, b) => text.indexOf(`id: "${b.evId}"`) - text.indexOf(`id: "${a.evId}"`) || b.ti - a.ti);
  for (const r of list) {
    try {
      const before = text;
      text = editSuccess(text, r.evId, r.ti, r.dts, r.sts);
      if (!APPLY && ornek < 16 && before !== text) {
        ornek++;
        console.log(`  ${dosya} :: ${r.evId} #${r.ti}  Δ${JSON.stringify({ ...r.dts, ...r.sts })}`);
      }
    } catch (e) {
      console.warn("ATLA", dosya, r.evId, r.ti, (e as Error).message);
    }
  }
  if (APPLY) fs.writeFileSync(fp, crlf ? text.replace(/\n/g, "\r\n") : text);
}
console.log(APPLY ? "\nYAZILDI." : "\n(dry-run — --apply ile yaz)");
