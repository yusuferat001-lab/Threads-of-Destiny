import type { CharacterState } from "../src/types";
import { ogretiBekleyenSeviye, ogretiSec } from "../src/game/cemaat";
import { ogretiSecenekleri } from "../src/data/ogretiler";

/** Din Adamı testleri: bekleyen tüm öğretileri seçer (yoksa hiçbir şey yapmaz). */
export function ogretileriTamamla(state: CharacterState): void {
  for (let g = 0; g < 6; g++) {
    const sev = ogretiBekleyenSeviye(state);
    if (sev === null) return;
    ogretiSec(state, ogretiSecenekleri(sev)[0].id);
  }
}
