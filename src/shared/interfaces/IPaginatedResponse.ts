interface IPaginatedResponse<T> {
  page: number;
  limit: number;
  results: T[];
  total: number;
}

export { IPaginatedResponse };
