'use server';

import {
  signIn,
  signOut as nextAuthSignOut,
  unstable_update,
} from '@/config/auth';
import { revalidateTag } from 'next/cache';
import { AuthError } from 'next-auth';

// Constants
import { ERROR_MESSAGES, API_ENDPOINTS, TAGS } from '@/constants';

// Services
import { httpClient } from '@/services/http-client';

// Interfaces
import {
  TSignUpPayload,
  TSignInFormData,
  TUpdateInfo,
  AuthResponse,
  IAccount,
  IAccountPayload,
  ICardPayload,
  SuccessResponse,
  TChangePasswordFormData,
  TChangePasswordSuccessResponse,
  IUser,
  ICard,
} from '@/interfaces';

export const authenticateUser = async (formData: TSignInFormData) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
    }
    throw error;
  }
};

export const signUp = async (signUpData: TSignUpPayload) => {
  const response = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.SIGN_UP,
    signUpData,
  );

  return response;
};

export const signOut = async () => await nextAuthSignOut({ redirect: false });

export const changePassword = async (
  payload: TChangePasswordFormData,
  jwt: string,
) => {
  const response = await httpClient.post<TChangePasswordSuccessResponse>(
    API_ENDPOINTS.CHANGE_PASSWORD,
    payload,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );

  return response;
};

export const updateUser = async (id: number, payload: TUpdateInfo) => {
  try {
    const response = await httpClient.put(
      `${API_ENDPOINTS.USERS}/${id}`,
      payload,
    );

    await unstable_update({ user: response.data });

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.SIGN_UP_ERROR;
    }
  }
};

export const addAccount = async (payload: IAccountPayload) => {
  try {
    const response = await httpClient.post<SuccessResponse<IAccount>>(
      API_ENDPOINTS.ACCOUNTS,
      payload,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.SIGN_UP_ERROR;
    }
  }
};

export const addCard = async (payload: ICardPayload) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.CARDS, payload);

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.SIGN_UP_ERROR;
    }
  }
};

export const updateEmailSettings = async (
  userId: number,
  payload: Partial<IUser>,
) => {
  await httpClient.put(`${API_ENDPOINTS.USERS}/${userId}`, payload);

  return revalidateTag(TAGS.USERS);
};

export const getUser = async (id: number): Promise<IUser | undefined> => {
  try {
    const response = await httpClient.get(`${API_ENDPOINTS.USERS}/${id}`);

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.SIGN_UP_ERROR;
    }
  }
};

export const addNewCardByAccountId = async (
  accountId: string,
  payload: Omit<ICard, 'id' | 'fullName' | 'account'>,
) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.CARDS, {
      data: {
        ...payload,
        account: {
          connect: [accountId],
        },
      },
    });

    revalidateTag(TAGS.CARD);

    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.ADD_CARD_FAILED;
    }
  }
};
