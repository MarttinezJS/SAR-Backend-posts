import { Context, Env } from "hono";
import { getNews } from "../../models";

export const getPaginatedNews = async (context: Context<Env, "", {}>) => {
  const { page: rawPage, size: rawSize } = context.req.query();
  const page = Number.parseInt(rawPage);
  const size = Number.parseInt(rawSize);
  const news = await getNews(
    Number.isNaN(page) ? 0 : page,
    Number.isNaN(size) ? 10 : size
  );
  if (news.isError) {
    return context.json(
      {
        error: true,
        message: news.message,
        status: news.statusCode,
        body: news.meta,
      },
      news.statusCode ?? 500
    );
  }
  return context.json(
    {
      error: false,
      message: "Noticias",
      status: 200,
      body: news.data,
    },
    200
  );
};
