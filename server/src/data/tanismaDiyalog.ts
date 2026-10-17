// Aşk evliliği tanışma diyaloğunun metinleri ve gizli huy ↔ yaklaşım eşleşmesi.
// Metinler {tr,en} çiftleridir; `{0}` karşı tarafın adıdır. Tepkiler bilerek DÜZ ANLATI
// olarak gösterilir (rozet/yüzde/ipucu arayüzü yok) — oyuncu metinden kendi çıkarımını yapar.

import { AileHuy, TanismaYaklasim } from "../types";

export interface IkiDil {
  tr: string;
  en: string;
}

export const YAKLASIMLAR: TanismaYaklasim[] = ["komik", "nazik", "ovunme", "mutevazi"];

/** Her huyun sevdiği yaklaşım (adım şansı +) ve sevmediği yaklaşım (adım şansı −). */
export const HUY_SEVER: Record<AileHuy, TanismaYaklasim> = {
  mizahsever: "komik",
  parasever: "ovunme",
  ciddi: "mutevazi",
  maceraci: "ovunme",
  sefkatli: "nazik",
  gururlu: "nazik",
};
export const HUY_SEVMEZ: Record<AileHuy, TanismaYaklasim> = {
  mizahsever: "mutevazi",
  parasever: "mutevazi",
  ciddi: "komik",
  maceraci: "nazik",
  sefkatli: "ovunme",
  gururlu: "komik",
};

/** Mekâna göre ilk karşılaşma cümlesi; `{0}` = aday adı. Bilinmeyen mekân `pazar_meydani`'na düşer. */
export const MEKAN_GIRIS: Record<string, IkiDil> = {
  pazar_meydani: {
    tr: "Pazar meydanının kalabalığında bir an göz göze geldiniz: {0}.",
    en: "In the bustle of the market square your eyes met: {0}.",
  },
  meyhane: {
    tr: "Meyhanenin loş ışığında bir masadan sana bakan biri var: {0}.",
    en: "In the dim tavern light someone at a table is looking at you: {0}.",
  },
  pub: {
    tr: "Pub'un uğultusu arasında bir köşeden sana bakan biri var: {0}.",
    en: "Amid the pub's hum, someone in a corner is looking at you: {0}.",
  },
  ordugah_cadiri: {
    tr: "Ordugâh ateşinin ışığında bir yüz seçiyorsun: {0}.",
    en: "In the glow of the camp fire you pick out a face: {0}.",
  },
  dini_meclis: {
    tr: "Dini meclisin çıkışında bir bakış seni buluyor: {0}.",
    en: "Leaving the religious gathering, a glance finds you: {0}.",
  },
  lonca_meclisi: {
    tr: "Lonca meclisinin kapısında bir yüzle göz göze geliyorsun: {0}.",
    en: "At the guild hall door you meet a pair of eyes: {0}.",
  },
};

/** Dış görünüş cümleleri (adayda indeks saklanır). */
export const GORUNUM: IkiDil[] = [
  { tr: "uzun boylu, kıvırcık saçlı", en: "tall, with curly hair" },
  { tr: "kumral saçlı, gülümseyen gözlü", en: "brown-haired, with smiling eyes" },
  { tr: "narin yüzlü, ağır bakışlı", en: "fine-featured, with a heavy gaze" },
  { tr: "koyu saçlı, hafif çilli", en: "dark-haired, lightly freckled" },
  { tr: "sarı saçlı, canlı bakışlı", en: "fair-haired, bright-eyed" },
  { tr: "esmer tenli, ciddi duruşlu", en: "dark-skinned, with a solemn bearing" },
  { tr: "kısa boylu, tatlı yüzlü", en: "short, sweet-faced" },
  { tr: "bakımlı giyimli, dik duruşlu", en: "neatly dressed, upright" },
];

/** Adım başlıkları (1..4). */
export const ADIM_METNI: IkiDil[] = [
  { tr: "Yanına yaklaştın; {0} sana dönüp bekliyor. İlk sözün ne olacak?", en: "You step closer; {0} turns to you, waiting. What is your opening line?" },
  { tr: "Sohbet açıldı; {0} kendinden biraz söz ediyor. Nasıl karşılık verirsin?", en: "The talk has begun; {0} tells you a little about themselves. How do you answer?" },
  { tr: "Konu kişisel bir yere geldi: {0} gelecek hayallerinden söz ediyor.", en: "The talk turns personal: {0} speaks of dreams for the future." },
  { tr: "Ayrılma vakti yaklaşıyor; {0} gitmeden son bir şey söylüyorsun.", en: "Parting time draws near; before {0} leaves you say one last thing." },
];

/** Yaklaşım × adım seçenek metinleri (her yaklaşımın 4 adımlık karşılığı). */
export const SECENEK_METNI: Record<TanismaYaklasim, IkiDil[]> = {
  komik: [
    { tr: "Bir espriyle selam ver.", en: "Greet with a joke." },
    { tr: "Gülünç bir anını anlat.", en: "Tell a funny story about yourself." },
    { tr: "Hayallerine takılıp şakalaş.", en: "Tease lightly about those dreams." },
    { tr: "Güldüren bir veda şakası yap.", en: "Leave with a parting joke." },
  ],
  nazik: [
    { tr: "Kibarca selam ver, adını sor.", en: "Greet politely and ask their name." },
    { tr: "Dikkatle dinle, nazikçe soru sor.", en: "Listen closely, ask kindly." },
    { tr: "Hayallerine içtenlikle destek ol.", en: "Sincerely encourage those dreams." },
    { tr: "Yeniden görüşmek istediğini söyle.", en: "Gently say you would like to meet again." },
  ],
  ovunme: [
    { tr: "Başarılarını sayarak kendini tanıt.", en: "Introduce yourself by listing your feats." },
    { tr: "Servetinden ve nüfuzundan söz et.", en: "Mention your wealth and influence." },
    { tr: "Hayallerini gerçekleştirebileceğini söyle.", en: "Boast that you could make those dreams real." },
    { tr: "Gösterişli bir hediye vaat et.", en: "Promise a grand gift to impress." },
  ],
  mutevazi: [
    { tr: "Sade, mütevazı bir selam ver.", en: "Greet plainly and modestly." },
    { tr: "Kendinden az söz et, onu konuştur.", en: "Say little of yourself, let them talk." },
    { tr: "Kendi eksiklerini sakince kabul et.", en: "Calmly admit your own shortcomings." },
    { tr: "Sessizce 'iyi ki tanıştık' de.", en: "Quietly say it was good to meet." },
  ],
};

