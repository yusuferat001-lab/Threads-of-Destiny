/**
 * "Para odaklı oyuncu" gibi tam-ömür simülasyonu + 5 yıllık yaş kovalarında ortalama.
 *
 * Karar mantığı simulateKisilikler.ts'teki "para" (Maks Para Odaklı) kişiliğinden alınır:
 *  - Olaylarda seçeneğin GERÇEK basarili/basarisiz etkilerine bakıp beklenen parayı
 *    maksimize eden şıkkı seçer ("olaylarda parayı seç").
 *  - Ev/sofra kademesi ASLA oyunun nötr varsayılanının (mutevazi_yuva / sade_sofra, 0 hasar)
 *    altına inmez; borçtayken bile dip ceza kademesine düşmez.
 *  - Agresif kendi-işi yatırımı + tüm kârlı piyasa mülkleri; parayı biriktirir.
 *
 * Her turdan sonra anlık durum kaydedilir, sonra 15,20,25,...,100 yaş kovalarında
 * tüm ömürler ortalanır.
 *
 * Kullanım: cd server && npx tsx scripts/simulate5YilOrtalama.ts
 * Env: SIM_N (çağ×meslek başına ömür, vars. 60), SIM_CAG, SIM_MESLEK (virgüllü filtre)
 * Çıktı: konsol raporu + scripts/simulate5YilOrtalama.sonuc.json
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
  finansGetir,
  konutDegistir,
  yasamSecimiDegistir,
  mulkConfigGetir,
  mulkSatinAl,
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  zarKademeleriGetir,
  zarAt,
} from "../src/game/gameEngine";
import { yatirimConfigGetir, yatirimYap } from "./_yatirimShim";
import { MESLEKLER, BOLGELER_BY_CAG, hesaplaSkor, gayrimenkulDegeriHesapla } from "../src/game/stateManager";
import { KONUTLAR } from "../src/data/konutlar";
import { YASAM_SECENEKLERI } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag, Secenek } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 60);
const MAX_TUR_GUARD = 400;
const CAG_FILTRE = (process.env.SIM_CAG ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const MESLEK_FILTRE = (process.env.SIM_MESLEK ?? "").split(",").map((s) => s.trim()).filter(Boolean);

const KOVALAR: number[] = [];
for (let y = 15; y <= 100; y += 5) KOVALAR.push(y);

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function kirp(x: number, alt: number, ust: number): number {
  return Math.max(alt, Math.min(ust, x));
}
function y2(n: number): number {
  return Math.round(n * 100) / 100;
}
function ortala(s: number[]): number {
  return s.length ? s.reduce((a, b) => a + b, 0) / s.length : 0;
}
function medyan(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : y2((s[m - 1] + s[m]) / 2);
}

// ---------------------------------------------------------------------------
// "PARA ODAKLI" KARAR MANTIĞI  (simulateKisilikler.ts "para" kişiliğinden)
// ---------------------------------------------------------------------------

interface SecenekOzeti {
  p: number;
  bekPara: number;
  bekSaglik: number;
  bekUn: number;
  paraKazanci: number;
  paraGideri: number;
  enKotuSaglik: number;
  olumRiski: number;
  hapisRiski: number;
  sucArtisi: number;
  maliyet: number;
}
function sayi(x: number | undefined): number {
  return typeof x === "number" ? x : 0;
}
function secenekOzetiCikar(s: Secenek): SecenekOzeti {
  const b = s.basarili_sonuc ?? {};
  const k = s.basarisiz_sonuc ?? {};
  const p = kirp(s.basari_sansi / 100, 0, 1);
  const bek = (alan: "para" | "saglik" | "un") => p * sayi((b as any)[alan]) + (1 - p) * sayi((k as any)[alan]);
  const bekPara = bek("para");
  return {
    p,
    bekPara,
    bekSaglik: bek("saglik"),
    bekUn: bek("un"),
    paraKazanci: Math.max(0, bekPara),
    paraGideri: Math.max(0, -bekPara),
    enKotuSaglik: Math.min(sayi(b.saglik), sayi(k.saglik)),
    olumRiski: (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sayi(b.olum_sansi) + sayi(k.olum_sansi)) / 100,
    hapisRiski: (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0),
    sucArtisi: sayi(b.suc_artis) + sayi(k.suc_artis),
    maliyet: sayi(s.maliyet),
  };
}

/** "para" kişiliğinin seçenek puanı: beklenen parayı maksimize et. */
function paraPuani(o: SecenekOzeti): number {
  return (
    o.bekPara * 1.0 +
    o.paraKazanci * 0.35 +
    o.bekUn * 0.6 +
    o.p * 5 -
    o.olumRiski * 260 -
    o.hapisRiski * 50 -
    o.paraGideri * 0.25
  );
}

