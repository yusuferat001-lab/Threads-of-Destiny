-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "isim" TEXT NOT NULL,
    "skor" DOUBLE PRECISION NOT NULL,
    "meslek" TEXT NOT NULL,
    "rutbe" TEXT NOT NULL DEFAULT '',
    "cag" TEXT NOT NULL,
    "bolge" TEXT NOT NULL,
    "yerlesim" TEXT NOT NULL DEFAULT '',
    "kisilik" TEXT NOT NULL DEFAULT '',
    "olum_nedeni" TEXT NOT NULL,
    "yas" INTEGER NOT NULL,
    "para" DOUBLE PRECISION NOT NULL,
    "un" INTEGER NOT NULL,
    "unvanlar" TEXT NOT NULL DEFAULT '',
    "efsanevi_olum" TEXT NOT NULL DEFAULT '',
    "hayat_amaci_tamamlandi" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_aktif_idx" ON "Session"("aktif");

