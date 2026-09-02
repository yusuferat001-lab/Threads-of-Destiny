import { randomUUID } from "crypto";
import { CharacterState, Cag, Kategori, SonucEtkisi, YatkinlikKaynagi, KisilikEksenleri, UlkeKrizi, HayatAmaci, MulkTuru, SahipOlunanEsya } from "../types";
import { AILELER, AileTanimi } from "../data/aileler";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import {
  rutbeTanimiGetir,
  RutbeEsigi,
  RutbeTanimi,
  TERFI_COOLDOWN,
  rutbeMaasCarpani,
  KARIYER_PUANI_YILLIK,
  KARIYER_PUANI_YATIRIM,
} from "../data/rutbeler";
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

// Taban değerler (özgün: Asker 9 / Tüccar 10 / Din Adamı 8) üzerine iki genel zam:
// 2026-08'de +%10, 2026-09'da (yama #2) ayrıca +%5 → toplam ×1.155. Her meslek ve
// çağda orantılı yansır (rütbe/enflasyon/itibar zaten ayrı çarpan kalemleri).
const TEMEL_MAAS: Record<string, number> = { Asker: 10.395, Tüccar: 11.55, "Din Adamı": 9.24 };

/**
 * "İtibarın" maaş düzenleyicisi: mutluluk + şöhret(un) + ahlak'ı TEK bir kaleme
 * birleştirir. Her stat 5 banda ayrılır; yüzdeler TOPLANIR ve maaşa
 * `× (1 + toplam/100)` girer. 2026-09: etkiler yumuşatıldı (−%4/−%2/0/+%2/+%4)
 * ve bantlar stata göre ayrıştı:
 *  - Mutluluk & Ahlak: nötr bant 40-60 (altı ceza, üstü bonus).
 *  - Şöhret: nötr bant çok daha düşükten başlar (taze/mütevazı bir karakter az
 *    tanınıyor diye maaşça cezalandırılmasın; ün yüksekken küçük bir prim).
 * Tavan/taban YOK — üçü de dipteyse −%12, üçü de zirvedeyse +%12.
 */
function itibarDegerYuzdesi(deger: number): number {
  if (deger <= 25) return -4;
  if (deger <= 40) return -2;
  if (deger <= 60) return 0;
  if (deger <= 78) return 2;
  return 4;
}

function itibarUnYuzdesi(un: number): number {
  if (un <= 8) return -4;
  if (un <= 16) return -2;
  if (un <= 50) return 0;
  if (un <= 75) return 2;
  return 4;
}

export function itibarMaasKirilimi(state: CharacterState): { toplam: number; kalemler: MaasKirilimKalemi[] } {
  const kalemler: MaasKirilimKalemi[] = [
    { ad: "Mutluluk", yuzde: itibarDegerYuzdesi(state.mutluluk) },
    { ad: "Şöhret", yuzde: itibarUnYuzdesi(state.un) },
    { ad: "Ahlak", yuzde: itibarDegerYuzdesi(state.ahlak) },
  ];
  return { toplam: kalemler.reduce((s, k) => s + k.yuzde, 0), kalemler };
}

/** Kökenden ve olaylardan gelen kalıcı maaş çarpanı; state üzerinde etiket olarak taşınır. */
const MAAS_CARPANI_ETIKET_ONEKI = "maas_carpani:";

export function maasCarpaniGetir(state: CharacterState): number {
  const etiket = state.etiketler.find((e) => e.startsWith(MAAS_CARPANI_ETIKET_ONEKI));
  if (!etiket) return 1;
  const deger = Number(etiket.slice(MAAS_CARPANI_ETIKET_ONEKI.length));
  return Number.isFinite(deger) && deger > 0 ? deger : 1;
}

/** Kalıcı maaş çarpanının toplam üst/alt sınırı: olay + aile + ekip + yatırım bonusları hep bu bandın içinde kalır. */
export const MAAS_CARPANI_TAVAN = 1.4;
export const MAAS_CARPANI_TABAN = 0.6;

/**
 * Kalıcı maaş çarpanına bir katkı uygular.
 *  - `ham` FALSE (varsayılan): pozitif katkı yarıya indirilir (`1 + (carpan-1)*0.5`)
 *    — dağınık ~80 olay + ekip bonusunu tek noktadan kısmak için. Negatif katkı
 *    (kötü olay, ayyaşlık) aynen geçer.
 *  - `ham` TRUE: katkı olduğu gibi uygulanır — doğuşta bir kez verilen kimlik
 *    ödülleri için (yerleşim farkı, aile mirası, kendi işine yatırımın +%5'i).
 * Her durumda toplam çarpan [TABAN, TAVAN] bandına kırpılır.
 */
