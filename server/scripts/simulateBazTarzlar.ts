/**
 * "Temel ev + temel yemek" sabitken farklı OYUN TARZLARININ 5'er yıllık gelişimi.
 *
 * Kullanıcı isteği: oyunu en düşük konut (basit_barinak) + en düşük satın-alınan
 * yemek (ucuza_ye) kademesine KİLİTLEYEREK defalarca oyna; her tarz için tüm oyun
 * içi dinamikleri (şifa/mağaza, sosyalleşme, gayrimenkul+kendi işi, yeraltı zarı,
 * suç) kullan; sonra HER 5 YILDA BİR, tüm ömürlerin ortalamasını al: can, şöhret,
 * servet (para + gayrimenkul), ahlak, aranma, mutluluk, rütbe + hayatta kalma oranı.
 *
 * Konut/yaşam tarzı ömür boyunca ASLA değiştirilmez (kilit budur). Diğer her
 * mekanik tarza göre serbest.
 *
 * Kullanım:  npx tsx scripts/simulateBazTarzlar.ts
 *   SIM_N=200          -> her (tarz × çağ × meslek) için ömür sayısı (varsayılan 120)
 *   SIM_TARZ=kumar,suc -> yalnız bu tarzlar
 *   SIM_KONUT=ahsap_ev / SIM_YASAM=copten_topla -> kilit kademelerini değiştir
 * Çıktı: scripts/simulateBazTarzlar.sonuc.json (ham ömürler)
 *        scripts/simulateBazTarzlar.analiz.json (5'er yıl ortalama tablosu)
 *        + konsola özet tablo
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
  sosyallesmeYerleriGetir,
  sosyallesmeYerineGit,
  magazaConfigGetir,
  magazadanSatinAl,
  envanterEsyasiKullan,
  zarKademeleriGetir,
  zarAt,
} from "../src/game/gameEngine";
import { yatirimConfigGetir, yatirimYap } from "./_yatirimShim";
import {
  MESLEKLER,
  BOLGELER_BY_CAG,
  hesaplaSkor,
  gayrimenkulDegeriHesapla,
} from "../src/game/stateManager";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag, Secenek } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 120);
const MAX_TUR_GUARD = 400;
const KILIT_KONUT = process.env.SIM_KONUT ?? "basit_barinak";
const KILIT_YASAM = process.env.SIM_YASAM ?? "ucuza_ye";

// 5'er yıllık anlık-görüntü sınırları.
const YAS_KILOMETRELER: number[] = [];
for (let y = 15; y <= 95; y += 5) YAS_KILOMETRELER.push(y);

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function kirp(x: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, x));
}
function sayi(x: number | undefined): number {
  return typeof x === "number" ? x : 0;
}

// ---------------------------------------------------------------------------
// Seçenek özeti (basariliSonuc/basarisizSonuc ham etkilerinden)
// ---------------------------------------------------------------------------
interface SecenekOzeti {
  p: number;
  bekPara: number;
  bekSaglik: number;
  bekAhlak: number;
  bekUn: number;
  bekMutluluk: number;
  paraKazanci: number;
  paraGideri: number;
  enKotuSaglik: number;
  olumRiski: number;
  hapisRiski: number;
  sucArtisi: number;
  sucKazanciImzasi: boolean;
  maliyet: number;
}

function secenekOzetiCikar(s: Secenek): SecenekOzeti {
  const b = s.basarili_sonuc ?? {};
  const k = s.basarisiz_sonuc ?? {};
  const p = kirp(s.basari_sansi / 100, 0, 1);
  const bek = (alan: "para" | "saglik" | "ahlak" | "un" | "mutluluk") =>
    p * sayi((b as any)[alan]) + (1 - p) * sayi((k as any)[alan]);
  const bekPara = bek("para");
  return {
    p,
    bekPara,
    bekSaglik: bek("saglik"),
    bekAhlak: bek("ahlak"),
    bekUn: bek("un"),
    bekMutluluk: bek("mutluluk"),
    paraKazanci: Math.max(0, bekPara),
    paraGideri: Math.max(0, -bekPara),
    enKotuSaglik: Math.min(sayi(b.saglik), sayi(k.saglik)),
    olumRiski: (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sayi(b.olum_sansi) + sayi(k.olum_sansi)) / 100,
    hapisRiski: (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0),
    sucArtisi: sayi(b.suc_artis) + sayi(k.suc_artis),
    sucKazanciImzasi:
      (sayi(b.para) > 0 && sayi(b.ahlak) <= -5) || (sayi(k.para) > 0 && sayi(k.ahlak) <= -5),
    maliyet: sayi(s.maliyet),
  };
}

/** Tüm tarzların paylaştığı "hayatta kal" tabanı (kişilik simülasyonundaki ile aynı ruh). */
function tabanGuvenlik(o: SecenekOzeti, saglik: number): number {
  const panik = saglik < 45 ? 2.2 : saglik < 65 ? 1.4 : 1;
  return (
    o.p * 16 * panik +
    o.enKotuSaglik * 2.6 * panik +
    Math.min(0, o.bekSaglik) * 1.3 -
    o.olumRiski * 150 -
    o.hapisRiski * 32 -
    Math.max(0, -o.bekPara) * 0.35
  );
}

