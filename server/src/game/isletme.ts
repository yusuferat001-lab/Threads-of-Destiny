import { randomUUID } from "crypto";
import type {
  CharacterState,
  DonemEtkisi,
  IsletmeAday,
  IsletmeDokum,
  IsletmeDurumu,
  IsletmeFiyat,
  IsletmeHat,
  IsletmeUyari,
} from "../types";
import {
  type AdayTaslagi,
  type HatTanimi,
  type IsletmeProfili,
  type UrunKesimi,
  hatTanimiGetir,
  isletmeProfiliGetir,
  rolAdiGetir,
} from "../data/meslekProfilleri";
import { MESLEK_GUCU_TAVAN } from "../data/pazar";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";

/**
 * Meslek işletmesi motoru (2026-10, dikey dilim — Tüccar). Gelir artık maaş
 * formülü değil: oyuncunun kitlesi (meslek_gucu) × hat talebi × fiyat → satış;
 * satış − alım − depo masrafı = brüt kâr. Çalışan maaşları mevcut ekip gideri
 * olarak ayrıca düşer. Bu dosya bilerek stateManager'ı içe aktarmaz (döngüsel
 * bağımlılık olmasın); enflasyon/rütbe/çarpan gibi dış değerler `IsletmeBaglami`
 * ile dışarıdan gelir (stateManager.isletmeBaglami).
 */

export interface IsletmeBaglami {
  /** enflasyonCarpani(state). */
  enflasyon: number;
  /** Rütbeye bağlı satış fiyatı primi (S1 = 1.0). */
  fiyatPrimi: number;
  /** Kalıcı bonuslar (olay maas_carpani etiketi × yatkınlık × durum): talebe biner. */
  talepCarpani: number;
}

// ── Sayılar (simülasyonla ayarlanır; bkz. scripts/simulateIsletme.ts) ───────
export const DEPO_KAPASITE = [40, 80, 140, 220];
export const BOZULMA_ORANI = 0.1;
export const DEPO_MASRAFI_ORANI = 0.04;
export const BASLANGIC_STOK = 20;
export const BORC_ODEME_ORANI = 0.6;
export const CALISAN_TAVANI = 8;
export const ISLETME_TALEP_OLCEGI = 0.78;
/** Müşterinin bütçesi hatlar arasında paylaşılır: n açık hatta her birinin talebi 1/(1+0.6(n-1)) ile çarpılır. */
export const HAT_PAYLASIM = 0.6;
const SIPARIS_PAYI = 1.1;
const KITLE_KAYIP_ESIGI = 0.15;
const KITLE_KAYIP_CARPANI = 5;
const KITLE_KAYIP_TAVANI = 3;
const TALEP_GURULTUSU = 0.08;
const DUKKAN_TALEP_KADEME = 0.05;
const KERVAN_INDIRIM_KADEME = 0.04;
const KRIZ_PAHALI_TALEP = 0.6;

export const FIYAT_POLITIKASI: Record<IsletmeFiyat, { fiyat: number; talep: number }> = {
  ucuz: { fiyat: 0.85, talep: 1.35 },
  normal: { fiyat: 1, talep: 1 },
  pahali: { fiyat: 1.2, talep: 0.75 },
};

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
const r2 = (x: number) => Math.round(x * 100) / 100;
const aralikta = ([min, max]: [number, number]) => Math.round(min + Math.random() * (max - min));

export function isletmeAktif(state: CharacterState): boolean {
  return !!state.isletme && !!isletmeProfiliGetir(state.meslek, state.cag);
}

export function depoKapasitesi(is: IsletmeDurumu): number {
  return DEPO_KAPASITE[clamp(is.yatirimlar.depo ?? 0, 0, DEPO_KAPASITE.length - 1)];
}

export function toplamStok(is: IsletmeDurumu): number {
  return is.hatlar.reduce((t, h) => t + h.stok, 0);
}

export interface EkipEtkisi {
  alisIskonto: number;
  talepBonusu: number;
  bozulmaAzalmasi: number;
  taninirlik: number;
  calisanSayisi: number;
}

