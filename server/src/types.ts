export type Cag = "Orta Çağ" | "Sanayi Devrimi";

/** Oyuncunun arayüz/anlatı dili. Karakterle birlikte kaydedilir; eski kayıtlarda eskiKayitGocu "tr" atar. */
export type Dil = "tr" | "en";

export type Kategori = "savas" | "ticaret" | "din" | "siyaset" | "saglik" | "sosyal" | "zanaat";

/** Bölge + çağa göre yaklaşık nüfus ve kısa "bilgin miydi" notları. */
export interface BolgeIstatistigi {
  nufusTahmini: string;
  notlar: string[];
}

export interface UlkeKrizi {
  tur: "kitlik" | "isyan" | "altin_cag";
  bitisYili: number;
}

/** Dünya dönemi (Faz A): her an bunlardan biri sürer; aynısı arka arkaya gelmez. */
export type DonemTuru = "bolluk" | "durgunluk" | "kitlik";

/**
 * Bir dönemin / savaşın / vebanın etkileri — hepsi çarpan (1 = etkisiz). Dönem
 * başında her biri kendi aralığından BİR KEZ zarla belirlenir (tam yüzde), dönem
 * boyunca sabit kalır. Talep/fiyat alanları meslek işletmesi (Faz D) için.
 */
export interface DonemEtkisi {
  temelTalep: number;
  temelFiyat: number;
  luksTalep: number;
  luksFiyat: number;
  yasamGideri: number;
  /** Eski maaş formülüyle kazanan meslekler için gelir çarpanı. */
  maas: number;
  /** Toplam pazar büyüklüğünün YILLIK değişimi (kesir: 0.035 = +%3,5; savaş/vebada negatif); dönem başında aralıktan zarlanır. Eski kayıtlarda yok → türden hesaplanır. */
  pazarBuyume?: number;
}

export interface DonemDurumu {
  tur: DonemTuru;
  baslangicYili: number;
  bitisYili: number;
  /** Önceden zarla belirlenen sonraki dönem (dedikodu sinyali için); savaş sürerse bolluk yerine diğeri gelir. */
  sonraki: DonemTuru;
  etki: DonemEtkisi;
}

/** Yaklaşan savaş/veba: bir yıl önceden belirlenir ki dedikodu haber verebilsin. */
export interface DunyaYaklasan {
  tur: "savas" | "veba";
  yil: number;
  dusman?: string;
}

/** Tekrarlayan büyük savaş mekaniği: state.ulke.savasta=true olduğunda aktif; süre/vergi/gıda çarpanı savaş başlarken bir kere rastgele belirlenir. */
export interface UlkeGecmisiKaydi {
  yil: number;
  tur: "savas_basladi" | "savas_bitti" | "veba_basladi" | "veba_bitti" | "kriz_basladi" | "kriz_bitti";
  /** Savaşta ham (TR) düşman adı; krizde kriz türü ("kitlik" | "isyan" | "altin_cag"). */
  ayrinti?: string;
}

export interface BuyukSavas {
  dusman: string;
  baslangicYili: number;
  bitisYili: number;
  /** Pasif gelirden ek olarak kesilen "savaş vergisi" oranı (0.07-0.10). */
  vergiOrani: number;
  /** Yaşam/gıda giderine uygulanan çarpan (1.12-1.18). */
  gidaCarpani: number;
  /** Talep/fiyat/maaş etkileri (eski kayıtlarda yok). */
  etki?: DonemEtkisi;
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
  /** Talep/fiyat/maaş etkileri (eski kayıtlarda yok). */
  etki?: DonemEtkisi;
}

export interface UlkeDurumu {
  savasta: boolean;
  vebada: boolean;
  ekonomi: "iyi" | "normal" | "kotu";
  /** Zaman sınırlı global durum: kıtlık/isyan (olumsuz) ya da altın çağ (olumlu); her turda pasif etki uygular. */
  kriz: UlkeKrizi | null;
  /** Göç/doğum dengesi; mülk gelirlerini (özellikle han/meyhane) ve piyasa dedikodularını etkiler. */
  nufusDurumu: "artiyor" | "normal" | "azaliyor";
  /** Genel dönem (bolluk/durgunluk/kıtlık). `ekonomi` bundan türetilir. Eski kayıtlarda göçle atanır. */
  donem?: DonemDurumu;
}

/** Piyasa mülkleri: her biri en fazla bir kez sahiplenilebilir, getirisi state.ulke'ye göre her tur yeniden hesaplanır. */
export type MulkTuru = "kucuk_tarla" | "ciftlik" | "han" | "demirci" | "kervan" | "karaborsa";

/** Evlilik yolu: "ask" = tanışma/sevgili üzerinden, "mantik" = aday listesinden (çeyizli). */
export type EvlilikTuru = "ask" | "mantik";

/** Düğün bütçesi: ilişki başlangıcını ve şöhreti belirler (bkz. data/aileSabitleri.ts). */
export type DugunButcesi = "ucuz" | "orta" | "pahali";

/** Teklifin yanındaki hediye kademesi: sade (hediyesiz) / ucuz / pahalı. */
export type TeklifHediyesi = "sade" | "ucuz" | "pahali";

/**
 * Eşin / adayın gizli huyu. Tanışma (Aşama 2) diyalog yaklaşımıyla eşleşir; evlilikten
 * sonra da hediye / zaman geçirme etkisini hafifçe değiştirir (bkz. aileSabitleri.HUY_ETKI).
 */
export type AileHuy = "mizahsever" | "parasever" | "ciddi" | "maceraci" | "sefkatli" | "gururlu";

/** Teklifi kabul edilmiş ama düğün bütçesi henüz seçilmemiş eş adayı (mantık ya da aşk). */
export type BekleyenDugun = MantikAday & { tur: EvlilikTuru };

/**
 * Mantık evliliği aday listesindeki bir kişi. State'te (`mantik_adaylar`) saklanır;
 * liste 5-6 yılda bir yenilenir. `grup`: genç (27-33) çocuk ihtimali yüksek, standart
 * çeyiz; olgun (38-43) çocuk ihtimali çok düşük ama çeyiz ve meslek bonusu 1.5×.
 */
export interface MantikAday {
  isim: string;
  meslek: string;
  rutbe: string;
  /** Adayın yaşı (listelendiği yıldaki). */
  yas: number;
  grup: "genc" | "olgun";
  /** Gizli huylar — kartta yalnız ilki görünür, ikincisi evlilikten sonra açılır. */
  huylar: [AileHuy, AileHuy];
  /** Peşin çeyiz parası (enflasyonlu, düğünde cebe girer). */
  ceyiz: number;
  /** Kalıcı "meslek bonusu" (yüzde) — evlenince `es_meslek_bonusu`na yazılır. */
  meslek_bonusu: number;
}

