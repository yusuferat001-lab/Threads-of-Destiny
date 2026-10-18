export interface Durum {
  id: string;
  ad: string;
  tur: 'gecici' | 'kalici';
  kalan_tur?: number;
  tur_basi_saglik?: number;
  tur_basi_para?: number;
  tur_basi_mutluluk?: number;
  gelir_carpani?: number;
  bitince_etiket?: string;
}

export interface UlkeKrizi {
  tur: 'kitlik' | 'isyan' | 'altin_cag';
  bitisYili: number;
}

/** Tekrarlayan büyük savaş mekaniğinin aktif parametreleri (bkz. server §27); savaş yokken CharacterState.buyuk_savas null'dur. */
export interface UlkeGecmisiKaydi {
  yil: number;
  tur: 'savas_basladi' | 'savas_bitti' | 'veba_basladi' | 'veba_bitti' | 'kriz_basladi' | 'kriz_bitti';
  ayrinti?: string;
}

export interface BuyukSavas {
  dusman: string;
  baslangicYili: number;
  bitisYili: number;
  vergiOrani: number;
  gidaCarpani: number;
}

/** Ömürde bir kez tetiklenebilen veba durumu (bkz. server §27); hiç yaşanmadıysa CharacterState.veba null'dur. */
export interface VebaDurumu {
  aktif: boolean;
  baslangicYili: number;
  bitisYili: number;
  etkiBitisYili: number;
  konutKiraCarpani: number;
  gelirCarpani: number;
  korumaSeviyesi: number;
}

export interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: 'iyi' | 'normal' | 'kotu';
  kriz: UlkeKrizi | null;
  nufusDurumu: 'artiyor' | 'normal' | 'azaliyor';
}

export type MulkTuru = 'kucuk_tarla' | 'ciftlik' | 'han' | 'demirci' | 'kervan' | 'karaborsa';

export type EvlilikTuru = 'ask' | 'mantik';
export type DugunButcesi = 'ucuz' | 'orta' | 'pahali';
export type TeklifHediyesi = 'sade' | 'ucuz' | 'pahali';
export type TanismaYaklasim = 'komik' | 'nazik' | 'ovunme' | 'mutevazi';
export type AileHuy = 'mizahsever' | 'parasever' | 'ciddi' | 'maceraci' | 'sefkatli' | 'gururlu';

/** Teklifi kabul edilmiş, düğün bütçesi bekleyen eş adayı (sunucuda `BekleyenDugun`). */
export interface MantikAday {
  isim: string;
  meslek: string;
  rutbe: string;
  yas: number;
  grup: 'genc' | 'olgun';
  huylar: [AileHuy, AileHuy];
  ceyiz: number;
  meslek_bonusu: number;
}

export type MagazaEsyaKategori = 'sifa' | 'luks';

/** Mağazadan satın alınıp envanterde tutulan somut bir eşya kopyası; her satın alma kendi id/ömrünü taşır. */
export interface SahipOlunanEsya {
  id: string;
  katalogId: string;
  ad: string;
  simge: string;
  kategori: MagazaEsyaKategori;
  alisYili: number;
  /** sifa: çürümeye kalan yıl. luks: bir sonraki bakım masrafına kalan yıl (0'a inince masraf çıkar, eşya silinmez). */
  kalanYil: number | null;
}

/** ESKİ tekil hayat amacı — artık atanmıyor, geriye dönük uyum için duruyor. */
export interface HayatAmaci {
  id: string;
  ad: string;
  aciklama: string;
  hedefTuru: 'para' | 'un' | 'ahlak' | 'cocuk';
  hedefDeger: number;
  tamamlandi: boolean;
}

export type AmacZorluk = 'normal' | 'zor';
export type AmacKontrolAni = 'herhangi' | 'olumde';

export interface AmacIlerleme {
  id: string;
  zorluk: AmacZorluk;
  bonus: number;
  kontrolAni: AmacKontrolAni;
  tamamlandi: boolean;
  tamamlanmaYili?: number;
}

/** GET /:id/amaclar — sağ panel "🎯 Amaçların" kartı + Görevin ekranı + ölüm ekranı. */
export interface AmacKarti {
  id: string;
  baslik: string;
  aciklama: string;
  zorluk: AmacZorluk;
  bonus: number;
  kontrolAni: AmacKontrolAni;
  tamamlandi: boolean;
  tamamlanmaYili: number | null;
  mevcut: number | null;
  hedef: number | null;
}

export interface AmaclarDurumu {
  amaclar: AmacKarti[];
  carpan: number;
}

export interface BolgeIstatistigi {
  nufusTahmini: string;
  notlar: string[];
}

export interface YatkinlikKaynagi {
  kaynak: string;
  kategori: string;
  deger: number;
}

export interface CharacterState {
  id: string;
  isim: string | null;
  dil: "tr" | "en";

