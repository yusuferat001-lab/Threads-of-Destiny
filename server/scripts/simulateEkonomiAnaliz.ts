/**
 * Kişilik bazlı EKONOMİ KIRILIM simülasyonu — her ömrü 5 yıllık kilometre
 * taşlarında (yaş 20, 25, 30, …) fotoğraflar: o ana kadarki KÜMÜLATİF gelirin
 * hangi kaynaktan, giderin hangi kaleme gittiği + o anki nakit, gayrimenkul
 * değeri, net servet ve can/şöhret/ahlak/mutluluk.
 *
 * simulateKisilikler.ts'in kişilik + tur-arası yan-eylem mekaniğini yeniden
 * kullanır. Motorun turdaki para hareketini `secimUygula().nakitAkisi` (kalem
 * bazlı, mutabakatlı döküm) ile alır; tur-arası yan-eylem harcamalarını
 * (kendi işi / mülk / mağaza / zar / taşınma) state.para farkıyla ölçer.
 *
 * Kullanım:  npx tsx scripts/simulateEkonomiAnaliz.ts
 *   SIM_N=100              -> her (kişilik × çağ × meslek) için ömür sayısı (vars. 60).
 *   SIM_KISILIK=cimri,para -> yalnız bu kişilikler.
 * Çıktı: scripts/simulateEkonomiAnaliz.sonuc.json
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
import { MESLEKLER, BOLGELER_BY_CAG, gayrimenkulDegeriHesapla } from "../src/game/stateManager";
import { KONUTLAR } from "../src/data/konutlar";
import { YASAM_SECENEKLERI } from "../src/data/yasamSecenekleri";
import { YERLESIMLER } from "../src/data/yerlesimler";
import { CharacterState, Cag, Secenek } from "../src/types";

const N_PER_GROUP = Number(process.env.SIM_N ?? 60);
const MAX_TUR_GUARD = 400;
const KM_ADIM = 5;
const KM_BASLANGIC = 20;

function rastgele<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function kirp(x: number, alt: number, ust: number): number {
  return Math.max(alt, Math.min(ust, x));
}
function sayi(x: number | undefined | null): number {
  return typeof x === "number" && Number.isFinite(x) ? x : 0;
}

// --- Ömür defteri (rapor kovaları) -----------------------------------------

interface Defter {
  gelir: {
    maas: number;
    olay: number;
    mulk: number;
    zar: number;
    diger: number;
  };
  gider: {
    yasam: number;
    konut: number;
    ekip: number;
    evcil: number;
    faiz: number;
    savasVergisi: number;
    bagis: number;
    olay: number;
    mulkZarar: number;
    yatirim: number;
    mulkAlim: number;
    magaza: number;
    zarKayip: number;
    tasinma: number;
    envanterBakim: number;
    sizinti: number;
    diger: number;
  };
  bilgiMulkBakim: number;
}
function bosDefter(): Defter {
  return {
    gelir: { maas: 0, olay: 0, mulk: 0, zar: 0, diger: 0 },
    gider: {
      yasam: 0, konut: 0, ekip: 0, evcil: 0, faiz: 0, savasVergisi: 0, bagis: 0,
      olay: 0, mulkZarar: 0, yatirim: 0, mulkAlim: 0, magaza: 0, zarKayip: 0,
      tasinma: 0, envanterBakim: 0, sizinti: 0, diger: 0,
    },
    bilgiMulkBakim: 0,
  };
}
function defterNet(d: Defter): number {
  const tg = Object.values(d.gelir).reduce((a, b) => a + b, 0);
  const tgd = Object.values(d.gider).reduce((a, b) => a + b, 0);
  return tg - tgd;
}
/** Motorun tur nakit akışını (secimUygula().nakitAkisi) rapor defterine ekler. */
function nakitAkisiniIsle(d: Defter, na: any): void {
  if (!na) return;
  d.gelir.maas += sayi(na.maasBrut);
  d.gelir.olay += sayi(na.olayGeliri);
  d.gider.olay += sayi(na.olayGideri);
  const mulkNet = sayi(na.mulkNet);
  if (mulkNet >= 0) d.gelir.mulk += mulkNet;
  else d.gider.mulkZarar += -mulkNet;
  d.gider.yasam += sayi(na.giderYasam);
  d.gider.konut += sayi(na.giderKonut);
  d.gider.ekip += sayi(na.giderEkip);
  d.gider.evcil += sayi(na.giderEvcil);
  d.gider.savasVergisi += sayi(na.savasVergisi);
  d.gider.faiz += sayi(na.faiz);
  d.gider.envanterBakim += sayi(na.envanterBakim);
  d.gider.bagis += sayi(na.zorunluBagis);
  d.gider.sizinti += sayi(na.zenginlikSizinti);
  const diger = sayi(na.digerNet);
  if (diger >= 0) d.gelir.diger += diger;
  else d.gider.diger += -diger;
  d.bilgiMulkBakim += sayi(na.bilgiMulkBakim);
}

