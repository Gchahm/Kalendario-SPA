export interface ListResult<R> {
  count: number;
  next: string;
  previous: string;
  results: R[];
}
