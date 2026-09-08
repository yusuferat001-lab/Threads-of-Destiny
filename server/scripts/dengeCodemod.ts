/**
 * GEÇİCİ codemod — olay seçeneklerindeki denge sorunlarını mekanik olarak düzeltir.
 * Kullanıcı isteği: "bazı olaylarda bir şık aşırı mantıklı diğerine göre, ya da bir
 * şıkkın etkisi yok. Şıkları birbirine yakınlaştır: parası olan şık mutluluk/ahlak
 * da götürsün, ya da zayıf şıkka ahlak/mutluluk ekle."
 *
 * Yalnız sayısal stat deltaları (para/un/ahlak/saglik/mutluluk) değişir; mesaj/ipucu
 * metinleri ve .en.ts aynaları elle bırakılır (mekanik tur, kullanıcı onayı).
 *
 * Kurallar:
 *   A INERT        — iki dalı da boş şık → küçük gerçek takas ver.
 *   B ZAYIF_BASARI — başarı dalı ~etkisiz → küçük garanti kazanç + başarısız dala sızı.
 *   C BEDAVA_PARA  — para veren şıkta takas yok → ya kazancı vergile ya kaybı acıt.
 *   D EZICI        — bir şık diğerini beklenen değerde eziyor → A'yı hafif kıs, B'yi hafif güçlendir.
 *
 * Guardrail (tests/mutlulukDengesi.test.ts): net mutluluk < 0, pozitif oran < %50,
 * tekil mutluluk ödülü <= +12. Bu yüzden buff'larda ASLA pozitif mutluluk eklenmez;
 * mutluluk yalnız aşağı yönlü oynatılır.
 *
 * Kullanım:  npx tsx scripts/dengeCodemod.ts           (dry-run, özet + örnek diff)
 *            npx tsx scripts/dengeCodemod.ts --apply    (dosyalara yaz)
 */
import { OLAY_BANKASI } from "../src/data/olaylar/index";
import type { OlaySecenegi, OlayTanimi } from "../src/data/olaylar/types";
import type { SonucEtkisi } from "../src/types";
import * as fs from "fs";
import * as path from "path";

const APPLY = process.argv.includes("--apply");
const OLAY_DIR = path.join(__dirname, "..", "src", "data", "olaylar");
const HARIC_DOSYA = new Set(["komikOlumler.ts", "saglikToparlanma.ts"]); // kasıtlı ayrı dengede

const STAT = ["para", "un", "ahlak", "saglik", "mutluluk"] as const;
type Stat = (typeof STAT)[number];

const BAYRAKLAR: (keyof SonucEtkisi)[] = [
  "yeni_meslek", "olum", "olum_sansi", "etiket_ekle", "etiket_sil", "durum_ekle", "durum_sil",
  "ulke_etkisi", "maas_carpani", "dost_puani", "rakip_puani", "es_ata", "es_puani", "es_kaybet",
  "cocuk_ekle", "cocuk_kaybet", "zorunlu_sonraki", "ekip_ekle", "ekip_kaybi", "ekip_sil",
  "hizip_ata", "ordu_techizat_artis", "ticaret_sermaye_artis", "nufuz_artis", "suc_artis",
  "suc_seviyesi_ayarla", "para_sifirla", "un_sifirla", "para_yuzde_kaybet", "yerlesim_zorla",
  "mulk_kaybet", "evcil_hayvan_edin", "evcil_hayvan_kaybet", "unvan_kazan", "kriz_baslat",
  "efsanevi_olum", "sehir_yonetim_artis", "kariyer_puani_artis", "hapis_ceza_artis", "veba_koruma",
];

