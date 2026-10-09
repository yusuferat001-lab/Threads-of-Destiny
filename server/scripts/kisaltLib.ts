/**
 * GEÇİCİ codemod kütüphanesi — olay metinlerini toplu kısaltma (kullanıcı isteği:
 * "olayların kendisini, şıkları ve sonuç cümlelerini kısalt").
 *
 * Kaynak dosyalardaki (data/olaylar/X.ts ve i18n/olaylar/X.en.ts) METİN literal'lerini
 * TypeScript AST'iyle bulur; sayısal/mantıksal alanlara hiç dokunmaz. TR olay objeleri
 * ile EN ayna objeleri aynı alan adlarını kullandığı için tek bir yürüyüşçü ikisine de
 * yeter.
 *
 * Yol (yol) şeması — düz anahtarlar:
 *   metin                       olay metni
 *   s{i}.metin / s{i}.kilit     şık metni / kilitAciklamasi
 *   s{i}.bs.mesaj|detay         basariliSonuc
 *   s{i}.fs.mesaj|detay         basarisizSonuc
 *   s{i}.ot.metin|gcm|dm        onTepki.metin / geriCekilMetni / devamMetni
 *   s{i}.ot.gcs.mesaj|detay     onTepki.geriCekilSonucu
 *   s{i}.ot.ds.mesaj|detay      onTepki.devamSonucu
 * `baslik` BİLİNÇLİ OLARAK hariç: testler başlıklara bağlı (olay_basligi === "...").
 *
 * typescript@7 JS API'si sunmadığı için client'ın typescript@6'sı kullanılır.
 */
import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ts: any = require(path.join(__dirname, "..", "..", "client", "node_modules", "typescript"));

export const OLAY_DIR = path.join(__dirname, "..", "src", "data", "olaylar");
export const CEVIRI_DIR = path.join(__dirname, "..", "src", "i18n", "olaylar");

export interface Hedef {
  yol: string;
  bas: number;
  bit: number;
  metin: string;
}

export interface OlayHedefleri {
  id: string;
  baslik: string;
  hedefler: Map<string, Hedef>;
  /** Yalnız bilgi (salt-okunur): blok anahtarı → "para+12 saglik-8 ..." özeti. */
  ipucu: Record<string, string>;
}

/** String / basit template literal / "a" + "b" birleşimi → düz metin + kaynak aralığı. */
function literalMetni(node: any): { metin: string; bas: number; bit: number } | null {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return { metin: node.text, bas: node.getStart(), bit: node.getEnd() };
  }
  if (ts.isParenthesizedExpression(node)) return literalMetni(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = literalMetni(node.left);
    const b = literalMetni(node.right);
    if (a && b) return { metin: a.metin + b.metin, bas: node.getStart(), bit: node.getEnd() };
  }
  return null;
}

function ozellikAdi(p: any): string | null {
  if (!p.name) return null;
  if (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) return p.name.text;
  return null;
}

function ozellik(obj: any, ad: string): any | null {
  for (const p of obj.properties) {
    if (ts.isPropertyAssignment(p) && ozellikAdi(p) === ad) return p.initializer;
  }
  return null;
}

function sayi(node: any): number | null {
  if (!node) return null;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
    return -Number(node.operand.text);
  }
  return null;
}

const IPUCU_ALANLARI = ["para", "un", "ahlak", "saglik", "mutluluk", "olum_sansi"];

function sonucIpucu(obj: any): string {
  const parcalar: string[] = [];
  for (const alan of IPUCU_ALANLARI) {
    const v = sayi(ozellik(obj, alan));
    if (v !== null && v !== 0) parcalar.push(`${alan}${v > 0 ? "+" : ""}${v}`);
  }
  const olum = ozellik(obj, "olum");
  if (olum && olum.kind === ts.SyntaxKind.TrueKeyword) parcalar.push("OLUM");
  return parcalar.join(" ");
}

