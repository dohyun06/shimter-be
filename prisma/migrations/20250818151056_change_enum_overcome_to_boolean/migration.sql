/*
  Warnings:

  - The `overcome` column on the `DiseaseLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."DiseaseLog" DROP COLUMN "overcome",
ADD COLUMN     "overcome" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "public"."Overcome";