  yil: number;
  baslangic_yili: number;
  yas: number;
  meslek: string;
  rutbe: string;
  /** 1-5. Yalnızca artar; asla düşmez. */
  rutbe_seviye: number;
  /** Rütbe ilerlemesini besleyen monoton sayaç: yıllık kıdem + meslek-kategori başarıları + kendi işine yatırım. */
  kariyer_puani: number;
  /** Son terfinin oyun yılı (bir sonraki terfinin cooldown referansı). */
  son_terfi_yili: number;
  /** Mesleğe yatkınlık kademesi (2026-09 sonu) — meslek seçilince bir kez hesaplanır, bir daha değişmez. 1=kötü, 2=nötr, 3=iyi, 4=mükemmel. */
  meslek_yatkinlik_seviyesi: 1 | 2 | 3 | 4 | null;
  /** Kanonik (TR) unvan — `kt()` ile çevrilir. */
  meslek_yatkinlik_unvani: string | null;
  meslek_zar_bonusu: number;
  meslek_maas_carpani: number;
  meslek_tecrube_hizi: number;
  /** Kişilik özelliklerinden gelen kalıcı gayrimenkul bonusu/malusu (§41). */
  gayrimenkul_getiri_bonusu: number;
  sehir_yonetim_seviyesi: number;
  sehir_yonetim_unvan: string | null;
  cag: string;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  konut_id: string;
  konut_surekli_yasadigi_yil: number | null;
  yasam_secimi_id: string;
  hazard_el_sayisi: number;
  uc_kagitci_oyun_sayisi: number;

  aile_meslegi: string;
  aile_mirasi_surduruldu: boolean;
  acilis_anlatimi: string;
  kisilik: [string, string];
  kisilik_eksenleri: KisilikEksenleri;
  hukumdar: string | null;
  bolge_bilgi: BolgeIstatistigi | null;
  haberler: string[];

  saglik: number;
  mutluluk: number;
  para: number;
  para_birimi: string;
  maas_yillik: number;
  un: number;
  ahlak: number;

  ordu_mevcudu: number;
  ordu_techizat_seviyesi: number;
  ticaret_sermaye: number;
  nufuz: number;
  uretim_kapasitesi: number;

  suc_seviyesi: number;
  /** Hapiste kalan ceza süresi (yıl); 0'a inince otomatik serbest kalınır. Hapiste değilken 0. */
  hapis_ceza_kalan: number;
  /** Tutuklanma anında belirlenen TOPLAM hapis cezası (yıl); hapis_ceza_kalan'ın aksine azalmaz. Hapiste değilken 0. */
  hapis_ceza_toplam: number;
  /** Hapse en son girişten beri çözülen hapisOlayi:true olay sayısı. */
  hapis_tur_sayaci: number;
  mulkler: MulkTuru[];
  /** Her mülk için bir sonraki periyodik bakım/vergi masrafına kalan yıl (7-10 yılda bir). */
  mulk_bakim_kalan: Partial<Record<MulkTuru, number>>;
  /** Satın alındığı oyun yılı (mülk olayı garantisi referansı, §11 kural 14). */
  mulk_alis_yili: Partial<Record<MulkTuru, number>>;
  magaza_envanteri: SahipOlunanEsya[];
  magaza_temel_kilit_bitis_yili: number | null;
  alkol_ziyaret_sayisi: number;
  /** Sosyalleşme ekranı tur-harcamayan aksiyonlarının son kullanıldığı oyun yılı (id → yıl). */
  sosyallesme_aksiyon_kilit: Record<string, number>;

  yatkinliklar: Record<string, number>;
  yatkinlik_kaynaklari: YatkinlikKaynagi[];

  dost_adi: string;
  rakip_adi: string;
  dost_puani: number;
  rakip_puani: number;
  rakipler: Rakip[];

  es_adi: string | null;
  es_puani: number;
  es_meslek: string | null;
  es_rutbe: string | null;
  cocuk_sayisi: number;
  cocuklar: Cocuk[];
  son_dogum_yili?: number;
  es_dogum_yili: number | null;
  es_evlilik_turu: EvlilikTuru | null;
  es_grup: 'genc' | 'olgun' | null;
  es_huylar: AileHuy[];
  es_meslek_bonusu: number;
  es_dugun_un: number;
  es_son_zaman_yili: number | null;
  es_dusuk_yil: number;
  es_terk_esigi: number;
  es_dogum_sayisi: number;
  es_sonraki_hamilelik_yili: number;
  es_ihmal_uyari_goruldu: boolean;
  mantik_adaylar: MantikAday[];
  mantik_yenileme_yili: number;
  mantik_kilit_yili: number;
  bekleyen_dugun: (MantikAday & { tur: EvlilikTuru }) | null;
  aktif_tanisma: AktifTanisma | null;
  sevgili: Sevgili | null;
  nostalji_yili: number | null;
  yas_bitis_yili: number;

  ekip: EkipUyesi[];
  hizip: string | null;

  amir_adi: string | null;
  amir_rutbe: string | null;
  astlar: Ast[];

  anne_adi: string;
  baba_adi: string;

