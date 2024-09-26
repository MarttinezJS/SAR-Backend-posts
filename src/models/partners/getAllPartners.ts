import { Partners } from "../../../generated/client";
import { getPaginatedResp } from "../../helpers/getPaginatedResp";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";
import { PaginatedResp } from "../generics";

export const getAllPartners = (page: number, size: number) =>
  openPrisma<PaginatedResp<Partners>>(async () => {
    const offset = page * size;
    const count = await prismaClient.partners.count();
    const results = await prismaClient.partners.findMany({
      take: size,
      skip: offset,
    });

    return getPaginatedResp(page, size, results, count);
  });
