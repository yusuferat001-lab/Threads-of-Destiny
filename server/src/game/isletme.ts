import { randomUUID } from "crypto";
import type {
  CharacterState,
  DonemEtkisi,
  EkipUyesi,
  IsletmeAday,
  IsletmeDokum,
  IsletmeDurumu,
  IsletmeFiyat,
  IsletmeHat,
  IsletmeRolTuru,
  IsletmeStokHedefi,
  IsletmeUyari,
} from "../types";
import {
  ADAY_TIP_ARALIKLARI,
  type AdayTaslagi,
  type HatTanimi,
  type IsletmeProfili,
  type UrunKesimi,
  type YatirimEtkisi,
  hatTanimiGetir,
  isletmeProfiliGetir,
  rolAdiGetir,
} from "../data/meslekProfilleri";
import {
  ALIM_ORANI,
  sabitMusteriArtisi,
  aktifRakip,
  aktifRakipler,
  musteriSayisi,
  pazarPayiHesapla,
  rakipSaldiriKademesi,
  rastgeleSaldiriYili,
  saldiriTuruSec,
  FIZIKSEL_SALDIRILAR,
  SALDIRI_HASARLARI,
  RAKIP_BUYUK_SALDIRI_ORANI,
  RAKIP_IKINCI_HASAR_CARPANI,
  SIZMA_HASAR_CARPANI,
  SIZMA_SADAKAT_KAYBI,
  sohretPayBuyumesi,
} from "../data/pazar";
import { pazarBuyumeVarsayilan, VEBA_TOPARLANMA_ORAN, VEBA_TOPARLANMA_YIL } from "../data/dunyaDonemleri";
import { musteriKaydir, musteriAktar, pazarOlcekle, piyasaCarpani, rakipGrubu } from "./piyasa";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";

/**
 * Meslek işletmesi motoru (§45). Gelir = oyuncunun müşterisi (pazar payı × toplam pazar) ×
 * hat talebi × fiyat → satış; satış − alım − depo masrafı = brüt kâr; brüt kârdan vergi kesilir.
 * Çalışan maaşları mevcut ekip gideri olarak ayrıca düşer. Bu dosya bilerek stateManager'ı
 * içe aktarmaz (döngüsel bağımlılık olmasın); enflasyon/rütbe/çarpan gibi dış değerler
 * `IsletmeBaglami` ile dışarıdan gelir (stateManager.isletmeBaglami).
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
/** Depo kademeleri (0..3): kapasite, çürüme oranı, sabit yıllık bakım (enflasyonsuz). Depo yılda BİR kez dolar. */
export const DEPO_KAPASITE = [100, 220, 420, 750];
export const CURUME_ORANLARI = [0.15, 0.12, 0.1, 0.08];
export const DEPO_BAKIM = [4, 10, 18, 30];
export const BASLANGIC_STOK = 20;
export const BORC_ODEME_ORANI = 0.6;
/** Rütbe S1..S5 → en fazla toplam çalışan. */
export const CALISAN_LIMITLERI = [2, 3, 5, 6, 7];
/** Müşterinin bütçesi hatlar arasında paylaşılır: n açık hatta her birinin talebi 1/(1+0.6(n-1)) ile çarpılır. */
export const HAT_PAYLASIM = 0.6;
/** Karşılanamayan talep bu orandan büyükse müşteri kaybı: min(%12, (oran−eşik)×%30) kendi müşterisinin yüzdesi (sıcak ürünse ×2). */
const KITLE_KAYIP_ESIGI = 0.15;
const KITLE_KAYIP_CARPANI = 0.3;
const KITLE_KAYIP_TAVANI = 0.12;
const TALEP_GURULTUSU = 0.08;
/** Yüzdelik müşteri büyümesi pay bu eşiğe yaklaştıkça sıfıra iner. */
const PAY_DOYMA_ESIGI = 0.68;
const DUKKAN_TALEP_KADEME = 0.1;
/** Maliyet indirimleri ÇARPIMSAL birleşir (tavan yok): maliyet × (1−a)(1−b)(1−c)…; her kaynak kendi payını düşer, yığıldıkça getirisi azalır. */
const KERVAN_INDIRIM_KADEME = 0.05;
const GUMRUK_INDIRIMI = 0.1;
const MUAFIYET_INDIRIMI = 0.08;
const TEZGAH_URETIM_KADEME = 0.6;
const TANITIM_PAY_KADEME = 0.01;
/** Veba sürerken müşteri/inanan büyümesinin pozitif kısımları bu çarpanla kısılır (v10). */
export const VEBA_ARTIS_CARPANI = 0.3;
/** Perakende fiyatı toptan fiyat şokunu yalnız bu oranda izler: kıtlıkta mal pahalanır ama müşterinin alım gücü yetmez. */
const SATIS_FIYAT_UYUMU = 0.6;

// Üretim modu (Zanaatkâr): yıllık üretim tavanı = taban × (1 + ana rol bonusları + tezgâh yüzdesi + ruhsat).
export const URETIM_TABAN = 80;
/** Üretim modunda ana rol bonusunun talebe yansıyan payı (kalanı üretim tavanına gider). */
export const URETIM_ANA_TALEP_PAYI = 0.55;
export const URETIM_METRIK_CARPANI = 0.2;

// Lonca aidatı: satışın %3'ü (v8.2), brüt kârdan vergiden önce düşer.
export const LONCA_AIDATI_ORANI = 0.03;

// Vergi
export const VERGI_TABAN_ORANI = 0.25;
export const VERGI_SAVAS_EKI = 0.1;
export const VERGI_KOTU_ILISKI_EKI = 0.03;
export const VERGI_KOTU_ILISKI_ESIGI = 25;

// Sadakat / çalışan gelişimi
export const SADAKAT_YILLIK_ARTIS = 0.7;
export const YETENEK_YILLIK_ARTIS = 0.4;
export const SADAKAT_RISK_ESIGI = 45;
export const SADIK_ESIGI = 75;
export const SADIK_BONUS = 1.05;
export const SADAKAT_OLAY_COOLDOWN_YIL = 3;

// Dış hırsızlık
export const HIRSIZLIK_COOLDOWN_YIL = 3;
export const GUVENLIK_YATIRIM_KORUMA = [0, 0.17, 0.34, 0.5];
export const OTORITE_KORUMA_ESIGI = 70;
export const OTORITE_KORUMA = 0.1;

