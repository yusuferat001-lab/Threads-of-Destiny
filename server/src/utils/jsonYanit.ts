/**
 * Express `json replacer`: istemciye giden TÜM JSON yanıtlarından gizli oyun alanlarını çıkarır.
 *
 * `EkipUyesi.gercekKalite` oyuncudan bilerek gizlenir (yalnız bulanık `tahminiMin/Max` aralığı
 * gösterilir) ama ham `state` yanıtlarında ağ sekmesinden okunabiliyordu. Oturum kalıcılığı
 * (DB'ye `JSON.stringify`) bu replacer'dan etkilenmez — yalnız `res.json` kullanır.
 */
const GIZLI_ALANLAR = new Set(["gercekKalite"]);

export function gizliAlanlariCikar(anahtar: string, deger: unknown): unknown {
  return GIZLI_ALANLAR.has(anahtar) ? undefined : deger;
}
