/**
 * Hayat Amaçları havuzu (2026-09 — eski tekil rastgele `hayat_amaci`'nin yerini aldı).
 *
 * Karakter 15 yaşında meslek seçince (`mesleğiSec`) bu havuzdan **2 normal + 1 zor**
 * amaç çekilir (havuz = ortak + kendi mesleği + kendi çağı). Her tamamlanan amaç nihai
 * skor çarpanına TOPLAMSAL katkı yapar:
 *
 *     skorCarpani = max(1, Σ tamamlanan amaçların bonusları)     normal = 1.5 · zor = 2
 *
 * → 2 normal + 1 zor hepsi tamamlanırsa ×5 (eski "amaç tamamlandı = ×5" tavanı korunur);
 *   kısmi tamamlama artık ara çarpanlar (×1.5 / ×2 / ×3 / ×3.5 …) üretir.
 *
 * `kontrolAni`:
 *   "herhangi" → bir an bile eşiğe dokunmak yeter; tamamlandi kalıcı kilitlenir (her tur kontrol).
 *   "olumde"   → yalnız ölüm anındaki duruma bakılır (doğası gereği bir bütün-ömür koşulu).
 *
 * Eşikler `scripts/simulateZenginTavan.ts` + `simulateKisilikler` verisine göre kalibre
 * edildi: normaller "o oyun tarzına kilitlenirsen ulaşırsın", zorlar "nadir zirve".
 * Para/servet amaçlarında ek "temiz el" şartı var (suç seviyesi < 40) — suçla zengin
 * olan bonus alamaz.
 */
import { CharacterState, Cag, AmacZorluk, AmacKontrolAni, AmacIlerleme } from "../types";

export const AMAC_BONUS: Record<AmacZorluk, number> = { normal: 1.5, zor: 2 };

/** Başarısız dalında ölüm / `olum_sansi` bu değer ve üstündeyse o seçim "ölümcül riskli" sayılır. */
export const RISKLI_OLUM_SANSI_ESIK = 25;

const TEMIZ_EL_SUC_ESIGI = 40;

export interface AmacTanimi {
  id: string;
  zorluk: AmacZorluk;
  kontrolAni: AmacKontrolAni;
  /** Yoksa her çağ. */
  cag?: Cag;
  /** Yoksa her meslek. */
  meslekler?: string[];
  baslik: { tr: string; en: string };
  aciklama: { tr: string; en: string };
  /** `servet` = nakit + gayrimenkul değeri (çağıran hesaplayıp verir; döngüsel import olmasın diye). */
  kosul: (s: CharacterState, servet: number) => boolean;
}

// --- yardımcılar ---
const yasayanCocuk = (s: CharacterState) => (s.cocuklar ?? []).filter((c) => c.yasiyor).length;
const evliMi = (s: CharacterState) => s.etiketler.includes("medeni:evli") || !!s.es_adi;
const tarihiSavasSayisi = (s: CharacterState) =>
  s.etiketler.filter((e) => e.startsWith("tarihi_savas_gordu:")).length;
const gizemliEsyaVar = (s: CharacterState) =>
  s.etiketler.some((e) => e.startsWith("esya:") || e.startsWith("envanter:"));
const yenilenRakip = (s: CharacterState) => (s.rakipler ?? []).filter((r) => r.yenildi).length;
const temizEl = (s: CharacterState) => s.suc_seviyesi < TEMIZ_EL_SUC_ESIGI;
const zirveSuc = (s: CharacterState) => s.omur_zirve_suc ?? s.suc_seviyesi ?? 0;

