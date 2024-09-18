import { Context, Env } from "hono";
import { getNews } from "../../models";

export const getPaginatedNews = async (context: Context<Env, "", {}>) => {
  const { page, size } = context.req.query();
  const news = await getNews(
    Number.parseInt(page) ?? 0,
    Number.parseInt(size) ?? 10
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
