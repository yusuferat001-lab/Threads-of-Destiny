import type { CharacterState } from './types';

/** Din Adamı'nın seçilmeyi bekleyen bir öğretisi var mı? (sunucudaki ogretiBekliyorMu'nun aynası) */
export function ogretiBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Din Adamı') return false;
  const cm = (k.isletme as { cemaat?: { ogretiler?: string[] } } | null)?.cemaat;
  return !!cm && (cm.ogretiler?.length ?? 0) < (k.rutbe_seviye ?? 1);
}
