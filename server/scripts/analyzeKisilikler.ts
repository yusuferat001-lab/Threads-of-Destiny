/**
 * simulateKisilikler.ts'in ham JSON çıktısını (simulateKisilikler.sonuc.json) özetler.
 *
 * Üç kırılım:
 *   1. genelOzet            — tüm ömürler.
 *   2. kisilikOzetleri      — 7 kişilik bazında ortalamalar + ölüm nedeni dağılımı + mekanik kullanımı.
 *   3. kisilikCagMeslek     — 7 × 2 × 3 = 42 alt grup ortalamaları.
 * Ayrıca kisilikKarsilastirma: her kişiliğin kilit metriklerini yan yana koyan tek tablo,
 * ve ekstremler: global en yüksek/en düşük yaş/para/skor/ün kayıtları tüm bağlamıyla.
 *
 * Çıktı: scripts/simulateKisilikler.analiz.json + konsola karşılaştırma tablosu.
 */
import fs from "fs";
import path from "path";

const girisYolu = path.join(__dirname, "simulateKisilikler.sonuc.json");
if (!fs.existsSync(girisYolu)) {
  console.error(`Bulunamadı: ${girisYolu}\nÖnce simülasyonu çalıştır: npx tsx scripts/simulateKisilikler.ts`);
  process.exit(1);
}
const kayitlar: any[] = JSON.parse(fs.readFileSync(girisYolu, "utf-8"));

