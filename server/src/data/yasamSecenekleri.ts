export interface YasamSecenegiTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  /** Yıllık yaşam gideri; giderKalemleriHesapla içinde bölge çarpanı ve enflasyonla birlikte hesaplanır. */
  maliyetYillik: number;
  saglikEtkisiYillik?: number;
  mutlulukEtkisiYillik?: number;
  /** En kötü sofralar açlığın/bakımsızlığın gözle görülür olması nedeniyle ünü de aşındırır; en pahalı sofra biraz büyütür. */
  unEtkisiYillik?: number;
}

/**
 * Oyuncunun her an değiştirebileceği yaşam tarzı seçimi: ne kadar harcayıp
 * karşılığında ne kadar sağlıklı/mutlu yaşıyorsun. Konut sisteminden bağımsız,
 * paralel bir ekonomik eksen — ama fiyat merdiveni konutunkiyle aynı mantıkla
 * ilerler: en pahalı sofra sadece oyunun ileri/başarılı aşamalarında rahatça
 * karşılanabilir olsun diye giderek dikleşir.
 */
export const YASAM_SECENEKLERI: YasamSecenegiTanimi[] = [
  {
    id: "copten_topla",
    ad: "Çöpten Topla",
    simge: "🗑️",
    aciklama:
      "Bedava ama sağlığını, moralini ve itibarını hızla aşındırır; kimsenin gözünde saygın kalamazsın. Sadece çaresizlikten seçilecek bir dip.",
    maliyetYillik: 0,
    saglikEtkisiYillik: -2,
    mutlulukEtkisiYillik: -2,
    unEtkisiYillik: -2,
  },
  {
    id: "ucuza_ye",
    ad: "Ucuza Ye",
    simge: "🍲",
    aciklama:
      "Ucuz ve doyurucu ama kalitesiz; sağlığını, moralini ve adını yavaş yavaş aşındırır. İlk fırsatta normal bir sofraya geçmek gerekir.",
    maliyetYillik: 2.5,
    saglikEtkisiYillik: -2,
    mutlulukEtkisiYillik: -2,
    unEtkisiYillik: -2,
  },
  {
    id: "normal_ye",
    ad: "Normal Ye",
    simge: "🍞",
    aciklama: "Dengeli bir sofra; ne artısı ne eksisi var. Artık yemek seni yıpratmıyor.",
    maliyetYillik: 5,
  },
  {
    id: "iyi_ye",
    ad: "İyi Ye",
    simge: "🥘",
    aciklama: "Ortalamanın üstünde bir sofra; hem bünyeni hem moralini gözle görülür biçimde besler.",
    maliyetYillik: 8,
    saglikEtkisiYillik: 2,
    mutlulukEtkisiYillik: 1,
  },
  {
    id: "kaliteli_ye",
    ad: "Kaliteli Ye",
    simge: "🍗",
    aciklama: "Pahalı ama sağlığını ve moralini gözle görülür biçimde besler.",
    maliyetYillik: 13,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 2,
  },
  {
    id: "ziyafet_gibi_ye",
    ad: "Ziyafet Gibi Ye",
    simge: "🍖",
    aciklama: "Her akşam sanki bir şölenmiş gibi yersin; gerçekten pahalı ama hem bedenin hem ruhun hem de itibarın bunu fazlasıyla hisseder.",
    maliyetYillik: 20,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 4,
    unEtkisiYillik: 1,
  },
];

/**
 * Yeni karakter artık en ucuz sofrada değil, "Normal Ye" ile başlar: en ucuz iki
 * kademe ağır ceza taşıdığı için (bkz. VARSAYILAN_KONUT_ID ile aynı gerekçe).
 */
export const VARSAYILAN_YASAM_SECIMI_ID = "normal_ye";

export function yasamSecenegiGetir(id: string): YasamSecenegiTanimi | undefined {
  return YASAM_SECENEKLERI.find((y) => y.id === id);
}
