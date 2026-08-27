import { randomUUID } from "crypto";
import { CharacterState, Cag, Kategori, SonucEtkisi, YatkinlikKaynagi, KisilikEksenleri, UlkeKrizi, HayatAmaci, MulkTuru, SahipOlunanEsya } from "../types";
import { AILELER, AileTanimi } from "../data/aileler";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import { rutbeTanimiGetir, RutbeEsigi, RutbeTanimi } from "../data/rutbeler";
import { YerlesimTanimi, yerlesimGetir, yerlesimIdByAd } from "../data/yerlesimler";
import { konutGetir, VARSAYILAN_KONUT_ID, TASINMA_MALIYETI } from "../data/konutlar";
import { yasamSecenegiGetir, VARSAYILAN_YASAM_SECIMI_ID } from "../data/yasamSecenekleri";
import { rastgeleIkiIsimSec, rastgeleBirIsimSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { liderGetir, komsuGucSec } from "../data/liderler";
import { bolgeIstatistigiGetir } from "../data/bolgeIstatistikleri";
import {
  SAVAS_HABERLERI,
  VEBA_HABERLERI,
  IYI_EKONOMI_HABERLERI,
  KOTU_EKONOMI_HABERLERI,
  KITLIK_HABERLERI,
  ISYAN_HABERLERI,
  ALTIN_CAG_HABERLERI,
  HIZIP_HABERLERI,
  SAKIN_HABERLERI,
  YEREL_HABERLER,
  YEREL_HABER_SANSI,
} from "../data/yerelHaberler";
import { tarihiSavasKontrol, gelecekSavasKontrol } from "../data/tarihiSavaslar";
import { mulkTanimiGetir } from "../data/mulkler";
import { MagazaEsyasiTanimi, magazaEsyasiTanimiGetir } from "../data/magazaEsyalari";

const KATEGORILER: Kategori[] = ["savas", "ticaret", "din", "siyaset", "saglik", "sosyal"];

/** Meslek adlarının hangi yatkınlık kategorisine karşılık geldiği. */
export const MESLEK_KATEGORI: Record<string, Kategori> = {
  Asker: "savas",
  Tüccar: "ticaret",
  "Din Adamı": "din",
};

/**
 * Yatkınlıkları kişilik özelliklerinden ve aile geçmişinden hesaplar; her
 * kategoriye küçük bir rastgele oynama (-5..+5) eklenir. Kaynak listesi
 * oyuncuya "neden bu mesleğe yatkınsın" açıklaması için döndürülür.
 */
function yatkinlikHesapla(
  kisilik: [string, string],
  aile: AileTanimi,
  yerlesim: YerlesimTanimi
): { yatkinliklar: Record<Kategori, number>; kaynaklar: YatkinlikKaynagi[] } {
  const yatkinliklar = {} as Record<Kategori, number>;
  for (const kategori of KATEGORILER) {
    yatkinliklar[kategori] = Math.floor(Math.random() * 11) - 5; // -5..+5 rastgele oynama
  }

  const kaynaklar: YatkinlikKaynagi[] = [];

  for (const ozellikAdi of kisilik) {
    const ozellik = kisilikGetir(ozellikAdi);
    if (!ozellik) continue;
    for (const [kategori, deger] of Object.entries(ozellik.etkiler) as [Kategori, number][]) {
      yatkinliklar[kategori] += deger;
      kaynaklar.push({ kaynak: ozellikAdi, kategori, deger });
    }
  }

  if (aile.yatkinlikEtkisi) {
    for (const [kategori, deger] of Object.entries(aile.yatkinlikEtkisi) as [Kategori, number][]) {
      yatkinliklar[kategori] += deger;
      kaynaklar.push({ kaynak: aile.ad, kategori, deger });
    }
  }

  if (yerlesim.yatkinlikEtkisi) {
    for (const [kategori, deger] of Object.entries(yerlesim.yatkinlikEtkisi) as [Kategori, number][]) {
      yatkinliklar[kategori] += deger;
      kaynaklar.push({ kaynak: yerlesim.ad, kategori, deger });
    }
  }

  for (const kategori of KATEGORILER) {
    yatkinliklar[kategori] = clamp(yatkinliklar[kategori], -30, 30);
  }

  return { yatkinliklar, kaynaklar };
}

const FEVRILIK_ETKI: Record<string, number> = {
  Sinirli: 20,
  Hırslı: 12,
  Rekabetçi: 10,
  Cesur: 10,
  "Sivri Dilli": 8,
  Sakin: -20,
  Vicdanlı: -8,
  İçedönük: -8,
};

const MERHAMET_ETKI: Record<string, number> = {
  "Yumuşak Başlı": 18,
  Vicdanlı: 15,
  Umutlu: 8,
  Hüzünlü: 6,
  Kibirli: -15,
  Alaycı: -12,
  "Sivri Dilli": -10,
  Hırslı: -8,
  Rekabetçi: -6,
};

/**
 * İki uçlu kişilik eksenlerini (fevrilik, merhamet) üretir: rastgele bir
 * taban üzerine, mevcut kişilik özellikleriyle tematik olarak tutarlı bir
 * yön verilir. 16 sabit özellik sistemine ek, ayrı bir katman.
 */
function kisilikEksenleriUret(kisilik: [string, string]): KisilikEksenleri {
  let fevrilik = 50 + Math.floor(Math.random() * 21) - 10;
  let merhamet = 50 + Math.floor(Math.random() * 21) - 10;
  for (const ozellik of kisilik) {
    fevrilik += FEVRILIK_ETKI[ozellik] ?? 0;
    merhamet += MERHAMET_ETKI[ozellik] ?? 0;
  }
  return {
    fevrilik: clamp(fevrilik, 0, 100),
    merhamet: clamp(merhamet, 0, 100),
  };
}

const HUKUMDAR_DEGISIM_HABERLERI: ((eski: string, yeni: string) => string)[] = [
  (eski, yeni) => `${eski} artık hayatta değil; yerine ${yeni} geçti. Halk yeni döneme alışmaya çalışıyor.`,
  (eski, yeni) => `${eski}'in dönemi kapandı, ${yeni} başa geçti. Vergilerin artacağı konuşuluyor.`,
  (eski, yeni) => `Uzun süredir başta olan ${eski} artık yok; ${yeni} yönetimi devraldı. Sarayda el değişimleri bekleniyor.`,
  (eski, yeni) => `${eski} sona erdi, ${yeni} yeni hükümdar oldu. Şehirde tedirgin bir bekleyiş var.`,
];

/** Bir turda hükümdar değiştiyse (ilerletYas sırasında) bunu duyuran bir haber cümlesi üretir. */
export function hukumdarDegisimHaberiUret(eskiHukumdar: string, yeniHukumdar: string): string {
  const sablon = HUKUMDAR_DEGISIM_HABERLERI[Math.floor(Math.random() * HUKUMDAR_DEGISIM_HABERLERI.length)];
  return sablon(eskiHukumdar, yeniHukumdar);
}

/** Şehir/ülke ile ilgili kısa, güncel haber cümleleri üretir; hükümdar zaten Banner'da gösterildiği için burada tekrarlanmaz. */
export function haberleriUret(state: CharacterState): string[] {
  const haberler: string[] = [];
  if (state.ulke.savasta) {
    const rakip = tarihiSavasKontrol(state.bolge, state.yil, state.cag);
    haberler.push(sec(SAVAS_HABERLERI)(state.bolge, rakip));
  }
  if (state.ulke.vebada) haberler.push(sec(VEBA_HABERLERI));
  if (state.ulke.ekonomi === "iyi") haberler.push(sec(IYI_EKONOMI_HABERLERI));
  if (state.ulke.ekonomi === "kotu") haberler.push(sec(KOTU_EKONOMI_HABERLERI));
  if (state.ulke.kriz?.tur === "kitlik") haberler.push(sec(KITLIK_HABERLERI));
  if (state.ulke.kriz?.tur === "isyan") haberler.push(sec(ISYAN_HABERLERI));
  if (state.ulke.kriz?.tur === "altin_cag") haberler.push(sec(ALTIN_CAG_HABERLERI));
  if (state.hizip) haberler.push(sec(HIZIP_HABERLERI)(state.hizip));
  if (haberler.length === 0) haberler.push(sec(SAKIN_HABERLERI)(state.bolge));

  const yerelHavuz = YEREL_HABERLER[`${state.cag}|${state.bolge}`];
  if (yerelHavuz && yerelHavuz.length > 0 && Math.random() < YEREL_HABER_SANSI) {
    haberler.push(sec(yerelHavuz));
  }
  return haberler;
}

export const BOLGELER_BY_CAG: Record<Cag, string[]> = {
  "Orta Çağ": ["Fransa", "Kutsal Roma", "Bizans", "Selçuklu", "Eyyubiler"],
  "Sanayi Devrimi": ["İngiltere", "Fransa", "Osmanlı", "Rusya"],
};

const YIL_ARALIGI: Record<Cag, [number, number]> = {
  "Orta Çağ": [1050, 1260],
  "Sanayi Devrimi": [1800, 1870],
};

const DIN_KULTUR_BY_BOLGE: Record<string, string> = {
  Fransa: "Katolik",
  "Kutsal Roma": "Katolik",
  Bizans: "Ortodoks",
  Selçuklu: "Sünni İslam",
  Eyyubiler: "Sünni İslam",
  İngiltere: "Anglikan",
  Osmanlı: "Sünni İslam",
  Rusya: "Ortodoks",
};

const PARA_BIRIMI: Record<string, string> = {
  "Orta Çağ|Fransa": "Livre",
  "Orta Çağ|Kutsal Roma": "Mark",
  "Orta Çağ|Bizans": "Hiperpiron",
  "Orta Çağ|Selçuklu": "Dirhem",
  "Orta Çağ|Eyyubiler": "Dinar",
  "Sanayi Devrimi|İngiltere": "Sterlin",
  "Sanayi Devrimi|Fransa": "Frank",
  "Sanayi Devrimi|Osmanlı": "Kuruş",
  "Sanayi Devrimi|Rusya": "Ruble",
};

function paraBirimiGetir(cag: Cag, bolge: string): string {
  return PARA_BIRIMI[`${cag}|${bolge}`] ?? "Akçe";
}

// Taban değerler (Asker 9 / Tüccar 10 / Din Adamı 8) üzerine genel bir %10 maaş
// artışı — tüm meslek ve rütbelerde orantılı olarak yansır (rütbe zaten un/tur_sayisi
// üzerinden bu formüle giriyor, ayrı bir çarpana gerek yok).
const TEMEL_MAAS: Record<string, number> = { Asker: 9.9, Tüccar: 11, "Din Adamı": 8.8 };

/** Kökenden ve olaylardan gelen kalıcı maaş çarpanı; state üzerinde etiket olarak taşınır. */
const MAAS_CARPANI_ETIKET_ONEKI = "maas_carpani:";

function maasCarpaniGetir(state: CharacterState): number {
  const etiket = state.etiketler.find((e) => e.startsWith(MAAS_CARPANI_ETIKET_ONEKI));
  if (!etiket) return 1;
  const deger = Number(etiket.slice(MAAS_CARPANI_ETIKET_ONEKI.length));
  return Number.isFinite(deger) && deger > 0 ? deger : 1;
}

export function maasCarpaniUygula(state: CharacterState, carpan: number): void {
  const yeni = maasCarpaniGetir(state) * carpan;
  state.etiketler = state.etiketler.filter((e) => !e.startsWith(MAAS_CARPANI_ETIKET_ONEKI));
  state.etiketler.push(`${MAAS_CARPANI_ETIKET_ONEKI}${yeni.toFixed(3)}`);
}

/**
 * Zamanla fiyatların ve maaşların birlikte büyümesini sağlayan enflasyon
 * çarpanı: karakterin yaratıldığı yıldan bu yana geçen GERÇEK yıl sayısına
 * göre, çağa özel bir oranla bileşik büyür — Orta Çağ'da yılda %1, Sanayi
 * Devrimi'nde yılda %3 (dönemin ekonomik hızlanmasını yansıtır). Hem maaş
 * hem yaşam/konut giderleri buna göre şişer, böylece reel denge bozulmaz ama
 * uzun oyunlarda nominal sayılar zamanla anlamlı şekilde büyür.
 */
const ENFLASYON_ORANI_YILLIK: Record<Cag, number> = {
  "Orta Çağ": 0.01,
  "Sanayi Devrimi": 0.03,
};

export function enflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.01;
  return Math.pow(1 + oran, gecenYil);
}