/** Tanışma diyaloğundaki yaklaşım tarzı; karşı tarafın gizli huyuyla eşleşirse adım başarı şansı artar. */
export type TanismaYaklasim = "komik" | "nazik" | "ovunme" | "mutevazi";

/** Tanışılan kişi (aşk evliliği yolu) — mantık adayından farklı olarak yalnız kimlik + gizli huylar taşır. */
export interface TanismaAdayi {
  isim: string;
  meslek: string;
  rutbe: string;
  yas: number;
  huylar: [AileHuy, AileHuy];
  /** Dış görünüş cümlesinin indeksi (data/tanismaDiyalog.ts GORUNUM). */
  gorunum: number;
}

/**
 * Süren tanışma: 0. adımda göz göze gelinir (yanına git / vazgeç), sonra 3-4 adımlık
 * diyalog. State'te saklanır (sayfa yenilense / sunucu yeniden başlasa bile sürer).
 */
export interface AktifTanisma {
  mekan: string;
  aday: TanismaAdayi;
  /** 0 = göz göze (karar), 1..toplam = diyalog adımı. */
  adim: number;
  toplam: number;
  /** Başarılı geçilen adım sayısı. */
  basari: number;
  /** Şu anki adımda sunulan 3 yaklaşım (sırayla seçenek 0..2). */
  yaklasimlar: TanismaYaklasim[];
  /** Son adımın tepkisi (metin diyaloğa göre sunucuda çözülür): hangi yaklaşım + ton + varyant. */
  son_tepki: { yaklasim: TanismaYaklasim; ton: "olumlu" | "notr" | "soguk"; varyant: number } | null;
}

/** Tanışmadan çıkan sevgili: 4 yıllık sayaç içinde evlilik teklifi yapılmazsa darılır. */
export interface Sevgili {
  isim: string;
  meslek: string;
  rutbe: string;
  /** Doğum yılı (yaş = yil − dogum_yili). */
  dogum_yili: number;
  huylar: [AileHuy, AileHuy];
  /** Sevgili ilişki barı (0-100); evlenince düğünle yeniden belirlenir. */
  iliski: number;
  baslangic_yili: number;
  /** Bu yıla kadar teklif yapılmazsa darılır; "gönül al" süreyi uzatır. */
  son_yil: number;
  darildi: boolean;
  darilma_yili: number | null;
  /** "Gönül al" bu yıldan önce tekrarlanamaz. */
  gonul_kilit_yili: number;
  /** Evlenirse eşin getireceği meslek bonusu (aşkta mantık-gencinin yarısı). */
  meslek_bonusu: number;
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
  /** Geçici durumun kalan süresi (oyun YILI). */
  kalan_yil?: number;
  /** Her oyun yılı uygulanan etkiler (turdaki yıl sayısıyla çarpılır). */
  yil_basi_saglik?: number;
  yil_basi_para?: number;
  yil_basi_mutluluk?: number;
  gelir_carpani?: number;
  /** Bu durum (kalan_yil 0'a inince) sona erdiğinde karaktere eklenecek etiket; gecikmeli olay zincirleri için kullanılır. */
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
  /**
   * Mesleğe yatkınlık kademesi (2026-09 sonu) — meslek seçilirken (`mesleğiSec`)
   * BİR KEZ, o mesleğin kendi kategorisindeki (savas/ticaret/din/zanaat) toplam
   * `yatkinliklar` puanından hesaplanır ve bir daha ASLA değişmez (doğuştan
   * gelen bir yetenek damgası). 1=kötü, 2=nötr, 3=iyi, 4=mükemmel — bkz.
   * data/meslekYatkinlik.ts. Meslek henüz seçilmediyse null.
   */
  meslek_yatkinlik_seviyesi: 1 | 2 | 3 | 4 | null;
  /** Kademeden türeyen kanonik (TÜRKÇE) unvan — ör. "Kılıca Yatkın"; client `kt()` ile çevirir. Meslek seçilmediyse null. */
  meslek_yatkinlik_unvani: string | null;
  /** Kademeden türeyen kalıcı oransal bonus/malus (ör. -0.15 → olay şansı ×0.85); nötr kademede 0. */
  meslek_zar_bonusu: number;
  /** Kademeden türeyen kalıcı maaş oransal katkısı (maasCarpanKalemleri "kariyer" grubuna eklenir); nötr kademede 0. */
  meslek_maas_carpani: number;
  /** Kademeden türeyen kalıcı kariyer_puani kazanç hızı oransal katkısı; nötr kademede 0. */
  meslek_tecrube_hizi: number;
  /** Kişilik özelliklerinden gelen kalıcı gayrimenkul (mülk getiri oranı) bonusu/malusu (§41, ör. ±0.02). Nötr karakterlerde 0. */
  gayrimenkul_getiri_bonusu: number;
  /** En üst rütbeye (4+) ulaştıktan sonra açılan, üst sınırı olmayan ikinci bir ilerleme ekseni: şehir ekonomisini yönetmek için rakiplerle rekabet. 0 = henüz başlamadı. */
  sehir_yonetim_seviyesi: number;
  /** sehir_yonetim_seviyesi'nden türetilen unvan; seviye 0'ken null. */
  sehir_yonetim_unvan: string | null;
  cag: Cag;
  bolge: string;
  yerlesim: string;
  din_kultur: string;
  konut_id: string;
  /**
   * Taş Ev ve üstü bir kademede KESİNTİSİZ yaşamaya başladığın oyun yılı; o bandın
   * dışına çıkınca (daha ucuz bir konuta taşınınca) null'a sıfırlanır. Bandın
   * içinde yükselmek (Taş Ev→Konak gibi) sayacı bozmaz. "konut_sahibi" hayat
   * amacının (§18) süreklilik şartı bunu kullanır — null iken henüz nitelikli
   * bir kademede değilsin demektir.
   */
  konut_surekli_yasadigi_yil: number | null;
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
  /** Zanaatkâr'a özel derinlik metriği (0-100). Şimdilik maaşa/oyun içi hiçbir etkisi yok — meslekMetrikCarpani için placeholder (dengelemesi sonraya bırakıldı). */
  uretim_kapasitesi: number;
  /**
   * Oyuncunun müşteri sayısı (bkz. data/pazar.ts, game/piyasa.ts). Pazar payı =
   * meslek_musteri / pazar_musteri; maaşı ve rütbeyi etkiler. Kesirli olabilir
   * (ekranda yuvarlanır). Meslek seçilmeden 0.
   */
  meslek_musteri: number;

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
  /**
   * "Az olay var" turu Faz 8: hapse her yeni girişte 0'a sıfırlanır, çözülen her
   * hapisOlayi:true olayında +1 artar. `hapisKacisBaslangici:true` olayları bu
   * sayaç 2'ye ulaşana kadar havuzdan çıkarılır — önce en az 2 "hapishane hayatı"
   * olayı yaşansın, kaçış fikri ondan sonra gelsin.
   */
  hapis_tur_sayaci: number;
  /** Sahip olunan piyasa mülkleri (her türden en fazla bir tane). */
  mulkler: MulkTuru[];
  /**
   * Her sahip olunan mülk için, bir sonraki periyodik bakım/vergi masrafına kalan
   * yıl. Satın alınca 7-10 yıl arası başlar; her turda geçen yıl kadar azalır,
   * 0'a inince mülkün güncel değerinin ~%12'si masraf olarak çıkar ve sayaç
   * yenilenir (mülk SİLİNMEZ). Mülk elden çıkınca ilgili anahtar da silinir.
   */
  mulk_bakim_kalan: Partial<Record<MulkTuru, number>>;
  /**
   * Her sahip olunan mülk için satın alındığı oyun yılı — mülk olayı garantisinin
   * (satın alımdan 5-15 yıl içinde en az bir kez, §11 kural 14) referans noktası.
   * Mülk elden çıkınca ilgili anahtar silinir; eski kayıtlarda/legacy satın
   * almalarda bilinmiyorsa alan boş kalır ve eski fırsatçı (%12 şans) mekanik geçerli olur.
   */
  mulk_alis_yili: Partial<Record<MulkTuru, number>>;
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
  /** Bir rakip yenildiyse pazara yeni bir rakibin gireceği oyun yılı (yoksa null). Yenilen rakipler listede `yenildi:true` kalır. */
  rakip_yeni_yil: number | null;
  /**
   * Toplam pazar büyüklüğü (müşteri sayısı; işletme modeli, §45). Oyuncunun müşterisi
   * = pazar payı × pazar_musteri. Başlangıç 350–500 arası rastgele; dönemle büyür,
   * savaş/vebada küçülür (herkesin müşterisi aynı oranda). Eski kayıtlarda 400.
   */
  pazar_musteri: number;
  /** Piyasa haberleri (rakip hamleleri, küçük esnaf olayları, dönem etkileri) — son 6; oyuncuya gösterilir (§45 v8.1). */
  piyasa_gunlugu: PiyasaHaberi[];
  /** Süreli piyasa etkileri (rakibin hammadde hamlesi, kampanya): işletme maliyet/talep çarpanına biner. */
  piyasa_etkileri: PiyasaEtkisi[];
  /** Son rakip hamlesinin yılı (2 yıl cooldown). */
  rakip_hamle_son_yil: number | null;
  /** Yıl sonu müşteri dağılımı fotoğrafı (bir sonraki yılda değişimi göstermek için) ve son yıl değişimi. */
  musteri_ref: { oyuncu: number; rakip: number; kucuk: number } | null;
  son_musteri_degisim: { oyuncu: number; rakip: number; kucuk: number } | null;
  /** Bir sonraki rakip saldırısının yılı (her saldırıdan sonra bugünden 4–9 yıl sonrasına konur; zar yok). null = henüz planlanmadı. */
  rakip_sonraki_saldiri_yili: number | null;
  /** Son rakip saldırısının yılı (bilgi). */
  rakip_saldiri_son_yil: number | null;
  /** Vergi çarpanı (1 = normal; <1 indirim, >1 zam) ve bitiş yılı (§45 vergi). */
  vergi_carpan: number;
  vergi_carpan_bitis_yili: number | null;

