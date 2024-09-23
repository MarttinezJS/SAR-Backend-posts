import { Partners } from "../../../generated/client";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const registerPartner = (data: Partners) =>
  openPrisma(async () =>
    prismaClient.partners.create({
      data,
    })
  );
