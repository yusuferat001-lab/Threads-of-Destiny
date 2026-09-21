/**
 * Kişilik-güdümlü tam-oyun simülasyonu.
 *
 * simulateFullPlaythroughs.ts'in "tek tip bot" mantığını 7 farklı OYUNCU KİŞİLİĞİNE
 * genişletir. Her kişilik hem OLAY SEÇİMİNİ (senaryodaki 2-4 seçenek arasından hangisini
 * tıklayacağını — seçeneğin gerçek basarili_sonuc/basarisiz_sonuc etkilerine bakarak
 * puanlar) hem de TUR ARASI YAN EYLEMLERİ (ev kademesi, sofra kademesi, kendi işine
 * yatırım, piyasa mülkü, mağaza şifa/lüks, envanter kullanımı, yeraltı zarı, sosyalleşme
 * mekânı seçimi) kendi tarzına göre yönlendirir.
 *
 * 7 kişilik:
 *   garantici  — hep en yüksek başarı şansı; ölüm/hapis/sağlık kaybı riskinden kaçar.
 *   cimri      — parayı biriktirir; en ucuz ev+sofra, neredeyse hiç yatırım/mağaza yok.
 *   suclu      — ahlaki taviz + para veren seçenekleri tercih eder; karaborsa + zar + meyhane.
 *   luks       — ün/mutluluk/gösteriş; en pahalı ev+sofra, tüm lüks eşyalar, salon/soylu.
 *   kaotik     — seçim şansa bakmaz (uniform rastgele); ev/sofra her tur rastgele kademe.
 *   survival   — sağlığı her şeyin üstünde tutar; şifa eşyasını agresif alır/kullanır.
 *   para       — beklenen parayı maksimize eder; agresif kendi-işi + tüm kârlı mülkler.
 *
 * Kalıcılık: schema.prisma PostgreSQL'e taşındığı için ./_simPrismaStub tüm DB katmanını
 * bellek-içi no-op ile değiştirir (bkz. o dosyanın başlığı). gameEngine tek process
 * içinde `oturumlar` Map'ini otorite kullandığı için sonuçlar birebir doğru kalır.
 *
 * Kullanım:  npx tsx scripts/simulateKisilikler.ts
 *   SIM_N=150   -> her (kişilik × çağ × meslek) grubu için kaç ömür (varsayılan 120).
 *   SIM_KISILIK=suclu,para  -> yalnız bu kişilikleri çalıştır (virgülle).
 * Çıktı: scripts/simulateKisilikler.sonuc.json + konsola ilerleme.
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
import { amacSkorCarpani } from "../src/data/hayatAmaclari";
import { KONUTLAR } from "../src/data/konutlar";
import { YASAM_SECENEKLERI } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag, Secenek } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 120);
const MAX_TUR_GUARD = 400;

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function kirp(x: number, alt: number, ust: number): number {
  return Math.max(alt, Math.min(ust, x));
}

// ---------------------------------------------------------------------------
// KİŞİLİK TANIMLARI
// ---------------------------------------------------------------------------

/** Bir seçeneğin ham etkilerinden çıkarılan, kişiliklerin puanladığı özet. */
interface SecenekOzeti {
  p: number; // başarı olasılığı 0..1
  bekPara: number;
  bekSaglik: number;
  bekAhlak: number;
  bekUn: number;
  bekMutluluk: number;
  paraKazanci: number; // max(0, bekPara)
  paraGideri: number; // max(0, -bekPara)
  enKotuSaglik: number; // min(basarili.saglik, basarisiz.saglik)
  olumRiski: number; // 0..~2 (kesin ölüm 1 + olum_sansi/100 topl-am)
  hapisRiski: number; // 0..2
  sucArtisi: number; // her iki sonuçtaki suc_artis toplamı
  sucKazanciImzasi: boolean; // bir sonuçta para>0 && ahlak<=-5
  maliyet: number; // seçeneğin ön-maliyeti (para eşiği)
}

function sayi(x: number | undefined): number {
  return typeof x === "number" ? x : 0;
}

function secenekOzetiCikar(s: Secenek): SecenekOzeti {
  const b = s.basarili_sonuc ?? {};
  const k = s.basarisiz_sonuc ?? {};
  const p = kirp(s.basari_sansi / 100, 0, 1);
  const bek = (alan: "para" | "saglik" | "ahlak" | "un" | "mutluluk") =>
    p * sayi((b as any)[alan]) + (1 - p) * sayi((k as any)[alan]);
  const bekPara = bek("para");
  const olumRiski =
    (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sayi(b.olum_sansi) + sayi(k.olum_sansi)) / 100;
  const hapisRiski =
    (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0);
  const sucKazanciImzasi =
    (sayi(b.para) > 0 && sayi(b.ahlak) <= -5) || (sayi(k.para) > 0 && sayi(k.ahlak) <= -5);
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
    olumRiski,
    hapisRiski,
    sucArtisi: sayi(b.suc_artis) + sayi(k.suc_artis),
    sucKazanciImzasi,
    maliyet: sayi(s.maliyet),
  };
}

