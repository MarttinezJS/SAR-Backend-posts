-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('USUARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "Evento_Estado" AS ENUM ('REALIZADO', 'PROGRAMADO', 'EN_PROCESO', 'CANCELADO', 'REPROGRAMADO');

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "correo" VARCHAR(50) NOT NULL,
    "usuario" VARCHAR(20) NOT NULL,
    "rol" "Rol" NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "cambiar_password" BOOLEAN DEFAULT false,
    "activo" BOOLEAN DEFAULT true,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partners" (
    "id" SERIAL NOT NULL,
    "imagen_url" TEXT,
    "fecha_subscripcion" TIMESTAMP(3),
    "fecha_caducidad" TIMESTAMP(3),
    "activo" BOOLEAN DEFAULT false,
    "donacion" TEXT,
    "descripcion_negocio" TEXT,
    "sitio_web" TEXT,
    "empresa" TEXT NOT NULL,
    "nit" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticias" (
    "id" SERIAL NOT NULL,
    "imagen_url" TEXT,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devocionales" (
    "id" SERIAL NOT NULL,
    "imagen_url" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Devocionales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Eventos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Evento_Estado" NOT NULL,
    "fecha_programada" TIMESTAMP(3) NOT NULL,
    "duracion_dias" INTEGER NOT NULL,

    CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario_Eventos" (
    "usuario_id" INTEGER NOT NULL,
    "evento_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_Eventos_pkey" PRIMARY KEY ("usuario_id","evento_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_correo_key" ON "Usuarios"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_usuario_key" ON "Usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_empresa_key" ON "Partners"("empresa");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_nit_key" ON "Partners"("nit");

-- CreateIndex
CREATE INDEX "user_on_event_event_id_fkey" ON "Usuario_Eventos"("evento_id");

-- AddForeignKey
ALTER TABLE "Usuario_Eventos" ADD CONSTRAINT "Usuario_Eventos_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "Eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Eventos" ADD CONSTRAINT "Usuario_Eventos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
