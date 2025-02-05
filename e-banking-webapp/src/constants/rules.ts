import { z } from 'zod';

// Constants
import { REGEX, ERROR_MESSAGES } from '@/constants';

// Utils
import { futureMonth } from '@/utils';

/**
 * @name createStepSchema
 * @description Create a schema for a wizard form
 * @param steps
 */
export function createStepSchema<T extends Record<string, z.ZodType>>(
  steps: T,
) {
  return z.object(steps);
}

// Grouping the schemas under different steps
export const SignUpSchema = createStepSchema({
  user: z
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
    postal: z.string().trim(),
  }),
  card: z.object({
    holderName: z.string().min(1, ERROR_MESSAGES.CARD_HOLDER_NAME_REQUIRED),
    cardNumber: z
      .string()
      .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
      .length(14, ERROR_MESSAGES.CARD_NUMBER_INVALID)
      .regex(/^\d{4}(?: \d{4}){2}$/, {
        message: ERROR_MESSAGES.CARD_NUMBER_PATTERN,
      })
      .transform((value) =>
        value
          .replace(/\D/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim(),
      ),
    expireAt: futureMonth,
    ccv: z.string().regex(/^\d{3}$/, ERROR_MESSAGES.CCV_INVALID),
  }),
});

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
    .transform((value) => value.trim()), // Trim spaces before validation
  password: z.string().trim().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