/** Çalışanların işletmeye toplam etkisi (gizli `gercekKalite` kullanılır, oyuncuya bulanık görünür). */
export function ekipEtkisi(state: CharacterState): EkipEtkisi {
  let alis = 0;
  let talep = 0;
  let bozulma = 0;
  let taninirlik = 0;
  for (const uye of state.ekip) {
    const k = uye.gercekKalite / 100;
    if (uye.rol_turu === "satin_alma") alis += k * 0.08;
    else if (uye.rol_turu === "satis") talep += k * 0.06;
    else if (uye.rol_turu === "yazi") bozulma += k * 0.3;
    taninirlik += uye.taninirlik ?? 0;
  }
  return {
    alisIskonto: Math.min(0.2, alis),
    talepBonusu: Math.min(0.2, talep),
    bozulmaAzalmasi: Math.min(0.5, bozulma),
    taninirlik,
    calisanSayisi: state.ekip.length,
  };
}

/** Aynı anda açık tutulabilecek hat sayısı: 1 + her 3 çalışan için 1 (en fazla 3). */
export function hatSlotSayisi(state: CharacterState): number {
  return Math.min(3, 1 + Math.floor(state.ekip.length / 3));
}

export interface KesimEtkisi {
  talep: number;
  fiyat: number;
}

function birlestir(e: DonemEtkisi, kesim: UrunKesimi): KesimEtkisi {
  if (kesim === "temel") return { talep: e.temelTalep, fiyat: e.temelFiyat };
  if (kesim === "luks") return { talep: e.luksTalep, fiyat: e.luksFiyat };
  return { talep: (e.temelTalep + e.luksTalep) / 2, fiyat: (e.temelFiyat + e.luksFiyat) / 2 };
}

/** Dönem × savaş × veba etkilerinin bir ürün kesimine toplam talep/fiyat çarpanı. */
export function kesimEtkisi(state: CharacterState, kesim: UrunKesimi): KesimEtkisi {
  const kaynaklar: DonemEtkisi[] = [];
  if (state.ulke.donem) kaynaklar.push(state.ulke.donem.etki);
  if (state.ulke.savasta && state.buyuk_savas?.etki) kaynaklar.push(state.buyuk_savas.etki);
  if (state.veba?.aktif && state.veba.etki) kaynaklar.push(state.veba.etki);
  let talep = 1;
  let fiyat = 1;
  for (const e of kaynaklar) {
    const k = birlestir(e, kesim);
    talep *= k.talep;
    fiyat *= k.fiyat;
  }
  return { talep, fiyat };
}

function krizliMi(state: CharacterState): boolean {
  const d = state.ulke.donem?.tur;
  return d === "kitlik" || d === "durgunluk" || !!state.ulke.savasta || !!state.veba?.aktif;
}

export interface HatHesabi {
  talep: number;
  birimFiyat: number;
  birimMaliyet: number;
  kesim: KesimEtkisi;
}

/** Bir hattın bu yılki beklenen talebi (gürültüsüz) ve birim fiyat/maliyeti. */
export function hatHesapla(state: CharacterState, hat: IsletmeHat, tanim: HatTanimi, b: IsletmeBaglami): HatHesabi {
  const is = state.isletme!;
  const ekip = ekipEtkisi(state);
  const kes = kesimEtkisi(state, tanim.kesim);
  const pol = FIYAT_POLITIKASI[hat.fiyat];
  const politikaTalep = hat.fiyat === "pahali" && krizliMi(state) ? KRIZ_PAHALI_TALEP : pol.talep;
  const savasTalep = tanim.savasTalep && state.ulke.savasta ? tanim.savasTalep : 1;
  const acikSayisi = Math.max(1, is.hatlar.filter((h) => h.acik).length + (hat.acik ? 0 : 1));
  const paylasim = 1 / (1 + HAT_PAYLASIM * (acikSayisi - 1));
  const dukkan = (1 + (is.yatirimlar.dukkan ?? 0) * DUKKAN_TALEP_KADEME) * paylasim;
  const kervan = 1 - (is.yatirimlar.kervan ?? 0) * KERVAN_INDIRIM_KADEME;
  const talep =
    Math.max(0, state.meslek_gucu) *
    tanim.talepTabani *
    kes.talep *
    politikaTalep *
    savasTalep *
    b.talepCarpani *
    (1 + ekip.talepBonusu) *
    dukkan *
    ISLETME_TALEP_OLCEGI;
  return {
    talep,
    birimFiyat: tanim.birimFiyat * b.enflasyon * kes.fiyat * pol.fiyat * b.fiyatPrimi,
    birimMaliyet: tanim.birimMaliyet * b.enflasyon * kes.fiyat * (1 - ekip.alisIskonto) * kervan,
    kesim: kes,
  };
}

