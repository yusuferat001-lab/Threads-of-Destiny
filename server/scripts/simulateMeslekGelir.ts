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
 * Çıktı: konsol raporu + scripts/simulateMeslekGelir.sonuc.json
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
  isletmeUrunSec,
  isletmeOgretiSec,
  isletmeKararVer,
  isletmeYatirimYap,
  isletmeCalisanAl,
  isletmeDepoOtomatik,
  birlikDoktrinSec,
  birlikSavasKarariGetir,
  birlikSavasKarariVer,
  krediConfigGetir,
  krediAlEndpoint,
  birlikTechizatSec,
  yonetimTalebiKararlastir,
} from "../src/game/gameEngine";
import { isletmeProfiliGetir, yatirimTanimiGetir } from "../src/data/meslekProfilleri";
import { hatSlotSayisi, calisanLimiti, adaylariGerekirseYenile, depoKapasitesi, urunSecimiBekliyorMu } from "../src/game/isletme";
import { ogretiBekleyenSeviye, faaliyetSlotSayisi, faaliyetKilitliMi } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import { FAALIYETLER } from "../src/data/cemaat";
import { doktrinBekleyenSeviye } from "../src/game/birlik";
import { catismaIzleyici, CatismaIzi } from "../src/game/birlikYil";
import { doktrinSecenekleri } from "../src/data/birlik";
import { yolDali } from "../src/game/birlik";
import { giderEnflasyonCarpani, isletmeBaglami } from "../src/game/stateManager";
import { birlikHesapla, erSayisi, kislaLimiti, gorevSlotSayisi, gucHesapla, komutaLimiti } from "../src/game/birlik";
import { GOREVLER } from "../src/data/birlik";
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
// MESLEK GELİR ANALİZİ — tur başına nakit akışı, yaşa yayılır
// ---------------------------------------------------------------------------

interface TurKaydi {
  yasBas: number;
  yasSon: number;
  maas: number;
  olay: number;
  mulk: number;
  gider: number;
  er: number;
  guc: number;
  savas: boolean;
}
interface OyunIzi {
  cag: Cag;
  meslek: string;
  olumYasi: number;
  tur: TurKaydi[];
  sonPara: number;
  hataMi: boolean;
  sonRutbe: number;
  /** Olayla ilan edilen (buyuk_savas kaydı olmayan) savaşta geçen yıl; bitişi olmayan savaş tutarsızlığını ölçer. */
  takiliSavasYili: number;
}


