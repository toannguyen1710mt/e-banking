'use server';

import { signIn } from '@/config/auth';
import { AuthError } from 'next-auth';

// Constants
import { ERROR_MESSAGES, API_ENDPOINTS } from '@/constants';

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
      API_ENDPOINTS.SIGN_UP,
      signUpData,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AuthError) {
      throw ERROR_MESSAGES.SIGN_UP_ERROR;
    }
  }
};

export const updateUser = async (id: number, payload: TUpdateInfo) => {
  try {
    const response = await httpClient.put(
      `${API_ENDPOINTS.USERS}/${id}`,
      payload,
    );
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
