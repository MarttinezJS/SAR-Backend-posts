import { Noticias } from "../../../generated/client";
import prismaClient from "../../helpers/prismaClient";
import { openPrisma } from "../../services";

export const saveNew = (data: Noticias) =>
  openPrisma(async () =>
    prismaClient.noticias.create({
      data,
    })
  );
