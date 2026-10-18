// Aranma II (2026-10): gizli suç / ifşa, kefaret, polis uyarısı, 3★ baskın, gönüllü
// teslim. Saf durum fonksiyonları (HTTP/DB yok) — gameEngine yıl bloğundan ve
// endpoint köprülerinden çağırır. Tüm sayılar data/aranmaSabitleri.ts'te.
import { randomUUID } from "crypto";
import type { AranmaBildirimi, AranmaDurumu, CharacterState, SucSinifi } from "../types";
import {
  BASKIN_ESIGI,
  BASKIN_GECIKME_MAX_YIL,
  BASKIN_GECIKME_MIN_YIL,
  BASKIN_KACIS_SANSI,
  BASKIN_KACIS_SONRASI_ARANMA,
  HAPIS_TESLIM_MIN_ARANMA,
  IFSA_AHLAK_DUSUSU,
  IFSA_OLASILIK,
  IFSA_YIL_MAX,
  IFSA_YIL_MIN,
  KEFARET_GONULLU_INDIRIM,
  KEFARET_KATSAYI_MAX,
  KEFARET_KATSAYI_MIN,
  KEFARET_RED_ARANMA_MAX,
  KEFARET_RED_ARANMA_MIN,
  KEFARET_YARIM_ESIGI,
  POLIS_UYARI_COOLDOWN_YIL,
  POLIS_UYARI_ESIGI,
  POLIS_UYARI_GECIKME_MAX_YIL,
  POLIS_UYARI_GECIKME_MIN_YIL,
  aralikTamSayi,
  meslekDebuffOrani,
  sucBasariBonusu,
  sucRiskCarpani,
  sucSinifiDegeri,
  teslimCezasi,
  yildizSayisi,
} from "../data/aranmaSabitleri";
import {
  etiketEkle,
  giderEnflasyonCarpani,
  havuzKilidiVar,
  hayatOlayiEkle,
  sucArtisiKaydet,
  paraYuvarla,
} from "./stateManager";
import { T } from "../i18n";

const MAKS_BEKLEYEN_BILDIRIM = 12;

function bildirimEkle(state: CharacterState, b: Omit<AranmaBildirimi, "id" | "yil">): void {
  state.aranma_bildirimleri.push({ ...b, id: randomUUID(), yil: state.yil });
  if (state.aranma_bildirimleri.length > MAKS_BEKLEYEN_BILDIRIM) state.aranma_bildirimleri.shift();
}

function aranmaKelepce(v: number): number {
  return Math.max(0, Math.min(100, v));
}

// ─── Kefaret ─────────────────────────────────────────────────────────────────

