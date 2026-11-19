import type { DilliMetin } from "./meslekProfilleri";

/**
 * Tüccar ticaret seferleri (rota). Çok yıllı proje yuvasını kullanır (game/proje.ts); sayılar tek kaynak: game/ticaret.ts.
 * `masraf`: yıllık, enflasyonsuz. `risk`: yolda bir şey ters gitme eğilimi (0-1). Başarıyla dönünce o ürün hattına `etkiYil` yıl
 * boyunca `satisPrimi` kadar satış fiyatı primi ve `alisIndirimi` kadar alış indirimi (uzak pazar, yerinde alım) verir.
 */
export interface SeferTanimi {
  id: string;
  cag: "Orta Çağ" | "Sanayi Devrimi";
  simge: string;
  ad: DilliMetin;
  aciklama: DilliMetin;
  minRutbe: number;
  sure: number;
  masraf: number;
  risk: number;
  satisPrimi: number;
  alisIndirimi: number;
  etkiYil: number;
  /** Yolda çıkabilecek olaylar (YOL_OLAYLARI id'leri). */
  olaylar: string[];
}

export const SEFERLER: SeferTanimi[] = [
  {
    id: "panayir_turu", cag: "Orta Çağ", simge: "🎪", minRutbe: 1, sure: 1, masraf: 2, risk: 0.08, satisPrimi: 0.06, alisIndirimi: 0.03, etkiYil: 1,
    olaylar: ["gumruk", "firtina"],
    ad: { tr: "Panayır turu", en: "Fair circuit" },
    aciklama: { tr: "Komşu kasabaların panayırlarını dolaşırsın. Kısa, ucuz ve güvenli; getirisi de küçüktür.", en: "You tour the fairs of neighbouring towns. Short, cheap and safe; the return is small." },
  },
  {
    id: "nehir_kiyi", cag: "Orta Çağ", simge: "🛶", minRutbe: 1, sure: 1, masraf: 3, risk: 0.12, satisPrimi: 0.08, alisIndirimi: 0.05, etkiYil: 2,
    olaylar: ["haydut", "gumruk"],
    ad: { tr: "Nehir ve kıyı yolu", en: "River and coast route" },
    aciklama: { tr: "Malı nehir ve kıyı boyunca taşırsın. Makul risk, makul getiri.", en: "You carry goods along rivers and the coast. Fair risk, fair reward." },
  },
  {
    id: "kara_kervani", cag: "Orta Çağ", simge: "🐪", minRutbe: 2, sure: 1, masraf: 5, risk: 0.2, satisPrimi: 0.12, alisIndirimi: 0.08, etkiYil: 2,
    olaylar: ["haydut", "firtina", "gumruk"],
    ad: { tr: "Kara kervanı", en: "Overland caravan" },
    aciklama: { tr: "Uzak şehirlere kara yoluyla mal götürürsün. Haydutlar ve gümrükler yolu zorlaştırır.", en: "You haul goods overland to far cities. Bandits and customs make the road hard." },
  },
  {
    id: "deniz_seferi", cag: "Orta Çağ", simge: "⛵", minRutbe: 3, sure: 2, masraf: 8, risk: 0.3, satisPrimi: 0.2, alisIndirimi: 0.12, etkiYil: 3,
    olaylar: ["korsan", "firtina", "karantina"],
    ad: { tr: "Deniz seferi", en: "Sea voyage" },
    aciklama: { tr: "Denizaşırı limanlara gemi gönderirsin. En kârlısı ama fırtına ve korsan yüzünden en riskli yol.", en: "You send a ship to overseas ports. The most profitable, but storms and pirates make it the riskiest." },
  },
  {
    id: "demiryolu", cag: "Sanayi Devrimi", simge: "🚂", minRutbe: 1, sure: 1, masraf: 3, risk: 0.08, satisPrimi: 0.07, alisIndirimi: 0.04, etkiYil: 2,
    olaylar: ["gumruk", "grev"],
    ad: { tr: "Demiryolu hattı", en: "Railway line" },
    aciklama: { tr: "Malı vagonlarla şehirler arasında taşırsın. Hızlı ve güvenilir; getirisi sınırlı.", en: "You move goods by rail between cities. Fast and reliable; the return is limited." },
  },
  {
    id: "buharli_gemi", cag: "Sanayi Devrimi", simge: "🚢", minRutbe: 2, sure: 1, masraf: 6, risk: 0.16, satisPrimi: 0.12, alisIndirimi: 0.08, etkiYil: 2,
    olaylar: ["firtina", "karantina", "gumruk"],
    ad: { tr: "Buharlı gemi seferi", en: "Steamship voyage" },
    aciklama: { tr: "Liman şehirlerine buharlı gemiyle mal gönderirsin. Dengeli risk ve getiri.", en: "You ship goods to port cities by steamer. Balanced risk and reward." },
  },
  {
    id: "okyanus_asiri", cag: "Sanayi Devrimi", simge: "🌊", minRutbe: 3, sure: 2, masraf: 9, risk: 0.26, satisPrimi: 0.2, alisIndirimi: 0.12, etkiYil: 3,
    olaylar: ["korsan", "firtina", "karantina"],
    ad: { tr: "Okyanus aşırı sefer", en: "Transoceanic voyage" },
    aciklama: { tr: "Uzak kıtalara dev bir yük gönderirsin. Yatırım büyük, kazanç büyük, tehlike büyük.", en: "You ship a huge cargo to far continents. Big stake, big prize, big danger." },
  },
  {
    id: "koloni_mali", cag: "Sanayi Devrimi", simge: "🏝️", minRutbe: 4, sure: 2, masraf: 10, risk: 0.3, satisPrimi: 0.24, alisIndirimi: 0.15, etkiYil: 3,
    olaylar: ["korsan", "karantina", "gumruk"],
    ad: { tr: "Koloni malı seferi", en: "Colonial goods run" },
    aciklama: { tr: "Sömürge limanlarından egzotik mal getirtirsin. En kârlı rota; gümrük, hastalık ve korsan peşindedir.", en: "You fetch exotic goods from colonial ports. The most lucrative route; customs, disease and pirates dog it." },
  },
];

