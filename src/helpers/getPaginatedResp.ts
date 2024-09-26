import { PaginatedResp } from "../models";

export const getPaginatedResp = <T extends unknown>(
  page: number,
  size: number,
  results: T[],
  count: number
): PaginatedResp<T> => {
  const offset = page * size;
  return {
    count,
    next: offset + results.length < count ? page + 1 : undefined,
    previous: page > 0 ? page - 1 : undefined,
    results,
  };
};
