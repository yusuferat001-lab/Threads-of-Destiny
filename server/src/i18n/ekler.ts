/**
 * Türkçe ek uyumu — özel isimlere ve sayılara kesme işaretiyle eklenen ekleri
 * (ilgi, belirtme, yönelme, bulunma, ayrılma, ek-fiil...) eklendikleri kelimeye
 * göre yeniden uyumlar.
 *
 * Neden: olay metinleri ve motor şablonları `{es}'in`, `{0}'e`, `{0}'sin` gibi
 * kalıplarla yazılmış; ama yer tutucuya hangi ismin geleceği önceden bilinmiyor.
 * "Theodora" için `'in` → "Theodora'in" (doğrusu "Theodora'nın"), terfi mesajında
 * "Onbaşı" için `'sin` → "Onbaşı'sin" (doğrusu "Onbaşı'sın"), zar mesajında 6 için
 * `'e` → "6'e" (doğrusu "6'ya") gibi bozuk Türkçe üretiyordu. Kalıptaki ek bir
 * "örnek" olarak kabul edilir; türü (tampon harf, ünlü uyumu tipi, d/t) ondan
 * çıkarılır ve gerçek kelimeye göre yeniden kurulur.
 *
 * Bilinçli sınırlar: yabancı isimlerde okunuş değil YAZIM esas alınır ("Jeanne"
 * ünlüyle biter sayılır); bu, tutarlı ve öngörülebilir bir kural.
 */

const UNLU_NORMAL: Record<string, string> = {
  a: "a", e: "e", ı: "ı", i: "i", o: "o", ö: "ö", u: "u", ü: "ü",
  â: "a", î: "i", û: "u",
  à: "a", á: "a", ä: "e", ã: "a", å: "a",
  è: "e", é: "e", ê: "e", ë: "e",
  ì: "i", í: "i", ï: "i",
  ò: "o", ó: "o", ô: "o", õ: "o", ø: "ö",
  ù: "u", ú: "u",
};
const INCE = new Set(["e", "i", "ö", "ü"]);
const YUVARLAK = new Set(["o", "ö", "u", "ü"]);
const SERT_UNSUZ = new Set(["f", "s", "t", "k", "ç", "ş", "h", "p"]);
const DORTLU = new Set(["ı", "i", "u", "ü"]);
const IKILI = new Set(["a", "e"]);

const BIRLER = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
const ONLAR = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];

/** Bir tamsayının okunuşundaki SON kelime (ek uyumunu o belirler): 6 → "altı", 120 → "yirmi", 1000 → "bin". */
export function sayiSonKelime(n: number): string {
  const s = Math.abs(Math.trunc(n));
  if (s === 0) return "sıfır";
  if (s % 10 !== 0) return BIRLER[s % 10];
  if (s % 100 !== 0) return ONLAR[(s % 100) / 10];
  if (s % 1000 !== 0) return "yüz";
  if (s % 1_000_000 !== 0) return "bin";
  if (s % 1_000_000_000 !== 0) return "milyon";
  return "milyar";
}

function harfNormal(h: string): string {
  const k = h.toLocaleLowerCase("tr");
  return UNLU_NORMAL[k] ?? k;
}

/** Ek uyumunda esas alınacak biçim: sondaki sayının okunuşu ya da son kelimenin küçük harfli hâli. */
function uyumTabani(kelime: string): string {
  const t = kelime.trim();
  const sayi = t.match(/(\d+)\s*%?$/);
  if (sayi) return sayiSonKelime(Number(sayi[1]));
  const parcalar = t.split(/\s+/);
  const son = (parcalar[parcalar.length - 1] ?? t).replace(/[^\p{L}]/gu, "");
  // Sondaki "y" (Henry, Mary) okunuşta ünlü gibi davranır.
  return [...son].map((h, i, a) => (i === a.length - 1 && (h === "y" || h === "Y") ? "i" : harfNormal(h))).join("");
}

function sonUnlu(taban: string): string | null {
  for (let i = taban.length - 1; i >= 0; i--) {
    if (INCE.has(taban[i]) || YUVARLAK.has(taban[i]) || IKILI.has(taban[i]) || DORTLU.has(taban[i])) return taban[i];
  }
  return null;
}

function unluMu(h: string | undefined): boolean {
  return !!h && (IKILI.has(h) || DORTLU.has(h) || h === "o" || h === "ö");
}

function uyumluUnlu(ornek: string, onceki: string): string {
  const ince = INCE.has(onceki);
  if (IKILI.has(ornek)) return ince ? "e" : "a";
  if (DORTLU.has(ornek)) {
    const yuvarlak = YUVARLAK.has(onceki);
    if (ince) return yuvarlak ? "ü" : "i";
    return yuvarlak ? "u" : "ı";
  }
  return ornek;
}

