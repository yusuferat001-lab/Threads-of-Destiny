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
  ganimetBrutTemel,
  BARIS_YILLIK_IHTIMAL,
  KALE_GELIR,
  KALE_SOHRET,
  BARIS_KAYBI,
  BARIS_YARALI_ORAN,
  SAVAS_SAGLIK_TOPLAM,
  SAVAS_SAGLIK_YIL_BOLEN,
  SAVAS_SAGLIK_YENILGI_EK,
  BARIS_SAGLIK,
  BASKIN_YENILGI_SAGLIK_EK,
  GOREV_SAGLIK,
  SAGLIK_REVIR_AZALTMA,
  SOHRET_SONUCU,
  SOHRET_BASKIN,
  ZAFER_SERISI_ESIGI,
  ZAFER_SERISI_DUSMAN_ARTISI,
  ZAFER_SERISI_ESIGI_2,
  ZAFER_SERISI_DUSMAN_ARTISI_2,
  SAVAS_BOZGUN_FIRARI,
  ZAFER_SERISI_BOS,
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
  SAVAS_ON_YIL_TOPLAM,
  SAVAS_ON_YIL_TAVANI,
  SAVAS_ON_YIL_SAPMA,
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
  CATISMA_ORDU_MORALI,
  CATISMA_KISI_MORALI,
  SAVAS_KISI_MORALI,
  BARIS_TALIM_YENILGI,
  BARIS_TALIM_ZAFER,
  BARIS_GANIMET_ARALIK,
  GOREV_FIRAR_YIL_IHTIMALI,
  GOREV_KAYIP_BILDIRIM_ESIGI,
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
  YAGMA_YIL,
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
  SEFERBERLIK_KALMA_YENILGI,
  SEFERBERLIK_GAZI_ORANI,
  MORAL_DIP_ESIGI,
  MORAL_DIP_TOPARLANMA,
  TALIM_DOGAL_DUSUS,
  TALIM_YENI_ER_GIRIS,
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
import { checkDeath } from "./stateManager";
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
  limitAsimEri,
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

/**
 * Oyuncunun kendi sağlığı (v63): ham bedel × rütbe maruziyeti × (1 − Tabip ölü/firar azaltma) × (1 − revir). Kesirli sonuç olasılıkla yuvarlanır.
 * ALT LİMİT YOK: sağlık 0'a inerse oyuncu savaşta ölür. Uygulanan (tam sayı) kaybı döndürür.
 */
export function saglikBedeliUygula(state: CharacterState, ham: number): number {
  if (!(ham > 0) || !state.aktif) return 0;
  const tabip = subayToplami(state).oluFirarAzalt;
  const revir = clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * SAGLIK_REVIR_AZALTMA;
  const kayip = olasilikliYuvarla(ham * (1 - tabip) * (1 - revir));
  if (kayip <= 0) return 0;
  state.saglik = Math.max(0, state.saglik - kayip);
  if (state.saglik <= 0) checkDeath(state, false, { tr: "Savaşta aldığı yaralardan öldü", en: "Died of wounds taken in war" });
  return kayip;
}

/** İkmal (yağma türü) sağlık yastığı: yumuşak yağma (iyi ikmal, ordu iyi beslenir) −%15, sert yağma +%15 — yağma kayıp çarpanıyla aynı. */
function ikmalSaglikCarpani(id: string | undefined): number {
  return IKMAL_TANIMLARI[(id as keyof typeof IKMAL_TANIMLARI) ?? "yagma_orta"]?.yagma.kayip ?? 1;
}

/** Zafer serisi (her tür ayrı): ≥3 arka arkaya zafer → düşman ×1,10–1,15, ≥5 → ×1,20–1,25 (seri sürdükçe kalıcı); yenilgi sıfırlar; yoksa 1. */
export function hazirlikCek(b: BirlikDurumu, tur: "haydut" | "sinir" | "savas"): number {
  const seri = (b.zafer_serisi ??= { ...ZAFER_SERISI_BOS })[tur] ?? 0;
  if (seri >= ZAFER_SERISI_ESIGI_2) return 1 + rnd(ZAFER_SERISI_DUSMAN_ARTISI_2[0], ZAFER_SERISI_DUSMAN_ARTISI_2[1]);
  return seri >= ZAFER_SERISI_ESIGI ? 1 + rnd(ZAFER_SERISI_DUSMAN_ARTISI[0], ZAFER_SERISI_DUSMAN_ARTISI[1]) : 1;
}
/** Sonuçla seri güncellenir: zafer +1, yenilgi sıfırlar. */
export function zaferSerisiIsle(b: BirlikDurumu, tur: "haydut" | "sinir" | "savas", zafer: boolean): void {
  const z = (b.zafer_serisi ??= { ...ZAFER_SERISI_BOS });
  z[tur] = zafer ? Math.min(99, (z[tur] ?? 0) + 1) : 0;
}

