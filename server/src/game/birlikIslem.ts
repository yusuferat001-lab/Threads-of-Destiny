import type {
  BirlikArazi,
  BirlikDurumu,
  BirlikEsirKarari,
  BirlikGanimetPayi,
  BirlikIkmal,
  BirlikKalite,
  BirlikRol,
  BirlikSavasKarari,
  BirlikSeferberlik,
  BirlikTalim,
  BirlikTon,
  BirlikTur,
  CharacterState,
  SonucEtkisi,
} from "../types";
import {
  ARAZI_ADLARI,
  ARAZI_SIRASI,
  ARAZI_TERCIH_IHTIMALI,
  BIRLIK_KILIT_YIL,
  GANIMET_GUC_BIRIMI,
  BIRLIK_SEVIYE_PAYI,
  DOKTRINLER,
  ER_TAVANI,
  ESIR_YETKI_RUTBE,
  GANIMET_PAYI_TANIMLARI,
  GANIMET_SIRASI,
  GOREVLER,
  IADE_ORANI,
  IKMAL_SIRASI,
  IKMAL_TANIMLARI,
  INISIYATIF_OYUNCU_SECER,
  INISIYATIF_ZORUNLU_SALDIRI,
  KALITE_ADLARI,
  KALITE_FIYATI,
  KALITE_KILIT_YIL,
  KALITE_SIRASI,
  KISLA_BAKIM,
  KISLA_ER_LIMITI,
  KUSATMA_ER_FIYATI,
  KUSATMA_SALDIRI_BONUSU,
  ROL_SIRASI,
  ROL_TANIMLARI,
  SEFERBERLIK_SIRASI,
  SEFERBERLIK_TANIMLARI,
  TALIM_GUC_KATSAYISI,
  TALIM_KAYIP_KATSAYISI,
  TALIM_SIRASI,
  TALIM_TANIMLARI,
  TON_SIRASI,
  TON_TANIMLARI,
  TUR_SIRASI,
  TUR_TANIMLARI,
  EMIRLER,
  KIRALIK_ORAN,
  MIN_CEKIRDEK_ER,
  KIRALIK_PESIN,
  KIRALIK_YILLIK,
  emirGetir,
  emirSeviyesi,
  maasAdi,
  doktrinGetir,
  doktrinSecenekleri,
  gorevAdi,
  gorevGetir,
  kusatmaAdi,
  moralGucEtkisi,
  techizatAdi,
  turAdi,
  yolDoktrinKaynagi,
} from "../data/birlik";
import { askerGucleri, aktifRakipler, askerRakipGucCarpani, pazarPayiHesapla } from "../data/pazar";
import type { IsletmeBaglami } from "./isletme";
import {
  birlikAl,
  birlikBeklenenKar,
  birlikHesapla,
  birlikSenkron,
  clamp,
  doktrinBekleyenSeviye,
  erSayisi,
  gorevPaylari,
  gorevSlotSayisi,
  gucHesapla,
  kaliteCikar,
  kayipCarpani,
  kislaKademesi,
  kislaLimiti,
  komutaLimiti,
  r2,
  rutbeIndeksi,
  limitAsimEri,
  yaraliSayisi,
  turPaylari,
  yolDali,
  type BirlikHesabi,
  type GucDokumu,
} from "./birlik";
import { esirleriIsle, savasBaslat, seferberlikUygula, yaraliIyilesmeSuresi, yeniErEkle } from "./birlikYil";
import { olasilikliYuvarla } from "./isletme";

// ── Yardımcılar ─────────────────────────────────────────────────────────────
const kilitKalan = (state: CharacterState, bitis: number | null) => (bitis != null && state.yil < bitis ? bitis - state.yil : 0);
const gucParaKontrol = (state: CharacterState, tutar: number) => {
  if (state.para < tutar) throw new Error(`Yeterli paran yok (${r2(tutar)} ${state.para_birimi} gerekli).`);
};
const hapisYolculuk = (state: CharacterState) => {
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken ordunla ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken ordunla ilgilenemezsin.");
};

// ── Karar: görevler ve politikalar ──────────────────────────────────────────
export interface BirlikKararGirdisi {
  gorevler?: string[];
  ganimet_payi?: string;
  talim?: string;
  ton?: string;
  hedef_kalite?: string;
}

/** Görev seçimi + üç politika + yeni erler için hedef kalite. Önce doğrular, sonra uygular. Turu tüketmez. */
export function birlikKararUygula(state: CharacterState, k: BirlikKararGirdisi): void {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (k.gorevler !== undefined) {
    if (!Array.isArray(k.gorevler) || new Set(k.gorevler).size !== k.gorevler.length) throw new Error("Geçersiz karar.");
    if (k.gorevler.length > gorevSlotSayisi(state)) throw new Error("Bu kadar görevi aynı anda yürütemezsin; rütben yükselince yeni yer açılır.");
    const er = erSayisi(state);
    for (const id of k.gorevler) {
      const g = gorevGetir(id);
      if (!g) throw new Error("Böyle bir görev yok.");
      if (g.yalnizSavas && !state.ulke.savasta) throw new Error("Bu görev yalnız savaşta açılır.");
      if (Math.floor(er / Math.max(1, k.gorevler.length)) < g.minEr) throw new Error("Bu göreve ayıracak yeterli erin yok.");
    }
  }
  if (k.ganimet_payi !== undefined && !GANIMET_SIRASI.includes(k.ganimet_payi as BirlikGanimetPayi)) throw new Error("Geçersiz ganimet payı.");
  if (k.talim !== undefined && !TALIM_SIRASI.includes(k.talim as BirlikTalim)) throw new Error("Geçersiz talim politikası.");
  if (k.ton !== undefined && !TON_SIRASI.includes(k.ton as BirlikTon)) throw new Error("Geçersiz komuta tonu.");
  if (k.hedef_kalite !== undefined) {
    if (!KALITE_SIRASI.includes(k.hedef_kalite as BirlikKalite)) throw new Error("Geçersiz teçhizat kalitesi.");
    if (k.hedef_kalite !== b.hedef_kalite && kilitKalan(state, b.kalite_kilit_bitis) > 0) throw new Error("Teçhizat kalitesi 5 yılda bir değiştirilebilir.");
  }
  if (k.gorevler !== undefined) b.gorevler = [...k.gorevler];
  if (k.ganimet_payi !== undefined) {
    if (rutbeIndeksi(state) < 1 && k.ganimet_payi !== b.ganimet_payi) throw new Error("Ganimet payını ancak ikinci rütbeden itibaren belirleyebilirsin.");
    b.ganimet_payi = k.ganimet_payi as BirlikGanimetPayi;
  }
  if (k.talim !== undefined) b.talim_politikasi = k.talim as BirlikTalim;
  if (k.ton !== undefined) b.ton = k.ton as BirlikTon;
  if (k.hedef_kalite !== undefined && k.hedef_kalite !== b.hedef_kalite) {
    b.hedef_kalite = k.hedef_kalite as BirlikKalite;
    b.kalite_kilit_bitis = state.yil + KALITE_KILIT_YIL;
  }
}

