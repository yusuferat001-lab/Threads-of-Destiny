export type Cag = "Orta Çağ" | "Sanayi Devrimi";

/** Oyuncunun arayüz/anlatı dili. Karakterle birlikte kaydedilir; eski kayıtlarda eskiKayitGocu "tr" atar. */
export type Dil = "tr" | "en";

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

/** Tekrarlayan büyük savaş mekaniği: state.ulke.savasta=true olduğunda aktif; süre/vergi/gıda çarpanı savaş başlarken bir kere rastgele belirlenir. */
export interface BuyukSavas {
  dusman: string;
  baslangicYili: number;
  bitisYili: number;
  /** Pasif gelirden ek olarak kesilen "savaş vergisi" oranı (0.15-0.20). */
  vergiOrani: number;
  /** Yaşam/gıda giderine uygulanan çarpan (1.25-1.35). */
  gidaCarpani: number;
}

/** Ömürde bir kez tetiklenebilen veba: aktif fazda ölüm riski taşır, aktif+iz süresi boyunca kira/maaş etkisi kalıcıdır. */
export interface VebaDurumu {
  aktif: boolean;
  baslangicYili: number;
  /** Aktif salgının biteceği yıl. */
  bitisYili: number;
  /** Kira/maaş izinin tamamen sileceği yıl (bitisYili'den 10-15 yıl sonra). */
  etkiBitisYili: number;
  /** Konut kirasına uygulanan çarpan (0.60-0.70, boş evler yüzünden kira düşer). */
  konutKiraCarpani: number;
  /** Maaşa uygulanan çarpan (1.20-1.30, işçi kıtlığı yüzünden ücret artar). */
  gelirCarpani: number;
  /** Salgın başında seçilen korunma düzeyi: 0 = hiç, 1 = kısmi (evde tedbir), 2 = tam (kırsala çekil). Yıllık ölüm risklerini kademeli düşürür. */
  korumaSeviyesi: number;
}

export interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: "iyi" | "normal" | "kotu";
  /** Zaman sınırlı global durum: kıtlık/isyan (olumsuz) ya da altın çağ (olumlu); her turda pasif etki uygular. */
  kriz: UlkeKrizi | null;
  /** Göç/doğum dengesi; mülk gelirlerini (özellikle han/meyhane) ve piyasa dedikodularını etkiler. */
  nufusDurumu: "artiyor" | "normal" | "azaliyor";
}

/** Piyasa mülkleri: her biri en fazla bir kez sahiplenilebilir, getirisi state.ulke'ye göre her tur yeniden hesaplanır. */
export type MulkTuru = "kucuk_tarla" | "ciftlik" | "han" | "demirci" | "kervan" | "karaborsa";

/**
 * Olay dışı evlenme akışının (GET /:id/evlilik-adaylari, POST /:id/evlilik-teklifi)
 * adayı: her GET çağrısında rastgele üretilir, state'te saklanmaz — istemci seçtiği
 * adayı olduğu gibi POST'a geri gönderir.
 */
export interface EvlilikAdayi {
  isim: string;
  meslek: string;
  rutbe: string;
  kisilik: [string, string];
  /** Oyuncunun kişiliğiyle kaba bir uyum tahmini (0-100); teklif başarı şansını etkiler. */
  uyumYuzdesi: number;
}

/** Mağaza eşya türü: "sifa" sağlık/mutluluk verir ve zamanla bozulur; "luks" ün/statü verir ve kalıcıdır. */
export type MagazaEsyaKategori = "sifa" | "luks";

/**
 * Mağazadan satın alınıp state.magaza_envanteri'nde tutulan somut bir eşya
 * kopyası (gizemli eşyalardan farklı olarak etiket değil, ayrı bir dizi
 * elemanıdır — her satın alma kendi ömrünü/id'sini taşıyan yeni bir kayıt
 * doğurur). kalanYil'in anlamı kategoriye göre değişir (bkz. stateManager.ts
 * envanterBozulmasiUygula): "sifa" için 0'a inince eşya çürüyüp silinir;
 * "luks" için 0'a inince periyodik bir bakım masrafı çıkar ve sayaç yeniden
 * kurulur (eşya silinmez — kalıcıdır).
 */
export interface SahipOlunanEsya {
  id: string;
  katalogId: string;
  ad: string;
  simge: string;
  kategori: MagazaEsyaKategori;
  alisYili: number;
  kalanYil: number | null;
}

