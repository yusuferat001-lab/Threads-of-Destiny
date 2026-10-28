/**
 * Yeni nesil oyuncu modelleri — gerçek `gameEngine` üzerinde, "İLERLE" zaman modunda (olay → 2 yıl dolunca,
 * aradaki yıllar yilGec ile) tam ömür simülasyonu. Asker hariç üç işletmeli meslek: Tüccar, Zanaatkâr, Din Adamı.
 *
 * Eski botlardan (aktif/garantici/cimri/suclu/luks/kaotik/survival/para/cesur) farkı: onlar yalnızca "olay şıkkı
 * puanlayıcı + genel yan eylem" idi. Bu modeller dört bütünsel HAYAT STRATEJİSİ: işletme yönetimi (kredi, çalışan,
 * yatırım, fiyat, hat sayısı), şehir yöneticisi ilişkileri, karanlık işler, aile/evlilik/çocuk, sosyal hayat,
 * mağaza, aranma/vergi kararları ve olay şıkkı seçimi birlikte tasarlandı.
 *
 *   usta     — Sabırlı Lonca Ustası : borçtan kaçar, organik büyür, dürüst, aileli, tek-iki hat, yavaş sadık ekip
 *   atilgan  — Kaldıraçlı Atılgan   : en büyük krediyi alır, hepsini hemen açar, ucuz fiyat/hacim, tanıtım, ucuz ekip,
 *                                     eşini/aileyi ihmal eder, sağlığı boşlar
 *   kurnaz   — Saray Kurnazı        : şehir yöneticisini yağlar, rüşvetli istekler, rakibe karanlık iş, premium fiyat,
 *                                     az ama seçilmiş ekip, kefareti hemen öder, şöhret/statü peşinde
 *   halk     — Halk Adamı           : erken evlenir, aile/çocuk/sosyalleşme/sadaka, ucuz fiyat (sadık müşteri),
 *                                     konfor ve sağlık için harcar, sanat/binek alır, işletmeyi "yeter" seviyesinde işletir
 *
 *   SIM_N=60 SIM_PERSONA=usta,kurnaz SIM_MESLEK=Tüccar SIM_CAG="Orta Çağ" SIM_CIKTI=dosya.json
 *   npx tsx scripts/simulateOyuncuModelleri.ts
 */
import "./_simPrismaStub";
import fs from "fs";
import path from "path";
import {
  yeniOyun, mesleğiAta, senaryoUret, secimUygula, stateGetir, yilGec, finansGetir,
  konutDegistir, yasamSecimiDegistir, magazaConfigGetir, magazadanSatinAl, envanterEsyasiKullan,
  sosyallesmeYerleriGetir, sosyallesmeYerineGit, sosyallesmeOlayCoz,
  isletmeKararVer, isletmeYatirimYap, isletmeCalisanAl, isletmeOgretiSec, isletmeUrunSec,
  ekipCikar, krediAlEndpoint, aranmaKefaretOde, aranmaBildirimiYanitla,
  yonetimDurumGetir, yonetimEtkilesimYap, yonetimIstekYap, yonetimTalebiKararlastir,
  kotuIsConfigGetir, kotuIsYap,
  aileDurumGetir, mantikTeklifEt, dugunYap, esEylemYap, aileEtkilesimYap, aileTalebiKararlastir, cocukIseAl, cocukRedTepkisi,
  tanismaYaklas, tanismaVazgec, tanismaSec, sevgiliTeklifEt, sevgiliGonulAl,
} from "../src/game/gameEngine";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, calisanLimiti, depoKapasitesi } from "../src/game/isletme";
import { ogretiBekleyenSeviye } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import { FAALIYETLER } from "../src/data/cemaat";
import { pazarPayiHesapla } from "../src/data/pazar";
import { KONUTLAR } from "../src/data/konutlar";
import { YASAM_SECENEKLERI } from "../src/data/yasamSecenekleri";
import {
  enflasyonCarpani, giderEnflasyonCarpani, krediTeklifleri, hesaplaSkor, netServetHesapla,
} from "../src/game/stateManager";
import type { CharacterState, Cag, Secenek, IsletmeFiyat } from "../src/types";

const N = Number(process.env.SIM_N ?? 40);
const MAKS_ITER = 900;
const MESLEKLER_SIM = (process.env.SIM_MESLEK ?? "Tüccar,Zanaatkâr,Din Adamı").split(",");
const CAGLAR_SIM = (process.env.SIM_CAG ? process.env.SIM_CAG.split(",") : ["Orta Çağ", "Sanayi Devrimi"]) as Cag[];
const BOLGE: Record<string, string[]> = {
  "Orta Çağ": ["Fransa", "Kutsal Roma", "Bizans", "Selçuklu"],
  "Sanayi Devrimi": ["İngiltere", "Fransa", "Osmanlı", "Rusya"],
};

const rastgele = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const kirp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const ort = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const sayi = (x: number | undefined) => (typeof x === "number" ? x : 0);

// ───────────────────────────── olay şıkkı özeti ─────────────────────────────
interface Ozet {
  p: number; bekPara: number; bekSaglik: number; bekAhlak: number; bekUn: number; bekMutluluk: number;
  paraKazanci: number; paraGideri: number; enKotuSaglik: number; olumRiski: number; hapisRiski: number;
  sucArtisi: number; sucImzasi: boolean; maliyet: number;
}
function ozetle(s: Secenek): Ozet {
  const b: any = s.basarili_sonuc ?? {};
  const k: any = s.basarisiz_sonuc ?? {};
  const p = kirp((s.basari_sansi ?? 50) / 100, 0, 1);
  const bek = (a: string) => p * sayi(b[a]) + (1 - p) * sayi(k[a]);
  const sucSinifi = (x: any) => ({ kucuk: 6, orta: 13, buyuk: 23, agir: 27 } as Record<string, number>)[x?.suc_sinifi] ?? 0;
  return {
    p, bekPara: bek("para"), bekSaglik: bek("saglik"), bekAhlak: bek("ahlak"), bekUn: bek("un"), bekMutluluk: bek("mutluluk"),
    paraKazanci: Math.max(0, bek("para")), paraGideri: Math.max(0, -bek("para")),
    enKotuSaglik: Math.min(sayi(b.saglik), sayi(k.saglik)),
    olumRiski: (b.olum ? 1 : 0) + (k.olum ? 1 : 0) + (sayi(b.olum_sansi) + sayi(k.olum_sansi)) / 100,
    hapisRiski: (b.etiket_ekle?.includes("hapiste") ? 1 : 0) + (k.etiket_ekle?.includes("hapiste") ? 1 : 0),
    sucArtisi: Math.max(0, sayi(b.suc_artis)) + sucSinifi(b) * p + sucSinifi(k) * (1 - p),
    sucImzasi: !!b.suc_sinifi || !!k.suc_sinifi,
    maliyet: sayi(s.maliyet),
  };
}

