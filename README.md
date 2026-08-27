# Kader Çarkı (Threads of Destiny)

Çağını, ülkeni ve mesleğini sen seç; ailen ve kişiliğin rastgele belirlensin. Gerisini kaderin ve kararların belirlesin. Ölüm kalıcıdır.

Metin tabanlı, tarihi bir hayat simülasyonu. Orta Çağ veya Sanayi Devrimi'nde, Asker/Tüccar/Din Adamı olarak yüzlerce farklı olayla örülü bir hayat yaşarsın.

## Gereksinimler

- [Node.js](https://nodejs.org/) 20 veya üzeri (18+ de çalışır)
- npm (Node ile birlikte gelir)

## Kurulum

Depoyu indir (klonla ya da "Download ZIP" ile indirip aç), sonra **iki ayrı klasörde** bağımlılıkları kur:

```bash
cd server
npm install
```

```bash
cd client
npm install
```

## Ortam değişkenleri

`server` klasöründe bir `.env` dosyası gerekiyor. Örnek dosyayı kopyala:

```bash
cd server
cp .env.example .env
```

(Windows'ta PowerShell kullanıyorsan: `Copy-Item .env.example .env`)

## Veritabanını hazırla

Sunucu, karakter kayıtlarını yerel bir SQLite dosyasında tutar. İlk çalıştırmadan önce şemayı oluşturman gerekiyor:

```bash
cd server
npx prisma migrate deploy
```

## Çalıştırma

Oyun **iki ayrı süreç** gerektirir: sunucu (backend) ve istemci (frontend). İkisini de aynı anda, **iki ayrı terminalde** çalıştırman gerekiyor.

**Terminal 1 — sunucu:**

```bash
cd server
npm run dev
```

**Terminal 2 — istemci:**

```bash
cd client
npm run dev
```

İkisi de ayaktayken tarayıcıdan **http://localhost:5180** adresini aç.

> Sadece istemciyi çalıştırıp sunucuyu unutursan ekranlar boş kalır ya da seçimler ilerlemez — ikisinin de aynı anda çalışıyor olması gerekiyor.

## Testleri çalıştırma (opsiyonel)

```bash
cd server
npm test
```

## Proje yapısı

```
server/   Node.js + Express + Prisma (SQLite) backend, oyun mantığı ve olay verisi
client/   React + Vite frontend
```

## Web'e deploy (Render — tek servis)

Prodüksiyonda tek bir "always-on" Node servisi çalışır: Express hem `/api`'yi hem
de derlenmiş React istemcisini (`server/public`) aynı origin'den servis eder.
SQLite veritabanı kalıcı bir diskte (`/var/data/prod.db`) tutulur.

**Gereksinim:** Kalıcı disk Render'ın ücretsiz planında yoktur; en az `starter`
(aylık ücretli) instance gerekir. Tamamen ücretsiz istiyorsan SQLite yerine
harici bir Postgres'e geçmen gerekir.

### Adımlar

1. Bu depoyu bir GitHub reposuna push et (`main` dalı).
2. [render.com](https://render.com) → **New → Blueprint** → repoyu seç. Render
   kökteki [`render.yaml`](render.yaml)'i okuyup servisi + diski oluşturur.
3. İlk deploy'dan sonra servis `https://<ad>.onrender.com` adresinde yayında olur.

### Build / start (render.yaml içinde tanımlı)

| Aşama | Komut | Ne yapar |
|---|---|---|
| Build | `npm run build` | `server/` + `client/` bağımlılıklarını kurar, `prisma generate`, istemciyi `server/public`'e derler, sunucuyu `tsc` ile derler |
| Start | `npm start` | `prisma migrate deploy` (şemayı diske uygular) → `node server/dist/server.js` |

### Ortam değişkenleri

| Değişken | Değer | Not |
|---|---|---|
| `DATABASE_URL` | `file:/var/data/prod.db` | Kalıcı disk mount yolu |
| `NODE_VERSION` | `22` | |
| `PORT` | *(Render otomatik enjekte eder)* | Kodda `process.env.PORT` okunuyor |
| `CORS_ORIGIN` | *(opsiyonel)* | Sadece istemci farklı bir domain'den servis edilecekse gerekir |

Yerel geliştirme akışı değişmedi (`server/` + `client/` ayrı `npm run dev`).
