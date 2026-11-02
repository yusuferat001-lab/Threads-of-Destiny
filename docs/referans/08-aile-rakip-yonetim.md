# Kader Çarkı Referansı — Aile Ekranı, Rakipler/Tefeci/Hediye, Kariyer & Yönetim

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

## 33. Aile Ekranı: Eş/Çocuk İlişkisi & Etkileşimler

> **2026-10 güncellemesi:** Eş tarafı (4 `es_*` etkileşim, eş para talebi, eski yıllık soğuma/doğum zarı) §45'teki yeni eş sistemiyle DEĞİŞTİRİLDİ; bu bölümün çocuk etkileşimleri (`cocuk_oyna/hediye/egitim`, `aile_gezi`), çocuk talebi ve çocuk ilişkisi mantığı geçerli kalır.

Eskiden `AileEkrani.tsx` dar, salt-okunur bir liste ekranıydı (köken/eş/çocuk isimleri + `es_puani` etiketi). 2026-09'da **tam-sayfa, evin-içi arka planlı, etkileşimli** bir ekrana dönüştürüldü — sosyalleşme/mağaza alt sistemleriyle aynı desen (tur harcamayan endpoint'ler, `oturumKaydet` sonrası dönüş).

### State alanları (types.ts — server + client elle senkron, §24)
- `Cocuk.iliski: number` (0-100) — çocukla ilişki puanı; yeni doğan çocuk **65** ile başlar. `eskiKayitGocu` eski kayıtlarda `60` backfill eder. `clampStats` her tur 0-100'e yuvarlar.
- `CharacterState.aile_etkilesim_kilit: Record<string, number>` — etkileşim cooldown'ları, anahtar → tekrar açılacağı oyun yılı (`"es_hediye"`, çocuk için `"cocuk_oyna:2"` gibi index'li).
- `CharacterState.aile_talep: AileTalep | null` — eş/çocuğun bekleyen para talebi.
- `CharacterState.aile_talep_sonraki_yil: number` — sonraki talebin en erken üretilebileceği yıl (yaratılışta `baslangic_yili + 4`).
- `AileTalep = { id, kimden: "es"|"cocuk", kimAdi, cocukIndex: number|null, tutar, kalem, sonYil }`.
- `SonucEtkisi.cocuk_iliski?: number` — yaşayan TÜM çocukların ilişkisine uygulanan delta (gameEngine adım 9, `cocuk_ekle` yakını).

### Endpoint'ler (tümü turu tüketmez, `game.routes.ts`)
| Metot & Yol | Body | Fonksiyon (gameEngine) |
|---|---|---|
| GET `/:id/aile` | – | `aileDurumGetir` → `{ es, cocuklar[{isim,dogumYili,yas,yasiyor,iliski}], etkilesimler[{id,ikon,hedef,maliyet}], kilitler, talep, guncelYil, para, paraBirimi }`. `talep.kalem` `T(dil,...)` ile çevrilir. |
| POST `/:id/aile/etkilesim` | `{etkilesimId, cocukIndex?}` | `aileEtkilesimYap` — maliyet düşer (`para<maliyet`→hata), %80 tam / %20 yarım etki ("bugün keyifli değildi"), ilişki/mutluluk/sağlık/ün uygular, cooldown anahtarı yazar. |
| POST `/:id/aile/talep` | `{karar:"kabul"\|"ret"}` | `aileTalebiKararlastir` — kabul: `para -= tutar`, es_puani +14 / çocuk iliski +16, mutluluk +4; ret: es_puani −10 / çocuk iliski −12, mutluluk −3. `aile_talep=null`. |

### Etkileşim kataloğu (`AILE_ETKILESIMLERI`, gameEngine sabiti; maliyet `× enflasyonCarpani`)
| id | ikon | hedef | taban maliyet | etki | cooldown |
|---|---|---|---|---|---|
| `es_hediye` | 🎁 | eş | 10 | es_puani +12, mutluluk +3 | 3 yıl |
| `es_zaman` | ⏳ | eş | 0 | es_puani +7, mutluluk +4, sağlık +2 | 3 yıl |
| `es_sevgi` | 💋 | eş | 0 | es_puani +5, mutluluk +3 | 2 yıl |
| `es_gezi` | 🌇 | eş | 14 | es_puani +9, mutluluk +6 | 4 yıl |
| `cocuk_oyna` | 🎠 | çocuk | 0 | iliski +8, mutluluk +4 | 3 yıl |
| `cocuk_hediye` | 🧸 | çocuk | 8 | iliski +12, mutluluk +3 | 3 yıl |
| `cocuk_egitim` | 🎓 | çocuk | 18 | iliski +9, ün +2 | 6 yıl |
| `aile_gezi` | 🧺 | hepsi | 16 | es_puani +6, tüm yaşayan çocuk iliski +6, mutluluk +6, sağlık +2 | 5 yıl |

