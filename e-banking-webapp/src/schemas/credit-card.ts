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
      .min(3, ERROR_MESSAGES.USERNAME_INVALID)
      .transform((value) => value.trim()), // Trim spaces before validation
    cardNumber: z.string().length(14, ERROR_MESSAGES.CARD_NUMBER_INVALID),
    expireAt: futureMonth,
    ccv: z.string().regex(/^\d{3}$/, ERROR_MESSAGES.CCV_INVALID),
  }),
  walletType: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
