import { Context, Env } from "hono";
import { uploadImage } from "../../services";
import { savePartners } from "../../models";

export const createPartner = async (context: Context<Env, "", {}>) => {
  const { image, ...body } = await context.req.parseBody();
  try {
    const { format, public_id } = await uploadImage(image as File, "partners");
    const imageUrl = `${public_id}.${format}`;
    const partner = await savePartners(imageUrl, body as any);
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