/** Finans ekranında gösterilecek toplam enflasyon yüzdesi (oyunun başından bu yana). */
export function enflasyonYuzdesiHesapla(state: CharacterState): number {
  return Math.round((enflasyonCarpani(state) - 1) * 100);
}

/** Para tutarlarını 2 ondalık basamağa yuvarlar; sağlık/mutluluk/ün/ahlak gibi istatistikler bundan etkilenmez, onlar hep tam sayı kalır. */
export function paraYuvarla(x: number): number {
  return Math.round(x * 100) / 100;
}

/**
 * En üst rütbeye (3) ulaşan karakterler için açılan, üst sınırı olmayan ikinci
 * ilerleme ekseni: "şehir yönetimi". Her meslek için 4 isimli kademe var,
 * ardından unvan sayısal olarak sonsuza kadar büyümeye devam eder — gelişimin
 * hiçbir zaman "bitmiş" hissettirmemesi için.
 */
const SEHIR_YONETIM_UNVANLARI: Record<string, string[]> = {
  Asker: ["Bölge Komutanı", "Ordu Generali", "Savaş Konseyi Üyesi", "Krallığın Kalkanı"],
  Tüccar: ["Ticaret Baronu", "Lonca Reisi", "Şehrin Hazine Nazırı", "Ticaret İmparatoru"],
  "Din Adamı": ["Piskopos Vekili", "Baş Piskopos", "Kutsal Meclis Üyesi", "Ruhani Önder"],
};

export function sehirYonetimUnvanGetir(meslek: string, seviye: number): string | null {
  if (seviye <= 0) return null;
  const liste = SEHIR_YONETIM_UNVANLARI[meslek];
  if (!liste) return null;
  if (seviye <= liste.length) return liste[seviye - 1];
  return `${liste[liste.length - 1]} (Seviye ${seviye})`;
}

/** Şehir yönetimi seviyesindeki her kademe maaşa kalıcı olarak +%8 katar; üst sınır yok. */
const SEHIR_YONETIM_MAAS_CARPANI_ADIM = 0.08;

export function sehirYonetimMaasCarpani(seviye: number): number {
  return 1 + Math.max(0, seviye) * SEHIR_YONETIM_MAAS_CARPANI_ADIM;
}

/** state.sehir_yonetim_unvan'ı güncel seviye+mesleğe göre yeniden hesaplar. */
export function sehirYonetimGuncelle(state: CharacterState): void {
  state.sehir_yonetim_unvan = sehirYonetimUnvanGetir(state.meslek, state.sehir_yonetim_seviyesi);
}

export function hesaplaMaasYillik(state: CharacterState): number {
  const temel = TEMEL_MAAS[state.meslek] ?? 6;
  const yildizSeviyesi = state.un / 20; // 0-5
  const kariyerYili = Math.min(state.tur_sayisi, 20);
  const durumCarpani = state.durumlar.reduce((c, d) => c * (d.gelir_carpani ?? 1), 1);
  // Veba sonrası işçi kıtlığı, salgın hem aktifken hem de izi süren yıllarda maaşı büyütür.
  const vebaCarpani = state.veba && state.yil < state.veba.etkiBitisYili ? state.veba.gelirCarpani : 1;
  const ulkeCarpani =
    (state.ulke.ekonomi === "kotu" ? 0.8 : state.ulke.ekonomi === "iyi" ? 1.15 : 1) *
    (state.ulke.savasta ? 0.85 : 1) *
    vebaCarpani;

  const ham =
    temel *
    (1 + yildizSeviyesi * 0.25) *
    (1 + kariyerYili * 0.02) *
    maasCarpaniGetir(state) *
    durumCarpani *
    ulkeCarpani *
    enflasyonCarpani(state) *
    sehirYonetimMaasCarpani(state.sehir_yonetim_seviyesi);
  return Math.max(1, paraYuvarla(ham));
}

/** Asker'in ordusunun saldırı gücü: mevcut asker sayısı × teçhizat seviyesine bağlı çarpan. */
export function saldiriGucuHesapla(state: CharacterState): number {
  return Math.round(state.ordu_mevcudu * (1 + state.ordu_techizat_seviyesi / 100));
}

/**
 * Meslek-özel derinlik metriğinin (saldırı gücü / ticaret sermayesi / nüfuz)
 * ilgili kategorideki para ödüllerine uyguladığı merkezi çarpan. Yalnızca
 * mesleğin kendi kategorisinde ve kazanç varken devreye girer; onlarca olayı
 * tek tek değiştirmek yerine tek bir yerde uygulanır.
 */
export function meslekMetrikCarpani(state: CharacterState, kategori: Kategori): number {
  if (MESLEK_KATEGORI[state.meslek] !== kategori) return 1;
  if (state.meslek === "Asker") return 1 + saldiriGucuHesapla(state) / 200;
  if (state.meslek === "Tüccar") return 1 + state.ticaret_sermaye / 300;
  if (state.meslek === "Din Adamı") return 1 + state.nufuz / 300;
  return 1;
}

export const ORDU_MEVCUDU_TAVANI = 300;

/** Savaş kategorisinde her seçimde (Asker için) ordu mevcudunda kayıp uygular; savaş sırasında çok daha ciddi. */
export function orduKaybiUygula(state: CharacterState, basarili: boolean): number {
  if (state.meslek !== "Asker" || state.ordu_mevcudu <= 0) return 0;
  const savasKatsayisi = state.ulke.savasta ? 1 : 0.2;
  const temelYuzde = basarili ? 0.03 : 0.1;
  const yuzde = temelYuzde * savasKatsayisi * (0.5 + Math.random());
  const kayip = Math.round(state.ordu_mevcudu * yuzde);
  state.ordu_mevcudu = Math.max(0, state.ordu_mevcudu - kayip);
  return kayip;
}

/** Barış zamanında Asker'in ordusu zamanla doğal olarak büyür. */
export function orduBuyumesiDene(state: CharacterState, yasArtisi: number): void {
  if (state.meslek !== "Asker" || state.ulke.savasta) return;
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() < 0.25) {
      state.ordu_mevcudu = Math.min(ORDU_MEVCUDU_TAVANI, state.ordu_mevcudu + 1 + Math.floor(Math.random() * 2));
    }
  }
}


export const MESLEKLER = ["Asker", "Tüccar", "Din Adamı"];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function agirlikliAileSec(cag: Cag): AileTanimi {
  const uygunlar = AILELER.filter((a) => !a.cag || a.cag === cag);
  const toplam = uygunlar.reduce((t, a) => t + a.agirlik, 0);
  let esik = Math.random() * toplam;
  for (const aile of uygunlar) {
    esik -= aile.agirlik;
    if (esik <= 0) return aile;
  }
  return uygunlar[uygunlar.length - 1];
}

export interface SoyDevamiSecenekleri {
  /** Ebeveynin mesleği/aile mirasından devam eden aile tipi zorla seçilir. */
  zorlananAileAdi?: string;
  /** Devam eden çocuğun adı, karakterin isim alanına doğrudan atanır. */
  isim?: string;
}

/** Hayat amacı seçenekleri: oyuncuya artık sorulmuyor, doğuşta rastgele biri atanıyor (tamamlanırsa skor x5 olur). */
const HAYAT_AMACI_SECENEKLERI: Omit<HayatAmaci, "tamamlandi">[] = [
  {
    id: "en_zengin",
    ad: "Şehrin En Zengini Olmak",
    aciklama: "Servetini 300'ün üzerine çıkar.",
    hedefTuru: "para",
    hedefDeger: 300,
  },
  {
    id: "efsanevi_un",
    ad: "Efsanevi Bir Ün Kazanmak",
    aciklama: "Ününü neredeyse zirveye taşı.",
    hedefTuru: "un",
    hedefDeger: 90,
  },
  {
    id: "kutsal_topraklar",
    ad: "Kutsal Topraklara Ulaşmak",
    aciklama: "Ahlakını neredeyse kusursuz bir seviyeye taşı.",
    hedefTuru: "ahlak",
    hedefDeger: 90,
  },
  {
    id: "buyuk_aile",
    ad: "Büyük Bir Aile Kurmak",
    aciklama: "En az 3 yaşayan çocuğa sahip ol.",
    hedefTuru: "cocuk",
    hedefDeger: 3,
  },
];

export function createCharacter(
  cag: Cag,
  bolge: string,
  yerlesimId: string,
  soyDevami?: SoyDevamiSecenekleri
): CharacterState {
  if (!BOLGELER_BY_CAG[cag]?.includes(bolge)) {
    throw new Error("Geçersiz çağ/bölge kombinasyonu.");
  }
  const yerlesim = yerlesimGetir(yerlesimId);
  if (!yerlesim) {
    throw new Error("Geçersiz yerleşim.");
  }
  const [yilMin, yilMax] = YIL_ARALIGI[cag];
  const yil = yilMin + Math.floor(Math.random() * (yilMax - yilMin + 1));
  const zorlananAile = soyDevami?.zorlananAileAdi
    ? AILELER.find((a) => a.ad === soyDevami.zorlananAileAdi && (!a.cag || a.cag === cag))
    : undefined;
  const aile = zorlananAile ?? agirlikliAileSec(cag);
  const kisilik = rastgeleKisilikCifti();
  const { yatkinliklar, kaynaklar } = yatkinlikHesapla(kisilik, aile, yerlesim);
  const [dostAdi, rakipAdi] = rastgeleIkiIsimSec(cag, bolge);
  const hayatAmaci = HAYAT_AMACI_SECENEKLERI[Math.floor(Math.random() * HAYAT_AMACI_SECENEKLERI.length)];
  const anneAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "kadin", [dostAdi, rakipAdi]);
  const babaAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "erkek", [dostAdi, rakipAdi, anneAdi]);

  const state: CharacterState = {
    id: randomUUID(),
    isim: soyDevami?.isim ?? null,
    yil,
    baslangic_yili: yil,
    yas: 15,
    meslek: "",
    rutbe: "",
    rutbe_seviye: 1,
    sehir_yonetim_seviyesi: 0,
    sehir_yonetim_unvan: null,
    cag,
    bolge,
    yerlesim: yerlesim.ad,
    din_kultur: DIN_KULTUR_BY_BOLGE[bolge] ?? "Bilinmiyor",
    konut_id: VARSAYILAN_KONUT_ID,
    yasam_secimi_id: VARSAYILAN_YASAM_SECIMI_ID,
    kendi_isi_yatirim_sayisi: 0,
    aile_meslegi: aile.ad,
    aile_mirasi_surduruldu: false,
    acilis_anlatimi: "",
    kisilik,
    kisilik_eksenleri: kisilikEksenleriUret(kisilik),
    hukumdar: liderGetir(bolge, yil, cag),
    bolge_bilgi: bolgeIstatistigiGetir(cag, bolge) ?? null,
    haberler: [],
    saglik: 100 + (aile.saglik ?? 0) + (yerlesim.saglik ?? 0),
    mutluluk: 60,
    para: 20 + (aile.para ?? 0) + (yerlesim.para ?? 0),
    para_birimi: paraBirimiGetir(cag, bolge),
    maas_yillik: 0,
    un: 10 + (aile.un ?? 0),
    ahlak: 50 + (aile.ahlak ?? 0),
    ordu_mevcudu: 0,
    ordu_techizat_seviyesi: 0,
    ticaret_sermaye: 0,
    nufuz: 0,
    suc_seviyesi: 0,
    mulkler: [],
    magaza_envanteri: [],
    magaza_temel_kilit_bitis_yili: null,
    alkol_ziyaret_sayisi: 0,
    yatkinliklar,
    yatkinlik_kaynaklari: kaynaklar,
    dost_adi: dostAdi,
    rakip_adi: rakipAdi,
    dost_puani: 50,
    rakip_puani: 50,

    es_adi: null,
    es_puani: 0,
    es_meslek: null,
    es_rutbe: null,
    cocuk_sayisi: 0,
    cocuklar: [],
    ekip: [],
    hizip: null,
    amir_adi: null,
    amir_rutbe: null,
    astlar: [],
    anne_adi: anneAdi,
    baba_adi: babaAdi,
    evcil_hayvan: null,
    unvanlar: [],
    hayat_amaci: { ...hayatAmaci, tamamlandi: false },
    efsanevi_olum: null,
    etiketler: [...(aile.etiketler ?? []), ...yerlesim.etiketler],
    durumlar: (aile.durumlar ?? []).map((d) => ({ ...d })),
    ulke: { savasta: false, vebada: false, ekonomi: "normal", kriz: null, nufusDurumu: "normal" },
    son_zorunlu_bagis_yili: null,
    buyuk_savas: null,
    son_buyuk_savas_bitis_yili: null,
    veba: null,
    veba_gecirdi: false,
    kucuk_kriz_sonraki_yil: yil + 5 + Math.floor(Math.random() * 3), // 5-7 yıl sonra ilk eşik
    gida_fiyat_sok_bitis_yili: null,
    tur_sayisi: 0,
    gecmis_olaylar: [],
    gecmis: [],
    hayat_hikayesi: [],
    aktif: true,
    olum_nedeni: null,
    skoru_kaydedildi: false,
  };

  if (aile.maasCarpani) maasCarpaniUygula(state, aile.maasCarpani);
  if (yerlesim.maasCarpani) maasCarpaniUygula(state, yerlesim.maasCarpani);

  clampStats(state);
  state.acilis_anlatimi = acilisAnlatimiUret(state, aile, yerlesim);
  state.haberler = haberleriUret(state);
  hayatOlayiEkle(state, "🎯", `Hayat amacını belirledi: ${hayatAmaci.ad}`);
  return state;
}

