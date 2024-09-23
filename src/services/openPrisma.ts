import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "../../generated/client/runtime/library";
import prismaClient from "../helpers/prismaClient";
import { ErrorResp } from "../models";

export const openPrisma = async <T extends Array<unknown>>(
  callback: () => Promise<T>
): Promise<ErrorResp<T>> => {
  let resp: ErrorResp<T> = {
    isError: false,
    message: "",
  };
  try {
    await prismaClient.$connect();
    const data = await callback();
    resp.statusCode = data.length == 0 ? 204 : 200;
    resp.data = data;
  } catch (error: any) {
    resp = {
      isError: true,
      message: error.toString(),
      statusCode: 500,
    };
    if (error instanceof PrismaClientKnownRequestError) {
      resp = {
        isError: true,
        message: error.message,
        meta: error.meta,
        statusCode: 400,
      };
    }
    if (error instanceof PrismaClientInitializationError) {
      resp = {
        isError: true,
        message: error.message,
        meta: {
          code: error.errorCode,
        },
        statusCode: 500,
      };
    }
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientValidationError
    ) {
      resp = {
        isError: true,
        message: error.message,
        statusCode: error instanceof PrismaClientRustPanicError ? 500 : 400,
      };
    }
  } finally {
    prismaClient.$disconnect();
  }
  return resp;
};