export const HAYAT_AMAC_HAVUZU: AmacTanimi[] = [
  // ============================ ORTAK — NORMAL ============================
  {
    id: "denk_kasa", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Denk Kasa", en: "A Solid Coffer" },
    aciklama: { tr: "Servetini (nakit + mülk) 200'ün üzerine çıkar — hem de kirli işlere bulaşmadan.", en: "Grow your wealth (cash + property) past 200 — without a criminal record." },
    kosul: (s, servet) => servet >= 200 && temizEl(s),
  },
  {
    id: "taninan_yuz", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Tanınan Yüz", en: "A Known Face" },
    aciklama: { tr: "Şöhretini 72'ye taşı.", en: "Raise your renown to 72." },
    kosul: (s) => s.un >= 72,
  },
  {
    id: "dinc_ihtiyar", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Dinç İhtiyar", en: "A Hale Elder" },
    aciklama: { tr: "75 yaşını gör.", en: "Live to see 75." },
    kosul: (s) => s.yas >= 75,
  },
  {
    id: "ocak_sahibi", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Ocak Sahibi", en: "A Full Hearth" },
    aciklama: { tr: "Evlen ve en az 3 yaşayan çocuğun olsun.", en: "Marry and have at least 3 living children." },
    kosul: (s) => evliMi(s) && yasayanCocuk(s) >= 3,
  },
  {
    id: "saglam_omur", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Sağlam Ömür", en: "A Sound Body" },
    aciklama: { tr: "62 yaşından sonra sağlığını 75'in üzerinde tut.", en: "Keep your health above 75 past the age of 62." },
    kosul: (s) => s.yas >= 62 && s.saglik >= 75,
  },
  {
    id: "meyhane_mudavimi", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Meyhane Müdavimi", en: "Tavern Regular" },
    aciklama: { tr: "Üç kez alkollü bir âleme katıl.", en: "Join in three drunken revels." },
    kosul: (s) => (s.alkol_ziyaret_sayisi ?? 0) >= 3,
  },
  {
    id: "sansli_el", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Şanslı El", en: "A Lucky Hand" },
    aciklama: { tr: "Kumardan ömür boyu net 80 birim kâra geç.", en: "End a lifetime of gambling 80 coins ahead." },
    kosul: (s) => (s.omur_kumar_net ?? 0) >= 80,
  },
  {
    id: "gizemli_kader", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Gizemli Kader", en: "A Mysterious Fate" },
    aciklama: { tr: "Esrarengiz bir eşyaya sahip ol.", en: "Come to possess a mysterious relic." },
    kosul: (s) => gizemliEsyaVar(s),
  },
  {
    id: "korkusuz_secim", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Korkusuz", en: "Fearless" },
    aciklama: { tr: "Başarısızlığı ölüm demek olan bir seçimi başarıyla atlat.", en: "Pull off a choice where failure meant death." },
    kosul: (s) => (s.omur_riskli_basari ?? 0) >= 1,
  },

  // ============================ ORTAK — ZOR ============================
  {
    id: "servet_zirvesi", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Servet Zirvesi", en: "Summit of Wealth" },
    aciklama: { tr: "Servetini 400'ün üzerine çıkar — temiz bir sicille.", en: "Push your wealth past 400 — with clean hands." },
    kosul: (s, servet) => servet >= 400 && temizEl(s),
  },
  {
    id: "yasayan_efsane", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Yaşayan Efsane", en: "A Living Legend" },
    aciklama: { tr: "Şöhretini 97'ye taşı.", en: "Raise your renown to 97." },
    kosul: (s) => s.un >= 97,
  },
  {
    id: "kalabalik_soy", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Kalabalık Soy", en: "A Teeming Line" },
    aciklama: { tr: "En az 5 yaşayan çocuğun olsun.", en: "Have at least 5 living children." },
    kosul: (s) => yasayanCocuk(s) >= 5,
  },
  {
    id: "zengin_ve_ihtiyar", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Zengin ve İhtiyar", en: "Rich and Old" },
    aciklama: { tr: "68 yaşını geçmiş, servetin 220'nin üzerindeyken göç et.", en: "Pass on past the age of 68 with a wealth above 220." },
    kosul: (s, servet) => s.yas >= 68 && servet >= 220,
  },
  {
    id: "lekesiz_omur", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Lekesiz Ömür", en: "An Unstained Life" },
    aciklama: { tr: "55 yaşını geçip, ahlakın 90+ ve ömrün boyunca hiç ciddi biçimde aranmadan öl.", en: "Die past 55 with morality 90+, never once seriously wanted." },
    kosul: (s) => s.yas >= 55 && s.ahlak >= 90 && zirveSuc(s) < 20,
  },
  {
    id: "sarhos_ama_ayakta", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Sarhoş ama Ayakta", en: "Sozzled but Standing" },
    aciklama: { tr: "Ayyaş damgası yemiş ol, ama yine de 65 yaşını sağ gör.", en: "Earn the drunkard's brand, yet still reach 65 alive." },
    kosul: (s) => s.etiketler.includes("bagimlilik:ayyas") && s.yas >= 65,
  },
  {
    id: "kumar_efsanesi", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Kumar Efsanesi", en: "Gambling Legend" },
    aciklama: { tr: "Kumardan ömür boyu net 250 birim kâra geç.", en: "End a lifetime of gambling 250 coins ahead." },
    kosul: (s) => (s.omur_kumar_net ?? 0) >= 250,
  },
  {
    id: "olumle_dans", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Ölümle Dans", en: "Dance with Death" },
    aciklama: { tr: "Başarısızlığı ölüm demek olan seçimleri üç kez başarıyla atlat.", en: "Survive three separate choices where failure meant death." },
    kosul: (s) => (s.omur_riskli_basari ?? 0) >= 3,
  },

  // ============================ ASKER ============================
  {
    id: "komuta", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Komuta Kademesi", en: "The Command Tier" },
    aciklama: { tr: "Rütbede 4. kademeye çık.", en: "Rise to the 4th rank." },
    kosul: (s) => s.rutbe_seviye >= 4,
  },
  {
    id: "cephe_gazisi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Cephe Gazisi", en: "Front-Line Veteran" },
    aciklama: { tr: "En az iki tarihi savaşa katıl ve sağ kal.", en: "Fight in at least two historic wars and survive." },
    kosul: (s) => tarihiSavasSayisi(s) >= 2,
  },
  {
    id: "guclu_ordu", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Güçlü Ordu", en: "A Strong Host" },
    aciklama: { tr: "Ordu mevcudunu 150'ye çıkar.", en: "Grow your army to 150 troops." },
    kosul: (s) => s.ordu_mevcudu >= 150,
  },
  {
    id: "tam_donanim", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Tam Donanım", en: "Fully Equipped" },
    aciklama: { tr: "Ordu teçhizat seviyeni 80'e çıkar.", en: "Raise your army's equipment level to 80." },
    kosul: (s) => s.ordu_techizat_seviyesi >= 80,
  },
  {
    id: "madalyali", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Madalyalı Asker", en: "A Decorated Soldier" },
    aciklama: { tr: "En az 3 ünvan kazan.", en: "Earn at least 3 titles." },
    kosul: (s) => (s.unvanlar?.length ?? 0) >= 3,
  },
  {
    id: "serdar", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Serdar", en: "Grand Commander" },
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş.", en: "Reach the highest rank (5)." },
    kosul: (s) => s.rutbe_seviye >= 5,
  },
  {
    id: "sehir_kalkani", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Şehrin Kalkanı", en: "Shield of the City" },
    aciklama: { tr: "Şehir yönetiminde 3. kademeye çık.", en: "Reach the 3rd tier of city governance." },
    kosul: (s) => s.sehir_yonetim_seviyesi >= 3,
  },
  {
    id: "bas_belasi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Baş Belası", en: "The Scourge" },
    aciklama: { tr: "İki isimli rakibini de tamamen alt et.", en: "Utterly defeat both of your named rivals." },
    kosul: (s) => yenilenRakip(s) >= 2,
  },
  {
    id: "ordu_kurucusu", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Ordu Kurucusu", en: "Army-Builder" },
    aciklama: { tr: "Ordu mevcudunu 240'a, teçhizatını 75'e çıkar.", en: "Build your army to 240 troops with equipment at 75." },
    kosul: (s) => s.ordu_mevcudu >= 240 && s.ordu_techizat_seviyesi >= 75,
  },

  // ============================ TÜCCAR ============================
  {
    id: "lonca_ustasi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Lonca Ustası", en: "Guild Master" },
    aciklama: { tr: "Rütbede 4. kademeye çık.", en: "Rise to the 4th rank." },
    kosul: (s) => s.rutbe_seviye >= 4,
  },
  {
    id: "uc_kepenk", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Üç Kepenk", en: "Three Shopfronts" },
    aciklama: { tr: "Aynı anda 3 piyasa mülkü işlet.", en: "Run 3 market properties at once." },
    kosul: (s) => (s.mulkler?.length ?? 0) >= 3,
  },
  {
    id: "buyuyen_sermaye", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Büyüyen Sermaye", en: "Growing Capital" },
    aciklama: { tr: "Ticaret sermayeni 80'e çıkar.", en: "Grow your trade capital to 80." },
    kosul: (s) => s.ticaret_sermaye >= 80,
  },
  {
    id: "kar_marji", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Kâr Marjı", en: "Profit Margin" },
    aciklama: { tr: "Servetini 240'ın üzerine çıkar — temiz bir sicille.", en: "Push your wealth past 240 — with a clean record." },
    kosul: (s, servet) => servet >= 240 && temizEl(s),
  },
  {
    id: "hediye_agi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Hediye Ağı", en: "A Web of Gifts" },
    aciklama: { tr: "Eşine, çocuğuna, ekibine ya da dostuna 6 kez hediye ver.", en: "Give a gift to spouse, child, crew or friend 6 times." },
    kosul: (s) => (s.omur_hediye_sayisi ?? 0) >= 6,
  },
  {
    id: "lonca_reisi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Lonca Reisi", en: "Guild Chairman" },
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş.", en: "Reach the highest rank (5)." },
    kosul: (s) => s.rutbe_seviye >= 5,
  },
  {
    id: "imparator", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Ticaret İmparatoru", en: "Merchant Emperor" },
    aciklama: { tr: "En üst rütbeye çık ve servetin 380'i geçsin.", en: "Reach the top rank with a wealth above 380." },
    kosul: (s, servet) => s.rutbe_seviye >= 5 && servet >= 380,
  },
  {
    id: "tekelci", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Tekelci", en: "Monopolist" },
    aciklama: { tr: "Aynı anda 4 piyasa mülkü işlet.", en: "Run 4 market properties at once." },
    kosul: (s) => (s.mulkler?.length ?? 0) >= 4,
  },
  {
    id: "sermaye_devi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Sermaye Devi", en: "Capital Titan" },
    aciklama: { tr: "Ticaret sermayeni 140'a çıkar.", en: "Grow your trade capital to 140." },
    kosul: (s) => s.ticaret_sermaye >= 140,
  },

  // ============================ DİN ADAMI ============================
  {
    id: "kursu_sahibi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Kürsü Sahibi", en: "Keeper of the Pulpit" },
    aciklama: { tr: "Rütbede 4. kademeye çık.", en: "Rise to the 4th rank." },
    kosul: (s) => s.rutbe_seviye >= 4,
  },
  {
    id: "comert_el", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Cömert El", en: "An Open Hand" },
    aciklama: { tr: "Ahlakını 82'ye taşı.", en: "Raise your morality to 82." },
    kosul: (s) => s.ahlak >= 82,
  },
  {
    id: "nufuzlu_vaiz", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Nüfuzlu Vaiz", en: "A Preacher of Weight" },
    aciklama: { tr: "Nüfuzunu 70'e çıkar.", en: "Raise your influence to 70." },
    kosul: (s) => s.nufuz >= 70,
  },
  {
    id: "sadaka_tasi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Sadaka Taşı", en: "The Alms Stone" },
    aciklama: { tr: "Ömrün boyunca 18 kez sadaka ver.", en: "Give alms 18 times over your life." },
    kosul: (s) => (s.omur_sadaka_sayisi ?? 0) >= 18,
  },
  {
    id: "kutsal_gorev", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Kutsal Görev", en: "A Sacred Charge" },
    aciklama: { tr: "Büyük yolculuğu (hac) tamamla.", en: "Complete the great journey (pilgrimage)." },
    kosul: (s) => s.etiketler.includes("yolculuk_tamamlandi"),
  },
  {
    id: "piskopos", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Piskopos", en: "Bishop" },
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş.", en: "Reach the highest rank (5)." },
    kosul: (s) => s.rutbe_seviye >= 5,
  },
  {
    id: "aziz", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Aziz Mertebesi", en: "Sainthood" },
    aciklama: { tr: "Ahlakın 96, nüfuzun 85'e ulaşsın.", en: "Reach morality 96 and influence 85." },
    kosul: (s) => s.ahlak >= 96 && s.nufuz >= 85,
  },
  {
    id: "ruhani_onder", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Ruhani Önder", en: "Spiritual Leader" },
    aciklama: { tr: "Şehir yönetiminde 3. kademeye çık.", en: "Reach the 3rd tier of city governance." },
    kosul: (s) => s.sehir_yonetim_seviyesi >= 3,
  },
  {
    id: "gunahsiz", zorluk: "zor", kontrolAni: "olumde", meslekler: ["Din Adamı"],
    baslik: { tr: "Günahsız Ömür", en: "A Sinless Life" },
    aciklama: { tr: "60 yaşını geçip, ahlakın 70+ ve ömrün boyunca hiç aranmadan öl.", en: "Die past 60 with morality 70+, never once wanted." },
    kosul: (s) => s.yas >= 60 && s.ahlak >= 70 && zirveSuc(s) < 15,
  },

  // ============================ ÇAĞ — ORTA ÇAĞ ============================
  {
    id: "kutsal_yolculuk", zorluk: "normal", kontrolAni: "herhangi", cag: "Orta Çağ",
    baslik: { tr: "Kutsal Yolculuk", en: "The Holy Journey" },
    aciklama: { tr: "Bir büyük yolculuğa çık ve tamamla.", en: "Set out on a great journey and complete it." },
    kosul: (s) => s.etiketler.includes("yolculuk_tamamlandi"),
  },
  {
    id: "sarayda_soz", zorluk: "zor", kontrolAni: "herhangi", cag: "Orta Çağ",
    baslik: { tr: "Sarayda Söz Sahibi", en: "A Voice at Court" },
    aciklama: { tr: "Sarayda kabul gör ve şöhretin 75'i geçsin.", en: "Win a place at court with renown above 75." },
    kosul: (s) => s.etiketler.includes("sarayda") && s.un >= 75,
  },

  // ============================ ÇAĞ — SANAYİ DEVRİMİ ============================
  {
    id: "sanayici", zorluk: "normal", kontrolAni: "herhangi", cag: "Sanayi Devrimi",
    baslik: { tr: "Sanayici", en: "Industrialist" },
    aciklama: { tr: "Aynı anda 2 mülkün ve 200+ servetin olsun — temiz bir sicille.", en: "Hold 2 properties and 200+ wealth at once — with clean hands." },
    kosul: (s, servet) => servet >= 200 && (s.mulkler?.length ?? 0) >= 2 && temizEl(s),
  },
  {
    id: "kasif_ruhu", zorluk: "zor", kontrolAni: "herhangi", cag: "Sanayi Devrimi",
    baslik: { tr: "Kâşif Ruhu", en: "Explorer's Spirit" },
    aciklama: { tr: "Büyük yolculuğu tamamla ve servetin 240'ı geçsin.", en: "Complete the great journey with a wealth above 240." },
    kosul: (s, servet) => s.etiketler.includes("yolculuk_tamamlandi") && servet >= 240,
  },
];

