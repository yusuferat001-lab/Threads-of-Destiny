# CLAUDE.md — Kader Çarkı (Threads of Destiny) Motor Referansı

> **Bu dosyanın amacı:** Bu depoda çalışan bir yapay zekanın, kodu baştan keşfetmeden (48.000+ satırlık olay verisini, 1400 satırlık state motorunu vb. tekrar tekrar okumadan) oyunun tüm kurallarını, değişkenlerini ve mimarisini anlamasını sağlamak. **Bu dosya yeterli bilgiyi içeriyorsa `server/src/data/olaylar/*.ts` dosyalarını veya `stateManager.ts`'i tamamen okumaya GEREK YOK.** Belirli bir olay id'si, tam bir formül satırı veya bu dosyada geçmeyen bir ayrıntı gerekiyorsa, ilgili dosyada **grep** ile hedefli arama yap — dosyanın tamamını okumak yerine. Aşağıdaki tüm sayılar/formüller kaynak koddan birebir doğrulanmıştır (2026 itibarıyla).

## 0. Oyun Nedir

**Kader Çarkı**, Türkçe, metin tabanlı, tarihi bir hayat simülasyonudur. Oyuncu bir **çağ** (Orta Çağ ya da Sanayi Devrimi), bir **bölge/ülke** ve bir **yerleşim tipi** seçer; ailesi, kişiliği ve dini rastgele belirlenir. 15 yaşında bir **meslek** (Asker/Tüccar/Din Adamı) seçilir ve karakter, her turda sunulan bir olay + 2-4 seçenek arasından seçim yaparak yaşar. Zar atılır, sonuç uygulanır, yıllar ilerler; **ölüm kalıcıdır**. Oyun başında (yerleşim seçiminden sonra) oyuncudan bir **isim** istenir — boş bırakılırsa seçilen ülkeye uygun rastgele bir isim atanır; bu isim oyun boyunca sol üstte görünür ve ölümde skor kaydına ön-doldurulur. Ölünce liderlik tablosuna skor kaydedilebilir. **Soy sürdürme ("hanedan modu") 2026-09'da tamamen kaldırıldı** — ölüm kesin sondur, yeniden başlamak yeni bir karakter oluşturur.

## 1. Depo Yapısı & Komutlar

```
server/   Node.js + Express 5 + TypeScript + Prisma (PostgreSQL) — oyun motoru, tüm kurallar burada
client/   React 19 + Vite + TypeScript — saf useState tabanlı, Redux/Router YOK
```

Git deposu **değildir** (`.git` yok).

| Komut | Konum | Ne yapar |
|---|---|---|
| `npm run dev` | server/ | `tsx watch src/server.ts` — API sunucusu (varsayılan :3001) |
| `npm run dev` | client/ | Vite dev server (varsayılan :5180, README'de belirtilen) |
| `npm test` | server/ | `vitest run` — 31 test dosyası (bkz. §23) |
| `npm run build` / `start` | server/ | `tsc` derleme / `node dist/server.js` |
| `npm run simulate` | server/ | `scripts/simulateEconomy.ts` — ekonomiyi bin ömür simüle eder |
| `npm run analyze-olaylar` | server/ | `scripts/analyzeOlaylar.ts` — olay bankası istatistikleri (bölge/meslek/yaş dağılımı, gerçek `olaySec()` ile simülasyon) |
| `npm run build` / `lint` | client/ | `tsc -b && vite build` / `oxlint` |
| `npx prisma migrate deploy` | server/ | PostgreSQL şemasını kurar (önce yerelde bir Postgres + `DATABASE_URL` gerekir) |

`.env` (server/): `DATABASE_URL="postgresql://.../kadercarki"` (yerelde Docker Postgres ya da Neon dev branch — `.env.example`'a bak), `PORT=3001`. CORS için `CORS_ORIGIN` (virgülle ayrılmış origin listesi, yoksa `http://localhost:5173`). Geri bildirim (§29) için opsiyonel: `GERI_BILDIRIM_WEBHOOK_URL` (Discord webhook ya da Telegram sendMessage URL'si), `GERI_BILDIRIM_TELEGRAM_CHAT_ID`, `GERI_BILDIRIM_ANAHTARI` (okuma anahtarı), `GERI_BILDIRIM_DOSYA` (JSONL yolu).

## 2. Uçtan Uca Mimari

- **Oturum (session) modeli:** Her karakter bir `CharacterState` nesnesidir, `randomUUID()` ile `id` alır. Sunucu bunu iki katmanda tutar:
  1. **In-memory `Map<string, Oturum>`** (`gameEngine.ts` içindeki `oturumlar`) — aktif oyun döngüsü (mevcut senaryo, bekleyen tepki, son ton) burada tutulur, DB'de saklanmaz.
  2. **PostgreSQL `Session` tablosu** — `CharacterState` tamamen `JSON.stringify` edilip `data` sütununa yazılır (bkz. §21). Her state-mutasyonundan sonra `oturumKaydet()` çağrılır.
- **Kurtarma:** Sunucu açılışında `oturumlariYukle()` DB'deki `aktif:true` tüm oturumları belleğe yükler — sunucu yeniden başlasa bile yarım kalan oyunlar devam eder.
- **Temizlik:** Saatte bir (`server.ts`): bitmiş (`aktif:false`) ve 30 dk'dır erişilmemiş oturumlar bellekten silinir (DB'den silinmez); DB'de 7 günden eski bitmiş oturumlar tamamen silinir.
- **İstemci kalıcılığı:** `client/src/oturum.ts` sadece aktif `state.id`'yi `localStorage` içinde tutar (sayfa yenilenince kaldığı yerden devam) — hiçbir hassas veri saklanmaz. `basarimlar.ts` ayrıca, oyundan bağımsız olarak, kazanılan **ünvanları** ve **efsanevi ölümleri** `localStorage`'da kalıcı bir koleksiyon olarak biriktirir (çok-oyunluk meta-ilerleme, sunucuya kaydedilmez). `gecmisHayatlar.ts` benzer şekilde, ölen her karakterin bir özetini (isim/meslek/çağ/bölge/yaş/skor + `hayat_hikayesi` + `gecmis` grafiği) `localStorage`'da son 20 kayıtla sınırlı biriktirir — giriş ekranındaki "Geçmiş Hayatların" listesi/detayı bunu okur.
- **Rate limit:** `/api/game/*` → 60 istek/60sn; `/api/scores/*` → 10 istek/60sn (IP başına, `express-rate-limit`, `trust proxy` açık).
- **Katman akışı:** `routes/*.routes.ts` (HTTP + doğrulama) → `game/gameEngine.ts` (orkestrasyon: oturum yönetimi + zorlanan-olay kaskadı + tur çözümleme sırası) → `game/stateManager.ts` (saf mekanik fonksiyonlar/formüller) → `game/olaySecici.ts` (olay seçimi/ağırlıklandırma) → `data/olaylar/*.ts` (870 olayın statik verisi) → `db/*Repository.ts` (Prisma persistence).

## 3. API Referansı

Taban: `/api/game` (oyun) ve `/api/scores` (liderlik tablosu).

| Metot & Yol | Body | Ne yapar |
|---|---|---|
| GET `/meslekler` | – | `["Asker","Tüccar","Din Adamı"]` |
| GET `/bolgeler` | – | Çağ→bölge listesi |
| GET `/yerlesimler` | – | 3 yerleşim tanımı |
| GET `/konutlar` | – | 6 konut kademesi + taşınma maliyeti |
| GET `/yasam-secenekleri` | – | 6 yaşam tarzı kademesi |
| POST `/new` | `{cag,bolge,yerlesim,isim?}` | Yeni karakter oluşturur (`createCharacter`); `isim` opsiyonel — verilirse küfür filtresinden geçip 40 karaktere kırpılarak `state.isim`'e yazılır, verilmezse `null` |
| POST `/:id/meslek` | `{meslek}` | 15 yaşında meslek atar (tek seferlik) |
| GET `/isim-onerisi?cag=&bolge=` | – | İsim seçim ekranı için: bölge/çağa uygun kültürel tek bir isim önerir (`{isim}`) |
| GET `/:id/state` | – | Tam `CharacterState`'i döner |
| POST `/:id/scenario` | – | Bir sonraki olayı üretir (zorlanan-olay kaskadını çalıştırır, bkz. §11) |
| POST `/:id/choice` | `{secenekIndex}` | Seçimi uygular; `SecimSonucu` **ya da** `TepkiSonucu` (ara-tepki) döner |
| GET `/:id/finans` | – | Salt-okunur gelir/gider dökümü (turu tüketmez) — `maasYillik`, `giderKalemleri`, `netYillik` (= maaş − gider), `enflasyonYuzdesi`, `gayrimenkulDegeri`, `maasKirilim` (maaşın rütbe/kariyer/dönemsel kırılımı, §13), `gayrimenkulYillikGelir` (mülklerden yıllık tahmini net gelir; maaşın DIŞINDA ayrı akış — istemci "eline kalan"a ekler) ve `dunyaEtkileri` (`{ikon,metin}[]` — şu an bütçeyi/sağlığı etkileyen dünya durumlarının insan-okunur listesi: ekonomi ±%, savaş/büyük savaş, salgın aktif/iz, kıtlık/isyan/altın çağ, gıda şoku, enflasyon, zorunlu bağış eşiği (servet > 500 → kral bağış isteyebilir, §27); `dunyaFinansEtkileri(state)`, formülü açıklar HESAPLAMAZ) |
| GET `/:id/yatirim-config` | – | "Kendi işi" yatırımının güncel maliyeti |
| POST `/:id/yatirim` | – | "Kendi işi" yatırımı yapar (turu tüketmez) |
| GET `/:id/mulk-config` | – | 5 piyasa mülkünün güncel fiyat/getiri önizlemesi (+ `yillikBakimTahmini`: 7-10 yılda bir çıkan bakım/vergi masrafının yıllığa amorti edilmiş hâli, §13) |
| POST `/:id/mulk` | `{tur}` | Mülk satın alır |
| GET `/:id/dedikodu` | – | Piyasa dedikodusu satırları |
| GET `/:id/zar-kademeleri` | – | Enflasyona göre ölçeklenmiş bahis kademeleri |
| POST `/:id/zar` | `{tutar}` | Yeraltı zar masasında bahis oynar |
| POST `/:id/konut` | `{konutId}` | Konut değiştirir (turu tüketmez) |
| POST `/:id/yasam` | `{secimId}` | Yaşam tarzını değiştirir (turu tüketmez) |
| POST `/:id/ekip/:ekipId/cikar` | – | Ekip üyesini kovar (turu tüketmez) |
| GET `/:id/sosyallesme-yerleri` | – | Çağ/bölge/mesleğe uygun (ve gerçekten gösterilecek bir olayı olan) sosyalleşme mekânlarını döner (§25) |
| POST `/:id/sosyallesme` | `{yerId}` | Seçilen mekâna gider; o mekânın havuzundan bir olayı zorlanan-olay olarak kuyruğa alır (turu tüketmez, §26) |
| GET `/:id/magaza` | – | Çağa uygun mağaza kataloğunu güncel (dinamik) fiyatlarla döner (§26) |
| POST `/:id/magaza/satin-al` | `{katalogId}` | Bir mağaza eşyası satın alır; "luks" ünü hemen artırır, "sifa" envantere eklenir (turu tüketmez, §26) |
| POST `/:id/envanter/:esyaId/kullan` | – | Envanterdeki bir "sifa" eşyasını tüketir (saglik/mutluluk uygular, envanterden düşer; turu tüketmez, §26) |
| POST `/api/scores` | `{stateId,isim}` | Ölmüş karakter için liderlik tablosuna skor kaydeder (küfür filtresinden geçer) |
| GET `/api/scores?tur=genel\|en_zengin\|en_unlu` | – | Top 20 skor tablosu |
| POST `/api/geri-bildirim` | `{kategori,mesaj,iletisim?,baglam?}` | Ayarlar → "Görüş & Öneri" formu (§29). Rate limit 5/60sn. `mesaj` <3 karakterse 400; gizli `sirket` bal küpü doluysa sessizce 200 (kaydetmez). JSONL'ye yazar + `GERI_BILDIRIM_WEBHOOK_URL`'e ateşle-unut POST atar |
| GET `/api/geri-bildirim?key=…` | – | Kayıtları döner; `key` `GERI_BILDIRIM_ANAHTARI` env'iyle eşleşmezse 403 |

Tüm endpoint'ler `{hata: string}` + uygun HTTP status ile hata döner. `POST /:id/yatirim`, `/mulk`, `/konut`, `/yasam`, `/ekip/.../cikar`, `/zar`, `/sosyallesme`, `/magaza/satin-al`, `/envanter/:esyaId/kullan` **bir tur harcamaz** — oyuncu istediği an tetikleyebilir; sadece `POST /:id/choice` zamanı ilerletir (sosyalleşmede: mekâna "gitmek" turu tüketmez, ama o mekânda kuyruğa alınan olayı bir sonraki `/scenario`+`/choice` ile çözmek normal turu tüketir).

## 4. `CharacterState` — Tam Alan Sözlüğü

Kaynak: [server/src/types.ts](server/src/types.ts). Tek kaynak — client `types.ts` bunun **elle senkronize edilen bir kopyasıdır**; birini değiştirirken diğerini de güncelle.

### Kimlik & çağ/bölge
| Alan | Tip | Açıklama |
|---|---|---|
| `id` | string (UUID) | Oturum kimliği |
| `isim` | string\|null | Oyun başında `isim_sec` ekranında oyuncudan alınır (boşsa bölgeye uygun rastgele atanır); oyun HUD'unda sol üstte gösterilir, ölüm ekranındaki skor kaydına ön-doldurulur |
| `cag` | `"Orta Çağ"\|"Sanayi Devrimi"` | Doğuşta seçilir, değişmez |
| `bolge` | string | Ülke (§16'daki bölge tablosuna bakın) |
| `yerlesim` | string | Yerleşim **adı** (id değil) |
| `din_kultur` | string | Bölgeden otomatik atanır (§16) |
| `yil` | number | Oyun içi takvim yılı; çağ aralığında rastgele başlar |
| `baslangic_yili` | number | Yaratılıştaki `yil` ile aynı, sabit kalır; enflasyonun (§13) ve dünya olaylarının (§27) gerçek geçen yılı ölçmesi için referans |
| `yas` | number | 15'te başlar, `MAKS_YAS=100`'de zorunlu ölüm |

### Meslek & rütbe
| Alan | Tip | Açıklama |
|---|---|---|
| `meslek` | string | `"Asker"\|"Tüccar"\|"Din Adamı"`, 15 yaşında seçilir |
| `rutbe` | string | Güncel unvan (§14) |
| `rutbe_seviye` | 1-5 | **RATCHET — asla düşmez** (2026-08 reformu, §14). `kariyer_puani` + mesleğe özgü stat eşiğiyle + cooldown'la artar |
| `kariyer_puani` | number (monoton, ≥0) | Rütbeyi belirleyen tek sayaç: yıllık kıdem +2 · meslek-kategori başarısı +3 · kendi işine yatırım +12 (§14) |
| `son_terfi_yili` | number | Son terfinin oyun yılı; sonraki terfinin cooldown referansı. Yaratılışta `baslangic_yili` |
| `sehir_yonetim_seviyesi` | number (üst sınırsız) | Seviye **4**'e ulaşınca açılan ikinci ilerleme ekseni (§15) |
| `sehir_yonetim_unvan` | string\|null | Seviyeden türetilir |
| `amir_adi` / `amir_rutbe` | string\|null | Bir üst kademe; seviye 5'te `null` |
| `astlar` | `Ast[]` | Seviye N'de N-1 ast (S5'te 4); kalıcı, asla küçülmez |

