import { Context, Env } from "hono";
import { uploadImage } from "../../services";
import { modifyPartner } from "../../models";

export const updatePartner = async (context: Context<Env, "", {}>) => {
  const { image, ...body } = await context.req.parseBody();
  const id = context.req.param("id");
  if (image) {
    const { format, public_id } = await uploadImage(image as File, "partners");
    body.imageUrl = `${public_id}.${format}`;
  }
  const partner = await modifyPartner(body, Number.parseInt(id ?? ""));
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
      message: "Patrocinador modificado",
      status: 200,
      body: partner.data,
    },
    200
  );
};
