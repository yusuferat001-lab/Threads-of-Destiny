import { Cag } from "../types";

/**
 * Sosyalleşme ekranındaki TUR HARCAMAYAN aksiyonlar (2026-09). Mekân→olay
 * yönlendirmesinin yanında, oyuncunun ekrandan çıkmadan yapabildiği küçük
 * etkileşimler: bölge/çağa uygun isimli bir içki içmek, deliyle konuşmak,
 * sadaka vermek, kulak kabartmak, birine içki ısmarlamak, fal baktırmak.
 *
 * Etkiler jitter'sız ve doğrudan (mini oyunlarla aynı desen) — sayılar
 * gameEngine.sosyallesmeAksiyonYap içinde açıktır. Her aksiyon kendi
 * cooldown'ı (oyun yılı) dolana kadar tekrar yapılamaz.
 */

export interface IcecekTanimi {
  id: string;
  ad: string; // TR — betimleyici ("bir sürahi kırmızı şarap")
  adEn: string;
  alkollu: boolean;
  /** İslam kültürlü bölgede yasak içki: seçilirse ahlak/şöhret cezası da uygulanır. */
  gizli?: boolean;
}

const OC = "Orta Çağ";
const SD = "Sanayi Devrimi";

/** `${cag}|${bolge}` -> o kültüre uygun içecekler. */
export const BOLGE_ICECEKLERI: Record<string, IcecekTanimi[]> = {
  [`${OC}|Fransa`]: [
    { id: "kirmizi_sarap", ad: "bir sürahi kırmızı şarap", adEn: "a jug of red wine", alkollu: true },
    { id: "elma_sirasi", ad: "bir tas elma şırası", adEn: "a bowl of apple cider", alkollu: false },
  ],
  [`${OC}|Kutsal Roma`]: [
    { id: "arpa_birasi", ad: "bir maşrapa arpa birası", adEn: "a tankard of barley ale", alkollu: true },
    { id: "bal_likoru", ad: "bir kadeh bal likörü", adEn: "a cup of mead", alkollu: true },
  ],
  [`${OC}|Bizans`]: [
    { id: "retsina", ad: "bir kadeh reçineli şarap", adEn: "a cup of resinated wine", alkollu: true },
    { id: "konditon", ad: "sıcak baharatlı şarap (konditon)", adEn: "hot spiced wine (conditum)", alkollu: true },
  ],
  [`${OC}|Selçuklu`]: [
    { id: "boza", ad: "bir tas boza", adEn: "a bowl of boza", alkollu: false },
    { id: "serbet", ad: "bir bardak gül şerbeti", adEn: "a glass of rose sherbet", alkollu: false },
    { id: "gizli_sarap", ad: "gizlice bir kadeh şarap", adEn: "a secret cup of wine", alkollu: true, gizli: true },
  ],
  [`${OC}|Eyyubiler`]: [
    { id: "boza", ad: "bir tas boza", adEn: "a bowl of boza", alkollu: false },
    { id: "serbet", ad: "bir bardak tamr hindi şerbeti", adEn: "a glass of tamarind sherbet", alkollu: false },
    { id: "gizli_sarap", ad: "gizlice bir kadeh şarap", adEn: "a secret cup of wine", alkollu: true, gizli: true },
  ],
  [`${SD}|İngiltere`]: [
    { id: "porter", ad: "bir bardak porter birası", adEn: "a pint of porter", alkollu: true },
    { id: "cin_punc", ad: "sıcak bir cin punç", adEn: "a hot gin punch", alkollu: true },
  ],
  [`${SD}|Fransa`]: [
    { id: "kirmizi_sarap", ad: "bir kadeh kırmızı şarap", adEn: "a glass of red wine", alkollu: true },
    { id: "absent", ad: "bir kadeh absent", adEn: "a glass of absinthe", alkollu: true },
  ],
  [`${SD}|Osmanlı`]: [
    { id: "salep", ad: "sıcak bir salep", adEn: "a hot salep", alkollu: false },
    { id: "boza", ad: "bir tas boza", adEn: "a bowl of boza", alkollu: false },
    { id: "gizli_raki", ad: "gizlice bir kadeh rakı", adEn: "a secret glass of raki", alkollu: true, gizli: true },
  ],
  [`${SD}|Rusya`]: [
    { id: "votka", ad: "bir kadeh votka", adEn: "a shot of vodka", alkollu: true },
    { id: "kvas", ad: "bir bardak kvas", adEn: "a glass of kvass", alkollu: false },
  ],
};

