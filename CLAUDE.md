# CLAUDE.md — Kader Çarkı (Threads of Destiny)

Türkçe, metin tabanlı, tarihi hayat simülasyonu (Orta Çağ / Sanayi Devrimi; Asker, Tüccar, Din Adamı, Zanaatkâr). `server/` = Node + Express 5 + TypeScript + Prisma (PostgreSQL), tüm kurallar burada; `client/` = React 19 + Vite, saf `useState`. İstemci `types.ts` sunucununkinin **elle senkronize** kopyasıdır — birini değiştirince ötekini de güncelle.

## Nasıl çalış (önemli)

- **Bu dosya kasıtlı olarak kısa.** Ayrıntılı oyun kuralları, formüller ve API tabloları `docs/referans/*.md` altında (aşağıdaki indeks). Hepsini okuma: önce `grep -n "anahtar kelime" docs/referans/*.md` ya da `grep -n "^## " docs/referans/<dosya>` ile bölümü bul, sonra `Read` ile yalnız o aralığı (`offset`/`limit`) oku.
- **Olay verisini (`server/src/data/olaylar/*.ts`, ~48.000 satır) ve `stateManager.ts`/`gameEngine.ts`'i baştan sona okuma.** Belirli bir olay için `grep -n 'id: "<olay_id>"' server/src/data/olaylar/*.ts`.
- **Çelişki kuralı:** docs'ta aynı konu birden çok tur güncellendi. Numarası/sürümü yüksek bölüm geçerlidir (ör. §45 v13 > §45 v8; §51–§53 > eski §13/§27). Bir sayıya güvenmeden önce koddaki sabiti de kontrol et.
- Mekanik değiştirince **ilgili test dosyasını** çalıştır (`cd server && npx vitest run tests/<dosya>.test.ts`); tüm paket bu ortamda çok uzun sürebilir. Sunucu tarafı tip kontrolü: `cd server && npx tsc --noEmit`.
- **Yeni ekran/özellik eklerken sayı renklerini `docs/referans/14-renk-paleti.md` + `client/src/renk-paleti.css`'ten al; yeni renk uydurma.**
- Mekanik/sabit değişince `docs/referans/` içindeki ilgili bölümü de güncelle (§ numarasını koru, yeni tur notunu bölüm sonuna ekle).
- Yeni oyuncuya görünen metinlere mekanik eşik/süre/oran yazma; TR kaynak kanoniktir, İngilizce aynası `server/src/i18n/olaylar/*.en.ts` (§30).
- Yeni olay eklemek için `/olay-ekle` skill'ini kullan (`.claude/skills/olay-ekle`). Her `.ts` düzenlemesinden sonra sunucu tip kontrolünü bir hook çalıştırır (`.claude/settings.json`).

## Referans indeksi (`docs/referans/`)

| Dosya | Bölümler (§) | İçerik |
|---|---|---|
| `01-mimari-ve-api.md` | 0, 2, 3 | Oyun tanımı, oturum/katman mimarisi, **tüm API endpoint'leri** |
| `02-state-ve-olay-semasi.md` | 4–8 | `CharacterState` alanları, `SonucEtkisi`, `OlayTanimi`/`OlaySecenegi`, olay dosya haritası, etiket taksonomisi |
| `03-tur-motoru-ve-formuller.md` | 9–15 | Tur çözümleme sırası, onTepki, zorlanan olay kaskadı, olay seçim algoritması, **sayısal sabitler/formüller**, rütbe, şehir yönetimi |
| `04-katalog-ve-alt-sistemler.md` | 16–18 | Çağ/bölge/aile/kişilik/konut/mülk/hizip katalogları, hapis-yolculuk-aranma, ölüm-skor-amaçlar-liderlik |
| `05-istemci-db-test.md` | 19–22, 24 | İstemci mimarisi/ekranlar/CSS, Prisma şeması, moderasyon, test & analiz araçları, bilinen tutarsızlıklar |
| `06-sosyal-magaza-dunya.md` | 25–27 | Sosyalleşme mekânları, mağaza/envanter, savaş/veba/dünya olayları |
| `07-deploy-ayarlar-i18n-basarim.md` | 28–32 | Render deploy, ayarlar & geri bildirim, **TR/EN çeviri katmanı**, başarımlar, istatistik |
| `08-aile-rakip-yonetim.md` | 33–35 | Aile etkileşimleri, rakipler/hediye/tefeci, Kariyer & yönetim bağları |
| `09-olay-sistemleri.md` | 36–41 | Çapraz-hayat tekrar önleme, gecikmiş takip, bölgesel bonus, gizli sistemler, meslek yatkınlığı, kişilik |
| `10-test-turu-pazar-donemler.md` | 42–44 | Test turu düzeltmeleri, meslek pazarı & karanlık işler, dünya dönemleri |
| `11-isletme.md` | 45 | **Meslek işletmesi** (Tüccar/Zanaatkâr/Din Adamı), v8→v33 tüm sürüm notları |
| `12-gosterge-pc-aile2-hayvan-aranma.md` | 47, 48, 49, 50, 47 (Aranma II) | Gösterge detay, PC olay kutusu, eş/evlilik/doğum, evcil hayvan, aranma sistemi (not: iki ayrı §47 var) |
| `13-garanti-sink-tema.md` | 51–53 | Olay garanti tabloları, geç oyun sink'leri/ekstra vergi/mağaza vitrini, PC tema |
| `14-renk-paleti.md` | — | **Sayı/değer renk paleti** (yeşil gelir/artı, kırmızı gider/eksi, lacivert durum, eflatun şart/eşik); yeni ekran/özellikte uy |

