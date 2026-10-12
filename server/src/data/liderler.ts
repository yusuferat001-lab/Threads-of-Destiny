/** Bölge + yıla göre gösterilecek, tarihsel esinli hükümdar/lider bilgisi (flavor amaçlı, sadeleştirilmiş). */
export interface LiderDonemi {
  baslangic: number;
  bitis: number;
  unvan: string;
  isim: string;
}

export const LIDERLER: Record<string, LiderDonemi[]> = {
  // ---- Orta Çağ (1050-1260) ----
  Fransa: [
    { baslangic: 1031, bitis: 1060, unvan: "Kral", isim: "I. Henri" },
    { baslangic: 1060, bitis: 1108, unvan: "Kral", isim: "I. Philippe" },
    { baslangic: 1108, bitis: 1137, unvan: "Kral", isim: "VI. Louis" },
    { baslangic: 1137, bitis: 1180, unvan: "Kral", isim: "VII. Louis" },
    { baslangic: 1180, bitis: 1223, unvan: "Kral", isim: "II. Philippe Auguste" },
    { baslangic: 1223, bitis: 1226, unvan: "Kral", isim: "VIII. Louis" },
    { baslangic: 1226, bitis: 1270, unvan: "Kral", isim: "IX. Louis (Aziz Louis)" },
  ],
  "Kutsal Roma": [
    { baslangic: 1046, bitis: 1056, unvan: "İmparator", isim: "III. Heinrich" },
    { baslangic: 1056, bitis: 1105, unvan: "İmparator", isim: "IV. Heinrich" },
    { baslangic: 1105, bitis: 1125, unvan: "İmparator", isim: "V. Heinrich" },
    { baslangic: 1125, bitis: 1137, unvan: "İmparator", isim: "III. Lothar" },
    { baslangic: 1138, bitis: 1152, unvan: "Kral", isim: "III. Konrad" },
    { baslangic: 1155, bitis: 1190, unvan: "İmparator", isim: "I. Friedrich Barbarossa" },
    { baslangic: 1191, bitis: 1197, unvan: "İmparator", isim: "VI. Heinrich" },
    { baslangic: 1198, bitis: 1215, unvan: "İmparator", isim: "IV. Otto" },
    { baslangic: 1220, bitis: 1250, unvan: "İmparator", isim: "II. Friedrich" },
  ],
  Bizans: [
    { baslangic: 1042, bitis: 1055, unvan: "İmparator", isim: "IX. Konstantinos Monomakhos" },
    { baslangic: 1059, bitis: 1067, unvan: "İmparator", isim: "X. Konstantinos Dukas" },
    { baslangic: 1068, bitis: 1071, unvan: "İmparator", isim: "IV. Romanos Diogenes" },
    { baslangic: 1081, bitis: 1118, unvan: "İmparator", isim: "I. Aleksios Komnenos" },
    { baslangic: 1118, bitis: 1143, unvan: "İmparator", isim: "II. Ioannes Komnenos" },
    { baslangic: 1143, bitis: 1180, unvan: "İmparator", isim: "I. Manuel Komnenos" },
    { baslangic: 1185, bitis: 1195, unvan: "İmparator", isim: "II. Isaakios Angelos" },
    { baslangic: 1205, bitis: 1221, unvan: "İmparator", isim: "I. Theodoros Laskaris" },
    { baslangic: 1221, bitis: 1254, unvan: "İmparator", isim: "III. Ioannes Vatatzes" },
  ],
  Selçuklu: [
    { baslangic: 1063, bitis: 1072, unvan: "Sultan", isim: "Alparslan" },
    { baslangic: 1072, bitis: 1092, unvan: "Sultan", isim: "Melikşah" },
    { baslangic: 1092, bitis: 1107, unvan: "Sultan", isim: "I. Kılıçarslan" },
    { baslangic: 1116, bitis: 1156, unvan: "Sultan", isim: "I. Mesud" },
    { baslangic: 1156, bitis: 1192, unvan: "Sultan", isim: "II. Kılıçarslan" },
    { baslangic: 1192, bitis: 1220, unvan: "Sultan", isim: "I. Gıyaseddin Keyhüsrev" },
    { baslangic: 1220, bitis: 1237, unvan: "Sultan", isim: "I. Alaeddin Keykubad" },
    { baslangic: 1237, bitis: 1246, unvan: "Sultan", isim: "II. Gıyaseddin Keyhüsrev" },
  ],
  Eyyubiler: [
    { baslangic: 1171, bitis: 1193, unvan: "Sultan", isim: "Selahaddin Eyyubi" },
    { baslangic: 1193, bitis: 1198, unvan: "Sultan", isim: "El-Aziz Osman" },
    { baslangic: 1200, bitis: 1218, unvan: "Sultan", isim: "El-Adil" },
    { baslangic: 1218, bitis: 1238, unvan: "Sultan", isim: "El-Kamil" },
    { baslangic: 1240, bitis: 1249, unvan: "Sultan", isim: "Es-Salih Eyyub" },
  ],

  // ---- Sanayi Devrimi (1800-1870) ----
  İngiltere: [
    { baslangic: 1760, bitis: 1820, unvan: "Kral", isim: "III. George" },
    { baslangic: 1820, bitis: 1830, unvan: "Kral", isim: "IV. George" },
    { baslangic: 1830, bitis: 1837, unvan: "Kral", isim: "IV. William" },
    { baslangic: 1837, bitis: 1870, unvan: "Kraliçe", isim: "Victoria" },
  ],
  Osmanlı: [
    { baslangic: 1789, bitis: 1807, unvan: "Sultan", isim: "III. Selim" },
    { baslangic: 1807, bitis: 1808, unvan: "Sultan", isim: "IV. Mustafa" },
    { baslangic: 1808, bitis: 1839, unvan: "Sultan", isim: "II. Mahmud" },
    { baslangic: 1839, bitis: 1861, unvan: "Sultan", isim: "Abdülmecid" },
    { baslangic: 1861, bitis: 1870, unvan: "Sultan", isim: "Abdülaziz" },
  ],
  Rusya: [
    { baslangic: 1796, bitis: 1801, unvan: "Çar", isim: "I. Pavel" },
    { baslangic: 1801, bitis: 1825, unvan: "Çar", isim: "I. Aleksandr" },
    { baslangic: 1825, bitis: 1855, unvan: "Çar", isim: "I. Nikolay" },
    { baslangic: 1855, bitis: 1870, unvan: "Çar", isim: "II. Aleksandr" },
  ],
};

