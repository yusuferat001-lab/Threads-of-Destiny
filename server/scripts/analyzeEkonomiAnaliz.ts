/**
 * simulateEkonomiAnaliz.sonuc.json'u kişilik × 5-yıllık kilometre taşı bazında özetler.
 *
 * Her kişilik için:
 *   - kilometreTaslari[]: yaş 20,25,…; o yaşa ulaşan ömür sayısı (survivor), ortalama
 *     net servet / nakit / gayrimenkul / can-şöhret-ahlak-mutluluk, ve O ANA KADARKİ
 *     kümülatif gelirin kaynak %'si + giderin kalem %'si.
 *   - yasamBoyu: ölüm yaşı ort., ölümde net servet, borçlu bitiş %'si, ömür boyu
 *     gelir/gider kırılımı.
 *   - mekanikKullanim: mülk/yatırım/mağaza/zar/sosyalleşme/ev-sofra değişim ortalamaları.
 *
 * Çıktı: scripts/simulateEkonomiAnaliz.analiz.json + konsol tablosu.
 */
import fs from "fs";
import path from "path";

const girisYolu = path.join(__dirname, "simulateEkonomiAnaliz.sonuc.json");
if (!fs.existsSync(girisYolu)) {
  console.error(`Bulunamadı: ${girisYolu}\nÖnce: npx tsx scripts/simulateEkonomiAnaliz.ts`);
  process.exit(1);
}
const kayitlar: any[] = JSON.parse(fs.readFileSync(girisYolu, "utf-8"));

const KISILIK_AD: Record<string, string> = {
  garantici: "Garantici",
  cimri: "Cimri",
  suclu: "Suçlu",
  luks: "Lüks Düşkünü",
  survival: "Maks Hayatta Kalma",
  para: "Maks Para Odaklı",
};
const KISILIK_SIRA = ["cimri", "garantici", "survival", "suclu", "luks", "para"];

const GELIR_ETIKET: Record<string, string> = {
  maas: "Maaş",
  olay: "Olay ödülleri",
  mulk: "Gayrimenkul geliri",
  zar: "Kumar (zar)",
  diger: "Diğer (kriz/şans/…)",
};
const GIDER_ETIKET: Record<string, string> = {
  yasam: "Yemek / yaşam tarzı",
  konut: "Kira / konut",
  ekip: "Ekip maaşları",
  evcil: "Evcil hayvan",
  faiz: "Borç faizi",
  savasVergisi: "Savaş vergisi",
  bagis: "Ekstra vergi (şehir yöneticisi)",
  olay: "Olay seçim maliyeti",
  mulkZarar: "Gayrimenkul zararı",
  yatirim: "Kendi işine yatırım",
  mulkAlim: "Gayrimenkul alımı",
  magaza: "Mağaza (şifa+lüks)",
  zarKayip: "Kumar kaybı",
  tasinma: "Taşınma ücreti",
  envanterBakim: "Lüks eşya bakımı",
  sizinti: "Zenginlik sızıntısı (hırsız/haraç)",
  diger: "Diğer",
};

