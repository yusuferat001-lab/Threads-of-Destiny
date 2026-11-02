---
name: olay-ekle
description: Kader Çarkı olay bankasına yeni olay ekler (TR kaynak + EN çeviri aynası + test). Kullanıcı "yeni olay ekle", "şu temada olay yaz", "olay bankasına ekle" dediğinde ya da data/olaylar/*.ts dosyasına olay eklenecekse kullan.
---

# Yeni olay ekleme akışı

Ayrıntılı kural kaynağı: `CLAUDE.md` §23 kontrol listesi, `docs/referans/02-state-ve-olay-semasi.md` (§5 `SonucEtkisi`, §6 `OlayTanimi`/`OlaySecenegi`, §7 dosya haritası), `docs/referans/03-tur-motoru-ve-formuller.md` (§9 suç sınıfı kuralı). Bunları baştan sona okuma, gerektiğinde `grep -n` ile bak.

## Adımlar

1. **Hedef dosyayı seç.** `docs/referans/02-state-ve-olay-semasi.md` §7 tablosuna bak (çağ × meslek × tema). Emin değilsen `genel.ts`. Dosyayı baştan okuma: `grep -n 'id: "' server/src/data/olaylar/<dosya>.ts | tail -5` ile id önekini ve son olayı bul, son ~60 satırı örnek olarak oku.
2. **Olayı yaz** (`server/src/data/olaylar/<dosya>.ts`, dosyanın kendi `OLAY_*` dizisine ekle — `index.ts` zaten dahil ediyorsa ekstra kayıt gerekmez):
   - `id` benzersiz ve dosyadaki önek kuralına uygun (`grep -rn 'id: "<yeni_id>"' server/src/data/olaylar` ile çakışma kontrolü).
   - Uygunluk filtrelerini (`cag`, `bolgeler`, `meslekler`, `minYas/maxYas`, `gerekliEtiketler` …) dar ama gereksiz kısıtsız tut.
   - Her seçenekte `basariliSonuc.mesaj` ve `basarisizSonuc.mesaj` **zorunlu**. Stat deltaları ±5..±25 bandında (para meslek/döneme göre); pozitif `mutluluk` ≤ +12, çoğu olay mutluluğu düşürmeli ya da nötr bırakmalı (`mutlulukDengesi.test.ts` guardrail'i).
   - **Metin uzunluğu:** `metin` ≤ ~110 karakter (üst 140), şık ≤ ~32 (50), `mesaj` ≤ ~55 (80), `detay` ≤ ~35 (50), `kilitAciklamasi` ≤ 60. Dolgu/süs yok.
   - **Yasa dışı şık** yazıyorsan başarılı dala `suc_sinifi`, başarısız dala bir üst sınıf (`kucuk→orta→buyuk→agir`) yaz; açık pozitif `suc_artis` YAZMA.
   - Şıklar birbirine yakın değerde olsun (biri aşırı mantıklı ya da etkisiz kalmasın); para kazandıran şık ruhsal/ahlaki bedel taşısın.
   - Yeni `etiket_ekle` kalıcı bir sistem başlatıyorsa karşı tarafı (`gerekliEtiketler` ya da `gameEngine.ts` zorlanan-olay kuralı) da bağla.
   - Metin içi `{dost} {rakip} {es} {amir} {ekip} {bolge} {yil} {birim}` vb. placeholder'lar kullanılabilir (`§6 doldur()` listesi).
3. **İngilizce aynası:** `server/src/i18n/olaylar/<dosya>.en.ts` içinde aynı `id` ile `OlayCeviri` ekle (`baslik`, `metin`, `secenekler[]` kaynak sırasıyla birebir; çevrilmeyene `null`; placeholder'lar birebir korunur). Dosya yeni açıldıysa `server/src/i18n/olaylar/index.ts`'e import + `KAYIT` dizisine ekle. `unvan_kazan` gibi mantık alanları çevrilmez.
4. **Doğrula** (`cd server`):
   - `npx tsc --noEmit`
   - `npx tsx scripts/ceviriDurumu.ts` (sürüklenme/yetim çeviri yok mu)
   - `npx vitest run tests/tagMotoru.test.ts tests/tonalDenge.test.ts tests/mutlulukDengesi.test.ts tests/gameFlow.test.ts` (+ olayın temasına ait test dosyası, ör. `hapishane`, `yolculuk`, `sosyallesme`)
5. **Dokümantasyon:** olay sayısı/havuz hedefi değiştiyse `docs/referans/02-state-ve-olay-semasi.md` §7 tablosunu güncelle. Garantili (zorlanan) bir havuza eklediysen `docs/referans/13-garanti-sink-tema.md` §51 hedeflerini kontrol et.

## Sık hatalar

- `.en.ts` ayna dosyası olmadan olay eklemek → İngilizce oyuncuda Türkçe metin çıkar.
- `baseBasariSansi: 100` taşıyan şıkta `basarisizSonuc` erişilemez (ölü dal); kasıtlı değilse şansı 100 altına çek.
- Olay hapis/veba/yolculuk gibi bir havuz kilidine aitse ilgili `hapisOlayi`/`vebaHastasiOlayi`/`yolculukOlayi` bayrağını koy, aksi halde normal havuza karışır.
- Aynı olayı kopyalayıp bırakma: id'yi, başlığı ve metni gerçekten değiştir.