export function hatKilitNedeni(state: CharacterState, tanim: HatTanimi): "rutbe" | null {
  return state.rutbe_seviye < tanim.minRutbe ? "rutbe" : null;
}

// ── Aday havuzu ─────────────────────────────────────────────────────────────
function adayUret(state: CharacterState, profil: IsletmeProfili, taslak: AdayTaslagi, b: IsletmeBaglami, haric: string[]): IsletmeAday {
  const kalite = aralikta(taslak.kalite);
  const sadakat = aralikta(taslak.sadakat);
  const taninirlik = aralikta(taslak.taninirlik);
  const sapma = Math.round((Math.random() - 0.5) * 20);
  const tahminiMin = clamp(kalite + sapma - 12, 0, 100);
  const tahminiMax = clamp(kalite + sapma + 12, 0, 100);
  // Ucuz = sadakatsiz: düşük sadakatli aday aynı kalitede daha az maaş ister.
  const maas = r2((0.8 + kalite / 40) * (0.75 + sadakat / 200) * b.enflasyon);
  return {
    id: randomUUID(),
    isim: rastgeleBirIsimSec(state.cag, state.bolge, [state.dost_adi, state.rakip_adi, state.es_adi ?? "", state.isim ?? "", ...haric]),
    rol: rolAdiGetir(profil, taslak.rolTuru).tr,
    rolTuru: taslak.rolTuru,
    gecmis: taslak.gecmis,
    sadakat,
    gercekKalite: kalite,
    tahminiMin,
    tahminiMax,
    taninirlik,
    maas,
    ucret: maas,
  };
}

/** Her yıl yenilenen 3-4 rastgele aday (havuzun tamamı hiçbir zaman birden görünmez). */
export function adaylariYenile(state: CharacterState, b: IsletmeBaglami): void {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil) return;
  const adet = 3 + Math.floor(Math.random() * 2);
  const havuz = [...profil.adaylar];
  const adaylar: IsletmeAday[] = [];
  const kullanilan: string[] = state.ekip.map((e) => e.isim);
  while (adaylar.length < adet && havuz.length > 0) {
    const i = Math.floor(Math.random() * havuz.length);
    const [taslak] = havuz.splice(i, 1);
    const aday = adayUret(state, profil, taslak, b, kullanilan);
    kullanilan.push(aday.isim);
    adaylar.push(aday);
  }
  is.adaylar = adaylar;
  is.aday_yili = state.yil;
}

// ── Başlangıç ───────────────────────────────────────────────────────────────
export function isletmeBaslat(state: CharacterState, b: IsletmeBaglami): void {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil) {
    state.isletme = null;
    return;
  }
  const ilk = profil.hatlar.find((h) => h.minRutbe <= 1) ?? profil.hatlar[0];
  const hatlar: IsletmeHat[] = profil.hatlar.map((h) => ({
    id: h.id,
    acik: h.id === ilk.id,
    stok: h.id === ilk.id ? BASLANGIC_STOK : 0,
    otomatik: true,
    siparis: 0,
    fiyat: "normal",
    son_talep: 0,
    son_satis: 0,
  }));
  state.isletme = {
    hatlar,
    yatirimlar: {},
    // İlk mal veresiye gelir: sattıkça kapanır, faizsiz.
    tedarikci_borcu: r2(BASLANGIC_STOK * ilk.birimMaliyet * b.enflasyon),
    son_dokum: null,
    adaylar: [],
    aday_yili: state.yil,
  };
  adaylariYenile(state, b);
}

