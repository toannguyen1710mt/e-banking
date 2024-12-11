'use client';

import { z } from 'zod';

// Constants
import { REGEX, ERROR_MESSAGES } from '@/constants';

// Components
import { createStepSchema } from '@/components';

const futureMonth = z.string().refine(
  (value) => {
    const [year, month] = value.split('-').map(Number);
    const today = new Date();
    const inputDate = new Date(year, month - 1);
    return inputDate > today;
  },
  {
    message: 'Expire date must be in the future.',
  },
);

// Grouping the schemas under different steps
export const SignUpSchema = createStepSchema({
  account: z
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
    }),
  contact: z.object({
    phone: z
      .string()
      .trim()
      .length(12, ERROR_MESSAGES.PHONE_INVALID)
      .regex(/^\d+$/, ERROR_MESSAGES.PHONE_PATTERN),
    country: z.string().trim(),
    postalAddress: z.string().trim(),
  }),
  card: z.object({
    holdersName: z.string().min(1, 'Holders Name is required'),
    cardNumber: z.string().length(12, 'Card number must be exactly 12 digits'),
    expireAt: futureMonth,
    ccv: z.string().regex(/^\d{3}$/, 'CCV must be exactly 3 digits'),
  }),
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