// ---------------------------------------------------------------------------
// TARZLAR
// ---------------------------------------------------------------------------
interface YanAyar {
  yatirimSans: number;
  yatirimNakitKat: number;
  mulkSans: number;
  mulkNakitKat: number;
  mulkKaraborsaTercih: boolean;
  mulkRiskliKabul: boolean;
  sifaSaglikEsigi: number;
  sifaSans: number;
  sifaEnIyiyiAl: boolean;
  luksSans: number;
  luksNakitKat: number;
  envanterSaglikEsigi: number;
  zarSans: number;
  zarYuksekTercih: boolean;
  sosyalSans: number;
  sosyalAlkol: "prefer" | "avoid" | "any";
}

interface Tarz {
  id: string;
  ad: string;
  aciklama: string;
  konsantrasyon: number;
  israrTabani: number;
  secenekTilt: (o: SecenekOzeti, kategori: string, state: CharacterState) => number;
  yan: YanAyar;
}

const YAN_SIFIR: YanAyar = {
  yatirimSans: 0,
  yatirimNakitKat: 3,
  mulkSans: 0,
  mulkNakitKat: 3,
  mulkKaraborsaTercih: false,
  mulkRiskliKabul: false,
  sifaSaglikEsigi: 55,
  sifaSans: 0.25,
  sifaEnIyiyiAl: false,
  luksSans: 0,
  luksNakitKat: 3,
  envanterSaglikEsigi: 55,
  zarSans: 0,
  zarYuksekTercih: false,
  sosyalSans: 0,
  sosyalAlkol: "avoid",
};