  es_adi: string | null;
  es_puani: number;
  es_meslek: string | null;
  es_rutbe: string | null;
  cocuk_sayisi: number;
  cocuklar: Cocuk[];
  /** Son çocuğun doğduğu oyun yılı — eşle ilişkiye bağlı doğum denemesinin cooldown'u (§33). */
  son_dogum_yili?: number;

  // ---- Eş modeli (Aile/Evlilik yeniden tasarımı, bkz. data/aileSabitleri.ts, game/aileSistemi.ts) ----
  // İlişki barı `es_puani`nın kendisidir (0-100); aşağıdakiler eşin kimliği ve sayaçlarıdır.
  /** Eşin doğum yılı (yaş = yil − es_dogum_yili); eş yoksa null. */
  es_dogum_yili: number | null;
  /** Evlilik yolu; eş yoksa null. */
  es_evlilik_turu: EvlilikTuru | null;
  /** Evlenilen eşin grubu (doğum şansı ve çeyiz/bonus için); eş yoksa null. */
  es_grup: "genc" | "olgun" | null;
  /** Eşin iki gizli huyu; eş yoksa []. */
  es_huylar: AileHuy[];
  /** Eşin getirdiği kalıcı "meslek bonusu" (maaş yüzdesi); eş gidince 0. Meslek sistemi değişince yeniden bağlanacak placeholder. */
  es_meslek_bonusu: number;
  /** Düğünle kazanılan şöhret (negatif de olabilir); eş terk ederse geri alınır. */
  es_dugun_un: number;
  /** Eşle son "zaman geçir" eyleminin yılı (ihmal sayacı bundan hesaplanır); eş yoksa null. */
  es_son_zaman_yili: number | null;
  /** İlişki barı 20'nin altında geçen toplam yıl; bar toparlanınca 0'lanır. */
  es_dusuk_yil: number;
  /** Bar <20 iken kaç yılda eş terk eder (2 ya da 3, evlilikte bir kez rastgele seçilir). */
  es_terk_esigi: number;
  /** Bu eşin doğurduğu çocuk sayısı (tavan 5). */
  es_dogum_sayisi: number;
  /** Eşin yeniden hamile kalabileceği en erken oyun yılı. */
  es_sonraki_hamilelik_yili: number;
  /** 7-8 yıllık ihmal uyarı olayı bu evlilikte gösterildi mi. */
  es_ihmal_uyari_goruldu: boolean;
  /** Bir olay turundan sonra tek bir sakin yıl ("Yıl Geç") bekleniyor; hapis/yolculuk/kaçak/veba hastalığında hiç kurulmaz. */
  sakin_yil_bekliyor: boolean;
  /** Mantık evliliği aday listesi (3 kişi); boşsa ilk açılışta üretilir. */
  mantik_adaylar: MantikAday[];
  /** Aday listesinin yenileneceği oyun yılı. */
  mantik_yenileme_yili: number;
  /** Reddedilen teklif sonrası mantık sisteminin kilitli olduğu son yıl (bu yıl dahil değil: yil >= değer açar). */
  mantik_kilit_yili: number;
  /** Teklifi kabul edilmiş, düğün bütçesi bekleyen eş adayı; yoksa null. */
  bekleyen_dugun: BekleyenDugun | null;
  /** Aşk evliliği yolu: süren tanışma diyaloğu; yoksa null. */
  aktif_tanisma: AktifTanisma | null;
  /** Aşk evliliği yolu: sevgili; yoksa null. */
  sevgili: Sevgili | null;
  /** Eş ölümü/terk sonrası yas döneminin bittiği yıl; bu yıldan önce evlilik teklifi/tanışma kapalı. 0 = yas yok. */
  yas_bitis_yili: number;

