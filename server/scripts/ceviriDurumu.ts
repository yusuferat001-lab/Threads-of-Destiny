/**
 * Olay çeviri kapsamı + sürüklenme (drift) kontrolü.
 *   npx tsx scripts/ceviriDurumu.ts          → özet + uyarılar
 *   npx tsx scripts/ceviriDurumu.ts --full   → dosya dosya döküm
 *
 * Kontroller:
 *  - Her çeviri id'si gerçek bir olaya karşılık geliyor mu?
 *  - `secenekler` dizi uzunluğu kaynak olayın seçenek sayısını AŞIYOR mu?
 *  - Kaç olay/dize çevrildi (kapsam yüzdesi).
 */
import { OLAY_BANKASI } from "../src/data/olaylar";
import { OLAY_SOSYALLESME } from "../src/data/olaylar/sosyallesme";
import { olayCevirisiGetir, tumCeviriIdleri } from "../src/i18n/olaylar";

const full = process.argv.includes("--full");
const tumOlaylar = [...OLAY_BANKASI, ...OLAY_SOSYALLESME];
const olayById = new Map(tumOlaylar.map((o) => [o.id, o]));

// Toplam çevrilebilir dize sayısı (kaynak).
function olayDizeSayisi(o: (typeof tumOlaylar)[number]): number {
  let n = 2; // baslik + metin
  for (const s of o.secenekler) {
    n += 1; // metin
    if (s.kilitAciklamasi) n += 1;
    n += 1 + (s.basariliSonuc.detay ? 1 : 0);
    n += 1 + (s.basarisizSonuc.detay ? 1 : 0);
    if (s.onTepki) n += 3;
  }
  return n;
}

let kapsananOlay = 0;
let toplamDize = 0;
let cevriliDize = 0;
const uyarilar: string[] = [];

for (const o of tumOlaylar) {
  const src = olayDizeSayisi(o);
  toplamDize += src;
  const c = olayCevirisiGetir(o.id);
  if (!c) continue;
  kapsananOlay += 1;

  let cev = 0;
  if (c.baslik !== undefined) cev += 1;
  if (c.metin !== undefined) cev += 1;
  if (c.secenekler) {
    if (c.secenekler.length > o.secenekler.length) {
      uyarilar.push(`${o.id}: çeviride ${c.secenekler.length} seçenek var, kaynakta ${o.secenekler.length}`);
    }
    c.secenekler.forEach((sc, i) => {
      if (!sc) return;
      const src = o.secenekler[i];
      if (!src) return;
      if (sc.metin !== undefined) cev += 1;
      if (sc.kilitAciklamasi !== undefined) cev += 1;
      if (sc.basariliSonuc?.mesaj !== undefined) cev += 1;
      if (sc.basariliSonuc?.detay !== undefined) cev += 1;
      if (sc.basarisizSonuc?.mesaj !== undefined) cev += 1;
      if (sc.basarisizSonuc?.detay !== undefined) cev += 1;
      if (sc.onTepki) cev += 3;
    });
  }
  cevriliDize += Math.min(cev, src);
  if (full) console.log(`  ${o.id}: ~${cev}/${src} dize`);
}

// Kayıtta olup gerçek bir olaya karşılık gelmeyen id'ler (yetim / drift).
const bilinenIdler = new Set(tumOlaylar.map((o) => o.id));
const yetimIdler = tumCeviriIdleri().filter((id) => !bilinenIdler.has(id));
for (const id of yetimIdler) {
  uyarilar.push(`yetim çeviri id'si (kaynağı yok): ${id}`);
}

console.log("\n=== Olay Çeviri Durumu ===");
console.log(`Toplam olay        : ${tumOlaylar.length}`);
console.log(`Çeviri kaydı olan   : ${kapsananOlay} (%${((kapsananOlay / tumOlaylar.length) * 100).toFixed(1)})`);
console.log(`Çevrilebilir dize   : ~${toplamDize}`);
console.log(`Çevrilmiş dize      : ~${cevriliDize} (%${((cevriliDize / toplamDize) * 100).toFixed(1)})`);
if (uyarilar.length) {
  console.log(`\n⚠️  ${uyarilar.length} uyarı:`);
  for (const u of uyarilar) console.log("  - " + u);
  process.exit(1);
}
console.log("\n✅ Sürüklenme yok.");
