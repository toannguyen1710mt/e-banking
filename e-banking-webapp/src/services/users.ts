// Constants
import { API_ENDPOINTS, TAGS } from '@/constants';

// Interfaces
import { IUser, ResponseData } from '@/interfaces';

// Services
import { httpClient } from './http-client';

export const getUserById = async (id: number) => {
  const { data: userData, ...rest } = await httpClient.get<ResponseData<IUser>>(
    `${API_ENDPOINTS.USERS}/${id}`,
    {
      next: { tags: [TAGS.USERS] },
    },
  );

  return {
    user: userData || ({} as IUser),
    ...rest,
  };
};