  ekip: EkipUyesi[];
  hizip: string | null;

  amir_adi: string | null;
  amir_rutbe: string | null;
  /** Rütbe yükseldikçe (seviye 2'de 1, seviye 3'te 2 kişi) emrine giren astlar; rütbe ladder'ının kendinden düşük basamaklarını taşırlar. */
  astlar: Ast[];

  /** Doğuştan gelen, hayat boyu sabit kalan ebeveyn isimleri (bölgeye uygun, dost/rakipten farklı). */
  anne_adi: string;
  baba_adi: string;

  /** İlk yaşayan evcil hayvan (eski tek-hayvan alanı; evcilHayvanSenkronla `evcil_hayvanlar[0]`'dan türetir). Gider, hayat amacı, başarım ve gösterim bu alanı okur. */
  evcil_hayvan: EvcilHayvan | null;
  /** Yaşayan tüm evcil hayvanlar (aynı anda en fazla 2). Pasif bonuslar hepsinden toplanır. */
  evcil_hayvanlar: EvcilHayvan[];
  /** Bir hayatta yaşanan evcil hayvan karşılaşması sayısı (kabul ya da ret fark etmez; tavan 2). */
  hayvan_karsilasma_sayisi: number;
  /** Karşılaşması yaşanan hayvan türleri; aynı tür bir daha çıkmaz (hayvan ölse bile). */
  hayvan_karsilasma_turleri: string[];
  /** Kazanılan lakaplar/ünvanlar (ör. "İpek Kralı", "Cesur Yürek"); kalıcı, birikimli. */
  unvanlar: string[];
  /** ESKİ tekil amaç — artık atanmıyor (yeni karakterde null). Geriye dönük uyum için duruyor. */
  hayat_amaci: HayatAmaci | null;
  /** Meslek seçilince atanan 3 kişisel amaç (2 normal + 1 zor). Skoru `amacSkorCarpani` ile çarpar. */
  hayat_amaclari: AmacIlerleme[];
  /** Suç seviyesinin ömür boyu ulaştığı en yüksek değer (amaç koşulları için — "hiç aranmadan yaşa"). */
  omur_zirve_suc: number;
  /** Aranmayı artıran en son olayın oyun yılı — pasif düşüş "4 yıl temiz kalırsan" şartı bunu kullanır (stateManager.sucArtisiKaydet). */
  son_suc_yili: number;
  /** Aranma II: başarılı (gizli kalan) suçların ifşa kuyruğu — yalnız ifşa olacaklar yazılır; `yil` gelince açılır pencere + aranma/ahlak artışı. */
  ifsa_kuyrugu: IfsaKaydi[];
  /** Polis uyarısının planlanan yılı (60 aşılınca 2-3 yıl sonrası); yoksa null. */
  polis_uyari_yili: number | null;
  /** Son polis uyarısının yılı — 10 yıllık cooldown referansı. */
  son_polis_uyari_yili: number | null;
  /** Önceki kontrolde aranma >60 muydu (yukarı geçişi yakalamak için). */
  aranma_esik60_ustu: boolean;
  /** 3★ baskının planlanan yılı (75 aşılınca 4-5 yıl sonrası); yoksa null. */
  baskin_yili: number | null;
  /** Önceki kontrolde aranma >=75 miydi. */
  aranma_esik75_ustu: boolean;
  /** Oyuncuya açılır pencereyle gösterilecek aranma bildirimleri (ifşa / polis uyarısı / baskın), en eski önce. */
  aranma_bildirimleri: AranmaBildirimi[];
  /** Zar/üç kâğıt/bilek güreşinden ömür boyu net kâr/zarar toplamı (kumar amaçları için). */
  omur_kumar_net: number;
  /** Ömür boyu verilen sadaka sayısı (sosyalleşme "sadaka" aksiyonu + bağış olayları). */
  omur_sadaka_sayisi: number;
  /** Ömür boyu eşe/çocuğa/ekibe/dosta verilen hediye sayısı (envanter hediye + aile hediye etkileşimi). */
  omur_hediye_sayisi: number;
  /** Başarısızlığında ölüm/`olum_sansi` ≥ 25 olan bir seçimi başarıyla atlatma sayısı ("korkusuz"/"ölümle dans" amaçları). */
  omur_riskli_basari: number;
  /** komikOlumler.ts'in riskli ("aptalca olanı yap") şıkkını seçip HAYATTA KALDIYSA true (bir kereliğine, skor bonusu — bkz. hesaplaSkorKirilimi). */
  komik_olum_basarili_risk: boolean;
  /** komikOlumler.ts'in riskli şıkkını seçip bu yüzden ÖLDÜYSE true (bir kereliğine, skor bonusu). */
  komik_olum_ile_oldu: boolean;
  /** Ölüm nadir/komik bir şekilde gerçekleştiyse (ör. "Kendi Kazdığı Kuyuya Düşen") burada saklanır; liderlik tablosunda rozet olarak gösterilir. */
  efsanevi_olum: string | null;
  /**
   * Kutsal Emanet relik'i (KORUYUCU_MUSKA_ETIKETI) bu hayatta EN AZ bir kez ölümü
   * iptal ettiyse true — kalıcı, ömür boyu geçerli (checkDeath'te bir kez set edilir,
   * bir daha değişmez). "Yedi Canlı" başarımı eskiden bunu `hayat_hikayesi`'nde
   * (en fazla 10 kayıtla sınırlı, FIFO) regex ile arıyordu — relik erken tetiklenip
   * karakter 10+ olay daha yaşarsa kayıt sessizce düşüyor, başarım kaçırılıyordu.
   */
  relik_can_kurtardi: boolean;

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
  /** Bizzat kaptığı vebayı (veba_hastasi) atlatıp iyileştiyse true (bir kereliğine, skor bonusu — bkz. hesaplaSkorKirilimi). */
  veba_hayatta_kaldi: boolean;
  /** Hapisten FİZİKSEL bir kaçışla (tünel/duvar/çamaşır arabası/gardiyan bayıltma vb. — rüşvet/af DEĞİL) çıktıysa true (bir kereliğine, skor bonusu). */
  hapis_basarili_kacis: boolean;
  /** Bir yıl sonra başlayacak savaş/veba (dedikodu sinyali için); yoksa null. */
  dunya_yaklasan: DunyaYaklasan | null;
  /** Ülkedeki savaş/veba/kriz başlangıç ve bitişlerinin kalıcı kaydı (en fazla 30, eskiden yeniye) — "Yıl" penceresindeki ülke geçmişini besler. */
  ulke_gecmisi: UlkeGecmisiKaydi[];
  /** Ömürde bir kez: borçtayken (para < 0, bütçe açığı sürerken) kilise/eş dost bir kereliğine borcun bir kısmını kapatır. true olunca bir daha tetiklenmez. */
  borc_yardimi_alindi: boolean;
  /** Kalıcı salgından korunma yatırımı; yoksa null. Bir sonraki veba dalgasında tüketilir. */
  salgin_korunma_yatirimi: SalginKorunmaYatirimi | null;
  /** Aktif tefeci kredisi; yoksa null. Aynı anda en fazla bir kredi. */
  kredi: Kredi | null;
  /** Tefecinin şu an sunduğu 2 teklifin havuz id'leri ve seçildikleri yıl (3 yılda bir ya da kredi alınınca yenilenir). */
  kredi_teklifleri: { idler: string[]; yil: number } | null;

