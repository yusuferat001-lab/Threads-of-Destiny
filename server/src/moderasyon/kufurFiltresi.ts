/**
 * Herkese açık liderlik tablosunda görünecek isimler için basit bir küfür/
 * hakaret filtresi. Kapsamlı bir NLP çözümü değil, doğrudan eşleşen kök
 * kelimeleri (leetspeak/ayraç varyasyonlarıyla birlikte) yakalayan bir ilk
 * savunma hattıdır.
 */
const YASAKLI_KOKLER: string[] = [
  // Türkçe küfür/hakaret kökleri
  "amk",
  "aq",
  "amq",
  "oç",
  "orospu",
  "piç",
  "yavşak",
  "ibne",
  "göt",
  "sik",
  "sikik",
  "siktir",
  "kahpe",
  "şerefsiz",
  "pezevenk",
  "gavat",
  "yarrak",
  "yarak",
  "mal herif",
  "salak",
  "aptal",
  "gerizekalı",
  "dallama",
  "puşt",
  // Yaygın İngilizce küfürler
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "nigger",
  "faggot",
  "whore",
];

/** Küçük harfe çevirir, Türkçe karakterleri sadeleştirir, leetspeak ve ayraçları normalize eder. */
function normallestir(metin: string): string {
  return metin
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[4@]/g, "a")
    .replace(/3/g, "e")
    .replace(/1/g, "i")
    .replace(/0/g, "o")
    .replace(/[^a-z0-9]/g, "");
}

export function uygunsuzMu(metin: string): boolean {
  const sade = normallestir(metin);
  return YASAKLI_KOKLER.some((kok) => sade.includes(normallestir(kok)));
}