const TARZLAR: Tarz[] = [
  {
    id: "denge",
    ad: "Dengeli (kontrol)",
    aciklama: "En güvenli seçim, minimum yan eylem. Diğer tarzlar bununla kıyaslanır.",
    konsantrasyon: 2.6,
    israrTabani: 0.1,
    secenekTilt: (o) => o.p * 40 - o.olumRiski * 300 - Math.max(0, -o.bekPara) * 0.4,
    yan: { ...YAN_SIFIR, sifaSans: 0.2 },
  },
  {
    id: "sifa",
    ad: "Şifa / Sağlık odaklı",
    aciklama: "Mağazadan şifa eşyası + envanter kullanımını agresif kullanır.",
    konsantrasyon: 2.6,
    israrTabani: 0.08,
    secenekTilt: (o) => o.p * 34 + o.enKotuSaglik * 4 + o.bekSaglik * 2 - o.olumRiski * 340,
    yan: {
      ...YAN_SIFIR,
      sifaSaglikEsigi: 90,
      sifaSans: 0.75,
      sifaEnIyiyiAl: true,
      envanterSaglikEsigi: 82,
    },
  },
  {
    id: "sosyal",
    ad: "Sosyalleşme odaklı",
    aciklama: "Her fırsatta sosyalleşme mekânına gider (alkollü/ayık karışık).",
    konsantrasyon: 2.2,
    israrTabani: 0.2,
    secenekTilt: (o) => o.p * 26 + o.bekMutluluk * 3 + o.bekUn * 1.5 - o.olumRiski * 300,
    yan: { ...YAN_SIFIR, sosyalSans: 0.7, sosyalAlkol: "any", sifaSans: 0.25 },
  },
  {
    id: "gayrimenkul",
    ad: "Gayrimenkul + kendi işi",
    aciklama: "Nakit birikince agresif mülk alır + kendi işine yatırım yapar.",
    konsantrasyon: 1.9,
    israrTabani: 0.25,
    secenekTilt: (o) => o.bekPara * 1.0 + o.paraKazanci * 0.4 + o.p * 10 - o.olumRiski * 280 - o.hapisRiski * 45,
    yan: {
      ...YAN_SIFIR,
      yatirimSans: 0.55,
      yatirimNakitKat: 1.1,
      mulkSans: 0.6,
      mulkNakitKat: 1.15,
      mulkKaraborsaTercih: false,
      mulkRiskliKabul: false,
      sifaSans: 0.3,
    },
  },
  {
    id: "kumar",
    ad: "Kumar / Yeraltı zarı",
    aciklama: "Nakdi oldukça yeraltı zar masasında oynar (yüksek kademe tercih).",
    konsantrasyon: 1.8,
    israrTabani: 0.4,
    secenekTilt: (o) => o.bekPara * 0.7 + o.p * 12 - o.olumRiski * 260 - o.hapisRiski * 40,
    yan: { ...YAN_SIFIR, zarSans: 0.6, zarYuksekTercih: true, sifaSans: 0.3 },
  },
  {
    id: "suc",
    ad: "Suç / Karaborsa",
    aciklama: "Ahlaki taviz + para veren seçenekler; karaborsa deposu + zar.",
    konsantrasyon: 1.6,
    israrTabani: 0.55,
    secenekTilt: (o) =>
      o.bekPara * 1.1 + (o.sucKazanciImzasi ? 70 : 0) + Math.max(0, o.sucArtisi) * 4 + o.p * 8 - o.olumRiski * 150 - o.hapisRiski * 35,
    yan: {
      ...YAN_SIFIR,
      mulkSans: 0.4,
      mulkNakitKat: 1.3,
      mulkKaraborsaTercih: true,
      mulkRiskliKabul: true,
      zarSans: 0.3,
      zarYuksekTercih: true,
      sosyalSans: 0.3,
      sosyalAlkol: "prefer",
      sifaSans: 0.3,
    },
  },
];

// ---------------------------------------------------------------------------
// Karar
// ---------------------------------------------------------------------------
function secenekSec(secenekler: Secenek[], tarz: Tarz, kategori: string, state: CharacterState): number {
  const uygunlar = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygunlar.length > 0 ? uygunlar : secenekler.map((s, i) => ({ s, i }));
  if (havuz.length === 1) return havuz[0].i;

  const borcBaskisi = state.para < 0 ? kirp(-state.para / 40, 0.8, 3.5) : 0;
  const puanlar = havuz.map((x) => {
    const o = secenekOzetiCikar(x.s);
    return tarz.secenekTilt(o, kategori, state) + tabanGuvenlik(o, state.saglik) + borcBaskisi * o.bekPara;
  });
  const enDusuk = Math.min(...puanlar);
  const kon = tarz.konsantrasyon;
  const agirliklar = puanlar.map((pu) => {
    const taban = pu - enDusuk + 1;
    return Math.max(1e-6, Math.pow(taban, kon)) * (0.82 + Math.random() * 0.36);
  });
  const toplam = agirliklar.reduce((a, b) => a + b, 0);
  let hedef = Math.random() * toplam;
  for (let k = 0; k < havuz.length; k++) {
    hedef -= agirliklar[k];
    if (hedef <= 0) return havuz[k].i;
  }
  return havuz[havuz.length - 1].i;
}

function tepkiSec(state: CharacterState, tarz: Tarz): number {
  const fevrilik = state.kisilik_eksenleri?.fevrilik ?? 50;
  const olasilik = kirp(tarz.israrTabani + ((fevrilik - 50) / 100) * 0.3, 0.02, 0.96);
  return Math.random() < olasilik ? 1 : 0;
}