### Kaynaklar (0-100 aralığında clamp'lenir, para hariç)
> **`saglik`/`mutluluk`/`un`/`ahlak` DAİMA tam sayıdır:** `clampStats` her tur sonunda bunları `Math.round`'lar (2026-09). Pasif sürüklenmeler (Din Adamı ün +0.4/yıl, Tüccar ahlak ±0.4, karaborsa ahlak -0.3) ve `pasifRegenEtkisi`'nin kesirli çıktısı yüzünden 43.6 gibi değerler oluşabiliyordu; `Score.un` `Int` alanı bu yüzden Prisma'da patlayıp **skor kaydını çökertiyordu** (özellikle Din Adamı). `dost_puani`/`rakip_puani`/`es_puani`/`suc_seviyesi` yuvarlanmaz (kesirli kalabilir).
| Alan | Tip | Açıklama |
|---|---|---|
| `saglik` | 0-100 | 0'a inince ölüm (relik hariç) |
| `mutluluk` | 0-100 | — |
| `para` | number (**sınırsız**, borca girebilir) | — |
| `para_birimi` | string | Çağ+bölgeye göre (§16) |
| `un` | 0-100 | Kod alanı `un` ama **arayüzde 2026-09'dan beri "Şöhret"** olarak etiketlenir (HUD rozeti, `EtkiCipleri` çipi, konut/yaşam/mağaza kartları, ölüm/geçmiş-hayat özeti). Olay `ipucu`/`mesaj` serbest metinleri hâlâ "ün" diyebilir (kör değiştirme metni bozacağı için elle taranmadı). Sayısal değer `bolgeTema.unUnvani` ile 8 kademeli bir ünvana çevrilerek gösterilir (Kimliği Belirsiz → ... → Yaşayan Efsane). Maaşa etkisi artık ayrı "ün primi" değil, §13 "İtibarın" düzenleyicisinin bir parçası |
| `ahlak` | 0-100 | — |
| `dost_puani` / `rakip_puani` | 0-100 (başlangıç 50/50) | — |
| `es_puani` | 0-100 | Sadece `es_adi` varken clamp'lenir |
| `suc_seviyesi` | 0-100 (başlangıç 0) | **TEK suç/aranma ekseni** (eski ayrı `aranma_seviyesi` alanı 2026-08'de buna katıldı). Karaborsa/zar masasından ve "suç işleyerek para kazanma" seçimlerinden (§9 adım 3.5) birikir, yılda -1 pasif azalır (§13); hapis olaylarını tetikler (§17, `minSucSeviyesi:45`); üst şeritte `bolgeTema.aranmaYildiz` ile 5 yıldıza bölünüp gösterilir, ≥45'te kırmızıya döner. **Aranma kademe bantları:** 0-19 temiz · 20-39 kademe 1 · 40-59 kademe 2 · 60-79 kademe 3 · 80-100 kademe 4 — [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) olayları `minSucSeviyesi`/`maxSucSeviyesi` ile bu bantlara kilitlenir (§17) |
| `alkol_ziyaret_sayisi` | number (başlangıç 0) | Alkollü bir sosyalleşme mekânında (meyhane/pub/ordugâh çadırı) yaşanan olay sayısı; **3**'e ulaşınca kalıcı "ayyaş" damgası vurur (§25) |

### Meslek-özel derinlik metrikleri (ilgisiz meslekte 0 kalır)
| Alan | Meslek | Açıklama |
|---|---|---|
| `ordu_mevcudu` | Asker | Asker sayısı; meslek seçilince 10, tavan `ORDU_MEVCUDU_TAVANI=300` |
| `ordu_techizat_seviyesi` | Asker | 0-100, saldırı gücünü çarpar |
| `ticaret_sermaye` | Tüccar | Ticaret kazançlarını çarpar |
| `nufuz` | Din Adamı | Dini kazançları çarpar |

### İlişkiler & aile
| Alan | Açıklama |
|---|---|
| `dost_adi` / `rakip_adi` | Doğuşta atanır, sabit |
| `anne_adi` / `baba_adi` | Doğuştan, hayat boyu sabit |
| `es_adi`, `es_meslek`, `es_rutbe` | Evlenince atanır (`es_ata` etkisiyle) |
| `cocuk_sayisi`, `cocuklar: Cocuk[]` | `{isim, dogum_yili, yasiyor}` |
| `ekip: EkipUyesi[]` | İşe alınan yardımcılar (§ aşağıda) |
| `hizip` | string\|null — katılınan hizbin adı (§16) |
| `evcil_hayvan` | `{tur, isim}` \| null |
| `unvanlar` | string[] — kazanılan kalıcı lakaplar |
| `hayat_amaci` | `HayatAmaci` — **doğuşta rastgele atanır** (§18), ölümde `tamamlandi` kontrol edilir |
| `efsanevi_olum` | string\|null — nadir/komik ölüm başlığı (rozet) |

### `EkipUyesi` (yardımcı/işe alınan)
`{id, isim, rol, gercekKalite (0-100, gizli), tahminiMin, tahminiMax (oyuncuya gösterilen bulanık aralık), maas, sadakat (0-100), kisilik (kozmetik etiket)}`. İşe alınırken: `gercekKalite` = 3 zarın ortalaması (`(rnd+rnd+rnd)/3`, uçlar nadir, ortalamaya yakın daha olası); `maas = 2 + round(gercekKalite/14)`; `sadakat = 30 + rnd*60`; işe alım ayrıca `maasCarpaniUygula(state, 1+(gercekKalite-50)/500)` ile küçük kalıcı bir maaş çarpanı uygular (2026-09'da `/250`'den zayıflatıldı; ayrıca `ham=false` olduğu için pozitif kısmı bir kez daha yarıya iner — bkz. §13 `maasCarpaniUygula`). `kisilik` şu 8 değerden biri: Sadık, Hırslı, Korkak, Kurnaz, Tembel, Cesur, Güvenilmez, Çalışkan.

### `SahipOlunanEsya` (mağazadan satın alınan somut eşya kopyası, §26)
`{id (instance UUID), katalogId, ad, simge, kategori:"sifa"|"luks", alisYili, kalanYil: number|null}`. `kalanYil`'in anlamı kategoriye göre değişir: "sifa" için kalan çürüme süresi (0'a inince eşya silinir, hiçbir etki uygulanmadan); "luks" için bir sonraki periyodik bakım masrafına kalan süre (0'a inince masraf çıkar, eşya SİLİNMEZ, sayaç sıfırlanır). Her turda geçen gerçek yıl sayısı (`yasArtisi`) kadar azalır — tur sayısından bağımsız. "luks" eşyalardan her türden en fazla 1 sahiplenilebilir.

### Ev/yaşam/finans
| Alan | Açıklama |
|---|---|
| `konut_id` | Varsayılan `basit_barinak` (§16) |
| `yasam_secimi_id` | Varsayılan `ucuza_ye` (§16) |
| `kendi_isi_yatirim_sayisi` | "Kendi işi" yatırım sayacı (maliyet eskalasyonu için, §13) |
| `mulkler: MulkTuru[]` | Sahip olunan piyasa mülkleri (her türden en fazla 1) — `"ciftlik"\|"han"\|"demirci"\|"kervan"\|"karaborsa"` |
| `mulk_bakim_kalan: Partial<Record<MulkTuru,number>>` | Her mülk için bir sonraki periyodik bakım/vergi masrafına kalan yıl (satın alınca 7-10; 0'a inince güncel değerin ~%12'si masraf, sayaç yenilenir — §13). Mülk elden çıkınca anahtar silinir |
| `magaza_envanteri: SahipOlunanEsya[]` | Mağazadan satın alınan eşyalar (§26) — gizemli eşyalardan (etiket tabanlı) ayrı, dizi tabanlı bir envanter |
| `maas_yillik` | Son hesaplanan yıllık maaş (önbellek) |

### Kişilik & yatkınlık
| Alan | Açıklama |
|---|---|
| `kisilik: [string,string]` | 16 sabit özellikten çelişmeyen 2 tanesi (§16) |
| `kisilik_eksenleri` | `{fevrilik, merhamet}` 0-100, iki uçlu eksenler (§13) |
| `yatkinliklar: Record<Kategori,number>` | -30..30, kategori bazlı başarı bonusu (§13) |
| `yatkinlik_kaynaklari` | Yatkınlığın nereden geldiğinin dökümü (oyuncuya gösterilir) |

### Dünya durumu
| Alan | Açıklama |
|---|---|
| `hukumdar` | string\|null — bölge+yıla göre (§16), her `ilerletYas` çağrısında yeniden hesaplanır |
| `bolge_bilgi` | Nüfus tahmini + flavor notlar (salt görüntüleme) |
| `haberler: string[]` | Her turda `haberleriUret()` ile yeniden üretilir |
| `ulke: UlkeDurumu` | `{savasta, vebada, ekonomi:"iyi"\|"normal"\|"kotu", kriz: {tur:"kitlik"\|"isyan"\|"altin_cag", bitisYili}\|null, nufusDurumu:"artiyor"\|"normal"\|"azaliyor"}` |
| `son_zorunlu_bagis_yili` | number\|null — arka planda tetiklenen "zorunlu bağış" olayının son tetiklendiği yıl (5 yıllık cooldown takibi, §27) |
| `buyuk_savas` | `{dusman, baslangicYili, bitisYili, vergiOrani, gidaCarpani}`\|null — aktif tekrarlayan büyük savaşın parametreleri (§27); `null` iken savaş yok |
| `son_buyuk_savas_bitis_yili` | number\|null — en son büyük savaşın bittiği yıl (10 yıllık minimum cooldown takibi, §27) |
| `veba` | `{aktif, baslangicYili, bitisYili, etkiBitisYili, konutKiraCarpani, gelirCarpani, korumaSeviyesi}`\|null — veba (§27); aktif faz bitince `aktif:false` olarak `etkiBitisYili`'ye kadar iz bırakır, sonra `null`. `korumaSeviyesi` (yama #2): 0=hiç / 1=kısmi / 2=tam koruma — yıllık ölüm risk kademesini belirler |
| `veba_gecirdi` | boolean — hayatta en az bir kez veba geçirildi mi (yama #2'den beri SALT istatistik/flavor; tetiklemeyi artık bloklamaz) |
| `son_veba_bitis_yili` | number\|null (yama #2) — en son veba dalgasının (iz fazı dahil) tamamen bittiği yıl; 20 yıllık cooldown buradan sayılır. Veba artık "ömürde bir kez" değil, dalga bitince 20 yıl sonra tekrarlanabilir |
| `kucuk_kriz_sonraki_yil` | number — bir sonraki küçük krizin (kıtlık/haydut baskını) tetikleneceği yıl eşiği (§27) |
| `gida_fiyat_sok_bitis_yili` | number\|null — küçük kriz tetiklendiğinde bu yıla kadar geçerli ×2 gıda fiyat şoku (`yil+2`, §27) |
| `borc_yardimi_alindi` | boolean — ömürde bir kez borçtayken (bütçe açığı sürerken) alınan kilise/eş dost yardımı kullanıldı mı (§13). Eski kayıtlarda `eskiKayitGocu` `false` atar |

### Meta / kayıt
| Alan | Açıklama |
|---|---|
| `etiketler: string[]` | Serbest biçimli tag sistemi — oyunun asıl "durum makinesi"dir (§9) |
| `durumlar: Durum[]` | Süreli/kalıcı pasif efektler — `{id, ad, tur:"gecici"\|"kalici", kalan_tur?, tur_basi_saglik?, tur_basi_para?, tur_basi_mutluluk?, gelir_carpani?, bitince_etiket?}` |
| `tur_sayisi` | Toplam tur (yıl değil!) sayısı — rütbe kıdemi bunu kullanır. Enflasyon **artık bunu kullanmaz** — `baslangic_yili`'den bu yana geçen gerçek yıl sayısını kullanır (§13) |
| `gecmis_olaylar: string[]` | Görülen **tüm** olay id'lerinin kronolojik listesi (sınırsız büyür) — olay seçim önceliği bunu kullanır |
| `gecmis: GecmisNoktasi[]` | `{yil,para,saglik,un}` grafiği, **en fazla 40 nokta** (eski silinir) |
| `hayat_hikayesi: HayatOlayi[]` | `{yil,yas,ikon,baslik}` — ölüm ekranı özeti, **en fazla 10 kayıt** |
| `aktif` | false olunca oyun biter |
| `olum_nedeni` | string\|null |
| `skoru_kaydedildi` | true olunca aynı oyun için ikinci skor kaydı engellenir |

## 5. `SonucEtkisi` — Olay Sonuç Şeması

Her seçeneğin `basariliSonuc`/`basarisizSonuc`'u bu şekle sahiptir (kaynak: [types.ts:215-278](server/src/types.ts)). **Yeni bir olay yazarken kullanılabilecek TÜM alanlar:**

**Temel stat delta'ları** (hepsi opsiyonel number, ± olabilir): `para, un, ahlak, saglik, mutluluk`. *Not: `para>0` ise mesleğe uygun kategoride `meslekMetrikCarpani` ile çarpılır (§13); `un` sıfır değilse jitter sonrası en az ±10'a (yarım yıldız) yuvarlanır.*

**Meslek/ilerleme:** `yeni_meslek` (kariyer değişimi), `maas_carpani` (kalıcı çarpan, `maasCarpaniUygula` ile birikir — 2026-09'dan beri pozitif katkı yarıya iner + toplam `[0.60,1.40]`'a kırpılır, §13), `sehir_yonetim_artis` (§15), `kariyer_puani_artis` (rütbe ilerlemesini hızlandırır, §14 — şu an kullanan olay yok), `ordu_techizat_artis`/`ticaret_sermaye_artis`/`nufuz_artis` (0-100 clamp, sadece techizat), `suc_artis` (TEK suç/aranma ekseni `suc_seviyesi`'ni değiştirir, ± olabilir — rüşvet/kefaret şıkları negatif verir, 0-100 clamp), `suc_seviyesi_ayarla` (`suc_seviyesi`'ni mevcut değerden bağımsız doğrudan verilen değere sabitler, 0-100 clamp — büyük baskın "temize çık / kademe 1'e in" sonuçları için).

**Ölüm:** `olum: true` (kesin), `olum_sansi: number` (0-100 taban şans; `efektifOlumSansi` ile sağlığa göre büyütülür, §13), `efsanevi_olum: string` (nadir ölüm rozet başlığı).

**Etiket/durum:** `etiket_ekle: string[]`, `etiket_sil: string[]`, `durum_ekle: Durum`, `durum_sil: string[]` (id'ye göre kaldırır).

**Dünya:** `ulke_etkisi: Partial<UlkeDurumu>` (doğrudan `Object.assign`), `kriz_baslat: {tur, sureYil}` (`bitisYili = state.yil + sureYil`), `veba_koruma: number` (yama #2 — veba başlatan bir seçenekte, `ulke_etkisi.vebada=true` ile birlikte; `vebaBaslat`'a aktarılan korunma kademesi 0/1/2, §27).

**İlişkiler:** `dost_puani`, `rakip_puani` (delta), `es_ata: true` (rastgele biriyle evlenir, `es_puani=60`, rastgele meslek/rütbe atanır), `es_puani` (delta, sadece evliyken), `es_kaybet: true` (boşanma/ölüm — `medeni:evli` etiketi silinir), `cocuk_ekle: number`, `cocuk_kaybet: true` (rastgele bir yaşayan çocuk).

**Ekip:** `ekip_ekle: {rol, tahminGenisligi}` (yeni üye, gizli kalite hesaplanır), `ekip_kaybi: true` (rastgele biri ayrılır), `ekip_sil: string` (belirli role sahip üye hedeflenir).

**Diğer sistemler:** `hizip_ata: string` (hizbe katılır), `mulk_kaybet: MulkTuru` (el koyma), `evcil_hayvan_edin: {tur?}` (yoksa edinir; tur belirtilmezse çağa uygun rastgele), `evcil_hayvan_kaybet: true`, `unvan_kazan: string` (tekrar eklenmez), `hayat_amaci_ata: {...}` (**muhtemelen ölü kod** — bkz. §25).

**Akış kontrolü:** `zorunlu_sonraki: string` (bir sonraki olay id'sini zorlar, oyuncu seçiminden bağımsız).

**Metin:** `mesaj` (zorunlu, sonuç ekranında gösterilir), `detay` (opsiyonel, `sonucAnlatimiUret`'in ilk cümlesi). İkisi de `{dost}/{rakip}/{es}/{cocuk}/{ekip}` gibi placeholder'ları destekler (§6).

## 6. Olay Tanımı Şeması

Kaynak: [server/src/data/olaylar/types.ts](server/src/data/olaylar/types.ts). Yeni bir olay eklerken bu üç tipi kullan:

### `OlayTanimi` (bir olay)
```
id, kategori: Kategori ("savas"|"ticaret"|"din"|"siyaset"|"saglik"|"sosyal"),
baslik, metin, secenekler: OlaySecenegi[],
gorsel?  (yoksa kategoriye göre emoji, bkz. olaySecici.ts KATEGORI_GORSEL)
```
**Uygunluk filtreleri** (hepsi opsiyonel; hepsi AND'lenir, bkz. §12 `uygunMu`): `cag, bolgeler[], meslekler[], minYas/maxYas, minAhlak/maxAhlak, minUn/maxUn, minMutluluk/maxMutluluk, minSaglik/maxSaglik (yama #1, düşük-can toparlanma olayları için), minRakipPuani/maxRakipPuani, minEsPuani/maxEsPuani, gerekliEtiketler[], yasakliEtiketler[], gerekliUlke (Partial<UlkeDurumu>), gerekliKisilik, gerekliDin, minRutbeSeviye, minSucSeviyesi/maxSucSeviyesi (aranma kademe bantları, §17), kacakOlayi (bool, §17), gerekliEkip (bool), gerekliEkipRolu, gerekliHizip (bool), hapisOlayi (bool), yolculukOlayi (bool)`.
**Seçim ağırlığı:** `agirlik?` (varsayılan 1), `ton?: "agir"|"hafif"` (art arda ağır olayı azaltır), `gizemli?` (salt iç kategorizasyon, filtrelemeyi etkilemez).

### `OlaySecenegi` (bir seçenek)
```
metin, baseBasariSansi (0-100), basariliSonuc, basarisizSonuc: SonucEtkisi
```
**Kilit koşulları** (kilitlenirse `kilitAciklamasi` gösterilir, bkz. §12 `kilitNedeni`): `maliyet? (para eşiği), minUn?, minAhlak?, maxAhlak?, gerekliEtiketler?[], yasakliEtiketler?[]`.
**Görünüm:** `ipucu?` (risk/ödül tek satır özeti).
**Kişilik/eksen kısıtı:** `gerekliKisilik?` (sahip olmayana seçenek hiç gösterilmez), `gerekliEksen?: {eksen:"fevrilik"|"merhamet", min?, max?}`.
**Özel mekanikler:** `onTepki?: OnTepki` (zar YOK — ara-ekran, §10), `ekipKalitesiZarBelirler?: string` (belirtilen role sahip ekip üyesinin gizli `gercekKalite`'si başarı şansının YERİNE geçer, `baseBasariSansi` yok sayılır).

### `OnTepki` (zar atmayan "duraksama" seçeneği)
```
metin (ara-ekran metni), geriCekilMetni, geriCekilSonucu: SonucEtkisi,
devamMetni, devamSonucu: SonucEtkisi
```
Bkz. §10 — bu seçenek seçilince zaman İLERLEMEZ; oyuncu geri çekil/ısrar et arasında ikinci bir (zarsız, kesin) seçim yapar, zaman O SEÇİMDE ilerler.

### `doldur()` Placeholder Listesi
Olay/seçenek metninde ve sonuç `mesaj`/`detay`'ında kullanılabilir: `{bolge} {meslek} {aile} {yil} {birim} {dost} {rakip} {es} {anne} {baba} {amir} {hayvan} {cocuk} {ekip} {komsu}`. (`{komsu}` → varsa tarihi savaş rakibi, yoksa `komsuGucSec` ile rastgele komşu güç.)

## 7. Olay Bankası Dosya Haritası

`data/olaylar/index.ts` tüm alt listeleri `OLAY_BANKASI: OlayTanimi[]` içinde birleştirir. **Toplam 1002 olay** (id sayımıyla, `_auditOlaylar` doğrulaması). Belirli bir olayı bulmak için `grep -n "id: \"<olay_id>\"" server/src/data/olaylar/*.ts` kullan — dosyayı baştan sona okuma.

| Dosya | ~Olay Sayısı | Satır | İçerik |
|---|---|---|---|
| `genel.ts` | 199 | 10442 | Meslek/çağdan bağımsız evrensel olaylar (sağlık, sosyal, hizip başlangıcı vb.) |
| `ortaCagAskerYollari.ts` | 105 | 5723 | Orta Çağ Asker **kariyer yolu** dallanması (§16 "yol:asker:*") |
| `yolculuk.ts` | 87 | 5755 | "Büyük yolculuk" zincirleri (Haçlı Seferi, Hac, Keşif, vb. — §17) |
| `ortaCagDinAdamiYollari.ts` | 85 | 4546 | Orta Çağ Din Adamı kariyer yolu dallanması ("yol:din:*") |
| `sosyallesme.ts` | 73 | 2752 | Sosyalleşme mekânları (meyhane, pub, hamam, kahvehane, kervansaray, ordugâh çadırı, cemaat sofrası, lonca meclisi, pazar meydanı, soylu salonu) — normal havuzdan tamamen dışlanır, sadece `POST /:id/sosyallesme` ile zorlanır (§25) |
| `hizip.ts` | 70 | 3416 | Hizip (faction) sistemi olayları (§16) |
| `evlilikVeAile.ts` | 66 | 3154 | Evlilik yolu + aile devamı olayları |
| `esyaVeGizem.ts` | 48 | 3020 | Gizemli eşya edinme/takip olayları (§16) |
| `hapis.ts` | 43 | 1449 | Hapis alt sistemi (§17) |
| `aile.ts` | 35 | 1779 | Aile geçmişine özel olaylar |
| `aranmaSeviyesi.ts` | 32 | ~1495 | Aranma kademesi alt sistemi — TEK eksen `suc_seviyesi`'nin bantlarına (`min/maxSucSeviyesi`) kilitli tetikleyici/kademe/baskın/kaçak olayları (§17) |
| `evcilHayvan.ts` | 28 | 1425 | Evcil hayvan olayları |
| `iliskiler.ts` | 23 | 1133 | Dost/rakip/eş ilişki olayları |
| `ortaCagTuccar.ts` | 18 | 961 | Orta Çağ Tüccar'a özel |
| `ortaCagAsker.ts` | 18 | 1011 | Orta Çağ Asker'e özel (yol-öncesi) |
| `ortaCagDinAdami.ts` | 15 | 772 | Orta Çağ Din Adamı'na özel (yol-öncesi) |
| `sanayiAsker.ts` | 13 | 694 | Sanayi Devrimi Asker'e özel |
| `sanayiDinAdami.ts` | 9 | 462 | Sanayi Devrimi Din Adamı'na özel |
| `sanayiTuccar.ts` | 8 | 457 | Sanayi Devrimi Tüccar'a özel |
| `saglikToparlanma.ts` | 8 | ~330 | **Düşük-can toparlanma olayları (yama #1)** — HEPSİ `maxSaglik:45` ile kilitli; yatak istirahati/hekim/kaplıca/aile bakımı/inziva/nekahet/gezgin doktor(Sanayi)/otacı(Orta Çağ). Bedelli ama "güvenli" seçenekleri yüksek şansla belirgin sağlık verir |
| `kureselOlaylar.ts` | 5 | ~260 | "Dünya olayları". `kuresel_veba_baslangici` (yama #2'de 3 seçenek = 3 korunma kademesi `veba_koruma` 0/1/2, para+mutluluk maliyetli, başarısızlık kademe düşürür) + 4 "salgın dönemi" bulaşma olayı (`gerekliUlke:{vebada:true}`: kapını çalan / cenaze / çarşıda temas / hasta bakıcılığı) — §27. Savaş/bağış/kriz hâlâ arka planda, olay ekranı yok |
| `komikOlumler.ts` | 14 | ~440 | **Komik/absürt ölüm olayları (2026-09).** Rastgele ani-ölüm havuzuna (`ANI_OLUM_OLAYLARI`, `ANI_OLUM_IHTIMALI`) DOKUNULMADAN oyuncu SEÇİMİYLE tetiklenen komik ölümler: fıçıyla şelale, en acı biber, heykele bıyık, arı kovanı, nefes tutma, dev kabak, buz gölü, gülle taşıma, değirmen kanadı, domuzla yarış, bez kanatlar, çürük köprü, fırtınada demir çubuk, buhar kazanı. Hepsi `ton:"hafif"`, düşük ağırlık (0.2-0.3), 2 seçenek: "aptalca olanı yap" (başarıda ufak komik ödül, başarısızlıkta `olum`/`olum_sansi` + `efsanevi_olum`) vs "yapma" (güvenli) |

`types.ts` (107 satır, şemalar) ve `index.ts` (39 satır, birleştirme) bu sayıma dahil değil.

## 8. Etiket (Tag) Taksonomisi

`state.etiketler: string[]` oyunun asıl durum makinesidir — olay uygunluğu, seçenek kilitleri ve anlatı dallanması büyük ölçüde bunun üzerinden yürür. Gözlenen önek (prefix) kalıpları:

| Önek | Anlam | Örnek |
|---|---|---|
| `medeni:` | Medeni durum | `medeni:evli` |
| `kalici:` | Kalıcı travma/durum etiketi | `kalici:dul`, `kalici:bosanmis`, `kalici:es_acisi`, `kalici:evlat_acisi`, `kalici:kronik_agri` |
| `aile:` | Aile mesleği kökeni (18 tip, §16) | `aile:soylu`, `aile:kacakci` |
| `itibar:` | Kazanılan sosyal itibar etiketi | `itibar:nufuzlu_evlilik`, `itibar:zalim_soylu` |
| `evlilik_yolu:` | Evlilik motivasyon dalı | `ask`, `mantik_soylu`, `mantik_ticari` |
| `sir:` | Gizli/karanlık geçmiş | `sir:kanli_eller`, `sir:cinayet` |
| `envanter:` / `esya:` | Gizemli eşya sahipliği (§16) | `envanter:kara_kilic`, `esya:kutsal_kalinti` |
| `bagimlilik:` | Bağımlılık durumu | `bagimlilik:kumarbaz`, `bagimlilik:var` |
| `yol:asker:` | Asker kariyer dalı (5 dal) | `sadik, isyanci, kahraman, firari, hain` |
| `yol:din:` | Din Adamı kariyer dalı (4 dal) | `durust, fanatik, tarikat, yozlasmis` |
| `hizip:<ad>` | Katılınan hizip | `hizip:Eski Muhafızlar` |
| `yerlesim:` | Doğum yerleşimi | `yerlesim:sehir`, `yerlesim:sinir`, `yerlesim:dag` |
| `tibbi:` | Tıbbi durum flag'i | `tibbi:veba_bagisik` |
| `cocuk_saglik_zamani:` | Çocuk sağlığı anlatı dalı | `iyi`, `kotu` |
| `maas_carpani:<sayi>` | Kalıcı maaş çarpanının kendisi (tek etiket, üzerine yazılır) | `maas_carpani:1.150` |
| `rakip:` | Rakip'le ilgili özel durum | `rakip:ekibe_katildi` |

**Sistem kontrollü özel etiketler** (motor tarafından okunur/yazılır, olay yazarken bunlara dikkat et):
- `hapiste` — varsa **sadece** `hapisOlayi:true` olan olaylar gösterilir (normal havuz tamamen kapanır); yoksa `hapisOlayi:true` olaylar hiç gösterilmez. Girişi genelde başarısız seçim sonuçlarından (`etiket_ekle:["hapiste"]`), çıkışı hapis-özel olaylardan başarılı seçimlerle (`etiket_sil:["hapiste"]`) olur (§17).
- `yolculukta` — aynı mantık, `yolculukOlayi:true` ile (§17). Bitişte `yolculuk_tamamlandi` de eklenir (kalıcı, bir daha yolculuk teklifi zorlanmaz).
- `kacak` — aynı kapatma mantığı, `kacakOlayi:true` ile (§17); `suc_seviyesi` ≥60 (kademe 3-4) iken bir baskın olayının başarılı sonucundan girilir (`etiket_ekle:["kacak"]`), kaçak-havuzundaki başarılı çıkış olaylarından (`etiket_sil:["kacak"]`) çıkılır.
- `sarayda`, `sehir_yonetimi_basladi`, `hizip_secildi`, `evcil_hayvan_var`, `evcil_hayvan_tur:<tur>`, `cocuk_var`, `aile_mirasi_surduruldu`, `gozlemci_var` (belirsizlik aralığını daraltır, §12), `istihbarat_var` (tek seferlik: bir sonraki senaryoda net şans gösterir, senaryoUret'te tüketilir), `tarihi_savas_gordu:<rakip>`, `yolculuk_teklifi_edildi`, `yolculuk_teklifi_zamani`, `bilgi:yasak_ilim`, `fiziksel:*` (bazı seçenekleri kalıcı kilitler).
## 9. Tur Çözümleme Sırası (kritik — sıra önemlidir)

`POST /:id/choice` → `secimUygula()` → `sonucuUygulaVeIlerlet()` ([gameEngine.ts](server/src/game/gameEngine.ts)). Tam sıra:

1. **Zar/tepki:** `onTepki` tanımlıysa zar atılmaz — `TepkiSonucu` (ara-ekran) döner, zaman ilerlemez. Aksi halde `rollSuccess(basari_sansi)` ile başarı belirlenir.
2. **Jitter:** Seçilen `SonucEtkisi` `jitterUygula()`'dan geçer: `para/ahlak/saglik/mutluluk` × rastgele 0.85-1.15; `un` aynı şekilde ama sıfır değilse `sign*max(|un|,10)` (yarım yıldız garantisi).
3. **Meslek çarpanı:** `para>0` ise ve olay kategorisi oyuncunun mesleğiyle eşleşiyorsa (`MESLEK_KATEGORI`), `meslekMetrikCarpani` ile çarpılır (§13). **Sadece kazançlara uygulanır, kayıplara değil.**
3.1. **Yolculuk kazanç zammı:** `para>0` ve `mevcutOlay.yolculukOlayi` ise ayrıca `YOLCULUK_KAZANC_CARPANI` (**×1.2**) ile çarpılır — eski kalıcı "yolculuğu bitirdin" maaş priminin (kaldırıldı) yerini alır, yalnız yolculuk sürerken kazanılan paraya biner (§17).
3.5. **Suç kazancı motor kuralı** (`sucKazanciUygula`, meslek çarpanının hemen üstüne biner): Uygulanan `etki` hem `para>0` hem `ahlak<=-5` ise ("kazanç için ahlaki taviz" imzası) → `para` ×**1.6** ("daha hızlı zengin"), ve TEK suç/aranma ekseni `suc_artis` += `round(min(tavan, 6 + |ahlak|*0.5 + para*0.15))` — normal suçta tavan **20**, ağır suçta (`ahlak<=-15` **ya da** `para>=40`) tavan **32** (bir aranma kademesini tek suçta atlayabilir). Görünür yıldız göstergesi + hapis eşiği + aranma kademe bantları hep bu tek eksenden beslenir. Olay bankasındaki ~180 böyle seçeneği elle etiketlemek yerine motorda uygulanır; `sonucAnlatimi`'ye kısa bir "iz bıraktın" cümlesi eklenir. Sabitler `gameEngine.ts` başındaki `SUC_KAZANC_*`.
4. Kategori `"savas"` ise (mesleğe bakılmaksızın çağrılır, ama sadece Asker'i etkiler): `orduKaybiUygula` — ordu mevcudunda yüzdesel kayıp.
5. Temel stat delta'ları state'e eklenir: `para, un, ahlak, saglik, mutluluk, dost_puani, rakip_puani`.
6. Meslek-özel metrikler: `ordu_techizat_artis` (0-100 clamp), `ticaret_sermaye_artis`, `nufuz_artis`, `suc_artis`.
7. `yeni_meslek`, `maas_carpani`, `sehir_yonetim_artis` (+ unvan güncelle + hayat-hikayesi kaydı) uygulanır.
8. Hayat-hikayesi (`hayat_hikayesi`) kayıtları: büyük kazanç/kayıp (`|para|>=50`), savaşa girme.
9. İlişki etkileri sırayla: `es_ata` → `es_kaybet` → `es_puani` delta → `cocuk_ekle` → `cocuk_kaybet` → `ekip_ekle` → `ekip_kaybi` → `ekip_sil` → `hizip_ata` → `evcil_hayvan_edin`/`kaybet` → `mulk_kaybet` → `unvan_kazan` → `hayat_amaci_ata` (muhtemelen ölü, §25) → `kriz_baslat` → `efsanevi_olum`.
10. `etiket_ekle` / `etiket_sil` / `ulke_etkisi` (Object.assign) / `durum_ekle` / `durum_sil` uygulanır.
11. `clampStats()` (ilk tur).
12. `zorunlu_sonraki` varsa `oturum.zorlananOlayId`'ye yazılır (bir sonraki `scenario` çağrısında zorla gelir).
13. `sonucAnlatimiUret()` (kısa: `detay` + öncelik sırasına göre TEK bağlam cümlesi) ve `zamanAnlatimiUret()` (turun pasif özeti: kazanç + tek durumsal cümle + eklenen dünya-olay mesajları) hâlâ ayrı üretilir ve payload'da döner. **Ama client sonuç ekranı 2026-09'dan beri bunları TEK metinde gösterir:** `.merkez-alt` içindeki `.tur-ozeti` = `etki.mesaj` + " " + (`zamanAnlatimi` varsa o, yoksa `sonucAnlatimi`), CSS `-webkit-line-clamp:2` ile **en fazla 2 satır** (taşan kısım `title`'da), mount'ta yavaşça yukarı kayarak belirir (`@keyframes turOzetiBelir`, ~0.24s, `prefers-reduced-motion` saygılı). Eski üç ayrı blok (`.sonuc-hikaye` + `.sonuc-detay` + "— N yıl sonra —" başlıklı `.zaman-blogu`) kaldırıldı. **`EtkiCipleri` YALNIZCA seçilen seçeneğin kendi `uygulananEtki`'sini küçük "çip" rozetleri olarak gösterir** (ikon + isim + değer: `💰 Para ±N`, `❤️ Sağlık ±N`, `🙂 Mutluluk ±N`, `⚖️ Ahlak ±N`, `🏅 Ün ±N` + `es_ata`/`cocuk_ekle` gibi bayraklar) — metin değil veri olduğu için `.tur-ozeti` metninin ÜSTÜNDE ayrı durur. Maaş/gider/yaşlanma/ev-yemek/kriz gibi tur-sonu pasif etkiler çip DEĞİL: **üst şeritteki (`UstSerit`) Yıl/Yaş/Can/Para/Mutluluk/Ahlak modülleri** değer değiştikçe yanıp söner + uçan bir `+N`/`−N` rozeti gösterir (`useGecisDeltasi` hook'u) — bu efektin süresi bilinçli olarak uzun tutuldu (delta rozeti `3s`, değer parlaması `2.5s`).
14. **Ölüm kontrolü #1:** `etki.olum===true` VEYA (`olum_sansi` varsa) `efektifOlumSansi(olum_sansi, saglik)` şansıyla zar → `checkDeath`.
15. **Karakter hâlâ hayattaysa**, yıl ilerletme bloğu çalışır:
    - a. `turSuresi` = %40 ihtimalle 1, %60 ihtimalle 2 yıl — **yolculuk olayında her zaman tam 1 yıl**.
    - b. `ilerletYas(state, turSuresi, turSuresi)` → `yas/yil/tur_sayisi` artar, `hukumdar` yeniden hesaplanır, `yas>=100` ise zorunlu ölüm.
    - c. Hükümdar değiştiyse → haber üretilir + hayat-hikayesine yazılır.
    - d. `durumlariUygula()` → tüm aktif `durumlar`'ın turluk `tur_basi_saglik/para/mutluluk` etkisi uygulanır, geçici durumların `kalan_tur` azalır (biterse `bitince_etiket` eklenir) → ölümcülse `checkDeath`.
    - e. **Hâlâ hayattaysa** `pasifEkonomiUygula()` → maaş+gider hesaplanır, borç faizi işler (§13) → `checkDeath(false)` (borç stresiyle sağlık 0'a inmiş olabilir).
    - f. **Hâlâ hayattaysa** `yaslanmaUygula()` → yaşa bağlı sağlık düşüşü (§13) → ölümcülse `checkDeath`.
    - g. **Hâlâ hayattaysa** `capraletkiUygula()` → sağlık↔mutluluk çapraz erozyonu (§13) → ölümcülse `checkDeath`.
    - h. **Hâlâ hayattaysa:** `zamanAnlatimiUret` (zaman geçişi metni) → `orduBuyumesiDene` (barışta ordu büyümesi) → `krizEtkisiUygula` (aktif kriz/altın çağ etkisi, bitmişse temizlenir) → ölümcülse `checkDeath` → `mulkGelirleriUygula` (mülk geliri/kervan batma riski) → `sucSeviyesiUygula` (pasif suç azalması) → `envanterBozulmasiUygula` (mağaza envanterinde `kalanTur` 1 azalır, 0'a inenler çürüyüp silinir — çürüyen olduysa doğrudan `zamanAnlatimi`'ye eklenen ayrı bir cümle, §26) → `sansOlayiDene` (%18 şans küçük olay) → **en fazla bir** ek bağlam cümlesi (öncelik: kriz-bitiş > şans-olayı > sağlık→mutluluk çapraz > mutluluk→sağlık çapraz > yaşlanma (%30 şans)) → **hâlâ hayattaysa** `aniOlumDene` (%0.8 şans, tamamen rastgele "saçma" ölüm) → `checkDeath`.
16. **Hâlâ hayattaysa:** `gecmisKaydet` (grafik noktası) → `rutbeGuncelle` (yalnız terfi — ratchet, çağrı başına +1 kademe, cooldown'lu; `terfiOldu=true` + kutlama yalnız artışta, §14) → `hayatAmaciKontrolEt` → `haberleriUret` (hükümdar-değişim haberi varsa başa eklenir). *(kariyer_puani'nin pasif yıllık +2'si ise adım 15/b civarında, `ilerletYas`'tan hemen sonra; meslek-kategori başarısı +3 ve `kariyer_puani_artis` adım 6 civarında uygulanır.)*
17. `clampStats()` (son güvenlik clamp'i).
18. `state.gecmis_olaylar.push(olay.id)` — bir sonraki seçim önceliği için.
19. DB'ye kaydedilir, `{state, basarili, uygulananEtki, yasArtisi, sonucAnlatimi, zamanAnlatimi, terfiOldu}` döner.

**`checkDeath` relik istisnası:** `saglik<=0` veya zorunlu ölüm tetiklendiğinde, karakterde `esya:kutsal_kalinti` (Kutsal Emanet) etiketi varsa **ölüm iptal edilir**, etiket tüketilir, `saglik = max(saglik,15)` yapılır, hayat-hikayesine "Kutsal bir emanet sayesinde ölümden döndü" yazılır. **Bir karakterde bu koruma tüm ömür boyunca sadece bir kez** işler (etiket harcanır). **`efsanevi_olum` rozeti artık YALNIZCA ölüm gerçekten gerçekleştiyse atanır** (`checkDeath` sonrası `!state.aktif` kontrolü, 2026-09) — relik `aniOlumDene`/`etki.efsanevi_olum` ölümünü iptal ettiğinde hayatta kalan karakter yaşamadığı bir "efsanevi ölüm" damgası taşımasın.

## 10. `onTepki` — Ara-Tepki Mekaniği

Bir seçeneğin `onTepki` alanı varsa: seçilince **zar atılmaz**, zaman ilerlemez; sunucu `TepkiSonucu{ara_tepki:true, olay_basligi, olay_metni, secenekler:[{metin: geriCekilMetni},{metin: devamMetni}]}` döner ve oturumda `bekleyenTepki` olarak saklanır. İstemci bunu ayrı bir ekran olarak gösterir, oyuncu 0 (geri çekil) veya 1 (ısrar et) seçer. Bu ikinci `POST /choice` çağrısı zar ATMADAN doğrudan `geriCekilSonucu`/`devamSonucu`'nu (yine jitter'lı) uygular ve **bu noktada zaman ilerler** (§9'daki tam pipeline çalışır). `basarili` bayrağı burada gerçek bir zardan gelmez — `netEtkiOlumluMu()` görünür stat delta'larının toplam işaretine bakarak kozmetik olarak belirler (sadece sonuç ekranı kutlama/düşüş efekti için). Yeni bir `scenario` üretimi bekleyen bir `onTepki`'yi her zaman iptal eder (sekme yenileme güvenliği).

## 11. Zorlanan Olay Kaskadı (`senaryoUret`)

`POST /:id/scenario` çağrıldığında, normal ağırlıklı seçime geçmeden önce **aşağıdaki sırayla** (ilk eşleşen kazanır, `!zorlananId &&` zinciri) bir dizi garanti/zorunlu olay kontrol edilir:

1. **Tarihi savaş ilanı** — savaşta değil, yaş≤55, `tarihiSavasKontrol(bolge,yil,cag)` bir rakip döndürüyor ve `tarihi_savas_gordu:<rakip>` etiketi yoksa → `dunya_savas_ilani_asker` (Asker) / `dunya_savas_ilani` (diğer); etiket eklenir.
2. **Kariyer yolu girişi** (sadece Orta Çağ) — Asker/Din Adamı, yaş≥18, henüz `yol:asker:*`/`yol:din:*` etiketi yok, giriş olayı daha önce görülmemiş → `oc_asker_yol_ilk_emir` / `oc_din_yol_ilk_sinav`.
3. **Evlilik teklifi garantisi** — yaş≥29, evli değil, ne `iliski_evlilik_teklifi` ne `iliski_ikinci_teklif` hiç görülmemiş → `iliski_evlilik_teklifi`.
4. **Şehir yönetimi girişi** — `rutbe_seviye>=4` (2026-08 rütbe reformuyla eski `>=3`'ten yükseltildi, §14), `sehir_yonetimi_basladi` etiketi yok → mesleğe göre `sehir_yonetim_{tuccar|dinadami|asker}_baslangic`.
5. **Evcil hayvan teklifi** — 20≤yaş<25, evcil hayvanı yok, teklif olayı görülmemiş → çağa göre `evcilhayvan_sahiplenme_teklifi_{sanayi|ortacag}`.
6. **Evcil hayvan takip garantisi** — evcil hayvanı var, 45≤yaş<50, `EVCIL_HAYVAN_TAKIP_OLAY_IDLERI`'den <2 görülmüş → `EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI` havuzundan (öncelik görülmemişlerde) rastgele.
7. **Gizemli eşya takip garantisi** — 38≤yaş<46, sahip olunan her `esya:`/`envanter:` etiketi için `GIZEMLI_ESYA_TAKIP_HAVUZU[esyaId]`'den hiç görülmemişse → o havuzdan rastgele (ilk eşleşen eşya kazanır).
8. **Hizip takip garantisi** — hizbe katılmış, 45≤yaş<50, hizbe özel olaylardan <3 görülmüş → o havuzdan rastgele.
9. **Saray daveti** — henüz `sarayda` değil, `un>=70 AND ahlak>=70`, `saray_kral_daveti` görülmemiş → `saray_kral_daveti`.
10. **Saray takip garantisi** — `sarayda`, 50≤yaş<58, `SARAY_OLAY_IDLERI` (6 id) 'den <2 görülmüş → havuzdan rastgele.
11. **Büyük yolculuk garantisi** (ömürde bir kez) — yaş≥22, ne `yolculukta` ne `hapiste`, `yolculuk_tamamlandi` yok, (hiç teklif edilmemiş VEYA `yolculuk_teklifi_zamani` cooldown'u dolmuş) → `uygunYolculukTeklifleri(state)` listesinden rastgele (meslek/çağ/bölge/din'e göre, §17).

Hiçbiri eşleşmezse `zorlananOlayId` `null` kalır ve normal ağırlıklı seçim (§12) çalışır. Kaskad sonunda: `bekleyenTepki` sıfırlanır, `sonTon` güncellenir, tek-seferlik `istihbarat_var` etiketi varsa tüketilir.

## 12. Olay Seçim & Ağırlıklandırma Algoritması (`olaySec`)

1. **Uygunluk filtresi** (`uygunMu`): §6'daki tüm `OlayTanimi` alanları AND'lenir. Ayrıca: `hapiste` etiketliyse SADECE `hapisOlayi:true`; `yolculukta` etiketliyse SADECE `yolculukOlayi:true` (birbirini dışlar, normal havuz tamamen kapanır).
2. **Görülmemişlik önceliği:** Uygun olaylar arasında `gecmis_olaylar.lastIndexOf(id)` (hiç görülmemişse -1) hesaplanır; en küçük (en "eski"/hiç görülmemiş) değere sahip olanlar alt-havuz olur — yani **hiç görülmemiş olaylar her zaman görülmüş olanlara kesin önceliklidir**.
3. **Ağırlıklı rastgele seçim** (`agirlikliSec`) bu alt-havuzda: ağırlık = `olay.agirlik (vars. 1)` × evlilik-özel çarpan (`iliski_evlilik_teklifi` için `1+(yas-18)*0.15`, sadece bekarken) × (önceki tur `sonTon==="agir"` ve bu olay da `ton==="agir"` ise `×0.15`, art arda ağır olayı caydırır ama imkansız kılmaz).
4. **Seçenek filtresi:** `gerekliKisilik` sahip olunmayan seçenekler tamamen gizlenir; `gerekliEksen` (fevrilik/merhamet aralığı) uymayanlar gizlenir — **ama** bu filtre oyuncuyu sıfır seçenekte bırakırsa göz ardı edilir (güvenlik).
5. **Başarı şansı:** `ekipKalitesiZarBelirler` varsa o rolün ekip üyesinin gizli `gercekKalite`'si (kişisel yatkınlık YOK SAYILIR); yoksa `clamp(baseBasariSansi + yatkinliklar[kategori], 5, 95)`.
6. **Belirsizlik aralığı** (`belirsizAralikHesapla`): genişlik yaşa göre azalır — <22:30, <30:24, <40:18, <55:14, ≥55:10 — `gozlemci_var` etiketiyle -6, evliyken `-round(es_puani/20)`; taban 6. Aralık 5'in katına yuvarlanır. `istihbarat_var` etiketi varsa aralık yerine **net değer** gösterilir (min=max).
7. **Kilit sebebi** (`kilitNedeni`, §6'daki tüm alanlar) + **sistemik kural:** `para<0` (borçluysan) iken her iki sonucunda da (`min(basariliSonuc.para, basarisizSonuc.para)`) net para çıkışı olan seçenekler otomatik kilitlenir ("Borçlusun, cebinden para çıkacak bir işe giremezsin").
8. **Çıkışsız kalma güvenliği:** Tüm seçenekler kilitliyse hepsi zorla açılır.

## 13. Sayısal Sabitler & Formüller (Cheat Sheet)

Kaynak: [stateManager.ts](server/src/game/stateManager.ts), [gameEngine.ts](server/src/game/gameEngine.ts).

**Zaman:** Tur başına 1 yıl (%40) / 2 yıl (%60); yolculuk adımı her zaman 1 yıl. `MAKS_YAS=100` (kesin tavan).

**Yaşlanma (`yaslanmaUygula`, turdaki HER yıl ayrı hesaplanır):** yaş≥75 → -10 sağlık/yıl; yaş≥65 → -7/yıl; yaş≥55 → -4/yıl; altı → 0. *(2026-09 ekonomi dengesi: başlangıç eşiği 48→55, ileri yaş -16→-10 yumuşatıldı — orta oyun nefes alsın.)*

**Pasif regen yumuşak tavanı (`pasifRegenEtkisi`, `PASIF_REGEN_TAVANI=80`, `PASIF_REGEN_TAVAN_USTU_ORAN=0.25`, `PASIF_REGEN_LIMITSIZ_ESIK=45`):** Konut + yaşam tarzının yıllık POZİTİF sağlık/mutluluk etkisi: ilgili stat **45'in altındayken hiç kısıtlanmaz** (dipteki karakter tam hızda toparlansın), 45–80 arası tam işler, 80'in üstüne taşan kısım ×0.25'e kısılır. Negatif pasif etkiler tam işler. (Yama #2: tavan 70→80, dip-limitsiz eşik eklendi.)

**İleri yaş "ecel" riski (`ecelDenemesi`, turdaki HER yıl ayrı):** yaş≥`ECEL_BASLANGIC_YASI=70`'ten itibaren, can/servet ne olursa olsun her yıl `(yas - 67) * 0.58`% doğal ölüm ihtimali (70'te ~%1.7, 76'da ~%5, 88'de ~%12, 95'te ~%16). `sonucuUygulaVeIlerlet`'te `capraletkiUygula`'dan hemen sonra kontrol edilir. Zengin bir karakterin ~100 yaş tavanına dayanmadan, dolu ama sonlu bir ömür yaşayıp ölmesini sağlar.

**Çapraz erozyon (`capraletkiUygula`):** sağlık<30 → mutluluk `-round(yasArtisi*1.5)`; mutluluk<25 → sağlık `-round(yasArtisi*1)`. (Eşikler: `KRONIK_SAGLIK_ESIGI=30`, `KRONIK_MUTLULUK_ESIGI=25`.)

**Ölüm şansı ölçekleme:** `efektifOlumSansi(taban,saglik) = min(95, taban * (1 + max(0,30-saglik)/40))` — sağlık **30** altına inince devreye girer (2026-09 ekonomi dengesi: eşik 45→30, 30-45 bandı "riskli ama ölümcül değil"), 0 sağlıkta tabanın ~1.75 katı.

**Rastgele ölüm olayları:** `ANI_OLUM_IHTIMALI=0.008` (tur başına %0.8, tamamen sağlıktan bağımsız "saçma" ölüm — saksı düşmesi, yıldırım vb., çağa özel havuzlar var). `SANS_OLAYI_IHTIMALI=0.18` (tur başına %18, küçük flavor kazanç/kayıp — bulunan para kesesi, dedikodu vb.).

**Jitter:** Tüm para/ahlak/saglik/mutluluk etkileri ×(0.85-1.15) rastgele; `un` aynı ama sıfır değilse `YARIM_YILDIZ_PUAN=10` altına düşmez.

**Maaş formülü** (`hesaplaMaasYillik`):
```
temel[meslek] (Asker 11.434 / Tüccar 12.705 / DinAdamı 10.164 — özgün 9/10/8 tabanına 2026-08'de +%10, 2026-09'da (yama #2) +%5, 2026-09 ekonomi dengesinde ayrıca +%10 → toplam ×1.2705)
× (1 + itibarToplam/100)   // "İTİBARIN" (2026-09, yama #2'de yumuşatıldı + stata göre ayrıştı): itibarDegerYuzdesi(mutluluk)+itibarUnYuzdesi(un)+itibarDegerYuzdesi(ahlak). Mutluluk/Ahlak bant: ≤25→−4 · ≤40→−2 · ≤60→0 · ≤78→+2 · >78→+4 (nötr bant 40-60). Şöhret bant: ≤8→−4 · ≤16→−2 · ≤50→0 · ≤75→+2 · >75→+4 (nötr bant DÜŞÜKTEN başlar — mütevazı karakter az tanınıyor diye cezalanmasın). TOPLANIR, tavan/taban YOK → üçü dipteyse −%12, üçü zirvedeyse +%12.
× (1 + min(tur_sayisi+8,40)*0.00375)   // KIDEM: 2026-09 ekonomi dengesinde +%0.375/tur, tavan +%15 @tur~32 (eskiden +%0.25/tur, tavan +%10). Taze karakter ~+%3 alır. Çok yavaş, gerçekçi büyüme.
× maasCarpani (kalıcı, birikimli etiket — 2026-09'dan beri TAVANLI: toplam ∈ [0.60, 1.40], bkz. maasCarpaniUygula aşağıda)
× durumlar[].gelir_carpani (çarpımsal)
× (ekonomi=kotu?0.8:iyi?1.15:1) × (savasta?0.85:1)
× enflasyonCarpani(state)   // arka planda işler ama 2026-09'dan beri oyuncuya HİÇBİR yerde yüzde olarak gösterilmez (Finans ekranı/özet paneli/dünya etkileri listesinden çıkarıldı)
× (sehir_yonetim_seviyesi>=1 ? 1.08 : 1)   // ŞEHİR YÖNETİMİ: 2026-09'da seviye×%8 (tavansız) → şehir yönetimine girildiyse SABİT +%8, seviyeyle ölçeklenmez (seviye/unvan yalnız prestij)
× rutbeMaasCarpani(rutbe_seviye)   // [1.0, 1.2, 1.44, 1.73, 2.07] S1..S5 — yama #2'de açık BİLEŞİK formüle döndü: 1.2^(seviye-1), her kademe bir öncekinin %20 üstü (§14)
→ round, taban 1
```
**`maasCarpaniUygula(state, carpan, ham=false)`** (2026-09): kalıcı `maas_carpani` etiketine katkı ekler. `ham=false` (varsayılan) → pozitif katkı **yarıya indirilir** (`1+(carpan-1)*0.5`; dağınık ~80 olay + ekip bonusunu tek noktadan kısmak için), negatif katkı aynen geçer. `ham=true` → katkı olduğu gibi (doğuş kimlik ödülleri: yerleşim farkı, aile mirası, kendi işine yatırımın +%5'i). Her durumda toplam çarpan **`[MAAS_CARPANI_TABAN=0.60, MAAS_CARPANI_TAVAN=1.40]`** bandına kırpılır. Ekip alımı çarpanı `1+(gercekKalite-50)/500` (eski `/250`), aile mirası `1.08` ham (eski `1.15`), ayyaşlık `0.95`.
Formül tek yerde: `hesaplaMaasYillik` ile `maasKirilimHesapla` (aynı dosya) ortak bir `maasCarpanKalemleri(state)` listesini kullanır — biri çarpıp yuvarlar, diğeri kalemleri **4 gruba** ayırıp Finans ekranına döner: **"rutbe"** (rütbe primi, ratchet), **"kariyer"** (kıdem + şehir yönetimi + `maasCarpani` kalıcı ödülleri — kalıcı birikim), **"itibar"** (mutluluk+şöhret+ahlak birleşik düzenleyicisi `itibarMaasKirilimi` — değişken; `MaasKirilim.itibarYuzde` + `itibarKalemler` üçünü de 0 olsa bile listeler, Finans ekranında tek başlık + alt satır olarak gösterilir, ≤ −12 iken kırmızı + "İtibarın gelirini ciddi düşürüyor" uyarısı), **"donemsel"** (enflasyon + ekonomi + savaş + salgın/`veba.gelirCarpani` + `durumlar[].gelir_carpani` — dünya durumu değiştikçe değişir; enflasyon kalemi 2026-09'dan beri hem toplama girer hem de kırılım detayından/oyuncudan gizlenir). `maasKirilim`, `finansGetir`'in dönüşüne (`FinansOzeti.maasKirilim`) eklidir.

**Yıllık gelir dalgalanması:** Turdaki her yıl ayrı ayrı `maas_yillik × (0.88-1.15 rastgele)` (2026-09 ekonomi dengesi: bant 0.75-1.25'ten daraltıldı — üst üste kötü yıl batırmasın).

**Meslek metrik çarpanı** (sadece kendi kategorisinde, sadece pozitif para'ya): Asker `1+saldiriGucu/200` (`saldiriGucu=ordu_mevcudu*(1+techizat/100)`); Tüccar `1+ticaret_sermaye/180`; Din Adamı `1+nufuz/180` (2026-08'de Tüccar/Din `/300`'den `/180`'e sertleştirildi — yatırımın geri dönüşünü hızlandırmak için).

**Ordu kaybı** (savaş kategorisi seçimlerinde, Asker): `yuzde = (basarili?0.03:0.10) × (savasta?1:0.2) × (0.5+rastgele(0-1))`; `mevcut -= round(mevcut*yuzde)`.

**Ordu barış büyümesi:** savaş yokken, turdaki her yıl %25 şansla +1 veya +2 (tavan 300).

**Enflasyon** (`enflasyonCarpani(state)`, 2026 itibarıyla çağa özel): `(1+oran) ^ (yil - baslangic_yili)` — **gerçek geçen yıla** göre bileşik büyür (tur sayısına değil), `oran` Orta Çağ'da **%1/yıl**, Sanayi Devrimi'nde **%3/yıl** (dönemin ekonomik hızlanmasını yansıtır). Maaş, giderler, mülk/yatırım/mağaza maliyetleri hep buna göre ölçeklenir. Para tutarları artık **2 ondalık basamağa** (`paraYuvarla`, `Math.round(x*100)/100`) yuvarlanır — tam sayıya değil — ki düşük Orta Çağ oranının etkisi de görünür kalsın; sağlık/mutluluk/ün/ahlak gibi istatistikler bundan etkilenmez, onlar hep tam sayı kalır. Client'ta `formatPara()` ([format.ts](client/src/format.ts)) bu ondalıkları (varsa) en fazla 2 basamakla gösterir.

**Zenginlik vergisi (pasif) — KALDIRILDI.** Eskiden nakit+gayrimenkul > 500 iken aşan kısmın %4/yıl'ı bir `giderKalemleri.vergi` kalemi olarak işliyordu (`zenginlikVergisiHesapla`, `devlet_takibinde` etiketi, `EkonomiSonucu.vergiBildirimi`) — hepsi silindi. Zenginliğin TEK bedeli artık **§27'deki "zorunlu bağış"** (servet > 500 → 5 yılda bir, %25 ihtimalle servetin %15-20'si). `gayrimenkulDegeriHesapla` hâlâ var (bağış eşiği + Finans ekranı servet dökümü için).

**Borç faizi + borç kapatma mekaniği** (`pasifEkonomiUygula`): `para<0` iken **her koşulda sağlık `-1/yıl` + mutluluk `-2/yıl`** (2026-09 ekonomi dengesi: eskiden sağlık `-2/yıl`, mutluluk cezası yoktu). Faiz duruma bağlı: netGelir (maaş−gider) > 0 ise (bütçe artıda, borcu aktif ödüyor) → faiz `|para| × 0.02 × yasArtisi` + net gelirin %25'i kadar ek anapara affı (para 0'ı geçmez); netGelir ≤ 0 ise → faiz `|para| × 0.04 × yasArtisi`.

**Ömürde bir kez borç yardımı** (2026-09 ekonomi dengesi, `pasifEkonomiUygula`): `para<0` VE bütçe hâlâ açık veriyorken (`netGelir ≤ 0`) VE `!state.borc_yardimi_alindi` ise, kilise/eş dost bir kereliğine borcun **en fazla 50** birimini (borç daha azsa tamamını) kapatır; `borc_yardimi_alindi=true` damgalanır (bir daha asla). Spiral yerine kurtulabilir bir çukur olsun diye. `EkonomiSonucu.borcYardimi` + `zamanAnlatimi`'ye + `hayat_hikayesi`'ne bir "🙏" cümlesi eklenir.

**Giderlerde enflasyon %70** (2026-09 ekonomi dengesi, `giderKalemleriHesapla`): `yasam` + `konut` giderlerine enflasyonun yalnızca `1 + (enflasyon−1)×0.7`'si uygulanır — maaş çarpanları enflasyondan yavaş büyüdüğü için tam enflasyonla şişen giderler uzun oyunda reel geliri eritiyordu. `evcilHayvan` / `savasVergisi` (maaşa endeksli) tam enflasyonda kalır.

**Meslek pasif sürüklenme (olaysız yıllarda bile):** Din Adamı `un += 0.4/yıl`; Tüccar `ahlak += (netGelir>=0 ? -0.4 : +0.4)/yıl` (bolluk ahlakı aşındırır, zorluk güçlendirir).

**"Kendi işi" yatırımı** (`kendiIsiMaliyetiHesapla`): `maliyet = round(63 × 1.22^yatirim_sayisi × enflasyonCarpani)`, 5'in katıysa +1 (yama #1'de taban 90→63, −%30; daha eski: `37 × 1.17^n`). Etki artık meslek metriğine (**techizat/sermaye/nüfuz'e**) DOKUNMAZ — sadece: **(a) `maasCarpaniUygula(state, 1.05, ham)`** → kalıcı +%5 yıllık maaş, olay/aile bonuslarıyla ortak `MAAS_CARPANI_TAVAN=1.40`'a tabi (tavana ulaşınca `yatirimYap` "işin zirvede" hatası verir); **(b) `kariyer_puani += KARIYER_PUANI_YATIRIM` (12 → 8)**. `meslekMetrikCarpani` (Asker `1+saldiriGucu/200`, Tüccar `1+ticaret_sermaye/180`, Din `1+nufuz/180`) hâlâ var ama artık yalnız olaylardan (`ordu_techizat_artis`/`ticaret_sermaye_artis`/`nufuz_artis`) + barış-büyümesi beslenir.

**Piyasa mülkleri** (`mulkGetiriOraniHesapla`, taban sabitler `NORMAL=%9, AVANTAJLI=%28, DEZAVANTAJLI=-%15`, taban_maliyet enflasyonla ölçeklenir):
- **Çiftlik** (80): kıtlıkta DEZAVANTAJLI, iyi ekonomide AVANTAJLI, yoksa NORMAL.
- **Han** (120): veba/savaşta `DEZAVANTAJLI×1.3`, (nüfus artıyor & savaş yok) AVANTAJLI, yoksa NORMAL.
- **Demirci** (100): savaş/isyanda `NORMAL×3`, yoksa `NORMAL×0.3`.
- **Kervan** (150): (savaş yok & ekonomi≠kötü) `AVANTAJLI×1.1`, yoksa `NORMAL×0.5`; **ayrıca** savaşta yıl başına %25 (×yasArtisi) tam kayıp riski (mülk tamamen elden çıkar).
- **Karaborsa** (200): (kıtlık/veba/savaş) `AVANTAJLI×1.2`, yoksa `DEZAVANTAJLI×0.5`; **ayrıca** sahiplik başına yıllık +2 suç seviyesi, -0.3 ahlak (pasif).

**Mülk periyodik bakımı/vergisi** (`mulkGelirleriUygula` içinde, luks eşya bakımıyla aynı desen): her sahip olunan mülk için `state.mulk_bakim_kalan[tur]` sayacı satın alırken **7-10 yıl** (`rastgeleMulkBakimAraligi`) ile başlar, her turda geçen yıl kadar azalır; 0'a inince mülkün GÜNCEL değerinin **~%12'si** (`MULK_BAKIM_ORANI`, `sonBasamagiDuzelt`'li) `para`'dan düşer, mülk SİLİNMEZ, sayaç yeni bir 7-10 yıla kurulur. `mulkGelirleriUygula` dönüşü artık `bakimOdemeleri: {ad,miktar}[]` da içerir (gameEngine `zamanAnlatimi`'ye "🔧 … bakım/vergi gideri ödedin" cümlesi ekler) ve `toplamNet` = getiri − bakım. Kervan batınca / `mulk_kaybet` olunca ilgili sayaç anahtarı da silinir. `mulkConfigGetir` her mülk için `yillikBakimTahmini` (bu masrafın yıllığa amorti edilmiş hâli, `mulkYillikBakimTahmini`) döner — İş & Yatırım ve Gelir & Gider ekranları "🔧 Bakım/vergi: ~-N/yıl" satırında gösterir. **30 yıllık kâr/ROI ölçümü:** `scripts/simulateGayrimenkul.ts` (§22).

**Mağaza fiyatları** (`magazaFiyatiHesapla`, §26): `fiyat = round(tabanFiyat × durumÇarpanı × enflasyonCarpani(tur_sayisi))`. `durumÇarpanı`, eşyanın kendi `fiyatEtkenleri`'nden aktif olan `ulke` durumlarının (savasta/vebada/kriz/ekonomi) çarpımıdır (tanımsız alan = 1, etkisiz) — `mulkGetiriOraniHesapla` ile aynı desen. Katalogdaki eşyalarda "sifa" krizlerde/savaşta **pahalanır** (kıtlık arzı azaltır), "luks" ise **ucuzlar** (kimse kriz sırasında mücevher almaz) ve altın çağda pahalanır — kasıtlı ters yön. Katalog ayrıca fiyat/etki açısından kademelidir: ucuz "sifa" eşyaları sadece sağlık verir (küçük miktar), pahalı olanlar hem sağlık hem mutluluk verir (büyük miktar, fiyat başına daha da verimli).

**Envanter bozulması + bakım masrafı** (`envanterBozulmasiUygula(state, yasArtisi)`, §26): Her turda, o turda geçen gerçek yıl sayısı kadar (tur sayısından bağımsız) `magaza_envanteri`'ndeki her eşyanın `kalanYil`'i azalır. "sifa" için 0'a inince eşya sessizce (etkisiz) silinir. "luks" için 0'a inince eşya SİLİNMEZ — GÜNCEL değerinin (`tabanFiyat × enflasyonCarpani`) ~%20'si kadar bir bakım/vergi masrafı `para`'dan düşer (son basamağı 0/5 olmayacak şekilde yuvarlanır, `sonBasamagiDuzelt`) ve sayaç yeniden rastgele 8-10 yıla kurulur (`LUKS_BAKIM_ARALIGI_MIN/MAX_YIL`).

**Mağaza satın alma kilidi** (`temelMagazaKilitliMi`/`TEMEL_MAGAZA_KILIT_SURESI_YIL=3`, §26): Herhangi bir "sifa" satın alımı, `state.magaza_temel_kilit_bitis_yili = state.yil + 3` yazarak TÜM "sifa" kategorisini 3 yıl kilitler (oyuncu ilaç/erzak stoklayıp sürekli sürekli alışveriş yapamasın diye). "luks" eşyalar bu kilitten etkilenmez; onların kısıtı kategori kilidi değil, kendi türünden en fazla 1 sahiplenilebilmesidir.

**Suç seviyesi (`suc_seviyesi`, TEK suç/aranma ekseni 0-100):** Pasif azalma -1/yıl her zaman. Zar masasında her el +4 (kazan/kaybet fark etmez). Karaborsa sahipliği +2/yıl. **Suç kazancı kuralı** (§9 adım 3.5): para kazandıran + `ahlak<=-5` her seçim `suc_seviyesi`'ni +6..+32 (ağırlığa göre) yükseltir ve aynı seçimde `para` ×1.6 olur. Aranma kademe bantları: 20/40/60/80 (§4, §17). [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) kefaret/rüşvet şıkları `suc_artis` negatif (-25/-45/-65) verir; büyük baskınlar `suc_seviyesi_ayarla` (10 = temiz, 30 = kademe 1) ile kesin değere sabitler.

**Test:** [sucKazanci.test.ts](server/tests/sucKazanci.test.ts) — `sucKazanciUygula` birim testleri + manastır yağması entegrasyon testi.

**Yeraltı zar masası:** Kademeler enflasyona göre ölçeklenmiş `[10,50,100]`; kazanma şansı **%40 sabit**; kazanınca bahis×2 net, kaybedince tamamı gider.

**Kriz/Altın Çağ** (`kriz_baslat` ile başlar, `bitisYili`'ye kadar her yıl): Kıtlık → sağlık **-1**/yıl (yama #1'de -2→-1; `dunyaFinansEtkileri` metni de -1'e güncellendi); İsyan → para-3/yıl, un-1/yıl; Altın Çağ → para+4/yıl, mutluluk+1/yıl. Küçük kriz süresi de kısaldı: 2-3 → **1-2 yıl** (`KUCUK_KRIZ_SURE_MIN_YIL=1`).

**Konut/yaşam tarzı:** Turu tüketmez. Konutta **daha pahalıya** geçişte `TASINMA_MALIYETI=3` tek seferlik ücret (ucuza geri çekilme ücretsiz); yaşam tarzı değişimi her zaman ücretsiz/anlık. Yeni karakter varsayılanı 2026-09 ekonomi dengesinde **`normal_ev` + `normal_ye`** — ikisi de sağlık/ün açısından TAMAMEN NÖTR: ev/sofra ekranını hiç açmayan sıradan oyuncu ilk 15-20 yıl boyunca sessizce sağlık/itibar kaybetmesin. Başlangıç parası 30. En ucuz 2 konut/sofra kademesinin cezası da yumuşatıldı: -4/-3 → **-2/yıl** (§16).

**Skor** (yama #1'de yeniden yazıldı): `servet = para + gayrimenkulDegeriHesapla(state)`; `servetFaktoru = servet>0 ? 1+log10(1+servet) : max(0.15, 1+servet/400)`; `skor = round(yas × max(un,1) × servetFaktoru)`, hayat amacı tamamlandıysa **×5**. Eski `× max(para,1)` çarpanı tek zengin ömrü milyonlara fırlatıp liderlik tablosunu domine ediyordu + borçlu bitişleri 1'e ezip ayırt edilemez kılıyordu; log-ölçek ikisini de çözdü (servet 100→~3.0, 500→~3.7, 8M→~7.9; borç küçük ama gerçek bir ceza).

## 14. Rütbe / Kariyer Sistemi (2026-08 reformu — 5 kademe)

Kaynak: [rutbeler.ts](server/src/data/rutbeler.ts). **Eski 3-kademeli, `para` eşikli, her tur sıfırdan hesaplanan (düşebilen) sistem tamamen değişti.** Yeni model:

**Tek monoton sayaç `kariyer_puani`** (CharacterState, asla azalmaz) rütbeyi belirler. Kaynakları ([rutbeler.ts](server/src/data/rutbeler.ts) sabitleri):
- `KARIYER_PUANI_YILLIK = 2` → hayatta geçen her yıl (pasif kıdem; `sonucuUygulaVeIlerlet` yıl bloğunda `× yasArtisi`).
- `KARIYER_PUANI_KATEGORI_BASARI = 3` → mesleğine uygun kategoride (`MESLEK_KATEGORI`: Asker→savas, Tüccar→ticaret, Din Adamı→din) **başarılı** olunan her olay.
- `KARIYER_PUANI_YATIRIM = 8` (2026-09'da 12'den düşürüldü — yatırım artık pahalı ve tavanlı) → kendi işine yapılan her yatırım (`yatirimYap`).
- `SonucEtkisi.kariyer_puani_artis` → kilit taşı olaylar doğrudan puan verebilir (şu an kullanan olay yok, altyapı hazır).

**5 kademe, meslek×çağ'a göre unvan** (eşikler çağdan bağımsız, sadece unvan metni değişir):

| Meslek | Unvanlar (Orta Çağ / Sanayi) | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| Asker | Er→Onbaşı→Silahşor→Kumandan→Serdar / Er→Onbaşı→Çavuş→Yüzbaşı→Binbaşı | kp 10, ün 20 | kp 24, ün 32 | kp 44, ün 42 | **kp 210, ün 72** |
| Tüccar | Çırak Tüccar→Seyyar Satıcı→Pazarcı→Lonca Ustası→Lonca Reisi / Kâtip Çırak→Tezgâhtar→Şirket Ortağı→Fabrika Patronu→Sanayi Baronu | kp 10, ün 10 | kp 24, ün 17 | kp 44, ün 25 | **kp 210, ün 50** |
| Din Adamı | Acemi Rahip→Rahip→Vaiz→Başrahip→Piskopos / Papaz Yrd.→Papaz→Vaiz→Başpapaz→Piskopos | kp 10, ahlak 50 | kp 24, ahlak 58 | kp 44, ahlak 66 | **kp 210, ahlak 86** |

*Sünni İslam din_kultur: `Medrese Talebesi→Müezzin→Vaiz→İmam→Baş İmam` (her iki çağ, eşikler aynı).*

Her kademe **hem** `kariyer_puani` **hem** mesleğe özgü statı ister (`esikKarsilaniyorMu`): Asker & Tüccar **ün** (her kademede), Din Adamı **ahlak**. `para` koşulu KASITLI OLARAK YOK (sürekli harcanan nakde bağlı bir eşik sessiz rütbe kaybına yol açıyordu). S4→S5 sıçraması bilinçli olarak büyük (kp 44→**210**; 2026-09 ekonomi dengesinde 160'tan yükseltildi — ömürler ~20 yıl uzayınca S5 %2.4→%12.8'e fırlamıştı, 210 onu tekrar "nadir zirve"ye çekti). **S5 nadir bir zirvedir; 2026-09 simülasyonunda genel oran ~%0.4, Para-odaklı bot dolu ömürde ~%4, diğer kişilikler ≈%0** (bkz. §22 `simulateKisilikler`).

**Terfi cooldown'u** (`TERFI_COOLDOWN = {2:0, 3:2, 4:2, 5:8}`): bir sonraki kademeye çıkmak için son terfiden bu kadar oyun yılı geçmiş olmalı (`state.yil - state.son_terfi_yili >= cooldown`). `rutbeGuncelle` ayrıca **çağrı başına en fazla +1 kademe** ilerletir — üst üste terfi olmaz.

**RATCHET — rütbe ASLA DÜŞMEZ.** `kariyer_puani` (azalmaz zaten) veya ün/ahlak çökse bile `rutbe_seviye` korunur. `rutbeGuncelle` her tur çağrılır ama yalnız yukarı hareket eder. `terfiOldu` bayrağı + `🎖️` kutlama mesajı yalnız artışta üretilir.

**Maaş primi** (`RUTBE_MAAS_CARPANI`, yama #2'de açık BİLEŞİK formüle döndü: `1.2^(seviye-1)` → `[1.0, 1.2, 1.44, 1.73, 2.07]` S1..S5): her kademe bir öncekinin %20 üstü, baz maaşa göre ayrı bir +%X değil. `hesaplaMaasYillik` çarpımına `rutbeMaasCarpani(rutbe_seviye)` olarak girer (ün, kıdem, şehir yönetimi, enflasyon çarpanlarıyla üst üste biner).

**Astlar:** seviye N'de `N-1` ast (S5'te 4), kendinden düşük unvanları taşırlar, isimleri sabit; liste asla küçülmez. **Amir:** bir üst kademeden; **seviye 5'te amir yoktur** (`amir_adi=null`, hükümdar en tepede).

**Client:** İşin & Yatırımların ekranında ([IsYatirimEkrani.tsx](client/src/components/IsYatirimEkrani.tsx)) kademe göstergesi 5 nokta + "Rütbe nasıl yükselir?" ipucu kutusu (`.rutbe-ipucu`): "işine yatırım yap + ününü/ahlakını yüksek tut + zamanla kıdem". Geriye dönük uyum: `eskiKayitGocu` (stateManager) eski DB kayıtlarına `kariyer_puani` (≈ `tur_sayisi*2 + kendi_isi_yatirim_sayisi*12`), `son_terfi_yili` (`baslangic_yili`), `mulkler` (→ `[]`), `baslangic_yili` (→ `yil`) ve `mulk_bakim_kalan` (sahip olunan her mülke rastgele 7-10 yıl) backfill eder — mülk/enflasyon alanları Finans ekranında doğrudan `.length`/aritmetik/anahtar erişimiyle kullanıldığı için; `gameEngine.oturumGetir`/`oturumlariYukle` çağırır.

**Testler:** [rutbe.test.ts](server/tests/rutbe.test.ts) (pür fonksiyon) + [scripts/verifyRutbe.ts](server/scripts/verifyRutbe.ts) (motor entegrasyonu, `npm test` PostgreSQL geçişinde kırık olduğu için bağımsız `npx tsx` doğrulaması).

## 15. Şehir Yönetimi (Post-Max-Rank İlerleme)

`rutbe_seviye>=4` olunca (§11 kural 4, 2026-08 reformuyla eski `>=3`'ten yükseltildi — 5 kademeli merdivende S4 "başarılı kariyer" eşiğidir) açılan, **üst sınırı olmayan** ikinci eksen. `sehir_yonetim_seviyesi` sadece `sehir_yonetim_artis` etkisiyle artar (belirli olaylardan). Unvan tablosu (4 isimli kademe, sonrası sayısal):

| Meslek | Kademe 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|
| Asker | Bölge Komutanı | Ordu Generali | Savaş Konseyi Üyesi | Krallığın Kalkanı | "Krallığın Kalkanı (Seviye N)" |
| Tüccar | Ticaret Baronu | Lonca Reisi | Şehrin Hazine Nazırı | Ticaret İmparatoru | "Ticaret İmparatoru (Seviye N)" |
| Din Adamı | Piskopos Vekili | Baş Piskopos | Kutsal Meclis Üyesi | Ruhani Önder | "Ruhani Önder (Seviye N)" |

**Maaş etkisi (2026-09):** Şehir yönetimine **bir kez girmek** maaşa kalıcı, **SABİT +%8** katar (`sehirYonetimMaasCarpani = seviye>=1 ? 1.08 : 1`). Eskiden `1 + seviye*0.08` (tavansız, seviyeyle büyüyen) idi; artık seviye/unvan **yalnız prestij içindir**, maaşa ek katkısı yoktur.

## 16. Statik İçerik Katalogları

### Çağ / Bölge / Din / Para Birimi
| Çağ | Yıl Aralığı | Bölgeler (din_kultur → para_birimi) |
|---|---|---|
| Orta Çağ | 1050-1260 | Fransa (Katolik→Livre), Kutsal Roma (Katolik→Mark), Bizans (Ortodoks→Hiperpiron), Selçuklu (Sünni İslam→Dirhem), Eyyubiler (Sünni İslam→Dinar) |
| Sanayi Devrimi | 1800-1870 | İngiltere (Anglikan→Sterlin), Fransa (Katolik→Frank), Osmanlı (Sünni İslam→Kuruş), Rusya (Ortodoks→Ruble) |

Hükümdar/lider verisi [liderler.ts](server/src/data/liderler.ts) (yıl aralığına göre gerçek tarihe esinli isimler), tarihi savaş pencereleri [tarihiSavaslar.ts](server/src/data/tarihiSavaslar.ts) (§11 kural 1'i besler + piyasa dedikodusunda gerçek bir "gelecek savaş" öngörüsü verir, `gelecekSavasKontrol`, ufuk 8 yıl) — bu iki dosya salt flavor/lookup verisi, gerekmedikçe okumaya gerek yok.

### Yerleşim (3, doğuşta seçilir)
| id | Sağlık | Para | Maaş × | Yatkınlık | Yaşam maliyeti × |
|---|---|---|---|---|---|
| Şehir Merkezi | -10 | 0 | ×1.10 | ticaret+8, sosyal+8, sağlık-5 | ×1.02 |
| Sınır Bölgesi | 0 | +8 | ×0.95 | savaş+10, ticaret-5 | ×1.00 |
| Dağ Başı | +5 | -10 | ×0.90 | sağlık+8, sosyal-10 | ×0.98 |

*(2026-09: Maaş farkı ±%20'den ±%10'a çekildi — Sınır −%5 aynı kaldı. Bu doğuş kimliği çarpanı `maasCarpaniUygula`'ya `ham` verilir: yarıya indirme + tavandan muaf.)*

### Aile Mesleği (18 tip, doğuşta ağırlıklı rastgele seçilir — `agirlik` alanı)
Her satır: para/sağlık/ün/ahlak başlangıç bonusu + yatkınlık etkisi. `devamMeslegi` varsa, oyuncu o mesleği seçerse "aile mirası sürdürüldü" bonusu (+10un, +15para, ×1.15 kalıcı maaş) alır.

| id (agirlik) | Çağ kısıtı | Devam Mesleği | para | sağlık | ün | ahlak |
|---|---|---|---|---|---|---|
| ciftci (1.5) | – | – | -10 | +15 | -8 | +8 |
| asker (1.2) | – | Asker | +5 | +12 | +10 | -12 |
| kole (0.8) | – | – | -25 | -5 | -20 | +20 |
| soylu (0.9) | – | – | +55 | -5 | +40 | -30 |
| sanatci (1.0) | – | – | -18 | -3 | +18 | +5 |
| fabrika_iscisi (1.4) | Sanayi | – | -12 | -15 | -5 | +18 |
| tuccar (1.2) | – | Tüccar | +60 | -5 | +12 | -15 |
| din_adami (1.1) | – | Din Adamı | -12 | -3 | +15 | +25 |
| zanaatkar (1.3) | – | – | +18 | +8 | -10 | +5 |
| hekim (0.9) | – | – | -15 | +15 | +8 | +5 |
| denizci (1.0) | – | – | +10 | +10 | -3 | -15 |
| madenci (1.0) | – | – | +22 | -18 | -5 | +10 |
| kacakci (0.9) | – | – | +40 | +5 | -22 | -18 |
| tefeci (0.8) | – | – | +80 | -2 | -18 | -25 |
| katip (1.0) | – | – | -8 | -12 | +15 | +12 |
| cellat (0.6) | – | – | +25 | +8 | -25 | -12 |
| saray_hizmetkari (1.0) | – | – | +8 | -5 | +16 | -12 |
| surgun (0.9) | – | – | -8 | +8 | -22 | +15 |

(`fabrika_iscisi` ayrıca kalıcı `Durum` verir: "Tozlu Ciğerler" `tur_basi_saglik:-1`.)

### Kişilik Özellikleri (16 sabit, doğuşta çelişmeyen 2 tanesi seçilir)
Kaynak: [kisilikler.ts](server/src/data/kisilikler.ts). Her özellik `KATEGORI` bazlı yatkınlık etkisi + `celisenler` (aynı karakterde asla birlikte olmaz) taşır:

| Özellik | Çelişir | Etkiler |
|---|---|---|
| Sinirli | Sakin | savaş+8, sosyal-10, sağlık-5 |
| Sakin | Sinirli | sağlık+8, siyaset+5, savaş-5 |
| Kibirli | Vicdanlı | siyaset+10, sosyal-8, din-8 |
| Alaycı | Yumuşak Başlı | siyaset+5, sosyal-5, din-10 |
| Umutlu | Umutsuz, Depresif, Hüzünlü | sağlık+8, sosyal+8 |
| Umutsuz | Umutlu, Hırslı | sağlık-10, sosyal-5 |
| Depresif | Umutlu, Hırslı | sağlık-15, sosyal-10 |
| Cesur | – | savaş+15, siyaset+5 |
| Hüzünlü | Umutlu | din+8, sosyal-8 |
| Sosyal | İçedönük | sosyal+15, ticaret+8 |
| İçedönük | Sosyal | sosyal-15, din+8 |
| Sivri Dilli | Yumuşak Başlı | sosyal-10, siyaset+8 |
| Yumuşak Başlı | Sivri Dilli, Alaycı | din+8, savaş-10, sosyal+5 |
| Rekabetçi | – | ticaret+10, savaş+8, siyaset+5 |
| Hırslı | Umutsuz, Depresif | ticaret+12, siyaset+10, sosyal-5 |
| Vicdanlı | Kibirli | din+12, sağlık+5, ticaret-8 |

Ayrıca iki uçlu **kişilik eksenleri** (`kisilik_eksenleri`, seçenek gating için kullanılır, §12): `fevrilik` (0=planlayıcı, 100=fevri) ve `merhamet` (0=zalim, 100=barışçıl). Taban `50 + rastgele(-10..+10)`, sonra seçilen 2 özelliğin `FEVRILIK_ETKI`/`MERHAMET_ETKI` katkısı eklenir (ör. Sinirli fevrilik+20, Sakin fevrilik-20, Yumuşak Başlı merhamet+18, Kibirli merhamet-15), 0-100 clamp.

### Yatkınlık (`yatkinliklar`, -30..30, kategori başına başarı şansı bonusu)
Kaynak: her kategoride taban `rastgele(-5..+5)`, + seçilen 2 kişilik özelliğinin `etkiler`i + aile'nin `yatkinlikEtkisi`'si + yerleşimin `yatkinlikEtkisi`'si, toplanıp -30..30'a clamp'lenir. `yatkinlik_kaynaklari` bu katkıların dökümünü oyuncuya gösterir.

### Konut (6 kademe, `konut_id`, turu tüketmeden değiştirilebilir) — 2026-09 ekonomi dengesi
| id (varsayılan→**normal_ev**) | Kira/yıl | Sağlık/yıl | Mutluluk/yıl | Ün/yıl |
|---|---|---|---|---|
| basit_barinak | 1 | **-2** | **-2** | **-2** |
| ahsap_ev | 3 | **-2** | **-2** | **-2** |
| normal_ev *(varsayılan)* | 5 | – | +1 | – |
| tas_ev | 10 | +1 | +1 | +2 |
| konak | 19 | +2 | +2 | +4 |
| sato | 32 | +3 | +4 | +6 |

Taşınma ücreti (sadece daha pahalıya geçişte): **3**. En ucuz 2 kademenin cezası 2026-09 ekonomi dengesinde -4/-3 → **-2/yıl** yumuşatıldı; varsayılan artık `normal_ev` (nötr).

### Yaşam Tarzı (6 kademe, `yasam_secimi_id`, ücretsiz/anlık değiştirilebilir) — 2026-09 ekonomi dengesi
`YasamSecenegiTanimi`'ye `unEtkisiYillik` eklendi (`pasifEkonomiUygula`'da konut ünüyle aynı satırda uygulanır).
| id (varsayılan→**normal_ye**) | Maliyet/yıl | Sağlık/yıl | Mutluluk/yıl | Ün/yıl |
|---|---|---|---|---|
| copten_topla | 0 | **-2** | **-2** | **-2** |
| ucuza_ye | 2.5 | **-2** | **-2** | **-2** |
| normal_ye *(varsayılan)* | 5 | – | – | – |
| iyi_ye | 8 | +2 | +1 | – |
| kaliteli_ye | 13 | +3 | +2 | – |
| ziyafet_gibi_ye | 20 | +3 | +4 | +1 |

**Başlangıç statları** (`createCharacter`, aile/yerleşim bonusları ayrıca eklenir; yama #2): mutluluk **50**, ahlak **50**, şöhret(un) **20**, sağlık 100, para **30**. Üçü de itibar maaş bandında nötr başlar (§13).

### Piyasa Mülkleri (5 tür, her türden en fazla 1, taban maliyet enflasyonla ölçeklenir)
| tur | Ad | Taban Maliyet | Avantajlı | Dezavantajlı |
|---|---|---|---|---|
| ciftlik | Buğday Tarlası | 80 | İyi ekonomi | Kıtlık |
| demirci | Demirci Atölyesi | 100 | Savaş/isyan | Uzun barış |
| han | Şehir Hanı | 120 | Nüfus artışı+barış | Veba/savaş |
| kervan | Ticaret Kervanı | 150 | Barış+bolluk | Savaş (batma riski) |
| karaborsa | Karaborsa Deposu | 200 | Kıtlık/veba/savaş | Barış/bolluk |

Tam getiri formülleri §13'te.

### Mağaza Eşyaları (10 tanım: 6 şifa + 4 lüks, §26; fiyat dinamik, §13)
Kaynak: [magazaEsyalari.ts](server/src/data/magazaEsyalari.ts). "sifa" bozulur (`omurYil` yıl sonra çürür, 7-12 arası, kademeli olarak ucuz=sadece sağlık/pahalı=sağlık+mutluluk); "luks" bozulmaz ama her ~8-10 yılda bir bakım masrafı çıkarır ve türünden en fazla 1 sahiplenilebilir (§13/§26).

| id | Kategori | Çağ | Taban Fiyat | Etki | Ömür (yıl) |
|---|---|---|---|---|---|
| kaliteli_erzak | sifa | – | 16 | saglik+6 | 7 |
| sifali_otlar | sifa | Orta Çağ | 24 | saglik+9 | 8 |
| eczane_ilaci | sifa | Sanayi | 27 | saglik+10 | 8 |
| sifali_merhem | sifa | – | 39 | saglik+13, mutluluk+5 | 10 |
| kuvvet_surubu | sifa | Sanayi | 44 | saglik+11, mutluluk+9 | 10 |
| baharatli_carasi | sifa | – | 58 | saglik+9, mutluluk+17 | 12 |
| ipek_hali | luks | – | 95 | un+6 | – |
| nadide_tablo | luks | – | 135 | un+8 | – |
| degerli_mucevher | luks | – | 175 | un+10 | – |
| antika_eser | luks | – | 240 | un+14 | – |

### Evcil Hayvanlar
Türler: Orta Çağ → Kedi/Köpek/Şahin; Sanayi → Kedi/Köpek/Papağan. İsim havuzu 12 sabit isim (Boncuk, Tekir, Duman, Şeker, Pamuk, Zeytin, Kömür, Fındık, Minnoş, Bulut, Toprak, Yıldız). Takip olayları §11 kural 6'da.

### Gizemli Eşyalar (15 tanım, `envanter:`/`esya:` etiketiyle taşınır)
Kaynak: [gizemliEsyalar.ts](server/src/data/gizemliEsyalar.ts) (garanti havuzu) + [client/src/envanter.ts](client/src/envanter.ts) (görüntüleme): Ejderha Tılsımı, Kara Kılıç, Melek Tüyü, Mucize İksir, Ölünün Yüzüğü, Gölge Sikke, Gizemli Harita, Hazine Haritası, Bulunmuş Hazine, Kutsal Emanet (`esya:kutsal_kalinti` — ölümden koruma relik'i, §9), Lanetli Altın, Manastırın Kara Kedisi, Atadan Kalma Kılıç, Fısıldayan Taş, Eski Bir Ayna. Sadece 5'inin garanti takip-olay havuzu var (§11 kural 7): `melek_tuyu, kutsal_kalinti, lanetli_altin, fisildayan_tas, eski_ayna`.

### Hizipler (3 meslek çifti, `hizip.ts`'de `hizip_ata` ile atanır)
| Meslek | Seçenek A | Seçenek B |
|---|---|---|
| Asker | Eski Muhafızlar | Yeni Nizam |
| Tüccar | Liman Loncası | Pazar Birliği |
| Din Adamı | Gelenekçiler | Yenilikçiler |

### Kariyer Yolları (sadece Orta Çağ, §11 kural 2 ile girilir)
- **Asker** (`yol:asker:*`): sadik, isyanci, kahraman, firari, hain — [ortaCagAskerYollari.ts](server/src/data/olaylar/ortaCagAskerYollari.ts) (5723 satır, 105 olay).
- **Din Adamı** (`yol:din:*`): durust, fanatik, tarikat, yozlasmis — [ortaCagDinAdamiYollari.ts](server/src/data/olaylar/ortaCagDinAdamiYollari.ts) (4546 satır, 85 olay).

Bu iki dosya devasa dallanan zincirlerdir — belirli bir dalın içeriği gerekmedikçe okuma, `grep "yol:asker:kahraman"` gibi hedefli ara.

### Evlilik Yolları (`evlilik_yolu:*`)
`ask` (aşk evliliği), `mantik_soylu` (statü/asalet güdümlü), `mantik_ticari` (çıkar/ticaret güdümlü) — evlilik teklifi olayındaki seçime göre atanır, sonraki evlilik olaylarının tonunu belirler.

### İsim Havuzları
[npcIsimleri.ts](server/src/data/npcIsimleri.ts) — 8 bölge için kültüre uygun erkek/kadın isim listeleri + çağa göre genel yedek havuz. Dost/rakip/eş/amir/ast isimleri cinsiyet gözetmeden tüm havuzdan; anne/baba cinsiyete uygun havuzdan seçilir.

## 17. Hapis, Yolculuk & Aranma Kademesi Alt Sistemleri

Üçü de benzer bir mekanik kalıp kullanır: bir etiket (veya sayısal eşik) normal olay havuzunu **tamamen kapatıp** kendi özel havuzuna geçirir (§12 `uygunMu`).

**Hapis:** `suc_seviyesi>=45` gated tutuklama olayları ([hapis.ts](server/src/data/olaylar/hapis.ts) `minSucSeviyesi:45`) VE birçok sıradan olayın başarısız sonucundan (`etiket_ekle:["hapiste"]`, ör. `aile.ts`, `hapis.ts` içindeki riskli seçimler) girilir. İçerideyken sadece `hapisOlayi:true` (43 olay) gösterilir: kaçış girişimleri, rüşvet, af dilekçesi vb. — başarılı seçim `etiket_sil:["hapiste"]` ile çıkarır, başarısız olan içeride tutar (bazıları ek sağlık/ün cezası verir).

**Yolculuk:** §11 kural 11 ile ömürde bir kez teklif edilir (mesleğe göre `uygunYolculukTeklifleri`: Asker Haçlı Seferi/Savunma Seferi/Sömürge Seferi, Tüccar Coğrafi Keşif/Mucit Turnesi/Sömürge Seferi, Din Adamı dinine göre Hac). Kabul edilirse `yolculukta` etiketlenir, sadece `yolculukOlayi:true` (87 olay, [yolculuk.ts](server/src/data/olaylar/yolculuk.ts)) gösterilir, **her adım tam 1 yıl** sürer (4-5 yıllık yolculukta 5-10 adım hedeflenir). Reddedilirse `yolculuk_teklifi_edildi` etiketiyle bir "durum" eklenir, birkaç tur sonra `bitince_etiket:"yolculuk_teklifi_zamani"` ile tekrar sorulur. Tamamlanınca `yolculukta` silinir + `yolculuk_tamamlandi` eklenir (kalıcı — ikinci bir yolculuk asla zorlanmaz, ama tekrar reddedilip kabul de edilemez zaten teklif gelmez). **Yolculuk kazanç zammı:** Eskiden yolculuğu bitiren karakter kalıcı bir `maas_carpani:1.2` primi alıyordu (22 kapanış dalında); bu **kaldırıldı**. Yerine: `yolculukOlayi:true` bir olayda kazanılan pozitif `para`, `sonucuUygulaVeIlerlet`'te motor kuralı olarak **×1.2** (`YOLCULUK_KAZANC_CARPANI`, `meslekMetrikCarpani`'nin hemen üstüne biner, `sucKazanciUygula`'dan önce) — yani zam yalnız yolculuk sürerken elde edilen paraya, kalıcı bir maaş etkisi bırakmadan uygulanır.

**Aranma Kademesi:** Ayrı bir eksen **değildir** — TEK suç/aranma ekseni olan `suc_seviyesi`'nin (0-100, §4) bantlarıdır (eski `aranma_seviyesi` 0-4 alanı 2026-08'de buna katıldı). Bantlar: **0-19 temiz · 20-39 kademe 1 · 40-59 kademe 2 · 60-79 kademe 3 · 80-100 kademe 4**. Kendi özel havuzu [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) (32 olay) kademeli bir tırmanış anlatır: temiz bandda rastgele "tetikleyici" olaylar (`maxSucSeviyesi:19` — devriye durdurması, meyhane kavgası vb.) başarısız sonuçla `suc_artis:+25` verip kademe 1'e çıkarabilir; her kademe kendi `minSucSeviyesi`/`maxSucSeviyesi` bandına kilitlenir (rutin çevirme/rüşvet → ihbar/ev araması tehdidi → tutuklama ekibi/muhbir ağı → azami takip/ödül avcıları), her birinin kefaret/rüşvet çıkışı `suc_artis` negatif (-25/-45/-65) verir. `suc_seviyesi` ≥60 iken iki büyük "baskın" olayı (`minSucSeviyesi:60`, max yok, ev ve iş yeri baskını) tetiklenebilir; sonuçları `suc_seviyesi_ayarla` (10 = temize çık, 30 = kademe 1'e in) ile kesin değere sabitler. Başarılı kaçış `etiket_ekle:["kacak"]` ile karakteri dağa kaçırır — bu noktadan sonra `kacakOlayi:true` (10 olay) şehir havuzunu tamamen kapatıp kendi hayatta kalma zincirini açar (diğer kaçaklar, kışı atlatma, yeni kimlik vb.); birkaç başarılı çıkış olayı `etiket_sil:["kacak"]` ile şehre dönüşü sağlar. `suc_seviyesi` yılda -1 pasif azaldığı için, suç işlemeyi bırakan karakter zamanla kademelerden aşağı düşer. Üst şeritteki aranma yıldızları bu tek ekseni gösterir (§4, §19).

## 18. Ölüm, Skor, Hayat Amacı, Liderlik Tablosu

**Hayat Amacı** (`hayat_amaci`) — **doğuşta** (`createCharacter`) 4 seçenekten rastgele biri atanır (oyuncuya sorulmaz):

| id | Hedef | Değer |
|---|---|---|
| en_zengin | para ≥ | 300 |
| efsanevi_un | un ≥ | 90 |
| kutsal_topraklar | ahlak ≥ | 90 |
| buyuk_aile | yaşayan çocuk ≥ | 3 |

Her tur sonu `hayatAmaciKontrolEt` kontrol eder; tamamlanınca `tamamlandi=true` + hayat-hikayesi kaydı. Ölümde skor formülüne **×5** olarak yansır (§13).

**Ölüm** (`checkDeath`): `aktif=false`, `olum_nedeni` yazılır (relik istisnası §9). İstemci ölüm ekranında isim sorup `POST /api/scores` ile kaydeder (`skoru_kaydedildi` bayrağıyla tekilleştirilir, aynı oyunu farklı isimlerle tekrar kaydetmeyi engeller); isim kutusu `state.isim` ile ön-doldurulur. İsim [kufurFiltresi.ts](server/src/moderasyon/kufurFiltresi.ts)'nden geçer (Türkçe karakter/leetspeak normalize eden basit kök-kelime eşleştirmesi, TR+EN küfür listesi). Ayrıca ölümde istemci, karakterin bir özetini tarayıcıya (`client/src/gecmisHayatlar.ts`, localStorage) kaydeder — giriş ekranındaki "Geçmiş Hayatların" listesi bunu okur.

**Soy sürdürme kaldırıldı (2026-09):** Eski `POST /:id/soy-surdur` endpoint'i, `gameEngine.soyuSurdur`, `SoyDevamiSecenekleri` ve `hanedan.test.ts` tamamen silindi. Ölüm kesin sondur; `createCharacter`'ın dördüncü parametresi artık `soyDevami` nesnesi değil, opsiyonel `oyuncuIsmi: string`'tir.

**Liderlik tablosu sıralamaları:** `genel` (skor), `en_zengin`, `en_unlu` (un) — her biri top 20. Yama #1: `skorRepository.skorKaydet` artık `Score.para` alanına salt nakit değil **nakit + gayrimenkul değeri** (`gayrimenkulDegeriHesapla`) yazar → `en_zengin` net serveti sıralar, mülke yatırım yapan cezalanmaz.

## 19. İstemci (Client) Mimarisi

React 19 + Vite, **state kütüphanesi yok** (saf `useState`, `App.tsx` ~1355 satırlık tek ekran-durum-makinesi). `client/src/types.ts` server tiplerinin **elle senkronize edilen** bir kopyasıdır.

**Ekran akışı** (`type Ekran`, `App.tsx`):
```
giris → cag_sec → bolge_sec → yerlesim_sec → isim_sec → acilis → meslek → oyun
                                                              ↓
              (yan ekranlar, tam sayfa navigasyon: aile / gorev / finans / yatirim / sosyallesme / magaza)
                                                              ↓
                                                    sonuc → oyun (döngü)
                                                              ↓
                                                        olum → liderlik
```

Ayrıca kök `.oyun-kapsayici` içinde, `ekran`'dan bağımsız her zaman render edilen **tek** `position:fixed` sağ-üst düğme var: **⚙️ (`.ayar-ac-buton`)**. (Eski ayrı **🔊/🔇 `.ses-toggle-buton`** 2026-09'da kaldırıldı — ses aç/kapa artık yalnızca Ayarlar modalında; `sesToggle` fonksiyonu duruyor, `AyarlarModal`'a `onSesToggle` ile geçiyor.) Dişli, `ayarlarAcik` state'ini açar → `AyarlarModal` (§29). Giriş ekranında ayrıca kahraman buton satırında bir "⚙️ Ayarlar" (`.ikincil`) düğmesi vardır.

**Giriş ekranı (`giris`):** dönen ⚙️ motifli bir kahraman bölümü + iki CTA (Yeni Hayata Başla / Liderlik Tablosu) + "⚙️ Ayarlar" ve altında `.giris-paneller` ızgarası: **Geçmiş Hayatların** (`gecmisHayatlar.ts`'ten okunan cihaz-yerel liste; satıra tıklayınca `secilenGecmisHayat` ile `GecmisGrafik` + `HayatHikayesi`'yi gösteren bir modal açılır, "Temizle" ile silinir), **Liderlik** (ilk 3 önizleme, `skorTablosuGetir` ilk `useEffect`'te çekilir), **Başarımların** (mevcut açılır panel). **`yerlesim_sec` artık karakter oluşturmaz** — seçimi `secilenYerlesim`'e yazıp `isim_sec`'e geçer; `POST /new` (isimle birlikte) `isim_sec`'teki "Başla" ile çağrılır. `isim_sec`: metin kutusu + "🎲 Rastgele İsim" (`GET /api/game/isim-onerisi`); boş bırakılırsa "Başla" anında bir rastgele isim çekip öyle oluşturur.

**Önemli:** `sonuc` (`ekran==='sonuc'`) kendi başına tam ekran bir görünüm **değildir** — `oyun` ile aynı JSX bloğu içinde render edilir (`(ekran === 'oyun' || ekran === 'sonuc') && ...`), `.oyun-govde` grid'i (sol-panel/merkez-panel/sag-panel, üst şerit, komuta şeridi) aynen ekranda kalır; sadece `.merkez-panel` içindeki `.merkez-alt` bölümü seçim sonucunun içeriğiyle değiştirilir (`sonEtki` state'i). Bu sayede bir seçim yapıldığında ekranın tamamı değil, sadece olayın gösterildiği alan değişir. `aile/finans/yatirim/sosyallesme/magaza/olum` ise gerçek tam-ekran geçişlerdir — oyun HUD'u (sahne/üst şerit/komuta şeridi) tamamen unmount olur.

**Gelir&Gider/İş&Yatırım/Sosyalleş/Mağaza artık ayrı bir buton satırından değil, sahnenin üstündeki tıklama noktalarından açılır** (`SahneHotspotlari.tsx`, `.merkez-sahne` içinde `BolgeSahnesi`'nin üstüne binen 4 buton): solda meslek+çağa (Din Adamı'nda ayrıca `din_kultur`'e) göre bir işyeri binası ikonu (`bolgeTema.meslekBinasiGetir`) → **İşin & Yatırımların** (`yatirim` — eskiden iki ayrı adımdı: önce "İşin" bilgi ekranı, oradan "Yatırım Yap →" ile ikinci bir `yatirim` ekranına geçiliyordu; artık işyeri hotspotu doğrudan TEK birleşik ekranı açar, `yatirimEkraniniAc` handler'ı); sağda konut kademesine göre büyüyen bir ev ikonu (`bolgeTema.konutGoruntusuGetir`, kademe arttıkça `fontSize` büyür) → **Gelir & Gider** (`finans`); altta ortada, `.sahne-hotspot-propgrup` içinde yan yana duran iki küçük "prop" → **Mağaza** ve **Sosyalleş**. Hiçbiri ayrı bir sanat varlığı gerektirmez, hepsi tek bir emoji + boyut/konum ile ayrışır (konut simgeleri gibi). Tetiklenen handler (`finansEkraniniAc`/`yatirimEkraniniAc`/`magazaEkraniniAc`/`sosyallesmeEkraniniAc`) `ekran`'ı değiştirir ve oyun HUD'unun yerini **tam sayfa** alır (sahne/üst şerit/komuta şeridi unmount olur). Kapatmak için her birinde tek tip bir **"Geri Dön"** butonu vardır (`FinansEkrani`/`IsYatirimEkrani`/`SosyallesmePaneli`/`MagazaPaneli`, hepsi aynı etiket, `.tam-geri-buton` ile sola hizalı) — `ekran`'ı `'oyun'`a döndürür; sahne/senaryo state'i App.tsx'te zaten korunduğu için oyun ekranına dönünce kaldığı yerden devam eder.

**Dördü de `TAM_EKRAN_GRUBU`'na dahildir ve `oyun`/`sonuc` ile AYNI `.oyun-kapsayici-tam` kilidini kullanır** (`height:100dvh; overflow:hidden` — sayfa DIŞTAN asla kaymaz; `aile` hariç, o hâlâ dar/ortalanmış doğal-yükseklik bir liste ekranı, bkz. `TAM_EKRAN_GRUBU` tanımındaki yorum). Eskiden (ilk revizyonda) `finans/sosyallesme/magaza` `.oyun-kapsayici-genis` ile doğal yükseklikte açılıp sayfa normal kayardı — **bu kaldırıldı**, hepsi artık aynı "dışta sıfır kaydırma, sadece iç alan kayar" modelini paylaşıyor. İki paylaşılan CSS deseni var (App.css, "Tam-sayfa gösterge ekranları" bölümü):
1. **Çok bölümlü ekranlar** (İşin&Yatırım, Gelir&Gider) → `.tam-govde-3col` (3 **oransal** sütun, `grid-template-columns: 1fr 1.5fr 1fr` — sabit piksel tavanı YOK, geniş ekranda sütunlar da genişler) + her biri `.tam-sutun` (kendi içinde `overflow-y:auto`, sol-panel/sag-panel'deki aynı desen). İçerik sütun yüksekliğini aşarsa SADECE o sütun kendi içinde kayar, dış sayfa yine kaymaz.
2. **Tek homojen kart listesi olan ekranlar** (Mağaza, Sosyalleş) → başlık/sekme/açıklama sabit kalır, kart ızgarasını saran `.tam-kaydirilan` (flex:1, `overflow-y:auto`) kalan yüksekliği doldurup gerekirse kendi içinde kayar.

Mobil (`max-width:767px`) için bu üç sınıfın (`.ekran-tam-sayfa`/`.tam-govde-3col`/`.tam-sutun`/`.tam-kaydirilan`) hepsinde `.oyun-govde`'nin mobil davranışıyla aynı gevşetme uygulanır: `height:auto; overflow:visible`, sütunlar tek sütuna iner, sayfa doğal olarak kayabilir.

**Önemli — bir önceki revizyonda kart metinleri (mülk açıklaması, avantajlı/dezavantajlı durum, kendi-iş açıklaması, zar risk cümlesi) `title` tooltip'ine gizlenip kartlar küçük kare karolara sıkıştırılmıştı; bu geri alındı** çünkü bilgiyi görünmez kılıyor ve ekranı boş/ucuz gösteriyordu — mülk/kendi-iş/zar/yaşam-tarzı/konut/mağaza/sosyalleşme kartlarının HEPSİ aynı paylaşılan `.yatirim-kart`/`.yatirim-kartlari` ailesini kullanır (min-height 200px, tüm metin kart içinde görünür, kısaltma yok). Sadece kompakt kalması gereken şey — bir karakterin **sayısal özet değerleri** (İşin&Yatırım'ın Sütun 1'indeki `.is-profil-karti` + `.is-karo-izgara`, `StatKarosu`: Yıllık Kazanç/Amir/Şehir Yönetimi/meslek-metrikleri) — küçük karo kalıyor (2026-09'da 3 sütunlu kompakt ızgaraya küçültüldü, `aspect-ratio` kaldırıldı); **metin/açıklama taşıyan hiçbir kart artık zorla kareye sıkıştırılmıyor.**

**İşin & Yatırımların (`yatirim`, `IsYatirimEkrani.tsx`):** Sütun 1: kimlik kartı + istatistik karoları (`.is-karo-izgara` artık 3 sütunlu kompakt ızgara, `aspect-ratio` yok) + **piyasa dedikoduları** (`.tam-baslik-dedikodu` altın "📜" başlık + `.dedikodu-panosu.dedikodu-panosu-vurgu` — mühür mumu kırmızısı zemin + altın sol kenar, kasıtlı dikkat çekici). Sütun 2 (en geniş): 5 mülk kartı (`.yatirim-kartlari.yatirim-mulk-kartlari`; her kartta tahmini getiri satırının altında "🔧 Bakım/vergi: ~-N/yıl", `yillikBakimTahmini`). Sütun 3: "Kendi İşine Yatırım Yap" kartı (`.isyatirim-kendi-is-kart`, altın çerçeveyle vurgulanır) + "Rütbe nasıl yükselir?" ipucu kutusu, ardından suç/aranma göstergesi + zar kartları (`.isyatirim-zar-izgara`, `.zar-karo` — min-height 150px, risk cümlesi görünür).

**Gelir & Gider (`finans`, `FinansEkrani.tsx`):** Sütun 1 "Bütçen": "Yıllık maaş" + hemen altında **maaş kırılımı** (`.finans-maas-kirilim`, `maasKirilim`'den) — "🎖️ Rütbeden gelen (<unvan · Sv.N>) · kalıcı", "📈 Kariyer birikimi · kalıcı" (alt satırda kalem kalem ün/kıdem/şehir yönetimi/kalıcı ödüller), "🌍 Dönemsel yüzdelik etkiler · değişebilir" (alt satırda enflasyon/ekonomi/savaş/salgın) + kalıcı-vs-dönemsel'i açıklayan tek satır not; ardından **"🌍 Şu an bütçeni etkileyen dünya durumları"** bloğu (`.finans-dunya-etkileri`, `dunyaEtkileri`'nden — boşsa "olağan dışı bir dünya olayı yok" satırı); sonra (mülk varsa) "🏠 Gayrimenkul geliri" satırı, gider dökümü, ve mülk varsa net iki satır ("↳ Maaş − gider" + "Net yıllık (gayrimenkul dahil)" = `netYillik + gayrimenkulYillikGelir`) yoksa tek "Net yıllık"; + `GecmisGrafik`. Sütun 2 "Yaşam Tarzın": 6 yaşam tarzı kartı. Sütun 3 "Evin": 6 konut kademesi kartı. **Bu ekrana özel:** kapsayıcı `.tam-govde-3col` yerine `.tam-govde-3col-finans` (`grid-template-columns: 0.9fr 1.55fr 1.55fr` — sol "Bütçen" dar, orta + sağ AYNI genişlikte) kullanır; iki seçim ızgarası `.yatirim-kartlari.finans-secim-izgara` (`grid-template-columns: repeat(2, minmax(0,1fr))` → HER ZAMAN satır başına tam 2 kart, sütun genişliğini doldurur; `flex:1` + `grid-auto-rows: minmax(min-content, 1fr)` → kartlar sütunun kalan yüksekliğini paylaşıp dikeyde uzar, sayfa altı boş kalmaz; kart açıklaması `-webkit-line-clamp:3` ile en fazla 3 satır — uzun ev tanımları 6 kartı aşağı kaydırmaya zorlamasın). Kart maliyetleri **enflasyonla ölçekli güncel tutarı** gösterir (`enflasyonluTutar`, `finans.enflasyonYuzdesi`'ten), enflasyon > 0 iken "(liste N, +%E enflasyon)" ekiyle; gider dökümündeki gerçek `yasam`/`konut` tutarıyla hizalı. **Eski "Varlıkların" sütunu (sahip olunan mülkler + ekip) 2026-09'da kaldırıldı** — sahip olunan mülkler artık ayrı listelenmiyor (İşin & Yatırımların ekranındaki mülk kartlarında `mulk-kart-sahip` durumu görünüyor); **ekip yönetimi (Kov butonu dahil) `GorevEkrani`'ne taşındı** (tam-sayfa "Görevin" ekranı, sol panelden "🎖️ Görevini Gör" ile açılır). `FinansEkrani` artık `ekip`/`mulkler`/`onEkipCikar` prop'u almıyor. `FinansOzetPaneli` (sol panel mini özet) gelir/net'e `gayrimenkulYillikGelir`'i katar; ayrıca 3 rakamın altında maaşın kırılımını çip olarak ("🎖️ +%X · 📈 +%Y · 🌍 ±%Z", `maasKirilim`'den, tam metin `title`'da) ve etkin dünya olaylarını kısa çip satırı olarak (`dunyaEtkileri` boş değilse) gösterir — böylece rütbe/ün/çevre etkileri Gelir & Gider ekranına girmeden ana ekranda da görünür.

**Mağaza (`magaza`, `MagazaPaneli.tsx`) ve Sosyalleş (`sosyallesme`, `SosyallesmePaneli.tsx`):** Tek homojen kart listesi oldukları için 3 sütuna bölünmez — başlık/açıklama/sekmeler (Mağaza'da şifa/lüks) sabit üstte, kart ızgarası `.tam-kaydirilan` içinde kalan alanı doldurur.

**Oyun ekranı düzeni (`.oyun-govde`, tablet/masaüstü — `min-width:768px`):**
- Sabit oran: sol-panel/sag-panel ekranın ~%20'si, merkez-panel ~%60'ı (`grid-template-columns: 1fr 3fr 1fr`).
- `.merkez-panel` içinde görsel (`.merkez-sahne`) tüm alanı kaplar (flex:1, taban 150px, `object-fit:contain` ile hep tam görünür); metin/seçenekler (`.merkez-alt`) ise artık ortalanmış, dar (kenarlarda boşluk bırakan, kareye yakın) bir **"yüzen kart"** olarak sahnenin alt kısmına **~%7** taşarak biner (2026-09'da ~%10'dan azaltıldı; negatif `margin-top: clamp(-1.6rem, -3vh, -0.85rem)` + `z-index:2` + tam opak `--renk-ahsap-panel` zemin + sahnenin `flex:1` ile taşan payı geri kazanması). `.merkez-alt`'ın payı BİLEREK sabit bir orana kilitlenir (`flex: 0 0 clamp(280px, 58%, 480px)` — içeriğe göre büyüyüp küçülen "auto" DEĞİL): olay metni/seçenek sayısı (2-4) değiştikçe kutu boyu değişmesin diye — aksi halde sahne her tıklamada büyüyüp küçülerek görsel bir "kayma" hissi yaratıyordu. İçerik bu sabit alana sığmazsa kendi içinde kayar (`overflow-y:auto`). `SahneHotspotlari` tıklama noktaları artık tek ortak sırada durur (`bottom:%16`) — kartın taştığı bölgenin güvenle üstünde kalır.
- **Oyun ekranı (`oyun`/`sonuc`) `100dvh`'e sabittir, sayfa asla kaymaz** (`.oyun-kapsayici-tam{height:100dvh;overflow:hidden}`) — üst şerit/komuta şeridi sabit yükseklikte, `.oyun-govde` kalan tüm alanı doldurur (`flex:1`). Taşan içerik varsa (ör. sol/sağ panel çok sayıda bölüm biriktiğinde) SADECE o panelin kendi içinde kayar (`.panel-parsomen{height:100%;overflow-y:auto}`). `yatirim/finans/sosyallesme/magaza` da AYNI kilidi kullanır (bkz. yukarıdaki madde) — hepsi kendi iç alanlarında (`.tam-sutun`/`.tam-kaydirilan`) kayar, dış sayfa hiçbirinde kaymaz.
- `.ust-serit-moduller` (Yıl/Yaş/Can/Para/Ahlak/Mutluluk/Aranma) 7 sütunlu eşit-genişlik grid — bar küçülüp büyüse de her modül her zaman barın sabit 1/7'si, tek tek farklı boyda dizilip taşmaz. Aranma modülü `suc_seviyesi`'ni sayı olarak değil, `bolgeTema.aranmaYildiz` ile 5 yıldıza bölünmüş olarak gösterir (≥45'te kırmızıya döner).
- **Mobil (`max-width:767px`)** tamamen farklı bir moddur: tek sütuna iner, `100dvh` kilidi kalkar, sayfa doğal olarak kayabilir (üç panelin tüm içeriğini bir telefon ekranına sığdırmak gerçekçi değil), `.merkez-sahne` `aspect-ratio:16/9` ile sabit oranlı bir görsel kutusuna döner (`SahneHotspotlari` da bu kutunun üstünde, `transform:scale(0.78)` ile küçülür). Tek kırılım noktası budur — tablet ve masaüstü aynı %20/%60/%20 düzenini paylaşır.

**Dosya haritası:**
| Dosya | Amaç |
|---|---|
| `api.ts` | Tüm backend endpoint'leri için `fetch` sarmalayıcıları (§3 tablosuyla bire bir eşleşir) |
| `oturum.ts` | `localStorage`'da aktif `state.id` (oyuna devam) |
| `ayarlar.ts` | `localStorage`'da arayüz ayarları (`{dil:'tr'\|'en'}`); `kader-carki-ayarlar` anahtarı (§29). Ses tercihi hâlâ `ses.ts`'te |
| `i18n.ts` | Minimal arayüz sözlüğü (`metinler(dil)` → tipli metin nesnesi). Şu an SADECE ayarlar modalını kapsar — `EN` nesnesi `typeof TR` olduğu için anahtar kümeleri hep eşit. Menüler/olaylar hâlâ Türkçe (§29) |
| `basarimlar.ts` | `localStorage`'da kalıcı ünvan/efsanevi-ölüm koleksiyonu (çoklu-oyun meta) |
| `gecmisHayatlar.ts` | `localStorage`'da ölen karakterlerin özeti (son 20; giriş ekranı "Geçmiş Hayatların" listesi) |
| `envanter.ts` | Gizemli eşya etiketi → görüntülenecek ad/ikon/açıklama (`magaza_envanteri` için ayrıca §26) |
| `format.ts` | `formatPara()` — para tutarlarını (enflasyon artık ondalık üretebildiği için) en fazla 2 ondalıkla, gereksiz sıfırlar kırpılarak gösterir (§13/§27) |
| `bolgeTema.ts` | Bölgeye göre görsel tema; ayrıca `unUnvani` (ün → 8 kademeli ünvan), `aranmaYildiz` (suç seviyesi → 0-5 yıldız), `konutGoruntusuGetir` (konut kademesi+çağ → dönemsel ad/emoji) ve `meslekBinasiGetir` (meslek+çağ(+din_kultur) → sahnedeki işyeri binası ad/emoji) gibi sayı/id→gösterim dönüştürücüleri |
| `public/assets/sahne/<cag>/<tip>/{arka-plan,on-plan}.webp` | Opsiyonel bölge sahnesi görsel katmanları — `BolgeSahnesi` bunları önce arar, 404'te otomatik eski prosedürel SVG'ye döner (bkz. `public/assets/sahne/README.md`) |
| `ses.ts` | Ses efektleri |
| `components/*.tsx` | Her biri tek bir panel/ekran parçası: `Banner` (açılış ekranı çağ/bölge şeridi), `UstSerit` (oyun ekranının üst şeridi — yıl/yaş/can/para/mutluluk/aranma modülleri; Ahlak modülü artık çıplak sayı değil, `bolgeTema.ahlakEtiketi` ile 6 kademeli bir sözel seviye — Zalim...Gurur Abidesi — gösterir), `AileOzetPaneli` (sol panel: eş/çocuk/evcil hayvan özeti), `SiyasetPaneli` (sağ panel: hizip + dönem), `GorevEkrani` (2026-09: eski `KomutaSeridi` sol-panel inline bloğunun yerini aldı — artık `AileEkrani` gibi TAM SAYFA açılır ekran; sol panelde yalnız bir "🎖️ Görevini Gör" butonu var, `setEkran('gorev')`. İçinde amir · astlar · ekip (her üye rol + yıllık maaş + `🎭 kişilik · 🤝 sadakat · kalite %min-max` + **Kov** butonu, `onEkipCikar`) · mesleğe özel güç metrikleri (ordu/sermaye/nüfuz). `TAM_EKRAN_GRUBU`'na dahil DEĞİL — `aile` gibi doğal-yükseklik. Eski `KomutaSeridi.tsx` 2026-09'da silindi), `FinansOzetPaneli` (sol panelde, Ün rozetinin altında, "Görevini Gör" butonundan önce — kompakt üç satırlık yıllık gelir/gider/net özeti; eskiden merkez sahnenin üstünde sadece "Yıllık gelir" gösteren tek satırlık `.merkez-sahne-ustbilgi` overlay'inin yerini aldı. `App.tsx`'teki bir `useEffect` [karakter?.id, karakter?.tur_sayisi, karakter?.meslek] değiştikçe `GET /:id/finans`'ı arka planda çeker ve `finans` state'ini günceller — bu widget'ın her turda taze kalması için; finans henüz çekilmeden ilk render'da gelir `karakter.maas_yillik` önbelleğinden, gider/net ise "…" placeholder'ından gösterilir), `SahneHotspotlari` (`.merkez-sahne` üstündeki 4 tıklama noktası — ev/işyeri/mağaza/sosyalleş, hiçbiri ayrı görsel dosyası kullanmaz), `SonucEfekti` (seçim sonucu animasyonu), `GecmisGrafik` (gecmis[] çizimi), `HayatHikayesi`, `IliskilerPaneli`, `AileEkrani`, `FinansEkrani`, `IsYatirimEkrani` (işyeri hotspotundan doğrudan açılan birleşik "İşin & Yatırımların" ekranı — eski `IsDetayEkrani`+`YatirimEkrani` ikilisinin yerini aldı, bkz. yukarıdaki madde), `IsyeriPaneli` (sağ panelde her zaman görünen küçük özet — `IsYatirimEkrani`'nden ayrı, oraya dokunulmadı), `EnvanterPaneli` (gizemli eşyalar + `magaza_envanteri`, "Kullan" butonuyla, sol panelde), `MagazaPaneli` (şifa/lüks sekmeleri, §26), `SosyallesmePaneli`, `DurumPaneli`, `HaberlerPaneli`, `KisilikPaneli`, `KarakterAvatari`, `BolgeSahnesi`, `BolgeBilgisiPaneli`, `EtkiCipleri`, `AyarlarModal` (dişli düğmesi / ana ekran "⚙️ Ayarlar" ile açılan ortalanmış modal — 2 sekme: Genel [dil + ses] / Görüş & Öneri [geri bildirim formu], §29) |

## 20. Veritabanı Şeması

PostgreSQL + Prisma ([schema.prisma](server/prisma/schema.prisma)) — `Score.skor` ve `Score.para` `Float`:

```prisma
model Session {
  id String @id
  data String        // TÜM CharacterState'in JSON.stringify hali
  aktif Boolean @default(true)
  createdAt/updatedAt DateTime
}
model Score {
  id Int @id @autoincrement()
  isim, meslek, rutbe, cag, bolge, yerlesim, kisilik, olum_nedeni String
  skor, yas, para, un Int
  unvanlar String          // virgülle ayrılmış
  efsanevi_olum String
  hayat_amaci_tamamlandi Boolean
  createdAt DateTime
}
```

`Session.data` **tam state'in düz JSON'udur** — CharacterState'e yeni bir alan eklemek şema migrasyonu gerektirmez, ama eski kayıtlarda o alan `undefined` olacağından geriye dönük varsayılan/opsiyonel ele alınmalı.

**Geri bildirim (§29) Prisma KULLANMAZ.** Şema Postgres'e taşınma sürecinde olduğu için yeni bir model + migration eklemekten kaçınıldı; geri bildirimler `server/data/geri-bildirim.jsonl`'e satır satır yazılır (`GERI_BILDIRIM_DOSYA` ile taşınabilir) + anlık olarak webhook'a gider. Render "free" planında kalıcı disk olmadığından JSONL deploy/restart'ta sıfırlanır — prod'da güvenilir kanal webhook'tur. Şema oturunca bir `GeriBildirim` modeline yükseltilebilir.

## 21. Moderasyon

[kufurFiltresi.ts](server/src/moderasyon/kufurFiltresi.ts): sadece liderlik tablosu **isim** girişinde kullanılır. Türkçe karakterleri sadeleştirir (`ı→i, ğ→g, ü→u, ş→s, ö→o, ç→c`), leetspeak normalize eder (`4/@→a, 3→e, 1→i, 0→o`), alfasayısal olmayanı siler, ardından TR+EN küfür kök listesiyle `includes` eşleşmesi yapar. NLP değil, basit ilk savunma hattı.

## 22. Test & Analiz Araçları

`server/tests/` — Vitest, `gameFlow, tepki, konut, yatirim, mulkVeSucSistemi, hapishane, yolculuk, hizipOlaylari, saray, sehirYonetimi, evcilHayvan, gizemliEsyalar, astVeAile, meslekMetrikleri, moderation, persistence, tagMotoru, tonalDenge (ağır/hafif ton dengesi), donemselOlaylar, dinOlaylari, askerDinAdamiYollari, derinlikMekanikleri, basarimlar, aranmaSeviyesi, sosyallesme, magaza, donemselDunyaOlaylari (enflasyon + savaş/veba/kriz/bağış, §27), sucKazanci (suç işleyerek para kazanma motor kuralı, §9 adım 3.5), yaslanma (pasif regen tavanı + ileri yaş ecel riski, §13), rutbe (5 kademeli rütbe reformu, §14)`. Bir mekanik değiştirilirken **ilgili test dosyasını çalıştır**, tüm 48K satırlık veriyi elle doğrulamaya çalışma.

**`npm test` çalışır** (2026-09'da onarıldı): eski `tests/globalSetup.ts` her koşuda `prisma migrate deploy`'u SQLite `DATABASE_URL` ile çağırıp şema PostgreSQL'e taşındığından P1012 ile tüm paketi çökertiyordu. Artık `vitest.config.mts` `@prisma/client`'ı **`tests/_prismaStub.ts`** (bellek-içi Prisma taklidi) alias'lar, `globalSetup` no-op'a indirildi — testler gerçek bir DB kurmadan koşar (gameEngine oturumları zaten `oturumlar` Map'inde tutuyor). Gerçek bir test PostgreSQL'ine geçilirse alias'ı kaldırıp globalSetup'ı geri getir. Saf-fonksiyon doğrulaması için bağımsız `npx tsx scripts/verify*.ts` script'leri de duruyor.

`server/scripts/`: `simulateGayrimenkul.ts` (npm script'e bağlı değil; `npx tsx scripts/simulateGayrimenkul.ts`, env `SIM_N`/`SIM_YIL`) — her piyasa mülkünün **30 yılda ilk yatırıma oranla net kâr/ROI'sini** Monte Carlo ile ölçer. Gerçek `mulkGetiriOraniHesapla` + `mulkGelirleriUygula` (bakım dahil) + gerçek arka plan dünya olaylarını (`buyukSavasKontrolEt`/`vebaBaslamaliMi`/`kucukKrizKontrolEt` vb.) çalıştırır; yalnız `ulke.ekonomi`/`nufusDurumu`/isyan/altın-çağ hafif bir kalıcılıklı örnekleyiciyle taklit edilir (olay `ulke_etkisi`'ne bağlı oldukları için). DB gerektirmez. `simulateEconomy.ts` (bin ömür simüle edip ekonomik dengeyi raporlar), `analyzeOlaylar.ts` (olay bankası dağılım istatistikleri + gerçek `olaySec()` ile olay-görülme sıklığı simülasyonu), `listUniversal.ts` (kısıtsız/evrensel olayları listeler), `simulateFullPlaythroughs.ts` (npm script'e bağlı değil; `DATABASE_URL="file:./simulation.db" npx tsx scripts/simulateFullPlaythroughs.ts` ile çalıştırılır — `simulateEconomy.ts`'ten farklı olarak olay içeriğini örneklemez, gerçek `gameEngine.ts` orkestrasyon fonksiyonlarını (`senaryoUret`/`secimUygula`/`yatirimYap`/`magazadanSatinAl`/`konutDegistir`/`mulkSatinAl`/`sosyallesmeYerineGit`/`zarAt` vb.) doğrudan çağırarak her çağ×meslek kombinasyonu için `SIM_N` adet — varsayılan 100 — tam ömür oynatan bir "bot oyuncu" simülasyonudur; sonuçları `simulateFullPlaythroughs.sonuc.json`'a yazar. `analyzeFullPlaythroughs.ts` o JSON'u çağ×meslek bazında özetler (`simulateFullPlaythroughs.analiz.json`). HTTP/rate-limiter'ı atlar; ayrı bir `simulation.db`'ye yazar, gerçek `dev.db`'ye dokunmaz.

`simulateKisilikler.ts` + `analyzeKisilikler.ts` (npm script'e bağlı değil; `npx tsx scripts/simulateKisilikler.ts`) — `simulateFullPlaythroughs.ts`'in "tek tip bot"unu **7 oyuncu kişiliğine** genişletir: `garantici` (hep en yüksek başarı şansı, ölüm/hapis riskinden kaçar), `cimri` (parayı biriktirir, en ucuz ev+sofra, mekanikleri neredeyse hiç kullanmaz), `suclu` (ahlaki-taviz+para veren seçenekler, karaborsa+zar+meyhane), `luks` (ün/mutluluk, en pahalı ev+sofra+tüm lüks eşyalar), `kaotik` (seçim şansa bakmaz, ev/sofra her tur rastgele kademe), `survival` (sağlığı her şeyin üstünde tutar), `para` (beklenen parayı maksimize eder, agresif kendi-işi+mülk). Her kişilik seçeneğin gerçek `basarili_sonuc`/`basarisiz_sonuc` etkilerini puanlar (bkz. `secenekOzetiCikar`) ve tüm tur-arası eylemleri (ev/sofra kademesi, yatırım, mülk, mağaza şifa/lüks, envanter, zar, sosyalleşme) kendi `YanEylemAyari`'sına göre yönlendirir. Env: `SIM_N` (grup başına ömür, vars. 120), `SIM_KISILIK=suclu,para` (yalnız bu kişilikler). Çıktı: `simulateKisilikler.{sonuc,analiz}.json` (7 kişilik × 2 çağ × 3 meslek kırılımı + yan yana karşılaştırma tablosu). **DB kalıcılığı gerektirmez** — `scripts/_simPrismaStub.ts` `../src/db/prismaClient`'i bellek-içi no-op ile değiştirir; şema PostgreSQL'e taşındığı için eski `DATABASE_URL="file:./simulation.db"` yolu artık çalışmaz (`simulateFullPlaythroughs.ts` de aynı stub'ı `import "./_simPrismaStub"` ile kullanacak şekilde güncellenebilir).

## 23. Yeni Bir Olay Eklerken Kontrol Listesi

1. İlgili tema dosyasını seç (§7 tablosu) — yoksa `genel.ts`'e ekle.
2. `OlayTanimi` şemasına uy (§6); `id` benzersiz ve açıklayıcı olsun (proje kuralına göre önekli: `oc_`, `sd_`, `kg_`, `hizip_`, `derinlik_`, `gizem_` vb. temaya göre değişir — dosyadaki mevcut id'lerin önekine bak).
3. Uygunluk filtrelerini (`cag/bolgeler/meslekler/min-max*/gerekli*`) mümkün olduğunca dar ama gereksiz kısıtsız tut — çok kısıtlı olay havuzda nadiren çıkar.
4. Her seçenek için `basariliSonuc`/`basarisizSonuc.mesaj` **zorunlu**; `{placeholder}` kullanacaksan §6 listesindeki isimlerden seç.
5. Stat delta'ları dengeli tut — mevcut olaylarda tipik aralık ±5..±25 (para hariç, para meslek/döneme göre değişir); aşırı büyük tek-olay etkisi dengeyi bozar.
6. Yeni bir `etiket_ekle` kalıcı bir sistem başlatıyorsa (yeni bir "X_tamamlandi" / "X_basladi" durumu), o etiketi tüketen/kontrol eden karşı tarafı da (başka bir olayda `gerekliEtiketler` veya gameEngine'de bir zorlanan-olay kuralı) unutma — yoksa etiket "yetim" kalır.
7. `agirlik` belirtmezsen 1 sayılır; çok sık/az çıkmasını istiyorsan açıkça ayarla. `ton:"agir"` trajik/travmatik olaylara koy (art arda gelmesi otomatik azaltılır, §12).
8. Yeni olayı `data/olaylar/index.ts`'teki ilgili `OLAY_*` dizisi zaten export ediyorsa (dosya zaten `OLAY_BANKASI`'na dahilse) ekstra kayıt gerekmez — sadece dosyanın kendi dizisine ekle.
9. `npm test` çalıştır (özellikle `tagMotoru.test.ts`, `tonalDenge.test.ts`, `gameFlow.test.ts`).

## 24. Bilinen Tutarsızlıklar / Eskimiş Notlar

- `SonucEtkisi.hayat_amaci_ata` alanı hâlâ tanımlı ve `gameEngine.ts`'te işleniyor, ama `hayat_amaci` artık **doğuşta** (`createCharacter`) otomatik atanıyor (bkz. `scripts/analyzeOlaylar.ts` içindeki açıklayıcı yorum: *"Hayat amacı artık bir olay değil — doğuşta atanıyor"*). Kod tabanında bu alanı gerçekten set eden aktif bir olay bulunamadı — muhtemelen ölü kod, kaldırmadan önce grep ile doğrula.
- `scripts/analyzeOlaylar.ts`'in başındaki yorum "367 olay" diyor; gerçek sayı artık **~940** (§7). Yorum güncellenmemiş, sayıma güvenme.
- `client/src/types.ts`, `server/src/types.ts`'in **elle** senkronize edilen bir kopyası — otomatik tip paylaşımı (monorepo/paket) yok. `CharacterState`/`SonucEtkisi` değiştirince ikisini de güncelle.
- **`basarisizSonuc.mesaj: "Kullanılmadı."` placeholder kalıbı** (2026-09 denetimi): olay bankasında `basarisizSonuc`'u salt `"Kullanılmadı."`/`"Kullanılmadı"` olan seçenekler var. İki grup:
  - **`baseBasariSansi < 100` iken (ERİŞİLEBİLİR — bug'dı):** 2026-09'da 15 tanesi bulundu ve düzeltildi. 12'si "gizli envanter/evcil hayvan/evlatlık izci = garantili sonuç" şıkkıydı, biri fat-finger'la 90-95'e ayarlanmıştı → **100'e çekildi** (metin değişmedi). 3'ü gerçek başarısızlık dalı hak ediyordu (`hac_ortodoks_deniz_3`, `dunya_savas_biter` yoldaş-satan, `komik_kecinin_donusu` kaç-şıkkı) → **80-90'a düşürülüp iki dilli başarısızlık metni yazıldı**. Ayrıca önceki turdan 9 seçenek daha (kara kılıç/ejderha tılsımı/şahin bekleme/tefecilik/muhasebeci/suçu üstlen/gölge pazarı/fısıldayan taş) düşürülmüştü. `onTepki`'li şıklarda `baseBasariSansi`+`basarisizSonuc` zaten ölü (zar atılmaz) — onlar dokunulmadı. Denetim script'i: `OLAY_BANKASI` üzerinde `basarisizSonuc.mesaj==="Kullanılmadı." && (baseBasariSansi??100)<100 && !onTepki` → **şu an 0**.
  - **`baseBasariSansi: 100` iken (ERİŞİLEMEZ — kasıtlı, ~31 seçenek):** "gizli envanteri harcayıp garantili kurtuluş" (sirli_iksir çocuğu iyileştirir, olunun_yuzugu işi kurtarır...), saf anlatı kapanışı (çocuk zaten iyileşti/öldü), güvenli vazgeçme şıkları (hayvanı reddet, uzaktan izle). `rollSuccess(100)` her zaman `true` → `basarisizSonuc` erişilemez ölü koddur, placeholder zararsız. **Tekrar "hata" diye işaretleme.**

## 25. Sosyalleşme Mekânları

Karakterin çağına/bölgesine/mesleğine göre gidebileceği, oyuncunun **kendi seçtiği** sosyal mekânlar — hapis/yolculuk gibi bir "alt sistem", ama etikete değil doğrudan oyuncu aksiyonuna bağlı.

**Mekân kataloğu:** [sosyallesmeYerleri.ts](server/src/data/sosyallesmeYerleri.ts), `SOSYALLESME_YERLERI: SosyallesmeYeri[]` — 10 mekân (`id, ad, simge, aciklama, alkolluMu, cag?, bolgeler?, meslekler?`): `meyhane` (alkollü, Fransa/Kutsal Roma/Bizans/Osmanlı/Rusya), `pub` (alkollü, sadece Sanayi+İngiltere), `hamam` (Bizans/Selçuklu/Eyyubiler/Osmanlı), `kahvehane` (sadece Sanayi+Osmanlı), `kervansaray` (sadece Orta Çağ, Selçuklu/Eyyubiler/Bizans), `ordugah_cadiri` (alkollü, sadece Asker), `dini_meclis` (sadece Din Adamı), `lonca_meclisi` (sadece Tüccar), `pazar_meydani` (mekân/mesleğe bakılmaksızın her zaman uygun), `salon` (Fransa/Kutsal Roma/Bizans/İngiltere).

**Olay havuzu:** [sosyallesme.ts](server/src/data/olaylar/sosyallesme.ts), `OLAY_SOSYALLESME` (73 olay). Her olay `sosyallesmeYeri: string` alanıyla bir mekâna bağlanır (§6 `OlayTanimi`). **Bu alan set edilmiş her olay, `olaySecici.ts`'teki `uygunMu` içinde normal rastgele havuzdan tamamen dışlanır** (hapisOlayi/yolculukOlayi'nın etikete bağlı iki-havuz toggle'ından farklı olarak, burada tek yönlü/kalıcı bir dışlama var — bu olaylar SADECE mekân seçimiyle gelir). Alkollü mekânların olayları `minYas:18` taşır.

**Akış:**
1. `GET /:id/sosyallesme-yerleri` → `sosyallesmeYerleriGetir` — karakterin çağ/bölge/mesleğine uyan VE o an gerçekten en az bir uygun olayı olan (yaş/etiket/ahlak vb. filtrelerden geçen) mekânları döner; `hapiste`/`yolculukta` iken boş liste döner.
2. `POST /:id/sosyallesme {yerId}` → `sosyallesmeYerineGit` — `olaySecici.ts`'teki `sosyallesmeIcinOlaySec(state, yerId)` ile (hiç görülmemiş > en uzun süredir görülmemiş önceliğiyle, `agirlik` ağırlıklı) o mekâna ait bir olay seçilip `oturum.zorlananOlayId`'ye yazılır. **Bir tur harcamaz.**
3. İstemci ardından normal `POST /:id/scenario` çağrısını yapar (App.tsx `sosyallesmeYerineGitHandler`, `devamEt` ile aynı desen) — zorlanan olay gelir, oyuncu normal zar/seçim akışıyla çözer; **zaman burada ilerler**.

**Ayyaşlık mekaniği** (gameEngine.ts `sonucuUygulaVeIlerlet`, `AYYAS_ESIGI=3`): Çözülen olayın `sosyallesmeYeri`'si `alkolluMu:true` bir mekâna aitse `state.alkol_ziyaret_sayisi` her seferinde 1 artar (başarı/başarısızlık fark etmez). Sayaç eşiğe (**3**) ulaştığında ve karakterde henüz `bagimlilik:ayyas` yoksa (rising-edge, tek seferlik): `bagimlilik:ayyas` + `bagimlilik:var` etiketleri eklenir, **ahlak -10, ün -15** anında düşer, kalıcı bir `Durum` (`id:"ayyaslik"`, `tur_basi_saglik:-1`, `tur_basi_mutluluk:-1`) eklenir, `maasCarpaniUygula(state, 0.95)` ile kalıcı %5 gelir cezası uygulanır, ve `zamanAnlatimi`'ne bir uyarı cümlesi eklenir. **Tek çıkış yolu:** `sosyal_meyhane_ayilma` (meyhane havuzunda, `gerekliEtiketler:["bagimlilik:ayyas"]`) — başarılı seçimi etiketi ve durumu kaldırıp telafi eder; bu olay dışında bağımlılığı geri alan hiçbir mekanizma yoktur (mevcut `bagimlilik:kumarbaz`/`bagimlilik:afyon` etiketleriyle aynı "kalıcı flavor" felsefesi).

`client/src/components/SosyallesmePaneli.tsx` mekân kartlarını listeler; **2026-09'dan beri ayyaşlık ziyaret-sayacı uyarısını GÖSTERMEZ** (oyuncu `alkol_ziyaret_sayisi`'nin `AYYAS_ESIGI`'ye ne kadar yaklaştığını görmesin — damga sürprizle vurulsun; sunucu `ziyaretSayisi`'ni hâlâ döndürüyor, istemci yok sayıyor). `App.tsx`'te sahne hotspot'undan açılır. Testler: [sosyallesme.test.ts](server/tests/sosyallesme.test.ts).

## 26. Mağaza & Envanter

Oyuncunun kendi seçtiği, para karşılığı eşya satın aldığı bir alt sistem — sosyalleşme gibi doğrudan oyuncu aksiyonuna bağlı (olay/etiket tabanlı değil), ama sonucu **kalıcı bir envanter kaydı** olarak `state.magaza_envanteri: SahipOlunanEsya[]`'ye yazılır. Gizemli eşyalardan (`envanter:`/`esya:` etiketleri, §16) tamamen ayrı bir mekanizmadır; ikisi de aynı `EnvanterPaneli`'nde yan yana gösterilir ama farklı veri kaynaklarından beslenir.

**Katalog:** [magazaEsyalari.ts](server/src/data/magazaEsyalari.ts), `MAGAZA_ESYALARI: MagazaEsyasiTanimi[]` — 10 eşya, tam liste §16'da. İki kategori:
- **`sifa`** (Temel Tüketim & Şifa) — dönem-gerçekçi ilaç/erzak (büyülü "pot" değil); `saglikEtkisi`/`mutlulukEtkisi` taşır, **kademeli**: ucuz eşyalar (taban fiyat <30) sadece `saglikEtkisi` verir (küçük miktar), pahalı eşyalar (≥30) hem `saglikEtkisi` hem `mutlulukEtkisi` verir (büyük miktar — fiyat başına da daha verimli, biriktirip pahalıya çıkmak teşvik edilir). Satın alınınca etkisi **hemen uygulanmaz** — envantere düşer, oyuncu istediği an `POST /:id/envanter/:esyaId/kullan` ile "tüketir". **Kullanmak artık ZARLI (2026-09):** `sifaBasariSans(tabanFiyat)` = `clamp(0.60 + (fiyat−16)/42 × 0.20, 0.60, 0.80)` ihtimalle tam olumlu etki (jitter'lı); `%10` sabit "hiç işe yaramadı"; geri kalan (en ucuz sifada ~%30, en pahalıda ~%10) **ters teper → −5 can**. Eşya her durumda tükenir. Oyuncuya kesin değil, `sifaFaydaAralik` ile **bulanık bir bant** (%5'e yuvarlanmış, ±5 sis) gösterilir (Mağaza kartında `mpSifaSans`, envanter "Kullan" ipucunda `enKullanSansHint`). Kullanılmadan `omurYil` (7-12 arası) yıl geçerse **çürür** (§13 `envanterBozulmasiUygula`), etki hiç uygulanmadan silinir. **Ayrıca** herhangi bir "sifa" satın alımı TÜM "sifa" kategorisini `TEMEL_MAGAZA_KILIT_SURESI_YIL=3` yıl kilitler — oyuncu sürekli sürekli alışveriş yapamasın diye (§13).
- **`luks`** (Lüks Tüketim) — nadir tablo/ipek halı/mücevher; `unEtkisi` taşır ve satın alma anında **hemen** uygulanır (`magazadanSatinAl`). Envantere kalıcı bir "koleksiyon" kaydı olarak eklenir — **her türden en fazla 1 sahiplenilebilir** (aynı `katalogId`'den ikincisi satın alınamaz, `mulkler`'deki "her türden en fazla 1" kısıtıyla aynı felsefe), `kullan` ile tüketilemez (`envanterEsyasiKullan` kategori kontrolü yapıp reddeder). Çürümez ama **her ~8-10 yılda bir** güncel değerinin ~%20'si kadar bir bakım/vergi masrafı çıkarır (§13). Yüksek ün, saray/elit olaylarının kilidini açar (§11 kural 9, `un>=70`).

**Dinamik fiyat:** `magazaFiyatiHesapla` (§13) — her eşyanın kendi `fiyatEtkenleri` haritası, `state.ulke`'nin o anki savaş/veba/kriz/ekonomi durumuna göre taban fiyatı çarpar (+ her zaman enflasyon). Yön kasıtlı olarak kategoriye göre **ters**: kriz/savaş şifa eşyalarını pahalandırır (kıtlık arzı azaltır), lüks eşyaları ise ucuzlatır (kimse kaos sırasında mücevher almaz) ve altın çağda pahalandırır. `GET /:id/magaza` bu hesaplanmış fiyatlarla, ayrıca `sahipMi`/`kilitli`/`kilitAciklamasi` alanlarıyla canlı kataloğu döner (yalnızca karakterin `cag`'ına uygun eşyalar).

**Akış:**
1. `GET /:id/magaza` → `magazaConfigGetir` — çağa uygun eşyaları güncel fiyat + kilit/sahiplik durumuyla döner.
2. `POST /:id/magaza/satin-al {katalogId}` → `magazadanSatinAl` — önce kilidi kontrol eder (`sifa` ise `temelMagazaKilitliMi`, `luks` ise zaten sahip olunup olunmadığı), sonra parayı düşer, yeni bir `SahipOlunanEsya` envantere ekler (`sifa`: `kalanYil = omurYil`; `luks`: `kalanYil` = rastgele 8-10 yıl bakım aralığı) ve `sifa` ise `magaza_temel_kilit_bitis_yili`'ni `state.yil + 3` yapar; `luks` ise `un` hemen artar. **Bir tur harcamaz.**
3. `POST /:id/envanter/:esyaId/kullan` → `envanterEsyasiKullan` — sadece `sifa` kategorisi için: eşyayı envanterden çıkarır, `saglik`/`mutluluk` etkisini (jitter'lı) uygular. `luks` eşyada hata fırlatır. **Bir tur harcamaz.**
4. Her oyun turunda (`sonucuUygulaVeIlerlet`, §9 adım 15h) `envanterBozulmasiUygula(state, yasArtisi)` çalışır: her eşyanın `kalanYil`'i o turda geçen gerçek yıl kadar azalır. `sifa` 0'a inince sessizce silinir — çürüyen eşya varsa adı(ları) doğrudan `zamanAnlatimi`'ye ("🗑️ ... çürüyüp elinde kaldı") eklenir. `luks` 0'a inince SİLİNMEZ, bakım masrafı çıkar ve ayrı bir cümle ("🔧 ... bakım/vergi gideri olarak ... ödedin") eklenir, sayaç yeniden kurulur (vergi bildirimi/ayyaşlık mesajlarıyla aynı "doğrudan ekle" deseni, §13/§25).

**İstemci:** `MagazaPaneli.tsx` iki sekmeli (Şifa/Lüks) bir mağaza ekranı; kilitliyken sifa kartları disabled + kilit banner'ı gösterir, sahip olunan luks kartları "· Sahipsin" etiketiyle disabled görünür (mülk kartlarıyla aynı `mulk-kart-sahip` stili). `EnvanterPaneli.tsx` hem gizemli eşyaları hem `magaza_envanteri`'ni listeler, `sifa` eşyalarında bir "Kullan" butonu ve kalan yıl uyarısı gösterir. `App.tsx`'te oyun ekranının üst satırında "🛒 Mağaza" butonuyla açılır (Sosyalleş'in yanında). Testler: [magaza.test.ts](server/tests/magaza.test.ts).

**Mimari not — gelecekteki "isimli/kişilikli iş arkadaşları" ve "derinleşen ilişkiler" için:** Bu sistem bilinçli olarak `EkipUyesi` (§4) ve ilişki puanlarından (`dost_puani`/`es_puani`/`sadakat`) bağımsız, ayrı bir envanter katmanı olarak kuruldu — `SahipOlunanEsya` kendi id/ad/simge/kategori alanlarını taşıdığı için, ileride bir "hediye et" etkisi (`ekip`/`es`/`dost`'a bir mağaza eşyası vererek ilişki puanı artırma) `magaza_envanteri`'nden bir kaydı çıkarıp ilgili puana delta uygulayan tek bir yeni fonksiyonla eklenebilir — ne katalog şemasının ne de mevcut satın-alma/kullanma akışının değişmesi gerekir. Şu an böyle bir "hediye" etkisi **yok**; bu sadece mevcut şemanın buna kapalı olmadığının notu.

## 27. Dünya Olayları: Zorunlu Bağış / Büyük Savaş / Veba / Küçük Kriz

Sosyalleşme/mağaza gibi oyuncu aksiyonuna bağlı değil; bunlar **tamamen arka planda** ([stateManager.ts](server/src/game/stateManager.ts)'teki saf fonksiyonlarla) tetiklenen, hiç olay ekranı gerektirmeyen periyodik mekanikler — **veba tek istisna** (aşağıya bakın). Hepsi `gameEngine.ts`'teki `sonucuUygulaVeIlerlet`'in yıl-ilerletme bloğunda (§9 adım 15), mevcut `krizEtkisiUygula`/`orduBuyumesiDene` ile aynı yerde, **turdaki HER yıl için ayrı ayrı** kontrol edilir (`orduBuyumesiDene`'deki `for (let i=0;i<yasArtisi;i++)` deseniyle aynı — bir tur 1-2+ yıl sürebildiği için "yıllık %X" ifadesinin gerçekten yıllık kalması için gerekli). Tetiklenirse sonuç mesajı, ayyaşlık bildirimiyle aynı "koşulsuz ekle" desende doğrudan `zamanAnlatimi`'ye + `hayat_hikayesi`'ne eklenir (§9'daki tek-slotlu `ekCumle` önceliğinden bağımsız). Hepsi `hapiste`/`yolculukta` etiketliyken o tur atlanır (kaybolmaz, ertesi turda tekrar denenir).

**Zorunlu Bağış** (`zorunluBagisKontrolEt`) — *"kral zenginleştiğini fark etti, bağış istiyor"*: nakit+mülk toplamı (`gayrimenkulDegeriHesapla`) **500**'ü aşınca ve son tetiklenmeden (ya da `baslangic_yili`'den) beri **en az 5 yıl** geçmişken, her yıl **%25** ihtimalle tetiklenir; tetiklenince servetin **%15-20**'si (`paraYuvarla`) `para`'dan zorla düşer, `son_zorunlu_bagis_yili` güncellenir. **Zenginliğin TEK bedeli budur** — eski pasif %4/yıl "zenginlik vergisi" (§13) kaldırıldı. `dunyaFinansEtkileri` servet 500'ü aşınca bir uyarı satırı ekler (cooldown içindeyse "~N yıl daha bağış isteyemez", değilse "her yıl ~%25 ihtimalle …").

**Büyük Savaş** (`buyukSavasKontrolEt`/`buyukSavasBitisKontrolEt`): SADECE `!state.ulke.savasta` iken kontrol edilir — bu yüzden mevcut "tarihi savaş ilanı" mekanizmasıyla (§11 kural 1, sabit tarihli, tek seferlik) asla üst üste binmez; hangisi önce `ulke.savasta`'yı `true` yaparsa öbürü sessizce beklemeye devam eder. Son savaşın bitişinden (ya da `baslangic_yili`'den) beri **en az 10 yıl** geçmişken, her yıl **%10** ihtimalle başlar. Başlayınca: düşman `tarihiSavasKontrol(bolge,yil,cag) ?? komsuGucSec(bolge)` ile seçilir (aynı iki fonksiyon `{komsu}` placeholder'ının kullandığıyla birebir aynı, §6/§16), süre **3-6 yıl**, `state.buyuk_savas = {dusman, baslangicYili, bitisYili, vergiOrani: 0.15-0.20, gidaCarpani: 1.25-1.35}`, `ulke.savasta=true`. Savaş sırasında `ulke.savasta`'yı zaten okuyan TÜM mevcut formüller (maaş ×0.85, mülk getirileri, mağaza fiyatları, ordu kaybı/büyümesi, kervan batma riski) otomatik devreye girer; ayrıca `giderKalemleriHesapla`'da **iki yeni etki** biner: `yasam` gideri `gidaCarpani` ile çarpılır, ve ayrı bir `savasVergisi` kalemi (`maas_yillik × vergiOrani`) pasif gelirden ek olarak kesilir (Finans ekranında "⚔️ Savaş vergisi" satırı). Süre dolunca `ulke.savasta=false`, `son_buyuk_savas_bitis_yili` yazılır, 10 yıllık cooldown yeniden başlar.

**Veba** (`vebaBaslamaliMi`/`vebaBaslat`/`vebaYillikKontrol`/`vebaBitisKontrolEt`) — yama #2'de ciddi biçimde elden geçti. **TEK istisna** — gerçek bir oyuncu kararı gerektirdiği için zorlanan olaylar olarak tanımlı ([kureselOlaylar.ts](server/src/data/olaylar/kureselOlaylar.ts)):
- **Başlangıç:** `kuresel_veba_baslangici` — **18+ yaşında her yıl %3** (`VEBA_YILLIK_IHTIMAL`, yama #2'de %4→%3) ihtimalle `oturum.zorlananOlayId`'ye zorlanır. Artık "ömürde bir kez" DEĞİL — bir dalga (aktif+iz fazı) tamamen bitince `son_veba_bitis_yili` yazılır ve **20 yıl cooldown** (`VEBA_COOLDOWN_YIL`) sonrası tekrar tetiklenebilir (uzun ömürde tipik 1, nadiren 2 kez). Aktif/iz fazındaki bir veba (`state.veba` dolu) yeni dalgayı bloklar.
- **3 seçenek = 3 korunma kademesi** (her biri `veba_koruma` 0/1/2 verir, `ulke_etkisi:{vebada:true}` ile): "kırsala çekil" (maliyet 15, para −15/mutluluk −10/ün −4, `veba_koruma:2`) / "evde karantina" (maliyet 6, para −6/mutluluk −6, `:1`) / "hayatına devam et" (bedava, `:0`). `baseBasariSansi` < 100 ve **başarısız seçim korunmayı bir kademe düşürür**.
- `vebaBaslat(state, korumaSeviyesi)`: aktif faz **2-4 yıl** + **10-15 yıl** iz fazı (`etkiBitisYili`); iz süresince konut kirası **×0.60-0.70**, maaş **×1.20-1.30**.
- **Yıllık ölüm riski `korumaSeviyesi`'ne göre 3 kademe** (`vebaYillikKontrol`, yama #2'de ciddileştirildi): karakter `VEBA_OLUM_KADEME = [0.09, 0.05, 0.025]` ([hiç, kısmi, tam]); eş `[0.05, 0.03, 0.015]`; çocuk `[0.045, 0.028, 0.013]`. 2-4 yıllık aktif fazda korumasız kümülatif ölüm ~%20-28, tam korunmalı ~%6-8.
- **"Salgın dönemi" bulaşma olayları** (yalnız `gerekliUlke:{vebada:true}` iken normal havuza girer): `veba_kapiyi_calan` (hasta akraba sığınıyor), `veba_cenaze`, `veba_pazarda_temas`, `veba_hasta_bakiciligi` — her biri yardım/temas (ahlak+, büyük `saglik` kaybı + `olum_sansi` başarısızlıkta) ile kaçınma (vicdan/moral bedeli) arasında seçim; bu riskler yıllık ölüm zarının ÜSTÜNE biner.
- Aktif faz bitince `ulke.vebada=false` ama `state.veba` silinmez (iz sürer); `etkiBitisYili`'ye ulaşınca `state.veba=null` + `son_veba_bitis_yili=yil`.

**Küçük Kriz** (`kucukKrizKontrolEt`): mekanik olarak mevcut **"kitlik" kriz tipini yeniden kullanır** (§13 `KRIZ_ETKI`, yama #1'de **-1** sağlık/yıl — eskiden -2) — yeni bir `UlkeKrizi.tur` eklenmez, mesaj metninde "Kıtlık"/"Haydut Baskını" arasında rastgele seçim (flavor). `state.ulke.kriz` zaten aktifken atlanır. `kucuk_kriz_sonraki_yil` eşiğine (yaratılışta `baslangic_yili + 5..7`) ulaşınca: `state.ulke.kriz={tur:"kitlik", bitisYili: yil+1..2}` (yama #1'de 2-3→1-2 yıl), **ayrıca** `gida_fiyat_sok_bitis_yili = yil+2` yazılır (`giderKalemleriHesapla`'daki `yasam` gideri o yıl ve sonraki yıl ×2 olur — 2026-09'da `+1`→`+2`: bu fonksiyon `pasifEkonomiUygula`'dan SONRA çağrıldığı için `+1`'de ×2 hiç tahsil edilemiyordu, ölü mekanikti), ve `kucuk_kriz_sonraki_yil` yeniden `yil + 5..7` olarak kurulur.

**Etkileşim notu:** Savaşın `gidaCarpani`'si ile küçük krizin ×2 şoku **çarpımsal birleşir** (nadir ama kasıtlı olarak engellenmiyor) — ikisi aynı yıla denk gelirse gıda gideri hem savaş hem kriz çarpanıyla büyür.

Testler: [donemselDunyaOlaylari.test.ts](server/tests/donemselDunyaOlaylari.test.ts).

## 28. Prodüksiyon Deploy (Web — Render, tek servis)

Yerel geliştirme hâlâ iki ayrı process (`server/` + `client/` `npm run dev`). **Prodüksiyonda tek bir "always-on" Node servisi** çalışır:

- **[client/vite.config.ts](client/vite.config.ts):** `build.outDir = "../server/public"`, `emptyOutDir: true` — `vite build` çıktısı doğrudan sunucunun statik klasörüne yazılır. Dev sunucusu (proxy `/api → :3001`) etkilenmez.
- **[server/src/server.ts](server/src/server.ts):**
  - `ISTEMCI_DIZINI = path.resolve(__dirname, "..", "public")` (çalışma anında `server/dist/../public`). `index.html` varsa `express.static` + API-dışı tüm GET'ler için `index.html` geri düşüşü; yoksa (sadece-backend geliştirme) bu blok atlanır.
  - `GET /healthz` → `{ok:true}` (Render `healthCheckPath`).
  - **helmet CSP** artık elle yapılandırılıyor: `style-src`/`font-src` Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) için gevşetildi + `style-src 'unsafe-inline'` (React inline style attribute'ları). Dev'de istemci ayrı origin'den geldiği için CSP hiç HTML'e uygulanmıyordu; tek servise geçince zorunlu oldu. Yeni bir dış kaynak (CDN, analytics, farklı API) eklenirse bu direktif listesi güncellenmeli.
  - `app.listen(PORT)` — `PORT` Render tarafından enjekte edilir (`process.env.PORT ?? 3001`). `trust proxy` zaten 1.
- **Kök [package.json](package.json)** (yeni, deploy kökü — oyun mantığıyla ilgisi yok): `build` = server+client `npm ci --include=dev` → `prisma generate` → client build → server `tsc`; `start` = server'ın `start:prod`'u.
- **[server/package.json](server/package.json):** yeni scriptler `start:prod` (`prisma migrate deploy && node dist/server.js`) ve `prisma:generate`. Eski `start` (`node dist/server.js`) korundu.
- **[render.yaml](render.yaml):** tek `web` servisi, `plan: free`, disk YOK. Veritabanı **harici bir PostgreSQL** (Neon/Supabase); `DATABASE_URL` `sync:false` ile Render panelinden elle girilir. `migrate deploy` build'de değil **start'ta** (`start:prod`) çalışır — canlı Neon şemasını günceller. Free plan 15 dk hareketsizlikte uyur (~50 sn cold start); aktif oturumlar DB'de olduğu için kaybolmaz.
- **Prisma → PostgreSQL:** [schema.prisma](server/prisma/schema.prisma) `provider = "postgresql"` (eski SQLite'tan taşındı — free plan kalıcı disk vermediği için). Eski SQLite migration'ları silinip tek bir Postgres baseline'ı ([server/prisma/migrations/0_init/](server/prisma/migrations/0_init/migration.sql)) ile değiştirildi. `Score.skor` ve `Score.para` artık `Float` (skor formülü ondalık üretebiliyor, §13). Yerel geliştirme de artık bir Postgres ister (Docker ya da Neon dev branch) — `server/.env.example` Docker satırını içeriyor.
- **[.node-version](.node-version):** `22`. **[.gitignore](.gitignore):** `server/public/` (build çıktısı), `*.db`, `.env` dosyaları eklendi.
- Deploy sonrası CLAUDE.md/README güncel tutma kuralı (§23 mantığı) burada da geçerli.

## 29. Ayarlar Ekranı & Geri Bildirim

Dişli (`⚙️`) düğmesi kökte `ekran`'dan bağımsız her zaman render edilir (`.ayar-ac-buton`, sağ üst, `.ses-toggle-buton`'un solunda); giriş ekranında ayrıca kahraman buton satırında bir "⚙️ Ayarlar" düğmesi var. İkisi de `App.tsx`'teki `ayarlarAcik` state'ini açar → **[AyarlarModal](client/src/components/AyarlarModal.tsx)** (ortalanmış, `.ayarlar-katman`/`.ayarlar-modal`, Esc + overlay tıklama + ✕ ile kapanır).

**İki sekme:**
- **Genel:** (a) **Dil** — `tr`/`en` seçimi, `ayarlariKaydet({dil})` ile `localStorage`'a (`kader-carki-ayarlar`) yazılır; `App.tsx`'teki `dil` state'i modalı anında yeniden çevirir. Çeviri altyapısı ([i18n.ts](client/src/i18n.ts) `metinler(dil)`) **şu an SADECE bu modalı** kapsar — menüler, olay metinleri, üretilen anlatı hâlâ Türkçe (kapsam ileride kademeli genişletilebilir; `EN` nesnesi `typeof TR` olduğu için anahtar kümeleri hep eşit kalır). "English (beta)" seçilince altta bir uyarı satırı çıkar. (b) **Ses** — Açık/Kapalı; mevcut `sesToggle`/`ses.ts` tercihini yönetir (ayrı bir ayar alanı değil).
- **Görüş & Öneri:** kategori (`hata`/`oneri`/`diger`) + mesaj (maks 2000, sayaç) + opsiyonel iletişim (maks 120). `App.tsx.geriBildirimGonderHandler` gönderirken **oyun bağlamını otomatik ekler**: `stateId, ekran, cag, bolge, yerlesim, meslek, yas, yil, surum` (`APP_SURUM`, App.tsx tepesinde elle güncellenen sabit), `dil`, `userAgent`. Başarıda form yerini yeşil onay + "Yeni mesaj gönder" alır.

**Sunucu:** `POST/GET /api/geri-bildirim` ([geriBildirim.routes.ts](server/src/routes/geriBildirim.routes.ts), [server.ts](server/src/server.ts)'te `geriBildirimLimiti` 5/60sn ile mount'lu). Saf `geriBildirimTemizle(govde)` doğrular/temizler (min 3 karakter, gizli `sirket` bal küpü → sessiz 200, mesaj 2000'e / iletişim 120'ye / bağlam alanları 300'e kırpılır) — HTTP dışında test edilebilir (bkz. [verifyGeriBildirim.ts](server/scripts/verifyGeriBildirim.ts), §22). Kayıt [geriBildirimDeposu.ts](server/src/utils/geriBildirimDeposu.ts) ile JSONL'ye yazılır (§20 — Prisma yok) **ve** [webhookBildirim.ts](server/src/utils/webhookBildirim.ts) ile `GERI_BILDIRIM_WEBHOOK_URL`'e ateşle-unut POST atılır (URL `api.telegram.org` içeriyorsa Telegram `{chat_id,text}`, yoksa Discord `{content}`; hata ana isteği etkilemez). `GET`, `GERI_BILDIRIM_ANAHTARI` env'iyle `?key=` eşleşmezse 403.

**Env** (hepsi opsiyonel, §1 + [render.yaml](render.yaml)): `GERI_BILDIRIM_WEBHOOK_URL`, `GERI_BILDIRIM_TELEGRAM_CHAT_ID`, `GERI_BILDIRIM_ANAHTARI`, `GERI_BILDIRIM_DOSYA`. Hiçbiri yoksa: geri bildirim yalnız yerel JSONL'ye yazılır, okuma ucu 403 döner.

**CSP notu (§28):** webhook sunucudan dışarı gittiği için tarayıcı `connect-src` direktifi etkilenmez — CSP'ye dokunulmadı.

## 30. İki Dillilik (TR/EN) — Gösterim Anında Çeviri Katmanı

Oyunun **tamamı** İngilizceye çevrildi. **Türkçe kaynak KANONİK** kalır: motor mantığı, filtreler, etiketler, `meslek`/`bolge`/`kisilik`/`rol` anahtarları, olay `id`'leri hep Türkçe değerleri kullanır. İngilizce **yalnızca metin oyuncuya gönderilmeden hemen önce** bir arama katmanıyla uygulanır. `CharacterState.dil: "tr" | "en"` (JSON blob; `eskiKayitGocu` `"tr"` varsayar).

### Sunucu i18n ([server/src/i18n/](server/src/i18n/))
- **[index.ts](server/src/i18n/index.ts):** yardımcılar — `T(dil, tr, params?)` (parametreli çeviri), `K(dil, tr)` (kısa anahtar), `Khukumdar`, `ikiDil`.
- **[katalog.en.ts](server/src/i18n/katalog.en.ts):** `KATALOG_EN` — çağ/bölge/din/para birimi/yerleşim/konut/yaşam tarzı/mülk/mağaza/rütbe/hizip/kişilik/aile mesleği vb. **statik katalog** metinlerinin İngilizce karşılıkları. Terminoloji sözlüğü buradadır: yeni olay çevirisi yazarken bölge/rütbe/hizip adları buradan alınır (ör. Fransa→France, "Din Adamı"→"Clergyman"; para birimi adları KORUNUR: Livre/Mark/Kuruş...).
- **[anlatim.en.ts](server/src/i18n/anlatim.en.ts):** `ANLATIM_EN` — motorun ürettiği anlatı/haber/zaman-geçişi/sonuç metinlerinin İngilizcesi (`sonucAnlatimiUret`, `zamanAnlatimiUret`, `haberleriUret` vb.).

### Olay çevirileri ([server/src/i18n/olaylar/](server/src/i18n/olaylar/))
Her kaynak `data/olaylar/X.ts` için bir **ayna dosyası** `X.en.ts`, `export const OLAYLAR_X_EN: Record<olayId, OlayCeviri>` dışa aktarır. Hepsi [olaylar/index.ts](server/src/i18n/olaylar/index.ts)'teki `KAYIT: Record<string, OlayCeviri>[]` dizisine (import satırı + dizi girişi) eklenir; `CEVIRI_INDEKSI = Object.assign({}, ...KAYIT)`.
- **`OlayCeviri`** şekli: `{ baslik?, metin?, secenekler?: (SecenekCeviri | null)[] }`. `secenekler` kaynak sırasıyla **birebir** eşleşir; çevrilmeyen seçeneğe `null` konur.
- **`SecenekCeviri`:** `{ metin?, ipucu?, kilitAciklamasi?, basariliSonuc?: {mesaj?, detay?}, basarisizSonuc?: {mesaj?, detay?}, onTepki?: {metin?, geriCekilMetni?, geriCekilSonucu?: {mesaj?, detay?}, devamMetni?, devamSonucu?: {mesaj?, detay?}} }`.
- **`olayCevirisiUygula(olay, dil)`** ([olaylar/index.ts](server/src/i18n/olaylar/index.ts)): `dil !== "en"` ya da kayıt yoksa olayı olduğu gibi verir; aksi halde **sığ bir kopya** döndürür — yalnız gösterim alanları (`baslik`, `metin`, `secenekler[].metin`/`ipucu`/`kilitAciklamasi`/`basariliSonuc.{mesaj,detay}`/`basarisizSonuc.{mesaj,detay}`/`onTepki.*`) İngilizceye çevrilir; **tüm mantık alanları** (filtreler, `baseBasariSansi`, `etki`'ler, `id`, `etiket_ekle` vb.) aynen korunur. `olaySecici.ts`'teki `olaySec()`'e bağlıdır.
- **Kanonik kalanlar:** olay/seçenek metnindeki `{dost}/{rakip}/{es}/{amir}/{ekip}/{bolge}/{yil}/{birim}` vb. placeholder'lar **birebir** korunur; `unvan_kazan` gibi mantık alanları çevrilmez (anlatı `mesaj`/`detay` içinde unvana atıf yapılıyorsa cümle doğal İngilizceye çevrilir).
- Kaynak koddaki `//` yorumlar **Türkçe kalır**; sadece oyuncuya görünen dizeler (oyuncuya görünen hata mesajları dahil) çevrilir.

### İstemci i18n
- **[DilContext.tsx](client/src/DilContext.tsx):** `DilProvider` + `useDil()` — `localStorage`'daki dil tercihini tutar (`ayarlar.ts` `{dil}`).
- **[i18n.ts](client/src/i18n.ts):** `metinler(dil)` → tipli arayüz sözlüğü (`EN` nesnesi `typeof TR`; anahtar kümeleri hep eşit).
- **[katalog.ts](client/src/katalog.ts):** `kt(dil, tr)` — istemci tarafı statik katalog çevirisi (`bolgeTema` unvanları, konut/yaşam/mağaza adları vb.).
- `client/src/types.ts` hâlâ `server/src/types.ts`'in elle senkron kopyası (§24); `dil` alanı ikisinde de var.

### Doğrulama (yerel dev server env uyumsuzluğu yüzünden çalışmaz, §22)
```
cd server && npx tsc --noEmit --pretty false && npx tsx scripts/ceviriDurumu.ts
```
[ceviriDurumu.ts](server/scripts/ceviriDurumu.ts): kapsam yüzdesi + **sürüklenme (drift) kontrolü** — çeviride kaynaktan fazla seçenek var mı, **yetim çeviri id'si** (kaynağı olmayan `Record` anahtarı, `tumCeviriIdleri()` ile) var mı. `--full` dosya dosya döküm verir. Şu an: **1061/1061 olay %100 kayıtlı, ~%99.9 dize çevrili, sürüklenme yok.** Yeni bir kaynak olayı eklerken `X.en.ts`'ine karşılığını da ekle, yoksa `ceviriDurumu` kapsam düşüşü gösterir (uyarı değil, sadece yüzde).
