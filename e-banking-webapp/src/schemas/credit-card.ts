// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

const futureMonth = z.string().refine(
  (value) => {
    const [year, month] = value.split('-').map(Number);
    if (!year || !month) return false;

    const today = new Date();
    const inputDate = new Date(year, month - 1);

    return inputDate > today;
  },
  {
    message: ERROR_MESSAGES.EXPIRE_DATE_INVALID,
  },
);

export const CreditCardSchema = z.object({
  fullName: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
  cardNumber: z.string().length(12, ERROR_MESSAGES.CARD_NUMBER_INVALID),
  expireAt: futureMonth,
  ccv: z.string().regex(/^\d{3}$/, ERROR_MESSAGES.CCV_INVALID),
  holderName: z.string().min(1, ERROR_MESSAGES.FIELD_REQUIRED),
});