export function seferGetir(id: string): SeferTanimi | undefined {
  return SEFERLER.find((s) => s.id === id);
}

/** Eskort seviyesi: koruma (savaş şansına eklenir) ve yıllık masraf (enflasyonsuz). */
export const ESKORTLAR: { id: string; ad: DilliMetin; aciklama: DilliMetin; masraf: number; koruma: number }[] = [
  { id: "yok", ad: { tr: "Eskortsuz", en: "No escort" }, aciklama: { tr: "Yola kendi başına çıkarsın.", en: "You travel on your own." }, masraf: 0, koruma: 0 },
  { id: "kiralik", ad: { tr: "Kiralık muhafız", en: "Hired guards" }, aciklama: { tr: "Birkaç kiralık muhafız; yoldaki saldırılara karşı biraz güvence.", en: "A few hired guards; some safety against attacks on the road." }, masraf: 2, koruma: 0.12 },
  { id: "guclu", ad: { tr: "Güçlü eskort", en: "Strong escort" }, aciklama: { tr: "Silahlı, deneyimli bir eskort; pahalı ama yola karşı koyabilir.", en: "An armed, seasoned escort; costly, but it can stand up to the road." }, masraf: 5, koruma: 0.25 },
];

/** Yolda çıkan olaylar (süre dolunca karar penceresinde gösterilir). */
export const YOL_OLAYLARI: Record<string, { simge: string; ad: DilliMetin; metin: DilliMetin }> = {
  haydut: { simge: "🗡️", ad: { tr: "Haydutlar yolu kesti", en: "Bandits blocked the road" }, metin: { tr: "Silahlı bir çete kervanını durdurdu ve yükün için pazarlığa oturdu.", en: "An armed gang stopped your caravan and demands a share of the cargo." } },
  korsan: { simge: "🏴‍☠️", ad: { tr: "Korsan gemisi göründü", en: "A pirate ship appeared" }, metin: { tr: "Ufukta bir korsan gemisi belirdi ve gemini kovalıyor.", en: "A pirate ship has appeared on the horizon and is chasing yours." } },
  firtina: { simge: "⛈️", ad: { tr: "Fırtına koptu", en: "A storm broke" }, metin: { tr: "Şiddetli bir fırtına yükünü tehlikeye soktu; kaptanın ne yapacağını soruyor.", en: "A violent storm endangers your cargo; your captain asks what to do." } },
  gumruk: { simge: "🛃", ad: { tr: "Gümrük engeli", en: "Customs obstruction" }, metin: { tr: "Gümrük memurları yükünü bekletiyor ve fazladan vergi istiyor.", en: "Customs officers are holding your cargo and demanding extra duties." } },
  karantina: { simge: "☣️", ad: { tr: "Karantina", en: "Quarantine" }, metin: { tr: "Limanda hastalık korkusuyla karantina ilan edildi; yükün bekletiliyor.", en: "A quarantine was declared in port over fear of disease; your cargo is held." } },
  grev: { simge: "✊", ad: { tr: "Grev", en: "Strike" }, metin: { tr: "Demiryolu işçileri greve gitti; vagonların hatta bekliyor.", en: "The railway workers went on strike; your wagons are stuck on the line." } },
};