function ekle(h: Map<string, Hedef>, yol: string, node: any | null) {
  const l = literalMetni(node);
  if (l) h.set(yol, { yol, bas: l.bas, bit: l.bit, metin: l.metin });
}

function sonucTopla(h: Map<string, Hedef>, onek: string, obj: any | null) {
  if (!obj || !ts.isObjectLiteralExpression(obj)) return;
  ekle(h, `${onek}.mesaj`, ozellik(obj, "mesaj"));
  ekle(h, `${onek}.detay`, ozellik(obj, "detay"));
}

/** Bir olay objesinden (TR) ya da çeviri objesinden (EN) metin hedeflerini toplar. */
function olayNesnesiTopla(obj: any, ipucuAl: boolean): { hedefler: Map<string, Hedef>; ipucu: Record<string, string> } {
  const hedefler = new Map<string, Hedef>();
  const ipucu: Record<string, string> = {};
  ekle(hedefler, "metin", ozellik(obj, "metin"));
  const secenekler = ozellik(obj, "secenekler");
  if (secenekler && ts.isArrayLiteralExpression(secenekler)) {
    secenekler.elements.forEach((el: any, i: number) => {
      if (!ts.isObjectLiteralExpression(el)) return; // null (EN) ya da dinamik
      const s = `s${i}`;
      ekle(hedefler, `${s}.metin`, ozellik(el, "metin"));
      ekle(hedefler, `${s}.kilit`, ozellik(el, "kilitAciklamasi"));
      const bs = ozellik(el, "basariliSonuc");
      const fs_ = ozellik(el, "basarisizSonuc");
      sonucTopla(hedefler, `${s}.bs`, bs);
      sonucTopla(hedefler, `${s}.fs`, fs_);
      const ot = ozellik(el, "onTepki");
      if (ot && ts.isObjectLiteralExpression(ot)) {
        ekle(hedefler, `${s}.ot.metin`, ozellik(ot, "metin"));
        ekle(hedefler, `${s}.ot.gcm`, ozellik(ot, "geriCekilMetni"));
        ekle(hedefler, `${s}.ot.dm`, ozellik(ot, "devamMetni"));
        sonucTopla(hedefler, `${s}.ot.gcs`, ozellik(ot, "geriCekilSonucu"));
        sonucTopla(hedefler, `${s}.ot.ds`, ozellik(ot, "devamSonucu"));
        if (ipucuAl) {
          const g = ozellik(ot, "geriCekilSonucu");
          const d = ozellik(ot, "devamSonucu");
          if (g && ts.isObjectLiteralExpression(g)) ipucu[`${s}.ot.gcs`] = sonucIpucu(g);
          if (d && ts.isObjectLiteralExpression(d)) ipucu[`${s}.ot.ds`] = sonucIpucu(d);
        }
      }
      if (ipucuAl) {
        if (bs && ts.isObjectLiteralExpression(bs)) ipucu[`${s}.bs`] = sonucIpucu(bs);
        if (fs_ && ts.isObjectLiteralExpression(fs_)) ipucu[`${s}.fs`] = sonucIpucu(fs_);
        const sans = sayi(ozellik(el, "baseBasariSansi"));
        if (sans !== null) ipucu[`${s}.sans`] = String(sans);
      }
    });
  }
  return { hedefler, ipucu };
}