// ── Doktrin ─────────────────────────────────────────────────────────────────
export function doktrinSec(state: CharacterState, doktrinId: string): void {
  const b = birlikAl(state);
  const seviye = doktrinBekleyenSeviye(state);
  if (seviye === null) throw new Error("Şu an seçilecek bir doktrin yok.");
  const d = doktrinGetir(doktrinId);
  if (!d || d.seviye !== seviye) throw new Error("Bu doktrin şu an seçilemez.");
  if (!doktrinSecenekleri(seviye, yolDali(state)).some((x) => x.id === d.id)) throw new Error("Bu doktrin şu an seçilemez.");
  b.doktrinler.push(d.id);
  b.sertlik = clamp(b.sertlik + (d.acimasiz ? 3 : 0), 0, 100);
  doktrinBekleyenSeviye(state);
}

// ── Teçhizat kalitesi ───────────────────────────────────────────────────────
export interface IslemSonucu {
  maliyet: number;
  iade: number;
  adet: number;
}

/** Erlerin `yuzde`'sini (50/100) verilen kaliteye yükseltir; er başı fark ödenir; kalite 5 yıl kilitlenir. */
export function kaliteYukselt(state: CharacterState, hedef: BirlikKalite, yuzde: number, bg: IsletmeBaglami): IslemSonucu {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (hedef === "dusuk" || !KALITE_SIRASI.includes(hedef)) throw new Error("Geçersiz teçhizat kalitesi.");
  if (yuzde !== 50 && yuzde !== 100) throw new Error("Geçersiz oran.");
  if (kilitKalan(state, b.kalite_kilit_bitis) > 0) throw new Error("Teçhizat kalitesi 5 yılda bir değiştirilebilir.");
  const alt: BirlikKalite[] = hedef === "yuksek" ? ["orta", "dusuk"] : ["dusuk"];
  const havuz = alt.reduce((t, q) => t + b.kalite[q], 0);
  let n = Math.round((havuz * yuzde) / 100);
  if (n <= 0) throw new Error("Yükseltilecek er yok.");
  let maliyet = 0;
  const plan: [BirlikKalite, number][] = [];
  for (const q of alt) {
    const al = Math.min(n, b.kalite[q]);
    if (al <= 0) continue;
    plan.push([q, al]);
    maliyet += al * (KALITE_FIYATI[hedef] - KALITE_FIYATI[q]) * bg.giderEnflasyon;
    n -= al;
  }
  maliyet = r2(maliyet);
  gucParaKontrol(state, maliyet);
  let toplam = 0;
  for (const [q, al] of plan) {
    b.kalite[q] -= al;
    b.kalite[hedef] += al;
    toplam += al;
  }
  state.para = r2(state.para - maliyet);
  b.kalite_kilit_bitis = state.yil + KALITE_KILIT_YIL;
  birlikSenkron(state, bg.enflasyon);
  return { maliyet, iade: 0, adet: toplam };
}

// ── Özel birlik ─────────────────────────────────────────────────────────────
function turErSayilari(er: number, turler: BirlikTur[], seviye: number): Record<BirlikTur, number> {
  const sonuc: Record<BirlikTur, number> = { okcu: 0, suvari: 0, mizrakli: 0 };
  const efektif = turler.slice(0, seviye);
  if (efektif.length === 0) return sonuc;
  const pay = BIRLIK_SEVIYE_PAYI[clamp(efektif.length, 0, 3)] / efektif.length;
  for (const t of efektif) sonuc[t] = Math.round(er * pay);
  return sonuc;
}

