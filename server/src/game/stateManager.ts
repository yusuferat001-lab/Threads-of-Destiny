import { randomUUID } from "crypto";
import { CharacterState, Cag, Dil, Kategori, SonucEtkisi, YatkinlikKaynagi, KisilikEksenleri, UlkeKrizi, MulkTuru, SahipOlunanEsya, AileTalep, YonetimTalep } from "../types";
import { T, K } from "../i18n";
import { amaclariUret, amacSkorCarpani, amaclariOlumdeKontrol, amacTanimiGetir } from "../data/hayatAmaclari";
import { AILELER, AileTanimi } from "../data/aileler";
import { BolgeOzellikleri, bolgeOzellikleriGetir } from "../data/bolgeOzellikleri";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import {
  rutbeTanimiGetir,
  RutbeEsigi,
  RutbeTanimi,
  TERFI_COOLDOWN,
  rutbeMaasCarpani,
  KARIYER_PUANI_YILLIK,
} from "../data/rutbeler";
import { YerlesimTanimi, yerlesimGetir, yerlesimIdByAd } from "../data/yerlesimler";
import { konutGetir, VARSAYILAN_KONUT_ID, TASINMA_MALIYETI, konutKademeIndeksi, KONUT_SAHIBI_MIN_KADEME } from "../data/konutlar";
import { yasamSecenegiGetir, VARSAYILAN_YASAM_SECIMI_ID } from "../data/yasamSecenekleri";
import { rastgeleIkiIsimSec, rastgeleBirIsimSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { liderGetir, komsuGucSec } from "../data/liderler";
import { bolgeIstatistigiGetir } from "../data/bolgeIstatistikleri";
import {
  savasHaberi,
  vebaHaberi,
  iyiEkonomiHaberi,
  kotuEkonomiHaberi,
  kitlikHaberi,
  isyanHaberi,
  altinCagHaberi,
  hizipHaberi,
  sakinHaberi,
  yerelHaber,
  YEREL_HABER_SANSI,
} from "../data/yerelHaberler";
import { tarihiSavasKontrol, gelecekSavasKontrol } from "../data/tarihiSavaslar";
import { mulkTanimiGetir } from "../data/mulkler";
import { MagazaEsyasiTanimi, magazaEsyasiTanimiGetir } from "../data/magazaEsyalari";

const KATEGORILER: Kategori[] = ["savas", "ticaret", "din", "siyaset", "saglik", "sosyal", "zanaat"];

/** Meslek adlarının hangi yatkınlık kategorisine karşılık geldiği. */
export const MESLEK_KATEGORI: Record<string, Kategori> = {
  Asker: "savas",
  Tüccar: "ticaret",
  "Din Adamı": "din",
  Zanaatkâr: "zanaat",
};

/** Aile mesleği + bölgenin baskın kategorisi örtüşünce yatkınlığa eklenen sinerji bonusu. */
const SINERJI_BONUSU = 13;

/**
 * Yatkınlıkları kişilik özelliklerinden ve aile geçmişinden hesaplar; her
 * kategoriye küçük bir rastgele oynama (-5..+5) eklenir. Kaynak listesi
 * oyuncuya "neden bu mesleğe yatkınsın" açıklaması için döndürülür.
 */
function yatkinlikHesapla(
  kisilik: [string, string],
  aile: AileTanimi,
  yerlesim: YerlesimTanimi,
  bolgeOzellik: BolgeOzellikleri | null,
  bolgeAdi: string
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

  if (bolgeOzellik?.yatkinlikEtkisi) {
    for (const [kategori, deger] of Object.entries(bolgeOzellik.yatkinlikEtkisi) as [Kategori, number][]) {
      yatkinliklar[kategori] += deger;
      kaynaklar.push({ kaynak: bolgeAdi, kategori, deger });
    }
  }

  // Sinerji bonusu: aile mesleği bölgenin baskın (en yüksek meslek-kategori) etkisiyle
  // örtüşüyorsa +13 — "bu bölgede bu aile mesleğinden gelmek" doğal bir avantaj versin.
  if (aile.devamMeslegi && bolgeOzellik?.yatkinlikEtkisi) {
    const aileKategori = MESLEK_KATEGORI[aile.devamMeslegi];
    if (aileKategori) {
      const MESLEK_KATEGORILERI: Kategori[] = ["savas", "ticaret", "din", "zanaat"];
      let bolgeBaskinKategori: Kategori | null = null;
      let bolgeBaskinDeger = -Infinity;
      for (const kategori of MESLEK_KATEGORILERI) {
        const deger = bolgeOzellik.yatkinlikEtkisi[kategori] ?? 0;
        if (deger > bolgeBaskinDeger) {
          bolgeBaskinDeger = deger;
          bolgeBaskinKategori = kategori;
        }
      }
      if (bolgeBaskinKategori === aileKategori && bolgeBaskinDeger > 0) {
        yatkinliklar[aileKategori] += SINERJI_BONUSU;
        kaynaklar.push({ kaynak: `${bolgeAdi} + ${aile.ad} sinerjisi`, kategori: aileKategori, deger: SINERJI_BONUSU });
      }
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
  Palavracı: 10,
  Obur: 5,
  Sakin: -20,
  Vicdanlı: -8,
  İçedönük: -8,
};

const MERHAMET_ETKI: Record<string, number> = {
  "Yumuşak Başlı": 18,
  Vicdanlı: 15,
  Umutlu: 8,
  Obur: 4,
  Hüzünlü: 6,
  Kibirli: -15,
  Alaycı: -12,
  "Sivri Dilli": -10,
  Hırslı: -8,
  Palavracı: -4,
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

const HUKUMDAR_DEGISIM_HABERLERI: string[] = [
  "{0} artık hayatta değil; yerine {1} geçti. Halk yeni döneme alışmaya çalışıyor.",
  "{0}'in dönemi kapandı, {1} başa geçti. Vergilerin artacağı konuşuluyor.",
  "Uzun süredir başta olan {0} artık yok; {1} yönetimi devraldı. Sarayda el değişimleri bekleniyor.",
  "{0} sona erdi, {1} yeni hükümdar oldu. Şehirde tedirgin bir bekleyiş var.",
];

/** Bir turda hükümdar değiştiyse (ilerletYas sırasında) bunu duyuran bir haber cümlesi üretir. */
export function hukumdarDegisimHaberiUret(eskiHukumdar: string, yeniHukumdar: string, dil: Dil = "tr"): string {
  const sablon = HUKUMDAR_DEGISIM_HABERLERI[Math.floor(Math.random() * HUKUMDAR_DEGISIM_HABERLERI.length)];
  return T(dil, sablon, [eskiHukumdar, yeniHukumdar]);
}

/** Şehir/ülke ile ilgili kısa, güncel haber cümleleri üretir; hükümdar zaten Banner'da gösterildiği için burada tekrarlanmaz. */
export function haberleriUret(state: CharacterState): string[] {
  const dil = state.dil;
  const bolge = K(dil, state.bolge);
  const haberler: string[] = [];
  if (state.ulke.savasta) {
    const rakip = tarihiSavasKontrol(state.bolge, state.yil, state.cag);
    haberler.push(savasHaberi(dil, bolge, rakip ? K(dil, rakip) : null));
  }
  if (state.ulke.vebada) haberler.push(vebaHaberi(dil));
  if (state.ulke.ekonomi === "iyi") haberler.push(iyiEkonomiHaberi(dil));
  if (state.ulke.ekonomi === "kotu") haberler.push(kotuEkonomiHaberi(dil));
  if (state.ulke.kriz?.tur === "kitlik") haberler.push(kitlikHaberi(dil));
  if (state.ulke.kriz?.tur === "isyan") haberler.push(isyanHaberi(dil));
  if (state.ulke.kriz?.tur === "altin_cag") haberler.push(altinCagHaberi(dil));
  if (state.hizip) haberler.push(hizipHaberi(dil, K(dil, state.hizip)));
  if (haberler.length === 0) haberler.push(sakinHaberi(dil, bolge));

  if (Math.random() < YEREL_HABER_SANSI) {
    const yh = yerelHaber(dil, state.cag, state.bolge);
    if (yh) haberler.push(yh);
  }
  return haberler;
}

export const BOLGELER_BY_CAG: Record<Cag, string[]> = {
  "Orta Çağ": ["Fransa", "Kutsal Roma", "Bizans", "Selçuklu"],
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
// 2026-08'de +%10, 2026-09'da (yama #2) +%5 → toplam ×1.15. 2026-09 ekonomi
// dengesindeki üçüncü +%10 zam (ekonomi sıkılaştırma turunda) geri alındı —
// karakterler çok kolay zenginleşiyordu. Her meslek ve çağda orantılı yansır
// (rütbe/enflasyon/itibar zaten ayrı çarpan kalemleri).
// Din Adamı tabanı 9.2 → 9.85: diğer iki mesleğin efektif tabanına yaklaşsın
// (pragmatik din adamı düşük-orta rütbelerde çok geride kalıyordu).
const TEMEL_MAAS: Record<string, number> = { Asker: 10.35, Tüccar: 11.5, "Din Adamı": 9.85, Zanaatkâr: 10.0 };

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
  const dil = state.dil;
  const kalemler: MaasKirilimKalemi[] = [
    { ad: T(dil, "Mutluluk"), yuzde: itibarDegerYuzdesi(state.mutluluk) },
    { ad: T(dil, "Şöhret"), yuzde: itibarUnYuzdesi(state.un) },
    { ad: T(dil, "Ahlak"), yuzde: itibarDegerYuzdesi(state.ahlak) },
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

/**
 * Kalıcı maaş çarpanının toplam üst/alt sınırı: olay + aile + ekip + yatırım
 * bonusları hep bu bandın içinde kalır. Faz 6 ekonomi rebalansı (2026-09 sonu,
 * kullanıcı isteği: "kalıcı maaş bonuslarını azalt"): tavan 1.20 → 1.15.
 */
export const MAAS_CARPANI_TAVAN = 1.15;
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
 * göre, çağa özel bir oranla bileşik büyür. Büyük denge turunda GELİR ve GİDER
 * enflasyonu ayrıştırıldı (kullanıcı: "Orta Çağ'da gelire %1, giderlere %2;
 * Sanayi Devrimi'nde gelire %2, gidere %3"). GELİR (maaş) + mülk/yatırım
 * maliyetleri `enflasyonCarpani`'yı; yaşam + konut + MAĞAZA GİDERLERİ (şifa +
 * lüks satın alma fiyatı ve lüks bakım masrafı) ise ayrı, her zaman biraz daha
 * yüksek `giderEnflasyonCarpani`'yı kullanır — böylece uzun oyunlarda giderler
 * gelirden hafifçe hızlı artıp reel dengeyi sıkılaştırır.
 */
const ENFLASYON_ORANI_YILLIK: Record<Cag, number> = {
  "Orta Çağ": 0.01,
  "Sanayi Devrimi": 0.02,
};

/**
 * Yaşam + konut giderlerine uygulanan, gelir enflasyonundan biraz yüksek yıllık oran.
 * (2→1.2 / 3→2.2: gelir–gider makası daraltıldı; orta-yaş borç kaymasını hafifletir.)
 */
const GIDER_ENFLASYON_ORANI_YILLIK: Record<Cag, number> = {
  "Orta Çağ": 0.012,
  "Sanayi Devrimi": 0.022,
};

export function enflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.01;
  return Math.pow(1 + oran, gecenYil);
}

/** Yaşam/konut giderlerine uygulanan bileşik gider enflasyon çarpanı (gelir enflasyonundan ayrı, biraz yüksek). */
export function giderEnflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = GIDER_ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.02;
  return Math.pow(1 + oran, gecenYil);
}

/** Finans ekranında gösterilecek toplam gelir enflasyonu yüzdesi (oyunun başından bu yana). */
export function enflasyonYuzdesiHesapla(state: CharacterState): number {
  return Math.round((enflasyonCarpani(state) - 1) * 100);
}

/** Gelir&Gider ekranındaki yaşam/kira seçim kartlarının, gerçek gider dökümüyle birebir hizalanması için kullanılan gider enflasyonu yüzdesi. */
export function giderEnflasyonYuzdesiHesapla(state: CharacterState): number {
  return Math.round((giderEnflasyonCarpani(state) - 1) * 100);
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
  Zanaatkâr: ["Zanaat Şurası Üyesi", "Loncalar Birliği Başkanı", "Şehrin Baş Mimarı", "Sanayi Piri"],
};

export function sehirYonetimUnvanGetir(meslek: string, seviye: number): string | null {
  if (seviye <= 0) return null;
  const liste = SEHIR_YONETIM_UNVANLARI[meslek];
  if (!liste) return null;
  if (seviye <= liste.length) return liste[seviye - 1];
  return `${liste[liste.length - 1]} (Seviye ${seviye})`;
}

/**
 * Şehir yönetimine bir kez girmek maaşa kalıcı, SABİT +%3 katar — seviyeyle
 * ölçeklenmez (seviye/unvan yalnızca prestij içindir, maaşa ek katkısı yoktur).
 */
const SEHIR_YONETIM_MAAS_CARPANI_ADIM = 0.03;

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
  // 20 turda +%40'a çıkıyordu, sonra +%0.375/tur ile tavan +%15'e çekildi;
  // ekonomi sıkılaştırma turunda tekrar +%10 tavanına döndürüldü.
  const kariyerYili = Math.min(state.tur_sayisi + 8, 40); // "ikinci seviyeden" başlar: taze karakter +%2 kıdem alır, tavan +%10
  const durumCarpani = state.durumlar.reduce((c, d) => c * (d.gelir_carpani ?? 1), 1);
  // Veba sonrası işçi kıtlığı, salgın hem aktifken hem de izi süren yıllarda maaşı büyütür.
  const vebaCarpani = state.veba && state.yil < state.veba.etkiBitisYili ? state.veba.gelirCarpani : 1;
  const ekonomiCarpani = state.ulke.ekonomi === "kotu" ? 0.8 : state.ulke.ekonomi === "iyi" ? 1.15 : 1;
  const dil = state.dil;
  const ekonomiAd = T(
    dil,
    state.ulke.ekonomi === "iyi" ? "Ekonomi iyi" : state.ulke.ekonomi === "kotu" ? "Ekonomi kötü" : "Ekonomi normal"
  );

  return {
    tabanMaas,
    kalemler: [
      { ad: T(dil, "Kıdem"), carpan: 1 + kariyerYili * 0.0025, grup: "kariyer" },
      { ad: T(dil, "Şehir yönetimi"), carpan: sehirYonetimMaasCarpani(state.sehir_yonetim_seviyesi), grup: "kariyer" },
      { ad: T(dil, "Kalıcı ödüller (köken + olaylar)"), carpan: maasCarpaniGetir(state), grup: "kariyer" },
      { ad: T(dil, "İtibarın (mutluluk·şöhret·ahlak)"), carpan: 1 + itibarToplam / 100, grup: "itibar" },
      { ad: T(dil, "Enflasyon"), carpan: enflasyonCarpani(state), grup: "donemsel" },
      { ad: ekonomiAd, carpan: ekonomiCarpani, grup: "donemsel" },
      { ad: T(dil, "Savaş"), carpan: state.ulke.savasta ? 0.85 : 1, grup: "donemsel" },
      { ad: T(dil, "Salgın (işçi kıtlığı)"), carpan: vebaCarpani, grup: "donemsel" },
      { ad: T(dil, "Geçici durumlar"), carpan: durumCarpani, grup: "donemsel" },
      { ad: T(dil, "Rütbe primi"), carpan: rutbeMaasCarpani(state.rutbe_seviye), grup: "rutbe" },
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
  // Zanaatkâr: uretim_kapasitesi şimdilik BİLİNÇLİ OLARAK etkisiz (×1) —
  // dengesi sonraya bırakıldı (kullanıcı isteği). Olaylar sayacı doldursun,
  // aktive edilmek istendiğinde tek satır: `1 + state.uretim_kapasitesi / N`.
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


export const MESLEKLER = ["Asker", "Tüccar", "Din Adamı", "Zanaatkâr"];

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

// Eski tekil rastgele "hayat amacı" 2026-09'da kaldırıldı; yerine meslek seçilince
// havuzdan çekilen 3 amaç geldi (bkz. data/hayatAmaclari.ts). Skor çarpanı artık
// `taban × 5` değil `taban × amacSkorCarpani(state)` (toplamsal, tavan yine ×5).

export function createCharacter(
  cag: Cag,
  bolge: string,
  yerlesimId: string,
  oyuncuIsmi?: string,
  dil?: string,
  istemciId?: string,
  istemciGecmisOlaylar?: string[]
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
  const bolgeOzellik = bolgeOzellikleriGetir(cag, bolge);
  const { yatkinliklar, kaynaklar } = yatkinlikHesapla(kisilik, aile, yerlesim, bolgeOzellik, bolge);
  const [dostAdi, rakipAdi] = rastgeleIkiIsimSec(cag, bolge);
  const anneAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "kadin", [dostAdi, rakipAdi]);
  const babaAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "erkek", [dostAdi, rakipAdi, anneAdi]);

  const state: CharacterState = {
    id: randomUUID(),
    isim: oyuncuIsmi?.trim() ? oyuncuIsmi.trim().slice(0, 40) : null,
    dil: dil === "en" ? "en" : "tr",
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
    konut_surekli_yasadigi_yil: null,
    yasam_secimi_id: VARSAYILAN_YASAM_SECIMI_ID,
    hazard_el_sayisi: 0,
    uc_kagitci_oyun_sayisi: 0,
    aile_meslegi: aile.ad,
    aile_mirasi_surduruldu: false,
    acilis_anlatimi: "",
    kisilik,
    kisilik_eksenleri: kisilikEksenleriUret(kisilik),
    hukumdar: liderGetir(bolge, yil, cag),
    bolge_bilgi: bolgeIstatistigiGetir(cag, bolge) ?? null,
    haberler: [],
    // 2026-09 denge turu (kullanıcı isteği): sağlık tabanı 100→80 (aile
    // artık her yönde ~±16 oynatabiliyor, ama 80 tabanla bile 100 tavanını
    // aşmıyor); yerleşim etkisi hâlâ ekleniyor.
    saglik: 80 + (aile.saglik ?? 0) + (yerlesim.saglik ?? 0) + (bolgeOzellik?.saglik ?? 0),
    // Başlangıç statları (aile bonusları hariç): mutluluk 50 (nötr), ahlak
    // 45 (itibar bandında hâlâ nötr, 40-60 arası — sadece taban biraz aşağı
    // çekildi), şöhret 20 (taze bir karakter az tanınır ama şöhretin nötr
    // bandı düşükten başladığı için ceza yemez, bkz. itibarUnYuzdesi).
    // HER aile artık mutluluğu da ~±12 bandında etkiler (eskiden hiçbiri
    // etkilemiyordu). İlk olaylar bu değerleri kolayca oynatır.
    mutluluk: 50 + (aile.mutluluk ?? 0) + (bolgeOzellik?.mutluluk ?? 0),
    // 2026-09 denge turu: taban 12→10, aile etkisi artık dar bir ~±20
    // bandında (eskiden +80/-25 gibi aşırı uçlar vardı); sonuç yine de
    // [5, 40]'a kırpılır — en zengin/fakir aile+yerleşim kombinasyonu bile
    // bu aralığın dışına taşmaz. Taban 5'te tutuldu (0 değil): oyuncu en
    // fakir kökende bile temel bir aksiyonu (sosyalleşme giriş ücreti vb.)
    // karşılayabilecek kadar parayla başlamalı.
    para: Math.max(5, Math.min(40, 10 + (aile.para ?? 0) + (yerlesim.para ?? 0) + (bolgeOzellik?.para ?? 0))),
    para_birimi: paraBirimiGetir(cag, bolge),
    maas_yillik: 0,
    un: 20 + (aile.un ?? 0) + (bolgeOzellik?.un ?? 0),
    ahlak: 45 + (aile.ahlak ?? 0) + (bolgeOzellik?.ahlak ?? 0),
    ordu_mevcudu: 0,
    ordu_techizat_seviyesi: 0,
    ticaret_sermaye: 0,
    nufuz: 0,
    uretim_kapasitesi: 0,
    suc_seviyesi: 0,
    hapis_ceza_kalan: 0,
    hapis_ceza_toplam: 0,
    hapis_tur_sayaci: 0,
    mulkler: [],
    mulk_bakim_kalan: {},
    mulk_alis_yili: {},
    magaza_envanteri: [],
    magaza_temel_kilit_bitis_yili: null,
    alkol_ziyaret_sayisi: 0,
    sosyallesme_aksiyon_kilit: {},
    yatkinliklar,
    yatkinlik_kaynaklari: kaynaklar,
    dost_adi: dostAdi,
    rakip_adi: rakipAdi,
    dost_puani: 50,
    rakip_puani: 50,
    // rakipler meslek seçilince (mesleğiSec) doldurulur — rakip_adi ilk rakip olur.
    rakipler: [],

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
    hayat_amaci: null,
    // 15 yaşında meslek seçilince (mesleğiSec) doldurulur.
    hayat_amaclari: [],
    omur_zirve_suc: 0,
    omur_kumar_net: 0,
    omur_sadaka_sayisi: 0,
    omur_hediye_sayisi: 0,
    omur_riskli_basari: 0,
    komik_olum_basarili_risk: false,
    komik_olum_ile_oldu: false,
    efsanevi_olum: null,
    relik_can_kurtardi: false,
    etiketler: [...(aile.etiketler ?? []), ...yerlesim.etiketler],
    durumlar: (aile.durumlar ?? []).map((d) => ({ ...d })),
    ulke: { savasta: false, vebada: false, ekonomi: "normal", kriz: null, nufusDurumu: "normal" },
    son_zorunlu_bagis_yili: null,
    son_zenginlik_sizinti_yili: null,
    son_rakip_soygun_yili: null,
    buyuk_savas: null,
    son_buyuk_savas_bitis_yili: null,
    veba: null,
    veba_gecirdi: false,
    son_veba_bitis_yili: null,
    veba_olum_riski: 0,
    veba_hayatta_kaldi: false,
    hapis_basarili_kacis: false,
    kucuk_kriz_sonraki_yil: yil + 5 + Math.floor(Math.random() * 3), // 5-7 yıl sonra ilk eşik
    gida_fiyat_sok_bitis_yili: null,
    borc_yardimi_alindi: false,
    salgin_korunma_yatirimi: null,
    kredi: null,
    aile_etkilesim_kilit: {},
    aile_talep: null,
    aile_talep_sonraki_yil: yil + 4,
    // Kral/yönetici ile başlangıçta neredeyse hiç ilişki yok (kullanıcı isteği);
    // şöhret arttıkça `yonetimYillikUygula` bunu yavaşça yukarı iter. Patron (iş
    // hattı) normal başlar.
    yonetim_iliski: 5,
    patron_iliski: 40,
    yonetim_etkilesim_kilit: {},
    yonetim_yakin_etkilesim: 0,
    yonetim_talep: null,
    yonetim_talep_sonraki_yil: yil + 6,
    gecikmis_takipler: [],
    tur_sayisi: 0,
    gecmis_olaylar: [],
    istemci_gecmis_olaylar: istemciGecmisOlaylar ?? [],
    istemci_id: istemciId ?? null,
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
    // "Kendi işine yatırım" kaldırıldı; eski kayıtlarda o sayaç (varsa) hâlâ kabaca
    // kariyer ilerlemesine sayılsın diye ×8 katkısı korunuyor (alan artık tipte yok,
    // ama eski JSON blob'unda bulunabilir).
    const eskiYatirim = (state as unknown as Record<string, unknown>).kendi_isi_yatirim_sayisi;
    state.kariyer_puani =
      (state.tur_sayisi ?? 0) * KARIYER_PUANI_YILLIK +
      (typeof eskiYatirim === "number" ? eskiYatirim * 8 : 0);
  }
  if (typeof state.son_terfi_yili !== "number") {
    state.son_terfi_yili = state.baslangic_yili ?? state.yil;
  }
  // "konut_sahibi" hayat amacının süreklilik sayacı sonradan eklendi. Zaten
  // nitelikli bir kademedeyse (Taş Ev+) sayacı şimdi başlatıyoruz (geçmişte ne
  // kadar orada kaldığını bilmiyoruz — geriye dönük bedava tamamlama vermemek
  // için muhafazakâr davranıyoruz, oyuncu buradan itibaren süreyi doldurur).
  if (state.konut_surekli_yasadigi_yil === undefined) {
    state.konut_surekli_yasadigi_yil =
      konutKademeIndeksi(state.konut_id) >= KONUT_SAHIBI_MIN_KADEME ? state.yil : null;
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
  // Mülk olayı garantisi (§11 kural 14) sonradan eklendi; eski kayıtlarda satın
  // alma yılı bilinmiyor — boş bırakılır, kural bu durumda otomatik olarak eski
  // fırsatçı (%12 şans) mekaniğe düşer (bkz. gameEngine.ts senaryoUret).
  if (!state.mulk_alis_yili || typeof state.mulk_alis_yili !== "object") state.mulk_alis_yili = {};
  // Mağaza sonradan eklendi; eski kayıtlarda alan yok — envanterBozulmasiUygula
  // (her tur) ve magazaConfigGetir/EnvanterPaneli buna doğrudan .some()/.map()
  // uyguladığı için eksikse çöküyordu (mağaza + envanter tamamen kayboluyordu).
  if (!Array.isArray(state.magaza_envanteri)) state.magaza_envanteri = [];
  if (typeof state.magaza_temel_kilit_bitis_yili !== "number") state.magaza_temel_kilit_bitis_yili = null;
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
  if (state.son_rakip_soygun_yili === undefined) state.son_rakip_soygun_yili = null;
  // Ömürde bir kez borç yardımı sonradan eklendi; eski kayıtlar bunu hiç almadı sayılır (yeniden alınabilsin).
  if (typeof state.borc_yardimi_alindi !== "boolean") state.borc_yardimi_alindi = false;
  // Zanaatkâr mesleği (uretim_kapasitesi) sonradan eklendi; diğer mesleklerdeki eski kayıtlarda 0 kalır.
  if (typeof state.uretim_kapasitesi !== "number") state.uretim_kapasitesi = 0;
  // Hapis ceza süresi sonradan eklendi; hapisteki eski kayıtlara makul bir kalan süre ver.
  if (typeof state.hapis_ceza_kalan !== "number") {
    state.hapis_ceza_kalan = state.etiketler.includes("hapiste") ? 4 : 0;
  }
  // hapis_ceza_toplam sonradan eklendi (§17, para/af ile erken çıkışı bandına
  // göre kısıtlayan kural için); eski hapisteki kayıtlarda kalan süreyi toplam say.
  if (typeof state.hapis_ceza_toplam !== "number") {
    state.hapis_ceza_toplam = state.etiketler.includes("hapiste") ? state.hapis_ceza_kalan : 0;
  }
  // Kaçış-başlangıcı geciktirme sayacı (Faz 8) sonradan eklendi; eski kayıtlarda
  // hapiste olan bir karakter zaten "içeride" sayılır (filtre kapansın) — ilk 2
  // hapisOlayi'nı zaten yaşamış kabul edilir ki kaçış olayları hemen açılabilsin.
  if (typeof state.hapis_tur_sayaci !== "number") {
    state.hapis_tur_sayaci = state.etiketler.includes("hapiste") ? 2 : 0;
  }
  // Kişisel veba hastalığı ölüm riski sonradan eklendi. Yeni bir vakada
  // vebaHastaligiBaslatEt bunu 70 yapıyor; göçmüş bir hasta kaydı da aynı
  // başlangıç değerini almalı (doğal −15/tur düşüşü zaten devrede).
  if (typeof state.veba_olum_riski !== "number") {
    state.veba_olum_riski = state.etiketler.includes("veba_hastasi") ? 70 : 0;
  }
  // Mini-oyun sayaçları sonradan eklendi.
  if (typeof state.hazard_el_sayisi !== "number") state.hazard_el_sayisi = 0;
  if (typeof state.uc_kagitci_oyun_sayisi !== "number") state.uc_kagitci_oyun_sayisi = 0;
  // 3'lü hayat amacı sistemi (§18) sonradan eklendi. Meslek seçilmişse havuzdan taze
  // 3 amaç ata; eski tekil hayat_amaci tamamlanmışsa bir bilgi bırak ama yeni amaçları
  // otomatik tamamlanmış saymayız (koşulları farklı). Meslek yoksa boş — mesleğiSec dolduracak.
  if (!Array.isArray(state.hayat_amaclari)) {
    state.hayat_amaclari =
      state.meslek && MESLEKLER.includes(state.meslek) ? amaclariUret(state.cag, state.meslek) : [];
  }
  if (typeof state.omur_zirve_suc !== "number") state.omur_zirve_suc = state.suc_seviyesi ?? 0;
  if (typeof state.omur_kumar_net !== "number") state.omur_kumar_net = 0;
  if (typeof state.omur_sadaka_sayisi !== "number") state.omur_sadaka_sayisi = 0;
  if (typeof state.omur_hediye_sayisi !== "number") state.omur_hediye_sayisi = 0;
  if (typeof state.omur_riskli_basari !== "number") state.omur_riskli_basari = 0;
  // Faz 5 tek seferlik skor bonusu bayrakları sonradan eklendi.
  if (typeof state.komik_olum_basarili_risk !== "boolean") state.komik_olum_basarili_risk = false;
  if (typeof state.komik_olum_ile_oldu !== "boolean") state.komik_olum_ile_oldu = false;
  if (typeof state.veba_hayatta_kaldi !== "boolean") state.veba_hayatta_kaldi = false;
  if (typeof state.hapis_basarili_kacis !== "boolean") state.hapis_basarili_kacis = false;
  // Dil alanı sonradan eklendi; eski kayıtlar her zaman Türkçe oynanmıştı.
  if (state.dil !== "en") state.dil = "tr";
  // Aile ekranı (eş/çocuk ilişkisi + etkileşim + talep) sonradan eklendi (§33).
  if (!state.aile_etkilesim_kilit || typeof state.aile_etkilesim_kilit !== "object") {
    state.aile_etkilesim_kilit = {};
  }
  // Sosyalleşme ekranı tur-harcamayan aksiyonları (içki/deli/sadaka/kulak/ısmarla/fal) sonradan eklendi.
  if (!state.sosyallesme_aksiyon_kilit || typeof state.sosyallesme_aksiyon_kilit !== "object") {
    state.sosyallesme_aksiyon_kilit = {};
  }
  if (state.aile_talep === undefined) state.aile_talep = null;
  if (typeof state.aile_talep_sonraki_yil !== "number") {
    state.aile_talep_sonraki_yil = state.yil + 4;
  }
  for (const c of state.cocuklar ?? []) {
    if (typeof c.iliski !== "number") c.iliski = 60;
  }
  // Derin rakip ilişkileri sonradan eklendi: meslek seçilmişse eski tekil
  // rakip_adi'ndan TEK bir rakip türet (2026-09: iki rakip yerine tek rakip).
  if (!Array.isArray(state.rakipler) || state.rakipler.length === 0) {
    if (state.meslek && MESLEKLER.includes(state.meslek)) {
      state.rakipler = [{ ad: state.rakip_adi, meslek: state.meslek, guc: 55, husumet: 35, yenildi: false }];
    } else {
      state.rakipler = [];
    }
  } else if (state.rakipler.length > 1) {
    // Eski kayıtlarda iki rakip olabilir — tekil rakip kuralına indir.
    state.rakipler = [state.rakipler[0]];
  }
  if (state.salgin_korunma_yatirimi === undefined) state.salgin_korunma_yatirimi = null;
  if (state.kredi === undefined) state.kredi = null;
  // Kariyer sayfası — yönetimle bağlar (§35) sonradan eklendi.
  if (typeof state.yonetim_iliski !== "number") state.yonetim_iliski = 40;
  if (typeof state.patron_iliski !== "number") state.patron_iliski = 40;
  if (!state.yonetim_etkilesim_kilit || typeof state.yonetim_etkilesim_kilit !== "object") {
    state.yonetim_etkilesim_kilit = {};
  }
  if (typeof state.yonetim_yakin_etkilesim !== "number") state.yonetim_yakin_etkilesim = 0;
  if (state.yonetim_talep === undefined) state.yonetim_talep = null;
  if (typeof state.yonetim_talep_sonraki_yil !== "number") {
    state.yonetim_talep_sonraki_yil = state.yil + 6;
  }
  // Çapraz-hayat tekrar önleme (istemci_id bazlı) sonradan eklendi.
  if (!Array.isArray(state.istemci_gecmis_olaylar)) state.istemci_gecmis_olaylar = [];
  if (state.istemci_id === undefined) state.istemci_id = null;
  // "Gecikmiş takip" havuzu sonradan eklendi.
  if (!Array.isArray(state.gecikmis_takipler)) state.gecikmis_takipler = [];
  // "Yedi Canlı" başarımının kalıcı bayrağı sonradan eklendi; eski kayıtlarda
  // bilinmiyor sayılır (retroaktif olarak kazandırılmaz — bir sonraki relik
  // tetiklenmesinde zaten normal yoldan set edilir).
  if (typeof state.relik_can_kurtardi !== "boolean") state.relik_can_kurtardi = false;
}

/** Oyuncu mesleğini seçtikten sonra çağrılır: miras bonusunu ve maaşı uygular. */
export function mesleğiSec(state: CharacterState, meslek: string): void {
  if (!MESLEKLER.includes(meslek)) throw new Error("Geçersiz meslek.");
  const aile = AILELER.find((a) => a.ad === state.aile_meslegi);
  const mirasSurduruldu = aile?.devamMeslegi === meslek;

  state.meslek = meslek;
  state.aile_mirasi_surduruldu = mirasSurduruldu;

  // 3 kişisel hayat amacı: havuzdan (ortak + meslek + çağ) 2 normal + 1 zor çekilir (§18).
  if (!state.hayat_amaclari || state.hayat_amaclari.length === 0) {
    state.hayat_amaclari = amaclariUret(state.cag, meslek);
    for (const a of state.hayat_amaclari) {
      const tanim = amacTanimiGetir(a.id);
      if (tanim) {
        hayatOlayiEkle(
          state,
          "🎯",
          T(state.dil, "Hayat amacı: {0}", [tanim.baslik[state.dil === "en" ? "en" : "tr"]])
        );
      }
    }
  }

  // Derin rakip ilişkileri (§13): meslektaş TEK isimli rakip — eski tekil
  // rakip_adi ile aynı kişi (geriye dönük uyum — olaylar {rakip}'i kullanır).
  if (state.rakipler.length === 0) {
    state.rakipler = [
      { ad: state.rakip_adi, meslek, guc: 48 + Math.floor(Math.random() * 22), husumet: 28 + Math.floor(Math.random() * 14), yenildi: false },
    ];
  }

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

  const dil = state.dil;
  const meslekCumlesi: Record<string, string> = {
    Asker: T(dil, "On beş yaşındasın ve eline verilen kılıçla {0} ordusuna yazıldın.", [K(dil, state.bolge)]),
    Tüccar: T(dil, "On beş yaşındasın ve ilk mal denkini sırtlanıp {0} pazarlarına adım attın.", [K(dil, state.bolge)]),
    "Din Adamı": T(dil, "On beş yaşındasın ve {0} cemaatinin hizmetine girmek üzere yola çıktın.", [K(dil, state.din_kultur)]),
  };
  const mirasCumlesi = mirasSurduruldu
    ? T(dil, "Ailenin mesleğini sürdürmeyi seçtin; ailenin adı bazı kapıları senin için şimdiden araladı.")
    : T(dil, "Ailenin yolundan farklı bir yol seçtin; kimse sana bu işi öğretmeyecek, her şeyi kendin öğreneceksin.");

  state.acilis_anlatimi = [
    state.acilis_anlatimi,
    meslekCumlesi[meslek] ?? T(dil, "On beş yaşındasın ve {0} olarak hayata atılıyorsun.", [K(dil, meslek)]),
    mirasCumlesi,
  ].join(" ");
}

function acilisAnlatimiUret(
  state: CharacterState,
  aile: AileTanimi,
  yerlesim: YerlesimTanimi
): string {
  const dil = state.dil;
  const bolgeAd = K(dil, state.bolge);
  // Aile anlatısı önce çevrilir (anahtar {bolge} içerir), sonra yer tutucular değişir.
  const aileMetni = K(dil, aile.anlati)
    .replace(/\{bolge\}/g, bolgeAd)
    .replace(/\{yil\}/g, String(state.yil));

  const [ozellik1, ozellik2] = state.kisilik;
  const o1 = K(dil, ozellik1).toLocaleLowerCase(dil === "en" ? "en" : "tr");
  const o2 = K(dil, ozellik2).toLocaleLowerCase(dil === "en" ? "en" : "tr");
  const kisilikCumlesi = T(dil, "Çocukluğundan beri etrafındakiler seni {0} ve {1} biri olarak tanır.", [o1, o2]);
  const yerlesimCumlesi = T(dil, "Ailen {0} topraklarının {1} kısmına yerleşmiş; sen de hayata burada gözlerini açtın.", [
    bolgeAd,
    K(dil, yerlesim.ad).toLocaleLowerCase(dil === "en" ? "en" : "tr"),
  ]);

  return [
    T(dil, "{0} yılı, {1} toprakları.", [state.yil, bolgeAd]),
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
  // Sağlık/mutluluk/ün/ahlak DAİMA tam sayı: pasif sürüklenmeler (Din Adamı ün +0.4,
  // Tüccar ahlak ±0.4, karaborsa ahlak -0.3) ve pasifRegenEtkisi'nin kesirli çıktısı
  // yüzden bunlar 43.6 gibi değerler alabiliyordu; Prisma Score.un Int alanı bu yüzden
  // patlıyordu (skor kaydı çökmesi). Her tur sonu clamp'te yuvarlanarak değişmez korunur.
  state.saglik = Math.round(clamp(state.saglik, 0, 100));
  state.mutluluk = Math.round(clamp(state.mutluluk, 0, 100));
  state.un = Math.round(clamp(state.un, 0, 100));
  state.ahlak = Math.round(clamp(state.ahlak, 0, 100));
  state.dost_puani = clamp(state.dost_puani, 0, 100);
  state.rakip_puani = clamp(state.rakip_puani, 0, 100);
  state.suc_seviyesi = clamp(state.suc_seviyesi, 0, 100);
  // Suçun ömür boyu ulaştığı tepe (amaç koşulları: "hiç aranmadan yaşa"). Suç seviyesi
  // artık pasif azalmıyor ama büyük baskın "temize çık" onu düşürebiliyor — bu sayaç unutmaz.
  state.omur_zirve_suc = Math.max(state.omur_zirve_suc ?? 0, state.suc_seviyesi);
  // Nüfuz pasif olarak kesirli birikir (+0.3/yıl); tam sayıda tutulur ki
  // arayüzde ve maaş kırılımında "12.6" gibi değerler görünmesin.
  state.nufuz = Math.round(Math.max(0, state.nufuz));
  if (state.es_adi) state.es_puani = clamp(state.es_puani, 0, 100);
  state.yonetim_iliski = clamp(state.yonetim_iliski ?? 40, 0, 100);
  state.patron_iliski = clamp(state.patron_iliski ?? 40, 0, 100);
  for (const c of state.cocuklar) {
    if (typeof c.iliski === "number") c.iliski = Math.round(clamp(c.iliski, 0, 100));
  }
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
      state.relik_can_kurtardi = true;
      hayatOlayiEkle(state, "✨", T(state.dil, "Kutsal bir emanet sayesinde ölümden döndü"));
      return;
    }
    state.aktif = false;
    state.olum_nedeni =
      mesaj ?? (state.saglik <= 0 ? T(state.dil, "Sağlık kaybı") : T(state.dil, "Bilinmeyen sebep"));
    // Ölüm anında tüm tamamlanmamış amaçlara son bir kez bak ("olumde" koşulları +
    // son turda kaçmış olabilecek "herhangi" koşulları). Skor yazımından önce kilitlenir.
    for (const a of amaclariOlumdeKontrol(state, state.para + gayrimenkulDegeriHesapla(state))) {
      const tanim = amacTanimiGetir(a.id);
      const ad = tanim ? tanim.baslik[state.dil === "en" ? "en" : "tr"] : a.id;
      hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını tamamladı: {0}", [ad]));
    }
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
    checkDeath(state, true, T(state.dil, "Yüz yaşını doldurdun; huzurlu bir ihtiyar olarak, uykunda son nefesini verdin."));
  }
  return artis;
}

/**
 * Yaş ilerledikçe bedenin çöküşü kademeli, kesin eşiklerle hızlanır: 55'ten
 * sonra yılda -4, 65'ten sonra yılda -7, 75'ten sonra ("ecel kapısı") yılda
 * -10 sağlık (2026-09 ekonomi dengesi: başlangıç eşiği 48→55'e çekildi, ileri
 * yaş -16→-10'a yumuşatıldı; orta oyun nefes alsın). Hiçbir konut/servet/rütbe
 * bu eşikleri değiştirmez. Konut + yaşam tarzının yıllık sağlık bonusu olay
 * hasarından toparlanmaya yardım eder ama pasifRegenEtkisi yumuşak tavanı (80)
 * yüzünden karakteri 100 canda sabitleyip yaşlanmayı yok saymaya yetmez. Bir
 * turda birden fazla yıl atlanırsa (yasArtisi > 1) her yıl kendi eşiğine göre
 * ayrı ayrı hesaplanır.
 */
export function yaslanmaUygula(state: CharacterState, yasArtisi: number): number {
  if (yasArtisi <= 0) return 0;
  let toplamKayip = 0;
  let yas = state.yas - yasArtisi;
  for (let i = 0; i < yasArtisi; i++) {
    yas += 1;
    if (yas >= 80) toplamKayip += 7;
    else if (yas >= 70) toplamKayip += 5;
    else if (yas >= 60) toplamKayip += 4;
    else if (yas >= 50) toplamKayip += 1;
  }
  state.saglik -= toplamKayip;
  return toplamKayip;
}

const KRONIK_SAGLIK_ESIGI = 30;
const KRONIK_MUTLULUK_ESIGI = 25;

// Evlilik ↔ mutluluk pasif sürüklenmesi (kullanıcı isteği: "evli olmamak mutluluk
// düşürsün, eşle kavga etmek de düşürsün"). pasifEkonomiUygula'da yıllık işler,
// yalnız EVLILIK_MORAL_YAS ve üstünde. Yalnızlık ile kötü evlilik moral aşındırır,
// iyi evlilik moral verir — böylece evlilik gerçek bir moral ekseni olur.
const EVLILIK_MORAL_YAS = 26;
const YALNIZLIK_MUTLULUK_YILLIK = 0.7; // bekar/dul, 26+ → -0.7/yıl
const KOTU_EVLILIK_ESIGI = 35; // es_puani bunun altındaysa "sürekli kavga"
const KOTU_EVLILIK_MUTLULUK_YILLIK_MIN = 0.8; // es_puani ~35'te ceza
const KOTU_EVLILIK_MUTLULUK_YILLIK_EK = 1.2; // es_puani 0'da toplam -2.0/yıl
const IYI_EVLILIK_ESIGI = 70; // es_puani bunun üstündeyse mutlu evlilik
const IYI_EVLILIK_MUTLULUK_YILLIK = 0.5; // +0.5/yıl

// ===== Aile ekranı: eş/çocuk ilişkisi pasif sürüklenmesi + para talebi (§33) =====
// Felsefe evlilik moraliyle aynı: ilgilenmezsen ilişki soğur, düşük ilişki moral
// aşındırır, oyuncu Aile ekranındaki etkileşimlerle (hediye/zaman/gezi) yukarı çeker.
const AILE_ES_ILISKI_DUSUS_YILLIK = 0.4;
const AILE_COCUK_ILISKI_DUSUS_YILLIK = 0.6;
const AILE_COCUK_KOTU_ESIGI = 35; // çocuk ilişkisi bunun altındaysa moral cezası
const AILE_COCUK_IYI_ESIGI = 75; // bunun üstündeyse küçük moral bonusu
const AILE_COCUK_MORAL_CEZA_KAP_YILLIK = 2.0; // tüm çocukların toplam cezası
const AILE_COCUK_MORAL_BONUS_KAP_YILLIK = 1.2;
const AILE_TALEP_YILLIK_IHTIMAL = 0.15;
const AILE_TALEP_SURESI_DOLMA_CEZA = 12; // görmezden gelinen talebin ilişki cezası

const AILE_TALEP_ES_KALEMLERI = [
  "yeni bir elbise",
  "gümüş bir ayna",
  "bir mücevher",
  "ipek bir şal",
  "güzel bir at",
  "yeni bir yatak takımı",
  "bir hizmetçi tutulması",
  "annesine bir hediye",
];
const AILE_TALEP_COCUK_KALEMLERI = [
  "yeni bir oyuncak",
  "bir çift sağlam ayakkabı",
  "kitaplar",
  "bir müzik aleti",
  "bir tay",
  "arkadaşlarıyla bir gezi",
  "yeni giysiler",
  "bir usta çıraklığı ücreti",
];

/** Yıllık pasif kontrol: eş/çocuk ilişkisi soğuması, düşük ilişki moral cezası, bekleyen talebin süresi dolması ve yeni talep üretimi. Bir anlatı cümlesi döndürebilir (gameEngine zamanAnlatimi'ye ekler). */
export function aileYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  let not: string | null = null;

  if (state.es_adi) {
    state.es_puani = Math.max(0, state.es_puani - AILE_ES_ILISKI_DUSUS_YILLIK * yasArtisi);
  }

  let cocukCeza = 0;
  let cocukBonus = 0;
  for (const c of state.cocuklar) {
    if (!c.yasiyor) continue;
    if (typeof c.iliski !== "number") c.iliski = 60;
    c.iliski = Math.max(0, c.iliski - AILE_COCUK_ILISKI_DUSUS_YILLIK * yasArtisi);
    if (c.iliski < AILE_COCUK_KOTU_ESIGI) {
      const siddet = (AILE_COCUK_KOTU_ESIGI - c.iliski) / AILE_COCUK_KOTU_ESIGI; // 0..1
      cocukCeza += (0.4 + siddet * 0.8) * yasArtisi;
    } else if (c.iliski >= AILE_COCUK_IYI_ESIGI) {
      cocukBonus += 0.4 * yasArtisi;
    }
  }
  state.mutluluk -= Math.min(cocukCeza, AILE_COCUK_MORAL_CEZA_KAP_YILLIK * yasArtisi);
  state.mutluluk += Math.min(cocukBonus, AILE_COCUK_MORAL_BONUS_KAP_YILLIK * yasArtisi);

  // Bekleyen talebin süresi doldu mu?
  if (state.aile_talep && state.yil > state.aile_talep.sonYil) {
    const t = state.aile_talep;
    if (t.kimden === "es" && state.es_adi) {
      state.es_puani = Math.max(0, state.es_puani - AILE_TALEP_SURESI_DOLMA_CEZA);
    } else if (
      t.kimden === "cocuk" &&
      t.cocukIndex != null &&
      state.cocuklar[t.cocukIndex]?.yasiyor
    ) {
      const c = state.cocuklar[t.cocukIndex];
      c.iliski = Math.max(0, c.iliski - AILE_TALEP_SURESI_DOLMA_CEZA);
    }
    state.mutluluk -= 4;
    not = T(state.dil, "{0} istediği şeyi alamamana alındı; aranıza bir soğukluk girdi.", [t.kimAdi]);
    state.aile_talep = null;
  }

  // Yeni talep üretimi
  const yasayanCocukVar = state.cocuklar.some((c) => c.yasiyor);
  if (
    !state.aile_talep &&
    state.yil >= state.aile_talep_sonraki_yil &&
    (state.es_adi || yasayanCocukVar) &&
    !state.etiketler.includes("hapiste") &&
    !state.etiketler.includes("yolculukta") &&
    Math.random() < AILE_TALEP_YILLIK_IHTIMAL
  ) {
    const yeni = aileTalebiUret(state);
    if (yeni) {
      state.aile_talep = yeni;
      state.aile_talep_sonraki_yil = state.yil + 5 + Math.floor(Math.random() * 4);
      if (!not) {
        not = T(state.dil, "{0} senden bir şey rica etti — Aile ekranından yanıtlayabilirsin.", [
          yeni.kimAdi,
        ]);
      }
    }
  }

  return not;
}

/** Rastgele bir eş/çocuk para talebi üretir; uygun kimse yoksa null. */
export function aileTalebiUret(state: CharacterState): AileTalep | null {
  const yasayanCocukIndexleri = state.cocuklar
    .map((c, i) => (c.yasiyor ? i : -1))
    .filter((i) => i >= 0);
  const esVar = Boolean(state.es_adi);
  const kaynaklar: ("es" | "cocuk")[] = [];
  if (esVar) kaynaklar.push("es");
  if (yasayanCocukIndexleri.length > 0) kaynaklar.push("cocuk");
  if (kaynaklar.length === 0) return null;
  const kimden = kaynaklar[Math.floor(Math.random() * kaynaklar.length)];

  const enf = enflasyonCarpani(state);
  // Servete hafif ölçekli, enflasyonlu 12-40 taban.
  const servetEk = Math.max(0, Math.min(20, Math.round(Math.max(0, state.para) * 0.03)));
  const tabanTutar = 12 + Math.floor(Math.random() * 20) + servetEk;
  const tutar = paraYuvarla(tabanTutar * enf);
  const sonYil = state.yil + 3 + Math.floor(Math.random() * 2);

  if (kimden === "es") {
    const kalem = AILE_TALEP_ES_KALEMLERI[Math.floor(Math.random() * AILE_TALEP_ES_KALEMLERI.length)];
    return {
      id: randomUUID(),
      kimden: "es",
      kimAdi: state.es_adi as string,
      cocukIndex: null,
      tutar,
      kalem,
      sonYil,
    };
  }
  const cocukIndex =
    yasayanCocukIndexleri[Math.floor(Math.random() * yasayanCocukIndexleri.length)];
  const kalem =
    AILE_TALEP_COCUK_KALEMLERI[Math.floor(Math.random() * AILE_TALEP_COCUK_KALEMLERI.length)];
  return {
    id: randomUUID(),
    kimden: "cocuk",
    kimAdi: state.cocuklar[cocukIndex].isim,
    cocukIndex,
    tutar,
    kalem,
    sonYil,
  };
}

// ===== Ekip: sadakat pasif sürüklenmesi (2026-09 hayat amacı dengesi) =====
// Sadakat eskiden yalnız hediyeEt (§34.3) ile artıyordu — çoğu oyuncu o sistemi hiç
// keşfetmediğinden "guvenilir_ekip" amacı neredeyse hiç tamamlanmıyordu. Aile/evlilik
// moraliyle aynı felsefede, küçük ve sessiz bir pasif artış: borçta değilken sadakat
// yavaşça yükselir (hediye hâlâ daha hızlı bir yol).
const EKIP_SADAKAT_PASIF_ARTIS_YILLIK = 0.25;

/** Yıllık pasif: borçta değilken her ekip üyesinin sadakati yavaşça yükselir. */
export function ekipSadakatYillikUygula(state: CharacterState, yasArtisi: number): void {
  if (state.para < 0 || state.ekip.length === 0) return;
  for (const uye of state.ekip) {
    uye.sadakat = Math.min(100, uye.sadakat + EKIP_SADAKAT_PASIF_ARTIS_YILLIK * yasArtisi);
  }
}

// ===== Kariyer sayfası: yönetimle bağlar pasif sürüklenmesi + dayatılan talep (§35) =====
// Aile ekranıyla aynı felsefe: ilgilenmezsen ilişki soğur; yüksek ilişki küçük bir
// sessiz perk verir; bazen yönetici/patron dayatılan bir bağış ya da sadakat yemini ister.
const YONETIM_ILISKI_DUSUS_YILLIK = 0.5;
const YONETIM_TALEP_SURESI_DOLMA_CEZA = 14;
const YONETIM_TALEP_YILLIK_IHTIMAL = 0.13;

/** Kariyer sayfası "yönetici" / "patron" talebi için insan-okunur gerekçeler. */
const YONETIM_TALEP_KALEMLERI: Record<"yonetici" | "patron", { bagis: string[]; sadakat: string[] }> = {
  yonetici: {
    bagis: [
      "saray onarımı için bağış",
      "ordu masrafları için katkı",
      "şehir surlarının tamiri için pay",
      "hükümdarın düğün masrafına katkı",
      "vergi açığını kapatmak için bağış",
    ],
    sadakat: [
      "meclis önünde bağlılık yemini",
      "hükümdarın seferine destek sözü",
      "muhaliflerden uzak durma taahhüdü",
    ],
  },
  patron: {
    bagis: [
      "lonca sandığına katkı",
      "atölye borcunun kapatılması için pay",
      "ortak yatırım için sermaye",
      "patronun kızının çeyizine katkı",
      "grev tazminatı için bağış",
    ],
    sadakat: [
      "loncaya bağlılık yemini",
      "rakip loncayla iş yapmama sözü",
      "patronun adamlarını kollama taahhüdü",
    ],
  },
};

/** Rastgele bir yönetim (yönetici/patron) dayatılan bağış / sadakat talebi üretir. */
export function yonetimTalebiUret(state: CharacterState): YonetimTalep {
  const kimden: "yonetici" | "patron" = Math.random() < 0.5 ? "yonetici" : "patron";
  const tur: "bagis" | "sadakat" = Math.random() < 0.6 ? "bagis" : "sadakat";
  const enf = enflasyonCarpani(state);
  const servetEk = Math.max(0, Math.min(30, Math.round(gayrimenkulDegeriHesapla(state) * 0.04)));
  const tutar =
    tur === "bagis" ? paraYuvarla((14 + Math.floor(Math.random() * 32) + servetEk) * enf) : 0;
  const havuz = YONETIM_TALEP_KALEMLERI[kimden][tur];
  return {
    id: randomUUID(),
    kimden,
    kimAdi:
      kimden === "yonetici"
        ? state.hukumdar ?? T(state.dil, "şehri yöneten kişi")
        : T(state.dil, "patronun"),
    tur,
    tutar,
    kalem: havuz[Math.floor(Math.random() * havuz.length)],
    sonYil: state.yil + 3 + Math.floor(Math.random() * 2),
  };
}

/**
 * Yönetimle bağların yıllık pasif işlemesi (§35): iki hattın doğal soğuması,
 * yüksek ilişkinin küçük perkleri, bekleyen talebin süresinin dolması ve yeni
 * talep üretimi. Bir anlatı cümlesi döndürebilir (aile deseni).
 */
export function yonetimYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  let not: string | null = null;

  state.yonetim_iliski = Math.max(0, state.yonetim_iliski - YONETIM_ILISKI_DUSUS_YILLIK * yasArtisi);
  state.patron_iliski = Math.max(0, state.patron_iliski - YONETIM_ILISKI_DUSUS_YILLIK * yasArtisi);
  // Şöhret arttıkça kral seni yavaşça fark eder — küçük pasif artış (un≤30 → 0,
  // un=100 → yılda ~+0.63; yıllık düşüşü ancak yüksek şöhrette geçer).
  const unItisi = Math.max(0, (state.un - 30) / 100) * 0.9 * yasArtisi;
  if (unItisi > 0) state.yonetim_iliski = Math.min(100, state.yonetim_iliski + unItisi);
  // "Çok sık üstüne gitme" sayacı zamanla soğur (bir tur ~2-4 puan siler).
  state.yonetim_yakin_etkilesim = Math.max(0, (state.yonetim_yakin_etkilesim ?? 0) - yasArtisi * 2);

  // Yüksek ilişki: küçük, sessiz perk.
  if (state.yonetim_iliski >= 70) {
    state.suc_seviyesi = Math.max(0, state.suc_seviyesi - 0.5 * yasArtisi);
  }
  if (state.patron_iliski >= 70) {
    state.kariyer_puani += 0.5 * yasArtisi;
  }

  // Bekleyen talebin süresi doldu mu?
  if (state.yonetim_talep && state.yil > state.yonetim_talep.sonYil) {
    const t = state.yonetim_talep;
    if (t.kimden === "yonetici") {
      state.yonetim_iliski = Math.max(0, state.yonetim_iliski - YONETIM_TALEP_SURESI_DOLMA_CEZA);
    } else {
      state.patron_iliski = Math.max(0, state.patron_iliski - YONETIM_TALEP_SURESI_DOLMA_CEZA);
    }
    state.mutluluk -= 4;
    not = T(state.dil, "{0} talebini görmezden geldin; arası açıldı.", [t.kimAdi]);
    state.yonetim_talep = null;
  }

  // Yeni talep üretimi.
  if (
    !state.yonetim_talep &&
    state.yil >= state.yonetim_talep_sonraki_yil &&
    !state.etiketler.includes("hapiste") &&
    !state.etiketler.includes("yolculukta") &&
    Math.random() < YONETIM_TALEP_YILLIK_IHTIMAL
  ) {
    const yeni = yonetimTalebiUret(state);
    state.yonetim_talep = yeni;
    state.yonetim_talep_sonraki_yil = state.yil + 6 + Math.floor(Math.random() * 5);
    if (!not) {
      not = T(state.dil, "{0} senden bir şey bekliyor — Kariyer ekranından yanıtlayabilirsin.", [
        yeni.kimAdi,
      ]);
    }
  }

  return not;
}

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

/**
 * Normal olay havuzunu tamamen kapatıp kendi özel havuzuna geçiren etiketler
 * (§8/§17/§27). Tasarımca KARŞILIKLI DIŞLAYICIdırlar: ikisi birden set olursa
 * hiçbir olay ikisini de sağlayamaz ve olaySec olaysız kalır. etiketEkle bu
 * invariant'ı zorunlu kılar (yeni bir kilit eklenince diğerleri düşer);
 * olaySecici.ts ayrıca son çare fallback'iyle throw'u engeller.
 */
export const HAVUZ_KILIT_ETIKETLERI = ["hapiste", "yolculukta", "kacak", "veba_hastasi"] as const;

export function etiketEkle(state: CharacterState, etiketler?: string[]): void {
  if (!etiketler) return;
  for (const etiket of etiketler) {
    if (state.etiketler.includes(etiket)) continue;
    // Bir havuz-kilit etiketi eklenirken, çakışan diğer havuz kilitlerini kaldır
    // (karşılıklı dışlama invariant'ı). Yeni eklenen kilit "kazanır".
    if ((HAVUZ_KILIT_ETIKETLERI as readonly string[]).includes(etiket)) {
      state.etiketler = state.etiketler.filter(
        (e) => e === etiket || !(HAVUZ_KILIT_ETIKETLERI as readonly string[]).includes(e)
      );
    }
    state.etiketler.push(etiket);
  }
}

/** Karakter bir havuz-kilit etiketi altında mı (normal olay havuzu kapalı mı)? */
export function havuzKilidiVar(state: CharacterState): boolean {
  return (HAVUZ_KILIT_ETIKETLERI as readonly string[]).some((e) => state.etiketler.includes(e));
}

// §17: 50+ aranma bandından (gameEngine.ts HAPIS_CEZA_BASKIN_MIN_YIL ile aynı
// eşik — o banttaki cezalar hep bu değerden başlar) gelen ağır bir tutuklamada,
// para/af ile KESİN serbest bırakma sunan olaylar (OlayTanimi.hapisParaylaCikisOlayi)
// en az bu kadar yıl yatılana kadar havuzdan gizlenir. Fiziksel kaçış girişimleri
// bu kısıtlamadan muaftır, her zaman denenebilir.
const HAPIS_AGIR_CEZA_ESIGI_YIL = 7;
const HAPIS_ERKEN_CIKIS_MIN_YIL_YATILAN = 5;

/** Ağır bir tutuklamadan (toplam ceza ≥7y) para/af ile erken çıkış — en az 5 yıl yatılmış olmalı. Hafif tutuklamalarda (toplam <7y) her zaman true. */
export function hapisErkenCikisMumkunMu(state: CharacterState): boolean {
  if (state.hapis_ceza_toplam < HAPIS_AGIR_CEZA_ESIGI_YIL) return true;
  const yilYatilan = state.hapis_ceza_toplam - state.hapis_ceza_kalan;
  return yilYatilan >= HAPIS_ERKEN_CIKIS_MIN_YIL_YATILAN;
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
        olumculDurum = T(state.dil, "{0} yüzünden hayatını kaybetti.", [K(state.dil, durum.ad)]);
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
  /** Bu turda ömürde bir kez tetiklenen kilise/eş dost borç yardımıyla kapatılan tutar (yoksa 0). */
  borcYardimi: number;
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
  // Yaşam + kira giderleri, gelir enflasyonundan AYRI ve biraz daha yüksek olan
  // gider enflasyonuyla şişer (büyük denge turu — kullanıcı isteğiyle çağ başına
  // ayrı oran: OÇ gider %2, SD gider %3). Eskiden "gelir enflasyonunun %70→%100'ü"
  // gibi kademeli bir yama vardı; artık kalıcı ayrı oran kullanılıyor ve Gelir&Gider
  // ekranındaki seçim kartları da tam bu çarpanı gösterdiği için kart tutarı gerçek
  // gider dökümüyle birebir tutuyor. Evcil hayvan / savaş vergisi (maaşa endeksli)
  // gelir enflasyonunda kalır.
  const giderEnflasyon = giderEnflasyonCarpani(state);
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  // Büyük savaş sırasında gıda pahalanır (gidaCarpani); küçük kriz tetiklendiği yıl için
  // ayrıca ×2 tek yıllık bir şok biner — ikisi çarpımsal birleşir (nadir ama kasıtlı).
  const savasGidaCarpani = state.buyuk_savas ? state.buyuk_savas.gidaCarpani : 1;
  const krizSokCarpani = state.gida_fiyat_sok_bitis_yili !== null && state.yil < state.gida_fiyat_sok_bitis_yili ? 2 : 1;
  // Veba izi sürerken (aktif + 10-15 yıllık kalıcı iz) boş evler yüzünden kira düşer.
  const vebaKiraCarpani = state.veba && state.yil < state.veba.etkiBitisYili ? state.veba.konutKiraCarpani : 1;
  return {
    yasam: paraYuvarla(
      (yasamSecenegi?.maliyetYillik ?? 0) * yasamMaliyetCarpaniGetir(state) * savasGidaCarpani * krizSokCarpani * giderEnflasyon
    ),
    konut: paraYuvarla((konutGetir(state.konut_id)?.kiraYillik ?? 0) * vebaKiraCarpani * giderEnflasyon),
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
    const dalga = 0.85 + Math.random() * 0.3; // 0.85x - 1.15x (büyük denge turu: kullanıcı isteğiyle bant 0.85–1.15)
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
    // Cemaat içindeki nüfuz da yıllar içinde sessizce birikir: olayları hep
    // "güvenli" oynayan bir din adamı bile yavaşça nüfuz → maaş çarpanı toplar.
    state.nufuz += 0.3 * yasArtisi;
  } else if (state.meslek === "Tüccar") {
    state.ahlak += (netGelir >= 0 ? -0.4 : 0.4) * yasArtisi;
  }

  // Evlilik ↔ mutluluk: yalnızlık ve kötü evlilik morali aşındırır, mutlu evlilik
  // moral verir. Yalnız 26 yaş ve üstünde; olayların etkisini domine etmeyen küçük
  // bir yıllık sürüklenme (meslek sürüklenmesiyle aynı felsefe).
  if (state.yas >= EVLILIK_MORAL_YAS) {
    if (!state.es_adi) {
      state.mutluluk -= YALNIZLIK_MUTLULUK_YILLIK * yasArtisi;
    } else if (state.es_puani < KOTU_EVLILIK_ESIGI) {
      // Eşle sürekli kavga: es_puani ne kadar düşükse ceza o kadar ağır.
      const siddet = (KOTU_EVLILIK_ESIGI - state.es_puani) / KOTU_EVLILIK_ESIGI; // 0..1
      state.mutluluk -=
        (KOTU_EVLILIK_MUTLULUK_YILLIK_MIN + siddet * KOTU_EVLILIK_MUTLULUK_YILLIK_EK) * yasArtisi;
    } else if (state.es_puani >= IYI_EVLILIK_ESIGI) {
      state.mutluluk += IYI_EVLILIK_MUTLULUK_YILLIK * yasArtisi;
    }
  }

  // Borç kapatma mekaniği: borçtayken bütçesini artıya çevirmiş bir karakter
  // (netGelir > 0) borcunu AKTİF ödüyor sayılır — faiz yarıya iner ve net gelirin
  // bir kısmı kadar ek anapara affı verilir (alacaklı taksitlendirdi). Borç stresi
  // sağlık/mutluluk cezası (2026-09 dengesi: sağlık −1, mutluluk −2 yıllık — eskiden
  // sağlık −2, mutluluk cezası yoktu) her durumda uygulanır.
  let borcaGirdi = false;
  let faiz = 0;
  let borcYardimi = 0;
  if (state.para < 0) {
    borcaGirdi = true;
    const borcTutari = Math.abs(state.para);
    state.saglik -= 1 * yasArtisi;
    state.mutluluk -= 2 * yasArtisi;
    if (netGelir > 0) {
      // Aktif ödüyor: faiz %2/yıl + net gelirin %25'i kadar ek anapara affı.
      faiz = paraYuvarla(borcTutari * 0.02 * yasArtisi);
      state.para = paraYuvarla(Math.min(0, state.para - faiz + netGelir * 0.25));
    } else {
      // Ödeyemiyor: faiz %4/yıl (tavan yok — borç büyüdükçe faiz de büyür).
      faiz = paraYuvarla(borcTutari * 0.04 * yasArtisi);
      state.para -= faiz;
    }
    // Ömürde BİR KEZ: borç sürerken ve bütçe hâlâ açık verirken (netGelir <= 0)
    // kilise/eş dost bir kereliğine borcun bir kısmını (en fazla 50, borç daha
    // azsa tamamını) kapatır. Spiral yerine kurtulabilir bir çukur olsun diye.
    if (!state.borc_yardimi_alindi && netGelir <= 0 && state.para < 0) {
      borcYardimi = Math.min(Math.abs(state.para), 50);
      state.para = paraYuvarla(state.para + borcYardimi);
      state.borc_yardimi_alindi = true;
    }
  }

  clampStats(state);
  return { borcaGirdi, netGelir, yillikGelirler, faiz, giderKalemleri, borcYardimi };
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
  // "konut_sahibi" hayat amacı (§18) bir kademeye taşınmayı değil, orada BİR
  // SÜRE kesintisiz yaşamayı ister: nitelikli banda (Taş Ev+) yeni giriliyorsa
  // sayaç başlar, bandın dışına çıkılınca sıfırlanır; bandın İÇİNDE yükselmek
  // (Taş Ev→Konak gibi) sayacı bozmaz.
  const eskiNitelikli = konutKademeIndeksi(state.konut_id) >= KONUT_SAHIBI_MIN_KADEME;
  const yeniNitelikli = konutKademeIndeksi(konutId) >= KONUT_SAHIBI_MIN_KADEME;
  if (yeniNitelikli && !eskiNitelikli) {
    state.konut_surekli_yasadigi_yil = state.yil;
  } else if (!yeniNitelikli) {
    state.konut_surekli_yasadigi_yil = null;
  }
  state.konut_id = konutId;
  clampStats(state);
  return T(state.dil, "{0}'e taşındın.", [K(state.dil, yeniKonut.ad)]);
}

/** Oyuncunun istediği an tetikleyebileceği yaşam tarzı değişimi; bir tur/maliyet gerektirmez. */
export function yasamSecimiDegistir(state: CharacterState, secimId: string): string {
  const yeniSecenek = yasamSecenegiGetir(secimId);
  if (!yeniSecenek) throw new Error("Geçersiz yaşam tarzı seçimi.");
  if (secimId === state.yasam_secimi_id) throw new Error("Zaten bu şekilde yaşıyorsun.");
  state.yasam_secimi_id = secimId;
  clampStats(state);
  return T(state.dil, 'Artık "{0}" tarzında yaşıyorsun.', [K(state.dil, yeniSecenek.ad)]);
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
  const dil = state.dil;
  const b = (tr: string, args?: (string | number)[]) => T(dil, tr, args); // kısa yardımcı
  const cumleler: string[] = [];
  void basarili; // artık dolgu cümlesi üretilmiyor; imza geriye dönük uyum için korundu

  if (etki.detay) cumleler.push(etki.detay);

  // Yalnızca çiplerde GÖRÜNMEYEN, gerçekten yeni bilgi taşıyan tek bir cümle
  // eklenir. Para/ün/ahlak/hafif sağlık deltaları zaten EtkiCipleri'nde sayı
  // olarak var — burada tekrar anlatmak "her şeyi iki kere söyleme" sorunuydu.
  const ekCumle =
    (etki.yeni_meslek
      ? b("Artık {0} olarak anılıyorsun.", [K(dil, etki.yeni_meslek).toLocaleLowerCase(dil === "en" ? "en" : "tr")])
      : null) ??
    (etki.durum_ekle
      ? etki.durum_ekle.tur === "kalici"
        ? b("{0} artık hayatının kalıcı bir parçası.", [K(dil, etki.durum_ekle.ad)])
        : b("{0} bir süre daha peşini bırakmayacak.", [K(dil, etki.durum_ekle.ad)])
      : null) ??
    (etki.saglik && Math.abs(etki.saglik) >= 25
      ? etki.saglik > 0
        ? b("Kendini uzun zamandır olmadığı kadar dinç hissediyorsun.")
        : b(
            sec([
              "Aldığın hasar ağırdı; günlerce yatakta kaldın.",
              "Yaraların derindi, bir daha eskisi gibi olmayacaksın.",
            ])
          )
      : null) ??
    null;

  if (ekCumle) cumleler.push(ekCumle);

  // Söylenecek somut bir şey yoksa boş dön — istemci `etki.mesaj`'ı tek başına
  // gösterir (dolgu "olay sessizce kapandı" cümlesi kaldırıldı).
  return cumleler.join(" ");
}

/**
 * Bir turda geçen yılların kısa özeti: EN FAZLA tek cümle, o da yalnızca
 * gerçekten önemli bir durumsal uyarı varsa (borç > kronik hastalık > veba >
 * savaş > kötü ekonomi). Yıllık kazanç artık burada YAZILMAZ — üst şeritteki
 * para deltası ve sol paneldeki gelir özeti zaten gösteriyor. Durumsal bir
 * uyarı da yoksa `null` döner ve istemci turda yalnız olay mesajını gösterir.
 */
export function zamanAnlatimiUret(
  state: CharacterState,
  yasArtisi: number,
  ekonomi: EkonomiSonucu
): string | null {
  if (yasArtisi <= 0) return null;

  const dil = state.dil;
  const surenHastalik = state.durumlar.find((d) => d.tur === "gecici" && (d.tur_basi_saglik ?? 0) < 0);

  if (ekonomi.borcaGirdi) {
    return ekonomi.faiz > 0
      ? T(dil, "Borcun kapanmadı, üstüne {0} {birim} faiz bindi.", [ekonomi.faiz]).replace(/\{birim\}/g, state.para_birimi)
      : T(dil, "Borcun hâlâ kapanmadı, tefeciler peşini bırakmıyor.");
  }
  if (surenHastalik) {
    return T(dil, "{0} bu süre boyunca da seni yatağa düşürdü.", [K(dil, surenHastalik.ad)]);
  }
  if (state.ulke.vebada) {
    return T(dil, "Salgın sürüyordu, cenaze alayları artık gündelikti.");
  }
  if (state.ulke.savasta) {
    return T(dil, "Savaş sürüyordu; pazarlar durgun, insanlar tedirgindi.");
  }
  if (state.ulke.ekonomi === "kotu") {
    return T(dil, "Ekonomik darlık herkesi vurmuştu, ekmek her ay biraz daha pahalandı.");
  }
  return null;
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
  return `🎲 ${T(state.dil, olay.mesaj)
    .replace(/\{bolge\}/g, K(state.dil, state.bolge))
    .replace(/\{dost\}/g, state.dost_adi)
    .replace(/\{rakip\}/g, state.rakip_adi)}`;
}

/**
 * Skor: her eksen KENDİ puanını bağımsız üretir, hepsi TOPLANIR, sonra tik'ler
 * (saray/yolculuk/gizemli-eşya) ve hayat amacı çarpanı uygulanır (2026-09 reformu —
 * eski çarpımsal `yaş×şöhret×servetFaktörü×amaçÇarpanı` formülünün yerini aldı; o
 * formülde ahlak/mutluluk/rütbe hiç kullanılmıyordu ve tek bir zayıf eksen (ör.
 * şöhret=0) skoru neredeyse sıfırlıyordu). Toplamsal yapı oyuncuya EKSEN EKSEN
 * kırılım göstermeyi de mümkün kılıyor (`hesaplaSkorKirilimi`, ölüm ekranı).
 *
 * - servetPuanı  = servet × (yaş/2)   — servet = nakit+gayrimenkul (madde 23);
 *   borçta (servet≤0) katkı 0. Yaşla çarpılması "ömür boyu biriktirilen servet"
 *   hissi verir, ayrıca yaş pratikte ~85'te tavanlandığı için kendiliğinden sınırlı.
 * - şöhretPuanı  = şöhret(un) × 300
 * - ahlakPuanı   = ahlak × 200
 * - mutlulukPuanı= mutluluk × 100
 * - rütbePuanı   = sabit tablo, S1..S5: 1.250 / 3.000 / 5.250 / 8.000 / 11.250
 * - tikPuanı     = 3.000 × (sarayda + yolculuk_tamamlandi + gizemli eşya sahipliği)
 *   — her biri TOPLAMSAL (çarpımsal değil), birbirini büyütmesin diye.
 * - amaçÇarpanı  = max(1, Σ tamamlanan hayat amacı bonusları) — değişmedi, ×1..×5.
 */
const SKOR_RUTBE_PUANI = [625, 1500, 2625, 4000, 5625] as const;
const SKOR_TIK_PUANI = 3000;
const SKOR_SOHRET_CARPAN = 300;
const SKOR_AHLAK_CARPAN = 200;
const SKOR_MUTLULUK_CARPAN = 100;
/**
 * Faz 5 (2026-09 sonu) — tek seferlik "başarı olayı" skor bonusları. Her biri
 * TOPLAMSAL (tikPuani gibi diğer eksenlerin üstüne biner, çarpımsal değil) ve
 * bir ömürde en fazla bir kez sayılır (ilgili CharacterState bayrağı state
 * boyunca en fazla bir kez true'ya döner, bkz. gameEngine.ts). Yolculuk
 * tamamlama zaten tikPuani'nin bir parçasıdır (+3000) — buradaki +2000 ayrı,
 * ek bir bonustur (kullanıcı isteği: "yolculuğu tamamlama" ayrıca ödüllendirilsin.
 */
const SKOR_KOMIK_OLUM_BASARILI_RISK_PUANI = 3000;
const SKOR_KOMIK_OLUM_ILE_OLDU_PUANI = 2000;
const SKOR_YOLCULUK_TAMAMLAMA_BONUS_PUANI = 2000;
const SKOR_VEBA_HAYATTA_KALMA_PUANI = 2000;
const SKOR_HAPIS_BASARILI_KACIS_PUANI = 2000;

export interface SkorKirilimi {
  servetPuani: number;
  sohretPuani: number;
  ahlakPuani: number;
  mutlulukPuani: number;
  rutbePuani: number;
  tikPuani: number;
  tikSayisi: number;
  sarayda: boolean;
  yolculukTamamlandi: boolean;
  gizemliEsyaSahibi: boolean;
  /** Faz 5 tek seferlik başarı-olayı bonuslarının toplamı (komik ölüm risk/ölüm, yolculuk, veba, hapis kaçışı). */
  basariOlayiPuani: number;
  temelToplam: number;
  amacCarpani: number;
  skor: number;
}

/** Skoru eksen eksen kırar — ölüm ekranında oyuncuya gösterilir. */
export function hesaplaSkorKirilimi(state: CharacterState): SkorKirilimi {
  const servet = state.para + gayrimenkulDegeriHesapla(state);
  const servetPuani = servet > 0 ? Math.round(servet * (state.yas / 2)) : 0;
  const sohretPuani = Math.round(Math.max(state.un, 0) * SKOR_SOHRET_CARPAN);
  const ahlakPuani = Math.round(Math.max(state.ahlak, 0) * SKOR_AHLAK_CARPAN);
  const mutlulukPuani = Math.round(Math.max(state.mutluluk, 0) * SKOR_MUTLULUK_CARPAN);
  const rutbeIndeks = Math.min(Math.max(state.rutbe_seviye, 1), 5) - 1;
  const rutbePuani = SKOR_RUTBE_PUANI[rutbeIndeks];
  const sarayda = state.etiketler.includes("sarayda");
  const yolculukTamamlandi = state.etiketler.includes("yolculuk_tamamlandi");
  const gizemliEsyaSahibi = state.etiketler.some(
    (e) => e.startsWith("envanter:") || e.startsWith("esya:")
  );
  const tikSayisi = (sarayda ? 1 : 0) + (yolculukTamamlandi ? 1 : 0) + (gizemliEsyaSahibi ? 1 : 0);
  const tikPuani = tikSayisi * SKOR_TIK_PUANI;
  const basariOlayiPuani =
    (state.komik_olum_basarili_risk ? SKOR_KOMIK_OLUM_BASARILI_RISK_PUANI : 0) +
    (!state.komik_olum_basarili_risk && state.komik_olum_ile_oldu ? SKOR_KOMIK_OLUM_ILE_OLDU_PUANI : 0) +
    (yolculukTamamlandi ? SKOR_YOLCULUK_TAMAMLAMA_BONUS_PUANI : 0) +
    (state.veba_hayatta_kaldi ? SKOR_VEBA_HAYATTA_KALMA_PUANI : 0) +
    (state.hapis_basarili_kacis ? SKOR_HAPIS_BASARILI_KACIS_PUANI : 0);
  const temelToplam =
    servetPuani + sohretPuani + ahlakPuani + mutlulukPuani + rutbePuani + tikPuani + basariOlayiPuani;
  // Eski kayıt/test (hayat_amaclari boş, tekil hayat_amaci dolu) için ×5 fallback korunur.
  const amacCarpani =
    (state.hayat_amaclari?.length ?? 0) > 0
      ? amacSkorCarpani(state)
      : state.hayat_amaci?.tamamlandi
        ? 5
        : 1;
  const skor = Math.round(temelToplam * amacCarpani);
  return {
    servetPuani,
    sohretPuani,
    ahlakPuani,
    mutlulukPuani,
    rutbePuani,
    tikPuani,
    tikSayisi,
    sarayda,
    yolculukTamamlandi,
    gizemliEsyaSahibi,
    basariOlayiPuani,
    temelToplam,
    amacCarpani,
    skor,
  };
}

export function hesaplaSkor(state: CharacterState): number {
  return hesaplaSkorKirilimi(state).skor;
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
    hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını tamamladı: {0}", [K(state.dil, amac.ad)]));
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
 * etkisi otomatik uygulanır); ayrıca gıda fiyatını ×2 yapan bir şok bindirir.
 * Şok +2 yıl geçerli (bu fonksiyon her turda pasifEkonomiUygula'dan SONRA
 * çağrıldığı için, +1 yaparsak bir sonraki tur yıl zaten eşiği geçmiş oluyor ve
 * ×2 hiç tahsil edilmiyordu — eski hata).
 */
export function kucukKrizKontrolEt(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || state.ulke.kriz) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  if (state.yil < state.kucuk_kriz_sonraki_yil) return null;
  const sureYil = KUCUK_KRIZ_SURE_MIN_YIL + Math.floor(Math.random() * (KUCUK_KRIZ_SURE_ARALIK_YIL + 1));
  state.ulke.kriz = { tur: "kitlik", bitisYili: state.yil + sureYil };
  state.gida_fiyat_sok_bitis_yili = state.yil + 2;
  state.kucuk_kriz_sonraki_yil =
    state.yil + KUCUK_KRIZ_SONRAKI_ESIK_MIN_YIL + Math.floor(Math.random() * (KUCUK_KRIZ_SONRAKI_ESIK_ARALIK_YIL + 1));
  return T(state.dil, KUCUK_KRIZ_FLAVOR[Math.floor(Math.random() * KUCUK_KRIZ_FLAVOR.length)]);
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
    const mesaj = T(state.dil, KRIZ_BITIS_MESAJI[kriz.tur]);
    state.ulke.kriz = null;
    return mesaj;
  }
  return null;
}

