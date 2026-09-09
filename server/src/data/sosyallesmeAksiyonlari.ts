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
export type SosyalAksiyonTuru = "deli" | "sadaka" | "kulak" | "ismarla" | "fal";

/** Cooldown = bu aksiyondan sonra kaç oyun yılı geçmeden tekrar yapılamayacağı. Anahtar "icki" tüm içecekler için ortaktır. */
export const AKSIYON_COOLDOWN: Record<string, number> = {
  icki: 1,
  kulak: 1,
  sadaka: 2,
  deli: 3,
  ismarla: 3,
  fal: 4,
};

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
    tabanFiyat: 1,
  },
  {
    id: "sadaka",
    simge: "🪙",
    ad: "Sadaka ver",
    adEn: "Give alms",
    aciklama: "Kesenden çıkar, muhtaçlara dağıt. Vicdanın rahatlar.",
    aciklamaEn: "Empty a little of your purse to the needy. Eases the conscience.",
    tabanFiyat: 2,
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
    tabanFiyat: 4,
    alkolluMekanGerekir: true,
  },
  {
    id: "fal",
    simge: "🔮",
    ad: "Fal baktır",
    adEn: "Have your fortune told",
    aciklama: "Falcıya avucunu aç; kaderinden bir kırıntı duy.",
    aciklamaEn: "Open your palm to the fortune teller; hear a scrap of your fate.",
    tabanFiyat: 3,
  },
];

export function sosyalAksiyonTanimiGetir(id: string): SosyalAksiyonTanimi | undefined {
  return SOSYAL_AKSIYONLAR.find((a) => a.id === id);
}
