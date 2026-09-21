# CLAUDE.md — Kader Çarkı (Threads of Destiny) Motor Referansı

> **Bu dosyanın amacı:** Bu depoda çalışan bir yapay zekanın, kodu baştan keşfetmeden (48.000+ satırlık olay verisini, 1400 satırlık state motorunu vb. tekrar tekrar okumadan) oyunun tüm kurallarını, değişkenlerini ve mimarisini anlamasını sağlamak. **Bu dosya yeterli bilgiyi içeriyorsa `server/src/data/olaylar/*.ts` dosyalarını veya `stateManager.ts`'i tamamen okumaya GEREK YOK.** Belirli bir olay id'si, tam bir formül satırı veya bu dosyada geçmeyen bir ayrıntı gerekiyorsa, ilgili dosyada **grep** ile hedefli arama yap — dosyanın tamamını okumak yerine. Aşağıdaki tüm sayılar/formüller kaynak koddan birebir doğrulanmıştır (2026 itibarıyla).

## 0. Oyun Nedir

**Kader Çarkı**, Türkçe, metin tabanlı, tarihi bir hayat simülasyonudur. Oyuncu bir **çağ** (Orta Çağ ya da Sanayi Devrimi), bir **bölge/ülke** ve bir **yerleşim tipi** seçer; ailesi, kişiliği ve dini rastgele belirlenir. 15 yaşında bir **meslek** (Asker/Tüccar/Din Adamı/Zanaatkâr — 2026-09 sonunda eklenen 4. meslek) seçilir ve karakter, her turda sunulan bir olay + 2-4 seçenek arasından seçim yaparak yaşar. Zar atılır, sonuç uygulanır, yıllar ilerler; **ölüm kalıcıdır**. Oyun başında (yerleşim seçiminden sonra) oyuncudan bir **isim** istenir — boş bırakılırsa seçilen ülkeye uygun rastgele bir isim atanır; bu isim oyun boyunca sol üstte görünür ve ölümde skor **otomatik olarak** bu isimle liderlik tablosuna kaydedilir (§18). **Soy sürdürme ("hanedan modu") 2026-09'da tamamen kaldırıldı** — ölüm kesin sondur, yeniden başlamak yeni bir karakter oluşturur.

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
| `npm test` | server/ | `vitest run` — 35 test dosyası (bkz. §23) |
| `npm run build` / `start` | server/ | `tsc` derleme / `node dist/server.js` |
| `npm run simulate` | server/ | `scripts/simulateEconomy.ts` — ekonomiyi bin ömür simüle eder |
| `npm run analyze-olaylar` | server/ | `scripts/analyzeOlaylar.ts` — olay bankası istatistikleri (bölge/meslek/yaş dağılımı, gerçek `olaySec()` ile simülasyon) |
| `npm run build` / `lint` | client/ | `tsc -b && vite build` / `oxlint` |
| `npm run db:local` | server/ | **Gömülü (portable) PostgreSQL — Docker/kurulum gerektirmez.** `embedded-postgres` (devDep) `server/.localdb`'de bir cluster çalıştırır (localhost:5432, `postgres`/`kader`, db `kadercarki`); ilk çalıştırmada cluster + db'yi kurar. Ayrı terminalde açık bırak, sonra `npm run dev`. `scripts/localDb.ts` — Windows sistem yereli ASCII-dışı olduğundan `initdbFlags:['--locale=C','--encoding=UTF8']` şart. `.localdb` gitignore'da |
| `npm run db:setup` | server/ | `prisma generate && prisma migrate deploy` — `db:local` çalışırken şemayı kurar |
| `npx prisma migrate deploy` | server/ | PostgreSQL şemasını kurar (önce yerelde bir Postgres + `DATABASE_URL` gerekir) |

`.env` (server/): `DATABASE_URL="postgresql://.../kadercarki"` (yerelde: en kolayı `npm run db:local` → `postgresql://postgres:kader@localhost:5432/kadercarki`; alternatif Docker Postgres ya da Neon dev branch — `.env.example`'a bak), `PORT=3001`. CORS için `CORS_ORIGIN` (virgülle ayrılmış origin listesi, yoksa `http://localhost:5173`). Geri bildirim (§29) için opsiyonel: `GERI_BILDIRIM_ANAHTARI` (`GET /api/geri-bildirim?key=` okuma anahtarı; boşsa 403 — yazma anahtarsız Neon'a çalışır), `GERI_BILDIRIM_WEBHOOK_URL` (Discord webhook ya da Telegram sendMessage URL'si — opsiyonel anlık haber), `GERI_BILDIRIM_TELEGRAM_CHAT_ID`. İstatistik (§32) için opsiyonel: `ISTATISTIK_ANAHTARI` (`GET /api/istatistik[/panel]?key=` okuma anahtarı; boşsa uç 403).

## 2. Uçtan Uca Mimari

- **Oturum (session) modeli:** Her karakter bir `CharacterState` nesnesidir, `randomUUID()` ile `id` alır. Sunucu bunu iki katmanda tutar:
  1. **In-memory `Map<string, Oturum>`** (`gameEngine.ts` içindeki `oturumlar`) — aktif oyun döngüsü (mevcut senaryo, bekleyen tepki, son ton) burada tutulur, DB'de saklanmaz.
  2. **PostgreSQL `Session` tablosu** — `CharacterState` tamamen `JSON.stringify` edilip `data` sütununa yazılır (bkz. §21). Her state-mutasyonundan sonra `oturumKaydet()` çağrılır.
- **Kurtarma:** Sunucu açılışında `oturumlariYukle()` DB'deki `aktif:true` tüm oturumları belleğe yükler — sunucu yeniden başlasa bile yarım kalan oyunlar devam eder. Hemen ardından `gecmisSkorlariKaydet()` `aktif:false` + `skoru_kaydedildi:false` bitmiş oturumları liderlik tablosuna geçirir (§18).
- **Temizlik:** Saatte bir (`server.ts`): bitmiş (`aktif:false`) ve 30 dk'dır erişilmemiş oturumlar bellekten silinir (DB'den silinmez); DB'de 7 günden eski bitmiş oturumlar tamamen silinir.
- **İstemci kalıcılığı:** `client/src/oturum.ts` sadece aktif `state.id`'yi `localStorage` içinde tutar (sayfa yenilenince kaldığı yerden devam) — hiçbir hassas veri saklanmaz. `basarimlar.ts` ayrıca, oyundan bağımsız olarak, kazanılan **ünvanları** ve **efsanevi ölümleri** `localStorage`'da kalıcı bir koleksiyon olarak biriktirir (çok-oyunluk meta-ilerleme, sunucuya kaydedilmez). `gecmisHayatlar.ts` benzer şekilde, ölen her karakterin bir özetini (isim/meslek/çağ/bölge/yaş/skor + `hayat_hikayesi` + `gecmis` grafiği) `localStorage`'da son 20 kayıtla sınırlı biriktirir — giriş ekranındaki "Geçmiş Hayatların" listesi/detayı bunu okur.
- **Rate limit:** `/api/game/*` → 60 istek/60sn; `/api/scores/*` → 10 istek/60sn (IP başına, `express-rate-limit`, `trust proxy` açık).
- **Katman akışı:** `routes/*.routes.ts` (HTTP + doğrulama) → `game/gameEngine.ts` (orkestrasyon: oturum yönetimi + zorlanan-olay kaskadı + tur çözümleme sırası) → `game/stateManager.ts` (saf mekanik fonksiyonlar/formüller) → `game/olaySecici.ts` (olay seçimi/ağırlıklandırma) → `data/olaylar/*.ts` (870 olayın statik verisi) → `db/*Repository.ts` (Prisma persistence).

## 3. API Referansı

Taban: `/api/game` (oyun) ve `/api/scores` (liderlik tablosu).