/** Kefaret katsayısı [3.3, 3.7]: (oturum, puan) çiftinden deterministik — gösterilen tutar = tahsil edilen. */
export function kefaretKatsayisi(state: CharacterState, puan: number): number {
  const tohum = `${state.id}:${Math.round(puan)}`;
  let h = 2166136261;
  for (let i = 0; i < tohum.length; i++) {
    h ^= tohum.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = ((h >>> 0) % 10001) / 10000; // 0..1
  return KEFARET_KATSAYI_MIN + u * (KEFARET_KATSAYI_MAX - KEFARET_KATSAYI_MIN);
}

/** Verilen aranma puanının İNDİRİMSİZ tam kefareti (puan × katsayı × gider enflasyonu). */
export function kefaretTutari(state: CharacterState, puan: number = state.suc_seviyesi): number {
  if (puan <= 0) return 0;
  return Math.max(1, Math.round(puan * kefaretKatsayisi(state, puan) * giderEnflasyonCarpani(state)));
}

/** Gönüllü ödeme tutarları (%20 indirimli): tam ve yarım. */
export function gonulluKefaretTutarlari(state: CharacterState): { tam: number; yarim: number } {
  const tam = Math.round(kefaretTutari(state) * (1 - KEFARET_GONULLU_INDIRIM));
  return { tam, yarim: Math.round(tam / 2) };
}

/** Puan düşünce zamanlayıcıları/işaretleri tutarlı tut (aşağı inen eşiklerin planlarını iptal et). */
function esikleriSenkronla(state: CharacterState): void {
  const p = state.suc_seviyesi;
  state.aranma_esik60_ustu = p > POLIS_UYARI_ESIGI;
  state.aranma_esik75_ustu = p >= BASKIN_ESIGI;
  if (p <= POLIS_UYARI_ESIGI) state.polis_uyari_yili = null;
  if (p < BASKIN_ESIGI) state.baskin_yili = null;
}

function kefaretUygula(state: CharacterState, yarim: boolean): void {
  state.suc_seviyesi = yarim ? Math.round(aranmaKelepce(state.suc_seviyesi) / 2) : 0;
  esikleriSenkronla(state);
}

/** Aranma ekranından gönüllü kefaret: %20 indirimli; yarım ödeme yalnız puan > 30 iken. */
export function gonulluKefaretOde(state: CharacterState, yarim: boolean): { odenen: number } {
  if (state.suc_seviyesi <= 0) throw new Error("Sicilin zaten temiz.");
  if (yarim && state.suc_seviyesi <= KEFARET_YARIM_ESIGI) throw new Error("Bu seviyede yarım ödeme yok; tamamını öde.");
  const tutarlar = gonulluKefaretTutarlari(state);
  const tutar = yarim ? tutarlar.yarim : tutarlar.tam;
  if (state.para < tutar) throw new Error("Kefaret için yeterli paran yok.");
  state.para = paraYuvarla(state.para - tutar);
  kefaretUygula(state, yarim);
  return { odenen: tutar };
}

/** Polis uyarısı yanıtı: tam / yarım (İNDİRİMSİZ) ya da hiç ödememe (+6…9 aranma). */
export function polisUyarisiniYanitla(
  state: CharacterState,
  bildirimId: string,
  karar: "tam" | "yarim" | "hayir"
): { odenen: number; aranmaArtis: number } {
  const idx = state.aranma_bildirimleri.findIndex((b) => b.id === bildirimId && b.tur === "polis_uyari");
  if (idx < 0) throw new Error("Bekleyen bir polis uyarısı yok.");
  const b = state.aranma_bildirimleri[idx];
  if (karar === "hayir") {
    const artis = kefaretRedCezasi(state);
    state.aranma_bildirimleri.splice(idx, 1);
    return { odenen: 0, aranmaArtis: artis };
  }
  const tutar = karar === "yarim" ? (b.yarimTutar ?? 0) : (b.tutar ?? 0);
  if (state.para < tutar) throw new Error("Kefaret için yeterli paran yok.");
  state.para = paraYuvarla(state.para - tutar);
  state.aranma_bildirimleri.splice(idx, 1);
  kefaretUygula(state, karar === "yarim");
  return { odenen: tutar, aranmaArtis: 0 };
}

/**
 * Polis kefaret istedi ve ödenmedi/reddedildi: aranma +6…9. Hem zorunlu uyarıda hem
 * aranmaSeviyesi.ts olaylarındaki red dallarında (motor tarafı) aynı kural.
 */
export function kefaretRedCezasi(state: CharacterState): number {
  const artis = aralikTamSayi(KEFARET_RED_ARANMA_MIN, KEFARET_RED_ARANMA_MAX);
  state.suc_seviyesi = aranmaKelepce(state.suc_seviyesi + artis);
  sucArtisiKaydet(state);
  return artis;
}

// ─── Gizli suç / ifşa ────────────────────────────────────────────────────────

/**
 * Başarılı (suçüstü olmayan) bir suçu kaydeder: sınıfa göre sabit olasılıkla (yıldız
 * yükseldikçe düşen risk çarpanıyla) 4–10 yıl sonra ifşa kuyruğuna girer; ifşa
 * olmayacaksa hiçbir iz bırakmaz ("şehir unutur"). true = ifşa planlandı.
 */
export function gizliSucKaydet(state: CharacterState, sinif: SucSinifi, baslik: string): boolean {
  const olasilik = IFSA_OLASILIK[sinif] * sucRiskCarpani(state.suc_seviyesi);
  if (Math.random() >= olasilik) return false;
  state.ifsa_kuyrugu.push({ yil: state.yil + aralikTamSayi(IFSA_YIL_MIN, IFSA_YIL_MAX), sinif, baslik });
  return true;
}

function ifsalariIsle(state: CharacterState): void {
  const vadeGelen = state.ifsa_kuyrugu.filter((k) => k.yil <= state.yil);
  if (!vadeGelen.length) return;
  state.ifsa_kuyrugu = state.ifsa_kuyrugu.filter((k) => k.yil > state.yil);
  for (const k of vadeGelen) {
    const artis = sucSinifiDegeri(k.sinif);
    const dusus = IFSA_AHLAK_DUSUSU[k.sinif];
    state.suc_seviyesi = aranmaKelepce(state.suc_seviyesi + artis);
    state.ahlak = Math.max(0, state.ahlak - dusus);
    sucArtisiKaydet(state);
    hayatOlayiEkle(state, "🕵️", T(state.dil, "Eski bir suçun açığa çıktı"));
    bildirimEkle(state, { tur: "ifsa", baslik: k.baslik, aranmaArtis: artis, ahlakDusus: dusus });
  }
}

// ─── Yıllık işlem: eşikler, polis uyarısı, baskın ────────────────────────────

/**
 * Tur sonunda (yıl ilerledikten sonra) çağrılır. `cezaHesapla` tutuklanma bandına
 * göre hapis yılı üretir (gameEngine.hapisCezaSuresiHesapla). Hapis/yolculuk/kaçak/
 * veba gibi havuz kilidi altında polis uyarısı ve baskın ertelenir (vadesi gelmiş
 * kalır, kilit kalkınca tetiklenir); ifşalar kilitten bağımsız işler.
 */
export function aranmaYillikIsle(state: CharacterState, cezaHesapla: (puan: number) => number): void {
  ifsalariIsle(state);

  const p = state.suc_seviyesi;
  const kilit = havuzKilidiVar(state);

  // 60 üstü: yukarı geçişte (cooldown dışındaysa) 2–3 yıl sonrası için polis uyarısı kur.
  const ust60 = p > POLIS_UYARI_ESIGI;
  if (ust60 && !state.aranma_esik60_ustu && state.polis_uyari_yili === null) {
    const cooldownDisinda =
      state.son_polis_uyari_yili === null || state.yil - state.son_polis_uyari_yili >= POLIS_UYARI_COOLDOWN_YIL;
    if (cooldownDisinda) {
      state.polis_uyari_yili = state.yil + aralikTamSayi(POLIS_UYARI_GECIKME_MIN_YIL, POLIS_UYARI_GECIKME_MAX_YIL);
    }
  }
  state.aranma_esik60_ustu = ust60;
  if (!ust60) state.polis_uyari_yili = null;
  if (
    ust60 &&
    state.polis_uyari_yili !== null &&
    state.yil >= state.polis_uyari_yili &&
    !kilit &&
    !state.aranma_bildirimleri.some((b) => b.tur === "polis_uyari")
  ) {
    const tam = kefaretTutari(state);
    bildirimEkle(state, { tur: "polis_uyari", tutar: tam, yarimTutar: Math.round(tam / 2) });
    state.son_polis_uyari_yili = state.yil;
    state.polis_uyari_yili = null;
  }

  // 75 üstü (3★): yukarı geçişte 4–5 yıl sonrası için tutuklama baskını kur.
  const ust75 = p >= BASKIN_ESIGI;
  if (ust75 && !state.aranma_esik75_ustu && state.baskin_yili === null) {
    state.baskin_yili = state.yil + aralikTamSayi(BASKIN_GECIKME_MIN_YIL, BASKIN_GECIKME_MAX_YIL);
  }
  state.aranma_esik75_ustu = ust75;
  if (!ust75) state.baskin_yili = null;
  if (ust75 && state.baskin_yili !== null && state.yil >= state.baskin_yili && !kilit) {
    state.baskin_yili = null;
    if (Math.random() < BASKIN_KACIS_SANSI) {
      etiketEkle(state, ["kacak"]);
      state.suc_seviyesi = BASKIN_KACIS_SONRASI_ARANMA;
      esikleriSenkronla(state);
      hayatOlayiEkle(state, "🏃", T(state.dil, "Baskından kıl payı kaçtı"));
      bildirimEkle(state, { tur: "baskin", kacti: true });
    } else {
      const ceza = cezaHesapla(state.suc_seviyesi);
      etiketEkle(state, ["hapiste"]);
      state.hapis_ceza_kalan = ceza;
      state.hapis_ceza_toplam = ceza;
      state.hapis_tur_sayaci = 0;
      hayatOlayiEkle(state, "⛓️", T(state.dil, "Evine baskın yapıldı ve tutuklandı"));
      bildirimEkle(state, { tur: "baskin", kacti: false, ceza });
    }
  }
}

// ─── Gönüllü teslim ──────────────────────────────────────────────────────────

/** Kendi isteğiyle teslim ol: ceza −%25 (yuvarlanmış, en az 1 yıl). Dönüş: yıl. */
export function gonulluTeslimOl(state: CharacterState, cezaHesapla: (puan: number) => number): number {
  if (state.etiketler.includes("hapiste")) throw new Error("Zaten hapistesin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken teslim olamazsın.");
  if (state.suc_seviyesi < HAPIS_TESLIM_MIN_ARANMA) throw new Error("Teslim olacak kadar aranmıyorsun.");
  const ceza = teslimCezasi(cezaHesapla(state.suc_seviyesi));
  etiketEkle(state, ["hapiste"]);
  state.hapis_ceza_kalan = ceza;
  state.hapis_ceza_toplam = ceza;
  state.hapis_tur_sayaci = 0;
  state.baskin_yili = null;
  state.polis_uyari_yili = null;
  hayatOlayiEkle(state, "⛓️", T(state.dil, "Kendi isteğiyle teslim oldu"));
  return ceza;
}

/** Bildirimi (ifşa/baskın) okundu say ve kapat; polis uyarısı yalnız yanıtla kapanır. */
export function aranmaBildirimiKapat(state: CharacterState, id: string): void {
  const idx = state.aranma_bildirimleri.findIndex((b) => b.id === id);
  if (idx < 0) return;
  if (state.aranma_bildirimleri[idx].tur === "polis_uyari") throw new Error("Polis uyarısını yanıtlaman gerekir.");
  state.aranma_bildirimleri.splice(idx, 1);
}

// ─── Aranma ekranı verisi ────────────────────────────────────────────────────

const DEBUFF_ETIKETI: Record<string, string> = {
  "Tüccar": "pazar payın ve gelirin",
  "Zanaatkâr": "müşterilerin ve işin kalitesi",
  "Din Adamı": "cemaatin ve bağışların",
  "Asker": "birliğinin morali ve maaşın",
};

export function aranmaDurumuUret(state: CharacterState, hapisCezaTahmini: (puan: number) => number): AranmaDurumu {
  const puan = Math.round(state.suc_seviyesi);
  const { tam, yarim } = puan > 0 ? gonulluKefaretTutarlari(state) : { tam: 0, yarim: 0 };
  const teslimMumkun =
    puan >= HAPIS_TESLIM_MIN_ARANMA && !state.etiketler.includes("hapiste") && !state.etiketler.includes("yolculukta");
  return {
    puan,
    yildiz: yildizSayisi(puan),
    debuffOrani: meslekDebuffOrani(puan),
    basariBonusu: sucBasariBonusu(puan),
    tamTutar: tam,
    yarimTutar: yarim,
    yarimMumkun: puan > KEFARET_YARIM_ESIGI,
    teslimCezasi: teslimMumkun ? teslimCezasi(hapisCezaTahmini(puan)) : null,
    para: state.para,
    paraBirimi: state.para_birimi,
    hapiste: state.etiketler.includes("hapiste"),
    bekleyenBaskin: state.baskin_yili !== null,
    debuffEtiketi: T(state.dil, DEBUFF_ETIKETI[state.meslek] ?? "gelirin"),
  };
}

