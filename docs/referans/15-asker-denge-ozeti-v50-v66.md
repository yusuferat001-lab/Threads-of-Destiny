> **KAZANÇ = ELE KALAN (DEĞİŞMEZ KURAL):** "Kazanç" her zaman oyuncunun ELİNE KALAN yıllık tutardır = meslek neti (ordu/cemaat/atölye/dükkân neti, çalışan/SUBAY maaşları düşülmüş) − YAŞAM − KİRA − evcil hayvan − kredi taksidi + mülk geliri. Kazançtan vergi/yüzde/eşik/tavan denince bu SON tutar kastedilir; meslek netinden (yaşam ve subay düşülmeden) ASLA hesaplanmaz.

# §54 — Asker denge turu özeti (v50–v69, **v67 Madde 1–7 turu dahil**): ne var, ne yok (2026-11)

Bu dosya, Asker üzerinde yapılan tüm ayar konuşmalarının **tek yerde toplanmış durumudur**. Ayrıntılı sürüm notları `13-garanti-sink-tema.md` §45 v50–v66'dadır; sayı çelişirse **kodu** (`server/src/data/birlik.ts`) ve daha yüksek sürümü esas al.

> **GÜNCEL DURUM ÖZETİ (v67 Madde 1–7, `main`'de; çelişirse bu kutu + dosyanın EN ALTINDAKİ "v67 — Madde N" bölümleri geçerlidir):**
> - **Ekonomi:** er masrafı 0,23 · erzak 0,13 · devlet er başı ödeme 0,15 · sold 9,25 · savaşta er başı ödeme zammı **yok (×1)** · kıtlık ordu morali −1,5 · bolluk ordu morali 0 · kışla bakımı 3/8/22/60/150 · yıllık sabit +1 er YOK · Devşirme Bürosu/Revir fiyatı ×1,2 (v69'un "×1 / −1 / +1,5" değerleri geçersiz; mekanikleri — sold/erzak dönem çarpanı, görev dönem kısıntısı ≤%12, yerel ödeme adı — geçerli).
> - **Görev:** asgari güç 10/40/80/145/250; er başı 0,55–0,70 (×1,05); gelir er bazlı, verim ilk 100 er 1,0 → 500 erde 0,75 (doğrusal).
> - **Moral/talim:** güce etki +%20 (100) / −%15 (0), nötr 50; talim ücretsiz, üst limit **Talim Alanı** (yok 70 · 75/80/85/90), yıllık +1…+4; yeni er giriş talimi 15; komuta tonu YOK; moral/talimde "gelecek yıl" değişimi `gelecekYilDegisimi`.
> - **Seferberlik:** Gazi Çağrısı %8 er · talim 55 · moral −7 · firar %5; Tüm Erkekler %20 · talim 10 · moral −15 · firar %8; ordunun mevcut teçhizatıyla gelir; kalıcı gazi kadrosu YOK.
> - **Düşman:** `(taban(yaş,tür) + 0,30 × oyuncu gücü) × tür çarpanı (0,9/1,1/1,3) × U(0,95–1,05) × zafer serisi (×1,2 @2, ×1,5 @4+)`; 16 çatışma senaryosu (arazi, düşman birliği).
> - **Pazar:** Asker'de pazar payı, pazar rakipleri, `pazar_musteri` (=0) ve `rakipler` YOK; rütbe = kariyer puanı **55/115/210/340** + şöhret 18/32/43/70 + askerî güç 18/70/150/340.
> - **Arayüz:** Ordu sayfası = "Erin: x / limit", Moral·Talim·Güç kartları, "!" bilgi notları (`BilgiNotu`), görev rozetleri ve tıklanınca asgari güç hesabı.
> - **Sıradaki (yapılmadı):** Madde 8 bütçe iki sütun/Kazanç etiketi/ganimet brüt-pay-net · Madde 9 mobil Mülkler sekmesi · Madde 10 ekstra vergi tutarsızlığı.

## Oyunda olanlar (güncel)
| Alan | Durum |
|---|---|
| Ekonomi | Sold **9** (her rütbe); asker başı ödeme 0,15, savaşta ×3 (yalnız ana kadro; seferber/paralı hariç); Kazanç == Ordu bütçesi (tüm meslekler); kışla limitleri 30/70/140/280/500; limit aşımı masraf ×2,5 + terhis uyarısı; **kışla bakımı 2/6/18/50/120** (er başı kademeyle artar) |
| Teçhizat/moral/talim | Kalite çarpanı 0,75/1/1,25; bakım 0,15/0,27/0,40; moral & talim tarafsız 50; yeni erler talim 25 |
| Görevler (v64) | **5 görev, aynı anda tek görev**; güç başı 0,65–0,9; güç bantlı azalan verim (0–150 ×1 … 600+ ×0,45); kazandıran görev daha çok yaralı/az ölü/ara sıra firar verdirir; barışta kayıp bildirimi her yıl gelmez; arayüzde risk işareti |
| Ganimet (v64) | Kademeli güç bantları + etkin güç tavanı 240; savaş zaferi 11–14, barış çatışması 2,6–3,2 (üç tür için aynı bantlar); yağma yumuşak bantlarla (ilk 3 savaş yılı) |
| Hazine payı (v66) | KAZANÇ üzerinden kademeli vergi, en çok %40 (yalnız Asker) |
| Düşman (v62) | Üç tür için sabit yıllık artış: 21–60 yaş her yıl aynı %, 60 sonrası sabit hız; haydut %5,6 · sınır %5,8 · savaş %6,7 |
| Savaş/çatışma kayıpları | Zafer/yenilgi ölü-firar tabloları + tavanlar (zafer 16/9, yenilgi 31/15), yaralı oranları (çatışma 2–2,5, savaş 1,5–1,75), savaşın ilk 2 yılı toplam ≤ %6 |
| Seferberlik / paralı | İki seferberlik (v67 Madde 6: %8 Gazi Çağrısı, %20 Tüm Erkekler; giriş talimi 55/10, moral −7/−15, ilk 2 yıl ek firar %5/%8; ordunun mevcut teçhizatıyla gelir), tamamı orduda kalır; paralı 2 seviye (%20/%40, peşin 6,4, yıllık 2,4, moral −7/−14) |
| Devşirme | Büro 1–4 er/yıl, subay en çok 4 er; gönüllü %3 ve yağmadan gelen er kaldırıldı; yıllık sabit +1 er var |
| Sağlık (v63/v64) | Büyük savaş toplam 5–20 (yıllara yayılır, yenilgide +3), çatışma/baskın/tehlikeli görev kayıpları; **alt limit yok (savaşta ölünür)**; rütbeden bağımsız sabit; Tabip subayı ve revir azaltır (arayüzde yazılı) |
| Şöhret (v65/v66) | Haydut ±0–1, sınır ±1–2, baskın ±1 ek; **büyük savaş zaferi +6,5–8**, yenilgi −3…−5; çatışma ekranında ve savaş sonu bildiriminde görünür |
| Çatışma ekranı | Etkileşimli (saldır/savun, baskında yalnız savunma), iki tarafın saldırı/savunması yan yana |

## Düşmanla ilgili yüzdeler (üç ayrı yer; v67 güncel)
1. **±%5 gerçek sapma** — `BARIS_DUSMAN_SAPMA` / `DUSMAN_ORAN` [0,95; 1,05]: karşılaşmadaki düşmanın GERÇEK gücü = yaş/tür formülü × U(0,95; 1,05) (× zafer serisi hazırlığı); karşılaşma kurulurken bir kez çekilir.
2. **±%6,5 gösterilen tahmin** — `TAHMIN_ARALIGI_TABAN` (0,065): düşmanın saldırı/savunması aralıkla gösterilir; Keşif subayı ±%5,5 / 4 / **2,5**'e daraltır ve aralığı GERÇEK değere ortalar (Keşif yoksa tablo değerine ortalanır, yani gerçek değer aralığın içinde ama ortası değil).
3. **±%4 zar** — `SAVAS_ZAR_YUZDE` (0,04): çözülürken her iki taraf da (bağımsız) gücünü `1 + (d20 − 10,5)/9,5 × 0,04` ile çarpar. Yalnız zar etkisiyle güç oranına göre kazanma: 0,95× → %7 · 1,00× → %52 · 1,02× → %70 · 1,03× → %79 · 1,05× → %91 · 1,08× → %99,8 · 0,90× → ~%0. Gerçek sapma (±%5) bunun üstüne biner.

## Zafer serisi (v67, v68'de 5'li kademe)
Her tür (haydut, sınır, büyük savaş) için AYRI sayaç (`b.zafer_serisi`): zafer +1, yenilgi sıfırlar. Sayaç ≥3 iken sıradaki karşılaşmada düşman gücü ×1,10–1,15, **≥5 iken ×1,20–1,25** ("hazırlıklı"). Etki KALICIDIR: seri sürdükçe her karşılaşmada yeniden çekilir, yalnız yenilgi sıfırlar. Pencerede sayı yazılmaz, yalnız "Düşman seni tanıyor; bu sefer hazırlıklı." notu görünür. Çatışmada `catisma_bekleyen.hazirlik`, savaşta `sv.hazirlik` (savaş başında çekilir).

## Büyük savaş yenilgisinde 4. yıl bozgun firarı (v68)
Yalnız TÜM ORDU (büyük savaş) yenilgisinde, karar savaşından sonraki ilk yıl (savaşın 4. yılı) firar **%5–7** (`SAVAS_BOZGUN_FIRARI`); eskiden bu yıl %2–3,5'ti (ölçüm: ortalama %2,65). Bu firar savaş kayıp tavanına (`SAVAS_KAYIP_TAVANI` firar 15) sayılmaz (`firarSayma`), 5. yıl ve sonrası eskisi gibi %2–3,5. Zaferde ve haydut/sınır çatışmalarında yoktur.

## Yapılmayanlar / bilinçli bırakılanlar
- **Seferberde savaş boyu yıllık firar ve düşük moralde ek firar**: geri getirilmedi (v61 kararı: seferber ek firarı yalnız ilk 2 yıl, %5/%10). Yenilgide "son yıllar" isteği v68'de yalnız tüm ordu yenilgisinin 4. yılı olarak uygulandı.
- **Borçla ölenleri azaltma** (%41–44 bandı, koşular arası ±4 puan): kışla bakımı yumuşatma ve şöhret ile kısmen çözüldü; düşük rütbe ek ödenek / enflasyon farkı uygulanmadı.
- **Aktif oyuncunun kazanma oranı** (%93–95): zafer serisi 5'li kademesi sonrası bile düşman genel bota göre kalibre.
- Hazine payı **yalnız Asker**.
- "4 tür şöhret" ifadesi: haydut, sınır, büyük savaş, baskın olarak yorumlandı (kullanıcı teyidi bekleniyor).
- Kayıt uyumu: eski kayıtlardaki kalkan görevler ve fazla görevler ilk yüklemede ayıklanır; eski savaşlarda sağlık planı/hazırlık yoksa varsayılan kullanılır.

## v67'de eklenenler (eskiden "yapılmayanlar")
- Görev gelirinde **er sayısına bağlı azalan verim** (`GOREV_ER_BANTLARI`: 0–200 er ×1 · 200–350 ×0,85 · 350+ ×0,70; güç bantlarına ek).
- **Savaş sağlık kaybı ikmale bağlı**: yumuşak yağma (iyi ikmal) ×0,85, orta ×1, sert yağma ×1,15. Savaş toplamı 5–20 kaldı.

## v68'de tamamlanan yarım işler
- Haydut avı/akın görevleri kalkınca **süvari birimi görev bonusu** kayboluyordu ve metni hâlâ "haydut ve akın geliri +%10" diyordu: bonus **Haraç ve Vergi Tahsilatı**'na taşındı (`SUVARI_BONUS_GOREVLERI`), metin TR/EN düzeltildi.
- **Gelir & Gider ekranında (ButcePaneli) Hazine payı satırı** yoktu (Kazanç vergi sonrası ama liste toplamı tutmuyordu): `FinansOzeti.hazinePayi` ve satır eklendi.
- Eskimiş yorumlar/metinler düzeltildi (zar ±%4, tahmin ±%6,5); CLAUDE.md indeksi güncellendi.

## v69 — Dönemler Asker'i artık hissettiriyor (2026-11)
Sorun: ana ekrandaki dünya satırı Asker için "maaş −%9 · yaşam gideri +%31" yazıyordu; Asker'in maaşı yok (devlet SOLD öder) ve dönem ordu giderini neredeyse hiç oynatmıyordu.
- **Sold** (sabit sold + er başı ödeme) artık dönemin zarlanan `maas` etkisiyle çarpılır (`soldDonemCarpani`, bolluk +%6…10 · durgunluk −%10…−6 · kıtlık −%12…−8). Savaşta er başı ödeme ×3 aynen kalır, üstüne dönem çarpanı biner.
- **Erzak** barışta dönemin zarlanan `temelFiyat` etkisiyle değişir (`erzakDonemCarpani`: bolluk −%5…9 · durgunluk ±%2 · kıtlık +%15…30; eski sabit ±%10 bandı yerine). Savaşta ×1,07 ve vebada ×1,03 sabit tablo (`ERZAK_DONEM_CARPANI`) geçerli kalır.
- **Görev geliri** ve **moral** dönem etkisi zaten vardı (`GOREV_DONEM_CARPANI`, `MORAL_KITLIK/BOLLUK_YILLIK`); artık ana ekranda görünür.
- **Ana ekran satırı (Asker)**: "Kıtlık: Ulûfe −%10 · erzak +%25 · görev geliri −%30 · moral −1,5/yıl · yaşam gideri +%10" (ödeme adı çağ+ülkeye göre `MAAS_ADLARI`; arayüzde "sold" yazılmaz); savaşta aynı ad: "Ulûfe (er başı) ×3 · erzak · görev geliri yok". Bütçe dökümünde de savaşta ad değişmez ("Savaş ödeneği" etiketi kaldırıldı), vebada "görev geliri −%45 · erzak +%3". Kaynak: `stateManager.ts dunyaFinansEtkileri` (EN aynası `anlatim.en.ts`).
- Testler: `birlikV65.test.ts` "dönem etkisi…"; sold/erzak sabit değer bekleyen testler nötr dönem kurar (`asker()` yardımcıları).

### v69 düzeltme turu (kullanıcı kararları)
- **Erzak** dönemle yalnız sabit tablodan değişir (`ERZAK_DONEM_CARPANI`: bolluk 0,9 · durgunluk 1 · kıtlık 1,1; savaş 1,07, veba 1,03). İlk v69 taslağındaki zarlanan gıda fiyatı (kıtlık +%15…30) **geri alındı** — erzak 0,9–1,1 bandını aşamaz.
- **Görev geliri** hiçbir dönemde %12'den fazla kısılmaz: `GOREV_DONEM_CARPANI` alt sınırı 0,88 (eskort 1,12/0,88/1 · tahsilat 1,12/1/0,88; üç dönem ortalaması hâlâ 1). Veba (`VEBA_GOREV_CARPANI` 0,55) ayrı kaldı.
- **Kıtlık morali** −1,5 → **−1**/yıl (`MORAL_KITLIK_YILLIK`); bolluk +1,5 aynı.
- **Savaşta ödeme zammı kalktı**: `SAVAS_ER_BASI_CARPANI` 3 → **1** (savaşta er başı 0,15, barışla aynı; yalnız ana kadro). Ana ekran savaş satırında ödeme adı/çarpan yazılmaz. Not: savaşta görev geliri de yok, yani savaş yıllarının nakdi artık yağma/ganimete ve ikmal kararına dayanır — denge ölçümü (`npm run simulate`) yapılmadı.
- **"Sold" kelimesi hiçbir yerde yazılmaz** (doktrin çipleri dahil): `BirlikPaneli.tsx` `ETKI_ETIKET.sold` artık genel 'Ödeme'; çipler `odemeAdi` (= `hesap.soldAdi`, yerel ad) ile yazılır, `DoktrinSecimi` de aynı adı kullanır. Koruma: `server/tests/askerOdemeAdi.test.ts`.

## v67 — Madde 2: talim / moral / ganimet payı (2026-11)

**Talim politikası** (`TALIM_TANIMLARI`, `data/birlik.ts`): **ücretsiz** (masraf 0/0/0); yıllık **net** talim değişimi (doğal unutma −2 dahil, standart teçhizat) **hafif −2 / orta +2 / ağır +7** — kodda politika artışı `0 / +4 / +9` + `TALIM_DOGAL_DUSUS = 2`; tavan 100/70/100; teçhizat kalitesi artışı çarpar (×0,9/1/1,1). Politikanın yıllık **ordu morali** **+1 / −1 / −5** (doğal barış düşüşü −0,5 ile birlikte hafif +0,5, orta −1,5, ağır −5,5). Oyuncu metni tek sayı: "Talim yılda +2 değişir" (`talimArtiEksi`), masraf yerine "Ücretsiz".

**Ganimet payı** (`GANIMET_PAYI_TANIMLARI`): askere giden **%40 / %55 / %70** (sana %60/%45/%30; eski %30/%50/%70 — v67 sonrası ayar), yıllık moral **−7 / 0 / +4** (eski %30/%45/%60, −8/0/+6). Kesinti yalnız çatışma ve savaş zaferi ganimetinde (görev ganimeti ve yağma kesintisiz). Ekran metni sabitten otomatik.

**Moral/talim artış kaynakları kısıldı:** bolluk dönemi ordu morali **0** (eski +1,5); ağır teçhizat morali +1 (+1,5); revir +0,4/kademe (+0,75); görev morali devriye/garnizon/komuta 0,2/0,3/0,6 (0,3/0,5/1,2); haydut/sınır çatışması zafer morali +2/+3 (+3/+4); savaş kanat zaferi morali +6 (+10); sefer dönüşü moral/talim +3/+5 (+5/+10); barış çatışması talim zafer/yenilgi +3/+1 (+5/+2); savaş kanat talim +6/+3 (+10/+5).

**Yüksekte pasif düşüş (yeni; v67 Madde 6: talim için kalktı, yalnız moral için sürer):** yıl başında moral ya da talim **70'in üstündeyse** o yıl ek olarak −(değer−70)×0,20 düşer (80'de −2, 90'da −4, 100'de −6; `yuksekPasifDusus`, `PASIF_DUSUS_ESIGI/KATSAYI`; `birlikYil.ts` adım 8 ve 9). **Yeni er giriş talimi 15** (`TALIM_YENI_ER_GIRIS`, eski 25).

Testler: `birlik.test.ts` "v67 Madde 2" bloğu (net talim, politika morali, ücretsiz talim, ganimet payı, bolluk, pasif düşüş, metin) + `birlikV39.test.ts` sabit beklentileri. `simulateBirlik.ts` (N=40, Orta Çağ): dengeli/aktif net pozitif, batan %3-5, zafer %77-88 — ekonomi bozulmadı. Not: "görev kaybı" testine `para` verildi (moral gelir bonusu ×1,05 yokken ordu borca girip erzak firarını tetikliyordu). Açık: komuta tonu (moral ±3) hâlâ var (Madde 7), moral/talimin güce etkisi ±%25 (Madde 4).

## v67 — Madde 3: ekonomi sabitleri (2026-11)

| Kalem | Eski → Yeni | Sabit |
|---|---|---|
| Er masrafı (oyuncu öder) | 0,19 → **0,23** | `ER_MASRAFI` |
| Erzak (er başı) | 0,14 → **0,13** | `ERZAK_BIRIMI` |
| Devlet er başı ödemesi | 0,15 (değişmedi) | `ER_BASI_GELIR` |
| Sold (rütbeden bağımsız) | 9 → 8,5 → **9,25** | `SOLD` |
| Teçhizat bakımı hafif/standart/ağır | 0,15/0,27/0,40 → **0,13/0,24/0,36** | `KALITE_BAKIM` |
| Kışla bakımı K0…K4 | 2/6/18/50/120 → **3/8/22/60/150** | `KISLA_BAKIM` |
| Görev asgari güç | 8/25/55/110/200 → **10/40/80/145/250** | `GOREVLER[].minGuc` |
| Görev katsayısı (er başı) | 0,65…0,90 → **0,55 / 0,5875 / 0,625 / 0,6625 / 0,70** ×**1,05** | `erBasi`, `GOREV_GELIR_CARPANI` |
| Savaş ödenek çarpanı | 3 → **2** | `SAVAS_ER_BASI_CARPANI` |
| Yıllık sabit gönüllü er | 1 → **0** | `BARIS_YILLIK_ER` |
| Devşirme Bürosu fiyatı | 20/35/52/75 → **24/42/62/90** (×1,2) | `FIYAT_DEVSIRME` (`meslekProfilleri.ts`) |
| Revir fiyatı | 13/22/34/50 → **16/26/41/60** (×1,2) | `FIYAT_REVIR` |
| Hazine payı ilk dilim (0–100) | %0 → **%10** (15/25/35/40 aynı) | `HAZINE_KADEMELERI` |

**Görev geliri artık ER bazlı:** `gelir = er × gorevErOrani(er) × erBasi × GOREV_GELIR_CARPANI × …` (eski: `güç × gorevGucOrani(güç) × …`); güç yalnız görevin AÇILIŞ eşiği için kullanılır. İstemci etiketi "Er başı gelir" ("/er"). `gorevGucOrani`/`GOREV_BANTLARI` yalnız eski test/gösterge için duruyor.

**Gider örneği** (enflasyonsuz, tam ağır teçhizat, özel birlik yok; talim ücretsiz): 40 er (K1) 36,8 · 80 er (K2) 79,6 · 150 er (K3) 168,0; sold geliri 14,5 / 20,5 / 31,0 → görevsiz net −22 / −59 / −137 (açığı görev + ganimet kapatır). Özel birlik bakımı Madde 4.

**Simülasyon** (`simulateBirlik.ts`, Orta Çağ, dengeli bot; "batan" = ordunun kendini geçindirememesi): Madde 2 sonrası **%5**, er@60 229 → sabitler + er bazlı görev + yıllık +1 er YOK + büro/revir ×1,8 **%30** (er@60 109) → aynısı güç bazlı görevle **%53** → yıllık +1 er kalır, büro/revir eski fiyat **%8** (er@60 220) → **seçilen (yıllık er yok, büro/revir ×1,2): %18** (dengeli), **%10** (aktif); er@60 143-153; zafer %53-68. Yani seçilen kombinasyon eski dengeden sıkı; büyüme yalnız devşirme subayı, büro, şöhret, doktrin, yatkınlıktan. Madde 4-5 (güç/düşman) sonrası yeniden ölçülmeli. Testler: `birlik.test.ts` "v67 Madde 3" bloğu + `birlik*.test.ts` sabit beklentileri.

## v67 — Madde 4: güç formülü (2026-11)

| Kalem | Eski → Yeni | Sabit / yer |
|---|---|---|
| Moral/talimin güce etkisi | ±%25 → **+%20 (100'de) / −%15 (0'da)**, 50'de 0 | `MORAL_TALIM_GUC_UST/ALT`, `moralGucEtkisi`, `talimGucEtkisi` |
| Piyade saldırı/savunma | 1,00/1,10 → **0,95/1,05** | `PIYADE` |
| Okçu / Süvari / Kalkan-Mızrak / Zırhlı (saldırı/savunma) | 2,1/1,4 · 3/0,8 · 1,3/2,3 · 1,9/2,9 → **1,7/1,3 · 2,3/0,8 · 1,2/1,9 · 1,5/2,3** | `TUR_TANIMLARI` |
| Özel birlik bakımı | yüzde eki + erzak çarpanı → **birlikteki ER BAŞINA sabit yıllık tutar** Okçu 0,20 · Süvari 0,25 · Kalkan 0,25 · Zırhlı 0,40 (× gider enflasyonu; birlik eri = ordu eri × %20) | `TurTanimi.bakimEriBasi`; `birlikHesapla.birlikBakim` (ayrı gider kalemi) |
| Doktrin faydalı bonus büyütmesi | ×1,4 → **×1,15** | `DOKTRIN_BONUS_CARPANI` |
| Saldırı/savunma çarpan sınırı | [0,4; 2] → **[0,5; 1,6]** | `gucHesapla` |
| Maksimum subay | 7'ye kadar → **4** | `SUBAY_MAKS`, `subayLimiti` |
| Subay faydalı bonusları | **~%10 düşük** (saldırı/savunma 0,081/0,135/0,18; ganimet/ölü 0,036/0,063/0,09; arazi 0,20/0,31/0,41; pusu 0,22/0,43/0,65; devşirme 1,35/2,7/3,4; tabip 0,117/0,198/0,27 ve 0,072/0,126/0,19) | `SUBAY_DEGERLERI` |
| Yağma oranı (sert/orta/yumuşak) | 0,56/0,40/0,24 → 0,51/0,35/0,19 → 0,28/0,22/0,17 → **0,27/0,21/0,16** (v67 sonrası ayar, aşağıdaki son notlar) | `IKMAL_TANIMLARI` |
| Rütbe güç eşiği S2..S5 | 24/90/195/450 → **18/70/150/340** (güç düştüğü için ×0,75) | `RUTBE_GUC_ESIGI_ASKER` |

**Etki** (70 er, ağır teçhizat, 4 özel birlik): nötr 50/50 güç 156 → **131**; moral/talim 70/70: 187 → **152**; 100/100: 234 → **183**. Dört özel birliğin güç artışı +%77 → **+%50**; bakımı 100 erde **22/yıl** (40 er 8,8 · 80 er 17,6 · 150 er 33,0; eski yüzde sistemi ≈6,8/13,7/25,7).

**Arayüz:** birlik kartında maliyet "+%46" yerine "**+0,20 /er**" (tutar), Ordu bütçesine **"Özel birlik bakımı"** gider satırı (`BirlikGorunumu.hesap.birlikBakim`). "+%25 güç" metni sabitten otomatik "+%20".

**Simülasyon** (`simulateBirlik.ts`, N=60, Orta Çağ; Madde 3 sonrası → Madde 4): dengeli güç @25/35/45/55 24/60/107/198 → **26/59/123/188**, zafer % (haydut/sınır/savaş) 64/55/53 → **68/66/60**, S3 yaşı 39 (%55) → 40 (%70), batan %18 → **%20**; aktif (özel birlik + ağır talim) güç @35 60 → **32**, zafer 68/64/62 → **54/45/39**, batan %10 → **%15**, S5'e ulaşma %55 → %28. Yani özel birlik + ağır talim yolu en çok zayıflayan; dengeli yol (az özel birlik) korunuyor. Düşman gücü Madde 5'te değişir. Testler: `birlik.test.ts` "v67 Madde 4" bloğu + `birlik*.test.ts` sabit beklentileri.

**v67 Madde 4 ek — birlik rolleri (kullanıcı):** saldırı/savunma uzmanlığı keskinleştirildi ve her birliğin güç artışı +1 puan yükseltildi: **Okçu 1,75/1,35 (+%11, hafif saldırı eğilimli melez) · Süvari 2,6/0,6 (+%12, saldırı uzmanı) · Kalkan-Mızrak 1,0/2,2 (+%12, savunma uzmanı) · Zırhlı 1,5/2,4 (+%19, melez)**; dördü birden ≈ +%54. Güç (saldırı+savunma)/2 olduğundan uzmanlık güçte değil, çatışma yönünde hissedilir: av/saldırıda `oyuncu.saldiri` düşman savunmasıyla, baskın/savunmada `oyuncu.savunma` düşman saldırısıyla kıyaslanır. Bakım oranları aynı (er başı 0,20/0,25/0,25/0,40): 100 erde güç artışı başına yıllık bakım ≈ 0,36 / 0,42 / 0,42 / 0,42 (düz er eklemek ≈ 0,72); geçiş ücreti güç artışı başına ≈ 1,3 / 1,4 / 1,25 / 1,4.

## v67 — Madde 5 (5a + 5b): düşman gücü (2026-11)

**Formül** (`dusmanGucuHesapla`, `data/birlik.ts`; barış çatışması kurulumu, büyük savaş karar savaşı, iki tahmin ekranı ve Keşif haberi aynı fonksiyonu kullanır):
`E = (taban(yaş, tür) + 0,30 × oyuncu gücü) × tür çarpanı × U(0,95; 1,05) × zafer serisi hazırlığı`

- **Taban** (`dusmanGucuYas`, oyuncu gücü HARİÇ): 15–20 yaş doğrusal (`taban20/1,15` → `taban20`), 20–60 bileşik, 60 sonrası doğrusal. `taban20` **haydut 7,0 · sınır 8,5 · savaş 10,5**; yıllık oran **%6,1 · %6,3 · %7,1** (eski taban21 15,5/18/21, %5,6/%5,8/%6,7). Eski taban oyuncu gücünden bağımsızdı; yeni formülde onun işini oyuncu gücünün %30'u yapar, bu yüzden taban küçüldü.
- **Oyuncu gücü payı %30** (`DUSMAN_OYUNCU_PAYI`); **tür çarpanı** haydut 0,9 · sınır 1,1 · savaş 1,3 (`DUSMAN_TUR_CARPANI`). Oyuncu gücü = `gucHesapla(state).guc` (arazi/karşı tür/senaryo bonusları hariç); barışta çatışma kurulurken sabitlenir, savaşta karar savaşında hesaplanır.
- **Zafer serisi** (tür başına ayrı sayaç): **2 zafer → ×1,2, 4 zafer → ×1,5**, sabit (eski 3→+%10–15, 5→+%20–25 rastgele aralık); bonuslar **üst üste binmez** (4 ve üstü, yani 5-6-7 zaferde de ×1,5), yenilgide sayaç sıfırlanır.
- Örnek düşman gücü (oyuncu gücü dengeli bot ortalaması, seri hariç): 25 yaş haydut 16 / sınır 22 / savaş 30 (güç 28); 35 yaş 30/42/60 (güç 56); 45 yaş 51/71/109 (güç 85); 55 yaş 77/113/190 (güç 101).
- **Sızıntı:** `BirlikGorunumu.savas.dusmanOrani` (gizli gerçek düşman oranı) istemciye gitmez.

**Üç savaş türü farklılaştırıldı (5b):**
| | Haydut | Sınır | Büyük savaş |
|---|---|---|---|
| Tür çarpanı | 0,9 | 1,1 | 1,3 |
| Çatışma tür seçimi (`BARIS_TUR_AGIRLIGI`) | %60 | %40 | savaş dönemi |
| Baskın ihtimali (`BARIS_BASKIN_IHTIMALI`) | %65 | %40 | inisiyatif %40/30/30 |
| Düşman birliği (`BARIS_DUSMAN_BIRLIGI_AGIRLIGI`) | süvari %35 · okçu %30 · karma %35 | mızraklı %30 · zırhlı %25 · okçu %25 · süvari %20 | beşi eşit |
| Barış ganimet aralığı (`BARIS_GANIMET_ARALIK`, × etkin güç) | 2,2–2,8 | 3,2–4,0 | 11–14 |
Bütçe önizlemeleri `BARIS_GANIMET_UST` (4,0) ve `BARIS_GANIMET_ORTA` (tür ağırlıklı ortalama) kullanır. Ölü/yaralı, sağlık, şöhret, ordu morali ve esir tabloları zaten türe göre ayrıydı.

**Simülasyon** (`simulateBirlik.ts`, N=60, Orta Çağ; BİLGİ — hedef sayı yok): dengeli zafer % (haydut/sınır/savaş) **72 / 74 / 47**, güç @25/35/45/55 28/56/96/130, S3 41y %82, S4 53y %53, batan %15; aktif **70 / 68 / 45**, batan %12, S5 %28 (Madde 4 sonrası dengeli 68/66/60, aktif 54/45/39). Testler: `birlik.test.ts` "v67 Madde 5" bloğu + `birlikV39/V65/Arazi` beklentileri. **Açık:** 5c (senaryo kataloğu, barışa arazi, birlik×arazi saldırı/savunma ayrı tablo) ayrı onayla.

## v67 — Madde 5c: çatışma senaryoları, barışta arazi, birlik×arazi saldırı/savunma (2026-11)

- **Senaryo kataloğu** (`CATISMA_SENARYOLARI`, `data/birlik.ts`): tür (haydut/sınır) × yön (karşılaşma / baskın) başına **4 senaryo (16)**; her biri `arazi`, `dusman` (düşman birliği ağırlıkları, türe uygun), `ganimet` ve `kayip` çarpanı (0,9–1,2), TR/EN `ad` + `metin` (≤110 karakter, çağdan bağımsız) taşır. Haydut karşılaşma: Mağara Sığınağı (dağ) · Kervan Yolu Pusu (orman) · Han Baskını (ova) · Nehir Geçidi (ova); haydut baskın: Gece Baskını (orman) · Erzak Arabası Pusu (dağ) · Ordugâh Yağması (ova) · Köy Yolunda Pusu (orman); sınır karşılaşma: Köprübaşı (ova) · Dağ Karakolu (dağ) · Akıncı Kolu Takibi (ova) · Orman Kenarı Devriyesi (orman); sınır baskın: Gece Akını (orman) · Karakol Kuşatması (dağ) · Köy Yağması (ova) · Sınır Hattı Yarılması (ova). Seçim: tür (%60/%40) ve baskın (%65/%40) çekildikten sonra o tür/yön içinde **eşit olasılıkla** (`catismaSenaryosuSec`); düşman birliği senaryonun ağırlıklarından çekilir. Çatışma kaydına `senaryoId` ve `arazi` yazılır; **eski kayıtta yoksa arazisiz çözülür**.
- **Barışa arazi:** senaryonun arazisi barış çatışmasında da güce işler (`gucHesapla` `ctx.savas`: birlik×arazi + karşı tür bonusu) ve düşmanın baskın birliğine de uygulanır. Eski `SENARYO_TABLOSU`/`senaryoBonusu` (çift sayım) **kaldırıldı**.
- **Birlik×arazi saldırı/savunma ayrı** (`TUR_TANIMLARI[tur].arazi[arazi] = {saldiri, savunma}`): Okçu ova 0,8/0,9 · dağ 1,1/1,35 · orman 1,25/1,4; Süvari 1,7/0,9 · 0,8/0,7 · 0,8/0,8; Kalkan-Mızrak 1,0/1,2 · 1,25/1,6 · 0,8/0,9; Zırhlı 1,3/1,3 · 1,05/1,25 · 1,0/1,2. Düşman çarpanı `dusmanAraziCarpani(arazi, tür, yön)`: sen saldırırken düşman SAVUNMA, sen savunurken SALDIRI çarpanını alır; karma beş sınıfın her yön için normalleştirilmiş ortalaması. **Büyük savaş aynı tabloyu kullanır** (savaş günü `birlikYil.ts`, savaş kıyası `birlikIslem.ts`).
- **Barış düşman arazi normalizasyonu** (`BARIS_DUSMAN_ARAZI_NORMU`, `barisDusmanAraziCarpani`): senaryolar düşmanın elverişli birliğini elverişli arazisiyle eşlediği için ham çarpan katalog ortalamasında düşman lehine ~%13–18 idi (ilk uygulamada dengeli zafer 72/74/47 → 57/49/33, batma %33'e çıkmıştı); düşman çarpanı yön başına katalog ortalamasına bölünür (ortalama 1, senaryolar arası çeşitlilik kalır).
- **Arayüz** (`CatismaKarari.tsx`): senaryo adı ve metni, arazi (simge + ad), "saldırıda/savunmada güçlü/zayıf birliklerin" satırları; düşman tahmini yön başına kendi arazi çarpanıyla. `CatismaKarariDurumu.senaryo` / `.birlikArazi`, `BirlikCatismaBekleyen.senaryoId` / `.arazi` (sunucu + istemci tipleri).
- **Simülasyon** (N=60, Orta Çağ, BİLGİ): dengeli zafer % (haydut/sınır/savaş) **71 / 68 / 42** (5b: 72/74/47), batma %13; aktif **74 / 73 / 39**, batma %20, S5 %20. Testler: `birlik.test.ts` "v67 Madde 5c" bloğu (katalog, seçim, barışta arazi, normalizasyon, eski kayıt) + `birlikArazi/birlikSavas` beklentileri. Özel birlik-arazi ek mekanikleri (pusu/ganimet/ölü/firar bonusları) yapılmadı (kullanıcı kararı).

## v67 — Madde 6: seferberlik + Talim Alanı (2026-11)

**Seferberlik** (`SEFERBERLIK_TANIMLARI`, `data/birlik.ts`; `seferberlikUygula`, `savasiBitir`, `birlikYil.ts`):
| | Gazi Çağrısı (`secme`) | Tüm Erkekler (`genel`) |
|---|---|---|
| Çağrılan er (ordunun %'si) | %15 → **%8** | %30 → **%20** |
| Teçhizat | sabit orta → **ordunun `hedef_kalite`'si** | sabit düşük → **ordunun `hedef_kalite`'si** |
| Giriş talimi (sabit) | ordununki → **55** | 0 → **10** |
| Ordu morali (bir kez) | −4 → **−7** | −12 → **−15** |
| İlk 2 yıl ek firar (toplam) | %5 | %10 → **%8** |
| Erzak eki / halk bedeli | +%4 / yok | +%15 / ahlak −2, mutluluk −2, şöhret −1 (aynı) |
- **Kalıcı gazi kadrosu kaldırıldı** (`SEFERBERLIK_GAZI_ORANI` silindi): zaferde kalan seferberler artık kalite atlamaz; hepsi ordunun teçhizat kalitesinde kalır. `SEFERBERLIK_TANIMLARI.kalite` alanı yok; `sv.seferberlik_kalite` çağrı anındaki `hedef_kalite`dir (eski kayıtta alan yoksa `dusuk` varsayılır).
- **Güç:** seferber er ham güce normal er gibi katılır; tek fark `etkinTalim` (giriş talimiyle er sayısına göre ağırlıklı ortalama, savaş bitince kalıcı ortalamaya katılır) ve çağrı morali. **Hedef (kullanıcı):** Gazi güç artışı +%7'yi geçmesin, Tüm Erkekler ≈ +%13. Ölçülen (100 er, orta teçhizat): moral/talim 50/50 → Gazi **+%5,9**, Tüm Erkekler **+%12,2**; 60/70 → 4,9 / 9,8; 70/80 (ağır) → 4,8 / 9,3; 50/30 → 6,2 / 13,0; ordu talimi 0 uç: 6,9 / 14,4. Ordu ne kadar eğitimliyse artış o kadar düşer. Yıllık ek gider (orta/ağır teçhizat): Gazi 4,8 / 5,8, Tüm Erkekler 12,0 / 14,4 (100 erlik ordu).
- Gazi'nin moral bedeli −4'ten −7'ye çıktı çünkü %8 er + talim 55 ile −4'te en zayıf ordu +%8,0 verirdi (7'yi aşardı); −7'de uç +%6,9.

**Talim Alanı (yeni Asker yatırımı, `id: "talim"`, 🎯, `YatirimEtkisi "talim"`):** 4 kademe, fiyat **18 / 32 / 50 / 75** (enflasyonsuz; yıllık bakım yok). Etki 1: yıllık talim kazancına **+1/+2/+3/+4** (`TALIM_ALANI_YILLIK`, politikadan bağımsız; hafif politikada da çalışır). Etki 2: ordunun talim **üst limiti** (`TALIM_ALANI_TAVAN = [70,75,80,85,90]`, bina yok 70; `talimKademesi` / `talimUstLimit` / `talimKazanci`, `game/birlik.ts`). Güçte en çok: limit 70 → +%8, 75 → +%10, 80 → +%12, 85 → +%14, 90 → +%16.
- **Politikalar** (`TALIM_TANIMLARI`) artık tavan taşımaz (`tavan` alanı kalktı; orta politikanın eski 70 tavanı yerine bina limiti geçerli). Yıllık talim = `min(limit, talim + (politika artışı + bina artışı) × teçhizat katsayısı × (moral<30 ? 0,5 : 1) − 2)`; sonuç `[0, limit]`a kırpılır (limit üstündeki eski kayıt ilk yıl sonunda limite iner). Net (teçhizat orta): hafif −2 / orta +2 / ağır +7 (bina yok); bina 1–4: hafif −1/0/+1/+2, orta +3/+4/+5/+6, ağır +8/+9/+10/+11. Politikalar artık tavanı değil **hız ve moral bedelini** belirler (hafif +1, orta −1, ağır −5 yıllık moral); bina yokken ağır talim de 70'te durur (eski: 100'e çıkabilirdi).
- **Pasif düşüş** (`yuksekPasifDusus`) artık yalnız **moral** içindir; talimin tavanını bina belirler.
- Savaş kanat zaferi/yenilgisi (+6/+3), barış çatışması (+3/+1) ve sefer dönüşü (+5) talim kazancı limiti aşmaz (`talimKazanci`); sonuç ekranındaki talim satırı gerçekten eklenen puanı yazar.
- **Arayüz:** `BirlikGorunumu.talim.limit` / `.alanKademe` (politika `tavan` alanı kalktı; `client/src/types.ts` eşlendi); Ordu sayfasında "Talim: 54 / 70 (+%x)". Yatırım kartı genel yatırım listesinden gelir (`yatirimEtkiMetni("talim")`: "Yıllık talim +k · talim sınırı L").
- **Testler:** `birlik.test.ts` "v67 Madde 6" bloğu (güç artışı hedefi, moral −7/−15, kademe sabitleri/fiyat/metin, yıllık net talim 3 politika × 5 kademe, limitte durma, eski kayıt, kazanç limiti, moral pasif düşüşü), `birlikSavas.test.ts` / `birlikV39.test.ts` seferberlik beklentileri (%8/%20, 55/10, kalite = hedef, gazi kadrosu yok).
- **Simülasyon** (N=60, Orta Çağ, BİLGİ — hedef yok; bot Talim Alanı satın almaz, talim limiti 70): dengeli zafer % (haydut/sınır/savaş) **68 / 67 / 42**, batma %15, S3 40y %68, S4 53y %32; aktif **63 / 59 / 29**, batma %20, S5 57y %12. (5c: dengeli 71/68/42 batma %13; aktif 74/73/39 batma %20.) Aktif botun düşüşü talim limitinden gelir (bot ağır talimle 70'in üstüne çıkamıyor); Talim Alanı yatırımı bu açığı kapatır.

## v67 — Madde 7: Ordu sayfası yeniden düzeni, pazar payı sökümü (2026-11)

**1) Asker'de pazar payı ve pazar rakipleri komple kalktı.**
- Silinen: `PAZAR_ADLARI.Asker` ("Bölge Hâkimiyeti"), `askerGucleri`, `askerRakipGucCarpani`, `pazarPayiHesapla`/`rakipPayiHesapla` Asker dalları, `ASKER_PAZAR_BASLANGIC/HEDEF/YAKINSAMA/DONEM_CARPANI`, `RAKIP_GUC_RUTBE_EKI`, ölü `AskerSaldiri*`, `pazarYakinsat`, `piyasa.ts` Asker dalları, `BirlikGorunumu.pay` ve `.rakipler`, Ordu "Askerî payın" satırı, `PazarDurumu.gucSarti`.
- `mesleğiSec` Asker için `pazar_musteri = 0`, `rakipler = []`; eski kayıt `eskiKayitGocu`/`birlikBaslat` ile sıfırlanır. **`pazar_musteri` gizli ölçek olmaktan çıktı:** karanlık iş "müşteri" (er devşirme) kazancı Asker'de sabit `ASKER_OLAY_OLCEGI = 195` ile ölçeklenir (`gameEngine.ts karanlikIsOlcegi`; diğer meslekler pazar büyüklüğü).
- **Kariyer puanı bağımsız:** `askerKariyerPuaniUygula` (stateManager) yıl hattında `pazarYillikUygula`'dan ayrı çağrılır (formül aynı: `min(2,5, güç ÷ düşman referansı) × 1,1`). `simulateBirlik.ts` pay@60 raporu kalktı.
- **Rütbe güç şartı ve yıllık kariyer puanı** `BirlikGorunumu.rutbe: { gucSarti, yillikKariyerPuani }` içinde (StratejiSayfasi rütbe çubuğu ve yeni `AskerGucKarti` oradan okur; pazar uç noktasından değil).
- **Rakip komutana bağlı öğeler:** "Rakibe darbe" şehir isteği Asker'den çıktı; **`kaza_duello` → "Düşman Komutanıyla Düello"** (`rakipYenilt` kalktı; ödül aynı: şöhret, er, kariyer; bedel aynı); **"Baş Belası" amacı silindi → "Fatih"** (zor: toplam 6 çatışma/savaş zaferi + teçhizat 70+; yeni sayaç `BirlikDurumu.zafer_toplam: {haydut,sinir,savas}`, `zaferSerisiIsle` artırır, seri sıfırlansa da kalır; eski kayıtta 0); genel "Rakip Üstünlüğü" amacı Asker hariç; "Rakipsiz" başarımı Asker'de tetiklenmez (rakipler boş). Asker zor amaç havuzu: serdar, şehir kalkanı, ordu kurucusu, fatih.

**2) Komuta tonu kalktı:** `TON_*`, `BirlikTon`, `b.ton`, karar girdisi `ton`, görünüm `politikalar.ton` ve yıllık moral/sertlik terimleri silindi (Merhametli +3 / Sert −3 moral kaybolur; sertlik yalnız görev, doktrin ve ikmalden). Eski kayıttaki `ton` yok sayılır.

**3) "Gelecek yıl" değişimi (Ordu kartları):** `birlikYil.ts` yıl sonu hesabı paylaşılan fonksiyonlara ayrıldı: `talimYilSonu`, `moralYilSonu`, `yillikErBuyumesi`, `talimSeyrelt`; **`gelecekYilDegisimi(state,bg)`** aynı fonksiyonlarla rastgele olaylar (çatışma sonucu, ağır kayıp) HARİÇ kesin değişimi verir → `BirlikGorunumu.moral.gelecek`, `.talim.gelecek` (talimde yıl içinde gelecek yeni erlerin seyreltmesi dahil, beklenen değer). Karar sonrası görünüm yenilendiği için ganimet payı, talim politikası, görev, teçhizat, doktrin, revir değişince sayı anında değişir. Test: gerçek yıl işleme ile aynı (`birlik.test.ts` "v67 Madde 7").

**4) Görev er verimi (`gorevErOrani`):** ilk **100 er verim 1,0**; sonra doğrusal; en büyük kışla kapasitesinde (500) **0,75**; üstü 0,75 sabit. Toplam gelir `er × verim` 500'e kadar hep artar. 150/200/300/400/500 er → 0,969 / 0,938 / 0,875 / 0,813 / 0,75 (eski dilimli: 1 / 1 / 0,95 / 0,91 / 0,87). (Madde 3 tablosundaki "≤200 er 1,0; 200–350 0,85; 350+ 0,70" eskidir.)