/** Özel birlik seviyesi (0-3) ve seçili türler (seviye kadar; 3'te hepsi). Fark er başına ödenir/iade edilir. */
export function birlikSec(state: CharacterState, seviye: number, turler: BirlikTur[], bg: IsletmeBaglami): IslemSonucu {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (!Number.isInteger(seviye) || seviye < 0 || seviye > 3) throw new Error("Geçersiz birlik seviyesi.");
  const secili = seviye === 3 ? [...TUR_SIRASI] : [...turler];
  if (!Array.isArray(turler) || secili.length !== seviye || new Set(secili).size !== seviye || secili.some((t) => !TUR_SIRASI.includes(t))) {
    throw new Error("Seviye kadar farklı birlik türü seçmelisin.");
  }
  const eskiSet = new Set(b.birlik_turler.slice(0, b.birlik_seviye));
  const yeniSet = new Set(secili);
  const ustKume = [...eskiSet].every((t) => yeniSet.has(t));
  if (!ustKume && kilitKalan(state, b.birlik_kilit_bitis) > 0) throw new Error("Birlikleri 5 yılda bir değiştirebilirsin; yalnız yenisini ekleyebilirsin.");
  const er = erSayisi(state);
  const eski = turErSayilari(er, b.birlik_turler, b.birlik_seviye);
  const yeni = turErSayilari(er, secili, seviye);
  let maliyet = 0;
  let iade = 0;
  let adet = 0;
  for (const t of TUR_SIRASI) {
    const f = yeni[t] - eski[t];
    if (f > 0) {
      maliyet += f * TUR_TANIMLARI[t].ucret * bg.giderEnflasyon;
      adet += f;
    } else if (f < 0) iade += -f * TUR_TANIMLARI[t].ucret * bg.giderEnflasyon * IADE_ORANI;
  }
  maliyet = r2(maliyet);
  iade = r2(iade);
  gucParaKontrol(state, maliyet - iade);
  state.para = r2(state.para - maliyet + iade);
  const eskiSeviye = b.birlik_seviye;
  b.birlik_seviye = seviye;
  b.birlik_turler = secili;
  // Kilit ilk seçimden itibaren işler: kilitliyken yalnız yenisi eklenebilir, tür değiştirilemez.
  if (kilitKalan(state, b.birlik_kilit_bitis) <= 0 && (seviye !== eskiSeviye || !ustKume || yeniSet.size !== eskiSet.size)) {
    b.birlik_kilit_bitis = state.yil + BIRLIK_KILIT_YIL;
  }
  birlikSenkron(state, bg.enflasyon);
  return { maliyet, iade, adet };
}

/** Kuşatma kolu / topçu bataryası seviyesi (0-2): er sayısına göre fiyat; küçültünce %35 iade. */
export function kusatmaAyarla(state: CharacterState, seviye: number, bg: IsletmeBaglami): IslemSonucu {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (!Number.isInteger(seviye) || seviye < 0 || seviye > 2) throw new Error("Geçersiz kuşatma seviyesi.");
  const er = erSayisi(state);
  const fark = (KUSATMA_ER_FIYATI[seviye] - KUSATMA_ER_FIYATI[b.kusatma_seviye]) * er * bg.giderEnflasyon;
  let maliyet = 0;
  let iade = 0;
  if (fark > 0) {
    maliyet = r2(fark);
    gucParaKontrol(state, maliyet);
    state.para = r2(state.para - maliyet);
  } else if (fark < 0) {
    iade = r2(-fark * IADE_ORANI);
    state.para = r2(state.para + iade);
  }
  b.kusatma_seviye = seviye;
  birlikSenkron(state, bg.enflasyon);
  return { maliyet, iade, adet: 0 };
}

/** Terhis: önce düşük kaliteden başlayarak `adet` er saldırır; orta/yüksek teçhizat bedelinin %35'i döner. Savaşta kapalı. */
export function terhisEt(state: CharacterState, adet: number, bg: IsletmeBaglami): IslemSonucu {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (state.ulke.savasta) throw new Error("Savaş sürerken terhis edemezsin.");
  const er = erSayisi(state);
  const n = Math.round(adet);
  if (!Number.isFinite(n) || n <= 0) throw new Error("Geçersiz adet.");
  if (er - n < MIN_CEKIRDEK_ER) throw new Error(`Ordunda en az ${MIN_CEKIRDEK_ER} er kalmalı.`);
  let kalan = n;
  let iade = 0;
  for (const q of KALITE_SIRASI) {
    const al = Math.min(kalan, b.kalite[q]);
    b.kalite[q] -= al;
    kalan -= al;
    iade += al * KALITE_FIYATI[q] * bg.giderEnflasyon * IADE_ORANI;
    if (kalan <= 0) break;
  }
  state.meslek_musteri = er - n;
  b.yarali = Math.min(Math.max(0, Math.round(b.yarali ?? 0)), er - n);
  iade = r2(iade);
  state.para = r2(state.para + iade);
  birlikSenkron(state, bg.enflasyon);
  return { maliyet: 0, iade, adet: n };
}

/** Kiralık ordu: savaş süresince ordunun %40'ı kadar eğitimli paralı tutar (peşin ücret; yıllık ücret gider hesabında). */
export function kiralikOrduTut(state: CharacterState, bg: IsletmeBaglami): IslemSonucu {
  const b = birlikAl(state);
  hapisYolculuk(state);
  if (!state.ulke.savasta) throw new Error("Kiralık ordu yalnız savaşta tutulur.");
  const sv = b.savas ?? savasBaslat(state);
  if ((sv.kiralik_er ?? 0) > 0) throw new Error("Kiralık ordu zaten tutuldu.");
  const n = Math.round(erSayisi(state) * KIRALIK_ORAN);
  if (n <= 0) throw new Error("Kiralayacak kadar ordun yok.");
  const maliyet = r2(n * KIRALIK_PESIN * bg.giderEnflasyon);
  gucParaKontrol(state, maliyet);
  state.para = r2(state.para - maliyet);
  sv.kiralik_er = n;
  birlikSenkron(state, bg.enflasyon);
  return { maliyet, iade: 0, adet: n };
}

// ── Savaş Kararları (zorunlu zincir) ────────────────────────────────────────
export function savasKarariHazirla(state: CharacterState): BirlikSavasKarari | null {
  const b = state.isletme?.birlik;
  if (!b || state.meslek !== "Asker" || !state.ulke.savasta) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  if (b.savas_karari && b.savas_karari.yil === state.yil) return b.savas_karari;
  const adimlar: string[] = [];
  if (!b.savas || !b.savas.seferberlik) adimlar.push("seferberlik");
  // Komutan emri savaş başında bir kez seçilir ve savaş boyu sabit kalır.
  if (!b.savas?.emir) adimlar.push("emir");
  // Arazi tercihi yalnız ihtimali sıfırdan büyükse sorulur (S1'de %0: seçimin anlamı olmaz).
  if (ARAZI_TERCIH_IHTIMALI[rutbeIndeksi(state)] > 0) adimlar.push("arazi");
  adimlar.push("rol");
  const r = Math.random();
  let zorunlu: "saldiri" | "savunma" | null = null;
  if (r >= INISIYATIF_OYUNCU_SECER) zorunlu = r < INISIYATIF_OYUNCU_SECER + INISIYATIF_ZORUNLU_SALDIRI ? "saldiri" : "savunma";
  else adimlar.push("inisiyatif");
  adimlar.push("ikmal");
  if (rutbeIndeksi(state) + 1 >= ESIR_YETKI_RUTBE) adimlar.push("esir");
  b.savas_karari = {
    yil: state.yil, adimlar, adim: 0, inisiyatif_zorunlu: zorunlu, seferberlik: null, arazi: null, rol: "ana", inisiyatif: null, ikmal: "yeterli", esir: "karma",
  };
  return b.savas_karari;
}