/**
 * `ek` kalıbını `kelime`ye göre yeniden uyumlar. Kalıp küçük harfli Türkçe bir
 * ek olmalı (in, nın, i, yı, e, ya, de, den, deki, dı, sin...). Tanınmayan bir
 * şeyse olduğu gibi döner.
 */
export function ekUyumla(kelime: string, ek: string): string {
  if (!ek || !kelime) return ek;
  const taban = uyumTabani(kelime);
  if (!taban) return ek;
  const onceki = sonUnlu(taban);
  if (!onceki) return ek; // ünlüsüz (kısaltma vb.) — dokunma
  const sonHarf = taban[taban.length - 1];
  const kelimeUnluyleBiter = unluMu(sonHarf);

  // 1) Kalıptaki tampon harfi ayıkla: y/n + ünlü (yi, ya, nin...), "yl" (ile: yla/yle),
  //    ya da iyelik "s"+ünlü zinciri (si, sini, sinin...). "sin/sın" (ek-fiil 2. tekil)
  //    bir tampon DEĞİL — o yüzden ayrı tutulur.
  let kok = ek;
  let tampon = "";
  if ((ek[0] === "y" || ek[0] === "n") && unluMu(ek[1])) {
    tampon = ek[0];
    kok = ek.slice(1);
  } else if (ek.startsWith("yl")) {
    tampon = "y";
    kok = ek.slice(1);
  } else if (ek[0] === "s" && unluMu(ek[1]) && !/^s[ıiuü]n([ıiuü]z)?$/.test(ek)) {
    tampon = "s";
    kok = ek.slice(1);
  }

  // 2) "ki" eki uyuma girmez (deki/daki).
  let kiSoneki = "";
  if (kok.length > 2 && kok.endsWith("ki")) {
    kiSoneki = "ki";
    kok = kok.slice(0, -2);
  }

  // 3) Gereken tampon: yalnız kelime ünlüyle bitiyorsa. Kalıpta tampon yoksa ekin
  //    türünden çıkarılır: ilgi (-in) → n; iyelik zinciri (-ini, -ine, -inin...) → s;
  //    belirtme (-i) / yönelme (-e) / vasıta (-le) → y.
  let yeniTampon = "";
  if (kelimeUnluyleBiter) {
    if (unluMu(kok[0])) {
      if (tampon) yeniTampon = tampon;
      else if (/^[ıiuü]n$/.test(kok)) yeniTampon = "n";
      else if (/^[ıiuü]n./.test(kok)) yeniTampon = "s";
      else yeniTampon = "y";
    } else if (kok[0] === "l" && (tampon === "y" || /^l[ae]/.test(kok))) {
      yeniTampon = "y";
    }
  }
  // Ek-fiil (dı/di/dır...) ünlüden sonra "y" alır: Kedi'ydi.
  const ekFiilMi = (kok[0] === "d" || kok[0] === "t") && DORTLU.has(kok[1] ?? "");
  if (kelimeUnluyleBiter && ekFiilMi) yeniTampon = "y";

  // 4) d/t benzeşmesi (fıstıkçı şahap): sert ünsüzden sonra t, aksi halde d.
  let harfler = [...kok];
  if (harfler[0] === "d" || harfler[0] === "t") {
    harfler[0] = !kelimeUnluyleBiter && SERT_UNSUZ.has(sonHarf) ? "t" : "d";
  }

  // 5) Ünlü uyumu.
  let son = onceki;
  harfler = harfler.map((h) => {
    if (IKILI.has(h) || DORTLU.has(h)) {
      const yeni = uyumluUnlu(h, son);
      son = yeni;
      return yeni;
    }
    if (h === "o" || h === "ö") son = h;
    return h;
  });

  return yeniTampon + harfler.join("") + kiSoneki;
}

/**
 * Bir şablondaki `{anahtar}'ek` kalıplarını değerleriyle doldururken eki uyumlar.
 * `degerBul(anahtar)` undefined dönerse o kalıba dokunulmaz.
 */
export function ekliYerTutuculariDoldur(
  metin: string,
  desen: RegExp,
  degerBul: (anahtar: string) => string | undefined
): string {
  return metin.replace(desen, (tam: string, anahtar: string, ek: string) => {
    const deger = degerBul(anahtar);
    if (deger === undefined) return tam;
    return `${deger}'${ekUyumla(deger, ek)}`;
  });
}