// ───────────────────────────── bağlam ─────────────────────────────
interface Ctx {
  id: string;
  s: CharacterState;
  P: Persona;
  yilIdx: number; // karakterin kaç yıl oynadığı (yaş-15)
  harcama: number; // bot yatırım/mağaza/aile harcaması (bu örnekleme aralığı)
  sonDeltalar: number[]; // son yılların eline kalanı (ihtiyatlı oyuncu kuralı için)
  dusurmeYili: number; // son yaşam tarzı kısıntısı (8 yıl yükseltme yok: taşınma/yo-yo israfını önler)
  sayac: Record<string, number>;
}
const enf = (c: Ctx) => enflasyonCarpani(c.s);
const genf = (c: Ctx) => giderEnflasyonCarpani(c.s);
const aktifMi = (c: Ctx) => c.s.aktif;

/** Mal alım rezervi: açık hatların tam depo dolumu maliyetinin ~%90'ı (ya da cemaatte bina bakım rezervi). Tüm modeller önce stoğu korur. */
function rezervDepo(c: Ctx): number {
  const is = c.s.isletme;
  const profil = isletmeProfiliGetir(c.s.meslek, c.s.cag);
  if (!is || !profil) return 15 * enf(c);
  if (profil.mod === "cemaat") return 18 * genf(c);
  const acik = profil.hatlar.filter((h) => is.hatlar.some((x) => x.id === h.id && x.acik));
  const ortMaliyet = acik.length ? ort(acik.map((h) => h.birimMaliyet)) : 0.8;
  return depoKapasitesi(is) * ortMaliyet * 0.9 * genf(c);
}
const serbest = (c: Ctx) => c.s.para - rezervDepo(c);

async function harca<T>(c: Ctx, f: () => Promise<T>, etiket?: string): Promise<T | null> {
  const once = c.s.para;
  try {
    const r = await f();
    const fark = once - c.s.para;
    if (fark > 0) c.harcama += fark;
    if (etiket) c.sayac[etiket] = (c.sayac[etiket] ?? 0) + 1;
    return r;
  } catch {
    return null;
  }
}

// ───────────────────────────── persona şeması ─────────────────────────────
type RolTuru = "ana" | "maliyet" | "musteri" | "guvenlik";
interface IsPlan {
  fiyat: IsletmeFiyat;
  hatTavan: (c: Ctx) => number;
  hatSira: (h: { talepTabani: number; birimFiyat: number; birimMaliyet: number; kesim?: string }) => number;
  kredi: "hic" | "gerekirse" | "buyuk_erken";
  /** para < rezervDepo × bu ise (ve teklif varsa) acil kredi alır — tüm modellerde var, yalnız eşik farklı */
  acilKrediEsik: number;
  calisanHedef: (c: Ctx) => number;
  rolOncelik: RolTuru[];
  minSadakat: number;
  minYetenek: number;
  ucuzIsci: boolean;
  /** yeni maaş + geçim sonrası dükkân neti en az bu (× gider enflasyonu) kalmalı */
  netTampon: number;
  yatirimSira: string[];
  yatirimNakitKat: number; // para > fiyat × kat
  yillikYatirim: number; // yılda en fazla kaç yatırım
  rezerv: (c: Ctx) => number;
  ogretiFanatik: boolean;
  urunIdx: number;
  cemaat: { bagis: string; kitle: string; yardim: string; ton: string };
  cemaatSira: (f: (typeof FAALIYETLER)[number]) => number;
}
interface Yasam {
  konut: [number, number]; yasam: [number, number]; konutOran: number; yasamOran: number;
  sifaEsik: number; luks: boolean; sanatBinek: boolean; luksNakitKat: number;
  sosyalSans: number; sadakaSans: number;
}
interface Aile {
  evlenme: "erken" | "gec" | "hic" | "kurnaz";
  evlilikMinYas: number;
  dugun: "ucuz" | "orta" | "pahali";
  hediye: "sade" | "ucuz" | "pahali";
  esZaman: number; // kaç yılda bir zaman geçir (0 = hiç)
  esHediye: number; // kaç yılda bir hediye
  cocukEtkilesim: number; // kaç yılda bir
  tanismaGit: number; // 0..1
  aldat: number; // evliyken tanışmaya gitme olasılığı
  talepKabul: number; // 0..1
}
interface Siyaset {
  yonetici: "yok" | "minimal" | "aktif";
  rusvet: boolean;
  karanlik: number; // yıllık deneme olasılığı
  karanlikMinSans: number;
  kefaretEsik: number; // aranma ≥ ise kefaret öde
  polis: "tam" | "yarim" | "hayir";
  vergi: "kabul" | "rusvet";
  yonetimTalep: "kabul" | "ret";
}
interface Persona {
  id: string; ad: string; isletme: IsPlan; yasam: Yasam; aile: Aile; siyaset: Siyaset;
  kons: number; israr: number;
  puan: (o: Ozet, kat: string, s: CharacterState) => number;
}

const hepsiAcik = (c: Ctx) => 99;