// ---------------------------------------------------------------------------
// MESLEK YÖNETİMİ — "ilgili ama sıradan" oyuncu: bekleyen seçimleri yapar, işletmeyi dengeli yönetir
// ---------------------------------------------------------------------------
async function meslekYonet(id: string): Promise<void> {
  let state = await stateGetir(id);
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  // 1) Zorunlu bekleyen seçimler
  try {
    if (urunSecimiBekliyorMu(state) && profil?.baslangicUrunleri?.length) await isletmeUrunSec(id, profil.baslangicUrunleri[0].hat);
  } catch { /* yok say */ }
  for (let g = 0; g < 8; g++) {
    state = await stateGetir(id);
    const og = ogretiBekleyenSeviye(state);
    if (state.meslek === "Din Adamı" && og !== null) {
      const sec = ogretiSecenekleri(og);
      const o = sec.find((x) => !x.fanatik) ?? sec[0];
      try { await isletmeOgretiSec(id, o.id); } catch { break; }
    } else break;
  }
  for (let g = 0; g < 8; g++) {
    state = await stateGetir(id);
    const dk = state.meslek === "Asker" ? doktrinBekleyenSeviye(state) : null;
    if (dk === null) break;
    let ok = false;
    for (const d of doktrinSecenekleri(dk, yolDali(state))) {
      try { await birlikDoktrinSec(id, d.id); ok = true; break; } catch { /* sıradaki */ }
    }
    if (!ok) break;
  }
  for (let g = 0; g < 12; g++) {
    state = await stateGetir(id);
    if (state.meslek !== "Asker") break;
    let d: any = null;
    try { d = await birlikSavasKarariGetir(id); } catch { break; }
    if (!d || !d.secenekler?.length) break;
    let secim = d.secenekler[0].id;
    if (d.adim === "seferberlik") secim = d.secenekler.find((o: any) => o.id === "dengeli")?.id ?? secim;
    if (d.adim === "ikmal") secim = d.secenekler.find((o: any) => o.id === (process.env.SIM_IKMAL ?? "yagma_orta"))?.id ?? secim;
    try { await birlikSavasKarariVer(id, secim); } catch { break; }
  }
  state = await stateGetir(id);
  if (state.yonetim_talep?.tur === "vergi") {
    try { await yonetimTalebiKararlastir(id, "kabul"); } catch { try { await yonetimTalebiKararlastir(id, "ret"); } catch { /* yok say */ } }
  }
  state = await stateGetir(id);
  // Nakit sıkışırsa en küçük tefeci kredisi (oyuncu da böyle yapar); taksit beklenen yıllık neti aşmıyorsa.
  if (!state.kredi && state.para < 5 * giderEnflasyonCarpani(state) && state.isletme) {
    try {
      const net = state.isletme.birlik ? birlikHesapla(state, isletmeBaglami(state)).net : state.isletme.son_dokum?.net ?? 0;
      const cfg = await krediConfigGetir(id);
      const t = [...cfg.teklifler].sort((x, y) => x.tutar - y.tutar)[0];
      if (t && t.taksit <= 0.6 * Math.max(0, net)) await krediAlEndpoint(id, t.id);
    } catch { /* alınamadı */ }
  }
  state = await stateGetir(id);
  if (!state.isletme || !profil || state.etiketler.includes("yolculukta") || state.etiketler.includes("hapiste")) return;
  const is = state.isletme;
  const enf = giderEnflasyonCarpani(state);

  // 2) Dükkân / cemaat yönetimi (Tüccar, Zanaatkâr, Din Adamı)
  if (profil.mod === "cemaat") {
    try {
      const acilabilir = FAALIYETLER.filter((f) => !faaliyetKilitliMi(state, f.id)).sort((a, b) => b.gelirBirimi * (1 - b.masraf) - a.gelirBirimi * (1 - a.masraf));
      const hedef = new Set(acilabilir.slice(0, faaliyetSlotSayisi(state)).map((f) => f.id));
      const karar = is.hatlar.map((h) => ({ id: h.id, acik: hedef.has(h.id) }));
      await isletmeKararVer(id, karar.filter((k) => !k.acik).concat(karar.filter((k) => k.acik)));
    } catch { /* yok say */ }
  } else if (profil.mod !== "birlik") {
    try { await isletmeDepoOtomatik(id, true, 75); } catch { /* yok say */ }
    try {
      const slot = hatSlotSayisi(state);
      const adaylar = profil.hatlar.filter((h) => h.minRutbe <= state.rutbe_seviye).sort((a, b) => b.talepTabani * (b.birimFiyat - b.birimMaliyet) - a.talepTabani * (a.birimFiyat - a.birimMaliyet));
      const hedef = new Set(adaylar.slice(0, slot).map((h) => h.id));
      const karar = is.hatlar.map((h) => ({ id: h.id, acik: hedef.has(h.id), fiyat: "normal" as const }));
      await isletmeKararVer(id, karar.filter((k) => !k.acik).concat(karar.filter((k) => k.acik)));
    } catch { /* yok say */ }
  } else {
    await askerYonet(id);
    state = await stateGetir(id);
  }

  // 3) Çalışan + yatırım (nakit rezervi korunarak)
  const askerMi = profil.mod === "birlik";
  const rezerv = askerMi ? (ASKER_V === "v0" ? 20 + erSayisi(state) * 0.25 : 6) * enf : (profil.mod === "cemaat" ? 12 : depoKapasitesi(is) * 0.8 + 18) * enf;
  try {
    adaylariGerekirseYenile(state);
    const limit = calisanLimiti(state);
    const oncelik = askerMi ? ["musteri", "taarruz", "guvenlik", "savunma", "kesif"] : ["ana", "guvenlik", "musteri", "maliyet"];
    while (state.ekip.length < limit && is.adaylar.length > 0) {
      const a = [...is.adaylar].sort((x, y) => oncelik.indexOf(x.rolTuru) - oncelik.indexOf(y.rolTuru) || y.yetenek + y.sadakat - (x.yetenek + x.sadakat))[0];
      const toplamMaas = state.ekip.reduce((t, u) => t + u.maas, 0);
      if (state.para < rezerv + a.maas_taban * enf * 3) break;
      if ((is.son_dokum?.net ?? 0) - toplamMaas - a.maas_taban * enf < 15 * enf) break;
      await isletmeCalisanAl(id, a.id);
    }
  } catch { /* yok say */ }
  const sira = askerMi ? (ASKER_V === "v0" ? ["kisla", "devsirme", "revir", "karakol"] : ["devsirme", "kisla", "revir", "karakol"]) : profil.mod === "cemaat" ? ["bina", "okul", "asevi", "tanitim", "guvenlik"] : ["depo", "tezgah", "dukkan", "vitrin", "guvenlik", "tanitim", "kervan"];
  for (const yid of sira) {
    const t = yatirimTanimiGetir(profil, yid);
    if (!t) continue;
    const k = is.yatirimlar[yid] ?? 0;
    if (k >= t.fiyatlar.length) continue;
    if (yid === "kisla" && ASKER_V === "v0" && erSayisi(state) < komutaLimiti(state) * 0.75) continue;
    if (yid === "kisla" && erSayisi(state) < komutaLimiti(state) * 0.75) continue;
    if (yid === "depo" && profil.mod !== "cemaat" && !askerMi) {
      const talep = is.hatlar.filter((h) => h.acik).reduce((acc, h) => acc + (h.son_talep || 0), 0);
      if (talep < depoKapasitesi(is) * 0.9) continue;
    }
    if (state.para > rezerv + t.fiyatlar[k] * enf) {
      try { await isletmeYatirimYap(id, yid); } catch { /* yok say */ }
    }
  }
}