/** Eski kayıt / yeni meslek: işletme yoksa kurar; hatlar profildeki yeni hatlarla tamamlanır. */
export function isletmeHazirla(state: CharacterState, b: IsletmeBaglami): void {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil) {
    if (state.isletme) state.isletme = null;
    return;
  }
  if (!state.isletme) {
    isletmeBaslat(state, b);
    return;
  }
  const is = state.isletme;
  for (const h of profil.hatlar) {
    if (!is.hatlar.some((x) => x.id === h.id)) {
      is.hatlar.push({ id: h.id, acik: false, stok: 0, otomatik: true, siparis: 0, fiyat: "normal", son_talep: 0, son_satis: 0 });
    }
  }
}

/** Başlangıç beklenen yıllık brüt kâr (ilk yıl dökümü olmadan "yıllık kazanç" göstergesi için). */
export function beklenenBrutKar(state: CharacterState, b: IsletmeBaglami): number {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil) return 0;
  let kar = 0;
  for (const hat of is.hatlar.filter((h) => h.acik).slice(0, hatSlotSayisi(state))) {
    const tanim = hatTanimiGetir(profil, hat.id);
    if (!tanim) continue;
    const h = hatHesapla(state, hat, tanim, b);
    kar += h.talep * (h.birimFiyat - h.birimMaliyet);
  }
  return kar;
}

/** hesaplaMaasYillik'in Tüccar karşılığı: geçen yılın brüt kârı, yoksa beklenen kâr (en az 1). */
export function isletmeGelirTahmini(state: CharacterState, b: IsletmeBaglami): number {
  const is = state.isletme;
  if (!is) return 1;
  const kar = is.son_dokum ? is.son_dokum.brutKar : beklenenBrutKar(state, b);
  return Math.max(1, r2(kar));
}

// ── Yıllık işleme ───────────────────────────────────────────────────────────
export interface IsletmeYilSonucu {
  net: number;
  dokum: IsletmeDokum;
}

