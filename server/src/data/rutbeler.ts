import { Cag } from "../types";

/**
 * Bir rütbe kademesine geçmek için gereken eşik. `para` KASITLI olarak yok —
 * sürekli harcanan nakde bağlı bir koşul, oyuncunun mekanikleri kullandıkça
 * sessizce rütbe kaybetmesine yol açıyordu. Yerine tek monoton sayaç
 * `kariyer_puani` (hiç azalmaz) + mesleğe özgü karakter statı geçti.
 */
export interface RutbeEsigi {
  /** state.kariyer_puani bu değere ulaşmalı (yıllık kıdem + meslek-kategori başarıları + kendi işine yatırım). */
  kariyer_puani: number;
  /** Asker & Tüccar: bu ün gerekir (her kademede). */
  un?: number;
  /** Din Adamı: bu ahlak gerekir (her kademede). */
  ahlak?: number;
}

export interface RutbeTanimi {
  /** Seviye 1..5 için sırasıyla unvan. */
  unvanlar: [string, string, string, string, string];
  /** esikler[0] → seviye 2, esikler[1] → 3, esikler[2] → 4, esikler[3] → 5. */
  esikler: [RutbeEsigi, RutbeEsigi, RutbeEsigi, RutbeEsigi];
}

/**
 * Bir terfiden sonra, HEDEF kademeye çıkabilmek için son terfiden bu kadar oyun
 * yılı geçmiş olmalı (state.yil - state.son_terfi_yili >= cooldown). Kademe
 * yükseldikçe bekleme uzar; kariyer_puani fazlasıyla dolsa bile üst üste terfi
 * edilemez. rutbeGuncelle ayrıca çağrı başına en fazla +1 kademe ilerletir.
 */
export const TERFI_COOLDOWN: Record<number, number> = { 2: 0, 3: 2, 4: 2, 5: 8 };

/**
 * Seviye 1..5 için maaşa çarpımsal, kalıcı rütbe primi (hesaplaMaasYillik içinde
 * TEK bir çarpan kalemi olarak girer — kıdem/itibar/enflasyonla da çarpılır).
 * BİLEŞİK: her kademe bir öncekinin üstüne kademeye özgü bir yüzde bindirir.
 * Kademe artışları sırasıyla %15 · %12 · %12 · %11 · %10 (… diye devam eder) —
 * yani S2 = S1 ×1.15, S3 = S2 ×1.12, S4 = S3 ×1.12, S5 = S4 ×1.11. S1..S5
 * sonuçları ≈ ×1.00 / ×1.15 / ×1.29 / ×1.44 / ×1.60.
 */
const RUTBE_MAAS_ARTIS_ORANLARI = [0.15, 0.12, 0.12, 0.11, 0.1];
export const RUTBE_MAAS_CARPANI: [number, number, number, number, number] = (() => {
  const carpanlar: number[] = [1];
  for (let i = 1; i < 5; i++) {
    carpanlar.push(carpanlar[i - 1] * (1 + RUTBE_MAAS_ARTIS_ORANLARI[i - 1]));
  }
  return carpanlar.map((c) => Math.round(c * 100) / 100) as [number, number, number, number, number];
})();

/**
 * Hayatta geçen her yıl için pasif kıdem kazancı (kariyer_puani). "Kendi işine
 * yatırım" özelliği tamamen kaldırıldığında (bir kariyer_puani kaynağıydı, +8/yatırım)
 * bu kaynağın telafisi için 2 → 3'e çıkarıldı — playstyle'dan bağımsız, geniş tabanlı
 * bir telafi (S5 yine nadir kalır; simulateKisilikler ile doğrulanmalı).
 */
export const KARIYER_PUANI_YILLIK = 3;
/** Mesleğine uygun kategoride (savas/ticaret/din) başarılı olunan her olay. */
export const KARIYER_PUANI_KATEGORI_BASARI = 3;

/**
 * Her meslek + çağ için 5 kademeli rütbe merdiveni. Eşikler çağdan bağımsız
 * (yalnız unvan metinleri çağa göre değişir). Ortalama başarılı bir kariyerin
 * seviye 4'te bitmesi, seviye 5'in nadir kalması hedeflenir; sayılar
 * scripts/simulateKisilikler.ts ile ayarlanır.
 */