const PERSONALAR: Persona[] = [
  {
    id: "usta", ad: "Sabırlı Lonca Ustası", kons: 3.2, israr: 0.05,
    puan: (o) => o.p * 40 + o.bekAhlak * 3 + o.bekUn * 1.5 + o.bekSaglik * 2 + o.bekMutluluk + o.bekPara * 0.3
      - o.olumRiski * 600 - o.hapisRiski * 300 - o.sucArtisi * 8 - (o.sucImzasi ? 120 : 0),
    isletme: {
      fiyat: "normal", hatTavan: (c) => (c.s.rutbe_seviye >= 3 ? 2 : 1), hatSira: (h) => h.talepTabani * (h.kesim === "luks" ? 0.4 : 1),
      kredi: "hic", acilKrediEsik: 0.25, calisanHedef: (c) => Math.min(c.s.rutbe_seviye + 1, 4), rolOncelik: ["guvenlik", "maliyet", "musteri", "ana"],
      minSadakat: 55, minYetenek: 35, ucuzIsci: false, netTampon: 14,
      yatirimSira: ["depo", "guvenlik", "kervan", "tezgah", "tanitim", "bina", "asevi", "okul"], yatirimNakitKat: 3, yillikYatirim: 1,
      rezerv: (c) => 30 * genf(c), ogretiFanatik: false, urunIdx: 0,
      cemaat: { bagis: "normal", kitle: "genel", yardim: "orta", ton: "ilimli" },
      cemaatSira: (f) => f.gelirBirimi * (1 - f.masraf),
    },
    yasam: { konut: [1, 2], yasam: [1, 2], konutOran: 0.18, yasamOran: 0.15, sifaEsik: 55, luks: false, sanatBinek: false, luksNakitKat: 99, sosyalSans: 0.05, sadakaSans: 0.1 },
    aile: { evlenme: "erken", evlilikMinYas: 24, dugun: "orta", hediye: "ucuz", esZaman: 2, esHediye: 6, cocukEtkilesim: 3, tanismaGit: 0.75, aldat: 0, talepKabul: 0.9 },
    siyaset: { yonetici: "minimal", rusvet: false, karanlik: 0, karanlikMinSans: 99, kefaretEsik: 5, polis: "tam", vergi: "kabul", yonetimTalep: "kabul" },
  },
  {
    id: "atilgan", ad: "Kaldıraçlı Atılgan", kons: 1.3, israr: 0.7,
    puan: (o) => o.bekPara * 1.1 + o.bekUn * 2 + (1 - Math.abs(o.p - 0.5) * 2) * 25 + o.p * 4
      - o.olumRiski * 160 - o.hapisRiski * 50 - o.sucArtisi * 1.5,
    isletme: {
      fiyat: "eksi20", hatTavan: hepsiAcik, hatSira: (h) => h.talepTabani,
      kredi: "buyuk_erken", acilKrediEsik: 0.5, calisanHedef: () => 99, rolOncelik: ["musteri", "maliyet", "ana", "guvenlik"],
      minSadakat: 0, minYetenek: 0, ucuzIsci: true, netTampon: 2,
      yatirimSira: ["tanitim", "kervan", "tezgah", "depo", "dukkan", "vitrin", "guvenlik", "okul", "asevi", "bina"], yatirimNakitKat: 1.05, yillikYatirim: 3,
      rezerv: (c) => 8 * genf(c), ogretiFanatik: true, urunIdx: 2,
      cemaat: { bagis: "arti10", kitle: "ust", yardim: "dusuk", ton: "dengeli" },
      cemaatSira: (f) => f.inanan * 40 + f.gelirBirimi * (1 - f.masraf),
    },
    yasam: { konut: [1, 1], yasam: [1, 1], konutOran: 0.05, yasamOran: 0.05, sifaEsik: 30, luks: false, sanatBinek: false, luksNakitKat: 99, sosyalSans: 0.0, sadakaSans: 0 },
    aile: { evlenme: "gec", evlilikMinYas: 33, dugun: "ucuz", hediye: "sade", esZaman: 0, esHediye: 0, cocukEtkilesim: 0, tanismaGit: 0.2, aldat: 0.3, talepKabul: 0.1 },
    siyaset: { yonetici: "yok", rusvet: false, karanlik: 0, karanlikMinSans: 99, kefaretEsik: 40, polis: "yarim", vergi: "kabul", yonetimTalep: "ret" },
  },
  {
    id: "kurnaz", ad: "Saray Kurnazı", kons: 2.0, israr: 0.35,
    puan: (o) => o.bekUn * 4 + o.bekPara * 0.7 + o.p * 20 + (o.sucImzasi ? 8 : 0) - o.olumRiski * 300 - o.hapisRiski * 120 - o.sucArtisi * 4 + o.bekMutluluk * 0.5,
    isletme: {
      fiyat: "arti10", hatTavan: (c) => (c.s.rutbe_seviye >= 2 ? 2 : 1), hatSira: (h) => h.talepTabani * (h.birimFiyat - h.birimMaliyet),
      kredi: "gerekirse", acilKrediEsik: 0.35, calisanHedef: () => 2, rolOncelik: ["guvenlik", "maliyet", "musteri", "ana"],
      minSadakat: 40, minYetenek: 55, ucuzIsci: false, netTampon: 10,
      yatirimSira: ["guvenlik", "depo", "kervan", "tanitim", "tezgah", "bina", "okul", "asevi"], yatirimNakitKat: 2, yillikYatirim: 1,
      rezerv: (c) => 25 * genf(c), ogretiFanatik: false, urunIdx: 2,
      cemaat: { bagis: "arti10", kitle: "ust", yardim: "dusuk", ton: "dengeli" },
      cemaatSira: (f) => f.gelirBirimi * (1 - f.masraf),
    },
    yasam: { konut: [2, 4], yasam: [1, 3], konutOran: 0.5, yasamOran: 0.3, sifaEsik: 50, luks: true, sanatBinek: true, luksNakitKat: 4, sosyalSans: 0.15, sadakaSans: 0.05 },
    aile: { evlenme: "kurnaz", evlilikMinYas: 27, dugun: "pahali", hediye: "pahali", esZaman: 0, esHediye: 4, cocukEtkilesim: 6, tanismaGit: 0.5, aldat: 0.5, talepKabul: 0.6 },
    siyaset: { yonetici: "aktif", rusvet: true, karanlik: 0.6, karanlikMinSans: 40, kefaretEsik: 25, polis: "tam", vergi: "rusvet", yonetimTalep: "kabul" },
  },
  {
    id: "halk", ad: "Halk Adamı", kons: 2.2, israr: 0.2,
    puan: (o) => o.bekMutluluk * 4 + o.bekSaglik * 2.5 + o.bekAhlak * 1.5 + o.bekUn * 1.5 + o.p * 10 + o.bekPara * 0.15
      - o.olumRiski * 400 - o.hapisRiski * 150 - o.sucArtisi * 25,
    isletme: {
      fiyat: "eksi10", hatTavan: (c) => (c.s.rutbe_seviye >= 2 ? 2 : 1), hatSira: (h) => h.talepTabani,
      kredi: "hic", acilKrediEsik: 0.25, calisanHedef: (c) => Math.min(2 + (c.s.rutbe_seviye >= 3 ? 1 : 0), 3), rolOncelik: ["musteri", "guvenlik", "maliyet", "ana"],
      minSadakat: 45, minYetenek: 30, ucuzIsci: false, netTampon: 8,
      yatirimSira: ["tanitim", "depo", "asevi", "guvenlik", "bina", "tezgah", "kervan", "okul"], yatirimNakitKat: 3.5, yillikYatirim: 1,
      rezerv: (c) => 35 * genf(c), ogretiFanatik: false, urunIdx: 0,
      cemaat: { bagis: "eksi10", kitle: "alt", yardim: "yuksek", ton: "ilimli" },
      cemaatSira: (f) => f.inanan * 60 + f.gelirBirimi * 0.3,
    },
    yasam: { konut: [2, 4], yasam: [2, 4], konutOran: 0.55, yasamOran: 0.5, sifaEsik: 68, luks: false, sanatBinek: true, luksNakitKat: 6, sosyalSans: 0.5, sadakaSans: 0.6 },
    aile: { evlenme: "erken", evlilikMinYas: 22, dugun: "pahali", hediye: "pahali", esZaman: 1, esHediye: 3, cocukEtkilesim: 2, tanismaGit: 1, aldat: 0, talepKabul: 1 },
    siyaset: { yonetici: "yok", rusvet: false, karanlik: 0, karanlikMinSans: 99, kefaretEsik: 15, polis: "tam", vergi: "kabul", yonetimTalep: "kabul" },
  },
];

