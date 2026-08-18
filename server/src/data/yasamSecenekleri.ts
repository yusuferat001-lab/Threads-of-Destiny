export interface YasamSecenegiTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  /** Yıllık yaşam gideri; giderKalemleriHesapla içinde bölge çarpanı ve enflasyonla birlikte hesaplanır. */
  maliyetYillik: number;
  saglikEtkisiYillik?: number;
  mutlulukEtkisiYillik?: number;
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
    aciklama: "Bedava ama onurunu ve sağlığını ciddi şekilde riske atar; sürekli yaşanacak bir hayat değil.",
    maliyetYillik: 0,
    saglikEtkisiYillik: -4,
    mutlulukEtkisiYillik: -2,
  },
  {
    id: "ucuza_ye",
    ad: "Ucuza Ye",
    simge: "🍲",
    aciklama: "Ucuz ve doyurucu ama sağlığını hafifçe aşındırır.",
    maliyetYillik: 3,
    saglikEtkisiYillik: -1,
  },
  {
    id: "normal_ye",
    ad: "Normal Ye",
    simge: "🍞",
    aciklama: "Dengeli bir sofra; ne artısı ne eksisi var.",
    maliyetYillik: 6,
  },
  {
    id: "iyi_ye",
    ad: "İyi Ye",
    simge: "🥘",
    aciklama: "Ortalamanın üstünde bir sofra; hem bünyeni hem moralini gözle görülür biçimde besler.",
    maliyetYillik: 10,
    saglikEtkisiYillik: 1,
    mutlulukEtkisiYillik: 1,
  },
  {
    id: "kaliteli_ye",
    ad: "Kaliteli Ye",
    simge: "🍗",
    aciklama: "Pahalı ama sağlığını ve moralini gözle görülür biçimde besler.",
    maliyetYillik: 16,
    saglikEtkisiYillik: 2,
    mutlulukEtkisiYillik: 2,
  },
  {
    id: "ziyafet_gibi_ye",
    ad: "Ziyafet Gibi Ye",
    simge: "🍖",
    aciklama: "Her akşam sanki bir şölenmiş gibi yersin; gerçekten pahalı ama hem bedenin hem ruhun bunu fazlasıyla hisseder.",
    maliyetYillik: 26,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 4,
  },
];

export const VARSAYILAN_YASAM_SECIMI_ID = "ucuza_ye";

export function yasamSecenegiGetir(id: string): YasamSecenegiTanimi | undefined {
  return YASAM_SECENEKLERI.find((y) => y.id === id);
}