export const RUTBELER: Record<string, Record<Cag, RutbeTanimi>> = {
  Asker: {
    "Orta Çağ": {
      unvanlar: ["Er", "Onbaşı", "Silahşor", "Kumandan", "Serdar"],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 24, un: 32 },
        { kariyer_puani: 44, un: 42 },
        { kariyer_puani: 210, un: 72 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Er", "Onbaşı", "Çavuş", "Yüzbaşı", "Binbaşı"],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 24, un: 32 },
        { kariyer_puani: 44, un: 42 },
        { kariyer_puani: 210, un: 72 },
      ],
    },
  },
  Tüccar: {
    "Orta Çağ": {
      unvanlar: ["Çırak Tüccar", "Seyyar Satıcı", "Pazarcı", "Lonca Ustası", "Lonca Reisi"],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 24, un: 17 },
        { kariyer_puani: 44, un: 25 },
        { kariyer_puani: 210, un: 50 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Kâtip Çırak", "Tezgâhtar", "Şirket Ortağı", "Fabrika Patronu", "Sanayi Baronu"],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 24, un: 17 },
        { kariyer_puani: 44, un: 25 },
        { kariyer_puani: 210, un: 50 },
      ],
    },
  },
  "Din Adamı": {
    "Orta Çağ": {
      unvanlar: ["Acemi Rahip", "Rahip", "Vaiz", "Başrahip", "Piskopos"],
      // Ahlak eşikleri 50/58/66/86 → 44/50/58/78: pragmatik (ille de "aziz"
      // olmayan) bir din adamı düşük-orta rütbeleri de tırmanabilsin.
      esikler: [
        { kariyer_puani: 10, ahlak: 44 },
        { kariyer_puani: 24, ahlak: 50 },
        { kariyer_puani: 44, ahlak: 58 },
        { kariyer_puani: 210, ahlak: 78 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Papaz Yardımcısı", "Papaz", "Vaiz", "Başpapaz", "Piskopos"],
      // Ahlak eşikleri 50/58/66/86 → 44/50/58/78: pragmatik (ille de "aziz"
      // olmayan) bir din adamı düşük-orta rütbeleri de tırmanabilsin.
      esikler: [
        { kariyer_puani: 10, ahlak: 44 },
        { kariyer_puani: 24, ahlak: 50 },
        { kariyer_puani: 44, ahlak: 58 },
        { kariyer_puani: 210, ahlak: 78 },
      ],
    },
  },
};

/**
 * Din Adamı'nın rütbe unvanları dine göre değişir (RUTBELER["Din Adamı"] içindeki
 * "Rahip"/"Papaz" gibi terimler yalnızca Hristiyan cemaatler için doğrudur).
 * Eşikler her din için aynı kalır; sadece unvan metinleri değişir.
 */
const DIN_ADAMI_UNVANLARI: Record<string, Record<Cag, [string, string, string, string, string]>> = {
  "Sünni İslam": {
    "Orta Çağ": ["Medrese Talebesi", "Müezzin", "Vaiz", "İmam", "Baş İmam"],
    "Sanayi Devrimi": ["Medrese Talebesi", "Müezzin", "Vaiz", "İmam", "Baş İmam"],
  },
};

function dinAdamiRutbeTanimiGetir(cag: Cag, dinKultur?: string | null): RutbeTanimi | undefined {
  const temel = RUTBELER["Din Adamı"]?.[cag];
  if (!temel) return undefined;
  const dineOzguUnvanlar = dinKultur ? DIN_ADAMI_UNVANLARI[dinKultur]?.[cag] : undefined;
  if (!dineOzguUnvanlar) return temel;
  return { ...temel, unvanlar: dineOzguUnvanlar };
}

export function rutbeTanimiGetir(meslek: string, cag: Cag, dinKultur?: string | null): RutbeTanimi | undefined {
  if (meslek === "Din Adamı") return dinAdamiRutbeTanimiGetir(cag, dinKultur);
  return RUTBELER[meslek]?.[cag];
}

/** Seviye (1..5) için maaş primini döner; aralık dışı güvenli. */
export function rutbeMaasCarpani(seviye: number): number {
  const i = Math.max(0, Math.min(RUTBE_MAAS_CARPANI.length - 1, Math.round(seviye) - 1));
  return RUTBE_MAAS_CARPANI[i];
}
