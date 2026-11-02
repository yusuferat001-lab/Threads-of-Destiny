# Kader Çarkı Referansı — Test Turu Düzeltmeleri, Meslek Pazarı, Dünya Dönemleri

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

## 42. Uçtan Uca Test Turu Düzeltmeleri (2026-10)

Tüm ekranlar (masaüstü 1440px + mobil 390px, TR + EN) Playwright ile gezildi, 300 ömürlük HTTP bot simülasyonu koşuldu. Bu turda yapılan ve başka bölümlere dağılmayan değişiklikler:

- **Türkçe ek uyumu** ([i18n/ekler.ts](server/src/i18n/ekler.ts)): `T()` (yalnız TR) ve olay `doldur()`, `{0}'sin` / `{es}'in` / `{0}'e` gibi kesmeli ekleri değere göre uyumlar ("Onbaşı'sın", "Theodora'nın", "6'ya", "Paris'teki"). Kalıptaki ek bir örnek sayılır; tampon harf, ünlü uyumu ve d/t benzeşmesi ondan çıkarılır. Test: [ekler.test.ts](server/tests/ekler.test.ts). Yeni şablon yazarken eki herhangi bir uyumlu biçimde yazmak yeter.
- **`Secenek.ham_index`**: `olaySec` gizlenen (kişilik/eksen) seçenekler yüzünden istemci indeksi ile ham seçenek indeksi kayabiliyordu; sunucu artık her seçeneğe ham indeksini koyar, `secimUygula`/`sosyallesmeOlayCoz` onu kullanır.
- **Mantık adayları sunucuda (state'te) saklanır** (`state.mantik_adaylar`): teklif yalnız `adayIndex` alır, aday verisi/çeyiz/bonus istemciden hiç alınmaz.
- **İsim çakışmaları**: dost/rakip/anne/baba/amir/ast isimleri oyuncunun kendi adını almaz (`rastgeleIkiIsimSec(..., haric)`).
- **Yönetim kişileri** [game/yonetimKisileri.ts](server/src/game/yonetimKisileri.ts)'e taşındı; talep `kimAdi` her gösterimde güncel hükümdar/patron adından üretilir (eskiden ölmüş kralın adı kalıyordu); patron talep kalemleri meslekten bağımsız.
- **Açılış anlatısı**: `kasaba` yerleşiminde "…topraklarının kasaba kısmına" yerine "Ailen X topraklarında küçük bir kasabaya yerleşmiş" cümlesi.
- **Eksik İngilizce**: 78 motor cümlesi, ~80 hata mesajı, 10 aile adı + 12 aile anlatısı, Palavracı/Obur, 34 olay ünvanı (`unvan_kazan`), 20 efsanevi ölüm başlığı, 30 durum adı — hem `katalog.en.ts` hem istemci `katalog.ts`. İstemcide ünvan/efsanevi ölüm gösterilen her yer `kt()`'den geçer.
- **İstemci**: `<html lang>` ve sekme başlığı dile göre (lang="en" iken CSS uppercase Türkçe "i"yi bozuyordu); aile adı zaten "Ailesi"/"Family" içeriyorsa şablon tekrar eklemez (`aileAdi.ts`); yüzdeler dile göre (`format.ts` `formatYuzde`/`formatYuzdeAralik`: TR "%15", EN "15%"); ana ekranda envanter Kullan/Hediye sonucu için `.bilgi-kutusu` bildirimi; Kariyer'de sonuç penceresi diğer pencerelerin üstünde (`.kariyer-sonuc-katman-ust`), kral talebi "Sonra karar ver" ile ertelenebilir ve para yetmiyorsa "Öde" kapalı, kral ilişkisi <20 artık "soğuk" (eskiden yanıltıcı "düşman"), kariyer puanı tam sayı; mobil "Canlı Skor" penceresi gerçek döküm gösterir (`SkorKirilimiPaneli`, ölüm ekranıyla ortak); mobil üst şeritte para birimi gizli + ahlak etiketi iki satıra sarar; Aile/Kariyer başlıkları mobilde sabit para rozeti/⚙️ altına itildi; masaüstünde ⚙️ artık bölge ℹ düğmesini örtmüyor; liderlik "Ana Menü" yaşayan karakterin kaydını silmez; geçmiş hayat detayında gerçek amaç çarpanı (`GecmisHayat.amacCarpani`); mekân kartlarında giriş ücreti; öğretici metindeki kaldırılmış özellik anlatımları (yerleşim seçimi, kendi işine yatırım, elle skor kaydı) güncellendi.
- **İki dilli ölüm nedeni**: `checkDeath(state, zorunlu, neden?: string | IkiDilMetin)` — iki dilli verilirse `state.olum_nedeni` oyuncunun diline göre seçilir, ikisi de `state.olum_nedeni_ceviri = {tr,en}`'de saklanır. Motor cümleleri `ikiDilT(trKalip, params)` ([i18n/index.ts](server/src/i18n/index.ts)) ile, olay seçiminden gelen ölümler `gameEngine.olaySonucMesajiIkiDil` ile (oyuncunun dilindeki hâl ona gösterilen metnin aynısı, öbür dil ham olaydan yeniden doldurulur) üretilir; `durumlariUygula` da iki dilli döner. `Score.olum_nedeni` artık Türkçe (kanonik), yeni `Score.olum_nedeni_en` İngilizce (migration `20261007_score_olum_nedeni_en`); istemci liderlik tablosu, ölüm ekranı ve geçmiş hayatlar seçili dilde gösterir. Eski skor kayıtları yazıldıkları dilde kalır. Önceden hiç çevrilmeyen 3 ölüm cümlesi (ileri yaş, çöken ruh hali, veba) de İngilizceye eklendi. Test: [olumNedeni.test.ts](server/tests/olumNedeni.test.ts). **Yeni bir ölüm yolu eklerken `checkDeath`'e düz `T(state.dil, ...)` değil `ikiDilT(...)` ver.**
- **Üç Kağıtçı şansı 0.34 → 0.32** (§13): ×3 ödemeyle beklenen getiri +%2'den −%4'e.
- **İlk açılışta dil tarayıcıdan** ([ayarlar.ts](client/src/ayarlar.ts) `tarayiciDili`): kayıtlı dil ayarı yoksa `navigator.languages`'ta Türkçe varsa TR, yoksa EN. Ayarlar'dan yapılan seçim her zaman önceliklidir.

## 43. Meslek Pazarı + Mesleğe Özel Pis İşler (2026-10)

Kullanıcı isteği: "bir pazar olsun, oyuncu oradaki payını artırmaya çalışsın; pay maaşı ve rütbeyi etkilesin; bizim de rakibin de sayısal bir gücü olsun, rakibin gücü düştükçe bizim payımız artsın — dört meslekte de." Fazlar sırayla eklendi (Faz 0 pazar, Faz 1 pis işler, Faz 2 ajanlar, Faz 3 durum kataloğu, Faz 4 rakip AI, Faz 5 zirve).

### Faz 0 — Pazar
Kaynak: [data/pazar.ts](server/src/data/pazar.ts) (saf, bağımlılıksız — stateManager buradan okur) + stateManager `meslekGucuEkle`/`pazarYillikUygula`.
- **Güçler:** oyuncunun `state.meslek_gucu` (0-100) ve her rakibin `Rakip.guc` (0-100). **Pazar payı SAKLANMAZ, türetilir:** `pay = G / (G + Σ yenilmemiş rakip gücü + PAZAR_DIGER_GUC=40)`. 40 = isimsiz küçük oyuncular (rakip tamamen yok olsa bile pay %100 olmaz; tavanda ~%71).
- **Meslek adları** (`PAZAR_ADLARI`, KATALOG_EN'de çevrili): Tüccar "Pazar Payı"/"Ticari Güç" ⚖️ · Din Adamı "Cemaat Payı"/"Ruhani Güç" 🕯️ · Zanaatkâr "Üretim Payı"/"Zanaat Gücü" 🔨 · Asker "Bölge Hâkimiyeti"/"Askeri Güç" 🛡️.
- **Başlangıç gücü** (`mesleğiSec`, `baslangicMeslekGucu`): 10 + yatkınlık kademesi (kötü +0 / nötr +2 / iyi +5 / mükemmel +10) + aile mirası +4. Rakip 48-69 ile başladığından taze pay ~%11.
- **Güç kaynakları:** mesleğine uygun kategoride başarılı olay +1.2 (×tecrübe hızı; `secimUygula` + `sosyallesmeOlayCoz`); kendi meslek metriğini artıran olay etkisi (Asker `ordu_techizat_artis`, Tüccar `ticaret_sermaye_artis`, Din `nufuz_artis`, Zanaatkâr `uretim_kapasitesi_artis`) artışın %25'i (`metrikGucKatkisiUygula`); yıllık pasif `0.2 + 0.05×rütbe`; rakibin kırılan gücünün %30'u (`rakipGucKir` → `RAKIP_KIRMA_GUC_AKTARIMI`). Hapiste/yolculukta yılda −1 (pazardan uzak).
- **Maaş:** `maasCarpanKalemleri`'nde yeni grup `"pazar"` — `pazarMaasCarpani(pay) = 0.94 + pay×0.55` (taze ~nötr, %35'te ~+%13, %60'ta ~+%27). `MaasKirilim.pazarYuzde/pazarPayiYuzde/pazarAdi`; Gelir & Gider kırılımında 🏪 çipi.
- **Rütbe:** `RUTBE_PAZAR_PAYI_ESIGI = {4: 0.18, 5: 0.35}` (rutbeler.ts) — S4 ve S5 ayrıca bu pazar payını ister (`esikKarsilaniyorMu(esik, state, hedefSeviye)`). Ayrıca yıllık `kariyer_puani += pay × 6` (`PAZAR_KARIYER_PUANI_YILLIK`). Ratchet değişmedi: pay sonradan düşse rütbe düşmez.
- **Yenilen rakip & yenisi:** rakip yenilince listede `yenildi:true` kalır (eskiden `eskiKayitGocu` listeyi tek elemana kırpıyordu; artık yalnız AKTİF rakip teke iner, yenilenler korunur) ve `state.rakip_yeni_yil = yil + 8..12` yazılır. O yıl gelince `pazarYillikUygula` başa (`rakipler[0]`) yeni bir rakip ekler (güç 32-47), `rakip_adi` da ona geçer (olaylardaki `{rakip}` hep aktif rakip).
- **Arayüz:** Kariyer ekranı sağ sütunda `PazarKarti` (yığılmış pay çubuğu: sen / rakip / küçük oyuncular + maaş etkisi + yıllık kariyer puanı); rütbe ilerleme bloğunda sıradaki kademe pazar şartı istiyorsa ayrı bir çubuk satırı ("Hak ettin" yazısı pazar şartı karşılanmadan çıkmaz).
- **Denge:** `simulateKisilikler` (N=25) — ölümde ortalama pay ~%24-26, S4/S5 dağılımı reform öncesine yakın. Sim çıktısına `pazar_payi`/`meslek_gucu` eklendi, `analyzeKisilikler` "Meslek pazarı" tablosunu basar.
- **Test:** [pazar.test.ts](server/tests/pazar.test.ts); [rutbe.test.ts](server/tests/rutbe.test.ts) pazar şartı testi.

### Faz 1 — Mesleğe özel pis işler + bekleme süresi
Kaynak: [data/kotuIsler.ts](server/src/data/kotuIsler.ts) (`KOTU_ISLER`, `uygunKotuIsler(meslek, cag)`, `KOTU_IS_ADLARI` — eskiden gameEngine'deydi) + gameEngine `kotuIsYap`/`kotuIsConfigGetir`.
- **Katalog:** 4 GENEL iş (`rakibi_korkut`, `adam_dov`, `birini_soy`, `isyeri_yak`; eski `rakibi_dov` kaldırıldı — yerini Asker'in düellosu aldı) + her mesleğe 3 özel iş:
  - **Tüccar** (pazar): `kervan_yagmalat` (rakip −14, para) · `karaborsa_yarat` (peşin 12, başarıda şehirde 1 yıllık kıtlık + para + güç; kıtlık oyuncuya da −1 sağlık/yıl) · `gumruk_rusvet` (peşin 14, güç + ticaret sermayesi).
  - **Din Adamı** (cemaat): `sahte_mucize` (şöhret + nüfuz + güç; başarısızlıkta güç −4) · `afaroz_ettir` (rakip −16; Sünni İslam'da istemci adı "Fetva çıkart") · `vali_santaj` (kral/vali ilişkisi +12 + para; başarısızlıkta ilişki −15, hapis).
  - **Zanaatkâr** (lonca/üretim): `formul_cal` (üretim kapasitesi +10, rakip −8) · `hammadde_topla` (peşin 15, rakip −12, kârla geri satış) · `lonca_manipule` (kariyer puanı + patron ilişkisi; başarısızlıkta patron −15).
  - **Asker** (sokak/asayiş): `kaos_cikar` (başarıda 1 yıllık isyan + vali ilişkisi + para) · `kaza_duello` (başarıda rakip ANINDA saf dışı — `rakipYenilt`; başarısızlıkta −25 sağlık + `olum_sansi` 14) · `kervan_baskini` (para + teçhizat).
- **Şema:** `KotuIsTanimi` artık `meslekler?`, `cag?`, `cooldownYil`, `maliyet?` (peşin, enflasyonlu), `rakipKirma?` (eski `RAKIP_KOTU_IS_HEDEFLERI` haritası kaldırıldı, değer tanımın içinde), `rakipYenilt?`, `yatkinlik?` (yoksa oyuncunun meslek kategorisi). `KotuIsEtki`'ye `meslek_gucu`, `ticaret_sermaye`/`nufuz`/`uretim_kapasitesi`/`ordu_techizat` (yalnız ilgili meslekte uygulanır), `yonetim_iliski`/`patron_iliski`, `kriz: {tur, sureYil}` (yalnız o an kriz yoksa) eklendi.
- **Asıl ödül meslek pazarı:** özel işlerin başarılı dalı `meslek_gucu` verir ve/veya rakip gücünü kırar (pay doğrudan artar) — ham para bilerek ölçülü.
- **Bekleme süresi:** `state.kotu_is_kilit: Record<id, açılış yılı>`; iş çevrilir çevrilmez (zarın sonucundan bağımsız) `yil + cooldownYil` yazılır. Erken deneme `"Bu iş için ortalık henüz sakinleşmedi; N yıl sonra…"` hatası (EN kalıbı `hataCevir`'de). Eskiden hiç bekleme yoktu.
- **Şans:** `taban × (1 + yatkinlikZarBonusOrani(kategori))`, 5-95 clamp (eski `taban + yatkinliklar[savas|siyaset]` toplaması kaldırıldı — §40 ile tutarlı).
- **Kart verisi** (`KotuIsKarti`): `maliyet`, `meslekGucuKazanci`, `meslegeOzel`, `kalanYil`; `rakipKirmaGucu` saf dışı bırakan işte 100.
- **İstemci:** Karanlık İşler penceresi "Mesleğine özel işler" / "Herkesin işleri" diye iki gruba ayrıldı; kartta şans · kazanç · bedel · güç · rakip etkisi tek satırda, beklemedeyken buton "Ortalık kızışık · ~N yıl" ve soluk.
- **Test:** [kotuIsler.test.ts](server/tests/kotuIsler.test.ts) (bekleme, meslek filtresi, güç artışı, düello, maliyet).

### Faz 2 — Ajanlar (sunucu; arayüz henüz yok)
Kaynak: [data/ajanlar.ts](server/src/data/ajanlar.ts) + gameEngine `ajanTut`/`ajanDurumGetir`/`ajanGorevleriniCoz`.
- **Ajan = normal ekip üyesi** (`EkipUyesi`, rolü Hırsız 🦊 / Kabadayı 🪓 / Casus 🕵️ / Suikastçı 🗡️); peşin ücret 10/12/16/30 (× enflasyon), yıllık maaş `maasTaban + kalite/20`. Rol başına en fazla bir ajan.
- Karanlık işin `ajanRolu`'na uyan bir ajana iş verilirse (`ajanId`) zar hemen atılmaz: görev `state.ajan_gorevleri`'ne yazılır, bir sonraki seçimde yıl ilerlerken çözülür; ajan o sırada başka iş alamaz. Şans = `ajanBasariSansi(taban, gercekKalite)`.
- Başarıda sağlık/ölüm/hapis bedeli yok, ahlak ve suç yarıya iner, ajan sadakati +5; yine de `(100 − sadakat)/400` ihtimalle ağzından kaçırır. Başarısızlıkta %60 yakalanıp ekipten düşer; düşük sadakatliyse seni ele verir (tam suç, şöhret −5, hapis riski).
- `suikast_ettir` ☠️ yalnız Suikastçı'yla yapılabilir (`sadeceAjan`). İstemci kartı bu işi şimdilik kapalı gösterir; "adamına yaptır" kutusu kaldırıldı.
- **Bu sistem geçicidir:** yeni meslek planında (dikey dilim, önce Tüccar) karanlık işler mesleğe özel 3 işe iner ve "çalışana yaptır" mantığına dönüşür.
- **Test:** [ajanlar.test.ts](server/tests/ajanlar.test.ts).

## 44. Dünya Dönemleri (2026-10, Faz A)
Kaynak: [data/dunyaDonemleri.ts](server/src/data/dunyaDonemleri.ts) (tablolar + saf fonksiyonlar) + stateManager `donemIlerlet`/`ulkeGuncelle`/`buyukSavasKontrolEt`/`vebaBaslamaliMi`. Yeni meslek planının (dikey dilim, önce Tüccar) ilk adımı.

- **Her an bir dönem:** `state.ulke.donem = {tur: "bolluk"|"durgunluk"|"kitlik", baslangicYili, bitisYili, sonraki, etki}`. "Normal" yok. Aynı dönem asla arka arkaya gelmez: biten dönemin yerine kalan ikisinden biri %50 gelir (`sonraki` dönem başında önceden zarlanır, dedikodu için). Savaş sürerken bolluk gelmez; savaş başlarken bolluk sürüyorsa o yıl biter. Süre: bolluk/durgunluk 5-6, kıtlık sabit 3 yıl. Yeni karakterde ilk dönem ve kalan süresi rastgele.
- **Etkiler aralıktan, tam yüzde olarak bir kez zarlanır** (`DonemEtkisi`: `temelTalep, temelFiyat, luksTalep, luksFiyat, yasamGideri, maas`, hepsi çarpan). Şu an kullanılanlar: `maas` (maaş kırılımında dönem kalemi), `yasamGideri` (`giderKalemleriHesapla`); talep/fiyat alanları meslek işletmesi için hazır bekliyor.

| | Temel talep | Temel fiyat | Lüks talep | Lüks fiyat | Yaşam gideri | Maaş |
|---|---|---|---|---|---|---|
| Bolluk | +3..+7 | −9..−5 | +30..+45 | +10..+16 | −10..−6 | +6..+10 |
| Durgunluk | −13..−8 | −2..+2 | −35..−25 | −11..−6 | +2..+5 | −10..−6 |
| Kıtlık (sağlık etkisi yok) | 0 | +45..+60 | −50..−40 | −12..−8 | +25..+35 | −12..−8 |
| Savaş | 0 | +18..+25 | −40..−30 | 0 | +12..+18 | −10..−6 |
| Veba | −25..−18 | +12..+18 | −55..−45 | 0 | 0 | +8..+12 (işçi kıtlığı) |

- **Kıtlık dönemi sağlık götürmez** (2026-10 kullanıcı düzeltmesi; yalnız yaşam gideri/fiyat/talep etkisi). Olayla açılan yerel kıtlık krizi (`ulke.kriz`) kendi −1 sağlık/yıl etkisini korur. `kitlikVar(ulke)` = dönem kıtlık **ya da** `ulke.kriz.tur === "kitlik"`; mülk getirisi, mağaza fiyatı, haberler ve dedikodu bunu kullanır.
- **`ulke.ekonomi` dönemden türetilir** (bolluk → "iyi", diğerleri → "kotu"); eski olaylar/mülk/mağaza çalışmaya devam eder. Olayların `ulke_etkisi.ekonomi`'si (`ulkeGuncelle`) dönemi değiştirmez, yalnız kalan süresini ±1 yıl kaydırır (dönemle aynı yöndeyse uzar, tersse kısalır; en az 1 yıl kalır).
- **Savaş:** bollukta ve veba sürerken başlamaz; son savaşın bitişinden 6 yıl sonra yılda %18 (`SAVAS_YILLIK_IHTIMAL`); süre 4-5 yıl; vergi %7-10. Zar tutunca bir yıl `state.dunya_yaklasan = {tur:"savas", yil, dusman}` olur, ertesi yıl başlar (araya veba girerse iptal). Tarihi savaş ilanı (§11 kural 1) veba sürerken ertelenir. Olayla savaş başlatma (`ulke_etkisi.savasta`) veba sürerken yok sayılır.
- **Veba (her oyunda KESİN çıkar):** 20+ yaşta yılda %4 (`VEBA_YILLIK_IHTIMAL`), son dalganın bitişinden 30 yıl sonra tekrar, savaş sürerken başlamaz; **45 yaşına kadar hiç veba görülmediyse (`!veba_gecirdi && son_veba_bitis_yili == null`) zar atılmadan zorla tetiklenir** (45'te savaş sürüyorsa savaş bitince). Hepsi bir yıllık `dunya_yaklasan` aşamasından geçer (dedikodu sinyali). Süre 5-6 yıl; ayrı "iz" fazı **yok** (`etkiBitisYili = bitisYili`, `konutKiraCarpani = 1`); bitince `state.veba = null` + `son_veba_bitis_yili`. Bulaşma/hasta havuzu/korunma kademeleri değişmedi (§27).
- **Dedikodu:** dönem bitmesine ≤1 yıl kala sıradaki dönemi %70 doğru söyler (`DEDIKODU_ISABET`); yaklaşan savaş/veba %70 sezilir; hiçbir şey yaklaşmazken %8 "savaş geliyor" yanlış alarmı.
- **Dünya etkileri listesi** (`dunyaFinansEtkileri`): dönem satırı ("🥀 Kıtlık (~2 yıl): maaş −%9 · yaşam gideri +%31 · −1 sağlık/yıl"), savaş ve salgın satırları gerçek zarlanan yüzdelerle. Yüzde biçimi dile göre (TR "+%9", EN "+9%").
- **Eski kayıt:** `eskiKayitGocu` dönem yoksa ekonomiye göre atar (iyi → bolluk, kıtlık krizi → kıtlık, diğer → durgunluk), eski küçük kriz alanlarını siler.
- **Ölçüm:** `npx tsx scripts/simulateDunyaDonemleri.ts` (60 yıllık ömür, 18 yaşından): ~4 bolluk · ~5 durgunluk · ~5 kıtlık, ~2.6 rastgele savaş (~11.5 yıl; tarihi savaşlar hariç), ~1.1 veba, vebasız ömür %0; arka arkaya aynı dönem, bollukta savaş, savaş+veba çakışması ihlalleri 0.
- **Test:** [donemselDunyaOlaylari.test.ts](server/tests/donemselDunyaOlaylari.test.ts) "dünya dönemleri" + savaş/veba blokları.
