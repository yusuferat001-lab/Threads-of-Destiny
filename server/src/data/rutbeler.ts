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
 * Meslek pazarı (v8.6): HER kademe (S2..S5) ve HER meslek için terfi, mesleğin pazar payına bağlıdır;
 * terfide bekleme yılı yoktur — pay (ve kariyer puanı/stat) eşiği dolunca terfi gelir.
 * Anahtar HEDEF kademe. Aktif-dengeli bot ölçümüyle (Tüccar medyanı: %16@25 yaş, %19@35, %24@50, %30@65)
 * ≈ S2 25 · S3 35 · S4 45 yaş, S5 nadir (%5–10) olacak şekilde ayarlandı.
 */
export const RUTBE_PAZAR_PAYI_ESIGI_ISLETME: Record<number, number> = { 2: 0.16, 3: 0.2, 4: 0.24, 5: 0.45 };
/** Mesleğe göre eşik çarpanı: pay kazanmanın zorluğu meslekten mesleğe değişir. */
const PAY_ESIGI_CARPANI: Record<string, number> = { Tüccar: 1, Asker: 1, Zanaatkâr: 0.85, "Din Adamı": 1.2 };

export function rutbePazarPayiEsigi(meslek: string, hedefSeviye: number): number | undefined {
  const e = RUTBE_PAZAR_PAYI_ESIGI_ISLETME[hedefSeviye];
  if (e === undefined) return undefined;
  return Math.round(e * (PAY_ESIGI_CARPANI[meslek] ?? 1) * 100) / 100;
}

/**
 * Seviye 1..5 için maaşa çarpımsal, kalıcı rütbe primi (hesaplaMaasYillik içinde
 * TEK bir çarpan kalemi olarak girer — kıdem/itibar/enflasyonla da çarpılır).
 * BİLEŞİK: her kademe bir öncekinin üstüne kademeye özgü bir yüzde bindirir.
 * Faz 6 ekonomi rebalansı (2026-09 sonu, kullanıcı isteği: "kalıcı maaş
 * bonuslarını azalt"): kademe artışları %15/%12/%12/%11/%10'dan %12/%10/%9/%8/%7'ye
 * düşürüldü — S2 = S1 ×1.12, S3 = S2 ×1.10, S4 = S3 ×1.09, S5 = S4 ×1.08.
 * S1..S5 sonuçları ≈ ×1.00 / ×1.12 / ×1.23 / ×1.34 / ×1.45 (eski: ×1.00/×1.15/×1.29/×1.44/×1.60).
 */
const RUTBE_MAAS_ARTIS_ORANLARI = [0.12, 0.1, 0.09, 0.08, 0.07];
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
 *
 * Faz 6 ekonomi rebalansı (2026-09 sonu, kullanıcı isteği: "S3/S4/S5
 * ilerlemesini yavaşlat"): S2 eşiği (10 kariyer_puani, erken oyunun hemen
 * ilk kademesi) BİLEREK dokunulmadı — yalnız S3/S4/S5 eşikleri yukarı çekildi
 * (kariyer_puani: 24→32, 44→64, 210→260) + her mesleğin S3/S4/S5 stat eşiği de
 * orantılı olarak biraz yükseltildi (S2 stat eşiği aynı kaldı).
 */
export const RUTBELER: Record<string, Record<Cag, RutbeTanimi>> = {
  Asker: {
    "Orta Çağ": {
      unvanlar: ["Er", "Onbaşı", "Silahşor", "Kumandan", "Serdar"],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 32, un: 36 },
        { kariyer_puani: 64, un: 48 },
        { kariyer_puani: 330, un: 78 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Er", "Onbaşı", "Çavuş", "Yüzbaşı", "Binbaşı"],
      esikler: [
        { kariyer_puani: 10, un: 20 },
        { kariyer_puani: 32, un: 36 },
        { kariyer_puani: 64, un: 48 },
        { kariyer_puani: 330, un: 78 },
      ],
    },
  },
  Tüccar: {
    "Orta Çağ": {
      unvanlar: ["Çırak Tüccar", "Seyyar Satıcı", "Pazarcı", "Lonca Ustası", "Lonca Reisi"],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 32, un: 19 },
        { kariyer_puani: 64, un: 28 },
        { kariyer_puani: 260, un: 54 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Kâtip Çırak", "Tezgâhtar", "Şirket Ortağı", "Fabrika Patronu", "Sanayi Baronu"],
      esikler: [
        { kariyer_puani: 10, un: 10 },
        { kariyer_puani: 32, un: 19 },
        { kariyer_puani: 64, un: 28 },
        { kariyer_puani: 260, un: 54 },
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
        { kariyer_puani: 32, ahlak: 52 },
        { kariyer_puani: 64, ahlak: 62 },
        { kariyer_puani: 330, ahlak: 80 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Papaz Yardımcısı", "Papaz", "Vaiz", "Başpapaz", "Piskopos"],
      // Ahlak eşikleri 50/58/66/86 → 44/50/58/78: pragmatik (ille de "aziz"
      // olmayan) bir din adamı düşük-orta rütbeleri de tırmanabilsin.
      esikler: [
        { kariyer_puani: 10, ahlak: 44 },
        { kariyer_puani: 32, ahlak: 52 },
        { kariyer_puani: 64, ahlak: 62 },
        { kariyer_puani: 330, ahlak: 80 },
      ],
    },
  },
  // Zanaatkâr (2026-09 yeni meslek): un eşikleri Tüccar'dan biraz alçak —
  // esnaf/usta itibarı, tüccarın "herkes tanır" şöhretinden daha mütevazı.
  Zanaatkâr: {
    "Orta Çağ": {
      unvanlar: ["Çırak", "Kalfa", "Usta", "Baş Usta", "Loncabaşı"],
      esikler: [
        { kariyer_puani: 10, un: 8 },
        { kariyer_puani: 32, un: 16 },
        { kariyer_puani: 64, un: 22 },
        { kariyer_puani: 260, un: 44 },
      ],
    },
    "Sanayi Devrimi": {
      unvanlar: ["Amele", "Vasıflı İşçi", "Ustabaşı", "Atölye Şefi", "Fabrika Müdürü"],
      esikler: [
        { kariyer_puani: 10, un: 8 },
        { kariyer_puani: 32, un: 16 },
        { kariyer_puani: 64, un: 22 },
        { kariyer_puani: 260, un: 44 },
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
