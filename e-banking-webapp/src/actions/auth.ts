'use server';

import { signIn } from '@/config/auth';
import { AuthError } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { TSignInFormData } from '@/interfaces';

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