// 2026-09 (kullanıcı isteği): "aranma seviyesi zamanla çok yavaş düşsün" — tamamen
// suç işlemeyi bırakan bir karakter artık sonsuza dek sabit kademede kalmaz, ama
// düşüş kasıtlı olarak çok yavaştır (0.15/yıl → 100'den 0'a inmesi ~667 yıl sürer,
// gerçekçi bir ömürde en fazla bir-iki bandı aşağı çeker). Ana düşüş yolu hâlâ
// aranmaSeviyesi.ts'teki kefaret/rüşvet seçenekleri (suc_artis negatif) ve büyük
// baskının suc_seviyesi_ayarla'sıdır — bu sadece küçük bir pasif "unutulma" payı.
const SUC_SEVIYESI_PASIF_AZALMA_YILLIK = 0.15;

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
 * ZORUNLU_BAGIS_ESIGI'yi (350) aştıkça, en az 5 yıllık cooldown sonrasında yıllık
 * %30 ihtimalle hükümdar servetin %20-25'ini zorunlu "bağış" olarak alır.
 * Zenginliğin TEK bedeli budur — eski pasif %4/yıl zenginlik vergisi kaldırıldı;
 * bu tek seferlik, büyük ve kendi cooldown'una sahip bir mekanik olarak kaldı.
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
      mesaj: T(state.dil, "👑 Hükümdar zenginleştiğini fark etti; kraliyet hazinesi için zorla {0} {birim} bağış aldı.", [
        miktar,
      ]).replace(/\{birim\}/g, state.para_birimi),
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

