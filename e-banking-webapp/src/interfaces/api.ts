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

export type MetaResponse = {
  // TODO: Add meta response ( example: timestamp, version, pagination,... )
};

export type SuccessResponse<T> = {
  data: T;
  meta: MetaResponse;
};
