import { Partners } from "../../../generated/client";
import { PrismaClientValidationError } from "../../../generated/client/runtime/library";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const savePartners = (imageUrl: string | undefined, data: Partners) =>
  openPrisma(async () => {
    const found = await prismaClient.partners.findFirst({
      where: {
        OR: [
          {
            nit: data.nit,
          },
          {
            companyName: data.companyName,
          },
        ],
      },
    });

    if (found) {
      throw new PrismaClientValidationError(
        "Ya existe una empresa con ese registro",
        { clientVersion: "1" }
      );
    }
    let subscriptionDate;
    let expirationDate;
    const active = new Boolean(data.active).valueOf();
    if (active) {
      const dateNow = new Date(Date.now());
      subscriptionDate = new Date(Date.now());
      dateNow.setFullYear(dateNow.getFullYear() + 1);
      expirationDate = dateNow;
    }

    return await prismaClient.partners.create({
      data: {
        ...data,
        subscriptionDate,
        expirationDate,
        imageUrl,
        active,
      },
    });
  });
