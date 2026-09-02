/**
 * Simülasyon için bellek-içi Prisma taklidi.
 *
 * Depo, canlı olarak SQLite'tan PostgreSQL'e taşınıyor (schema.prisma provider =
 * "postgresql"), bu yüzden eski `DATABASE_URL="file:./simulation.db"` yolu artık
 * çalışmıyor — üretilen Prisma client Postgres'e bağlanmaya çalışır ve bir sunucu
 * olmadan patlar. Simülasyonun kalıcılığa ihtiyacı yok: `gameEngine.ts` tek bir
 * process içinde `oturumlar` Map'ini otorite olarak kullanır (bkz. §2), DB yazımları
 * ateşle-unut, DB okumaları yalnızca cache-miss'te olur ve simülasyonda hiç olmaz.
 *
 * Bu modül, `../src/db/prismaClient`'i (hem sessionRepository hem scoreRepository'nin
 * import ettiği TEK nokta) require.cache üzerinden no-op bir sahte ile değiştirir.
 * Ana simülasyon dosyasının EN ÜSTÜNDE, gameEngine import edilmeden ÖNCE
 * `import "./_simPrismaStub";` olarak çağrılmalıdır (tsx yan-etki import sırasını korur).
 */
import Module from "module";
import path from "path";

const sessionlar = new Map<string, { id: string; data: string; aktif: boolean; updatedAt: Date }>();

const sahtePrisma = {
  session: {
    async upsert({ where, create, update }: any) {
      const varOlan = sessionlar.get(where.id);
      if (varOlan) {
        Object.assign(varOlan, update, { updatedAt: new Date() });
        return varOlan;
      }
      const yeni = { id: create.id, data: create.data, aktif: create.aktif ?? true, updatedAt: new Date() };
      sessionlar.set(yeni.id, yeni);
      return yeni;
    },
    async findUnique({ where }: any) {
      return sessionlar.get(where.id) ?? null;
    },
    async findMany({ where }: any = {}) {
      let hepsi = [...sessionlar.values()];
      if (where && typeof where.aktif === "boolean") hepsi = hepsi.filter((s) => s.aktif === where.aktif);
      return hepsi;
    },
    async deleteMany({ where }: any = {}) {
      let silinecek = [...sessionlar.values()];
      if (where && where.id) silinecek = silinecek.filter((s) => s.id === where.id);
      if (where && typeof where.aktif === "boolean") silinecek = silinecek.filter((s) => s.aktif === where.aktif);
      for (const s of silinecek) sessionlar.delete(s.id);
      return { count: silinecek.length };
    },
  },
  score: {
    async create({ data }: any) {
      return { id: Math.floor(Math.random() * 1e9), ...data };
    },
    async findMany() {
      return [];
    },
  },
  async $queryRawUnsafe() {
    return [];
  },
  async $executeRawUnsafe() {
    return 0;
  },
  async $connect() {
    /* no-op */
  },
  async $disconnect() {
    /* no-op */
  },
};

const sahteModulIcerigi = { prisma: sahtePrisma };

// 1) require.cache'i doğrudan tohumla (birincil yol).
try {
  const cozulmus = require.resolve(path.join(__dirname, "..", "src", "db", "prismaClient"));
  require.cache[cozulmus] = {
    id: cozulmus,
    filename: cozulmus,
    loaded: true,
    exports: sahteModulIcerigi,
    children: [],
    paths: [],
    parent: null,
  } as unknown as NodeModule;
} catch {
  /* tsx farklı çözebilir; aşağıdaki _load kancası yakalar */
}

// 2) Module._load kancası (kemer + askı): yolu "db/prismaClient" ile biten (uzantılı
//    ya da uzantısız) her require isteğini sahte içerikle karşıla.
const anyModule = Module as unknown as { _load: (...a: unknown[]) => unknown };
const orijinalLoad = anyModule._load;
anyModule._load = function (istek: unknown, ...kalan: unknown[]) {
  if (typeof istek === "string") {
    const normal = istek.replace(/\\/g, "/").replace(/\.[tj]s$/, "");
    if (normal.endsWith("db/prismaClient")) return sahteModulIcerigi;
  }
  return orijinalLoad.call(this, istek, ...kalan);
};

export {};