/** ESKİ tekil hayat amacı (2026-09'a kadar). Artık kullanılmıyor — yerini `hayat_amaclari` aldı.
 * Alan geriye dönük uyum için tipte kalıyor (eski test/sim/istemci referansları + eski DB blob'ları). */
export interface HayatAmaci {
  id: string;
  ad: string;
  aciklama: string;
  hedefTuru: "para" | "un" | "ahlak" | "cocuk";
  hedefDeger: number;
  tamamlandi: boolean;
}

export type AmacZorluk = "normal" | "zor";
/** "herhangi" = bir an eşiğe dokunmak yeter, kalıcı kilitlenir. "olumde" = yalnız ölüm anındaki duruma bakılır. */
export type AmacKontrolAni = "herhangi" | "olumde";

/**
 * Karakterin 15 yaşında meslek seçince havuzdan çekilen 3 kişisel amacından biri
 * (2 normal + 1 zor). Her tamamlanan amaç nihai skor çarpanına `bonus` kadar
 * TOPLAMSAL katkı yapar: skorCarpani = max(1, Σ tamamlanan bonuslar). normal=1.5,
 * zor=2 → hepsi tamamlanırsa ×5 (eski tekil "amaç tamamlandı = ×5" tavanı korunur).
 */
export interface AmacIlerleme {
  id: string;
  zorluk: AmacZorluk;
  bonus: number;
  kontrolAni: AmacKontrolAni;
  tamamlandi: boolean;
  /** Tamamlandığı oyun yılı (yalnız tamamlandi=true iken). */
  tamamlanmaYili?: number;
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
  /** Oyuncunun seçtiği dil; olay/anlatı metinleri ve arayüz bu dile göre sunulur. Eski kayıtlarda eskiKayitGocu "tr" atar. */
  dil: Dil;

  yil: number;
  /** Karakter yaratıldığındaki başlangıç yılı; enflasyonun gerçek geçen yıla göre (çağa özel oranla) hesaplanması için sabit referans. */
  baslangic_yili: number;
  yas: number;
  meslek: string;
  rutbe: string;
  /** 1-5. Yalnızca artar (ratchet) — kariyer_puani/stat düşse bile rütbe düşmez. */
  rutbe_seviye: number;
  /** Rütbe ilerlemesini besleyen tek monoton sayaç: yıllık kıdem + meslek-kategori başarıları + kendi işine yatırım. Asla azalmaz. */
  kariyer_puani: number;
  /** Son terfinin gerçekleştiği oyun yılı; bir sonraki terfinin cooldown'u bunu referans alır. Yaratılışta baslangic_yili. */
  son_terfi_yili: number;
  /** En üst rütbeye (4+) ulaştıktan sonra açılan, üst sınırı olmayan ikinci bir ilerleme ekseni: şehir ekonomisini yönetmek için rakiplerle rekabet. 0 = henüz başlamadı. */
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
  /** Hazard (zar) mini-oyununda oynanan toplam el sayısı — "rakip bıçak çekti" periyodu için. */
  hazard_el_sayisi: number;
  /** Üç Kağıtçı mini-oyununda oynanan toplam oyun sayısı (istatistik/ileride aranma tırmanışı için). */
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

  /** Meslek-özel derinlik metrikleri; ilgili olmayan mesleklerde 0 kalır. */
  ordu_mevcudu: number;
  ordu_techizat_seviyesi: number;
  ticaret_sermaye: number;
  nufuz: number;

