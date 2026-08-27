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

Toplam: 2 çağ × 2 katman = **4 dosya**.

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
- `sanayi/arka-plan.png` ✅
- `on-plan.*` katmanları henüz yok (opsiyonel, siluet derinliği için ileride eklenebilir)
