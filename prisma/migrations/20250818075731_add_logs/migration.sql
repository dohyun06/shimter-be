-- CreateEnum
CREATE TYPE "public"."Overcome" AS ENUM ('TRUE', 'FALSE');

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "public"."Plant" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiseaseLog" (
    "id" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "logs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overcome" "public"."Overcome" NOT NULL DEFAULT 'FALSE',
    "plantId" TEXT NOT NULL,

    CONSTRAINT "DiseaseLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Log" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plantId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DiseaseLog" ADD CONSTRAINT "DiseaseLog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Log" ADD CONSTRAINT "Log_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
