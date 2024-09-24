/*
  Warnings:

  - A unique constraint covering the columns `[empresa]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nit]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correo` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donacion` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresa` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_caducidad` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nit` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `representante` to the `Partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partners" ADD COLUMN     "activo" BOOLEAN DEFAULT false,
ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "donacion" TEXT NOT NULL,
ADD COLUMN     "empresa" TEXT NOT NULL,
ADD COLUMN     "fecha_caducidad" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fecha_registro" TIMESTAMP(3),
ADD COLUMN     "nit" TEXT NOT NULL,
ADD COLUMN     "representante" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partners_empresa_key" ON "Partners"("empresa");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_nit_key" ON "Partners"("nit");