const HAVUZ_INDEKS: Record<string, AmacTanimi> = Object.fromEntries(
  HAYAT_AMAC_HAVUZU.map((a) => [a.id, a])
);

export function amacTanimiGetir(id: string): AmacTanimi | undefined {
  return HAVUZ_INDEKS[id];
}

/** Bir (çağ, meslek) için uygun amaç tanımları. */
export function amacHavuzu(cag: Cag, meslek: string): AmacTanimi[] {
  return HAYAT_AMAC_HAVUZU.filter(
    (a) => (!a.cag || a.cag === cag) && (!a.meslekler || a.meslekler.includes(meslek))
  );
}

function karistir<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 15 yaşında meslek seçilince: havuzdan 2 normal + 1 zor amaç çeker. */
export function amaclariUret(cag: Cag, meslek: string): AmacIlerleme[] {
  const havuz = amacHavuzu(cag, meslek);
  const normaller = karistir(havuz.filter((a) => a.zorluk === "normal")).slice(0, 2);
  const zorlar = karistir(havuz.filter((a) => a.zorluk === "zor")).slice(0, 1);
  return [...normaller, ...zorlar].map((a) => ({
    id: a.id,
    zorluk: a.zorluk,
    bonus: AMAC_BONUS[a.zorluk],
    kontrolAni: a.kontrolAni,
    tamamlandi: false,
  }));
}