function esikKarsilaniyorMu(esik: RutbeEsigi, state: CharacterState): boolean {
  return (
    (esik.tur_sayisi === undefined || state.tur_sayisi >= esik.tur_sayisi) &&
    (esik.un === undefined || state.un >= esik.un) &&
    (esik.para === undefined || state.para >= esik.para) &&
    (esik.ahlak === undefined || state.ahlak >= esik.ahlak)
  );
}

/** Rütbe kademesine göre bir üst kademedeki amiri atar; en üst kademedeyken amir yoktur (hükümdar zaten en tepede). */
function amirGuncelle(state: CharacterState, tanim: RutbeTanimi, seviye: number): void {
  const ustUnvan = seviye < 3 ? tanim.unvanlar[seviye] : null;
  if (ustUnvan === null) {
    state.amir_adi = null;
    state.amir_rutbe = null;
    return;
  }
  if (state.amir_rutbe !== ustUnvan) {
    state.amir_adi = rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi,
      state.rakip_adi,
      state.es_adi ?? "",
    ]);
    state.amir_rutbe = ustUnvan;
  }
}

/**
 * Rütbe yükseldikçe (seviye 2'de 1, seviye 3'te 2 kişi) astlar ekler; rütbe
 * ladder'ının kendinden düşük basamaklarını taşırlar (ör. seviye 3'teki bir
 * Kumandan'ın astları Er ve Silahşor unvanlarını taşır). Zaten atanmış bir
 * astın ismi/unvanı sabit kalır — rütbe düşse bile çıkarılmaz, sadece terfi
 * ile yeni kademeye ulaşılınca yeni bir ast eklenir.
 */
function astlariGuncelle(state: CharacterState, tanim: RutbeTanimi, seviye: number): void {
  const hedefSayisi = Math.max(0, seviye - 1);
  while (state.astlar.length < hedefSayisi) {
    const rutbe = tanim.unvanlar[state.astlar.length];
    const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi,
      state.rakip_adi,
      state.es_adi ?? "",
      state.amir_adi ?? "",
      state.anne_adi,
      state.baba_adi,
      ...state.astlar.map((a) => a.isim),
    ]);
    state.astlar.push({ isim, rutbe });
  }
}

/** Kıdem ve mesleğe özgü koşullara göre güncel rütbeyi hesaplayıp state'e yazar. */
export function rutbeGuncelle(state: CharacterState): void {
  const tanim = rutbeTanimiGetir(state.meslek, state.cag, state.din_kultur);
  if (!tanim) {
    state.rutbe = state.meslek;
    state.rutbe_seviye = 1;
    state.amir_adi = null;
    state.amir_rutbe = null;
    return;
  }

  let seviye = 1;
  if (esikKarsilaniyorMu(tanim.seviye2Esik, state)) seviye = 2;
  if (seviye === 2 && esikKarsilaniyorMu(tanim.seviye3Esik, state)) seviye = 3;

  state.rutbe_seviye = seviye;
  state.rutbe = tanim.unvanlar[seviye - 1];
  amirGuncelle(state, tanim, seviye);
  astlariGuncelle(state, tanim, seviye);
}

/** Oyuncu mesleğini seçtikten sonra çağrılır: miras bonusunu ve maaşı uygular. */
export function mesleğiSec(state: CharacterState, meslek: string): void {
  if (!MESLEKLER.includes(meslek)) throw new Error("Geçersiz meslek.");
  const aile = AILELER.find((a) => a.ad === state.aile_meslegi);
  const mirasSurduruldu = aile?.devamMeslegi === meslek;

  state.meslek = meslek;
  state.aile_mirasi_surduruldu = mirasSurduruldu;

  if (meslek === "Asker") state.ordu_mevcudu = 10;

  if (mirasSurduruldu && !state.etiketler.includes("aile_mirasi_surduruldu")) {
    state.un += 10;
    state.para += 15;
    maasCarpaniUygula(state, 1.15);
    state.etiketler.push("aile_mirasi_surduruldu");
  }

  clampStats(state);
  state.maas_yillik = hesaplaMaasYillik(state);
  rutbeGuncelle(state);

  const meslekCumlesi: Record<string, string> = {
    Asker: `On beş yaşındasın ve eline verilen kılıçla ${state.bolge} ordusuna yazıldın.`,
    Tüccar: `On beş yaşındasın ve ilk mal denkini sırtlanıp ${state.bolge} pazarlarına adım attın.`,
    "Din Adamı": `On beş yaşındasın ve ${state.din_kultur} cemaatinin hizmetine girmek üzere yola çıktın.`,
  };
  const mirasCumlesi = mirasSurduruldu
    ? "Ailenin mesleğini sürdürmeyi seçtin; ailenin adı bazı kapıları senin için şimdiden araladı."
    : "Ailenin yolundan farklı bir yol seçtin; kimse sana bu işi öğretmeyecek, her şeyi kendin öğreneceksin.";

  state.acilis_anlatimi = [
    state.acilis_anlatimi,
    meslekCumlesi[meslek] ?? `On beş yaşındasın ve ${meslek} olarak hayata atılıyorsun.`,
    mirasCumlesi,
  ].join(" ");
}

