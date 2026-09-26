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
const borcsuz = (s: CharacterState) => !s.kredi;
const luksEsyaSayisi = (s: CharacterState) =>
  (s.magaza_envanteri ?? []).filter((e) => e.kategori === "luks").length;
const ortalamaCocukIliskisi = (s: CharacterState) => {
  const yasayanlar = (s.cocuklar ?? []).filter((c) => c.yasiyor);
  if (!yasayanlar.length) return 0;
  return yasayanlar.reduce((toplam, c) => toplam + (c.iliski ?? 0), 0) / yasayanlar.length;
};
const ortalamaEkipSadakati = (s: CharacterState) => {
  const ekip = s.ekip ?? [];
  if (!ekip.length) return 0;
  return ekip.reduce((toplam, e) => toplam + (e.sadakat ?? 0), 0) / ekip.length;
};
const krediYonetimiBasarili = (s: CharacterState) =>
  !!s.kredi && s.kredi.pazarlikYapildi && s.kredi.odenmeyenTaksit === 0;
/** `konut_sahibi` ilerleme çubuğu için — konutlar.ts'teki kademe sırasıyla aynı. */
const KONUT_KADEME_INDEKS: Record<string, number> = {
  basit_barinak: 0, ahsap_ev: 1, normal_ev: 2, tas_ev: 3, konak: 4, sato: 5,
};

