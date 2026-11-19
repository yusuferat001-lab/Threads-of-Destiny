import type { CharacterState } from './types';

/** Yanıtlanmayı bekleyen otorite talebi (bağış / sadakat / açıklama / ekstra vergi) var mı? (sunucudaki talepBekliyorMu'nun aynası) */
export function talepBekliyor(k: CharacterState | null): boolean {
  return !!k && k.aktif && !!k.yonetim_talep;
}

/** Din Adamı'nın seçilmeyi bekleyen bir öğretisi var mı? (sunucudaki ogretiBekliyorMu'nun aynası) */
export function ogretiBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Din Adamı') return false;
  const cm = (k.isletme as { cemaat?: { ogretiler?: string[] } } | null)?.cemaat;
  return !!cm && (cm.ogretiler?.length ?? 0) < (k.rutbe_seviye ?? 1);
}

/** Din Adamı'nın cevap bekleyen bir münazarası var mı? (sunucudaki munazaraBekliyorMu'nun aynası) */
export function munazaraBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Din Adamı') return false;
  return !!(k.isletme as { cemaat?: { munazara_bekleyen?: unknown } } | null)?.cemaat?.munazara_bekleyen;
}

/** Zanaatkâr atölye projesi ya da Tüccar seferi süresi dolmuş, karar bekliyor mu? (sunucudaki projeBekliyorMu'nun aynası) */
export function projeBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || (k.meslek !== 'Zanaatkâr' && k.meslek !== 'Tüccar')) return false;
  return !!(k.isletme as { proje?: { karar_bekliyor?: boolean } | null } | null)?.proje?.karar_bekliyor;
}

/** Asker'in seçilmeyi bekleyen bir doktrini var mı? (sunucudaki doktrinBekliyorMu'nun aynası) */
export function doktrinBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Asker') return false;
  const b = (k.isletme as { birlik?: { doktrinler?: string[] } } | null)?.birlik;
  return !!b && (b.doktrinler?.length ?? 0) < (k.rutbe_seviye ?? 1);
}

/** Asker savaştayken savaş kararı penceresi gerekebilir (karar sunucudan sorgulanır). */
export function savasKarariOlasi(k: CharacterState | null): boolean {
  return !!k && k.aktif && k.meslek === 'Asker' && !!k.ulke?.savasta && !!(k.isletme as { birlik?: unknown } | null)?.birlik;
}

/** Asker'in barış çatışması (haydut/sınır) kararı bekliyor mu? (sunucudaki catismaBekliyorMu'nun aynası) */
export function catismaBekliyor(k: CharacterState | null): boolean {
  if (!k || !k.aktif || k.meslek !== 'Asker' || k.ulke?.savasta) return false;
  const b = (k.isletme as { birlik?: { catisma_bekleyen?: unknown } } | null)?.birlik;
  return !!b?.catisma_bekleyen && !k.etiketler.includes('hapiste') && !k.etiketler.includes('yolculukta');
}