/** Savaş yılında kararlar verilmeden zaman ilerlemez. */
export function savasKarariBekliyorMu(state: CharacterState): boolean {
  const k = savasKarariHazirla(state);
  return !!k && k.adim < k.adimlar.length;
}

export interface SavasKarariSecenegi {
  id: string;
  simge?: string;
  ad: { tr: string; en: string };
  aciklama: { tr: string; en: string };
}
export interface SavasKarariDurumu {
  adim: string;
  sira: number;
  toplam: number;
  baslik: { tr: string; en: string };
  aciklama: { tr: string; en: string };
  secenekler: SavasKarariSecenegi[];
  /** Savaş bilgisi (düşman baskın birliği, mevcut arazi, ulusal ordu ve senin payın). */
  bilgi: { arazi: BirlikArazi | null; dusmanTur: string | null; yil: number };
}

const ADIM_BASLIKLARI: Record<string, { baslik: { tr: string; en: string }; aciklama: { tr: string; en: string } }> = {
  seferberlik: {
    baslik: { tr: "Seferberlik", en: "Mobilisation" },
    aciklama: { tr: "Savaş başladı. Orduyu nasıl büyüteceksin?", en: "War has begun. How will you swell the ranks?" },
  },
  emir: {
    baslik: { tr: "Komutan emri", en: "Commander's order" },
    aciklama: { tr: "Bu savaş boyunca geçerli olacak emri seç.", en: "Choose the order that holds for the whole war." },
  },
  arazi: {
    baslik: { tr: "Savaş alanı", en: "Battlefield" },
    aciklama: { tr: "Hangi arazide savaşmak istersin? Rütben yükseldikçe tercihin gerçekleşme ihtimali artar.", en: "Where do you want to fight? The higher your rank, the likelier your choice holds." },
  },
  rol: {
    baslik: { tr: "Cephedeki rolün", en: "Your role at the front" },
    aciklama: { tr: "Birliğin ordu içinde hangi görevi üstlensin?", en: "What part will your unit play in the army?" },
  },
  inisiyatif: {
    baslik: { tr: "Taarruz mu, savunma mı?", en: "Attack or defend?" },
    aciklama: { tr: "Bu yıl inisiyatif sende: saldırı gücün mü, savunma gücün mü belirleyici olsun?", en: "The initiative is yours this year: attack or defence strength?" },
  },
  ikmal: {
    baslik: { tr: "İkmal", en: "Supply" },
    aciklama: { tr: "Birliğini nasıl besleyeceksin?", en: "How will you feed your men?" },
  },
  esir: {
    baslik: { tr: "Esirlerin kaderi", en: "Fate of prisoners" },
    aciklama: { tr: "Alınan esirler için kararın ne?", en: "What do you decide for the captives?" },
  },
};

function adimSecenekleri(state: CharacterState, adim: string): SavasKarariSecenegi[] {
  const cag = state.cag;
  switch (adim) {
    case "seferberlik":
      return SEFERBERLIK_SIRASI.map((id) => ({ id, ad: SEFERBERLIK_TANIMLARI[id].ad, aciklama: SEFERBERLIK_TANIMLARI[id].aciklama }));
    case "emir":
      return EMIRLER.filter((e) => e.seviye === emirSeviyesi(rutbeIndeksi(state))).map((e) => ({ id: e.id, simge: e.simge, ad: e.ad, aciklama: e.aciklama }));
    case "arazi": {
      return [
        { id: "rastgele", simge: "🎲", ad: { tr: "Fark etmez", en: "No preference" }, aciklama: { tr: "Arazi bölgeye göre belirlenir.", en: "Terrain is decided by the region." } },
        ...ARAZI_SIRASI.map((id) => ({
          id,
          simge: ARAZI_ADLARI[id].simge,
          ad: cag === "Sanayi Devrimi" ? ARAZI_ADLARI[id].sanayi : ARAZI_ADLARI[id].orta,
          aciklama: { tr: "Savaşı bu arazide vermeye çalışırsın.", en: "You try to fight on this ground." },
        })),
      ];
    }
    case "rol":
      return ROL_SIRASI.map((id) => ({ id, ad: ROL_TANIMLARI[id].ad, aciklama: ROL_TANIMLARI[id].aciklama }));
    case "inisiyatif":
      return [
        { id: "saldiri", simge: "⚔️", ad: { tr: "Saldırı", en: "Attack" }, aciklama: { tr: "Saldırı gücün belirleyici olur.", en: "Your attack strength decides." } },
        { id: "savunma", simge: "🛡️", ad: { tr: "Savunma", en: "Defence" }, aciklama: { tr: "Savunma gücün belirleyici olur.", en: "Your defence strength decides." } },
      ];
    case "ikmal":
      return IKMAL_SIRASI.map((id) => ({ id, ad: IKMAL_TANIMLARI[id].ad, aciklama: IKMAL_TANIMLARI[id].aciklama }));
    case "esir":
      return [
        { id: "idam", simge: "☠️", ad: { tr: "İdam", en: "Execute" }, aciklama: { tr: "Sertlik ↑, ahlak ↓, moral −3.", en: "Harshness ↑, morality ↓, morale −3." } },
        { id: "serbest", simge: "🕊️", ad: { tr: "Serbest bırak", en: "Release" }, aciklama: { tr: "Ahlak ↑, şöhret ↑, moral +3; bazen fidye.", en: "Morality ↑, renown ↑, morale +3; sometimes a ransom." } },
        { id: "sat", simge: "💰", ad: { tr: "Sat", en: "Sell" }, aciklama: { tr: "Para kazanırsın, ahlak ↓.", en: "You earn coin, morality ↓." } },
      ];
    default:
      return [];
  }
}

