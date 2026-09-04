import { defineConfig } from "vitest/config";
import path from "path";

/**
 * Testler gerçek bir veritabanı KURMAZ: `@prisma/client` bellek-içi bir stub'a
 * (tests/_prismaStub.ts) alias'lanır. Şema PostgreSQL'e taşındığında eski
 * `globalSetup` + SQLite `DATABASE_URL` yolu `prisma migrate deploy`'da patlıyor
 * ve testlerin hiçbiri koşamıyordu (bkz. tests/_prismaStub.ts başındaki not).
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@prisma\/client$/,
        replacement: path.resolve(import.meta.dirname, "tests/_prismaStub.ts"),
      },
    ],
  },
  test: {
    env: {
      DATABASE_URL: "postgresql://stub-not-used",
    },
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