/** skorCarpani = max(1, Σ tamamlanan amaçların bonusları). */
export function amacSkorCarpani(state: CharacterState): number {
  const toplam = (state.hayat_amaclari ?? [])
    .filter((a) => a.tamamlandi)
    .reduce((s, a) => s + (a.bonus ?? 0), 0);
  return Math.max(1, toplam);
}

/** "herhangi" amaçlarını yoklar; yeni tamamlananları işaretleyip döndürür. */
export function amaclariHerhangiKontrol(state: CharacterState, servet: number): AmacIlerleme[] {
  const yeni: AmacIlerleme[] = [];
  for (const a of state.hayat_amaclari ?? []) {
    if (a.tamamlandi || a.kontrolAni !== "herhangi") continue;
    const tanim = HAVUZ_INDEKS[a.id];
    if (tanim && tanim.kosul(state, servet)) {
      a.tamamlandi = true;
      a.tamamlanmaYili = state.yil;
      yeni.push(a);
    }
  }
  return yeni;
}

/**
 * Canlı ilerleme çubuğu için sayısal amaçların (mevcut / hedef) metriği. Boolean
 * amaçlar (gizemli_kader, kutsal_gorev, korkusuz_secim…) burada yoktur — istemci
 * onlarda yalnız tamamlandı 0/100 gösterir.
 */
