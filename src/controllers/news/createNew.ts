import { Context, Env } from "hono";
import { NewCommand, saveNew } from "../../models";
import { uploadImage } from "../../services";
import { Noticias } from "../../../generated/client";
export const createNew = async (context: Context<Env, "", {}>) => {
  const body = await context.req.parseBody();
  const file = body.image as File;
  if (file && !file.type.includes("image")) {
    return context.json(
      {
        error: true,
        message: "Se debe subir una imagen.",
        status: 400,
      },
      400
    );
  }
  const image = file ? await uploadImage(file, "news") : null;

  const data: Partial<Noticias> = {
    abstract: body.abstract as string,
    text: body.text as string,
    title: body.title as string,
    imageUrl: image ? `${image.public_id}.${image.format}` : null,
  };
  const newResp = await saveNew(data as Noticias);
  if (newResp.isError) {
    return context.json(
      {
        error: true,
        message: newResp.message,
        status: newResp.statusCode,
        body: newResp.meta,
      },
      newResp.statusCode ?? 500
    );
  }
  return context.json(
    {
      error: false,
      message: "Noticia creada.",
      status: 200,
      body: newResp.data,
    },
    200
  );
};
