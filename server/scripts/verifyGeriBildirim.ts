/**
 * `geriBildirimTemizle` saf fonksiyonunun hızlı doğrulaması.
 * `npm test` PostgreSQL geçişinde kırık olduğu için bağımsız çalıştırılır:
 *   npx tsx scripts/verifyGeriBildirim.ts
 */
import { geriBildirimTemizle } from "../src/routes/geriBildirim.routes";

let gecti = 0;
let kaldi = 0;

function bekle(ad: string, kosul: boolean) {
  if (kosul) {
    gecti++;
    console.log(`  ✓ ${ad}`);
  } else {
    kaldi++;
    console.log(`  ✗ ${ad}`);
  }
}

// 1) Geçerli gövde
const s1 = geriBildirimTemizle({
  kategori: "oneri",
  mesaj: "  Harika bir oyun, sesli anlatım olsa süper olur.  ",
  iletisim: "  test@example.com  ",
  baglam: { cag: "Orta Çağ", surum: "1.0.0" },
});
bekle("geçerli gövde ok:true döner", s1.ok === true);
if (s1.ok) {
  bekle("mesaj trim'lenir", s1.kayit.mesaj === "Harika bir oyun, sesli anlatım olsa süper olur.");
  bekle("iletişim trim'lenir", s1.kayit.iletisim === "test@example.com");
  bekle("kategori korunur", s1.kayit.kategori === "oneri");
  bekle("bağlam taşınır", (s1.kayit.baglam as Record<string, unknown>).surum === "1.0.0");
  bekle("id üretilir", typeof s1.kayit.id === "string" && s1.kayit.id.length > 10);
}

// 2) Çok kısa mesaj
const s2 = geriBildirimTemizle({ kategori: "hata", mesaj: "hi" });
bekle("çok kısa mesaj reddedilir", s2.ok === false && !("sessiz" in s2 && s2.sessiz));

// 3) Bal küpü dolu → sessiz ret
const s3 = geriBildirimTemizle({ mesaj: "gerçek mesaj burada", sirket: "SpamCo" });
bekle("bal küpü dolu → sessiz ret", s3.ok === false && "sessiz" in s3 && s3.sessiz === true);

// 4) Bilinmeyen kategori → "diger"
const s4 = geriBildirimTemizle({ kategori: "reklam", mesaj: "bir şeyler yaz buraya" });
bekle("bilinmeyen kategori 'diger'e düşer", s4.ok === true && s4.kayit.kategori === "diger");

// 5) Uzun mesaj kırpılır
const s5 = geriBildirimTemizle({ kategori: "diger", mesaj: "x".repeat(5000) });
bekle("uzun mesaj 2000'e kırpılır", s5.ok === true && s5.kayit.mesaj.length === 2000);

// 6) Bağlamdaki uzun string alanları kırpılır
const s6 = geriBildirimTemizle({
  kategori: "diger",
  mesaj: "bağlam testi mesajı",
  baglam: { userAgent: "u".repeat(1000) },
});
bekle(
  "bağlam string değeri 300'e kırpılır",
  s6.ok === true && ((s6.kayit.baglam as Record<string, string>).userAgent?.length ?? 0) === 300
);

console.log(`\n${gecti} geçti, ${kaldi} kaldı.`);
process.exit(kaldi === 0 ? 0 : 1);
