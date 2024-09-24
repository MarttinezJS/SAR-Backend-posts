import { Context, Env } from "hono";
import { getAllPartners, PaginatedResp } from "../../models";
import { Partners } from "../../../generated/client";

export const getPartners = async (context: Context<Env, "", {}>) => {
  try {
    const { page: rawPage, size: rawSize } = context.req.query();
    const page = Number.parseInt(rawPage);
    const size = Number.parseInt(rawSize);
    const partners = await getAllPartners(
      Number.isNaN(page) ? 0 : page,
      Number.isNaN(size) ? 10 : size
    );
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
    const resp = partners.data as PaginatedResp<Partners>;

    if (resp.count == 0) {
      return context.json(
        {
          error: false,
          message: "No hay patrocinadores registrados",
          status: 204,
          body: resp,
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
