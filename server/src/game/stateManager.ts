import { randomUUID } from "crypto";
import { CharacterState, Cag, Kategori, SonucEtkisi, YatkinlikKaynagi, KisilikEksenleri, UlkeKrizi, HayatAmaci } from "../types";
import { AILELER, AileTanimi } from "../data/aileler";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import { rutbeTanimiGetir, RutbeEsigi, RutbeTanimi } from "../data/rutbeler";
import { YerlesimTanimi, yerlesimGetir, yerlesimIdByAd } from "../data/yerlesimler";
import { konutGetir, VARSAYILAN_KONUT_ID, TASINMA_MALIYETI } from "../data/konutlar";
import { yasamSecenegiGetir, VARSAYILAN_YASAM_SECIMI_ID } from "../data/yasamSecenekleri";
import { rastgeleIkiIsimSec, rastgeleBirIsimSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { liderGetir } from "../data/liderler";
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
import { tarihiSavasKontrol } from "../data/tarihiSavaslar";

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

const TEMEL_MAAS: Record<string, number> = { Asker: 9, Tüccar: 10, "Din Adamı": 8 };

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
 * çarpanı: her 5 oyun turunda (yaklaşık 5-15 yıl) bileşik %2 büyür. Hem maaş
 * hem yaşam/konut giderleri buna göre şişer, böylece reel denge bozulmaz ama
 * uzun oyunlarda nominal sayılar zamanla anlamlı şekilde büyür.
 */
const ENFLASYON_DONEM_TUR = 5;
const ENFLASYON_DONEM_ORANI = 0.02;

export function enflasyonCarpani(turSayisi: number): number {
  const donem = Math.floor(turSayisi / ENFLASYON_DONEM_TUR);
  return Math.pow(1 + ENFLASYON_DONEM_ORANI, donem);
}

/** Finans ekranında gösterilecek toplam enflasyon yüzdesi (oyunun başından bu yana). */
export function enflasyonYuzdesiHesapla(turSayisi: number): number {
  return Math.round((enflasyonCarpani(turSayisi) - 1) * 100);
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
  const ulkeCarpani =
    (state.ulke.ekonomi === "kotu" ? 0.8 : state.ulke.ekonomi === "iyi" ? 1.15 : 1) *
    (state.ulke.savasta ? 0.85 : 1);

  const ham =
    temel *
    (1 + yildizSeviyesi * 0.25) *
    (1 + kariyerYili * 0.02) *
    maasCarpaniGetir(state) *
    durumCarpani *
    ulkeCarpani *
    enflasyonCarpani(state.tur_sayisi) *
    sehirYonetimMaasCarpani(state.sehir_yonetim_seviyesi);
  return Math.max(1, Math.round(ham));
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
    kultur: 10,
    ordu_mevcudu: 0,
    ordu_techizat_seviyesi: 0,
    ticaret_sermaye: 0,
    nufuz: 0,
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
    ulke: { savasta: false, vebada: false, ekonomi: "normal", kriz: null },
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
  state.kultur = clamp(state.kultur, 0, 100);
  state.dost_puani = clamp(state.dost_puani, 0, 100);
  state.rakip_puani = clamp(state.rakip_puani, 0, 100);
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

export function ilerletYas(state: CharacterState, minYil = 1, maxYil = 3): number {
  const artis = minYil + Math.floor(Math.random() * (maxYil - minYil + 1));
  state.yas += artis;
  state.yil += artis;
  state.tur_sayisi += 1;
  state.hukumdar = liderGetir(state.bolge, state.yil, state.cag);
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
}

export interface EkonomiSonucu {
  borcaGirdi: boolean;
  netGelir: number;
  yillikGelirler: number[];
  faiz: number;
  giderKalemleri: GiderKalemleri;
}

const EVCIL_HAYVAN_GIDERI_YILLIK = 1;

/** Karakterin yerleşimine göre yaşam giderine uygulanan çarpanı döner (en fazla ±%2). */
function yasamMaliyetCarpaniGetir(state: CharacterState): number {
  const yerlesim = yerlesimGetir(yerlesimIdByAd(state.yerlesim));
  return yerlesim?.yasamMaliyetCarpani ?? 1;
}

/** Zenginleşmenin "görünmez bakım masrafı": bu eşiğin üstündeki her birim servet için yıllık %4 pasif vergi/bakım gideri işler. Sıradan bir karakteri hiç etkilemez, servet biriktikçe fark edilir hale gelir. */
const ZENGINLIK_VERGISI_ESIGI = 200;
const ZENGINLIK_VERGISI_ORANI = 0.04;

function zenginlikVergisiHesapla(para: number): number {
  if (para <= ZENGINLIK_VERGISI_ESIGI) return 0;
  return Math.round((para - ZENGINLIK_VERGISI_ESIGI) * ZENGINLIK_VERGISI_ORANI);
}

/** Bir sonraki turun gider dökümünü, gerçekte uygulamadan hesaplar; Finans ekranı bunu kullanır. */
export function giderKalemleriHesapla(state: CharacterState): GiderKalemleri {
  const enflasyon = enflasyonCarpani(state.tur_sayisi);
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  return {
    yasam: Math.round((yasamSecenegi?.maliyetYillik ?? 0) * yasamMaliyetCarpaniGetir(state) * enflasyon),
    konut: Math.round((konutGetir(state.konut_id)?.kiraYillik ?? 0) * enflasyon),
    ekip: state.ekip.reduce((toplam, uye) => toplam + uye.maas, 0),
    evcilHayvan: state.evcil_hayvan ? Math.round(EVCIL_HAYVAN_GIDERI_YILLIK * enflasyon) : 0,
    vergi: zenginlikVergisiHesapla(state.para),
  };
}

export function pasifEkonomiUygula(state: CharacterState, yasArtisi: number): EkonomiSonucu {
  state.maas_yillik = hesaplaMaasYillik(state);
  const giderKalemleri = giderKalemleriHesapla(state);
  const gider =
    giderKalemleri.yasam + giderKalemleri.konut + giderKalemleri.ekip + giderKalemleri.evcilHayvan + giderKalemleri.vergi;

  // Gelir her yıl ayrı ayrı dalgalanır: bereketli yıl, kötü hasat, durgun pazar...
  const yillikGelirler: number[] = [];
  let netGelir = 0;
  for (let i = 0; i < yasArtisi; i++) {
    const dalga = 0.75 + Math.random() * 0.5; // 0.75x - 1.25x
    const oYilkiGelir = Math.max(0, Math.round(state.maas_yillik * dalga));
    yillikGelirler.push(oYilkiGelir);
    netGelir += oYilkiGelir - gider;
  }
  state.para += netGelir;
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
    faiz = Math.round(Math.abs(state.para) * 0.06 * yasArtisi);
    state.para -= faiz;
    state.saglik -= 2 * yasArtisi;
    borcaGirdi = true;
  }
  clampStats(state);
  return { borcaGirdi, netGelir, yillikGelirler, faiz, giderKalemleri };
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
 * Seçimin ardından olayın etkilerini, çevrenin tepkisini ve karakterin
 * içinde bulunduğu durumu anlatan çok cümleli bir paragraf üretir.
 */
export function sonucAnlatimiUret(
  state: CharacterState,
  etki: SonucEtkisi,
  basarili: boolean
): string {
  const cumleler: string[] = [];

  if (etki.detay) cumleler.push(etki.detay);

  if (etki.para) {
    const miktar = Math.abs(etki.para);
    if (etki.para > 0) {
      cumleler.push(
        sec([
          `Kesene giren ${miktar} ${state.para_birimi} birkaç haftalık rahatlık demekti; ilk kez uzun uzun düşünmeden alışveriş yaptın.`,
          `${miktar} ${state.para_birimi} kazandın. Parayı sayarken elinin hafifçe titrediğini fark ettin.`,
          `Bu işten ${miktar} ${state.para_birimi} kaldı geriye; bir kısmını sakladın, bir kısmını borçlarına yatırdın.`,
        ])
      );
    } else {
      cumleler.push(
        sec([
          `${miktar} ${state.para_birimi} kaybettin. Kesenin hafifliği her adımda kendini hatırlattı.`,
          `Cebinden çıkan ${miktar} ${state.para_birimi} için haftalarca çalışman gerekmişti; gitmesi bir gün sürdü.`,
          `${miktar} ${state.para_birimi} eksildi. O akşam yemeği daha sade yedin.`,
        ])
      );
    }
  }

  if (etki.saglik) {
    if (etki.saglik > 0) {
      cumleler.push(
        sec([
          "Bedenin toparlandı; sabahları kalkmak eskisi kadar zor değil.",
          "Kendini uzun zamandır olmadığı kadar dinç hissediyorsun.",
        ])
      );
    } else if (Math.abs(etki.saglik) >= 25) {
      cumleler.push(
        sec([
          "Aldığın hasar ağırdı. Günlerce yatakta kaldın, ateşin ve ağrın hiç dinmedi.",
          "Yaraların derindi; iyileşmen haftalar sürdü ve bir daha eskisi gibi olmayacağını hissettin.",
        ])
      );
    } else {
      cumleler.push(
        sec([
          "Bedeninde kalan sızı birkaç hafta boyunca sana bu günü hatırlattı.",
          "Ufak tefek yaralarını kendin sardın, kimseye çaktırmadın.",
        ])
      );
    }
  }

  if (etki.un) {
    if (etki.un > 0) {
      cumleler.push(
        sec([
          `${state.bolge} sokaklarında adın anılmaya başladı; tanımadığın insanlar seni selamlıyor.`,
          "Hikaye ağızdan ağıza dolaştı ve her anlatımda biraz daha büyüdü. İtibarın arttı.",
          "Artık bir odaya girdiğinde birkaç kişi başını çeviriyor.",
        ])
      );
    } else {
      cumleler.push(
        sec([
          "Dedikodu hızla yayıldı. Bazı kapılar artık sana biraz daha geç açılıyor.",
          `${state.bolge} çevrende adın eskisi kadar güvenle anılmıyor.`,
          "İtibarın zedelendi; bunu insanların bakışlarından anlıyorsun.",
        ])
      );
    }
  }

  if (etki.ahlak) {
    if (etki.ahlak > 0) {
      cumleler.push(
        sec([
          "Geceleri vicdanın rahat uyuyor; bu, sandığından daha değerli bir şey.",
          "Doğru olanı yaptığını biliyorsun ve bu bilgi seni ayakta tutuyor.",
        ])
      );
    } else {
      cumleler.push(
        sec([
          "Kendine bunun mecburiyetten olduğunu söyledin ama tam olarak inanamadın.",
          "O geceden sonra aynaya bakmak biraz zorlaştı.",
          "Yaptığın şey seni rahatsız ediyor; yine de aynısını tekrar yapabileceğini de biliyorsun.",
        ])
      );
    }
  }

  if (etki.yeni_meslek) {
    cumleler.push(
      `Artık ${etki.yeni_meslek.toLocaleLowerCase("tr")} olarak anılıyorsun; eski hayatın geride kaldı.`
    );
  }

  if (etki.durum_ekle) {
    cumleler.push(
      etki.durum_ekle.tur === "kalici"
        ? `${etki.durum_ekle.ad} artık hayatının kalıcı bir parçası, ömrünün sonuna kadar seninle.`
        : `${etki.durum_ekle.ad} bir süre daha peşini bırakmayacak.`
    );
  }

  if (cumleler.length === 0) {
    cumleler.push(
      basarili
        ? "Olay sessizce kapandı; hayatında somut bir şey değişmedi ama tecrübe kazandın."
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
        : "Borcun hâlâ kapanmadı, tefecilerin adamları kapının önünden geçiyor."
    );
  } else if (surenHastalik) {
    cumleler.push(`${surenHastalik.ad} bu süre boyunca da seni yatağa düşürmeye devam etti.`);
  } else if (state.ulke.vebada) {
    cumleler.push("Salgın hâlâ sokaklardaydı; cenaze alayları gündelik manzaranın parçası olmuştu.");
  } else if (state.ulke.savasta) {
    cumleler.push("Savaş sürüyordu; pazarlar durgun, insanlar tedirgindi.");
  } else if (state.ulke.ekonomi === "kotu") {
    cumleler.push("Ekonomik darlık herkesi vurmuştu, ekmek fiyatları her ay biraz daha arttı.");
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
