/**
 * "Zengin tavanı" ölçümü — kullanıcı isteğiyle özel senaryo:
 *   - Ev + yaşam tarzı HAYAT BOYU en dip kademede (index 0) kilitli (hiç yükseltme yok, borçta bile).
 *   - Olay seçimi tamamen PARA MAKSİMİZE eden bir bot (ölüm/hapis riskinden kaçar, minik sağlık tabanı).
 *   - Sağlık düştükçe agresif ŞİFA alır + envanterdeki şifayı kullanır (dip ev/sofra cezasını telafi).
 *   - Kârlı piyasa mülklerini agresif alır. Zar/sosyalleşme/lüks YOK — saf "meşru para" tavanı.
 *   - Her (çağ × meslek) için SIM_N ömür (varsayılan 100) = 6 grup.
 *
 * Amaç: hayat amacı "servet" eşiklerini gerçek ulaşılabilir tavana göre kalibre etmek.
 * Hem ANLIK zirve (para / para+mülk bir ara ulaşılan en yüksek) hem ÖLÜMDEKİ değer raporlanır —
 * "başarı bir an mı, sona kadar mı" ayrımı için ikisi de lazım.
 *
 * Çalıştırma:  npx tsx scripts/simulateZenginTavan.ts
 *   SIM_N=100  -> her (çağ × meslek) grubu için ömür sayısı
 * Çıktı: scripts/simulateZenginTavan.sonuc.json + konsola özet tablo.
 */
import "./_simPrismaStub";

import fs from "fs";
import path from "path";
import {
  yeniOyun,
  mesleğiAta,
  senaryoUret,
  secimUygula,
  stateGetir,
  konutDegistir,
  yasamSecimiDegistir,
  mulkConfigGetir,
  mulkSatinAl,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
} from "../src/game/gameEngine";
import { MESLEKLER, BOLGELER_BY_CAG, hesaplaSkor, gayrimenkulDegeriHesapla } from "../src/game/stateManager";
import { KONUTLAR } from "../src/data/konutlar";
import { YASAM_SECENEKLERI } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag, Secenek } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 100);
const MAX_TUR_GUARD = 400;
// "0 hasarlı" kademe: sağlık/mutluluk cezası OLMAYAN en ucuz kademe (yükseltme yok, ceza da yok).
const DIP_KONUT =
  KONUTLAR.find((k) => (k.saglikEtkisiYillik ?? 0) >= 0 && (k.mutlulukEtkisiYillik ?? 0) >= 0)?.id ?? "normal_ev";
