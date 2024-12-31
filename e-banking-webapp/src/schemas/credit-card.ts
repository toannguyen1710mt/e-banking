// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { futureMonth } from '@/utils';

export const CreditCardSchema = z.object({
  fullName: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
  cardNumber: z.string().length(12, ERROR_MESSAGES.CARD_NUMBER_INVALID),
  expireAt: futureMonth,
  ccv: z.string().regex(/^\d{3}$/, ERROR_MESSAGES.CCV_INVALID),
  holderName: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