// Fransa hem Orta Çağ hem Sanayi Devrimi'nde var; Sanayi dönemi için ayrı bir zaman çizelgesi ekleniyor,
// aramada yıl aralığı hangi listede eşleşiyorsa o kullanılıyor (bkz. liderGetir).
export const LIDERLER_SANAYI_FRANSA: LiderDonemi[] = [
  { baslangic: 1799, bitis: 1814, unvan: "İmparator", isim: "Napoléon Bonaparte" },
  { baslangic: 1814, bitis: 1824, unvan: "Kral", isim: "XVIII. Louis" },
  { baslangic: 1824, bitis: 1830, unvan: "Kral", isim: "X. Charles" },
  { baslangic: 1830, bitis: 1848, unvan: "Kral", isim: "Louis-Philippe" },
  { baslangic: 1852, bitis: 1870, unvan: "İmparator", isim: "III. Napoléon" },
];

export function liderGetir(bolge: string, yil: number, cag?: string): string | null {
  const liste =
    bolge === "Fransa" && cag === "Sanayi Devrimi" ? LIDERLER_SANAYI_FRANSA : LIDERLER[bolge];
  if (!liste) return null;
  const donem = liste.find((d) => yil >= d.baslangic && yil <= d.bitis);
  return donem ? `${donem.unvan} ${donem.isim}` : null;
}

/** Bir bölge+çağın tüm hükümdar dönemleri (Dünya geçmişi penceresi için; bölge yoksa boş). */
export function liderDonemleri(bolge: string, cag?: string): LiderDonemi[] {
  return bolge === "Fransa" && cag === "Sanayi Devrimi" ? LIDERLER_SANAYI_FRANSA : LIDERLER[bolge] ?? [];
}

/** Savaş olaylarında kullanılacak, döneme uygun düşman/komşu güç adı. */
export const KOMSU_GUCLER: Record<string, string[]> = {
  Fransa: ["İngiltere Krallığı", "Kutsal Roma İmparatorluğu", "Flandre Kontluğu", "Aragon Krallığı"],
  "Kutsal Roma": ["Papalık Devleti", "Lombardiya Şehir Birliği", "Fransa Krallığı", "Macar Krallığı"],
  Bizans: ["Selçuklu Sultanlığı", "Bulgar Çarlığı", "Normanlar", "Venedik Cumhuriyeti"],
  Selçuklu: ["Bizans İmparatorluğu", "Haçlı Kontlukları", "Gürcü Krallığı", "Danişmendliler"],
  Eyyubiler: ["Haçlı Kudüs Krallığı", "Zengiler", "Bizans İmparatorluğu"],
  İngiltere: ["Fransa", "Rusya İmparatorluğu", "Afgan Emirliği", "Sih İmparatorluğu"],
  Osmanlı: ["Rusya İmparatorluğu", "Yunanistan Krallığı", "Mısır Hidivliği", "Sırp Prensliği"],
  Rusya: ["Osmanlı İmparatorluğu", "İngiltere", "Fransa", "Polonya"],
};

export function komsuGucSec(bolge: string): string {
  const liste = KOMSU_GUCLER[bolge];
  if (!liste || liste.length === 0) return "komşu bir güç";
  return liste[Math.floor(Math.random() * liste.length)];
}
