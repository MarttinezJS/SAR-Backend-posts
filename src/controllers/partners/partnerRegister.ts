import { Context, Env } from "hono";
import { registerPartner } from "../../models";

export const partnerRegister = async (context: Context<Env, "", {}>) => {
  const data = await context.req.json();
  const partner = await registerPartner(data);
  if (partner.isError) {
    return context.json(
      {
        error: partner.isError,
        message: partner.message,
        status: partner.statusCode,
      },
      partner.statusCode
    );
  }
  return context.json(
    {
      error: false,
      message: "Solicitud registrada",
      status: 200,
      body: partner.data,
    },
    200
  );
};
