export type Cag = "Orta Çağ" | "Sanayi Devrimi";

export type Kategori = "savas" | "ticaret" | "din" | "siyaset" | "saglik" | "sosyal";

/** Bölge + çağa göre yaklaşık nüfus ve kısa "bilgin miydi" notları. */
export interface BolgeIstatistigi {
  nufusTahmini: string;
  notlar: string[];
}

export interface UlkeKrizi {
  tur: "kitlik" | "isyan" | "altin_cag";
  bitisYili: number;
}

export interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: "iyi" | "normal" | "kotu";
  /** Zaman sınırlı global durum: kıtlık/isyan (olumsuz) ya da altın çağ (olumlu); her turda pasif etki uygular. */
  kriz: UlkeKrizi | null;
}

/** 15 yaşında seçilen, ölüm anında tamamlanmışsa nihai skoru 5 kat büyüten uzun vadeli hedef. */
export interface HayatAmaci {
  id: string;
  ad: string;
  aciklama: string;
  hedefTuru: "para" | "un" | "ahlak" | "cocuk";
  hedefDeger: number;
  tamamlandi: boolean;
}

export interface Durum {
  id: string;
  ad: string;
  tur: "gecici" | "kalici";
  kalan_tur?: number;
  tur_basi_saglik?: number;
  tur_basi_para?: number;
  tur_basi_mutluluk?: number;
  gelir_carpani?: number;
  /** Bu durum (kalan_tur 0'a inince) sona erdiğinde karaktere eklenecek etiket; gecikmeli olay zincirleri için kullanılır. */
  bitince_etiket?: string;
}

/** Kişilik veya aile geçmişinden gelen, bir kategoriye somut yatkınlık etkisi. */
export interface YatkinlikKaynagi {
  /** Etkinin kaynağı: kişilik özelliği adı veya aile mesleği. */
  kaynak: string;
  kategori: Kategori;
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
  /** En üst rütbeye (3) ulaştıktan sonra açılan, üst sınırı olmayan ikinci bir ilerleme ekseni: şehir ekonomisini yönetmek için rakiplerle rekabet. 0 = henüz başlamadı. */
  sehir_yonetim_seviyesi: number;
  /** sehir_yonetim_seviyesi'nden türetilen unvan; seviye 0'ken null. */
  sehir_yonetim_unvan: string | null;
  cag: Cag;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  konut_id: string;
  /** Yaşam tarzı seçimi (yasamSecenekleri.ts); yıllık yaşam giderini ve sağlık/mutluluk etkisini belirler. */
  yasam_secimi_id: string;
  /** "kendi_isi" yatırımının kaç kez yapıldığı; her tekrarda maliyeti büyüten eskalasyon formülü için tutulur. */
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
  /** Farklı dil/dinden insanlarla kurulan bağların birikimi; belli eşiklerin üstünde bazı seçeneklerin kilidini açar. */
  kultur: number;

  /** Meslek-özel derinlik metrikleri; ilgili olmayan mesleklerde 0 kalır. */
  ordu_mevcudu: number;
  ordu_techizat_seviyesi: number;
  ticaret_sermaye: number;
  nufuz: number;

  yatkinliklar: Record<Kategori, number>;
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
  /** Rütbe yükseldikçe (seviye 2'de 1, seviye 3'te 2 kişi) emrine giren astlar; rütbe ladder'ının kendinden düşük basamaklarını taşırlar. */
  astlar: Ast[];

  /** Doğuştan gelen, hayat boyu sabit kalan ebeveyn isimleri (bölgeye uygun, dost/rakipten farklı). */
  anne_adi: string;
  baba_adi: string;

  evcil_hayvan: EvcilHayvan | null;
  /** Kazanılan lakaplar/ünvanlar (ör. "İpek Kralı", "Cesur Yürek"); kalıcı, birikimli. */
  unvanlar: string[];
  hayat_amaci: HayatAmaci | null;
  /** Ölüm nadir/komik bir şekilde gerçekleştiyse (ör. "Kendi Kazdığı Kuyuya Düşen") burada saklanır; liderlik tablosunda rozet olarak gösterilir. */
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
  /** true olduğunda bu oturum için liderlik tablosuna zaten bir skor kaydedildi; aynı oyunun tekrar tekrar (farklı isimlerle) gönderilmesini engeller. */
  skoru_kaydedildi: boolean;
}

export interface GecmisNoktasi {
  yil: number;
  para: number;
  saglik: number;
  un: number;
}

/** Ölüm ekranında gösterilen "hayat hikayesi" için kaydedilen önemli anlar. */
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

/** 0-100 arası iki uçlu kişilik ekseni: fevrilik (0=planlayıcı, 100=fevri), merhamet (0=zalim, 100=barışçıl). */
export interface KisilikEksenleri {
  fevrilik: number;
  merhamet: number;
}