function acilisAnlatimiUret(
  state: CharacterState,
  aile: AileTanimi,
  yerlesim: YerlesimTanimi
): string {
  const aileMetni = aile.anlati
    .replace(/\{bolge\}/g, state.bolge)
    .replace(/\{yil\}/g, String(state.yil));

  const [ozellik1, ozellik2] = state.kisilik;
  const kisilikCumlesi = `Çocukluğundan beri etrafındakiler seni ${ozellik1.toLocaleLowerCase("tr")} ve ${ozellik2.toLocaleLowerCase("tr")} biri olarak tanır.`;
  const yerlesimCumlesi = `Ailen ${state.bolge} topraklarının ${yerlesim.ad.toLocaleLowerCase("tr")} kısmına yerleşmiş; sen de hayata burada gözlerini açtın.`;

  return [
    `${state.yil} yılı, ${state.bolge} toprakları.`,
    aileMetni,
    yerlesimCumlesi,
    kisilikCumlesi,
  ]
    .filter(Boolean)
    .join(" ");
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function clampStats(state: CharacterState): void {
  state.saglik = clamp(state.saglik, 0, 100);
  state.mutluluk = clamp(state.mutluluk, 0, 100);
  state.un = clamp(state.un, 0, 100);
  state.ahlak = clamp(state.ahlak, 0, 100);
  state.dost_puani = clamp(state.dost_puani, 0, 100);
  state.rakip_puani = clamp(state.rakip_puani, 0, 100);
  state.suc_seviyesi = clamp(state.suc_seviyesi, 0, 100);
  if (state.es_adi) state.es_puani = clamp(state.es_puani, 0, 100);
  state.cocuk_sayisi = Math.max(0, state.cocuk_sayisi);
  // Para alt/üst sınırsız bırakılır: borca girebilir, sınırsız zenginleşebilir.
}

/** Kutsal kalıntı gibi mistik eşyaların tek seferlik ölümden koruma etiketi. */
export const KORUYUCU_MUSKA_ETIKETI = "esya:kutsal_kalinti";

export function checkDeath(state: CharacterState, zorunluOlum: boolean, mesaj?: string): void {
  if (state.saglik <= 0 || zorunluOlum) {
    if (state.etiketler.includes(KORUYUCU_MUSKA_ETIKETI)) {
      etiketSil(state, [KORUYUCU_MUSKA_ETIKETI]);
      state.saglik = Math.max(state.saglik, 15);
      hayatOlayiEkle(state, "✨", "Kutsal bir emanet sayesinde ölümden döndü");
      return;
    }
    state.aktif = false;
    state.olum_nedeni = mesaj ?? (state.saglik <= 0 ? "Sağlık kaybı" : "Bilinmeyen sebep");
  }
}

const GECMIS_MAX_NOKTA = 40;

/** Geçmiş yıl grafiği için o anki durumu kaydeder; liste belli bir uzunlukta tutulur. */
export function gecmisKaydet(state: CharacterState): void {
  state.gecmis.push({ yil: state.yil, para: state.para, saglik: state.saglik, un: state.un });
  if (state.gecmis.length > GECMIS_MAX_NOKTA) {
    state.gecmis.splice(0, state.gecmis.length - GECMIS_MAX_NOKTA);
  }
}

const HAYAT_HIKAYESI_MAX = 10;

/** Ölüm ekranındaki "hayatının özeti" için önemli bir anı kaydeder. */
export function hayatOlayiEkle(state: CharacterState, ikon: string, baslik: string): void {
  state.hayat_hikayesi.push({ yil: state.yil, yas: state.yas, ikon, baslik });
  if (state.hayat_hikayesi.length > HAYAT_HIKAYESI_MAX) {
    state.hayat_hikayesi.splice(0, state.hayat_hikayesi.length - HAYAT_HIKAYESI_MAX);
  }
}

/** Hiçbir karakterin yaşamaması gereken kesin üst sınır; sağlık/olay bazlı ölümler pratikte çok daha erken devreye girer, bu yalnızca bir garanti tavanıdır. */
export const MAKS_YAS = 100;

export function ilerletYas(state: CharacterState, minYil = 1, maxYil = 3): number {
  const artis = minYil + Math.floor(Math.random() * (maxYil - minYil + 1));
  state.yas += artis;
  state.yil += artis;
  state.tur_sayisi += 1;
  state.hukumdar = liderGetir(state.bolge, state.yil, state.cag);
  if (state.yas >= MAKS_YAS) {
    checkDeath(state, true, "Yüz yaşını doldurdun; huzurlu bir ihtiyar olarak, uykunda son nefesini verdin.");
  }
  return artis;
}

/**
 * Yaş ilerledikçe bedenin çöküşü kademeli, kesin eşiklerle hızlanır: 48'den
 * sonra yılda -3, 65'ten sonra yılda -7, 80'den sonra ("ecel kapısı") yılda
 * -16 sağlık. Hiçbir konut/servet/rütbe bu eşikleri değiştirmez — ama konut
 * ve yaşam tarzı seçimlerinin sağladığı yıllık sağlık bonusu (üst kademelerde
 * ev+yemek birlikte +6/yıla kadar) bu düşüşü, olaylardan gelen hasarı da göz
 * önünde bulundurduğumuzda anlamlı ölçüde dengeler: iyi yaşayan bir karakter
 * 70'li yaşları, hatta ötesini görebilirken, hiç önlem almayan biri çok daha
 * erken bir noktada hayatını kaybeder. Bir turda birden fazla yıl atlanırsa
 * (yasArtisi > 1) her yıl kendi eşiğine göre ayrı ayrı hesaplanır (ör. 47'den
 * 50'ye sıçrama, 48 eşiğini de sayar).
 */
export function yaslanmaUygula(state: CharacterState, yasArtisi: number): number {
  if (yasArtisi <= 0) return 0;
  let toplamKayip = 0;
  let yas = state.yas - yasArtisi;
  for (let i = 0; i < yasArtisi; i++) {
    yas += 1;
    if (yas >= 80) toplamKayip += 16;
    else if (yas >= 65) toplamKayip += 7;
    else if (yas >= 48) toplamKayip += 3;
  }
  state.saglik -= toplamKayip;
  return toplamKayip;
}

const KRONIK_SAGLIK_ESIGI = 30;
const KRONIK_MUTLULUK_ESIGI = 25;

/**
 * Sağlık ve mutluluk arasında pasif çapraz etki: uzun süre çok düşük sağlık
 * kronik hastalık hissiyle mutluluğu, uzun süre çok düşük mutluluk da
 * bedensel yıpranmayla sağlığı aşındırır.
 */
export function capraletkiUygula(
  state: CharacterState,
  yasArtisi: number
): { saglikKaybi: number; mutlulukKaybi: number } {
  if (yasArtisi <= 0) return { saglikKaybi: 0, mutlulukKaybi: 0 };
  let mutlulukKaybi = 0;
  let saglikKaybi = 0;
  if (state.saglik < KRONIK_SAGLIK_ESIGI) {
    mutlulukKaybi = Math.round(yasArtisi * 1.5);
    state.mutluluk = Math.max(0, state.mutluluk - mutlulukKaybi);
  }
  if (state.mutluluk < KRONIK_MUTLULUK_ESIGI) {
    saglikKaybi = Math.round(yasArtisi * 1);
    state.saglik = Math.max(0, state.saglik - saglikKaybi);
  }
  return { saglikKaybi, mutlulukKaybi };
}

export function etiketEkle(state: CharacterState, etiketler?: string[]): void {
  if (!etiketler) return;
  for (const etiket of etiketler) {
    if (!state.etiketler.includes(etiket)) state.etiketler.push(etiket);
  }
}

export function etiketSil(state: CharacterState, etiketler?: string[]): void {
  if (!etiketler) return;
  state.etiketler = state.etiketler.filter((e) => !etiketler.includes(e));
}

export function ulkeGuncelle(state: CharacterState, etki?: Partial<CharacterState["ulke"]>): void {
  if (!etki) return;
  Object.assign(state.ulke, etki);
}

export function durumEkle(state: CharacterState, yeniDurum?: CharacterState["durumlar"][number]): void {
  if (!yeniDurum) return;
  state.durumlar = state.durumlar.filter((d) => d.id !== yeniDurum.id);
  state.durumlar.push({ ...yeniDurum });
}

export function durumlariUygula(state: CharacterState): string | null {
  let olumculDurum: string | null = null;

  for (const durum of state.durumlar) {
    if (durum.tur_basi_saglik) {
      state.saglik += durum.tur_basi_saglik;
      if (state.saglik <= 0 && !olumculDurum) {
        olumculDurum = `${durum.ad} yüzünden hayatını kaybetti.`;
      }
    }
    if (durum.tur_basi_para) {
      state.para += durum.tur_basi_para;
    }
    if (durum.tur_basi_mutluluk) {
      state.mutluluk += durum.tur_basi_mutluluk;
    }
    if (durum.tur === "gecici" && durum.kalan_tur !== undefined) {
      durum.kalan_tur -= 1;
      if (durum.kalan_tur <= 0 && durum.bitince_etiket) {
        etiketEkle(state, [durum.bitince_etiket]);
      }
    }
  }

  state.durumlar = state.durumlar.filter((d) => d.tur === "kalici" || (d.kalan_tur ?? 0) > 0);
  clampStats(state);
  return olumculDurum;
}

export interface GiderKalemleri {
  yasam: number;
  konut: number;
  ekip: number;
  evcilHayvan: number;
  vergi: number;
  /** Aktif büyük savaş sırasında pasif gelirden ek olarak kesilen "savaş vergisi" (bkz. state.buyuk_savas.vergiOrani); savaş yokken 0. */
  savasVergisi: number;
}

export interface EkonomiSonucu {
  borcaGirdi: boolean;
  netGelir: number;
  yillikGelirler: number[];
  faiz: number;
  giderKalemleri: GiderKalemleri;
  /** Bu tur, zenginlik vergisi eşiğine İLK KEZ ulaşıldığı (ya da eşiğin altına inip tekrar aşıldığı) için "devletin dikkatini çekti" bildirimi gösterilmeli mi. */
  vergiBildirimi: boolean;
}

const EVCIL_HAYVAN_GIDERI_YILLIK = 1;

/** Karakterin yerleşimine göre yaşam giderine uygulanan çarpanı döner (en fazla ±%2). */
function yasamMaliyetCarpaniGetir(state: CharacterState): number {
  const yerlesim = yerlesimGetir(yerlesimIdByAd(state.yerlesim));
  return yerlesim?.yasamMaliyetCarpani ?? 1;
}

/** Zenginleşmenin "görünmez bakım masrafı": nakit + sahip olunan gayrimenkullerin güncel
 * değeri toplamı bu eşiği aştıkça, aşan kısım için yıllık %4 pasif vergi/bakım gideri
 * işler. Sıradan bir karakteri hiç etkilemez, servet (mülk dahil) biriktikçe fark edilir
 * hale gelir — bkz. pasifEkonomiUygula içindeki "devlet fark etti" bildirimi. */
const ZENGINLIK_VERGISI_ESIGI = 500;
const ZENGINLIK_VERGISI_ORANI = 0.04;
/** pasifEkonomiUygula'nın vergi eşiğine ilk kez ulaşıldığını (bir kereliğine) bildirmek için taktığı/söktüğü sistem etiketi. */
export const DEVLET_VERGI_TAKIP_ETIKETI = "devlet_takibinde";

function zenginlikVergisiHesapla(toplamServet: number): number {
  if (toplamServet <= ZENGINLIK_VERGISI_ESIGI) return 0;
  return paraYuvarla((toplamServet - ZENGINLIK_VERGISI_ESIGI) * ZENGINLIK_VERGISI_ORANI);
}

/** Bir sonraki turun gider dökümünü, gerçekte uygulamadan hesaplar; Finans ekranı bunu kullanır. */
export function giderKalemleriHesapla(state: CharacterState): GiderKalemleri {
  const enflasyon = enflasyonCarpani(state);
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  // Büyük savaş sırasında gıda pahalanır (gidaCarpani); küçük kriz tetiklendiği yıl için
  // ayrıca ×2 tek yıllık bir şok biner — ikisi çarpımsal birleşir (nadir ama kasıtlı).
  const savasGidaCarpani = state.buyuk_savas ? state.buyuk_savas.gidaCarpani : 1;
  const krizSokCarpani = state.gida_fiyat_sok_bitis_yili !== null && state.yil < state.gida_fiyat_sok_bitis_yili ? 2 : 1;
  // Veba izi sürerken (aktif + 10-15 yıllık kalıcı iz) boş evler yüzünden kira düşer.
  const vebaKiraCarpani = state.veba && state.yil < state.veba.etkiBitisYili ? state.veba.konutKiraCarpani : 1;
  return {
    yasam: paraYuvarla(
      (yasamSecenegi?.maliyetYillik ?? 0) * yasamMaliyetCarpaniGetir(state) * savasGidaCarpani * krizSokCarpani * enflasyon
    ),
    konut: paraYuvarla((konutGetir(state.konut_id)?.kiraYillik ?? 0) * vebaKiraCarpani * enflasyon),
    ekip: state.ekip.reduce((toplam, uye) => toplam + uye.maas, 0),
    evcilHayvan: state.evcil_hayvan ? paraYuvarla(EVCIL_HAYVAN_GIDERI_YILLIK * enflasyon) : 0,
    vergi: zenginlikVergisiHesapla(state.para + gayrimenkulDegeriHesapla(state)),
    savasVergisi: state.buyuk_savas ? paraYuvarla(hesaplaMaasYillik(state) * state.buyuk_savas.vergiOrani) : 0,
  };
}

export function pasifEkonomiUygula(state: CharacterState, yasArtisi: number): EkonomiSonucu {
  state.maas_yillik = hesaplaMaasYillik(state);
  const giderKalemleri = giderKalemleriHesapla(state);
  const gider =
    giderKalemleri.yasam +
    giderKalemleri.konut +
    giderKalemleri.ekip +
    giderKalemleri.evcilHayvan +
    giderKalemleri.vergi +
    giderKalemleri.savasVergisi;

  // Gelir her yıl ayrı ayrı dalgalanır: bereketli yıl, kötü hasat, durgun pazar...
  const yillikGelirler: number[] = [];
  let netGelir = 0;
  for (let i = 0; i < yasArtisi; i++) {
    const dalga = 0.75 + Math.random() * 0.5; // 0.75x - 1.25x
    const oYilkiGelir = Math.max(0, paraYuvarla(state.maas_yillik * dalga));
    yillikGelirler.push(oYilkiGelir);
    netGelir += oYilkiGelir - gider;
  }
  state.para = paraYuvarla(state.para + netGelir);
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  if (yasamSecenegi?.saglikEtkisiYillik) {
    state.saglik += yasamSecenegi.saglikEtkisiYillik * yasArtisi;
  }
  if (yasamSecenegi?.mutlulukEtkisiYillik) {
    state.mutluluk += yasamSecenegi.mutlulukEtkisiYillik * yasArtisi;
  }
  const konut = konutGetir(state.konut_id);
  if (konut?.saglikEtkisiYillik) {
    state.saglik += konut.saglikEtkisiYillik * yasArtisi;
  }
  if (konut?.mutlulukEtkisiYillik) {
    state.mutluluk += konut.mutlulukEtkisiYillik * yasArtisi;
  }
  if (konut?.unEtkisiYillik) {
    state.un += konut.unEtkisiYillik * yasArtisi;
  }

  // Meslek, olay dışı geçen yıllarda da sessizce iz bırakır: din adamının cemaat
  // içindeki saygınlığı yıllar içinde birikir; tüccarınkiyse ticaretin gidişatına
  // bağlıdır — bereketli/kazançlı yıllar ahlakı aşındırır, zor/zararlı yıllar sınar
  // ve güçlendirir. Küçük bir sürüklenme; olayların etkisini domine etmez.
  if (state.meslek === "Din Adamı") {
    state.un += 0.4 * yasArtisi;
  } else if (state.meslek === "Tüccar") {
    state.ahlak += (netGelir >= 0 ? -0.4 : 0.4) * yasArtisi;
  }

  let borcaGirdi = false;
  let faiz = 0;
  if (state.para < 0) {
    faiz = paraYuvarla(Math.abs(state.para) * 0.06 * yasArtisi);
    state.para -= faiz;
    state.saglik -= 2 * yasArtisi;
    borcaGirdi = true;
  }

  // "Devlet fark etti" bildirimi: eşiğin üstüne SADECE yeni çıkıldığında bir kereliğine
  // ateşlenir (etiket zaten varken sessizce devam eder), eşiğin altına düşülürse etiket
  // sökülür — böylece servet tekrar eşiği aşarsa bildirim yeniden tetiklenebilir.
  const halihazirdaTakipte = state.etiketler.includes(DEVLET_VERGI_TAKIP_ETIKETI);
  const vergiBildirimi = giderKalemleri.vergi > 0 && !halihazirdaTakipte;
  if (giderKalemleri.vergi > 0) {
    etiketEkle(state, [DEVLET_VERGI_TAKIP_ETIKETI]);
  } else if (halihazirdaTakipte) {
    etiketSil(state, [DEVLET_VERGI_TAKIP_ETIKETI]);
  }

  clampStats(state);
  return { borcaGirdi, netGelir, yillikGelirler, faiz, giderKalemleri, vergiBildirimi };
}

/**
 * Oyuncunun istediği an tetikleyebileceği konut değişimi; bir tur tüketmez.
 * Daha ucuz bir kademeye (kirası düşük) geri çekilmek nakliye ücretinden
 * muaftır — borca düşüp daha ucuz bir eve dönmek isteyen bir oyuncunun, tam
 * da parası olmadığı için sıkışıp kalmaması için.
 */
export function konutDegistir(state: CharacterState, konutId: string): string {
  const yeniKonut = konutGetir(konutId);
  if (!yeniKonut) throw new Error("Geçersiz konut.");
  if (konutId === state.konut_id) throw new Error("Zaten bu konutta yaşıyorsun.");
  const eskiKonut = konutGetir(state.konut_id);
  const geriCekilme = (eskiKonut?.kiraYillik ?? 0) > yeniKonut.kiraYillik;
  if (!geriCekilme && state.para < TASINMA_MALIYETI) {
    throw new Error(`Taşınmak için yeterli paran yok (${TASINMA_MALIYETI} ${state.para_birimi} gerekli).`);
  }
  if (!geriCekilme) state.para -= TASINMA_MALIYETI;
  state.konut_id = konutId;
  clampStats(state);
  return `${yeniKonut.ad}'e taşındın.`;
}

/** Oyuncunun istediği an tetikleyebileceği yaşam tarzı değişimi; bir tur/maliyet gerektirmez. */
export function yasamSecimiDegistir(state: CharacterState, secimId: string): string {
  const yeniSecenek = yasamSecenegiGetir(secimId);
  if (!yeniSecenek) throw new Error("Geçersiz yaşam tarzı seçimi.");
  if (secimId === state.yasam_secimi_id) throw new Error("Zaten bu şekilde yaşıyorsun.");
  state.yasam_secimi_id = secimId;
  clampStats(state);
  return `Artık "${yeniSecenek.ad}" tarzında yaşıyorsun.`;
}

function sec<T>(secenekler: T[]): T {
  return secenekler[Math.floor(Math.random() * secenekler.length)];
}

/**
 * Seçimin ardından öne çıkan tek bir bağlam cümlesi üretir. Sayısal etkiler
 * zaten EtkiCipleri'nde ayrıca gösterildiği için burada, değişen her istat
 * için ayrı ayrı değil, en önemli TEK etki için kısa bir anlatım cümlesi
 * seçilir (zamanAnlatimiUret'teki "en fazla bir ek cümle" ilkesiyle aynı).
 */
export function sonucAnlatimiUret(
  state: CharacterState,
  etki: SonucEtkisi,
  basarili: boolean
): string {
  const cumleler: string[] = [];

  if (etki.detay) cumleler.push(etki.detay);

  const ekCumle =
    (etki.yeni_meslek
      ? `Artık ${etki.yeni_meslek.toLocaleLowerCase("tr")} olarak anılıyorsun.`
      : null) ??
    (etki.durum_ekle
      ? etki.durum_ekle.tur === "kalici"
        ? `${etki.durum_ekle.ad} artık hayatının kalıcı bir parçası.`
        : `${etki.durum_ekle.ad} bir süre daha peşini bırakmayacak.`
      : null) ??
    (etki.saglik && Math.abs(etki.saglik) >= 25
      ? sec(
          etki.saglik > 0
            ? ["Kendini uzun zamandır olmadığı kadar dinç hissediyorsun."]
            : [
                "Aldığın hasar ağırdı; günlerce yatakta kaldın.",
                "Yaraların derindi, bir daha eskisi gibi olmayacaksın.",
              ]
        )
      : null) ??
    (etki.para
      ? sec(
          etki.para > 0
            ? [
                `Kesene giren ${Math.abs(etki.para)} ${state.para_birimi} güzel bir rahatlıktı.`,
                `${Math.abs(etki.para)} ${state.para_birimi} kazandın.`,
              ]
            : [
                `${Math.abs(etki.para)} ${state.para_birimi} kaybettin.`,
                `Cebinden ${Math.abs(etki.para)} ${state.para_birimi} gitti.`,
              ]
        )
      : null) ??
    (etki.saglik
      ? sec([
          "Bedeninde kalan sızı bir süre bu günü hatırlattı.",
          "Ufak yaralarını kendin sardın, kimseye çaktırmadın.",
        ])
      : null) ??
    (etki.un
      ? sec(
          etki.un > 0
            ? [
                `${state.bolge} sokaklarında adın anılmaya başladı.`,
                "Hikaye ağızdan ağıza dolaştı, itibarın arttı.",
              ]
            : [
                "Dedikodu hızla yayıldı, itibarın zedelendi.",
                `${state.bolge} çevrende adın eskisi kadar güvenle anılmıyor.`,
              ]
        )
      : null) ??
    (etki.ahlak
      ? sec(
          etki.ahlak > 0
            ? ["Doğru olanı yaptığını biliyorsun, bu seni ayakta tutuyor."]
            : [
                "Kendine bunun mecburiyetten olduğunu söyledin, tam inanamadın.",
                "O geceden sonra aynaya bakmak biraz zorlaştı.",
              ]
        )
      : null) ??
    null;

  if (ekCumle) cumleler.push(ekCumle);

  if (cumleler.length === 0) {
    cumleler.push(
      basarili
        ? "Olay sessizce kapandı, hayatında somut bir şey değişmedi."
        : "İşler istediğin gibi gitmedi, yine de büyük bir kayıp yaşamadın."
    );
  }

  return cumleler.join(" ");
}

/**
 * Kayda değer bir olay/durum yoksa aradan geçen sürede yaşanan, tamamen
 * kozmetik (hiçbir istatistiği etkilemeyen) küçük bir "gün be gün hayat"
 * anı. Kısa, tek cümlelik, sebep-sonuç tonunda.
 */
const GUNLUK_FLAVOR: string[] = [
  "Kafana bir saksı düştü, canın acıdı ama ciddi bir şey olmadı.",
  "Attığın taş geri sekti, şaşkınlıktan yerinde sıçradın.",
  "Sokakta bir köpek havladı, ödün patladı.",
  "Ayağın bir taşa takıldı, bir anlığına dengeni kaybettin.",
  "Ani bir yağmura yakalandın, sırılsıklam eve döndün.",
  "Komşunun horozu seni sabah erkenden uyandırdı, homurdanarak kalktın.",
  "Pazarda tanımadığın biri sana gülümsedi, günün biraz güzelleşti.",
  "Önünü bir kedi kesti, uğursuzluk getirir diye içinden geçirdin.",
  "Ayakkabının bağı koptu, yolun ortasında eğilip bağlamak zorunda kaldın.",
  "Uzaktan bir çan sesi duydun, dalıp gittin.",
  "Rüzgar başlığını uçurdu, peşinden koşup yakaladın.",
  "Bir çocuk topunu sana attı, gülerek geri fırlattın.",
  "Akşam ocağın tütmedi, komşudan ateş istemek zorunda kaldın.",
  "Başıboş bir köpek peşine takıldı, birkaç sokak seni izledi.",
  "Elin bir kıymığa takıldı, bir süre canını yaktı.",
  "Uzak bir tanıdık elini salladı, sen de karşılık verdin.",
  "Beklenmedik bir esinti mumunu söndürdü, karanlıkta el yordamıyla kaldın.",
  "Bir güvercin tam üstünden geçti, refleksle başını eğdin.",
];

function gunlukFlavorSec(): string {
  return GUNLUK_FLAVOR[Math.floor(Math.random() * GUNLUK_FLAVOR.length)];
}

/**
 * Bir turda geçen yılların kısa özeti: en fazla iki cümle. İlk cümle
 * (varsa) kazancı bildirir — oyuncu için asıl önemli olan bu. İkinci
 * cümle, varsa en öncelikli durumsal uyarıyı (borç > kronik hastalık >
 * veba > savaş > kötü ekonomi), yoksa kısa, kozmetik bir "gün be gün
 * hayat" anını verir.
 */
export function zamanAnlatimiUret(
  state: CharacterState,
  yasArtisi: number,
  ekonomi: EkonomiSonucu
): string | null {
  if (yasArtisi <= 0) return null;

  const cumleler: string[] = [];

  if (ekonomi.yillikGelirler.length > 0) {
    const dokum = ekonomi.yillikGelirler.join(", ");
    cumleler.push(
      ekonomi.yillikGelirler.length === 1
        ? `${dokum} ${state.para_birimi} kazandın.`
        : `${yasArtisi} yılda ${dokum} ${state.para_birimi} kazandın.`
    );
  }

  const surenHastalik = state.durumlar.find((d) => d.tur === "gecici" && (d.tur_basi_saglik ?? 0) < 0);

  if (ekonomi.borcaGirdi) {
    cumleler.push(
      ekonomi.faiz > 0
        ? `Borcun kapanmadı, üstüne ${ekonomi.faiz} ${state.para_birimi} faiz bindi.`
        : "Borcun hâlâ kapanmadı, tefeciler peşini bırakmıyor."
    );
  } else if (surenHastalik) {
    cumleler.push(`${surenHastalik.ad} bu süre boyunca da seni yatağa düşürdü.`);
  } else if (state.ulke.vebada) {
    cumleler.push("Salgın sürüyordu, cenaze alayları artık gündelikti.");
  } else if (state.ulke.savasta) {
    cumleler.push("Savaş sürüyordu; pazarlar durgun, insanlar tedirgindi.");
  } else if (state.ulke.ekonomi === "kotu") {
    cumleler.push("Ekonomik darlık herkesi vurmuştu, ekmek her ay biraz daha pahalandı.");
  } else {
    cumleler.push(gunlukFlavorSec());
  }

  return cumleler.join(" ");
}

interface SansOlayi {
  mesaj: string;
  para?: number;
  un?: number;
  dost_puani?: number;
  rakip_puani?: number;
}

/**
 * Oyuncunun seçimlerinden bağımsız, arada bir yaşanan küçük şans olayları:
 * yolda bulunan bir kese, bir hayırseverin bahşişi, kralın adını duyması,
 * dost/rakibin kendi hayatından haberler... Her zaman diliminde küçük bir
 * ihtimalle tetiklenir.
 */
const SANS_OLAYLARI: SansOlayi[] = [
  { mesaj: "Yolda kaybedilmiş bir kese para buldun.", para: 15 },
  { mesaj: "Tanımadığın bir hayırsever, seni beğenip küçük bir bahşiş bıraktı.", para: 10 },
  { mesaj: "{bolge} beyi senin adını bir yerde duymuş, meraklandığını söylediler.", un: 6 },
  { mesaj: "Uzak bir akraban seni hatırlamış, küçük bir miras gönderdi.", para: 20 },
  { mesaj: "Bir tüccar seni kandırdı, cebinden bilmeden para eksildi.", para: -12 },
  { mesaj: "Beklenmedik bir masraf çıktı; evinin çatısı aktı, tamir gerekti.", para: -10 },
  { mesaj: "Bir dedikodu yayıldı, adın bir süre daha az anılır oldu.", un: -6 },
  { mesaj: "{dost} artık şehrin en saygın simalarından biri olmuş, bunu duyunca gururlandın.", dost_puani: 5 },
  { mesaj: "{rakip} büyük bir başarısızlık yaşamış, her şeyini kaybetmiş dediler.", rakip_puani: 4 },
  { mesaj: "{dost} senin için güzel sözler etmiş, bir tanıdığın bunu sana aktardı.", dost_puani: 3 },
  { mesaj: "{rakip} senin aleyhinde konuşmuş, bazı çevrelere ulaşmış.", rakip_puani: -4 },
  { mesaj: "{dost} evlenmiş, sen davet edilmemişsin; içine hafif bir kırgınlık oturdu.", dost_puani: -3 },
];

/**
 * Nadir, tamamen anlamsız/absürt ölümler: hiçbir seçimin, servetin ya da
 * sağlığın bunu engelleyemeyeceği kaçınılmaz kaza riskleri. Çok düşük bir
 * ihtimalle her turda kontrol edilir; efsanevi_olum olarak işaretlenir ki
 * liderlik tablosunda bir rozet gibi görünsün.
 */
const ANI_OLUM_OLAYLARI: { mesaj: string; efsane: string; cag?: Cag }[] = [
  { mesaj: "Bir evin penceresinden düşen saksı tam kafana isabet etti.", efsane: "Saksı Kurbanı" },
  { mesaj: "Sokakta kontrolden çıkan bir at arabası seni ezip geçti.", efsane: "At Arabasının Altında" },
  { mesaj: "Fırtınada bir yıldırım tam üstüne düştü.", efsane: "Gökten Gelen Ecel" },
  { mesaj: "Bir kuyudan su çekerken ayağın kaydı ve bir daha çıkamadın.", efsane: "Kuyunun Dibinde" },
  { mesaj: "Yediğin bir mantar, yanlışlıkla zehirli çıktı.", efsane: "Yanlış Mantar" },
  { mesaj: "Uykunda evinin çatısı üstüne çöktü.", efsane: "Çöken Çatı" },
  { mesaj: "Bir kavga izlerken sapan taşı yanlışlıkla sana geldi.", efsane: "Yanlış Zamanda Yanlış Yer" },
  { mesaj: "Bir demirci dükkânının önünden geçerken kızgın bir demir parçası üstüne sıçradı.", efsane: "Demircinin Kıvılcımı", cag: "Orta Çağ" },
  { mesaj: "Şehirdeki ilk buharlı makinelerden biri, tam yanından geçerken infilak etti.", efsane: "Makinenin Kurbanı", cag: "Sanayi Devrimi" },
];

const ANI_OLUM_IHTIMALI = 0.008;

/** Kaçınılmaz, tamamen şansa bağlı ölüm riskini kontrol eder; tetiklenirse checkDeath ile birlikte kullanılacak mesajı döner. */
export function aniOlumDene(state: CharacterState): { mesaj: string; efsane: string } | null {
  if (Math.random() > ANI_OLUM_IHTIMALI) return null;
  const havuz = ANI_OLUM_OLAYLARI.filter((o) => !o.cag || o.cag === state.cag);
  const olay = havuz[Math.floor(Math.random() * havuz.length)];
  return { mesaj: olay.mesaj, efsane: olay.efsane };
}

const SANS_OLAYI_IHTIMALI = 0.18;

export function sansOlayiDene(state: CharacterState): string | null {
  if (Math.random() > SANS_OLAYI_IHTIMALI) return null;
  const olay = SANS_OLAYLARI[Math.floor(Math.random() * SANS_OLAYLARI.length)];
  if (olay.para) state.para += olay.para;
  if (olay.un) state.un += olay.un;
  if (olay.dost_puani) state.dost_puani += olay.dost_puani;
  if (olay.rakip_puani) state.rakip_puani += olay.rakip_puani;
  clampStats(state);
  return `🎲 ${olay.mesaj
    .replace(/\{bolge\}/g, state.bolge)
    .replace(/\{dost\}/g, state.dost_adi)
    .replace(/\{rakip\}/g, state.rakip_adi)}`;
}

export function hesaplaSkor(state: CharacterState): number {
  const taban = state.yas * Math.max(state.un, 1) * Math.max(state.para, 1);
  return state.hayat_amaci?.tamamlandi ? taban * 5 : taban;
}

/** state.hayat_amaci'nin hedefine ulaşılıp ulaşılmadığını kontrol eder; ulaşıldıysa tamamlandi=true yapıp hayat hikayesine ekler. */
export function hayatAmaciKontrolEt(state: CharacterState): void {
  const amac = state.hayat_amaci;
  if (!amac || amac.tamamlandi) return;
  const deger =
    amac.hedefTuru === "para"
      ? state.para
      : amac.hedefTuru === "un"
        ? state.un
        : amac.hedefTuru === "ahlak"
          ? state.ahlak
          : state.cocuk_sayisi;
  if (deger >= amac.hedefDeger) {
    amac.tamamlandi = true;
    hayatOlayiEkle(state, "🎯", `Hayat amacını tamamladı: ${amac.ad}`);
  }
}

const KUCUK_KRIZ_SURE_MIN_YIL = 2;
const KUCUK_KRIZ_SURE_ARALIK_YIL = 1; // 2-3 yıl
const KUCUK_KRIZ_SONRAKI_ESIK_MIN_YIL = 5;
const KUCUK_KRIZ_SONRAKI_ESIK_ARALIK_YIL = 2; // 5-7 yıl

const KUCUK_KRIZ_FLAVOR: string[] = [
  "🌾 Kıtlık kapıya dayandı; ambarlar hızla boşaldı, ekmek fiyatları anında iki katına çıktı.",
  "🏹 Haydutlar yolları ve pazarları bastı; mallar yağmalandı, gıda fiyatları bir anda fırladı.",
];

/**
 * 5-7 yılda bir düzenli aralıklarla tekrarlayan küçük kriz (kıtlık/haydut
 * baskını flavor'ı). Mekanik olarak mevcut "kitlik" kriz tipini yeniden
 * kullanır (2-3 yıl sürer, aşağıdaki krizEtkisiUygula'nın -2 sağlık/yıl
 * etkisi otomatik uygulanır); ayrıca SADECE tetiklendiği yıl için gıda
 * fiyatını ×2 yapan tek yıllık bir şok bindirir (giderKalemleriHesapla,
 * bir sonraki tur otomatik normale döner).
 */
export function kucukKrizKontrolEt(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || state.ulke.kriz) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  if (state.yil < state.kucuk_kriz_sonraki_yil) return null;
  const sureYil = KUCUK_KRIZ_SURE_MIN_YIL + Math.floor(Math.random() * (KUCUK_KRIZ_SURE_ARALIK_YIL + 1));
  state.ulke.kriz = { tur: "kitlik", bitisYili: state.yil + sureYil };
  state.gida_fiyat_sok_bitis_yili = state.yil + 1;
  state.kucuk_kriz_sonraki_yil =
    state.yil + KUCUK_KRIZ_SONRAKI_ESIK_MIN_YIL + Math.floor(Math.random() * (KUCUK_KRIZ_SONRAKI_ESIK_ARALIK_YIL + 1));
  return KUCUK_KRIZ_FLAVOR[Math.floor(Math.random() * KUCUK_KRIZ_FLAVOR.length)];
}

