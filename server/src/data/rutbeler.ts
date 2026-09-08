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
 * BİLEŞİK: her kademe bir öncekinin ~%15 üstü (1.15^(seviye-1)). Yani S3 primi
 * "S2 primi × 1.15"tir, baz maaşa göre ayrı bir +%X değil — S1..S5 sırasıyla
 * ×1.00 / ×1.15 / ×1.32 / ×1.52 / ×1.75. (1.2 → 1.1 → 1.15: rütbe ilerlemesi
 * geç oyunda gelir tarafında daha görünür olsun; orta-yaş borç kaymasını hafifletir.)
 */
const RUTBE_MAAS_ARTIS_ORANI = 1.15;
export const RUTBE_MAAS_CARPANI: [number, number, number, number, number] = [0, 1, 2, 3, 4].map(
  (i) => Math.round(Math.pow(RUTBE_MAAS_ARTIS_ORANI, i) * 100) / 100
) as [number, number, number, number, number];

/** Hayatta geçen her yıl için pasif kıdem kazancı (kariyer_puani). */
export const KARIYER_PUANI_YILLIK = 2;
/** Mesleğine uygun kategoride (savas/ticaret/din) başarılı olunan her olay. */
export const KARIYER_PUANI_KATEGORI_BASARI = 3;
/** Kendi işine yapılan her yatırım (yatirimYap). Yatırım artık pahalı ve tavanlı olduğu için bu katkı da düşürüldü (12 → 8). */
export const KARIYER_PUANI_YATIRIM = 8;

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
