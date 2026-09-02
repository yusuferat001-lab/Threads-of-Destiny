import { Cag, MagazaEsyaKategori } from "../types";

/**
 * Bir eşyanın fiyatının, dünyanın o anki durumuna göre nasıl çarpılacağını
 * tanımlar (bkz. stateManager.ts magazaFiyatiHesapla). Belirtilmeyen alanlar
 * çarpan 1 (etkisiz) sayılır. Şifa eşyaları krizlerde/savaşta genelde
 * PAHALANIR (kıtlık/kaos arzı azaltır); lüks eşyalar genelde UCUZLAR (kimse
 * kriz sırasında mücevher almaz) — bu kasıtlı ters yön, mağazayı dünya
 * durumunun okunabilir bir yansıması yapar.
 */
export interface MagazaFiyatEtkenleri {
  savasta?: number;
  vebada?: number;
  kitlik?: number;
  isyan?: number;
  altin_cag?: number;
  ekonomiIyi?: number;
  ekonomiKotu?: number;
}

export interface MagazaEsyasiTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  kategori: MagazaEsyaKategori;
  /** Enflasyonla ölçeklenen taban fiyat (bkz. enflasyonCarpani); nihai fiyat ayrıca fiyatEtkenleri ile çarpılır. */
  tabanFiyat: number;
  saglikEtkisi?: number;
  mutlulukEtkisi?: number;
  /** Sadece "luks" kategorisi: satın alınır alınmaz bir kereliğine uygulanan ün artışı. */
  unEtkisi?: number;
  /** Sadece "sifa" kategorisi: kaç yıl içinde kullanılmazsa çürüyüp envanterden silineceği (7-12 yıl arası). */
  omurYil?: number;
  fiyatEtkenleri?: MagazaFiyatEtkenleri;
  /** Belirtilmezse her çağda satılır. */
  cag?: Cag;
}

/**
 * Fiyat/etki dengesi kasıtlı olarak KADEMELİDİR: ucuz "sifa" eşyaları sadece
 * sağlık verir (küçük miktar); belli bir fiyatın üstündekiler hem sağlık hem
 * mutluluk verir (daha büyük miktar) — ve pahalı eşyaların fiyat başına
 * verdiği toplam etki, ucuzlardan daha İYİDİR (biriktirip pahalıya çıkmak
 * teşvik edilir). Tam liste ve gerekçe için CLAUDE.md §26/§16.
 */
