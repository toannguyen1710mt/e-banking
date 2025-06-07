// Constants
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';

// Interfaces
import { ITransaction, QueryParams, SuccessResponse } from '@/interfaces';

// Services
import { getAccountsByUserId, httpClient } from '@/services';

// Utils
import { formatQueryParams } from '@/utils/query-params';

/**
 * Fetches transactions for a specific user with optional query parameters for filtering, sorting, and pagination.
 *
 * @param - The ID of the user for whom transactions are being fetched.
 * @param - Optional query parameters to filter, sort, and paginate the transactions.
 * @returns A promise that resolves to a success response containing the list of transactions.
 *
 */
export const getTransactionsByUserId = async (
  userId: number,
  queryParams?: QueryParams,
): Promise<SuccessResponse<ITransaction[]>> => {
  try {
    const queryString = formatQueryParams(queryParams);

    const accounts = await getAccountsByUserId(userId);

    const documentIds = accounts.map((account) => account.documentId);

    const baseEndpoint = `${API_ENDPOINTS.TRANSACTIONS}?populate=account&[filters][account][documentId][$containsi]=${documentIds[0]}&[filters][account][documentId][$containsi]=${documentIds[1]}&[filters][account][documentId][$containsi]=${documentIds[2]}`;

    const requestEndpoint = queryString
      ? `${baseEndpoint}&${queryString}`
      : baseEndpoint;

    const { data } = await httpClient.get<SuccessResponse<ITransaction[]>>(
      requestEndpoint,
      {
        next: {
          tags: [API_ENDPOINTS.TRANSACTIONS],
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_GET_TRANSACTION_BY_USER_ID + error);
  }
};
