/**
 * Artık no-op. Testler bellek-içi Prisma stub'ı ile koşuyor (vitest.config.mts →
 * resolve.alias `@prisma/client` → tests/_prismaStub.ts); gerçek bir test DB'si
 * kurulmuyor. Eskiden burada `prisma migrate deploy` `DATABASE_URL="file:./test.db"`
 * ile çalışıyordu, ama şema PostgreSQL'e taşınınca bu adım her koşuda P1012 ile
 * patlayıp tüm test paketini çökertiyordu.
 *
 * Gerçek bir test PostgreSQL'ine geçilirse: alias'ı kaldır, buraya migrate adımını
 * postgres bağlantısıyla geri getir, config'e globalSetup: "./tests/globalSetup.ts" ekle.
 */
export default function setup(): void {
  /* no-op */
}
