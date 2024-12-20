import { z } from 'zod';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

export const ProfileSchema = z.object({
  user: z.object({
    username: z
      .string()
      .trim()
      .min(3, ERROR_MESSAGES.USERNAME_INVALID)
      .transform((value) => value.trim()), // Trim spaces before validation
    email: z
      .string()
      .trim()
      .email(ERROR_MESSAGES.EMAIL_INVALID)
      .transform((value) => value.trim()), // Trim spaces before validation
    fullName: z
      .string()
      .trim()
      .min(3, ERROR_MESSAGES.USERNAME_INVALID)
      .transform((value) => value.trim()),
    password: z
      .string()
      .trim()
      .min(8, ERROR_MESSAGES.PASSWORD_INVALID)
      .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN),
  }),
});