  /** Aile ekranı etkileşim cooldown'ları: anahtar (ör. "es:hediye", "cocuk:2:oyna") → tekrar açılacağı oyun yılı. */
  aile_etkilesim_kilit: Record<string, number>;
  /** Ajanlara verilmiş, bir sonraki yıl ilerlemesinde çözülecek karanlık işler (§43 Faz 2). */
  ajan_gorevleri: AjanGorevi[];
  /** Meslek işletmesi (Tüccar); diğer mesleklerde null. */
  isletme: IsletmeDurumu | null;
  /** Karanlık işlerin bekleme süreleri: iş id'si → yeniden çevrilebileceği oyun yılı (§43 Faz 1). */
  kotu_is_kilit: Record<string, number>;
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

  /** Bekleyen "gecikmiş takip" geri dönüşleri (§36-benzeri) — bkz. GecikmisTakip. Boş dizi = bekleyen yok. */
  gecikmis_takipler: GecikmisTakip[];

  tur_sayisi: number;
  gecmis_olaylar: string[];
  /** Bu hayatı oluşturan cihazın (istemci_id) ÖNCEKİ hayatlarında görülen olay id'leri — yaratılışta bir kerelik doldurulur, hayat boyunca değişmez. Yalnız `olaySec`'teki tekrar-önleme penceresini (§12) genişletmek için kullanılır; "ömürde bir kez" milestone kontrolleri (§11) hâlâ yalnız `gecmis_olaylar`'a bakar, bundan etkilenmez. */
  istemci_gecmis_olaylar: string[];
  /** Bu hayatı yaratan tarayıcının rastgele istemci kimliği (varsa) — ölümde bu hayatın `gecmis_olaylar`'ını istemci geçmişine yazmak için kullanılır. Yoksa null. */
  istemci_id: string | null;
  /** Son seçimlerin göstergelere etkisi (yeni → eski değil, kronolojik; en fazla 40). Gösterge detay penceresindeki "Son seçimlerin etkisi" bölümünü besler. */
  etken_gunlugu: EtkenKaydi[];
  /**
   * Sunucu belleğinde tutulan oyun akışının (cevaplanmamış olay, zorunlu_sonraki
   * zinciri, bekleyen onTepki, Sosyalleş'e giderken kenara ayrılan ana olay) kalıcı
   * kopyası. Sunucu yeniden başlarsa (Render uykusu / deploy) bu olmadan oyuncu
   * ekrandaki olayda "Önce bir senaryo üretilmeli" hatasıyla kilitli kalıyor,
   * yolculuk/hapis zincirleri kopuyordu. Yalnız sunucu okur/yazar; istemci kullanmaz.
   * Eski kayıtlarda yok (undefined) — o durumda akış boş başlar.
   */
  oturum_akisi?: OturumAkisiKaydi | null;
  gecmis: GecmisNoktasi[];
  hayat_hikayesi: HayatOlayi[];
  aktif: boolean;
  olum_nedeni: string | null;
  /** Ölüm nedeninin iki dildeki hâli — liderlik tablosu oyuncunun o anki dilinden bağımsız
   * olarak her iki dilde gösterebilsin diye (olum_nedeni oyuncunun dilindeki kopyadır). */
  olum_nedeni_ceviri?: IkiDilMetin | null;
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
  /** Edinildiği oyun yılı ve karakter yaşı. */
  edinim_yili: number;
  edinim_yasi: number;
  /** Bu hayvanın ömrü (yıl): türün ortalaması ±2 yıl rastgelelik. `edinim_yili + omur`'da doğal sebeplerle ölür. */
  omur: number;
  /** Edinirken rastgele atanan kalıcı pasif bonus (data/evcilHayvanlar.ts HAYVAN_BONUSLARI id'si). */
  bonus_id: string;
}

