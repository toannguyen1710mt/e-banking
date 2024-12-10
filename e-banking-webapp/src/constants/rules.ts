import { z } from 'zod';

// Constants
import { REGEX } from './regex';
import { ERROR_MESSAGES } from './messages';

// Define Zod Schema
export const signUpSchema = z
  .object({
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
    password: z
      .string()
      .trim()
      .min(8, ERROR_MESSAGES.PASSWORD_INVALID)
      .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z.string().trim(), // Trim spaces before validation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH,
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, ERROR_MESSAGES.USERNAME_INVALID)
    .transform((value) => value.trim()), // Trim spaces before validation
  password: z
    .string()
    .trim()
    .min(8, ERROR_MESSAGES.PASSWORD_INVALID)
    .regex(REGEX.PASSWORD, ERROR_MESSAGES.PASSWORD_PATTERN),
});
