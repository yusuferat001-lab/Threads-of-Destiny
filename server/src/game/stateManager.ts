import { randomUUID } from "crypto";
import { CharacterState, Cag, Dil, Kategori, SonucEtkisi, YatkinlikKaynagi, KisilikEksenleri, UlkeKrizi, UlkeDurumu, DonemDurumu, DonemTuru, MulkTuru, SahipOlunanEsya, AileTalep, YonetimTalep, IkiDilMetin, UlkeGecmisiKaydi, EvcilHayvan } from "../types";
import { T, K, ikiDilT } from "../i18n";
import { amaclariUret, amacSkorCarpani, amaclariOlumdeKontrol, amacTanimiGetir } from "../data/hayatAmaclari";
import { AILELER, AileTanimi } from "../data/aileler";
import { KREDI_HAVUZU, KREDI_TEKLIF_SAYISI, KREDI_TEKLIF_YENILEME_YIL, krediHavuzTanimi, annuiteTaksit, type KrediHavuzTanimi } from "../data/krediHavuzu";
import { BolgeOzellikleri, bolgeOzellikleriGetir } from "../data/bolgeOzellikleri";
import { rastgeleKisilikCifti, kisilikGetir } from "../data/kisilikler";
import { YAS_OLUM_YIL, YAS_TERK_YIL } from "../data/aileSabitleri";
import { meslekDebuffOrani } from "../data/aranmaSabitleri";
import { DIN_TALEP_AGIRLIKLARI } from "../data/cemaat";
import { EKSTRA_VERGI_KAR_ESIGI, EKSTRA_VERGI_SONSUZ_YIL, ekstraVergiSonrakiYil, ekstraVergiCarpani } from "../data/ekstraVergi";
import {
  rutbeTanimiGetir,
  RutbeEsigi,
  RutbeTanimi,
  rutbeMaasCarpani,
  rutbePazarPayiEsigi,
  KARIYER_PUANI_YILLIK,
} from "../data/rutbeler";
import { YerlesimTanimi, yerlesimGetir, yerlesimIdByAd } from "../data/yerlesimler";
import { konutGetir, VARSAYILAN_KONUT_ID, TASINMA_MALIYETI, konutKademeIndeksi, KONUT_SAHIBI_MIN_KADEME } from "../data/konutlar";
import { yasamSecenegiGetir, VARSAYILAN_YASAM_SECIMI_ID } from "../data/yasamSecenekleri";
import { rastgeleIkiIsimSec, rastgeleBirIsimSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { yoneticiBilgisi, patronBilgisi } from "./yonetimKisileri";
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
import {
  type IsletmeBaglami,
  isletmeAktif,
  calisanMaaslariniGuncelle,
  isletmeBaslat,
  isletmeHazirla,
  isletmeGelirTahmini,
  isletmeYilIsle,
  otomatikDepoDoldur,
} from "./isletme";
import { isletmeMeslegiMi } from "../data/meslekProfilleri";
import {
  DONEM_SURE,
  DONEM_ADLARI,
  SAVAS_YILLIK_IHTIMAL,
  SAVAS_COOLDOWN_YIL,
  SAVAS_SURE,
  VEBA_YILLIK_IHTIMAL,
  VEBA_ILK_YIL_YOK,
  VEBA_ZORUNLU_YAS,
  VEBA_SURE,
  DEDIKODU_ISABET,
  DEDIKODU_YANLIS_ALARM,
  DONEM_TURLERI,
  donemEtkisiZarla,
  savasEtkisiZarla,
  vebaEtkisiZarla,
  sureZarla,
  savasVergisiZarla,
  donemTorbasindanCek,
  donemTorbasiniGoster,
  ilkDonemTorbasi,
  ekonomiFromDonem,
  yuzdeFarki,
} from "../data/dunyaDonemleri";
import { mulkTanimiGetir } from "../data/mulkler";
import {
  HAYVAN_ORTALAMA_OMUR,
  HAYVAN_BONUSLARI,
  hayvanBonusVar,
  evcilHayvanSenkronla,
  yeniEvcilHayvanUret,
} from "../data/evcilHayvanlar";
import {
  MagazaEsyasiTanimi,
  magazaEsyasiTanimiGetir,
  MAGAZA_ESYALARI,
  MAGAZA_VITRIN_ADET,
  MAGAZA_VITRIN_YENILEME_YIL,
  koleksiyonKategorisiMi,
} from "../data/magazaEsyalari";
import {
  pazarPayiHesapla,
  pazarMaasCarpani,
  pazarAdlariGetir,
  baslangicMusteri,
  rastgeleRakipMusteri,
  baslangicRakipMusterileri,
  aktifRakipler,
  MAKS_AKTIF_RAKIP,
  IKINCI_RAKIP_PAY,
  KUCUK_TABAN_PAY,
  sohretOtoriteIliskisi,
  rastgelePazarMusteri,
  PAZAR_KARIYER_PUANI_YILLIK,
  RAKIP_KIRMA_DOGRUDAN,
} from "../data/pazar";
import { musteriKaydir, rakiptenMusteriAl, rakipYenildiKontrol, piyasaYillikUygula, rakipAdiniGuncelle } from "./piyasa";
import {
  YATKINLIK_TIER_ETKILERI,
  YATKINLIK_TIER_SEVIYE,
  YATKINLIK_MUKEMMEL_UN_BONUSU,
  yatkinlikTierBelirle,
  meslekYatkinlikUnvaniGetir,
  yatkinlikSeviyedenTier,
} from "../data/meslekYatkinlik";

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
 * Yatkınlık kaynaklarının TEKİL katkı üst/alt sınırı (2026-09 sonu, kullanıcı
 * isteği: "ülkeler max ±6, aileye de bi üst alt limit koy, kişilikte etkilicek
 * ona da altüst limit koy"). Eskiden bölge tek kalemde ±10-12'ye, aile/kişilik
 * ise tek kalemde ±15-20'ye kadar çıkabiliyordu — bu sınır her KAYNAK×KATEGORİ
 * katkısına ayrı ayrı uygulanır (iki kişilik özelliği aynı kategoriyi
 * etkiliyorsa ikisi de kendi payında sınırlanır, toplamları sınırlanmaz;
 * sinerji bonusu ve taban rastgele oynama bu sınırların dışındadır).
 * Bölge için ayrıca `bolgeOzellikleri.ts`'teki ham veri de bu sınırın içinde
 * yeniden yazıldı (küçük, 8 satırlık bir tablo); aile (28 satır) ve kişilik
 * (18 satır) verisi elle dokunulmadı — sınır burada, çalışma anında uygulanır.
 */
export const BOLGE_YATKINLIK_LIMIT = 6;
export const AILE_YATKINLIK_LIMIT = 8;
export const KISILIK_YATKINLIK_LIMIT = 8;

/**
 * Yatkınlıkları kişilik özelliklerinden ve aile geçmişinden hesaplar; her
 * kategoriye küçük bir rastgele oynama (-5..+5) eklenir. Kaynak listesi
 * oyuncuya "neden bu mesleğe yatkınsın" açıklaması için döndürülür.
 */
export function yatkinlikHesapla(
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
      const sinirliDeger = clamp(deger, -KISILIK_YATKINLIK_LIMIT, KISILIK_YATKINLIK_LIMIT);
      yatkinliklar[kategori] += sinirliDeger;
      kaynaklar.push({ kaynak: ozellikAdi, kategori, deger: sinirliDeger });
    }
  }

  if (aile.yatkinlikEtkisi) {
    for (const [kategori, deger] of Object.entries(aile.yatkinlikEtkisi) as [Kategori, number][]) {
      const sinirliDeger = clamp(deger, -AILE_YATKINLIK_LIMIT, AILE_YATKINLIK_LIMIT);
      yatkinliklar[kategori] += sinirliDeger;
      kaynaklar.push({ kaynak: aile.ad, kategori, deger: sinirliDeger });
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
      const sinirliDeger = clamp(deger, -BOLGE_YATKINLIK_LIMIT, BOLGE_YATKINLIK_LIMIT);
      yatkinliklar[kategori] += sinirliDeger;
      kaynaklar.push({ kaynak: bolgeAdi, kategori, deger: sinirliDeger });
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
  if (kitlikVar(state.ulke)) haberler.push(kitlikHaberi(dil));
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
 * v10: artık yalnız işletmeli üç meslekte SATIŞ/BAĞIŞ çarpanıdır (Asker maaşında okunmaz). Toplam üst/alt sınır: olay + aile + ekip + yatırım
 * bonusları hep bu bandın içinde kalır. Faz 6 ekonomi rebalansı (2026-09 sonu,
 * kullanıcı isteği: "kalıcı maaş bonuslarını azalt"): tavan 1.20 → 1.15.
 */
export const MAAS_CARPANI_TAVAN = 1.15;
export const MAAS_CARPANI_TABAN = 0.7;

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

/** Fiyatların ve gelirlerin birlikte büyümesi: karakterin yaratıldığı yıldan bu yana geçen gerçek yıla göre bileşik. */
const ENFLASYON_ORANI_YILLIK: Record<Cag, number> = {
  "Orta Çağ": 0.01,
  "Sanayi Devrimi": 0.02,
};

/**
 * Tek enflasyon çarpanı (2026-10, Faz A): gelir, gider, fiyat, maliyet, mülk,
 * mağaza, kredi — her parasal şey aynı oranla büyür (OÇ %1, SD %2.5/yıl). Eski
 * ayrı "gider enflasyonu" kaldırıldı.
 */
export function enflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.01;
  return Math.pow(1 + oran, gecenYil);
}

/** v20: gider enflasyonu gelir enflasyonunun ×1,15'idir (OÇ %1,15 · SD %2,3/yıl). */
export const GIDER_ENFLASYON_KATSAYISI = 1.15;

/** Maliyet tarafı (alış, yaşam, kira, maaş, bakım, yatırım fiyatı) için bileşik çarpan. */
export function giderEnflasyonCarpani(state: CharacterState): number {
  const gecenYil = Math.max(0, state.yil - state.baslangic_yili);
  const oran = (ENFLASYON_ORANI_YILLIK[state.cag] ?? 0.01) * GIDER_ENFLASYON_KATSAYISI;
  return Math.pow(1 + oran, gecenYil);
}

/** Finans ekranında gösterilecek toplam gelir enflasyonu yüzdesi (oyunun başından bu yana). */
export function enflasyonYuzdesiHesapla(state: CharacterState): number {
  return Math.round((enflasyonCarpani(state) - 1) * 100);
}

/** Geriye dönük uyum: istemci `giderEnflasyonYuzdesi` okuyor; artık tek oran olduğu için gelir yüzdesiyle aynı. */
export function giderEnflasyonYuzdesiHesapla(state: CharacterState): number {
  return enflasyonYuzdesiHesapla(state);
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
type MaasCarpanGrubu = "rutbe" | "kariyer" | "itibar" | "pazar" | "donemsel";
interface MaasCarpanKalemi {
  ad: string;
  carpan: number;
  grup: MaasCarpanGrubu;
}

function maasCarpanKalemleri(state: CharacterState): { tabanMaas: number; kalemler: MaasCarpanKalemi[] } {
  const tabanMaas = TEMEL_MAAS[state.meslek] ?? 6;
  const itibarToplam = itibarMaasKirilimi(state).toplam; // mutluluk+şöhret+ahlak bantları toplamı, ±%; §13
  // (Kıdem primi 2026-10'da kaldırıldı: tur sayısı artık yıl sayısını yansıtmıyor.)
  const durumCarpani = state.durumlar.reduce((c, d) => c * (d.gelir_carpani ?? 1), 1);
  // Dünya dönemi / savaş / veba (Faz A): her biri başlarken zarla belirlenen maaş çarpanı.
  const donem = state.ulke.donem;
  const donemCarpani = donem?.etki.maas ?? 1;
  const savasCarpani = state.ulke.savasta ? (state.buyuk_savas?.etki?.maas ?? 0.92) : 1;
  const vebaCarpani = state.veba?.aktif ? (state.veba.etki?.maas ?? 1.1) : 1;
  const dil = state.dil;
  const donemAd = donem ? T(dil, DONEM_ADLARI[donem.tur].ad) : T(dil, "Dönem");

  return {
    tabanMaas,
    kalemler: [
      { ad: T(dil, "Şehir yönetimi"), carpan: sehirYonetimMaasCarpani(state.sehir_yonetim_seviyesi), grup: "kariyer" },
      { ad: T(dil, "Mesleğe yatkınlığın"), carpan: isletmeMeslegiMi(state.meslek) ? 1 : 1 + (state.meslek_maas_carpani ?? 0), grup: "kariyer" },
      // Eşin getirdiği "meslek bonusu" (placeholder): meslek sistemi değişince yalnız burası yeniden bağlanır.
      { ad: T(dil, "Eşinin desteği"), carpan: state.es_adi ? 1 + (state.es_meslek_bonusu ?? 0) / 100 : 1, grup: "kariyer" },
      { ad: T(dil, "İtibarın (mutluluk·şöhret·ahlak)"), carpan: 1 + itibarToplam / 100, grup: "itibar" },
      // Meslek pazarı (data/pazar.ts): pazar payın rakiplerin güçlendikçe düşer, sen güçlendikçe artar.
      { ad: T(dil, "Pazar payın"), carpan: pazarAdlariGetir(state.meslek) ? pazarMaasCarpani(pazarPayiHesapla(state)) : 1, grup: "pazar" },
      // Aranma yıldızları mesleki geliri kısar (yalnız Asker'in eski maaş sisteminde; işletmeli üç meslekte
      // aranma müşteri/ahlak kaybı olarak işler).
      { ad: T(dil, "Aranma gölgesi"), carpan: isletmeMeslegiMi(state.meslek) ? 1 : 1 - meslekDebuffOrani(state.suc_seviyesi), grup: "donemsel" },
      { ad: T(dil, "Enflasyon"), carpan: enflasyonCarpani(state), grup: "donemsel" },
      { ad: donemAd, carpan: donemCarpani, grup: "donemsel" },
      { ad: T(dil, "Savaş"), carpan: savasCarpani, grup: "donemsel" },
      { ad: T(dil, "Salgın (işçi kıtlığı)"), carpan: vebaCarpani, grup: "donemsel" },
      { ad: T(dil, "Geçici durumlar"), carpan: durumCarpani, grup: "donemsel" },
      { ad: T(dil, "Rütbe primi"), carpan: rutbeMaasCarpani(state.rutbe_seviye), grup: "rutbe" },
    ],
  };
}

/**
 * İşletme motoruna dışarıdan gelen değerler (enflasyon, rütbe fiyat primi, kalıcı
 * bonuslar). Olaylardan gelen `maas_carpani` etiketi, yatkınlık maaş çarpanı ve
 * geçici durumların gelir çarpanı işletmede MAAŞI değil müşteri talebini etkiler.
 */
export function isletmeBaglami(state: CharacterState): IsletmeBaglami {
  const durumCarpani = state.durumlar.reduce((c, d) => c * (d.gelir_carpani ?? 1), 1);
  return {
    enflasyon: enflasyonCarpani(state),
    giderEnflasyon: giderEnflasyonCarpani(state),
    satisCarpani: durumCarpani, // yalnız geçici durumlar talepte kalır; eş ve olay çarpanı müşteri sayısına yazılır
  };
}

export function hesaplaMaasYillik(state: CharacterState): number {
  if (isletmeAktif(state)) return Math.max(1, isletmeGelirTahmini(state, isletmeBaglami(state))); // kredi tavanı vb. için en az 1; gerçek (eksi olabilen) net: finansGetir
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
  /** Meslek pazarı: pazar payının maaşa yüzde etkisi (±). DEĞİŞKEN — rakip güçlendikçe düşer. */
  pazarYuzde: number;
  /** Güncel pazar payı (0-100, tam sayı yüzde). */
  pazarPayiYuzde: number;
  /** Mesleğe göre pazarın görünen adı ("Pazar Payı", "Cemaat Payı"...), oyuncunun dilinde. Meslek yoksa boş. */
  pazarAdi: string;
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
    pazarYuzde: carpanYuzdesi(grupCarpani("pazar")),
    pazarPayiYuzde: Math.round(pazarPayiHesapla(state) * 100),
    pazarAdi: K(state.dil, pazarAdlariGetir(state.meslek)?.pazar ?? ""),
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
  // v10: Tüccar (ticaret sermayesi) ve Din Adamı (nüfuz) çarpanları KALDIRILDI — işletmeli meslekler
  // olay parasını çarpmaz; gelir işletme motorundan gelir (Zanaatkâr zaten ×1).
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
  // NPC isimleri oyuncunun kendi adıyla çakışmasın (ör. "Étienne"in dostu da "Étienne" olmasın).
  const oyuncuAdi = oyuncuIsmi?.trim() ? oyuncuIsmi.trim().slice(0, 40) : "";
  const [dostAdi, rakipAdi] = rastgeleIkiIsimSec(cag, bolge, [oyuncuAdi]);
  const anneAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "kadin", [dostAdi, rakipAdi, oyuncuAdi]);
  const babaAdi = rastgeleCinsiyetliIsimSec(cag, bolge, "erkek", [dostAdi, rakipAdi, anneAdi, oyuncuAdi]);

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
    // Meslek 15 yaşında seçilir; mesleğiSec bunları o an bir kez doldurur.
    meslek_yatkinlik_seviyesi: null,
    meslek_yatkinlik_unvani: null,
    meslek_zar_bonusu: 0,
    meslek_maas_carpani: 0,
    meslek_tecrube_hizi: 0,
    gayrimenkul_getiri_bonusu: 0,
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
    // 2026-09 denge turu (kullanıcı isteği): sağlık tabanı 100→80→85→90
    // (aile etkisi artık dar bir ~±10 bandında, §aileler.ts — 90 tabanla
    // bile 100 tavanını aşmıyor); yerleşim etkisi hâlâ ekleniyor. Bölge
    // (ülke) etkisi sağlıkta KALDIRILDI — bolgeOzellik.saglik artık
    // başlangıç sağlığına katılmıyor.
    saglik: 90 + (aile.saglik ?? 0) + (yerlesim.saglik ?? 0),
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
    // v10: şöhret 20 + aile (±15) + bölge (±5) → 0..40
    un: 20 + clamp(aile.un ?? 0, -15, 15) + clamp(bolgeOzellik?.un ?? 0, -5, 5),
    // v10: ahlak 40 + aile (±15) + bölge (±5) → 20..60
    ahlak: 40 + clamp(aile.ahlak ?? 0, -15, 15) + clamp(bolgeOzellik?.ahlak ?? 0, -5, 5),
    ordu_mevcudu: 0,
    ordu_techizat_seviyesi: 0,
    ticaret_sermaye: 0,
    nufuz: 0,
    uretim_kapasitesi: 0,
    meslek_musteri: 0,
    piyasa_gunlugu: [],
    piyasa_etkileri: [],
    rakip_hamle_son_yil: null,
    musteri_ref: null,
    son_musteri_degisim: null,
    suc_seviyesi: 0,
    hapis_ceza_kalan: 0,
    hapis_ceza_toplam: 0,
    hapis_tur_sayaci: 0,
    saglik_kritik_yil_sayaci: 0,
    mulkler: [],
    mulk_bakim_kalan: {},
    mulk_alis_yili: {},
    magaza_envanteri: [],
    magaza_temel_kilit_bitis_yili: null,
    magaza_vitrin: null,
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
    rakip_yeni_yil: null,
    pazar_musteri: rastgelePazarMusteri(),
    rakip_sonraki_saldiri_yili: null,
    ekstra_vergi_sonraki_yil: null,
    rakip_saldiri_son_yil: null,
    vergi_carpan: 1,
    vergi_carpan_bitis_yili: null,

    es_adi: null,
    es_puani: 0,
    es_meslek: null,
    es_rutbe: null,
    cocuk_sayisi: 0,
    cocuklar: [],
    es_dogum_yili: null,
    es_evlilik_turu: null,
    es_grup: null,
    es_huylar: [],
    es_meslek_bonusu: 0,
    es_dugun_un: 0,
    es_son_zaman_yili: null,
    es_dusuk_yil: 0,
    es_terk_esigi: 2,
    es_dogum_sayisi: 0,
    es_sonraki_hamilelik_yili: 0,
    es_ihmal_uyari_goruldu: false,
    mantik_adaylar: [],
    mantik_yenileme_yili: 0,
    mantik_kilit_yili: 0,
    bekleyen_dugun: null,
    aktif_tanisma: null,
    sevgili: null,
    yas_bitis_yili: 0,
    ekip: [],
    hizip: null,
    amir_adi: null,
    amir_rutbe: null,
    astlar: [],
    anne_adi: anneAdi,
    baba_adi: babaAdi,
    evcil_hayvan: null,
    evcil_hayvanlar: [],
    hayvan_karsilasma_sayisi: 0,
    hayvan_karsilasma_turleri: [],
    unvanlar: [],
    hayat_amaci: null,
    // 15 yaşında meslek seçilince (mesleğiSec) doldurulur.
    hayat_amaclari: [],
    omur_zirve_suc: 0,
    // Aranmayı artıran son olayın yılı; yaratılışta baslangic_yili (4 yıllık temizlik sayacı ondan sayılır).
    son_suc_yili: yil,
    ifsa_kuyrugu: [],
    polis_uyari_yili: null,
    son_polis_uyari_yili: null,
    aranma_esik60_ustu: false,
    baskin_yili: null,
    aranma_esik75_ustu: false,
    aranma_bildirimleri: [],
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
    ulke: (() => {
      const donem = ilkDonemOlustur(yil);
      return { savasta: false, vebada: false, ekonomi: ekonomiFromDonem(donem.tur), kriz: null, nufusDurumu: "normal" as const, donem };
    })(),
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
    dunya_yaklasan: null,
    ulke_gecmisi: [],
    borc_yardimi_alindi: false,
    salgin_korunma_yatirimi: null,
    kredi: null,
    kredi_teklifleri: null,
    aile_etkilesim_kilit: {},
    kotu_is_kilit: {},
    ajan_gorevleri: [],
    isletme: null,
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
    etken_gunlugu: [],
    gecmis: [],
    hayat_hikayesi: [],
    aktif: true,
    olum_nedeni: null,
    skoru_kaydedildi: false,
  };

  // Doğuş kimliği ödülleri: yarıya indirme uygulanmadan (ham) verilir.
  if (aile.maasCarpani) maasCarpaniUygula(state, aile.maasCarpani, true);
  if (yerlesim.maasCarpani) maasCarpaniUygula(state, yerlesim.maasCarpani, true);

  // Kişilik özelliklerinin çeşitlendirilmiş doğuş bonusları (2026-09 sonu, §41):
  // maaş çarpanı / gayrimenkul getiri bonusu / üstlerle ilişki bonusu — yatkınlığın
  // (yukarıda yatkinlikHesapla ile zaten hesaplandı) DIŞINDA, isteğe bağlı ekstra
  // ödüller. Her ikisi de aile/yerleşim ile aynı desende (ham=true) uygulanır.
  for (const ozellikAdi of kisilik) {
    const tanim = kisilikGetir(ozellikAdi);
    if (!tanim) continue;
    if (tanim.gayrimenkulBonusu) state.gayrimenkul_getiri_bonusu += tanim.gayrimenkulBonusu;
    if (tanim.iliskiBonusu) {
      const { hat, deger } = tanim.iliskiBonusu;
      if (hat !== "patron") state.yonetim_iliski += deger;
      if (hat !== "yonetici") state.patron_iliski += deger;
    }
  }
  state.yonetim_iliski = clamp(state.yonetim_iliski, 0, 100);
  state.patron_iliski = clamp(state.patron_iliski, 0, 100);

  clampStats(state);
  state.acilis_anlatimi = acilisAnlatimiUret(state, aile, yerlesim);
  state.haberler = haberleriUret(state);
  return state;
}

function esikKarsilaniyorMu(esik: RutbeEsigi, state: CharacterState, hedefSeviye: number): boolean {
  const gerekliPay = rutbePazarPayiEsigi(state.meslek, hedefSeviye);
  return (
    (state.kariyer_puani ?? 0) >= esik.kariyer_puani &&
    (esik.un === undefined || state.un >= esik.un) &&
    (esik.ahlak === undefined || state.ahlak >= esik.ahlak) &&
    (gerekliPay === undefined || pazarPayiHesapla(state) >= gerekliPay)
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
      state.isim ?? "",
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
      state.isim ?? "",
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
 *  - Bekleme yılı YOK (v8.6): eşikler (kariyer puanı + stat + pazar payı) dolunca terfi gelir;
 *    terfi anında son_terfi_yili = state.yil damgalanır (yalnız kayıt).
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
    if (esikKarsilaniyorMu(tanim.esikler[i], state, i + 2)) hakEdilen = i + 2;
    else break;
  }

  let hedef = mevcut;
  if (hakEdilen > mevcut) {
    hedef = mevcut + 1;
    state.son_terfi_yili = state.yil;
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
/**
 * İki aktif rakip kuralı (v8.1): meslek seçilmiş, pazar kurulmuş bir kayıtta aktif rakip sayısı
 * MAKS_AKTIF_RAKIP'in altındaysa ve yenilmiş rakibin dönüşü planlanmamışsa eksik rakip eklenir;
 * oyuncu + rakipler P'nin %97'sini aşıyorsa rakipler orantılı küçültülür; `hedef_pay` eksikse doldurulur.
 */
export function rakipleriTamamla(state: CharacterState): void {
  if (!state.meslek || !MESLEKLER.includes(state.meslek) || !(state.pazar_musteri > 0)) return;
  const P = state.pazar_musteri;
  const aktif = aktifRakipler(state);
  if (aktif.length > 0 && aktif.length < MAKS_AKTIF_RAKIP && state.rakip_yeni_yil == null && state.rakipler.length < MAKS_AKTIF_RAKIP) {
    const kullanilan = state.meslek_musteri + aktif.reduce((t, r) => t + r.musteri, 0);
    const alinabilir = Math.max(0, P * (1 - KUCUK_TABAN_PAY) - kullanilan);
    const musteri = Math.round(Math.min(rastgeleRakipMusteri(P, IKINCI_RAKIP_PAY), alinabilir) * 10) / 10;
    const ad = rastgeleBirIsimSec(state.cag, state.bolge, [state.isim ?? "", state.dost_adi, state.es_adi ?? "", ...state.rakipler.map((r) => r.ad)]);
    state.rakipler.push({ ad, meslek: state.meslek, musteri, husumet: 25 + Math.floor(Math.random() * 14), yenildi: false });
  }
  const topRakip = aktifRakipler(state).reduce((t, r) => t + r.musteri, 0);
  const ust = P * (1 - KUCUK_TABAN_PAY) - state.meslek_musteri;
  if (topRakip > ust && topRakip > 0) {
    const oran = Math.max(0, ust) / topRakip;
    for (const r of aktifRakipler(state)) r.musteri = Math.round(r.musteri * oran * 100) / 100;
  }
  for (const r of aktifRakipler(state)) {
    if (typeof r.hedef_pay !== "number") r.hedef_pay = Math.max(0.1, r.musteri / P);
    if (r.hamle_son_yil === undefined) r.hamle_son_yil = null;
  }
  rakipAdiniGuncelle(state);
}

export function eskiKayitGocu(state: CharacterState): void {
  // Faz A: dünya dönemi yoksa mevcut ekonomiye göre ata; eski küçük kriz alanları temizlenir.
  if (state.ulke && !state.ulke.donem) {
    const tur: DonemTuru = state.ulke.ekonomi === "iyi" ? "bolluk" : state.ulke.kriz?.tur === "kitlik" ? "kitlik" : "durgunluk";
    state.ulke.donem = ilkDonemOlustur(state.yil, state.ulke.savasta && tur === "bolluk" ? "durgunluk" : tur);
    state.ulke.ekonomi = ekonomiFromDonem(state.ulke.donem.tur);
  }
  if (state.dunya_yaklasan === undefined) state.dunya_yaklasan = null;
  const eski = state as unknown as Record<string, unknown>;
  delete eski.kucuk_kriz_sonraki_yil;
  delete eski.gida_fiyat_sok_bitis_yili;
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
  // Konut/yaşam tarzı Faz 9'da (2026-09 sonu) 6 kademeden 5'e indirildi, id'ler
  // değişti. Eski canlı oturumlardaki id'ler en yakın yeni karşılığa (fiyat/kalite
  // sırası korunarak) taşınır — konutGetir/yasamSecenegiGetir aksi halde undefined
  // döner ve Finans/sahne ekranları çöker. Aşağıdaki "konut_sahibi" süreklilik
  // kontrolü de bu göçün YAPILMIŞ olmasına güvenir, bu yüzden ondan önce çalışır.
  const KONUT_ID_GOCU: Record<string, string> = {
    basit_barinak: "nemli_baraka",
    ahsap_ev: "nemli_baraka",
    normal_ev: "mutevazi_yuva",
    tas_ev: "sicak_ocak",
    konak: "saglam_konut",
    sato: "gorkemli_konak",
  };
  if (KONUT_ID_GOCU[state.konut_id]) state.konut_id = KONUT_ID_GOCU[state.konut_id];
  const YASAM_ID_GOCU: Record<string, string> = {
    copten_topla: "bayat_artik",
    ucuza_ye: "bayat_artik",
    normal_ye: "sade_sofra",
    iyi_ye: "keyifli_sofra",
    kaliteli_ye: "dengeli_sofra",
    ziyafet_gibi_ye: "solen_sofrasi",
  };
  if (YASAM_ID_GOCU[state.yasam_secimi_id]) state.yasam_secimi_id = YASAM_ID_GOCU[state.yasam_secimi_id];
  // "konut_sahibi" hayat amacının süreklilik sayacı sonradan eklendi. Zaten
  // nitelikli bir kademedeyse (Sıcak Ocak+) sayacı şimdi başlatıyoruz (geçmişte ne
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
  if (state.magaza_vitrin === undefined) state.magaza_vitrin = null;
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
  if (typeof state.saglik_kritik_yil_sayaci !== "number") state.saglik_kritik_yil_sayaci = 0;
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
  // Eski kayıtlar: 4 yıllık temizlik sayacı mevcut yıldan başlasın (aniden toplu düşüş olmasın).
  if (typeof state.son_suc_yili !== "number") state.son_suc_yili = state.yil;
  if (!Array.isArray(state.ifsa_kuyrugu)) state.ifsa_kuyrugu = [];
  if (state.polis_uyari_yili === undefined) state.polis_uyari_yili = null;
  if (state.son_polis_uyari_yili === undefined) state.son_polis_uyari_yili = null;
  if (typeof state.aranma_esik60_ustu !== "boolean") state.aranma_esik60_ustu = state.suc_seviyesi > 60;
  if (state.baskin_yili === undefined) state.baskin_yili = null;
  if (typeof state.aranma_esik75_ustu !== "boolean") state.aranma_esik75_ustu = state.suc_seviyesi >= 75;
  if (!Array.isArray(state.aranma_bildirimleri)) state.aranma_bildirimleri = [];
  if (typeof state.omur_kumar_net !== "number") state.omur_kumar_net = 0;
  if (typeof state.omur_sadaka_sayisi !== "number") state.omur_sadaka_sayisi = 0;
  if (typeof state.omur_hediye_sayisi !== "number") state.omur_hediye_sayisi = 0;
  if (typeof state.omur_riskli_basari !== "number") state.omur_riskli_basari = 0;
  // Faz 5 tek seferlik skor bonusu bayrakları sonradan eklendi.
  if (typeof state.komik_olum_basarili_risk !== "boolean") state.komik_olum_basarili_risk = false;
  if (typeof state.komik_olum_ile_oldu !== "boolean") state.komik_olum_ile_oldu = false;
  if (typeof state.veba_hayatta_kaldi !== "boolean") state.veba_hayatta_kaldi = false;
  if (typeof state.hapis_basarili_kacis !== "boolean") state.hapis_basarili_kacis = false;
  if (!Array.isArray(state.ulke_gecmisi)) state.ulke_gecmisi = [];
  // Dil alanı sonradan eklendi; eski kayıtlar her zaman Türkçe oynanmıştı.
  if (state.dil !== "en") state.dil = "tr";
  // Aile ekranı (eş/çocuk ilişkisi + etkileşim + talep) sonradan eklendi (§33).
  if (!state.aile_etkilesim_kilit || typeof state.aile_etkilesim_kilit !== "object") {
    state.aile_etkilesim_kilit = {};
  }
  // Karanlık işlerin bekleme süreleri (2026-10, §43 Faz 1) sonradan eklendi.
  if (!state.kotu_is_kilit || typeof state.kotu_is_kilit !== "object") state.kotu_is_kilit = {};
  if (!Array.isArray(state.ajan_gorevleri)) state.ajan_gorevleri = [];
  // Meslek işletmesi (Tüccar): eski kayıtta yoksa kur, işletmesiz mesleklerde temizle.
  if (state.meslek && isletmeMeslegiMi(state.meslek)) isletmeHazirla(state, isletmeBaglami(state));
  else if (state.isletme === undefined || state.isletme) state.isletme = null;
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
  // Eş modeli (aile/evlilik yeniden tasarımı) sonradan eklendi. Evli eski kayıtlarda
  // eşin yaşı bilinmiyor: oyuncudan ~3 yaş küçük sayılır; evlilik yolu etikete bakılır.
  if (state.es_adi) {
    if (typeof state.es_dogum_yili !== "number") state.es_dogum_yili = state.yil - Math.max(18, state.yas - 3);
    if (state.es_evlilik_turu !== "ask" && state.es_evlilik_turu !== "mantik") {
      state.es_evlilik_turu = state.etiketler.includes("evlilik_yolu:ask") ? "ask" : "mantik";
    }
    if (state.es_grup !== "genc" && state.es_grup !== "olgun") state.es_grup = "genc";
    if (typeof state.es_son_zaman_yili !== "number") state.es_son_zaman_yili = state.yil;
    if (typeof state.es_dogum_sayisi !== "number") state.es_dogum_sayisi = Math.min(5, (state.cocuklar ?? []).length);
  } else {
    if (typeof state.es_dogum_yili !== "number") state.es_dogum_yili = null;
    if (state.es_evlilik_turu !== "ask" && state.es_evlilik_turu !== "mantik") state.es_evlilik_turu = null;
    if (state.es_grup !== "genc" && state.es_grup !== "olgun") state.es_grup = null;
    if (typeof state.es_son_zaman_yili !== "number") state.es_son_zaman_yili = null;
    if (typeof state.es_dogum_sayisi !== "number") state.es_dogum_sayisi = 0;
  }
  if (!Array.isArray(state.es_huylar)) state.es_huylar = [];
  if (typeof state.es_meslek_bonusu !== "number") state.es_meslek_bonusu = 0;
  if (typeof state.es_dugun_un !== "number") state.es_dugun_un = 0;
  if (typeof state.es_dusuk_yil !== "number") state.es_dusuk_yil = 0;
  if (typeof state.es_terk_esigi !== "number") state.es_terk_esigi = 2;
  if (typeof state.es_sonraki_hamilelik_yili !== "number") {
    const sonDogum = typeof state.son_dogum_yili === "number" ? state.son_dogum_yili : null;
    state.es_sonraki_hamilelik_yili = sonDogum != null ? sonDogum + 3 : 0;
  }
  if (typeof state.es_ihmal_uyari_goruldu !== "boolean") state.es_ihmal_uyari_goruldu = false;
  // Durumlar tur yerine YIL sayar (2026-10): eski kayıtlardaki kalan_tur/tur_basi_* çevrilir (1 tur ≈ 1,4 yıl).
  for (const d of state.durumlar as unknown as Array<Record<string, number | undefined>>) {
    if (typeof d.kalan_tur === "number") { d.kalan_yil = Math.max(1, Math.round(d.kalan_tur * 1.4)); delete d.kalan_tur; }
    for (const alan of ["saglik", "para", "mutluluk"]) {
      const eski = d[`tur_basi_${alan}`];
      if (typeof eski === "number") { d[`yil_basi_${alan}`] = Math.round((eski / 1.4) * 10) / 10; delete d[`tur_basi_${alan}`]; }
    }
  }
  if (!Array.isArray(state.mantik_adaylar)) state.mantik_adaylar = [];
  if (typeof state.mantik_yenileme_yili !== "number") state.mantik_yenileme_yili = 0;
  if (typeof state.mantik_kilit_yili !== "number") state.mantik_kilit_yili = 0;
  if (typeof state.yas_bitis_yili !== "number") state.yas_bitis_yili = 0;
  if (state.bekleyen_dugun === undefined) state.bekleyen_dugun = null;
  if (state.aktif_tanisma === undefined) state.aktif_tanisma = null;
  if (state.sevgili === undefined) state.sevgili = null;
  // Derin rakip ilişkileri sonradan eklendi: meslek seçilmişse eski tekil
  // rakip_adi'ndan TEK bir rakip türet (2026-09: iki rakip yerine tek rakip).
  if (!Array.isArray(state.rakipler) || state.rakipler.length === 0) {
    if (state.meslek && MESLEKLER.includes(state.meslek)) {
      state.rakipler = [{ ad: state.rakip_adi, meslek: state.meslek, musteri: 0, husumet: 35, yenildi: false }];
    } else {
      state.rakipler = [];
    }
  } else {
    // Eski kayıtlarda iki AKTİF rakip olabilir — tek aktif rakip kuralına indir.
    // Meslek pazarı (2026-10) yenilen rakipleri listede tutar (yenildi:true) ve
    // yerlerine yenisi gelir; aktif olan her zaman rakipler[0]'dadır.
    const aktifler = state.rakipler.filter((r) => !r.yenildi);
    const yenilenler = state.rakipler.filter((r) => r.yenildi);
    state.rakipler = [...aktifler.slice(0, MAKS_AKTIF_RAKIP), ...yenilenler];
  }
  if (state.rakip_yeni_yil === undefined) state.rakip_yeni_yil = null;
  // İşletme v2 (§45): toplam pazar, rakip saldırı eşikleri, vergi çarpanı.
  if (typeof state.pazar_musteri !== "number") state.pazar_musteri = 400;
  if (state.rakip_sonraki_saldiri_yili === undefined) state.rakip_sonraki_saldiri_yili = null;
  if (state.ekstra_vergi_sonraki_yil === undefined) state.ekstra_vergi_sonraki_yil = null;
  delete (state as unknown as Record<string, unknown>).rakip_esikler;
  if (state.rakip_saldiri_son_yil === undefined) state.rakip_saldiri_son_yil = null;
  if (typeof state.vergi_carpan !== "number") state.vergi_carpan = 1;
  if (state.vergi_carpan_bitis_yili === undefined) state.vergi_carpan_bitis_yili = null;
  // v8.1: gizli güç (meslek_gucu / Rakip.guc) kalktı → müşteri sayısı. Eski kayıtta güçten pay türetilir.
  if (!Array.isArray(state.piyasa_gunlugu)) state.piyasa_gunlugu = [];
  if (!Array.isArray(state.piyasa_etkileri)) state.piyasa_etkileri = [];
  if (state.rakip_hamle_son_yil === undefined) state.rakip_hamle_son_yil = null;
  if (state.musteri_ref === undefined) state.musteri_ref = null;
  if (state.son_musteri_degisim === undefined) state.son_musteri_degisim = null;
  {
    const eski = state as unknown as { meslek_gucu?: number };
    if (typeof state.meslek_musteri !== "number") {
      const meslekli = !!state.meslek && MESLEKLER.includes(state.meslek);
      const eskiGuc = typeof eski.meslek_gucu === "number" ? eski.meslek_gucu : null;
      if (meslekli) {
        const rakipGuc = (state.rakipler ?? []).filter((r) => !r.yenildi).reduce((t, r) => t + (((r as unknown as { guc?: number }).guc) ?? 0), 0);
        if (eskiGuc !== null) {
          const toplam = eskiGuc + rakipGuc + 40;
          state.meslek_musteri = Math.round((eskiGuc / toplam) * state.pazar_musteri * 100) / 100;
        } else {
          state.meslek_musteri =
            baslangicMusteri(state.pazar_musteri, state.meslek_yatkinlik_seviyesi ?? null) +
            (state.pazar_musteri * 0.015 * Math.max(0, (state.rutbe_seviye ?? 1) - 1));
        }
        for (const r of state.rakipler ?? []) {
          const g = ((r as unknown as { guc?: number }).guc);
          if (typeof r.musteri !== "number") {
            if (r.yenildi) r.musteri = 0;
            else if (typeof g === "number" && eskiGuc !== null) {
              const toplam = eskiGuc + rakipGuc + 40;
              r.musteri = Math.round((g / toplam) * state.pazar_musteri * 100) / 100;
            } else r.musteri = rastgeleRakipMusteri(state.pazar_musteri, IKINCI_RAKIP_PAY);
          }
          delete (r as unknown as { guc?: number }).guc;
        }
      } else {
        state.meslek_musteri = 0;
      }
    }
    delete eski.meslek_gucu;
    for (const r of state.rakipler ?? []) {
      if (typeof r.musteri !== "number") r.musteri = 0;
      delete (r as unknown as { guc?: number }).guc;
    }
  }
  rakipleriTamamla(state);
  if (state.salgin_korunma_yatirimi === undefined) state.salgin_korunma_yatirimi = null;
  if (state.kredi === undefined) state.kredi = null;
  if (state.kredi_teklifleri === undefined) state.kredi_teklifleri = null;
  if (state.kredi && typeof state.kredi.vadeYil !== "number") state.kredi.vadeYil = 6;
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
  if (!Array.isArray(state.etken_gunlugu)) state.etken_gunlugu = [];
  // "Gecikmiş takip" havuzu sonradan eklendi.
  if (!Array.isArray(state.gecikmis_takipler)) state.gecikmis_takipler = [];
  // "Yedi Canlı" başarımının kalıcı bayrağı sonradan eklendi; eski kayıtlarda
  // bilinmiyor sayılır (retroaktif olarak kazandırılmaz — bir sonraki relik
  // tetiklenmesinde zaten normal yoldan set edilir).
  if (typeof state.relik_can_kurtardi !== "boolean") state.relik_can_kurtardi = false;
  // Evcil hayvan sistemi yeniden tasarımı (2026-10): tek hayvan -> yaşayan hayvanlar listesi,
  // ömür + pasif bonus + karşılaşma sayacı. Papağan/Kurt türleri kaldırıldı (Karga/Köpek'e taşınır).
  if (!Array.isArray(state.evcil_hayvanlar)) {
    state.evcil_hayvanlar = [];
    const eski = state.evcil_hayvan as (Partial<EvcilHayvan> & { tur: string; isim: string }) | null;
    if (eski) {
      const tur = eski.tur === "Papağan" ? "Karga" : eski.tur === "Kurt" ? "Köpek" : eski.tur;
      etiketSil(state, [`evcil_hayvan_tur:${eski.tur}`]);
      const gecenYil = typeof eski.edinim_yili === "number" ? state.yil - eski.edinim_yili : 2;
      const ortalama = HAYVAN_ORTALAMA_OMUR[tur] ?? 14;
      const cift = HAYVAN_BONUSLARI[tur];
      state.evcil_hayvanlar.push({
        tur,
        isim: eski.isim,
        edinim_yili: typeof eski.edinim_yili === "number" ? eski.edinim_yili : state.yil - 2,
        edinim_yasi: typeof eski.edinim_yasi === "number" ? eski.edinim_yasi : Math.max(15, state.yas - 2),
        omur: Math.max(typeof eski.omur === "number" ? eski.omur : ortalama + Math.floor(Math.random() * 5) - 2, gecenYil + 3),
        bonus_id: eski.bonus_id ?? (cift ? cift[Math.floor(Math.random() * cift.length)].id : ""),
      });
      etiketEkle(state, ["evcil_hayvan_var", `evcil_hayvan_tur:${tur}`]);
    }
  }
  evcilHayvanSenkronla(state);
  if (typeof state.hayvan_karsilasma_sayisi !== "number") state.hayvan_karsilasma_sayisi = state.evcil_hayvanlar.length;
  if (!Array.isArray(state.hayvan_karsilasma_turleri)) state.hayvan_karsilasma_turleri = state.evcil_hayvanlar.map((h) => h.tur);
  // Kişilik kaynaklı gayrimenkul getiri bonusu (§41) sonradan eklendi; eski kayıtlarda etkisiz (0) sayılır.
  if (typeof state.gayrimenkul_getiri_bonusu !== "number") state.gayrimenkul_getiri_bonusu = 0;
  // Mesleğe yatkınlık kademeleri (2026-09 sonu) sonradan eklendi. Meslek zaten
  // seçilmişse mevcut yatkinliklar'dan kademeyi geriye dönük türet (mükemmel
  // kademenin tek seferlik şöhret bonusu RETROAKTİF verilmez — o yalnız ilk
  // seçim anının bir ödülüdür); meslek henüz seçilmemişse null/0 kalır.
  if (state.meslek_yatkinlik_seviyesi === undefined) {
    const meslekKategorisiEski = state.meslek ? MESLEK_KATEGORI[state.meslek] : undefined;
    if (meslekKategorisiEski) {
      const tierEski = yatkinlikTierBelirle(state.yatkinliklar?.[meslekKategorisiEski] ?? 0);
      const etkiEski = YATKINLIK_TIER_ETKILERI[tierEski];
      state.meslek_yatkinlik_seviyesi = YATKINLIK_TIER_SEVIYE[tierEski];
      state.meslek_yatkinlik_unvani = meslekYatkinlikUnvaniGetir(state.cag, state.meslek, tierEski);
      state.meslek_zar_bonusu = etkiEski.zarBonusu;
      state.meslek_maas_carpani = etkiEski.maasCarpani;
      state.meslek_tecrube_hizi = etkiEski.tecrubeHizi;
    } else {
      state.meslek_yatkinlik_seviyesi = null;
      state.meslek_yatkinlik_unvani = null;
      state.meslek_zar_bonusu = 0;
      state.meslek_maas_carpani = 0;
      state.meslek_tecrube_hizi = 0;
    }
    if (state.meslek_yatkinlik_seviyesi !== null && !state.etiketler.includes("yatkinlik_5kademe")) state.etiketler.push("yatkinlik_5kademe");
  } else if (state.meslek_yatkinlik_seviyesi !== null && !state.etiketler.includes("yatkinlik_5kademe")) {
    // v10: yatkınlık 4 kademeden 5'e çıktı; eski seviye 4 (Mükemmel) → 5. Tüm sayısal alanlar yeni tabloya göre yeniden yazılır.
    if (state.meslek_yatkinlik_seviyesi === 4) state.meslek_yatkinlik_seviyesi = 5;
    const tierGoc = yatkinlikSeviyedenTier(state.meslek_yatkinlik_seviyesi);
    const etkiGoc = YATKINLIK_TIER_ETKILERI[tierGoc];
    state.meslek_zar_bonusu = etkiGoc.zarBonusu;
    state.meslek_maas_carpani = etkiGoc.maasCarpani;
    state.meslek_tecrube_hizi = etkiGoc.tecrubeHizi;
    if (state.meslek) state.meslek_yatkinlik_unvani = meslekYatkinlikUnvaniGetir(state.cag, state.meslek, tierGoc);
    state.etiketler.push("yatkinlik_5kademe");
  }
}

/** Oyuncu mesleğini seçtikten sonra çağrılır: miras bonusunu ve maaşı uygular. */
export function mesleğiSec(state: CharacterState, meslek: string): void {
  if (!MESLEKLER.includes(meslek)) throw new Error("Geçersiz meslek.");

  state.meslek = meslek;
  // v10: aile mirası bonusu tamamen kalktı (aile `devamMeslegi` yalnız bölge×aile yatkınlık sinerjisi için kalır).
  state.aile_mirasi_surduruldu = false;

  // Mesleğe yatkınlık kademesi (2026-09 sonu): meslekle örtüşen kategorideki
  // (savas/ticaret/din/zanaat) TOPLAM yatkınlık, BİR KEZ 4 kademeden birine
  // yerleştirilir; kalıcı unvan + zar/maaş/tecrübe çarpanları bir daha
  // değişmez (yatkinliklar sonradan oynasa bile) — bkz. data/meslekYatkinlik.ts.
  const meslekKategorisi = MESLEK_KATEGORI[meslek];
  if (meslekKategorisi) {
    const tier = yatkinlikTierBelirle(state.yatkinliklar[meslekKategorisi] ?? 0);
    const etki = YATKINLIK_TIER_ETKILERI[tier];
    state.meslek_yatkinlik_seviyesi = YATKINLIK_TIER_SEVIYE[tier];
    state.meslek_yatkinlik_unvani = meslekYatkinlikUnvaniGetir(state.cag, meslek, tier);
    state.meslek_zar_bonusu = etki.zarBonusu;
    state.meslek_maas_carpani = etki.maasCarpani;
    state.meslek_tecrube_hizi = etki.tecrubeHizi;
    if (!state.etiketler.includes("yatkinlik_5kademe")) state.etiketler.push("yatkinlik_5kademe");
    if (tier === "mukemmel") {
      state.un += YATKINLIK_MUKEMMEL_UN_BONUSU;
      if (state.meslek_yatkinlik_unvani) {
        hayatOlayiEkle(
          state,
          "🌟",
          T(state.dil, "Doğuştan yeteneğin fark edildi: {0}", [K(state.dil, state.meslek_yatkinlik_unvani)])
        );
      }
    }
  }

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

  if (meslek === "Asker") state.ordu_mevcudu = 10;

  // Meslek pazarı (data/pazar.ts): P × (%8–9 + yatkınlık kademesi + aile mirası) müşteriyle başla.
  if (!state.meslek_musteri) {
    state.meslek_musteri = baslangicMusteri(state.pazar_musteri, state.meslek_yatkinlik_seviyesi);
  }
  // İki rakip (v8.1): büyük %44–51, ikinci %28–34 (P'nin kesri); rakipler[0] = büyük, rakip_adi onunla aynı kişi.
  if (state.rakipler.length === 0) {
    const [buyukM, ikinciM] = baslangicRakipMusterileri(state.pazar_musteri, state.meslek_musteri);
    const ikinciAd = rastgeleBirIsimSec(state.cag, state.bolge, [state.isim ?? "", state.dost_adi, state.es_adi ?? "", state.rakip_adi]);
    state.rakipler = [
      { ad: state.rakip_adi, meslek, musteri: buyukM, husumet: 28 + Math.floor(Math.random() * 14), yenildi: false, hedef_pay: buyukM / state.pazar_musteri, hamle_son_yil: null },
      { ad: ikinciAd, meslek, musteri: ikinciM, husumet: 25 + Math.floor(Math.random() * 14), yenildi: false, hedef_pay: ikinciM / state.pazar_musteri, hamle_son_yil: null },
    ];
  }
  state.musteri_ref = { oyuncu: state.meslek_musteri, rakip: state.rakipler.reduce((t, r) => t + r.musteri, 0), kucuk: Math.max(0, state.pazar_musteri - state.meslek_musteri - state.rakipler.reduce((t, r) => t + r.musteri, 0)) };
  // Meslek işletmesi (şu an yalnız Tüccar): hat/stok/yatırım durumu kurulur.
  if (isletmeMeslegiMi(meslek)) {
    isletmeBaslat(state, isletmeBaglami(state));
    // Tek otorite = şehir yöneticisi: ilişki 30–40 arası rastgele başlar (§45).
    state.yonetim_iliski = 30 + Math.floor(Math.random() * 11);
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
  state.acilis_anlatimi = [
    state.acilis_anlatimi,
    meslekCumlesi[meslek] ?? T(dil, "On beş yaşındasın ve {0} olarak hayata atılıyorsun.", [K(dil, meslek)]),
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
  // Tek yerleşim artık nötr "Kasaba" — "Fransa topraklarının kasaba kısmına" gibi
  // tuhaf bir cümle kurmasın diye ona özel doğal bir kalıp kullanılır.
  const yerlesimCumlesi =
    yerlesim.id === "kasaba"
      ? T(dil, "Ailen {0} topraklarında küçük bir kasabaya yerleşmiş; sen de hayata orada gözlerini açtın.", [bolgeAd])
      : T(dil, "Ailen {0} topraklarının {1} kısmına yerleşmiş; sen de hayata burada gözlerini açtın.", [
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
  // Kesirli kalabilen değerler en fazla 2 ondalığa yuvarlanır: float birikimi (7.829999999999998,
  // 130.04999999999993 …) arayüze/metinlere 6-7 basamak olarak sızmasın.
  state.para = paraYuvarla(state.para);
  state.kariyer_puani = paraYuvarla(state.kariyer_puani ?? 0);
  state.dost_puani = paraYuvarla(clamp(state.dost_puani, 0, 100));
  state.rakip_puani = paraYuvarla(clamp(state.rakip_puani, 0, 100));
  state.suc_seviyesi = paraYuvarla(clamp(state.suc_seviyesi, 0, 100));
  // Suçun ömür boyu ulaştığı tepe (amaç koşulları: "hiç aranmadan yaşa"). Suç seviyesi
  // artık pasif azalmıyor ama büyük baskın "temize çık" onu düşürebiliyor — bu sayaç unutmaz.
  state.omur_zirve_suc = paraYuvarla(Math.max(state.omur_zirve_suc ?? 0, state.suc_seviyesi));
  // Nüfuz pasif olarak kesirli birikir (+0.3/yıl); tam sayıda tutulur ki
  // arayüzde ve maaş kırılımında "12.6" gibi değerler görünmesin.
  state.nufuz = Math.round(Math.max(0, state.nufuz));
  // Müşteri sayıları kesirli birikir; iki ondalığa yuvarlanır (gösterimde tam sayı).
  state.meslek_musteri = Math.round(Math.max(0, state.meslek_musteri ?? 0) * 100) / 100;
  for (const r of state.rakipler ?? []) {
    r.musteri = Math.round(Math.max(0, r.musteri ?? 0) * 100) / 100;
    r.husumet = paraYuvarla(r.husumet);
  }
  if (state.es_adi) state.es_puani = paraYuvarla(clamp(state.es_puani, 0, 100));
  state.yonetim_iliski = paraYuvarla(clamp(state.yonetim_iliski ?? 40, 0, 100));
  state.patron_iliski = paraYuvarla(clamp(state.patron_iliski ?? 40, 0, 100));
  for (const c of state.cocuklar) {
    if (typeof c.iliski === "number") c.iliski = Math.round(clamp(c.iliski, 0, 100));
  }
  state.cocuk_sayisi = Math.max(0, state.cocuk_sayisi);
  // Para alt/üst sınırsız bırakılır: borca girebilir, sınırsız zenginleşebilir.
}

/** Kutsal kalıntı gibi mistik eşyaların tek seferlik ölümden koruma etiketi. */
export const KORUYUCU_MUSKA_ETIKETI = "esya:kutsal_kalinti";

/**
 * `neden`: düz metin (oyuncunun dilinde; eski çağrılar/testler) ya da iki dilli bir
 * metin. İki dilli verilirse state.olum_nedeni oyuncunun diline göre seçilir ve iki
 * dil de olum_nedeni_ceviri'de saklanır (liderlik tablosu bunu kullanır).
 */
export function checkDeath(state: CharacterState, zorunluOlum: boolean, neden?: string | IkiDilMetin): void {
  // Idempotent: zaten ölmüş karakterde ölüm nedenini/amaç kilidini yeniden yazma (ilk neden kalır).
  if (!state.aktif) return;
  if (state.saglik <= 0 || zorunluOlum) {
    if (state.etiketler.includes(KORUYUCU_MUSKA_ETIKETI)) {
      etiketSil(state, [KORUYUCU_MUSKA_ETIKETI]);
      state.saglik = Math.max(state.saglik, 15);
      state.relik_can_kurtardi = true;
      hayatOlayiEkle(state, "✨", T(state.dil, "Kutsal bir emanet sayesinde ölümden döndü"));
      return;
    }
    state.aktif = false;
    const ceviri: IkiDilMetin =
      neden === undefined
        ? ikiDilT(state.saglik <= 0 ? "Sağlık kaybı" : "Bilinmeyen sebep")
        : typeof neden === "string"
          ? { tr: neden, en: neden }
          : neden;
    state.olum_nedeni = state.dil === "en" ? ceviri.en : ceviri.tr;
    state.olum_nedeni_ceviri = ceviri;
    // Ölüm anında tüm tamamlanmamış amaçlara son bir kez bak ("olumde" koşulları +
    // son turda kaçmış olabilecek "herhangi" koşulları). Skor yazımından önce kilitlenir.
    for (const a of amaclariOlumdeKontrol(state, netServetHesapla(state))) {
      const tanim = amacTanimiGetir(a.id);
      const ad = tanim ? tanim.baslik[state.dil === "en" ? "en" : "tr"] : a.id;
      hayatOlayiEkle(state, "🎯", T(state.dil, "Hayat amacını tamamladı: {0}", [ad]));
    }
  }
}

const GECMIS_MAX_NOKTA = 40;

/** Geçmiş yıl grafiği için o anki durumu kaydeder; liste belli bir uzunlukta tutulur. */
export function gecmisKaydet(state: CharacterState): void {
  state.gecmis.push({ yil: state.yil, para: paraYuvarla(state.para), saglik: state.saglik, un: state.un });
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

const ULKE_GECMISI_MAX = 30;

/** Ülkedeki savaş/veba/kriz başlangıç-bitişini "Yıl" penceresi için kalıcı kaydeder (en fazla 30 kayıt). */
export function ulkeGecmisiEkle(state: CharacterState, tur: UlkeGecmisiKaydi["tur"], yil: number, ayrinti?: string): void {
  state.ulke_gecmisi.push(ayrinti === undefined ? { yil, tur } : { yil, tur, ayrinti });
  if (state.ulke_gecmisi.length > ULKE_GECMISI_MAX) {
    state.ulke_gecmisi.splice(0, state.ulke_gecmisi.length - ULKE_GECMISI_MAX);
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
    checkDeath(state, true, ikiDilT("Yüz yaşını doldurdun; huzurlu bir ihtiyar olarak, uykunda son nefesini verdin."));
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
/**
 * Verilen yaştaki YILLIK yaşlanma sağlık kaybı (yaslanmaUygula + gösterge detayı ortak kullanır).
 * v11 "tavanlı iniş": 50-74 yaş arası kayıp bir tavana kadar iner (bkz. yaslanmaSaglikTavani);
 * 75'ten sonra tavansız (−6, 80-84 −8, 85+ −10).
 */
export function yaslanmaYillikKayip(yas: number): number {
  if (yas >= 85) return 10;
  if (yas >= 80) return 8;
  if (yas >= 75) return 6;
  if (yas >= 70) return 5;
  if (yas >= 60) return 5;
  if (yas >= 50) return 3;
  return 0;
}

/** Yaşlanmanın sağlığı indirebileceği en alt sınır (yoksa null = tavansız). Sağlık sınırın üstündeyse oraya kadar düşer, altındaysa yaşlanma dokunmaz. */
export function yaslanmaSaglikTavani(yas: number): number | null {
  if (yas >= 75) return null;
  if (yas >= 70) return 10;
  if (yas >= 65) return 20;
  if (yas >= 60) return 30;
  if (yas >= 50) return 40;
  return null;
}

export function yaslanmaUygula(state: CharacterState, yasArtisi: number): number {
  if (yasArtisi <= 0) return 0;
  let toplamKayip = 0;
  let yas = state.yas - yasArtisi;
  for (let i = 0; i < yasArtisi; i++) {
    yas += 1;
    const kayip = yaslanmaYillikKayip(yas);
    if (kayip <= 0) continue;
    const tavan = yaslanmaSaglikTavani(yas);
    if (tavan === null) {
      state.saglik -= kayip;
      toplamKayip += kayip;
    } else if (state.saglik > tavan) {
      const dusen = Math.min(kayip, state.saglik - tavan);
      state.saglik -= dusen;
      toplamKayip += dusen;
    }
  }
  return toplamKayip;
}

/** v11: gençlik toparlanması — yılın yaşı 30'a kadar, sağlık 70'in altındaysa yılda +1 can. */
export const GENC_SAGLIK_YAS_SINIRI = 30;
export const GENC_SAGLIK_HEDEFI = 70;
export function gencSaglikToparlanmasi(state: CharacterState, yasArtisi: number): number {
  let artis = 0;
  for (let i = 0; i < yasArtisi; i++) {
    const yilYasi = state.yas - yasArtisi + i + 1;
    if (yilYasi <= GENC_SAGLIK_YAS_SINIRI && state.saglik < GENC_SAGLIK_HEDEFI) {
      state.saglik += 1;
      artis += 1;
    }
  }
  return artis;
}

/** Riskli seçimlerde ölüm şansını büyüten sağlık eşiği (efektifOlumSansi ile aynı anlam). */
export const KRONIK_SAGLIK_ESIGI = 30;
/** Çapraz erozyon: sağlık bu değerin altında ARDIŞIK CAPRAZ_ARDISIK_YIL yıl kalırsa mutluluk yılda −CAPRAZ_MUTLULUK_YILLIK. */
export const CAPRAZ_SAGLIK_ESIGI = 10;
export const CAPRAZ_ARDISIK_YIL = 2;
export const CAPRAZ_MUTLULUK_YILLIK = 1;

/** Pasif şöhret erimesi: [alt sınır, yıllık kayıp] — 40-50 −1, 50-65 −2, 65-80 −3, 80-100 −4 (40 altı etkilenmez). */
export const SOHRET_EROME_BANTLARI: ReadonlyArray<readonly [number, number]> = [
  [40, 1],
  [50, 2],
  [65, 3],
  [80, 4],
];
export function sohretErimesiYillik(un: number): number {
  let kayip = 0;
  for (const [esik, yillik] of SOHRET_EROME_BANTLARI) {
    if (un >= esik) kayip = yillik;
  }
  return kayip;
}

// Evlilik ↔ mutluluk pasif sürüklenmesi (kullanıcı isteği: "evli olmamak mutluluk
// düşürsün, eşle kavga etmek de düşürsün"). pasifEkonomiUygula'da yıllık işler,
// yalnız EVLILIK_MORAL_YAS ve üstünde. Yalnızlık ile kötü evlilik moral aşındırır,
// iyi evlilik moral verir — böylece evlilik gerçek bir moral ekseni olur.
export const EVLILIK_MORAL_YAS = 26;
export const YALNIZLIK_MUTLULUK_YILLIK = 0.7; // bekar/dul, 26+ → -0.7/yıl
export const KOTU_EVLILIK_ESIGI = 35; // es_puani bunun altındaysa "sürekli kavga"
const KOTU_EVLILIK_MUTLULUK_YILLIK_MIN = 0.8; // es_puani ~35'te ceza
const KOTU_EVLILIK_MUTLULUK_YILLIK_EK = 1.2; // es_puani 0'da toplam -2.0/yıl
export const IYI_EVLILIK_ESIGI = 70; // es_puani bunun üstündeyse mutlu evlilik
export const IYI_EVLILIK_MUTLULUK_YILLIK = 0.5; // +0.5/yıl

// ===== Aile ekranı: eş/çocuk ilişkisi pasif sürüklenmesi + para talebi (§33) =====
// Felsefe evlilik moraliyle aynı: ilgilenmezsen ilişki soğur, düşük ilişki moral
// aşındırır, oyuncu Aile ekranındaki etkileşimlerle (hediye/zaman/gezi) yukarı çeker.
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

/** Yeni bir hayvanı yaşayan listeye ekler (etiketler + senkron). Tavan/tekil tür kontrolü çağıranın işi. */
export function evcilHayvanEkle(state: CharacterState, tur: string): EvcilHayvan {
  const hayvan = yeniEvcilHayvanUret(tur, state);
  state.evcil_hayvanlar.push(hayvan);
  etiketEkle(state, ["evcil_hayvan_var", `evcil_hayvan_tur:${tur}`]);
  evcilHayvanSenkronla(state);
  return hayvan;
}

/** Bir hayvanı yaşayan listeden çıkarır (ölüm/kayıp); etiketleri ve eski tek-alanı günceller. */
export function evcilHayvanKaldir(state: CharacterState, hayvan: EvcilHayvan): void {
  state.evcil_hayvanlar = state.evcil_hayvanlar.filter((h) => h !== hayvan);
  etiketSil(state, [`evcil_hayvan_tur:${hayvan.tur}`]);
  if (state.evcil_hayvanlar.length === 0) etiketSil(state, ["evcil_hayvan_var"]);
  evcilHayvanSenkronla(state);
}

/**
 * Yıllık evcil hayvan işleri: pasif şöhret bonusları (Şahin), sonra ömrünü dolduran
 * hayvanların doğal ölümü (bonusu biter). Ölüm cümlesi döner (zamanAnlatimi'ne eklenir).
 */
export function evcilHayvanYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  if (state.evcil_hayvanlar.length === 0) return null;
  if (hayvanBonusVar(state, "sahin_sohret")) {
    state.un += 0.5 * yasArtisi;
    state.yonetim_iliski = Math.min(100, state.yonetim_iliski + 0.4 * yasArtisi);
  }
  const olenler = state.evcil_hayvanlar.filter((h) => state.yil >= h.edinim_yili + h.omur);
  if (olenler.length === 0) return null;
  const cumleler: string[] = [];
  for (const hayvan of olenler) {
    evcilHayvanKaldir(state, hayvan);
    state.mutluluk -= 6;
    hayatOlayiEkle(state, "💔", T(state.dil, "Evcil hayvanı {0} ömrünü doldurup öldü", [hayvan.isim]));
    cumleler.push(T(state.dil, "💔 {0}, ömrünü doldurup sessizce göçtü; yerini kimse dolduramaz.", [hayvan.isim]));
  }
  return cumleler.join(" ");
}

/**
 * Eşi evlilik slotundan çıkarır (ölüm / terk / boşanma / veba): eş alanları, meslek
 * bonusu ve sayaçlar sıfırlanır, `medeni:evli` düşer, yeni mantık adayları hemen
 * aktifleşir ve (ölüm/terk) yas dönemi başlar. Terkte düğün şöhreti geri alınır.
 * Çocuklar ve ömür boyu doğum kayıtları korunur. Anlatı için eşin adını döndürür.
 */
export function esiSifirla(state: CharacterState, neden: "olum" | "terk" | "bosanma"): string | null {
  const eski = state.es_adi;
  if (neden === "terk" && state.es_dugun_un) state.un -= state.es_dugun_un;
  state.es_adi = null;
  state.es_puani = 0;
  state.es_meslek = null;
  state.es_rutbe = null;
  state.es_dogum_yili = null;
  state.es_evlilik_turu = null;
  state.es_grup = null;
  state.es_huylar = [];
  state.es_meslek_bonusu = 0;
  state.es_dugun_un = 0;
  state.es_son_zaman_yili = null;
  state.es_dusuk_yil = 0;
  state.es_dogum_sayisi = 0;
  state.es_sonraki_hamilelik_yili = 0;
  state.es_ihmal_uyari_goruldu = false;
  etiketSil(state, ["medeni:evli"]);
  // Slot sıfırlandı: yeni mantık adayları hemen üretilsin, red kilidi kalksın.
  state.mantik_adaylar = [];
  state.mantik_yenileme_yili = 0;
  state.mantik_kilit_yili = 0;
  state.bekleyen_dugun = null;
  if (neden === "olum") state.yas_bitis_yili = state.yil + YAS_OLUM_YIL;
  else if (neden === "terk") state.yas_bitis_yili = state.yil + YAS_TERK_YIL;
  return eski;
}

/** Yıllık pasif kontrol: çocuk ilişkisi soğuması, düşük ilişki moral cezası, bekleyen çocuk talebinin süresi dolması ve yeni talep üretimi. (Eşin yıllık mantığı game/aileSistemi.ts'tedir.) Bir anlatı cümlesi döndürebilir (gameEngine zamanAnlatimi'ye ekler). */
export function aileYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  let not: string | null = null;

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
      state.es_puani = Math.max(0, state.es_puani - AILE_TALEP_SURESI_DOLMA_CEZA); // eski kayıttan kalan eş talebi
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

  // Yeni talep üretimi (yalnız çocuklardan; eş artık ilişki barıyla yönetilir)
  const yasayanCocukVar = state.cocuklar.some((c) => c.yasiyor);
  if (
    !state.aile_talep &&
    state.yil >= state.aile_talep_sonraki_yil &&
    yasayanCocukVar &&
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
  const kaynaklar: ("es" | "cocuk")[] = [];
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
/** İşletmeli mesleklerin tek otoritesi (şehir yöneticisi) için talep gerekçeleri. */
const SEHIR_TALEP_KALEMLERI: { bagis: string[]; sadakat: string[] } = {
  bagis: [
    "şehir surlarının onarımı için katkı",
    "pazar yerinin yenilenmesi için pay",
    "şehir yönetiminin vergi açığı için bağış",
    "şenlik ve ziyafet masrafına katkı",
  ],
  sadakat: [
    "şehir meclisinde destek sözü",
    "rakip tüccarlarla iş yapmama taahhüdü",
    "şehre sadakat yemini",
  ],
};

/** Din Adamı'nın şehir yöneticisinden aldığı "açıklama yap" talepleri (Yap / Yapma). */
const DIN_ACIKLAMA_KALEMLERI: string[] = [
  "vergi artışını vaazda kutsal bir görev diye savun",
  "yöneticinin yeni savaş kararını ibadethanede meşrulaştır",
  "yöneticinin rakibini kürsüden kötüle",
  "yönetimin yeni yasasını halka kutsal göster",
];

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
  // Patron her meslekte farklı biri (ordu kumandanı, lonca reisi, başrahip, atölye
  // sahibi...) — gerekçeler mesleğe özgü kalıplar (lonca, grev) yerine herkese uyan
  // genel ifadeler olmalı; aksi halde bir askerin kumandanı "lonca sandığına katkı" istiyordu.
  patron: {
    bagis: [
      "ortak sandığa katkı",
      "patronunun borcunu kapatmak için pay",
      "ortak yatırım için sermaye",
      "patronun kızının çeyizine katkı",
      "zor geçen bir yılın açığını kapatmak için bağış",
    ],
    sadakat: [
      "patronuna bağlılık yemini",
      "rakiplerle iş yapmama sözü",
      "patronun adamlarını kollama taahhüdü",
    ],
  },
};

/** Rastgele bir yönetim (yönetici/patron) dayatılan bağış / sadakat talebi üretir. */
export function yonetimTalebiUret(state: CharacterState): YonetimTalep {
  // Tek otorite (§45): işletmeli mesleklerde talep şehir yöneticisinden, diğerlerinde patrondan gelir.
  const kimden: "yonetici" | "patron" = isletmeMeslegiMi(state.meslek) ? "yonetici" : "patron";
  const dinMi = state.meslek === "Din Adamı";
  const z = Math.random() * 100;
  const tur: "bagis" | "sadakat" | "aciklama" = dinMi
    ? z < DIN_TALEP_AGIRLIKLARI.aciklama ? "aciklama" : z < DIN_TALEP_AGIRLIKLARI.aciklama + DIN_TALEP_AGIRLIKLARI.bagis ? "bagis" : "sadakat"
    : Math.random() < 0.6 ? "bagis" : "sadakat";
  const enf = enflasyonCarpani(state);
  const servetEk = Math.max(0, Math.min(30, Math.round(gayrimenkulDegeriHesapla(state) * 0.04)));
  const tutar =
    tur === "bagis" ? paraYuvarla((14 + Math.floor(Math.random() * 32) + servetEk) * enf) : 0;
  const havuz = tur === "aciklama" ? DIN_ACIKLAMA_KALEMLERI : isletmeMeslegiMi(state.meslek) ? SEHIR_TALEP_KALEMLERI[tur] : YONETIM_TALEP_KALEMLERI[kimden][tur];
  return {
    id: randomUUID(),
    kimden,
    kimAdi: kimden === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad,
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
  if (isletmeMeslegiMi(state.meslek)) {
    // İşletmeli meslekler: şehir yöneticisi (tek otorite) ilişkisi şöhret aralıklarına göre çok az artar/azalır (§45).
    state.yonetim_iliski = clamp(state.yonetim_iliski + sohretOtoriteIliskisi(state.un) * yasArtisi, 0, 100);
  } else {
    const unItisi = Math.max(0, (state.un - 30) / 100) * 0.9 * yasArtisi;
    if (unItisi > 0) state.yonetim_iliski = Math.min(100, state.yonetim_iliski + unItisi);
  }
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
  // Ekstra vergi talebinin süresi yoktur: oyuncu yanıtlayana dek (zorunlu pencere) bekler.
  if (state.yonetim_talep && state.yonetim_talep.tur !== "vergi" && state.yil > state.yonetim_talep.sonYil) {
    const t = state.yonetim_talep;
    if (t.kimden === "yonetici") {
      state.yonetim_iliski = Math.max(0, state.yonetim_iliski - YONETIM_TALEP_SURESI_DOLMA_CEZA);
    } else {
      state.patron_iliski = Math.max(0, state.patron_iliski - YONETIM_TALEP_SURESI_DOLMA_CEZA);
    }
    state.mutluluk -= 4;
    const kimAdi = t.kimden === "yonetici" ? yoneticiBilgisi(state).ad : patronBilgisi(state).ad;
    not = T(state.dil, "{0}'in talebini görmezden geldin; aranız açıldı.", [kimAdi]);
    state.yonetim_talep = null;
  }

  // Ekstra vergi (işletmeli mesleklerde): 8-9 yılda bir, eşik üstü kârda yönetici kârın 2-3 katını ister.
  if (isletmeMeslegiMi(state.meslek) && state.isletme) {
    if (state.ekstra_vergi_sonraki_yil == null) {
      state.ekstra_vergi_sonraki_yil = ekstraVergiSonrakiYil(state.yil);
    } else if (
      !state.yonetim_talep &&
      state.yil >= state.ekstra_vergi_sonraki_yil &&
      !state.etiketler.includes("hapiste") &&
      !state.etiketler.includes("yolculukta")
    ) {
      const brutKar = state.isletme.son_dokum?.brutKar ?? 0;
      if (brutKar > EKSTRA_VERGI_KAR_ESIGI * enflasyonCarpani(state)) {
        const vergi: YonetimTalep = {
          id: randomUUID(),
          kimden: "yonetici",
          kimAdi: yoneticiBilgisi(state).ad,
          tur: "vergi",
          tutar: paraYuvarla(brutKar * ekstraVergiCarpani(state.yonetim_iliski)),
          kalem: "ekstra vergi",
          sonYil: EKSTRA_VERGI_SONSUZ_YIL,
        };
        state.yonetim_talep = vergi;
        state.ekstra_vergi_sonraki_yil = ekstraVergiSonrakiYil(state.yil);
        if (!not) {
          not = T(state.dil, "{0} senden bir şey bekliyor — Kariyer ekranından yanıtlayabilirsin.", [vergi.kimAdi]);
        }
      }
    }
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
export const PASIF_REGEN_TAVANI = 80;
const PASIF_REGEN_TAVAN_USTU_ORAN = 0.25;
/** Bu değerin ALTINDA hiç yumuşak tavan uygulanmaz: dipteki bir karakter iyi ev+sofra ile tam hızda toparlanabilsin. */
export const PASIF_REGEN_LIMITSIZ_ESIK = 45;

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
 * Sağlık → mutluluk çapraz etkisi (daraltıldı): sağlık yalnız CAPRAZ_SAGLIK_ESIGI'nin (10)
 * altına inip bu durumda ARDIŞIK CAPRAZ_ARDISIK_YIL (2) yıl kalırsa, her yıl mutluluk −1.
 * Eşiğin üstüne çıkılınca sayaç sıfırlanır. Mutluluk → sağlık yönü yoktur.
 * Çok yıllı turda her yıl ayrı sayılır (tur sonu sağlığına bakılır).
 */
export function capraletkiUygula(
  state: CharacterState,
  yasArtisi: number
): { saglikKaybi: number; mutlulukKaybi: number } {
  if (yasArtisi <= 0) return { saglikKaybi: 0, mutlulukKaybi: 0 };
  let mutlulukKaybi = 0;
  for (let i = 0; i < yasArtisi; i++) {
    if (state.saglik < CAPRAZ_SAGLIK_ESIGI) {
      state.saglik_kritik_yil_sayaci = (state.saglik_kritik_yil_sayaci ?? 0) + 1;
      if (state.saglik_kritik_yil_sayaci >= CAPRAZ_ARDISIK_YIL) {
        mutlulukKaybi += CAPRAZ_MUTLULUK_YILLIK;
      }
    } else {
      state.saglik_kritik_yil_sayaci = 0;
    }
  }
  if (mutlulukKaybi > 0) state.mutluluk = Math.max(0, state.mutluluk - mutlulukKaybi);
  return { saglikKaybi: 0, mutlulukKaybi };
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
      // Başka bir kilit "hapiste"yi devralırsa (ör. firari "kacak" olur) ceza sayaçları bayat
      // kalmasın: sonraki tutuklamada `hapis_ceza_kalan <= 0` koşulu sağlanıp ceza yeniden hesaplansın.
      if (etiket !== "hapiste" && state.etiketler.includes("hapiste")) {
        state.hapis_ceza_kalan = 0;
        state.hapis_ceza_toplam = 0;
        state.hapis_tur_sayaci = 0;
      }
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
const HAPIS_AGIR_CEZA_ESIGI_YIL = 9;
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

/**
 * Olayların `ulke_etkisi`'ni uygular. Faz A kuralları korunur:
 * - `ekonomi` artık dönemden türetilir; olayın ekonomi etkisi dönemi değiştirmez,
 *   yalnız kalan süresini ±1 yıl kaydırır (iyi → bolluk uzar / diğerleri kısalır).
 * - Savaş ve veba aynı anda olmaz: biri sürerken öbürünü başlatan etki yok sayılır.
 * - Savaş başlarken bolluk sürüyorsa bolluk biter.
 */
export function ulkeGuncelle(state: CharacterState, etki?: Partial<CharacterState["ulke"]>): void {
  if (!etki) return;
  const { ekonomi, ...geri } = etki;
  if (geri.savasta === true && state.ulke.vebada) delete geri.savasta;
  if (geri.vebada === true && state.ulke.savasta) delete geri.vebada;
  const savasBasliyor = geri.savasta === true && !state.ulke.savasta;
  Object.assign(state.ulke, geri);
  const donem = state.ulke.donem;
  if (ekonomi && donem) {
    const lehte = (ekonomi === "iyi") === (donem.tur === "bolluk");
    donem.bitisYili = Math.max(state.yil + 1, donem.bitisYili + (lehte ? 1 : -1));
    state.ulke.ekonomi = ekonomiFromDonem(donem.tur);
  } else if (ekonomi) {
    state.ulke.ekonomi = ekonomi;
  }
  if (savasBasliyor) bollukSavasIleBiter(state);
}

export function durumEkle(state: CharacterState, yeniDurum?: CharacterState["durumlar"][number]): void {
  if (!yeniDurum) return;
  state.durumlar = state.durumlar.filter((d) => d.id !== yeniDurum.id);
  state.durumlar.push({ ...yeniDurum });
}

/** Durumların yıllık etkilerini geçen yıl sayısı kadar uygular ve süreleri (yıl) düşürür. */
export function durumlariUygula(state: CharacterState, yasArtisi = 1): IkiDilMetin | null {
  let olumculDurum: IkiDilMetin | null = null;

  for (const durum of state.durumlar) {
    if (durum.yil_basi_saglik) {
      state.saglik += durum.yil_basi_saglik * yasArtisi;
      if (state.saglik <= 0 && !olumculDurum) {
        olumculDurum = {
          tr: T("tr", "{0} yüzünden hayatını kaybetti.", [durum.ad]),
          en: T("en", "{0} yüzünden hayatını kaybetti.", [K("en", durum.ad)]),
        };
      }
    }
    if (durum.yil_basi_para) {
      state.para += durum.yil_basi_para * yasArtisi;
    }
    if (durum.yil_basi_mutluluk) {
      state.mutluluk += durum.yil_basi_mutluluk * yasArtisi;
    }
    if (durum.tur === "gecici" && durum.kalan_yil !== undefined) {
      durum.kalan_yil -= yasArtisi;
      if (durum.kalan_yil <= 0 && durum.bitince_etiket) {
        etiketEkle(state, [durum.bitince_etiket]);
      }
    }
  }

  state.durumlar = state.durumlar.filter((d) => d.tur === "kalici" || (d.kalan_yil ?? 0) > 0);
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

/** Yaşayan hayvan sayısı (eski tek-alan `evcil_hayvan` ile kurulmuş durumlar için de güvenli). */
function evcilHayvanSayisi(state: CharacterState): number {
  return Math.max((state.evcil_hayvanlar ?? []).length, state.evcil_hayvan ? 1 : 0);
}

/** Karakterin yerleşimine göre yaşam giderine uygulanan çarpanı döner (en fazla ±%2). */
function yasamMaliyetCarpaniGetir(state: CharacterState): number {
  const yerlesim = yerlesimGetir(yerlesimIdByAd(state.yerlesim));
  return yerlesim?.yasamMaliyetCarpani ?? 1;
}

/** Bir sonraki turun gider dökümünü, gerçekte uygulamadan hesaplar; Finans ekranı bunu kullanır. */
export function giderKalemleriHesapla(state: CharacterState): GiderKalemleri {
  const enflasyon = giderEnflasyonCarpani(state);
  const yasamSecenegi = yasamSecenegiGetir(state.yasam_secimi_id);
  // Yaşam gideri dönemle (bolluk −, durgunluk +, kıtlık ++) ve savaşla (gıda pahalanır) çarpılır.
  const donemCarpani = state.ulke.donem?.etki.yasamGideri ?? 1;
  const savasGidaCarpani = state.buyuk_savas ? state.buyuk_savas.gidaCarpani : 1;
  return {
    yasam: paraYuvarla(
      (yasamSecenegi?.maliyetYillik ?? 0) * yasamMaliyetCarpaniGetir(state) * donemCarpani * savasGidaCarpani * enflasyon
    ),
    konut: paraYuvarla((konutGetir(state.konut_id)?.kiraYillik ?? 0) * enflasyon),
    ekip: state.ekip.reduce((toplam, uye) => toplam + uye.maas, 0),
    evcilHayvan: evcilHayvanSayisi(state) > 0 ? paraYuvarla(EVCIL_HAYVAN_GIDERI_YILLIK * enflasyon * evcilHayvanSayisi(state)) : 0,
    // İşletmeli mesleklerde savaş vergisi yıllık vergi oranının içindedir (isletme.ts vergiOrani); çifte kesinti olmasın.
    savasVergisi: state.buyuk_savas && !isletmeAktif(state) ? paraYuvarla(hesaplaMaasYillik(state) * state.buyuk_savas.vergiOrani) : 0,
  };
}

export function pasifEkonomiUygula(state: CharacterState, yasArtisi: number): EkonomiSonucu {
  // Çalışan maaşları her yıl güncel enflasyonla yenilenir (giriş seviyesine göre sabit taban × enflasyon).
  if (isletmeAktif(state)) calisanMaaslariniGuncelle(state, giderEnflasyonCarpani(state));
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
  const isletmeVar = isletmeAktif(state);
  for (let i = 0; i < yasArtisi; i++) {
    if (isletmeVar) {
      // v20: otomatik depo — açıksa yıl başında seçilen yüzdeye para yettiği kadar dolar. Çok yıllık turda
      // ikinci yıldan itibaren önceki yılların net nakdi de eldeki para sayılır (para sonda toplu işlendiği için geçici eklenir).
      const paraYedek = state.para;
      state.para = paraYuvarla(paraYedek + netGelir);
      const oto = otomatikDepoDoldur(state, isletmeBaglami(state));
      const harcanan = oto ? oto.maliyet : 0;
      state.para = paraYedek;
      netGelir -= harcanan;
      // İşletme: gelir = o yılın satış − alım − depo kârı (eksi olabilir), maaş formülü yok.
      const sonuc = isletmeYilIsle(state, isletmeBaglami(state));
      yillikGelirler.push(sonuc.net);
      netGelir += sonuc.net + sonuc.onOdenenAlim - gider;
      continue;
    }
    const dalga = 0.85 + Math.random() * 0.3; // 0.85x - 1.15x (büyük denge turu: kullanıcı isteğiyle bant 0.85–1.15)
    const oYilkiGelir = Math.max(0, paraYuvarla(state.maas_yillik * dalga));
    yillikGelirler.push(oYilkiGelir);
    netGelir += oYilkiGelir - gider;
  }
  if (isletmeVar) state.maas_yillik = hesaplaMaasYillik(state);
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
  gencSaglikToparlanmasi(state, yasArtisi);
  if (mutlulukPasif) state.mutluluk += pasifRegenEtkisi(state.mutluluk, mutlulukPasif);
  // Konut + yaşam tarzının ün etkisi (yumuşak tavana tabi değil; hem gösteriş
  // primi hem de bakımsız/aç bir hayatın itibar aşınması buradan işler).
  const unPasif = (konut?.unEtkisiYillik ?? 0) * yasArtisi + (yasamSecenegi?.unEtkisiYillik ?? 0) * yasArtisi;
  if (unPasif) state.un += unPasif;
  // Yüksek şöhret kendiliğinden söner (60-75 hafif, 75 üstü daha hızlı); ayakta tutmak ev/yemek düzeni,
  // olaylar ve mağaza (sanat) gibi kaynaklara bağlı.
  const sohretErimesi = sohretErimesiYillik(state.un);
  if (sohretErimesi) state.un -= sohretErimesi * yasArtisi;

  // Meslek, olay dışı geçen yıllarda da sessizce iz bırakır: din adamının cemaat
  // içindeki saygınlığı yıllar içinde birikir; tüccarınkiyse ticaretin gidişatına
  // bağlıdır — bereketli/kazançlı yıllar ahlakı aşındırır, zor/zararlı yıllar sınar
  // ve güçlendirir. Küçük bir sürüklenme; olayların etkisini domine etmez.
  if (state.meslek === "Din Adamı") {
    state.un += 0.4 * yasArtisi;
  } else if (state.meslek === "Tüccar") {
    state.ahlak += (netGelir >= 0 ? -0.4 : 0.4) * yasArtisi;
  }

  // v10: doğuşta atanan iki kişilik özelliğinin çok küçük yıllık ahlak/şöhret/mutluluk sürüklenmesi.
  for (const ozellikAdi of state.kisilik) {
    const e = kisilikGetir(ozellikAdi)?.yillikEtki;
    if (!e) continue;
    state.ahlak += (e.ahlak ?? 0) * yasArtisi;
    state.un += (e.sohret ?? 0) * yasArtisi;
    state.mutluluk += (e.mutluluk ?? 0) * yasArtisi;
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
    // v11: borç sağlığı düşürmez, yalnız moral yıpratır.
    state.mutluluk -= 1 * yasArtisi;
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
  const surenHastalik = state.durumlar.find((d) => d.tur === "gecici" && (d.yil_basi_saglik ?? 0) < 0);

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

const SANS_OLAYI_IHTIMALI = 0.12;

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
 * - tikPuanı     = 3.000 × (sarayda + gizemli eşya sahipliği) — yolculuk artık burada
 *   değil, yalnız aşağıdaki +2.000 tamamlama bonusuyla sayılır (çifte sayılıyordu).
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
 * boyunca en fazla bir kez true'ya döner, bkz. gameEngine.ts). Büyük yolculuğu
 * başarıyla tamamlamak YALNIZ buradaki +2000 ile ödüllendirilir (2026-10: eskiden
 * ayrıca tikPuani'na +3000 olarak da giriyordu — aynı başarı iki kez sayılıyordu).
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
  const servet = netServetHesapla(state);
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
  const tikSayisi = (sarayda ? 1 : 0) + (gizemliEsyaSahibi ? 1 : 0);
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

// ---------------------------------------------------------------------------
// Dünya dönemleri (Faz A, data/dunyaDonemleri.ts)
// ---------------------------------------------------------------------------

/** Şu an kıtlık var mı: genel dönem kıtlık YA DA olayla başlamış yerel bir kıtlık krizi. */
export function kitlikVar(ulke: UlkeDurumu): boolean {
  return ulke.donem?.tur === "kitlik" || ulke.kriz?.tur === "kitlik";
}

function yeniDonem(tur: DonemTuru, baslangicYili: number, sureYil?: number, sonraki?: DonemTuru): DonemDurumu {
  const sure = sureYil ?? sureZarla(DONEM_SURE[tur]);
  return {
    tur,
    baslangicYili,
    bitisYili: baslangicYili + sure,
    // Dedikodu için önceden belirlenen sıradaki dönem (torba, v10); verilmezse torbadan türetilmemiş ilk tahmin.
    sonraki: sonraki ?? ilkDonemTorbasi(tur)[0],
    etki: donemEtkisiZarla(tur),
  };
}

/** Yeni karakter / eski kayıt için ilk dönem: rastgele tür, kalan süre rastgele (1..tam süre). */
export function ilkDonemOlustur(yil: number, tur?: DonemTuru): DonemDurumu {
  const secilen = tur ?? DONEM_TURLERI[Math.floor(Math.random() * DONEM_TURLERI.length)];
  const tamSure = sureZarla(DONEM_SURE[secilen]);
  const kalan = 1 + Math.floor(Math.random() * tamSure);
  const donem = yeniDonem(secilen, yil, kalan);
  return donem;
}

const DONEM_BASLANGIC_MESAJI: Record<DonemTuru, string> = {
  bolluk: "🌾 Bolluk yılları başladı: ambarlar dolu, pazarlar canlı, lüks mallara talep arttı.",
  durgunluk: "📉 Durgunluk çöktü: pazarlar sessiz, kese ağızları sıkı bağlı.",
  kitlik: "🥀 Kıtlık başladı: ekmek pahalandı, ambarlar boşalıyor.",
};

/** Dönemi bir sonrakine geçirir (savaş sürerken bolluk gelmez); başlangıç mesajını döner. */
function donemGecir(state: CharacterState, baslangicYili: number): string {
  const onceki = state.ulke.donem!;
  // Dönem torbası (v10): eski kayıt / ilk geçişte torba yoksa sıradaki tahmin + diğer dönemden kurulur.
  if (!state.ulke.donem_torbasi) {
    state.ulke.donem_torbasi = [onceki.sonraki, ...DONEM_TURLERI.filter((t) => t !== onceki.tur && t !== onceki.sonraki)].filter((t) => t !== onceki.tur);
  }
  const cekilen = donemTorbasindanCek(state.ulke.donem_torbasi, onceki.tur, state.ulke.savasta);
  const tur = cekilen.tur;
  state.ulke.donem_torbasi = cekilen.torba;
  state.ulke.donem = yeniDonem(tur, baslangicYili, undefined, donemTorbasiniGoster(state.ulke.donem_torbasi, tur, state.ulke.savasta));
  state.ulke.ekonomi = ekonomiFromDonem(tur);
  return T(state.dil, DONEM_BASLANGIC_MESAJI[tur]);
}

/** Savaş başlarken bolluk sürüyorsa bolluk o yıl biter (bollukta savaş olmaz). */
function bollukSavasIleBiter(state: CharacterState): string | null {
  if (state.ulke.donem?.tur !== "bolluk") return null;
  return donemGecir(state, state.yil);
}

/**
 * Turda geçen yılları sırayla işler: süresi dolan dönemleri değiştirir, kıtlık
 * yıllarında sağlık düşürür, `ulke.ekonomi`'yi dönemden yeniden türetir. Hapiste/
 * yolculukta da işler (dünya oyuncuyu beklemez). Mesajları döner.
 */
export function donemIlerlet(state: CharacterState, yasArtisi: number): string[] {
  const mesajlar: string[] = [];
  if (!state.ulke.donem) state.ulke.donem = ilkDonemOlustur(state.yil);
  const ilkYil = state.yil - Math.max(0, yasArtisi);
  for (let y = ilkYil; y < state.yil; y++) {
    while (state.ulke.donem.bitisYili <= y) mesajlar.push(donemGecir(state, state.ulke.donem.bitisYili));
  }
  while (state.ulke.donem.bitisYili <= state.yil) mesajlar.push(donemGecir(state, state.ulke.donem.bitisYili));
  state.ulke.ekonomi = ekonomiFromDonem(state.ulke.donem.tur);
  return mesajlar;
}

export const KRIZ_ETKI: Record<UlkeKrizi["tur"], { saglik?: number; para?: number; un?: number; mutluluk?: number }> = {
  kitlik: {}, // v11: kıtlık sağlık götürmez (etkisi yaşam gideri / fiyat / talepte)
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
    ulkeGecmisiEkle(state, "kriz_bitti", state.yil, kriz.tur);
    state.ulke.kriz = null;
    return mesaj;
  }
  return null;
}

// Aranma pasif düşüşü (2026-10, kullanıcı isteği): aranmayı artıran son olaydan
// (son_suc_yili) itibaren SUC_TEMIZ_YIL (5) yıl temiz kalan karakter, 6. yıldan
// itibaren yılda SUC_SEVIYESI_PASIF_AZALMA_YILLIK (1) puan "unutulur". Her yeni
// aranma artışı (suç sınıfı, karanlık iş, kumar, kral reddi, karaborsa) sayacı
// sıfırlar — bkz. sucArtisiKaydet. Kefaret/rüşvet şıkları ve büyük baskının
// suc_seviyesi_ayarla'sı ayrı düşüş yolları olarak aynen kalır.
export const SUC_SEVIYESI_PASIF_AZALMA_YILLIK = 1;
export const SUC_TEMIZ_YIL = 5;

/** Aranmayı artıran bir olay oldu: 5 yıllık temizlik sayacını bu yıldan yeniden başlatır. */
export function sucArtisiKaydet(state: CharacterState): void {
  state.son_suc_yili = state.yil;
}

/** Şu an kaç yıldır temiz (son aranma artışından beri geçen oyun yılı). */
export function sucTemizYilSayisi(state: CharacterState): number {
  return Math.max(0, state.yil - (state.son_suc_yili ?? state.yil));
}

export function sucSeviyesiUygula(state: CharacterState, yasArtisi: number): void {
  if (yasArtisi <= 0) return;
  // temiz = tur sonundaki temiz yıl sayısı; ilk SUC_TEMIZ_YIL yıl düşüş yok, sonrası
  // turun içinde kalan yıllar kadar (en fazla yasArtisi) düşer.
  const dusecekYil = Math.max(0, Math.min(yasArtisi, sucTemizYilSayisi(state) - SUC_TEMIZ_YIL));
  if (dusecekYil <= 0) return;
  state.suc_seviyesi = Math.max(0, state.suc_seviyesi - SUC_SEVIYESI_PASIF_AZALMA_YILLIK * dusecekYil);
}

// ---------------------------------------------------------------------------
// Dünya olayları: büyük savaş / veba — hepsi arka planda
// (olay ekranı olmadan) tetiklenen, turdaki HER yıl için ayrı ayrı kontrol
// edilen periyodik mekanikler (bkz. CLAUDE.md §27).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Zenginlik sızıntısı: net servet ≥ 350 VE nakit ≥ 50 iken, 6 yıl cooldown
// sonrası her yıl %20 ihtimalle hırsız/haraç/dolandırıcı vb. bir olay
// karakterin NAKİT'inden pay alır. Bu, "zengin görünmenin" gündelik bedeli — küçük, sık,
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
    if (Math.random() >= ZENGINLIK_SIZINTI_YILLIK_IHTIMAL * (hayvanBonusVar(state, "kopek_savunma") ? 0.75 : 1)) continue;
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
    if (Math.random() >= RAKIP_SOYGUN_YILLIK_IHTIMAL * (hayvanBonusVar(state, "kopek_savunma") ? 0.75 : 1)) continue;
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

export interface RakipGucKirSonucu {
  /** Rakipten alınan müşteri sayısı (oyuncunun payına/küçüklere geçen toplam). */
  kirilan: number;
  pazarPayi: number;
  kariyerKazanci: number;
  yenildiMi: boolean;
  mesaj: string;
}

/**
 * Bir rakibin müşterisinin `yuzde` (kesir) kadarını alır. Alınanın %30'u doğrudan oyuncuya
 * geçer, kalanı oyuncu + küçük esnaf arasında büyüklükleriyle orantılı dağılır (game/piyasa.ts).
 * Ayrıca para += alınan × 0.14 × enflasyon, kariyer_puani += 2..6. Rakibin payı %4'ün altına
 * inince "yenildi" (tek seferlik büyük kariyer + ün bonusu). Her çağrı rakibin husumetini
 * artırır (misilleme riski).
 */
export function rakipMusteriKir(
  state: CharacterState,
  rakipAd: string,
  yuzde: number,
  enflasyon: number
): RakipGucKirSonucu | null {
  const rakip = state.rakipler.find((r) => r.ad === rakipAd && !r.yenildi);
  if (!rakip) return null;
  const kirilan = rakiptenMusteriAl(state, rakipAd, Math.min(1, yuzde * (hayvanBonusVar(state, "sahin_saldiri") ? 1.25 : 1)), RAKIP_KIRMA_DOGRUDAN);
  rakip.husumet = Math.min(100, rakip.husumet + 10 + Math.floor(Math.random() * 11)); // +10..20

  const pazarPayi = Math.max(1, paraYuvarla(kirilan * 0.14 * enflasyon));
  const kariyerKazanci = Math.round(Math.min(6, 2 + (yuzde / 0.45) * 4)); // %45 kırılırsa ~+6
  state.para = paraYuvarla(state.para + pazarPayi);
  state.kariyer_puani += kariyerKazanci;

  let yenildiMi = false;
  if (rakipYenildiKontrol(state, false)) {
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

// ---------------------------------------------------------------------------
// Meslek pazarı (data/pazar.ts + game/piyasa.ts): müşteri sayıları → pazar payı.
// ---------------------------------------------------------------------------

/** Oyuncunun müşterisini değiştirir (diğer gruplardan orantılı). Meslek seçilmemişse etkisiz. */
export function musteriEkle(state: CharacterState, delta: number): void {
  if (!pazarAdlariGetir(state.meslek) || !delta) return;
  musteriKaydir(state, "oyuncu", delta);
}

/**
 * Yıllık pazar akışı: pazar payına orantılı kariyer puanı + piyasa akışı (pazardan uzak kalma kaybı,
 * rakip ve küçük esnaf hareketleri, haberler, yeni rakip girişi — game/piyasa.ts).
 * Bir anlatı cümlesi döndürebilir.
 */
export function pazarYillikUygula(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || !pazarAdlariGetir(state.meslek)) return null;
  const mesaj = piyasaYillikUygula(state, yasArtisi);
  state.kariyer_puani += pazarPayiHesapla(state) * PAZAR_KARIYER_PUANI_YILLIK * yasArtisi;
  return mesaj;
}

/** Yıllık: rakiplerin husumeti yavaşça soğur (müşteri hareketi piyasaYillikUygula'da). */
export function rakiplerGuncelle(state: CharacterState, yasArtisi: number): void {
  if (yasArtisi <= 0) return;
  for (const r of state.rakipler) {
    if (r.yenildi) continue;
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
  // İşletmeli mesleklerde rakip saldırıları pazar payı eşiklerine bağlı yeni mekanikte (isletme.ts isletmeYilIsle).
  if (isletmeMeslegiMi(state.meslek)) return null;
  if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta")) return null;
  for (let i = 0; i < yasArtisi; i++) {
    const adaylar = state.rakipler.filter((r) => !r.yenildi && r.husumet >= 55);
    if (adaylar.length === 0) return null;
    const rakip = adaylar[Math.floor(Math.random() * adaylar.length)];
    // Köpek (savunma) ve Karga (istihbarat, komployu önceden sezme) pasif bonusları misilleme ihtimalini düşürür.
    const misillemeCarpani = (hayvanBonusVar(state, "kopek_savunma") ? 0.75 : 1) * (hayvanBonusVar(state, "karga_istihbarat") ? 0.7 : 1);
    if (Math.random() >= (rakip.husumet / 320) * misillemeCarpani) continue;
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

export const KREDI_MIN_TUTAR_TABAN = 20;
export const KREDI_MAKS_TUTAR_TABAN = 200;

/** Tefecinin sunduğu bir teklif: tutar (enflasyonlu), yıllık faiz, vade (yıl) ve eşit yıllık taksit. */
export interface KrediTeklifi {
  id: string;
  ad: { tr: string; en: string };
  tutar: number;
  faiz: number;
  vade: number;
  taksit: number;
}

/** Oyuncunun şu an alabileceği en yüksek kredi (maaşa + mevcut borç yokluğuna + enflasyona bağlı). */
export function krediMaksTutar(state: CharacterState): number {
  if (state.kredi) return 0;
  const maas = state.maas_yillik || hesaplaMaasYillik(state);
  // ~6 yıllık maaş kadar, enflasyonla ölçekli tavanla; suç seviyesi yüksekse tefeci daha az verir.
  const sucKesinti = state.suc_seviyesi >= 60 ? 0.5 : state.suc_seviyesi >= 40 ? 0.75 : 1;
  const tavan = KREDI_MAKS_TUTAR_TABAN * enflasyonCarpani(state);
  return Math.max(0, Math.min(tavan, Math.round(maas * 6 * sucKesinti)));
}

/** Tefecinin güvensizlik primi: yalnız borçluysan (para < 0) havuz faizine +4 puan biner. */
export function krediFaizEki(state: CharacterState): number {
  return state.para < 0 ? 0.04 : 0;
}

function krediTeklifiKur(state: CharacterState, tanim: KrediHavuzTanimi, maks: number): KrediTeklifi | null {
  const min = Math.max(1, Math.round(KREDI_MIN_TUTAR_TABAN * enflasyonCarpani(state)));
  const tutar = Math.min(maks, Math.round(tanim.tutar * enflasyonCarpani(state)));
  if (tutar < min) return null;
  const faiz = Math.round((tanim.faiz + krediFaizEki(state)) * 100) / 100;
  const taksit = Math.max(2, Math.ceil(annuiteTaksit(tutar, faiz, tanim.vade)));
  return { id: tanim.id, ad: tanim.ad, tutar, faiz, vade: tanim.vade, taksit };
}

/**
 * Tefecinin şu anki iki teklifi. Havuzdan rastgele iki farklı teklif seçilir, 3 yıl (ya da kredi alınana
 * dek) sabit kalır; tutarlar enflasyonla büyür, mevcut kredi tavanına kırpılır. Aktif kredi varken boş döner.
 */
export function krediTeklifleri(state: CharacterState): KrediTeklifi[] {
  const maks = krediMaksTutar(state);
  if (maks <= 0) return [];
  const t = state.kredi_teklifleri;
  if (!t || state.yil - t.yil >= KREDI_TEKLIF_YENILEME_YIL || t.idler.some((id) => !krediHavuzTanimi(id))) {
    const idler = [...KREDI_HAVUZU].sort(() => Math.random() - 0.5).slice(0, KREDI_TEKLIF_SAYISI).map((k) => k.id);
    state.kredi_teklifleri = { idler, yil: state.yil };
  }
  const teklifler: KrediTeklifi[] = [];
  for (const id of state.kredi_teklifleri!.idler) {
    const tanim = krediHavuzTanimi(id);
    const teklif = tanim ? krediTeklifiKur(state, tanim, maks) : null;
    if (teklif) teklifler.push(teklif);
  }
  return teklifler;
}

export function krediAl(state: CharacterState, teklifId: string): string {
  if (state.kredi) throw new Error("Zaten ödenmemiş bir kredin var.");
  const teklif = krediTeklifleri(state).find((x) => x.id === teklifId);
  if (!teklif) throw new Error("Tefeci böyle bir teklif sunmuyor.");
  state.kredi = {
    anapara: teklif.tutar,
    kalanBorc: teklif.tutar,
    faizOrani: teklif.faiz,
    yillikTaksit: teklif.taksit,
    vadeYil: teklif.vade,
    alindigiYil: state.yil,
    odenmeyenTaksit: 0,
    pazarlikYapildi: false,
  };
  state.kredi_teklifleri = null; // bir sonraki sefer yeni teklifler çıksın
  state.para = paraYuvarla(state.para + teklif.tutar);
  hayatOlayiEkle(state, "🪙", T(state.dil, "Tefeciden {0} {birim} borç aldı", [teklif.tutar]).replace(/\{birim\}/g, state.para_birimi));
  return T(state.dil, "Tefeci kesesini açtı: +{0} {birim}. Faiz %{1}, {2} yıl vade, yıllık taksit ~{3}.", [
    teklif.tutar,
    Math.round(teklif.faiz * 100),
    teklif.vade,
    teklif.taksit,
  ]).replace(/\{birim\}/g, state.para_birimi);
}

export function krediPazarlik(state: CharacterState): string {
  if (!state.kredi) throw new Error("Ortada bir kredi yok.");
  if (state.kredi.pazarlikYapildi) throw new Error("Bu kredi için zaten pazarlık ettin.");
  const k = state.kredi;
  k.pazarlikYapildi = true;
  const kalanYil = Math.max(1, (k.vadeYil ?? 6) - (state.yil - k.alindigiYil));
  const sans = Math.min(40, Math.max(25, 25 + (state.un - 20) / 8 + (state.ahlak - 50) / 16)); // ~%25-40
  if (Math.random() * 100 < sans) {
    k.faizOrani = Math.max(0.05, Math.round((k.faizOrani - 0.04) * 100) / 100);
    k.yillikTaksit = Math.max(2, Math.ceil(annuiteTaksit(k.kalanBorc, k.faizOrani, kalanYil)));
    return T(state.dil, "Tefeci homurdandı ama faizi %{0}'e indirdi.", [Math.round(k.faizOrani * 100)]);
  }
  k.faizOrani = Math.min(0.30, Math.round((k.faizOrani + 0.05) * 100) / 100);
  k.yillikTaksit = Math.max(2, Math.ceil(annuiteTaksit(k.kalanBorc, k.faizOrani, kalanYil)));
  return T(state.dil, "Pazarlık ters tepti; tefeci faizi %{0}'e çıkardı.", [Math.round(k.faizOrani * 100)]);
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

/**
 * Rastgele büyük savaş (Faz A): bollukta başlamaz, veba sürerken başlamaz; son
 * savaşın bitişinden 6 yıl sonra durgunluk/kıtlıkta yılda %18. Zar tutunca savaş
 * hemen değil bir yıl sonra başlar (`dunya_yaklasan`) — dedikodu önceden haber
 * versin diye. Tarihi savaş ilanı (senaryoUret) aynı `ulke.savasta` alanını kullanır.
 */
export function buyukSavasKontrolEt(state: CharacterState, yasArtisi: number): string | null {
  if (yasArtisi <= 0 || state.ulke.savasta) return null;
  const yaklasan = state.dunya_yaklasan;
  if (yaklasan?.tur === "savas") {
    if (state.yil < yaklasan.yil) return null;
    state.dunya_yaklasan = null;
    if (state.ulke.vebada) return null; // veba araya girdi: savaş çıkmadı
    return buyukSavasBaslat(state, yaklasan.dusman ?? komsuGucSec(state.bolge));
  }
  if (yaklasan || state.ulke.vebada || state.veba?.aktif) return null;
  if (state.ulke.donem?.tur === "bolluk") return null;
  const taban = state.son_buyuk_savas_bitis_yili ?? state.baslangic_yili;
  if (state.yil - taban < SAVAS_COOLDOWN_YIL) return null;
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() >= SAVAS_YILLIK_IHTIMAL) continue;
    const dusman = tarihiSavasKontrol(state.bolge, state.yil, state.cag) ?? komsuGucSec(state.bolge);
    state.dunya_yaklasan = { tur: "savas", yil: state.yil + 1, dusman };
    return null;
  }
  return null;
}

function buyukSavasBaslat(state: CharacterState, dusman: string): string {
  const sureYil = sureZarla(SAVAS_SURE);
  const etki = savasEtkisiZarla();
  state.buyuk_savas = {
    dusman,
    baslangicYili: state.yil,
    bitisYili: state.yil + sureYil,
    vergiOrani: savasVergisiZarla(),
    gidaCarpani: etki.yasamGideri,
    etki,
  };
  state.ulke.savasta = true;
  ulkeGecmisiEkle(state, "savas_basladi", state.yil, dusman);
  const mesajlar = [T(state.dil, "⚔️ {0} ile aranızdaki gerginlik büyük bir savaşa dönüştü.", [K(state.dil, dusman)])];
  const bollukBitti = bollukSavasIleBiter(state);
  if (bollukBitti) mesajlar.push(bollukBitti);
  return mesajlar.join(" ");
}

/** Aktif büyük savaşın süresi dolduysa sona erdirir; mesaj döner ve bekleme süresini başlatır. */
export function buyukSavasBitisKontrolEt(state: CharacterState): string | null {
  if (!state.buyuk_savas || state.yil < state.buyuk_savas.bitisYili) return null;
  const dusman = state.buyuk_savas.dusman;
  state.ulke.savasta = false;
  state.son_buyuk_savas_bitis_yili = state.yil;
  ulkeGecmisiEkle(state, "savas_bitti", state.yil, dusman);
  state.buyuk_savas = null;
  return T(state.dil, "🕊️ {0} ile sürdürülen savaş sona erdi, barış geri döndü.", [K(state.dil, dusman)]);
}


/**
 * Vebanın zamanı geldi mi (v10): bir ömürde TAM BİR veba; oyunun ilk 12 yılında çıkmaz, sonra yılda %5;
 * 50 yaşına kadar çıkmadıysa zorla; savaş sürerken başlamaz. Zar tutunca dalga bir yıl sonra gelir
 * (`dunya_yaklasan`, dedikodu sinyali); o yıl gelince true döner ve gameEngine
 * başlangıç olayını zorlar.
 */
export function vebaBaslamaliMi(state: CharacterState, yasArtisi: number): boolean {
  if (yasArtisi <= 0 || state.veba || state.ulke.vebada) return false;
  // v10: veba bir ömürde TAM BİR kez çıkar; vebası geçmiş karakter bir daha veba görmez.
  if (state.veba_gecirdi) return false;
  const yaklasan = state.dunya_yaklasan;
  if (yaklasan?.tur === "veba") {
    if (state.yil < yaklasan.yil) return false;
    // Hapis/yolculuk/kaçak bir havuz kilididir: veba başlangıcı zorlanırsa kilit sessizce silinirdi — sinyal korunur, bekle.
    if (state.etiketler.includes("hapiste") || state.etiketler.includes("yolculukta") || state.etiketler.includes("kacak")) return false;
    state.dunya_yaklasan = null;
    return !state.ulke.savasta;
  }
  if (yaklasan || state.ulke.savasta) return false;
  // Oyunun (karakter yaratılışından itibaren) ilk VEBA_ILK_YIL_YOK yılında veba çıkmaz.
  if (state.yil - (state.baslangic_yili ?? state.yil) < VEBA_ILK_YIL_YOK) return false;
  // VEBA_ZORUNLU_YAS'a kadar hiç görmediyse zar atmadan sinyali kur (50'de zorla).
  if (state.yas >= VEBA_ZORUNLU_YAS) {
    state.dunya_yaklasan = { tur: "veba", yil: state.yil + 1 };
    return false;
  }
  // `kacak` da bir havuz kilididir: kaçak karaktere veba başlangıcı zorlanırsa (etiketEkle'nin
  // "yeni kilit kazanır" kuralı yüzünden) kaçak durumu sessizce silinirdi — bekle.
  if (
    state.etiketler.includes("hapiste") ||
    state.etiketler.includes("yolculukta") ||
    state.etiketler.includes("kacak")
  ) {
    return false;
  }
  for (let i = 0; i < yasArtisi; i++) {
    if (Math.random() < VEBA_YILLIK_IHTIMAL) {
      state.dunya_yaklasan = { tur: "veba", yil: state.yil + 1 };
      return false;
    }
  }
  return false;
}

/** Veba olayı çözüldükten sonra (gameEngine.ts'te ulke_etkisi.vebada true tespit edilince) çağrılır; süre/çarpan parametrelerini rastgele belirler. `korumaSeviyesi`: 0=hiç, 1=kısmi, 2=tam. */
export function vebaBaslat(state: CharacterState, korumaSeviyesi = 0): void {
  const sureYil = sureZarla(VEBA_SURE);
  // Salgından ÖNCE yapılmış kalıcı korunma yatırımı (§ "salgın korunma") ile
  // olayda seçilen korunmanın MAX'ı kullanılır; yatırım bu dalgada tüketilir.
  const yatirimKademe = state.salgin_korunma_yatirimi?.kademe ?? 0;
  const etkinKoruma = Math.max(Math.round(korumaSeviyesi), yatirimKademe);
  state.salgin_korunma_yatirimi = null;
  const etki = vebaEtkisiZarla();
  state.veba = {
    aktif: true,
    baslangicYili: state.yil,
    bitisYili: state.yil + sureYil,
    // Faz A: ayrı "iz" fazı yok — etkiler salgınla birlikte biter.
    etkiBitisYili: state.yil + sureYil,
    konutKiraCarpani: 1,
    gelirCarpani: etki.maas,
    korumaSeviyesi: Math.max(0, Math.min(2, etkinKoruma)),
    etki,
  };
  state.veba_gecirdi = true;
  ulkeGecmisiEkle(state, "veba_basladi", state.yil);
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
const VEBA_KAPMA_KADEME = [0.208, 0.076, 0.033]; // [hiç, kısmi, tam koruma] — karakterin hastalığı kapma ihtimali/yıl (salgın boyunca ≈ %65 / %30 / %14)
const VEBA_ES_KAYIP_KADEME = [0.086, 0.053, 0.027];
const VEBA_COCUK_KAYIP_KADEME = [0.077, 0.048, 0.024];

/** Vebayı yeni kapan bir karakterin başlangıç ölüm olasılığı (%): ölüm %55 · yaralı %30 · sağlıklı %15. Hastalık olayının seçimi bunu kaydırır. */
const VEBA_BASLANGIC_OLUM_RISKI = 55;
/** Yakalanma anında anında kaybedilen can, yaralı atlatmada ek kayıp, sağlıklı atlatmada kazanç. */
const VEBA_YAKALANMA_CAN_KAYBI: [number, number] = [25, 28];
const VEBA_YARALI_CAN_KAYBI: [number, number] = [20, 22];
const VEBA_SAGLIKLI_CAN_KAZANCI: [number, number] = [5, 9];
const vebaAralik = ([a, b]: [number, number]) => a + Math.floor(Math.random() * (b - a + 1));

/**
 * Karaktere kişisel veba hastalığını başlatır: "veba_hastasi" etiketi + (henüz
 * ayarlanmadıysa) ~%70 başlangıç ölüm riski. Hem yıllık bulaşma zarından
 * (vebaYillikKontrol) hem de bir olayın `etiket_ekle:["veba_hastasi"]` etkisinden
 * (gameEngine) çağrılır — tek doğruluk kaynağı.
 */
export function vebaHastaligiBaslatEt(state: CharacterState): void {
  if (!state.etiketler.includes("veba_hastasi")) etiketEkle(state, ["veba_hastasi"]);
  if (state.veba_olum_riski <= 0) {
    // Yeni yakalanma: ölüm olasılığı %55'ten başlar ve yakalandığın an can düşer (en az 1 kalır; sonrası zarda belli olur).
    state.veba_olum_riski = VEBA_BASLANGIC_OLUM_RISKI;
    state.saglik = Math.max(1, state.saglik - vebaAralik(VEBA_YAKALANMA_CAN_KAYBI));
  }
}

/**
 * Aktif veba sürerken her yıl: karakterin hastalığı KAPIP kapmadığını, eşinin
 * ve bir çocuğunun ise doğrudan ölümünü kontrol eder. Karakter zaten hastaysa
 * (veba_hastasi) yeniden bulaşma denenmez. Karakterin ölümü burada UYGULANMAZ.
 */
export function vebaYillikKontrol(state: CharacterState, yasArtisi: number): VebaYillikSonuc {
  const sonuc: VebaYillikSonuc = { hastalandi: false, mesajlar: [] };
  if (yasArtisi <= 0 || !state.veba?.aktif) return sonuc;
  const k = Math.max(0, Math.min(2, state.veba.korumaSeviyesi ?? 0));
  // Köpek (sağlık) pasif bonusu salgına yakalanma şansını düşürür.
  const kapmaSansi = VEBA_KAPMA_KADEME[k] * (hayvanBonusVar(state, "kopek_saglik") ? 0.8 : 1);
  const esSansi = VEBA_ES_KAYIP_KADEME[k];
  const cocukSansi = VEBA_COCUK_KAYIP_KADEME[k];
  const zatenHasta = state.etiketler.includes("veba_hastasi");
  // Karakterin BİZZAT hastalanması, kendi başına havuz kilitleyen bir etiket
  // eklediği için (yalnız vebaHastasiOlayi:true olaylar gösterilir); zaten bir
  // havuz kilidi altındayken (hapiste / kacak / yolculukta) bulaşırsa iki kilit
  // çakışır ve olaySec hiç uygun olay bulamaz → oyun kilitlenirdi. Bu durumlarda
  // karaktere bulaşmayı atla (§27 büyük savaş / küçük kriz de
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
      const kaybedilenEs = esiSifirla(state, "olum") ?? "";
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
 * Karakter vebayı BİZZAT kapmışsa (etiket "veba_hastasi"), hastalık olayından (`vebaHastasiOlayi`, 10 olaydan BİR tanesi)
 * hemen sonra BİR KEZ çalışır: o anki `veba_olum_riski` (%55 + olay seçiminin kaydırması, 5–90 arası) ölüm olasılığıdır;
 * kalan olasılık yaralı : sağlıklı = 2 : 1 bölünür (taban 55 / 30 / 15). Ölüm → karakter ölür; yaralı → can −20..22
 * (en az 1) ve hastalık biter; sağlıklı → can +5..9 ve hastalık biter. Karakter ölümü burada UYGULANMAZ — sinyal döner.
 */
export function vebaHastaligiKontrol(state: CharacterState): VebaHastaligiSonuc {
  const sonuc: VebaHastaligiSonuc = { karakterOldu: false, iyilesti: false, mesajlar: [] };
  if (!state.etiketler.includes("veba_hastasi")) return sonuc;
  const kopekBonusu = hayvanBonusVar(state, "kopek_saglik") ? 5 : 0;
  const olum = Math.max(5, Math.min(90, state.veba_olum_riski - kopekBonusu)) / 100;
  const kalan = 1 - olum;
  const zar = Math.random();
  if (zar < olum) {
    sonuc.karakterOldu = true;
    sonuc.mesajlar.push(T(state.dil, "Vebadan öldün; ateşler içinde son nefesini verdin."));
    return sonuc;
  }
  state.veba_olum_riski = 0;
  etiketSil(state, ["veba_hastasi"]);
  sonuc.iyilesti = true;
  if (zar < olum + kalan * (2 / 3)) {
    state.saglik = Math.max(1, state.saglik - vebaAralik(VEBA_YARALI_CAN_KAYBI));
    hayatOlayiEkle(state, "🩹", T(state.dil, "Vebayı yaralı atlattı"));
    sonuc.mesajlar.push(T(state.dil, "🩹 Ateşin düştü ama hastalık seni yıprattı — vebayı yaralı atlattın."));
  } else {
    state.saglik = Math.min(100, state.saglik + vebaAralik(VEBA_SAGLIKLI_CAN_KAZANCI));
    hayatOlayiEkle(state, "🌿", T(state.dil, "Vebayı atlattı"));
    sonuc.mesajlar.push(T(state.dil, "🌿 Ateşin düştü, gücün yavaş yavaş geri geliyor — vebayı sağlıkla atlattın."));
  }
  return sonuc;
}

/** Aktif veba süresi dolduysa kapatır; bekleme süresi buradan sayılır. Eski kayıtlardaki "iz" fazını da temizler. */
export function vebaBitisKontrolEt(state: CharacterState): string | null {
  if (state.veba?.aktif && state.yil >= state.veba.bitisYili) {
    ulkeGecmisiEkle(state, "veba_bitti", state.yil);
    state.veba = null;
    state.ulke.vebada = false;
    state.son_veba_bitis_yili = state.yil;
    return T(state.dil, "🕊️ Salgın nihayet sona erdi.");
  }
  if (state.veba && !state.veba.aktif) {
    state.veba = null;
    state.son_veba_bitis_yili = state.son_veba_bitis_yili ?? state.yil;
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
export const KARABORSA_SUC_ARTISI_YILLIK = 2;
export const KARABORSA_AHLAK_ASINMASI_YILLIK = 0.3;
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
 * Net servet = nakit + gayrimenkul değeri − aktif tefeci borcu. Çekilen kredi nakde
 * girdiği için borç düşülmezse skor/amaç hesabında "bedava servet" olur ve temerrütte
 * el koyma yalnız eldeki kadarını alınca borç silinir; bu yüzden skor, amaç ve
 * liderlik servet sütunu bunu kullanır.
 */
export function netServetHesapla(state: CharacterState): number {
  return state.para + gayrimenkulDegeriHesapla(state) - (state.kredi?.kalanBorc ?? 0);
}

/**
 * Sahip olunan tüm piyasa mülklerinin güncel (enflasyona göre ölçeklenmiş) toplam
 * değeri — net servet hesabında ve Finans ekranındaki servet dökümünde kullanılan
 * tek doğruluk kaynağı.
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
      return toplam + paraYuvarla(taban * mulkGetiriOraniKisisel(state, tur));
    }, 0)
  );
}

export interface DunyaFinansEtkisi {
  ikon: string;
  metin: string;
}

/**
 * Şu an karakterin bütçesini/sağlığını etkileyen dünya durumlarının (ekonomi,
 * savaş, salgın, kıtlık/isyan/altın çağ, gıda şoku, enflasyon)
 * insan-okunur özeti. Finans ekranı + sol paneldeki mini özet "🌍 dünya etkileri"
 * olarak gösterir — oyuncu maaşının/giderinin neden değiştiğini görebilsin diye.
 * Buradaki yüzdeler maasCarpanKalemleri/giderKalemleriHesapla'daki sabitlerin
 * insan diline çevrilmiş hâlidir (formülü tekrar HESAPLAMAZ, açıklar).
 */
export function dunyaFinansEtkileri(state: CharacterState): DunyaFinansEtkisi[] {
  const liste: DunyaFinansEtkisi[] = [];
  const dil = state.dil;

  const isaretli = (c: number) => {
    const y = yuzdeFarki(c);
    const isaret = y >= 0 ? "+" : "−";
    return dil === "en" ? `${isaret}${Math.abs(y)}%` : `${isaret}%${Math.abs(y)}`;
  };

  const donem = state.ulke.donem;
  if (donem) {
    const parcalar = [
      T(dil, "maaş {0}", [isaretli(donem.etki.maas)]),
      T(dil, "yaşam gideri {0}", [isaretli(donem.etki.yasamGideri)]),
    ];
    liste.push({
      ikon: DONEM_ADLARI[donem.tur].simge,
      metin: T(dil, "{0}: {1}", [T(dil, DONEM_ADLARI[donem.tur].ad), parcalar.join(" · ")]),
    });
  }

  if (state.buyuk_savas) {
    const etki = state.buyuk_savas.etki;
    const vergi = Math.round(state.buyuk_savas.vergiOrani * 100);
    liste.push({
      ikon: "⚔️",
      metin: T(dil, "Büyük savaş ({0}): maaş {1} · yemek {2} · savaş vergisi %{3}", [
        K(dil, state.buyuk_savas.dusman),
        isaretli(etki?.maas ?? 0.92),
        isaretli(state.buyuk_savas.gidaCarpani),
        vergi,
      ]),
    });
  } else if (state.ulke.savasta) {
    liste.push({ ikon: "⚔️", metin: T(dil, "Savaş: maaş {0}", [isaretli(0.92)]) });
  }

  if (state.veba?.aktif) {
    liste.push({
      ikon: "☠️",
      metin: T(dil, "Salgın: her yıl hastalık riski · işçi kıtlığı maaş {0}", [isaretli(state.veba.etki?.maas ?? state.veba.gelirCarpani)]),
    });
  }

  if (state.ulke.kriz?.tur === "isyan") liste.push({ ikon: "🔥", metin: T(dil, "İsyan: −3 para & −1 ün/yıl") });
  else if (state.ulke.kriz?.tur === "altin_cag")
    liste.push({ ikon: "✨", metin: T(dil, "Altın çağ: +4 para & +1 mutluluk/yıl") });

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
    return kitlikVar(ulke)
      ? MULK_GETIRI_KUCUK_TARLA_DEZAVANTAJLI
      : ulke.ekonomi === "iyi"
        ? MULK_GETIRI_KUCUK_TARLA_AVANTAJLI
        : MULK_GETIRI_KUCUK_TARLA_NORMAL;
  }
  if (tur === "ciftlik") {
    return kitlikVar(ulke) ? MULK_GETIRI_DEZAVANTAJLI : ulke.ekonomi === "iyi" ? MULK_GETIRI_AVANTAJLI : MULK_GETIRI_NORMAL;
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
  return kitlikVar(ulke) || ulke.vebada || ulke.savasta ? MULK_GETIRI_AVANTAJLI * 1.6 : 0;
}

/**
 * Mülkün güncel yıllık getiri oranı — hamMulkGetiriOrani'nın çıktısını ±MULK_GETIRI_TAVAN
 * (%8) bandına kırpar: demirci/kervan/karaborsa durum çarpanları uçları taşısa bile
 * "bir anda çok getirip çok götürmesin" (kullanıcı isteği). Bu, dünya-durumuna göre
 * DÜNYA GEZEGENİ oranıdır (kişiye özel değil) — `mulkPiyasaSinyali`'nin "normal" karşılaştırması
 * ve testler hâlâ bunu kullanır. Karaktere özel çağrılar `mulkGetiriOraniKisisel` kullanmalı.
 */
export function mulkGetiriOraniHesapla(tur: MulkTuru, ulke: CharacterState["ulke"]): number {
  const ham = hamMulkGetiriOrani(tur, ulke);
  return Math.max(-MULK_GETIRI_TAVAN, Math.min(MULK_GETIRI_TAVAN, ham));
}

/**
 * `mulkGetiriOraniHesapla`'nın karaktere özel hâli (2026-09 sonu, §41): dünya-durumu
 * oranına, kişilik kaynaklı kalıcı `gayrimenkul_getiri_bonusu`yu (±%2 gibi küçük bir
 * katkı) ekler. Gerçek gelir akışını etkileyen TÜM üretim çağrıları (yıllık tik +
 * Finans/Yatırım önizlemeleri) bunu kullanır; ±MULK_GETIRI_TAVAN kırpmasından SONRA
 * eklenir, küçük büyüklüğü yüzünden ayrıca kırpılmaz.
 */
export function mulkGetiriOraniKisisel(state: CharacterState, tur: MulkTuru): number {
  return mulkGetiriOraniHesapla(tur, state.ulke) + (state.gayrimenkul_getiri_bonusu ?? 0) + (hayvanBonusVar(state, "at_ticaret") ? 0.01 : 0);
}

/**
 * Sahip olunan her mülkün yıllık getirisini/zararını state.ulke'nin GÜNCEL durumuna göre
 * yeniden hesaplar (Durum sistemindeki sabit yil_basi_para'nın aksine, her turda taze
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
    const oran = mulkGetiriOraniKisisel(state, tur);

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
      sucArtisiKaydet(state);
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
const DEDIKODU_VEBA: string[] = [
  "Limandan gelen gemilerde hastalık olduğu fısıldanıyor; bazı tüccarlar şimdiden şehri terk ediyor...",
  "Komşu kasabalarda ateşli bir hastalığın yayıldığı konuşuluyor, hekimler endişeli...",
  "Fareler sokaklarda alışılmadık kadar çoğaldı; yaşlılar kötü günlerin geldiğini söylüyor...",
];
const DEDIKODU_DONEM: Record<DonemTuru, string[]> = {
  bolluk: [
    "Tarlalar bu yıl göz alabildiğine yeşil; yakında bereketli yıllar geleceği konuşuluyor...",
    "Tüccarlar uzak pazarların yeniden canlandığını söylüyor; lüks mallara talep artacak gibi...",
  ],
  durgunluk: [
    "Pazarlar giderek sessizleşiyor; bazı dükkânların kepenk indireceği konuşuluyor...",
    "Sarraflar keselerin sıkılaştığını, yakında alışverişin durgunlaşacağını söylüyor...",
  ],
  kitlik: [
    "Gökler aylardır damla düşürmedi; köylüler bu hasadın kötü geçeceğinden korkuyor...",
    "Ambarcılar tahıl saklamaya başladı; yakında ekmeğin pahalanacağı konuşuluyor...",
  ],
};
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
  // Faz A: yaklaşan savaş/veba ve dönem değişimi önceden sezilir — ama dedikodu her
  // zaman doğru değildir (%70 isabet), arada yanlış alarm da çıkar.
  const yaklasan = state.dunya_yaklasan;
  if (yaklasan?.tur === "savas" && !gelecekRakip && Math.random() < DEDIKODU_ISABET) {
    dedikodular.push(T(dil, sec(DEDIKODU_SAVAS), [K(dil, yaklasan.dusman ?? komsuGucSec(state.bolge))]));
  } else if (yaklasan?.tur === "veba" && Math.random() < DEDIKODU_ISABET) {
    dedikodular.push(T(dil, sec(DEDIKODU_VEBA)));
  } else if (!yaklasan && !gelecekRakip && !state.ulke.savasta && Math.random() < DEDIKODU_YANLIS_ALARM) {
    dedikodular.push(T(dil, sec(DEDIKODU_SAVAS), [K(dil, komsuGucSec(state.bolge))]));
  }
  const donem = state.ulke.donem;
  if (donem && donem.bitisYili - state.yil <= 1) {
    const yanlis = DONEM_TURLERI.find((t) => t !== donem.tur && t !== donem.sonraki) ?? donem.sonraki;
    const tahmin = Math.random() < DEDIKODU_ISABET ? donem.sonraki : yanlis;
    dedikodular.push(T(dil, sec(DEDIKODU_DONEM[tahmin])));
  }
  if (kitlikVar(state.ulke)) dedikodular.push(T(dil, sec(DEDIKODU_KITLIK)));
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
  if (kitlikVar(ulke)) carpan *= e.kitlik ?? 1;
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

/** Bir koleksiyon eşyasının bir sonraki bakımına kadar rastgele yıl (eşyanın kendi aralığı, yoksa lüks varsayılanı 8-10). */
export function rastgeleLuksBakimAraligi(tanim?: MagazaEsyasiTanimi): number {
  const [min, max] = tanim?.bakimAraligi ?? [LUKS_BAKIM_ARALIGI_MIN_YIL, LUKS_BAKIM_ARALIGI_MAX_YIL];
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Satışta o an görünen koleksiyon eşyalarının id'leri (vitrin) — şifa vitrine tabi değildir, hep görünür. */
function vitrinCaginaUygunAdaylar(state: CharacterState, kategori: string): MagazaEsyasiTanimi[] {
  return MAGAZA_ESYALARI.filter((e) => e.kategori === kategori && (!e.cag || e.cag === state.cag));
}

function vitrinKur(state: CharacterState): string[] {
  const idler: string[] = [];
  for (const [kategori, adet] of Object.entries(MAGAZA_VITRIN_ADET)) {
    const adaylar = vitrinCaginaUygunAdaylar(state, kategori);
    // Sahip olunanlar vitrine girip yer kaplamasın; yetmezse onlar da düşer (zaten satın alınamaz).
    const sahipOlmayanlar = adaylar.filter((e) => !state.magaza_envanteri.some((x) => x.katalogId === e.id));
    const havuz = [...sahipOlmayanlar].sort(() => Math.random() - 0.5);
    idler.push(...havuz.slice(0, adet ?? 0).map((e) => e.id));
  }
  return idler;
}

/**
 * Mağaza vitrinini gerekirse yeniler (ilk kurulum, süre dolumu ya da geçersiz id): koleksiyon kategorilerinden
 * (lüks/sanat/binek) her seferinde sınırlı sayıda eşya görünür, MAGAZA_VITRIN_YENILEME_YIL (3-4) yılda bir değişir.
 * Değişti mi (state'in kaydedilmesi gerekir) bilgisini döner.
 */
export function magazaVitriniYenile(state: CharacterState): boolean {
  const v = state.magaza_vitrin;
  const gecerli =
    v != null &&
    state.yil < v.yenileme_yili &&
    v.idler.every((id) => {
      const t = MAGAZA_ESYALARI.find((e) => e.id === id);
      return !!t && (!t.cag || t.cag === state.cag);
    });
  if (gecerli) return false;
  const [min, max] = MAGAZA_VITRIN_YENILEME_YIL;
  state.magaza_vitrin = {
    yenileme_yili: state.yil + min + Math.floor(Math.random() * (max - min + 1)),
    idler: vitrinKur(state),
  };
  return true;
}

/** Bu eşya şu an mağazada satılıyor mu? (Şifa: çağa uygunsa hep; koleksiyon: yalnız vitrindeyse.) */
export function magazadaSatildiMi(state: CharacterState, tanim: MagazaEsyasiTanimi): boolean {
  if (tanim.cag && tanim.cag !== state.cag) return false;
  if (!koleksiyonKategorisiMi(tanim.kategori)) return true;
  return !!state.magaza_vitrin?.idler.includes(tanim.id);
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

    // koleksiyon (lüks/sanat/binek): periyodik bakım — kalıcı, sadece masraf çıkar ve sayaç sıfırlanır
    if (yeniKalanYil <= 0) {
      const tanim = magazaEsyasiTanimiGetir(esya.katalogId);
      const guncelDeger = Math.round(tanim.tabanFiyat * enflasyonCarpani(state));
      const masraf = sonBasamagiDuzelt(guncelDeger * (tanim.bakimOrani ?? LUKS_BAKIM_ORANI));
      state.para -= masraf;
      bakimOdemeleri.push({ ad: esya.ad, miktar: masraf });
      kalanlar.push({ ...esya, kalanYil: rastgeleLuksBakimAraligi(tanim) });
    } else {
      kalanlar.push({ ...esya, kalanYil: yeniKalanYil });
    }
  }
  state.magaza_envanteri = kalanlar;
  return { cozulenler, bakimOdemeleri };
}
