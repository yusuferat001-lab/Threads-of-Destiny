import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import path from "path";

/**
 * Testler gerçek geliştirme veritabanına (dev.db) dokunmasın diye ayrı bir
 * test.db üzerinde çalışır; her test koşusunda sıfırdan migrate edilir.
 */
export default function setup() {
  const kokDizin = path.resolve(__dirname, "..");
  const testDbYolu = path.resolve(kokDizin, "prisma", "test.db");
  if (existsSync(testDbYolu)) unlinkSync(testDbYolu);

  execSync("npx prisma migrate deploy", {
    cwd: kokDizin,
    env: { ...process.env, DATABASE_URL: "file:./test.db" },
    stdio: "inherit",
  });
}
