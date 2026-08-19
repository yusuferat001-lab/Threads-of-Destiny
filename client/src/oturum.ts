/**
 * Aktif oyunun sunucu tarafındaki state.id'sini tarayıcıda saklar; sayfa yenilenince
 * (ya da sekme kapatılıp geri açılınca) kaldığı yerden devam edebilmek için kullanılır.
 * Sadece bir kimlik (rastgele UUID) tutulur — hiçbir kişisel/hassas veri saklanmaz.
 */
const ANAHTAR = 'kader-carki-aktif-oturum-id';

export function aktifOturumIdGetir(): string | null {
  try {
    return localStorage.getItem(ANAHTAR);
  } catch {
    return null;
  }
}

export function aktifOturumIdKaydet(id: string): void {
  try {
    localStorage.setItem(ANAHTAR, id);
  } catch {
    // localStorage kapalı/dolu olabilir (gizli sekme vb.) — devam alma özelliği sessizce devre dışı kalır.
  }
}

export function aktifOturumIdSil(): void {
  try {
    localStorage.removeItem(ANAHTAR);
  } catch {
    // Yoksayılır.
  }
}
