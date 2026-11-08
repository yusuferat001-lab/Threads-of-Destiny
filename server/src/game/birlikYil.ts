import type { BirlikArazi, BirlikDurumu, BirlikEsirKarari, BirlikKalite, BirlikSavasDurumu, BirlikSeferberlik, BirlikTur, CharacterState, IsletmeDokum, IsletmeUyari } from "../types";
import {
  ARAZI_DEGISIM_ORANI,
  ARAZI_SIRASI,
  ASIRI_COOLDOWN_YIL,
  ASIRI_ESIK,
  ASKER_FIZIKSEL,
  ASKER_PAZAR_HEDEF,
  BARIS_CATISMALARI,
  BARIS_BEKLEME,
  BARIS_YILLIK_IHTIMAL,
  KALE_GELIR,
  KALE_SOHRET,
  BARIS_KAYBI,
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
  YARALI_TABIP_DUSUS_TAVAN,
  YARALI_TABIP_KATSAYI,
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
  BARIS_YENILGI_GANIMET,
  EMIRLER,
  KALE_GUC_ESIGI,
  KUSATMA_SALDIRI_BONUSU,
  KALE_MAKS,
  MADALYALAR,
  MADALYA_MORAL,
  MADALYA_SOHRET,
  SAVAS_ZAFER_ESIR,
  SAVAS_ZAFER_GANIMET,
  SEFER_DONUS_MORAL,
  SEFER_DONUS_TALIM,
  YAGMA_AHLAK,
  YAGMA_ER_ORANI,
  emirGetir,
  GANIMET_GUC_BIRIMI,
  ASKER_PAZAR_YAKINSAMA,
  ASKER_SALDIRI_AGIRLIKLARI,
  ASKER_SALDIRI_HASARLARI,
  BOLGE_ARAZI_AGIRLIGI,
  DEVSIRME_BUROSU_ER,
  DUSMAN_ORAN,
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

export function savasBaslat(state: CharacterState): BirlikSavasDurumu {
  const b = birlikAl(state);
  const turler: (BirlikTur | "karma")[] = ["okcu", "suvari", "mizrakli", "karma"];
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
    dusman_orani: r2(rnd(DUSMAN_ORAN[0], DUSMAN_ORAN[1])),
    dusman_tur: turler[Math.floor(Math.random() * turler.length)],
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
  const tabip = Math.min(YARALI_TABIP_DUSUS_TAVAN, korumaHesapla(state).calisan * YARALI_TABIP_KATSAYI);
  return Math.max(YARALI_ORAN_TABAN, aralikCek(YARALI_ORAN) - revir * YARALI_REVIR_DUSUS - tabip);
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
  /** Ek ölü (görev kayıpları), tam sayı. */
  ekOlu?: number;
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
  if (olu + firar <= 0) return { olu: 0, firar: 0, yaralanan: 0, oluLevy: 0, firarLevy: 0 };
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
  const yaralanan = Math.min(Math.round((oluR + oluL) * yaraliOrani(state)), saglamR + saglamL);
  const [yR, yL] = dagit(yaralanan, [saglamR, saglamL], [saglamR, saglamL]);
  b.yarali += yR + yL;
  if (sv) sv.seferberlik_yarali = levyYar + yL;
  b.yarali_hizi = Math.max(1, Math.ceil(b.yarali / yaraliIyilesmeSuresi(state)));
  return { olu: oluR + oluL, firar: firR + firL, yaralanan: yR + yL, oluLevy: oluL, firarLevy: firL };
}

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
  return { kanatZafer, genelZafer, oran: R, arazi, inisiyatif };
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
    const yil = Math.max(1, sv.yil_sayac ?? state.yil - sv.baslangic_yili);
    const doktrin = doktrinToplami(b.doktrinler);
    const yol = yolEtkisi(state);
    const emir = emirGetir(sv.emir);
    const carpan = (1 + doktrin.ganimet + (yol.ganimet ?? 0) + (emir?.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
    const guc = b.guc;
    sonuc.brut = r2(guc * GANIMET_GUC_BIRIMI * SAVAS_ZAFER_GANIMET * yil * bg.enflasyon * carpan);
    sonuc.erPayi = r2(sonuc.brut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran);
    sonuc.net = r2(sonuc.brut - sonuc.erPayi);
    sonuc.esir = olasilikliYuvarla(guc * SAVAS_ZAFER_ESIR * yil);
    uyarilar.push({ kod: "savas_ganimet", tutar: sonuc.net, sayi: sonuc.esir });
    madalyaVer(state, b, "zafer", uyarilar);
    // Kale: yeterli askerî güç ve genel zafer.
    // Kuşatma kolu / topçu yalnız KALE kuşatmasında saldırı bonusu verir (savaş meydanında değil).
    if (guc * (1 + KUSATMA_SALDIRI_BONUSU[clamp(b.kusatma_seviye, 0, 2)]) >= KALE_GUC_ESIGI && b.kale < KALE_MAKS) {
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
}

/**
 * Barış çatışması takvimi: kalan bekleme yılı azalır, bitince her yıl BARIS_YILLIK_IHTIMAL şansla çatışma çıkar
 * (sonra yeniden BARIS_BEKLEME yıl bekleme). Savaşta sayaç DURUR; savaş bitince en az 1 yıl bekleme (savasiBitir).
 */
function barisCatismaVadesi(b: BirlikDurumu, savasta: boolean): boolean {
  if (savasta) return false;
  const kalan = Math.max(0, Math.round(b.baris_bekleme ?? 0));
  if (kalan > 0) {
    b.baris_bekleme = kalan - 1;
    return false;
  }
  if (Math.random() > BARIS_YILLIK_IHTIMAL) return false;
  b.baris_bekleme = BARIS_BEKLEME;
  return true;
}

/**
 * Haydut ya da sınır çatışması: askerî güçle orantılı ganimet. Oyuncu kararı yoktur (içerik katmanı sonra);
 * zar mantığı savaş kanadıyla aynıdır ama genel savaş sonucu/arazi yoktur.
 */
function barisCatismasiCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): BarisCatismaSonucu {
  const tur: "haydut" | "sinir" = Math.random() < 0.5 ? "haydut" : "sinir";
  const t = BARIS_CATISMALARI[tur];
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const d = gucHesapla(state, { enflasyon: bg.enflasyon, senaryo: tur });
  const guc = d.guc;
  const dusman = dusmanReferansGucu(state) * rnd(t.dusman[0], t.dusman[1]);
  const oyuncuEff = guc * (1 + (d20() - 10.5) / ZAR_BOLEN + b.zar_bonusu);
  const dusmanEff = Math.max(1e-6, dusman * (1 + (d20() - 10.5) / ZAR_BOLEN));
  const R = oyuncuEff / dusmanEff;
  const zafer = R >= 1;
  const carpan = (1 + doktrin.ganimet + (yol.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const brut = guc * GANIMET_GUC_BIRIMI * t.ganimet * (zafer ? 1 : BARIS_YENILGI_GANIMET) * bg.enflasyon * carpan;
  const devlet = 0; // askerde devlet payı yok
  const erPayi = brut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran;
  const net = brut - erPayi;
  const esir = zafer ? olasilikliYuvarla(guc * t.esir) : 0;
  const kayip = BARIS_KAYBI[zafer ? "zafer" : "yenilgi"];
  b.talim = clamp(b.talim + (zafer ? BARIS_TALIM_ZAFER : BARIS_TALIM_YENILGI), 0, 100);
  return { tur, zafer, brut: r2(brut), devlet: r2(devlet), erPayi: r2(erPayi), net: r2(net), esir, oluPct: aralikCek(kayip.olu), firarPct: aralikCek(kayip.firar) };
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
  const sadakat = calisanSadakatKontrolleri(state, gelirTaban, uyarilar);
  nakitHasar += sadakat.nakitHasar;
  ekstraGider += sadakat.ekstraGider;

  // 0. Yaralıların yıllık iyileşmesi (yeni yaralılar bu yıl sonunda eklenir).
  const iyilesen = yaraliIyilestir(state, b);

  // 1. Erzak: ikmal kararı + olay etkisi; yıl sonunda tekrar 1'e döner.
  const karar = b.savas_karari && b.savas_karari.adim >= b.savas_karari.adimlar.length ? b.savas_karari : null;
  const ikmalId = (savasta ? b.savas?.ikmal : undefined) ?? karar?.ikmal ?? "yeterli";
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
    ganimetCarpani = b.savas!.sonuc === "zafer" ? 1.3 : b.savas!.sonuc === "yenilgi" ? 0.3 : 1;
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

  // 2b. Barış çatışması (savaş dışında 3–5 yılda bir): güçle orantılı ganimet.
  const baris = barisCatismaVadesi(b, savasta) ? barisCatismasiCoz(state, b, bg) : null;
  if (baris) {
    uyarilar.push({ kod: "baris_catisma", catismaTur: baris.tur, savasSonucu: baris.zafer ? "zafer" : "yenilgi", tutar: baris.net, sayi: baris.esir });
    if (baris.zafer) madalyaVer(state, b, "haydut", uyarilar);
  }

  // 3. Gelir / gider.
  const h = birlikHesapla(state, bg, { ganimetCarpani });
  // Yüksek görevler ve kaleler yıllık şöhret kazandırır (sayı arayüzde yazılmaz).
  const gorevSohret = h.gorevler.reduce((t, x) => t + (x.aktif ? gorevGetir(x.id)?.sohret ?? 0 : 0), 0);
  const sohretKazanc = gorevSohret + b.kale * KALE_SOHRET;
  if (sohretKazanc > 0) state.un = clamp(state.un + sohretKazanc, 0, 100);

  // 3b. Yağma ikmali: köylerden gönüllü gelir, halk ezilir.
  if (savasta && h.yagmaBrut > 0) {
    const gonullu = olasilikliYuvarla(erSayisi(state) * YAGMA_ER_ORANI);
    if (gonullu > 0) yeniErEkle(state, gonullu, bg, { kalite: "dusuk", bedava: true, talim: 0 });
    state.ahlak = clamp(state.ahlak + YAGMA_AHLAK, 0, 100);
    uyarilar.push({ kod: "yagma", tutar: r2(h.yagmaBrut - h.yagmaBrut * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran), sayi: gonullu });
  }

  // 4. Esir.
  const esirSayisi = olasilikliYuvarla(h.esirBeklenen) + (baris?.esir ?? 0) + (savasSonu?.esir ?? 0);
  const esirYetkili = (state.rutbe_seviye ?? 1) >= 3;
  const esirKarari: BirlikEsirKarari = esirYetkili ? b.savas?.esir_karari ?? karar?.esir ?? "karma" : "karma";
  if (esirYetkili && esirSayisi > 0 && b.savas && !b.savas.esir_karari) b.savas.esir_bekliyor = true; // ilk esir: karar bir kez sorulacak
  const esir = esirSayisi > 0 ? esirleriIsle(state, b, esirSayisi, esirKarari, bg) : null;
  if (esir && esirSayisi > 0) uyarilar.push({ kod: "esir", sayi: esirSayisi });

  // 5. Kayıplar: ölü – yaralı – firar (tam sayı). Savaşta yıl tablosu, barış çatışmasında olay aralığı; görev kayıpları ek ölüdür.
  const kc = kayipCarpani(state);
  let gorevOlu = 0;
  for (const g of h.gorevler) {
    if (!g.aktif || g.er <= 0) continue;
    gorevOlu += olasilikliYuvarla(g.er * GOREV_KAYIP(g.id, savasta) * kc);
  }
  const ayar = firarAyarlayici(state, b);
  let oluPct = 0;
  let firarPct = 0;
  if (savasYili) {
    oluPct = savasYili.oluPct;
    firarPct = savasYili.firarPct + ayar.puan;
  } else if (baris) {
    oluPct = baris.oluPct;
    firarPct = baris.firarPct > 0 ? baris.firarPct + ayar.puan : ayar.tetik ? ayar.puan : 0;
  } else {
    firarPct = ayar.tetik ? ayar.puan : 0;
  }
  const tavan = savasta ? savasKayipTavani(state, b) : null;
  const kayip = kayipUygula(state, b, {
    oluPct,
    firarPct,
    ekOlu: gorevOlu,
    levyFirarCarpani: ilkYilGenelCagri ? FIRAR_GENEL_CAGRI_ILK_YIL : 1,
    oluTavan: tavan?.olu,
    firarTavan: tavan?.firar,
  });
  const olen = kayip.olu;
  const firar = kayip.firar;
  if (firar > 0) uyarilar.push({ kod: "firar", sayi: firar });
  if (olen > 0) uyarilar.push({ kod: "savas_kayip", sayi: olen, ...(kayip.yaralanan > 0 ? { yaralanan: kayip.yaralanan } : {}) });
  if (iyilesen > 0) uyarilar.push({ kod: "yarali_iyilesti", sayi: iyilesen });
  if (h.limitAsimGideri > 0) uyarilar.push({ kod: "limit_asimi" });

  // 6. Rakip komutan saldırısı (takvim).
  const kademe = rakipSaldiriKademesi(pazarPayiHesapla(state));
  const aktifler = aktifRakipler(state);
  const rakip = aktifRakip(state);
  if (kademe >= 2 && rakip) rakip.husumet = clamp(rakip.husumet + 3, 0, 100);
  const otoriteKoruma = (state.yonetim_iliski ?? 0) >= OTORITE_KORUMA_ESIGI;
  if (state.rakip_sonraki_saldiri_yili == null) state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
  if (!ilkYillarGuvenli(state) && state.yil >= state.rakip_sonraki_saldiri_yili) {
    state.rakip_sonraki_saldiri_yili = rastgeleSaldiriYili(state.yil, otoriteKoruma);
    if (aktifler.length > 0 && rakip) {
      const kucukler = aktifler.filter((r) => r !== rakip);
      const saldiran = kucukler.length > 0 && Math.random() >= RAKIP_BUYUK_SALDIRI_ORANI ? kucukler[Math.floor(Math.random() * kucukler.length)] : rakip;
      state.rakip_saldiri_son_yil = state.yil;
      const tur = askerSaldiriSec(kademe);
      const sizan = state.ekip.filter((u) => u.rol_turu && u.sadakat < SADAKAT_RISK_ESIGI).sort((x, y) => x.sadakat - y.sadakat)[0];
      const carpan = (saldiran === rakip ? 1 : RAKIP_IKINCI_HASAR_CARPANI) * (sizan ? SIZMA_HASAR_CARPANI : 1);
      const uyari: IsletmeUyari = { kod: "rakip_saldiri", sonuc: tur as IsletmeUyari["sonuc"], rakip: saldiran.ad, ...(sizan ? { sizma: true, isim: sizan.isim } : {}) };
      const koruma = clamp(bon.koruma + KARAKOL_KORUMA[clamp(yatirimKademesi(state, "koruma"), 0, KARAKOL_KORUMA.length - 1)] + (otoriteKoruma ? 0.1 : 0), 0, 0.9);
      if (ASKER_FIZIKSEL.includes(tur) && !sizan && Math.random() < koruma) {
        uyari.engellendi = true;
      } else {
        const i = kademe - 1;
        if (sizan) sizan.sadakat = Math.max(0, sizan.sadakat - SIZMA_SADAKAT_KAYBI);
        const hasar = ASKER_SALDIRI_HASARLARI[tur] as Partial<Record<"nakit" | "er" | "sohret" | "otorite" | "techizat", readonly number[]>>;
        if (hasar.nakit && hasar.nakit[i] > 0) {
          const yuzde = hasar.nakit[i] * carpan;
          const tutar = r2(gelirTaban * (yuzde / 100));
          nakitHasar += tutar;
          uyari.nakitYuzde = Math.round(yuzde);
          uyari.tutar = tutar;
        }
        if (hasar.er && hasar.er[i] > 0) {
          const adet = Math.round(erSayisi(state) * (hasar.er[i] * carpan) / 100);
          if (tur === "er_ayartma") {
            const kayip = musteriAktar(state, "oyuncu", rakipGrubu(saldiran.ad), adet);
            uyari.musteriKaybi = Math.round(kayip);
          } else {
            const c = kaliteCikar(b, adet);
            state.meslek_musteri = Math.max(0, erSayisi(state) - c);
            uyari.musteriKaybi = c;
          }
        }
        if (hasar.techizat && hasar.techizat[i] > 0) {
          const gec = Math.round(b.kalite.yuksek * (hasar.techizat[i] / 100));
          b.kalite.yuksek -= gec;
          b.kalite.orta += gec;
        }
        if (hasar.sohret && hasar.sohret[i] > 0) {
          const k = hasar.sohret[i] * carpan;
          state.un = Math.max(0, state.un - k);
          uyari.sohretKaybi = Math.round(k * 10) / 10;
        }
        if (hasar.otorite && hasar.otorite[i] > 0) {
          const k = hasar.otorite[i] * carpan;
          state.yonetim_iliski = Math.max(0, (state.yonetim_iliski ?? 0) - k);
          uyari.otoriteKaybi = Math.round(k * 10) / 10;
        }
      }
      uyarilar.push(uyari);
    }
  }

  // 7. Büyüme: devşirme subayı, büro, şöhret, doktrin, yatkınlık (savaşta ×2; vebada kısılır).
  const sohret = sohretMusteriSayisi(state.un);
  let buyume =
    Math.max(0, bon.musteri) +
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
  moral += kaliteKatsayi(KALITE_MORAL);
  if (savasta) moral += emirGetir(b.savas?.emir)?.moral ?? 0;
  const donem = state.ulke.donem?.tur;
  if (donem === "kitlik") moral += MORAL_KITLIK_YILLIK;
  else if (donem === "bolluk") moral += MORAL_BOLLUK_YILLIK;
  if (eskiEr > 0 && (olen + firar) / eskiEr > MORAL_YUKSEK_KAYIP_ESIGI) moral += MORAL_YUKSEK_KAYIP;
  moral += clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * REVIR_MORAL_KADEME;
  const ceza = odenmeyenCeza(state.para + h.net, bg.enflasyon);
  if (ceza) moral += ceza.moral;
  if (baris) moral += baris.zafer ? BARIS_MORAL_ZAFER : BARIS_MORAL_YENILGI;
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
  const barisNet = (baris?.net ?? 0) + (savasSonu?.net ?? 0);
  const net = r2(h.net + barisNet + esirGeliri - nakitHasar - ekstraGider - yeniErMaliyet);
  const yeniEr = erSayisi(state);
  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(h.toplamGelir + barisNet + esirGeliri),
    alim: r2(h.erMasrafi + h.erzak + h.talimMasrafi + h.yaraliGideri),
    depoMasrafi: r2(h.kislaBakim + h.techizatBakim + h.kusatmaBakim),
    yatirimMasrafi: 0,
    loncaAidati: 0,
    calisanMaasi: r2(state.ekip.reduce((t, u) => t + u.maas, 0)),
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
      ganimetPara: r2(h.ganimetBrut + (baris?.brut ?? 0) + (savasSonu?.brut ?? 0)),
      savasOdenegi: r2(h.savasOdenegi),
      yagmaPara: r2(h.yagmaBrut),
      kiralikMasrafi: r2(h.kiralikMasrafi),
      kaleGeliri: r2(h.kaleGeliri),
      devletPayi: 0,
      erPayi: r2(h.erPayi + (baris?.erPayi ?? 0) + (savasSonu?.erPayi ?? 0)),
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
