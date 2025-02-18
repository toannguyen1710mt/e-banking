// Constants
import { API_ENDPOINTS, ERROR_MESSAGES, TAGS } from '@/constants';

// Interfaces
import { IUser, ResponseData } from '@/interfaces';

// Services
import { httpClient } from './http-client';

export const getUserById = async (id: number) => {
  try {
    const { data: userData, ...rest } = await httpClient.get<
      ResponseData<IUser>
    >(`${API_ENDPOINTS.USERS}/${id}`, {
      next: { tags: [TAGS.USERS] },
    });

    return {
      user: userData || ({} as IUser),
      ...rest,
    };
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ERROR_GET_USER_BY_ID + error);
  }
};
