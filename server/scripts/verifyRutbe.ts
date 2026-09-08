/**
 * 2026-08 rütbe reformu için hızlı davranış doğrulaması (npm test şu an PostgreSQL
 * geçişi yüzünden çalışmadığından bağımsız bir kontrol). Stub'lı gameEngine +
 * saf stateManager fonksiyonlarını kullanır.
 *
 * Kullanım: npx tsx scripts/verifyRutbe.ts
 */
import "./_simPrismaStub";

import { createCharacter, mesleğiSec, rutbeGuncelle, hesaplaMaasYillik } from "../src/game/stateManager";
import { yeniOyun, mesleğiAta, kotuIsYap, stateGetir } from "../src/game/gameEngine";

let gecti = 0;
let kaldi = 0;
function kontrol(ad: string, kosul: boolean): void {
  if (kosul) {
    gecti++;
    console.log(`  ✓ ${ad}`);
  } else {
    kaldi++;
    console.log(`  ✗ ${ad}`);
  }
}

async function main(): Promise<void> {
  console.log("1) Başlangıç durumu");
  const s = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
  mesleğiSec(s, "Asker");
  kontrol("yeni karakter seviye 1", s.rutbe_seviye === 1);
  kontrol("kariyer_puani 0", s.kariyer_puani === 0);
  kontrol("son_terfi_yili = baslangic_yili", s.son_terfi_yili === s.baslangic_yili);

  console.log("\n2) Kariyer puanı + ün yeterli olunca seviye 2 (cooldown 0)");
  s.kariyer_puani = 20;
  s.un = 40;
  rutbeGuncelle(s);
  kontrol("seviye 2'ye çıktı", s.rutbe_seviye === 2);
  kontrol("unvan 'Onbaşı'", s.rutbe === "Onbaşı");
  kontrol("son_terfi_yili güncellendi", s.son_terfi_yili === s.yil);
  const s2Yili = s.yil;

  console.log("\n3) Cooldown: puan fazlasıyla dolsa bile hemen seviye 3'e çıkamaz");
  s.kariyer_puani = 999;
  s.un = 100;
  rutbeGuncelle(s); // aynı yıl, S3 cooldown = 3
  kontrol("hâlâ seviye 2 (cooldown dolmadı)", s.rutbe_seviye === 2);
  s.yil = s2Yili + 3;
  rutbeGuncelle(s);
  kontrol("3 yıl sonra seviye 3'e çıktı", s.rutbe_seviye === 3);

  console.log("\n4) Çağrı başına en fazla +1 kademe");
  s.yil += 20; // tüm cooldownlar fazlasıyla aşıldı
  rutbeGuncelle(s);
  kontrol("tek çağrıda 3→4 (5'e atlamadı)", s.rutbe_seviye === 4);
  s.yil += 20;
  rutbeGuncelle(s);
  kontrol("bir sonraki çağrıda 4→5", s.rutbe_seviye === 5);

  console.log("\n5) Ratchet: kariyer_puani ve stat çökse bile rütbe düşmez");
  s.kariyer_puani = 0;
  s.un = 0;
  s.ahlak = 0;
  rutbeGuncelle(s);
  kontrol("hâlâ seviye 5", s.rutbe_seviye === 5);
  kontrol("en üst kademede amir yok", s.amir_adi === null);
  kontrol("seviye 5'te 4 ast", s.astlar.length === 4);

  console.log("\n6) Maaş rütbeyle artar");
  const t = createCharacter("Orta Çağ", "Fransa", "sehir_merkezi");
  mesleğiSec(t, "Tüccar");
  t.un = 50;
  const maasS1 = hesaplaMaasYillik(t);
  t.rutbe_seviye = 3;
  const maasS3 = hesaplaMaasYillik(t);
  t.rutbe_seviye = 5;
  const maasS5 = hesaplaMaasYillik(t);
  kontrol(`S1 (${maasS1}) < S3 (${maasS3})`, maasS3 > maasS1);
  kontrol(`S3 (${maasS3}) < S5 (${maasS5})`, maasS5 > maasS3);

  console.log("\n7) Rakip hedefleyen karanlık iş kariyer puanını artırır (motor entegrasyonu)");
  const g = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi");
  await mesleğiAta(g.id, "Tüccar");
  g.para = 5000;
  let oncePuan = g.kariyer_puani;
  let denemeArtti = false;
  for (let i = 0; i < 40 && !denemeArtti; i++) {
    await kotuIsYap(g.id, "rakibi_dov");
    const s = await stateGetir(g.id);
    if (s.kariyer_puani > oncePuan) denemeArtti = true;
    oncePuan = s.kariyer_puani;
  }
  kontrol(`karanlık iş başarısı sonrası kariyer_puani en az bir kez arttı`, denemeArtti);

  console.log(`\nSonuç: ${gecti} geçti, ${kaldi} kaldı.`);
  process.exit(kaldi > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
