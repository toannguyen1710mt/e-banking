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

const passwordValidation = z
  .string()
  .trim()
  .min(8, ERROR_MESSAGES.PASSWORD_INVALID)
  .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN);

export const UpdatePasswordSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmPassword: z.string().trim(), // Trim spaces before validation
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH,
    path: ['confirmPassword'],
  });
