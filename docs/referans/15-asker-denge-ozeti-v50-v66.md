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

## Zafer serisi (v67)
Her tür (haydut, sınır, büyük savaş) için AYRI sayaç (`b.zafer_serisi`): zafer +1, yenilgi sıfırlar. Sayaç ≥3 iken sıradaki karşılaşmada düşman gücü ×1,10–1,15 ("hazırlıklı"; seri sürdükçe her karşılaşmada yeniden çekilir). Pencerede sayı yazılmaz, yalnız "Düşman seni tanıyor; bu sefer hazırlıklı." notu görünür. Çatışmada `catisma_bekleyen.hazirlik`, savaşta `sv.hazirlik` (savaş başında çekilir).

## Yapılmayanlar / bilinçli bırakılanlar
- **Seferberde savaş boyu yıllık firar, yenilgide son 2 yıl çarpanı ve düşük moralde ek firar**: geri getirilmedi — kullanıcının v61 kararı (ek firar yalnız ilk 2 yıl, %5/%10) ile çelişir; yön bekleniyor.
- **Borçla ölenleri azaltma** (%41 civarı, koşular arası ±4 puan): düşük rütbe ek ödenek / enflasyon farkı uygulanmadı.
- **Asker geç ömür geliri**: görev er bantları + hazine payı sonrası genel botta diğer mesleklerle aynı bantta; aktif oyuncuda hâlâ yüksek.
- **Aktif oyuncunun kazanma oranı** (%96–98): düşman genel bota göre kalibre; zafer serisi bonusu bunu kısmen dengeliyor.
- Hazine payı **yalnız Asker**.
- Kayıt uyumu: eski kayıtlardaki kalkan görevler ve fazla görevler ilk yüklemede ayıklanır; eski savaşlarda sağlık planı/hazırlık yoksa varsayılan kullanılır.

## v67'de eklenenler (eskiden "yapılmayanlar")
- Görev gelirinde **er sayısına bağlı azalan verim** (`GOREV_ER_BANTLARI`: 0–200 er ×1 · 200–350 ×0,85 · 350+ ×0,70; güç bantlarına ek).
- **Savaş sağlık kaybı ikmale bağlı**: yumuşak yağma (iyi ikmal) ×0,85, orta ×1, sert yağma ×1,15 (yağma kayıp çarpanıyla aynı). Savaş toplamı 5–20 kaldı.
