import { Context, Env } from "hono";
import { getAllDevotionals } from "../../models";

export const getDevotionals = async (context: Context<Env, "", {}>) => {
  const found = await getAllDevotionals();
  if (found.isError) {
    return context.json(
      {
        error: true,
        message: found.message,
        status: found.statusCode,
        body: found.meta,
      },
      found.statusCode ?? 500
    );
  }
  return found.data
    ? context.json(
        {
          error: false,
          message: "Devocionales",
          status: 200,
          body: found.data,
        },
        200
      )
    : context.json(
        {
          error: false,
          message: "No se encontraron devocionales",
          status: 204,
        },
        204
      );
};
