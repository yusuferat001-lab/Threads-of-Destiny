-- CreateTable
CREATE TABLE "IstemciOlayGecmisi" (
    "istemciId" TEXT NOT NULL,
    "olaylar" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IstemciOlayGecmisi_pkey" PRIMARY KEY ("istemciId")
);
