import type {
  BirlikArazi,
  BirlikDurumu,
  BirlikKalite,
  BirlikSavasKarari,
  BirlikTur,
  CharacterState,
  IsletmeRolTuru,
} from "../types";
import {
  ARAZI_CARPANLARI,
  BASLANGIC_ER,
  KUSATMA_ACIK,
  dusmanReferansGucuYas,
  DOKTRINLER,
  ER_BASI_GELIR,
  ER_MASRAFI,
  ER_TAVANI,
  ERZAK_BIRIMI,
  ERZAK_DONEM_CARPANI,
  GANIMET_PAYI_TANIMLARI,
  GOREVLER,
  GOREV_DONEM_CARPANI,
  GOREV_SLOTLARI,
  KALE_KOMUTA_BONUSU,
  KIRALIK_KALITE_CARPANI,
  KIRALIK_YILLIK,
  SAVAS_ER_BASI_CARPANI,
  LIMIT_ASIM_GIDER_CARPANI,
  YARALI_TEDAVI_GIDERI,
  SEFER_ORDU_ORANI,
  YAGMA_ESIR,
  YAGMA_YIL,
  GOREV_GELIR_CARPANI,
  SUVARI_GOREV_GELIRI,
  ZIRHLI_OLU_AZALTMA,
  IKMAL_TANIMLARI,
  IKMAL_SIRASI,
  KALITE_BAKIM,
  KALITE_CARPANI,
  KALITE_FIYATI,
  KARSI_TUR,
  KARSI_TUR_BONUSU,
  KISLA_BAKIM,
  KISLA_ER_LIMITI,
  MORAL_BASLANGIC,
  PIYADE,
  REVIR_KAYIP_KADEME,
  ROL_TANIMLARI,
  SERTLIK_GELIR_KATSAYISI,
  SOLD,
  SUBAY_KISLA_BONUSU,
  SUBAY_RUTBE_TABANI,
  TALIM_GUC_KATSAYISI,
  TALIM_KAYIP_KATSAYISI,
  TALIM_TANIMLARI,
  TUR_TANIMLARI,
  VEBA_GOREV_CARPANI,
  YOL_ETKILERI,
  doktrinToplami,
  emirGetir,
  gorevGetir,
  moralGucEtkisi,
  odenmeyenCeza,
  type GorevTanimi,
  BARIS_CATISMA_ILK_YIL,
  KALE_GELIR,
} from "../data/birlik";
import { subayToplami } from "./subay";
import { adaylariYenile, ekipBonuslari, imtiyazAktifMi, korumaHesapla, type IsletmeBaglami } from "./isletme";

/**
 * Asker "birlik" işletmesi — durum, güç, limit ve gelir/gider hesabı (2026-11).
 * Yıllık işleme ve savaş: game/birlikYil.ts · oyuncu işlemleri: game/birlikIslem.ts.
 * Bu dosya saf hesap + durum kurulumu içerir (gameEngine'e bağımlı değildir).
 */

export const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x));
export const r2 = (x: number) => Math.round(x * 100) / 100;

export function birlikDurumu(state: CharacterState): BirlikDurumu | null {
  return state.isletme?.birlik ?? null;
}
export function birlikAl(state: CharacterState): BirlikDurumu {
  const b = state.isletme?.birlik;
  if (!b) throw new Error("Bu mesleğin bir birliği yok.");
  return b;
}
/** Haçlı/sefer yolculuğunda mı (ordunun yarısı seferde). */
export const seferdeMi = (state: CharacterState) => state.meslek === "Asker" && state.etiketler.includes("yolculukta");
export const erSayisi = (state: CharacterState) => Math.max(0, Math.round(state.meslek_musteri ?? 0));

// ── Durum kurulumu ──────────────────────────────────────────────────────────
export function birlikVarsayilan(er: number): BirlikDurumu {
  return {
    kalite: { dusuk: er, orta: 0, yuksek: 0 },
    hedef_kalite: "dusuk",
    kalite_kilit_bitis: null,
    birlik_seviye: 0,
    birlik_turler: [],
    birlik_kilit_bitis: null,
    kusatma_seviye: 0,
    talim: 0,
    talim_politikasi: "orta",
    ganimet_payi: "dengeli",
    ton: "dengeli",
    moral: MORAL_BASLANGIC,
    sertlik: 0,
    gorevler: ["devriye"],
    doktrinler: [],
    bekleyen_doktrin: 1,
    esir_bekleyen: 0,
    guc: er * 1.05,
    savas: null,
    savas_karari: null,
    kale: 0,
    asiri_son_yil: null,
    zar_bonusu: 0,
    erzak_oran: 1,
    baris_bekleme: BARIS_CATISMA_ILK_YIL,
    kale_gelir: [],
  };
}

/** Asker işletmesi ilk kez kurulurken çağrılır. */
export function birlikBaslat(state: CharacterState): void {
  const er = clamp(erSayisi(state) || BASLANGIC_ER, 1, ER_TAVANI);
  state.meslek_musteri = er;
  state.isletme = {
    hatlar: [],
    yatirimlar: {},
    tedarikci_borcu: 0,
    son_dokum: null,
    adaylar: [],
    aday_yili: state.yil,
    hirsizlik_son_yil: null,
    baslangic_yili: state.yil,
    imtiyazlar: {},
    tekel_hat: null,
    birlik: birlikVarsayilan(er),
  };
  adaylariYenile(state);
  doktrinBekleyenSeviye(state);
  birlikSenkron(state);
}

