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
  /** Oyuncuya gösterilen kısa risk/ödül ipucu. */
  ipucu?: string;
  /** Belirtilirse bu seçenek sadece bu kişilik özelliğine sahip karakterlere gösterilir. */
  gerekliKisilik?: string;
  /** Belirtilirse bu seçenek sadece kişilik ekseninde belirli bir aralıkta olan karakterlere gösterilir. */
  gerekliEksen?: { eksen: "fevrilik" | "merhamet"; min?: number; max?: number };
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
  /** true ise bu olay sadece "yolculukta" etiketi taşıyan karakterlere çıkar; yolculuktayken normal olay havuzu tamamen kapanır (hapisOlayi ile birebir aynı mantık, çok yıllı yolculuk zincirleri için). */
  yolculukOlayi?: boolean;
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