  evcil_hayvan: EvcilHayvan | null;
  evcil_hayvanlar: EvcilHayvan[];
  hayvan_karsilasma_sayisi: number;
  hayvan_karsilasma_turleri: string[];
  unvanlar: string[];
  hayat_amaci: HayatAmaci | null;
  hayat_amaclari: AmacIlerleme[];
  omur_zirve_suc: number;
  son_suc_yili: number;
  omur_kumar_net: number;
  omur_sadaka_sayisi: number;
  omur_hediye_sayisi: number;
  omur_riskli_basari: number;
  /** komikOlumler.ts'in riskli şıkkını seçip hayatta kaldıysa true (bir kereliğine, skor bonusu). */
  komik_olum_basarili_risk: boolean;
  /** komikOlumler.ts'in riskli şıkkını seçip bu yüzden öldüyse true (bir kereliğine, skor bonusu). */
  komik_olum_ile_oldu: boolean;
  efsanevi_olum: string | null;
  /** Kutsal Emanet relik'i bu hayatta en az bir kez ölümü iptal ettiyse true (kalıcı). */
  relik_can_kurtardi: boolean;

  etiketler: string[];
  durumlar: Durum[];
  ulke: UlkeDurumu;

  son_zorunlu_bagis_yili: number | null;
  son_zenginlik_sizinti_yili: number | null;
  son_rakip_soygun_yili: number | null;
  buyuk_savas: BuyukSavas | null;
  son_buyuk_savas_bitis_yili: number | null;
  veba: VebaDurumu | null;
  veba_gecirdi: boolean;
  son_veba_bitis_yili: number | null;
  /** Vebayı bizzat kaptıysa ("veba_hastasi" etiketi) o anki ölüm riski % (0-100). Hasta değilken 0. */
  veba_olum_riski: number;
  /** Bizzat kaptığı vebayı atlatıp iyileştiyse true (bir kereliğine, skor bonusu). */
  veba_hayatta_kaldi: boolean;
  /** Hapisten fiziksel bir kaçışla (rüşvet/af değil) çıktıysa true (bir kereliğine, skor bonusu). */
  hapis_basarili_kacis: boolean;
  ulke_gecmisi: UlkeGecmisiKaydi[];
  kucuk_kriz_sonraki_yil: number;
  gida_fiyat_sok_bitis_yili: number | null;
  /** Ömürde bir kez borçtayken alınan kilise/eş dost yardımı kullanıldı mı. */
  borc_yardimi_alindi: boolean;
  /** Kalıcı salgından korunma yatırımı; yoksa null. */
  salgin_korunma_yatirimi: SalginKorunmaYatirimi | null;
  /** Aktif tefeci kredisi; yoksa null. */
  kredi: Kredi | null;

  /** Aile ekranı etkileşim cooldown'ları: anahtar → tekrar açılacağı oyun yılı (§33). */
  aile_etkilesim_kilit: Record<string, number>;
  /** Eş/çocuğun bekleyen para talebi; yoksa null. */
  aile_talep: AileTalep | null;
  aile_talep_sonraki_yil: number;

  /** Kariyer sayfası — şehri yöneten kişiyle ilişki (0-100). §35. */
  yonetim_iliski: number;
  /** Kariyer sayfası — mesleğe göre patron (lonca reisi / fabrika patronu / yüksek ruhban) ilişkisi (0-100). §35. */
  patron_iliski: number;
  yonetim_etkilesim_kilit: Record<string, number>;
  /** Son turlarda yapılan yönetim etkileşimi sayısı; yüksekken ters tepme olasılığı artar. §35. */
  yonetim_yakin_etkilesim: number;
  /** Yönetimden gelen bekleyen dayatılan bağış / sadakat talebi; yoksa null. §35. */
  yonetim_talep: YonetimTalep | null;
  yonetim_talep_sonraki_yil: number;

  /** Bekleyen "gecikmiş takip" geri dönüşleri (bir seçimin 15-20 yıl sonraki karşılığı) — client mantığı kullanmaz, sunucu-içi zamanlama. */
  gecikmis_takipler: GecikmisTakip[];

  tur_sayisi: number;
  gecmis_olaylar: string[];
  /** Cihazın önceki hayatlarında görülen olaylar (sunucu-içi tekrar önleme için) — client mantığı kullanmaz. */
  istemci_gecmis_olaylar: string[];
  istemci_id: string | null;
  /** Son seçimlerin gösterge etkisi günlüğü (gösterge penceresi sunucudan okur). */
  etken_gunlugu?: { yil: number; kaynak: string; stat: GostergeStat; delta: number }[];
  gecmis: GecmisNoktasi[];
  hayat_hikayesi: HayatOlayi[];
  aktif: boolean;
  olum_nedeni: string | null;
  /** Ölüm nedeninin iki dildeki hâli (sunucu checkDeath'te yazar). */
  olum_nedeni_ceviri?: { tr: string; en: string } | null;
  skoru_kaydedildi: boolean;
}

export interface GecmisNoktasi {
  yil: number;
  para: number;
  saglik: number;
  un: number;
}

