# 14 — Renk paleti (sayı ve değer renkleri)

Tek kaynak: `client/src/renk-paleti.css` (`:root` değişkenleri + `.s-*` yardımcı sınıfları). PC strateji sayfalarının kuralları `client/src/strateji-panel.css` sonundaki "Sayı renkleri" bloğunda.

## Yüzey kuralı (DEĞİŞMEZ): zemin KAHVE, tablo KREM
Her ekranda **arka plan kahve (mocha)**, **tablo / kart / satır / bütçe yüzeyi krem (latte)**. Tablo şeffaf bırakılmaz; kahve zemin üstüne doğrudan koyu yazı konmaz. Yeni renk uydurulmaz, oyundaki tonlar:
| Rol | Değişken | Değer |
|---|---|---|
| Kahve sayfa zemini | `strateji.css .strateji-sayfa` | `#6a4e3a → #55402f → #463223` |
| Kahve kart/başlık | `--s-mocha-1/2/3` | `#6a4e3a / #4a3425 / #3a281c` (kenar `--s-mocha-kenar #c7b08a`, yazı `--s-mocha-yazi #f2e8d6`) |
| **Krem kart/tablo** | `--s-latte-1 → --s-latte-2` | `#d8c5a6 → #bda585` (gradyan) |
| Açık krem (şerit, özet) | `--s-latte-acik` | `#e9dcc3` |
| Krem kenar / yazı / soluk | `--s-latte-kenar / -yazi / -soluk` | `#6e4f35 / #2c1f15 / #5e4733` |
| Karar penceresi kremi | `--c-lk-1/2/yazi/soluk/kenar/cip` | `#dcc7a4 / #cdb38b / #2c1f15 / #5e4733 / #6e4f35 / #f4ead6` |
Krem yüzeyde sayı renkleri **açık-zemin** değerleri (`--c-arti`, `--c-eksi`, `--c-lacivert-1`, `--c-esik`); `-koyu` değerler yalnız kahve/koyu zeminde. Krem kartı `.zemin-koyu` kapsayıcısı içine koyarsan sayı renklerini açık-zemin değerine sabitle (bkz. `butce-iki-sutun.css`). Örnek: `ButceIkiSutun` = iki krem kart (Gelir / Gider) + krem "Kazanç" şeridi, kahve zeminin üstünde.

## Anlam tablosu

| Renk | Açık zemin (latte kart) | Koyu zemin | Ne için | Örnek |
|---|---|---|---|---|
| **Yeşil** | `--c-arti #12893a` | `--c-arti-koyu #7fd08a` | gelir, artı, bonus, kazanç, ✓ | `+22` görev kazancı, `Toplam gelir`, `Beklenen net +15`, `+%12 güç`, politika "✓" artıları, `kademe-yuksek` |
| **Kırmızı** | `--c-eksi #cc2a1e` | `--c-eksi-koyu #ff8a75` | gider, eksi, ceza, kayıp, ✗ | `−5` er masrafı, `Teçhizat bakımı`, `−2/yıl` moral, politika "✗" eksileri, uyarılar, `kademe-dusuk` |
| **Lacivert** | `--c-lacivert-1 #14305c` | `--c-lacivert-koyu #8fb2f0` | **durum** sayıları (şu an ne kadar) | er sayısı, askerî güç, pazar payı, ordu morali, talim, teçhizat etkisi (`Güç ×1,25`) |
| **Eflatun** | `--c-esik #6a3f9f` | `--c-esik-koyu #c4a2f0` | **şart / eşik / gereken / limit / kademe** | gereken askerî güç `22/45`, "en az 25 askerî güç", "Sıradaki kademe", `Kademe 0/4`, özel birlik hakkı `0/1`, rütbe şartı |
| **Nötr** | kartın koyu kahve metni | krem metin | ad, açıklama, tutarsız metin | ürün/mülk adları |

Süsleme renkleri (sayı DEĞİL, değerlerde kullanılmaz): bordo `#82202a→#591219` (düğme/başlık), altın `#c9a24a` (kenar/çerçeve vurgusu), mocha/latte zeminler (`ana-ekran.css --s-*`).

## Kurallar
1. **Para:** işaretliyse (`+`/`−`) gelir yeşil, gider kırmızı; **tüm mesleklerde ve çağlarda** aynı. Net/toplam satırı: şerit (`--c-para-sirit`) içinde, metni işaretine göre yeşil/kırmızı. **Ödenecek tutar** (fiyat, bedel, ücret, bakım, kira, taksit, kalan borç) işaretsiz de **kırmızı** (`s-gider`); **alınacak tutar** (görev kazancı, getiri, kazanç) **yeşil** (`s-gelir`). Düğme (bordo) içindeki tutarlar renklenmez.
2. **Artı/eksi etkiler** (moral, güç %, kayıp %, bonus) para olmasa da yeşil/kırmızı.
3. **Lacivert yalnız durum sayısı içindir**; her yerde kullanma (kartın normal metni nötr kahve kalır).
4. **Eflatun yalnız "şart/eşik/gereken/limit/kademe"** içindir; yayma, yoksa anlamı kaybolur.
5. Yeni ekran, meslek, çağ veya özellik eklerken **yeni onaltılık renk uydurma**; yukarıdaki değişkenleri/`.s-*` sınıflarını kullan. Koyu zemin üstünde üst kapsayıcıya `.zemin-koyu` ekle (ya da `-koyu` değişkenleri).
6. Sınıf eşlemesi: `s-gelir/s-arti` (yeşil), `s-gider/s-eksi` (kırmızı), `s-durum` (lacivert), `s-esik` (eflatun). Eski sınıflar: `kademe-yuksek/kademe-dusuk` (bütçe satırı değerleri), `cemaat-arti/-eksi`, `piyasa-art/-eksi` aynı renklere bağlı.
7. Değişiklik yapınca bu dosyayı güncelle; ilgili sayı bir tablo satırı olarak eklenir.