// ───────────────────────────── şık seçimi ─────────────────────────────
function secenekSec(secenekler: Secenek[], P: Persona, kat: string, s: CharacterState): number {
  const uygun = secenekler.map((x, i) => ({ x, i })).filter((a) => !a.x.kilitli);
  const havuz = uygun.length ? uygun : secenekler.map((x, i) => ({ x, i }));
  if (havuz.length === 1) return havuz[0].i;
  const puanlar = havuz.map(({ x }) => {
    const o = ozetle(x);
    // Hepsi için ortak hayatta-kalma tabanı (modeller arası fark yalnızca strateji olsun)
    const panik = s.saglik < 45 ? 2 : 1;
    const taban = o.p * 8 * panik + o.enKotuSaglik * 1.2 * panik - o.olumRiski * 90 - o.hapisRiski * 20;
    const borc = s.para < 0 ? kirp(-s.para / 40, 0.5, 3) * o.bekPara : 0;
    return P.puan(o, kat, s) + taban + borc;
  });
  const min = Math.min(...puanlar);
  const w = puanlar.map((p) => Math.max(1e-6, Math.pow(p - min + 1, P.kons)) * (0.85 + Math.random() * 0.3));
  let t = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let k = 0; k < w.length; k++) {
    t -= w[k];
    if (t <= 0) return havuz[k].i;
  }
  return havuz[havuz.length - 1].i;
}
const tepkiSec = (s: CharacterState, P: Persona) =>
  Math.random() < kirp(P.israr + (((s.kisilik_eksenleri?.fevrilik ?? 50) - 50) / 100) * 0.3, 0.02, 0.95) ? 1 : 0;

// ───────────────────────────── bekleyen zorunluluklar ─────────────────────────────
async function bekleyenleriCoz(c: Ctx): Promise<void> {
  const { s, P, id } = c;
  // Din Adamı öğretisi (seçilmeden oyun ilerlemez)
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(s);
    if (sev === null) break;
    const sec = ogretiSecenekleri(sev);
    const o = (P.isletme.ogretiFanatik ? sec.find((x) => x.fanatik) : sec.find((x) => !x.fanatik)) ?? sec[0];
    if ((await harca(c, () => isletmeOgretiSec(id, o.id))) === null) break;
  }
  // Başlangıç ürünü
  if (s.urun_secim_bekliyor) {
    const profil = isletmeProfiliGetir(s.meslek, s.cag);
    const u = profil?.baslangicUrunleri;
    if (u?.length) await harca(c, () => isletmeUrunSec(id, u[Math.min(P.isletme.urunIdx, u.length - 1)].hat));
  }
  // Ekstra vergi talebi
  if (s.yonetim_talep?.tur === "vergi") {
    if (process.env.SIM_TRACE) console.log(`  >> EKSTRA VERGİ yaş ${s.yas}: tutar ${(s.yonetim_talep as any).tutar} para ${s.para.toFixed(0)} dükkân neti ${(s.isletme?.son_dokum?.net ?? 0).toFixed(0)} brüt ${(s.isletme?.son_dokum?.brutKar ?? 0).toFixed(0)}`);
    let r = P.siyaset.vergi === "rusvet" ? await harca(c, () => yonetimTalebiKararlastir(id, "rusvet")) : null;
    if (r === null) r = await harca(c, () => yonetimTalebiKararlastir(id, "kabul"));
    c.sayac.vergi = (c.sayac.vergi ?? 0) + 1;
  } else if (s.yonetim_talep) {
    await harca(c, () => yonetimTalebiKararlastir(id, P.siyaset.yonetimTalep === "kabul" ? "kabul" : "ret"));
  }
  // Aranma bildirimleri (yalnız polis uyarısı yanıt ister)
  for (const b of [...(s.aranma_bildirimleri ?? [])]) {
    if (b.tur === "polis_uyari") {
      let r = await harca(c, () => aranmaBildirimiYanitla(id, b.id, P.siyaset.polis));
      if (r === null) r = await harca(c, () => aranmaBildirimiYanitla(id, b.id, "hayir"));
    } else {
      await harca(c, () => aranmaBildirimiYanitla(id, b.id));
    }
  }
  // Düğün bekliyor
  if (s.bekleyen_dugun) await harca(c, () => dugunYap(id, serbest(c) > 70 * enf(c) ? P.aile.dugun : "ucuz"), "dugun");
  // Tanışma süren
  for (let g = 0; g < 8 && s.aktif_tanisma; g++) {
    const evli = !!s.es_adi;
    const git = evli ? Math.random() < P.aile.aldat : Math.random() < P.aile.tanismaGit;
    const t = s.aktif_tanisma;
    let r: any = null;
    if (!git) r = await harca(c, () => tanismaVazgec(id));
    else if ((t as any).adim === 0 || (t as any).adim === undefined) r = await harca(c, () => tanismaYaklas(id));
    if (r === null) r = await harca(c, () => tanismaSec(id, Math.floor(Math.random() * 3)));
    if (r === null) break;
    if (r.bitti) break;
  }
}

