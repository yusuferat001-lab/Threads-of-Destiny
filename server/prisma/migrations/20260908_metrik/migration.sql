-- CreateTable
CREATE TABLE "Metrik" (
    "id" SERIAL NOT NULL,
    "tur" TEXT NOT NULL,
    "istemci_id" TEXT NOT NULL DEFAULT '',
    "oturum_id" TEXT NOT NULL DEFAULT '',
    "cag" TEXT NOT NULL DEFAULT '',
    "bolge" TEXT NOT NULL DEFAULT '',
    "yerlesim" TEXT NOT NULL DEFAULT '',
    "meslek" TEXT NOT NULL DEFAULT '',
    "yas" INTEGER NOT NULL DEFAULT 0,
    "tur_sayisi" INTEGER NOT NULL DEFAULT 0,
    "servet" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "olum_nedeni" TEXT NOT NULL DEFAULT '',
    "oturum_sn" INTEGER NOT NULL DEFAULT 0,
    "meta" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metrik_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Metrik_tur_idx" ON "Metrik"("tur");

-- CreateIndex
CREATE INDEX "Metrik_createdAt_idx" ON "Metrik"("createdAt");
