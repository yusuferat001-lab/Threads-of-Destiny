import type { Dil } from './ayarlar';

/**
 * Minimal arayüz sözlüğü. Şimdilik yalnızca ayarlar ekranını ve ayar/dişli düğmesini
 * kapsar — oyunun geri kalanı (menüler, olay metinleri, üretilen anlatı) Türkçedir.
 * Dil seçici altyapısı burada hazır; kapsam ileride adım adım genişletilebilir.
 *
 * `EN` nesnesi `typeof TR` tipine sahip olduğu için bir anahtarı çevirmeyi unutmak
 * derleme hatası verir — iki dilin anahtar kümesi her zaman eşit kalır.
 */
const TR = {
  ayarlarBaslik: 'Ayarlar',
  ayarlarİpucu: 'Ayarlar',
  sekmeGenel: 'Genel',
  sekmeGeriBildirim: 'Görüş & Öneri',
  kapat: 'Kapat',

  dilBaslik: 'Dil',
  dilAciklama: 'Arayüz dili. Oyun içi olay metinleri şu an yalnızca Türkçedir.',
  dilTurkce: 'Türkçe',
  dilIngilizce: 'English (beta)',
  dilBetaNot: 'İngilizce çeviri kademeli olarak ekleniyor; şimdilik menülerin bir kısmı Türkçe kalır.',

  sesBaslik: 'Ses',
  sesAciklama: 'Seçim sonuçlarında çalan kısa geri bildirim sesleri.',
  sesAcik: 'Açık',
  sesKapali: 'Kapalı',

  gbBaslik: 'Görüşünü paylaş',
  gbAciklama: 'Bir hata mı buldun, bir fikrin mi var? Doğrudan geliştiriciye ulaşır.',
  gbKategoriHata: '🐞 Hata',
  gbKategoriOneri: '💡 Öneri',
  gbKategoriDiger: '💬 Diğer',
  gbMesajYer: 'Mesajını buraya yaz…',
  gbIletisimYer: 'E-posta veya kullanıcı adı (isteğe bağlı — yanıt için)',
  gbGonder: 'Gönder',
  gbGonderiliyor: 'Gönderiliyor…',
  gbBasarili: 'Teşekkürler! Mesajın iletildi.',
  gbHata: 'Gönderilemedi. Lütfen biraz sonra tekrar dene.',
  gbCokKisa: 'Lütfen birkaç kelimelik bir mesaj yaz.',
  gbYeniMesaj: 'Yeni mesaj gönder',
} as const;

type Metinler = { [K in keyof typeof TR]: string };

const EN: Metinler = {
  ayarlarBaslik: 'Settings',
  ayarlarİpucu: 'Settings',
  sekmeGenel: 'General',
  sekmeGeriBildirim: 'Feedback',
  kapat: 'Close',

  dilBaslik: 'Language',
  dilAciklama: 'Interface language. In-game event text is Turkish only for now.',
  dilTurkce: 'Türkçe',
  dilIngilizce: 'English (beta)',
  dilBetaNot: 'The English translation is being added gradually; some menus stay Turkish for now.',

  sesBaslik: 'Sound',
  sesAciklama: 'Short feedback sounds played on choice outcomes.',
  sesAcik: 'On',
  sesKapali: 'Off',

  gbBaslik: 'Share your thoughts',
  gbAciklama: 'Found a bug or have an idea? It goes straight to the developer.',
  gbKategoriHata: '🐞 Bug',
  gbKategoriOneri: '💡 Idea',
  gbKategoriDiger: '💬 Other',
  gbMesajYer: 'Write your message here…',
  gbIletisimYer: 'Email or username (optional — for a reply)',
  gbGonder: 'Send',
  gbGonderiliyor: 'Sending…',
  gbBasarili: 'Thank you! Your message was sent.',
  gbHata: 'Could not send. Please try again later.',
  gbCokKisa: 'Please write a few words.',
  gbYeniMesaj: 'Send another message',
};

export function metinler(dil: Dil): Metinler {
  return dil === 'en' ? EN : TR;
}
