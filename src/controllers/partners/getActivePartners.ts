import { Context, Env } from "hono";
import { activePartners } from "../../models";

export const getActivePartners = async (context: Context<Env, "", {}>) => {
  const partners = await activePartners();
  if (partners.isError) {
    return context.json(
      {
        error: partners.isError,
        message: partners.message,
        status: partners.statusCode,
      },
      partners.statusCode
    );
  }
  return context.json(
    {
      error: false,
      message: "Anunciadores",
      status: partners.statusCode,
      body: partners.data,
    },
    200
  );
};