export interface HayatOlayi {
  yil: number;
  yas: number;
  ikon: string;
  baslik: string;
}

export interface EvcilHayvan {
  tur: string;
  isim: string;
  edinim_yili: number;
  edinim_yasi: number;
  /** Hayvanın ömrü (yıl); edinim_yili + omur'da doğal ölür. */
  omur: number;
  /** Kalıcı pasif bonus kimliği (hayvanBonus.ts). */
  bonus_id: string;
}

export interface Cocuk {
  isim: string;
  dogum_yili: number;
  yasiyor: boolean;
  /** Çocukla ilişki puanı (0-100); Aile ekranındaki etkileşimlerle artar, ilgilenilmezse yılda ~0.6 düşer (§33). */
  iliski: number;
  yatkinlik?: 'yatkin' | 'notr' | 'uyumsuz';
  erken_olum_yili?: number;
  is_durumu?: 'bekliyor' | 'red_tepkisi' | 'ise_alindi' | 'reddetti';
  ekip_id?: string;
}

/** Eş/çocuğun bekleyen para talebi (Aile ekranında "Kabul Et / Reddet" kartı). */
export interface AileTalep {
  id: string;
  kimden: 'es' | 'cocuk';
  kimAdi: string;
  cocukIndex: number | null;
  tutar: number;
  kalem: string;
  sonYil: number;
}

export interface MantikAdayGorunum {
  isim: string;
  meslek: string;
  rutbe: string;
  yas: number;
  grup: 'genc' | 'olgun';
  /** Yalnız ilk huy görünür; ikincisi evlilikten sonra açılır. */
  huy: AileHuy;
  ceyiz: number;
  meslekBonusu: number;
}

export interface MantikDurumu {
  acik: boolean;
  /** acik=false ise: evli | yas_dusuk | yas_donemi | kilit | hapis | bekleyen_dugun. */
  sebep: string | null;
  minYas: number;
  kilitKalanYil: number;
  yasKalanYil: number;
  yenilemeKalanYil: number;
  adaylar: MantikAdayGorunum[];
  teklifSecenekleri: { hediye: TeklifHediyesi; maliyet: number; sans: number }[];
}

export interface AktifTanisma {
  mekan: string;
  aday: { isim: string; meslek: string; rutbe: string; yas: number; huylar: [AileHuy, AileHuy]; gorunum: number };
  adim: number;
  toplam: number;
  basari: number;
  yaklasimlar: TanismaYaklasim[];
}

export interface Sevgili {
  isim: string;
  meslek: string;
  rutbe: string;
  dogum_yili: number;
  huylar: [AileHuy, AileHuy];
  iliski: number;
  baslangic_yili: number;
  son_yil: number;
  darildi: boolean;
  darilma_yili: number | null;
  gonul_kilit_yili: number;
  meslek_bonusu: number;
}

/** GET /:id/tanisma ve tanışma POST yanıtlarındaki durum. */
export interface TanismaDurumu {
  aktif: boolean;
  adim: number;
  toplam: number;
  mekan: string;
  giris: string;
  aday: { isim: string; meslek: string; rutbe: string; yas: number; gorunum: string } | null;
  istek: string | null;
  secenekler: { metin: string }[];
  sonTepki: string | null;
}

export interface TanismaYaniti {
  state: CharacterState;
  durum: TanismaDurumu;
  bitti: boolean;
  basarili: boolean | null;
  tepki: string | null;
  mesaj: string | null;
}

export interface CocukIseAlSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

export interface SevgiliSonucu {
  state: CharacterState;
  mesaj: string;
  kabul?: boolean;
}

/** GET /:id/aile yanıtı — Aile & İlişkiler ekranının ihtiyaç duyduğu her şey. */
export interface AileDurumu {
  es: {
    adi: string;
    meslek: string | null;
    rutbe: string | null;
    puan: number;
    yas: number | null;
    tur: EvlilikTuru | null;
    grup: 'genc' | 'olgun' | null;
    huylar: AileHuy[];
    meslekBonusu: number;
    /** Son "zaman geçir"den bu yana geçen yıl. */
    ihmalYili: number;
    dogumSayisi: number;
  } | null;
  cocuklar: {
    isim: string;
    dogumYili: number;
    yas: number;
    yasiyor: boolean;
    iliski: number;
    isDurumu: 'bekliyor' | 'red_tepkisi' | 'ise_alindi' | 'reddetti' | null;
  }[];
  etkilesimler: { id: string; ikon: string; hedef: 'es' | 'cocuk' | 'hepsi'; maliyet: number }[];
  kilitler: Record<string, number>;
  talep: AileTalep | null;
  guncelYil: number;
  para: number;
  paraBirimi: string;
  esEylem: { hediyeUcuz: number; hediyePahali: number };
  mantik: MantikDurumu;
  bekleyenDugun: { isim: string; meslek: string; rutbe: string; ceyiz: number; tur: EvlilikTuru } | null;
  sevgili: {
    isim: string;
    meslek: string;
    rutbe: string;
    yas: number;
    huy: AileHuy;
    bar: number;
    kalanYil: number;
    darildi: boolean;
    meslekBonusu: number;
    gonulMaliyet: number;
    gonulKilitKalanYil: number;
    teklifSansi: number;
  } | null;
  tanismaAktif: boolean;
  dugunSecenekleri: { butce: DugunButcesi; maliyet: number; iliski: number; un: number }[];
}