export interface Cocuk {
  isim: string;
  dogum_yili: number;
  yasiyor: boolean;
  /** Çocukla ilişki puanı (0-100); yeni doğan çocuk 65 ile başlar. Aile ekranındaki etkileşimlerle artar, ilgilenilmezse yılda ~0.6 düşer. Eski kayıtlarda eskiKayitGocu 60 backfill eder. */
  iliski: number;
  /** Baba mesleğine yatkınlık (Aşama 3: 15 yaşında işe alım): %70 yatkın / %20 uyumsuz / %10 nötr. Doğumda belirlenir. */
  yatkinlik?: "yatkin" | "notr" | "uyumsuz";
  /** Doğum komplikasyonunda bebek bu oyun yılında ölecek (ilk 3 yıl içinde); yoksa tanımsız. */
  erken_olum_yili?: number;
  /**
   * 15 yaşında yanında çalışma daveti: "bekliyor" (davet bekleniyor) → kabul "ise_alindi" ya da
   * red "red_tepkisi" (oyuncu öfke/sakin seçer) → "reddetti". Eski kayıtlarda tanımsız.
   */
  is_durumu?: "bekliyor" | "red_tepkisi" | "ise_alindi" | "reddetti";
  /** İşe alındıysa ekip üyesinin id'si. */
  ekip_id?: string;
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
  /** Rakibin müşteri sayısı (yenilmişse 0). Pay = musteri / pazar_musteri. */
  musteri: number;
  husumet: number;
  yenildi: boolean;
  /** Başlangıç payı (P'nin kesri): hamle ortalamaya dönüşünün referansı. */
  hedef_pay?: number;
  /** Bu rakibin son hamlesinin yılı (2 yıl cooldown). */
  hamle_son_yil?: number | null;
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
  /** Vade (yıl); eşit yıllık taksit bu sürede bitecek şekilde hesaplanır. */
  vadeYil: number;
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
/** Bir ajana verilmiş, henüz çözülmemiş karanlık iş (§43 Faz 2). */
export interface AjanGorevi {
  ajanId: string;
  isId: string;
  hedefRakipAd: string | null;
  verilisYili: number;
}

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
  /** Bu üye oyuncunun çocuğuysa çocuğun adı (cocuklar[].isim ile eşleşir). */
  cocuk_isim?: string;
  /** İşletme rolü türü (aday havuzundan alınanlarda): ana = satış/üretim, maliyet = alış/hammadde, musteri = pazar payı büyümesi, guvenlik = koruma. */
  rol_turu?: IsletmeRolTuru;
  /**
   * Giriş (işe alım) yeteneği/sadakati: maaş buna göre sabittir (yalnız enflasyonla artar, §45).
   * `gercekKalite` (güncel yetenek) ve `sadakat` (güncel sadakat) çalıştıkça artar.
   */
  y_giris?: number;
  s_giris?: number;
  /** Giriş seviyesine göre enflasyonsuz yıllık maaş tabanı; güncel `maas` = maas_taban × enflasyon (yıllık güncellenir). */
  maas_taban?: number;
  /** Son bilgi sızdırma / iç hırsızlık olayı yılları (3 yıl cooldown). */
  sizdirma_son_yil?: number;
  ic_hirsizlik_son_yil?: number;
}

/** İşletme motorunda çalışanın rolü (meslek×çağ'a göre ad değişir, etkisi aynı). */
export type IsletmeRolTuru = "ana" | "maliyet" | "musteri" | "guvenlik";

/** Aday tipi: Yetenek/Sadakat aralığını ve maaş bandını belirler (data/meslekProfilleri.ts ADAY_TIP_ARALIKLARI). */
export type IsletmeAdayTipi = "serseri" | "sadik_cirak" | "siradan" | "usta_guvenilmez" | "usta_sadik";

/** Hat fiyat politikası: piyasa fiyatının %20/%10 altı/üstü (5 aralık). */
export type IsletmeFiyat = "eksi20" | "eksi10" | "normal" | "arti10" | "arti20";

/** Stok hedefi (işletme geneli): beklenen talebe göre ne kadar stok tutulacağı. */
export type IsletmeStokHedefi = "cokaz" | "az" | "normal" | "fazla" | "dolu";

/** İşletmedeki bir ürün hattı (Tüccar: sektör, Zanaatkâr: hedef pazar…). */
export interface IsletmeHat {
  id: string;
  acik: boolean;
  stok: number;
  /** ESKİ alanlar (sipariş sistemi kaldırıldı, motor yok sayar; eski kayıt uyumu için tipte kalır). */
  otomatik: boolean;
  siparis: number;
  fiyat: IsletmeFiyat;
  /** Geçen yılki talep / satış (otomatik sipariş + ekran gösterimi). */
  son_talep: number;
  son_satis: number;
}

/** Piyasada olup biten bir şey (oyuncuya haber olarak gösterilir). Metin sunucudan iki dilli gelir. */
export interface PiyasaHaberi {
  yil: number;
  simge: string;
  /** OYUNCU için yönü: müşterilerine artı / eksi / belirgin etkisi yok. */
  yon: "olumlu" | "olumsuz" | "notr";
  grup: "rakip" | "kucuk" | "dunya";
  kod: string;
  metin: { tr: string; en: string };
  /** Oyuncunun müşteri sayısındaki işaretli (yuvarlanmış) değişim. */
  musteri: number;
}

/** Süreli piyasa etkisi: alış maliyeti ya da talep çarpanı (1 + deger). */
export interface PiyasaEtkisi {
  tur: "alis_maliyeti" | "talep";
  deger: number;
  bitis: number;
}

/** Yıl sonu dökümündeki uyarı: kod + isteğe bağlı hat/isim; metin istemcide çevrilir. */
export interface IsletmeUyari {
  kod:
    | "stok_bitti"
    | "fazla_stok"
    | "calisan_ayrildi"
    | "kitle_kaybi"
    | "uretim_tavani"
    | "hirsizlik"
    | "sizdirma"
    | "ic_hirsizlik"
    | "rakip_saldiri"
    | "vergi_indirimi_bitti"
    | "imtiyaz_bitti";
  hat?: string;
  isim?: string;
  /** hırsızlık sonucu / rakip saldırı türü (istemci metni bunlardan kurar). */
  sonuc?: "agir" | "rahat" | "kismi" | "engellendi" | "sans" | "musteri_calma" | "iftira" | "sabotaj" | "baskin" | "nakit";
  /** Rakip saldırısı: saldıran rakibin adı, güvenlik engelledi mi, içerden sızma var mı, kaybedilen müşteri (ondalık), şöhret ve stok kaybı. */
  rakip?: string;
  engellendi?: boolean;
  sizma?: boolean;
  musteriKaybi?: number;
  sohretKaybi?: number;
  /** Çalınan/azalan ürün oranı (%) ve nakit hasarı (%, geçen yıl brüt kârına göre); tutar olarak da `tutar`. */
  urunYuzde?: number;
  nakitYuzde?: number;
  tutar?: number;
}

export interface IsletmeDokum {
  yil: number;
  satis: number;
  alim: number;
  depoMasrafi: number;
  /** Lonca aidatı: satışın %3'ü (v8.2). */
  loncaAidati: number;
  /** satış − alım − depo masrafı (çalışan maaşı ayrıca giderlerde). */
  brutKar: number;
  borcOdeme: number;
  /** brutKar − borcOdeme − vergi − (hırsızlık nakit hasarı) (oyuncunun cebine giren, eksi olabilir). */
  net: number;
  /** Yıllık vergi tutarı ve o yılki oran (0-1). */
  vergi: number;
  vergiOrani: number;
  /** Yıl sonu pazar payı (0-100 yüzde), müşteri sayısı ve bu yılki değişimi, toplam pazar büyüklüğü. */
  pazarPayi: number;
  musteri: number;
  musteriDegisim: number;
  pazarMusteri: number;
  hatlar: { id: string; talep: number; satilan: number; alinan: number; stokSonu: number }[];
  /** Üretim modundaki mesleklerde (Zanaatkâr) o yılın üretim tavanı ve kullanılan miktar. */
  uretim?: { tavan: number; kullanilan: number };
  uyarilar: IsletmeUyari[];
}

