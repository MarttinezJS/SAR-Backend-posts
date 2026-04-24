import { Noticias } from "../../../generated/client";
import { getPaginatedResp } from "../../helpers/getPaginatedResp";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const getNews = (page: number, size: number) =>
  openPrisma(async () => {
    const offset = page * size;
    const count = await prismaClient.noticias.count({});
    const results = await prismaClient.noticias.findMany({
      take: size,
      skip: offset,
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdDate: "desc",
        },
      ],
    });
    return getPaginatedResp<Noticias>(page, size, results, count);
  });

export const getFeaturedNews = () =>
  openPrisma(async () => {
    const result = await prismaClient.noticias.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdDate: "desc",
      },
      take: 5,
    });
    return result;
  });
