// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
    newPassword: z
      .string()
      .trim()
      .min(8, ERROR_MESSAGES.PASSWORD_INVALID)
      .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z.string().trim(), // Trim spaces before validation
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH,
    path: ['confirmPassword'],
  });
