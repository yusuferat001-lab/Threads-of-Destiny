# Kader Çarkı Referansı — Tekrar Önleme, Gecikmiş Takip, Bölgesel Bonus, Gizli Sistemler, Yatkınlık, Kişilik

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

## 36. Çapraz-Hayat Olay Tekrarı Önleme (2026-09)

§12'deki tekrar-önleme (`sonKTekrarOnlemeHesapla`) **yalnızca tek bir hayatın kendi `state.gecmis_olaylar`'ına** bakıyordu — her yeni karakter bununla sıfırdan başladığı için, aynı cihazdan art arda oynanan FARKLI hayatlarda (özellikle aynı çağ/bölge/meslek kombinasyonuyla) baştan aynı olayların çıkması tamamen olasıydı ("hep aynı olaylar çıkıyor" şikayeti). Bu turda cihaz (istemci_id) bazlı bir çapraz-hayat hafızası eklendi.

**Yeni model `IstemciOlayGecmisi`** ([schema.prisma](server/prisma/schema.prisma), migration `20260920_istemciolaygecmisi`): `{istemciId (@id), olaylar (JSON dizi, en fazla ISTEMCI_GECMIS_MAKS=400 tekil id, kronolojik), updatedAt}`. Kişisel veri yok (rastgele UUID, §32'deki `istemci_id` ile aynı kaynak).

**Depo** ([istemciGecmisRepository.ts](server/src/db/istemciGecmisRepository.ts), ateşle-unut, metrik/geri bildirim depolarıyla aynı desen):
- `istemciGecmisiOku(istemciId)` → o cihazın son hayatlarında görülen olay id'leri.
- `istemciGecmisiGuncelle(istemciId, buOmurGorulenler)` → mevcut geçmişle birleştirir, tekilleştirir (bir id tekrar görülürse EN SON görülme sırası kazanır), `ISTEMCI_GECMIS_MAKS`'a kırpar (en yeniler kalır), upsert eder.

**Akış:**
1. `CharacterState`'e iki yeni alan eklendi: `istemci_id: string | null` (bu hayatı yaratan cihazın kimliği, sabit) ve `istemci_gecmis_olaylar: string[]` (yaratılışta bir kerelik doldurulan, cihazın önceki hayatlarında görülen id'ler — hayat boyunca değişmez).
2. `yeniOyun` ([gameEngine.ts](server/src/game/gameEngine.ts)) — `istemciId` varsa `createCharacter`'dan ÖNCE `istemciGecmisiOku` ile geçmişi çeker, `createCharacter`'a (yeni iki opsiyonel parametre: `istemciId`, `istemciGecmisOlaylar`) geçirir.
3. `olaySec` ([olaySecici.ts](server/src/game/olaySecici.ts)) — normal ağırlıklı havuz seçiminde, `sonGorulenler` (K-pencereli hard-exclusion Set'i, §12) artık `state.gecmis_olaylar.slice(-K)` **VE** `state.istemci_gecmis_olaylar`'ın birleşimi. Aday havuz bu birleşimle boşalırsa (küçük tag-gated havuzda cihaz her şeyi görmüşse) zaten var olan güvenlik ağı devreye girer (`yakinTekrarEtmeyenler.length>0 ? ... : uygunlar` — tam havuza geri döner, asla kilitlenmez).
4. Ölüm anında (`sonucuUygulaVeIlerlet`, `!state.aktif` bloğu, `metrikYaz("olum")`'un hemen yanında) `istemciGecmisiGuncelle(state.istemci_id, state.gecmis_olaylar)` çağrılır — bu hayatın tüm geçmişi cihazın kalıcı deposuna yazılır.

**Bilinçli olarak dokunulmayan yer — milestone/kaskad kontrolleri (§11, `senaryoUret`):** kariyer yolu girişi, evlilik teklifi garantisi, saray daveti, mistik garanti gibi "ömürde bir kez" kontrolleri hâlâ **yalnızca** `state.gecmis_olaylar.includes(...)`'a bakar, `istemci_gecmis_olaylar`'a asla. Bunlar bilerek karıştırılmadı: aksi halde önceki hayatta saraya davet edilmiş bir cihazın YENİ karakteri bir daha hiç davet edilmeyebilirdi — bu istenen davranış değil, her hayat kendi milestone'larını garanti etmeli. Çapraz-hayat hafızası SADECE normal ağırlıklı havuzdaki (§12) tekrar sıklığını azaltır.

**Kapsam/sınırlar:** `istemci_id` opsiyoneldir (istemci `istemciId()` göndermezse — ör. eski bir client sürümü — mekanizma sessizce devre dışı kalır, `istemci_gecmis_olaylar: []`). `eskiKayitGocu` eski kayıtlara `istemci_gecmis_olaylar: []` + `istemci_id: null` backfill eder. `ISTEMCI_GECMIS_MAKS=400` (bankanın ~%27'si) — çok büyümeyip havuzu kalıcı olarak daraltmasın diye sınırlı; en yeni görülenler tutulur, eskiler doğal olarak düşer. Testler: [tekrarOnleme.test.ts](server/tests/tekrarOnleme.test.ts) "çapraz-hayat tekrar önleme" bloğu (olaySec entegrasyonu + güvenlik ağı + milestone izolasyonu) + [istemciGecmisRepository.test.ts](server/tests/istemciGecmisRepository.test.ts) (depo birleştirme/tekilleştirme/kırpma).

## 37. Gecikmiş Takip (2026-09 sonu)

Bir seçimin **15-20 yıl sonraki geri dönüşü** — "bugün yardım ettiğin dilenci yıllar sonra zengin biri olarak kapına gelir" tarzı bir mekanik. Kaynak: [gecikmisTakip.ts](server/src/data/olaylar/gecikmisTakip.ts) (90 olay: 30 tema × 3 — bkz. §7 tablosuna eklenmesi gerekir, dosya orada henüz listelenmemiş).

- Her tema (`TakipTema`) `temaUret()` ile 3 `OlayTanimi` üretir: **tetikleyici** (`gt_<anahtar>`, `gecikmisTakipOlayi:true`, normal havuzdan seçilir, iki seçenek — "yardım et"/"reddet", ikisi de `baseBasariSansi:100` yani kesin), **olumlu sonuç** (`gt_<anahtar>_iyi`, `gecikmisSonucOlayi:true`) ve **olumsuz sonuç** (`gt_<anahtar>_kotu`, aynı). Sonuç olayları normal havuzdan tamamen dışlanır (`olaySecici.ts` `uygunMu`), SADECE aşağıdaki kaskadla gelir.
- Seçilen dal `SonucEtkisi.gecikmis_takip: <sonuçOlayıId>` taşır; `sonucuUygulaVeIlerlet` bunu görünce `state.gecikmis_takipler`'e `{id, olayId, tetiklenmeYili: state.yil + rastgele(GECIKMIS_TAKIP_YIL_MIN..MAX, 15-20)}` ekler.
- `senaryoUret` kaskadında (§11'e "kural 1.5" olarak eklenmesi gerekir — tarihi savaş ilanından hemen sonra, kariyer yolu girişinden önce çalışır): `tetiklenmeYili <= state.yil` olan en eski kayıt varsa zorlanan olay olur, kuyruktan çıkar.
- **30 tetikleyici olay** ayrıca §11 kural 15'in ("standalone havuz garantisi") son adayı: 24 yaşına kadar en az 1, 37 yaşına kadar en az 2 farklı tetikleyici görülmüş olmalı.
- **Aynı temanın iki kez tetiklenmesine karşı koruma (2026-09 denetim düzeltmesi):** her tetikleyici artık kendi `<id>_cozuldu` etiketini `yasakliEtiketler`'e koyar ve seçilen dal bu etiketi `etiket_ekle` ile ekler — aksi halde (K-pencereli tekrar-önleme yalnızca SON birkaç olayı hatırladığından) uzun bir hayatta aynı tema iki kez tetiklenip aynı "yıllar sonra geri döndü" hikâyesini tekrarlayabiliyordu.
- Test: [gecikmisTakip.test.ts](server/tests/gecikmisTakip.test.ts).

## 38. Bölgeye Özgü Başlangıç Bonus/Malus + Bölgesel Olaylar (2026-09)

Kaynak: [bolgeOzellikleri.ts](server/src/data/bolgeOzellikleri.ts) (server) + [bolgeOzellikleri.ts](client/src/bolgeOzellikleri.ts) (client — yalnız bayrak kartındaki özet metni, elle senkronize). Her 8 çağ×bölge kombinasyonu için aile/yerleşim bonuslarının yanına **üçüncü bir katman** olarak eklenen dar bantlı (~±15) `para/saglik/un/ahlak/mutluluk` + `yatkinlikEtkisi` paketi — `createCharacter` ve `yatkinlikHesapla` doğrudan uygular (ölü veri değil). Her bölgenin hem bir artısı hem bir eksisi var, hiçbiri net "en iyi seçim" değil.

**80 bölgesel olay** ([bolgeselOrtaCag.ts](server/src/data/olaylar/bolgeselOrtaCag.ts) 40, [bolgeselSanayi.ts](server/src/data/olaylar/bolgeselSanayi.ts) 40 — 10/bölge) o bölgenin bonus/malus temasını yansıtan flavor olaylardır; `bolgeler`+`cag` filtresi dışında ekstra kısıt taşımazlar. **Standalone havuz garantisine (§11 kural 15) 2026-09 denetim turunda eklendi** (`BOLGESEL_HAVUZ_KONTROL_NOKTALARI`: 28 yaşına kadar 1, 47'ye kadar 2, 68'e kadar 3) — havuz her iki çağın TAMAMI (80 olay) olarak kayıtlı ama `temelUygunMu`'nun `cag`+`bolgeler` filtresi karakterin kendi 10 olaylık bölge alt-havuzu dışındaki her şeyi otomatik eler, ayrı bir çağ/bölge dallanması gerekmez. Bir oyuncu artık kendi bölgesinin flavor olaylarından en az birkaçını garanti görür. İngilizce çevirileri tam (`bolgeselOrtaCag.en.ts`/`bolgeselSanayi.en.ts`). Test: [bolgeselOlaylar.test.ts](server/tests/bolgeselOlaylar.test.ts).

## 39. Gizli/Devre Dışı İstemci Sistemleri: Gold, Günlük Seri, Kozmetik Dolap

2026-09 sonunda eklenip aynı gün **arayüzü** bir bayrakla kapatılan, ama alt mekaniği arka planda çalışmaya devam eden üç sistem — `App.tsx` başındaki tek `const GUNLUK_KOZMETIK_GOLD_GORUNUR = false;` bunların TÜM görünür UI'ını (rozet/bildirim/buton/modal) kapatır:

- **Gold** ([gold.ts](client/src/gold.ts)) — cihaz-yerel (`localStorage`), oyun-içi `para`dan tamamen bağımsız kalıcı "meta-para". Ölümde kazanılan skordan (`olumGoldHesapla`, tavan 10/ölüm) ve günlük giriş ödülünden birikir.
- **Günlük giriş serisi** ([gunlukSeri.ts](client/src/gunlukSeri.ts)) — `gunlukSeriKontrolEt()` her gün ilk açılışta (giriş ekranı mount, `App.tsx`) çalışır, 1 günlük "grace" payı olan bir seri sayacı tutar, haftalık döngüde (7 günde bir sıfırlanan) Gold ödülü verir.
- **Kalıcı kozmetik dolap** ([kozmetikKatalog.ts](client/src/kozmetikKatalog.ts) 11 eşya + [kozmetikDolabi.ts](client/src/kozmetikDolabi.ts)) — baş/sırt/çerçeve kategorilerinde, Gold ile satın alınan, oyun-içi hiçbir stat/güç etkisi olmayan salt görsel eşyalar; `KarakterAvatari` üzerinde katman olarak render edilir, `KozmetikMagaza.tsx` bileşeni mevcut ama bayrak `false` olduğu sürece hiç açılmaz.

Ayrıca **haftalık liderlik tablosu** (`GET /api/scores?...&donem=hafta`, `Score.createdAt >= haftaBaslangici()`) — bu AYRI bir özellik, bayraktan etkilenmez, her zaman açık ve çalışır durumda (§18 tablosuna eklenmesi gerekir).

Bu üç gizli sistemin arka planı çalışmaya devam ettiği için (gold birikiyor, seri sayılıyor) bayrağı `true` yapmak muhtemelen tek satırlık bir "yeniden aç" işlemi.

## 40. Mesleğe Yatkınlık Kademeleri + Yatkınlık Kaynak Limitleri (2026-09 sonu)

Kullanıcı isteğiyle üç ayrı ama ilişkili değişiklik: (1) bölge/aile/kişilik yatkınlık kaynaklarına üst-alt limit, (2) mesleğin kendi kategorisindeki yatkınlığın **4 kademeli, adlandırılmış, kalıcı** bir sisteme dönüşmesi, (3) yatkınlığın olay başarı şansına etkisinin ciddi biçimde küçültülmesi (karşılığında olay/şık gating'ine daha çok görev verilmesi). Kaynak: [data/meslekYatkinlik.ts](server/src/data/meslekYatkinlik.ts) (tüm sabitler/tablolar tek dosyada).

**Kaynak limitleri (`stateManager.ts` `yatkinlikHesapla`):** Her KAYNAK×KATEGORİ katkısı artık çalışma anında ayrı ayrı kırpılır — `BOLGE_YATKINLIK_LIMIT=6` (kullanıcının verdiği tam sayı; [bolgeOzellikleri.ts](server/src/data/bolgeOzellikleri.ts)'teki 8 satırlık ham veri de bu sınırın içine yeniden yazıldı, çalışma-anı clamp yalnız bir güvenlik ağı), `AILE_YATKINLIK_LIMIT=8`, `KISILIK_YATKINLIK_LIMIT=8` (aile 28 satır / kişilik 18 satır elle dokunulmadı — sınır yalnız kod tarafında zorlanıyor, kullanıcı tam sayı vermediği için makul bir orta değer seçildi). Sinerji bonusu (+13) ve taban doğuş rastgeleliği (-5..+5) bu limitlerin dışındadır — sınır yalnız TEKİL kaynak katkısına uygulanır, toplam yatkınlığa değil (hâlâ -30..30'a genel clamp var).

**Mesleğe Yatkınlık Kademesi (`state.meslek_yatkinlik_*`):** `mesleğiSec` çağrılırken (15 yaşında, tek seferlik), mesleğin kendi kategorisindeki (`MESLEK_KATEGORI`: Asker→savas, Tüccar→ticaret, Din Adamı→din, Zanaatkâr→zanaat) O ANKİ toplam `yatkinliklar` değeri 4 kademeden birine yerleştirilir ve BİR DAHA DEĞİŞMEZ (yatkınlık sonradan oynasa bile — doğuştan gelen bir yetenek damgası):

| Kademe | Aralık | Zar | Maaş | Tecrübe |
|---|---|---|---|---|
| Kötü | ≤ -5 | -%15 | -%10 | -%15 |
| Nötr | -4..+4 | %0 (ekranda hiç metin yok) | %0 | %0 |
| İyi | +5..+19 | +%10 | +%5 | +%7 |
| Mükemmel | ≥ +20 | +%20 | +%10 | +%15 + tek seferlik `+8` şöhret ("yeteneğin fark edildi", `YATKINLIK_MUKEMMEL_UN_BONUSU`) |

**Unvanlar** (meslek×çağ'a göre farklı, kullanıcının verdiği isimler Orta Çağ için birebir kullanıldı; Sanayi Devrimi için yeni, döneme uygun karşılıkları yazıldı):

| Meslek | Kötü (OÇ / SD) | Nötr (OÇ / SD) | İyi (OÇ / SD) | Mükemmel (OÇ / SD) |
|---|---|---|---|---|
| Asker | Savaş Korkusu / Cepheden Kaçan | Acemi Çaylak / Sıradan Er | Kılıca Yatkın / Silaha Yatkın | Doğuştan Savaşçı / Doğuştan Komutan |
| Tüccar | Pazarlıktan Anlamaz / İşten Anlamaz | Sıradan Satıcı / Vasat Esnaf | Ticari Zekası Parlak / Keskin İş Adamı | Şeytan Tüyü / Doğuştan Sermayedar |
| Din Adamı | Tam Bir Günahkâr / İnancı Sarsılmış | Arada Kalmış / Sıradan Vaiz | İnancı Sağlam / Vicdanı Güçlü | Seçilmiş Kişi / Kutsanmış Ruh |
| Zanaatkâr | Malzeme İsrafı / Elinden İş Gelmez | Sıradan Çırak / Vasat İşçi | Eli Becerikli / Usta İşi | Hünerli Eller (Doğuştan Mucit) / Doğuştan Mühendis |

`CharacterState` alanları: `meslek_yatkinlik_seviyesi` (1-4 | null, meslek seçilmediyse null), `meslek_yatkinlik_unvani` (kanonik TR, `kt()`/`K()` ile çevrilir — 32 kombinasyon [katalog.en.ts](server/src/i18n/katalog.en.ts)/[client/src/katalog.ts](client/src/katalog.ts)'e eklendi), `meslek_zar_bonusu`, `meslek_maas_carpani`, `meslek_tecrube_hizi`. **İsimlendirme notu:** kullanıcı bu üç alanı `zar_bonusu`/`maas_carpani`/`tecrube_hizi` olarak istedi; `meslek_` öneki bilinçli eklendi çünkü `SonucEtkisi.maas_carpani` zaten var olan, TAMAMEN FARKLI bir alan (olay-tabanlı, `maasCarpaniUygula`/etiket sistemini besleyen) — aynı adı CharacterState'e de eklemek gelecekte ciddi bir karışıklık kaynağı olurdu.

**Maaş entegrasyonu:** `maasCarpanKalemleri`'ne yeni bir "kariyer" grubu kalemi eklendi: `{ad:"Mesleğe yatkınlığın", carpan: 1+meslek_maas_carpani}` — hem `hesaplaMaasYillik` hem Finans ekranı kırılımına (`maasKirilimHesapla`) otomatik yansır; nötr kademede `carpan===1` olduğu için `grupKalemler`'in `carpan!==1` filtresiyle listede hiç görünmez (kullanıcı isteği: "ekranda metin yazmayacak").

**Tecrübe entegrasyonu (`gameEngine.ts`):** `meslek_tecrube_hizi`, kariyer_puani'nin İKİ kaynağına da çarpımsal biner: pasif yıllık kıdem (`KARIYER_PUANI_YILLIK * yasArtisi * (1+tecrube_hizi)`) ve kendi kategorisinde başarı bonusu (`KARIYER_PUANI_KATEGORI_BASARI * (1+tecrube_hizi)`, hem `secimUygula` hem `sosyallesmeOlayCoz` içinde).

**Olay şansı reformu (`olaySecici.ts`):** Eski davranış — `basariSansi = clamp(baseBasariSansi + yatkinliklar[olay.kategori], 5, 95)` — **kaldırıldı** (±30 puana kadar toplama yapıyordu, oyuncu bu ham sayıyı hiçbir ekranda görmediği için "görünmez ama hissedilen" aşırı bir etkiydi). Yeni formül: `basariSansi = clamp(round(baseBasariSansi × (1 + yatkinlikZarBonusOrani(state, olay.kategori))), 5, 95)` — oran yukarıdaki 4 kademeden gelir (`-0.15/0/0.10/0.20`), OLAYIN KENDİ KATEGORİSİNDEKİ güncel yatkınlığa göre HER ZAMAN dinamik hesaplanır (yalnız oyuncunun kendi mesleğiyle sınırlı değil — savaş kategorisinde bir olay çıkan Tüccar'ın savaş yatkınlığı da aynı formülü kullanır). Karakterin KENDİ mesleğinin kategorisinde bu her zaman `meslek_zar_bonusu` ile aynı sonucu verir (yatkınlık meslek seçiminden sonra değişmediği için) — iki hesap birbirinden asla sapmaz, sadece `meslek_zar_bonusu` ayrıca maaş/tecrübe kardeşleriyle birlikte kalıcı bir "kimlik" alanı olarak durur.

**Olay/şık gating altyapısı (§6, §11):** `OlayTanimi` ve `OlaySecenegi`'ye simetrik iki yeni alan eklendi: `minMeslekYatkinlikSeviye`/`maxMeslekYatkinlikSeviye` (1-4). OLAY seviyesinde `temelUygunMu`'da işlenir (meslek seçilmemiş/seviye null karakter gating'li hiçbir olayı görmez — hard filtre, tıpkı `minRutbeSeviye` gibi); SEÇENEK seviyesinde `kilitNedeni`'nde işlenir (LOCK, yani olay yine herkese çıkar ama tek bir şık kilitlenir/açılır — `gerekliKisilik` gibi hard-hide değil, `minUn`/`minAhlak` gibi kilit+`kilitAciklamasi`). Temsili bir örnek havuz eklendi ([meslekYatkinlikOlaylari.ts](server/src/data/olaylar/meslekYatkinlikOlaylari.ts), 4 olay — Asker/Tüccar/Din Adamı/Zanaatkâr birer tane, hem olay hem şık seviyesinde gating'in ikisini de örnekliyor) — bu, sistemin gerçekten çalıştığını kanıtlayan küçük bir başlangıç; kapsamı genişletmek (her meslek için daha fazla kademe-özel olay) ayrı bir sonraki iş olarak bırakıldı.

**Client:** `KisilikPaneli.tsx` (§19'daki hem `acilis` hem "Kişilik" modalı kullanımı) artık `meslekYatkinlikUnvani`/`meslekYatkinlikSeviyesi`/`meslekZarBonusu`/`meslekMaasCarpani`/`meslekTecrubeHizi` prop'larını alıyor; meslek seçilmiş VE nötr olmayan (seviye≠2) karakterlerde `🎯 <unvan>` rozeti + `Zar ±%N · Maaş ±%N · Tecrübe ±%N` satırı gösteriliyor (nötrde veya meslek seçilmeden önce hiç render edilmiyor). Yeni i18n anahtarları: `kpYatkinlikZar/Maas/Tecrube` (TR: Zar/Maaş/Tecrübe, EN: Dice/Pay/Pace).

**Eski kayıt uyumu:** `eskiKayitGocu` meslek zaten seçilmiş eski oturumlar için kademeyi mevcut `yatkinliklar`'dan geriye dönük türetir (mükemmel kademenin tek seferlik şöhret bonusu RETROAKTİF verilmez — o yalnız ilk seçim anının ödülüdür); meslek henüz seçilmemişse `null`/`0` kalır.

**Test:** [meslekYatkinlik.test.ts](server/tests/meslekYatkinlik.test.ts) — kademe eşikleri, unvan tablosu (OÇ≠SD), `mesleğiSec` kalıcılığı (yatkınlık sonradan değişse de kademe sabit kalır), maaş kırılımı entegrasyonu, yeni olay-şansı formülü (eski toplama davranışının artık üretilmediği doğrulanır), olay/şık gating, ve kaynak limitlerinin (bölge/aile/kişilik) gerçekten kırpıldığı.

## 41. Kişilik Yatkınlığı Çeşitlendirmesi + Bölge/Sinerji Görünürlüğü + Mükemmel Kademe İçeriği (2026-09 sonu)

Kullanıcı isteğiyle §40'ın disiplinini (kaynak başına 4 meslek kategorisi + üst-alt limit) **kişilik özelliklerine** de uygulayan, üstüne kişilik bonuslarını çeşitlendiren ve iki eksik görünürlük sorununu kapatan bir tur: (1) `kisilikler.ts`'teki `etkiler` artık YALNIZ savas/ticaret/din/zanaat kullanıyor — siyaset/sosyal/sağlık tamamen kaldırıldı; (2) 18 özelliğin 9'u artık saf yatkınlığın dışında bir bonus da taşıyor (maaş çarpanı / gayrimenkul getiri bonusu / üstlerle ilişki bonusu); (3) `KisilikPaneli.tsx`'te daha önce hesaplanıp hiç gösterilmeyen **bölge** ve **bölge+aile sinerjisi** yatkınlık katkıları artık rozet olarak görünüyor; (4) Mükemmel kademeye (20+) özel 8 yeni olay eklendi.

### `KisilikTanimi` şeması (server/src/data/kisilikler.ts)

```ts
export type MeslekKategorisi = "savas" | "ticaret" | "din" | "zanaat";
export interface KisilikTanimi {
  ad: string;
  celisenler: string[];
  etkiler: Partial<Record<MeslekKategorisi, number>>;
  maasCarpani?: number;               // doğuşta bir kez, ham uygulanır (maasCarpaniUygula ham=true)
  gayrimenkulBonusu?: number;         // state.gayrimenkul_getiri_bonusu'na eklenir (ör. ±0.02)
  iliskiBonusu?: { hat: "yonetici" | "patron" | "ikisi"; deger: number };  // doğuşta tek seferlik
}
```

Yeni tablo §16'daki "Kişilik Özellikleri" tablosunda güncellendi (18 satır, `savas/ticaret/din/zanaat` + varsa ekstra bonus sütunu). `KISILIK_YATKINLIK_LIMIT=8` çalışma-anı kırpması (§40) değişmeden kalır. **Cesur** bilinçli olarak `savas:10` (limit-üstü) bırakıldı — kırpma testinin (eskiden "Hırslı ticaret+12" kullanan) hâlâ gerçek bir kanıtı olsun diye; Hırslı'nın yeni değeri (`ticaret:8`) artık zaten limitte durduğu için kanıt olamazdı.

### `createCharacter` entegrasyonu (stateManager.ts)

Aile/yerleşim maaş bonusu uygulamasının hemen ardına (clampStats'tan önce) yeni bir döngü eklendi — seçilen 2 kişilik özelliğinin `maasCarpani`/`gayrimenkulBonusu`/`iliskiBonusu`'unu doğuşta bir kez uygular:
```ts
for (const ozellikAdi of kisilik) {
  const tanim = kisilikGetir(ozellikAdi);
  if (!tanim) continue;
  if (tanim.maasCarpani) maasCarpaniUygula(state, tanim.maasCarpani, true);
  if (tanim.gayrimenkulBonusu) state.gayrimenkul_getiri_bonusu += tanim.gayrimenkulBonusu;
  if (tanim.iliskiBonusu) {
    const { hat, deger } = tanim.iliskiBonusu;
    if (hat !== "patron") state.yonetim_iliski += deger;
    if (hat !== "yonetici") state.patron_iliski += deger;
  }
}
state.yonetim_iliski = clamp(state.yonetim_iliski, 0, 100);
state.patron_iliski = clamp(state.patron_iliski, 0, 100);
```
Yeni `CharacterState` alanı: `gayrimenkul_getiri_bonusu: number` (server + client `types.ts`, `eskiKayitGocu`'da `0` backfill). `hat:"ikisi"` her iki hatta da uygulanır (Yumuşak Başlı); `hat:"patron"`/`"yonetici"` yalnız kendi hattına.

### Mülk getirisi kişiselleştirmesi — imza değişikliği DEĞİL, sarmalayıcı fonksiyon

Plan aşamasında `mulkGetiriOraniHesapla(tur, ulke)`'nin imzasını `(state, tur)`'a çevirmek düşünüldü, ama uygulama sırasında bunun `gameEngine.ts`'teki `mulkPiyasaSinyali`'ni kıracağı görüldü — o fonksiyon "şimdi al / bekle" sinyali için aynı formülü hem `state.ulke` hem **sentetik, `CharacterState` OLMAYAN** bir `NOTR_ULKE` nesnesiyle iki kez çağırıyor (§34.6). İmza değişseydi bu karşılaştırma bozulurdu, üstelik `mulkVeSucSistemi.test.ts`'te 8 doğrudan çağrı `(tur, ulke)` imzasını kullanıyordu. Bunun yerine **`mulkGetiriOraniHesapla` HİÇ DEĞİŞMEDEN** korundu (yalnız doc-comment güncellendi) ve yeni, ayrı bir fonksiyon eklendi:
```ts
export function mulkGetiriOraniKisisel(state: CharacterState, tur: MulkTuru): number {
  return mulkGetiriOraniHesapla(tur, state.ulke) + (state.gayrimenkul_getiri_bonusu ?? 0);
}
```
Yalnızca gerçek üretim çağrı noktaları buna geçirildi: `gayrimenkulYillikGelirHesapla`, `mulkGelirleriUygula` (stateManager.ts) ve `mulkConfigGetir`'in önizlemesi (gameEngine.ts). `mulkPiyasaSinyali`'nin `NOTR_ULKE` karşılaştırması ve mevcut testler **kasıtlı olarak dokunulmadı** — kişisel bonus yalnız gerçek gelir hesaplarına yansır, "şimdi al / bekle" sinyaline karışmaz (sinyal zaten dünya durumuna göre, kişiden bağımsız bir zamanlama tavsiyesidir).

### Bölge + sinerji görünürlüğü (client)

Araştırmada bulundu ki `state.yatkinlik_kaynaklari` bölgenin kendi katkısını (`kaynak: state.bolge`) ve varsa sinerji kaydını (`kaynak: "<bölge> + <aile> sinerjisi"`, §16) zaten içeriyordu, ama `KisilikPaneli.tsx` yalnızca kişilik+aile rozetlerini render ediyordu — bölge/sinerji hiç görünmüyordu (oyuncu ülke bonusunu asla göremiyordu). Düzeltme:
- `KisilikPaneli` yeni bir zorunlu prop alır: `bolge: string`. Render listesi `[...kisilik, aileMeslegi]` → `[...kisilik, aileMeslegi, bolge]` oldu (🌍 ikonu, mevcut 🎭/🏠 desenine benzer).
- Sinerji kaydı sunucuda hep birleşik bir TR dizesi olarak geldiği için (`kt()` ile çevrilemez), `kaynaklar.find(k => k.kaynak.endsWith(" sinerjisi"))` ile tespit edilip ayrı bir ✨ rozet olarak, parçalarından (`kt(bolge)` + `kt(aileMeslegi)` + yeni `m.kpSinerji` son-eki) yeniden kurulan bir etiketle gösterilir.
- `App.tsx`'teki iki `<KisilikPaneli .../>` çağrısına (`acilis` ekranı + "Kişilik" modalı) `bolge={karakter.bolge}` eklendi. `i18n.ts`'e `kpSinerji: 'sinerjisi'`/`'synergy'` eklendi.

### Mükemmel kademe (20+) için 8 yeni olay

`meslekYatkinlikOlaylari.ts`'e meslek başına 2 olay eklendi (toplam 8), hepsi olay-seviyesinde `minMeslekYatkinlikSeviye: 4` ile kilitli (yalnız Mükemmel kademedeki karaktere çıkar), çağdan bağımsız, `agirlik: 1.2` (nadir kademeye ulaşan oyuncu gerçekten görsün diye hafif yükseltilmiş), her biri "riskli ama ödüllü kabul et" (gerçek `baseBasariSansi`, iki yönlü sonuç) vs. "güvenli reddet" (`baseBasariSansi:100`, §24'teki "erişilemez dal" deseni) iki seçenekli:

| Meslek | Olay ID | Tema |
|---|---|---|
| Asker | `myk_asker_muhafiz_teklifi` | Kralın şahsi muhafızı olma teklifi |
| Asker | `myk_asker_efsanevi_duello` | Rakip bir şampiyondan düello daveti |
| Tüccar | `myk_tuccar_bas_tedarikci` | Krallığın baş tedarikçisi olma teklifi |
| Tüccar | `myk_tuccar_rakip_kiskancligi` | Rakiplerin sabotaj/iftira kampanyası |
| Din Adamı | `myk_din_kutsal_gorev` | Kutsal bir emaneti koruma göreviyle seçilmek |
| Din Adamı | `myk_din_mucize_soylentisi` | Etrafında yayılan mucize söylentisi |
| Zanaatkâr | `myk_zanaatkar_saray_daveti` | Sarayın baş zanaatkârı olma daveti |
| Zanaatkâr | `myk_zanaatkar_taklitciler` | Adını kullanan sahtekârlarla yüzleşme |

Normal ağırlıklı havuzda kalırlar (yeni bir kaskad/garanti kuralı eklenmedi — Mükemmel zaten nadir bir kademe olduğu için ekstra garanti şart görülmedi). EN çevirileri [meslekYatkinlikOlaylari.en.ts](server/src/i18n/olaylar/meslekYatkinlikOlaylari.en.ts)'e eklendi; `ceviriDurumu.ts` sürüklenme sıfır.

### Test

[meslekYatkinlik.test.ts](server/tests/meslekYatkinlik.test.ts)'e eklenenler: `KISILIKLER`'in tüm `etkiler` anahtarlarının 4 kategoriyle sınırlı olduğunu doğrulayan döngü testi; `createCharacter`'ın kişilik bonuslarını (maaş etiketi, gayrimenkul bonusu, patron/yönetici ilişki artışı) doğru uyguladığını doğrulayan testler; `mulkGetiriOraniKisisel`'in `gayrimenkul_getiri_bonusu`'nu doğru yansıttığını doğrulayan test. Kırpma kanıtı testi `Hırslı` yerine `Cesur` kullanacak şekilde güncellendi.