export function maasCarpaniUygula(state: CharacterState, carpan: number, ham = false): void {
  const etkin = !ham && carpan > 1 ? 1 + (carpan - 1) * 0.5 : carpan;
  const ham_yeni = maasCarpaniGetir(state) * etkin;
  const yeni = Math.min(MAAS_CARPANI_TAVAN, Math.max(MAAS_CARPANI_TABAN, ham_yeni));
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

/**
 * Şehir yönetimine bir kez girmek maaşa kalıcı, SABİT +%8 katar — seviyeyle
 * ölçeklenmez (seviye/unvan yalnızca prestij içindir, maaşa ek katkısı yoktur).
 */
const SEHIR_YONETIM_MAAS_CARPANI_ADIM = 0.08;

export function sehirYonetimMaasCarpani(seviye: number): number {
  return seviye >= 1 ? 1 + SEHIR_YONETIM_MAAS_CARPANI_ADIM : 1;
}

/** state.sehir_yonetim_unvan'ı güncel seviye+mesleğe göre yeniden hesaplar. */
export function sehirYonetimGuncelle(state: CharacterState): void {
  state.sehir_yonetim_unvan = sehirYonetimUnvanGetir(state.meslek, state.sehir_yonetim_seviyesi);
}

/**
 * Maaş formülünün taban değeri + sıralı çarpan kalemleri. Hem hesaplaMaasYillik
 * hem de Finans ekranındaki maaş kırılımı (maasKirilimHesapla) bunu kullanır —
 * formül tek yerde tanımlı kalsın, ikisi asla birbirinden kaymasın diye.
 * `grup`: "rutbe" → doğrudan rütbe primi (rütbe asla düşmediği için kalıcı);
 * "kariyer" → kıdem/şehir yönetimi/kalıcı ödüller (hepsi kalıcı birikim);
 * "itibar" → mutluluk/şöhret/ahlak birleşik düzenleyicisi (itibarMaasKirilimi, değişken);
 * "donemsel" → enflasyon/ekonomi/savaş/salgın/geçici durumlar (dünya durumu
 * değiştikçe değişen, kalıcı olmayan etkiler).
 */
type MaasCarpanGrubu = "rutbe" | "kariyer" | "itibar" | "donemsel";
interface MaasCarpanKalemi {
  ad: string;
  carpan: number;
  grup: MaasCarpanGrubu;
}

function maasCarpanKalemleri(state: CharacterState): { tabanMaas: number; kalemler: MaasCarpanKalemi[] } {
  const tabanMaas = TEMEL_MAAS[state.meslek] ?? 6;
  const itibarToplam = itibarMaasKirilimi(state).toplam; // mutluluk+şöhret+ahlak bantları toplamı, ±%; §13
  // Kıdem çok yavaş büyür ve en fazla +%10'a ulaşır: 40 tur (≈55-65 oyun yılı,
  // yani neredeyse tam bir ömür) sonunda tavana gelir. Eskiden +%2/tur ile
  // 20 turda +%40'a çıkıyordu; artık +%0.25/tur.
  const kariyerYili = Math.min(state.tur_sayisi + 8, 40); // "ikinci seviyeden" başlar: taze karakter +%2 kıdem alır, tavan yine +%10
  const durumCarpani = state.durumlar.reduce((c, d) => c * (d.gelir_carpani ?? 1), 1);
  // Veba sonrası işçi kıtlığı, salgın hem aktifken hem de izi süren yıllarda maaşı büyütür.
  const vebaCarpani = state.veba && state.yil < state.veba.etkiBitisYili ? state.veba.gelirCarpani : 1;
  const ekonomiCarpani = state.ulke.ekonomi === "kotu" ? 0.8 : state.ulke.ekonomi === "iyi" ? 1.15 : 1;
  const ekonomiAd =
    state.ulke.ekonomi === "iyi" ? "Ekonomi iyi" : state.ulke.ekonomi === "kotu" ? "Ekonomi kötü" : "Ekonomi normal";

  return {
    tabanMaas,
    kalemler: [
      { ad: "Kıdem", carpan: 1 + kariyerYili * 0.0025, grup: "kariyer" },
      { ad: "Şehir yönetimi", carpan: sehirYonetimMaasCarpani(state.sehir_yonetim_seviyesi), grup: "kariyer" },
      { ad: "Kalıcı ödüller (köken + olaylar)", carpan: maasCarpaniGetir(state), grup: "kariyer" },
      { ad: "İtibarın (mutluluk·şöhret·ahlak)", carpan: 1 + itibarToplam / 100, grup: "itibar" },
      { ad: "Enflasyon", carpan: enflasyonCarpani(state), grup: "donemsel" },
      { ad: ekonomiAd, carpan: ekonomiCarpani, grup: "donemsel" },
      { ad: "Savaş", carpan: state.ulke.savasta ? 0.85 : 1, grup: "donemsel" },
      { ad: "Salgın (işçi kıtlığı)", carpan: vebaCarpani, grup: "donemsel" },
      { ad: "Geçici durumlar", carpan: durumCarpani, grup: "donemsel" },
      { ad: "Rütbe primi", carpan: rutbeMaasCarpani(state.rutbe_seviye), grup: "rutbe" },
    ],
  };
}

export function hesaplaMaasYillik(state: CharacterState): number {
  const { tabanMaas, kalemler } = maasCarpanKalemleri(state);
  const ham = kalemler.reduce((acc, k) => acc * k.carpan, tabanMaas);
  return Math.max(1, paraYuvarla(ham));
}

export interface MaasKirilimKalemi {
  ad: string;
  /** Yüzde katkı: +40 → maaşı ×1.40 yapar; −15 → ×0.85. 0 = etkisiz (listede gösterilmez). */
  yuzde: number;
}

export interface MaasKirilim {
  /** Mesleğin çarpansız taban maaşı. */
  tabanMaas: number;
  /** hesaplaMaasYillik ile birebir aynı nihai değer — gösterimde "bu yılki maaş". */
  maasYillik: number;
  rutbeAd: string;
  rutbeSeviye: number;
  /** Rütbe priminin yüzdesi (rutbeMaasCarpani). Rütbe asla düşmediği için KALICI. */
  rutbeYuzde: number;
  /** Kıdem + şehir yönetimi + kalıcı ödüllerin birleşik yüzdesi. KALICI birikim. */
  kariyerYuzde: number;
  kariyerKalemler: MaasKirilimKalemi[];
  /** "İtibarın": mutluluk + şöhret + ahlak bant yüzdelerinin TOPLAMI (±). DEĞİŞKEN — statlar oynadıkça oynar. */
  itibarYuzde: number;
  itibarKalemler: MaasKirilimKalemi[];
  /** Ekonomi + savaş + salgın + geçici durumların birleşik yüzdesi (enflasyon HARİÇ — o oyuncuya gizli). DÖNEMSEL — dünya durumu değiştikçe değişir. Gösterilen kalemlerle uyumludur. */
  donemselYuzde: number;
  donemselKalemler: MaasKirilimKalemi[];
}

const carpanYuzdesi = (carpan: number): number => Math.round((carpan - 1) * 100);

/**
 * Yıllık maaşın hangi bileşenlerden oluştuğunu, "kalıcı mı yoksa dünya değiştikçe
 * değişecek mi" ayrımıyla döner — Finans ekranı "maaşım neden bir anda arttı"
 * sorusuna buradan cevap verir. hesaplaMaasYillik ile aynı kalemleri kullanır.
 */
export function maasKirilimHesapla(state: CharacterState): MaasKirilim {
  const { tabanMaas, kalemler } = maasCarpanKalemleri(state);
  const itibar = itibarMaasKirilimi(state);
  // Enflasyon kalemi oyuncudan tamamen gizli (2026-09). Gösterilen "dönemsel"
  // yüzdesine de KATILMAZ — aksi halde görünür kalemler (Savaş −%15, Ekonomi
  // kötü −%20 ...) grup toplamıyla uyuşmuyordu: gizli +%X enflasyon araya girip
  // "Savaş −%15" satırını grup başlığında −%7 gibi gösteriyordu. Enflasyon gerçek
  // maaşa hesaplaMaasYillik içinde uygulanmaya devam ediyor; burada yalnızca
  // oyuncuya gösterilen kırılım hizalanıyor.
  const gorunurKalem = (k: MaasCarpanKalemi) => k.ad !== "Enflasyon";
  const grupCarpani = (grup: MaasCarpanGrubu): number =>
    kalemler.filter((k) => k.grup === grup && gorunurKalem(k)).reduce((acc, k) => acc * k.carpan, 1);
  const grupKalemler = (grup: MaasCarpanGrubu): MaasKirilimKalemi[] =>
    kalemler
      .filter((k) => k.grup === grup && gorunurKalem(k) && k.carpan !== 1)
      .map((k) => ({ ad: k.ad, yuzde: carpanYuzdesi(k.carpan) }));

  return {
    tabanMaas: paraYuvarla(tabanMaas),
    maasYillik: hesaplaMaasYillik(state),
    rutbeAd: state.rutbe,
    rutbeSeviye: state.rutbe_seviye,
    rutbeYuzde: carpanYuzdesi(rutbeMaasCarpani(state.rutbe_seviye)),
    kariyerYuzde: carpanYuzdesi(grupCarpani("kariyer")),
    kariyerKalemler: grupKalemler("kariyer"),
    itibarYuzde: itibar.toplam,
    itibarKalemler: itibar.kalemler, // üçü de gösterilir (0 olanlar dahil)
    donemselYuzde: carpanYuzdesi(grupCarpani("donemsel")),
    donemselKalemler: grupKalemler("donemsel"),
  };
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
  if (state.meslek === "Tüccar") return 1 + state.ticaret_sermaye / 180;
  if (state.meslek === "Din Adamı") return 1 + state.nufuz / 180;
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
    ad: "Efsanevi Bir Şöhret Kazanmak",
    aciklama: "Şöhretini neredeyse zirveye taşı.",
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
  oyuncuIsmi?: string
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
  const aile = agirlikliAileSec(cag);
  const kisilik = rastgeleKisilikCifti();
  const { yatkinliklar, kaynaklar } = yatkinlikHesapla(kisilik, aile, yerlesim);
  const [dostAdi, rakipAdi] = rastgeleIkiIsimSec(cag, bolge);
  const hayatAmaci = HAYAT_AMACI_SECENEKLERI[Math.floor(Math.random() * HAYAT_AMACI_SECENEKLERI.length)];
  const anneAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "kadin", [dostAdi, rakipAdi]);
  const babaAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "erkek", [dostAdi, rakipAdi, anneAdi]);

  const state: CharacterState = {
    id: randomUUID(),
    isim: oyuncuIsmi?.trim() ? oyuncuIsmi.trim().slice(0, 40) : null,
    yil,
    baslangic_yili: yil,
    yas: 15,
    meslek: "",
    rutbe: "",
    rutbe_seviye: 1,
    kariyer_puani: 0,
    son_terfi_yili: yil,
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
    // Başlangıç statları (aile bonusları hariç): mutluluk/ahlak 50 (itibar
    // bandında tam nötr, 40-60 arası), şöhret 20 (taze bir karakter az tanınır
    // ama şöhretin nötr bandı düşükten başladığı için ceza yemez, bkz.
    // itibarUnYuzdesi). İlk olaylar bu değerleri kolayca oynatır.
    mutluluk: 50,
    para: 20 + (aile.para ?? 0) + (yerlesim.para ?? 0),
    para_birimi: paraBirimiGetir(cag, bolge),
    maas_yillik: 0,
    un: 20 + (aile.un ?? 0),
    ahlak: 50 + (aile.ahlak ?? 0),
    ordu_mevcudu: 0,
    ordu_techizat_seviyesi: 0,
    ticaret_sermaye: 0,
    nufuz: 0,
    suc_seviyesi: 0,
    mulkler: [],
    mulk_bakim_kalan: {},
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
    son_zenginlik_sizinti_yili: null,
    buyuk_savas: null,
    son_buyuk_savas_bitis_yili: null,
    veba: null,
    veba_gecirdi: false,
    son_veba_bitis_yili: null,
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

  // Doğuş kimliği ödülleri: yarıya indirme uygulanmadan (ham) verilir.
  if (aile.maasCarpani) maasCarpaniUygula(state, aile.maasCarpani, true);
  if (yerlesim.maasCarpani) maasCarpaniUygula(state, yerlesim.maasCarpani, true);

  clampStats(state);
  state.acilis_anlatimi = acilisAnlatimiUret(state, aile, yerlesim);
  state.haberler = haberleriUret(state);
  hayatOlayiEkle(state, "🎯", `Hayat amacını belirledi: ${hayatAmaci.ad}`);
  return state;
}