const ZENGINLIK_SIZINTI_FLAVOR: string[] = [
  "🗡️ Bir hırsız gece kilerine girdi; sabah {0} eksikti.",
  "💰 {1} kabadayıları \"koruma parası\" istedi; {0} vermek zorunda kaldın.",
  "🤝 Güvendiğin bir ortak seni dolandırdı; {0} buharlaştı.",
  "📜 Vergi tahsildarı defterlerinde \"eksik\" buldu; {0} ceza kesti.",
  "👨‍👩‍👧 Bir akraban büyük bir borç için kapına dayandı; {0} verdin, geri dönmeyecek.",
  "🎭 Bir dilenci kılığındaki dolandırıcı acıklı bir hikâyeyle {0} kopardı.",
  "⚖️ {1}'de küçük bir dava açıldı üstüne; avukat ve rüşvet {0} götürdü.",
  "🔥 Deponda çıkan yangını söndürmek ve zararı kapatmak {0} tuttu.",
  "🃏 Bir bahiste kaptırdın; {0} masada kaldı.",
  "🐴 Yolda eşkıya kervanını çevirdi; {0} değerinde mal ve para aldılar.",
  "💍 Değerli bir eşyan \"kayboldu\"; yerine yenisini almak {0} tuttu.",
  "🏛️ {1} ileri gelenleri bir bağış listesi dolaştırdı; {0} yazmak zorunda kaldın.",
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
    return {
      miktar,
      mesaj: T(state.dil, flavor, [`${miktar} ${state.para_birimi}`, K(state.dil, state.bolge)]),
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Rakip soygunu: nakit yüksekken (≥ 150) DÜŞÜK ihtimalle karakterin isimli
// rakibi cebindeki paranın büyük bir kısmını alıp kaçar. Zenginlik sızıntısından
// ayrı ve daha nadir/sert: bu, "üzerinde çok nakitle dolaşmanın" kişisel bedeli
// ("çok parayla herhangi bir olaya girersen rakip parayı alıp kaçabilsin").
// Cebindeki NAKİT'e bakar (gayrimenkule değil); ilişkiyi de bozar. Olay ekranı
// yok — zamanAnlatimi'ye + hayat_hikayesi'ne eklenir.
// ---------------------------------------------------------------------------
const RAKIP_SOYGUN_NAKIT_ESIGI = 150;
const RAKIP_SOYGUN_COOLDOWN_YIL = 8;
const RAKIP_SOYGUN_YILLIK_IHTIMAL = 0.035;
const RAKIP_SOYGUN_ORAN_MIN = 0.25;
const RAKIP_SOYGUN_ORAN_ARALIK = 0.2; // nakitin %25-45'i

export interface RakipSoygunSonucu {
  miktar: number;
  mesaj: string;
}

/**
 * Turdaki her yıl ayrı kontrol edilir (bağış/sızıntı/savaş deseni). Nakit ≥ 150
 * VE 8 yıl cooldown dolmuşken her yıl %3.5 ihtimalle tetiklenir: rakip nakitin
 * %25-45'ini (min 10) alıp kaçar, rakip_puani -12, mutluluk -6, cooldown güncellenir.
 */
export function rakipSoygunKontrolEt(state: CharacterState, yasArtisi: number): RakipSoygunSonucu | null {
  if (yasArtisi <= 0) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  for (let i = 0; i < yasArtisi; i++) {
    if (state.para < RAKIP_SOYGUN_NAKIT_ESIGI) continue;
    const taban = state.son_rakip_soygun_yili ?? state.baslangic_yili;
    if (state.yil - taban < RAKIP_SOYGUN_COOLDOWN_YIL) continue;
    if (Math.random() >= RAKIP_SOYGUN_YILLIK_IHTIMAL) continue;
    const oran = RAKIP_SOYGUN_ORAN_MIN + Math.random() * RAKIP_SOYGUN_ORAN_ARALIK;
    const miktar = Math.max(10, paraYuvarla(state.para * oran));
    state.para -= miktar;
    state.son_rakip_soygun_yili = state.yil;
    state.rakip_puani = Math.max(0, state.rakip_puani - 12);
    state.mutluluk = Math.max(0, state.mutluluk - 6);
    return {
      miktar,
      mesaj: T(
        state.dil,
        "🗡️ Üzerinde büyük miktarda nakit olduğunu öğrenen {0}, seni pusuya düşürüp {1} {birim} alıp kaçtı.",
        [state.rakip_adi, miktar],
      ).replace(/\{birim\}/g, state.para_birimi),
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Derin rakip ilişkileri (§13): isimli rakiplerin gücünü karanlık işlerle kır,
// kırılan güç pazar payı (para + kariyer) olarak sana döner; husumet yükselince
// rakip misilleme yapar. Rakip "yenildi" olunca sistemden çıkar.
// ---------------------------------------------------------------------------

/** Hangi karanlık işler bir rakibi hedefleyebilir + o iş rakip gücünü ne kadar kırar. */
export const RAKIP_KOTU_IS_HEDEFLERI: Record<string, number> = {
  rakibi_korkut: 8,
  rakibi_dov: 15,
  isyeri_yak: 26,
};

export interface RakipGucKirSonucu {
  kirilan: number;
  pazarPayi: number;
  kariyerKazanci: number;
  yenildiMi: boolean;
  mesaj: string;
}

/**
 * Bir rakibin gücünü `taban` kadar (0-100 clamp) kırar. Kırılan güç oyuncuya
 * pazar payı olarak döner: para += kırılan × 0.5 × enflasyon, kariyer_puani +=
 * kırılana orantılı 2..6. Güç ≤ 10'a inince rakip "yenildi" (tek seferlik büyük
 * kariyer + ün bonusu). Her çağrı rakibin husumetini artırır (misilleme riski).
 */
export function rakipGucKir(
  state: CharacterState,
  rakipAd: string,
  taban: number,
  enflasyon: number
): RakipGucKirSonucu | null {
  const rakip = state.rakipler.find((r) => r.ad === rakipAd && !r.yenildi);
  if (!rakip) return null;
  const oncekiGuc = rakip.guc;
  rakip.guc = Math.max(0, Math.min(100, rakip.guc - taban));
  const kirilan = oncekiGuc - rakip.guc;
  rakip.husumet = Math.min(100, rakip.husumet + 10 + Math.floor(Math.random() * 11)); // +10..20

  const pazarPayi = Math.max(1, paraYuvarla(kirilan * 0.5 * enflasyon));
  const kariyerKazanci = Math.round(2 + (kirilan / 26) * 4); // 26 kırılırsa ~+6
  state.para = paraYuvarla(state.para + pazarPayi);
  state.kariyer_puani += kariyerKazanci;

  let yenildiMi = false;
  if (rakip.guc <= 10) {
    rakip.yenildi = true;
    yenildiMi = true;
    state.kariyer_puani += 10;
    state.un = Math.min(100, state.un + 4);
    hayatOlayiEkle(state, "♟️", T(state.dil, "{0} rekabeti tamamen bırakmak zorunda kaldı", [rakipAd]));
  }

  const mesaj = yenildiMi
    ? T(state.dil, "♟️ {0}'ın gücünü kırdın; artık senin karşında bir rakip değil. Pazar payı sana geçti (+{1} {birim}).", [
        rakipAd,
        pazarPayi,
      ]).replace(/\{birim\}/g, state.para_birimi)
    : T(state.dil, "♟️ {0} sarsıldı; pazarın bir kısmı sana geçti (+{1} {birim}). Ama bunu unutmayacak.", [
        rakipAd,
        pazarPayi,
      ]).replace(/\{birim\}/g, state.para_birimi);
  return { kirilan, pazarPayi, kariyerKazanci, yenildiMi, mesaj };
}

/** Yıllık: yenilmemiş rakiplerin gücü yavaşça büyür, husumet yavaşça soğur. */
export function rakiplerGuncelle(state: CharacterState, yasArtisi: number): void {
  if (yasArtisi <= 0) return;
  for (const r of state.rakipler) {
    if (r.yenildi) continue;
    r.guc = Math.min(100, r.guc + 0.3 * yasArtisi);
    r.husumet = Math.max(15, r.husumet - 0.5 * yasArtisi);
  }
}

export interface RakipMisillemeSonucu {
  rakipAd: string;
  mesaj: string;
}

/**
 * Yıllık: husumeti yüksek (≥55) yenilmemiş bir rakip, düşük ihtimalle
 * (husumet/320 per yıl) misilleme yapar — nakit/ün/sağlıktan birini vurur.
 * Misillemeden sonra husumet ~20 düşer. hapiste/yolculukta iken atlanır.
 */
export function rakipMisillemesiDene(state: CharacterState, yasArtisi: number): RakipMisillemeSonucu | null {
  if (yasArtisi <= 0) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  for (let i = 0; i < yasArtisi; i++) {
    const adaylar = state.rakipler.filter((r) => !r.yenildi && r.husumet >= 55);
    if (adaylar.length === 0) return null;
    const rakip = adaylar[Math.floor(Math.random() * adaylar.length)];
    if (Math.random() >= rakip.husumet / 320) continue;
    const tur = Math.floor(Math.random() * 3);
    let mesaj: string;
    if (tur === 0) {
      const kayip = Math.max(4, paraYuvarla(Math.max(0, state.para) * 0.1));
      state.para = paraYuvarla(state.para - kayip);
      mesaj = T(state.dil, "🎯 {0} adamlarını gönderdi; deponu basıp {1} {birim} zarar verdiler.", [rakip.ad, kayip]).replace(
        /\{birim\}/g,
        state.para_birimi
      );
    } else if (tur === 1) {
      state.un = Math.max(0, state.un - 5);
      mesaj = T(state.dil, "🎯 {0} hakkında çirkin dedikodular yaydı; itibarın zedelendi.", [rakip.ad]);
    } else {
      state.saglik = Math.max(0, state.saglik - 8);
      mesaj = T(state.dil, "🎯 {0}'ın tuttuğu kabadayılar seni bir ara sokakta sıkıştırdı.", [rakip.ad]);
    }
    rakip.husumet = Math.max(15, rakip.husumet - 20);
    hayatOlayiEkle(state, "🎯", T(state.dil, "{0} misilleme yaptı", [rakip.ad]));
    return { rakipAd: rakip.ad, mesaj };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Kredi / tefeci: kontrollü borçlanma. Aynı anda tek kredi. Yıllık taksit
// nakitten otomatik erir; üst üste ödenemezse tefeci önce uyarır, sonra mülke/
// servete el koyar. Pazarlıkla faiz bir kez düşürülebilir (ya da ters teper).
// ---------------------------------------------------------------------------

export const KREDI_TABAN_FAIZ = 0.12;
export const KREDI_MIN_TUTAR_TABAN = 20;
export const KREDI_MAKS_TUTAR_TABAN = 200;
/** Geriye dönük uyumluluk için sabit adlar (enflasyonsuz taban değerler). */
export const KREDI_MIN_TUTAR = KREDI_MIN_TUTAR_TABAN;
export const KREDI_MAKS_TUTAR = KREDI_MAKS_TUTAR_TABAN;
/** İki sabit kredi kademesinin enflasyonsuz taban tutarları (küçük/büyük). */
export const KREDI_KADEME_TABAN = [40, 130];

/** Oyuncunun şu an alabileceği en yüksek kredi (maaşa + mevcut borç yokluğuna + enflasyona bağlı). */
export function krediMaksTutar(state: CharacterState): number {
  if (state.kredi) return 0;
  const maas = state.maas_yillik || hesaplaMaasYillik(state);
  // ~6 yıllık maaş kadar, enflasyonla ölçekli tavanla; suç seviyesi yüksekse tefeci daha az verir.
  const sucKesinti = state.suc_seviyesi >= 60 ? 0.5 : state.suc_seviyesi >= 40 ? 0.75 : 1;
  const tavan = KREDI_MAKS_TUTAR_TABAN * enflasyonCarpani(state);
  return Math.max(0, Math.min(tavan, Math.round(maas * 6 * sucKesinti)));
}

/** Tefecinin sunduğu iki sabit kredi tutarı (küçük/büyük), enflasyonla ölçekli ve mevcut tavana kırpılmış. */
export function krediKademeleri(state: CharacterState): number[] {
  const maks = krediMaksTutar(state);
  if (maks <= 0) return [];
  const enflasyon = enflasyonCarpani(state);
  const min = Math.max(1, Math.round(KREDI_MIN_TUTAR_TABAN * enflasyon));
  const kademeler = KREDI_KADEME_TABAN.map((t) => Math.round(t * enflasyon))
    .map((t) => Math.min(t, maks))
    .filter((t) => t >= min);
  // Aynı değere kırpıldılarsa (düşük tavan) tekilleştir.
  return kademeler.filter((t, i) => kademeler.indexOf(t) === i);
}

/** Verilen tutar için tefecinin isteyeceği faiz oranı (borçluysa / suçluysa yükselir). */
export function krediFaizTeklifi(state: CharacterState): number {
  let faiz = KREDI_TABAN_FAIZ;
  if (state.para < 0) faiz += 0.04;
  if (state.suc_seviyesi >= 40) faiz += 0.03;
  if (state.ahlak < 35) faiz += 0.02;
  return Math.round(faiz * 100) / 100;
}

export function krediAl(state: CharacterState, tutar: number): string {
  if (state.kredi) throw new Error("Zaten ödenmemiş bir kredin var.");
  const maks = krediMaksTutar(state);
  const t = Math.round(tutar);
  const minTutar = Math.max(1, Math.round(KREDI_MIN_TUTAR_TABAN * enflasyonCarpani(state)));
  if (t < minTutar) throw new Error(`En az ${minTutar} ${state.para_birimi} kredi alabilirsin.`);
  if (t > maks) throw new Error(`Tefeci sana en fazla ${maks} ${state.para_birimi} verir.`);
  const faiz = krediFaizTeklifi(state);
  state.kredi = {
    anapara: t,
    kalanBorc: t,
    faizOrani: faiz,
    yillikTaksit: Math.max(2, Math.round(t * 0.18)),
    alindigiYil: state.yil,
    odenmeyenTaksit: 0,
    pazarlikYapildi: false,
  };
  state.para = paraYuvarla(state.para + t);
  hayatOlayiEkle(state, "🪙", T(state.dil, "Tefeciden {0} {birim} borç aldı", [t]).replace(/\{birim\}/g, state.para_birimi));
  return T(state.dil, "Tefeci kesesini açtı: +{0} {birim}. Yıllık taksit ~{1}, faiz %{2}.", [
    t,
    state.kredi.yillikTaksit,
    Math.round(faiz * 100),
  ]).replace(/\{birim\}/g, state.para_birimi);
}

export function krediPazarlik(state: CharacterState): string {
  if (!state.kredi) throw new Error("Ortada bir kredi yok.");
  if (state.kredi.pazarlikYapildi) throw new Error("Bu kredi için zaten pazarlık ettin.");
  state.kredi.pazarlikYapildi = true;
  const sans = 30 + (state.un - 20) / 2 + (state.ahlak - 50) / 4; // ~%20-70
  if (Math.random() * 100 < sans) {
    state.kredi.faizOrani = Math.max(0.05, Math.round((state.kredi.faizOrani - 0.03) * 100) / 100);
    state.kredi.yillikTaksit = Math.max(2, Math.round(state.kredi.kalanBorc * 0.16));
    return T(state.dil, "Tefeci homurdandı ama faizi %{0}'e indirdi.", [Math.round(state.kredi.faizOrani * 100)]);
  }
  state.kredi.faizOrani = Math.min(0.30, Math.round((state.kredi.faizOrani + 0.02) * 100) / 100);
  return T(state.dil, "Pazarlık ters tepti; tefeci faizi %{0}'e çıkardı.", [Math.round(state.kredi.faizOrani * 100)]);
}

/** Yıllık: faiz işler, taksit nakitten otomatik ödenir, ödenmezse el koyma zinciri. */
export function krediYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  if (!state.kredi || yasArtisi <= 0) return null;
  const mesajlar: string[] = [];
  for (let i = 0; i < yasArtisi; i++) {
    if (!state.kredi) break;
    const k = state.kredi;
    k.kalanBorc = paraYuvarla(k.kalanBorc * (1 + k.faizOrani));
    if (state.para >= k.yillikTaksit) {
      const odeme = Math.min(k.yillikTaksit, k.kalanBorc);
      state.para = paraYuvarla(state.para - odeme);
      k.kalanBorc = paraYuvarla(k.kalanBorc - odeme);
      k.odenmeyenTaksit = 0;
    } else {
      k.odenmeyenTaksit += 1;
      if (k.odenmeyenTaksit === 2) {
        mesajlar.push(T(state.dil, "🪙 Tefeci taksitini alamadı; 'bir daha kaçırma' diye tehdit etti."));
      } else if (k.odenmeyenTaksit >= 3) {
        // El koyma: varsa en değerli mülke, yoksa nakde + itibara.
        if (state.mulkler.length > 0) {
          const alinan = state.mulkler.pop()!;
          delete state.mulk_bakim_kalan[alinan];
          if (state.mulk_alis_yili) delete state.mulk_alis_yili[alinan];
          mesajlar.push(
            T(state.dil, "🪙 Tefecinin adamları borcun karşılığında {0} el koydu.", [K(state.dil, alinan)])
          );
          hayatOlayiEkle(state, "🪙", T(state.dil, "Tefeci borç için {0} el koydu", [K(state.dil, alinan)]));
        } else {
          const alinan = Math.max(0, paraYuvarla(Math.min(k.kalanBorc, Math.max(0, state.para))));
          state.para = paraYuvarla(state.para - alinan);
          state.un = Math.max(0, state.un - 10);
          mesajlar.push(T(state.dil, "🪙 Tefeci borcun için elinde ne varsa aldı; itibarın da yerlerde."));
          hayatOlayiEkle(state, "🪙", T(state.dil, "Tefeci borç için servetine el koydu"));
        }
        state.kredi = null;
        break;
      }
    }
    if (state.kredi && state.kredi.kalanBorc <= 0) {
      mesajlar.push(T(state.dil, "🪙 Tefecinin borcunu tamamen kapattın; defterden adın silindi."));
      hayatOlayiEkle(state, "🪙", T(state.dil, "Tefeci borcu bitti"));
      state.kredi = null;
    }
  }
  return mesajlar.length > 0 ? mesajlar.join(" ") : null;
}

const BUYUK_SAVAS_MIN_COOLDOWN_YIL = 10;
const BUYUK_SAVAS_YILLIK_IHTIMAL = 0.1;
const BUYUK_SAVAS_SURE_MIN_YIL = 3;
const BUYUK_SAVAS_SURE_ARALIK_YIL = 3; // 3-6 yıl
const BUYUK_SAVAS_VERGI_ORANI_MIN = 0.08;
const BUYUK_SAVAS_VERGI_ORANI_ARALIK = 0.04;
const BUYUK_SAVAS_GIDA_CARPANI_MIN = 1.15;
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
    return T(state.dil, "⚔️ {0} ile aranızdaki gerginlik büyük bir savaşa dönüştü.", [K(state.dil, dusman)]);
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
  return T(state.dil, "🕊️ {0} ile sürdürülen savaş sona erdi, barış geri döndü.", [K(state.dil, dusman)]);
}

const VEBA_MIN_YAS = 18;
const VEBA_YILLIK_IHTIMAL = 0.03;
/** Bir veba dalgası (iz fazı dahil) bittikten sonra yeni bir dalga için beklenmesi gereken yıl. */
const VEBA_COOLDOWN_YIL = 25;

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

const VEBA_AKTIF_SURE_MIN_YIL = 5;
const VEBA_AKTIF_SURE_ARALIK_YIL = 2; // 5-7 yıl (eskiden 2-4; kullanıcı isteğiyle +3 yıl uzatıldı)
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
  // Salgından ÖNCE yapılmış kalıcı korunma yatırımı (§ "salgın korunma") ile
  // olayda seçilen korunmanın MAX'ı kullanılır; yatırım bu dalgada tüketilir.
  const yatirimKademe = state.salgin_korunma_yatirimi?.kademe ?? 0;
  const etkinKoruma = Math.max(Math.round(korumaSeviyesi), yatirimKademe);
  state.salgin_korunma_yatirimi = null;
  state.veba = {
    aktif: true,
    baslangicYili: state.yil,
    bitisYili: state.yil + aktifSureYil,
    etkiBitisYili: state.yil + aktifSureYil + etkiSureYil,
    konutKiraCarpani: VEBA_KONUT_KIRA_CARPANI_MIN + Math.random() * VEBA_KONUT_KIRA_CARPANI_ARALIK,
    gelirCarpani: VEBA_GELIR_CARPANI_MIN + Math.random() * VEBA_GELIR_CARPANI_ARALIK,
    korumaSeviyesi: Math.max(0, Math.min(2, etkinKoruma)),
  };
  state.veba_gecirdi = true;
}

export interface VebaYillikSonuc {
  /** Karakter bu turda vebayı BİZZAT KAPTI mı (ölüm değil — "veba_hastasi" etiketi + veba_olum_riski açıldı). */
  hastalandi: boolean;
  mesajlar: string[];
}

/**
 * Aktif veba sürerken (sadece state.veba.aktif iken) YILLIK oranlar, korunma
 * düzeyine göre 3 kademe. Karakter için bu artık bir ÖLÜM değil, HASTALIĞI
 * KAPMA ihtimalidir (kullanıcı isteği): 2026-09'da eski ölüm kademesi ~%50
 * büyütülüp "bulaşma" olarak yeniden yorumlandı. Bulaşınca karakter
 * `veba_hastasi` etiketi + `veba_olum_riski` (~70) alır ve `vebaHastasiOlayi`
 * olay havuzuna geçer (bkz. vebaHastaligiKontrol). Eş/çocuk için oran hâlâ
 * DOĞRUDAN ölümdür (onlar için olay katmanı yok), yalnız ~%50 büyütüldü.
 */
const VEBA_KAPMA_KADEME = [0.093, 0.054, 0.027]; // [hiç, kısmi, tam koruma] — karakterin hastalığı kapma ihtimali/yıl
const VEBA_ES_KAYIP_KADEME = [0.054, 0.033, 0.017];
const VEBA_COCUK_KAYIP_KADEME = [0.048, 0.03, 0.015];

/** Vebayı yeni kapan bir karakterin başlangıç ölüm riski (%). Olaylarla düşer/yükselir. */
const VEBA_BASLANGIC_OLUM_RISKI = 70;

/**
 * Karaktere kişisel veba hastalığını başlatır: "veba_hastasi" etiketi + (henüz
 * ayarlanmadıysa) ~%70 başlangıç ölüm riski. Hem yıllık bulaşma zarından
 * (vebaYillikKontrol) hem de bir olayın `etiket_ekle:["veba_hastasi"]` etkisinden
 * (gameEngine) çağrılır — tek doğruluk kaynağı.
 */
export function vebaHastaligiBaslatEt(state: CharacterState): void {
  if (!state.etiketler.includes("veba_hastasi")) etiketEkle(state, ["veba_hastasi"]);
  if (state.veba_olum_riski <= 0) state.veba_olum_riski = VEBA_BASLANGIC_OLUM_RISKI;
}
/** Hasta bir turu ölmeden atlatınca ölüm riskinden düşülen sabit miktar (beden direniyor). */
const VEBA_HASTALIK_DOGAL_DUSUS = 21;
/** Ölüm riski bu eşiğin altına inince hastalık atlatılmış sayılır (etiket silinir). */
const VEBA_HASTALIK_IYILESME_ESIGI = 12;

/**
 * Aktif veba sürerken her yıl: karakterin hastalığı KAPIP kapmadığını, eşinin
 * ve bir çocuğunun ise doğrudan ölümünü kontrol eder. Karakter zaten hastaysa
 * (veba_hastasi) yeniden bulaşma denenmez. Karakterin ölümü burada UYGULANMAZ.
 */
export function vebaYillikKontrol(state: CharacterState, yasArtisi: number): VebaYillikSonuc {
  const sonuc: VebaYillikSonuc = { hastalandi: false, mesajlar: [] };
  if (yasArtisi <= 0 || !state.veba?.aktif) return sonuc;
  const k = Math.max(0, Math.min(2, state.veba.korumaSeviyesi ?? 0));
  const kapmaSansi = VEBA_KAPMA_KADEME[k];
  const esSansi = VEBA_ES_KAYIP_KADEME[k];
  const cocukSansi = VEBA_COCUK_KAYIP_KADEME[k];
  const zatenHasta = state.etiketler.includes("veba_hastasi");
  // Karakterin BİZZAT hastalanması, kendi başına havuz kilitleyen bir etiket
  // eklediği için (yalnız vebaHastasiOlayi:true olaylar gösterilir); zaten bir
  // havuz kilidi altındayken (hapiste / kacak / yolculukta) bulaşırsa iki kilit
  // çakışır ve olaySec hiç uygun olay bulamaz → oyun kilitlenirdi. Bu durumlarda
  // karaktere bulaşmayı atla (§27 zorunlu bağış / büyük savaş / küçük kriz de
  // aynı etiketlerde atlanıyor). Eş/çocuk kaybının olay havuzu yok, onlar sürer.
  const karakterBulasabilir =
    !state.etiketler.includes("hapiste") &&
    !state.etiketler.includes("kacak") &&
    !state.etiketler.includes("yolculukta");

  for (let i = 0; i < yasArtisi; i++) {
    if (karakterBulasabilir && !zatenHasta && !sonuc.hastalandi && Math.random() < kapmaSansi) {
      sonuc.hastalandi = true;
      vebaHastaligiBaslatEt(state);
      hayatOlayiEkle(state, "🦠", T(state.dil, "Vebaya yakalandı"));
      sonuc.mesajlar.push(T(state.dil, "🦠 Veba sana da bulaştı — hastalandın. Hayatta kalman bundan sonraki seçimlerine bağlı."));
    }
    if (state.es_adi && Math.random() < esSansi) {
      const kaybedilenEs = state.es_adi;
      state.es_adi = null;
      state.es_puani = 0;
      state.es_meslek = null;
      state.es_rutbe = null;
      etiketSil(state, ["medeni:evli"]);
      hayatOlayiEkle(state, "💔", T(state.dil, "{0} vebaya yenik düştü", [kaybedilenEs]));
      sonuc.mesajlar.push(T(state.dil, "💔 {0} vebaya yenik düştü.", [kaybedilenEs]));
    }
    const yasayanCocuklar = state.cocuklar.filter((c) => c.yasiyor);
    if (yasayanCocuklar.length > 0 && Math.random() < cocukSansi) {
      const secilen = yasayanCocuklar[Math.floor(Math.random() * yasayanCocuklar.length)];
      secilen.yasiyor = false;
      state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
      if (state.cocuk_sayisi === 0) etiketSil(state, ["cocuk_var"]);
      hayatOlayiEkle(state, "💔", T(state.dil, "{0} vebaya yenik düştü", [secilen.isim]));
      sonuc.mesajlar.push(T(state.dil, "💔 {0} vebaya yenik düştü.", [secilen.isim]));
    }
  }
  return sonuc;
}

export interface VebaHastaligiSonuc {
  karakterOldu: boolean;
  iyilesti: boolean;
  mesajlar: string[];
}

/**
 * Karakter vebayı BİZZAT kapmışsa (etiket "veba_hastasi") her turda BİR KEZ
 * çalışır: o anki `veba_olum_riski` (%) yüzdesine karşı ölüm zarı atılır.
 * Ölmezse risk `VEBA_HASTALIK_DOGAL_DUSUS` kadar düşer; eşiğin altına inince
 * hastalık atlatılmış sayılır (etiket + alan temizlenir). `vebaHastasiOlayi`
 * olaylarının `veba_olum_riski_artis` etkisi bu turdan ÖNCE (olay çözümünde)
 * uygulandığı için, iyi bir tedavi seçimi bu zarı belirgin biçimde iyileştirir.
 * Karakter ölümü burada UYGULANMAZ — sinyal döner, checkDeath gameEngine'de.
 */
export function vebaHastaligiKontrol(state: CharacterState): VebaHastaligiSonuc {
  const sonuc: VebaHastaligiSonuc = { karakterOldu: false, iyilesti: false, mesajlar: [] };
  if (!state.etiketler.includes("veba_hastasi")) return sonuc;
  const risk = Math.max(0, Math.min(100, state.veba_olum_riski));
  if (Math.random() * 100 < risk) {
    sonuc.karakterOldu = true;
    sonuc.mesajlar.push(T(state.dil, "Veba direncini kırdı; ateşler içinde son nefesini verdin."));
    return sonuc;
  }
  state.veba_olum_riski = Math.max(0, risk - VEBA_HASTALIK_DOGAL_DUSUS);
  if (state.veba_olum_riski <= VEBA_HASTALIK_IYILESME_ESIGI) {
    state.veba_olum_riski = 0;
    etiketSil(state, ["veba_hastasi"]);
    sonuc.iyilesti = true;
    hayatOlayiEkle(state, "🌿", T(state.dil, "Vebayı atlattı"));
    sonuc.mesajlar.push(T(state.dil, "🌿 Ateşin düştü, gücün yavaş yavaş geri geliyor — vebayı atlattın."));
  } else {
    sonuc.mesajlar.push(T(state.dil, "🤒 Hastalık sürüyor; şu an hayatta kalma şansın kabaca %{0}.", [
      Math.round(100 - state.veba_olum_riski),
    ]));
  }
  return sonuc;
}

/** Aktif veba fazının (ölüm riski taşıyan dönem) süresi dolduysa kapatır; kira/maaş izi etkiBitisYili'ne kadar ayrıca sürer. */
export function vebaBitisKontrolEt(state: CharacterState): string | null {
  if (state.veba?.aktif && state.yil >= state.veba.bitisYili) {
    state.veba.aktif = false;
    state.ulke.vebada = false;
    return T(state.dil, "🕊️ Salgın nihayet sona erdi, ama şehir yıllarca izlerini taşıyacak.");
  }
  if (state.veba && !state.veba.aktif && state.yil >= state.veba.etkiBitisYili) {
    state.veba = null;
    state.son_veba_bitis_yili = state.yil; // 20 yıllık cooldown buradan sayılır
  }
  return null;
}

// Yıllık getiri oranları (taban maliyetin yüzdesi olarak); enflasyonCarpani ile ölçeklenen
// taban_maliyet üzerine uygulanır.
// Faz 6 ekonomi rebalansı (2026-09 sonu, kullanıcı isteği: "gayrimenkul getirilerini
// ~1-1.5 puan düşür"): NORMAL %9→%7.5, AVANTAJLI %12→%10.5, tavan %17→%15 — gelir/gider
// dengesi turunun yükselttiği oranlar biraz geri çekildi (bakım oranı/aralığına dokunulmadı,
// net akış hâlâ pozitif ama daha ölçülü). simulateGayrimenkul.ts ile doğrulanabilir.
const MULK_GETIRI_NORMAL = 0.075;
const MULK_GETIRI_AVANTAJLI = 0.105;
const MULK_GETIRI_DEZAVANTAJLI = -0.02;
/** Tüm mülk getiri oranlarının (çarpanlar uygulandıktan sonra) mutlak tavanı — "bir anda çok getirip çok götürmesin". */
const MULK_GETIRI_TAVAN = 0.15;
const MULK_DEMIRCI_SAVAS_CARPANI = 2.5;
const KERVAN_BATMA_IHTIMALI_YILLIK = 0.25;
// Aranma yeniden dengeleme turu: 3→2 — pasif/ambient bir kaynak olduğu için
// (yıl başına otomatik işler, oyuncu aksiyonu gerektirmez) karanlık işler
// (şiddet/soygun) listesiyle aynı hızda birikmesin (kullanıcı isteği).
const KARABORSA_SUC_ARTISI_YILLIK = 2;
const KARABORSA_AHLAK_ASINMASI_YILLIK = 0.3;
// Küçük Tarla vs Çiftlik — Faz 6 ekonomi rebalansı (kullanıcı isteği: "ikisini birbirinden
// belirgin biçimde ayır"): eskiden ikisi neredeyse aynı getiriyi taşıyordu (yalnız
// dezavantajlı bantta ufak bir fark vardı). Artık Küçük Tarla AÇIKÇA daha düşük getirili
// ama neredeyse risksiz ("güvenli liman" — kıtlıkta bile kaybı simgesel); Çiftlik ise temel
// MULK_GETIRI_* sabitlerini (üstteki, Faz 6'da yükseltilmiş potansiyel + belirgin kıtlık
// riski) doğrudan kullanarak Küçük Tarla'dan hem daha yüksek ödül hem daha gerçek risk taşır.
const MULK_GETIRI_KUCUK_TARLA_NORMAL = 0.055;
const MULK_GETIRI_KUCUK_TARLA_AVANTAJLI = 0.07;
const MULK_GETIRI_KUCUK_TARLA_DEZAVANTAJLI = -0.002;

/** Her mülk 7-11 yılda bir periyodik bir bakım/vergi masrafı çıkarır (tıpkı "luks" mağaza eşyaları gibi). */
const MULK_BAKIM_ARALIGI_MIN_YIL = 7;
const MULK_BAKIM_ARALIGI_MAX_YIL = 11;
/** Bakım masrafı, mülkün GÜNCEL (enflasyona göre ölçeklenmiş) değerinin yaklaşık bu oranı kadardır. */
// Gelir/gider dengesi turu: bakım oranı %30 → %15 (kullanıcı isteği: bakımı düşür, geliri
// artır). %15 / ortalama 9 yıl ≈ yıllık ~%1.7 amorti gider — yükseltilmiş brüt getiriyle
// (~%9 NORMAL) birlikte net akış artık belirgin pozitif.
const MULK_BAKIM_ORANI = 0.15;

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
  const dil = state.dil;

  if (state.ulke.ekonomi === "kotu") liste.push({ ikon: "📉", metin: T(dil, "Kötü ekonomi: maaş −%20") });
  else if (state.ulke.ekonomi === "iyi") liste.push({ ikon: "📈", metin: T(dil, "İyi ekonomi: maaş +%15") });

  if (state.buyuk_savas) {
    const gida = Math.round((state.buyuk_savas.gidaCarpani - 1) * 100);
    const vergi = Math.round(state.buyuk_savas.vergiOrani * 100);
    liste.push({
      ikon: "⚔️",
      metin: T(dil, "Büyük savaş ({0}): maaş −%15 · yemek +%{1} · savaş vergisi %{2}", [
        K(dil, state.buyuk_savas.dusman),
        gida,
        vergi,
      ]),
    });
  } else if (state.ulke.savasta) {
    liste.push({ ikon: "⚔️", metin: T(dil, "Savaş: maaş −%15") });
  }

  if (state.veba && state.yil < state.veba.etkiBitisYili) {
    const maas = Math.round((state.veba.gelirCarpani - 1) * 100);
    const kira = Math.round((1 - state.veba.konutKiraCarpani) * 100);
    if (state.veba.aktif) {
      liste.push({ ikon: "☠️", metin: T(dil, "Salgın: her yıl ölüm riski · işçi kıtlığı maaş +%{0} · kira −%{1}", [maas, kira]) });
    } else {
      const kalanYil = Math.max(0, state.veba.etkiBitisYili - state.yil);
      liste.push({ ikon: "☠️", metin: T(dil, "Salgın izi ({0} yıl): maaş +%{1} · kira −%{2}", [kalanYil, maas, kira]) });
    }
  }

  if (state.ulke.kriz?.tur === "kitlik") liste.push({ ikon: "🌾", metin: T(dil, "Kıtlık: −1 sağlık/yıl") });
  else if (state.ulke.kriz?.tur === "isyan") liste.push({ ikon: "🔥", metin: T(dil, "İsyan: −3 para & −1 ün/yıl") });
  else if (state.ulke.kriz?.tur === "altin_cag")
    liste.push({ ikon: "✨", metin: T(dil, "Altın çağ: +4 para & +1 mutluluk/yıl") });

  if (state.gida_fiyat_sok_bitis_yili !== null && state.yil < state.gida_fiyat_sok_bitis_yili) {
    liste.push({ ikon: "🥖", metin: T(dil, "Gıda fiyat şoku: yemek gideri bu yıl ×2") });
  }

  // Not: "servetin X'ü aştı" ileriye dönük uyarısı kasıtlı olarak kaldırıldı —
  // zorunluBagisKontrolEt() arka planda sessizce çalışmaya devam ediyor, sadece
  // sürekli görünen bu standart uyarı metni (ana ekran + Gelir&Gider) kaldırıldı.
  // Gerçekten tetiklendiğinde çıkan bildirim cümlesi (zamanAnlatimi) değişmedi.

  return liste;
}

/**
 * Bir mülk türünün ŞU ANKİ dünya durumuna göre yıllık getiri oranını (taban
 * maliyetin yüzdesi) hesaplar; hem gerçek tur tikinde (mulkGelirleriUygula) hem
 * de istemciye "tahmini getiri" göstermek için salt-okunur önizlemede
 * (gameEngine.ts mulkConfigGetir) kullanılan tek doğruluk kaynağı. Ham oran
 * (durum çarpanları dahil) hesaplanır, sonra mulkGetiriOraniHesapla ±%8'e kırpar.
 */
function hamMulkGetiriOrani(tur: MulkTuru, ulke: CharacterState["ulke"]): number {
  if (tur === "kucuk_tarla") {
    return ulke.kriz?.tur === "kitlik"
      ? MULK_GETIRI_KUCUK_TARLA_DEZAVANTAJLI
      : ulke.ekonomi === "iyi"
        ? MULK_GETIRI_KUCUK_TARLA_AVANTAJLI
        : MULK_GETIRI_KUCUK_TARLA_NORMAL;
  }
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
    return ulke.savasta || ulke.kriz?.tur === "isyan" ? MULK_GETIRI_NORMAL * MULK_DEMIRCI_SAVAS_CARPANI : MULK_GETIRI_NORMAL * 0.45;
  }
  if (tur === "kervan") {
    return !ulke.savasta && ulke.ekonomi !== "kotu" ? MULK_GETIRI_AVANTAJLI * 1.1 : MULK_GETIRI_NORMAL * 0.85;
  }
  // karaborsa
  return ulke.kriz?.tur === "kitlik" || ulke.vebada || ulke.savasta ? MULK_GETIRI_AVANTAJLI * 1.6 : 0;
}

/**
 * Mülkün güncel yıllık getiri oranı — hamMulkGetiriOrani'nın çıktısını ±MULK_GETIRI_TAVAN
 * (%8) bandına kırpar: demirci/kervan/karaborsa durum çarpanları uçları taşısa bile
 * "bir anda çok getirip çok götürmesin" (kullanıcı isteği). mulkGelirleriUygula ve
 * gameEngine.mulkConfigGetir bunu kullanır.
 */
export function mulkGetiriOraniHesapla(tur: MulkTuru, ulke: CharacterState["ulke"]): number {
  const ham = hamMulkGetiriOrani(tur, ulke);
  return Math.max(-MULK_GETIRI_TAVAN, Math.min(MULK_GETIRI_TAVAN, ham));
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
      if (state.mulk_alis_yili) delete state.mulk_alis_yili.kervan;
      hayatOlayiEkle(state, "🌊", T(state.dil, "Ticaret kervanı savaş yüzünden tamamen kayboldu"));
      kervanBatti = true;
      continue;
    }
    if (tur === "karaborsa") {
      state.suc_seviyesi += KARABORSA_SUC_ARTISI_YILLIK * yasArtisi;
      state.ahlak -= KARABORSA_AHLAK_ASINMASI_YILLIK * yasArtisi;
    }

    toplamNet += paraYuvarla(taban * oran) * yasArtisi;

    // Periyodik bakım/vergi: 7-10 yılda bir, mülkün güncel değerinin ~%14'ü.
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

const DEDIKODU_SAVAS: string[] = [
  "Sınır boylarında komutanlar asker topluyor... ({0} ile yakında savaş çıkabilir)",
  "Tüccarlar {0} sınırından artık mal geçirmek istemiyor, bir şeyler seziyorlar...",
  "Kalelerde nöbetler sıklaştırıldı; {0} ile gerginliğin büyüdüğü konuşuluyor...",
  "{0} ile olası bir çatışma yüzünden silah ve zırh fiyatları bir anda tırmandı, demirciler gece gündüz çalışıyor...",
  "{0} yönünden habercilerin at değiştirmeden dörtnala geçtiği görüldü; kötü haber taşıyor olmalılar...",
];
const DEDIKODU_KITLIK: string[] = [
  "Gökler aylardır damla düşürmedi, köylüler endişeli... (Kuraklık/Kıtlık kapıda)",
  "Ambarlar hızla boşalıyor, ekmek fiyatları günden güne artıyor...",
  "Değirmenciler buğday bulamadıklarını, sıranın haftalarca uzadığını söylüyor...",
];
const DEDIKODU_ISYAN: string[] = [
  "Meydanlarda öfkeli kalabalıklar toplanıyor, muhafızlar tedirgin...",
  "Vergilere isyan eden köylülerin silahlandığı söyleniyor...",
  "Duvarlara geceleri hükümdarı hedef alan yazılar karalanıyor...",
];
const DEDIKODU_NUFUS: string[] = [
  "Şehre her gün yeni göçmen kafileleri geliyor... (Nüfus artıyor)",
  "Sokaklar eskisinden çok daha kalabalık, her köşede yeni bir yüz var...",
  "Yeni mahalleler hızla kuruluyor, arsa fiyatları uçuşa geçti...",
];
const DEDIKODU_BOLLUK: string[] = [
  "Komşu ülkelerle barış antlaşmaları imzalandı, yollar güvenli... (Barış/Bolluk dönemi)",
  "Pazarlar dolup taşıyor, kimsenin bir şikayeti yok; bu huzur ne kadar sürer kim bilir...",
  "Kervanlar art arda sağ salim varıyor, mal bolluğundan fiyatlar düşüyor...",
];
/**
 * "Meydanda konuşulacak bir şey yok" satırları kaldırıldı (kullanıcı isteği) —
 * yerine her zaman ilginç ama DOĞRULUĞU BELİRSİZ söylenti havuzu. Bunların
 * yaklaşık %60'ı gerçeği andırır, %40'ı tamamen kolpa olabilir; hepsi
 * "deniyor / söyleniyor / belki" tonuyla yazıldı ki oyuncu tam güvenmesin. */
const DEDIKODU_SPEKULASYON: string[] = [
  "Uzak bir diyarda büyük bir savaş çıkmış diyorlar; buraya sıçrar mı kimse bilmiyor...",
  "Komşu vilayette veba görüldüğü fısıldanıyor, ama kimse emin değil...",
  "Dağ köylerinde kıtlık başlamış deniyor; tüccarlar tedirgin, belki abartıyorlar...",
  "Bir yerlerde köylülerin ayaklandığı söyleniyor — doğrulanmış bir haber değil...",
  "Hükümdarın hastalandığına dair söylentiler var; saray sessiz kalıyor...",
  "Limanda garip bayraklı gemiler görüldüğü konuşuluyor, belki sadece tüccardır...",
  "Uzaktaki bir şehirde para biriminin değer kaybettiği söyleniyor; buraya yansır mı?",
  "Kuzeyden gelen kervancılar yol kesen çetelerden dem vuruyor, kimi de 'boş laf' diyor...",
];
/** Dünya durumundan bağımsız, koşullu havuzların yanına eklenebilen genel flavor dedikodusu — 2-3 satırlı sonuçların sık görülmesi için. */
const DEDIKODU_GENEL: string[] = [
  "Kasabanın en zengin tüccarının kızı, bir yabancıya kaçmayı planlıyormuş...",
  "Yeni gelen bir gezgin şifacı, mucize tedaviler vaat ediyor; kimileri şüpheci...",
  "Bir zamanlar itibarlı bir aile, borç yüzünden mülklerini elden çıkarmaya başlamış...",
  "Pazarda tuz fiyatları yine oynadı, herkes bir sonraki gemiyi bekliyor...",
  "Meyhanede geceleri anlatılan bir hazine söylentisi gitgide büyüyor...",
  "Şehrin dışındaki değirmende garip ışıklar görüldüğü konuşuluyor...",
];
/** DEDIKODU_GENEL'in ana listeye eklenme ihtimali (koşullu satırlardan bağımsız). */
const DEDIKODU_GENEL_IHTIMALI = 0.4;

/**
 * Yatırım ekranının üstünde gösterilen "piyasa dedikoduları" — savaş için
 * tarihiSavaslar.ts'teki sabit tarih tablosuna bakarak GERÇEK bir öngörü verir;
 * kıtlık/isyan/nüfus/bolluk için ise şu anki dünya durumunu yorumlar (ayrı bir
 * gelecek-olay takvimi kurulmadı, bkz. plan notu).
 */
export function piyasaDedikodulariUret(state: CharacterState): string[] {
  const dil = state.dil;
  const dedikodular: string[] = [];
  const gelecekRakip = !state.ulke.savasta ? gelecekSavasKontrol(state.bolge, state.yil, state.cag) : null;
  if (gelecekRakip) dedikodular.push(T(dil, sec(DEDIKODU_SAVAS), [K(dil, gelecekRakip)]));
  if (state.ulke.kriz?.tur === "kitlik") dedikodular.push(T(dil, sec(DEDIKODU_KITLIK)));
  if (state.ulke.kriz?.tur === "isyan") dedikodular.push(T(dil, sec(DEDIKODU_ISYAN)));
  if (state.ulke.nufusDurumu === "artiyor") dedikodular.push(T(dil, sec(DEDIKODU_NUFUS)));
  if (!state.ulke.savasta && state.ulke.ekonomi === "iyi") dedikodular.push(T(dil, sec(DEDIKODU_BOLLUK)));
  // "Konuşulacak bir şey yok" satırı kaldırıldı — meydanda her zaman en az bir
  // söylenti döner. Gerçek dünya-durumu satırı yoksa (ya da tek satır varsa),
  // doğruluğu belirsiz bir spekülasyon eklenir; toplam en fazla 2 satır.
  if (dedikodular.length < 2) dedikodular.push(T(dil, sec(DEDIKODU_SPEKULASYON)));
  if (dedikodular.length < 2 && Math.random() < DEDIKODU_GENEL_IHTIMALI) {
    dedikodular.push(T(dil, sec(DEDIKODU_GENEL)));
  }
  return dedikodular.slice(0, 2);
}

// ---------------------------------------------------------------------------
// Mağaza: dinamik fiyatlar + envanter bozulması
// ---------------------------------------------------------------------------

/**
 * Bir mağaza eşyasının ŞU ANKİ dünya durumuna (savaş/veba/kriz/ekonomi) ve
 * GİDER enflasyonuna (yaşam/konut giderleriyle aynı, gelir enflasyonundan biraz
 * yüksek) göre satış fiyatını hesaplar — mulkGetiriOraniHesapla ile aynı
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
  return Math.max(1, paraYuvarla(esya.tabanFiyat * carpan * giderEnflasyonCarpani(state)));
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
      const guncelDeger = Math.round(tanim.tabanFiyat * giderEnflasyonCarpani(state));
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
