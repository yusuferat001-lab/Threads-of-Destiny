# 14 — Renk paleti (sayı ve değer renkleri)

Tek kaynak: `client/src/renk-paleti.css` (`:root` değişkenleri + `.s-*` yardımcı sınıfları). PC strateji sayfalarının kuralları `client/src/strateji-panel.css` sonundaki "Sayı renkleri" bloğunda.

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

## Bilinen eksikler
Cemaat "🔒 Rütbe N" kilidi eflatun değil; metin içine gömülü mesajlar (hırsızlık/ganimet uyarı cümleleri, olay şıkları, KisilikPaneli etiketleri) düz metin; bordo düğmelerin içindeki tutarlar renklenmez; sıfır tutarlar (`Gider: 0`) işaretsiz olsa da renkli görünür.