  /**
   * TEK suç/aranma ekseni (0-100, üst şeritteki yıldız göstergesi bunu okur).
   * Kumar/karaborsadan ve suç işleyerek para kazandıran seçimlerden birikir,
   * yılda -1 pasif azalır. Bantlar: 0-19 temiz, 20-39 kademe 1 (rutin çevirme/
   * rüşvet), 40-59 kademe 2 (ciddi ilgi; 45+ hapis riski), 60-79 kademe 3
   * (tutuklama ekibi + ev/iş yeri baskını), 80-100 kademe 4 (azami takip/ödül
   * avcıları). Olaylar minSucSeviyesi/maxSucSeviyesi ile bu bantlara kilitlenir.
   */
  suc_seviyesi: number;
  /**
   * "hapiste" etiketi eklendiğinde belirlenen ceza süresi (yıl); her turda geçen
   * yıl kadar azalır, 0'a inince karakter otomatik serbest kalır ("hapiste"
   * etiketi silinir). Riskli kaçış girişimleri başarısız olursa
   * SonucEtkisi.hapis_ceza_artis ile bu sayaç uzar. Hapiste değilken 0.
   */
  hapis_ceza_kalan: number;
  /**
   * Tutuklanma anında belirlenen TOPLAM hapis cezası (yıl) — hapis_ceza_kalan'ın
   * aksine azalmaz, ceza boyunca sabit kalır (hapis_ceza_artis ile birlikte uzar).
   * "Yıl yatılan" = hapis_ceza_toplam - hapis_ceza_kalan; ağır bantlarda (suc_seviyesi
   * ≥50) para/af ile erken çıkışı engelleyen minimum yatma süresi kuralı bunu
   * kullanır (§17). Tahliyede 0'a sıfırlanır. Hapiste değilken 0.
   */
  hapis_ceza_toplam: number;
  /** Sahip olunan piyasa mülkleri (her türden en fazla bir tane). */
  mulkler: MulkTuru[];
  /**
   * Her sahip olunan mülk için, bir sonraki periyodik bakım/vergi masrafına kalan
   * yıl. Satın alınca 7-10 yıl arası başlar; her turda geçen yıl kadar azalır,
   * 0'a inince mülkün güncel değerinin ~%12'si masraf olarak çıkar ve sayaç
   * yenilenir (mülk SİLİNMEZ). Mülk elden çıkınca ilgili anahtar da silinir.
   */
  mulk_bakim_kalan: Partial<Record<MulkTuru, number>>;
  /** Mağazadan satın alınan eşyalar (gizemli eşyalardan ayrı, etiket değil dizi tabanlı envanter — bkz. SahipOlunanEsya). */
  magaza_envanteri: SahipOlunanEsya[];
  /** state.yil bu değere ulaşana kadar "sifa" mağaza alışverişi kilitlidir (herhangi bir sifa satın alımından sonra +3 yıl kilitlenir); null = kilit yok. */
  magaza_temel_kilit_bitis_yili: number | null;
  /**
   * Alkollü bir sosyalleşme mekânına (meyhane/pub/ordugâh çadırı) kaç kez gidip
   * bir olay yaşandığı; AYYAS_ESIGI'ye ulaşınca bir kereliğine "bagimlilik:ayyas"
   * etiketi ve kalıcı bir Ayyaşlık durumu tetiklenir (bkz. gameEngine.ts).
   */
  alkol_ziyaret_sayisi: number;
  /**
   * Sosyalleşme ekranındaki tur-harcamayan aksiyonların (içki iç, deliyle konuş,
   * sadaka ver, kulak kabart, birine içki ısmarla, fal baktır) son kullanıldığı
   * oyun yılı — aksiyon id → yıl. Her aksiyon kendi cooldown'ı dolana kadar
   * yeniden yapılamaz (bkz. gameEngine.ts sosyallesmeAksiyonYap).
   */
  sosyallesme_aksiyon_kilit: Record<string, number>;

  yatkinliklar: Record<Kategori, number>;
  yatkinlik_kaynaklari: YatkinlikKaynagi[];

  dost_adi: string;
  rakip_adi: string;
  dost_puani: number;
  rakip_puani: number;
  /** Derin rakip ilişkileri (§13): isimli rakipler + güç/husumet. rakipler[0].ad === rakip_adi. Eski kayıtlarda eskiKayitGocu üretir. */
  rakipler: Rakip[];

  es_adi: string | null;
  es_puani: number;
  es_meslek: string | null;
  es_rutbe: string | null;
  cocuk_sayisi: number;
  cocuklar: Cocuk[];
  /** Son çocuğun doğduğu oyun yılı — eşle ilişkiye bağlı doğum denemesinin cooldown'u (§33). */
  son_dogum_yili?: number;

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
  /** ESKİ tekil amaç — artık atanmıyor (yeni karakterde null). Geriye dönük uyum için duruyor. */
  hayat_amaci: HayatAmaci | null;
  /** Meslek seçilince atanan 3 kişisel amaç (2 normal + 1 zor). Skoru `amacSkorCarpani` ile çarpar. */
  hayat_amaclari: AmacIlerleme[];
  /** Suç seviyesinin ömür boyu ulaştığı en yüksek değer (amaç koşulları için — "hiç aranmadan yaşa"). */
  omur_zirve_suc: number;
  /** Zar/üç kâğıt/bilek güreşinden ömür boyu net kâr/zarar toplamı (kumar amaçları için). */
  omur_kumar_net: number;
  /** Ömür boyu verilen sadaka sayısı (sosyalleşme "sadaka" aksiyonu + bağış olayları). */
  omur_sadaka_sayisi: number;
  /** Ömür boyu eşe/çocuğa/ekibe/dosta verilen hediye sayısı (envanter hediye + aile hediye etkileşimi). */
  omur_hediye_sayisi: number;
  /** Başarısızlığında ölüm/`olum_sansi` ≥ 25 olan bir seçimi başarıyla atlatma sayısı ("korkusuz"/"ölümle dans" amaçları). */
  omur_riskli_basari: number;
  /** Ölüm nadir/komik bir şekilde gerçekleştiyse (ör. "Kendi Kazdığı Kuyuya Düşen") burada saklanır; liderlik tablosunda rozet olarak gösterilir. */
  efsanevi_olum: string | null;

