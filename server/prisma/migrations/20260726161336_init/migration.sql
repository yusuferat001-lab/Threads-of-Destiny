-- CreateTable
CREATE TABLE "Score" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isim" TEXT NOT NULL,
    "skor" INTEGER NOT NULL,
    "meslek" TEXT NOT NULL,
    "cag" TEXT NOT NULL,
    "bolge" TEXT NOT NULL,
    "olum_nedeni" TEXT NOT NULL,
    "yas" INTEGER NOT NULL,
    "para" INTEGER NOT NULL,
    "un" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