export type TepkiTonu = "olumlu" | "notr" | "soguk";

/** Yaklaşım × ton → 2 varyant. */
export const TEPKI: Record<TanismaYaklasim, Record<TepkiTonu, IkiDil[]>> = {
  komik: {
    olumlu: [
      { tr: "{0} kahkahayı bastı; gözleri parladı.", en: "{0} burst out laughing, eyes bright." },
      { tr: "{0} şakana güldü, omuzları gevşedi.", en: "{0} laughed at your joke and relaxed." },
    ],
    notr: [
      { tr: "{0} kibarca gülümsedi.", en: "{0} smiled politely." },
      { tr: "{0} bir an düşündü, belli belirsiz gülümsedi.", en: "{0} paused, then gave a faint smile." },
    ],
    soguk: [
      { tr: "{0} kaşını kaldırdı, pek eğlenmedi.", en: "{0} raised a brow, unamused." },
      { tr: "{0} şakana gülmedi; bakışı soğudu.", en: "{0} did not laugh; the look cooled." },
    ],
  },
  nazik: {
    olumlu: [
      { tr: "{0} yumuşadı; sana biraz daha yaklaştı.", en: "{0} softened and stepped a little closer." },
      { tr: "{0} içtenliğine hafifçe gülümsedi.", en: "{0} smiled faintly at your sincerity." },
    ],
    notr: [
      { tr: "{0} başını salladı.", en: "{0} nodded." },
      { tr: "{0} nazikçe karşılık verdi ama mesafesini korudu.", en: "{0} answered kindly but kept a distance." },
    ],
    soguk: [
      { tr: "{0} cevap vermeden gözlerini kaçırdı.", en: "{0} looked away without answering." },
      { tr: "{0} ilgisini yitirdi; sözlerin havada kaldı.", en: "{0} lost interest; your words hung in the air." },
    ],
  },
  ovunme: {
    olumlu: [
      { tr: "{0} etkilenmiş göründü; gözleri parladı.", en: "{0} seemed impressed; eyes shining." },
      { tr: "{0} sözlerine ilgiyle kulak kesildi.", en: "{0} listened to you with keen interest." },
    ],
    notr: [
      { tr: "{0} kayıtsızca dinledi.", en: "{0} listened indifferently." },
      { tr: "{0} bir şey demedi, sadece baktı.", en: "{0} said nothing, only looked." },
    ],
    soguk: [
      { tr: "{0} gözlerini devirdi.", en: "{0} rolled their eyes." },
      { tr: "{0} ağzını bile açmadan geri çekildi.", en: "{0} drew back without even opening their mouth." },
    ],
  },
  mutevazi: {
    olumlu: [
      { tr: "{0} sakin tavrına minnetle baktı.", en: "{0} looked at your calm manner with gratitude." },
      { tr: "{0} sadeliğini sevmiş göründü.", en: "{0} seemed to like your simplicity." },
    ],
    notr: [
      { tr: "{0} kibarca dinledi.", en: "{0} listened politely." },
      { tr: "{0} hafifçe başını eğdi.", en: "{0} bowed their head slightly." },
    ],
    soguk: [
      { tr: "{0} sıkılmış gibi etrafına baktı.", en: "{0} glanced around as if bored." },
      { tr: "{0} sessizlikten rahatsız oldu; gözleri başka yöne kaydı.", en: "{0} grew uneasy at the silence; their eyes drifted." },
    ],
  },
};

export const SONUC_BASARILI: IkiDil = {
  tr: "{0} seninle görüşmeyi kabul etti; artık sevgilisin!",
  en: "{0} agreed to see you; you are now sweethearts!",
};
export const SONUC_BASARISIZ: IkiDil = {
  tr: "{0} nazikçe geri çekildi: 'Belki başka bir zaman.'",
  en: "{0} politely withdrew: 'Perhaps another time.'",
};
export const SONUC_VAZGECILDI: IkiDil = {
  tr: "Yanına gitmeye cesaret edemedin; {0} kalabalığa karıştı.",
  en: "You did not dare approach; {0} melted into the crowd.",
};

export const SONUC_SADAKAT: IkiDil = {
  tr: "Evli olduğunu hatırlayıp {0} ile konuşmadan uzaklaştın; vicdanın rahat.",
  en: "Remembering you are married, you walked away from {0}; your conscience is clear.",
};
export const SONUC_ALDATMA: IkiDil = {
  tr: "{0} ile gizli bir yakınlaşma yaşadın; içini bir suçluluk kapladı.",
  en: "You shared a secret closeness with {0}; guilt settled in.",
};
export const SONUC_ALDATMA_IFSA: IkiDil = {
  tr: "Ama {0} bunu öğrendi; evlilik sarsıldı.",
  en: "But {0} found out; the marriage was shaken.",
};
