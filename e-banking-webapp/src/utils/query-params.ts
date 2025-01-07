// Interfaces
import { IAccount, QueryParams } from '@/interfaces';

/**
 * Handlers to process specific keys in query parameters.
 */
const queryParamHandlers: Partial<
  Record<
    keyof QueryParams,
    (
      value: unknown,
      queryString: URLSearchParams,
      queryParams: QueryParams,
    ) => void
  >
> = {
  order: (value, queryString, queryParams) => {
    if (queryParams.sort && typeof value === 'string') {
      queryString.append('sort', `${queryParams.sort}:${value}`);
    }
  },
  sort: (value, queryString, queryParams) => {
    if (!queryParams.order && typeof value === 'string') {
      queryString.append('sort', value);
    }
  },
  filters: (value, queryString) => {
    if (value && typeof value === 'object') {
      Object.entries(value as NonNullable<QueryParams['filters']>).forEach(
        ([field, operators]) => {
          Object.entries(operators).forEach(([operator, filterValue]) => {
            queryString.append(
              `filters[${field}][${operator}]`,
              String(filterValue),
            );
          });
        },
      );
    }
  },
  populate: (value, queryString) => {
    if (Array.isArray(value)) {
      queryString.append('populate', value.join(','));
    } else if (typeof value === 'string') {
      queryString.append('populate', value);
    }
  },
  fields: (value, queryString) => {
    if (Array.isArray(value)) {
      queryString.append('fields', value.join(','));
    }
  },
  pagination: (value, queryString) => {
    if (value && typeof value === 'object') {
      Object.entries(value as NonNullable<QueryParams['pagination']>).forEach(
        ([key, pageValue]) => {
          queryString.append(`pagination[${key}]`, String(pageValue));
        },
      );
    }
  },
  search: (value, queryString) => {
    if (typeof value === 'string') {
      queryString.append('search', value);
    }
  },
};

/**
 * Formats query parameters into a query string suitable for Strapi v4.
 * @param queryParams - The query parameters to format.
 * @returns - A formatted query string.
 *
 * @example
 * // Basic usage with sort and order
 * formatQueryParams({
 *   sort: 'createdAt',
 *   order: 'desc',
 * });
 * // Returns: "sort=createdAt:desc"
 */
export const formatQueryParams = (queryParams?: QueryParams): string => {
  if (!queryParams) return '';

  const queryString = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    const handler = queryParamHandlers[key as keyof QueryParams];
    if (handler) {
      handler(value, queryString, queryParams);
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      queryString.append(key, String(value));
    }
  });

  return queryString.toString();
};

/**
 * Formats account ids into a query string suitable for Strapi v4.
 * @param accounts - An array of Ids to format.
 * @returns - A formatted query string.
 */
export const formatQueryParamsFromAccounts = (accounts: IAccount[]) =>
  accounts
    ?.map(
      (account: { documentId: string }) =>
        `[filters][account][documentId][$containsi]=${account.documentId}`,
    )
    .join('&');
