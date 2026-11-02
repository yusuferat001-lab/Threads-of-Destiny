import type { CharacterState } from "../src/types";
import { ogretiBekleyenSeviye, ogretiSec } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import { vergiBekliyorMu } from "../src/data/ekstraVergi";
import { senaryoUret, stateGetir, yonetimTalebiKararlastir } from "../src/game/gameEngine";
import { doktrinBekleyenSeviye } from "../src/game/birlik";
import { doktrinSec, savasKarariBekliyorMu, savasKarariDurumu, savasKarariVer } from "../src/game/birlikIslem";
import { doktrinSecenekleri } from "../src/data/birlik";
import { isletmeBaglami } from "../src/game/stateManager";

/** Din Adamı testleri: bekleyen tüm öğretileri seçer (yoksa hiçbir şey yapmaz). */
export function ogretileriTamamla(state: CharacterState): void {
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(state);
    if (sev === null) break;
    ogretiSec(state, ogretiSecenekleri(sev)[0].id);
  }
  doktrinleriTamamla(state);
  savasKararlariniVer(state);
}

/** Asker testleri: bekleyen tüm rütbe doktrinlerini seçer (yoksa hiçbir şey yapmaz). */
export function doktrinleriTamamla(state: CharacterState): void {
  if (state.meslek !== "Asker" || !state.isletme?.birlik) return;
  for (let g = 0; g < 6; g++) {
    const sev = doktrinBekleyenSeviye(state);
    if (sev === null) return;
    doktrinSec(state, doktrinSecenekleri(sev, null)[0].id);
  }
}

/** Asker testleri: savaş yılında bekleyen zorunlu savaş kararlarını ilk seçenekle verir. */
export function savasKararlariniVer(state: CharacterState): void {
  if (state.meslek !== "Asker" || !state.isletme?.birlik) return;
  for (let g = 0; g < 10 && savasKarariBekliyorMu(state); g++) {
    const d = savasKarariDurumu(state);
    if (!d) return;
    savasKarariVer(state, d.secenekler[0].id, isletmeBaglami(state));
  }
}

/** Uzun bot döngüleri: bekleyen ekstra vergi talebini öder (yoksa hiçbir şey yapmaz), sonra senaryo çeker. */
export async function vergisizSenaryo(state: CharacterState) {
  ogretileriTamamla(state);
  if (vergiBekliyorMu(state)) await yonetimTalebiKararlastir(state.id, "kabul");
  return senaryoUret(state.id);
}

/** Motor üzerinden oynayan Asker testleri: id ile durumu bulup bekleyen öğreti/doktrin/savaş kararlarını tamamlar. */
export async function bekleyenleriCoz(id: string): Promise<void> {
  ogretileriTamamla(await stateGetir(id));
}
