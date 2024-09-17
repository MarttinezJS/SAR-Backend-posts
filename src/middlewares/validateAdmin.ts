import { createMiddleware } from "hono/factory";
import { decodeJwt } from "../services";

export const validateAdmin = createMiddleware(async (context, next) => {
  const authorization = context.req.header("Authorization");
  const token = authorization?.split(" ").pop();
  try {
    if (token) {
      const data = await decodeJwt(token);
      if (data.payload.data?.role == "ADMIN") {
        return next();
      }
    }
  } catch (error) {
    console.error(error);
  }
  return context.json(
    {
      error: true,
      message: "Privilegios insuficientes",
      status: 403,
    },
    403
  );
});
