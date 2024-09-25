import { Partners } from "../../../generated/client";
import { PrismaClientValidationError } from "../../../generated/client/runtime/library";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const modifyPartner = (data: Partial<Partners>, id: number) =>
  openPrisma(async () => {
    const found = prismaClient.partners.findFirst({
      where: {
        id,
      },
    });
    if (!found) {
      throw new PrismaClientValidationError(
        "El registro de patrocinador no existe.",
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
    return prismaClient.partners.update({
      data: { ...data, id, subscriptionDate, expirationDate, active },
      where: {
        id,
      },
    });
  });
