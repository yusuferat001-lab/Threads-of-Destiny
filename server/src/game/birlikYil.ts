import type { BirlikCatismaBekleyen, CatismaSonucuGorunum, SavasGunuSonucu, BirlikArazi, BirlikDurumu, BirlikEsirKarari, BirlikKalite, BirlikSavasDurumu, BirlikSeferberlik, BirlikTur, CharacterState, IsletmeDokum, IsletmeUyari } from "../types";
import {
  ARAZI_DEGISIM_ORANI,
  ARAZI_SIRASI,
  ASIRI_COOLDOWN_YIL,
  ASIRI_ESIK,
  ASKER_FIZIKSEL,
  ASKER_PAZAR_HEDEF,
  BARIS_CATISMALARI,
  BARIS_BEKLEME_ARALIK,
  BARIS_GANIMET_TABAN,
  SAVAS_ZAFER_GANIMET_TABAN,
  ganimetBrutTemel,
  BARIS_YILLIK_IHTIMAL,
  KALE_GELIR,
  KALE_SOHRET,
  BARIS_KAYBI,
  BARIS_YARALI_ORAN,
  BARIS_YILLIK_ER,
  CATISMA_SALDIRI,
  CATISMA_SAVUNMA,
  MIZRAKLI_YARALI_AZALTMA,
  OKCU_PUSU_AZALTMA,
  BARIS_DUSMAN_KAYBI,
  BASKIN_PUSU_CEZASI,
  BASKIN_NAKIT_HASARI,
  BASKIN_IHTIMALI,
  BARIS_DUSMAN_SAPMA,
  barisDusmanGucuYas,
  SAVAS_KARAR_YILI,
  SAVAS_ON_YIL_OLAYLARI,
  SAVAS_KARAR_KAYBI,
  SAVAS_SONRA_KAYBI,
  SAVAS_KAYIP_TAVANI,
  FIRAR_SERTLIK_KATSAYI,
  FIRAR_GENEL_CAGRI_ILK_YIL,
  YARALI_ORAN,
  YARALI_ORAN_TABAN,
  YARALI_REVIR_DUSUS,
  YARALI_IYILESME_YIL,
  YARALI_REVIR_SURE_KISALTMA,
  YARALI_IYILESME_MIN_YIL,
  KALITE_MORAL,
  KALITE_TALIM_CARPANI,
  type Aralik,
  BARIS_MORAL_YENILGI,
  BARIS_MORAL_ZAFER,
  BARIS_TALIM_YENILGI,
  BARIS_TALIM_ZAFER,
  BARIS_GANIMET_ARALIK,
  BARIS_GOREV_YARALI_CARPANI,
  EMIRLER,
  KALE_GUC_ESIGI,
  KUSATMA_ACIK,
  KUSATMA_KALE_ESIGI_CARPANI,
  KALE_MAKS,
  MADALYALAR,
  MADALYA_MORAL,
  MADALYA_SOHRET,
  SAVAS_ZAFER_ESIR,
  SAVAS_ZAFER_GANIMET,
  SEFER_DONUS_MORAL,
  SEFER_DONUS_TALIM,
  YAGMA_ER_ORANI,
  emirGetir,
  ASKER_PAZAR_YAKINSAMA,
  ASKER_SALDIRI_AGIRLIKLARI,
  ASKER_SALDIRI_HASARLARI,
  BOLGE_ARAZI_AGIRLIGI,
  DEVSIRME_BUROSU_ER,
  DUSMAN_ORAN,
  savasDusmanGucuYas,
  ER_TAVANI,
  ESIR_FIDYE,
  ESIR_FIDYE_IHTIMALI,
  ESIR_IDAM_AHLAK,
  ESIR_IDAM_SERTLIK,
  ESIR_KATILIM_ORANI,
  ESIR_SATIS_AHLAK,
  ESIR_SATIS_FIYATI,
  ESIR_SERBEST_AHLAK,
  ESIR_SERBEST_SOHRET,
  FIRAR_ERZAK_EKI,
  FIRAR_MORAL_ESIGI,
  FIRAR_MORAL_KATSAYI,
  GANIMET_PAYI_TANIMLARI,
  IKMAL_TANIMLARI,
  INISIYATIF_OYUNCU_SECER,
  INISIYATIF_ZORUNLU_SALDIRI,
  KALITE_FIYATI,
  KARAKOL_KORUMA,
  MORAL_BARIS_YILLIK,
  MORAL_BOLLUK_YILLIK,
  MORAL_IDAM,
  MORAL_KANAT_BOZGUN,
  MORAL_KITLIK_YILLIK,
  MORAL_SAVAS_YILLIK,
  MORAL_SERBEST,
  MORAL_YENILGI,
  MORAL_YONELIM,
  MORAL_YONELIM_TAVAN,
  MORAL_YILLIK_TABAN,
  MIN_CEKIRDEK_ER,
  MORAL_YUKSEK_KAYIP,
  MORAL_YUKSEK_KAYIP_ESIGI,
  MORAL_ZAFER,
  REVIR_MORAL_KADEME,
  ROL_TANIMLARI,
  SAVAS_DEVSIRME_CARPANI,
  SEFERBERLIK_KALMA_YENILGI,
  SEFERBERLIK_KALMA_ZAFER,
  SEFERBERLIK_TANIMLARI,
  SERTLIK_DOGAL_SONUM,
  SERTLIK_OTORITE_KATSAYISI,
  ASKER_PAZAR_DONEM_CARPANI,
  TALIM_SAVAS_YENILGI,
  TALIM_SAVAS_ZAFER,
  TALIM_TANIMLARI,
  TON_TANIMLARI,
  TUR_TANIMLARI,
  ZAR_BOLEN,
  SAVAS_ZAR_BOLEN,
  dusmanAraziCarpani,
  dusmanSaldiriSavunma,
  doktrinToplami,
  gorevGetir,
  gorevAdi,
  odenmeyenCeza,
  type AskerSaldiri,
} from "../data/birlik";
import {
  RAKIP_BUYUK_SALDIRI_ORANI,
  RAKIP_IKINCI_HASAR_CARPANI,
  SIZMA_HASAR_CARPANI,
  SIZMA_SADAKAT_KAYBI,
  aktifRakip,
  aktifRakipler,
  pazarPayiHesapla,
  rakipSaldiriKademesi,
  rastgeleSaldiriYili,
  sohretMusteriSayisi,
} from "../data/pazar";
import { aranmaMusteriKaybi } from "../data/aranmaSabitleri";
import { yatkinlikMusteriBuyumesi } from "../data/meslekYatkinlik";
import {
  OTORITE_KORUMA_ESIGI,
  SADAKAT_RISK_ESIGI,
  VEBA_ARTIS_CARPANI,
  adaylariGerekirseYenile,
  calisanMaaslariniGuncelle,
  calisanSadakatKontrolleri,
  calisanlariGelistir,
  ekipBonuslari,
  ilkYillarGuvenli,
  korumaHesapla,
  olasilikliYuvarla,
  sureleriKontrolEt,
  yatirimKademesi,
  type IsletmeBaglami,
  type IsletmeYilSonucu,
} from "./isletme";
import { subayToplami, TAHMIN_ARALIGI_TABAN } from "./subay";
import { musteriAktar, rakipGrubu } from "./piyasa";
import {
  birlikAl,
  birlikDurumu,
  birlikHesapla,
  birlikHazirla,
  birlikSenkron,
  clamp,
  doktrinBekleyenSeviye,
  erSayisi,
  gucHesapla,
  seferdeMi,
  yaraliSayisi,
  kaliteCikar,
  kayipCarpani,
  komutaLimiti,
  r2,
  rutbeIndeksi,
  sertlikGelirCarpani,
  turPaylari,
  turOrani,
  dusmanReferansGucu,
  yolEtkisi,
} from "./birlik";

const rnd = (min: number, max: number) => min + Math.random() * (max - min);
const d20 = () => 1 + Math.floor(Math.random() * 20);

// ── Savaş durumu kurulumu ───────────────────────────────────────────────────
export function bolgeAraziSec(bolge: string): BirlikArazi {
  const w = BOLGE_ARAZI_AGIRLIGI[bolge] ?? [0.4, 0.3, 0.3];
  let z = Math.random() * (w[0] + w[1] + w[2]);
  for (let i = 0; i < 3; i++) {
    z -= w[i];
    if (z < 0) return ARAZI_SIRASI[i];
  }
  return "ova";
}

/** Savaş zarı tutunca düşman baskın birliği ve güç oranı önceden çekilir (savaş başlayınca aynen kullanılır). */
export function savasZariDusmani(): { dusmanTur: string; dusmanOrani: number } {
  const turler = ["okcu", "suvari", "mizrakli", "zirhli", "karma"];
  return { dusmanTur: turler[Math.floor(Math.random() * turler.length)], dusmanOrani: r2(rnd(DUSMAN_ORAN[0], DUSMAN_ORAN[1])) };
}

/**
 * Keşif subayı varsa yaklaşan savaşı 1 yıl önce somut bildirir (düşman, baskın birlik, tahmini güç aralığı); takvim değişmez.
 * Bildirim bu yılın işletme dökümüne eklenir. Keşif yoksa normal oyuncu yalnız dünya dedikodusunu görür.
 */
