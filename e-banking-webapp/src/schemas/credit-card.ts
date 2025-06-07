// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { futureMonth } from '@/utils';

export const CreditCardSchema = z.object({
  cardInfo: z.object({
    holderName: z
      .string()
      .trim()
      .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
      .min(3, ERROR_MESSAGES.USERNAME_INVALID)
      .transform((value) => value.trim()), // Trim spaces before validation
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
    ccv: z
      .string()
      .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
      .regex(/^\d{3}$/, ERROR_MESSAGES.CCV_INVALID),
  }),
  walletType: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
