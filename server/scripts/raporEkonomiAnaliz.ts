/**
 * simulateEkonomiAnaliz.analiz.json'dan tek dosyalık, kendi kendine yeten bir
 * HTML ekonomi raporu üretir (Artifact olarak yayımlanmak üzere).
 *
 * Kullanım: npx tsx scripts/raporEkonomiAnaliz.ts [cikisYolu.html]
 */
import fs from "fs";
import path from "path";

const girisYolu = path.join(__dirname, "simulateEkonomiAnaliz.analiz.json");
const cikisYolu = process.argv[2] ?? path.join(__dirname, "ekonomi-analiz-raporu.html");
const A = JSON.parse(fs.readFileSync(girisYolu, "utf-8"));

const KI = A.kisilikler as any[];
const META = A.meta;

const esc = (s: string) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const f = (n: number) => (Math.round(n * 10) / 10).toLocaleString("tr-TR");
const f0 = (n: number) => Math.round(n).toLocaleString("tr-TR");
const pc = (n: number) => `%${Math.round(n * 10) / 10}`;

// --- kompozisyon kovaları (rapor için sadeleştirilmiş) ---
const GELIR_SEG = [
  { key: "maas", ad: "Maaş", renk: "var(--c-maas)" },
  { key: "olay", ad: "Olay ödülleri", renk: "var(--c-olay)" },
  { key: "mulk", ad: "Gayrimenkul geliri", renk: "var(--c-mulk)" },
  { key: "zar", ad: "Kumar", renk: "var(--c-zar)" },
  { key: "diger", ad: "Diğer", renk: "var(--c-diger)" },
];
function gelirComp(y: Record<string, number>) {
  return GELIR_SEG.map((s) => ({ ...s, v: y[s.key] ?? 0 })).filter((s) => s.v > 0.05);
}
const GIDER_SEG = [
  { key: "konut", ad: "Kira / konut", renk: "var(--c-konut)" },
  { key: "yasam", ad: "Yemek / yaşam", renk: "var(--c-yasam)" },
  { key: "olay", ad: "Olay maliyeti", renk: "var(--c-olay)" },
  { key: "yatirim", ad: "Kendi işine yatırım", renk: "var(--c-yatirim)" },
  { key: "mulkAlim", ad: "Gayrimenkul alımı", renk: "var(--c-mulk)" },
  { key: "magaza", ad: "Mağaza", renk: "var(--c-magaza)" },
  { key: "faiz", ad: "Borç faizi", renk: "var(--c-faiz)" },
  { key: "sizinti", ad: "Zenginlik sızıntısı", renk: "var(--c-zar)" },
  { key: "diger2", ad: "Diğer (bağış/savaş v./taşınma/…)", renk: "var(--c-diger)" },
];
function giderComp(y: Record<string, number>) {
  const diger2 =
    (y.bagis ?? 0) + (y.savasVergisi ?? 0) + (y.tasinma ?? 0) + (y.envanterBakim ?? 0) +
    (y.mulkZarar ?? 0) + (y.evcil ?? 0) + (y.ekip ?? 0) + (y.zarKayip ?? 0) + (y.diger ?? 0);
  const birlesik: Record<string, number> = { ...y, diger2 };
  return GIDER_SEG.map((s) => ({ ...s, v: birlesik[s.key] ?? 0 })).filter((s) => s.v > 0.05);
}

function barHTML(segs: { ad: string; renk: string; v: number }[]): string {
  const t = segs.reduce((a, s) => a + s.v, 0) || 1;
  const parcalar = segs
    .map((s) => {
      const w = (s.v / t) * 100;
      const etiket = w >= 9 ? `<span>${Math.round(w)}</span>` : "";
      return `<i style="width:${w.toFixed(2)}%;background:${s.renk}" title="${esc(s.ad)}: %${(Math.round(w * 10) / 10)}">${etiket}</i>`;
    })
    .join("");
  return `<div class="bar">${parcalar}</div>`;
}
function legendHTML(segs: { key?: string; ad: string; renk: string }[]): string {
  return `<div class="legend">${segs
    .map((s) => `<span><i style="background:${s.renk}"></i>${esc(s.ad)}</span>`)
    .join("")}</div>`;
}

function kmSnap(k: any, yas: number) {
  return k.kmTaslari.find((t: any) => t.yas === yas);
}