const KRIZ_ETKI: Record<UlkeKrizi["tur"], { saglik?: number; para?: number; un?: number; mutluluk?: number }> = {
  kitlik: { saglik: -2 },
  isyan: { para: -3, un: -1 },
  altin_cag: { para: 4, mutluluk: 1 },
};

const KRIZ_BITIS_MESAJI: Record<UlkeKrizi["tur"], string> = {
  kitlik: "Kıtlık nihayet sona erdi, ambarlar yeniden dolmaya başladı.",
  isyan: "İsyan bastırıldı, sokaklar yavaşça sakinleşti.",
  altin_cag: "Altın çağ sona erdi, hayat eski normaline döndü.",
};

/** Aktif global kriz/altın çağın yıllık pasif etkisini uygular; süresi dolduysa temizler ve bitiş mesajı döner. */
export function krizEtkisiUygula(state: CharacterState, yasArtisi: number): string | null {
  const kriz = state.ulke.kriz;
  if (!kriz) return null;
  const etki = KRIZ_ETKI[kriz.tur];
  if (etki.saglik) state.saglik += etki.saglik * yasArtisi;
  if (etki.para) state.para += etki.para * yasArtisi;
  if (etki.un) state.un += etki.un * yasArtisi;
  if (etki.mutluluk) state.mutluluk += etki.mutluluk * yasArtisi;
  if (state.yil >= kriz.bitisYili) {
    const mesaj = KRIZ_BITIS_MESAJI[kriz.tur];
    state.ulke.kriz = null;
    return mesaj;
  }
  return null;
}

