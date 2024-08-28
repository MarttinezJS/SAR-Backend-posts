import { Devocionales } from "../../generated/client";
import prismaClient from "../helpers/prismaClient";

export const getLastDevotional = (): Promise<Devocionales> => {
  return new Promise(async (resolve, reject) => {
    try {
      await prismaClient.$connect();
    } catch (error) {
      reject(error);
    }
    try {
      const aggregate = await prismaClient.devocionales.aggregate({
        _max: {
          createdDate: true,
        },
      });

      const found = await prismaClient.devocionales.findFirst({
        where: {
          createdDate: aggregate._max.createdDate,
        },
      });
      // const found =
      //   await prismaClient.$queryRaw`select *  from "Devocionales" where fecha = (select MAX(fecha) from "Devocionales")`;
      resolve(found as Devocionales);
    } catch (error) {
      reject(error);
    } finally {
      prismaClient.$disconnect();
    }
  });
};