export interface MantikTeklifSonucu {
  state: CharacterState;
  kabul: boolean;
  mesaj: string;
}

/** Kariyer sayfası — yönetimden gelen dayatılan bağış / sadakat talebi. §35. */
export interface YonetimTalep {
  id: string;
  kimden: 'yonetici' | 'patron';
  kimAdi: string;
  tur: 'bagis' | 'sadakat';
  tutar: number;
  kalem: string;
  sonYil: number;
}

export type YonetimHat = 'yonetici' | 'patron';

/** Bir seçimin 15-20 yıl sonraki geri dönüşünü bekleyen kayıt (bkz. SonucEtkisi.gecikmis_takip, server §36-benzeri). */
export interface GecikmisTakip {
  id: string;
  olayId: string;
  tetiklenmeYili: number;
}

/** GET /:id/yonetim yanıtı — Kariyer sayfasının "Yönetim" bölümü. §35. */
export interface YonetimDurumu {
  yonetici: { unvan: string; ad: string; iliski: number; bagisKademeleri: number[] };
  patron: { unvan: string; ad: string; iliski: number; bagisKademeleri: number[] };
  etkilesimler: { id: string; hat: YonetimHat; ikon: string }[];
  istekler: {
    id: string;
    hat: YonetimHat;
    minIliski: number;
    acik: boolean;
    iliskiBedeli: number;
    tahminiSans: number;
  }[];
  kilitler: Record<string, number>;
  /** "Çok sık üstüne gitme" sayacı; ≥3 iken etkileşimler ters tepebilir. */
  bikkinlik: number;
  talep: YonetimTalep | null;
  guncelYil: number;
  para: number;
  paraBirimi: string;
}

export interface KisilikEksenleri {
  fevrilik: number;
  merhamet: number;
}

/** Derin rakip ilişkileri (§13): isimli rakip + güç/husumet. rakipler[0].ad === rakip_adi. */
export interface Rakip {
  ad: string;
  meslek: string;
  guc: number;
  husumet: number;
  yenildi: boolean;
}

/** GorevEkrani "Rakiplerin" paneli + karanlık iş hedef seçimi için (yuvarlanmış). */
export interface RakipKarti {
  ad: string;
  meslek: string;
  guc: number;
  husumet: number;
  yenildi: boolean;
}

/** Kalıcı salgından korunma yatırımı (§27). */
export interface SalginKorunmaYatirimi {
  kademe: number;
  yil: number;
}

export interface SalginKorunmaKarti {
  kademe: number;
  ad: string;
  aciklama: string;
  maliyet: number;
  sahipMi: boolean;
  alinabilir: boolean;
}

/** Tefeciden alınan kontrollü borç. */
export interface Kredi {
  anapara: number;
  kalanBorc: number;
  faizOrani: number;
  yillikTaksit: number;
  alindigiYil: number;
  odenmeyenTaksit: number;
  pazarlikYapildi: boolean;
}

export interface KrediConfig {
  aktifKredi: Kredi | null;
  maksTutar: number;
  faizTeklifi: number;
  minTutar: number;
  /** Tefecinin sunduğu sabit kredi tutarları (küçük/büyük), enflasyonla ölçekli. */
  kademeler: number[];
}

export interface EkipUyesi {
  id: string;
  isim: string;
  rol: string;
  tahminiMin: number;
  tahminiMax: number;
  maas: number;
  sadakat: number;
  kisilik: string;
  cocuk_isim?: string;
}

export interface Ast {
  isim: string;
  rutbe: string;
}