// ---------------------------------------------------------------------------
// KİŞİLİK TANIMLARI  (simulateKisilikler.ts'ten — ekonomik olarak en ayrışan 6)
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
function sy(x: number | undefined): number {
  return typeof x === "number" ? x : 0;
}
function secenekOzetiCikar(s: Secenek): SecenekOzeti {
  const b = s.basarili_sonuc ?? {};
  const k = s.basarisiz_sonuc ?? {};
  const p = kirp(s.basari_sansi / 100, 0, 1);
  const bek = (alan: "para" | "saglik" | "ahlak" | "un" | "mutluluk") =>
    p * sy((b as any)[alan]) + (1 - p) * sy((k as any)[alan]);
  const bekPara = bek("para");
  const olumRiski =
    (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sy(b.olum_sansi) + sy(k.olum_sansi)) / 100;
  const hapisRiski =
    (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0);
  const sucKazanciImzasi =
    (sy(b.para) > 0 && sy(b.ahlak) <= -5) || (sy(k.para) > 0 && sy(k.ahlak) <= -5);
  return {
    p,
    bekPara,
    bekSaglik: bek("saglik"),
    bekAhlak: bek("ahlak"),
    bekUn: bek("un"),
    bekMutluluk: bek("mutluluk"),
    paraKazanci: Math.max(0, bekPara),
    paraGideri: Math.max(0, -bekPara),
    enKotuSaglik: Math.min(sy(b.saglik), sy(k.saglik)),
    olumRiski,
    hapisRiski,
    sucArtisi: sy(b.suc_artis) + sy(k.suc_artis),
    sucKazanciImzasi,
    maliyet: sy(s.maliyet),
  };
}