interface YanEylemAyari {
  /** Kira için maaşın bu oranı kadar harcamaya razı. */
  konutOran: number;
  yasamOran: number;
  /** Ev/sofra kademesi bu index aralığına kilitlenir (KONUTLAR / YASAM_SECENEKLERI). */
  konutMin: number;
  konutMax: number;
  yasamMin: number;
  yasamMax: number;
  /** Ev/sofrayı her tur bilerek rastgele kademeye çeken (kaotik) mod. */
  konutRastgele?: boolean;
  yatirimSans: number;
  yatirimNakitKat: number; // para >= maliyet * kat iken kendi işine yatır
  mulkSans: number;
  mulkNakitKat: number; // maliyet <= para / kat iken al
  mulkKaraborsaTercih: boolean;
  mulkRiskliKabul: boolean; // negatif/riskli getirili mülkleri de al
  sifaSaglikEsigi: number;
  sifaSans: number;
  sifaEnIyiyiAl: boolean; // true: en yüksek sağlıklı uygun eşya; false: en ucuz
  luksSans: number;
  luksNakitKat: number;
  envanterSaglikEsigi: number;
  zarSans: number;
  zarYuksekTercih: boolean;
  sosyalSans: number;
  /** "prefer" | "avoid" | "any" — alkollü mekân tercihi. */
  sosyalAlkol: "prefer" | "avoid" | "any";
}

interface Kisilik {
  id: string;
  ad: string;
  /** Seçenek puanı — yüksek = daha çok tercih. Kilitli olmayanlara uygulanır. */
  secenekPuani: (o: SecenekOzeti, kategori: string, state: CharacterState) => number;
  /** Ağırlıklı-rastgele seçimde puan farklarının ne kadar keskin ayrıştığı (üs). */
  konsantrasyon: number;
  /** onTepki ara-ekranında "ısrar et" (1) taban olasılığı; fevrilik ekseniyle harmanlanır. */
  israrTabani: number;
  yan: YanEylemAyari;
}