const SUC_SEVIYESI_PASIF_AZALMA_YILLIK = 1;

/** Suç/aranma seviyesini her yıl pasif olarak biraz düşürür (taban 0); kalıcı bir ceza sarmalı oluşmasın diye. */
export function sucSeviyesiUygula(state: CharacterState, yasArtisi: number): void {
  if (yasArtisi <= 0) return;
  state.suc_seviyesi = Math.max(0, state.suc_seviyesi - SUC_SEVIYESI_PASIF_AZALMA_YILLIK * yasArtisi);
}

// ---------------------------------------------------------------------------
// Dünya olayları: zorunlu bağış / büyük savaş / veba — hepsi arka planda
// (olay ekranı olmadan) tetiklenen, turdaki HER yıl için ayrı ayrı kontrol
// edilen periyodik mekanikler (bkz. CLAUDE.md §27).
// ---------------------------------------------------------------------------

const ZORUNLU_BAGIS_ESIGI = 500;
const ZORUNLU_BAGIS_COOLDOWN_YIL = 5;
const ZORUNLU_BAGIS_YILLIK_IHTIMAL = 0.25;
const ZORUNLU_BAGIS_ORAN_MIN = 0.15;
const ZORUNLU_BAGIS_ORAN_ARALIK = 0.05;

export interface ZorunluBagisSonucu {
  miktar: number;
  mesaj: string;
}

/**
 * "Gizli zenginlik vergisi" olayı: toplam servet (nakit+mülk) 500'ü aştıkça,
 * en az 5 yıllık cooldown sonrasında yıllık %25 ihtimalle hükümdar servetin
 * %15-20'sini zorunlu bağış olarak alır. Mevcut pasif "zenginlik vergisi"
 * (%4/yıl, zenginlikVergisiHesapla) ile AYNI ŞEY DEĞİL — o ayrıca çalışmaya
 * devam eder; bu tek seferlik, büyük ve kendi cooldown'una sahip bir "olay".
 */
export function zorunluBagisKontrolEt(state: CharacterState, yasArtisi: number): ZorunluBagisSonucu | null {
  if (yasArtisi <= 0) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  for (let i = 0; i < yasArtisi; i++) {
    const toplamServet = state.para + gayrimenkulDegeriHesapla(state);
    if (toplamServet <= ZORUNLU_BAGIS_ESIGI) continue;
    const taban = state.son_zorunlu_bagis_yili ?? state.baslangic_yili;
    if (state.yil - taban < ZORUNLU_BAGIS_COOLDOWN_YIL) continue;
    if (Math.random() >= ZORUNLU_BAGIS_YILLIK_IHTIMAL) continue;
    const oran = ZORUNLU_BAGIS_ORAN_MIN + Math.random() * ZORUNLU_BAGIS_ORAN_ARALIK;
    const miktar = paraYuvarla(toplamServet * oran);
    state.para -= miktar;
    state.son_zorunlu_bagis_yili = state.yil;
    return {
      miktar,
      mesaj: `👑 Hükümdar zenginleştiğini fark etti; kraliyet hazinesi için zorla ${miktar} ${state.para_birimi} bağış aldı.`,
    };
  }
  return null;
}

const BUYUK_SAVAS_MIN_COOLDOWN_YIL = 10;
const BUYUK_SAVAS_YILLIK_IHTIMAL = 0.1;
const BUYUK_SAVAS_SURE_MIN_YIL = 3;
const BUYUK_SAVAS_SURE_ARALIK_YIL = 3; // 3-6 yıl
const BUYUK_SAVAS_VERGI_ORANI_MIN = 0.15;
const BUYUK_SAVAS_VERGI_ORANI_ARALIK = 0.05;
const BUYUK_SAVAS_GIDA_CARPANI_MIN = 1.25;
const BUYUK_SAVAS_GIDA_CARPANI_ARALIK = 0.1;