/** Ortak "hayatta kal" tabanı (kisilikler.ts tabanGuvenlik'i) — sağlık düştükçe güçlenir. */
function tabanGuvenlik(o: SecenekOzeti, saglik: number): number {
  const panik = saglik < 45 ? 2.2 : saglik < 65 ? 1.4 : 1;
  return (
    o.p * 14 * panik +
    o.enKotuSaglik * 2.4 * panik +
    Math.min(0, o.bekSaglik) * 1.2 -
    o.olumRiski * 130 -
    o.hapisRiski * 30 -
    Math.max(0, -o.bekPara) * 0.35
  );
}

const KONSANTRASYON = 1.7;
const ISRAR_TABANI = 0.35;

function secenekSec(secenekler: Secenek[], state: CharacterState): number {
  const uygunlar = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygunlar.length > 0 ? uygunlar : secenekler.map((s, i) => ({ s, i }));
  if (havuz.length === 1) return havuz[0].i;

  const borcBaskisi = state.para < 0 ? kirp(-state.para / 40, 0.8, 3.5) : 0;
  const puanlar = havuz.map((x) => {
    const o = secenekOzetiCikar(x.s);
    return paraPuani(o) + tabanGuvenlik(o, state.saglik) + borcBaskisi * o.bekPara;
  });
  const enDusuk = Math.min(...puanlar);
  const agirliklar = puanlar.map((pu) => {
    const taban = pu - enDusuk + 1;
    return Math.max(1e-6, Math.pow(taban, KONSANTRASYON)) * (0.82 + Math.random() * 0.36);
  });
  const toplam = agirliklar.reduce((a, b) => a + b, 0);
  let hedef = Math.random() * toplam;
  for (let k = 0; k < havuz.length; k++) {
    hedef -= agirliklar[k];
    if (hedef <= 0) return havuz[k].i;
  }
  return havuz[havuz.length - 1].i;
}

function tepkiSec(state: CharacterState): number {
  const fevrilik = state.kisilik_eksenleri?.fevrilik ?? 50;
  const olasilik = kirp(ISRAR_TABANI + ((fevrilik - 50) / 100) * 0.3, 0.02, 0.96);
  return Math.random() < olasilik ? 1 : 0;
}

/**
 * min gerçek bir tabandır — para yetmese bile bu kademenin altına düşülmez.
 * "para" kişiliği: konut [1..2] (mutevazi_yuva..sicak_ocak), sofra [1..2] (sade_sofra..keyifli_sofra).
 */
const KONUT_MIN = 1, KONUT_MAX = 2, KONUT_ORAN = 0.35;
const YASAM_MIN = 1, YASAM_MAX = 2, YASAM_ORAN = 0.3;
const KONUT_MALIYET = KONUTLAR.map((k) => k.kiraYillik);
const YASAM_MALIYET = YASAM_SECENEKLERI.map((y) => y.maliyetYillik);

function hedefKademe(maliyetler: number[], maasYillik: number, para: number, oran: number, min: number, max: number): number {
  let secilen = min;
  for (let i = min; i <= Math.min(max, maliyetler.length - 1); i++) {
    const m = maliyetler[i];
    if (m <= maasYillik * oran || m * 6 <= para) secilen = i;
  }
  return secilen;
}

