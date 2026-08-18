/** Bölge+döneme göre gerçek tarihe esinlenen savaş pencereleri (flavor amaçlı, sadeleştirilmiş). */
export interface TarihiSavas {
  baslangic: number;
  bitis: number;
  rakip: string;
}

export const TARIHI_SAVASLAR: Record<string, TarihiSavas[]> = {
  // ---- Orta Çağ ----
  Fransa: [
    { baslangic: 1159, bitis: 1189, rakip: "İngiltere Krallığı" },
    { baslangic: 1213, bitis: 1214, rakip: "Kutsal Roma İmparatorluğu ve müttefikleri" },
  ],
  "Kutsal Roma": [
    { baslangic: 1075, bitis: 1122, rakip: "Papalık Devleti" },
    { baslangic: 1167, bitis: 1183, rakip: "Lombardiya Şehir Birliği" },
    { baslangic: 1239, bitis: 1250, rakip: "Papalık Devleti" },
  ],
  Bizans: [
    { baslangic: 1068, bitis: 1071, rakip: "Selçuklu Sultanlığı" },
    { baslangic: 1203, bitis: 1204, rakip: "Haçlı Ordusu" },
    { baslangic: 1235, bitis: 1254, rakip: "Latin İmparatorluğu" },
  ],
  Selçuklu: [
    { baslangic: 1068, bitis: 1071, rakip: "Bizans İmparatorluğu" },
    { baslangic: 1097, bitis: 1099, rakip: "Haçlı Ordusu" },
    { baslangic: 1147, bitis: 1149, rakip: "Haçlı Ordusu" },
  ],
  Eyyubiler: [
    { baslangic: 1187, bitis: 1192, rakip: "Haçlı Kudüs Krallığı" },
    { baslangic: 1217, bitis: 1221, rakip: "Haçlı Ordusu" },
  ],

  // ---- Sanayi Devrimi ----
  İngiltere: [
    { baslangic: 1803, bitis: 1815, rakip: "Fransa İmparatorluğu" },
    { baslangic: 1839, bitis: 1842, rakip: "Afgan Emirliği" },
    { baslangic: 1853, bitis: 1856, rakip: "Rusya İmparatorluğu" },
  ],
  Osmanlı: [
    { baslangic: 1806, bitis: 1812, rakip: "Rusya İmparatorluğu" },
    { baslangic: 1821, bitis: 1829, rakip: "Yunanistan Krallığı" },
    { baslangic: 1853, bitis: 1856, rakip: "Rusya İmparatorluğu" },
  ],
  Rusya: [
    { baslangic: 1806, bitis: 1812, rakip: "Osmanlı İmparatorluğu" },
    { baslangic: 1812, bitis: 1812, rakip: "Fransa İmparatorluğu" },
    { baslangic: 1828, bitis: 1829, rakip: "Osmanlı İmparatorluğu" },
    { baslangic: 1853, bitis: 1856, rakip: "Osmanlı İmparatorluğu" },
  ],
};

/** Fransa hem Orta Çağ'da hem Sanayi Devrimi'nde var; Sanayi dönemi ayrı bir liste kullanır. */
export const TARIHI_SAVASLAR_SANAYI_FRANSA: TarihiSavas[] = [
  { baslangic: 1803, bitis: 1815, rakip: "Avrupa Koalisyonu" },
  { baslangic: 1853, bitis: 1856, rakip: "Rusya İmparatorluğu" },
];

export function tarihiSavasKontrol(bolge: string, yil: number, cag?: string): string | null {
  const liste =
    bolge === "Fransa" && cag === "Sanayi Devrimi" ? TARIHI_SAVASLAR_SANAYI_FRANSA : TARIHI_SAVASLAR[bolge];
  if (!liste) return null;
  const savas = liste.find((s) => yil >= s.baslangic && yil <= s.bitis);
  return savas ? savas.rakip : null;
}
