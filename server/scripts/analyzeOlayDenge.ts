/**
 * GEÇİCİ analiz script'i — olay seçeneklerindeki denge sorunlarını bulur:
 *  1. INERT    : bir seçeneğin hem başarı hem başarısızlık dalı stat/etki içermiyor (salt mesaj).
 *  2. ZAYIF_DAL: başarı dalı var ama toplam stat etkisi ~0 ve hiçbir bayrak yok.
 *  3. BEDAVA_PARA: başarı dalı para>=+12 verirken ahlak/mutluluk/sağlık/ün hiç düşmüyor (takas yok),
 *                 ve başarısızlık cezası küçük.
 *  4. EZICI    : bir seçenek beklenen değerde diğerini 5 statın hepsinde >= ve en az birinde +4 geçiyor,
 *                 ölüm/olumsuz bayrak eklemiyor ve başarı şansı diğerinden düşük değil.
 *
 * Çıktı: scratchpad/olay-denge-raporu.json + konsola özet.
 */
import { OLAY_BANKASI } from "../src/data/olaylar/index";
import type { OlaySecenegi, OlayTanimi } from "../src/data/olaylar/types";
import type { SonucEtkisi } from "../src/types";
import * as fs from "fs";

const STAT_ALANLAR = ["para", "un", "ahlak", "saglik", "mutluluk"] as const;
type Stat = (typeof STAT_ALANLAR)[number];

const BAYRAK_ALANLAR: (keyof SonucEtkisi)[] = [
  "yeni_meslek", "olum", "olum_sansi", "etiket_ekle", "etiket_sil", "durum_ekle", "durum_sil",
  "ulke_etkisi", "maas_carpani", "dost_puani", "rakip_puani", "es_ata", "es_puani", "es_kaybet",
  "cocuk_ekle", "cocuk_kaybet", "zorunlu_sonraki", "ekip_ekle", "ekip_kaybi", "ekip_sil",
  "hizip_ata", "ordu_techizat_artis", "ticaret_sermaye_artis", "nufuz_artis", "suc_artis",
  "suc_seviyesi_ayarla", "para_sifirla", "un_sifirla", "para_yuzde_kaybet", "yerlesim_zorla",
  "mulk_kaybet", "evcil_hayvan_edin", "evcil_hayvan_kaybet", "unvan_kazan", "kriz_baslat",
  "efsanevi_olum", "sehir_yonetim_artis", "kariyer_puani_artis", "hapis_ceza_artis", "veba_koruma",
];

function statSum(e: SonucEtkisi): number {
  return STAT_ALANLAR.reduce((a, s) => a + Math.abs(e[s] ?? 0), 0);
}
function bayrakVar(e: SonucEtkisi): boolean {
  return BAYRAK_ALANLAR.some((k) => {
    const v = e[k];
    if (v === undefined || v === null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (v === false) return false;
    return true;
  });
}
function vec(e: SonucEtkisi): Record<Stat, number> {
  const o = {} as Record<Stat, number>;
  for (const s of STAT_ALANLAR) o[s] = e[s] ?? 0;
  return o;
}
function beklenen(sec: OlaySecenegi): Record<Stat, number> {
  const p = Math.max(0, Math.min(100, sec.baseBasariSansi ?? 100)) / 100;
  const a = vec(sec.basariliSonuc);
  const b = vec(sec.basarisizSonuc);
  const o = {} as Record<Stat, number>;
  for (const s of STAT_ALANLAR) o[s] = p * a[s] + (1 - p) * b[s];
  return o;
}
function olumRiski(sec: OlaySecenegi): boolean {
  for (const e of [sec.basariliSonuc, sec.basarisizSonuc]) {
    if (e.olum) return true;
    if ((e.olum_sansi ?? 0) > 0) return true;
  }
  return false;
}

type Bulgu = { tur: string; olayId: string; dosyaIpucu: string; secIndex: number; not: string };
const bulgular: Bulgu[] = [];

// Hangi olay hangi dosyada — id -> dosya kestirimi için kaba tarama
const DOSYALAR = fs.readdirSync(__dirname + "/../src/data/olaylar").filter((f) => f.endsWith(".ts") && !f.endsWith("index.ts") && !f.endsWith("types.ts"));
const idDosya = new Map<string, string>();
for (const f of DOSYALAR) {
  const txt = fs.readFileSync(__dirname + "/../src/data/olaylar/" + f, "utf8");
  const re = /id:\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(txt))) if (!idDosya.has(m[1])) idDosya.set(m[1], f);
}

function gorunurSecenekler(o: OlayTanimi): { sec: OlaySecenegi; idx: number }[] {
  return o.secenekler
    .map((sec, idx) => ({ sec, idx }))
    .filter(({ sec }) => !sec.onTepki && !sec.gerekliKisilik && !sec.gerekliEksen);
}

