import { Context, Env } from "hono";
import { getLastDevotional } from "../models";

export const lastDevotional = async (context: Context<Env, "", {}>) => {
  try {
    const found = await getLastDevotional();
    return context.json(
      {
        error: false,
        message: "Último devocional.",
        status: 200,
        body: found,
      },
      200
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