| Metot & Yol | Body | Ne yapar |
|---|---|---|
| GET `/meslekler` | – | `["Asker","Tüccar","Din Adamı","Zanaatkâr"]` (2026-09 sonu: Zanaatkâr eklendi) |
| GET `/bolgeler` | – | Çağ→bölge listesi |
| GET `/yerlesimler` | – | 4 yerleşim tanımı (yeni nötr `kasaba` + eski 3) — **seçim ekranı 2026-09'da kaldırıldı; endpoint yalnız Finans yaşam maliyeti/geri uyum için duruyor** |
| GET `/konutlar` | – | 6 konut kademesi + taşınma maliyeti |
| GET `/yasam-secenekleri` | – | 6 yaşam tarzı kademesi |
| POST `/new` | `{cag,bolge,yerlesim,isim?}` | Yeni karakter oluşturur (`createCharacter`); `isim` opsiyonel — verilirse küfür filtresinden geçip 40 karaktere kırpılarak `state.isim`'e yazılır, verilmezse `null` |
| POST `/:id/meslek` | `{meslek}` | 15 yaşında meslek atar (tek seferlik) |
| GET `/isim-onerisi?cag=&bolge=` | – | İsim seçim ekranı için: bölge/çağa uygun kültürel tek bir isim önerir (`{isim}`) |
| GET `/:id/state` | – | Tam `CharacterState`'i döner |
| POST `/:id/dil` | `{dil}` | Oyun sürerken `state.dil`'i günceller (`"en"` dışındaki her şey `"tr"`). `state.dil` normalde yalnız `POST /new`'de yazıldığı için, Türkçe başlayıp Ayarlar'dan İngilizceye geçen (ya da eski/göç etmiş) kayıtlarda olay/anlatı metinleri Türkçe takılı kalıyordu. İstemci `dilDegistir` bunu aktif oyun varken çağırır; değişiklik **bir sonraki `/scenario`'dan** itibaren geçerli (o an ekranda duran olay çevrilmez). Turu tüketmez |
| POST `/:id/scenario` | – | Bir sonraki olayı üretir (zorlanan-olay kaskadını çalıştırır, bkz. §11) |
| POST `/:id/choice` | `{secenekIndex}` | Seçimi uygular; `SecimSonucu` **ya da** `TepkiSonucu` (ara-tepki) döner |
| GET `/:id/finans` | – | Salt-okunur gelir/gider dökümü (turu tüketmez) — `maasYillik`, `giderKalemleri`, `netYillik` (= maaş − gider), `enflasyonYuzdesi`, `gayrimenkulDegeri`, `maasKirilim` (maaşın rütbe/kariyer/dönemsel kırılımı, §13), `gayrimenkulYillikGelir` (mülklerden yıllık tahmini net gelir; maaşın DIŞINDA ayrı akış — istemci "eline kalan"a ekler) ve `dunyaEtkileri` (`{ikon,metin}[]` — şu an bütçeyi/sağlığı etkileyen dünya durumlarının insan-okunur listesi: ekonomi ±%, savaş/büyük savaş, salgın aktif/iz, kıtlık/isyan/altın çağ, gıda şoku, enflasyon, **artık zorunlu bağış eşiğini göstermez** — ekonomi sıkılaştırma turunda o satır kasıtlı olarak kaldırıldı, mekanik (servet > 350 → kral sessizce bağış alabilir, §27) hâlâ arka planda çalışıyor; `dunyaFinansEtkileri(state)`, formülü açıklar HESAPLAMAZ) |
| GET `/:id/kotu-is-config` | – | "Karanlık işler" listesi: 5 illegal aksiyonun canlı başarı şansı + tahmini kazanç (§13) |
| POST `/:id/kotu-is` | `{tur, hedefRakipAd?, vekil?}` | Bir karanlık iş çevirir (`rakibi_korkut`/`adam_dov`/`rakibi_dov`/`birini_soy`/`isyeri_yak`) — zarlı, turu tüketmez; başarısızlıkta hapis/ölüm riski (§13). `hedefRakipAd` + `vekil` = derin rakip ilişkileri (§34.2) |
| GET `/:id/rakipler` | – | İsimli rakiplerin listesi (`{ad,meslek,guc,husumet,yenildi}`) — Görevin ekranı + karanlık iş hedef seçimi (§34.2) |
| GET `/:id/amaclar` | – | 3 kişisel hayat amacının durumu: `{amaclar: AmacKarti[], carpan}` — sağ panel canlı ilerleme kartı + ölüm ekranı (§18). Turu tüketmez |
| GET/POST `/:id/salgin-korunma` | POST: `{kademe:1\|2}` | Kalıcı salgından korunma yatırımı: veba gelmeden önce bir sonraki dalganın taban korunmasını yükselt (§34.4). Turu tüketmez |
| GET `/:id/kredi` | – | Tefeci: aktif kredi + `maksTutar`/`faizTeklifi` (§34.5) |
| POST `/:id/kredi/al` | `{tutar}` | Tefeciden borç alır (§34.5). Turu tüketmez |
| POST `/:id/kredi/pazarlik` | – | Aktif kredi faizini bir kez pazarlık eder (§34.5) |
| POST `/:id/envanter/:esyaId/hediye` | `{hedef:"es"\|"cocuk"\|"ekip"\|"dost", cocukIndex?, ekipId?}` | Mağaza envanterinden bir eşyayı verip ilişki puanı artırır (§34.3). Turu tüketmez |
| GET `/:id/mulk-config` | – | 6 piyasa mülkünün güncel fiyat/getiri önizlemesi (+ `yillikBakimTahmini`: 7-11 yılda bir çıkan bakım/vergi masrafının yıllığa amorti edilmiş hâli; + `tahminiYillikNet` = brüt getiri − yıllık bakım, §13) |
| POST `/:id/mulk` | `{tur}` | Mülk satın alır |
| GET `/:id/evlilik-adaylari` | – | Olay dışı evlenme: 18+ yaş, bekar bir karaktere 2 rastgele aday döner (`{isim,meslek,rutbe,kisilik,uyumYuzdesi}`, her çağrıda yeniden üretilir, state'te saklanmaz; turu tüketmez) |
| POST `/:id/evlilik-teklifi` | `{aday}` | GET'in döndürdüğü bir adaya teklif eder (istemci adayı olduğu gibi geri gönderir); uyum+mutluluk/ün'e göre zar atılır, kabul edilirse `es_ata` benzeri state güncellemesi olur, reddedilirse tekrar denenebilir (turu tüketmez) |
| GET `/:id/aile` | – | Aile ekranının verisi: eş/çocuk özeti (çocuklarda `iliski` 0-100), etkileşim kataloğu + cooldown kilitleri, bekleyen `aile_talep` (§33). Turu tüketmez |
| POST `/:id/aile/etkilesim` | `{etkilesimId, cocukIndex?}` | Eş/çocukla bir etkileşim (hediye/zaman/sevgi/gezi/oyna/eğitim); maliyet düşer, ilişki+mutluluk artar, cooldown yazılır (§33). Turu tüketmez |
| POST `/:id/aile/talep` | `{karar:"kabul"\|"ret"}` | Bekleyen aile talebini yanıtlar — kabul: para gider + ilişki artar; ret: ilişki + mutluluk düşer (§33). Turu tüketmez |
| GET `/:id/yonetim` | – | Kariyer sayfası "Yönetim" verisi: iki ilişki hattı (`yonetici` + `patron`) unvan/ad/ilişki, etkileşim kataloğu (bağış/hediye/yağcılık/hizmet), istekler (ilişki yüksekken açılan iyilikler) + kilitler + bekleyen `yonetim_talep` (§35). Turu tüketmez |
| POST `/:id/yonetim/etkilesim` | `{etkilesimId}` | `"yonetici:bagis"` gibi; para düşer, ilişki artar, cooldown yazılır; `yalan` etkileşiminde ahlak/mutluluk düşer + ifşa riski (§35). Turu tüketmez |
| POST `/:id/yonetim/istek` | `{istekId, yalan?}` | İlişki eşiği aşıldıysa bir iyilik ister (vergi kayırma / sicil temizliği / terfi / rakibe darbe / sermaye / zam / kredi kefaleti / iş bağlantısı); ilişki harcar, zarlı; `yalan:true` şansı artırır ama ahlak düşürür + ifşa riski (§35). Turu tüketmez |
| POST `/:id/yonetim/talep` | `{karar:"kabul"\|"ret"\|"yalan"}` | Dayatılan bağış/sadakat talebini yanıtlar — kabul: (bağışsa) para gider + ilişki artar; ret: ilişki + şöhret düşer; yalan: ahlak/mutluluk düşer, %30 ifşa (§35). Turu tüketmez |
| GET `/:id/dedikodu` | – | Piyasa dedikodusu satırları |
| GET `/:id/zar-kademeleri` | – | Enflasyona göre ölçeklenmiş bahis kademeleri |
| POST `/:id/zar` | `{tutar}` | Hazard (zar) mini-oyunu: 2+2 zar, çift/yüksek toplam kazanır (§13). `{state,kazandi,senZar,rakipZar,cift,bicakCekildi,mesaj}` döner |
| POST `/:id/uc-kagitci` | `{tutar,secim}` | Üç Kağıtçı mini-oyunu (~%34 sabit şans, §13). `{state,kazandi,dogruBardak,mesaj}` döner |
| POST `/:id/bilek-guresi` | `{basarili}` | Bilek Güreşi mini-oyunu sonucu (istemci beceri oyunu, sunucu sonuca güvenir, §13). `{state,mesaj}` döner |
| POST `/:id/konut` | `{konutId}` | Konut değiştirir (turu tüketmez) |
| POST `/:id/yasam` | `{secimId}` | Yaşam tarzını değiştirir (turu tüketmez) |
| POST `/:id/ekip/:ekipId/cikar` | – | Ekip üyesini kovar (turu tüketmez) |
| GET `/:id/sosyallesme-yerleri` | – | Çağ/bölge/mesleğe uygun (ve gerçekten gösterilecek bir olayı olan) sosyalleşme mekânlarını döner — 2026-09'dan beri **en fazla 3 slot** (§25) |
| POST `/:id/sosyallesme` | `{yerId}` | Seçilen mekâna gider; **peşin `girisUcreti` düşer** (enflasyonlu ~3), o mekânın havuzundan bir olayı zorlanan-olay olarak kuyruğa alır. Mekân bu yıl zaten ziyaret edildiyse (`SOSYALLESME_MEKAN_COOLDOWN=2` yıl) reddeder. Turu tüketmez; dönüşte `girisUcreti` (§25) |
| POST `/:id/sosyallesme-olay` | `{secenekIndex}` | **Kuyruğa alınan mekân olayını TUR HARCAMADAN çözer** (`sosyallesmeOlayCoz`) — `/scenario` ile çekilen olayın bir seçimini uygular ama zaman İLERLEMEZ (ilerletYas/pasifEkonomi/yaşlanma/rütbe yok). Yalnız seçim `SonucEtkisi` deltaları + sosyalleşme moral/masraf/ayyaş + ölüm zarı. Çözülünce mekân 2 yıl kilitlenir. `{state, basarili, uygulananEtki, mesaj}` döner (§25) |
| GET `/:id/sosyallesme-aksiyonlar` | – | Sosyalleş ekranının **tur-harcamayan aksiyon** panelini döner: `{icecekler, aksiyonlar, alkolluMekanVar}` — bölge/çağa uygun isimli içecekler + 5 aksiyon (deli/sadaka/kulak/ısmarla/fal), her biri güncel fiyat + cooldown kilidiyle (§25) |
| POST `/:id/sosyallesme-aksiyon` | `{aksiyonId, varyant?}` | Bir tur-harcamayan sosyalleşme aksiyonu uygular (`aksiyonId` = `"icki:<icecekId>"` \| `"deli"` \| `"sadaka"` \| `"kulak"` \| `"ismarla"` \| `"fal"`; `varyant` yalnız sadaka: `"az"`/`"cok"`). Jitter'sız, doğrudan; `{state, mesaj}` döner. Her aksiyonun kendi yıl-cinsinden cooldown'ı var (`state.sosyallesme_aksiyon_kilit`). Turu tüketmez (§25) |
| GET `/:id/magaza` | – | Çağa uygun mağaza kataloğunu güncel (dinamik) fiyatlarla döner (§26) |
| POST `/:id/magaza/satin-al` | `{katalogId}` | Bir mağaza eşyası satın alır; "luks" ünü hemen artırır, "sifa" envantere eklenir (turu tüketmez, §26) |
| POST `/:id/envanter/:esyaId/kullan` | – | Envanterdeki bir "sifa" eşyasını tüketir (saglik/mutluluk uygular, envanterden düşer; turu tüketmez, §26) |
| POST `/api/scores` | `{stateId,isim}` | Ölmüş karakter için liderlik tablosuna skor kaydeder (küfür filtresinden geçer) |
| GET `/api/scores?tur=genel\|en_zengin\|en_unlu\|en_uzun_yasayan` | – | Top **15** skor tablosu (2026-09: 20→15; `en_uzun_yasayan` = yaşa göre; satırlarda artık meslek/yerleşim/kişilik gösterilmez, yalnız rütbe + çağ + yaş + ölüm nedeni + ünvan/efsanevi-ölüm rozetleri) |
| POST `/api/geri-bildirim` | `{kategori,mesaj,iletisim?,baglam?}` | Ayarlar → "Görüş & Öneri" formu (§29). Rate limit 5/60sn. `mesaj` <3 karakterse 400; gizli `sirket` bal küpü doluysa sessizce 200 (kaydetmez). Neon `GeriBildirim` tablosuna yazar + (varsa) `GERI_BILDIRIM_WEBHOOK_URL`'e ateşle-unut POST atar |
| GET `/api/geri-bildirim?key=…` | – | Kayıtları JSON olarak döner; `key` `GERI_BILDIRIM_ANAHTARI` env'iyle eşleşmezse 403 |
| GET `/api/geri-bildirim/panel?key=…` | – | Aynı anahtar; kayıtları `/api/istatistik/panel` ile aynı desende tek-dosya bağımlılıksız bir HTML panosu olarak render eder (kategori sayaçları + tarih/kategori/mesaj/iletişim/bağlam tablosu) |
| POST `/api/istatistik/olay` | `{tur:"ziyaret",istemci_id,meta?}` | Client'ın yazabildiği TEK metrik türü — günde bir "ziyaret" ping'i (§32). Rate limit 20/60sn. `tur !== "ziyaret"` → 400. Diğer metrikler (yeni_oyun/meslek_secim/olum/skor_kaydi) motor-içi tetiklenir |
| GET `/api/istatistik?key=…` | – | Toplu metrik özeti JSON (§32); `key` `ISTATISTIK_ANAHTARI` env'iyle eşleşmezse (ya da env yoksa) 403 |
| GET `/api/istatistik/panel?key=…` | – | Aynı anahtar; özeti tek-dosya bağımlılıksız HTML panosu olarak render eder (sunucuda; inline script yok) |

Tüm endpoint'ler `{hata: string}` + uygun HTTP status ile hata döner. `POST /:id/kotu-is`, `/mulk`, `/konut`, `/yasam`, `/ekip/.../cikar`, `/zar`, `/uc-kagitci`, `/bilek-guresi`, `/sosyallesme`, `/magaza/satin-al`, `/envanter/:esyaId/kullan` **bir tur harcamaz** — oyuncu istediği an tetikleyebilir; sadece `POST /:id/choice` zamanı ilerletir (sosyalleşmede: mekâna "gitmek" turu tüketmez, ama o mekânda kuyruğa alınan olayı bir sonraki `/scenario`+`/choice` ile çözmek normal turu tüketir).

## 4. `CharacterState` — Tam Alan Sözlüğü

Kaynak: [server/src/types.ts](server/src/types.ts). Tek kaynak — client `types.ts` bunun **elle senkronize edilen bir kopyasıdır**; birini değiştirirken diğerini de güncelle.

### Kimlik & çağ/bölge
| Alan | Tip | Açıklama |
|---|---|---|
| `id` | string (UUID) | Oturum kimliği |
| `isim` | string\|null | Oyun başında `isim_sec` ekranında oyuncudan alınır (boşsa bölgeye uygun rastgele atanır); oyun HUD'unda sol üstte gösterilir, ölümde skor bu isimle liderlik tablosuna otomatik kaydedilir (§18) |
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
| `meslek` | string | `"Asker"\|"Tüccar"\|"Din Adamı"\|"Zanaatkâr"`, 15 yaşında seçilir (Zanaatkâr 2026-09 sonunda eklendi) |
| `rutbe` | string | Güncel unvan (§14) |
| `rutbe_seviye` | 1-5 | **RATCHET — asla düşmez** (2026-08 reformu, §14). `kariyer_puani` + mesleğe özgü stat eşiğiyle + cooldown'la artar |
| `kariyer_puani` | number (monoton, ≥0) | Rütbeyi belirleyen tek sayaç: yıllık kıdem +3 · meslek-kategori başarısı +3 · rakip hedefleyen karanlık iş başarısı +2..+6 (§13/§14). "Kendi işine yatırım +12" kaynağı 2026-09'da kaldırıldı |
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
| `un` | 0-100 | Kod alanı `un` ama **arayüzde 2026-09'dan beri "Şöhret"** olarak etiketlenir (HUD rozeti, `EtkiCipleri` çipi, konut/yaşam/mağaza kartları, ölüm/geçmiş-hayat özeti). Olay `mesaj` serbest metinleri hâlâ "ün" diyebilir (kör değiştirme metni bozacağı için elle taranmadı). Sayısal değer `bolgeTema.unUnvani` ile 8 kademeli bir ünvana çevrilerek gösterilir (Kimliği Belirsiz → ... → Yaşayan Efsane). Maaşa etkisi artık ayrı "ün primi" değil, §13 "İtibarın" düzenleyicisinin bir parçası |
| `ahlak` | 0-100 | — |
| `dost_puani` / `rakip_puani` | 0-100 (başlangıç 50/50) | — |
| `es_puani` | 0-100 | Sadece `es_adi` varken clamp'lenir |
| `suc_seviyesi` | 0-100 (başlangıç 0) | **TEK suç/aranma ekseni** (eski ayrı `aranma_seviyesi` alanı 2026-08'de buna katıldı). Karaborsa/zar masasından ve "suç işleyerek para kazanma" seçimlerinden (§9 adım 3.5) birikir; pasif azalma yok (§13); hapis olaylarını tetikler (§17, `minSucSeviyesi:45`); üst şeritte `bolgeTema.aranmaYildiz` ile **4** yıldıza bölünüp gösterilir, ≥50'de kırmızıya döner. **Aranma kademe bantları (2026-09 yeniden düzenleme, 5→4 bant):** 0-24 temiz/rutin (kademe 1 de bu üst sınırı paylaşır, ceza 2-4y) · 25-49 kademe 1 "yakalanma" (öde-ve-düş VEYA reddet — kaybedersen hapse girip kaçmayı deneyebilirsin, ceza 4-7y) · 50-74 kademe 2 "baskın" (kefaretler artar, ev/işyeri baskını neredeyse kaçınılmaz, ceza 7-9y) · 75-100 kademe 3 "azılı suçlu" (ceza 9-12y) — [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) olayları `minSucSeviyesi`/`maxSucSeviyesi` ile bu bantlara kilitlenir, ceza aralıkları `gameEngine.ts` `hapisCezaSuresiHesapla(sucSeviyesi)` tek fonksiyonunda hesaplanır (§17) |
| `alkol_ziyaret_sayisi` | number (başlangıç 0) | Alkollü bir sosyalleşme mekânında (meyhane/pub/ordugâh çadırı) yaşanan olay **veya alkollü içki içme aksiyonu** sayısı; **3**'e ulaşınca kalıcı "ayyaş" damgası vurur (§25). Rising-edge damga mantığı artık `ayyasZiyaretiIsle(state)` yardımcısında (hem tur-sonu mekân olayı hem `sosyallesmeAksiyonYap` içki dalı çağırır) |
| `sosyallesme_aksiyon_kilit` | `Record<string, number>` (başlangıç `{}`) | Sosyalleş ekranı tur-harcamayan etkileşimlerinin son yapıldığı oyun yılı. Aksiyon anahtarları: `"icki"` (tüm içecekler ortak) / `"deli"` / `"sadaka"` / `"kulak"` / `"ismarla"` / `"fal"` — `AKSIYON_COOLDOWN` (icki 1 · kulak 1 · sadaka 2 · deli 3 · ismarla 3 · fal 4 yıl). **Ayrıca mekân anahtarları** `"mekan:<yerId>"` — bir mekân olayı çözülünce `SOSYALLESME_MEKAN_COOLDOWN=2` yıl kilitlenir (§25). `eskiKayitGocu` `{}` atar |
| `hapis_ceza_kalan` | number (başlangıç 0) | "hapiste" etiketi eklenince belirlenen ceza süresi (yıl); her tur `yasArtisi` kadar azalır, 0'a inince otomatik tahliye. Riskli kaçış başarısız olursa `SonucEtkisi.hapis_ceza_artis` ile uzar. Hapiste değilken 0 (§17) |
| `hapis_ceza_toplam` | number (başlangıç 0) | Tutuklanma anında belirlenen TOPLAM ceza (yıl) — `hapis_ceza_kalan`'ın aksine azalmaz (aynı `hapis_ceza_artis` ile birlikte uzar). "Yıl yatılan" = `hapis_ceza_toplam - hapis_ceza_kalan`; ağır bantlarda (≥7y) para/af ile erken çıkışı en az 5 yıl yatana kadar engelleyen kural bunu kullanır; `hapisKacisBaslangici` filtresinin "ceza ≥5 yıl mı" kontrolü de bunu kullanır. Tahliyede 0'a sıfırlanır (§17) |
| `hapis_tur_sayaci` | number (başlangıç 0) | Hapse en son girişten beri çözülen `hapisOlayi:true` olay sayısı; hapse her yeni girişte 0'a sıfırlanır. `hapisKacisBaslangici` olayları bu 2'ye ulaşana kadar havuzdan çıkarılır (§17) |

### Meslek-özel derinlik metrikleri (ilgisiz meslekte 0 kalır)
| Alan | Meslek | Açıklama |
|---|---|---|
| `ordu_mevcudu` | Asker | Asker sayısı; meslek seçilince 10, tavan `ORDU_MEVCUDU_TAVANI=300` |
| `ordu_techizat_seviyesi` | Asker | 0-100, saldırı gücünü çarpar |
| `ticaret_sermaye` | Tüccar | Ticaret kazançlarını çarpar |
| `nufuz` | Din Adamı | Dini kazançları çarpar |
| `uretim_kapasitesi` | Zanaatkâr *(2026-09 sonu)* | 0-100, `SonucEtkisi.uretim_kapasitesi_artis` ile dolar. **Bilinçli olarak placeholder** — `meslekMetrikCarpani` bu meslek için `×1` sabit döner, maaşa/oyun içi hiçbir etkisi yok; dengesi sonraya bırakıldı |

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
| `hayat_amaci` | `HayatAmaci\|null` — **ESKİ tekil amaç, artık atanmıyor** (yeni karakterde `null`); geriye dönük uyum için tipte + `hesaplaSkor` fallback'inde kalıyor |
| `hayat_amaclari` | `AmacIlerleme[]` — meslek seçilince havuzdan çekilen **2 normal + 1 zor** kişisel amaç; skoru `amacSkorCarpani` ile çarpar (§18) |
| `omur_zirve_suc` / `omur_kumar_net` / `omur_sadaka_sayisi` / `omur_hediye_sayisi` / `omur_riskli_basari` | Ömürlük sayaçlar — hayat amacı koşulları (§18) |
| `efsanevi_olum` | string\|null — nadir/komik ölüm başlığı (rozet) |
| `yonetim_iliski` / `patron_iliski` | 0-100 — Kariyer sayfası iki ilişki hattı. **2026-09: `yonetim_iliski` (kral) yeni karakterde `5` başlar** (neredeyse sıfır); `yonetimYillikUygula` şöhrete bağlı küçük pasif itiş uygular (`un≤30 → 0`, `un=100 → yılda ~+0.63`). `patron_iliski` `40` başlar (§35) |
| `yonetim_etkilesim_kilit` | `Record<string, number>` — yönetim etkileşim/istek cooldown'ları (`"yonetici:bagis"`, `"patron:istek:zam"` → tekrar açılış yılı) |
| `yonetim_yakin_etkilesim` | number (başlangıç 0) — son turlardaki yönetim etkileşimi sayısı; her etkileşim/istek +1, `yonetimYillikUygula`'da −`yasArtisi×2`; ≥4 iken "ters tepme" olasılığı (§35) |
| `yonetim_talep` | `YonetimTalep\|null` — dayatılan bağış/sadakat talebi (`{id, kimden:"yonetici"\|"patron", kimAdi, tur:"bagis"\|"sadakat", tutar, kalem, sonYil}`), §35 |
| `yonetim_talep_sonraki_yil` | number — sonraki talebin en erken üretileceği yıl (yaratılışta `baslangic_yili + 6`) |

### `EkipUyesi` (yardımcı/işe alınan)
`{id, isim, rol, gercekKalite (0-100, gizli), tahminiMin, tahminiMax (oyuncuya gösterilen bulanık aralık), maas, sadakat (0-100), kisilik (kozmetik etiket)}`. İşe alınırken: `gercekKalite` = 3 zarın ortalaması (`(rnd+rnd+rnd)/3`, uçlar nadir, ortalamaya yakın daha olası); `maas = 2 + round(gercekKalite/14)`; `sadakat = 30 + rnd*60`; işe alım ayrıca `maasCarpaniUygula(state, 1+(gercekKalite-50)/500)` ile küçük kalıcı bir maaş çarpanı uygular (2026-09'da `/250`'den zayıflatıldı; ayrıca `ham=false` olduğu için pozitif kısmı bir kez daha yarıya iner — bkz. §13 `maasCarpaniUygula`). `kisilik` şu 8 değerden biri: Sadık, Hırslı, Korkak, Kurnaz, Tembel, Cesur, Güvenilmez, Çalışkan.

### `SahipOlunanEsya` (mağazadan satın alınan somut eşya kopyası, §26)
`{id (instance UUID), katalogId, ad, simge, kategori:"sifa"|"luks", alisYili, kalanYil: number|null}`. `kalanYil`'in anlamı kategoriye göre değişir: "sifa" için kalan çürüme süresi (0'a inince eşya silinir, hiçbir etki uygulanmadan); "luks" için bir sonraki periyodik bakım masrafına kalan süre (0'a inince masraf çıkar, eşya SİLİNMEZ, sayaç sıfırlanır). Her turda geçen gerçek yıl sayısı (`yasArtisi`) kadar azalır — tur sayısından bağımsız. "luks" eşyalardan her türden en fazla 1 sahiplenilebilir.

### Ev/yaşam/finans
| Alan | Açıklama |
|---|---|
| `konut_id` | Varsayılan `basit_barinak` (§16) |
| `yasam_secimi_id` | Varsayılan `ucuza_ye` (§16) |
| `hazard_el_sayisi` | Hazard (zar) mini-oyununda oynanan toplam el; her 4 elde bir %45 "rakip bıçak çekti" için (§13) |
| `uc_kagitci_oyun_sayisi` | Üç Kağıtçı mini-oyununda oynanan toplam el (istatistik) |
| `mulkler: MulkTuru[]` | Sahip olunan piyasa mülkleri (her türden en fazla 1) — `"ciftlik"\|"han"\|"demirci"\|"kervan"\|"karaborsa"` |
| `mulk_bakim_kalan: Partial<Record<MulkTuru,number>>` | Her mülk için bir sonraki periyodik bakım/vergi masrafına kalan yıl (satın alınca 7-10; 0'a inince güncel değerin ~%12'si masraf, sayaç yenilenir — §13). Mülk elden çıkınca anahtar silinir |
| `mulk_alis_yili: Partial<Record<MulkTuru,number>>` | Her mülk için satın alındığı oyun yılı (`mulkSatinAl`'da yazılır) — mülk olayı garantisinin (satın alımdan 5-15 yıl içinde en az bir kez, §11 kural 14) referans noktası. Mülk elden çıkınca anahtar silinir; eski kayıtlarda/legacy alanlarda bilinmiyorsa boş kalır ve eski fırsatçı (%12 şans) mekanik geçerli olur |
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
| `son_rakip_soygun_yili` | number\|null — "rakip parayı alıp kaçtı" soygununun son yaşandığı yıl (nakit ≥ 150 iken düşük ihtimalli, 8 yıllık cooldown, §27) |
| `buyuk_savas` | `{dusman, baslangicYili, bitisYili, vergiOrani, gidaCarpani}`\|null — aktif tekrarlayan büyük savaşın parametreleri (§27); `null` iken savaş yok |
| `son_buyuk_savas_bitis_yili` | number\|null — en son büyük savaşın bittiği yıl (10 yıllık minimum cooldown takibi, §27) |
| `veba` | `{aktif, baslangicYili, bitisYili, etkiBitisYili, konutKiraCarpani, gelirCarpani, korumaSeviyesi}`\|null — veba (§27); aktif faz bitince `aktif:false` olarak `etkiBitisYili`'ye kadar iz bırakır, sonra `null`. `korumaSeviyesi` (yama #2): 0=hiç / 1=kısmi / 2=tam koruma — yıllık ölüm risk kademesini belirler |
| `veba_gecirdi` | boolean — hayatta en az bir kez veba geçirildi mi (yama #2'den beri SALT istatistik/flavor; tetiklemeyi artık bloklamaz) |
| `veba_olum_riski` | number (0-100, başlangıç 0) — karakter vebayı BİZZAT kaptıysa (etiket `veba_hastasi`) o anki ölüm riski %; bulaşınca ~70, `vebaHastasiOlayi` seçimlerinin `veba_olum_riski_artis` etkisiyle ± değişir, turda geçen zamanla -15/tur doğal düşer, ≤12'de iyileşilir. Hasta değilken 0 (§27) |
| `son_veba_bitis_yili` | number\|null (yama #2) — en son veba dalgasının (iz fazı dahil) tamamen bittiği yıl; 20 yıllık cooldown buradan sayılır. Veba artık "ömürde bir kez" değil, dalga bitince 20 yıl sonra tekrarlanabilir |
| `kucuk_kriz_sonraki_yil` | number — bir sonraki küçük krizin (kıtlık/haydut baskını) tetikleneceği yıl eşiği (§27) |
| `gida_fiyat_sok_bitis_yili` | number\|null — küçük kriz tetiklendiğinde bu yıla kadar geçerli ×2 gıda fiyat şoku (`yil+2`, §27) |
| `borc_yardimi_alindi` | boolean — ömürde bir kez borçtayken (bütçe açığı sürerken) alınan kilise/eş dost yardımı kullanıldı mı (§13). Eski kayıtlarda `eskiKayitGocu` `false` atar |
| `rakipler` | `Rakip[]` — isimli rakipler `{ad, meslek, guc, husumet, yenildi}`; `rakipler[0].ad === rakip_adi`. `mesleğiSec`'te 2 üretilir (§34.2) |
| `salgin_korunma_yatirimi` | `{kademe:1\|2, yil}`\|null — bir sonraki veba dalgasında `vebaBaslat`'a aktarılıp tüketilen taban korunma yatırımı (§34.4) |
| `kredi` | `Kredi`\|null — aktif tefeci kredisi `{anapara, kalanBorc, faizOrani, yillikTaksit, alindigiYil, odenmeyenTaksit, pazarlikYapildi}`; aynı anda en fazla bir (§34.5) |

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

**Meslek/ilerleme:** `yeni_meslek` (kariyer değişimi), `maas_carpani` (kalıcı çarpan, `maasCarpaniUygula` ile birikir — 2026-09'dan beri pozitif katkı yarıya iner + toplam `[0.60,1.40]`'a kırpılır, §13), `sehir_yonetim_artis` (§15), `kariyer_puani_artis` (rütbe ilerlemesini hızlandırır, §14 — şu an kullanan olay yok), `ordu_techizat_artis`/`ticaret_sermaye_artis`/`nufuz_artis` (0-100 clamp, sadece techizat), `suc_artis` (TEK suç/aranma ekseni `suc_seviyesi`'ni değiştirir, ± olabilir — rüşvet/kefaret şıkları negatif verir, 0-100 clamp), `suc_seviyesi_ayarla` (`suc_seviyesi`'ni mevcut değerden bağımsız doğrudan verilen değere sabitler, 0-100 clamp — büyük baskın "temize çık / kademe 1'e in" sonuçları için), `hapis_ceza_artis` (hapiste kalan ceza süresini yıl olarak uzatır — başarısız riskli kaçış girişimi; yalnız "hapiste" etiketi varken anlamlı, §17).

**Ölüm:** `olum: true` (kesin), `olum_sansi: number` (0-100 taban şans; `efektifOlumSansi` ile sağlığa göre büyütülür, §13), `efsanevi_olum: string` (nadir ölüm rozet başlığı).

**Etiket/durum:** `etiket_ekle: string[]`, `etiket_sil: string[]`, `durum_ekle: Durum`, `durum_sil: string[]` (id'ye göre kaldırır).

**Dünya:** `ulke_etkisi: Partial<UlkeDurumu>` (doğrudan `Object.assign`), `kriz_baslat: {tur, sureYil}` (`bitisYili = state.yil + sureYil`), `veba_koruma: number` (veba başlatan bir seçenekte, `ulke_etkisi.vebada=true` ile birlikte; `vebaBaslat`'a aktarılan korunma kademesi 0/1/2, §27), `veba_olum_riski_artis: number` (veba hastasıyken `state.veba_olum_riski`'ni ± değiştirir — hekim/tedavi/dinlenme negatif=risk düşer, ihmal/şarlatan pozitif=risk artar; yalnız `veba_hastasi` etiketi varken, 0-100 clamp, §27).

**İlişkiler:** `dost_puani`, `rakip_puani` (delta), `es_ata: true` (rastgele biriyle evlenir, `es_puani=60`, rastgele meslek/rütbe atanır; oyuncu erkek olduğu için eş adı **kadın** isim havuzundan — `rastgeleCinsiyetliIsimSec(...,"kadin")`), `es_puani` (delta, sadece evliyken), `es_kaybet: true` (boşanma/ölüm — `medeni:evli` etiketi silinir), `cocuk_ekle: number`, `cocuk_kaybet: true` (rastgele bir yaşayan çocuk), `cocuk_iliski: number` (yaşayan tüm çocukların `iliski` puanına delta, §33).

**Ekip:** `ekip_ekle: {rol, tahminGenisligi}` (yeni üye, gizli kalite hesaplanır), `ekip_kaybi: true` (rastgele biri ayrılır), `ekip_sil: string` (belirli role sahip üye hedeflenir).

**Diğer sistemler:** `hizip_ata: string` (hizbe katılır), `mulk_kaybet: MulkTuru` (el koyma), `evcil_hayvan_edin: {tur?}` (yoksa edinir; tur belirtilmezse çağa uygun rastgele), `evcil_hayvan_kaybet: true`, `unvan_kazan: string` (tekrar eklenmez), `hayat_amaci_ata: {...}` (**muhtemelen ölü kod** — bkz. §25).

**Akış kontrolü:** `zorunlu_sonraki: string` (bir sonraki olay id'sini zorlar, oyuncu seçiminden bağımsız). `zorunlu_sonraki_havuzu: string[]` (2026-09, "az olay var" turu Yol A) — varsa `zorunlu_sonraki`'nin YERİNE geçer: bir sonraki olay bu id listesinden rastgele seçilir (`gameEngine.zorunluSonrakiHavuzdanSec`, mümkünse `gecmis_olaylar`'da hiç görülmemiş id tercih edilir). Sabit tek-id'li zincirlerin ("her hayatta birebir aynı senaryo") aksine, aynı zincir noktası farklı oynanışlarda farklı bir dala sapabilir — bkz. §17 yolculuk zincirleri.

**Metin:** `mesaj` (zorunlu, sonuç ekranında gösterilir), `detay` (opsiyonel, `sonucAnlatimiUret`'in ilk cümlesi). İkisi de `{dost}/{rakip}/{es}/{cocuk}/{ekip}` gibi placeholder'ları destekler (§6).

## 6. Olay Tanımı Şeması

Kaynak: [server/src/data/olaylar/types.ts](server/src/data/olaylar/types.ts). Yeni bir olay eklerken bu üç tipi kullan:

### `OlayTanimi` (bir olay)
```
id, kategori: Kategori ("savas"|"ticaret"|"din"|"siyaset"|"saglik"|"sosyal"|"zanaat" — "zanaat" 2026-09 sonunda Zanaatkâr mesleğiyle eklendi),
baslik, metin, secenekler: OlaySecenegi[],
gorsel?  (yoksa kategoriye göre emoji, bkz. olaySecici.ts KATEGORI_GORSEL)
```
**Uygunluk filtreleri** (hepsi opsiyonel; hepsi AND'lenir, bkz. §12 `uygunMu`): `cag, bolgeler[], meslekler[], minYas/maxYas, minAhlak/maxAhlak, minUn/maxUn, minMutluluk/maxMutluluk, minSaglik/maxSaglik (yama #1, düşük-can toparlanma olayları için), minRakipPuani/maxRakipPuani, minEsPuani/maxEsPuani, gerekliEtiketler[], yasakliEtiketler[], gerekliUlke (Partial<UlkeDurumu>), gerekliKisilik, gerekliDin, minRutbeSeviye, minSucSeviyesi/maxSucSeviyesi (aranma kademe bantları, §17), kacakOlayi (bool, §17), gerekliEkip (bool), gerekliEkipRolu, gerekliHizip (bool), hapisOlayi (bool), hapisParaylaCikisOlayi (bool, §17 — para/af ile KESİN çıkış sunan hapis.ts olayları; ağır bantta en az 5 yıl yatılana kadar gizlenir, fiziksel kaçış girişimleri bundan muaf), hapisKacisBaslangici (bool, §17 — kaçış/erken-tahliye stratejisi başlatan olay; ilk 2 hapis olayı çözülmeden ve toplam ceza 5 yıldan kısaysa asla çıkmaz), yolculukOlayi (bool), vebaHastasiOlayi (bool, §27 — sadece "veba_hastasi" etiketi varken)`.
**Seçim ağırlığı:** `agirlik?` (varsayılan 1), `ton?: "agir"|"hafif"` (art arda ağır olayı azaltır), `gizemli?` (salt iç kategorizasyon, filtrelemeyi etkilemez).

### `OlaySecenegi` (bir seçenek)
```
metin, baseBasariSansi (0-100), basariliSonuc, basarisizSonuc: SonucEtkisi
```
**Kilit koşulları** (kilitlenirse `kilitAciklamasi` gösterilir, bkz. §12 `kilitNedeni`): `maliyet? (para eşiği), minUn?, minAhlak?, maxAhlak?, gerekliEtiketler?[], yasakliEtiketler?[]`.
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

`data/olaylar/index.ts` tüm alt listeleri `OLAY_BANKASI: OlayTanimi[]` içinde birleştirir. **Toplam 1520 olay** (id sayımıyla, 2026-09 sonu itibarıyla güncellendi — 4. meslek Zanaatkâr'ın 130 olayı + `genel.ts`'e eklenen `sehir_yonetim_zanaatkar_baslangic` giriş olayı sonrası gerçek sayı, `npx tsx -e "import{OLAY_BANKASI}from './src/data/olaylar';console.log(OLAY_BANKASI.length)"` ile doğrulanabilir). Belirli bir olayı bulmak için `grep -n "id: \"<olay_id>\"" server/src/data/olaylar/*.ts` kullan — dosyayı baştan sona okuma.

| Dosya | ~Olay Sayısı | Satır | İçerik |
|---|---|---|---|
| `genel.ts` | 200 | ~10500 | Meslek/çağdan bağımsız evrensel olaylar (sağlık, sosyal, hizip başlangıcı vb.) — 2026-09 sonunda `sehir_yonetim_zanaatkar_baslangic` (§11 kural 4, §15) eklendi |
| `ortaCagAskerYollari.ts` | 105 | 5723 | Orta Çağ Asker **kariyer yolu** dallanması (§16 "yol:asker:*") |
| `yolculuk.ts` | 129 | 8058 | "Büyük yolculuk" zincirleri (Haçlı Seferi, Hac, Keşif, vb. — §17) |
| `ortaCagDinAdamiYollari.ts` | 85 | 4546 | Orta Çağ Din Adamı kariyer yolu dallanması ("yol:din:*") |
| `ortaCagTuccarYollari.ts` | 45 | ~2000 | **(2026-09 yeni)** Orta Çağ Tüccar kariyer yolu dallanması ("yol:tuccar:durust/acgozlu/kacakci/hayirsever", §16) |
| `sanayiAskerYollari.ts` | 45 | ~2000 | **(2026-09 yeni)** Sanayi Devrimi Asker kariyer yolu dallanması ("yol:asker:sadik/reformcu/zalim/firari", §16) |
| `sanayiTuccarYollari.ts` | 45 | ~2000 | **(2026-09 yeni)** Sanayi Devrimi Tüccar kariyer yolu dallanması ("yol:tuccar:adil/somurucu/spekulator/hayirsever", §16) |
| `sanayiDinAdamiYollari.ts` | 45 | ~2000 | **(2026-09 yeni)** Sanayi Devrimi Din Adamı kariyer yolu dallanması ("yol:din:durust/fanatik/sosyal/yozlasmis", §16) |
| `ortaCagZanaatkarYollari.ts` | 45 | ~1400 | **(2026-09 yeni — 4. meslek Zanaatkâr)** Orta Çağ Zanaatkâr kariyer yolu dallanması (1 giriş + "yol:zanaatkar:lonca_sadik/yenilikci/hileci/sanatkar" × 11, §16) |
| `sanayiZanaatkarYollari.ts` | 45 | ~1450 | **(2026-09 yeni — 4. meslek Zanaatkâr)** Sanayi Devrimi Zanaatkâr kariyer yolu dallanması (1 giriş + "yol:zanaatkar:makineci/gelenekci/sendikaci/girisimci" × 11, §16) |
| `ortaCagZanaatkar.ts` | 20 | ~330 | **(2026-09 yeni)** Orta Çağ Zanaatkâr'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiZanaatkar.ts` | 20 | ~340 | **(2026-09 yeni)** Sanayi Devrimi Zanaatkâr'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sosyallesme.ts` | 73 | 2752 | Sosyalleşme mekân olayları — 2026-09'dan beri sadece 6 mekân id'sine bağlı (pazar_meydani, meyhane, pub, ordugah_cadiri, dini_meclis, lonca_meclisi; hamam/kahvehane/kervansaray→pazar_meydani, salon→meyhane remap edildi). Normal havuzdan tamamen dışlanır, sadece `POST /:id/sosyallesme` ile zorlanır (§25). Tur-harcamayan içki/deli/sadaka/kulak/ısmarla/fal aksiyonları ayrı: [sosyallesmeAksiyonlari.ts](server/src/data/sosyallesmeAksiyonlari.ts) |
| `hizip.ts` | 70 | 3416 | Hizip (faction) sistemi olayları (§16) |
| `evlilikVeAile.ts` | 78 | 3774 | Yalnız evli karaktere açık, evlilik yolu (`evl_ms/mt/ask_*`) + `aile2_*` ağır ikilemler + Aile ekranı'nı (§33) tamamlayan 12 olay — bkz. §16 "Evlilik & Aile Olay Havuzları" |
| `esyaVeGizem.ts` | 48 | 3020 | Gizemli eşya edinme/takip olayları (§16) |
| `hapis.ts` | 46 | ~1600 | Hapis alt sistemi (§17) — ceza yılı sayacı + parasız riskli kaçış olayları dahil |
| `aile.ts` | 38 | 1746 | Çocuk büyüme çizgisi + `aile_meslegi` kökenine bağlı geriye dönük olaylar (aile geçmişi) — bkz. §16 "Evlilik & Aile Olay Havuzları" |
| `aranmaSeviyesi.ts` | 32 | ~1495 | Aranma kademesi alt sistemi — TEK eksen `suc_seviyesi`'nin bantlarına (`min/maxSucSeviyesi`) kilitli tetikleyici/kademe/baskın/kaçak olayları (§17) |
| `evcilHayvan.ts` | 28 | 1425 | Evcil hayvan olayları |
| `iliskiler.ts` | 24 | 1124 | Meslek/medeni-durumdan bağımsız genel dost/rakip/eş ilişki olayları + bekarlık alt kümesi — bkz. §16 "Evlilik & Aile Olay Havuzları" |
| `ortaCagTuccar.ts` | 26 | ~1400 | Orta Çağ Tüccar'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `ortaCagAsker.ts` | 26 | ~1400 | Orta Çağ Asker'e özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `ortaCagDinAdami.ts` | 23 | ~1200 | Orta Çağ Din Adamı'na özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiAsker.ts` | 22 | ~1150 | Sanayi Devrimi Asker'e özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiDinAdami.ts` | 19 | ~950 | Sanayi Devrimi Din Adamı'na özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiTuccar.ts` | 18 | ~950 | Sanayi Devrimi Tüccar'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `saglikToparlanma.ts` | 8 | ~330 | **Düşük-can toparlanma olayları (yama #1)** — HEPSİ `maxSaglik:45` ile kilitli; yatak istirahati/hekim/kaplıca/aile bakımı/inziva/nekahet/gezgin doktor(Sanayi)/otacı(Orta Çağ). Bedelli ama "güvenli" seçenekleri yüksek şansla belirgin sağlık verir |
| `kureselOlaylar.ts` | 5 | ~260 | "Dünya olayları". `kuresel_veba_baslangici` (3 seçenek = 3 korunma kademesi `veba_koruma` 0/1/2) + 4 "salgın dönemi" bulaşma olayı (`gerekliUlke:{vebada:true}`: kapını çalan / cenaze / çarşıda temas / hasta bakıcılığı — başarısızlıkta artık `etiket_ekle:["veba_hastasi"]`, öldürmez) — §27. Savaş/bağış/kriz hâlâ arka planda, olay ekranı yok |
| `vebaHastaligi.ts` | 10 | ~360 | **Vebayı bizzat kapmış (`veba_hastasi` etiketi) karaktere çıkan özel havuz (§27).** `vebaHastasiOlayi:true` → hastayken normal havuz kapanır (hapisOlayi mantığı). Hekim/ilaç/tedavi/hacamat/dinlenme/şarlatan/aile bakımı — `veba_olum_riski_artis` (± ) ile ölüm riskini düşürür/yükseltir; para harcayarak hayatta kalma şansı ciddi artar |
| `buyuluOlaylar.ts` | 16 | ~600 | **Büyü / büyücü / medyum / kehanet / ritüel olayları (büyük denge turu).** Hepsi `gizemli:true` → "her ömürde en az bir esrarengiz olay" kaskadı (§11.12) otomatik kapsar + düşük `agirlik` ile normal havuzda fırsatçı çıkarlar. Köy medyumu, kristal küre, cadı pazarlığı (OÇ, engizisyon riski), muska, lanet kaldırma ayini (`gerekliEtiketler:["bilgi:yasak_ilim"]`), ruh çağırma seansı (→ `envanter:fisildayan_tas`), simyacı, yıldız falı, rüya tabircisi, dört yol ağzında şeytanla pazarlık (`unvan_kazan`/`efsanevi_olum` dalları), uğursuz kara kedi, meydandaki kâhin, sahte iksir satıcısı, gölge adam, ay tutulması ritüeli, spiritüalist salon (SD). Mutluluk deltaları rubrik uyumlu (çoğu tedirginlik/−). İngilizce aynası `i18n/olaylar/buyuluOlaylar.en.ts` |
| `komikGaripOlaylar.ts` | 60 | 2523 | **Komik/garip sosyal olaylar (2026-09, önceki CLAUDE.md sürümünde bu tabloya hiç eklenmemişti).** Tamamı `kategori:"sosyal"` — yeme yarışması, yanlış şarkı, yanlış cenaze, köpekle banyo, dedikodu ikilemi, ağır taş kaldırma, kimlik gizleme, beklenmedik dans, hırsız yanlışlığı, yanlış sahte sakal vb. flavor/komedi odaklı olaylar. İngilizce çeviri mirror'ı (`komikGaripOlaylar.en.ts`) 2026-09 sonunda eklendi (bkz. §30). |
| `komikOlumler.ts` | 14 | ~460 | **Komik/absürt ölüm olayları (2026-09).** Oyuncu SEÇİMİYLE tetiklenen komik ölümler (eski, seçimsiz "ani ölüm" havuzu 2026-09 sonunda tamamen kaldırıldı, bkz. §13): fıçıyla şelale, en acı biber, heykele bıyık, arı kovanı, nefes tutma, dev kabak, buz gölü, gülle taşıma, değirmen kanadı, domuzla yarış, bez kanatlar, çürük köprü, fırtınada demir çubuk, buhar kazanı. Hepsi `ton:"hafif"`, düşük ağırlık (0.2-0.3), 2 seçenek: "aptalca olanı yap" (başarıda ufak komik ödül, başarısızlıkta `olum_sansi` 35-62 + ağır sağlık kaybı; ölürse `efsanevi_olum`) vs "yapma" (güvenli). 2026-09'da kalan 6 `olum:true` de `olum_sansi`'ye çevrildi — hepsinde "düşük de olsa hayatta kalma" şansı var |

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
- `veba_hastasi` — karakter vebayı bizzat kaptı; varsa **sadece** `vebaHastasiOlayi:true` olaylar gösterilir (normal havuz kapanır, `hapiste` ile aynı mantık; `uygunMu`'da `hapiste`'den ÖNCE kontrol edilir). Girişi `vebaYillikKontrol` yıllık bulaşma zarından ya da bir "salgın dönemi" olayının `etiket_ekle:["veba_hastasi"]` sonucundan; çıkışı `vebaHastaligiKontrol`'ün doğal iyileşmesinden (ölüm riski eşik altına inince etiket silinir) ya da ölümden. Bkz. §27.
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
10. `etiket_ekle` / `etiket_sil` / `ulke_etkisi` (Object.assign) / `durum_ekle` / `durum_sil` uygulanır. **Hapis:** "hapiste" yeni eklendiyse `hapis_ceza_kalan` (VE eşleşen `hapis_ceza_toplam`) tutuklanma anındaki aranma bandına göre `hapisCezaSuresiHesapla` ile belirlenir (0-25→2-4y · 25-50→4-7y · 50-75→7-9y · 75-100→9-12y, §17); `hapis_ceza_artis` varsa ikisine birden eklenir; bir seçimle "hapiste" silindiyse her iki sayaç da sıfırlanır (§17). **Veba:** "veba_hastasi" yeni eklendiyse `vebaHastaligiBaslatEt` (etiket + `veba_olum_riski=70`); `veba_olum_riski_artis` varsa hastayken `veba_olum_riski`'ne uygulanır (§27).
11. `clampStats()` (ilk tur).
12. `zorunlu_sonraki` varsa `oturum.zorlananOlayId`'ye yazılır (bir sonraki `scenario` çağrısında zorla gelir).
13. `sonucAnlatimiUret()` ve `zamanAnlatimiUret()` hâlâ ayrı üretilir ve payload'da döner, ama **2026-09 sadeleştirme turunda ikisi de agresif biçimde kısaltıldı** (kullanıcı: "her şeyi iki kere anlatıyor"): `sonucAnlatimiUret` artık yalnızca `detay` + çiplerde GÖRÜNMEYEN tek bir cümle (`yeni_meslek`/`durum_ekle`/ağır yaralanma) döndürür — para/ün/ahlak/hafif sağlık cümleleri ve "olay sessizce kapandı" dolgusu kaldırıldı, çoğu turda **boş string** döner. `zamanAnlatimiUret` artık yalnızca gerçek bir durumsal uyarı varsa (borç/kronik hastalık/veba/savaş/kötü ekonomi) tek cümle döndürür — yıllık kazanç cümlesi ve "gün be gün" kozmetik flavor (`GUNLUK_FLAVOR`) tamamen kaldırıldı, aksi halde **`null`**. Sonuç: sakin bir turda `.tur-ozeti` yalnızca `etki.mesaj`'dır; sayısal deltalar zaten `EtkiCipleri`'nde + üst şerit delta rozetlerinde. **Client sonuç ekranı bunları TEK metinde gösterir:** `.merkez-alt` içindeki `.tur-ozeti` = `etki.mesaj` + " " + (`zamanAnlatimi` varsa o, yoksa `sonucAnlatimi`). **2026-09'da `-webkit-line-clamp` HER platformda kaldırıldı** ("olay sonucu tam okunmuyor" şikayeti): eskiden masaüstünde 2 satıra kırpılıp geri kalanı `title` tooltip'ine gizleniyordu (dokunmatikte hiç erişilemez, masaüstünde de fareyle beklemek gerekiyordu). Artık tam metin görünür; uzun sonuçta `.merkez-alt` kendi içinde kayar (alt kenarda bir fade ipucu — `.merkez-alt-sonuc::after`). Sonuç ekranında `.merkez-alt`'a `merkez-alt-sonuc` sınıfı eklenir: sahneye taşma payı azaltılır (masaüstü) / sıfırlanır (mobil) ki ilk satır sahne/hotspot'la iç içe girmesin. `title` zararsız bir yedek olarak kalır. Mount'ta yavaşça yukarı kayarak belirir (`@keyframes turOzetiBelir`, ~0.24s, `prefers-reduced-motion` saygılı). Eski üç ayrı blok (`.sonuc-hikaye` + `.sonuc-detay` + "— N yıl sonra —" başlıklı `.zaman-blogu`) kaldırıldı. **`EtkiCipleri` YALNIZCA seçilen seçeneğin kendi `uygulananEtki`'sini küçük "çip" rozetleri olarak gösterir** (ikon + isim + değer: `💰 Para ±N`, `❤️ Sağlık ±N`, `🙂 Mutluluk ±N`, `⚖️ Ahlak ±N`, `🏅 Ün ±N` + `es_ata`/`cocuk_ekle` gibi bayraklar) — metin değil veri olduğu için `.tur-ozeti` metninin ÜSTÜNDE ayrı durur. Maaş/gider/yaşlanma/ev-yemek/kriz gibi tur-sonu pasif etkiler çip DEĞİL: **üst şeritteki (`UstSerit`) Yıl/Yaş/Can/Para/Mutluluk/Ahlak modülleri** değer değiştikçe yanıp söner + uçan bir `+N`/`−N` rozeti gösterir (`useGecisDeltasi` hook'u) — bu efektin süresi bilinçli olarak uzun tutuldu (delta rozeti `3s`, değer parlaması `2.5s`).
14. **Ölüm kontrolü #1:** `etki.olum===true` VEYA (`olum_sansi` varsa) `efektifOlumSansi(olum_sansi, saglik)` şansıyla zar → `checkDeath`.
15. **Karakter hâlâ hayattaysa**, yıl ilerletme bloğu çalışır:
    - a. `turSuresi` = %40 ihtimalle 1, %60 ihtimalle 2 yıl — **yolculuk olayında her zaman tam 1 yıl**.
    - b. `ilerletYas(state, turSuresi, turSuresi)` → `yas/yil/tur_sayisi` artar, `hukumdar` yeniden hesaplanır, `yas>=100` ise zorunlu ölüm.
    - c. Hükümdar değiştiyse → haber üretilir + hayat-hikayesine yazılır.
    - d. `durumlariUygula()` → tüm aktif `durumlar`'ın turluk `tur_basi_saglik/para/mutluluk` etkisi uygulanır, geçici durumların `kalan_tur` azalır (biterse `bitince_etiket` eklenir) → ölümcülse `checkDeath`.
    - e. **Hâlâ hayattaysa** `pasifEkonomiUygula()` → maaş+gider hesaplanır, borç faizi işler (§13) → `checkDeath(false)` (borç stresiyle sağlık 0'a inmiş olabilir).
    - f. **Hâlâ hayattaysa** `yaslanmaUygula()` → yaşa bağlı sağlık düşüşü (§13) → ölümcülse `checkDeath`.
    - g. **Hâlâ hayattaysa** `capraletkiUygula()` → sağlık↔mutluluk çapraz erozyonu (§13) → ölümcülse `checkDeath`.
    - h. **Hâlâ hayattaysa:** `zamanAnlatimiUret` (zaman geçişi metni) → **hapis ceza sayacı** (hapisteyse `hapis_ceza_kalan -= yasArtisi`; 0'a indiyse "hapiste" silinir + otomatik tahliye cümlesi, aksi halde "tahliyene ~N yıl kaldı" cümlesi — §17) → `orduBuyumesiDene` (barışta ordu büyümesi) → `krizEtkisiUygula` (aktif kriz/altın çağ etkisi, bitmişse temizlenir) → ölümcülse `checkDeath` → `mulkGelirleriUygula` (mülk geliri/kervan batma riski) → `sucSeviyesiUygula` (pasif suç azalması) → `envanterBozulmasiUygula` (mağaza envanterinde `kalanTur` 1 azalır, 0'a inenler çürüyüp silinir — çürüyen olduysa doğrudan `zamanAnlatimi`'ye eklenen ayrı bir cümle, §26) → `sansOlayiDene` (%18 şans küçük olay) → **en fazla bir** ek bağlam cümlesi (öncelik: kriz-bitiş > şans-olayı > sağlık→mutluluk çapraz > mutluluk→sağlık çapraz > yaşlanma (%30 şans)). **Seçimsiz/ansızın rastgele ölüm kanalı (`aniOlumDene`) 2026-09 sonunda TAMAMEN KALDIRILDI** — artık hiçbir ölüm oyuncunun bir seçim yapmasından bağımsız, salt şansla gerçekleşmez; tüm ölümler ya `basariliSonuc`/`basarisizSonuc.olum`/`olum_sansi`'li bir SEÇİMDEN, ya `MAKS_YAS`/sağlık-0/ecel gibi mevcut mekaniklerden gelir (bkz. §13 "Rastgele ölüm olayları").
16. **Hâlâ hayattaysa:** `gecmisKaydet` (grafik noktası) → `rutbeGuncelle` (yalnız terfi — ratchet, çağrı başına +1 kademe, cooldown'lu; `terfiOldu=true` + kutlama yalnız artışta, §14) → `hayatAmaciKontrolEt` → `haberleriUret` (hükümdar-değişim haberi varsa başa eklenir). *(kariyer_puani'nin pasif yıllık +2'si ise adım 15/b civarında, `ilerletYas`'tan hemen sonra; meslek-kategori başarısı +3 ve `kariyer_puani_artis` adım 6 civarında uygulanır.)*
17. `clampStats()` (son güvenlik clamp'i).
18. `state.gecmis_olaylar.push(olay.id)` — bir sonraki seçim önceliği için.
19. DB'ye kaydedilir, `{state, basarili, uygulananEtki, yasArtisi, sonucAnlatimi, zamanAnlatimi, terfiOldu}` döner.

**`checkDeath` relik istisnası:** `saglik<=0` veya zorunlu ölüm tetiklendiğinde, karakterde `esya:kutsal_kalinti` (Kutsal Emanet) etiketi varsa **ölüm iptal edilir**, etiket tüketilir, `saglik = max(saglik,15)` yapılır, hayat-hikayesine "Kutsal bir emanet sayesinde ölümden döndü" yazılır. **Bir karakterde bu koruma tüm ömür boyunca sadece bir kez** işler (etiket harcanır). **`efsanevi_olum` rozeti artık YALNIZCA ölüm gerçekten gerçekleştiyse atanır** (`checkDeath` sonrası `!state.aktif` kontrolü, 2026-09) — relik `etki.efsanevi_olum` ölümünü iptal ettiğinde hayatta kalan karakter yaşamadığı bir "efsanevi ölüm" damgası taşımasın.

## 10. `onTepki` — Ara-Tepki Mekaniği

Bir seçeneğin `onTepki` alanı varsa: seçilince **zar atılmaz**, zaman ilerlemez; sunucu `TepkiSonucu{ara_tepki:true, olay_basligi, olay_metni, secenekler:[{metin: geriCekilMetni},{metin: devamMetni}]}` döner ve oturumda `bekleyenTepki` olarak saklanır. İstemci bunu ayrı bir ekran olarak gösterir, oyuncu 0 (geri çekil) veya 1 (ısrar et) seçer. Bu ikinci `POST /choice` çağrısı zar ATMADAN doğrudan `geriCekilSonucu`/`devamSonucu`'nu (yine jitter'lı) uygular ve **bu noktada zaman ilerler** (§9'daki tam pipeline çalışır). `basarili` bayrağı burada gerçek bir zardan gelmez — `netEtkiOlumluMu()` görünür stat delta'larının toplam işaretine bakarak kozmetik olarak belirler (sadece sonuç ekranı kutlama/düşüş efekti için). Yeni bir `scenario` üretimi bekleyen bir `onTepki`'yi her zaman iptal eder (sekme yenileme güvenliği).

## 11. Zorlanan Olay Kaskadı (`senaryoUret`)

`POST /:id/scenario` çağrıldığında, normal ağırlıklı seçime geçmeden önce **aşağıdaki sırayla** (ilk eşleşen kazanır, `!zorlananId &&` zinciri) bir dizi garanti/zorunlu olay kontrol edilir:

1. **Tarihi savaş ilanı** — savaşta değil, yaş≤55, `tarihiSavasKontrol(bolge,yil,cag)` bir rakip döndürüyor ve `tarihi_savas_gordu:<rakip>` etiketi yoksa → `dunya_savas_ilani_asker` (Asker) / `dunya_savas_ilani` (diğer); etiket eklenir.
2. **Kariyer yolu girişi** (2026-09'dan beri **8 çağ×meslek kombinasyonunun hepsi**, `gameEngine.ts`'teki `YOL_SISTEMLERI` tablosundan okunur — eskiden sadece Orta Çağ Asker/Din Adamı'ydı) — yaş≥18, ilgili `yol:asker:*`/`yol:din:*`/`yol:tuccar:*`/`yol:zanaatkar:*` etiketi henüz yok, giriş olayı daha önce görülmemiş → Orta Çağ Asker `oc_asker_yol_ilk_emir` / Orta Çağ Din Adamı `oc_din_yol_ilk_sinav` / Orta Çağ Tüccar `oc_tuccar_yol_ilk_anlasma` / Sanayi Devrimi Asker `sd_asker_yol_ilk_gorev` / Sanayi Devrimi Tüccar `sd_tuccar_yol_ilk_karar` / Sanayi Devrimi Din Adamı `sd_din_yol_ilk_vaaz` / Orta Çağ Zanaatkâr `oc_zanaatkar_yol_ilk_siparis` / Sanayi Devrimi Zanaatkâr `sd_zanaatkar_yol_ilk_makine`. Giriş olayının **hiçbir seçeneği** "kaçış" sunmaz — 3-4 seçeneğin hepsi bir dala kilitler, oyuncu istemeden bile mutlaka bir dala girer.
3. **Hizip zorunlu girişi** (2026-09, kullanıcı isteği: "hizibe katılma S2 olunca zorunlu tetiklensin ve reddetme olmasın, birini seçmek zorunda") — yaş≥17, `rutbe_seviye>=2` (kademeli merdivenin ilk gerçek terfisi, genelde 18-22 yaş civarı — kariyer yolu kilidinin hemen ardından), henüz `hizip_secildi` etiketi yoksa → mesleğe göre `hizip_asker_saflasma`/`hizip_tuccar_saflasma`/`hizip_din_saflasma` (`HIZIP_GIRIS_OLAYLARI`, Zanaatkâr'ın hizbi yok, bu kurala dahil değil) zorla tetiklenir. Eskiden bu üç olay **tamamen şansa bırakılmıştı** (yalnızca `genel.ts`'in normal ağırlıklı havuzunda düşük öncelikle çıkabiliyordu, hiçbir garantisi yoktu) ve üçünün de bir "tarafsız kal / taraf seçme" üçüncü seçeneği vardı (`hizip_ata` set ETMİYORDU — karakter hizip'siz kalabiliyordu). İkisi de 2026-09'da kaldırıldı: kaskad garantisi eklendi **ve** her üç olayın "tarafsız" şıkkı silindi — artık iki hizip seçeneğinden biri **kesinlikle** seçilmek zorunda.
4. **Evlilik teklifi garantisi** — yaş≥29, evli değil, ne `iliski_evlilik_teklifi` ne `iliski_ikinci_teklif` hiç görülmemiş → `iliski_evlilik_teklifi`.
5. **Şehir yönetimi girişi** — `rutbe_seviye>=4` (2026-08 rütbe reformuyla eski `>=3`'ten yükseltildi, §14), `sehir_yonetimi_basladi` etiketi yok → mesleğe göre `sehir_yonetim_{tuccar|dinadami|asker|zanaatkar}_baslangic` (Zanaatkâr 2026-09 sonunda eklendi, §15).
6. **Evcil hayvan teklifi** — 20≤yaş<25, evcil hayvanı yok, teklif olayı görülmemiş → çağa göre `evcilhayvan_sahiplenme_teklifi_{sanayi|ortacag}`.
7. **Evcil hayvan takip garantisi** — evcil hayvanı var, kümülatif kontrol noktaları (`EVCIL_HAYVAN_TAKIP_KONTROL_NOKTALARI`: 30→1, 42→2, 55→3 — bu bölümdeki eski "45≤yaş<50, <2 görülmüş" tek-eşikli açıklama kümülatif modele geçilince güncellenmemişti), `EVCIL_HAYVAN_TAKIP_OLAY_IDLERI` hedefin altındaysa → `EVCIL_HAYVAN_GENEL_TAKIP_OLAY_IDLERI` havuzundan (öncelik görülmemişlerde) rastgele.
8. **Gizemli eşya takip garantisi** — 38≤yaş<46, sahip olunan her `esya:`/`envanter:` etiketi için `GIZEMLI_ESYA_TAKIP_HAVUZU[esyaId]`'den hiç görülmemişse → o havuzdan rastgele (ilk eşleşen eşya kazanır).
9. **Hizip takip garantisi** (kümülatif kontrol noktaları, `HIZIP_TAKIP_KONTROL_NOKTALARI`) — hizbe katılmış (artık kural 3 sayesinde S2'den itibaren HERKES, Asker/Tüccar/Din Adamı için garanti) karakter, hayatı boyunca hizbe özel havuzdan (~10 olay: 9 hizbe özel + 1 meslek-çatışma genel) belirli yaşlara kadar en az N olay görmüş olmalı: 26→1, 35→2, 44→3, 53→4, 62→5. 2026-09'da (kullanıcı isteği "hizip... daha detaylı yaşlara tetikle") eski tek-4-noktalı (30/42/55/65→1-4) tablo daha sık/ince aralıklara bölündü, ilk yaş 30→26'ya indirildi, nihai hedef 4→5'e yükseltildi.
10. **Saray daveti** — henüz `sarayda` değil, `un>=70 AND ahlak>=70`, `saray_kral_daveti` görülmemiş → `saray_kral_daveti`.
11. **Saray takip garantisi** — `sarayda`, 50≤yaş<58, `SARAY_OLAY_IDLERI` (6 id) 'den <2 görülmüş → havuzdan rastgele.
12. **Büyük yolculuk garantisi** (ömürde bir kez) — yaş≥22, ne `yolculukta` ne `hapiste`, `yolculuk_tamamlandi` yok, (hiç teklif edilmemiş VEYA `yolculuk_teklifi_zamani` cooldown'u dolmuş) → `uygunYolculukTeklifleri(state)` listesinden rastgele (meslek/çağ/bölge/din'e göre, §17).
13. **Yol dalı takip garantisi (2026-09, kümülatif kontrol noktaları)** — bir `yol:<meslek>:<dal>` etiketine kilitlenmiş karakter, hayatı boyunca o dala özel havuzdan (`gerekliEtiketler` içinde aynı `yol:` etiketi + aynı `cag`) belirli yaşlara kadar en az N olay görmüş olmalı; N ve yaş eşikleri `gameEngine.ts`'teki `YOL_TAKIP_KONTROL_NOKTALARI` tablosundan sisteme göre değişir (büyük/eski havuzlar — Orta Çağ Asker/Din Adamı, dal başına ~20-21 olay — daha yüksek bir hedefe kademeli kilitlenir; küçük/yeni havuzlar — dal başına 11 olay — daha düşük bir hedefe, havuz tükenmesin diye). **2026-09 ikinci turda** (kullanıcı isteği "kariyer yollarını daha detaylı yaşlara tetikle") kontrol noktası sayısı artırıldı (Orta Çağ Asker/Din Adamı 5→6 nokta, diğer 6 sistem 3→4 nokta), ilk kontrol yaşı birkaç yıl indirildi, nihai hedef kontrol sıklığıyla orantılı bir birim yükseltildi (OÇ Asker/Din Adamı 5→6 = ~%29; diğerleri 3→4 = ~%36): OÇ Asker 18/27/35/43/51/60→1-6; OÇ Din Adamı 20/29/38/47/56/65→1-6; OÇ Tüccar 19/31/43/55→1-4; SD Asker 18/30/42/54→1-4; SD Tüccar 22/36/50/64→1-4; SD Din Adamı 23/37/51/65→1-4; OÇ Zanaatkâr 21/34/46/58→1-4; SD Zanaatkâr 25/39/53/67→1-4. Orta Çağ Asker/Din Adamı'nın giriş olayı ayrıca `zorunlu_sonraki` ile bağımsız bir dal-özel olayı daha garantiler (bu kuralın dışında, ekstra). Bilinçli olarak yolculuk garantisinin (kural 12) **hemen ardına** yerleştirildi — aksi halde bir `yol:` etiketi taşıyan karakterde yolculuk teklifi hiç sıraya giremiyordu.
14. **Mistik garanti** (ekonomi sıkılaştırma turu, ömürde bir kez) — 25≤yaş<45, `gecmis_olaylar`'da `gizemli:true` işaretli hiçbir olay yoksa ve `uygunMu`'dan geçen en az bir `gizemli:true` olay varsa → o havuzdan rastgele. "Her ömürde en az bir esrarengiz olay" (kullanıcı isteği); `esyaVeGizem.ts`'teki giriş olayları (`gizem_ejderha_tilsimi`, `derinlik_hazine_haritasi` vb.) bu turda `gizemli:true` ile işaretlendi (eskiden sadece sahiplik-sonrası takip olayları işaretliydi).
15. **Mülk olayı — satın alım penceresi garantisi (2026-09, kullanıcı isteği: "mülk olayını da tetikli hale getir satın aldıktan sonra 5 yıl sonra 15 yıl içinde gibi")** — eski fırsatçı `MULK_OLAYI_IHTIMALI=0.12` (her çağrıda %12 şans) artık YALNIZCA satın alma yılı bilinmeyen (eski kayıt) ya da garanti penceresini aşmış mülkler için yedek mekanik. Her sahip olunan mülk için `state.mulk_alis_yili[tur]` (satın alındığı oyun yılı, `mulkSatinAl`'da yazılır) referans alınır: satın alımdan `MULK_OLAYI_PENCERE_BASLANGIC_YIL=5` yıl sonrası ile `MULK_OLAYI_PENCERE_BITIS_YIL=15` yıl sonrası arasında, o türe ait ([mulkOlaylari.ts](server/src/data/olaylar/mulkOlaylari.ts), tür başına 2 olay) hiç görülmemiş bir olay varsa **kesin tetiklenir** (pencere açıldığı ilk `/scenario` çağrısında). Pencere 5 yıldan önce sessizce beklenir; 15 yılı aşan ya da satın alma yılı bilinmeyen mülkler eski %12 fırsatçı mekaniğe düşer. Mülk elden çıkınca (`mulk_kaybet`, tefeci el koyması, kervan batması) `mulk_alis_yili[tur]` da silinir. Eski kayıtlarda alan boş (`eskiKayitGocu` `{}` backfill eder) → otomatik olarak fırsatçı mekanik geçerli olur. Test: [havuzGarantisi.test.ts](server/tests/havuzGarantisi.test.ts) "mülk olayı garantisi" bloğu.
16. **Standalone havuz garantisi** (2026-09, kullanıcı isteği: "belli yaşlarda yaşanmamışsa tetikleyelim ki bir hayatta belli sayıda kesinlikle görsünler") — kaskadın en sonunda, kural 1-15'in HİÇBİRİ eşleşmediği "sakin" turları doldurur. Kapsam **kasıtlı olarak dar**: yalnızca hiçbir kilide/garantiye zaten bağlı olmayan "standalone" havuzlar — `genel.ts` + 6 meslek-standalone dosya (`ortaCagAsker/Tuccar/DinAdami.ts`, `sanayiAsker/Tuccar/DinAdami.ts` — karakterin kendi çağ×meslek'ine göre yalnız biri seçilir) + `iliskiler.ts` + `aile.ts` + `evlilikVeAile.ts` + `komikGaripOlaylar.ts` + `komikOlumler.ts`. Bu son üç havuzun (`iliskiler`/`aile`/`evlilikVeAile`) farkı §16'daki "Evlilik & Aile Olay Havuzları" alt bölümünde ayrıca anlatılıyor. hapis/veba/yolculuk/sosyalleşme/aranma/kariyer-yolu/hizip/evcil-hayvan/gizemli-eşya/büyülü-mistik havuzları **kasıtlı olarak dışarıda** — hepsinin zaten kendi (yukarıdaki) garantisi var, üst üste binen ikinci bir garanti çakışma/çifte zorlama yaratırdı. Her havuz için `gameEngine.ts`'teki `standaloneHavuzDurumu` (YOL_TAKIP'in `kumulatifTakipSec`'iyle aynı "yaşa göre kümülatif kontrol noktası" mantığı, ama aday havuzu HER ÇAĞRIDA `temelUygunMu` ile o anki state'e göre filtrelenir — tag/stat/çağ/meslek koşulu tutmayan bir olay asla zorlanmaz, koşul sağlanmıyorsa sessizce null döner); adaylar arasından **oransal olarak en geride kalan** (hedefine göre en fazla eksiği olan) havuz seçilir — sabit sıralı tarama (genel.ts hep önce) küçük hedefli havuzları açlıktan öldürüyordu, gerçek bot-simülasyonuyla (`scripts/_gecici_*.ts`, kalıcı değil) tespit edilip düzeltildi.
    Hedefler **DÖRT turda** kalibre edildi: (1-2) ilk tahmin ("bir ömürde ~50 tur var" varsayımı) tutmadı, yolculuk/kariyer-yolu gibi mevcut garantiler bir ömrün turlarının **%25-60'ını** yiyebiliyor — hedefler ~%65 küçültüldü. (3) kullanıcı düzeltmesi ("ortalama ölüm 70-75 civarı"): 1-2. turdaki bot başarı şansına göre ağırlıklı rastgele seçim yapıyordu ve `komikOlumler.ts`'teki riskli seçenekleri de zaman zaman seçip ortalamayı düşürüyordu (~47-55) — her zaman en yüksek başarı şansını seçen "temkinli" bir botla ölçülünce ortalama **54.4 / medyan 62 / %75 persentil 68** çıktı (kalan ölümlerin çoğu veba/kıtlık/ruh-sağlığı gibi seçimden bağımsız sistemik risklerden), bu yüzden hedefler ~2-3 katına büyütüldü. (4) aynı temkinli botla YENİ hedefler test edilince kapsam oranı %8-9'a düştü — yaş uzasa bile bir ömürdeki "serbest" tur PAYI aynı hızla büyümüyor (diğer sistemler de daha uzun ömürde orantılı pay alıyor); hedefler bu veriye göre tekrar küçültülüp yaş eşikleri "70-75 ortalama" beklentisine göre uzatıldı. (5) yaşlar (kullanıcı isteği: "yeni mekanizmadaki yaşlar birebir aynı olmasın azıcık değiştir ve ilk olay yaşlarını düşür birazcık") birbirinden kaydırıldı, ilk kontrol yaşları düşürüldü — hedef sayıları DEĞİŞMEDİ. (6) **`genel.ts`'in hedefleri kullanıcı isteğiyle ("genel sayısını düşür") ~%40 küçültüldü** (92 yaştaki tavan 12→7) — `genel.ts`, `standaloneHavuzDurumu`'nun "oransal en geride kalan" seçiminde en büyük havuz olduğu için sürekli diğer küçük havuzların (iliskiler/aile/komikGarip vb.) önüne geçmeye eğilimliydi; yaşlar bu turda DEĞİŞMEDİ, yalnızca hedefler küçüldü.
    **Güncel hedefler** (yaş eşikleri hiçbir tabloda birebir tekrar etmiyor, bkz. 5. tur): `genel.ts` (~213 olay) 22→1, 32→2, 42→2, 52→3, 62→4, 72→5, 82→6, 92→7; meslek-standalone (~18-27 olay/dosya) 24→1, 43→2, 60→3, 81→4; `iliskiler.ts` 31→1, 46→2, 61→3, 76→4; `aile.ts` 33→1, 48→2, 63→3, 78→4; `evlilikVeAile.ts` 29→1, 44→2, 59→3, 74→5; `komikGaripOlaylar.ts` 26→1, 41→2, 56→3, 71→4; `komikOlumler.ts` 36→1, 64→2 (bu olaylar oyuncuya risk SEÇENEĞİ sunar, ölümü değil — garanti yalnız ekranı gösterir). Test: [havuzGarantisi.test.ts](server/tests/havuzGarantisi.test.ts).

Hiçbiri eşleşmezse `zorlananOlayId` `null` kalır ve normal ağırlıklı seçim (§12) çalışır. Kaskad sonunda: `bekleyenTepki` sıfırlanır, `sonTon` güncellenir, tek-seferlik `istihbarat_var` etiketi varsa tüketilir.

## 12. Olay Seçim & Ağırlıklandırma Algoritması (`olaySec`)

1. **Uygunluk filtresi** (`uygunMu`): §6'daki tüm `OlayTanimi` alanları AND'lenir. Ayrıca: `hapiste` etiketliyse SADECE `hapisOlayi:true`; `yolculukta` etiketliyse SADECE `yolculukOlayi:true` (birbirini dışlar, normal havuz tamamen kapanır).
2. **Görülmemişlik önceliği:** Uygun olaylar arasında `gecmis_olaylar.lastIndexOf(id)` (hiç görülmemişse -1) hesaplanır; en küçük (en "eski"/hiç görülmemiş) değere sahip olanlar alt-havuz olur — yani **hiç görülmemiş olaylar her zaman görülmüş olanlara kesin önceliklidir**. **Ekonomi sıkılaştırma turunda eklendi:** bu adımdan önce, uygun havuz önce "son `SON_K_TEKRAR_ONLEME` görülende hiç yok" alt kümesine daraltılır (aday havuzu boşalırsa eski davranışa geri döner) — küçük tag-gated havuzlarda bile aynı olayın art arda çıkması azaltılır ("aynı olaylar çıkabiliyor" şikayeti). **2026-09 "az olay var" turunda (Yol C) `SON_K_TEKRAR_ONLEME` sabit 6'dan `sonKTekrarOnlemeHesapla(havuzBuyuklugu) = clamp(havuzBuyuklugu*0.7, 6, 30)`'a çevrildi** — Faz 1 ölçümü (§ aşağıdaki `olayKapsami.ts`) hapis/kaçak/veba/yolculuk gibi küçük havuzlarda (8-39 olay) sabit 6'nın neredeyse hiç koruma sağlamadığını gösterdi; artık küçük havuzda pencere havuzun kendisine yakın büyür (hapis'te 27), büyük (~150'lik normal) havuzda 30'da tavanlanır. Bkz. [tests/tekrarOnleme.test.ts](server/tests/tekrarOnleme.test.ts).
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

**Rastgele ölüm olayları — KALDIRILDI (2026-09 sonu):** Eskiden `aniOlumDene`/`ANI_OLUM_IHTIMALI` ile tur başına %0.4 ihtimalle, oyuncunun HİÇBİR seçim yapmadığı, tamamen sağlıktan bağımsız "saçma" bir ölüm (saksı düşmesi, yıldırım vb.) tetiklenebiliyordu. Bu mekanik ("seçim yapmadan ansızın ölüm") **kullanıcı isteğiyle komple kaldırıldı** — `stateManager.ts`'teki `aniOlumDene`/`ANI_OLUM_OLAYLARI`/`ANI_OLUM_IHTIMALI` ve `gameEngine.ts`'teki çağrısı silindi. **Artık her ölüm ya doğrudan bir SEÇİMİN sonucudur** (`basariliSonuc`/`basarisizSonuc.olum`/`olum_sansi`), **ya da** `MAKS_YAS=100` zorunlu tavanı / sağlık 0'a inişi / `ecelDenemesi` (ileri yaş doğal ölüm riski, yaş≥70) gibi diğer mevcut mekaniklerden gelir — hiçbiri oyuncunun bir tur içinde hiçbir eylemi olmadan "sırf şansla" öldürmez. `SANS_OLAYI_IHTIMALI=0.18` (tur başına %18, küçük flavor kazanç/kayıp — bulunan para kesesi, dedikodu vb.; bu ölümcül değildir, dokunulmadı).

**Absürt/komik ölümler:** Artık **tek kanal** — `komikOlumler.ts` (14 olay), oyuncu bir olayda "aptalca olanı yap" seçeneğini SEÇER; başarısızlıkta `olum_sansi` (35-62, KESİN DEĞİL) + ağır sağlık kaybı, ölürse `efsanevi_olum` rozeti. 2026-09'da bu dosyadaki 6 olay `olum: true`'dan `olum_sansi`'ye çevrildi — artık hepsi "düşük de olsa hayatta kalma şansı" taşır. Seçimsiz/ansızın ikinci kanal (eski `aniOlumDene`) yukarıdaki gibi tamamen kaldırıldı.

**Jitter:** Tüm para/ahlak/saglik/mutluluk etkileri ×(0.85-1.15) rastgele; `un` aynı ama sıfır değilse `YARIM_YILDIZ_PUAN=10` altına düşmez.

**Mutluluk dengesi (büyük denge turu — kullanıcı: "her seçimde moral yükseliyo saçmalık; olayların geneli düşürsün bir kısmı arttırsın"):** Olay verisindeki `mutluluk` deltaları `data/olaylar/*.ts` içinde sistematik ayarlandı (motor kuralı / gizli pasif azalma YOK — deltalar veride, seçenek çipinde görünür): büyük pozitif sıçramalar yarıya indirildi (≥7 → ~round(N/2)), küçük pozitifler +3 tavanına, başarısız-dal moral artışları küçük bir cezaya çevrildi, ve TÜM pozitif `mutluluk` **+12 tavanına** kırpıldı. Guardrail: [mutlulukDengesi.test.ts](server/tests/mutlulukDengesi.test.ts) — tüm bankada net mutluluk toplamı < 0 ve pozitif sonuç oranı < %50 olmalı (regresyon kilidi). *Not: `komikOlumler`/`kureselOlaylar`/`saglikToparlanma`/`buyuluOlaylar` bu sistematik pastan bilinçli hariç.* İngilizce `.en.ts` aynalarında sayısal alan olmadığı için çeviri dokunulmadı.

**Seçenek paritesi turu (kullanıcı: "bazı olaylarda bir şık aşırı mantıklı diğerine göre, ya da bir şıkkın etkisi yok — şıkları birbirine yakınlaştır"):** Mekanik bir codemod ([scripts/dengeCodemod.ts](server/scripts/dengeCodemod.ts), tek seferlik; teşhis: [scripts/analyzeOlayDenge.ts](server/scripts/analyzeOlayDenge.ts)) ~575 sonuç bloğunda yalnız sayısal stat deltalarını ayarladı (mesaj/ipucu ve `.en.ts` elle bırakıldı). 4 kural: **INERT** iki dalı da boş şıklara küçük gerçek takas (güvenli seçim → `saglik/ahlak +`, `mutluluk -1..-2`); **ZAYIF_BASARI** ~etkisiz başarı dalına küçük garanti kazanç + boş başarısız dala sızı; **BEDAVA_PARA** takassız para veren şıkta ya kazancı vergiler (`ahlak -3`, `mutluluk -round(para*0.15)`) ya da (şans<%92) başarısızlığı acıtır (`mutluluk -4`, kayıp = kazanılacak tutar); **EZICI** beklenen değerde bir şık diğerini eziyorsa A'nın yalnız maddi kazancını (para/un) + pozitif mutluluğunu kısar, B'yi zayıf eksenlerde hafif güçlendirir. **"Kirli" şıklara** (ahlaki taviz / `suc_artis>0`) asla pozitif ahlak veya bedava para eklenmez — erdemli/temiz şık da parite uğruna kötüye çevrilmez. `komikOlumler`/`saglikToparlanma` hariç. Guardrail hâlâ geçiyor (net mutluluk ~−4650, pozitif oran ~%24).

**Seçenek paritesi turu #2 (kullanıcı: "hâlâ bazı olaylarda bir şık yüklü para, diğerinde ciddi bir eksi yok — para seçersen mutluluk/ahlak/şöhret CİDDİ düşsün"):** İkinci mekanik codemod ([scripts/dengeCodemod2.ts](server/scripts/dengeCodemod2.ts), tek seferlik). #1'deki BEDAVA_PARA kuralı çok yumuşaktı; bu tur "bedava para" imzalı **103 başarılı dala** tutarlı bir ruhsal bedel bindirdi. Hedef seçim = `basariliSonuc.para >= 12`, ölüm riski yok, telafi edici bayrak (meslek/etiket/ittifak) yok, EV'de ciddi negatif takas yok (`neg toplam > -6`), net para (`para - maliyet`) `>= 10`. Uygulanan bedel (yalnız başarılı dal, `net = para - maliyet`): `mutluluk -= clamp(round(net*0.40), 4, 11)` **her zaman**; `un` (şöhret) → varsa yarıya indirilir, yoksa `-= clamp(round(net*0.14), 2, 5)`; `ahlak` → pozitif "erdem parıltısı" yarıya indirilir, **ek ahlak cezası yalnız veride zaten kirli imza varken** (`ahlak<0` ya da `suc_artis>0`) `-= clamp(round(net*0.20), 3, 8)` — metin/şans tahminiyle temiz bir hırs şıkkı ahlaksız gösterilmez. `mesaj`/`detay` metinleri + `.en.ts` aynaları elle bırakıldı (bazı "itibar altından değerlidir" cümleleri artık düşen `un` ile hafif çelişebilir — bilinçli kabul). `komikOlumler`/`saglikToparlanma` hariç. Guardrail geçiyor: **net mutluluk ~−5467, pozitif oran ~%22** (326/1483); eski gevşek teşhiste BEDAVA_PARA 125→58.

**Maaş formülü** (`hesaplaMaasYillik`):
```
temel[meslek] (Asker 10.35 / Tüccar 11.5 / DinAdamı 9.85 / Zanaatkâr 10.0 — özgün 9/10/8 tabanına 2026-08'de +%10, 2026-09'da (yama #2) +%5 → toplam ×1.15; 2026-09 ekonomi dengesindeki üçüncü +%10 zam ekonomi sıkılaştırma turunda GERİ ALINDI. Din Adamı tabanı ayrıca 9.2→9.85: diğer iki mesleğe yaklaşsın, pragmatik din adamı geride kalmasın. Zanaatkâr (2026-09 sonu, 4. meslek) 10.0 ile Asker/Tüccar arasına yerleştirildi)
× (1 + itibarToplam/100)   // "İTİBARIN" (2026-09, yama #2'de yumuşatıldı + stata göre ayrıştı): itibarDegerYuzdesi(mutluluk)+itibarUnYuzdesi(un)+itibarDegerYuzdesi(ahlak). Mutluluk/Ahlak bant: ≤25→−4 · ≤40→−2 · ≤60→0 · ≤78→+2 · >78→+4 (nötr bant 40-60). Şöhret bant: ≤8→−4 · ≤16→−2 · ≤50→0 · ≤75→+2 · >75→+4 (nötr bant DÜŞÜKTEN başlar — mütevazı karakter az tanınıyor diye cezalanmasın). TOPLANIR, tavan/taban YOK → üçü dipteyse −%12, üçü zirvedeyse +%12.
× (1 + min(tur_sayisi+8,40)*0.0025)   // KIDEM: ekonomi sıkılaştırma turunda +%0.25/tur, tavan +%10 @tur~32'ye geri çekildi (2026-09 ekonomi dengesinde kısaca +%0.375/tur, tavan +%15 idi). Taze karakter ~+%2 alır.
× maasCarpani (kalıcı, birikimli etiket — ekonomi sıkılaştırma turunda TAVAN tekrar düşürüldü: toplam ∈ [0.60, 1.20], bkz. maasCarpaniUygula aşağıda)
× durumlar[].gelir_carpani (çarpımsal)
× (ekonomi=kotu?0.8:iyi?1.15:1) × (savasta?0.85:1)
× enflasyonCarpani(state)   // arka planda işler ama 2026-09'dan beri oyuncuya HİÇBİR yerde yüzde olarak gösterilmez (Finans ekranı/özet paneli/dünya etkileri listesinden çıkarıldı)
× (sehir_yonetim_seviyesi>=1 ? 1.03 : 1)   // ŞEHİR YÖNETİMİ: şehir yönetimine girildiyse SABİT +%3, seviyeyle ölçeklenmez (seviye/unvan yalnız prestij; eski +%8'den düşürüldü)
× rutbeMaasCarpani(rutbe_seviye)   // [1.0, 1.15, 1.29, 1.44, 1.60] S1..S5 — BİLEŞİK: kademe artışları sırasıyla %15·%12·%12·%11·%10 (… diye devam eder), her kademe bir öncekinin üstüne biner (§14)
→ round, taban 1
```
**`maasCarpaniUygula(state, carpan, ham=false)`** (2026-09, tavanı ekonomi sıkılaştırma turunda tekrar düşürüldü): kalıcı `maas_carpani` etiketine katkı ekler. `ham=false` (varsayılan) → pozitif katkı **yarıya indirilir** (`1+(carpan-1)*0.5`; dağınık ~80 olay + ekip bonusunu tek noktadan kısmak için), negatif katkı aynen geçer. `ham=true` → katkı olduğu gibi (doğuş kimlik ödülleri: yerleşim farkı, aile mirası). Her durumda toplam çarpan **`[MAAS_CARPANI_TABAN=0.60, MAAS_CARPANI_TAVAN=1.20]`** bandına kırpılır (2026-09 ekonomi dengesinde kısaca 1.40 idi). Ekip alımı çarpanı `1+(gercekKalite-50)/500` (eski `/250`), aile mirası `1.08` ham (eski `1.15`), ayyaşlık `0.95`.
Formül tek yerde: `hesaplaMaasYillik` ile `maasKirilimHesapla` (aynı dosya) ortak bir `maasCarpanKalemleri(state)` listesini kullanır — biri çarpıp yuvarlar, diğeri kalemleri **4 gruba** ayırıp Finans ekranına döner: **"rutbe"** (rütbe primi, ratchet), **"kariyer"** (kıdem + şehir yönetimi + `maasCarpani` kalıcı ödülleri — kalıcı birikim), **"itibar"** (mutluluk+şöhret+ahlak birleşik düzenleyicisi `itibarMaasKirilimi` — değişken; `MaasKirilim.itibarYuzde` + `itibarKalemler` üçünü de 0 olsa bile listeler, Finans ekranında tek başlık + alt satır olarak gösterilir, ≤ −12 iken kırmızı + "İtibarın gelirini ciddi düşürüyor" uyarısı), **"donemsel"** (enflasyon + ekonomi + savaş + salgın/`veba.gelirCarpani` + `durumlar[].gelir_carpani` — dünya durumu değiştikçe değişir; enflasyon kalemi 2026-09'dan beri hem toplama girer hem de kırılım detayından/oyuncudan gizlenir). `maasKirilim`, `finansGetir`'in dönüşüne (`FinansOzeti.maasKirilim`) eklidir.

**Yıllık gelir dalgalanması:** Turdaki her yıl ayrı ayrı `maas_yillik × (0.85-1.15 rastgele)` (büyük denge turu: kullanıcı isteğiyle 0.88-1.15'ten bu banda).

**Olay para ödülleri (`OLAY_PARA_PRIMI`, gameEngine.ts):** Pozitif `etki.para` `× 0.85` ile ölçeklenir — büyük denge turunda 1.055'ten düşürüldü ("olaylardan gelen para ödüllerini %20 düşür"; eski +%5.5 primi de yutuldu). YALNIZ pozitif para'ya; kayıplara değil. Meslek/yolculuk/suç çarpanları bunun üstünde çalışır.

**Meslek metrik çarpanı** (sadece kendi kategorisinde, sadece pozitif para'ya): Asker `1+saldiriGucu/200` (`saldiriGucu=ordu_mevcudu*(1+techizat/100)`); Tüccar `1+ticaret_sermaye/180`; Din Adamı `1+nufuz/180` (2026-08'de Tüccar/Din `/300`'den `/180`'e sertleştirildi — yatırımın geri dönüşünü hızlandırmak için); **Zanaatkâr `×1` sabit** (2026-09 sonu, bilinçli olarak etkisiz bırakıldı — `uretim_kapasitesi` sayacı dolar ama dengesi henüz yapılmadı, §4).

**Ordu kaybı** (savaş kategorisi seçimlerinde, Asker): `yuzde = (basarili?0.03:0.10) × (savasta?1:0.2) × (0.5+rastgele(0-1))`; `mevcut -= round(mevcut*yuzde)`.

**Ordu barış büyümesi:** savaş yokken, turdaki her yıl %25 şansla +1 veya +2 (tavan 300).

**Enflasyon — GELİR ve GİDER ayrı (büyük denge turu):** `enflasyonCarpani(state)` = GELİR enflasyonu `(1+oran)^(yil - baslangic_yili)`, `oran` Orta Çağ **%1/yıl**, Sanayi Devrimi **%2/yıl** (SD %3→%2). Maaş, mülk/yatırım/mağaza maliyetleri bunu kullanır. `giderEnflasyonCarpani(state)` = ayrı, biraz yüksek GİDER enflasyonu (OÇ **%1.2/yıl**, SD **%2.2/yıl** — gelir–gider makası daraltıldı, eskiden %2/%3) — yalnız `giderKalemleriHesapla`'daki `yasam` + `konut` giderleri bunu kullanır (eski "gelir enflasyonunun %70→%100'ü" kademeli hack'i kaldırıldı). `FinansOzeti.giderEnflasyonYuzdesi` istemciye döner; `FinansEkrani`'ndeki yaşam/kira seçim kartları artık bunu kullanır → kart tutarı gerçek gider dökümüyle **birebir eşleşir** (eski bug: kart gelir enflasyonuyla hesaplayıp gider dökümüyle tutmuyordu). Gelir enflasyonu oyuncuya hâlâ gizli. Para tutarları artık **2 ondalık basamağa** (`paraYuvarla`, `Math.round(x*100)/100`) yuvarlanır — tam sayıya değil — ki düşük Orta Çağ oranının etkisi de görünür kalsın; sağlık/mutluluk/ün/ahlak gibi istatistikler bundan etkilenmez, onlar hep tam sayı kalır. Client'ta `formatPara()` ([format.ts](client/src/format.ts)) bu ondalıkları (varsa) en fazla 2 basamakla gösterir.

**Zenginlik vergisi (pasif) — KALDIRILDI.** Eskiden nakit+gayrimenkul > 500 iken aşan kısmın %4/yıl'ı bir `giderKalemleri.vergi` kalemi olarak işliyordu (`zenginlikVergisiHesapla`, `devlet_takibinde` etiketi, `EkonomiSonucu.vergiBildirimi`) — hepsi silindi. Zenginliğin TEK bedeli artık **§27'deki "zorunlu bağış"** (`ZORUNLU_BAGIS_ESIGI=350` → servet 5 yılda bir, %30 ihtimalle servetin %20-25'i — bu paragraftaki "500/%25/%15-20" rakamları eski, kod her zaman 350/%30/%20-25 kullanıyordu). `gayrimenkulDegeriHesapla` hâlâ var (bağış eşiği + Finans ekranı servet dökümü için). **Ekonomi sıkılaştırma turunda** servet eşiğini önceden haber veren "Servetin 350'yi aştı..." uyarı satırı (ana ekran + Gelir&Gider) `dunyaFinansEtkileri`'nden kaldırıldı — mekanik aynı, sadece görünürlük azaltıldı (kullanıcı isteği); gerçek tetiklenme anındaki bildirim cümlesi değişmedi.

**Borç faizi + borç kapatma mekaniği** (`pasifEkonomiUygula`): `para<0` iken **her koşulda sağlık `-1/yıl` + mutluluk `-2/yıl`** (2026-09 ekonomi dengesi: eskiden sağlık `-2/yıl`, mutluluk cezası yoktu). Faiz duruma bağlı: netGelir (maaş−gider) > 0 ise (bütçe artıda, borcu aktif ödüyor) → faiz `|para| × 0.02 × yasArtisi` + net gelirin %25'i kadar ek anapara affı (para 0'ı geçmez); netGelir ≤ 0 ise → faiz `|para| × 0.04 × yasArtisi`.

**Ömürde bir kez borç yardımı** (2026-09 ekonomi dengesi, `pasifEkonomiUygula`): `para<0` VE bütçe hâlâ açık veriyorken (`netGelir ≤ 0`) VE `!state.borc_yardimi_alindi` ise, kilise/eş dost bir kereliğine borcun **en fazla 50** birimini (borç daha azsa tamamını) kapatır; `borc_yardimi_alindi=true` damgalanır (bir daha asla). Spiral yerine kurtulabilir bir çukur olsun diye. `EkonomiSonucu.borcYardimi` + `zamanAnlatimi`'ye + `hayat_hikayesi`'ne bir "🙏" cümlesi eklenir.

**Giderlerde enflasyon oranı — geç oyunda artan** (`giderKalemleriHesapla`, ekonomi sıkılaştırma turunda güncellendi): `yasam` + `konut` giderlerine enflasyonun `1 + (enflasyon−1)×oran`'ı uygulanır; `oran = min(1, 0.7 + gecenYil/150)` (`gecenYil = yil - baslangic_yili`) — erken oyunda hâlâ ~%70 (2026-09 ekonomi dengesindeki sabit değer), ama karakter yaratılışından beri geçen gerçek yıl arttıkça geç oyunda **%100'e** yaklaşır (giderler enflasyonu tam yansıtır). `evcilHayvan` / `savasVergisi` (maaşa endeksli) tam enflasyonda kalır.

**Meslek pasif sürüklenme (olaysız yıllarda bile):** Din Adamı `un += 0.4/yıl` **ve `nufuz += 0.3/yıl`** (nüfuz kesirli birikir ama `clampStats` her tur `nufuz`'u tam sayıya yuvarlar; olayları hep güvenli oynayan bir din adamı bile yavaşça nüfuz → maaş metrik çarpanı toplasın); Tüccar `ahlak += (netGelir>=0 ? -0.4 : +0.4)/yıl` (bolluk ahlakı aşındırır, zorluk güçlendirir).

**Evlilik ↔ mutluluk pasif sürüklenmesi** (`pasifEkonomiUygula`, yalnız `yas >= EVLILIK_MORAL_YAS = 26`; kullanıcı isteği "evli olmamak mutluluk düşürsün, eşle kavga etmek de düşürsün"): bekar/dul → `mutluluk -= 0.7/yıl` (`YALNIZLIK_MUTLULUK_YILLIK`); evli ama `es_puani < KOTU_EVLILIK_ESIGI(35)` → "sürekli kavga", `mutluluk -= (0.8 + siddet*1.2)/yıl` (`siddet = (35 - es_puani)/35`, yani es_puani 0'da -2.0/yıl, ~34'te -0.8/yıl); evli ve `es_puani >= IYI_EVLILIK_ESIGI(70)` → mutlu evlilik, `mutluluk += 0.5/yıl`. Meslek sürüklenmesiyle aynı felsefe — küçük, sessiz (anlatıya cümle eklemez), olayların etkisini domine etmez. **Ayrıca (pasif değil, olaya bağlı):** Din Adamı `din` kategorisinde başarılı olduğu her olayda `nufuz += 1.5` (gameEngine, `KARIYER_PUANI_KATEGORI_BASARI` ile aynı yerde).

**"Kendi işine yatırım" KALDIRILDI (2026-09, "temiz kesim").** Eski `kendiIsiMaliyetiHesapla`/`yatirimYap`/`YatirimConfig`/`GET :id/yatirim-config`/`POST :id/yatirim`/`KENDI_ISI_*`/`KARIYER_PUANI_YATIRIM`/`kendi_isi_yatirim_sayisi` alanı + `IsYatirimEkrani`'nin "Kendi İşine Yatırım Yap" kartı tümüyle silindi. Rütbe telafisi: `KARIYER_PUANI_YILLIK` 2 → **3** (playstyle'dan bağımsız geniş taban; S5 yine nadir, `simulateKisilikler` ile doğrulanmalı). `meslekMetrikCarpani` (Asker `1+saldiriGucu/200`, Tüccar `1+ticaret_sermaye/180`, Din `1+nufuz/180`) hâlâ var ama artık yalnız olaylardan (`ordu_techizat_artis`/`ticaret_sermaye_artis`/`nufuz_artis`) + barış-büyümesi beslenir. `eskiKayitGocu` eski JSON blob'unda `kendi_isi_yatirim_sayisi` bulursa `kariyer_puani` backfill'inde hâlâ ×8 sayar.

**Karanlık / illegal işler** ([kotuIsler.ts](server/src/data/kotuIsler.ts), `gameEngine.kotuIsYap`/`kotuIsConfigGetir`, `POST :id/kotu-is`): İşin & Yatırımların ekranının 3. sütunundaki "Kendi İşin" kartının yerini alan, turu tüketmeyen, zarlı 5 aksiyon. Başarı şansı `basariSansi + yatkinliklar[savas|siyaset]` (5-95 clamp). Başarılı/başarısız dal etkileri **doğrudan** state'e uygulanır (jitter yok, olay hattından geçmez, `sucKazanciUygula` çağrılmaz — sayılar `kotuIsler.ts`'te açık). `para` alanları taban → `× enflasyonCarpani`. Başarısız dalda `hapis_sansi` (0.10-0.35) → "hapiste" etiketi + ceza (`3+rnd(4)+min(3,⌊suc/30⌋)` yıl), `isyeri_yak` başarısızlığında ayrıca `olum_sansi:6` (`efektifOlumSansi`).

| id | taban şans | yatkınlık | başarılı | başarısız |
|---|---|---|---|---|
| `rakibi_korkut` 🗡️ | 76 | siyaset | rakip −10, para +6, ün +2, ahlak −6, mutl +2, **suç +7**, kariyer +2 | ahlak −3, mutl −3, rakip −3, suç +12 |
| `adam_dov` 👊 | 66 | savas | mutl +9, ahlak −14, suç +12 | sağ −12, ahlak −6, mutl −5, suç +18, hapis 10% |
| `rakibi_dov` 🩸 | 60 | savas | rakip −18, para +5, ahlak −12, mutl +3, suç +14, kariyer +4 | sağ −15, ahlak −5, mutl −4, suç +22, hapis 10% |
| `birini_soy` 💰 | 56 | siyaset | para +24, ahlak −16, mutl +2, suç +18 | sağ −10, ahlak −4, suç +28, hapis 25% |
| `isyeri_yak` 🔥 | 44 | savas | para +30, rakip −30, ün −4, ahlak −22, mutl +2, suç +32, kariyer +6 | sağ −18, ahlak −6, suç +40, ölüm 6%, hapis 35% |

Rakip hedefleyen işler `rakip_puani`'yi düşürür + küçük `kariyer_puani` verir (rakibini zayıflatmak = terfi fırsatı) — ileride "derin rakip ilişkileri" (2-3 isimli rakip, güçlerini bu işlerle kırıp pazar payı/terfi/gelir kazanma; "para karşılığı adamına yaptırma" + "ortaya çıkma" varyantları) sistemi bu alanları genişletecek; şu an sadece fail-branch hapis riski "ortaya çıkma"yı temsil ediyor. Client: `IsYatirimEkrani` 3. sütun, aksiyon adları/açıklamaları bileşene gömülü TR+EN (`KARANLIK_ISLER` map, NasilOynanir deseni). **2026-09: `window.confirm` onayı KALDIRILDI** (kullanıcı isteği) — tıklayınca doğrudan çevrilir, sonuç `.kariyer-sonuc-modal` deseninde bir açılır pencerede gösterilir.

**Piyasa mülkleri** (`mulkGetiriOraniHesapla` → `hamMulkGetiriOrani` + **±%17 clamp**, gelir/gider dengesi turu 2026-09: kullanıcı isteğiyle getiri oranları yukarı çekildi + tavan %9→%17 — taban sabitler `NORMAL=%9, AVANTAJLI=%12, DEZAVANTAJLI=-%1.5`; küçük tarla `%9/%10.5/-%0.3`). Demirci/kervan/karaborsa durum çarpanları uçları taşısa bile sonuç **±%17'yi geçemez**. Aynı turda giriş fiyatlarının makası da genişletildi (Küçük Tarla/Buğday Tarlası sabit kaldı, üst kademe mülkler yukarı çekildi — bkz. §16 tablosu) ve mülk türleri arasındaki getiri dengelendi: 30 yıllık simülasyonda (`scripts/simulateGayrimenkul.ts`) altı mülk de artık birbirine yakın, **~%170-230 toplam nominal getiri** veriyor (eskiden %2 ile %57 arası aşırı dağınıktı — Demirci/Karaborsa neredeyse etkisizdi). **6 tür** (Küçük Tarla = "en garanti", taban_maliyet 50):
- **Küçük Tarla** (50): çiftliğin ucuz/küçük kardeşi — kıtlıkta DEZAVANTAJLI(-%0.3), iyi ekonomide AVANTAJLI(%10.5), yoksa NORMAL(%9). Farklı taban sabitleri kullanır (`MULK_GETIRI_KUCUK_TARLA_*`).
- **Çiftlik** (80): kıtlıkta DEZAVANTAJLI, iyi ekonomide AVANTAJLI, yoksa NORMAL.
- **Han** (170): veba/savaşta `DEZAVANTAJLI×1.3`, (nüfus artıyor & savaş yok) AVANTAJLI, yoksa NORMAL.
- **Demirci** (130): savaş/isyanda `NORMAL×2.5`, yoksa `NORMAL×0.45` (gelir/gider dengesi turunda %0.3'ten yükseltildi — eskiden barış yıllarında neredeyse etkisizdi).
- **Kervan** (220): (savaş yok & ekonomi≠kötü) `AVANTAJLI×1.1`, yoksa `NORMAL×0.85` (eskiden ×0.5); **ayrıca** savaşta yıl başına %25 (×yasArtisi) tam kayıp riski (mülk tamamen elden çıkar) — bilinçli olarak dokunulmadı, hâlâ riskli/yüksek-varyanslı bir yatırım (30 yılda ~%65 batma ihtimali, medyan getirisi diğer mülklerden belirgin düşük).
- **Karaborsa** (320): (kıtlık/veba/savaş) `AVANTAJLI×1.6`, yoksa **0** (eskiden `DEZAVANTAJLI×0.5` — barışta hafif negatifti, artık nötr; kriz döneminde yüksek getiri barıştaki durgunluğu telafi ediyor); **ayrıca** sahiplik başına yıllık +2 suç seviyesi, -0.3 ahlak (pasif).

Ayrıca her mülk türünün kendine özel, normal havuzdan tamamen dışlanmış (sosyalleşme olaylarıyla aynı desen, `OlayTanimi.mulkOlayi`) küçük flavor/karar olay havuzu var ([mulkOlaylari.ts](server/src/data/olaylar/mulkOlaylari.ts), 12 olay — tür başına 2); sahip olunan bir mülk için, o türe ait hiç görülmemiş bir olay varsa, `senaryoUret`'teki periyodik kaskad kuralı (`MULK_OLAYI_IHTIMALI=0.12`, her `/scenario` çağrısında) onu zorlanan olay olarak tetikler ("gayrımenkuller farklı olayları açsın" isteği).

**Mülk periyodik bakımı/vergisi** (`mulkGelirleriUygula` içinde, luks eşya bakımıyla aynı desen): her sahip olunan mülk için `state.mulk_bakim_kalan[tur]` sayacı satın alırken **7-11 yıl** (`rastgeleMulkBakimAraligi`) ile başlar, her turda geçen yıl kadar azalır; 0'a inince mülkün GÜNCEL değerinin **~%15'i** (`MULK_BAKIM_ORANI`, gelir/gider dengesi turu 2026-09: kullanıcı "bakımı düşür" istedi, %30→%15, `sonBasamagiDuzelt`'li) `para`'dan düşer, mülk SİLİNMEZ, sayaç yeni bir 7-11 yıla kurulur. `mulkGelirleriUygula` dönüşü `bakimOdemeleri: {ad,miktar}[]` içerir (gameEngine `zamanAnlatimi`'ye "🔧 … bakım/vergi gideri ödedin" cümlesi ekler) ve `toplamNet` = getiri − bakım (gerçek oyun akışında bu hâlâ işliyor). **Ama İstemci mülk satın alma kartı artık bakımı düşülmüş bir "net" GÖSTERMEZ** (gelir/gider dengesi turu 2026-09: kullanıcı "o bakım değerini hesaba katma, sadece o anki kazanç/zararı yaz" istedi) — kart artık sadece güncel dünya durumuna göre **brüt** getiri miktarı/yüzdesini gösterir (`MulkKartBilgisi.tahminiYillikGetiriMiktari`/`Yuzdesi`); `yillikBakimTahmini`/`tahminiYillikNet` alanları backend'de/tipte hâlâ duruyor (gerçek gelir akışı ve olası gelecekteki kullanım için) ama İşin & Yatırımların kartında artık gösterilmiyor. Gelir & Gider ekranındaki "🏠 Gayrimenkul geliri" satırı (`gayrimenkulYillikGelirHesapla`) zaten hep saf brüttü, bakım hiç katılmıyordu — o değişmedi. **30 yıllık kâr/ROI ölçümü:** `scripts/simulateGayrimenkul.ts` (§22).

**Mağaza fiyatları** (`magazaFiyatiHesapla`, §26): `fiyat = round(tabanFiyat × durumÇarpanı × giderEnflasyonCarpani(state))`. **Mağaza — hem "sifa" hem "luks" satın alma fiyatı, artı "luks" periyodik bakım masrafı — GELİR değil GİDER enflasyonunu kullanır** (yaşam/konut giderleriyle aynı; OÇ %1.2/yıl, SD %2.2/yıl — kullanıcı isteği: mağaza alışverişi oyuncunun gideri olduğu için gider enflasyonuna endeksli). `durumÇarpanı`, eşyanın kendi `fiyatEtkenleri`'nden aktif olan `ulke` durumlarının (savasta/vebada/kriz/ekonomi) çarpımıdır (tanımsız alan = 1, etkisiz) — `mulkGetiriOraniHesapla` ile aynı desen. Katalogdaki eşyalarda "sifa" krizlerde/savaşta **pahalanır** (kıtlık arzı azaltır), "luks" ise **ucuzlar** (kimse kriz sırasında mücevher almaz) ve altın çağda pahalanır — kasıtlı ters yön. Katalog ayrıca fiyat/etki açısından kademelidir: ucuz "sifa" eşyaları sadece sağlık verir (küçük miktar), pahalı olanlar hem sağlık hem mutluluk verir (büyük miktar, fiyat başına daha da verimli).

**Envanter bozulması + bakım masrafı** (`envanterBozulmasiUygula(state, yasArtisi)`, §26): Her turda, o turda geçen gerçek yıl sayısı kadar (tur sayısından bağımsız) `magaza_envanteri`'ndeki her eşyanın `kalanYil`'i azalır. "sifa" için 0'a inince eşya sessizce (etkisiz) silinir. "luks" için 0'a inince eşya SİLİNMEZ — GÜNCEL değerinin (`tabanFiyat × giderEnflasyonCarpani`, mağaza satın alma fiyatıyla aynı) ~%20'si kadar bir bakım/vergi masrafı `para`'dan düşer (son basamağı 0/5 olmayacak şekilde yuvarlanır, `sonBasamagiDuzelt`) ve sayaç yeniden rastgele 8-10 yıla kurulur (`LUKS_BAKIM_ARALIGI_MIN/MAX_YIL`).

**Mağaza satın alma kilidi** (`temelMagazaKilitliMi`/`TEMEL_MAGAZA_KILIT_SURESI_YIL=3`, §26): Herhangi bir "sifa" satın alımı, `state.magaza_temel_kilit_bitis_yili = state.yil + 3` yazarak TÜM "sifa" kategorisini 3 yıl kilitler (oyuncu ilaç/erzak stoklayıp sürekli sürekli alışveriş yapamasın diye). "luks" eşyalar bu kilitten etkilenmez; onların kısıtı kategori kilidi değil, kendi türünden en fazla 1 sahiplenilebilmesidir.

**Suç seviyesi (`suc_seviyesi`, TEK suç/aranma ekseni 0-100):** **Pasif azalma yok** (`SUC_SEVIYESI_PASIF_AZALMA_YILLIK=0`) — zamanla düşmez. **Aranma yeniden dengeleme turu (kullanıcı: "kumar oynamakla adam dövmek aynı şey değil"):** tekrarlanabilir/pasif kumar & vice kaynakları düşürüldü ki tur harcamadan defalarca tekrarlanabilen kumar, karanlık işler listesindeki şiddet/soygun suçlarıyla aynı hızda birikmesin — zar masasında her el **+3** (eski +7, önceki turda +4'ten büyütülmüştü), Üç Kağıtçı her oyun **+2** (eski +4), Karaborsa sahipliği **+2/yıl** (eski +3). **Suç kazancı kuralı** (§9 adım 3.5, olay bazlı, tek seferlik — bu düşürmeye dahil değil): para kazandıran + `ahlak<=-5` her seçim `suc_seviyesi`'ni **+16..+65** (taban 16, normal tavan 45, ağır suç tavanı 65; formül `16 + |ahlak|*0.8 + para*0.25`) yükseltir ve aynı seçimde `para` ×1.6 olur. [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) tetikleyici başarısızlıkları `suc_artis:+35`. Aranma kademe bantları (2026-09 yeniden düzenleme): 25/50/75 (§4, §17). [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) kefaret/rüşvet şıkları `suc_artis` negatif (-25/-45/-65) verir; büyük baskınlar `suc_seviyesi_ayarla` (10 = temiz, 30 = kademe 1) ile kesin değere sabitler — pasif azalma olmadığı için bunlar artık TEK düşüş yoludur. **Karanlık işler** ([kotuIsler.ts](server/src/data/kotuIsler.ts), tablo aşağıda) şiddet/soygun ağırlıklı, tekli tetiklenen aksiyonlar olduğu için bu turda DOKUNULMADI — zaten kumar/pasif kaynaklardan daha yüksek (7-40 arası, şiddetin ciddiyetine göre kademeli).

**Test:** [sucKazanci.test.ts](server/tests/sucKazanci.test.ts) — `sucKazanciUygula` birim testleri + manastır yağması entegrasyon testi.

**Mini oyunlar** (`gameEngine.ts`, hepsi turu tüketmez, **Sosyalleş ekranının üstündeki "🎲 Kumar & Meydan Oyunları" bölümü** — `MiniOyunlar.tsx`; kullanıcı isteğiyle İş & Yatırım ekranından buraya taşındı):
- **Hazard** (`zarAt`, `POST :id/zar`): Orta Çağ zar oyunu, modern barbutun atası. Kademeler enflasyonlu `[10,50,100]`. Oyuncu 2 zar, rakip 2 zar; **çift atan YA DA toplamı büyük olan** kazanır (efektif ~%45), kazanınca bahis×2, kaybedince tamamı gider. Her el `suc_seviyesi += ZAR_SUC_ARTISI (3)` ve `hazard_el_sayisi += 1`. Her `HAZARD_BICAK_HER_KAC_EL (4)` elde bir, `HAZARD_BICAK_IHTIMAL (0.45)` ile **"rakip bıçak çekti"**: ayrı bir seçim ekranı DEĞİL — inline sert sonuç (`saglik -8..-18`, `suc +10`, `mutluluk -5`, düşük `efektifOlumSansi(6)` ölüm riski). Dönüş: `{state,kazandi,senZar,rakipZar,cift,bicakCekildi,mesaj}`. **İstemci (`HazardWidget`, 2026-09):** zar masası artık "Sen" ve "Rakip" olarak iki ayrı etiketli satır — ikisi de büyük zar yüzleriyle, zar dönerken ikisi de sahte değerlerle animasyonlu, sonuç gelince ikisi de gerçek `senZar`/`rakipZar`'ı gösterir (kazanan taraf yeşil çerçeveyle vurgulanır); zar dönme süresi ~0.9s→2.0s'ye uzatıldı. Oyun kuralı açıklaması (`moHazardAciklama`) karttan çıkarılıp `title`'a alındı (Üç Kağıtçı/Bilek Güreşi açıklamaları da).
- **Üç Kağıtçı** (`ucKagitciOyna`, `POST :id/uc-kagitci {tutar,secim}`): 3 bardak. Kazanma şansı **SABİT `UC_KAGITCI_KAZANMA_SANSI (0.34)`** — bardak seçimi kozmetik: sunucu önce kazanç zarını atar, `dogruBardak` = kazandıysa `secim`, kaybettiyse başka bir bardak; istemci animasyonu buna göre biter. `suc += 2`/oyun, `uc_kagitci_oyun_sayisi += 1`. Kazanç **bahis×3** (`tutar*3`, net +2 kat bahis — 2026-09'da ×2'den yükseltildi; ~%34 şansla yüksek getiri).
- **Bilek Güreşi** (`bilekGuresiSonuc`, `POST :id/bilek-guresi {basarili}`): istemci 5 sn'de 30 dokunuş beceri oyunu oynatır, yalnız `basarili` bool'unu gönderir (tek oyunculu, düşük stake — sunucu güvenir). Kazanç: `un +6`, `mutluluk +5`, `para +~4` (enflasyonlu). Kayıp: `saglik -6`, `un -4`, `mutluluk -3`. `hapiste`/`yolculukta` iken reddedilir.

**Kriz/Altın Çağ** (`kriz_baslat` ile başlar, `bitisYili`'ye kadar her yıl): Kıtlık → sağlık **-1**/yıl (yama #1'de -2→-1; `dunyaFinansEtkileri` metni de -1'e güncellendi); İsyan → para-3/yıl, un-1/yıl; Altın Çağ → para+4/yıl, mutluluk+1/yıl. Küçük kriz süresi de kısaldı: 2-3 → **1-2 yıl** (`KUCUK_KRIZ_SURE_MIN_YIL=1`).

**Konut/yaşam tarzı:** Turu tüketmez. Konutta **daha pahalıya** geçişte `TASINMA_MALIYETI=3` tek seferlik ücret (ucuza geri çekilme ücretsiz); yaşam tarzı değişimi her zaman ücretsiz/anlık. Yeni karakter varsayılanı 2026-09 ekonomi dengesinde **`normal_ev` + `normal_ye`** — ikisi de sağlık/ün açısından TAMAMEN NÖTR: ev/sofra ekranını hiç açmayan sıradan oyuncu ilk 15-20 yıl boyunca sessizce sağlık/itibar kaybetmesin. **Başlangıç parası (2026-09 ikinci denge turu): `Math.max(5, Math.min(40, 10 + aile.para + yerlesim.para))`** — taban 12→10, aile etkisi artık dar bir ~±20 bandında (eskiden +80/-25 gibi aşırı uçlar vardı), sonuç [5, 40]'a kırpılır (taban 5'te sabit kalıyor — en fakir kökende bile temel bir aksiyonu karşılayacak kadar para). En ucuz 2 konut/sofra kademesinin cezası da yumuşatıldı: -4/-3 → **-2/yıl** (§16).

**Skor** (2026-09 ikinci reform — toplamsal formüle geçildi, `hesaplaSkorKirilimi`/`hesaplaSkor`, [stateManager.ts](server/src/game/stateManager.ts); istemci aynası [client/src/skor.ts](client/src/skor.ts)): Eski çarpımsal `yaş×şöhret×servetFaktörü×amaçÇarpanı` formülü (yama #1) ahlak/mutluluk/rütbe'yi hiç kullanmıyordu ve tek bir zayıf eksen (ör. şöhret=0) skoru neredeyse sıfırlıyordu — gerçek liderlik tablosu verisiyle doğrulandı (top-15'in TAMAMI düşük-ahlaklı ama şöhret=100 karakterlerdi). Yeni model: her eksen **kendi puanını bağımsız üretir, hepsi TOPLANIR**, sonra tik'ler ve amaç çarpanı uygulanır — bu sayede oyuncuya ölüm ekranında **eksen eksen kırılım** gösterilebiliyor.
```
servet = para + gayrimenkulDegeriHesapla(state)   // istemcide gayrimenkul yok, servet≈nakit
servetPuanı   = servet>0 ? round(servet × (yaş/2)) : 0
şöhretPuanı   = round(şöhret(un) × 300)
ahlakPuanı    = round(ahlak × 200)
mutlulukPuanı = round(mutluluk × 100)
rütbePuanı    = [625, 1.500, 2.625, 4.000, 5.625][rutbe_seviye-1]   // S1..S5
tikPuanı      = 3.000 × (sarayda + yolculuk_tamamlandi + gizemli-eşya-sahipliği)  // TOPLAMSAL, çarpımsal değil

temelToplam = servetPuanı+şöhretPuanı+ahlakPuanı+mutlulukPuanı+rütbePuanı+tikPuanı
amaçÇarpanı = max(1, Σ tamamlanan hayat amacı bonusları)   // değişmedi, ×1..×5
skor = round(temelToplam × amaçÇarpanı)
```
900 ömürlük simülasyonda (`scripts/simulateKisilikler.ts`) medyan ~42-91k aralığında (sabitlere göre değişir), eski formüle göre çok daha erişilebilir (≥10.000 oranı %21→%96) ve top skorların ahlak dağılımı belirgin iyileşti. Ölüm ekranında `📊 Skorun Nasıl Hesaplandı?` bloğu (`App.tsx`, `.skor-kirilimi` CSS) her ekseni + tik'leri + amaç çarpanını ayrı ayrı gösterir.

## 14. Rütbe / Kariyer Sistemi (2026-08 reformu — 5 kademe)

Kaynak: [rutbeler.ts](server/src/data/rutbeler.ts). **Eski 3-kademeli, `para` eşikli, her tur sıfırdan hesaplanan (düşebilen) sistem tamamen değişti.** Yeni model:

**Tek monoton sayaç `kariyer_puani`** (CharacterState, asla azalmaz) rütbeyi belirler. Kaynakları ([rutbeler.ts](server/src/data/rutbeler.ts) sabitleri):
- `KARIYER_PUANI_YILLIK = 3` (2026-09'da 2 → 3; kaldırılan "kendi işine yatırım +8" kaynağının telafisi) → hayatta geçen her yıl (pasif kıdem; `sonucuUygulaVeIlerlet` yıl bloğunda `× yasArtisi`).
- `KARIYER_PUANI_KATEGORI_BASARI = 3` → mesleğine uygun kategoride (`MESLEK_KATEGORI`: Asker→savas, Tüccar→ticaret, Din Adamı→din, Zanaatkâr→zanaat) **başarılı** olunan her olay.
- Rakip hedefleyen karanlık iş başarısı → `+2..+6 kariyer_puani` (`kotuIsler.ts` `basarili.kariyer_puani`, §13).
- `SonucEtkisi.kariyer_puani_artis` → kilit taşı olaylar doğrudan puan verebilir (şu an kullanan olay yok, altyapı hazır).
- **`KARIYER_PUANI_YATIRIM` KALDIRILDI** — "kendi işine yatırım" özelliği tümüyle silindi (§13).

**5 kademe, meslek×çağ'a göre unvan** (eşikler çağdan bağımsız, sadece unvan metni değişir):

| Meslek | Unvanlar (Orta Çağ / Sanayi) | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| Asker | Er→Onbaşı→Silahşor→Kumandan→Serdar / Er→Onbaşı→Çavuş→Yüzbaşı→Binbaşı | kp 10, ün 20 | kp 24, ün 32 | kp 44, ün 42 | **kp 210, ün 72** |
| Tüccar | Çırak Tüccar→Seyyar Satıcı→Pazarcı→Lonca Ustası→Lonca Reisi / Kâtip Çırak→Tezgâhtar→Şirket Ortağı→Fabrika Patronu→Sanayi Baronu | kp 10, ün 10 | kp 24, ün 17 | kp 44, ün 25 | **kp 210, ün 50** |
| Din Adamı | Acemi Rahip→Rahip→Vaiz→Başrahip→Piskopos / Papaz Yrd.→Papaz→Vaiz→Başpapaz→Piskopos | kp 10, ahlak 44 | kp 24, ahlak 50 | kp 44, ahlak 58 | **kp 210, ahlak 78** |
| Zanaatkâr *(2026-09 sonu, 4. meslek)* | Çırak→Kalfa→Usta→Baş Usta→Loncabaşı / Amele→Vasıflı İşçi→Ustabaşı→Atölye Şefi→Fabrika Müdürü | kp 10, ün 8 | kp 24, ün 14 | kp 44, ün 20 | **kp 210, ün 42** |

*Sünni İslam din_kultur: `Medrese Talebesi→Müezzin→Vaiz→İmam→Baş İmam` (her iki çağ, eşikler aynı).*

Her kademe **hem** `kariyer_puani` **hem** mesleğe özgü statı ister (`esikKarsilaniyorMu`): Asker, Tüccar & Zanaatkâr **ün** (her kademede), Din Adamı **ahlak**. `para` koşulu KASITLI OLARAK YOK (sürekli harcanan nakde bağlı bir eşik sessiz rütbe kaybına yol açıyordu). S4→S5 sıçraması bilinçli olarak büyük (kp 44→**210**; 2026-09 ekonomi dengesinde 160'tan yükseltildi — ömürler ~20 yıl uzayınca S5 %2.4→%12.8'e fırlamıştı, 210 onu tekrar "nadir zirve"ye çekti). **S5 nadir bir zirvedir; 2026-09 simülasyonunda genel oran ~%0.4, Para-odaklı bot dolu ömürde ~%4, diğer kişilikler ≈%0** (bkz. §22 `simulateKisilikler`). Zanaatkâr'ın ün eşikleri Tüccar'dan biraz alçak tutuldu (esnaf itibarı, tüccarın "herkes tanır" şöhretinden daha mütevazı).

**Terfi cooldown'u** (`TERFI_COOLDOWN = {2:0, 3:2, 4:2, 5:8}`): bir sonraki kademeye çıkmak için son terfiden bu kadar oyun yılı geçmiş olmalı (`state.yil - state.son_terfi_yili >= cooldown`). `rutbeGuncelle` ayrıca **çağrı başına en fazla +1 kademe** ilerletir — üst üste terfi olmaz.

**RATCHET — rütbe ASLA DÜŞMEZ.** `kariyer_puani` (azalmaz zaten) veya ün/ahlak çökse bile `rutbe_seviye` korunur. `rutbeGuncelle` her tur çağrılır ama yalnız yukarı hareket eder. `terfiOldu` bayrağı + `🎖️` kutlama mesajı yalnız artışta üretilir.

**Maaş primi** (`RUTBE_MAAS_CARPANI`, BİLEŞİK: `RUTBE_MAAS_ARTIS_ORANLARI = [0.15, 0.12, 0.12, 0.11, 0.10]` kademe artışları — S2 = S1 ×1.15, S3 = S2 ×1.12, S4 = S3 ×1.12, S5 = S4 ×1.11; sonuç `[1.0, 1.15, 1.29, 1.44, 1.60]` S1..S5: her kademe bir öncekinin üstüne biner, baz maaşa göre ayrı bir +%X değil. `hesaplaMaasYillik` çarpımına `rutbeMaasCarpani(rutbe_seviye)` olarak girer (ün, kıdem, şehir yönetimi, enflasyon çarpanlarıyla üst üste biner).

**Astlar:** seviye N'de `N-1` ast (S5'te 4), kendinden düşük unvanları taşırlar, isimleri sabit; liste asla küçülmez. **Amir:** bir üst kademeden; **seviye 5'te amir yoktur** (`amir_adi=null`, hükümdar en tepede).

**Client:** İşin & Yatırımların ekranında ([IsYatirimEkrani.tsx](client/src/components/IsYatirimEkrani.tsx)) kademe göstergesi 5 nokta + "Rütbe nasıl yükselir?" ipucu kutusu (`.rutbe-ipucu`): "ününü/ahlakını yüksek tut + mesleğinde başarılı ol + zamanla kıdem". Geriye dönük uyum: `eskiKayitGocu` (stateManager) eski DB kayıtlarına `kariyer_puani` (≈ `tur_sayisi*3 + eski_kendi_isi_yatirim_sayisi*8`), `son_terfi_yili` (`baslangic_yili`), `mulkler` (→ `[]`), `baslangic_yili` (→ `yil`), `mulk_bakim_kalan` (sahip olunan her mülke rastgele 7-10 yıl) ve `mulk_alis_yili` (→ `{}`, bilinmiyor sayılır — §11 kural 14) backfill eder — mülk/enflasyon alanları Finans ekranında doğrudan `.length`/aritmetik/anahtar erişimiyle kullanıldığı için; `gameEngine.oturumGetir`/`oturumlariYukle` çağırır.

**Testler:** [rutbe.test.ts](server/tests/rutbe.test.ts) (pür fonksiyon) + [scripts/verifyRutbe.ts](server/scripts/verifyRutbe.ts) (motor entegrasyonu, `npm test` PostgreSQL geçişinde kırık olduğu için bağımsız `npx tsx` doğrulaması).

## 15. Şehir Yönetimi (Post-Max-Rank İlerleme)

`rutbe_seviye>=4` olunca (§11 kural 4, 2026-08 reformuyla eski `>=3`'ten yükseltildi — 5 kademeli merdivende S4 "başarılı kariyer" eşiğidir) açılan, **üst sınırı olmayan** ikinci eksen. `sehir_yonetim_seviyesi` sadece `sehir_yonetim_artis` etkisiyle artar (belirli olaylardan). Unvan tablosu (4 isimli kademe, sonrası sayısal):

| Meslek | Kademe 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|
| Asker | Bölge Komutanı | Ordu Generali | Savaş Konseyi Üyesi | Krallığın Kalkanı | "Krallığın Kalkanı (Seviye N)" |
| Tüccar | Ticaret Baronu | Lonca Reisi | Şehrin Hazine Nazırı | Ticaret İmparatoru | "Ticaret İmparatoru (Seviye N)" |
| Din Adamı | Piskopos Vekili | Baş Piskopos | Kutsal Meclis Üyesi | Ruhani Önder | "Ruhani Önder (Seviye N)" |
| Zanaatkâr | Zanaat Şurası Üyesi | Loncalar Birliği Başkanı | Şehrin Baş Mimarı | Sanayi Piri | "Sanayi Piri (Seviye N)" |

Zanaatkâr'ın giriş-zorlama olayı (`sehir_yonetim_zanaatkar_baslangic`, `genel.ts`) 2026-09 sonunda eklendi — `gameEngine.ts`'teki `if` zincirine bir `"Zanaatkâr"` kolu bağlandı, artık diğer 3 meslekle tam simetrik (§11 kural 4).

**Maaş etkisi:** Şehir yönetimine **bir kez girmek** maaşa kalıcı, **SABİT +%3** katar (`sehirYonetimMaasCarpani = seviye>=1 ? 1.03 : 1`). Eskiden `1 + seviye*0.08` (tavansız, seviyeyle büyüyen), sonra sabit +%8 idi; artık +%3 ve seviye/unvan **yalnız prestij içindir**, maaşa ek katkısı yoktur.

## 16. Statik İçerik Katalogları

### Çağ / Bölge / Din / Para Birimi
| Çağ | Yıl Aralığı | Bölgeler (din_kultur → para_birimi) |
|---|---|---|
| Orta Çağ | 1050-1260 | Fransa (Katolik→Livre), Kutsal Roma (Katolik→Mark), Bizans (Ortodoks→Hiperpiron), Selçuklu (Sünni İslam→Dirhem) — *Eyyubiler 2026-09'da `BOLGELER_BY_CAG`'dan çıkarıldı; din_kültür/para_birimi/olay verisi eski kayıt uyumu için `stateManager.ts`'te duruyor* |
| Sanayi Devrimi | 1800-1870 | İngiltere (Anglikan→Sterlin), Fransa (Katolik→Frank), Osmanlı (Sünni İslam→Kuruş), Rusya (Ortodoks→Ruble) |

Hükümdar/lider verisi [liderler.ts](server/src/data/liderler.ts) (yıl aralığına göre gerçek tarihe esinli isimler), tarihi savaş pencereleri [tarihiSavaslar.ts](server/src/data/tarihiSavaslar.ts) (§11 kural 1'i besler + piyasa dedikodusunda gerçek bir "gelecek savaş" öngörüsü verir, `gelecekSavasKontrol`, ufuk 8 yıl) — bu iki dosya salt flavor/lookup verisi, gerekmedikçe okumaya gerek yok.

### Yerleşim (`YERLESIMLER`, [yerlesimler.ts](server/src/data/yerlesimler.ts)) — **seçim ekranı 2026-09'da kaldırıldı, eski 3 yerleşim de aynı turda TAMAMEN silindi**
Tek giriş kalıcı olarak **`kasaba`** (ad "Kasaba"): hiçbir sağlık/para/maaş/yatkınlık etkisi YOK, `yasamMaliyetCarpani: 1`, etiket `yerlesim:kasaba`. `bolgeSecildi` (client) doğrudan `isim_sec`'e geçer, `secilenYerlesim='kasaba'`. `yerlesim_sec` ekranı + `AdimGostergesi` "4 adım" → **3 adım** (Çağ · Bölge · İsim). Eski "Şehir Merkezi"/"Sınır Bölgesi"/"Dağ Başı" yerleşimleri (ve ilgili stat/maaş/yatkınlık etkileri, katalog çevirileri) 2026-09 sonunda kod tabanından tamamen kaldırıldı — `createCharacter` artık `"sehir_merkezi"`/`"sinir_bolgesi"`/`"dag_basi"` gibi eski id'lerle çağrılırsa `"Geçersiz yerleşim."` fırlatır (testler/scriptler `"kasaba"`'ya güncellendi). [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts)'teki kaçış olayının eskiden kullandığı `yerlesim_zorla: "dag_basi"` etkisi de kaldırıldı — "dağa kaçtın" anlatısı zaten `kacak` etiketiyle (§17) taşınıyor. **Eski canlı oturumlar (Session.data'da hâlâ `yerlesim:"Şehir Merkezi"` vb. taşıyanlar) kırılmaz** — `yerlesimIdByAd` eşleşme bulamayınca sessizce `YERLESIMLER[0]` (`kasaba`) id'sine düşer; sadece o oturumların yaşam maliyeti çarpanı o andan sonra nötrleşir, hiçbir hata/kayıp oluşmaz.

### Aile Mesleği (28 tip, doğuşta EŞİT ağırlıkla rastgele seçilir)
Kaynak: [aileler.ts](server/src/data/aileler.ts). Her satır: para/sağlık/ün/ahlak/**mutluluk** başlangıç bonusu + yatkınlık etkisi. `devamMeslegi` varsa, oyuncu o mesleği seçerse "aile mirası sürdürüldü" bonusu (+10un, +15para, ×1.15 kalıcı maaş) alır. **2026-09 birinci denge turu:** tüm `agirlik` değerleri `1`'e eşitlendi (eskiden 0.6-1.5 arası değişen ağırlıklarla bazı aileler diğerlerinden sık/nadir çıkıyordu); aynı turda çağa özel **6 yeni aile** (3 Orta Çağ, 3 Sanayi Devrimi) + **4 komik/absürt aile** (her iki çağda da çıkabilir) eklendi (18→28), ardından **var olan 6 aile** de (kole/zanaatkar/hekim → Orta Çağ, madenci/denizci/katip → Sanayi Devrimi) çağa özel hale getirildi. **2026-09 ikinci denge turu (kullanıcı isteği):** tüm 28 ailenin para/sağlık/ün/ahlak değerleri ortak, dar bantlara sıkıştırılarak yeniden planlandı (para/ün/ahlak ~±20, sağlık ~±16 — eskiden bazı aileler +80/-25 gibi aşırı uçlardaydı, bazıları neredeyse etkisizdi) ve `AileTanimi`'ye yeni bir `mutluluk` alanı eklenerek **HER aile artık mutluluğu da ~±10-12 bandında etkiler** (eskiden hiçbiri etkilemiyordu). Buna paralel `createCharacter`'daki tabanlar da değişti: sağlık 100→**80**, ahlak 50→**45**, para tabanı 12→**10** (sonuç aralığı 35→**40** tavana, taban yine **5**'te — bkz. yukarısı).

| id | Çağ kısıtı | Devam Mesleği | para | sağlık | ün | ahlak | mutluluk |
|---|---|---|---|---|---|---|---|
| ciftci | – | – | -15 | +12 | -8 | +8 | +6 |
| asker | – | Asker | +5 | +10 | +10 | -12 | -4 |
| kole | Orta Çağ | – | -20 | -8 | -18 | +18 | -10 |
| soylu | – | – | +20 | -5 | +20 | -20 | -8 |
| sanatci | – | – | -14 | -3 | +14 | +5 | +8 |
| fabrika_iscisi | Sanayi | – | -12 | -14 | -6 | +14 | -6 |
| tuccar | – | Tüccar | +20 | -4 | +12 | -14 | +4 |
| din_adami | – | Din Adamı | -10 | -3 | +14 | +20 | +6 |
| zanaatkar | Orta Çağ | Zanaatkâr *(2026-09 sonu)* | +12 | +8 | -8 | +6 | +4 |
| hekim | Orta Çağ | – | -14 | +14 | +8 | +6 | -2 |
| denizci | Sanayi | – | +12 | +10 | -4 | -14 | -2 |
| madenci | Sanayi | – | +18 | -16 | -6 | +10 | -8 |
| kacakci | – | – | +18 | +4 | -18 | -16 | -6 |
| tefeci | – | – | +20 | -2 | -16 | -20 | -10 |
| katip | Sanayi | – | -10 | -10 | +14 | +12 | -4 |
| cellat | – | – | +14 | +6 | -20 | -14 | -10 |
| saray_hizmetkari | – | – | +6 | -4 | +14 | -10 | -2 |
| surgun | – | – | -12 | +6 | -18 | +14 | -8 |
| sovalye | Orta Çağ | Asker | +10 | +6 | +20 | +10 | -4 |
| haci | Orta Çağ | – | -12 | -4 | +6 | +14 | +6 |
| soytari *(komik)* | Orta Çağ | – | -14 | +4 | -6 | +6 | +10 |
| muhendis | Sanayi | Zanaatkâr *(2026-09 sonu)* | +16 | -6 | +8 | +6 | +2 |
| gazeteci | Sanayi | – | -12 | -4 | +20 | +8 | +2 |
| sirk_ailesi *(komik)* | Sanayi | – | -16 | +12 | +12 | -6 | +10 |
| define_avcisi *(komik)* | – | – | -18 | -4 | -8 | +4 | +6 |
| falci *(komik)* | – | – | -10 | +4 | -4 | -6 | +4 |
| kumarbaz *(komik)* | – | – | -16 | +4 | -10 | -12 | -6 |
| tavuk_hirsizi *(komik)* | – | – | +8 | +4 | -14 | -8 | +6 |

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

### Konut (6 kademe, `konut_id`, turu tüketmeden değiştirilebilir) — 2026-09 ekonomi dengesi + ekonomi sıkılaştırma turu
| id (varsayılan→**normal_ev**) | Kira/yıl | Sağlık/yıl | Mutluluk/yıl | Ün/yıl |
|---|---|---|---|---|
| basit_barinak | 1 | **-2** | **-2** | **-2** |
| ahsap_ev | 3 | **-1** | **+1** | **-1** |
| normal_ev *(varsayılan)* | 5 | – | +1 | – |
| tas_ev | 10 | +1 | +1 | +2 |
| konak | 19 | +2 | +2 | +4 |
| sato | 32 | +3 | +4 | +6 |

Taşınma ücreti (sadece daha pahalıya geçişte): **3**. `normal_ev` bilinçli olarak nötr (varsayılan) bırakıldı; `ahsap_ev` ekonomi sıkılaştırma turunda tek-yönlü kötüden gerçek bir **takasa** çevrildi (ucuz + mutlu ama sağlık/statüden ödün ver) — "hangisini seçsem?" gerçek bir karar olsun diye (kullanıcı isteği).

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

**Başlangıç statları** (`createCharacter`, aile/yerleşim bonusları ayrıca eklenir — **2026-09 ikinci denge turu**, kullanıcı isteği): mutluluk **50** + aile etkisi (yeni: her aile artık mutluluğu da ~±12 bandında etkiler, eskiden hiçbiri etkilemiyordu), ahlak **45** (eski 50) + aile etkisi (~±20 bandı, eski uçlar +25/-30'du), şöhret(un) **20** + aile etkisi (~±20 bandı, eski uçlar +40/-25'ti), sağlık **80** (eski 100) + aile etkisi (~±16 bandı) + yerleşim etkisi, para **`max(5, min(40, 10 + aile.para + yerlesim.para))`** (eski taban 12/tavan 35; aile etkisi artık ~±20 bandı, eski uçlar +80/-25'ti). Tüm aile etkileri artık ortak, dar bantlarda tutuluyor (§16) — hiçbir aile aşırı uçta durmuyor ama hiçbiri de etkisiz kalmıyor.

### Piyasa Mülkleri (6 tür, her türden en fazla 1, taban maliyet enflasyonla ölçeklenir)
**Gelir/gider dengesi turu (2026-09, kullanıcı isteği "giriş fiyatlarının makasını genişlet, en düşük 50'de kalsın"):** Küçük Tarla ve Buğday Tarlası sabit kaldı, üst kademe mülkler yukarı çekildi (makas 150'den 270'e çıktı).
| tur | Ad | Taban Maliyet | Avantajlı | Dezavantajlı |
|---|---|---|---|---|
| kucuk_tarla | Küçük Tarla | 50 | İyi ekonomi | Kıtlık (çok küçük kayıp — "en garanti" mülk) |
| ciftlik | Buğday Tarlası | 80 | İyi ekonomi | Kıtlık |
| demirci | Demirci Atölyesi | 130 (eski 100) | Savaş/isyan | Uzun barış |
| han | Şehir Hanı | 170 (eski 120) | Nüfus artışı+barış | Veba/savaş |
| kervan | Ticaret Kervanı | 220 (eski 150) | Barış+bolluk | Savaş (batma riski) |
| karaborsa | Karaborsa Deposu | 320 (eski 200) | Kıtlık/veba/savaş | Barış/bolluk |

Tam getiri formülleri §13'te. Her tür ayrıca kendi [mulkOlaylari.ts](server/src/data/olaylar/mulkOlaylari.ts) flavor/karar olay havuzuna sahip (§13, §11'e benzer bir kaskad kuralıyla tetiklenir).

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

### Hizipler (3 meslek çifti — Zanaatkâr'ın hizbi yok, §11 kural 3 ile ZORUNLU girilir)
| Meslek | Seçenek A | Seçenek B |
|---|---|---|
| Asker | Eski Muhafızlar | Yeni Nizam |
| Tüccar | Liman Loncası | Pazar Birliği |
| Din Adamı | Gelenekçiler | Yenilikçiler |

Giriş olayları (`hizip_asker_saflasma`/`hizip_tuccar_saflasma`/`hizip_din_saflasma`, `genel.ts`) `hizip_ata` etkisiyle atar. **2026-09'a kadar tamamen şansa bırakılmıştı** (yalnız `genel.ts`'in normal ağırlıklı havuzunda düşük öncelikle çıkabiliyordu) ve her üçünün de "tarafsız kal / taraf seçme" adında `hizip_ata` set etmeyen bir üçüncü kaçış şıkkı vardı. **2026-09'da (kullanıcı isteği) ikisi de değişti:** §11 kural 3, `rutbe_seviye>=2`'ye (S2) ulaşan ve henüz hizip seçmemiş karakteri zorla bu olaya sokuyor; üç olayın da üçüncü ("tarafsız") şıkkı tamamen kaldırıldı — artık iki hizip seçeneğinden **biri kesinlikle** seçilmek zorunda, hizip'siz kalmak mümkün değil.

### Kariyer Yolları (§11 kural 2 ile girilir — 2026-09'dan beri **8 çağ×meslek kombinasyonunun hepsinde** var (4. meslek Zanaatkâr eklenince 6→8), eskiden sadece Orta Çağ Asker/Din Adamı'ydı)

Mekanik: giriş olayının seçenekleri, hem `basariliSonuc` hem `basarisizSonuc`'ta doğrudan kalıcı bir `yol:<meslek>:<dal>` etiketi ekler (Orta Çağ Asker/Din Adamı'daki gibi ayrı bir "eğilim → ikinci olay → kesin kilit" iki-adımlı zincir değil, tek adımda kilitlenir). Kilitlenen etiket bir daha değişmez; o dala özel olaylar `gerekliEtiketler:["yol:<meslek>:<dal>"]` taşıdığı için karşı dalların içeriği otomatik kapalı kalır. Aynı meslek farklı çağlarda aynı `yol:<meslek>:` önekini paylaşabilir (ör. hem Orta Çağ hem Sanayi Devrimi Asker'i `yol:asker:`) — çakışma yoktur çünkü her olay `cag` filtresi taşır.

- **Orta Çağ Asker** (`yol:asker:*`): sadik, isyanci, kahraman, firari, hain — [ortaCagAskerYollari.ts](server/src/data/olaylar/ortaCagAskerYollari.ts) (5723 satır, 105 olay). Giriş: `oc_asker_yol_ilk_emir`.
- **Orta Çağ Din Adamı** (`yol:din:*`): durust, fanatik, tarikat, yozlasmis — [ortaCagDinAdamiYollari.ts](server/src/data/olaylar/ortaCagDinAdamiYollari.ts) (4546 satır, 85 olay). Giriş: `oc_din_yol_ilk_sinav`.
- **Orta Çağ Tüccar** *(2026-09 yeni)* (`yol:tuccar:*`): durust, acgozlu, kacakci, hayirsever — [ortaCagTuccarYollari.ts](server/src/data/olaylar/ortaCagTuccarYollari.ts) (45 olay: 1 giriş + 44 dal havuzu, 11/dal). Giriş: `oc_tuccar_yol_ilk_anlasma`.
- **Sanayi Devrimi Asker** *(2026-09 yeni)* (`yol:asker:*`): sadik, reformcu, zalim, firari — [sanayiAskerYollari.ts](server/src/data/olaylar/sanayiAskerYollari.ts) (45 olay). Giriş: `sd_asker_yol_ilk_gorev`.
- **Sanayi Devrimi Tüccar** *(2026-09 yeni)* (`yol:tuccar:*`): adil, somurucu, spekulator, hayirsever — [sanayiTuccarYollari.ts](server/src/data/olaylar/sanayiTuccarYollari.ts) (45 olay). Giriş: `sd_tuccar_yol_ilk_karar`.
- **Sanayi Devrimi Din Adamı** *(2026-09 yeni)* (`yol:din:*`): durust, fanatik, sosyal, yozlasmis — [sanayiDinAdamiYollari.ts](server/src/data/olaylar/sanayiDinAdamiYollari.ts) (45 olay). Giriş: `sd_din_yol_ilk_vaaz`.
- **Orta Çağ Zanaatkâr** *(2026-09 sonu yeni — 4. meslek)* (`yol:zanaatkar:*`): lonca_sadik, yenilikci, hileci, sanatkar — [ortaCagZanaatkarYollari.ts](server/src/data/olaylar/ortaCagZanaatkarYollari.ts) (45 olay). Giriş: `oc_zanaatkar_yol_ilk_siparis`.
- **Sanayi Devrimi Zanaatkâr** *(2026-09 sonu yeni — 4. meslek)* (`yol:zanaatkar:*`): makineci, gelenekci, sendikaci, girisimci — [sanayiZanaatkarYollari.ts](server/src/data/olaylar/sanayiZanaatkarYollari.ts) (45 olay). Giriş: `sd_zanaatkar_yol_ilk_makine`.

Bu dosyalar (özellikle ilk ikisi) devasa dallanan havuzlardır — belirli bir dalın içeriği gerekmedikçe okuma, `grep "yol:asker:kahraman"` gibi hedefli ara. Giriş olayının kendisi `gameEngine.ts`'teki `YOL_SISTEMLERI` tablosunda kayıtlıdır (§11 kural 2); yeni bir çağ×meslek kombinasyonu eklenecekse hem yeni dosya+giriş olayı hem de bu tabloya bir satır gerekir.

### Evlilik Yolları (`evlilik_yolu:*`)
`ask` (aşk evliliği), `mantik_soylu` (statü/asalet güdümlü), `mantik_ticari` (çıkar/ticaret güdümlü) — evlilik teklifi olayındaki seçime göre atanır, sonraki evlilik olaylarının tonunu belirler.

**Olay dışı evlenme (ekonomi sıkılaştırma turu):** Yukarıdaki olay-tabanlı akışın yanına, oyuncunun kendi adayını seçip evlenebileceği bağımsız bir akış eklendi — `GET /:id/evlilik-adaylari` + `POST /:id/evlilik-teklifi` (§3), `gameEngine.ts` `evlilikAdaylariGetir`/`evlilikTeklifEt`. 18+ yaş, bekar (`medeni:evli` yok), `hapiste`/`yolculukta` değilken kullanılabilir; her `GET` çağrısı `rastgeleEvlilikAdayiUret` ile 2 rastgele aday üretir (`{isim, meslek, rutbe, kisilik:[string,string], uyumYuzdesi}`, hiçbir yerde saklanmaz — istemci seçtiği adayı `POST`'a olduğu gibi geri gönderir). `uyumYuzdesi` (`evlilikUyumHesapla`) taban `45-74` + oyuncuyla paylaşılan her kişilik özelliği için `+12`, çelişen özellik için `-15` (kaba bir sezgisel, `KISILIKLER.celisenler`'i kullanır). Teklif başarı şansı `uyum + (mutluluk-50)/5 + (un-20)/10` (zar atılır); kabul edilirse `es_adi/es_meslek/es_rutbe` seçilen adaydan atanır, `es_puani = 55 + uyum/5`, `medeni:evli` eklenir; reddedilirse hiçbir state değişikliği olmaz, tekrar denenebilir. **Turu tüketmez.** İstemci: [EvlilikPaneli.tsx](client/src/components/EvlilikPaneli.tsx), sol panelde (bekarken) "💍 Evlilik" butonuyla açılır. Mevcut olay-tabanlı teklifler (`iliski_evlilik_teklifi` vb.) değişmedi — bu, "olay harici de evlenebilelim, iki kişi arasında seçim yapalım" isteğine cevaben eklenen **ayrı, tamamlayıcı** bir akıştır.

### Evlilik & Aile Olay Havuzları — `iliskiler.ts` / `aile.ts` / `evlilikVeAile.ts` farkı

Üçü de §11 kural 16'nın (standalone havuz garantisi) kapsadığı havuzlar ama farklı işler görüyorlar:

- **`iliskiler.ts` (24 olay)** — **meslekten/medeni durumdan bağımsız, genel** dost/rakip/eş ilişki havuzu. Evli olsun olmasın herkese açık: dost/rakip ile kavga-dedikodu-teklif-ihanet olayları, `tepki_*` (onTepki'li ara-ekran) versiyonları, eşle ev-içi kavga/gizli sır/boşanma eşiği gibi tekil (dallanmayan) eş olayları, ve tam ayrı bir **bekarlık** alt kümesi (`bekarlik_*` — bekarlığın özgürlüğü, aile baskısı, yalnız yaşlanma korkusu vb., yalnız `medeni:evli` YOKKEN uygun). Kısacası: "kiminle nasıl geçiniyorsun" — ilişki puanlarına (`dost_puani`/`rakip_puani`/`es_puani`) dokunan, ama evliliğin kendi iç dinamiğine derinlemesine girmeyen genel havuz.
- **`aile.ts` (38 olay)** — iki ayrı temayı birleştirir: (1) **çocuk büyüme çizgisi** (çocuğun hastalığı, suçüstü yakalanması, evliliği, meslek seçimi, torun ziyareti — `cocuk_*`) + genel aile ikilemleri (miras kavgası, yaşlı ebeveyn bakımı, kardeşin kumar borcu); (2) **`aile_meslegi` kökenine bağlı geriye dönük olaylar** (`aile_koken_*`, `aile_asker_yoldas`, `aile_kacakci_teklif` vb.) — doğuşta atanan 28 aile mesleğinden hangisine sahipsen (soylu/köle/tefeci/kaçakçı/cellat/madenci...) o geçmişin seni bulduğu olaylar. Evlilik teklifinin giriş olayı (`iliski_evlilik_teklifi`, §11 kural 4) de teknik olarak bu dosyada yaşıyor. Kısacası: "nereden geldin, çocukların nasıl büyüyor" — kökene ve ebeveynliğe odaklı.
- **`evlilikVeAile.ts` (78 olay, üçünün en büyüğü)** — **yalnızca evli** (`medeni:evli`) karaktere açılan, evliliğin kendi iç dinamiğine odaklı en derin havuz. Üç katmanı var: (a) **`evlilik_yolu`'na göre dallanan** ~45 olay (`evl_ms_*` = mantik_soylu, `evl_mt_*` = mantik_ticari, `evl_ask_*` = aşk evliliği — her dal yalnız kendi `evlilik_yolu` etiketini taşıyan karaktere açık, kıskançlık/para kaçırma/kayınvalide baskısı/boşanma riski gibi aynı temaları evlilik motivasyonuna göre farklı tonda işler); giriş olayı `evlilik_uc_yol_karari` bu etiketi atar. (b) **`aile2_*`** (~20 olay) — daha ağır/nadir dramatik ikilemler (evlatlık verme, üvey evlat ayrımı, kardeş miras davası, çocuğu tehlikeli bir yolculuğa gönderme vb.), evlilik yolundan bağımsız. (c) Aile ekranını (§33) tamamlayan **12 detaylı çok-şıklı olay** (`evl_kiskanclik`...`aile_tatil_karari`) — hem burada hem Aile ekranı kartı olarak "ikisi birden" gelir (kullanıcı isteği). Kısacası: "evliliğin nasıl gidiyor" — yalnız evli karakterlere, evlilik motivasyonuna göre kişiselleşmiş en yoğun havuz.

(Havuz büyüklükleri bu bölümün geri kalanındaki §7 tablosuyla senkron tutulmalı — bu üçü zaman içinde büyüdü, ör. `evlilikVeAile.ts` §33'ün 12 olayı + `aile2_*` bloğuyla 66'dan 78'e çıktı.)

### İsim Havuzları
[npcIsimleri.ts](server/src/data/npcIsimleri.ts) — 8 bölge için kültüre uygun erkek/kadın isim listeleri (bölge başına ~30 erkek + ~12 kadın; 2026-09'da genişletildi) + çağa göre genel yedek havuz. Dost/rakip/amir/ast isimleri cinsiyet gözetmeden tüm havuzdan; anne/baba cinsiyete uygun havuzdan seçilir. **Eş ve tüm evlilik adayları** (olay-tabanlı `es_ata` + olay-dışı `rastgeleEvlilikAdayiUret`/`evlilikTeklifEt`) oyuncu erkek olduğu için **kadın** havuzundan (`rastgeleCinsiyetliIsimSec(cag,bolge,"kadin",...)`). **Oyuncu karakteri şu an yalnız erkek**, bu yüzden isim önerisi `rastgeleOyuncuIsmiSec` → `rastgeleCinsiyetliIsimSec(...,"erkek")` ile **sadece erkek havuzundan** gelir (`isimOnerisiGetir`, gameEngine). İstemci `isim_sec` ekranı açılınca (`yerlesimSecildi` → `rastgeleIsimGetir`) `GET /isim-onerisi` ile bölge/çağa uygun rastgele bir erkek isim çekip metin kutusuna **ön-doldurur** — oyuncu beğenmezse silip yazabilir ya da "🎲 Rastgele İsim" ile yeniden çekebilir. Erkek/kadın beklenti listeleri [astVeAile.test.ts](server/tests/astVeAile.test.ts)'te birebir kopyalıdır; havuz değişirse test de güncellenmeli.

## 17. Hapis, Yolculuk & Aranma Kademesi Alt Sistemleri

Üçü de benzer bir mekanik kalıp kullanır: bir etiket (veya sayısal eşik) normal olay havuzunu **tamamen kapatıp** kendi özel havuzuna geçirir (§12 `uygunMu`).

**Hapis:** `suc_seviyesi>=45` gated tutuklama olayları ([hapis.ts](server/src/data/olaylar/hapis.ts) `minSucSeviyesi:45`) VE birçok sıradan olayın başarısız sonucundan (`etiket_ekle:["hapiste"]`, ör. `aile.ts`, `hapis.ts` içindeki riskli seçimler) girilir. Bu eşik 2026-09 yeniden düzenlemesindeki "Kademe 1 - Yakalanma" bandının (25-50) içinde kalır — bilinçli olarak dokunulmadı, tutarlı: o banda giren biri zaten rastgele otomatik tutuklanma riskiyle karşılaşabilir. İçerideyken sadece `hapisOlayi:true` (46 olay) gösterilir: kaçış girişimleri, rüşvet, af dilekçesi vb. — başarılı seçim `etiket_sil:["hapiste"]` ile çıkarır, başarısız olan içeride tutar (bazıları ek sağlık/ün cezası verir).

**Ceza yılı sayacı (`hapis_ceza_kalan` + `hapis_ceza_toplam`, 2026-09 yeniden düzenleme):** "hapiste" etiketi *yeni* eklendiğinde (`sonucuUygulaVeIlerlet`'te `etiket_ekle` işlenirken, ya da `kotuIsYap`'ın kendi yakalanma dalında) tutuklanma anındaki `suc_seviyesi`'ye göre `hapisCezaSuresiHesapla` (gameEngine.ts) tek bir aralıktan rastgele bir ceza üretir — hangi olay/yol tutukladığından bağımsız: **0-25→2-4y · 25-50→4-7y · 50-75→7-9y · 75-100→9-12y**. Bu değer hem `hapis_ceza_kalan`'a (geri sayan) hem `hapis_ceza_toplam`'a (sabit, tahliyeye kadar değişmez) yazılır. Her turda `hapis_ceza_kalan` geçen yıl kadar erir; **0'a inince karakter otomatik serbest kalır** (her iki sayaç da sıfırlanır, "hapiste" silinir, hayat-hikayesine "Cezasını tamamlayıp serbest kaldı" + `zamanAnlatimi`'ye çıkış cümlesi). Her hapis turunda `zamanAnlatimi` "tahliyene ~N yıl kaldı" satırı ekler; istemcide `GorevEkrani`'nin ⛓️ rozeti "· ~N yıl kaldı" gösterir. Bir olay seçimiyle (rüşvet/af/başarılı kaçış → `etiket_sil:["hapiste"]`) çıkılırsa iki sayaç da sıfırlanır. Üst üste tutuklanmada mevcut ceza korunur (sayaç zaten > 0 ise dokunulmaz). `hapis_ceza_artis` (riskli kaçış başarısızlığı) her iki sayaca birden eklenir. **"Aynı turda serbest kalma" düzeltmesi:** minimum ceza (2y, temiz bandda) turdaki maksimum yıl ilerlemesiyle (2y) eşit olabildiği için, tutuklanmanın olduğu TUR içinde doğal erime hiç uygulanmaz (`hapisteYeniGirildiBuTur` bayrağı) — aksi halde kısa bir ceza, tutuklandığı turun `yasArtisi`'yle aynı anda 0'a inip karakter hiç hapis hissetmeden aynı seçimde serbest kalabiliyordu. Ceza erimesi her zaman **bir sonraki** turdan başlar.

**Bug düzeltmesi (2026-09-19, `sonucuUygulaVeIlerlet`):** Büyük baskın olaylarının (`aranma_baskin_ortacag`/`aranma_baskin_sanayi`, "Teslim ol" dalı) aynı `SonucEtkisi` içinde hem `etiket_ekle:["hapiste"]` hem `suc_seviyesi_ayarla:10` (temize çekme) veriyor. Eski kodda `suc_seviyesi_ayarla` state'e cezadan ÖNCE yazılıyordu, `hapisCezaSuresiHesapla` de o anki `state.suc_seviyesi`'ni okuyordu — yani 75-100 bandından (9-12y gerekirken) tutuklanan biri, kendi suç seviyesi 10'a resetlendikten SONRA hesaplanan cezayla 2-4y (temiz bant) alıyordu. Düzeltme: `suc_artis` uygulandıktan hemen sonra, `suc_seviyesi_ayarla` işlenmeden ÖNCE gerçek suç seviyesi bir değişkende (`sucSeviyesiTutuklanmaAni`) yakalanıyor; `hapisCezaSuresiHesapla` artık `state.suc_seviyesi` yerine bunu kullanıyor. `sosyallesmeOlayCoz`'daki paralel kod bloğuna dokunulmadı (sosyalleşme olayları hiç `hapiste` tetiklemiyor, §25).

**Ağır bantta erken çıkışı kısıtlama (`hapisErkenCikisMumkunMu`, stateManager.ts):** `hapis_ceza_toplam ≥ 7` (yani tutuklanma 50+ aranma bandından geldiyse) iken, `OlayTanimi.hapisParaylaCikisOlayi:true` işaretli olaylar (rüşvet zinciri: `hapis_rusvet_girisimi`, `hapis_rusvet_muhbir_bulma`→...→`hapis_rusvet_uygulama`; iyi hal/af zinciri: `hapis_iyi_hal_karar`→`hapis_iyi_hal_degerlendirme`) `hapis_ceza_toplam - hapis_ceza_kalan` (yıl yatılan) **en az 5**'e ulaşana kadar `olaySec` havuzunda **hiç görünmez** — "en az 5 yıl yatmadan para/af ile çıkamazsın" kuralı. Fiziksel kaçış girişimleri (`hapis_kacis_girisimi`, tünel zinciri, bayıltma zinciri, `hapis_avlu_duvari`/`hapis_camasir_arabasi`/`hapis_sayim_karisikligi`) bu kısıtlamadan **muaftır** — her zaman denenebilir, riskli ama garantisiz bir alternatif olarak kalır. Hafif bantlardan (`hapis_ceza_toplam < 7`) gelen tutuklamalarda bu kısıtlama hiç devreye girmez, para/af yolu eskisi gibi anında açık.

**Parasız riskli kaçış olayları (`hapis_avlu_duvari`/`hapis_camasir_arabasi`/`hapis_sayim_karisikligi`):** Rüşvet olaylarının aksine `maliyet` yok — her ömür denenebilir. Riskli seçenek `baseBasariSansi` 30-38; başarıda `etiket_sil:["hapiste"]` + ün, başarısızlıkta ağır `saglik` kaybı + küçük `olum_sansi` (4-8) + **`SonucEtkisi.hapis_ceza_artis` (+2..+4 yıl)** ile ceza uzar. Güvenli "vazgeç" seçeneği ceza süresine dokunmaz.

**Kaçış/erken-tahliye stratejilerini geciktirme (2026-09, Faz 8 — kullanıcı: "hapse düşünce ilk 2 olay hapishane içi olsun, kaçış fikri sonra gelsin; kısa cezalıda kaçış zincirine zaman yok"):** Yeni `OlayTanimi.hapisKacisBaslangici?: boolean` alanı, bir stratejiyi **başlatan** 10 olayı işaretler: `hapis_kacis_girisimi`, `hapis_rusvet_girisimi`, `hapis_isyan_firsati`, `hapis_tunel_karar`, `hapis_rusvet_muhbir_bulma`, `hapis_bayiltma_plan`, `hapis_iyi_hal_karar`, `hapis_avlu_duvari`, `hapis_camasir_arabasi`, `hapis_sayim_karisikligi` (zincirlerin `zorunlu_sonraki` ile zorlanan DEVAM adımları işaretlenmez — zaten rastgele havuzdan çekilmiyorlar, bu filtreden hiç geçmezler). İki yeni `CharacterState` alanı bunu besliyor:
- `hapis_ceza_toplam: number` — "hapiste" yeni eklendiğinde `hapis_ceza_kalan` ile birlikte AYNI değere set edilir ve bir daha değişmez (kalan süre gibi geri saymaz); cezanın orijinal toplam uzunluğunu hatırlar.
- `hapis_tur_sayaci: number` — hapse her yeni girişte 0'a sıfırlanır, `mevcutOlay.hapisOlayi:true` olan her olay çözüldüğünde (tutuklanma anının kendisi hariç — o normal havuzdan gelir, `hapisOlayi` değildir) +1 artar.

`olaySecici.ts`'teki `temelUygunMu`, `hapiste`/`yolculukta`/`kacak` kilit kontrollerinin hemen ardına şu kuralı ekledi: `olay.hapisKacisBaslangici && (hapis_tur_sayaci < 2 || hapis_ceza_toplam < 5)` ise olay uygunsuz sayılır. Yani: (a) hapse yeni girildiğinde ilk **2** gerçek hapis olayı her zaman "hapishane hayatı" flavor'ı (dost edinme, gardiyan zulmü, hastalık vb. ~25 olaylık standalone havuz) olmak zorunda — kaçış fikri hiçbir zaman ilk anda gelmiyor; (b) toplam ceza **5 yıldan kısaysa** o hapis döneminde kaçış-başlangıç olayları HİÇ çıkmıyor (sayaç 2'yi geçse bile) — kısa cezada zaten kaçışa girecek zaman/gerekçe yok, sadece cezanı çek. Ceza formülü kendisi değişmedi (taban 3-6 + kademe 0-3 = 3-9 yıl); kısa uçtaki karakterler artık sadece kaçış seçeneği görmeden, sessizce cezalarını tamamlayıp `hapis_cezasi_doldu`/otomatik tahliyeyle çıkıyor. Test: [tests/hapishane.test.ts](server/tests/hapishane.test.ts) "kaçış/erken-tahliye stratejilerini geciktirme (Faz 8)" bloğu. **Zincirlerin kendi iç dallanmasını çeşitlendirme (Faz 6/7'de yolculuklara yapılan `zorunlu_sonraki_havuzu` türü ikinci-alternatif ekleme) henüz uygulanmadı** — ayrı bir sonraki iş olarak planlandı.

**Yolculuk:** §11 kural 11 ile ömürde bir kez teklif edilir (mesleğe göre `uygunYolculukTeklifleri`: Asker Haçlı Seferi/Savunma Seferi/Sömürge Seferi, Tüccar Coğrafi Keşif/Mucit Turnesi/Sömürge Seferi, Din Adamı dinine göre Hac). Kabul edilirse `yolculukta` etiketlenir, sadece `yolculukOlayi:true` (87 olay, [yolculuk.ts](server/src/data/olaylar/yolculuk.ts)) gösterilir, **her adım tam 1 yıl** sürer (4-5 yıllık yolculukta 5-10 adım hedeflenir). Reddedilirse `yolculuk_teklifi_edildi` etiketiyle bir "durum" eklenir, birkaç tur sonra `bitince_etiket:"yolculuk_teklifi_zamani"` ile tekrar sorulur. Tamamlanınca `yolculukta` silinir + `yolculuk_tamamlandi` eklenir (kalıcı — ikinci bir yolculuk asla zorlanmaz, ama tekrar reddedilip kabul de edilemez zaten teklif gelmez). **Yolculuk kazanç zammı:** Eskiden yolculuğu bitiren karakter kalıcı bir `maas_carpani:1.2` primi alıyordu (22 kapanış dalında); bu **kaldırıldı**. Yerine: `yolculukOlayi:true` bir olayda kazanılan pozitif `para`, `sonucuUygulaVeIlerlet`'te motor kuralı olarak **×1.2** (`YOLCULUK_KAZANC_CARPANI`, `meslekMetrikCarpani`'nin hemen üstüne biner, `sucKazanciUygula`'dan önce) — yani zam yalnız yolculuk sürerken elde edilen paraya, kalıcı bir maaş etkisi bırakmadan uygulanır.

**Kritik mimari not (2026-09, "az olay var" turu):** Yolculuklar `olaySec`'in ağırlıklı havuzundan RASTGELE ÇEKİLMEZ — `zorunlu_sonraki` ile kodlanmış **sabit, doğrusal bir senaryo zinciridir** (karar → adım1 → adım2 → adım3 → varış/dönüş). Bu, aynı meslek+din+rota kombinasyonundaki **her karakterin, her hayatta birebir aynı olayları aynı sırayla gördüğü** anlamına geliyordu — 87 olaylık toplam havuza rağmen tek bir yolculuk çeşidi son derece dardı (ör. Hac'ın her din×rota kombinasyonunda tam **4** sabit olay). Faz 3 (Yol A) düzeltmesi, **tüm 6 yolculuk türünün** (Hac ×4 din, Haçlı Seferi, Sömürge Seferi, Savunma Seferi, Coğrafi Keşif, Mucit Turnesi) her rotasının pos1→pos2 bağlantısına bir alternatif olay ekledi (`*_2b` id'leri, toplam 18 olan zincirin her birine 1 tane = 18 yeni olay) ve o bağlantıyı `zorunlu_sonraki_havuzu: [orijinal, alternatif]`'e çevirdi. **Faz 4**, aynı yöntemi Hac'ın **8 rotasının** (4 din × kara/deniz) pos2→pos3 bağlantısına da uyguladı (`*_3b` id'leri, 8 yeni olay) — artık Hac zincirlerinde **iki ayrı noktada** %50 ihtimalle farklı bir sahne yaşanıyor. **Faz 5**, aynı ikinci dönemeci **kalan 5 yolculuk türüne** de ekledi (7 yeni olay): Haçlı Seferi/Sömürge Seferi/Savunma Seferi'nde kara+deniz (ya da diplomasi+askeri) rotaları ikinci dönemeçte zaten TEK bir olayda birleştiği için (`oc_hacli_kutsal_topraklar_savasi`, `sd_somurge_ahlaki_ikilem`, `yolculuk_savunma_savas_ortak`) o birleşme noktasına tek bir alternatif eklendi (`*_b` id'leri, her iki rota da aynı havuzu paylaşır); Coğrafi Keşif ve Mucit Turnesi'nde rotalar sona kadar ayrı kaldığı için Hac'takiyle aynı şekilde rota başına ayrı bir alternatif eklendi (`yolculuk_kesif_kara_3b`/`_deniz_3b`, `yolculuk_mucit_saray_3b`/`_sanayici_3b`). **Artık tüm 6 yolculuk türünde her rota en az iki ayrı dönemeçte dallanıyor** — aynı zinciri iki kez yaşayan bir oyuncu genelde farklı bir olay-kombinasyonu görür.

**Faz 5.5 — Sömürge askeri rotası simetri düzeltmesi:** Faz 5'te fark edildi ki Sömürge'nin "askeri" rotasında `sd_somurge_askeri_2` (orijinal, alternatifi `_2b` değil) ikinci dönemeci (`sd_somurge_ahlaki_ikilem`) hiç görmeden doğrudan `sd_somurge_tropik_hastalik`'e atlıyordu — halbuki `_2b` alternatifi zaten ikinci dönemece bağlıydı. Bu asimetri giderildi: `sd_somurge_askeri_2`'nin çıkışı da `zorunlu_sonraki_havuzu: ["sd_somurge_ahlaki_ikilem","sd_somurge_ahlaki_ikilem_b"]`'e bağlandı — artık "diplomasi" rotasıyla birebir simetrik, her ikisi de 2×2=4 kombinasyon sunuyor.

**Faz 6 — Haçlı Seferi'nin kaçış/esaret dalları ile Savunma Seferi'nin direniş/esaret dalları:** `oc_hacli_ordu_dagiliyor` (Haçlı Seferi) ve `yolculuk_savunma_kale_dusuyor` (Savunma Seferi) olaylarında oyuncunun seçimiyle (rastgele değil) girilen 3 adımlık iki alt-zincir vardı (kaçış/esaret, direniş/esaret) — her biri sabit tek yol izliyordu. Diğer ana rotalarla aynı desende, her alt-zincirin **her iki** dönemeç noktasına (adım1→adım2 VE adım2→adım3) birer alternatif eklendi (`oc_hacli_kacis_2b/3b`, `oc_hacli_esaret_2b/3b`, `yolculuk_savunma_direnis_2b/3b`, `yolculuk_savunma_esaret_2b/3b` — 8 yeni olay). Artık bu 4 alt-zincirin her biri de 2×2=**4** farklı olay-kombinasyonu sunuyor — Hac ve diğer ana rotalarla aynı yoğunlukta.

**Faz 7 — Haçlı Seferi'ne üçüncü dönemeç (`oc_hacli_ganimet_yagma`):** Kuşatma sahnesinden (`oc_hacli_kutsal_topraklar_savasi`/`_b`) sonraki adım hâlâ tek sabit hedefe (`oc_hacli_ganimet_yagma`) gidiyordu. Bir alternatif eklendi (`oc_hacli_ganimet_yagma_b`, "Ele Geçen Kütüphane") ve bağlantı `zorunlu_sonraki_havuzu`'na çevrildi — Haçlı Seferi zincirinde artık **üç** ayrı dönemeç var.

**Not — "sefere katılmayanlar" (`oc_hacli_geride_kalanlar`/`oc_hacli_korkak_damgasi`) yolculuk zincirinin PARÇASI DEĞİL:** Bunlar `yolculukOlayi:true` taşımıyor, sıradan (`hacli:katilmadi` etiketiyle filtrelenen) normal havuz olayları — yani `zorunlu_sonraki` ile zincirlenmiyorlar, oyuncunun tüm hayatı boyunca geniş normal havuzun (~150+ olay) içinde düşük ağırlıkla (0.6-0.7) rastgele çıkıyorlar. Havuz kilitlemesi olmadığı için "az olay var" sorununun kapsamına girmiyorlar — ek bir düzeltme gerektirmiyor.

**Diğer kategoriler denetimi (Faz 7):** `zorunlu_sonraki` kullanan tek yer yolculuklar değil — `hapis.ts` (37 kullanım), `genel.ts` (20), `ortaCagAskerYollari.ts`/`ortaCagDinAdamiYollari.ts` (8'er) de var. Ama farkları önemli: `genel.ts` ve kariyer yolu dosyalarındaki zincirler **havuz-kilitli değil** — 2-3 adımlık kısa bir zorunlu devam sonrası oyuncu yine binlerce olaylık normal havuza dönüyor, bu yüzden tekrar hissi yaratmıyorlar. **`hapis.ts` biraz daha benzer bir örnek**: `hapiste` etiketi havuzu 46 olaya kilitliyor ve içinde 4 kısa (2-4 adımlık) sabit zincir var (rüşvet: `rusvet_girisimi→muhbir_bulma→pazarlik_derin→uygulama`; kaçış-bayıltma: `bayiltma_plan→saldiri→kacis`; tünel: `tunel_karar→(tek_1→tek_2 | ekip_1→2→3)`; iyi hal: `iyi_hal_karar→degerlendirme`) — ama bunlar yolculuktan farklı olarak **oyuncunun kendi seçtiği alternatif stratejiler** (rüşvet mi, kaçış mı, sabır mı) olduğu için zaten kendi içlerinde çeşitlilik sağlıyorlar, üstelik Faz 2'nin adaptif `sonKTekrarOnlemeHesapla`'sı (küçük havuzda pencere büyür) bu havuzu zaten güçlendirmişti. Yine de istenirse aynı `zorunlu_sonraki_havuzu` yöntemi bu 4 hapis zincirine de uygulanabilir — şu an dokunulmadı.

**Aranma Kademesi:** Ayrı bir eksen **değildir** — TEK suç/aranma ekseni olan `suc_seviyesi`'nin (0-100, §4) bantlarıdır (eski `aranma_seviyesi` 0-4 alanı 2026-08'de buna katıldı). **2026-09 yeniden düzenleme (4 yıldız, 25 puanlık bantlar):**

| Bant | Aralık | Tema | Ceza (tutuklanırsan) | Girişte ne olur |
|---|---|---|---|---|
| Temiz/Kademe 1 | 0-25 | Rutin çevirme, rüşvet | 2-4 yıl | Düşük ağırlıklı "tetikleyici" olaylar (`maxSucSeviyesi:24` — devriye durdurması, meyhane kavgası vb.) + rutin çevirme/rüşvetçi bekçi olayları (aynı üst sınır); kefaret ucuz (13-25) |
| Kademe 2 | 25-50 | **Yakalanma** | 4-7 yıl | İhbarcı/ev araması tehdidi gibi olaylar — **iki gerçek yol**: kefaretle öde ve suçu düşür, YA DA reddet (kaybedersen doğrudan `etiket_ekle:["hapiste"]` — hapse girip [hapis.ts](server/src/data/olaylar/hapis.ts)'teki parasız riskli kaçış olaylarıyla kaçmayı deneyebilirsin) |
| Kademe 3 | 50-75 | **Baskın** | 7-9 yıl | Kefaretler ciddi artar (85-147); iki büyük "Ev/İş Yeri Baskını" olayı (`minSucSeviyesi:50`, max yok) neredeyse kaçınılmaz hâle gelir; en az **5 yıl** yatmadan para/af ile çıkış yok (aşağıdaki `hapisErkenCikisMumkunMu`) |
| Kademe 4 | 75-100 | **Azılı suçlu** | 9-12 yıl | En sert olaylar (azami takip, ödül avcıları) + en yüksek kefaretler (139-200); aynı 5-yıl-yatma kısıtı burada da geçerli |

Kendi özel havuzu [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) (32 olay) her bandın kendi `minSucSeviyesi`/`maxSucSeviyesi`'ne kilitlenir; her bandın kefaret/rüşvet çıkışı `suc_artis` negatif (-25/-45/-65) verir. `suc_seviyesi` ≥50 iken iki büyük "baskın" olayı tetiklenebilir; sonuçları `suc_seviyesi_ayarla` (10 = temize çık, 30 = kademe 1'e in) ile kesin değere sabitler. Başarılı kaçış `etiket_ekle:["kacak"]` ile karakteri dağa kaçırır — bu noktadan sonra `kacakOlayi:true` (10 olay) şehir havuzunu tamamen kapatıp kendi hayatta kalma zincirini açar (diğer kaçaklar, kışı atlatma, yeni kimlik vb.); birkaç başarılı çıkış olayı `etiket_sil:["kacak"]` ile şehre dönüşü sağlar. Pasif azalma yok — `suc_seviyesi` zamanla kendiliğinden düşmez, suç işlemeyi bırakan bir karakter bile sabit kademesinde kalır; tek düşüş yolu yukarıdaki kefaret/rüşvet/baskın çıkışlarıdır. Üst şeritteki 4 aranma yıldızı bu tek ekseni gösterir (`bolgeTema.aranmaYildiz`, §4, §19). Ceza süresi formülü ve "5 yıl yatmadan erken çıkış yok" kuralı için bkz. §17 "Ceza yılı sayacı" + "Ağır bantta erken çıkışı kısıtlama".

## 18. Ölüm, Skor, Hayat Amaçları (3'lü sistem), Liderlik Tablosu

**Hayat Amaçları** (`state.hayat_amaclari: AmacIlerleme[]`, 2026-09 — eski tekil rastgele `hayat_amaci` KALDIRILDI). Kaynak: [server/src/data/hayatAmaclari.ts](server/src/data/hayatAmaclari.ts).

- **Atama:** doğuşta değil, **15 yaşında meslek seçilince** (`mesleğiSec`). Havuz = **ortak + meslek + çağ** (`amacHavuzu(cag,meslek)`), her kombinasyon ≥8 normal + ≥5 zor görür; `amaclariUret` **2 normal + 1 zor** çeker. `createCharacter` artık amaç atamaz (`hayat_amaclari: []`).
- **Bonus (toplamsal):** `amacSkorCarpani(state) = max(1, Σ tamamlanan amaçların bonusları)` — normal **+1.5**, zor **+2**. → 2 normal + 1 zor hepsi = **×5** (eski "amaç tamamlandı = ×5" tavanı korunur), kısmi tamamlama ×1.5/×2/×3/×3.5 üretir. `hesaplaSkor`: `temelToplam × carpan` (2026-09 ikinci reformu, §18 — eski kayıt/test için `hayat_amaclari` boş + tekil `hayat_amaci.tamamlandi` ise ×5 fallback).
- **`kontrolAni`:** `"herhangi"` = bir an bile eşiğe dokunmak yeter, kalıcı kilitlenir (`amaclariHerhangiKontrol` her tur, §9 adım 16); `"olumde"` = yalnız ölüm anındaki duruma bakılır (`amaclariOlumdeKontrol`, `checkDeath` içinde — tüm tamamlanmamışlara son bir bakış). İkisi de hayat-hikayesine "🎯 Hayat amacını tamamladı: …" yazar.
- **Para/servet amaçlarında "temiz el" şartı:** `suc_seviyesi < 40` (suçla zengin olan bonus alamaz).
- **Ömürlük sayaçlar** (amaç koşulları için, hepsi `CharacterState`, `eskiKayitGocu` göçlü): `omur_zirve_suc` (suç seviyesinin tepe değeri — `clampStats`'te takip), `omur_kumar_net` (zar/üçkâğıt/bilek net kâr — `zarAt`/`ucKagitciOyna`/`bilekGuresiSonuc`), `omur_sadaka_sayisi` (`sosyallesmeAksiyonYap` sadaka dalı), `omur_hediye_sayisi` (`hediyeEt` + `aileEtkilesimYap` `es_hediye`/`cocuk_hediye`), `omur_riskli_basari` (`secimUygula`: zar başarılı **ve** o seçeneğin `basarisizSonuc`'unda `olum` ya da `olum_sansi ≥ RISKLI_OLUM_SANSI_ESIK=25` varsa +1).
- **Havuz (özet):** ORTAK normal — denk_kasa (servet≥200·temiz), taninan_yuz (un≥72), dinc_ihtiyar (yas≥75), ocak_sahibi (evli+3 çocuk), saglam_omur (62+ yaş sağlık≥75), meyhane_mudavimi (3 alkollü âlem), sansli_el (kumar net +80), gizemli_kader (esya:/envanter: etiketi), korkusuz_secim (omur_riskli_basari≥1). ORTAK zor — servet_zirvesi (servet≥400·temiz), yasayan_efsane (un≥97), kalabalik_soy (5 çocuk), zengin_ve_ihtiyar (servet≥220 & yas≥68, **olumde**), lekesiz_omur (ahlak≥90 & omur_zirve_suc<20 & yas≥55, **olumde**), sarhos_ama_ayakta (ayyaş + 65 yaş, **olumde**), kumar_efsanesi (kumar net +250), olumle_dans (omur_riskli_basari≥3). ASKER: komuta/serdar (rütbe 4/5), cephe_gazisi (2 tarihi savaş), guclu_ordu/ordu_kurucusu (ordu 150/240), tam_donanim (teçhizat 80), madalyali (3 ünvan), sehir_kalkani (şehir yön. 3), bas_belasi (2 rakip yenildi). TÜCCAR: lonca_ustasi/lonca_reisi (rütbe 4/5), uc_kepenk/tekelci (3/4 mülk), buyuyen_sermaye/sermaye_devi (ticaret sermaye 80/140), kar_marji (servet≥240·temiz), hediye_agi (6 hediye), imparator (rütbe5+servet≥380). DİN ADAMI (servet görevi yok): kursu_sahibi/piskopos (rütbe 4/5), comert_el/aziz (ahlak 82 / ahlak96+nüfuz85), nufuzlu_vaiz (nüfuz 70), sadaka_tasi (18 sadaka), kutsal_gorev (yolculuk_tamamlandi), ruhani_onder (şehir yön. 3), gunahsiz (omur_zirve_suc<15 & yas≥60 & ahlak≥70, **olumde**). ÇAĞ: OÇ kutsal_yolculuk (normal, yolculuk_tamamlandi) / sarayda_soz (zor, `sarayda`+un≥75); SD sanayici (normal, servet≥200+2 mülk·temiz) / kasif_ruhu (zor, yolculuk_tamamlandi+servet≥240).
- **API:** `GET /:id/amaclar` → `{ amaclar: AmacKarti[], carpan }` (`amaclarGetir`) — her kart `{id, baslik, aciklama (state.dil'e göre), zorluk, bonus, kontrolAni, tamamlandi, tamamlanmaYili, mevcut, hedef}`; `mevcut/hedef` yalnız sayısal amaçlarda (`AMAC_ILERLEME` haritası), boolean amaçlarda `null`. Turu tüketmez.
- **İstemci:** `client/src/components/AmacPaneli.tsx` — sağ panelde (`<SiyasetPaneli>` altında) her zaman görünen canlı ilerleme çubuklu kart + ölüm ekranında `varyant="olum"` özeti. `App.tsx` bir `useEffect` [id, tur_sayisi, meslek, ekran] `amaclarGetir`'i tazeler. **`KariyerEkrani` ("Görevin") ekranına henüz bölüm eklenmedi** (o ekran paralel geliştiriliyordu). i18n metinleri bileşene gömülü TR+EN.

Tests: [server/tests/hayatAmaclari.test.ts](server/tests/hayatAmaclari.test.ts) + [basarimlar.test.ts](server/tests/basarimlar.test.ts) "hayat amaçları (3'lü sistem)" bloğu.

**Ölüm** (`checkDeath`): `aktif=false`, `olum_nedeni` yazılır (relik istisnası §9). **Skor liderlik tablosuna OTOMATİK kaydedilir:** ölüm ekranı açılınca istemci (`App.tsx` `useEffect`, `otoSkorKaydiRef` ile oturum başına tek sefer) `POST /api/scores`'u `state.isim` ile (boşsa `"İsimsiz"`/`"Nameless"`) kendiliğinden çağırır — oyuncunun isim yazıp "Kaydet" demesi gerekmez (isim zaten oyun başında `isim_sec`'te alınıyor). `skoru_kaydedildi` bayrağı tekilleştirir. Otomatik kayıt ağ/hız-sınırı ile başarısız olursa (`otoKayitBasarisiz`) elle isim+kaydet formu yedek olarak görünür; aksi halde ekranda yalnızca "kaydediliyor…" → "kaydedildi" mesajı gösterilir.

**Geçmiş oyun backfill'i:** Sunucu açılışında `basla()`, `oturumlariYukle()`'den sonra `gecmisSkorlariKaydet()` ([gameEngine.ts](server/src/game/gameEngine.ts)) çağırır — DB'de hâlâ duran (`aktif:false`) ve `skoru_kaydedildi:false` olan tüm bitmiş oturumları `skoruDbyeYaz(state, state.isim ?? "İsimsiz")` ile liderlik tablosuna geçirir (isim boş/uygunsuzsa "İsimsiz"), her biri için `skor_kaydi` metriği yazar, `skoru_kaydedildi=true` damgalar. İstemci "kaydet" demeden ölen ya da eski istemciyle oynanmış geçmiş oyunları kurtarır. 7 günlük bitmiş-oturum temizliği (§2) yüzünden yalnız son ~1 haftanın oyunları kurtarılabilir; sonraki restart'larda flag sayesinde tekrar eklenmez. İsim [kufurFiltresi.ts](server/src/moderasyon/kufurFiltresi.ts)'nden geçer (Türkçe karakter/leetspeak normalize eden basit kök-kelime eşleştirmesi, TR+EN küfür listesi). Ayrıca ölümde istemci, karakterin bir özetini tarayıcıya (`client/src/gecmisHayatlar.ts`, localStorage) kaydeder — giriş ekranındaki "Geçmiş Hayatların" listesi bunu okur.

**Soy sürdürme kaldırıldı (2026-09):** Eski `POST /:id/soy-surdur` endpoint'i, `gameEngine.soyuSurdur`, `SoyDevamiSecenekleri` ve `hanedan.test.ts` tamamen silindi. Ölüm kesin sondur; `createCharacter`'ın dördüncü parametresi artık `soyDevami` nesnesi değil, opsiyonel `oyuncuIsmi: string`'tir.

**Liderlik tablosu sıralamaları:** `genel` (skor), `en_zengin`, `en_unlu` (un), `en_uzun_yasayan` (yas) — her biri **top 15** (2026-09'da 20→15). İstemci satırları sadeleşti: meslek/yerleşim/kişilik gösterilmiyor (rütbe zaten var), yalnız rütbe + çağ + yaş + ölüm nedeni + ünvan/efsanevi-ölüm rozetleri. Yama #1: `skorRepository.skorKaydet` artık `Score.para` alanına salt nakit değil **nakit + gayrimenkul değeri** (`gayrimenkulDegeriHesapla`) yazar → `en_zengin` net serveti sıralar, mülke yatırım yapan cezalanmaz.

## 19. İstemci (Client) Mimarisi

React 19 + Vite, **state kütüphanesi yok** (saf `useState`, `App.tsx` ~2640 satırlık tek ekran-durum-makinesi — 2026-09 sonu itibarıyla; dosya büyümeye devam ediyor, bölünmesi ayrı bir teknik borç maddesi olarak not edildi). `client/src/types.ts` server tiplerinin **elle senkronize edilen** bir kopyasıdır.

**Ekran akışı** (`type Ekran`, `App.tsx`):
```
giris → cag_sec (çağ + bölge/bayrak TEK sayfada) → isim_sec → acilis → oyun
   (2026-09: yerlesim_sec kaldırıldı; meslek seçimi ARTIK ayrı sayfa değil, `acilis` ekranına gömülü —
    açılış anlatısı + kişilik + meslek kartları (2026-09 sonu itibarıyla 4: Asker/Tüccar/Din Adamı/Zanaatkâr) aynı sayfada, "Devam Et" yok. `acilis` artık `ekran-kurulum`
    sınıfı + KaderYollari arka planıyla önceki kurulum sayfalarıyla aynı zemini kullanır. Restore: `!state.meslek → acilis`.)
                                                              ↓
              (yan ekranlar, tam sayfa navigasyon: aile / gorev / finans / yatirim / sosyallesme / magaza)
                                                              ↓
                                                    sonuc → oyun (döngü)
                                                              ↓
                                                        olum → liderlik
```

Ayrıca kök `.oyun-kapsayici` içinde, `ekran`'dan bağımsız her zaman render edilen **tek** `position:fixed` sağ-üst düğme var: **⚙️ (`.ayar-ac-buton`)**. (Eski ayrı **🔊/🔇 `.ses-toggle-buton`** 2026-09'da kaldırıldı — ses aç/kapa artık yalnızca Ayarlar modalında; `sesToggle` fonksiyonu duruyor, `AyarlarModal`'a `onSesToggle` ile geçiyor.) Dişli, `ayarlarAcik` state'ini açar → `AyarlarModal` (§29). Giriş ekranında ayrıca kahraman buton satırında bir "⚙️ Ayarlar" (`.ikincil`) düğmesi vardır.

**Giriş ekranı (`giris`):** dönen ⚙️ motifli bir kahraman bölümü + CTA'lar: **Oyuna Devam Et** (yalnız bellekte `karakter?.aktif` varken — Ayarlar → "Ana Menüye Dön" ile buraya gelen oyuncu buradan `devamEt()` ile döner) · Yeni Hayata Başla · Liderlik Tablosu · **🏆 Başarım Galerisi** (`BasarimGaleri.tsx` modalı) · ⚙️ Ayarlar; altında bir **"💬 Oyunu birlikte geliştirelim — görüşünü yaz"** butonu (Ayarlar modalını "Görüş & Öneri" sekmesiyle açar). `.giris-paneller` ızgarası: **Geçmiş Hayatların**, **Liderlik** (ilk 3), **Başarımların** (eski açılır ünvan/efsanevi-ölüm koleksiyonu paneli — korundu), **🗺️ Yol Haritası** ([yolHaritasi.ts](client/src/yolHaritasi.ts), statik düzenlenebilir liste), **👤 Yapımcı** ([yapimci.ts](client/src/yapimci.ts) — isim + tanıtım + opsiyonel LinkedIn linki; `linkedin: ""` ise link gizli). **`yerlesim_sec` ekranı 2026-09'da KALDIRILDI** — `bolgeSecildi` doğrudan `secilenYerlesim='kasaba'` yazıp `isim_sec`'e geçer; `POST /new` (isimle birlikte) `isim_sec`'teki "Başla" ile çağrılır. `isim_sec`: metin kutusu + "🎲 Rastgele İsim" (`GET /api/game/isim-onerisi`); boş bırakılırsa "Başla" anında bir rastgele isim çekip öyle oluşturur. `isim_sec` "Geri" → `cag_sec`. **2026-09: ayrı `bolge_sec` ekranı kaldırıldı** — `cag_sec`'te çağa tıklamak sadece seçer (`meslek-kart-secili`), altta `.bolge-secim-blok` içinde o çağın bayrak kartları belirir; çağ değişince `secilenBolge` sıfırlanır. `AdimGostergesi` artık **2 adım** (Çağ+Bölge · İsim).

**Giriş akışı görsel yenilemesi (2026-09, [giris.css](client/src/giris.css) + [Suslemeler.tsx](client/src/components/Suslemeler.tsx)/[Amblemler.tsx](client/src/components/Amblemler.tsx)):** giriş/kurulum/açılış ekranları "altın yaldızlı el yazması" yönüne geçti — tam-sahne SVG "kader yolları" arka planı, köşe tezhipleri, mühür ayraçları, çağ madalyonları + ülke kalkanları (raster yok). Giriş ekranı artık kutu değil, 5 sütunlu bir grid: dışta esnek boşluk · `giris-yan-sol` (Geçmiş Hayatlar) · `giris-hero` (başlık + dönen çark + buton sütunu) · `giris-yan-sag` (Liderlik + açılır Başarımlar) · dışta boşluk — ultrawide'da içerik ortada toplanır, tablet/mobilde tek sütuna iner. Hero'da aktif oyun varken **"▶ Oyuna Devam Et"** iki satırlı (eylem + `isim · yaş · rütbe`) ve en belirgin buton; "Yeni Hayata Başla" o durumda `ikincil`'e düşer + "kaydın silinmez" `title`'ı. Klavye odağı için altın butonlarda `:focus-visible` outline. **👤 Yapımcı ayrı panel DEĞİL** — yalnız sol alttaki `.giris-imza` (isim + LinkedIn + görüş yaz). [NasilOynanir.tsx](client/src/components/NasilOynanir.tsx) öğreticisi: kullanıcı isteğiyle (2026-09) **kısa, yüzey seviyesi, oyuncuya dönük** 9 bölüme çekildi (Amaç · Her Tur · Durumun · Meslek & İlerleme · Suç & Aranma · Dünya & Ekonomi · İlişkiler & Aile · Ölüm & Skor · İpucu) — önceki 11-bölümlük sürüm iç formül/sabit/eşik sayılarını (kariyer puanı +2/+3/+8, skor ×5, aranma 20/40/60/80 kademeleri, itibar ±%12, rütbe ~%15, veba ~%70, ±30 yatkınlık, mülk bakımı oranı vb.) ifşa ediyordu; bunların hepsi metinden çıkarıldı, yalnız "ne neye yarar" kaldı. `maddeler` listesi hâlâ opsiyonel (çoğu bölümde 0-1 madde). Modal 760px, masaüstünde 2 sütun (`.nasil-govde` grid); yazı renkleri açık ekru gövdeye göre koyu mürekkep (`.nasil-bolum h3/p/li`, [giris.css](client/src/giris.css)). İçerik i18n.ts'e değil bileşene gömülü, TR+EN aynı objede (basarimSistemi deseni). **Başarım Galerisi** ([BasarimGaleri.tsx](client/src/components/BasarimGaleri.tsx)) de `ayarlar-modal` açık ekru gövdesini kullanıyor — `.basarim-karti` artık açık zeminli + koyu yazı (eski koyu panel zemininde metin okunmuyordu, [App.css](client/src/App.css)).

**Önemli:** `sonuc` (`ekran==='sonuc'`) kendi başına tam ekran bir görünüm **değildir** — `oyun` ile aynı JSX bloğu içinde render edilir (`(ekran === 'oyun' || ekran === 'sonuc') && ...`), `.oyun-govde` grid'i (sol-panel/merkez-panel/sag-panel, üst şerit, komuta şeridi) aynen ekranda kalır; sadece `.merkez-panel` içindeki `.merkez-alt` bölümü seçim sonucunun içeriğiyle değiştirilir (`sonEtki` state'i). Bu sayede bir seçim yapıldığında ekranın tamamı değil, sadece olayın gösterildiği alan değişir. `aile/finans/yatirim/sosyallesme/magaza/olum` ise gerçek tam-ekran geçişlerdir — oyun HUD'u (sahne/üst şerit/komuta şeridi) tamamen unmount olur.

**Gelir&Gider/Yatırım/Sosyalleş/Kariyer artık ayrı bir buton satırından değil, sahnenin üstündeki tıklama noktalarından açılır** (`SahneHotspotlari.tsx`, `.merkez-sahne` içinde `BolgeSahnesi`'nin üstüne binen 4 buton; soldan sağa **Kariyer · Yatırım · Evin · Sosyalleş**): solda `🎖️` **Kariyer** (`.sahne-hotspot-kariyer`, `kariyerEkraniniAc`, bekleyen `yonetim_talep` varken 🔔 — `talepVar` prop'u; §35); ortada meslek+çağa (Din Adamı'nda ayrıca `din_kultur`'e) göre bir işyeri binası ikonu (`bolgeTema.meslekBinasiGetir`) → **Yatırım** (`yatirim`, i18n `shIsinKisa`="Yatırım"/"Investments"; `IsYatirimEkrani`, `yatirimEkraniniAc`); sağda konut kademesine göre büyüyen bir ev ikonu (`bolgeTema.konutGoruntusuGetir`) → **Gelir & Gider** (`finans`); sağ kenarda `🍷` **Sosyalleş**. **Mağaza artık sahnede DEĞİL** — sol paneldeki (`gorev-blok`) **"🛒 Mağaza"** butonundan açılır (`magazaEkraniniAc`). Hiçbiri ayrı sanat varlığı gerektirmez, tek emoji + konum. Tetiklenen handler (`finansEkraniniAc`/`yatirimEkraniniAc`/`kariyerEkraniniAc`/`sosyallesmeEkraniniAc` + sol panelden `magazaEkraniniAc`) `ekran`'ı değiştirir ve oyun HUD'unun yerini **tam sayfa** alır (sahne/üst şerit/komuta şeridi unmount olur). Kapatmak için her birinde tek tip bir **"Geri Dön"** butonu vardır (`FinansEkrani`/`IsYatirimEkrani`/`SosyallesmePaneli`/`MagazaPaneli`, hepsi aynı etiket, `.tam-geri-buton` ile sola hizalı) — `ekran`'ı `'oyun'`a döndürür; sahne/senaryo state'i App.tsx'te zaten korunduğu için oyun ekranına dönünce kaldığı yerden devam eder.

**Dördü de `TAM_EKRAN_GRUBU`'na dahildir ve `oyun`/`sonuc` ile AYNI `.oyun-kapsayici-tam` kilidini kullanır** (`height:100dvh; overflow:hidden` — sayfa DIŞTAN asla kaymaz; `aile` hariç, o hâlâ dar/ortalanmış doğal-yükseklik bir liste ekranı, bkz. `TAM_EKRAN_GRUBU` tanımındaki yorum). Eskiden (ilk revizyonda) `finans/sosyallesme/magaza` `.oyun-kapsayici-genis` ile doğal yükseklikte açılıp sayfa normal kayardı — **bu kaldırıldı**, hepsi artık aynı "dışta sıfır kaydırma, sadece iç alan kayar" modelini paylaşıyor. İki paylaşılan CSS deseni var (App.css, "Tam-sayfa gösterge ekranları" bölümü):
1. **Çok bölümlü ekranlar** (İşin&Yatırım, Gelir&Gider) → `.tam-govde-3col` (3 **oransal** sütun, `grid-template-columns: 1fr 1.5fr 1fr` — sabit piksel tavanı YOK, geniş ekranda sütunlar da genişler) + her biri `.tam-sutun` (kendi içinde `overflow-y:auto`, sol-panel/sag-panel'deki aynı desen). İçerik sütun yüksekliğini aşarsa SADECE o sütun kendi içinde kayar, dış sayfa yine kaymaz.
2. **Tek homojen kart listesi olan ekranlar** (Mağaza, Sosyalleş) → başlık/sekme/açıklama sabit kalır, kart ızgarasını saran `.tam-kaydirilan` (flex:1, `overflow-y:auto`) kalan yüksekliği doldurup gerekirse kendi içinde kayar.

Mobil (`max-width:767px`) için bu üç sınıfın (`.ekran-tam-sayfa`/`.tam-govde-3col`/`.tam-sutun`/`.tam-kaydirilan`) hepsinde `.oyun-govde`'nin mobil davranışıyla aynı gevşetme uygulanır: `height:auto; overflow:visible`, sütunlar tek sütuna iner, sayfa doğal olarak kayabilir.

**Önemli — bir önceki revizyonda kart metinleri (mülk açıklaması, avantajlı/dezavantajlı durum, kendi-iş açıklaması, zar risk cümlesi) `title` tooltip'ine gizlenip kartlar küçük kare karolara sıkıştırılmıştı; bu geri alındı** çünkü bilgiyi görünmez kılıyor ve ekranı boş/ucuz gösteriyordu — mülk/kendi-iş/zar/yaşam-tarzı/konut/mağaza/sosyalleşme kartlarının HEPSİ aynı paylaşılan `.yatirim-kart`/`.yatirim-kartlari` ailesini kullanır (min-height 200px, tüm metin kart içinde görünür, kısaltma yok). Sadece kompakt kalması gereken şey — bir karakterin **sayısal özet değerleri** (İşin&Yatırım'ın Sütun 1'indeki `.is-profil-karti` + `.is-karo-izgara`, `StatKarosu`: Yıllık Kazanç/Amir/Şehir Yönetimi/meslek-metrikleri) — küçük karo kalıyor (2026-09'da 3 sütunlu kompakt ızgaraya küçültüldü, `aspect-ratio` kaldırıldı); **metin/açıklama taşıyan hiçbir kart artık zorla kareye sıkıştırılmıyor.**

**İşin & Yatırımların (`yatirim`, `IsYatirimEkrani.tsx`):** **2026-09'da 2 sütuna indirildi** (Karanlık İşler Kariyer ekranına taşındığı için, bkz. aşağıdaki `KariyerEkrani` maddesi) — kapsayıcı `.tam-govde-3col` yerine `.tam-govde-2col` (`grid-template-columns: 1fr 1.4fr`) kullanır. **Mobil sekme turu:** `window` genişliği ≤767px iken eski akordeon yerine gerçek bir **sekme çubuğuna** (`.ekran-sekmeleri`/`.ekran-sekme*` — `client/src/hooks.ts` `useMobilEkran` matchMedia hook'u) döner: üstte 2 buton (artık 3 değil), tıklanan sekmenin paneli ANINDA gözükür, diğerleri `hidden` ile tamamen kaldırılır — masaüstünde bu bar hiç render edilmez, değişmeden 2 sütun grid kalır. Aynı `.ekran-sekme*` sınıfları Mağaza'nın (`MagazaPaneli`) şifa/lüks sekmeleriyle ve Gelir&Gider/Sosyalleş ekranlarının mobil sekmeleriyle paylaşılır (bkz. aşağıdaki maddeler). Mobilde ayrıca kart/kutular küçültülür. `islemMesaji` sayfa başında sabit metin değil, `.kariyer-sonuc-katman`/`.kariyer-sonuc-modal` deseninde bir açılır pencere (kredi/mülk sonuçları dahil). Sütun 1 "Görevin": kimlik kartı (**2026-09'da `meslek` metni + `para`/`ticaretSermaye` karoları kaldırıldı** — kullanıcı isteği "yatırım sayfasında kendi paran ve ticaret sermayen yazmasın, mesleğimiz de yazmasın"; sadece rütbe adı + şehir yönetimi/asker güç karoları kalır) + **piyasa dedikoduları** (`.tam-baslik-dedikodu` altın "📜" başlık + `.dedikodu-panosu.dedikodu-panosu-vurgu`) + **Tefeci** bölümü (aktif kredi özeti + pazarlık, ya da §34.5'teki iki sabit kredi tutarı çipi — artık serbest sayı girişi yok). Sütun 2 (en geniş, `.tam-govde-2col` sağ sütunu): 6 mülk kartı — kart başına `▲ avantajlı · ▼ dezavantajlı` + tek "💰 Kazanç ~+N birim/yıl (%X)" satırı (`iyNetKisa`, gelir/gider dengesi turu 2026-09: artık bakımı düşülmüş tahmini "net" değil, o anki BRÜT getiri — kullanıcı isteği "bakım değerini hesaba katma, sadece o anki kazanç/zararı yaz"; bakım/vergi detay metinleri karttan tamamen kaldırıldı) + (sahip değilse) "Fiyat: N birim". **Karanlık İşler artık burada YOK** — Kariyer ekranına taşındı (§34.2/aşağıdaki madde). **Salgına Hazırlık de burada YOK** — backend duruyor (§34.4) ama 2026-09'da client'tan kaldırıldı. **Mini oyunlar (Hazard/Üç Kağıtçı/Bilek Güreşi) buradan Sosyalleş ekranına taşındı** — bkz. aşağıdaki Sosyalleş maddesi.

**Gelir & Gider (`finans`, `FinansEkrani.tsx`):** Sütun 1 "Bütçen" — **2026-09 sadeleştirme turunda ciddi biçimde inceltildi** (kullanıcı: "gayrimenkul alıcan 10 satır yazıyo"): "Yıllık maaş" + hemen altında maaş kırılımı artık **varsayılan kapalı bir `<details className="finans-maas-kirilim">`** — `<summary>` yalnız 4 yüzde çipi (`🎖️ 📈 🤝 🌍`), tıklayınca rütbe/kariyer/itibar/dönemsel kalem dökümü + tek satır lejant (`feKirilimLejant`) açılır. Eski satır-satır kırılım + `feMaasNot` paragrafı + **"🌍 Şu an bütçeni etkileyen dünya durumları" bloğu tamamen kaldırıldı** (dünya durumları yalnız sol panel `FinansOzetPaneli` çiplerinde). Sonra (mülk varsa) "🏠 Gayrimenkul geliri" satırı, gider dökümü (sıfır olan `ekip` kalemi gizli), toplam gider, **tek "Net yıllık" satırı** (mülk varsa "(gayrimenkul dahil)" eki, `gercekNet = netYillik + gayrimenkulYillikGelir`; eski "↳ Maaş − gider" ara satırı kaldırıldı); + `GecmisGrafik`. Yaşam/konut kartlarında serbest `aciklama` cümlesi karttan çıkıp `title`'a alındı; "Yıllık gider/kira: N birim." → "N birim/yıl"; "(şu an bu)" → " ✓"; nakliye ücreti yalnız pahalıya geçişte tek ek ("· +N birim taşınma"). Sütun 2 "Yaşam Tarzın": 6 yaşam tarzı kartı. Sütun 3 "Evin": 6 konut kademesi kartı. **Bu ekrana özel:** kapsayıcı `.tam-govde-3col` yerine `.tam-govde-3col-finans` (`grid-template-columns: 0.9fr 1.55fr 1.55fr` — sol "Bütçen" dar, orta + sağ AYNI genişlikte) kullanır; iki seçim ızgarası `.yatirim-kartlari.finans-secim-izgara` (`grid-template-columns: repeat(2, minmax(0,1fr))` → HER ZAMAN satır başına tam 2 kart, sütun genişliğini doldurur; `flex:1` + `grid-auto-rows: minmax(min-content, 1fr)` → kartlar sütunun kalan yüksekliğini paylaşıp dikeyde uzar, sayfa altı boş kalmaz; kart açıklaması `-webkit-line-clamp:3` ile en fazla 3 satır — uzun ev tanımları 6 kartı aşağı kaydırmaya zorlamasın). Kart maliyetleri **enflasyonla ölçekli güncel tutarı** gösterir (`enflasyonluTutar`, `finans.enflasyonYuzdesi`'ten), enflasyon > 0 iken "(liste N, +%E enflasyon)" ekiyle; gider dökümündeki gerçek `yasam`/`konut` tutarıyla hizalı. **Mobilde (≤767px, sekme turu):** aynı `IsYatirimEkrani` deseni — 3 sütun yerine üstte `.ekran-sekmeleri` (Bütçen/Yaşam Tarzın/Evin), tıklanan sekmenin `.tam-sutun`u anında görünür kalanı `hidden`; `feDegistirNot`/`feTasinNotKisa` gibi yardımcı cümleler `.tam-yardimci-metin` ile mobilde gizlenir. **Eski "Varlıkların" sütunu (sahip olunan mülkler + ekip) 2026-09'da kaldırıldı** — sahip olunan mülkler artık ayrı listelenmiyor (İşin & Yatırımların ekranındaki mülk kartlarında `mulk-kart-sahip` durumu görünüyor); **ekip yönetimi (Kov butonu dahil) `GorevEkrani`'ne taşındı** (tam-sayfa "Görevin" ekranı, sol panelden "🎖️ Görevini Gör" ile açılır). `FinansEkrani` artık `ekip`/`mulkler`/`onEkipCikar` prop'u almıyor. `FinansOzetPaneli` (sol panel mini özet) gelir/net'e `gayrimenkulYillikGelir`'i katar; **"Eline kalan" satırının hemen altında etkin dünya olaylarını (`dunyaEtkileri`) ETKİSİYLE BİRLİKTE tam metin bir liste olarak gösterir** — ör. "☠️ Salgın: her yıl ölüm riski · işçi kıtlığı maaş +%N · kira −%M", "🌾 Kıtlık: −1 sağlık/yıl", "⚔️ Büyük savaş (X): maaş −%15 · yemek +%N · savaş vergisi %M" — oyuncu bütçesinin neden değiştiğini görsün (kullanıcı isteği; eskiden yalnız `metin.split(':')[0]` çipi gösteriliyordu, etki gizliydi). **2026-09 sadeleştirme turunda maaş kırılımı çip satırı (`🎖️ 📈 🤝 🌍` yüzdeleri) buradan kaldırıldı** — tam kırılım artık yalnız Gelir & Gider ekranındaki açılır `<details>`'te.

**Mağaza (`magaza`, `MagazaPaneli.tsx`) ve Sosyalleş (`sosyallesme`, `SosyallesmePaneli.tsx`):** Tek homojen kart listesi oldukları için 3 sütuna bölünmez — başlık/açıklama/sekmeler (Mağaza'da şifa/lüks) sabit üstte, kart ızgarası `.tam-kaydirilan` içinde kalan alanı doldurur. **Sosyalleş ekranı `.tam-kaydirilan` içinde ÖNCE bir `.sosyallesme-kumar` bölümü var:** "🎲 Kumar & Meydan Oyunları" başlığı (2026-09: `spKumarNot` uyarısı ayrı `<p>` olmaktan çıkıp başlığın `title`'ına alındı; `spIntro` ve mekân kartı açıklamaları da kısaltıldı/`title`'a taşındı — "sosyalleşme sayfası çok bilgi veriyor" şikayeti) + `.sosyallesme-kumar-oyunlar` grid'inde 3 mini-oyun widget'ı (`HazardWidget`/`UcKagitciWidget`/`BilekGuresiWidget`, [MiniOyunlar.tsx](client/src/components/MiniOyunlar.tsx) — her biri kendi lokal animasyon/aşama state'ini tutar; App.tsx `zarAtHandler`/`ucKagitciHandler`/`bilekGuresiHandler` sonucu `Promise<Sonuc|null>` döndürür, widget zar/bardak/bar animasyonunu ona göre bitirir). Altında "🍺 Gidebileceğin Mekânlar" başlığıyla normal mekân kartları. `SosyallesmePaneli` artık `para`/`paraBirimi`/`zarKademeleri` + `onZarAt`/`onUcKagitci`/`onBilekGuresi` prop'ları alıyor; `sosyallesmeEkraniniAc` `zarKademeleriGetir`'i de çekiyor. **Mobilde (≤767px, sekme turu):** bir mekân olayı açık değilken üçlü sekme (`.ekran-sekmeleri`: İçki & Etkinlikler / Kumar & Meydan Oyunları / Gidebileceğin Mekânlar) — o anki sekme dışındaki bölümler render edilmez; `spIntro` mobilde tamamen gizlenir. Mağaza'da mobilde sekmeler değişmez (zaten şifa/lüks 2 sekmeydi) ama kartlar 2 sütuna sıkışır ve `sekmeAciklama` gizlenir.

**Oyun ekranı düzeni (`.oyun-govde`, tablet/masaüstü — `min-width:768px`):**
- Sabit oran: sol-panel/sag-panel ekranın ~%20'si, merkez-panel ~%60'ı (`grid-template-columns: 1fr 3fr 1fr`).
- `.merkez-panel` içinde görsel (`.merkez-sahne`) tüm alanı kaplar (flex:1, taban 150px, `object-fit:contain` ile hep tam görünür); metin/seçenekler (`.merkez-alt`) ise artık ortalanmış, dar (kenarlarda boşluk bırakan, kareye yakın) bir **"yüzen kart"** olarak sahnenin alt kısmına **~%7** taşarak biner (2026-09'da ~%10'dan azaltıldı; negatif `margin-top: clamp(-1.6rem, -3vh, -0.85rem)` + `z-index:2` + tam opak `--renk-ahsap-panel` zemin + sahnenin `flex:1` ile taşan payı geri kazanması). `.merkez-alt`'ın payı BİLEREK sabit bir orana kilitlenir (`flex: 0 0 clamp(280px, 58%, 480px)` — içeriğe göre büyüyüp küçülen "auto" DEĞİL): olay metni/seçenek sayısı (2-4) değiştikçe kutu boyu değişmesin diye — aksi halde sahne her tıklamada büyüyüp küçülerek görsel bir "kayma" hissi yaratıyordu. İçerik bu sabit alana sığmazsa kendi içinde kayar (`overflow-y:auto`). `SahneHotspotlari` tıklama noktaları artık tek ortak sırada durur (`bottom:%16`) — kartın taştığı bölgenin güvenle üstünde kalır.
- **Oyun ekranı (`oyun`/`sonuc`) `100dvh`'e sabittir, sayfa asla kaymaz** (`.oyun-kapsayici-tam{height:100dvh;overflow:hidden}`) — üst şerit/komuta şeridi sabit yükseklikte, `.oyun-govde` kalan tüm alanı doldurur (`flex:1`). Taşan içerik varsa (ör. sol/sağ panel çok sayıda bölüm biriktiğinde) SADECE o panelin kendi içinde kayar (`.panel-parsomen{height:100%;overflow-y:auto}`). `yatirim/finans/sosyallesme/magaza` da AYNI kilidi kullanır (bkz. yukarıdaki madde) — hepsi kendi iç alanlarında (`.tam-sutun`/`.tam-kaydirilan`) kayar, dış sayfa hiçbirinde kaymaz.
- `.ust-serit-moduller` (Yıl/Yaş/Can/Para/Ahlak/Mutluluk/Aranma) 7 sütunlu eşit-genişlik grid — bar küçülüp büyüse de her modül her zaman barın sabit 1/7'si, tek tek farklı boyda dizilip taşmaz. Aranma modülü `suc_seviyesi`'ni sayı olarak değil, `bolgeTema.aranmaYildiz` ile 4 yıldıza bölünmüş olarak gösterir (≥50'de kırmızıya döner).
- **Mobil (`max-width:767px`)** tamamen farklı bir moddur: tek sütuna iner, `100dvh` kilidi kalkar, sayfa doğal olarak kayabilir (üç panelin tüm içeriğini bir telefon ekranına sığdırmak gerçekçi değil), `.merkez-sahne` `aspect-ratio:16/9` ile sabit oranlı bir görsel kutusuna döner (`SahneHotspotlari` da bu kutunun üstünde, `transform:scale(0.78)` ile küçülür). Tek kırılım noktası budur — tablet ve masaüstü aynı %20/%60/%20 düzenini paylaşır.

**Dosya haritası:**
| Dosya | Amaç |
|---|---|
| `api.ts` | Tüm backend endpoint'leri için `fetch` sarmalayıcıları (§3 tablosuyla bire bir eşleşir) |
| `oturum.ts` | `localStorage`'da aktif `state.id` (oyuna devam) |
| `ayarlar.ts` | `localStorage`'da arayüz ayarları (`{dil:'tr'\|'en', muzik:boolean}`); `kader-carki-ayarlar` anahtarı (§29). Kısa efekt sesi tercihi hâlâ ayrı: `ses.ts` (`kader_carki_ses_kapali`) |
| `i18n.ts` | Minimal arayüz sözlüğü (`metinler(dil)` → tipli metin nesnesi). Şu an SADECE ayarlar modalını kapsar — `EN` nesnesi `typeof TR` olduğu için anahtar kümeleri hep eşit. Menüler/olaylar hâlâ Türkçe (§29) |
| `basarimlar.ts` | `localStorage`'da kalıcı ünvan/efsanevi-ölüm koleksiyonu (çoklu-oyun meta) — KORUNDU, §31'in altına biner |
| `basarimSistemi.ts` | **Gerçek başarım sistemi (§31):** adlandırılmış/koşullu `BASARIMLAR[]` tanımları (2 dilli), ölümde `basarimlariDegerlendir(state)` + cihaz-yerel çapraz-oyun `OyunIstatistigi` + kilit-açılış kalıcılığı (`kader_carki_basarimlar_v2`) |
| `yapimci.ts` | Giriş "👤 Yapımcı" kartının statik içeriği (`YAPIMCI = {isim, tanitim, linkedin}`); geliştirici doldurur |
| `yolHaritasi.ts` | Giriş "🗺️ Yol Haritası" panelinin statik `YOL_HARITASI[]` listesi (`durum: tamam\|yapiliyor\|yakinda`) |
| `istemci.ts` | `istemciId()` (localStorage'da rastgele UUID — kişisel veri yok) + `ziyaretBildir()` (günde bir "ziyaret" istatistik ping'i, §32) |
| `gecmisHayatlar.ts` | `localStorage`'da ölen karakterlerin özeti (son 20; giriş ekranı "Geçmiş Hayatların" listesi). Skoru `skor.ts`'teki paylaşılan `hesaplaSkor`'dan alır (§18) — servet ≈ nakit (istemcide gayrimenkul değeri yok) |
| `skor.ts` | Sunucudaki toplamsal skor formülünün (§18) istemci aynası — `hesaplaSkorKirilimi`/`hesaplaSkor`. `gecmisHayatlar.ts`, `basarimSistemi.ts` ve ölüm ekranındaki eksen kırılım paneli (`App.tsx`) buradan besleniyor — tek bir yerde tutulup 3 ayrı kopyanın birbirinden sapmasının önüne geçildi |
| `envanter.ts` | Gizemli eşya etiketi → görüntülenecek ad/ikon/açıklama (`magaza_envanteri` için ayrıca §26) |
| `format.ts` | `formatPara()` — para tutarlarını (enflasyon artık ondalık üretebildiği için) en fazla 2 ondalıkla, gereksiz sıfırlar kırpılarak gösterir (§13/§27) |
| `bolgeTema.ts` | Bölgeye göre görsel tema; ayrıca `unUnvani` (ün → 8 kademeli ünvan), `aranmaYildiz` (suç seviyesi → 0-4 yıldız), `konutGoruntusuGetir` (konut kademesi+çağ → dönemsel ad/emoji) ve `meslekBinasiGetir` (meslek+çağ(+din_kultur) → sahnedeki işyeri binası ad/emoji) gibi sayı/id→gösterim dönüştürücüleri |
| `public/assets/sahne/<cag>/<tip>/{arka-plan,on-plan}.webp` | Opsiyonel bölge sahnesi görsel katmanları — `BolgeSahnesi` bunları önce arar, 404'te otomatik eski prosedürel SVG'ye döner (bkz. `public/assets/sahne/README.md`) |
| `ses.ts` | Kısa sentezlenmiş geri bildirim sesleri (Web Audio, dosya kullanmaz) — seçim sonucunda çalar |
| `muzik.ts` | Arka plan müziği denetleyicisi — `public/assets/muzik/` altındaki `.mp3`/`.ogg` dosyalarını mod bazlı (`menu`/`ortacag`/`sanayi`/`olum`) döngüde çalar, mod değişince yumuşak fade. Dosya yoksa (404) o parça sessizce atlanır. `App.tsx`'te bir `useEffect` [`ekran`, `karakter?.cag`, `muzikAcik`] değiştikçe `muzikModunuAyarla`'yı çağırır; Ayarlar → 🎵 Müzik toggle'ı `ayarlar.ts` `{muzik}` + `muzikSessizAyarla`. Parça dosyaları repoda (13 parça: menu×3, ortacag×3, sanayi×6, olum×1 — **hepsi kamu malı / CC0**, oyunda künye gerektirmez; hepsi ~96 kbps OGG + -16 LUFS, klasör ~34 MB); `public/assets/muzik/indir.sh` bunları Wikimedia Commons'tan (ABD askeri bando + Musopen PD Mark) yeniden çeker ve ffmpeg varsa aynı hedefe küçültür, `README.md`/`künye.txt` kaynakları listeler |
| `public/assets/muzik/<mod>-<n>.{mp3,ogg}` | Arka plan müzik parçaları — `muzik.ts` önce `.mp3` sonra `.ogg` dener (iOS Safari `.ogg` çalmaz) |
| `components/*.tsx` | Her biri tek bir panel/ekran parçası: `Banner` (açılış ekranı çağ/bölge şeridi), `UstSerit` (oyun ekranının üst şeridi — yıl/yaş/can/para/mutluluk/aranma modülleri; Ahlak modülü artık çıplak sayı değil, `bolgeTema.ahlakEtiketi` ile 6 kademeli bir sözel seviye — Zalim...Gurur Abidesi — gösterir), `AileOzetPaneli` (**sağ** panel `aile-blok`: eş/çocuk/evcil hayvan özeti — 2026-09'da `<h3>Ailen</h3>` başlığı + "yalnızsın" boş-durum metni KALDIRILDI, altındaki tek "Aileni Gör →" butonu yeter), `SiyasetPaneli` (sağ panel: hizip + dönem), `KariyerEkrani` (2026-09'da eski `GorevEkrani`'nin yerini aldı; ekran id `'kariyer'`, i18n `geBaslik`="Kariyer"/"Career". `AileEkrani` gibi TAM SAYFA açılır ekran, `.ekran.ekran-aile.ekran-kariyer` sınıfı, `TAM_EKRAN_GRUBU`'na dahil DEĞİL — doğal-yükseklik, sayfa kayar. Sahnedeki soldaki `🎖️` **Kariyer** tıklama noktasından açılır (`kariyerEkraniniAc`), bekleyen `yonetim_talep` varken 🔔. Bölümler: **Yönetimle Bağların** (§35 — iki ilişki hattı kartı + ilerleme barı + etkileşim/istek panelleri + dayatılan talep afişi; `yonetimDurum` prop'u) · **Ekibin** (Kov butonu, `onEkipCikar`) · **Karanlık İşler** (2026-09'da İşin & Yatırımların ekranından buraya taşındı, kullanıcı isteği — ▸/▾ açılır bir bölüm, `HatKarti`'nin "İstekler" toggle'ıyla aynı desen; içinde `KaranlikIsKart` listesi + `suc-seviyesi-gostergesi`, `onKotuIs`/`kotuIsler`/`sucSeviyesi` prop'ları §13'teki 5 aksiyonu değişmeden kullanır) · **Rakiplerin** (güç/husumet etiketi) · **Amir & Astların** · mesleğe özel güç metrikleri. Etkileşim/istek adları + `KARANLIK_ISLER` map bileşene gömülü TR+EN (`ETKILESIM_ADLARI`/`ISTEK_ADLARI`/`KARANLIK_ISLER`). Eski `KomutaSeridi.tsx`/`GorevEkrani.tsx` silindi), `FinansOzetPaneli` (sol panelde, Ün rozetinin altında, "Görevini Gör" butonundan önce — kompakt üç satırlık yıllık gelir/gider/net özeti; eskiden merkez sahnenin üstünde sadece "Yıllık gelir" gösteren tek satırlık `.merkez-sahne-ustbilgi` overlay'inin yerini aldı. `App.tsx`'teki bir `useEffect` [karakter?.id, karakter?.tur_sayisi, karakter?.meslek] değiştikçe `GET /:id/finans`'ı arka planda çeker ve `finans` state'ini günceller — bu widget'ın her turda taze kalması için; finans henüz çekilmeden ilk render'da gelir `karakter.maas_yillik` önbelleğinden, gider/net ise "…" placeholder'ından gösterilir), `SahneHotspotlari` (`.merkez-sahne` üstündeki 4 tıklama noktası — Kariyer/Yatırım/Evin/Sosyalleş; Mağaza sol panelde ayrı buton; hiçbiri ayrı görsel dosyası kullanmaz), `SonucEfekti` (seçim sonucu animasyonu), `GecmisGrafik` (gecmis[] çizimi), `HayatHikayesi`, `AileEkrani` (2026-09 sonunda eski `IliskilerPaneli.tsx` — dost/rakip ilişki kartı — buraya taşındı ve dosya silindi; `DostRakipKarti` artık `AileEkrani.tsx` içinde lokal bir bileşen, `aeKoken` kartının hemen altında render edilir; ekranın başlığı bu yüzden "Ailen" → "Ailen & İlişkilerin" oldu), `FinansEkrani`, `IsYatirimEkrani` (işyeri hotspotundan doğrudan açılan birleşik "İşin & Yatırımların" ekranı — eski `IsDetayEkrani`+`YatirimEkrani` ikilisinin yerini aldı, bkz. yukarıdaki madde), `IsyeriPaneli` (sağ panelde her zaman görünen küçük özet — `IsYatirimEkrani`'nden ayrı, oraya dokunulmadı), `EnvanterPaneli` (gizemli eşyalar + `magaza_envanteri`, "Kullan" butonuyla, sol panelde), `MagazaPaneli` (şifa/lüks sekmeleri, §26), `SosyallesmePaneli`, `EvlilikPaneli` (olay dışı evlenme — 2 aday kartı + uyum yüzdesi, sol panelde bekarken görünen "💍 Evlilik" butonuyla açılır, §16 "Olay dışı evlenme"), `DurumPaneli`, `HaberlerPaneli`, `KisilikPaneli`, `KarakterAvatari`, `BolgeSahnesi`, `BolgeBilgisiPaneli`, `EtkiCipleri`, `AyarlarModal` (dişli düğmesi / ana ekran "⚙️ Ayarlar" ile açılan ortalanmış modal — 2 sekme: Genel [dil + kısa efekt sesi + 🎵 arka plan müziği (`muzikAcik`/`onMuzikToggle`) + oyun ortasındayken **"🏠 Ana Menüye Dön"**, `onAnaMenu` prop'u; oyun kaydını SİLMEZ, `setEkran('giris')`] / Görüş & Öneri [geri bildirim formu]. `baslangicSekme` prop'u ile hangi sekmeyle açılacağı seçilebilir — geri bildirim CTA'sı bunu kullanır, §29), `BasarimGaleri` (gerçek başarım galerisi modalı, §31), `YapimciKarti`/yol haritası giriş panelleri (App.tsx içinde inline) |

**2026-09 mobil/kompaktlık turu (kullanıcı isteği — "tek ekrana sığsın"):**
- **Sabit para rozeti** `.oyun-para-rozeti` (App.tsx, sol üst, `position:fixed`): `yatirim`/`sosyallesme`/`magaza`/`aile`/`kariyer`/`finans`/`evlilik` ekranlarında `💰 {para} {birim}` her zaman görünür. `oyun`/`sonuc`'ta gösterilmez (zaten `UstSerit`'te para modülü var).
- **Sosyalleş aksiyon sonucu** (içki/deli/sadaka/kulak/ısmarla/fal) artık inline `.sosyal-aksiyon-mesaj` değil, `.kariyer-sonuc-modal` açılır penceresi (`SosyallesmePaneli` içinde `sonMesaj` state). Para rozeti + mekân olayı akışı değişmedi.
- **`AmacPaneli`** (sağ panel varyantı `amac-paneli-panel`): açıklama satırı `title`'a taşındı (`.amac-paneli-panel .amac-aciklama{display:none}`), boşluklar daraltıldı; ölüm ekranı varyantı (`amac-paneli-olum`) tam detay gösterir, dokunulmadı.
- **Açılış ekranı** (`.ekran-acilis`, meslek seçimi buraya gömülü): `.acilis-ust` artık **yatay tek satır** — `KarakterAvatari` SOLDA küçük (`clamp(56px,…,84px)` / mobil 52px), `Banner` (ülke+tarih) SAĞDA (`flex:1`). `BolgeSahnesi` açılıştan tamamen çıkarıldı (oyun ekranında zaten var). Kişilik detay rozetleri mobilde gizli (eksen çubukları kalır). **Aile geçmişi anlatısı (`.acilis-metni`) kırpılmaz** — `max-height` bol (masaüstü 340px / mobil 240px), pratikte tam görünür. Meslek kartları `min-height:0` + küçük simge/padding ile dikeyde toplandı (~81px, mobil).
- **Meslek kartı renk bug'ı düzeltildi**: `.ekran-acilis button:not(.ikincil)` altın-gradyan kuralı meslek kartlarına biniyordu (soluk altın başlık + altın zemin = okunmaz). Kural `:not(.meslek-kart)` ile hariç tutuldu → kartlar `.ekran-kurulum .meslek-kart` koyu stilini korur; başlık/açıklama/yatkınlık metin renkleri kontrastı artırıldı (`.acilis-meslek-kartlari` + `.ekran-acilis` seçicileri, App.css).
- **`AmacPaneli` panel açıklaması**: tamamen gizli DEĞİL — 0.68rem, 2 satıra `-webkit-line-clamp`, tam metin `title`'da.

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
model Metrik {              // §32 — append-only oyun metriği (Neon'da kalıcı)
  id Int @id @autoincrement()
  tur String               // ziyaret | yeni_oyun | meslek_secim | olum | skor_kaydi
  istemci_id String        // tarayıcıda üretilen rastgele UUID (tekil kişi tahmini)
  oturum_id, cag, bolge, yerlesim, meslek, olum_nedeni, meta String @default("")
  yas, tur_sayisi, oturum_sn Int @default(0)   // oturum_sn: gerçek-zaman süre (sn), yalnız olum
  servet, skor Float @default(0)
  createdAt DateTime
  @@index([tur]) @@index([createdAt])
}
model GeriBildirim {          // §29 — "Görüş & Öneri" formu kayıtları (Neon'da kalıcı)
  id String @id              // randomUUID
  kategori String @default("diger")   // hata | oneri | diger
  mesaj String
  iletisim String?
  baglam String @default("{}")        // JSON.stringify'lı oyun bağlamı nesnesi
  ip String?
  createdAt DateTime
  @@index([createdAt])
}
```

`Session.data` **tam state'in düz JSON'udur** — CharacterState'e yeni bir alan eklemek şema migrasyonu gerektirmez, ama eski kayıtlarda o alan `undefined` olacağından geriye dönük varsayılan/opsiyonel ele alınmalı.

**Geri bildirim (§29) artık Prisma/Neon KULLANIR** (2026-09'da yükseltildi — eski `server/data/geri-bildirim.jsonl` + `GERI_BILDIRIM_DOSYA` yolu KALDIRILDI: Render "free" diskinde her restart'ta siliniyordu). `geriBildirimDeposu.ts` `prisma.geriBildirim`'e yazar/okur (ateşle-unut; migration `prisma/migrations/20260910_geribildirim/`). `webhookBildirimGonder` hâlâ opsiyonel olarak ayrıca çağrılır (anlık Discord/Telegram haberi). Okuma: `GET /api/geri-bildirim?key=<GERI_BILDIRIM_ANAHTARI>` → son 200 kayıt, en yeni üstte.

## 21. Moderasyon

[kufurFiltresi.ts](server/src/moderasyon/kufurFiltresi.ts): sadece liderlik tablosu **isim** girişinde kullanılır. Türkçe karakterleri sadeleştirir (`ı→i, ğ→g, ü→u, ş→s, ö→o, ç→c`), leetspeak normalize eder (`4/@→a, 3→e, 1→i, 0→o`), alfasayısal olmayanı siler, ardından TR+EN küfür kök listesiyle `includes` eşleşmesi yapar. NLP değil, basit ilk savunma hattı.

## 22. Test & Analiz Araçları

`server/tests/` — Vitest, `gameFlow, tepki, konut, kotuIsler (karanlık işler paneli, §13 — eski `yatirim.test.ts` bu özellik kaldırılınca silindi), miniOyunlar (Hazard/Üç Kağıtçı/Bilek Güreşi, §13), mulkVeSucSistemi, hapishane, yolculuk, hizipOlaylari, saray, sehirYonetimi, evcilHayvan, gizemliEsyalar, astVeAile, meslekMetrikleri, moderation, persistence, tagMotoru, tonalDenge (ağır/hafif ton dengesi), donemselOlaylar, dinOlaylari, askerDinAdamiYollari, derinlikMekanikleri, basarimlar, aranmaSeviyesi, sosyallesme, magaza, donemselDunyaOlaylari (enflasyon + savaş/veba/kriz/bağış, §27), sucKazanci (suç işleyerek para kazanma motor kuralı, §9 adım 3.5), yaslanma (pasif regen tavanı + ileri yaş ecel riski, §13), rutbe (5 kademeli rütbe reformu, §14), istatistik (metrik özeti toplama + ziyaret olayı doğrulayıcısı, §32), evlilik (olay-dışı evlenme akışı, §16), aileEkrani (eş/çocuk etkileşimi + `aileYillikUygula` decay/talep, §33), yonetimBaglari (Kariyer sayfası yönetim etkileşim/istek/talep + `yonetimYillikUygula` decay/talep, §35), olayKapsami (§12 uygunMu üst-sınır kapsama matrisi + havuz-kilit alt sistem boyutları, "az olay var" turu Faz 1), tekrarOnleme (`sonKTekrarOnlemeHesapla` + hapis havuzunda gerçek tekrar sıklığı, Faz 2), zanaatkarOlayFrekansi (4. meslek Zanaatkâr'ın 130 olaylık özel havuzunun — 45+45 kariyer yolu + 20+20 standalone — bir ömürde ortalama kaç kez tetiklendiğini gerçek `senaryoUret`/`secimUygula` ile 120 ömürlük Monte Carlo simülasyonuyla ölçer; sonuç: Orta Çağ'da ortalama ~4.7, Sanayi Devrimi'nde ~3.7 olay/ömür — ortalama ölüm yaşı ~45-50 olduğundan 130'luk havuzun tamamı tek ömürde görülmez, beklenen davranış), havuzGarantisi (standalone havuz garantisi — §11 kural 15, `standaloneHavuzGarantisiSec`)`. Bir mekanik değiştirilirken **ilgili test dosyasını çalıştır**, tüm 48K satırlık veriyi elle doğrulamaya çalışma.

> **Sim script'leri (2026-09 "kendi işine yatırım" kaldırılınca):** `scripts/simulate5YilOrtalama.ts`, `simulateBazTarzlar.ts`, `simulateEkonomiAnaliz.ts`, `simulateFullPlaythroughs.ts`, `simulateKisilikler.ts` tekrar çalışır durumda — silinmiş `yatirimYap`/`yatirimConfigGetir` çağrıları `scripts/_yatirimShim.ts` (no-op: sonsuz maliyet → yatırım adımı sessizce atlanır, ilgili sayaçlar 0 kalır) üzerinden karşılanıyor. İleride bu adımı gerçek bir mekaniğe bağlamak istenirse çağrıları `gameEngine.kotuIsYap`/`kotuIsConfigGetir`'e taşıyıp shim'i silin. `simulateFullPlaythroughs.ts` artık `_simPrismaStub`'ı import ediyor (eski `DATABASE_URL="file:./simulation.db"` yolu Postgres'e taşınınca çalışmıyordu). `npm test` bunlardan etkilenmez (script'ler tsc/test kapsamında değil).

**`npm test` çalışır** (2026-09'da onarıldı): eski `tests/globalSetup.ts` her koşuda `prisma migrate deploy`'u SQLite `DATABASE_URL` ile çağırıp şema PostgreSQL'e taşındığından P1012 ile tüm paketi çökertiyordu. Artık `vitest.config.mts` `@prisma/client`'ı **`tests/_prismaStub.ts`** (bellek-içi Prisma taklidi) alias'lar, `globalSetup` no-op'a indirildi — testler gerçek bir DB kurmadan koşar (gameEngine oturumları zaten `oturumlar` Map'inde tutuyor). Gerçek bir test PostgreSQL'ine geçilirse alias'ı kaldırıp globalSetup'ı geri getir. Saf-fonksiyon doğrulaması için bağımsız `npx tsx scripts/verify*.ts` script'leri de duruyor.

`server/scripts/`: `simulateGayrimenkul.ts` (npm script'e bağlı değil; `npx tsx scripts/simulateGayrimenkul.ts`, env `SIM_N`/`SIM_YIL`) — her piyasa mülkünün **30 yılda ilk yatırıma oranla net kâr/ROI'sini** Monte Carlo ile ölçer. Gerçek `mulkGetiriOraniHesapla` + `mulkGelirleriUygula` (bakım dahil) + gerçek arka plan dünya olaylarını (`buyukSavasKontrolEt`/`vebaBaslamaliMi`/`kucukKrizKontrolEt` vb.) çalıştırır; yalnız `ulke.ekonomi`/`nufusDurumu`/isyan/altın-çağ hafif bir kalıcılıklı örnekleyiciyle taklit edilir (olay `ulke_etkisi`'ne bağlı oldukları için). DB gerektirmez. `simulateEconomy.ts` (bin ömür simüle edip ekonomik dengeyi raporlar), `analyzeOlaylar.ts` (olay bankası dağılım istatistikleri + gerçek `olaySec()` ile olay-görülme sıklığı simülasyonu), `listUniversal.ts` (kısıtsız/evrensel olayları listeler), `simulateFullPlaythroughs.ts` (npm script'e bağlı değil; `SIM_N=100 npx tsx scripts/simulateFullPlaythroughs.ts` — DB gerektirmez, `_simPrismaStub` ile bellek-içi çalışır — `simulateEconomy.ts`'ten farklı olarak olay içeriğini örneklemez, gerçek `gameEngine.ts` orkestrasyon fonksiyonlarını (`senaryoUret`/`secimUygula`/`yatirimYap`/`magazadanSatinAl`/`konutDegistir`/`mulkSatinAl`/`sosyallesmeYerineGit`/`zarAt` vb.) doğrudan çağırarak her çağ×meslek kombinasyonu için `SIM_N` adet — varsayılan 100 — tam ömür oynatan bir "bot oyuncu" simülasyonudur; sonuçları `simulateFullPlaythroughs.sonuc.json`'a yazar. `analyzeFullPlaythroughs.ts` o JSON'u çağ×meslek bazında özetler (`simulateFullPlaythroughs.analiz.json`). HTTP/rate-limiter'ı atlar; ayrı bir `simulation.db`'ye yazar, gerçek `dev.db`'ye dokunmaz.

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

- `SonucEtkisi.hayat_amaci_ata` alanı hâlâ tanımlı ve `gameEngine.ts:1116`'da eski tekil `state.hayat_amaci`'yi set ediyor — ama tekil sistem 2026-09'da **3'lü `hayat_amaclari` sistemiyle** değiştirildi (§18) ve bu alanı set eden aktif bir olay yok. Kesin ölü kod; `hayat_amaci` alanı yalnız eski kayıt/test + `hesaplaSkor` ×5 fallback'i için duruyor.
- Eski `hayatAmaciKontrolEt(state)` (stateManager) hâlâ export'lu ve `sonucuUygulaVeIlerlet`'te çağrılıyor ama yalnız eski tekil `state.hayat_amaci` doluyken (test/eski kayıt) iş yapar; yeni sistem `amaclariHerhangiKontrol` kullanır.
- ~~Zorlanan olayların `uygunMu` bypass'ı (hapiste/veba_hastasi iken evlilik teklifi zorlanabiliyor)~~ — **2026-09'da düzeltildi** (§34.1): `senaryoUret` milestone kaskadı `milestoneKilitli` ile korunuyor.
- ~~`olaySec` bazı state kombinasyonlarında `throw` edip oyunu kalıcı kilitliyordu~~ — **2026-09'da düzeltildi** (§34.1): artık son çare fallback'e düşer, hiç throw etmez.
- `client/src/types.ts`, `server/src/types.ts`'in **elle** senkronize edilen bir kopyası — otomatik tip paylaşımı (monorepo/paket) yok. `CharacterState`/`SonucEtkisi` değiştirince ikisini de güncelle.
- **`basarisizSonuc.mesaj: "Kullanılmadı."` placeholder kalıbı** (2026-09 denetimi): olay bankasında `basarisizSonuc`'u salt `"Kullanılmadı."`/`"Kullanılmadı"` olan seçenekler var. İki grup:
  - **`baseBasariSansi < 100` iken (ERİŞİLEBİLİR — bug'dı):** 2026-09'da 15 tanesi bulundu ve düzeltildi. 12'si "gizli envanter/evcil hayvan/evlatlık izci = garantili sonuç" şıkkıydı, biri fat-finger'la 90-95'e ayarlanmıştı → **100'e çekildi** (metin değişmedi). 3'ü gerçek başarısızlık dalı hak ediyordu (`hac_ortodoks_deniz_3`, `dunya_savas_biter` yoldaş-satan, `komik_kecinin_donusu` kaç-şıkkı) → **80-90'a düşürülüp iki dilli başarısızlık metni yazıldı**. Ayrıca önceki turdan 9 seçenek daha (kara kılıç/ejderha tılsımı/şahin bekleme/tefecilik/muhasebeci/suçu üstlen/gölge pazarı/fısıldayan taş) düşürülmüştü. `onTepki`'li şıklarda `baseBasariSansi`+`basarisizSonuc` zaten ölü (zar atılmaz) — onlar dokunulmadı. Denetim script'i: `OLAY_BANKASI` üzerinde `basarisizSonuc.mesaj==="Kullanılmadı." && (baseBasariSansi??100)<100 && !onTepki` → **şu an 0**.
  - **`baseBasariSansi: 100` iken (ERİŞİLEMEZ — kasıtlı, ~31 seçenek):** "gizli envanteri harcayıp garantili kurtuluş" (sirli_iksir çocuğu iyileştirir, olunun_yuzugu işi kurtarır...), saf anlatı kapanışı (çocuk zaten iyileşti/öldü), güvenli vazgeçme şıkları (hayvanı reddet, uzaktan izle). `rollSuccess(100)` her zaman `true` → `basarisizSonuc` erişilemez ölü koddur, placeholder zararsız. **Tekrar "hata" diye işaretleme.**

## 25. Sosyalleşme Mekânları

Karakterin çağına/bölgesine/mesleğine göre gidebileceği, oyuncunun **kendi seçtiği** sosyal mekânlar — hapis/yolculuk gibi bir "alt sistem", ama etikete değil doğrudan oyuncu aksiyonuna bağlı.

**Mekân kataloğu (2026-09'da 10 → "3 slot"):** [sosyallesmeYerleri.ts](server/src/data/sosyallesmeYerleri.ts), `SOSYALLESME_YERLERI: SosyallesmeYeri[]` — 6 id kaldı, oyuncu aynı anda **en fazla 3** görür: (1) her zaman `pazar_meydani` (evrensel), (2) çağa göre bir alkollü mekân — `pub` (Sanayi+İngiltere) yoksa `meyhane` (diğer tüm bölgeler; Selçuklu/Eyyubiler dahil — İslam bölgesinde içki sisteminde boza/şerbet + ahlak cezalı "gizli kadeh" sunulur), (3) mesleğe özel — `ordugah_cadiri` (Asker, alkollü), `dini_meclis` (Din Adamı), `lonca_meclisi` (Tüccar). Kaldırılan `hamam`/`kahvehane`/`kervansaray` → `pazar_meydani`, `salon` → `meyhane`; olayları da bu id'lere remap edildi (perl one-liner, `sosyallesme.ts`). `.en.ts` aynası olay id'siyle anahtarlandığı için dokunulmadı; remap edilen bazı olayların metni yeni mekâna tam oturmayabilir (kabul edilmiş takas).

**Olay havuzu:** [sosyallesme.ts](server/src/data/olaylar/sosyallesme.ts), `OLAY_SOSYALLESME` (73 olay; remap sonrası dağılım: pazar_meydani 28 · meyhane 19 · ordugah_cadiri 8 · pub/dini_meclis/lonca_meclisi 6'şar). Her olay `sosyallesmeYeri: string` alanıyla bir mekâna bağlanır (§6 `OlayTanimi`). **Bu alan set edilmiş her olay, `olaySecici.ts`'teki `uygunMu` içinde normal rastgele havuzdan tamamen dışlanır** — bu olaylar SADECE mekân seçimiyle gelir. Alkollü mekânların olayları `minYas:18` taşır.

**Tur harcamayan aksiyonlar (2026-09 — kullanıcı: "içki içmek, deliyle konuşmak gibi şeyler olsun, olaylara atmasın, oranın içinde kalalım"):** Mekân→olay yönlendirmesinin yanına, oyuncunun ekrandan çıkmadan yaptığı, **zaman ilerletmeyen** küçük etkileşimler eklendi ([sosyallesmeAksiyonlari.ts](server/src/data/sosyallesmeAksiyonlari.ts) + gameEngine `sosyallesmeAksiyonConfigGetir`/`sosyallesmeAksiyonYap`, `GET/POST /:id/sosyallesme-aksiyon(lar)`). Etkiler jitter'sız ve doğrudan (mini oyun deseni). Her aksiyonun yıl-cinsinden bir cooldown'ı var (`state.sosyallesme_aksiyon_kilit`, `AKSIYON_COOLDOWN`).
- **İçki iç** (`icki:<id>`, cooldown 1): `BOLGE_ICECEKLERI[`${cag}|${bolge}`]` → çağ/bölgeye uygun **isimli** 2-3 içecek (OÇ Fransa "bir sürahi kırmızı şarap", Rusya "bir kadeh votka", Sanayi İngiltere "porter birası", İslam bölgeleri "boza/şerbet" + `gizli:true` "gizlice bir kadeh şarap/rakı"). Alkolsüz → mutluluk +3, sağlık +1, fiyat ~3×enfl. Alkollü → mutluluk +6, sağlık −2, fiyat ~5×enfl, `ayyasZiyaretiIsle` çağrılır (ayyaşlık sayacı + rising-edge damga). `gizli` → ayrıca ahlak −4, ün −2. (2026-09 ikinci denge turu: değer/fiyat büyük denge turundan sonra yükseltildi, fiyatlar önceki ~2/3×enfl'den.)
- **Deliyle konuş** (`deli`, cooldown 3, ~2×enfl): 6 rastgele sonuç — `istihbarat_var` etiketi (sıradaki senaryoda net şans) · +7 mutluluk kahkaha · −4 mutluluk tedirginlik · +4 ün "cömert adam" (ek maliyet ~2×enfl) · +4 ahlak/+3 mutluluk lucid · +2 mutluluk nötr/hafif.
- **Sadaka ver** (`sadaka`, cooldown 2, ~4×enfl): ahlak +4, mutluluk +3, ün +2. (`varyant:"az"/"cok"` parametresi route'ta kabul edilir ama `sosyallesmeAksiyonYap`'ta kullanılmaz — tek kademeli, ölü parametre.)
- **Kulak kabart** (`kulak`, cooldown 1, bedava — fiyatı artırılmadı): %25 `istihbarat_var` · %10 −2 mutluluk · aksi halde rastgele bir `haberleriUret` satırı.
- **Birine içki ısmarla** (`ismarla`, cooldown 3, ~7×enfl, yalnız alkollü mekân uygunsa): mutluluk +7, ün +4, dost_puani +3.
- **Fal baktır** (`fal`, cooldown 4, ~5×enfl): %55 kozmetik +3 mutluluk · %20 +10 mutluluk · %15 −8 mutluluk · %10 `istihbarat_var`.
Server EN karşılıkları [anlatim.en.ts](server/src/i18n/anlatim.en.ts)'te. İstemci: `SosyallesmePaneli` üstte "🍺 İçki & Etkinlikler" bölümü (içki çipleri + aksiyon kartları, sonuç mesajı inline; `App.tsx` `sosyalAksiyonHandler` her aksiyondan sonra config'i tazeler). Bu aksiyonlar mekân→olay akışını değiştirmez; onun yanında dururlar.

**Akış (mekân→olay — 2026-09'da yeniden kurgulandı: TUR HARCAMAYAN + turda mekân başına 1 kez, max 3 olay):**
1. `GET /:id/sosyallesme-yerleri` → `sosyallesmeYerleriGetir` — çağ/bölge/mesleğe uyan + en az bir uygun olayı olan mekânları döner (`hapiste`/`yolculukta` iken boş). Her karta `kilitli`/`kalanYil` eklendi: bir mekân olayı çözülünce o mekân `SOSYALLESME_MEKAN_COOLDOWN=2` yıl kilitlenir (`state.sosyallesme_aksiyon_kilit["mekan:<id>"]` = `state.yil`). Aynı turda (zaman ilerlemediği için) 3 farklı mekâna girilebilir ama her birine yılda 1 kez.
2. `POST /:id/sosyallesme {yerId}` → `sosyallesmeYerineGit` — cooldown + para kontrolü, peşin giriş ücreti (`SOSYALLESME_GIRIS_UCRETI=3`) düşer, `sosyallesmeIcinOlaySec` ile bir olay `oturum.zorlananOlayId`'ye yazılır. **Tur harcamaz.**
3. İstemci `POST /:id/scenario` ile olayı çeker ama **ana oyun ekranına GEÇMEZ** (kullanıcı: "oranın içinde kalalım"). Olay, Sosyalleş ekranındaki `.sosyal-olay-katman > .sosyal-olay-karti` içinde satır içi render edilir (App.tsx `sosyalOlay`/`sosyalOlaySonuc` state'leri + `SosyallesmePaneli.olayAcik`/`olayIcerik`). Seçenek JSX'i ana HUD deseniyle aynı (belirsiz aralık + `etkiTahminiGetir` çipleri).
4. `POST /:id/sosyallesme-olay {secenekIndex}` → **`sosyallesmeOlayCoz`** — normal `/choice` pipeline'ının aksine `ilerletYas`/`pasifEkonomi`/`yaşlanma`/`rütbe`/`haber` **çalışmaz**; yalnız seçimin `SonucEtkisi` deltaları + para primi/meslek çarpanı + `sucKazanciUygula` + sosyalleşme moral/masraf/ayyaş kuralı + (olay öldürücüyse `olum`/`olum_sansi`) ölüm zarı uygulanır (`efektifOlumSansi` + `checkDeath` — meyhane bıçağı hâlâ öldürebilir). Sosyalleşme olayları `onTepki`/`zorunlu_sonraki`/`yeni_meslek`/`kriz`/`es_ata` içermez (banka denetlendi); `ekip_ekle` (1×) + `unvan_kazan` (2×) + `durum_sil` (ayyaş çıkışı) elle ele alınır. Çözülünce mekân kilitlenir, `zorlananOlayId` temizlenir. `{state, basarili, uygulananEtki, mesaj}` döner.
5. Sonuç `EtkiCipleri` + özet + "Devam Et" (`sosyalOlayKapat`: kartı kapat + `sosyallesme-yerleri`/`sosyallesme-aksiyonlar` tazele — mekân/içki cooldown'ları değişmiş olabilir). Ölümde `ekran='olum'`. "Geri Dön" doğrudan `ekran='oyun'` (tur hiç harcanmadığı için `senaryo` bayat değil, tazeleme yok).

**Sosyalleşme maliyeti + moral (büyük denge turu — kullanıcı: "sosyalleşme daha masraflı olsun ama moral yükseltsin"):** `sosyallesmeYerineGit` artık enflasyonla ölçekli bir **peşin giriş ücreti** (`SOSYALLESME_GIRIS_UCRETI=3`) düşer (`para < ücret` ise reddeder); dönüşe `girisUcreti` eklendi. Ayrıca `sonucuUygulaVeIlerlet`'te `mevcutOlay.sosyallesmeYeri` varken motor kuralıyla `mutluluk += SOSYALLESME_MORAL_BONUSU (4, jittersiz)` ve `para -= SOSYALLESME_EK_MASRAF (2, enflasyonlu)` uygulanır — 73 sosyalleşme olayını tek tek elden geçirmeden. `sosyallesme.ts` olayları ayrıca mutluluk-denge pastından geçti.

**Ayyaşlık mekaniği** (gameEngine.ts `sonucuUygulaVeIlerlet`, `AYYAS_ESIGI=3`): Çözülen olayın `sosyallesmeYeri`'si `alkolluMu:true` bir mekâna aitse `state.alkol_ziyaret_sayisi` her seferinde 1 artar (başarı/başarısızlık fark etmez). Sayaç eşiğe (**3**) ulaştığında ve karakterde henüz `bagimlilik:ayyas` yoksa (rising-edge, tek seferlik): `bagimlilik:ayyas` + `bagimlilik:var` etiketleri eklenir, **ahlak -10, ün -15** anında düşer, kalıcı bir `Durum` (`id:"ayyaslik"`, `tur_basi_saglik:-1`, `tur_basi_mutluluk:-1`) eklenir, `maasCarpaniUygula(state, 0.95)` ile kalıcı %5 gelir cezası uygulanır, ve `zamanAnlatimi`'ne bir uyarı cümlesi eklenir. **Tek çıkış yolu:** `sosyal_meyhane_ayilma` (meyhane havuzunda, `gerekliEtiketler:["bagimlilik:ayyas"]`) — başarılı seçimi etiketi ve durumu kaldırıp telafi eder; bu olay dışında bağımlılığı geri alan hiçbir mekanizma yoktur (mevcut `bagimlilik:kumarbaz`/`bagimlilik:afyon` etiketleriyle aynı "kalıcı flavor" felsefesi).

`client/src/components/SosyallesmePaneli.tsx` sırayla: **"🍺 İçki & Etkinlikler"** (tur-harcamayan aksiyonlar, yukarıda), "🎲 Kumar & Meydan Oyunları" (3 mini-oyun, §13), "🍺 Gidebileceğin Mekânlar" (≤3 mekân kartı — açıklamalar `title`'a alındı). **`olayAcik` iken** bu üç bölüm + "Geri Dön" gizlenir, yerine `.sosyal-olay-katman > .sosyal-olay-karti` (App.tsx'ten `olayIcerik` node'u) gelir — mekân olayı ekrandan çıkmadan burada çözülür (yukarıdaki Akış 3-4). **2026-09'dan beri ayyaşlık ziyaret-sayacı uyarısını GÖSTERMEZ** (oyuncu `alkol_ziyaret_sayisi`'nin `AYYAS_ESIGI`'ye ne kadar yaklaştığını görmesin — damga sürprizle vurulsun; sunucu `ziyaretSayisi`'ni hâlâ döndürüyor, istemci yok sayıyor). `App.tsx`'te sahne hotspot'undan açılır. Testler: [sosyallesme.test.ts](server/tests/sosyallesme.test.ts).

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

**İstemci:** `MagazaPaneli.tsx` iki sekmeli (Şifa/Lüks) bir mağaza ekranı; kilitliyken sifa kartları disabled + kilit banner'ı gösterir, sahip olunan luks kartları "· Sahipsin" etiketiyle disabled görünür (mülk kartlarıyla aynı `mulk-kart-sahip` stili). **2026-09 sadeleştirme turunda kart metni inceltildi**: serbest `aciklama` + uzun `mpSifaSans` cümlesi `title`'a taşındı; kartta tek satır etki özeti (`❤️ +N · 😊 +N · %min-max fayda · ~Ny raf ömrü`) + fiyat kaldı. `EnvanterPaneli.tsx` hem gizemli eşyaları hem `magaza_envanteri`'ni listeler, `sifa` eşyalarında bir "Kullan" butonu ve kalan yıl uyarısı gösterir. `App.tsx`'te oyun ekranının üst satırında "🛒 Mağaza" butonuyla açılır (Sosyalleş'in yanında). Testler: [magaza.test.ts](server/tests/magaza.test.ts).

**Mimari not — gelecekteki "isimli/kişilikli iş arkadaşları" ve "derinleşen ilişkiler" için:** Bu sistem bilinçli olarak `EkipUyesi` (§4) ve ilişki puanlarından (`dost_puani`/`es_puani`/`sadakat`) bağımsız, ayrı bir envanter katmanı olarak kuruldu — `SahipOlunanEsya` kendi id/ad/simge/kategori alanlarını taşıdığı için, ileride bir "hediye et" etkisi (`ekip`/`es`/`dost`'a bir mağaza eşyası vererek ilişki puanı artırma) `magaza_envanteri`'nden bir kaydı çıkarıp ilgili puana delta uygulayan tek bir yeni fonksiyonla eklenebilir — ne katalog şemasının ne de mevcut satın-alma/kullanma akışının değişmesi gerekir. Şu an böyle bir "hediye" etkisi **yok**; bu sadece mevcut şemanın buna kapalı olmadığının notu.

## 27. Dünya Olayları: Zorunlu Bağış / Büyük Savaş / Veba / Küçük Kriz

Sosyalleşme/mağaza gibi oyuncu aksiyonuna bağlı değil; bunlar **tamamen arka planda** ([stateManager.ts](server/src/game/stateManager.ts)'teki saf fonksiyonlarla) tetiklenen, hiç olay ekranı gerektirmeyen periyodik mekanikler — **veba tek istisna** (aşağıya bakın). Hepsi `gameEngine.ts`'teki `sonucuUygulaVeIlerlet`'in yıl-ilerletme bloğunda (§9 adım 15), mevcut `krizEtkisiUygula`/`orduBuyumesiDene` ile aynı yerde, **turdaki HER yıl için ayrı ayrı** kontrol edilir (`orduBuyumesiDene`'deki `for (let i=0;i<yasArtisi;i++)` deseniyle aynı — bir tur 1-2+ yıl sürebildiği için "yıllık %X" ifadesinin gerçekten yıllık kalması için gerekli). Tetiklenirse sonuç mesajı, ayyaşlık bildirimiyle aynı "koşulsuz ekle" desende doğrudan `zamanAnlatimi`'ye + `hayat_hikayesi`'ne eklenir (§9'daki tek-slotlu `ekCumle` önceliğinden bağımsız). Hepsi `hapiste`/`yolculukta` etiketliyken o tur atlanır (kaybolmaz, ertesi turda tekrar denenir).

**Zorunlu Bağış** (`zorunluBagisKontrolEt`) — *"kral zenginleştiğini fark etti, bağış istiyor"*: nakit+mülk toplamı (`gayrimenkulDegeriHesapla`) `ZORUNLU_BAGIS_ESIGI`'yi (**350**) aşınca ve son tetiklenmeden (ya da `baslangic_yili`'den) beri **en az 5 yıl** geçmişken, her yıl **%30** ihtimalle tetiklenir; tetiklenince servetin **%20-25**'i (`paraYuvarla`) `para`'dan zorla düşer, `son_zorunlu_bagis_yili` güncellenir. **Zenginliğin TEK bedeli budur** — eski pasif %4/yıl "zenginlik vergisi" (§13) kaldırıldı. `dunyaFinansEtkileri` bu satırı 2026-09'da bıraktı (mekanik arka planda aynı, görünürlük kaldırıldı).

**Rakip Soygunu** (`rakipSoygunKontrolEt`, [stateManager.ts](server/src/game/stateManager.ts)) — *"üzerinde çok nakitle dolaşmanın kişisel bedeli"*: NAKİT (`state.para`, gayrimenkul hariç) ≥ **150** ve son soygundan (ya da `baslangic_yili`'den) beri **8 yıl** geçmişken, turdaki her yıl **%3.5** ihtimalle isimli rakip (`rakip_adi`) nakitin **%25-45**'ini (min 10) alıp kaçar; `rakip_puani -= 12`, `mutluluk -= 6`, `son_rakip_soygun_yili` güncellenir. `hapiste`/`yolculukta` iken atlanır. Zorunlu bağış / zenginlik sızıntısı desenindeki gibi olay ekranı yok — sonuç `zamanAnlatimi`'ye + `hayat_hikayesi`'ne eklenir, `TurNakitAkisi.rakipSoygun` kalemine yazılır. Sabitler `stateManager.ts` başındaki `RAKIP_SOYGUN_*`.

**Büyük Savaş** (`buyukSavasKontrolEt`/`buyukSavasBitisKontrolEt`): SADECE `!state.ulke.savasta` iken kontrol edilir — bu yüzden mevcut "tarihi savaş ilanı" mekanizmasıyla (§11 kural 1, sabit tarihli, tek seferlik) asla üst üste binmez; hangisi önce `ulke.savasta`'yı `true` yaparsa öbürü sessizce beklemeye devam eder. Son savaşın bitişinden (ya da `baslangic_yili`'den) beri **en az 10 yıl** geçmişken, her yıl **%10** ihtimalle başlar. Başlayınca: düşman `tarihiSavasKontrol(bolge,yil,cag) ?? komsuGucSec(bolge)` ile seçilir (aynı iki fonksiyon `{komsu}` placeholder'ının kullandığıyla birebir aynı, §6/§16), süre **3-6 yıl**, `state.buyuk_savas = {dusman, baslangicYili, bitisYili, vergiOrani: 0.08-0.12, gidaCarpani: 1.15-1.25}`, `ulke.savasta=true` (2026-09 denge turu: eskiden 0.15-0.20/1.25-1.35 idi, üç etki üst üste binince gelir kaybı %35-40'a çıkıyordu — yumuşatıldı). Savaş sırasında `ulke.savasta`'yı zaten okuyan TÜM mevcut formüller (maaş ×0.85, mülk getirileri, mağaza fiyatları, ordu kaybı/büyümesi, kervan batma riski) otomatik devreye girer; ayrıca `giderKalemleriHesapla`'da **iki yeni etki** biner: `yasam` gideri `gidaCarpani` ile çarpılır, ve ayrı bir `savasVergisi` kalemi (`maas_yillik × vergiOrani`) pasif gelirden ek olarak kesilir (Finans ekranında "⚔️ Savaş vergisi" satırı). Süre dolunca `ulke.savasta=false`, `son_buyuk_savas_bitis_yili` yazılır, 10 yıllık cooldown yeniden başlar.

**Veba** (`vebaBaslamaliMi`/`vebaBaslat`/`vebaYillikKontrol`/`vebaHastaligiKontrol`/`vebaBitisKontrolEt`) — 2026-09'da model YENİDEN KURGULANDI (kullanıcı: "yıllık oran ölüm değil hastalığı kapma olsun; kapınca ayrı olaylar çıksın, parayla hayatta kalma şansı yükselsin; kapınca ölüm oranı ~%70, olaylarla düşsün/artsın"):
- **Başlangıç:** `kuresel_veba_baslangici` — **18+ yaşında her yıl %3** (`VEBA_YILLIK_IHTIMAL`) ihtimalle zorlanır. Bir dalga (aktif+iz fazı) bitince `son_veba_bitis_yili` yazılır, **25 yıl cooldown** (`VEBA_COOLDOWN_YIL`) sonrası tekrarlanabilir. `state.veba` dolu iken yeni dalga bloklanır.
- **3 seçenek = 3 korunma kademesi** (`veba_koruma` 0/1/2, `ulke_etkisi:{vebada:true}`): kırsala çekil (maliyet 15, `:2`) / evde karantina (maliyet 6, `:1`) / devam et (bedava, `:0`). Başarısız seçim korunmayı bir kademe düşürür.
- `vebaBaslat(state, korumaSeviyesi)`: aktif faz **5-7 yıl** + **10-15 yıl** iz fazı; iz süresince kira **×0.60-0.70**, maaş **×1.20-1.30**.
- **YILLIK ORAN = HASTALIĞI KAPMA (ölüm değil)** — `vebaYillikKontrol`, korumaya göre 3 kademe: karakter `VEBA_KAPMA_KADEME = [0.093, 0.054, 0.027]` (eski ölüm kademesi ×~1.5). Kapınca: `veba_hastasi` etiketi + `state.veba_olum_riski = 70` (`vebaHastaligiBaslatEt`), normal havuz kapanır → yalnız `vebaHastasiOlayi:true` olaylar (bkz. [vebaHastaligi.ts](server/src/data/olaylar/vebaHastaligi.ts), 10 olay). **Eş/çocuk için yıllık oran hâlâ DOĞRUDAN ölüm** (onlara olay katmanı yok): eş `[0.054, 0.033, 0.017]`, çocuk `[0.048, 0.03, 0.015]` (±%50 büyütüldü).
- **Kapınca ölüm — `vebaHastaligiKontrol` (turda BİR kez):** o anki `veba_olum_riski` (%) yüzdesine karşı ölüm zarı. Ölmezse risk `VEBA_HASTALIK_DOGAL_DUSUS=21` düşer (2026-09 denge turu: eskiden 15 — tedavisiz hayatta kalma neredeyse imkansızdı); `≤ VEBA_HASTALIK_IYILESME_ESIGI=12` olunca iyileşir (etiket + alan temizlenir). Bu zar, o turdaki `vebaHastasiOlayi` seçiminin `veba_olum_riski_artis` etkisinden SONRA atılır — iyi bir tedavi seçimi hayatta kalmayı belirgin iyileştirir. Yeni bulaşılan tur bu zar ATLANIR (önce bir olay seçme şansı). **Başlangıç ölüm zarı %70; hiçbir şey yapmadan (yalnız -21/tur doğal düşüş) hayatta kalma ~%11-17; iyi para+tedavi seçimleriyle ~%50-65.**
- **`vebaHastasiOlayi:true` olay havuzu:** hekim getirt (para -18, risk -30) · şifacı otu · manastır merhemi (OÇ) · genç doktorun deneysel tedavisi (SD) · kan alma/hacamat (50/50) · tam dinlen vs çalışmaya devam · şarlatan iksiri · başında bekleyen (aile bakımı) · ateş zirvede (kriz). Negatif `veba_olum_riski_artis` = risk DÜŞER. İngilizce aynası `i18n/olaylar/vebaHastaligi.en.ts`.
- **"Salgın dönemi" bulaşma olayları** (`gerekliUlke:{vebada:true}`, normal havuzda): `veba_kapiyi_calan` / `veba_cenaze` / `veba_hasta_bakiciligi` — başarısızlıkta artık `olum_sansi` DEĞİL `etiket_ekle:["veba_hastasi"]` (yani seni hastalandırır, öldürmez). `veba_pazarda_temas` yalnız sağlık kaybı verir.
- Aktif faz bitince `ulke.vebada=false` ama `state.veba` silinmez (iz); `etkiBitisYili`'ye ulaşınca `state.veba=null` + `son_veba_bitis_yili=yil`. Karakter hâlâ `veba_hastasi` ise (nadir) dalga bitse bile iyileşene/ölene dek hasta havuzunda kalır.
- İstemci: `GorevEkrani` 🦠 rozeti "Veba hastası · hayatta kalma şansı ~%N" gösterir (`karakter.veba_olum_riski`'ten).

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

`AyarlarModal` props: `baslangicSekme?: Sekme` (hangi sekmeyle açılacağı — geri bildirim CTA'sı `'geri_bildirim'` verir), `onAnaMenu?: () => void` (yalnız oyun ortasındayken App.tsx tarafından geçirilir).

**İki sekme:**
- **Genel:** (a) **Dil** — `tr`/`en` seçimi, `ayarlariKaydet({dil})` ile `localStorage`'a (`kader-carki-ayarlar`) yazılır. (Çeviri altyapısı için §30 — oyunun tamamı iki dilli.) (b) **Ses** — Açık/Kapalı; mevcut `sesToggle`/`ses.ts` tercihini yönetir. (c) **🏠 Ana Menüye Dön** — YALNIZ oyun ortasındayken (`onAnaMenu` verilmişse) görünür; modalı kapatır + `setEkran('giris')`, **oyun kaydını SİLMEZ** (`aktifOturumIdSil` çağrılmaz; localStorage'daki `state.id` durur), giriş ekranındaki "Oyuna Devam Et" ile geri dönülür (büyük denge turu — kullanıcı isteği).
- **Görüş & Öneri:** kategori (`hata`/`oneri`/`diger`) + mesaj (maks 2000, sayaç) + opsiyonel iletişim (maks 120). `App.tsx.geriBildirimGonderHandler` gönderirken **oyun bağlamını otomatik ekler**: `stateId, ekran, cag, bolge, yerlesim, meslek, yas, yil, surum` (`APP_SURUM`, App.tsx tepesinde elle güncellenen sabit), `dil`, `userAgent`. Başarıda form yerini yeşil onay + "Yeni mesaj gönder" alır.

**Sunucu:** `POST/GET /api/geri-bildirim` ([geriBildirim.routes.ts](server/src/routes/geriBildirim.routes.ts), [server.ts](server/src/server.ts)'te `geriBildirimLimiti` 5/60sn ile mount'lu). Saf `geriBildirimTemizle(govde)` doğrular/temizler (min 3 karakter, gizli `sirket` bal küpü → sessiz 200, mesaj 2000'e / iletişim 120'ye / bağlam alanları 300'e kırpılır) — HTTP dışında test edilebilir (bkz. [verifyGeriBildirim.ts](server/scripts/verifyGeriBildirim.ts), §22). Kayıt [geriBildirimDeposu.ts](server/src/utils/geriBildirimDeposu.ts) ile **Neon Postgres'e** (`GeriBildirim` modeli, §20) ateşle-unut yazılır **ve** [webhookBildirim.ts](server/src/utils/webhookBildirim.ts) ile `GERI_BILDIRIM_WEBHOOK_URL`'e ateşle-unut POST atılır (URL `api.telegram.org` içeriyorsa Telegram `{chat_id,text}`, yoksa Discord `{content}`; hata ana isteği etkilemez). `GET`, `GERI_BILDIRIM_ANAHTARI` env'iyle `?key=` eşleşmezse 403; eşleşirse son 200 kaydı (en yeni üstte) JSON olarak döner. **`GET /panel`** (aynı anahtar) — [geriBildirimPanel.ts](server/src/utils/geriBildirimPanel.ts), `istatistikPanel.ts` ile birebir aynı desen (sunucuda render edilen, inline script'siz tek-dosya HTML — kategori sayaç kartları + tam kayıt tablosu). Eskiden geri bildirim için hiç HTML sayfası yoktu (yalnız istatistikte vardı, §32) — "sayfa açılmıyor" şikayeti buradan geliyordu, düzeltildi.

**Env** (hepsi opsiyonel, §1 + [render.yaml](render.yaml)): `GERI_BILDIRIM_ANAHTARI` (okuma ucu için — boşsa `GET` her zaman 403), `GERI_BILDIRIM_WEBHOOK_URL`, `GERI_BILDIRIM_TELEGRAM_CHAT_ID` (anlık haber, opsiyonel). Yazma (`POST`) her durumda Neon'a çalışır — hiçbir env gerekmez. (Eski `GERI_BILDIRIM_DOSYA` JSONL yolu kaldırıldı.)

**CSP notu (§28):** webhook sunucudan dışarı gittiği için tarayıcı `connect-src` direktifi etkilenmez — CSP'ye dokunulmadı.

## 30. İki Dillilik (TR/EN) — Gösterim Anında Çeviri Katmanı

Oyunun **tamamı** İngilizceye çevrildi. **Türkçe kaynak KANONİK** kalır: motor mantığı, filtreler, etiketler, `meslek`/`bolge`/`kisilik`/`rol` anahtarları, olay `id`'leri hep Türkçe değerleri kullanır. İngilizce **yalnızca metin oyuncuya gönderilmeden hemen önce** bir arama katmanıyla uygulanır. `CharacterState.dil: "tr" | "en"` (JSON blob; `eskiKayitGocu` `"tr"` varsayar). `state.dil` `POST /new`'de (istemci `dil` gönderir) **ve** oyun içinde Ayarlar'dan dil değiştirilince `POST /:id/dil` ile (`gameEngine.oturumDiliAyarla`) yazılır — ikincisi olmadan Türkçe başlayan bir oyunda arayüz İngilizceye dönse bile olaylar Türkçe kalıyordu.

### Sunucu i18n ([server/src/i18n/](server/src/i18n/))
- **[index.ts](server/src/i18n/index.ts):** yardımcılar — `T(dil, tr, params?)` (parametreli çeviri), `K(dil, tr)` (kısa anahtar), `Khukumdar`, `ikiDil`.
- **[katalog.en.ts](server/src/i18n/katalog.en.ts):** `KATALOG_EN` — çağ/bölge/din/para birimi/yerleşim/konut/yaşam tarzı/mülk/mağaza/rütbe/hizip/kişilik/aile mesleği vb. **statik katalog** metinlerinin İngilizce karşılıkları. Terminoloji sözlüğü buradadır: yeni olay çevirisi yazarken bölge/rütbe/hizip adları buradan alınır (ör. Fransa→France, "Din Adamı"→"Clergyman"; para birimi adları KORUNUR: Livre/Mark/Kuruş...).
- **[anlatim.en.ts](server/src/i18n/anlatim.en.ts):** `ANLATIM_EN` — motorun ürettiği anlatı/haber/zaman-geçişi/sonuç metinlerinin İngilizcesi (`sonucAnlatimiUret`, `zamanAnlatimiUret`, `haberleriUret` vb.).

### Olay çevirileri ([server/src/i18n/olaylar/](server/src/i18n/olaylar/))
Her kaynak `data/olaylar/X.ts` için bir **ayna dosyası** `X.en.ts`, `export const OLAYLAR_X_EN: Record<olayId, OlayCeviri>` dışa aktarır. Hepsi [olaylar/index.ts](server/src/i18n/olaylar/index.ts)'teki `KAYIT: Record<string, OlayCeviri>[]` dizisine (import satırı + dizi girişi) eklenir; `CEVIRI_INDEKSI = Object.assign({}, ...KAYIT)`.
- **`OlayCeviri`** şekli: `{ baslik?, metin?, secenekler?: (SecenekCeviri | null)[] }`. `secenekler` kaynak sırasıyla **birebir** eşleşir; çevrilmeyen seçeneğe `null` konur.
- **`SecenekCeviri`:** `{ metin?, kilitAciklamasi?, basariliSonuc?: {mesaj?, detay?}, basarisizSonuc?: {mesaj?, detay?}, onTepki?: {metin?, geriCekilMetni?, geriCekilSonucu?: {mesaj?, detay?}, devamMetni?, devamSonucu?: {mesaj?, detay?}} }`.
- **`olayCevirisiUygula(olay, dil)`** ([olaylar/index.ts](server/src/i18n/olaylar/index.ts)): `dil !== "en"` ya da kayıt yoksa olayı olduğu gibi verir; aksi halde **sığ bir kopya** döndürür — yalnız gösterim alanları (`baslik`, `metin`, `secenekler[].metin`/`kilitAciklamasi`/`basariliSonuc.{mesaj,detay}`/`basarisizSonuc.{mesaj,detay}`/`onTepki.*`) İngilizceye çevrilir; **tüm mantık alanları** (filtreler, `baseBasariSansi`, `etki`'ler, `id`, `etiket_ekle` vb.) aynen korunur. `olaySecici.ts`'teki `olaySec()`'e bağlıdır.
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
[ceviriDurumu.ts](server/scripts/ceviriDurumu.ts): kapsam yüzdesi + **sürüklenme (drift) kontrolü** — çeviride kaynaktan fazla seçenek var mı, **yetim çeviri id'si** (kaynağı olmayan `Record` anahtarı, `tumCeviriIdleri()` ile) var mı. `--full` dosya dosya döküm verir. **Güncel durum (2026-09 sonu):** 1462 olaydan **1409'u (%96.4) kayıtlı, ~%96.1 dize çevrili**, sürüklenme yok — 5 dosyalık çeviri açığı (`komikGaripOlaylar.ts`, `ortaCagTuccarYollari.ts`, `sanayiAskerYollari.ts`, `sanayiDinAdamiYollari.ts`, `sanayiTuccarYollari.ts`, toplam ~240 olay) kapatıldı. Kalan ~%3.6 muhtemelen dağınık tekil eksik dize/kenar durumu (`--full` ile tespit edilebilir). Yeni bir kaynak olayı eklerken `X.en.ts`'ine karşılığını da ekle, yoksa `ceviriDurumu` kapsam düşüşü gösterir (uyarı değil, sadece yüzde) — CI bu script'i henüz çalıştırmıyor, düşüş fark edilmeden birikebiliyor (yapılması önerilir).

## 31. Başarım Sistemi (Gerçek, Adlandırılmış Başarımlar)

`basarimlar.ts`'in (olaylardan gelen ünvan + efsanevi ölüm koleksiyonu — ham depo, KORUNDU) üstüne binen adlandırılmış/koşullu meta-ilerleme katmanı. Tamamen cihaz-yerel (`localStorage`), sunucuya gitmez. **2026-09'da yeniden yapılandırıldı** (kullanıcı: "saçma/dolgu olanlarla kaliteli olanları ayır; kademeli yap; olaylı ölümler de başarım sayılsın").

- **[basarimSistemi.ts](client/src/basarimSistemi.ts):** `BASARIMLAR: BasarimTanimi[]` (**55 kart** — kullanıcı büyük bir menüden seçti: ~68 → 37'ye indirilmişti, sonra seçili havuz genişletilip 55'e sabitlendi. Kademeli eksenler 2 kademe; okült/lanetli-eşya kümesi bütün bırakıldı) — `{id, ikon, grup, nadirlik, gizli?, ad:{tr,en}, aciklama:{tr,en}, kosul(ozet)=>boolean, ilerleme?(baglam)=>[simdi,hedef]}`. Metin doğrudan tanımda. **5 grup** (`GRUP_SIRA`): 
  - **`kilometre`** (14) — `kademeli()` her eksende **2 kademe** (`_1/_2`): tecrübe (1/10 hayat), servet (400/4000 tek-ömür nakit), şöhret (70/100 rekor ün), ömür (80/95 rekor yaş), aile (3/6 rekor yaşayan çocuk), rütbe (4/5 rekor seviye) + `meslek_zirvesi` + `bolge_gezgini` (`istatistik.bolgeler ≥ 4`).
  - **`tarz`** (15) — iki_cag, uc_meslek, mutevazi_son, kisa_parlak, yeminli, kanli_eller(gizli), kilic_zoruyla(gizli), yoktan_var, evli_barkli, yalniz_kalan (`kalici:dul`+`kalici:evlat_acisi`+60y), kumarbaz(gizli — `bagimlilik:kumarbaz`), katil(gizli — `sir:cinayet`/`sir:kanli_eller`), soylu_kani (`aile:soylu`+şato+ün≥80), sevilen_baba (3+ çocuk hepsi `iliski≥75`), sadik_asker (`yol:asker:sadik`+rütbe5). *(`amac` — hayat amacını tamamla — kullanıcı isteğiyle çıkarıldı; skor ×5 mekaniği zaten var.)*
  - **`kesif`** (15) — kahraman, hain(gizli) [`yol:*`], kasif, yollara_dusen (`yolculukTamamlayan ≥ 3` çapraz-oyun), zindandan_kacis (hapis kaçış id'leri), firari(gizli), yedi_canli(gizli) + **okült küme**: gizemli_kader(gizli — `esya:`/`envanter:`), ejderha(gizli — `gizem_ejderha_tilsimi`), yasak_ilim(gizli — `bilgi:yasak_ilim`), fisildayan_tas(gizli — `envanter:fisildayan_tas`/`gizem_fisildayan_tas`), seytanla_pazarlik(gizli — `buyu_seytanla_pazarlik`), kara_kilic(gizli — `envanter:kara_kilic`), kara_kedi(gizli — `buyu_kara_kedi`/`derinlik_manastir_kedisi`/`esya:veba_koruyucu_kedi`), kahin (`buyu_koy_medyumu`/`buyu_kristal_kure`/`buyu_kahin_kehaneti`).
  - **`dunya`** (6) — vebayi_yendi (`veba_gecirdi` && ölüm nedeni veba değil), cephede_yaslandi (`son_buyuk_savas_bitis_yili`!=null && yaş≥55), kiyametten_sag (veba+savaş+60y), veba_bagisik (`tibbi:veba_bagisik`), rakipsiz (tüm `rakipler[].yenildi`), tefeci_kurbani(gizli — `kredi.odenmeyenTaksit≥2`).
  - **`koleksiyon`** (5) — `basarimlar.ts`'e bağlı: `efsanevi_olum`(gizli) + `efsanevi_koleksiyon_1` (5 benzersiz efsanevi/olaylı ölüm) + `unvan_koleksiyon_1` (8 benzersiz ünvan) + `evcil_dost` (`evcil_hayvan != null`) + `luks_duskun` (`magaza_envanteri` içinde 4 `kategori:"luks"`). **Olaylı (efsanevi) ölümler böylece gerçek başarım sayılır.**
  - Kaldırılan id'ler eski localStorage `kader_carki_basarimlar_v2` kümesinde yetim kalabilir — **zararsız** (galeri/sayaç yalnız `BASARIMLAR`'dakileri işler). `OyunIstatistigi.tamamlananAmaclar` artık okunmuyor ama yazılmaya devam eder.
- **Çapraz-oyun istatistiği** (`kader_carki_oyun_istatistik`): `{caglar[], meslekler[], bolgeler[], enYuksekSkor, toplamOlum, toplamYilYasandi, gorulenOlumNedenleri[], enTekOmurServet, tamamlananAmaclar[] (hedefTuru), yolculukTamamlayan, rekor:{un,ahlak,suc,yas,cocuk,ordu,sermaye,nufuz,ekip,mulk,rutbe,sehirYonetim}}` — her ölümde `istatistigiGuncelle` ile güncellenir (rekorlar `Math.max`). `oyunIstatistigiGetir` eski blob'ları eksiksiz varsayılana doldurur.
- **`basarimlariDegerlendir(state)`** (ölüm ekranı `useEffect`): istatistiği/rekorları günceller, `{yeniAcilanlar, buOmurKazanilanlar, istatistik}` döner. `yeniAcilanlar` = bu ölümde İLK kez açılan (kalıcı `kader_carki_basarimlar_v2`'ye yazılır); `buOmurKazanilanlar` = bu hayatın karşıladığı TÜM başarımlar (ölüm ekranı rozet şeridi). `kader_carki_basarim_degerlendirilen` (son 40 `state.id`) ile aynı ölüm istatistiği iki kez artırmaz (tekrar çağrıda yalnız `buOmurKazanilanlar` yeniden hesaplanır).
- **Migrasyon:** `kader_carki_basarim_migrasyon_v3` bayrağıyla tek seferlik — eski tek-eşik id'leri kademeliye taşır (`yasayan_efsane→sohret_2`, `hanedan→aile_2`, `zirvenin_adami→rutbe_2`, `servet→servet_1`, `uzun_omur→omur_2`, `ilk_hayat→tecrube_1`, `on_hayat→tecrube_2`) — kilit kaybı olmaz.
- **`retroaktifKilitAc()`** (modül yüklenince bir kez + istenirse App mount'ta): `ilerleme` tanımlı (yani `state`'siz, yalnız çapraz-oyun `rekor`/`istatistik`/`koleksiyon`'dan değerlendirilebilen) başarımları — kademeli eksenler, `bolge_gezgini`, `iki_cag`, `uc_meslek`, `yollara_dusen`, koleksiyon kademeleri — hâlihazırda karşılanıyorsa oyuncu ölmeyi beklemeden açar. **Sürüm değişikliğinde kilidi görünmez kalan eski oyuncuların ilerlemesini geri kazandırır** (id yeniden adlandırma → migrasyon; içerik silme → görünmez ama zararsız orphan; kavramı korunan başarım → retroaktif + zaten `basarimlariDegerlendir` bir sonraki ölümde rekordan yeniden açar).
- **Skor:** `hesaplaSkor` artık `skor.ts`'ten (paylaşılan istemci modülü) alınıyor, sunucudaki toplamsal eksen-kırılımı formülüyle (§18) birebir aynı.
- **UI:** [BasarimGaleri.tsx](client/src/components/BasarimGaleri.tsx) — giriş ekranı "🏆 Başarım Galerisi" butonu; **gruplara ayrılmış** (grup başlığı + `X/Y`), kilitli non-gizli kartlarda `ilerleme` varsa çubuk (`.basarim-karti-ilerleme`), nadirlik sol-kenar şeridi + etiket (`.basarim-nadir-*`). Ölüm ekranında `.olum-yeni-basarimlar` bloğu artık **"🏆 Bu Hayatın Kazanımları"**: bu hayatın `unvanlar` (🏵️) + `efsanevi_olum` (💀) + `buOmurKazanilanlar` rozetleri; yeni açılanlar `· YENİ` etiketi + altın halka (`.olum-rozet-yeni`). `bastanBasla` `yeniBasarimlar` + `buOmurBasarimlar`'ı temizler.

## 32. Toplu Oyun Metrikleri (İstatistik)

Sunucu tarafı, **anahtar korumalı**, oyuncuya hiç gösterilmeyen bir metrik katmanı — "kaç kişi girdi, ne kadar oynandı (hem oyun-içi yıl hem gerçek zaman), kaç hayat/ölüm, servet/skor/çağ/bölge/meslek dağılımı".

- **Model:** `Metrik` (Prisma, §20) — append-only olay günlüğü. Neon'da kalıcı (Render free diskine bağımsız). Migration: [server/prisma/migrations/20260908_metrik/](server/prisma/migrations/20260908_metrik/migration.sql), `start:prod`'daki `prisma migrate deploy` uygular.
- **Depo:** [metrikRepository.ts](server/src/db/metrikRepository.ts) — `metrikYaz(girdi)` **ateşle-unut** (Prisma patlarsa oyun akışı etkilenmez, sadece `console.error`); `istatistikOzeti()` `prisma.metrik.findMany` (cap 60k) çekip **JS'te** toplar (`ozetHesapla` saf fonksiyon → test edilebilir).
- **Motor-içi tetikleme** ([gameEngine.ts](server/src/game/gameEngine.ts), hepsi `void metrikYaz(...)`): `yeniOyun` → `yeni_oyun` (+ opsiyonel `istemci_id`, `POST /new` body'sinden); `mesleğiAta` → `meslek_secim`; `sonucuUygulaVeIlerlet` sonu, `!state.aktif` ise → `olum` (yaş, tur_sayisi, servet = nakit+gayrimenkul, skor, olum_nedeni, `oturum_sn` = `oturumYasiSaniye(id)` = now − `Session.createdAt`); `liderlikTablosunaKaydet` → `skor_kaydi`.
- **Client:** [istemci.ts](client/src/istemci.ts) — `istemciId()` (localStorage'da rastgele UUID, kişisel veri yok), `ziyaretBildir()` (günde bir `POST /api/istatistik/olay {tur:"ziyaret"}`; App.tsx mount `useEffect`'inde). `yeniOyunBaslat`'a `istemciId()` geçirilir.
- **Uçlar** ([istatistik.routes.ts](server/src/routes/istatistik.routes.ts), `server.ts`'te `istatistikLimiti` 20/60sn): `POST /olay` (yalnız `tur:"ziyaret"` kabul, `olayGovdesiTemizle` saf doğrulayıcı); `GET /` (JSON özet, `ISTATISTIK_ANAHTARI` env yoksa/eşleşmezse 403); `GET /panel` (aynı anahtar, sunucuda render edilen bağımlılıksız HTML — [istatistikPanel.ts](server/src/utils/istatistikPanel.ts), **inline script yok** çünkü helmet CSP `script-src 'self'`).
- **Env:** `ISTATISTIK_ANAHTARI` (opsiyonel; `.env.example` + `render.yaml` `sync:false`). Boşsa okuma uçları 403, yazma çalışır.
- **Test:** [istatistik.test.ts](server/tests/istatistik.test.ts) — `ozetHesapla` + `olayGovdesiTemizle`. `_prismaStub.ts`'e `metrik` modeli eklendi.

## 33. Aile Ekranı: Eş/Çocuk İlişkisi & Etkileşimler

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
- **`CharacterState.rakipler: Rakip[]`** — `{ad, meslek, guc (0-100), husumet (0-100), yenildi}`. `mesleğiSec` 2 meslektaş rakip üretir; `rakipler[0].ad === rakip_adi` (geriye dönük uyum, olaylar `{rakip}`'i kullanır). `eskiKayitGocu` eski kayıtlara türetir.
- **Karanlık iş → rakip hedefleme:** `RAKIP_KOTU_IS_HEDEFLERI = {rakibi_korkut:8, rakibi_dov:15, isyeri_yak:26}`. `POST /:id/kotu-is` body'si `{tur, hedefRakipAd?, vekil?}` aldı. Başarılı dalda `rakipGucKir(state, ad, taban, enflasyon)`: rakibin `guc`'ünü kırar → kırılan güç **pazar payı** olarak döner (`para += kırılan×0.5×enflasyon`, `kariyer_puani += 2..6`). `guc ≤ 10` → `yenildi=true` (tek seferlik `kariyer_puani +10`, `un +4`). Her deneme `husumet += 10..20`.
- **"Adamına yaptır" (`vekil:true`):** peşin ücret (~10×enflasyon); kişisel `ahlak` yükü ve `hapis_sansi` yarıya, `suc_artis` ×0.6. Ama **"ortaya çıkma"**: %25 → tam `suc_artis` + `un -3` + hedef rakip `husumet +25`.
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
- `GET /:id/kredi` (`{aktifKredi, maksTutar, faizTeklifi, minTutar, kademeler}`), `POST /:id/kredi/al {tutar}`, `POST /:id/kredi/pazarlik`.
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
