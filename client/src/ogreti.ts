import type { CharacterState } from './types';

/** Yanıtlanmayı bekleyen ekstra vergi talebi var mı? (sunucudaki vergiBekliyorMu'nun aynası) */
export function vergiBekliyor(k: CharacterState | null): boolean {
  return !!k && k.aktif && k.yonetim_talep?.tur === 'vergi';
}

/** Din Adamı'nın seçilmeyi bekleyen bir öğretisi var mı? (sunucudaki ogretiBekliyorMu'nun aynası) */
export function ogretiBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Din Adamı') return false;
  const cm = (k.isletme as { cemaat?: { ogretiler?: string[] } } | null)?.cemaat;
  return !!cm && (cm.ogretiler?.length ?? 0) < (k.rutbe_seviye ?? 1);
}
