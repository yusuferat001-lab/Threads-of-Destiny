import type { CharacterState } from "../src/types";
import { ogretiBekleyenSeviye, ogretiSec } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";
import { vergiBekliyorMu } from "../src/data/ekstraVergi";
import { senaryoUret, yonetimTalebiKararlastir } from "../src/game/gameEngine";

/** Din Adamı testleri: bekleyen tüm öğretileri seçer (yoksa hiçbir şey yapmaz). */
export function ogretileriTamamla(state: CharacterState): void {
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(state);
    if (sev === null) return;
    ogretiSec(state, ogretiSecenekleri(sev)[0].id);
  }
}

/** Uzun bot döngüleri: bekleyen ekstra vergi talebini öder (yoksa hiçbir şey yapmaz), sonra senaryo çeker. */
export async function vergisizSenaryo(state: CharacterState) {
  if (vergiBekliyorMu(state)) await yonetimTalebiKararlastir(state.id, "kabul");
  return senaryoUret(state.id);
}
