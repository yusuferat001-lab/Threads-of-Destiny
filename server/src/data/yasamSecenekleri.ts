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
 *
 * Faz 9 (2026-09 sonu, konutlarla AYNI turda, kullanıcı isteği): eski 6 kademe
 * her zaman üç statı birlikte büyütüp küçültüyordu; 5 kademeye indirildi ve her
 * kademeye kendi kişiliği verildi — Keyifli Sofra doyurucu değil NEŞELİ (yüksek
 * mutluluk, düşük şöhret), Dengeli Sofra besleyici/SAĞLIKLI, Şölen Sofrası hem en
 * pahalı hem tartışmasız en iyisi. Şöhret burada da konuttaki gibi cimri tutuldu:
 * orta-üst kademede en fazla +1, yalnız zirvede (+4) gerçek bir sıçrama var. Her
 * kademenin ikincil etkileri ±3'ü geçmez. Eski canlı oturumlardaki id'ler
 * `eskiKayitGocu` ile buradaki en yakın karşılığa taşınır (bkz. stateManager.ts).
 *
 * Görüntülenen ad/simge, döneme VE ülkeye göre ayrıca değişir — bkz.
 * client/src/bolgeTema.ts YASAM_TEMALARI + yasamGoruntusuGetir. Buradaki
 * ad/simge/aciklama, o eşleşme bulunamazsa kullanılan JENERİK yedektir.
 */
export const YASAM_SECENEKLERI: YasamSecenegiTanimi[] = [
  {
    id: "bayat_artik",
    ad: "Bayat Artık",
    simge: "🗑️",
    aciklama:
      "Küflenmeye yüz tutmuş artıklar ve bayat kırıntılar; karnını doyurur ama bedenini ağır şekilde yıpratır, moralini ve az da olsa adını düşürür. Sadece çaresizlikten seçilecek bir dip.",
    maliyetYillik: 0,
    saglikEtkisiYillik: -4,
    mutlulukEtkisiYillik: -3,
    unEtkisiYillik: -1,
  },
  {
    id: "sade_sofra",
    ad: "Sade Sofra",
    simge: "🍞",
    aciklama: "Dengeli bir sofra; ne artısı ne eksisi var. Artık yemek seni yıpratmıyor.",
    maliyetYillik: 4.5,
  },
  {
    id: "keyifli_sofra",
    ad: "Keyifli Sofra",
    simge: "🍲",
    aciklama:
      "Şatafatsız ama lezzetli, canını sıcacık hissettiren bir sofra; sağlıktan çok keyif ve moral için yenir.",
    maliyetYillik: 8,
    saglikEtkisiYillik: 1,
    mutlulukEtkisiYillik: 3,
  },
  {
    id: "dengeli_sofra",
    ad: "Dengeli Sofra",
    simge: "🥘",
    aciklama: "Taze ve besleyici, bedenini gerçekten güçlendiren dengeli bir beslenme düzeni.",
    maliyetYillik: 13,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 2,
    unEtkisiYillik: 1,
  },
  {
    id: "solen_sofrasi",
    ad: "Şölen Sofrası",
    simge: "🍖",
    aciklama:
      "Her akşam sanki bir şölenmiş gibi yersin; gerçekten pahalı ama bu sofradan kalkanlar hem doyar hem de senden söz eder.",
    maliyetYillik: 20,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 3,
    unEtkisiYillik: 4,
  },
];

/**
 * Yeni karakter artık en ucuz sofrada değil, "Sade Sofra" ile başlar: en ucuz
 * kademe ağır ceza taşıdığı için (bkz. VARSAYILAN_KONUT_ID ile aynı gerekçe).
 */
export const VARSAYILAN_YASAM_SECIMI_ID = "sade_sofra";

export function yasamSecenegiGetir(id: string): YasamSecenegiTanimi | undefined {
  return YASAM_SECENEKLERI.find((y) => y.id === id);
}