/** Rütbe yükseldikçe emrine giren, isim ve unvanı sabit kalan bir ast; işe alınmaz/maaşı yok, salt rütbenin doğal sonucu. */
export interface Ast {
  isim: string;
  rutbe: string;
}

/** Yanına aldığın (satın aldığın/işe aldığın) yardımcı; gerçek kalitesi gizli, sadece tahmini bir aralık gösterilir. */
export interface EkipUyesi {
  id: string;
  isim: string;
  rol: string;
  gercekKalite: number;
  tahminiMin: number;
  tahminiMax: number;
  /** Yıllık maaş gideri; her turda pasifEkonomiUygula içinde yıllık gidere eklenir. */
  maas: number;
  /** Sana olan bağlılığı (0-100); işe alınırken belirlenir, oyuncuya açıkça gösterilir. */
  sadakat: number;
  /** Kısa bir kişilik etiketi (ör. "Sadık", "Hırslı", "Korkak"); tamamen kozmetik/flavor. */
  kisilik: string;
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
  /** Belirtilen id'lere sahip aktif durumları (ör. bağımlılık) kaldırır. */
  durum_sil?: string[];
  ulke_etkisi?: Partial<UlkeDurumu>;
  maas_carpani?: number;
  dost_puani?: number;
  rakip_puani?: number;
  /** true ise bölgeye uygun rastgele bir isimle evlenilir (es_adi atanır). */
  es_ata?: boolean;
  es_puani?: number;
  /** true ise eş kaybedilir (boşanma/ölüm): es_adi null'a döner, medeni:evli etiketi kaldırılır. */
  es_kaybet?: boolean;
  cocuk_ekle?: number;
  /** true ise yaşayan çocuklardan rastgele biri kaybedilir. */
  cocuk_kaybet?: boolean;
  /** Belirtilirse bir sonraki olay havuzdan rastgele seçilmez, doğrudan bu id ile gelir. */
  zorunlu_sonraki?: string;
  /** Belirtilirse yeni bir ekip üyesi eklenir; gerçek kalitesi gizlice hesaplanır. */
  ekip_ekle?: { rol: string; tahminGenisligi: number };
  /** true ise ekipten rastgele biri kaybedilir (görevden dönmeme, ayrılma vb.). */
  ekip_kaybi?: boolean;
  /** Belirtilirse bu role sahip ekip üyesi kaybedilir (rastgele değil, hedefli). */
  ekip_sil?: string;
  /** Belirtilirse karakter bu hizbe katılır (state.hizip'e yazılır, ayrıca "hizip:X" etiketi eklenir). */
  hizip_ata?: string;
  /** Asker'e özel: ordu_techizat_seviyesi'ni artırır (0-100 aralığında kelepçelenir). */
  ordu_techizat_artis?: number;
  /** Tüccar'a özel: ticaret_sermaye'yi artırır. */
  ticaret_sermaye_artis?: number;
  /** Din Adamı'na özel: nufuz'u artırır. */
  nufuz_artis?: number;
  /** Belirtilirse ve karakterin henüz evcil hayvanı yoksa, tur belirtilmemişse çağa uygun rastgele bir tür seçilir. */
  evcil_hayvan_edin?: { tur?: string };
  /** true ise mevcut evcil hayvan kaybedilir. */
  evcil_hayvan_kaybet?: boolean;
  /** Belirtilirse ve karakter bu ünvanı henüz taşımıyorsa, unvanlar listesine eklenir. */
  unvan_kazan?: string;
  /** 15 yaşındaki hayat amacı seçim olayında kullanılır; state.hayat_amaci'ni atar. */
  hayat_amaci_ata?: { id: string; ad: string; aciklama: string; hedefTuru: HayatAmaci["hedefTuru"]; hedefDeger: number };
  /** Belirtilirse global bir kriz/altın çağ başlatır; bitisYili = o anki yıl + sureYil olarak hesaplanır. */
  kriz_baslat?: { tur: UlkeKrizi["tur"]; sureYil: number };
  /** Ölüm bu seçimden kaynaklanıyorsa, nadir/komik bir ölüm başlığı olarak kaydedilir (liderlik tablosunda rozet). */
  efsanevi_olum?: string;
  /** En üst rütbeye ulaşanlar için: sehir_yonetim_seviyesi'ni bu kadar artırır (üst sınır yok). */
  sehir_yonetim_artis?: number;
}

/** Oyuncuya gösterilen bulanık şans aralığı; gerçek basari_sansi hep gizli kalır. */
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
  kategori: Kategori;
  gorsel: string;
  secenekler: Secenek[];
}

/**
 * Bir seçeneğin onTepki'li olması durumunda /choice'un döndürdüğü ara-ekran: zaman
 * ilerlemez, sadece "geri çekil" / "ısrar et" arasında kesin (şanssız) bir seçim sunar.
 */
export interface TepkiSonucu {
  ara_tepki: true;
  olay_basligi: string;
  olay_metni: string;
  secenekler: [{ metin: string }, { metin: string }];
}