const YEDEK_ICECEKLER: IcecekTanimi[] = [
  { id: "yerel_icki", ad: "yerel bir içki", adEn: "a local drink", alkollu: true },
  { id: "sulu_sira", ad: "sulandırılmış şıra", adEn: "watered-down must", alkollu: false },
];

export function bolgeIcecekleri(cag: Cag, bolge: string): IcecekTanimi[] {
  return BOLGE_ICECEKLERI[`${cag}|${bolge}`] ?? YEDEK_ICECEKLER;
}

export function icecekTanimiGetir(cag: Cag, bolge: string, id: string): IcecekTanimi | undefined {
  return bolgeIcecekleri(cag, bolge).find((i) => i.id === id);
}

/** Tur-harcamayan aksiyon türleri (içki hariç — o `icki:<id>` biçimindedir). */
export type SosyalAksiyonTuru =
  | "deli"
  | "sadaka"
  | "kulak"
  | "ismarla"
  | "fal"
  | "hikaye_anlat"
  | "muzik_dinle"
  | "yerliye_sor"
  | "bahis_izle";

/** Cooldown = bu aksiyondan sonra kaç oyun yılı geçmeden tekrar yapılamayacağı. Anahtar "icki" tüm içecekler için ortaktır. */
export const AKSIYON_COOLDOWN: Record<string, number> = {
  icki: 1,
  kulak: 1,
  sadaka: 2,
  yerliye_sor: 2,
  muzik_dinle: 2,
  deli: 3,
  ismarla: 3,
  hikaye_anlat: 3,
  bahis_izle: 3,
  fal: 4,
};

/**
 * Havuz-rotasyonu (2026-09 sonu, kullanıcı isteği: "her tur değişsin hep aynı
 * şeyler olmasın, sayısını arttır, aynı anda 3 etkinlik olsun"). 9 aksiyonun
 * hepsi burada tanımlı ama oyuncuya HER ZAMAN yalnız `AKSIYON_ROTASYON_GOSTERIM`
 * (3) tanesi gösterilir — hangi 3'ünün gösterildiği karaktere ve oyun yılına
 * göre değişen, deterministik bir rotasyondur (bkz. gameEngine.ts
 * `aktifAksiyonRotasyonu`). Aynı karakter için `AKSIYON_ROTASYON_PERIYODU_YIL`
 * yıl boyunca sabit kalır, sonra havuzdan yeni bir 3'lü seçilir.
 */
export const AKSIYON_ROTASYON_HAVUZU: SosyalAksiyonTuru[] = [
  "deli",
  "sadaka",
  "kulak",
  "ismarla",
  "fal",
  "hikaye_anlat",
  "muzik_dinle",
  "yerliye_sor",
  "bahis_izle",
];
export const AKSIYON_ROTASYON_GOSTERIM = 3;
export const AKSIYON_ROTASYON_PERIYODU_YIL = 4;

export interface SosyalAksiyonTanimi {
  id: SosyalAksiyonTuru;
  simge: string;
  ad: string;
  adEn: string;
  aciklama: string;
  aciklamaEn: string;
  /** Taban maliyet (enflasyonla ölçeklenir); 0 = bedava. `sadaka` iki kademelidir, taban aşağıda. */
  tabanFiyat: number;
  /** true ise yalnız alkollü bir mekân seçiliyken yapılabilir. */
  alkolluMekanGerekir?: boolean;
}