Sık sorulan: "bir endpoint ne yapar" → 01 · "bir alan ne anlama gelir" → 02 · "tur nasıl çözülür / formül" → 03 · "ekonomi/işletme sayısı" → 11 + 13 · "çeviri nasıl eklenir" → 07 (§30).

## Mimari özet

- Her karakter bir `CharacterState` (UUID). Bellekte `Map<id, Oturum>` + PostgreSQL `Session.data` (tam JSON); her mutasyondan sonra `oturumKaydet()`. Sunucu açılışında aktif oturumlar yüklenir.
- Katmanlar: `routes/*.routes.ts` → `game/gameEngine.ts` (orkestrasyon, tur çözümleme, zorlanan olay kaskadı) → `game/stateManager.ts` (saf formüller) → `game/olaySecici.ts` (olay seçimi) → `data/olaylar/*.ts` (statik olay verisi) → `db/*Repository.ts`.
- Tur akışı: `POST /:id/scenario` (olay üret) → `POST /:id/choice` (seçimi uygula, zar, deltalar, yıl ilerlet). Tur harcamayan yan uçlar (mülk, mağaza, konut, işletme, ilişkiler…) için bkz. docs/01.
- Oyunun asıl durum makinesi `state.etiketler` (string etiketler): olay uygunluğu, seçenek kilitleri, havuz kilitleri (`hapiste`, `yolculukta`, `kacak`, `veba_hastasi`) bunun üzerinden yürür.
- Olay verisinde **yasa dışı şıklar** `suc_sinifi` taşır, açık pozitif `suc_artis` yazılmaz (§9 adım 3.5). Para/mutluluk deltaları için denge guardrail testi var (`mutlulukDengesi.test.ts`).

## 1. Depo Yapısı & Komutlar

```
server/   Node.js + Express 5 + TypeScript + Prisma (PostgreSQL) — oyun motoru, tüm kurallar burada
client/   React 19 + Vite + TypeScript — saf useState tabanlı, Redux/Router YOK
```

Git deposudur; geliştirme dalı ve push kuralları oturum talimatında verilir. Test/derleme için komutlar aşağıda.

