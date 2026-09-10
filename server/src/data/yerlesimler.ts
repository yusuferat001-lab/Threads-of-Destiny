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
 * Bölge içindeki yerleşim tercihi: aynı ülke içinde bile şehir merkezi,
 * sınır bölgesi ve dağ başı birbirinden çok farklı bir hayat sunar.
 */
export const YERLESIMLER: YerlesimTanimi[] = [
  {
    // Nötr varsayılan — yerleşim seçim ekranı 2026-09'da kaldırıldı; yeni her
    // karakter bunu alır. Hiçbir stat/maaş/yatkınlık etkisi YOK (denge bozulmasın).
    // Eski kayıtlar hâlâ "Şehir Merkezi"/"Sınır Bölgesi"/"Dağ Başı" adlarını
    // taşıyabilir ve o kayıtlarda ilgili etkiler korunur.
    id: "kasaba",
    ad: "Kasaba",
    simge: "🏘️",
    artilar: [],
    eksiler: [],
    etiketler: ["yerlesim:kasaba"],
    yasamMaliyetCarpani: 1,
  },
  {
    id: "sehir_merkezi",
    ad: "Şehir Merkezi",
    simge: "🏙️",
    artilar: ["Ticaret ve sosyal fırsatlar bol", "Yıllık kazancın %10 daha yüksek"],
    eksiler: ["Kalabalık ve salgın riski yüksek", "Başlangıç sağlığın daha düşük"],
    saglik: -10,
    maasCarpani: 1.1,
    yatkinlikEtkisi: { ticaret: 8, sosyal: 8, saglik: -5 },
    etiketler: ["yerlesim:sehir"],
    yasamMaliyetCarpani: 1.02,
  },
  {
    id: "sinir_bolgesi",
    ad: "Sınır Bölgesi",
    simge: "🛡️",
    artilar: ["Toprağın bereketli, vergiler hafif", "Askeri fırsatlar ve ganimet bol"],
    eksiler: ["Baskın ve savaş riski yüksek", "Ticaret ağın zayıf, yıllık kazancın %5 daha düşük"],
    para: 8,
    maasCarpani: 0.95,
    yatkinlikEtkisi: { savas: 10, ticaret: -5 },
    etiketler: ["yerlesim:sinir"],
    yasamMaliyetCarpani: 1.0,
  },
  {
    id: "dag_basi",
    ad: "Dağ Başı",
    simge: "⛰️",
    artilar: ["Yalnız ve özgürsün, vergi baskısı az", "Başlangıç sağlığın daha yüksek"],
    eksiler: ["Vahşi hayvanlar ve zorlu kışlarla karşılaşabilirsin", "Pazardan uzak, yıllık kazancın %10 daha düşük"],
    saglik: 5,
    para: -10,
    maasCarpani: 0.9,
    yatkinlikEtkisi: { saglik: 8, sosyal: -10 },
    etiketler: ["yerlesim:dag"],
    yasamMaliyetCarpani: 0.98,
  },
];

export function yerlesimGetir(id: string): YerlesimTanimi | undefined {
  return YERLESIMLER.find((y) => y.id === id);
}

export function yerlesimIdByAd(ad: string): string {
  return YERLESIMLER.find((y) => y.ad === ad)?.id ?? YERLESIMLER[0].id;
}