export interface SonucEtkisi {
  /** Hapisten FİZİKSEL kaçışı temsil eder (sunucu skor bonusu için kullanır). */
  hapis_basarili_kacis?: true;
  para?: number;
  un?: number;
  ahlak?: number;
  saglik?: number;
  mutluluk?: number;
  yeni_meslek?: string;
  olum?: boolean;
  olum_sansi?: number;
  mesaj: string;
  detay?: string;
  etiket_ekle?: string[];
  etiket_sil?: string[];
  durum_ekle?: Durum;
  ulke_etkisi?: Partial<UlkeDurumu>;
  veba_koruma?: number;
  /** Veba hastasıyken veba_olum_riski'ni değiştirir (± ). */
  veba_olum_riski_artis?: number;
  maas_carpani?: number;
  es_ata?: boolean;
  es_puani?: number;
  es_kaybet?: boolean;
  cocuk_ekle?: number;
  cocuk_kaybet?: boolean;
  /** Yaşayan tüm çocukların ilişki puanına uygulanan delta (§33). */
  cocuk_iliski?: number;
  ekip_ekle?: { rol: string; tahminGenisligi: number };
  ekip_kaybi?: boolean;
  ekip_sil?: string;
  hizip_ata?: string;
  // --- server/src/types.ts ile senkron (istemci EtkiCipleri yalnız ilk grubu gösterir; gerisi tam senkron için) ---
  durum_sil?: string[];
  ordu_techizat_artis?: number;
  ticaret_sermaye_artis?: number;
  nufuz_artis?: number;
  uretim_kapasitesi_artis?: number;
  suc_artis?: number;
  suc_sinifi?: 'kucuk' | 'orta' | 'buyuk' | 'agir';
  suc_seviyesi_ayarla?: number;
  /** Sunucunun yazdığı: bu seçimin aranma üzerindeki gerçek net değişimi (kelepçe sonrası). */
  suc_degisim?: number;
  /** Hapis ceza süresini yıl olarak uzatır (başarısız riskli kaçış girişimi). */
  hapis_ceza_artis?: number;
  para_sifirla?: boolean;
  un_sifirla?: boolean;
  para_yuzde_kaybet?: number;
  yerlesim_zorla?: string;
  dost_puani?: number;
  rakip_puani?: number;
  zorunlu_sonraki?: string;
  zorunlu_sonraki_havuzu?: string[];
  mulk_kaybet?: MulkTuru;
  evcil_hayvan_edin?: { tur?: string };
  evcil_hayvan_kaybet?: boolean;
  unvan_kazan?: string;
  hayat_amaci_ata?: { id: string; ad: string; aciklama: string; hedefTuru: HayatAmaci['hedefTuru']; hedefDeger: number };
  kriz_baslat?: { tur: UlkeKrizi['tur']; sureYil: number };
  efsanevi_olum?: string;
  sehir_yonetim_artis?: number;
  kariyer_puani_artis?: number;
  /** 15-20 yıl sonrasına bu id'deki geri dönüş olayını zamanlar (server §36-benzeri). Client bunu kullanmaz, salt tip aynası. */
  gecikmis_takip?: string;
}

export interface BelirsizAralik {
  min: number;
  max: number;
}

export interface Secenek {
  metin: string;
  basari_sansi: number;
  belirsiz_aralik: BelirsizAralik;
  basarili_sonuc: SonucEtkisi;
  basarisiz_sonuc: SonucEtkisi;
  kilitli: boolean;
  kilit_nedeni?: string;
  /** Sunucudaki OlaySecenegi.hafifSecenek — küçük/ikincil "vazgeç" bağlantısı olarak gösterilir. */
  hafif?: boolean;
  /** Olay tanımındaki ASIL şık sırası (kişilik filtresi sırayı kaydırabilir); sunucu kullanır, istemci yalnız taşır. */
  ham_index?: number;
}

export interface SenaryoResponse {
  olay_basligi: string;
  olay_metni: string;
  kategori: string;
  gorsel: string;
  /** Özel havuz illüstrasyonu anahtarı (ör. "hapis", "yolculuk-hac"); yoksa kategori resmi kullanılır. */
  resim?: string;
  secenekler: Secenek[];
}

export interface SecimSonucu {
  state: CharacterState;
  basarili: boolean;
  uygulananEtki: SonucEtkisi;
  yasArtisi: number;
  sonucAnlatimi: string;
  zamanAnlatimi: string | null;
  terfiOldu: boolean;
}

/** onTepki'li bir seçenek seçildiğinde /choice'un döndürdüğü, zaman ilerletmeyen ara-ekran. */
export interface TepkiSonucu {
  ara_tepki: true;
  olay_basligi: string;
  olay_metni: string;
  secenekler: [{ metin: string }, { metin: string }];
}

export interface YerlesimTanimi {
  id: string;
  ad: string;
  simge: string;
  artilar: string[];
  eksiler: string[];
}

export interface KonutTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  kiraYillik: number;
  saglikEtkisiYillik?: number;
  mutlulukEtkisiYillik?: number;
  unEtkisiYillik?: number;
}

export interface YasamSecenegiTanimi {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  maliyetYillik: number;
  saglikEtkisiYillik?: number;
  mutlulukEtkisiYillik?: number;
  unEtkisiYillik?: number;
}

export interface GiderKalemleri {
  yasam: number;
  konut: number;
  ekip: number;
  evcilHayvan: number;
  /** Aktif büyük savaş sırasında pasif gelirden ek olarak kesilen "savaş vergisi"; savaş yokken 0. */
  savasVergisi: number;
}

export interface MaasKirilimKalemi {
  ad: string;
  /** Yüzde katkı: +40 → maaşı ×1.40; −15 → ×0.85. */
  yuzde: number;
}