const DIP_YASAM =
  YASAM_SECENEKLERI.find((y) => (y.saglikEtkisiYillik ?? 0) >= 0 && (y.mutlulukEtkisiYillik ?? 0) >= 0)?.id ??
  "normal_ye";

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function kirp(x: number, alt: number, ust: number): number {
  return Math.max(alt, Math.min(ust, x));
}
function sayi(x: number | undefined): number {
  return typeof x === "number" ? x : 0;
}
function medyan(a: number[]): number {
  if (a.length === 0) return 0;
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function yuzdelik(a: number[], p: number): number {
  if (a.length === 0) return 0;
  const s = [...a].sort((x, y) => x - y);
  return s[kirp(Math.floor((p / 100) * s.length), 0, s.length - 1)];
}
function ort(a: number[]): number {
  return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
}

// --- Para-maksimize eden seçim puanı (simulateKisilikler "para" arketipinin sadeleştirilmiş, daha keskin hâli) ---
function secenekPuani(s: Secenek, state: CharacterState): number {
  const b = s.basarili_sonuc ?? {};
  const k = s.basarisiz_sonuc ?? {};
  const p = kirp(s.basari_sansi / 100, 0, 1);
  const bek = (alan: string) => p * sayi((b as any)[alan]) + (1 - p) * sayi((k as any)[alan]);
  const bekPara = bek("para");
  const bekSaglik = bek("saglik");
  const enKotuSaglik = Math.min(sayi(b.saglik), sayi(k.saglik));
  const olumRiski = (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sayi(b.olum_sansi) + sayi(k.olum_sansi)) / 100;
  const hapisRiski =
    (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0);
  const panik = state.saglik < 40 ? 2.6 : state.saglik < 60 ? 1.5 : 1;
  return (
    bekPara * 1.3 +
    Math.max(0, bekPara) * 0.5 +
    bek("un") * 0.4 +
    p * 6 -
    olumRiski * 320 -
    hapisRiski * 60 +
    enKotuSaglik * 2.2 * panik +
    Math.min(0, bekSaglik) * 1.4 * panik
  );
}

function secenekSec(secenekler: Secenek[], state: CharacterState): number {
  const uygun = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygun.length ? uygun : secenekler.map((s, i) => ({ s, i }));
  if (havuz.length === 1) return havuz[0].i;
  const puanlar = havuz.map((x) => secenekPuani(x.s, state));
  const enDusuk = Math.min(...puanlar);
  const agirliklar = puanlar.map((pu) => Math.pow(pu - enDusuk + 1, 2.2) * (0.85 + Math.random() * 0.3));
  const toplam = agirliklar.reduce((a, b) => a + b, 0);
  let hedef = Math.random() * toplam;
  for (let i = 0; i < havuz.length; i++) {
    hedef -= agirliklar[i];
    if (hedef <= 0) return havuz[i].i;
  }
  return havuz[havuz.length - 1].i;
}

interface Kayit {
  cag: Cag;
  meslek: string;
  bolge: string;
  yas: number;
  para_son: number;
  servet_son: number;
  zirve_para: number;
  zirve_servet: number;
  un: number;
  saglik: number;
  en_dusuk_saglik: number;
  rutbe_seviye: number;
  mulk_sayisi: number;
  mulk_sahibi_oldu: boolean;
  sifa_alim: number;
  borclu_oldu: boolean;
  borclu_bitti: boolean;
  skor: number;
  olum_nedeni: string;
  hata: boolean;
}

async function birOmur(cag: Cag, meslek: string): Promise<Kayit> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  const state0 = await yeniOyun(cag, bolge, yerlesim);
  await mesleğiAta(state0.id, meslek);
  const id = state0.id;

  let zirveP = state0.para;
  let zirveS = state0.para;
  let enDusukSaglik = state0.saglik;
  let sifaAlim = 0;
  let borcluOldu = false;
  let hata = false;
  let guard = 0;

  try {
    let state = await stateGetir(id);
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;

      // 1) Ev + sofra: HER TUR dip kademede tut (ucuza inmek bedavadır).
      if (state.konut_id !== DIP_KONUT) {
        try {
          await konutDegistir(id, DIP_KONUT);
        } catch {}
      }
      if (state.yasam_secimi_id !== DIP_YASAM) {
        try {
          await yasamSecimiDegistir(id, DIP_YASAM);
        } catch {}
      }

      // 2) Kârlı mülkleri agresif al (12 tampon bırak).
      try {
        if (state.saglik > 20) {
          const mulkler = await mulkConfigGetir(id);
          const adaylar = mulkler.filter(
            (m) => !m.sahipMi && m.maliyet <= state.para - 12 && (m.tahminiYillikGetiriYuzdesi ?? 0) > -1
          );
          if (adaylar.length) {
            const en = adaylar.reduce((a, b) =>
              (b.tahminiYillikGetiriYuzdesi ?? 0) > (a.tahminiYillikGetiriYuzdesi ?? 0) ? b : a
            );
            await mulkSatinAl(id, en.tur);
          }
        }
      } catch {}

      // 3) Şifa: sağlık düşükse al (dip ev/sofra cezasını telafi).
      try {
        if (state.saglik < 62) {
          const acil = state.saglik < 40;
          const katalog = await magazaConfigGetir(id);
          const butce = (acil ? 0.9 : 0.55) * state.para;
          const adaylar = katalog
            .filter((e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= butce)
            .sort((a, b) => a.fiyat - b.fiyat);
          if (adaylar.length) {
            const sec = acil ? adaylar[adaylar.length - 1] : adaylar[0];
            await magazadanSatinAl(id, sec.id);
            sifaAlim++;
          }
        }
      } catch {}

      // 4) Envanterdeki şifayı düşük canda kullan.
      try {
        const sifalar = state.magaza_envanteri.filter((e) => e.kategori === "sifa");
        if (state.saglik < 58 && sifalar.length) {
          const sec = [...sifalar].sort((a, b) => (a.kalanYil ?? 99) - (b.kalanYil ?? 99))[0];
          await envanterEsyasiKullan(id, sec.id);
        }
      } catch {}

      state = await stateGetir(id);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        // "para" mantığı: riskli ısrarı çoğunlukla bırak
        sonuc = await secimUygula(id, Math.random() < 0.25 ? 1 : 0);
      }

      state = await stateGetir(id);
      const servet = state.para + gayrimenkulDegeriHesapla(state);
      zirveP = Math.max(zirveP, state.para);
      zirveS = Math.max(zirveS, servet);
      enDusukSaglik = Math.min(enDusukSaglik, state.saglik);
      if (state.para < 0) borcluOldu = true;
    }
  } catch (e) {
    hata = true;
    console.error(`  [HATA] ${cag}/${meslek} (${id}): ${(e as Error).message}`);
  }

  const son = await stateGetir(id);
  const servetSon = son.para + gayrimenkulDegeriHesapla(son);
  return {
    cag,
    meslek,
    bolge: son.bolge,
    yas: son.yas,
    para_son: Math.round(son.para * 100) / 100,
    servet_son: Math.round(servetSon * 100) / 100,
    zirve_para: Math.round(zirveP * 100) / 100,
    zirve_servet: Math.round(zirveS * 100) / 100,
    un: son.un,
    saglik: son.saglik,
    en_dusuk_saglik: enDusukSaglik,
    rutbe_seviye: son.rutbe_seviye,
    mulk_sayisi: son.mulkler.length,
    mulk_sahibi_oldu: son.mulkler.length > 0 || zirveS > son.para + 5,
    sifa_alim: sifaAlim,
    borclu_oldu: borcluOldu,
    borclu_bitti: son.para < 0,
    skor: Math.round(hesaplaSkor(son)),
    olum_nedeni: (son.olum_nedeni ?? "?").slice(0, 55),
    hata,
  };
}

