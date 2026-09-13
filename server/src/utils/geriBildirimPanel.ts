import type { GeriBildirimKaydi } from "./geriBildirimDeposu";

/**
 * `GET /api/geri-bildirim/panel?key=…` için tek-dosya, bağımlılıksız HTML özet.
 * `istatistikPanel.ts` ile aynı desen — inline `<script>` YOK, sunucuda render edilir.
 */

function kacar(s: string): string {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

const KATEGORI_ETIKET: Record<string, string> = {
  hata: "🐞 Hata",
  oneri: "💡 Öneri",
  diger: "💬 Diğer",
};

export function geriBildirimPaneliHtml(kayitlar: GeriBildirimKaydi[]): string {
  const satirlar = kayitlar
    .map((k) => {
      const baglamGirdileri = Object.entries(k.baglam ?? {}).filter(
        ([, v]) => v !== null && v !== undefined && v !== ""
      );
      const baglamStr = baglamGirdileri
        .map(([bk, bv]) => `${kacar(bk)}=${kacar(String(bv))}`)
        .join(" · ");
      return `<div class="kayit">
        <div class="kayit-ust">
          <span class="etiket etiket-${kacar(k.kategori)}">${kacar(
            KATEGORI_ETIKET[k.kategori] ?? k.kategori
          )}</span>
          <span class="tarih">${kacar(k.tarih.slice(0, 19).replace("T", " "))}</span>
        </div>
        <div class="mesaj">${kacar(k.mesaj)}</div>
        ${k.iletisim ? `<div class="iletisim">↳ iletişim: ${kacar(k.iletisim)}</div>` : ""}
        ${baglamStr ? `<div class="baglam">${baglamStr}</div>` : ""}
      </div>`;
    })
    .join("");

  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kader Çarkı — Geri Bildirimler</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 1.2rem; background: #14100b; color: #e7dcc3;
    font: 14px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 780px; }
  h1 { font-size: 1.3rem; margin: 0 0 .2rem; color: #e0c789; }
  .zaman { color: #9c8f70; font-size: .8rem; margin-bottom: 1.4rem; }
  .kayit { background: #201810; border: 1px solid #3a2f1e; border-radius: 8px;
    padding: .8rem .9rem; margin-bottom: .7rem; }
  .kayit-ust { display: flex; justify-content: space-between; align-items: center;
    margin-bottom: .4rem; }
  .etiket { font-size: .72rem; font-weight: 700; padding: .15rem .5rem; border-radius: 999px;
    background: #3a2f1e; color: #d8c9a3; }
  .etiket-hata { background: #4a2016; color: #f0a98c; }
  .etiket-oneri { background: #1e3a2a; color: #8cf0c0; }
  .tarih { color: #9c8f70; font-size: .76rem; font-variant-numeric: tabular-nums; }
  .mesaj { white-space: pre-wrap; word-break: break-word; }
  .iletisim { margin-top: .35rem; font-size: .82rem; color: #b9a66b; }
  .baglam { margin-top: .35rem; font-size: .72rem; color: #7a6f56; word-break: break-word; }
  .not { color: #9c8f70; font-size: .78rem; margin-top: 1rem; }
</style></head><body>
<h1>Kader Çarkı — Geri Bildirimler</h1>
<div class="zaman">${kayitlar.length} kayıt (en yeni üstte)</div>
${satirlar || `<p class="not">Henüz kayıt yok.</p>`}
<p class="not">Ham JSON: <code>/api/geri-bildirim?key=…</code></p>
</body></html>`;
}