interface Sayaclar {
  yatirim: number;
  mulk: number;
  sifa: number;
  luks: number;
  envanterKullan: number;
  zar: number;
  zarKazanma: number;
  sosyallesme: number;
  kendiIsHarcanan: number;
  mulkHarcanan: number;
  borcluTur: number;
}

async function yanEylemler(id: string, state: CharacterState, ky: YanAyar, s: Sayaclar): Promise<void> {
  // NOT: konut/yaşam tarzı burada BİLEREK hiç değiştirilmez — kilit budur.

  // Kendi işine yatırım
  try {
    if (state.saglik > 22 && Math.random() < ky.yatirimSans) {
      const cfg = await yatirimConfigGetir(id);
      if (state.para >= cfg.kendiIsiMaliyeti * ky.yatirimNakitKat && state.para - cfg.kendiIsiMaliyeti >= 12) {
        await yatirimYap(id);
        s.yatirim++;
        s.kendiIsHarcanan += cfg.kendiIsiMaliyeti;
      }
    }
  } catch {
    /* yok say */
  }

  // Piyasa mülkü
  try {
    if (state.saglik > 22 && Math.random() < ky.mulkSans) {
      const mulkler = await mulkConfigGetir(id);
      let adaylar = mulkler.filter(
        (m) => !m.sahipMi && m.maliyet <= state.para / ky.mulkNakitKat && state.para - m.maliyet >= 12
      );
      if (!ky.mulkRiskliKabul) adaylar = adaylar.filter((m) => m.tahminiYillikGetiriYuzdesi > -3);
      if (adaylar.length > 0) {
        let secilen = rastgele(adaylar);
        if (ky.mulkKaraborsaTercih) {
          const kb = adaylar.find((m) => m.tur === "karaborsa");
          secilen = kb ?? adaylar.reduce((a, b) => (b.tahminiYillikGetiriYuzdesi > a.tahminiYillikGetiriYuzdesi ? b : a));
        } else {
          secilen = adaylar.reduce((a, b) => (b.tahminiYillikGetiriYuzdesi > a.tahminiYillikGetiriYuzdesi ? b : a));
        }
        await mulkSatinAl(id, secilen.tur);
        s.mulk++;
        s.mulkHarcanan += secilen.maliyet;
      }
    }
  } catch {
    /* yok say */
  }

  // Mağaza — şifa (kişilik simülasyonundaki acil-şifa tabanıyla aynı)
  try {
    const acil = state.saglik < 40;
    const alSans = Math.max(ky.sifaSans, acil ? 0.85 : state.saglik < 58 ? 0.4 : 0);
    if ((state.saglik < ky.sifaSaglikEsigi || state.saglik < 58) && Math.random() < alSans) {
      const katalog = await magazaConfigGetir(id);
      const butce = acil ? state.para * 0.95 : state.para * 0.8;
      const adaylar = katalog.filter((e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= butce);
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = ky.sifaEnIyiyiAl || acil ? adaylar[adaylar.length - 1] : adaylar[0];
        await magazadanSatinAl(id, secilen.id);
        s.sifa++;
      }
    }
  } catch {
    /* yok say */
  }

  // Mağaza — lüks
  try {
    if (Math.random() < ky.luksSans) {
      const katalog = await magazaConfigGetir(id);
      const adaylar = katalog.filter((e) => e.kategori === "luks" && !e.sahipMi && e.fiyat <= state.para / ky.luksNakitKat);
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        await magazadanSatinAl(id, adaylar[adaylar.length - 1].id);
        s.luks++;
      }
    }
  } catch {
    /* yok say */
  }

  // Envanterdeki şifa eşyasını kullan
  try {
    const sifalar = state.magaza_envanteri.filter((e) => e.kategori === "sifa");
    if (state.saglik < Math.max(ky.envanterSaglikEsigi, 58) && sifalar.length > 0) {
      const secilen = [...sifalar].sort((a, b) => (a.kalanYil ?? 99) - (b.kalanYil ?? 99))[0];
      await envanterEsyasiKullan(id, secilen.id);
      s.envanterKullan++;
    }
  } catch {
    /* yok say */
  }

  // Yeraltı zarı
  try {
    if (ky.zarSans > 0 && Math.random() < ky.zarSans) {
      const kademeler = await zarKademeleriGetir(id);
      const uygun = kademeler.filter((k) => k <= state.para * 0.5);
      if (uygun.length > 0) {
        uygun.sort((a, b) => a - b);
        const tutar = ky.zarYuksekTercih ? uygun[uygun.length - 1] : rastgele(uygun);
        const sonuc = await zarAt(id, tutar);
        s.zar++;
        if (sonuc.kazandi) s.zarKazanma++;
      }
    }
  } catch {
    /* yok say */
  }

  // Sosyalleşme
  try {
    if (Math.random() < ky.sosyalSans) {
      const yerler = await sosyallesmeYerleriGetir(id);
      if (yerler.length > 0) {
        let havuz = yerler;
        if (ky.sosyalAlkol === "prefer") {
          const alk = yerler.filter((y) => y.alkolluMu);
          if (alk.length > 0) havuz = alk;
        } else if (ky.sosyalAlkol === "avoid") {
          const ayik = yerler.filter((y) => !y.alkolluMu);
          if (ayik.length > 0) havuz = ayik;
        }
        await sosyallesmeYerineGit(id, rastgele(havuz).id);
        s.sosyallesme++;
      }
    }
  } catch {
    /* yok say */
  }
}

