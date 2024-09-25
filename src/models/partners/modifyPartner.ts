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
    return prismaClient.partners.update({
      data: { ...data, id },
      where: {
        id,
      },
    });
  });
