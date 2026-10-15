import type { Cag, IsletmeRolTuru } from "../types";

/**
 * Meslek işletmesi profilleri (2026-10, dikey dilim — Tüccar + Zanaatkâr).
 * Kural kodu tek (game/isletme.ts); meslek × çağ yalnız burada isim, kalem
 * listesi ve birkaç sayıyla değişir. Metinler {tr,en} çiftleri olarak gömülüdür
 * (KARANLIK_ISLER deseni): oyuncunun diline göre `ikiDil` ile seçilir.
 */

export interface DilliMetin {
  tr: string;
  en: string;
}

export type UrunKesimi = "temel" | "orta" | "luks";

export interface HatTanimi {
  id: string;
  simge: string;
  ad: DilliMetin;
  kesim: UrunKesimi;
  /** Müşteri (meslek_gucu) başına yıllık talep birimi. */
  talepTabani: number;
  /** Birim alış/üretim maliyeti ve satış fiyatı (enflasyonsuz taban). */
  birimMaliyet: number;
  birimFiyat: number;
  /** Bu hattı açmak için gereken en düşük rütbe. */
  minRutbe: number;
  /** Savaş sürerken talep çarpanı (silah/makine gibi). */
  savasTalep?: number;
}

export interface YatirimTanimi {
  id: string;
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  /** Kademe başına enflasyonsuz fiyat (index 0 = 1. kademe). */
  fiyatlar: number[];
}

export interface RolTanimi {
  tur: IsletmeRolTuru;
  ad: DilliMetin;
}

export interface AdayTaslagi {
  rolTuru: IsletmeRolTuru;
  gecmis: DilliMetin;
  sadakat: [number, number];
  kalite: [number, number];
  taninirlik: [number, number];
}

export interface IsletmeProfili {
  /** "ticaret": mal satın alınır (depo dolana dek); "uretim": yıllık üretim tavanı vardır, maliyet hammaddedir. */
  mod?: "ticaret" | "uretim";
  hatlar: HatTanimi[];
  yatirimlar: YatirimTanimi[];
  roller: RolTanimi[];
  adaylar: AdayTaslagi[];
  /** Otorite figürünün adı (ülke bazlı özel adlar `otoriteOzel`te). */
  otorite: DilliMetin;
  otoriteOzel?: Record<string, DilliMetin>;
}

const TUCCAR_YATIRIMLAR: YatirimTanimi[] = [
  {
    id: "depo",
    simge: "🏚️",
    ad: { tr: "Depo", en: "Warehouse" },
    aciklama: {
      tr: "Stok kapasitesi: 40 → 80 → 140 → 220 birim.",
      en: "Stock capacity: 40 → 80 → 140 → 220 units.",
    },
    fiyatlar: [25, 60, 120],
  },
  {
    id: "dukkan",
    simge: "🏪",
    ad: { tr: "Dükkân", en: "Shop" },
    aciklama: {
      tr: "Her kademe müşteri talebini %5 artırır.",
      en: "Each tier raises customer demand by 5%.",
    },
    fiyatlar: [30, 70, 140],
  },
  {
    id: "kervan",
    simge: "🐪",
    ad: { tr: "Kervan", en: "Caravan" },
    aciklama: {
      tr: "Her kademe alış maliyetini %4 düşürür.",
      en: "Each tier cuts purchase costs by 4%.",
    },
    fiyatlar: [35, 80, 150],
  },
];