/** Yol olayı kararları ve sayıları. */
export const SEFER_KARARLARI = {
  /** Öde: neredeyse kesin geçiş, ama kâr payı kısılır ve fidye (masraf × katsayı) ödersin. */
  ode: { sans: 0.92, fidyeKatsayi: 2, karPayi: 0.7 },
  /** Pazarlık: güvenine dayanır; başarısızlıkta yük kaybı. */
  pazarlik: { taban: 0.62, itibarBolen: 200, kayipKatsayi: 1.5 },
  /** Karşı koy: eskort şansına bağlı; başarıda şöhret, başarısızlıkta yaralanma. */
  karsi: { taban: 0.5, kayipKatsayi: 2, sohret: 1.5, saglik: 3 },
  /** Geri dön: yük kurtulur ama sefer boşa gider. */
  geri: { itibar: -1 },
};
export const SEFER_BASARI_ITIBAR = 3;
export const SEFER_BASARISIZ_ITIBAR = -3;

export const SEFER_KARAR_METINLERI: Record<"ode" | "pazarlik" | "karsi" | "geri", { simge: string; ad: DilliMetin; aciklama: DilliMetin }> = {
  ode: { simge: "💰", ad: { tr: "Öde ve geç", en: "Pay and pass" }, aciklama: { tr: "Fidyeyi ya da fazladan vergiyi ödersin. Neredeyse kesin geçersin ama kâr payın kısılır.", en: "You pay the ransom or extra duty. You almost surely get through, but your profit share shrinks." } },
  pazarlik: { simge: "🤝", ad: { tr: "Pazarlık et", en: "Bargain" }, aciklama: { tr: "Güvenine ve sözüne dayanırsın. Tutarsa tam kâr; tutmazsa yükün bir kısmını kaybedersin.", en: "You lean on your good name. If it works you keep the full profit; if not you lose part of the cargo." } },
  karsi: { simge: "⚔️", ad: { tr: "Karşı koy", en: "Resist" }, aciklama: { tr: "Eskortuna güvenip direnirsin. Başarırsan şöhret kazanırsın; başarısızlık ağır kayıp ve yara demektir.", en: "You trust your escort and resist. Win and you gain fame; lose and you suffer heavy loss and wounds." } },
  geri: { simge: "↩️", ad: { tr: "Geri dön", en: "Turn back" }, aciklama: { tr: "Yükü kurtarıp dönersin; sefer boşa gider ve güvenin biraz zedelenir.", en: "You save the cargo and turn back; the trip is wasted and your trust dips a little." } },
};
