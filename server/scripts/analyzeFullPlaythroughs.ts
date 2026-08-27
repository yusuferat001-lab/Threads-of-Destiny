/**
 * simulateFullPlaythroughs.ts'in ürettiği ham JSON'u özetleyip, çağ x meslek (6 grup)
 * bazında ortalamaları, genel ortalamayı, ve her parametre için (ahlak/para/un/mutluluk/
 * suc/yaş/skor) global en yüksek/en düşük kayıtları (tüm bağlamıyla) çıkarır.
 */
import fs from "fs";
import path from "path";

const girisYolu = path.join(__dirname, "simulateFullPlaythroughs.sonuc.json");
const kayitlar: any[] = JSON.parse(fs.readFileSync(girisYolu, "utf-8"));

function ort(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function yuzde(n: number, toplam: number): number {
  return Math.round((n / toplam) * 1000) / 10;
}

const SAYISAL_ALANLAR = [
  "yas",
  "para",
  "ahlak",
  "un",
  "mutluluk",
  "suc_seviyesi",
  "skor",
  "tur_sayisi",
  "cocuk_sayisi",
  "mulk_sayisi",
  "rutbe_seviye",
  "sehir_yonetim_seviyesi",
  "yatirimSayisi",
  "mulkSatinAlmaSayisi",
  "kendiIsHarcanan",
  "mulkHarcanan",
  "gayrimenkulDegeri_son",
  "magazaSifaSayisi",
  "magazaLuksSayisi",
  "envanterKullanSayisi",
  "zarSayisi",
  "sosyallesmeSayisi",
];

function grupOzeti(kayit: any[]) {
  const n = kayit.length;
  const ozet: Record<string, number> = { n };
  for (const alan of SAYISAL_ALANLAR) {
    ozet[alan] = Math.round(ort(kayit.map((k) => k[alan])) * 100) / 100;
  }
  ozet.evlilikOrani = yuzde(kayit.filter((k) => k.evliydi).length, n);
  ozet.borcluOlumOrani = yuzde(kayit.filter((k) => k.borclu).length, n);
  ozet.hayatAmaciTamamlamaOrani = yuzde(kayit.filter((k) => k.hayat_amaci_tamamlandi).length, n);
  ozet.ayyasOrani = yuzde(kayit.filter((k) => k.ayyas).length, n);
  ozet.kacakOldu = yuzde(kayit.filter((k) => k.kacakti).length, n);
  ozet.hapisteOlum = yuzde(kayit.filter((k) => k.hapisteydi).length, n);
  ozet.vebaGecirdi = yuzde(kayit.filter((k) => k.veba_gecirdi).length, n);
  ozet.savasSirasindaOldu = yuzde(kayit.filter((k) => k.savastaydi).length, n);
  ozet.mulkSahibiOldu = yuzde(kayit.filter((k) => k.mulk_sayisi > 0).length, n);
  ozet.efsaneviOlumOrani = yuzde(kayit.filter((k) => k.efsanevi_olum).length, n);
  ozet.zarKazanmaOrani = yuzde(
    kayit.reduce((a, k) => a + k.zarKazanma, 0),
    Math.max(1, kayit.reduce((a, k) => a + k.zarSayisi, 0))
  );
  return ozet;
}

function olumNedeniDagilimi(kayit: any[], ustSinir = 6) {
  const sayac: Record<string, number> = {};
  for (const k of kayit) {
    // ilk cümleyi al (kısa kategori etiketi gibi kullan)
    const anahtar = (k.olum_nedeni ?? "Bilinmiyor").split(".")[0].trim();
    sayac[anahtar] = (sayac[anahtar] ?? 0) + 1;
  }
  return Object.entries(sayac)
    .sort((a, b) => b[1] - a[1])
    .slice(0, ustSinir)
    .map(([neden, adet]) => ({ neden, adet, yuzde: yuzde(adet, kayit.length) }));
}

const CAGLAR = ["Orta Çağ", "Sanayi Devrimi"];
const MESLEKLER = ["Asker", "Tüccar", "Din Adamı"];

const gruplar: Record<string, any> = {};
for (const cag of CAGLAR) {
  for (const meslek of MESLEKLER) {
    const key = `${cag}|${meslek}`;
    const altKume = kayitlar.filter((k) => k.cag === cag && k.meslek === meslek);
    gruplar[key] = {
      cag,
      meslek,
      ozet: grupOzeti(altKume),
      olumNedenleri: olumNedeniDagilimi(altKume),
    };
  }
}

const genelOzet = grupOzeti(kayitlar);
const genelOlumNedenleri = olumNedeniDagilimi(kayitlar, 10);

const EKSTREM_ALANLAR = ["yas", "para", "ahlak", "un", "mutluluk", "suc_seviyesi", "skor"];
const detayAlanlar = [
  "cag",
  "meslek",
  "bolge",
  "yerlesim",
  "din_kultur",
  "yas",
  "para",
  "ahlak",
  "un",
  "mutluluk",
  "suc_seviyesi",
  "skor",
  "rutbe",
  "olum_nedeni",
  "efsanevi_olum",
  "hayat_amaci_ad",
  "hayat_amaci_tamamlandi",
  "evliydi",
  "cocuk_sayisi",
];

function detay(k: any) {
  const d: any = {};
  for (const a of detayAlanlar) d[a] = k[a];
  return d;
}

const ekstremler: Record<string, { enYuksek: any; enDusuk: any }> = {};
for (const alan of EKSTREM_ALANLAR) {
  const sirali = [...kayitlar].sort((a, b) => a[alan] - b[alan]);
  ekstremler[alan] = {
    enDusuk: detay(sirali[0]),
    enYuksek: detay(sirali[sirali.length - 1]),
  };
}

// Grup bazında da en yüksek/en düşük yaş+para+un (kısa liste, "hangi kombinasyon nasıl performans gösterdi" için)
const grupSiralamasi = Object.values(gruplar)
  .map((g: any) => ({ cag: g.cag, meslek: g.meslek, ...g.ozet }))
  .sort((a: any, b: any) => b.skor - a.skor);

const cikti = {
  toplamOyunSayisi: kayitlar.length,
  genelOzet,
  genelOlumNedenleri,
  gruplar,
  grupSiralamasi,
  ekstremler,
};

const cikisYolu = path.join(__dirname, "simulateFullPlaythroughs.analiz.json");
fs.writeFileSync(cikisYolu, JSON.stringify(cikti, null, 2), "utf-8");
console.log(`Analiz yazıldı: ${cikisYolu}`);
console.log(JSON.stringify(genelOzet, null, 2));