// --- Tanı için bazı türev sayılar ---
const borcSirali = [...KI].sort((a, b) => b.yasamBoyu.borcluBitisYuzde - a.yasamBoyu.borcluBitisYuzde);
const cimri = KI.find((k) => k.id === "cimri");
const para = KI.find((k) => k.id === "para");
const garantici = KI.find((k) => k.id === "garantici");
const ortKiraYemekPay = Math.round(
  (KI.reduce((a, k) => a + (k.yasamBoyu.giderYuzde.konut + k.yasamBoyu.giderYuzde.yasam), 0) / KI.length) * 10
) / 10;
const ortMaasPay = Math.round((KI.reduce((a, k) => a + k.yasamBoyu.gelirYuzde.maas, 0) / KI.length) * 10) / 10;
const borcluCount = KI.filter((k) => k.yasamBoyu.borcluBitisYuzde >= 50).length;

// ---------------------------------------------------------------------------

function kisilikBolum(k: any): string {
  const yb = k.yasamBoyu;
  const mk = k.mekanikKullanim;
  const solvent = yb.olumdeNetServetMedyan >= 0;
  const asamalar: { etiket: string; snap: any }[] = [
    { etiket: "Yaş 30", snap: kmSnap(k, 30) },
    { etiket: "Yaş 50", snap: kmSnap(k, 50) },
    { etiket: "Ömür boyu", snap: { gelirYuzde: yb.gelirYuzde, giderYuzde: yb.giderYuzde } },
  ].filter((a) => a.snap);

  const satirlar = k.kmTaslari
    .map((t: any) => {
      const neg = t.netServetOrt < 0;
      return `<tr>
        <td class="num">${t.yas}</td>
        <td class="num muted">${f(t.hayattaKalanYuzde)}%</td>
        <td class="num ${neg ? "neg" : "pos"}">${f(t.netServetOrt)}</td>
        <td class="num">${f(t.nakitOrt)}</td>
        <td class="num">${f(t.gayrimenkulOrt)}</td>
        <td class="num sep">${t.saglikOrt}</td>
        <td class="num">${t.unOrt}</td>
        <td class="num">${t.ahlakOrt}</td>
        <td class="num">${t.mutlulukOrt}</td>
      </tr>`;
    })
    .join("");

  const kompBloklar = asamalar
    .map(
      (a) => `<div class="stage">
        <div class="stage-h">${esc(a.etiket)}</div>
        <div class="comp-row"><span class="comp-lbl">Gelir</span>${barHTML(gelirComp(a.snap.gelirYuzde))}</div>
        <div class="comp-row"><span class="comp-lbl">Gider</span>${barHTML(giderComp(a.snap.giderYuzde))}</div>
      </div>`
    )
    .join("");

  return `<section class="kisi" id="${esc(k.id)}">
    <header class="kisi-h">
      <h3>${esc(k.ad)}</h3>
      <span class="pill ${solvent ? "pill-pos" : "pill-neg"}">${
        solvent ? "medyan: artıda ölür" : "medyan: borçlu ölür"
      }</span>
    </header>
    <div class="kpi-row">
      <div class="kpi"><b>${f(yb.olumYasiOrt)}</b><span>ort. ölüm yaşı</span></div>
      <div class="kpi"><b class="${yb.olumdeNetServetMedyan < 0 ? "neg" : "pos"}">${f(yb.olumdeNetServetMedyan)}</b><span>ölümde net servet (medyan)</span></div>
      <div class="kpi"><b class="${yb.borcluBitisYuzde >= 50 ? "neg" : ""}">${f(yb.borcluBitisYuzde)}%</b><span>borçlu biten ömür</span></div>
      <div class="kpi"><b>${f(yb.toplamGelirOrt)}</b><span>ömür boyu Σ gelir</span></div>
      <div class="kpi"><b>${f(yb.toplamGiderOrt)}</b><span>ömür boyu Σ gider</span></div>
    </div>

    <div class="tbl-wrap">
      <table class="ledger">
        <thead><tr>
          <th class="num">Yaş</th><th class="num">Kalan</th><th class="num">Net servet</th>
          <th class="num">Nakit</th><th class="num">G.menkul</th>
          <th class="num sep">Can</th><th class="num">Şöhret</th><th class="num">Ahlak</th><th class="num">Mutluluk</th>
        </tr></thead>
        <tbody>${satirlar}</tbody>
      </table>
    </div>
    <p class="tbl-note">Satırlar yalnızca o yaşa <em>ulaşan</em> ömürlerin ortalamasıdır (“Kalan” = gruptaki ömürlerin yüzde kaçı). Tutarlar oyun‑içi para birimi.</p>

    <div class="stages">${kompBloklar}</div>

    <p class="read"><b>Okuma:</b> ${esc(kisiRead(k))}</p>
  </section>`;
}