const KISILIKLER: Kisilik[] = [
  {
    id: "garantici",
    ad: "Garantici",
    konsantrasyon: 3.0,
    israrTabani: 0.05,
    secenekPuani: (o) =>
      o.p * 100 -
      o.olumRiski * 500 -
      o.hapisRiski * 150 -
      Math.max(0, -o.bekSaglik) * 5 -
      Math.max(0, -o.bekPara) * 0.5 -
      Math.max(0, o.sucArtisi) * 20,
    yan: {
      konutOran: 0.6, yasamOran: 0.55, konutMin: 2, konutMax: 4, yasamMin: 2, yasamMax: 3,
      yatirimSans: 0.16, yatirimNakitKat: 2.0, mulkSans: 0.14, mulkNakitKat: 2.5,
      mulkKaraborsaTercih: false, mulkRiskliKabul: false,
      sifaSaglikEsigi: 72, sifaSans: 0.32, sifaEnIyiyiAl: false,
      luksSans: 0.03, luksNakitKat: 3.0, envanterSaglikEsigi: 60,
      zarSans: 0, zarYuksekTercih: false, sosyalSans: 0.1, sosyalAlkol: "avoid",
    },
  },
  {
    id: "cimri",
    ad: "Cimri",
    konsantrasyon: 2.0,
    israrTabani: 0.1,
    secenekPuani: (o) =>
      -o.paraGideri * 2.5 +
      o.paraKazanci * 1.4 +
      o.p * 12 -
      o.olumRiski * 300 -
      o.maliyet * 3 -
      o.hapisRiski * 60,
    yan: {
      konutOran: 0.2, yasamOran: 0.16, konutMin: 1, konutMax: 2, yasamMin: 1, yasamMax: 2,
      yatirimSans: 0.04, yatirimNakitKat: 6.0, mulkSans: 0.06, mulkNakitKat: 6.0,
      mulkKaraborsaTercih: false, mulkRiskliKabul: false,
      sifaSaglikEsigi: 28, sifaSans: 0.15, sifaEnIyiyiAl: false,
      luksSans: 0, luksNakitKat: 99, envanterSaglikEsigi: 40,
      zarSans: 0, zarYuksekTercih: false, sosyalSans: 0.04, sosyalAlkol: "avoid",
    },
  },
  {
    id: "suclu",
    ad: "Suçlu",
    konsantrasyon: 1.6,
    israrTabani: 0.7,
    secenekPuani: (o) =>
      o.bekPara * 1.1 +
      (o.sucKazanciImzasi ? 70 : 0) +
      Math.max(0, o.sucArtisi) * 4 +
      o.p * 8 -
      o.olumRiski * 140 -
      o.hapisRiski * 35,
    yan: {
      konutOran: 0.6, yasamOran: 0.55, konutMin: 2, konutMax: 4, yasamMin: 2, yasamMax: 4,
      yatirimSans: 0.35, yatirimNakitKat: 1.3, mulkSans: 0.45, mulkNakitKat: 1.3,
      mulkKaraborsaTercih: true, mulkRiskliKabul: true,
      sifaSaglikEsigi: 55, sifaSans: 0.3, sifaEnIyiyiAl: false,
      luksSans: 0.16, luksNakitKat: 2.0, envanterSaglikEsigi: 55,
      zarSans: 0.32, zarYuksekTercih: true, sosyalSans: 0.34, sosyalAlkol: "prefer",
    },
  },
  {
    id: "luks",
    ad: "Lüks Düşkünü",
    konsantrasyon: 1.5,
    israrTabani: 0.45,
    secenekPuani: (o) =>
      o.bekUn * 9 +
      o.bekMutluluk * 3.5 +
      o.bekPara * 0.35 +
      o.p * 8 -
      o.olumRiski * 220 -
      o.hapisRiski * 45,
    yan: {
      konutOran: 0.95, yasamOran: 0.9, konutMin: 3, konutMax: 5, yasamMin: 3, yasamMax: 5,
      yatirimSans: 0.22, yatirimNakitKat: 1.5, mulkSans: 0.3, mulkNakitKat: 1.6,
      mulkKaraborsaTercih: false, mulkRiskliKabul: true,
      sifaSaglikEsigi: 76, sifaSans: 0.45, sifaEnIyiyiAl: true,
      luksSans: 0.6, luksNakitKat: 1.5, envanterSaglikEsigi: 70,
      zarSans: 0.1, zarYuksekTercih: false, sosyalSans: 0.42, sosyalAlkol: "any",
    },
  },
  {
    id: "kaotik",
    ad: "Dengesiz Kaotik",
    konsantrasyon: 0.0, // uniform: puan sıralaması yok sayılır
    israrTabani: 0.55,
    secenekPuani: () => Math.random() * 100,
    yan: {
      konutOran: 0.5, yasamOran: 0.5, konutMin: 1, konutMax: 5, yasamMin: 1, yasamMax: 5,
      konutRastgele: true,
      yatirimSans: 0.45, yatirimNakitKat: 1.0, mulkSans: 0.45, mulkNakitKat: 1.0,
      mulkKaraborsaTercih: true, mulkRiskliKabul: true,
      sifaSaglikEsigi: 80, sifaSans: 0.45, sifaEnIyiyiAl: false,
      luksSans: 0.35, luksNakitKat: 0.9, envanterSaglikEsigi: 80,
      zarSans: 0.45, zarYuksekTercih: false, sosyalSans: 0.45, sosyalAlkol: "any",
    },
  },
  {
    id: "survival",
    ad: "Maks Hayatta Kalma",
    konsantrasyon: 3.2,
    israrTabani: 0.03,
    secenekPuani: (o, kategori) =>
      o.enKotuSaglik * 12 +
      o.bekSaglik * 3 +
      o.p * 22 -
      o.olumRiski * 1000 -
      o.hapisRiski * 200 -
      (kategori === "savas" ? 60 : 0) -
      Math.max(0, o.sucArtisi) * 40 +
      (o.bekSaglik >= 0 ? 15 : 0),
    yan: {
      konutOran: 0.75, yasamOran: 0.75, konutMin: 3, konutMax: 5, yasamMin: 3, yasamMax: 5,
      yatirimSans: 0.12, yatirimNakitKat: 2.5, mulkSans: 0.16, mulkNakitKat: 2.5,
      mulkKaraborsaTercih: false, mulkRiskliKabul: false,
      sifaSaglikEsigi: 88, sifaSans: 0.6, sifaEnIyiyiAl: true,
      luksSans: 0.03, luksNakitKat: 3.0, envanterSaglikEsigi: 80,
      zarSans: 0, zarYuksekTercih: false, sosyalSans: 0.14, sosyalAlkol: "avoid",
    },
  },
  {
    id: "para",
    ad: "Maks Para Odaklı",
    konsantrasyon: 1.7,
    israrTabani: 0.35,
    secenekPuani: (o) =>
      o.bekPara * 1.0 +
      o.paraKazanci * 0.35 +
      o.bekUn * 0.6 +
      o.p * 5 -
      o.olumRiski * 260 -
      o.hapisRiski * 50 -
      o.paraGideri * 0.25,
    yan: {
      konutOran: 0.35, yasamOran: 0.3, konutMin: 2, konutMax: 3, yasamMin: 2, yasamMax: 3,
      yatirimSans: 0.6, yatirimNakitKat: 1.05, mulkSans: 0.6, mulkNakitKat: 1.15,
      mulkKaraborsaTercih: true, mulkRiskliKabul: true,
      sifaSaglikEsigi: 50, sifaSans: 0.35, sifaEnIyiyiAl: false,
      luksSans: 0.1, luksNakitKat: 5.0, envanterSaglikEsigi: 45,
      zarSans: 0.05, zarYuksekTercih: false, sosyalSans: 0.1, sosyalAlkol: "avoid",
    },
  },
  {
    id: "cesur",
    ad: "Cesur",
    konsantrasyon: 1.4,
    israrTabani: 0.85, // onTepki ara-ekranında neredeyse her zaman "ısrar et"
    secenekPuani: (o, kategori) =>
      o.bekPara * 0.7 +
      o.bekUn * 4.5 +
      o.bekMutluluk * 2 +
      (kategori === "savas" ? 55 : 0) + // savaştan kaçmaz, üstüne gider
      (o.p < 0.55 ? o.paraKazanci * 0.6 + Math.max(0, o.bekUn) * 2.5 : 0) + // düşük şans-yüksek ödül cazip
      o.p * 3 -
      o.olumRiski * 85 - // ölümü hafife alır (garantici'nin ~6'da biri kadar cezalar)
      o.hapisRiski * 18,
    yan: {
      konutOran: 0.6, yasamOran: 0.5, konutMin: 2, konutMax: 4, yasamMin: 2, yasamMax: 4,
      yatirimSans: 0.34, yatirimNakitKat: 1.15, mulkSans: 0.34, mulkNakitKat: 1.2,
      mulkKaraborsaTercih: false, mulkRiskliKabul: true,
      sifaSaglikEsigi: 52, sifaSans: 0.26, sifaEnIyiyiAl: false,
      luksSans: 0.16, luksNakitKat: 2.5, envanterSaglikEsigi: 48,
      zarSans: 0.28, zarYuksekTercih: true, sosyalSans: 0.3, sosyalAlkol: "any",
    },
  },
];

