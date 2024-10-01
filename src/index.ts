import { Hono } from "hono";
import { mkdirSync, existsSync } from "fs";
import { validateAdmin, validateFields, verifyToken } from "./middlewares";
import {
  createPartner,
  devotional,
  getDevotionals,
  lastDevotional,
  createNew,
  getPaginatedNews,
  getActivePartners,
  partnerRegister,
  getPartners,
  updatePartner,
  uploadLogo,
} from "./controllers";
import { v2 as cloudinary } from "cloudinary";
import { getAbsolutePath } from "./helpers/getAbsolutePath";
import { partnerRegisterSchema } from "./schemas";

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

  // Partners
  app.post("/partners", validateFields(partnerRegisterSchema), partnerRegister);
  app.post("/data/partners", validateAdmin, createPartner);
  app.post("/data/partners/:id/logo", validateAdmin, uploadLogo);

  app.get("/partners/active", getActivePartners);
  app.get("/data/partners", validateAdmin, getPartners);

  app.put("/data/partners/:id", validateAdmin, updatePartner);

  // Devotional
  app.post("/data/devotional", validateAdmin, devotional);

  app.get("/devotional/last", lastDevotional);
  app.get("/data/devotional", validateAdmin, getDevotionals);

  // News
  app.post("/data/news", validateAdmin, createNew);

  app.get("/news", getPaginatedNews);

  const server = Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
  });
  console.info(`Servidor corriendo en el puerto: ${server.port}`);
};

serve();
