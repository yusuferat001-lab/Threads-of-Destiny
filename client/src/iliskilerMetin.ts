// İlişkiler ekranının (eş / mantık evliliği / düğün) metinleri. Yeni ekranlarda olduğu gibi
// bileşene yakın tutulan TR+EN çiftleri (i18n.ts yerine); anahtar kümesi tek yerde.

import type { AileHuy } from './types';
import type { Dil } from './ayarlar';
import { bic } from './i18n';

const METIN = {
  // Başlıklar
  esBaslik: ['Eşin', 'Your Spouse'],
  adaylarBaslik: ['Evlilik Adayları', 'Marriage Candidates'],
  dugunBaslik: ['Düğün Hazırlığı', 'Wedding Plans'],
  // Eş kartı
  turAsk: ['Aşk evliliği', 'Love match'],
  turMantik: ['Mantık evliliği', 'Arranged marriage'],
  yasEk: ['{0} yaşında', 'aged {0}'],
  meslekBonusu: ['Eşinin desteği: maaşa +%{0}', "Spouse's support: +{0}% income"],
  ihmalUyari: ['Eşin senden ilgi bekliyor.', 'Your spouse is waiting for your attention.'],
  barSayi: ['{0}/100', '{0}/100'],
  // Eylemler
  zamanGecir: ['⏳ Zaman Geçir', '⏳ Spend Time'],
  zamanGecirAlt: ['ücretsiz · biraz yorucu', 'free · a bit tiring'],
  hediyeUcuz: ['🎁 Küçük Hediye', '🎁 Small Gift'],
  hediyePahali: ['💎 Pahalı Hediye', '💎 Costly Gift'],
  kilitYil: ['~{0} yıl', '~{0} yr'],
  paraYetmez: ['Paran yetmiyor', 'Not enough money'],
  // Mantık adayları
  adayIntro: [
    'Aileler arasında yürüyen bir evlilik. Aday listesi birkaç yılda bir yenilenir.',
    'A match made between families. The list refreshes every few years.',
  ],
  genc: ['Genç', 'Young'],
  olgun: ['Olgun', 'Mature'],
  gencAciklama: ['Çocuk ihtimali yüksek, standart çeyiz.', 'Likely to have children, standard dowry.'],
  olgunAciklama: ['Çocuk ihtimali çok düşük; çeyiz ve katkısı 1,5 kat.', 'Unlikely to have children; dowry and support are 1.5× larger.'],
  ceyiz: ['Çeyiz: {0} {1}', 'Dowry: {0} {1}'],
  bonus: ['Meslek bonusu: +%{0}', 'Trade bonus: +{0}%'],
  gizliHuy: ['Bir huyu daha var…', 'Has another trait…'],
  teklifSade: ['Sade teklif', 'Plain proposal'],
  teklifUcuz: ['Küçük hediyeyle', 'With a small gift'],
  teklifPahali: ['Pahalı hediyeyle', 'With a costly gift'],
  teklifEt: ['💍 Teklif Et', '💍 Propose'],
  sans: ['şans ~%{0}', 'chance ~{0}%'],
  yenileme: ['Liste ~{0} yıl sonra yenilenir.', 'The list refreshes in ~{0} yr.'],
  // Kapalı sebepleri
  sebepYasDusuk: ['Mantık evliliği {0} yaşından sonra açılır.', 'Arranged marriage opens at age {0}.'],
  sebepYasDonemi: ['Yas tutuyorsun; ~{0} yıl sonra yeni bir evlilik düşünebilirsin.', 'You are in mourning; in ~{0} yr you may think of a new marriage.'],
  sebepKilit: ['Son teklifin reddedildi; ~{0} yıl sonra yeniden deneyebilirsin.', 'Your last proposal was turned down; try again in ~{0} yr.'],
  sebepHapis: ['Şu an evlilik için uygun değilsin.', 'You are in no position to marry right now.'],
  // Düğün
  dugunIntro: ['{0} teklifini kabul etti. Düğününü nasıl yapacaksın?', '{0} accepted. How will you hold the wedding?'],
  dugunCeyiz: ['Çeyiz olarak {0} {1} gelecek.', 'A dowry of {0} {1} will arrive.'],
  dugunUcuz: ['Mütevazı Düğün', 'Modest Wedding'],
  dugunOrta: ['Orta Düğün', 'Fair Wedding'],
  dugunPahali: ['Görkemli Düğün', 'Grand Wedding'],
  dugunIliski: ['ilişki {0}', 'bond {0}'],
  dugunSohret: ['şöhret {0}', 'fame {0}'],
  dugunMaliyet: ['{0} {1}', '{0} {1}'],
  // Huylar
  huy_mizahsever: ['Mizah sever', 'Humorous'],
  huy_parasever: ['Parayı sever', 'Fond of money'],
  huy_ciddi: ['Ciddi', 'Serious'],
  huy_maceraci: ['Maceracı', 'Adventurous'],
  huy_sefkatli: ['Şefkatli', 'Tender'],
  huy_gururlu: ['Gururlu', 'Proud'],
} as const;

export type IliskiMetinAnahtari = keyof typeof METIN;

/** Dil + anahtar → metin; `{0} {1}` yer tutucuları verilen argümanlarla doldurulur. */
export function im(dil: Dil, anahtar: IliskiMetinAnahtari, ...args: (string | number)[]): string {
  const cift = METIN[anahtar];
  return bic(dil === 'en' ? cift[1] : cift[0], ...args);
}

export function huyAdi(dil: Dil, huy: AileHuy): string {
  return im(dil, `huy_${huy}` as IliskiMetinAnahtari);
}
