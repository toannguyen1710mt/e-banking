// Libs
import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Interfaces
import { AccountType } from '@/interfaces';

export const InternalTransferFormSchema = z.object({
  fromAccountType: z
    .nativeEnum(AccountType, {
      errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
    })
    .refine((val) => val !== undefined, {
      message: ERROR_MESSAGES.FIELD_REQUIRED,
    }),
  toAccountType: z
    .nativeEnum(AccountType, {
      errorMap: () => ({ message: ERROR_MESSAGES.FIELD_REQUIRED }),
    })
    .refine((val) => val !== undefined, {
      message: ERROR_MESSAGES.FIELD_REQUIRED,
    }),
  amount: z.coerce
    .string()
    .min(1, ERROR_MESSAGES.FIELD_REQUIRED)
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0.01, {
      message: ERROR_MESSAGES.AMOUNT_MIN,
    }),
});
