import type { Dil } from './ayarlar';

/**
 * Evcil hayvanın edinirken atanan kalıcı pasif bonusu (sunucudaki data/evcilHayvanlar.ts
 * HAYVAN_BONUSLARI ile elle senkron). Karşılaşma anında gösterilmez; hayvan sahiplenildikten
 * sonra Aile ekranında ve sol panelde ismin yanında yazar.
 */
const HAYVAN_BONUSLARI: Record<string, { kisa: { tr: string; en: string }; aciklama: { tr: string; en: string } }> = {
  kopek_savunma: {
    kisa: { tr: 'Savunma', en: 'Defense' },
    aciklama: { tr: 'Soygun, sabotaj ve rakip saldırısı riskini düşürür.', en: 'Lowers the risk of theft, sabotage and rival attacks.' },
  },
  kopek_saglik: {
    kisa: { tr: 'Sağlık', en: 'Health' },
    aciklama: { tr: 'Hastalık, salgın ve yaralanmalara karşı direnci artırır.', en: 'Raises resistance to illness, plague and injury.' },
  },
  kedi_mutluluk: {
    kisa: { tr: 'Mutluluk', en: 'Happiness' },
    aciklama: { tr: 'Kötü olayların mutluluk kaybını hafifletir.', en: 'Softens the happiness lost to bad events.' },
  },
  kedi_sans: {
    kisa: { tr: 'Şans', en: 'Luck' },
    aciklama: { tr: 'Riskli kararlarda küçük bir başarı şansı ekler.', en: 'Adds a small success chance to risky decisions.' },
  },
  sahin_sohret: {
    kisa: { tr: 'Şöhret', en: 'Renown' },
    aciklama: { tr: 'Yönetici figürlerle ilişkiyi ve şöhreti yavaşça artırır.', en: 'Slowly raises renown and standing with rulers.' },
  },
  sahin_saldiri: {
    kisa: { tr: 'Saldırı', en: 'Offense' },
    aciklama: { tr: 'Rakip ve çatışmalarda baskı gücünü artırır.', en: 'Adds pressure against rivals and in clashes.' },
  },
  karga_istihbarat: {
    kisa: { tr: 'İstihbarat', en: 'Intel' },
    aciklama: { tr: 'Rakip komplolarını sezdirir, tecrübe kazancını artırır.', en: 'Senses rival plots and boosts career experience.' },
  },
  karga_karanlik: {
    kisa: { tr: 'Karanlık işler', en: 'Shady work' },
    aciklama: { tr: 'Gizli ve yasadışı işlerde başarı şansını artırır.', en: 'Raises success chances in secret and illegal deeds.' },
  },
  at_ticaret: {
    kisa: { tr: 'Ticaret', en: 'Trade' },
    aciklama: { tr: 'Ticaret kazançlarını ve mülk getirisini biraz artırır.', en: 'Slightly raises trade earnings and property income.' },
  },
  at_enerji: {
    kisa: { tr: 'Enerji', en: 'Stamina' },
    aciklama: { tr: 'Aile etkileşimlerinin bekleme süresini kısaltır.', en: 'Shortens the cooldown of family interactions.' },
  },
};

export function hayvanBonusBilgisi(bonusId: string, dil: Dil): { kisa: string; aciklama: string } | null {
  const b = HAYVAN_BONUSLARI[bonusId];
  return b ? { kisa: b.kisa[dil], aciklama: b.aciklama[dil] } : null;
}