## Uygulandığı yerler
- **Strateji sayfaları** (Ordu, Dükkân, Atölye, Cemaat, Yatırım, Çevre/Karanlık İşler), **Evin**, **Mağaza**, **Mülkler**, **Sosyalleş** (giriş/içki fiyatı kırmızı), **Bütçen** (`ButcePaneli`), **ana ekran** (Kazanç yeşil/kırmızı), **sol panel** (yıllık gelir/gider/elde kalan), **sonuç çipleri**, **skor kırılımı**, **aranma tablosu**, **gösterge etkenleri**.
- Eski sınıflar (`ana-iyi/-kotu`, `finans-ozet-mini-*`, `finans-gelir`, `mulk-getiri-*`, `.etki-pozitif/-negatif`, `kademe-yuksek/-dusuk`) ve `--s-iyi/--s-kotu`, `--v-iyi/--v-kotu` değişkenleri palet tonlarına eşlendi; App.css'teki sabit açık yeşil/kırmızı `color:` değerleri `--c-arti-koyu/--c-eksi-koyu`'ya çevrildi.

## Ek uygulananlar
Bordo düğme içi tutarlar (açık tonlar: `button:not(.ikincil) .s-gider/.s-gelir`), kişilik penceresi etkileri, tur özeti (sonuç ekranı), hayat hikâyesi (ölüm ekranı), ürün/öğreti/doktrin/vergi modalları (`zemin-koyu`), doktrin etkileri (kayıp/masraf/firar/sertlik artışı **kırmızı**, diğer artışlar yeşil — `DoktrinEtkiSatiri`), Sosyalleş fiyatları, Cemaat rütbe kilidi (eflatun). Metin içindeki işaretli sayıları boyamak için `RenkliEtki` (`components/Renkli.tsx`; yalnız `+5`, `−3`, `-2/yıl` gibi sayı öncesi işaretleri yakalar, "1060-1070" gibi aralıkları değil).

## Bilinen eksikler
Olay hikâye metinlerinin içindeki sayılar ve olay şıkları düz metin (bilerek: hikâye anlatımı); sıfır tutarlar nötr; PC sonuç çipleri bu turda tarayıcıda doğrulanmadı (mobil sonuç çipi doğrulandı).

## Karar pencereleri (doktrin, öğreti, savaş kararı) — 2026-11
Yüzey ve kol renkleri `renk-paleti.css`'te token (`§53 Faz 10`, `13-garanti-sink-tema.md`):
- Kahveli latte seçenek yüzeyi: `--c-lk-1 #dcc7a4` → `--c-lk-2 #cdb38b`, yazı `--c-lk-yazi #2c1f15`, soluk `--c-lk-soluk #5e4733`, kenar `--c-lk-kenar #6e4f35`, çip zemini `--c-lk-cip #f4ead6` (yeşil/kırmızı sayılar bu açık pill üstünde okunur).
- Kol renkleri (madalyon halkası + sol şerit; yazıda `-koyu` değer): Evrensel `--c-kol-evrensel #5f86c9` / `#1f4a8f`, Sadık ve Kahraman `--c-kol-sadik #d1a843` / `#7a5a12`, ⚡ Acımasız/Fanatik `--c-kol-sert #d8483a` / `#8a2a22`. Bunlar sayı rengi DEĞİL, yalnız kol kimliği; sayılar yine yeşil artı / kırmızı eksi / eflatun şart.



## v67 Madde 7 (Ordu sayfası)
Moral/Talim/Güç kartlarında sayı **lacivert** (durum), "Gelecek yıl" değişimi ve "güçte %x" **yeşil/kırmızı** (artı/eksi), er/limit satırında limit **eflatun**; moral çubuğu <30 kırmızı, ≥70 yeşil, aksi lacivert (50 nötr çizgisi). Görev kartı: "en az N askerî güç" eflatun; rozetler artı yeşil / eksi kırmızı (sertlik artışı ve şöhret düşüşü kırmızı); açılır hesapta gereken eflatun, şimdiki güç lacivert, ✓ yeşil, "Eksik" kırmızı.

## v67 Madde 8 (bütçe iki sütun, ganimet dökümü)
Bütçe: **sol sütun Gelir — başlık ve tutarlar yeşil** (`s-gelir`), **sağ sütun Gider — kırmızı** (`s-gider`), "Toplam gelir/gider" kalın aynı renk, "Kazanç" şeridi (`--c-para-sirit`) işaretine göre yeşil/kırmızı. Ganimet dökümü: "Ganimet (toplam)" yeşil artı, "Askerlere %x" kırmızı eksi, **"Size kalan ganimet" yeşil ve kalın**. Yeni renk yok.