function kisiRead(k: any): string {
  const yb = k.yasamBoyu;
  const g = yb.gelirYuzde;
  const gd = yb.giderYuzde;
  const mk = k.mekanikKullanim;
  switch (k.id) {
    case "cimri":
      return `En ucuz ev+sofrada (ahşap ev / ucuza ye) kalıp yatırımın hepsinden uzak durunca kasa büyüyor (yaş 20’de ~${f(kmSnap(k, 20).netServetOrt)} → yaş 50’de ~${f(kmSnap(k, 50).netServetOrt)}), borçlu biten ömür yalnızca ${f(yb.borcluBitisYuzde)}%. Bedeli sağlık: ortalama ölüm yaşı ${f(yb.olumYasiOrt)}, ve giderin ${f(gd.magaza)}%’i acil şifa alımına gidiyor — yani ucuz yaşam “sağlık vergisi” olarak mağazaya geri dönüyor. Ekonomi değil, ömür kaybediyor.`;
    case "garantici":
      return `“Normal” oyun (normal ev / normal ye, risksiz seçimler) ekonomik olarak zarar ediyor: ömür boyu Σgider ${f(yb.toplamGiderOrt)} > Σgelir ${f(yb.toplamGelirOrt)}, ömürlerin ${f(yb.borcluBitisYuzde)}%’i borçlu bitiyor, hiçbiri zengin olmuyor. Kira+yemek giderin ${f(gd.konut + gd.yasam)}%’i; borç faizi orta yaşta ${f(kmSnap(k, 40).giderYuzde.faiz)}%’e çıkıp sarmal yapıyor. Varsayılan yaşam tarzı sürdürülebilir değil.`;
    case "survival":
      return `Sağlığı her şeyin üstünde tutup pahalı ev+sofraya çıkınca kira+yemek giderin ${f(gd.konut + gd.yasam)}%’ini yiyor; ömürlerin ${f(yb.borcluBitisYuzde)}%’i borçlu bitiyor ve borç faizi orta yaşta ${f(kmSnap(k, 45).giderYuzde.faiz)}%’e ulaşıyor. Üstelik uzun ömür de gelmiyor (ort. ${f(yb.olumYasiOrt)}) — harcama sağlığı almıyor, sadece borç büyütüyor.`;
    case "suclu":
      return `Suç geliri (kumar + ahlaki taviz veren olaylar) toplam gelirin yalnızca ${f(g.zar + g.mulk)}%’i — “hızlı zenginlik” yolu ekonomik olarak görünmez. Karaborsa mülkü geç yaşta ufak bir gayrimenkul değeri biriktiriyor ama ömürlerin ${f(yb.borcluBitisYuzde)}%’i yine borçlu bitiyor. Risk çok, getiri bütçede iz bırakmıyor.`;
    case "luks":
      return `Ün/mutluluk peşinde pahalı ev+sofra: ömürlerin ${f(yb.borcluBitisYuzde)}%’i borçlu bitiyor (en yüksek oran), borç faizi ${f(kmSnap(k, 45).giderYuzde.faiz)}%’e çıkıyor, net servet yaş 45’te ~${f(kmSnap(k, 45).netServetOrt)}. Şöhret ${kmSnap(k, 50).unOrt}/100’e ulaşıyor ama bunun maaşa dönüşü kira artışını karşılamıyor. Lüks yaşam tek yönlü bir para deliği.`;
    case "para":
      return `Tek “çalışan” ekonomi profili: agresif kendi‑işi yatırımı (ömür boyu giderin ${f(gd.yatirim)}%’i) + mülk alımı gayrimenkul gelirini yaş 30’da ${f(kmSnap(k, 30).gelirYuzde.mulk)}% → yaş 75’te ${f(kmSnap(k, 75).gelirYuzde.mulk)}%’e çıkarıyor ve net servet yaş 55’ten sonra ~${f(kmSnap(k, 55).netServetOrt)}→${f(kmSnap(k, 75).netServetOrt)} tırmanıyor. Yine de ömür boyu akış hafif negatif (Σgider ${f(yb.toplamGiderOrt)} > Σgelir ${f(yb.toplamGelirOrt)}); kâr, biriken mülk değerinde. Borçlu biten ömür ${f(yb.borcluBitisYuzde)}% — “doğru” oynayan bile kıl payında.`;
    default:
      return "";
  }
}

