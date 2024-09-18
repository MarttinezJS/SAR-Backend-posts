import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const savePartners = (imageUrl: string) =>
  openPrisma(
    async () =>
      await prismaClient.partners.create({
        data: {
          imageUrl,
        },
      })
  );