interface Sayaclar {
  yatirimSayisi: number;
  mulkSayisi: number;
  magazaSifaSayisi: number;
  magazaLuksSayisi: number;
  zarSayisi: number;
  sosyallesmeSayisi: number;
  kendiIsHarcanan: number;
  mulkHarcanan: number;
  enYuksekPara: number;
}

// Yan-eylem ayarları. İki mod:
//   hoarder (varsayılan) — olaylarda parayı seçer ama kazandığını BİRİKTİRİR;
//     kendi-işi/mülke nadiren girer (kullanıcı: "ne zaman oynasam deli para birikiyor").
//   yatirimci — "para" kişiliği: agresif kendi-işi + tüm kârlı mülkler.
const MOD = (process.env.SIM_MOD ?? "hoarder").trim();
const YAN =
  MOD === "yatirimci"
    ? {
        yatirimSans: 0.6, yatirimNakitKat: 1.05, mulkSans: 0.6, mulkNakitKat: 1.15, mulkRiskliKabul: true,
        sifaSaglikEsigi: 50, sifaSans: 0.35, luksSans: 0.1, luksNakitKat: 5.0, envanterSaglikEsigi: 45,
        zarSans: 0.05, sosyalSans: 0.1,
      }
    : {
        yatirimSans: 0.1, yatirimNakitKat: 3.0, mulkSans: 0.08, mulkNakitKat: 3.0, mulkRiskliKabul: false,
        sifaSaglikEsigi: 55, sifaSans: 0.4, luksSans: 0.06, luksNakitKat: 6.0, envanterSaglikEsigi: 50,
        zarSans: 0.03, sosyalSans: 0.12,
      };