/** Eski (maaşlı) Asker kaydının ordu sayısını ve teçhizat seviyesini birlik durumuna çevirir. */
function eskiOrduyuTasi(state: CharacterState, is: NonNullable<CharacterState["isletme"]>, er: number, tech: number): void {
  state.meslek_musteri = er;
  const b = birlikVarsayilan(er);
  if (tech >= 60) {
    b.kalite = { dusuk: er - Math.round(er * 0.6), orta: Math.round(er * 0.4), yuksek: Math.round(er * 0.2) };
  } else if (tech >= 25) {
    b.kalite = { dusuk: er - Math.round(er * 0.3), orta: Math.round(er * 0.3), yuksek: 0 };
  }
  // Eski teçhizat seviyesine göre kışla kademesi; limit er sayısını karşılamalı.
  is.yatirimlar = { ...(is.yatirimlar ?? {}) };
  let kisla = tech >= 60 ? 2 : tech >= 25 ? 1 : 0;
  while (kisla < KISLA_ER_LIMITI.length - 1 && KISLA_ER_LIMITI[kisla] < er) kisla++;
  is.yatirimlar.kisla = kisla;
  is.birlik = b;
  // Pazar, ordunun en az ~3 katı olsun (rakipler ve diğer ordular için yer).
  state.pazar_musteri = Math.max(state.pazar_musteri ?? 0, er * 3 + 20);
  // Eski ajanlar ekipten çıkar (subay rolü olmayanlar), ajan görevleri silinir.
  state.ekip = state.ekip.filter((e) => !!e.rol_turu);
  state.ajan_gorevleri = [];
  // Alt rütbelerin doktrinleri otomatik (ilk evrensel) atanır; yalnız mevcut rütbe oyuncuya sorulur.
  for (let sv = 1; sv < (state.rutbe_seviye ?? 1); sv++) {
    const ilk = DOKTRINLER.find((d) => d.seviye === sv && d.kaynak === "evrensel");
    if (ilk) b.doktrinler.push(ilk.id);
  }
}

/** Eski kayıt / yeni Asker: eksik alanları tamamlar, ordu alanlarını birlik durumuna çevirir. */
export function birlikHazirla(state: CharacterState): void {
  if (!state.isletme) {
    const eskiEr = Math.round(state.ordu_mevcudu ?? 0);
    const eskiTech = state.ordu_techizat_seviyesi ?? 0;
    if (eskiEr > 0 && eskiEr !== BASLANGIC_ER) state.meslek_musteri = eskiEr;
    birlikBaslat(state);
    if (eskiEr > 0 && eskiEr !== BASLANGIC_ER) eskiOrduyuTasi(state, state.isletme!, clamp(eskiEr, 1, ER_TAVANI), eskiTech);
    return;
  }
  const is = state.isletme;
  if (!is.birlik) {
    // Eski (maaşlı) Asker: ordu_mevcudu er sayısıdır (yoksa meslek_musteri); teçhizat seviyesi kalite dağılımına çevrilir.
    const er = clamp(Math.round(state.ordu_mevcudu || erSayisi(state)) || BASLANGIC_ER, 1, ER_TAVANI);
    eskiOrduyuTasi(state, is, er, state.ordu_techizat_seviyesi ?? 0);
  }
  const b = is.birlik!;
  b.kalite = b.kalite ?? { dusuk: erSayisi(state), orta: 0, yuksek: 0 };
  // v39: Harp → Taarruz, Levazım → Savunma komutanı (eski kayıt göçü).
  {
    const yeniRol: Record<string, { tur: IsletmeRolTuru; ad: string }> = {
      ana: { tur: "taarruz", ad: "Taarruz komutanı" },
      maliyet: { tur: "savunma", ad: "Savunma komutanı" },
    };
    for (const a of is.adaylar ?? []) {
      const y = yeniRol[a.rolTuru as string];
      if (y) {
        a.rolTuru = y.tur;
        a.rol = y.ad;
      }
    }
    for (const uye of state.ekip) {
      const y = uye.rol_turu ? yeniRol[uye.rol_turu as string] : undefined;
      if (y) {
        uye.rol_turu = y.tur;
        uye.rol = y.ad;
      }
    }
  }
  if (!Array.isArray(b.gorevler)) b.gorevler = ["devriye"];
  if (!Array.isArray(b.doktrinler)) b.doktrinler = [];
  if (!Array.isArray(b.birlik_turler)) b.birlik_turler = [];
  // Eski "seviye" sistemi: yalnız seviye kadar tür açıktı; artık her açık tür %25. Tekrarları ve geçersizleri ayıkla.
  {
    const eskiSeviye = typeof b.birlik_seviye === "number" ? b.birlik_seviye : b.birlik_turler.length;
    const temiz = [...new Set(b.birlik_turler.slice(0, Math.max(0, eskiSeviye)))].filter((t) => t in TUR_TANIMLARI && (KUSATMA_ACIK || t !== "kusatma"));
    b.birlik_turler = temiz;
    b.kusatma_seviye = 0; // eski kuşatma seviyesi kalktı (kuşatma artık gizli bir birlik türü)
    b.birlik_seviye = temiz.length;
  }
  if (typeof b.moral !== "number") b.moral = MORAL_BASLANGIC;
  if (typeof b.sertlik !== "number") b.sertlik = 0;
  if (typeof b.talim !== "number") b.talim = 0;
  if (typeof b.zar_bonusu !== "number") b.zar_bonusu = 0;
  if (typeof b.erzak_oran !== "number") b.erzak_oran = 1;
  if (b.savas === undefined) b.savas = null;
  if (b.savas_karari === undefined) b.savas_karari = null;
  // Eski "kale çevresi" arazisi sık ormana dönüştü (ova / dağ geçidi / sık orman).
  if ((b.savas?.arazi as string | undefined) === "kale") b.savas!.arazi = "orman";
  if ((b.savas_karari?.arazi as string | null | undefined) === "kale") b.savas_karari!.arazi = "orman";
  // Eski kayıt: yıllık karardaki ikmal artık savaş boyu (b.savas.ikmal) tutulur.
  if (b.savas && !b.savas.ikmal && b.savas_karari?.ikmal && b.savas_karari.adim > 0) b.savas.ikmal = b.savas_karari.ikmal;
  // Eski kayıt: ikmal artık yalnız üç yağma türü (eski "yeterli" / "kit" / "yagma" → orta yağma).
  const eskiIkmal = (id: unknown) => !!id && !IKMAL_SIRASI.includes(id as never);
  if (b.savas && eskiIkmal(b.savas.ikmal)) b.savas.ikmal = "yagma_orta";
  if (b.savas_karari && eskiIkmal(b.savas_karari.ikmal)) b.savas_karari.ikmal = "yagma_orta";
  if (b.esir_bekleyen === undefined) b.esir_bekleyen = 0;
  if (b.kale === undefined) b.kale = 0;
  if (is.adaylar.length === 0) adaylariYenile(state);
  doktrinBekleyenSeviye(state);
  birlikSenkron(state);
}

