/**
 * simulateOyuncuModelleri.ts çıktılarını (sonuc_<model>.json) birleştirir:
 * model × meslek × çağ kırılımı, model başına eşit ağırlıklı (6 grup) ortalama, genel ortalama.
 *   npx tsx scripts/analyzeOyuncuModelleri.ts <klasör> [çıktı.md]
 */
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const outMd = process.argv[3];
const ISIM: Record<string, string> = { usta: "Sabırlı Lonca Ustası", atilgan: "Kaldıraçlı Atılgan", kurnaz: "Saray Kurnazı", halk: "Halk Adamı" };
const SIRA = ["usta", "atilgan", "kurnaz", "halk"];

interface K {
  persona: string; meslek: string; cag: string; olumYasi: number; olumNedeni: string; skor: number; servet: number; paraSon: number;
  rutbe: number; paySon: number; payOrt: number; payMaks: number; eliKalanOrt: number; eliKalanOrtYatirimOncesi: number; dukkanNetOrt: number;
  batti: boolean; iflasYasi: number; oncesiEli: number; oncesiEliYatirimOncesi: number; oncesiPay: number; oncesiYil: number; krediYili: number; calisanOrt: number; aranmaMaks: number; hapis: boolean; evli: boolean; cocuk: number; mutlulukSon: number;
  dilim: { eliKalan: number; yatirimOncesi: number; pay: number; dukkan: number; yil: number }[]; sayac: Record<string, number>; hata: boolean;
}
const tum: K[] = [];
for (const p of SIRA) {
  const f = path.join(dir, `sonuc_${p}.json`);
  if (fs.existsSync(f)) tum.push(...(JSON.parse(fs.readFileSync(f, "utf-8")) as K[]));
}
const ort = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const med = (a: number[]) => { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const f1 = (x: number) => (Number.isFinite(x) ? x.toFixed(1) : "–");
const f0 = (x: number) => (Number.isFinite(x) ? x.toFixed(0) : "–");
const yuz = (a: boolean[]) => (a.length ? (100 * a.filter(Boolean).length) / a.length : NaN);

interface Ozet {
  n: number; omurOrt: number; omurMed: number; payOrt: number; payMed: number; paySon: number; payMaks: number;
  eliOrt: number; eliMed: number; eliYatOnc: number; dukkan: number; servetMed: number; servetOrt: number; skorOrt: number;
  batan: number; iflasYasi: number; oncesiEli: number; oncesiEliMed: number; oncesiPay: number; oncesiYil: number; rutbe: number; krediYili: number; calisan: number; aranma: number; hapis: number; evli: number; cocuk: number; mutluluk: number;
  bant: { eliOrt: number; eliMed: number; pay: number; dukkan: number; n: number }[];
}
function ozet(a: K[]): Ozet {
  const bant = [0, 1, 2, 3, 4].map((i) => {
    const x = a.map((k) => k.dilim[i]).filter((d) => d && d.yil > 0);
    return { eliOrt: ort(x.map((d) => d.eliKalan)), eliMed: med(x.map((d) => d.eliKalan)), pay: ort(x.map((d) => d.pay)), dukkan: ort(x.map((d) => d.dukkan)), n: x.length };
  });
  return {
    n: a.length, omurOrt: ort(a.map((k) => k.olumYasi)), omurMed: med(a.map((k) => k.olumYasi)),
    payOrt: ort(a.map((k) => k.payOrt)), payMed: med(a.map((k) => k.payOrt)), paySon: ort(a.map((k) => k.paySon)), payMaks: ort(a.map((k) => k.payMaks)),
    eliOrt: ort(a.map((k) => k.eliKalanOrt)), eliMed: med(a.map((k) => k.eliKalanOrt)), eliYatOnc: ort(a.map((k) => k.eliKalanOrtYatirimOncesi)),
    dukkan: ort(a.map((k) => k.dukkanNetOrt)), servetMed: med(a.map((k) => k.servet)), servetOrt: ort(a.map((k) => k.servet)), skorOrt: ort(a.map((k) => k.skor)),
    batan: yuz(a.map((k) => k.batti)), iflasYasi: ort(a.filter((k) => k.batti).map((k) => k.iflasYasi)), oncesiEli: ort(a.map((k) => k.oncesiEli)), oncesiEliMed: med(a.map((k) => k.oncesiEli)), oncesiPay: ort(a.map((k) => k.oncesiPay)), oncesiYil: ort(a.map((k) => k.oncesiYil)), rutbe: ort(a.map((k) => k.rutbe)), krediYili: ort(a.map((k) => k.krediYili)), calisan: ort(a.map((k) => k.calisanOrt)),
    aranma: ort(a.map((k) => k.aranmaMaks)), hapis: yuz(a.map((k) => k.hapis)), evli: yuz(a.map((k) => k.evli)), cocuk: ort(a.map((k) => k.cocuk)), mutluluk: ort(a.map((k) => k.mutlulukSon)),
    bant,
  };
}
/** Birkaç özetin eşit ağırlıklı ortalaması (model başına 6 grup → tek sayı). */
function birlestir(o: Ozet[]): Ozet {
  const m = (f: (x: Ozet) => number) => ort(o.map(f));
  return {
    n: o.reduce((t, x) => t + x.n, 0), omurOrt: m((x) => x.omurOrt), omurMed: m((x) => x.omurMed), payOrt: m((x) => x.payOrt), payMed: m((x) => x.payMed), paySon: m((x) => x.paySon), payMaks: m((x) => x.payMaks),
    eliOrt: m((x) => x.eliOrt), eliMed: m((x) => x.eliMed), eliYatOnc: m((x) => x.eliYatOnc), dukkan: m((x) => x.dukkan), servetMed: m((x) => x.servetMed), servetOrt: m((x) => x.servetOrt), skorOrt: m((x) => x.skorOrt),
    batan: m((x) => x.batan), iflasYasi: m((x) => x.iflasYasi), oncesiEli: m((x) => x.oncesiEli), oncesiEliMed: m((x) => x.oncesiEliMed), oncesiPay: m((x) => x.oncesiPay), oncesiYil: m((x) => x.oncesiYil), rutbe: m((x) => x.rutbe), krediYili: m((x) => x.krediYili), calisan: m((x) => x.calisan), aranma: m((x) => x.aranma), hapis: m((x) => x.hapis), evli: m((x) => x.evli), cocuk: m((x) => x.cocuk), mutluluk: m((x) => x.mutluluk),
    bant: [0, 1, 2, 3, 4].map((i) => ({ eliOrt: ort(o.map((x) => x.bant[i].eliOrt)), eliMed: ort(o.map((x) => x.bant[i].eliMed)), pay: ort(o.map((x) => x.bant[i].pay)), dukkan: ort(o.map((x) => x.bant[i].dukkan)), n: o.reduce((t, x) => t + x.bant[i].n, 0) })),
  };
}

const L: string[] = [];
const p = (s = "") => L.push(s);
const MESLEKLER = ["Tüccar", "Zanaatkâr", "Din Adamı"];
const CAGLAR = ["Orta Çağ", "Sanayi Devrimi"];
const modeller = SIRA.filter((m) => tum.some((k) => k.persona === m));
const grup = (m: string, ms?: string, cg?: string) => tum.filter((k) => k.persona === m && (!ms || k.meslek === ms) && (!cg || k.cag === cg));

p(`# Oyuncu modelleri — ortalama sonuçlar (Asker hariç)\n`);
p(`Toplam ${tum.length} tam ömür · hata ile biten: ${tum.filter((k) => k.hata).length}\n`);

// 1) Ana tablo: model başına 6 grubun eşit ağırlıklı ortalaması
const modelOz: Record<string, Ozet> = {};
const altOz: Record<string, Ozet[]> = {};
for (const m of modeller) {
  altOz[m] = [];
  for (const ms of MESLEKLER) for (const cg of CAGLAR) { const g = grup(m, ms, cg); if (g.length) altOz[m].push(ozet(g)); }
  modelOz[m] = birlestir(altOz[m]);
}
const genel = birlestir(modeller.map((m) => modelOz[m]));

p(`## 1. Model başına ortalama (3 meslek × 2 çağ = 6 grubun eşit ağırlıklı ortalaması)\n`);
p(`| Model | Ömür (yaş) ort / medyan | Pazar payı (hayat boyu ort.) | Pazar payı (ölümde) | Eline kalan (yıllık, ort.) | Eline kalan (medyan hayat) | Net servet (medyan) | Batan % | Skor |`);
p(`|---|---|---|---|---|---|---|---|---|`);
for (const m of modeller) { const o = modelOz[m]; p(`| **${ISIM[m]}** | ${f1(o.omurOrt)} / ${f1(o.omurMed)} | %${f1(o.payOrt)} | %${f1(o.paySon)} | ${f1(o.eliOrt)} | ${f1(o.eliMed)} | ${f0(o.servetMed)} | %${f0(o.batan)} | ${f0(o.skorOrt)} |`); }
p(`| **Dört modelin ortalaması** | ${f1(genel.omurOrt)} / ${f1(genel.omurMed)} | %${f1(genel.payOrt)} | %${f1(genel.paySon)} | ${f1(genel.eliOrt)} | ${f1(genel.eliMed)} | ${f0(genel.servetMed)} | %${f0(genel.batan)} | ${f0(genel.skorOrt)} |`);
p();

p(`### 1b. Aynı model tablosu — yalnız İFLAS ÖNCESİ yıllar (dükkân hâlâ işliyorken; batmayanlarda tüm yetişkin yıllar)\n`);
p(`| Model | İlk iflas yaşı (batanlarda) | Eline kalan (yıllık, ort.) | Eline kalan (medyan hayat) | Pazar payı (ort.) | İşleyen yıl sayısı |`);
p(`|---|---|---|---|---|---|`);
for (const m of modeller) { const o = modelOz[m]; p(`| **${ISIM[m]}** | ${f1(o.iflasYasi)} | ${f1(o.oncesiEli)} | ${f1(o.oncesiEliMed)} | %${f1(o.oncesiPay)} | ${f1(o.oncesiYil)} |`); }
p(`| **Dört modelin ortalaması** | ${f1(genel.iflasYasi)} | ${f1(genel.oncesiEli)} | ${f1(genel.oncesiEliMed)} | %${f1(genel.oncesiPay)} | ${f1(genel.oncesiYil)} |`);
p();

// 2) Yaş dilimlerine göre eline kalan + pazar payı
p(`## 2. Yaş dilimlerine göre (model ortalaması): eline kalan (yıllık nakit değişimi, ort. | medyan) · pazar payı % · dükkân neti\n`);
const dilimAd = ["15-25", "25-35", "35-45", "45-55", "55+"];
p(`| Model | ${dilimAd.join(" | ")} |`);
p(`|---|${dilimAd.map(() => "---").join("|")}|`);
for (const m of [...modeller, "genel"]) {
  const o = m === "genel" ? genel : modelOz[m];
  p(`| **${m === "genel" ? "Dört modelin ortalaması" : ISIM[m]}** | ${o.bant.map((b) => `${f1(b.eliOrt)} \\| ${f1(b.eliMed)}<br>pay %${f1(b.pay)} · dükkân ${f0(b.dukkan)}`).join(" | ")} |`);
}
p();

// 3) Meslek × çağ kırılımı (her model)
p(`## 3. Model × meslek × çağ (n = ömür sayısı)\n`);
p(`| Model | Meslek | Çağ | n | Ömür | Pay % (ort.) | Pay % (ölümde) | Eline kalan (ort.) | Eline kalan (medyan) | Dükkân neti | Servet (medyan) | Batan % | Rütbe |`);
p(`|---|---|---|---|---|---|---|---|---|---|---|---|---|`);
for (const m of modeller) for (const ms of MESLEKLER) for (const cg of CAGLAR) {
  const g = grup(m, ms, cg); if (!g.length) continue; const o = ozet(g);
  p(`| ${ISIM[m]} | ${ms} | ${cg} | ${o.n} | ${f1(o.omurOrt)} | %${f1(o.payOrt)} | %${f1(o.paySon)} | ${f1(o.eliOrt)} | ${f1(o.eliMed)} | ${f1(o.dukkan)} | ${f0(o.servetMed)} | %${f0(o.batan)} | ${f1(o.rutbe)} |`);
}
p();

// 4) Meslek ve çağ bazında dört model ortalaması
p(`## 4. Dört modelin ortalaması — meslek ve çağ bazında\n`);
p(`| Kırılım | Ömür | Pay % (ort.) | Pay % (ölümde) | Eline kalan (ort.) | Eline kalan (medyan) | Batan % |`);
p(`|---|---|---|---|---|---|---|`);
for (const ms of MESLEKLER) { const o = birlestir(modeller.map((m) => birlestir(CAGLAR.map((cg) => ozet(grup(m, ms, cg))).filter((x) => x.n)))); p(`| ${ms} | ${f1(o.omurOrt)} | %${f1(o.payOrt)} | %${f1(o.paySon)} | ${f1(o.eliOrt)} | ${f1(o.eliMed)} | %${f0(o.batan)} |`); }
for (const cg of CAGLAR) { const o = birlestir(modeller.map((m) => birlestir(MESLEKLER.map((ms) => ozet(grup(m, ms, cg))).filter((x) => x.n)))); p(`| ${cg} | ${f1(o.omurOrt)} | %${f1(o.payOrt)} | %${f1(o.paySon)} | ${f1(o.eliOrt)} | ${f1(o.eliMed)} | %${f0(o.batan)} |`); }
p();

// 5) Davranış / yaşam göstergeleri
p(`## 5. Davranış ve yaşam göstergeleri (model ortalaması)\n`);
p(`| Model | Dükkân neti (ort.) | Ort. çalışan | Kredi yılı/ömür | Maks. aranma | Hapse girdi % | Evli/çocuklu % | Çocuk sayısı | Son mutluluk | Ort. rütbe |`);
p(`|---|---|---|---|---|---|---|---|---|---|`);
for (const m of modeller) { const o = modelOz[m]; p(`| ${ISIM[m]} | ${f1(o.dukkan)} | ${f1(o.calisan)} | ${f1(o.krediYili)} | ${f0(o.aranma)} | %${f0(o.hapis)} | %${f0(o.evli)} | ${f1(o.cocuk)} | ${f0(o.mutluluk)} | ${f1(o.rutbe)} |`); }
p();

// 6) Ölüm nedenleri ve eylem sayaçları
p(`## 6. En sık ölüm nedenleri (model başına ilk 3) ve ortalama eylem sayıları\n`);
for (const m of modeller) {
  const g = grup(m);
  const sayim: Record<string, number> = {};
  for (const k of g) { const key = /veba/i.test(k.olumNedeni) ? "Veba" : /ileri yaş|yorgunluk|huzur içinde|Beden artık/i.test(k.olumNedeni) ? "Yaşlılık/doğal" : /hayatta/.test(k.olumNedeni) ? "Hayatta (tur sınırı)" : "Olay/hastalık/kaza"; sayim[key] = (sayim[key] ?? 0) + 1; }
  const ilk = Object.entries(sayim).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} %${f0((100 * v) / g.length)}`).join(", ");
  const say: Record<string, number[]> = {};
  for (const k of g) for (const [a, b] of Object.entries(k.sayac)) (say[a] ??= []).push(b);
  const ort_say = Object.entries(say).map(([a, v]) => [a, v.reduce((x, y) => x + y, 0) / g.length] as const).filter(([, v]) => v >= 0.3).sort((a, b) => b[1] - a[1]).map(([a, v]) => `${a} ${f1(v)}`).join(" · ");
  p(`- **${ISIM[m]}** — ölüm: ${ilk}. Ömür başına eylem: ${ort_say}`);
}
p();
const md = L.join("\n");
if (outMd) fs.writeFileSync(outMd, md, "utf-8");
console.log(md);
