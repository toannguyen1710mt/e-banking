// Constants
import { API_ENDPOINTS } from '@/constants';

// Interfaces
import { GlobalAccount, IAccount, IUser, SuccessResponse } from '@/interfaces';

// Services
import { httpClient } from '@/services';

export const getAccountsByUserId = async (
  userId: number,
): Promise<IAccount[]> => {
  const response = await httpClient.get<IUser>(
    `${API_ENDPOINTS.USERS}/${userId}?populate=accounts`,
  );

  if (response?.data?.accounts) {
    return response.data.accounts;
  }

  return [];
};

export const getGlobalAccounts = async (): Promise<
  SuccessResponse<GlobalAccount[]>
> => {
  const response = await httpClient.get<GlobalAccount[]>(
    API_ENDPOINTS.GLOBAL_ACCOUNTS,
  );

  return response.data;
};
