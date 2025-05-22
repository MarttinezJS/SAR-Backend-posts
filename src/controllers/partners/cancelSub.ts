import { Context, Env } from "hono";
import { modifyPartner } from "../../models";

export const cancelSub = async (
  context: Context<Env, ":id", { in: { id: number } }>
) => {
  const { id } = context.req.param();
  const parsed = Number.parseInt(id);
  if (!isNaN(parsed)) {
    const partner = await modifyPartner({ active: false }, parsed);
    if (partner.isError) {
      return context.json(
        {
          error: partner.isError,
          message: partner.message,
          status: partner.statusCode,
          body: partner.meta,
        },
        partner.statusCode
      );
    }
    return context.json(
      {
        error: false,
        message: "Suscripción cancelada",
        status: 200,
        body: partner.data,
      },
      200
    );
  } else {
    return context.json(
      {
        error: true,
        message: "El id no es válido.",
        status: 400,
      },
      400
    );
  }
};