// ---------------------------------------------------------------------------
// Anlık görüntü
// ---------------------------------------------------------------------------
interface Anlik {
  yas: number;
  saglik: number;
  un: number;
  para: number;
  gayrimenkul: number;
  servet: number;
  ahlak: number;
  aranma: number;
  mutluluk: number;
  rutbe_seviye: number;
}

function anlikCek(state: CharacterState): Anlik {
  const gm = gayrimenkulDegeriHesapla(state);
  return {
    yas: state.yas,
    saglik: state.saglik,
    un: state.un,
    para: Math.round(state.para * 100) / 100,
    gayrimenkul: gm,
    servet: Math.round((state.para + gm) * 100) / 100,
    ahlak: state.ahlak,
    aranma: state.suc_seviyesi,
    mutluluk: state.mutluluk,
    rutbe_seviye: state.rutbe_seviye,
  };
}

interface OyunKaydi {
  tarz: string;
  cag: Cag;
  meslek: string;
  bolge: string;
  olum_yasi: number;
  olum_nedeni: string | null;
  skor: number;
  yatirim: number;
  mulk: number;
  sifa: number;
  zar: number;
  zarKazanma: number;
  sosyallesme: number;
  borclu_tur: number;
  hataMi: boolean;
  anliklar: Anlik[]; // 5'er yıl kilometre-taşı anlık görüntüleri
}

async function birOyun(tarz: Tarz, cag: Cag, meslek: string): Promise<OyunKaydi> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  let state = await yeniOyun(cag, bolge, yerlesim);
  const id = state.id;
  await mesleğiAta(id, meslek);

  // KİLİT: temel konut + temel yemek. Bir daha asla dokunulmaz.
  try {
    await konutDegistir(id, KILIT_KONUT);
  } catch {
    /* zaten oradaysa */
  }
  try {
    await yasamSecimiDegistir(id, KILIT_YASAM);
  } catch {
    /* zaten oradaysa */
  }
  state = await stateGetir(id);

  const s: Sayaclar = {
    yatirim: 0,
    mulk: 0,
    sifa: 0,
    luks: 0,
    envanterKullan: 0,
    zar: 0,
    zarKazanma: 0,
    sosyallesme: 0,
    kendiIsHarcanan: 0,
    mulkHarcanan: 0,
    borcluTur: 0,
  };

  const anliklar: Anlik[] = [];
  let sonrakiKmIdx = 0;
  const kaydetKm = (st: CharacterState) => {
    while (sonrakiKmIdx < YAS_KILOMETRELER.length && st.yas >= YAS_KILOMETRELER[sonrakiKmIdx]) {
      const a = anlikCek(st);
      a.yas = YAS_KILOMETRELER[sonrakiKmIdx]; // kilometre etiketine sabitle
      anliklar.push(a);
      sonrakiKmIdx++;
    }
  };
  kaydetKm(state); // yaş 15

  let hataMi = false;
  let guard = 0;
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await yanEylemler(id, state, tarz.yan, s);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, tarz, senaryo.kategori, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, tepkiSec(state, tarz));
      }
      if (state.para < 0) s.borcluTur++;
      kaydetKm(state);
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${tarz.id}/${cag}/${meslek} (${id}): ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  kaydetKm(son);
  return {
    tarz: tarz.id,
    cag,
    meslek,
    bolge: son.bolge,
    olum_yasi: son.yas,
    olum_nedeni: son.olum_nedeni,
    skor: Math.round(hesaplaSkor(son)),
    yatirim: s.yatirim,
    mulk: s.mulk,
    sifa: s.sifa,
    zar: s.zar,
    zarKazanma: s.zarKazanma,
    sosyallesme: s.sosyallesme,
    borclu_tur: s.borcluTur,
    hataMi,
    anliklar,
  };
}

