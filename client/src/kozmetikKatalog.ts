/**
 * Kalıcı kozmetik dolabı katalogu — hesap/cihaz düzeyinde, hayattan bağımsız
 * görsel eşyalar. Oyun-içi `magaza_envanteri`den (§26, karakter ölünce kaybolur)
 * TAMAMEN AYRI bir katman: burada satın alınan hiçbir şey hiçbir stat/güç
 * etkisi taşımaz, salt görünüm. Miras (`miras.ts`) ile satın
 * alınır, `kozmetikDolabi.ts` localStorage'da hangilerinin sahiplenildiğini/
 * giyildiğini tutar, `KarakterAvatari` bunları katman olarak render eder.
 *
 * Kasıtlı olarak çağdan bağımsız (bir "meta" koleksiyon katmanı — tıpkı diğer
 * oyunlardaki "skin" sistemleri gibi ufak bir zaman-dışılık kabul edilebilir):
 * bir Sanayi Devrimi karakterinin Orta Çağ tacı takması bir hata değil, bilinçli
 * bir tasarım kararı.
 */
export type KozmetikKategori = 'bas' | 'sirt' | 'cerceve';
export type KozmetikNadirlik = 'yaygin' | 'nadir' | 'efsanevi';

export interface KozmetikEsyaTanimi {
  id: string;
  kategori: KozmetikKategori;
  ad: { tr: string; en: string };
  /** "bas"/"sirt" kategorisi: avatarın üstüne binen emoji. */
  emoji?: string;
  /** "cerceve" kategorisi: avatarın etrafındaki halka rengi. */
  renk?: string;
  fiyat: number;
  nadirlik: KozmetikNadirlik;
}

export const KOZMETIK_KATALOG: KozmetikEsyaTanimi[] = [
  // --- Baş ---
  { id: 'bas_kukuleta', kategori: 'bas', ad: { tr: 'Gezgin Kukuletası', en: "Traveler's Hood" }, emoji: '🧢', fiyat: 15, nadirlik: 'yaygin' },
  { id: 'bas_migfer', kategori: 'bas', ad: { tr: 'Savaşçı Miğferi', en: "Warrior's Helm" }, emoji: '🪖', fiyat: 40, nadirlik: 'nadir' },
  { id: 'bas_silindir', kategori: 'bas', ad: { tr: 'Silindir Şapka', en: 'Top Hat' }, emoji: '🎩', fiyat: 45, nadirlik: 'nadir' },
  { id: 'bas_tac', kategori: 'bas', ad: { tr: 'Kraliyet Tacı', en: 'Royal Crown' }, emoji: '👑', fiyat: 120, nadirlik: 'efsanevi' },

  // --- Sırt / aksesuar ---
  { id: 'sirt_atki', kategori: 'sirt', ad: { tr: 'Yün Atkı', en: 'Wool Scarf' }, emoji: '🧣', fiyat: 12, nadirlik: 'yaygin' },
  { id: 'sirt_pelerin', kategori: 'sirt', ad: { tr: 'Gezgin Pelerini', en: "Traveler's Cape" }, emoji: '🧥', fiyat: 20, nadirlik: 'yaygin' },
  { id: 'sirt_kanat', kategori: 'sirt', ad: { tr: 'Gölge Kanatları', en: 'Shadow Wings' }, emoji: '🦇', fiyat: 120, nadirlik: 'efsanevi' },

  // --- Çerçeve (madalyon halkası rengi) ---
  { id: 'cerceve_bronz', kategori: 'cerceve', ad: { tr: 'Bronz Çerçeve', en: 'Bronze Frame' }, renk: '#8a6a2a', fiyat: 10, nadirlik: 'yaygin' },
  { id: 'cerceve_gumus', kategori: 'cerceve', ad: { tr: 'Gümüş Çerçeve', en: 'Silver Frame' }, renk: '#b9c2cc', fiyat: 35, nadirlik: 'nadir' },
  { id: 'cerceve_altin', kategori: 'cerceve', ad: { tr: 'Altın Çerçeve', en: 'Gold Frame' }, renk: '#e0c789', fiyat: 50, nadirlik: 'nadir' },
  { id: 'cerceve_yakut', kategori: 'cerceve', ad: { tr: 'Yakut Çerçeve', en: 'Ruby Frame' }, renk: '#b5293a', fiyat: 100, nadirlik: 'efsanevi' },
  { id: 'cerceve_zumrut', kategori: 'cerceve', ad: { tr: 'Zümrüt Çerçeve', en: 'Emerald Frame' }, renk: '#2a8a5a', fiyat: 100, nadirlik: 'efsanevi' },
];

export function kozmetikTanimGetir(id: string): KozmetikEsyaTanimi | undefined {
  return KOZMETIK_KATALOG.find((e) => e.id === id);
}