export interface FiyatPolitikasi {
  /** Satış fiyatı çarpanı. */
  fiyat: number;
  /** Talep çarpanı. */
  talep: number;
  /** Krizde (kıtlık/durgunluk/savaş/veba) talep çarpanı (yoksa `talep`). */
  krizTalep?: number;
  /** G'nin yıllık yüzde değişimi (kesir). */
  pay: number;
}
export const FIYAT_POLITIKASI: Record<IsletmeFiyat, FiyatPolitikasi> = {
  eksi20: { fiyat: 0.8, talep: 1.45, pay: 0.03 },
  eksi10: { fiyat: 0.9, talep: 1.2, pay: 0.015 },
  normal: { fiyat: 1, talep: 1, pay: 0 },
  arti10: { fiyat: 1.1, talep: 0.88, krizTalep: 0.8, pay: -0.01 },
  arti20: { fiyat: 1.2, talep: 0.7, krizTalep: 0.55, pay: -0.03 },
};
export const FIYATLAR: IsletmeFiyat[] = ["eksi20", "eksi10", "normal", "arti10", "arti20"];

/** Stok hedefi: beklenen talebin katı; "dolu" depoyu doldurur (null). */
export const STOK_HEDEFI_ORANLARI: Record<IsletmeStokHedefi, number | null> = {
  cokaz: 0.75,
  az: 0.95,
  normal: 1.15,
  fazla: 1.5,
  dolu: null,
};
export const STOK_HEDEFLERI: IsletmeStokHedefi[] = ["cokaz", "az", "normal", "fazla", "dolu"];

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
const r2 = (x: number) => Math.round(x * 100) / 100;
const aralikta = ([min, max]: [number, number]) => Math.round(min + Math.random() * (max - min));
const araliktaOnd = ([min, max]: [number, number]) => min + Math.random() * (max - min);

export function isletmeAktif(state: CharacterState): boolean {
  return !!state.isletme && !!isletmeProfiliGetir(state.meslek, state.cag);
}

export function depoKademesi(is: IsletmeDurumu): number {
  return clamp(is.yatirimlar.depo ?? 0, 0, DEPO_KAPASITE.length - 1);
}
export function depoKapasitesi(is: IsletmeDurumu): number {
  return DEPO_KAPASITE[depoKademesi(is)];
}
export function curumeOrani(is: IsletmeDurumu): number {
  return CURUME_ORANLARI[depoKademesi(is)];
}
export function depoBakimMasrafi(is: IsletmeDurumu, enflasyon: number): number {
  return r2(DEPO_BAKIM[depoKademesi(is)] * enflasyon);
}
export function toplamStok(is: IsletmeDurumu): number {
  return is.hatlar.reduce((t, h) => t + h.stok, 0);
}
export function stokHedefiGetir(is: IsletmeDurumu): IsletmeStokHedefi {
  return is.stok_hedefi ?? "normal";
}

/** Kademeye bağlı toplam çalışan limiti (rol/güvenlik için ayrı sınır yok). */
export function calisanLimiti(state: CharacterState): number {
  return CALISAN_LIMITLERI[clamp((state.rutbe_seviye ?? 1) - 1, 0, CALISAN_LIMITLERI.length - 1)];
}

/** Aynı anda açık tutulabilecek hat sayısı: 1 + her 3 çalışan için 1 (en fazla 3). */
export function hatSlotSayisi(state: CharacterState): number {
  return Math.min(3, 1 + Math.floor(state.ekip.length / 3));
}

// ── Çalışanlar ──────────────────────────────────────────────────────────────
export interface EkipBonuslari {
  /** Ana rol: Tüccar'da talep (satış), Zanaatkâr'da üretim tavanı bonusu (toplam, kesir). */
  ana: number;
  /** Alış / hammadde maliyeti indirimi (kesir, çalışanların çarpımsal toplamı: 1 − Π(1−dᵢ)). */
  maliyet: number;
  /** Çalışanlardan gelen maliyet çarpanı Π(1−dᵢ) (1 = indirim yok). */
  maliyetCarpani: number;
  /** Pazar payı (G) yıllık büyüme bonusu (kesir). */
  musteri: number;
  /** Güvenlik çalışanlarından gelen Koruma. */
  koruma: number;
  calisanSayisi: number;
}

/** Sadık (güncel sadakat ≥75) çalışanın bonusu ×1,05. Bonuslar GÜNCEL yeteneğe göre, düz toplanır. */
function sadikCarpani(uye: EkipUyesi): number {
  return uye.sadakat >= SADIK_ESIGI ? SADIK_BONUS : 1;
}

export function calisanBonusu(uye: EkipUyesi): { tur: IsletmeRolTuru; deger: number } | null {
  if (!uye.rol_turu) return null;
  const y = clamp(uye.gercekKalite, 0, 100) / 100;
  const k = sadikCarpani(uye);
  switch (uye.rol_turu) {
    case "ana":
      return { tur: "ana", deger: (0.05 + 0.35 * y) * k };
    case "maliyet":
      return { tur: "maliyet", deger: (0.02 + 0.1 * y) * k };
    case "musteri":
      return { tur: "musteri", deger: (0.01 + 0.05 * y) * k };
    case "guvenlik":
      return { tur: "guvenlik", deger: (0.06 + 0.6 * y) * k };
    default:
      return null;
  }
}

/** Çalışanların işletmeye toplam etkisi (ana/müşteri/koruma düz toplanır; maliyet indirimi çarpımsal birleşir). */
export function ekipBonuslari(state: CharacterState): EkipBonuslari {
  const sonuc: EkipBonuslari = { ana: 0, maliyet: 0, maliyetCarpani: 1, musteri: 0, koruma: 0, calisanSayisi: state.ekip.length };
  for (const uye of state.ekip) {
    const b = calisanBonusu(uye);
    if (!b) continue;
    if (b.tur === "ana") sonuc.ana += b.deger;
    else if (b.tur === "maliyet") sonuc.maliyetCarpani *= 1 - b.deger;
    else if (b.tur === "musteri") sonuc.musteri += b.deger;
    else sonuc.koruma += b.deger;
  }
  sonuc.maliyet = 1 - sonuc.maliyetCarpani;
  return sonuc;
}