export interface MaasKirilim {
  tabanMaas: number;
  maasYillik: number;
  rutbeAd: string;
  rutbeSeviye: number;
  /** Rütbe priminin yüzdesi. Rütbe asla düşmediği için kalıcı. */
  rutbeYuzde: number;
  /** Kıdem + şehir yönetimi + kalıcı ödüllerin birleşik yüzdesi. Kalıcı. */
  kariyerYuzde: number;
  kariyerKalemler: MaasKirilimKalemi[];
  /** "İtibarın": mutluluk + şöhret + ahlak bant yüzdelerinin toplamı (±). Değişken. */
  itibarYuzde: number;
  itibarKalemler: MaasKirilimKalemi[];
  /** Enflasyon + ekonomi + savaş + salgın + geçici durumların birleşik yüzdesi. Dönemsel — dünya değiştikçe değişir. */
  donemselYuzde: number;
  donemselKalemler: MaasKirilimKalemi[];
}

export interface DunyaFinansEtkisi {
  ikon: string;
  metin: string;
}

export interface FinansOzeti {
  maasYillik: number;
  giderKalemleri: GiderKalemleri;
  netYillik: number;
  /** Gelir (maaş) enflasyonu yüzdesi — oyuncuya gösterilmez. */
  enflasyonYuzdesi: number;
  /** Yaşam + konut GİDER enflasyonu yüzdesi; Gelir&Gider ekranındaki seçim kartları bunu kullanır. */
  giderEnflasyonYuzdesi: number;
  gayrimenkulDegeri: number;
  maasKirilim: MaasKirilim;
  /** Mülklerden gelen yıllık tahmini net gelir — maaşın dışında ayrı akış. */
  gayrimenkulYillikGelir: number;
  /** Şu an bütçeyi/sağlığı etkileyen dünya durumları (ekonomi, savaş, salgın, kıtlık, enflasyon, vergi). */
  dunyaEtkileri: DunyaFinansEtkisi[];
}

export interface YatirimSonucu {
  state: CharacterState;
  mesaj: string;
}

/** İşin & Yatırımların ekranındaki "Karanlık İşler" listesinin bir kartı. */
export interface KotuIsKarti {
  id: string;
  simge: string;
  /** Yatkınlık eklendikten sonraki başarı şansı (5-95). */
  basariSansi: number;
  /** Başarılı dalın verebileceği yaklaşık para (enflasyonlu); 0 ise para getirisi yok. */
  tahminiKazanc: number;
  rakibeYonelik: boolean;
  /** İsimli bir rakibin gücünü kırabilir mi (>0 ise kırar). */
  rakipKirmaGucu: number;
  /** Bu işin tekrar çevrilebilmesine kalan oyun yılı (0 = hazır). */
  kalanYil: number;
}

export interface KotuIsSonucu {
  state: CharacterState;
  kazandi: boolean;
  mesaj: string;
}

export interface KonutSonucu {
  state: CharacterState;
  mesaj: string;
}

export interface MulkKartBilgisi {
  tur: MulkTuru;
  ad: string;
  simge: string;
  aciklama: string;
  avantajliDurum: string;
  dezavantajliDurum: string;
  maliyet: number;
  sahipMi: boolean;
  tahminiYillikGetiriYuzdesi: number;
  /** BRÜT yıllık getiri (bakım hariç). */
  tahminiYillikGetiriMiktari: number;
  /** 7-11 yılda bir çıkan bakım/vergi masrafının yıllığa indirgenmiş yaklaşık tutarı. */
  yillikBakimTahmini: number;
  /** NET = brüt getiri − yıllık bakım = oyuncunun eline gerçekten kalan. */
  tahminiYillikNet: number;
  /** "Şimdi al / bekle" zamanlama sinyali. */
  piyasaSinyali: 'firsat' | 'zirve' | 'durgun';
  piyasaIpucu: string;
}

export interface MulkSatinAlSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Hazard (zar) mini-oyununun sonucu. */
export interface ZarSonucu {
  state: CharacterState;
  kazandi: boolean;
  senZar: [number, number];
  rakipZar: [number, number];
  cift: boolean;
  bicakCekildi: boolean;
  mesaj: string;
}

export interface UcKagitciSonucu {
  state: CharacterState;
  kazandi: boolean;
  /** Paranın gerçekte altında olduğu bardak (0-2) — istemci animasyonu buna göre biter. */
  dogruBardak: number;
  mesaj: string;
}

export interface BilekGuresiSonucu {
  state: CharacterState;
  mesaj: string;
}

export interface SosyallesmeYeri {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  alkolluMu: boolean;
  /** Sadece alkollü mekânlar için: şu ana kadarki ziyaret sayısı (3'e ulaşınca ayyaşlık damgası vurulur). */
  ziyaretSayisi?: number;
  /** Bu mekâna bu yıl zaten girildi mi (mekân olayı çözülünce ~2 yıl kilitlenir). */
  kilitli?: boolean;
  /** Kilidin açılmasına kalan oyun yılı. */
  kalanYil?: number;
  /** Mekâna girerken peşin düşülecek ücret (enflasyonla ölçekli). */
  girisUcreti?: number;
}

export interface SosyallesmeSonucu {
  state: CharacterState;
  /** Bu mekâna gitmek için düşülen peşin giriş ücreti. */
  girisUcreti: number;
  /** true ise mekân olayı yerine bir tanışma başladı — /scenario çekilmez. */
  tanismaBasladi?: boolean;
}

