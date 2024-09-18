import { Context, Env } from "hono";
import { uploadImage } from "../../services";
import { savePartners } from "../../models";

export const createPartner = async (context: Context<Env, "", {}>) => {
  const body = await context.req.parseBody();
  const image = body.image as File;
  try {
    const { format, public_id } = await uploadImage(image, "partners");
    const imageUrl = `${public_id}.${format}`;
    const partner = await savePartners(imageUrl);
    if (partner.isError) {
      return context.json(
        {
          error: true,
          message: partner.message,
          status: partner.statusCode,
          body: partner.data,
        },
        partner.statusCode
      );
    }
    return context.json(
      {
        error: false,
        message: "Imagen guardada",
        status: 200,
        body: partner.data,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return context.json(
      {
        error: true,
        message: "Error al subir la imagen",
        status: 500,
      },
      500
    );
  }
};