/** Koruma (0-1): güvenlik çalışanları + güvenlik yatırımı + otoritenin "yerel polis" desteği (ilişki ≥70'te +0,10). */
export function korumaHesapla(state: CharacterState): { calisan: number; yatirim: number; otorite: number; toplam: number } {
  const is = state.isletme;
  const calisan = ekipBonuslari(state).koruma;
  const yatirim = GUVENLIK_YATIRIM_KORUMA[clamp(is?.yatirimlar.guvenlik ?? 0, 0, GUVENLIK_YATIRIM_KORUMA.length - 1)];
  const otorite = (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI ? OTORITE_KORUMA : 0;
  return { calisan, yatirim, otorite, toplam: Math.min(1, calisan + yatirim + otorite) };
}

/** Çalışan maaşı çarpanı (v8.2: +%15 → v8.4: +%7). */
export const MAAS_CARPANI = 1.0;

/** Giriş seviyesine (Y, S) göre enflasyonsuz yıllık maaş tabanı. */
export function maasTabani(yetenek: number, sadakat: number): number {
  return r2(MAAS_CARPANI * (1.2 + 0.02 * yetenek + 0.01 * sadakat + 0.0004 * yetenek * sadakat));
}

/** Her çalışanın güncel maaşını `maas_taban × güncel enflasyon` ile yeniler (yeni adaylar ve mevcutlar). */
export function calisanMaaslariniGuncelle(state: CharacterState, enflasyon: number): void {
  for (const uye of state.ekip) {
    if (uye.maas_taban === undefined) continue;
    uye.maas = r2(uye.maas_taban * enflasyon);
  }
}

/** Çalışan işletmede çalıştıkça gelişir: güncel yetenek +0,4, güncel sadakat +0,7 (tavan 100). */
function calisanlariGelistir(state: CharacterState): void {
  for (const uye of state.ekip) {
    if (!uye.rol_turu) continue;
    uye.gercekKalite = clamp(uye.gercekKalite + YETENEK_YILLIK_ARTIS, 0, 100);
    uye.sadakat = clamp(uye.sadakat + SADAKAT_YILLIK_ARTIS, 0, 100);
    uye.tahminiMin = uye.gercekKalite;
    uye.tahminiMax = uye.gercekKalite;
  }
}

// ── Dönem / sıcak ürün / imtiyaz yardımcıları ───────────────────────────────
export function imtiyazAktifMi(state: CharacterState, id: string): boolean {
  const bitis = state.isletme?.imtiyazlar?.[id];
  return typeof bitis === "number" && state.yil <= bitis;
}

function karisim(tohum: number, tuz: number): number {
  let h = (tohum * 2654435761 + tuz * 40503) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519) >>> 0;
  return h >>> 0;
}

/**
 * Dönemin "sıcak ürünü": bolluk → lüks bir ürün, kıtlık → temel bir ürün, savaş → savaşta talebi artan ürün.
 * Dönem/savaş başlangıç yılından deterministik türetilir (state alanı gerekmez). Yoksa null.
 */
export function sicakUrunHatId(state: CharacterState, profil: IsletmeProfili): string | null {
  let havuz: HatTanimi[] = [];
  let tohum = 0;
  if (state.ulke.savasta && state.buyuk_savas) {
    havuz = profil.hatlar.filter((h) => h.savasTalep);
    if (havuz.length === 0) havuz = profil.hatlar.filter((h) => h.kesim === "orta");
    tohum = state.buyuk_savas.baslangicYili;
  } else if (state.ulke.donem?.tur === "bolluk") {
    havuz = profil.hatlar.filter((h) => h.kesim === "luks");
    tohum = state.ulke.donem.baslangicYili;
  } else if (state.ulke.donem?.tur === "kitlik") {
    havuz = profil.hatlar.filter((h) => h.kesim === "temel");
    tohum = state.ulke.donem.baslangicYili;
  }
  if (havuz.length === 0) return null;
  return havuz[karisim(tohum, state.meslek.length) % havuz.length].id;
}

export const SICAK_URUN_TALEP = 1.3;
export const SICAK_URUN_FIYAT = 1.08;

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

/** Veba bittikten sonra VEBA_TOPARLANMA_YIL boyunca toparlanma sürüyor mu (savaş/veba yokken pazar yılda +%2). */
export function vebaToparlanmasindaMi(state: CharacterState): boolean {
  return (
    state.son_veba_bitis_yili != null &&
    !state.veba?.aktif &&
    state.yil - state.son_veba_bitis_yili < VEBA_TOPARLANMA_YIL
  );
}

/** Toplam pazarın bu yılki değişimi (kesir): veba > savaş > veba sonrası toparlanma > dönem. */
export function pazarBuyumeOrani(state: CharacterState): number {
  if (state.veba?.aktif) return state.veba.etki?.pazarBuyume ?? pazarBuyumeVarsayilan("veba");
  if (state.ulke.savasta) return state.buyuk_savas?.etki?.pazarBuyume ?? pazarBuyumeVarsayilan("savas");
  if (vebaToparlanmasindaMi(state)) return VEBA_TOPARLANMA_ORAN;
  const d = state.ulke.donem;
  if (d) return d.etki.pazarBuyume ?? pazarBuyumeVarsayilan(d.tur);
  return 0.02;
}

/** Üretim modundaki mesleklerde yıllık üretim tavanı; ticaret modunda null (sınırsız satın alma). */
export function uretimTavani(state: CharacterState): number | null {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  const is = state.isletme;
  if (!profil || !is || profil.mod !== "uretim") return null;
  const bon = ekipBonuslari(state);
  const tezgah = clamp(is.yatirimlar.tezgah ?? 0, 0, 3) * TEZGAH_URETIM_KADEME;
  const ruhsat = imtiyazAktifMi(state, "atolye_ruhsati") ? 0.1 : 0;
  const taban = URETIM_TABAN + Math.max(0, state.uretim_kapasitesi ?? 0) * URETIM_METRIK_CARPANI;
  return Math.floor(taban * (1 + bon.ana + tezgah + ruhsat));
}

export function yatirimKademesi(state: CharacterState, etki: YatirimEtkisi): number {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  const is = state.isletme;
  if (!profil || !is) return 0;
  let kademe = 0;
  for (const y of profil.yatirimlar) if (y.etki === etki) kademe += is.yatirimlar[y.id] ?? 0;
  return kademe;
}