// ---------------------------------------------------------------------------
// KARAR MEKANİZMALARI
// ---------------------------------------------------------------------------

/**
 * Her kişiliğe eklenen ortak "hayatta kal" tabanı. Bu oyunda ana ölüm sebebi
 * event kaynaklı sağlık/para aşınması; taban olmadan tüm arketipler (survival
 * dahil) ~35 yaşında sağlık-sıfır ölüp birbirinden ayrışamıyor. Ağırlığı bilerek
 * ölçülü: güçlü arketiplerde (ör. suçlu'nun +70'lik suç imzası) sıralamayı
 * bozmaz, ama yakın seçenekler arasında ölümcül olanı eler. Sağlık düştükçe
 * kendini güçlendirir (düşük canda güvenli oyna). Kaotik'e uygulanmaz.
 */
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

/** Kilitli olmayan seçenekler arasında kişiliğin puanına göre ağırlıklı-rastgele seçim. */
function secenekSec(secenekler: Secenek[], kisilik: Kisilik, kategori: string, state: CharacterState): number {
  const uygunlar = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygunlar.length > 0 ? uygunlar : secenekler.map((s, i) => ({ s, i }));
  if (havuz.length === 1) return havuz[0].i;

  const tabanKat = kisilik.id === "kaotik" ? 0 : 1;
  // Borçtayken (bu oyunun erken ekonomisi çoğu arketipi borca sokuyor) para
  // getiren seçenekler ödüllendirilir — borçtan çıkma güdüsü. Kaotik hariç.
  const borcBaskisi = tabanKat && state.para < 0 ? kirp(-state.para / 40, 0.8, 3.5) : 0;
  const puanlar = havuz.map((x) => {
    const o = secenekOzetiCikar(x.s);
    return (
      kisilik.secenekPuani(o, kategori, state) +
      tabanKat * tabanGuvenlik(o, state.saglik) +
      borcBaskisi * o.bekPara
    );
  });
  const enDusuk = Math.min(...puanlar);
  const kon = kisilik.konsantrasyon;
  const agirliklar = puanlar.map((pu) => {
    const taban = pu - enDusuk + 1; // >0
    const g = kon <= 0 ? 1 : Math.pow(taban, kon);
    return Math.max(1e-6, g) * (0.82 + Math.random() * 0.36);
  });
  const toplam = agirliklar.reduce((a, b) => a + b, 0);
  let hedef = Math.random() * toplam;
  for (let k = 0; k < havuz.length; k++) {
    hedef -= agirliklar[k];
    if (hedef <= 0) return havuz[k].i;
  }
  return havuz[havuz.length - 1].i;
}

/** onTepki ara-ekranında geri çekil(0) / ısrar et(1). */
function tepkiSec(state: CharacterState, kisilik: Kisilik): number {
  const fevrilik = state.kisilik_eksenleri?.fevrilik ?? 50;
  const olasilik = kirp(kisilik.israrTabani + ((fevrilik - 50) / 100) * 0.3, 0.02, 0.96);
  return Math.random() < olasilik ? 1 : 0;
}

/**
 * [min,max] aralığında oturulacak kademe: maaşın `oran` katını KARŞILAYAN ya da
 * kasadan (>= 6 yıllık maliyet birikmişse) FİNANSE EDİLEBİLEN en yüksek kademe.
 * `min` gerçek bir tabandır — bot parası yetmese bile bu kademenin altına düşmez
 * (2026-09 ekonomi dengesinde en ucuz 2 konut/sofra kademesi ağır sağlık cezası
 * taşıdığı için; salt maaş-yüzdesi bütçelemesi botu o ceza kademelerinde kilitleyip
 * genç yaşta borç-ölüm sarmalına sokuyordu).
 */
