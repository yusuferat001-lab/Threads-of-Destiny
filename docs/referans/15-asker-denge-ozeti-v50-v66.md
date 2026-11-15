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

## Düşmanla ilgili yüzdeler (üç ayrı yer)
1. **±%5 gerçek sapma** — `BARIS_DUSMAN_SAPMA` / `DUSMAN_ORAN` [0,95; 1,05]: karşılaşmadaki düşmanın GERÇEK gücü = yaş/tür formülü × U(0,95; 1,05); karşılaşma kurulurken bir kez çekilir.
2. **±%5 gösterilen tahmin aralığı** — `TAHMIN_ARALIGI_TABAN` (0,05): çatışma penceresinde düşmanın saldırı/savunması bu gerçek değerin ±%5'i olarak aralıkla gösterilir; Keşif subayı ±%4,1 / 3,2 / 2,3'e daraltır.
3. **±%7 zar** — `SAVAS_ZAR_YUZDE` (0,07): sonuç çözülürken her iki taraf da (oyuncu ve düşman, bağımsız) gücünü `1 + (d20 − 10,5)/9,5 × 0,07` ile çarpar (d20 → −%7…+%7). Yalnız zar etkisiyle (ölçüm): güç oranı 1,00× → %52 · 1,03× → %68 · 1,05× → %77 · 1,10× → %94 · 1,15× → %99,8 kazanma; 0,90× → %4. Gerçek sapma (±%5) bunun üstüne biner.

## Yapılmayanlar / bilinçli bırakılanlar
- Görev gelirinde **er sayısına bağlı ek azalan verim** (B2) — yalnız güç bantları var.
- **Aktif oyuncu için düşmanı sertleştirme**: kalite/talim/moral tam kullanan oyuncu hâlâ %94 civarı kazanıyor (düşman genel bota göre kalibre).
- **İyi ikmal ile küçük sağlık yastığı**, savaş sağlık toplamını 5–15'e çekme alternatifi (5–20 uygulandı).
- **Seferberde savaş boyu yıllık firar, yenilgide son 2 yıl çarpanı ve düşük moralde ek firar** geri getirilmedi (kullanıcı kararıyla kalktı).
- **Borçla ölenleri azaltma** (%37–45 bandında, koşular arası ±4 puan): düşük rütbe ek ödenek / enflasyon farkı seçenekleri uygulanmadı.
- **Asker geç ömür geliri diğer mesleklerin hâlâ ~5–9 katı** (aktif oyuncuda); ek bir tavan/vergi turu yapılmadı.
- Hazine payı **yalnız Asker**; Tüccar/Zanaatkâr/Din Adamı'nda kazanç vergisi yok (kendi ekstra vergi sistemleri var).
- Kayıt uyumu: eski kayıtlardaki kalkan görevler (haydut avı, akın, muhafızlık) ve fazla görevler ilk yüklemede ayıklanır; eski savaşlarda sağlık planı yoksa savaş başında çekilir.
