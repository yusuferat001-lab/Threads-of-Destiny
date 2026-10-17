import { Cag, Kategori, MulkTuru, SonucEtkisi, UlkeDurumu } from "../../types";

/**
 * Bir seçeneğin hemen dice atmak yerine önce bir "tepki" gösterip oyuncuya
 * geri adım atma şansı verdiği ara-adım. Bu seçilince zaman ilerlemez, para/can
 * hiçbir şey değişmez — sadece metin gösterilir. Oyuncu ardından geriCekil ya da
 * devam seçeneğini seçtiğinde asıl sonuç (ve zaman ilerlemesi) o zaman uygulanır.
 */
export interface OnTepki {
  metin: string;
  geriCekilMetni: string;
  geriCekilSonucu: SonucEtkisi;
  devamMetni: string;
  devamSonucu: SonucEtkisi;
}

export interface OlaySecenegi {
  metin: string;
  baseBasariSansi: number;
  basariliSonuc: SonucEtkisi;
  basarisizSonuc: SonucEtkisi;
  /** Seçeneğin ön koşulu olan nakit; yoksa seçenek kilitlenir. */
  maliyet?: number;
  minUn?: number;
  minAhlak?: number;
  maxAhlak?: number;
  gerekliEtiketler?: string[];
  /** Bu etiketlerden herhangi biri karakterde varsa seçenek kilitlenir (ör. fiziksel sakatlık, fobi). */
  yasakliEtiketler?: string[];
  kilitAciklamasi?: string;
  /** Belirtilirse bu seçenek sadece bu kişilik özelliğine sahip karakterlere gösterilir. */
  gerekliKisilik?: string;
  /** Belirtilirse bu seçenek sadece kişilik ekseninde belirli bir aralıkta olan karakterlere gösterilir. */
  gerekliEksen?: { eksen: "fevrilik" | "merhamet"; min?: number; max?: number };
  /**
   * Belirtilirse bu seçenek yalnız `state.meslek_yatkinlik_seviyesi` bu değere (veya
   * üstüne) ulaşmış karakterlere açıktır (1=kötü, 2=nötr, 3=iyi, 4=mükemmel — bkz.
   * data/meslekYatkinlik.ts). Meslek seçilmemiş (seviyesi null) karakterlerde her
   * zaman kilitli sayılır. Kilitlenirse `kilitAciklamasi` gösterilir.
   */
  minMeslekYatkinlikSeviye?: 1 | 2 | 3 | 4;
  /** Belirtilirse bu seçenek yalnız `state.meslek_yatkinlik_seviyesi` bu değerin (veya altında) olan karakterlere açıktır — ör. "acemi" bir şıkkı yalnız gerçekten acemi olana göster. */
  maxMeslekYatkinlikSeviye?: 1 | 2 | 3 | 4;
  /**
   * Belirtilirse bu seçenek seçildiğinde zar atılmaz; önce onTepki.metin gösterilir,
   * oyuncu geri çekilme/ısrar etme arasında seçim yapar, zaman o seçimde ilerler.
   * baseBasariSansi/basariliSonuc/basarisizSonuc bu durumda hiç kullanılmaz.
   */
  onTepki?: OnTepki;
  /**
   * Belirtilirse bu seçeneğin başarı şansı baseBasariSansi yerine, bu rolü taşıyan
   * ekip üyesinin gizli gercekKalite'sine eşitlenir (oyuncuya yine belirsiz aralık
   * olarak gösterilir). Olayda gerekliEkipRolu ile aynı rol kullanılmalı.
   */
  ekipKalitesiZarBelirler?: string;
  /**
   * true ise, kilit koşulu (bugün yalnız gerekliEtiketler ile birlikte kullanılır)
   * karşılanmadığında bu seçenek `gerekliKisilik` gibi TAMAMEN GİZLENİR — kilitli/
   * gri bir buton olarak gösterilmez. Nadir bir gizemli eşyaya (envanter:/esya:)
   * bağlı, "sahip olmayan asla ulaşamaz" türü bonus şıklar için: aksi halde olay
   * her oyuncuya kalıcı olarak kilitli bir 4. buton gösterir (2026-09 sonu, "4
   * şıklı olayları 3'e düşürelim" turu — eşyayı olmayan çoğunluk 3 buton görür,
   * eşyayı olan azınlık bu 4.'yü de görür).
   */
  gizliEgerYok?: boolean;
  /**
   * true ise bu seçenek istemcide daha küçük/ikincil bir "vazgeç" bağlantısı olarak
   * gösterilir (tam boy buton değil) — risksiz, sonucu genelde nötr bir çekilme
   * şıkkı için (2026-09 sonu, "4 şıklıları 3'e düşürelim" turu): görsel olarak asıl
   * 3 seçime öncelik verir, çekilme seçeneği ekranda ağırlık almaz ama kaybolmaz.
   */
  hafifSecenek?: boolean;
}