function grupOzet(kayitlar: Kayit[]) {
  const paraSon = kayitlar.map((k) => k.para_son);
  const servetSon = kayitlar.map((k) => k.servet_son);
  const zirveP = kayitlar.map((k) => k.zirve_para);
  const zirveS = kayitlar.map((k) => k.zirve_servet);
  return {
    n: kayitlar.length,
    yasMed: medyan(kayitlar.map((k) => k.yas)),
    // ölümdeki değer ("sona kadar" başarı için)
    paraSon_med: Math.round(medyan(paraSon)),
    paraSon_p75: Math.round(yuzdelik(paraSon, 75)),
    paraSon_p90: Math.round(yuzdelik(paraSon, 90)),
    paraSon_max: Math.round(Math.max(...paraSon)),
    servetSon_med: Math.round(medyan(servetSon)),
    servetSon_p75: Math.round(yuzdelik(servetSon, 75)),
    servetSon_p90: Math.round(yuzdelik(servetSon, 90)),
    servetSon_max: Math.round(Math.max(...servetSon)),
    // hayat boyu ANLIK zirve ("bir an yeter" başarı için)
    zirvePara_med: Math.round(medyan(zirveP)),
    zirvePara_p90: Math.round(yuzdelik(zirveP, 90)),
    zirvePara_max: Math.round(Math.max(...zirveP)),
    zirveServet_med: Math.round(medyan(zirveS)),
    zirveServet_p75: Math.round(yuzdelik(zirveS, 75)),
    zirveServet_p90: Math.round(yuzdelik(zirveS, 90)),
    zirveServet_max: Math.round(Math.max(...zirveS)),
    unMed: Math.round(medyan(kayitlar.map((k) => k.un))),
    saglikSonMed: Math.round(medyan(kayitlar.map((k) => k.saglik))),
    enDusukSaglikMed: Math.round(medyan(kayitlar.map((k) => k.en_dusuk_saglik))),
    rutbe5Pay: Math.round((kayitlar.filter((k) => k.rutbe_seviye >= 5).length / kayitlar.length) * 1000) / 10,
    rutbeOrt: Math.round(ort(kayitlar.map((k) => k.rutbe_seviye)) * 100) / 100,
    mulkSahibiPay: Math.round((kayitlar.filter((k) => k.mulk_sayisi > 0).length / kayitlar.length) * 1000) / 10,
    mulkSayiOrt: Math.round(ort(kayitlar.map((k) => k.mulk_sayisi)) * 100) / 100,
    sifaAlimOrt: Math.round(ort(kayitlar.map((k) => k.sifa_alim)) * 100) / 100,
    borcluOlduPay: Math.round((kayitlar.filter((k) => k.borclu_oldu).length / kayitlar.length) * 1000) / 10,
    borcluBittiPay: Math.round((kayitlar.filter((k) => k.borclu_bitti).length / kayitlar.length) * 1000) / 10,
    // eşik geçme oranları — anlık zirve servet
    "zirveServet>=80%": Math.round((zirveS.filter((v) => v >= 80).length / zirveS.length) * 1000) / 10,
    "zirveServet>=120%": Math.round((zirveS.filter((v) => v >= 120).length / zirveS.length) * 1000) / 10,
    "zirveServet>=180%": Math.round((zirveS.filter((v) => v >= 180).length / zirveS.length) * 1000) / 10,
    "zirveServet>=250%": Math.round((zirveS.filter((v) => v >= 250).length / zirveS.length) * 1000) / 10,
    "servetSon>=80%": Math.round((servetSon.filter((v) => v >= 80).length / servetSon.length) * 1000) / 10,
    "servetSon>=120%": Math.round((servetSon.filter((v) => v >= 120).length / servetSon.length) * 1000) / 10,
    "servetSon>=180%": Math.round((servetSon.filter((v) => v >= 180).length / servetSon.length) * 1000) / 10,
  };
}

