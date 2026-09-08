/**
 * Tek seferlik doğrulama: oyun ortasında dil değişince olay metinleri de
 * İngilizceye geçiyor mu? (POST /:id/dil -> oturumDiliAyarla -> senaryoUret)
 *
 *   npx tsx scripts/verifyDilDegisimi.ts
 */
import "./_simPrismaStub";
import { yeniOyun, mesleğiAta, senaryoUret, oturumDiliAyarla, stateGetir } from "../src/game/gameEngine";

// Latince harf oranı yüksekse "büyük olasılıkla İngilizce" kabul et (kaba sezgi).
function ingilizceMi(s: string): boolean {
  const turkce = (s.match(/[çğıöşüÇĞİÖŞÜ]/g) ?? []).length;
  return turkce === 0;
}

async function main() {
  const s0 = await yeniOyun("Orta Çağ", "Fransa", "sehir_merkezi", "DilTest", "tr");
  await mesleğiAta(s0.id, "Asker");

  const trSenaryo = await senaryoUret(s0.id);
  console.log("== TR başladı ==");
  console.log("dil:", (await stateGetir(s0.id)).dil);
  console.log("başlık:", trSenaryo.olay_basligi);
  console.log("metin :", trSenaryo.olay_metni.slice(0, 90));
  console.log("şık[0]:", trSenaryo.secenekler[0]?.metin);

  // --- Oyun ortasında İngilizceye geç ---
  const guncel = await oturumDiliAyarla(s0.id, "en");
  console.log("\n== oturumDiliAyarla('en') sonrası state.dil:", guncel.dil, "==");

  // Birkaç senaryo çek; zorlanan/çevirisiz olaya denk gelme ihtimaline karşı örnekle.
  let ingSayac = 0;
  const ornekler: string[] = [];
  for (let i = 0; i < 6; i++) {
    const sen = await senaryoUret(s0.id);
    const birlesik = `${sen.olay_basligi} | ${sen.secenekler.map((x) => x.metin).join(" / ")}`;
    ornekler.push(birlesik);
    if (ingilizceMi(birlesik)) ingSayac++;
  }
  console.log("\n== EN'e geçtikten sonra 6 senaryo örneği ==");
  ornekler.forEach((o, i) => console.log(`${i + 1}. ${o.slice(0, 120)}`));

  const trDil = (await stateGetir(s0.id)).dil;
  console.log("\n--- SONUÇ ---");
  console.log("state.dil kalıcı mı 'en':", trDil === "en" ? "EVET" : "HAYIR");
  console.log(`İngilizce görünen örnek: ${ingSayac}/6`);
  if (trDil === "en" && ingSayac >= 5) {
    console.log("✅ GEÇTİ: dil değişimi olay metinlerine yansıyor.");
    process.exit(0);
  } else {
    console.log("❌ KALDI.");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
