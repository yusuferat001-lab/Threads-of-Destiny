# Kader Çarkı Referansı — Mimari, Oyun Tanımı ve API Referansı

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

## 0. Oyun Nedir

**Kader Çarkı**, Türkçe, metin tabanlı, tarihi bir hayat simülasyonudur. Oyuncu bir **çağ** (Orta Çağ ya da Sanayi Devrimi), bir **bölge/ülke** ve bir **yerleşim tipi** seçer; ailesi, kişiliği ve dini rastgele belirlenir. 15 yaşında bir **meslek** (Asker/Tüccar/Din Adamı/Zanaatkâr — 2026-09 sonunda eklenen 4. meslek) seçilir ve karakter, her turda sunulan bir olay + 2-4 seçenek arasından seçim yaparak yaşar. Zar atılır, sonuç uygulanır, yıllar ilerler; **ölüm kalıcıdır**. Oyun başında (yerleşim seçiminden sonra) oyuncudan bir **isim** istenir — boş bırakılırsa seçilen ülkeye uygun rastgele bir isim atanır; bu isim oyun boyunca sol üstte görünür ve ölümde skor **otomatik olarak** bu isimle liderlik tablosuna kaydedilir (§18). **Soy sürdürme ("hanedan modu") 2026-09'da tamamen kaldırıldı** — ölüm kesin sondur, yeniden başlamak yeni bir karakter oluşturur.

## 2. Uçtan Uca Mimari

- **Oturum (session) modeli:** Her karakter bir `CharacterState` nesnesidir, `randomUUID()` ile `id` alır. Sunucu bunu iki katmanda tutar:
  1. **In-memory `Map<string, Oturum>`** (`gameEngine.ts` içindeki `oturumlar`) — aktif oyun döngüsü (mevcut senaryo, bekleyen tepki, son ton) burada tutulur, DB'de saklanmaz.
  2. **PostgreSQL `Session` tablosu** — `CharacterState` tamamen `JSON.stringify` edilip `data` sütununa yazılır (bkz. §21). Her state-mutasyonundan sonra `oturumKaydet()` çağrılır.