export interface OlayTanimi {
  id: string;
  kategori: Kategori;
  /** Belirtilmezse olay her iki çağda da çıkabilir. */
  cag?: Cag;
  /** Belirtilmezse olay her bölgede çıkabilir; tarihi olaylar için kullanılır. */
  bolgeler?: string[];
  meslekler?: string[];
  minYas?: number;
  maxYas?: number;
  minAhlak?: number;
  maxAhlak?: number;
  minUn?: number;
  maxUn?: number;
  minMutluluk?: number;
  maxMutluluk?: number;
  /** Belirtilirse olay sadece sağlığı bu eşiğe (veya altına) inmiş karakterlere çıkar; düşük-can toparlanma olayları için. */
  maxSaglik?: number;
  /** Belirtilirse olay sadece sağlığı bu eşiğin (veya üstünde) olan karakterlere çıkar. */
  minSaglik?: number;
  /** Belirtilirse olay sadece rakip puanı bu eşiğin üstüne/altına çıkmış karakterlere gösterilir. */
  minRakipPuani?: number;
  maxRakipPuani?: number;
  /** Belirtilirse olay sadece eş puanı (es_puani) bu eşiğin üstüne/altına çıkmış karakterlere gösterilir; evlilik kalitesine göre dallanan olaylar için kullanılır. */
  minEsPuani?: number;
  maxEsPuani?: number;
  gerekliEtiketler?: string[];
  yasakliEtiketler?: string[];
  gerekliUlke?: Partial<UlkeDurumu>;
  /** Belirtilirse olay sadece bu kişilik özelliğine sahip karakterlere çıkar. */
  gerekliKisilik?: string;
  /** Belirtilirse olay sadece bu din/kültüre (state.din_kultur) sahip karakterlere çıkar. */
  gerekliDin?: string;
  /** Belirtilirse olay sadece bu rütbe seviyesine (veya üstüne) ulaşmış karakterlere çıkar. */
  minRutbeSeviye?: number;
  /**
   * Belirtilirse olay yalnız `state.meslek_yatkinlik_seviyesi` bu değere (veya üstüne)
   * ulaşmış karakterlere çıkar (1=kötü, 2=nötr, 3=iyi, 4=mükemmel — bkz.
   * data/meslekYatkinlik.ts). Meslek seçilmemiş (seviyesi null) karakterlere hiç çıkmaz.
   * "Yüksek yatkınlıkta özel fırsatlar açılsın" için kullanılır.
   */
  minMeslekYatkinlikSeviye?: 1 | 2 | 3 | 4;
  /** Belirtilirse olay yalnız `state.meslek_yatkinlik_seviyesi` bu değerin (veya altında) olan karakterlere çıkar — "yetersiz yatkınlığın başına dert açtı" tarzı olaylar için. */
  maxMeslekYatkinlikSeviye?: 1 | 2 | 3 | 4;
  /** Belirtilirse olay sadece suç/aranma seviyesi (suc_seviyesi, 0-100) bu eşiğe (veya üstüne) ulaşmış karakterlere çıkar. Aranma kademesi bantları: 20 / 40 / 60 / 80. */
  minSucSeviyesi?: number;
  /** Belirtilirse olay sadece suc_seviyesi bu eşiğin (veya altına) altında kalmış karakterlere çıkar; min ile birlikte bir aranma kademesine (ör. 20-39) kilitlemek için kullanılır. */
  maxSucSeviyesi?: number;
  /** true ise bu olay sadece "kacak" etiketi taşıyan (büyük bir baskından kaçıp dağa sığınmış) karakterlere çıkar; kaçakken normal şehir olay havuzu tamamen kapanır (hapisOlayi/yolculukOlayi ile birebir aynı mantık). */
  kacakOlayi?: boolean;
  /** true ise olay sadece en az bir ekip üyesi olan karakterlere çıkar. */
  gerekliEkip?: boolean;
  /** Belirtilirse olay sadece bu spesifik role sahip bir ekip üyesi olan karakterlere çıkar. */
  gerekliEkipRolu?: string;
  /** true ise olay sadece bir hizbe katılmış (tarafsız dahil değil) karakterlere çıkar. */
  gerekliHizip?: boolean;
  /** true ise bu olay sadece "hapiste" etiketi taşıyan karakterlere çıkar; hapisteyken normal olay havuzu tamamen kapanır. */
  hapisOlayi?: boolean;
  /**
   * true ise bu bir hapis.ts olayıdır ve başarılı seçimi rüşvet/af/kefaret gibi
   * PARA YA DA İYİ HAL karşılığında KESİN bir serbest bırakma sunar (fiziksel
   * kaçış girişimleri — tünel, bayıltma, avlu duvarı vb. — bu kapsamda DEĞİLDİR,
   * onlar her zaman denenebilir kalır). Tutuklanma anındaki suc_seviyesi
   * ≥50 (bkz. §17 "baskın"/"azılı suçlu" bantları) ise, `hapis_ceza_toplam -
   * hapis_ceza_kalan` (yıl yatılan) `HAPIS_ERKEN_CIKIS_MIN_YIL`'a ulaşana kadar
   * bu olaylar havuzdan gizlenir — "en az N yıl yatmadan para/af ile çıkamazsın"
   * kuralını uygular (`olaySecici.ts` `uygunMu`).
   */
  hapisParaylaCikisOlayi?: boolean;
  /**
   * true ise bu olay bir kaçış/erken-tahliye stratejisini BAŞLATAN olaydır (tünel,
   * rüşvet, isyan, bayıltma, iyi hal, parasız riskli kaçışlar). "Az olay var" turu
   * Faz 8: bu olaylar (a) hapse yeni girildiğinde ilk 2 hapisOlayi çözülene kadar
   * (`hapis_tur_sayaci<2`) ve (b) toplam ceza 5 yıldan kısaysa (`hapis_ceza_toplam<5`)
   * havuzdan çıkarılır — önce hapishane hayatını yaşa, kaçış fikri sonra gelsin;
   * kısa cezada zaten kaçış zincirine girecek zaman/gerekçe yok. Zincirin kendi
   * içindeki devam adımları (`zorunlu_sonraki` ile zorlanan) bu filtreden etkilenmez.
   */
  hapisKacisBaslangici?: boolean;
  /** true ise bu olay sadece "yolculukta" etiketi taşıyan karakterlere çıkar; yolculuktayken normal olay havuzu tamamen kapanır (hapisOlayi ile birebir aynı mantık, çok yıllı yolculuk zincirleri için). */
  yolculukOlayi?: boolean;
  /** true ise bu olay sadece vebayı bizzat kapmış ("veba_hastasi" etiketi) karakterlere çıkar; hastayken normal havuz tamamen kapanır (hapisOlayi ile aynı mantık). Hekim/tedavi/ihmal seçimleriyle veba_olum_riski'ni düşürüp yükseltir. */
  vebaHastasiOlayi?: boolean;
  /**
   * Belirtilirse bu olay bir sosyalleşme mekânına (sosyallesmeYerleri.ts) aittir:
   * normal rastgele havuzdan tamamen dışlanır (hapisOlayi/yolculukOlayi'ndan farklı
   * olarak bir "etiket açığı" değil, her zaman dışlanır), sadece oyuncu ilgili mekâna
   * gitmeyi seçtiğinde (POST /:id/sosyallesme) zorlanan olay olarak karşısına çıkar.
   */
  sosyallesmeYeri?: string;
  /**
   * Belirtilirse bu olay bir piyasa mülkü türüne (mulkler.ts) aittir: normal
   * rastgele havuzdan tamamen dışlanır (bkz. olaySecici.ts uygunMu), sadece o
   * mülkü sahiplenen bir karaktere gameEngine.ts'teki periyodik mülk-olayı
   * kaskadı tarafından zorlanan olay olarak sunulur.
   */
  mulkOlayi?: MulkTuru;
  /**
   * true ise bu olay gecikmisTakip.ts havuzunun bir TETİKLEYİCİ olayıdır — normal
   * rastgele havuzda çıkabilir (dışlanmaz), yalnız salt iç kategorizasyon/test
   * amaçlıdır. Seçeneklerinden biri (ya da her ikisi) `SonucEtkisi.gecikmis_takip`
   * ile 15-20 yıl sonrasına bir geri dönüş olayı zamanlar.
   */
  gecikmisTakipOlayi?: boolean;
  /**
   * true ise bu olay bir "gecikmiş takip" GERİ DÖNÜŞ (sonuç) olayıdır: normal
   * rastgele havuzdan TAMAMEN dışlanır (bkz. olaySecici.ts uygunMu, sosyallesmeYeri/
   * mulkOlayi ile aynı desen) — yalnız `state.gecikmis_takipler`de zamanı gelmiş bir
   * kayıt varken, `senaryoUret`'teki kaskad tarafından zorlanan olay olarak sunulur.
   */
  gecikmisSonucOlayi?: boolean;
  /**
   * Belirtilirse bu olay bir "sağlık kritik eşiği" olayıdır (saglikKritik.ts,
   * 2026-09 sonu): normal rastgele havuzdan TAMAMEN dışlanır (bkz. olaySecici.ts
   * uygunMu, sosyallesmeYeri/mulkOlayi/gecikmisSonucOlayi ile aynı desen) —
   * yalnız `senaryoUret`'teki kaskad tarafından, karakterin sağlığı bir hayatta
   * İLK KEZ ilgili eşiğin (25 ya da 10) altına indiğinde, o eşiğin 15 olayluk
   * havuzundan rastgele seçilip zorlanan olay olarak sunulur. Her eşik bir
   * hayatta yalnızca bir kez tetiklenir (`saglik_esik_25_gorundu`/
   * `saglik_esik_10_gorundu` etiketleriyle).
   */
  saglikEsikOlayi?: "esik25" | "esik10";
  /**
   * true ise olay normal rastgele havuzdan TAMAMEN dışlanır; yalnız motor
   * kaskadı (`senaryoUret`) ya da bir `zorunlu_sonraki` zinciri tarafından zorlanır
   * (ör. eş ihmal uyarısı, tanışma fırsatı).
   */
  yalnizZorlaOlayi?: boolean;
  agirlik?: number;
  sureYilMin?: number;
  sureYilMax?: number;
  /** Ağır (trajik) ya da hafif (komik) olaylar art arda gelmesin diye kullanılan ton etiketi. */
  ton?: "agir" | "hafif";
  /** Salt arka planda kullanılan iç kategorizasyon: gizemli eşya edinim/takip olayı mı? Oyuncuya hiçbir yerde gösterilmez, uygunluk/seçim mantığını etkilemez. */
  gizemli?: boolean;
  gorsel?: string;
  baslik: string;
  metin: string;
  secenekler: OlaySecenegi[];
}
