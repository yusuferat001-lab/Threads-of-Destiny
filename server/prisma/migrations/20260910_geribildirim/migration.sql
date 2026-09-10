-- CreateTable
CREATE TABLE "GeriBildirim" (
    "id" TEXT NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'diger',
    "mesaj" TEXT NOT NULL,
    "iletisim" TEXT,
    "baglam" TEXT NOT NULL DEFAULT '{}',
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeriBildirim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeriBildirim_createdAt_idx" ON "GeriBildirim"("createdAt");
