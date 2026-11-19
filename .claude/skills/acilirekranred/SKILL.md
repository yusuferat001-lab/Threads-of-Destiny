---
name: acilirekranred
description: Kader Çarkı "açılırekranred" açılır ekran şablonu (bordo kadife sahne, altın çift çerçeveli koyu panel, kahveli latte seçenek satırları, kol renkli madalyon, rütbe yolu, onay düğmesi, ordun-rakip güç paneli). Kullanıcı "açılırekranred", "yeni karar/seçim penceresi", "popup/açılır ekran ekle", "doktrin/öğreti/savaş penceresi gibi yap" dediğinde ya da yeni bir zorunlu karar penceresi yazılacaksa kullan.
---

# açılırekranred — açılır ekran (karar penceresi) şablonu

Oyundaki zorunlu "seç ve onayla" pencerelerinin ortak görünümü. **Yeni pencere için CSS yazma; hazır bileşenleri birleştir.**

## Dosyalar (hepsi `client/src/`)

| Dosya | Ne |
|---|---|
| `karar-kabuk.css` | Tüm stil (App.tsx'te EN SON import edilir). Bordo sahne `.kk-katman`, panel `.kk-panel`, satır `.kk-satir`, rütbe yolu `.kk-yol`, güç paneli `.kk-vs`, onay `.kk-onay`, ölüm ekranı ve sonuç kutuları bölümleri. |
| `components/KararKabuk.tsx` | `KararKatman`, `KararSatiri`, `RutbeYolu`, `KararOnay`, `GucKarsilastirma` |
| `components/kararKol.ts` | `Kol` türü (`evrensel` mavi · `sadik`/`kahraman` altın · `sert` kızıl), `kolOlarak()`, `useKolEtiketi()` |
| `renk-paleti.css` | Tokenlar: `--c-lk-*` (kahveli latte), `--c-kol-*` (kol renkleri) |
| `components/DoktrinSecimi.tsx`, `OgretiSecimi.tsx`, `SavasKararlari.tsx`, `TerfiPenceresi.tsx`, `KrediKarti.tsx`, `IsYatirimEkrani.tsx`, `KisilikPaneli.tsx` | Şablonu kullanan gerçek örnekler |
| `.claude/skills/acilirekranred/ornek.tsx` | Kopyala-yapıştır örnek pencere (tip kontrolünden geçer) |
| `.claude/skills/acilirekranred/onizleme.html` | Tarayıcıda açılan görsel önizleme (masaüstü + telefon + Ordu listesi + renk tablosu) |
| `docs/referans/13-garanti-sink-tema.md` | §53 Faz 10 ve Faz 11: tasarım kararları ve tuzaklar |

## Yeni pencere nasıl yazılır

1. `ornek.tsx`'i `client/src/components/` altına kopyala, adını ve `M` metin tablosunu (TR + EN) değiştir.
2. İskelet: `<KararKatman simge baslik alt rozet>` → (isteğe bağlı `<RutbeYolu>` ya da `<GucKarsilastirma>`) → `<div className="kk-liste kk-secimler">` içinde `<KararSatiri onClick secili …>` satırları → `<KararOnay>`.
3. Seçim yapısı hep **seç + onayla**: satıra tıklamak yalnız seçer; sunucuya giden iş `KararOnay` düğmesinde.
4. Etki çipleri `className="kk-cip s-arti"` / `"kk-cip s-eksi"` (açık yüzeyde yeşil/kırmızı otomatik). Açıklama metni için `detay`. İkisi birden verilirse çipler üstte, detay altta.
5. Kapatılamaz pencere ise App.tsx'te mevcut desen gibi koşullu render et (bkz. `DoktrinSecimi`/`TerfiPenceresi`). Zorunlu pencerelerde sunucu, karar gelmeden zamanı ilerletmez.
6. Satır listesi bir sayfanın içindeyse (Ordu/Cemaat/Kişilik) `<div className="kk-liste kk-kucuk">` ve `KararSatiri`'ni `onClick`siz kullan.

## v70 eklentileri

- **Adım adım pencere:** `<KararKatman sabit>` çerçeve boyunu sabitler; sorular `SavasKararlari.tsx` gibi tek tek gösterilir (tıkla → sonraki soru, `kk-onay` içinde `.kk-geri-btn`, ESC = geri).
- **İki sütunlu liste:** `<div className="kk-liste kk-ikili">` (PC'de iki sütun, telefonda tek); satırlar dar düzene geçer.
- **Yan ekran sayfası:** kökte `ekran ekran-tam-sayfa ekran-yan` (latte yüzeyler, PC büyütme, sticky onay çubuğu).
- **✕ sağ üst:** kapatılabilir her pencerede `<KapatX onClick={...} />`; ESC `App.tsx ekranGeri` ile genel.

## Kurallar ve tuzaklar

- **KESİN KURAL: kahve üstüne kahve yok** (CLAUDE.md). Koyu kahve çerçeve üstünde krem/latte yüzey, bordo, altın.

- **Renk uydurma.** Sayılar: yeşil artı, kırmızı eksi, lacivert durum, eflatun şart (`docs/referans/14-renk-paleti.md`). Kol renkleri yalnız kol kimliği içindir.
- **Oyuncuya "sold" yazma:** asker ödemesinin yerel adı (`MAAS_ADLARI`: Ulûfe, Löhnung…) kullanılır; `tests/askerOdemeAdi.test.ts` Türkçe metinleri tarar.
- **Yeni metne mekanik eşik/oran yazma.** TR + EN birlikte ver.
- **Genel `button:hover` (App.css) ve `.strateji-sayfa button { background … !important }`** satırları kahveye/bordoya boyar. `karar-kabuk.css` ve `strateji.css` bu yüzden `.kk-satir` ve `.kk-onay-btn`'i muaf tutar; yeni bir bağlamda satır yanlış boyanırsa önce bu kuralları kontrol et.
- `renk-paleti.css` içindeki `button … .s-arti` (açık yeşil) kuralı çipleri bozabilir; `karar-kabuk.css` bunu `.kk-satir.kk-satir.kk-satir .s-arti` ile aşar.
- Eski `.ogreti-*` pencereleri (Çatışma kararı, Savaş/Çatışma sonucu, Ürün seçimi) aynı görünümü yalnız CSS ile alır; yeni pencerede bunları kullanma, `KararKatman` kullan.

## Doğrulama

- `cd client && npx tsc -b && npx oxlint`
- Görsel kontrol: yerel sunucu (`cd server && npm run dev:bellek`) + `cd client && npx vite`; Playwright ile masaüstü (1280) ve telefon (390) ekran görüntüsü; telefonda `document.documentElement.scrollWidth` = 390 olmalı.
- Oyun içi hız sınırı dakikada 240 istek; script ile oynarken bu yüzden yavaşla.
