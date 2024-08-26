import { Hono } from "hono";
import { initVault } from "./config/initVault";

const app = new Hono();

const serve = async () => {
  await initVault();
  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });
  Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT,
  });
  console.info(`Servidor corriendo en el puerto: ${process.env.PORT}`);
};

serve();
