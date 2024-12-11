export type ResponseData<T> = T;

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ResponseDataWithPagination<T> = ResponseData<T> & {
  meta: {
    pagination: Pagination;
  };
};