function hedefKademe(
  kademeler: { maliyet: number }[],
  maasYillik: number,
  para: number,
  oran: number,
  min: number,
  max: number
): number {
  let secilen = min;
  for (let i = min; i <= Math.min(max, kademeler.length - 1); i++) {
    const m = kademeler[i].maliyet;
    if (m <= maasYillik * oran || m * 6 <= para) secilen = i;
  }
  return secilen;
}

interface Sayaclar {
  yatirimSayisi: number;
  mulkSayisi: number;
  magazaSifaSayisi: number;
  magazaLuksSayisi: number;
  envanterKullanSayisi: number;
  zarSayisi: number;
  zarKazanma: number;
  sosyallesmeSayisi: number;
  konutDegisimSayisi: number;
  yasamDegisimSayisi: number;
  kendiIsHarcanan: number;
  mulkHarcanan: number;
  enYuksekPara: number;
  enDusukPara: number;
  enDusukSaglik: number;
  borcluTurSayisi: number;
}

const KONUT_MALIYET = KONUTLAR.map((k) => ({ maliyet: k.kiraYillik }));
const YASAM_MALIYET = YASAM_SECENEKLERI.map((y) => ({ maliyet: y.maliyetYillik }));

/** Her turdan önce: ev/sofra/yatırım/mülk/mağaza/envanter/zar/sosyalleşme kararlarını kişiliğe göre dener. */
async function yanEylemler(id: string, state: CharacterState, ky: YanEylemAyari, sayaclar: Sayaclar): Promise<void> {
  let maasYillik = state.maas_yillik ?? 10;
  try {
    const finans = await finansGetir(id);
    maasYillik = finans.maasYillik ?? maasYillik;
  } catch {
    /* yok say */
  }

  // 1) Konut & yaşam tarzı.
  try {
    if (state.para < 0) {
      // Borçta: harcamayı kıs ama SAĞLIK-CEZALI dip kademelere İNME. En ucuz 2
      // konut/sofra kademesi (2026-09 dengesi) -3..-6 sağlık/yıl veriyor; borçtaki
      // bir karakteri o kademeye atmak, borç faizinin -2/yıl'ına eklenince kesin
      // ölüm sarmalı oluyordu (kaotik bu daldan muaf olduğu için ~10 yıl fazla
      // yaşıyordu — yani asıl sorun buydu). Tavan: cezasız orta kademe (normal_ev
      // / normal_ye); zaten daha düşükteyse dokunma.
      if (!ky.konutRastgele) {
        const kIdxSimdi = KONUTLAR.findIndex((k) => k.id === state.konut_id);
        const yIdxSimdi = YASAM_SECENEKLERI.findIndex((y) => y.id === state.yasam_secimi_id);
        if (kIdxSimdi > 2) {
          await konutDegistir(id, "normal_ev");
          sayaclar.konutDegisimSayisi++;
        }
        if (yIdxSimdi > 2) {
          await yasamSecimiDegistir(id, "normal_ye");
          sayaclar.yasamDegisimSayisi++;
        }
      }
    } else if (ky.konutRastgele) {
      // Kaotik: her tur %45 ihtimalle rastgele bir kademeye zıpla — ama dip
      // ceza kademesi (index 0) hariç, aksi halde kaotik hep genç ölüyor.
      if (Math.random() < 0.45) {
        const hk = KONUTLAR[1 + Math.floor(Math.random() * (KONUTLAR.length - 1))];
        if (hk.id !== state.konut_id) {
          await konutDegistir(id, hk.id);
          sayaclar.konutDegisimSayisi++;
        }
      }
      if (Math.random() < 0.45) {
        const hy = YASAM_SECENEKLERI[1 + Math.floor(Math.random() * (YASAM_SECENEKLERI.length - 1))];
        if (hy.id !== state.yasam_secimi_id) {
          await yasamSecimiDegistir(id, hy.id);
          sayaclar.yasamDegisimSayisi++;
        }
      }
    } else {
      const kIdx = hedefKademe(KONUT_MALIYET, maasYillik, state.para, ky.konutOran, ky.konutMin, ky.konutMax);
      const yIdx = hedefKademe(YASAM_MALIYET, maasYillik, state.para, ky.yasamOran, ky.yasamMin, ky.yasamMax);
      if (KONUTLAR[kIdx].id !== state.konut_id) {
        await konutDegistir(id, KONUTLAR[kIdx].id);
        sayaclar.konutDegisimSayisi++;
      }
      if (YASAM_SECENEKLERI[yIdx].id !== state.yasam_secimi_id) {
        await yasamSecimiDegistir(id, YASAM_SECENEKLERI[yIdx].id);
        sayaclar.yasamDegisimSayisi++;
      }
    }
  } catch {
    /* yok say (taşınma maliyeti vb.) */
  }

  // 2) Kendi işine yatırım. (Sağlığı kritikse para biriktirmez — önce hayatta kal.)
  try {
    if (state.saglik > 22 && Math.random() < ky.yatirimSans) {
      const cfg = await yatirimConfigGetir(id);
      const yeter =
        state.para >= cfg.kendiIsiMaliyeti * ky.yatirimNakitKat &&
        state.para - cfg.kendiIsiMaliyeti >= 12; // yatırımdan sonra tampon kalsın
      if (yeter) {
        await yatirimYap(id);
        sayaclar.yatirimSayisi++;
        sayaclar.kendiIsHarcanan += cfg.kendiIsiMaliyeti;
      }
    }
  } catch {
    /* yok say (teçhizat/ordu tavanı vb.) */
  }

  // 3) Piyasa mülkü.
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
          if (kb) secilen = kb;
          else {
            // en yüksek tahmini getiriyi seç
            secilen = adaylar.reduce((a, b) =>
              b.tahminiYillikGetiriYuzdesi > a.tahminiYillikGetiriYuzdesi ? b : a
            );
          }
        }
        await mulkSatinAl(id, secilen.tur);
        sayaclar.mulkSayisi++;
        sayaclar.mulkHarcanan += secilen.maliyet;
      }
    }
  } catch {
    /* yok say */
  }

  // 4) Mağaza — şifa. Kişilik eşiğine EK OLARAK, sağlık gerçekten düştüyse (event
  //    aşınması bu oyunun ana ölüm sebebi) herkes acil şifa alır — aksi halde
  //    zar/mülk fark etmeksizin tüm kişilikler ~35 yaşında sağlık-sıfır ölüyor.
  try {
    const acil = state.saglik < 40;
    const alSans = Math.max(ky.sifaSans, acil ? 0.85 : state.saglik < 58 ? 0.45 : 0);
    if ((state.saglik < ky.sifaSaglikEsigi || state.saglik < 58) && Math.random() < alSans) {
      const katalog = await magazaConfigGetir(id);
      const butce = acil ? state.para * 0.95 : state.para * 0.8;
      const adaylar = katalog.filter(
        (e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= butce
      );
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        // Acil durumda ya da "en iyiyi al" kişiliğinde en yüksek etkiliyi (en pahalı) al.
        const secilen = ky.sifaEnIyiyiAl || acil ? adaylar[adaylar.length - 1] : adaylar[0];
        await magazadanSatinAl(id, secilen.id);
        sayaclar.magazaSifaSayisi++;
      }
    }
  } catch {
    /* yok say (3 yıllık kategori kilidi) */
  }

  // 5) Mağaza — lüks.
  try {
    if (Math.random() < ky.luksSans) {
      const katalog = await magazaConfigGetir(id);
      const adaylar = katalog.filter(
        (e) => e.kategori === "luks" && !e.sahipMi && e.fiyat <= state.para / ky.luksNakitKat
      );
      if (adaylar.length > 0) {
        // Lüks düşkünü en pahalıyı ister; diğerleri rastgele.
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = ky.luksSans >= 0.4 ? adaylar[adaylar.length - 1] : rastgele(adaylar);
        await magazadanSatinAl(id, secilen.id);
        sayaclar.magazaLuksSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 6) Envanterdeki şifa eşyasını kullan.
  try {
    const sifalar = state.magaza_envanteri.filter((e) => e.kategori === "sifa");
    if (state.saglik < Math.max(ky.envanterSaglikEsigi, 58) && sifalar.length > 0) {
      const secilen = [...sifalar].sort((a, b) => (a.kalanYil ?? 99) - (b.kalanYil ?? 99))[0];
      await envanterEsyasiKullan(id, secilen.id);
      sayaclar.envanterKullanSayisi++;
    }
  } catch {
    /* yok say */
  }

  // 7) Yeraltı zar masası.
  try {
    if (ky.zarSans > 0 && Math.random() < ky.zarSans) {
      const kademeler = await zarKademeleriGetir(id);
      const uygun = kademeler.filter((k) => k <= state.para * 0.5);
      if (uygun.length > 0) {
        uygun.sort((a, b) => a - b);
        const tutar = ky.zarYuksekTercih ? uygun[uygun.length - 1] : rastgele(uygun);
        const sonuc = await zarAt(id, tutar);
        sayaclar.zarSayisi++;
        if (sonuc.kazandi) sayaclar.zarKazanma++;
      }
    }
  } catch {
    /* yok say */
  }

  // 8) Sosyalleşme mekânına gitmek (bir sonraki turda o mekânın olayını getirir).
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
        sayaclar.sosyallesmeSayisi++;
      }
    }
  } catch {
    /* yok say */
  }
}

