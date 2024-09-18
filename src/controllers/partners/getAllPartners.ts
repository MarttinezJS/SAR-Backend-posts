import { Context, Env } from "hono";
import { getAllPartners } from "../../models";

export const getPartners = async (context: Context<Env, "", {}>) => {
  try {
    const partners = await getAllPartners();
    if (partners.isError) {
      return context.json(
        {
          error: true,
          message: partners.message,
          status: partners.statusCode,
          body: partners.data,
        },
        partners.statusCode
      );
    }

    if (partners.data?.length == 0) {
      return context.json(
        {
          error: false,
          message: "No hay patrocinadores registrados",
          status: 204,
        },
        200
      );
    }
    return context.json(
      {
        error: false,
        message: "Patrocinadores",
        status: 200,
        body: partners.data,
      },
      200
    );
  } catch (error) {
    console.log(error);
  }
};