/** Asker ("dengeli" bot, simulateBirlik.ts ile aynı mantık): görev + talim + teçhizat; yatırım/subay ortak bloktan. */
const ASKER_V = process.env.SIM_ASKER ?? "v0"; // v0 = simulateBirlik 'dengeli' kopyası; v1 = devşirme öncelikli + düşük rezerv; v2 = v1 + hafif talim
async function askerYonet(id: string): Promise<void> {
  const state = await stateGetir(id);
  const b = state.isletme?.birlik;
  if (!b || state.ulke.savasta) return;
  const genf = giderEnflasyonCarpani(state);
  const er = erSayisi(state);
  const rezerv = (20 + er * 0.25) * genf;
  try {
    const slot = gorevSlotSayisi(state);
    const guc = gucHesapla(state).guc;
    const secilen = GOREVLER.filter((g) => !g.yalnizSavas && guc / Math.max(1, slot) >= g.minGuc)
      .sort((x, y) => y.erBasi - x.erBasi).slice(0, slot).map((g) => g.id);
    await isletmeKararVer(id, [], undefined, { gorevler: secilen.length ? secilen : ["devriye"], talim: ASKER_V === "v2" ? "hafif" : "orta", ...(state.rutbe_seviye >= 2 ? { ganimet_payi: "dengeli" } : {}) });
  } catch { /* uygun görev yok */ }
  try {
    if (b.hedef_kalite === "dusuk" && state.para > rezerv * 4 + er * 0.7 * genf) await birlikTechizatSec(id, "orta");
  } catch { /* kilitli */ }
}