### Yıllık pasif mantık (`aileYillikUygula(state, yasArtisi)`, stateManager.ts)
`sonucuUygulaVeIlerlet` yıl bloğunda `sucSeviyesiUygula`'dan hemen sonra çağrılır; bir anlatı cümlesi döndürebilir (`zamanAnlatimi`'ye eklenir).
- Eş ilişkisi doğal düşüşü `-0.4/yıl`; her yaşayan çocuk `-0.6/yıl` (clamp ≥0).
- `iliski < 35` çocuk → `mutluluk -= (0.4 + şiddet)/yıl`; toplam çocuk cezası ~-2.0/yıl'a, bonus (`iliski ≥ 75` / `es_puani ≥ 70`) +1.2/yıl'a kaplanır (eş kötü-evlilik deseniyle aynı — §13).
- **Talep süresi dolması:** `yil > aile_talep.sonYil` → ilgili puan −12, mutluluk −4, `aile_talep=null`, cümle döner.
- **Talep üretimi:** (eş ya da yaşayan çocuk var) & `yil ≥ aile_talep_sonraki_yil` & talep yok & hapiste/yolculukta değil & `%15/yıl` → `aileTalebiUret` (eş ya da rastgele çocuk, `kalem` metin havuzundan, `tutar ≈` enflasyonlu 12-40 + servete hafif ölçekli, `sonYil = yil+3..4`), `aile_talep_sonraki_yil = yil + 5..8`.
- **Doğum denemesi (2026-09, `dogumDenemesiUygula` — gameEngine, `aileYillikUygula`'nın hemen ardından çağrılır; içerik gameEngine'de çünkü çocuk ismi üretimi orada):** evli & `yas < 55` & hapiste/yolculukta/veba_hastasi değil & `cocuklar.length < DOGUM_COCUK_TAVANI(8)` & son doğumdan (`state.son_dogum_yili`, opsiyonel alan) beri `DOGUM_COOLDOWN_YIL(4)` yıl geçmiş ise: `iliskiCarpani = clamp((es_puani−45)/55, 0, 1)`, `yillikSans = iliskiCarpani × 0.28` (es_puani ≤45 → ~0, 100 → yılda ~%28 — eş ilişkisi çok belirleyici, kullanıcı isteği). Başarılıysa bir çocuk eklenir (`iliski:65`), `son_dogum_yili = yil`, `cocuk_var` etiketi + hayat-hikayesi + `zamanAnlatimi`'ye "👶 …" cümlesi.

### Olaylar (§7, `evlilikVeAile.ts` + `.en.ts` aynası)
12 yeni detaylı çok-şıklı karar olayı (`evl_kiskanclik`, `evl_para_talebi_es`, `evl_kayinvalide`, `evl_krizi` [`maxEsPuani:32`], `evl_yildonumu`, `evl_es_hastalik`, `cocuk_okul_secimi`, `cocuk_para_talebi`, `cocuk_ergenlik`, `cocuk_dugun_masrafi`, `cocuk_yetenek`, `aile_tatil_karari`) — `cocuk_iliski`/`es_puani` takaslı, §13 mutluluk rubriğine uyar (guardrail geçiyor). Ek olarak `aile.ts`'teki `cocuk_evlilik`/`cocuk_meslek_secimi`/`cocuk_ziyaret` dallarına `cocuk_iliski` deltaları eklendi. "İkisi birden" (kullanıcı isteği): para talepleri hem Aile ekranı kartı **hem** `evl_para_talebi_es`/`cocuk_para_talebi` olay formu olarak gelir.

