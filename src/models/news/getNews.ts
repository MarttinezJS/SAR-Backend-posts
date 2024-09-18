import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const getNews = (page: number, size: number) =>
  openPrisma(async () => {
    const offset = page * size;
    const count = await prismaClient.noticias.count({});
    const results = await prismaClient.noticias.findMany({
      take: size,
      skip: offset,
    });
    return {
      count,
      next: offset + results.length < count ? page + 1 : undefined,
      previous: page > 0 ? page - 1 : undefined,
      results,
    };
  });
