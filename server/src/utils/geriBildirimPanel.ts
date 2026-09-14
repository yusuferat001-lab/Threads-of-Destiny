import type { GeriBildirimKaydi } from "./geriBildirimDeposu";

/**
 * `GET /api/geri-bildirim/panel?key=…` için tek-dosya, bağımlılıksız HTML özet.
 *
 * `istatistikPanel.ts` ile aynı desen: tamamen sunucuda render edilir, inline
 * `<script>` YOK (helmet CSP `script-src 'self'` inline script'i bloklar).
 */

function kacar(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

function kart(baslik: string, deger: string | number): string {
  return `<div class="kart"><div class="kart-deger">${kacar(String(deger))}</div><div class="kart-baslik">${kacar(baslik)}</div></div>`;
}

const KATEGORI_ETIKET: Record<string, string> = {
  hata: "🐞 Hata",
  oneri: "💡 Öneri",
  diger: "💬 Diğer",
};

export function geriBildirimPaneliHtml(kayitlar: GeriBildirimKaydi[]): string {
  const toplam = kayitlar.length;
  const sayilar: Record<string, number> = {};
  for (const k of kayitlar) sayilar[k.kategori] = (sayilar[k.kategori] ?? 0) + 1;

  const kartlarHtml = ["hata", "oneri", "diger"]
    .map((kat) => kart(KATEGORI_ETIKET[kat] ?? kat, sayilar[kat] ?? 0))
    .join("");

  const satirlar = kayitlar
    .map((k) => {
      const baglamGirdileri = Object.entries(k.baglam ?? {}).filter(
        ([, v]) => v !== null && v !== undefined && v !== ""
      );
      const baglamOzet = baglamGirdileri.length
        ? baglamGirdileri.map(([bk, bv]) => `${kacar(bk)}=${kacar(String(bv))}`).join(" · ")
        : "";
      return `<tr>
        <td class="tarih">${kacar(k.tarih.slice(0, 19).replace("T", " "))}</td>
        <td><span class="etiket etiket-${kacar(k.kategori)}">${kacar(KATEGORI_ETIKET[k.kategori] ?? k.kategori)}</span></td>
        <td class="mesaj">${kacar(k.mesaj)}</td>
        <td>${k.iletisim ? kacar(k.iletisim) : "<span class=\"yok\">—</span>"}</td>
        <td class="baglam">${baglamOzet ? kacar(baglamOzet) : "<span class=\"yok\">—</span>"}</td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kader Çarkı — Geri Bildirim</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 1.2rem; background: #14100b; color: #e7dcc3;
    font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  h1 { font-size: 1.3rem; margin: 0 0 .2rem; color: #e0c789; }
  .zaman { color: #9c8f70; font-size: .8rem; margin-bottom: 1.4rem; }
  h2 { font-size: 1rem; margin: 1.8rem 0 .6rem; color: #c9a227;
    border-bottom: 1px solid #3a2f1e; padding-bottom: .3rem; }
  .kartlar { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: .6rem; max-width: 500px; }
  .kart { background: #201810; border: 1px solid #3a2f1e; border-radius: 8px; padding: .7rem .8rem; }
  .kart-deger { font-size: 1.4rem; font-weight: 700; color: #f0d98c; }
  .kart-baslik { font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; color: #9c8f70; }
  table { border-collapse: collapse; width: 100%; margin: .3rem 0 1rem; font-size: .82rem; }
  th, td { text-align: left; padding: .45rem .6rem; border-bottom: 1px solid #2b2216; vertical-align: top; }
  th { color: #9c8f70; font-weight: 600; text-transform: uppercase; font-size: .68rem; letter-spacing: .05em; }
  td.tarih { white-space: nowrap; color: #b9a66b; font-variant-numeric: tabular-nums; }
  td.mesaj { max-width: 420px; white-space: pre-wrap; }
  td.baglam { max-width: 260px; color: #9c8f70; font-size: .76rem; }
  .yok { color: #5a5040; }
  .etiket { display: inline-block; padding: .1rem .5rem; border-radius: 999px; font-size: .74rem; white-space: nowrap; }
  .etiket-hata { background: #3a1a16; color: #f0a08c; }
  .etiket-oneri { background: #1c3320; color: #a3e0b0; }
  .etiket-diger { background: #241f34; color: #c3b8ec; }
  .not { color: #9c8f70; font-size: .78rem; }
</style></head><body>
<h1>Kader Çarkı — Geri Bildirim</h1>
<div class="zaman">Son ${toplam} kayıt (en yeni üstte)</div>

<div class="kartlar">${kartlarHtml}</div>

<h2>Kayıtlar</h2>
<table><thead><tr><th>Tarih</th><th>Kategori</th><th>Mesaj</th><th>İletişim</th><th>Bağlam</th></tr></thead>
<tbody>${satirlar || `<tr><td colspan="5">Kayıt yok</td></tr>`}</tbody></table>

<p class="not">Ham JSON: <code>/api/geri-bildirim?key=…</code></p>
</body></html>`;
}