### İstemci
- `AileEkrani.tsx` tam yeniden yazıldı: `.ekran ekran-tam-sayfa ekran-aile` (`TAM_EKRAN_GRUBU`'na eklendi), inline-SVG `AileArkaplan` (pencere/ocak/tablo/halı, tema-duyarlı CSS değişkenleri), bekleyen `talep` kartı (Kabul/Reddet), köken kartı, **dost/rakip kartı** (`DostRakipKarti`, 2026-09 sonunda eski `IliskilerPaneli.tsx`'ten taşındı — `dostAdi`/`rakipAdi`/`dostPuani`/`rakipPuani` props, `ilBaslik`/`ilDost*`/`ilRakip*` i18n anahtarları), eş kartı (`.aile-iliski-bar` + 🎁⏳💋🌇 buton satırı), çocuk kartları (yaş + ilişki barı + 🎠🧸🎓; ölü çocuk soluk), 🧺 Birlikte kartı, `.tam-geri-buton`. Başlık (`aeBaslikTam`) bu yüzden "Ailen" → "Ailen & İlişkilerin" oldu.
- `App.tsx`: `aileEkraniniAc` (`aileDurumGetir` çeker, `aileDurum` state'e koyar), `aileEtkilesimHandler`/`aileTalepHandler` (dönen `state`'i `karakter`'e uygular, `aileDurum` yeniler, `islemMesaji` yazar). "Aileni Gör" butonu `aile_talep` varken 🔔 gösterir.
- `api.ts`: `aileDurumGetir`/`aileEtkilesimYap`/`aileTalebiKararlastir`. `types.ts`: `Cocuk.iliski`, `AileTalep`, `AileDurumu`, `SonucEtkisi.cocuk_iliski`, `CharacterState` alanları. `i18n.ts`: ~40 `ae*` anahtarı (TR+EN). `App.css`: `.ekran-aile` evin-içi teması + `.aile-iliski-bar`/`.aile-etkilesim-*`/`.aile-talep-karti`.

### Test
[aileEkrani.test.ts](server/tests/aileEkrani.test.ts) — `aileEtkilesimYap` (maliyet/ilişki/cooldown/ikinci çağrı reddi), `aileTalebiKararlastir` (kabul/ret), `aileYillikUygula` (decay, düşük-iliski moral, talep süresi dolması + üretimi).

## 34. Derin Rakip İlişkileri · Hediye · Salgın Korunma · Tefeci · Piyasa Zamanlaması · Havuz-Kilit Sağlamlaştırma (2026-09)

Yedi ayrı iş; hepsi tek turda eklendi. Backend tamamen tipli+testli ([yeniOzellikler.test.ts](server/tests/yeniOzellikler.test.ts), 14 test), client yüzeyleri İşin & Yatırımların + Görevin + Envanter panellerinde.

### 34.1 Havuz-kilit sağlamlaştırma (crash düzeltmesi + §24 kapanışı)
- **`HAVUZ_KILIT_ETIKETLERI = ["hapiste","yolculukta","kacak","veba_hastasi"]`** (stateManager). `etiketEkle` artık **karşılıklı dışlama invariant'ını zorunlu kılıyor**: bir havuz-kilit etiketi eklenince çakışan diğer kilitler otomatik düşer ("yeni kilit kazanır"). `havuzKilidiVar(state)` yardımcısı bir kilit altında mı diye bakar.
- **`olaySec` ARTIK `throw` ETMEZ** (eski `"Bu karakter için uygun olay bulunamadı."` oyunu kalıcı kilitliyordu — kaçak+veba çakışması gibi). Havuz boşsa son çare: 4 kilidi + gecmis/tag koşullarını yok sayıp en gevşek uygun havuza, o da boşsa tamamen kısıtsız olaylara düşer.
- **`vebaYillikKontrol`** karakterin bizzat hastalanma dalını artık `hapiste`/`kacak`/`yolculukta` iken atlıyor (eş/çocuk kaybı sürer). Bu, kilit çakışmasının asıl sessiz kaynağıydı.
- **`senaryoUret` milestone kaskadı** `milestoneKilitli = !zorlananId && havuzKilidiVar(state)` ile korunuyor: bir havuz kilidi altında evlilik teklifi / saray daveti / evcil hayvan / şehir yönetimi / kariyer yolu / mistik / mülk olayı **zorlanmaz** (§24'teki "hapiste evlilik teklifi" tuhaflığı kapandı). Zaten kuyruğa alınmış olay (veba başlangıcı, `zorunlu_sonraki`, sosyalleşme) etkilenmez.

### 34.2 Derin rakip ilişkileri (§13'te planlanmıştı)
- **`CharacterState.rakipler: Rakip[]`** — `{ad, meslek, guc (0-100), husumet (0-100), yenildi}`. `mesleğiSec` **TEK** meslektaş rakip üretir (2026-09'da 2 rakipten 1'e indirildi, `stateManager.ts` yorumu: "iki rakip yerine tek rakip"); `rakipler[0].ad === rakip_adi` (geriye dönük uyum, olaylar `{rakip}`'i kullanır). `eskiKayitGocu` eski kayıtlara türetir/indirir (eski 2-rakipli bir kayıt varsa `rakipler[0]`'a kırpılır). **Not:** Asker'e özel "Baş Belası" hayat amacı (`bas_belasi`) eskiden `yenilenRakip(s) >= 2` istiyordu — tek rakiple bu asla tamamlanamıyordu; 2026-09 denetiminde hedef 1'e düşürüldü (§18/hayatAmaclari.ts).
- **Karanlık iş → rakip hedefleme:** `RAKIP_KOTU_IS_HEDEFLERI = {rakibi_korkut:8, rakibi_dov:15, isyeri_yak:26}`. `POST /:id/kotu-is` body'si `{tur, hedefRakipAd?, vekil?}` aldı. Başarılı dalda `rakipGucKir(state, ad, taban, enflasyon)`: rakibin `guc`'ünü kırar → kırılan güç **pazar payı** olarak döner (`para += kırılan×0.5×enflasyon`, `kariyer_puani += 2..6`). `guc ≤ 10` → `yenildi=true` (tek seferlik `kariyer_puani +10`, `un +4`). Her deneme `husumet += 10..20`.
- **"Adamına yaptır" (`vekil:true`):** peşin ücret (~10×enflasyon); kişisel `ahlak` yükü ve `hapis_sansi` yarıya, aranma artışı ×0.6 (sınıf aralığı değeri). Ama **"ortaya çıkma"**: %25 → işin sınıf aralığından tam değer + `un -3` + hedef rakip `husumet +25`.
- **Yıllık pasif** (`sonucuUygulaVeIlerlet` yıl bloğu, savaş kontrolünden önce): `rakiplerGuncelle` (yenilmemiş rakip `guc +0.3/yıl`, `husumet -0.5/yıl` → taban 15) + `rakipMisillemesiDene` (`husumet ≥ 55` yenilmemiş rakip, `husumet/320` ihtimalle: nakit −%10 / ün −5 / sağlık −8'den biri, sonra `husumet -20`; `hapiste`/`yolculukta` iken atlanır).
- `GET /:id/rakipler` → `RakipKarti[]` (yuvarlanmış). Client: **Görevin** ekranında "Rakiplerin" listesi (güç/husumet sözel etiket); **İşin & Yatırımların** karanlık iş kartlarında (`rakipKirmaGucu > 0` olanlarda) hedef `<select>` + "adamına yaptır" onay kutusu (`KaranlikIsKart` alt bileşeni, per-kart lokal state).

### 34.3 Hediye etme (§26 altyapısı)
- `POST /:id/envanter/:esyaId/hediye` `{hedef: "es"|"cocuk"|"ekip"|"dost", cocukIndex?, ekipId?}` → `hediyeEt`. Eşyayı `magaza_envanteri`'nden tüketir; `artis = clamp(round(tabanFiyat/12), 3, 14)` kadar ilgili puanı artırır (`es_puani` / `cocuklar[i].iliski` / `ekip[].sadakat` / `dost_puani`) + küçük mutluluk. Turu tüketmez.
- Client: `EnvanterPaneli` "sifa"/gizemli-olmayan her mağaza eşyasında "Hediye Et" butonu → hedef `<select>` (eş / yaşayan çocuklar / ekip / dost).

### 34.4 Kalıcı salgından korunma yatırımı (§27)
- **`CharacterState.salgin_korunma_yatirimi: {kademe:1|2, yil} | null`**. `GET/POST /:id/salgin-korunma`. `SALGIN_KORUNMA_TABAN_MALIYET = [0, 22, 55]` (enflasyonlu). Aktif veba varken alınamaz.
- **`vebaBaslat`** artık `etkinKoruma = max(olayda seçilen korumaSeviyesi, yatirimKademe)` kullanır ve `salgin_korunma_yatirimi`'ni **tüketir** (her dalga için yeniden yatırım gerekir). Kademe 1 = kısmi, 2 = tam korunma (VEBA_KAPMA_KADEME endeksi).
- **Backend tamamen duruyor** (endpoint + mekanik + testler değişmedi) ama **2026-09'da client'tan kaldırıldı** (kullanıcı isteği, "şimdilik oyundan kaldır") — İşin & Yatırımların ekranındaki "Salgına Hazırlık" kartları + `App.tsx`'teki `salginKorunmaGetir`/`salginKorunmaYatirimiYap` çağrıları/state'i silindi. Geri getirmek istenirse: `SalginKorunmaKarti`/`salginKorunmaGetir`/`salginKorunmaYatirimiYap` `api.ts`'te hâlâ duruyor, sadece `App.tsx`+`IsYatirimEkrani.tsx`'e yeniden bağlanması gerekir.

### 34.5 Kredi / tefeci
- **`CharacterState.kredi: Kredi | null`** — `{anapara, kalanBorc, faizOrani, yillikTaksit, alindigiYil, odenmeyenTaksit, pazarlikYapildi}`. Aynı anda tek kredi.
- `GET /:id/kredi` (`{aktifKredi, maksTutar, minTutar, teklifler}`), `POST /:id/kredi/al {teklifId}`, `POST /:id/kredi/pazarlik`. **v8.3'te teklif sistemine geçildi (aşağıdaki "v8.3" maddesi); sonraki "İki sabit kredi tutarı" maddesi ESKİDİR.**
- `krediMaksTutar` ≈ 6× yıllık maaş (tavan `KREDI_MAKS_TUTAR_TABAN=200 × enflasyonCarpani(state)`; `suc_seviyesi` yüksekse ×0.5-0.75). `krediFaizTeklifi` taban %12; borçlu/suçlu/düşük-ahlak +%2-4. `krediPazarlik` kredi başına bir kez: `~%20-70` şansla faiz −%3 (ya da ters tepip +%2).
- **İki sabit kredi tutarı (2026-09, kullanıcı isteği — "borç alınan yerde 2 farklı değer olsun, enflasyonla artsın")**: `krediKademeleri(state)` — `KREDI_KADEME_TABAN = [40, 130]` (küçük/büyük), her biri `× enflasyonCarpani(state)`, mevcut `krediMaksTutar`'a kırpılır ve enflasyonlu `KREDI_MIN_TUTAR_TABAN=20` altına düşen/tavana kırpılınca çakışan değerler elenir. `krediConfigGetir` bunu `kademeler: number[]` olarak döner. Client artık serbest sayı girişi yerine bu iki tutar için birer çip-buton gösterir (aynı `bagisKademeleri` deseni, §35). Serbest tutarla borçlanma (`POST /:id/kredi/al {tutar}`) API'de hâlâ mümkündür — sadece UI iki sabit değere indirildi.
- **`krediYillikUygula`** (yıllık, rakip misillemesinden sonra): faiz `kalanBorc`'a işler; nakit ≥ taksit ise taksit otomatik ödenir (`odenmeyenTaksit=0`), değilse `odenmeyenTaksit++` → **2**'de tefeci uyarısı, **≥3**'te el koyma (varsa en son eklenen mülk → silinir + `mulk_bakim_kalan` anahtarı; yoksa nakit + `un -10`), kredi kapanır. `kalanBorc ≤ 0` → kredi biter, olumlu mesaj.
- Client: **İşin & Yatırımların** sütun 1'de "Tefeci" bölümü (aktif kredi özeti + pazarlık butonu, ya da iki sabit tutar çipi).

### 34.6 Piyasa "şimdi al / bekle" sinyali
- `MulkKartBilgisi`'ye `piyasaSinyali: "firsat"|"zirve"|"durgun"` + `piyasaIpucu: string` eklendi. `mulkPiyasaSinyali`: güncel getiri oranı ile "nötr dünya" oranını karşılaştırır — `delta > 0.02` → zirve (bekle), `< -0.02` → fırsat (şimdi al), arası → durgun.
- Client: mülk kartında renkli tek satır sinyal + `title`'da tam ipucu. Yeni endpoint yok (mevcut `mulkConfigGetir` genişletildi).

### İstemci dosya değişiklikleri
`client/src/types.ts` (`Rakip`, `RakipKarti`, `SalginKorunmaYatirimi`, `SalginKorunmaKarti`, `Kredi`, `KrediConfig` + `CharacterState`/`KotuIsKarti`/`MulkKartBilgisi` alanları), `api.ts` (`rakiplerGetir`, `hediyeEt`, `salginKorunmaGetir`/`Yap`, `krediGetir`/`Al`/`Pazarlik`, `kotuIsYap` opts), `App.tsx` (state + `yatirimEkraniniAc`/`Yenile` genişletildi + 4 yeni handler), `components/IsYatirimEkrani.tsx` (yeniden yazıldı: `KaranlikIsKart` + Tefeci + Salgına Hazırlık bölümleri + piyasa sinyali), `components/GorevEkrani.tsx` (Rakiplerin), `components/EnvanterPaneli.tsx` (Hediye Et), `App.css` (yeni sınıflar). Yeni string'ler i18n.ts yerine bileşene gömülü TR+EN (`KARANLIK_ISLER` deseni).

## 35. Kariyer Sayfası & Yönetimle Bağlar (2026-09)

Eski **"Görevin"** (`GorevEkrani`) ekranı **"Kariyer"** (`KariyerEkrani`, ekran id `'kariyer'`) olarak yeniden adlandırıldı ve **yönetimle ilişki** sistemi eklendi. Eski **"İşin & Yatırımların"** (`IsYatirimEkrani`) ekranı yalnızca **"Yatırım"** olarak yeniden adlandırıldı (`iyBaslik`, mekaniği değişmedi). Kaynak: [gameEngine.ts](server/src/game/gameEngine.ts) `yonetim*` fonksiyonları + [stateManager.ts](server/src/game/stateManager.ts) `yonetimYillikUygula`/`yonetimTalebiUret`.

**İki ilişki hattı** (`state.yonetim_iliski` + `state.patron_iliski`, 0-100, başlangıç 40, `clampStats`'te clamp, `eskiKayitGocu` backfill). **Kural (2026-09 ikinci tur): "kralı etkilemek aşırı pahalı ve zor" — `yonetici` hattı çok daha sert, `patron` (işle ilgili kişi) aynı kaldı:**
- **yonetici** — şehri yöneten kişi. `state.hukumdar` varsa o (`K(...,"Hükümdar")`); yoksa çağa göre "Vali"/"Bölge Beyi" + `state.id`'den deterministik isim (`yonetimDeterministikIsim`).
- **patron** — mesleğe göre: Asker → Ordu Kumandanı/Karargâh Komutanı · Tüccar → Lonca Reisi/Fabrika Patronu · Din Adamı → Başrahip/Başpiskopos (Sünni İslam → Kadı) · Zanaatkâr *(2026-09 sonu)* → Loncabaşı/Atölye Sahibi.

**Etkileşimler** (`YONETIM_ETKILESIMLERI: Record<hat, ...>` — artık HAT'a göre ayrı; cooldown anahtarı `${hat}:${id}`; `%80 tam / %20 yarım` zar). **Bağış + hediye TEK "bagis"te birleşti; oyuncu tutarı seçer** (`bagisKademeleri`, enflasyonlu; body `{etkilesimId, kademe}`), ilişki kazancı = `round(kademe / bagisBolen × carpan)`:
| id | patron | yonetici (kral) |
|---|---|---|
| `bagis` 💰 | tutarlar `[8,18,40]`, bölen 2.6 (→ +3/+7/+15), cd 2y | tutarlar `[45,100,220]`, bölen 15 (→ +3/+7/+15) — **~5.5× pahalı**, cd 4y |
| `yalan` 🗣️ | ilişki +11, ahlak −6, mutluluk −4, `%25` ifşa, cd 3y | ilişki +8, ahlak −6, mutluluk −4, `%40` ifşa (kolay yakalanır), cd 4y |
| `hizmet` 🤝 | ilişki +6, kariyer_puani +3, mutluluk −1, cd 2y | ilişki +4, kariyer_puani +2, mutluluk −2, cd 3y |

**Ters tepme** (kullanıcı: "çok sık yapınca ters tepme"): her etkileşim/istek `state.yonetim_yakin_etkilesim += 1`; `yonetimYillikUygula`'da `-= yasArtisi×2` (min 0). `bikkinlik = max(0, sayaç − 3)` iken etkileşimde `min(0.6, bikkinlik×0.18)` ihtimalle **ters teper**: ilişki −8, mutluluk −3, bağış parası yine gider, `tam:false`. `YonetimDurumu.bikkinlik` istemciye döner (≥3 iken uyarı).

**İstekler** (`YONETIM_ISTEKLERI`, ilişki eşiği aşılınca açılır; ilişki harcar; zarlı — `yonetimIstekSansi`: patron `clamp(tabanSans + (iliski−minIliski)×1 + (yalan?18:0), 15, 90)`, **yonetici `egim 0.4, tavan 72`** (çok daha zor); başarısızda ilişki bedelinin yarısı yine düşer; `yalan:true` → +18 şans ama `ahlak −5, mutluluk −3` + `%22` ifşa → ilişki −20, ün −5, başarısız; per-istek cooldown `${hat}:istek:${id}`):
- **yonetici (ağır):** `vergi_kayirma` (min 75, −26, sans 40, cd 14y, `maasCarpaniUygula 1.07`) · `sicil_temizligi` (min 80, −32, sans 36, cd 16y, `suc_seviyesi = max(10, −40)`, yalnız suç ≥20) · `terfi_destegi` (min 72, −24, sans 42, cd 14y, `kariyer_puani += 18..26`) · `rakibe_darbe` (min 82, −30, sans 38, cd 12y, en güçlü yenilmemiş rakibe `rakipGucKir(...,12)`)
- **patron (değişmedi):** `sermaye_destegi` (min 60, −18, sans 65, mesleğe göre techizat +10 / sermaye +15×enf / nüfuz +8) · `zam` (min 55, −15, sans 70, `maasCarpaniUygula 1.06`) · `kredi_kefaleti` (min 60, −20, sans 65, aktif kredi `odenmeyenTaksit=0` + faiz ×0.8) · `is_baglantisi` (min 55, −14, sans 70, para +20..40×enf, kariyer_puani +6)

**Dayatılan talep** (`state.yonetim_talep`, `yonetimYillikUygula` yıllık pasif — `sonucuUygulaVeIlerlet`'te `aileYillikUygula`'nın hemen ardından): iki hat da `-0.5/yıl` soğur; `yonetim_iliski≥70` → suç −0.5/yıl, `patron_iliski≥70` → kariyer_puani +0.5/yıl. `yil ≥ yonetim_talep_sonraki_yil` & talep yok & `%13/yıl` → `yonetimTalebiUret` (rastgele hat, `%60 bagis / %40 sadakat`; bağış tutarı enflasyonlu 14-45 + servetin küçük oranı; `sonYil = yil+3..4`), sonraki eşik `yil + 6..10`. Süre dolarsa ilgili hat −14, mutluluk −4. Yanıt (`yonetimTalebiKararlastir`, `POST /:id/yonetim/talep`): **kabul** (bağışsa para düşer, hat +12, mutluluk −2) · **ret** (hat −16, mutluluk −4, ün −3) · **yalan** ("param yok"; ahlak −5, mutluluk −4; `%30` ifşa → hat −22, ün −6, bağışsa para yine gider; başarı → hat −4).

**Client:** `KariyerEkrani.tsx` — `yonetimDurum` prop'u (`GET /:id/yonetim` → `yonetimDurumGetir`), `App.tsx` `kariyerEkraniniAc` + `yonetimEtkilesimHandler(id, kademe?)`/`yonetimIstekHandler`/`yonetimTalepHandler`. **İşlem sonucu + hata artık ekrana açılır bir pencerede** (`.kariyer-sonuc-katman`/`.kariyer-sonuc-modal`, `islemMesaji`'yi izleyen `useEffect`) — üstte sabit metin/hata bandı yok (yönetim handler'ları catch'te `setIslemMesaji(temizHata(err))`). Bağış tutarı **çip satırı** (`.kariyer-bagis-kademeler`/`-cip`, hat'ın `bagisKademeleri`'nden). `bikkinlik ≥3` iken `.kariyer-bikkin-uyari`. **"Astların" bölümü UI'dan kaldırıldı** ("şimdilik" — backend `astlariGuncelle` dokunulmadı, `astlar` state hâlâ doluyor, sadece gösterilmiyor; geri getirmek = tek JSX bloğu). Etkileşim/istek adları bileşene gömülü TR+EN. Mobil: `@media(max-width:767px)` `.ekran-kariyer` altında sıkılaştırıldı (tek sütun + küçük padding/font/bar/buton). Yeni olay dosyası **yok**. Test: [yonetimBaglari.test.ts](server/tests/yonetimBaglari.test.ts) (16).
