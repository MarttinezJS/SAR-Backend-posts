import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const getAllDevotionals = async () =>
  await openPrisma(async () => {
    const found = await prismaClient.devocionales.findMany({
      orderBy: {
        createdDate: "asc",
      },
    });
    return found;
  });
