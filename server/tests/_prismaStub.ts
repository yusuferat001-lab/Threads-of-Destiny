/**
 * Testler için bellek-içi Prisma taklidi.
 *
 * Depo SQLite'tan PostgreSQL'e taşındığından (schema.prisma provider =
 * "postgresql") eski `globalSetup` + `DATABASE_URL="file:./test.db"` yolu artık
 * `prisma migrate deploy`'da patlıyordu ve testlerin HİÇBİRİ koşamıyordu.
 *
 * Testlerin gerçek bir DB'ye ihtiyacı yok: gameEngine tek process içinde
 * `oturumlar` Map'ini otorite olarak kullanır, DB yazımı ateşle-unut, DB okuması
 * yalnız cache-miss'te olur. Bu modül `vitest.config.mts` içinde `@prisma/client`
 * alias'ı olarak kullanılır — `db/prismaClient.ts` bunun `PrismaClient`'ını alır.
 *
 * (Gerçek bir test PostgreSQL'ine geçilirse: bu alias'ı kaldır, globalSetup'ı
 * postgres'e migrate edecek şekilde geri getir.)
 */
const sessionlar = new Map<string, { id: string; data: string; aktif: boolean; updatedAt: Date }>();

export class PrismaClient {
  session = {
    upsert: async ({ where, create, update }: any) => {
      const v = sessionlar.get(where.id);
      if (v) {
        Object.assign(v, update, { updatedAt: new Date() });
        return v;
      }
      const y = { id: create.id, data: create.data, aktif: create.aktif ?? true, updatedAt: new Date() };
      sessionlar.set(y.id, y);
      return y;
    },
    findUnique: async ({ where }: any) => sessionlar.get(where.id) ?? null,
    findMany: async ({ where }: any = {}) => {
      let h = [...sessionlar.values()];
      if (where && typeof where.aktif === "boolean") h = h.filter((s) => s.aktif === where.aktif);
      return h;
    },
    deleteMany: async ({ where }: any = {}) => {
      let s = [...sessionlar.values()];
      if (where?.id) s = s.filter((x) => x.id === where.id);
      if (where && typeof where.aktif === "boolean") s = s.filter((x) => x.aktif === where.aktif);
      for (const x of s) sessionlar.delete(x.id);
      return { count: s.length };
    },
  };
  score = {
    create: async ({ data }: any) => ({ id: Math.floor(Math.random() * 1e9), ...data }),
    findMany: async () => [] as any[],
  };
  $queryRawUnsafe = async () => [] as any[];
  $executeRawUnsafe = async () => 0;
  $connect = async () => {};
  $disconnect = async () => {};
}

export default { PrismaClient };
