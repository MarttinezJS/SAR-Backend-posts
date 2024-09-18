/*
  Warnings:

  - Added the required column `resumen` to the `Noticias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noticias" ADD COLUMN     "resumen" TEXT NOT NULL;
