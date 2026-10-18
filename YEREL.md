# Oyunu kendi bilgisayarında dene (Kader Çarkı)

PostgreSQL / veritabanı **gerekmez**. İlerlemen sunucu kapanınca silinir (deneme modu).

## 1) Bir kez kurulacaklar
1. **Node.js LTS** (20 ya da 22): https://nodejs.org → "LTS" indir, hep "İleri" de, kur.
2. **Git**: https://git-scm.com/downloads → kur (Windows'ta hep "Next").
3. Kontrol: Windows'ta Başlat → "cmd" yaz, aç; Mac'te "Terminal" aç. Şunları yaz:
   ```
   node -v
   git --version
   ```
   İkisi de bir sürüm numarası göstermeli (`node` en az v20).

## 2) Oyunu indir
Terminali (siyah pencere) bir klasörde aç (ör. Masaüstü) ve yaz:
```
git clone https://github.com/yusuferat001-lab/threads-of-destiny.git
cd threads-of-destiny
git checkout claude/jolly-hypatia-25a54w
```
(Git yerine: GitHub'da depoyu aç → dal olarak `claude/jolly-hypatia-25a54w` seç → Code → Download ZIP → klasöre çıkar.)

## 3) Başlat
- **Windows:** klasördeki `yerel-baslat.bat` dosyasına çift tıkla.
- **Mac / Linux:** terminalde klasörde `./yerel-baslat.sh` yaz (ilk seferde `chmod +x yerel-baslat.sh` gerekebilir).

İlk seferde paketler indirilir (birkaç dakika). Sonra tarayıcıda **http://localhost:5180** açılır.
Güvenlik duvarı sorarsa "İzin ver" de.

## 4) Oynarken
Yeni hayat başlat → çağ/bölge seç → isim → **Tüccar** seç. Yeni işletme sistemi **Kariyer** ekranında
(sahnenin solundaki 🎖️ düğmesi).

## 5) Durdurma
Windows: açılan iki siyah pencereyi kapat. Mac/Linux: terminalde `Ctrl+C`.

## Sık sorunlar
- *"Node.js kurulu değil"* → 1. adımı yap, terminali kapatıp yeniden aç.
- *Port dolu (3001/5180)* → önceki pencereleri kapat, tekrar dene.
- *Boş/hata ekranı* → sunucu penceresinde kırmızı hata var mı bak, bana yapıştır.
- Kalıcı kayıt istersen gerçek PostgreSQL gerekir (`npm run db:local`, Docker ya da Neon) — CLAUDE.md §1.
