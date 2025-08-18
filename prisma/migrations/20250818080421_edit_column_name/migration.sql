/*
  Warnings:

  - You are about to drop the column `logs` on the `DiseaseLog` table. All the data in the column will be lost.
  - Added the required column `description` to the `DiseaseLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DiseaseLog" DROP COLUMN "logs",
ADD COLUMN     "description" TEXT NOT NULL;
