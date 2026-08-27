-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isim" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "meslek" TEXT NOT NULL,
    "rutbe" TEXT NOT NULL DEFAULT '',
    "cag" TEXT NOT NULL,
    "bolge" TEXT NOT NULL,
    "yerlesim" TEXT NOT NULL DEFAULT '',
    "kisilik" TEXT NOT NULL DEFAULT '',
    "olum_nedeni" TEXT NOT NULL,
    "yas" INTEGER NOT NULL,
    "para" INTEGER NOT NULL,
    "un" INTEGER NOT NULL,
    "unvanlar" TEXT NOT NULL DEFAULT '',
    "efsanevi_olum" TEXT NOT NULL DEFAULT '',
    "hayat_amaci_tamamlandi" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Score" ("bolge", "cag", "createdAt", "id", "isim", "kisilik", "meslek", "olum_nedeni", "para", "rutbe", "skor", "un", "yas", "yerlesim") SELECT "bolge", "cag", "createdAt", "id", "isim", "kisilik", "meslek", "olum_nedeni", "para", "rutbe", "skor", "un", "yas", "yerlesim" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