/** Karakterin Asker kariyer yolu dalı (yol:asker:<dal>) ya da null. */
export function yolDali(state: CharacterState): string | null {
  const e = state.etiketler.find((t) => t.startsWith("yol:asker:"));
  return e ? e.slice("yol:asker:".length) : null;
}

// ── Kalite dağılımı ve senkron ──────────────────────────────────────────────
const KALITELER: BirlikKalite[] = ["dusuk", "orta", "yuksek"];

export function kaliteToplami(b: BirlikDurumu): number {
  return b.kalite.dusuk + b.kalite.orta + b.kalite.yuksek;
}

/** `n` eri kalite gruplarından orantılı çıkarır (ölüm / terhis / firar); gerçekte çıkarılanı döner. */
export function kaliteCikar(b: BirlikDurumu, n: number): number {
  const toplam = kaliteToplami(b);
  const cikar = Math.min(Math.max(0, Math.round(n)), toplam);
  if (cikar <= 0 || toplam <= 0) return 0;
  let kalan = cikar;
  for (const k of KALITELER) {
    const pay = Math.min(b.kalite[k], Math.floor((cikar * b.kalite[k]) / toplam));
    b.kalite[k] -= pay;
    kalan -= pay;
  }
  // Yuvarlama artığı: en çok eri olan gruptan, sonra diğerlerinden.
  while (kalan > 0) {
    const k = [...KALITELER].sort((x, y) => b.kalite[y] - b.kalite[x])[0];
    if (b.kalite[k] <= 0) break;
    b.kalite[k] -= 1;
    kalan -= 1;
  }
  return cikar - kalan;
}

/** `meslek_musteri` ile kalite toplamını eşitler; ordu alanlarını aynalar; gücü yeniler. */
export function birlikSenkron(state: CharacterState, enflasyon = 1): void {
  const b = birlikDurumu(state);
  if (!b) return;
  const er = clamp(Math.round(state.meslek_musteri ?? 0), 0, ER_TAVANI);
  state.meslek_musteri = er;
  const fark = er - kaliteToplami(b);
  if (fark > 0) b.kalite.dusuk += fark;
  else if (fark < 0) kaliteCikar(b, -fark);
  // Eski alanlar (hayat amaçları, başarımlar) için ayna.
  state.ordu_mevcudu = er;
  state.ordu_techizat_seviyesi = er > 0 ? Math.round(((b.kalite.orta * 0.5 + b.kalite.yuksek) / er) * 100) : 0;
  b.guc = Math.round(gucHesapla(state, { enflasyon }).guc * 10) / 10;
}

