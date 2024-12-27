// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { ITransaction, QueryParams, SuccessResponse } from '@/interfaces';

// Services
import { getAccountsByUserId, httpClient } from '@/services';

// Utils
import { formatQueryParams } from '@/utils/query-params';

/**
 * Fetches transactions with optional query parameters.
 * @param queryParams - Query parameters to filter, sort, or search transactions.
 * @returns A list of transactions.
 */
export const getTransactions = async (
  queryParams?: QueryParams,
): Promise<SuccessResponse<ITransaction[]>> => {
  const queryString = formatQueryParams(queryParams);

  const endpoint = queryString
    ? `${API_ENDPOINTS.TRANSACTIONS}?${queryString}`
    : API_ENDPOINTS.TRANSACTIONS;

  const { data } = await httpClient.get<SuccessResponse<ITransaction[]>>(
    endpoint,
    {
      next: {
        tags: [API_ENDPOINTS.TRANSACTIONS],
      },
    },
  );

  return data;
};

/**
 * Fetches the total count of all transactions.
 * @returns Total count of transactions.
 */
export const getTotalTransactions = async (): Promise<number> => {
  const { meta } = await getTransactions();

  return meta.pagination.total > 0 ? meta.pagination.total : 0;
};

/**
 * Fetches the total count of transactions sent by the user.
 * @param userId - The ID of the user.
 * @returns Total count of sent transactions.
 */
export const getTotalTransferSent = async (userId: number): Promise<number> => {
  const accounts = await getAccountsByUserId(userId);

  const documentIds = accounts.map((account) => account.documentId);

  const { meta } = await getTransactions({
    filters: {
      toAccountId: {
        $notIn: documentIds,
      },
    },
  });

  return meta.pagination.total > 0 ? meta.pagination.total : 0;
};

/**
 * Fetches the total count of transactions received by the user.
 * @param userId - The ID of the user.
 * @returns Total count of received transactions.
 */
export const getTotalTransferReceived = async (
  userId: number,
): Promise<number> => {
  const accounts = await getAccountsByUserId(userId);

  const documentIds = accounts.map((account) => account.documentId);

  const { meta } = await getTransactions({
    filters: {
      toAccountId: {
        $in: documentIds,
      },
    },
  });

  return meta.pagination.total > 0 ? meta.pagination.total : 0;
};
