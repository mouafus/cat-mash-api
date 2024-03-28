-- CreateTable
CREATE TABLE "Cat" (
    "id" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);