export function savasKarariDurumu(state: CharacterState): SavasKarariDurumu | null {
  const b = state.isletme?.birlik;
  const k = savasKarariHazirla(state);
  if (!b || !k || k.adim >= k.adimlar.length) return null;
  const adim = k.adimlar[k.adim];
  const bas = ADIM_BASLIKLARI[adim];
  return {
    adim,
    sira: k.adim + 1,
    toplam: k.adimlar.length,
    baslik: bas.baslik,
    aciklama: bas.aciklama,
    secenekler: adimSecenekleri(state, adim),
    bilgi: { arazi: b.savas?.arazi ?? null, dusmanTur: b.savas?.dusman_tur ?? null, yil: state.yil },
  };
}

/** Sıradaki savaş kararı adımını işler. Turu tüketmez. */
export function savasKarariVer(state: CharacterState, secim: string, bg: IsletmeBaglami): void {
  const b = birlikAl(state);
  const k = savasKarariHazirla(state);
  if (!k || k.adim >= k.adimlar.length) throw new Error("Şu an verilecek bir savaş kararı yok.");
  const adim = k.adimlar[k.adim];
  const gecerli = adimSecenekleri(state, adim).map((s) => s.id);
  if (!gecerli.includes(secim)) throw new Error("Geçersiz seçim.");
  if (adim === "seferberlik") {
    k.seferberlik = secim as BirlikSeferberlik;
    seferberlikUygula(state, secim as BirlikSeferberlik, bg);
  } else if (adim === "emir") {
    const sv = b.savas ?? savasBaslat(state);
    sv.emir = secim;
  } else if (adim === "arazi") k.arazi = secim === "rastgele" ? null : (secim as BirlikArazi);
  else if (adim === "rol") k.rol = secim as BirlikRol;
  else if (adim === "inisiyatif") k.inisiyatif = secim as "saldiri" | "savunma";
  else if (adim === "ikmal") k.ikmal = secim as BirlikIkmal;
  else if (adim === "esir") k.esir = secim as BirlikEsirKarari;
  k.adim += 1;
  birlikSenkron(state, bg.enflasyon);
  void b;
}

// ── Olay etkileri ve eski ordu kancaları ────────────────────────────────────
/** Savaş kategorili seçimin kaybı (eski orduKaybiUygula yerine): er ölür, kimseye geçmez. */
export function birlikKaybiUygula(state: CharacterState, basarili: boolean): number {
  const b = state.isletme?.birlik;
  if (!b || state.meslek !== "Asker") return 0;
  const er = erSayisi(state);
  if (er <= 5) return 0;
  const yuzde = (basarili ? 0.03 : 0.1) * (state.ulke.savasta ? 1 : 0.2) * (0.5 + Math.random());
  const kayip = Math.min(er - 5, olasilikliYuvarla(er * yuzde * kayipCarpani(state)));
  const cikan = kaliteCikar(b, kayip);
  state.meslek_musteri = er - cikan;
  birlikSenkron(state);
  return cikan;
}

/** Seçim sonucundaki Asker'e özel alanlar: er, esir, moral, zar bonusu, erzak, eski teçhizat artışı. */
export function birlikOlayEtkisiUygula(state: CharacterState, etki: SonucEtkisi, bg: IsletmeBaglami): void {
  const b = state.isletme?.birlik;
  if (!b || state.meslek !== "Asker") return;
  if (etki.er_degisim) {
    if (etki.er_degisim > 0) yeniErEkle(state, etki.er_degisim, bg, { bedava: true });
    else {
      const c = kaliteCikar(b, Math.min(erSayisi(state) - 5, Math.round(-etki.er_degisim)));
      state.meslek_musteri = erSayisi(state) - c;
    }
  }
  if (etki.esir_ekle && etki.esir_ekle > 0) {
    const karar = rutbeIndeksi(state) + 1 >= ESIR_YETKI_RUTBE ? b.savas_karari?.esir ?? "karma" : "karma";
    const sonuc = esirleriIsle(state, b, Math.round(etki.esir_ekle), karar, bg);
    state.para = r2(state.para + sonuc.para);
  }
  if (etki.moral_degisim) b.moral = clamp(b.moral + etki.moral_degisim, 0, 100);
  if (etki.savas_zar_bonusu) b.zar_bonusu += etki.savas_zar_bonusu;
  if (etki.erzak_degisim) b.erzak_oran = clamp(b.erzak_oran + etki.erzak_degisim, 0, 1);
  if (etki.ordu_techizat_artis) {
    // Eski "teçhizat" ödülü: erlerin yarısı kadarı bir kalite yukarı çıkar (bedava).
    let n = Math.round(erSayisi(state) * 0.5 * clamp(etki.ordu_techizat_artis / 20, 0, 1));
    for (const q of ["orta", "dusuk"] as BirlikKalite[]) {
      const hedef: BirlikKalite = q === "dusuk" ? "orta" : "yuksek";
      const al = Math.min(n, b.kalite[q]);
      b.kalite[q] -= al;
      b.kalite[hedef] += al;
      n -= al;
      if (n <= 0) break;
    }
  }
  birlikSenkron(state, bg.enflasyon);
}

