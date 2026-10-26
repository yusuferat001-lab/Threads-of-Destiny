/**
 * Piyasa hamleleri (§45 v8.1): rakibin ve küçük esnaf havuzunun yıl içinde yaptığı,
 * oyuncuya haber olarak gösterilen rastgele olaylar. Etkiler grubun KENDİ müşterisinin
 * yüzdesidir; kazanç/kayıp diğer gruplardan büyüklükleriyle orantılı dağıtılır
 * (game/piyasa.ts `musteriKaydir`). `hedef:"oyuncu"` olanlar oyuncunun müşterisinin
 * yüzdesi kadar DOĞRUDAN oyuncudan alınır (rakibin saldırgan hamlesi).
 */

export type HamleYonu = "buyur" | "kuculur";

export interface PiyasaHamlesi {
  id: string;
  simge: string;
  yon: HamleYonu;
  /** Grubun kendi müşterisinin (hedefliyse oyuncunun müşterisinin) yüzdesi, kesir olarak [min,max]. */
  yuzde: [number, number];
  /** Doğrudan oyuncuyu hedefler (rakip büyürken müşteri YALNIZ oyuncudan gelir). */
  hedef?: "oyuncu";
  /** Yalnız işletmeli meslekler (fiyat/ürün/hammadde anlatır). */
  isletmeli?: boolean;
  /** Oyuncunun açık hatlarından birinin adı {urun} yerine konur. */
  urunlu?: boolean;
  /** Oyuncunun fiyatı zaten ucuzsa etki yarıya iner. */
  fiyatKarsiligi?: boolean;
  /** Süreli piyasa etkisi (müşteri dışı). */
  etki?: { tur: "alis_maliyeti" | "talep"; deger: number; sureYil: number };
  agirlik?: number;
  metin: { tr: string; en: string };
  /** Din Adamı (cemaat) için anlatım; işletmeli hamlelerde yoksa Din Adamı'nda bu hamle hiç çıkmaz. */
  dinMetin?: { tr: string; en: string };
}

