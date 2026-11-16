> **KAZANÇ = ELE KALAN (DEĞİŞMEZ KURAL):** "Kazanç" her zaman oyuncunun ELİNE KALAN yıllık tutardır = meslek neti (ordu/cemaat/atölye/dükkân neti, çalışan/SUBAY maaşları düşülmüş) − YAŞAM − KİRA − evcil hayvan − kredi taksidi + mülk geliri. Kazançtan vergi/yüzde/eşik/tavan denince bu SON tutar kastedilir; meslek netinden (yaşam ve subay düşülmeden) ASLA hesaplanmaz.

# §54 — Asker denge turu özeti (v50–v66): ne var, ne yok (2026-11)

Bu dosya, Asker üzerinde yapılan tüm ayar konuşmalarının **tek yerde toplanmış durumudur**. Ayrıntılı sürüm notları `13-garanti-sink-tema.md` §45 v50–v66'dadır; sayı çelişirse **kodu** (`server/src/data/birlik.ts`) ve daha yüksek sürümü esas al.

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
| Seferberlik / paralı | İki seferberlik (%15 Gazi Çağrısı, %30 Tüm Erkekler), ilk 2 yıl ek firar %5/%10, tamamı orduda kalır; paralı 2 seviye (%20/%40, peşin 6,4, yıllık 2,4, moral −7/−14) |
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

## v67 — Madde 2: talim / moral / ganimet payı (2026-11)

**Talim politikası** (`TALIM_TANIMLARI`, `data/birlik.ts`): **ücretsiz** (masraf 0/0/0); yıllık **net** talim değişimi (doğal unutma −2 dahil, standart teçhizat) **hafif −2 / orta +2 / ağır +7** — kodda politika artışı `0 / +4 / +9` + `TALIM_DOGAL_DUSUS = 2`; tavan 100/70/100; teçhizat kalitesi artışı çarpar (×0,9/1/1,1). Politikanın yıllık **ordu morali** **+1 / −1 / −5** (doğal barış düşüşü −0,5 ile birlikte hafif +0,5, orta −1,5, ağır −5,5). Oyuncu metni tek sayı: "Talim yılda +2 değişir" (`talimArtiEksi`), masraf yerine "Ücretsiz".

**Ganimet payı** (`GANIMET_PAYI_TANIMLARI`): askere giden **%30 / %50 / %70** (sana %70/%50/%30), yıllık moral **−7 / 0 / +4** (eski %30/%45/%60, −8/0/+6). Kesinti yalnız çatışma ve savaş zaferi ganimetinde (görev ganimeti ve yağma kesintisiz). Ekran metni sabitten otomatik.

**Moral/talim artış kaynakları kısıldı:** bolluk dönemi ordu morali **0** (eski +1,5); ağır teçhizat morali +1 (+1,5); revir +0,4/kademe (+0,75); görev morali devriye/garnizon/komuta 0,2/0,3/0,6 (0,3/0,5/1,2); haydut/sınır çatışması zafer morali +2/+3 (+3/+4); savaş kanat zaferi morali +6 (+10); sefer dönüşü moral/talim +3/+5 (+5/+10); barış çatışması talim zafer/yenilgi +3/+1 (+5/+2); savaş kanat talim +6/+3 (+10/+5).

**Yüksekte pasif düşüş (yeni):** yıl başında moral ya da talim **70'in üstündeyse** o yıl ek olarak −(değer−70)×0,20 düşer (80'de −2, 90'da −4, 100'de −6; `yuksekPasifDusus`, `PASIF_DUSUS_ESIGI/KATSAYI`; `birlikYil.ts` adım 8 ve 9). **Yeni er giriş talimi 15** (`TALIM_YENI_ER_GIRIS`, eski 25).

Testler: `birlik.test.ts` "v67 Madde 2" bloğu (net talim, politika morali, ücretsiz talim, ganimet payı, bolluk, pasif düşüş, metin) + `birlikV39.test.ts` sabit beklentileri. `simulateBirlik.ts` (N=40, Orta Çağ): dengeli/aktif net pozitif, batan %3-5, zafer %77-88 — ekonomi bozulmadı. Not: "görev kaybı" testine `para` verildi (moral gelir bonusu ×1,05 yokken ordu borca girip erzak firarını tetikliyordu). Açık: komuta tonu (moral ±3) hâlâ var (Madde 7), moral/talimin güce etkisi ±%25 (Madde 4).

## v67 — Madde 3: ekonomi sabitleri (2026-11)

| Kalem | Eski → Yeni | Sabit |
|---|---|---|
| Er masrafı (oyuncu öder) | 0,19 → **0,23** | `ER_MASRAFI` |
| Erzak (er başı) | 0,14 → **0,13** | `ERZAK_BIRIMI` |
| Devlet er başı ödemesi | 0,15 (değişmedi) | `ER_BASI_GELIR` |
| Sold (rütbeden bağımsız) | 9 → **8,5** | `SOLD` |
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
