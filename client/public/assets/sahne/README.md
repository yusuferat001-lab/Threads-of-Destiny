# Bölge Sahnesi Görselleri

`BolgeSahnesi` bileşeni (`client/src/components/BolgeSahnesi.tsx`) bu klasördeki dosyaları
otomatik olarak arar. Bir dosya yoksa (404) sessizce eski prosedürel SVG çizime geri döner —
yani dosyaları aşağıdaki yollara attığın an, kod değişikliğine gerek kalmadan oyun onları kullanmaya başlar.

## Klasör / dosya yolu

```
client/public/assets/sahne/<cag>/arka-plan.webp
client/public/assets/sahne/<cag>/on-plan.webp
```

- `<cag>`: `orta-cag` | `sanayi`

Şimdilik sahne görseli **sadece çağa göre** değişiyor, yerleşim tipine göre değil (Şehir
Merkezi/Sınır Bölgesi/Dağ Başı hepsi aynı görseli kullanıyor). Yerleşim tipi hâlâ karakterin
istatistik/yatkınlık etkilerinde kullanılıyor — sadece sahne görselinden bağımsızlaştırıldı.
İleride istenirse `<tip>` klasör katmanı geri eklenebilir (kod bunu destekleyecek şekilde
kolayca genişletilebilir).

Toplam: 2 çağ × 2 katman = **4 dosya** (+ isteğe bağlı mobil portre arka planlar, aşağıda).

## Katmanlar

1. **`arka-plan.webp`** — gökyüzü / uzak manzara. Opak, tam kareyi kaplar.
2. **`on-plan.webp`** — siluet (binalar/kale/dağ). **Şeffaf arka planlı PNG/WebP** olmalı —
   altındaki gökyüzü ve bölge tonlaması bu katmanın boşluklarından görünür.

`on-plan.webp` yoksa (henüz üretmediysen) sadece `arka-plan.webp` kullanılır — eski prosedürel
silüet ÇİZİLMEZ (gerçek resmin üstüne binmesin diye), sadece hafif dinamik efektler (ışıklar,
duman, ton) üstte kalır. Yani iki katmanı birden aynı anda vermek zorunda değilsin.

## Boyut / format

- Oran: geniş (ör. 16:9, mockup'larındaki gibi) idealdir — `object-fit: cover` ile kırpılarak sığdırılır.
- Format: önce `.webp` aranır, yoksa otomatik `.png` denenir (`arka-plan.webp` yoksa `arka-plan.png`,
  o da yoksa SVG'ye döner) — WebP'ye çevirmek zorunda değilsin, PNG bırakman yeterli.
- Sıkıştırılmış, tercihen dosya başına ~150–300 KB altı (WebP'ye çevirirsen boyut ciddi düşer, ama şart değil).

## Oyunun bu katmanların üstüne otomatik olarak ekleyeceği şeyler

Bunları resme ÇİZME — bunlar canlı oyun durumuna göre kod tarafından üretiliyor:

- **Bölge tonlaması:** her bölgenin kendi rengiyle (`bolgeTema.ts`) hafif bir overlay (`mix-blend-mode: overlay`, %16 opaklık) — aynı sanatı 8 farklı bölgede biraz farklılaştırır.
- **Işıklar:** `un` arttıkça artan sayıda titreşen ışık noktası (pencere/ateş gibi).
- **Savaş dumanı:** `ulke.savasta` true iken üstte animasyonlu duman.
- **Veba tonu:** `ulke.vebada` true iken yeşilimsi-gri overlay.
- **Ekonomi tonu:** iyi ekonomide hafif altın, kötü ekonomide hafif karartma.
- **Bölge sembolü emoji:** sadece hiç görsel YOKSA (tam SVG fallback'te) ortada gösterilir; `arka-plan` verince bu kapanır.

## Şu an mevcut olan dosyalar

- `orta-cag/arka-plan.png` ✅
- `sanayi/arka-plan.webp` ✅ (1376×768, ~180 KB)
- `on-plan.*` katmanları henüz yok (opsiyonel, siluet derinliği için ileride eklenebilir)

## Mobil (portre) arka plan — `arka-plan-mobil.webp`

Telefonda (≤767px) oyun/sonuç ekranında sahne artık bir şerit değil, **tüm sayfanın arkasını kaplayan**
dikey bir arka plandır (`BolgeSahnesi mod="sayfa"`, `.oyun-arka-sahne`, bkz. `client/src/mobil-oyun.css`).

```
client/public/assets/sahne/<cag>/arka-plan-mobil.webp      (<cag>: orta-cag | sanayi)
```

- **Aday sırası:** `arka-plan-mobil.webp` → `arka-plan.webp` → `arka-plan.png` → bölge gradyanı. Yani portre dosya
  yokken yatay görsel `object-fit: cover` ile (kırpılarak) geçici kullanılır; dosyayı koyduğun an kod değişmeden devreye girer.
- **Boyut:** ~1080×2400 (≈9:20). 9:16 ile 9:21 arası ekranlara `cover` ile kadrajlanır. Tercihen ≤350 KB (WebP).
  Şu an iki çağın da yalnız yatay WebP'si var; portre dosya gelince mobilde daha iyi kadrajlanır.
- **Güvenli alan (önemli):** olay kutusu ekranın **alt ~%55'ini** örter; görsel `object-position: 50% 0` ile
  üstten hizalanır. Asıl sahne (kale/şehir/ufuk) **üst ~%40'ta** ve kutunun iki yanındaki **%7'lik yan şeritlerde**
  okunmalı; alt kısım doku/gradyan olabilir. Üst ~%14'te üst şerit + amaç satırı durur — orası sakin/koyu kalmalı.
- Üstüne otomatik binenler (resme ÇİZME): üstte/altta okunabilirlik gradyanı, bölge tonu, ekonomi/veba tonu.
  Bölge etiketi (Kasaba/Savaşta/Salgın) olay kutusunun sağ-üstünde ayrıca çizilir.
- Masaüstü bu dosyayı **kullanmaz** (yatay `arka-plan.*` aynen devam eder).

## Olay illüstrasyonları (`client/public/assets/olay/`)

`<kategori>-<orta-cag|sanayi>.webp` (kategori: savas, ticaret, din, siyaset, saglik, sosyal, zanaat), ~1200×620.
Mobilde kutunun üstündeki altın çerçevede, masaüstünde olay kartının solunda görünür. Dosya yoksa mobil çerçevede
kategori emojisi plaka olarak gösterilir (şu an Sanayi Devrimi'nin 7 resmi yok) — dosyalar gelince kod değişmeden devreye girer.