export interface IsletmeAday {
  id: string;
  isim: string;
  rol: string;
  rolTuru: IsletmeRolTuru;
  tip: IsletmeAdayTipi;
  gecmis: { tr: string; en: string };
  /** Kesin Yetenek (20–90) ve Sadakat (10–80); oyuncuya olduğu gibi gösterilir. */
  yetenek: number;
  sadakat: number;
  /** Enflasyonsuz yıllık maaş tabanı (giriş seviyesine göre sabit) — güncel maaş = maas_taban × enflasyon. */
  maas_taban: number;
}

/** Meslek işletmesi (şu an yalnız Tüccar; 2026-10 dikey dilim). Diğer meslekler null → eski maaş sistemi. */
export interface IsletmeDurumu {
  hatlar: IsletmeHat[];
  /** Kalıcı yatırım kademeleri (id → 0-3). */
  yatirimlar: Record<string, number>;
  /** Tedarikçiye veresiye borç (faizsiz); kârdan %60'a kadar yıllık kapanır. */
  tedarikci_borcu: number;
  son_dokum: IsletmeDokum | null;
  adaylar: IsletmeAday[];
  /** Aday listesinin son yenilendiği yıl (3 yılda bir yenilenir). */
  aday_yili: number;
  /** Gümrük rüşveti etkisi: bu oyun yılına kadar alış maliyeti %15 düşük (§45). */
  gumruk_indirim_bitis?: number;
  /** Stok hedefi (varsayılan "normal"); sipariş sayısı kalktı. */
  stok_hedefi?: IsletmeStokHedefi;
  /** Son dış hırsızlık girişiminin yılı (3 yıl cooldown). */
  hirsizlik_son_yil?: number | null;
  /** Otoriteden alınan süreli imtiyazlar: imtiyaz id → bitiş yılı (pazar_imtiyazi, gumruk_muafiyeti, tekel_ruhsati, hammadde_tahsisi, atolye_ruhsati). */
  imtiyazlar?: Record<string, number>;
  /** Tekel ruhsatı verilen hat (ruhsat süresince satış fiyatı +%10). */
  tekel_hat?: string | null;
}

/** Dünya dönemi "sıcak ürün" bilgisi (deterministik) — kart etiketi için. */
export interface IsletmeSicakUrun {
  hatId: string;
}

/** Yasa dışı eylem büyüklük sınıfı (aranma artışı aralıkları: gameEngine.SUC_SINIFI_ARALIKLARI). "agir" = suçüstü yakalanma. */
export type SucSinifi = "kucuk" | "orta" | "buyuk" | "agir";

/** İfşa kuyruğu kaydı: `yil`'da, `sinif` büyüklüğündeki suç açığa çıkar. */
export interface IfsaKaydi {
  yil: number;
  sinif: SucSinifi;
  baslik: string;
}