// --- Karşılaştırma tablosu ---
const kars = KI.map((k) => {
  const yb = k.yasamBoyu;
  return `<tr>
    <td>${esc(k.ad)}</td>
    <td class="num">${f(yb.olumYasiOrt)}</td>
    <td class="num ${yb.olumdeNetServetMedyan < 0 ? "neg" : "pos"}">${f(yb.olumdeNetServetMedyan)}</td>
    <td class="num ${yb.borcluBitisYuzde >= 50 ? "neg" : ""}">${f(yb.borcluBitisYuzde)}%</td>
    <td class="num">${f(yb.zenginBitisYuzde)}%</td>
    <td class="num sep">${f(yb.gelirYuzde.maas)}%</td>
    <td class="num">${f(yb.gelirYuzde.olay)}%</td>
    <td class="num">${f(yb.gelirYuzde.mulk)}%</td>
    <td class="num sep">${f(yb.giderYuzde.konut + yb.giderYuzde.yasam)}%</td>
    <td class="num">${f(yb.giderYuzde.faiz)}%</td>
    <td class="num">${f(yb.giderYuzde.yatirim + yb.giderYuzde.mulkAlim)}%</td>
    <td class="num">${f(yb.giderYuzde.magaza)}%</td>
  </tr>`;
}).join("");

// --- Mekanik kullanımı tablosu ---
const mekTbl = KI.map((k) => {
  const m = k.mekanikKullanim;
  return `<tr>
    <td>${esc(k.ad)}</td>
    <td class="num">${f(m.kendiIsYatirim)}</td>
    <td class="num">${f(m.gayrimenkulAlim)}</td>
    <td class="num">${f(m.magazaSifa)}</td>
    <td class="num">${f(m.magazaLuks)}</td>
    <td class="num">${f(m.zar)}</td>
    <td class="num">${f(m.sosyallesme)}</td>
    <td class="num">${f(m.konutDegisim)}</td>
    <td class="num">${f(m.yasamDegisim)}</td>
    <td class="mono">${esc(m.sonKonut)}</td>
    <td class="mono">${esc(m.sonSofra)}</td>
  </tr>`;
}).join("");

const GELIR_LEGEND = GELIR_SEG;
const GIDER_LEGEND = GIDER_SEG;

