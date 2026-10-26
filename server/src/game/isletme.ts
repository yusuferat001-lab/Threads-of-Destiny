import { yatirimYillikMasrafi } from "./yatirimMasrafi";
import { aranmaMusteriKaybi, aranmaAhlakKaybi } from "../data/aranmaSabitleri";
import { yatkinlikMusteriBuyumesi } from "../data/meslekYatkinlik";
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
  IsletmeUyari,
} from "../types";
import {
  ADAY_TIP_ARALIKLARI,
  type AdayTaslagi,
  type HatTanimi,
  type IsletmeProfili,
  type UrunBonusu,
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
  ISLETME_GUVENLI_YIL,
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
import { cemaatBaslat, cemaatHazirla, cemaatBeklenenKar, cemaatYilIsle, faaliyetSlotSayisi } from "./cemaat";
import { rastgeleBirIsimSec } from "../data/npcIsimleri";

/**
 * Meslek işletmesi motoru (§45). Gelir = oyuncunun müşterisi (pazar payı × toplam pazar) ×
 * hat talebi × fiyat → satış; satış − alım − depo masrafı = brüt kâr; brüt kârdan vergi kesilir.
 * Çalışan maaşları mevcut ekip gideri olarak ayrıca düşer. Bu dosya bilerek stateManager'ı
 * içe aktarmaz (döngüsel bağımlılık olmasın); enflasyon/rütbe/çarpan gibi dış değerler
 * `IsletmeBaglami` ile dışarıdan gelir (stateManager.isletmeBaglami).
 */

export interface IsletmeBaglami {
  /** enflasyonCarpani(state): gelir/satış/bağış tarafı. */
  enflasyon: number;
  /** giderEnflasyonCarpani(state): alış, bakım, maaş, yatırım fiyatı (gelir enflasyonunun ×1,15'i). */
  giderEnflasyon: number;
  /**
   * Kalıcı satış/bağış çarpanı (v10): olay `maas_carpani` etiketi × geçici durumlar (veba tedbiri vb.) × eş desteği.
   * Tüccar/Zanaatkâr'da SATIŞ (talep), Din Adamı'nda BAĞIŞ çarpanıdır. Rütbe fiyat primi, yatkınlık maaşı ve
   * aranma gölgesi artık buraya girmez.
   */
  satisCarpani: number;
}

// ── Sayılar (simülasyonla ayarlanır; bkz. scripts/simulateIsletme.ts) ───────
/** Depo kademeleri (0..4): kapasite, çürüme oranı, sabit yıllık bakım (enflasyonsuz). Depo yılda BİR kez dolar. */
export const DEPO_KAPASITE = [40, 70, 105, 150, 210];
export const CURUME_ORANLARI = [0.1, 0.08, 0.06, 0.045, 0.03];
export const DEPO_BAKIM = [4, 8, 15, 28, 45];
export const BASLANGIC_STOK = 30;
/** Başlangıç deposunun doluluk oranı. */
export const BASLANGIC_DEPO_DOLULUK = 0.75;
/** Başlangıç malının bedelinin veresiye kalan kesri (yarısı peşin ödenmiş sayılır). */
export const BASLANGIC_VERESIYE_ORANI = 0.5;
/** Tüccar daha cüzdanlı başlar: depo tam dolu, borçsuz (erken yıllarda batmasın). */
export const TUCCAR_BASLANGIC_DEPO_DOLULUK = 1;
export const TUCCAR_BASLANGIC_VERESIYE_ORANI = 0;
export function baslangicDepoDoluluk(meslek: string): number {
  return meslek === "Tüccar" ? TUCCAR_BASLANGIC_DEPO_DOLULUK : BASLANGIC_DEPO_DOLULUK;
}
export function baslangicVeresiyeOrani(meslek: string): number {
  return meslek === "Tüccar" ? TUCCAR_BASLANGIC_VERESIYE_ORANI : BASLANGIC_VERESIYE_ORANI;
}
export const BORC_ODEME_ORANI = 0.25;
/** Rütbe S1..S5 → en fazla toplam çalışan. */
export const CALISAN_LIMITLERI = [2, 3, 5, 6, 7];
/** Müşterinin bütçesi hatlar arasında paylaşılır: n açık hatta her birinin talebi 1/(1+0.9(n-1)) ile çarpılır (toplam talep neredeyse sabit). */
export const HAT_PAYLASIM = 0.9;
/** v20: her ek açık hat (ürün çeşitliliği) yıllık müşteri artışına bu kadar (kesir) ekler. */
export const HAT_CESITLILIK_MUSTERI = 0.005;
/** v20: her yıl başı alış ±%3, satış ±%2 piyasa sapması (o yıl sabit). */
export const PIYASA_SAPMA_ALIS = 0.03;
export const PIYASA_SAPMA_SATIS = 0.02;
/** Karşılanamayan talep bu orandan büyükse müşteri kaybı: min(%12, (oran−eşik)×%30) kendi müşterisinin yüzdesi (sıcak ürünse ×2). */
const KITLE_KAYIP_ESIGI = 0.15;
/** Karşılanamayan talep oranının müşteriye çevrilen kesri (kaçanlar bir sonraki yıl rakibe gider). */
const KITLE_KAYIP_KESRI = 0.2;
const KITLE_KAYIP_TAVANI = 0.1;
const TALEP_GURULTUSU = 0.08;
/** Yüzdelik müşteri büyümesi pay bu eşiğe yaklaştıkça sıfıra iner. */
export const PAY_DOYMA_ESIGI = 0.68;
/** Maliyet indirimleri ÇARPIMSAL birleşir (tavan yok): maliyet × (1−a)(1−b)(1−c)…; her kaynak kendi payını düşer, yığıldıkça getirisi azalır. */
export const KERVAN_INDIRIM_KADEME = 0.03;
const GUMRUK_INDIRIMI = 0.1;
const MUAFIYET_INDIRIMI = 0.08;
export const TEZGAH_URETIM_KADEME = 0.35;
export const TANITIM_PAY_KADEME = 0.01;
/** Veba sürerken müşteri/inanan büyümesinin pozitif kısımları bu çarpanla kısılır (v10). */
export const VEBA_ARTIS_CARPANI = 0.3;
/** v11: dönem fiyat şoku alışa ve satışa AYNI oranda (%100) yansır; marj oransal korunur, krizin asıl etkisi talepte. */
const FIYAT_SOKU_YANSIMA = 1;

// Üretim modu (Zanaatkâr): yıllık üretim tavanı = taban × (1 + ana rol bonusları + tezgâh yüzdesi + ruhsat).
export const URETIM_TABAN = 80;
/** Üretim modunda ana rol bonusunun talebe yansıyan payı (kalanı üretim tavanına gider). */
export const URETIM_ANA_TALEP_PAYI = 0.55;
export const URETIM_METRIK_CARPANI = 0.2;

// Lonca aidatı (v20): satışın %2'si; pay %15'i geçince %3, %20'yi geçince %4, %30'u geçince %5. Brüt kârdan vergiden önce düşer.
export const LONCA_AIDATI_ESIKLERI: { payUstu: number; oran: number }[] = [
  { payUstu: 0.3, oran: 0.05 },
  { payUstu: 0.2, oran: 0.04 },
  { payUstu: 0.15, oran: 0.03 },
  { payUstu: 0, oran: 0.02 },
];
export function loncaAidatiOrani(pay: number): number {
  return (LONCA_AIDATI_ESIKLERI.find((e) => pay >= e.payUstu) ?? LONCA_AIDATI_ESIKLERI[LONCA_AIDATI_ESIKLERI.length - 1]).oran;
}

// Vergi
export const VERGI_TABAN_ORANI = 0.2;
export const VERGI_SAVAS_EKI = 0.1;
export const VERGI_KOTU_ILISKI_EKI = 0.03;
export const VERGI_KOTU_ILISKI_ESIGI = 25;

// Sadakat / çalışan gelişimi
export const SADAKAT_YILLIK_ARTIS = 0.6;
export const YETENEK_YILLIK_ARTIS = 0.3;
export const SADAKAT_RISK_ESIGI = 45;
export const SADIK_ESIGI = 80;
export const SADIK_BONUS = 1.05;
export const SADAKAT_OLAY_COOLDOWN_YIL = 3;

// Dış hırsızlık
export const GUVENLIK_YATIRIM_KORUMA = [0, 0.1, 0.2, 0.3, 0.4];
export const OTORITE_KORUMA_ESIGI = 70;
export const OTORITE_KORUMA = 0.1;

export interface FiyatPolitikasi {
  /** Satış fiyatı çarpanı. */
  fiyat: number;
  /** G'nin yıllık yüzde değişimi (kesir). */
  pay: number;
}
/** v11: talep çarpanı fiyat^(−e) (aşağıda `fiyatTalepCarpani`); simetrik, ucuza ve pahalıya aynı kural. */
export const FIYAT_POLITIKASI: Record<IsletmeFiyat, FiyatPolitikasi> = {
  eksi20: { fiyat: 0.8, pay: 0.02 },
  eksi10: { fiyat: 0.9, pay: 0.01 },
  normal: { fiyat: 1, pay: 0 },
  arti10: { fiyat: 1.1, pay: -0.01 },
  arti20: { fiyat: 1.2, pay: -0.02 },
};
/** Fiyat esnekliği (v20): normalde 0,82; krizde (kıtlık/durgunluk/savaş/veba) müşteri fiyata biraz daha duyarlı: 1,0. */
export const FIYAT_ESNEKLIK = 0.82;
export const FIYAT_ESNEKLIK_KRIZ = 1.0;
export function fiyatTalepCarpani(pol: FiyatPolitikasi, krizli: boolean): number {
  return Math.pow(pol.fiyat, -(krizli ? FIYAT_ESNEKLIK_KRIZ : FIYAT_ESNEKLIK));
}
export const FIYATLAR: IsletmeFiyat[] = ["eksi20", "eksi10", "normal", "arti10", "arti20"];

/** v12: depoyu elle doldurma seçenekleri (kapasitenin %'si). Yıl sonunda otomatik alım YOK; mal yalnız oyuncu satın alınca gelir. */
export const DEPO_DOLDUR_YUZDELERI = [25, 50, 75, 100] as const;

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
const r2 = (x: number) => Math.round(x * 100) / 100;
const aralikta = ([min, max]: [number, number]) => Math.round(min + Math.random() * (max - min));
const araliktaOnd = ([min, max]: [number, number]) => min + Math.random() * (max - min);

/** İşletmenin ilk ISLETME_GUVENLI_YIL yılında dış hırsızlık ve rakip saldırısı olmaz (v11). */
export function ilkYillarGuvenli(state: CharacterState): boolean {
  const bas = state.isletme?.baslangic_yili ?? state.baslangic_yili ?? state.yil;
  return state.yil - bas < ISLETME_GUVENLI_YIL;
}

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
/** Dükkân gideri = depo bakımı + yatırım kademelerinin yıllık masrafı (%2). Bütçede tek satır olarak görünür. */
export function dukkanGideri(state: CharacterState, giderEnflasyon: number): number {
  const is = state.isletme;
  if (!is) return 0;
  return r2(depoBakimMasrafi(is, giderEnflasyon) + yatirimYillikMasrafi(state, giderEnflasyon));
}
export function toplamStok(is: IsletmeDurumu): number {
  return is.hatlar.reduce((t, h) => t + h.stok, 0);
}
export function depoDolulukYuzdesi(is: IsletmeDurumu): number {
  const kap = depoKapasitesi(is);
  return kap > 0 ? Math.round((toplamStok(is) / kap) * 100) : 0;
}

/** Kademeye bağlı toplam çalışan limiti (rol/güvenlik için ayrı sınır yok). */
export function calisanLimiti(state: CharacterState): number {
  return CALISAN_LIMITLERI[clamp((state.rutbe_seviye ?? 1) - 1, 0, CALISAN_LIMITLERI.length - 1)];
}

/** Aynı anda açık tutulabilecek hat sayısı: 1 + her 3 çalışan için 1 (en fazla 3). */
export function hatSlotSayisi(state: CharacterState): number {
  if (isletmeProfiliGetir(state.meslek, state.cag)?.mod === "cemaat") return faaliyetSlotSayisi(state);
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
export const MAAS_CARPANI = 0.95;

/** Giriş seviyesine (Y, S) göre enflasyonsuz yıllık maaş tabanı. */
export function maasTabani(yetenek: number, sadakat: number): number {
  return r2(MAAS_CARPANI * (1.2 + 0.02 * yetenek + 0.01 * sadakat + 0.0004 * yetenek * sadakat));
}

/** Her çalışanın güncel maaşını `maasTabani(güncel Y, S) × güncel enflasyon` ile yeniler (yeni adaylar ve mevcutlar). */
export function calisanMaaslariniGuncelle(state: CharacterState, enflasyon: number): void {
  for (const uye of state.ekip) {
    if (uye.maas_taban === undefined) continue;
    // v14: maaş çalışanın GÜNCEL Yetenek/Sadakat'ine bağlı — geliştikçe artar (işe alırken giriş seviyesi baz alınır).
    if (uye.rol_turu) uye.maas_taban = maasTabani(uye.gercekKalite, uye.sadakat);
    uye.maas = r2(uye.maas_taban * enflasyon);
  }
}

/** Çalışan işletmede çalıştıkça gelişir: güncel yetenek +0,4, güncel sadakat +0,7 (tavan 100). */
export function calisanlariGelistir(state: CharacterState, ekstraYetenek = 0): void {
  for (const uye of state.ekip) {
    if (!uye.rol_turu) continue;
    uye.gercekKalite = clamp(uye.gercekKalite + YETENEK_YILLIK_ARTIS + ekstraYetenek, 0, 100);
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
    if (havuz.length === 0) havuz = profil.hatlar.filter((h) => h.kesim === "savas");
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
  // v11: "savas" ürünleri dönem etkisini temel mallar gibi alır (ek savaş talebi hattın `savasTalep`inden gelir).
  if (kesim === "luks") return { talep: e.luksTalep, fiyat: e.luksFiyat };
  return { talep: e.temelTalep, fiyat: e.temelFiyat };
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
  const tezgah = clamp(is.yatirimlar.tezgah ?? 0, 0, 4) * TEZGAH_URETIM_KADEME;
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

/** Eşin mesleki desteği yıllık müşteri artışına yazılır: +%0,1 / %0,2 / %0,3. */
export function esMusteriBuyumesi(state: CharacterState): number {
  if (!state.es_adi) return 0;
  const b = state.es_meslek_bonusu ?? 0;
  if (b >= 6) return 0.003;
  if (b >= 4) return 0.002;
  return b > 0 ? 0.001 : 0;
}

// ── Hat hesabı ──────────────────────────────────────────────────────────────
export interface HatHesabi {
  talep: number;
  birimFiyat: number;
  birimMaliyet: number;
  /** Toplam maliyet indirimi (0-1): çalışan × yatırım × anlaşma × imtiyaz × piyasa etkileri. */
  maliyetIndirim: number;
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
  const politikaTalep = fiyatTalepCarpani(pol, krizliMi(state));
  const ub = anaUrunBonusu(state, hat.id);
  const savasTalep = tanim.savasTalep && state.ulke.savasta ? tanim.savasTalep + (ub?.savasTalepEki ?? 0) : 1;
  const sicak = sicakUrunHatId(state, profil) === hat.id;
  const acikSayisi = Math.max(1, is.hatlar.filter((h) => h.acik).length + (hat.acik ? 0 : 1));
  const paylasim = 1 / (1 + HAT_PAYLASIM * (acikSayisi - 1));
  // v20: çalışan ve yatırım talebi etkilemez (yalnız müşteri sayısını); talepte kalan: imtiyaz ve hat paylaşımı.
  const dukkan = (imtiyazAktifMi(state, "pazar_imtiyazi") || imtiyazAktifMi(state, "kutsal_gun_imtiyazi") ? 1.1 : 1) * paylasim;
  const sapma = is.piyasa_sapma?.[hat.id] ?? { alis: 1, satis: 1 };
  const talep =
    musteriSayisi(state) *
    ALIM_ORANI *
    tanim.talepTabani *
    kes.talep *
    (ub?.talepCarpani ?? 1) *
    politikaTalep *
    savasTalep *
    (sicak ? SICAK_URUN_TALEP : 1) *
    b.satisCarpani *
    piyasaCarpani(state, "talep") *
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
      sapma.satis *
      (1 + (kes.fiyat - 1) * FIYAT_SOKU_YANSIMA) *
      pol.fiyat *
      (sicak ? SICAK_URUN_FIYAT : 1) *
      (ub?.satisCarpani ?? 1) *
      tekel,
    birimMaliyet: tanim.birimMaliyet * b.giderEnflasyon * sapma.alis * (1 + (kes.fiyat - 1) * FIYAT_SOKU_YANSIMA) * maliyetCarpani * piyasaCarpani(state, "alis_maliyeti") * (ub?.alisCarpani ?? 1),
    maliyetIndirim: 1 - maliyetCarpani * piyasaCarpani(state, "alis_maliyeti"),
    kesim: kes,
    sicak,
  };
}

export function hatKilitNedeni(state: CharacterState, tanim: HatTanimi): "rutbe" | null {
  // v11: oyun başında seçilen ana ürünün rütbe kilidi yoktur.
  if (state.isletme?.ana_urun === tanim.id) return null;
  return state.rutbe_seviye < tanim.minRutbe ? "rutbe" : null;
}

/** Ana ürün seçildiyse o hattın bonusu (yalnız seçilen hatta), yoksa null. */
export function anaUrunBonusu(state: CharacterState, hatId: string): UrunBonusu | null {
  const is = state.isletme;
  if (!is || is.ana_urun !== hatId) return null;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  return profil?.baslangicUrunleri?.find((u) => u.hat === hatId)?.bonus ?? null;
}

/** Oyuncunun henüz seçmediği başlangıç ürünü var mı? (yalnız API "ilerle" oyunları) */
export function urunSecimiBekliyorMu(state: CharacterState): boolean {
  return !!state.urun_secim_bekliyor && !!state.isletme && !state.isletme.ana_urun && !!isletmeProfiliGetir(state.meslek, state.cag)?.baslangicUrunleri?.length;
}

/** Başlangıç ürününü uygular: yalnız seçilen hat açık kalır; depo %75 dolu başlar, yarısı peşin, yarısı tedarikçi veresiyesi. */
export function anaUrunSec(state: CharacterState, urunId: string, b: IsletmeBaglami): void {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil?.baslangicUrunleri) throw new Error("Bu meslekte başlangıç ürünü seçilmez.");
  if (!urunSecimiBekliyorMu(state)) throw new Error("Başlangıç ürününü zaten seçtin.");
  if (!profil.baslangicUrunleri.some((u) => u.hat === urunId)) throw new Error("Geçersiz ürün.");
  is.ana_urun = urunId;
  for (const h of is.hatlar) {
    h.acik = h.id === urunId;
    h.stok = 0;
  }
  const hat = is.hatlar.find((h) => h.id === urunId)!;
  const tanim = hatTanimiGetir(profil, urunId)!;
  const hs = hatHesapla(state, hat, tanim, b);
  hat.stok = Math.round(depoKapasitesi(is) * baslangicDepoDoluluk(state.meslek)); // Tüccar tam dolu, diğerleri %75
  is.tedarikci_borcu = r2(hat.stok * hs.birimMaliyet * baslangicVeresiyeOrani(state.meslek)); // Tüccar borçsuz, diğerleri yarı veresiye
  state.urun_secim_bekliyor = false;
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

export const ADAY_SAYISI = 5;
export const ADAY_YENILEME_YIL = 3;

/**
 * 5 aday görünür; liste 3 yılda bir yenilenir. Rol başına en fazla 2 aday seçilir (çeşitlilik).
 * v20: Tüccar/Din Adamı'nda "ana" rol yoktur (satış/bağış çalışanı kalktı); o şablonlar müşteri rolüne döner.
 */
export function adaylariYenile(state: CharacterState): void {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil) return;
  const anaVar = profil.roller.some((r) => r.tur === "ana");
  const havuz = karistir(profil.adaylar.map((t) => (t.rolTuru === "ana" && !anaVar ? { ...t, rolTuru: "musteri" as IsletmeRolTuru } : t)));
  const secilen: AdayTaslagi[] = [];
  const rolSayac: Record<string, number> = {};
  for (const t of havuz) {
    if (secilen.length >= ADAY_SAYISI) break;
    if ((rolSayac[t.rolTuru] ?? 0) >= 2) continue;
    rolSayac[t.rolTuru] = (rolSayac[t.rolTuru] ?? 0) + 1;
    secilen.push(t);
  }
  const kullanilan: string[] = state.ekip.map((e) => e.isim);
  const adaylar: IsletmeAday[] = [];
  for (const taslak of secilen) {
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
  if (profil.mod === "cemaat") {
    cemaatBaslat(state);
    return;
  }
  const ilk = profil.hatlar.find((h) => h.minRutbe <= 1) ?? profil.hatlar[0];
  const hatlar: IsletmeHat[] = profil.hatlar.map((h) => ({
    id: h.id,
    acik: h.id === ilk.id,
    stok: h.id === ilk.id ? (state.meslek === "Tüccar" ? DEPO_KAPASITE[0] : BASLANGIC_STOK) : 0,
    otomatik: true,
    siparis: 0,
    fiyat: "normal",
    son_talep: 0,
    son_satis: 0,
  }));
  state.isletme = {
    hatlar,
    yatirimlar: {},
    // İlk malın yarısı peşin, yarısı veresiye: borç sattıkça kapanır, faizsiz.
    tedarikci_borcu: r2(
      (state.meslek === "Tüccar" ? DEPO_KAPASITE[0] : BASLANGIC_STOK) *
        ilk.birimMaliyet *
        b.giderEnflasyon *
        baslangicVeresiyeOrani(state.meslek),
    ),
    son_dokum: null,
    adaylar: [],
    aday_yili: state.yil,
    hirsizlik_son_yil: null,
    hirsizlik_sonraki_yil: hirsizlikSonrakiYil(state.yil),
    depo_oto: { acik: false, yuzde: 50 },
    yil_alim: 0,
    yil_alinan: {},
    baslangic_yili: state.yil,
    imtiyazlar: {},
    tekel_hat: null,
  };
  adaylariYenile(state);
  piyasaSapmasiniYenile(state);
}

const ESKI_FIYAT: Record<string, IsletmeFiyat> = { ucuz: "eksi10", pahali: "arti10" };

/** Eski kayıt / yeni meslek: işletme yoksa kurar; eksik alanlar ve profildeki yeni hatlar tamamlanır. */
export function isletmeHazirla(state: CharacterState, b: IsletmeBaglami): void {
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!profil) {
    if (state.isletme) state.isletme = null;
    return;
  }
  if (profil.mod === "cemaat") {
    cemaatHazirla(state);
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
  delete is.stok_hedefi; // v12: stok hedefi kalktı, depo elle doldurulur
  // v20: dükkân/vitrin yatırımı kalktı; müşteriyi etkileyen tek yatırım Tanıtım (eski kademe korunur).
  if (is.yatirimlar.dukkan !== undefined) {
    const tanitimId = profil.yatirimlar.find((y) => y.etki === "pazar")?.id;
    if (tanitimId) is.yatirimlar[tanitimId] = Math.max(is.yatirimlar[tanitimId] ?? 0, is.yatirimlar.dukkan);
    delete is.yatirimlar.dukkan;
  }
  if (is.hirsizlik_sonraki_yil === undefined) is.hirsizlik_sonraki_yil = null;
  if (!is.depo_oto) is.depo_oto = { acik: false, yuzde: 50 };
  if (!is.piyasa_sapma) piyasaSapmasiniYenile(state);
  if (is.yil_alim === undefined) is.yil_alim = 0;
  if (!is.yil_alinan) is.yil_alinan = {};
  if (is.hirsizlik_son_yil === undefined) is.hirsizlik_son_yil = null;
  if (!is.imtiyazlar) is.imtiyazlar = {};
  if (is.tekel_hat === undefined) is.tekel_hat = null;
  // Eski aday/çalışan biçimi: aday listesi yeni şemaya uymuyorsa yenilenir; ekip rolleri yeni türlere taşınır.
  const eskiBicim = is.adaylar.some((a) => (a as unknown as { yetenek?: number }).yetenek === undefined);
  if (eskiBicim) adaylariYenile(state);
  const ESKI_ROL: Record<string, IsletmeRolTuru> = { yazi: "musteri", satin_alma: "maliyet", satis: "ana" };
  const anaVar = profil.roller.some((r) => r.tur === "ana");
  for (const a of is.adaylar) {
    if (a.rolTuru === "ana" && !anaVar) {
      a.rolTuru = "musteri";
      a.rol = rolAdiGetir(profil, "musteri").tr;
    }
  }
  for (const uye of state.ekip) {
    const eskiRol = uye.rol_turu as unknown as string | undefined;
    if (eskiRol && ESKI_ROL[eskiRol]) uye.rol_turu = ESKI_ROL[eskiRol];
    if (uye.rol_turu === "ana" && !anaVar) {
      uye.rol_turu = "musteri";
      uye.rol = rolAdiGetir(profil, "musteri").tr;
    }
    if (uye.rol_turu && uye.y_giris === undefined) {
      uye.y_giris = uye.gercekKalite;
      uye.s_giris = uye.sadakat;
      uye.maas_taban = r2(uye.maas / Math.max(0.01, b.enflasyon));
    }
  }
}

/** Bu yılın dürüst tahmini bütçesi (ticaret/üretim modu): satış, alım (çürüme dahil), depo, aidat, vergi, borç ödemesi. */
export interface IsletmeButcesi {
  satis: number;
  alim: number;
  /** alım içindeki, çürüyüp boşa giden mal tahmini (bilgi). */
  curume: number;
  depo: number;
  aidat: number;
  /** satış − alım − depo − aidat. */
  brut: number;
  vergi: number;
  borcOdeme: number;
  /** brüt − vergi − borç ödemesi (dökümdeki `net` ile aynı tanım). */
  net: number;
  maas: number;
}

export function isletmeButcesi(state: CharacterState, b: IsletmeBaglami): IsletmeButcesi {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  const bos: IsletmeButcesi = { satis: 0, alim: 0, curume: 0, depo: 0, aidat: 0, brut: 0, vergi: 0, borcOdeme: 0, net: 0, maas: 0 };
  if (!is || !profil) return bos;
  const maas = r2(state.ekip.reduce((t, u) => t + u.maas, 0));
  if (profil.mod === "cemaat") {
    const brut = cemaatBeklenenKar(state, b);
    return { ...bos, brut, net: brut, maas };
  }
  const curume = curumeOrani(is);
  let satis = 0;
  let alim = 0;
  let curumeKaybi = 0;
  const tavan = uretimTavani(state);
  const acik = is.hatlar.filter((h) => h.acik).slice(0, hatSlotSayisi(state));
  const hesaplar = acik
    .map((hat) => ({ tanim: hatTanimiGetir(profil, hat.id), hat }))
    .filter((x): x is { tanim: NonNullable<typeof x.tanim>; hat: typeof x.hat } => !!x.tanim)
    .map(({ tanim, hat }) => ({ h: hatHesapla(state, hat, tanim, b) }));
  const toplamTalep = hesaplar.reduce((t, x) => t + x.h.talep, 0);
  const olcek = tavan !== null && toplamTalep > tavan ? tavan / toplamTalep : 1;
  for (const { h } of hesaplar) {
    const talep = h.talep * olcek;
    satis += talep * h.birimFiyat;
    const kayip = talep * curume * h.birimMaliyet;
    curumeKaybi += kayip;
    alim += talep * h.birimMaliyet + kayip;
  }
  const depo = dukkanGideri(state, b.giderEnflasyon);
  const aidat = satis * loncaAidatiOrani(pazarPayiHesapla(state));
  const brut = satis - alim - depo - aidat;
  const vergi = brut > 0 ? brut * vergiOrani(state) : 0;
  const borcOdeme = is.tedarikci_borcu > 0 && brut - vergi > 0 ? Math.min(is.tedarikci_borcu, (brut - vergi) * BORC_ODEME_ORANI) : 0;
  return {
    satis: r2(satis),
    alim: r2(alim),
    curume: r2(curumeKaybi),
    depo: r2(depo),
    aidat: r2(aidat),
    brut: r2(brut),
    vergi: r2(vergi),
    borcOdeme: r2(borcOdeme),
    net: r2(brut - vergi - borcOdeme),
    maas,
  };
}

/** Beklenen yıllık brüt kâr (satış − alım − depo − aidat; "yıllık kazanç" göstergesi ve ilk yıl tahmini). */
export function beklenenBrutKar(state: CharacterState, b: IsletmeBaglami): number {
  return isletmeButcesi(state, b).brut;
}

/** hesaplaMaasYillik'in işletme karşılığı: geçen yılın DÜKKAN NETİ (brüt − vergi − borç ödemesi); ilk yıl beklenen net. Eksi olabilir (zarar). */
export function isletmeGelirTahmini(state: CharacterState, b: IsletmeBaglami): number {
  const is = state.isletme;
  if (!is) return 1;
  const d = is.son_dokum;
  if (d) return r2(d.brutKar - d.vergi - d.borcOdeme);
  return isletmeButcesi(state, b).net;
}

// ── Depoyu elle doldurma (v12) ──────────────────────────────────────────────
export interface DepoDoldurHat {
  hat: string;
  adet: number;
  birimMaliyet: number;
  tutar: number;
}
export interface DepoDoldurPlani {
  hedefYuzde: number;
  mevcutYuzde: number;
  kapasite: number;
  /** Elindeki parayla gerçekten alınacak adet ve ödenecek tutar (para eksiye düşmez). */
  adet: number;
  maliyet: number;
  hatlar: DepoDoldurHat[];
  /** Hedefe tam ulaşmak için gereken adet ve tutar. */
  tamAdet: number;
  tamMaliyet: number;
  /** Para hedefe yetmiyor mu? */
  yetersiz: boolean;
  elindekiPara: number;
  /** Bu alımdan sonra depo doluluğu (%). */
  ulasilacakYuzde: number;
}

/**
 * Depoyu kapasitenin `hedefYuzde`'sine kadar doldurmanın planı (parayı çekmez). Alınacak mal açık hatlara
 * beklenen talepleriyle orantılı dağıtılır (talep oyuncuya gösterilmez); maliyet = adet × güncel birim alış fiyatı.
 * v20: para hedefe yetmiyorsa yalnız parası yettiği kadar alınır (para asla eksiye düşmez); plan `yetersiz` ve
 * ulaşılacak yüzdeyi söyler.
 */
export function depoDoldurPlani(state: CharacterState, hedefYuzde: number, b: IsletmeBaglami): DepoDoldurPlani {
  const is = state.isletme;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!is || !profil || profil.mod === "cemaat") throw new Error("Bu mesleğin deposu yok.");
  if (!(DEPO_DOLDUR_YUZDELERI as readonly number[]).includes(hedefYuzde)) throw new Error("Geçersiz doldurma oranı.");
  const kapasite = depoKapasitesi(is);
  const mevcut = toplamStok(is);
  const hedefAdet = Math.floor((kapasite * hedefYuzde) / 100);
  const eksik = Math.max(0, hedefAdet - mevcut);
  const acik = is.hatlar.filter((h) => h.acik && !!hatTanimiGetir(profil, h.id)).slice(0, hatSlotSayisi(state));
  const hesaplar = acik.map((hat) => ({ hat, hs: hatHesapla(state, hat, hatTanimiGetir(profil, hat.id)!, b) }));
  const agirliklar = hesaplar.map((x) => Math.max(0, x.hs.talep));
  const toplamAgirlik = agirliklar.reduce((t, x) => t + x, 0);
  const pay = hesaplar.map((_, i) => (toplamAgirlik > 0 ? agirliklar[i] / toplamAgirlik : 1 / Math.max(1, hesaplar.length)));
  const adetler = pay.map((p) => Math.floor(eksik * p));
  let artan = hesaplar.length > 0 ? eksik - adetler.reduce((t, x) => t + x, 0) : 0;
  const sira = pay.map((p, i) => [p, i] as const).sort((x, y) => y[0] - x[0]);
  for (let k = 0; artan > 0 && sira.length > 0; k = (k + 1) % sira.length, artan--) adetler[sira[k][1]] += 1;
  const birimler = hesaplar.map((x) => x.hs.birimMaliyet);
  const toplamTutar = (a: number[]) => a.reduce((t, n, i) => t + n * birimler[i], 0);
  const tamAdet = adetler.reduce((t, x) => t + x, 0);
  const tamMaliyet = r2(toplamTutar(adetler));
  const elindekiPara = Math.max(0, r2(state.para));
  // Para yetmiyorsa en kalabalık hattan birer birim düşerek parasının yettiği kadarına in.
  const alinacak = [...adetler];
  while (toplamTutar(alinacak) > elindekiPara + 1e-9) {
    let en = -1;
    for (let i = 0; i < alinacak.length; i++) if (alinacak[i] > 0 && (en < 0 || alinacak[i] > alinacak[en])) en = i;
    if (en < 0) break;
    alinacak[en] -= 1;
  }
  const hatlar: DepoDoldurHat[] = hesaplar
    .map((x, i) => ({ hat: x.hat.id, adet: alinacak[i], birimMaliyet: r2(birimler[i]), tutar: r2(alinacak[i] * birimler[i]) }))
    .filter((x) => x.adet > 0);
  const adet = hatlar.reduce((t, x) => t + x.adet, 0);
  return {
    hedefYuzde,
    mevcutYuzde: kapasite > 0 ? Math.round((mevcut / kapasite) * 100) : 0,
    kapasite,
    adet,
    maliyet: r2(hatlar.reduce((t, x) => t + x.tutar, 0)),
    hatlar,
    tamAdet,
    tamMaliyet,
    yetersiz: adet < tamAdet,
    elindekiPara,
    ulasilacakYuzde: kapasite > 0 ? Math.round(((mevcut + adet) / kapasite) * 100) : 0,
  };
}

/** Planı uygular: parayı hemen çeker (para eksiye düşmez; yetmeyen kısım alınmaz), stoğu ekler, yıl içi alım sayacına yazar. */
export function depoyuDoldur(state: CharacterState, hedefYuzde: number, b: IsletmeBaglami): DepoDoldurPlani {
  const plan = depoDoldurPlani(state, hedefYuzde, b);
  const is = state.isletme!;
  if (plan.adet <= 0) return plan;
  state.para = Math.max(0, r2(state.para - plan.maliyet));
  is.yil_alim = r2((is.yil_alim ?? 0) + plan.maliyet);
  if (!is.yil_alinan) is.yil_alinan = {};
  for (const h of plan.hatlar) {
    const hat = is.hatlar.find((x) => x.id === h.hat)!;
    hat.stok += h.adet;
    is.yil_alinan[h.hat] = (is.yil_alinan[h.hat] ?? 0) + h.adet;
  }
  return plan;
}

/** v20: otomatik depo açıksa seçilen yüzdeye (para yettiği kadar) doldurur; ticaret/üretim modu dışında etkisiz. */
export function otomatikDepoDoldur(state: CharacterState, b: IsletmeBaglami): DepoDoldurPlani | null {
  const oto = state.isletme?.depo_oto;
  const profil = isletmeProfiliGetir(state.meslek, state.cag);
  if (!oto?.acik || !profil || profil.mod === "cemaat") return null;
  if (!(DEPO_DOLDUR_YUZDELERI as readonly number[]).includes(oto.yuzde)) return null;
  return depoyuDoldur(state, oto.yuzde, b);
}

/** v20: her hat için o yılın piyasa sapması: alış ±%3, satış ±%2 (yıl boyu sabit). */
export function piyasaSapmasiniYenile(state: CharacterState): void {
  const is = state.isletme;
  if (!is) return;
  const sapma: Record<string, { alis: number; satis: number }> = {};
  for (const h of is.hatlar) {
    sapma[h.id] = {
      alis: 1 + (Math.random() * 2 - 1) * PIYASA_SAPMA_ALIS,
      satis: 1 + (Math.random() * 2 - 1) * PIYASA_SAPMA_SATIS,
    };
  }
  is.piyasa_sapma = sapma;
  is.piyasa_sapma_yili = state.yil;
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

/** Sonuç başına [depodan çalınan stok %, nakit hasarı %] — nakit: geçen yılın TOPLAM satışına göre, eldeki nakitle sınırlı DEĞİL. */
export const HIRSIZLIK_KAYIPLARI: Record<HirsizlikSonucu, { urun: [number, number]; nakit: [number, number] }> = {
  agir: { urun: [40, 55], nakit: [30, 45] },
  rahat: { urun: [25, 40], nakit: [20, 30] },
  kismi: { urun: [6, 14], nakit: [0, 8] },
  engellendi: { urun: [0, 0], nakit: [0, 0] },
  sans: { urun: [0, 0], nakit: [0, 0] },
};

/** v20: dış hırsızlık takvimi — önceki olaydan (ya da işletme kuruluşundan) 9–11 yıl sonra. */
export const HIRSIZLIK_ARALIK_YIL: [number, number] = [9, 11];
export function hirsizlikSonrakiYil(yil: number, rnd: () => number = Math.random): number {
  const [a, b] = HIRSIZLIK_ARALIK_YIL;
  return yil + a + Math.floor(rnd() * (b - a + 1));
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
  /** Yıl içinde elle yapılan alımların (para o zaman çekildi) tutarı: yıl sonu nakit etkisi = net + önOdenenAlim. */
  onOdenenAlim: number;
  dokum: IsletmeDokum;
}

export function sureleriKontrolEt(state: CharacterState, uyarilar: IsletmeUyari[]): void {
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

/** Düşük sadakatli çalışanlar sızdırır, çalar, ayrılır (her işletme modu için ortak). */
export function calisanSadakatKontrolleri(
  state: CharacterState,
  gelirTaban: number,
  uyarilar: IsletmeUyari[]
): { nakitHasar: number; ekstraGider: number } {
  const is = state.isletme!;
  const rakip = aktifRakip(state);
  let nakitHasar = 0;
  let ekstraGider = 0;
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
      const nakitYuzde = 3 + Math.random() * 3;
      stokAzalt(is, urunYuzde / 100);
      const tutar = r2(gelirTaban * (nakitYuzde / 100));
      nakitHasar += tutar;
      uyarilar.push({ kod: "ic_hirsizlik", isim: uye.isim, urunYuzde: Math.round(urunYuzde), nakitYuzde: Math.round(nakitYuzde), tutar });
    }
    if (Math.random() < risk / 500) {
      state.ekip = state.ekip.filter((e) => e.id !== uye.id);
      ekstraGider += uye.maas * 1.5;
      uyarilar.push({ kod: "calisan_ayrildi", isim: uye.isim });
    }
  }
  return { nakitHasar, ekstraGider };
}

export function isletmeYilIsle(state: CharacterState, b: IsletmeBaglami): IsletmeYilSonucu {
  const is = state.isletme!;
  const profil = isletmeProfiliGetir(state.meslek, state.cag)!;
  if (profil.mod === "cemaat") return cemaatYilIsle(state, b);
  const kapasite = depoKapasitesi(is);
  const uyarilar: IsletmeUyari[] = [];
  const slot = hatSlotSayisi(state);
  const acik = is.hatlar.filter((h) => h.acik && !!hatTanimiGetir(profil, h.id)).slice(0, slot);
  const eskiMusteri = musteriSayisi(state);
  // v12: nakit hasarlar (hırsızlık, baskın, sızdırma) geçen yılın TOPLAM gelirine (satış) göre hesaplanır, kâra göre değil.
  const oncekiGelir = is.son_dokum ? is.son_dokum.satis : isletmeButcesi(state, b).satis;
  const gelirTaban = Math.max(0, oncekiGelir);
  let nakitHasar = 0;
  let ekstraGider = 0;

  sureleriKontrolEt(state, uyarilar);
  calisanlariGelistir(state);
  calisanMaaslariniGuncelle(state, b.giderEnflasyon);

  // 1. Talep (yılın gürültüsüyle). v12: alım yıl sonunda otomatik DEĞİL — oyuncu depoyu yıl içinde elle doldurur (depoyuDoldur).
  const planlar = acik.map((hat) => {
    const tanim = hatTanimiGetir(profil, hat.id)!;
    const hs = hatHesapla(state, hat, tanim, b);
    return { hat, tanim, hs, talep: hs.talep * (1 - TALEP_GURULTUSU + Math.random() * 2 * TALEP_GURULTUSU) };
  });
  // Zanaatkâr'da depo HAMMADDE tutar (1 hammadde = 1 ürün); üretim tavanı alımı değil SATIŞI sınırlar (adım 5).
  const tavan = uretimTavani(state);
  const alim = is.yil_alim ?? 0; // yıl içinde ödenmiş alımlar (para zaten çekildi; yıl sonu nakit etkisinde geri eklenir)
  const alinanlar: Record<string, number> = { ...(is.yil_alinan ?? {}) };

  // 2. Çalışan sadakati: düşük sadakatli çalışan sızdırır, çalar, ayrılır.
  const rakip = aktifRakip(state); // saldırgan / sızdırma hedefi: en büyük aktif rakip
  const sadakat = calisanSadakatKontrolleri(state, gelirTaban, uyarilar);
  nakitHasar += sadakat.nakitHasar;
  ekstraGider += sadakat.ekstraGider;

  // 3. Dış hırsızlık (v20): kesin takvim — önceki olaydan 9–11 yıl sonra (ilk 7 yıl yok); o yıl depo boşsa ertesi yıla kayar.
  //    Sonucu Koruma belirler; depodan çalınan stok ve nakit hasarı (önceki yıl satışının %'si) iki ayrı orandır.
  const stokPik = toplamStok(is);
  if (is.hirsizlik_sonraki_yil == null) is.hirsizlik_sonraki_yil = hirsizlikSonrakiYil(is.baslangic_yili ?? state.yil);
  if (!ilkYillarGuvenli(state) && state.yil >= is.hirsizlik_sonraki_yil && stokPik >= 5) {
    is.hirsizlik_son_yil = state.yil;
    is.hirsizlik_sonraki_yil = hirsizlikSonrakiYil(state.yil);
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
    const tutar = r2(gelirTaban * (nakitYuzde / 100));
    nakitHasar += tutar;
    uyarilar.push({ kod: "hirsizlik", sonuc, urunYuzde: Math.round(urunYuzde), nakitYuzde: Math.round(nakitYuzde), tutar });
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
  if (!ilkYillarGuvenli(state) && state.yil >= state.rakip_sonraki_saldiri_yili) {
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
          const tutar = r2(gelirTaban * (yuzde / 100));
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
    }
    satirlar.push({ id: p.hat.id, talep: talepAdet, satilan, alinan: alinanlar[p.hat.id] ?? 0, stokSonu: p.hat.stok, birimMaliyet: r2(p.hs.birimMaliyet), birimFiyat: r2(p.hs.birimFiyat) });
    p.hat.son_talep = talepAdet;
    p.hat.son_satis = satilan;
  });

  // 6. Depo: çürüme (kademeye göre, kapalı hatlar dahil) + yalnız kademeye bağlı sabit bakım.
  const yatirimMasrafi = yatirimYillikMasrafi(state, b.giderEnflasyon);
  const depoMasrafi = r2(depoBakimMasrafi(is, b.giderEnflasyon) + yatirimMasrafi); // dükkân gideri
  const curume = curumeOrani(is);
  let curumeKaybi = 0;
  for (const hat of is.hatlar) {
    const tanim = hatTanimiGetir(profil, hat.id);
    if (!tanim) continue;
    const once = hat.stok;
    hat.stok = Math.round(hat.stok * (1 - curume * (anaUrunBonusu(state, hat.id)?.curumeCarpani ?? 1)));
    const plan = planlar.find((p) => p.hat.id === hat.id);
    curumeKaybi += (once - hat.stok) * (plan ? plan.hs.birimMaliyet : tanim.birimMaliyet * b.giderEnflasyon);
    if (hat.stok > 0 && !hat.acik && hat.stok >= 20) uyarilar.push({ kod: "fazla_stok", hat: hat.id });
  }

  // 7. Müşteri sayısı: sabit +1 ve yüzdelik büyüme (şöhret + fiyat + tanıtım + müşteri çalışanları); mal biterse kayıp.
  //    Kazanç/kayıp diğer gruplardan büyüklükleriyle orantılı alınır/verilir (piyasa.ts).
  const musteriRolu = state.ekip.reduce((t, u) => {
    const bn = calisanBonusu(u);
    return t + (bn?.tur === "musteri" ? bn.deger : 0);
  }, 0);
  const karsilanamayanOrani = toplamTalep > 0 ? toplamKarsilanamayan / toplamTalep : 0;
  // Önceki yıldan bekleyen kayıp bu yıl gerçekleşir (gecikmeli): müşteriler bir süre bekler, sonra gider.
  const bekleyenKayip = Math.min(is.bekleyen_musteri_kaybi ?? 0, state.meslek_musteri);
  if (bekleyenKayip > 0) {
    musteriKaydir(state, "oyuncu", -bekleyenKayip);
    uyarilar.push({ kod: "kitle_kaybi" });
  }
  is.bekleyen_musteri_kaybi = 0;
  if (karsilanamayanOrani > KITLE_KAYIP_ESIGI) {
    // Bu yılın kaybı hemen değil, gelecek yıl işlenir; karşılanamayan oranın %20'si kadar müşteri kaçar (tavan %10).
    const kayipYuzde = Math.min(KITLE_KAYIP_TAVANI, karsilanamayanOrani * KITLE_KAYIP_KESRI);
    is.bekleyen_musteri_kaybi = state.meslek_musteri * kayipYuzde;
  }
  if (satis > 0) {
    const fiyatEtkisi =
      planlar.length > 0 ? planlar.reduce((t, p) => t + (FIYAT_POLITIKASI[p.hat.fiyat]?.pay ?? 0), 0) / planlar.length : 0;
    const cesitlilik = Math.max(0, planlar.length - 1) * HAT_CESITLILIK_MUSTERI; // her ek açık hat: ürün çeşitliliği
    const ham = sohretPayBuyumesi(state.un) + fiyatEtkisi + tanitimBuyumesi(state) + musteriRolu + cesitlilik + yatkinlikMusteriBuyumesi(state) + esMusteriBuyumesi(state);
    const mevcutPay = pazarPayiHesapla(state);
    // Pay büyüdükçe pozitif büyüme doyar (pay %60'a yaklaşınca sıfır); eksi etkiler tam işler.
    // Veba sürerken pozitif büyüme %70 kısılır (v10); eksi etkiler tam işler.
    const vebaKisma = state.veba?.aktif ? VEBA_ARTIS_CARPANI : 1;
    const yuzde = ham > 0 ? ham * Math.max(0, 1 - mevcutPay / PAY_DOYMA_ESIGI) * vebaKisma : ham;
    musteriKaydir(state, "oyuncu", sabitMusteriArtisi(state.yas) * vebaKisma + state.meslek_musteri * yuzde);
  }

  // 7b. Aranma gölgesi (v10): gelir kısmak yerine yıllık müşteri/inanan ve ahlak kaybı (1★ %1·0.3 · 2★ %2.5·0.6 · 3★ %4·1.0).
  const aranmaKaybi = aranmaMusteriKaybi(state.suc_seviyesi);
  if (aranmaKaybi > 0) {
    musteriKaydir(state, "oyuncu", -state.meslek_musteri * aranmaKaybi);
    state.ahlak = Math.max(0, state.ahlak - aranmaAhlakKaybi(state.suc_seviyesi));
  }

  // 8. Brüt kâr, vergi, borç.
  const loncaAidati = r2(satis * loncaAidatiOrani(pazarPayiHesapla(state)));
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
    yatirimMasrafi,
    loncaAidati,
    calisanMaasi: r2(state.ekip.reduce((t, u) => t + u.maas, 0)),
    nakitHasar: r2(nakitHasar),
    ekstraGider: r2(ekstraGider),
    curumeKaybi: r2(curumeKaybi),
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
  is.yil_alim = 0;
  is.yil_alinan = {};
  adaylariGerekirseYenile(state);
  piyasaSapmasiniYenile(state); // bir sonraki yılın alış/satış sapması
  return { net, onOdenenAlim: r2(alim), dokum };
}