// ───────────────────────────── işletme yönetimi ─────────────────────────────
async function isletmeYonet(c: Ctx): Promise<void> {
  const { s, id } = c;
  const I = c.P.isletme;
  const is = s.isletme;
  const profil = isletmeProfiliGetir(s.meslek, s.cag);
  if (!is || !profil || s.etiketler.includes("hapiste") || s.etiketler.includes("yolculukta")) return;
  const e = enf(c);
  const net = is.son_dokum?.net ?? 0;
  const cemaatMi = profil.mod === "cemaat";

  // 1) Kredi (strateji) + acil kredi (hepsi: stok parası biterse)
  if (!s.kredi) {
    try {
      const teklifler = krediTeklifleri(s);
      if (teklifler.length) {
        const kucuk = [...teklifler].sort((a, b) => a.tutar - b.tutar)[0];
        const buyuk = [...teklifler].sort((a, b) => b.tutar - a.tutar)[0];
        const acil = s.para < rezervDepo(c) * I.acilKrediEsik;
        if (I.kredi === "buyuk_erken" && (c.yilIdx <= 4 || acil) && (net > 0 || c.yilIdx <= 4)) await harca(c, () => krediAlEndpoint(id, buyuk.id), "kredi");
        else if (I.kredi === "gerekirse" && (s.para < 8 * genf(c) || acil) && net > 0 && kucuk.taksit <= 0.6 * net) await harca(c, () => krediAlEndpoint(id, kucuk.id), "kredi");
        else if (acil && (s.para < 0 || kucuk.taksit <= 0.8 * Math.max(net, 6))) await harca(c, () => krediAlEndpoint(id, kucuk.id), "acil_kredi");
      }
    } catch { /* yok say */ }
  }

  adaylariYenileGerekirse(s);

  // Küçülme refleksi (tüm modeller): nakit ince ve dükkân neti maaşları taşımıyorsa en zayıf çalışanı çıkar
  {
    const toplamMaas0 = s.ekip.reduce((x, u) => x + u.maas, 0);
    if (s.ekip.length > 0 && s.para < rezervDepo(c) * 0.6 && net < toplamMaas0 * 1.2) {
      const zayif = [...s.ekip].sort((a, b) => a.gercekKalite - b.gercekKalite)[0];
      await harca(c, () => ekipCikar(id, zayif.id), "kovma");
    }
  }

  // 2) Çalışan
  const limit = Math.min(calisanLimiti(s), I.calisanHedef(c));
  for (let dene = 0; dene < 8 && s.ekip.length < limit && is.adaylar.length; dene++) {
    const uygun = is.adaylar.filter((a) => a.sadakat >= I.minSadakat && a.yetenek >= I.minYetenek);
    if (!uygun.length) break;
    const sirali = [...uygun].sort((a, b) => {
      const o = I.rolOncelik.indexOf(a.rolTuru as RolTuru) - I.rolOncelik.indexOf(b.rolTuru as RolTuru);
      if (o) return o;
      return I.ucuzIsci ? a.maas_taban - b.maas_taban : b.yetenek + b.sadakat - (a.yetenek + a.sadakat);
    });
    const a = sirali[0];
    const toplamMaas = s.ekip.reduce((t, u) => t + u.maas, 0);
    const yeniMaas = a.maas_taban * genf(c);
    if (s.para < Math.max(I.rezerv(c), rezervDepo(c)) + yeniMaas * 3) break;
    if (net - toplamMaas - yeniMaas < I.netTampon * genf(c)) break;
    if ((await harca(c, () => isletmeCalisanAl(id, a.id), "calisan")) === null) break;
  }

  // 3) Yatırım
  let yapilan = 0;
  for (const yid of I.yatirimSira) {
    if (yapilan >= I.yillikYatirim) break;
    const t = yatirimTanimiGetir(profil, yid);
    if (!t) continue;
    const k = is.yatirimlar[yid] ?? 0;
    if (k >= t.fiyatlar.length) continue;
    if (yid === "depo" && !cemaatMi) {
      const talep = is.hatlar.filter((h) => h.acik).reduce((x, h) => x + (h.son_talep || 0), 0);
      if (talep < depoKapasitesi(is) * 0.88) continue;
    }
    const fiyat = t.fiyatlar[k] * genf(c);
    const depoZorunlu = yid === "depo" && !cemaatMi && is.hatlar.filter((h) => h.acik).reduce((x, h) => x + (h.son_talep || 0), 0) >= depoKapasitesi(is);
    if (depoZorunlu ? s.para > fiyat * 1.15 + 4 : s.para > Math.max(I.rezerv(c), rezervDepo(c)) + fiyat * I.yatirimNakitKat) {
      if ((await harca(c, () => isletmeYatirimYap(id, yid), "yatirim")) !== null) yapilan++;
    }
  }

  // 4) Hatlar / faaliyetler / cemaat politikası
  try {
    if (cemaatMi) {
      const { faaliyetSlotSayisi, faaliyetKilitliMi } = await import("../src/game/cemaat");
      const acilabilir = FAALIYETLER.filter((f) => !faaliyetKilitliMi(s, f.id)).sort((a, b) => I.cemaatSira(b) - I.cemaatSira(a));
      const secili = new Set(acilabilir.slice(0, Math.min(faaliyetSlotSayisi(s), I.hatTavan(c))).map((f) => f.id));
      await isletmeKararVer(id, is.hatlar.map((h) => ({ id: h.id, acik: secili.has(h.id) })), I.cemaat);
    } else {
      const slot = Math.min(hatSlotSayisi(s), I.hatTavan(c));
      const aday = profil.hatlar
        .filter((h) => h.minRutbe <= s.rutbe_seviye)
        .sort((a, b) => I.hatSira(b) - I.hatSira(a))
        .slice(0, slot)
        .map((h) => h.id);
      // ana ürünü hemen kapatma: bot ilk yıl ana ürünle başlasın
      if (is.ana_urun && !aday.includes(is.ana_urun) && aday.length >= slot) aday[aday.length - 1] = is.ana_urun;
      await isletmeKararVer(id, is.hatlar.map((h) => ({ id: h.id, acik: aday.includes(h.id), fiyat: I.fiyat })));
    }
  } catch { /* hat limiti vb. */ }
}
function adaylariYenileGerekirse(_s: CharacterState) { /* aday havuzu yıl döngüsünde motorca yenilenir */ }

// ───────────────────────────── şehir yöneticisi + karanlık işler + aranma ─────────────────────────────
async function siyasetYonet(c: Ctx): Promise<void> {
  const { s, id } = c;
  const S = c.P.siyaset;
  if (s.etiketler.includes("hapiste") || s.etiketler.includes("yolculukta")) return;
  // Aranma kefareti
  if (s.suc_seviyesi >= S.kefaretEsik && s.suc_seviyesi > 0) await harca(c, () => aranmaKefaretOde(id, false), "kefaret");

  if (S.yonetici !== "yok") {
    try {
      const d = await yonetimDurumGetir(id);
      const kademeler = d.yonetici.bagisKademeleri;
      const hedefIliski = S.yonetici === "aktif" ? 88 : 55;
      if (d.yonetici.iliski < hedefIliski && kademeler.length) {
        const k = S.yonetici === "aktif" ? kademeler[Math.min(1, kademeler.length - 1)] : kademeler[0];
        if (serbest(c) > k * 2) await harca(c, () => yonetimEtkilesimYap(id, "yonetici:bagis", k), "bagis");
        if (S.yonetici === "aktif") {
          const hizmet = d.etkilesimler.find((x) => x.id.endsWith(":hizmet"));
          if (hizmet) await harca(c, () => yonetimEtkilesimYap(id, hizmet.id, undefined, hizmet.varyantlar?.[0]), "hizmet");
        }
      }
      if (S.yonetici === "aktif") {
        const istekler = d.istekler.filter((x) => x.acik).sort((a, b) => b.tahminiSans - a.tahminiSans);
        for (const ist of istekler) {
          if (ist.id === "sicil_temizligi" && s.suc_seviyesi < 20) continue;
          if (ist.id === "kredi_kefaleti" && !s.kredi) continue;
          if (ist.id === "rakibe_darbe" && !s.rakipler.some((r) => !r.yenildi)) continue;
          if ((await harca(c, () => yonetimIstekYap(id, ist.id, S.rusvet && ist.rusvetBonus !== null), "istek")) !== null) break; // yılda bir istek
        }
      }
    } catch { /* yok say */ }
  }

  // Karanlık işler (rakibi zayıflatıp müşteri almak)
  if (S.karanlik > 0 && Math.random() < S.karanlik && s.suc_seviyesi < 45) {
    try {
      const kartlar = (await kotuIsConfigGetir(id)).filter((k) => k.kalanYil === 0 && !k.sadeceAjan && k.basariSansi >= S.karanlikMinSans && k.maliyet <= Math.max(0, serbest(c)) * 0.5);
      const sirali = kartlar.sort((a, b) => (b.rakipKirmaYuzde + b.musteriKazanci) - (a.rakipKirmaYuzde + a.musteriKazanci));
      const k = sirali[0];
      if (k) {
        const hedef = s.rakipler.find((r) => !r.yenildi)?.ad;
        await harca(c, () => kotuIsYap(id, k.id, k.rakibeYonelik && hedef ? { hedefRakipAd: hedef } : {}), "karanlik_is");
      }
    } catch { /* bekleme vb. */ }
  }
}