/**
 * Tekrarlayan büyük savaş: sadece savaş yokken kontrol edilir, bu yüzden
 * mevcut tarihi-savaş-ilanı mekanizmasıyla (senaryoUret kaskadı) asla üst
 * üste binmez — hangisi önce ulke.savasta'yı true yaparsa öbürü sessizce
 * beklemeye devam eder. En az 10 yıl cooldown sonrası her yıl %10 ihtimal.
 */
export function buyukSavasKontrolEt(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || state.ulke.savasta) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  const taban = state.son_buyuk_savas_bitis_yili ?? state.baslangic_yili;
  if (state.yil - taban < BUYUK_SAVAS_MIN_COOLDOWN_YIL) return null;
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() >= BUYUK_SAVAS_YILLIK_IHTIMAL) continue;
    const dusman = tarihiSavasKontrol(state.bolge, state.yil, state.cag) ?? komsuGucSec(state.bolge);
    const sureYil = BUYUK_SAVAS_SURE_MIN_YIL + Math.floor(Math.random() * (BUYUK_SAVAS_SURE_ARALIK_YIL + 1));
    state.buyuk_savas = {
      dusman,
      baslangicYili: state.yil,
      bitisYili: state.yil + sureYil,
      vergiOrani: BUYUK_SAVAS_VERGI_ORANI_MIN + Math.random() * BUYUK_SAVAS_VERGI_ORANI_ARALIK,
      gidaCarpani: BUYUK_SAVAS_GIDA_CARPANI_MIN + Math.random() * BUYUK_SAVAS_GIDA_CARPANI_ARALIK,
    };
    state.ulke.savasta = true;
    return `⚔️ ${dusman} ile aranızdaki gerginlik büyük bir savaşa dönüştü.`;
  }
  return null;
}

/** Aktif büyük savaşın süresi dolduysa sona erdirir; mesaj döner ve 10 yıllık cooldown'u yeniden başlatır. */
export function buyukSavasBitisKontrolEt(state: CharacterState): string | null {
  if (!state.buyuk_savas || state.yil < state.buyuk_savas.bitisYili) return null;
  const dusman = state.buyuk_savas.dusman;
  state.ulke.savasta = false;
  state.son_buyuk_savas_bitis_yili = state.yil;
  state.buyuk_savas = null;
  return `🕊️ ${dusman} ile sürdürülen savaş sona erdi, barış geri döndü.`;
}

const VEBA_MIN_YAS = 18;
const VEBA_YILLIK_IHTIMAL = 0.04;

/** Ömürde bir kez tetiklenebilecek vebanın zamanı geldi mi (henüz yaşanmadıysa, 18+ yaşındayken yıllık %4 ihtimalle). */
export function vebaBaslamaliMi(state: CharacterState, yasArtisi: number): boolean {
  if (yasArtisi <= 0 || state.veba_gecirdi || state.ulke.vebada || state.yas < VEBA_MIN_YAS) return false;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return false;
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() < VEBA_YILLIK_IHTIMAL) return true;
  }
  return false;
}

const VEBA_AKTIF_SURE_MIN_YIL = 2;
const VEBA_AKTIF_SURE_ARALIK_YIL = 2; // 2-4 yıl
const VEBA_ETKI_SURE_MIN_YIL = 10;
const VEBA_ETKI_SURE_ARALIK_YIL = 5; // aktif süreye eklenen 10-15 yıllık kalıcı iz
const VEBA_KONUT_KIRA_CARPANI_MIN = 0.6;
const VEBA_KONUT_KIRA_CARPANI_ARALIK = 0.1;
const VEBA_GELIR_CARPANI_MIN = 1.2;
const VEBA_GELIR_CARPANI_ARALIK = 0.1;

/** Veba olayı çözüldükten sonra (gameEngine.ts'te ulke_etkisi.vebada true tespit edilince) çağrılır; süre/çarpan parametrelerini rastgele belirler. */
export function vebaBaslat(state: CharacterState, onlemAlindiMi: boolean): void {
  const aktifSureYil = VEBA_AKTIF_SURE_MIN_YIL + Math.floor(Math.random() * (VEBA_AKTIF_SURE_ARALIK_YIL + 1));
  const etkiSureYil = VEBA_ETKI_SURE_MIN_YIL + Math.floor(Math.random() * (VEBA_ETKI_SURE_ARALIK_YIL + 1));
  state.veba = {
    aktif: true,
    baslangicYili: state.yil,
    bitisYili: state.yil + aktifSureYil,
    etkiBitisYili: state.yil + aktifSureYil + etkiSureYil,
    konutKiraCarpani: VEBA_KONUT_KIRA_CARPANI_MIN + Math.random() * VEBA_KONUT_KIRA_CARPANI_ARALIK,
    gelirCarpani: VEBA_GELIR_CARPANI_MIN + Math.random() * VEBA_GELIR_CARPANI_ARALIK,
    onlemAlindiMi,
  };
  state.veba_gecirdi = true;
}

export interface VebaYillikSonuc {
  karakterOldu: boolean;
  mesajlar: string[];
}

const VEBA_OLUM_IHTIMALI = 0.03;
const VEBA_OLUM_IHTIMALI_ONLEMLI = 0.015;
const VEBA_ES_KAYIP_IHTIMALI = 0.02;
const VEBA_ES_KAYIP_IHTIMALI_ONLEMLI = 0.01;
const VEBA_COCUK_KAYIP_IHTIMALI = 0.02;
const VEBA_COCUK_KAYIP_IHTIMALI_ONLEMLI = 0.01;

/**
 * Aktif veba sürerken (sadece state.veba.aktif iken) her yıl için karakterin,
 * eşinin ve bir çocuğunun ölüm riskini kontrol eder. Önlem alınmışsa riskler
 * yarıya iner. Karakterin kendi ölümü burada UYGULANMAZ (saglik/aktif'e
 * dokunmaz) — sadece sinyal döner, gerçek checkDeath çağrısı gameEngine.ts'te
 * mevcut olumTetiklendi deseniyle yapılır.
 */
export function vebaYillikKontrol(state: CharacterState, yasArtisi: number): VebaYillikSonuc {
  const sonuc: VebaYillikSonuc = { karakterOldu: false, mesajlar: [] };
  if (yasArtisi <= 0 || !state.veba?.aktif) return sonuc;
  const onlemli = state.veba.onlemAlindiMi;
  const olumSansi = onlemli ? VEBA_OLUM_IHTIMALI_ONLEMLI : VEBA_OLUM_IHTIMALI;
  const esSansi = onlemli ? VEBA_ES_KAYIP_IHTIMALI_ONLEMLI : VEBA_ES_KAYIP_IHTIMALI;
  const cocukSansi = onlemli ? VEBA_COCUK_KAYIP_IHTIMALI_ONLEMLI : VEBA_COCUK_KAYIP_IHTIMALI;

  for (let i = 0; i < yasArtisi && !sonuc.karakterOldu; i++) {
    if (Math.random() < olumSansi) {
      sonuc.karakterOldu = true;
      sonuc.mesajlar.push("Veba seni de bulmuştu.");
      break;
    }
    if (state.es_adi && Math.random() < esSansi) {
      const kaybedilenEs = state.es_adi;
      state.es_adi = null;
      state.es_puani = 0;
      state.es_meslek = null;
      state.es_rutbe = null;
      etiketSil(state, ["medeni:evli"]);
      hayatOlayiEkle(state, "💔", `${kaybedilenEs} vebaya yenik düştü`);
      sonuc.mesajlar.push(`💔 ${kaybedilenEs} vebaya yenik düştü.`);
    }
    const yasayanCocuklar = state.cocuklar.filter((c) => c.yasiyor);
    if (yasayanCocuklar.length > 0 && Math.random() < cocukSansi) {
      const secilen = yasayanCocuklar[Math.floor(Math.random() * yasayanCocuklar.length)];
      secilen.yasiyor = false;
      state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
      if (state.cocuk_sayisi === 0) etiketSil(state, ["cocuk_var"]);
      hayatOlayiEkle(state, "💔", `${secilen.isim} vebaya yenik düştü`);
      sonuc.mesajlar.push(`💔 ${secilen.isim} vebaya yenik düştü.`);
    }
  }
  return sonuc;
}

/** Aktif veba fazının (ölüm riski taşıyan dönem) süresi dolduysa kapatır; kira/maaş izi etkiBitisYili'ne kadar ayrıca sürer. */
export function vebaBitisKontrolEt(state: CharacterState): string | null {
  if (state.veba?.aktif && state.yil >= state.veba.bitisYili) {
    state.veba.aktif = false;
    state.ulke.vebada = false;
    return "🕊️ Salgın nihayet sona erdi, ama şehir yıllarca izlerini taşıyacak.";
  }
  if (state.veba && !state.veba.aktif && state.yil >= state.veba.etkiBitisYili) {
    state.veba = null;
  }
  return null;
}

// Yıllık getiri oranları (taban maliyetin yüzdesi olarak); enflasyonCarpani ile ölçeklenen
// taban_maliyet üzerine uygulanır. Değerler kasıtlı olarak "güvenli yatırım"dan (yıllık ~%5-6)
// belirgin şekilde daha oynak: mülkler dünyayı okumanın karşılığı, sabit gelir değil.
const MULK_GETIRI_NORMAL = 0.09;
const MULK_GETIRI_AVANTAJLI = 0.28;
const MULK_GETIRI_DEZAVANTAJLI = -0.15;
const MULK_DEMIRCI_SAVAS_CARPANI = 3;
const KERVAN_BATMA_IHTIMALI_YILLIK = 0.25;
const KARABORSA_SUC_ARTISI_YILLIK = 2;
const KARABORSA_AHLAK_ASINMASI_YILLIK = 0.3;

interface MulkGelirSonucu {
  toplamNet: number;
  kervanBatti: boolean;
}

/**
 * Sahip olunan tüm piyasa mülklerinin güncel (enflasyona göre ölçeklenmiş) toplam
 * değeri — zenginlik vergisinin nakit+mülk toplamına göre hesaplanmasında
 * (giderKalemleriHesapla) ve Finans ekranındaki servet dökümünde kullanılan tek
 * doğruluk kaynağı.
 */
export function gayrimenkulDegeriHesapla(state: CharacterState): number {
  if (state.mulkler.length === 0) return 0;
  const enflasyon = enflasyonCarpani(state);
  return state.mulkler.reduce((toplam, tur) => toplam + paraYuvarla(mulkTanimiGetir(tur).taban_maliyet * enflasyon), 0);
}

/**
 * Bir mülk türünün ŞU ANKİ dünya durumuna göre yıllık getiri oranını (taban
 * maliyetin yüzdesi) hesaplar; hem gerçek tur tikinde (mulkGelirleriUygula) hem
 * de istemciye "tahmini getiri" göstermek için salt-okunur önizlemede
 * (gameEngine.ts mulkConfigGetir) kullanılan tek doğruluk kaynağı.
 */
export function mulkGetiriOraniHesapla(tur: MulkTuru, ulke: CharacterState["ulke"]): number {
  if (tur === "ciftlik") {
    return ulke.kriz?.tur === "kitlik" ? MULK_GETIRI_DEZAVANTAJLI : ulke.ekonomi === "iyi" ? MULK_GETIRI_AVANTAJLI : MULK_GETIRI_NORMAL;
  }
  if (tur === "han") {
    return ulke.vebada || ulke.savasta
      ? MULK_GETIRI_DEZAVANTAJLI * 1.3
      : ulke.nufusDurumu === "artiyor" && !ulke.savasta
        ? MULK_GETIRI_AVANTAJLI
        : MULK_GETIRI_NORMAL;
  }
  if (tur === "demirci") {
    return ulke.savasta || ulke.kriz?.tur === "isyan" ? MULK_GETIRI_NORMAL * MULK_DEMIRCI_SAVAS_CARPANI : MULK_GETIRI_NORMAL * 0.3;
  }
  if (tur === "kervan") {
    return !ulke.savasta && ulke.ekonomi !== "kotu" ? MULK_GETIRI_AVANTAJLI * 1.1 : MULK_GETIRI_NORMAL * 0.5;
  }
  // karaborsa
  return ulke.kriz?.tur === "kitlik" || ulke.vebada || ulke.savasta ? MULK_GETIRI_AVANTAJLI * 1.2 : MULK_GETIRI_DEZAVANTAJLI * 0.5;
}