// ---------------------------------------------------------------------------
// TEK ÖMÜR
// ---------------------------------------------------------------------------

interface OyunKaydi {
  kisilik: string;
  cag: Cag;
  meslek: string;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  yas: number;
  konut_id_son: string;
  yasam_secimi_id_son: string;
  para: number;
  ahlak: number;
  un: number;
  mutluluk: number;
  saglik: number;
  suc_seviyesi: number;
  skor: number;
  olum_nedeni: string | null;
  efsanevi_olum: string | null;
  hayat_amaci_ad: string | null;
  hayat_amaci_tamamlandi: boolean;
  rutbe: string;
  rutbe_seviye: number;
  sehir_yonetim_seviyesi: number;
  tur_sayisi: number;
  cocuk_sayisi: number;
  yasayan_cocuk_sayisi: number;
  evliydi: boolean;
  mulk_sayisi: number;
  unvan_sayisi: number;
  ayyas: boolean;
  kacakti: boolean;
  hapisteydi: boolean;
  veba_gecirdi: boolean;
  savastaydi: boolean;
  borclu: boolean;
  borclu_tur_sayisi: number;
  ordu_mevcudu: number;
  ticaret_sermaye: number;
  nufuz: number;
  yatirimSayisi: number;
  mulkSatinAlmaSayisi: number;
  magazaSifaSayisi: number;
  magazaLuksSayisi: number;
  envanterKullanSayisi: number;
  zarSayisi: number;
  zarKazanma: number;
  sosyallesmeSayisi: number;
  konutDegisimSayisi: number;
  yasamDegisimSayisi: number;
  kendiIsHarcanan: number;
  mulkHarcanan: number;
  gayrimenkulDegeri_son: number;
  en_dusuk_saglik: number;
  en_dusuk_para: number;
  en_yuksek_para: number;
  hataMi: boolean;
  // Skor formülü kalibrasyonu (2026-09) için eklenen eksenler:
  servet: number; // para + gayrimenkulDegeriHesapla
  mutluluk_son: number;
  amac_tamamlanan_sayisi: number;
  amac_toplam_bonus: number; // amacSkorCarpani(son)
  sarayda: boolean;
  yolculuk_tamamlandi: boolean;
  gizemli_esya_sahibi: boolean;
}