// ───────────────────────────── aile ─────────────────────────────
async function aileYonet(c: Ctx): Promise<void> {
  const { s, id, P } = c;
  const A = P.aile;
  if (s.etiketler.includes("hapiste") || s.etiketler.includes("yolculukta")) return;
  let d;
  try { d = await aileDurumGetir(id); } catch { return; }

  // Bekleyen aile talebi
  if (d.talep) await harca(c, () => aileTalebiKararlastir(id, Math.random() < A.talepKabul ? "kabul" : "ret"));

  // Evlilik
  if (!s.es_adi) {
    const yasUygun = s.yas >= A.evlilikMinYas && A.evlenme !== "hic";
    if (d.sevgili && yasUygun) {
      if (d.sevgili.darildi) await harca(c, () => sevgiliGonulAl(id));
      else if (d.sevgili.bar >= 65) await harca(c, () => sevgiliTeklifEt(id), "sevgili_teklif");
    } else if (yasUygun && d.mantik.acik && d.mantik.adaylar.length && !d.sevgili && !s.aktif_tanisma) {
      let idx = 0;
      if (A.evlenme === "kurnaz") idx = d.mantik.adaylar.reduce((b, a, i, arr) => (a.meslekBonusu > arr[b].meslekBonusu ? i : b), 0);
      else if (A.evlenme === "erken") idx = Math.max(0, d.mantik.adaylar.findIndex((a) => a.grup === "genc"));
      const teklifSec = d.mantik.teklifSecenekleri.find((t) => t.hediye === A.hediye) ?? d.mantik.teklifSecenekleri[0];
      if (teklifSec && serbest(c) >= teklifSec.maliyet && Math.random() < 0.7) {
        const r = await harca(c, () => mantikTeklifEt(id, idx, A.hediye), "mantik_teklif");
        if (r && (r as any).kabul) await harca(c, () => dugunYap(id, serbest(c) > 70 * enf(c) ? A.dugun : "ucuz"), "dugun");
      }
    }
  } else if (d.es) {
    // Evli: eş ilgisi
    const ihmal = d.es.ihmalYili;
    if (A.esZaman > 0 && ihmal >= A.esZaman) await harca(c, () => esEylemYap(id, "zaman_gecir"), "es_zaman");
    if (A.esHediye > 0 && c.yilIdx % A.esHediye === 0) {
      const h = A.hediye === "pahali" && serbest(c) > 40 * enf(c) ? "pahali" : "ucuz";
      if (serbest(c) > 12 * enf(c)) await harca(c, () => esEylemYap(id, "hediye_ver", h), "es_hediye");
    }
  }

  // Çocuklar
  if (A.cocukEtkilesim > 0 && d.cocuklar.some((k) => k.yasiyor) && c.yilIdx % A.cocukEtkilesim === 0) {
    const i = d.cocuklar.findIndex((k) => k.yasiyor && k.yas < 15);
    if (i >= 0) await harca(c, () => aileEtkilesimYap(id, Math.random() < 0.5 || serbest(c) < 15 * enf(c) ? "cocuk_oyna" : "cocuk_hediye", i), "cocuk_etk");
  }
  // 15+ çocuğu ekibe al
  const bekleyen = d.cocuklar.findIndex((k) => k.isDurumu === "bekliyor");
  if (bekleyen >= 0 && P.id !== "atilgan") await harca(c, () => cocukIseAl(id, bekleyen), "cocuk_ise");
  const red = d.cocuklar.findIndex((k) => k.isDurumu === "red_tepkisi");
  if (red >= 0) await harca(c, () => cocukRedTepkisi(id, red, P.id === "halk" || P.id === "usta" ? "sakin" : "ofke"));
}

// ───────────────────────────── yaşam tarzı + mağaza + sosyalleşme ─────────────────────────────
function kademe(kd: { maliyet: number }[], gelir: number, para: number, oran: number, min: number, max: number) {
  let sec = min;
  for (let i = min; i <= Math.min(max, kd.length - 1); i++) if (kd[i].maliyet * genfSabit <= gelir * oran || kd[i].maliyet * genfSabit * 8 <= para) sec = i;
  return sec;
}
let genfSabit = 1;
const KONUT_K = KONUTLAR.map((k) => ({ maliyet: k.kiraYillik }));
const YASAM_K = YASAM_SECENEKLERI.map((y) => ({ maliyet: y.maliyetYillik }));

