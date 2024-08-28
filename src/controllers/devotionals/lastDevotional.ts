import { Context, Env } from "hono";
import { getLastDevotional } from "../../models";

export const lastDevotional = async (context: Context<Env, "", {}>) => {
  try {
    const found = await getLastDevotional();
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
            message: "Último devocional.",
            status: 200,
            body: found.data,
          },
          200
        )
      : context.json(
          {
            error: false,
            message: "No se encontraron devocionales.",
            status: 204,
          },
          204
        );
  } catch (error) {
    console.error(error);

    return context.json(
      {
        error: true,
        message: "Error al consultar",
        status: 500,
      },
      500
    );
  }
};