function ort(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}
function medyan(arr: number[]): number {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function r1(x: number): number {
  return Math.round(x * 10) / 10;
}
function r0(x: number): number {
  return Math.round(x);
}
function yuzdele(kovalar: Record<string, number>): Record<string, number> {
  const toplam = Object.values(kovalar).reduce((a, b) => a + Math.max(0, b), 0);
  const r: Record<string, number> = {};
  for (const [k, v] of Object.entries(kovalar)) r[k] = toplam > 0 ? Math.round((Math.max(0, v) / toplam) * 1000) / 10 : 0;
  return r;
}
function kovaOrtalamasi(snaps: any[], alan: "kumulatifGelir" | "kumulatifGider"): Record<string, number> {
  if (!snaps.length) return {};
  const anahtarlar = Object.keys(snaps[0][alan]);
  const r: Record<string, number> = {};
  for (const a of anahtarlar) r[a] = r1(ort(snaps.map((s) => s[alan][a] ?? 0)));
  return r;
}

const KM_YASLAR: number[] = [];
for (let y = 20; y <= 95; y += 5) KM_YASLAR.push(y);

function kisilikOzeti(kid: string) {
  const altKume = kayitlar.filter((k) => k.kisilik === kid);
  const n = altKume.length;

  // --- 5 yıllık kilometre taşları ---
  const kmTaslari = KM_YASLAR.map((yas) => {
    const snaps = altKume
      .map((k) => k.kilometreTaslari.find((t: any) => t.yas === yas && !t.sonMu))
      .filter(Boolean);
    if (snaps.length === 0) return null;
    const gelirOrt = kovaOrtalamasi(snaps, "kumulatifGelir");
    const giderOrt = kovaOrtalamasi(snaps, "kumulatifGider");
    return {
      yas,
      hayattaKalan: snaps.length,
      hayattaKalanYuzde: Math.round((snaps.length / n) * 1000) / 10,
      netServetOrt: r1(ort(snaps.map((s: any) => s.netServet))),
      netServetMedyan: r1(medyan(snaps.map((s: any) => s.netServet))),
      nakitOrt: r1(ort(snaps.map((s: any) => s.para))),
      gayrimenkulOrt: r1(ort(snaps.map((s: any) => s.gayrimenkulDegeri))),
      saglikOrt: r0(ort(snaps.map((s: any) => s.saglik))),
      unOrt: r0(ort(snaps.map((s: any) => s.un))),
      ahlakOrt: r0(ort(snaps.map((s: any) => s.ahlak))),
      mutlulukOrt: r0(ort(snaps.map((s: any) => s.mutluluk))),
      kumulatifGelirOrt: gelirOrt,
      kumulatifGiderOrt: giderOrt,
      gelirYuzde: yuzdele(gelirOrt),
      giderYuzde: yuzdele(giderOrt),
      toplamGelirOrt: r1(Object.values(gelirOrt).reduce((a, b) => a + b, 0)),
      toplamGiderOrt: r1(Object.values(giderOrt).reduce((a, b) => a + b, 0)),
    };
  }).filter(Boolean);

  // --- Yaşam boyu (sonMu snapshot) ---
  const sonlar = altKume.map((k) => k.kilometreTaslari.find((t: any) => t.sonMu)).filter(Boolean);
  const gelirSon = kovaOrtalamasi(sonlar, "kumulatifGelir");
  const giderSon = kovaOrtalamasi(sonlar, "kumulatifGider");
  const yasamBoyu = {
    olumYasiOrt: r1(ort(altKume.map((k) => k.olumYasi))),
    olumYasiMedyan: medyan(altKume.map((k) => k.olumYasi)),
    olumdeNetServetOrt: r1(ort(sonlar.map((s: any) => s.netServet))),
    olumdeNetServetMedyan: r1(medyan(sonlar.map((s: any) => s.netServet))),
    borcluBitisYuzde: Math.round((altKume.filter((k) => {
      const s = k.kilometreTaslari.find((t: any) => t.sonMu);
      return s && s.netServet < 0;
    }).length / n) * 1000) / 10,
    zenginBitisYuzde: Math.round((altKume.filter((k) => {
      const s = k.kilometreTaslari.find((t: any) => t.sonMu);
      return s && s.netServet >= 300;
    }).length / n) * 1000) / 10,
    kumulatifGelirOrt: gelirSon,
    kumulatifGiderOrt: giderSon,
    gelirYuzde: yuzdele(gelirSon),
    giderYuzde: yuzdele(giderSon),
    toplamGelirOrt: r1(Object.values(gelirSon).reduce((a, b) => a + b, 0)),
    toplamGiderOrt: r1(Object.values(giderSon).reduce((a, b) => a + b, 0)),
    sonCanOrt: r0(ort(sonlar.map((s: any) => s.saglik))),
    sonUnOrt: r0(ort(sonlar.map((s: any) => s.un))),
    sonAhlakOrt: r0(ort(sonlar.map((s: any) => s.ahlak))),
    sonMutlulukOrt: r0(ort(sonlar.map((s: any) => s.mutluluk))),
  };

  const mekanikKullanim = {
    gayrimenkulAlim: r1(ort(altKume.map((k) => k.mulkSatinAlmaSayisi))),
    kendiIsYatirim: r1(ort(altKume.map((k) => k.yatirimSayisi))),
    magazaSifa: r1(ort(altKume.map((k) => k.magazaSifaSayisi))),
    magazaLuks: r1(ort(altKume.map((k) => k.magazaLuksSayisi))),
    envanterKullan: r1(ort(altKume.map((k) => k.envanterKullanSayisi))),
    zar: r1(ort(altKume.map((k) => k.zarSayisi))),
    zarKazanmaOrani:
      Math.round(
        (altKume.reduce((a, k) => a + k.zarKazanma, 0) /
          Math.max(1, altKume.reduce((a, k) => a + k.zarSayisi, 0))) *
          1000
      ) / 10,
    sosyallesme: r1(ort(altKume.map((k) => k.sosyallesmeSayisi))),
    konutDegisim: r1(ort(altKume.map((k) => k.konutDegisimSayisi))),
    yasamDegisim: r1(ort(altKume.map((k) => k.yasamDegisimSayisi))),
    sonKonut: enSik(altKume.map((k) => k.konut_id_son)),
    sonSofra: enSik(altKume.map((k) => k.yasam_secimi_id_son)),
  };

  return { id: kid, ad: KISILIK_AD[kid] ?? kid, n, kmTaslari, yasamBoyu, mekanikKullanim };
}

function enSik(arr: string[]): string {
  const s: Record<string, number> = {};
  for (const x of arr) s[x] = (s[x] ?? 0) + 1;
  return Object.entries(s).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

const mevcut = KISILIK_SIRA.filter((kid) => kayitlar.some((k) => k.kisilik === kid));
const kisilikler = mevcut.map(kisilikOzeti);

const cikti = {
  meta: {
    toplamOmur: kayitlar.length,
    kisilikBasinaOmur: kayitlar.length / mevcut.length,
    olcek: "Tüm para tutarları oyun-içi para birimi cinsinden, kişilik grubu ortalaması.",
    gelirEtiket: GELIR_ETIKET,
    giderEtiket: GIDER_ETIKET,
    uyari:
      "Kilometre taşı satırları YALNIZCA o yaşa ulaşan ömürlerin ortalamasıdır (survivor bias) — 'hayattaKalan' sütununa bak. Yüzdeler kümülatiftir (doğumdan o yaşa dek).",
  },
  kisilikler,
};

const cikisYolu = path.join(__dirname, "simulateEkonomiAnaliz.analiz.json");
fs.writeFileSync(cikisYolu, JSON.stringify(cikti, null, 2), "utf-8");
console.log(`Analiz yazıldı: ${cikisYolu}  (${kayitlar.length} ömür)\n`);

// --- Konsol özeti ---
for (const k of kisilikler) {
  console.log(`\n══════ ${k.ad}  (n=${k.n})  ══════`);
  console.log(
    `ölüm yaşı ort ${k.yasamBoyu.olumYasiOrt} (medyan ${k.yasamBoyu.olumYasiMedyan}) · ölümde net servet ort ${k.yasamBoyu.olumdeNetServetOrt} (medyan ${k.yasamBoyu.olumdeNetServetMedyan}) · borçlu bitiş %${k.yasamBoyu.borcluBitisYuzde} · zengin(≥300) bitiş %${k.yasamBoyu.zenginBitisYuzde}`
  );
  console.log(
    `mekanik: mülk-alım ${k.mekanikKullanim.gayrimenkulAlim} · kendi-iş yat. ${k.mekanikKullanim.kendiIsYatirim} · mağaza şifa ${k.mekanikKullanim.magazaSifa} · lüks ${k.mekanikKullanim.magazaLuks} · zar ${k.mekanikKullanim.zar} (kaz %${k.mekanikKullanim.zarKazanmaOrani}) · sosyal ${k.mekanikKullanim.sosyallesme} · ev-değ ${k.mekanikKullanim.konutDegisim} · sofra-değ ${k.mekanikKullanim.yasamDegisim} · son ev ${k.mekanikKullanim.sonKonut} · son sofra ${k.mekanikKullanim.sonSofra}`
  );
  console.log("  yaş  kalan%   netServet   nakit   gm    can şöh ahl mut   | gelir%: maaş/olay/mülk/zar/diğ | gider%: kira/yemek/olay/yat/mülkAl/mağ/faiz/diğ");
  for (const t of k.kmTaslari as any[]) {
    const gl = t.gelirYuzde;
    const gd = t.giderYuzde;
    console.log(
      `  ${String(t.yas).padStart(3)}  ${String(t.hayattaKalanYuzde).padStart(5)}  ` +
        `${String(t.netServetOrt).padStart(9)}  ${String(t.nakitOrt).padStart(6)}  ${String(t.gayrimenkulOrt).padStart(5)}  ` +
        `${String(t.saglikOrt).padStart(3)} ${String(t.unOrt).padStart(3)} ${String(t.ahlakOrt).padStart(3)} ${String(t.mutlulukOrt).padStart(3)}  | ` +
        `${gl.maas}/${gl.olay}/${gl.mulk}/${gl.zar}/${gl.diger}  | ` +
        `${gd.konut}/${gd.yasam}/${gd.olay}/${gd.yatirim}/${gd.mulkAlim}/${gd.magaza}/${gd.faiz}/${gd.diger}`
    );
  }
  const yb = k.yasamBoyu;
  console.log(
    `  ÖMÜR BOYU  gelir%  maaş ${yb.gelirYuzde.maas} · olay ${yb.gelirYuzde.olay} · mülk ${yb.gelirYuzde.mulk} · zar ${yb.gelirYuzde.zar} · diğer ${yb.gelirYuzde.diger}   (Σgelir ort ${yb.toplamGelirOrt})`
  );
  console.log(
    `  ÖMÜR BOYU  gider%  kira ${yb.giderYuzde.konut} · yemek ${yb.giderYuzde.yasam} · olay ${yb.giderYuzde.olay} · yatırım ${yb.giderYuzde.yatirim} · mülkAlım ${yb.giderYuzde.mulkAlim} · mağaza ${yb.giderYuzde.magaza} · faiz ${yb.giderYuzde.faiz} · ekstraVergi ${yb.giderYuzde.bagis} · savaşV ${yb.giderYuzde.savasVergisi} · taşınma ${yb.giderYuzde.tasinma} · diğer ${yb.giderYuzde.diger}   (Σgider ort ${yb.toplamGiderOrt})`
  );
}
