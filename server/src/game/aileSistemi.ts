// Eş / evlilik / doğum mantığı (saf fonksiyonlar). Tüm sayılar data/aileSabitleri.ts'te.
// gameEngine bu fonksiyonları ince sarmalayıcılarla (oturum + oturumKaydet) çağırır;
// stateManager.esiSifirla eşi slottan çıkarır.
//
// İlişki barı = state.es_puani (0-100). Gizli yıllık düşüş (GIZLI_YILLIK_DUSUS)
// oyuncuya hiçbir yerde (anlatı, ekran, gösterge dökümü) söylenmez.

import {
  AileHuy,
  CharacterState,
  Cocuk,
  DugunButcesi,
  MantikAday,
  TeklifHediyesi,
} from "../types";
import { T } from "../i18n";
import {
  clampStats,
  enflasyonCarpani,
  giderEnflasyonCarpani,
  esiSifirla,
  etiketEkle,
  etiketSil,
  hayatOlayiEkle,
  MESLEKLER,
  paraYuvarla,
} from "./stateManager";
import { rutbeTanimiGetir } from "../data/rutbeler";
import { rastgeleBirIsimSec, rastgeleCinsiyetliIsimSec } from "../data/npcIsimleri";
import { ADAY_GENC_YAS, ADAY_OLGUN_ORANI, ADAY_OLGUN_YAS } from "../data/aileSabitleri";
import * as S from "../data/aileSabitleri";

