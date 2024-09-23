import { Hono } from "hono";
import { mkdirSync, existsSync } from "fs";
import { validateAdmin, verifyToken } from "./middlewares";
import {
  createPartner,
  devotional,
  getPartners,
  getDevotionals,
  lastDevotional,
  createNew,
  getPaginatedNews,
  getActivePartners,
} from "./controllers";
import { v2 as cloudinary } from "cloudinary";
import { getAbsolutePath } from "./helpers/getAbsolutePath";

if (!existsSync(`${getAbsolutePath()}/generated/temp`)) {
  mkdirSync(`${getAbsolutePath()}/generated/temp`);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = new Hono();

const serve = async () => {
  app.use("*", (c, next) => {
    console.info(`${c.req.path} | ${c.req.method}`);
    return next();
  });
  app.use("/data/*", verifyToken);

  app.get("/devotional/last", lastDevotional);
  app.get("/partners/active", getActivePartners);
  app.get("/news", getPaginatedNews);
  app.post("/data/devotional", validateAdmin, devotional);
  app.post("/data/partners", validateAdmin, createPartner);
  app.post("/data/news", validateAdmin, createNew);
  app.get("/data/devotional", validateAdmin, getDevotionals);

  const server = Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
  });
  console.info(`Servidor corriendo en el puerto: ${server.port}`);
};

serve();
