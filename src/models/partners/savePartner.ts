import { Partners } from "../../../generated/client";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const savePartners = (imageUrl: string, data: Partners) =>
  openPrisma(async () => {
    const dateNow = new Date(Date.now());
    const subscriptionDate = dateNow;
    dateNow.setFullYear(dateNow.getFullYear() + 1);
    const expirationDate = dateNow;
    return await prismaClient.partners.create({
      data: {
        ...data,
        subscriptionDate,
        expirationDate: data.active ? expirationDate : null,
        imageUrl,
      },
    });
  });
