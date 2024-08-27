import { Context, Env } from "hono";

export const devotional = async (context: Context<Env, "", {}>) => {
  const body = await context.req.parseBody();
  const file = body.file as File;
  if (!file || !file.type.includes("image")) {
    return context.json(
      {
        error: true,
        message: "Se debe subir una imagen.",
        status: 400,
      },
      400
    );
  }
  console.log();

  return context.json({
    error: false,
    message: "Todo oka....",
    status: 200,
    body: body.file,
  });
};