/** Sonuca göre şöhret: `agirlik` 0..1 (0 = aralığın alt ucu, 1 = üst ucu); tam sayıya olasılıkla yuvarlanır; uygulanan işaretli değeri döndürür. */
export function sohretSonucuUygula(state: CharacterState, tur: "haydut" | "sinir" | "savas", zafer: boolean, agirlik: number, baskin = false): number {
  const [lo, hi] = SOHRET_SONUCU[tur][zafer ? "zafer" : "yenilgi"];
  const w = clamp(agirlik, 0, 1);
  const buyukluk = lo + (hi - lo) * w + (baskin ? (zafer ? SOHRET_BASKIN.zafer : SOHRET_BASKIN.yenilgi) : 0);
  const delta = (zafer ? 1 : -1) * olasilikliYuvarla(buyukluk);
  state.un = clamp(state.un + delta, 0, 100);
  return delta;
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
    hazirlik: hazirlikCek(b, "savas"),
    saglik_plan: aralikCek(SAVAS_SAGLIK_TOPLAM),
    saglik_uygulanan: 0,
    saglik_kaybi: 0,
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
  const girisTalim = sec.talim ?? TALIM_YENI_ER_GIRIS;
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
  // Çağrılan erler ücretsiz gelir (bedel moral, talim, firar, ahlak ve erzak); kışla limitine takılmaz, aşan kısım limit aşım gideri öder.
  // Ordunun gerçek talimi bozulmaz: giriş talimi `seferberlik_talim`de tutulur, güç ve kayıp "etkin talim" ortalamasından hesaplanır.
  const eklenen = yeniErEkle(state, istenen, bg, { kalite: t.kalite, bedava: true, talim: b.talim, limitsiz: true }).eklenen;
  sv.seferberlik_er += eklenen;
  sv.seferberlik_talim = t.talim ?? b.talim;
  sv.seferberlik_kalite = t.kalite;
  sv.baslangic_toplam = erSayisi(state);
  b.moral = clamp(b.moral + t.moral, 0, 100);
  // Halk bedeli: büyük çağrılar ahlak, mutluluk ve şöhreti götürür.
  if (eklenen > 0) {
    state.ahlak = clamp(state.ahlak + t.ahlak, 0, 100);
    state.mutluluk = clamp(state.mutluluk + t.mutluluk, 0, 100);
    state.un = clamp(state.un + t.sohret, 0, 100);
  }
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
  if (b.savas && (b.savas.kiralik_yarali ?? 0) > 0) {
    // Paralı yaralılar da ordu yaralılarıyla aynı sürede iyileşir.
    b.savas.kiralik_yarali = Math.max(0, (b.savas.kiralik_yarali ?? 0) - Math.max(1, Math.ceil((b.savas.kiralik_yarali ?? 0) / yaraliIyilesmeSuresi(state))));
  }
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
  /** Verilirse yaralı ölüden BAĞIMSIZ: ordunun bu %'si (ön yıllar); yoksa yaralı = ölü × oran. */
  yaraliPct?: number;
  /** Verilirse yaralı = ölü × bu (barış çatışması: 2,5; Tabip ve revir düşürür); yoksa savaş oranı. */
  yaraliOran?: number;
  /** Ek yaralı (barış yılı görev kayıpları: ölüye değil doğrudan yaralıya gider), tam sayı. */
  ekYarali?: number;
  /** Seferberlik erlerinden ayrıca bu % firar eder (savaş boyu her yıl; savaş tavanına sayılmaz). */
  levyFirarPct?: number;
  /** Savaş boyu kalan tavan (tam sayı); yoksa tavan yok. */
  oluTavan?: number;
  firarTavan?: number;
  /** true: bu yılın firarı savaş toplam firar sayacına (tavan hesabı) EKLENMEZ (bozgun firarı: sonraki yıllar kendi payını korur). */
  firarSayma?: boolean;
}
export interface KayipSonucu {
  olu: number;
  firar: number;
  yaralanan: number;
  /** `yaralanan` içinden ek (görev) yaralısı. */
  yaralananEk?: number;
  oluLevy: number;
  firarLevy: number;
  /** Kiralık ordu (paralı) kaybı: ölü ve yaralı (firar yok). */
  kiralikOlu?: number;
  kiralikYarali?: number;
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
  const levyC = 1;
  // Kiralık ordu (paralı): ordunun ölü yüzdesini AYNEN yaşar, ölenin ~yaralı katı kadar da yaralanır; firar etmez.
  let kiralikOlu = 0;
  let kiralikYarali = 0;
  if (sv && (sv.kiralik_er ?? 0) > 0 && (g.oluPct > 0 || (g.yaraliPct ?? 0) > 0)) {
    const nM = Math.round(sv.kiralik_er ?? 0);
    kiralikOlu = Math.min(nM, olasilikliYuvarla(nM * (g.oluPct / 100) * kc));
    const saglamM = Math.max(0, nM - Math.round(sv.kiralik_yarali ?? 0) - kiralikOlu);
    kiralikYarali = Math.min(g.yaraliPct != null ? olasilikliYuvarla((nM * Math.max(0, g.yaraliPct)) / 100) : Math.round(kiralikOlu * (g.yaraliOran ?? yaraliOrani(state))), saglamM);
    sv.kiralik_er = nM - kiralikOlu;
    sv.kiralik_yarali = Math.min(sv.kiralik_er, Math.max(0, Math.round(sv.kiralik_yarali ?? 0)) + kiralikYarali);
  }
  let olu = olasilikliYuvarla(er * (g.oluPct / 100) * kc) + Math.max(0, Math.round(g.ekOlu ?? 0));
  let firar = olasilikliYuvarla((nR + nL * levyC) * (Math.max(0, g.firarPct) / 100) * clamp(kc, 0.4, 1.2));
  if (g.oluTavan != null) olu = Math.min(olu, Math.max(0, g.oluTavan));
  if (g.firarTavan != null) firar = Math.min(firar, Math.max(0, g.firarTavan));
  const maks = Math.max(0, er - MIN_CEKIRDEK_ER);
  olu = Math.min(olu, maks);
  firar = Math.min(firar, maks - olu);
  const ekYar = Math.max(0, Math.round(g.ekYarali ?? 0));
  if (olu + firar <= 0 && !((g.levyFirarPct ?? 0) > 0 && nL > 0)) {
    // Yalnız görev yaralısı: sağlam erlerden ayrılır.
    const saglam = Math.max(0, er - Math.max(0, Math.round(b.yarali ?? 0)));
    const y = Math.min(ekYar, saglam);
    if (y > 0) {
      b.yarali = Math.max(0, Math.round(b.yarali ?? 0)) + y;
      b.yarali_hizi = Math.max(1, Math.ceil(b.yarali / yaraliIyilesmeSuresi(state)));
    }
    return { olu: 0, firar: 0, yaralanan: y, yaralananEk: y, oluLevy: 0, firarLevy: 0, kiralikOlu, kiralikYarali };
  }
  const [oluR, oluL] = dagit(olu, [nR, nL], [nR, nL]);
  const [firR, firL0] = dagit(firar, [nR, nL * levyC], [nR - oluR, nL - oluL]);
  // Seferber erlerin sürekli firarı: kalan seferberlerin %'si (savaş tavanına sayılmaz).
  const levyKal0 = Math.max(0, nL - oluL - firL0);
  const levyEk = (g.levyFirarPct ?? 0) > 0 ? Math.min(levyKal0, olasilikliYuvarla((levyKal0 * (g.levyFirarPct ?? 0)) / 100)) : 0;
  const firL = firL0 + levyEk;
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
    if (!g.firarSayma) sv.firar_toplam = (sv.firar_toplam ?? 0) + firR + firL0;
  }
  // Yaralı: ölünün 1,4–1,5 katı (revir/tabip düşürür), sağlam erlerden ayrılır; ana ordu / seferberlik oransal.
  const erSon = erSayisi(state);
  b.yarali = Math.min(Math.max(0, Math.round(b.yarali ?? 0)), erSon);
  const levyYar = Math.min(sv?.seferberlik_yarali ?? 0, levyKalan, b.yarali);
  const saglamL = Math.max(0, levyKalan - levyYar);
  const saglamR = Math.max(0, erSon - levyKalan - (b.yarali - levyYar));
  const yaralananOlu = Math.min(g.yaraliPct != null ? olasilikliYuvarla((erSon * Math.max(0, g.yaraliPct)) / 100) : Math.round((oluR + oluL) * (g.yaraliOran ?? yaraliOrani(state))), saglamR + saglamL);
  const yaralanan = Math.min(yaralananOlu + ekYar, saglamR + saglamL);
  const [yR, yL] = dagit(yaralanan, [saglamR, saglamL], [saglamR, saglamL]);
  b.yarali += yR + yL;
  if (sv) sv.seferberlik_yarali = levyYar + yL;
  b.yarali_hizi = Math.max(1, Math.ceil(b.yarali / yaraliIyilesmeSuresi(state)));
  return { olu: oluR + oluL, firar: firR + firL, yaralanan: yR + yL, yaralananEk: Math.min(ekYar, Math.max(0, yR + yL - Math.min(yaralananOlu, yR + yL))), oluLevy: oluL, firarLevy: firL, kiralikOlu, kiralikYarali };
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
  // Düşmanın gücü MUTLAKTIR (yaşa göre referans × savaş başında çekilen ±%5 × zafer serisi hazırlığı): bizim gücümüz sonucu doğrudan belirler.
  const E = dusmanReferansGucu(state) * sv.dusman_orani * (sv.hazirlik ?? 1);
  const dagilim = dusmanSaldiriSavunma(sv.dusman_tur);
  // Arazi düşmanın baskın birliğini de etkiler (oyuncuyla aynı tablo).
  const dusmanG = E * (inisiyatif === "saldiri" ? dagilim.savunma : dagilim.saldiri) * dusmanAraziCarpani(arazi, sv.dusman_tur);
  const rol = ROL_TANIMLARI[karar?.rol ?? "ana"];
  const zarYuzde = () => (d20() - 10.5) / SAVAS_ZAR_BOLEN; // ±%4 (SAVAS_ZAR_YUZDE)
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
  zaferSerisiIsle(b, "savas", genelZafer);
  // Karar savaşı sonucu oyuncunun kendi morali (mutluluk) için; ordu morali yıl işlemede (MORAL_ZAFER / MORAL_YENILGI).
  state.mutluluk = clamp(state.mutluluk + SAVAS_KISI_MORALI[genelZafer ? "zafer" : "yenilgi"], 0, 100);
  catismaIzleyici.fn?.({ tur: "savas", zafer: genelZafer, yas: state.yas, oyuncuGuc: d.guc, dusmanGuc: E, oyuncuEtkin: oyuncuG, dusmanEtkin: dusmanG, tablo: dusmanReferansGucu(state) });
  return { kanatZafer, genelZafer, oran: R, arazi, inisiyatif };
}

