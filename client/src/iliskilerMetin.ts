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
  barSayi: ['{0}/100', '{0}/100'],
  // Eylemler
  zamanGecir: ['⏳ Zaman Geçir', '⏳ Spend Time'],
  zamanGecirAlt: ['ücretsiz · biraz yorucu', 'free · a bit tiring'],
  hediyeUcuz: ['🎁 Küçük Hediye', '🎁 Small Gift'],
  hediyePahali: ['💎 Pahalı Hediye', '💎 Costly Gift'],
  henuzErken: ['Henüz erken', 'Too soon'],
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
  gizliHuy: ['Bir huyu daha var…', 'Has another trait…'],
  teklifSade: ['Sade teklif', 'Plain proposal'],
  teklifUcuz: ['Küçük hediyeyle', 'With a small gift'],
  teklifPahali: ['Pahalı hediyeyle', 'With a costly gift'],
  teklifEt: ['💍 Teklif Et', '💍 Propose'],
  // Kapalı sebepleri
  sebepYasDusuk: ['Mantık evliliği {0} yaşından sonra açılır.', 'Arranged marriage opens at age {0}.'],
  sebepYasDonemi: ['Yas tutuyorsun; yeni bir evlilik için biraz zaman geçmeli.', 'You are in mourning; it is too soon to think of a new marriage.'],
  sebepKilit: ['Son teklifin reddedildi; bir süre sonra yeniden deneyebilirsin.', 'Your last proposal was turned down; try again after a while.'],
  sebepHapis: ['Şu an evlilik için uygun değilsin.', 'You are in no position to marry right now.'],
  // Düğün
  dugunIntro: ['{0} teklifini kabul etti. Düğününü nasıl yapacaksın?', '{0} accepted. How will you hold the wedding?'],
  dugunUcuz: ['Mütevazı Düğün', 'Modest Wedding'],
  dugunOrta: ['Orta Düğün', 'Fair Wedding'],
  dugunPahali: ['Görkemli Düğün', 'Grand Wedding'],
  dugunIliski: ['ilişki {0}', 'bond {0}'],
  dugunSohret: ['şöhret {0}', 'fame {0}'],
  dugunMaliyet: ['{0} {1}', '{0} {1}'],
  // Sevgili (aşk evliliği)
  sevgiliBaslik: ['Sevgilin', 'Your Sweetheart'],
  sevgiliDargin: ['Teklif beklemekten yoruldu ve sana darıldı. Gönlünü almazsan ayrılabilir.', 'Tired of waiting, they are cross with you. They may leave unless you win them back.'],
  sevgiliTeklif: ['💍 Evlenme Teklif Et', '💍 Propose'],
  gonulAl: ['🌹 Gönlünü Al', '🌹 Win Them Back'],
  sevgiliAyril: ['💔 Ayrıl', '💔 Break Up'],
  sebepSevgili: ['Bir sevgilin var; önce o ilişkiyi sonuçlandır.', 'You have a sweetheart; settle that relationship first.'],
  // Tanışma penceresi
  tanismaBaslik: ['💞 Göz Göze', '💞 Eye to Eye'],
  tanismaYaklas: ['Yanına git', 'Walk over'],
  tanismaVazgec: ['Vazgeç', 'Let it go'],
  // Çocuğu yanına alma (15 yaş)
  yanimaAl: ['💼 Yanıma Al', '💼 Take On'],
  yanimaAlAciklama: ['Yanında çalışmaya davet et.', 'Invite them to work beside you.'],
  yanindaCalisiyor: ['Yanında çalışıyor', 'Works beside you'],
  redOfke: ['😠 Öfkelen', '😠 Flare Up'],
  redSakin: ['🤝 Sakin Karşıla', '🤝 Take It Calmly'],
  redBasligi: ['Teklifini reddetti. Ona nasıl karşılık vereceksin?', 'They turned you down. How will you respond?'],
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