interface YanEylemAyari {
  konutOran: number;
  yasamOran: number;
  konutMin: number;
  konutMax: number;
  yasamMin: number;
  yasamMax: number;
  konutRastgele?: boolean;
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
interface Kisilik {
  id: string;
  ad: string;
  secenekPuani: (o: SecenekOzeti, kategori: string, state: CharacterState) => number;
  konsantrasyon: number;
  israrTabani: number;
  yan: YanEylemAyari;
}

const TUM_KISILIKLER: Kisilik[] = [
  {
    id: "garantici",
    ad: "Garantici",
    konsantrasyon: 3.0,
    israrTabani: 0.05,
    secenekPuani: (o) =>
      o.p * 100 - o.olumRiski * 500 - o.hapisRiski * 150 - Math.max(0, -o.bekSaglik) * 5 -
      Math.max(0, -o.bekPara) * 0.5 - Math.max(0, o.sucArtisi) * 20,
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
      -o.paraGideri * 2.5 + o.paraKazanci * 1.4 + o.p * 12 - o.olumRiski * 300 - o.maliyet * 3 - o.hapisRiski * 60,
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
      o.bekPara * 1.1 + (o.sucKazanciImzasi ? 70 : 0) + Math.max(0, o.sucArtisi) * 4 + o.p * 8 -
      o.olumRiski * 140 - o.hapisRiski * 35,
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
      o.bekUn * 9 + o.bekMutluluk * 3.5 + o.bekPara * 0.35 + o.p * 8 - o.olumRiski * 220 - o.hapisRiski * 45,
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
    id: "survival",
    ad: "Maks Hayatta Kalma",
    konsantrasyon: 3.2,
    israrTabani: 0.03,
    secenekPuani: (o, kategori) =>
      o.enKotuSaglik * 12 + o.bekSaglik * 3 + o.p * 22 - o.olumRiski * 1000 - o.hapisRiski * 200 -
      (kategori === "savas" ? 60 : 0) - Math.max(0, o.sucArtisi) * 40 + (o.bekSaglik >= 0 ? 15 : 0),
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
      o.bekPara * 1.0 + o.paraKazanci * 0.35 + o.bekUn * 0.6 + o.p * 5 - o.olumRiski * 260 -
      o.hapisRiski * 50 - o.paraGideri * 0.25,
    yan: {
      konutOran: 0.35, yasamOran: 0.3, konutMin: 2, konutMax: 3, yasamMin: 2, yasamMax: 3,
      yatirimSans: 0.6, yatirimNakitKat: 1.05, mulkSans: 0.6, mulkNakitKat: 1.15,
      mulkKaraborsaTercih: true, mulkRiskliKabul: true,
      sifaSaglikEsigi: 50, sifaSans: 0.35, sifaEnIyiyiAl: false,
      luksSans: 0.1, luksNakitKat: 5.0, envanterSaglikEsigi: 45,
      zarSans: 0.05, zarYuksekTercih: false, sosyalSans: 0.1, sosyalAlkol: "avoid",
    },
  },
];

// ---------------------------------------------------------------------------
// KARAR MEKANİZMALARI  (simulateKisilikler.ts ile birebir)
// ---------------------------------------------------------------------------

function tabanGuvenlik(o: SecenekOzeti, saglik: number): number {
  const panik = saglik < 45 ? 2.2 : saglik < 65 ? 1.4 : 1;
  return (
    o.p * 14 * panik + o.enKotuSaglik * 2.4 * panik + Math.min(0, o.bekSaglik) * 1.2 -
    o.olumRiski * 130 - o.hapisRiski * 30 - Math.max(0, -o.bekPara) * 0.35
  );
}
function secenekSec(secenekler: Secenek[], kisilik: Kisilik, kategori: string, state: CharacterState): number {
  const uygunlar = secenekler.map((s, i) => ({ s, i })).filter((x) => !x.s.kilitli);
  const havuz = uygunlar.length > 0 ? uygunlar : secenekler.map((s, i) => ({ s, i }));
  if (havuz.length === 1) return havuz[0].i;
  const borcBaskisi = state.para < 0 ? kirp(-state.para / 40, 0.8, 3.5) : 0;
  const puanlar = havuz.map((x) => {
    const o = secenekOzetiCikar(x.s);
    return kisilik.secenekPuani(o, kategori, state) + tabanGuvenlik(o, state.saglik) + borcBaskisi * o.bekPara;
  });
  const enDusuk = Math.min(...puanlar);
  const kon = kisilik.konsantrasyon;
  const agirliklar = puanlar.map((pu) => {
    const taban = pu - enDusuk + 1;
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
function tepkiSec(state: CharacterState, kisilik: Kisilik): number {
  const fevrilik = state.kisilik_eksenleri?.fevrilik ?? 50;
  const olasilik = kirp(kisilik.israrTabani + ((fevrilik - 50) / 100) * 0.3, 0.02, 0.96);
  return Math.random() < olasilik ? 1 : 0;
}
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
}

const KONUT_MALIYET = KONUTLAR.map((k) => ({ maliyet: k.kiraYillik }));
const YASAM_MALIYET = YASAM_SECENEKLERI.map((y) => ({ maliyet: y.maliyetYillik }));

/** state.para farkını ölçüp doğru gider kovasına yazan yardımcı. */
async function harcamaOlc(
  d: Defter,
  state: CharacterState,
  kova: keyof Defter["gider"],
  fn: () => Promise<unknown>
): Promise<void> {
  const once = state.para;
  await fn();
  const fark = state.para - once;
  if (fark < 0) d.gider[kova] += -fark;
  else if (fark > 0) d.gelir.diger += fark;
}

async function yanEylemler(
  id: string,
  state: CharacterState,
  ky: YanEylemAyari,
  sayaclar: Sayaclar,
  d: Defter
): Promise<void> {
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
      if (!ky.konutRastgele) {
        const kIdxSimdi = KONUTLAR.findIndex((k) => k.id === state.konut_id);
        const yIdxSimdi = YASAM_SECENEKLERI.findIndex((y) => y.id === state.yasam_secimi_id);
        if (kIdxSimdi > 2) {
          await harcamaOlc(d, state, "tasinma", () => konutDegistir(id, "normal_ev"));
          sayaclar.konutDegisimSayisi++;
        }
        if (yIdxSimdi > 2) {
          await yasamSecimiDegistir(id, "normal_ye");
          sayaclar.yasamDegisimSayisi++;
        }
      }
    } else if (ky.konutRastgele) {
      if (Math.random() < 0.45) {
        const hk = KONUTLAR[1 + Math.floor(Math.random() * (KONUTLAR.length - 1))];
        if (hk.id !== state.konut_id) {
          await harcamaOlc(d, state, "tasinma", () => konutDegistir(id, hk.id));
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
        await harcamaOlc(d, state, "tasinma", () => konutDegistir(id, KONUTLAR[kIdx].id));
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

  // 2) Kendi işine yatırım.
  try {
    if (state.saglik > 22 && Math.random() < ky.yatirimSans) {
      const cfg = await yatirimConfigGetir(id);
      const yeter =
        state.para >= cfg.kendiIsiMaliyeti * ky.yatirimNakitKat && state.para - cfg.kendiIsiMaliyeti >= 12;
      if (yeter) {
        await harcamaOlc(d, state, "yatirim", () => yatirimYap(id));
        sayaclar.yatirimSayisi++;
      }
    }
  } catch {
    /* yok say */
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
          else
            secilen = adaylar.reduce((a, b) =>
              b.tahminiYillikGetiriYuzdesi > a.tahminiYillikGetiriYuzdesi ? b : a
            );
        }
        const tur = secilen.tur;
        await harcamaOlc(d, state, "mulkAlim", () => mulkSatinAl(id, tur));
        sayaclar.mulkSayisi++;
      }
    }
  } catch {
    /* yok say */
  }

  // 4) Mağaza — şifa.
  try {
    const acil = state.saglik < 40;
    const alSans = Math.max(ky.sifaSans, acil ? 0.85 : state.saglik < 58 ? 0.45 : 0);
    if ((state.saglik < ky.sifaSaglikEsigi || state.saglik < 58) && Math.random() < alSans) {
      const katalog = await magazaConfigGetir(id);
      const butce = acil ? state.para * 0.95 : state.para * 0.8;
      const adaylar = katalog.filter((e) => e.kategori === "sifa" && !e.kilitli && e.fiyat <= butce);
      if (adaylar.length > 0) {
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = ky.sifaEnIyiyiAl || acil ? adaylar[adaylar.length - 1] : adaylar[0];
        const eid = secilen.id;
        await harcamaOlc(d, state, "magaza", () => magazadanSatinAl(id, eid));
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
        adaylar.sort((a, b) => a.fiyat - b.fiyat);
        const secilen = ky.luksSans >= 0.4 ? adaylar[adaylar.length - 1] : rastgele(adaylar);
        const eid = secilen.id;
        await harcamaOlc(d, state, "magaza", () => magazadanSatinAl(id, eid));
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
        const once = state.para;
        const sonuc = await zarAt(id, tutar);
        const fark = state.para - once;
        if (fark >= 0) d.gelir.zar += fark;
        else d.gider.zarKayip += -fark;
        sayaclar.zarSayisi++;
        if (sonuc.kazandi) sayaclar.zarKazanma++;
      }
    }
  } catch {
    /* yok say */
  }

  // 8) Sosyalleşme mekânına gitmek.
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

interface KilometreTasi {
  yas: number;
  sonMu: boolean;
  para: number;
  gayrimenkulDegeri: number;
  netServet: number;
  saglik: number;
  un: number;
  ahlak: number;
  mutluluk: number;
  kumulatifGelir: Defter["gelir"];
  kumulatifGider: Defter["gider"];
  bilgiMulkBakim: number;
}

interface OyunKaydi {
  kisilik: string;
  cag: Cag;
  meslek: string;
  bolge: string;
  yerlesim: string;
  olumYasi: number;
  olum_nedeni: string | null;
  konut_id_son: string;
  yasam_secimi_id_son: string;
  mulkSayisiSon: number;
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
  kilometreTaslari: KilometreTasi[];
  mutabakatFarki: number;
  hataMi: boolean;
}

function yuvarla2(x: number): number {
  return Math.round(x * 100) / 100;
}
function kmTasiYap(state: CharacterState, d: Defter, yas: number, sonMu: boolean): KilometreTasi {
  const gd = gayrimenkulDegeriHesapla(state);
  const g = (o: Record<string, number>) => {
    const r: Record<string, number> = {};
    for (const [k, v] of Object.entries(o)) r[k] = yuvarla2(v);
    return r;
  };
  return {
    yas,
    sonMu,
    para: yuvarla2(state.para),
    gayrimenkulDegeri: yuvarla2(gd),
    netServet: yuvarla2(state.para + gd),
    saglik: Math.round(state.saglik),
    un: Math.round(state.un),
    ahlak: Math.round(state.ahlak),
    mutluluk: Math.round(state.mutluluk),
    kumulatifGelir: g(d.gelir) as Defter["gelir"],
    kumulatifGider: g(d.gider) as Defter["gider"],
    bilgiMulkBakim: yuvarla2(d.bilgiMulkBakim),
  };
}

async function birOyunSimuleEt(kisilik: Kisilik, cag: Cag, meslek: string): Promise<OyunKaydi> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  const state0 = await yeniOyun(cag, bolge, yerlesim);
  await mesleğiAta(state0.id, meslek);
  const id = state0.id;
  const d = bosDefter();

  const sayaclar: Sayaclar = {
    yatirimSayisi: 0, mulkSayisi: 0, magazaSifaSayisi: 0, magazaLuksSayisi: 0,
    envanterKullanSayisi: 0, zarSayisi: 0, zarKazanma: 0, sosyallesmeSayisi: 0,
    konutDegisimSayisi: 0, yasamDegisimSayisi: 0,
  };
  const kilometreTaslari: KilometreTasi[] = [];
  let sonrakiKm = KM_BASLANGIC;

  let ilkPara = state0.para;
  let hataMi = false;
  let guard = 0;
  let state = state0;
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await yanEylemler(id, state, kisilik.yan, sayaclar, d);
      if (!state.aktif) break;

      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, kisilik, senaryo.kategori, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) {
        sonuc = await secimUygula(id, tepkiSec(state, kisilik));
      }
      if (sonuc?.state) state = sonuc.state;
      nakitAkisiniIsle(d, sonuc?.nakitAkisi);

      while (state.aktif && state.yas >= sonrakiKm && sonrakiKm <= 100) {
        kilometreTaslari.push(kmTasiYap(state, d, sonrakiKm, false));
        sonrakiKm += KM_ADIM;
      }
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${kisilik.id}/${cag}/${meslek} (${id}): ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  kilometreTaslari.push(kmTasiYap(son, d, son.yas, true));

  const mutabakatFarki = yuvarla2(defterNet(d) - (son.para - ilkPara));

  return {
    kisilik: kisilik.id,
    cag,
    meslek,
    bolge: son.bolge,
    yerlesim: son.yerlesim,
    olumYasi: son.yas,
    olum_nedeni: son.olum_nedeni,
    konut_id_son: son.konut_id,
    yasam_secimi_id_son: son.yasam_secimi_id,
    mulkSayisiSon: son.mulkler.length,
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
    kilometreTaslari,
    mutabakatFarki,
    hataMi,
  };
}

// ---------------------------------------------------------------------------
// ANA DÖNGÜ
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const istenen = (process.env.SIM_KISILIK ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const kisiliklar = istenen.length > 0 ? TUM_KISILIKLER.filter((k) => istenen.includes(k.id)) : TUM_KISILIKLER;
  if (kisiliklar.length === 0) {
    console.error(`Bilinmeyen SIM_KISILIK. Geçerli: ${TUM_KISILIKLER.map((k) => k.id).join(", ")}`);
    process.exit(1);
  }

  const caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  const toplamHedef = kisiliklar.length * caglar.length * MESLEKLER.length * N_PER_GROUP;
  console.log(
    `Ekonomi kırılım simülasyonu: ${kisiliklar.length} kişilik × ${caglar.length} çağ × ${MESLEKLER.length} meslek × ${N_PER_GROUP} = ${toplamHedef} ömür.\n`
  );

  const tumKayitlar: OyunKaydi[] = [];
  const baslangic = Date.now();
  let oynanan = 0;

  for (const kisilik of kisiliklar) {
    for (const cag of caglar) {
      for (const meslek of MESLEKLER) {
        console.log(`=== [${kisilik.ad}] ${cag} — ${meslek}: ${N_PER_GROUP} ömür ===`);
        for (let i = 0; i < N_PER_GROUP; i++) {
          const kayit = await birOyunSimuleEt(kisilik, cag, meslek);
          tumKayitlar.push(kayit);
          oynanan++;
          if ((i + 1) % 20 === 0 || i === N_PER_GROUP - 1) {
            const sn = ((Date.now() - baslangic) / 1000).toFixed(0);
            const son = kayit.kilometreTaslari[kayit.kilometreTaslari.length - 1];
            console.log(
              `  ${i + 1}/${N_PER_GROUP} (toplam ${oynanan}/${toplamHedef}, ${sn}sn) — ölüm yaşı ${kayit.olumYasi}, net servet ${son.netServet}, mutabakat Δ ${kayit.mutabakatFarki}`
            );
          }
        }
      }
    }
  }

  const cikisYolu = path.join(__dirname, "simulateEkonomiAnaliz.sonuc.json");
  fs.writeFileSync(cikisYolu, JSON.stringify(tumKayitlar, null, 2), "utf-8");
  const sn = ((Date.now() - baslangic) / 1000).toFixed(0);
  console.log(`\nYazıldı: ${cikisYolu}`);
  console.log(`Toplam ${tumKayitlar.length} ömür (${sn} sn).`);
  const hatali = tumKayitlar.filter((k) => k.hataMi).length;
  if (hatali > 0) console.log(`Uyarı: ${hatali} ömür hatayla erken bitti.`);
  const kotuMutabakat = tumKayitlar.filter((k) => Math.abs(k.mutabakatFarki) > 1).length;
  console.log(`Mutabakat: ${kotuMutabakat}/${tumKayitlar.length} ömürde |Δ| > 1 (ideal 0 — küçük Δ jitter yuvarlamasından).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
