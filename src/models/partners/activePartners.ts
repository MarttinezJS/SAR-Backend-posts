import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const activePartners = () =>
  openPrisma(async () =>
    prismaClient.partners.findMany({
      where: {
        active: true,
      },
    })
  );
