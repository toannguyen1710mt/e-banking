// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Interfaces
import { IUser, ResponseData } from '@/interfaces';

// Services
import { httpClient } from './http-client';

export const getBalanceAccount = async (id: string) => {
  const { data, ...rest } = await httpClient.get<ResponseData<IUser>>(
    `${API_ENDPOINTS.USERS}/${id}?populate=accounts`,
    {
      next: { tags: [TAGS.BALANCE] },
    },
  );

  return {
    user: data || ({} as IUser),
    ...rest,
  };
};
