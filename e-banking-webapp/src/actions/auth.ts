'use server';

import { signIn } from '@/config/auth';
import { AuthError } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

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
} from '@/interfaces';

export const authenticateUser = async (formData: TSignInFormData) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.USERNAME_PASSWORD_INVALID;
    }
    throw error;
  }
};

export const handleSignUp = async (signUpData: TSignUpPayload) => {
  try {
    const response = await httpClient.post<AuthResponse>(
      '/auth/local/register',
      signUpData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.SIGN_UP_ERROR;
    }
    throw error;
  }
};

export const updateUser = async (id: number, payload: TUpdateInfo) => {
  try {
    const response = await httpClient.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.SIGN_UP_ERROR;
    }
    throw error;
  }
};

export const addAccount = async (payload: IAccountPayload) => {
  try {
    const response = await httpClient.post<SuccessResponse<IAccount>>(
      `/accounts`,
      payload,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.SIGN_UP_ERROR;
    }
    throw error;
  }
};

export const addCard = async (payload: ICardPayload) => {
  try {
    const response = await httpClient.post(`/cards`, payload);
    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.SIGN_UP_ERROR;
    }
    throw error;
  }
};