- **Kurtarma:** Sunucu açılışında `oturumlariYukle()` DB'deki `aktif:true` tüm oturumları belleğe yükler — sunucu yeniden başlasa bile yarım kalan oyunlar devam eder. Hemen ardından `gecmisSkorlariKaydet()` `aktif:false` + `skoru_kaydedildi:false` bitmiş oturumları liderlik tablosuna geçirir (§18).
- **Temizlik:** Saatte bir (`server.ts`): bitmiş (`aktif:false`) ve 30 dk'dır erişilmemiş oturumlar bellekten silinir (DB'den silinmez); DB'de 7 günden eski bitmiş oturumlar tamamen silinir.
- **İstemci kalıcılığı:** `client/src/oturum.ts` sadece aktif `state.id`'yi `localStorage` içinde tutar (sayfa yenilenince kaldığı yerden devam) — hiçbir hassas veri saklanmaz. `basarimlar.ts` ayrıca, oyundan bağımsız olarak, kazanılan **ünvanları** ve **efsanevi ölümleri** `localStorage`'da kalıcı bir koleksiyon olarak biriktirir (çok-oyunluk meta-ilerleme, sunucuya kaydedilmez). `gecmisHayatlar.ts` benzer şekilde, ölen her karakterin bir özetini (isim/meslek/çağ/bölge/yaş/skor + `hayat_hikayesi` + `gecmis` grafiği) `localStorage`'da son 20 kayıtla sınırlı biriktirir — giriş ekranındaki "Geçmiş Hayatların" listesi/detayı bunu okur.
- **Rate limit:** `/api/game/*` → **240** istek/60sn (2026-10: 60'tan yükseltildi — her tur ~5 istek atıyor, hızlı oyuncu limite takılıyordu); `/api/scores/*` → 10 istek/60sn (IP başına, `express-rate-limit`, `trust proxy` açık). Tüm limit yanıtları JSON `{hata}` döner (`server.ts` `limitMesaji`).
- **Oturum akışı kalıcılığı (2026-10):** bellekteki `Oturum` (mevcut olay/senaryo, `zorlananOlayId`, bekleyen `onTepki`, saklı mekân olayı, `sonTon`) her `oturumKaydet`'te `state.oturum_akisi` (`OturumAkisiKaydi`) olarak JSON'a yazılır, açılışta `oturumOlustur` ile geri yüklenir. Eskiden sunucu yeniden başlayınca (Render uykusu/deploy) oyuncu olayda kilitli kalıyor, `zorunlu_sonraki` zincirleri kopuyordu.
- **Hata mesajları:** route'lar `routes/hata.ts` `hataMetni(err, id, dil)` kullanır — `Error:` önekini atar, `i18n/index.ts` `hataCevir` ile oyuncunun diline çevirir (birebir ANLATIM_EN + değişkenli kalıplar). İstemci `temizHata` + ekranın altında sabit, kapatılabilir `.hata-kutusu` bildirimi (9 sn'de kendiliğinden kapanır).
- **Katman akışı:** `routes/*.routes.ts` (HTTP + doğrulama) → `game/gameEngine.ts` (orkestrasyon: oturum yönetimi + zorlanan-olay kaskadı + tur çözümleme sırası) → `game/stateManager.ts` (saf mekanik fonksiyonlar/formüller) → `game/olaySecici.ts` (olay seçimi/ağırlıklandırma) → `data/olaylar/*.ts` (1725 olayın statik verisi) → `db/*Repository.ts` (Prisma persistence).

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
| POST `/:id/yil-gec` | – | **İLERLE** (telefon ana ekranı, `zaman_modeli:"ilerle"`): olay çıkarmadan tam 1 yıl geçirir (`yil_sayaci` +1); olay bekliyorsa (2 yıl dolmuş, zincir, yolculuk) ya da öğreti/ürün seçimi bekliyorsa 400. `SecimSonucu & {olayBekliyor}` döner |
| GET `/:id/finans` | – | Salt-okunur gelir/gider dökümü (turu tüketmez) — `maasYillik`, `giderKalemleri`, `netYillik` (= maaş − gider), `enflasyonYuzdesi`, `gayrimenkulDegeri`, `maasKirilim` (maaşın rütbe/kariyer/dönemsel kırılımı, §13), `gayrimenkulYillikGelir` (mülklerden yıllık tahmini net gelir; maaşın DIŞINDA ayrı akış — istemci "eline kalan"a ekler) ve `dunyaEtkileri` (`{ikon,metin}[]` — şu an bütçeyi/sağlığı etkileyen dünya durumlarının insan-okunur listesi: ekonomi ±%, savaş/büyük savaş, salgın aktif/iz, kıtlık/isyan/altın çağ, gıda şoku, enflasyon, **zorunlu bağış 2026-10'da tamamen kaldırıldı** (yerine işletmeli mesleklerde ekstra vergi, §52); `dunyaFinansEtkileri(state)`, formülü açıklar HESAPLAMAZ) |
| GET `/:id/kotu-is-config` | – | "Karanlık işler" listesi: 4 genel + mesleğe özel 3 iş, her biri canlı şans/kazanç/maliyet/güç kazancı/bekleme süresiyle (§43 Faz 1) |
| POST `/:id/kotu-is` | `{tur, hedefRakipAd?, ajanId?}` | Bir karanlık iş çevirir — zarlı, turu tüketmez, iş başına bekleme süresi; başarısızlıkta hapis/ölüm riski (§13, §43). `hedefRakipAd` = hedef rakip (§34.2); `ajanId` = işi tutulan bir ajana ver, sonuç bir sonraki turda çözülür (§43 Faz 2) |
| GET `/:id/ajanlar` | – | Tutulabilir ajan rolleri (ücret, maaş aralığı) + mevcut ajanlar ve görevleri (§43 Faz 2) |
| POST `/:id/ajan/tut` | `{rol}` | Hırsız/Kabadayı/Casus/Suikastçı tutar — peşin ücret, sonra yıllık maaş ekip giderinden; rol başına bir ajan (§43 Faz 2). Turu tüketmez |
| GET `/:id/pazar` | – | Meslek pazarı özeti (§43): `{aktif, pazarAdi, gucAdi, simge, oyuncuGucu, pazarPayi, rakipler[{ad,guc,pay,husumet}], digerPay, maasEtkisi, yillikKariyerPuani, rutbeSarti, yeniRakipKalanYil}`. Turu tüketmez |
| GET `/:id/rakipler` | – | İsimli rakiplerin listesi (`{ad,meslek,guc,husumet,yenildi}`) — Görevin ekranı + karanlık iş hedef seçimi (§34.2) |
| GET `/:id/amaclar` | – | 3 kişisel hayat amacının durumu: `{amaclar: AmacKarti[], carpan}` — sağ panel canlı ilerleme kartı + ölüm ekranı (§18). Turu tüketmez |
| GET/POST `/:id/salgin-korunma` | POST: `{kademe:1\|2}` | Kalıcı salgından korunma yatırımı: veba gelmeden önce bir sonraki dalganın taban korunmasını yükselt (§34.4). Turu tüketmez |
| GET `/:id/kredi` | – | Tefeci: aktif kredi + `maksTutar`/`minTutar` + havuzdan seçilmiş 2 `teklifler` (§34.5, v8.3) |
| POST `/:id/kredi/al` | `{teklifId}` | Sunulan tekliflerden birini alır (§34.5, v8.3). Turu tüketmez |
| POST `/:id/kredi/pazarlik` | – | Aktif kredi faizini bir kez pazarlık eder (§34.5) |
| POST `/:id/envanter/:esyaId/hediye` | `{hedef:"es"\|"cocuk"\|"ekip"\|"dost", cocukIndex?, ekipId?}` | Mağaza envanterinden bir eşyayı verip ilişki puanı artırır (§34.3). Turu tüketmez |
| GET `/:id/mulk-config` | – | 6 piyasa mülkünün güncel fiyat/getiri önizlemesi (+ `yillikBakimTahmini`: 7-11 yılda bir çıkan bakım/vergi masrafının yıllığa amorti edilmiş hâli; + `tahminiYillikNet` = brüt getiri − yıllık bakım, §13) |
| POST `/:id/mulk` | `{tur}` | Mülk satın alır |
| GET `/:id/aile` | – | **Aile & İlişkiler ekranının tüm verisi (§45):** eş (yaş, tür, huylar, meslek bonusu, ihmal yılı, doğum sayısı), çocuklar, çocuk/aile etkileşim kataloğu + cooldown kilitleri, bekleyen `aile_talep`, `esEylem` maliyetleri, `mantik` (açık mı/sebep, 3 aday, teklif seçenekleri+şans) ve `bekleyenDugun` + `dugunSecenekleri`. Mantık listesi ilk açılışta üretilip state'e yazılır. Turu tüketmez |
| POST `/:id/mantik/teklif` | `{adayIndex, hediye:"sade"\|"ucuz"\|"pahali"}` | Mantık evliliği: listedeki adaya teklif (hediye parası kabul/red fark etmez peşin düşer). Kabulde `bekleyen_dugun` kurulur; red → aday listeden düşer + 2 yıl kilit (§45). Turu tüketmez |
| POST `/:id/dugun` | `{butce:"ucuz"\|"orta"\|"pahali"}` | Bekleyen düğünü gerçekleştirir: eş modeli kurulur, çeyiz + maliyet işlenir (§45). Turu tüketmez |
| POST `/:id/es/eylem` | `{eylem:"zaman_gecir"\|"hediye_ver", hediye?:"ucuz"\|"pahali"}` | Eşle ilişki barı eylemi; bağımsız 2 yıllık beklemeler (§45). Turu tüketmez |
| GET `/:id/tanisma` | – | Aşk evliliği yolu: süren tanışmanın durumu (`aktif`, `adim`, `toplam`, giriş cümlesi, aday özeti, adım başlığı, 3 seçenek metni, önceki adımın tepki metni) — §45 |
| POST `/:id/tanisma/yaklas` · `/vazgec` · `/secim` | `{secenek}` (yalnız secim) | Göz göze → yanına git / vazgeç / diyalog seçimi; son adımda sonuç (`bitti`, `basarili`, `mesaj`). Vazgeçiş 4-6 yıl sonra nostalji olayı kurar. Turu tüketmez |
| POST `/:id/sevgili/teklif` · `/gonul-al` · `/ayril` | – | Sevgiliye evlilik teklifi (kabulde `bekleyen_dugun` tur "ask") / gönül al (bedel öder, süre +3 yıl) / ayrıl (§45). Turu tüketmez |
| POST `/:id/cocuk/ise-al` | `{cocukIndex}` | 15+ yaşındaki `is_durumu:"bekliyor"` çocuğu ekibe ("Varis") alma teklifi; yatkın %100 / nötr %50 / uyumsuz %15 kabul (± ilişki). Kabul → ekip üyesi + ilişki +5; red → `red_tepkisi` (§45). Turu tüketmez |
| POST `/:id/cocuk/red-tepkisi` | `{cocukIndex, tepki:"ofke"\|"sakin"}` | Reddeden çocuğa tepki: öfke −15 ilişki/−2 mutluluk, sakin +3 ilişki; çocuk `reddetti` olur (§45). Turu tüketmez |
| POST `/:id/aile/etkilesim` | `{etkilesimId, cocukIndex?}` | Çocukla (oyna/hediye/eğitim) ve ailece (aile_gezi) etkileşim; eş etkileşimleri kaldırıldı (§45). Turu tüketmez |
| POST `/:id/aile/talep` | `{karar:"kabul"\|"ret"}` | Bekleyen aile talebini yanıtlar — kabul: para gider + ilişki artar; ret: ilişki + mutluluk düşer (§33). Turu tüketmez |
| GET `/:id/yonetim` | – | Kariyer sayfası "Yönetim" verisi: iki ilişki hattı (`yonetici` + `patron`) unvan/ad/ilişki, etkileşim kataloğu (bağış/hediye/yağcılık/hizmet), istekler (ilişki yüksekken açılan iyilikler) + kilitler + bekleyen `yonetim_talep` (§35). Turu tüketmez |
| POST `/:id/yonetim/etkilesim` | `{etkilesimId}` | `"yonetici:bagis"` gibi; para düşer, ilişki artar, cooldown yazılır; `yalan` etkileşiminde ahlak/mutluluk düşer + ifşa riski (§35). Turu tüketmez |
| POST `/:id/yonetim/istek` | `{istekId, yalan?}` | İlişki eşiği aşıldıysa bir iyilik ister (vergi kayırma / sicil temizliği / terfi / rakibe darbe / sermaye / zam / kredi kefaleti / iş bağlantısı); ilişki harcar, zarlı; `yalan:true` şansı artırır ama ahlak düşürür + ifşa riski (§35). Turu tüketmez |
| POST `/:id/yonetim/talep` | `{karar:"kabul"\|"ret"\|"yalan"}` | Dayatılan bağış/sadakat talebini yanıtlar — kabul: (bağışsa) para gider + ilişki artar; ret: ilişki + şöhret düşer; yalan: ahlak/mutluluk düşer, %30 ifşa (§35). Turu tüketmez |
| GET `/:id/dunya-gecmisi` | – | "Yıl" penceresi (mobil): son 15 yılda `{yil, bolge, baslangicYili, ulke: DunyaMaddesi[], dunya: DunyaMaddesi[]}` — ülkede (tarihi savaş pencereleri, hükümdar değişimi, `ulke_gecmisi` savaş/veba/kriz, bölgesel tarih) ve dünyada (çağa ait gerçek tarih) olanlar, yeniden eskiye. Salt-okunur, turu tüketmez (§43) |
| GET `/:id/dedikodu` | – | Piyasa dedikodusu satırları |
| GET `/:id/zar-kademeleri` | – | Enflasyona göre ölçeklenmiş bahis kademeleri |
| POST `/:id/zar` | `{tutar}` | Hazard (zar) mini-oyunu: 2+2 zar, çift/yüksek toplam kazanır (§13). `{state,kazandi,senZar,rakipZar,cift,bicakCekildi,mesaj}` döner |
| POST `/:id/uc-kagitci` | `{tutar,secim}` | Üç Kağıtçı mini-oyunu (~%32 sabit şans, §13). `{state,kazandi,dogruBardak,mesaj}` döner |
| POST `/:id/bilek-guresi` | `{basarili}` | Bilek Güreşi mini-oyunu sonucu (istemci beceri oyunu, sunucu sonuca güvenir, §13). **1 yıl bekleme** (`sosyallesme_aksiyon_kilit.bilek`) — eskiden tur harcamadan sınırsız şöhret/para kasılabiliyordu. `{state,mesaj}` döner |
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