/** Ganimeti saklama (karanlık iş): kullanılabilir mi? Hata metni ya da null. */
export function ganimetSaklamaEngeli(state: CharacterState): string | null {
  if (state.meslek !== "Asker") return "Geçersiz iş.";
  if (rutbeIndeksi(state) + 1 < 3) return "Bu işi ancak üçüncü rütbeden itibaren yapabilirsin.";
  if ((state.isletme?.son_dokum?.birlik?.erPayi ?? 0) <= 0) return "Geçen yıl askerlere ayrılan bir ganimet payı yok.";
  return null;
}
export function ganimetSaklamaKazanci(state: CharacterState): number {
  return r2((state.isletme?.son_dokum?.birlik?.erPayi ?? 0) * 0.9);
}
export function ganimetSaklamaCezasi(state: CharacterState): number {
  return r2((state.isletme?.son_dokum?.birlik?.erPayi ?? 0) * 2);
}

// ── Görünüm (arayüz için) ───────────────────────────────────────────────────
export const GUC_ETIKETLERI: Record<string, { tr: string; en: string }> = {
  moral: { tr: "Moral", en: "Morale" },
  talim: { tr: "Talim / Tecrübe", en: "Drill / Experience" },
  doktrin: { tr: "Doktrin", en: "Doctrine" },
  doktrin_saldiri: { tr: "Doktrin (saldırı)", en: "Doctrine (attack)" },
  doktrin_savunma: { tr: "Doktrin (savunma)", en: "Doctrine (defence)" },
  yol: { tr: "Yol dalı", en: "Career path" },
  harp: { tr: "Harp subayı", en: "War officer" },
  erzak: { tr: "Erzak", en: "Supplies" },
  odenmeyen_maas: { tr: "Ödenmeyen maaş", en: "Unpaid wages" },
  odenmeyen_erzak: { tr: "Erzak karşılanamadı", en: "Supplies unpaid" },
  arazi: { tr: "Arazi", en: "Terrain" },
  kusatma: { tr: "Kuşatma", en: "Siege" },
  karsi_tur: { tr: "Düşman birliğine karşılık", en: "Counter to enemy troops" },
  senaryo: { tr: "Senaryo", en: "Scenario" },
};

export interface BirlikGorunumu {
  er: number;
  limit: { komuta: number; kisla: number; kislaKademe: number; seferberlik: boolean; tavan: number; asim: number };
  /** Tedavi gören yaralılar (görev ve savaşa katılamaz), yıllık iyileşen sayısı ve iyileşme süresi (yıl). */
  yarali: { sayi: number; saglam: number; yillikIyilesme: number; sureYil: number };
  guc: {
    ham: number;
    kalite: { dusuk: number; orta: number; yuksek: number };
    kaliteCarpani: { dusuk: number; orta: number; yuksek: number };
    piyadePayi: number;
    saldiriCarpani: number;
    savunmaCarpani: number;
    bonuslar: { kod: string; ad: { tr: string; en: string }; yuzde: number; taraf: string }[];
    saldiri: number;
    savunma: number;
    toplam: number;
  };
  rakipler: { ad: string; guc: number; husumet: number }[];
  pay: number;
  kalite: {
    sayilar: { dusuk: number; orta: number; yuksek: number };
    hedef: BirlikKalite;
    kilitKalanYil: number;
    ad: { tr: string; en: string };
    adlar: Record<BirlikKalite, { tr: string; en: string }>;
    yukseltFiyat: Record<"orta" | "yuksek", number>;
    techizat: { tr: string; en: string };
  };
  birlik: {
    seviye: number;
    seciliTurler: BirlikTur[];
    kilitKalanYil: number;
    toplamPay: number;
    seviyePaylari: number[];
    turler: {
      id: BirlikTur;
      simge: string;
      ad: { tr: string; en: string };
      saldiri: number;
      savunma: number;
      ucret: number;
      bakim: number;
      arti: { tr: string; en: string };
      eksi: { tr: string; en: string };
      secili: boolean;
    }[];
    kusatma: { seviye: number; ad: { tr: string; en: string }; bonuslar: number[]; fiyatlar: number[] };
  };
  talim: {
    seviye: number;
    politika: BirlikTalim;
    gucYuzde: number;
    kayipYuzde: number;
    politikalar: { id: BirlikTalim; ad: { tr: string; en: string }; delta: number; tavan: number; masraf: number; moral: number }[];
  };
  politikalar: {
    ganimetPayi: { secili: BirlikGanimetPayi; secenekler: { id: BirlikGanimetPayi; ad: { tr: string; en: string }; oran: number; moral: number }[] };
    ton: { secili: BirlikTon; secenekler: { id: BirlikTon; ad: { tr: string; en: string }; aciklama: { tr: string; en: string } }[] };
  };
  moral: { deger: number; gucYuzde: number; sertlik: number };
  gorevler: {
    slot: { kullanilan: number; toplam: number };
    secili: string[];
    katalog: { id: string; simge: string; ad: { tr: string; en: string }; aciklama: { tr: string; en: string }; minEr: number; erBasi: number; yalnizSavas: boolean; kullanilabilir: boolean; aktif: boolean; erPayi: number; gelir: number; ganimet: number }[];
  };
  doktrin: {
    secilen: { id: string; simge: string; ad: { tr: string; en: string }; seviye: number; acimasiz: boolean; etki: Record<string, number> }[];
    bekleyen: { seviye: number; yol: string | null; secenekler: { id: string; simge: string; ad: { tr: string; en: string }; kaynak: string; acimasiz: boolean; etki: Record<string, number> }[] } | null;
  };
  savas: {
    aktif: boolean;
    arazi: BirlikArazi | null;
    araziAd: { tr: string; en: string } | null;
    dusmanTur: string | null;
    dusmanOrani: number | null;
    seferberlik: BirlikSeferberlik | null;
    kanatZafer: number;
    kanatYenilgi: number;
    kararBekliyor: boolean;
    araziIhtimali: number;
  };
  /** Ele geçirilen kale sayısı, savaşta geçerli komutan emri ve kiralık ordu durumu. */
  kale: number;
  emir: { ad: { tr: string; en: string }; simge: string; aciklama: { tr: string; en: string } } | null;
  kiralik: { aktif: boolean; er: number; ucret: number; mumkun: boolean };
  hesap: {
    /** Maaşın çağ+ülkeye göre adı; savaşta "savaş ödeneği" olarak ödenir. */
    soldAdi: { tr: string; en: string };
    savasOdenegiMi: boolean;
    kaleGeliri: number;
    kiralikMasrafi: number;
    yagmaBrut: number;
    sold: number;
    erBasiGelir: number;
    gorevGeliri: number;
    ganimetNet: number;
    devletPayi: number;
    erPayi: number;
    toplamGelir: number;
    erMasrafi: number;
    erzak: number;
    gorevMasrafi: number;
    kislaBakim: number;
    techizatBakim: number;
    yaraliGideri: number;
    limitAsimGideri: number;
    kusatmaBakim: number;
    talimMasrafi: number;
    toplamGider: number;
    net: number;
    /** Bir barış çatışması (haydut/sınır) zaferinde oyuncuya kalacak tahmini ganimet (askerî güçle orantılı). */
    barisGanimetTahmini: number;
  };
  yol: string | null;
}

