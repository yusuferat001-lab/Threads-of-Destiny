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

export type { Dil };

/**
 * Bir motor-anlatı cümlesini çevirir. `params` verilirse `{0} {1} ...` yer
 * tutucuları sırayla değiştirilir — böylece şablon string'ler
 * (`` `${a} ... ${b}` ``) tek bir çevrilebilir kalıba iner.
 *
 * @example T(dil, "{0} artık hükümdar.", [yeniAd])
 */
export function T(dil: Dil, tr: string, params?: (string | number)[]): string {
  const ham = dil === "en" ? ANLATIM_EN[tr] ?? tr : tr;
  if (!params || params.length === 0) return ham;
  return ham.replace(/\{(\d+)\}/g, (_m: string, i: string) => {
    const v = params[Number(i)];
    return v === undefined ? `{${i}}` : String(v);
  });
}

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

/** dil === "en" ise İngilizce, değilse Türkçe değeri döndüren kısa yardımcı. */
export function ikiDil<T>(dil: Dil, tr: T, en: T): T {
  return dil === "en" ? en : tr;
}