function esikKarsilaniyorMu(esik: RutbeEsigi, state: CharacterState): boolean {
  return (
    (state.kariyer_puani ?? 0) >= esik.kariyer_puani &&
    (esik.un === undefined || state.un >= esik.un) &&
    (esik.ahlak === undefined || state.ahlak >= esik.ahlak)
  );
}

/** Rütbe kademesine göre bir üst kademedeki amiri atar; en üst kademedeyken (5) amir yoktur (hükümdar zaten en tepede). */
function amirGuncelle(state: CharacterState, tanim: RutbeTanimi, seviye: number): void {
  const ustUnvan = seviye < 5 ? tanim.unvanlar[seviye] : null;
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

/**
 * Güncel rütbeyi hesaplayıp state'e yazar. Kurallar:
 *  - Kademe HAK ETME: kariyer_puani + mesleğe özgü stat (Asker/Tüccar şöhret, Din ahlak)
 *    esikler[0..3]'ü (S2..S5) sırayla karşılamalı.
 *  - RATCHET: rütbe asla düşmez — hak edilen kademe mevcuttan düşükse yok sayılır.
 *  - COOLDOWN: bir sonraki kademeye çıkmak için son terfiden TERFI_COOLDOWN[hedef]
 *    yıl geçmiş olmalı; terfi anında son_terfi_yili = state.yil damgalanır.
 *  - Çağrı başına en fazla +1 kademe.
 */
export function rutbeGuncelle(state: CharacterState): void {
  const tanim = rutbeTanimiGetir(state.meslek, state.cag, state.din_kultur);
  if (!tanim) {
    state.rutbe = state.meslek || "";
    state.rutbe_seviye = Math.max(1, state.rutbe_seviye || 1);
    state.amir_adi = null;
    state.amir_rutbe = null;
    return;
  }

  const mevcut = Math.max(1, state.rutbe_seviye || 1);

  // Hak edilen en yüksek kademe (1-5): eşikleri ilk karşılanmayanda dur.
  let hakEdilen = 1;
  for (let i = 0; i < tanim.esikler.length; i++) {
    if (esikKarsilaniyorMu(tanim.esikler[i], state)) hakEdilen = i + 2;
    else break;
  }

  let hedef = mevcut;
  if (hakEdilen > mevcut) {
    const sonraki = mevcut + 1;
    const cooldown = TERFI_COOLDOWN[sonraki] ?? 0;
    const sonTerfi = state.son_terfi_yili ?? state.baslangic_yili ?? state.yil;
    if (state.yil - sonTerfi >= cooldown) {
      hedef = sonraki;
      state.son_terfi_yili = state.yil;
    }
  }
  hedef = Math.max(1, Math.min(5, hedef));

  state.rutbe_seviye = hedef;
  state.rutbe = tanim.unvanlar[hedef - 1];
  amirGuncelle(state, tanim, hedef);
  astlariGuncelle(state, tanim, hedef);
}

/**
 * DB'den yüklenen eski oturumlarda 2026-08 rütbe reformundan önce olmayan alanları
 * (kariyer_puani / son_terfi_yili) geriye dönük doldurur. Session.data düz JSON
 * olduğu için şema migrasyonu yok; kayıt regresyona uğramasın diye kariyer_puani,
 * kabaca o ana kadar kazanılmış olması beklenen değere set edilir (mevcut rütbe
 * ratchet olduğu için zaten korunur).
 */
export function eskiKayitGocu(state: CharacterState): void {
  if (typeof state.kariyer_puani !== "number") {
    state.kariyer_puani =
      (state.tur_sayisi ?? 0) * KARIYER_PUANI_YILLIK +
      (state.kendi_isi_yatirim_sayisi ?? 0) * KARIYER_PUANI_YATIRIM;
  }
  if (typeof state.son_terfi_yili !== "number") {
    state.son_terfi_yili = state.baslangic_yili ?? state.yil;
  }
  // "mulkler"/"baslangic_yili" gibi sonradan eklenen alanlar eski kayıtlarda undefined
  // kalıyor; gayrimenkul değeri/geliri ve enflasyon hesabı bunlara doğrudan .length /
  // aritmetik uyguladığı için (Finans ekranı) minimum güvenli varsayılana çekiyoruz.
  if (!Array.isArray(state.mulkler)) state.mulkler = [];
  if (typeof state.baslangic_yili !== "number") state.baslangic_yili = state.yil;
  // Periyodik mülk bakımı sonradan eklendi; eski kayıtlarda sayaç yok — sahip olunan
  // her mülke rastgele bir 7-10 yıl kur (hepsi aynı yıl tetiklenmesin diye ayrı ayrı).
  if (!state.mulk_bakim_kalan || typeof state.mulk_bakim_kalan !== "object") state.mulk_bakim_kalan = {};
  for (const tur of state.mulkler) {
    if (typeof state.mulk_bakim_kalan[tur] !== "number") state.mulk_bakim_kalan[tur] = rastgeleMulkBakimAraligi();
  }
  // Veba "ömürde bir kez" → "20 yıl cooldown"a çevrildi; eski kayıtta zaten
  // veba geçirmiş biri için cooldown'u başından dolmuş say (yeniden yakalanabilsin).
  if (state.son_veba_bitis_yili === undefined) {
    state.son_veba_bitis_yili = state.veba_gecirdi && !state.veba ? state.yil - 20 : null;
  }
  // Veba korunması binary (onlemAlindiMi) → 3 kademeli (korumaSeviyesi) oldu.
  if (state.veba && (state.veba as any).korumaSeviyesi === undefined) {
    state.veba.korumaSeviyesi = (state.veba as any).onlemAlindiMi ? 2 : 0;
  }
  if (state.son_zenginlik_sizinti_yili === undefined) state.son_zenginlik_sizinti_yili = null;
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
    maasCarpaniUygula(state, 1.08, true); // aile mirası: azaltılmış (1.15→1.08), ham verilir
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
 * -16 sağlık. Hiçbir konut/servet/rütbe bu eşikleri değiştirmez. Konut + yaşam
 * tarzının yıllık sağlık bonusu olay hasarından toparlanmaya yardım eder ama
 * pasifRegenEtkisi yumuşak tavanı (70) yüzünden karakteri 100 canda sabitleyip
 * yaşlanmayı yok saymaya yetmez; üstüne 70+ yaşta ecelDenemesi doğal ölüm riski
 * biner. Sonuç: iyi yaşayan biri dolu ama sonlu bir ömür sürer, hiç önlem almayan
 * çok daha erken ölür. Bir turda birden fazla yıl atlanırsa (yasArtisi > 1) her
 * yıl kendi eşiğine göre ayrı ayrı hesaplanır (ör. 47'den 50'ye sıçrama, 48'i de sayar).
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
 * Konut + yaşam tarzının sağladığı yıllık PASİF sağlık/mutluluk kazancı, ilgili
 * istatistik bu tavanın ALTINDAYKEN tam oranında işler (olay hasarından toparlanmak
 * için); tavanın üstüne taşan kısım PASIF_REGEN_TAVAN_USTU_ORAN ile kısılır. Böylece
 * pahalı ev + iyi yemek seni olaylardan koruyup toparlar ama 100 canda sabitleyip
 * yaşlanmayı (48+/65+/80+ eşikleri) tamamen yok saymana izin vermez. NEGATİF pasif
 * etkiler (çöpten topla -4, basit barınak -1 vb.) bu tavandan etkilenmez, tam işler.
 */
const PASIF_REGEN_TAVANI = 80;
const PASIF_REGEN_TAVAN_USTU_ORAN = 0.25;
/** Bu değerin ALTINDA hiç yumuşak tavan uygulanmaz: dipteki bir karakter iyi ev+sofra ile tam hızda toparlanabilsin. */
const PASIF_REGEN_LIMITSIZ_ESIK = 45;

/**
 * İleri yaş "ecel" riski: 70 yaşından itibaren, can/servet ne olursa olsun her yıl
 * artan bir doğal ölüm ihtimali. sans% = (yas - ECEL_REFERANS_YAS) * ECEL_YILLIK_KATSAYI
 * (70'te ~%1.7, 76'da ~%5, 88'de ~%12, 95'te ~%16). Turda birden fazla yıl geçerse
 * her yıl ayrı ayrı denenir.
 */
const ECEL_BASLANGIC_YASI = 70;
const ECEL_REFERANS_YAS = 67;
const ECEL_YILLIK_KATSAYI = 0.58;
const ECEL_MESAJLARI = [
  "Yaşlılığın getirdiği yorgunlukla bir sabah uyanmadın; huzurlu bir ölümdü.",
  "Yılların yükü bedenini yendi; sevdiklerinin arasında, sakince son nefesini verdin.",
  "İleri yaşın sessiz eceli bir gece seni de buldu.",
  "Uzun bir ömrün ardından bedenin artık dayanmadı; yatağında huzurla göçtün.",
];

/**
 * Konut/yaşam tarzı gibi pasif bir kaynaktan gelen sağlık/mutluluk değişimini,
 * yumuşak tavan kuralına göre efektif değere çevirir (bkz. PASIF_REGEN_TAVANI).
 * delta <= 0 ise (hasar) olduğu gibi döner.
 */
export function pasifRegenEtkisi(mevcut: number, delta: number): number {
  if (delta <= 0) return delta;
  // Dipteyken (< 45) hiç kısma yok: acil toparlanmanın önünde durmasın.
  if (mevcut < PASIF_REGEN_LIMITSIZ_ESIK) return delta;
  const tavanAltiBosluk = Math.max(0, PASIF_REGEN_TAVANI - mevcut);
  const tamKisim = Math.min(delta, tavanAltiBosluk);
  const tavanUstuKisim = (delta - tamKisim) * PASIF_REGEN_TAVAN_USTU_ORAN;
  return tamKisim + tavanUstuKisim;
}

/**
 * İleri yaş ecel kontrolü: tetiklenirse checkDeath ile kullanılacak mesajı döner,
 * aksi halde null. Her yıl ayrı denenir (orduBuyumesiDene/aniOlumDene deseni).
 */
export function ecelDenemesi(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0) return null;
  let yas = state.yas - yasArtisi;
  for (let i = 0; i < yasArtisi; i++) {
    yas += 1;
    if (yas < ECEL_BASLANGIC_YASI) continue;
    const sans = (yas - ECEL_REFERANS_YAS) * ECEL_YILLIK_KATSAYI;
    if (Math.random() * 100 < sans) {
      return ECEL_MESAJLARI[Math.floor(Math.random() * ECEL_MESAJLARI.length)];
    }
  }
  return null;
}

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
  /** Aktif büyük savaş sırasında pasif gelirden ek olarak kesilen "savaş vergisi" (bkz. state.buyuk_savas.vergiOrani); savaş yokken 0. */
  savasVergisi: number;
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
  // Konut + yaşam tarzının pasif sağlık/mutluluk etkisi yumuşak tavana (70) tabidir:
  // tavan altında tam, üstünde kısılmış işler; hasar (negatif) her zaman tam. Böylece
  // pahalı ev + iyi yemek toparlanma sağlar ama karakteri 100 canda "ölümsüz" yapmaz.
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  const konut = konutGetir(state.konut_id);
  const saglikPasif =
    (yasamSecenegi?.saglikEtkisiYillik ?? 0) * yasArtisi + (konut?.saglikEtkisiYillik ?? 0) * yasArtisi;
  const mutlulukPasif =
    (yasamSecenegi?.mutlulukEtkisiYillik ?? 0) * yasArtisi + (konut?.mutlulukEtkisiYillik ?? 0) * yasArtisi;
  if (saglikPasif) state.saglik += pasifRegenEtkisi(state.saglik, saglikPasif);
  if (mutlulukPasif) state.mutluluk += pasifRegenEtkisi(state.mutluluk, mutlulukPasif);
  // Konut + yaşam tarzının ün etkisi (yumuşak tavana tabi değil; hem gösteriş
  // primi hem de bakımsız/aç bir hayatın itibar aşınması buradan işler).
  const unPasif = (konut?.unEtkisiYillik ?? 0) * yasArtisi + (yasamSecenegi?.unEtkisiYillik ?? 0) * yasArtisi;
  if (unPasif) state.un += unPasif;

  // Meslek, olay dışı geçen yıllarda da sessizce iz bırakır: din adamının cemaat
  // içindeki saygınlığı yıllar içinde birikir; tüccarınkiyse ticaretin gidişatına
  // bağlıdır — bereketli/kazançlı yıllar ahlakı aşındırır, zor/zararlı yıllar sınar
  // ve güçlendirir. Küçük bir sürüklenme; olayların etkisini domine etmez.
  if (state.meslek === "Din Adamı") {
    state.un += 0.4 * yasArtisi;
  } else if (state.meslek === "Tüccar") {
    state.ahlak += (netGelir >= 0 ? -0.4 : 0.4) * yasArtisi;
  }

  // Borç kapatma mekaniği: borçtayken bütçesini artıya çevirmiş bir karakter
  // (netGelir > 0) borcunu AKTİF ödüyor sayılır — faiz yarıya iner, borç stresi
  // sağlık cezası uygulanmaz ve net gelirin bir kısmı kadar ek anapara affı
  // verilir (alacaklı taksitlendirdi). Hâlâ açık veren (netGelir <= 0) karakter
  // için tam ceza sürer: eskisi gibi %6 faiz + −2 sağlık/yıl.
  let borcaGirdi = false;
  let faiz = 0;
  if (state.para < 0) {
    borcaGirdi = true;
    const borcTutari = Math.abs(state.para);
    // Borç stresi sağlığı HER hâlükârda yıpratır (2026-09'da geri getirildi):
    // bütçesini toparlamış bir borçlunun bile borçlu olmanın bir bedeli var.
    state.saglik -= 2 * yasArtisi;
    if (netGelir > 0) {
      // Aktif ödüyor: faiz %2/yıl + net gelirin %25'i kadar ek anapara affı.
      faiz = paraYuvarla(borcTutari * 0.02 * yasArtisi);
      state.para = paraYuvarla(Math.min(0, state.para - faiz + netGelir * 0.25));
    } else {
      // Ödeyemiyor: faiz %4/yıl (tavan yok — borç büyüdükçe faiz de büyür).
      faiz = paraYuvarla(borcTutari * 0.04 * yasArtisi);
      state.para -= faiz;
    }
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

/**
 * "Zengin görünmenin gündelik fısıltısı" (Z2): net servet ≥ 350 & nakit ≥ 50
 * iken şans olayı havuzu bu net-negatif listeye kayar. Z1'in (zenginlikSizinti,
 * gürültülü hırsız/haraç olayları) aksine burası küçük, sessiz, çeşitli
 * eksiltmelerdir — cooldown yok, sadece havuz değişir. Birkaç nötr/ufak
 * kalem de var ki her seferinde kayıp olmasın.
 */
const SANS_OLAYLARI_ZENGIN: SansOlayi[] = [
  { mesaj: "Zengin sanıp her yerde senden bahşiş beklediler; cebin sızdı.", para: -8 },
  { mesaj: "Kapına gelen bir dilenciye, komşular baksın diye fazladan verdin.", para: -5 },
  { mesaj: "Hancı seni görünce fiyatı 'senin için özel' diye yükseltti.", para: -6 },
  { mesaj: "Bir hayır listesi elden ele dolaştı; adının yanına küçük bir rakam yazdın.", para: -7 },
  { mesaj: "Uzak bir akraba 'sadece bu seferlik' diyerek borç aldı.", para: -10 },
  { mesaj: "Bir zanaatkâr işini abartıp fazladan ücret kesti, sesini çıkarmadın.", para: -6 },
  { mesaj: "Pazarda tanınıp etrafını sarınca, birkaç gereksiz şey almak zorunda kaldın.", para: -5 },
  { mesaj: "Bir tören için 'senin konumunda biri' diye ekstra bağış beklendi.", para: -9 },
  { mesaj: "Hizmetkârların bahşiş zamanı geldi diye hatırlattı.", para: -6 },
  { mesaj: "Eski bir tanıdık 'sen zenginsin nasılsa' deyip yemeğin hesabını sana bıraktı.", para: -4 },
  { mesaj: "Adın bir yerde saygıyla anıldı, ama bu sana bir şey kazandırmadı.", un: 4 },
  { mesaj: "Yolda küçük bir kese buldun — kısmet.", para: 6 },
];

export function sansOlayiDene(state: CharacterState): string | null {
  if (Math.random() > SANS_OLAYI_IHTIMALI) return null;
  const netServet = state.para + gayrimenkulDegeriHesapla(state);
  const havuz =
    netServet >= ZENGINLIK_SIZINTI_SERVET_ESIGI && state.para >= ZENGINLIK_SIZINTI_NAKIT_ESIGI
      ? SANS_OLAYLARI_ZENGIN
      : SANS_OLAYLARI;
  const olay = havuz[Math.floor(Math.random() * havuz.length)];
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

/**
 * Skor: yaş × şöhret × servet-faktörü × (hayat amacı tamamlandıysa ×5).
 * - Servet = nakit + gayrimenkul (madde 23): mülke servet bağlayan oyuncu
 *   cezalanmasın.
 * - Servet-faktörü LOG-ölçekli (madde 24): eski `max(para,1)` çarpanı tek bir
 *   zengin ömrü milyonlara fırlatıp liderlik tablosunu domine ediyor, ayrıca
 *   tüm borçlu bitişleri 1'e ezip ayırt edilemez kılıyordu.
 *     servet > 0 → 1 + log10(1 + servet)        (100→~3.0, 500→~3.7, 8M→~7.9)
 *     servet ≤ 0 → 1 + servet/400, taban 0.15   (borç küçük ama gerçek bir ceza)
 */
export function hesaplaSkor(state: CharacterState): number {
  const servet = state.para + gayrimenkulDegeriHesapla(state);
  const servetFaktoru =
    servet > 0 ? 1 + Math.log10(1 + servet) : Math.max(0.15, 1 + servet / 400);
  const taban = state.yas * Math.max(state.un, 1) * servetFaktoru;
  return Math.round(state.hayat_amaci?.tamamlandi ? taban * 5 : taban);
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

const KUCUK_KRIZ_SURE_MIN_YIL = 1;
const KUCUK_KRIZ_SURE_ARALIK_YIL = 1; // 1-2 yıl (kısaltıldı)
const KUCUK_KRIZ_SONRAKI_ESIK_MIN_YIL = 5;
const KUCUK_KRIZ_SONRAKI_ESIK_ARALIK_YIL = 2; // 5-7 yıl

const KUCUK_KRIZ_FLAVOR: string[] = [
  "🌾 Kıtlık kapıya dayandı; ambarlar hızla boşaldı, ekmek fiyatları anında iki katına çıktı.",
  "🏹 Haydutlar yolları ve pazarları bastı; mallar yağmalandı, gıda fiyatları bir anda fırladı.",
];

/**
 * 5-7 yılda bir düzenli aralıklarla tekrarlayan küçük kriz (kıtlık/haydut
 * baskını flavor'ı). Mekanik olarak mevcut "kitlik" kriz tipini yeniden
 * kullanır (1-2 yıl sürer, aşağıdaki krizEtkisiUygula'nın -1 sağlık/yıl
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
  kitlik: { saglik: -1 }, // -2 → -1: kıtlık artık ölüm sarmalını tek başına döndürmüyor
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

// Eşik ve tahsilat NET SERVET üzerinden: nakit (borçta negatif) + gayrimenkul güncel değeri.
const ZORUNLU_BAGIS_ESIGI = 350;
const ZORUNLU_BAGIS_COOLDOWN_YIL = 5;
const ZORUNLU_BAGIS_YILLIK_IHTIMAL = 0.3;
const ZORUNLU_BAGIS_ORAN_MIN = 0.2;
const ZORUNLU_BAGIS_ORAN_ARALIK = 0.05; // %20-25

export interface ZorunluBagisSonucu {
  miktar: number;
  mesaj: string;
}

/**
 * "Kral zenginleştiğini fark etti, bağış istiyor": toplam servet (nakit+mülk)
 * 500'ü aştıkça, en az 5 yıllık cooldown sonrasında yıllık %25 ihtimalle
 * hükümdar servetin %15-20'sini zorunlu "bağış" olarak alır. Zenginliğin TEK
 * bedeli budur — eski pasif %4/yıl zenginlik vergisi kaldırıldı; bu tek seferlik,
 * büyük ve kendi cooldown'una sahip bir mekanik olarak kaldı.
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

// ---------------------------------------------------------------------------
// Zenginlik sızıntısı: net servet ≥ 350 VE nakit ≥ 50 iken, 6 yıl cooldown
// sonrası her yıl %20 ihtimalle hırsız/haraç/dolandırıcı vb. bir olay
// karakterin NAKİT'inden pay alır. Zorunlu bağış (kral, servet üzerinden) ile
// paralel ama ayrı: bu, "zengin görünmenin" gündelik bedeli — küçük, sık,
// çeşitli. Olay ekranı yok; sonucu zamanAnlatimi'ye + hayat_hikayesi'ne eklenir.
// ---------------------------------------------------------------------------
const ZENGINLIK_SIZINTI_SERVET_ESIGI = 350;
const ZENGINLIK_SIZINTI_NAKIT_ESIGI = 50;
const ZENGINLIK_SIZINTI_COOLDOWN_YIL = 6;
const ZENGINLIK_SIZINTI_YILLIK_IHTIMAL = 0.2;
const ZENGINLIK_SIZINTI_ORAN_MIN = 0.12;
const ZENGINLIK_SIZINTI_ORAN_ARALIK = 0.13; // nakitin %12-25'i

const ZENGINLIK_SIZINTI_FLAVOR: ((m: string, b: string) => string)[] = [
  (m) => `🗡️ Bir hırsız gece kilerine girdi; sabah ${m} eksikti.`,
  (m, b) => `💰 ${b} kabadayıları "koruma parası" istedi; ${m} vermek zorunda kaldın.`,
  (m) => `🤝 Güvendiğin bir ortak seni dolandırdı; ${m} buharlaştı.`,
  (m) => `📜 Vergi tahsildarı defterlerinde "eksik" buldu; ${m} ceza kesti.`,
  (m) => `👨‍👩‍👧 Bir akraban büyük bir borç için kapına dayandı; ${m} verdin, geri dönmeyecek.`,
  (m) => `🎭 Bir dilenci kılığındaki dolandırıcı acıklı bir hikâyeyle ${m} kopardı.`,
  (m, b) => `⚖️ ${b}'de küçük bir dava açıldı üstüne; avukat ve rüşvet ${m} götürdü.`,
  (m) => `🔥 Deponda çıkan yangını söndürmek ve zararı kapatmak ${m} tuttu.`,
  (m) => `🃏 Bir bahiste kaptırdın; ${m} masada kaldı.`,
  (m) => `🐴 Yolda eşkıya kervanını çevirdi; ${m} değerinde mal ve para aldılar.`,
  (m) => `💍 Değerli bir eşyan "kayboldu"; yerine yenisini almak ${m} tuttu.`,
  (m, b) => `🏛️ ${b} ileri gelenleri bir bağış listesi dolaştırdı; ${m} yazmak zorunda kaldın.`,
];

export interface ZenginlikSizintiSonucu {
  miktar: number;
  mesaj: string;
}

/**
 * Bkz. yukarıdaki blok. Turdaki her yıl ayrı kontrol edilir (bağış/savaş/veba deseni).
 * Nakitin %12-25'ini alır (min 3), cooldown'u günceller.
 */
export function zenginlikSizintiKontrolEt(state: CharacterState, yasArtisi: number): ZenginlikSizintiSonucu | null {
  if (yasArtisi <= 0) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  for (let i = 0; i < yasArtisi; i++) {
    const netServet = state.para + gayrimenkulDegeriHesapla(state);
    if (netServet < ZENGINLIK_SIZINTI_SERVET_ESIGI || state.para < ZENGINLIK_SIZINTI_NAKIT_ESIGI) continue;
    const taban = state.son_zenginlik_sizinti_yili ?? state.baslangic_yili;
    if (state.yil - taban < ZENGINLIK_SIZINTI_COOLDOWN_YIL) continue;
    if (Math.random() >= ZENGINLIK_SIZINTI_YILLIK_IHTIMAL) continue;
    const oran = ZENGINLIK_SIZINTI_ORAN_MIN + Math.random() * ZENGINLIK_SIZINTI_ORAN_ARALIK;
    const miktar = Math.max(3, paraYuvarla(state.para * oran));
    state.para -= miktar;
    state.son_zenginlik_sizinti_yili = state.yil;
    const flavor = ZENGINLIK_SIZINTI_FLAVOR[Math.floor(Math.random() * ZENGINLIK_SIZINTI_FLAVOR.length)];
    return { miktar, mesaj: flavor(`${miktar} ${state.para_birimi}`, state.bolge) };
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
const VEBA_YILLIK_IHTIMAL = 0.03;
/** Bir veba dalgası (iz fazı dahil) bittikten sonra yeni bir dalga için beklenmesi gereken yıl. */
const VEBA_COOLDOWN_YIL = 20;

/**
 * Vebanın zamanı geldi mi: 18+ yaşındayken yıllık %3 ihtimalle. Artık "ömürde
 * bir kez" değil — bir dalga (aktif + iz fazı) tam bittikten sonra 20 yıl
 * cooldown ile tekrar tetiklenebilir. Aktif ya da iz fazındaki bir veba
 * (`state.veba` dolu) yeni dalgayı bloklar.
 */
export function vebaBaslamaliMi(state: CharacterState, yasArtisi: number): boolean {
  if (yasArtisi <= 0 || state.veba || state.ulke.vebada || state.yas < VEBA_MIN_YAS) return false;
  if (
    state.son_veba_bitis_yili != null &&
    state.yil - state.son_veba_bitis_yili < VEBA_COOLDOWN_YIL
  ) {
    return false;
  }
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

/** Veba olayı çözüldükten sonra (gameEngine.ts'te ulke_etkisi.vebada true tespit edilince) çağrılır; süre/çarpan parametrelerini rastgele belirler. `korumaSeviyesi`: 0=hiç, 1=kısmi, 2=tam. */
export function vebaBaslat(state: CharacterState, korumaSeviyesi = 0): void {
  const aktifSureYil = VEBA_AKTIF_SURE_MIN_YIL + Math.floor(Math.random() * (VEBA_AKTIF_SURE_ARALIK_YIL + 1));
  const etkiSureYil = VEBA_ETKI_SURE_MIN_YIL + Math.floor(Math.random() * (VEBA_ETKI_SURE_ARALIK_YIL + 1));
  state.veba = {
    aktif: true,
    baslangicYili: state.yil,
    bitisYili: state.yil + aktifSureYil,
    etkiBitisYili: state.yil + aktifSureYil + etkiSureYil,
    konutKiraCarpani: VEBA_KONUT_KIRA_CARPANI_MIN + Math.random() * VEBA_KONUT_KIRA_CARPANI_ARALIK,
    gelirCarpani: VEBA_GELIR_CARPANI_MIN + Math.random() * VEBA_GELIR_CARPANI_ARALIK,
    korumaSeviyesi: Math.max(0, Math.min(2, Math.round(korumaSeviyesi))),
  };
  state.veba_gecirdi = true;
}

export interface VebaYillikSonuc {
  karakterOldu: boolean;
  mesajlar: string[];
}

/**
 * Aktif veba sürerken karakter / eş / çocuk için YILLIK ölüm riski, korunma
 * düzeyine göre 3 kademe (2026-09'da ciddileştirildi — korunmayan bir veba
 * gerçekten ölümcül olsun, korunma da gerçek bir yatırım olsun). Aktif faz
 * 2-4 yıl sürdüğü için kümülatif risk: korumasız karakter ~%20-28, tam
 * korunmalı ~%6-8. (Ayrıca kureselOlaylar.ts'teki "veba dönemi" bulaşma
 * olayları bunun ÜSTÜNE ek risk getirir.)
 */
const VEBA_OLUM_KADEME = [0.09, 0.05, 0.025]; // [hiç, kısmi, tam koruma]
const VEBA_ES_KAYIP_KADEME = [0.05, 0.03, 0.015];
const VEBA_COCUK_KAYIP_KADEME = [0.045, 0.028, 0.013];

/**
 * Aktif veba sürerken (sadece state.veba.aktif iken) her yıl için karakterin,
 * eşinin ve bir çocuğunun ölüm riskini kontrol eder; risk state.veba.korumaSeviyesi
 * (0/1/2) kademesinden okunur. Karakterin kendi ölümü burada UYGULANMAZ
 * (saglik/aktif'e dokunmaz) — sadece sinyal döner, gerçek checkDeath çağrısı
 * gameEngine.ts'te mevcut olumTetiklendi deseniyle yapılır.
 */
export function vebaYillikKontrol(state: CharacterState, yasArtisi: number): VebaYillikSonuc {
  const sonuc: VebaYillikSonuc = { karakterOldu: false, mesajlar: [] };
  if (yasArtisi <= 0 || !state.veba?.aktif) return sonuc;
  const k = Math.max(0, Math.min(2, state.veba.korumaSeviyesi ?? 0));
  const olumSansi = VEBA_OLUM_KADEME[k];
  const esSansi = VEBA_ES_KAYIP_KADEME[k];
  const cocukSansi = VEBA_COCUK_KAYIP_KADEME[k];

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
    state.son_veba_bitis_yili = state.yil; // 20 yıllık cooldown buradan sayılır
  }
  return null;
}

// Yıllık getiri oranları (taban maliyetin yüzdesi olarak); enflasyonCarpani ile ölçeklenen
// taban_maliyet üzerine uygulanır. Değerler kasıtlı olarak "güvenli yatırım"dan (yıllık ~%5-6)
// belirgin şekilde daha oynak: mülkler dünyayı okumanın karşılığı, sabit gelir değil.
const MULK_GETIRI_NORMAL = 0.08;
const MULK_GETIRI_AVANTAJLI = 0.2;
const MULK_GETIRI_DEZAVANTAJLI = -0.15;
const MULK_DEMIRCI_SAVAS_CARPANI = 2.5;
const KERVAN_BATMA_IHTIMALI_YILLIK = 0.25;
const KARABORSA_SUC_ARTISI_YILLIK = 2;
const KARABORSA_AHLAK_ASINMASI_YILLIK = 0.3;

/** Her mülk 7-10 yılda bir periyodik bir bakım/vergi masrafı çıkarır (tıpkı "luks" mağaza eşyaları gibi). */
const MULK_BAKIM_ARALIGI_MIN_YIL = 6;
const MULK_BAKIM_ARALIGI_MAX_YIL = 9;
/** Bakım masrafı, mülkün GÜNCEL (enflasyona göre ölçeklenmiş) değerinin yaklaşık bu oranı kadardır. */
const MULK_BAKIM_ORANI = 0.13;

export function rastgeleMulkBakimAraligi(): number {
  return (
    MULK_BAKIM_ARALIGI_MIN_YIL +
    Math.floor(Math.random() * (MULK_BAKIM_ARALIGI_MAX_YIL - MULK_BAKIM_ARALIGI_MIN_YIL + 1))
  );
}

/** Bir mülkün, bakım masrafları amorti edilerek yıllığa indirgenmiş yaklaşık maliyeti (önizleme/istemci için). */
export function mulkYillikBakimTahmini(tur: MulkTuru, state: CharacterState): number {
  const guncelDeger = mulkTanimiGetir(tur).taban_maliyet * enflasyonCarpani(state);
  const ortalamaAralik = (MULK_BAKIM_ARALIGI_MIN_YIL + MULK_BAKIM_ARALIGI_MAX_YIL) / 2;
  return paraYuvarla((guncelDeger * MULK_BAKIM_ORANI) / ortalamaAralik);
}

interface MulkGelirSonucu {
  toplamNet: number;
  kervanBatti: boolean;
  /** Bu turda periyodik bakım/vergi masrafı tetiklenen mülkler ve ödenen tutar (mülk SİLİNMEZ). */
  bakimOdemeleri: { ad: string; miktar: number }[];
}

/**
 * Sahip olunan tüm piyasa mülklerinin güncel (enflasyona göre ölçeklenmiş) toplam
 * değeri — zorunlu bağış eşiğinin (nakit+mülk > 500) hesaplanmasında
 * (zorunluBagisKontrolEt) ve Finans ekranındaki servet dökümünde kullanılan tek
 * doğruluk kaynağı.
 */
export function gayrimenkulDegeriHesapla(state: CharacterState): number {
  if (state.mulkler.length === 0) return 0;
  const enflasyon = enflasyonCarpani(state);
  return state.mulkler.reduce((toplam, tur) => toplam + paraYuvarla(mulkTanimiGetir(tur).taban_maliyet * enflasyon), 0);
}

/**
 * Sahip olunan tüm mülklerin ŞU ANKİ dünya durumuna göre yıllık tahmini net
 * gelir/zararı — mulkGelirleriUygula'nın bir yıl için ekleyeceğiyle birebir aynı
 * formül. Finans ekranı bunu "gayrimenkul geliri" olarak maaşın yanında (maaşın
 * DIŞINDA ayrı bir akış olarak) gösterir; negatifse mülkler o an zarar ettiriyor.
 */
export function gayrimenkulYillikGelirHesapla(state: CharacterState): number {
  if (state.mulkler.length === 0) return 0;
  const enflasyon = enflasyonCarpani(state);
  return paraYuvarla(
    state.mulkler.reduce((toplam, tur) => {
      const taban = mulkTanimiGetir(tur).taban_maliyet * enflasyon;
      return toplam + paraYuvarla(taban * mulkGetiriOraniHesapla(tur, state.ulke));
    }, 0)
  );
}

export interface DunyaFinansEtkisi {
  ikon: string;
  metin: string;
}

/**
 * Şu an karakterin bütçesini/sağlığını etkileyen dünya durumlarının (ekonomi,
 * savaş, salgın, kıtlık/isyan/altın çağ, gıda şoku, enflasyon, zorunlu bağış eşiği)
 * insan-okunur özeti. Finans ekranı + sol paneldeki mini özet "🌍 dünya etkileri"
 * olarak gösterir — oyuncu maaşının/giderinin neden değiştiğini görebilsin diye.
 * Buradaki yüzdeler maasCarpanKalemleri/giderKalemleriHesapla'daki sabitlerin
 * insan diline çevrilmiş hâlidir (formülü tekrar HESAPLAMAZ, açıklar).
 */
export function dunyaFinansEtkileri(state: CharacterState): DunyaFinansEtkisi[] {
  const liste: DunyaFinansEtkisi[] = [];

  if (state.ulke.ekonomi === "kotu") liste.push({ ikon: "📉", metin: "Kötü ekonomi: maaş −%20" });
  else if (state.ulke.ekonomi === "iyi") liste.push({ ikon: "📈", metin: "İyi ekonomi: maaş +%15" });

  if (state.buyuk_savas) {
    const gida = Math.round((state.buyuk_savas.gidaCarpani - 1) * 100);
    const vergi = Math.round(state.buyuk_savas.vergiOrani * 100);
    liste.push({
      ikon: "⚔️",
      metin: `Büyük savaş (${state.buyuk_savas.dusman}): maaş −%15 · yemek +%${gida} · maaşının %${vergi}'i savaş vergisi`,
    });
  } else if (state.ulke.savasta) {
    liste.push({ ikon: "⚔️", metin: "Savaş: maaş −%15" });
  }

  if (state.veba && state.yil < state.veba.etkiBitisYili) {
    const maas = Math.round((state.veba.gelirCarpani - 1) * 100);
    const kira = Math.round((1 - state.veba.konutKiraCarpani) * 100);
    if (state.veba.aktif) {
      liste.push({ ikon: "☠️", metin: `Salgın: her yıl ölüm riski · işçi kıtlığı maaş +%${maas} · kira −%${kira}` });
    } else {
      const kalanYil = Math.max(0, state.veba.etkiBitisYili - state.yil);
      liste.push({ ikon: "☠️", metin: `Salgın izi (${kalanYil} yıl): maaş +%${maas} · kira −%${kira}` });
    }
  }

  if (state.ulke.kriz?.tur === "kitlik") liste.push({ ikon: "🌾", metin: "Kıtlık: −2 sağlık/yıl" });
  else if (state.ulke.kriz?.tur === "isyan") liste.push({ ikon: "🔥", metin: "İsyan: −3 para & −1 ün/yıl" });
  else if (state.ulke.kriz?.tur === "altin_cag")
    liste.push({ ikon: "✨", metin: "Altın çağ: +4 para & +1 mutluluk/yıl" });

  if (state.gida_fiyat_sok_bitis_yili !== null && state.yil < state.gida_fiyat_sok_bitis_yili) {
    liste.push({ ikon: "🥖", metin: "Gıda fiyat şoku: yemek gideri bu yıl ×2" });
  }

  if (state.para + gayrimenkulDegeriHesapla(state) > ZORUNLU_BAGIS_ESIGI) {
    const taban = state.son_zorunlu_bagis_yili ?? state.baslangic_yili;
    const kalanCooldown = ZORUNLU_BAGIS_COOLDOWN_YIL - (state.yil - taban);
    const oranAralik = `%${Math.round(ZORUNLU_BAGIS_ORAN_MIN * 100)}-${Math.round(
      (ZORUNLU_BAGIS_ORAN_MIN + ZORUNLU_BAGIS_ORAN_ARALIK) * 100
    )}`;
    const metin =
      kalanCooldown > 0
        ? `Servetin ${ZORUNLU_BAGIS_ESIGI}'ü aştı: hükümdarın gözü üstünde ama ~${kalanCooldown} yıl daha bağış isteyemez (servetinin ${oranAralik}'si)`
        : `Servetin ${ZORUNLU_BAGIS_ESIGI}'ü aştı: hükümdar zenginleştiğini fark etti — her yıl ~%${Math.round(
            ZORUNLU_BAGIS_YILLIK_IHTIMAL * 100
          )} ihtimalle servetinin ${oranAralik}'sini "bağış" olarak alabilir`;
    liste.push({ ikon: "👑", metin });
  }

  return liste;
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
  if (yasArtisi <= 0 || state.mulkler.length === 0) return { toplamNet: 0, kervanBatti: false, bakimOdemeleri: [] };
  const ulke = state.ulke;
  const enflasyon = enflasyonCarpani(state);
  if (!state.mulk_bakim_kalan) state.mulk_bakim_kalan = {};
  let toplamNet = 0;
  let toplamBakim = 0;
  let kervanBatti = false;
  const bakimOdemeleri: { ad: string; miktar: number }[] = [];

  for (const tur of [...state.mulkler]) {
    const taban = mulkTanimiGetir(tur).taban_maliyet * enflasyon;
    const oran = mulkGetiriOraniHesapla(tur, ulke);

    if (tur === "kervan" && ulke.savasta && Math.random() < KERVAN_BATMA_IHTIMALI_YILLIK * yasArtisi) {
      state.mulkler = state.mulkler.filter((m) => m !== "kervan");
      delete state.mulk_bakim_kalan.kervan;
      hayatOlayiEkle(state, "🌊", "Ticaret kervanı savaş yüzünden tamamen kayboldu");
      kervanBatti = true;
      continue;
    }
    if (tur === "karaborsa") {
      state.suc_seviyesi += KARABORSA_SUC_ARTISI_YILLIK * yasArtisi;
      state.ahlak -= KARABORSA_AHLAK_ASINMASI_YILLIK * yasArtisi;
    }

    toplamNet += paraYuvarla(taban * oran) * yasArtisi;

    // Periyodik bakım/vergi: 7-10 yılda bir, mülkün güncel değerinin ~%12'si.
    const kalan = (state.mulk_bakim_kalan[tur] ?? rastgeleMulkBakimAraligi()) - yasArtisi;
    if (kalan <= 0) {
      const masraf = sonBasamagiDuzelt(taban * MULK_BAKIM_ORANI);
      toplamBakim += masraf;
      bakimOdemeleri.push({ ad: mulkTanimiGetir(tur).ad, miktar: masraf });
      state.mulk_bakim_kalan[tur] = rastgeleMulkBakimAraligi();
    } else {
      state.mulk_bakim_kalan[tur] = kalan;
    }
  }
  toplamNet = paraYuvarla(toplamNet - toplamBakim);

  state.para = paraYuvarla(state.para + toplamNet);
  clampStats(state);
  return { toplamNet, kervanBatti, bakimOdemeleri };
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
