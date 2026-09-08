/**
 * Giriş ekranındaki "Yapımcı" kartının içeriği — tamamen statik, cihaz/dile bağlı değil.
 * Kullanıcı (geliştirici) buradaki üç alanı kendi bilgileriyle doldurur.
 *
 * NOT: `linkedin` boş string ("") bırakılırsa kartta link gösterilmez, yalnız isim + tanıtım çıkar.
 */
export interface YapimciBilgisi {
  isim: string;
  /** Tek satırlık tanıtım (ör. "Yazılım geliştirici · tarih ve oyun tutkunu"). */
  tanitim: string;
  /** Tam LinkedIn profil URL'si (https://... ). Boşsa link gizlenir. */
  linkedin: string;
}

export const YAPIMCI: YapimciBilgisi = {
  isim: 'Yusuf Erat',
  tanitim: 'Kader Çarkı\'nın tasarımcısı ve geliştiricisi.',
  linkedin: '', // TODO: tam LinkedIn URL'sini buraya yapıştır — boş kalırsa link gösterilmez.
};
