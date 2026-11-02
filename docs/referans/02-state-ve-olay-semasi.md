# Kader Çarkı Referansı — CharacterState, SonucEtkisi, Olay Şeması, Olay Bankası, Etiketler

> `CLAUDE.md`'den bölünmüş referans (içerik birebir aynı, §numaraları korunur). Tamamını okuma; `grep -n "^## "` ile bölüm bul, gerekli bölümü `Read offset/limit` ile oku. **Çelişkide numarası/sürümü yüksek olan bölüm geçerlidir** (ör. §45 v13 > §45 v8, §51-§53 > eski §13/§27).

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
| `meslek_yatkinlik_seviyesi` | 1-4 \| null | Mesleğe yatkınlık kademesi (§40) — meslek seçilirken bir kez hesaplanır, ASLA değişmez; meslek seçilmediyse `null` |
| `meslek_yatkinlik_unvani` | string \| null | Kademeden türeyen kanonik (TR) unvan — ör. "Kılıca Yatkın" (§40) |
| `meslek_zar_bonusu` / `meslek_maas_carpani` / `meslek_tecrube_hizi` | number | Kademeden türeyen kalıcı oransal bonus/malus (nötr kademede 0) — sırasıyla olay şansı, maaş ve kariyer_puani kazanç hızına biner (§40) |
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
| `suc_seviyesi` | 0-100 (başlangıç 0) | **TEK suç/aranma ekseni** (eski ayrı `aranma_seviyesi` alanı 2026-08'de buna katıldı). Karaborsa/kumardan ve `suc_sinifi` taşıyan suç seçimlerinden (§9 adım 3.5) birikir; 5 yıl suç işlemezsen yılda −1 pasif düşüş (6. yıldan itibaren) (`SUC_SEVIYESI_PASIF_AZALMA_YILLIK`, `son_suc_yili`, §13); hapis olaylarını tetikler (§17, `minSucSeviyesi:45`); üst şeritte `bolgeTema.aranmaYildiz` ile **3** yıldıza (25/50/75) bölünüp gösterilir, ≥50'de kırmızıya döner. **Aranma II (2026-10) tüm detayı §47'de.** **Aranma kademe bantları (2026-09 yeniden düzenleme, 5→4 bant):** 0-24 temiz/rutin (kademe 1 de bu üst sınırı paylaşır, ceza 3-4y) · 25-49 kademe 1 "yakalanma" (öde-ve-düş VEYA reddet — kaybedersen hapse girip kaçmayı deneyebilirsin, ceza 7-9y) · 50-74 kademe 2 "baskın" (kefaretler artar, ev/işyeri baskını neredeyse kaçınılmaz, ceza 9-11y) · 75-100 kademe 3 "azılı suçlu" (ceza 12-14y) — [aranmaSeviyesi.ts](server/src/data/olaylar/aranmaSeviyesi.ts) olayları `minSucSeviyesi`/`maxSucSeviyesi` ile bu bantlara kilitlenir, ceza aralıkları `gameEngine.ts` `hapisCezaSuresiHesapla(sucSeviyesi)` tek fonksiyonunda hesaplanır (§17) |
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
| `meslek_musteri` | Hepsi *(2026-10, v8.1)* | Oyuncunun müşteri sayısı (eski gizli `meslek_gucu` kalktı, §45 v8.1). Pazar payı = `meslek_musteri / pazar_musteri`; maaşı ve rütbeyi etkiler |
| `uretim_kapasitesi` | Zanaatkâr *(2026-09 sonu)* | 0-100, `SonucEtkisi.uretim_kapasitesi_artis` ile dolar. **Bilinçli olarak placeholder** — `meslekMetrikCarpani` bu meslek için `×1` sabit döner, maaşa/oyun içi hiçbir etkisi yok; dengesi sonraya bırakıldı |

### İlişkiler & aile
| Alan | Açıklama |
|---|---|
| `dost_adi` / `rakip_adi` | Doğuşta atanır, sabit |
| `anne_adi` / `baba_adi` | Doğuştan, hayat boyu sabit |
| `es_adi`, `es_meslek`, `es_rutbe` | Düğünde atanır (`dugunYap`); `es_ata` olay etkisi eski uyum yolu (`esiOlaydanAta`). **`es_puani` = ilişki barı (0-100).** Diğer eş alanları (`es_dogum_yili`, `es_evlilik_turu`, `es_grup`, `es_huylar`, `es_meslek_bonusu`, `es_dugun_un`, `es_son_zaman_yili`, `es_dusuk_yil`, `es_terk_esigi`, `es_dogum_sayisi`, `es_sonraki_hamilelik_yili`, `es_ihmal_uyari_goruldu`) + `mantik_adaylar`/`mantik_yenileme_yili`/`mantik_kilit_yili`/`bekleyen_dugun`/`yas_bitis_yili`: §45 |
| `cocuk_sayisi`, `cocuklar: Cocuk[]` | `{isim, dogum_yili, yasiyor, iliski, yatkinlik?, erken_olum_yili?}` (yatkınlık doğumda %70/%20/%10; erken ölüm doğum komplikasyonu, §45) |
| `ekip: EkipUyesi[]` | İşe alınan yardımcılar (§ aşağıda) |
| `hizip` | string\|null — katılınan hizbin adı (§16) |
| `evcil_hayvan` / `evcil_hayvanlar` / `hayvan_karsilasma_sayisi` / `hayvan_karsilasma_turleri` | `evcil_hayvanlar: EvcilHayvan[]` (`{tur, isim, edinim_yili, edinim_yasi, omur, bonus_id}`, aynı anda en fazla 2); `evcil_hayvan` = ilk yaşayan (eski alan, `evcilHayvanSenkronla` türetir); sayaç ≤2, tür listesi (§45) |
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
| `konut_id` | Varsayılan `mutevazi_yuva` (§16) |
| `yasam_secimi_id` | Varsayılan `sade_sofra` (§16) |
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
| `ekstra_vergi_sonraki_yil` | number\|null — şehir yöneticisinin bir sonraki ekstra vergi talebinin en erken yılı (işletmeli mesleklerde, §52) |
| `son_rakip_soygun_yili` | number\|null — "rakip parayı alıp kaçtı" soygununun son yaşandığı yıl (nakit ≥ 150 iken düşük ihtimalli, 8 yıllık cooldown, §27) |
| `buyuk_savas` | `{dusman, baslangicYili, bitisYili, vergiOrani, gidaCarpani}`\|null — aktif tekrarlayan büyük savaşın parametreleri (§27); `null` iken savaş yok |
| `son_buyuk_savas_bitis_yili` | number\|null — en son büyük savaşın bittiği yıl (10 yıllık minimum cooldown takibi, §27) |
| `veba` | `{aktif, baslangicYili, bitisYili, etkiBitisYili, konutKiraCarpani, gelirCarpani, korumaSeviyesi}`\|null — veba (§27); aktif faz bitince `aktif:false` olarak `etkiBitisYili`'ye kadar iz bırakır, sonra `null`. `korumaSeviyesi` (yama #2): 0=hiç / 1=kısmi / 2=tam koruma — yıllık ölüm risk kademesini belirler |
| `ulke_gecmisi` | `UlkeGecmisiKaydi[]` (`{yil, tur:"savas_basladi"\|"savas_bitti"\|"veba_basladi"\|"veba_bitti"\|"kriz_basladi"\|"kriz_bitti", ayrinti?}`, en fazla 30, eskiden yeniye) — ülkedeki oyun içi savaş/veba/kriz başlangıç-bitişinin KALICI kaydı (`ulkeGecmisiEkle`, stateManager). `buyuk_savas`/`veba`/`ulke.kriz` bitince silindiği için "Yıl" penceresi (§43) geçmişi buradan okur. `ayrinti`: savaşta ham TR düşman adı, krizde kriz türü. `eskiKayitGocu` `[]` backfill eder |
| `veba_gecirdi` | boolean — hayatta en az bir kez veba geçirildi mi (yama #2'den beri SALT istatistik/flavor; tetiklemeyi artık bloklamaz) |
| `veba_olum_riski` | number (0-100, başlangıç 0) — karakter vebayı BİZZAT kaptıysa (etiket `veba_hastasi`) o anki ölüm riski %; bulaşınca ~70, `vebaHastasiOlayi` seçimlerinin `veba_olum_riski_artis` etkisiyle ± değişir, turda geçen zamanla -15/tur doğal düşer, ≤12'de iyileşilir. Hasta değilken 0 (§27) |
| `son_veba_bitis_yili` | number\|null (yama #2) — en son veba dalgasının (iz fazı dahil) tamamen bittiği yıl; 20 yıllık cooldown buradan sayılır. Veba artık "ömürde bir kez" değil, dalga bitince 20 yıl sonra tekrarlanabilir |
| `kucuk_kriz_sonraki_yil` | number — bir sonraki küçük krizin (kıtlık/haydut baskını) tetikleneceği yıl eşiği (§27) |
| `gida_fiyat_sok_bitis_yili` | number\|null — küçük kriz tetiklendiğinde bu yıla kadar geçerli ×2 gıda fiyat şoku (`yil+2`, §27) |
| `borc_yardimi_alindi` | boolean — ömürde bir kez borçtayken (bütçe açığı sürerken) alınan kilise/eş dost yardımı kullanıldı mı (§13). Eski kayıtlarda `eskiKayitGocu` `false` atar |
| `rakipler` | `Rakip[]` — isimli rakipler `{ad, meslek, guc, husumet, yenildi}`; `rakipler[0].ad === rakip_adi`. `mesleğiSec`'te **TEK** rakip üretilir (2026-09'da 2 rakipten 1'e indirildi — `eskiKayitGocu` eski 2-rakipli kayıtları da tekile indirir, §34.2) |
| `salgin_korunma_yatirimi` | `{kademe:1\|2, yil}`\|null — bir sonraki veba dalgasında `vebaBaslat`'a aktarılıp tüketilen taban korunma yatırımı (§34.4) |
| `kredi` | `Kredi`\|null — aktif tefeci kredisi `{anapara, kalanBorc, faizOrani, yillikTaksit, vadeYil, alindigiYil, odenmeyenTaksit, pazarlikYapildi}`; aynı anda en fazla bir (§34.5). `kredi_teklifleri` `{idler, yil}` = tefecinin o anki 2 teklifi |

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

**Meslek/ilerleme:** `yeni_meslek` (kariyer değişimi), `maas_carpani` (kalıcı çarpan, `maasCarpaniUygula` ile birikir — 2026-09'dan beri pozitif katkı yarıya iner + toplam `[0.60,1.40]`'a kırpılır, §13), `sehir_yonetim_artis` (§15), `kariyer_puani_artis` (rütbe ilerlemesini hızlandırır, §14 — şu an kullanan olay yok), `ordu_techizat_artis`/`ticaret_sermaye_artis`/`nufuz_artis` (0-100 clamp, sadece techizat), `suc_artis` (TEK suç/aranma ekseni `suc_seviyesi`'ni değiştirir, ± olabilir — rüşvet/kefaret şıkları negatif verir, 0-100 clamp; pozitif artış için olay verisinde `suc_sinifi` kullanılır, kumar sabit +1 istisna), `suc_sinifi` (`"kucuk"|"orta"|"buyuk"|"agir"` — yasa dışı eylem sınıfı, aralıktan motor değer seçer, para ×1.6; bkz. §9 adım 3.5), `suc_seviyesi_ayarla` (`suc_seviyesi`'ni mevcut değerden bağımsız doğrudan verilen değere sabitler, 0-100 clamp — büyük baskın "temize çık / kademe 1'e in" sonuçları için), `hapis_ceza_artis` (hapiste kalan ceza süresini yıl olarak uzatır — başarısız riskli kaçış girişimi; yalnız "hapiste" etiketi varken anlamlı, §17).

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
**Uygunluk filtreleri** (hepsi opsiyonel; hepsi AND'lenir, bkz. §12 `uygunMu`): `cag, bolgeler[], meslekler[], minYas/maxYas, minAhlak/maxAhlak, minUn/maxUn, minMutluluk/maxMutluluk, minSaglik/maxSaglik (yama #1'de düşük-can toparlanma olayları için eklendi; o havuz — `saglikToparlanma.ts` — 2026-09 sonunda §11 kural 1.5 lehine tamamen kaldırıldığından şu an olay bankasında bu alanı kullanan tek olay yok, altyapı hazır duruyor), minRakipPuani/maxRakipPuani, minEsPuani/maxEsPuani, gerekliEtiketler[], yasakliEtiketler[], gerekliUlke (Partial<UlkeDurumu>), gerekliKisilik, gerekliDin, minRutbeSeviye, minSucSeviyesi/maxSucSeviyesi (aranma kademe bantları, §17), kacakOlayi (bool, §17), gerekliEkip (bool), gerekliEkipRolu, gerekliHizip (bool), hapisOlayi (bool), hapisParaylaCikisOlayi (bool, §17 — para/af ile KESİN çıkış sunan hapis.ts olayları; ağır bantta en az 5 yıl yatılana kadar gizlenir, fiziksel kaçış girişimleri bundan muaf), hapisKacisBaslangici (bool, §17 — kaçış/erken-tahliye stratejisi başlatan olay; ilk 2 hapis olayı çözülmeden ve toplam ceza 5 yıldan kısaysa asla çıkmaz), yolculukOlayi (bool), vebaHastasiOlayi (bool, §27 — sadece "veba_hastasi" etiketi varken), minMeslekYatkinlikSeviye/maxMeslekYatkinlikSeviye (1-4, §40 — mesleğe yatkınlık kademesi; seçilmemiş meslekte hep kilitli)`.
**Seçim ağırlığı:** `agirlik?` (varsayılan 1), `ton?: "agir"|"hafif"` (art arda ağır olayı azaltır), `gizemli?` (salt iç kategorizasyon, filtrelemeyi etkilemez).

### `OlaySecenegi` (bir seçenek)
```
metin, baseBasariSansi (0-100), basariliSonuc, basarisizSonuc: SonucEtkisi
```
**Kilit koşulları** (kilitlenirse `kilitAciklamasi` gösterilir, bkz. §12 `kilitNedeni`): `maliyet? (para eşiği), minUn?, minAhlak?, maxAhlak?, gerekliEtiketler?[], yasakliEtiketler?[], minMeslekYatkinlikSeviye?/maxMeslekYatkinlikSeviye? (1-4, §40 — yalnız bu ŞIK kilitlenir, olay yine herkese çıkar)`.
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

`data/olaylar/index.ts` tüm alt listeleri `OLAY_BANKASI: OlayTanimi[]` içinde birleştirir. **Toplam 1723 olay** (id sayımıyla, 2026-09 sonu itibarıyla güncellendi — 4. meslek Zanaatkâr'ın 130 olayı, `genel.ts`'e eklenen `sehir_yonetim_zanaatkar_baslangic` giriş olayı, 80 bölgesel olay (§16'ya bakın, `bolgeselOrtaCag.ts`/`bolgeselSanayi.ts`), 90 olaylık "gecikmiş takip" havuzu (§37), 30 olaylık "sağlık kritik eşiği" havuzunun (`saglikKritik.ts`, §11 kural 1.5) eklenmesi VE eski 8 olaylık `saglikToparlanma.ts`'in tamamen kaldırılması, mesleğe yatkınlık kademesi gating'ini örnekleyen 4 olay (§40) ve Mükemmel kademeye özel 8 yeni olayın (§41, `meslekYatkinlikOlaylari.ts`, toplam 12) eklenmesi sonrası gerçek sayı, `npx tsx -e "import{OLAY_BANKASI}from './src/data/olaylar';console.log(OLAY_BANKASI.length)"` ile doğrulanabilir). Belirli bir olayı bulmak için `grep -n "id: \"<olay_id>\"" server/src/data/olaylar/*.ts` kullan — dosyayı baştan sona okuma.

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
| `ortaCagZanaatkarYollari.ts` | 45 | 1045 | **(2026-09 yeni — 4. meslek Zanaatkâr)** Orta Çağ Zanaatkâr kariyer yolu dallanması (1 giriş + "yol:zanaatkar:lonca_sadik/yenilikci/hileci/sanatkar" × 11, §16). 2026-09 sonu itibarıyla İngilizce çevirisi tamamlandı ([ortaCagZanaatkarYollari.en.ts](server/src/i18n/olaylar/ortaCagZanaatkarYollari.en.ts)) |
| `sanayiZanaatkarYollari.ts` | 45 | 1038 | **(2026-09 yeni — 4. meslek Zanaatkâr)** Sanayi Devrimi Zanaatkâr kariyer yolu dallanması (1 giriş + "yol:zanaatkar:makineci/gelenekci/sendikaci/girisimci" × 11, §16). 2026-09 sonu itibarıyla İngilizce çevirisi tamamlandı ([sanayiZanaatkarYollari.en.ts](server/src/i18n/olaylar/sanayiZanaatkarYollari.en.ts)) |
| `ortaCagZanaatkar.ts` | 20 | 466 | **(2026-09 yeni)** Orta Çağ Zanaatkâr'a özel (yol-öncesi/yol-bağımsız standalone havuz). İngilizce çevirisi tamamlandı |
| `sanayiZanaatkar.ts` | 20 | 499 | **(2026-09 yeni)** Sanayi Devrimi Zanaatkâr'a özel (yol-öncesi/yol-bağımsız standalone havuz). İngilizce çevirisi tamamlandı |
| `sosyallesme.ts` | 73 | 2752 | Sosyalleşme mekân olayları — 2026-09'dan beri sadece 6 mekân id'sine bağlı (pazar_meydani, meyhane, pub, ordugah_cadiri, dini_meclis, lonca_meclisi; hamam/kahvehane/kervansaray→pazar_meydani, salon→meyhane remap edildi). Normal havuzdan tamamen dışlanır, sadece `POST /:id/sosyallesme` ile zorlanır (§25). Tur-harcamayan içki/deli/sadaka/kulak/ısmarla/fal aksiyonları ayrı: [sosyallesmeAksiyonlari.ts](server/src/data/sosyallesmeAksiyonlari.ts) |
| `hizip.ts` | 70 | 3416 | Hizip (faction) sistemi olayları (§16) |
| `evlilikVeAile.ts` | 66 | ~3100 | Evlilik yolu + aile devamı olayları |
| `esyaVeGizem.ts` | 48 | 3020 | Gizemli eşya edinme/takip olayları (§16) |
| `hapis.ts` | 46 | ~1600 | Hapis alt sistemi (§17) — ceza yılı sayacı + parasız riskli kaçış olayları dahil |
| `aile.ts` | 34 | ~1720 | Aile geçmişine özel olaylar |
| `aranmaSeviyesi.ts` | 32 | ~1495 | Aranma kademesi alt sistemi — TEK eksen `suc_seviyesi`'nin bantlarına (`min/maxSucSeviyesi`) kilitli tetikleyici/kademe/baskın/kaçak olayları (§17) |
| `evcilHayvan.ts` + `evcilHayvan{Kopek,Kedi,Sahin,Karga,At}.ts` | 6 genel + 12 eski türe özel + Köpek/Kedi/Şahin 18'er + Karga/At 22'şer = 116 | ~5000 | Evcil hayvan olayları: 6 genel takip + her tür için 6 karşılaşma (3 Orta Çağ + 3 Sanayi) ve çağ başına ≥10 devam olayı (§45) |
| `iliskiler.ts` | 22 | ~1075 | Dost/rakip/eş ilişki olayları |
| `ortaCagTuccar.ts` | 26 | ~1400 | Orta Çağ Tüccar'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `ortaCagAsker.ts` | 26 | ~1400 | Orta Çağ Asker'e özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `ortaCagDinAdami.ts` | 23 | ~1200 | Orta Çağ Din Adamı'na özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiAsker.ts` | 22 | ~1150 | Sanayi Devrimi Asker'e özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiDinAdami.ts` | 19 | ~950 | Sanayi Devrimi Din Adamı'na özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `sanayiTuccar.ts` | 18 | ~950 | Sanayi Devrimi Tüccar'a özel (yol-öncesi/yol-bağımsız standalone havuz) |
| `saglikKritik.ts` | 30 | ~950 | **(2026-09 sonu yeni)** İki adet 15'lik "sağlık kritik eşiği" havuzu (`OLAY_SAGLIK_ESIK_25`/`_10`) — normal havuzdan tamamen dışlanır (`saglikEsikOlayi`), bir hayatta İLK KEZ sağlık 25'in (ölüm riski yok) ve İLK KEZ 10'un (küçük `olum_sansi`) altına indiğinde `senaryoUret` kaskadı (§11 kural 1.5) tarafından ilgili havuzdan rastgele biri zorlanır, her eşik hayat boyu bir kez. Başarılı sağlık kazancı en fazla 14; her olayda güvenli-ücretli bir seçenek ile bedava-riskli (başarırsa daha çok can, başarısızsa daha çok kayıp) bir seçenek var. **Eski `saglikToparlanma.ts` (yama #1, 8 olay, `maxSaglik:45` ile normal ağırlıklı havuzda rekabet eden garantisiz bir toparlanma havuzuydu) bu iki havuzla çakıştığı için 2026-09 sonunda tamamen KALDIRILDI** (kullanıcı isteği) — düşük sağlıkta artık TEK yol bu dosya. İngilizce çevirisi yok (kasıtlı, henüz yapılmadı) |
| `kureselOlaylar.ts` | 5 | ~260 | "Dünya olayları". `kuresel_veba_baslangici` (3 seçenek = 3 korunma kademesi `veba_koruma` 0/1/2) + 4 "salgın dönemi" bulaşma olayı (`gerekliUlke:{vebada:true}`: kapını çalan / cenaze / çarşıda temas / hasta bakıcılığı — başarısızlıkta artık `etiket_ekle:["veba_hastasi"]`, öldürmez) — §27. Savaş/bağış/kriz hâlâ arka planda, olay ekranı yok |
| `vebaHastaligi.ts` | 10 | ~360 | **Vebayı bizzat kapmış (`veba_hastasi` etiketi) karaktere çıkan özel havuz (§27).** `vebaHastasiOlayi:true` → hastayken normal havuz kapanır (hapisOlayi mantığı). Hekim/ilaç/tedavi/hacamat/dinlenme/şarlatan/aile bakımı — `veba_olum_riski_artis` (± ) ile ölüm riskini düşürür/yükseltir; para harcayarak hayatta kalma şansı ciddi artar |
| `buyuluOlaylar.ts` | 16 | ~600 | **Büyü / büyücü / medyum / kehanet / ritüel olayları (büyük denge turu).** Hepsi `gizemli:true` → "her ömürde en az bir esrarengiz olay" kaskadı (§11.12) otomatik kapsar + düşük `agirlik` ile normal havuzda fırsatçı çıkarlar. Köy medyumu, kristal küre, cadı pazarlığı (OÇ, engizisyon riski), muska, lanet kaldırma ayini (`gerekliEtiketler:["bilgi:yasak_ilim"]`), ruh çağırma seansı (→ `envanter:fisildayan_tas`), simyacı, yıldız falı, rüya tabircisi, dört yol ağzında şeytanla pazarlık (`unvan_kazan`/`efsanevi_olum` dalları), uğursuz kara kedi, meydandaki kâhin, sahte iksir satıcısı, gölge adam, ay tutulması ritüeli, spiritüalist salon (SD). Mutluluk deltaları rubrik uyumlu (çoğu tedirginlik/−). İngilizce aynası `i18n/olaylar/buyuluOlaylar.en.ts` |
| `komikGaripOlaylar.ts` | 60 | 2523 | **Komik/garip sosyal olaylar (2026-09, önceki CLAUDE.md sürümünde bu tabloya hiç eklenmemişti).** Tamamı `kategori:"sosyal"` — yeme yarışması, yanlış şarkı, yanlış cenaze, köpekle banyo, dedikodu ikilemi, ağır taş kaldırma, kimlik gizleme, beklenmedik dans, hırsız yanlışlığı, yanlış sahte sakal vb. flavor/komedi odaklı olaylar. İngilizce çeviri mirror'ı (`komikGaripOlaylar.en.ts`) 2026-09 sonunda eklendi (bkz. §30). |
| `komikOlumler.ts` | 14 | ~460 | **Komik/absürt ölüm olayları (2026-09).** Oyuncu SEÇİMİYLE tetiklenen komik ölümler (eski, seçimsiz "ani ölüm" havuzu 2026-09 sonunda tamamen kaldırıldı, bkz. §13): fıçıyla şelale, en acı biber, heykele bıyık, arı kovanı, nefes tutma, dev kabak, buz gölü, gülle taşıma, değirmen kanadı, domuzla yarış, bez kanatlar, çürük köprü, fırtınada demir çubuk, buhar kazanı. Hepsi `ton:"hafif"`, düşük ağırlık (0.2-0.3), 2 seçenek: "aptalca olanı yap" (başarıda ufak komik ödül, başarısızlıkta `olum_sansi` 35-62 + ağır sağlık kaybı; ölürse `efsanevi_olum`) vs "yapma" (güvenli). 2026-09'da kalan 6 `olum:true` de `olum_sansi`'ye çevrildi — hepsinde "düşük de olsa hayatta kalma" şansı var |
| `gecikmisTakip.ts` | 90 | ~1140 | **(2026-09 sonu, önceki CLAUDE.md sürümünde bu tabloya hiç eklenmemişti — §37)** "Gecikmiş takip": bir seçimin 15-20 yıl sonraki geri dönüşü, 30 tema × (1 tetikleyici + 2 sonuç olayı) |
| `bolgeselOrtaCag.ts` | 40 | ~930 | **(2026-09, önceki CLAUDE.md sürümünde bu tabloya hiç eklenmemişti — §38)** 8 çağ×bölge bonus/malus paketinin Orta Çağ yarısını yansıtan flavor olaylar (10/bölge × 4 bölge) |
| `bolgeselSanayi.ts` | 40 | ~920 | **(2026-09, önceki CLAUDE.md sürümünde bu tabloya hiç eklenmemişti — §38)** Aynısı Sanayi Devrimi 4 bölgesi için |
| `meslekYatkinlikOlaylari.ts` | 12 | ~700 | **(2026-09 sonu, §40+§41)** Mesleğe yatkınlık kademesi gating'ini örnekleyen 4 temsili olay (Asker/Tüccar/Din Adamı/Zanaatkâr birer tane, hem `OlayTanimi` hem `OlaySecenegi` seviyesinde `min/maxMeslekYatkinlikSeviye` kullanır) + Mükemmel kademeye (20+) özel 8 yeni olay (meslek başına 2, §41) |

`types.ts` (162 satır, şemalar) ve `index.ts` (79 satır, birleştirme) bu sayıma dahil değil.

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
- `saglik_esik_25_gorundu` / `saglik_esik_10_gorundu` (2026-09 sonu) — bir hayatta ilgili sağlık kritik eşiği (25/10) olayının zaten zorlandığını işaretler, aynı eşik bir daha tetiklenmez (§11 kural 1.5, §13).
