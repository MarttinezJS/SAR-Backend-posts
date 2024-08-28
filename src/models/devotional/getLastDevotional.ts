import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const getLastDevotional = async () =>
  await openPrisma(async () => {
    const aggregate = await prismaClient.devocionales.aggregate({
      _max: {
        createdDate: true,
      },
    });

    const found = await prismaClient.devocionales.findFirst({
      where: {
        createdDate: aggregate._max.createdDate,
      },
    });
    return found;
  });