async function birOyunSimuleEt(kisilik: Kisilik, cag: Cag, meslek: string): Promise<OyunKaydi> {
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
    envanterKullanSayisi: 0,
    zarSayisi: 0,
    zarKazanma: 0,
    sosyallesmeSayisi: 0,
    konutDegisimSayisi: 0,
    yasamDegisimSayisi: 0,
    kendiIsHarcanan: 0,
    mulkHarcanan: 0,
    enYuksekPara: state.para,
    enDusukPara: state.para,
    enDusukSaglik: state.saglik,
    borcluTurSayisi: 0,
  };

  let hataMi = false;
  let guard = 0;
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await yanEylemler(id, state, kisilik.yan, sayaclar);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, kisilik, senaryo.kategori, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, tepkiSec(state, kisilik));
      }

      sayaclar.enYuksekPara = Math.max(sayaclar.enYuksekPara, state.para);
      sayaclar.enDusukPara = Math.min(sayaclar.enDusukPara, state.para);
      sayaclar.enDusukSaglik = Math.min(sayaclar.enDusukSaglik, state.saglik);
      if (state.para < 0) sayaclar.borcluTurSayisi++;
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${kisilik.id}/${cag}/${meslek} (${id}): ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  return {
    kisilik: kisilik.id,
    cag,
    meslek,
    bolge: son.bolge,
    yerlesim: son.yerlesim,
    din_kultur: son.din_kultur,
    yas: son.yas,
    konut_id_son: son.konut_id,
    yasam_secimi_id_son: son.yasam_secimi_id,
    para: Math.round(son.para * 100) / 100,
    ahlak: son.ahlak,
    un: son.un,
    mutluluk: son.mutluluk,
    saglik: son.saglik,
    suc_seviyesi: son.suc_seviyesi,
    skor: Math.round(hesaplaSkor(son)),
    olum_nedeni: son.olum_nedeni,
    efsanevi_olum: son.efsanevi_olum,
    hayat_amaci_ad: son.hayat_amaci?.ad ?? null,
    hayat_amaci_tamamlandi: son.hayat_amaci?.tamamlandi ?? false,
    rutbe: son.rutbe,
    rutbe_seviye: son.rutbe_seviye,
    sehir_yonetim_seviyesi: son.sehir_yonetim_seviyesi,
    tur_sayisi: son.tur_sayisi,
    cocuk_sayisi: son.cocuk_sayisi,
    yasayan_cocuk_sayisi: son.cocuklar.filter((c) => c.yasiyor).length,
    evliydi: son.etiketler.includes("medeni:evli") || son.es_adi !== null,
    mulk_sayisi: son.mulkler.length,
    unvan_sayisi: son.unvanlar.length,
    ayyas: son.etiketler.includes("bagimlilik:ayyas"),
    kacakti: son.etiketler.includes("kacak") || son.gecmis_olaylar.some((e) => e.includes("kacak")),
    hapisteydi: son.etiketler.includes("hapiste"),
    veba_gecirdi: son.veba_gecirdi,
    savastaydi: son.ulke.savasta,
    borclu: son.para < 0,
    borclu_tur_sayisi: sayaclar.borcluTurSayisi,
    ordu_mevcudu: son.ordu_mevcudu,
    ticaret_sermaye: son.ticaret_sermaye,
    nufuz: son.nufuz,
    yatirimSayisi: sayaclar.yatirimSayisi,
    mulkSatinAlmaSayisi: sayaclar.mulkSayisi,
    magazaSifaSayisi: sayaclar.magazaSifaSayisi,
    magazaLuksSayisi: sayaclar.magazaLuksSayisi,
    envanterKullanSayisi: sayaclar.envanterKullanSayisi,
    zarSayisi: sayaclar.zarSayisi,
    zarKazanma: sayaclar.zarKazanma,
    sosyallesmeSayisi: sayaclar.sosyallesmeSayisi,
    konutDegisimSayisi: sayaclar.konutDegisimSayisi,
    yasamDegisimSayisi: sayaclar.yasamDegisimSayisi,
    kendiIsHarcanan: Math.round(sayaclar.kendiIsHarcanan * 100) / 100,
    mulkHarcanan: Math.round(sayaclar.mulkHarcanan * 100) / 100,
    gayrimenkulDegeri_son: gayrimenkulDegeriHesapla(son),
    en_dusuk_saglik: sayaclar.enDusukSaglik,
    en_dusuk_para: Math.round(sayaclar.enDusukPara * 100) / 100,
    en_yuksek_para: Math.round(sayaclar.enYuksekPara * 100) / 100,
    hataMi,
    servet: Math.round((son.para + gayrimenkulDegeriHesapla(son)) * 100) / 100,
    mutluluk_son: son.mutluluk,
    amac_tamamlanan_sayisi: (son.hayat_amaclari ?? []).filter((a) => a.tamamlandi).length,
    amac_toplam_bonus: amacSkorCarpani(son),
    sarayda: son.etiketler.includes("sarayda"),
    yolculuk_tamamlandi: son.etiketler.includes("yolculuk_tamamlandi"),
    gizemli_esya_sahibi: son.etiketler.some((e) => e.startsWith("envanter:") || e.startsWith("esya:")),
  };
}

