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
  cancelSub,
  getFeaturedNewsController,
} from "./controllers";
import { getAbsolutePath } from "./helpers/getAbsolutePath";
import { partnerRegisterSchema } from "./schemas";
import { fetchNews } from "./services/cronService";

if (!existsSync(`${getAbsolutePath()}/generated/temp`)) {
  mkdirSync(`${getAbsolutePath()}/generated/temp`);
}

const app = new Hono();

const serve = async () => {
  app.use("*", (c, next) => {
    console.info(`${c.req.path} | ${c.req.method}`);
    return next();
  });
  // app.use("/data/*", verifyToken);

  // Partners
  app.post("/partners", validateFields(partnerRegisterSchema), partnerRegister);
  app.post("/data/partners", validateAdmin, createPartner);
  app.post("/data/partners/:id/logo", validateAdmin, uploadLogo);

  app.get("/partners/active", getActivePartners);
  app.get("/data/partners", validateAdmin, getPartners);

  app.put("/data/partners/:id", validateAdmin, updatePartner);

  app.delete("/data/partners/:id/sub", validateAdmin, cancelSub);

  // Devotional
  app.post("/data/devotional", validateAdmin, devotional);

  app.get("/devotional/last", lastDevotional);
  app.get("/data/devotional", validateAdmin, getDevotionals);

  // News
  app.post("/data/news", createNew);
  app.get("/news/featured", getFeaturedNewsController);
  app.get("/news", getPaginatedNews);

  const server = Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
  });
  console.info(`Servidor corriendo en el puerto: ${server.port}`);
  fetchNews.start();
};

serve();
