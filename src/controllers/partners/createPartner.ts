import { Context, Env } from "hono";
import { uploadImage } from "../../services";

export const createPartner = async (context: Context<Env, "", {}>) => {
  const body = await context.req.parseBody();
  const image = body.image as File;
  try {
    const { format, public_id } = await uploadImage(image, "partners");
    const data = { imageUrl: `${public_id}.${format}` };
    return context.json(
      {
        error: false,
        message: "Imagen guardada",
        status: 200,
        body: data,
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
