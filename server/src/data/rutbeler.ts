import { Cag } from "../types";

export interface RutbeEsigi {
  tur_sayisi?: number;
  un?: number;
  para?: number;
  ahlak?: number;
}

export interface RutbeTanimi {
  /** Seviye 1, 2 ve 3 için sırasıyla unvan. */
  unvanlar: [string, string, string];
  seviye2Esik: RutbeEsigi;
  seviye3Esik: RutbeEsigi;
}

/**
 * Her meslek + çağ kombinasyonu için üç kademeli rütbe tanımı. Terfi,
 * kıdem (tur_sayisi) ile birlikte mesleğe özgü bir ikinci koşula bağlıdır:
 * Asker'de ün (savaş şöhreti), Tüccar'da servet, Din Adamı'nda ahlak.
 */
export const RUTBELER: Record<string, Record<Cag, RutbeTanimi>> = {
  Asker: {
    "Orta Çağ": {
      unvanlar: ["Er", "Silahşor", "Kumandan"],
      seviye2Esik: { tur_sayisi: 4, un: 30 },
      seviye3Esik: { tur_sayisi: 9, un: 55 },
    },
    "Sanayi Devrimi": {
      unvanlar: ["Er", "Çavuş", "Yüzbaşı"],
      seviye2Esik: { tur_sayisi: 4, un: 30 },
      seviye3Esik: { tur_sayisi: 9, un: 55 },
    },
  },
  Tüccar: {
    "Orta Çağ": {
      unvanlar: ["Çırak Tüccar", "Pazarcı", "Lonca Ustası"],
      seviye2Esik: { tur_sayisi: 4, para: 150 },
      seviye3Esik: { tur_sayisi: 9, para: 500 },
    },
    "Sanayi Devrimi": {
      unvanlar: ["Katip Çırak", "Şirket Ortağı", "Fabrika Patronu"],
      seviye2Esik: { tur_sayisi: 4, para: 200 },
      seviye3Esik: { tur_sayisi: 9, para: 700 },
    },
  },
  "Din Adamı": {
    "Orta Çağ": {
      unvanlar: ["Acemi Rahip", "Vaiz", "Başrahip"],
      seviye2Esik: { tur_sayisi: 4, ahlak: 60 },
      seviye3Esik: { tur_sayisi: 9, ahlak: 75 },
    },
    "Sanayi Devrimi": {
      unvanlar: ["Papaz Yardımcısı", "Vaiz", "Baş Vaiz"],
      seviye2Esik: { tur_sayisi: 4, ahlak: 60 },
      seviye3Esik: { tur_sayisi: 9, ahlak: 75 },
    },
  },
};

/**
 * Din Adamı'nın rütbe unvanları dine göre değişir (RUTBELER["Din Adamı"] içindeki
 * "Rahip"/"Papaz" gibi terimler yalnızca Hristiyan cemaatler için doğrudur).
 * Eşikler her din için aynı kalır; sadece unvan metinleri değişir.
 */
const DIN_ADAMI_UNVANLARI: Record<string, Record<Cag, [string, string, string]>> = {
  "Sünni İslam": {
    "Orta Çağ": ["Medrese Talebesi", "Vaiz", "Baş İmam"],
    "Sanayi Devrimi": ["İmam Yardımcısı", "Vaiz", "Baş İmam"],
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