export function kesifSavasHaberi(state: CharacterState, yaklasan: { yil: number; dusman?: string; dusmanTur?: string; dusmanOrani?: number }): void {
  const is = state.isletme;
  if (!is?.birlik || !is.son_dokum) return;
  const sub = subayToplami(state);
  if (!sub.kesifVar || !yaklasan.dusmanTur || yaklasan.dusmanOrani == null) return;
  const E = savasDusmanGucuYas(state.yas + 1) * yaklasan.dusmanOrani;
  const r = Math.min(sub.tahminAralik, TAHMIN_ARALIGI_TABAN);
  is.son_dokum.uyarilar.push({
    kod: "kesif_savas",
    rakip: yaklasan.dusman ?? "",
    dusmanTur: yaklasan.dusmanTur,
    gucAralik: [Math.round(E * (1 - r)), Math.round(E * (1 + r))],
    sayi: yaklasan.yil,
  });
}

export function savasBaslat(state: CharacterState): BirlikSavasDurumu {
  const b = birlikAl(state);
  const turler: (BirlikTur | "karma")[] = ["okcu", "suvari", "mizrakli", "zirhli", "karma"];
  const sv: BirlikSavasDurumu = {
    baslangic_yili: state.yil,
    seferberlik: null,
    seferberlik_er: 0,
    seferberlik_yarali: 0,
    yil_sayac: 0,
    sonuc: null,
    olu_toplam: 0,
    firar_toplam: 0,
    arazi: bolgeAraziSec(state.bolge),
    inisiyatif: "savunma",
    dusman_orani: state.buyuk_savas?.dusmanOrani ?? r2(rnd(DUSMAN_ORAN[0], DUSMAN_ORAN[1])),
    dusman_tur: (state.buyuk_savas?.dusmanTur as BirlikTur | "karma" | undefined) ?? turler[Math.floor(Math.random() * turler.length)],
    kanat_zafer: 0,
    kanat_yenilgi: 0,
    genel_zafer: 0,
    genel_yenilgi: 0,
  };
  b.savas = sv;
  return sv;
}

// ── Yeni er katılımı (kalite, birlik payı, sulanma) ─────────────────────────
export interface YeniErSecenek {
  kalite?: BirlikKalite;
  /** Yeni erlerin talim seviyesi (varsayılan 0 = eğitimsiz). */
  talim?: number;
  /** Ücret ödemeden ekle (esir, gönüllü, seferberlik). */
  bedava?: boolean;
  /** Kullanılabilir nakit (eksi sınırı dahil); ücret buna yetmezse düşük kalite/piyade gelir. */
  butce?: number;
  /** Limiti yok say (çağrı kendi limitini uyguladı). */
  limitsiz?: boolean;
}
export interface YeniErSonucu {
  eklenen: number;
  maliyet: number;
}

/** Orduya `adet` yeni er katar: limit, kalite, birlik payı ve talim sulanması uygulanır. Parayı ÇEKMEZ (maliyet döner). */
export function yeniErEkle(state: CharacterState, adet: number, bg: IsletmeBaglami, sec: YeniErSecenek = {}): YeniErSonucu {
  const b = birlikAl(state);
  const eski = erSayisi(state);
  const limit = sec.limitsiz ? ER_TAVANI : komutaLimiti(state);
  const n = Math.max(0, Math.min(Math.round(adet), limit - eski));
  if (n <= 0) return { eklenen: 0, maliyet: 0 };
  let kalite: BirlikKalite = sec.kalite ?? b.hedef_kalite;
  let maliyet = 0;
  let butce = sec.butce ?? Infinity;
  if (!sec.bedava && kalite !== "dusuk") {
    const ucret = n * KALITE_FIYATI[kalite] * bg.giderEnflasyon;
    if (ucret <= butce) {
      maliyet += ucret;
      butce -= ucret;
    } else kalite = "dusuk";
  }
  if (!sec.bedava) {
    const paylar = turPaylari(b);
    const turUcreti = (Object.entries(paylar) as [BirlikTur, number][]).reduce((t, [tur, pay]) => t + pay * TUR_TANIMLARI[tur].ucret, 0);
    const ucret = n * turUcreti * bg.giderEnflasyon;
    if (ucret <= butce) maliyet += ucret;
  }
  b.kalite[kalite] += n;
  const girisTalim = sec.talim ?? 0;
  b.talim = clamp((b.talim * eski + girisTalim * n) / (eski + n), 0, 100);
  state.meslek_musteri = eski + n;
  return { eklenen: n, maliyet };
}

// ── Seferberlik (savaş başı kararı) ─────────────────────────────────────────
export function seferberlikUygula(state: CharacterState, tur: BirlikSeferberlik, bg: IsletmeBaglami): number {
  const b = birlikAl(state);
  const sv = b.savas ?? savasBaslat(state);
  const t = SEFERBERLIK_TANIMLARI[tur];
  sv.seferberlik = tur;
  if (sv.er_once == null) sv.er_once = erSayisi(state);
  const istenen = Math.round(erSayisi(state) * t.er);
  // Çağrılan erler seçilen kademenin teçhizatıyla gelir (düz piyade); kışla limitine takılmaz, aşan kısım limit aşım gideri öder.
  const eklenen = yeniErEkle(state, istenen, bg, { kalite: t.kalite, bedava: true, talim: t.talim, limitsiz: true }).eklenen;
  sv.seferberlik_er += eklenen;
  sv.seferberlik_kalite = t.kalite;
  sv.baslangic_toplam = erSayisi(state);
  b.moral = clamp(b.moral + t.moral, 0, 100);
  birlikSenkron(state, bg.enflasyon);
  return eklenen;
}

// ── Esir ────────────────────────────────────────────────────────────────────
export interface EsirSonucu {
  devlet: number;
  katilan: number;
  idam: number;
  serbest: number;
  sat: number;
  para: number;
}
export function esirleriIsle(state: CharacterState, b: BirlikDurumu, esir: number, karar: BirlikEsirKarari, bg: IsletmeBaglami): EsirSonucu {
  const devlet = 0; // askerde devlet payı yok
  const kalan = Math.max(0, esir);
  const katilan = Math.round(kalan * ESIR_KATILIM_ORANI);
  const geri = Math.max(0, kalan - katilan);
  const sonuc: EsirSonucu = { devlet, katilan, idam: 0, serbest: 0, sat: 0, para: 0 };
  if (karar === "idam") sonuc.idam = geri;
  else if (karar === "serbest") sonuc.serbest = geri;
  else sonuc.sat = geri; // "sat" ve "karma": kalanı satılır
  if (sonuc.sat > 0) {
    sonuc.para += sonuc.sat * ESIR_SATIS_FIYATI * bg.enflasyon;
    state.ahlak = clamp(state.ahlak + sonuc.sat * ESIR_SATIS_AHLAK, 0, 100);
  }
  if (sonuc.idam > 0) {
    b.sertlik = clamp(b.sertlik + sonuc.idam * ESIR_IDAM_SERTLIK * 0.25, 0, 100);
    state.ahlak = clamp(state.ahlak + sonuc.idam * ESIR_IDAM_AHLAK, 0, 100);
    b.moral = clamp(b.moral + MORAL_IDAM, 0, 100);
  }
  if (sonuc.serbest > 0) {
    state.ahlak = clamp(state.ahlak + Math.min(3, sonuc.serbest * ESIR_SERBEST_AHLAK), 0, 100);
    state.un = clamp(state.un + Math.min(3, sonuc.serbest * ESIR_SERBEST_SOHRET), 0, 100);
    b.moral = clamp(b.moral + MORAL_SERBEST, 0, 100);
    for (let i = 0; i < sonuc.serbest; i++) if (Math.random() < ESIR_FIDYE_IHTIMALI) sonuc.para += ESIR_FIDYE * bg.enflasyon;
  }
  if (katilan > 0) yeniErEkle(state, katilan, bg, { kalite: "dusuk", bedava: true, talim: 0 });
  return sonuc;
}

// ── Kayıp (ölü – yaralı – firar): hepsi tam sayı ────────────────────────────
const aralikCek = (a: Aralik) => rnd(a[0], a[1]);
const yariAralik = (a: Aralik, konum: "alt" | "ust" | "tam"): Aralik => {
  const orta = (a[0] + a[1]) / 2;
  return konum === "alt" ? [a[0], orta] : konum === "ust" ? [orta, a[1]] : a;
};

/** `toplam`ı ağırlıklarla orantılı tam sayılara böler (en büyük kalan yöntemi); toplam birebir tutar, her pay üst sınırı geçmez. */
export function dagit(toplam: number, agirlik: number[], ust?: number[]): number[] {
  const t = Math.max(0, Math.round(toplam));
  const w = agirlik.map((x) => Math.max(0, x));
  const sonuc = w.map(() => 0);
  if (t === 0 || w.length === 0) return sonuc;
  const sinir = ust ?? w.map(() => Infinity);
  let kalan = t;
  // Kalan dağıtılırken dolan gruplar dışarıda bırakılır.
  for (let tur = 0; tur < w.length + 1 && kalan > 0; tur++) {
    const aktif = w.map((x, i) => (sonuc[i] < sinir[i] ? x : 0));
    const ws = aktif.reduce((a, b) => a + b, 0);
    if (ws <= 0) {
      const i = sonuc.findIndex((x, k) => x < sinir[k]);
      if (i < 0) break;
      const ek = Math.min(kalan, sinir[i] - sonuc[i]);
      sonuc[i] += ek;
      kalan -= ek;
      continue;
    }
    const ham = aktif.map((x) => (kalan * x) / ws);
    const taban = ham.map((x, i) => Math.min(Math.floor(x), sinir[i] - sonuc[i]));
    let dagitilan = taban.reduce((a, b) => a + b, 0);
    const sira = ham.map((x, i) => ({ i, f: x - Math.floor(x) })).filter((x) => aktif[x.i] > 0).sort((a, b) => b.f - a.f);
    for (let k = 0; dagitilan < kalan && k < sira.length; k++) {
      const i = sira[k].i;
      if (taban[i] + sonuc[i] < sinir[i]) {
        taban[i] += 1;
        dagitilan += 1;
      }
    }
    taban.forEach((x, i) => (sonuc[i] += x));
    kalan -= dagitilan;
    if (dagitilan === 0) break;
  }
  return sonuc;
}