// ── Limitler ────────────────────────────────────────────────────────────────
export const rutbeIndeksi = (state: CharacterState) => clamp((state.rutbe_seviye ?? 1) - 1, 0, 4);
export const kislaKademesi = (state: CharacterState) => clamp(state.isletme?.yatirimlar.kisla ?? 0, 0, KISLA_ER_LIMITI.length - 1);
export const kislaLimiti = (state: CharacterState) => KISLA_ER_LIMITI[kislaKademesi(state)];
/** Ordu limiti = kışla limiti (+ kale bonusu); rütbe limiti kalktı. */
export function komutaLimiti(state: CharacterState): number {
  const taban = kislaLimiti(state) + (state.isletme?.birlik?.kale ?? 0) * KALE_KOMUTA_BONUSU;
  return Math.min(ER_TAVANI, Math.round(taban));
}
/** Tedavi gören yaralı er sayısı (tam sayı, ordu sayısını aşamaz). */
export function yaraliSayisi(state: CharacterState): number {
  const b = state.isletme?.birlik;
  if (!b) return 0;
  return clamp(Math.round(b.yarali ?? 0), 0, erSayisi(state));
}
/** Savaş sürerken seferberlik erleri (limit aşım gideri çarpanından muaf). */
export function seferberlikEri(state: CharacterState): number {
  return state.ulke.savasta ? Math.max(0, Math.round(state.isletme?.birlik?.savas?.seferberlik_er ?? 0)) : 0;
}
/** Kışla limitini aşan er sayısı (savaşta seferberlik erleri hariç). */
export function limitAsimEri(state: CharacterState): number {
  return Math.max(0, erSayisi(state) - seferberlikEri(state) - komutaLimiti(state));
}
/** Subay limiti = rütbe tabanı + kışla bonusu (isletme.calisanLimiti Asker'de bunu kullanır). */
export function subayLimiti(rutbe: number, kisla: number): number {
  return SUBAY_RUTBE_TABANI[clamp(rutbe - 1, 0, 4)] + SUBAY_KISLA_BONUSU[clamp(kisla, 0, SUBAY_KISLA_BONUSU.length - 1)];
}

// ── Özel birlik payları ─────────────────────────────────────────────────────
export function turPaylari(b: BirlikDurumu): Partial<Record<BirlikTur, number>> {
  // Açık her savaş birliği ordunun %20'si, kuşatma %10'u (en çok %90 özel, en az %10 piyade).
  const sonuc: Partial<Record<BirlikTur, number>> = {};
  for (const t of b.birlik_turler) if (t in TUR_TANIMLARI && (KUSATMA_ACIK || t !== "kusatma")) sonuc[t] = TUR_TANIMLARI[t].pay;
  return sonuc;
}
/** Bir türün payının tam paya (TUR_PAYI) oranı (0–1): küçük artılar bununla orantılı. */
export function turOrani(b: BirlikDurumu, tur: BirlikTur): number {
  const pay = turPaylari(b)[tur] ?? 0;
  return TUR_TANIMLARI[tur].pay > 0 ? Math.min(1, pay / TUR_TANIMLARI[tur].pay) : 0;
}
export function toplamTurPayi(b: BirlikDurumu): number {
  return Object.values(turPaylari(b)).reduce((t, x) => t + (x ?? 0), 0);
}

// ── Güç hesabı ──────────────────────────────────────────────────────────────
export interface GucSatiri {
  kod: string;
  /** Kesir: +0,06 = +%6. */
  deger: number;
  taraf: "ortak" | "saldiri" | "savunma";
}
export interface GucBaglami {
  enflasyon?: number;
  savas?: { arazi: BirlikArazi; dusmanTur: BirlikTur | "karma"; inisiyatif: "saldiri" | "savunma" };
  senaryo?: "haydut" | "sinir";
}
export interface GucDokumu {
  er: number;
  kalite: Record<BirlikKalite, number>;
  ham: number;
  piyadePayi: number;
  turPaylari: Partial<Record<BirlikTur, number>>;
  saldiriCarpani: number;
  savunmaCarpani: number;
  bonuslar: GucSatiri[];
  ortakBonus: number;
  saldiri: number;
  savunma: number;
  /** Pazar payı için askerî güç = (saldırı + savunma)/2. */
  guc: number;
}

/** Savaşta ya da kaos yıllarında geçerli senaryo bonusu: tür payı/%15 × tablo. */
const SENARYO_TABLOSU: Record<"haydut" | "sinir", Partial<Record<BirlikTur, number>>> = {
  haydut: { suvari: 0.15, okcu: 0.05 },
  sinir: { okcu: 0.1, mizrakli: 0.08, suvari: 0.05, zirhli: 0.06 },
};
export function senaryoBonusu(b: BirlikDurumu, senaryo: "haydut" | "sinir"): number {
  const paylar = turPaylari(b);
  let t = 0;
  for (const [tur, pay] of Object.entries(paylar) as [BirlikTur, number][]) t += (SENARYO_TABLOSU[senaryo][tur] ?? 0) * clamp(pay / 0.15, 0, 1.67);
  return t;
}

export function yolEtkisi(state: CharacterState) {
  return YOL_ETKILERI[yolDali(state) ?? ""] ?? {};
}