**5) Asker kariyer puanı eşikleri (iki çağ):** 55 / 125 / 215 / 300 → **55 / 115 / 210 / 340**; şöhret 18/32/43/70 ve güç 18/70/150/340 aynı. Terfi: kariyer puanı + şöhret + askerî güç.

**6) Arayüz** (`BirlikPaneli.tsx`, `BilgiNotu.tsx`, `strateji-panel.css`): "Ordu durumu" kutusu — **"🪖 Erin: 62 / 70"** tek satır (limit eflatun; yaralı varsa altında); **üç kart** Moral · Talim (tek sayı) · Askerî gücün (⚔️/🛡️); Moral/Talim kartında "Gelecek yıl ±x,y" (yeşil artı / kırmızı eksi) + "güçte %x" ve ince 0–100 çubuğu (50 nötr çizgisi; <30 kırmızı, ≥70 yeşil); Şehir yöneticisi, Askerî payın ve ayrı Komuta limiti satırları kalktı. **Uzun notlar "!" işaretine** taşındı (`BilgiNotu`: masaüstü hover/tık, dokunmatikte satır içi açılır, dışarı dokunma/Esc kapatır; kart notları tam genişlikte altta açılır); notlardan mekanik sayılar çıkarıldı. **Görev kartı:** "en az N askerî güç" tıklanınca satır içi hesap (gereken/şimdiki güç, ✓ ya da "Eksik X ≈ Y er", ham → birlik çarpanı → bonuslar → toplam, "güç yalnız görevi açmak içindir; gelir er sayısına bağlıdır"); **"er başı 0,59"**; yön oklu rozetler (`bonuslar: {kod, yon}[]`: 🙂 moral ▲, 🌟 şöhret ▲/▼, 🏛️ otorite ▲, 😠 sertlik ▲ kırmızı, 🎁 ganimet; sayı yok).
**Testler:** `birlik.test.ts` "v67 Madde 7" bloğu (gelecek yıl = gerçek değişim, kararla anında değişim, görünüm `rutbe` + pay/rakipler/ton yok, rozetler, kariyer eşikleri, Fatih, rakibe_darbe), `birlikV65` (verim), `testUtils.payiAyarla` (Asker: güç), `kotuIsler` (düello), `yeniOzellikler` (rakip testleri Tüccar'a).
**Simülasyon** (`simulateBirlik.ts`, N=60, Orta Çağ; BİLGİ — hedef yok; Madde 6 sonrası → Madde 7): dengeli zafer % (haydut/sınır/savaş) 68/67/42 → **68 / 63 / 36**, batma %15 → %15, rütbe yaşları S2 27y (%93) · S3 41y (%60) · S4 53y (%40) · S5 yok; aktif 63/59/29 → **65 / 55 / 27**, batma %20 → %13, S2 25y · S3 43y (%47) · S4 50y (%28) · S5 59y (%5). (Zafer oranlarındaki düşüş talim limitinin 70 ile sınırlı olduğu ve görev verimi eğrisindendir; Talim Alanı yatırımı bu açığı kapatır.)

## main ile birleştirme notu (v67 Madde 1–7 ↔ v69, 2026-11)
Kullanıcı kararı: **çakışan tüm Asker denge değerleri v67 dalından** (v69'un aynı sabitlerdeki değerleri geçersiz): savaşta er başı ödeme çarpanı **×2** (v69: ×1), kıtlık ordu morali **−1,5** (v69: −1), bolluk ordu morali **0** (eski +1,5), sold 8,5 · er masrafı 0,23 · erzak 0,13. v69'un **mekanikleri korundu**: `soldDonemCarpani` (sold dönem çarpanı), `erzakDonemCarpani` (sabit tablo 0,9–1,1), görev dönem çarpanı kısıntısı ≤ %12, ülkeye özgü ödeme adı (Ulûfe…), ana ekran dünya satırı, karar penceresi şablonu (`GucKarsilastirma`). Yukarıdaki v69 metnindeki "savaşta ×3 / kıtlık −1,5 → −1" ifadeleri bu nota göre okunur. Özel birlik bakımı v67 Madde 4 gereği er başı sabittir (`turBakim`/`turErzak` yok).

- **Sabit maaş 9,25 (v67 sonrası ayar):** `SOLD` 8,5 → **9,25** (rütbeden bağımsız). Görev geliri çarpanı `GOREV_GELIR_CARPANI` = 1,05 aynı. Testler (`birlik`, `birlikSavas`, `birlikV39`) güncellendi.

- **Yağma kısıldı (v67 sonrası ayar, kullanıcı kararı):** `IKMAL_TANIMLARI` — yağma geliri `gucOrani` sert/orta/yumuşak **0,51/0,35/0,19 → 0,28/0,22/0,17**; erzak indirimi (`erzakIndirimi`, yalnız savaşta, savaş boyu) **%75/55/35 → %50/40/30**; **yeni:** `YagmaTuru.talim` = sert **−8** / orta **+1** / yumuşak **+5** ordu talimi, **tek seferlik** (yıllık değil): yalnız savaşın İLK yılında ve yağma geliri varken, `birlikYil.ts talimYilSonu` içinde (`yagmaTalimiBuYil`); "gelecek yıl" önizlemesi (`gelecekYilDegisimi`) aynı fonksiyonu kullanır. Ahlak/mutluluk/moral/kayıp çarpanı/sertlik **aynı kaldı** (sert −3/−3/+4/×1,15/2,5 · orta 0 · yumuşak +3/+3/−4/×0,85/0,5). İkmal açıklama metinlerine disiplin ipucu eklendi (sayı yok). Test: `birlik.test.ts`, `birlikV39.test.ts` (yeni: "yağma talimi yalnız savaşın ilk yılında").
- **Ölçüm (4 kişilik bot, N=300/çağ, 15→60 yaş, hayat boyu reel; bilgi amaçlı):** Orta Çağ gelir Saldırgan 6871 → 6194, Dengeli 4215 → 3957; yağma payı Saldırgan 600 → 301, Dengeli 211 → 122; kasaya kalan Saldırgan 1762 → 1383, Dengeli 122 → −91. Saldırgan/Dengeli gelir oranı 1,63 → 1,57 (Sanayi 1,82 → 1,71): yağma toplam gelirin yalnız ~%9'u, bu yüzden fark az kapandı. Saldırgan'ın asıl üstünlük kaynakları (tek tercih çıkarma, Orta Çağ): ganimet payı "az" −2107 gelir · teçhizat kalitesi −1161 · özel birlikler −826 · rol öncü −596 · sert yağma −589 · seferberlik "Tüm Erkekler" −303.

- **Yağma ikinci ayar + ganimet payı (v67 sonrası, kullanıcı kararı):** (1) Yağma oranları tekrar **−0,01**: sert/orta/yumuşak **0,27/0,21/0,16**. (2) **Yağma bantları kaldırıldı** (`YAGMA_BANTLARI` ve `yagmaEtkinGuc` silindi): yağma geliri = `b.guc × gucOrani × enflasyon × ganimetC`, güçle DOĞRUSAL (eskiden 100+ güçte ×0,8…0,4). `ganimetC` çarpanı rol, emir, doktrin, subay vb. içerir. (3) **Savaşta er başı ödeme ×2 kaldırıldı:** `SAVAS_ER_BASI_CARPANI` 2 → **1** (savaşta da 0,15). (4) **Öncü rolü:** ganimet **×1,2** (1,3), kayıp **×1,5** (1,4); yedek/ana aynı. (5) **Savunma seçimi** (barış çatışması): ganimet **×0,9** (0,8), kayıp ×0,8 aynı; saldırı ×1,3/×1,3 aynı. (6) **Ganimet payı** (asker payı oranı): az **%30 → %40**, dengeli **%50 → %55**, cömert %70 aynı (moral −7/0/+4 aynı).
- **Ölçüm (bilgi amaçlı, N=300–1000/çağ, 15→60 yaş, reel):** Ganimet payı değişikliği en etkili adım: Orta Çağ Saldırgan gelir 5816 → 4595, Dengeli 3628 → 2857 (her ikisinde yaklaşık −%21; kasaya kalan Saldırgan 1182 → 556, Dengeli −379 → −570). Yağma bantsız/bantlı (N=1000): Saldırgan yağma 262 vs 211, gelir 4595 vs 4339 (Orta Çağ), 4833 vs 4454 (Sanayi); Dengeli'de fark yok (ordu <100 güç). Saldırgan/Dengeli gelir oranı 1,63 (v67 sonrası ilk ayar öncesi) → 1,57 → ~1,6 (Orta Çağ, bantsız).
