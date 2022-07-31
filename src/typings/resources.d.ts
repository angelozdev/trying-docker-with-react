export type TParams<T> = Partial<{
  page: number;
  limit: number;
  offset: number;
  sortBy: keyof T;
  orderBy: "asc" | "desc";
}>;