export function gucHesapla(state: CharacterState, ctx: GucBaglami = {}): GucDokumu {
  const b = birlikDurumu(state);
  const er = erSayisi(state);
  if (!b) {
    return { er, kalite: { dusuk: er, orta: 0, yuksek: 0 }, ham: er, piyadePayi: 1, turPaylari: {}, saldiriCarpani: 1, savunmaCarpani: 1, bonuslar: [], ortakBonus: 0, saldiri: er, savunma: er, guc: er };
  }
  const seferOrani = seferdeMi(state) ? SEFER_ORDU_ORANI : 1;
  // Yaralılar tedavi süresince savaş gücüne katılmaz.
  const saglamOrani = er > 0 ? 1 - yaraliSayisi(state) / er : 1;
  const ham =
    (b.kalite.dusuk * KALITE_CARPANI.dusuk + b.kalite.orta * KALITE_CARPANI.orta + b.kalite.yuksek * KALITE_CARPANI.yuksek) * seferOrani * saglamOrani +
    (b.savas?.kiralik_er ?? 0) * KIRALIK_KALITE_CARPANI;
  const paylar = turPaylari(b);
  const turToplam = Object.values(paylar).reduce((t, x) => t + (x ?? 0), 0);
  const piyade = 1 - turToplam;
  let sA = piyade * PIYADE.saldiri;
  let sS = piyade * PIYADE.savunma;
  for (const [tur, pay] of Object.entries(paylar) as [BirlikTur, number][]) {
    sA += pay * TUR_TANIMLARI[tur].saldiri;
    sS += pay * TUR_TANIMLARI[tur].savunma;
  }
  const bonuslar: GucSatiri[] = [];
  const ekle = (kod: string, deger: number, taraf: GucSatiri["taraf"] = "ortak") => {
    if (Math.abs(deger) > 1e-9) bonuslar.push({ kod, deger, taraf });
  };
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const sub = subayToplami(state);
  ekle("moral", moralGucEtkisi(b.moral));
  ekle("talim", Math.min(0.2, b.talim * TALIM_GUC_KATSAYISI));
  ekle("doktrin", doktrin.guc);
  ekle("yol", yol.guc ?? 0);
  ekle("taarruz_subay", sub.saldiri, "saldiri");
  ekle("savunma_subay", sub.savunma, "savunma");
  const emir = emirGetir(b.savas?.emir);
  if (emir && state.ulke.savasta) ekle("emir", emir.guc);
  if (doktrin.saldiri) ekle("doktrin_saldiri", doktrin.saldiri, "saldiri");
  if (doktrin.savunma) ekle("doktrin_savunma", doktrin.savunma, "savunma");
  ekle("erzak", 0.4 + 0.6 * clamp(b.erzak_oran, 0, 1) - 1);
  const ceza = odenmeyenCeza(state.para, ctx.enflasyon ?? 1);
  if (ceza) {
    ekle("odenmeyen_maas", ceza.maasGuc);
    ekle("odenmeyen_erzak", ceza.erzakGuc);
  }
  if (ctx.savas) {
    const ac = ARAZI_CARPANLARI[ctx.savas.arazi];
    let a1 = piyade * PIYADE.saldiri * ac.piyade;
    let s1 = piyade * PIYADE.savunma * ac.piyade;
    for (const [tur, pay] of Object.entries(paylar) as [BirlikTur, number][]) {
      const c = ac[tur]; // her özel birliğin kendi arazi çarpanı (okçu / süvari / mızraklı)
      a1 += pay * TUR_TANIMLARI[tur].saldiri * c;
      s1 += pay * TUR_TANIMLARI[tur].savunma * c;
    }
    if (sA > 0) ekle("arazi", a1 / sA - 1, "saldiri");
    if (sS > 0) ekle("arazi", s1 / sS - 1, "savunma");
    if (ctx.savas.dusmanTur !== "karma") {
      const karsi = KARSI_TUR[ctx.savas.dusmanTur];
      const pay = karsi ? paylar[karsi] ?? 0 : 0;
      if (pay > 0) ekle("karsi_tur", KARSI_TUR_BONUSU * clamp(pay / 0.15, 0, 1.67));
    }
  }
  if (ctx.senaryo) ekle("senaryo", senaryoBonusu(b, ctx.senaryo));
  const ortak = bonuslar.filter((x) => x.taraf === "ortak").reduce((t, x) => t + x.deger, 0);
  const yan = (taraf: "saldiri" | "savunma") => bonuslar.filter((x) => x.taraf === taraf).reduce((t, x) => t + x.deger, 0);
  const cA = clamp(1 + ortak + yan("saldiri"), 0.4, 2);
  const cS = clamp(1 + ortak + yan("savunma"), 0.4, 2);
  const saldiri = ham * sA * cA;
  const savunma = ham * sS * cS;
  return {
    er,
    kalite: { ...b.kalite },
    ham,
    piyadePayi: piyade,
    turPaylari: paylar,
    saldiriCarpani: sA,
    savunmaCarpani: sS,
    bonuslar,
    ortakBonus: ortak,
    saldiri,
    savunma,
    guc: (saldiri + savunma) / 2,
  };
}

// ── Doktrin ─────────────────────────────────────────────────────────────────
/** Seçilmeyi bekleyen doktrin seviyesi (yoksa null). */
export function doktrinBekleyenSeviye(state: CharacterState): number | null {
  const b = birlikDurumu(state);
  if (!b) return null;
  const s = b.doktrinler.length < (state.rutbe_seviye ?? 1) ? b.doktrinler.length + 1 : null;
  b.bekleyen_doktrin = s;
  return s;
}
export function doktrinBekliyorMu(state: CharacterState): boolean {
  return state.meslek === "Asker" && doktrinBekleyenSeviye(state) !== null;
}

