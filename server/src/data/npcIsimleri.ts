import { Cag } from "../types";

export type Cinsiyet = "erkek" | "kadin";

interface BolgeIsimleri {
  erkek: string[];
  kadin: string[];
}

/** Bölgeye özgü kültürel isim havuzları, cinsiyete göre ayrılmış. Dost/rakip/eş/amir/ast isimleri cinsiyet gözetmeden (her ikisinden), anne/baba isimleri cinsiyete uygun çekilir. */
const ISIMLER_BOLGE: Record<string, BolgeIsimleri> = {
  Fransa: {
    erkek: [
      "Étienne", "Baudouin", "Guillaume", "Aymeric", "Thibault", "Renaud",
      "Geoffroi", "Foulques", "Hugues", "Amaury", "Gautier", "Enguerrand",
      "Raoul", "Barthélemy", "Gilles", "Eudes", "Payen", "Adhémar",
      "Bertrand", "Gervais", "Simon", "Anselme", "Roland", "Girard",
      "Philippe", "Josselin", "Robert", "Hervé", "Lancelin", "Garnier",
    ],
    kadin: [
      "Isabeau", "Marguerite", "Blanche", "Aliénor", "Adèle", "Mahaut",
      "Béatrice", "Jeanne", "Sibylle", "Agnès", "Ermengarde", "Constance",
    ],
  },
  "Kutsal Roma": {
    erkek: [
      "Konrad", "Heinrich", "Friedrich", "Wolfram", "Ludwig", "Otto",
      "Albrecht", "Dietrich", "Gottfried", "Lothar", "Sigmund", "Rudolf",
      "Bernhard", "Ekkehard", "Kuno", "Werner", "Hartmann", "Gerhard",
      "Adalbert", "Reinhard", "Wilhelm", "Berthold", "Manfred", "Günther",
      "Arnulf", "Eberhard", "Sieghart", "Volker", "Hermann", "Diethelm",
    ],
    kadin: [
      "Adelheid", "Gertrud", "Brunhild", "Hildegard", "Kunigunde", "Mechthild",
      "Agnes", "Beatrix", "Irmgard", "Uta", "Sophie", "Richenza",
    ],
  },
  Bizans: {
    erkek: [
      "Theodoros", "Ioannes", "Anastasios", "Konstantinos", "Photios", "Nikephoros",
      "Alexios", "Basileios", "Michael", "Georgios", "Demetrios", "Leon",
      "Romanos", "Isaakios", "Andronikos", "Stephanos", "Manuel", "Nikolaos",
      "Bardas", "Symeon", "Petros", "Loukas", "Kosmas", "Theophylaktos",
      "Prokopios", "Eustathios", "Gregorios", "Sergios", "Philaretos", "Niketas",
    ],
    kadin: [
      "Zoe", "Eirene", "Theodora", "Anna", "Maria", "Euphrosyne",
      "Helena", "Sophia", "Kale", "Xene", "Martha", "Pulcheria",
    ],
  },
  Selçuklu: {
    erkek: [
      "Alparslan", "Yusuf", "Melikşah", "Turhan", "Sencer", "Tuğrul", "Kılıçarslan",
      "Berkyaruk", "Mesud", "Süleyman", "Çağrı", "Arslan", "Böri", "Danişmend",
      "Aytekin", "Kutalmış", "Porsuk", "Gümüştekin", "Sungur", "Yağızarslan", "Tekiş",
      "Artuk", "Çaka", "Balak", "Aksungur", "Bozan", "Karatekin",
      "Yaruk", "Emirdad", "Kürboğa", "Tutuş", "İlgazi", "Altuntaş",
    ],
    kadin: [
      "Elif", "Zeynep", "Gülhatun", "Terken", "Mahperi", "Devlet",
      "Safiye", "Gevher", "Melike", "Hunat", "Raziye", "Şahnaz",
    ],
  },
  Eyyubiler: {
    erkek: [
      "Selahaddin", "Faruk", "Halil", "Kerim", "Tarık", "Eyüp",
      "Turan", "Adil", "Kamil", "Salih", "Nasır", "Efdal",
      "Aziz", "Muzaffer", "İmad", "Esed", "Şirkuh", "Necmeddin",
      "Emin", "Cafer", "Behram", "Zahir", "Mansur", "Reşid",
      "Sabri", "Şihab", "Fahreddin", "Bahaeddin", "Seyfeddin", "Alaeddin",
    ],
    kadin: [
      "Zeynab", "Amina", "Leyla", "Nur", "Fatıma", "Halime",
      "Rabia", "Safiye", "Aişe", "Cemile", "Rukiye", "Sara",
    ],
  },
  İngiltere: {
    erkek: [
      "Thomas", "William", "Edward", "Henry", "George", "Arthur",
      "Charles", "James", "John", "Frederick", "Albert", "Walter",
      "Ernest", "Herbert", "Alfred", "Samuel", "Francis", "Robert",
      "Edwin", "Percy", "Reginald", "Harold", "Wilfred", "Cecil",
      "Leonard", "Horace", "Sidney", "Clarence", "Bertram", "Oswald",
    ],
    kadin: [
      "Margaret", "Charlotte", "Alice", "Emily", "Victoria", "Eleanor",
      "Florence", "Harriet", "Jane", "Mary", "Edith", "Beatrice",
    ],
  },
  Osmanlı: {
    erkek: [
      "Ahmet", "Mehmet", "Hasan", "Hüseyin", "Mustafa", "Osman",
      "İbrahim", "İsmail", "Ali", "Süleyman", "Kemal", "Rıza",
      "Cemal", "Salih", "Halil", "Ömer", "Yusuf", "Bekir",
      "Kadri", "Şükrü", "Necip", "Tahir", "Nuri", "Recep",
      "Fuat", "Hakkı", "Sadık", "Vehbi", "Zeki", "Lütfi",
    ],
    kadin: [
      "Fatma", "Ayşe", "Zehra", "Emine", "Hatice", "Zeliha",
      "Hanife", "Naime", "Şerife", "Rukiye", "Münevver", "Sıdıka",
    ],
  },
  Rusya: {
    erkek: [
      "Ivan", "Nikolai", "Mikhail", "Dmitri", "Pyotr", "Sergei",
      "Alexei", "Fyodor", "Vasili", "Andrei", "Grigori", "Pavel",
      "Boris", "Yuri", "Konstantin", "Stepan", "Anton", "Lev",
      "Maksim", "Timofei", "Ignat", "Rodion", "Kirill", "Yakov",
      "Semyon", "Gavriil", "Arkadi", "Nikita", "Prokhor", "Yefim",
    ],
    kadin: [
      "Elena", "Anastasia", "Olga", "Irina", "Tatiana", "Ekaterina",
      "Natalia", "Maria", "Vera", "Sofia", "Lidia", "Praskovya",
    ],
  },
};