async function main() {
  const caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  const hepsi: Kayit[] = [];
  const baslangic = Date.now();
  console.log(`Zengin-tavan simülasyonu: ${caglar.length} çağ × ${MESLEKLER.length} meslek × ${N_PER_GROUP} ömür\n`);

  for (const cag of caglar) {
    for (const meslek of MESLEKLER) {
      process.stdout.write(`=== ${cag} — ${meslek}: `);
      for (let i = 0; i < N_PER_GROUP; i++) {
        hepsi.push(await birOmur(cag, meslek));
      }
      const g = grupOzet(hepsi.filter((k) => k.cag === cag && k.meslek === meslek));
      console.log(
        `bitti (${((Date.now() - baslangic) / 1000).toFixed(0)}sn) — yaşMed ${g.yasMed}, paraSonMed ${g.paraSon_med}, zirveServetMed ${g.zirveServet_med} (p90 ${g.zirveServet_p90}, max ${g.zirveServet_max})`
      );
    }
  }

  const gruplar: Record<string, ReturnType<typeof grupOzet>> = {};
  for (const cag of caglar) {
    for (const meslek of MESLEKLER) {
      gruplar[`${cag} | ${meslek}`] = grupOzet(hepsi.filter((k) => k.cag === cag && k.meslek === meslek));
    }
  }
  const genel = grupOzet(hepsi);

  const cikti = { toplam: hepsi.length, hatali: hepsi.filter((k) => k.hata).length, genel, gruplar, kayitlar: hepsi };
  const yol = path.join(__dirname, "simulateZenginTavan.sonuc.json");
  fs.writeFileSync(yol, JSON.stringify(cikti, null, 2), "utf-8");

  console.log(`\n===== GENEL (${hepsi.length} ömür) =====`);
  console.table([genel]);
  console.log(`\n===== GRUP KIRILIMI =====`);
  console.table(gruplar);
  console.log(`\nYazıldı: ${yol}`);
  if (cikti.hatali) console.log(`Uyarı: ${cikti.hatali} ömür hata ile bitti.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