export const HAYAT_AMAC_HAVUZU: AmacTanimi[] = [
  // ============================ ORTAK — NORMAL ============================
  {
    id: "denk_kasa", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Denk Kasa", en: "A Solid Coffer" },
    aciklama: { tr: "Servetini (nakit + mülk) 230'un üzerine çıkar — hem de kirli işlere bulaşmadan.", en: "Grow your wealth (cash + property) past 230 — without a criminal record." },
    kosul: (s, servet) => servet >= 230 && temizEl(s),
  },
  {
    id: "taninan_yuz", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Tanınan Yüz", en: "A Known Face" },
    aciklama: { tr: "Şöhretini 72'ye taşı.", en: "Raise your renown to 72." },
    kosul: (s) => s.un >= 72,
  },
  {
    // 2026-09 hayat amacı dengesi: eşik 75→65. Sistemin kendi ölüm yaşı verisi
    // (§11.15 bot-simülasyonu: medyan ~62, %75 persentil ~68) 75'i "normal" tier
    // için fazla iddialı kılıyordu — oyuncuların çoğu bu yaşa hiç ulaşamıyordu.
    id: "dinc_ihtiyar", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Dinç İhtiyar", en: "A Hale Elder" },
    aciklama: { tr: "65 yaşını gör.", en: "Live to see 65." },
    kosul: (s) => s.yas >= 65,
  },
  {
    id: "ocak_sahibi", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Ocak Sahibi", en: "A Full Hearth" },
    aciklama: { tr: "Evlen ve en az 3 yaşayan çocuğun olsun.", en: "Marry and have at least 3 living children." },
    kosul: (s) => evliMi(s) && yasayanCocuk(s) >= 3,
  },
  {
    // 2026-09 hayat amacı dengesi: yaş eşiği 58→50 (aynı sebep — dinc_ihtiyar notu).
    id: "saglam_omur", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Sağlam Ömür", en: "A Sound Body" },
    aciklama: { tr: "50 yaşından sonra sağlığını 68'in üzerinde tut.", en: "Keep your health above 68 past the age of 50." },
    kosul: (s) => s.yas >= 50 && s.saglik >= 68,
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
    aciklama: { tr: "Kumardan ömür boyu net 95 birim kâra geç.", en: "End a lifetime of gambling 95 coins ahead." },
    kosul: (s) => (s.omur_kumar_net ?? 0) >= 95,
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
  {
    id: "sadik_dost", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Sadık Dost", en: "A Loyal Companion" },
    aciklama: { tr: "Bir evcil hayvan edin ve mutluluğunu 60'ın üzerinde tut.", en: "Take in a pet and keep your happiness above 60." },
    kosul: (s) => !!s.evcil_hayvan && s.mutluluk >= 60,
  },
  {
    // 2026-09 hayat amacı dengesi: eşik 70→58. patron_iliski 40'tan başlıyor ve
    // Kariyer ekranı (eski "Görevin") üzerinden ilerliyor — o ekrana hiç uğramayan
    // oyuncu için 70 fazla yüksek kalıyordu.
    id: "patronun_gozdesi", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Patronun Gözdesi", en: "The Boss's Favorite" },
    aciklama: { tr: "İş çevrendeki patronunla (lonca reisi/komutan/başrahip) ilişkini 58'e taşı.", en: "Raise your bond with your workplace superior (guild chief/commander/high clergy) to 58." },
    kosul: (s) => s.patron_iliski >= 58,
  },
  {
    id: "konut_sahibi", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Bir Çatı Altı", en: "A Roof of Your Own" },
    aciklama: { tr: "Taş bir eve ya da daha üstüne taşın.", en: "Move into a stone house or better." },
    kosul: (s) => ["tas_ev", "konak", "sato"].includes(s.konut_id),
  },
  {
    // 2026-09 hayat amacı dengesi: eşik 75→60 + `ekipSadakatYillikUygula` pasif
    // artışı eklendi (stateManager.ts) — eskiden TEK yol hediyeEt (§34.3) idi,
    // o sistemi keşfetmeyen oyuncu için amaç neredeyse hiç tamamlanmıyordu.
    id: "guvenilir_ekip", zorluk: "normal", kontrolAni: "herhangi",
    baslik: { tr: "Güvenilir Ekip", en: "A Trusted Crew" },
    aciklama: { tr: "En az bir ekip üyesi edin ve ortalama sadakatlerini 60'ın üzerinde tut.", en: "Hire at least one crew member and keep their average loyalty above 60." },
    kosul: (s) => (s.ekip ?? []).length >= 1 && ortalamaEkipSadakati(s) >= 60,
  },

  // ============================ ORTAK — ZOR ============================
  {
    id: "servet_zirvesi", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Servet Zirvesi", en: "Summit of Wealth" },
    aciklama: { tr: "Servetini 700'ün üzerine çıkar — hem temiz bir sicille hem de tefeciye hiç borcun olmadan.", en: "Push your wealth past 700 — with clean hands, and without owing the moneylender a single coin." },
    kosul: (s, servet) => servet >= 700 && temizEl(s) && borcsuz(s),
  },
  {
    id: "yasayan_efsane", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Yaşayan Efsane", en: "A Living Legend" },
    aciklama: { tr: "Şöhretini 95'e taşı — hem sarayda hem iş çevrende sözün geçsin.", en: "Raise your renown to 95 — your word must carry weight at court and in business alike." },
    kosul: (s) => s.un >= 95 && s.yonetim_iliski >= 50 && s.patron_iliski >= 50,
  },
  {
    id: "kalabalik_soy", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Kalabalık Soy", en: "A Teeming Line" },
    aciklama: { tr: "En az 6 yaşayan çocuğun olsun, hepsiyle de gerçekten yakın bir bağ kur.", en: "Have at least 6 living children — and stay genuinely close to every one of them." },
    kosul: (s) => yasayanCocuk(s) >= 6 && ortalamaCocukIliskisi(s) >= 50,
  },
  {
    id: "zengin_ve_ihtiyar", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Zengin ve İhtiyar", en: "Rich and Old" },
    aciklama: { tr: "70 yaşını geçmiş, servetin 350'nin üzerinde ve tefeciye tek kuruş borcun yokken göç et.", en: "Pass on past the age of 70 with a wealth above 350 and not a coin owed to the moneylender." },
    kosul: (s, servet) => s.yas >= 70 && servet >= 350 && borcsuz(s),
  },
  {
    id: "lekesiz_omur", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Lekesiz Ömür", en: "An Unstained Life" },
    aciklama: { tr: "58 yaşını geçip, ahlakın 90+, ömrün boyunca hiç ciddi biçimde aranmadan ve tefeciye hiç muhtaç kalmadan öl.", en: "Die past 58 with morality 90+, never once seriously wanted, and never once in debt to the moneylender." },
    kosul: (s) => s.yas >= 58 && s.ahlak >= 90 && zirveSuc(s) < 15 && borcsuz(s),
  },
  {
    id: "sarhos_ama_ayakta", zorluk: "zor", kontrolAni: "olumde",
    baslik: { tr: "Sarhoş ama Ayakta", en: "Sozzled but Standing" },
    aciklama: { tr: "Ayyaş damgası yemiş olsan da kariyerinde 3. kademeye ulaş ve 67 yaşını sağ gör.", en: "Earn the drunkard's brand, yet still climb to career rank 3 and live to see 67." },
    kosul: (s) => s.etiketler.includes("bagimlilik:ayyas") && s.yas >= 67 && s.rutbe_seviye >= 3,
  },
  {
    id: "kumar_efsanesi", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Kumar Efsanesi", en: "Gambling Legend" },
    aciklama: { tr: "Kumardan ömür boyu net 350 birim kâra geç — bunu tefeciye hiç muhtaç kalmadan başar.", en: "End a lifetime of gambling 350 coins ahead — without ever needing the moneylender." },
    kosul: (s) => (s.omur_kumar_net ?? 0) >= 350 && borcsuz(s),
  },
  {
    id: "olumle_dans", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Ölümle Dans", en: "Dance with Death" },
    aciklama: { tr: "Başarısızlığı ölüm demek olan seçimleri dört kez başarıyla atlat.", en: "Survive four separate choices where failure meant death." },
    kosul: (s) => (s.omur_riskli_basari ?? 0) >= 4,
  },
  {
    id: "kralin_guveni", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Kralın Güveni", en: "The King's Trust" },
    aciklama: { tr: "Yönetimle (kral/vali) ilişkini 78'e taşı — bu hat bilinçli olarak pahalı ve yavaş kurulur.", en: "Raise your bond with the crown (king/governor) to 78 — this line is deliberately slow and costly to build." },
    kosul: (s) => s.yonetim_iliski >= 78,
  },
  {
    id: "zevk_sahibi", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Zevk Sahibi", en: "Refined Taste" },
    aciklama: { tr: "Mağazadan 3 farklı lüks eşya edin ve şöhretini 75'in üzerinde tut.", en: "Collect 3 different luxury items from the shop and keep your renown above 75." },
    kosul: (s) => luksEsyaSayisi(s) >= 3 && s.un >= 75,
  },
  {
    id: "rakip_ustunlugu", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Rakipsiz Kalmak", en: "Without Rival" },
    aciklama: { tr: "En az bir isimli rakibini tamamen alt et ve şöhretini 72'nin üzerine çıkar.", en: "Utterly defeat at least one named rival and raise your renown past 72." },
    kosul: (s) => yenilenRakip(s) >= 1 && s.un >= 72,
  },
  {
    // 2026-09 hayat amacı dengesi: normal→zor. Şartı ("bilerek ihtiyacın olmayan bir
    // krediyi al, pazarlık yap, hiç taksit kaçırma") doğal oynanışta hiç tetiklenmeyen,
    // bilinçli bir meta-hedef — "normal" tier'ın beklediği erişilebilirlikle uyuşmuyordu.
    id: "akilli_borclanma", zorluk: "zor", kontrolAni: "herhangi",
    baslik: { tr: "Akıllı Borçlanma", en: "Savvy Borrowing" },
    aciklama: { tr: "Tefeciden kredi al, faizini pazarlıkla düşür ve hiç taksit kaçırma.", en: "Take a loan from the moneylender, haggle down the interest, and never miss a payment." },
    kosul: (s) => krediYonetimiBasarili(s),
  },

  // ============================ ASKER ============================
  {
    id: "komuta", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Komuta Kademesi", en: "The Command Tier" },
    aciklama: { tr: "Rütbede 4. kademeye çık.", en: "Rise to the 4th rank." },
    kosul: (s) => s.rutbe_seviye >= 4,
  },
  {
    // 2026-09 hayat amacı dengesi: eşik 2→1. `tarihi_savas_gordu:<rakip>` etiketi
    // yalnız §11 kural 1'deki tek seferlik tarihi-savaş kaskadından geliyor; bölge
    // başına birkaç savaş penceresi olsa da bunlar genelde onlarca yıl arayla ve
    // kural yaş≤55 iken tetikleniyor — bir ömürde ikisine de denk gelmek çoğu
    // bölgede yapısal olarak neredeyse imkansızdı.
    id: "cephe_gazisi", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Cephe Gazisi", en: "Front-Line Veteran" },
    aciklama: { tr: "Tarihi bir savaşa katıl ve sağ kal.", en: "Fight in a historic war and survive." },
    kosul: (s) => tarihiSavasSayisi(s) >= 1,
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
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş ve kralın güvenini de kazan (yönetim ilişkisi 55+).", en: "Reach the highest rank (5) and win the crown's trust (crown bond 55+)." },
    kosul: (s) => s.rutbe_seviye >= 5 && s.yonetim_iliski >= 55,
  },
  {
    id: "sehir_kalkani", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Şehrin Kalkanı", en: "Shield of the City" },
    aciklama: { tr: "Şehir yönetiminde 5. kademeye çık ve komutanınla ilişkini 60'ın üzerinde tut.", en: "Reach the 5th tier of city governance and keep your commander bond above 60." },
    kosul: (s) => s.sehir_yonetim_seviyesi >= 5 && s.patron_iliski >= 60,
  },
  {
    id: "bas_belasi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Baş Belası", en: "The Scourge" },
    // 2026-09: karakterin artık tek bir isimli rakibi var (eskiden 2 idi) — hedef
    // buna göre 1'e indirildi, aksi halde bu amaç hiçbir zaman tamamlanamazdı.
    aciklama: { tr: "İsimli rakibini tamamen alt et; bunu güçlü bir orduyla (teçhizat 70+) başar.", en: "Utterly defeat your named rival — with a well-equipped army (equipment 70+) behind you." },
    kosul: (s) => yenilenRakip(s) >= 1 && s.ordu_techizat_seviyesi >= 70,
  },
  {
    id: "ordu_kurucusu", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Asker"],
    baslik: { tr: "Ordu Kurucusu", en: "Army-Builder" },
    aciklama: { tr: "Ordu mevcudunu 280'e, teçhizatını 85'e çıkar — komutanının güvenini de kaybetmeden.", en: "Build your army to 280 troops with equipment at 85 — without losing your commander's trust." },
    kosul: (s) => s.ordu_mevcudu >= 280 && s.ordu_techizat_seviyesi >= 85 && s.patron_iliski >= 50,
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
    aciklama: { tr: "Servetini 270'in üzerine çıkar — temiz bir sicille.", en: "Push your wealth past 270 — with a clean record." },
    kosul: (s, servet) => servet >= 270 && temizEl(s),
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
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş ve lonca reisiyle ilişkini 60'ın üzerinde tut.", en: "Reach the highest rank (5) and keep your guild-chief bond above 60." },
    kosul: (s) => s.rutbe_seviye >= 5 && s.patron_iliski >= 60,
  },
  {
    id: "imparator", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Ticaret İmparatoru", en: "Merchant Emperor" },
    aciklama: { tr: "En üst rütbeye çık, servetin 630'u geçsin — hem de tefeciye borcun olmadan.", en: "Reach the top rank with a wealth above 630 — and not a coin owed to the moneylender." },
    kosul: (s, servet) => s.rutbe_seviye >= 5 && servet >= 630 && borcsuz(s),
  },
  {
    id: "tekelci", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Tekelci", en: "Monopolist" },
    aciklama: { tr: "Aynı anda 5 piyasa mülkü işlet ve zenginliğini lüks eşyalarla göster (2+ lüks eşya).", en: "Run 5 market properties at once and flaunt your wealth with luxury goods (2+ items)." },
    kosul: (s) => (s.mulkler?.length ?? 0) >= 5 && luksEsyaSayisi(s) >= 2,
  },
  {
    id: "sermaye_devi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Tüccar"],
    baslik: { tr: "Sermaye Devi", en: "Capital Titan" },
    aciklama: { tr: "Ticaret sermayeni 180'e çıkar ve bir rakibini pazardan tamamen sil.", en: "Grow your trade capital to 180 and wipe a rival off the market entirely." },
    kosul: (s) => s.ticaret_sermaye >= 180 && yenilenRakip(s) >= 1,
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
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş ve kralın/valinin güvenini de kazan (yönetim ilişkisi 55+).", en: "Reach the highest rank (5) and win the crown's trust as well (crown bond 55+)." },
    kosul: (s) => s.rutbe_seviye >= 5 && s.yonetim_iliski >= 55,
  },
  {
    id: "aziz", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Aziz Mertebesi", en: "Sainthood" },
    aciklama: { tr: "Ahlakın 98, nüfuzun 95'e ulaşsın; ömrün boyunca en az 25 kez sadaka ver.", en: "Reach morality 98 and influence 95; give alms at least 25 times over your life." },
    kosul: (s) => s.ahlak >= 98 && s.nufuz >= 95 && (s.omur_sadaka_sayisi ?? 0) >= 25,
  },
  {
    id: "ruhani_onder", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Din Adamı"],
    baslik: { tr: "Ruhani Önder", en: "Spiritual Leader" },
    aciklama: { tr: "Şehir yönetiminde 5. kademeye çık ve başpiskoposla ilişkini 60'ın üzerinde tut.", en: "Reach the 5th tier of city governance and keep your archbishop bond above 60." },
    kosul: (s) => s.sehir_yonetim_seviyesi >= 5 && s.patron_iliski >= 60,
  },
  {
    id: "gunahsiz", zorluk: "zor", kontrolAni: "olumde", meslekler: ["Din Adamı"],
    baslik: { tr: "Günahsız Ömür", en: "A Sinless Life" },
    aciklama: { tr: "65 yaşını geçip, ahlakın 85+, hiç ciddi biçimde aranmadan ve tefeciye hiç muhtaç kalmadan öl.", en: "Die past 65 with morality 85+, never once seriously wanted, and never once in debt to the moneylender." },
    kosul: (s) => s.yas >= 65 && s.ahlak >= 85 && zirveSuc(s) < 10 && borcsuz(s),
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
    aciklama: { tr: "Sarayda kabul gör, şöhretin 90'ı geçsin ve kralın güvenini de kazan (yönetim ilişkisi 60+).", en: "Win a place at court, push your renown past 90, and win the crown's trust as well (crown bond 60+)." },
    kosul: (s) => s.etiketler.includes("sarayda") && s.un >= 90 && s.yonetim_iliski >= 60,
  },

  // ============================ ÇAĞ — SANAYİ DEVRİMİ ============================
  {
    id: "sanayici", zorluk: "normal", kontrolAni: "herhangi", cag: "Sanayi Devrimi",
    baslik: { tr: "Sanayici", en: "Industrialist" },
    aciklama: { tr: "Aynı anda 2 mülkün ve 230+ servetin olsun — temiz bir sicille.", en: "Hold 2 properties and 230+ wealth at once — with clean hands." },
    kosul: (s, servet) => servet >= 230 && (s.mulkler?.length ?? 0) >= 2 && temizEl(s),
  },
  {
    id: "kasif_ruhu", zorluk: "zor", kontrolAni: "herhangi", cag: "Sanayi Devrimi",
    baslik: { tr: "Kâşif Ruhu", en: "Explorer's Spirit" },
    aciklama: { tr: "Büyük yolculuğu tamamla, servetin 480'i geçsin — borçsuz ve en az iki lüks hatıra eşyanla.", en: "Complete the great journey with a wealth above 480 — debt-free, and with at least two luxury mementos." },
    kosul: (s, servet) => s.etiketler.includes("yolculuk_tamamlandi") && servet >= 480 && borcsuz(s) && luksEsyaSayisi(s) >= 2,
  },

  // ============================ ZANAATKÂR (2026-09 yeni meslek, iskelet) ============================
  {
    id: "usta_eli", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Usta Eli", en: "The Master's Hand" },
    aciklama: { tr: "Üretim kapasiteni 70'e çıkar.", en: "Raise your production capacity to 70." },
    kosul: (s) => (s.uretim_kapasitesi ?? 0) >= 70,
  },
  {
    id: "loncanin_guveni", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Loncanın Güveni", en: "The Guild's Trust" },
    aciklama: { tr: "Rütbede 4. kademeye çık.", en: "Rise to the 4th rank." },
    kosul: (s) => s.rutbe_seviye >= 4,
  },
  {
    id: "tanidik_zanaatkar", zorluk: "normal", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Tanınan Usta", en: "A Known Craftsman" },
    aciklama: { tr: "Şöhretini 65'e çıkar.", en: "Raise your fame to 65." },
    kosul: (s) => s.un >= 65,
  },
  {
    id: "sahesinde_efsane", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Alanında Efsane", en: "A Legend of the Craft" },
    aciklama: { tr: "Şöhretin 95'i, üretim kapasiten 95'i geçsin; loncabaşınla ilişkin de güçlü kalsın (55+).", en: "Reach fame above 95 with production capacity above 95 — and stay in your guildmaster's good graces (bond 55+)." },
    kosul: (s) => s.un >= 95 && (s.uretim_kapasitesi ?? 0) >= 95 && s.patron_iliski >= 55,
  },
  {
    id: "loncabasi", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Loncabaşı", en: "Guildmaster" },
    aciklama: { tr: "Rütbede en üst kademeye (5) ulaş ve yönetimle ilişkini 50'nin üzerinde tut.", en: "Reach the highest rank (5) and keep your crown bond above 50." },
    kosul: (s) => s.rutbe_seviye >= 5 && s.yonetim_iliski >= 50,
  },
  {
    id: "atolye_imparatorlugu", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Atölye İmparatorluğu", en: "Workshop Empire" },
    aciklama: { tr: "Üretim kapasiteni tavana (100) çıkar ve en az 2 piyasa mülkü işlet — hiç tefeciye muhtaç kalmadan.", en: "Max out your production capacity (100) and run at least 2 market properties — without ever needing the moneylender." },
    kosul: (s) => (s.uretim_kapasitesi ?? 0) >= 100 && (s.mulkler?.length ?? 0) >= 2 && borcsuz(s),
  },
  {
    id: "zanaat_rekabeti", zorluk: "zor", kontrolAni: "herhangi", meslekler: ["Zanaatkâr"],
    baslik: { tr: "Rakipsiz Usta", en: "The Unrivaled Master" },
    aciklama: { tr: "Bir rakip zanaatkârı pazardan sil; bunu üretim kapasiten 70+, şöhretin 70+ iken başar.", en: "Wipe a rival craftsman off the market — with production capacity 70+ and fame 70+." },
    kosul: (s) => yenilenRakip(s) >= 1 && (s.uretim_kapasitesi ?? 0) >= 70 && s.un >= 70,
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
  denk_kasa: { hedef: 230, metrik: (_s, servet) => servet },
  taninan_yuz: { hedef: 72, metrik: (s) => s.un },
  dinc_ihtiyar: { hedef: 65, metrik: (s) => s.yas },
  ocak_sahibi: { hedef: 3, metrik: (s) => (s.cocuklar ?? []).filter((c) => c.yasiyor).length },
  saglam_omur: { hedef: 68, metrik: (s) => (s.yas >= 50 ? s.saglik : 0) },
  meyhane_mudavimi: { hedef: 3, metrik: (s) => s.alkol_ziyaret_sayisi ?? 0 },
  sansli_el: { hedef: 95, metrik: (s) => Math.max(0, s.omur_kumar_net ?? 0) },
  sadik_dost: { hedef: 60, metrik: (s) => (s.evcil_hayvan ? s.mutluluk : 0) },
  patronun_gozdesi: { hedef: 58, metrik: (s) => s.patron_iliski },
  konut_sahibi: { hedef: 3, metrik: (s) => KONUT_KADEME_INDEKS[s.konut_id] ?? 0 },
  guvenilir_ekip: { hedef: 60, metrik: (s) => ortalamaEkipSadakati(s) },
  servet_zirvesi: { hedef: 700, metrik: (_s, servet) => servet },
  yasayan_efsane: { hedef: 95, metrik: (s) => s.un },
  kalabalik_soy: { hedef: 6, metrik: (s) => (s.cocuklar ?? []).filter((c) => c.yasiyor).length },
  zengin_ve_ihtiyar: { hedef: 350, metrik: (_s, servet) => servet },
  kumar_efsanesi: { hedef: 350, metrik: (s) => Math.max(0, s.omur_kumar_net ?? 0) },
  olumle_dans: { hedef: 4, metrik: (s) => s.omur_riskli_basari ?? 0 },
  kralin_guveni: { hedef: 78, metrik: (s) => s.yonetim_iliski },
  zevk_sahibi: { hedef: 3, metrik: (s) => luksEsyaSayisi(s) },
  rakip_ustunlugu: { hedef: 1, metrik: (s) => yenilenRakip(s) },
  komuta: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  cephe_gazisi: { hedef: 1, metrik: (s) => s.etiketler.filter((e) => e.startsWith("tarihi_savas_gordu:")).length },
  guclu_ordu: { hedef: 150, metrik: (s) => s.ordu_mevcudu },
  tam_donanim: { hedef: 80, metrik: (s) => s.ordu_techizat_seviyesi },
  madalyali: { hedef: 3, metrik: (s) => s.unvanlar?.length ?? 0 },
  serdar: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  sehir_kalkani: { hedef: 5, metrik: (s) => s.sehir_yonetim_seviyesi },
  bas_belasi: { hedef: 1, metrik: (s) => (s.rakipler ?? []).filter((r) => r.yenildi).length },
  ordu_kurucusu: { hedef: 280, metrik: (s) => s.ordu_mevcudu },
  lonca_ustasi: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  uc_kepenk: { hedef: 3, metrik: (s) => s.mulkler?.length ?? 0 },
  buyuyen_sermaye: { hedef: 80, metrik: (s) => s.ticaret_sermaye },
  kar_marji: { hedef: 270, metrik: (_s, servet) => servet },
  hediye_agi: { hedef: 6, metrik: (s) => s.omur_hediye_sayisi ?? 0 },
  lonca_reisi: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  imparator: { hedef: 630, metrik: (_s, servet) => servet },
  tekelci: { hedef: 5, metrik: (s) => s.mulkler?.length ?? 0 },
  sermaye_devi: { hedef: 180, metrik: (s) => s.ticaret_sermaye },
  kursu_sahibi: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  comert_el: { hedef: 82, metrik: (s) => s.ahlak },
  nufuzlu_vaiz: { hedef: 70, metrik: (s) => s.nufuz },
  sadaka_tasi: { hedef: 18, metrik: (s) => s.omur_sadaka_sayisi ?? 0 },
  piskopos: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  aziz: { hedef: 98, metrik: (s) => s.ahlak },
  ruhani_onder: { hedef: 5, metrik: (s) => s.sehir_yonetim_seviyesi },
  gunahsiz: { hedef: 65, metrik: (s) => s.yas },
  sarayda_soz: { hedef: 90, metrik: (s) => s.un },
  sanayici: { hedef: 230, metrik: (_s, servet) => servet },
  kasif_ruhu: { hedef: 480, metrik: (_s, servet) => servet },
  lekesiz_omur: { hedef: 58, metrik: (s) => s.yas },
  sarhos_ama_ayakta: { hedef: 67, metrik: (s) => s.yas },
  sahesinde_efsane: { hedef: 95, metrik: (s) => s.un },
  loncabasi: { hedef: 5, metrik: (s) => s.rutbe_seviye },
  atolye_imparatorlugu: { hedef: 100, metrik: (s) => s.uretim_kapasitesi ?? 0 },
  zanaat_rekabeti: { hedef: 1, metrik: (s) => yenilenRakip(s) },
  usta_eli: { hedef: 70, metrik: (s) => s.uretim_kapasitesi ?? 0 },
  loncanin_guveni: { hedef: 4, metrik: (s) => s.rutbe_seviye },
  tanidik_zanaatkar: { hedef: 65, metrik: (s) => s.un },
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
