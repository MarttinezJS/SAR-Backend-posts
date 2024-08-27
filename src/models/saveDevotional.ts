import { Devocionales } from "../../generated/client";
import prismaClient from "../helpers/prismaClient";

export const saveDevotional = (devotional: Devocionales) => {
  return new Promise(async (resolve, reject) => {
    try {
      await prismaClient.$connect();
    } catch (error) {
      reject(error);
    }
    try {
      const found = await prismaClient.devocionales.create({
        data: devotional,
      });
      resolve(found);
    } catch (error) {
      reject(error);
    } finally {
      prismaClient.$disconnect();
    }
  });
};
