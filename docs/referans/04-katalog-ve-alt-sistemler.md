# Kader Çarkı Referansı — Statik Katalog, Hapis/Yolculuk/Aranma, Ölüm/Skor/Amaçlar

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

## 16. Statik İçerik Katalogları

### Çağ / Bölge / Din / Para Birimi
| Çağ | Yıl Aralığı | Bölgeler (din_kultur → para_birimi) |
|---|---|---|
| Orta Çağ | 1050-1260 | Fransa (Katolik→Livre), Kutsal Roma (Katolik→Mark), Bizans (Ortodoks→Hiperpiron), Selçuklu (Sünni İslam→Dirhem) — *Eyyubiler 2026-09'da `BOLGELER_BY_CAG`'dan çıkarıldı; din_kültür/para_birimi/olay verisi eski kayıt uyumu için `stateManager.ts`'te duruyor* |
| Sanayi Devrimi | 1800-1870 | İngiltere (Anglikan→Sterlin), Fransa (Katolik→Frank), Osmanlı (Sünni İslam→Kuruş), Rusya (Ortodoks→Ruble) |

Hükümdar/lider verisi [liderler.ts](server/src/data/liderler.ts) (yıl aralığına göre gerçek tarihe esinli isimler), tarihi savaş pencereleri [tarihiSavaslar.ts](server/src/data/tarihiSavaslar.ts) (§11 kural 1'i besler + piyasa dedikodusunda gerçek bir "gelecek savaş" öngörüsü verir, `gelecekSavasKontrol`, ufuk 8 yıl) — bu iki dosya salt flavor/lookup verisi, gerekmedikçe okumaya gerek yok. Her 8 çağ×bölge kombinasyonunun ayrıca kendi başlangıç stat bonus/malus paketi + 10'ar flavor olayı var — bkz. §38.

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

### Kişilik Özellikleri (18 sabit, doğuşta çelişmeyen 2 tanesi seçilir)
Kaynak: [kisilikler.ts](server/src/data/kisilikler.ts). **2026-09 sonu yeniden tasarımı (§41):** her özelliğin `etkiler`i artık YALNIZ 4 meslek kategorisini (savas/ticaret/din/zanaat) kullanır — eski siyaset/sosyal/sağlık etkileri tamamen kaldırıldı (aileler.ts/bolgeOzellikleri.ts'teki §40 disipliniyle tutarlı). Ayrıca "bonus çeşitliliğini artır" isteğiyle 9 özellik artık saf yatkınlığın DIŞINDA bir bonus/malus da taşıyor: kalıcı **maaş çarpanı** (`maasCarpani`, doğuşta ham uygulanır — `aile.maasCarpani`/`yerlesim.maasCarpani` ile aynı desen), kalıcı **gayrimenkul (mülk getirisi) bonusu** (`gayrimenkulBonusu`, `state.gayrimenkul_getiri_bonusu`'na eklenir, §13'teki `mulkGetiriOraniKisisel`'de kullanılır) veya doğuşta tek seferlik **üstlerle ilişki bonusu** (`iliskiBonusu: {hat, deger}`, `yonetim_iliski`/`patron_iliski`'ye eklenir — §35). `celisenler` (aynı karakterde asla birlikte olmaz) davranışı değişmedi:

| Özellik | Çelişir | Yatkınlık Etkileri | Ekstra Bonus |
|---|---|---|---|
| Sinirli | Sakin | savas+8, zanaat-4 | – |
| Sakin | Sinirli | din+5, savas-5 | Gayrimenkul +0.02 |
| Kibirli | Vicdanlı | ticaret+6, din-6 | – |
| Alaycı | Yumuşak Başlı | ticaret+4, din-8 | – |
| Umutlu | Umutsuz, Depresif, Hüzünlü | din+6, zanaat+4 | – |
| Umutsuz | Umutlu, Hırslı | ticaret-4, zanaat-6 | Maaş ham ×0.96 |
| Depresif | Umutlu, Hırslı | savas-4, zanaat-8 | – |
| Cesur *(bilinçli olarak limit-üstü, kırpma testi için)* | – | savas+10, ticaret+4 | – |
| Hüzünlü | Umutlu | din+6, ticaret-6 | – |
| Sosyal | İçedönük | ticaret+8, zanaat-4 | İlişki: patron +5 |
| İçedönük | Sosyal | zanaat+8, ticaret-6 | – |
| Sivri Dilli | Yumuşak Başlı | ticaret+6, din-6 | İlişki: patron −5 |
| Yumuşak Başlı | Sivri Dilli, Alaycı | din+8, savas-8 | İlişki: ikisi +6 |
| Rekabetçi | – | ticaret+6, savas+6 | Maaş ham ×1.04 |
| Hırslı | Umutsuz, Depresif | ticaret+8, din-4 | Maaş ham ×1.05 |
| Vicdanlı | Kibirli | din+8, ticaret-6 | Gayrimenkul +0.02 |
| Palavracı *(Faz 7 komik özellik)* | Vicdanlı | ticaret+6, zanaat-4 | – |
| Obur *(Faz 7 komik özellik)* | – | savas-6, ticaret+4, zanaat-4 | Gayrimenkul −0.02 |

Tasarım kuralı: her özellik en fazla 2 kategoride yatkınlık etkiler; olumsuz karakterli özellikler (Umutsuz, Sivri Dilli, Obur) yeni bonuslarında da olumsuz — "bedelsiz bonus yok" felsefesiyle tutarlı. `FEVRILIK_ETKI`/`MERHAMET_ETKI` (aşağıdaki kişilik eksenleri) bu düzenlemeden etkilenmeyen tamamen ayrı bir mekanizmadır.

Ayrıca iki uçlu **kişilik eksenleri** (`kisilik_eksenleri`, seçenek gating için kullanılır, §12): `fevrilik` (0=planlayıcı, 100=fevri) ve `merhamet` (0=zalim, 100=barışçıl). Taban `50 + rastgele(-10..+10)`, sonra seçilen 2 özelliğin `FEVRILIK_ETKI`/`MERHAMET_ETKI` katkısı eklenir (ör. Sinirli fevrilik+20, Sakin fevrilik-20, Yumuşak Başlı merhamet+18, Kibirli merhamet-15), 0-100 clamp.

### Yatkınlık (`yatkinliklar`, -30..30, kategori başına başarı şansı bonusu)
Kaynak: her kategoride taban `rastgele(-5..+5)`, + seçilen 2 kişilik özelliğinin `etkiler`i + aile'nin `yatkinlikEtkisi`'si + yerleşimin `yatkinlikEtkisi`'si + **bölgenin `yatkinlikEtkisi`'si** ([bolgeOzellikleri.ts](server/src/data/bolgeOzellikleri.ts), `bolgeOzellikleriGetir(cag,bolge)`), toplanıp -30..30'a clamp'lenir. `yatkinlik_kaynaklari` bu katkıların dökümünü oyuncuya gösterir.

**Bölge etkileri (2026-09, Faz 1):** Her 8 bölge artık **4 meslek kategorisinin (savas/ticaret/din/zanaat) hepsinde** bir etki taşır (eskiden bölge başına 1-3 kategoriyle sınırlıydı) — birincil ±10-12, ikincil ±4-6, üçüncül -2..-5, dördüncü küçük bir denge değeri. `siyaset`/`sosyal` gibi meslek-dışı kategorilerdeki etkiler ayrıca durur, sinerji hesabına girmez.

**Sinerji bonusu (2026-09, Faz 2, `SINERJI_BONUSU=13`):** `yatkinlikHesapla` içinde, doğan karakterin ailesinin `devamMeslegi`'si (varsa) `MESLEK_KATEGORI` ile bir kategoriye çevrilir; bölgenin 4 meslek kategorisi arasındaki **en yüksek değerli (baskın) kategori** bulunur. İkisi eşleşiyorsa (ör. Selçuklu'da `din_adami` ailesi, bölgenin baskın kategorisi de `din`) o kategoriye ek **+13** eklenir, `yatkinlik_kaynaklari`'na `"<bölge> + <aile> sinerjisi"` kaydı düşer — "bu bölgede bu aile mesleğinden gelmek" doğal bir avantaj olsun diye. `devamMeslegi`'i olmayan ailelerde (kölecilik, soylu, kumarbaz vb.) tetiklenmez.

### Konut (5 kademe, `konut_id`, turu tüketmeden değiştirilebilir) — Faz 9 (2026-09 sonu)

**Faz 9 (kullanıcı isteği: "ev/yaşamları bir adet azalt, her kademe kendi kişiliğini taşısın"):** eski 6 kademe (Basit Barınak/Ahşap Ev/Normal Ev/Taş Ev/Konak/Şato) hep ÜÇ statı BİRLİKTE aynı yönde büyütüp küçültüyordu — hiçbir kademenin kendine has bir kimliği yoktu. 5 kademeye indirildi: eski en alttaki iki kademe TEK bir "dip" kademede birleşti, üstteki üç kademe artık birbirinden gerçekten farklı bir kişilik taşıyor. Birkaç turluk kullanıcı geri bildirimiyle kalibre edildi: sağlık/mutluluk ucuza kazanılabilirken (orta kademede bile +1..+3), **şöhret bilinçli olarak cimri tutuldu** — üst-orta kademede en fazla +1, yalnız en pahalı TEK kademede (+5) gerçek bir sıçrama yapıyor; ucuz şöhret yok, zirve şöhret pahalı ve nadir. Her kademenin ikincil (baskın olmayan) etkileri ±3'ü hiç geçmez.

| id | Kira/yıl | Sağlık/yıl | Mutluluk/yıl | Şöhret/yıl |
|---|---|---|---|---|
| nemli_baraka | 1 | **-4** | **-3** | **-1** |
| mutevazi_yuva *(varsayılan)* | 4 | – | +1 | – |
| sicak_ocak | 8 | +1 | +2 | +1 |
| saglam_konut | 14 | +3 | +2 | +1 |
| gorkemli_konak | 23 | +3 | +3 | +5 |

Taşınma ücreti (sadece daha pahalıya geçişte): **3**. `mutevazi_yuva` bilinçli olarak nötr (varsayılan) bırakıldı — ev ekranını hiç açmayan oyuncu ilk 15-20 yıl sessizce sağlık/itibar kaybetmesin. `KONUT_SAHIBI_MIN_KADEME=2` (Sıcak Ocak ve üstü "sahiden yerleşmiş" sayılır, `konut_sahibi` hayat amacı §18). Eski canlı oturumlardaki 6 kademeli id'ler `eskiKayitGocu` ile buradaki en yakın karşılığa taşınır (basit_barinak/ahsap_ev→nemli_baraka, normal_ev→mutevazi_yuva, tas_ev→sicak_ocak, konak→saglam_konut, sato→gorkemli_konak; bkz. stateManager.ts).

**Görüntülenen ad/simge çağ VE bölgeye göre değişir** (`client/src/bolgeTema.ts` `KONUT_TEMALARI`/`konutGoruntusuGetir`, §19'daki desenle aynı — anahtar `` `${cag}|${bolge}` ``, `server/src/data/sosyallesmeAksiyonlari.ts` `BOLGE_ICECEKLERI` ile aynı kalıp): yukarıdaki tablo yalnız MEKANİK (kira/etki) taban değeri + jenerik yedek ad; oyuncuya gösterilen gerçek isim döneme özgüdür — ör. `gorkemli_konak` Orta Çağ Fransa'da "Loire Şatosu", Sanayi Devrimi Osmanlı'da "Boğaziçi Yalısı", Orta Çağ Selçuklu'da "Sırçalı Köşk" olarak görünür; `sicak_ocak` Sanayi Devrimi Rusya'da "Oymalı İzba", Orta Çağ Kutsal Roma'da "Çinili Sobalı Ev" olur. 9 bölge×çağ kombinasyonunun (8 güncel + `Eyyubiler`, eski kayıt uyumu) her biri 5 kademenin hepsi için ayrı bir isim taşır.

### Yaşam Tarzı (5 kademe, `yasam_secimi_id`, ücretsiz/anlık değiştirilebilir) — Faz 9 (2026-09 sonu)
Konutla AYNI turda, aynı felsefeyle yeniden tasarlandı: Keyifli Sofra doyurucu değil NEŞELİ (yüksek mutluluk, düşük şöhret), Dengeli Sofra besleyici/SAĞLIKLI, Şölen Sofrası hem en pahalı hem tartışmasız en iyisi. `YasamSecenegiTanimi`'ye `unEtkisiYillik` (`pasifEkonomiUygula`'da konut ünüyle aynı satırda uygulanır).

| id | Maliyet/yıl | Sağlık/yıl | Mutluluk/yıl | Şöhret/yıl |
|---|---|---|---|---|
| bayat_artik | 0 | **-4** | **-3** | **-1** |
| sade_sofra *(varsayılan)* | 5 | – | – | – |
| keyifli_sofra | 9 | +1 | +3 | – |
| dengeli_sofra | 14 | +3 | +2 | +1 |
| solen_sofrasi | 21 | +3 | +3 | +4 |

Eski canlı oturumlardaki id'ler `eskiKayitGocu` ile taşınır (copten_topla/ucuza_ye→bayat_artik, normal_ye→sade_sofra, iyi_ye→keyifli_sofra, kaliteli_ye→dengeli_sofra, ziyafet_gibi_ye→solen_sofrasi). **Görüntülenen ad/simge de konut gibi çağ+bölgeye göre değişir** (`YASAM_TEMALARI`/`yasamGoruntusuGetir`, aynı dosya) — ör. `keyifli_sofra` Orta Çağ Fransa'da "Şaraplı Güveç", Sanayi Devrimi İngiltere'de "Çay Saati Tatlıları"; `solen_sofrasi` Orta Çağ Selçuklu'da "Sultan Sofrası", Sanayi Devrimi Rusya'da "Çariçe Sofrası" olur.

**Başlangıç statları** (`createCharacter`, aile/yerleşim bonusları ayrıca eklenir — **2026-09 ikinci denge turu**, kullanıcı isteği): mutluluk **50** + aile etkisi (yeni: her aile artık mutluluğu da ~±12 bandında etkiler, eskiden hiçbiri etkilemiyordu), ahlak **45** (eski 50) + aile etkisi (~±20 bandı, eski uçlar +25/-30'du), şöhret(un) **20** + aile etkisi (~±20 bandı, eski uçlar +40/-25'ti), sağlık **80** (eski 100) + aile etkisi (~±16 bandı) + yerleşim etkisi, para **`max(5, min(54, 24 + aile.para + yerlesim.para))`** (v19: baz +14) (eski taban 12/tavan 35; aile etkisi artık ~±20 bandı, eski uçlar +80/-25'ti). Tüm aile etkileri artık ortak, dar bantlarda tutuluyor (§16) — hiçbir aile aşırı uçta durmuyor ama hiçbiri de etkisiz kalmıyor.

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
Beş tür, iki çağda da aynı: Köpek (ömür 14) · Kedi (15) · Şahin (17) · Karga (18) · At (20), edinirken ±2 yıl. İsim havuzu 12 sabit isim. Ayrıntılar §46 (Papağan/Kurt 2026-10'da kaldırıldı).

### Gizemli Eşyalar (15 tanım, `envanter:`/`esya:` etiketiyle taşınır)
Kaynak: [gizemliEsyalar.ts](server/src/data/gizemliEsyalar.ts) (garanti havuzu) + [client/src/envanter.ts](client/src/envanter.ts) (görüntüleme): Ejderha Tılsımı, Kara Kılıç, Melek Tüyü, Mucize İksir, Ölünün Yüzüğü, Gölge Sikke, Gizemli Harita, Hazine Haritası, Bulunmuş Hazine, Kutsal Emanet (`esya:kutsal_kalinti` — ölümden koruma relik'i, §9), Lanetli Altın, Manastırın Kara Kedisi, Atadan Kalma Kılıç, Fısıldayan Taş, Eski Bir Ayna. Sadece 5'inin garanti takip-olay havuzu var (§11 kural 7): `melek_tuyu, kutsal_kalinti, lanetli_altin, fisildayan_tas, eski_ayna`.

### Hizipler (3 meslek çifti, `hizip.ts`'de `hizip_ata` ile atanır)
| Meslek | Seçenek A | Seçenek B |
|---|---|---|
| Asker | Eski Muhafızlar | Yeni Nizam |
| Tüccar | Liman Loncası | Pazar Birliği |
| Din Adamı | Gelenekçiler | Yenilikçiler |

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

**Evlilik (2026-10 yeniden tasarım):** olay dışı iki adaylı akış ve olay-tabanlı evlilik teklifleri kaldırıldı; evlilik artık mantık evliliği (aday listesi + teklif + düğün bütçesi) ve — Aşama 2'de — aşk evliliği (tanışma + sevgili) olarak §45'te anlatılan eş modeliyle yürür. `evlilik_yolu:ask|mantik_soylu|mantik_ticari` etiketleri düğünde yazılmaya devam eder (evlilik sonrası ~60 olay bunlara bağlı).

### İsim Havuzları
[npcIsimleri.ts](server/src/data/npcIsimleri.ts) — 8 bölge için kültüre uygun erkek/kadın isim listeleri (bölge başına ~30 erkek + ~12 kadın; 2026-09'da genişletildi) + çağa göre genel yedek havuz. Dost/rakip/amir/ast isimleri cinsiyet gözetmeden tüm havuzdan; anne/baba cinsiyete uygun havuzdan seçilir. **Eş ve tüm evlilik adayları** (olay-tabanlı `es_ata` + olay-dışı `rastgeleEvlilikAdayiUret`/`evlilikTeklifEt`) oyuncu erkek olduğu için **kadın** havuzundan (`rastgeleCinsiyetliIsimSec(cag,bolge,"kadin",...)`). **Oyuncu karakteri şu an yalnız erkek**, bu yüzden isim önerisi `rastgeleOyuncuIsmiSec` → `rastgeleCinsiyetliIsimSec(...,"erkek")` ile **sadece erkek havuzundan** gelir (`isimOnerisiGetir`, gameEngine). İstemci `isim_sec` ekranı açılınca (`yerlesimSecildi` → `rastgeleIsimGetir`) `GET /isim-onerisi` ile bölge/çağa uygun rastgele bir erkek isim çekip metin kutusuna **ön-doldurur** — oyuncu beğenmezse silip yazabilir ya da "🎲 Rastgele İsim" ile yeniden çekebilir. Erkek/kadın beklenti listeleri [astVeAile.test.ts](server/tests/astVeAile.test.ts)'te birebir kopyalıdır; havuz değişirse test de güncellenmeli.

## 17. Hapis, Yolculuk & Aranma Kademesi Alt Sistemleri

Üçü de benzer bir mekanik kalıp kullanır: bir etiket (veya sayısal eşik) normal olay havuzunu **tamamen kapatıp** kendi özel havuzuna geçirir (§12 `uygunMu`).

**Hapis:** `suc_seviyesi>=45` gated tutuklama olayları ([hapis.ts](server/src/data/olaylar/hapis.ts) `minSucSeviyesi:45`) VE birçok sıradan olayın başarısız sonucundan (`etiket_ekle:["hapiste"]`, ör. `aile.ts`, `hapis.ts` içindeki riskli seçimler) girilir. Bu eşik 2026-09 yeniden düzenlemesindeki "Kademe 1 - Yakalanma" bandının (25-50) içinde kalır — bilinçli olarak dokunulmadı, tutarlı: o banda giren biri zaten rastgele otomatik tutuklanma riskiyle karşılaşabilir. İçerideyken sadece `hapisOlayi:true` (46 olay) gösterilir: kaçış girişimleri, rüşvet, af dilekçesi vb. — başarılı seçim `etiket_sil:["hapiste"]` ile çıkarır, başarısız olan içeride tutar (bazıları ek sağlık/ün cezası verir).

**Ceza yılı sayacı (`hapis_ceza_kalan` + `hapis_ceza_toplam`, 2026-09 yeniden düzenleme):** "hapiste" etiketi *yeni* eklendiğinde (`sonucuUygulaVeIlerlet`'te `etiket_ekle` işlenirken, ya da `kotuIsYap`'ın kendi yakalanma dalında) tutuklanma anındaki `suc_seviyesi`'ye göre `hapisCezaSuresiHesapla` (gameEngine.ts) tek bir aralıktan rastgele bir ceza üretir — hangi olay/yol tutukladığından bağımsız: **0-25→3-4y · 25-50→7-9y · 50-75→9-11y · 75+→12-14y** (`data/aranmaSabitleri.ts` `HAPIS_CEZA_ARALIKLARI`; tahliyede aranma en fazla 10'a iner, §47). Bu değer hem `hapis_ceza_kalan`'a (geri sayan) hem `hapis_ceza_toplam`'a (sabit, tahliyeye kadar değişmez) yazılır. Her turda `hapis_ceza_kalan` geçen yıl kadar erir; **0'a inince karakter otomatik serbest kalır** (her iki sayaç da sıfırlanır, "hapiste" silinir, hayat-hikayesine "Cezasını tamamlayıp serbest kaldı" + `zamanAnlatimi`'ye çıkış cümlesi). Her hapis turunda `zamanAnlatimi` "tahliyene ~N yıl kaldı" satırı ekler; istemcide `GorevEkrani`'nin ⛓️ rozeti "· ~N yıl kaldı" gösterir. Bir olay seçimiyle (rüşvet/af/başarılı kaçış → `etiket_sil:["hapiste"]`) çıkılırsa iki sayaç da sıfırlanır. Üst üste tutuklanmada mevcut ceza korunur (sayaç zaten > 0 ise dokunulmaz). `hapis_ceza_artis` (riskli kaçış başarısızlığı) her iki sayaca birden eklenir. **"Aynı turda serbest kalma" düzeltmesi:** minimum ceza (2y, temiz bandda) turdaki maksimum yıl ilerlemesiyle (2y) eşit olabildiği için, tutuklanmanın olduğu TUR içinde doğal erime hiç uygulanmaz (`hapisteYeniGirildiBuTur` bayrağı) — aksi halde kısa bir ceza, tutuklandığı turun `yasArtisi`'yle aynı anda 0'a inip karakter hiç hapis hissetmeden aynı seçimde serbest kalabiliyordu. Ceza erimesi her zaman **bir sonraki** turdan başlar.

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
| Temiz/Kademe 1 | 0-25 | Rutin çevirme, rüşvet | 3-4 yıl | Düşük ağırlıklı "tetikleyici" olaylar (`maxSucSeviyesi:24` — devriye durdurması, meyhane kavgası vb.) + rutin çevirme/rüşvetçi bekçi olayları (aynı üst sınır); kefaret ucuz (13-25) |
| Kademe 2 | 25-50 | **Yakalanma** | 7-9 yıl | İhbarcı/ev araması tehdidi gibi olaylar — **iki gerçek yol**: kefaretle öde ve suçu düşür, YA DA reddet (kaybedersen doğrudan `etiket_ekle:["hapiste"]` — hapse girip [hapis.ts](server/src/data/olaylar/hapis.ts)'teki parasız riskli kaçış olaylarıyla kaçmayı deneyebilirsin) |
| Kademe 3 | 50-75 | **Baskın** | 9-11 yıl | Kefaretler ciddi artar (85-147); iki büyük "Ev/İş Yeri Baskını" olayı (`minSucSeviyesi:50`, max yok) neredeyse kaçınılmaz hâle gelir; en az **5 yıl** yatmadan para/af ile çıkış yok (aşağıdaki `hapisErkenCikisMumkunMu`) |
| Kademe 4 | 75-100 | **Azılı suçlu** | 12-14 yıl | En sert olaylar (azami takip, ödül avcıları) + en yüksek kefaretler (139-200); aynı 5-yıl-yatma kısıtı burada da geçerli |

Kendi özel havuzu [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) (32 olay) her bandın kendi `minSucSeviyesi`/`maxSucSeviyesi`'ne kilitlenir; her bandın kefaret/rüşvet çıkışı `suc_artis` negatif (-25/-45/-65) verir. `suc_seviyesi` ≥50 iken iki büyük "baskın" olayı tetiklenebilir; sonuçları `suc_seviyesi_ayarla` (10 = temize çık, 30 = kademe 1'e in) ile kesin değere sabitler. Başarılı kaçış `etiket_ekle:["kacak"]` ile karakteri dağa kaçırır — bu noktadan sonra `kacakOlayi:true` (10 olay) şehir havuzunu tamamen kapatıp kendi hayatta kalma zincirini açar (diğer kaçaklar, kışı atlatma, yeni kimlik vb.); birkaç başarılı çıkış olayı `etiket_sil:["kacak"]` ile şehre dönüşü sağlar. Pasif azalma: 5 yıl suçsuz kalınca yılda −1 (§13); asıl düşüş yolları kefaret (Aranma ekranı, §47)/rüşvet/baskın çıkışlarıdır. Üst şeritteki 3 aranma yıldızı bu tek ekseni gösterir (`bolgeTema.aranmaYildiz`, §4, §19). Ceza süresi formülü ve "5 yıl yatmadan erken çıkış yok" kuralı için bkz. §17 "Ceza yılı sayacı" + "Ağır bantta erken çıkışı kısıtlama".

## 18. Ölüm, Skor, Hayat Amaçları (3'lü sistem), Liderlik Tablosu

**Hayat Amaçları** (`state.hayat_amaclari: AmacIlerleme[]`, 2026-09 — eski tekil rastgele `hayat_amaci` KALDIRILDI). Kaynak: [server/src/data/hayatAmaclari.ts](server/src/data/hayatAmaclari.ts).

- **Atama:** doğuşta değil, **15 yaşında meslek seçilince** (`mesleğiSec`). Havuz = **ortak + meslek + çağ** (`amacHavuzu(cag,meslek)`), her kombinasyon ≥8 normal + ≥5 zor görür; `amaclariUret` **2 normal + 1 zor** çeker. `createCharacter` artık amaç atamaz (`hayat_amaclari: []`).
- **Bonus (toplamsal):** `amacSkorCarpani(state) = max(1, Σ tamamlanan amaçların bonusları)` — normal **+1.5**, zor **+2**. → 2 normal + 1 zor hepsi = **×5** (eski "amaç tamamlandı = ×5" tavanı korunur), kısmi tamamlama ×1.5/×2/×3/×3.5 üretir. `hesaplaSkor`: `temelToplam × carpan` (2026-09 ikinci reformu, §18 — eski kayıt/test için `hayat_amaclari` boş + tekil `hayat_amaci.tamamlandi` ise ×5 fallback).
- **`kontrolAni`:** `"herhangi"` = bir an bile eşiğe dokunmak yeter, kalıcı kilitlenir (`amaclariHerhangiKontrol` her tur, §9 adım 16); `"olumde"` = yalnız ölüm anındaki duruma bakılır (`amaclariOlumdeKontrol`, `checkDeath` içinde — tüm tamamlanmamışlara son bir bakış). İkisi de hayat-hikayesine "🎯 Hayat amacını tamamladı: …" yazar.
- **Para/servet amaçlarında "temiz el" şartı:** `suc_seviyesi < 40` (suçla zengin olan bonus alamaz).
- **Ömürlük sayaçlar** (amaç koşulları için, hepsi `CharacterState`, `eskiKayitGocu` göçlü): `omur_zirve_suc` (suç seviyesinin tepe değeri — `clampStats`'te takip), `omur_kumar_net` (zar/üçkâğıt/bilek net kâr — `zarAt`/`ucKagitciOyna`/`bilekGuresiSonuc`), `omur_sadaka_sayisi` (`sosyallesmeAksiyonYap` sadaka dalı), `omur_hediye_sayisi` (`hediyeEt` + `aileEtkilesimYap` `es_hediye`/`cocuk_hediye`), `omur_riskli_basari` (`secimUygula`: zar başarılı **ve** o seçeneğin `basarisizSonuc`'unda `olum` ya da `olum_sansi ≥ RISKLI_OLUM_SANSI_ESIK=25` varsa +1).
- **Havuz (özet):** ORTAK normal — denk_kasa (servet≥200·temiz), taninan_yuz (un≥72), dinc_ihtiyar (yas≥75), ocak_sahibi (evli+3 çocuk), saglam_omur (62+ yaş sağlık≥75), meyhane_mudavimi (3 alkollü âlem), sansli_el (kumar net +80), gizemli_kader (esya:/envanter: etiketi), korkusuz_secim (omur_riskli_basari≥1). ORTAK zor — servet_zirvesi (servet≥400·temiz), yasayan_efsane (un≥97), kalabalik_soy (4 yaşayan çocuk + yakın bağ; 2026-10'da 6'dan indi — eş başına 5 doğum tavanı), zengin_ve_ihtiyar (servet≥220 & yas≥68, **olumde**), lekesiz_omur (ahlak≥90 & omur_zirve_suc<20 & yas≥55, **olumde**), sarhos_ama_ayakta (ayyaş + 65 yaş, **olumde**), kumar_efsanesi (kumar net +250), olumle_dans (omur_riskli_basari≥3). ASKER: komuta/serdar (rütbe 4/5), cephe_gazisi (2 tarihi savaş), guclu_ordu/ordu_kurucusu (ordu 150/240), tam_donanim (teçhizat 80), madalyali (3 ünvan), sehir_kalkani (şehir yön. 3), bas_belasi (2 rakip yenildi). TÜCCAR: lonca_ustasi/lonca_reisi (rütbe 4/5), uc_kepenk/tekelci (3/4 mülk), buyuyen_sermaye/sermaye_devi (ticaret sermaye 80/140), kar_marji (servet≥240·temiz), hediye_agi (6 hediye), imparator (rütbe5+servet≥380). DİN ADAMI (servet görevi yok): kursu_sahibi/piskopos (rütbe 4/5), comert_el/aziz (ahlak 82 / ahlak96+nüfuz85), nufuzlu_vaiz (nüfuz 70), sadaka_tasi (18 sadaka), kutsal_gorev (yolculuk_tamamlandi), ruhani_onder (şehir yön. 3), gunahsiz (omur_zirve_suc<15 & yas≥60 & ahlak≥70, **olumde**). ÇAĞ: OÇ kutsal_yolculuk (normal, yolculuk_tamamlandi) / sarayda_soz (zor, `sarayda`+un≥75); SD sanayici (normal, servet≥200+2 mülk·temiz) / kasif_ruhu (zor, yolculuk_tamamlandi+servet≥240).
- **API:** `GET /:id/amaclar` → `{ amaclar: AmacKarti[], carpan }` (`amaclarGetir`) — her kart `{id, baslik, aciklama (state.dil'e göre), zorluk, bonus, kontrolAni, tamamlandi, tamamlanmaYili, mevcut, hedef}`; `mevcut/hedef` yalnız sayısal amaçlarda (`AMAC_ILERLEME` haritası), boolean amaçlarda `null`. Turu tüketmez.
- **İstemci:** `client/src/components/AmacPaneli.tsx` — sağ panelde (`<SiyasetPaneli>` altında) her zaman görünen canlı ilerleme çubuklu kart + ölüm ekranında `varyant="olum"` özeti. `App.tsx` bir `useEffect` [id, tur_sayisi, meslek, ekran] `amaclarGetir`'i tazeler. **`KariyerEkrani` ("Görevin") ekranına henüz bölüm eklenmedi** (o ekran paralel geliştiriliyordu). i18n metinleri bileşene gömülü TR+EN.

Tests: [server/tests/hayatAmaclari.test.ts](server/tests/hayatAmaclari.test.ts) + [basarimlar.test.ts](server/tests/basarimlar.test.ts) "hayat amaçları (3'lü sistem)" bloğu.

**Ölüm** (`checkDeath`): `aktif=false`, `olum_nedeni` yazılır (relik istisnası §9). **Skor liderlik tablosuna OTOMATİK kaydedilir:** ölüm ekranı açılınca istemci (`App.tsx` `useEffect`, `otoSkorKaydiRef` ile oturum başına tek sefer) `POST /api/scores`'u `state.isim` ile (boşsa `"İsimsiz"`/`"Nameless"`) kendiliğinden çağırır — oyuncunun isim yazıp "Kaydet" demesi gerekmez (isim zaten oyun başında `isim_sec`'te alınıyor). `skoru_kaydedildi` bayrağı tekilleştirir. Otomatik kayıt ağ/hız-sınırı ile başarısız olursa (`otoKayitBasarisiz`) elle isim+kaydet formu yedek olarak görünür; aksi halde ekranda yalnızca "kaydediliyor…" → "kaydedildi" mesajı gösterilir.

**Geçmiş oyun backfill'i:** Sunucu açılışında `basla()`, `oturumlariYukle()`'den sonra `gecmisSkorlariKaydet()` ([gameEngine.ts](server/src/game/gameEngine.ts)) çağırır — DB'de hâlâ duran (`aktif:false`) ve `skoru_kaydedildi:false` olan tüm bitmiş oturumları `skoruDbyeYaz(state, state.isim ?? "İsimsiz")` ile liderlik tablosuna geçirir (isim boş/uygunsuzsa "İsimsiz"), her biri için `skor_kaydi` metriği yazar, `skoru_kaydedildi=true` damgalar. İstemci "kaydet" demeden ölen ya da eski istemciyle oynanmış geçmiş oyunları kurtarır. 7 günlük bitmiş-oturum temizliği (§2) yüzünden yalnız son ~1 haftanın oyunları kurtarılabilir; sonraki restart'larda flag sayesinde tekrar eklenmez. İsim [kufurFiltresi.ts](server/src/moderasyon/kufurFiltresi.ts)'nden geçer (Türkçe karakter/leetspeak normalize eden basit kök-kelime eşleştirmesi, TR+EN küfür listesi). Ayrıca ölümde istemci, karakterin bir özetini tarayıcıya (`client/src/gecmisHayatlar.ts`, localStorage) kaydeder — giriş ekranındaki "Geçmiş Hayatların" listesi bunu okur.

**Soy sürdürme kaldırıldı (2026-09):** Eski `POST /:id/soy-surdur` endpoint'i, `gameEngine.soyuSurdur`, `SoyDevamiSecenekleri` ve `hanedan.test.ts` tamamen silindi. Ölüm kesin sondur; `createCharacter`'ın dördüncü parametresi artık `soyDevami` nesnesi değil, opsiyonel `oyuncuIsmi: string`'tir.

**Liderlik tablosu sıralamaları:** `genel` (skor), `en_zengin`, `en_unlu` (un), `en_uzun_yasayan` (yas) — her biri **top 15** (2026-09'da 20→15). İstemci satırları sadeleşti: meslek/yerleşim/kişilik gösterilmiyor (rütbe zaten var), yalnız rütbe + çağ + yaş + ölüm nedeni + ünvan/efsanevi-ölüm rozetleri. Yama #1: `skorRepository.skorKaydet` artık `Score.para` alanına salt nakit değil **nakit + gayrimenkul değeri** (`gayrimenkulDegeriHesapla`) yazar → `en_zengin` net serveti sıralar, mülke yatırım yapan cezalanmaz.