/** Yaralı oranı (ölü × oran): taban aralığı − revir − tabip; alt sınır 1. */
export function yaraliOrani(state: CharacterState): number {
  const revir = clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4);
  const azalt = subayToplami(state).yaraliAzalt;
  const mizrakli = MIZRAKLI_YARALI_AZALTMA * turOrani(birlikAl(state), "mizrakli");
  return Math.max(YARALI_ORAN_TABAN, (aralikCek(YARALI_ORAN) - revir * YARALI_REVIR_DUSUS) * (1 - azalt - mizrakli));
}
/** Yaralı iyileşme süresi (yıl): taban 3, her revir kademesi −0,5 (K4 = 1). */
export function yaraliIyilesmeSuresi(state: CharacterState): number {
  const revir = clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4);
  return Math.max(YARALI_IYILESME_MIN_YIL, YARALI_IYILESME_YIL - revir * YARALI_REVIR_SURE_KISALTMA);
}
/** Yıllık iyileşme (yıl başı): `yarali_hizi` kadar yaralı iyileşir; tam sayı. İyileşen sayıyı döner. */
export function yaraliIyilestir(state: CharacterState, b: BirlikDurumu): number {
  const y = yaraliSayisi(state);
  if (y <= 0) {
    b.yarali = 0;
    return 0;
  }
  const hiz = Math.max(1, Math.round(b.yarali_hizi ?? Math.ceil(y / yaraliIyilesmeSuresi(state))));
  const iyi = Math.min(y, hiz);
  b.yarali = y - iyi;
  const sv = b.savas;
  if (sv && (sv.seferberlik_yarali ?? 0) > 0) {
    const levyIyi = Math.round((iyi * (sv.seferberlik_yarali ?? 0)) / y);
    sv.seferberlik_yarali = Math.max(0, (sv.seferberlik_yarali ?? 0) - levyIyi);
  }
  return iyi;
}

/** Firar ayarlayıcıları (% puan): düşük moral, kıt erzak, sertlik, doktrin/yol, aranma. */
function firarAyarlayici(state: CharacterState, b: BirlikDurumu): { puan: number; tetik: boolean } {
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  let puan = 0;
  let tetik = false;
  if (b.moral < FIRAR_MORAL_ESIGI) {
    puan += (FIRAR_MORAL_ESIGI - b.moral) * FIRAR_MORAL_KATSAYI;
    tetik = true;
  }
  if (b.erzak_oran < 0.7) {
    puan += FIRAR_ERZAK_EKI;
    tetik = true;
  }
  if (tetik) puan += b.sertlik * FIRAR_SERTLIK_KATSAYI;
  puan += (doktrin.firar + (yol.firar ?? 0)) * 30;
  puan += aranmaMusteriKaybi(state.suc_seviyesi) * 30;
  return { puan, tetik };
}

export interface KayipGirdisi {
  /** Ordunun % değeri (aralıktan çekilmiş). */
  oluPct: number;
  firarPct: number;
  /** Ek ölü (savaş yılı görev kayıpları), tam sayı. */
  ekOlu?: number;
  /** Verilirse yaralı = ölü × bu (barış çatışması: 2,5; Tabip ve revir düşürür); yoksa savaş oranı. */
  yaraliOran?: number;
  /** Ek yaralı (barış yılı görev kayıpları: ölüye değil doğrudan yaralıya gider), tam sayı. */
  ekYarali?: number;
  /** Seferberlik erlerinin firar çarpanı (genel çağrının ilk yılı). */
  levyFirarCarpani?: number;
  /** Savaş boyu kalan tavan (tam sayı); yoksa tavan yok. */
  oluTavan?: number;
  firarTavan?: number;
}
export interface KayipSonucu {
  olu: number;
  firar: number;
  yaralanan: number;
  /** `yaralanan` içinden ek (görev) yaralısı. */
  yaralananEk?: number;
  oluLevy: number;
  firarLevy: number;
}

/**
 * Ölü ve firarı ana ordu ile seferberlik erlerinden eşit yüzdeyle keser (en büyük kalan yöntemi), yaralıyı sağlam erlerden ayırır.
 * Bütün sayılar tam sayıdır; çekirdek kadro (MIN_CEKIRDEK_ER) korunur.
 */
export function kayipUygula(state: CharacterState, b: BirlikDurumu, g: KayipGirdisi): KayipSonucu {
  const er = erSayisi(state);
  const sv = state.ulke.savasta ? b.savas : null;
  const nL = Math.min(er, Math.max(0, Math.round(sv?.seferberlik_er ?? 0)));
  const nR = er - nL;
  const kc = kayipCarpani(state);
  const levyC = g.levyFirarCarpani ?? 1;
  let olu = olasilikliYuvarla(er * (g.oluPct / 100) * kc) + Math.max(0, Math.round(g.ekOlu ?? 0));
  let firar = olasilikliYuvarla((nR + nL * levyC) * (Math.max(0, g.firarPct) / 100) * clamp(kc, 0.4, 1.2));
  if (g.oluTavan != null) olu = Math.min(olu, Math.max(0, g.oluTavan));
  if (g.firarTavan != null) firar = Math.min(firar, Math.max(0, g.firarTavan));
  const maks = Math.max(0, er - MIN_CEKIRDEK_ER);
  olu = Math.min(olu, maks);
  firar = Math.min(firar, maks - olu);
  const ekYar = Math.max(0, Math.round(g.ekYarali ?? 0));
  if (olu + firar <= 0) {
    // Yalnız görev yaralısı: sağlam erlerden ayrılır.
    const saglam = Math.max(0, er - Math.max(0, Math.round(b.yarali ?? 0)));
    const y = Math.min(ekYar, saglam);
    if (y > 0) {
      b.yarali = Math.max(0, Math.round(b.yarali ?? 0)) + y;
      b.yarali_hizi = Math.max(1, Math.ceil(b.yarali / yaraliIyilesmeSuresi(state)));
    }
    return { olu: 0, firar: 0, yaralanan: y, yaralananEk: y, oluLevy: 0, firarLevy: 0 };
  }
  const [oluR, oluL] = dagit(olu, [nR, nL], [nR, nL]);
  const [firR, firL] = dagit(firar, [nR, nL * levyC], [nR - oluR, nL - oluL]);
  // Seferberlik erleri kendi kalitelerinden, ana ordu kalan gruplardan orantılı düşer.
  const lk: BirlikKalite = sv?.seferberlik_kalite ?? "dusuk";
  const levyKalan = Math.max(0, nL - oluL - firL);
  const kal = { ...b.kalite };
  kal[lk] = Math.max(0, kal[lk] - nL);
  const cikanNormal = kaliteCikar({ kalite: kal } as BirlikDurumu, oluR + firR);
  kal[lk] += levyKalan;
  b.kalite = kal;
  const toplamCikan = cikanNormal + (nL - levyKalan);
  state.meslek_musteri = Math.max(0, er - toplamCikan);
  if (sv) {
    sv.seferberlik_er = levyKalan;
    sv.seferberlik_yarali = Math.min(sv.seferberlik_yarali ?? 0, levyKalan);
    sv.olu_toplam = (sv.olu_toplam ?? 0) + oluR + oluL;
    sv.firar_toplam = (sv.firar_toplam ?? 0) + firR + firL;
  }
  // Yaralı: ölünün 1,4–1,5 katı (revir/tabip düşürür), sağlam erlerden ayrılır; ana ordu / seferberlik oransal.
  const erSon = erSayisi(state);
  b.yarali = Math.min(Math.max(0, Math.round(b.yarali ?? 0)), erSon);
  const levyYar = Math.min(sv?.seferberlik_yarali ?? 0, levyKalan, b.yarali);
  const saglamL = Math.max(0, levyKalan - levyYar);
  const saglamR = Math.max(0, erSon - levyKalan - (b.yarali - levyYar));
  const yaralananOlu = Math.min(Math.round((oluR + oluL) * (g.yaraliOran ?? yaraliOrani(state))), saglamR + saglamL);
  const yaralanan = Math.min(yaralananOlu + ekYar, saglamR + saglamL);
  const [yR, yL] = dagit(yaralanan, [saglamR, saglamL], [saglamR, saglamL]);
  b.yarali += yR + yL;
  if (sv) sv.seferberlik_yarali = levyYar + yL;
  b.yarali_hizi = Math.max(1, Math.ceil(b.yarali / yaraliIyilesmeSuresi(state)));
  return { olu: oluR + oluL, firar: firR + firL, yaralanan: yR + yL, yaralananEk: Math.min(ekYar, Math.max(0, yR + yL - Math.min(yaralananOlu, yR + yL))), oluLevy: oluL, firarLevy: firL };
}


/**
 * Ölçüm kancası (yalnız simülasyon/analiz): her çatışma çözülünce çağrılır. Oyun mantığını etkilemez; varsayılan null.
 * oyuncuGuc = toplam askerî güç, dusmanGuc = düşmanın mutlak gücü; *Etkin = zarların uygulandığı karşılaştırma tarafları.
 */
export interface CatismaIzi {
  tur: "haydut" | "sinir" | "savas";
  zafer: boolean;
  yas: number;
  oyuncuGuc: number;
  dusmanGuc: number;
  oyuncuEtkin: number;
  dusmanEtkin: number;
  /** Düşman tablo değeri (sapma/dağılım/arazi öncesi): kalibrasyon için. */
  tablo: number;
}
export const catismaIzleyici: { fn: ((k: CatismaIzi) => void) | null } = { fn: null };

