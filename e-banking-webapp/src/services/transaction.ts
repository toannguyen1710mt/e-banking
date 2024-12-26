// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { ITransaction, QueryParams, SuccessResponse } from '@/interfaces';

// Services
import { httpClient } from '@/services';

// Utils
import { formatQueryParams } from '@/utils/query-params';

/**
 * Fetches transactions with optional query parameters.
 * @param queryParams - Query parameters to filter, sort, or search transactions.
 * @returns A list of transactions.
 */
export const getTransactions = async (
  queryParams?: QueryParams,
): Promise<ITransaction[]> => {
  const queryString = formatQueryParams(queryParams);

  const response = await httpClient.get<SuccessResponse<ITransaction[]>>(
    `${API_ENDPOINTS.TRANSACTIONS}${queryString ? `?${queryString}` : ''}`,
    {
      next: {
        tags: [API_ENDPOINTS.TRANSACTIONS],
      },
    },
  );

  if (response?.data?.data) {
    return response.data.data;
  }

  return [];
};

export const getTotalTransactions = async (): Promise<number> => {
  const { pagination } = await httpClient.get<SuccessResponse<ITransaction[]>>(
    API_ENDPOINTS.TRANSACTIONS,
    {
      next: {
        tags: [API_ENDPOINTS.TRANSACTIONS],
      },
    },
  );

  return pagination.total > 0 ? pagination.total : 0;
};
