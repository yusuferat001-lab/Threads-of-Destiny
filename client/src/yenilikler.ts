/**
 * "Yenilikler" (What's New) popup — cihaz-yerel (`localStorage`), tek seferlik.
 *
 * Bir sürüm güncellemesi sonrası oyuncuya eklenen özellikleri (yeni meslek,
 * yeni skor formülü, yeni olaylar vb.) gösteren, giriş ekranı ilk açıldığında
 * beliren, sonra bir daha görünmeyen bir bildirim. `gunlukSeri.ts`/
 * `basarimSistemi.ts` migrasyon bayraklarıyla aynı "tek anahtar, tek sefer"
 * deseni.
 *
 * Yeni bir "yenilikler" turu eklenecekse `SURUM`'u artır — eski sürümü
 * görmüş oyuncular yeni sürümü de bir kez görür (bayar sürüme göre saklanır).
 */

const SURUM = 1;
const ANAHTAR = 'kader_carki_yenilik_gorulen_surum';

export function yenilikGosterilmeliMi(): boolean {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    const gorulen = ham ? Number(ham) : 0;
    return !Number.isFinite(gorulen) || gorulen < SURUM;
  } catch {
    return false;
  }
}

export function yenilikGorulduIsaretle(): void {
  try {
    localStorage.setItem(ANAHTAR, String(SURUM));
  } catch {
    // localStorage erişilemezse sessizce yok say
  }
}