// ---------- küçük yardımcılar ----------
function aralik(a: number, b: number): number {
  return a + Math.floor(Math.random() * (b - a + 1));
}
function sinirla(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function ondalik1(x: number): number {
  return Math.round(x * 10) / 10;
}

/** Eşin şu anki yaşı; eş yoksa null. */
export function esYasi(state: CharacterState): number | null {
  return state.es_adi && typeof state.es_dogum_yili === "number" ? state.yil - state.es_dogum_yili : null;
}

/** Eş ölümü/terk sonrası yas dönemi sürüyor mu. */
export function yasDonemindeMi(state: CharacterState): boolean {
  return state.yil < (state.yas_bitis_yili ?? 0);
}

/** Zaman geçirmeden bu yana geçen yıl (eş yoksa 0). */
export function ihmalYili(state: CharacterState): number {
  if (!state.es_adi || typeof state.es_son_zaman_yili !== "number") return 0;
  return Math.max(0, state.yil - state.es_son_zaman_yili);
}

function huyCarpani(state: CharacterState, liste: AileHuy[]): number {
  return state.es_huylar.some((h) => liste.includes(h)) ? S.HUY_ETKI_CARPANI : 1;
}

// ---------- mantık evliliği: adaylar ----------
function rastgeleHuyCifti(): [AileHuy, AileHuy] {
  const havuz = [...S.HUYLAR];
  const ilk = havuz.splice(Math.floor(Math.random() * havuz.length), 1)[0];
  const ikinci = havuz[Math.floor(Math.random() * havuz.length)];
  return [ilk, ikinci];
}

function rastgeleMeslekVeRutbe(state: CharacterState): { meslek: string; rutbe: string } {
  const meslek = MESLEKLER[Math.floor(Math.random() * MESLEKLER.length)];
  const rutbeTanimi = rutbeTanimiGetir(meslek, state.cag, state.din_kultur);
  const rutbe = rutbeTanimi ? rutbeTanimi.unvanlar[Math.floor(Math.random() * rutbeTanimi.unvanlar.length)] : meslek;
  return { meslek, rutbe };
}

/** Tek bir mantık adayı üretir (oyuncu erkek olduğu için kadın isim havuzundan). */
export function mantikAdayiUret(state: CharacterState, grup: "genc" | "olgun", haric: string[] = []): MantikAday {
  const { meslek, rutbe } = rastgeleMeslekVeRutbe(state);
  const disari = [state.dost_adi, state.rakip_adi, state.es_adi ?? "", state.isim ?? "", ...haric].filter(Boolean);
  const isim = rastgeleCinsiyetliIsimSec(state.cag, state.bolge, "kadin", disari);
  const carpan = grup === "olgun" ? S.OLGUN_CARPANI : 1;
  const [yasMin, yasMax] = grup === "genc" ? ADAY_GENC_YAS : ADAY_OLGUN_YAS;
  return {
    isim,
    meslek,
    rutbe,
    yas: aralik(yasMin, yasMax),
    grup,
    huylar: rastgeleHuyCifti(),
    ceyiz: paraYuvarla(S.CEYIZ_GENC_TABAN * (0.8 + Math.random() * 0.4) * carpan * enflasyonCarpani(state)),
    meslek_bonusu: ondalik1(S.MESLEK_BONUSU_GENC * carpan),
  };
}

/**
 * Aday listesini hazırlar: boşsa ya da yenileme yılı geldiyse yeniden üretir (3 aday,
 * iki grup da temsil edilir) ve bir sonraki yenilemeyi 5-6 yıl sonraya kurar.
 */
export function mantikListesiniHazirla(state: CharacterState): MantikAday[] {
  if (state.mantik_adaylar.length > 0 && state.yil < state.mantik_yenileme_yili) return state.mantik_adaylar;
  const gruplar: ("genc" | "olgun")[] = [];
  for (let i = 0; i < S.MANTIK_ADAY_SAYISI; i++) gruplar.push(Math.random() < ADAY_OLGUN_ORANI ? "olgun" : "genc");
  if (!gruplar.includes("genc")) gruplar[0] = "genc";
  if (!gruplar.includes("olgun")) gruplar[gruplar.length - 1] = "olgun";
  const adaylar: MantikAday[] = [];
  for (const g of gruplar) adaylar.push(mantikAdayiUret(state, g, adaylar.map((a) => a.isim)));
  state.mantik_adaylar = adaylar;
  state.mantik_yenileme_yili = state.yil + aralik(...S.MANTIK_YENILEME_YIL);
  return adaylar;
}

/** Mantık evliliği şu an kullanılabilir mi; değilse oyuncuya gösterilecek sebebi fırlatır. */
export function mantikUygunlukKontrolEt(state: CharacterState): void {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken evlenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken evlenemezsin.");
  if (state.etiketler.includes("medeni:evli") || state.es_adi) throw new Error("Zaten evlisin.");
  if (state.yas < S.MANTIK_MIN_YAS) throw new Error("Mantık evliliği için henüz çok gençsin.");
  if (yasDonemindeMi(state)) throw new Error("Yas tutuyorsun; şimdi yeni bir evlilik düşünemezsin.");
  if (state.bekleyen_dugun) throw new Error("Bekleyen bir düğün var; önce onu tamamla.");
  if (state.sevgili || state.aktif_tanisma) throw new Error("Bir sevgilin var; önce o ilişkiyi sonuçlandır.");
  if (state.yil < state.mantik_kilit_yili) throw new Error("Mantık evliliği teklifleri şimdilik kapalı; biraz zaman geçmeli.");
}

/** Teklif hediyesinin enflasyonlu maliyeti. */
export function teklifHediyeMaliyeti(state: CharacterState, hediye: TeklifHediyesi): number {
  const taban = S.TEKLIF_HEDIYE_MALIYETI[hediye];
  return taban <= 0 ? 0 : Math.max(1, paraYuvarla(taban * giderEnflasyonCarpani(state)));
}

/** Mantık teklifinin kabul şansı (%): hediye kademesi + oyuncunun moral/şöhretine göre küçük düzeltme. */
export function mantikTeklifSansi(state: CharacterState, hediye: TeklifHediyesi): number {
  const duzeltme = sinirla(Math.round((state.mutluluk - 50) / 10 + (state.un - 20) / 20), -8, 8);
  return sinirla(S.TEKLIF_SANSI[hediye] + duzeltme, 10, 95);
}

export interface TeklifSonucu {
  kabul: boolean;
  aday: MantikAday;
  maliyet: number;
}

/**
 * Listeden bir adaya teklif: hediye parası (kabul/red fark etmez) peşin düşer. Kabul
 * edilirse bekleyen düğün kurulur (bütçe `dugunYap` ile seçilir); reddedilirse aday
 * listeden düşer ve mantık sistemi 2 yıl kilitlenir.
 */
export function mantikTeklifEt(state: CharacterState, adayIndex: number, hediye: TeklifHediyesi): TeklifSonucu {
  mantikUygunlukKontrolEt(state);
  if (!(hediye in S.TEKLIF_SANSI)) throw new Error("Geçersiz hediye.");
  const liste = mantikListesiniHazirla(state);
  const aday = liste[adayIndex];
  if (!aday) throw new Error("Böyle bir aday yok.");
  const maliyet = teklifHediyeMaliyeti(state, hediye);
  if (maliyet > 0 && state.para < maliyet) throw new Error("Bu teklif hediyesini karşılayacak paran yok.");
  if (maliyet > 0) state.para = paraYuvarla(state.para - maliyet);

  const kabul = Math.random() * 100 < mantikTeklifSansi(state, hediye);
  if (kabul) {
    state.bekleyen_dugun = { ...aday, huylar: [...aday.huylar] as [AileHuy, AileHuy], tur: "mantik" };
  } else {
    state.mantik_adaylar = liste.filter((_, i) => i !== adayIndex);
    state.mantik_kilit_yili = state.yil + S.MANTIK_RED_KILIT_YIL;
  }
  clampStats(state);
  return { kabul, aday, maliyet };
}

// ---------- düğün ----------
export function dugunMaliyeti(state: CharacterState, butce: DugunButcesi): number {
  return Math.max(1, paraYuvarla(S.DUGUN[butce].maliyet * giderEnflasyonCarpani(state)));
}

export interface DugunSonucu {
  isim: string;
  bar: number;
  ceyiz: number;
  maliyet: number;
  un: number;
}

/** Bekleyen düğünü seçilen bütçeyle gerçekleştirir: eş modeli kurulur, çeyiz ve maliyet işlenir. */
export function dugunYap(state: CharacterState, butce: DugunButcesi): DugunSonucu {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const b = state.bekleyen_dugun;
  if (!b) throw new Error("Bekleyen bir düğün yok.");
  const tanim = S.DUGUN[butce];
  if (!tanim) throw new Error("Geçersiz düğün bütçesi.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken evlenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken evlenemezsin.");
  const maliyet = dugunMaliyeti(state, butce);
  if (state.para < maliyet) throw new Error("Bu düğün bütçesini karşılayacak paran yok.");

  state.para = paraYuvarla(state.para - maliyet + b.ceyiz);
  state.un += tanim.un;
  state.es_adi = b.isim;
  state.es_meslek = b.meslek;
  state.es_rutbe = b.rutbe;
  state.es_dogum_yili = state.yil - b.yas;
  state.es_evlilik_turu = b.tur;
  state.es_grup = b.grup;
  state.es_huylar = [...b.huylar];
  state.es_meslek_bonusu = b.meslek_bonusu;
  state.es_dugun_un = tanim.un;
  state.es_puani = sinirla(aralik(...S.BASLANGIC_ILISKI[b.tur]) + tanim.iliski, 0, 100);
  state.es_son_zaman_yili = state.yil;
  state.es_dusuk_yil = 0;
  state.es_terk_esigi = aralik(...S.TERK_YIL_ARALIK);
  state.es_dogum_sayisi = 0;
  state.es_sonraki_hamilelik_yili = state.yil + 1;
  state.es_ihmal_uyari_goruldu = false;
  state.bekleyen_dugun = null;
  state.mantik_adaylar = [];
  state.mantik_yenileme_yili = 0;
  state.mantik_kilit_yili = 0;

  etiketSil(state, ["evlilik_yolu:ask", "evlilik_yolu:mantik_soylu", "evlilik_yolu:mantik_ticari"]);
  const yol =
    b.tur === "ask"
      ? "evlilik_yolu:ask"
      : b.meslek === "Tüccar" || b.meslek === "Zanaatkâr"
        ? "evlilik_yolu:mantik_ticari"
        : "evlilik_yolu:mantik_soylu";
  etiketEkle(state, ["medeni:evli", yol]);
  hayatOlayiEkle(state, "💍", T(state.dil, "{0} ile evlendi", [b.isim]));
  clampStats(state);
  return { isim: b.isim, bar: Math.round(state.es_puani), ceyiz: b.ceyiz, maliyet, un: tanim.un };
}

/**
 * Olay kaynaklı (`es_ata`) evlilik: eski olayların bıraktığı uyumluluk yolu. Eş yeni
 * modele oturur (yaş, huy, sayaçlar) ama meslek bonusu ve çeyiz yoktur; ilişki 60'tan başlar.
 */
export function esiOlaydanAta(state: CharacterState, isim: string): void {
  const { meslek, rutbe } = rastgeleMeslekVeRutbe(state);
  const yasFarki = state.yas <= 30 ? aralik(-4, 4) : aralik(-8, 4);
  state.es_adi = isim;
  state.es_meslek = meslek;
  state.es_rutbe = rutbe;
  state.es_dogum_yili = state.yil - Math.max(18, state.yas + yasFarki);
  state.es_evlilik_turu = "mantik";
  state.es_grup = "genc";
  state.es_huylar = [...rastgeleHuyCifti()];
  state.es_meslek_bonusu = 0;
  state.es_dugun_un = 0;
  state.es_puani = 60;
  state.es_son_zaman_yili = state.yil;
  state.es_dusuk_yil = 0;
  state.es_terk_esigi = aralik(...S.TERK_YIL_ARALIK);
  state.es_dogum_sayisi = 0;
  state.es_sonraki_hamilelik_yili = state.yil + 1;
  state.es_ihmal_uyari_goruldu = false;
  state.bekleyen_dugun = null;
  state.mantik_adaylar = [];
  etiketEkle(state, ["medeni:evli"]);
}

// ---------- ilişki barı eylemleri ----------
export type EsEylemi = "zaman_gecir" | "hediye_ver";

export function esEylemKilitAnahtari(eylem: EsEylemi): string {
  return `es:${eylem}`;
}

export function hediyeVerMaliyeti(state: CharacterState, hediye: "ucuz" | "pahali"): number {
  return Math.max(1, paraYuvarla(S.HEDIYE_VER[hediye].maliyet * giderEnflasyonCarpani(state)));
}

export interface EsEylemSonucu {
  artis: number;
  maliyet: number;
  huyEtkili: boolean;
  mesaj: string;
}

/** Zaman geçir / hediye ver: bağımsız 2 yıllık beklemeleri vardır; turu tüketmez. */
export function esEylemYap(state: CharacterState, eylem: EsEylemi, hediye?: "ucuz" | "pahali"): EsEylemSonucu {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  if (state.etiketler.includes("hapiste")) throw new Error("Hapisteyken ailenle ilgilenemezsin.");
  if (state.etiketler.includes("yolculukta")) throw new Error("Yolculuktayken ailenle ilgilenemezsin.");
  if (!state.es_adi) throw new Error("Bunun için bir eşin olmalı.");
  if (eylem !== "zaman_gecir" && eylem !== "hediye_ver") throw new Error("Böyle bir etkileşim yok.");
  const anahtar = esEylemKilitAnahtari(eylem);
  const kilit = state.aile_etkilesim_kilit[anahtar];
  if (typeof kilit === "number" && state.yil < kilit) {
    throw new Error("Bunu bu kadar sık yapamazsın; biraz zaman geçmeli.");
  }

  let artis: number;
  let maliyet = 0;
  let huyEtkili = false;
  if (eylem === "zaman_gecir") {
    const carpan = huyCarpani(state, S.HUY_ZAMAN);
    huyEtkili = carpan > 1;
    artis = Math.round(aralik(...S.ZAMAN_GECIR.artis) * carpan);
    state.saglik += S.ZAMAN_GECIR.saglik;
    state.mutluluk += 2;
    state.es_son_zaman_yili = state.yil;
    state.aile_etkilesim_kilit[anahtar] = state.yil + S.ZAMAN_GECIR.bekleme;
  } else {
    if (hediye !== "ucuz" && hediye !== "pahali") throw new Error("Geçersiz hediye.");
    maliyet = hediyeVerMaliyeti(state, hediye);
    if (state.para < maliyet) throw new Error("Bunu karşılayacak paran yok.");
    state.para = paraYuvarla(state.para - maliyet);
    const carpan = huyCarpani(state, S.HUY_HEDIYE);
    huyEtkili = carpan > 1;
    artis = Math.round(aralik(...S.HEDIYE_VER[hediye].artis) * carpan);
    state.mutluluk += 1;
    state.omur_hediye_sayisi = (state.omur_hediye_sayisi ?? 0) + 1; // "Hediye Ağı" amacı
    state.aile_etkilesim_kilit[anahtar] = state.yil + S.HEDIYE_BEKLEME;
  }
  state.es_puani = sinirla(state.es_puani + artis, 0, 100);
  clampStats(state);

  const sablon =
    eylem === "zaman_gecir"
      ? "{0} ile baş başa vakit geçirdin; ikiniz de dinlendiniz."
      : "{0} için bir hediye aldın; yüzü güldü.";
  let mesaj = T(state.dil, sablon, [state.es_adi]);
  if (huyEtkili) mesaj += " " + T(state.dil, "Bu, {0} için özellikle anlamlıydı.", [state.es_adi]);
  return { artis, maliyet, huyEtkili, mesaj };
}

/** Yüksek riskli işler / karanlık sırlar eşin ilişkisini anında düşürür. Eş yoksa etkisiz. */
export function esBarDusur(state: CharacterState, miktar: number): void {
  if (!state.es_adi || miktar <= 0) return;
  state.es_puani = Math.max(0, state.es_puani - miktar);
}

// ---------- yıllık eş mantığı ----------
function ihmalCezasi(ihmal: number): number {
  if (ihmal <= S.IHMAL_MUAF_YIL) return 0;
  for (const k of S.IHMAL_KADEMELERI) if (ihmal <= k.azami) return k.ceza;
  return 0;
}

function yaslilikOlumSansi(esYas: number): number {
  for (const k of S.ES_YASLILIK_OLUM) if (esYas >= k.min) return k.sans;
  return 0;
}

/**
 * Turdaki her yıl için: gizli sabit düşüş, ihmal cezası, düşük bar sayacı (terk),
 * eşin yaşlılıktan ölümü; ayrıca yas döneminin moral kaybı ve bebeklerin erken
 * ölümü. Anlatı cümleleri döner (gameEngine zamanAnlatimi'ne ekler). Gizli düşüş
 * ve ihmal cezası için HİÇBİR cümle üretilmez.
 */
export function esYillikUygula(state: CharacterState, yasArtisi: number): string[] {
  const mesajlar: string[] = [];
  const ilkYil = state.yil - yasArtisi + 1;

  // Bebeklerin erken ölümü (doğum komplikasyonu).
  for (let y = ilkYil; y <= state.yil; y++) {
    for (const c of state.cocuklar) {
      if (c.yasiyor && typeof c.erken_olum_yili === "number" && c.erken_olum_yili <= y) {
        c.yasiyor = false;
        delete c.erken_olum_yili;
        state.cocuk_sayisi = state.cocuklar.filter((x) => x.yasiyor).length;
        if (state.cocuk_sayisi === 0) etiketSil(state, ["cocuk_var"]);
        hayatOlayiEkle(state, "💔", T(state.dil, "{0} kaybedildi", [c.isim]));
        mesajlar.push(T(state.dil, "💔 {0} küçük yaşta hayatını kaybetti.", [c.isim]));
      }
    }
  }

  if (!state.es_adi) {
    if (state.yil > ilkYil - 1 && state.yas_bitis_yili > ilkYil - 1) {
      const yasYili = Math.min(state.yil, state.yas_bitis_yili - 1) - ilkYil + 1;
      if (yasYili > 0) state.mutluluk -= S.YAS_MUTLULUK_YILLIK * yasYili;
    }
    return mesajlar;
  }

  for (let i = 0; i < yasArtisi; i++) {
    const y = ilkYil + i;
    // 1) gizli sabit düşüş
    const dusus = state.es_huylar.includes("ciddi") ? S.CIDDI_GIZLI_DUSUS : S.GIZLI_YILLIK_DUSUS;
    state.es_puani = Math.max(0, state.es_puani - dusus);
    // 2) ihmal cezası (son "zaman geçir"den beri geçen yıla göre)
    const ihmal = typeof state.es_son_zaman_yili === "number" ? Math.max(0, y - state.es_son_zaman_yili) : 0;
    state.es_puani = Math.max(0, state.es_puani - ihmalCezasi(ihmal));
    // 3) düşük bar → terk
    if (state.es_puani < S.DUSUK_BAR_ESIGI) {
      state.es_dusuk_yil += 1;
      if (state.es_dusuk_yil >= state.es_terk_esigi) {
        const ad = esiSifirla(state, "terk");
        if (ad) {
          hayatOlayiEkle(state, "💔", T(state.dil, "{0} ile yolları ayrıldı", [ad]));
          mesajlar.push(T(state.dil, "💔 {0} seni terk etti. Aranızdaki bağ artık kopmuştu.", [ad]));
        }
        return mesajlar;
      }
    } else {
      state.es_dusuk_yil = 0;
    }
    // 4) eşin yaşlılıktan ölümü
    const esYas = typeof state.es_dogum_yili === "number" ? y - state.es_dogum_yili : 0;
    if (Math.random() < yaslilikOlumSansi(esYas)) {
      const ad = esiSifirla(state, "olum");
      if (ad) {
        hayatOlayiEkle(state, "💔", T(state.dil, "{0} hayata gözlerini yumdu", [ad]));
        mesajlar.push(T(state.dil, "💔 {0} hayata gözlerini yumdu.", [ad]));
      }
      return mesajlar;
    }
  }
  return mesajlar;
}

// ---------- doğum ----------
function dogumSansi(state: CharacterState, bar: number): number {
  for (const b of S.DOGUM_BANDLARI) {
    if (bar >= b.min) return b.sans * (state.es_grup === "olgun" ? S.OLGUN_DOGUM_CARPANI : 1);
  }
  return 0;
}

function cocukYatkinligi(): NonNullable<Cocuk["yatkinlik"]> {
  const r = Math.random();
  if (r < S.COCUK_YATKINLIK_ORAN.yatkin) return "yatkin";
  if (r < S.COCUK_YATKINLIK_ORAN.yatkin + S.COCUK_YATKINLIK_ORAN.uyumsuz) return "uyumsuz";
  return "notr";
}

/** Eşin bu yıl hamile kalabilmesi için gereken tüm koşullar (zar hariç). */
function dogumKosullariUygunMu(state: CharacterState, yil: number): boolean {
  if (!state.es_adi || typeof state.es_dogum_yili !== "number") return false;
  if (yil - state.es_dogum_yili >= S.ES_MAKS_DOGUM_YAS) return false;
  if (state.es_dogum_sayisi >= S.ES_MAKS_DOGUM) return false;
  if (state.cocuklar.length >= S.OMUR_COCUK_TAVANI) return false;
  if (yil < state.es_sonraki_hamilelik_yili) return false;
  return !["hapiste", "yolculukta", "veba_hastasi"].some((e) => state.etiketler.includes(e));
}

/** Bir doğumu işler (sayaç, bekleme, komplikasyon). Hem yıllık zardan hem event-kaynaklı çocuktan çağrılır. */
export function dogumuKaydet(state: CharacterState, yil: number, cocuk: Cocuk | null): string[] {
  const mesajlar: string[] = [];
  state.es_dogum_sayisi += 1;
  state.son_dogum_yili = yil;
  state.es_sonraki_hamilelik_yili = yil + S.HAMILELIK_BEKLEME_YIL[Math.min(state.es_dogum_sayisi, S.HAMILELIK_BEKLEME_YIL.length) - 1];
  if (cocuk && Math.random() < S.DOGUM_KOMPLIKASYON) {
    if (Math.random() < S.KOMPLIKASYON_BEBEK_PAYI) {
      cocuk.erken_olum_yili = yil + 1 + Math.floor(Math.random() * S.BEBEK_OLUM_PENCERE_YIL);
    } else if (state.es_adi) {
      const ad = esiSifirla(state, "olum");
      if (ad) {
        hayatOlayiEkle(state, "💔", T(state.dil, "{0} hayata gözlerini yumdu", [ad]));
        mesajlar.push(T(state.dil, "💔 {0} doğum sırasında hayatını kaybetti.", [ad]));
      }
    }
  }
  return mesajlar;
}

/**
 * Turdaki her yıl için bir doğum zarı atar (en fazla bir doğum). Olasılık ilişki barına
 * göre bantlıdır; eş 50 yaşından sonra, 5 doğumdan sonra ve bekleme süresi dolmadan
 * hamile kalamaz. Bir cümle döndürür (yoksa null).
 */
export function dogumDenemesi(state: CharacterState, yasArtisi: number): string | null {
  const ilkYil = state.yil - yasArtisi + 1;
  for (let y = ilkYil; y <= state.yil; y++) {
    if (!dogumKosullariUygunMu(state, y)) continue;
    const sans = dogumSansi(state, state.es_puani);
    if (sans <= 0 || Math.random() >= sans) continue;

    const isim = rastgeleBirIsimSec(state.cag, state.bolge, [
      state.dost_adi,
      state.rakip_adi,
      state.es_adi ?? "",
      state.isim ?? "",
      ...state.cocuklar.map((c) => c.isim),
    ]);
    const cocuk: Cocuk = { isim, dogum_yili: y, yasiyor: true, iliski: 65, yatkinlik: cocukYatkinligi() };
    state.cocuklar.push(cocuk);
    state.cocuk_sayisi = state.cocuklar.filter((c) => c.yasiyor).length;
    etiketEkle(state, ["cocuk_var"]);
    hayatOlayiEkle(state, "👶", T(state.dil, "{0} doğdu", [isim]));
    const esAdi = state.es_adi as string;
    let not = T(state.dil, "👶 Eşin {0} ile aranız iyiydi; bir bebeğiniz oldu: {1}.", [esAdi, isim]);
    const ek = dogumuKaydet(state, y, cocuk);
    if (ek.length > 0) not += " " + ek.join(" ");
    return not;
  }
  return null;
}

/**
 * Olayların `cocuk_ekle` etkisi (yeni bebek / evlat): doğum sayacını ve bekleme süresini
 * işler. Evlilik yoksa sadece çocuk eklenir. Eş 5 doğuma ulaştıysa ya da ömür boyu çocuk
 * tavanı doluysa (evlat edinme hariç) çocuk eklenmez ve false döner.
 */
export function eventCocukuIzinli(state: CharacterState, evlatEdinme: boolean): boolean {
  if (state.cocuklar.length >= S.OMUR_COCUK_TAVANI) return false;
  if (evlatEdinme) return true;
  if (state.es_adi && state.es_dogum_sayisi >= S.ES_MAKS_DOGUM) return false;
  return true;
}

export function eventCocuguKaydet(state: CharacterState, yil: number, evlatEdinme: boolean): void {
  if (evlatEdinme || !state.es_adi) return;
  dogumuKaydet(state, yil, null);
}

export { cocukYatkinligi };

// ---------- çocuğu ekibe alma (15 yaş) ----------
/**
 * Yıllık: 15 yaşına gelen çocuğa "yanında çalışma daveti" hakkı açılır; ekipte çalışan bir
 * çocuk ölürse üye ekipten düşer. Anlatı cümleleri döner.
 */
export function cocukIsYillikUygula(state: CharacterState): string[] {
  const mesajlar: string[] = [];
  for (const c of state.cocuklar) {
    if (!c.yasiyor || c.is_durumu) continue;
    if (state.yil - c.dogum_yili >= S.COCUK_IS_YASI) {
      c.is_durumu = "bekliyor";
      if (!c.yatkinlik) c.yatkinlik = cocukYatkinligi();
      mesajlar.push(
        T(state.dil, "👨‍👦 {0} {1} yaşına geldi; yanında çalışabilir. İlişkiler ekranından davet edebilirsin.", [c.isim, S.COCUK_IS_YASI])
      );
    }
  }
  // Ölen çocuk ekipten düşer.
  for (const uye of [...state.ekip]) {
    if (!uye.cocuk_isim) continue;
    const c = state.cocuklar.find((x) => x.isim === uye.cocuk_isim);
    if (!c || !c.yasiyor) {
      state.ekip = state.ekip.filter((e) => e.id !== uye.id);
      if (c) delete c.ekip_id;
      mesajlar.push(T(state.dil, "👋 {0} artık ekibinde değil.", [uye.isim]));
    }
  }
  return mesajlar;
}

/** Çocuk daveti kabul eder mi: yatkın %100, nötr %50, uyumsuz %15; ilişki ±12,5 puan oynatır. */
export function cocukKabulEder(cocuk: Cocuk): boolean {
  const yatkinlik = cocuk.yatkinlik ?? "notr";
  const taban = S.COCUK_KABUL_ORANI[yatkinlik];
  if (taban >= 1) return true;
  const iliski = typeof cocuk.iliski === "number" ? cocuk.iliski : 60;
  return Math.random() < sinirla(taban + (iliski - 50) / 400, 0.02, 0.95);
}

/** Geçerli, daveti bekleyen yaşayan bir çocuk döner; değilse hata fırlatır. */
export function cocukDavetiKontrolEt(state: CharacterState, cocukIndex: number, beklenen: "bekliyor" | "red_tepkisi"): Cocuk {
  if (!state.aktif) throw new Error("Oyun zaten bitmiş.");
  const c = state.cocuklar[cocukIndex];
  if (!c || !c.yasiyor) throw new Error("Geçerli bir çocuk seçmelisin.");
  if (c.is_durumu !== beklenen) {
    throw new Error(
      beklenen === "bekliyor" ? "Bu çocuk için bekleyen bir iş daveti yok." : "Bu çocuğun reddine verecek bir tepkin yok."
    );
  }
  return c;
}

/** Reddedilen davete öfkelen / sakin karşıla: çocukla bağı belirler, daveti kapatır. */
export function cocukRedTepkisiUygula(state: CharacterState, cocukIndex: number, tepki: "ofke" | "sakin"): string {
  const c = cocukDavetiKontrolEt(state, cocukIndex, "red_tepkisi");
  if (tepki !== "ofke" && tepki !== "sakin") throw new Error("Geçersiz tepki.");
  const iliski = typeof c.iliski === "number" ? c.iliski : 60;
  if (tepki === "ofke") {
    c.iliski = iliski + S.COCUK_OFKE_ILISKI;
    state.mutluluk += S.COCUK_OFKE_MUTLULUK;
  } else {
    c.iliski = iliski + S.COCUK_SAKIN_ILISKI;
  }
  c.is_durumu = "reddetti";
  clampStats(state);
  return c.isim;
}

/** Kabul eden çocuğun ekip kaydı için kalite ve maaş/buff değerleri. */
export function cocukEkipDegerleri(): { gercekKalite: number; maasIndirimi: number; buffCarpani: number } {
  const ustunluk = S.COCUK_KALITE_USTUNLUGU[0] + Math.random() * (S.COCUK_KALITE_USTUNLUGU[1] - S.COCUK_KALITE_USTUNLUGU[0]);
  const gercekKalite = Math.min(100, Math.round(S.PIYASA_EN_IYI_KALITE * (1 + ustunluk)));
  const maasIndirimi = S.COCUK_MAAS_INDIRIMI[0] + Math.random() * (S.COCUK_MAAS_INDIRIMI[1] - S.COCUK_MAAS_INDIRIMI[0]);
  // En iyi piyasa çalışanının buff'ı × (1 + %1-2): normal işe alım formülünün (kalite−50)/500'ünden biraz yüksek.
  const buffCarpani = (1 + (S.PIYASA_EN_IYI_KALITE - 50) / 500) * (1 + ustunluk);
  return { gercekKalite, maasIndirimi, buffCarpani };
}
