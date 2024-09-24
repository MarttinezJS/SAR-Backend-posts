/*
  Warnings:

  - You are about to drop the column `fecha_registro` on the `Partners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partners" DROP COLUMN "fecha_registro",
ADD COLUMN     "fecha_subscripcion" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fecha_caducidad" DROP NOT NULL;
