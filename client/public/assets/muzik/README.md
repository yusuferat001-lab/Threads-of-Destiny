# Arka Plan Müziği

`client/src/muzik.ts` bu klasördeki ses dosyalarını otomatik arar. Bir dosya yoksa (404)
o parça **sessizce atlanır**; modun hiçbir parçası yoksa müzik hiç çalmaz — sahne görsel
fallback'iyle aynı felsefe: kod, ses dosyaları olmadan da sorunsuz çalışır.

## Hızlı başlangıç

```bash
bash client/public/assets/muzik/indir.sh
```

Serbest lisanslı kayıtları Wikimedia Commons'tan indirir, `ffmpeg` varsa ses düzeyini
normalize eder, `künye.txt`'yi yazar. Wikimedia yoğunken bazı dosyalar `429` ile inmeyebilir —
script'i biraz sonra tekrar çalıştır (inmiş dosyaları atlar).

## Dosya adları

| Mod | Ne zaman çalar | Dosyalar (karışık döngü) |
|---|---|---|
| `menu`   | Giriş, kurulum akışı, meslek seçimi, liderlik | `menu-1`, `menu-2`, `menu-3` |
| `ortacag`| Orta Çağ karakteriyle oyun + alt ekranlar | `ortacag-1`, `ortacag-2`, `ortacag-3` |
| `sanayi` | Sanayi Devrimi karakteriyle oyun + alt ekranlar | `sanayi-1` … `sanayi-6` |
| `olum`   | Ölüm ekranı | `olum-1` (tek parça, kendi kendine döngüye girer) |

- **Uzantı:** `.mp3` **veya** `.ogg` olabilir — `muzik.ts` her parça için önce `.mp3`, olmazsa
  `.ogg` dener (tarayıcı desteğine göre). Not: iOS Safari `.ogg` çalmaz — telefon
  hedefliyorsan parçaları `.mp3`'e çevir.
- En az **1** dosya koyman yeterli; eksik olanlar atlanır.
- Yeni parça eklemek için: dosyayı at **ve** `muzik.ts` içindeki `PARCALAR` haritasına
  uzantısız adını ekle (`ortacag-4` gibi).

## Format / boyut önerisi

- Uzunluk: parça başına 1.5–3 dk; döngüde dikişin belli olmaması için sonu başına yumuşak
  bağlanan parçalar seç.
- Ses düzeyi: motor master'ı ~0.32'ye çeker ve ekran geçişinde ~0.9 sn fade uygular.
- **Tüm parçalar ~96 kbps OGG'ye yeniden kodlandı + -16 LUFS'a normalize edildi** (2026-09-08).
  Klasör toplam ~34 MB. `indir.sh` ham kayıtları çeker; küçültmek için sonuna eklenen
  ffmpeg döngüsünü çalıştır (bkz. script sonu).

## Telif

Beste (Bach, Grieg, Chopin, Vivaldi...) kamu malı olsa bile **her kayıt/icra ayrı teliflidir**.
YouTube/Spotify'dan çekilen kayıt KULLANILAMAZ. Bu bundle'daki **13 parçanın 13'ü de TAM
telifsiz** (kamu malı / CC0): ABD askeri bando (Marine/Army/Air Force — hükümet işi, PD),
Musopen "Public Domain Mark" kayıtları, ve CC0'a adanmış kayıtlar. **Oyunda hiçbir künye/atıf
metni göstermek zorunda değilsin.** `künye.txt` yalnızca kayıt tutmak için.

Güvenli kaynaklar (yeni parça ararken): **Musopen.org** (PD/CC0 filtrele), **Wikimedia Commons**
(`indir.sh` buradan çeker; ABD bando kayıtları ve "PD Mark" olanları seç).

## Şu an bundle'da (2026-09-08 — 13 parça, hepsi kamu malı / CC0)

| Dosya | Eser | Kayıt | Tempo |
|---|---|---|---|
| `menu-1.ogg`    | Bach — Air on the G String | U.S. Air Force Strings | sakin |
| `menu-2.ogg`    | Mozart — Figaro'nun Düğünü Uvertürü | U.S. Army Band | hızlı |
| `menu-3.ogg`    | Vivaldi — İlkbahar, I. Allegro | Modena Chamber Orch. | canlı |
| `ortacag-1.ogg` | Vivaldi — Sonbahar, III. Allegro ("Av") | Modena CO | hızlı |
| `ortacag-2.ogg` | Vivaldi — Kış, III. Allegro | Modena CO | çok hızlı |
| `ortacag-3.ogg` | "Sumer Is Icumen In" (13. yy round'u) | ~50 sn | canlı |
| `sanayi-1.ogg`  | Grieg — "Sabah" / Peer Gynt | Musopen Symphony | sakin |
| `sanayi-2.ogg`  | Suppé — Hafif Süvari Uvertürü (1866) | U.S. Marine Band | çok hızlı |
| `sanayi-3.ogg`  | Grieg — "Dağ Kralının Salonunda" | Czech National SO | tırmanan |
| `sanayi-4.ogg`  | Offenbach — "Can-Can" (1858) | Musopen | çok hızlı |
| `sanayi-5.ogg`  | Rossini — Wilhelm Tell Uvertürü (1829) | U.S. Marine Band | hızlı final (~11 dk, 6.6 MB) |
| `sanayi-6.ogg`  | Vivaldi — "Yaz", III. Presto (fırtına) | Modena CO | çok hızlı |
| `olum-1.ogg`    | Chopin — Cenaze Marşı (Op. 35 / III) | A. Xenopoulos (Musopen) | ağır |

**Orta Çağ notu:** `ortacag-1/2` barok (Vivaldi, ~1720) — Orta Çağ değil. Wikimedia'da hızlı +
kamu malı GERÇEK ortaçağ kaydı pratikte yok; dönem-sadık istersen kendi render'ını üret.
