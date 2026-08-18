export interface Durum {
  id: string;
  ad: string;
  tur: 'gecici' | 'kalici';
  kalan_tur?: number;
  tur_basi_saglik?: number;
  tur_basi_para?: number;
  gelir_carpani?: number;
  bitince_etiket?: string;
}

export interface UlkeKrizi {
  tur: 'kitlik' | 'isyan' | 'altin_cag';
  bitisYili: number;
}

export interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: 'iyi' | 'normal' | 'kotu';
  kriz: UlkeKrizi | null;
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

  yil: number;
  yas: number;
  meslek: string;
  rutbe: string;
  rutbe_seviye: number;
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
  kultur: number;

  ordu_mevcudu: number;
  ordu_techizat_seviyesi: number;
  ticaret_sermaye: number;
  nufuz: number;

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

  tur_sayisi: number;
  gecmis_olaylar: string[];
  gecmis: GecmisNoktasi[];
  hayat_hikayesi: HayatOlayi[];
  aktif: boolean;
  olum_nedeni: string | null;
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
  kultur?: number;
  yeni_meslek?: string;
  olum?: boolean;
  olum_sansi?: number;
  mesaj: string;
  detay?: string;
  etiket_ekle?: string[];
  etiket_sil?: string[];
  durum_ekle?: Durum;
  ulke_etkisi?: Partial<UlkeDurumu>;
  maas_carpani?: number;
  es_puani?: number;
  es_kaybet?: boolean;
  cocuk_ekle?: number;
  cocuk_kaybet?: boolean;
  ekip_ekle?: { rol: string; tahminGenisligi: number };
  ekip_kaybi?: boolean;
  ekip_sil?: string;
  hizip_ata?: string;
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
}

export interface GiderKalemleri {
  yasam: number;
  konut: number;
  ekip: number;
  evcilHayvan: number;
  vergi: number;
}

export interface FinansOzeti {
  maasYillik: number;
  giderKalemleri: GiderKalemleri;
  netYillik: number;
  enflasyonYuzdesi: number;
}

export type YatirimTuru = 'kendi_isi' | 'guvenli' | 'riskli';

export interface YatirimSonucu {
  state: CharacterState;
  mesaj: string;
}

export interface YatirimConfig {
  kendiIsiMaliyeti: number;
  kendiIsiYatirimSayisi: number;
  guvenliKademeleri: number[];
  guvenliGeriOdemeTur: number;
  riskliMaliyeti: number;
  riskliKazancCarpani: number;
}

export interface KonutSonucu {
  state: CharacterState;
  mesaj: string;
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