for (const o of OLAY_BANKASI) {
  const dosya = idDosya.get(o.id) ?? "?";
  const secler = gorunurSecenekler(o);
  if (secler.length < 2) continue;

  // 1 + 2: inert / zayıf dal
  for (const { sec, idx } of secler) {
    if (sec.ekipKalitesiZarBelirler) continue;
    const aStat = statSum(sec.basariliSonuc), bStat = statSum(sec.basarisizSonuc);
    const aBay = bayrakVar(sec.basariliSonuc), bBay = bayrakVar(sec.basarisizSonuc);
    if (aStat === 0 && bStat === 0 && !aBay && !bBay) {
      bulgular.push({ tur: "INERT", olayId: o.id, dosyaIpucu: dosya, secIndex: idx, not: `"${sec.metin.slice(0, 50)}" hiçbir etki yok` });
    } else if (aStat <= 2 && !aBay && (sec.baseBasariSansi ?? 100) < 100) {
      bulgular.push({ tur: "ZAYIF_BASARI", olayId: o.id, dosyaIpucu: dosya, secIndex: idx, not: `"${sec.metin.slice(0, 50)}" başarı dalı ~etkisiz (statSum ${aStat})` });
    }
  }

  // 3: bedava para
  for (const { sec, idx } of secler) {
    const a = sec.basariliSonuc;
    const para = a.para ?? 0;
    if (para >= 12 && (a.ahlak ?? 0) >= 0 && (a.mutluluk ?? 0) >= 0 && (a.saglik ?? 0) >= 0 && (a.un ?? 0) >= 0) {
      const bekl = beklenen(sec);
      const toplamNegatif = STAT_ALANLAR.reduce((s, k) => s + Math.min(0, bekl[k]), 0);
      const olum = olumRiski(sec);
      if (!olum && toplamNegatif > -6) {
        bulgular.push({ tur: "BEDAVA_PARA", olayId: o.id, dosyaIpucu: dosya, secIndex: idx, not: `"${sec.metin.slice(0, 46)}" para +${para}, takas yok (bekl.negatif ${toplamNegatif.toFixed(1)})` });
      }
    }
  }

  // 4: ezici seçenek (yalnız 2-3 seçenekli olaylarda anlamlı çiftler)
  for (let i = 0; i < secler.length; i++) {
    for (let j = 0; j < secler.length; j++) {
      if (i === j) continue;
      const A = secler[i], B = secler[j];
      if (A.sec.ekipKalitesiZarBelirler || B.sec.ekipKalitesiZarBelirler) continue;
      if (A.sec.maliyet || A.sec.gerekliEtiketler || A.sec.minUn || A.sec.minAhlak) continue;
      const va = beklenen(A.sec), vb = beklenen(B.sec);
      let hepsiGE = true, enAzBirBuyuk = false;
      for (const s of STAT_ALANLAR) {
        if (va[s] < vb[s] - 0.5) hepsiGE = false;
        if (va[s] > vb[s] + 4) enAzBirBuyuk = true;
      }
      const aOlum = olumRiski(A.sec), bOlum = olumRiski(B.sec);
      const sansOk = (A.sec.baseBasariSansi ?? 100) >= (B.sec.baseBasariSansi ?? 100) - 5;
      if (hepsiGE && enAzBirBuyuk && sansOk && (!aOlum || bOlum)) {
        // B tarafında telafi edici bir bayrak (etiket/meslek/ittifak) yoksa gerçekten eziktir
        const bTelafi = bayrakVar(B.sec.basariliSonuc);
        bulgular.push({
          tur: "EZICI",
          olayId: o.id, dosyaIpucu: dosya, secIndex: A.idx,
          not: `sec#${A.idx} "${A.sec.metin.slice(0, 34)}" >> sec#${B.idx} "${B.sec.metin.slice(0, 34)}"${bTelafi ? " (B'de bayrak var)" : ""}`,
        });
      }
    }
  }
}

const ozet: Record<string, number> = {};
for (const b of bulgular) ozet[b.tur] = (ozet[b.tur] ?? 0) + 1;

const cikti = { toplamOlay: OLAY_BANKASI.length, ozet, bulgular };
const yol = __dirname + "/../../../../AppData/Local/Temp/claude/C--Users-pc-Desktop-Threads-of-Destiny-main/86eaddc4-bc00-4ad2-82fb-3452b3a69435/scratchpad/olay-denge-raporu.json";
try {
  fs.writeFileSync(yol, JSON.stringify(cikti, null, 2));
} catch {
  fs.writeFileSync(__dirname + "/olay-denge-raporu.json", JSON.stringify(cikti, null, 2));
}
console.log("Toplam olay:", OLAY_BANKASI.length);
console.log("Özet:", ozet);
console.log("Toplam bulgu:", bulgular.length);
for (const t of Object.keys(ozet)) {
  console.log("\n=== " + t + " (ilk 15) ===");
  bulgular.filter((b) => b.tur === t).slice(0, 15).forEach((b) => console.log(`  [${b.dosyaIpucu}] ${b.olayId} #${b.secIndex}: ${b.not}`));
}
