-- AlterTable
ALTER TABLE "Noticias" ALTER COLUMN "enlace" DROP NOT NULL,
ALTER COLUMN "fuente_enlace" DROP NOT NULL,
ALTER COLUMN "fuente_icono" DROP NOT NULL,
ALTER COLUMN "id_noticia_api" DROP NOT NULL;