/** Yatırımlardan gelen yıllık pazar payı (G) büyümesi (kesir). */
export function tanitimBuyumesi(state: CharacterState): number {
  return yatirimKademesi(state, "pazar") * TANITIM_PAY_KADEME;
}

// ── Hat hesabı ──────────────────────────────────────────────────────────────
export interface HatHesabi {
  talep: number;
  birimFiyat: number;
  birimMaliyet: number;
  kesim: KesimEtkisi;
  sicak: boolean;
}

/** Bir hattın bu yılki beklenen talebi (gürültüsüz) ve birim fiyat/maliyeti. */
export function hatHesapla(state: CharacterState, hat: IsletmeHat, tanim: HatTanimi, b: IsletmeBaglami): HatHesabi {
  const is = state.isletme!;
  const profil = isletmeProfiliGetir(state.meslek, state.cag)!;
  const bon = ekipBonuslari(state);
  const kes = kesimEtkisi(state, tanim.kesim);
  const pol = FIYAT_POLITIKASI[hat.fiyat] ?? FIYAT_POLITIKASI.normal;
  const politikaTalep = pol.krizTalep !== undefined && krizliMi(state) ? pol.krizTalep : pol.talep;
  const savasTalep = tanim.savasTalep && state.ulke.savasta ? tanim.savasTalep : 1;
  const sicak = sicakUrunHatId(state, profil) === hat.id;
  const acikSayisi = Math.max(1, is.hatlar.filter((h) => h.acik).length + (hat.acik ? 0 : 1));
  const paylasim = 1 / (1 + HAT_PAYLASIM * (acikSayisi - 1));
  const uretimModu = profil.mod === "uretim";
  // Ticaret modunda ana rol talebi (satışı) artırır; üretim modunda üretim tavanını (uretimTavani).
  const anaTalep = uretimModu ? 1 + bon.ana * URETIM_ANA_TALEP_PAYI : 1 + bon.ana;
  const dukkan = (1 + yatirimKademesi(state, "talep") * DUKKAN_TALEP_KADEME) * (imtiyazAktifMi(state, "pazar_imtiyazi") || imtiyazAktifMi(state, "kutsal_gun_imtiyazi") ? 1.1 : 1) * paylasim;
  const talep =
    musteriSayisi(state) *
    ALIM_ORANI *
    tanim.talepTabani *
    kes.talep *
    politikaTalep *
    savasTalep *
    (sicak ? SICAK_URUN_TALEP : 1) *
    b.talepCarpani *
    piyasaCarpani(state, "talep") *
    anaTalep *
    dukkan;
  const tekel = is.tekel_hat === hat.id && imtiyazAktifMi(state, "tekel_ruhsati") ? 1.1 : 1;
  // Maliyet indirimleri çarpımsal: çalışanlar × tedarik yatırımı (kademe başı) × gümrük/hammadde anlaşması × imtiyaz.
  const maliyetCarpani =
    bon.maliyetCarpani *
    Math.pow(1 - KERVAN_INDIRIM_KADEME, yatirimKademesi(state, "alis")) *
    (state.yil <= (is.gumruk_indirim_bitis ?? -1) ? 1 - GUMRUK_INDIRIMI : 1) *
    (imtiyazAktifMi(state, "gumruk_muafiyeti") || imtiyazAktifMi(state, "hammadde_tahsisi") || imtiyazAktifMi(state, "vakif_muafiyeti") ? 1 - MUAFIYET_INDIRIMI : 1);
  return {
    talep,
    birimFiyat:
      tanim.birimFiyat *
      b.enflasyon *
      (1 + (kes.fiyat - 1) * SATIS_FIYAT_UYUMU) *
      pol.fiyat *
      b.fiyatPrimi *
      (sicak ? SICAK_URUN_FIYAT : 1) *
      tekel,
    birimMaliyet: tanim.birimMaliyet * b.enflasyon * kes.fiyat * maliyetCarpani * piyasaCarpani(state, "alis_maliyeti"),
    kesim: kes,
    sicak,
  };
}

export function hatKilitNedeni(state: CharacterState, tanim: HatTanimi): "rutbe" | null {
  return state.rutbe_seviye < tanim.minRutbe ? "rutbe" : null;
}

// ── Aday havuzu ─────────────────────────────────────────────────────────────
function adayUret(
  state: CharacterState,
  profil: IsletmeProfili,
  taslak: AdayTaslagi,
  haric: string[]
): IsletmeAday {
  const tip = ADAY_TIP_ARALIKLARI[taslak.tip];
  const yetenek = aralikta(tip.y);
  const sadakat = aralikta(tip.s);
  return {
    id: randomUUID(),
    isim: rastgeleBirIsimSec(state.cag, state.bolge, [state.dost_adi, state.rakip_adi, state.es_adi ?? "", state.isim ?? "", ...haric]),
    rol: rolAdiGetir(profil, taslak.rolTuru).tr,
    rolTuru: taslak.rolTuru,
    tip: taslak.tip,
    gecmis: taslak.gecmis,
    yetenek,
    sadakat,
    maas_taban: maasTabani(yetenek, sadakat),
  };
}

function karistir<T>(dizi: T[]): T[] {
  const a = [...dizi];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const ADAY_SAYISI = 6;
export const ADAY_ANA_SAYISI = 3;
export const ADAY_YENILEME_YIL = 3;

/** 6 aday görünür: tam 3'ü ana rol, 3'ü diğer rollerden; liste 3 yılda bir yenilenir. */
export function adaylariYenile(state: CharacterState): void {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil) return;
  const ana = karistir(profil.adaylar.filter((t) => t.rolTuru === "ana")).slice(0, ADAY_ANA_SAYISI);
  const diger = karistir(profil.adaylar.filter((t) => t.rolTuru !== "ana")).slice(0, ADAY_SAYISI - ADAY_ANA_SAYISI);
  const kullanilan: string[] = state.ekip.map((e) => e.isim);
  const adaylar: IsletmeAday[] = [];
  for (const taslak of [...ana, ...diger]) {
    const aday = adayUret(state, profil, taslak, kullanilan);
    kullanilan.push(aday.isim);
    adaylar.push(aday);
  }
  is.adaylar = adaylar;
  is.aday_yili = state.yil;
}

