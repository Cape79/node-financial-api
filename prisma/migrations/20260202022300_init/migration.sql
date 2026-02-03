-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
