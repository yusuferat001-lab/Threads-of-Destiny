import type { BirlikArazi, BirlikDurumu, BirlikEsirKarari, BirlikKalite, BirlikSavasDurumu, BirlikSeferberlik, BirlikTur, CharacterState, IsletmeDokum, IsletmeUyari } from "../types";
import {
  ARAZI_DEGISIM_ORANI,
  ARAZI_SIRASI,
  ARAZI_TERCIH_IHTIMALI,
  ASIRI_COOLDOWN_YIL,
  ASIRI_ESIK,
  ASKER_FIZIKSEL,
  ASKER_PAZAR_HEDEF,
  BARIS_CATISMALARI,
  BARIS_CATISMA_ARALIK,
  BARIS_CATISMA_ILK_YIL,
  BARIS_KAYIP_YENILGI,
  BARIS_KAYIP_ZAFER,
  BARIS_MORAL_YENILGI,
  BARIS_MORAL_ZAFER,
  BARIS_TALIM_YENILGI,
  BARIS_TALIM_ZAFER,
  BARIS_YENILGI_GANIMET,
  DEVLET_PAYI,
  GANIMET_GUC_BIRIMI,
  ASKER_PAZAR_YAKINSAMA,
  ASKER_SALDIRI_AGIRLIKLARI,
  ASKER_SALDIRI_HASARLARI,
  BOLGE_ARAZI_AGIRLIGI,
  DEVSIRME_BUROSU_ER,
  DUSMAN_ORAN,
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
  FIRAR_ZAYIF_ORAN_EKI,
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
  MORAL_TERFI,
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
  SERTLIK_FIRAR_KATSAYISI,
  SERTLIK_OTORITE_KATSAYISI,
  ASKER_PAZAR_DONEM_CARPANI,
  TALIM_SAVAS_YENILGI,
  TALIM_SAVAS_ZAFER,
  TALIM_TANIMLARI,
  TON_TANIMLARI,
  TUR_TANIMLARI,
  ZAFER_GONULLU,
  ZAR_BOLEN,
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
  askerGucleri,
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
  kaliteCikar,
  kayipCarpani,
  komutaLimiti,
  r2,
  rutbeIndeksi,
  sertlikGelirCarpani,
  turPaylari,
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
  const limit = sec.limitsiz ? 300 : komutaLimiti(state);
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
  let eklenen = 0;
  if (t.kalite === "dusuk") eklenen = yeniErEkle(state, istenen, bg, { kalite: "dusuk", bedava: true, talim: t.talim }).eklenen;
  else if (t.kalite === "yuksek") eklenen = yeniErEkle(state, istenen, bg, { kalite: "yuksek", bedava: true, talim: t.talim }).eklenen;
  else {
    const orta = Math.round(istenen * 0.4);
    eklenen = yeniErEkle(state, orta, bg, { kalite: "orta", bedava: true, talim: t.talim }).eklenen;
    eklenen += yeniErEkle(state, istenen - orta, bg, { kalite: "dusuk", bedava: true, talim: t.talim }).eklenen;
  }
  sv.seferberlik_er += eklenen;
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
  const devlet = Math.round(esir * 0.2);
  const kalan = Math.max(0, esir - devlet);
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

// ── Firar ───────────────────────────────────────────────────────────────────
export function firarOrani(state: CharacterState, b: BirlikDurumu, zayifOran: boolean, ilkYilGenelCagri: boolean): number {
  const doktrin = doktrinToplami(b.doktrinler);
  const yol = yolEtkisi(state);
  let oran = 0;
  if (b.moral < FIRAR_MORAL_ESIGI) oran += (FIRAR_MORAL_ESIGI - b.moral) * FIRAR_MORAL_KATSAYI;
  if (b.erzak_oran < 0.7) oran += FIRAR_ERZAK_EKI;
  if (zayifOran) oran += FIRAR_ZAYIF_ORAN_EKI;
  oran += b.sertlik * SERTLIK_FIRAR_KATSAYISI;
  oran += doktrin.firar + (yol.firar ?? 0);
  if (ilkYilGenelCagri) oran *= 1.5;
  oran += aranmaMusteriKaybi(state.suc_seviyesi);
  return Math.max(0, oran) * clamp(kayipCarpani(state), 0.4, 1.2);
}

// ── Savaş çatışması (kanat + genel) ─────────────────────────────────────────
export interface CatismaSonucu {
  kanatZafer: boolean;
  genelZafer: boolean;
  oran: number;
  olen: number;
  arazi: BirlikArazi;
  inisiyatif: "saldiri" | "savunma";
}

function catismaCoz(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami): CatismaSonucu {
  const sv = b.savas!;
  const karar = b.savas_karari;
  const rutbe = rutbeIndeksi(state);
  // Arazi: tercih rütbeye bağlı ihtimalle gerçekleşir; olmazsa bölge zarı (önceki arazi %60 korunur).
  let arazi: BirlikArazi;
  if (karar?.arazi && Math.random() < ARAZI_TERCIH_IHTIMALI[rutbe]) arazi = karar.arazi;
  else if (Math.random() < ARAZI_DEGISIM_ORANI) arazi = bolgeAraziSec(state.bolge);
  else arazi = sv.arazi;
  const inisiyatif = (karar?.inisiyatif ?? karar?.inisiyatif_zorunlu ?? "savunma") as "saldiri" | "savunma";
  sv.arazi = arazi;
  sv.inisiyatif = inisiyatif;
  const ctx = { enflasyon: bg.enflasyon, savas: { arazi, dusmanTur: sv.dusman_tur, inisiyatif } };
  const d = gucHesapla(state, ctx);
  const oyuncuG = inisiyatif === "saldiri" ? d.saldiri : d.savunma;
  const g = askerGucleri(state);
  const N = Math.max(1, g.rakip + g.diger + d.guc);
  const p = d.guc / N;
  const D = N * sv.dusman_orani;
  const rol = ROL_TANIMLARI[karar?.rol ?? "ana"];
  const oyuncuEff = oyuncuG * (1 + (d20() - 10.5) / ZAR_BOLEN + b.zar_bonusu + rol.zar);
  const dusmanEff = Math.max(1e-6, D * p * (1 + (d20() - 10.5) / ZAR_BOLEN));
  const R = oyuncuEff / dusmanEff;
  const kanatZafer = R >= 1;
  const genelZafer = N * (1 + (d20() - 10.5) / ZAR_BOLEN) >= D * (1 + (d20() - 10.5) / ZAR_BOLEN);
  const er = erSayisi(state);
  const kayipOrani = (kanatZafer ? 0.04 : 0.1) * rol.kayip * clamp(1 / R, 0.6, 1.6) * kayipCarpani(state);
  const olen = olasilikliYuvarla(er * kayipOrani);
  if (kanatZafer) sv.kanat_zafer += 1;
  else sv.kanat_yenilgi += 1;
  if (genelZafer) sv.genel_zafer += 1;
  else sv.genel_yenilgi += 1;
  return { kanatZafer, genelZafer, oran: R, olen, arazi, inisiyatif };
}

function savasiBitir(state: CharacterState, b: BirlikDurumu, bg: IsletmeBaglami, uyarilar: IsletmeUyari[]): void {
  const sv = b.savas!;
  const zafer = sv.genel_zafer >= sv.genel_yenilgi;
  if (sv.seferberlik_er > 0) {
    const kalan = Math.round(sv.seferberlik_er * (zafer ? SEFERBERLIK_KALMA_ZAFER : SEFERBERLIK_KALMA_YENILGI));
    const terhisIstenen = Math.max(0, sv.seferberlik_er - kalan);
    // Savaşta ölen/kaçan erler terhis sayısından düşer: ordu savaş öncesi sayısının altına, çekirdek kadronun altına inmez.
    const terhis = Math.min(terhisIstenen, Math.max(0, erSayisi(state) - Math.max(MIN_CEKIRDEK_ER, sv.er_once ?? 0)));
    const cikan = kaliteCikar(b, terhis);
    state.meslek_musteri = Math.max(0, erSayisi(state) - cikan);
    if (cikan > 0) uyarilar.push({ kod: "seferberlik_terhis", sayi: cikan });
  }
  if (zafer) {
    const gonullu = Math.round(erSayisi(state) * rnd(ZAFER_GONULLU[0], ZAFER_GONULLU[1]));
    yeniErEkle(state, gonullu, bg, { kalite: "dusuk", bedava: true, talim: 0 });
  }
  uyarilar.push({ kod: "savas_sonu", savasSonucu: zafer ? "zafer" : "yenilgi" });
  b.savas = null;
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
  olen: number;
}

/** Barış çatışması takvimi: savaşta kapanır, barışta yoksa kurulur. Vade geldiyse true döner ve takvimi yeniler. */
function barisCatismaVadesi(state: CharacterState, b: BirlikDurumu, savasta: boolean): boolean {
  if (savasta) {
    b.baris_catisma_yili = null;
    return false;
  }
  const ilkYil = (state.isletme?.baslangic_yili ?? state.yil) + BARIS_CATISMA_ILK_YIL;
  if (b.baris_catisma_yili == null) {
    b.baris_catisma_yili = Math.max(ilkYil, state.yil + 1) + Math.floor(Math.random() * 3);
    return false;
  }
  if (state.yil < b.baris_catisma_yili || state.yil < ilkYil) return false;
  const [mn, mx] = BARIS_CATISMA_ARALIK;
  b.baris_catisma_yili = state.yil + mn + Math.floor(Math.random() * (mx - mn + 1));
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
  const dusman = guc * rnd(t.dusman[0], t.dusman[1]);
  const oyuncuEff = guc * (1 + (d20() - 10.5) / ZAR_BOLEN + b.zar_bonusu);
  const dusmanEff = Math.max(1e-6, dusman * (1 + (d20() - 10.5) / ZAR_BOLEN));
  const R = oyuncuEff / dusmanEff;
  const zafer = R >= 1;
  const carpan = (1 + doktrin.ganimet + (yol.ganimet ?? 0)) * sertlikGelirCarpani(b) * bg.satisCarpani;
  const brut = guc * GANIMET_GUC_BIRIMI * t.ganimet * (zafer ? 1 : BARIS_YENILGI_GANIMET) * bg.enflasyon * carpan;
  const devlet = brut * DEVLET_PAYI;
  const erPayi = (brut - devlet) * GANIMET_PAYI_TANIMLARI[b.ganimet_payi].oran;
  const net = brut - devlet - erPayi;
  const esir = zafer ? olasilikliYuvarla(guc * t.esir) : 0;
  const er = erSayisi(state);
  const olen = olasilikliYuvarla(er * (zafer ? BARIS_KAYIP_ZAFER : BARIS_KAYIP_YENILGI) * clamp(1 / R, 0.6, 1.6) * kayipCarpani(state));
  b.talim = clamp(b.talim + (zafer ? BARIS_TALIM_ZAFER : BARIS_TALIM_YENILGI), 0, 100);
  return { tur, zafer, brut: r2(brut), devlet: r2(devlet), erPayi: r2(erPayi), net: r2(net), esir, olen };
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

  // 1. Erzak: ikmal kararı + olay etkisi; yıl sonunda tekrar 1'e döner.
  const karar = b.savas_karari && b.savas_karari.adim >= b.savas_karari.adimlar.length ? b.savas_karari : null;
  const ikmal = IKMAL_TANIMLARI[karar?.ikmal ?? "yeterli"];
  b.erzak_oran = clamp(b.erzak_oran + (savasta ? ikmal.erzakOran : 0), 0, 1);

  // 2. Savaş: çatışma / savaş sonu.
  let catisma: CatismaSonucu | null = null;
  let ganimetCarpani = 1;
  let ilkYilGenelCagri = false;
  if (savasta) {
    if (!b.savas) savasBaslat(state);
    if (!b.savas!.seferberlik) seferberlikUygula(state, "dengeli", bg); // karar verilmemişse varsayılan
    ilkYilGenelCagri = b.savas!.seferberlik === "genel" && state.yil - b.savas!.baslangic_yili <= 1;
    catisma = catismaCoz(state, b, bg);
    ganimetCarpani = catisma.genelZafer ? 1.3 : 0.3;
  } else if (b.savas) {
    savasiBitir(state, b, bg, uyarilar);
  }

  // 2b. Barış çatışması (savaş dışında 3–5 yılda bir): güçle orantılı ganimet.
  const baris = barisCatismaVadesi(state, b, savasta) ? barisCatismasiCoz(state, b, bg) : null;
  if (baris) {
    uyarilar.push({ kod: "baris_catisma", catismaTur: baris.tur, savasSonucu: baris.zafer ? "zafer" : "yenilgi", tutar: baris.net, sayi: baris.esir });
  }

  // 3. Gelir / gider.
  const h = birlikHesapla(state, bg, { ganimetCarpani });

  // 4. Esir.
  const esirSayisi = olasilikliYuvarla(h.esirBeklenen) + (baris?.esir ?? 0);
  const esirKarari: BirlikEsirKarari = (state.rutbe_seviye ?? 1) >= 3 ? karar?.esir ?? "karma" : "karma";
  const esir = esirSayisi > 0 ? esirleriIsle(state, b, esirSayisi, esirKarari, bg) : null;
  if (esir && esirSayisi > 0) uyarilar.push({ kod: "esir", sayi: esirSayisi });

  // 5. Kayıplar: görev + çatışma + firar.
  let olen = (catisma?.olen ?? 0) + (baris?.olen ?? 0);
  const kc = kayipCarpani(state);
  for (const g of h.gorevler) {
    if (!g.aktif || g.er <= 0) continue;
    const t = GOREV_KAYIP(g.id, savasta);
    olen += olasilikliYuvarla(g.er * t * kc);
  }
  const zayif = !!catisma && catisma.oran < 0.8;
  const firar = olasilikliYuvarla(erSayisi(state) * firarOrani(state, b, zayif, ilkYilGenelCagri));
  // Çekirdek kadro: firar ve kayıplar orduyu tamamen silmez (en az MIN_CEKIRDEK_ER er kalır).
  const toplamKayip = Math.min(Math.max(0, erSayisi(state) - MIN_CEKIRDEK_ER), olen + firar);
  const cikan = kaliteCikar(b, toplamKayip);
  state.meslek_musteri = Math.max(0, erSayisi(state) - cikan);
  if (firar > 0) uyarilar.push({ kod: "firar", sayi: firar });

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
  if (talimT.delta > 0) b.talim = clamp(Math.max(b.talim, Math.min(talimT.tavan, b.talim + talimT.delta)), 0, 100);
  else b.talim = clamp(b.talim + talimT.delta, 0, 100);
  if (catisma) b.talim = clamp(b.talim + (catisma.kanatZafer ? TALIM_SAVAS_ZAFER : TALIM_SAVAS_YENILGI), 0, 100);

  // 9. Moral: yıllık etkenler + bir kerelik olaylar + 60'a yönelim.
  let moral = GANIMET_PAYI_TANIMLARI[b.ganimet_payi].moral + TON_TANIMLARI[b.ton].moral + talimT.moral + (doktrin.moral + (yol.moral ?? 0));
  moral += savasta ? MORAL_SAVAS_YILLIK : MORAL_BARIS_YILLIK;
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
  const cekim = Math.min(Math.abs(fark), Math.min(MORAL_YONELIM_TAVAN, Math.max(MORAL_YONELIM, Math.abs(fark) * 0.1)));
  b.moral = clamp(b.moral + Math.sign(fark) * cekim, 0, 100);

  // 10. Sertlik, ahlak, otorite, aşırılık.
  const gorevSertlik = h.gorevler.filter((g) => g.aktif).reduce((t, g) => t + (gorevSertlikDegeri(g.id)), 0);
  b.sertlik = clamp(b.sertlik + TON_TANIMLARI[b.ton].sertlik + gorevSertlik + doktrin.sertlik + (yol.sertlik ?? 0) + (karar ? IKMAL_TANIMLARI[karar.ikmal].sertlik : 0) - SERTLIK_DOGAL_SONUM, 0, 100);
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
  const barisNet = baris?.net ?? 0;
  const net = r2(h.net + barisNet + esirGeliri - nakitHasar - ekstraGider - yeniErMaliyet);
  const yeniEr = erSayisi(state);
  const dokum: IsletmeDokum = {
    yil: state.yil,
    satis: r2(h.toplamGelir + barisNet + esirGeliri),
    alim: r2(h.gorevMasrafi + h.erMasrafi + h.erzak + h.talimMasrafi),
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
      ganimetPara: r2(h.ganimetBrut + (baris?.brut ?? 0)),
      devletPayi: r2(h.devletPayi + (baris?.devlet ?? 0)),
      erPayi: r2(h.erPayi + (baris?.erPayi ?? 0)),
      erMasrafi: r2(h.erMasrafi),
      erzak: r2(h.erzak),
      gorevMasrafi: r2(h.gorevMasrafi),
      techizatBakimi: r2(h.techizatBakim),
      guc: Math.round(b.guc),
      moral: Math.round(b.moral),
      talim: Math.round(b.talim),
      firar,
      olen,
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
