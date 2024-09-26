import { StatusCode } from "hono/utils/http-status";

export interface ErrorResp<T> {
  message: string;
  isError: boolean;
  meta?: Record<string, unknown>;
  data?: T[] | T;
  statusCode?: StatusCode;
}