/** Yağma yıllarında (savaşın ilk YAGMA_YIL yılı) seçilen yağma türünün ölü/firar çarpanı; diğer yıllarda 1. `yil` savaşın kaçıncı yılı olduğu (1 tabanlı). */
export function yagmaKayipCarpani(b: BirlikDurumu, yil: number): number {
  const sv = b.savas;
  if (!sv || yil > YAGMA_YIL) return 1;
  return IKMAL_TANIMLARI[sv.ikmal ?? "yagma_orta"]?.yagma.kayip ?? 1;
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
  const yk = yagmaKayipCarpani(b, (sv.yil_sayac ?? 0) + 1);
  const oluPct = aralikCek(yariAralik(t.olu, konum)) * yk;
  const firarPct = aralikCek(yariAralik(t.firar, konum)) * yk;
  const tavan = savasKayipTavani(state, b);
  const kayip = kayipUygula(state, b, { oluPct, firarPct, oluTavan: tavan.olu, firarTavan: tavan.firar });
  const E = dusmanReferansGucu(state) * sv.dusman_orani;
  const dk = BARIS_DUSMAN_KAYBI; // düşman kaybı tahmini: kazanırsak büyük, kaybedersek küçük
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  const emir = emirGetir(sv.emir);
  const carpan = (1 + subayToplami(state).ganimet + doktrin.ganimet + (yol.ganimet ?? 0) + (emir?.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const ortGanimet = (SAVAS_ZAFER_GANIMET[0] + SAVAS_ZAFER_GANIMET[1]) / 2;
  const brut = zafer ? ganimetBrutTemel(gucOnce, ortGanimet) * bg.enflasyon * carpan : 0;
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
    kiralikOlu: kayip.kiralikOlu ?? 0,
    kiralikYarali: kayip.kiralikYarali ?? 0,
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
  /** Yalnız ön yıllarda: yaralı ordunun %'si olarak ölüden bağımsız çekilir (yoksa yaralı = ölü × oran). */
  yaraliPct?: number;
  /** Yalnız ön yıllarda: seferber erlerden EK firar (seferberlerin %'si; savaş tavanına ve ön yıl toplamına sayılmaz). */
  seferFirarPct?: number;
  /** Bu yılın ordu % kayıp oranları (aralıktan çekildi). */
  oluPct: number;
  firarPct: number;
  faz: "on" | "karar" | "sonra";
  /** Büyük savaş yenilgisinin 4. yılı: bozgun firarı (savaş firar tavanına takılmaz). */
  bozgun?: boolean;
}

/** Ön yıl planı: toplam T (%5–6) üç türe ≈ eşit (±%30) bölünür; her tür iki yıla rastgele (%35–65) dağıtılır. */
export function onYilPlaniCek(seferToplam = 0): NonNullable<BirlikSavasDurumu["on_yil_plan"]> {
  const T = aralikCek(SAVAS_ON_YIL_TOPLAM);
  const w = [0, 1, 2].map(() => 1 + rnd(-SAVAS_ON_YIL_SAPMA, SAVAS_ON_YIL_SAPMA));
  const wt = w[0] + w[1] + w[2];
  const bol = (pay: number): [number, number] => {
    const t = (T * pay) / wt;
    const u = rnd(0.35, 0.65);
    return [Math.round(t * u * 1000) / 1000, Math.round(t * (1 - u) * 1000) / 1000];
  };
  // Seferber ek firarı: ayrı bir toplam (Gazi %5, Tüm Erkekler %10), iki yıla rastgele bölünür.
  const us = rnd(0.35, 0.65);
  const sefer: [number, number] = [Math.round(seferToplam * us * 1000) / 1000, Math.round(seferToplam * (1 - us) * 1000) / 1000];
  return { olu: bol(w[0]), yarali: bol(w[1]), firar: bol(w[2]), sefer };
}

/** Savaşın bir yılı: 1–2. yıl olay zarı, 3. yıl tek karar savaşı, sonrası sonuca göre düşük kayıp. */
export function savasYiliCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): SavasYili {
  const sv = b.savas!;
  sv.yil_sayac = (sv.yil_sayac ?? 0) + 1;
  const yk = yagmaKayipCarpani(b, sv.yil_sayac);
  // Karar savaşı pencere onaylanırken zaten çözüldüyse: kaydı kullan, yeniden zar atma, kaybı ikinci kez uygulama.
  if (sv.gun_cozuldu_yil === state.yil && sv.gun_catisma) {
    return { catisma: sv.gun_catisma, oluPct: 0, firarPct: 0, faz: "karar" };
  }
  if (sv.sonuc == null && sv.yil_sayac >= SAVAS_KARAR_YILI) {
    const catisma = catismaCoz(state, b, bg);
    const konum = catisma.oran < 0.75 ? "ust" : catisma.oran >= 1.2 ? "alt" : "tam";
    const t = SAVAS_KARAR_KAYBI[sv.sonuc!];
    return { catisma, oluPct: aralikCek(yariAralik(t.olu, konum)) * yk, firarPct: aralikCek(yariAralik(t.firar, konum)) * yk, faz: "karar" };
  }
  if (sv.sonuc == null) {
    // Ön yıllar: savaş başında çekilen plan (toplam %5–6, üç türe yaklaşık eşit, iki yıla rastgele); yağma ve kayıp çarpanı sonrası da toplam %6'yı geçmez.
    const plan = (sv.on_yil_plan ??= onYilPlaniCek(sv.seferberlik ? SEFERBERLIK_TANIMLARI[sv.seferberlik]?.firar ?? 0 : 0));
    const i = Math.min(1, Math.max(0, sv.yil_sayac - 1));
    let o = plan.olu[i] * yk;
    let y = plan.yarali[i] * yk;
    let f = plan.firar[i] * yk;
    const kc = kayipCarpani(state);
    const toplam = o * kc + y + f * clamp(kc, 0.4, 1.2);
    const kalan = Math.max(0, SAVAS_ON_YIL_TAVANI - (sv.on_yil_kullanilan ?? 0));
    const olcek = toplam > kalan && toplam > 0 ? kalan / toplam : 1;
    o *= olcek;
    y *= olcek;
    f *= olcek;
    sv.on_yil_kullanilan = (sv.on_yil_kullanilan ?? 0) + toplam * olcek;
    return { catisma: null, oluPct: o, yaraliPct: y, firarPct: f, seferFirarPct: plan.sefer?.[i] ?? 0, faz: "on" };
  }
  const t = SAVAS_SONRA_KAYBI[sv.sonuc];
  // Yalnız TÜM ORDU yenilgisi (büyük savaş): karar savaşından sonraki ilk yıl (4. yıl) bozgun firarı yüksektir.
  if (sv.sonuc === "yenilgi" && sv.yil_sayac === SAVAS_KARAR_YILI + 1) {
    return { catisma: null, oluPct: aralikCek(t.olu), firarPct: aralikCek(SAVAS_BOZGUN_FIRARI), faz: "sonra", bozgun: true };
  }
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
    // Kadroda kalan seferberler ordunun talim ortalamasına katılır (savaş boyu bozulmayan gerçek talim şimdi seyrelir/yükselir).
    const kalanGercek = hayatta - terhis;
    const anaEr = Math.max(0, erSayisi(state) - kalanGercek);
    if (kalanGercek > 0 && anaEr + kalanGercek > 0) {
      b.talim = clamp((b.talim * anaEr + (sv.seferberlik_talim ?? b.talim) * kalanGercek) / (anaEr + kalanGercek), 0, 100);
    }
    // Kalıcı gazi kadrosu: zaferle biten savaşta kalanların bir kısmı bir kalite yukarı çıkar.
    if (zafer && kalanGercek > 0) {
      const yukari = Math.min(b.kalite[lk], Math.round(kalanGercek * SEFERBERLIK_GAZI_ORANI));
      const hedef: BirlikKalite | null = lk === "dusuk" ? "orta" : lk === "orta" ? "yuksek" : null;
      if (hedef && yukari > 0) {
        b.kalite[lk] -= yukari;
        b.kalite[hedef] += yukari;
      }
    }
  }
  // Kiralık ordu savaşla gider (yaralılar dahil).
  sv.kiralik_er = 0;
  sv.kiralik_yarali = 0;
  // Seferberlerin hepsi sıradan er olarak kaldı: kışla limitini aşıyorsa uyar (fazla er yüksek gider öder; terhis ya da kışla yükseltme).
  const fazlaEr = erSayisi(state) - komutaLimiti(state);
  if (fazlaEr > 0) uyarilar.push({ kod: "limit_asimi_seferber", sayi: fazlaEr });
  const sonuc: SavasSonu = { zafer, brut: 0, erPayi: 0, net: 0, esir: 0, kale: false };
  if (zafer) {
    // Büyük zafer ganimeti: askerî güçle ve savaşın uzunluğuyla orantılı; askerlerin payı ayrılır, kalanı bizim.
    const doktrin = doktrinToplami(b.doktrinler);
    const yol = yolEtkisi(state);
    const emir = emirGetir(sv.emir);
    const carpan = (1 + subayToplami(state).ganimet + doktrin.ganimet + (yol.ganimet ?? 0) + (emir?.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
    const guc = b.guc;
    sonuc.brut = r2(ganimetBrutTemel(guc, aralikCek(SAVAS_ZAFER_GANIMET)) * bg.enflasyon * carpan);
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
  // Sonuca göre şöhret (büyük savaş): zafer + / yenilgi −; zaferde kanat zaferi oranı üst uca yaklaştırır.
  const savasSohret = sohretSonucuUygula(state, "savas", zafer, zafer ? (sv.kanat_zafer ?? 0) / Math.max(1, (sv.kanat_zafer ?? 0) + (sv.kanat_yenilgi ?? 0)) : Math.random());
  // Oyuncunun sağlığı: yıllık dilimlerden kalan + yenilgi eki.
  {
    const kalanHam = Math.max(0, (sv.saglik_plan ?? 0) - (sv.saglik_uygulanan ?? 0)) + (zafer ? 0 : SAVAS_SAGLIK_YENILGI_EK);
    const toplamKayip = (sv.saglik_kaybi ?? 0) + saglikBedeliUygula(state, kalanHam * ikmalSaglikCarpani(sv.ikmal));
    if (toplamKayip > 0 && state.aktif) uyarilar.push({ kod: "savas_saglik" });
  }
  uyarilar.push({ kod: "savas_sonu", savasSonucu: zafer ? "zafer" : "yenilgi", sohretDegisim: savasSohret });
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
  const hazirlik = hazirlikCek(b, tur);
  const E = barisDusmanGucuYas(state.yas, tur) * rnd(BARIS_DUSMAN_SAPMA[0], BARIS_DUSMAN_SAPMA[1]) * hazirlik;
  b.catisma_bekleyen = { yil: state.yil, tur, baskin, dusmanTur: dtur, dusmanGuc: Math.round(E * 100) / 100, ...(hazirlik > 1 ? { hazirlik: Math.round(hazirlik * 1000) / 1000 } : {}) };
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
  zaferSerisiIsle(b, tur, zafer);
  // Güç farkı kaybı belirler (savaştaki gibi): ezici üstünlükte aralığın alt yarısı, çekişmeli/zayıf durumda üst yarısı. Seçilmiş saldırı/savunma ganimet ve kaybı çarpar (baskında seçim yok).
  const oran = oyuncuEff / dusmanEff;
  const konum = oran < 0.75 ? "ust" : oran >= 1.2 ? "alt" : "tam";
  const sm = k.baskin ? { ganimet: 1, kayip: 1 } : inisiyatif === "saldiri" ? CATISMA_SALDIRI : CATISMA_SAVUNMA;
  catismaIzleyici.fn?.({ tur, zafer, yas: state.yas, oyuncuGuc: guc, dusmanGuc: E, oyuncuEtkin: oyuncuTaraf, dusmanEtkin: dusmanTaraf, tablo: barisDusmanGucuYas(state.yas, tur) });
  const carpan = (1 + sub.ganimet + doktrin.ganimet + (yol.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const brut = zafer ? ganimetBrutTemel(guc, aralikCek(BARIS_GANIMET_ARALIK)) * bg.enflasyon * carpan * sm.ganimet : 0;
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
  // Ordu ve kişi morali çatışma türüne göre farklı etkilenir (haydut hafif, sınır ağır).
  b.moral = clamp(b.moral + CATISMA_ORDU_MORALI[tur][zafer ? "zafer" : "yenilgi"], 0, 100);
  state.mutluluk = clamp(state.mutluluk + CATISMA_KISI_MORALI[tur][zafer ? "zafer" : "yenilgi"], 0, 100);
  if (zafer) madalyaVer(state, b, "haydut", []);
  // Sonuca göre şöhret: güç farkı büyüdükçe (ezici zafer / ezici yenilgi) aralığın üst ucu.
  const sohretDegisim = sohretSonucuUygula(state, tur, zafer, zafer ? (oran - 1) / 0.5 : (1 - oran) / 0.4, k.baskin);
  const saglikKaybi = saglikBedeliUygula(
    state,
    aralikCek(BARIS_SAGLIK[tur][zafer ? "zafer" : "yenilgi"]) + (k.baskin && !zafer ? BASKIN_YENILGI_SAGLIK_EK : 0)
  );
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
    saglik: saglikKaybi,
    sohret: sohretDegisim,
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
    if (!b.savas!.seferberlik) seferberlikUygula(state, "secme", bg); // karar verilmemişse varsayılan (en küçük, ücretsiz çağrı)
    savasYili = savasYiliCoz(state, b, bg);
    catisma = savasYili.catisma;
    // Oyuncunun sağlığı: toplam bedelin yıllık dilimi (savaş sonunda kalan/ek alınır).
    {
      const sv = b.savas!;
      sv.saglik_plan ??= aralikCek(SAVAS_SAGLIK_TOPLAM);
      const dilim = Math.min(sv.saglik_plan / SAVAS_SAGLIK_YIL_BOLEN, Math.max(0, sv.saglik_plan - (sv.saglik_uygulanan ?? 0)));
      sv.saglik_uygulanan = (sv.saglik_uygulanan ?? 0) + dilim;
      sv.saglik_kaybi = (sv.saglik_kaybi ?? 0) + saglikBedeliUygula(state, dilim * ikmalSaglikCarpani(sv.ikmal ?? b.savas_karari?.ikmal));
    }
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
  // Açık görevler farklı karışımlarla şöhret, ordu morali, otorite ve ahlak etkiler (kademe arttıkça büyür; oyuncuya sayı yazılmaz).
  const aktifGorevler = h.gorevler.filter((x) => x.aktif).map((x) => gorevGetir(x.id)).filter((g): g is NonNullable<typeof g> => !!g);
  const gorevSohret = aktifGorevler.reduce((t, g) => t + (g.sohret ?? 0), 0);
  const gorevMoral = aktifGorevler.reduce((t, g) => t + (g.moral ?? 0), 0);
  const gorevOtorite = aktifGorevler.reduce((t, g) => t + (g.otorite ?? 0), 0);
  const gorevAhlak = aktifGorevler.reduce((t, g) => t + (g.ahlak ?? 0), 0);
  const sohretKazanc = gorevSohret + b.kale * KALE_SOHRET;
  if (sohretKazanc !== 0) state.un = clamp(state.un + sohretKazanc, 0, 100);
  // Tehlikeli görevler (haydut avı, akın) komutanın sağlığını da yıpratır.
  for (const g of aktifGorevler) {
    const a = GOREV_SAGLIK[g.id];
    if (a) saglikBedeliUygula(state, aralikCek(a));
  }

  // 3b. Yağma ikmali: halk ezilir (yağmadan gönüllü er gelmez).
  if (savasta && h.yagmaBrut > 0) {
    const yt = IKMAL_TANIMLARI[ikmalId].yagma;
    state.ahlak = clamp(state.ahlak + yt.ahlak, 0, 100);
    state.mutluluk = clamp(state.mutluluk + yt.mutluluk, 0, 100);
    uyarilar.push({ kod: "yagma", tutar: r2(h.yagmaBrut) });
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
  let gorevFirar = 0;
  const yaraliGorevler: string[] = [];
  const yaraliGorevlerEn: string[] = [];
  // Görev kaybı (yalnız barışta; savaşta görev açık değildir): kazandıran görev daha çok kaybettirir — çoğunlukla yaralı, az ölü, firar ara sıra.
  for (const g of h.gorevler) {
    if (!g.aktif || g.er <= 0) continue;
    const tn = gorevGetir(g.id);
    if (!tn) continue;
    const k = tn.kayip;
    gorevYarali += olasilikliYuvarla(g.er * k.yarali * kc);
    gorevOlu += olasilikliYuvarla(g.er * k.olu * kc);
    if (Math.random() < GOREV_FIRAR_YIL_IHTIMALI) gorevFirar += olasilikliYuvarla((g.er * k.firar * clamp(kc, 0.4, 1.2)) / GOREV_FIRAR_YIL_IHTIMALI);
    const ad = gorevAdi(tn, state.cag);
    yaraliGorevler.push(ad.tr);
    yaraliGorevlerEn.push(ad.en);
  }
  const ayar = firarAyarlayici(state, b);
  // Savaş zamanı borç eşikleri (−50 hafif, −200 ağır): moral düşer, firar artar, güç kaybı; ağır eşikte paralı toplu çekilir.
  const borc = odenmeyenCeza(state.para + h.net, bg.enflasyon, savasta);
  if (savasta && borc?.paraliCekilir && b.savas && (b.savas.kiralik_er ?? 0) > 0) {
    uyarilar.push({ kod: "kiralik_cekildi", sayi: b.savas.kiralik_er });
    b.savas.kiralik_er = 0;
    b.savas.kiralik_yarali = 0;
  }
  let oluPct = 0;
  let firarPct = 0;
  if (savasYili) {
    oluPct = savasYili.oluPct;
    firarPct = savasYili.firarPct + ayar.puan + (borc?.firar ?? 0);
  } else {
    firarPct = ayar.tetik ? ayar.puan : 0;
  }
  if (gorevFirar > 0 && !savasta) firarPct += (gorevFirar / Math.max(1, eskiEr)) * 100;
  const tavan = savasta ? savasKayipTavani(state, b) : null;
  const kayip = kayipUygula(state, b, {
    oluPct,
    firarPct,
    ekOlu: gorevOlu,
    ekYarali: gorevYarali,
    ...(savasYili?.yaraliPct != null ? { yaraliPct: savasYili.yaraliPct } : {}),
    // Seferber EK firarı: yalnız savaşın ilk iki yılı, ayrı toplam (%5 / %10); ağır borç eşiğinde ×1,5.
    levyFirarPct: savasta ? (savasYili?.seferFirarPct ?? 0) * (borc?.seferFirarCarpani ?? 1) : 0,
    oluTavan: tavan?.olu,
    firarTavan: savasYili?.bozgun ? undefined : tavan?.firar,
    firarSayma: !!savasYili?.bozgun,
  });
  const olen = kayip.olu;
  const firar = kayip.firar;
  const kayipKaynak = savasta ? "savas" : "gorev";
  const yaralananOlu = kayip.yaralanan - (kayip.yaralananEk ?? 0);
  const yaralananEk = kayip.yaralananEk ?? 0;
  // Barışta görev kaybı her yıl bildirilmez: yalnız belirgin yıllarda (toplam eşiği aşınca) ya da moral/borç firarında ekrana gelir; kayıp her durumda uygulanır.
  const gorevKayipToplam = olen + firar + kayip.yaralanan;
  const gorevBildir =
    savasta ||
    ayar.tetik ||
    (gorevKayipToplam > 0 &&
      (gorevKayipToplam >= Math.max(GOREV_KAYIP_BILDIRIM_ESIGI.mutlak, eskiEr * GOREV_KAYIP_BILDIRIM_ESIGI.oran) || Math.random() < GOREV_KAYIP_BILDIRIM_ESIGI.ihtimal));
  if (gorevBildir) {
    if (firar > 0) uyarilar.push({ kod: "firar", sayi: firar });
    if (olen > 0) uyarilar.push({ kod: "savas_kayip", sayi: olen, kaynak: kayipKaynak, ...(yaralananOlu > 0 ? { yaralanan: yaralananOlu } : {}) });
    else if (yaralananOlu > 0) uyarilar.push({ kod: "savas_kayip", sayi: 0, kaynak: kayipKaynak, yaralanan: yaralananOlu });
    if (yaralananEk > 0) uyarilar.push({ kod: "savas_kayip", sayi: 0, kaynak: "gorev", yaralanan: yaralananEk, kaynakAd: { tr: yaraliGorevler.join(", "), en: yaraliGorevlerEn.join(", ") } });
  }
  // Savaş Günü pencere onayında zaten uygulanan karar savaşı kaybı yıl bildiriminde de görünür (ikinci kez uygulanmaz).
  if (savasYili?.faz === "karar" && b.savas?.gun_sonucu && b.savas.gun_cozuldu_yil === state.yil) {
    const gs = b.savas.gun_sonucu;
    if (gs.firar > 0) uyarilar.push({ kod: "firar", sayi: gs.firar });
    if (gs.olu > 0 || gs.yarali > 0) uyarilar.push({ kod: "savas_kayip", sayi: gs.olu, kaynak: "savas", ...(gs.yarali > 0 ? { yaralanan: gs.yarali } : {}) });
  }
  if (iyilesen > 0) uyarilar.push({ kod: "yarali_iyilesti", sayi: iyilesen });
  if (h.limitAsimGideri > 0) uyarilar.push({ kod: "limit_asimi", sayi: limitAsimEri(state) });

  // 6. (Kaldırıldı) Rakip komutan saldırıları/hırsızlık: Asker'de rakip yok; tehdit yalnız düşman çatışması ve savaştır.

  // 7. Büyüme: devşirme subayı, büro, şöhret, doktrin, yatkınlık (savaşta çarpan yok; vebada kısılır).
  const sohret = sohretMusteriSayisi(state.un);
  let buyume =
    BARIS_YILLIK_ER +
    subayToplami(state).devsirme +
    DEVSIRME_BUROSU_ER[clamp(yatirimKademesi(state, "devsirme"), 0, DEVSIRME_BUROSU_ER.length - 1)] +
    Math.max(0, sohret) +
    doktrin.devsirme +
    yatkinlikMusteriBuyumesi(state);
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
  // Talim: politikanın kazancı (kalite çarpanıyla; moral dipteyken yarıya iner, tavana kadar) − doğal unutma. Bakım yoksa talim kendiliğinden düşer.
  const talimKazanc = talimT.delta > 0 ? talimT.delta * kaliteKatsayi(KALITE_TALIM_CARPANI) * (b.moral < MORAL_DIP_ESIGI ? 0.5 : 1) : 0;
  const talimArti = talimKazanc > 0 ? Math.max(0, Math.min(talimT.tavan, b.talim + talimKazanc) - b.talim) : 0;
  b.talim = clamp(b.talim + talimArti - TALIM_DOGAL_DUSUS, 0, 100);
  if (catisma) b.talim = clamp(b.talim + (catisma.kanatZafer ? TALIM_SAVAS_ZAFER : TALIM_SAVAS_YENILGI), 0, 100);

  // 9. Moral: yıllık etkenler + bir kerelik olaylar; nötr 50'den başlar, bakım yapılmazsa zamanla düşer.
  let moral = GANIMET_PAYI_TANIMLARI[b.ganimet_payi].moral + TON_TANIMLARI[b.ton].moral + talimT.moral + (doktrin.moral + (yol.moral ?? 0));
  moral += savasta ? MORAL_SAVAS_YILLIK : MORAL_BARIS_YILLIK;
  moral += gorevMoral;
  if (savasta && h.yagmaBrut > 0) moral += IKMAL_TANIMLARI[ikmalId].yagma.moral; // yağma türü: sert ordu morali artırır, yumuşak düşürür
  moral += kaliteKatsayi(KALITE_MORAL);
  if (savasta) moral += emirGetir(b.savas?.emir)?.moral ?? 0;
  const donem = state.ulke.donem?.tur;
  if (donem === "kitlik") moral += MORAL_KITLIK_YILLIK;
  else if (donem === "bolluk") moral += MORAL_BOLLUK_YILLIK;
  if (eskiEr > 0 && (olen + firar) / eskiEr > MORAL_YUKSEK_KAYIP_ESIGI) moral += MORAL_YUKSEK_KAYIP;
  moral += clamp(state.isletme?.yatirimlar.revir ?? 0, 0, 4) * REVIR_MORAL_KADEME;
  if (borc) moral += borc.moral;
  if (catisma) {
    moral += catisma.kanatZafer ? MORAL_ZAFER : catisma.oran < 0.75 ? MORAL_KANAT_BOZGUN : -3;
    if (!catisma.genelZafer) moral += MORAL_YENILGI;
  }
  // Tek yıllık toplam düşüş sınırlı: art arda bozgun + yenilgi + yıllık yük morali bir yılda dibe çakmasın.
  moral = Math.max(moral, -MORAL_YILLIK_TABAN);
  b.moral = clamp(b.moral + moral, 0, 100);
  // Doğal düşüşün (MORAL_BARIS_YILLIK / MORAL_SAVAS_YILLIK) yanında yalnız dipteki moral toparlanır: ordu moral dibinde kalıp eriyip gitmesin.
  if (b.moral < MORAL_DIP_ESIGI) b.moral = clamp(b.moral + MORAL_DIP_TOPARLANMA, 0, 100);

  // 10. Sertlik, ahlak, otorite, aşırılık.
  const gorevSertlik = h.gorevler.filter((g) => g.aktif).reduce((t, g) => t + (gorevSertlikDegeri(g.id)), 0);
  b.sertlik = clamp(b.sertlik + TON_TANIMLARI[b.ton].sertlik + gorevSertlik + doktrin.sertlik + (yol.sertlik ?? 0) + (savasta ? IKMAL_TANIMLARI[ikmalId].sertlik : 0) - SERTLIK_DOGAL_SONUM, 0, 100);
  state.ahlak = clamp(state.ahlak + doktrin.ahlak + (yol.ahlak ?? 0) + gorevAhlak, 0, 100);
  state.yonetim_iliski = clamp((state.yonetim_iliski ?? 0) + doktrin.otorite + (yol.otorite ?? 0) + gorevOtorite - b.sertlik * SERTLIK_OTORITE_KATSAYISI, 0, 100);
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
function gorevSertlikDegeri(id: string): number {
  return gorevGetir(id)?.sertlik ?? 0;
}