export const MAGAZA_ESYALARI: MagazaEsyasiTanimi[] = [
  // ---- Temel Tüketim & Şifa: gerçekçi dönem ilaçları/erzak, ucuzu sadece sağlık verir, pahalısı hem sağlık hem mutluluk ----
  {
    id: "kaliteli_erzak",
    ad: "Kaliteli Erzak Sepeti",
    simge: "🧺",
    aciklama: "Taze ekmek, peynir ve kurutulmuş et; günlerce dayanan doyurucu bir sepet.",
    kategori: "sifa",
    tabanFiyat: 16,
    saglikEtkisi: 6,
    omurYil: 7,
    fiyatEtkenleri: { kitlik: 1.6, savasta: 1.3, altin_cag: 0.85 },
  },
  {
    id: "sifali_otlar",
    ad: "Şifalı Otlar Demeti",
    simge: "🌿",
    aciklama: "Yöre kadınlarının topladığı, ateş düşürüp yara iyileştirdiği bilinen otlar.",
    kategori: "sifa",
    tabanFiyat: 24,
    saglikEtkisi: 9,
    omurYil: 8,
    fiyatEtkenleri: { kitlik: 1.4, vebada: 1.6, savasta: 1.2, ekonomiKotu: 1.15 },
    cag: "Orta Çağ",
  },
  {
    id: "eczane_ilaci",
    ad: "Eczaneden Hazır İlaç",
    simge: "💊",
    aciklama: "Yeni açılan eczanenin raflarında satılan, şişe etiketli hazır bir ilaç.",
    kategori: "sifa",
    tabanFiyat: 27,
    saglikEtkisi: 10,
    omurYil: 8,
    fiyatEtkenleri: { vebada: 1.6, savasta: 1.3, kitlik: 1.2 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sifali_merhem",
    ad: "Şifalı Merhem",
    simge: "🏺",
    aciklama: "Cerrah çırağının hazırladığı, yara ve ağrılara iyi geldiği söylenen koyu bir merhem; sargısı biraz da ferahlık verir.",
    kategori: "sifa",
    tabanFiyat: 39,
    saglikEtkisi: 13,
    mutlulukEtkisi: 5,
    omurYil: 10,
    fiyatEtkenleri: { savasta: 1.3, vebada: 1.5, kitlik: 1.2 },
  },
  {
    id: "kuvvet_surubu",
    ad: "Kuvvet Şurubu",
    simge: "🍯",
    aciklama: "Gazetelere reklamı çıkan, 'bütün dertlere derman' diye satılan tatlı bir tonik.",
    kategori: "sifa",
    tabanFiyat: 44,
    saglikEtkisi: 11,
    mutlulukEtkisi: 9,
    omurYil: 10,
    fiyatEtkenleri: { altin_cag: 0.85, ekonomiKotu: 1.1 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "baharatli_carasi",
    ad: "Nadide Baharat Çeşnisi",
    simge: "🧂",
    aciklama: "Uzak diyarlardan gelen, en sade yemeği bile bir ziyafete çeviren baharat karışımı.",
    kategori: "sifa",
    tabanFiyat: 58,
    saglikEtkisi: 9,
    mutlulukEtkisi: 17,
    omurYil: 12,
    fiyatEtkenleri: { altin_cag: 0.8, kitlik: 1.3, savasta: 1.15 },
  },

  // ---- Lüks Tüketim: ün/statü verir, çürümez, her türden en fazla 1 sahiplenilir, kriz zamanı ucuzlar/bollukta pahalanır ----
  {
    id: "ipek_hali",
    ad: "İpek Halı",
    simge: "🧵",
    aciklama: "Uzak bir kervanla gelen, karmaşık desenli, elde dokunmuş bir ipek halı.",
    kategori: "luks",
    tabanFiyat: 65,
    unEtkisi: 6,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.7, kitlik: 0.7, ekonomiIyi: 1.15 },
  },
  {
    id: "nadide_tablo",
    ad: "Nadide Tablo",
    simge: "🖼️",
    aciklama: "Şehrin konuştuğu bir ressamın elinden çıkma, salonun baş köşesine asılacak bir tablo.",
    kategori: "luks",
    tabanFiyat: 100,
    unEtkisi: 8,
    fiyatEtkenleri: { altin_cag: 1.35, savasta: 0.7, kitlik: 0.75 },
  },
  {
    id: "degerli_mucevher",
    ad: "Değerli Mücevher",
    simge: "💎",
    aciklama: "Kuyumcunun vitrininde göz kamaştıran, taşıyanın servetini haykıran bir mücevher.",
    kategori: "luks",
    tabanFiyat: 155,
    unEtkisi: 10,
    fiyatEtkenleri: { altin_cag: 1.5, savasta: 0.65, vebada: 0.7, ekonomiIyi: 1.2 },
  },
  {
    id: "antika_eser",
    ad: "Antika Eser",
    simge: "🏛️",
    aciklama: "Geçmiş bir çağdan kalma, hikâyesi kadar değerli de olan nadir bir eser.",
    kategori: "luks",
    tabanFiyat: 225,
    unEtkisi: 14,
    fiyatEtkenleri: { altin_cag: 1.45, savasta: 0.6, vebada: 0.65, ekonomiIyi: 1.15 },
  },
];

export function magazaEsyasiTanimiGetir(id: string): MagazaEsyasiTanimi {
  const tanim = MAGAZA_ESYALARI.find((e) => e.id === id);
  if (!tanim) throw new Error(`Bilinmeyen mağaza eşyası: ${id}`);
  return tanim;
}