// SIM_DOKUM=1: Asker gelir/gider kalemlerinin 15-65 yaş (50 yıl) ortalama dağılımı (turun son yılı × tur yılı; ≈ örnekleme).
const DOKUM: Record<string, number> = {};
let dokumYil = 0;
const DOKUM_OMURLER: Record<string, number>[] = [];
const DOKUM_BOLUM: Record<string, { kalem: Record<string, number>; yil: number }> = { "barış, er≥100": { kalem: {}, yil: 0 }, "savaş, er≥100": { kalem: {}, yil: 0 } };
function dokumEkle(state: CharacterState, na: any, yil: number, omur: Record<string, number>, savasta: boolean): void {
  const bolum = erSayisi(state) >= 100 ? DOKUM_BOLUM[savasta ? "savaş, er≥100" : "barış, er≥100"] : null;
  const d = state.isletme?.son_dokum as any;
  const bd = d?.birlik;
  if (!bd || !na) return;
  const ekle = (k: string, v: number) => { const x = (Number.isFinite(v) ? v : 0) * yil; DOKUM[k] = (DOKUM[k] ?? 0) + x; omur[k] = (omur[k] ?? 0) + x; if (bolum) bolum.kalem[k] = (bolum.kalem[k] ?? 0) + x; };
  const esir = d.satis - bd.sold - bd.gorevGeliri - bd.kaleGeliri - (bd.ganimetPara - bd.erPayi);
  ekle("G sabit maaş + asker başı ödenek (sold)", bd.sold);
  ekle("G görev geliri", bd.gorevGeliri);
  ekle("G ganimet (görev+barış çatışması+savaş zaferi, brüt)", bd.ganimetPara - bd.yagmaPara);
  ekle("G yağma (brüt)", bd.yagmaPara);
  ekle("G kale geliri", bd.kaleGeliri);
  ekle("G esir geliri", Math.max(0, esir));
  ekle("G olay geliri", na.olayGeliri ?? 0);
  ekle("G mülk net getiri", Math.max(0, na.mulkNet ?? 0));
  ekle("g er payı (ganimetten askere)", bd.erPayi);
  ekle("g er masrafı", bd.erMasrafi);
  ekle("g erzak", bd.erzak);
  ekle("g teçhizat bakımı", bd.techizatBakimi);
  ekle("g kışla/yapı bakımı", d.depoMasrafi - bd.techizatBakimi);
  ekle("g talim", (d.alim ?? 0) - bd.erMasrafi - bd.erzak - bd.tedaviGideri);
  ekle("g yaralı tedavi", bd.tedaviGideri);
  ekle("g kiralık ordu", bd.kiralikMasrafi);
  ekle("g subay maaşı", d.calisanMaasi);
  ekle("g yeni er maliyeti/ekstra", d.ekstraGider);
  ekle("g nakit hasarı (olay/yağma vb.)", d.nakitHasar);
  ekle("g yaşam gideri", na.giderYasam ?? 0);
  ekle("g konut/kira", na.giderKonut ?? 0);
  ekle("g faiz", na.faiz ?? 0);
  ekle("g olay gideri", na.olayGideri ?? 0);
  dokumYil += yil;
  if (bolum) bolum.yil += yil;
}
function dokumOmurAgirlikli(): void {
  const kalemler = Array.from(new Set(DOKUM_OMURLER.flatMap((o) => Object.keys(o))));
  const pay: Record<string, number[]> = {};
  for (const o of DOKUM_OMURLER) {
    const tG = Object.entries(o).filter(([k]) => k[0] === "G").reduce((t, [, v]) => t + v, 0);
    const tg = Object.entries(o).filter(([k]) => k[0] === "g").reduce((t, [, v]) => t + v, 0);
    if (tG <= 0 || tg <= 0) continue;
    for (const k of kalemler) (pay[k] ??= []).push(((o[k] ?? 0) / (k[0] === "G" ? tG : tg)) * 100);
  }
  console.log(`\n[DÖKÜM, ÖMÜR AĞIRLIKLI] her ömrün kendi gelir/gider payı, ömürler arası ortalama (${DOKUM_OMURLER.length} ömür; zengin ordular ortalamayı domine etmez)`);
  for (const t of ["G", "g"]) {
    console.log(t === "G" ? "  GELİR" : "  GİDER");
    for (const k of kalemler.filter((k) => k[0] === t).sort((a, b) => ortala(pay[b] ?? [0]) - ortala(pay[a] ?? [0]))) console.log(`    ${k.slice(2).padEnd(58)} %${y2(ortala(pay[k] ?? [0]))}`);
  }
}
function dokumBolumYazdir(): void {
  for (const [ad, { kalem, yil }] of Object.entries(DOKUM_BOLUM)) {
    if (!yil) continue;
    const topG = Object.entries(kalem).filter(([k]) => k[0] === "G").reduce((t, [, v]) => t + v, 0);
    const topg = Object.entries(kalem).filter(([k]) => k[0] === "g").reduce((t, [, v]) => t + v, 0);
    console.log(`\n[DÖKÜM ${ad.toUpperCase()}] ${yil.toFixed(0)} ömür-yılı: gelir ${y2(topG / yil)}, gider ${y2(topg / yil)}, net ${y2((topG - topg) / yil)} /yıl`);
    for (const t of ["G", "g"]) {
      console.log(t === "G" ? "  GELİR" : "  GİDER");
      for (const [k, v] of Object.entries(kalem).filter(([k]) => k[0] === t).sort((a, b) => b[1] - a[1]).slice(0, 9)) console.log(`    ${k.slice(2).padEnd(58)} ${String(y2(v / yil)).padStart(8)}/yıl  %${y2((v / (t === "G" ? topG : topg)) * 100)}`);
    }
  }
}
function dokumYazdir(): void {
  const topG = Object.entries(DOKUM).filter(([k]) => k[0] === "G").reduce((t, [, v]) => t + v, 0);
  const topg = Object.entries(DOKUM).filter(([k]) => k[0] === "g").reduce((t, [, v]) => t + v, 0);
  console.log(`\n[DÖKÜM] Asker, 15-65 yaş, yıl başına ortalama (toplam ${dokumYil.toFixed(0)} ömür-yılı): gelir ${y2(topG / dokumYil)}, gider ${y2(topg / dokumYil)}`);
  for (const t of ["G", "g"]) {
    console.log(t === "G" ? "  GELİR" : "  GİDER");
    for (const [k, v] of Object.entries(DOKUM).filter(([k]) => k[0] === t).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${k.slice(2).padEnd(58)} ${String(y2(v / dokumYil)).padStart(8)}/yıl  %${y2((v / (t === "G" ? topG : topg)) * 100)}`);
    }
  }
}

const CATISMALAR: CatismaIzi[] = [];
catismaIzleyici.fn = (k) => { CATISMALAR.push(k); };
const savasTutarsizGorulen = new Set<string>();
async function birOyun(cag: Cag, meslek: string): Promise<OyunIzi> {
  const bolge = rastgele(BOLGELER_BY_CAG[cag]);
  const yerlesim = rastgele(YERLESIMLER).id;
  let state = await yeniOyun(cag, bolge, yerlesim);
  await mesleğiAta(state.id, meslek);
  const id = state.id;
  const sayaclar: Sayaclar = {
    yatirimSayisi: 0, mulkSayisi: 0, magazaSifaSayisi: 0, magazaLuksSayisi: 0, zarSayisi: 0,
    sosyallesmeSayisi: 0, kendiIsHarcanan: 0, mulkHarcanan: 0, enYuksekPara: state.para,
  };
  const tur: TurKaydi[] = [];
  const omurDokum: Record<string, number> = {};
  let takiliSavasYili = 0;
  let hataMi = false;
  let guard = 0;
  try {
    while (state.aktif && guard < MAX_TUR_GUARD) {
      guard++;
      await meslekYonet(id);
      await yanEylemler(id, state, sayaclar);
      state = await stateGetir(id);
      if (!state.aktif) break;
      const yasBas = state.yas;
      const savasBas = state.ulke.savasta;
      const senaryo = await senaryoUret(id);
      const idx = secenekSec(senaryo.secenekler, state);
      let sonuc: any = await secimUygula(id, idx);
      if (sonuc && sonuc.ara_tepki) sonuc = await secimUygula(id, tepkiSec(state));
      state = await stateGetir(id);
      if (process.env.SIM_SAVAS_KONTROL && state.ulke.savasta !== !!state.buyuk_savas && !savasTutarsizGorulen.has(id)) {
        savasTutarsizGorulen.add(id);
        console.log(`[TUTARSIZ] ${cag}/${meslek} yas ${state.yas} yil ${state.yil} ulke.savasta=${state.ulke.savasta} buyuk_savas=${JSON.stringify(state.buyuk_savas)} sonDonem=${JSON.stringify(state.ulke.donem)?.slice(0, 80)} sonBitis=${state.son_buyuk_savas_bitis_yili} olay=${(senaryo as any)?.olay_basligi}`);
      }
      if (state.ulke.savasta && !state.buyuk_savas) takiliSavasYili += Math.max(0, state.yas - yasBas);
      const na = sonuc?.nakitAkisi;
      if (process.env.SIM_DOKUM && meslek === "Asker" && yasBas < 65) dokumEkle(state, na, Math.max(1, Math.round(state.yas - yasBas)), omurDokum, savasBas);
      if (process.env.SIM_DEBUG && state.isletme?.birlik) {
        const h = birlikHesapla(state, isletmeBaglami(state));
        console.log(`yas ${state.yas.toFixed(0)} r${state.rutbe_seviye} er ${erSayisi(state)}/${kislaLimiti(state)} para ${state.para.toFixed(0)} | sold ${h.sold.toFixed(0)} gorev ${h.gorevGeliri.toFixed(0)} gan ${h.ganimetNet.toFixed(0)} | erM ${h.erMasrafi.toFixed(0)} erzak ${h.erzak.toFixed(0)} kisla ${h.kislaBakim.toFixed(0)} tech ${h.techizatBakim.toFixed(0)} talim ${h.talimMasrafi.toFixed(0)} yarali ${h.yaraliGideri.toFixed(0)} | net ${h.net.toFixed(0)} | nakit: maas ${na?.maasBrut?.toFixed(0)} yasam ${na?.giderYasam?.toFixed(0)} konut ${na?.giderKonut?.toFixed(0)} ekip ${na?.giderEkip?.toFixed(0)} faiz ${na?.faiz?.toFixed(0)} svVergi ${na?.savasVergisi?.toFixed(0)} olay ${((na?.olayGeliri ?? 0) - (na?.olayGideri ?? 0)).toFixed(0)} diger ${na?.digerNet?.toFixed(0)} savas ${state.ulke.savasta} yil ${state.yil} bs ${state.buyuk_savas ? "VAR" : "yok"} | gorevler ${state.isletme?.birlik?.gorevler} guc ${gucHesapla(state).guc.toFixed(1)} bonus ${gucHesapla(state).bonuslar.map((x) => x.kod + ":" + x.deger.toFixed(2)).join(",")} moral ${state.isletme?.birlik?.moral} etk ${state.etiketler.filter((e) => /savas|cephe|tarihi/.test(e)).join(",")}`);
      }
      if (na) {
        const gider = (na.olayGideri ?? 0) + (na.giderYasam ?? 0) + (na.giderKonut ?? 0) + (na.giderEkip ?? 0) +
          (na.giderEvcil ?? 0) + (na.savasVergisi ?? 0) + (na.faiz ?? 0) + (na.envanterBakim ?? 0) +
          (na.zenginlikSizinti ?? 0) + (na.rakipSoygun ?? 0) + Math.max(0, -(na.mulkNet ?? 0)) + Math.max(0, -(na.digerNet ?? 0));
        tur.push({
          yasBas, yasSon: state.yas,
          maas: na.maasBrut ?? 0,
          olay: (na.olayGeliri ?? 0) + Math.max(0, na.digerNet ?? 0),
          mulk: Math.max(0, na.mulkNet ?? 0),
          gider,
          er: state.isletme?.birlik ? erSayisi(state) : 0,
          guc: state.isletme?.birlik?.guc ?? 0,
          savas: savasBas,
        });
      }
    }
  } catch (err) {
    hataMi = true;
    console.error(`  [HATA] ${cag}/${meslek}: ${(err as Error).message}`);
  }
  if (process.env.SIM_DOKUM && Object.keys(omurDokum).length) DOKUM_OMURLER.push(omurDokum);
  const son = await stateGetir(id);
  return { cag, meslek, olumYasi: son.yas, tur, sonPara: son.para, hataMi, takiliSavasYili, sonRutbe: son.rutbe_seviye };
}

/** Her turun gelirini, kapsadığı yaş yıllarına eşit yayar -> yıl başına dizi. */
function yilaYay(iz: OyunIzi): { yas: number; maas: number; olay: number; mulk: number; gider: number }[] {
  const out: { yas: number; maas: number; olay: number; mulk: number; gider: number }[] = [];
  for (const t of iz.tur) {
    const n = Math.max(1, Math.round(t.yasSon - t.yasBas));
    for (let k = 0; k < n; k++) {
      out.push({ yas: Math.floor(t.yasBas) + k, maas: t.maas / n, olay: t.olay / n, mulk: t.mulk / n, gider: t.gider / n });
    }
  }
  return out;
}

const DEKADLAR: [number, number][] = [[15, 19], [20, 29], [30, 39], [40, 49], [50, 59], [60, 69], [70, 79], [80, 120]];


/** Asker: yaş dekadına göre er sayısı ve askerî güç (yaşayanlar), ömür ortalaması/maksimumu, mutlak maksimum, rütbe dağılımı. */
function askerOrdu(izler: OyunIzi[]): void {
  const q = (a: number[], p: number) => { const x = [...a].sort((m, n) => m - n); return x.length ? x[Math.min(x.length - 1, Math.floor((x.length - 1) * p))] : 0; };
  console.log("\n  ORDU (yaşayanlar): dekad | er ort / medyan / p90 / max | güç ort / medyan / p90 / max");
  for (const [a, b] of DEKADLAR) {
    const er: number[] = [], guc: number[] = [];
    for (const iz of izler) for (const t of iz.tur) { const yas = Math.floor(t.yasSon); if (yas >= a && yas <= b) { er.push(t.er); guc.push(t.guc); } }
    if (!er.length) continue;
    console.log(`   ${(a === 80 ? "80+" : `${a}-${b}`).padEnd(6)} | ${y2(ortala(er)).toFixed(0).padStart(5)} / ${q(er, 0.5).toFixed(0).padStart(4)} / ${q(er, 0.9).toFixed(0).padStart(5)} / ${Math.max(...er).toFixed(0).padStart(5)} | ${y2(ortala(guc)).toFixed(0).padStart(5)} / ${q(guc, 0.5).toFixed(0).padStart(4)} / ${q(guc, 0.9).toFixed(0).padStart(5)} / ${Math.max(...guc).toFixed(0).padStart(6)}`);
  }
  const omurOrtEr = izler.map((i) => ortala(i.tur.map((t) => t.er)));
  const omurMaksEr = izler.map((i) => Math.max(0, ...i.tur.map((t) => t.er)));
  const omurOrtGuc = izler.map((i) => ortala(i.tur.map((t) => t.guc)));
  const omurMaksGuc = izler.map((i) => Math.max(0, ...i.tur.map((t) => t.guc)));
  console.log(`  Ömür başına: er ortalaması ${y2(ortala(omurOrtEr))} (medyan ${y2(medyan(omurOrtEr))}) · ömür zirvesi ort ${y2(ortala(omurMaksEr))} (medyan ${y2(medyan(omurMaksEr))}, p90 ${q(omurMaksEr, 0.9)}) · MUTLAK MAKS ${Math.max(...omurMaksEr)}`);
  console.log(`  Ömür başına: güç ortalaması ${y2(ortala(omurOrtGuc))} (medyan ${y2(medyan(omurOrtGuc))}) · ömür zirvesi ort ${y2(ortala(omurMaksGuc))} (medyan ${y2(medyan(omurMaksGuc))}, p90 ${y2(q(omurMaksGuc, 0.9))}) · MUTLAK MAKS ${y2(Math.max(...omurMaksGuc))}`);
  // Savaş yılı vs barış yılı: ordu büyüklüğü bandına göre yıl başına gelir/gider/net (turun yıl sayısına bölünerek).
  console.log("\n  SAVAŞ vs BARIŞ (yıl başına, er bandına göre): band | barış gelir/gider/net (n tur) | savaş gelir/gider/net (n tur)");
  for (const [lo, hi] of [[0, 40], [40, 100], [100, 200], [200, 451]]) {
    const f = (sv: boolean) => {
      const ts = izler.flatMap((i) => i.tur).filter((t) => t.savas === sv && t.er >= lo && t.er < hi && t.yasSon > t.yasBas);
      if (!ts.length) return "-";
      const yil = ts.reduce((a, t) => a + (t.yasSon - t.yasBas), 0);
      const g = ts.reduce((a, t) => a + t.maas + t.olay + t.mulk, 0) / yil, d = ts.reduce((a, t) => a + t.gider, 0) / yil;
      return `${g.toFixed(0)}/${d.toFixed(0)}/${(g - d).toFixed(0)} (${ts.length})`;
    };
    console.log(`   er ${String(lo).padStart(3)}-${String(hi - 1).padEnd(3)} | ${f(false).padEnd(22)} | ${f(true)}`);
  }
  // Savaş döngüsü: savaş yılları + savaş bittikten sonraki yıl (zafer ganimeti bu yıla düşer) toplam net, savaş başındaki er bandına göre.
  console.log("\n  SAVAŞ DÖNGÜSÜ (savaş yılları + bitişi izleyen yıl, toplam net): er bandı | n savaş | ort / medyan net | %pozitif | ort. uzunluk(yıl)");
  for (const [lo, hi] of [[0, 40], [40, 100], [100, 200], [200, 451]]) {
    const netler: number[] = [], uzun: number[] = [];
    for (const iz of izler) {
      const T = iz.tur;
      for (let i = 0; i < T.length; i++) {
        if (!T[i].savas || (i > 0 && T[i - 1].savas)) continue;
        const er0 = T[i].er;
        if (er0 < lo || er0 >= hi) continue;
        let j = i, net = 0, yil = 0;
        while (j < T.length && T[j].savas) { net += T[j].maas + T[j].olay + T[j].mulk - T[j].gider; yil += T[j].yasSon - T[j].yasBas; j++; }
        if (j < T.length) { net += T[j].maas + T[j].olay + T[j].mulk - T[j].gider; yil += T[j].yasSon - T[j].yasBas; }
        netler.push(net); uzun.push(yil);
      }
    }
    if (!netler.length) continue;
    console.log(`   er ${String(lo).padStart(3)}-${String(hi - 1).padEnd(3)} | ${String(netler.length).padStart(5)} | ${y2(ortala(netler)).toFixed(0).padStart(6)} / ${medyan(netler).toFixed(0).padStart(6)} | %${y2((netler.filter((x) => x > 0).length / netler.length) * 100)} | ${y2(ortala(uzun))}`);
  }
  const rd: Record<number, number> = {};
  for (const i of izler) rd[i.sonRutbe] = (rd[i.sonRutbe] ?? 0) + 1;
  console.log(`  Ölüm anı rütbe dağılımı: ${Object.entries(rd).sort().map(([k, v]) => `S${k} %${y2((v / izler.length) * 100)}`).join(" · ")}`);
}

/** Çatışma istatistikleri: 3 tür (haydut, sınır, genel savaş) için kazanma oranı, ortalama oyuncu ve düşman gücü; 10 yıllık yaş dekadlarında. */
function catismaRapor(): void {
  if (!CATISMALAR.length) return;
  console.log("\n[ÇATIŞMA İSTATİSTİĞİ] tür | n | kazanma % | ort. oyuncu gücü | ort. düşman gücü (mutlak) | etkin oyuncu / etkin düşman");
  const ort = (a: number[]) => (a.length ? ortala(a) : 0);
  for (const tur of ["haydut", "sinir", "savas"] as const) {
    const c = CATISMALAR.filter((x) => x.tur === tur);
    console.log(`  ${tur.padEnd(7)} | ${String(c.length).padStart(5)} | %${y2((c.filter((x) => x.zafer).length / Math.max(1, c.length)) * 100)} | ${y2(ort(c.map((x) => x.oyuncuGuc)))} | ${y2(ort(c.map((x) => x.dusmanGuc)))} | ${y2(ort(c.map((x) => x.oyuncuEtkin)))} / ${y2(ort(c.map((x) => x.dusmanEtkin)))}`);
  }
  for (const tur of ["haydut", "sinir", "savas"] as const) {
    console.log(`  ${tur.toUpperCase()} — yaş dekadı | n | kazanma % | oyuncu gücü ort / medyan | düşman gücü ort`);
    for (const [a, b] of DEKADLAR) {
      const c = CATISMALAR.filter((x) => x.tur === tur && x.yas >= a && x.yas <= b);
      if (!c.length) continue;
      console.log(`    ${(a === 80 ? "80+" : `${a}-${b}`).padEnd(6)} | ${String(c.length).padStart(5)} | %${String(y2((c.filter((x) => x.zafer).length / c.length) * 100)).padStart(5)} | ${String(y2(ort(c.map((x) => x.oyuncuGuc)))).padStart(7)} / ${String(y2(medyan(c.map((x) => x.oyuncuGuc)))).padStart(7)} | ${String(y2(ort(c.map((x) => x.dusmanGuc)))).padStart(7)}`);
    }
  }
}

function meslekRapor(baslik: string, izler: OyunIzi[]): any {
  console.log(`\n################  ${baslik}  (${izler.length} ömür)  ################`);
  const yillar = izler.map(yilaYay);
  const omur = izler.map((i) => i.olumYasi);
  console.log(`Ölüm yaşı ort ${y2(ortala(omur))} | medyan ${medyan(omur)} | min ${Math.min(...omur)} max ${Math.max(...omur)}`);
  console.log("Yaş dekadı | yaşayan% | MAAŞ/yıl | OLAY/yıl | MÜLK/yıl | TOPLAM GELİR/yıl | GİDER/yıl | NET/yıl | dekad toplam gelir | medyan gelir/yıl");
  const satirlar: any[] = [];
  for (const [a, b] of DEKADLAR) {
    // Yaşayanlar: o dekadda en az 1 yıl yaşayan ömürler. Yıl başına ort. = pooled (toplam / toplam yaşanan yıl).
    let yilSay = 0, m = 0, o = 0, mk = 0, g = 0, yasayan = 0;
    const dekadToplamlar: number[] = [];
    const yillikOrtlar: number[] = [];
    yillar.forEach((yy) => {
      const sel = yy.filter((r) => r.yas >= a && r.yas <= b);
      if (sel.length) yasayan++;
      let dt = 0;
      for (const r of sel) { yilSay++; m += r.maas; o += r.olay; mk += r.mulk; g += r.gider; dt += r.maas + r.olay + r.mulk; }
      if (sel.length) { dekadToplamlar.push(dt); yillikOrtlar.push(dt / sel.length); }
    });
    if (!yilSay) continue;
    const row = {
      dekad: a === 80 ? "80+" : `${a}-${b}`,
      yasayanYuzde: y2((yasayan / izler.length) * 100),
      maas: y2(m / yilSay), olay: y2(o / yilSay), mulk: y2(mk / yilSay),
      toplamGelir: y2((m + o + mk) / yilSay), gider: y2(g / yilSay), net: y2((m + o + mk - g) / yilSay),
      dekadToplam: y2(ortala(dekadToplamlar)),
      medyanYillik: y2(medyan(yillikOrtlar)),
    };
    satirlar.push(row);
    console.log(
      `${row.dekad.padEnd(8)} | ${String(row.yasayanYuzde).padStart(6)} | ${String(row.maas).padStart(8)} | ${String(row.olay).padStart(8)} | ${String(row.mulk).padStart(8)} | ${String(row.toplamGelir).padStart(10)} | ${String(row.gider).padStart(8)} | ${String(row.net).padStart(8)} | ${row.dekadToplam} | ${row.medyanYillik}`
    );
  }
  if (izler.length && izler[0].meslek === "Asker") askerOrdu(izler);
  const omurGelir = yillar.map((yy) => yy.reduce((s, r) => s + r.maas + r.olay + r.mulk, 0));
  const omurMaas = yillar.map((yy) => yy.reduce((s, r) => s + r.maas, 0));
  const omurGider = yillar.map((yy) => yy.reduce((s, r) => s + r.gider, 0));
  const omurNet = omurGelir.map((g, i) => g - omurGider[i]);
  const calisma = yillar.map((yy) => yy.length);
  const p = (arr: number[], q: number) => { const s = [...arr].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor((s.length - 1) * q))]; };
  const borclu = izler.filter((i) => i.sonPara < 0).length;
  const ozet = {
    borcluOlenYuzde: y2((borclu / izler.length) * 100),
    omurOrt: y2(ortala(omur)),
    omurGelirOrt: y2(ortala(omurGelir)), omurGelirMedyan: y2(medyan(omurGelir)), p10: y2(p(omurGelir, 0.1)), p90: y2(p(omurGelir, 0.9)),
    omurMaasOrt: y2(ortala(omurMaas)),
    omurGiderOrt: y2(ortala(omurGider)), omurNetOrt: y2(ortala(omurNet)),
    sonParaOrt: y2(ortala(izler.map((i) => i.sonPara))), sonParaMedyan: y2(medyan(izler.map((i) => i.sonPara))),
    yilBasinaOrt: y2(ortala(omurGelir) / Math.max(1, ortala(calisma))),
    // 50 ve 60 yıllık ömre (15-65 / 15-75 yaş) standardize
    gelir50_65: 0, gelir60_75: 0,
  };
  // Standardize: yalnız ≥65 / ≥75 yaşına ulaşanların 15-65 / 15-75 arası toplamı
  const tam = (limit: number) => {
    const v: number[] = [];
    yillar.forEach((yy, i) => { if (izler[i].olumYasi >= limit) v.push(yy.filter((r) => r.yas < limit).reduce((s, r) => s + r.maas + r.olay + r.mulk, 0)); });
    return { n: v.length, ort: y2(ortala(v)), medyan: v.length ? y2(medyan(v)) : 0 };
  };
  const t65 = tam(65), t75 = tam(75);
  console.log(`\nÖMÜR TOPLAMI: gelir ort ${ozet.omurGelirOrt} (medyan ${ozet.omurGelirMedyan}, p10 ${ozet.p10}, p90 ${ozet.p90}) | maaş ${ozet.omurMaasOrt} | gider ${ozet.omurGiderOrt} | net ${ozet.omurNetOrt} | ölümde nakit ort ${ozet.sonParaOrt} (medyan ${ozet.sonParaMedyan}) | borçla ölen %${ozet.borcluOlenYuzde}`);
  console.log(`Yıl başına ort. gelir ${ozet.yilBasinaOrt}`);
  console.log(`≥65 yaşa ulaşanlar (n=${t65.n}): 15-65 arası (50 yıl) gelir ort ${t65.ort}, medyan ${t65.medyan}`);
  console.log(`≥75 yaşa ulaşanlar (n=${t75.n}): 15-75 arası (60 yıl) gelir ort ${t75.ort}, medyan ${t75.medyan}`);
  return { baslik, n: izler.length, ozet, t65, t75, dekadlar: satirlar };
}

