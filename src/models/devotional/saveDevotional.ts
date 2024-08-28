import { Devocionales } from "../../../generated/client";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const saveDevotional = async (devotional: Devocionales) =>
  await openPrisma(async () => {
    const found = await prismaClient.devocionales.create({
      data: devotional,
    });
    return found;
  });
