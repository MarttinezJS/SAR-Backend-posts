/*
  Warnings:

  - A unique constraint covering the columns `[id_noticia_api]` on the table `Noticias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Noticias_id_noticia_api_key" ON "Noticias"("id_noticia_api");
