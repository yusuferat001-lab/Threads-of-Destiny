/**
 * Tekil istemci kimliği + günlük ziyaret ping'i (§32 istatistik).
 *
 * `istemci_id` tarayıcıda üretilen rastgele bir UUID'dir — hiçbir kişisel veri
 * içermez, yalnız "kaç farklı kişi" tahmini için sunucuya gönderilir. Ziyaret
 * ping'i günde en fazla bir kez atılır (localStorage'da son ping günü tutulur).
 */
import { istatistikOlayBildir } from './api';

const ID_ANAHTAR = 'kader-carki-istemci';
const GUN_ANAHTAR = 'kader-carki-ziyaret-gun';

export function istemciId(): string {
  try {
    let id = localStorage.getItem(ID_ANAHTAR);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `k-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(ID_ANAHTAR, id);
    }
    return id;
  } catch {
    // localStorage engelliyse (gizli sekme vb.) oturumluk geçici bir id yeter.
    return `gecici-${Math.random().toString(36).slice(2, 12)}`;
  }
}

/** Günde bir kez "ziyaret" olayı bildirir; hata yutar. */
export function ziyaretBildir(): void {
  const bugun = new Date().toISOString().slice(0, 10);
  try {
    if (localStorage.getItem(GUN_ANAHTAR) === bugun) return;
    localStorage.setItem(GUN_ANAHTAR, bugun);
  } catch {
    // günü kaydedemesek bile ping'i bir kez atmakta sakınca yok
  }
  void istatistikOlayBildir({ tur: 'ziyaret', istemci_id: istemciId() }).catch(() => {});
}