/** Aday listesi boşsa ya da son yenilemeden 3 yıl geçtiyse yeniler. */
export function adaylariGerekirseYenile(state: CharacterState): void {
  const is = state.isletme;
  if (!is) return;
  if (is.adaylar.length === 0 || state.yil - is.aday_yili >= ADAY_YENILEME_YIL) adaylariYenile(state);
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
    stok_hedefi: "normal",
    hirsizlik_son_yil: null,
    imtiyazlar: {},
    tekel_hat: null,
  };
  adaylariYenile(state);
}

const ESKI_FIYAT: Record<string, IsletmeFiyat> = { ucuz: "eksi10", pahali: "arti10" };

/** Eski kayıt / yeni meslek: işletme yoksa kurar; eksik alanlar ve profildeki yeni hatlar tamamlanır. */
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
  for (const h of is.hatlar) {
    const eski = ESKI_FIYAT[h.fiyat as string];
    if (eski) h.fiyat = eski;
    if (!(h.fiyat in FIYAT_POLITIKASI)) h.fiyat = "normal";
  }
  if (!is.stok_hedefi) is.stok_hedefi = "normal";
  if (is.hirsizlik_son_yil === undefined) is.hirsizlik_son_yil = null;
  if (!is.imtiyazlar) is.imtiyazlar = {};
  if (is.tekel_hat === undefined) is.tekel_hat = null;
  // Eski aday/çalışan biçimi: aday listesi yeni şemaya uymuyorsa yenilenir; ekip rolleri yeni türlere taşınır.
  const eskiBicim = is.adaylar.some((a) => (a as unknown as { yetenek?: number }).yetenek === undefined);
  if (eskiBicim) adaylariYenile(state);
  const ESKI_ROL: Record<string, IsletmeRolTuru> = { yazi: "musteri", satin_alma: "maliyet", satis: "ana" };
  for (const uye of state.ekip) {
    const eskiRol = uye.rol_turu as unknown as string | undefined;
    if (eskiRol && ESKI_ROL[eskiRol]) uye.rol_turu = ESKI_ROL[eskiRol];
    if (uye.rol_turu && uye.y_giris === undefined) {
      uye.y_giris = uye.gercekKalite;
      uye.s_giris = uye.sadakat;
      uye.maas_taban = r2(uye.maas / Math.max(0.01, b.enflasyon));
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

/** hesaplaMaasYillik'in işletme karşılığı: geçen yılın brüt kârı, yoksa beklenen kâr (en az 1). */
export function isletmeGelirTahmini(state: CharacterState, b: IsletmeBaglami): number {
  const is = state.isletme;
  if (!is) return 1;
  const kar = is.son_dokum ? is.son_dokum.brutKar : beklenenBrutKar(state, b);
  return Math.max(1, r2(kar));
}

// ── Vergi ───────────────────────────────────────────────────────────────────
/** Yıllık vergi oranı (0-1): temel + savaş eki + kötü otorite ilişkisi eki, vergi çarpanıyla çarpılır. */
export function vergiOrani(state: CharacterState): number {
  let oran = VERGI_TABAN_ORANI;
  if (state.ulke.savasta) oran += VERGI_SAVAS_EKI;
  if ((state.yonetim_iliski ?? 0) < VERGI_KOTU_ILISKI_ESIGI) oran += VERGI_KOTU_ILISKI_EKI;
  const aktif = state.vergi_carpan_bitis_yili != null && state.yil <= state.vergi_carpan_bitis_yili;
  const carpan = aktif ? state.vergi_carpan ?? 1 : 1;
  return oran * carpan;
}

// ── Hırsızlık ───────────────────────────────────────────────────────────────
export type HirsizlikSonucu = "agir" | "rahat" | "kismi" | "engellendi" | "sans";
const HIRSIZLIK_SONUCLARI: HirsizlikSonucu[] = ["agir", "rahat", "kismi", "engellendi", "sans"];
/** Koruma → [ağır, rahat, kısmi, tam engel, şans eseri] yüzdeleri (parçalı doğrusal; 0,5'e kadar tam engel yok, 0,5'ten sonra şans eseri sıfırlanır). */
const HIRSIZLIK_NOKTALARI: [number, number[]][] = [
  [0, [30, 40, 5, 0, 25]],
  [0.5, [18, 26, 36, 0, 20]],
  [0.6, [14, 20, 32, 34, 0]],
  [0.9, [4, 6, 12, 78, 0]],
  [1, [1, 2, 6, 91, 0]],
];

export function hirsizlikOlasiliklari(koruma: number): Record<HirsizlikSonucu, number> {
  const s = clamp(koruma, 0, 1);
  let v = HIRSIZLIK_NOKTALARI[HIRSIZLIK_NOKTALARI.length - 1][1];
  for (let i = 0; i < HIRSIZLIK_NOKTALARI.length - 1; i++) {
    const [s0, v0] = HIRSIZLIK_NOKTALARI[i];
    const [s1, v1] = HIRSIZLIK_NOKTALARI[i + 1];
    if (s >= s0 && s <= s1) {
      const t = s1 === s0 ? 0 : (s - s0) / (s1 - s0);
      v = v0.map((x, j) => x + (v1[j] - x) * t);
      break;
    }
  }
  const toplam = v.reduce((a, b) => a + b, 0) || 100;
  const sonuc = {} as Record<HirsizlikSonucu, number>;
  HIRSIZLIK_SONUCLARI.forEach((k, i) => (sonuc[k] = v[i] / toplam));
  return sonuc;
}

/** Sonuç başına [ürün aralığı %, nakit aralığı %] (nakit: geçen yılın brüt kârına göre). */
export const HIRSIZLIK_KAYIPLARI: Record<HirsizlikSonucu, { urun: [number, number]; nakit: [number, number] }> = {
  agir: { urun: [45, 65], nakit: [20, 30] },
  rahat: { urun: [25, 40], nakit: [7, 12] },
  kismi: { urun: [6, 14], nakit: [0, 5] },
  engellendi: { urun: [0, 0], nakit: [0, 0] },
  sans: { urun: [0, 0], nakit: [0, 0] },
};

/** Yıllık dış hırsızlık girişim şansı: güvenlikten BAĞIMSIZ; depo doluluğu + kıtlık. */
export function hirsizlikGirisimSansi(state: CharacterState, doluluk: number): number {
  const kitlik = state.ulke.donem?.tur === "kitlik" ? 0.02 : 0;
  return 0.11 + 0.07 * clamp(doluluk, 0, 1) + kitlik;
}

/** Ortalama girişim aralığı (yıl) = cooldown + 1/şans. */
export function hirsizlikOrtalamaAralik(sans: number): number {
  return HIRSIZLIK_COOLDOWN_YIL + 1 / Math.max(0.0001, sans);
}

function stokAzalt(is: IsletmeDurumu, oran: number): number {
  let kayip = 0;
  for (const hat of is.hatlar) {
    const k = Math.floor(hat.stok * oran);
    hat.stok -= k;
    kayip += k;
  }
  return kayip;
}

// ── Yıllık işleme ───────────────────────────────────────────────────────────
export interface IsletmeYilSonucu {
  net: number;
  dokum: IsletmeDokum;
}

function sureleriKontrolEt(state: CharacterState, uyarilar: IsletmeUyari[]): void {
  const is = state.isletme!;
  if (state.vergi_carpan_bitis_yili != null && state.yil > state.vergi_carpan_bitis_yili) {
    if ((state.vergi_carpan ?? 1) < 1) uyarilar.push({ kod: "vergi_indirimi_bitti" });
    state.vergi_carpan = 1;
    state.vergi_carpan_bitis_yili = null;
  }
  if (is.imtiyazlar) {
    for (const [id, bitis] of Object.entries(is.imtiyazlar)) {
      if (state.yil > bitis) {
        delete is.imtiyazlar[id];
        if (id === "tekel_ruhsati") is.tekel_hat = null;
        uyarilar.push({ kod: "imtiyaz_bitti", hat: id });
      }
    }
  }
}

export function isletmeYilIsle(state: CharacterState, b: IsletmeBaglami): IsletmeYilSonucu {
  const is = state.isletme!;
  const profil = isletmeProfiliGetir(state.meslek, state.cag)!;
  const kapasite = depoKapasitesi(is);
  const uyarilar: IsletmeUyari[] = [];
  const slot = hatSlotSayisi(state);
  const acik = is.hatlar.filter((h) => h.acik && !!hatTanimiGetir(profil, h.id)).slice(0, slot);
  const eskiMusteri = musteriSayisi(state);
  const oncekiBrut = is.son_dokum ? is.son_dokum.brutKar : beklenenBrutKar(state, b);
  const brutTaban = Math.max(0, oncekiBrut);
  let nakitHasar = 0;
  let ekstraGider = 0;

  sureleriKontrolEt(state, uyarilar);
  calisanlariGelistir(state);
  calisanMaaslariniGuncelle(state, b.enflasyon);

  // 1. Stok hedefine göre alım / üretim planı (yılda tek dolum).
  const hedefAdi = stokHedefiGetir(is);
  const oran = STOK_HEDEFI_ORANLARI[hedefAdi];
  const planlar = acik.map((hat) => {
    const tanim = hatTanimiGetir(profil, hat.id)!;
    const hs = hatHesapla(state, hat, tanim, b);
    return { hat, tanim, hs, talep: hs.talep * (1 - TALEP_GURULTUSU + Math.random() * 2 * TALEP_GURULTUSU) };
  });
  const toplamBeklenen = planlar.reduce((t, p) => t + p.hs.talep, 0);
  const istenenler = planlar.map((p) => {
    const hedefStok =
      oran === null
        ? kapasite * (toplamBeklenen > 0 ? p.hs.talep / toplamBeklenen : 1 / Math.max(1, planlar.length))
        : p.hs.talep * oran;
    return Math.max(0, Math.ceil(hedefStok - p.hat.stok));
  });
  // Zanaatkâr'da depo HAMMADDE tutar (1 hammadde = 1 ürün); üretim tavanı alımı değil SATIŞI sınırlar (adım 5).
  // Depoya sığmayan hammadde hiç alınmaz (parası ödenmez); alınıp satılamayan hammadde yıl sonu çürür.
  const tavan = uretimTavani(state);
  const bosYer = Math.max(0, kapasite - toplamStok(is));
  const toplamIstenen = istenenler.reduce((t, x) => t + x, 0);
  const sigdirma = toplamIstenen > bosYer ? bosYer / toplamIstenen : 1;
  const uretimPlani = istenenler.map((x) => Math.floor(x * sigdirma));
  let alim = 0;
  planlar.forEach((p, i) => {
    p.hat.stok += uretimPlani[i];
    alim += uretimPlani[i] * p.hs.birimMaliyet;
  });

  // 2. Çalışan sadakati: düşük sadakatli çalışan sızdırır, çalar, ayrılır.
  const rakip = aktifRakip(state); // saldırgan / sızdırma hedefi: en büyük aktif rakip
  for (const uye of [...state.ekip]) {
    if (!uye.rol_turu || uye.sadakat >= SADAKAT_RISK_ESIGI) continue;
    const risk = SADAKAT_RISK_ESIGI - uye.sadakat;
    if ((uye.sizdirma_son_yil === undefined || state.yil - uye.sizdirma_son_yil >= SADAKAT_OLAY_COOLDOWN_YIL) && Math.random() < risk / 200) {
      uye.sizdirma_son_yil = state.yil;
      // Hedefli: sızdırılan müşteri tamamen rakibe geçer (%2–4).
      if (rakip) musteriAktar(state, "oyuncu", rakipGrubu(rakip.ad), state.meslek_musteri * (0.02 + Math.random() * 0.02));
      uyarilar.push({ kod: "sizdirma", isim: uye.isim });
    }
    if ((uye.ic_hirsizlik_son_yil === undefined || state.yil - uye.ic_hirsizlik_son_yil >= SADAKAT_OLAY_COOLDOWN_YIL) && Math.random() < risk / 250) {
      uye.ic_hirsizlik_son_yil = state.yil;
      const urunYuzde = 5 + Math.random() * 7;
      const nakitYuzde = 2 + Math.random() * 3;
      stokAzalt(is, urunYuzde / 100);
      const tutar = r2(brutTaban * (nakitYuzde / 100));
      nakitHasar += tutar;
      uyarilar.push({ kod: "ic_hirsizlik", isim: uye.isim, urunYuzde: Math.round(urunYuzde), nakitYuzde: Math.round(nakitYuzde), tutar });
    }
    if (Math.random() < risk / 500) {
      state.ekip = state.ekip.filter((e) => e.id !== uye.id);
      ekstraGider += uye.maas * 1.5;
      uyarilar.push({ kod: "calisan_ayrildi", isim: uye.isim });
    }
  }

  // 3. Dış hırsızlık: girişim şansı güvenlikten bağımsız, sonucu Koruma belirler.
  const stokPik = toplamStok(is);
  if (stokPik >= 5 && (is.hirsizlik_son_yil == null || state.yil - is.hirsizlik_son_yil >= HIRSIZLIK_COOLDOWN_YIL)) {
    const doluluk = kapasite > 0 ? stokPik / kapasite : 0;
    if (Math.random() < hirsizlikGirisimSansi(state, doluluk)) {
      is.hirsizlik_son_yil = state.yil;
      const olas = hirsizlikOlasiliklari(korumaHesapla(state).toplam);
      let zar = Math.random();
      let sonuc: HirsizlikSonucu = "sans";
      for (const k of HIRSIZLIK_SONUCLARI) {
        zar -= olas[k];
        if (zar <= 0) {
          sonuc = k;
          break;
        }
      }
      const kayip = HIRSIZLIK_KAYIPLARI[sonuc];
      const urunYuzde = araliktaOnd(kayip.urun);
      const nakitYuzde = araliktaOnd(kayip.nakit);
      if (urunYuzde > 0) stokAzalt(is, urunYuzde / 100);
      const tutar = r2(brutTaban * (nakitYuzde / 100));
      nakitHasar += tutar;
      uyarilar.push({ kod: "hirsizlik", sonuc, urunYuzde: Math.round(urunYuzde), nakitYuzde: Math.round(nakitYuzde), tutar });
    }
  }

  // 4. Rakip saldırısı (v8.2): zar yok, takvim — bir sonraki saldırı yılı 4–9 yıl sonraya konur; kademe sabit pay aralığından.
  const pay = pazarPayiHesapla(state);
  const kademe = rakipSaldiriKademesi(pay);
  const aktifler = aktifRakipler(state);
  if (kademe >= 2 && rakip) {
    rakip.husumet = clamp(rakip.husumet + 3, 0, 100);
  }
  const otoriteKoruma = (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI;
  if (state.rakip_sonraki_saldiri_yili == null) state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
  if (state.yil >= state.rakip_sonraki_saldiri_yili) {
    state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
    if (aktifler.length > 0) {
      const buyuk = rakip!;
      const kucukler = aktifler.filter((r) => r !== buyuk);
      const saldiran = kucukler.length > 0 && Math.random() >= RAKIP_BUYUK_SALDIRI_ORANI ? kucukler[Math.floor(Math.random() * kucukler.length)] : buyuk;
      state.rakip_saldiri_son_yil = state.yil;
      const tur = saldiriTuruSec(kademe);
      // İçerden sızma: sadakati düşük bir çalışan rakibe satılır → hasar artar, güvenlik devre dışı.
      const sizan = state.ekip
        .filter((u) => u.rol_turu && u.sadakat < SADAKAT_RISK_ESIGI)
        .sort((x, y) => x.sadakat - y.sadakat)[0];
      const carpan = (saldiran === buyuk ? 1 : RAKIP_IKINCI_HASAR_CARPANI) * (sizan ? SIZMA_HASAR_CARPANI : 1);
      const uyari: IsletmeUyari = { kod: "rakip_saldiri", sonuc: tur, rakip: saldiran.ad, ...(sizan ? { sizma: true, isim: sizan.isim } : {}) };
      const engel = clamp(korumaHesapla(state).toplam, 0, 0.9);
      if (FIZIKSEL_SALDIRILAR.includes(tur) && !sizan && Math.random() < engel) {
        uyari.engellendi = true;
      } else {
        const i = kademe - 1;
        if (sizan) sizan.sadakat = Math.max(0, sizan.sadakat - SIZMA_SADAKAT_KAYBI);
        let nakitYuzde = 0;
        let musteriYuzde = 0;
        if (tur === "baskin") nakitYuzde = SALDIRI_HASARLARI.baskin.nakit[i];
        if (tur === "sabotaj") {
          const [mn, mx] = SALDIRI_HASARLARI.sabotaj.stok;
          const urunYuzde = (mn + Math.random() * (mx - mn)) * carpan;
          stokAzalt(is, Math.min(1, urunYuzde / 100));
          uyari.urunYuzde = Math.round(urunYuzde);
          nakitYuzde = SALDIRI_HASARLARI.sabotaj.nakit[i];
        }
        if (tur === "iftira") {
          const sohret = SALDIRI_HASARLARI.iftira.sohret[i] * carpan;
          state.un = Math.max(0, state.un - sohret);
          uyari.sohretKaybi = Math.round(sohret * 10) / 10;
          musteriYuzde = SALDIRI_HASARLARI.iftira.musteri[i];
        }
        if (tur === "musteri_calma") musteriYuzde = SALDIRI_HASARLARI.musteri_calma.musteri[i];
        if (nakitYuzde > 0) {
          const yuzde = nakitYuzde * carpan;
          const tutar = r2(brutTaban * (yuzde / 100));
          nakitHasar += tutar;
          uyari.nakitYuzde = Math.round(yuzde);
          uyari.tutar = tutar;
        }
        if (musteriYuzde > 0) {
          // Hedefli: kaybedilen müşteri (ondalıklı) tamamen saldıran rakibe geçer.
          const kayip = musteriAktar(state, "oyuncu", rakipGrubu(saldiran.ad), state.meslek_musteri * (musteriYuzde * carpan / 100));
          uyari.musteriKaybi = Math.round(kayip * 10) / 10;
        }
      }
      uyarilar.push(uyari);
    }
  }

  // 5. Satış (stok hedefe göre alınmış; hırsızlık sonrası kalanı satılır).
  let satis = 0;
  let toplamTalep = 0;
  let toplamKarsilanamayan = 0;
  let sicakKarsilanamadi = false;
  const satirlar: IsletmeDokum["hatlar"] = [];
  // Üretim modunda (Zanaatkâr) yıllık üretim tavanı toplam satışı sınırlar; tavan aşılırsa tüm hatlar orantılı kısılır.
  const satisHakki = planlar.map((p) => Math.min(p.hat.stok, Math.round(p.talep)));
  const toplamHak = satisHakki.reduce((t, x) => t + x, 0);
  let tavanOlcek = 1;
  if (tavan !== null && toplamHak > tavan) {
    tavanOlcek = tavan / toplamHak;
    uyarilar.push({ kod: "uretim_tavani" });
  }
  let satilanToplam = 0;
  planlar.forEach((p, i) => {
    const talepAdet = Math.round(p.talep);
    const satilan = Math.floor(satisHakki[i] * tavanOlcek);
    satilanToplam += satilan;
    p.hat.stok -= satilan;
    satis += satilan * p.hs.birimFiyat;
    toplamTalep += talepAdet;
    const karsilanamayan = Math.max(0, talepAdet - satilan);
    toplamKarsilanamayan += karsilanamayan;
    if (talepAdet > 0 && karsilanamayan > talepAdet * KITLE_KAYIP_ESIGI) {
      uyarilar.push({ kod: "stok_bitti", hat: p.hat.id });
      if (p.hs.sicak) sicakKarsilanamadi = true;
    }
    satirlar.push({ id: p.hat.id, talep: talepAdet, satilan, alinan: uretimPlani[i], stokSonu: p.hat.stok });
    p.hat.son_talep = talepAdet;
    p.hat.son_satis = satilan;
  });

  // 6. Depo: çürüme (kademeye göre, kapalı hatlar dahil) + yalnız kademeye bağlı sabit bakım.
  const depoMasrafi = depoBakimMasrafi(is, b.enflasyon);
  const curume = curumeOrani(is);
  for (const hat of is.hatlar) {
    const tanim = hatTanimiGetir(profil, hat.id);
    if (!tanim) continue;
    hat.stok = Math.round(hat.stok * (1 - curume));
    if (hat.stok > 0 && !hat.acik && hat.stok >= 20) uyarilar.push({ kod: "fazla_stok", hat: hat.id });
  }

  // 7. Müşteri sayısı: sabit +1 ve yüzdelik büyüme (şöhret + fiyat + tanıtım + müşteri çalışanları); mal biterse kayıp.
  //    Kazanç/kayıp diğer gruplardan büyüklükleriyle orantılı alınır/verilir (piyasa.ts).
  const musteriRolu = state.ekip.reduce((t, u) => {
    const bn = calisanBonusu(u);
    return t + (bn?.tur === "musteri" ? bn.deger : 0);
  }, 0);
  const karsilanamayanOrani = toplamTalep > 0 ? toplamKarsilanamayan / toplamTalep : 0;
  if (karsilanamayanOrani > KITLE_KAYIP_ESIGI) {
    let kayipYuzde = Math.min(KITLE_KAYIP_TAVANI, (karsilanamayanOrani - KITLE_KAYIP_ESIGI) * KITLE_KAYIP_CARPANI);
    if (sicakKarsilanamadi) kayipYuzde *= 2;
    musteriKaydir(state, "oyuncu", -state.meslek_musteri * kayipYuzde);
    uyarilar.push({ kod: "kitle_kaybi" });
  } else if (satis > 0) {
    const fiyatEtkisi =
      planlar.length > 0 ? planlar.reduce((t, p) => t + (FIYAT_POLITIKASI[p.hat.fiyat]?.pay ?? 0), 0) / planlar.length : 0;
    const ham = sohretPayBuyumesi(state.un) + fiyatEtkisi + tanitimBuyumesi(state) + musteriRolu;
    const mevcutPay = pazarPayiHesapla(state);
    // Pay büyüdükçe pozitif büyüme doyar (pay %60'a yaklaşınca sıfır); eksi etkiler tam işler.
    // Veba sürerken pozitif büyüme %70 kısılır (v10); eksi etkiler tam işler.
    const vebaKisma = state.veba?.aktif ? VEBA_ARTIS_CARPANI : 1;
    const yuzde = ham > 0 ? ham * Math.max(0, 1 - mevcutPay / PAY_DOYMA_ESIGI) * vebaKisma : ham;
    musteriKaydir(state, "oyuncu", sabitMusteriArtisi(state.yas) * vebaKisma + state.meslek_musteri * yuzde);
  }

  // 8. Brüt kâr, vergi, borç.
  const loncaAidati = r2(satis * LONCA_AIDATI_ORANI);
  const brutKar = r2(satis - alim - depoMasrafi - loncaAidati);
  const vOran = vergiOrani(state);
  const vergi = brutKar > 0 ? r2(brutKar * vOran) : 0;
  let borcOdeme = 0;
  const vergiSonrasi = brutKar - vergi;
  if (is.tedarikci_borcu > 0 && vergiSonrasi > 0) {
    borcOdeme = r2(Math.min(is.tedarikci_borcu, vergiSonrasi * BORC_ODEME_ORANI));
    is.tedarikci_borcu = r2(is.tedarikci_borcu - borcOdeme);
  }
  const net = r2(brutKar - vergi - borcOdeme - nakitHasar - ekstraGider);

  // 9. Toplam pazar büyüklüğü (dönem/savaş/veba): herkesin müşterisi aynı oranda değişir.
  pazarOlcekle(state, 1 + pazarBuyumeOrani(state));
  const yeniMusteri = musteriSayisi(state);

  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(satis),
    alim: r2(alim),
    depoMasrafi: r2(depoMasrafi),
    loncaAidati,
    brutKar,
    borcOdeme,
    net,
    vergi,
    vergiOrani: vOran,
    pazarPayi: Math.round(pazarPayiHesapla(state) * 100),
    musteri: Math.round(yeniMusteri * 10) / 10,
    musteriDegisim: Math.round((yeniMusteri - eskiMusteri) * 10) / 10,
    pazarMusteri: state.pazar_musteri,
    hatlar: satirlar,
    ...(tavan !== null ? { uretim: { tavan, kullanilan: satilanToplam } } : {}),
    uyarilar,
  };
  is.son_dokum = dokum;
  adaylariGerekirseYenile(state);
  return { net, dokum };
}