function kaynakAc(dosya: string): any {
  const metin = fs.readFileSync(dosya, "utf8");
  return ts.createSourceFile(dosya, metin, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
}

/**
 * gecikmisTakip.ts: olaylar `TEMALAR` tablosundan `temaUret` ile ÜRETİLİR (id literal'i yok).
 * Her tema → 3 olay (gt_X, gt_X_iyi, gt_X_kotu); yollar üretilen olayın yollarıyla aynıdır,
 * böylece .en.ts aynası ve ajan şeması değişmez.
 */
function gecikmisTakipTopla(sf: any): OlayHedefleri[] {
  const sonuc: OlayHedefleri[] = [];
  const dalEkle = (h: Map<string, Hedef>, ip: Record<string, string>, i: number, dal: any) => {
    if (!dal || !ts.isObjectLiteralExpression(dal)) return;
    ekle(h, `s${i}.metin`, ozellik(dal, "metin"));
    const so = ozellik(dal, "sonuc");
    sonucTopla(h, `s${i}.bs`, so);
    if (so && ts.isObjectLiteralExpression(so)) ip[`s${i}.bs`] = sonucIpucu(so);
    ip[`s${i}.sans`] = "100";
  };
  const gez = (n: any) => {
    if (ts.isVariableDeclaration(n) && n.name.getText() === "TEMALAR" && n.initializer && ts.isArrayLiteralExpression(n.initializer)) {
      for (const t of n.initializer.elements) {
        if (!ts.isObjectLiteralExpression(t)) continue;
        const anahtar = literalMetni(ozellik(t, "anahtar"))?.metin;
        if (!anahtar) continue;
        // tetikleyici
        {
          const h = new Map<string, Hedef>();
          const ip: Record<string, string> = {};
          ekle(h, "metin", ozellik(t, "metin"));
          dalEkle(h, ip, 0, ozellik(t, "yardim"));
          dalEkle(h, ip, 1, ozellik(t, "reddet"));
          sonuc.push({ id: `gt_${anahtar}`, baslik: literalMetni(ozellik(t, "baslik"))?.metin ?? "", hedefler: h, ipucu: ip });
        }
        for (const [alan, sonek] of [["olumlu", "_iyi"], ["olumsuz", "_kotu"]] as const) {
          const o = ozellik(t, alan);
          if (!o || !ts.isObjectLiteralExpression(o)) continue;
          const h = new Map<string, Hedef>();
          const ip: Record<string, string> = {};
          ekle(h, "metin", ozellik(o, "metin"));
          const sec = ozellik(o, "secenekler");
          if (sec && ts.isArrayLiteralExpression(sec)) sec.elements.forEach((el: any, i: number) => dalEkle(h, ip, i, el));
          sonuc.push({ id: `gt_${anahtar}${sonek}`, baslik: literalMetni(ozellik(o, "baslik"))?.metin ?? "", hedefler: h, ipucu: ip });
        }
      }
      return;
    }
    ts.forEachChild(n, gez);
  };
  gez(sf);
  return sonuc;
}

/** TR olay dosyası: `id: "..."` + `secenekler: [...]` taşıyan her obje literal'i. */
export function trKaynagiTopla(dosya: string): OlayHedefleri[] {
  const sf = kaynakAc(dosya);
  if (path.basename(dosya) === "gecikmisTakip.ts") return gecikmisTakipTopla(sf);
  const sonuc: OlayHedefleri[] = [];
  const gez = (n: any) => {
    if (ts.isObjectLiteralExpression(n)) {
      const idNode = ozellik(n, "id");
      const sec = ozellik(n, "secenekler");
      if (idNode && ts.isStringLiteral(idNode) && sec && ts.isArrayLiteralExpression(sec)) {
        const { hedefler, ipucu } = olayNesnesiTopla(n, true);
        const baslik = literalMetni(ozellik(n, "baslik"))?.metin ?? "";
        sonuc.push({ id: idNode.text, baslik, hedefler, ipucu });
        return; // iç içe olay yok
      }
    }
    ts.forEachChild(n, gez);
  };
  gez(sf);
  return sonuc;
}

/** EN ayna dosyası: dışa aktarılan Record'un doğrudan özellikleri (anahtar = olay id'si). */
export function enKaynagiTopla(dosya: string): Map<string, Map<string, Hedef>> {
  const sf = kaynakAc(dosya);
  const sonuc = new Map<string, Map<string, Hedef>>();
  const gez = (n: any) => {
    if (ts.isVariableDeclaration(n) && n.initializer && ts.isObjectLiteralExpression(n.initializer)) {
      for (const p of n.initializer.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const ad = ozellikAdi(p);
        if (!ad || !ts.isObjectLiteralExpression(p.initializer)) continue;
        sonuc.set(ad, olayNesnesiTopla(p.initializer, false).hedefler);
      }
      return;
    }
    ts.forEachChild(n, gez);
  };
  gez(sf);
  return sonuc;
}

/** Aralıkları sondan başa uygulayarak metin literal'lerini JSON.stringify ile yeniden yazar. */
export function metinleriDegistir(dosya: string, degisiklikler: { bas: number; bit: number; yeni: string }[]): void {
  if (degisiklikler.length === 0) return;
  let kaynak = fs.readFileSync(dosya, "utf8");
  const sirali = [...degisiklikler].sort((a, b) => b.bas - a.bas);
  for (let i = 1; i < sirali.length; i++) {
    if (sirali[i].bit > sirali[i - 1].bas) throw new Error(`Çakışan aralık: ${dosya}`);
  }
  for (const d of sirali) {
    kaynak = kaynak.slice(0, d.bas) + JSON.stringify(d.yeni) + kaynak.slice(d.bit);
  }
  fs.writeFileSync(dosya, kaynak, "utf8");
}

/** {dost}, {0}, {es}'in gibi placeholder + ek kalıpları. */
export function yerTutucular(metin: string): string[] {
  return (metin.match(/\{[^{}]+\}(?:'[\p{L}]+)?/gu) ?? []).sort();
}

export const DOSYA_ADLARI_SIRASI = [
  // dalga 1
  "hapis", "aranmaSeviyesi", "sosyallesme", "kureselOlaylar", "vebaHastaligi",
  // dalga 2
  "komikOlumler", "komikGaripOlaylar", "mulkOlaylari", "buyuluOlaylar", "bolgeselOrtaCag", "bolgeselSanayi",
  // dalga 3
  "gecikmisTakip", "saglikKritik", "meslekYatkinlikOlaylari",
  // dalga 4
  "yolculuk", "hizip",
  // dalga 5
  "ortaCagAsker", "ortaCagTuccar", "ortaCagDinAdami", "sanayiAsker", "sanayiTuccar", "sanayiDinAdami",
  // dalga 6
  "ortaCagAskerYollari", "ortaCagTuccarYollari", "ortaCagDinAdamiYollari",
  "sanayiAskerYollari", "sanayiTuccarYollari", "sanayiDinAdamiYollari",
  // dalga 7
  "ortaCagZanaatkar", "ortaCagZanaatkarYollari", "sanayiZanaatkar", "sanayiZanaatkarYollari",
  // dalga 8
  "evcilHayvan", "esyaVeGizem", "aile", "iliskiler", "evlilikVeAile",
  // dalga 9
  "genel",
];

/** Bu olayların TR şık metinleri DONDURULMUŞ (testler tam metne bağlı). */
export const DONDURULMUS_SIK_OLAYLARI = new Set(["eksen_ani_karar_ani"]);

/** Testlerin "bu kelime şıkta geçmemeli" dediği olaylar (TR şık metni, küçük harf). */
export const YASAKLI_KELIMELER: Record<string, string[]> = {
  dunya_savas_ilani_asker: ["kaç", "reddet"],
  oc_hacli_sefer_asker_cagrisi: ["reddet"],
  yolculuk_savunma_teklif: ["reddet"],
};

/** Yumuşak üst sınırlar (aşılırsa uygulama kabul eder ama "uzun" listesine yazar). */
export function ustSinir(yol: string, dil: "tr" | "en" = "tr"): number {
  let s = 50; // şık metinleri ve onTepki metinleri
  if (yol === "metin") s = 140;
  else if (yol.endsWith(".kilit")) s = 60;
  else if (yol.endsWith(".detay")) s = 50;
  else if (yol.endsWith(".mesaj")) s = 80;
  return dil === "en" ? Math.round(s * 1.1) : s; // İngilizce kelimeler daha uzun
}