export const SOSYAL_AKSIYONLAR: SosyalAksiyonTanimi[] = [
  {
    id: "deli",
    simge: "🃏",
    ad: "Deliyle konuş",
    adEn: "Talk to the fool",
    aciklama: "Meydanın delisine bir bozukluk ver, ağzından çıkacak şeyi dinle.",
    aciklamaEn: "Slip the town fool a coin and listen to whatever comes out.",
    tabanFiyat: 2,
  },
  {
    id: "sadaka",
    simge: "🪙",
    ad: "Sadaka ver",
    adEn: "Give alms",
    aciklama: "Kesenden çıkar, muhtaçlara dağıt. Vicdanın rahatlar.",
    aciklamaEn: "Empty a little of your purse to the needy. Eases the conscience.",
    tabanFiyat: 4,
  },
  {
    id: "kulak",
    simge: "👂",
    ad: "Kulak kabart",
    adEn: "Eavesdrop",
    aciklama: "Yan masaların dedikodusuna, çarşının söylentisine kulak ver. Bedava.",
    aciklamaEn: "Lean into the neighbouring tables' gossip and the market's rumours. Free.",
    tabanFiyat: 0,
  },
  {
    id: "ismarla",
    simge: "🍻",
    ad: "Birine içki ısmarla",
    adEn: "Buy a round",
    aciklama: "Bütün masaya bir tur ısmarla; kadehler senin şerefine kalksın.",
    aciklamaEn: "Stand the whole table a round; let the cups rise in your name.",
    tabanFiyat: 7,
    alkolluMekanGerekir: true,
  },
  {
    id: "fal",
    simge: "🔮",
    ad: "Fal baktır",
    adEn: "Have your fortune told",
    aciklama: "Falcıya avucunu aç; kaderinden bir kırıntı duy.",
    aciklamaEn: "Open your palm to the fortune teller; hear a scrap of your fate.",
    tabanFiyat: 5,
  },
  {
    id: "hikaye_anlat",
    simge: "📖",
    ad: "Hikaye anlat",
    adEn: "Tell a story",
    aciklama: "Meydandakilere kendi başından geçen (ya da uydurduğun) bir hikaye anlat.",
    aciklamaEn: "Tell the crowd a story from your own life — or one you make up.",
    tabanFiyat: 6,
  },
  {
    id: "muzik_dinle",
    simge: "🎻",
    ad: "Ozanı dinle",
    adEn: "Listen to the minstrel",
    aciklama: "Gezgin bir ozanın türküsüne kulak ver, bir an her şeyi unut.",
    aciklamaEn: "Listen to a wandering minstrel's tune and forget everything for a moment.",
    tabanFiyat: 3,
  },
  {
    id: "yerliye_sor",
    simge: "🗺️",
    ad: "Yerliye bölgeyi sor",
    adEn: "Ask a local about the region",
    aciklama: "Yerlilerden birine küçük bir bahşiş verip bölgeyi, dedikoduları sor.",
    aciklamaEn: "Slip a local a small tip and ask about the region and its gossip.",
    tabanFiyat: 6,
  },
  {
    id: "bahis_izle",
    simge: "🥊",
    ad: "Sokak dövüşüne bahis oyna",
    adEn: "Bet on a street brawl",
    aciklama: "Meydandaki dövüşe/koşuya küçük bir bahis koy. Kaçak ama eğlenceli.",
    aciklamaEn: "Place a small bet on the brawl or race in the square. Illicit but fun.",
    tabanFiyat: 5,
  },
];

export function sosyalAksiyonTanimiGetir(id: string): SosyalAksiyonTanimi | undefined {
  return SOSYAL_AKSIYONLAR.find((a) => a.id === id);
}
