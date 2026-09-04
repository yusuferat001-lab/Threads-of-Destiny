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

export type MulkTuru = 'ciftlik' | 'han' | 'demirci' | 'kervan' | 'karaborsa';

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

export interface HayatAmaci {
  id: string;
  ad: string;
  aciklama: string;
  hedefTuru: 'para' | 'un' | 'ahlak' | 'cocuk';
  hedefDeger: number;
  tamamlandi: boolean;
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
  sehir_yonetim_seviyesi: number;
  sehir_yonetim_unvan: string | null;
  cag: string;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  konut_id: string;
  yasam_secimi_id: string;
  kendi_isi_yatirim_sayisi: number;

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

  suc_seviyesi: number;
  mulkler: MulkTuru[];
  /** Her mülk için bir sonraki periyodik bakım/vergi masrafına kalan yıl (7-10 yılda bir). */
  mulk_bakim_kalan: Partial<Record<MulkTuru, number>>;
  magaza_envanteri: SahipOlunanEsya[];
  magaza_temel_kilit_bitis_yili: number | null;
  alkol_ziyaret_sayisi: number;

  yatkinliklar: Record<string, number>;
  yatkinlik_kaynaklari: YatkinlikKaynagi[];

  dost_adi: string;
  rakip_adi: string;
  dost_puani: number;
  rakip_puani: number;

  es_adi: string | null;
  es_puani: number;
  es_meslek: string | null;
  es_rutbe: string | null;
  cocuk_sayisi: number;
  cocuklar: Cocuk[];

  ekip: EkipUyesi[];
  hizip: string | null;

  amir_adi: string | null;
  amir_rutbe: string | null;
  astlar: Ast[];

  anne_adi: string;
  baba_adi: string;

  evcil_hayvan: EvcilHayvan | null;
  unvanlar: string[];
  hayat_amaci: HayatAmaci | null;
  efsanevi_olum: string | null;

  etiketler: string[];
  durumlar: Durum[];
  ulke: UlkeDurumu;

  son_zorunlu_bagis_yili: number | null;
  son_zenginlik_sizinti_yili: number | null;
  buyuk_savas: BuyukSavas | null;
  son_buyuk_savas_bitis_yili: number | null;
  veba: VebaDurumu | null;
  veba_gecirdi: boolean;
  son_veba_bitis_yili: number | null;
  kucuk_kriz_sonraki_yil: number;
  gida_fiyat_sok_bitis_yili: number | null;
  /** Ömürde bir kez borçtayken alınan kilise/eş dost yardımı kullanıldı mı. */
  borc_yardimi_alindi: boolean;

  tur_sayisi: number;
  gecmis_olaylar: string[];
  gecmis: GecmisNoktasi[];
  hayat_hikayesi: HayatOlayi[];
  aktif: boolean;
  olum_nedeni: string | null;
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
}

export interface Cocuk {
  isim: string;
  dogum_yili: number;
  yasiyor: boolean;
}

export interface KisilikEksenleri {
  fevrilik: number;
  merhamet: number;
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
}

export interface Ast {
  isim: string;
  rutbe: string;
}

export interface SonucEtkisi {
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
  maas_carpani?: number;
  es_ata?: boolean;
  es_puani?: number;
  es_kaybet?: boolean;
  cocuk_ekle?: number;
  cocuk_kaybet?: boolean;
  ekip_ekle?: { rol: string; tahminGenisligi: number };
  ekip_kaybi?: boolean;
  ekip_sil?: string;
  hizip_ata?: string;
  // --- server/src/types.ts ile senkron (istemci EtkiCipleri yalnız ilk grubu gösterir; gerisi tam senkron için) ---
  durum_sil?: string[];
  ordu_techizat_artis?: number;
  ticaret_sermaye_artis?: number;
  nufuz_artis?: number;
  suc_artis?: number;
  suc_seviyesi_ayarla?: number;
  para_sifirla?: boolean;
  un_sifirla?: boolean;
  para_yuzde_kaybet?: number;
  yerlesim_zorla?: string;
  dost_puani?: number;
  rakip_puani?: number;
  zorunlu_sonraki?: string;
  mulk_kaybet?: MulkTuru;
  evcil_hayvan_edin?: { tur?: string };
  evcil_hayvan_kaybet?: boolean;
  unvan_kazan?: string;
  hayat_amaci_ata?: { id: string; ad: string; aciklama: string; hedefTuru: HayatAmaci['hedefTuru']; hedefDeger: number };
  kriz_baslat?: { tur: UlkeKrizi['tur']; sureYil: number };
  efsanevi_olum?: string;
  sehir_yonetim_artis?: number;
  kariyer_puani_artis?: number;
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
  ipucu?: string;
}

export interface SenaryoResponse {
  olay_basligi: string;
  olay_metni: string;
  kategori: string;
  gorsel: string;
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
  enflasyonYuzdesi: number;
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

export interface YatirimConfig {
  kendiIsiMaliyeti: number;
  kendiIsiYatirimSayisi: number;
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
  tahminiYillikGetiriMiktari: number;
  /** 7-10 yılda bir çıkan bakım/vergi masrafının yıllığa indirgenmiş yaklaşık tutarı. */
  yillikBakimTahmini: number;
}

export interface MulkSatinAlSonucu {
  state: CharacterState;
  mesaj: string;
}

export interface ZarSonucu {
  state: CharacterState;
  kazandi: boolean;
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
}

export interface SosyallesmeSonucu {
  state: CharacterState;
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

export type SiralamaTuru = 'genel' | 'en_zengin' | 'en_unlu';

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
  olum_nedeni: string;
  yas: number;
  para: number;
  un: number;
  unvanlar: string;
  efsanevi_olum: string;
  hayat_amaci_tamamlandi: boolean;
  createdAt: string;
}