const html = `<title>Kader Çarkı Ekonomi Tanısı</title>
<meta name="description" content="6 oyuncu kişiliğiyle simüle edilmiş ${f0(META.toplamOmur)} ömrün 5 yıllık gelir/gider/servet kırılımı.">
<style>
:root{
  --bg:#f3f2ee; --surface:#fbfaf6; --surface-2:#f0eee7;
  --ink:#221f19; --muted:#6d6658; --faint:#928b7c;
  --hair:#dcd7c9; --hair-strong:#c9c3b2;
  --accent:#7a2e2a; --accent-soft:#9c4a3f;
  --pos:#3f6b47; --neg:#a5352a; --warn:#916017;
  --c-maas:#6d6a8a; --c-olay:#8a6f3d; --c-mulk:#3f6b57; --c-zar:#8a5a3a;
  --c-konut:#7a2e2a; --c-yasam:#b07a3a; --c-yatirim:#3f6b57; --c-magaza:#4a6d8a;
  --c-faiz:#9a3b52; --c-diger:#9a9384;
  --shadow:0 1px 2px rgba(40,34,24,.06),0 8px 24px -12px rgba(40,34,24,.14);
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#181712; --surface:#201e18; --surface-2:#262319;
    --ink:#ece7d9; --muted:#9c9484; --faint:#7c7566;
    --hair:#37332a; --hair-strong:#474235;
    --accent:#cd6f5e; --accent-soft:#b85e4e;
    --pos:#7fac82; --neg:#e2857a; --warn:#d3a24f;
    --c-maas:#9a97ba; --c-olay:#c1a06a; --c-mulk:#6fae94; --c-zar:#c2895f;
    --c-konut:#d3776b; --c-yasam:#d8a869; --c-yatirim:#6fae94; --c-magaza:#7ba6c8;
    --c-faiz:#d17b93; --c-diger:#8a8474;
    --shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px -14px rgba(0,0,0,.5);
  }
}
:root[data-theme="dark"]{
  --bg:#181712; --surface:#201e18; --surface-2:#262319;
  --ink:#ece7d9; --muted:#9c9484; --faint:#7c7566;
  --hair:#37332a; --hair-strong:#474235;
  --accent:#cd6f5e; --accent-soft:#b85e4e;
  --pos:#7fac82; --neg:#e2857a; --warn:#d3a24f;
  --c-maas:#9a97ba; --c-olay:#c1a06a; --c-mulk:#6fae94; --c-zar:#c2895f;
  --c-konut:#d3776b; --c-yasam:#d8a869; --c-yatirim:#6fae94; --c-magaza:#7ba6c8;
  --c-faiz:#d17b93; --c-diger:#8a8474;
  --shadow:0 1px 2px rgba(0,0,0,.3),0 10px 30px -14px rgba(0,0,0,.5);
}

*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:var(--bg);color:var(--ink);
  font-family:"IBM Plex Sans","Segoe UI",system-ui,sans-serif;
  font-size:16px;line-height:1.6;
  font-feature-settings:"kern";
}
.wrap{max-width:1000px;margin:0 auto;padding:clamp(1.2rem,4vw,3.5rem) clamp(1rem,4vw,2.5rem) 5rem}
.prose{max-width:70ch}

h1,h2,h3{font-family:"Fraunces","Iowan Old Style",Georgia,serif;font-weight:600;line-height:1.15;text-wrap:balance;margin:0}
h1{font-size:clamp(2rem,5vw,3rem);letter-spacing:-.01em;font-weight:600}
h2{font-size:clamp(1.4rem,3vw,1.9rem);margin:3.5rem 0 1rem;padding-top:1.4rem;border-top:2px solid var(--accent)}
h3{font-size:1.35rem}
p{margin:.7rem 0}
a{color:var(--accent)}
em{font-style:italic;color:var(--ink)}
b{font-weight:600}

.eyebrow{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent-soft);margin:0 0 1rem}
.lede{font-size:1.12rem;color:var(--muted);max-width:65ch}
.meta-line{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.8rem;color:var(--faint);margin-top:1.4rem;border-left:2px solid var(--hair-strong);padding-left:.9rem}

.num,.mono{font-family:"IBM Plex Mono",ui-monospace,monospace;font-variant-numeric:tabular-nums}
.num{text-align:right}
.pos{color:var(--pos)}
.neg{color:var(--neg)}
.muted{color:var(--muted)}

/* Tanı kartları */
.diag{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1rem;margin:1.6rem 0}
.card{background:var(--surface);border:1px solid var(--hair);border-radius:10px;padding:1.1rem 1.2rem;box-shadow:var(--shadow)}
.card .big{font-family:"Fraunces",Georgia,serif;font-size:2rem;font-weight:600;line-height:1;display:block;margin-bottom:.3rem}
.card .lbl{font-size:.92rem;color:var(--muted)}
.card.flag .big{color:var(--neg)}
.card.good .big{color:var(--pos)}

/* Kişilik bölümü */
.kisi{background:var(--surface);border:1px solid var(--hair);border-radius:12px;padding:clamp(1rem,3vw,1.8rem);margin:1.4rem 0;box-shadow:var(--shadow)}
.kisi-h{display:flex;align-items:baseline;gap:.9rem;flex-wrap:wrap;margin-bottom:1rem}
.pill{font-family:"IBM Plex Mono",monospace;font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;padding:.22em .6em;border-radius:999px;border:1px solid currentColor}
.pill-pos{color:var(--pos)}
.pill-neg{color:var(--neg)}

.kpi-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.6rem;margin-bottom:1.2rem}
.kpi{background:var(--surface-2);border-radius:8px;padding:.7rem .8rem}
.kpi b{font-family:"IBM Plex Mono",monospace;font-size:1.25rem;font-variant-numeric:tabular-nums;display:block}
.kpi span{font-size:.8rem;color:var(--muted)}

.tbl-wrap{overflow-x:auto;border:1px solid var(--hair);border-radius:8px;margin:.4rem 0}
table{border-collapse:collapse;width:100%;font-size:.9rem}
.ledger th,.ledger td{padding:.42rem .7rem;white-space:nowrap}
.ledger thead th{background:var(--surface-2);font-weight:600;font-family:"IBM Plex Sans",sans-serif;font-size:.8rem;color:var(--muted);border-bottom:1px solid var(--hair-strong);position:sticky;top:0}
.ledger tbody tr:nth-child(even){background:var(--surface-2)}
.ledger tbody tr:last-child{font-weight:600;border-top:2px solid var(--hair-strong)}
td.sep,th.sep{border-left:1px solid var(--hair-strong)}
.tbl-note{font-size:.82rem;color:var(--faint);margin:.5rem 0 0}

/* kompozisyon barları */
.stages{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.1rem;margin:1.5rem 0 .6rem}
.stage{background:var(--surface-2);border-radius:8px;padding:.8rem .9rem}
.stage-h{font-family:"IBM Plex Mono",monospace;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:.55rem}
.comp-row{display:flex;align-items:center;gap:.55rem;margin:.35rem 0}
.comp-lbl{font-size:.75rem;color:var(--faint);width:2.7em;flex:none;text-align:right}
.bar{display:flex;height:1.4rem;border-radius:4px;overflow:hidden;flex:1;background:var(--hair)}
.bar i{display:flex;align-items:center;justify-content:center;min-width:0;transition:none}
.bar i span{font-family:"IBM Plex Mono",monospace;font-size:.66rem;color:#fff;mix-blend-mode:normal;opacity:.92;font-variant-numeric:tabular-nums}

.legend{display:flex;flex-wrap:wrap;gap:.4rem 1rem;margin:.8rem 0 0;font-size:.82rem;color:var(--muted)}
.legend span{display:flex;align-items:center;gap:.4rem}
.legend i{width:.85rem;height:.85rem;border-radius:3px;flex:none;display:block}

.read{background:var(--surface-2);border-left:3px solid var(--accent);border-radius:0 6px 6px 0;padding:.8rem 1rem;font-size:.95rem;margin:1.3rem 0 0}

/* öneri listesi */
.rec{counter-reset:r;list-style:none;padding:0;margin:1.4rem 0;display:grid;gap:.9rem}
.rec li{background:var(--surface);border:1px solid var(--hair);border-radius:10px;padding:1rem 1.2rem 1rem 3.2rem;position:relative;box-shadow:var(--shadow)}
.rec li::before{counter-increment:r;content:counter(r);position:absolute;left:1rem;top:1rem;font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:1.1rem;color:var(--accent)}
.rec b{display:block;margin-bottom:.2rem}
.rec .why{color:var(--muted);font-size:.92rem}

.toc{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.2rem 0}
.toc a{font-family:"IBM Plex Mono",monospace;font-size:.8rem;text-decoration:none;border:1px solid var(--hair-strong);border-radius:999px;padding:.3em .8em;color:var(--muted)}
.toc a:hover{border-color:var(--accent);color:var(--accent)}

footer{margin-top:3rem;padding-top:1.4rem;border-top:1px solid var(--hair);font-size:.82rem;color:var(--faint)}

@media (max-width:640px){
  .comp-lbl{width:2.2em}
  h2{margin-top:2.4rem}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">

<div class="wrap">
  <p class="eyebrow">Kader Çarkı · ekonomi denge çalışması</p>
  <h1>Altı hayat, tek ekonomi sorunu</h1>
  <p class="lede">Altı farklı oyuncu kişiliğiyle ${f0(META.toplamOmur)} ömür simüle edildi. Her ömür 5 yıllık kilometre taşlarında fotoğraflandı: o ana kadarki gelirin kaynağı, giderin kalemi, kalan nakit, gayrimenkul, net servet ve can/şöhret/ahlak/mutluluk. Motorun tur‑başı nakit akışı kalem kalem defterlendi (mutabakat farkı ${f0(META.toplamOmur)} ömürde ≈ 0).</p>
  <p class="meta-line">Kişilikler: Cimri · Garantici · Maks Hayatta Kalma · Suçlu · Lüks Düşkünü · Maks Para Odaklı &nbsp;|&nbsp; her biri 2 çağ × 3 meslek × ${f0(META.kisilikBasinaOmur / 6)} ömür &nbsp;|&nbsp; bütün tur‑arası mekanikler (ev, sofra, kendi‑işi yatırımı, piyasa mülkü, mağaza şifa/lüks, envanter, zar, sosyalleşme) kişiliğe göre kullanıldı.</p>

  <h2>Tanı</h2>
  <div class="diag">
    <div class="card flag"><span class="big">${f(ortKiraYemekPay)}%</span><span class="lbl">Ortalama bir ömürde <b>kira + yemek</b>, tüm giderin bu kadarı. Başka hiçbir kalem yarışamıyor.</span></div>
    <div class="card flag"><span class="big">${f(ortMaasPay)}%</span><span class="lbl">Gelirin bu kadarı <b>maaştan</b>. Yatırım, mülk, olay ödülü, kumar — hepsi birlikte ~${f(100 - ortMaasPay)}%. Ekonominin tek gerçek girdisi var.</span></div>
    <div class="card flag"><span class="big">${borcluCount}/6</span><span class="lbl">Kişiliğin çoğunluğu <b>ömürlerinin yarısından fazlasını borçlu</b> bitiriyor. “Normal” oyun dahil.</span></div>
    <div class="card ${para.yasamBoyu.olumdeNetServetMedyan >= 0 ? "good" : "flag"}"><span class="big">1/6</span><span class="lbl">Yalnız <b>Maks Para Odaklı</b> ekonomiyi ayakta tutuyor — o da kârı nakitte değil, biriken <b>mülk değerinde</b> taşıyor.</span></div>
    <div class="card"><span class="big">${f(garantici.yasamBoyu.toplamGiderOrt - garantici.yasamBoyu.toplamGelirOrt)}</span><span class="lbl"><b>Garantici</b> (normal ev + normal ye, risksiz seçim) ömür boyu bu kadar <b>açık</b> veriyor. Varsayılan yaşam tarzı zararına.</span></div>
    <div class="card"><span class="big">${f(cimri.mekanikKullanim.magazaSifa)}×</span><span class="lbl"><b>Cimri</b> ömründe bu kadar acil şifa alıyor — giderinin ${f(cimri.yasamBoyu.giderYuzde.magaza)}%’i. Ucuz yaşam, mağazaya “sağlık vergisi” olarak geri dönüyor.</span></div>
  </div>
  ${legendHTML([{ ad: "Maaş", renk: "var(--c-maas)" }, { ad: "Olay", renk: "var(--c-olay)" }, { ad: "Gayrimenkul", renk: "var(--c-mulk)" }, { ad: "Kira/konut", renk: "var(--c-konut)" }, { ad: "Yemek/yaşam", renk: "var(--c-yasam)" }, { ad: "Kendi işi yat.", renk: "var(--c-yatirim)" }, { ad: "Mağaza", renk: "var(--c-magaza)" }, { ad: "Borç faizi", renk: "var(--c-faiz)" }, { ad: "Kumar / diğer", renk: "var(--c-diger)" }])}

  <h2>Kişilik kırılımı</h2>
  <div class="toc">${KI.map((k) => `<a href="#${esc(k.id)}">${esc(k.ad)}</a>`).join("")}</div>
  ${KI.map(kisilikBolum).join("")}

  <h2>Yan yana — ömür boyu</h2>
  <div class="tbl-wrap">
    <table class="ledger">
      <thead><tr>
        <th>Kişilik</th><th class="num">Ölüm yaşı</th><th class="num">Net servet<br>(medyan)</th>
        <th class="num">Borçlu<br>bitiş</th><th class="num">Zengin<br>(≥300)</th>
        <th class="num sep">Maaş<br>%</th><th class="num">Olay<br>%</th><th class="num">G.menkul<br>%</th>
        <th class="num sep">Kira+<br>yemek %</th><th class="num">Faiz<br>%</th><th class="num">Yat.+<br>alım %</th><th class="num">Mağaza<br>%</th>
      </tr></thead>
      <tbody>${kars}</tbody>
    </table>
  </div>
  <p class="tbl-note">“Maaş / Olay / G.menkul %” = ömür boyu gelirin dağılımı. “Kira+yemek / Faiz / Yat.+alım / Mağaza %” = ömür boyu giderin dağılımı.</p>

  <h2>Mekanik kullanımı</h2>
  <p class="prose">Her kişilik bütün tur‑arası mekanikleri kendi tarzınca kullandı. Ortalama sayılar (ömür başına):</p>
  <div class="tbl-wrap">
    <table class="ledger">
      <thead><tr>
        <th>Kişilik</th><th class="num">Kendi işi<br>yatırım</th><th class="num">G.menkul<br>alımı</th>
        <th class="num">Mağaza<br>şifa</th><th class="num">Mağaza<br>lüks</th><th class="num">Zar</th>
        <th class="num">Sosyal‑<br>leşme</th><th class="num">Ev<br>değ.</th><th class="num">Sofra<br>değ.</th>
        <th>Son ev</th><th>Son sofra</th>
      </tr></thead>
      <tbody>${mekTbl}</tbody>
    </table>
  </div>
  <p class="tbl-note">Lüks eşya alımı ${KI.every((k) => k.mekanikKullanim.magazaLuks < 0.05) ? "hiçbir kişilikte gerçekleşmedi — fiyatları (95–240) erişilemez kalıyor" : "yalnızca en varlıklı profillerde nadiren görüldü"}. Kimse piyasa mülkünü Para Odaklı dışında anlamlı kullanmadı.</p>

  <h2>Öneriler</h2>
  <p class="prose">Sayılar tek bir yapısal soruna işaret ediyor: <b>iki zorunlu gider (kira + yemek) bütçeyi domine ediyor, tek gelir (maaş) ona ancak yetişiyor, ve alternatif gelir kanalları (yatırım/mülk) o kadar geç açılıyor ki çoğu ömür oraya varmadan borca gömülüyor.</b> Somut kaldıraçlar:</p>
  <ol class="rec">
    <li><b>Kira + yemek payını ~%85’ten ~%60’a indir.</b><span class="why">En düşük kademelerin sağlık cezası dururken tutarları biraz düşür ya da maaş tabanını çağ‑enflasyonuna daha sıkı endeksle. Şu an “normal ev + normal ye” bile açık verdiriyor; hedef, mütevazı yaşamın <em>başa baş</em> olması, konforun ödüllü ama zorunlu olmayan bir seçim olması.</span></li>
    <li><b>Orta yaş borç sarmalını kır.</b><span class="why">Borç faizi Lüks/Survival/Garantici’de giderin %8–9’una çıkıp kendini besliyor. Faiz oranını düşür ya da “bütçe artıda” iken anapara affını artır; borç bir kez batınca çıkış yolu kalmıyor.</span></li>
    <li><b>Kendi‑işi yatırımını ve mülkü erken erişilebilir yap.</b><span class="why">Yalnız Para Odaklı bunları kullanabiliyor çünkü “maliyetin 1.3–6 katı boş nakit” eşiğini yalnız o aşıyor. İlk yatırımın maliyetini düşür ya da genç yaşta küçük bir “tezgâh” kademesi ekle — gelir çeşitlenmesi 20’li yaşlarda başlasın, 50’lerde değil.</span></li>
    <li><b>Mağazayı sağlık vergisi olmaktan çıkar.</b><span class="why">Cimri giderinin ${f(cimri.yasamBoyu.giderYuzde.magaza)}%’ini acil şifaya veriyor; bu bir seçim değil, ucuz yaşamın zorunlu bedeli. Ucuz kademelerin sağlık cezasını yumuşat ki mağaza gerçek bir opsiyon olsun.</span></li>
    <li><b>Lüks eşya fiyatlarını (95–240) gözden geçir.</b><span class="why">Hiçbir kişilik ömrü boyunca bir kez bile lüks eşya alamadı. Ya fiyat çok yüksek ya da o parası olan çok az ömür var — şu hâliyle ölü içerik.</span></li>
    <li><b>Olay ödüllerinin gelir payını (~%8–18) hafif artır.</b><span class="why">Maaş dışı tek anlamlı kanal bu. Riskli seçimlerin para getirisini biraz yukarı çekmek, oyuncuya maaş‑bekleme dışında gerçek bir ekonomik ajans verir.</span></li>
    <li><b>Kumar + suç gelirini yeniden ölç.</b><span class="why">Suçlu profilinde kumar+ahlaki‑taviz geliri toplamın yalnız ~%${f(KI.find((k) => k.id === "suclu").yasamBoyu.gelirYuzde.zar + KI.find((k) => k.id === "suclu").yasamBoyu.gelirYuzde.mulk)}’i — risk yüksek, bütçe etkisi görünmez. Ya getiriyi yükselt ya da suç yolunu “para” değil “başka bir şey” (güç, korku, hız) üzerinden tasarla.</span></li>
  </ol>

  <footer>
    Yöntem: <span class="mono">scripts/simulateEkonomiAnaliz.ts</span> gerçek <span class="mono">gameEngine</span> fonksiyonlarını çağırır; tur‑başı nakit akışı <span class="mono">secimUygula().nakitAkisi</span> ile kalem kalem alınır, tur‑arası harcamalar <span class="mono">state.para</span> farkıyla ölçülür. Özet: <span class="mono">scripts/analyzeEkonomiAnaliz.ts</span>. ${f0(META.toplamOmur)} ömür · mutabakat farkı ≈ 0. Survivor bias: kilometre taşı ortalamaları yalnız o yaşa ulaşan ömürleri içerir.
  </footer>
</div>
`;

fs.writeFileSync(cikisYolu, html, "utf-8");
console.log(`HTML rapor yazıldı: ${cikisYolu} (${(html.length / 1024).toFixed(1)} KB)`);