const TUCCAR_ORTA_CAG: IsletmeProfili = {
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.6, birimMaliyet: 0.7, birimFiyat: 1.15, minRutbe: 1 },
    { id: "kumas", simge: "🧵", ad: { tr: "Kumaş", en: "Cloth" }, kesim: "orta", talepTabani: 0.9, birimMaliyet: 1.0, birimFiyat: 1.9, minRutbe: 2 },
    { id: "sarap", simge: "🍷", ad: { tr: "Şarap", en: "Wine" }, kesim: "orta", talepTabani: 0.8, birimMaliyet: 1.1, birimFiyat: 2.1, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Silah", en: "Arms" }, kesim: "orta", talepTabani: 0.7, birimMaliyet: 1.2, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.5 },
    { id: "baharat", simge: "🌶️", ad: { tr: "Baharat", en: "Spices" }, kesim: "luks", talepTabani: 0.3, birimMaliyet: 2.2, birimFiyat: 5.0, minRutbe: 3 },
    { id: "kurk", simge: "🦊", ad: { tr: "Kürk ve İpek", en: "Fur & Silk" }, kesim: "luks", talepTabani: 0.35, birimMaliyet: 2.4, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: [
    { tur: "yazi", ad: { tr: "Kâtip", en: "Clerk" } },
    { tur: "satin_alma", ad: { tr: "Kervanbaşı", en: "Caravan Master" } },
    { tur: "satis", ad: { tr: "Tezgâhtar", en: "Stallkeeper" } },
  ],
  adaylar: [
    { rolTuru: "yazi", gecmis: { tr: "papaz okulundan kovulmuş genç bir kâtip", en: "a young clerk expelled from the church school" }, sadakat: [40, 75], kalite: [35, 65], taninirlik: [5, 20] },
    { rolTuru: "yazi", gecmis: { tr: "hesapta ünlü yaşlı bir ciltçi", en: "an old bookbinder famed for his sums" }, sadakat: [60, 90], kalite: [55, 85], taninirlik: [10, 30] },
    { rolTuru: "yazi", gecmis: { tr: "rakip loncadan kaçan bir defterdar", en: "a ledger-keeper who fled a rival guild" }, sadakat: [20, 50], kalite: [60, 90], taninirlik: [15, 40] },
    { rolTuru: "yazi", gecmis: { tr: "geceleri mum ışığında çalışan bir keşiş", en: "a monk who works by candlelight" }, sadakat: [65, 95], kalite: [45, 75], taninirlik: [0, 15] },
    { rolTuru: "satin_alma", gecmis: { tr: "yolları avucunun içi gibi bilen eski bir kervancı", en: "a veteran caravaner who knows every road" }, sadakat: [55, 90], kalite: [55, 90], taninirlik: [20, 50] },
    { rolTuru: "satin_alma", gecmis: { tr: "Ceneviz limanlarından gelmiş bir acente", en: "an agent from the Genoese ports" }, sadakat: [30, 60], kalite: [50, 85], taninirlik: [25, 55] },
    { rolTuru: "satin_alma", gecmis: { tr: "ucuza çalışan, güvenilmez bir katırcı", en: "a cheap, unreliable muleteer" }, sadakat: [15, 45], kalite: [25, 55], taninirlik: [0, 15] },
    { rolTuru: "satin_alma", gecmis: { tr: "Bizans'tan sürgün edilmiş bir ipek tüccarı", en: "an exiled silk merchant from Byzantium" }, sadakat: [25, 60], kalite: [60, 90], taninirlik: [30, 65] },
    { rolTuru: "satis", gecmis: { tr: "pazarın en gürültülü dellalı", en: "the loudest crier in the market" }, sadakat: [35, 70], kalite: [40, 75], taninirlik: [25, 60] },
    { rolTuru: "satis", gecmis: { tr: "lonca şeyhinin yeğeni", en: "the guildmaster's nephew" }, sadakat: [50, 85], kalite: [30, 60], taninirlik: [15, 40] },
    { rolTuru: "satis", gecmis: { tr: "hesapta keskin bir kasap kızı", en: "a butcher's daughter, sharp with numbers" }, sadakat: [55, 90], kalite: [45, 80], taninirlik: [10, 35] },
    { rolTuru: "satis", gecmis: { tr: "dilenirken satıcılığa geçmiş bir külhanbeyi", en: "a street rogue turned peddler" }, sadakat: [10, 40], kalite: [30, 70], taninirlik: [10, 40] },
  ],
  otorite: { tr: "Lonca Reisi", en: "Guildmaster" },
  otoriteOzel: {
    Bizans: { tr: "Eparkhos", en: "Eparch" },
    Selçuklu: { tr: "Muhtesip", en: "Muhtasib" },
  },
};

const TUCCAR_SANAYI: IsletmeProfili = {
  hatlar: [
    { id: "tahil", simge: "🌾", ad: { tr: "Tahıl", en: "Grain" }, kesim: "temel", talepTabani: 1.6, birimMaliyet: 0.7, birimFiyat: 1.15, minRutbe: 1 },
    { id: "komur", simge: "⛏️", ad: { tr: "Kömür", en: "Coal" }, kesim: "temel", talepTabani: 1.5, birimMaliyet: 0.75, birimFiyat: 1.2, minRutbe: 1 },
    { id: "pamuklu", simge: "🧶", ad: { tr: "Pamuklu", en: "Cotton Goods" }, kesim: "orta", talepTabani: 0.9, birimMaliyet: 1.0, birimFiyat: 1.9, minRutbe: 2 },
    { id: "cay_kahve", simge: "☕", ad: { tr: "Çay ve Kahve", en: "Tea & Coffee" }, kesim: "orta", talepTabani: 0.8, birimMaliyet: 1.1, birimFiyat: 2.1, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "orta", talepTabani: 0.7, birimMaliyet: 1.3, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.3 },
    { id: "ipek", simge: "🪭", ad: { tr: "İpek", en: "Silk" }, kesim: "luks", talepTabani: 0.35, birimMaliyet: 2.4, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: TUCCAR_YATIRIMLAR,
  roller: [
    { tur: "yazi", ad: { tr: "Muhasebeci", en: "Bookkeeper" } },
    { tur: "satin_alma", ad: { tr: "Satın Alma Memuru", en: "Purchasing Agent" } },
    { tur: "satis", ad: { tr: "Satış Memuru", en: "Sales Clerk" } },
  ],
  adaylar: [
    { rolTuru: "yazi", gecmis: { tr: "gaz lambası altında defter tutan emekli bir bankacı", en: "a retired banker who keeps books under a gas lamp" }, sadakat: [55, 90], kalite: [50, 80], taninirlik: [5, 25] },
    { rolTuru: "yazi", gecmis: { tr: "borsada para kaybetmiş genç bir hesapçı", en: "a young bookkeeper who lost money on the exchange" }, sadakat: [20, 55], kalite: [50, 80], taninirlik: [5, 25] },
    { rolTuru: "yazi", gecmis: { tr: "kasaba okulunun en parlak öğrencisi", en: "the brightest pupil of the town school" }, sadakat: [55, 90], kalite: [45, 75], taninirlik: [5, 20] },
    { rolTuru: "yazi", gecmis: { tr: "çay saatinde bile defterden başını kaldırmayan biri", en: "someone who won't lift their head from the ledger even at tea" }, sadakat: [65, 95], kalite: [40, 70], taninirlik: [0, 10] },
    { rolTuru: "satin_alma", gecmis: { tr: "liman iskelelerini bilen eski bir gemici", en: "a former sailor who knows the harbour docks" }, sadakat: [50, 85], kalite: [50, 85], taninirlik: [15, 45] },
    { rolTuru: "satin_alma", gecmis: { tr: "demiryolu şirketinden ayrılmış bir sevkiyatçı", en: "a freight clerk who left the railway company" }, sadakat: [40, 75], kalite: [55, 90], taninirlik: [20, 50] },
    { rolTuru: "satin_alma", gecmis: { tr: "her işte payına bakan bir komisyoncu", en: "a commission agent who wants a cut of everything" }, sadakat: [15, 45], kalite: [45, 80], taninirlik: [10, 35] },
    { rolTuru: "satin_alma", gecmis: { tr: "fabrika sahibinin kâhyası", en: "a factory owner's steward" }, sadakat: [60, 95], kalite: [40, 70], taninirlik: [10, 30] },
    { rolTuru: "satis", gecmis: { tr: "vitrin düzenlemekte usta bir kadın", en: "a woman skilled at dressing shop windows" }, sadakat: [55, 90], kalite: [45, 80], taninirlik: [25, 55] },
    { rolTuru: "satis", gecmis: { tr: "gazeteye ilan veren hevesli bir genç", en: "an eager youth who places ads in the newspaper" }, sadakat: [35, 70], kalite: [30, 65], taninirlik: [20, 50] },
    { rolTuru: "satis", gecmis: { tr: "mahallenin tanınmış bakkalının oğlu", en: "the son of the neighbourhood's best-known grocer" }, sadakat: [50, 85], kalite: [35, 70], taninirlik: [30, 60] },
    { rolTuru: "satis", gecmis: { tr: "yalan söylemekte usta bir gezgin satıcı", en: "a travelling salesman gifted at lying" }, sadakat: [10, 40], kalite: [50, 85], taninirlik: [10, 30] },
  ],
  otorite: { tr: "Ticaret Odası Başkanı", en: "Chamber of Commerce President" },
  otoriteOzel: {
    Osmanlı: { tr: "Ticaret Nazırı", en: "Minister of Trade" },
    Rusya: { tr: "Lonca Başkanı", en: "Guild Chairman" },
  },
};


const ZANAATKAR_YATIRIMLAR: YatirimTanimi[] = [
  {
    id: "tezgah",
    simge: "🔨",
    ad: { tr: "Tezgâh ve Aletler", en: "Workbench & Tools" },
    aciklama: {
      tr: "Her kademe yıllık üretim tavanını artırır.",
      en: "Each tier raises your yearly production cap.",
    },
    fiyatlar: [30, 70, 140],
  },
  {
    id: "depo",
    simge: "🏚️",
    ad: { tr: "Depo", en: "Warehouse" },
    aciklama: {
      tr: "Stok kapasitesi: 40 → 80 → 140 → 220 birim.",
      en: "Stock capacity: 40 → 80 → 140 → 220 units.",
    },
    fiyatlar: [25, 60, 120],
  },
  {
    id: "dukkan",
    simge: "🏪",
    ad: { tr: "Vitrin", en: "Showroom" },
    aciklama: {
      tr: "Her kademe müşteri talebini %5 artırır.",
      en: "Each tier raises customer demand by 5%.",
    },
    fiyatlar: [30, 70, 140],
  },
];

const ZANAATKAR_ORTA_CAG: IsletmeProfili = {
  mod: "uretim",
  hatlar: [
    { id: "kap", simge: "🏺", ad: { tr: "Çömlek ve Kap", en: "Pottery & Vessels" }, kesim: "temel", talepTabani: 1.6, birimMaliyet: 0.6, birimFiyat: 1.15, minRutbe: 1 },
    { id: "demir", simge: "⚒️", ad: { tr: "Demir Alet", en: "Iron Tools" }, kesim: "temel", talepTabani: 1.3, birimMaliyet: 0.7, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🪑", ad: { tr: "Mobilya", en: "Furniture" }, kesim: "orta", talepTabani: 0.85, birimMaliyet: 0.9, birimFiyat: 1.9, minRutbe: 2 },
    { id: "silah", simge: "⚔️", ad: { tr: "Kılıç ve Zırh", en: "Swords & Armour" }, kesim: "orta", talepTabani: 0.7, birimMaliyet: 1.0, birimFiyat: 2.3, minRutbe: 2, savasTalep: 1.5 },
    { id: "kuyum", simge: "💍", ad: { tr: "Kuyum ve İşleme", en: "Jewellery & Fine Work" }, kesim: "luks", talepTabani: 0.32, birimMaliyet: 1.9, birimFiyat: 5.0, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: [
    { tur: "yazi", ad: { tr: "Çırak", en: "Apprentice" } },
    { tur: "satin_alma", ad: { tr: "Kalfa", en: "Journeyman" } },
    { tur: "satis", ad: { tr: "Pazarcı", en: "Market Seller" } },
  ],
  adaylar: [
    { rolTuru: "yazi", gecmis: { tr: "köyden gelmiş, işe aç bir çırak", en: "a hungry apprentice from the village" }, sadakat: [55, 90], kalite: [30, 60], taninirlik: [0, 15] },
    { rolTuru: "yazi", gecmis: { tr: "ustasından kaçmış asi bir çırak", en: "a rebellious apprentice who fled his master" }, sadakat: [15, 45], kalite: [45, 75], taninirlik: [5, 25] },
    { rolTuru: "yazi", gecmis: { tr: "elleri her işe yatkın yetim bir oğlan", en: "an orphan boy with nimble hands" }, sadakat: [60, 95], kalite: [40, 70], taninirlik: [0, 10] },
    { rolTuru: "yazi", gecmis: { tr: "ocağı yakıp külü eksik etmeyen titiz bir kız", en: "a meticulous girl who keeps the forge tidy" }, sadakat: [50, 85], kalite: [50, 80], taninirlik: [5, 20] },
    { rolTuru: "satin_alma", gecmis: { tr: "kerestecileri ve demircileri tanıyan bir kalfa", en: "a journeyman who knows every timber and iron dealer" }, sadakat: [50, 85], kalite: [55, 90], taninirlik: [20, 50] },
    { rolTuru: "satin_alma", gecmis: { tr: "başka şehirden loncayı terk etmiş bir kalfa", en: "a journeyman who left a guild in another city" }, sadakat: [25, 55], kalite: [60, 90], taninirlik: [25, 55] },
    { rolTuru: "satin_alma", gecmis: { tr: "ucuza çalışan, hammaddeden çalan bir kalfa", en: "a cheap journeyman who skims on materials" }, sadakat: [10, 40], kalite: [30, 60], taninirlik: [0, 20] },
    { rolTuru: "satin_alma", gecmis: { tr: "usta işi bilen yaşlı bir kalfa", en: "an old journeyman of true craft" }, sadakat: [65, 95], kalite: [50, 80], taninirlik: [10, 35] },
    { rolTuru: "satis", gecmis: { tr: "pazarın en gürültülü seyyar satıcısı", en: "the market's loudest peddler" }, sadakat: [35, 70], kalite: [40, 75], taninirlik: [25, 60] },
    { rolTuru: "satis", gecmis: { tr: "lonca reisinin kuzeni", en: "the guildmaster's cousin" }, sadakat: [50, 85], kalite: [30, 60], taninirlik: [20, 45] },
    { rolTuru: "satis", gecmis: { tr: "her müşteriyi adıyla tanıyan bir dul", en: "a widow who knows every customer by name" }, sadakat: [60, 95], kalite: [45, 80], taninirlik: [15, 40] },
    { rolTuru: "satis", gecmis: { tr: "hanlarda mal tanıtan bir külhanbeyi", en: "a rogue who hawks wares at the inns" }, sadakat: [10, 40], kalite: [35, 75], taninirlik: [10, 35] },
  ],
  otorite: { tr: "Loncabaşı", en: "Guildmaster" },
  otoriteOzel: {
    Selçuklu: { tr: "Ahi Baba", en: "Ahi Baba" },
  },
};

const ZANAATKAR_SANAYI: IsletmeProfili = {
  mod: "uretim",
  hatlar: [
    { id: "ayakkabi", simge: "👞", ad: { tr: "Ayakkabı ve Deri", en: "Shoes & Leather" }, kesim: "temel", talepTabani: 1.5, birimMaliyet: 0.65, birimFiyat: 1.15, minRutbe: 1 },
    { id: "ev_esyasi", simge: "🍳", ad: { tr: "Ev Eşyası", en: "Household Goods" }, kesim: "temel", talepTabani: 1.4, birimMaliyet: 0.7, birimFiyat: 1.2, minRutbe: 1 },
    { id: "mobilya", simge: "🛋️", ad: { tr: "Mobilya ve Cam", en: "Furniture & Glass" }, kesim: "orta", talepTabani: 0.85, birimMaliyet: 0.95, birimFiyat: 1.9, minRutbe: 2 },
    { id: "makine", simge: "⚙️", ad: { tr: "Makine Parçası", en: "Machine Parts" }, kesim: "orta", talepTabani: 0.7, birimMaliyet: 1.1, birimFiyat: 2.5, minRutbe: 2, savasTalep: 1.3 },
    { id: "saat", simge: "⌚", ad: { tr: "Saat ve Mücevher", en: "Watches & Jewellery" }, kesim: "luks", talepTabani: 0.33, birimMaliyet: 2.0, birimFiyat: 5.2, minRutbe: 3 },
  ],
  yatirimlar: ZANAATKAR_YATIRIMLAR,
  roller: [
    { tur: "yazi", ad: { tr: "Ustabaşı", en: "Foreman" } },
    { tur: "satin_alma", ad: { tr: "Hammadde Memuru", en: "Materials Clerk" } },
    { tur: "satis", ad: { tr: "Satış Elemanı", en: "Salesperson" } },
  ],
  adaylar: [
    { rolTuru: "yazi", gecmis: { tr: "tezgâhta gençliğini tüketmiş emektar bir ustabaşı", en: "a veteran foreman who spent his youth at the bench" }, sadakat: [60, 95], kalite: [50, 80], taninirlik: [5, 25] },
    { rolTuru: "yazi", gecmis: { tr: "sendikadan atılmış öfkeli bir işçi", en: "an angry worker expelled from the union" }, sadakat: [10, 40], kalite: [45, 80], taninirlik: [5, 25] },
    { rolTuru: "yazi", gecmis: { tr: "makine başında gece vardiyası çeken bir genç", en: "a youth who works the night shift on the machines" }, sadakat: [50, 85], kalite: [35, 65], taninirlik: [0, 15] },
    { rolTuru: "yazi", gecmis: { tr: "teknik okuldan yeni çıkmış, hırslı bir kalfa", en: "an ambitious graduate of the technical school" }, sadakat: [40, 75], kalite: [55, 85], taninirlik: [5, 25] },
    { rolTuru: "satin_alma", gecmis: { tr: "demir ve kömür tüccarlarının dostu bir memur", en: "a clerk on friendly terms with iron and coal dealers" }, sadakat: [45, 80], kalite: [55, 90], taninirlik: [15, 45] },
    { rolTuru: "satin_alma", gecmis: { tr: "her kalemde komisyon isteyen bir acente", en: "an agent who wants a commission on everything" }, sadakat: [10, 45], kalite: [45, 80], taninirlik: [10, 35] },
    { rolTuru: "satin_alma", gecmis: { tr: "liman ambarlarını bilen eski bir hamal ustası", en: "a former stevedore who knows the dock warehouses" }, sadakat: [55, 90], kalite: [40, 70], taninirlik: [10, 30] },
    { rolTuru: "satin_alma", gecmis: { tr: "fabrika sahibinin kayıp kuzeni", en: "the factory owner's black-sheep cousin" }, sadakat: [20, 55], kalite: [50, 85], taninirlik: [20, 50] },
    { rolTuru: "satis", gecmis: { tr: "vitrin düzenlemekte usta bir kadın", en: "a woman skilled at dressing shop windows" }, sadakat: [55, 90], kalite: [45, 80], taninirlik: [25, 55] },
    { rolTuru: "satis", gecmis: { tr: "gazeteye ilan veren hevesli bir genç", en: "an eager youth who places ads in the newspaper" }, sadakat: [35, 70], kalite: [30, 65], taninirlik: [20, 50] },
    { rolTuru: "satis", gecmis: { tr: "mahallenin tanınmış bakkalının oğlu", en: "the son of the neighbourhood's best-known grocer" }, sadakat: [50, 85], kalite: [35, 70], taninirlik: [30, 60] },
    { rolTuru: "satis", gecmis: { tr: "kapı kapı dolaşan inatçı bir gezgin satıcı", en: "a stubborn door-to-door salesman" }, sadakat: [15, 45], kalite: [50, 85], taninirlik: [10, 30] },
  ],
  otorite: { tr: "Sanayi Odası Başkanı", en: "Industrial Chamber President" },
  otoriteOzel: {
    Osmanlı: { tr: "Esnaf Kethüdası", en: "Craftsmen's Steward" },
  },
};

const PROFILLER: Partial<Record<string, Record<Cag, IsletmeProfili>>> = {
  Tüccar: { "Orta Çağ": TUCCAR_ORTA_CAG, "Sanayi Devrimi": TUCCAR_SANAYI },
  Zanaatkâr: { "Orta Çağ": ZANAATKAR_ORTA_CAG, "Sanayi Devrimi": ZANAATKAR_SANAYI },
};

/** Meslek işletmesi tanımlıysa profili döner; tanımsız meslekler eski maaş sistemiyle çalışır. */
export function isletmeProfiliGetir(meslek: string, cag: Cag): IsletmeProfili | null {
  return PROFILLER[meslek]?.[cag] ?? null;
}

export function isletmeMeslegiMi(meslek: string): boolean {
  return !!PROFILLER[meslek];
}

export function hatTanimiGetir(profil: IsletmeProfili, id: string): HatTanimi | undefined {
  return profil.hatlar.find((h) => h.id === id);
}

export function yatirimTanimiGetir(profil: IsletmeProfili, id: string): YatirimTanimi | undefined {
  return profil.yatirimlar.find((y) => y.id === id);
}

export function rolAdiGetir(profil: IsletmeProfili, tur: IsletmeRolTuru): DilliMetin {
  return profil.roller.find((r) => r.tur === tur)?.ad ?? { tr: tur, en: tur };
}

/**
 * Tek otorite figürünün adı (meslek × çağ × ülke/din). İşletme profili olmayan
 * meslekler (Zanaatkâr/Din Adamı/Asker — henüz dilimlenmedi) de bu tabloyu kullanır.
 * Dönen değer kanonik Türkçe addır (K() ile çevrilir).
 */
const OTORITE_TABLOSU: Record<string, Record<Cag, { genel: string; ozel?: Record<string, string> }>> = {
  Tüccar: {
    "Orta Çağ": { genel: "Lonca Reisi", ozel: { Bizans: "Eparkhos", Selçuklu: "Muhtesip" } },
    "Sanayi Devrimi": { genel: "Ticaret Odası Başkanı", ozel: { Osmanlı: "Ticaret Nazırı", Rusya: "Lonca Başkanı" } },
  },
  Zanaatkâr: {
    "Orta Çağ": { genel: "Loncabaşı", ozel: { Selçuklu: "Ahi Baba" } },
    "Sanayi Devrimi": { genel: "Sanayi Odası Başkanı", ozel: { Osmanlı: "Esnaf Kethüdası" } },
  },
  "Din Adamı": {
    "Orta Çağ": { genel: "Piskopos", ozel: { Bizans: "Metropolit", Selçuklu: "Kadı" } },
    "Sanayi Devrimi": { genel: "Piskopos", ozel: { Rusya: "Metropolit", Osmanlı: "Müftü" } },
  },
  Asker: {
    "Orta Çağ": { genel: "Kumandan", ozel: { Selçuklu: "Subaşı" } },
    "Sanayi Devrimi": { genel: "Albay", ozel: { Osmanlı: "Paşa", Rusya: "General" } },
  },
};

export function otoriteUnvaniGetir(meslek: string, cag: Cag, bolge: string): string | null {
  const t = OTORITE_TABLOSU[meslek]?.[cag];
  if (!t) return null;
  return t.ozel?.[bolge] ?? t.genel;
}

/** Otorite figürünün iki dilli adı (işletme ekranı için). */
export function otoriteAdiGetir(meslek: string, cag: Cag, bolge: string): DilliMetin | null {
  const profil = isletmeProfiliGetir(meslek, cag);
  if (!profil) return null;
  return profil.otoriteOzel?.[bolge] ?? profil.otorite;
}
