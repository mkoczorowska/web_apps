-- CreateTable
CREATE TABLE "Wpis" (
    "id" SERIAL NOT NULL,
    "tytul" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kategoriaId" INTEGER NOT NULL,

    CONSTRAINT "Wpis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategoria" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,

    CONSTRAINT "Kategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komentarz" (
    "id" SERIAL NOT NULL,
    "autor" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wpisId" INTEGER NOT NULL,

    CONSTRAINT "Komentarz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kategoria_nazwa_key" ON "Kategoria"("nazwa");

-- AddForeignKey
ALTER TABLE "Wpis" ADD CONSTRAINT "Wpis_kategoriaId_fkey" FOREIGN KEY ("kategoriaId") REFERENCES "Kategoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentarz" ADD CONSTRAINT "Komentarz_wpisId_fkey" FOREIGN KEY ("wpisId") REFERENCES "Wpis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
