/**
 * Sunucu tarafı çok dilli metin altyapısı.
 *
 * Tasarım: Türkçe kaynak metin her yerde "kanonik" kalır (oyun mantığı, etiketler,
 * meslek/bölge/kişilik anahtarları hep Türkçedir). İngilizce, YALNIZCA metin
 * oyuncuya gönderilmeden hemen önce bir arama katmanıyla çözülür.
 *
 * İki tür sözlük var:
 *  1. `ANLATIM_EN` — motorun ürettiği serbest anlatı cümleleri (haberler, zaman
 *     geçişi, ölüm nedenleri, kriz mesajları, finans kalem adları...). Türkçe
 *     kaynak string'in KENDİSİ anahtardır. Karşılığı yoksa Türkçe döner (bozulmaz,
 *     yalnızca çevrilmemiş görünür).
 *  2. `KATALOG_EN` — bölge/meslek/kişilik/aile/rütbe/konut/yaşam/mağaza/hizip gibi
 *     sabit katalogların görünen adları. Yine Türkçe değer anahtardır.
 *
 * Olay bankası (server/src/data/olaylar/*) ayrı `*.en.ts` ayna dosyalarıyla
 * çevrilir; bkz. server/src/i18n/olaylar/.
 */
import type { Dil } from "../types";
import { ANLATIM_EN } from "./anlatim.en";
import { KATALOG_EN } from "./katalog.en";
import { ekliYerTutuculariDoldur } from "./ekler";

export type { Dil };

/**
 * Bir motor-anlatı cümlesini çevirir. `params` verilirse `{0} {1} ...` yer
 * tutucuları sırayla değiştirilir — böylece şablon string'ler
 * (`` `${a} ... ${b}` ``) tek bir çevrilebilir kalıba iner.
 *
 * Türkçede `{0}'e`, `{0}'sin` gibi kesmeli ekler değere göre uyumlanır
 * ("Onbaşı'sın", "6'ya" — bkz. ekler.ts). İngilizce şablonlara dokunulmaz.
 *
 * @example T(dil, "{0} artık hükümdar.", [yeniAd])
 */
export function T(dil: Dil, tr: string, params?: (string | number)[]): string {
  const ham = dil === "en" ? ANLATIM_EN[tr] ?? tr : tr;
  if (!params || params.length === 0) return ham;
  const ekli =
    dil === "en"
      ? ham
      : ekliYerTutuculariDoldur(ham, /\{(\d+)\}'([a-zçğıöşü]+)/g, (i) => {
          const v = params[Number(i)];
          return v === undefined ? undefined : String(v);
        });
  return ekli.replace(/\{(\d+)\}/g, (_m: string, i: string) => {
    const v = params[Number(i)];
    return v === undefined ? `{${i}}` : String(v);
  });
}

/**
 * Sunucunun fırlattığı hata mesajlarını oyuncunun diline çevirir. Önce birebir
 * eşleşme (ANLATIM_EN), sonra değişken içeren birkaç yaygın kalıp denenir;
 * karşılığı yoksa mesaj olduğu gibi döner.
 */
export function hataCevir(dil: Dil, mesaj: string): string {
  if (dil !== "en") return mesaj;
  const birebir = ANLATIM_EN[mesaj];
  if (birebir) return birebir;
  for (const [desen, cevir] of HATA_KALIPLARI) {
    const m = mesaj.match(desen);
    if (m) return cevir(m);
  }
  return mesaj;
}

const HATA_KALIPLARI: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^Yeterli paran yok \((.+?) (\S+) gerekli\)\.?$/, (m) => `You don't have enough money (${m[1]} ${m[2]} required).`],
  [/^Taşınmak için yeterli paran yok \((.+?) (\S+) gerekli\)\.?$/, (m) => `You can't afford the move (${m[1]} ${m[2]} required).`],
  [/^Tefeci sana en fazla (.+?) (\S+) verir\.$/, (m) => `The moneylender will lend you at most ${m[1]} ${m[2]}.`],
  [/^En az (.+?) (\S+) kredi alabilirsin\.$/, (m) => `The minimum loan is ${m[1]} ${m[2]}.`],
  [/^Cebinde bu mekâna gidecek kadar para yok \(~(.+?) (\S+) giriş ücreti\)\.$/, (m) => `You can't afford this place (~${m[1]} ${m[2]} entry fee).`],
  [/^Yakın zamanda temel ürün aldın; (\d+) yıl sonra tekrar alışveriş yapabilirsin\.$/, (m) => `You bought basic goods recently; you can shop again in ${m[1]} years.`],
  [/^Bu iş için ortalık henüz sakinleşmedi; (\d+) yıl sonra yeniden deneyebilirsin\.$/, (m) => `Things haven't cooled down for this job yet; try again in ${m[1]} year(s).`],
  [/^Kolun hâlâ ağrıyor; (\d+) yıl sonra yeniden bilek güreşebilirsin\.$/, (m) => `Your arm still aches; you can arm-wrestle again in ${m[1]} year(s).`],
];

/** Sabit katalog adı/açıklaması çevirisi (bölge, meslek, kişilik, konut...). Karşılığı yoksa Türkçe döner. */
export function K(dil: Dil, tr: string | null | undefined): string {
  if (tr == null) return "";
  if (dil !== "en") return tr;
  return KATALOG_EN[tr] ?? tr;
}

/** "<unvan> <isim>" biçimindeki hükümdar dizgisinde yalnız unvan önekini çevirir (isim korunur). */
export function Khukumdar(dil: Dil, hukumdar: string | null | undefined): string {
  if (!hukumdar) return "";
  if (dil !== "en") return hukumdar;
  const bosluk = hukumdar.indexOf(" ");
  if (bosluk < 0) return KATALOG_EN[hukumdar] ?? hukumdar;
  const onek = hukumdar.slice(0, bosluk);
  return `${KATALOG_EN[onek] ?? onek} ${hukumdar.slice(bosluk + 1)}`;
}

/** Bir motor cümlesini iki dilde birden üretir (ör. her iki dilde saklanan ölüm nedeni). */
export function ikiDilT(tr: string, params?: (string | number)[]): { tr: string; en: string } {
  return { tr: T("tr", tr, params), en: T("en", tr, params) };
}

/** dil === "en" ise İngilizce, değilse Türkçe değeri döndüren kısa yardımcı. */
export function ikiDil<T>(dil: Dil, tr: T, en: T): T {
  return dil === "en" ? en : tr;
}