/**
 * Sahip olunan her mülkün yıllık getirisini/zararını state.ulke'nin GÜNCEL durumuna göre
 * yeniden hesaplar (Durum sistemindeki sabit tur_basi_para'nın aksine, her turda taze
 * hesaplanır). Kervan/gemi savaş sürerken her yıl bir ihtimalle tamamen kaybolabilir.
 */
export function mulkGelirleriUygula(state: CharacterState, yasArtisi: number): MulkGelirSonucu {
  if (yasArtisi <= 0 || state.mulkler.length === 0) return { toplamNet: 0, kervanBatti: false };
  const ulke = state.ulke;
  const enflasyon = enflasyonCarpani(state);
  let toplamNet = 0;
  let kervanBatti = false;

  for (const tur of [...state.mulkler]) {
    const taban = mulkTanimiGetir(tur).taban_maliyet * enflasyon;
    const oran = mulkGetiriOraniHesapla(tur, ulke);

    if (tur === "kervan" && ulke.savasta && Math.random() < KERVAN_BATMA_IHTIMALI_YILLIK * yasArtisi) {
      state.mulkler = state.mulkler.filter((m) => m !== "kervan");
      hayatOlayiEkle(state, "🌊", "Ticaret kervanı savaş yüzünden tamamen kayboldu");
      kervanBatti = true;
      continue;
    }
    if (tur === "karaborsa") {
      state.suc_seviyesi += KARABORSA_SUC_ARTISI_YILLIK * yasArtisi;
      state.ahlak -= KARABORSA_AHLAK_ASINMASI_YILLIK * yasArtisi;
    }

    toplamNet += paraYuvarla(taban * oran) * yasArtisi;
  }
  toplamNet = paraYuvarla(toplamNet);

  state.para = paraYuvarla(state.para + toplamNet);
  clampStats(state);
  return { toplamNet, kervanBatti };
}

const DEDIKODU_SAVAS: ((rakip: string) => string)[] = [
  (rakip) => `Sınır boylarında komutanlar asker topluyor... (${rakip} ile yakında savaş çıkabilir)`,
  (rakip) => `Tüccarlar ${rakip} sınırından artık mal geçirmek istemiyor, bir şeyler seziyorlar...`,
  (rakip) => `Kalelerde nöbetler sıklaştırıldı; ${rakip} ile gerginliğin büyüdüğü konuşuluyor...`,
];
const DEDIKODU_KITLIK: string[] = [
  "Gökler aylardır damla düşürmedi, köylüler endişeli... (Kuraklık/Kıtlık kapıda)",
  "Ambarlar hızla boşalıyor, ekmek fiyatları günden güne artıyor...",
];
const DEDIKODU_ISYAN: string[] = [
  "Meydanlarda öfkeli kalabalıklar toplanıyor, muhafızlar tedirgin...",
  "Vergilere isyan eden köylülerin silahlandığı söyleniyor...",
];
const DEDIKODU_NUFUS: string[] = [
  "Şehre her gün yeni göçmen kafileleri geliyor... (Nüfus artıyor)",
  "Sokaklar eskisinden çok daha kalabalık, her köşede yeni bir yüz var...",
];
const DEDIKODU_BOLLUK: string[] = [
  "Komşu ülkelerle barış antlaşmaları imzalandı, yollar güvenli... (Barış/Bolluk dönemi)",
  "Pazarlar dolup taşıyor, kimsenin bir şikayeti yok; bu huzur ne kadar sürer kim bilir...",
];
const DEDIKODU_SAKIN: string[] = [
  "Bugünlerde ortalık sakin, herkes kendi işine bakıyor...",
  "Meydanda konuşulacak pek bir şey yok, sıradan bir gün...",
];

/**
 * Yatırım ekranının üstünde gösterilen "piyasa dedikoduları" — savaş için
 * tarihiSavaslar.ts'teki sabit tarih tablosuna bakarak GERÇEK bir öngörü verir;
 * kıtlık/isyan/nüfus/bolluk için ise şu anki dünya durumunu yorumlar (ayrı bir
 * gelecek-olay takvimi kurulmadı, bkz. plan notu).
 */
export function piyasaDedikodulariUret(state: CharacterState): string[] {
  const dedikodular: string[] = [];
  const gelecekRakip = !state.ulke.savasta ? gelecekSavasKontrol(state.bolge, state.yil, state.cag) : null;
  if (gelecekRakip) dedikodular.push(sec(DEDIKODU_SAVAS)(gelecekRakip));
  if (state.ulke.kriz?.tur === "kitlik") dedikodular.push(sec(DEDIKODU_KITLIK));
  if (state.ulke.kriz?.tur === "isyan") dedikodular.push(sec(DEDIKODU_ISYAN));
  if (state.ulke.nufusDurumu === "artiyor") dedikodular.push(sec(DEDIKODU_NUFUS));
  if (!state.ulke.savasta && state.ulke.ekonomi === "iyi") dedikodular.push(sec(DEDIKODU_BOLLUK));
  if (dedikodular.length === 0) dedikodular.push(sec(DEDIKODU_SAKIN));
  return dedikodular;
}

// ---------------------------------------------------------------------------
// Mağaza: dinamik fiyatlar + envanter bozulması
// ---------------------------------------------------------------------------

/**
 * Bir mağaza eşyasının ŞU ANKİ dünya durumuna (savaş/veba/kriz/ekonomi) ve
 * enflasyona göre satış fiyatını hesaplar — mulkGetiriOraniHesapla ile aynı
 * felsefe: eşyanın kendi fiyatEtkenleri'nden sadece aktif olan durumlar
 * çarpımsal olarak devreye girer, tanımlanmayanlar 1 (etkisiz) sayılır.
 * Hem satın alma anında (magazadanSatinAl) hem de mağaza ekranının canlı
 * fiyat önizlemesinde (gameEngine.ts magazaConfigGetir) kullanılan tek
 * doğruluk kaynağıdır.
 */
export function magazaFiyatiHesapla(esya: MagazaEsyasiTanimi, state: CharacterState): number {
  const ulke = state.ulke;
  const e = esya.fiyatEtkenleri ?? {};
  let carpan = 1;
  if (ulke.savasta) carpan *= e.savasta ?? 1;
  if (ulke.vebada) carpan *= e.vebada ?? 1;
  if (ulke.kriz?.tur === "kitlik") carpan *= e.kitlik ?? 1;
  if (ulke.kriz?.tur === "isyan") carpan *= e.isyan ?? 1;
  if (ulke.kriz?.tur === "altin_cag") carpan *= e.altin_cag ?? 1;
  if (ulke.ekonomi === "iyi") carpan *= e.ekonomiIyi ?? 1;
  if (ulke.ekonomi === "kotu") carpan *= e.ekonomiKotu ?? 1;
  return Math.max(1, paraYuvarla(esya.tabanFiyat * carpan * enflasyonCarpani(state)));
}

/** "sifa" satın alımından sonra TÜM sifa kategorisinin kaç yıl kilitleneceği — oyuncu ilaç/erzak stoklayıp sürekli sürekli alışveriş yapamasın diye (bkz. §26). */
export const TEMEL_MAGAZA_KILIT_SURESI_YIL = 3;

/** state.magaza_temel_kilit_bitis_yili'ne göre "sifa" kategorisinin şu an kilitli olup olmadığı. */
export function temelMagazaKilitliMi(state: CharacterState): boolean {
  return state.magaza_temel_kilit_bitis_yili !== null && state.yil < state.magaza_temel_kilit_bitis_yili;
}

/** Sahip olunan bir "luks" eşyanın periyodik bakım/vergi masrafı: her seferinde bu aralıktan rastgele bir yıl sonra tekrar tetiklenir. */
const LUKS_BAKIM_ARALIGI_MIN_YIL = 8;
const LUKS_BAKIM_ARALIGI_MAX_YIL = 10;
/** Bakım masrafı, eşyanın GÜNCEL (enflasyona göre ölçeklenmiş) değerinin yaklaşık bu oranı kadardır. */
const LUKS_BAKIM_ORANI = 0.2;

export function rastgeleLuksBakimAraligi(): number {
  return (
    LUKS_BAKIM_ARALIGI_MIN_YIL +
    Math.floor(Math.random() * (LUKS_BAKIM_ARALIGI_MAX_YIL - LUKS_BAKIM_ARALIGI_MIN_YIL + 1))
  );
}

/**
 * Yuvarlanmış bir masraf tutarının son basamağının 0 ya da 5 olmasını
 * engeller (ör. "20" yerine "23") — düz/yuvarlak sayılar yapay durduğu için
 * salt kozmetik bir gerçekçilik dokunuşu; tutarın büyüklüğünü anlamlı
 * ölçüde değiştirmez (en fazla ±4).
 */
function sonBasamagiDuzelt(miktar: number): number {
  const tam = Math.max(1, Math.round(miktar));
  const sonBasamak = tam % 10;
  if (sonBasamak === 0 || sonBasamak === 5) {
    return tam + 1 + Math.floor(Math.random() * 4); // +1..+4: 0→1-4, 5→6-9, ikisi de bir daha 0/5'e düşmez
  }
  return tam;
}

export interface EnvanterBozulmaSonucu {
  /** Kullanılmadan ömrü dolup çürüyen "sifa" eşyalarının adları. */
  cozulenler: string[];
  /** Bu turda periyodik bakım masrafı tetiklenen "luks" eşyalar ve ödenen tutar (eşya envanterden SİLİNMEZ). */
  bakimOdemeleri: { ad: string; miktar: number }[];
}

/**
 * Her oyun turunda (yasArtisi = o turda geçen gerçek yıl sayısı) çağrılır.
 * kalanYil:null olan kayıt yoktur artık — anlamı kategoriye göre ayrışır:
 * - "sifa": kalanYil geçen yıl kadar azalır; 0'a inince eşya sessizce (etkisi
 *   hiç uygulanmadan) envanterden düşer — oyuncu sonsuza kadar ilaç/erzak
 *   biriktiremesin diye.
 * - "luks": kalanYil geçen yıl kadar azalır; 0'a inince eşyanın GÜNCEL
 *   değerinin ~%20'si kadar bir bakım/vergi masrafı state.para'dan düşer ve
 *   sayaç yeni bir rastgele 8-10 yıl aralığıyla sıfırlanır — eşyanın kendisi
 *   SİLİNMEZ, kalıcı mülkiyet devam eder.
 */
export function envanterBozulmasiUygula(state: CharacterState, yasArtisi: number): EnvanterBozulmaSonucu {
  const cozulenler: string[] = [];
  const bakimOdemeleri: { ad: string; miktar: number }[] = [];
  if (yasArtisi <= 0) return { cozulenler, bakimOdemeleri };

  const kalanlar: SahipOlunanEsya[] = [];
  for (const esya of state.magaza_envanteri) {
    const yeniKalanYil = (esya.kalanYil ?? 0) - yasArtisi;

    if (esya.kategori === "sifa") {
      if (yeniKalanYil <= 0) cozulenler.push(esya.ad);
      else kalanlar.push({ ...esya, kalanYil: yeniKalanYil });
      continue;
    }

    // luks: periyodik bakım — kalıcı, sadece masraf çıkar ve sayaç sıfırlanır
    if (yeniKalanYil <= 0) {
      const tanim = magazaEsyasiTanimiGetir(esya.katalogId);
      const guncelDeger = Math.round(tanim.tabanFiyat * enflasyonCarpani(state));
      const masraf = sonBasamagiDuzelt(guncelDeger * LUKS_BAKIM_ORANI);
      state.para -= masraf;
      bakimOdemeleri.push({ ad: esya.ad, miktar: masraf });
      kalanlar.push({ ...esya, kalanYil: rastgeleLuksBakimAraligi() });
    } else {
      kalanlar.push({ ...esya, kalanYil: yeniKalanYil });
    }
  }
  state.magaza_envanteri = kalanlar;
  return { cozulenler, bakimOdemeleri };
}