async function yanEylemler(id: string, state: CharacterState, sayaclar: Sayaclar): Promise<void> {
  let maasYillik = state.maas_yillik ?? 10;
  try {
    const f = await finansGetir(id);
    maasYillik = f.maasYillik ?? maasYillik;
  } catch {
    /* yok say */
  }

  // 1) Konut & sofra — nötr tabanın (index 1) ALTINA asla inme.
  try {
    if (state.para < 0) {
      const kIdx = KONUTLAR.findIndex((k) => k.id === state.konut_id);
      const yIdx = YASAM_SECENEKLERI.findIndex((y) => y.id === state.yasam_secimi_id);
      if (kIdx > 1) await konutDegistir(id, "mutevazi_yuva");
      if (yIdx > 1) await yasamSecimiDegistir(id, "sade_sofra");
    } else {
      const kIdx = hedefKademe(KONUT_MALIYET, maasYillik, state.para, KONUT_ORAN, KONUT_MIN, KONUT_MAX);
      const yIdx = hedefKademe(YASAM_MALIYET, maasYillik, state.para, YASAM_ORAN, YASAM_MIN, YASAM_MAX);
      if (KONUTLAR[kIdx].id !== state.konut_id) await konutDegistir(id, KONUTLAR[kIdx].id);
      if (YASAM_SECENEKLERI[yIdx].id !== state.yasam_secimi_id) await yasamSecimiDegistir(id, YASAM_SECENEKLERI[yIdx].id);
    }
  } catch {
    /* yok say */
  }

  // 2) Kendi işine yatırım — agresif.
  try {
    if (state.saglik > 22 && Math.random() < YAN.yatirimSans) {
      const cfg = await yatirimConfigGetir(id);
      if (state.para >= cfg.kendiIsiMaliyeti * YAN.yatirimNakitKat && state.para - cfg.kendiIsiMaliyeti >= 12) {
        await yatirimYap(id);
        sayaclar.yatirimSayisi++;
        sayaclar.kendiIsHarcanan += cfg.kendiIsiMaliyeti;
      }
    }
  } catch {
    /* yok say */
  }

  // 3) Piyasa mülkü — tüm kârlılar.
  try {
    if (state.saglik > 22 && Math.random() < YAN.mulkSans) {
      const mulkler = await mulkConfigGetir(id);
      let adaylar = mulkler.filter((m) => !m.sahipMi && m.maliyet <= state.para / YAN.mulkNakitKat && state.para - m.maliyet >= 12);
      if (!YAN.mulkRiskliKabul) adaylar = adaylar.filter((m) => m.tahminiYillikGetiriYuzdesi > -3);
      if (adaylar.length > 0) {
        const secilen = adaylar.reduce((a, b) => (b.tahminiYillikGetiriYuzdesi > a.tahminiYillikGetiriYuzdesi ? b : a));
        await mulkSatinAl(id, secilen.tur);
        sayaclar.mulkSayisi++;
        sayaclar.mulkHarcanan += secilen.maliyet;
      }
    }
  } catch {
    /* yok say */
  }

  // 4) Mağaza — şifa (sağlık düşünce, acilde herkes alır).
  try {
    const acil = state.saglik < 40;
    const alSans = Math.max(YAN.sifaSans, acil ? 0.85 : state.saglik < 58 ? 0.45 : 0);
    if ((state.saglik < YAN.sifaSaglikEsigi || state.saglik < 58) && Math.random() < alSans) {
      const katalog = await magazaConfigGetir(id);
      const butce = acil ? state.para * 0.95 : state.para * 0.8;
      const adaylar = katalog.filter((e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= butce);
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = acil ? adaylar[adaylar.length - 1] : adaylar[0];
        await magazadanSatinAl(id, secilen.id);
        sayaclar.magazaSifaSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 5) Mağaza — lüks (nadiren, çok zenginken).
  try {
    if (Math.random() < YAN.luksSans) {
      const katalog = await magazaConfigGetir(id);
      const adaylar = katalog.filter((e) => e.kategori === "luks" && !e.sahipMi && e.fiyat <= state.para / YAN.luksNakitKat);
      if (adaylar.length > 0) {
        await magazadanSatinAl(id, rastgele(adaylar).id);
        sayaclar.magazaLuksSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 6) Envanterdeki şifayı kullan.
  try {
    const sifalar = state.magaza_envanteri.filter((e) => e.kategori === "sifa");
    if (state.saglik < Math.max(YAN.envanterSaglikEsigi, 58) && sifalar.length > 0) {
      const secilen = [...sifalar].sort((a, b) => (a.kalanYil ?? 99) - (b.kalanYil ?? 99))[0];
      await envanterEsyasiKullan(id, secilen.id);
    }
  } catch {
    /* yok say */
  }

  // 7) Zar (çok seyrek).
  try {
    if (YAN.zarSans > 0 && Math.random() < YAN.zarSans) {
      const kademeler = await zarKademeleriGetir(id);
      const uygun = kademeler.filter((k) => k <= state.para * 0.5);
      if (uygun.length > 0) {
        await zarAt(id, uygun[0]);
        sayaclar.zarSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 8) Sosyalleşme.
  try {
    if (Math.random() < YAN.sosyalSans) {
      const yerler = await sosyallesmeYerleriGetir(id);
      const ayik = yerler.filter((y) => !y.alkolluMu);
      const havuz = ayik.length ? ayik : yerler;
      if (havuz.length > 0) {
        await sosyallesmeYerineGit(id, rastgele(havuz).id);
        sayaclar.sosyallesmeSayisi++;
      }
    }
  } catch {
    /* yok say */
  }
}

// ---------------------------------------------------------------------------
// ANLIK DURUM + ÖMÜR İZİ
// ---------------------------------------------------------------------------

interface AnlikDurum {
  yas: number;
  para: number;
  servet: number;
  saglik: number;
  mutluluk: number;
  un: number;
  ahlak: number;
  suc: number;
  maas: number;
  rutbeSeviye: number;
  kariyerPuani: number;
  sehirYonetim: number;
  borclu: boolean;
  evli: boolean;
  yasayanCocuk: number;
  mulkSayisi: number;
  ayyas: boolean;
  hapiste: boolean;
  kacak: boolean;
  yolculukta: boolean;
}

interface OyunIzi {
  cag: Cag;
  meslek: string;
  bolge: string;
  olumYasi: number;
  olumNedeni: string | null;
  efsaneviOlum: string | null;
  skor: number;
  hayatAmaciTamam: boolean;
  hataMi: boolean;
  sonRutbeSeviye: number;
  enYuksekPara: number;
  sayaclar: Sayaclar;
  anlar: AnlikDurum[];
}

function anlikCek(state: CharacterState): AnlikDurum {
  const gd = gayrimenkulDegeriHesapla(state);
  return {
    yas: state.yas,
    para: state.para,
    servet: state.para + gd,
    saglik: state.saglik,
    mutluluk: state.mutluluk,
    un: state.un,
    ahlak: state.ahlak,
    suc: state.suc_seviyesi,
    maas: state.maas_yillik ?? 0,
    rutbeSeviye: state.rutbe_seviye,
    kariyerPuani: state.kariyer_puani,
    sehirYonetim: state.sehir_yonetim_seviyesi,
    borclu: state.para < 0,
    evli: state.etiketler.includes("medeni:evli") || state.es_adi !== null,
    yasayanCocuk: state.cocuklar.filter((c) => c.yasiyor).length,
    mulkSayisi: state.mulkler.length,
    ayyas: state.etiketler.includes("bagimlilik:ayyas"),
    hapiste: state.etiketler.includes("hapiste"),
    kacak: state.etiketler.includes("kacak"),
    yolculukta: state.etiketler.includes("yolculukta"),
  };
}

async function birOyun(cag: Cag, meslek: string): Promise<OyunIzi> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  let state = await yeniOyun(cag, bolge, yerlesim);
  await mesleğiAta(state.id, meslek);
  const id = state.id;

  const sayaclar: Sayaclar = {
    yatirimSayisi: 0,
    mulkSayisi: 0,
    magazaSifaSayisi: 0,
    magazaLuksSayisi: 0,
    zarSayisi: 0,
    sosyallesmeSayisi: 0,
    kendiIsHarcanan: 0,
    mulkHarcanan: 0,
    enYuksekPara: state.para,
  };

  const anlar: AnlikDurum[] = [];
  let hataMi = false;
  let guard = 0;
  anlar.push(anlikCek(await stateGetir(id)));

  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await yanEylemler(id, state, sayaclar);
      state = await stateGetir(id);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, tepkiSec(state));
      }
      state = await stateGetir(id);
      sayaclar.enYuksekPara = Math.max(sayaclar.enYuksekPara, state.para);
      anlar.push(anlikCek(state));
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${cag}/${meslek} (${id}): ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  return {
    cag,
    meslek,
    bolge: son.bolge,
    olumYasi: son.yas,
    olumNedeni: son.olum_nedeni,
    efsaneviOlum: son.efsanevi_olum,
    skor: Math.round(hesaplaSkor(son)),
    hayatAmaciTamam: son.hayat_amaci?.tamamlandi ?? false,
    hataMi,
    sonRutbeSeviye: son.rutbe_seviye,
    enYuksekPara: y2(sayaclar.enYuksekPara),
    sayaclar,
    anlar,
  };
}

function yastakiDurum(iz: OyunIzi, yas: number): AnlikDurum | null {
  if (iz.olumYasi < yas) return null;
  let sonuc: AnlikDurum | null = null;
  for (const a of iz.anlar) {
    if (a.yas <= yas) sonuc = a;
    else break;
  }
  return sonuc;
}

interface KovaOzet {
  yasKovasi: number;
  yasayanSayi: number;
  hayattaKalmaOrani: number;
  buPencerede_olum: number;
  ort: Record<string, number>;
  oran: Record<string, number>;
}

function kovaAnaliz(izler: OyunIzi[]): KovaOzet[] {
  const toplam = izler.length;
  const ozetler: KovaOzet[] = [];
  for (let ki = 0; ki < KOVALAR.length; ki++) {
    const yas = KOVALAR[ki];
    const oncekiYas = ki === 0 ? -1 : KOVALAR[ki - 1];
    const durumlar: AnlikDurum[] = [];
    for (const iz of izler) {
      const d = yastakiDurum(iz, yas);
      if (d) durumlar.push(d);
    }
    const yasayanSayi = durumlar.length;
    let buPencerede = 0;
    for (const iz of izler) if (iz.olumYasi > oncekiYas && iz.olumYasi <= yas) buPencerede++;
    const nz = Math.max(1, yasayanSayi);

    ozetler.push({
      yasKovasi: yas,
      yasayanSayi,
      hayattaKalmaOrani: y2((yasayanSayi / toplam) * 100),
      buPencerede_olum: buPencerede,
      ort: {
        para: y2(ortala(durumlar.map((d) => d.para))),
        servet: y2(ortala(durumlar.map((d) => d.servet))),
        saglik: y2(ortala(durumlar.map((d) => d.saglik))),
        mutluluk: y2(ortala(durumlar.map((d) => d.mutluluk))),
        un: y2(ortala(durumlar.map((d) => d.un))),
        ahlak: y2(ortala(durumlar.map((d) => d.ahlak))),
        suc: y2(ortala(durumlar.map((d) => d.suc))),
        yildiz: y2(ortala(durumlar.map((d) => Math.min(5, d.suc / 20)))),
        maas: y2(ortala(durumlar.map((d) => d.maas))),
        rutbeSeviye: y2(ortala(durumlar.map((d) => d.rutbeSeviye))),
        kariyerPuani: y2(ortala(durumlar.map((d) => d.kariyerPuani))),
        sehirYonetim: y2(ortala(durumlar.map((d) => d.sehirYonetim))),
        yasayanCocuk: y2(ortala(durumlar.map((d) => d.yasayanCocuk))),
        mulkSayisi: y2(ortala(durumlar.map((d) => d.mulkSayisi))),
      },
      oran: {
        borclu: y2((durumlar.filter((d) => d.borclu).length / nz) * 100),
        evli: y2((durumlar.filter((d) => d.evli).length / nz) * 100),
        ayyas: y2((durumlar.filter((d) => d.ayyas).length / nz) * 100),
        hapiste: y2((durumlar.filter((d) => d.hapiste).length / nz) * 100),
        kacak: y2((durumlar.filter((d) => d.kacak).length / nz) * 100),
        yolculukta: y2((durumlar.filter((d) => d.yolculukta).length / nz) * 100),
        mulkVar: y2((durumlar.filter((d) => d.mulkSayisi > 0).length / nz) * 100),
        sucTemiz: y2((durumlar.filter((d) => d.suc < 20).length / nz) * 100),
        sucK1: y2((durumlar.filter((d) => d.suc >= 20 && d.suc < 40).length / nz) * 100),
        sucK2: y2((durumlar.filter((d) => d.suc >= 40 && d.suc < 60).length / nz) * 100),
        sucK3p: y2((durumlar.filter((d) => d.suc >= 60).length / nz) * 100),
      },
    });
  }
  return ozetler;
}

function tabloYazdir(baslik: string, izler: OyunIzi[]): void {
  const ozet = kovaAnaliz(izler);
  console.log(`\n\n################  ${baslik}  (${izler.length} ömür)  ################`);

  const olumYaslari = izler.map((i) => i.olumYasi);
  console.log(`Ortalama ömür: ${y2(ortala(olumYaslari))} yaş | medyan ${medyan(olumYaslari)} | min ${Math.min(...olumYaslari)} / max ${Math.max(...olumYaslari)}`);
  console.log(
    `Ortalama skor: ${y2(ortala(izler.map((i) => i.skor)))} | en yüksek görülen para (ömür zirvesi ort.): ${y2(ortala(izler.map((i) => i.enYuksekPara)))} | hayat amacı: ${y2((izler.filter((i) => i.hayatAmaciTamam).length / izler.length) * 100)}%`
  );
  const rd: Record<number, number> = {};
  for (const i of izler) rd[i.sonRutbeSeviye] = (rd[i.sonRutbeSeviye] ?? 0) + 1;
  console.log(`Son rütbe dağılımı: ${Object.entries(rd).sort().map(([k, v]) => `S${k}:${y2((v / izler.length) * 100)}%`).join("  ")}`);
  console.log(
    `Ömür başına ort. eylem: yatırım ${y2(ortala(izler.map((i) => i.sayaclar.yatirimSayisi)))} | mülk ${y2(ortala(izler.map((i) => i.sayaclar.mulkSayisi)))} | şifa ${y2(ortala(izler.map((i) => i.sayaclar.magazaSifaSayisi)))} | lüks ${y2(ortala(izler.map((i) => i.sayaclar.magazaLuksSayisi)))} | zar ${y2(ortala(izler.map((i) => i.sayaclar.zarSayisi)))} | sosyal ${y2(ortala(izler.map((i) => i.sayaclar.sosyallesmeSayisi)))}`
  );

  // Ömür boyunca EN AZ BİR KEZ şunu yapan ömürlerin yüzdesi:
  const p = (f: (i: OyunIzi) => boolean) => y2((izler.filter(f).length / izler.length) * 100);
  console.log(
    `Ömrün EN AZ 1 kez: mülk aldı %${p((i) => i.sayaclar.mulkSayisi > 0)} | kendi-iş yatırımı %${p((i) => i.sayaclar.yatirimSayisi > 0)} | mağaza-şifa %${p((i) => i.sayaclar.magazaSifaSayisi > 0)} | mağaza-lüks %${p((i) => i.sayaclar.magazaLuksSayisi > 0)} | sosyalleşti %${p((i) => i.sayaclar.sosyallesmeSayisi > 0)} | zar %${p((i) => i.sayaclar.zarSayisi > 0)} | hapis %${p((i) => i.anlar.some((a) => a.hapiste))} | kaçak %${p((i) => i.anlar.some((a) => a.kacak))} | ayyaş %${p((i) => i.anlar.some((a) => a.ayyas))} | evlendi %${p((i) => i.anlar.some((a) => a.evli))} | çocuk %${p((i) => i.anlar.some((a) => a.yasayanCocuk > 0))}`
  );

  const bsl = ["Yaş", "Yaşyor%", "Para", "Servet", "Sağlk", "Mutlk", "Şöhrt", "Ahlak", "Suç", "Yıldz", "Maaş", "Rütbe", "Krej", "Çocuk", "Mülk", "Borç%", "Evli%", "5y-Ölm"];
  console.log("\n" + bsl.map((b) => b.padStart(8)).join(" "));
  console.log("-".repeat(bsl.length * 9));
  for (const o of ozet) {
    if (o.yasayanSayi === 0 && o.buPencerede_olum === 0) continue;
    console.log(
      [
        String(o.yasKovasi),
        o.hayattaKalmaOrani.toFixed(1),
        o.ort.para.toFixed(1),
        o.ort.servet.toFixed(1),
        o.ort.saglik.toFixed(1),
        o.ort.mutluluk.toFixed(1),
        o.ort.un.toFixed(1),
        o.ort.ahlak.toFixed(1),
        o.ort.suc.toFixed(1),
        o.ort.yildiz.toFixed(2),
        o.ort.maas.toFixed(1),
        o.ort.rutbeSeviye.toFixed(2),
        o.ort.kariyerPuani.toFixed(0),
        o.ort.yasayanCocuk.toFixed(2),
        o.ort.mulkSayisi.toFixed(2),
        o.oran.borclu.toFixed(0),
        o.oran.evli.toFixed(0),
        String(o.buPencerede_olum),
      ]
        .map((s) => s.padStart(8))
        .join(" ")
    );
  }

  console.log("\n  Durum oranları (%):  Yaş | Ayyaş | Hapis | Kaçak | Yolculuk | Mülk-sahibi | ŞehirYön(ort)");
  for (const o of ozet) {
    if (o.yasayanSayi === 0) continue;
    console.log(
      `   ${String(o.yasKovasi).padStart(3)}  | ${o.oran.ayyas.toFixed(1).padStart(5)} | ${o.oran.hapiste.toFixed(1).padStart(5)} | ${o.oran.kacak.toFixed(1).padStart(5)} | ${o.oran.yolculukta.toFixed(1).padStart(8)} | ${o.oran.mulkVar.toFixed(1).padStart(11)} | ${o.ort.sehirYonetim.toFixed(2)}`
    );
  }

  console.log("\n  Aranma/suç kademesi dağılımı (yaşayanların %'si):  Yaş | Temiz(0★) | Kad.1(1★) | Kad.2(2★) | Kad.3+(3★+)");
  for (const o of ozet) {
    if (o.yasayanSayi === 0) continue;
    console.log(
      `   ${String(o.yasKovasi).padStart(3)}  | ${o.oran.sucTemiz.toFixed(1).padStart(8)} | ${o.oran.sucK1.toFixed(1).padStart(8)} | ${o.oran.sucK2.toFixed(1).padStart(8)} | ${o.oran.sucK3p.toFixed(1).padStart(9)}`
    );
  }

  const nedenler: Record<string, number> = {};
  for (const i of izler) {
    const n = i.olumNedeni ?? "bilinmiyor";
    nedenler[n] = (nedenler[n] ?? 0) + 1;
  }
  console.log("\n  Ölüm nedenleri (ilk 12):");
  for (const [n, c] of Object.entries(nedenler).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`   ${String(c).padStart(4)}  ${y2((c / izler.length) * 100).toFixed(1).padStart(5)}%  ${n.slice(0, 90)}`);
  }
}

async function main(): Promise<void> {
  let caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  if (CAG_FILTRE.length) caglar = caglar.filter((c) => CAG_FILTRE.includes(c));
  let meslekler = [...MESLEKLER];
  if (MESLEK_FILTRE.length) meslekler = meslekler.filter((m) => MESLEK_FILTRE.includes(m));

  const komb: { cag: Cag; meslek: string }[] = [];
  for (const cag of caglar) for (const meslek of meslekler) komb.push({ cag, meslek });

  const tumIzler: OyunIzi[] = [];
  const baslangic = Date.now();
  const toplamHedef = komb.length * N_PER_GROUP;
  let oynanan = 0;

  for (const { cag, meslek } of komb) {
    console.log(`\n=== ${cag} — ${meslek}: ${N_PER_GROUP} ömür ===`);
    for (let i = 0; i < N_PER_GROUP; i++) {
      const iz = await birOyun(cag, meslek);
      tumIzler.push(iz);
      oynanan++;
      if ((i + 1) % 20 === 0 || i === N_PER_GROUP - 1) {
        const sn = ((Date.now() - baslangic) / 1000).toFixed(0);
        console.log(`  ${i + 1}/${N_PER_GROUP} (toplam ${oynanan}/${toplamHedef}, ${sn}sn) — son: ${iz.olumYasi} yaş, para zirvesi ${iz.enYuksekPara}, ölüm: ${(iz.olumNedeni ?? "?").slice(0, 40)}`);
      }
    }
  }

  const hamYol = path.join(__dirname, "simulate5YilOrtalama.sonuc.json");
  fs.writeFileSync(
    hamYol,
    JSON.stringify(tumIzler.map((i) => ({ ...i, anlar: i.anlar.map((a) => ({ ...a, para: y2(a.para), servet: y2(a.servet), maas: y2(a.maas) })) })), null, 2),
    "utf-8"
  );
  console.log(`\nHam iz verisi: ${hamYol}`);
  const hatali = tumIzler.filter((i) => i.hataMi).length;
  if (hatali) console.log(`Uyarı: ${hatali}/${tumIzler.length} ömür bir hatayla erken bitti.`);

  tabloYazdir("GENEL — Para odaklı oyuncu (tüm çağ × meslek)", tumIzler);
  for (const cag of caglar) tabloYazdir(`ÇAĞ: ${cag}`, tumIzler.filter((i) => i.cag === cag));
  for (const meslek of meslekler) tabloYazdir(`MESLEK: ${meslek}`, tumIzler.filter((i) => i.meslek === meslek));

  console.log(`\n\nToplam ${tumIzler.length} ömür, ${((Date.now() - baslangic) / 1000).toFixed(0)} saniyede.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