  etiketler: string[];
  durumlar: Durum[];
  ulke: UlkeDurumu;

  /** Zorunlu bağış olayının son tetiklendiği yıl (cooldown takibi); hiç tetiklenmediyse null. */
  son_zorunlu_bagis_yili: number | null;
  /** Zenginlik sızıntısının (hırsız/haraç/dolandırıcı vb. — net servet ≥ 350 & nakit ≥ 50) son tetiklendiği yıl; 6 yıllık cooldown takibi. Hiç olmadıysa null. */
  son_zenginlik_sizinti_yili: number | null;
  /** Rakip'in "parayı alıp kaçtığı" soygunun son yaşandığı yıl (nakit yüksekken düşük ihtimalli, 8 yıllık cooldown). Hiç olmadıysa null. */
  son_rakip_soygun_yili: number | null;
  /** Aktif büyük savaşın parametreleri; savaş yokken null. */
  buyuk_savas: BuyukSavas | null;
  /** En son büyük savaşın bittiği yıl (10 yıllık minimum cooldown takibi); hiç savaş olmadıysa null. */
  son_buyuk_savas_bitis_yili: number | null;
  /** Aktif ya da iz fazındaki veba; yoksa null. Artık ömürde bir kez değil — dalga bitince 20 yıl cooldown ile tekrarlanabilir. */
  veba: VebaDurumu | null;
  /** Karakter hayatında en az bir kez veba geçirdi mi (salt istatistik/flavor; tetiklemeyi artık bloklamaz). */
  veba_gecirdi: boolean;
  /** En son veba dalgasının (iz fazı dahil) tamamen bittiği yıl; 25 yıllık cooldown buradan sayılır. Hiç veba olmadıysa null. */
  son_veba_bitis_yili: number | null;
  /**
   * Karakter vebayı bizzat KAPTIYSA (etiket "veba_hastasi") o anki ölüm riski
   * yüzdesi (0-100). Bulaşma anında ~70 olur; her hastalık turunda `vebaHastasiOlayi`
   * olaylarının `veba_olum_riski_artis` etkisiyle ± değişir ve turda geçen zamanla
   * doğal olarak düşer; eşik altına inince iyileşilir (etiket silinir, alan 0'lanır).
   * Hasta değilken 0.
   */
  veba_olum_riski: number;
  /** Bir sonraki küçük krizin (kıtlık/haydut baskını) tetikleneceği yıl eşiği. */
  kucuk_kriz_sonraki_yil: number;
  /** Küçük kriz tetiklendiğinde SADECE bu yıla kadar geçerli olan ×2 gıda fiyat şoku; null = şok yok. */
  gida_fiyat_sok_bitis_yili: number | null;
  /** Ömürde bir kez: borçtayken (para < 0, bütçe açığı sürerken) kilise/eş dost bir kereliğine borcun bir kısmını kapatır. true olunca bir daha tetiklenmez. */
  borc_yardimi_alindi: boolean;
  /** Kalıcı salgından korunma yatırımı; yoksa null. Bir sonraki veba dalgasında tüketilir. */
  salgin_korunma_yatirimi: SalginKorunmaYatirimi | null;
  /** Aktif tefeci kredisi; yoksa null. Aynı anda en fazla bir kredi. */
  kredi: Kredi | null;

  /** Aile ekranı etkileşim cooldown'ları: anahtar (ör. "es:hediye", "cocuk:2:oyna") → tekrar açılacağı oyun yılı. */
  aile_etkilesim_kilit: Record<string, number>;
  /** Eş/çocuğun bekleyen para talebi; yoksa null (§33). */
  aile_talep: AileTalep | null;
  /** Bir sonraki aile talebinin üretilebileceği en erken yıl (yaratılışta baslangic_yili + 4). */
  aile_talep_sonraki_yil: number;

