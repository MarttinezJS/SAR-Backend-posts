import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const getAllPartners = () =>
  openPrisma(async () => await prismaClient.partners.findMany());