| Komut | Konum | Ne yapar |
|---|---|---|
| `npm run dev` | server/ | `tsx watch src/server.ts` — API sunucusu (varsayılan :3001) |
| `npm run dev` | client/ | Vite dev server (varsayılan :5180, README'de belirtilen) |
| `npm test` | server/ | `vitest run` — 54 test dosyası (bkz. §22) |
| `npm run build` / `start` | server/ | `tsc` derleme / `node dist/server.js` |
| `npm run simulate` | server/ | `scripts/simulateEconomy.ts` — ekonomiyi bin ömür simüle eder |
| `npm run analyze-olaylar` | server/ | `scripts/analyzeOlaylar.ts` — olay bankası istatistikleri (bölge/meslek/yaş dağılımı, gerçek `olaySec()` ile simülasyon) |
| `npm run build` / `lint` | client/ | `tsc -b && vite build` / `oxlint` |
| `npm run dev:bellek` | server/ | **PostgreSQL'siz** yerel deneme: Prisma bellek-içi taklitle (`scripts/yerel.ts` + `_simPrismaStub.ts`) çalışır; ilerleme/skor sunucu kapanınca silinir. Kökteki `yerel-baslat.bat` (Windows) / `yerel-baslat.sh` (Mac/Linux) bunu + istemciyi başlatıp tarayıcıyı açar; kılavuz: `YEREL.md` |
| `npm run db:local` | server/ | **Gömülü (portable) PostgreSQL — Docker/kurulum gerektirmez.** `embedded-postgres` (devDep) `server/.localdb`'de bir cluster çalıştırır (localhost:5432, `postgres`/`kader`, db `kadercarki`); ilk çalıştırmada cluster + db'yi kurar. Ayrı terminalde açık bırak, sonra `npm run dev`. `scripts/localDb.ts` — Windows sistem yereli ASCII-dışı olduğundan `initdbFlags:['--locale=C','--encoding=UTF8']` şart. `.localdb` gitignore'da |
| `npm run db:setup` | server/ | `prisma generate && prisma migrate deploy` — `db:local` çalışırken şemayı kurar |
| `npx prisma migrate deploy` | server/ | PostgreSQL şemasını kurar (önce yerelde bir Postgres + `DATABASE_URL` gerekir) |

`.env` (server/): `DATABASE_URL="postgresql://.../kadercarki"` (yerelde: en kolayı `npm run db:local` → `postgresql://postgres:kader@localhost:5432/kadercarki`; alternatif Docker Postgres ya da Neon dev branch — `.env.example`'a bak), `PORT=3001`. CORS için `CORS_ORIGIN` (virgülle ayrılmış origin listesi, yoksa `http://localhost:5173`). Geri bildirim (§29) için opsiyonel: `GERI_BILDIRIM_ANAHTARI` (`GET /api/geri-bildirim?key=` okuma anahtarı; boşsa 403 — yazma anahtarsız Neon'a çalışır), `GERI_BILDIRIM_WEBHOOK_URL` (Discord webhook ya da Telegram sendMessage URL'si — opsiyonel anlık haber), `GERI_BILDIRIM_TELEGRAM_CHAT_ID`. İstatistik (§32) için opsiyonel: `ISTATISTIK_ANAHTARI` (`GET /api/istatistik[/panel]?key=` okuma anahtarı; boşsa uç 403).

## 23. Yeni Bir Olay Eklerken Kontrol Listesi

1. İlgili tema dosyasını seç (§7 tablosu) — yoksa `genel.ts`'e ekle.
2. `OlayTanimi` şemasına uy (§6); `id` benzersiz ve açıklayıcı olsun (proje kuralına göre önekli: `oc_`, `sd_`, `kg_`, `hizip_`, `derinlik_`, `gizem_` vb. temaya göre değişir — dosyadaki mevcut id'lerin önekine bak).
3. Uygunluk filtrelerini (`cag/bolgeler/meslekler/min-max*/gerekli*`) mümkün olduğunca dar ama gereksiz kısıtsız tut — çok kısıtlı olay havuzda nadiren çıkar.
4. Her seçenek için `basariliSonuc`/`basarisizSonuc.mesaj` **zorunlu**; `{placeholder}` kullanacaksan §6 listesindeki isimlerden seç.
   **Metin uzunluğu (2026-10 kısaltma turu, tüm banka bu hedefe çekildi):** olay `metin` ≤ ~110 karakter (üst sınır 140), şık ≤ ~32 (50), `mesaj` ≤ ~55 (80), `detay` ≤ ~35 (50), `kilitAciklamasi` ≤ 60; İngilizce aynalarda ~%10 pay. Dolgu cümlesi, süs sıfat ve tekrar yazma; yeni olay eski olaylardan uzun olmasın.
5. Stat delta'ları dengeli tut — mevcut olaylarda tipik aralık ±5..±25 (para hariç, para meslek/döneme göre değişir); aşırı büyük tek-olay etkisi dengeyi bozar.
6. Yeni bir `etiket_ekle` kalıcı bir sistem başlatıyorsa (yeni bir "X_tamamlandi" / "X_basladi" durumu), o etiketi tüketen/kontrol eden karşı tarafı da (başka bir olayda `gerekliEtiketler` veya gameEngine'de bir zorlanan-olay kuralı) unutma — yoksa etiket "yetim" kalır.
7. `agirlik` belirtmezsen 1 sayılır; çok sık/az çıkmasını istiyorsan açıkça ayarla. `ton:"agir"` trajik/travmatik olaylara koy (art arda gelmesi otomatik azaltılır, §12).
8. Yeni olayı `data/olaylar/index.ts`'teki ilgili `OLAY_*` dizisi zaten export ediyorsa (dosya zaten `OLAY_BANKASI`'na dahilse) ekstra kayıt gerekmez — sadece dosyanın kendi dizisine ekle.
9. `npm test` çalıştır (özellikle `tagMotoru.test.ts`, `tonalDenge.test.ts`, `gameFlow.test.ts`).
