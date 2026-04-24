/*
  Warnings:

  - Added the required column `enlace` to the `Noticias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuente_enlace` to the `Noticias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuente_icono` to the `Noticias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuente_nombre` to the `Noticias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_noticia_api` to the `Noticias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noticias" ADD COLUMN     "enlace" TEXT NOT NULL,
ADD COLUMN     "fuente_enlace" TEXT NOT NULL,
ADD COLUMN     "fuente_icono" TEXT NOT NULL,
ADD COLUMN     "fuente_nombre" TEXT NOT NULL,
ADD COLUMN     "id_noticia_api" TEXT NOT NULL,
ADD COLUMN     "video_url" TEXT;

-- CreateTable
CREATE TABLE "Puntos_Url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "Puntos_Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuariosApp" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuariosApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuariosApp_dispositivo_key" ON "UsuariosApp"("dispositivo");
