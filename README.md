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