export function birlikGorunumuHesapla(state: CharacterState, bg: IsletmeBaglami): BirlikGorunumu {
  const b = birlikAl(state);
  const cag = state.cag;
  const h: BirlikHesabi = birlikHesapla(state, bg);
  const d: GucDokumu = gucHesapla(state, { enflasyon: bg.enflasyon });
  const er = erSayisi(state);
  const paylar = turPaylari(b);
  const gp = gorevPaylari(state);
  const gucParcasi = askerGucleri(state);
  const kk = askerRakipGucCarpani(state);
  const bonuslar = d.bonuslar.map((x) => ({
    kod: x.kod,
    ad: GUC_ETIKETLERI[x.kod] ?? { tr: x.kod, en: x.kod },
    yuzde: Math.round(x.deger * 1000) / 10,
    taraf: x.taraf,
  }));
  const yol = yolDali(state);
  const beklenenSeviye = doktrinBekleyenSeviye(state);
  const secilenDoktrin = b.doktrinler
    .map((id) => doktrinGetir(id))
    .filter((x): x is NonNullable<typeof x> => !!x)
    .map((x) => ({ id: x.id, simge: x.simge, ad: x.ad, seviye: x.seviye, acimasiz: x.acimasiz, etki: x.etki as Record<string, number> }));
  const k = state.ulke.savasta ? savasKarariHazirla(state) : null;
  return {
    er,
    limit: { komuta: komutaLimiti(state), kisla: kislaLimiti(state), kislaKademe: kislaKademesi(state), seferberlik: !!b.savas?.seferberlik, tavan: ER_TAVANI, asim: limitAsimEri(state) },
    yarali: { sayi: yaraliSayisi(state), saglam: er - yaraliSayisi(state), yillikIyilesme: Math.min(yaraliSayisi(state), Math.max(0, Math.round(b.yarali_hizi ?? 0))), sureYil: yaraliIyilesmeSuresi(state) },
    guc: {
      ham: Math.round(d.ham * 10) / 10,
      kalite: { ...b.kalite },
      kaliteCarpani: { dusuk: 1, orta: 1.5, yuksek: 2 },
      piyadePayi: Math.round(d.piyadePayi * 1000) / 1000,
      saldiriCarpani: Math.round(d.saldiriCarpani * 1000) / 1000,
      savunmaCarpani: Math.round(d.savunmaCarpani * 1000) / 1000,
      bonuslar,
      saldiri: Math.round(d.saldiri),
      savunma: Math.round(d.savunma),
      toplam: Math.round(d.guc),
    },
    rakipler: aktifRakipler(state).map((r) => ({ ad: r.ad, guc: Math.round(r.musteri * kk), husumet: Math.round(r.husumet) })),
    pay: Math.round(pazarPayiHesapla(state) * 1000) / 10,
    kalite: {
      sayilar: { ...b.kalite },
      hedef: b.hedef_kalite,
      kilitKalanYil: kilitKalan(state, b.kalite_kilit_bitis),
      ad: KALITE_ADLARI[b.hedef_kalite],
      adlar: KALITE_ADLARI,
      yukseltFiyat: { orta: r2(KALITE_FIYATI.orta * bg.giderEnflasyon), yuksek: r2(KALITE_FIYATI.yuksek * bg.giderEnflasyon) },
      techizat: techizatAdi(cag),
    },
    birlik: {
      seviye: b.birlik_seviye,
      seciliTurler: b.birlik_turler.slice(0, b.birlik_seviye),
      kilitKalanYil: kilitKalan(state, b.birlik_kilit_bitis),
      toplamPay: Object.values(paylar).reduce((t, x) => t + (x ?? 0), 0),
      seviyePaylari: BIRLIK_SEVIYE_PAYI,
      turler: TUR_SIRASI.map((id) => ({
        id,
        simge: TUR_TANIMLARI[id].simge,
        ad: turAdi(id, cag),
        saldiri: TUR_TANIMLARI[id].saldiri,
        savunma: TUR_TANIMLARI[id].savunma,
        ucret: r2(TUR_TANIMLARI[id].ucret * bg.giderEnflasyon),
        bakim: TUR_TANIMLARI[id].bakim,
        arti: TUR_TANIMLARI[id].arti,
        eksi: TUR_TANIMLARI[id].eksi,
        secili: id in paylar,
      })),
      kusatma: { seviye: b.kusatma_seviye, ad: kusatmaAdi(cag), bonuslar: KUSATMA_SALDIRI_BONUSU, fiyatlar: KUSATMA_ER_FIYATI.map((x) => r2(x * er * bg.giderEnflasyon)) },
    },
    talim: {
      seviye: Math.round(b.talim * 10) / 10,
      politika: b.talim_politikasi,
      gucYuzde: Math.round(Math.min(20, b.talim * TALIM_GUC_KATSAYISI * 100) * 10) / 10,
      kayipYuzde: Math.round(Math.min(15, b.talim * TALIM_KAYIP_KATSAYISI * 100) * 10) / 10,
      politikalar: TALIM_SIRASI.map((id) => ({
        id, ad: TALIM_TANIMLARI[id].ad, delta: TALIM_TANIMLARI[id].delta, tavan: TALIM_TANIMLARI[id].tavan, masraf: r2(TALIM_TANIMLARI[id].masraf * er * bg.giderEnflasyon), moral: TALIM_TANIMLARI[id].moral,
      })),
    },
    politikalar: {
      ganimetPayi: {
        secili: b.ganimet_payi,
        secenekler: GANIMET_SIRASI.map((id) => ({ id, ad: GANIMET_PAYI_TANIMLARI[id].ad, oran: GANIMET_PAYI_TANIMLARI[id].oran, moral: GANIMET_PAYI_TANIMLARI[id].moral })),
      },
      ton: { secili: b.ton, secenekler: TON_SIRASI.map((id) => ({ id, ad: TON_TANIMLARI[id].ad, aciklama: TON_TANIMLARI[id].aciklama })) },
    },
    moral: { deger: Math.round(b.moral), gucYuzde: Math.round(moralGucEtkisi(b.moral) * 100), sertlik: Math.round(b.sertlik) },
    gorevler: {
      slot: { kullanilan: gp.length, toplam: gorevSlotSayisi(state) },
      secili: [...b.gorevler],
      katalog: GOREVLER.map((g) => {
        const pay = gp.find((x) => x.gorev.id === g.id);
        const hs = h.gorevler.find((x) => x.id === g.id);
        return {
          id: g.id, simge: g.simge, ad: gorevAdi(g, cag), aciklama: g.aciklama, minEr: g.minEr, erBasi: r2(g.erBasi * bg.enflasyon),
          yalnizSavas: g.yalnizSavas, kullanilabilir: !g.yalnizSavas || !!state.ulke.savasta, aktif: !!pay?.aktif,
          erPayi: pay?.er ?? 0, gelir: r2(hs?.gelir ?? 0), ganimet: r2(hs?.ganimet ?? 0),
        };
      }),
    },
    doktrin: {
      secilen: secilenDoktrin,
      bekleyen: beklenenSeviye
        ? {
            seviye: beklenenSeviye,
            yol,
            secenekler: doktrinSecenekleri(beklenenSeviye, yol).map((x) => ({ id: x.id, simge: x.simge, ad: x.ad, kaynak: x.kaynak, acimasiz: x.acimasiz, etki: x.etki as Record<string, number> })),
          }
        : null,
    },
    savas: {
      aktif: !!state.ulke.savasta,
      arazi: b.savas?.arazi ?? null,
      araziAd: b.savas ? (cag === "Sanayi Devrimi" ? ARAZI_ADLARI[b.savas.arazi].sanayi : ARAZI_ADLARI[b.savas.arazi].orta) : null,
      dusmanTur: b.savas?.dusman_tur ?? null,
      dusmanOrani: b.savas?.dusman_orani ?? null,
      seferberlik: b.savas?.seferberlik ?? null,
      kanatZafer: b.savas?.kanat_zafer ?? 0,
      kanatYenilgi: b.savas?.kanat_yenilgi ?? 0,
      kararBekliyor: !!k && k.adim < k.adimlar.length,
      araziIhtimali: Math.round(ARAZI_TERCIH_IHTIMALI[rutbeIndeksi(state)] * 100),
    },
    kale: b.kale,
    emir: (() => {
      const e = state.ulke.savasta ? emirGetir(b.savas?.emir) : undefined;
      return e ? { ad: e.ad, simge: e.simge, aciklama: e.aciklama } : null;
    })(),
    kiralik: {
      aktif: (b.savas?.kiralik_er ?? 0) > 0,
      er: b.savas?.kiralik_er ?? 0,
      ucret: r2(Math.round(er * KIRALIK_ORAN) * KIRALIK_PESIN * bg.giderEnflasyon),
      mumkun: !!state.ulke.savasta && (b.savas?.kiralik_er ?? 0) === 0 && Math.round(er * KIRALIK_ORAN) > 0,
    },
    hesap: {
      soldAdi: state.ulke.savasta ? { tr: "Savaş ödeneği", en: "War allowance" } : maasAdi(state.cag, state.bolge),
      savasOdenegiMi: !!state.ulke.savasta,
      kaleGeliri: r2(h.kaleGeliri),
      kiralikMasrafi: r2(h.kiralikMasrafi),
      yagmaBrut: r2(h.yagmaBrut),
      sold: r2(h.sold), erBasiGelir: r2(h.erBasiGelir), gorevGeliri: r2(h.gorevGeliri), ganimetNet: r2(h.ganimetNet), devletPayi: r2(h.devletPayi), erPayi: r2(h.erPayi),
      toplamGelir: r2(h.toplamGelir), erMasrafi: r2(h.erMasrafi), erzak: r2(h.erzak), gorevMasrafi: r2(h.gorevMasrafi), kislaBakim: r2(h.kislaBakim),
      techizatBakim: r2(h.techizatBakim), yaraliGideri: r2(h.yaraliGideri), limitAsimGideri: r2(h.limitAsimGideri), kusatmaBakim: r2(h.kusatmaBakim), talimMasrafi: r2(h.talimMasrafi), toplamGider: r2(h.toplamGider), net: r2(h.net),
      barisGanimetTahmini: r2(d.guc * GANIMET_GUC_BIRIMI * 1.15 * bg.enflasyon * (1 - GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran)),
    },
    yol,
  };
  void gucParcasi;
  void KISLA_BAKIM;
  void KISLA_ER_LIMITI;
  void yolDoktrinKaynagi;
  void DOKTRINLER;
  void INISIYATIF_OYUNCU_SECER;
  void birlikBeklenenKar;
}

