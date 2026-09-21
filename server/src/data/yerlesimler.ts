import { Kategori } from "../types";

export interface YerlesimTanimi {
  id: string;
  ad: string;
  simge: string;
  /** Seçim ekranında oyuncuya gösterilen açık artı/eksi listesi. */
  artilar: string[];
  eksiler: string[];

  saglik?: number;
  para?: number;
  maasCarpani?: number;
  yatkinlikEtkisi?: Partial<Record<Kategori, number>>;
  etiketler: string[];
  /** Yaşam giderine uygulanan çarpan; bölgeler arası fark en fazla ±%2 olacak şekilde 0.98-1.02 aralığında tutulur. */
  yasamMaliyetCarpani: number;
}

/**
 * Yerleşim seçim ekranı 2026-09'da kaldırıldı; her karakter nötr "kasaba"yı
 * alır. Eski "Şehir Merkezi"/"Sınır Bölgesi"/"Dağ Başı" yerleşimleri (ve
 * onların stat/maaş/yatkınlık etkileri) oyundan tamamen kaldırıldı — tek
 * giriş kalıcı olarak "kasaba".
 */
export const YERLESIMLER: YerlesimTanimi[] = [
  {
    id: "kasaba",
    ad: "Kasaba",
    simge: "🏘️",
    artilar: [],
    eksiler: [],
    etiketler: ["yerlesim:kasaba"],
    yasamMaliyetCarpani: 1,
  },
];

export function yerlesimGetir(id: string): YerlesimTanimi | undefined {
  return YERLESIMLER.find((y) => y.id === id);
}

export function yerlesimIdByAd(ad: string): string {
  return YERLESIMLER.find((y) => y.ad === ad)?.id ?? YERLESIMLER[0].id;
}
