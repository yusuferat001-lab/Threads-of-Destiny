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
  /** Koleksiyon kategorileri ("luks"/"sanat"/"binek"): satın alınır alınmaz bir kereliğine uygulanan ün artışı. */
  unEtkisi?: number;
  /** Sadece "sifa" kategorisi: kaç yıl içinde kullanılmazsa çürüyüp envanterden silineceği (7-12 yıl arası). */
  omurYil?: number;
  fiyatEtkenleri?: MagazaFiyatEtkenleri;
  /** Belirtilmezse her çağda satılır. */
  cag?: Cag;
  /** Koleksiyon eşyası: periyodik bakım aralığı (yıl, [min, max]); belirtilmezse 8-10. */
  bakimAraligi?: [number, number];
  /** Koleksiyon eşyası: bakım masrafının güncel değere oranı; belirtilmezse 0,20. */
  bakimOrani?: number;
}

/** Şifa dışındaki her kategori kalıcı koleksiyon parçasıdır (türünden en fazla 1, hediye edilemez, periyodik bakım). */
export function koleksiyonKategorisiMi(kategori: MagazaEsyaKategori): boolean {
  return kategori !== "sifa";
}

/** Vitrinde aynı anda görünen eşya adedi (kategori başına); listede olmayan kategori (şifa) hep tam görünür. */
export const MAGAZA_VITRIN_ADET: Partial<Record<MagazaEsyaKategori, number>> = { luks: 2, sanat: 3, binek: 2 };
/** Vitrin yenileme aralığı (yıl, [min, max]). */
export const MAGAZA_VITRIN_YENILEME_YIL: [number, number] = [3, 4];

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
    saglikEtkisi: 14,
    mutlulukEtkisi: 4,
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
    saglikEtkisi: 15,
    mutlulukEtkisi: 8,
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
    saglikEtkisi: 17,
    mutlulukEtkisi: 14,
    omurYil: 12,
    fiyatEtkenleri: { altin_cag: 0.8, kitlik: 1.3, savasta: 1.15 },
  },

  // ---- Lüks Tüketim: ün/statü verir, çürümez, her türden en fazla 1 sahiplenilir, kriz zamanı ucuzlar/bollukta pahalanır (vitrinde döner) ----
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

  // ---- Sanat: şöhret için büyük tek seferlik ün, her 8-10 yılda bakım/restorasyon masrafı. Vitrinde döner (her seferinde 3 eser). ----
  // Orta Çağ
  {
    id: "oc_yazma_eser",
    ad: "Işıklı El Yazması",
    simge: "📜",
    aciklama: "Keşişlerin yıllarca altın yaldızla süslediği, sayfa kenarları minyatürlü bir kitap.",
    kategori: "sanat",
    tabanFiyat: 90,
    unEtkisi: 7,
    fiyatEtkenleri: { altin_cag: 1.35, savasta: 0.7, kitlik: 0.75, ekonomiIyi: 1.1 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_ikon",
    ad: "Altın Zeminli İkon",
    simge: "🖼️",
    aciklama: "Kutsal bir sima, altın zemin üzerine ince fırça darbeleriyle işlenmiş; kiliselerin kıskandığı bir parça.",
    kategori: "sanat",
    tabanFiyat: 130,
    unEtkisi: 9,
    fiyatEtkenleri: { altin_cag: 1.35, savasta: 0.7, vebada: 0.8, ekonomiIyi: 1.1 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_vitray",
    ad: "Vitray Pencere Paneli",
    simge: "🪟",
    aciklama: "Renkli camın kurşunla birleştiği, güneşe tutulunca odayı boyayan bir panel.",
    kategori: "sanat",
    tabanFiyat: 170,
    unEtkisi: 11,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.65, ekonomiIyi: 1.15 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_fildisi_diptik",
    ad: "Oyma Fildişi Diptik",
    simge: "🦷",
    aciklama: "Katlanır iki kanatlı, ince kabartmalı fildişi levha; seyyahlar bile yolculukta yanında taşırdı.",
    kategori: "sanat",
    tabanFiyat: 215,
    unEtkisi: 13,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.65, vebada: 0.75 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_gotik_heykel",
    ad: "Gotik Taş Heykel",
    simge: "🗿",
    aciklama: "Katedral atölyesinde yontulmuş, yüzündeki ifadeyle ziyaretçiyi susturan bir heykel.",
    kategori: "sanat",
    tabanFiyat: 265,
    unEtkisi: 15,
    fiyatEtkenleri: { altin_cag: 1.45, savasta: 0.6, vebada: 0.7, ekonomiIyi: 1.15 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_tapiseri",
    ad: "Altın İşlemeli Duvar Tapiseri",
    simge: "🧶",
    aciklama: "Bir av sahnesini anlatan, altın ve gümüş iplikle dokunmuş dev bir duvar halısı.",
    kategori: "sanat",
    tabanFiyat: 340,
    unEtkisi: 18,
    fiyatEtkenleri: { altin_cag: 1.5, savasta: 0.6, vebada: 0.7, ekonomiIyi: 1.2 },
    cag: "Orta Çağ",
  },
  // Sanayi Devrimi
  {
    id: "sd_manzara_tablo",
    ad: "Yağlıboya Manzara Tablosu",
    simge: "🏞️",
    aciklama: "Sergilerde adı geçen bir ressamın, ışığı yakalamasıyla övülen yağlıboya manzarası.",
    kategori: "sanat",
    tabanFiyat: 95,
    unEtkisi: 7,
    fiyatEtkenleri: { altin_cag: 1.35, savasta: 0.7, ekonomiIyi: 1.1 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_mermer_bust",
    ad: "Mermer Büst",
    simge: "🗿",
    aciklama: "Atölyede, ölçüleri titizlikle alınarak yontulmuş, salonun köşesine yakışan bir büst.",
    kategori: "sanat",
    tabanFiyat: 135,
    unEtkisi: 9,
    fiyatEtkenleri: { altin_cag: 1.35, savasta: 0.7, ekonomiIyi: 1.1 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_porselen_takim",
    ad: "Nakışlı Porselen Takım",
    simge: "🫖",
    aciklama: "Elle boyanmış, ince cidarlı porselen çay takımı; misafirler dokunmaya bile çekinir.",
    kategori: "sanat",
    tabanFiyat: 175,
    unEtkisi: 11,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.65, ekonomiIyi: 1.15 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_gumus_samdan",
    ad: "Gümüş Şamdan Takımı",
    simge: "🕯️",
    aciklama: "Atölyesinin imzasını taşıyan, kabartmalı ağır gümüş bir şamdan takımı.",
    kategori: "sanat",
    tabanFiyat: 215,
    unEtkisi: 13,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.65 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_portre",
    ad: "Ünlü Ressama Yaptırılmış Portre",
    simge: "🎨",
    aciklama: "Şehrin en çok konuşulan ressamına poz verdiğin, altın çerçeveli boy portren.",
    kategori: "sanat",
    tabanFiyat: 270,
    unEtkisi: 15,
    fiyatEtkenleri: { altin_cag: 1.45, savasta: 0.65, ekonomiIyi: 1.15 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_kristal_avize",
    ad: "Kristal Avize",
    simge: "💡",
    aciklama: "Yüzlerce kristal damlasıyla ışığı dağıtan, salonu saraya çeviren bir avize.",
    kategori: "sanat",
    tabanFiyat: 350,
    unEtkisi: 18,
    fiyatEtkenleri: { altin_cag: 1.5, savasta: 0.6, ekonomiIyi: 1.2 },
    cag: "Sanayi Devrimi",
  },

  // ---- Binek: ün + biraz mutluluk; bakımı daha sık (4-6 yıl, değerinin ~%15'i). Vitrinde döner (her seferinde 2 binek). ----
  {
    id: "oc_susli_eyer",
    ad: "Süslü Eyer ve Koşum Takımı",
    simge: "🏇",
    aciklama: "Gümüş tokalı, işlemeli deri bir eyer takımı; ata binmeyenler bile bakar.",
    kategori: "binek",
    tabanFiyat: 55,
    unEtkisi: 3,
    mutlulukEtkisi: 2,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.25, savasta: 1.1, ekonomiIyi: 1.1 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_binek_ati",
    ad: "Soylu Binek Atı",
    simge: "🐎",
    aciklama: "Yürüyüşü kusursuz, soylu bir soydan gelen, caddede başları çeviren bir at.",
    kategori: "binek",
    tabanFiyat: 80,
    unEtkisi: 4,
    mutlulukEtkisi: 3,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.3, savasta: 1.2, kitlik: 1.1 },
    cag: "Orta Çağ",
  },
  {
    id: "oc_savas_ati",
    ad: "Zırhlı Savaş Atı",
    simge: "🛡️",
    aciklama: "Göğsü zırhla örtülü, turnuvalarda ve törenlerde şövalyeleri taşıyan görkemli bir at.",
    kategori: "binek",
    tabanFiyat: 170,
    unEtkisi: 8,
    mutlulukEtkisi: 2,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.3, savasta: 1.35, kitlik: 1.15 },
    cag: "Orta Çağ",
  },
  {
    id: "sd_fayton",
    ad: "Hafif Fayton",
    simge: "🛞",
    aciklama: "Yaylı, açık bir fayton; pazar gezintilerinin en gözde aracı.",
    kategori: "binek",
    tabanFiyat: 60,
    unEtkisi: 3,
    mutlulukEtkisi: 2,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.25, savasta: 0.9, ekonomiIyi: 1.1 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_landau",
    ad: "Landau Arabası",
    simge: "🚋",
    aciklama: "Ters çevrilebilir tavanlı, iki atlı, saten döşemeli şık bir araba.",
    kategori: "binek",
    tabanFiyat: 130,
    unEtkisi: 6,
    mutlulukEtkisi: 3,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.3, savasta: 0.85, ekonomiIyi: 1.15 },
    cag: "Sanayi Devrimi",
  },
  {
    id: "sd_buharli_yat",
    ad: "Küçük Buharlı Yat",
    simge: "⛵",
    aciklama: "Bacası ince ince tüten, nehir ve körfez gezileri için yaptırılmış parlak bir yat.",
    kategori: "binek",
    tabanFiyat: 290,
    unEtkisi: 12,
    mutlulukEtkisi: 4,
    bakimAraligi: [4, 6],
    bakimOrani: 0.15,
    fiyatEtkenleri: { altin_cag: 1.4, savasta: 0.8, ekonomiIyi: 1.2 },
    cag: "Sanayi Devrimi",
  },
];

export function magazaEsyasiTanimiGetir(id: string): MagazaEsyasiTanimi {
  const tanim = MAGAZA_ESYALARI.find((e) => e.id === id);
  if (!tanim) throw new Error(`Bilinmeyen mağaza eşyası: ${id}`);
  return tanim;
}

/**
 * Bir "sifa" eşyasının KULLANILDIĞINDA tam olumlu etkisini verme ihtimali
 * (2026-09). Kalanı: %10 sabit "hiç işe yaramadı", geri kalan da "ters tepti"
 * (-5 can). Oran fiyatla artar — en ucuz sifa ~%60, en pahalısı ~%80 (tavan 0.80,
 * taban 0.60). Oyuncuya net değil, bulanık bir bant olarak gösterilir (bilgi sisi).
 */
const SIFA_SANS_TABAN_FIYAT_MIN = 16;
const SIFA_SANS_TABAN_FIYAT_MAX = 58;
export const SIFA_SANS_MIN = 0.6;
export const SIFA_SANS_MAX = 0.8;
export const SIFA_HICBIRSEY_SANS = 0.1;

export function sifaBasariSans(tabanFiyat: number): number {
  const t = (tabanFiyat - SIFA_SANS_TABAN_FIYAT_MIN) / (SIFA_SANS_TABAN_FIYAT_MAX - SIFA_SANS_TABAN_FIYAT_MIN);
  return Math.max(SIFA_SANS_MIN, Math.min(SIFA_SANS_MAX, SIFA_SANS_MIN + t * (SIFA_SANS_MAX - SIFA_SANS_MIN)));
}

/** Oyuncuya gösterilecek bulanık fayda bandı (5'in katına yuvarlanmış, ±5 sis). */
export function sifaFaydaAralik(tabanFiyat: number): { min: number; max: number } {
  const merkez = Math.round((sifaBasariSans(tabanFiyat) * 100) / 5) * 5;
  return { min: Math.max(0, merkez - 5), max: Math.min(100, merkez + 5) };
}