export const RAKIP_HAMLELERI: PiyasaHamlesi[] = [
  // ── Rakip büyür ──
  {
    id: "fiyat_kirdi", simge: "🏷️", yon: "buyur", yuzde: [0.025, 0.04], hedef: "oyuncu", isletmeli: true, fiyatKarsiligi: true,
    metin: {
      tr: "{rakip} fiyatları kırdı; müşterilerin bir kısmı ona kaydı.",
      en: "{rakip} slashed prices; some of your customers drifted over.",
    },

    dinMetin: {
      tr: "{rakip} ücretsiz yemek ve ayin dağıtmaya başladı; bazı inananların ona kaydı.",
      en: "{rakip} began handing out free meals and rites; some of your flock drifted to them.",
    },
  },
  {
    id: "urun_satmaya_basladi", simge: "🆕", yon: "buyur", yuzde: [0.02, 0.03], hedef: "oyuncu", isletmeli: true, urunlu: true,
    metin: {
      tr: "{rakip} de artık {urun} satmaya başladı; alıcılar bölündü.",
      en: "{rakip} now sells {urun} too; buyers are split.",
    },

    dinMetin: {
      tr: "{rakip} de senin vaaz konularına el attı; dinleyiciler bölündü.",
      en: "{rakip} took up your sermon themes too; listeners are split.",
    },
  },
  {
    id: "yeni_hat", simge: "🏪", yon: "buyur", yuzde: [0.03, 0.05], isletmeli: true,
    metin: {
      tr: "{rakip} yeni bir ürün çeşidi açtı; çarşıda konuşuluyor.",
      en: "{rakip} opened a new line of goods; the market is talking.",
    },

    dinMetin: {
      tr: "{rakip} yeni bir ayin düzeni kurdu; halk konuşuyor.",
      en: "{rakip} set up a new order of worship; the people are talking.",
    },
  },
  {
    id: "reklam", simge: "📣", yon: "buyur", yuzde: [0.02, 0.03], isletmeli: true,
    metin: {
      tr: "{rakip} büyük bir tanıtım kampanyası yaptı.",
      en: "{rakip} ran a big promotion campaign.",
    },

    dinMetin: {
      tr: "{rakip} büyük bir vaaz turu düzenledi.",
      en: "{rakip} held a big preaching tour.",
    },
  },
  {
    id: "usta_katti", simge: "🧑‍🔧", yon: "buyur", yuzde: [0.015, 0.025], isletmeli: true,
    metin: {
      tr: "{rakip} usta bir kalfa kattı; işleri hızlandı.",
      en: "{rakip} hired a skilled journeyman; business picked up.",
    },

    dinMetin: {
      tr: "{rakip} ünlü bir vaiz kattı; ibadethanesi dolup taşıyor.",
      en: "{rakip} recruited a famed preacher; their sanctuary is overflowing.",
    },
  },
  {
    id: "imtiyaz", simge: "📜", yon: "buyur", yuzde: [0.03, 0.05], isletmeli: true,
    metin: {
      tr: "{rakip} şehir yöneticisinden bir imtiyaz kopardı.",
      en: "{rakip} wrested a concession from the city governor.",
    },

    dinMetin: {
      tr: "{rakip} şehir yöneticisinden bir vakıf imtiyazı kopardı.",
      en: "{rakip} wrested a foundation concession from the city governor.",
    },
  },
  {
    id: "yeni_destekci", simge: "🤝", yon: "buyur", yuzde: [0.025, 0.04],
    metin: {
      tr: "{rakip} bölgede yeni destekçiler kazandı.",
      en: "{rakip} won new supporters in the region.",
    },
  },
  {
    id: "yoneticinin_gozune", simge: "🎩", yon: "buyur", yuzde: [0.03, 0.045],
    metin: {
      tr: "{rakip} şehir yöneticisinin gözüne girdi.",
      en: "{rakip} caught the city governor's eye.",
    },
  },
  {
    id: "hammadde_toplu", simge: "📦", yon: "buyur", yuzde: [0.01, 0.015], isletmeli: true,
    etki: { tur: "alis_maliyeti", deger: 0.04, sureYil: 2 },
    metin: {
      tr: "{rakip} hammaddeyi toplu aldı; senin alış maliyetin yükseldi.",
      en: "{rakip} bought raw goods in bulk; your purchase costs went up.",
    },
  },
  // ── Rakip küçülür ──
  {
    id: "mal_bozuldu", simge: "🥀", yon: "kuculur", yuzde: [0.025, 0.035], isletmeli: true,
    metin: {
      tr: "{rakip}'in malları bozuldu, rafları boşaldı.",
      en: "{rakip}'s goods spoiled and the shelves emptied.",
    },

    dinMetin: {
      tr: "{rakip}'in kumbarası boşaldı, adakları azaldı.",
      en: "{rakip}'s offering box ran dry; their donations dwindled.",
    },
  },
  {
    id: "kalitesiz_mal", simge: "😠", yon: "kuculur", yuzde: [0.04, 0.055], isletmeli: true,
    metin: {
      tr: "{rakip} kalitesiz mal skandalı yaşadı; halk ondan uzaklaştı.",
      en: "{rakip} was caught in a bad-goods scandal; people turned away.",
    },

    dinMetin: {
      tr: "{rakip} yolsuzluk söylentisiyle anıldı; halk ondan uzaklaştı.",
      en: "{rakip} was hit by corruption rumours; people turned away.",
    },
  },
  {
    id: "yangin", simge: "🔥", yon: "kuculur", yuzde: [0.03, 0.04], isletmeli: true,
    metin: {
      tr: "{rakip}'in dükkânında hırsızlık ve yangın çıktı.",
      en: "{rakip}'s shop suffered a theft and a fire.",
    },

    dinMetin: {
      tr: "{rakip}'in ibadethanesinde hırsızlık ve yangın çıktı.",
      en: "{rakip}'s sanctuary suffered a theft and a fire.",
    },
  },
  {
    id: "kalfa_ayrildi", simge: "🚪", yon: "kuculur", yuzde: [0.015, 0.025], isletmeli: true,
    metin: {
      tr: "{rakip}'in baş kalfası ayrıldı.",
      en: "{rakip}'s head journeyman quit.",
    },

    dinMetin: {
      tr: "{rakip}'in baş vaizi ayrıldı.",
      en: "{rakip}'s head preacher quit.",
    },
  },
  {
    id: "vergi_ceza", simge: "⚖️", yon: "kuculur", yuzde: [0.025, 0.035],
    metin: {
      tr: "{rakip} vergi cezasına çarptırıldı.",
      en: "{rakip} was hit with a tax penalty.",
    },
  },
  {
    id: "tedarikci_kavga", simge: "💢", yon: "kuculur", yuzde: [0.02, 0.03], isletmeli: true,
    metin: {
      tr: "{rakip} tedarikçisiyle kavga etti; rafları yarı boş kaldı.",
      en: "{rakip} fell out with a supplier; shelves are half empty.",
    },

    dinMetin: {
      tr: "{rakip} yerel yöneticiyle kavga etti; cemaati dağıldı.",
      en: "{rakip} fell out with the local governor; their congregation scattered.",
    },
  },
  {
    id: "skandal", simge: "🗞️", yon: "kuculur", yuzde: [0.03, 0.045],
    metin: {
      tr: "{rakip} bir skandalla anıldı.",
      en: "{rakip} was caught up in a scandal.",
    },
  },
  {
    id: "destekci_kaybi", simge: "💔", yon: "kuculur", yuzde: [0.02, 0.03],
    metin: {
      tr: "{rakip} yakın destekçilerinden birini kaybetti.",
      en: "{rakip} lost one of his close supporters.",
    },
  },
  {
    id: "hammadde_anlasma", simge: "🧾", yon: "kuculur", yuzde: [0.01, 0.015], isletmeli: true,
    etki: { tur: "alis_maliyeti", deger: -0.03, sureYil: 2 },
    metin: {
      tr: "{rakip}'ten kopan bir tedarikçi sana döndü; alış maliyetin düştü.",
      en: "A supplier who left {rakip} came to you; your purchase costs dropped.",
    },
  },
  {
    id: "kampanya_olumlu", simge: "🎪", yon: "buyur", yuzde: [0.005, 0.01], isletmeli: true,
    etki: { tur: "talep", deger: 0.05, sureYil: 1 },
    metin: {
      tr: "Bölgede bir panayır kuruldu; bu yıl talep artıyor.",
      en: "A fair opened in the region; demand is up this year.",
    },

    dinMetin: {
      tr: "Bölgede büyük bir bayram var; bu yıl bağışlar artıyor.",
      en: "A great feast has come to the region; donations are up this year.",
    },
  },
  {
    id: "kampanya_olumsuz", simge: "🌧️", yon: "kuculur", yuzde: [0.005, 0.01], isletmeli: true,
    etki: { tur: "talep", deger: -0.05, sureYil: 1 },
    metin: {
      tr: "Çarşıda alışveriş durgun; bu yıl talep düşüyor.",
      en: "The market is sluggish; demand is down this year.",
    },

    dinMetin: {
      tr: "Halk yoksulluktan yakınıyor; bu yıl bağışlar düşüyor.",
      en: "The people complain of hardship; donations are down this year.",
    },
  },
];

