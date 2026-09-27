export interface KonutTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  /** Yıllık kira gideri; giderKalemleriHesapla içinde yaşam/kira giderine eklenir. */
  kiraYillik: number;
  /** Ucuz konutun bedeli ya da lüks konutun getirisi: her yıl sağlığı biraz etkiler. */
  saglikEtkisiYillik?: number;
  /** Konforlu bir çatının verdiği huzur ya da sağlıksız bir barınağın verdiği gerginlik: her yıl mutluluğu biraz etkiler. */
  mutlulukEtkisiYillik?: number;
  /** Pahalı konutun getirisi: gösteriş her yıl ünü biraz büyütür. */
  unEtkisiYillik?: number;
}

/**
 * Yerleşimden (şehir/sınır/dağ) bağımsız, oyuncunun istediği an değiştirebileceği
 * ekonomik/sosyal bir eksen: ne kadar konforlu bir evde yaşıyorsun. Varsayılan
 * (createCharacter) her zaman sağlık/ün açısından nötr, mutlulukta hafif pozitif
 * olan "Mütevazı Yuva" kademesidir, böylece bu sistemi hiç kullanmayan bir oyuncu
 * için mevcut ekonomi dengesi değişmez.
 *
 * Faz 9 (2026-09 sonu, kullanıcı isteği: "ev ve yaşamları bir adet azalt, her
 * kademe kendi kişiliğini taşısın"): eski 6 kademe (Basit Barınak/Ahşap Ev/Normal
 * Ev/Taş Ev/Konak/Şato) hep ÜÇ statı BİRLİKTE, aynı yönde büyütüp küçültüyordu —
 * hiçbir kademenin kendine has bir "kimliği" yoktu. 5 kademeye indirildi: en alttaki
 * iki eski kademe TEK bir "dip" kademede birleşti, üstteki üç kademe artık birbirinden
 * gerçekten farklı bir kişilik taşıyor (Sıcak Ocak = sıcak/mütevazı, Sağlam Konut =
 * bedeni koruyan sağlam bir ev, Görkemli Konak = hem en pahalı hem tartışmasız en
 * iyisi). Birkaç tur kullanıcı geri bildirimiyle kalibre edildi: sağlık/mutluluk
 * ucuza (orta kademelerde bile +1..+3) kazanılabilirken, şöhret bilinçli olarak
 * cimri tutuldu (üst-orta kademede en fazla +1) ve yalnız en tepedeki tek kademede
 * (+5) gerçek bir sıçrama yapıyor — ucuz şöhret yok, zirve şöhret pahalı ve nadir.
 * Her kademenin İKİNCİL (baskın olmayan) etkileri ±3'ü hiç geçmez; birincil etki
 * (öne çıkan kimlik statı) daha büyük olabilir. Eski canlı oturumlardaki id'ler
 * `eskiKayitGocu` ile buradaki en yakın karşılığa taşınır (bkz. stateManager.ts).
 *
 * Görüntülenen ad/simge, döneme VE ülkeye göre ayrıca değişir — bkz.
 * client/src/bolgeTema.ts KONUT_TEMALARI + konutGoruntusuGetir. Buradaki
 * ad/simge/aciklama, o eşleşme bulunamazsa kullanılan JENERİK yedektir; ayrıca
 * `T()`/`K()` ile üretilen kısa oyun-içi mesajlarda ("...'e taşındın.") hep bu
 * jenerik ad kullanılır (bölgesel ad yalnız kart/sahne GÖSTERİMİNDE devreye girer).
 */
export const KONUTLAR: KonutTanimi[] = [
  {
    id: "nemli_baraka",
    ad: "Nemli Baraka",
    simge: "🛖",
    aciklama:
      "Rüzgârın duvarlardan geçtiği, sürekli nemli ve soğuk bir barınak; burada yaşamak bedenini ağır şekilde yıpratır, moralini ve az da olsa adını düşürür. Sadece geçici bir dip.",
    kiraYillik: 1,
    saglikEtkisiYillik: -4,
    mutlulukEtkisiYillik: -3,
    unEtkisiYillik: -1,
  },
  {
    id: "mutevazi_yuva",
    ad: "Mütevazı Yuva",
    simge: "🏠",
    aciklama: "Sıradan ama gerçek bir yuva; kendi dört duvarının verdiği küçük bir huzur var. Artık ev seni yıpratmıyor.",
    kiraYillik: 4,
    mutlulukEtkisiYillik: 1,
  },
  {
    id: "sicak_ocak",
    ad: "Sıcak Ocak",
    simge: "🔥",
    aciklama:
      "Küçük ama sımsıcak, içi sevgiyle döşenmiş bir ev; gösterişten çok huzur ve neşe sunuyor, komşuların arasında da adından iyi söz ettiriyor.",
    kiraYillik: 8,
    saglikEtkisiYillik: 1,
    mutlulukEtkisiYillik: 2,
    unEtkisiYillik: 1,
  },
  {
    id: "saglam_konut",
    ad: "Sağlam Konut",
    simge: "🧱",
    aciklama:
      "Kalın duvarları, iyi havalandırması ve temiz suyuyla bedenini gerçekten koruyan, sağlam ve konforlu bir ev.",
    kiraYillik: 14,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 2,
    unEtkisiYillik: 1,
  },
  {
    id: "gorkemli_konak",
    ad: "Görkemli Konak",
    simge: "🏛️",
    aciklama:
      "Bölgenin konuştuğu, gerçekten görkemli bir çatı; hem bedenin hem ruhun bu konforda rahat eder, adın da kapılarından çok öteye taşınır.",
    kiraYillik: 23,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 3,
    unEtkisiYillik: 5,
  },
];

/**
 * Yeni karakter, sağlık/ün açısından TAMAMEN NÖTR olan "Mütevazı Yuva"da başlar
 * (2026-09 ekonomi dengesi + Faz 9): ev ekranını hiç açmayan sıradan bir oyuncu,
 * ilk 15-20 yıl boyunca sessizce sağlık/itibar kaybetmesin diye. En dip kademe
 * (Nemli Baraka) hâlâ ceza taşır.
 */
export const VARSAYILAN_KONUT_ID = "mutevazi_yuva";

/** Bir konuttan diğerine taşınmanın bir kerelik nakliye maliyeti. */
export const TASINMA_MALIYETI = 3;

export function konutGetir(id: string): KonutTanimi | undefined {
  return KONUTLAR.find((k) => k.id === id);
}

/** Konutun KONUTLAR dizisindeki sırası (0=Nemli Baraka..4=Görkemli Konak); bulunamazsa -1. */
export function konutKademeIndeksi(id: string): number {
  return KONUTLAR.findIndex((k) => k.id === id);
}

/**
 * "konut_sahibi" hayat amacının (hayatAmaclari.ts) ve konut-süreklilik
 * takibinin (stateManager.konutDegistir) kullandığı eşik: Sıcak Ocak ve üstü
 * "sahiden yerleşmiş" sayılır (Faz 9'da 5 kademeli yeni ladder'a göre 3'ten
 * 2'ye çekildi — eski "Taş Ev ve üstü" ile aynı göreli konum).
 */
export const KONUT_SAHIBI_MIN_KADEME = 2;
