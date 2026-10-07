/**
 * Aile mesleği adını şablona yerleştirirken kullanılan küçük yardımcılar.
 *
 * Bazı aile adları zaten "Ailesi"/"Aile"/"Family" içeriyor ("Hacı Ailesi",
 * "Kumarbaz Aile", "Pilgrim Family"); şablonlar da "{0} Ailesinin Çocuğu",
 * "{0} family" gibi ekliyor — sonuç "Hacı Ailesi Ailesinin Çocuğu" oluyordu.
 */

/** Aile adının sonundaki "Ailesi"/"Aile"/"Family" kelimesini atar. */
export function aileKokAdi(ad: string): string {
  return ad.replace(/\s+(Ailesi|Aile|Family)$/u, '');
}

/** İngilizce belirsiz tanımlık: ünlüyle başlayan kelimede "an" ("an Engineer family"). */
export function enTanimlik(kelime: string): string {
  return /^[aeiou]/i.test(kelime.trim()) ? 'an' : 'a';
}