// ---------------------------------------------------------------------------
// Analiz — 5'er yıl ortalamaları
// ---------------------------------------------------------------------------
const ORT_ALANLARI: (keyof Anlik)[] = [
  "saglik",
  "un",
  "para",
  "gayrimenkul",
  "servet",
  "ahlak",
  "aranma",
  "mutluluk",
  "rutbe_seviye",
];

function analizYap(kayitlar: OyunKaydi[]) {
  const tarzlar = [...new Set(kayitlar.map((k) => k.tarz))];
  const analiz: Record<string, any> = {};

  for (const tarz of tarzlar) {
    const grup = kayitlar.filter((k) => k.tarz === tarz);
    const N = grup.length;
    const kmSatirlari = YAS_KILOMETRELER.map((yas) => {
      const anliklar = grup.map((g) => g.anliklar.find((a) => a.yas === yas)).filter(Boolean) as Anlik[];
      const canli = anliklar.length;
      const satir: Record<string, number> = {
        yas,
        hayatta_kalan: canli,
        hayatta_kalma_orani: Math.round((canli / N) * 1000) / 10,
      };
      for (const alan of ORT_ALANLARI) {
        if (canli === 0) {
          satir[alan] = 0;
          continue;
        }
        const ort = anliklar.reduce((t, a) => t + a[alan], 0) / canli;
        satir[alan] = Math.round(ort * 100) / 100;
      }
      return satir;
    });

    analiz[tarz] = {
      ad: TARZLAR.find((t) => t.id === tarz)?.ad ?? tarz,
      omur_sayisi: N,
      ort_olum_yasi: Math.round((grup.reduce((t, g) => t + g.olum_yasi, 0) / N) * 10) / 10,
      ort_skor: Math.round(grup.reduce((t, g) => t + g.skor, 0) / N),
      ort_yatirim: Math.round((grup.reduce((t, g) => t + g.yatirim, 0) / N) * 10) / 10,
      ort_mulk: Math.round((grup.reduce((t, g) => t + g.mulk, 0) / N) * 10) / 10,
      ort_sifa_alim: Math.round((grup.reduce((t, g) => t + g.sifa, 0) / N) * 10) / 10,
      ort_zar_atma: Math.round((grup.reduce((t, g) => t + g.zar, 0) / N) * 10) / 10,
      ort_sosyallesme: Math.round((grup.reduce((t, g) => t + g.sosyallesme, 0) / N) * 10) / 10,
      ort_borclu_tur: Math.round((grup.reduce((t, g) => t + g.borclu_tur, 0) / N) * 10) / 10,
      besyillik: kmSatirlari,
    };
  }
  return analiz;
}