function ort(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}
function medyan(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function yuzde(n: number, toplam: number): number {
  return toplam ? Math.round((n / toplam) * 1000) / 10 : 0;
}
function yuvarla(x: number, basamak = 2): number {
  const k = 10 ** basamak;
  return Math.round(x * k) / k;
}

const SAYISAL_ALANLAR = [
  "yas",
  "para",
  "ahlak",
  "un",
  "mutluluk",
  "saglik",
  "suc_seviyesi",
  "skor",
  "tur_sayisi",
  "cocuk_sayisi",
  "yasayan_cocuk_sayisi",
  "mulk_sayisi",
  "unvan_sayisi",
  "rutbe_seviye",
  "pazar_payi",
  "meslek_gucu",
  "sehir_yonetim_seviyesi",
  "borclu_tur_sayisi",
  "yatirimSayisi",
  "mulkSatinAlmaSayisi",
  "magazaSifaSayisi",
  "magazaLuksSayisi",
  "envanterKullanSayisi",
  "zarSayisi",
  "zarKazanma",
  "sosyallesmeSayisi",
  "konutDegisimSayisi",
  "yasamDegisimSayisi",
  "kendiIsHarcanan",
  "mulkHarcanan",
  "gayrimenkulDegeri_son",
  "en_dusuk_saglik",
  "en_dusuk_para",
  "en_yuksek_para",
];

const KONUT_SIRA = ["nemli_baraka", "mutevazi_yuva", "sicak_ocak", "saglam_konut", "gorkemli_konak"];
const YASAM_SIRA = ["bayat_artik", "sade_sofra", "keyifli_sofra", "dengeli_sofra", "solen_sofrasi"];

function grupOzeti(kayit: any[]) {
  const n = kayit.length;
  const ozet: Record<string, number> = { n };
  for (const alan of SAYISAL_ALANLAR) {
    ozet[alan] = yuvarla(ort(kayit.map((k) => k[alan] ?? 0)));
  }
  ozet.yasMedyan = medyan(kayit.map((k) => k.yas));
  ozet.paraMedyan = yuvarla(medyan(kayit.map((k) => k.para)));
  ozet.skorMedyan = Math.round(medyan(kayit.map((k) => k.skor)));

  ozet.evlilikOrani = yuzde(kayit.filter((k) => k.evliydi).length, n);
  ozet.borcluOldu = yuzde(kayit.filter((k) => k.borclu).length, n);
  ozet.hayatAmaciTamamlama = yuzde(kayit.filter((k) => k.hayat_amaci_tamamlandi).length, n);
  ozet.ayyasOldu = yuzde(kayit.filter((k) => k.ayyas).length, n);
  ozet.kacakOldu = yuzde(kayit.filter((k) => k.kacakti).length, n);
  ozet.hapisteOldu = yuzde(kayit.filter((k) => k.hapisteydi).length, n);
  ozet.vebaGecirdi = yuzde(kayit.filter((k) => k.veba_gecirdi).length, n);
  ozet.savastaOldu = yuzde(kayit.filter((k) => k.savastaydi).length, n);
  ozet.mulkSahibiOldu = yuzde(kayit.filter((k) => k.mulk_sayisi > 0).length, n);
  ozet.efsaneviOlum = yuzde(kayit.filter((k) => k.efsanevi_olum).length, n);
  ozet.rutbe3Orani = yuzde(kayit.filter((k) => k.rutbe_seviye >= 3).length, n);
  ozet.rutbe4Orani = yuzde(kayit.filter((k) => k.rutbe_seviye >= 4).length, n);
  ozet.rutbe5Orani = yuzde(kayit.filter((k) => k.rutbe_seviye >= 5).length, n);
  for (let s = 1; s <= 5; s++) {
    ozet[`rutbeS${s}Pay`] = yuzde(kayit.filter((k) => k.rutbe_seviye === s).length, n);
  }
  ozet.genc60AltiOlum = yuzde(kayit.filter((k) => k.yas < 60).length, n);
  ozet.uzun80UstuYasam = yuzde(kayit.filter((k) => k.yas >= 80).length, n);
  ozet.zenginBittiOrani = yuzde(kayit.filter((k) => k.para >= 300).length, n);

  ozet.zarKazanmaOrani = yuzde(
    kayit.reduce((a, k) => a + k.zarKazanma, 0),
    Math.max(1, kayit.reduce((a, k) => a + k.zarSayisi, 0))
  );

  // Ev/sofra kademe ortalaması (index olarak; yüksek = daha lüks yaşadı)
  ozet.konutKademeOrt = yuvarla(ort(kayit.map((k) => Math.max(0, KONUT_SIRA.indexOf(k.konut_id_son)))));
  ozet.sofraKademeOrt = yuvarla(ort(kayit.map((k) => Math.max(0, YASAM_SIRA.indexOf(k.yasam_secimi_id_son)))));

  return ozet;
}

function olumNedeniDagilimi(kayit: any[], ustSinir = 8) {
  const sayac: Record<string, number> = {};
  for (const k of kayit) {
    const anahtar = (k.olum_nedeni ?? "Bilinmiyor").split(/[.!]/)[0].trim().slice(0, 60);
    sayac[anahtar] = (sayac[anahtar] ?? 0) + 1;
  }
  return Object.entries(sayac)
    .sort((a, b) => b[1] - a[1])
    .slice(0, ustSinir)
    .map(([neden, adet]) => ({ neden, adet, yuzde: yuzde(adet, kayit.length) }));
}

const KISILIK_SIRA = ["garantici", "cimri", "suclu", "luks", "kaotik", "survival", "para", "cesur"];
const KISILIK_AD: Record<string, string> = {
  garantici: "Garantici",
  cimri: "Cimri",
  suclu: "Suçlu",
  luks: "Lüks Düşkünü",
  kaotik: "Dengesiz Kaotik",
  survival: "Maks Hayatta Kalma",
  para: "Maks Para Odaklı",
  cesur: "Cesur",
};
const CAGLAR = ["Orta Çağ", "Sanayi Devrimi"];
const MESLEKLER = ["Asker", "Tüccar", "Din Adamı"];

const mevcutKisilikler = KISILIK_SIRA.filter((kid) => kayitlar.some((k) => k.kisilik === kid));

const kisilikOzetleri: Record<string, any> = {};
for (const kid of mevcutKisilikler) {
  const altKume = kayitlar.filter((k) => k.kisilik === kid);
  kisilikOzetleri[kid] = {
    ad: KISILIK_AD[kid] ?? kid,
    ozet: grupOzeti(altKume),
    olumNedenleri: olumNedeniDagilimi(altKume),
  };
}

const kisilikCagMeslek: Record<string, any> = {};
for (const kid of mevcutKisilikler) {
  for (const cag of CAGLAR) {
    for (const meslek of MESLEKLER) {
      const altKume = kayitlar.filter((k) => k.kisilik === kid && k.cag === cag && k.meslek === meslek);
      if (!altKume.length) continue;
      kisilikCagMeslek[`${kid}|${cag}|${meslek}`] = {
        kisilik: kid,
        cag,
        meslek,
        ozet: grupOzeti(altKume),
        olumNedenleri: olumNedeniDagilimi(altKume, 4),
      };
    }
  }
}

// Yan yana karşılaştırma tablosu (en okunası kilit metrikler)
const KARSILASTIRMA_ALANLARI = [
  "n",
  "yas",
  "yasMedyan",
  "uzun80UstuYasam",
  "para",
  "paraMedyan",
  "en_yuksek_para",
  "skor",
  "skorMedyan",
  "un",
  "ahlak",
  "mutluluk",
  "saglik",
  "en_dusuk_saglik",
  "suc_seviyesi",
  "borcluOldu",
  "borclu_tur_sayisi",
  "zenginBittiOrani",
  "hayatAmaciTamamlama",
  "rutbe3Orani",
  "mulkSahibiOldu",
  "evlilikOrani",
  "ayyasOldu",
  "hapisteOldu",
  "kacakOldu",
  "konutKademeOrt",
  "sofraKademeOrt",
  "yatirimSayisi",
  "mulkSatinAlmaSayisi",
  "magazaSifaSayisi",
  "magazaLuksSayisi",
  "envanterKullanSayisi",
  "zarSayisi",
  "zarKazanmaOrani",
  "sosyallesmeSayisi",
];

const kisilikKarsilastirma = KARSILASTIRMA_ALANLARI.map((alan) => {
  const satir: Record<string, any> = { metrik: alan };
  for (const kid of mevcutKisilikler) satir[kid] = kisilikOzetleri[kid].ozet[alan];
  return satir;
});

const EKSTREM_ALANLAR = ["yas", "para", "un", "skor", "suc_seviyesi", "mutluluk"];
const detayAlanlar = [
  "kisilik",
  "cag",
  "meslek",
  "bolge",
  "yas",
  "para",
  "ahlak",
  "un",
  "mutluluk",
  "saglik",
  "suc_seviyesi",
  "skor",
  "rutbe",
  "mulk_sayisi",
  "olum_nedeni",
  "efsanevi_olum",
  "hayat_amaci_ad",
  "hayat_amaci_tamamlandi",
];
function detay(k: any) {
  const d: any = {};
  for (const a of detayAlanlar) d[a] = k[a];
  return d;
}
const ekstremler: Record<string, { enYuksek: any; enDusuk: any }> = {};
for (const alan of EKSTREM_ALANLAR) {
  const sirali = [...kayitlar].sort((a, b) => a[alan] - b[alan]);
  ekstremler[alan] = { enDusuk: detay(sirali[0]), enYuksek: detay(sirali[sirali.length - 1]) };
}

const hataliSayisi = kayitlar.filter((k) => k.hataMi).length;

const cikti = {
  toplamOyunSayisi: kayitlar.length,
  hataliOyunSayisi: hataliSayisi,
  genelOzet: grupOzeti(kayitlar),
  genelOlumNedenleri: olumNedeniDagilimi(kayitlar, 12),
  kisilikOzetleri,
  kisilikKarsilastirma,
  kisilikCagMeslek,
  ekstremler,
};

const cikisYolu = path.join(__dirname, "simulateKisilikler.analiz.json");
fs.writeFileSync(cikisYolu, JSON.stringify(cikti, null, 2), "utf-8");
console.log(`Analiz yazıldı: ${cikisYolu}`);
console.log(`Toplam ${kayitlar.length} ömür${hataliSayisi ? ` (${hataliSayisi} hatalı)` : ""}.\n`);

// --- Konsol karşılaştırma tablosu ---
const KONSOL_METRIKLER = [
  "yas",
  "yasMedyan",
  "uzun80UstuYasam",
  "para",
  "paraMedyan",
  "skor",
  "un",
  "ahlak",
  "mutluluk",
  "saglik",
  "suc_seviyesi",
  "borcluOldu",
  "zenginBittiOrani",
  "hayatAmaciTamamlama",
  "rutbe_seviye",
  "rutbe3Orani",
  "rutbe4Orani",
  "rutbe5Orani",
  "ayyasOldu",
  "hapisteOldu",
  "konutKademeOrt",
  "sofraKademeOrt",
  "yatirimSayisi",
  "mulkSatinAlmaSayisi",
  "magazaSifaSayisi",
  "magazaLuksSayisi",
  "zarSayisi",
  "sosyallesmeSayisi",
];
const kolGenislik = 13;
const baslik = ["metrik".padEnd(20), ...mevcutKisilikler.map((k) => k.padStart(kolGenislik))].join("");
console.log(baslik);
console.log("-".repeat(baslik.length));
for (const metrik of KONSOL_METRIKLER) {
  const satir = [metrik.padEnd(20)];
  for (const kid of mevcutKisilikler) {
    const v = kisilikOzetleri[kid].ozet[metrik];
    satir.push(String(v).padStart(kolGenislik));
  }
  console.log(satir.join(""));
}
console.log("\nMeslek pazarı — ölümde pazar payı (ort / medyan / ≥%35 oranı) · ort güç:");
for (const [kisilik, arr] of Object.entries(kayitlar.reduce((acc: Record<string, any[]>, k: any) => {
  (acc[k.kisilikAdi ?? k.kisilik] ??= []).push(k);
  return acc;
}, {}))) {
  const paylar = (arr as any[]).map((k) => k.pazar_payi ?? 0);
  console.log(`  ${String(kisilik).padEnd(20)} ort ${ort(paylar).toFixed(1).padStart(5)} · med ${medyan(paylar).toFixed(0).padStart(3)} · ≥35: %${yuzde(paylar.filter((p) => p >= 35).length, paylar.length)} · güç ${ort((arr as any[]).map((k) => k.meslek_gucu ?? 0)).toFixed(0)}`);
}

console.log("\nRütbe dağılımı — TÜM ömürler (S1..S5 %) | dolu ömür (yaş≥55) medyan & S1..S5 %:");
for (const kid of mevcutKisilikler) {
  const hepsi = kayitlar.filter((k) => k.kisilik === kid);
  const dolu = hepsi.filter((k) => k.yas >= 55);
  const pay = (arr: any[]) => [1, 2, 3, 4, 5].map((s) => yuzde(arr.filter((k) => k.rutbe_seviye === s).length, arr.length).toFixed(0).padStart(3));
  const med = medyan(hepsi.map((k) => k.rutbe_seviye));
  const medDolu = dolu.length ? medyan(dolu.map((k) => k.rutbe_seviye)) : 0;
  console.log(
    `  ${(KISILIK_AD[kid] ?? kid).padEnd(20)} tüm[${pay(hepsi).join(" ")}] med ${med}  |  dolu(n=${String(dolu.length).padStart(3)}) [${pay(dolu).join(" ")}] med ${medDolu}`
  );
}

console.log("\nÖlüm nedenleri (kişilik başına ilk 3):");
for (const kid of mevcutKisilikler) {
  const ilk3 = kisilikOzetleri[kid].olumNedenleri.slice(0, 3).map((o: any) => `${o.neden} %${o.yuzde}`);
  console.log(`  ${(KISILIK_AD[kid] ?? kid).padEnd(20)} ${ilk3.join("  |  ")}`);
}