  /** Kariyer sayfası — şehri yöneten kişiyle (hükümdar/vali) ilişki (0-100, başlangıç 40). §35. */
  yonetim_iliski: number;
  /** Kariyer sayfası — mesleğe göre patron (lonca reisi / fabrika patronu / yüksek ruhban) ile ilişki (0-100, başlangıç 40). §35. */
  patron_iliski: number;
  /** Yönetim etkileşim/istek cooldown'ları: anahtar (ör. "yonetici:bagis", "patron:istek:zam") → tekrar açılacağı oyun yılı. */
  yonetim_etkilesim_kilit: Record<string, number>;
  /** Son turlarda yapılan yönetim etkileşimi sayısı (her etkileşimde +1, yılda ~2 azalır); yüksekken "çok üstüne gidiyorsun" ters tepmesi olasılığı artar. §35. */
  yonetim_yakin_etkilesim: number;
  /** Yönetimden gelen bekleyen dayatılan bağış / sadakat talebi; yoksa null. §35. */
  yonetim_talep: YonetimTalep | null;
  /** Bir sonraki yönetim talebinin üretilebileceği en erken yıl (yaratılışta baslangic_yili + 6). */
  yonetim_talep_sonraki_yil: number;

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
  /** Çocukla ilişki puanı (0-100); yeni doğan çocuk 65 ile başlar. Aile ekranındaki etkileşimlerle artar, ilgilenilmezse yılda ~0.6 düşer. Eski kayıtlarda eskiKayitGocu 60 backfill eder. */
  iliski: number;
}

/**
 * Eş ya da çocuğun ara sıra ilettiği, parayla karşılanan bir istek (Aile ekranında
 * "Kabul Et / Reddet" kartı olarak gösterilir). sonYil'e kadar cevaplanmazsa
 * görmezden gelinmiş sayılır: ilgili ilişki puanı ve mutluluk düşer.
 */
export interface AileTalep {
  id: string;
  kimden: "es" | "cocuk";
  kimAdi: string;
  /** kimden === "cocuk" ise cocuklar[] içindeki index; aksi halde null. */
  cocukIndex: number | null;
  tutar: number;
  /** İstenen şeyin insan-okunur adı (ör. "yeni bir at", "ipek elbise"). */
  kalem: string;
  sonYil: number;
}

/** Yönetimden (yönetici ya da patron) gelen dayatılan bağış / sadakat talebi. §35. */
export interface YonetimTalep {
  id: string;
  /** Talebi yapan hat. */
  kimden: "yonetici" | "patron";
  /** Talebi yapan kişinin adı (gösterim). */
  kimAdi: string;
  /** "bagis" = para ister; "sadakat" = para yok ama ret ilişkiyi çok düşürür. */
  tur: "bagis" | "sadakat";
  /** İstenen para (tur === "sadakat" ise 0). */
  tutar: number;
  /** Talebin insan-okunur gerekçesi (ör. "saray onarımı için bağış"). */
  kalem: string;
  sonYil: number;
}

/** 0-100 arası iki uçlu kişilik ekseni: fevrilik (0=planlayıcı, 100=fevri), merhamet (0=zalim, 100=barışçıl). */
export interface KisilikEksenleri {
  fevrilik: number;
  merhamet: number;
}

/**
 * "Derin rakip ilişkileri" (§13): meslek seçilince 2 isimli rakip üretilir
 * (rakipler[0].ad = eski tekil rakip_adi ile aynı — geriye dönük uyum).
 * `guc` = pazar payı / nüfuz (0-100, yıllar içinde yavaşça büyür); karanlık
 * işlerle kırılır, kırılan güç oyuncuya pazar payı (para + kariyer puanı)
 * olarak döner. `husumet` = rakibin oyuncuya kini (0-100); karanlık iş
 * çevirdikçe artar, yüksekken rakip misilleme yapabilir. `yenildi` olunca
 * rakip devre dışı: ne getirisi ne misillemesi kalır.
 */
export interface Rakip {
  ad: string;
  meslek: string;
  guc: number;
  husumet: number;
  yenildi: boolean;
}

/**
 * Kalıcı salgından korunma yatırımı (§27): veba dalgası GELMEDEN önce para
 * harcayıp bir sonraki dalgada `vebaBaslat`'a aktarılacak taban korunma
 * kademesini (0/1/2) yükseltir. Dalga geldiğinde seçilen korunma ile bunun
 * MAX'ı kullanılır. Bir dalga bittikten sonra tüketilir (tekrar yatırım gerekir).
 */
