import { Context, Env } from "hono";
import { modifyPartner } from "../../models/partners/modifyPartner";
import { uploadImage } from "../../services";

export const uploadLogo = async (context: Context<Env, "", {}>) => {
  const id = context.req.param("id") ?? "";
  const { image } = await context.req.parseBody();
  const { format, public_id } = await uploadImage(image as File, "partners");
  const partner = await modifyPartner(
    {
      imageUrl: `${public_id}.${format}`,
    },
    Number.parseInt(id)
  );
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
      message: "Patrocinador actualizado",
      status: 200,
      body: partner.data,
    },
    200
  );
};