export interface KucukOlay {
  id: string;
  simge: string;
  /** Küçük esnaf havuzunun kendi müşterisine göre yüzde değişimi (işaretli). */
  yuzde: [number, number];
  metin: { tr: string; en: string };
  dinMetin?: { tr: string; en: string };
}

export const KUCUK_OLAYLARI: KucukOlay[] = [
  { id: "yeni_dukkan", simge: "🏠", yuzde: [0.015, 0.025], metin: { tr: "Mahalleye yeni bir dükkân açıldı; herkesten pay aldı.", en: "A new shop opened in the district and took a share from everyone." }, dinMetin: { tr: "Mahalleye yeni bir ibadet yeri açıldı; herkesten pay aldı.", en: "A new place of worship opened in the district and drew from everyone." } },
  { id: "kooperatif", simge: "🤲", yuzde: [0.02, 0.03], metin: { tr: "Küçük esnaf birleşip ucuza satmaya başladı.", en: "Small traders banded together and began selling cheap." }, dinMetin: { tr: "Küçük cemaatler birleşip ortak yardım dağıtmaya başladı.", en: "Small congregations banded together to hand out aid." } },
  { id: "iflas", simge: "📉", yuzde: [-0.035, -0.025], metin: { tr: "Küçük esnaftan biri iflas etti; müşterileri dağıldı.", en: "A small trader went bankrupt; his customers scattered." }, dinMetin: { tr: "Küçük bir cemaat dağıldı; mensupları etrafa saçıldı.", en: "A small congregation broke up; its members scattered." } },
  { id: "gezgin_tuccar", simge: "🧳", yuzde: [0.01, 0.02], metin: { tr: "Şehre bir gezgin satıcı geldi; müşteri çekti.", en: "A travelling seller came to town and drew customers." }, dinMetin: { tr: "Şehre gezgin bir vaiz geldi; dinleyici çekti.", en: "A travelling preacher came to town and drew listeners." } },
  { id: "carsi_yandi", simge: "🔥", yuzde: [-0.03, -0.02], metin: { tr: "Semt çarşısı yandı; esnafın müşterisi azaldı.", en: "The district bazaar burned down; small traders lost customers." }, dinMetin: { tr: "Semt çarşısı yandı; halkın bağış gücü azaldı.", en: "The district bazaar burned down; people can give less." } },
];

/** Dönem başına küçük esnafın yıllık ek değişimi (kendi müşterisinin yüzdesi). */
export const KUCUK_DONEM_ETKISI: Record<string, number> = {
  bolluk: 0.015,
  durgunluk: -0.005,
  kitlik: -0.015,
  savas: -0.02,
  veba: -0.03,
};

export const RAKIP_HAMLE_SANSI = 0.3;
export const RAKIP_HAMLE_COOLDOWN_YIL = 2;
export const KUCUK_OLAY_SANSI = 0.25;