/** Aranma bildirimi (açılır pencere). Polis uyarısı yanıtlanana dek kalır. */
export interface AranmaBildirimi {
  id: string;
  tur: "ifsa" | "polis_uyari" | "baskin";
  yil: number;
  /** ifsa: açığa çıkan olayın başlığı. */
  baslik?: string;
  /** ifsa: aranma/ahlak değişimi. */
  aranmaArtis?: number;
  ahlakDusus?: number;
  /** polis_uyari: indirimsiz tam / yarım kefaret tutarı. */
  tutar?: number;
  yarimTutar?: number;
  /** baskin: kaçıp kaçmadığı, hapse girdiyse ceza (yıl). */
  kacti?: boolean;
  ceza?: number;
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
  /** true ise eşe vakit ayrıldı sayılır: ihmal sayacı (es_son_zaman_yili) bu yıla çekilir. */
  es_ilgi_gosterildi?: boolean;
  /** true ise bekar karakter için bir tanışma (göz göze gelme) başlar (`aktif_tanisma`). */
  tanisma_baslat?: boolean;
  /** true ise (göz göze fırsatından vazgeçildi): evliyse sadakat ödülü verilir. */
  tanisma_vazgec?: boolean;
  /** true ise eş kaybedilir (boşanma/ölüm): es_adi null'a döner, medeni:evli etiketi kaldırılır. */
  es_kaybet?: boolean;
  cocuk_ekle?: number;
  /** true ise yaşayan çocuklardan rastgele biri kaybedilir. */
  cocuk_kaybet?: boolean;
  /** Yaşayan TÜM çocukların ilişki puanına uygulanan delta (± olabilir); §33. */
  cocuk_iliski?: number;
  /** Belirtilirse bir sonraki olay havuzdan rastgele seçilmez, doğrudan bu id ile gelir. */
  zorunlu_sonraki?: string;
  /**
   * Belirtilirse `zorunlu_sonraki`'nin YERİNE geçer: bir sonraki olay bu id
   * listesinden rastgele seçilir (mümkünse `gecmis_olaylar`'da hiç görülmemiş
   * olan tercih edilir) — sabit, tek-id'li zincirlerin ("her seferinde aynı
   * yolculuk") aksine her oynanışta farklı bir dal izlenmesini sağlar (§17,
   * "az olay var" turu Yol A). İki alan birlikte varsa bu öncelikli.
   */
  zorunlu_sonraki_havuzu?: string[];
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
  /** Zanaatkâr'a özel: uretim_kapasitesi'ni artırır (0-100 aralığında kelepçelenir). Şimdilik oyun içi başka hiçbir etkisi yok. */
  uretim_kapasitesi_artis?: number;
  /** TEK suç/aranma eksenini (suc_seviyesi, 0-100 aralığında kelepçelenir) değiştirir; ± olabilir (rüşvet/kefaret şıkları negatif verir). Kumar/karaborsa ve suç-kazancı motor kuralı da bunu kullanır. */
  suc_artis?: number;
  /** Yasa dışı eylemin büyüklük sınıfı: motor bu sınıfın aralığından (kucuk 4-8 · orta 10-16 · buyuk 20-26 · agir 24-30) bir değer seçip `suc_artis`'e ekler; para > 0 ise ×1.6 uygular. Başarılı dala sınıf, başarısız dala (suçüstü) bir üst sınıf yazılır. Suç olmayan şıklarda ALAN YOKTUR. */
  suc_sinifi?: SucSinifi;
  /** suc_seviyesi'ni mevcut değerden bağımsız, doğrudan belirtilen değere (0-100) sabitler — ör. büyük baskın sonrası "temize çıkar / kademe 1'e in" gibi kesin hedefler için; genel yükseliş/düşüş için bunun yerine suc_artis kullanılmalı. */
  suc_seviyesi_ayarla?: number;
  /** SADECE motor yazar (uygulananEtki'de): bu seçimin aranma (suc_seviyesi) üzerindeki GERÇEK net değişimi — suc_artis, suç-kazancı motor kuralı ve suc_seviyesi_ayarla, 0-100 kelepçesi sonrası. Sonuç ekranı çipi bunu gösterir. */
  suc_degisim?: number;
  /** Hapiste kalan ceza süresini (state.hapis_ceza_kalan) yıl olarak uzatır — riskli kaçış girişimi başarısız olunca kullanılır. Yalnız "hapiste" etiketi varken anlamlıdır. */
  hapis_ceza_artis?: number;
  /** true ise, bu sonuç hapishaneden FİZİKSEL bir kaçışla (tünel/duvar/çamaşır arabası/gardiyan bayıltma vb.) çıkışı temsil eder — rüşvet/af ile parayla çıkış SAYILMAZ. Bir ömürde ilk kez gerçekleştiğinde skor formülüne tek seferlik bir bonus ekler (bkz. hesaplaSkorKirilimi). */
  hapis_basarili_kacis?: true;
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
  /** Belirtilen türde bir evcil hayvan edinilir (aynı anda en fazla 2 hayvan; aynı türden zaten yaşayan varsa yok sayılır). */
  evcil_hayvan_edin?: { tur?: string };
  /** true ise evcil hayvan kaybedilir (olayın `hayvanTuru`'ndaki hayvan; belirtilmemişse en son edinilen). */
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
  /**
   * Belirtilirse, bu seçimin bir "gecikmiş takip" (§36-benzeri yeni sistem)
   * geri dönüşünü olacağını zamanla — 15-20 yıl sonra (gecikmisTakip.ts,
   * `GECIKMIS_TAKIP_YIL_MIN/MAX`) bu id'deki olay zorlanan olay olarak
   * karşına çıkar. Değer, o an için ilgili "olumlu"/"olumsuz" sonuç olayının
   * id'sidir; hangi dal (başarılı/başarısız) hangi id'yi taşıdığı olayın
   * kendi tanımında belirlenir. Hedef olay `gecikmisSonucOlayi:true` taşımalı
   * (normal rastgele havuzdan dışlanır, olaySecici.ts uygunMu).
   */
  gecikmis_takip?: string;
  /**
   * Vergi oranı çarpanını `sureYil` yıl boyunca değiştirir (<1 indirim, >1 zam; §45 vergi).
   * Yalnız işletmesi olan mesleklerde (Tüccar/Zanaatkâr) vergi kesildiği için başka mesleklerde sessizce yok sayılır.
   */
  vergi_degisim?: { carpan: number; sureYil: number };
  /** Şehir yöneticisi (otorite) ilişkisine (state.yonetim_iliski) delta; ± olabilir, 0-100 clamp. */
  otorite_iliski?: number;
  /** Pazar payını (yüzde PUANI olarak, ör. +1 = %1 puan) değiştirir; yalnız işletmesi olan mesleklerde. Küçük değerler kullan (±0.5…±3). */
  pazar_payi_artis?: number;
}

/**
 * Bir seçimin 15-20 yıl sonraki geri dönüşünü bekleyen kayıt (bkz.
 * SonucEtkisi.gecikmis_takip). `senaryoUret`, `tetiklenmeYili`ye ulaşılmış en
 * eski kaydı zorlanan olay olarak kuyruğa alır ve listeden çıkarır.
 */
export interface GecikmisTakip {
  id: string;
  /** Zorlanacak olayın id'si (gecikmisSonucOlayi:true taşıyan bir OlayTanimi). */
  olayId: string;
  /** Bu yıla (veya sonrasına) ulaşılınca tetiklenir. */
  tetiklenmeYili: number;
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
  /** Bkz. OlaySecenegi.hafifSecenek — istemci bu şıkkı küçük/ikincil bir bağlantı olarak gösterir. */
  hafif?: boolean;
  /**
   * Bu şıkkın olay tanımındaki (OlayTanimi.secenekler) ASIL sırası. Kişilik/eksen
   * filtresi aradaki bir şıkkı gizlediğinde senaryo sırası ile ham sıra kayar;
   * sunucu onTepki/ölüm-riski gibi ham alanları bu index'le bulur.
   */
  ham_index?: number;
}

/** Bkz. CharacterState.oturum_akisi. */
export interface OturumAkisiKaydi {
  olayId: string | null;
  senaryo: SenaryoResponse | null;
  zorlananOlayId: string | null;
  sonTon: "agir" | "hafif" | null;
  /** Bekleyen onTepki: hangi ham seçenekten geldiği + o anki rütbe (terfi kutlaması için). */
  tepki: { hamIndex: number; eskiRutbeSeviye: number } | null;
  sakli: { olayId: string; senaryo: SenaryoResponse } | null;
}

export interface SenaryoResponse {
  olay_basligi: string;
  olay_metni: string;
  kategori: Kategori;
  gorsel: string;
  /** Özel havuz illüstrasyonu anahtarı (ör. "hapis", "yolculuk-hac"); yoksa kategori resmi kullanılır. */
  resim?: string;
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

/** Aynı metnin Türkçe ve İngilizce hâli (ör. ölüm nedeni). */
export interface IkiDilMetin {
  tr: string;
  en: string;
}

/** Bkz. CharacterState.etken_gunlugu. `kaynak` = etkiyi veren olayın o anki dildeki başlığı. */
export interface EtkenKaydi {
  yil: number;
  kaynak: string;
  stat: "saglik" | "para" | "mutluluk" | "ahlak" | "aranma" | "sohret";
  delta: number;
}

/** GET /:id/aranma yanıtı — Aranma ekranı verisi (client/types.ts aynası). */
export interface AranmaDurumu {
  puan: number;
  yildiz: number;
  debuffOrani: number;
  basariBonusu: number;
  tamTutar: number;
  yarimTutar: number;
  yarimMumkun: boolean;
  teslimCezasi: number | null;
  para: number;
  paraBirimi: string;
  hapiste: boolean;
  bekleyenBaskin: boolean;
  debuffEtiketi: string;
}