// ---------------------------------------------------------------------------
// ANA DÖNGÜ
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const istenenKisilikler = (process.env.SIM_KISILIK ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const kisiliklar =
    istenenKisilikler.length > 0
      ? KISILIKLER.filter((k) => istenenKisilikler.includes(k.id))
      : KISILIKLER;
  if (kisiliklar.length === 0) {
    console.error(`Bilinmeyen SIM_KISILIK: ${process.env.SIM_KISILIK}. Geçerli: ${KISILIKLER.map((k) => k.id).join(", ")}`);
    process.exit(1);
  }

  const caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  const toplamHedef = kisiliklar.length * caglar.length * MESLEKLER.length * N_PER_GROUP;
  console.log(
    `Kişilik-güdümlü simülasyon başlıyor: ${kisiliklar.length} kişilik × ${caglar.length} çağ × ${MESLEKLER.length} meslek × ${N_PER_GROUP} ömür = ${toplamHedef} toplam.\n`
  );

  const tumKayitlar: OyunKaydi[] = [];
  const baslangic = Date.now();
  let toplamOynanan = 0;

  for (const kisilik of kisiliklar) {
    for (const cag of caglar) {
      for (const meslek of MESLEKLER) {
        console.log(`=== [${kisilik.ad}] ${cag} — ${meslek}: ${N_PER_GROUP} ömür ===`);
        for (let i = 0; i < N_PER_GROUP; i++) {
          const kayit = await birOyunSimuleEt(kisilik, cag, meslek);
          tumKayitlar.push(kayit);
          toplamOynanan++;
          if ((i + 1) % 25 === 0 || i === N_PER_GROUP - 1) {
            const gecenSn = ((Date.now() - baslangic) / 1000).toFixed(0);
            console.log(
              `  ${i + 1}/${N_PER_GROUP} (toplam ${toplamOynanan}/${toplamHedef}, ${gecenSn}sn) — son: yaş ${kayit.yas}, para ${kayit.para}, ölüm: ${(kayit.olum_nedeni ?? "?").slice(0, 40)}`
            );
          }
        }
      }
    }
  }

  const cikisYolu = path.join(__dirname, "simulateKisilikler.sonuc.json");
  fs.writeFileSync(cikisYolu, JSON.stringify(tumKayitlar, null, 2), "utf-8");
  const gecenSn = ((Date.now() - baslangic) / 1000).toFixed(0);
  console.log(`\nTüm sonuçlar yazıldı: ${cikisYolu}`);
  console.log(`Toplam ${tumKayitlar.length} ömür simüle edildi (${gecenSn} saniyede).`);
  const hatali = tumKayitlar.filter((k) => k.hataMi).length;
  if (hatali > 0) console.log(`Uyarı: ${hatali} oyun bir hata sonucu erken sonlandı.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
