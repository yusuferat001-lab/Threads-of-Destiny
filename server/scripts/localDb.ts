/**
 * Yerel geliştirme için gömülü (portable) bir PostgreSQL sunucusu başlatır.
 *
 * Docker ya da sistem geneline PostgreSQL kurmaya gerek yok — `embedded-postgres`
 * paketi platforma uygun bir Postgres ikilisini indirir ve `server/.localdb`
 * altında bir cluster çalıştırır. Veriler kalıcıdır (persistent).
 *
 * Kullanım (ayrı bir terminalde, açık bırak):
 *   cd server && npm run db:local
 *
 * Bağlantı dizesi (server/.env):
 *   DATABASE_URL="postgresql://postgres:kader@localhost:5432/kadercarki"
 *
 * İlk çalıştırmada cluster'ı kurar + `kadercarki` veritabanını oluşturur.
 * Sonraki çalıştırmalarda sadece başlatır. Ctrl+C ile temiz kapatır.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import EmbeddedPostgres from 'embedded-postgres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databaseDir = path.resolve(__dirname, '..', '.localdb');
const DB_ADI = 'kadercarki';
const PORT = 5432;
const KULLANICI = 'postgres';
const PAROLA = 'kader';

const ilkKurulum = !existsSync(databaseDir);

const pg = new EmbeddedPostgres({
  databaseDir,
  port: PORT,
  user: KULLANICI,
  password: PAROLA,
  authMethod: 'password',
  persistent: true,
  // Windows sistem yereli (ör. "Turkish_Türkiye.1254") ASCII-dışı karakter
  // içerdiğinde initdb patlıyor — sabit, taşınabilir bir yerel kullan.
  initdbFlags: ['--locale=C', '--encoding=UTF8'],
});

async function main() {
  if (ilkKurulum) {
    console.log('[db:local] Cluster kuruluyor (ilk çalıştırma)...');
    await pg.initialise();
  }

  await pg.start();
  console.log(`[db:local] PostgreSQL çalışıyor → localhost:${PORT}`);

  if (ilkKurulum) {
    try {
      await pg.createDatabase(DB_ADI);
      console.log(`[db:local] "${DB_ADI}" veritabanı oluşturuldu.`);
    } catch (e) {
      console.error('[db:local] Veritabanı oluşturulamadı:', e);
    }
  }

  console.log(
    `[db:local] DATABASE_URL="postgresql://${KULLANICI}:${PAROLA}@localhost:${PORT}/${DB_ADI}"`,
  );
  console.log('[db:local] Kapatmak için Ctrl+C. Bu terminali açık bırak.');

  let kapaniyor = false;
  const kapat = async () => {
    if (kapaniyor) return;
    kapaniyor = true;
    console.log('\n[db:local] Kapatılıyor...');
    try {
      await pg.stop();
    } catch {
      /* zaten durmuş olabilir */
    }
    process.exit(0);
  };
  process.on('SIGINT', kapat);
  process.on('SIGTERM', kapat);
}

main().catch((e) => {
  console.error('[db:local] Başlatma hatası:', e);
  process.exit(1);
});
