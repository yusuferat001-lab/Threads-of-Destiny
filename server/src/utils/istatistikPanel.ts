import type { IstatistikOzeti } from "../db/metrikRepository";

/**
 * `GET /api/istatistik/panel?key=…` için tek-dosya, bağımlılıksız HTML özet.
 *
 * Tamamen sunucuda render edilir — inline `<script>` YOK (helmet CSP `script-src
 * 'self'` inline script'i bloklar; inline `<style>` `'unsafe-inline'` ile serbest).
 * Mini çubuklar `width: %` verilen `<div>`'lerle çizilir.
 */

function kacar(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function bar(deger: number, maks: number): string {
  const yuzde = maks > 0 ? Math.round((deger / maks) * 100) : 0;
  return `<div class="bar"><div class="bar-dolu" style="width:${yuzde}%"></div></div>`;
}

function kart(baslik: string, deger: string | number, alt = ""): string {
  return `<div class="kart"><div class="kart-deger">${kacar(String(deger))}</div><div class="kart-baslik">${kacar(baslik)}</div>${alt ? `<div class="kart-alt">${kacar(alt)}</div>` : ""}</div>`;
}

function dagilimTablosu(
  baslik: string,
  veri: Record<string, Record<string, number>>,
  sutunlar: string[]
): string {
  const satirlar = Object.entries(veri)
    .sort((a, b) => {
      const at = Object.values(a[1]).reduce((t, n) => t + n, 0);
      const bt = Object.values(b[1]).reduce((t, n) => t + n, 0);
      return bt - at;
    })
    .map(
      ([ad, degerler]) =>
        `<tr><td>${kacar(ad || "—")}</td>${sutunlar
          .map((s) => `<td class="say">${degerler[s] ?? 0}</td>`)
          .join("")}</tr>`
    )
    .join("");
  return `<h3>${kacar(baslik)}</h3><table><thead><tr><th>Değer</th>${sutunlar
    .map((s) => `<th class="say">${kacar(s)}</th>`)
    .join("")}</tr></thead><tbody>${satirlar || `<tr><td colspan="${sutunlar.length + 1}">Kayıt yok</td></tr>`}</tbody></table>`;
}

export function istatistikPaneliHtml(o: IstatistikOzeti): string {
  const s = o.sayilar;
  const seriMaks = Math.max(
    1,
    ...o.gunlukSeri.map((g) => g.yeniOyun + g.olum)
  );
  const seri = o.gunlukSeri
    .map(
      (g) =>
        `<tr><td>${kacar(g.gun.slice(5))}</td><td class="say">${g.ziyaret}</td><td class="say">${g.yeniOyun}</td><td class="say">${g.olum}</td><td>${bar(g.yeniOyun + g.olum, seriMaks)}</td></tr>`
    )
    .join("");

  const olumMaks = Math.max(1, ...o.enSikOlumNedenleri.map((x) => x.adet));
  const olumNedenleri = o.enSikOlumNedenleri
    .map(
      (x) =>
        `<tr><td>${kacar(x.ad || "—")}</td><td class="say">${x.adet}</td><td>${bar(x.adet, olumMaks)}</td></tr>`
    )
    .join("");

  const sonKayitlar = o.sonKayitlar
    .map(
      (k) =>
        `<tr><td>${kacar(k.tarih.slice(0, 19).replace("T", " "))}</td><td>${kacar(k.tur)}</td><td>${kacar(k.cag)}</td><td>${kacar(k.bolge)}</td><td>${kacar(k.meslek)}</td><td class="say">${k.yas || ""}</td><td class="say">${k.skor || ""}</td></tr>`
    )
    .join("");

  const sure = o.oyunIciSure;
  const gz = o.gercekZamanOturumDk;

  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kader Çarkı — İstatistik</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 1.2rem; background: #14100b; color: #e7dcc3;
    font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  h1 { font-size: 1.3rem; margin: 0 0 .2rem; color: #e0c789; }
  .zaman { color: #9c8f70; font-size: .8rem; margin-bottom: 1.4rem; }
  h2 { font-size: 1rem; margin: 1.8rem 0 .6rem; color: #c9a227;
    border-bottom: 1px solid #3a2f1e; padding-bottom: .3rem; }
  h3 { font-size: .9rem; margin: 1rem 0 .4rem; color: #d8c9a3; }
  .kartlar { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: .6rem; }
  .kart { background: #201810; border: 1px solid #3a2f1e; border-radius: 8px; padding: .7rem .8rem; }
  .kart-deger { font-size: 1.4rem; font-weight: 700; color: #f0d98c; }
  .kart-baslik { font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; color: #9c8f70; }
  .kart-alt { font-size: .75rem; color: #b9a66b; margin-top: .2rem; }
  table { border-collapse: collapse; width: 100%; margin: .3rem 0 1rem; font-size: .82rem; }
  th, td { text-align: left; padding: .32rem .5rem; border-bottom: 1px solid #2b2216; }
  th { color: #9c8f70; font-weight: 600; text-transform: uppercase; font-size: .68rem; letter-spacing: .05em; }
  td.say, th.say { text-align: right; font-variant-numeric: tabular-nums; }
  .bar { background: #2b2216; border-radius: 4px; height: 9px; width: 120px; overflow: hidden; }
  .bar-dolu { background: linear-gradient(90deg, #9c6b1e, #e0c789); height: 100%; }
  .ikili { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0 1.5rem; }
  .not { color: #9c8f70; font-size: .78rem; }
</style></head><body>
<h1>Kader Çarkı — İstatistik Özeti</h1>
<div class="zaman">Üretildi: ${kacar(o.uretilmeZamani.slice(0, 19).replace("T", " "))} · ${o.toplamKayit} metrik kaydı</div>

<h2>Genel</h2>
<div class="kartlar">
  ${kart("Tekil kişi", s.tekilKisi, "farklı istemci id")}
  ${kart("Ziyaret", s.ziyaret)}
  ${kart("Başlatılan oyun", s.yeniOyun)}
  ${kart("Meslek seçimi", s.meslekSecim)}
  ${kart("Ölüm (biten hayat)", s.olum)}
  ${kart("Skor kaydı", s.skorKaydi)}
  ${kart("Tamamlanma", `%${Math.round(o.tamamlanmaOrani * 100)}`, "ölüm / başlatılan")}
  ${kart("Borçlu ölüm", `%${Math.round(o.servet.borcluOlumOrani * 100)}`)}
</div>

<h2>Oynanan süre</h2>
<div class="ikili">
  <div>
    <h3>Oyun-içi (yıl / tur)</h3>
    <div class="kartlar">
      ${kart("Ort. tur", sure.turSayisi.ortalama)}
      ${kart("Medyan tur", sure.turSayisi.medyan)}
      ${kart("Ort. yaş", sure.yas.ortalama)}
      ${kart("En uzun yaş", sure.yas.maks)}
    </div>
  </div>
  <div>
    <h3>Gerçek zaman (dakika)</h3>
    <div class="kartlar">
      ${kart("Ortalama", gz.ortalama)}
      ${kart("Medyan", gz.medyan)}
      ${kart("En uzun", gz.maks)}
      ${kart("Ölçülen", gz.adet, "oturum")}
    </div>
  </div>
</div>

<h2>Servet & Skor (ölümde)</h2>
<div class="ikili">
  <div><h3>Servet</h3><div class="kartlar">
    ${kart("Ortalama", o.servet.ortalama)}
    ${kart("Medyan", o.servet.medyan)}
    ${kart("En yüksek", o.servet.maks)}
  </div></div>
  <div><h3>Skor</h3><div class="kartlar">
    ${kart("Ortalama", o.skor.ortalama)}
    ${kart("Medyan", o.skor.medyan)}
    ${kart("En yüksek", o.skor.maks)}
  </div></div>
</div>

<h2>Dağılımlar</h2>
${dagilimTablosu("Çağ", o.dagilim.cag, ["yeniOyun", "olum"])}
${dagilimTablosu("Bölge", o.dagilim.bolge, ["yeniOyun", "olum"])}
${dagilimTablosu("Meslek", o.dagilim.meslek, ["secim", "olum"])}
${dagilimTablosu("Yerleşim", o.dagilim.yerlesim, ["yeniOyun", "olum"])}

<h2>En sık ölüm nedenleri</h2>
<table><thead><tr><th>Neden</th><th class="say">Adet</th><th></th></tr></thead>
<tbody>${olumNedenleri || `<tr><td colspan="3">Kayıt yok</td></tr>`}</tbody></table>

<h2>Son 30 gün</h2>
<table><thead><tr><th>Gün</th><th class="say">Ziyaret</th><th class="say">Yeni</th><th class="say">Ölüm</th><th></th></tr></thead>
<tbody>${seri}</tbody></table>

<h2>Son kayıtlar</h2>
<table><thead><tr><th>Tarih</th><th>Tür</th><th>Çağ</th><th>Bölge</th><th>Meslek</th><th class="say">Yaş</th><th class="say">Skor</th></tr></thead>
<tbody>${sonKayitlar || `<tr><td colspan="7">Kayıt yok</td></tr>`}</tbody></table>

<p class="not">Ham JSON: <code>/api/istatistik?key=…</code></p>
</body></html>`;
}
