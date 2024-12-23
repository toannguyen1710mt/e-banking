type FilterOperator =
  | '$eq'
  | '$ne'
  | '$in'
  | '$notIn'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContains'
  | '$null'
  | '$notNull'
  | '$between'
  | '$startsWith'
  | '$endsWith';

type FilterValue = string | number | boolean | null | (string | number)[];

type Filters = {
  [key: string]: {
    [operator in FilterOperator]?: FilterValue;
  };
};

export interface QueryParams {
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: Filters;
  populate?: string | string[];
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  search?: string;
}