export const AMAC_ILERLEME: Record<
  string,
  { hedef: number; metrik: (s: CharacterState, servet: number) => number }
> = {
  denk_kasa: { hedef: 200, metrik: (_s, servet) => servet },
  taninan_yuz: { hedef: 72, metrik: (s) => s.un },
  dinc_ihtiyar: { hedef: 75, metrik: (s) => s.yas },
  ocak_sahibi: { hedef: 3, metrik: (s) => (s.cocuklar ?? []).filter((c) => c.yasiyor).length },
  saglam_omur: { hedef: 75, metrik: (s) => (s.yas >= 62 ? s.saglik : 0) },
  meyhane_mudavimi: { hedef: 3, metrik: (s) => s.alkol_ziyaret_sayisi ?? 0 },
  sansli_el: { hedef: 80, metrik: (s) => Math.max(0, s.omur_kumar_net ?? 0) },
  servet_zirvesi: { hedef: 400, metrik: (_s, servet) => servet },
  yasayan_efsane: { hedef: 97, metrik: (s) => s.un },
  kalabalik_soy: { hedef: 5, metrik: (s) => (s.cocuklar ?? []).filter((c) => c.yasiyor).length },
  zengin_ve_ihtiyar: { hedef: 220, metrik: (_s, servet) => servet },
  kumar_efsanesi: { hedef: 250, metrik: (s) => Math.max(0, s.omur_kumar_net ?? 0) },
  olumle_dans: { hedef: 3, metrik: (s) => s.omur_riskli_basari ?? 0 },
  komuta: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  cephe_gazisi: { hedef: 2, metrik: (s) => s.etiketler.filter((e) => e.startsWith("tarihi_savas_gordu:")).length },
  guclu_ordu: { hedef: 150, metrik: (s) => s.ordu_mevcudu },
  tam_donanim: { hedef: 80, metrik: (s) => s.ordu_techizat_seviyesi },
  madalyali: { hedef: 3, metrik: (s) => s.unvanlar?.length ?? 0 },
  serdar: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  sehir_kalkani: { hedef: 3, metrik: (s) => s.sehir_yonetim_seviyesi },
  bas_belasi: { hedef: 2, metrik: (s) => (s.rakipler ?? []).filter((r) => r.yenildi).length },
  ordu_kurucusu: { hedef: 240, metrik: (s) => s.ordu_mevcudu },
  lonca_ustasi: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  uc_kepenk: { hedef: 3, metrik: (s) => s.mulkler?.length ?? 0 },
  buyuyen_sermaye: { hedef: 80, metrik: (s) => s.ticaret_sermaye },
  kar_marji: { hedef: 240, metrik: (_s, servet) => servet },
  hediye_agi: { hedef: 6, metrik: (s) => s.omur_hediye_sayisi ?? 0 },
  lonca_reisi: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  imparator: { hedef: 380, metrik: (_s, servet) => servet },
  tekelci: { hedef: 4, metrik: (s) => s.mulkler?.length ?? 0 },
  sermaye_devi: { hedef: 140, metrik: (s) => s.ticaret_sermaye },
  kursu_sahibi: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  comert_el: { hedef: 82, metrik: (s) => s.ahlak },
  nufuzlu_vaiz: { hedef: 70, metrik: (s) => s.nufuz },
  sadaka_tasi: { hedef: 18, metrik: (s) => s.omur_sadaka_sayisi ?? 0 },
  piskopos: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  aziz: { hedef: 96, metrik: (s) => s.ahlak },
  ruhani_onder: { hedef: 3, metrik: (s) => s.sehir_yonetim_seviyesi },
  gunahsiz: { hedef: 60, metrik: (s) => s.yas },
  sarayda_soz: { hedef: 75, metrik: (s) => s.un },
  sanayici: { hedef: 200, metrik: (_s, servet) => servet },
  kasif_ruhu: { hedef: 240, metrik: (_s, servet) => servet },
  lekesiz_omur: { hedef: 55, metrik: (s) => s.yas },
  sarhos_ama_ayakta: { hedef: 65, metrik: (s) => s.yas },
};

/** Ölüm anında TÜM tamamlanmamış amaçlara son bir kez bakar (olumde + kaçmış herhangi). */
export function amaclariOlumdeKontrol(state: CharacterState, servet: number): AmacIlerleme[] {
  const yeni: AmacIlerleme[] = [];
  for (const a of state.hayat_amaclari ?? []) {
    if (a.tamamlandi) continue;
    const tanim = HAVUZ_INDEKS[a.id];
    if (tanim && tanim.kosul(state, servet)) {
      a.tamamlandi = true;
      a.tamamlanmaYili = state.yil;
      yeni.push(a);
    }
  }
  return yeni;
}
