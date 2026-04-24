import { Context, Env } from "hono";
import { getFeaturedNews, getNews } from "../../models";
import { NewsApi } from "../../services/newsApiService";

export const getPaginatedNews = async (context: Context<Env, "", {}>) => {
  const { page: rawPage, size: rawSize } = context.req.query();
  NewsApi.searchNews();
  const page = Number.parseInt(rawPage);
  const size = Number.parseInt(rawSize);
  const news = await getNews(
    Number.isNaN(page) ? 0 : page,
    Number.isNaN(size) ? 10 : size,
  );
  if (news.isError) {
    return context.json(
      {
        error: true,
        message: news.message,
        status: news.statusCode,
        body: news.meta,
      },
      news.statusCode ?? 500,
    );
  }
  return context.json(
    {
      error: false,
      message: "Noticias",
      status: 200,
      body: news.data,
    },
    200,
  );
};

export const getFeaturedNewsController = async (
  context: Context<Env, "", {}>,
) => {
  const resp = await getFeaturedNews();

  return context.json(
    {
      error: resp.isError,
      message: resp.message,
      status: resp.statusCode,
      body: resp.data,
      meta: resp.meta,
    },
    resp.statusCode,
  );
};
