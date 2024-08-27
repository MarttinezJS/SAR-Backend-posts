import { Hono } from "hono";
import { initVault } from "./config/initVault";
import { validateAdmin, verifyToken } from "./middlewares";
import { devotional } from "./controllers";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = new Hono();

const serve = async () => {
  await initVault();

  app.use("*", (c, next) => {
    console.info(`${c.req.path} | ${c.req.method}`);
    return next();
  });
  app.use("*", verifyToken);

  app.post("/devotional", validateAdmin, devotional);

  Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
  });
  console.info(`Servidor corriendo en el puerto: ${process.env.PORT}`);
};

serve();
