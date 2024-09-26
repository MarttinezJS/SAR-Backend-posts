export interface PaginatedResp<T> {
  count: number;
  next: number | undefined;
  previous: number | undefined;
  results: T[];
}