// ── Savaş çatışması (tek karar savaşı) ──────────────────────────────────────
export interface CatismaSonucu {
  kanatZafer: boolean;
  genelZafer: boolean;
  oran: number;
  arazi: BirlikArazi;
  inisiyatif: "saldiri" | "savunma";
}

function catismaCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): CatismaSonucu {
  const sv = b.savas!;
  const karar = b.savas_karari;
  // Arazi: seçme ekranı çıktıysa oyuncunun seçimi kesin; çıkmadıysa bölge zarı (önceki arazi %60 korunur).
  let arazi: BirlikArazi;
  if (karar?.arazi) arazi = karar.arazi; // ekran ihtimalle gelir; seçilen arazi kesin geçerli
  else if (Math.random() < ARAZI_DEGISIM_ORANI) arazi = bolgeAraziSec(state.bolge);
  else arazi = sv.arazi;
  const inisiyatif = (karar?.inisiyatif ?? karar?.inisiyatif_zorunlu ?? "savunma") as "saldiri" | "savunma";
  sv.arazi = arazi;
  sv.inisiyatif = inisiyatif;
  const ctx = { enflasyon: bg.enflasyon, savas: { arazi, dusmanTur: sv.dusman_tur, inisiyatif } };
  const d = gucHesapla(state, ctx);
  // Kıyas yönü: SALDIRIDAYSAN senin saldırı gücün düşmanın SAVUNMA gücüyle, SAVUNMADAYSAN senin savunma gücün düşmanın SALDIRI gücüyle yarışır.
  const oyuncuG = inisiyatif === "saldiri" ? d.saldiri : d.savunma;
  // Düşmanın gücü MUTLAKTIR (yaşa göre referans × savaş başında çekilen ±%5): bizim gücümüz sonucu doğrudan belirler.
  const E = dusmanReferansGucu(state) * sv.dusman_orani;
  const dagilim = dusmanSaldiriSavunma(sv.dusman_tur);
  // Arazi düşmanın baskın birliğini de etkiler (oyuncuyla aynı tablo).
  const dusmanG = E * (inisiyatif === "saldiri" ? dagilim.savunma : dagilim.saldiri) * dusmanAraziCarpani(arazi, sv.dusman_tur);
  const rol = ROL_TANIMLARI[karar?.rol ?? "ana"];
  const zarYuzde = () => (d20() - 10.5) / SAVAS_ZAR_BOLEN; // ±%8
  let sonBizimZar = 0;
  let sonDusmanZar = 0;
  const bizimZar = () => {
    sonBizimZar = zarYuzde();
    return oyuncuG * (1 + sonBizimZar + b.zar_bonusu + rol.zar);
  };
  const dusmanZar = () => {
    sonDusmanZar = zarYuzde();
    return Math.max(1e-6, dusmanG * (1 + sonDusmanZar));
  };
  const R = bizimZar() / dusmanZar();
  const kanatZafer = R >= 1;
  const kanatZarlari = { bizim: sonBizimZar, dusman: sonDusmanZar };
  // Genel sonuç (kampanya): aynı güçlerin ikinci, bağımsız zarı.
  const genelZafer = bizimZar() >= dusmanZar();
  sv.son_catisma = {
    yil: state.yil,
    inisiyatif,
    oyuncuGuc: Math.round(oyuncuG),
    dusmanGuc: Math.round(dusmanG),
    oyuncuZar: Math.round(kanatZarlari.bizim * 1000) / 10,
    dusmanZar: Math.round(kanatZarlari.dusman * 1000) / 10,
    kanatZafer,
    genelZafer,
  };
  if (kanatZafer) sv.kanat_zafer += 1;
  else sv.kanat_yenilgi += 1;
  if (genelZafer) sv.genel_zafer += 1;
  else sv.genel_yenilgi += 1;
  sv.sonuc = genelZafer ? "zafer" : "yenilgi";
  catismaIzleyici.fn?.({ tur: "savas", zafer: genelZafer, yas: state.yas, oyuncuGuc: d.guc, dusmanGuc: E, oyuncuEtkin: oyuncuG, dusmanEtkin: dusmanG, tablo: dusmanReferansGucu(state) });
  return { kanatZafer, genelZafer, oran: R, arazi, inisiyatif };
}

/**
 * Savaş Günü penceresi onaylanınca karar savaşı HEMEN çözülür (çatışma + kayıp uygulama); sonuç ekranı için döner.
 * Yıl işleme (`savasYiliCoz`) aynı yıl bu sonucu kullanır, tekrar zar atmaz ve kaybı ikinci kez uygulamaz.
 */
