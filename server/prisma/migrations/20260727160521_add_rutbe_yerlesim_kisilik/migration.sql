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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Score" ("bolge", "cag", "createdAt", "id", "isim", "meslek", "olum_nedeni", "para", "skor", "un", "yas") SELECT "bolge", "cag", "createdAt", "id", "isim", "meslek", "olum_nedeni", "para", "skor", "un", "yas" FROM "Score";
DROP TABLE "Score";
ALTER TABLE "new_Score" RENAME TO "Score";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