// ── Düşman gücü (mutlak; bizim gücümüzden bağımsız) ─────────────────────────
/** Karakterin yaşına göre düşman referans gücü (rütbeden bağımsız: rütbe zaten güçten türer). */
export const dusmanReferansGucu = (state: CharacterState) => dusmanReferansGucuYas(state.yas);
// ── Görevler ────────────────────────────────────────────────────────────────
export const gorevSlotSayisi = (state: CharacterState) => GOREV_SLOTLARI[rutbeIndeksi(state)];

export interface GorevPayi {
  gorev: GorevTanimi;
  er: number;
  /** Göreve düşen askeri güç minimum güç şartını karşılıyor mu (savaş şartı dahil). */
  aktif: boolean;
}
/** Açık görevler (slot kadar) ve eşit bölünmüş er payları. */
export function gorevPaylari(state: CharacterState): GorevPayi[] {
  const b = birlikDurumu(state);
  if (!b) return [];
  const savasta = !!state.ulke.savasta;
  const secili = b.gorevler.map((id) => gorevGetir(id)).filter((g): g is GorevTanimi => !!g).slice(0, gorevSlotSayisi(state));
  const n = secili.length;
  if (n === 0) return [];
  // Sefer yolculuğunda ordunun yarısı seferdedir; kalan yarı görevlerine devam eder.
  // Yaralı erler tedavi süresince görevlerde çalışmaz.
  const er = Math.floor(Math.max(0, erSayisi(state) - yaraliSayisi(state)) * (seferdeMi(state) ? 1 - SEFER_ORDU_ORANI : 1));
  const taban = Math.floor(er / n);
  const artik = er - taban * n;
  // Görev eşikleri askeri güçle ölçülür: göreve düşen güç payı = toplam güç / görev sayısı.
  const gucPayi = gucHesapla(state).guc / n;
  return secili.map((g, i) => {
    const pay = taban + (i === 0 ? artik : 0);
    // Savaş sürerken görevlerden gelir yok (savaş ödeneği ve yağma geçerli).
    return { gorev: g, er: pay, aktif: gucPayi >= g.minGuc && (!g.yalnizSavas || savasta) && !savasta };
  });
}

export function gorevDonemCarpani(state: CharacterState, g: GorevTanimi): number {
  let c = 1;
  const donem = state.ulke.donem?.tur;
  if (donem) c *= GOREV_DONEM_CARPANI[g.tur]?.[donem] ?? 1;
  if (state.ulke.savasta) c *= g.savasCarpani;
  if (state.veba?.aktif) c *= VEBA_GOREV_CARPANI;
  return c;
}

// ── Kayıp / maliyet çarpanları ──────────────────────────────────────────────
/** Savaş ve görev kaybının çarpanı: talim, revir, tabip, doktrin. */
export function kayipCarpani(state: CharacterState): number {
  const b = birlikAl(state);
  const doktrin = doktrinToplami(b.doktrinler);
  const revir = clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * REVIR_KAYIP_KADEME;
  const sub = subayToplami(state);
  const tabip = sub.oluFirarAzalt;
  const talim = Math.min(0.15, b.talim * TALIM_KAYIP_KATSAYISI);
  const emir = state.ulke.savasta ? emirGetir(b.savas?.emir) : undefined;
  const zirhli = ZIRHLI_OLU_AZALTMA * turOrani(b, "zirhli");
  return Math.max(0.3, 1 - talim - revir - tabip - zirhli + sub.kayip + doktrin.kayip + (emir?.kayip ?? 0));
}
/** Doktrin (Levazım Disiplini vb.) + yol + ekip bonusu: er masrafı ve erzak çarpanı. */
export function masrafCarpani(state: CharacterState): number {
  const b = birlikAl(state);
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  return Math.max(0.4, ekipBonuslari(state).maliyetCarpani * (1 + doktrin.masraf + (yol.masraf ?? 0)));
}
export function sertlikGelirCarpani(b: BirlikDurumu): number {
  return 1 + b.sertlik * SERTLIK_GELIR_KATSAYISI;
}

// ── Gelir / gider hesabı (vergisiz, aidatsız) ───────────────────────────────
export interface BirlikGorevHesabi {
  id: string;
  er: number;
  aktif: boolean;
  gelir: number;
  ganimet: number;
  esir: number;
}
export interface BirlikHesabi {
  er: number;
  sold: number;
  erBasiGelir: number;
  gorevler: BirlikGorevHesabi[];
  gorevGeliri: number;
  ganimetBrut: number;
  /** Savaş ödeneği (savaşta sabit maaşın bir kesri; barışta 0) ve yağma ganimeti (brüt). */
  savasOdenegi: number;
  /** Tedavi gören yaralıların yıllık tedavi gideri ve kışla limitini aşan erlerin ek (×3) gideri. */
  yaraliGideri: number;
  limitAsimGideri: number;
  yagmaBrut: number;
  kiralikMasrafi: number;
  kaleGeliri: number;
  devletPayi: number;
  erPayi: number;
  ganimetNet: number;
  /** Beklenen esir sayısı (ondalık; yıl işlemede olasılıklı yuvarlanır). */
  esirBeklenen: number;
  erMasrafi: number;
  erzak: number;
  kislaBakim: number;
  techizatBakim: number;
  birlikBakim: number;
  kusatmaBakim: number;
  talimMasrafi: number;
  toplamGelir: number;
  toplamGider: number;
  /** Subay maaşı ve yeni er masrafları hariç yıllık net. */
  net: number;
}