export function savasGunuCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): SavasGunuSonucu | null {
  const sv = b.savas;
  if (!sv || sv.sonuc != null || sv.gun_cozuldu_yil === state.yil) return null;
  if ((sv.yil_sayac ?? 0) + 1 < SAVAS_KARAR_YILI) return null;
  const gucOnce = gucHesapla(state, { enflasyon: bg.enflasyon }).guc;
  const catisma = catismaCoz(state, b, bg);
  const konum = catisma.oran < 0.75 ? "ust" : catisma.oran >= 1.2 ? "alt" : "tam";
  const zafer = catisma.genelZafer;
  const t = SAVAS_KARAR_KAYBI[zafer ? "zafer" : "yenilgi"];
  const oluPct = aralikCek(yariAralik(t.olu, konum));
  const firarPct = aralikCek(yariAralik(t.firar, konum));
  const tavan = savasKayipTavani(state, b);
  const kayip = kayipUygula(state, b, { oluPct, firarPct, oluTavan: tavan.olu, firarTavan: tavan.firar });
  const E = dusmanReferansGucu(state) * sv.dusman_orani;
  const dk = BARIS_DUSMAN_KAYBI; // düşman kaybı tahmini: kazanırsak büyük, kaybedersek küçük
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const emir = emirGetir(sv.emir);
  const carpan = (1 + subayToplami(state).ganimet + doktrin.ganimet + (yol.ganimet ?? 0) + (emir?.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const ortGanimet = (SAVAS_ZAFER_GANIMET[0] + SAVAS_ZAFER_GANIMET[1]) / 2;
  const brut = zafer ? ganimetBrutTemel(gucOnce, ortGanimet, SAVAS_ZAFER_GANIMET_TABAN) * bg.enflasyon * carpan : 0;
  const net = brut * (1 - GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran);
  const yilSayisi = Math.max(1, (sv.yil_sayac ?? 0) + 1);
  const sonuc: SavasGunuSonucu = {
    yil: state.yil,
    zafer,
    kanatZafer: catisma.kanatZafer,
    arazi: catisma.arazi,
    inisiyatif: catisma.inisiyatif,
    oyuncuGuc: sv.son_catisma?.oyuncuGuc ?? 0,
    dusmanGuc: sv.son_catisma?.dusmanGuc ?? 0,
    oyuncuZar: sv.son_catisma?.oyuncuZar ?? 0,
    dusmanZar: sv.son_catisma?.dusmanZar ?? 0,
    olu: kayip.olu,
    yarali: kayip.yaralanan,
    firar: kayip.firar,
    kalanEr: erSayisi(state),
    dusmanOlu: Math.round(E * (zafer ? rnd(dk.zafer[0], dk.zafer[1]) : rnd(dk.yenilgi[0], dk.yenilgi[1]))),
    ganimetTahmini: r2(net),
    esirTahmini: zafer ? Math.round(gucOnce * SAVAS_ZAFER_ESIR * yilSayisi) : 0,
    talim: catisma.kanatZafer ? TALIM_SAVAS_ZAFER : TALIM_SAVAS_YENILGI,
  };
  sv.gun_cozuldu_yil = state.yil;
  sv.gun_gosterildi = false;
  sv.gun_catisma = { kanatZafer: catisma.kanatZafer, genelZafer: catisma.genelZafer, oran: catisma.oran, arazi: catisma.arazi, inisiyatif: catisma.inisiyatif };
  sv.gun_sonucu = sonuc;
  return sonuc;
}

export interface SavasYili {
  catisma: CatismaSonucu | null;
  /** Bu yılın ordu % kayıp oranları (aralıktan çekildi). */
  oluPct: number;
  firarPct: number;
  faz: "on" | "karar" | "sonra";
}

/** Savaşın bir yılı: 1–2. yıl olay zarı, 3. yıl tek karar savaşı, sonrası sonuca göre düşük kayıp. */
export function savasYiliCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): SavasYili {
  const sv = b.savas!;
  sv.yil_sayac = (sv.yil_sayac ?? 0) + 1;
  // Karar savaşı pencere onaylanırken zaten çözüldüyse: kaydı kullan, yeniden zar atma, kaybı ikinci kez uygulama.
  if (sv.gun_cozuldu_yil === state.yil && sv.gun_catisma) {
    return { catisma: sv.gun_catisma, oluPct: 0, firarPct: 0, faz: "karar" };
  }
  if (sv.sonuc == null && sv.yil_sayac >= SAVAS_KARAR_YILI) {
    const catisma = catismaCoz(state, b, bg);
    const konum = catisma.oran < 0.75 ? "ust" : catisma.oran >= 1.2 ? "alt" : "tam";
    const t = SAVAS_KARAR_KAYBI[sv.sonuc!];
    return { catisma, oluPct: aralikCek(yariAralik(t.olu, konum)), firarPct: aralikCek(yariAralik(t.firar, konum)), faz: "karar" };
  }
  if (sv.sonuc == null) {
    let z = Math.random();
    const olay = SAVAS_ON_YIL_OLAYLARI.find((o) => (z -= o.ihtimal) < 0) ?? SAVAS_ON_YIL_OLAYLARI[0];
    return { catisma: null, oluPct: aralikCek(olay.olu), firarPct: aralikCek(olay.firar), faz: "on" };
  }
  const t = SAVAS_SONRA_KAYBI[sv.sonuc];
  return { catisma: null, oluPct: aralikCek(t.olu), firarPct: aralikCek(t.firar), faz: "sonra" };
}

/** Savaş boyu kalan kümülatif tavan (tam sayı): sonuç yenilgiyse geniş, aksi halde dar. */
export function savasKayipTavani(state: CharacterState, b: BirlikDurumu): { olu: number; firar: number } {
  const sv = b.savas;
  if (!sv) return { olu: Infinity, firar: Infinity };
  const tavan = SAVAS_KAYIP_TAVANI[sv.sonuc === "yenilgi" ? "yenilgi" : "zafer"];
  const T = sv.baslangic_toplam ?? erSayisi(state);
  return {
    olu: Math.max(0, Math.floor((T * tavan.olu) / 100) - (sv.olu_toplam ?? 0)),
    firar: Math.max(0, Math.floor((T * tavan.firar) / 100) - (sv.firar_toplam ?? 0)),
  };
}

export interface SavasSonu {
  zafer: boolean;
  /** Büyük zafer ganimeti: brüt, askerlerin payı, bize kalan net; esir sayısı. */
  brut: number;
  erPayi: number;
  net: number;
  esir: number;
  kale: boolean;
}

/** Rozet/unvan verir (tekrar vermez): şöhret + moral. Verildiyse uyarı ekler. */
export function madalyaVer(state: CharacterState, b: BirlikDurumu, tur: keyof typeof MADALYALAR, uyarilar: IsletmeUyari[]): void {
  const ad = MADALYALAR[tur].tr;
  if (state.unvanlar.includes(ad)) return;
  state.unvanlar.push(ad);
  state.un = clamp(state.un + MADALYA_SOHRET, 0, 100);
  b.moral = clamp(b.moral + MADALYA_MORAL, 0, 100);
  uyarilar.push({ kod: "madalya", isim: ad });
}

export function savasiBitir(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami, uyarilar: IsletmeUyari[]): SavasSonu {
  const sv = b.savas!;
  const zafer = sv.sonuc ? sv.sonuc === "zafer" : sv.genel_zafer >= sv.genel_yenilgi;
  // Otomatik terhis: yalnız seferberlik erleri (kiralık ordu zaten savaşla gider). Hayatta kalanlar (sağlam + yaralı) üzerinden kalan hesaplanır,
  // kalanlar yaralı/sağlam sayısına oransal dağıtılır; geri kalanlar terhis olur. Ana ordu değişmez.
  const hayatta = Math.max(0, Math.round(sv.seferberlik_er));
  if (hayatta > 0) {
    const oran = aralikCek(zafer ? SEFERBERLIK_KALMA_ZAFER : SEFERBERLIK_KALMA_YENILGI);
    const kalan = Math.min(hayatta, Math.round(hayatta * oran));
    const yaralilar = Math.min(hayatta, Math.max(0, Math.round(sv.seferberlik_yarali ?? 0)));
    const kalanYarali = Math.min(kalan, yaralilar, Math.round((kalan * yaralilar) / hayatta));
    const terhisYarali = yaralilar - kalanYarali;
    const lk: BirlikKalite = sv.seferberlik_kalite ?? "dusuk";
    // Çekirdek kadro korunur.
    const terhis = Math.min(hayatta - kalan, Math.max(0, erSayisi(state) - MIN_CEKIRDEK_ER), b.kalite[lk]);
    b.kalite[lk] -= terhis;
    state.meslek_musteri = Math.max(0, erSayisi(state) - terhis);
    b.yarali = Math.max(0, Math.round(b.yarali ?? 0) - Math.min(terhisYarali, terhis));
    if (terhis > 0) uyarilar.push({ kod: "seferberlik_terhis", sayi: terhis });
  }
  const sonuc: SavasSonu = { zafer, brut: 0, erPayi: 0, net: 0, esir: 0, kale: false };
  if (zafer) {
    // Büyük zafer ganimeti: askerî güçle ve savaşın uzunluğuyla orantılı; askerlerin payı ayrılır, kalanı bizim.
    const doktrin = doktrinToplami(b.doktrinler);
    const yol = yolEtkisi(state);
    const emir = emirGetir(sv.emir);
    const carpan = (1 + subayToplami(state).ganimet + doktrin.ganimet + (yol.ganimet ?? 0) + (emir?.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
    const guc = b.guc;
    sonuc.brut = r2(ganimetBrutTemel(guc, aralikCek(SAVAS_ZAFER_GANIMET), SAVAS_ZAFER_GANIMET_TABAN) * bg.enflasyon * carpan);
    sonuc.erPayi = r2(sonuc.brut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran);
    sonuc.net = r2(sonuc.brut - sonuc.erPayi);
    sonuc.esir = olasilikliYuvarla(guc * SAVAS_ZAFER_ESIR * Math.max(1, sv.yil_sayac ?? state.yil - sv.baslangic_yili));
    uyarilar.push({ kod: "savas_ganimet", tutar: sonuc.net, sayi: sonuc.esir });
    madalyaVer(state, b, "zafer", uyarilar);
    // Kale: yeterli askerî güç ve genel zafer.
    // Kuşatma kolu / topçu yalnız KALE kuşatmasında saldırı bonusu verir (savaş meydanında değil).
    if (guc * (KUSATMA_ACIK && b.birlik_turler.includes("kusatma") ? KUSATMA_KALE_ESIGI_CARPANI : 1) >= KALE_GUC_ESIGI && b.kale < KALE_MAKS) {
      b.kale += 1;
      (b.kale_gelir ??= []).push(Math.round((KALE_GELIR[0] + Math.random() * (KALE_GELIR[1] - KALE_GELIR[0])) * 100) / 100);
      sonuc.kale = true;
      uyarilar.push({ kod: "kale" });
      madalyaVer(state, b, "kale", uyarilar);
    }
  }
  uyarilar.push({ kod: "savas_sonu", savasSonucu: zafer ? "zafer" : "yenilgi" });
  b.savas = null;
  b.baris_bekleme = Math.max(Math.round(b.baris_bekleme ?? 0), 1);
  return sonuc;
}


// ── Barış çatışması (haydut / sınır; takvimli, motor düzeyinde) ─────────────
export interface BarisCatismaSonucu {
  tur: "haydut" | "sinir";
  zafer: boolean;
  /** Brüt ganimet (devlet ve er payı düşülmeden). */
  brut: number;
  devlet: number;
  erPayi: number;
  /** Oyuncuya kalan ganimet. */
  net: number;
  esir: number;
  /** Ordu % kayıp oranları (aralıktan çekildi); kayıp ortak boruda (kayipUygula) uygulanır. */
  oluPct: number;
  firarPct: number;
  /** Baskın (oyuncu savunmada) mı, av (oyuncu saldırıda) mı. */
  baskin: boolean;
  /** Düşmanın tahmini ölüsü (gösterimde "~"). */
  dusmanOlu: number;
  /** Baskın yenilgisinde yıllık gelirin % kesri olarak nakit hasarı (yoksa 0). */
  nakitYuzde: number;
}

/**
 * Barış çatışması takvimi: kalan bekleme yılı azalır, bitince her yıl BARIS_YILLIK_IHTIMAL şansla çatışma çıkar
 * (sonra yeniden BARIS_BEKLEME_ARALIK yıl bekleme). Savaşta sayaç DURUR; savaş bitince en az 1 yıl bekleme (savasiBitir).
 */
function barisCatismaVadesi(b: BirlikDurumu, savasta: boolean): boolean {
  if (savasta) return false;
  const kalan = Math.max(0, Math.round(b.baris_bekleme ?? 0));
  if (kalan > 0) {
    b.baris_bekleme = kalan - 1;
    return false;
  }
  if (Math.random() > BARIS_YILLIK_IHTIMAL) return false;
  b.baris_bekleme = Math.round(rnd(BARIS_BEKLEME_ARALIK[0], BARIS_BEKLEME_ARALIK[1]));
  return true;
}

/**
 * Haydut ya da sınır çatışması ÇIKTI: karar bekleyen çatışma kurulur (tür, baskın mı, düşman birliği, düşmanın o çatışmadaki gücü).
 * Zaman, oyuncu kararını verene (`barisCatismaCoz`) dek ilerlemez; hiçbir etki bu aşamada uygulanmaz.
 */
export function barisCatismaKur(state: CharacterState, b: BirlikDurumu): BirlikCatismaBekleyen {
  const tur: "haydut" | "sinir" = Math.random() < 0.5 ? "haydut" : "sinir";
  const dtur = (["okcu", "suvari", "mizrakli", "zirhli", "karma"] as const)[Math.floor(Math.random() * 5)];
  const baskin = Math.random() < BASKIN_IHTIMALI;
  const E = barisDusmanGucuYas(state.yas, tur) * rnd(BARIS_DUSMAN_SAPMA[0], BARIS_DUSMAN_SAPMA[1]);
  b.catisma_bekleyen = { yil: state.yil, tur, baskin, dusmanTur: dtur, dusmanGuc: Math.round(E * 100) / 100 };
  return b.catisma_bekleyen;
}

/** Bekleyen çatışma var mı (hapis/yolculukta ertelenir). */
export function catismaBekliyorMu(state: CharacterState): boolean {
  const b = state.isletme?.birlik;
  if (!b || state.meslek !== "Asker" || !b.catisma_bekleyen || state.ulke.savasta) return false;
  return !state.etiketler.includes("hapiste") && !state.etiketler.includes("yolculukta");
}

/**
 * Oyuncunun kararıyla çatışmayı ÇÖZER ve tüm etkileri hemen uygular (kayıp, ganimet, esir, nakit hasarı, moral, talim, madalya).
 * Baskında oyuncu savunmaya mecburdur (pusu cezası); karşılaşmada saldırı ya da savunmayı seçer.
 */
export function barisCatismaCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami, secim: "saldiri" | "savunma"): CatismaSonucuGorunum {
  const k = b.catisma_bekleyen;
  if (!k) throw new Error("Şu an çözülecek bir çatışma yok.");
  const tur = k.tur;
  const t = BARIS_CATISMALARI[tur];
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const sub = subayToplami(state);
  const d = gucHesapla(state, { enflasyon: bg.enflasyon, senaryo: tur });
  const guc = d.guc;
  const inisiyatif: "saldiri" | "savunma" = k.baskin ? "savunma" : secim;
  const dagilim = dusmanSaldiriSavunma(k.dusmanTur);
  const E = k.dusmanGuc;
  const pusu = k.baskin ? BASKIN_PUSU_CEZASI * (1 - clamp(sub.pusuAzalt + OKCU_PUSU_AZALTMA * turOrani(b, "okcu"), 0, 1)) : 0;
  const oyuncuTaraf = (inisiyatif === "saldiri" ? d.saldiri : d.savunma) * (1 - pusu);
  const dusmanTaraf = Math.max(1e-6, E * (inisiyatif === "saldiri" ? dagilim.savunma : dagilim.saldiri));
  const oyuncuEff = oyuncuTaraf * (1 + (d20() - 10.5) / SAVAS_ZAR_BOLEN + b.zar_bonusu);
  const dusmanEff = dusmanTaraf * (1 + (d20() - 10.5) / SAVAS_ZAR_BOLEN);
  const zafer = oyuncuEff >= dusmanEff;
  // Güç farkı kaybı belirler (savaştaki gibi): ezici üstünlükte aralığın alt yarısı, çekişmeli/zayıf durumda üst yarısı. Seçilmiş saldırı/savunma ganimet ve kaybı çarpar (baskında seçim yok).
  const oran = oyuncuEff / dusmanEff;
  const konum = oran < 0.75 ? "ust" : oran >= 1.2 ? "alt" : "tam";
  const sm = k.baskin ? { ganimet: 1, kayip: 1 } : inisiyatif === "saldiri" ? CATISMA_SALDIRI : CATISMA_SAVUNMA;
  catismaIzleyici.fn?.({ tur, zafer, yas: state.yas, oyuncuGuc: guc, dusmanGuc: E, oyuncuEtkin: oyuncuTaraf, dusmanEtkin: dusmanTaraf, tablo: barisDusmanGucuYas(state.yas, tur) });
  const carpan = (1 + sub.ganimet + doktrin.ganimet + (yol.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const brut = zafer ? ganimetBrutTemel(guc, aralikCek(BARIS_GANIMET_ARALIK), BARIS_GANIMET_TABAN) * bg.enflasyon * carpan * sm.ganimet : 0;
  const erPayi = brut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran;
  const net = brut - erPayi;
  const esirSayisi = zafer ? olasilikliYuvarla(guc * t.esir) : 0;
  const kayipAralik = BARIS_KAYBI[tur][zafer ? "zafer" : "yenilgi"];
  b.talim = clamp(b.talim + (zafer ? BARIS_TALIM_ZAFER : BARIS_TALIM_YENILGI), 0, 100);
  const dk = BARIS_DUSMAN_KAYBI[zafer ? "zafer" : "yenilgi"];
  const dusmanOlu = Math.round(E * rnd(dk[0], dk[1]));
  const kayip = kayipUygula(state, b, {
    oluPct: aralikCek(yariAralik(kayipAralik.olu, konum)) * sm.kayip,
    firarPct: aralikCek(yariAralik(kayipAralik.firar, konum)) * sm.kayip,
    yaraliOran: Math.max(1, (aralikCek(BARIS_YARALI_ORAN) - clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * YARALI_REVIR_DUSUS) * (1 - sub.yaraliAzalt)),
  });
  let nakitHasar = 0;
  if (k.baskin && !zafer) {
    const gelirTaban = Math.max(0, state.isletme?.son_dokum?.satis ?? birlikHesapla(state, bg).toplamGelir);
    nakitHasar = r2(gelirTaban * BASKIN_NAKIT_HASARI);
  }
  const esir = esirSayisi > 0 ? esirleriIsle(state, b, esirSayisi, "karma", bg) : null;
  state.para = r2(state.para + net + (esir?.para ?? 0) - nakitHasar);
  b.moral = clamp(b.moral + (zafer ? BARIS_MORAL_ZAFER : BARIS_MORAL_YENILGI), 0, 100);
  if (zafer) madalyaVer(state, b, "haydut", []);
  b.zar_bonusu = 0;
  b.catisma_bekleyen = null;
  birlikSenkron(state, bg.enflasyon);
  return {
    tur,
    baskin: k.baskin,
    inisiyatif,
    zafer,
    oyuncuGuc: Math.round(inisiyatif === "saldiri" ? d.saldiri : d.savunma),
    dusmanGuc: Math.round(E * (inisiyatif === "saldiri" ? dagilim.savunma : dagilim.saldiri)),
    olu: kayip.olu,
    yarali: kayip.yaralanan,
    firar: kayip.firar,
    kalanEr: erSayisi(state),
    dusmanOlu,
    ganimet: r2(net + (esir?.para ?? 0)),
    esir: esirSayisi,
    nakitHasar,
    talim: zafer ? BARIS_TALIM_ZAFER : BARIS_TALIM_YENILGI,
  };
}

/** Test / simülasyon: karar penceresi yerine akıllı varsayılan (baskında savunma; değilse oranı daha iyi olan yön). */
export function barisCatismaOtomatik(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): CatismaSonucuGorunum | null {
  const k = b.catisma_bekleyen;
  if (!k) return null;
  const d = gucHesapla(state, { enflasyon: bg.enflasyon, senaryo: k.tur });
  const dag = dusmanSaldiriSavunma(k.dusmanTur);
  const saldiriOran = d.saldiri / Math.max(1e-6, k.dusmanGuc * dag.savunma);
  const savunmaOran = d.savunma / Math.max(1e-6, k.dusmanGuc * dag.saldiri);
  return barisCatismaCoz(state, b, bg, saldiriOran >= savunmaOran ? "saldiri" : "savunma");
}

// ── Rakip komutan saldırıları ───────────────────────────────────────────────
function askerSaldiriSec(kademe: 1 | 2 | 3): AskerSaldiri {
  const agirlik = ASKER_SALDIRI_AGIRLIKLARI[kademe];
  const turler = Object.keys(agirlik) as AskerSaldiri[];
  const toplam = turler.reduce((t, k) => t + (agirlik[k] ?? 0), 0);
  let z = Math.random() * toplam;
  for (const t of turler) {
    z -= agirlik[t] ?? 0;
    if (z < 0) return t;
  }
  return turler[0];
}

// ── Pazar: toplam silahlı rütbeyle büyür, dönemle ters hareket eder ─────────
function pazarYakinsat(state: CharacterState): void {
  const hedef0 = ASKER_PAZAR_HEDEF[rutbeIndeksi(state)];
  const donem = state.ulke.savasta ? "savas" : state.veba?.aktif ? "veba" : state.ulke.donem?.tur ?? "durgunluk";
  const hedef = hedef0 * (ASKER_PAZAR_DONEM_CARPANI[donem as keyof typeof ASKER_PAZAR_DONEM_CARPANI] ?? 1);
  const P = Math.max(1, state.pazar_musteri ?? hedef0);
  const er = erSayisi(state);
  const yeniP = Math.max(er * 1.3 + 20, P + (hedef - P) * ASKER_PAZAR_YAKINSAMA);
  const eskiDis = Math.max(1, P - er);
  const yeniDis = Math.max(1, yeniP - er);
  const f = yeniDis / eskiDis;
  for (const r of aktifRakipler(state)) r.musteri = Math.max(0, Math.round(r.musteri * f * 10) / 10);
  state.pazar_musteri = Math.round(yeniP);
}

// ── Yıllık işleme ───────────────────────────────────────────────────────────
export function birlikYilIsle(state: CharacterState, bg: IsletmeBaglami): IsletmeYilSonucu {
  if (!birlikDurumu(state)) birlikHazirla(state);
  const is = state.isletme!;
  const b = birlikAl(state);
  const uyarilar: IsletmeUyari[] = [];
  const eskiEr = erSayisi(state);
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const bon = ekipBonuslari(state);
  const savasta = !!state.ulke.savasta;
  const onceki = is.son_dokum ? is.son_dokum.satis : Math.max(0, birlikHesapla(state, bg).toplamGelir);
  const gelirTaban = Math.max(0, onceki);
  let nakitHasar = 0;
  let ekstraGider = 0;

  sureleriKontrolEt(state, uyarilar);
  calisanlariGelistir(state, 0);
  calisanMaaslariniGuncelle(state, bg.giderEnflasyon);
  const sadakat = calisanSadakatKontrolleri(state, gelirTaban, uyarilar, true);
  nakitHasar += sadakat.nakitHasar;
  ekstraGider += sadakat.ekstraGider;

  // 0. Yaralıların yıllık iyileşmesi (yeni yaralılar bu yıl sonunda eklenir).
  const iyilesen = yaraliIyilestir(state, b);

  // 1. Erzak: ikmal kararı + olay etkisi; yıl sonunda tekrar 1'e döner.
  const karar = b.savas_karari && b.savas_karari.adim >= b.savas_karari.adimlar.length ? b.savas_karari : null;
  const ikmalId = (savasta ? b.savas?.ikmal : undefined) ?? karar?.ikmal ?? "yagma_orta";
  const ikmal = IKMAL_TANIMLARI[ikmalId];
  b.erzak_oran = clamp(b.erzak_oran + (savasta ? ikmal.erzakOran : 0), 0, 1);

  // 2. Savaş: çatışma / savaş sonu.
  let catisma: CatismaSonucu | null = null;
  let ganimetCarpani = 1;
  let savasSonu: SavasSonu | null = null;
  let ilkYilGenelCagri = false;
  let savasYili: SavasYili | null = null;
  if (savasta) {
    if (!b.savas) savasBaslat(state);
    if (!b.savas!.seferberlik) seferberlikUygula(state, "dengeli", bg); // karar verilmemişse varsayılan
    savasYili = savasYiliCoz(state, b, bg);
    ilkYilGenelCagri = b.savas!.seferberlik === "genel" && (b.savas!.yil_sayac ?? 1) <= 1;
    catisma = savasYili.catisma;
    if (catisma && b.savas!.son_catisma) uyarilar.push({ kod: "savas_catisma", catisma: { ...b.savas!.son_catisma } });
    ganimetCarpani = b.savas!.sonuc === "zafer" ? 1.3 : b.savas!.sonuc === "yenilgi" ? 0 : 1;
  } else if (b.savas) {
    savasSonu = savasiBitir(state, b, bg, uyarilar);
  }
  // Sefer yolculuğu: ordunun yarısı seferde; dönüşte tecrübe ve moral kazanır.
  if (seferdeMi(state)) b.seferde = true;
  else if (b.seferde) {
    b.seferde = false;
    if (state.etiketler.includes("yolculuk_tamamlandi")) {
      b.talim = clamp(b.talim + SEFER_DONUS_TALIM, 0, 100);
      b.moral = clamp(b.moral + SEFER_DONUS_MORAL, 0, 100);
    }
  }
  // Bozgundan sağ çıkan kanat (genel savaşı kazanırken kanat yenilgisi): yaralı gazi.
  if (catisma && !catisma.kanatZafer && catisma.genelZafer) madalyaVer(state, b, "yarali", uyarilar);

  // 2b. Barış çatışması (savaş dışında 2–3 yılda bir): vadesi gelince karar bekleyen çatışma kurulur; oyuncu verene dek zaman ilerlemez.
  if (barisCatismaVadesi(b, savasta) && !b.catisma_bekleyen) barisCatismaKur(state, b);

  // 3. Gelir / gider.
  const h = birlikHesapla(state, bg, { ganimetCarpani, savasYili: savasta ? b.savas?.yil_sayac ?? 1 : undefined });
  // Yüksek görevler ve kaleler yıllık şöhret kazandırır (sayı arayüzde yazılmaz).
  const gorevSohret = h.gorevler.reduce((t, x) => t + (x.aktif ? gorevGetir(x.id)?.sohret ?? 0 : 0), 0);
  const sohretKazanc = gorevSohret + b.kale * KALE_SOHRET;
  if (sohretKazanc > 0) state.un = clamp(state.un + sohretKazanc, 0, 100);

  // 3b. Yağma ikmali: köylerden gönüllü gelir, halk ezilir.
  if (savasta && h.yagmaBrut > 0) {
    const gonullu = olasilikliYuvarla(erSayisi(state) * YAGMA_ER_ORANI);
    if (gonullu > 0) yeniErEkle(state, gonullu, bg, { kalite: "dusuk", bedava: true, talim: 0 });
    const yt = IKMAL_TANIMLARI[ikmalId].yagma;
    state.ahlak = clamp(state.ahlak + yt.ahlak, 0, 100);
    state.mutluluk = clamp(state.mutluluk + yt.mutluluk, 0, 100);
    uyarilar.push({ kod: "yagma", tutar: r2(h.yagmaBrut), sayi: gonullu });
  }

  // 4. Esir.
  const esirSayisi = olasilikliYuvarla(h.esirBeklenen) + (savasSonu?.esir ?? 0);
  const esirYetkili = (state.rutbe_seviye ?? 1) >= 3;
  const esirKarari: BirlikEsirKarari = esirYetkili ? b.savas?.esir_karari ?? karar?.esir ?? "karma" : "karma";
  if (esirYetkili && esirSayisi > 0 && b.savas && !b.savas.esir_karari) b.savas.esir_bekliyor = true; // ilk esir: karar bir kez sorulacak
  const esir = esirSayisi > 0 ? esirleriIsle(state, b, esirSayisi, esirKarari, bg) : null;
  if (esir && esirSayisi > 0) uyarilar.push({ kod: "esir", sayi: esirSayisi });

  // 5. Kayıplar: ölü – yaralı – firar (tam sayı). Savaşta yıl tablosu, barış çatışmasında olay aralığı; görev kayıpları ek ölüdür.
  const kc = kayipCarpani(state);
  let gorevOlu = 0;
  let gorevYarali = 0;
  const yaraliGorevler: string[] = [];
  const yaraliGorevlerEn: string[] = [];
  for (const g of h.gorevler) {
    if (!g.aktif || g.er <= 0) continue;
    if (savasta) {
      gorevOlu += olasilikliYuvarla(g.er * GOREV_KAYIP(g.id, savasta) * kc);
    } else {
      // Barışta görev kayıpları ölü değil yaralıdır (bu yılın kaynağı bildirimde adıyla yazılır).
      const y = olasilikliYuvarla(g.er * GOREV_KAYIP(g.id, savasta) * BARIS_GOREV_YARALI_CARPANI * kc);
      if (y > 0) {
        gorevYarali += y;
        const tn = gorevGetir(g.id);
        if (tn) {
          const ad = gorevAdi(tn, state.cag);
          yaraliGorevler.push(ad.tr);
          yaraliGorevlerEn.push(ad.en);
        }
      }
    }
  }
  const ayar = firarAyarlayici(state, b);
  let oluPct = 0;
  let firarPct = 0;
  if (savasYili) {
    oluPct = savasYili.oluPct;
    firarPct = savasYili.firarPct + ayar.puan;
  } else {
    firarPct = ayar.tetik ? ayar.puan : 0;
  }
  const tavan = savasta ? savasKayipTavani(state, b) : null;
  const kayip = kayipUygula(state, b, {
    oluPct,
    firarPct,
    ekOlu: gorevOlu,
    ekYarali: gorevYarali,
    levyFirarCarpani: ilkYilGenelCagri ? FIRAR_GENEL_CAGRI_ILK_YIL : 1,
    oluTavan: tavan?.olu,
    firarTavan: tavan?.firar,
  });
  const olen = kayip.olu;
  const firar = kayip.firar;
  if (firar > 0) uyarilar.push({ kod: "firar", sayi: firar });
  const kayipKaynak = savasta ? "savas" : "gorev";
  const yaralananOlu = kayip.yaralanan - (kayip.yaralananEk ?? 0);
  if (olen > 0) uyarilar.push({ kod: "savas_kayip", sayi: olen, kaynak: kayipKaynak, ...(yaralananOlu > 0 ? { yaralanan: yaralananOlu } : {}) });
  else if (yaralananOlu > 0) uyarilar.push({ kod: "savas_kayip", sayi: 0, kaynak: kayipKaynak, yaralanan: yaralananOlu });
  if ((kayip.yaralananEk ?? 0) > 0) uyarilar.push({ kod: "savas_kayip", sayi: 0, kaynak: "gorev", yaralanan: kayip.yaralananEk, kaynakAd: { tr: yaraliGorevler.join(", "), en: yaraliGorevlerEn.join(", ") } });
  // Savaş Günü pencere onayında zaten uygulanan karar savaşı kaybı yıl bildiriminde de görünür (ikinci kez uygulanmaz).
  if (savasYili?.faz === "karar" && b.savas?.gun_sonucu && b.savas.gun_cozuldu_yil === state.yil) {
    const gs = b.savas.gun_sonucu;
    if (gs.firar > 0) uyarilar.push({ kod: "firar", sayi: gs.firar });
    if (gs.olu > 0 || gs.yarali > 0) uyarilar.push({ kod: "savas_kayip", sayi: gs.olu, kaynak: "savas", ...(gs.yarali > 0 ? { yaralanan: gs.yarali } : {}) });
  }
  if (iyilesen > 0) uyarilar.push({ kod: "yarali_iyilesti", sayi: iyilesen });
  if (h.limitAsimGideri > 0) uyarilar.push({ kod: "limit_asimi" });

  // 6. (Kaldırıldı) Rakip komutan saldırıları/hırsızlık: Asker'de rakip yok; tehdit yalnız düşman çatışması ve savaştır.

  // 7. Büyüme: devşirme subayı, büro, şöhret, doktrin, yatkınlık (savaşta ×2; vebada kısılır).
  const sohret = sohretMusteriSayisi(state.un);
  let buyume =
    BARIS_YILLIK_ER +
    subayToplami(state).devsirme +
    DEVSIRME_BUROSU_ER[clamp(yatirimKademesi(state, "devsirme"), 0, DEVSIRME_BUROSU_ER.length - 1)] +
    Math.max(0, sohret) +
    doktrin.devsirme +
    yatkinlikMusteriBuyumesi(state);
  if (savasta) buyume *= SAVAS_DEVSIRME_CARPANI;
  if (state.veba?.aktif) buyume *= VEBA_ARTIS_CARPANI;
  buyume += Math.min(0, sohret); // kötü şöhret devşirmeyi azaltır (savaşta/vebada çarpılmaz)
  const gelen = Math.max(0, olasilikliYuvarla(Math.max(0, buyume)));
  const butce = state.para + h.net - nakitHasar - ekstraGider + 50 * bg.enflasyon;
  const yeni = yeniErEkle(state, gelen, bg, { butce });
  let yeniErMaliyet = yeni.maliyet;

  // 8. Talim / tecrübe.
  const talimT = TALIM_TANIMLARI[b.talim_politikasi];
  // Teçhizat seviyesi (kalite karışımının ağırlıklı ortalaması; bakım ödenemiyorsa bir kademe düşük sayılır) talim kazancını ve morali etkiler.
  const bakimSorunu = !!odenmeyenCeza(state.para + h.net, bg.enflasyon);
  const kaliteKatsayi = (tablo: Record<BirlikKalite, number>) => {
    const k = bakimSorunu ? { dusuk: b.kalite.dusuk + b.kalite.orta, orta: b.kalite.yuksek, yuksek: 0 } : b.kalite;
    const t = k.dusuk + k.orta + k.yuksek;
    return t > 0 ? (k.dusuk * tablo.dusuk + k.orta * tablo.orta + k.yuksek * tablo.yuksek) / t : tablo.orta;
  };
  const talimDelta = talimT.delta > 0 ? talimT.delta * kaliteKatsayi(KALITE_TALIM_CARPANI) : talimT.delta;
  if (talimT.delta > 0) b.talim = clamp(Math.max(b.talim, Math.min(talimT.tavan, b.talim + talimDelta)), 0, 100);
  else b.talim = clamp(b.talim + talimDelta, 0, 100);
  if (catisma) b.talim = clamp(b.talim + (catisma.kanatZafer ? TALIM_SAVAS_ZAFER : TALIM_SAVAS_YENILGI), 0, 100);

  // 9. Moral: yıllık etkenler + bir kerelik olaylar + 60'a yönelim.
  let moral = GANIMET_PAYI_TANIMLARI[b.ganimet_payi].moral + TON_TANIMLARI[b.ton].moral + talimT.moral + (doktrin.moral + (yol.moral ?? 0));
  moral += savasta ? MORAL_SAVAS_YILLIK : MORAL_BARIS_YILLIK;
  if (savasta && h.yagmaBrut > 0) moral += IKMAL_TANIMLARI[ikmalId].yagma.moral; // yağma türü: sert ordu morali artırır, yumuşak düşürür
  moral += kaliteKatsayi(KALITE_MORAL);
  if (savasta) moral += emirGetir(b.savas?.emir)?.moral ?? 0;
  const donem = state.ulke.donem?.tur;
  if (donem === "kitlik") moral += MORAL_KITLIK_YILLIK;
  else if (donem === "bolluk") moral += MORAL_BOLLUK_YILLIK;
  if (eskiEr > 0 && (olen + firar) / eskiEr > MORAL_YUKSEK_KAYIP_ESIGI) moral += MORAL_YUKSEK_KAYIP;
  moral += clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * REVIR_MORAL_KADEME;
  const ceza = odenmeyenCeza(state.para + h.net, bg.enflasyon);
  if (ceza) moral += ceza.moral;
  if (catisma) {
    moral += catisma.kanatZafer ? MORAL_ZAFER : catisma.oran < 0.75 ? MORAL_KANAT_BOZGUN : -3;
    if (!catisma.genelZafer) moral += MORAL_YENILGI;
  }
  // Tek yıllık toplam düşüş sınırlı: art arda bozgun + yenilgi + yıllık yük morali bir yılda dibe çakmasın.
  moral = Math.max(moral, -MORAL_YILLIK_TABAN);
  b.moral = clamp(b.moral + moral, 0, 100);
  // 60'a yönelim: en az yılda 1 puan; uçurumdaki moral daha hızlı toparlanır (farkın %10'u, en çok 4) — moral dibinde kalıp ordu eritmesin.
  const fark = 60 - b.moral;
  const cekim = Math.min(Math.abs(fark), Math.min(MORAL_YONELIM_TAVAN, Math.max(MORAL_YONELIM, Math.abs(fark) * 0.15)));
  b.moral = clamp(b.moral + Math.sign(fark) * cekim, 0, 100);

  // 10. Sertlik, ahlak, otorite, aşırılık.
  const gorevSertlik = h.gorevler.filter((g) => g.aktif).reduce((t, g) => t + (gorevSertlikDegeri(g.id)), 0);
  b.sertlik = clamp(b.sertlik + TON_TANIMLARI[b.ton].sertlik + gorevSertlik + doktrin.sertlik + (yol.sertlik ?? 0) + (savasta ? IKMAL_TANIMLARI[ikmalId].sertlik : 0) - SERTLIK_DOGAL_SONUM, 0, 100);
  state.ahlak = clamp(state.ahlak + doktrin.ahlak + (yol.ahlak ?? 0), 0, 100);
  state.yonetim_iliski = clamp((state.yonetim_iliski ?? 0) + doktrin.otorite + (yol.otorite ?? 0) - b.sertlik * SERTLIK_OTORITE_KATSAYISI, 0, 100);
  if (b.sertlik > ASIRI_ESIK && (b.asiri_son_yil == null || state.yil - b.asiri_son_yil >= ASIRI_COOLDOWN_YIL)) {
    if (Math.random() < (b.sertlik - ASIRI_ESIK) / 300) {
      b.asiri_son_yil = state.yil;
      state.un = Math.max(0, state.un - 5);
      state.yonetim_iliski = Math.max(0, (state.yonetim_iliski ?? 0) - 10);
      const c = kaliteCikar(b, Math.round(erSayisi(state) * 0.03));
      state.meslek_musteri = Math.max(0, erSayisi(state) - c);
      uyarilar.push({ kod: "asiri_olay", sayi: c });
    }
  }

  // 11. Pazar (rakipler ve diğer ordular) rütbeyle büyür; kararlar tüketilir.
  pazarYakinsat(state);
  b.savas_karari = null;
  b.zar_bonusu = 0;
  b.erzak_oran = 1;
  doktrinBekleyenSeviye(state);
  birlikSenkron(state, bg.enflasyon);

  const esirGeliri = esir ? esir.para : 0;
  const barisNet = savasSonu?.net ?? 0;
  // Subay maaşı gerçek nakitten düşer (Tüccar/Zanaatkâr/Din ile aynı; eskiden Asker'de hiç düşülmüyordu → Kazanç subay maaşı kadar şaşıyordu).
  const calisanMaasi = r2(state.ekip.reduce((t, u) => t + u.maas, 0));
  const net = r2(h.net + barisNet + esirGeliri - nakitHasar - ekstraGider - yeniErMaliyet - calisanMaasi);
  const yeniEr = erSayisi(state);
  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(h.toplamGelir + barisNet + esirGeliri),
    alim: r2(h.erMasrafi + h.erzak + h.talimMasrafi + h.yaraliGideri),
    depoMasrafi: r2(h.kislaBakim + h.techizatBakim + h.kusatmaBakim),
    yatirimMasrafi: 0,
    loncaAidati: 0,
    calisanMaasi,
    nakitHasar: r2(nakitHasar),
    ekstraGider: r2(ekstraGider + yeniErMaliyet),
    curumeKaybi: 0,
    brutKar: r2(h.net + barisNet + esirGeliri),
    borcOdeme: 0,
    net,
    vergi: 0,
    vergiOrani: 0,
    pazarPayi: Math.round(pazarPayiHesapla(state) * 100),
    musteri: yeniEr,
    musteriDegisim: yeniEr - eskiEr,
    pazarMusteri: state.pazar_musteri,
    hatlar: [],
    birlik: {
      sold: r2(h.sold),
      erBasiGelir: r2(h.erBasiGelir),
      gorevGeliri: r2(h.gorevGeliri),
      ganimetPara: r2(h.ganimetBrut - h.yagmaBrut + (savasSonu?.brut ?? 0)), // yağma ayrı kalem (yagmaPara)
      savasOdenegi: r2(h.savasOdenegi),
      yagmaPara: r2(h.yagmaBrut),
      kiralikMasrafi: r2(h.kiralikMasrafi),
      kaleGeliri: r2(h.kaleGeliri),
      devletPayi: 0,
      erPayi: r2(h.erPayi + (savasSonu?.erPayi ?? 0)),
      erMasrafi: r2(h.erMasrafi),
      erzak: r2(h.erzak),
      techizatBakimi: r2(h.techizatBakim),
      guc: Math.round(b.guc),
      moral: Math.round(b.moral),
      talim: Math.round(b.talim),
      firar,
      olen,
      yaralanan: kayip.yaralanan,
      yarali: yaraliSayisi(state),
      iyilesen,
      tedaviGideri: r2(h.yaraliGideri),
      limitAsimGideri: r2(h.limitAsimGideri),
    },
    uyarilar,
  };
  is.son_dokum = dokum;
  adaylariGerekirseYenile(state);
  return { net, onOdenenAlim: 0, dokum };
}

// ── Görev tabloları (yardımcı) ──────────────────────────────────────────────
function GOREV_KAYIP(id: string, savasta: boolean): number {
  const g = gorevGetir(id);
  if (!g) return 0;
  return savasta ? g.kayipSavas : g.kayipBaris;
}
function gorevSertlikDegeri(id: string): number {
  return gorevGetir(id)?.sertlik ?? 0;
}