function konsolTablo(analiz: Record<string, any>) {
  for (const [tarz, veri] of Object.entries(analiz)) {
    console.log(`\n${"=".repeat(78)}`);
    console.log(
      `TARZ: ${veri.ad}  (${veri.omur_sayisi} ömür) — ort. ölüm yaşı ${veri.ort_olum_yasi}, ort. skor ${veri.ort_skor}`
    );
    console.log(
      `  yatırım ${veri.ort_yatirim}× · mülk ${veri.ort_mulk}× · şifa ${veri.ort_sifa_alim}× · zar ${veri.ort_zar_atma}× · sosyal ${veri.ort_sosyallesme}× · borçlu tur ${veri.ort_borclu_tur}`
    );
    console.log(`${"-".repeat(92)}`);
    console.log(
      "yaş | yaşor% kalan |    can  şöhret     para  gayrmnkl   servet   ahlak  aranma   mutlu  rütbe"
    );
    for (const r of veri.besyillik) {
      if (r.hayatta_kalan === 0) continue;
      console.log(
        `${String(r.yas).padStart(3)} | ` +
          `${String(r.hayatta_kalma_orani).padStart(5)}% ${String(r.hayatta_kalan).padStart(4)} | ` +
          `${String(r.saglik).padStart(6)}  ` +
          `${String(r.un).padStart(6)}  ` +
          `${String(r.para).padStart(8)}  ` +
          `${String(r.gayrimenkul).padStart(8)}  ` +
          `${String(r.servet).padStart(8)}  ` +
          `${String(r.ahlak).padStart(6)}  ` +
          `${String(r.aranma).padStart(6)}  ` +
          `${String(r.mutluluk).padStart(6)}  ` +
          `${String(r.rutbe_seviye).padStart(5)}`
      );
    }
  }
}

// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  const istenen = (process.env.SIM_TARZ ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const tarzlar = istenen.length > 0 ? TARZLAR.filter((t) => istenen.includes(t.id)) : TARZLAR;
  if (tarzlar.length === 0) {
    console.error(`Bilinmeyen SIM_TARZ. Geçerli: ${TARZLAR.map((t) => t.id).join(", ")}`);
    process.exit(1);
  }

  const caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  const toplamHedef = tarzlar.length * caglar.length * MESLEKLER.length * N_PER_GROUP;
  console.log(
    `Temel-kademe (konut=${KILIT_KONUT}, yemek=${KILIT_YASAM}) tarz simülasyonu:\n` +
      `${tarzlar.length} tarz × ${caglar.length} çağ × ${MESLEKLER.length} meslek × ${N_PER_GROUP} = ${toplamHedef} ömür.\n`
  );

  const tumKayitlar: OyunKaydi[] = [];
  const baslangic = Date.now();
  let oynanan = 0;

  for (const tarz of tarzlar) {
    for (const cag of caglar) {
      for (const meslek of MESLEKLER) {
        console.log(`=== [${tarz.ad}] ${cag} — ${meslek}: ${N_PER_GROUP} ömür ===`);
        for (let i = 0; i < N_PER_GROUP; i++) {
          tumKayitlar.push(await birOyun(tarz, cag, meslek));
          oynanan++;
          if ((i + 1) % 40 === 0 || i === N_PER_GROUP - 1) {
            const sn = ((Date.now() - baslangic) / 1000).toFixed(0);
            console.log(`  ${oynanan}/${toplamHedef} (${sn}sn)`);
          }
        }
      }
    }
  }

  const hamYolu = path.join(__dirname, "simulateBazTarzlar.sonuc.json");
  fs.writeFileSync(hamYolu, JSON.stringify(tumKayitlar, null, 2), "utf-8");

  const analiz = analizYap(tumKayitlar);
  const analizYolu = path.join(__dirname, "simulateBazTarzlar.analiz.json");
  fs.writeFileSync(
    analizYolu,
    JSON.stringify({ kilit: { konut: KILIT_KONUT, yemek: KILIT_YASAM }, n_per_group: N_PER_GROUP, tarzlar: analiz }, null, 2),
    "utf-8"
  );

  konsolTablo(analiz);

  const sn = ((Date.now() - baslangic) / 1000).toFixed(0);
  console.log(`\n${tumKayitlar.length} ömür (${sn}sn). Ham: ${hamYolu}\nAnaliz: ${analizYolu}`);
  const hatali = tumKayitlar.filter((k) => k.hataMi).length;
  if (hatali > 0) console.log(`Uyarı: ${hatali} ömür hatayla erken bitti.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
