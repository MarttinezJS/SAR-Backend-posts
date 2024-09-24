import { Partners } from "../../../generated/client";
import { PrismaClientValidationError } from "../../../generated/client/runtime/library";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const registerPartner = (data: Partners) =>
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
        "Ya existe un registro con el mismo nombre de la empresa o mismo NIT.",
        { clientVersion: "1" }
      );
    }
    return prismaClient.partners.create({
      data,
    });
  });