/** Bölge eşleşmezse çağa göre düşülecek genel havuz. */
const VARSAYILAN_HAVUZ: Record<Cag, BolgeIsimleri> = {
  "Orta Çağ": {
    erkek: [
      "Johannes", "Aldric", "Mikhail", "Rurik", "Conrad", "Godfrey",
      "Reynard", "Osbert", "Lothar", "Emmerich", "Gerald", "Rollo",
      "Waleran", "Baldric", "Theobald", "Aldous", "Warin", "Gunter",
      "Ivo", "Drogo", "Fulk", "Hamon", "Roger", "Walter",
    ],
    kadin: [
      "Katarina", "Beatrix", "Elif", "Adela", "Rohese", "Ermengard",
      "Sibylla", "Hawise", "Milesenda",
    ],
  },
  "Sanayi Devrimi": {
    erkek: [
      "Thomas", "William", "Ivan", "Heinrich", "Nikolai", "Charles",
      "Frederick", "Anton", "Wilhelm", "Sergei", "Albert", "Otto",
      "Pavel", "Karl", "Louis", "Henri", "Georg", "Edward",
      "Dmitri", "Franz", "James", "Rudolf", "Nikola", "Émile",
    ],
    kadin: [
      "Margaret", "Charlotte", "Elena", "Victoria", "Amalia", "Tatiana",
      "Florence", "Wilhelmina", "Sofia",
    ],
  },
};

function bolgeHavuzuGetir(cag: Cag, bolge: string): BolgeIsimleri {
  return ISIMLER_BOLGE[bolge] ?? VARSAYILAN_HAVUZ[cag];
}

function tumIsimler(havuz: BolgeIsimleri): string[] {
  return [...havuz.erkek, ...havuz.kadin];
}

/** Karakterin doğuşunda atanan dost ve rakip için birbirinden farklı iki isim döndürür (cinsiyet gözetmez). */
export function rastgeleIkiIsimSec(cag: Cag, bolge: string): [string, string] {
  const havuz = tumIsimler(bolgeHavuzuGetir(cag, bolge));
  const kopya = [...havuz];
  const birinci = kopya.splice(Math.floor(Math.random() * kopya.length), 1)[0];
  const ikinci = kopya.splice(Math.floor(Math.random() * kopya.length), 1)[0];
  return [birinci, ikinci];
}

/** Eş/amir/ast gibi sonradan ortaya çıkan, cinsiyeti oyuncuya belirtilmeyen bir NPC için bölgeye uygun tek bir isim döndürür. */
export function rastgeleBirIsimSec(cag: Cag, bolge: string, haric: string[] = []): string {
  const tumHavuz = tumIsimler(bolgeHavuzuGetir(cag, bolge));
  const havuz = tumHavuz.filter((isim) => !haric.includes(isim));
  const kaynak = havuz.length > 0 ? havuz : tumHavuz;
  return kaynak[Math.floor(Math.random() * kaynak.length)];
}

/**
 * Oyuncu karakteri için isim önerisi. Oyun şu an yalnızca erkek karakter
 * desteklediği için bölge/çağa uygun ERKEK isim havuzundan tek bir isim döndürür.
 * (Kadın karakter eklenince bu fonksiyona bir cinsiyet parametresi geçilebilir.)
 */
export function rastgeleOyuncuIsmiSec(cag: Cag, bolge: string, haric: string[] = []): string {
  return rastgeleCinsiyetliIsimSec(cag, bolge, "erkek", haric);
}

/** Anne/baba gibi cinsiyeti oyuncuya açıkça gösterilen (👩/👨 simgeli) bir NPC için, o cinsiyetin isim havuzundan bölgeye uygun tek bir isim döndürür. */
export function rastgeleCinsiyetliIsimSec(cag: Cag, bolge: string, cinsiyet: Cinsiyet, haric: string[] = []): string {
  const tumHavuz = bolgeHavuzuGetir(cag, bolge)[cinsiyet];
  const havuz = tumHavuz.filter((isim) => !haric.includes(isim));
  const kaynak = havuz.length > 0 ? havuz : tumHavuz;
  return kaynak[Math.floor(Math.random() * kaynak.length)];
}
