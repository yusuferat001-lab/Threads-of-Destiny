# (Threads of Destiny)

Çağını, ülkeni ve mesleğini sen seç; ailen ve kişiliğin rastgele belirlensin. Gerisini kaderin ve kararların belirlesin. Ölüm kalıcıdır.

Metin tabanlı, tarihi bir hayat simülasyonu. Orta Çağ veya Sanayi Devrimi'nde, Asker/Tüccar/Din Adamı olarak yüzlerce farklı olayla örülü bir hayat yaşarsın.

## Gereksinimler

- [Node.js](https://nodejs.org/) 20 veya üzeri (18+ de çalışır)
- npm (Node ile birlikte gelir)
- Bir PostgreSQL veritabanı (yerelde en kolayı Docker; prod'da harici bir Neon/Supabase)

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

Sunucu, karakter kayıtlarını bir **PostgreSQL** veritabanında tutar. Önce bir Postgres çalıştır (en kolayı Docker):

```bash
docker run --name kc-pg -e POSTGRES_PASSWORD=kader -e POSTGRES_DB=kadercarki -p 5432:5432 -d postgres:16
```

`server/.env` içindeki `DATABASE_URL`'i bu veritabanına yönlendir (`.env.example`'daki Docker satırı hazır), sonra şemayı oluştur:

```bash
cd server
npx prisma migrate deploy
npx prisma generate
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
server/   Node.js + Express + Prisma (PostgreSQL) backend, oyun mantığı ve olay verisi
client/   React + Vite frontend
```

## Web'e deploy (Render — tek servis, ücretsiz)

Prodüksiyonda tek bir Node servisi çalışır: Express hem `/api`'yi hem de derlenmiş
React istemcisini (`server/public`) aynı origin'den servis eder. Veritabanı ayrı,
**harici ve ücretsiz bir PostgreSQL**'dir ([Neon](https://neon.tech) önerilir).

> Render ücretsiz planı 15 dk hareketsizlikten sonra uyur; uykudan sonraki ilk
> istek ~50 sn sürer. Aktif oyunlar DB'de tutulduğu için uyanışta kaybolmaz
> (`server.ts` açılışta aktif oturumları geri yükler).

### Adımlar

1. **Neon'da veritabanı aç:** [neon.tech](https://neon.tech) → ücretsiz hesap →
   New Project (bölge: Frankfurt) → verdiği bağlantı dizesini kopyala
   (`postgresql://...@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`).
2. **Depoyu GitHub'a push et** (`main` dalı).
3. **Render Blueprint:** [render.com](https://render.com) → ücretsiz hesap →
   **New → Blueprint** → repoyu seç. Render kökteki [`render.yaml`](render.yaml)'i
   okuyup `web` servisini oluşturur.
4. `DATABASE_URL` alanına 1. adımdaki Neon dizesini yapıştır; `CORS_ORIGIN`'i boş bırak.
5. İlk deploy bitince servis `https://<ad>.onrender.com` adresinde yayında olur.

### Build / start (render.yaml içinde tanımlı)

| Aşama | Komut | Ne yapar |
|---|---|---|
| Build | `npm run build` | `server/` + `client/` bağımlılıklarını kurar, `prisma generate`, istemciyi `server/public`'e derler, sunucuyu `tsc` ile derler |
| Start | `npm start` | `prisma migrate deploy` (Neon şemasını günceller) → `node server/dist/server.js` |

### Ortam değişkenleri

| Değişken | Değer | Not |
|---|---|---|
| `DATABASE_URL` | `postgresql://...?sslmode=require` | Neon'dan alınır, Render panelinden girilir (repoya yazılmaz) |
| `NODE_VERSION` | `22` | `render.yaml`'da sabit |
| `PORT` | *(Render otomatik enjekte eder)* | Kodda `process.env.PORT` okunuyor |
| `CORS_ORIGIN` | *(opsiyonel)* | Sadece istemci farklı bir domain'den servis edilecekse gerekir |

### Sonraki güncellemeler

`main` dalına her `git push` → Render otomatik yeniden derleyip yayınlar
(`autoDeploy: true`). Şema değişirse önce yerelde `npx prisma migrate dev --name <ad>`
çalıştır, oluşan migration dosyasını da commit et; Render `start` sırasında
`prisma migrate deploy` ile canlıya uygular.

Yerel geliştirme akışı değişmedi (`server/` + `client/` ayrı `npm run dev`,
sadece artık yerelde de bir Postgres gerekiyor).
