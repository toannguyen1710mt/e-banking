// Constants
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants';

// Interfaces
import { GlobalAccount, IAccount, IUser, SuccessResponse } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const getAccountsByUserId = async (
  userId: number,
): Promise<IAccount[]> => {
  try {
    const response = await httpClient.get<IUser>(
      `${API_ENDPOINTS.USERS}/${userId}?populate=accounts`,
    );

    if (response?.data?.accounts) {
      return response.data.accounts;
    }

    return [];
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_GET_ACCOUNT_USER_BY_ID + error);
  }
};

export const getGlobalAccounts = async (): Promise<
  SuccessResponse<GlobalAccount[]>
> => {
  try {
    const response = await httpClient.get<GlobalAccount[]>(
      API_ENDPOINTS.GLOBAL_ACCOUNTS,
    );

    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_GET_GLOBAL_ACCOUNTS + error);
  }
};