async function yasamYonet(c: Ctx): Promise<void> {
  const { s, id, P } = c;
  const Y = P.yasam;
  if (s.etiketler.includes("hapiste") || s.etiketler.includes("yolculukta")) return;
  genfSabit = genf(c);
  let gelir = 10;
  try { gelir = Math.max(1, (await finansGetir(id)).maasYillik); } catch { /* yok say */ }

  // Konut / yaşam tarzı (taşınma ücreti yüzünden histerezis: yalnız yukarı, ve yalnız stok rezervi korunuyorsa)
  try {
    const ki = KONUTLAR.findIndex((k) => k.id === s.konut_id);
    const yi = YASAM_SECENEKLERI.findIndex((y) => y.id === s.yasam_secimi_id);
    const sikisik = c.sonDeltalar.length >= 2 && c.sonDeltalar.slice(-2).every((d) => d < 0) && s.para < rezervDepo(c) * 1.5;
    if (s.para < 0 || sikisik || serbest(c) < -rezervDepo(c) * 0.5) {
      if (ki > 1 || yi > 1) c.dusurmeYili = s.yil;
      if (ki > 1) await harca(c, () => konutDegistir(id, "mutevazi_yuva"));
      if (yi > 1) await harca(c, () => yasamSecimiDegistir(id, "sade_sofra"));
    } else if (serbest(c) > 0 && s.yil - c.dusurmeYili >= 8) {
      const hk = kademe(KONUT_K, gelir, s.para, Y.konutOran, Y.konut[0], Y.konut[1]);
      const hy = kademe(YASAM_K, gelir, s.para, Y.yasamOran, Y.yasam[0], Y.yasam[1]);
      if (hk > ki && KONUT_K[hk].maliyet * genf(c) * 3 < serbest(c)) await harca(c, () => konutDegistir(id, KONUTLAR[hk].id), "konut");
      if (hy > yi) await harca(c, () => yasamSecimiDegistir(id, YASAM_SECENEKLERI[hy].id));
      // alt sınırın altındaysa (ör. başta idx 1 < min) tamamla
      if (ki < Y.konut[0]) await harca(c, () => konutDegistir(id, KONUTLAR[Y.konut[0]].id), "konut");
      if (yi < Y.yasam[0]) await harca(c, () => yasamSecimiDegistir(id, YASAM_SECENEKLERI[Y.yasam[0]].id));
    }
  } catch { /* yok say */ }

  // Sağlık: şifa al / kullan
  try {
    if (s.saglik < Math.max(Y.sifaEsik, 40)) {
      const kat = await magazaConfigGetir(id);
      const butce = s.saglik < 35 ? s.para * 0.9 : Math.max(0, serbest(c)) * 0.5;
      const adaylar = kat.filter((x) => x.kategori === "sifa" && !x.kilitli && x.fiyat <= butce).sort((a, b) => a.fiyat - b.fiyat);
      if (adaylar.length) {
        const secilen = s.saglik < 40 || Y.sifaEsik >= 65 ? adaylar[adaylar.length - 1] : adaylar[0];
        await harca(c, () => magazadanSatinAl(id, secilen.id), "sifa");
      }
    }
    const sifalar = s.magaza_envanteri.filter((e) => e.kategori === "sifa");
    if (sifalar.length && s.saglik < Math.max(Y.sifaEsik, 45)) await harca(c, () => envanterEsyasiKullan(id, sifalar[0].id), "sifa_kullan");
  } catch { /* yok say */ }

  // Lüks / sanat / binek
  try {
    if (Y.luks || Y.sanatBinek) {
      const kat = await magazaConfigGetir(id);
      const izinli = (k: string) => (k === "luks" ? Y.luks : Y.sanatBinek && (k === "sanat" || k === "binek"));
      const adaylar = kat.filter((x) => izinli(x.kategori) && !x.sahipMi && !x.kilitli && x.fiyat * Y.luksNakitKat <= Math.max(0, serbest(c))).sort((a, b) => b.fiyat - a.fiyat);
      if (adaylar.length) await harca(c, () => magazadanSatinAl(id, adaylar[0].id), "luks");
    }
  } catch { /* yok say */ }

  // Sosyalleşme: mekân gez, olayı çöz (alkolsüz tercih)
  try {
    if (Math.random() < Y.sosyalSans) {
      const yerler = (await sosyallesmeYerleriGetir(id)).filter((y) => !y.kilitli);
      const ayik = yerler.filter((y) => !y.alkolluMu);
      const havuz = ayik.length ? ayik : yerler;
      if (havuz.length && serbest(c) > 0) {
        const gidis: any = await harca(c, () => sosyallesmeYerineGit(id, rastgele(havuz).id), "sosyal");
        if (gidis && !gidis.tanismaBasladi) {
          const sen = await senaryoUret(id);
          const idx = secenekSec(sen.secenekler, P, sen.kategori, s);
          await harca(c, () => sosyallesmeOlayCoz(id, idx));
        }
      }
    }
  } catch { /* yok say */ }
}

// ───────────────────────────── bir ömür ─────────────────────────────
interface Kayit {
  persona: string; meslek: string; cag: Cag; bolge: string;
  olumYasi: number; olumNedeni: string; skor: number; servet: number; paraSon: number;
  rutbe: number; paySon: number; payOrt: number; payMaks: number;
  eliKalanOrt: number; eliKalanOrtYatirimOncesi: number; dukkanNetOrt: number;
  batti: boolean; iflasYasi: number; oncesiEli: number; oncesiEliYatirimOncesi: number; oncesiPay: number; oncesiYil: number; krediYili: number; calisanOrt: number;
  aranmaMaks: number; hapis: boolean; evli: boolean; cocuk: number; mutlulukSon: number; sagliksonOrt: number;
  dilim: { eliKalan: number; yatirimOncesi: number; pay: number; dukkan: number; yil: number }[];
  sayac: Record<string, number>;
  hata: boolean;
}
const DILIM: [number, number][] = [[15, 25], [25, 35], [35, 45], [45, 55], [55, 100]];

function ablasyon(P: Persona): Persona {
  const a = (process.env.SIM_ABLASYON ?? "").split(",");
  if (!a.some(Boolean) || P.id !== "kurnaz") return P;
  const q: Persona = JSON.parse(JSON.stringify({ ...P, puan: 0, isletme: { ...P.isletme, hatTavan: 0, hatSira: 0, calisanHedef: 0, rezerv: 0, cemaatSira: 0 } }));
  q.puan = P.puan; q.isletme.hatTavan = P.isletme.hatTavan; q.isletme.hatSira = P.isletme.hatSira; q.isletme.calisanHedef = P.isletme.calisanHedef; q.isletme.rezerv = P.isletme.rezerv; q.isletme.cemaatSira = P.isletme.cemaatSira;
  if (a.includes("karanliksiz")) q.siyaset.karanlik = 0;
  if (a.includes("yoneticisiz")) q.siyaset.yonetici = "yok";
  if (a.includes("rusvetsiz")) q.siyaset.rusvet = false;
  if (a.includes("normalfiyat")) q.isletme.fiyat = "normal";
  if (a.includes("kefaretsiz")) q.siyaset.kefaretEsik = 101;
  return q;
}

