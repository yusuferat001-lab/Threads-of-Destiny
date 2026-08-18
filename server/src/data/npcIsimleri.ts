import { Cag } from "../types";

export type Cinsiyet = "erkek" | "kadin";

interface BolgeIsimleri {
  erkek: string[];
  kadin: string[];
}

/** Bölgeye özgü kültürel isim havuzları, cinsiyete göre ayrılmış. Dost/rakip/eş/amir/ast isimleri cinsiyet gözetmeden (her ikisinden), anne/baba isimleri cinsiyete uygun çekilir. */
const ISIMLER_BOLGE: Record<string, BolgeIsimleri> = {
  Fransa: {
    erkek: ["Étienne", "Baudouin", "Guillaume", "Aymeric", "Thibault", "Renaud"],
    kadin: ["Isabeau", "Marguerite", "Blanche", "Aliénor"],
  },
  "Kutsal Roma": {
    erkek: ["Konrad", "Heinrich", "Friedrich", "Wolfram", "Ludwig", "Otto"],
    kadin: ["Adelheid", "Gertrud", "Brunhild", "Hildegard"],
  },
  Bizans: {
    erkek: ["Theodoros", "Ioannes", "Anastasios", "Konstantinos", "Photios", "Nikephoros"],
    kadin: ["Zoe", "Eirene", "Theodora", "Anna"],
  },
  Selçuklu: {
    erkek: ["Alparslan", "Yusuf", "Melikşah", "Turhan", "Sencer", "Tuğrul", "Kılıçarslan"],
    kadin: ["Elif", "Zeynep", "Gülhatun"],
  },
  Eyyubiler: {
    erkek: ["Selahaddin", "Faruk", "Halil", "Kerim", "Tarık", "Eyüp"],
    kadin: ["Zeynab", "Amina", "Leyla", "Nur"],
  },
  İngiltere: {
    erkek: ["Thomas", "William", "Edward", "Henry", "George", "Arthur"],
    kadin: ["Margaret", "Charlotte", "Alice", "Emily"],
  },
  Osmanlı: {
    erkek: ["Ahmet", "Mehmet", "Hasan", "Hüseyin", "Mustafa", "Osman"],
    kadin: ["Fatma", "Ayşe", "Zehra", "Emine"],
  },
  Rusya: {
    erkek: ["Ivan", "Nikolai", "Mikhail", "Dmitri", "Pyotr", "Sergei"],
    kadin: ["Elena", "Anastasia", "Olga", "Irina"],
  },
};

/** Bölge eşleşmezse çağa göre düşülecek genel havuz. */
const VARSAYILAN_HAVUZ: Record<Cag, BolgeIsimleri> = {
  "Orta Çağ": {
    erkek: ["Johannes", "Aldric", "Mikhail", "Rurik", "Conrad"],
    kadin: ["Katarina", "Beatrix", "Elif"],
  },
  "Sanayi Devrimi": {
    erkek: ["Thomas", "William", "Ivan", "Heinrich", "Nikolai"],
    kadin: ["Margaret", "Charlotte", "Elena"],
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

/** Anne/baba gibi cinsiyeti oyuncuya açıkça gösterilen (👩/👨 simgeli) bir NPC için, o cinsiyetin isim havuzundan bölgeye uygun tek bir isim döndürür. */
export function rastgeleCinsiyetliIsimSec(cag: Cag, bolge: string, cinsiyet: Cinsiyet, haric: string[] = []): string {
  const tumHavuz = bolgeHavuzuGetir(cag, bolge)[cinsiyet];
  const havuz = tumHavuz.filter((isim) => !haric.includes(isim));
  const kaynak = havuz.length > 0 ? havuz : tumHavuz;
  return kaynak[Math.floor(Math.random() * kaynak.length)];
}