async function main(): Promise<void> {
  let caglar = Object.keys(BOLGELER_BY_CAG) as Cag[];
  if (CAG_FILTRE.length) caglar = caglar.filter((c) => CAG_FILTRE.includes(c));
  let meslekler = [...MESLEKLER];
  if (MESLEK_FILTRE.length) meslekler = meslekler.filter((m) => MESLEK_FILTRE.includes(m));
  const tum: OyunIzi[] = [];
  const t0 = Date.now();
  for (const cag of caglar) for (const meslek of meslekler) {
    console.log(`=== ${cag} — ${meslek}: ${N_PER_GROUP} ömür (mod: ${MOD}) ===`);
    for (let i = 0; i < N_PER_GROUP; i++) {
      tum.push(await birOyun(cag, meslek));
      if ((i + 1) % 25 === 0) console.log(`  ${i + 1}/${N_PER_GROUP} (${((Date.now() - t0) / 1000).toFixed(0)}sn)`);
    }
  }
  if (process.env.SIM_SAVAS_KONTROL) {
    for (const meslek of meslekler) {
      const g = tum.filter((i) => i.meslek === meslek);
      const takili = g.filter((i) => i.takiliSavasYili > 0);
      console.log(`[TAKILI SAVAŞ] ${meslek}: ömrün %${y2((takili.length / g.length) * 100)}'inde var; takılı yıl ort ${y2(ortala(takili.map((i) => i.takiliSavasYili)))}, medyan ${medyan(takili.map((i) => i.takiliSavasYili))}; ömrün ort. %${y2((ortala(g.map((i) => i.takiliSavasYili)) / ortala(g.map((i) => Math.max(1, i.olumYasi - 15)))) * 100)}'i takılı savaşta`);
    }
  }
  if (process.env.SIM_DOKUM) { dokumYazdir(); dokumOmurAgirlikli(); dokumBolumYazdir(); }
  catismaRapor();
  const rapor: any[] = [];
  for (const meslek of meslekler) rapor.push(meslekRapor(`MESLEK: ${meslek} (tüm çağlar)`, tum.filter((i) => i.meslek === meslek)));
  for (const cag of caglar) for (const meslek of meslekler)
    rapor.push(meslekRapor(`${cag} / ${meslek}`, tum.filter((i) => i.meslek === meslek && i.cag === cag)));
  fs.writeFileSync(path.join(__dirname, `simulateMeslekGelir.${MOD}.sonuc.json`), JSON.stringify(rapor, null, 2), "utf-8");
  console.log(`\nBitti: ${tum.length} ömür, ${((Date.now() - t0) / 1000).toFixed(0)}sn, hatalı ${tum.filter((i) => i.hataMi).length}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
