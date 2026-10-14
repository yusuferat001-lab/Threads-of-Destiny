/**
 * Yerel deneme girişi: PostgreSQL GEREKTİRMEZ. Prisma bellek-içi bir taklitle değiştirilir
 * (simülasyon script'leriyle aynı yöntem). Sunucu kapanınca oyunlar ve skorlar silinir.
 * Kullanım: npm run dev:bellek (server klasöründe) — ya da kökteki yerel-baslat betikleri.
 */
import "./_simPrismaStub";

process.env.DATABASE_URL ??= "postgresql://yerel:yerel@localhost:5432/yerel";
process.env.PORT ??= "3001";
process.env.CORS_ORIGIN ??= "http://localhost:5180";

console.log("🧪 Bellek-içi mod: ilerleme sunucu kapanınca silinir, skor tablosu kalıcı değildir.");
require("../src/server");