export function isletmeYilIsle(state: CharacterState, b: IsletmeBaglami): IsletmeYilSonucu {
  const is = state.isletme!;
  const profil = isletmeProfiliGetir(state.meslek, state.cag)!;
  const ekip = ekipEtkisi(state);
  const kapasite = depoKapasitesi(is);
  const uyarilar: IsletmeUyari[] = [];
  const slot = hatSlotSayisi(state);
  const acik = is.hatlar.filter((h) => h.acik && !!hatTanimiGetir(profil, h.id)).slice(0, slot);

  let satis = 0;
  let alim = 0;
  let toplamTalep = 0;
  let toplamKarsilanamayan = 0;
  const satirlar: IsletmeDokum["hatlar"] = [];

  for (const hat of acik) {
    const tanim = hatTanimiGetir(profil, hat.id)!;
    const hs = hatHesapla(state, hat, tanim, b);
    const talep = hs.talep * (1 - TALEP_GURULTUSU + Math.random() * 2 * TALEP_GURULTUSU);

    const hedef = hat.otomatik ? Math.ceil((hat.son_talep > 0 ? hat.son_talep : talep) * SIPARIS_PAYI - hat.stok) : hat.siparis;
    const bosYer = Math.max(0, kapasite - toplamStok(is));
    const siparis = clamp(Math.floor(hedef), 0, bosYer);
    hat.stok += siparis;
    alim += siparis * hs.birimMaliyet;

    const talepAdet = Math.round(talep);
    const satilan = Math.min(hat.stok, talepAdet);
    hat.stok -= satilan;
    satis += satilan * hs.birimFiyat;

    toplamTalep += talepAdet;
    toplamKarsilanamayan += Math.max(0, talepAdet - satilan);
    if (talepAdet > 0 && talepAdet - satilan > talepAdet * KITLE_KAYIP_ESIGI) uyarilar.push({ kod: "stok_bitti", hat: hat.id });
    satirlar.push({ id: hat.id, talep: talepAdet, satilan, alinan: siparis, stokSonu: hat.stok });
    hat.son_talep = talepAdet;
    hat.son_satis = satilan;
  }

  // Kapalı hatlar satmaz ama stoğu durur; bozulma ve depo masrafı herkese işler.
  let depoMasrafi = 0;
  const bozulma = BOZULMA_ORANI * (1 - ekip.bozulmaAzalmasi);
  for (const hat of is.hatlar) {
    const tanim = hatTanimiGetir(profil, hat.id);
    if (!tanim) continue;
    const kes = kesimEtkisi(state, tanim.kesim);
    depoMasrafi += hat.stok * DEPO_MASRAFI_ORANI * tanim.birimMaliyet * b.enflasyon * kes.fiyat;
    hat.stok = Math.round(hat.stok * (1 - bozulma));
    if (hat.stok > 0 && !hat.acik && hat.stok >= 20) uyarilar.push({ kod: "fazla_stok", hat: hat.id });
  }

  // Kitle: karşılanamayan talep müşteriyi rakibe kaçırır; memnun müşteri + şöhret + tanınırlık yenisini getirir.
  const eskiKitle = state.meslek_gucu;
  const karsilanamayanOrani = toplamTalep > 0 ? toplamKarsilanamayan / toplamTalep : 0;
  let kitleDegisimi = 0;
  if (karsilanamayanOrani > KITLE_KAYIP_ESIGI) {
    kitleDegisimi = -Math.min(KITLE_KAYIP_TAVANI, (karsilanamayanOrani - KITLE_KAYIP_ESIGI) * KITLE_KAYIP_CARPANI);
    const rakip = state.rakipler.find((r) => !r.yenildi);
    if (rakip) rakip.guc = clamp(rakip.guc + -kitleDegisimi * 0.3, 0, 100);
    uyarilar.push({ kod: "kitle_kaybi" });
  } else if (satis > 0) {
    kitleDegisimi = 0.3 + Math.max(0, (state.un - 10) / 140) + ekip.taninirlik / 1600;
  }
  state.meslek_gucu = clamp(r2(state.meslek_gucu + kitleDegisimi), 0, MESLEK_GUCU_TAVAN);

  const brutKar = r2(satis - alim - depoMasrafi);

  // Tedarikçi veresiyesi: kârdan en fazla %60'ı yıllık kapanır.
  let borcOdeme = 0;
  if (is.tedarikci_borcu > 0 && brutKar > 0) {
    borcOdeme = r2(Math.min(is.tedarikci_borcu, brutKar * BORC_ODEME_ORANI));
    is.tedarikci_borcu = r2(is.tedarikci_borcu - borcOdeme);
  }
  let net = r2(brutKar - borcOdeme);

  // Sadakatsiz çalışan yılda küçük bir ihtimalle ayrılır, giderken kasaya uzanır.
  for (const uye of [...state.ekip]) {
    if (uye.sadakat >= 40) continue;
    if (Math.random() < (40 - uye.sadakat) / 500) {
      state.ekip = state.ekip.filter((e) => e.id !== uye.id);
      net = r2(net - uye.maas * 1.5);
      uyarilar.push({ kod: "calisan_ayrildi", isim: uye.isim });
    }
  }

  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(satis),
    alim: r2(alim),
    depoMasrafi: r2(depoMasrafi),
    brutKar,
    borcOdeme,
    net,
    kitleDegisimi: r2(state.meslek_gucu - eskiKitle),
    hatlar: satirlar,
    uyarilar,
  };
  is.son_dokum = dokum;
  if (state.yil - is.aday_yili >= 1) adaylariYenile(state, b);
  return { net, dokum };
}