export interface SosyalAksiyonKarti {
  /** "icki:<icecekId>" ya da "deli"|"sadaka"|"kulak"|"ismarla"|"fal". */
  id: string;
  tur: 'icki' | 'aksiyon';
  simge: string;
  ad: string;
  aciklama: string;
  fiyat: number;
  alkollu?: boolean;
  gizli?: boolean;
  kilitli: boolean;
  kalanYil: number;
  neden?: string;
}

export interface SosyalAksiyonConfig {
  icecekler: SosyalAksiyonKarti[];
  aksiyonlar: SosyalAksiyonKarti[];
  alkolluMekanVar: boolean;
  /** Bilek güreşi (Kumar & Meydan) tekrar açılana kadar kalan oyun yılı (0 = hazır). */
  bilekGuresiKalanYil?: number;
}

export interface SosyalAksiyonSonucu {
  state: CharacterState;
  mesaj: string;
}

/** Bir mekân olayının tur harcamadan çözülmesinin sonucu (POST /:id/sosyallesme-olay). */
export interface SosyalOlaySonucu {
  state: CharacterState;
  basarili: boolean;
  uygulananEtki: SonucEtkisi;
  mesaj: string;
}

export interface MagazaEsyaKarti {
  id: string;
  ad: string;
  simge: string;
  aciklama: string;
  kategori: MagazaEsyaKategori;
  saglikEtkisi?: number;
  mutlulukEtkisi?: number;
  unEtkisi?: number;
  omurYil?: number;
  /** Sadece sifa: kullanınca tam olumlu etkiyi verme ihtimalinin bulanık bandı (%). */
  sifaFaydaAralik?: { min: number; max: number };
  /** Dünya durumuna ve enflasyona göre o anki güncel fiyat; sabit değildir. */
  fiyat: number;
  /** Sadece luks: bu eşyaya zaten sahip mi (bir daha satın alınamaz). */
  sahipMi: boolean;
  /** Sadece sifa: yakın zamanda bir sifa alımı yapıldığı için tüm kategori kilitli mi. */
  kilitli: boolean;
  kilitAciklamasi?: string;
}

export interface MagazaSatinAlSonucu {
  state: CharacterState;
  mesaj: string;
}

export interface EnvanterKullanSonucu {
  state: CharacterState;
  mesaj: string;
}

export type GeriBildirimKategori = 'hata' | 'oneri' | 'diger';

/** Ayarlar ekranındaki "Görüş & Öneri" formunun kullanıcı tarafından doldurulan kısmı;
 * oyun bağlamı (state.id, çağ, bölge vb.) App.tsx'te ayrıca eklenir. */
export interface GeriBildirimGirdi {
  kategori: GeriBildirimKategori;
  mesaj: string;
  iletisim?: string;
}

export type SiralamaTuru = 'genel' | 'en_zengin' | 'en_unlu' | 'en_uzun_yasayan';
export type SiralamaDonemi = 'tumZaman' | 'hafta';

export interface ScoreKaydi {
  id: number;
  isim: string;
  skor: number;
  meslek: string;
  rutbe: string;
  cag: string;
  bolge: string;
  yerlesim: string;
  kisilik: string;
  /** Türkçe ölüm nedeni (eski kayıtlarda oyuncunun o anki dilinde). */
  olum_nedeni: string;
  /** İngilizce ölüm nedeni — eski kayıtlarda boş. */
  olum_nedeni_en?: string;
  yas: number;
  para: number;
  un: number;
  unvanlar: string;
  efsanevi_olum: string;
  hayat_amaci_tamamlandi: boolean;
  /** Gerçek skor çarpanı (ör. 1.5/2/3/3.5/5) — eski kayıtlarda null. */
  amac_carpani: number | null;
  createdAt: string;
}

/** "Yıl" penceresi: son yıllarda ülkende ve dünyada olanlar (GET /:id/dunya-gecmisi). */
export interface DunyaMaddesi {
  yil: number;
  yilSon?: number;
  suruyor?: boolean;
  ikon: string;
  metin: string;
}

export interface DunyaGecmisi {
  yil: number;
  bolge: string;
  baslangicYili: number;
  ulke: DunyaMaddesi[];
  dunya: DunyaMaddesi[];
}

/** Üst şerit gösterge detay penceresi (GET /:id/gosterge/:stat). */
export type GostergeStat = 'saglik' | 'para' | 'mutluluk' | 'ahlak' | 'aranma' | 'sohret';

export interface GostergeEtken {
  ikon: string;
  metin: string;
  /** iyi = değeri yükseltir, kotu = düşürür, notr = bilgi. */
  yon: 'iyi' | 'kotu' | 'notr';
}

export interface GostergeDetayi {
  stat: GostergeStat;
  deger: number;
  etkenler: GostergeEtken[];
  yukselt: string[];
  dusur: string[];
  /** Son seçimlerin bu göstergeye etkisi, en yeni üstte. */
  gecmis: { yil: number; kaynak: string; delta: number }[];
}