export interface SalginKorunmaYatirimi {
  /** 0 = yok, 1 = kısmi (hekim anlaşması/temiz su), 2 = tam (karantina evi). */
  kademe: number;
  /** Bu yatırımın yapıldığı oyun yılı (flavor/gösterim). */
  yil: number;
}

/**
 * Tefeciden alınan kontrollü borç (§ "Kredi / tefeci"). Aktif tek bir kredi
 * olabilir. Anapara + faiz her yıl `kalanBorc`'a işler; ödeme oyuncunun elindeki
 * nakitten otomatik yapılır (yıllık taksit). Üst üste ödenemezse tefeci önce
 * uyarır, sonra bir mülke/servete el koyar.
 */
export interface Kredi {
  anapara: number;
  kalanBorc: number;
  /** Yıllık faiz oranı (ör. 0.12). Pazarlıkla düşebilir. */
  faizOrani: number;
  /** Yıllık taksit hedefi (kalanBorc buna göre erir). */
  yillikTaksit: number;
  alindigiYil: number;
  /** Üst üste ödenemeyen taksit sayısı; 2'de uyarı, 3'te el koyma. */
  odenmeyenTaksit: number;
  /** Bu kredi için faiz pazarlığı yapıldı mı (kredi başına bir kez). */
  pazarlikYapildi: boolean;
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
  /** Bir veba başlatan seçenekte (ulke_etkisi.vebada = true), o seçimin sağladığı korunma düzeyi: 0/1/2. vebaBaslat'a aktarılır. */
  veba_koruma?: number;
  /** Karakter veba hastasıyken (etiket "veba_hastasi") `veba_olum_riski`'ni değiştirir; ± olabilir (hekim/tedavi negatif, ihmal/şarlatan pozitif). Yalnız hastayken anlamlı, 0-100 clamp. */
  veba_olum_riski_artis?: number;
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
  /** Yaşayan TÜM çocukların ilişki puanına uygulanan delta (± olabilir); §33. */
  cocuk_iliski?: number;
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
  /** TEK suç/aranma eksenini (suc_seviyesi, 0-100 aralığında kelepçelenir) değiştirir; ± olabilir (rüşvet/kefaret şıkları negatif verir). Kumar/karaborsa ve suç-kazancı motor kuralı da bunu kullanır. */
  suc_artis?: number;
  /** suc_seviyesi'ni mevcut değerden bağımsız, doğrudan belirtilen değere (0-100) sabitler — ör. büyük baskın sonrası "temize çıkar / kademe 1'e in" gibi kesin hedefler için; genel yükseliş/düşüş için bunun yerine suc_artis kullanılmalı. */
  suc_seviyesi_ayarla?: number;
  /** Hapiste kalan ceza süresini (state.hapis_ceza_kalan) yıl olarak uzatır — riskli kaçış girişimi başarısız olunca kullanılır. Yalnız "hapiste" etiketi varken anlamlıdır. */
  hapis_ceza_artis?: number;
  /** true ise para, mevcut değerden bağımsız kesin olarak sıfırlanır (el koyma/müsadere gibi durumlar için; normal para deltası yetmez çünkü paranın alt sınırı yoktur). */
  para_sifirla?: boolean;
  /** true ise şöhret (un), mevcut değerden bağımsız kesin olarak sıfırlanır (itibar kaybı/teşhir cezası gibi durumlar için). */
  un_sifirla?: boolean;
  /** Mevcut (pozitif) paranın belirtilen yüzdesini (0-100) kaybettirir; para negatifse hiçbir etkisi olmaz. Sabit bir rakam yerine servetle orantılı bir kayıp gerektiğinde (büyük rüşvet/kefaret) kullanılır. */
  para_yuzde_kaybet?: number;
  /** Belirtilen yerleşim id'sine (yerlesimler.ts) göre state.yerlesim'i (ad olarak) zorla değiştirir; büyük bir kaçış/sürgün sonucu kullanılır. */
  yerlesim_zorla?: string;
  /** Belirtilen türdeki mülk sahiplikten elden çıkar (baskın/el koyma gibi olaylarda kullanılır). */
  mulk_kaybet?: MulkTuru;
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
  /** Kilit taşı olaylar için: kariyer_puani'ni doğrudan artırır (rütbe ilerlemesini hızlandırır). */
  kariyer_puani_artis?: number;
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
