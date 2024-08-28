import { Context, Env } from "hono";
import { uploadImage } from "../../services";
import { saveDevotional } from "../../models";
import { Devocionales } from "../../../generated/client";

export const devotional = async (context: Context<Env, "", {}>) => {
  const body = await context.req.parseBody();
  const file = body.file as File;
  if (!file || !file.type.includes("image")) {
    return context.json(
      {
        error: true,
        message: "Se debe subir una imagen.",
        status: 400,
      },
      400
    );
  }

  try {
    const { format, public_id } = await uploadImage(file, "devotional");
    const data = { imageUrl: `${public_id}.${format}` };

    const found = await saveDevotional(data as Devocionales);
    if (found.isError) {
      return context.json(
        {
          error: true,
          message: found.message,
          status: found.statusCode,
          body: found.meta,
        },
        found.statusCode ?? 500
      );
    }
    return context.json({
      error: false,
      message: "Devocional guardado",
      status: 200,
      body: found.data,
    });
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
