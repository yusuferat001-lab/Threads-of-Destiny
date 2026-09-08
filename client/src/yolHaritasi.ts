/**
 * Giriş ekranındaki "Yol Haritası" panelinin içeriği — statik, düzenlenebilir liste.
 * `durum`: 'tamam' | 'yapiliyor' | 'yakinda' (i18n'de yhDurum* ile etiketlenir).
 * Kullanıcı bu listeyi istediği gibi düzenler; sıralama görünen sıradır.
 */
export type YolHaritasiDurum = 'tamam' | 'yapiliyor' | 'yakinda';

export interface YolHaritasiMaddesi {
  durum: YolHaritasiDurum;
  /** TR başlık (arayüz İngilizce olsa da şimdilik tek dilli). */
  baslik: string;
  /** İsteğe bağlı kısa not / tarih. */
  not?: string;
}

export const YOL_HARITASI: YolHaritasiMaddesi[] = [
  { durum: 'tamam', baslik: 'Başarım galerisi', not: 'Adlandırılmış, kilidi açılan başarımlar' },
  { durum: 'tamam', baslik: 'Ekonomi dengesi', not: 'Gayrimenkul, enflasyon, maaş ve aranma seviyesi elden geçti' },
  { durum: 'yapiliyor', baslik: 'Daha fazla gizemli olay', not: 'Büyücü, medyum, kehanet, ritüel' },
  { durum: 'yakinda', baslik: 'Yeni meslek: Zanaatkâr', not: 'Planlanıyor' },
  { durum: 'yakinda', baslik: 'Arayüzün tamamının İngilizceye çevrilmesi' },
];
