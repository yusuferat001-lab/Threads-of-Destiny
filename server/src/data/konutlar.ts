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
 * (createCharacter) her zaman en ucuz kademedir, böylece bu sistemi hiç
 * kullanmayan bir oyuncu için mevcut ekonomi dengesi değişmez.
 *
 * Kademeler arttıkça kira giderek daha dik büyür (üst kademeler oyunun ancak
 * ileri/başarılı aşamalarında karşılanabilir olsun diye), buna karşılık sağlık/
 * mutluluk/ün getirisi kademeli ve her seviyede farklıdır — sağlık en yavaş,
 * mutluluk ve ün en belirgin büyüyen eksenlerdir.
 */
export const KONUTLAR: KonutTanimi[] = [
  {
    id: "basit_barinak",
    ad: "Basit Barınak",
    simge: "🛖",
    aciklama:
      "Neredeyse bedava ama nemli, soğuk ve sağlıksız; burada sürekli yaşamak bedenini, moralini ve itibarını yıpratır. Sadece geçici bir dip.",
    kiraYillik: 1,
    saglikEtkisiYillik: -2,
    mutlulukEtkisiYillik: -2,
    unEtkisiYillik: -2,
  },
  {
    id: "ahsap_ev",
    ad: "Ahşap Ev",
    simge: "🪵",
    aciklama:
      "Sağlam sayılmaz ama bir çatı; yine de bakımsız ve dar — sağlığını, moralini ve adını yavaş yavaş aşındırır. İlk fırsatta gerçek bir eve geçmek gerekir.",
    kiraYillik: 3,
    saglikEtkisiYillik: -2,
    mutlulukEtkisiYillik: -2,
    unEtkisiYillik: -2,
  },
  {
    id: "normal_ev",
    ad: "Normal Ev",
    simge: "🏠",
    aciklama: "Sıradan ama gerçek bir yuva; kendi dört duvarının verdiği küçük bir huzur var. Artık ev seni yıpratmıyor.",
    kiraYillik: 5,
    mutlulukEtkisiYillik: 1,
  },
  {
    id: "tas_ev",
    ad: "Taş Ev",
    simge: "🧱",
    aciklama:
      "Sağlam duvarları ve ayrı odalarıyla gerçek bir konfor sunar; komşuların arasında adın biraz daha anılır. Sofranı da bu seviyeye yakın tutmak (Normal ya da İyi Ye) genelde daha tutarlı bir hayat demek.",
    kiraYillik: 10,
    saglikEtkisiYillik: 1,
    mutlulukEtkisiYillik: 1,
    unEtkisiYillik: 2,
  },
  {
    id: "konak",
    ad: "Konak",
    simge: "🏛️",
    aciklama:
      "Pahalı ama gösterişli; halk arasındaki tanınırlığını, rahatını ve sağlığını yıllar içinde büyütür. Böyle bir çatının altında çöpten geçinmek konu komşuya tuhaf gelir — sofran da haneni yansıtsın.",
    kiraYillik: 19,
    saglikEtkisiYillik: 2,
    mutlulukEtkisiYillik: 2,
    unEtkisiYillik: 4,
  },
  {
    id: "sato",
    ad: "Şato",
    simge: "🏰",
    aciklama:
      "Bölgenin konuştuğu, gerçekten pahalı bir yaşam; duvarları kadar adın da büyür, günlerin çok daha huzurlu ve sağlıklı geçer. Bu kapılardan girip ucuza/çöpten geçinmeye çalışmak inandırıcı olmaz — ancak en iyi sofralarla bir bütün oluşturur.",
    kiraYillik: 32,
    saglikEtkisiYillik: 3,
    mutlulukEtkisiYillik: 4,
    unEtkisiYillik: 6,
  },
];

/**
 * Yeni karakter, sağlık/mutluluk/ün açısından TAMAMEN NÖTR olan "Normal Ev"de
 * başlar (2026-09 ekonomi dengesi): ev ekranını hiç açmayan sıradan bir oyuncu,
 * ilk 15-20 yıl boyunca sessizce sağlık/itibar kaybetmesin diye. Ucuz kademeler
 * (Basit Barınak / Ahşap Ev) hâlâ ceza taşır ama artık daha hafif (-2/yıl).
 */
export const VARSAYILAN_KONUT_ID = "normal_ev";

/** Bir konuttan diğerine taşınmanın bir kerelik nakliye maliyeti. */
export const TASINMA_MALIYETI = 3;

export function konutGetir(id: string): KonutTanimi | undefined {
  return KONUTLAR.find((k) => k.id === id);
}