async function birOmur(P0: Persona, meslek: string, cag: Cag): Promise<Kayit> {
  const P = ablasyon(P0);
  const bolge = rastgele(BOLGE[cag]);
  let s = await yeniOyun(cag, bolge, "kasaba", undefined, "tr", undefined, "ilerle");
  const id = s.id;
  await mesleğiAta(id, meslek);
  s = await stateGetir(id);
  // Karşı-olgusal deneyler (yalnız teşhis için): SIM_KAPAT=vergi,hirsiz,saldiri
  const kapat = (process.env.SIM_KAPAT ?? "").split(",");
  if (kapat.includes("vergi")) s.ekstra_vergi_sonraki_yil = 99999;
  if (s.isletme && kapat.includes("hirsiz")) (s.isletme as any).hirsizlik_sonraki_yil = 99999;
  if (kapat.includes("saldiri")) (s as any).rakip_sonraki_saldiri_yili = 99999;
  const c: Ctx = { id, s, P, yilIdx: 0, harcama: 0, sonDeltalar: [], dusurmeYili: -99, sayac: {} };

  const ornek: { yas: number; delta: number; yatirimOncesi: number; pay: number; dukkan: number; krediVar: boolean; ekip: number; saglik: number; aranma: number }[] = [];
  let iflasYasi = -1;
  let sonYil = s.yil, sonPara = s.para, sonYonetimYili = -1, hata = false, batti = false, aranmaMaks = 0, hapis = false, payMaks = 0, krediYili = 0;

  try {
    for (let g = 0; g < MAKS_ITER && s.aktif; g++) {
      // yıl örneklemesi
      if (s.yil !== sonYil) {
        const yy = Math.max(1, s.yil - sonYil);
        const delta = (s.para - sonPara) / yy;
        const pay = pazarPayiHesapla(s) * 100;
        ornek.push({ yas: s.yas, delta, yatirimOncesi: delta + c.harcama / yy, pay, dukkan: s.isletme?.son_dokum?.net ?? 0, krediVar: !!s.kredi, ekip: s.ekip.length, saglik: s.saglik, aranma: s.suc_seviyesi });
        if (process.env.SIM_TRACE) { const d0 = s.isletme?.son_dokum; console.log(`  yaş ${s.yas} para ${s.para.toFixed(0)} Δ${delta.toFixed(1)} dükkân ${(d0?.net ?? 0).toFixed(0)} satış ${(d0?.satis ?? 0).toFixed(0)} alım ${(d0?.alim ?? 0).toFixed(0)} maaş ${(d0?.calisanMaasi ?? 0).toFixed(0)} vergi ${(d0?.vergi ?? 0).toFixed(0)} hasar ${(d0?.nakitHasar ?? 0).toFixed(0)} pay ${pay.toFixed(1)} müşt ${s.meslek_musteri.toFixed(0)}/${s.pazar_musteri.toFixed(0)} sağlık ${s.saglik.toFixed(0)} uyarı ${(d0?.uyarilar ?? []).map((u) => u.kod).join(',')} konut ${s.konut_id} yaşam ${s.yasam_secimi_id}`); }
        c.sonDeltalar.push(delta); if (c.sonDeltalar.length > 4) c.sonDeltalar.shift();
        payMaks = Math.max(payMaks, pay);
        aranmaMaks = Math.max(aranmaMaks, s.suc_seviyesi);
        if (s.kredi) krediYili++;
        if (s.para < -30) { batti = true; if (iflasYasi < 0) iflasYasi = s.yas; }
        if (s.etiketler.includes("hapiste")) hapis = true;
        sonYil = s.yil; sonPara = s.para; c.harcama = 0; c.yilIdx = s.yas - 15;
      }
      await bekleyenleriCoz(c);
      if (!s.aktif) break;
      if (s.yil !== sonYonetimYili && !(s.urun_secim_bekliyor)) {
        sonYonetimYili = s.yil;
        await isletmeYonet(c);
        await siyasetYonet(c);
        await aileYonet(c);
        await yasamYonet(c);
        if (!s.aktif) break;
      }
      s = await stateGetir(id); c.s = s;
      if (s.olay_bekliyor) {
        const sen = await senaryoUret(id);
        const idx = secenekSec(sen.secenekler, P, sen.kategori, s);
        let r: any = await secimUygula(id, idx);
        if (r?.ara_tepki) r = await secimUygula(id, tepkiSec(s, P));
      } else {
        await yilGec(id);
      }
      s = await stateGetir(id); c.s = s;
    }
  } catch (err) {
    hata = true;
    if (process.env.SIM_HATA) console.error(`  [HATA] ${P.id}/${cag}/${meslek}: ${(err as Error).message}`);
  }

  const son = await stateGetir(id);
  const yetis = ornek.filter((o) => o.yas >= 18);
  const oncesi = yetis.filter((o) => iflasYasi < 0 || o.yas < iflasYasi);
  const dilim = DILIM.map(([a, b]) => {
    const x = ornek.filter((o) => o.yas >= a && o.yas < b);
    return { eliKalan: ort(x.map((o) => o.delta)), yatirimOncesi: ort(x.map((o) => o.yatirimOncesi)), pay: ort(x.map((o) => o.pay)), dukkan: ort(x.map((o) => o.dukkan)), yil: x.length };
  });
  return {
    persona: P.id, meslek, cag, bolge,
    olumYasi: son.yas, olumNedeni: (son.olum_nedeni ?? (son.aktif ? "hayatta" : "?")).slice(0, 60),
    skor: Math.round(hesaplaSkor(son)), servet: Math.round(netServetHesapla(son) * 10) / 10, paraSon: Math.round(son.para * 10) / 10,
    rutbe: son.rutbe_seviye, paySon: pazarPayiHesapla(son) * 100, payOrt: ort(yetis.map((o) => o.pay)), payMaks,
    eliKalanOrt: ort(yetis.map((o) => o.delta)), eliKalanOrtYatirimOncesi: ort(yetis.map((o) => o.yatirimOncesi)), dukkanNetOrt: ort(yetis.map((o) => o.dukkan)),
    batti, iflasYasi, oncesiEli: ort(oncesi.map((o) => o.delta)), oncesiEliYatirimOncesi: ort(oncesi.map((o) => o.yatirimOncesi)), oncesiPay: ort(oncesi.map((o) => o.pay)), oncesiYil: oncesi.length, krediYili, calisanOrt: ort(yetis.map((o) => o.ekip)),
    aranmaMaks, hapis, evli: !!son.es_adi || son.etiketler.includes("medeni:evli") || (son.cocuk_sayisi ?? 0) > 0,
    cocuk: son.cocuk_sayisi ?? 0, mutlulukSon: son.mutluluk, sagliksonOrt: ort(yetis.map((o) => o.saglik)),
    dilim, sayac: c.sayac, hata,
  };
}

// ───────────────────────────── ana ─────────────────────────────
async function main() {
  const istenen = (process.env.SIM_PERSONA ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  const personalar = istenen.length ? PERSONALAR.filter((p) => istenen.includes(p.id)) : PERSONALAR;
  const tum: Kayit[] = [];
  const t0 = Date.now();
  for (const P of personalar) {
    for (const cag of CAGLAR_SIM) {
      for (const meslek of MESLEKLER_SIM) {
        for (let i = 0; i < N; i++) {
          tum.push(await birOmur(P, meslek, cag));
          if ((i + 1) % 10 === 0 || i === N - 1) {
            const k = tum[tum.length - 1];
            console.log(`[${P.id}] ${cag} / ${meslek}: ${i + 1}/${N} (${((Date.now() - t0) / 1000).toFixed(0)}sn) son: yaş ${k.olumYasi}, pay %${k.paySon.toFixed(1)}, para ${k.paraSon}`);
          }
        }
      }
    }
  }
  const cikti = process.env.SIM_CIKTI ?? path.join(__dirname, "simulateOyuncuModelleri.sonuc.json");
  fs.writeFileSync(cikti, JSON.stringify(tum), "utf-8");
  console.log(`Yazıldı: ${cikti} (${tum.length} ömür, ${((Date.now() - t0) / 1000).toFixed(0)}sn, hata: ${tum.filter((k) => k.hata).length})`);
}
main().catch((e) => { console.error(e); process.exit(1); });