export interface HesapSecenekleri {
  /** Ganimet çarpanı (genel savaş sonucu: zafer ×1,3 / yenilgi ×0,3; barışta 1). */
  ganimetCarpani?: number;
  /** Savaşın kaçıncı yılı (1 tabanlı). Verilmezse bir sonraki yıl (önizleme) sayılır. */
  savasYili?: number;
}

export function birlikHesapla(state: CharacterState, bg: IsletmeBaglami, sec: HesapSecenekleri = {}): BirlikHesabi {
  const b = birlikAl(state);
  const er = erSayisi(state);
  const rutbe = rutbeIndeksi(state);
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const savasta = !!state.ulke.savasta;
  // İkmal savaş planında bir kez seçilir (b.savas.ikmal, savaş boyu); rol yıllık karar penceresinden gelir.
  const karar: Pick<BirlikSavasKarari, "rol" | "ikmal"> = { rol: b.savas_karari?.rol ?? "ana", ikmal: (savasta ? b.savas?.ikmal : undefined) ?? b.savas_karari?.ikmal ?? "yagma_orta" };
  const rol = ROL_TANIMLARI[karar.rol];
  const ikmal = IKMAL_TANIMLARI[karar.ikmal];
  const moralC = b.moral >= 70 ? 1.05 : b.moral < 40 ? 0.9 : 1;
  const mizrakliAkin = (turPaylari(b).mizrakli ?? 0) > 0 ? 1 - 0.1 * clamp((turPaylari(b).mizrakli ?? 0) / 0.15, 0, 1.67) : 1;
  const gelirC = (1 + doktrin.gelir + (yol.gelir ?? 0)) * sertlikGelirCarpani(b) * moralC * bg.satisCarpani;
  const ganimetC =
    (1 + subayToplami(state).ganimet + doktrin.ganimet + (yol.ganimet ?? 0) + (savasta ? emirGetir(b.savas?.emir)?.ganimet ?? 0 : 0)) * sertlikGelirCarpani(b) * rol.ganimet * ikmal.ganimet * (sec.ganimetCarpani ?? 1) * bg.satisCarpani * (imtiyazAktifMi(state, "sefer_emri") ? 1.25 : 1);
  const mC = masrafCarpani(state);
  const soldTam = SOLD[rutbe] * bg.enflasyon * (1 + doktrin.sold + (yol.sold ?? 0));
  // Maaş kalemi tek: sabit kısım (savaşta aynen) + asker başı ödeme (savaşta devlet %30 fazla öder, oyuncuya gelir).
  const erBasiOdeme = er * ER_BASI_GELIR * bg.enflasyon * (savasta ? SAVAS_ER_BASI_CARPANI : 1);
  const sold = r2(soldTam + erBasiOdeme);
  const savasOdenegi = savasta ? sold : 0;
  const erBasiGelir = 0; // artık ayrı kalem değil (maaş kaleminin içinde)
  const kazancC = GOREV_GELIR_CARPANI;
  const gorevler: BirlikGorevHesabi[] = gorevPaylari(state).map(({ gorev: g, er: p, aktif }) => {
    if (!aktif) return { id: g.id, er: p, aktif, gelir: 0, ganimet: 0, esir: 0 };
    const akinC = (g.tur === "akin" ? mizrakliAkin : 1) * (g.tur === "akin" || g.tur === "haydut" ? 1 + SUVARI_GOREV_GELIRI * turOrani(b, "suvari") : 1);
    const gelir = p * g.erBasi * kazancC * bg.enflasyon * gorevDonemCarpani(state, g) * gelirC * akinC;
    // Ganimet: yalnız ganimetli görevlerde; savaş yılında ×2,5, barışta ×0,3 (savaş-yalnız görevler zaten savaşta).
    // Görev ganimeti yalnız savaş dışı yıllarda (savaşta büyük zafer ganimeti ve yağma var).
    const ganCarpan = savasta ? 0 : 0.3;
    const ganimet = g.ganimet > 0 ? p * g.ganimet * ganCarpan * bg.enflasyon * ganimetC : 0;
    const esir = g.ganimet > 0 ? p * g.ganimet * ganCarpan * 0.04 * ganimetC : 0;
    return { id: g.id, er: p, aktif, gelir, ganimet, esir };
  });
  const gorevGeliri = gorevler.reduce((t, x) => t + x.gelir, 0);
  const ganimetBrut = gorevler.reduce((t, x) => t + x.ganimet, 0);
  // Yağma (yalnız savaşta, ikmal kararı): güçle orantılı yıllık ganimet; esir ve yeni er de getirir.
  // Yağma türü (sert 0,7 / orta 0,5 / yumuşak 0,3 × güç) ikmal kararından gelir; yalnız savaşın ilk YAGMA_YIL yılında.
  const yagmaTuru = ikmal.yagma;
  const yagma = savasta && b.savas?.sonuc !== "yenilgi" && (sec.savasYili ?? (b.savas?.yil_sayac ?? 0) + 1) <= YAGMA_YIL;
  const yagmaBrut = yagma ? b.guc * yagmaTuru.gucOrani * bg.enflasyon * ganimetC : 0;
  const toplamBrut = ganimetBrut + yagmaBrut;
  const devletPayi = 0; // askerde devlet payı/vergi yok
  const erPayi = toplamBrut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran;
  const ganimetNet = toplamBrut - erPayi;
  const esirBeklenen = gorevler.reduce((t, x) => t + x.esir, 0) + (yagma ? b.guc * YAGMA_ESIR * ganimetC : 0);
  const paylar = turPaylari(b);
  const turBakim = (Object.entries(paylar) as [BirlikTur, number][]).reduce((t, [tur, pay]) => t + pay * TUR_TANIMLARI[tur].bakim, 0);
  const turErzak = (Object.entries(paylar) as [BirlikTur, number][]).reduce((t, [tur, pay]) => t + pay * (TUR_TANIMLARI[tur].erzak - 1), 0);
  // Kışla limitini aşan her er (savaşta seferberlik erleri hariç) masraf ve erzakta LIMIT_ASIM_GIDER_CARPANI kat öder.
  const asim = limitAsimEri(state);
  const giderEri = er + asim * (LIMIT_ASIM_GIDER_CARPANI - 1);
  const erMasrafi = giderEri * ER_MASRAFI * bg.giderEnflasyon * (1 + turBakim) * mC;
  const donem = state.ulke.savasta ? "savas" : state.veba?.aktif ? "veba" : state.ulke.donem?.tur ?? "durgunluk";
  const seferEk = b.savas?.seferberlik ? { genel: 0.2, dengeli: 0.08, secme: 0 }[b.savas.seferberlik] : 0;
  const erzak = giderEri * ERZAK_BIRIMI * bg.giderEnflasyon * (ERZAK_DONEM_CARPANI[donem as keyof typeof ERZAK_DONEM_CARPANI] ?? 1) * (1 + turErzak) * (1 + seferEk) * mC * ikmal.maliyet * (savasta ? 1 - ikmal.yagma.erzakIndirimi : 1) * (imtiyazAktifMi(state, "levazim_muafiyeti") ? 0.8 : 1);
  const kislaBakim = KISLA_BAKIM[kislaKademesi(state)] * bg.giderEnflasyon;
  const techizatBakim = (b.kalite.dusuk * KALITE_BAKIM.dusuk + b.kalite.orta * KALITE_BAKIM.orta + b.kalite.yuksek * KALITE_BAKIM.yuksek) * bg.giderEnflasyon;
  const yaraliGideri = yaraliSayisi(state) * YARALI_TEDAVI_GIDERI * bg.giderEnflasyon;
  const birlikBakim = 0; // türlerin bakımı er masrafına (turBakim) işlenir
  const kusatmaBakim = 0; // kuşatma artık bir birlik türü: bakımı er masrafındaki tür bakımına işlenir
  const talimMasrafi = er * TALIM_TANIMLARI[b.talim_politikasi].masraf * bg.giderEnflasyon;
  const kiralikMasrafi = savasta ? (b.savas?.kiralik_er ?? 0) * KIRALIK_YILLIK * bg.giderEnflasyon : 0;
  const kaleGeliri = r2(kaleGelirToplami(b) * bg.enflasyon);
  const limitAsimGideri = giderEri > er ? (erMasrafi + erzak) * (1 - er / giderEri) : 0;
  const toplamGelir = sold + erBasiGelir + gorevGeliri + ganimetNet + kaleGeliri;
  const toplamGider = kiralikMasrafi + erMasrafi + erzak + kislaBakim + techizatBakim + birlikBakim + kusatmaBakim + talimMasrafi + yaraliGideri;
  return {
    er, sold, erBasiGelir, gorevler, gorevGeliri, ganimetBrut: toplamBrut, savasOdenegi, yaraliGideri, limitAsimGideri, yagmaBrut, kiralikMasrafi, kaleGeliri, devletPayi, erPayi, ganimetNet, esirBeklenen,
    erMasrafi, erzak, kislaBakim, techizatBakim, birlikBakim, kusatmaBakim, talimMasrafi, toplamGelir, toplamGider,
    net: toplamGelir - toplamGider,
  };
}

/** Ele geçirilen kalelerin yıllık net gelir toplamı (enflasyonsuz); eski kayıtta eksik girişler aralığın ortasıyla tamamlanır. */
export function kaleGelirToplami(b: BirlikDurumu): number {
  const liste = b.kale_gelir ?? [];
  let t = 0;
  for (let i = 0; i < b.kale; i++) t += liste[i] ?? (KALE_GELIR[0] + KALE_GELIR[1]) / 2;
  return t;
}

/** Başlangıç / "yıllık kazanç" göstergesi: subay maaşı hariç beklenen yıllık net. */
export function birlikBeklenenKar(state: CharacterState, bg: IsletmeBaglami): number {
  if (!birlikDurumu(state)) return 0;
  return r2(birlikHesapla(state, bg).net);
}