const absSum = (e: SonucEtkisi) => STAT.reduce((a, s) => a + Math.abs(e[s] ?? 0), 0);
const hasFlag = (e: SonucEtkisi) =>
  BAYRAKLAR.some((k) => {
    const v = e[k as keyof SonucEtkisi];
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

// ---- id -> dosya ----
const DOSYALAR = fs.readdirSync(OLAY_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");
const idDosya = new Map<string, string>();
for (const f of DOSYALAR) {
  const txt = fs.readFileSync(path.join(OLAY_DIR, f), "utf8");
  for (const m of txt.matchAll(/^ {4}id: ["'`]([^"'`]+)["'`]/gm)) if (!idDosya.has(m[1])) idDosya.set(m[1], f);
}

// ---- patch biriktirme ----
type Key = string; // `${olayId}|${tokenIndex}|${ok|no}`
const deltas = new Map<Key, Partial<Record<Stat, number>>>();
const sets = new Map<Key, Partial<Record<Stat, number>>>();
const dokunulan = new Set<string>(); // `${olayId}|${tokenIndex}` — bir şıkka bir kez A/B uygula
const k = (id: string, ti: number, d: "ok" | "no"): Key => `${id}|${ti}|${d}`;
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
const clampR = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(v)));

const sayac = { A: 0, B: 0, C: 0, D: 0 };

for (const o of OLAY_BANKASI) {
  const dosya = idDosya.get(o.id);
  if (!dosya || HARIC_DOSYA.has(dosya)) continue;

  // non-onTepki şıklar + token index
  const toks: { sec: OlaySecenegi; ti: number; gated: boolean }[] = [];
  let ti = 0;
  for (const sec of o.secenekler) {
    if (sec.onTepki) continue;
    toks.push({ sec, ti, gated: !!(sec.gerekliKisilik || sec.gerekliEksen) });
    ti++;
  }
  const aday = toks.filter((t) => !t.gated && !t.sec.ekipKalitesiZarBelirler);
  if (aday.length < 2) continue;

  const dubious = (s: OlaySecenegi) =>
    (s.basariliSonuc.ahlak ?? 0) < 0 || (s.basariliSonuc.suc_artis ?? 0) > 0 || (s.basariliSonuc.para ?? 0) >= 12;
  // "kirli" şık: ahlaki taviz / suç. Bunlara pozitif ahlak veya bedava para EKLEME.
  const kirli = (s: OlaySecenegi) => (s.basariliSonuc.ahlak ?? 0) < 0 || (s.basariliSonuc.suc_artis ?? 0) > 0;
  const enAktif = [...aday].sort((x, y) => {
    const sx = STAT.reduce((a, s) => a + ev(x.sec)[s], 0);
    const sy = STAT.reduce((a, s) => a + ev(y.sec)[s], 0);
    return sy - sx;
  })[0];

  // ---- A: INERT ----
  for (const { sec, ti } of aday) {
    if (dokunulan.has(`${o.id}|${ti}`)) continue;
    if (absSum(sec.basariliSonuc) === 0 && absSum(sec.basarisizSonuc) === 0 && !hasFlag(sec.basariliSonuc) && !hasFlag(sec.basarisizSonuc)) {
      const dub = enAktif.sec !== sec && dubious(enAktif.sec);
      if (dub && !kirli(sec)) { addDelta(k(o.id, ti, "ok"), "ahlak", 3); } else { addDelta(k(o.id, ti, "ok"), "saglik", 2); }
      addDelta(k(o.id, ti, "ok"), "mutluluk", -2);
      addDelta(k(o.id, ti, "no"), "mutluluk", -2);
      dokunulan.add(`${o.id}|${ti}`);
      sayac.A++;
    }
  }

  // ---- B: ZAYIF_BASARI ----
  for (const { sec, ti } of aday) {
    if (dokunulan.has(`${o.id}|${ti}`)) continue;
    if (absSum(sec.basariliSonuc) <= 2 && !hasFlag(sec.basariliSonuc) && (sec.baseBasariSansi ?? 100) < 100 && !kirli(sec)) {
      const dub = enAktif.sec !== sec && dubious(enAktif.sec);
      if (dub) { addDelta(k(o.id, ti, "ok"), "ahlak", 3); }
      else { addDelta(k(o.id, ti, "ok"), "saglik", 2); addDelta(k(o.id, ti, "ok"), "ahlak", 1); }
      addDelta(k(o.id, ti, "ok"), "mutluluk", -1);
      if (absSum(sec.basarisizSonuc) === 0 && !hasFlag(sec.basarisizSonuc)) addDelta(k(o.id, ti, "no"), "mutluluk", -2);
      dokunulan.add(`${o.id}|${ti}`);
      sayac.B++;
    }
  }

  // ---- C: BEDAVA_PARA ----
  for (const { sec, ti } of aday) {
    const a = sec.basariliSonuc;
    const para = a.para ?? 0;
    if (para < 12) continue;
    if ((a.ahlak ?? 0) < 0 || (a.mutluluk ?? 0) < 0 || (a.saglik ?? 0) < 0 || (a.un ?? 0) < 0) continue;
    if (olumRiski(sec)) continue;
    const e = ev(sec);
    const negToplam = STAT.reduce((s, f) => s + Math.min(0, e[f]), 0);
    if (negToplam <= -6) continue; // zaten gerçek bir takası var
    const chance = sec.baseBasariSansi ?? 100;
    if (chance >= 92) {
      if ((a.ahlak ?? 0) > -5) addDelta(k(o.id, ti, "ok"), "ahlak", -3);
      addDelta(k(o.id, ti, "ok"), "mutluluk", -clampR(para * 0.15, 2, 7));
    } else {
      // başarısızlığı acıt: hayal kırıklığı + kaybı gerçek yap. Ahlak'a dokunma —
      // sıradan bir ticaret/yatırım batması ahlaki bir kusur değil.
      addDelta(k(o.id, ti, "no"), "mutluluk", -4);
      const nb = sec.basarisizSonuc;
      if (Math.abs(nb.para ?? 0) < 5 && !nb.para_sifirla && !nb.para_yuzde_kaybet)
        setAbs(k(o.id, ti, "no"), "para", -Math.abs(para));
    }
    sayac.C++;
  }

  // ---- D: EZICI ----
  for (let i = 0; i < aday.length; i++) {
    for (let j = 0; j < aday.length; j++) {
      if (i === j) continue;
      const A = aday[i], B = aday[j];
      if (A.sec.maliyet || A.sec.gerekliEtiketler || A.sec.minUn || A.sec.minAhlak) continue;
      const va = ev(A.sec), vb = ev(B.sec);
      let hepsiGE = true, buyuk = false;
      for (const s of STAT) { if (va[s] < vb[s] - 0.5) hepsiGE = false; if (va[s] > vb[s] + 4) buyuk = true; }
      if (!hepsiGE || !buyuk) continue;
      if (olumRiski(A.sec) && !olumRiski(B.sec)) continue;
      if ((A.sec.baseBasariSansi ?? 100) < (B.sec.baseBasariSansi ?? 100) - 5) continue;

      // A'yı kıs: YALNIZ maddi kazancı (para/un) ve pozitif mutluluğu tırpanla.
      // Ahlak/sağlığı ASLA düşürme — "reddet / vicdanını koru" gibi erdemli şıkkı
      // parite uğruna kötüye çevirmek anlamsız olur (kullanıcı: tempting şık bedel ödesin).
      const gaps = STAT.map((s) => ({ s, g: va[s] - vb[s], aOk: A.sec.basariliSonuc[s] ?? 0 }))
        .filter((x) => x.g > 4 && x.aOk > 0 && (x.s === "para" || x.s === "un" || x.s === "mutluluk"))
        .sort((x, y) => y.g - x.g);
      if (gaps.length) {
        const t = gaps[0];
        let kis = -Math.round(t.g * 0.4);
        if (t.s === "para") kis = -Math.min(Math.round(t.g * 0.4), Math.round(t.aOk * 0.5));
        if (t.s === "mutluluk") kis = -Math.min(Math.round(t.g * 0.4), t.aOk); // pozitifi 0'a kadar
        addDelta(k(o.id, A.ti, "ok"), t.s, kis);
      }
      // B'yi güçlendir: en zayıf 2 eksende A'ya doğru ~%35 (mutluluk hariç).
      // "Kirli" B'yi (ahlaki taviz/suç) ASLA güçlendirme — para/ahlak eklemek onu
      // daha cazip yapar, kullanıcı isteğinin tersi. O durumda yalnız A kısılır.
      if (!kirli(B.sec)) {
        const buffAx = STAT.map((s) => ({ s, g: va[s] - vb[s] }))
          .filter((x) => x.g > 4 && x.s !== "mutluluk" && !(x.s === "ahlak" && (B.sec.basariliSonuc.ahlak ?? 0) < 0))
          .sort((x, y) => y.g - x.g)
          .slice(0, 2);
        for (const bx of buffAx) addDelta(k(o.id, B.ti, "ok"), bx.s, clampR(bx.g * 0.35, 1, 6));
      }
      sayac.D++;
    }
  }
}

// ---- kaynak düzenleme ----
function blockRange(text: string, open: number): [number, number] {
  // open = '{' indeksi
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

function editResult(text: string, evId: string, tokenIndex: number, which: "ok" | "no", dts: Partial<Record<Stat, number>>, sts: Partial<Record<Stat, number>>): string {
  const idRe = new RegExp(`^ {4}id: ["'\`]${evId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'\`]`, "m");
  const idM = idRe.exec(text);
  if (!idM) throw new Error("id bulunamadı: " + evId);
  const spanStart = idM.index;
  const nextM = /^ {4}id: ["'`]/m.exec(text.slice(spanStart + 10));
  const spanEnd = nextM ? spanStart + 10 + nextM.index : text.length;
  const span = text.slice(spanStart, spanEnd);
  const tok = which === "ok" ? "basariliSonuc" : "basarisizSonuc";
  const re = new RegExp(`${tok}:\\s*\\{`, "g");
  let m: RegExpExecArray | null, count = 0, openRel = -1;
  while ((m = re.exec(span))) { if (count === tokenIndex) { openRel = m.index + m[0].length - 1; break; } count++; }
  if (openRel < 0) throw new Error(`${evId} ${tok} #${tokenIndex} yok`);
  const openAbs = spanStart + openRel;
  const [bs, be] = blockRange(text, openAbs);
  let inner = text.slice(bs + 1, be);

  const propIndentM = inner.match(/\n( +)\S/);
  const propIndent = propIndentM ? propIndentM[1] : "        ";
  const msgM = inner.match(/\n *(mesaj|detay):/);
  const headEnd = msgM ? msgM.index! : inner.length;
  const head = inner.slice(0, headEnd);
  const tail = inner.slice(headEnd);

  const target = new Map<Stat, { mode: "set" | "delta"; v: number }>();
  for (const [f, v] of Object.entries(dts)) if (v) target.set(f as Stat, { mode: "delta", v });
  for (const [f, v] of Object.entries(sts)) target.set(f as Stat, { mode: "set", v: v as number });

  let newHead = head;
  const toInsert: string[] = [];
  for (const [f, spec] of target) {
    const fre = new RegExp(`(^|[^_\\w])(${f}): *(-?\\d+)`, "m");
    const fm = fre.exec(newHead);
    let val: number;
    if (fm) val = spec.mode === "set" ? spec.v : parseInt(fm[3], 10) + spec.v;
    else val = spec.mode === "set" ? spec.v : spec.v;
    // guardrail: tekil mutluluk <= 12; makul aralık
    if (f === "mutluluk") val = Math.max(-20, Math.min(12, val));
    else if (f !== "para") val = Math.max(-30, Math.min(45, val));
    if (fm) {
      if (val === 0) {
        // satırı tamamen kaldır
        newHead = newHead.replace(new RegExp(`\\n *${f}: *-?\\d+,?`), "");
      } else {
        newHead = newHead.replace(fre, `$1$2: ${val}`);
      }
    } else if (val !== 0) {
      toInsert.push(`${propIndent}${f}: ${val},`);
    }
  }
  // NOT: bu fonksiyon her zaman saf LF metinle çağrılır (CRLF dönüşü yazma anında).
  let rebuiltInner = newHead + tail;
  if (toInsert.length) {
    rebuiltInner = rebuiltInner.replace(/^\n/, "");
    rebuiltInner = toInsert.map((l) => "\n" + l).join("") + "\n" + rebuiltInner;
  }
  // ekleme kaynaklı boş satırları sadeleştir
  rebuiltInner = rebuiltInner.replace(/\n[ \t]*\n/g, "\n");
  return text.slice(0, bs + 1) + rebuiltInner + text.slice(be);
}

// patch'leri dosyaya göre grupla, olay konumuna göre TERSTEN uygula
type PatchRec = { evId: string; ti: number; which: "ok" | "no"; dts: Partial<Record<Stat, number>>; sts: Partial<Record<Stat, number>>; dosya: string };
const recs: PatchRec[] = [];
const keys = new Set<Key>([...deltas.keys(), ...sets.keys()]);
for (const key of keys) {
  const [evId, tiS, which] = key.split("|");
  const dosya = idDosya.get(evId)!;
  recs.push({ evId, ti: +tiS, which: which as "ok" | "no", dts: deltas.get(key) ?? {}, sts: sets.get(key) ?? {}, dosya });
}

const byFile = new Map<string, PatchRec[]>();
for (const r of recs) (byFile.get(r.dosya) ?? byFile.set(r.dosya, []).get(r.dosya)!).push(r);

console.log("=== Kural sayaçları ===", sayac);
console.log("Toplam düzenlenecek sonuç bloğu:", recs.length, "(", byFile.size, "dosya )");

let ornek = 0;
for (const [dosya, list] of byFile) {
  const fp = path.join(OLAY_DIR, dosya);
  const raw = fs.readFileSync(fp, "utf8");
  const crlf = raw.includes("\r\n");
  let text = raw.replace(/\r\n/g, "\n"); // tüm işlemler saf LF; yazarken geri çevrilir
  // olay konumuna göre sırala (tersten uygula)
  list.sort((a, b) => text.indexOf(`id: "${b.evId}"`) - text.indexOf(`id: "${a.evId}"`) || b.ti - a.ti || (a.which === "no" ? -1 : 1));
  for (const r of list) {
    try {
      const before = text;
      text = editResult(text, r.evId, r.ti, r.which, r.dts, r.sts);
      if (!APPLY && ornek < 12 && before !== text) {
        ornek++;
        console.log(`\n--- ${dosya} :: ${r.evId} #${r.ti} ${r.which}  Δ${JSON.stringify({ ...r.dts, ...r.sts })}`);
      }
    } catch (e) {
      console.warn("ATLA", dosya, r.evId, r.ti, r.which, (e as Error).message);
    }
  }
  if (APPLY) fs.writeFileSync(fp, crlf ? text.replace(/\n/g, "\r\n") : text);
}
console.log(APPLY ? "\nYAZILDI." : "\n(dry-run — --apply ile yaz)");
