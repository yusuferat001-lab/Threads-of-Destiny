import { hataCevir } from "../i18n";
import { oturumDiliGetir } from "../game/gameEngine";
import type { Dil } from "../types";

/**
 * Yakalanan hatayı istemciye gönderilecek sade bir mesaja çevirir: `String(err)`
 * "Error: ..." öneki üretiyordu (istemci bunu bir kez daha sarıp oyuncuya
 * "Error: Error: Yeterli paran yok" gösteriyordu). Mesaj ayrıca oturumun diline
 * (İngilizce oynayana İngilizce) çevrilir.
 */
export function hataMetni(err: unknown, id?: string, dil?: Dil): string {
  const ham = err instanceof Error ? err.message : String(err);
  const temiz = ham.replace(/^(Error:\s*)+/i, "");
  return hataCevir(dil ?? (id ? oturumDiliGetir(id) : "tr"), temiz);
}
