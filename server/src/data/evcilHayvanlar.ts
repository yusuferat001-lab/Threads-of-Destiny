/** Çağa göre edinilebilecek evcil hayvan türleri (flavor amaçlı, olay bazlı seçilir). */
export const EVCIL_HAYVAN_TURLERI: Record<string, string[]> = {
  "Orta Çağ": ["Kedi", "Köpek", "Şahin"],
  "Sanayi Devrimi": ["Kedi", "Köpek", "Papağan"],
};

const HAYVAN_ISIMLERI = [
  "Boncuk",
  "Tekir",
  "Duman",
  "Şeker",
  "Pamuk",
  "Zeytin",
  "Kömür",
  "Fındık",
  "Minnoş",
  "Bulut",
  "Toprak",
  "Yıldız",
];

export function rastgeleHayvanTuruSec(cag: string): string {
  const liste = EVCIL_HAYVAN_TURLERI[cag] ?? ["Kedi"];
  return liste[Math.floor(Math.random() * liste.length)];
}

export function rastgeleHayvanIsmiSec(): string {
  return HAYVAN_ISIMLERI[Math.floor(Math.random() * HAYVAN_ISIMLERI.length)];
}

/** Türden bağımsız, her evcil hayvan sahibine her zaman uygun olan takip olayları; garanti mekanizması bu havuzdan zorla seçer. */
export const EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI = [
  "evcil_hayvan_hastalik",
  "evcil_hayvan_sadakat_ani",
  "evcil_hayvan_kaybolma",
  "evcil_hayvan_koruma_ani",
  "evcil_hayvan_altin_kese",
  "evcil_hayvan_yeni_tanisiklik",
];

/** Yukarıdaki genel havuz artı türe özel takip olayları; "50 yaşına kadar en az iki hayvan olayı" sayımı bu tam listeye göre yapılır. */
export const EVCIL_HAYVAN_TAKIP_OLAY_IDLERI = [
  ...EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI,
  "evcil_hayvan_sahin_av",
  "evcil_hayvan_sahin_kacis",
  "evcil_hayvan_papagan_agiz_kacirma",
  "evcil_hayvan_papagan_taklit_yetenegi",
  "evcil_hayvan_kedi_yikim",
  "evcil_hayvan_kopek_kahramanlik",
  "evcil_hayvan_kopek_ev_tahribati",
  "evcil_hayvan_kedi_komsu_zarari",
  "evcil_hayvan_kurt_vahsi_icgudu",
  "evcil_hayvan_kurt_sürü_ozlemi",
];
