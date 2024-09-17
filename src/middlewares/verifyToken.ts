import { decodeJwt } from "../services";
import { createMiddleware } from "hono/factory";

export const verifyToken = createMiddleware(async (c, next) => {
  const authorization = c.req.header("Authorization");
  let pass = false;
  try {
    const token = authorization?.split(" ").pop();

    if (token != null && (await decodeJwt(token)) != null) {
      pass = true;
    }
  } catch (error: any) {
    console.warn(error.toString());
    pass = false;
  }
  if (!pass) {
    return c.json(
      {
        error: true,
        status: 401,
        message: "Usuario no autorizado",
      },
      401
    );
  }
  await next();
});
